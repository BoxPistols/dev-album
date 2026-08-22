import { useEffect } from "react";
import { useLocation } from "wouter";
import { buildSeo, OG_IMAGE } from "@/lib/seo";

const JSON_LD_ID = "seo-json-ld";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * ルート変更ごとに title / description / canonical / OGP / JSON-LD を <head> へ反映する副作用フック。
 * SPA なので初期 HTML は index.html の既定値、遷移後はここが上書きする。
 * 値の導出は lib/seo.ts（純関数）に寄せ、ここは DOM 反映だけを担う。
 */
export function useSeo() {
  const [location] = useLocation();

  useEffect(() => {
    const meta = buildSeo(location);

    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta(
      "name",
      "robots",
      meta.noindex ? "noindex, nofollow" : "index, follow",
    );
    setLink("canonical", meta.canonical);

    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", meta.canonical);
    setMeta("property", "og:image", OG_IMAGE);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);

    let script = document.getElementById(
      JSON_LD_ID,
    ) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = JSON_LD_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(meta.jsonLd);
  }, [location]);
}
