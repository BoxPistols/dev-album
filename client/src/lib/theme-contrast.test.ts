import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { TAILWIND_PALETTE_RGB } from "./tailwind-palette";

// ============================================================
// カラートークンのコントラスト検査
//
// e2e/a11y.spec.ts（axe-core）は実描画を検査するが、代表ページの抜き取りに
// なる。マニュアル別ブランドカラー（index.css の [data-manual]）は 8 マニュアル
// × 3 テーマ = 24 通りのトークン組があり、抜き取りでは取りこぼす。
//
// そこでこのテストは逆方向から攻める。
//   1. 実際のソースから「同じ要素に付いている文字色クラスと背景色クラスの組」を集める
//   2. その組を、その要素が描画され得る全テーマ × 全マニュアルのトークン値で評価する
// 仮想の組み合わせではなく、コードに実在する組だけを検査するので、
// 「使っていない色の理論値」で落ちることがない。
// ============================================================

const AA_MIN = 4.5;

const CSS_PATH = join(import.meta.dirname, "..", "index.css");
const SRC_DIR = join(import.meta.dirname, "..");
const css = readFileSync(CSS_PATH, "utf8");

/** セレクタ直下のブロックから CSS カスタムプロパティを取り出す */
function readTokens(selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) return {};
  const end = css.indexOf("}", start);
  const tokens: Record<string, string> = {};
  for (const m of css.slice(start, end).matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    tokens[m[1]] = m[2].trim();
  }
  return tokens;
}

const MANUALS = [
  "learning",
  "git",
  "react",
  "claude-code",
  "threejs",
  "ai-ml",
  "ux-design",
  "api",
  "vue",
] as const;
type Manual = (typeof MANUALS)[number];

const THEMES = ["light", "dark", "dracula"] as const;
type Theme = (typeof THEMES)[number];

/** テーマ × マニュアルの実効トークン（後勝ちのカスケードを再現する） */
function tokensFor(
  theme: Theme,
  manual: Manual | null,
): Record<string, string> {
  const themeBase =
    theme === "light"
      ? readTokens(":root")
      : theme === "dark"
        ? { ...readTokens(":root"), ...readTokens(".dark") }
        : {
            ...readTokens(":root"),
            ...readTokens(".dark"),
            ...readTokens(".dark-soft"),
          };
  if (!manual) return themeBase;
  if (theme === "light")
    return { ...themeBase, ...readTokens(`[data-manual="${manual}"]`) };
  if (theme === "dark")
    return { ...themeBase, ...readTokens(`.dark[data-manual="${manual}"]`) };
  return {
    ...themeBase,
    ...readTokens(`.dark[data-manual="${manual}"]`),
    ...readTokens(`.dark-soft[data-manual="${manual}"]`),
  };
}

type RGB = [number, number, number];

function parseHex(hex: string): RGB {
  const h = hex.trim().replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as RGB;
}

/** WCAG 2.x の相対輝度 */
function luminance(rgb: RGB): number {
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(fg: RGB, bg: RGB): number {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

/** 半透明の前景色を不透明な下地に合成する */
function composite(fg: RGB, bg: RGB, alpha: number): RGB {
  return fg.map((v, i) => v * alpha + bg[i] * (1 - alpha)) as RGB;
}

// ── 実ソースからクラスの組を集める ───────────────────────────

function getAllTsxFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...getAllTsxFiles(full));
    else if (full.endsWith(".tsx")) files.push(full);
  }
  return files;
}

// 直前が英数・ハイフン・コロンでないものだけ拾う。
// コロンを除くのは hover:/focus: 等の状態バリアントを外すため
// （hover:bg-primary/90 は素の bg-primary の上に重なるので、下地は下の要素ではない）。
// 文字色側の /50 等のアルファ修飾も取り込む。取りこぼすと text-primary/50 を
// 全不透明の text-primary と誤読し、半透明で沈んだ文字を見逃す
// （axe は Tailwind v4 の color-mix() を解決できず incomplete 扱いにするため、
// この型の違反は E2E 側では一切検出されない）。
const TEXT_CLASS =
  /(?<![\w:-])text-(primary-foreground|accent-foreground|card-foreground|muted-foreground|primary|foreground|accent)(?:\/(\d+))?(?![\w-])/g;
