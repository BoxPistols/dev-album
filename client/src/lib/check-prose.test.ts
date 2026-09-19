// @vitest-environment node
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// scripts/check-prose.mjsは「差分で足した行だけ」をtextlintで検査する。
// この検査は静かに0件になる壊れ方を2つ持つ。設定の読み込みに失敗してルールが0個になる場合と、
// 拡張子がtextlintのどのプラグインにも登録されておらずファイルごと読み飛ばされる場合で、
// どちらも「違反なし」と見分けが付かない。検出できることと、対象の拡張子が実際に読まれることを固定する。
import {
  TARGET_EXTENSIONS,
  addedLines,
  createProseLinter,
  isTarget,
  pickViolations,
  severityOf,
  // @ts-expect-error - .mjsに型定義は無い
} from "../../../scripts/check-prose.mjs";

const ROOT = path.resolve(import.meta.dirname, "../../..");

type Violation = { file: string; line: number; severity: string };

describe("addedLines", () => {
  it("hunkの開始行と行数から、追加・変更した行番号を取り出す", () => {
    const diff = [
      "diff --git a/a.tsx b/a.tsx",
      "--- a/a.tsx",
      "+++ b/a.tsx",
      "@@ -10,2 +10,3 @@ export function A() {",
      "+x",
      "@@ -40 +41 @@",
      "+y",
    ].join("\n");
    const added = addedLines(diff) as Map<string, Set<number>>;
    expect([...(added.get("a.tsx") ?? [])]).toEqual([10, 11, 12, 41]);
  });

  it("削除だけのhunkと削除されたファイルは行を持たない", () => {
    const diff = [
      "--- a/a.tsx",
      "+++ b/a.tsx",
      "@@ -5,3 +4,0 @@",
      "--- a/gone.tsx",
      "+++ /dev/null",
      "@@ -1,2 +0,0 @@",
    ].join("\n");
    const added = addedLines(diff) as Map<string, Set<number>>;
    expect([...(added.get("a.tsx") ?? [])]).toEqual([]);
    expect(added.has("gone.tsx")).toBe(false);
  });

  it("複数のファイルを取り違えない", () => {
    const diff = [
      "+++ b/a.tsx",
      "@@ -1 +1 @@",
      "+++ b/docs/b.md",
      "@@ -0,0 +7,2 @@",
    ].join("\n");
    const added = addedLines(diff) as Map<string, Set<number>>;
    expect([...(added.get("a.tsx") ?? [])]).toEqual([1]);
    expect([...(added.get("docs/b.md") ?? [])]).toEqual([7, 8]);
  });
});

describe("pickViolations", () => {
  const results = [
    {
      filePath: path.join(ROOT, "client/src/pages/A.tsx"),
      messages: [
        { line: 3, column: 1, message: "[error] formatting/jp-en-space: x" },
        { line: 9, column: 1, message: "[error] formatting/jp-en-space: x" },
        { line: 9, column: 4, message: "[warn] metaphor/otoshiana: x" },
      ],
    },
  ];

  it("追加・変更した行の検出だけを残し、既存行の検出は落とす", () => {
    const added = new Map([["client/src/pages/A.tsx", new Set([9])]]);
    const picked = pickViolations(results, added, ROOT) as Violation[];
    expect(picked.map((v) => [v.line, v.severity])).toEqual([
      [9, "error"],
      [9, "warn"],
    ]);
  });

  it("差分に無いファイルの検出は拾わない", () => {
    const added = new Map([["client/src/pages/B.tsx", new Set([3, 9])]]);
    expect(pickViolations(results, added, ROOT)).toEqual([]);
  });
});

describe("severityOf", () => {
  it("メッセージ先頭の重大度を読む。読めないものは落とす側に倒す", () => {
    expect(severityOf("[warn] metaphor/otoshiana: x")).toBe("warn");
    expect(severityOf("[error] formatting/jp-en-space: x")).toBe("error");
    expect(severityOf("形式の違うメッセージ")).toBe("error");
  });
});

describe("isTarget", () => {
  it("生成物とロックファイルは検査しない", () => {
    expect(isTarget("client/src/data/sources.generated.ts")).toBe(false);
    expect(isTarget("pnpm-lock.yaml")).toBe(false);
    expect(isTarget("client/src/data/sources.ts")).toBe(true);
    expect(isTarget("client/public/logo.svg")).toBe(false);
  });
});

describe("textlintの設定", () => {
  // 悪い例をそのまま書くと、このファイル自身が検査に掛かる。実行時に組み立てる
  const BAD = ["Claude Code", "の設定を", "3", "分で終わらせます。"].join(" ");
  const GOOD = "Claude Codeの設定を3分で終わらせます。";

  it(".md以外の対象拡張子が.textlintrc.jsonにも登録されている", () => {
    const rc = JSON.parse(
      readFileSync(path.join(ROOT, ".textlintrc.json"), "utf8"),
    ) as { plugins: { "@textlint/text": { extensions: string[] } } };
    const registered = rc.plugins["@textlint/text"].extensions;
    const missing = (TARGET_EXTENSIONS as string[]).filter(
      (ext) => ext !== ".md" && !registered.includes(ext),
    );
    expect(missing).toEqual([]);
  });

  it("対象の拡張子すべてで、和欧間のスペースをerrorとして検出する", async () => {
    const linter = await createProseLinter();
    for (const ext of TARGET_EXTENSIONS as string[]) {
      const bad = await linter.lintText(`${BAD}\n`, `sample${ext}`);
      const errors = bad.messages.filter(
        (m: { message: string }) =>
          severityOf(m.message) === "error" &&
          m.message.includes("formatting/jp-en-space"),
      );
      expect(errors.length, `${ext}で検出できない`).toBeGreaterThan(0);
      const good = await linter.lintText(`${GOOD}\n`, `sample${ext}`);
      expect(good.messages, `${ext}で誤検出した`).toEqual([]);
    }
  }, 30_000);
});
