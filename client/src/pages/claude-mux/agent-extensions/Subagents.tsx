import { Bot, Network, Layers, FileCode } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function Subagents() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Subagents による並列処理
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            タスクを分解し、子エージェントへ委譲することでメインコンテキストを保護しつつ高速化を図る。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* オーケストレーション */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Network className="text-[var(--claude-primary)]" />
              マルチエージェント・オーケストレーション
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Codeは <code>Task</code> ツールを使用してサブエージェントを動的に生成します。各サブエージェントは独自のコンテキストウィンドウで実行されるため、メインの会話コンテキストを消費しません。
            </p>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h4 className="font-bold mb-4">並列化の構造</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 text-[var(--claude-primary)] font-bold flex-shrink-0 flex items-center justify-center text-[10px]">Main</div>
                  <p>エンジニアとの対話、全体計画の立案、サブエージェントの管理。</p>
                </li>
                <li className="flex gap-3 ml-8">
                  <div className="w-6 h-6 rounded bg-emerald-600 text-white flex-shrink-0 flex items-center justify-center text-[10px]">Sub</div>
                  <p>分離されたコンテキストでサブタスクを実行。結果のみメインに返される。</p>
                </li>
              </ul>
            </div>
            <InfoBox type="info" title="コンテキスト分離のメリット">
              大量のファイル検索や分析結果がメインの会話履歴を圧迫しません。メインエージェントは要約された結果のみを受け取ります。
            </InfoBox>
          </section>

          {/* ビルトインタイプ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Bot className="text-[var(--claude-primary)]" />
              ビルトインサブエージェント
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Codeには3つのビルトインサブエージェントタイプがあります。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-[var(--claude-primary)] mb-3">Bash</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">コマンド実行に特化。Git操作やターミナルタスクを処理します。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-[var(--claude-primary)] mb-3">Explore</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">コードベース探索に特化。ファイル検索、キーワード検索、コード分析を高速に実行します。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-[var(--claude-primary)] mb-3">Plan</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">実装計画の設計に特化。アーキテクチャのトレードオフを考慮した計画を立案します。</p>
              </div>
            </div>
          </section>

          {/* カスタムエージェント */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FileCode className="text-[var(--claude-primary)]" />
              カスタムエージェントの定義
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              <code>.claude/agents/</code> ディレクトリにMarkdownファイルを配置することで、独自のサブエージェントを定義できます。
            </p>
            <CodeBlock code={`# .claude/agents/test-runner.md

---
tools:
  - Bash
  - Read
  - Glob
  - Grep
model: haiku
---

テストの実行と結果の分析を担当するエージェントです。

## 手順
1. 変更されたファイルに関連するテストを特定
2. テストを実行し結果を分析
3. 失敗がある場合は原因と修正案を報告`} language="markdown" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2">frontmatter設定</h4>
                <p className="text-xs text-muted-foreground"><code>tools</code>（使用可能ツール）、<code>model</code>（モデル指定）、<code>maxTurns</code>（最大ターン数）、<code>mcpServers</code>（利用MCP）等を指定。</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2">コスト最適化</h4>
                <p className="text-xs text-muted-foreground">単純なタスクには <code>model: haiku</code> を指定することで、コストを大幅に削減できます。</p>
              </div>
            </div>
          </section>

          {/* 監視 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Layers className="text-[var(--claude-primary)]" />
              バックグラウンド実行と監視
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              サブエージェントはバックグラウンドで実行可能です。<code>/tasks</code> コマンドで実行中のタスク一覧を確認できます。tmuxで画面を分割すれば、別のペインの <code>git diff</code> 等でファイル変更をリアルタイムに監視できます。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">/tasks</code>
                <p className="text-xs text-muted-foreground mt-2">バックグラウンドタスクの一覧・管理</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">Ctrl+B</code>
                <p className="text-xs text-muted-foreground mt-2">実行中タスクをバックグラウンドに切り替え</p>
              </div>
            </div>
          </section>
          <CodingChallenge
            preview
            previewType="markdown"
            title="カスタムサブエージェントを定義しよう"
            description=".claude/agents/ に配置するカスタムエージェントの Markdown ファイルを書いてください。リファクタリング提案を行うエージェントを定義しましょう。"
            initialCode={`# refactor-advisor.md\n\n---\ntools:\n  # 使用可能なツールを指定\nmodel:\n  # コスト効率の良いモデルを指定\n---\n\n# ここにエージェントの役割と手順を書いてください`}
            answer={`# refactor-advisor.md\n\n---\ntools:\n  - Read\n  - Glob\n  - Grep\nmodel: sonnet\n---\n\nコードのリファクタリング提案を行うエージェントです。\n\n## 手順\n1. 対象ディレクトリのファイル構造を把握する\n2. コードの重複、複雑度の高い関数を検出する\n3. リファクタリングの優先順位を付けて提案する\n4. 各提案について期待される改善効果を説明する\n\n## 出力形式\n- 優先度（High/Medium/Low）\n- 対象ファイルと関数名\n- 提案内容と改善効果`}
            hints={[
              'frontmatter で tools, model を指定します',
              '読み取り専用のツール（Read, Glob, Grep）のみに制限すると安全です',
              '手順と出力形式を明確に定義するとエージェントの精度が向上します',
            ]}
            keywords={['tools', 'model', 'Read', 'Glob', 'Grep']}
          />
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
