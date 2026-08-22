import { buildSeo, OG_IMAGE } from "./seo";

/**
 * ビルド済み index.html の <head> をルート固有の値に差し替える純関数。
 * DOM もファイルシステムも触らないので、vite プラグイン（ビルド時）と vitest（検証）が同じ関数を使える。
 * useSeo（クライアント側）は既存タグを探して content を更新するだけなので、ここで焼き込んだタグと二重にならない。
 */

export const JSON_LD_ID = "seo-json-ld";

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** `<meta name|property="key" ... content="...">` の content を差し替える。無ければ </head> の前に足す */
function setMetaTag(
  html: string,
  attr: "name" | "property",
  key: string,
  content: string,
): string {
  const tag = new RegExp(`<meta\\s+${attr}="${key}"[^>]*>`);
  const value = escapeAttr(content);
  if (tag.test(html)) {
    return html.replace(tag, (m) =>
      /content="[^"]*"/.test(m)
        ? m.replace(/content="[^"]*"/, `content="${value}"`)
        : m.replace(/\s*\/?>$/, ` content="${value}" />`),
    );
  }
  return html.replace(
    "</head>",
    `    <meta ${attr}="${key}" content="${value}" />\n  </head>`,
  );
}

function setLinkTag(html: string, rel: string, href: string): string {
  const tag = new RegExp(`<link\\s+rel="${rel}"[^>]*>`);
  const value = escapeAttr(href);
  if (tag.test(html)) {
    return html.replace(tag, (m) =>
      m.replace(/href="[^"]*"/, `href="${value}"`),
    );
  }
  return html.replace(
    "</head>",
    `    <link rel="${rel}" href="${value}" />\n  </head>`,
  );
}

function setJsonLd(html: string, data: Record<string, unknown>): string {
  // </script> で閉じられないよう < をエスケープする（JSON としては同値）
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  const script = `<script type="application/ld+json" id="${JSON_LD_ID}">${json}</script>`;
  const existing = new RegExp(
    `<script[^>]*id="${JSON_LD_ID}"[^>]*>[\\s\\S]*?</script>`,
  );
  if (existing.test(html)) return html.replace(existing, script);
  return html.replace("</head>", `    ${script}\n  </head>`);
}

/** template（ビルド済み index.html）を path 用の <head> に書き換えた HTML を返す */
export function renderRouteHtml(template: string, path: string): string {
  const meta = buildSeo(path);
  let html = template.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeText(meta.title)}</title>`,
  );
  html = setMetaTag(html, "name", "description", meta.description);
  html = setMetaTag(
    html,
    "name",
    "robots",
    meta.noindex ? "noindex, nofollow" : "index, follow",
  );
  html = setLinkTag(html, "canonical", meta.canonical);
  html = setMetaTag(html, "property", "og:title", meta.title);
  html = setMetaTag(html, "property", "og:description", meta.description);
  html = setMetaTag(html, "property", "og:url", meta.canonical);
  html = setMetaTag(html, "property", "og:image", OG_IMAGE);
  html = setMetaTag(html, "property", "og:image:alt", meta.title);
  html = setMetaTag(html, "name", "twitter:title", meta.title);
  html = setMetaTag(html, "name", "twitter:description", meta.description);
  html = setMetaTag(html, "name", "twitter:image", OG_IMAGE);
  html = setJsonLd(html, meta.jsonLd);
  return html;
}

/** ルートに対応する出力ファイルの相対パス。"/" は index.html そのもの */
export function routeToOutputFile(path: string): string {
  if (path === "/") return "index.html";
  return `${path.replace(/^\//, "")}/index.html`;
}
