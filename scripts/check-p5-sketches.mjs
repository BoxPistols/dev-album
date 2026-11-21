// p5.js マニュアルのスケッチを実ブラウザで走らせて検査する。
//
// 型検査とビルドは「スケッチが文字列として正しい」ことしか見ない。描画時に落ちるスケッチは
// ページ上で赤いエラー表示になるだけで、どのテストも気づかない。ここでは教材ページから
// スケッチを取り出し、プレビューと同じ HTML で実際に数フレーム回して、エラーが出ないことを確かめる。
//
// 使い方:
//   pnpm check:p5                      全スケッチを検査
//   pnpm check:p5 basics/FirstSketch   パスに一致するファイルだけ検査
//   pnpm check:p5 --shots=<dir>        各スケッチのスクリーンショットを <dir> に保存
//   CHROMIUM_PATH=/path/to/chrome pnpm check:p5   既定のブラウザが無い環境
//   pnpm check:p5 --fake-media         カメラ・マイクを擬似デバイスで許可して走らせる
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright';
import { buildP5PreviewHtml, isP5Sketch } from '../client/src/lib/preview.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
const PAGES_DIR = path.join(ROOT, 'client/src/pages/p5js');
const VENDOR_DIR = path.join(ROOT, 'client/public/vendor');

const args = process.argv.slice(2);
const shotsDir = args.find((a) => a.startsWith('--shots='))?.slice('--shots='.length);
const fakeMedia = args.includes('--fake-media');
const filters = args.filter((a) => !a.startsWith('--'));

function listFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full));
    else if (entry.name.endsWith('.tsx')) out.push(full);
  }
  return out.sort();
}

/** ファイル中のテンプレートリテラルから p5 のスケッチを取り出す */
export function extractSketches(src) {
  const sketches = [];
  const pattern = /`((?:[^`\\]|\\[\s\S])*)`/g;
  let m;
  while ((m = pattern.exec(src)) !== null) {
    const code = m[1]
      .replace(/\\`/g, '`')
      .replace(/\\\$/g, '$')
      .replace(/\\\\/g, '\\');
    if (isP5Sketch(code)) {
      const line = src.slice(0, m.index).split('\n').length;
      sketches.push({ code, line });
    }
  }
  return sketches;
}

const files = listFiles(PAGES_DIR).filter(
  (f) => filters.length === 0 || filters.some((x) => f.includes(x)),
);

const targets = [];
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  for (const sketch of extractSketches(src)) {
    targets.push({ file: path.relative(PAGES_DIR, file), ...sketch });
  }
}

if (targets.length === 0) {
  console.error('検査対象のスケッチが 0 件です');
  process.exit(1);
}

// プレビューは /vendor/ を同一オリジンから読むので、同じ配置で配る
const pagesByPath = new Map();
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname.startsWith('/vendor/')) {
    const file = path.join(VENDOR_DIR, path.basename(url.pathname));
    if (fs.existsSync(file)) {
      res.writeHead(200, { 'content-type': 'text/javascript' });
      fs.createReadStream(file).pipe(res);
      return;
    }
  }
  const html = pagesByPath.get(url.pathname);
  if (html) {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }
  res.writeHead(404);
  res.end();
});
await new Promise((resolve) => server.listen(0, resolve));
const origin = `http://localhost:${server.address().port}`;

// 既定のブラウザが入っていない環境では CHROMIUM_PATH で実行ファイルを指す
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: [
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--ignore-gpu-blocklist',
    ...(fakeMedia ? ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] : []),
  ],
});
const context = await browser.newContext({
  viewport: { width: 720, height: 520 },
  permissions: fakeMedia ? ['camera', 'microphone'] : [],
});
if (shotsDir) fs.mkdirSync(shotsDir, { recursive: true });

const failures = [];
let index = 0;
for (const target of targets) {
  index += 1;
  const id = `/s${index}`;
  pagesByPath.set(id, buildP5PreviewHtml(target.code, true));
  const label = `${target.file}:${target.line}`;
  const hasBlanks = /\b___\b/.test(target.code);
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('pageerror', (e) => consoleErrors.push(e.message));
  try {
    await page.goto(origin + id, { waitUntil: 'load' });
    // 操作で始まるスケッチ（クリックで音を出す等）もあるので、中央を 1 回押して少し動かす
    await page.waitForTimeout(700);
    await page.mouse.move(300, 200);
    await page.mouse.move(380, 260, { steps: 5 });
    await page.mouse.click(360, 240);
    for (const b of await page.locator("main button").all()) await b.click().catch(() => {});
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(900);
    const state = await page.evaluate(() => ({
      error: document.getElementById('__error').style.display === 'block'
        ? document.getElementById('__error').textContent
        : '',
      hasCanvas: !!document.querySelector('canvas'),
      frames: typeof frameCount === 'number' ? frameCount : -1,
    }));
    const problems = [];
    if (!hasBlanks) {
      if (state.error) problems.push(state.error);
      if (!state.hasCanvas) problems.push('canvas が作られていない');
      for (const e of consoleErrors) if (!state.error.includes(e)) problems.push(e);
    }
    if (shotsDir) {
      const name = `${String(index).padStart(3, '0')}-${target.file.replace(/[\\/]/g, '_').replace('.tsx', '')}-L${target.line}.png`;
      await page.screenshot({ path: path.join(shotsDir, name) });
    }
    if (problems.length > 0) {
      failures.push({ label, problems });
      console.log(`NG  ${label}\n    ${problems.join('\n    ')}`);
    } else {
      console.log(`ok  ${label}${hasBlanks ? '（空欄あり: 実行時エラーは検査しない）' : ` (${state.frames} frames)`}`);
    }
  } catch (e) {
    failures.push({ label, problems: [String(e)] });
    console.log(`NG  ${label}\n    ${e}`);
  } finally {
    await page.close();
  }
}

await browser.close();
server.close();

console.log(`\n${targets.length} 件中 ${targets.length - failures.length} 件が正常`);
process.exit(failures.length > 0 ? 1 : 0);
