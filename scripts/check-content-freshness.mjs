#!/usr/bin/env node
/**
 * 教材コンテンツの鮮度チェック（アドバイザリ）
 *
 * npm registry の latest と、教材が表記/同梱しているバージョンを突き合わせ、
 * メジャーバージョンの乖離を警告する。ネットワークを使うため CI 必須にはせず、
 * `npm run freshness` で定期的に手動実行する想定。
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** 監視対象: 教材の表記・プレビュー同梱バージョン */
const CLAIMS = [
  {
    pkg: "@mui/material",
    label: "MUI（ページタイトル表記）",
    // ページタイトル「MUI 7 入門」の表記メジャー
    claimed: extractMajor(
      readFileSync(
        resolve(root, "client/src/lib/navigation.ts"),
        "utf-8",
      ).match(/title:\s*'MUI (\d+) 入門'/)?.[1],
    ),
    note: "タイトル表記のメジャー。乖離したら教材内容の v 差分確認が必要",
  },
  {
    pkg: "@mui/material",
    label: "MUI（プレビュー同梱 UMD）",
    claimed: vendorMajor(/mui-material-(\d+)\./),
    note: "UMD 配布は v5 が最終のため、latest と乖離していても基本 API 共通なら許容（ページ内に注記済み）",
    allowDrift: true,
  },
  {
    pkg: "@tailwindcss/browser",
    label: "Tailwind（プレビュー同梱）",
    claimed: vendorMajor(/tailwindcss-browser-(\d+)\./),
  },
  {
    pkg: "styled-components",
    label: "styled-components（プレビュー同梱）",
    claimed: vendorMajor(/styled-components-(\d+)\./),
  },
  {
    pkg: "@emotion/react",
    label: "Emotion（プレビュー同梱）",
    claimed: vendorMajor(/emotion-react-(\d+)\./),
  },
  {
    pkg: "react",
    label: "React（プレビュー実行環境）",
    claimed: vendorMajor(/react-(\d+)\./),
    note: "UMD 配布は 18 が最終。React 19 専用 API のプレビュー制約はページ内に注記済み",
    allowDrift: true,
  },
  {
    pkg: "three",
    label: "Three.js（プレビュー同梱）",
    claimed: vendorMajor(/three-0\.(\d+)\./),
    // three は 0.x 運用なのでマイナーをメジャー相当として扱う
    zeroBased: true,
    note: "0.161 以降 UMD ビルド廃止のため 0.160 に固定（CLAUDE.md 禁止パターン参照）",
    allowDrift: true,
  },
];

function extractMajor(v) {
  return v ? Number(v) : undefined;
}

function vendorMajor(pattern) {
  const src = readFileSync(
    resolve(root, "client/src/lib/preview.ts"),
    "utf-8",
  );
  return extractMajor(src.match(pattern)?.[1]);
}

async function latestOf(pkg) {
  const res = await fetch(
    `https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`,
  );
  if (!res.ok) throw new Error(`${pkg}: registry ${res.status}`);
  const { version } = await res.json();
  return version;
}

let warns = 0;
console.log("教材コンテンツ鮮度チェック\n");
for (const claim of CLAIMS) {
  if (claim.claimed === undefined) {
    console.log(`⚠ ${claim.label}: 表記の抽出に失敗（パターン要更新）`);
    warns++;
    continue;
  }
  try {
    const latest = await latestOf(claim.pkg);
    const latestMajor = claim.zeroBased
      ? Number(latest.split(".")[1])
      : Number(latest.split(".")[0]);
    const drift = latestMajor !== claim.claimed;
    const mark = drift ? (claim.allowDrift ? "△" : "⚠") : "✓";
    console.log(
      `${mark} ${claim.label}: 表記/同梱 v${claim.claimed} / npm latest ${latest}` +
        (drift && claim.note ? `\n    → ${claim.note}` : ""),
    );
    if (drift && !claim.allowDrift) warns++;
  } catch (e) {
    console.log(`⚠ ${claim.label}: 取得失敗 ${e.message}`);
    warns++;
  }
}

console.log(
  warns > 0
    ? `\n${warns} 件の乖離/失敗。教材の表記更新を検討してください。`
    : "\n乖離なし。",
);
