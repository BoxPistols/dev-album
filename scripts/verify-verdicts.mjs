#!/usr/bin/env node
// 監査の判定 JSON（docs/audits/*-verdicts.json）に書かれた逐語引用を、
// 実際に sourceUrl を取得して照合する。
//
//   node scripts/verify-verdicts.mjs docs/audits/2026-08-16-medium-verdicts.json
//   node scripts/verify-verdicts.mjs <file> --url https://example.com/...   一部だけ
//
// なぜ要るか: 判定を書いたのが人でも LLM でも、引用は言い換え・要約・捏造に
// 静かに化ける。原文に文字列として在るかは決定的に取れるので、判断に回さない。
// 出典レジストリ（sources.ts）は pnpm check:sources が同じことをしている。
// こちらは「レジストリに載る前の判定そのもの」を対象にする。
//
// ネットワークに出るため vitest には入れない。

import { readFileSync } from "node:fs";

import {
  fetchText,
  isPdf,
  normalize,
  pdfToText,
  quoteFragments,
  sleep,
  toPlainText,
} from "./lib/source-fetch.mjs";

function truncate(s, n = 72) {
  const one = s.replace(/\s+/g, " ").trim();
  return one.length > n ? `${one.slice(0, n)}…` : one;
}

/** 原文（正規化済み）に引用が在るか。中略で分かれた断片は全て在ることを求める */
function quoteFound(haystack, quote) {
  const parts = quoteFragments(quote);
  if (parts.length === 0) return false;
  return parts.every((p) => haystack.includes(p));
}

function loadVerdicts(path) {
  const parsed = JSON.parse(readFileSync(path, "utf8"));
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error(`判定を読めたが 0 件だった: ${path}`);
  }
  return parsed;
}

/** スキーマ上の欠落。取得しなくても分かるので先に潰す */
function schemaProblems(verdicts) {
  const problems = [];
  for (const v of verdicts) {
    const where = `${v.file} | ${truncate(v.claim, 40)}`;
    if (!["CONFIRMED", "REFUTED", "UNDETERMINED"].includes(v.verdict)) {
      problems.push(`不明な verdict "${v.verdict}": ${where}`);
    }
    if (v.verdict === "CONFIRMED" && !v.quote?.trim()) {
      problems.push(`CONFIRMED なのに引用が空: ${where}`);
    }
    if (v.verdict === "REFUTED" && !v.correction?.trim()) {
      problems.push(`REFUTED なのに correction が空: ${where}`);
    }
  }
  return problems;
}

