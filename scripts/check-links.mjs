#!/usr/bin/env node
// 教材ページに書かれた外部リンクが実在するかを確認する。
//
// link-integrity.test.ts は内部リンク（navigate / href のパス）専用で、
// 外部 URL は 1 つも見ていない。リンク切れは「読者が踏むまで誰も気づかない」形で腐るため、
// ここで機械的に洗う。
//
//   pnpm check:links              全件
//   pnpm check:links --json       機械可読な出力
//   pnpm check:links <部分一致>   対象ページを絞る
//
// ネットワークに出るので vitest には入れない（外部障害で CI を落とさない）。

import { readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const PAGES_DIR = resolve(ROOT, "client/src/pages");

const TIMEOUT_MS = 15000;
const CONCURRENCY = 8;

// 素っ気ない UA だと bot 扱いで接続ごと切るサイトがある（cursor.com / upstash.com 等）。
// 実在するのに「到達不可」と報告するのは、この道具の信用を落とすので避ける。
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36 dev-album-link-checker";

/**
 * 教材のコード例に出てくる架空のホスト。到達しなくて当然なので対象から外す。
 * 「落ちている」と「そもそも実在しない例示」を混ぜると、結果が読めなくなる。
 */
const PLACEHOLDER_HOSTS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "localhost",
  "127.0.0.1",
  "myapp.com",
  "mysite.com",
  "external-api.com",
  "api.example-analytics.com",
  "cdn.example-analytics.com",
  "your-domain.com",
  "your-project.supabase.co",
]);

/** 架空のホストに使われるサフィックス（サブドメイン付きの例示を丸ごと拾う） */
const PLACEHOLDER_HOST_SUFFIXES = [
  ".example.com",
  ".example.org",
  ".example.net",
  ".example.jp",
  ".internal",
  ".local",
  ".test",
  ".invalid",
  ".localhost",
];

/** 到達確認をしないパターン（プレースホルダを含む URL） */
const PLACEHOLDER_PATTERNS = [
  /\{[^}]*\}/, // {id} などのテンプレート
  /<[^>]*>/, // <your-token>
  /\$\{/, // テンプレートリテラル
  /:[a-z]+\*/, // :path* のようなルートパターン
  /YOUR_|xxxxx|placeholder/i,
  /\/(xxx|yyy|zzz)(\/|$|\?)/i, // /file/xxx
  /OWNER\/REPO|your-org|your-repo|your-username/i,
  /github\.com\/username\//i, // 例示のユーザー名
  /-username\.vercel\.app/i,
];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

function extractUrls(text) {
  // 全角の括弧・句読点も終端として扱う。半角だけを見ていると
  // 「https://github.com）にログインします。」がまるごと URL になる
  const raw = text.match(/https:\/\/[^\s"'`)\\<>）（「」、。，．§]+/g) ?? [];
  return raw
    .map((u) => u.replace(/[.,;:]+$/, ""))
    .filter((u) => /^https:\/\/[a-zA-Z0-9]/.test(u));
}

function isPlaceholder(url) {
  let host;
  try {
    host = new URL(url).hostname;
  } catch {
    return true;
  }
  if (PLACEHOLDER_HOSTS.has(host)) return true;
  if (PLACEHOLDER_HOST_SUFFIXES.some((s) => host.endsWith(s))) return true;
  // ドットを含まないホスト（api.internal を除いた素の内部名など）
  if (!host.includes(".")) return true;
  return PLACEHOLDER_PATTERNS.some((p) => p.test(url));
}

async function head(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    // HEAD を拒否するサイトがあるので、405/501 なら GET で取り直す
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": UA },
    });
    // HEAD にだけ 404 を返すサイトがある（kaggle.com など）。
    // HEAD の結果だけで「切れている」と断じると、生きているページを殺す。
    if (
      res.status === 405 ||
      res.status === 501 ||
      res.status === 403 ||
      res.status === 404
    ) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": UA },
      });
    }
    return { status: res.status, finalUrl: res.url };
  } catch (err) {
    return { status: 0, error: err.name === "AbortError" ? "timeout" : err.message };
  } finally {
    clearTimeout(timer);
  }
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      for (;;) {
        const i = next++;
        if (i >= items.length) return;
        results[i] = await fn(items[i], i);
      }
    }),
  );
  return results;
}

