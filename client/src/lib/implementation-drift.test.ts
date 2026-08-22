import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

/**
 * 教材がこのリポジトリ自身の実装を写している箇所と、実装の現在値を突き合わせる。
 *
 * 列挙式ではなく走査式にする（link-integrity.test.ts と同じ形）。
 * - 実装側（api/lib/quota.ts, .github/workflows/*.yml）は毎回ファイルを読んで値を取り出す
 * - 教材側は `// implementation-mirror: <path>` の印を付けたファイルを全走査し、
 *   この test の REGISTRY に載っていない印があれば落とす（検査の無い写しを作らせない）
 */

const ROOT = join(import.meta.dirname, "..", "..", "..");
const SRC_DIR = join(ROOT, "client", "src");
const QUOTA_SOURCE = "api/lib/quota.ts";
const WORKFLOWS_DIR = ".github/workflows";

const MIRROR_MARKER = /^\/\/ implementation-mirror: (\S+)\s*$/gm;

/** この test が検査している教材側ファイル（client/src からの相対パス） */
const REGISTRY = {
  policyChatQuota: "pages/PolicyChatQuota.tsx",
  useChatApi: "hooks/useChatApi.ts",
  seo: "lib/seo.ts",
  secretsPermissions: "pages/git/github-actions/SecretsPermissions.tsx",
} as const;

function read(relFromRoot: string): string {
  return readFileSync(join(ROOT, relFromRoot), "utf-8");
}

function readSrc(relFromSrc: string): string {
  return readFileSync(join(SRC_DIR, relFromSrc), "utf-8");
}

function getAllSourceFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...getAllSourceFiles(full));
    } else if (/\.(tsx?|md)$/.test(full) && !/\.test\.tsx?$/.test(full)) {
      files.push(full);
    }
  }
  return files;
}

// ---------------------------------------------------------------------------
// 実装側の値を取り出す
// ---------------------------------------------------------------------------

/** `export type Tier = "anonymous" | "byok";` から層名を取り出す */
function parseTierUnion(source: string): Set<string> {
  const m = source.match(/export type Tier = ([^;]+);/);
  if (!m) throw new Error(`${QUOTA_SOURCE} に export type Tier が見つからない`);
  return new Set([...m[1].matchAll(/"([a-z]+)"/g)].map((x) => x[1]));
}

/** `anonymous: Number(process.env.CHAT_CAP_ANONYMOUS ?? 10)` の既定値 */
function parseAnonymousDefault(source: string): number {
  const m = source.match(/CHAT_CAP_ANONYMOUS \?\? (\d+)/);
  if (!m)
    throw new Error(`${QUOTA_SOURCE} に CHAT_CAP_ANONYMOUS の既定値が無い`);
  return Number(m[1]);
}

type PermissionMap = Map<string, Set<string>>; // workflow 名 → write を持つ scope

/**
 * workflow YAML の permissions ブロック（トップレベル・各 job）を集め、
 * write を持つ scope を workflow ごとに返す。
 * yaml パッケージは依存に無いので、この用途に足りる最小限の字句解析で済ませる。
 */
