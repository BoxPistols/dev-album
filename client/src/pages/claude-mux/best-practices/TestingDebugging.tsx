import { TestTube, Users, Search, Bot, MonitorCheck, GitFork } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function TestingDebugging() {
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
            テストとデバッグの戦略
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            テスト駆動のフロー、マルチセッション活用、並列処理など、品質を確保するための実践パターン。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* テスト駆動 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <TestTube className="text-[var(--claude-primary)]" />
              テスト駆動の開発フロー
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              テストを先に書いてから実装を依頼すると、Claude Code は自己検証ループを回しながら実装を進めます。テストの成否が客観的な品質基準となるため、手動レビューの負荷が減少します。
            </p>
            <CodeBlock
              code={`# Step 1: テストを先に書く
> @specs/payment-processing.md の仕様に基づいて、
> テストを tests/payment.test.ts に書いて。
> まだ実装はしないで。

# Step 2: テストが失敗することを確認
> npm test -- tests/payment.test.ts を実行して。
> 全てのテストが失敗することを確認して。

# Step 3: テストを通す実装を依頼
> tests/payment.test.ts の全テストが通るように
> src/services/payment.ts を実装して。
> 実装後にテストを実行して全てパスすることを確認して。`}
              language="bash"
            />
            <InfoBox type="info" title="自己修正ループ">
              テストが失敗すると、Claude Code はエラーメッセージを読み取り自動的に修正を試みます。「テストが通るまで修正を続けて」と指示することで、人間の介入なしに実装を完成させることができます。
            </InfoBox>
            <div className="mt-6 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h4 className="font-bold text-sm mb-3">テスト作成時の指示のコツ</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>- 正常系・異常系・エッジケースを明示的に指定する</p>
                <p>- テストの粒度を「関数単位」か「シナリオ単位」か指定する</p>
                <p>- モックの対象範囲を明確にする（外部API、DB等）</p>
                <p>- テストフレームワークとアサーションライブラリを指定する</p>
              </div>
            </div>
          </section>

          {/* Writer/Reviewer パターン */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Users className="text-[var(--claude-primary)]" />
              Writer/Reviewer パターン
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              2つのセッションを使い分けるパターンです。セッションAで実装し、セッションBでレビューを行います。異なるコンテキストで同じコードを見ることで、盲点を発見しやすくなります。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 rounded-r-xl border-l-4 border-blue-500 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3">セッションA（Writer）</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>- 機能の実装に集中</li>
                  <li>- テストの作成</li>
                  <li>- コミットの準備</li>
                </ul>
              </div>
              <div className="p-5 rounded-r-xl border-l-4 border-purple-500 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3">セッションB（Reviewer）</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>- コードレビューの実施</li>
                  <li>- セキュリティの確認</li>
                  <li>- エッジケースの検証</li>
                </ul>
              </div>
            </div>
            <CodeBlock
              code={`# tmux で2ペインに分割して並行作業

# セッションA（Writer）: 左ペイン
$ claude
> ユーザー認証のリフレッシュトークン機能を実装して。

# セッションB（Reviewer）: 右ペイン（Writerの実装完了後）
$ claude
> git diff HEAD~1 の変更をセキュリティ観点でレビューして。
> 特にトークンの有効期限、ストレージ方法、
> CSRF対策を確認して。`}
              language="bash"
            />
            <InfoBox type="info" title="tmux との相性">
              tmux のペイン分割を使えば、Writer と Reviewer を同じ画面で並行して管理できます。Writer が完了したら Reviewer ペインに切り替えてレビューを依頼するフローが効率的です。
            </InfoBox>
          </section>

          {/* エラーの根本原因特定 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Search className="text-[var(--claude-primary)]" />
              エラーの根本原因を特定するプロンプティング
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              表面的な症状だけでなく根本原因を特定するよう指示することで、場当たり的な修正を避けられます。
            </p>
            <CodeBlock
              code={`# 悪い例: 症状だけを伝える
> TypeError: Cannot read property 'map' of undefined を修正して

# 良い例: 根本原因の調査を依頼
> TypeError: Cannot read property 'map' of undefined が
> src/components/UserList.tsx:42 で発生している。
> このエラーの根本原因を調査して。
> 1. データフローを遡って、どこで undefined になるか特定して
> 2. 同様のパターンが他にもないか確認して
> 3. 根本的な修正案を提示して

# パイプで直接エラーログを渡す
$ npm run dev 2>&1 | claude "このエラーの根本原因を調査して修正して"`}
              language="bash"
            />
            <div className="mt-6 space-y-3">
              {[
                { pattern: 'スタックトレースを全文渡す', desc: 'エラーメッセージだけでなくスタックトレース全体を渡すことで、呼び出し経路を追跡できる。' },
                { pattern: '再現手順を明記する', desc: '「ログイン後にプロフィール画面を開くと発生」のように再現条件を伝える。' },
                { pattern: '発生頻度を伝える', desc: '「毎回」「特定条件下のみ」「間欠的」など、頻度情報がデバッグの方向性を決める。' },
                { pattern: '最近の変更を参照する', desc: '「git log の直近5コミット以降に発生し始めた」のように変更との相関を伝える。' },
              ].map(item => (
                <div key={item.pattern} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <span className="text-[var(--claude-primary)] font-bold text-xs min-w-[180px] shrink-0">{item.pattern}</span>
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Subagents でコードレビュー */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Bot className="text-[var(--claude-primary)]" />
              Subagents を使ったコードレビュー
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              カスタムエージェントを定義して、特定の観点に特化したレビューを自動化できます。メインの会話コンテキストを消費せずに、詳細な分析結果だけを受け取れます。
            </p>
            <CodeBlock
              code={`# .claude/agents/security-reviewer.md

---
tools:
  - Read
  - Glob
  - Grep
model: sonnet
---

セキュリティ観点でコードをレビューするエージェントです。

## チェック項目
1. 入力バリデーションの漏れ
2. SQLインジェクション/XSSの可能性
3. 認証・認可の不備
4. 機密情報のハードコーディング
5. 依存パッケージの既知の脆弱性

## 出力形式
- 重要度（Critical/High/Medium/Low）
- 対象ファイルと行番号
- 問題の説明
- 修正案`}
              language="markdown"
            />
            <CodeBlock
              code={`# セッション内でカスタムエージェントを呼び出す
> @security-reviewer で src/auth/ 配下のコードをレビューして

# 複数の観点でレビューを並列実行
> @security-reviewer と @performance-reviewer で
> 今回の変更（git diff HEAD~1）をレビューして`}
              language="bash"
            />
          </section>

          {/* スクリーンショットベースの UI デバッグ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <MonitorCheck className="text-[var(--claude-primary)]" />
              スクリーンショットベースの UI デバッグ
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code はマルチモーダル対応のため、UI のスクリーンショットを直接解析できます。視覚的なバグの特定や、デザインモックとの差分確認に有効です。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">ターミナルへの画像ペースト</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">スクリーンショットをクリップボードからターミナルにペーストすると、画像として認識されます。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">MCP スクリーンショットツール</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Puppeteer 等の MCP サーバを接続すれば、ブラウザのスクリーンショットを自動取得できます。</p>
              </div>
            </div>
            <CodeBlock
              code={`# 画像を直接ペーストしてバグを報告
> [スクリーンショットをペースト]
> このモーダルのレイアウトが崩れている。
> ボタンが画面外にはみ出しているので修正して。

# MCP (Puppeteer) を使った自動スクリーンショット
> http://localhost:3000/dashboard のスクリーンショットを撮って、
> デザインモック（@designs/dashboard.png）と比較して、
> 差異があれば修正して。

# レスポンシブの確認
> http://localhost:3000 を幅 375px（iPhone SE）で
> スクリーンショットを撮って、レイアウトの問題を報告して。`}
              language="bash"
            />
            <InfoBox type="info" title="視覚的な修正ループ">
              「スクリーンショットを撮って確認 → 問題を修正 → 再度スクリーンショットで確認」のループを Claude Code に任せることで、UI の仕上げを自動化できます。
            </InfoBox>
          </section>

          {/* ファンアウト */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <GitFork className="text-[var(--claude-primary)]" />
              ファンアウト: 大規模移行での並列処理
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              大量のファイルを変更する移行作業（APIバージョンアップ、フレームワーク移行等）では、複数の Claude Code インスタンスを並列に実行するファンアウトパターンが効果的です。
            </p>
            <CodeBlock
              code={`# Git worktree を使った並列作業

# メインのworktreeで計画を立てる
$ claude
> React Router v5 → v6 の移行計画を作って。
> ファイルをモジュールごとにグループ分けして。

# 各モジュールを別々のworktreeで並列に移行
$ git worktree add ../migration-auth -b migrate/auth
$ git worktree add ../migration-dashboard -b migrate/dashboard
$ git worktree add ../migration-settings -b migrate/settings

# tmux で3ペインを開いて並列実行
# ペイン1:
$ cd ../migration-auth && claude
> src/auth/ 配下のコンポーネントを React Router v6 に移行して。

# ペイン2:
$ cd ../migration-dashboard && claude
> src/dashboard/ 配下のコンポーネントを React Router v6 に移行して。

# ペイン3:
$ cd ../migration-settings && claude
> src/settings/ 配下のコンポーネントを React Router v6 に移行して。`}
              language="bash"
            />
            <div className="mt-6 space-y-3">
              {[
                { step: '1. 計画フェーズ', desc: 'メインセッションで移行計画を立て、作業をモジュール単位に分割する。' },
                { step: '2. 分岐フェーズ', desc: 'Git worktree で独立した作業ディレクトリを作成し、各ブランチで並行作業する。' },
                { step: '3. 実行フェーズ', desc: '各 worktree で Claude Code を起動し、担当モジュールの移行を実行する。' },
                { step: '4. 統合フェーズ', desc: '各ブランチの変更をメインブランチにマージし、統合テストを実行する。' },
              ].map(item => (
                <div key={item.step} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <span className="text-[var(--claude-primary)] font-bold text-xs min-w-[120px] shrink-0">{item.step}</span>
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
            <InfoBox type="warning" title="コンフリクトに注意">
              並列作業では共有ファイル（ルーティング定義、型定義等）の変更がコンフリクトしやすくなります。共有ファイルの変更は1つのセッションにまとめるか、統合フェーズで手動解決する計画を立てましょう。
            </InfoBox>
          </section>

          {/* デバッグ戦略まとめ */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4">デバッグ戦略の選択ガイド</h2>
            <div className="space-y-3">
              {[
                { situation: 'テストで再現できるバグ', strategy: 'テスト駆動フロー（テスト → 修正 → 確認の自動ループ）' },
                { situation: 'セキュリティ関連の懸念', strategy: 'Subagent レビュー（専用エージェントで重点チェック）' },
                { situation: 'UI のレイアウト崩れ', strategy: 'スクリーンショットベースデバッグ（視覚的な確認ループ）' },
                { situation: '大規模な移行作業', strategy: 'ファンアウトパターン（worktree + 並列セッション）' },
                { situation: '原因不明のエラー', strategy: '根本原因分析プロンプティング（データフロー追跡）' },
                { situation: '実装の品質検証', strategy: 'Writer/Reviewer パターン（セッション分離）' },
              ].map(item => (
                <div key={item.situation} className="flex items-start gap-4 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-sm font-bold min-w-[180px] shrink-0">{item.situation}</span>
                  <span className="text-sm text-muted-foreground">{item.strategy}</span>
                </div>
              ))}
            </div>
          </section>
          <CodingChallenge
            preview
            previewType="markdown"
            title="セキュリティレビュー用のカスタムエージェントを作ろう"
            description=".claude/agents/ に配置するセキュリティレビュー専用のカスタムエージェント定義を書いてください。チェック項目と出力形式を明確に定義しましょう。"
            initialCode={`# .claude/agents/security-reviewer.md\n\n---\ntools:\n  # 読み取り用ツールのみ指定\nmodel:\n  # コスト効率の良いモデル\n---\n\n# エージェントの役割と手順を書いてください`}
            answer={`# .claude/agents/security-reviewer.md\n\n---\ntools:\n  - Read\n  - Glob\n  - Grep\nmodel: sonnet\n---\n\nセキュリティ観点でコードをレビューするエージェントです。\n\n## チェック項目\n1. 入力バリデーションの漏れ\n2. SQLインジェクション/XSSの可能性\n3. 認証・認可の不備\n4. 機密情報のハードコーディング\n5. 依存パッケージの既知の脆弱性\n\n## 出力形式\n- 重要度（Critical/High/Medium/Low）\n- 対象ファイルと行番号\n- 問題の説明\n- 修正案`}
            hints={[
              'レビュー用エージェントは Read, Glob, Grep のみで十分です',
              'チェック項目を具体的にリストアップすると精度が向上します',
              '出力形式を定義しておくとレビュー結果が統一されます',
            ]}
            keywords={['tools', 'Read', 'セキュリティ', '重要度']}
          />
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
