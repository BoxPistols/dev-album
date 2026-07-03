import { test, expect, type Page } from "@playwright/test";

// ============================================================
// 外部ライブラリを使うライブプレビューの実描画テスト
// （MUI / Tailwind / styled-components / Emotion が CDN 経由で
//   本当にレンダリングされることを iframe 内部まで見て検証する）
// ============================================================

/** ページ内のいずれかのプレビュー iframe で predicate が真になるまで待つ */
async function waitForAnyPreviewFrame(
  page: Page,
  predicate: string,
  timeout = 25_000,
): Promise<boolean> {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    for (const frame of page.frames()) {
      if (frame === page.mainFrame()) continue;
      try {
        const ok = await frame.evaluate(predicate);
        if (ok) return true;
      } catch {
        // iframe の再生成中などは無視してリトライ
      }
    }
    await page.waitForTimeout(500);
  }
  return false;
}

test.describe("MUI プレビュー（実 MUI コンポーネント）", () => {
  test("MUI 入門: Button が MuiButton クラスで描画される", async ({ page }) => {
    await page.goto("/react/mui/intro");
    const ok = await waitForAnyPreviewFrame(
      page,
      `!!document.querySelector('.MuiButton-contained')`,
    );
    expect(ok, "MuiButton-contained がプレビュー内に見つからない").toBe(true);
  });

  test("MUI コンポーネント活用: Alert と Tabs が実 MUI で描画される", async ({
    page,
  }) => {
    await page.goto("/react/mui/components");
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight / 2),
    );
    const alertOk = await waitForAnyPreviewFrame(
      page,
      `!!document.querySelector('.MuiAlert-root')`,
    );
    expect(alertOk, "MuiAlert-root がプレビュー内に見つからない").toBe(true);
    const tabsOk = await waitForAnyPreviewFrame(
      page,
      `!!document.querySelector('.MuiTabs-root')`,
    );
    expect(tabsOk, "MuiTabs-root がプレビュー内に見つからない").toBe(true);
  });

  test("MUI カスタマイズ: テーマ適用済みコンポーネントが描画される", async ({
    page,
  }) => {
    await page.goto("/react/mui/customization");
    const ok = await waitForAnyPreviewFrame(
      page,
      `!!document.querySelector('[class*="Mui"]')`,
    );
    expect(ok, "MUI コンポーネントがプレビュー内に見つからない").toBe(true);
  });
});

test.describe("Tailwind プレビュー（実コンパイル）", () => {
  const tailwindCompiled = `(() => {
    const styles = Array.from(document.querySelectorAll('style'));
    return styles.some((s) =>
      s.textContent.includes('tailwindcss v4') &&
      /\\.(p-|m-|bg-|text-|flex|grid|rounded)/.test(s.textContent)
    );
  })()`;

  for (const [name, path] of [
    ["Tailwind 入門", "/react/tailwind/intro"],
    ["レスポンシブとダークモード", "/react/tailwind/responsive-dark"],
    ["shadcn/ui", "/react/tailwind/shadcn"],
  ] as const) {
    test(`${name}: ユーティリティクラスが実コンパイルされる`, async ({
      page,
    }) => {
      await page.goto(path);
      const ok = await waitForAnyPreviewFrame(page, tailwindCompiled);
      expect(ok, `${path} のプレビューで Tailwind が動いていない`).toBe(true);
    });
  }
});

test.describe("CSS-in-JS プレビュー（実ライブラリ）", () => {
  test("styled-components: sc- クラスが生成される", async ({ page }) => {
    await page.goto("/react/css-basics/styled-components");
    const ok = await waitForAnyPreviewFrame(
      page,
      `!!document.querySelector('[class*="sc-"]')`,
    );
    expect(ok, "styled-components の生成クラスが見つからない").toBe(true);
  });

  test("Emotion: css- クラスが生成される", async ({ page }) => {
    await page.goto("/react/css-basics/emotion");
    const ok = await waitForAnyPreviewFrame(
      page,
      `Array.from(document.querySelectorAll('#root *')).some((el) => /(^|\\s)css-/.test(el.className || ''))`,
    );
    expect(ok, "Emotion の生成クラスが見つからない").toBe(true);
  });
});