function parseWritePermissions(source: string): Set<string> {
  const writes = new Set<string>();
  const lines = source.split("\n").map((l) => l.replace(/\s+#.*$/, ""));
  for (let i = 0; i < lines.length; i++) {
    const head = lines[i].match(/^(\s*)permissions:\s*(.*)$/);
    if (!head) continue;
    const indent = head[1].length;
    const inline = head[2].trim();
    if (inline === "write-all") writes.add("write-all");
    if (inline !== "") continue; // read-all / {} / write-all
    for (let j = i + 1; j < lines.length; j++) {
      const line = lines[j];
      if (line.trim() === "") continue;
      const lineIndent = line.match(/^(\s*)/)![1].length;
      if (lineIndent <= indent) break;
      const kv = line.trim().match(/^([\w-]+):\s*(\w+)$/);
      if (kv && kv[2] === "write") writes.add(kv[1]);
    }
  }
  return writes;
}

function collectWorkflowWrites(): PermissionMap {
  const dir = join(ROOT, WORKFLOWS_DIR);
  const map: PermissionMap = new Map();
  for (const file of readdirSync(dir)) {
    if (!/\.ya?ml$/.test(file)) continue;
    const name = file.replace(/\.ya?ml$/, "");
    const writes = parseWritePermissions(
      readFileSync(join(dir, file), "utf-8"),
    );
    if (writes.size > 0) map.set(name, writes);
  }
  return map;
}

// ---------------------------------------------------------------------------
// 教材側の記述を取り出す
// ---------------------------------------------------------------------------

/** 利用枠の表で使う日本語の区分名 → Tier の対応。表に無い名前はここに載せない */
const TIER_LABELS: Record<string, string> = {
  匿名: "anonymous",
  BYOK: "byok",
};

/** PolicyChatQuota の利用枠テーブルの 1 列目（区分）を順に取り出す */
function parsePolicyTierRows(source: string): string[] {
  const tbody = source.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/);
  if (!tbody) throw new Error("利用枠の <tbody> が見つからない");
  return [...tbody[1].matchAll(/<tr>\s*<td[^>]*>\s*([^<]+?)\s*<\/td>/g)].map(
    (m) => m[1],
  );
}

/**
 * 「書き込み権限を持つのは labeler（<code>pull-requests: write</code>）と stale（…）だけ」
 * の文から workflow 名 → scope を取り出す
 */
function parseClaimedWritePermissions(source: string): PermissionMap {
  const flat = source.replace(/\s+/g, " ");
  const claim = flat.match(/書き込み権限を持つのは(.+?)だけで/);
  if (!claim)
    throw new Error("「書き込み権限を持つのは…だけで」の文が見つからない");
  const map: PermissionMap = new Map();
  const re = /([\w-]+) ?（((?:<code>[\w-]+: write<\/code>(?: と )?)+)）/g;
  for (const m of claim[1].matchAll(re)) {
    const scopes = [...m[2].matchAll(/<code>([\w-]+): write<\/code>/g)].map(
      (s) => s[1],
    );
    map.set(m[1], new Set(scopes));
  }
  return map;
}

/** 行単位で「招待」に触れつつ、否定（無い・ありません・存在しない）を伴わない箇所 */
function findInviteClaims(source: string): string[] {
  return source
    .split("\n")
    .filter((l) => /招待|invited/i.test(l))
    .filter((l) => !/ありません|無い|ない|存在しない|not implemented/.test(l));
}

// ---------------------------------------------------------------------------

const quotaSource = read(QUOTA_SOURCE);
const implementedTiers = parseTierUnion(quotaSource);

describe("実装と教材のズレ検出: チャット利用枠の層 (Tier)", () => {
  it("quota.ts の Tier union を読めている", () => {
    expect(implementedTiers.size).toBeGreaterThan(0);
  });

  it("PolicyChatQuota の利用枠テーブルの区分が Tier と一致する", () => {
    const rows = parsePolicyTierRows(readSrc(REGISTRY.policyChatQuota));
    const unknown = rows.filter((r) => !(r in TIER_LABELS));
    expect(unknown, "Tier に対応しない区分が表にある").toEqual([]);
    const listed = new Set(rows.map((r) => TIER_LABELS[r]));
    expect([...listed].sort()).toEqual([...implementedTiers].sort());
  });

  it("useChatApi の ChatTier と validTiers が Tier と一致する", () => {
    const src = readSrc(REGISTRY.useChatApi);
    const union = src.match(/export type ChatTier = ([^;]+);/);
    expect(union).not.toBeNull();
    const chatTier = [...union![1].matchAll(/"([a-z]+)"/g)].map((m) => m[1]);
    expect(chatTier.sort()).toEqual([...implementedTiers].sort());

    const valid = src.match(/validTiers: ChatTier\[\] = \[([^\]]+)\]/);
    expect(valid).not.toBeNull();
    const validTiers = [...valid![1].matchAll(/"([a-z]+)"/g)].map((m) => m[1]);
    expect(validTiers.sort()).toEqual([...implementedTiers].sort());
  });

  it("実装に無い層（招待コード等）を、あるものとして書いていない", () => {
    if (implementedTiers.has("invited")) return;
    for (const file of [
      REGISTRY.policyChatQuota,
      REGISTRY.useChatApi,
      REGISTRY.seo,
    ]) {
      expect(findInviteClaims(readSrc(file)), file).toEqual([]);
    }
  });
});

