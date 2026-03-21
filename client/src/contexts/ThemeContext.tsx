import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "system" | "light" | "dark" | "dark-soft";
type ResolvedTheme = "light" | "dark" | "dark-soft";

interface ThemeContextType {
  mode: ThemeMode;
  theme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === "system") return getSystemTheme();
  return mode;
}

function applyThemeClasses(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.remove("dark", "dark-soft");
  if (resolved === "dark") {
    root.classList.add("dark");
  } else if (resolved === "dark-soft") {
    // dark クラスも付与して dark: ユーティリティを有効化
    root.classList.add("dark", "dark-soft");
  }
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem("theme-mode") as ThemeMode | null;
    if (
      stored === "light" ||
      stored === "dark" ||
      stored === "dark-soft" ||
      stored === "system"
    )
      return stored;
    // 旧キーからのマイグレーション
    const legacy = localStorage.getItem("theme");
    if (legacy === "light" || legacy === "dark") return legacy;
    return defaultTheme;
  });

  const [theme, setTheme] = useState<ResolvedTheme>(() => resolveTheme(mode));

  // mode変更時にthemeを更新
  useEffect(() => {
    const resolved = resolveTheme(mode);
    setTheme(resolved);
    applyThemeClasses(resolved);
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  // systemモード時にOS設定変更を監視
  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const resolved = getSystemTheme();
      setTheme(resolved);
      applyThemeClasses(resolved);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => {
      const resolved = resolveTheme(prev);
      if (resolved === "light") return "dark";
      if (resolved === "dark") return "dark-soft";
      return "light";
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, theme, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
