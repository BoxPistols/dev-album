import { Share2, Layers, Monitor, PlayCircle, Zap } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function TmuxIntegration() {
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
            tmux との統合 (AI Cockpit)
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            エージェントの動作監視と実行環境の分離を、tmux のペイン管理で実現するワークフロー。
          </p>
        </div>

        <div className="space-y-16 mt-8">
          {/* tmuxの利点 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Layers className="text-[var(--claude-primary)]" />
              tmux を利用する技術的な利点
            </h2>
            <p className="leading-relaxed mb-8 text-muted-foreground">
              自律型エージェントとの協調において、ターミナルマルチプレクサーは監視と検証のプロセスを簡略化します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'プロセスの分離', desc: 'エージェントの出力を独立したペインで表示し、実行ログと並列化する。' },
                { title: 'セッションの継続', desc: 'ネットワーク切断時もAIのバックグラウンドタスクを停止させない。' },
                { title: 'コンテキストの多重化', desc: '複数のウィンドウで異なる開発コンテキストを並行して管理する。' },
              ].map(item => (
                <div key={item.title} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-[var(--claude-primary)] mb-2">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* MCP連携 */}
          <section className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Share2 size={120} className="text-[var(--claude-primary)]" />
            </div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-[var(--claude-primary)]">
              <Share2 />
              MCP (Model Context Protocol) 連携
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              MCPサーバを事前に登録しておけば、Claude Code起動時に自動で接続されます。
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="text-sm font-bold flex items-center gap-2 mb-2 text-[var(--claude-primary)]">
                  <Zap className="w-4 h-4 fill-current" />
                  事前設定で自動接続
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <code>claude mcp add</code> で登録済みのサーバは、次回 <code>claude</code> 起動時に自動で利用可能になります。
                </p>
              </div>
              <CodeBlock
                code={`# MCPサーバを事前登録（一度だけ実行）
$ claude mcp add --transport stdio github-server \\
    -- npx -y @modelcontextprotocol/server-github

# 以降は claude を起動するだけでGitHub MCPが利用可能
$ claude`}
                language="bash"
              />
            </div>
          </section>

          {/* 推奨レイアウト */}
          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Monitor className="text-[var(--claude-primary)]" />
              推奨ペインレイアウト
            </h2>
            <p className="leading-relaxed mb-8 text-muted-foreground">
              一つのセッション内で、役割に応じて画面を分割します。
            </p>

            <div className="border border-slate-300 dark:border-slate-700 rounded-2xl p-6 bg-slate-100 dark:bg-slate-950 aspect-video flex gap-4 shadow-xl">
              {/* Left: Claude (Control) */}
              <div className="w-3/5 bg-slate-900 rounded-xl flex flex-col border border-slate-700 overflow-hidden ring-4 ring-[var(--claude-primary)] ring-opacity-20">
                <div className="bg-slate-800 px-4 py-2 border-b border-slate-700">
                  <span className="text-[10px] text-slate-400 font-mono">claude-code (primary)</span>
                </div>
                <div className="flex-1 p-4 font-mono text-xs space-y-3">
                  <div className="text-emerald-400">&gt; Fix unit tests in /src/auth</div>
                  <div className="text-slate-400">Analyzing test results...</div>
                  <div className="text-[var(--claude-primary)]">Tool Use: exec_command('npm test')</div>
                </div>
              </div>

              {/* Right: Monitoring */}
              <div className="w-2/5 flex flex-col gap-4">
                <div className="h-1/2 bg-slate-800 rounded-xl flex flex-col border border-slate-700 overflow-hidden">
                  <div className="bg-slate-700 px-3 py-1 border-b border-slate-600 text-[9px] text-slate-400 font-mono">
                    Dev Server Logs
                  </div>
                  <div className="flex-1 p-3 font-mono text-[9px] text-slate-500">
                    [VITE] HMR update: src/auth/service.ts<br/>
                    [DB] Connection pool established
                  </div>
                </div>
                <div className="h-1/2 bg-slate-800 rounded-xl flex flex-col border border-slate-700 overflow-hidden">
                  <div className="bg-slate-700 px-3 py-1 border-b border-slate-600 text-[9px] text-slate-400 font-mono">
                    System Shell / Git
                  </div>
                  <div className="flex-1 p-3 font-mono text-[9px] text-slate-500">
                    $ git diff --stat<br/>
                    $ _
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 運用サイクル */}
          <section>
            <h2 className="text-3xl font-bold mb-8">運用の基本サイクル</h2>
            <div className="space-y-6">
              {[
                {
                  icon: <PlayCircle className="text-emerald-500" />,
                  step: '1. 命令の定義 (Instruct)',
                  text: 'Claude に対して具体的な目標（機能追加、リファクタリング、バグ修正）を提示します。'
                },
                {
                  icon: <Zap className="text-amber-500" />,
                  step: '2. プロセスの監視 (Monitor)',
                  text: '別のペインで実行ログやファイルの変更を監視し、エージェントの推論結果を確認します。'
                },
                {
                  icon: <Monitor className="text-blue-500" />,
                  step: '3. 手動検証 (Verify)',
                  text: '生成されたコードに対し、手動でのテスト実行や動作確認をクイックに行います。'
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 shadow-sm">
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold mb-1">{item.step}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="AI Cockpit のペインレイアウトを作ろう"
            description="tmux で Claude Code の AI Cockpit レイアウトを手動で構築するコマンドを書いてください。メインペインに Claude Code、右側にサーバーログとシェルを配置します。"
            initialCode={`# AI Cockpit レイアウトの構築\n\n# 1. セッションを作成\n\n# 2. 左右にペインを分割（Claude Code | 監視エリア）\n\n# 3. 右側ペインを上下に分割（ログ / シェル）\n\n# 4. 左ペインで Claude Code を起動\n\n# 5. 右上ペインで開発サーバーを起動`}
            answer={`# AI Cockpit レイアウトの構築\n\n# 1. セッションを作成\ntmux new-session -s dev\n\n# 2. 左右にペインを分割（Claude Code | 監視エリア）\ntmux split-window -h\n\n# 3. 右側ペインを上下に分割（ログ / シェル）\ntmux split-window -v\n\n# 4. 左ペインで Claude Code を起動\ntmux select-pane -t 0\nclaude\n\n# 5. 右上ペインで開発サーバーを起動\ntmux select-pane -t 1\nnpm run dev`}
            hints={[
              'split-window -h で左右分割、-v で上下分割です',
              'select-pane -t でペイン番号を指定して移動します',
              'ペイン番号は 0 から始まります',
            ]}
            keywords={['split-window', 'select-pane', 'claude', 'npm run dev']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
