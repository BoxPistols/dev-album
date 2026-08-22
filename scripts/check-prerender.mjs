// ビルド後の dist/public を歩き、prerender された HTML の <title> と og:url が
// そのファイルのパスに対応しているかを突き合わせる（curl の代わりにローカルで読む）。
// 使い方: pnpm build && pnpm check:prerender [--all]
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ORIGIN = "https://dev-album.vercel.app";
const root = resolve(import.meta.dirname, "../dist/public");
const all = process.argv.includes("--all");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "assets" || name === "vendor") continue;
      walk(p, out);
    } else if (name === "index.html") {
      out.push(p);
    }
  }
  return out;
}

function pick(html, re, file) {
  const m = html.match(re);
  if (!m) throw new Error(`${file}: not found ${re}`);
  return m[1];
}

const files = walk(root);
if (files.length === 0) {
  console.error(`no index.html under ${root}. run pnpm build first`);
  process.exit(1);
}

// 先頭・末尾・中間と固定の代表ページを抜き取る。--all で全件
const must = ["index.html", "learning/sources/search-technique/index.html", "bug-report/index.html", "git/index.html"];
const sample = all
  ? files
  : Array.from(
      new Set([
        ...must.map((f) => join(root, f)),
        files[0],
        files[Math.floor(files.length / 2)],
        files[files.length - 1],
      ]),
    );

const titles = new Map();
let failed = 0;
for (const file of sample) {
  const rel = relative(root, file).replace(/\\/g, "/");
  const route = rel === "index.html" ? "/" : `/${rel.replace(/\/index\.html$/, "")}`;
  const html = readFileSync(file, "utf8");
  const title = pick(html, /<title>([^<]*)<\/title>/, rel);
  const ogUrl = pick(html, /<meta property="og:url" content="([^"]*)"/, rel);
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/, rel);
  const expected = `${ORIGIN}${route}`;
  const problems = [];
  if (ogUrl !== expected) problems.push(`og:url=${ogUrl}`);
  if (canonical !== expected) problems.push(`canonical=${canonical}`);
  if (!/<script type="application\/ld\+json" id="seo-json-ld">/.test(html)) problems.push("json-ld missing");
  if (!/src="\/assets\//.test(html)) problems.push("asset src is not absolute");
  if (titles.has(title)) problems.push(`title duplicates ${titles.get(title)}`);
  titles.set(title, route);
  if (problems.length) {
    failed++;
    console.log(`NG ${route}: ${problems.join(", ")}`);
  } else {
    console.log(`OK ${route}  <title>${title}</title>`);
  }
}

console.log(`\n${sample.length} checked (${files.length} prerendered html total), ${failed} failed`);
process.exit(failed ? 1 : 0);
