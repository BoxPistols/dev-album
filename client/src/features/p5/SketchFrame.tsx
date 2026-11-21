import P5Frame from "./P5Frame";
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
export default function SketchFrame({ code, title, height = 300 }: SketchFrameProps) {
  const { theme } = useTheme();
  return (
    <P5Frame
      code={code}
      isDark={isDarkTheme(theme)}
      title={title}
      className="rounded-xl overflow-hidden border border-border bg-card"
      style={{ height }}
    />
  );
}
