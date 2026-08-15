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

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCES_TS = resolve(HERE, "../client/src/data/sources.ts");

const TIMEOUT_MS = 20000;

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

/** HTML/Markdown をざっくり平文化する。引用の照合は正規化した空白の上で行う */
function toPlainText(body, contentType) {
  let text = body;
  if (contentType.includes("html")) {
    text = text
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ");
  }
  return decodeEntities(text);
}

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&rsquo;|&#8217;/g, "’");
}

/**
 * 引用照合用の正規化。
 *
 * 吸収してよいのは「同じ文が Markdown 原文と描画後 HTML で見た目だけ変わる」差分に限る。
 * 具体的には、インラインコードのバッククォート、Markdown リンク記法、
 * `<code>` の境界が句読点の前に差し込む空白、そして引用符・ダッシュの字体。
 *
 * 語そのものは変えない。語を落とすと「言い換えた引用」まで通ってしまい、
 * 捏造を検出するというこの仕組みの目的が失われる。
 */
function normalize(s) {
  return (
    s
      // [text](url) → text
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      // インラインコードのバッククォート
      .replace(/`/g, "")
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[–—]/g, "-")
      .replace(/\s+/g, " ")
      // <code> の境界由来の、句読点の直前・括弧の内側の空白
      .replace(/\s+([,.;:!?])/g, "$1")
      .replace(/\(\s+/g, "(")
      .replace(/\s+\)/g, ")")
      .trim()
  );
}

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36 dev-album-source-verifier";

async function get(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "user-agent": UA },
    });
    const contentType = res.headers.get("content-type") ?? "";
    const body = await res.text();
    return { status: res.status, finalUrl: res.url, contentType, body };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * 可能なら Markdown 版を取りに行く。
 *
 * 描画後の HTML では表の `|` 区切りやコードブロックの体裁が失われ、
 * 原文に実在する引用でも文字列一致しない。Markdown 原文なら逐語のまま照合できる。
 * 多くのドキュメントサイト（code.claude.com 等）が `<path>.md` を配信している。
 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url) {
  // 429 は連続アクセスで起こる。待って 1 度やり直す（生きている出典を落とさない）
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetchOnce(url);
    if (res.status !== 429) return res;
    await sleep(4000);
  }
  return fetchOnce(url);
}

async function fetchOnce(url) {
  if (!/\.(md|txt|json)$/.test(url) && !url.includes("?")) {
    const mdUrl = url.replace(/\/$/, "") + ".md";
    try {
      const md = await get(mdUrl);
      if (md.status === 200 && /markdown|plain/.test(md.contentType)) {
        return { ...md, usedMarkdown: true };
      }
    } catch {
      // Markdown 版が無いのは普通のこと。HTML へ落とす
    }
  }
  return get(url);
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
