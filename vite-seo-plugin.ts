import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { renderRouteHtml, routeToOutputFile } from "./client/src/lib/prerender";
import {
  listPrerenderPaths,
  renderRobots,
  renderSitemap,
} from "./client/src/lib/seo";

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

      // ルートごとに <head> を焼き込んだ index.html を dist/public/<route>/index.html に置く。
      // JS を実行しないクローラーにもページ固有の title / canonical / OGP が届くようにする（SSR はしない）。
      // 本体は index.html のままで、/ だけはその場で書き換える。
      const template = readFileSync(resolve(outDir, "index.html"), "utf8");
      const started = Date.now();
      const paths = listPrerenderPaths();
      for (const path of paths) {
        const file = resolve(outDir, routeToOutputFile(path));
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, renderRouteHtml(template, path));
      }
      config.logger.info(
        `[seo] prerendered <head> for ${paths.length} routes in ${Date.now() - started}ms`,
      );
    },
  };
}
