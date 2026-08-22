// sources.ts を Node から読むための共有部品。
//
// verify-sources.mjs（逐語照合）と check-source-freshness.mjs（verifiedAt の鮮度）が
// 同じ経路で読む。sources.ts は TypeScript なので tsx で起動する前提
// （package.json の check:sources / check:freshness を参照）。
// 以前は文字列操作で配列リテラルを切り出していたが、型注釈 `Source[]` の `[` を
// 配列の開始と誤認して 0 件を返す事故があった。TS として読めば書式に依存しない。

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
export const SOURCES_TS = resolve(HERE, "../../client/src/data/sources.ts");

/** curated + generated を結合済みの SOURCES を返す。0 件は事故として投げる */
export async function loadSources() {
  const mod = await import(SOURCES_TS);
  const parsed = mod.SOURCES;
  // 読み込みに失敗して空配列を返すと「何も照合していないのに成功」になる。
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error(
      "出典を読み込めたが 0 件だった。sources.ts の export が変わった可能性がある",
    );
  }
  return parsed;
}