const BG_CLASS =
  /(?<![\w:-])bg-(primary|accent|card|muted|background)(?:\/(\d+))?(?![\w-])/g;

// 背景クラスを持たない要素の文字色は、ページの地（background / card / muted）の上に乗る。
// *-foreground 系トークンは「対になる純色の上」で使う前提なので、この推定の対象外。
const GROUND_TEXT = new Set([
  "primary",
  "accent",
  "foreground",
  "muted-foreground",
]);

// opacity-N は要素まるごと（文字も面も）を下地へ沈める。文字色クラスのアルファとは
// 別系統だが効果は乗算されるので、同じ要素に付いていれば一緒に評価する。
// 未解除バッジを opacity-50 で沈めて 2.03:1 になっていた例がある。
const OPACITY_CLASS = /(?<![\w:-])opacity-(\d+)(?![\w-])/g;

/**
 * className の中身から「同時に適用され得るクラス列」を取り出す。
 * テンプレートリテラルの `${cond ? 'a' : 'b'}` は排他なので、
 * 静的部分と各分岐を別々に組み合わせて偽の組を作らないようにする。
 */
function classGroups(content: string): string[] {
  const staticPart = content.replace(/\$\{[^}]*\}/g, " ");
  const groups = [staticPart];
  for (const expr of content.matchAll(/\$\{([^}]*)\}/g)) {
    for (const quoted of expr[1].matchAll(/'([^']*)'|"([^"]*)"/g)) {
      groups.push(`${staticPart} ${quoted[1] ?? quoted[2] ?? ""}`);
    }
  }
  return groups;
}

type Pair = {
  text: string;
  textAlpha: number;
  bg: string;
  alpha: number;
  opacity: number;
};

/** ページのパスからそのファイルが描画されるマニュアルを判定する（共有部品は全マニュアル） */
function manualsFor(file: string): (Manual | null)[] {
  const m = file.match(/[/\\]pages[/\\]([^/\\]+)[/\\]/);
  const found = MANUALS.find((x) => x === m?.[1]);
  return found ? [found] : [null, ...MANUALS];
}

const occurrences = new Map<
  string,
  { pair: Pair; manuals: Set<Manual | null>; file: string }
>();
for (const file of getAllTsxFiles(SRC_DIR)) {
  const src = readFileSync(file, "utf8");
  for (const attr of src.matchAll(
    /className=(?:"([^"]*)"|\{`([^`]*)`\}|\{"([^"]*)"\})/g,
  )) {
    for (const group of classGroups(attr[1] ?? attr[2] ?? attr[3] ?? "")) {
      // 同じ要素に複数付くことはないが、条件分岐を合成した group では並ぶことがある。
      // 一番濃い（= 検査が緩くならない）値を採る。0 は要素ごと不可視なので対象外
      const opacities = [...group.matchAll(OPACITY_CLASS)].map(
        (m) => Number(m[1]) / 100,
      );
      if (opacities.includes(0)) continue;
      const opacity = opacities.length ? Math.max(...opacities) : 1;
      const texts = [
        ...new Map(
          [...group.matchAll(TEXT_CLASS)].map((m) => [
            `${m[1]}/${m[2] ?? ""}`,
            { token: m[1], alpha: m[2] ? Number(m[2]) / 100 : 1 },
          ]),
        ).values(),
      ];
      const bgs = [...group.matchAll(BG_CLASS)].map((m) => ({
        token: m[1],
        alpha: m[2] ? Number(m[2]) / 100 : 1,
      }));
      // 背景クラスが同居しない半透明文字（opacity で沈めたものを含む）は、
      // ページの地の上に乗るものとして評価する
      if (bgs.length === 0) {
        for (const t of texts) {
          if ((t.alpha < 1 || opacity < 1) && GROUND_TEXT.has(t.token)) {
            bgs.push(
              { token: "background", alpha: 1 },
              { token: "card", alpha: 1 },
              { token: "muted", alpha: 1 },
            );
          }
        }
      }
      for (const text of texts) {
        for (const bg of bgs) {
          const key = `${text.token}|${text.alpha}|${bg.token}|${bg.alpha}|${opacity}`;
          if (!occurrences.has(key)) {
            occurrences.set(key, {
              pair: {
                text: text.token,
                textAlpha: text.alpha,
                bg: bg.token,
                alpha: bg.alpha,
                opacity,
              },
              manuals: new Set(),
              file,
            });
          }
          for (const manual of manualsFor(file))
            occurrences.get(key)!.manuals.add(manual);
        }
      }
    }
  }
}

