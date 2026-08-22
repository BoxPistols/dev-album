import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";
import { defineConfig } from "vitest/config";

const HERE = import.meta.dirname;

// story を 1 件ずつ chromium で描画し、addon-a11y の検査（.storybook/preview.tsx の
// parameters.a11y.test）を通す。違反があればテストとして失敗する。
//
// vite.config.ts の test.projects に相乗りさせていない。同じ設定ファイルに置くと
// `--project unit` で絞っても storybook 側の設定解決（.storybook/main.ts と
// framework preset の読み込み）が毎回走り、jsdom だけの unit 実行が実測で
// 4.7 秒 → 7.2 秒になった。ブラウザを起動する検査は設定ごと分ける。
//
// vite.config.ts を `extends` で継承する手もあるが、継承では配列が連結されるため
// unit 用の `setupFiles: ["./src/test/setup.ts"]`（この設定ファイルからはルート基準で
// 解決され、存在しないパスになる）を外せない。必要なプラグインだけを明示する。
export default defineConfig({
  plugins: [
    // JSX の automatic runtime。無いと全 story が "React is not defined" で落ちる
    react(),
    // index.css の @import "tailwindcss" を解決する。無いとクラスが無効化され、
    // コントラスト検査が実際の配色とは別のものを見ることになる
    tailwindcss(),
    storybookTest({ configDir: path.resolve(HERE, ".storybook") }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(HERE, "client", "src"),
      "@shared": path.resolve(HERE, "shared"),
    },
  },
  test: {
    name: "storybook",
    // vite.config.ts の root が client なので、既定のままだと story を 1 件も
    // 拾わない。vitest は対象 0 件を失敗として扱うため、取りこぼしたときは
    // 緑ではなく赤で分かる
    dir: path.resolve(HERE, "client"),
    setupFiles: [path.resolve(HERE, "client", "src", "test", "setup.ts")],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
});
