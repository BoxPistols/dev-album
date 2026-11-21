import { useMemo } from "react";
import {
  buildP5PreviewHtml,
  P5_IFRAME_ALLOW,
  P5_IFRAME_SANDBOX,
} from "@/lib/preview";
import { useTheme, isDarkTheme } from "@/contexts/ThemeContext";

interface SketchFrameProps {
  /** p5.jsのスケッチ（グローバルモード） */
  code: string;
  /** iframeのtitle。何の絵かを言葉で伝える */
  title: string;
  /** 枠の高さ（px）。下部の操作バーを含む */
  height?: number;
}

/**
 * コードを見せずに、p5.jsのスケッチだけを動かして見せる枠。
 * 編集させたい場合はCodePreviewを使う。
 */
export default function SketchFrame({
  code,
  title,
  height = 300,
}: SketchFrameProps) {
  const { theme } = useTheme();
  const isDark = isDarkTheme(theme);
  const html = useMemo(() => buildP5PreviewHtml(code, isDark), [code, isDark]);

  return (
    <div
      className="rounded-xl overflow-hidden border border-border bg-card"
      style={{ height }}
    >
      <iframe
        srcDoc={html}
        sandbox={P5_IFRAME_SANDBOX}
        allow={P5_IFRAME_ALLOW}
        loading="lazy"
        title={title}
        className="w-full h-full border-0"
      />
    </div>
  );
}
