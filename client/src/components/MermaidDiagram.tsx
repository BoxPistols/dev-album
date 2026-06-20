import { useState } from "react";
import { useMermaid } from "@/hooks/useMermaid";
import { Code2, ChevronDown } from "lucide-react";

interface MermaidDiagramProps {
  /** mermaid のソース（erDiagram など） */
  chart: string;
  /** 図の上に出すキャプション */
  title?: string;
  /** ソースコードの折りたたみを初期表示するか */
  showSource?: boolean;
}

/**
 * mermaid のソースを実際の図（SVG）として描画するコンポーネント。
 * 図の下に元のソースをトグルで表示できる（学習用に「コードと結果」を両方見せる）。
 */
export default function MermaidDiagram({
  chart,
  title,
  showSource = false,
}: MermaidDiagramProps) {
  const code = chart.trim();
  const { svg, error, loading } = useMermaid(code);
  const [sourceOpen, setSourceOpen] = useState(showSource);

  return (
    <figure className="my-6 rounded-xl border border-border bg-card overflow-hidden">
      {title && (
        <figcaption className="px-4 py-2.5 border-b border-border bg-muted text-xs font-medium text-muted-foreground">
          {title}
        </figcaption>
      )}

      <div className="p-4 md:p-6">
        {loading && (
          <div className="flex items-center justify-center py-10 text-muted-foreground">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-sm">図を描画中…</span>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4">
            <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
              図の描画に失敗しました
            </p>
            <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap">
              {error}
            </pre>
          </div>
        )}

        {!loading && !error && (
          <div
            className="mermaid-svg flex justify-center overflow-x-auto [&_svg]:max-w-full [&_svg]:h-auto"
            // SVG は mermaid が securityLevel: 'strict' で生成する（スクリプト除去済み）
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>

      {/* 元のソース（学習用に併記） */}
      <div className="border-t border-border">
        <button
          type="button"
          onClick={() => setSourceOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          aria-expanded={sourceOpen}
        >
          <span className="flex items-center gap-1.5">
            <Code2 size={14} />
            mermaid ソースを{sourceOpen ? "隠す" : "見る"}
          </span>
          <ChevronDown
            size={14}
            className={`transition-transform ${sourceOpen ? "rotate-180" : ""}`}
          />
        </button>
        {sourceOpen && (
          <pre className="px-4 py-3 bg-[#1e1e2e] text-slate-100 text-xs font-mono overflow-x-auto leading-relaxed border-t border-border">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </figure>
  );
}
