import {
  getManualById,
  getPageByPath,
  manuals,
  pages,
  sections,
} from "./navigation";

/**
 * ページ単位の SEO メタを navigation.ts から導出する純関数群。
 * DOM には触れない（適用は useSeo が担う）ので、ビルド時の sitemap 生成と
 * ブラウザ側の <head> 更新が同じ正本を使える。
 */

export const SITE_ORIGIN = "https://dev-album.vercel.app";
export const SITE_NAME = "Dev Album";
export const SITE_TAGLINE = "Web 開発の実践リファレンス";
export const SITE_DESCRIPTION =
  "Git・React・Claude Code・Three.js から AI・ML、UX デザイン、API 設計、Vue / Nuxt、インフラ、開発フローまでを、Web 標準とアクセシビリティの観点を含めて解説する技術マニュアル。";
export const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

/** navigation.ts に載らない単独ページ。sitemap とメタの両方に使う */
export const STATIC_ROUTES: ReadonlyArray<{
  path: string;
  title: string;
  description: string;
}> = [
  {
    path: "/",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  {
    path: "/announcements",
    title: "お知らせ",
    description: "教材の追加・更新・修正の履歴。カテゴリと年月で絞り込めます。",
  },
  {
    path: "/training",
    title: "UI トレーニング",
    description:
      "Table / Dialog / Form などの UI をコードを書きながら設計する練習問題。",
  },
  {
    path: "/bug-report",
    title: "バグ報告",
    description: "教材の誤りや動作不良を報告するフォーム。",
  },
  {
    path: "/policy/chat-quota",
    title: "チャット AI の利用枠について",
    description:
      "チャット AI の利用枠・リセット時刻・招待コードの扱いを説明します。",
  },
  {
    path: "/policy/privacy",
    title: "プライバシーポリシー",
    description: "Dev Album が扱うデータとその保存先・利用目的を説明します。",
  },
];

export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  /** 検索結果に出さないページ（フォーム等）は true */
  noindex: boolean;
  /** JSON-LD（@graph 形式で 1 本にまとめる） */
  jsonLd: Record<string, unknown>;
}

const NOINDEX_PATHS = new Set(["/bug-report"]);

/** 末尾スラッシュと query/hash を落として正規化する */
export function normalizePath(path: string): string {
  const clean = path.split(/[?#]/)[0];
  if (clean.length > 1 && clean.endsWith("/")) return clean.slice(0, -1);
  return clean || "/";
}

export function toCanonical(path: string): string {
  return `${SITE_ORIGIN}${normalizePath(path)}`;
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    url: `${SITE_ORIGIN}/`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "ja",
  };
}

function breadcrumb(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: toCanonical(item.path),
    })),
  };
}

/** 現在のパスから SEO メタを組み立てる。未知のパスはサイト既定にフォールバック */
export function buildSeo(rawPath: string): SeoMeta {
  const path = normalizePath(rawPath);
  const canonical = toCanonical(path);
  const noindex = NOINDEX_PATHS.has(path);

  const page = getPageByPath(path);
  if (page) {
    const manual = getManualById(page.manualId);
    const section = sections.find((s) => s.id === page.sectionId);
    const manualTitle = manual?.shortTitle ?? page.manualId;
    const manualPath = `/${page.manualId}`;
    const isManualHome = path === manualPath;

    const title = isManualHome
      ? `${manual?.title ?? manualTitle} | ${SITE_NAME}`
      : `${page.title} | ${manualTitle} | ${SITE_NAME}`;
    // 説明は「ページ名 — セクション名 — マニュアル説明」で一意にし、検索結果で内容が分かる長さに収める
    const description = isManualHome
      ? `${manual?.description ?? ""}。${SITE_NAME} の ${manualTitle} マニュアル。`
      : `${manualTitle} マニュアル「${section?.title ?? ""}」の「${page.title}」。${section?.description ?? manual?.description ?? ""}`.replace(
          /。$/,
          "",
        ) + "。";

    const crumbs = [
      { name: SITE_NAME, path: "/" },
      { name: manualTitle, path: manualPath },
    ];
    if (!isManualHome) crumbs.push({ name: page.title, path });

    return {
      title,
      description,
      canonical,
      noindex,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          websiteNode(),
          breadcrumb(crumbs),
          {
            "@type": "TechArticle",
            "@id": `${canonical}#article`,
            headline: isManualHome
              ? (manual?.title ?? manualTitle)
              : page.title,
            description,
            url: canonical,
            inLanguage: "ja",
            isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
            articleSection: section?.title,
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              url: `${SITE_ORIGIN}/`,
            },
          },
        ],
      },
    };
  }

  const fixed = STATIC_ROUTES.find((r) => r.path === path);
  if (fixed) {
    const isHome = path === "/";
    return {
      title: isHome ? fixed.title : `${fixed.title} | ${SITE_NAME}`,
      description: fixed.description,
      canonical,
      noindex,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": isHome
          ? [websiteNode()]
          : [
              websiteNode(),
              breadcrumb([
                { name: SITE_NAME, path: "/" },
                { name: fixed.title, path },
              ]),
            ],
      },
    };
  }

  // 未知のパス（Redirect 経由・404 等）: サイト既定を返し、誤った canonical を出さないよう noindex
  return {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    canonical: `${SITE_ORIGIN}/`,
    noindex: true,
    jsonLd: { "@context": "https://schema.org", "@graph": [websiteNode()] },
  };
}

/** sitemap に載せる全パス（静的ページ + 教材ページ）。マニュアル TOP は pages 側に含まれる */
export function listIndexablePaths(): string[] {
  const fromPages = pages.map((p) => p.path);
  const fromStatic = STATIC_ROUTES.map((r) => r.path);
  const manualHomes = manuals.map((m) => `/${m.id}`);
  return Array.from(
    new Set([...fromStatic, ...manualHomes, ...fromPages]),
  ).filter((p) => !NOINDEX_PATHS.has(p));
}

/** prerender する全パス。noindex のページも含む（noindex のメタを HTML に焼き込む必要があるため） */
export function listPrerenderPaths(): string[] {
  const fromPages = pages.map((p) => p.path);
  const fromStatic = STATIC_ROUTES.map((r) => r.path);
  const manualHomes = manuals.map((m) => `/${m.id}`);
  return Array.from(new Set([...fromStatic, ...manualHomes, ...fromPages]));
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** sitemap.xml の本文。lastmod はビルド日時（ページ単位の更新日は持たないため） */
export function renderSitemap(lastmod: string): string {
  const urls = listIndexablePaths()
    .map((p) => {
      const priority =
        p === "/" ? "1.0" : p.split("/").length <= 2 ? "0.8" : "0.6";
      return `  <url>\n    <loc>${escapeXml(toCanonical(p))}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function renderRobots(): string {
  return [
    "User-agent: *",
    "Allow: /",
    ...Array.from(NOINDEX_PATHS).map((p) => `Disallow: ${p}`),
    "Disallow: /api/",
    "",
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    "",
  ].join("\n");
}
