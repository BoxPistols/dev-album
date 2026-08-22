import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { JSON_LD_ID, renderRouteHtml, routeToOutputFile } from "./prerender";
import { buildSeo, listPrerenderPaths, SITE_ORIGIN } from "./seo";

// ビルド前の index.html をそのままテンプレートに使う（ビルド後との差はアセットのパスだけ）
const template = readFileSync(
  resolve(import.meta.dirname, "../../index.html"),
  "utf8",
);

function pick(html: string, re: RegExp): string {
  const m = html.match(re);
  if (!m) throw new Error(`not found: ${re}`);
  return m[1];
}

const TITLE = /<title>([^<]*)<\/title>/;
const OG_URL = /<meta property="og:url" content="([^"]*)"/;
const CANONICAL = /<link rel="canonical" href="([^"]*)"/;
const ROBOTS = /<meta name="robots" content="([^"]*)"/;
const DESCRIPTION = /<meta\s+name="description"[^>]*content="([^"]*)"/;

describe("ルート別 <head> の prerender", () => {
  const routes = ["/", "/learning/sources/search-technique", "/bug-report"];

  it("title / canonical / og:url がルートごとに一致し、ルート間で異なる", () => {
    const seen = new Set<string>();
    for (const route of routes) {
      const html = renderRouteHtml(template, route);
      const meta = buildSeo(route);
      expect(pick(html, TITLE), route).toBe(meta.title);
      expect(pick(html, OG_URL), route).toBe(`${SITE_ORIGIN}${route}`);
      expect(pick(html, CANONICAL), route).toBe(`${SITE_ORIGIN}${route}`);
      expect(pick(html, DESCRIPTION), route).toBe(meta.description);
      seen.add(pick(html, TITLE) + pick(html, OG_URL));
    }
    expect(seen.size).toBe(routes.length);
  });

  it("noindex のルートだけ robots が noindex になる", () => {
    expect(pick(renderRouteHtml(template, "/bug-report"), ROBOTS)).toBe(
      "noindex, nofollow",
    );
    expect(pick(renderRouteHtml(template, "/"), ROBOTS)).toBe("index, follow");
  });

  it("タグを置き換えるだけで増やさない（useSeo が二重に持たないため）", () => {
    const html = renderRouteHtml(template, "/git");
    const count = (re: RegExp) => (html.match(re) ?? []).length;
    expect(count(/<title>/g)).toBe(1);
    expect(count(/<link rel="canonical"/g)).toBe(1);
    expect(count(/property="og:url"/g)).toBe(1);
    expect(count(/name="description"/g)).toBe(1);
    expect(count(new RegExp(`id="${JSON_LD_ID}"`, "g"))).toBe(1);
    // JSON-LD は同じ関数の出力と一致し、</script> で閉じられない
    const json = pick(
      html,
      new RegExp(`id="${JSON_LD_ID}">([\\s\\S]*?)</script>`),
    );
    expect(JSON.parse(json)).toEqual(buildSeo("/git").jsonLd);
    expect(json).not.toContain("</");
  });

  it("テンプレートと同じ実体（アセット参照）を保ち、ルート外のパスは変換で壊れない", () => {
    const html = renderRouteHtml(template, "/react");
    expect(html).toContain('<div id="root"></div>');
    expect(html).toContain('src="/src/main.tsx"');
  });

  it("全 prerender パスで title が一意、出力先が衝突しない", () => {
    const paths = listPrerenderPaths();
    const files = new Set(paths.map(routeToOutputFile));
    expect(files.size).toBe(paths.length);
    expect(routeToOutputFile("/")).toBe("index.html");
    expect(routeToOutputFile("/learning/sources/search-technique")).toBe(
      "learning/sources/search-technique/index.html",
    );
    const titles = new Set(
      paths.map((p) => pick(renderRouteHtml(template, p), TITLE)),
    );
    expect(titles.size).toBe(paths.length);
  });
});
