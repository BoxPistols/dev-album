import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

// ============================================================
// 文字サイズの下限検査
//
// 12px 未満は使わない（例外なし）。Tailwind の名前付きサイズは text-xs が
// 12px = 0.75rem で下限なので、それより小さい指定は必ず任意値
// （text-[11px] / text-[0.6rem]）かインラインの fontSize か CSS の宣言になる。
// その 3 経路だけを見れば漏れなく拾える。
//
// 教材のコード例（プレビュー iframe で描画される文字列）も対象にする。
// 学習者が実際に読む文字であることに変わりはない。
// ============================================================

const MIN_PX = 12;
const SRC_DIR = join(import.meta.dirname, "..");
const ROOT = join(SRC_DIR, "..", "..");

function getSourceFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...getSourceFiles(full));
    else if (/\.(tsx?|css)$/.test(full) && !/\.test\.tsx?$/.test(full))
      files.push(full);
  }
  return files;
}

/** rem は 1rem = 16px として px に直す（root font-size は変えていない） */
function toPx(value: number, unit: string): number {
  return unit === "rem" ? value * 16 : value;
}

type Sighting = { file: string; line: number; text: string; px: number };

// text-[11px] / text-[0.6rem]（sm: 等の修飾子付きも拾う）
const ARBITRARY = /(?:^|[\s"'`{])(?:[\w-]+:)*text-\[(\d*\.?\d+)(px|rem)\]/g;
// style={{ fontSize: '11px' }} / fontSize: "0.6rem"
const INLINE = /fontSize:\s*["'](\d*\.?\d+)(px|rem)["']/g;
// CSS の font-size: 11px
const CSS_DECL = /font-size:\s*(\d*\.?\d+)(px|rem)/g;

/** ソース中の明示的な文字サイズ指定を px に正規化して集める */
function collectSizes(): Sighting[] {
  const found: Sighting[] = [];
  for (const file of getSourceFiles(SRC_DIR)) {
    const src = readFileSync(file, "utf8");
    const lines = src.split("\n");
    for (const re of [ARBITRARY, INLINE, CSS_DECL]) {
      for (const m of src.matchAll(re)) {
        const line = src.slice(0, m.index).split("\n").length;
        found.push({
          file: relative(ROOT, file),
          line,
          text: lines[line - 1]?.trim().slice(0, 100) ?? "",
          px: toPx(Number(m[1]), m[2]),
        });
      }
    }
  }
  return found;
}

const sizes = collectSizes();

describe("文字サイズの下限", () => {
  it("12px 未満の指定が無い", () => {
    const violations = sizes
      .filter((s) => s.px < MIN_PX)
      .map((s) => `${s.file}:${s.line}  ${s.px}px  ${s.text}`);
    expect(
      violations,
      `12px 未満は使わない（例外なし）。Tailwind の下限は text-xs = 12px:\n${violations.join("\n")}`,
    ).toEqual([]);
  });

  it("走査が指定を実際に拾えている（0 件は走査の事故）", () => {
    // 違反 0 件で緑になるのが「違反が無い」からなのか「走査が壊れている」からなのか、
    // このテストが無いと区別が付かない。実在する指定を数えて走査自体を検証する
    expect(sizes.length).toBeGreaterThan(0);
  });
});
