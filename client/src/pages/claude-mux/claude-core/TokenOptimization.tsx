import { CreditCard, BarChart3, Zap, Gauge, Layers } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function TokenOptimization() {
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
            トークン消費の最適化
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            コスト監視、自動コンパクション、モデル層別化による効率的なAPI消費管理。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* コスト監視 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CreditCard className="text-[var(--claude-primary)]" />
              コスト監視コマンド
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Codeは使用量に応じてAPIコストが発生します。以下のコマンドで消費状況を常に把握できます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  /cost
                </h4>
                <p className="text-xs text-muted-foreground">現在のセッションで消費したトークン量と金額見積もりを表示。</p>
              </div>
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  /usage
                </h4>
                <p className="text-xs text-muted-foreground">サブスクリプションプランの残り容量とレート制限を表示。</p>
              </div>
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  /context
                </h4>
                <p className="text-xs text-muted-foreground">コンテキストウィンドウの使用量をカラーグリッドで視覚表示。</p>
              </div>
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-600" />
                  /stats
                </h4>
                <p className="text-xs text-muted-foreground">日次使用量、セッション履歴、モデル使用傾向をダッシュボード表示。</p>
              </div>
            </div>
          </section>

          {/* 自動コンパクション */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Zap className="text-[var(--claude-primary)]" />
              自動コンパクション
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              コンテキスト使用量が95%に達すると、Claude Codeは自動的に会話履歴を要約（コンパクション）します。手動でも <code>/compact</code> で任意のタイミングで実行可能です。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">/compact [focus]</code>
                <p className="text-xs text-muted-foreground mt-2">手動コンパクション。フォーカス指示（例: <code>/compact auth関連の変更に集中</code>）で重要な文脈を保持可能。</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">/clear</code>
                <p className="text-xs text-muted-foreground mt-2">タスク切替時に会話を完全リセット。コンパクションではなく新規開始したい場合に使用。</p>
              </div>
            </div>
            <CodeBlock code={`# 自動コンパクションの閾値を変更（デフォルト: 95%）
$ export CLAUDE_CODE_AUTOCOMPACT_PCT_OVERRIDE=80`} language="bash" />
          </section>

          {/* Effort Level */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Gauge className="text-[var(--claude-primary)]" />
              Effort Level（推論強度）
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              タスクの複雑さに応じて推論強度を調整し、コストと速度を最適化できます。
            </p>
            <div className="space-y-3">
              {[
                { level: 'low', desc: 'リネーム、typo修正など単純なタスク。高速・低コスト。', color: 'text-emerald-600' },
                { level: 'medium', desc: '標準的なコーディングタスク。バランス型。', color: 'text-blue-600' },
                { level: 'high（デフォルト）', desc: '複雑な推論やアーキテクチャ設計。最高品質。', color: 'text-purple-600' },
              ].map(item => (
                <div key={item.level} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <code className={`font-bold text-sm min-w-[160px] ${item.color}`}>{item.level}</code>
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
            <CodeBlock code={`# 環境変数で設定
$ export CLAUDE_CODE_EFFORT_LEVEL=medium

# またはセッション内で /model コマンドから左右矢印で調整（Opus使用時）`} language="bash" />
          </section>

          {/* モデル層別化 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Layers className="text-[var(--claude-primary)]" />
              コスト削減のベストプラクティス
            </h2>
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2 text-[var(--claude-primary)]">1. .claudeignore の徹底</h4>
                <p className="text-xs text-muted-foreground">不要なファイル（node_modules, dist, lock files, 画像等）を除外し、初期スキャンのトークン消費を削減。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2 text-[var(--claude-primary)]">2. モデルの使い分け</h4>
                <p className="text-xs text-muted-foreground">日常タスクにはSonnet、複雑な設計にはOpusを使用。サブエージェントに <code>model: haiku</code> を指定すれば更に削減。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2 text-[var(--claude-primary)]">3. 具体的な指示</h4>
                <p className="text-xs text-muted-foreground">曖昧な問いかけを避け、完了条件を明確に示す。プロンプト1回あたりの効率が向上。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2 text-[var(--claude-primary)]">4. CLAUDE.md のプロンプトキャッシュ</h4>
                <p className="text-xs text-muted-foreground">CLAUDE.mdは自動的にキャッシュされ、再利用時に最大90%のコスト削減効果があります。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2 text-[var(--claude-primary)]">5. 予算上限の設定</h4>
                <p className="text-xs text-muted-foreground">非インタラクティブモードでは <code>--max-budget-usd</code> フラグでAPI呼び出しの上限金額を設定可能。</p>
              </div>
            </div>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title=".claudeignore を設定しよう"
            description="トークン消費を削減するための .claudeignore ファイルを作成してください。node_modules、ビルド出力、ロックファイル、画像ファイルなどを除外しましょう。"
            initialCode={`# .claudeignore\n# 不要なファイルを除外してトークン消費を削減\n\n# ここに除外パターンを追加してください`}
            answer={`# .claudeignore\n# 不要なファイルを除外してトークン消費を削減\n\nnode_modules/\ndist/\nbuild/\n.next/\n\n# ロックファイル\npackage-lock.json\nyarn.lock\npnpm-lock.yaml\n\n# 画像・バイナリ\n*.png\n*.jpg\n*.gif\n*.ico\n*.woff2\n\n# その他\n.git/\ncoverage/\n*.map`}
            hints={[
              'node_modules や dist などの生成ファイルは最優先で除外しましょう',
              'ロックファイルはトークンを大量消費しますが情報価値が低いです',
              '画像やバイナリファイルもコンテキストに不要です',
            ]}
            keywords={['node_modules', 'dist', 'package-lock', '*.png']}
          />
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
