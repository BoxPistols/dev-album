import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// ============================================================
// アクセシビリティ自動検査（axe-core）
// a11y を教材で説く以上、アプリ自身が基本水準を満たすことを CI で保証する。
// critical / serious 違反ゼロを不変条件とし、Light / Dark / Dracula の
// 3 テーマすべてで検査する（テーマ別のコントラスト破綻を CI で捕捉するため）。
// ============================================================

const PAGES = [
  { path: "/", name: "ランディング" },
  { path: "/react", name: "React マニュアル Home" },
  { path: "/react/mui/intro", name: "MUI 入門（ライブプレビュー含む）" },
  { path: "/react/accessibility/semantic-aria", name: "アクセシビリティ教材" },
  { path: "/ux-design", name: "UX デザイン Home" },
  { path: "/training", name: "トレーニング" },
  // コードブロック（テンプレートリテラル ${} 補間を含む）のシンタックス色コントラスト回帰を捕捉する
  { path: "/react/testing/playwright-e2e", name: "テスト戦略（コードブロック多数）" },
  // マニュアル別ブランドカラー（index.css の [data-manual] が primary 系を上書きする）は
  // マニュアルごとに別の色値になる。1 マニュアルでも検査を欠くとその色だけコントラスト
  // 未達を見逃すため、上書きを持つマニュアルすべてから代表 1 ページを取る。
  { path: "/git/environment/prerequisites", name: "Git（ブランド色）" },
  { path: "/claude-mux/getting-started/why-claude-code", name: "Claude Code（ブランド色）" },
  // 学習パス再編で追加したページ。表・コードブロック・VerifiedBox・外部リンクを含むので
  // 3 テーマとも個別に当てる（代表ページの抜き取りでは新規ページの退行を捕捉できない）。
  { path: "/claude-mux/claude-core/explore-plan-code-commit", name: "探索→計画→コード→コミット" },
  { path: "/claude-mux/claude-core/project-rules", name: "CLAUDE.md と rules（表）" },
  { path: "/claude-mux/claude-core/permission-modes", name: "パーミッションモード（表）" },
  { path: "/claude-mux/agent-extensions/skills-deep-dive", name: "Skills 深掘り（表）" },
  { path: "/claude-mux/best-practices/verification-and-trust", name: "検証スキル" },
  { path: "/claude-mux/best-practices/browser-verification", name: "ブラウザと画面での検証" },
  { path: "/threejs/basics/scene", name: "Three.js（ブランド色）" },
  { path: "/ai-ml/ai-overview/landscape", name: "AI・ML（ブランド色）" },
  { path: "/api/quickstart", name: "API 設計（ブランド色）" },
  { path: "/vue/basics/setup", name: "Vue / Nuxt（ブランド色）" },
] as const;

// ThemeContext は html に付与するクラスでテーマを切り替える（dark / dark+dark-soft）
const THEMES = [
  { name: "Light", classes: [] as string[] },
  { name: "Dark", classes: ["dark"] },
  { name: "Dracula", classes: ["dark", "dark-soft"] },
] as const;

for (const theme of THEMES) {
  for (const { path, name } of PAGES) {
    test(`[${theme.name}] ${name} (${path}): critical/serious な a11y 違反がない`, async ({
      page,
    }) => {
      test.setTimeout(60_000);
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.locator("h1").first()).toBeVisible({ timeout: 15_000 });

      // テーマクラスを直接適用（ThemeContext と同じ html クラス）
      await page.evaluate((classes) => {
        const root = document.documentElement;
        root.classList.remove("dark", "dark-soft");
        classes.forEach((c) => root.classList.add(c));
      }, theme.classes as string[]);

      // page-enter 等のフェード中の中間色を axe が誤検出しないようアニメーションを止める
      await page.addStyleTag({
        content:
          "*,*::before,*::after{animation:none!important;transition:none!important;opacity:1!important}",
      });

      const results = await new AxeBuilder({ page })
        // プレビュー iframe 内は教材コード（学習者の編集対象）なので対象外
        .exclude('iframe[title="プレビュー"]')
        .analyze();

      const blocking = results.violations.filter(
        (v) => v.impact === "critical" || v.impact === "serious",
      );
      const summary = blocking
        .map(
          (v) =>
            `[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} 箇所, 例: ${v.nodes[0]?.target.join(" ")})`,
        )
        .join("\n");
      expect(blocking, `a11y 違反:\n${summary}`).toEqual([]);
    });
  }
}

// ------------------------------------------------------------
// マニュアル切り替え（展開状態）
//
// 上のページ単位の検査は畳んだ状態しか踏まないため、開いたときにだけ現れる
// 一覧を個別に当てる。対象はマニュアル名・進捗率・リンクのロールとフォーカス。
//
// バッジ（ManualGlyph）の頭文字はここでは検査されない。aria-hidden を付けており
// axe が color-contrast の対象から外すため。実測で確認済み（alpha を 1 にして
// 頭文字を沈めても、この検査は緑のままだった）。バッジ地色のコントラストは
// client/src/lib/theme-contrast.test.ts が 10 マニュアル × 3 テーマで見ている。
// ------------------------------------------------------------
for (const theme of THEMES) {
  test(`[${theme.name}] マニュアル切り替えを開いた状態: critical/serious な a11y 違反がない`, async ({
    page,
  }) => {
    test.setTimeout(60_000);
    await page.goto("/claude-mux/getting-started/why-claude-code", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 15_000 });

    await page.evaluate((classes) => {
      const root = document.documentElement;
      root.classList.remove("dark", "dark-soft");
      classes.forEach((c) => root.classList.add(c));
    }, theme.classes as string[]);
    await page.addStyleTag({
      content:
        "*,*::before,*::after{animation:none!important;transition:none!important;opacity:1!important}",
    });

    await page.getByRole("button", { name: /マニュアルを切り替え/ }).click();
    const list = page.locator("#manual-switcher-list");
    await expect(list).toBeVisible();
    // 現在のマニュアルはトリガー行が担うので、一覧には残りだけが並ぶ
    await expect(list.locator("li")).toHaveCount(9);

    const results = await new AxeBuilder({ page }).include("nav").analyze();
    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    const summary = blocking
      .map(
        (v) =>
          `[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} 箇所, 例: ${v.nodes[0]?.target.join(" ")})`,
      )
      .join("\n");
    expect(blocking, `a11y 違反:\n${summary}`).toEqual([]);
  });
}
