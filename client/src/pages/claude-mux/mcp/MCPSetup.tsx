import { Server, Globe, FolderTree, Terminal, Search, AtSign, Settings } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function MCPSetup() {
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
            MCP (Model Context Protocol)
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            AIエージェントと外部ツールを接続するオープン標準プロトコルの設定。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* アーキテクチャ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Server className="text-[var(--claude-primary)]" />
              アーキテクチャの理解
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              MCPは「ホスト（Claude Code や Claude Desktop などの AI アプリ本体）」「クライアント（ホストが MCP サーバ 1 つにつき 1 つ生成し、そのサーバと 1:1 の接続を維持する内部コンポーネント）」「サーバ（MCPサーバ）」の三者で構成されます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold mb-2">stdio（ローカルプロセス）</h4>
                <p className="text-xs text-muted-foreground">ローカルで起動するプロセスとstdin/stdoutで通信。npxで実行するサーバがこのタイプです。</p>
              </div>
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold mb-2">HTTP（リモートサーバ）</h4>
                <p className="text-xs text-muted-foreground">HTTP/SSE経由でリモートサーバと通信。OAuth認証にも対応し、SaaSサービスとの連携に適しています。</p>
              </div>
            </div>
          </section>

          {/* サーバの追加方法 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="text-[var(--claude-primary)]" />
              MCPサーバの追加
            </h2>
            <p className="leading-relaxed mb-4 text-sm text-muted-foreground">
              <code>claude mcp add</code> コマンドでサーバを登録します。
            </p>
            <CodeBlock
              code={`# stdioサーバ（ローカルプロセス）を追加
$ claude mcp add --transport stdio github-server \\
    -- npx -y @modelcontextprotocol/server-github

# HTTPサーバ（リモート）を追加
$ claude mcp add --transport http my-server https://example.com/mcp

# JSON形式で追加
$ claude mcp add-json my-server '{"type":"stdio","command":"npx","args":["-y","@mcp/server"]}'

# 環境変数を渡して追加
$ claude mcp add --env API_KEY=YOUR_KEY --transport stdio my-server \\
    -- npx -y @mcp/my-server`}
              language="bash"
            />
          </section>

          {/* MCPスコープ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FolderTree className="text-[var(--claude-primary)]" />
              MCPスコープ
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              MCPサーバの設定は3つのスコープで管理できます。<code>-s</code> フラグで指定します。
            </p>
            <div className="space-y-4">
              {[
                { scope: 'local（デフォルト）', path: '~/.claude.json（プロジェクト別エントリ）', desc: '現在のプロジェクトのみ。個人用、Git 管理外。' },
                { scope: 'project', path: '.mcp.json', desc: 'プロジェクトルートに配置。Git 管理でチーム共有可能。' },
                { scope: 'user', path: '~/.claude.json', desc: '全プロジェクトで利用可能な個人設定。' },
              ].map(item => (
                <div key={item.scope} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex items-baseline gap-3 mb-1">
                    <code className="text-[var(--claude-primary)] font-bold text-sm">{item.scope}</code>
                    <code className="text-xs text-muted-foreground">{item.path}</code>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <CodeBlock code={`# projectスコープで追加（チーム共有）
$ claude mcp add -s project github-server -- npx -y @mcp/server-github

# userスコープで追加（全プロジェクト共通）
$ claude mcp add -s user my-tool -- npx -y @mcp/my-tool`} language="bash" />
          </section>

          {/* 管理コマンド */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Globe className="text-[var(--claude-primary)]" />
              MCP管理コマンド一覧
            </h2>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { cmd: 'claude mcp list', desc: '登録済みMCPサーバの一覧を表示' },
                  { cmd: 'claude mcp get <name>', desc: '特定サーバの詳細設定を表示' },
                  { cmd: 'claude mcp remove <name>', desc: 'MCPサーバを削除' },
                  { cmd: 'claude mcp login <name>', desc: 'HTTP/SSEサーバのOAuth認証をCLIから実行（logout で解除）' },
                  { cmd: '/mcp', desc: 'セッション内でMCPサーバを管理・OAuth認証' },
                ].map(item => (
                  <div key={item.cmd} className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                    <code className="text-[var(--claude-primary)] font-bold text-xs min-w-[220px] shrink-0">{item.cmd}</code>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* プロジェクト共有 */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4">チームでのMCP共有</h2>
            <p className="text-sm text-muted-foreground mb-4">
              <code>-s project</code> スコープで追加すると、プロジェクトルートに <code>.mcp.json</code> が生成されます。このファイルをGit管理することで、チームメンバー全員が同じMCPサーバ構成を使用できます。
            </p>
            <InfoBox type="info" title="初回承認">
              プロジェクトスコープのMCPサーバは、各チームメンバーが初回使用時に承認する必要があります。未承認のサーバは <code>claude mcp list</code> に「Pending approval」と表示され、対話セッションを起動すると承認できます。settings.json の <code>enableAllProjectMcpServers</code> で一括承認も可能です。
            </InfoBox>
          </section>

          {/* 環境変数 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Settings className="text-[var(--claude-primary)]" />
              環境変数によるチューニング
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              MCPサーバの起動やレスポンスに関する挙動を環境変数で制御できます。
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-baseline gap-3 mb-1">
                  <code className="text-[var(--claude-primary)] font-bold text-sm">MCP_TIMEOUT</code>
                </div>
                <p className="text-xs text-muted-foreground mb-2">MCPサーバの起動タイムアウト（ミリ秒）。サーバの初期化が遅い場合に延長します。</p>
                <CodeBlock code={`# デフォルトより長いタイムアウトで起動
$ MCP_TIMEOUT=10000 claude

# 重いサーバ（Docker起動など）向けに30秒に設定
$ MCP_TIMEOUT=30000 claude`} language="bash" />
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-baseline gap-3 mb-1">
                  <code className="text-[var(--claude-primary)] font-bold text-sm">MAX_MCP_OUTPUT_TOKENS</code>
                </div>
                <p className="text-xs text-muted-foreground mb-2">MCPツールからの出力トークン上限。既定では出力が 10,000 トークンを超えると警告が表示されます。大量のデータを返すツール（DB検索結果、ログ取得など）で有効です。</p>
                <CodeBlock code={`# 大きなレスポンスを許容する
$ MAX_MCP_OUTPUT_TOKENS=50000 claude`} language="bash" />
              </div>
            </div>
            <InfoBox type="warning" title="コンテキストウィンドウへの影響">
              <code>MAX_MCP_OUTPUT_TOKENS</code> を大きくすると、MCPツールの出力がコンテキストウィンドウを圧迫します。必要な場合のみ調整してください。
            </InfoBox>
          </section>

          {/* トランスポートプロトコル */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Globe className="text-[var(--claude-primary)]" />
              トランスポートプロトコル
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              主な通信方式は stdio と HTTP の2種類です（他に SSE / WebSocket にも対応）。サーバの種類に応じて使い分けます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold mb-2">stdio（ローカル）</h4>
                <p className="text-xs text-muted-foreground mb-3">ローカルプロセスとstdin/stdoutで通信。npxやuvxで起動するサーバ向け。認証不要で手軽に使えます。</p>
                <CodeBlock code={`$ claude mcp add my-tool \\
    -- npx -y @mcp/my-tool`} language="bash" />
              </div>
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold mb-2">HTTP（リモート）</h4>
                <p className="text-xs text-muted-foreground mb-3">HTTP/SSE経由でリモートサーバと通信。OAuth認証に対応し、Figma・Sentry等のSaaSサービスとの連携に使います。</p>
                <CodeBlock code={`$ claude mcp add \\
    --transport http \\
    figma https://mcp.figma.com/mcp`} language="bash" />
              </div>
            </div>
          </section>

          {/* MCPリソースへのアクセス */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <AtSign className="text-[var(--claude-primary)]" />
              MCPリソースへのアクセス
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              MCPサーバが公開するリソース（ファイル、ドキュメント、データなど）には、プロンプト内で <code>@サーバ名:プロトコル://リソース/パス</code> の形式でアクセスできます。<code>@</code> の入力中にオートコンプリートでリソース一覧が表示されます。
            </p>
            <div className="p-5 bg-slate-900 rounded-xl border border-slate-700 mb-4">
              <p className="text-[12px] text-slate-500 mb-2 font-mono">リソースの参照（形式: @サーバ名:プロトコル://パス）</p>
              <div className="text-emerald-400 font-mono text-sm leading-relaxed">
                &gt; @docs:file://api/authentication を読んで、認証エンドポイントの仕様を教えて<br />
                &gt; @github:issue://123 の内容を確認して修正方針を提案して
              </div>
            </div>
            <InfoBox type="info" title="リソースとツールの違い">
              リソースはMCPサーバが公開する静的・動的データで、プロンプトのコンテキストとして渡されます。ツールはモデルが呼び出すアクション（API実行、ファイル操作など）です。
            </InfoBox>
          </section>

          {/* MCP Tool Search */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Search className="text-[var(--claude-primary)]" />
              MCP Tool Search（遅延ロード）
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              MCPサーバを多数登録すると、全ツールの定義がコンテキストウィンドウを圧迫します。Tool Search機能は、全ツールを事前にロードせず、必要なときにオンデマンドで検索・ロードします。
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold mb-2 text-sm">仕組み</h4>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li>Tool Searchは既定で有効。登録ツール数に関係なく、MCPツールの定義はdeferredとして登録される</li>
                  <li>モデルが必要と判断したタイミングで <code>ToolSearch</code> を呼び出し、ツールのスキーマを取得</li>
                  <li>取得されたツールだけがコンテキストに追加され、その後通常どおり呼び出せる</li>
                  <li>ツール定義の合計がコンテキストウィンドウの10%に達したら切り替える閾値モードは既定ではなく、<code>ENABLE_TOOL_SEARCH=auto</code> でのオプトイン</li>
                </ul>
              </div>
              <InfoBox type="success" title="コンテキスト節約効果">
                10個のMCPサーバで計200以上のツールがある場合でも、実際に使うツールだけがロードされます。複雑なプロジェクトでのコンテキスト効率が大幅に向上します。
              </InfoBox>
            </div>
          </section>
        </div>
        <CodingChallenge
          preview
          previewType="config"
          title="MCP サーバの設定 JSON を書いてみよう"
          description="プロジェクトの .mcp.json ファイルに GitHub と Figma の MCP サーバを設定する JSON を書いてください。"
          initialCode={`{\n  "___": {  // ← ここを埋める（MCP設定キー）\n    "github": {\n      "type": "___",  // ← ここを埋める（通信方式）\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"]\n    },\n    "figma": {\n      "type": "___",\n      "command": "npx",\n      "args": ["-y", "figma-developer-mcp"]\n    }\n  }\n}`}
          answer={`{\n  "mcpServers": {\n    "github": {\n      "type": "stdio",\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"]\n    },\n    "figma": {\n      "type": "stdio",\n      "command": "npx",\n      "args": ["-y", "figma-developer-mcp"]\n    }\n  }\n}`}
          keywords={['mcpServers', 'stdio']}
          hints={[
            'MCPサーバは "type", "command", "args" の3プロパティで構成されます',
            'npx -y でパッケージを自動インストール・実行できます',
          ]}
        />

        <PageNavigation />
      </div>
    </div>
  );
}