describe("実装と教材のズレ検出: 匿名の 1 日上限", () => {
  const anonymousDefault = parseAnonymousDefault(quotaSource);

  it("PolicyChatQuota は回数を固定せず、デプロイ時の設定値だと書いている", () => {
    const src = readSrc(REGISTRY.policyChatQuota);
    expect(src).toContain("デプロイ時の設定値");
    expect(src).toContain("X-RateLimit-Limit");
    const literal = new RegExp(`(?<![\\d.])${anonymousDefault}\\s*回`);
    expect(src).not.toMatch(literal);
  });

  it("env 名に触れるページは、値が設定で決まることも書いている", () => {
    const violations: string[] = [];
    for (const file of getAllSourceFiles(join(SRC_DIR, "pages"))) {
      const src = readFileSync(file, "utf-8");
      if (!src.includes("CHAT_CAP_ANONYMOUS")) continue;
      if (!/設定値|環境変数/.test(src)) violations.push(relative(ROOT, file));
    }
    expect(violations).toEqual([]);
  });
});

describe("実装と教材のズレ検出: workflow の permissions", () => {
  const actual = collectWorkflowWrites();

  it("workflow を読めている", () => {
    expect(existsSync(join(ROOT, WORKFLOWS_DIR))).toBe(true);
    expect(actual.size).toBeGreaterThan(0);
  });

  it("SecretsPermissions が書く write 権限の一覧が、実際の workflow と一致する", () => {
    const claimed = parseClaimedWritePermissions(
      readSrc(REGISTRY.secretsPermissions),
    );
    const toObj = (m: PermissionMap) =>
      Object.fromEntries(
        [...m.entries()]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, v]) => [k, [...v].sort()]),
      );
    expect(toObj(claimed)).toEqual(toObj(actual));
  });

  it("SecretsPermissions が「CI は読み取り固定」と書く通り、ci.yml に write が無い", () => {
    expect(actual.has("ci")).toBe(false);
  });
});

describe("implementation-mirror の印", () => {
  const registryFiles = new Set<string>(Object.values(REGISTRY));
  const marked = new Map<string, string[]>();
  for (const file of getAllSourceFiles(SRC_DIR)) {
    const src = readFileSync(file, "utf-8");
    const targets = [...src.matchAll(MIRROR_MARKER)].map((m) => m[1]);
    if (targets.length > 0) marked.set(relative(SRC_DIR, file), targets);
  }

  it("印の付いたファイルはすべてこの test の REGISTRY で検査している", () => {
    const uncovered = [...marked.keys()].filter((f) => !registryFiles.has(f));
    expect(
      uncovered,
      "implementation-mirror を付けたら implementation-drift.test.ts に検査を足す",
    ).toEqual([]);
  });

  it("REGISTRY のファイルには印が付いている", () => {
    const unmarked = [...registryFiles].filter((f) => !marked.has(f));
    expect(unmarked).toEqual([]);
  });

  it("印が指す実装パスは実在する", () => {
    const missing: string[] = [];
    for (const [file, targets] of marked) {
      for (const t of targets) {
        if (!existsSync(join(ROOT, t))) missing.push(`${file} -> ${t}`);
      }
    }
    expect(missing).toEqual([]);
  });
});
