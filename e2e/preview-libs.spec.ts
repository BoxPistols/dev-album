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

test.describe("プレビューのエラー不変条件（全 iframe 走査）", () => {
  // プレビュー iframe がエラー表示になっていたらその内容を返す
  const detectError = `(() => {
    const root = document.getElementById('root');
    if (root) {
      const strong = root.querySelector('div > strong');
      if (strong && strong.textContent === 'Error:') {
        return 'runtime: ' + root.textContent.slice(0, 120);
      }
      return null;
    }
    // トランスパイルエラーページは #root がなく body 直下が <pre> のみ
    const first = document.body && document.body.firstElementChild;
    if (
      document.body &&
      document.body.children.length === 1 &&
      first &&
      first.tagName === 'PRE' &&
      getComputedStyle(document.body).color === 'rgb(243, 139, 168)'
    ) {
      return 'transpile: ' + first.textContent.slice(0, 120);
    }
    return null;
  })()`;

  const PAGES = [
    "/react/mui/intro",
    "/react/mui/components",
    "/react/mui/customization",
    "/react/tailwind/intro",
    "/react/tailwind/responsive-dark",
    "/react/tailwind/shadcn",
    "/react/css-basics/styled-components",
    "/react/css-basics/emotion",
  ];

  for (const path of PAGES) {
    test(`${path}: 全プレビューがエラー表示にならない`, async ({ page }) => {
      test.setTimeout(60_000);
      await page.goto(path);
      // 遅延描画対策で末尾までスクロールし、CDN ロードと描画を待つ
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(8_000);

      const errors: string[] = [];
      let frameCount = 0;
      for (const frame of page.frames()) {
        if (frame === page.mainFrame()) continue;
        frameCount++;
        try {
          const err = await frame.evaluate(detectError);
          if (err) errors.push(err as string);
        } catch {
          // 再生成中の frame は無視
        }
      }
      expect(frameCount, "プレビュー iframe が 1 つも見つからない").toBeGreaterThan(0);
      expect(errors, `エラー表示のプレビューあり:\n${errors.join("\n")}`).toEqual([]);
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
