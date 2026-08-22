import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { apiDevPlugin } from "./vite-api-plugin";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    apiDevPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Dev Album — Web 開発の実践リファレンス",
        short_name: "Dev Album",
        description:
          "Git・React・Claude Code・Three.js から AI・ML、UX デザイン、API 設計、Vue / Nuxt、インフラ、開発フローまでを、Web 標準とアクセシビリティの観点を含めて解説する技術マニュアル。",
        // 既定テーマ（Light）の --primary。index.css を変えたらここも合わせる
        theme_color: "#1F5CDB",
        background_color: "#FAFAFA",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // precache はアプリシェル（エントリ + CSS + フォント/アイコン）に限定し、
        // ページチャンクと プレビュー用 vendor UMD はランタイムキャッシュに委ねる
        // （初回訪問で全ページ分 ~12MB を precache していた過剰を解消）
        globPatterns: [
          "**/*.{html,css,svg,woff2}",
          // png は列挙する。`**/*.png` にすると OGP 画像まで入り、クローラーしか
          // 取りに来ないファイルを全訪問者へ precache で配ることになる
          "pwa-192x192.png",
          "pwa-512x512.png",
          "assets/index-*.js",
          "assets/vendor-react-*.js",
        ],
        globIgnores: ["vendor/**"],
        runtimeCaching: [
          {
            // ページチャンク: 一度訪れたページはオフラインでも開ける
            urlPattern: /\/assets\/.+\.js$/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "app-assets",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            // プレビュー用セルフホスト UMD（ファイル名にバージョン入りのため CacheFirst で安全）
            urlPattern: /\/vendor\/.+\.js$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "preview-vendor",
              expiration: {
                maxEntries: 12,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets",
              expiration: { maxEntries: 5 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-three": [
            "three",
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/postprocessing",
          ],
        },
      },
    },
  },
  server: {
    port: Number(process.env.PORT) || 3000,
    strictPort: false,
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
  },
});