/**
 * 半透明背景の「下地」候補。
 * 教材ページの地は --background か --card のいずれかで、
 * セクションヘッダは bg-primary/5 を敷く定型があるため、その上に重なる場合も含める。
 */
function baseSurfaces(t: Record<string, string>): RGB[] {
  const background = parseHex(t.background);
  const card = parseHex(t.card);
  const tint = parseHex(t.primary);
  return [
    background,
    card,
    composite(tint, background, 0.05),
    composite(tint, card, 0.05),
  ];
}

describe("カラートークンのコントラスト", () => {
  it("実在する文字色 × 背景色の組が、全テーマ × 全マニュアルで AA 4.5:1 を満たす", () => {
    const failures: string[] = [];
    for (const { pair, manuals, file } of occurrences.values()) {
      for (const manual of manuals) {
        for (const theme of THEMES) {
          const t = tokensFor(theme, manual);
          const fg = parseHex(t[pair.text]);
          // 不透明な面に不透明な文字なら下地は要らない。半透明が絡むときだけ、
          // その要素が載り得る地を総当たりする
          const bases =
            pair.alpha === 1 && pair.opacity === 1
              ? [parseHex(t[pair.bg])]
              : baseSurfaces(t);
          for (const base of bases) {
            let surface =
              pair.alpha === 1
                ? parseHex(t[pair.bg])
                : composite(parseHex(t[pair.bg]), base, pair.alpha);
            // 半透明の文字は下地と合成された色で描画される
            let effFg =
              pair.textAlpha < 1 ? composite(fg, surface, pair.textAlpha) : fg;
            if (pair.opacity < 1) {
              // opacity は文字と面をまとめて地へ沈める
              effFg = composite(effFg, base, pair.opacity);
              surface = composite(surface, base, pair.opacity);
            }
            const ratio = contrast(effFg, surface);
            if (ratio < AA_MIN) {
              const cls = `text-${pair.text}${pair.textAlpha < 1 ? `/${pair.textAlpha * 100}` : ""} × bg-${pair.bg}${pair.alpha < 1 ? `/${pair.alpha * 100}` : ""}${pair.opacity < 1 ? ` × opacity-${pair.opacity * 100}` : ""}`;
              failures.push(
                `${ratio.toFixed(2)}:1  [${theme}/${manual ?? "既定"}] ${cls}  例: ${file.replace(/.*client\//, "client/")}`,
              );
            }
          }
        }
      }
    }
    expect(
      [...new Set(failures)].sort(),
      `AA 未達の組:\n${[...new Set(failures)].sort().join("\n")}`,
    ).toEqual([]);
  });

  it("本文・補助テキストが background / card / muted の上で AA 4.5:1 を満たす", () => {
    const failures: string[] = [];
    for (const theme of THEMES) {
      for (const manual of [null, ...MANUALS] as (Manual | null)[]) {
        const t = tokensFor(theme, manual);
        for (const fg of ["foreground", "muted-foreground"]) {
          for (const bg of ["background", "card", "muted"]) {
            const ratio = contrast(parseHex(t[fg]), parseHex(t[bg]));
            if (ratio < AA_MIN) {
              failures.push(
                `${ratio.toFixed(2)}:1  [${theme}/${manual ?? "既定"}] text-${fg} × bg-${bg}`,
              );
            }
          }
        }
      }
    }
    expect([...new Set(failures)], `AA 未達:\n${failures.join("\n")}`).toEqual(
      [],
    );
  });

  it("マニュアル別ブランドカラーが 9 マニュアル × 3 テーマぶん定義されている", () => {
    // 定義漏れがあると既定の primary にフォールバックし、上の検査を素通りする
    for (const manual of MANUALS) {
      expect(
        readTokens(`[data-manual="${manual}"]`).primary,
        manual,
      ).toBeTruthy();
      expect(
        readTokens(`.dark[data-manual="${manual}"]`).primary,
        manual,
      ).toBeTruthy();
      expect(
        readTokens(`.dark-soft[data-manual="${manual}"]`).primary,
        manual,
      ).toBeTruthy();
    }
  });
});

