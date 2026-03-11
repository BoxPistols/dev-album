import { Terminal, History, Settings, BarChart3, Wrench, MessageSquare } from 'lucide-react';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function SlashCommands() {
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
            スラッシュコマンド
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            Claude CodeのREPL内で使用できるビルトインコマンドの全一覧。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* コア操作コマンド */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="text-[var(--claude-primary)]" />
              コア操作コマンド
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              日常的に最も使用頻度の高いコマンドです。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { cmd: '/help', desc: '利用可能な全コマンドの一覧とヘルプを表示します。' },
                { cmd: '/init', desc: 'プロジェクトルートに CLAUDE.md を生成し、エージェントの初期設定を行います。' },
                { cmd: '/clear', desc: '会話履歴を完全にクリアし、新しいセッションを開始します。タスク切替時に有用。' },
                { cmd: '/compact [focus]', desc: '会話履歴を要約してコンテキストを圧縮します。オプションでフォーカス指示を追加可能。' },
                { cmd: '/model', desc: 'AIモデルを切替えます。Opus使用時はeffort levelも調整可能。' },
                { cmd: '/exit (/quit)', desc: 'REPLを終了してシェルに戻ります。Ctrl+D でも終了可能。' },
              ].map(item => (
                <div key={item.cmd} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <code className="text-[var(--claude-primary)] font-bold text-sm">{item.cmd}</code>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* セッション管理 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <History className="text-[var(--claude-primary)]" />
              セッション管理
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              複数の作業を並行して行う際に有用な、セッションの保存・復元コマンドです。
            </p>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { cmd: '/resume [session]', desc: 'IDまたは名前で過去のセッションを再開します。引数なしでセッションピッカーを表示。' },
                  { cmd: '/rename <name>', desc: '現在のセッションに識別しやすい名前を付けます。' },
                  { cmd: '/export [filename]', desc: '対話履歴をファイルまたはクリップボードに出力します。' },
                  { cmd: '/copy', desc: '最後のアシスタント応答をクリップボードにコピーします。' },
                  { cmd: '/rewind', desc: '会話やコードを以前のポイントに巻き戻します。' },
                ].map(item => (
                  <div key={item.cmd} className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                    <code className="text-[var(--claude-primary)] font-bold text-sm min-w-[160px] shrink-0">{item.cmd}</code>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* コスト・コンテキスト監視 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <BarChart3 className="text-[var(--claude-primary)]" />
              コスト・コンテキスト監視
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">/cost</code>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">現在のセッションで消費した<strong>トークン量と料金見積もり</strong>を表示します。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">/usage</code>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed"><strong>サブスクリプションプランの使用制限</strong>とレート制限ステータスを表示します。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">/context</code>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">現在のコンテキスト使用量を<strong>カラーグリッド</strong>で視覚的に表示します。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">/stats</code>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">日次使用量、セッション履歴、モデル使用傾向をダッシュボード表示します。</p>
              </div>
            </div>
            <InfoBox type="info" title="/cost と /usage の違い">
              <code>/cost</code> は現在のセッションのAPI消費量（トークン・金額）を表示し、<code>/usage</code> はサブスクリプションプラン全体の残り容量を確認するコマンドです。目的が異なるので混同に注意してください。
            </InfoBox>
          </section>

          {/* 設定・診断 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Settings className="text-[var(--claude-primary)]" />
              設定・診断
            </h2>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { cmd: '/config', desc: 'モデル選択、パーミッション、通知など各種設定のUIを開きます。' },
                  { cmd: '/permissions', desc: 'パーミッション設定（allow/deny/askルール）を表示・変更します。' },
                  { cmd: '/allowed-tools', desc: '現在許可/拒否されているツール（Bashコマンド等）の一覧を表示します。' },
                  { cmd: '/memory', desc: 'CLAUDE.mdメモリファイルをエディタで開いて編集します。' },
                  { cmd: '/mcp', desc: 'MCPサーバーの接続管理やOAuth認証を行います。' },
                  { cmd: '/doctor', desc: 'Claude Codeのインストール状態を診断（ヘルスチェック）します。' },
                  { cmd: '/debug [desc]', desc: 'セッションのデバッグログを読み込んでトラブルシュートします。' },
                  { cmd: '/status', desc: 'バージョン、モデル、アカウント、接続状態を一覧表示します。' },
                  { cmd: '/theme', desc: 'Claude Codeのカラーテーマを変更します。' },
                  { cmd: '/terminal-setup', desc: 'Shift+Enter等のキーバインドをターミナルにインストールします。' },
                ].map(item => (
                  <div key={item.cmd} className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                    <code className="text-[var(--claude-primary)] font-bold text-sm min-w-[160px] shrink-0">{item.cmd}</code>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 開発ワークフロー */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Wrench className="text-[var(--claude-primary)]" />
              開発ワークフロー
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { cmd: '/review', desc: 'PRのコードレビュー分析を実行します。' },
                { cmd: '/pr-comments', desc: 'GitHub PRのコメントを取得・表示します。' },
                { cmd: '/plan', desc: 'プランモードに入り、分析のみ（変更なし）で計画を立案します。' },
                { cmd: '/todos', desc: '現在のTODOアイテムの一覧を表示します。' },
                { cmd: '/tasks', desc: 'バックグラウンドで実行中のタスクを一覧・管理します。' },
                { cmd: '/vim', desc: 'Vim編集モードのON/OFFを切り替えます。' },
              ].map(item => (
                <div key={item.cmd} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <code className="text-[var(--claude-primary)] font-bold text-sm">{item.cmd}</code>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* その他のコマンド */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <MessageSquare className="text-[var(--claude-primary)]" />
              その他のユーティリティ
            </h2>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { cmd: '/login (/logout)', desc: 'Anthropicアカウントの認証/サインアウトを行います。' },
                  { cmd: '/desktop', desc: '現在のCLIセッションをClaude Code Desktopアプリへ引き継ぎます。' },
                  { cmd: '/teleport', desc: 'claude.aiのリモートセッションをローカルターミナルで再開します（サブスク者限定）。' },
                  { cmd: '/ide', desc: 'IDE統合（VS Code, Cursor等）を管理します。' },
                  { cmd: '/hooks', desc: 'Hooks設定をインタラクティブに管理します。' },
                  { cmd: '/add-dir', desc: '追加ディレクトリをコンテキストに含めます。' },
                  { cmd: '/bug', desc: 'Claude Codeに関するフィードバックをAnthropicに送信します。' },
                  { cmd: '/release-notes', desc: 'Claude Codeの最新チェンジログを表示します。' },
                ].map(item => (
                  <div key={item.cmd} className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                    <code className="text-[var(--claude-primary)] font-bold text-sm min-w-[160px] shrink-0">{item.cmd}</code>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* カスタムコマンド */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4">カスタムコマンド</h2>
            <p className="text-sm text-muted-foreground mb-6">
              ビルトインコマンドに加え、独自のスラッシュコマンドを定義できます。
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm mb-1">プロジェクトコマンド</h4>
                <p className="text-xs text-muted-foreground"><code>.claude/commands/</code> にMarkdownファイルを配置 → <code>/project:コマンド名</code> で呼び出し。チーム共有可能。</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm mb-1">ユーザーコマンド</h4>
                <p className="text-xs text-muted-foreground"><code>~/.claude/commands/</code> にMarkdownファイルを配置 → <code>/user:コマンド名</code> で呼び出し。全プロジェクトで使用可能。</p>
              </div>
            </div>
          </section>

          {/* クイック入力 */}
          <section className="p-8 rounded-2xl border border-[var(--claude-primary)]/20 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4 text-[var(--claude-primary)]">クイック入力プレフィックス</h2>
            <p className="text-sm text-muted-foreground mb-6">
              REPL内でプロンプトの先頭に特定の文字を入力することで、素早い操作が可能です。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                <code className="text-2xl font-bold text-[var(--claude-primary)]">/</code>
                <p className="text-xs text-muted-foreground mt-2">コマンド / Skill呼び出し</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                <code className="text-2xl font-bold text-[var(--claude-primary)]">!</code>
                <p className="text-xs text-muted-foreground mt-2">Bashモード（直接シェル実行）</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                <code className="text-2xl font-bold text-[var(--claude-primary)]">@</code>
                <p className="text-xs text-muted-foreground mt-2">ファイルパス補完</p>
              </div>
            </div>
          </section>

          <CodingChallenge
            preview
            previewType="terminal"
            title="カスタムコマンドを作成しよう"
            description="プロジェクトの .claude/commands/ ディレクトリに配置するカスタムスラッシュコマンドのMarkdownファイルを書いてください。コードレビューを実行するコマンドで、セキュリティとパフォーマンスの観点からレビューを行い、結果をマークダウンで出力するものです。"
            initialCode={`# review.md - /project:review で呼び出されるコマンド\n\n# ここにプロンプトを書いてください`}
            answer={`# review.md - /project:review で呼び出されるコマンド\n\ngit diff HEAD~1 の変更をレビューしてください。\n\n## レビュー観点\n1. セキュリティ: 入力バリデーション、認証・認可の不備\n2. パフォーマンス: N+1クエリ、不要な再レンダリング\n\n## 出力形式\n- 重要度（High/Medium/Low）\n- 対象ファイルと行番号\n- 問題の説明と修正案`}
            hints={[
              'カスタムコマンドはMarkdownファイルで、内容がそのままプロンプトとして送信されます',
              'git diff を使って変更差分を参照するよう指示しましょう',
              'レビュー観点と出力形式を明確に定義すると効果的です',
            ]}
            keywords={['git diff', 'セキュリティ', 'パフォーマンス', 'レビュー']}
          />
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
