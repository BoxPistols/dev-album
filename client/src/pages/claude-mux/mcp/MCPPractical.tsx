import { Figma, Globe, Code, BookOpen, Bug, Database, Terminal, Paintbrush, Package, AtSign, Gauge } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function MCPPractical() {
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
            実践的な MCP 連携
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            Figma、Context7、Serena など、実際の開発で活用される主要MCPサーバの紹介。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* デザイン→コード */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Paintbrush className="text-[var(--claude-primary)]" />
              デザイン → コード
            </h2>

            {/* Figma MCP */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Figma className="w-6 h-6 text-[#F24E1E]" />
                <h3 className="font-bold text-lg">Figma MCP</h3>
                <span className="text-[12px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">公式</span>
                <span className="text-[12px] font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">HTTP</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                FigmaのデザインファイルからコードやUIコンポーネントを生成します。デザイン変数、レイアウト情報、Code Connect連携に対応。OAuth認証で接続。
              </p>
              <CodeBlock code={`# リモートサーバ（推奨・デスクトップアプリ不要）
$ claude mcp add --transport http figma https://mcp.figma.com/mcp

# 認証: セッション内で /mcp → figma → Authenticate`} language="bash" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-muted-foreground">
                  <span className="font-bold block mb-1">デザインコンテキスト取得</span>
                  フレーム・変数・コンポーネント情報を抽出
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-muted-foreground">
                  <span className="font-bold block mb-1">Code Connect</span>
                  既存コードベースのコンポーネントを再利用した出力
                </div>
              </div>
            </div>
          </section>

          {/* ドキュメント参照 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <BookOpen className="text-[var(--claude-primary)]" />
              ドキュメント参照
            </h2>

            {/* Context7 */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-blue-500" />
                <h3 className="font-bold text-lg">Context7</h3>
                <span className="text-[12px] font-medium px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">@upstash/context7-mcp</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                ライブラリのバージョン固有ドキュメントとコード例をソースから直接取得します。LLMの学習データが古くなる問題を解決し、最新APIのハルシネーションを防止します。
              </p>
              <CodeBlock code={`# セットアップ
$ claude mcp add --scope user context7 -- npx -y @upstash/context7-mcp

# 使い方: プロンプトに "use context7" を含めるだけ
> Next.js 15のApp Routerでページを作って (use context7)`} language="bash" />
              <InfoBox type="info" title="APIキー">
                APIキーなしでも動作しますが、レート制限が厳しいため <a href="https://context7.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline">context7.com/dashboard</a> での無料取得を推奨します。
              </InfoBox>
            </div>
          </section>

          {/* コード理解 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Code className="text-[var(--claude-primary)]" />
              コード理解・ナビゲーション
            </h2>

            {/* Serena */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Code className="w-6 h-6 text-emerald-500" />
                <h3 className="font-bold text-lg">Serena</h3>
                <span className="text-[12px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">LSPベース</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Language Server Protocol（LSP）を活用し、30+言語に対してシンボルレベルのコード理解を提供します。ファイル全体を読まずにシンボル単位で精密にコードを操作可能。
              </p>
              <CodeBlock code={`# セットアップ（uvが必要）
$ claude mcp add serena -- uvx \\
    --from git+https://github.com/oraios/serena \\
    serena start-mcp-server --context claude-code --project "$(pwd)"`} language="bash" />
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-muted-foreground">
                  <code className="text-[var(--claude-primary)]">find_symbol</code>
                  <p className="mt-1">シンボルの定義を検索</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-muted-foreground">
                  <code className="text-[var(--claude-primary)]">find_referencing_symbols</code>
                  <p className="mt-1">参照箇所を全て検出</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-muted-foreground">
                  <code className="text-[var(--claude-primary)]">insert_after_symbol</code>
                  <p className="mt-1">シンボル前後にコード挿入</p>
                </div>
              </div>
            </div>
          </section>

          {/* ブラウザ自動化 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Globe className="text-[var(--claude-primary)]" />
              ブラウザ自動化
            </h2>

            {/* Playwright MCP */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Terminal className="w-6 h-6 text-green-500" />
                <h3 className="font-bold text-lg">Playwright MCP</h3>
                <span className="text-[12px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">Microsoft公式</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                アクセシビリティツリーを活用したブラウザ自動化。スクリーンショットベースではなく構造化データで動作するため、ビジョンモデル不要で高速・確定的に動作します。Chromium / Firefox / WebKit対応。
              </p>
              <CodeBlock code={`$ claude mcp add playwright -- npx @playwright/mcp@latest`} language="bash" />
            </div>
          </section>

          {/* 監視・バックエンド */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Database className="text-[var(--claude-primary)]" />
              監視・バックエンド連携
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Bug className="w-5 h-5 text-[#362D59]" />
                  <h4 className="font-bold">Sentry MCP</h4>
                  <span className="text-[12px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">HTTP</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">エラー・イシュー検索、Seer AI分析、リリース管理にLLMから直接アクセス。</p>
                <code className="text-[12px] text-muted-foreground font-mono block bg-slate-50 dark:bg-slate-800 p-2 rounded">claude mcp add --transport http sentry https://mcp.sentry.dev/mcp</code>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-5 h-5 text-emerald-500" />
                  <h4 className="font-bold">Supabase MCP</h4>
                  <span className="text-[12px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">HTTP</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">DB操作、マイグレーション、Edge Functions、ログ解析をAIから直接実行。</p>
                <code className="text-[12px] text-muted-foreground font-mono block bg-slate-50 dark:bg-slate-800 p-2 rounded">claude mcp add --transport http supabase https://mcp.supabase.com/mcp</code>
              </div>
            </div>
          </section>

          {/* 指示の具体例 */}
          <section>
            <h2 className="text-3xl font-bold mb-6">実践的なプロンプト例</h2>
            <div className="space-y-4">
              <div className="p-5 bg-slate-900 rounded-xl border border-slate-700">
                <p className="text-[12px] text-slate-500 mb-2 font-mono">Figma MCP + Context7</p>
                <div className="text-emerald-400 font-mono text-sm leading-relaxed">
                  &gt; この Figma URL のデザインを React コンポーネントとして実装して (use context7)<br/>
                  &gt; https://figma.com/design/xxxxx?node-id=1-2
                </div>
              </div>
              <div className="p-5 bg-slate-900 rounded-xl border border-slate-700">
                <p className="text-[12px] text-slate-500 mb-2 font-mono">Sentry MCP</p>
                <div className="text-emerald-400 font-mono text-sm leading-relaxed">
                  &gt; Sentry の未解決エラーを確認して、最も発生頻度の高い問題を修正して
                </div>
              </div>
              <div className="p-5 bg-slate-900 rounded-xl border border-slate-700">
                <p className="text-[12px] text-slate-500 mb-2 font-mono">Playwright MCP</p>
                <div className="text-emerald-400 font-mono text-sm leading-relaxed">
                  &gt; localhost:3000 のログインフォームをテストして、バリデーションが正しく動くか確認して
                </div>
              </div>
            </div>
          </section>

          {/* OAuth認証 */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4">HTTP MCPとOAuth認証</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Figma、Sentry、SupabaseなどのHTTPリモートサーバは、OAuth認証フローに対応しています。セッション内で <code>/mcp</code> コマンドからインタラクティブに認証を完了できます。
            </p>
            <InfoBox type="info" title="セキュリティ">
              MCP経由の外部サービス呼び出しは、パーミッション設定の対象です。<code>settings.json</code> の <code>allow/deny</code> ルールで <code>mcp__サーバ名__*</code> パターンを使用して制御できます。
            </InfoBox>
          </section>

          {/* /plugins によるインストール */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Package className="text-[var(--claude-primary)]" />
              /plugins でMCPサーバをインストール
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              <code>/plugins</code> コマンドで、MCPサーバのマーケットプレイスからサーバを検索・インストールできます。CLIコマンドを手動で入力する必要がありません。
            </p>
            <CodeBlock code={`# セッション内で /plugins を実行
> /plugins

# マーケットプレイスが表示される
# カテゴリ別にサーバを検索
# 選択するだけでインストール完了`} language="bash" />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-muted-foreground">
                <span className="font-bold block mb-1">カテゴリ検索</span>
                デザイン、DB、モニタリング等のカテゴリからサーバを探せる
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-muted-foreground">
                <span className="font-bold block mb-1">ワンクリック設定</span>
                サーバの追加・認証設定を自動で処理
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-muted-foreground">
                <span className="font-bold block mb-1">スコープ選択</span>
                インストール時にlocal/project/userスコープを選択可能
              </div>
            </div>
          </section>

          {/* @ プレフィックスでリソース参照 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <AtSign className="text-[var(--claude-primary)]" />
              @ でMCPリソースを参照
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              MCPサーバが公開するリソース（ドキュメント、スキーマ、設定ファイルなど）は、プロンプト内で <code>@</code> を入力するとオートコンプリートに表示されます。選択したリソースがコンテキストとして渡されます。
            </p>
            <div className="space-y-4">
              <div className="p-5 bg-slate-900 rounded-xl border border-slate-700">
                <p className="text-[12px] text-slate-500 mb-2 font-mono">リソース参照の例</p>
                <div className="text-emerald-400 font-mono text-sm leading-relaxed">
                  &gt; @ と入力 → オートコンプリートでリソース一覧が表示<br />
                  &gt; @supabase/schema を参照して、usersテーブルにCRUDのAPIを作成して<br />
                  &gt; @sentry/recent-errors の内容を確認して、対処方針を提案して
                </div>
              </div>
              <InfoBox type="info" title="リソース対応の確認">
                全てのMCPサーバがリソースを公開しているわけではありません。<code>/mcp</code> コマンドで各サーバの対応リソースを確認できます。
              </InfoBox>
            </div>
          </section>

          {/* 多数のMCPサーバの管理 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Gauge className="text-[var(--claude-primary)]" />
              多数のMCPサーバの管理
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              MCPサーバを増やすほどツール定義がコンテキストウィンドウを消費します。以下の方法でバランスを取ります。
            </p>
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <h4 className="font-bold mb-2">Tool Search（遅延ロード）を活用する</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  ツール数が多い場合、Claude Codeは自動的にTool Searchを使用します。全ツールを事前にロードせず、必要なときだけオンデマンドで検索・取得するため、コンテキストを節約できます。
                </p>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-muted-foreground font-mono">
                  例: 200以上のツールが登録されていても、実際に使う5-10個だけがロードされる
                </div>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <h4 className="font-bold mb-2">スコープで使い分ける</h4>
                <p className="text-xs text-muted-foreground">
                  汎用ツール（Context7など）は <code>user</code> スコープ、プロジェクト固有のサーバは <code>project</code> または <code>local</code> スコープに分けると管理しやすくなります。不要なサーバはプロジェクトごとにロードされません。
                </p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <h4 className="font-bold mb-2">環境変数で調整する</h4>
                <p className="text-xs text-muted-foreground">
                  サーバ起動が遅い場合は <code>MCP_TIMEOUT</code>、大量データを返すツールがある場合は <code>MAX_MCP_OUTPUT_TOKENS</code> で調整します。
                </p>
                <CodeBlock code={`# タイムアウト延長 + 出力トークン上限の引き上げ
$ MCP_TIMEOUT=15000 MAX_MCP_OUTPUT_TOKENS=50000 claude`} language="bash" />
              </div>
            </div>
            <InfoBox type="warning" title="サーバ数の目安">
              同時に接続するMCPサーバは10個程度までが実用的です。それ以上はTool Searchがあっても起動時間やメモリ使用量に影響します。不要なサーバは <code>claude mcp remove</code> で整理しましょう。
            </InfoBox>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="MCP サーバをセットアップしよう"
            description="プロジェクトで使用する MCP サーバの登録コマンドを書いてください。Context7（ドキュメント参照）と Playwright（ブラウザ自動化）の2つを登録しましょう。"
            initialCode={`# MCP サーバの登録コマンド\n\n# 1. Context7（ドキュメント参照）をユーザースコープで登録\nclaude ___ ___ --scope user context7 -- npx -y @upstash/context7-mcp  # ← ここを埋める\n\n# 2. Playwright（ブラウザ自動化）をプロジェクトスコープで登録\nclaude ___ ___ -s project playwright -- npx @playwright/mcp@latest  # ← ここを埋める`}
            answer={`# MCP サーバの登録コマンド\n\n# 1. Context7（ドキュメント参照）をユーザースコープで登録\nclaude mcp add --scope user context7 -- npx -y @upstash/context7-mcp\n\n# 2. Playwright（ブラウザ自動化）をプロジェクトスコープで登録\nclaude mcp add -s project playwright -- npx @playwright/mcp@latest`}
            hints={[
              'claude mcp add コマンドでサーバを登録します',
              '--scope user はユーザースコープ（全プロジェクト共通）です',
              '-s project はプロジェクトスコープ（.mcp.json に保存）です',
            ]}
            keywords={['mcp', 'add']}
          />
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
