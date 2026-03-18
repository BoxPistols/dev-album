import type { StorybookConfig } from "@storybook/react-vite";

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
      "@": "/Users/ai/dev/26Apps/unified-manual/client/src",
      "@shared": "/Users/ai/dev/26Apps/unified-manual/shared",
    };
    return config;
  },
};

export default config;
