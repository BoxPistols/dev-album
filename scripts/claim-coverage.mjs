#!/usr/bin/env node
/**
 * 主張抽出のカバレッジ調査（2026-08-23）
 *
 * 2026-08-16 の監査が抽出した主張をページ単位で数え直し、navigation.ts の
 * ページ一覧と突き合わせる。抽出が 0〜1 件のページを洗い出すのが目的で、
 * 判定そのものの正しさは見ない。
 *
 * 数える対象（監査が残した記録の全部）:
 *   - docs/audits/2026-08-16-unverified-claims.json … low / medium の 1054 件
 *   - docs/audits/2026-08-16-claim-audit.md          … high の REFUTED 152 + UNDETERMINED 34
 *   - client/src/data/sources.generated.ts           … high の CONFIRMED の出典帰属（下限）
 *
 * high の CONFIRMED 280 件は主張単位の記録が残っておらず、逐語照合を通った出典の
 * usedByFiles しか辿れない。ここでの CONFIRMED 列は件数の下限として扱う。
 *
 * 併せて「JSX 本文の外にある散文」も数える（scripts/lib/prose-scan.mjs）。
 * ファイル先頭の const 配列・InfoBox と Quiz の explanation・表のセル・
 * ReferenceLinks の description は <p> の中に無いので、ページを読んで拾う
 * やり方では視界から外れやすい。実際、2026-08-23 に見つかった抽出漏れ 44 件は
 * この 4 箇所に偏っていた。0 件のページが「主張を書いていないページ」なのか
 * 「本文の外に主張があるのに拾えていないページ」なのかは、これを数えると分かれる。
 *
 *   node scripts/claim-coverage.mjs           # 人間向けサマリ + 0〜1 件の一覧
 *   node scripts/claim-coverage.mjs --json    # 全ページの件数を JSON で
 *   node scripts/claim-coverage.mjs --thin    # 0〜1 件のページだけ
 *   node scripts/claim-coverage.mjs --outside # JSX 本文の外の散文だけを見る
 */
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  scanProseOutsideJsxBody,
  emptyProseCounts,
} from "./lib/prose-scan.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(resolve(root, p), "utf-8");

/** 監査を実施したコミット。この時点に無かったページは監査の対象外だった */
const AUDIT_COMMIT = "a0f70ba";

/** 監査時点に存在したページファイルの集合（claude-mux → claude-code の改名を吸収する） */
function loadAuditTimeFiles() {
  try {
    const out = execFileSync(
      "git",
      ["ls-tree", "-r", AUDIT_COMMIT, "--name-only", "client/src/pages"],
      { cwd: root, encoding: "utf-8" },
    );
    return new Set(
      out
        .split("\n")
        .filter(Boolean)
        .map((p) =>
          p
            .replace("client/src/pages/", "")
            .replace("claude-mux/", "claude-code/"),
        ),
    );
  } catch {
    return null;
  }
}

/** navigation.ts の pages 配列を読む */
function loadPages() {
  const src = read("client/src/lib/navigation.ts");
  const start = src.indexOf("export const pages: PageInfo[] = [");
  if (start < 0) throw new Error("navigation.ts の pages 配列が見つからない");
  const body = src.slice(start, src.indexOf("\n];", start));
  const pages = [];
  const re =
    /\{\s*step:\s*(\d+),\s*path:\s*'([^']+)',\s*title:\s*'((?:[^'\\]|\\.)*)',\s*sectionId:\s*'([^']+)',\s*manualId:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(body))) {
    pages.push({
      step: Number(m[1]),
      path: m[2],
      title: m[3].replace(/\\'/g, "'"),
      sectionId: m[4],
      manualId: m[5],
    });
  }
  if (pages.length === 0) throw new Error("pages を 1 件も解析できなかった");
  return pages;
}

/** App.tsx の lazy import と Route から URL パス → ソースファイルを作る */
function loadRouteFiles() {
  const src = read("client/src/App.tsx");
  const components = new Map();
  const lazyRe =
    /const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\("\.\/pages\/([^"]+)"\)\)/g;
  let m;
  while ((m = lazyRe.exec(src))) components.set(m[1], m[2]);

  const routes = new Map();
  const routeRe = /<Route\s+path="([^"]+)"\s+component=\{(\w+)\}/g;
  while ((m = routeRe.exec(src))) {
    const file = components.get(m[2]);
    if (file) routes.set(m[1], file);
  }
  if (routes.size === 0) throw new Error("Route を 1 件も解析できなかった");
  return routes;
}

/** ソースファイルの実在パスを解決する */
function resolveSource(file) {
  for (const cand of [file, `${file}.tsx`, `${file}.ts`]) {
    const p = `client/src/pages/${cand}`;
    if (existsSync(resolve(root, p))) return p;
  }
  return null;
}

const bump = (map, key, field) => {
  if (!map.has(key))
    map.set(key, { lowMedium: 0, refuted: 0, undetermined: 0, confirmed: 0 });
  map.get(key)[field] += 1;
};

