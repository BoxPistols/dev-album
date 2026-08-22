#!/usr/bin/env node
// 出典レジストリの逐語引用を、実際に URL を取得して照合する。
//
// これがこの仕組みの核心。プロンプトで「正確に引用して」と頼むだけでは
// 捏造・言い換え・原文にない語の混入を検出できない。文字列一致なら決定的に取れる。
//
//   pnpm check:sources            全件を照合
//   pnpm check:sources <id>...    指定した出典だけ照合
//   pnpm check:sources --dry-run  読み込めた件数だけ出して終わる（ネットワークに出ない）
//
// sources.ts は TypeScript なので tsx で起動する（package.json の check:sources を参照）。
// ネットワークに出るため vitest には入れない（外部の障害で CI を落とさない）。

import { loadSources } from "./lib/load-sources.mjs";
import { fetchText, normalize, sleep, toPlainText } from "./lib/source-fetch.mjs";


async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const only = args.filter((a) => !a.startsWith("--"));
  const all = await loadSources();
  if (dryRun) {
    const measuredCount = all.filter((s) => s.kind === "measured").length;
    const quoteCount = all.reduce((n, s) => n + (s.quotes?.length ?? 0), 0);
    console.log(
      `出典 ${all.length} 件（うち実測 ${measuredCount} 件）/ 引用 ${quoteCount} 件を読み込んだ`,
    );
    return;
  }
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
