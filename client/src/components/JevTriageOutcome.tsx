import type { ReactNode } from "react";
import { AlertCircle, History, Radio } from "lucide-react";
import {
  JEV_UNAVAILABLE_MESSAGES,
  type JevTriageState,
} from "@/hooks/useJevTriage";
import type { JevDepartment, JevRoute } from "../../../api/lib/jevRequest";

/** 実呼び出しができないときに見せる、過去の実測 */
export interface JevTriageRecord {
  input: string;
  department: JevDepartment;
  confidence: number;
  urgent: number;
  model: string;
  /** 実測した日。「2026-09-20」など */
  measuredOn: string;
}

interface JevTriageOutcomeProps {
  state: JevTriageState;
  record: JevTriageRecord;
  /** ページ内の記録の節へのリンク先 */
  recordHref: string;
  recordLinkLabel: string;
}

const DEPARTMENT_LABELS: Record<JevDepartment, string> = {
  billing: "billing（請求）",
  technical: "technical（技術）",
  sales: "sales（営業）",
  other: "other（どれでもない）",
};

const ROUTE_LABELS: Record<JevRoute, string> = {
  auto: "auto（自動で振り分け）",
  review: "review（人が確認）",
};

function Fields({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="font-mono text-foreground break-words">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Tag({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-1.5 text-sm font-semibold mb-3">
      {icon}
      {children}
    </p>
  );
}

export default function JevTriageOutcome({
  state,
  record,
  recordHref,
  recordLinkLabel,
}: JevTriageOutcomeProps) {
  if (state.status === "idle") return null;

  if (state.status === "running") {
    return (
      <p className="text-sm text-muted-foreground">Jevに問い合わせています</p>
    );
  }

  if (state.status === "invalid") {
    return (
      <p className="inline-flex items-start gap-1.5 text-sm text-foreground">
        <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
        {state.message}
      </p>
    );
  }

  if (state.status === "success") {
    const { result } = state;
    return (
      <div className="rounded-lg border border-border bg-card p-4">
        <Tag
          icon={<Radio size={16} className="text-primary" aria-hidden="true" />}
        >
          <span className="rounded bg-primary/10 px-2 py-0.5 text-primary">
            実呼び出しの結果
          </span>
        </Tag>
        <Fields
          rows={[
            ["担当チーム", DEPARTMENT_LABELS[result.department]],
            ["confidence", String(result.confidence)],
            ["緊急度（urgent）", String(result.urgent)],
            ["振り分け", ROUTE_LABELS[result.route]],
            ["応答時間", `${result.elapsedMs}ms`],
            [
              "入力トークン",
              result.inputTokens === null
                ? "報告なし"
                : result.inputTokens.toLocaleString(),
            ],
            ["モデル", result.model],
          ]}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-1.5 text-sm text-foreground">
        <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
        <p>
          <span className="font-semibold">実行できませんでした。</span>
          {JEV_UNAVAILABLE_MESSAGES[state.reason]}
        </p>
      </div>
      <div className="rounded-lg border border-dashed border-border bg-muted p-4">
        <Tag icon={<History size={16} aria-hidden="true" />}>
          <span className="text-foreground">
            記録（{record.measuredOn}の実測。固定値）
          </span>
        </Tag>
        <p className="text-sm text-foreground mb-3">
          入力した文章の判定ではなく、次の入力を実際に送ったときの応答です。「
          {record.input}」
        </p>
        <Fields
          rows={[
            ["担当チーム", DEPARTMENT_LABELS[record.department]],
            ["confidence", String(record.confidence)],
            ["緊急度（urgent）", String(record.urgent)],
            ["モデル", record.model],
          ]}
        />
        <p className="text-sm text-foreground mt-3">
          ほかの記録は
          <a href={recordHref} className="underline underline-offset-2">
            {recordLinkLabel}
          </a>
          で見られます。
        </p>
      </div>
    </div>
  );
}
