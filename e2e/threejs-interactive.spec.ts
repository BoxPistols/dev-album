import { test, expect, type Locator } from "@playwright/test";

// スライダーをキーボード矢印キーで操作するヘルパー
async function nudgeSlider(
  page: import("@playwright/test").Page,
  slider: Locator,
  presses: number,
  direction: "ArrowRight" | "ArrowLeft" = "ArrowRight",
) {
  await slider.focus();
  for (let i = 0; i < presses; i++) {
    await page.keyboard.press(direction);
  }
}

// ============================================================
// Three.js インタラクティブパラメータ テスト
// ============================================================

test.describe("Three.js インタラクティブパラメータ", () => {
  test("カメラページ: fov スライダーでキャプションが更新される", async ({
    page,
  }) => {
    await page.goto("/threejs/basics/camera");
    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeVisible({ timeout: 15_000 });

    // 初期キャプション確認（キャプション div 内）
    const captionDiv = page.locator(".bg-slate-800").first();
    await expect(captionDiv).toBeVisible();
    const initialText = await captionDiv.textContent();
    expect(initialText).toContain("fov: 75");

    // fov スライダーを矢印キーで操作
    const fovSlider = page.locator('[role="slider"]').first();
    await nudgeSlider(page, fovSlider, 10, "ArrowRight");

    // キャプションが変わったことを確認
    const updatedText = await captionDiv.textContent();
    expect(updatedText).not.toBe(initialText);
  });

  test("カメラページ: position.z スライダーでキャプションが更新される", async ({
    page,
  }) => {
    await page.goto("/threejs/basics/camera");
    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeVisible({ timeout: 15_000 });

    // キャプション div
    const captionDiv = page.locator(".bg-slate-800").first();
    await expect(captionDiv).toBeVisible();
    const initialText = await captionDiv.textContent();

    // 2番目のスライダー (position.z) を矢印キーで操作
    const posSlider = page.locator('[role="slider"]').nth(1);
    await nudgeSlider(page, posSlider, 10, "ArrowLeft");

    const updatedText = await captionDiv.textContent();
    expect(updatedText).not.toBe(initialText);
  });

  test("カメラページ: Canvas が存在しスライダー操作後も表示されている", async ({
    page,
  }) => {
    await page.goto("/threejs/basics/camera");
    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeVisible({ timeout: 15_000 });

    // スライダーを操作
    const fovSlider = page.locator('[role="slider"]').first();
    await nudgeSlider(page, fovSlider, 5, "ArrowRight");

    // Canvas がクラッシュしていないことを確認
    await expect(canvas).toBeVisible();
  });

  test("ジオメトリページ: 幅スライダーでキャプションが更新される", async ({
    page,
  }) => {
    await page.goto("/threejs/basics/geometry");
    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeVisible({ timeout: 15_000 });

    // キャプション div 内の値を確認
    const captionDiv = page.locator(".bg-slate-800").first();
    await expect(captionDiv).toBeVisible();
    const initialText = await captionDiv.textContent();

    // 幅スライダーを操作
    const widthSlider = page.locator('[role="slider"]').first();
    await nudgeSlider(page, widthSlider, 10, "ArrowRight");

    const updatedText = await captionDiv.textContent();
    expect(updatedText).not.toBe(initialText);
  });

  test("ライトページ: 5つのスライダーが表示される", async ({ page }) => {
    await page.goto("/threejs/basics/light");
    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeVisible({ timeout: 15_000 });

    // 5つのスライダーが存在
    const sliders = page.locator('[role="slider"]');
    await expect(sliders).toHaveCount(5);
  });

  test("ライトページ: 環境光スライダーで値が変わる", async ({ page }) => {
    await page.goto("/threejs/basics/light");
    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeVisible({ timeout: 15_000 });

    // スライダーコンテナ内の値表示を取得
    const sliderContainer = page
      .locator(".bg-card")
      .filter({ has: page.locator('[role="slider"]') })
      .first();
    const valueDisplay = sliderContainer.locator(".font-mono").first();
    const initialValue = await valueDisplay.textContent();

    // スライダーを操作
    const slider = page.locator('[role="slider"]').first();
    await nudgeSlider(page, slider, 10, "ArrowRight");

    const updatedValue = await valueDisplay.textContent();
    expect(updatedValue).not.toBe(initialValue);
  });

  test("アニメーションページ: 速度スライダーが存在する", async ({ page }) => {
    await page.goto("/threejs/basics/animation");
    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeVisible({ timeout: 15_000 });

    const slider = page.locator('[role="slider"]').first();
    await expect(slider).toBeVisible();
  });
});

// ============================================================
// 全インタラクティブページの Canvas + スライダー存在チェック
// ============================================================

test.describe("Three.js インタラクティブ: ページ別存在チェック", () => {
  const interactivePages = [
    { path: "/threejs/basics/camera", sliderCount: 2, label: "カメラ" },
    { path: "/threejs/basics/geometry", sliderCount: 3, label: "ジオメトリ" },
    { path: "/threejs/basics/light", sliderCount: 5, label: "ライト" },
    {
      path: "/threejs/basics/animation",
      sliderCount: 1,
      label: "アニメーション",
    },
    {
      path: "/threejs/applied/orbit-controls",
      sliderCount: 4,
      label: "オービットコントロール",
    },
    {
      path: "/threejs/applied/post-processing",
      sliderCount: 2,
      label: "ポストプロセス",
    },
    { path: "/threejs/game-dev/aircraft", sliderCount: 3, label: "航空機" },
    { path: "/threejs/game-dev/physics", sliderCount: 3, label: "物理演算" },
    {
      path: "/threejs/game-dev/camera",
      sliderCount: 3,
      label: "ゲームカメラ",
    },
  ];

  for (const { path, sliderCount, label } of interactivePages) {
    test(`${label}: Canvas とスライダー ${sliderCount} 個が表示される`, async ({
      page,
    }) => {
      await page.goto(path);
      const canvas = page.locator("canvas").first();
      await expect(canvas).toBeVisible({ timeout: 15_000 });

      const sliders = page.locator('[role="slider"]');
      const actualCount = await sliders.count();
      expect(actualCount).toBeGreaterThanOrEqual(sliderCount);
    });
  }
});
