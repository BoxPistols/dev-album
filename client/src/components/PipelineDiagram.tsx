import { ChevronRight, type LucideIcon } from "lucide-react";

/**
 * CI/CD パイプラインを横並びのステージとして視覚化する。
 * 各ステージを箱で表し、矢印でつなぐ。最後のステージ（デプロイ等）は強調できる。
 */

interface PipelineStage {
  label: string;
  detail?: string;
  icon?: LucideIcon;
  /** 強調表示（デプロイなど最終段） */
  highlight?: boolean;
}

interface PipelineDiagramProps {
  stages: PipelineStage[];
  caption?: string;
}

export default function PipelineDiagram({
  stages,
  caption,
}: PipelineDiagramProps) {
  return (
    <figure className="my-8">
      {caption && (
        <figcaption className="text-sm text-muted-foreground mb-3 font-medium">
          {caption}
        </figcaption>
      )}

      <div className="rounded-2xl border border-border bg-muted/20 p-5 overflow-x-auto">
        <div className="flex items-stretch gap-1 min-w-max">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <div key={stage.label} className="flex items-center gap-1">
                <div
                  className={`flex flex-col items-center text-center rounded-xl border px-4 py-3 min-w-[120px] ${
                    stage.highlight
                      ? "border-primary/40 bg-primary/10"
                      : "border-border bg-card"
                  }`}
                >
                  <div
                    className={`mb-1.5 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      stage.highlight
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {Icon ? <Icon size={16} aria-hidden="true" /> : i + 1}
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {stage.label}
                  </span>
                  {stage.detail && (
                    <span className="text-[11px] text-muted-foreground mt-0.5 font-mono">
                      {stage.detail}
                    </span>
                  )}
                </div>

                {i < stages.length - 1 && (
                  <ChevronRight
                    size={20}
                    className="text-muted-foreground flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </figure>
  );
}