// ============================================================
// ============================================================
// Tailwind パレット色どうしの組
//
// 上の検査はテーマトークン（--primary 等）の組だけを見る。
// text-orange-600 × bg-orange-100 のような素のパレット色はトークンではないので、
// これまでどの検査にも掛かっていなかった。story が無ければ pnpm test:storybook にも、
// 代表ページの抜き取りである axe にも入らない。実際に 3.12:1 の頭文字バッジが
// 残っていた（client/src/pages/ai-ml/python-ml/DataLibraries.tsx）。
//
// パレットの値は theme.css の oklch で、jsdom は oklch を解決できない。
// 変換式をここに書くとブラウザが実際に描く色とずれても気づけないので、
// Chromium で描画して読み取った値（scripts/measure-palette.mjs の生成物）を使う。
// ============================================================

const PALETTE_TEXT =
  /(?<![\w:-])text-([a-z]+-\d+)(?:\/(\d+))?(?![\w-])/g;
const PALETTE_BG = /(?<![\w:-])bg-([a-z]+-\d+)(?:\/(\d+))?(?![\w-])/g;
const DARK_PALETTE_TEXT =
  /(?<![\w-])dark:text-([a-z]+-\d+)(?:\/(\d+))?(?![\w-])/g;
const DARK_PALETTE_BG = /(?<![\w-])dark:bg-([a-z]+-\d+)(?:\/(\d+))?(?![\w-])/g;

type PalettePair = {
  text: string;
  textAlpha: number;
  bg: string;
  bgAlpha: number;
  dark: boolean;
  file: string;
};

/**
 * プレビュー用のコード例（CodingChallenge の initialCode 等）を落とす。
 * 教材のコード例はプレビュー iframe の中で、その iframe の地の上に描かれる。
 * アプリのテーマトークンの上には乗らないので、ここで一緒に評価すると
 * 実在しない不合格が出る（無効化されたボタンのように WCAG 1.4.3 の対象外のものもある）。
 * JSX のタグを含むテンプレートリテラルをコード例とみなす。className={`...`} は
 * タグを含まないので残る。
 */
function stripCodeSamples(src: string): string {
  return src.replace(/`[^`]*`/g, (lit) =>
    /<(?:div|span|button|form|input|p|h[1-6]|section|ul|li|table|a)[\s>]/.test(
      lit,
    )
      ? " "
      : lit,
  );
}

const palettePairs = new Map<string, PalettePair>();
for (const file of getAllTsxFiles(SRC_DIR)) {
  const src = stripCodeSamples(readFileSync(file, "utf8"));
  for (const attr of src.matchAll(
    /className=(?:"([^"]*)"|\{`([^`]*)`\}|\{"([^"]*)"\})/g,
  )) {
    for (const group of classGroups(attr[1] ?? attr[2] ?? attr[3] ?? "")) {
      for (const [dark, textRe, bgRe] of [
        [false, PALETTE_TEXT, PALETTE_BG],
        [true, DARK_PALETTE_TEXT, DARK_PALETTE_BG],
      ] as const) {
        // dark: 付きは素のクラスにも一致するので、素側では dark: を落としてから読む
        const scope = dark
          ? group
          : group.replace(/(?:dark|hover|focus|group-hover):[\w/-]+/g, " ");
        const texts = [...scope.matchAll(textRe)];
        const bgs = [...scope.matchAll(bgRe)];
        for (const t of texts) {
          for (const b of bgs) {
            if (!TAILWIND_PALETTE_RGB[t[1]] || !TAILWIND_PALETTE_RGB[b[1]])
              continue;
            const key = `${dark}|${t[0]}|${b[0]}`;
            if (!palettePairs.has(key))
              palettePairs.set(key, {
                text: t[1],
                textAlpha: t[2] ? Number(t[2]) / 100 : 1,
                bg: b[1],
                bgAlpha: b[2] ? Number(b[2]) / 100 : 1,
                dark,
                file,
              });
          }
        }
      }
    }
  }
}

