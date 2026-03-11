import { Brain, Gauge, BarChart3, Lightbulb } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function ExtendedThinking() {
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
            拡張思考とモデル選択
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            タスクの複雑さに応じたモデル切り替えと、Effort Level による推論深度の制御。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* モデルファミリー */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Brain className="text-[var(--claude-primary)]" />
              モデルファミリーと選択基準
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code はセッション中にモデルを切り替えられます。タスクの複雑さとコスト感に応じて使い分けることで、効率的な開発が可能です。
            </p>
            <div className="space-y-4">
              <div className="p-5 rounded-xl border-2 border-[var(--claude-primary)]/30 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--claude-primary)]" />
                  <h4 className="font-bold">Opus 4.6</h4>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">最高性能</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  最も高い推論能力。複雑なアーキテクチャ設計、大規模リファクタリング、難解なバグの調査に適する。
                </p>
                <code className="text-xs text-muted-foreground font-mono">claude --model claude-opus-4-6</code>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <h4 className="font-bold">Sonnet 4.6</h4>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">バランス型</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  速度とコストのバランスに優れる。日常的なコーディング、機能追加、テスト作成に最適。Claude Code のデフォルトモデル。
                </p>
                <code className="text-xs text-muted-foreground font-mono">claude --model claude-sonnet-4-6</code>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <h4 className="font-bold">Haiku 4.5</h4>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">高速・低コスト</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  最も高速かつ低コスト。コード補完、簡単な質問、フォーマット変換などの軽量タスクに適する。
                </p>
                <code className="text-xs text-muted-foreground font-mono">claude --model claude-haiku-4-5-20251001</code>
              </div>
            </div>
            <CodeBlock code={`# セッション中のモデル切り替え
> /model claude-opus-4-6

# モデル選択メニューを表示
> /model`} language="bash" />
          </section>

          {/* Effort Level */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Gauge className="text-[var(--claude-primary)]" />
              Effort Level（推論深度の制御）
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              同じモデルでも、推論にかける「労力」を 3 段階で調整できます。簡単な質問には <code>low</code>、複雑な設計には <code>high</code> を使うことで、コストと応答速度を最適化します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { level: 'low', desc: '拡張思考なし。即座に応答。単純な質問やコード補完向き。', color: 'emerald' },
                { level: 'medium', desc: '標準的な推論深度。デフォルト設定。大半のタスクに適する。', color: 'blue' },
                { level: 'high', desc: '最大限の推論を使用。複雑なバグ調査や設計判断に最適。', color: 'purple' },
              ].map(item => (
                <div key={item.level} className={`p-4 rounded-xl border border-${item.color}-200 dark:border-${item.color}-900 bg-${item.color}-50 dark:bg-${item.color}-950/20`}>
                  <div className="flex items-center gap-2 mb-2">
                    <code className={`font-bold text-${item.color}-700 dark:text-${item.color}-400`}>{item.level}</code>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <CodeBlock code={`# セッション中に Effort Level を変更
> /config

# 環境変数で設定
$ export CLAUDE_CODE_EFFORT_LEVEL=high
$ claude`} language="bash" />
          </section>

          {/* 拡張思考 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Lightbulb className="text-[var(--claude-primary)]" />
              拡張思考（Extended Thinking）
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Effort Level が <code>high</code> の場合、Claude は応答前に内部で「思考プロセス」を実行します。この拡張思考により、より深い推論と正確な回答が可能になります。
            </p>
            <div className="p-5 bg-slate-900 rounded-xl border border-slate-700 mb-6">
              <p className="text-[10px] text-slate-500 mb-2 font-mono">拡張思考の動作イメージ</p>
              <div className="font-mono text-sm space-y-2">
                <div className="text-slate-500">{'>'} このバグの原因を特定して修正して</div>
                <div className="text-amber-400/70 text-xs pl-4">
                  [thinking] テストの失敗パターンを分析...<br/>
                  [thinking] auth/service.ts の認証フローを追跡...<br/>
                  [thinking] トークン更新のタイミングで競合状態が発生...
                </div>
                <div className="text-emerald-400 text-xs">根本原因を特定しました。auth/service.ts:42 の非同期処理に...</div>
              </div>
            </div>
            <InfoBox type="info" title="コストへの影響">
              拡張思考の thinking トークンは入力トークンの約 1/5 のコストで課金されます。Effort Level の <code>high</code> は thinking トークンの予算上限を引き上げ、<code>low</code> は thinking を無効化します。
            </InfoBox>
          </section>

          {/* 使い分けガイド */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <BarChart3 className="text-[var(--claude-primary)]" />
              タスク別の推奨設定
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-bold">タスク</th>
                    <th className="text-center py-3 px-4 font-bold">モデル</th>
                    <th className="text-center py-3 px-4 font-bold">Effort</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    { task: '簡単な質問・ドキュメント生成', model: 'Haiku', effort: 'low' },
                    { task: 'コード補完・型定義の追加', model: 'Sonnet', effort: 'low' },
                    { task: '機能実装・リファクタリング', model: 'Sonnet', effort: 'medium' },
                    { task: 'テスト作成・バグ修正', model: 'Sonnet', effort: 'medium' },
                    { task: '大規模リファクタリング', model: 'Opus', effort: 'high' },
                    { task: 'アーキテクチャ設計・複雑なバグ', model: 'Opus', effort: 'high' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-4 font-medium text-foreground">{row.task}</td>
                      <td className="py-3 px-4 text-center">{row.model}</td>
                      <td className="py-3 px-4 text-center"><code>{row.effort}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="タスク別のモデル設定を書こう"
            description="異なるタスクに適したモデルと Effort Level の設定コマンドを書いてください。簡単なタスク、通常タスク、複雑なタスクの3パターンを設定しましょう。"
            initialCode={`# タスク別のモデル・Effort Level 設定\n\n# 1. 簡単なタスク（ドキュメント生成）向け\n\n# 2. 通常タスク（機能実装）向け\n\n# 3. 複雑なタスク（アーキテクチャ設計）向け`}
            answer={`# タスク別のモデル・Effort Level 設定\n\n# 1. 簡単なタスク（ドキュメント生成）向け\nclaude --model claude-haiku-4-5-20251001\nexport CLAUDE_CODE_EFFORT_LEVEL=low\n\n# 2. 通常タスク（機能実装）向け\nclaude --model claude-sonnet-4-6\nexport CLAUDE_CODE_EFFORT_LEVEL=medium\n\n# 3. 複雑なタスク（アーキテクチャ設計）向け\nclaude --model claude-opus-4-6\nexport CLAUDE_CODE_EFFORT_LEVEL=high`}
            hints={[
              '軽量タスクには haiku + low の組み合わせが最もコスト効率が良いです',
              'Sonnet + medium がデフォルトのバランス型設定です',
              '複雑な推論が必要な場合は Opus + high を使います',
            ]}
            keywords={['haiku', 'sonnet', 'opus', 'EFFORT_LEVEL']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
