import React, { createContext, useContext, useEffect, useState } from "react";

export type Platform = "mac" | "windows";

interface PlatformContextType {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

interface PlatformProviderProps {
  children: React.ReactNode;
}

export function PlatformProvider({ children }: PlatformProviderProps) {
  const [platform, setPlatformState] = useState<Platform>(() => {
    // 1. LocalStorage から取得
    const stored = localStorage.getItem("platform") as Platform | null;
    if (stored === "mac" || stored === "windows") return stored;

    // 2. ブラウザのユーザーエージェントから判定
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf("win") !== -1) return "windows";
    return "mac"; // デフォルト
  });

  const setPlatform = (newPlatform: Platform) => {
    setPlatformState(newPlatform);
    localStorage.setItem("platform", newPlatform);
  };

  return (
    <PlatformContext.Provider value={{ platform, setPlatform }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error("usePlatform must be used within PlatformProvider");
  }
  return context;
}