async function main() {
  const args = process.argv.slice(2);
  const asJson = args.includes("--json");
  const filter = args.find((a) => !a.startsWith("--"));

  let files = walk(PAGES_DIR);
  if (filter) files = files.filter((f) => f.includes(filter));

  /** @type {Map<string, Set<string>>} url -> 参照しているファイル */
  const urlToFiles = new Map();
  let skipped = 0;

  for (const file of files) {
    const text = readFileSync(file, "utf8");
    for (const url of extractUrls(text)) {
      if (isPlaceholder(url)) {
        skipped++;
        continue;
      }
      if (!urlToFiles.has(url)) urlToFiles.set(url, new Set());
      urlToFiles.get(url).add(relative(ROOT, file));
    }
  }

  const urls = [...urlToFiles.keys()].sort();
  if (urls.length === 0) {
    console.error("対象 URL が 0 件。抽出に失敗した可能性がある");
    process.exitCode = 2;
    return;
  }

  if (!asJson) {
    console.log(
      `ページ ${files.length} 件 / 実在確認する URL ${urls.length} 件 / 例示として除外 ${skipped} 件\n`,
    );
  }

  const checked = await mapLimit(urls, CONCURRENCY, async (url) => {
    // 接続そのものに失敗した場合だけ 1 回やり直す。
    // 一過性の失敗を「切れている」と報告すると、実行のたびに結果が変わって信用されない。
    let r = await head(url);
    if (r.status === 0) {
      await new Promise((ok) => setTimeout(ok, 1500));
      r = await head(url);
    }
    return { url, ...r, files: [...urlToFiles.get(url)] };
  });

  // 403 / 405 / 429 は bot 対策で拒否されただけのことが多く、リンク切れとは別物。
  // 混ぜると本当に切れているものが埋もれるので分ける。
  // 400 / 401 はサーバーが応答している＝ホストは生きている。認証が要る API や
  // MCP エンドポイントを教材が例示しているケースで、リンク切れではない。
  const BLOCKED_STATUSES = new Set([400, 401, 403, 405, 429]);
  const blocked = checked.filter((c) => BLOCKED_STATUSES.has(c.status));
  const broken = checked.filter(
    (c) => !BLOCKED_STATUSES.has(c.status) && (c.status === 0 || c.status >= 400),
  );
  const redirected = checked.filter(
    (c) => c.status >= 200 && c.status < 400 && c.finalUrl && c.finalUrl !== c.url,
  );

  if (asJson) {
    console.log(JSON.stringify({ checked, broken, blocked, redirected }, null, 2));
  } else {
    if (broken.length) {
      console.log(`## 切れている (${broken.length})\n`);
      for (const b of broken) {
        console.log(`  ✗ ${b.status || b.error}  ${b.url}`);
        for (const f of b.files) console.log(`      ${f}`);
      }
      console.log("");
    }
    if (blocked.length) {
      console.log(`## 自動アクセスを拒否された（手で開いて確認する） (${blocked.length})\n`);
      for (const b of blocked) {
        console.log(`  ? ${b.status}  ${b.url}`);
        for (const f of b.files) console.log(`      ${f}`);
      }
      console.log("");
    }
    if (redirected.length) {
      console.log(`## リダイレクトされる (${redirected.length})\n`);
      for (const r of redirected) {
        console.log(`  → ${r.url}`);
        console.log(`    ${r.finalUrl}`);
        for (const f of r.files) console.log(`      ${f}`);
      }
      console.log("");
    }
    console.log(
      `確認 ${checked.length} 件 / 切れている ${broken.length} 件 / 要手動確認 ${blocked.length} 件 / リダイレクト ${redirected.length} 件`,
    );
    if (redirected.length) {
      console.log(
        `\nリダイレクトは今は届くが、旧 URL のまま放置すると次の移設で切れる。恒久 URL に書き換える。`,
      );
    }
  }

  if (broken.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
