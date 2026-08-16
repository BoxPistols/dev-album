import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-vite";

// このファイルからの相対で解決する。絶対パスを書くと、リポジトリを移動した
// 環境や他人のマシンでビルドが落ちる（実際に別リポジトリのパスが残っていた）
const HERE = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../client/src/**/*.stories.@(ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: (config) => {
    // プロジェクトの vite.config.ts と同じ alias を適用
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve(HERE, "../client/src"),
      "@shared": resolve(HERE, "../shared"),
    };
    return config;
  },
};

export default config;
