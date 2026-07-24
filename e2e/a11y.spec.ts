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
