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
                  <h4 className="font-bold">Opus</h4>
                  <span className="text-[12px] font-medium px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">高性能</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  高い推論能力。複雑なアーキテクチャ設計、大規模リファクタリング、難解なバグの調査に適する。Max プラン・API では既定モデル。
                </p>
                <code className="text-xs text-muted-foreground font-mono">claude --model opus</code>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <h4 className="font-bold">Sonnet</h4>
                  <span className="text-[12px] font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">バランス型</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  速度とコストのバランスに優れる。日常的なコーディング、機能追加、テスト作成に最適。Pro プランでは既定モデル。
                </p>
                <code className="text-xs text-muted-foreground font-mono">claude --model sonnet</code>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <h4 className="font-bold">Haiku</h4>
                  <span className="text-[12px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">高速・低コスト</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  最も高速かつ低コスト。コード補完、簡単な質問、フォーマット変換などの軽量タスクに適する。
                </p>
                <code className="text-xs text-muted-foreground font-mono">claude --model haiku</code>
              </div>
            </div>
            <CodeBlock code={`# セッション中のモデル切り替え（エイリアスまたは完全名）
> /model opus

# モデル選択メニューを表示
> /model`} language="bash" />
            <p className="text-xs text-muted-foreground mt-4">
              エイリアス（opus / sonnet / haiku / fable）は、その時点で推奨されるバージョンに解決されます。特定バージョンに固定したい場合は完全名（claude-sonnet-4-6 等）を指定します。最上位の Fable 5（<code>--model fable</code>）は長時間の自律タスク向けで、既定モデルではありません。
            </p>
          </section>

          {/* Effort Level */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Gauge className="text-[var(--claude-primary)]" />
              Effort Level（推論深度の制御）
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              同じモデルでも、推論にかける「労力」を段階的に調整できます（low / medium / high / xhigh / max。利用可能なレベルはモデルにより異なります）。簡単な質問には <code>low</code>、複雑な設計には <code>high</code> 以上を使うことで、コストと応答速度を最適化します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { level: 'low', desc: '最小限の推論。短く影響範囲が限定されたタスク向き。', color: 'emerald' },
                { level: 'medium', desc: 'コスト重視の推論深度。知能を多少犠牲にできるタスク向き。', color: 'blue' },
                { level: 'high', desc: '既定値。トークン消費と知能のバランス。大半のタスクに適する。', color: 'purple' },
              ].map(item => (
                <div key={item.level} className={`p-4 rounded-xl border border-${item.color}-200 dark:border-${item.color}-900 bg-${item.color}-50 dark:bg-${item.color}-950/20`}>
                  <div className="flex items-center gap-2 mb-2">
                    <code className={`font-bold text-${item.color}-700 dark:text-${item.color}-400`}>{item.level}</code>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              対応モデルでは <code>xhigh</code>（より深い推論）と <code>max</code>（セッション限定の最深推論）も選択できます。
            </p>
            <CodeBlock code={`# セッション中に Effort Level を変更（引数なしでスライダー表示）
> /effort high

# 起動時に指定
$ claude --effort high

# 環境変数で設定（他の設定より優先）
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
              拡張思考が有効な場合、Claude は応答前に内部で「思考プロセス」を実行します。<code>Option+T</code>（macOS）/ <code>Alt+T</code> でセッション中に切替でき、思考の深さは主に Effort Level が制御します（現行モデルはタスクに応じて思考量を自動調整する adaptive reasoning に対応）。
            </p>
            <div className="p-5 bg-slate-900 rounded-xl border border-slate-700 mb-6">
              <p className="text-[12px] text-slate-500 mb-2 font-mono">拡張思考の動作イメージ</p>
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
              thinking トークンは出力トークンとして課金されます（表示が折りたたまれていても課金対象）。Effort Level を上げるほど思考に使われるトークンが増えるため、品質とコストのトレードオフになります。
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
            initialCode={`# タスク別のモデル・Effort Level 設定\n\n# 1. 簡単なタスク（ドキュメント生成）向け\nclaude --model ___ --effort low  # ← ここを埋める（高速・低コストの alias）\n\n# 2. 通常タスク（機能実装）向け\nclaude --model ___ --effort medium  # ← ここを埋める（バランス型の alias）\n\n# 3. 複雑なタスク（アーキテクチャ設計）向け\nclaude --model ___ --effort high  # ← ここを埋める（高性能の alias）`}
            answer={`# タスク別のモデル・Effort Level 設定\n\n# 1. 簡単なタスク（ドキュメント生成）向け\nclaude --model haiku --effort low\n\n# 2. 通常タスク（機能実装）向け\nclaude --model sonnet --effort medium\n\n# 3. 複雑なタスク（アーキテクチャ設計）向け\nclaude --model opus --effort high`}
            hints={[
              '軽量タスクには haiku + low の組み合わせが最もコスト効率が良いです',
              'sonnet + medium がコスト重視のバランス型設定です',
              '複雑な推論が必要な場合は opus + high を使います',
            ]}
            keywords={['haiku', 'sonnet', 'opus']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
