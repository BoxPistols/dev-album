import { describe, it, expect } from "vitest";
import {
  manuals,
  sections,
  pages,
  getPageByPath,
  getNextPage,
  getPreviousPage,
  getManualPages,
  getManualSections,
  getManualIdFromPath,
  getSectionPages,
  getNextSectionFirstPage,
  getPrevSectionFirstPage,
  parts,
  getSectionsByPart,
  type ManualId,
} from "./navigation";

describe("navigation データ整合性", () => {
  it("全マニュアルが定義されている", () => {
    const ids = manuals.map((m) => m.id);
    expect(ids).toEqual([
      "learning",
      "git",
      "react",
      "claude-code",
      "threejs",
      "ai-ml",
      "ux-design",
      "api",
      "vue",
      "infra",
      "devflow",
    ]);
  });

  it("総ページ数", () => {
    expect(pages.length).toBe(350);
  });

  it("マニュアル別ページ数", () => {
    expect(getManualPages("learning").length).toBe(10);
    expect(getManualPages("react").length).toBe(82);
    expect(getManualPages("git").length).toBe(43);
    expect(getManualPages("threejs").length).toBe(23);
    expect(getManualPages("claude-code").length).toBe(48);
    expect(getManualPages("ai-ml").length).toBe(11);
    expect(getManualPages("ux-design").length).toBe(15);
    expect(getManualPages("api").length).toBe(41);
    expect(getManualPages("vue").length).toBe(22);
    expect(getManualPages("infra").length).toBe(34);
    expect(getManualPages("devflow").length).toBe(21);
  });

  it("全ページのパスがマニュアルプレフィックスで始まる", () => {
    for (const page of pages) {
      expect(page.path).toMatch(
        new RegExp(`^/${page.manualId}/|^/${page.manualId}$`),
      );
    }
  });

  it("全ページのパスが一意", () => {
    const paths = pages.map((p) => p.path);
    const unique = new Set(paths);
    expect(unique.size).toBe(paths.length);
  });

  it("全ページの sectionId が sections に存在する", () => {
    const sectionIds = new Set(sections.map((s) => s.id));
    for (const page of pages) {
      expect(sectionIds.has(page.sectionId)).toBe(true);
    }
  });

  it("すべてのマニュアルがパスから引ける", () => {
    // ここが漏れると、ページは出るのにサイドバーのセクションナビとテーマ色が
    // 効かない状態になる。追加したマニュアルを黙って取りこぼさないための検査
    for (const m of manuals) {
      expect(getManualIdFromPath(`/${m.id}`), m.id).toBe(m.id);
      expect(getManualIdFromPath(`/${m.id}/any/page`), m.id).toBe(m.id);
    }
  });

  it("マニュアル ID の前方一致で誤判定しない", () => {
    expect(getManualIdFromPath("/react-native/foo")).toBeUndefined();
    expect(getManualIdFromPath("/")).toBeUndefined();
    expect(getManualIdFromPath("/training")).toBeUndefined();
  });

  it("全セクションの manualId が有効", () => {
    const validIds: ManualId[] = [
      "learning",
      "react",
      "git",
      "threejs",
      "claude-code",
      "ai-ml",
      "ux-design",
      "api",
      "vue",
      "infra",
      "devflow",
    ];
    for (const section of sections) {
      expect(validIds).toContain(section.manualId);
    }
  });

  it("各マニュアルのステップ番号が1から連番", () => {
    for (const manual of manuals) {
      const manualPages = getManualPages(manual.id);
      manualPages.forEach((page, i) => {
        expect(page.step).toBe(i + 1);
      });
    }
  });
});

describe("getPageByPath", () => {
  it("存在するパスでページを返す", () => {
    const page = getPageByPath("/react");
    expect(page).toBeDefined();
    expect(page!.manualId).toBe("react");
  });

  it("存在しないパスで undefined を返す", () => {
    expect(getPageByPath("/nonexistent")).toBeUndefined();
  });

  it("各マニュアルのホームページを取得できる", () => {
    for (const manual of manuals) {
      const page = getPageByPath(`/${manual.id}`);
      expect(page).toBeDefined();
      expect(page!.step).toBe(1);
    }
  });
});

