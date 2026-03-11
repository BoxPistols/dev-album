import { Server, Globe, FolderTree, Terminal } from 'lucide-react';
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
              MCPは「クライアント（Claude Code）」「サーバ（MCPサーバ）」「ホスト（あなたのPC）」の三者間で通信を行います。
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

# Claude Desktopの設定をインポート
$ claude mcp add-from-claude-desktop`}
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
                { scope: 'local（デフォルト）', path: '~/.claude.json', desc: '現在のプロジェクトのみで利用。個人用、非共有。' },
                { scope: 'project', path: '.mcp.json', desc: 'プロジェクトルートに配置。Git管理でチーム共有可能。' },
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
                  { cmd: 'claude mcp serve', desc: 'Claude Code自体をMCPサーバとして起動' },
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
              プロジェクトスコープのMCPサーバは、各チームメンバーが初回使用時に承認する必要があります。<code>claude mcp reset-project-choices</code> で承認をリセットできます。
            </InfoBox>
          </section>
        </div>
        <CodingChallenge
          preview
          previewType="config"
          title="MCP サーバの設定 JSON を書いてみよう"
          description="プロジェクトの .mcp.json ファイルに GitHub と Figma の MCP サーバを設定する JSON を書いてください。"
          initialCode={`{\n  "mcpServers": {\n    // GitHub MCP サーバ（stdio）を追加\n\n    // Figma MCP サーバ（stdio）を追加\n\n  }\n}`}
          answer={`{\n  "mcpServers": {\n    "github": {\n      "type": "stdio",\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"]\n    },\n    "figma": {\n      "type": "stdio",\n      "command": "npx",\n      "args": ["-y", "@anthropic/mcp-server-figma"]\n    }\n  }\n}`}
          keywords={['mcpServers', 'stdio', 'npx', 'github', 'figma']}
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
