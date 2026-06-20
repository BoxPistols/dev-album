import { test, expect } from "@playwright/test";

// API 設計マニュアルの全ページが実際に描画されることを検証するスモークテスト。
// tsc / ビルドでは捕捉できない「描画時の例外」を検出する目的。

const API_ROUTES = [
  "/api",
  "/api/quickstart",
  "/api/basics/what-is-api",
  "/api/basics/http",
  "/api/basics/rest",
  "/api/basics/resources",
  "/api/data-modeling/er-diagram",
  "/api/data-modeling/normalization",
  "/api/data-modeling/design-flow",
  "/api/data-modeling/worked-example",
  "/api/rest-design/http-methods",
  "/api/rest-design/status-codes",
  "/api/rest-design/request-response",
  "/api/rest-design/pagination",
  "/api/rest-design/error-handling",
  "/api/rest-design/caching",
  "/api/rest-design/idempotency",
  "/api/build/rate-limiting",
  "/api/build/webhooks",
  "/api/quality/observability",
  "/api/quality/debugging-tools",
  "/api/collaboration/backend-frontend",
  "/api/collaboration/design-and-api",
  "/api/practice/react",
  "/api/practice/nextjs",
  "/api/practice/vue",
  "/api/practice/nuxt",
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
  "/vue",
  "/vue/basics/setup",
  "/vue/basics/template-syntax",
  "/vue/basics/reactivity",
  "/vue/basics/components",
  "/vue/basics/props-emits",
  "/vue/composition/script-setup",
  "/vue/composition/computed-watch",
  "/vue/composition/lifecycle",
  "/vue/composition/composables",
  "/vue/composition/provide-inject",
  "/vue/state-routing/router",
  "/vue/state-routing/pinia",
  "/vue/styling/sfc-styling",
  "/vue/nuxt-basics/what-is-nuxt",
  "/vue/nuxt-basics/routing-layouts",
  "/vue/nuxt-basics/data-fetching",
  "/vue/nuxt-server/server-api",
  "/vue/nuxt-server/rendering-modes",
  "/vue/nuxt-server/middleware-plugins",
  "/vue/nuxt-server/deploy",
  "/vue/advanced/latest-features",
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

// データモデリング各ページの mermaid ER図が実際に SVG として描画されること
const MERMAID_ROUTES = [
  "/api/data-modeling/er-diagram",
  "/api/data-modeling/normalization",
  "/api/data-modeling/design-flow",
  "/api/data-modeling/worked-example",
  // Vue/Nuxt の概念図
  "/vue/basics/reactivity",
  "/vue/composition/lifecycle",
  "/vue/nuxt-basics/data-fetching",
  "/vue/nuxt-server/rendering-modes",
  "/vue/nuxt-server/server-api",
  "/vue/state-routing/pinia",
  // API マニュアルの概念図（シーケンス図・フローチャート）
  "/api/build/auth",
  "/api/build/webhooks",
  "/api/rest-design/idempotency",
  "/api/build/rate-limiting",
  "/api/rest-design/status-codes",
  "/api/quality/contract-testing",
  // Git マニュアルの gitGraph
  "/git/workflow/branch",
];

test("mermaid ER図が実際の SVG として可視化される", async ({ page }) => {
  for (const route of MERMAID_ROUTES) {
    await page.goto(route, { waitUntil: "networkidle" });
    // MermaidDiagram が生成した SVG が DOM に存在し、表示されていること
    const svg = page.locator(".mermaid-svg svg").first();
    await expect(svg, `mermaid SVG が描画されない: ${route}`).toBeVisible({
      timeout: 15_000,
    });
    // SVG 内にエンティティ名（テキスト）が含まれること（空の図でないこと）
    const svgText = (await svg.textContent())?.trim() ?? "";
    expect(svgText.length, `mermaid SVG が空: ${route}`).toBeGreaterThan(0);
  }
});
