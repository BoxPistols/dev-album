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

    // ストリークは「振り返り」パネル内に移動した（常時表示は廃止: 2d5f346）
    const reviewBtn = page.locator('button:has-text("振り返り")');
    await expect(reviewBtn).toBeVisible({ timeout: 10_000 });
    await reviewBtn.click();

    // ストリーク表示を確認（「3日連続」テキスト。実績バッジの説明文と区別するため exact）
    const streak = page.getByText("3日連続", { exact: true });
    await expect(streak).toBeVisible({ timeout: 5_000 });
  });
});

test.describe("振り返りパネル", () => {
  test("ナビゲーションに振り返りボタンが存在する", async ({ page }) => {
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

    // 振り返りボタンを確認（Trophy アイコン付き。旧「実績」ボタンから改名済み）
    const achievementBtn = page.locator('button:has-text("振り返り")');
    await expect(achievementBtn).toBeVisible({ timeout: 10_000 });

    // クリックして振り返りパネルが展開される
    await achievementBtn.click();
    // AchievementBadge が表示される（"First Step" テキスト）
    const badge = page.locator("text=First Step");
    await expect(badge).toBeVisible({ timeout: 3_000 });
  });
});

test.describe("CodingChallenge セレブレーション", () => {
  test("正解時に成功メッセージが表示される", async ({ page }) => {
    await page.goto("/training");

    // 最初の CodingChallenge のエディタを取得
    const editor = page.locator("textarea").first();
    await expect(editor).toBeVisible({ timeout: 15_000 });

    // 模範解答ボタンをクリックして解答を確認し、それをエディタにコピー
    const answerBtn = page.locator('button:has-text("模範解答を見る")').first();
    await answerBtn.click();

    // 模範解答ブロック（ラベル「模範解答」を持つ）内の pre からコードを取得
    // （page 全体の pre.nth(1) はエディタのハイライト層等を拾うため不安定）
    const answerBlock = page
      .locator('div:has(> div > span:text-is("模範解答"))')
      .first();
    const answerCode = await answerBlock.locator("pre").textContent();
    expect(answerCode?.trim().length ?? 0).toBeGreaterThan(0);

    // エディタに模範解答を設定
    await editor.fill(answerCode ?? "");

    // チェックボタンを押す
    const checkBtn = page.locator('button:has-text("チェックする")').first();
    await checkBtn.click();

    // 正解メッセージが表示される（メッセージは「正解！素晴らしい！」から「正解」に変更済み: 72156aa）
    const successMsg = page.getByText("正解", { exact: true }).first();
    await expect(successMsg).toBeVisible({ timeout: 5_000 });
  });
});

test.describe("LP ゲーミフィケーションセクション", () => {
  test("LP に「体験してみる」CodingChallenge セクションがある", async ({
    page,
  }) => {
    await page.goto("/");

    // 「体験してみる」見出しが存在する
    const tryItHeading = page.locator('h2:has-text("体験してみる")');
    await expect(tryItHeading).toBeVisible({ timeout: 10_000 });

    // CodingChallenge コンポーネントが存在する（「コーディングチャレンジ」ラベル）
    const challengeLabel = page.locator("text=コーディングチャレンジ");
    await expect(challengeLabel).toBeVisible({ timeout: 5_000 });

    // 「チェックする」ボタンが存在する
    const checkBtn = page.locator('button:has-text("チェックする")');
    await expect(checkBtn).toBeVisible({ timeout: 5_000 });
  });

  // 「Coming Soon」セクションはバウハウス・リデザイン (65fdf58) で意図的に撤去され、
  // 掲載予定だった Vue/Nuxt は実マニュアルとして提供済み。現行 LP の主要セクションを検証する。
  test("LP に主要セクション（お知らせ・マニュアル一覧）がある", async ({
    page,
  }) => {
    await page.goto("/");

    // 「最新のお知らせ」セクションが存在する
    const news = page.locator('h2:has-text("最新のお知らせ")');
    await expect(news).toBeVisible({ timeout: 10_000 });

    // マニュアル一覧セクションが存在する
    const manuals = page.locator('h2:has-text("マニュアル")').first();
    await expect(manuals).toBeVisible({ timeout: 5_000 });
  });
});
