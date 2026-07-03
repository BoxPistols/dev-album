import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import { getManualSections } from '@/lib/navigation';

const sections = getManualSections('claude-mux');

export default function Welcome() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />

          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            このガイドの目的
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            Claude Code を中心とした AI 駆動開発のハーネス（土台）を体系的に学び、主要な AI コーディングエージェントの使い分けと組み合わせて再現可能な開発基盤を構築するためのガイドです。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              対象となるエンジニア
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              本ガイドは、以下のような課題を抱えるエンジニアに最適です。
            </p>

            <div className="space-y-4 ml-4">
              {[
                { title: 'Claude Code を体系的に学びたい', desc: 'スラッシュコマンド、MCP、Subagents 等の機能を網羅的に理解したい方' },
                { title: 'AIエージェントの開発効率を最大化したい', desc: 'コンテキスト管理、トークン最適化、権限設定でエージェントを使いこなしたい方' },
                { title: 'コンテキストスイッチを減らしたい', desc: 'AIへの指示、ログ監視、テスト実行を一つの画面で完結させたい方' },
                { title: '開発環境を再現可能にしたい', desc: 'CLAUDE.md / AGENTS.md / DESIGN.md と .mcp.json で、ハーネスごと環境をコード化したい方' },
              ].map(item => (
                <div key={item.title} className="flex gap-3">
                  <div className="text-[var(--claude-primary)] font-bold mt-1">&#10003;</div>
                  <div>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              学習のロードマップ
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              前半で Claude Code の機能とハーネス設計（CLAUDE.md / Skills / Hooks / Subagents）を体系的に学び、中盤で主要な AI コーディングエージェントの比較と cmux による環境管理を習得し、最後にベストプラクティスと自動化へ進みます。
            </p>

            <div className="space-y-3">
              {sections.map((section, i) => {
                const isClaude = section.colorScheme === 'claude';
                return (
                  <div key={section.id} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="font-semibold text-foreground mb-1">
                      <span className={isClaude ? 'text-[var(--claude-primary)]' : 'text-emerald-600 dark:text-emerald-400'}>{i + 1}.</span> {section.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ガイドの特徴
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: '実践的アプローチ', desc: '理論よりも実行を重視。各ステップに実行可能なコマンドとコード例を配置しています。' },
                { title: 'Claude Code First', desc: 'Claude Code を主軸に据えつつ、Gemini CLI / Codex / Copilot / Amazon Q など他のエージェントも公平に比較します。' },
                { title: 'ツール非依存の設計', desc: 'AGENTS.md 等の共通コンテキスト設計により、特定ツールに縛られない開発基盤の作り方を解説します。' },
                { title: '網羅的なリファレンス', desc: 'スラッシュコマンド、MCP、Skills、Hooks、Subagents、Agent Teams を体系的に整理しています。' },
              ].map(item => (
                <div key={item.title} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              準備はよろしいですか？
            </h2>

            <InfoBox type="info" title="前提条件">
              ターミナルの基本的なコマンド（ls, cd, mkdir 等）の知識があることを前提としています。Node.js 18 以上と Git がインストールされている環境を推奨します。
            </InfoBox>

            <p className="text-foreground mt-8 leading-relaxed">
              次のページでは、Claude Code が他のAIコーディングツールとどう異なるかを解説します。
            </p>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