async function main() {
  const args = process.argv.slice(2);
  const path = args.find((a) => !a.startsWith("--"));
  if (!path) {
    console.error("使い方: node scripts/verify-verdicts.mjs <verdicts.json>");
    process.exitCode = 2;
    return;
  }
  const onlyIdx = args.indexOf("--url");
  const onlyUrl = onlyIdx === -1 ? null : args[onlyIdx + 1];

  const verdicts = loadVerdicts(path);
  console.log(`判定 ${verdicts.length} 件を読んだ: ${path}`);

  const problems = schemaProblems(verdicts);
  if (problems.length) {
    console.log(`\nスキーマの欠落 ${problems.length} 件`);
    for (const p of problems) console.log(`  ✗ ${p}`);
  }

  // 引用を持ち、http(s) の出典を指しているものだけが文字列照合の対象。
  // local:（自リポジトリ・実機で確認したもの）は取得しようがないので対象外にする。
  const byUrl = new Map();
  let localCount = 0;
  let noQuote = 0;
  for (const v of verdicts) {
    if (!v.quote?.trim()) {
      noQuote++;
      continue;
    }
    const url = (v.sourceUrl ?? "").trim();
    if (!/^https?:\/\//.test(url)) {
      localCount++;
      continue;
    }
    if (onlyUrl && url !== onlyUrl) continue;
    if (!byUrl.has(url)) byUrl.set(url, []);
    byUrl.get(url).push(v);
  }

  const targetQuotes = [...byUrl.values()].reduce((n, a) => n + a.length, 0);
  if (targetQuotes === 0) {
    throw new Error(
      "照合対象の引用が 0 件だった。判定の書式が変わった可能性がある（0 件成功は事故として扱う）",
    );
  }
  console.log(
    `照合対象 ${targetQuotes} 件 / ${byUrl.size} URL` +
      `（引用なし ${noQuote} 件・実機や自リポジトリ由来 ${localCount} 件は対象外）\n`,
  );

  let checked = 0;
  let matched = 0;
  const fetchFailed = [];
  const notExtracted = [];
  const mismatched = [];

  let i = 0;
  for (const [url, entries] of byUrl) {
    i++;
    let fetched;
    try {
      await sleep(250);
      fetched = await fetchText(url);
    } catch (err) {
      fetchFailed.push({ url, reason: err.message, count: entries.length });
      console.log(`[${i}/${byUrl.size}] ✗ 取得できない (${entries.length}件) ${url}\n    ${err.message}`);
      continue;
    }
    if (fetched.status !== 200) {
      fetchFailed.push({ url, reason: `HTTP ${fetched.status}`, count: entries.length });
      console.log(`[${i}/${byUrl.size}] ✗ HTTP ${fetched.status} (${entries.length}件) ${url}`);
      continue;
    }

    let plain;
    if (isPdf(fetched.contentType, fetched.body)) {
      const text = pdfToText(fetched.bytes);
      if (text === null) {
        // 平文化できないものを「不一致」に混ぜない。道具の不在と引用の誤りは別の問題
        notExtracted.push({ url, reason: "PDF を平文化できない（pdftotext 不在）", count: entries.length });
        console.log(`[${i}/${byUrl.size}] - 未照合 (${entries.length}件) ${url}`);
        continue;
      }
      plain = text;
    } else {
      plain = toPlainText(fetched.body, fetched.contentType);
    }

    const haystack = normalize(plain);
    let ok = 0;
    const bad = [];
    for (const v of entries) {
      checked++;
      if (quoteFound(haystack, v.quote)) {
        ok++;
        matched++;
      } else {
        bad.push(v);
        mismatched.push({ url, ...v });
      }
    }
    const mark = bad.length === 0 ? "✓" : "✗";
    console.log(`[${i}/${byUrl.size}] ${mark} ${ok}/${entries.length} ${url}`);
    for (const v of bad) {
      console.log(`      引用が本文にない: ${truncate(v.quote)}`);
      console.log(`      └ ${v.file} (${v.verdict})`);
    }
  }

  console.log(
    `\n照合 ${checked} 件 / 一致 ${matched} 件 / 不一致 ${mismatched.length} 件` +
      ` / 取得失敗 ${fetchFailed.length} URL / 未照合 ${notExtracted.length} URL`,
  );
  if (notExtracted.length) {
    console.log(`未照合（平文化できず。一致とも不一致とも言えない）:`);
    for (const n of notExtracted) console.log(`  - ${n.url} — ${n.reason}`);
  }

  if (mismatched.length) {
    const byVerdict = mismatched.reduce((acc, m) => {
      acc[m.verdict] = (acc[m.verdict] ?? 0) + 1;
      return acc;
    }, {});
    console.log(`不一致の内訳: ${JSON.stringify(byVerdict)}`);
    console.log(
      `\n引用が見つからない場合、原文が変わったか、引用が正確でないかのどちらか。` +
        `\n判定そのものを読み直すこと。引用を通すために正規化を緩めない。`,
    );
  }
  // 取得できなかったものを緑にしない。ネットワーク断・サイト移転・レート制限の
  // いずれでも「1 件も照合していないのに成功」になるのが一番まずい。
  // 一時的な失敗と恒久的な失敗はここでは区別できないので、落として人に見せる。
  if (fetchFailed.length || notExtracted.length) {
    console.log(
      `\n照合できなかった出典がある。一時的な障害なら再実行で通る。` +
        `\n通らないなら出典が動いたということなので、取得できる一次情報へ差し替える。`,
    );
  }
  if (
    mismatched.length ||
    problems.length ||
    fetchFailed.length ||
    notExtracted.length
  ) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
