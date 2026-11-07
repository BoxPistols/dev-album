#!/usr/bin/env node
// sources.generated.ts の引用を「原文に連続して現れる部分」だけに切り詰める。
//
// 生成元のエージェントは、原文で離れた文をつないで 1 つの引用にしていることがある。
// それは逐語引用ではないので、照合は正しく落ちる。落ちたぶんを通すために正規化を
// 緩めるのではなく、確認できた範囲まで引用を短くする。確認できなければ捨てる。
//
//   pnpm check:quotes   結果を表示するだけ。変更が出るなら exit 1（CI・再監査の確認用）
//   pnpm fix:quotes     --write で sources.generated.ts を書き換える
//
// 再監査の流れでは、sources.generated.ts を生成したあと fix:quotes → check:sources の順で通す
// （.claude/skills/evidence-check/SKILL.md「再監査の手順」）。

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// 取得と正規化はcheck:sourcesと同じものを使う。独自の正規化を持っていた頃は
// **太字** や箇条書きの行頭記号を吸収できず、check:sourcesが通る引用まで
// 「破棄」と判定していた（版を固定した出典でも起きた）
import {
  closeBrowser,
  fetchText,
  isPdf,
  normalize,
  pdfToText,
  sleep,
  toPlainText,
} from "./lib/source-fetch.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const GEN = resolve(HERE, "../client/src/data/sources.generated.ts");

const MIN_LEN = 40;
const DELAY_MS = 400; // 連続アクセスで 429 を食うので間を空ける

/** 引用のうち、原文に連続して現れる最長の先頭部分を返す。無ければ空文字 */
function longestPrefix(quote, haystack) {
  const q = normalize(quote);
  if (haystack.includes(q)) return q;
  let lo = MIN_LEN;
  let hi = q.length;
  let best = "";
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (haystack.includes(q.slice(0, mid))) {
      best = q.slice(0, mid);
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  // 文の途中で切れると読みにくいので、最後の文末か語境界で丸める
  if (best.length >= MIN_LEN) {
    const dot = best.lastIndexOf(". ");
    if (dot >= MIN_LEN) return best.slice(0, dot + 1);
    const sp = best.lastIndexOf(" ");
    if (sp >= MIN_LEN) return best.slice(0, sp);
  }
  return best.length >= MIN_LEN ? best : "";
}

function parseEntries(src) {
  const out = [];
  const re = /\n  \{\n([\s\S]*?)\n  \},/g;
  let m;
  while ((m = re.exec(src))) {
    const body = m[1];
    const id = /id: "([^"]+)"/.exec(body)?.[1];
    const url = /url: "([^"]+)"/.exec(body)?.[1];
    const qBlock = /quotes: \[\n([\s\S]*?)\n    \],/.exec(body)?.[1] ?? "";
    // 改行を含む引用（\n）もあるので、エスケープはJSONとして解く
    const quotes = [...qBlock.matchAll(/^      "((?:[^"\\]|\\.)*)",$/gm)].map((x) =>
      JSON.parse(`"${x[1]}"`),
    );
    out.push({ id, url, quotes, raw: m[0], start: m.index });
  }
  return out;
}

async function main() {
  const write = process.argv.includes("--write");
  const src = readFileSync(GEN, "utf8");
  const entries = parseEntries(src);
  if (entries.length === 0) throw new Error("エントリを解析できなかった");
  console.log(`エントリ ${entries.length} 件を確認する\n`);

  let kept = 0;
  let trimmed = 0;
  let dropped = 0;
  let unreachable = 0;
  const result = new Map();

  for (const e of entries) {
    let doc;
    try {
      doc = await fetchText(e.url);
    } catch {
      doc = { status: 0, contentType: "", body: "" };
    }
    await sleep(DELAY_MS);

    if (doc.status !== 200) {
      unreachable++;
      console.log(`[${e.id}] HTTP ${doc.status} — 引用を全部落とす`);
      result.set(e.id, []);
      continue;
    }
    const plain = isPdf(doc.contentType, doc.body)
      ? pdfToText(doc.bytes)
      : toPlainText(doc.body, doc.contentType);
    if (plain === null) {
      // pdftotextが無いだけで引用が誤っているとは言えないので、落とさない
      unreachable++;
      console.log(`[${e.id}] PDF を平文化できない — 引用はそのまま残す`);
      result.set(e.id, e.quotes);
      continue;
    }
    const hay = normalize(plain);
    const good = [];
    for (const q of e.quotes) {
      const p = longestPrefix(q, hay);
      if (!p) {
        dropped++;
        continue;
      }
      if (p.length < normalize(q).length) trimmed++;
      else kept++;
      good.push(p);
    }
    result.set(e.id, good);
    if (good.length !== e.quotes.length) {
      console.log(`[${e.id}] 引用 ${e.quotes.length} → ${good.length}`);
    }
  }

  console.log(
    `\nそのまま ${kept} / 切り詰め ${trimmed} / 破棄 ${dropped} / 取得不可の出典 ${unreachable}`,
  );

  if (!write) {
    const changes = trimmed + dropped + unreachable;
    if (changes > 0) {
      console.log(
        `\n${changes} 件の変更がある。pnpm fix:quotes で sources.generated.ts に反映する` +
          `\n取得不可の出典は一時的な障害のこともあるので、反映前に個別に再実行して確かめる`,
      );
      process.exitCode = 1;
    } else {
      console.log("\n変更なし");
    }
    return;
  }

  // 引用が 1 つも残らなかったエントリは登録から外す
  let out = src;
  for (const e of [...entries].reverse()) {
    const good = result.get(e.id) ?? [];
    if (good.length === 0) {
      out = out.slice(0, e.start) + out.slice(e.start + e.raw.length);
      continue;
    }
    const esc = (x) => x.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    const block = good.map((q) => `      "${esc(q)}",`).join("\n");
    const replaced = e.raw.replace(
      /quotes: \[\n[\s\S]*?\n    \],/,
      `quotes: [\n${block}\n    ],`,
    );
    out = out.slice(0, e.start) + replaced + out.slice(e.start + e.raw.length);
  }
  writeFileSync(GEN, out);
  const remaining = parseEntries(readFileSync(GEN, "utf8")).length;
  console.log(`\nsources.generated.ts を更新: エントリ ${entries.length} → ${remaining}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  // 許可リストの出典で起動したchromiumを残さない
  .finally(() => closeBrowser());
