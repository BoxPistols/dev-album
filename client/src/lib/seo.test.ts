import { describe, it, expect } from "vitest";
import { pages, manuals } from "./navigation";
import { buildSeo, listIndexablePaths, renderRobots, renderSitemap, SITE_ORIGIN, STATIC_ROUTES } from "./seo";

describe("seo メタの導出", () => {
  it("全教材ページで title / description / canonical が一意に決まる", () => {
    const titles = new Set<string>();
    const canonicals = new Set<string>();
    for (const p of pages) {
      const m = buildSeo(p.path);
      expect(m.title, p.path).toContain(p.title.length > 0 ? "Dev Album" : "");
      expect(m.description.length, p.path).toBeGreaterThan(20);
      expect(m.description.length, p.path).toBeLessThan(200);
      expect(m.canonical).toBe(`${SITE_ORIGIN}${p.path}`);
      expect(m.noindex).toBe(false);
      titles.add(m.title);
      canonicals.add(m.canonical);
    }
    expect(canonicals.size).toBe(pages.length);
    expect(titles.size).toBe(pages.length);
  });

  it("マニュアル TOP はマニュアル名を title にし、パンくずが 2 段になる", () => {
    for (const m of manuals) {
      const meta = buildSeo(`/${m.id}`);
      expect(meta.title).toContain(m.title);
      const graph = meta.jsonLd["@graph"] as Array<{ "@type": string; itemListElement?: unknown[] }>;
      const crumbs = graph.find((n) => n["@type"] === "BreadcrumbList");
      expect(crumbs?.itemListElement).toHaveLength(2);
    }
  });

  it("末尾スラッシュ・query・hash を canonical から落とす", () => {
    expect(buildSeo("/git/?x=1#top").canonical).toBe(`${SITE_ORIGIN}/git`);
  });

  it("未知のパスは noindex でサイト既定を返す", () => {
    const m = buildSeo("/no-such-page");
    expect(m.noindex).toBe(true);
    expect(m.canonical).toBe(`${SITE_ORIGIN}/`);
  });

  it("静的ページは STATIC_ROUTES の説明を使う", () => {
    for (const r of STATIC_ROUTES) {
      expect(buildSeo(r.path).description).toBe(r.description);
    }
  });
});

describe("sitemap / robots", () => {
  it("sitemap に全教材ページと静的ページが載り、noindex ページは載らない", () => {
    const xml = renderSitemap("2026-01-01");
    for (const p of pages) expect(xml).toContain(`<loc>${SITE_ORIGIN}${p.path}</loc>`);
    expect(xml).toContain(`<loc>${SITE_ORIGIN}/</loc>`);
    expect(xml).not.toContain("/bug-report");
    expect(listIndexablePaths().length).toBeGreaterThan(pages.length);
    // 重複 URL なし
    const locs = xml.match(/<loc>[^<]+<\/loc>/g) ?? [];
    expect(new Set(locs).size).toBe(locs.length);
  });

  it("robots.txt が sitemap を指し、API とフォームを除外する", () => {
    const txt = renderRobots();
    expect(txt).toContain(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`);
    expect(txt).toContain("Disallow: /api/");
    expect(txt).toContain("Disallow: /bug-report");
  });
});
