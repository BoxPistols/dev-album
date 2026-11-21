/**
 * p5.jsマニュアルのスケッチの静的検査。
 *
 * 実ブラウザでの実行はpnpm check:p5が見る（描画時のエラーはそちらでしか分からない）。
 * ここではブラウザを使わずに済むものだけを見る。構文エラーと、プレビューの前提を崩す書き方。
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { isP5Sketch } from "./preview";

const PAGES_DIR = path.resolve(__dirname, "..", "pages", "p5js");

function listFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full));
    else if (entry.name.endsWith(".tsx")) out.push(full);
  }
  return out.sort();
}

/** scripts/check-p5-sketches.mjsのextractSketchesと同じ取り出し方 */
function extractSketches(src: string): { code: string; line: number }[] {
  const sketches: { code: string; line: number }[] = [];
  const pattern = /`((?:[^`\\]|\\[\s\S])*)`/g;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(src)) !== null) {
    const code = m[1]
      .replace(/\\`/g, "`")
      .replace(/\\\$/g, "$")
      .replace(/\\\\/g, "\\");
    if (isP5Sketch(code)) {
      sketches.push({ code, line: src.slice(0, m.index).split("\n").length });
    }
  }
  return sketches;
}

const files = listFiles(PAGES_DIR).map((file) => ({
  name: path.relative(PAGES_DIR, file),
  sketches: extractSketches(fs.readFileSync(file, "utf8")),
}));

describe("p5.jsマニュアルのスケッチ", () => {
  it("検査対象のスケッチを拾えている（0件は走査の事故）", () => {
    const total = files.reduce((n, f) => n + f.sketches.length, 0);
    expect(total).toBeGreaterThan(0);
  });

  it("全ページがスケッチを1つ以上持つ", () => {
    // このマニュアルは動くスケッチを中心に組み立てる（specs/p5js-manual.md）
    const empty = files.filter((f) => f.sketches.length === 0).map((f) => f.name);
    expect(empty).toEqual([]);
  });

  for (const file of files) {
    if (file.sketches.length === 0) continue;

    it(`[${file.name}] のスケッチ（${file.sketches.length}個）が構文として正しい`, () => {
      for (const { code, line } of file.sketches) {
        // 空欄（___）は識別子として読めるので、埋める前のチャレンジもそのまま検査できる
        expect(
          () => new vm.Script(code),
          `${file.name}:${line}`,
        ).not.toThrow();
      }
    });

    it(`[${file.name}] のスケッチがプレビューで使えない書き方をしていない`, () => {
      for (const { code, line } of file.sketches) {
        const where = `${file.name}:${line}`;
        // p5.js 2.x系にpreload()は無い。async setup()とawaitで読み込む
        expect(/\bfunction\s+preload\s*\(/.test(code), `${where}: preload()`).toBe(false);
        // プレビューのCSPは外部ホストへの通信を遮断する
        expect(
          /\bload(Image|Font|JSON|Strings|Table|Sound|Model)\s*\(\s*['"]https?:/.test(code),
          `${where}: 外部URLの読み込み`,
        ).toBe(false);
        // ブロックコメントは編集欄のハイライトと相性が悪いので、行コメントに統一する
        expect(code.includes("/*"), `${where}: ブロックコメント`).toBe(false);
      }
    });
  }
});
