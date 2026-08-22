import "../client/src/index.css";

import React, { useEffect } from "react";
import { useGlobals } from "storybook/preview-api";
import { ThemeProvider } from "../client/src/contexts/ThemeContext";

import type { Preview, Decorator } from "@storybook/react-vite";

/**
 * ThemeProvider decorator — Storybook のツールバーでライト/ダーク切替
 */
const withTheme: Decorator = (Story, context) => {
  const [globals] = useGlobals();
  const theme = globals["theme"] || "light";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeProvider defaultTheme={theme}>
      <div className={`bg-background text-foreground min-h-[100px] p-4`}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    a11y: {
      // "error": axe の違反を story のテスト失敗として扱う（pnpm test:storybook）。
      // "todo" にすると警告どまりになるので、既定は error のままにする
      test: "error",
    },
  },
  globalTypes: {
    theme: {
      description: "テーマ切替",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
};

export default preview;
