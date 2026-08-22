#!/usr/bin/env node
// 出典レジストリの verifiedAt が古くなったものを洗い出す。
//
// `pnpm freshness`（check-content-freshness.mjs）は npm の latest と教材の表記メジャーを
// 比べる道具で、出典の照合日は見ていない。こちらは sources.ts / sources.generated.ts の
// 全出典について「最後に一次情報と照合した日」からの経過日数を数える。
// 一次情報は黙って書き換わるので、照合日が古い出典は「正しいと分かっている」ではなく
// 「正しかったことがある」に過ぎない。
//
//   pnpm check:freshness                既定 180 日より古い出典を列挙。1 件でもあれば exit 1
//   pnpm check:freshness --days 90      しきい値を変える
//   pnpm check:freshness --json         機械可読な出力
//
// ネットワークに出ないので速い。出力の表は issue にそのまま貼れる Markdown。

import { loadSources } from "./lib/load-sources.mjs";

const DEFAULT_DAYS = 180;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseArgs(argv) {
  let days = DEFAULT_DAYS;
  let asJson = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--json") {
      asJson = true;
    } else if (a === "--days") {
      days = Number(argv[++i]);
    } else if (a.startsWith("--days=")) {
      days = Number(a.slice("--days=".length));
    } else {
      throw new Error(`不明な引数: ${a}`);
    }
  }
  if (!Number.isInteger(days) || days < 0) {
    throw new Error(`--days は 0 以上の整数で指定する（受け取った値: ${days}）`);
  }
  return { days, asJson };
}

/** YYYY-MM-DD を UTC の日付として解釈する。書式が崩れていれば null */
function parseDate(s) {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const t = Date.parse(`${s}T00:00:00Z`);
  return Number.isNaN(t) ? null : t;
}

function ageInDays(verifiedAtMs, nowMs) {
  return Math.floor((nowMs - verifiedAtMs) / MS_PER_DAY);
}

/** 出典が依拠されている場所。usedBy（ページのパス）か usedByFiles（ファイル）のどちらか */
function usedAt(source) {
  const places = [...(source.usedBy ?? []), ...(source.usedByFiles ?? [])];
  return places.length ? places.join("<br>") : "-";
}

function escapeCell(s) {
  return String(s).replace(/\|/g, "\\|");
}

async function main() {
  const { days, asJson } = parseArgs(process.argv.slice(2));
  const now = Date.now();
  const sources = await loadSources();

  const malformed = [];
  const stale = [];
  for (const s of sources) {
    const at = parseDate(s.verifiedAt);
    if (at === null) {
      malformed.push(s);
      continue;
    }
    const age = ageInDays(at, now);
    if (age > days) {
      stale.push({
        id: s.id,
        kind: s.kind,
        verifiedAt: s.verifiedAt,
        ageDays: age,
        url: s.url ?? null,
        usedBy: [...(s.usedBy ?? []), ...(s.usedByFiles ?? [])],
      });
    }
  }
  // 古い順に並べる。上から直せば一番古いものが先に消える
  stale.sort((a, b) => b.ageDays - a.ageDays || a.id.localeCompare(b.id));

  if (asJson) {
    console.log(
      JSON.stringify(
        {
          thresholdDays: days,
          total: sources.length,
          stale,
          malformed: malformed.map((s) => ({ id: s.id, verifiedAt: s.verifiedAt })),
        },
        null,
        2,
      ),
    );
  } else {
    console.log(
      `出典 ${sources.length} 件 / しきい値 ${days} 日 / 古い出典 ${stale.length} 件 / 日付の書式不正 ${malformed.length} 件\n`,
    );
    if (malformed.length) {
      console.log(`## verifiedAt の書式が YYYY-MM-DD でない (${malformed.length})\n`);
      for (const s of malformed) {
        console.log(`- \`${s.id}\`: ${JSON.stringify(s.verifiedAt)}`);
      }
      console.log("");
    }
    if (stale.length) {
      console.log(`## ${days} 日より前に照合した出典 (${stale.length})\n`);
      console.log("| 経過日数 | verifiedAt | id | kind | URL | 依拠している場所 |");
      console.log("|---:|---|---|---|---|---|");
      for (const s of stale) {
        const url = s.url ? `<${s.url}>` : "（実測・URL なし）";
        console.log(
          `| ${s.ageDays} | ${s.verifiedAt} | \`${escapeCell(s.id)}\` | ${s.kind} | ${escapeCell(url)} | ${escapeCell(usedAt(s))} |`,
        );
      }
      console.log(
        `\n古い出典は一次情報を読み直し、引用が今も本文にあれば verifiedAt を今日の日付に更新する。` +
          `\n原文が変わっていれば、引用と教材の記述を一次情報に合わせて改める（verifiedAt だけ進めない）。`,
      );
    } else {
      console.log(`すべての出典が ${days} 日以内に照合されている。`);
    }
  }

  if (stale.length || malformed.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 2;
});