describe("getNextPage / getPreviousPage", () => {
  it("最初のページの前ページは undefined", () => {
    expect(getPreviousPage("/react")).toBeUndefined();
  });

  it("最後のページの次ページは undefined", () => {
    const reactPages = getManualPages("react");
    const lastPage = reactPages[reactPages.length - 1];
    expect(getNextPage(lastPage.path)).toBeUndefined();
  });

  it("次ページと前ページが双方向で一致する", () => {
    const page = getPageByPath("/react/react-basics/jsx");
    expect(page).toBeDefined();
    const next = getNextPage(page!.path);
    expect(next).toBeDefined();
    const backToOriginal = getPreviousPage(next!.path);
    expect(backToOriginal!.path).toBe(page!.path);
  });

  it("マニュアルをまたがない", () => {
    const gitPages = getManualPages("git");
    const lastGitPage = gitPages[gitPages.length - 1];
    expect(getNextPage(lastGitPage.path)).toBeUndefined();
  });
});

describe("getManualIdFromPath", () => {
  it("各マニュアルパスを正しく判定", () => {
    expect(getManualIdFromPath("/react/intro/setup")).toBe("react");
    expect(getManualIdFromPath("/git/environment/prerequisites")).toBe("git");
    expect(getManualIdFromPath("/threejs/basics/scene")).toBe("threejs");
    expect(getManualIdFromPath("/claude-code")).toBe("claude-code");
  });

  it("不明なパスで undefined を返す", () => {
    expect(getManualIdFromPath("/unknown/path")).toBeUndefined();
    expect(getManualIdFromPath("/")).toBeUndefined();
  });
});

describe("getManualSections", () => {
  it("各マニュアルのセクションを取得", () => {
    expect(getManualSections("react").length).toBeGreaterThan(0);
    expect(getManualSections("git").length).toBeGreaterThan(0);
    expect(getManualSections("threejs").length).toBeGreaterThan(0);
    expect(getManualSections("claude-code").length).toBeGreaterThan(0);
  });

  it("セクションが正しいマニュアルに属する", () => {
    for (const manual of manuals) {
      const secs = getManualSections(manual.id);
      for (const sec of secs) {
        expect(sec.manualId).toBe(manual.id);
      }
    }
  });
});

describe("getSectionPages", () => {
  it("セクションに属するページを取得", () => {
    const reactBasicsPages = getSectionPages("react-basics");
    expect(reactBasicsPages.length).toBeGreaterThan(0);
    for (const p of reactBasicsPages) {
      expect(p.sectionId).toBe("react-basics");
    }
  });
});

describe("セクションナビゲーション", () => {
  it("次のセクションの最初のページを取得", () => {
    const next = getNextSectionFirstPage("/react/react-basics/components");
    expect(next).toBeDefined();
    expect(next!.sectionId).toBe("state-events");
  });

  it("前のセクションの最初のページを取得", () => {
    const prev = getPrevSectionFirstPage("/react/state-events/use-state");
    expect(prev).toBeDefined();
    expect(prev!.sectionId).toBe("react-basics");
  });
});

describe("claude-code パート", () => {
  it("parts が定義されている", () => {
    expect(parts.length).toBe(2);
    expect(parts.map((p) => p.id)).toEqual(["basic", "advanced"]);
  });

  it("getSectionsByPart でセクションを取得", () => {
    const basic = getSectionsByPart("basic");
    const advanced = getSectionsByPart("advanced");
    expect(basic.length).toBeGreaterThan(0);
    expect(advanced.length).toBeGreaterThan(0);
    for (const s of basic) {
      expect(s.part).toBe("basic");
    }
    for (const s of advanced) {
      expect(s.part).toBe("advanced");
    }
  });
});
