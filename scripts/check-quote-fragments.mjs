#!/usr/bin/env node
// 監査の判定 JSON に書かれた引用のうち、「文の途中で切れているもの」を洗い出す。
//
//   node scripts/check-quote-fragments.mjs                       既定の判定 JSON を全部見る
//   node scripts/check-quote-fragments.mjs docs/audits/x.json    ファイルを指定する
//   node scripts/check-quote-fragments.mjs --json                機械可読で出す
//
// なぜ要るか: verify-verdicts.mjs は「引用が原文に在るか」しか見ない。逐語照合を
// 通すために引用を切り詰めると、原文には在るのに主語や目的語が落ちて、何の話か
// 引用の中で閉じない断片が残る。実測（docs/audits/2026-08-23-confirmed-sampling.md）
// では、主張を支え切れていない引用 15 件のうち 2 件がこの型だった。切り詰めそのものは
// 逐語照合を通すための正しい処理なので、切り詰めすぎたものだけを別に拾う必要がある。
//
// 拾うのは 2 つの合図に絞る。どちらも「前後の語が無いと文にならない語」で始まる／
// 終わることを見る。終止記号が無いだけの引用（表のセル・コード・箇条書き）は
// 正しい引用でも大量にあるので対象にしない。
//
//   末尾が機能語   … "The default storage class. If you" / "For advanced control, create an"
//   先頭が継続語   … "are not impacted by this sunset" / "if you neglect the six pillars of"
//
// 断片であること自体が誤りとは限らないので、これは判定ではなく「読んで直す候補」を
// 出す道具。出力を 1 件ずつ原文と突き合わせて、取り直すか残すかを決める。

import { readFileSync } from "node:fs";
import { argv } from "node:process";
import { pathToFileURL } from "node:url";

const DEFAULT_FILES = [
  "docs/audits/2026-08-16-medium-verdicts.json",
  "docs/audits/2026-08-16-low-verdicts.json",
];

/** これで終わる文は、まず続きがある。冠詞・前置詞・接続詞・助動詞・関係詞 */
const DANGLING_TAIL = new Set(
  `a an the of to in on at by for with from into onto over under about across against among between
   and or but so because since although though while whereas if when unless until after before than then
   that which who whom whose where what how why
   is are was were be been being am
   can could will would shall should may might must has have had do does did
   you it we they this these those such as not any all each every
   your our their its his her my via per`
    .split(/\s+/)
    .filter(Boolean),
);

/**
 * これで始まる文は、まず前に語がある。
 *
 * 「小文字で始まる」だけを合図にすると、用語から始まる定義文（`server.port Type: number …`、
 * `prisma generate creates Prisma Client …`）を大量に拾う。前の語が要る語に絞る。
 * 代わりに `schemas to TypeScript types …` のような名詞始まりの断片は取り逃すが、
 * そちらは末尾の合図と `check:verdicts` の照合で拾える。
 */
const CONTINUATION_HEAD = new Set(
  `and or but so because since although though however therefore thus whereas while
   which that who whom whose than then
   is are was were be been being am
   can cannot could will would shall should may might must
   has have had do does did
   it its they them their he she we us our you your this these those such
   including includes included via per
   also only all both either neither not no any
   of to into onto over under about across against among between with without within
   before after until unless when where if for from at by on in`
    .split(/\s+/)
    .filter(Boolean),
);