/** low / medium の抽出主張 */
function loadLowMedium(map) {
  const rows = JSON.parse(
    read("docs/audits/2026-08-16-unverified-claims.json"),
  );
  if (rows.length === 0) throw new Error("unverified-claims.json が空");
  for (const row of rows) bump(map, row.file, "lowMedium");
  return rows.length;
}

/** high の REFUTED / UNDETERMINED（監査 md の見出し + 「記述」箇条書き） */
function loadHighFromMarkdown(map) {
  const src = read("docs/audits/2026-08-16-claim-audit.md");
  const sections = [
    {
      head: "## 要修正（REFUTED）",
      tail: "## 未確定（UNDETERMINED）",
      field: "refuted",
    },
    {
      head: "## 未確定（UNDETERMINED）",
      tail: "\n## 再現",
      field: "undetermined",
    },
  ];
  const counted = {};
  for (const { head, tail, field } of sections) {
    const from = src.indexOf(head);
    const to = src.indexOf(tail, from + head.length);
    if (from < 0 || to < 0)
      throw new Error(`監査 md の節が見つからない: ${head}`);
    const body = src.slice(from, to);
    let current = null;
    let n = 0;
    for (const line of body.split("\n")) {
      const h = /^### `([^`]+)`/.exec(line);
      if (h) {
        current = h[1];
        continue;
      }
      if (/^- \*\*記述\*\*:/.test(line) && current) {
        bump(map, current, field);
        n += 1;
      }
    }
    if (n === 0) throw new Error(`監査 md から ${field} を 1 件も拾えなかった`);
    counted[field] = n;
  }
  return counted;
}

/** high の CONFIRMED（出典レジストリの usedByFiles。件数の下限） */
function loadConfirmed(map) {
  const src = read("client/src/data/sources.generated.ts");
  const blocks = src.match(/usedByFiles:\s*\[[\s\S]*?\]/g) ?? [];
  if (blocks.length === 0)
    throw new Error("sources.generated.ts の usedByFiles を拾えなかった");
  let n = 0;
  for (const block of blocks) {
    for (const [, f] of block.matchAll(/"client\/src\/pages\/([^"]+)"/g)) {
      bump(map, f, "confirmed");
      n += 1;
    }
  }
  return n;
}

const pages = loadPages();
const routes = loadRouteFiles();

const perFile = new Map();
const lowMediumTotal = loadLowMedium(perFile);
const highMd = loadHighFromMarkdown(perFile);
const confirmedTotal = loadConfirmed(perFile);

const EMPTY = { lowMedium: 0, refuted: 0, undetermined: 0, confirmed: 0 };
const sum = (b) => b.lowMedium + b.refuted + b.undetermined + b.confirmed;

const auditTimeFiles = loadAuditTimeFiles();
const rows = pages.map((page) => {
  const file = routes.get(page.path) ?? null;
  const source = file ? resolveSource(file) : null;
  const key = source ? source.replace("client/src/pages/", "") : null;
  const breakdown = key ? (perFile.get(key) ?? EMPTY) : EMPTY;
  const existedAtAudit =
    auditTimeFiles === null ? null : Boolean(key && auditTimeFiles.has(key));
  // JSX 本文の外の散文。抽出の網が届いていたかを見るための代理指標で、
  // 1 個が 1 主張とは限らない（数そのものではなく 0 か否かで読む）
  const outside = source
    ? scanProseOutsideJsxBody(read(source), source)
    : emptyProseCounts();
  return {
    ...page,
    file: key,
    source,
    breakdown,
    claims: sum(breakdown),
    outside,
    existedAtAudit,
  };
});
const addedAfterAudit = rows.filter((r) => r.existedAtAudit === false);

const unroutable = rows.filter((r) => !r.source);
const routedKeys = new Set(rows.map((r) => r.file).filter(Boolean));
const orphans = [...perFile.entries()].filter(([f]) => !routedKeys.has(f));

const thin = rows.filter((r) => r.claims <= 1);
const args = new Set(process.argv.slice(2));

// 記録 0 件のページを 2 つに分ける。
//   silent … JSX 本文の外にも散文が無い。索引ページ・語義説明で、0 件が妥当
//   missed … 本文の外に散文があるのに記録が 0。抽出の網が届いていなかった疑い
const zero = rows.filter((r) => r.claims === 0);
const zeroMissed = zero.filter((r) => r.outside.total > 0);
const zeroSilent = zero.filter((r) => r.outside.total === 0);
const outsideKinds = [
  ["constArray", "先頭の const 配列"],
  ["explanation", "Quiz の explanation"],
  ["infoBox", "InfoBox"],
  ["tableCell", "表のセル"],
  ["referenceDesc", "ReferenceLinks の description"],
];

