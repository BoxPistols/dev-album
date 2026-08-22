// Tailwind のパレット色を Chromium で実際に描画し、sRGB 値を
// client/src/lib/tailwind-palette.ts に書き出す。
//
// なぜ実測か: theme.css の値は oklch で、jsdom は oklch を解決できない。
// 変換式を単体テスト側に実装すると、実際にブラウザが描く色とずれても気づけない。
// ブラウザに描かせて読み取った値だけを ground truth にする。
//
// いつ回すか: tailwindcss を更新して theme.css のパレットが変わったとき。
// 生成物は commit する（テストがネットワークにもブラウザにも依存しないように）。
//
//   node scripts/measure-palette.mjs

import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const THEME_CSS = resolve(HERE, "../node_modules/tailwindcss/theme.css");
const OUT = resolve(HERE, "../client/src/lib/tailwind-palette.ts");

const css = readFileSync(THEME_CSS, "utf8");
const colors = [
  ...css.matchAll(/--color-([a-z]+-\d+):\s*(oklch\([^)]*\))/g),
].map((m) => ({ name: m[1], oklch: m[2] }));

if (colors.length === 0) {
  throw new Error(
    "theme.css から oklch のパレットを 1 件も読めなかった。書式が変わった可能性がある",
  );
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.setContent('<canvas id="c" width="1" height="1"></canvas>');
  const rgbs = await page.evaluate((list) => {
    const ctx = document
      .getElementById("c")
      .getContext("2d", { willReadFrequently: true });
    const out = {};
    for (const { name, oklch } of list) {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = oklch;
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      out[name] = [d[0], d[1], d[2]];
    }
    return out;
  }, colors);

  const lines = Object.entries(rgbs).map(
    ([k, v]) => `  "${k}": [${v[0]}, ${v[1]}, ${v[2]}],`,
  );
  writeFileSync(
    OUT,
    `// Tailwind のパレット色（theme.css の oklch）を Chromium で実際に描画して読み取った sRGB 値。
// jsdom の単体テストは oklch を解決できないため、実測値をここに固定して使う。
// 再生成は scripts/measure-palette.mjs（要 chromium）。値は theme.css の変更時のみ更新する。
export const TAILWIND_PALETTE_RGB: Record<string, [number, number, number]> = {
${lines.join("\n")}
};
`,
  );
  console.log(`${colors.length} 色を実測して ${OUT} に書き出した`);
} finally {
  await browser.close();
}
