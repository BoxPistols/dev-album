import { test, expect, type Page, type Frame } from "@playwright/test";

// ============================================================
// プレビュー iframe のテーマ追従とコントラストの機械検査
//
// 目的: テーマ（Light / Dark / Dracula）を切り替えたとき、教材内のプレビュー iframe が
// ページと同じ明暗で描かれ、文字が背景に沈んでいないことを CI で捕捉する。
// 2026-07-05 のライト/ダーク走査は目視だったので再現できなかった。Dracula でプレビューが
// ライトのまま残る退行（https://github.com/BoxPistols/dev-album/issues/82）を機に機械化する。
//
// 判定は AA（4.5:1）ではなく 2:1 の緩い閾値にする。狙いは「暗色固定の文字がダーク背景に
// 沈む」「淡色固定の背景に変数色の文字が乗る」のような破綻（実測 1.1〜1.4:1）の検出であって、
// 配色品質の審査ではない（配色品質は axe と theme-contrast.test.ts が担う）。
// 3:1 にすると教材サンプルが意図して使う gray-400 の補助文字（白地で 2.54:1）まで拾う。
// ============================================================

// プレビューが多いページを代表として抜き取る（全ページ走査は時間が見合わない）。
const PAGES = [
  "/training",
  "/react/storybook/css",
  "/react/storybook/setup",
  "/react/storybook/advanced",
  "/react/mui/components",
  "/react/mui/customization",
  "/react/state-events/conditional-list",
  "/react/css-layout/flexbox",
  "/react/css-layout/grid",
  "/react/accessibility/table-design",
  "/react/ui-patterns/form-group",
  "/react/tailwind/intro",
] as const;

// ThemeContext は localStorage の theme-mode を初期値に使う。html のクラスを直接書き換えても
// React 側の theme は変わらず iframe が再生成されないので、読み込み前に値を仕込む。
const THEMES = [
  { name: "Light", mode: "light" },
  { name: "Dark", mode: "dark" },
  { name: "Dracula", mode: "dark-soft" },
] as const;

const MIN_CONTRAST = 2;

// 穴埋め課題（`___` を含む）は初期状態で描画できないのが正しいので、#root 非空の判定から外す
const BLANK_PLACEHOLDER = /\b___\b/;

interface ContrastFailure {
  text: string;
  color: string;
  background: string;
  ratio: number;
}

interface FrameReport {
  rootEmpty: boolean;
  hasRoot: boolean;
  bodyBackground: string;
  failures: ContrastFailure[];
}

