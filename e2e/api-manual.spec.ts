import { test, expect } from "@playwright/test";

// API 設計マニュアルの全ページが実際に描画されることを検証するスモークテスト。
// tsc / ビルドでは捕捉できない「描画時の例外」を検出する目的。

const API_ROUTES = [
  "/api",
  "/api/basics/what-is-api",
  "/api/basics/http",
  "/api/basics/rest",
  "/api/basics/resources",
  "/api/rest-design/http-methods",
  "/api/rest-design/status-codes",
  "/api/rest-design/request-response",
  "/api/rest-design/pagination",
  "/api/rest-design/error-handling",
  "/api/openapi/what-is-openapi",
  "/api/openapi/document-structure",
  "/api/openapi/schema-components",
  "/api/openapi/swagger-ui",
  "/api/openapi/schema-first",
  "/api/build/mock-server",
  "/api/build/validation",
  "/api/build/auth",
  "/api/build/versioning",
  "/api/quality/contract-testing",
  "/api/quality/linting",
  "/api/quality/security",
  "/api/advanced/beyond-rest",
  "/api/advanced/summary",
];

test("API マニュアルの全ページが例外なく描画される", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (err) => pageErrors.push(err.message));

  for (const route of API_ROUTES) {
    pageErrors.length = 0;
    await page.goto(route, { waitUntil: "networkidle" });

    // h1 が存在し、空でないテキストを持つこと（＝コンポーネントが描画された）
    const h1 = page.locator("h1").first();
    await expect(h1, `h1 が見つからない: ${route}`).toBeVisible();
    const text = (await h1.textContent())?.trim() ?? "";
    expect(text.length, `h1 が空: ${route}`).toBeGreaterThan(0);

    // 描画時に未捕捉例外が出ていないこと
    expect(
      pageErrors,
      `描画時に例外: ${route} -> ${pageErrors.join(" | ")}`,
    ).toEqual([]);
  }
});
