import { test, expect } from "@playwright/test";

// ============================================================
// ゲーミフィケーション機能テスト
// ============================================================

test.describe("ストリークカウンター", () => {
  test("ステップ完了後にサイドバーにストリークが表示される", async ({
    page,
  }) => {
    // localStorage にストリーク情報をセット
    await page.goto("/");
    await page.evaluate(() => {
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem(
        "streak-data",
        JSON.stringify({
          lastActiveDate: today,
          currentStreak: 3,
          activeDates: [today],
        }),
      );
    });

    // リロードしてサイドバーに反映
    await page.goto("/react");
    await page.waitForTimeout(1_000);

    // ストリーク表示を確認（「3日連続」テキスト）
    const streak = page.locator("text=3日連続");
    await expect(streak).toBeVisible({ timeout: 5_000 });
  });
});

test.describe("実績パネル", () => {
  test("ナビゲーションに実績ボタンが存在する", async ({ page }) => {
    // 実績を1つ解除した状態にする
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem(
        "achievements",
        JSON.stringify([
          { id: "first-step", unlockedAt: new Date().toISOString() },
        ]),
      );
    });

    await page.goto("/react");
    await page.waitForTimeout(1_000);

    // 実績ボタンを確認（Trophy アイコン付きの「実績」テキスト）
    const achievementBtn = page.locator('button:has-text("実績")');
    await expect(achievementBtn).toBeVisible({ timeout: 5_000 });

    // クリックして実績パネルが展開される
    await achievementBtn.click();
    // AchievementBadge が表示される（"First Step" テキスト）
    const badge = page.locator("text=First Step");
    await expect(badge).toBeVisible({ timeout: 3_000 });
  });
});

test.describe("CodingChallenge セレブレーション", () => {
  test("正解時に成功メッセージが表示される", async ({ page }) => {
    await page.goto("/training");
    await page.waitForTimeout(2_000);

    // 最初の CodingChallenge のエディタを取得
    const editor = page.locator("textarea").first();
    await expect(editor).toBeVisible({ timeout: 10_000 });

    // 模範解答ボタンをクリックして解答を確認し、それをエディタにコピー
    const answerBtn = page.locator('button:has-text("模範解答を見る")').first();
    await answerBtn.click();
    await page.waitForTimeout(500);

    // 模範解答のコードを取得
    const answerCode = await page.locator("pre").nth(1).textContent();
    if (answerCode) {
      // エディタに模範解答を設定
      await editor.focus();
      await editor.fill(answerCode);
    }

    // チェックボタンを押す
    const checkBtn = page.locator('button:has-text("チェックする")').first();
    await checkBtn.click();

    // 正解メッセージが表示される
    const successMsg = page.locator("text=正解！素晴らしい！").first();
    await expect(successMsg).toBeVisible({ timeout: 5_000 });
  });
});

test.describe("LP ゲーミフィケーションセクション", () => {
  test("LP に「体験してみる」CodingChallenge セクションがある", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForTimeout(1_000);

    // 「体験してみる」見出しが存在する
    const tryItHeading = page.locator('h2:has-text("体験してみる")');
    await expect(tryItHeading).toBeVisible({ timeout: 5_000 });

    // CodingChallenge コンポーネントが存在する（「コーディングチャレンジ」ラベル）
    const challengeLabel = page.locator("text=コーディングチャレンジ");
    await expect(challengeLabel).toBeVisible({ timeout: 5_000 });

    // 「チェックする」ボタンが存在する
    const checkBtn = page.locator('button:has-text("チェックする")');
    await expect(checkBtn).toBeVisible({ timeout: 5_000 });
  });

  test("LP に「Coming Soon」セクションがある", async ({ page }) => {
    await page.goto("/");

    // Coming Soon テキストが存在する
    const comingSoon = page.locator("text=Coming Soon");
    await expect(comingSoon).toBeVisible({ timeout: 5_000 });

    // Coming Soon の具体的な項目が存在する
    const vuejs = page.locator("text=Vue.js / Nuxt.js");
    await expect(vuejs).toBeVisible({ timeout: 3_000 });

    const designToken = page.locator("text=デザイントークン");
    await expect(designToken).toBeVisible({ timeout: 3_000 });

    const chromatic = page.locator("text=Chromatic");
    await expect(chromatic).toBeVisible({ timeout: 3_000 });
  });
});
