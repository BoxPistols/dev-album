// リダイレクトされる URL を、リダイレクト先の恒久 URL に書き換える。
//
// なぜ要るか: リダイレクトは「今は届く」だけで、出典側が次に整理したときに切れる。
// 実際 2026-08-16 の照合では 20 件のリンク切れが見つかっていて、その多くは
// 旧アドレスを放置した結果だった。届くうちに恒久 URL へ寄せておく。
//
// 使い方:
//   pnpm check:links --json > /tmp/links.json
//   node scripts/fix-redirected-links.mjs /tmp/links.json          # 変更内容を出すだけ
//   node scripts/fix-redirected-links.mjs /tmp/links.json --write  # 実際に書き換える
//
// 書き換えないもの:
//   - 末尾スラッシュの有無だけの違い（意味が同じで、書き換えても次の移設に強くならない）
//   - http から https への昇格だけの違い（同上）
//   - クエリが付いただけのもの（?hl=en 等。取得側の都合で付くものを本文に焼き付けない）
//   - リダイレクト先が別ホストのログイン画面や検索結果に見えるもの（内容が変わっている）

import { readFileSync, writeFileSync } from "node:fs";

const [, , jsonPath, ...flags] = process.argv;
const write = flags.includes("--write");

if (!jsonPath) {
  console.error(
    "使い方: node scripts/fix-redirected-links.mjs <check:links --json の出力> [--write]",
  );
  process.exit(2);
}

const { redirected } = JSON.parse(readFileSync(jsonPath, "utf8"));

/** 末尾スラッシュ・スキーム・クエリだけの差か */
function isCosmetic(from, to) {
  const norm = (u) =>
    u
      .replace(/^http:\/\//, "https://")
      .replace(/\?.*$/, "")
      .replace(/\/+$/, "");
  return norm(from) === norm(to);
}

/** リダイレクト先が内容の違うページに見えるか（ログイン・検索・トップへの丸投げ） */
function looksUnrelated(from, to) {
  if (/\/(login|signin|sign_in|auth)\b/i.test(to)) return true;
  if (/[?&](q|query|search)=/i.test(to)) return true;
  // 深いパスからホストのトップへ飛ばされたものは、同じ内容が残っていない
  const depth = (u) => new URL(u).pathname.split("/").filter(Boolean).length;
  try {
    if (depth(from) >= 2 && depth(to) === 0) return true;
  } catch {
    return true;
  }
  return false;
}

const targets = [];
const skipped = [];
for (const r of redirected) {
  const { url, finalUrl, files } = r;
  if (!finalUrl || finalUrl === url) continue;
  if (isCosmetic(url, finalUrl)) {
    skipped.push([url, finalUrl, "末尾/スキーム/クエリのみの差"]);
    continue;
  }
  if (looksUnrelated(url, finalUrl)) {
    skipped.push([url, finalUrl, "内容が違うページに見える"]);
    continue;
  }
  targets.push({ url, finalUrl, files });
}

let changedFiles = 0;
let changedOccurrences = 0;
const cache = new Map();

for (const { url, finalUrl, files } of targets) {
  for (const file of files) {
    if (!cache.has(file)) cache.set(file, readFileSync(file, "utf8"));
    const before = cache.get(file);
    // URL がそのまま書かれている箇所だけを置き換える。前後の文字は触らない
    const after = before.split(url).join(finalUrl);
    if (after !== before) {
      cache.set(file, after);
      changedOccurrences += before.split(url).length - 1;
    }
  }
}

for (const [file, content] of cache) {
  const original = readFileSync(file, "utf8");
  if (content === original) continue;
  changedFiles++;
  if (write) writeFileSync(file, content);
}

console.log(`リダイレクト ${redirected.length} 件のうち`);
console.log(`  書き換え対象 ${targets.length} 件`);
console.log(`  対象外 ${skipped.length} 件`);
console.log(
  `${write ? "書き換えた" : "書き換えると"} ${changedFiles} ファイル / ${changedOccurrences} 箇所`,
);

if (!write) {
  console.log("\n## 書き換える URL\n");
  for (const t of targets) {
    console.log(`  ${t.url}\n  → ${t.finalUrl}`);
  }
  console.log("\n## 対象外にした URL\n");
  for (const [from, to, why] of skipped) {
    console.log(`  [${why}] ${from}\n  → ${to}`);
  }
  console.log("\n--write を付けると実際に書き換える。");
}
