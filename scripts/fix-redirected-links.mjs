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

/**
 * リダイレクト先に付いたロケール接頭辞を、元に無ければ落とす。
 *
 * この検査は accept-language: en を送るので、docs.github.com は /actions を
 * /en/actions へ飛ばす。その結果をそのまま本文に焼き付けると、日本語で読む人にも
 * 英語版を強制することになる。ロケールを持たない URL は読者の言語で出るので、
 * 経路が変わった分だけ直してロケールは付けない。
 * 元から /ja/ や /en-US/ を書いている URL（MDN 等）はその言語を選んでいるので触らない。
 *
 * ただし「ロケールに見える先頭の 2 文字」が省略できるとは限らない。
 * readthedocs は /en/stable/ が実際のパスで、/en を落とすと 404 になる（実際に踏んだ）。
 * 静的には見分けが付かないので、落とした URL が本当に届くかを取得して確かめ、
 * 届かなければロケール付きのまま使う。
 */
const LOCALE_SEGMENT = /^\/(?:[a-z]{2})(?:-[A-Za-z]{2})?(?=\/|$)/;

async function reachable(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "user-agent": "dev-album-link-fixer" },
      signal: AbortSignal.timeout(20000),
    });
    return res.status === 200;
  } catch {
    return false;
  }
}

async function stripAddedLocale(from, to) {
  let stripped;
  try {
    const a = new URL(from);
    const b = new URL(to);
    if (a.host !== b.host) return to;
    if (LOCALE_SEGMENT.test(a.pathname)) return to;
    const m = b.pathname.match(LOCALE_SEGMENT);
    if (!m) return to;
    stripped = new URL(b);
    stripped.pathname = b.pathname.slice(m[0].length) || "/";
  } catch {
    return to;
  }
  const candidate = stripped.toString();
  if (await reachable(candidate)) return candidate;
  console.error(`  ロケールを落とすと届かないので付けたまま使う: ${candidate}`);
  return to;
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
  const { url, files } = r;
  const finalUrl = r.finalUrl ? await stripAddedLocale(url, r.finalUrl) : r.finalUrl;
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

/**
 * URL の直後に続いてよい文字。ここに当たらない位置で終わっていれば、
 * その出現は URL 全体であって、より長い URL の一部ではない。
 *
 * 単純な文字列置換だと、短い URL が長い URL の内側に入っているときに壊れる。
 * 実際に踏んだ: /docs/installation が /docs/installation/using-vite へ飛ぶので、
 * 同じファイルにある /docs/installation/using-vite の中の前半が置き換わり、
 * /docs/installation/using-vite/installation/using-vite という 404 ができた。
 */
const URL_CONTINUES = /[A-Za-z0-9/_\-.~%?#&=+:@]/;

function replaceWholeUrl(text, url, finalUrl) {
  let out = "";
  let from = 0;
  let count = 0;
  for (;;) {
    const at = text.indexOf(url, from);
    if (at === -1) break;
    const next = text[at + url.length];
    if (next !== undefined && URL_CONTINUES.test(next)) {
      // より長い URL の一部なので触らない
      out += text.slice(from, at + url.length);
      from = at + url.length;
      continue;
    }
    out += text.slice(from, at) + finalUrl;
    from = at + url.length;
    count++;
  }
  out += text.slice(from);
  return { text: out, count };
}

// 長い URL から先に処理する。短いほうを先に当てると、長い URL の前半を
// 書き換えてしまってから境界判定をすり抜ける組み合わせが残る
targets.sort((a, b) => b.url.length - a.url.length);

for (const { url, finalUrl, files } of targets) {
  for (const file of files) {
    if (!cache.has(file)) cache.set(file, readFileSync(file, "utf8"));
    const before = cache.get(file);
    const { text: after, count } = replaceWholeUrl(before, url, finalUrl);
    if (count > 0) {
      cache.set(file, after);
      changedOccurrences += count;
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
