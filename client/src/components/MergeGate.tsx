import { Check, X, Lock, Unlock, GitPullRequest } from "lucide-react";
import CaptionedFigure from "./CaptionedFigure";

/**
 * マージゲートの条件（承認・CI・CODEOWNERS 等）を、達成状況とともに視覚化する。
 * すべて満たすと「マージ可」、1つでも欠けると「マージ不可」を鍵アイコンで示す。
 * 色だけに頼らず、アイコンとテキストで状態を伝える。
 */

interface GateCondition {
  label: string;
  met: boolean;
}

interface MergeGateProps {
  conditions: GateCondition[];
  caption?: string;
}

export default function MergeGate({ conditions, caption }: MergeGateProps) {
  const allMet = conditions.every((c) => c.met);

  return (
    <CaptionedFigure caption={caption}>
      <div className="rounded-2xl border border-border bg-muted/20 p-5">
        <div className="flex items-center gap-2 mb-4">
          <GitPullRequest
            size={18}
            className="text-primary"
            aria-hidden="true"
          />
          <span className="text-sm font-bold text-foreground">
            main へのマージ条件
          </span>
        </div>

        <ul className="space-y-2 mb-4">
          {conditions.map((c) => (
            <li
              key={c.label}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
                c.met
                  ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30"
                  : "border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30"
              }`}
            >
              <span
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                  c.met
                    ? "bg-emerald-200 dark:bg-emerald-800/60 text-emerald-800 dark:text-emerald-200"
                    : "bg-red-200 dark:bg-red-800/60 text-red-800 dark:text-red-200"
                }`}
              >
                {c.met ? (
                  <Check size={13} aria-hidden="true" />
                ) : (
                  <X size={13} aria-hidden="true" />
                )}
              </span>
              <span className="text-sm text-foreground">{c.label}</span>
              <span
                className={`ml-auto text-[11px] font-bold ${
                  c.met
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-red-700 dark:text-red-400"
                }`}
              >
                {c.met ? "満たす" : "未達"}
              </span>
            </li>
          ))}
        </ul>

        <div
          className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold ${
            allMet
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300"
              : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
          }`}
        >
          {allMet ? (
            <>
              <Unlock size={16} aria-hidden="true" />
              マージ可（すべての条件を満たす）
            </>
          ) : (
            <>
              <Lock size={16} aria-hidden="true" />
              マージ不可（条件を満たすまで保護）
            </>
          )}
        </div>
      </div>
    </CaptionedFigure>
  );
}