function printOutside() {
  const totalProse = rows.reduce((a, r) => a + r.outside.total, 0);
  console.log(
    "── JSX 本文の外の散文（const 配列 / explanation / InfoBox / 表のセル / ReferenceLinks）──",
  );
  console.log(`走査したページ: ${rows.filter((r) => r.source).length}`);
  console.log(`本文の外にある散文: ${totalProse}`);
  for (const [key, label] of outsideKinds) {
    console.log(`  ${label}\t${rows.reduce((a, r) => a + r.outside[key], 0)}`);
  }
  console.log("");
  console.log(
    `記録 0 件のページ ${zero.length} のうち、本文の外に散文があるのは ${zeroMissed.length}、` +
      `散文が無いのは ${zeroSilent.length}。`,
  );
  console.log(
    "後者だけが「主張を書いていないページだから 0 件」と言える。前者は抽出の網が届いていない疑いがある。",
  );
  console.log("");
  console.log("[記録 0 件 × 本文の外に散文あり]");
  for (const r of zeroMissed) {
    const detail = outsideKinds
      .filter(([k]) => r.outside[k] > 0)
      .map(([k, label]) => `${label} ${r.outside[k]}`)
      .join(" / ");
    console.log(
      `  ${String(r.outside.total).padStart(3)}  ${r.path}\t${detail}`,
    );
  }
  console.log("");
  console.log("[記録 0 件 × 本文の外にも散文なし]");
  for (const r of zeroSilent) console.log(`    0  ${r.path}`);
}

if (args.has("--outside")) {
  printOutside();
  process.exit(0);
}

if (args.has("--json")) {
  console.log(
    JSON.stringify(
      {
        totalPages: rows.length,
        totals: {
          lowMedium: lowMediumTotal,
          refuted: highMd.refuted,
          undetermined: highMd.undetermined,
          confirmedSourceLinks: confirmedTotal,
        },
        addedAfterAudit: addedAfterAudit.map((r) => r.path),
        pages: rows.map(
          ({
            step,
            path,
            title,
            manualId,
            file,
            claims,
            breakdown,
            outside,
            existedAtAudit,
          }) => ({
            step,
            path,
            title,
            manualId,
            file,
            claims,
            existedAtAudit,
            ...breakdown,
            outside,
          }),
        ),
        zeroClaimPages: {
          missedSurface: zeroMissed.map((r) => r.path),
          noProseOutsideJsx: zeroSilent.map((r) => r.path),
        },
        orphanFiles: orphans.map(([file, b]) => ({ file, claims: sum(b) })),
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

const manualOrder = [...new Set(pages.map((p) => p.manualId))];

if (!args.has("--thin")) {
  console.log(`ページ総数: ${rows.length}`);
  console.log(
    `記録された主張: low/medium ${lowMediumTotal} + REFUTED ${highMd.refuted} + UNDETERMINED ${highMd.undetermined} + CONFIRMED 出典帰属 ${confirmedTotal}`,
  );
  console.log(
    `ページに紐づかないファイル: ${orphans.length}（${orphans.map(([f]) => f).join(", ")}）`,
  );
  if (unroutable.length) {
    console.log(
      `ルート未解決のページ: ${unroutable.length} — ${unroutable.map((r) => r.path).join(", ")}`,
    );
  }
  console.log(
    `抽出 0〜1 件のページ: ${thin.length}（0 件 ${thin.filter((r) => r.claims === 0).length} / 1 件 ${thin.filter((r) => r.claims === 1).length}）`,
  );
  console.log(
    `うち監査後に追加され対象外だったページ: ${addedAfterAudit.length}（監査時に存在した 0〜1 件のページ: ${thin.filter((r) => r.existedAtAudit !== false).length}）`,
  );
  console.log(
    `記録 0 件のページのうち、JSX 本文の外に散文があるもの: ${zeroMissed.length} / ${zero.length}` +
      `（内訳は --outside）`,
  );
  console.log("");
  console.log("マニュアル\tページ\t主張\t平均\t0〜1件\t0件\t1件\t監査後追加");
  for (const id of manualOrder) {
    const list = rows.filter((r) => r.manualId === id);
    const t = thin.filter((r) => r.manualId === id);
    const c = list.reduce((a, r) => a + r.claims, 0);
    console.log(
      [
        id,
        list.length,
        c,
        (c / list.length).toFixed(1),
        t.length,
        t.filter((r) => r.claims === 0).length,
        t.filter((r) => r.claims === 1).length,
        list.filter((r) => r.existedAtAudit === false).length,
      ].join("\t"),
    );
  }
  console.log("");
}

console.log("── 抽出 0〜1 件のページ（* は監査後に追加された対象外ページ）──");
for (const id of manualOrder) {
  const list = thin.filter((r) => r.manualId === id);
  if (list.length === 0) continue;
  console.log(`\n[${id}] ${list.length} 件`);
  for (const r of list) {
    const mark = r.existedAtAudit === false ? "*" : " ";
    console.log(
      `  ${mark}${r.claims}  ${r.path}\t${r.title}\t${r.source ?? "(ルート未解決)"}\t本文の外の散文 ${r.outside.total}`,
    );
  }
}

if (!args.has("--thin")) {
  console.log("");
  printOutside();
}
