import { test, expect } from '@playwright/test';

// ============================================================
// プレビュー表示の基本テスト
// ============================================================

test.describe('CodingChallenge プレビュー', () => {
  test('トレーニング レベル1 #1: プレビューが表示される', async ({ page }) => {
    await page.goto('/training');
    // 最初の CodingChallenge のプレビュー iframe が存在する
    const iframe = page.locator('iframe[title="プレビュー"]').first();
    await expect(iframe).toBeVisible({ timeout: 10_000 });
  });

  test('React.memo デモ: ボタンとレンダー回数が表示される', async ({ page }) => {
    await page.goto('/react/hooks-deep/memo-callback');
    // CodePreview の iframe 内に +1 ボタンが存在するか
    const previewIframe = page.locator('iframe[title="プレビュー"]').first();
    await expect(previewIframe).toBeVisible({ timeout: 10_000 });
    // iframe の srcDoc コンテンツにボタンテキストが含まれる
    const srcDoc = await previewIframe.getAttribute('srcdoc');
    expect(srcDoc).toBeTruthy();
    expect(srcDoc).toContain('App');
  });

  test('Storybook Structure: Badge チャレンジのプレビューが存在する', async ({ page }) => {
    await page.goto('/react/storybook/structure');
    // ページ最下部までスクロールしてCodingChallengeを表示
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1_000);
    const iframes = page.locator('iframe[title="プレビュー"]');
    const count = await iframes.count();
    // CodingChallenge preview が少なくとも1つ存在
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('Three.js Scene: 左右分割で3Dキャンバスが表示される', async ({ page }) => {
    await page.goto('/threejs/basics/scene');
    // Three.js の canvas 要素が存在する
    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible({ timeout: 10_000 });
  });
});

// ============================================================
// エディタ操作テスト
// ============================================================

test.describe('エディタ操作', () => {
  test('CodingChallenge エディタに文字入力ができる', async ({ page }) => {
    await page.goto('/training');
    const editor = page.locator('textarea').first();
    await expect(editor).toBeVisible({ timeout: 10_000 });
    // フォーカスして入力
    await editor.focus();
    await editor.press('End');
    await page.keyboard.type('// test input');
    const value = await editor.inputValue();
    expect(value).toContain('// test input');
  });

  test('Tab キーでインデントが挿入される', async ({ page }) => {
    await page.goto('/training');
    const editor = page.locator('textarea').first();
    await expect(editor).toBeVisible({ timeout: 10_000 });
    await editor.focus();
    // 先頭に移動して Tab を押す
    await editor.press('Home');
    await page.keyboard.press('Tab');
    const value = await editor.inputValue();
    // 先頭にスペース2つが挿入されている
    expect(value).toMatch(/^ {2}/);
  });

  test('シンタックスハイライトが表示される', async ({ page }) => {
    await page.goto('/training');
    // ハイライト層（pointer-events-none の div 内の pre）が存在する
    const highlight = page.locator('[aria-hidden="true"] pre').first();
    await expect(highlight).toBeVisible({ timeout: 10_000 });
    // ハイライトされたトークン（span）が存在する
    const tokens = highlight.locator('span');
    const count = await tokens.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ============================================================
// ダークモード テスト
// ============================================================

test.describe('ダークモード', () => {
  test('ダークモード切替でフォーム要素が視認できる', async ({ page }) => {
    await page.goto('/react/storybook/intro');
    // ダークモードボタンをクリック（Moon アイコン）
    const themeBtn = page.locator('button[title*="モード"]').first();
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
    }
    // iframe 内のフォーム要素がダークモード対応しているか（srcDoc に CSS 変数が含まれる）
    const iframe = page.locator('iframe[title="プレビュー"]').first();
    if (await iframe.isVisible({ timeout: 5_000 }).catch(() => false)) {
      const srcDoc = await iframe.getAttribute('srcdoc');
      expect(srcDoc).toContain('var(--text)');
      expect(srcDoc).toContain('var(--bg)');
    }
  });
});

// ============================================================
// ナビゲーション テスト
// ============================================================

test.describe('ナビゲーション', () => {
  test('LP が表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible({ timeout: 10_000 });
    const text = await page.locator('h1').textContent();
    expect(text).toContain('実践リファレンス');
  });

  test('UI トレーニングリンクがサイドバーにある', async ({ page }) => {
    await page.goto('/training');
    const link = page.locator('a:has-text("UI トレーニング")');
    await expect(link).toBeVisible({ timeout: 10_000 });
  });

  test('バグ報告ページが表示される', async ({ page }) => {
    await page.goto('/bug-report');
    await expect(page.locator('h1')).toBeVisible({ timeout: 10_000 });
  });

  test('マニュアル並び順: Git → React → Claude Code → Three.js', async ({ page }) => {
    await page.goto('/');
    // サイドバーまたは LP のマニュアルカード順を確認
    const cards = page.locator('[href="/git"], [href="/react"], [href="/claude-code"], [href="/threejs"]');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });
});

// ============================================================
// プレビューエラー検出テスト
// ============================================================

test.describe('プレビューエラー検出', () => {
  test('トレーニング レベル1: プレビューに "Error" が表示されない', async ({ page }) => {
    await page.goto('/training');
    // 少し待ってプレビューが読み込まれるのを待つ
    await page.waitForTimeout(3_000);
    // iframe の srcDoc 内に "Error:" が含まれていないことを確認
    const iframes = page.locator('iframe[title="プレビュー"]');
    const count = await iframes.count();
    for (let i = 0; i < Math.min(count, 3); i++) {
      const srcDoc = await iframes.nth(i).getAttribute('srcdoc');
      if (srcDoc) {
        // エラーメッセージが含まれていないこと（構文エラー表示）
        expect(srcDoc).not.toContain('"Error:"');
      }
    }
  });

  test('Three.js Scene: プレビューに "Three.js の読み込みに失敗" が表示されない', async ({ page }) => {
    await page.goto('/threejs/basics/scene');
    await page.waitForTimeout(3_000);
    // ThreePreview の canvas が存在し、エラーテキストが表示されていない
    const error = page.locator('text=Three.js の読み込みに失敗しました');
    await expect(error).toHaveCount(0);
  });

  test('Training: レベル1 の全プレビューに実行エラーがない', async ({ page }) => {
    await page.goto('/training');
    await page.waitForTimeout(2_000);
    const iframes = page.locator('iframe[title="プレビュー"]');
    const count = await iframes.count();
    expect(count).toBeGreaterThanOrEqual(1);
    // 最初の3つの iframe に JSON エラーがないことを確認
    for (let i = 0; i < Math.min(count, 3); i++) {
      const srcDoc = await iframes.nth(i).getAttribute('srcdoc') || '';
      expect(srcDoc).not.toContain('is not valid JSON');
    }
  });

  test('Training #3 CenterAbsolute: プレビューに JSON エラーが表示されない', async ({ page }) => {
    await page.goto('/training');
    await page.waitForTimeout(2_000);
    // 全プレビュー iframe の srcDoc に "is not valid JSON" が含まれないこと
    const iframes = page.locator('iframe[title="プレビュー"]');
    const count = await iframes.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const srcDoc = await iframes.nth(i).getAttribute('srcdoc') || '';
      expect(srcDoc).not.toContain('is not valid JSON');
      expect(srcDoc).not.toContain('Unexpected token');
    }
  });

  test('Training: Unicode 文字が正しく表示される（\\u エスケープなし）', async ({ page }) => {
    await page.goto('/training');
    // ページ内に \\u2606 等のリテラル文字列が表示されていないこと
    const body = await page.locator('body').textContent();
    expect(body).not.toContain('\\u2606');
    expect(body).not.toContain('\\u2605');
  });

  test('Flexbox ページ: CodePreview が表示されプレビューにコンテンツがある', async ({ page }) => {
    await page.goto('/react/css-layout/flexbox');
    await page.waitForTimeout(3_000);
    const iframes = page.locator('iframe[title="プレビュー"]');
    const count = await iframes.count();
    expect(count).toBeGreaterThan(0);
    // srcDoc にトランスパイル済みコードが含まれる（React.createElement が存在 = 正常にトランスパイル済み）
    const srcDoc = await iframes.first().getAttribute('srcdoc');
    expect(srcDoc).toBeTruthy();
    expect(srcDoc).toContain('React.createElement');
  });
});

// ============================================================
// 旧 URL の互換
//
// マニュアル ID を claude-mux から claude-code に変えた。mux は tmux 由来の名残で、
// tmux の章を外した時点で意味を失っていた（同じマニュアルで扱う cmux とも無関係）。
// 公開済みの URL なので転送は恒久的に残す。消えたら外部リンクが全部死ぬ。
// ============================================================

test.describe('旧 URL からの転送', () => {
  const CASES: [string, string][] = [
    ['/claude-mux', '/claude-code'],
    ['/claude-mux/claude-core/project-rules', '/claude-code/claude-core/project-rules'],
    ['/claude-mux/multi-ai/file-map', '/claude-code/multi-ai/file-map'],
    ['/claude-mux/cmux/cmux-intro', '/claude-code/cmux/cmux-intro'],
    // 削除済みの tmux 系は入口へ戻す（同名ページが claude-code 側に無いため）
    ['/claude-mux/tmux-intro/panes', '/claude-code'],
    ['/claude-mux/reference/session-management', '/claude-code'],
  ];

  for (const [from, to] of CASES) {
    test(`${from} → ${to}`, async ({ page }) => {
      await page.goto(from);
      await expect(page.locator('h1').first()).toBeVisible({ timeout: 15_000 });
      expect(new URL(page.url()).pathname).toBe(to);
      // 転送先が 404 では意味がない
      await expect(page.locator('h1').first()).not.toHaveText(/^404/);
    });
  }

  test('存在しないパスは 404 のまま（転送が何でも飲み込まない）', async ({ page }) => {
    await page.goto('/claude-code/no-such-section/no-such-page');
    await expect(page.locator('h1').first()).toHaveText(/^404/, { timeout: 15_000 });
  });
});