// iframe 内で実行する。可視テキストノードごとに、文字色と「祖先を遡って合成した実効背景色」の
// コントラスト比を WCAG の式で求める。背景画像（グラデーション等）を持つ祖先に当たったら
// 実効背景が確定できないので、そのノードは判定しない。
function measureFrame(minContrast: number): FrameReport {
  type Rgba = [number, number, number, number];
  const parseRgb = (value: string): Rgba | null => {
    const m = value.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const parts = m[1]
      .split(/[,\s/]+/)
      .filter(Boolean)
      .map(Number);
    if (parts.length < 3 || parts.some((n) => Number.isNaN(n))) return null;
    return [parts[0], parts[1], parts[2], parts.length >= 4 ? parts[3] : 1];
  };
  // Tailwind v4 は oklch() で色を出し、computed style も canvas の fillStyle も oklch のまま返る。
  // 1px 塗って読み戻せば sRGB（ガマット写像済み）の画素値が得られるので、それで rgb に落とす
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const parse = (value: string): Rgba | null => {
    const direct = parseRgb(value);
    if (direct) return direct;
    if (!ctx) return null;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "#000";
    ctx.fillStyle = value;
    if (ctx.fillStyle === "#000000" && !/black|#000/.test(value)) return null;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return [r, g, b, a / 255];
  };
  const over = (top: Rgba, bottom: Rgba): Rgba => {
    const a = top[3] + bottom[3] * (1 - top[3]);
    if (a === 0) return [0, 0, 0, 0];
    const ch = (i: number) =>
      (top[i] * top[3] + bottom[i] * bottom[3] * (1 - top[3])) / a;
    return [ch(0), ch(1), ch(2), a];
  };
  const luminance = (c: Rgba): number => {
    const lin = (v: number) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  };
  const contrast = (a: Rgba, b: Rgba): number => {
    const l1 = luminance(a);
    const l2 = luminance(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const fmt = (c: Rgba) =>
    `rgb(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])})`;

  const docBg = parse(getComputedStyle(document.body).backgroundColor) ?? [
    255, 255, 255, 1,
  ];
  const htmlBg = parse(
    getComputedStyle(document.documentElement).backgroundColor,
  );
  const canvasBg: Rgba =
    htmlBg && htmlBg[3] > 0
      ? htmlBg
      : docBg[3] > 0
        ? docBg
        : [255, 255, 255, 1];

  // 祖先を下から順に合成して実効背景を得る。opacity は子孫全体を薄めるので一緒に追う。
  const effectiveBackground = (start: Element): Rgba | null => {
    const layers: Rgba[] = [];
    let el: Element | null = start;
    while (el) {
      const cs = getComputedStyle(el);
      if (cs.backgroundImage && cs.backgroundImage !== "none") return null;
      const bg = parse(cs.backgroundColor);
      if (bg && bg[3] > 0) {
        layers.push(bg);
        if (bg[3] >= 1) break;
      }
      el = el.parentElement;
    }
    let result: Rgba = el ? [0, 0, 0, 0] : canvasBg;
    for (let i = layers.length - 1; i >= 0; i -= 1)
      result = over(layers[i], result);
    if (!el) return result;
    // 不透明な祖先で止まった場合、その下の層は見えないので canvas 合成は不要
    return result[3] >= 1 ? result : over(result, canvasBg);
  };

  const root = document.getElementById("root");
  // #root がない文書はトランスパイルエラー表示（本文に理由が出る）か Three.js。body の中身で判定する
  const hasRoot = !!root;
  const rootEmpty = root
    ? root.childNodes.length === 0
    : document.body.childNodes.length === 0;
  const failures: ContrastFailure[] = [];
  const seen = new Set<string>();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const text = (node.textContent ?? "").trim();
    const parent = node.parentElement;
    node = walker.nextNode();
    if (!text || !parent) continue;
    // 絵文字だけのノードは color に関係なく自前の色で描かれるので判定しない
    if (!/[\p{L}\p{N}\p{P}\p{Sm}]/u.test(text)) continue;
    if (parent.closest("script, style, noscript, svg")) continue;
    // 無効状態のコントロールは意図して薄いので判定しない
    if (parent.closest(":disabled, [aria-disabled='true']")) continue;
    const rect = parent.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;
    const cs = getComputedStyle(parent);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    if (
      cs.webkitTextFillColor &&
      cs.webkitTextFillColor !== cs.color &&
      /transparent/.test(cs.webkitTextFillColor)
    )
      continue;
    // 祖先の opacity をかけ合わせる（0 なら不可視）
    let opacity = 1;
    for (let el: Element | null = parent; el; el = el.parentElement) {
      opacity *= Number(getComputedStyle(el).opacity);
    }
    if (opacity < 0.05) continue;
    const fg = parse(cs.color);
    if (!fg || fg[3] === 0) continue;
    const bg = effectiveBackground(parent);
    if (!bg) continue;
    const fgOnBg = over([fg[0], fg[1], fg[2], fg[3] * opacity], bg);
    const ratio = contrast(fgOnBg, bg);
    if (ratio < minContrast) {
      const key = `${text.slice(0, 40)}|${cs.color}|${fmt(bg)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      failures.push({
        text: text.slice(0, 40),
        color: fmt(fgOnBg),
        background: fmt(bg),
        ratio: Math.round(ratio * 100) / 100,
      });
    }
  }
  return { rootEmpty, hasRoot, bodyBackground: fmt(canvasBg), failures };
}

interface PreviewFrame {
  frame: Frame;
  isBlankExercise: boolean;
  usesTailwind: boolean;
}

// React UMD の読み込みと描画を待つ（createRoot の描画は非同期なので srcDoc 確定後も遅れる）。
// 穴埋め課題は描画できないのが正しいので、React の読み込みだけ待って先へ進む。
// Tailwind ブラウザ版はクラスを実行時にコンパイルするので、compiled CSS の注入も待つ。
async function waitForPreview(pf: PreviewFrame): Promise<boolean> {
  try {
    await pf.frame.waitForFunction(
      ({ blank, tailwind }) => {
        const root = document.getElementById("root");
        if (tailwind) {
          // ブラウザ版 Tailwind は DOM 変化を見て再コンパイルするので、React 描画後のクラスが
          // compiled CSS に入るまで待つ（最初のコンパイルは React 描画前に終わっていることがある）
          const css = Array.from(document.querySelectorAll("style"))
            .map((s) => s.textContent ?? "")
            .join("\n");
          if (!/tailwindcss v4/.test(css)) return false;
          const used = new Set<string>();
          root?.querySelectorAll("[class]").forEach((el) => {
            el.classList.forEach((c) => {
              if (/^(bg|text)-[a-z]+-\d+$/.test(c)) used.add(c);
            });
          });
          for (const c of used) if (!css.includes(`.${c}`)) return false;
        }
        if (!root) return document.body.childNodes.length > 0;
        if (blank) return typeof (window as { React?: unknown }).React !== "undefined";
        return root.childNodes.length > 0;
      },
      { blank: pf.isBlankExercise, tailwind: pf.usesTailwind },
      { timeout: 10_000 },
    );
    return true;
  } catch {
    return false;
  }
}

async function collectPreviewFrames(page: Page): Promise<PreviewFrame[]> {
  // ページ末尾まで段階的にスクロールし、遅延描画があっても全プレビューを出す
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
  });
  const handles = await page
    .locator('iframe[title="プレビュー"]')
    .elementHandles();
  const frames: PreviewFrame[] = [];
  for (const handle of handles) {
    const frame = await handle.contentFrame();
    if (!frame) continue;
    const srcDoc = (await handle.getAttribute("srcdoc")) ?? "";
    frames.push({
      frame,
      isBlankExercise: BLANK_PLACEHOLDER.test(srcDoc),
      usesTailwind: /tailwindcss-browser/.test(srcDoc),
    });
  }
  return frames;
}

for (const theme of THEMES) {
  test.describe(`[${theme.name}] プレビュー iframe`, () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript((mode) => {
        window.localStorage.setItem("theme-mode", mode);
      }, theme.mode);
    });

    for (const path of PAGES) {
      test(`${path}: #root が非空で、文字が背景に沈んでいない`, async ({
        page,
      }) => {
        await page.goto(path);
        await expect(
          page.locator('iframe[title="プレビュー"]').first(),
        ).toBeAttached({ timeout: 15_000 });
        // デバウンス（300ms）後に srcDoc が確定するので少し待つ
        await page.waitForTimeout(800);
        const frames = await collectPreviewFrames(page);
        expect(
          frames.length,
          "プレビュー iframe が 1 つ以上ある",
        ).toBeGreaterThan(0);

        const problems: string[] = [];
        for (const [index, pf] of frames.entries()) {
          const ready = await waitForPreview(pf);
          const report = await pf.frame.evaluate(measureFrame, MIN_CONTRAST);
          const label = `#${index + 1} (bg ${report.bodyBackground})`;
          if (!ready) problems.push(`${label}: 描画が完了しない`);
          if (report.rootEmpty && !pf.isBlankExercise)
            problems.push(`${label}: #root が空`);
          // Light 以外では iframe の地がライト（白）のままなら判定漏れ。Light では逆を見る
          // （エラー表示は常に暗い地なので #root を持つ文書だけ見る）
          const [r, g, b] = report.bodyBackground.match(/\d+/g)!.map(Number);
          const lum = (r + g + b) / 3;
          if (report.hasRoot && theme.mode !== "light" && lum > 200)
            problems.push(`${label}: ダークテーマなのに地が明るい`);
          if (report.hasRoot && theme.mode === "light" && lum < 60)
            problems.push(`${label}: ライトテーマなのに地が暗い`);
          for (const f of report.failures) {
            problems.push(
              `${label}: "${f.text}" ${f.color} on ${f.background} = ${f.ratio}:1`,
            );
          }
        }
        expect(problems, problems.join("\n")).toEqual([]);
      });
    }
  });
}
