import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { renderRobots, renderSitemap } from "./client/src/lib/seo";

/**
 * navigation.ts を正本に sitemap.xml / robots.txt を生成する。
 * ビルドでは outDir に書き出し、dev では同じ内容をその場で返す（手で同期するファイルを作らない）。
 */
export function seoPlugin(): Plugin {
  let config: ResolvedConfig;
  // ビルド日時は 1 回のビルドで固定する（URL ごとにずれない）
  const lastmod = new Date().toISOString().slice(0, 10);

  return {
    name: "seo-sitemap",
    configResolved(c) {
      config = c;
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/sitemap.xml") {
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
          res.end(renderSitemap(lastmod));
          return;
        }
        if (req.url === "/robots.txt") {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(renderRobots());
          return;
        }
        next();
      });
    },
    closeBundle() {
      if (config.command !== "build") return;
      const outDir = resolve(config.root, config.build.outDir);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(resolve(outDir, "sitemap.xml"), renderSitemap(lastmod));
      writeFileSync(resolve(outDir, "robots.txt"), renderRobots());
    },
  };
}
