import { Settings, Terminal } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function TmuxpAutomation() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-500 text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />

          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            tmuxp による環境のコード化
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            tmuxp によるセッション構成のコード化と、開発環境の宣言的な管理。
          </p>
        </div>

        <div className="space-y-16 mt-8">
          {/* tmuxp Setup */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Settings className="text-[var(--claude-primary)]" />
              宣言的な環境管理
            </h2>
            <p className="leading-relaxed mb-8 text-muted-foreground">
              <strong>tmuxp</strong> を使用することで、画面分割や起動コマンドをYAMLファイルとして定義し、一貫した開発環境を瞬時に再現できます。
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[var(--claude-primary)]" />
                <span className="text-sm font-bold text-muted-foreground font-mono">.tmuxp.yaml</span>
              </div>
              <CodeBlock
                code={`session_name: ai-dev-env
windows:
  - window_name: main
    layout: main-vertical
    options:
      main-pane-width: 60%
    panes:
      - shell_command:
          - cd ~/projects/my-app && claude
      - shell_command:
          - cd ~/projects/my-app && npm run dev
      - shell_command:
          - cd ~/projects/my-app && git log --oneline -10`}
                language="yaml"
              />
              <p className="text-sm text-muted-foreground mt-4">
                <code>tmuxp load .</code> を実行するだけで、定義に基づいたセッションが立ち上がります。
              </p>
            </div>
          </section>

          {/* MCP事前設定との組み合わせ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="text-[var(--claude-primary)]" />
              MCPサーバとの組み合わせ
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              MCPサーバは <code>claude mcp add</code> で事前登録しておけば、tmuxp のYAML内では単に <code>claude</code> を起動するだけで自動接続されます。
            </p>
            <CodeBlock code={`# MCPサーバの事前登録（プロジェクトスコープ）
$ claude mcp add -s project github-server \\
    -- npx -y @modelcontextprotocol/server-github
$ claude mcp add -s project postgres \\
    -- npx -y @mcp/server-postgres

# 以降は tmuxp load . で環境起動時に自動接続`} language="bash" />
            <InfoBox type="info" title="プロジェクトスコープの活用">
              <code>-s project</code> で登録すると <code>.mcp.json</code> に保存され、Git管理でチーム共有可能です。tmuxp.yaml と合わせて、開発環境全体をコード化できます。
            </InfoBox>
          </section>

          {/* メリット */}
          <section className="p-8 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
            <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-4 flex items-center gap-3">
              自動化のメリット
            </h2>
            <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed text-sm">
              tmux で「作業空間」を固定し、tmuxp で「環境」を構成管理し、Skills と Hooks で「AI」の動作を規定する。
              この組み合わせにより、エンジニアは環境構築やボイラープレートの生成から解放され、より本質的な設計判断に集中できます。
            </p>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="tmuxp の YAML 設定を書こう"
            description="tmuxp で AI 開発環境を定義する .tmuxp.yaml を書いてください。Claude Code、開発サーバー、テスト実行の3ペインレイアウトを定義しましょう。"
            initialCode={`# .tmuxp.yaml\nsession_name: my-project\nwindows:\n  - window_name: main\n    layout: main-vertical\n    panes:\n      # ここにペイン設定を書いてください`}
            answer={`# .tmuxp.yaml\nsession_name: my-project\nwindows:\n  - window_name: main\n    layout: main-vertical\n    options:\n      main-pane-width: 60%\n    panes:\n      - shell_command:\n          - cd ~/projects/my-app && claude\n      - shell_command:\n          - cd ~/projects/my-app && npm run dev\n      - shell_command:\n          - cd ~/projects/my-app && npm test -- --watch`}
            hints={[
              'panes の各項目に shell_command でコマンドを指定します',
              'options の main-pane-width でメインペインの幅を設定できます',
              'tmuxp load . でこの設定ファイルからセッションを起動します',
            ]}
            keywords={['session_name', 'panes', 'shell_command', 'claude']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
