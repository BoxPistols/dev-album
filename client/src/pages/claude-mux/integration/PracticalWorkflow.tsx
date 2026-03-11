import { Workflow, Layers, Terminal, Rocket, CheckCircle2, FileText } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function PracticalWorkflow() {
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
            実践ワークフロー構築
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            Claude Code、tmux、MCP を統合した開発ワークフローの具体例。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* 統合アーキテクチャ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Layers className="text-[var(--claude-primary)]" />
              統合アーキテクチャの全体像
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              本ガイドで学んだ 3 つの要素を組み合わせた開発環境の構成です。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-5 rounded-xl border-2 border-[var(--claude-primary)]/30 bg-white dark:bg-slate-900 text-center">
                <div className="text-2xl font-bold text-[var(--claude-primary)] mb-2">Claude Code</div>
                <p className="text-xs text-muted-foreground">AIエージェント<br/>コード生成・修正・テスト</p>
              </div>
              <div className="p-5 rounded-xl border-2 border-emerald-500/30 bg-white dark:bg-slate-900 text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-2">tmux</div>
                <p className="text-xs text-muted-foreground">ターミナル管理<br/>プロセス分離・セッション永続化</p>
              </div>
              <div className="p-5 rounded-xl border-2 border-blue-500/30 bg-white dark:bg-slate-900 text-center">
                <div className="text-2xl font-bold text-blue-500 mb-2">MCP</div>
                <p className="text-xs text-muted-foreground">外部ツール連携<br/>Figma・Sentry・DB</p>
              </div>
            </div>
          </section>

          {/* 実践シナリオ 1 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Workflow className="text-[var(--claude-primary)]" />
              シナリオ 1: 新機能の実装
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Figma のデザインから React コンポーネントを実装し、テストを追加する一連のフローです。
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">Step 1: 環境の起動</h4>
                <CodeBlock code={`# tmuxp で開発環境を一発起動
$ tmuxp load .

# ペイン構成:
#   左: Claude Code (メイン作業)
#   右上: dev server (npm run dev)
#   右下: shell (git, テスト)`} language="bash" />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">Step 2: Figma MCP でデザイン取得</h4>
                <CodeBlock code={`# Claude Code のペインで
> この Figma URL のデザインを React + Tailwind で実装して
> https://figma.com/design/xxxxx?node-id=1-2
> 既存の Button と Card コンポーネントを再利用すること`} language="bash" />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">Step 3: 監視と検証</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  右上のペインで dev server の HMR 更新を確認しながら、Claude Code が生成したコンポーネントをブラウザでリアルタイムプレビュー。
                </p>
                <CodeBlock code={`# 右下のペインでテスト実行
$ npm test -- --watch src/components/NewFeature`} language="bash" />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">Step 4: コミットと PR</h4>
                <CodeBlock code={`# Claude Code にコミットと PR 作成を依頼
> テストが通ったのでコミットして PR を作成して
> タイトル: ユーザープロフィールカードの実装`} language="bash" />
              </div>
            </div>
          </section>

          {/* 実践シナリオ 2 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="text-[var(--claude-primary)]" />
              シナリオ 2: 本番バグの調査・修正
            </h2>
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h4 className="font-bold text-sm mb-3 text-red-500">Step 1: Sentry MCP でエラー情報を取得</h4>
                <CodeBlock code={`> Sentry の未解決エラーで最も頻度の高いものを調べて`} language="bash" />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h4 className="font-bold text-sm mb-3 text-amber-500">Step 2: 原因調査と修正</h4>
                <CodeBlock code={`> このエラーの原因を調査して修正して
> テストも追加すること`} language="bash" />
                <p className="text-xs text-muted-foreground mt-2">
                  tmux の隣接ペインでサーバーログを監視しつつ、Claude Code がコードベースを調査。
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h4 className="font-bold text-sm mb-3 text-emerald-500">Step 3: Playwright MCP で動作確認</h4>
                <CodeBlock code={`> Playwright で修正箇所の E2E テストを実行して
> localhost:3000 のログインフローを確認`} language="bash" />
              </div>
            </div>
          </section>

          {/* スペック駆動開発 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FileText className="text-[var(--claude-primary)]" />
              シナリオ 3: スペック駆動開発
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              仕様書（スペック）を先に書き、それを Claude Code への入力として使うアプローチです。自然言語で曖昧に指示するよりも、構造化されたスペックを渡す方がエージェントの出力精度が向上します。
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">Step 1: スペックファイルの作成</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Markdown でスペックを書き、プロジェクト内に配置します。要件、入出力、エッジケース、テスト基準を明記することで、エージェントの解釈ブレを抑制します。
                </p>
                <CodeBlock code={`# specs/user-profile-card.md

## 概要
ユーザープロフィールカードコンポーネントの実装

## 要件
- アバター画像、表示名、メールアドレスを表示
- 画像未設定時はイニシャルのフォールバックを表示
- レスポンシブ対応（モバイルでは縦積み）

## 技術仕様
- React コンポーネント（TypeScript）
- 既存の Card / Avatar コンポーネントを再利用
- Storybook のストーリーを追加

## テスト基準
- 全propsの組み合わせでレンダリングされること
- 画像読み込みエラー時にフォールバックが表示されること`} language="markdown" />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">Step 2: スペックを参照して実装を指示</h4>
                <CodeBlock code={`# Claude Code に specs/ を読ませて実装
> specs/user-profile-card.md の仕様に従って実装して

# または、@ メンションでファイルを直接渡す
> @specs/user-profile-card.md この仕様を実装して`} language="bash" />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">Step 3: スペック対比でレビュー</h4>
                <CodeBlock code={`> specs/user-profile-card.md の要件をチェックリストとして、
> 実装が仕様を満たしているか検証して`} language="bash" />
                <p className="text-xs text-muted-foreground mt-2">
                  スペックが「正解」として存在するため、レビューの基準が明確になります。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="CLAUDE.md との使い分け">
              <code>CLAUDE.md</code> はプロジェクト全体のルール（命名規則、スタイルガイド、禁止事項）を定義するのに対し、スペックファイルは個別のタスクや機能の要件を記述します。CLAUDE.md に「specs/ ディレクトリのスペックに従うこと」と記載しておくと、エージェントが自動的にスペックを参照するようになります。
            </InfoBox>
          </section>

          {/* 環境のコード化 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Rocket className="text-[var(--claude-primary)]" />
              再現可能な環境の構築
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              以下の 3 ファイルをプロジェクトに含めることで、開発環境全体をコード化できます。
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <code className="text-sm font-bold text-[var(--claude-primary)]">CLAUDE.md</code>
                <p className="text-xs text-muted-foreground mt-1">プロジェクトのルール・慣例・技術スタックを定義</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <code className="text-sm font-bold text-[var(--claude-primary)]">.mcp.json</code>
                <p className="text-xs text-muted-foreground mt-1">MCP サーバの接続設定（Git管理でチーム共有可能）</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <code className="text-sm font-bold text-emerald-600">.tmuxp.yaml</code>
                <p className="text-xs text-muted-foreground mt-1">tmux セッションのレイアウトと起動コマンドを定義</p>
              </div>
            </div>
            <CodeBlock code={`# 新しいチームメンバーのオンボーディング
$ git clone <repo-url>
$ cd my-project
$ tmuxp load .
# → Claude Code + dev server + shell が自動起動
# → MCP サーバも自動接続`} language="bash" />
          </section>

          {/* まとめ */}
          <section className="p-8 rounded-2xl border border-[var(--claude-primary)]/20 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <CheckCircle2 className="text-[var(--claude-primary)]" />
              ワークフローの要点
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <span className="text-[var(--claude-primary)] font-bold flex-shrink-0">1.</span>
                <span><strong>tmuxp</strong> で環境を宣言的に定義し、<code>tmuxp load .</code> で即座に再現する。</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--claude-primary)] font-bold flex-shrink-0">2.</span>
                <span><strong>Claude Code</strong> にタスクを委任し、隣接ペインで監視する。</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--claude-primary)] font-bold flex-shrink-0">3.</span>
                <span><strong>MCP</strong> で外部ツール（Figma、Sentry、DB）をシームレスに統合する。</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--claude-primary)] font-bold flex-shrink-0">4.</span>
                <span><strong>スペック駆動</strong>で仕様を先に定義し、エージェントの出力精度と検証可能性を高める。</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--claude-primary)] font-bold flex-shrink-0">5.</span>
                <span><strong>CLAUDE.md + .mcp.json + .tmuxp.yaml</strong> の 3 ファイルで環境全体をコード化する。</span>
              </div>
            </div>
          </section>
        </div>

        <CodingChallenge
          preview
          previewType="terminal"
          title="tmuxp の設定ファイルを書いてみよう"
          description="Claude Code + dev server + shell の3ペイン構成を tmuxp の YAML で定義してください。"
          initialCode={`# .tmuxp.yaml\nsession_name: my-project\n# ウィンドウとペインを定義してください\n`}
          answer={`# .tmuxp.yaml\nsession_name: my-project\nwindows:\n  - window_name: main\n    layout: main-vertical\n    panes:\n      - shell_command:\n          - claude\n      - shell_command:\n          - npm run dev\n      - shell_command:\n          - echo "ready"`}
          keywords={['session_name', 'windows', 'panes', 'shell_command']}
          hints={[
            'tmuxp は session_name, windows, panes の階層構造で定義します',
            'layout には main-vertical, main-horizontal, tiled 等が使えます',
            '各ペインの shell_command に起動コマンドを指定します',
          ]}
        />

        <PageNavigation />
      </div>
    </div>
  );
}
