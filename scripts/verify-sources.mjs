#!/usr/bin/env node
// 出典レジストリの逐語引用を、実際に URL を取得して照合する。
//
// これがこの仕組みの核心。プロンプトで「正確に引用して」と頼むだけでは
// 捏造・言い換え・原文にない語の混入を検出できない。文字列一致なら決定的に取れる。
//
//   pnpm check:sources            全件を照合
//   pnpm check:sources <id>...    指定した出典だけ照合
//
// ネットワークに出るため vitest には入れない（外部の障害で CI を落とさない）。

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { fetchText, normalize, sleep, toPlainText } from "./lib/source-fetch.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCES_TS = resolve(HERE, "../client/src/data/sources.ts");

/**
 * sources.ts をトランスパイルせずに読むため、Node の実行時に解釈できる形へ削る。
 * 型注釈と import/export を落として関数として評価する。
 */
function loadArray(src, exportName) {
  const start = src.indexOf(`export const ${exportName}`);
  if (start === -1) return [];
  // 型注釈の `Source[]` にも `[` が含まれるので、代入の `=` より後ろから探す
  const assign = src.indexOf("=", start);
  if (assign === -1) throw new Error(`${exportName} の代入が見つからない`);
  const arrayStart = src.indexOf("[", assign);
  // 対応する閉じ括弧を数える（文字列リテラル内の括弧は無視する）
  let depth = 0;
  let end = -1;
  let quote = null;
  for (let i = arrayStart; i < src.length; i++) {
    const c = src[i];
    const prev = src[i - 1];
    if (quote) {
      if (c === quote && prev !== "\\") quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      quote = c;
      continue;
    }
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) throw new Error(`${exportName} の配列を閉じられない`);

  // usedBy が参照している定数（AGENT_DOCS 等）も一緒に渡す
  const constBlock = src
    .split("\n")
    .filter((l) => /^const [A-Z_]+ = ".*";$/.test(l))
    .join("\n");

  const literal = src.slice(arrayStart, end + 1);
  // eslint-disable-next-line no-new-func
  return new Function(`${constBlock}\nreturn ${literal};`)();
}

function loadSources() {
  const curatedSrc = readFileSync(SOURCES_TS, "utf8");
  const generatedPath = resolve(HERE, "../client/src/data/sources.generated.ts");
  let generatedSrc = "";
  try {
    generatedSrc = readFileSync(generatedPath, "utf8");
  } catch {
    // 生成ファイルが無い構成もありうる
  }

  const parsed = [
    ...loadArray(curatedSrc, "CURATED_SOURCES"),
    ...loadArray(generatedSrc, "GENERATED_SOURCES"),
  ];

  // 解析に失敗して空配列を返すと「何も照合していないのに成功」になる。
  // 0 件は成果ではなく事故として扱う。
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error(
      "出典を解析できたが 0 件だった。sources.ts の書式が変わった可能性がある",
    );
  }
  return parsed;
}

async function main() {
  const only = process.argv.slice(2);
  const all = loadSources();
  const targets = only.length ? all.filter((s) => only.includes(s.id)) : all;

  if (only.length) {
    const unknown = only.filter((id) => !all.some((s) => s.id === id));
    if (unknown.length) {
      console.error(`不明な出典 id: ${unknown.join(", ")}`);
      process.exitCode = 2;
      return;
    }
  }

  let failures = 0;
  let checkedQuotes = 0;
  const measured = [];

  for (const s of targets) {
    if (s.kind === "measured") {
      measured.push(s);
      continue;
    }
    process.stdout.write(`\n[${s.id}] ${s.url}\n`);

    let fetched;
    try {
      await sleep(250);
      fetched = await fetchText(s.url);
    } catch (err) {
      console.log(`  ✗ 取得できない: ${err.message}`);
      failures++;
      continue;
    }

    if (fetched.status !== 200) {
      console.log(`  ✗ HTTP ${fetched.status}`);
      failures++;
      continue;
    }
    console.log(`  ✓ HTTP 200${fetched.usedMarkdown ? " (markdown)" : ""}`);
    if (fetched.finalUrl && fetched.finalUrl !== s.url) {
      console.log(`  ! リダイレクト先: ${fetched.finalUrl}`);
    }

    const haystack = normalize(toPlainText(fetched.body, fetched.contentType));
    for (const quote of s.quotes ?? []) {
      checkedQuotes++;
      if (haystack.includes(normalize(quote))) {
        console.log(`  ✓ 引用一致: ${truncate(quote)}`);
      } else {
        console.log(`  ✗ 引用が本文に見つからない: ${truncate(quote)}`);
        failures++;
      }
    }
  }

  if (measured.length) {
    console.log(`\n実測の出典（自動照合の対象外・再現コマンドを手で回す）`);
    for (const s of measured) {
      console.log(`\n[${s.id}] ${s.title}`);
      console.log(`  $ ${s.reproduce}`);
    }
  }

  console.log(
    `\n照合した引用 ${checkedQuotes} 件 / 失敗 ${failures} 件 / 実測 ${measured.length} 件`,
  );
  if (failures > 0) {
    console.log(
      `\n引用が見つからない場合、原文が変わったか、引用が正確でないかのどちらか。` +
        `\n本文を読み直して、逐語に直すか記述そのものを改めること。`,
    );
    process.exitCode = 1;
  }
}

function truncate(s, n = 72) {
  const one = s.replace(/\s+/g, " ").trim();
  return one.length > n ? `${one.slice(0, n)}…` : one;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
