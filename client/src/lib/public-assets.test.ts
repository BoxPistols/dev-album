import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

// ============================================================
// public/ に置く静的アセットの検査
//
// SVG は XML なので、壊れていてもビルドは通り、配信も 200 で返り、
// content-type も image/svg+xml のままになる。気づけるのはブラウザが
// 描画しようとした瞬間だけ。実際に favicon.svg のコメントへ連続ハイフンを
// 書いてしまい、ビルド・デプロイ・配信内容の確認をすべて通り抜けた。
// ============================================================

const PUBLIC_DIR = join(import.meta.dirname, "..", "..", "public");

function svgFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    // vendor/ はセルフホストした外部ライブラリなので対象外
    if (entry === "vendor") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...svgFiles(full));
    else if (full.endsWith(".svg")) out.push(full);
  }
  return out;
}

describe("public/ の SVG", () => {
  const files = svgFiles(PUBLIC_DIR);

  it("検査対象の SVG が 1 つ以上ある", () => {
    // 0 件のまま緑になるのを防ぐ
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    const name = file.slice(PUBLIC_DIR.length + 1);

    it(`${name}: XML として解釈できる`, () => {
      const src = readFileSync(file, "utf8");
      const doc = new DOMParser().parseFromString(src, "image/svg+xml");
      const error = doc.querySelector("parsererror");
      expect(error?.textContent ?? null, `${name} が解釈できない`).toBeNull();
      expect(doc.documentElement.nodeName).toBe("svg");
    });

    it(`${name}: コメントに連続ハイフンを含まない`, () => {
      // XML のコメント内では -- を書けない。CSS 変数名（--primary 等）を
      // うっかり書くとファイル全体が読めなくなる
      const src = readFileSync(file, "utf8");
      const bad = [...src.matchAll(/<!--([\s\S]*?)-->/g)].filter((m) =>
        m[1].includes("--"),
      );
      expect(bad.map((m) => m[0].slice(0, 60)), `${name}`).toEqual([]);
    });
  }
});
