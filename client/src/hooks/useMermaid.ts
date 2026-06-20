import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// mermaid は重い（数百 KB）ため、必要になったときだけ動的 import する。
// モジュールは一度だけ読み込んでキャッシュする。
type MermaidModule = (typeof import("mermaid"))["default"];
let mermaidPromise: Promise<MermaidModule> | null = null;

function loadMermaid(): Promise<MermaidModule> {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then((m) => m.default);
  }
  return mermaidPromise;
}

// レンダリングごとに一意な id を発番する（mermaid.render の要件）。
let renderSeq = 0;

interface UseMermaidResult {
  svg: string;
  error: string | null;
  loading: boolean;
}

/**
 * Mermaid のソースを SVG 文字列に変換する副作用フック。
 * テーマ（light / dark / dark-soft）に追従して再レンダリングする。
 */
export function useMermaid(code: string): UseMermaidResult {
  const { theme } = useTheme();
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // 直近のレンダリング要求だけを反映するためのトークン。
  const tokenRef = useRef(0);

  useEffect(() => {
    const token = ++tokenRef.current;
    let cancelled = false;
    setLoading(true);
    setError(null);

    loadMermaid()
      .then(async (mermaid) => {
        // dark / dark-soft はどちらも暗色系なので mermaid の dark テーマを使う。
        const mermaidTheme = theme === "light" ? "default" : "dark";
        mermaid.initialize({
          startOnLoad: false,
          theme: mermaidTheme,
          securityLevel: "strict",
          fontFamily: "inherit",
        });
        const id = `mermaid-${token}-${++renderSeq}`;
        const { svg: rendered } = await mermaid.render(id, code);
        if (!cancelled && token === tokenRef.current) {
          setSvg(rendered);
          setLoading(false);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled && token === tokenRef.current) {
          setError(e instanceof Error ? e.message : "図の描画に失敗しました");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [code, theme]);

  return { svg, error, loading };
}
