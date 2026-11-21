// p5.jsのnoise()が実際に返す値の範囲を測る。
// 「ノイズ」のページ（/p5js/random/noise）に書いた実測値の再現用。
//
//   node scripts/measure-p5-noise.mjs
//   CHROMIUM_PATH=/path/to/chrome node scripts/measure-p5-noise.mjs   既定のブラウザが無い環境
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const P5 = path.resolve(import.meta.dirname, '../client/public/vendor/p5-2.4.0.min.js');
const SKETCH = `
function setup() {
  createCanvas(10, 10);
  const n = 200000;
  let lo = 1, hi = 0, under = 0, over = 0;
  for (let i = 0; i < n; i++) {
    const v = noise(i * 0.37, i * 0.11);
    lo = min(lo, v); hi = max(hi, v);
    if (v < 0.2) under++;
    if (v > 0.8) over++;
  }
  const result = { samples: n, min: lo, max: hi, under02: under / n, over08: over / n };
  noiseDetail(1, 0.5);
  let hi1 = 0;
  for (let i = 0; i < n; i++) hi1 = max(hi1, noise(i * 0.37, i * 0.11));
  result.maxWithNoiseDetail1 = hi1;
  window.RESULT = result;
}`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
await page.setContent(
  '<html><body><script>' + fs.readFileSync(P5, 'utf8') + '</script><script>' + SKETCH + '</script></body></html>',
);
await page.waitForFunction(() => window.RESULT);
console.log(JSON.stringify(await page.evaluate(() => window.RESULT), null, 2));
await browser.close();