/** コード・設定・表の行は散文ではない。ここに当たるものは見ない */
function looksLikeCode(quote) {
  const s = quote.trim();
  if (/^\s*[{["']/.test(s)) return true; // JSON・配列・文字列リテラル
  if (/^<[a-zA-Z/!]/.test(s)) return true; // HTML / XML
  if (/^[|]/.test(s)) return true; // 表の行
  if (/^(https?:\/\/|\$ |\/\/|\/\*)/.test(s)) return true; // URL・シェル・コメント
  if (/```|~~~/.test(s)) return true; // コードブロック
  // key: value / key = value の 1 行（散文の途中にコロンがある文は除く）
  if (/^[\w@./-]+\s*[:=]\s*\S/.test(s) && !/\s\w+\s\w+\s\w+\s\w+\s/.test(s)) return true;
  const tokens = s.split(/\s+/);
  const codey = tokens.filter((w) =>
    /[{}();=<>|\\$]|^--?[a-z]|[a-z]+[A-Z]|^@|\/\w/.test(w),
  ).length;
  return tokens.length > 0 && codey / tokens.length >= 0.3;
}

/** 散文とみなせるか。短いもの・語数が足りないものは判定しない */
function looksLikeProse(quote) {
  const s = quote.trim();
  if (looksLikeCode(s)) return false;
  if (/[぀-ヿ一-鿿]/.test(s)) return s.length >= 12;
  return s.split(/\s+/).length >= 5;
}

function tailWord(quote) {
  const tail = quote
    .replace(/\s*(\[…\]|\[\.\.\.\])\s*$/, "") // 中略で終わるものは意図した連結
    .replace(/[)\]}"'”’」』）】>*_`\s]+$/, "");
  const m = tail.match(/([A-Za-z]+)$/);
  return m ? m[1].toLowerCase() : "";
}

function headWord(quote) {
  const m = quote.trim().match(/^[*_`>\s"'“「『]*([A-Za-z]+)/);
  return m ? m[1] : "";
}

/** 引用 1 本の問題。空配列なら疑いなし */
export function fragmentProblems(quote, claim = "") {
  const q = (quote ?? "").trim();
  if (!q || !looksLikeProse(q)) return [];

  const problems = [];
  if (DANGLING_TAIL.has(tailWord(q))) {
    problems.push("末尾が機能語で終わる");
  }

  // 先頭の合図は英語の正書法（文頭が大文字）に依っている。日本語の引用には効かないので見ない。
  // 小文字始まりであることと、前の語が要る語であることの両方を求める。
  // 片方だけだと、識別子から始まる引用（`server.port Type: number …`）か、
  // 文頭に立てる語（`This projection mode …`）のどちらかを大量に拾ってしまう。
  const raw = /[぀-ヿ一-鿿]/.test(q) ? "" : headWord(q);
  const head = /^[a-z]/.test(raw) ? raw.toLowerCase() : "";
  if (head && CONTINUATION_HEAD.has(head)) {
    // 主張の側がその語を指していれば、引用の主語はそこで閉じているとみなす
    // （`In SSR, you should set it to false` のように主張が語ごと写している場合）
    if (!claim.toLowerCase().includes(head)) {
      problems.push("先頭が語の途中から始まる");
    }
  }
  return problems;
}

function truncate(s, n = 100) {
  const one = s.replace(/\s+/g, " ").trim();
  return one.length > n ? `${one.slice(0, n)}…` : one;
}

function main() {
  const args = process.argv.slice(2);
  const asJson = args.includes("--json");
  const files = args.filter((a) => !a.startsWith("--"));
  const targets = files.length ? files : DEFAULT_FILES;

  const findings = [];
  let scanned = 0;
  for (const path of targets) {
    const verdicts = JSON.parse(readFileSync(path, "utf8"));
    if (!Array.isArray(verdicts) || verdicts.length === 0) {
      throw new Error(`判定を読めたが 0 件だった: ${path}`);
    }
    for (const v of verdicts) {
      if (!v.quote?.trim()) continue;
      scanned++;
      const problems = fragmentProblems(v.quote, v.claim ?? "");
      if (problems.length) {
        findings.push({
          file: path,
          page: v.file,
          verdict: v.verdict,
          sourceUrl: v.sourceUrl,
          problems,
          claim: v.claim,
          quote: v.quote,
        });
      }
    }
  }

  // 0 件で成功しない。書式が変わって全件素通りしたのを緑にしない
  if (scanned === 0) {
    throw new Error("引用を 1 件も見ていない（0 件成功は事故として扱う）");
  }

  if (asJson) {
    console.log(JSON.stringify(findings, null, 1));
  } else {
    console.log(`引用 ${scanned} 件を見た（${targets.join(", ")}）`);
    console.log(`文の途中で切れている疑い ${findings.length} 件\n`);
    for (const f of findings) {
      console.log(`  ✗ [${f.problems.join(" / ")}] ${f.page} (${f.verdict})`);
      console.log(`      主張: ${truncate(f.claim)}`);
      console.log(`      引用: ${truncate(f.quote)}`);
      console.log(`      出典: ${f.sourceUrl}`);
    }
    if (findings.length) {
      console.log(
        `\n出典を取り直し、主語まで含む範囲へ引用を取り直すこと。` +
          `\n原文に該当が無いなら判定を UNDETERMINED に落とし、教材側の記述を削る。`,
      );
    }
  }
  process.exitCode = findings.length ? 1 : 0;
}

// 単体テストから fragmentProblems だけを読めるように、直接実行のときだけ走らせる
if (argv[1] && import.meta.url === pathToFileURL(argv[1]).href) {
  main();
}
