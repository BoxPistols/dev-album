import { describe, it, expect } from "vitest";
import { searchPages, tokenizeQuery } from "./searchPages";
import type { PageInfo } from "./navigation";

const pages: PageInfo[] = [
  {
    step: 1,
    path: "/react/hooks-deep/use-effect",
    title: "useEffect",
    sectionId: "hooks-deep",
    manualId: "react",
  },
  {
    step: 2,
    path: "/react/hooks-deep/use-context",
    title: "useContext",
    sectionId: "hooks-deep",
    manualId: "react",
  },
  {
    step: 3,
    path: "/api/practice/react",
    title: "ReactでのAPI連携",
    sectionId: "practice",
    manualId: "api",
  },
];

const index: Record<string, string[]> = {
  "/react/hooks-deep/use-effect": ["副作用", "クリーンアップ", "依存配列"],
  "/react/hooks-deep/use-context": ["Context", "Provider"],
  "/api/practice/react": ["useEffect", "fetch"],
};

describe("tokenizeQuery", () => {
  it("空白（半角・全角）で分け、前後の空白と空の語を落とす", () => {
    expect(tokenizeQuery("  useEffect　クリーンアップ ")).toEqual([
      "useeffect",
      "クリーンアップ",
    ]);
    expect(tokenizeQuery("   ")).toEqual([]);
  });
});

describe("searchPages", () => {
  it("1語ならタイトルかキーワードの部分一致で当たる（大文字小文字は区別しない）", () => {
    const hits = searchPages(pages, index, "useeffect");
    expect(hits.map((h) => h.page.path)).toEqual([
      "/react/hooks-deep/use-effect",
      "/api/practice/react",
    ]);
  });

  it("2語はANDで絞る", () => {
    const hits = searchPages(
      pages,
      index,
      ["useEffect", "クリーンアップ"].join(" "),
    );
    expect(hits.map((h) => h.page.path)).toEqual([
      "/react/hooks-deep/use-effect",
    ]);
    expect(hits[0].matchedKeywords).toEqual(["クリーンアップ"]);
  });

  it("末尾や先頭の空白で結果が変わらない", () => {
    const plain = searchPages(pages, index, "useEffect");
    const trailing = searchPages(pages, index, "useEffect ");
    expect(trailing).toEqual(plain);
  });

  it("どれかの語が当たらなければ0件", () => {
    expect(
      searchPages(pages, index, ["useEffect", "存在しない語"].join(" ")),
    ).toEqual([]);
  });

  it("空の入力は0件", () => {
    expect(searchPages(pages, index, "")).toEqual([]);
  });
});
