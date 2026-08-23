import {
  Zap,
  FileCode2,
  Box,
  Package,
  Terminal,
  ArrowDown,
  Cpu,
} from "lucide-react";
import CaptionedFigure from "./CaptionedFigure";

/**
 * ワークフローの構造（イベント → ワークフロー → ジョブ → ステップ）を
 * 視覚的に分解して見せる。YAML を読まなくても階層が掴めるようにする図解。
 */

interface AnatomyStep {
  kind: "uses" | "run";
  label: string;
}

interface AnatomyJob {
  name: string;
  runsOn?: string;
  steps: AnatomyStep[];
}

interface WorkflowAnatomyProps {
  event: string;
  workflowName: string;
  jobs: AnatomyJob[];
  caption?: string;
}

const kindStyle: Record<AnatomyStep["kind"], string> = {
  uses: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  run: "bg-zinc-200 dark:bg-zinc-700/50 text-zinc-700 dark:text-zinc-200",
};

export default function WorkflowAnatomy({
  event,
  workflowName,
  jobs,
  caption,
}: WorkflowAnatomyProps) {
  return (
    <CaptionedFigure caption={caption}>
      <div className="rounded-2xl border border-border bg-muted/20 p-5 md:p-6">
        {/* イベント */}
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-4 py-2 text-sm font-bold">
            <Zap size={16} aria-hidden="true" />
            イベント
            <span className="font-mono font-normal">{event}</span>
          </div>
          <ArrowDown
            size={22}
            className="text-muted-foreground my-2"
            aria-hidden="true"
          />
        </div>

        {/* ワークフロー */}
        <div className="rounded-xl border-2 border-primary/30 bg-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <FileCode2 size={18} className="text-primary" aria-hidden="true" />
            <span className="text-sm font-bold text-foreground">
              ワークフロー
            </span>
            <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
              {workflowName}
            </span>
          </div>

          {/* ジョブ（横並び = 並列） */}
          <div
            className={`grid gap-4 ${jobs.length > 1 ? "md:grid-cols-2" : "grid-cols-1"}`}
          >
            {jobs.map((job) => (
              <div
                key={job.name}
                className="rounded-lg border border-border bg-muted/40 p-4"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Box
                    size={16}
                    className="text-foreground"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold text-foreground">
                    ジョブ
                  </span>
                  <span className="font-mono text-sm text-foreground">
                    {job.name}
                  </span>
                  {job.runsOn && (
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground bg-background border border-border px-2 py-0.5 rounded ml-auto">
                      <Cpu size={11} aria-hidden="true" />
                      {job.runsOn}
                    </span>
                  )}
                </div>

                <ol className="space-y-1.5">
                  {job.steps.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 rounded-md bg-card border border-border px-2.5 py-1.5"
                    >
                      <span
                        className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-bold font-mono ${kindStyle[step.kind]}`}
                      >
                        {step.kind === "uses" ? (
                          <Package size={10} aria-hidden="true" />
                        ) : (
                          <Terminal size={10} aria-hidden="true" />
                        )}
                        {step.kind}
                      </span>
                      <span className="min-w-0 text-xs text-muted-foreground font-mono truncate">
                        {step.label}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          {jobs.length > 1 && (
            <p className="text-xs text-muted-foreground mt-3 text-center">
              依存関係（needs）がなければ、横に並んだジョブは既定で<strong>並列</strong>に実行されます
            </p>
          )}
        </div>
      </div>
    </CaptionedFigure>
  );
}
