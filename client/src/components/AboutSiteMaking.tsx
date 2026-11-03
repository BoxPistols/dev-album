import { ExternalLink } from "lucide-react";
import {
  AUTHOR,
  COMMANDS,
  FLOW_STEPS,
  REPO_URL,
  SKILLS,
  SUBAGENTS,
  VERIFY_STEPS,
  repoFileUrl,
  type PipelineStep,
} from "@/data/site-making";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

interface ExternalAnchorProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

function ExternalAnchor({ href, className = "", children }: ExternalAnchorProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${FOCUS_RING} ${className}`}
    >
      {children}
      <ExternalLink size={14} aria-hidden="true" className="flex-shrink-0" />
      <span className="sr-only">（新しいタブで開く）</span>
    </a>
  );
}

interface StepListProps {
  steps: readonly PipelineStep[];
  label: string;
}

/** 番号つきの手順。狭い画面では縦、広い画面では横に並べる */
function StepList({ steps, label }: StepListProps) {
  const cols = steps.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3";
  return (
    <ol aria-label={label} className={`grid grid-cols-1 ${cols} gap-3`}>
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="bg-card rounded border border-border p-4 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-2">
            <span
              aria-hidden="true"
              className="w-7 h-7 rounded bg-muted text-foreground font-mono text-xs font-bold flex items-center justify-center flex-shrink-0"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="text-sm font-semibold text-foreground">{s.title}</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2 flex-1">
            {s.body}
          </p>
          <ExternalAnchor
            href={repoFileUrl(s.path)}
            className="inline-flex items-center gap-1 min-h-11 font-mono text-xs text-primary underline underline-offset-2 break-all"
          >
            {s.path}
          </ExternalAnchor>
        </li>
      ))}
    </ol>
  );
}

interface NameChipsProps {
  label: string;
  prefix: string;
  names: readonly string[];
}

function NameChips({ label, prefix, names }: NameChipsProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
      <span className="text-xs text-muted-foreground w-16 flex-shrink-0">
        {label}
      </span>
      <ul className="flex flex-wrap gap-1.5" aria-label={label}>
        {names.map((n) => (
          <li
            key={n}
            className="font-mono text-xs px-2 py-0.5 rounded bg-muted text-foreground"
          >
            {prefix}
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutSiteMaking() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-border scroll-mt-8"
    >
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <p className="text-xs font-mono tracking-[0.15em] uppercase text-muted-foreground mb-2">
          About
        </p>
        <h2
          id="about-heading"
          className="text-2xl md:text-3xl font-bold text-foreground mb-4"
        >
          このサイトの作り方
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl leading-relaxed">
          作者は{AUTHOR.name}（{AUTHOR.role}）。設計・実装・検証にClaude
          Codeを使い、その運用の仕組みもすべてこのリポジトリに置いています。
        </p>
        <div className="flex flex-wrap gap-3 mb-14">
          <ExternalAnchor
            href={AUTHOR.portfolioUrl}
            className="inline-flex items-center gap-2 min-h-11 px-5 rounded border border-border bg-card text-foreground text-sm font-medium hover:border-primary/50 transition-colors duration-150"
          >
            作者のポートフォリオ
          </ExternalAnchor>
          <ExternalAnchor
            href={REPO_URL}
            className="inline-flex items-center gap-2 min-h-11 px-5 rounded border border-border bg-card text-foreground text-sm font-medium hover:border-primary/50 transition-colors duration-150"
          >
            GitHubリポジトリ
          </ExternalAnchor>
        </div>

        <div className="space-y-14">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Claude Codeの役割分担
            </h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-2xl leading-relaxed">
              作業を役割ごとのサブエージェントに分け、繰り返す手順はスキルとコマンドにしています。
            </p>
            <ul
              aria-label="サブエージェント"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-5"
            >
              {SUBAGENTS.map((a) => (
                <li
                  key={a.name}
                  className="bg-card rounded border border-border px-4 py-3"
                >
                  <p className="font-mono text-sm text-foreground">{a.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {a.role}
                  </p>
                </li>
              ))}
            </ul>
            <div className="space-y-2 mb-3">
              <NameChips label="スキル" prefix="/" names={SKILLS} />
              <NameChips label="コマンド" prefix="/project:" names={COMMANDS} />
            </div>
            <ExternalAnchor
              href={repoFileUrl(".claude")}
              className="inline-flex items-center gap-1 min-h-11 font-mono text-xs text-primary underline underline-offset-2"
            >
              .claude/
            </ExternalAnchor>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              AIが書いた内容の確かめ方
            </h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-2xl leading-relaxed">
              引用が原文に文字列として在るかは決定的に確かめられるので、判断に回さず機械で照合します。
            </p>
            <StepList steps={VERIFY_STEPS} label="AIが書いた内容を確かめる手順" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              変更の進め方
            </h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-2xl leading-relaxed">
              人とAIが同じ文書を正本として読み、同じゲートを通ります。
            </p>
            <StepList steps={FLOW_STEPS} label="変更の進め方" />
          </div>
        </div>
      </div>
    </section>
  );
}
