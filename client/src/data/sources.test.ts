import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { SOURCES, getSourcesForPage, type Source } from "./sources";
import { pages } from "../lib/navigation";

// ネットワークを使わない決定的チェックだけをここに置く。
// 実際に URL を取得して引用を照合するのは scripts/verify-sources.mjs（pnpm check:sources）。

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

describe("出典レジストリ", () => {
  it("空ではない（空でも緑になる検査にしない）", () => {
    expect(SOURCES.length).toBeGreaterThanOrEqual(9);
  });

  it("id は kebab-case で重複しない", () => {
    const ids = SOURCES.map((s) => s.id);
    for (const id of ids) {
      expect(id, `${id} は kebab-case ではない`).toMatch(ID_PATTERN);
    }
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("verifiedAt は YYYY-MM-DD で、未来日ではない", () => {
    // タイムゾーン差で 1 日ぶんの前後は正常に起こる（JST の当日は UTC ではまだ前日）。
    // 偽の失敗を作らないため 1 日の余裕を持たせる。捕まえたいのは年単位の誤りのほう。
    const limit = new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    for (const s of SOURCES) {
      expect(s.verifiedAt, `${s.id}`).toMatch(DATE_PATTERN);
      expect(
        s.verifiedAt <= limit,
        `${s.id} の verifiedAt (${s.verifiedAt}) が未来日`,
      ).toBe(true);
    }
  });

  it("measured 以外は https の url を持つ", () => {
    for (const s of SOURCES) {
      if (s.kind === "measured") continue;
      expect(s.url, `${s.id} に url がない`).toBeDefined();
      expect(s.url, `${s.id} の url が https でない`).toMatch(/^https:\/\//);
    }
  });

  it("measured は再現コマンドを必ず持つ（再現できないものを実測と呼ばせない）", () => {
    const measured = SOURCES.filter((s) => s.kind === "measured");
    expect(measured.length).toBeGreaterThan(0);
    for (const s of measured) {
      expect(s.reproduce, `${s.id} に reproduce がない`).toBeTruthy();
      expect(s.reproduce!.length).toBeGreaterThan(20);
    }
  });

  it("secondary は信頼の根拠を note に持つ", () => {
    for (const s of SOURCES.filter((x) => x.kind === "secondary")) {
      expect(s.note, `${s.id} に note がない`).toBeTruthy();
    }
  });

  it("quotes は url を持つ出典にだけ付く", () => {
    for (const s of SOURCES) {
      if (!s.quotes?.length) continue;
      expect(
        s.url,
        `${s.id} は quotes を持つのに照合先 url がない`,
      ).toBeDefined();
    }
  });

  it("quotes に空文字や極端に短い断片を入れない（誤って一致するため）", () => {
    for (const s of SOURCES) {
      for (const q of s.quotes ?? []) {
        expect(q.trim(), `${s.id} に空の引用がある`).not.toBe("");
        expect(
          q.trim().length,
          `${s.id} の引用「${q}」が短すぎる`,
        ).toBeGreaterThanOrEqual(20);
      }
    }
  });

  it("公式系の出典は少なくとも 1 つ逐語引用を持つ", () => {
    const officialKinds: Source["kind"][] = [
      "official-docs",
      "official-repo",
      "official-post",
      "standard",
    ];
    const official = SOURCES.filter((s) => officialKinds.includes(s.kind));
    expect(official.length).toBeGreaterThan(0);
    for (const s of official) {
      expect(
        s.quotes?.length ?? 0,
        `${s.id} は公式出典なのに逐語引用がない`,
      ).toBeGreaterThan(0);
    }
  });

  it("どの出典も、依拠しているページかファイルを必ず指している", () => {
    for (const s of SOURCES) {
      const n = (s.usedBy?.length ?? 0) + (s.usedByFiles?.length ?? 0);
      expect(n, `${s.id} が usedBy / usedByFiles のどちらも持たない`).toBeGreaterThan(
        0,
      );
    }
  });

  it("usedBy のパスはすべて navigation.ts に実在する", () => {
    const known = new Set(pages.map((p) => p.path));
    for (const s of SOURCES) {
      for (const path of s.usedBy ?? []) {
        expect(
          known.has(path),
          `${s.id} が存在しないパス ${path} を指している`,
        ).toBe(true);
      }
    }
  });

  it("usedByFiles のファイルはすべて実在する", () => {
    // 監査から機械生成した分。ページが消えたのに出典だけ残る状態を検知する
    for (const s of SOURCES) {
      for (const f of s.usedByFiles ?? []) {
        expect(existsSync(resolve(REPO_ROOT, f)), `${s.id} が指す ${f} が無い`).toBe(
          true,
        );
      }
    }
  });

  it("getSourcesForPage が該当ページの出典を返す", () => {
    const found = getSourcesForPage("/claude-code/multi-ai/design-md");
    expect(found.length).toBeGreaterThan(0);
    expect(
      found.every((s) => s.usedBy?.includes("/claude-code/multi-ai/design-md")),
    ).toBe(true);
    expect(getSourcesForPage("/does/not/exist")).toHaveLength(0);
  });
});