describe("Tailwind パレット色どうしのコントラスト", () => {
  // 不透明な文字 × 不透明な面だけを機械判定にする。
  // 半透明が絡む組（bg-cyan-400/10 等）は「その要素がどの地に載るか」で答えが変わり、
  // 静的には決められない。実際 react/Home.tsx の hero は暗い地に載るので、
  // card を仮定すると 1.14:1 という誤った不合格が出る。
  // 決定的に取れるものだけを機械で取り、残りは axe の実描画と目視に回す。
  const opaque = [...palettePairs.values()].filter(
    (p) => p.textAlpha === 1 && p.bgAlpha === 1,
  );

  it("不透明どうしの組が AA 4.5:1 を満たす", () => {
    const failures: string[] = [];
    for (const pair of opaque) {
      // 両方不透明なので下地に依らず値が決まる
      const ratio = contrast(
        TAILWIND_PALETTE_RGB[pair.text],
        TAILWIND_PALETTE_RGB[pair.bg],
      );
      if (ratio < AA_MIN) {
        const prefix = pair.dark ? "dark:" : "";
        failures.push(
          `${ratio.toFixed(2)}:1  ${prefix}text-${pair.text} × ${prefix}bg-${pair.bg}  例: ${pair.file.replace(/.*client\//, "client/")}`,
        );
      }
    }
    expect(failures, `AA 未達:\n${failures.join("\n")}`).toEqual([]);
  });

  it("パレットの組を実際に拾えている（0 件は走査の事故）", () => {
    expect(opaque.length).toBeGreaterThan(0);
  });
});

// ManualGlyph のバッジ地色
//
// このバッジだけはトークンではなく navigation.ts のブランド色をインラインで敷く
// （TOP には data-manual が付かず、10 件すべてが既定の primary で同色になるため）。
// 上の検査はクラスの組を見るのでインライン style を拾えず、axe も aria-hidden 要素の
// コントラストは対象外にする。つまり自動検査に穴があく場所なので、ここで塞ぐ。
//
// 値はソースから読む。TINT_ALPHA や色を変えたら、この検査が新しい値で評価し直す。
// ============================================================

describe("ManualGlyph のバッジ地色", () => {
  const glyphSrc = readFileSync(
    join(SRC_DIR, "components", "ManualGlyph.tsx"),
    "utf8",
  );
  const navSrc = readFileSync(join(SRC_DIR, "lib", "navigation.ts"), "utf8");

  const alphaMatch = /const TINT_ALPHA = ([\d.]+);/.exec(glyphSrc);
  const brandColors = [
    ...navSrc
      .slice(
        navSrc.indexOf("export const manuals"),
        navSrc.indexOf("export const sections"),
      )
      .matchAll(/color:\s*'(#[0-9A-Fa-f]{6})'/g),
  ].map((m) => m[1]);

  it("ソースから alpha と 10 マニュアルぶんの色を取り出せる", () => {
    // 取り出しに失敗したまま 0 件を検査して緑になるのを防ぐ
    expect(
      alphaMatch,
      "TINT_ALPHA を ManualGlyph.tsx から読めない",
    ).toBeTruthy();
    expect(brandColors).toHaveLength(11);
  });

  it("頭文字（--foreground）がバッジ地色の上で AA 4.5:1 を満たす", () => {
    const alpha = Number(alphaMatch![1]);
    const failures: string[] = [];

    for (const theme of THEMES) {
      const t = tokensFor(theme, null);
      // バッジが実際に載り得る下地。--sidebar は半透明なので --background に合成する
      const sidebarAlpha = /rgba\([^)]*,\s*([\d.]+)\)/.exec(t.sidebar);
      const sidebarRgb = /rgba\((\d+),\s*(\d+),\s*(\d+)/.exec(t.sidebar);
      const grounds: Record<string, RGB> = {
        card: parseHex(t.card),
        background: parseHex(t.background),
        muted: parseHex(t.muted),
        "sidebar-accent": parseHex(t["sidebar-accent"]),
        sidebar: composite(
          [+sidebarRgb![1], +sidebarRgb![2], +sidebarRgb![3]],
          parseHex(t.background),
          Number(sidebarAlpha![1]),
        ),
      };
      const fg = parseHex(t.foreground);

      for (const [groundName, ground] of Object.entries(grounds)) {
        for (const brand of brandColors) {
          const tinted = composite(parseHex(brand), ground, alpha);
          const ratio = contrast(fg, tinted);
          if (ratio < AA_MIN) {
            failures.push(
              `${theme} / ${groundName} / ${brand} @${alpha}: ${ratio.toFixed(2)}`,
            );
          }
        }
      }
    }
    expect(failures, `AA 未達:\n${failures.join("\n")}`).toEqual([]);
  });
});
