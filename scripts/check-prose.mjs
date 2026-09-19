#!/usr/bin/env node
// 差分で追加・変更した行だけを、textlintで文章として検査する。
//
//   node scripts/check-prose.mjs                  origin/mainとの分岐点から先を見る
//   node scripts/check-prose.mjs --base <ref>     比較の基点を指定する
//   node scripts/check-prose.mjs --json           機械可読で出す
//
// なぜ差分だけか: 既存のページには和欧間の半角スペースが大量に残っている。
// 規約は「新しく書く文章には入れない。既存の文書は一括で直さない」なので、
// ファイル全体を検査すると既存行で必ず落ち、検査として使えない。
// 追加・変更した行の検出だけを残すと、規約の範囲と検査の範囲が一致する。
//
// なぜ.tsxをプレーンテキストとして読むか: JSX用のtextlintプラグインは
// TypeScriptのCompiler API（ts.createSourceFile）を使う。このリポジトリの
// TypeScript 7はそのAPIを提供しないので、プラグインは読み込みに失敗し、
// textlintは「ルールが無い」とだけ言って終わる。ルールは文字の並びだけを見るので、
// プレーンテキストとして読んでも検出は変わらない（14ファイル2275件で一致を確認した）。

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { argv, exit } from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createLinter, loadTextlintrc } from "textlint";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_PATH = path.join(ROOT, ".textlintrc.json");

/**
 * 検査する拡張子。.md以外は.textlintrc.jsonのpluginsにも同じものを書く。
 * 片方だけに足すと、textlintがそのファイルを黙って読み飛ばす
 */
export const TARGET_EXTENSIONS = [
  ".md",
  ".mdx",
  ".ts",
  ".tsx",
  ".mjs",
  ".js",
  ".yml",
  ".yaml",
];

/** 人が書かないファイル。生成物は生成元で直す */
const IGNORED_PATHS = [
  "client/src/data/sources.generated.ts",
  "pnpm-lock.yaml",
];

export function isTarget(file) {
  if (IGNORED_PATHS.includes(file)) return false;
  return TARGET_EXTENSIONS.includes(path.extname(file));
}

/**
 * `git diff -U0`の出力から、ファイルごとの「追加・変更した行番号」を取り出す。
 * 削除だけのhunk（+c,0）は行を持たないので何も足さない。
 */
export function addedLines(diffText) {
  const added = new Map();
  let current = null;
  for (const line of diffText.split("\n")) {
    if (line.startsWith("+++ ")) {
      const file = line.slice(4).trim();
      current = file === "/dev/null" ? null : file.replace(/^b\//, "");
      if (current && !added.has(current)) added.set(current, new Set());
      continue;
    }
    const hunk = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/.exec(line);
    if (!hunk || !current) continue;
    const start = Number(hunk[1]);
    const count = hunk[2] === undefined ? 1 : Number(hunk[2]);
    for (let i = 0; i < count; i++) added.get(current).add(start + i);
  }
  return added;
}

/** ルールはメッセージの先頭に重大度を書く（textlintは診断ごとの重大度を持たないため） */
export function severityOf(message) {
  const m = /^\[(error|warn|info)\]/.exec(message);
  return m ? m[1] : "error";
}

/** textlintの結果から、追加・変更した行に掛かる検出だけを残す */
export function pickViolations(results, added, root = ROOT) {
  const picked = [];
  for (const result of results) {
    const file = path.relative(root, result.filePath).split(path.sep).join("/");
    const lines = added.get(file);
    if (!lines) continue;
    for (const m of result.messages) {
      if (!lines.has(m.line)) continue;
      picked.push({
        file,
        line: m.line,
        column: m.column,
        severity: severityOf(m.message),
        message: m.message,
      });
    }
  }
  return picked;
}

export async function createProseLinter() {
  const descriptor = await loadTextlintrc({ configFilePath: CONFIG_PATH });
  // 設定の読み込みに失敗するとルールが0個になり、何を渡しても検出0件で通ってしまう
  if (descriptor.rule.descriptors.length === 0) {
    throw new Error(`textlintのルールを読み込めなかった: ${CONFIG_PATH}`);
  }
  return createLinter({ descriptor });
}

function git(args) {
  return execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
}

function collectAdded(base) {
  const mergeBase = git(["merge-base", base, "HEAD"]).trim();
  // 作業ツリーとの差分にして、コミット前の変更も見る
  const added = addedLines(
    git(["diff", "-U0", "--no-color", "--diff-filter=AM", mergeBase, "--", "."]),
  );
  // 未追跡の新規ファイルはdiffに出ないので、全行を追加として扱う
  const untracked = git(["ls-files", "--others", "--exclude-standard"])
    .split("\n")
    .filter(Boolean);
  for (const file of untracked) {
    const abs = path.join(ROOT, file);
    if (!isTarget(file) || !existsSync(abs)) continue;
    const count = readFileSync(abs, "utf8").split("\n").length;
    added.set(file, new Set(Array.from({ length: count }, (_, i) => i + 1)));
  }
  for (const file of [...added.keys()]) {
    if (!isTarget(file) || !existsSync(path.join(ROOT, file))) added.delete(file);
  }
  return { mergeBase, added };
}

async function main() {
  const args = argv.slice(2);
  const json = args.includes("--json");
  const baseIndex = args.indexOf("--base");
  const base = baseIndex >= 0 ? args[baseIndex + 1] : "origin/main";
  if (!base) {
    console.error("--baseには比較の基点（ブランチ名やコミット）を渡す");
    exit(2);
  }

  const { mergeBase, added } = collectAdded(base);
  const files = [...added.keys()];
  const lineCount = files.reduce((n, f) => n + added.get(f).size, 0);

  const linter = await createProseLinter();
  const results = files.length
    ? await linter.lintFiles(files.map((f) => path.join(ROOT, f)))
    : [];
  const violations = pickViolations(results, added);
  const errors = violations.filter((v) => v.severity === "error");

  if (json) {
    console.log(
      JSON.stringify({ base, mergeBase, files: files.length, lines: lineCount, violations }, null, 1),
    );
  } else {
    for (const v of violations) {
      console.log(`${v.file}:${v.line}:${v.column} ${v.message}`);
    }
    // 0件のときに「違反が無い」のか「何も見ていない」のかを区別できるよう、見た量を必ず出す
    console.log(
      `\n${base}との分岐点（${mergeBase.slice(0, 7)}）から先の${files.length}ファイル・${lineCount}行を検査した。` +
        `error ${errors.length}件、それ以外${violations.length - errors.length}件`,
    );
    if (errors.length) {
      console.log("和欧間のスペースなど機械で直せるものは、対象の行だけを手で直す（ファイル全体に自動修正を掛けない）");
    }
  }
  exit(errors.length ? 1 : 0);
}

if (argv[1] && import.meta.url === pathToFileURL(argv[1]).href) {
  main().catch((e) => {
    console.error(e);
    exit(2);
  });
}
