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
  closeBrowser,
  fetchText,
  isPdf,
  needsBrowser,
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

/**
 * 検査を赤にするかを決める。
 *
 * 不一致（原文が変わった）は 1 件でも赤にする。検査が捉えたい変化そのもの。
 * 取得できなかったものは割合で分ける。相手側の都合で数件取れないことは毎回起きるので
 * （GitHub Actions のランナー IP は 403 で弾く出典があり、web.archive.org は時々応答しない）、
 * それで毎週赤くすると通知が読まれなくなって本当の変化を運べなくなる。
 * 逆に大半が取れていないなら、個別の出典ではなく検査そのものが動いていない。
 */
export const UNREACHABLE_LIMIT = 0.05;

export function decideOutcome({ mismatched, problems, unreachable, attempted }) {
  const ratio = attempted === 0 ? 1 : unreachable / attempted;
  const tooManyUnreachable = ratio > UNREACHABLE_LIMIT;
  return {
    ratio,
    tooManyUnreachable,
    failed: mismatched > 0 || problems > 0 || tooManyUnreachable,
  };
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

  const browserUrls = [...byUrl.keys()].filter(needsBrowser);
  if (browserUrls.length) {
    console.log(
      `うち ${browserUrls.length} URL はクライアント描画のため実ブラウザ（chromium）で描画して取る\n`,
    );
  }

  let i = 0;
  let browserUsed = 0;
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
    if (fetched.browserUnavailable) {
      // 「本文が JS でしか出ないホストを、素の fetch で引いた」だけ。
      // 引用の誤りではないので不一致に混ぜず、未照合として別に数える
      notExtracted.push({
        url,
        reason: `chromium を開けない（${fetched.browserUnavailable}）。pnpm exec playwright install chromium`,
        count: entries.length,
      });
      console.log(`[${i}/${byUrl.size}] - 未照合 (${entries.length}件) ${url}`);
      continue;
    }
    if (fetched.status !== 200) {
      fetchFailed.push({ url, reason: `HTTP ${fetched.status}`, count: entries.length });
      console.log(`[${i}/${byUrl.size}] ✗ HTTP ${fetched.status} (${entries.length}件) ${url}`);
      continue;
    }
    if (fetched.usedBrowser) browserUsed++;

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
    const via = fetched.usedBrowser ? " [browser]" : "";
    console.log(`[${i}/${byUrl.size}] ${mark} ${ok}/${entries.length}${via} ${url}`);
    for (const v of bad) {
      console.log(`      引用が本文にない: ${truncate(v.quote)}`);
      console.log(`      └ ${v.file} (${v.verdict})`);
    }
  }

  await closeBrowser();

  console.log(
    `\n照合 ${checked} 件 / 一致 ${matched} 件 / 不一致 ${mismatched.length} 件` +
      ` / 取得失敗 ${fetchFailed.length} URL / 未照合 ${notExtracted.length} URL` +
      (browserUsed ? ` / 実ブラウザ経由 ${browserUsed} URL` : ""),
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
  // 取得できなかったものの扱い。
  //
  // 「1 件も照合していないのに成功」が一番まずいので、取れないものを黙って緑にはしない。
  // ただし全部を等しく赤にすると、別の失敗の仕方をする。703 URL のうち 2〜3 件が
  // 相手側の都合で取れないことは毎回起こり（GitHub Actions のランナー IP は
  // orval.dev に 403 で弾かれ、web.archive.org は時々応答しない）、
  // 毎週その 3 件で赤くなる通知は読まれなくなって、本当の変化を運ぶ力を失う。
  //
  // なので「照合できなかった割合」で分ける。取れた分がごく僅かなら検査そのものが
  // 壊れているので赤にする。ほとんど取れていて数件だけ落ちたなら、報告はするが赤にしない。
  // 不一致（原文が変わった）は 1 件でも赤にする。これは検査が捉えたい変化そのもの。
  const unreachable = fetchFailed.length + notExtracted.length;
  const outcome = decideOutcome({
    mismatched: mismatched.length,
    problems: problems.length,
    unreachable,
    attempted: byUrl.size,
  });
  const { ratio: unreachableRatio, tooManyUnreachable } = outcome;

  if (unreachable) {
    const pct = (unreachableRatio * 100).toFixed(1);
    console.log(
      `\n照合できなかった出典が ${unreachable} URL（全体の ${pct}%）ある。` +
        `\n一時的な障害なら再実行で通る。通らないなら出典が動いたということなので、` +
        `取得できる一次情報へ差し替える。`,
    );
    if (tooManyUnreachable) {
      console.log(
        `取れない割合が ${(UNREACHABLE_LIMIT * 100).toFixed(0)}% を超えている。` +
          `個別の出典の問題ではなく、検査そのものが機能していない可能性が高い。`,
      );
    } else {
      console.log(
        `${(UNREACHABLE_LIMIT * 100).toFixed(0)}% 以内なので、これだけでは落とさない。` +
          `同じ URL が続けて落ちるなら出典を差し替える。`,
      );
    }
  }
  if (outcome.failed) {
    process.exitCode = 1;
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  // 途中で落ちても chromium を残さない
  .finally(() => closeBrowser());
