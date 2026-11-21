import { test, expect, type Frame, type Page } from '@playwright/test';

// ============================================================
// p5.jsマニュアルのプレビュー
//
// p5のスケッチはiframeの中でp5.jsがグローバルモードで実行する。型検査・単体テスト・ビルドは
// 「スケッチが文字列として正しい」ことまでしか見ないので、実際に動くこと、枠の操作
// （一時停止）が効くこと、書き換えた内容が下書きとして残ることを実描画で確かめる。
// 全スケッチの実行はpnpm check:p5が受け持つ。ここは仕組みの回帰を止めるための最小限。
// ============================================================

const FIRST_SKETCH = '/p5js/basics/first-sketch';

/** ページ先頭のプレビューiframeの中身（スケッチが動いているフレーム）を返す */
async function firstSketchFrame(page: Page): Promise<Frame> {
  const iframe = page.locator('iframe[title="プレビュー"]').first();
  await expect(iframe).toBeVisible({ timeout: 15_000 });
  const handle = await iframe.elementHandle();
  const frame = await handle?.contentFrame();
  if (!frame) throw new Error('プレビューのiframeを取得できない');
  await frame.waitForSelector('canvas', { timeout: 15_000 });
  return frame;
}

function frameCountOf(frame: Frame): Promise<number> {
  return frame.evaluate(() => (window as unknown as { frameCount: number }).frameCount);
}

test.describe('p5.jsのプレビュー', () => {
  test('スケッチが動き、エラー表示が出ない', async ({ page }) => {
    await page.goto(FIRST_SKETCH);
    const frame = await firstSketchFrame(page);

    // draw()がくり返し呼ばれている（フレーム数が進む）
    await expect.poll(() => frameCountOf(frame), { timeout: 10_000 }).toBeGreaterThan(5);
    await expect(frame.locator('#__error')).toBeHidden();
  });

  test('一時停止で止まり、再生で動き出す（WCAG 2.2.2）', async ({ page }) => {
    await page.goto(FIRST_SKETCH);
    const frame = await firstSketchFrame(page);
    await expect.poll(() => frameCountOf(frame), { timeout: 10_000 }).toBeGreaterThan(5);

    const toggle = frame.locator('#__toggle');
    await toggle.click();
    await expect(toggle).toHaveText('再生');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    // 押した直後の1フレームが終わるのを待ってから、進まないことを確かめる
    await page.waitForTimeout(300);
    const paused = await frameCountOf(frame);
    await page.waitForTimeout(600);
    expect(await frameCountOf(frame)).toBe(paused);

    await toggle.click();
    await expect(toggle).toHaveText('一時停止');
    await expect.poll(() => frameCountOf(frame), { timeout: 10_000 }).toBeGreaterThan(paused);
  });

  test('書き換えたスケッチは下書きとして残り、リセットで元に戻る', async ({ page }) => {
    await page.goto(FIRST_SKETCH);
    await firstSketchFrame(page);

    const editor = page.locator('textarea').first();
    const original = await editor.inputValue();
    const edited = original.replace('createCanvas(600, 400)', 'createCanvas(300, 300)');
    expect(edited).not.toBe(original);
    await editor.fill(edited);
    await expect(page.getByText('下書きを保存済み').first()).toBeVisible();

    // 再読み込みしても、書き換えた内容で開く
    await page.reload();
    await expect(page.locator('textarea').first()).toHaveValue(edited, { timeout: 15_000 });
    const frame = await firstSketchFrame(page);
    await expect
      .poll(() => frame.evaluate(() => (window as unknown as { width: number }).width), {
        timeout: 10_000,
      })
      .toBe(300);

    // リセットで元のコードに戻り、下書きも消える
    await page.locator('button[title="リセット"]').first().click();
    await expect(page.locator('textarea').first()).toHaveValue(original);
    const drafts = await page.evaluate(() =>
      Object.keys(window.localStorage).filter((key) => key.startsWith('sketch-draft:')),
    );
    expect(drafts).toEqual([]);
  });

  test('狭い画面では、結果をコードの上に積む', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(FIRST_SKETCH);
    await firstSketchFrame(page);

    const iframeBox = await page.locator('iframe[title="プレビュー"]').first().boundingBox();
    const editorBox = await page.locator('textarea').first().boundingBox();
    expect(iframeBox).not.toBeNull();
    expect(editorBox).not.toBeNull();
    // 横に並べるとキャンバスが極端に小さくなる。結果が上、コードが下で、幅はほぼ全幅
    expect(iframeBox!.y).toBeLessThan(editorBox!.y);
    expect(iframeBox!.width).toBeGreaterThan(300);
  });
});
