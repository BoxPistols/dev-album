import { Package, Blocks, Search, Settings, BookOpen, Plug, Download } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function PluginsEcosystem() {
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
            プラグインとエコシステム
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            Claude Code の機能を拡張するプラグインシステム。スラッシュコマンド、サブエージェント、MCP サーバー、Hooks をバンドルした軽量パッケージとして配布・管理できる。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* プラグインの概要 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Package className="text-[var(--claude-primary)]" />
              プラグインの概要
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              プラグインは、スラッシュコマンド・サブエージェント・MCP サーバー・Hooks をバンドルした軽量パッケージ。Agent Skills オープンスタンダードに準拠しており、CLI と VS Code 拡張の両方で管理できる。一方でインストールしたプラグインはもう一方でも自動的に利用可能になる。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { label: 'スラッシュコマンド', desc: 'プラグインが提供するカスタムコマンド。/plugin-name:command の形式で呼び出し、定型処理を実行' },
                { label: 'サブエージェント', desc: '特定ドメインに特化した AI エージェント。レビュー、テスト生成などの専門タスクを委譲できる' },
                { label: 'MCP サーバー', desc: '外部サービスとの接続を提供。データベース、API、クラウドサービスへのアクセスを追加' },
                { label: 'Hooks', desc: 'ライフサイクルイベントに応じた自動処理。セッション開始時のセットアップ、ツール実行前後のバリデーションなど' },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-sm text-[var(--claude-primary)] mb-2">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="Agent Skills オープンスタンダード">
              プラグインは Agent Skills オープンスタンダードに従って構成される。これにより、Claude Code だけでなく対応する他のツールでもプラグインを再利用できる仕組みになっている。
            </InfoBox>
          </section>

          {/* プラグインのインストール */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Download className="text-[var(--claude-primary)]" />
              プラグインのインストール
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">CLI からインストール</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  Claude Code のセッション中に <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">/plugins</code> コマンドを実行すると、プラグイン管理インターフェースが開く。
                </p>
                <CodeBlock language="bash" code={`/plugins
# → "Manage plugins" インターフェースが開く
# → "Plugins" タブ: インストール済みプラグインの管理
# → "Marketplaces" タブ: 公開プラグインの検索・インストール

# Marketplaces タブでプラグインを選択 → Install で完了`} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">VS Code 拡張からインストール</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  VS Code の Claude Code 拡張にはグラフィカルなプラグイン管理画面がある。管理ダイアログは「Plugins」タブと「Marketplaces」タブで構成されている。
                </p>
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-bold text-foreground">Plugins タブ:</span> インストール済みプラグインの一覧、有効/無効の切り替え、アンインストール</p>
                    <p><span className="font-bold text-foreground">Marketplaces タブ:</span> 公開されているプラグインの検索、詳細確認、ワンクリックインストール</p>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="CLI と VS Code の同期">
              VS Code 拡張でインストールしたプラグインは CLI でも利用でき、逆も同様。プラグインの設定はグローバルに管理されるため、どちらの環境で操作しても同じ状態になる。
            </InfoBox>
          </section>

          {/* プラグインの設定管理 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Settings className="text-[var(--claude-primary)]" />
              プラグインの設定管理
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">設定ファイル</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  プラグインの有効/無効はグローバル設定ファイルで管理される。
                </p>
                <CodeBlock language="json" code={`// ~/.claude/settings.json
{
  "enabledPlugins": {
    "plugin-name": true
  }
}

// ~/.claude/plugins/installed_plugins.json
{
  "version": 2,
  "plugins": {
    "plugin-name": {
      "source": "npm:plugin-name",
      "version": "1.0.0"
    }
  }
}`} />
              </div>
            </div>

            <InfoBox type="info" title="プラグインのスコープ">
              プラグインはグローバルにインストールされ、すべてのプロジェクトで利用可能。特定のプロジェクトでのみ使用したい場合は、CLAUDE.md でプラグインの Skills を参照する運用が推奨される。
            </InfoBox>
          </section>

          {/* プラグインの発見 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Search className="text-[var(--claude-primary)]" />
              プラグインの発見
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">/plugins</code> の Marketplaces タブ、または VS Code 拡張のプラグイン管理画面から公開プラグインを検索・インストールできる。
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">主なプラグインカテゴリ</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">カテゴリ</th>
                        <th className="px-3 py-2 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">用途</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {[
                        ['開発（Development）', 'コードレビュー、リファクタリング支援、コーディング規約チェック、セキュリティスキャン'],
                        ['テスト（Testing）', 'テストケース生成、カバレッジ分析、リグレッションテスト、E2E テスト支援'],
                        ['デプロイ（Deployment）', 'ステージング/本番デプロイ、ロールバック操作、CI/CD パイプライン連携'],
                        ['ドキュメント（Documentation）', 'API ドキュメント生成、README 自動更新、変更履歴作成、コードコメント補完'],
                      ].map(([cat, usage]) => (
                        <tr key={cat} className="bg-white dark:bg-slate-900">
                          <td className="px-3 py-2 font-bold text-[var(--claude-primary)] whitespace-nowrap">{cat}</td>
                          <td className="px-3 py-2 text-muted-foreground">{usage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* カスタムスラッシュコマンド */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Blocks className="text-[var(--claude-primary)]" />
              カスタムスラッシュコマンド
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              プロジェクト固有のスラッシュコマンドを <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">.claude/commands/</code> ディレクトリに定義できます。Markdown ファイルとして作成し、プロンプトテンプレートを記述します。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">コマンドの作成</h3>
                <CodeBlock language="bash" code={`# プロジェクト固有コマンドの作成
mkdir -p .claude/commands
cat > .claude/commands/review.md << 'EOF'
現在のブランチの差分をレビューしてください。

確認項目:
- コードの品質と可読性
- 潜在的なバグやエッジケース
- セキュリティ上の懸念
- テストの充足度

問題点があれば修正を提案してください。
EOF`} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">ユーザーグローバルコマンド</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  全プロジェクト共通で使えるコマンドは <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">~/.claude/commands/</code> に配置します。
                </p>
                <CodeBlock language="bash" code={`# グローバルコマンドの作成
mkdir -p ~/.claude/commands
cat > ~/.claude/commands/commit-ja.md << 'EOF'
ステージされた変更に対して日本語のコミットメッセージを生成し、
コミットを実行してください。

コミットメッセージの規則:
- 1行目: 変更の要約（50文字以内）
- 3行目以降: 変更の詳細（必要に応じて）
EOF`} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">引数の利用</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  コマンドテンプレートでは <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">$ARGUMENTS</code> プレースホルダーで引数を受け取れます。
                </p>
                <CodeBlock language="markdown" code={`<!-- .claude/commands/explain.md -->
以下のファイルまたはコードについて詳しく説明してください:

$ARGUMENTS

説明には以下を含めてください:
- 全体的な目的と役割
- 主要な関数・クラスの説明
- データフローの概要`} />
                <CodeBlock language="bash" code={`# 使用例
/project:explain src/lib/navigation.ts`} />
              </div>
            </div>
          </section>

          {/* エコシステムの広がり */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Plug className="text-[var(--claude-primary)]" />
              MCP エコシステムとの連携
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code は MCP（Model Context Protocol）を通じて外部ツールやサービスと連携できます。MCP サーバーはプラグインとしてバンドルすることも、直接設定することも可能です。
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">一般的な MCP サーバーの例</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Filesystem', desc: 'ローカルファイルシステムへの安全なアクセスを提供' },
                    { name: 'GitHub', desc: 'GitHub API との連携（Issue、PR、リポジトリ操作）' },
                    { name: 'Postgres / SQLite', desc: 'データベースへのクエリ実行と結果の取得' },
                    { name: 'Puppeteer / Playwright', desc: 'ブラウザ自動操作、スクリーンショット取得' },
                    { name: 'Slack', desc: 'Slack チャンネルへのメッセージ送信・取得' },
                  ].map(item => (
                    <div key={item.name} className="flex items-start gap-3 p-2">
                      <span className="font-mono text-xs font-bold text-[var(--claude-primary)] whitespace-nowrap min-w-[120px]">{item.name}</span>
                      <span className="text-sm text-muted-foreground">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">MCP サーバーの設定方法</h3>
                <CodeBlock language="json" code={`// .claude/settings.json（プロジェクトスコープ）
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_..."
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    }
  }
}`} />
              </div>
            </div>
          </section>

          {/* プラグイン開発 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <BookOpen className="text-[var(--claude-primary)]" />
              プラグイン開発の基本
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              独自のプラグインを作成してチームやコミュニティと共有できる。プラグインは Agent Skills オープンスタンダードに準拠したディレクトリ構成で作る。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">プラグインのディレクトリ構成</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  プラグインのルートに <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">PLUGIN.md</code> を配置し、メタデータを記述する。各機能は対応するサブディレクトリに配置する。
                </p>
                <CodeBlock language="text" code={`my-plugin/
├── PLUGIN.md          # プラグインのメタデータ（名前、説明、バージョン）
├── skills/
│   └── my-skill/
│       └── SKILL.md   # スキル定義（スラッシュコマンドとして公開される）
├── subagents/
│   └── my-agent.md    # サブエージェント定義
└── hooks/
    └── settings.json  # Hook の設定`} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">PLUGIN.md の例</h3>
                <CodeBlock language="markdown" code={`---
name: my-review-plugin
version: 1.0.0
description: コードレビューを自動化するプラグイン
---

# My Review Plugin

このプラグインはコードレビューのワークフローを自動化します。

## 提供する機能

- /my-review-plugin:review - 現在の差分をレビュー
- review-agent サブエージェント - レビュー専門のエージェント`} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">スキル定義の例</h3>
                <CodeBlock language="markdown" code={`<!-- skills/review/SKILL.md -->
---
name: review
description: 現在のブランチの差分をレビューする
---

現在のブランチの差分を取得し、以下の観点でレビューしてください:

- コードの品質と可読性
- 潜在的なバグやエッジケース
- セキュリティ上の懸念
- テストの充足度`} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Hook 設定の例</h3>
                <CodeBlock language="json" code={`// hooks/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "echo 'Tool execution starting...'"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash",
        "command": "echo 'Tool execution completed.'"
      }
    ]
  }
}`} />
              </div>
            </div>

            <InfoBox type="warning" title="プラグインのセキュリティ">
              プラグインはシェルコマンドの実行やファイルへのアクセスが可能。信頼できるソースからのみインストールし、コードを確認してから有効化すること。Marketplaces に公開されているプラグインでも、内容を確認してから利用するのが安全。
            </InfoBox>
          </section>
        </div>

        <CodingChallenge
            preview
            previewType="config"
            title="プラグインのディレクトリ構成と MCP 設定を書こう"
            description="プラグインの PLUGIN.md とスキル定義の作成、および MCP サーバーの設定を書いてください。"
            initialCode={`// プラグインのディレクトリ構成\n// my-plugin/\n//   ___.md        // ← ここを埋める（プラグイン定義ファイル）\n//   ___/review/   // ← ここを埋める（スキルフォルダ名）\n//     SKILL.md       - レビュースキル定義\n//   subagents/\n//     reviewer.md    - サブエージェント定義\n\n// MCP サーバーの設定\n// .claude/settings.json\n{\n  "___": {  // ← ここを埋める（MCP設定キー）\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": {\n        "GITHUB_TOKEN": "ghp_..."\n      }\n    }\n  }\n}`}
            answer={`// プラグインのディレクトリ構成\n// my-plugin/\n//   PLUGIN.md        - name, version, description\n//   skills/review/\n//     SKILL.md       - レビュースキル定義\n//   subagents/\n//     reviewer.md    - サブエージェント定義\n//   hooks/\n//     settings.json  - Hook 設定\n\n// MCP サーバーの設定\n// .claude/settings.json\n{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": {\n        "GITHUB_TOKEN": "ghp_..."\n      }\n    },\n    "filesystem": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]\n    }\n  }\n}`}
            hints={[
              'PLUGIN.md にはプラグインの名前、バージョン、説明を記述します',
              'skills/ ディレクトリ内のサブディレクトリに SKILL.md を配置するとスラッシュコマンドになります',
              'MCP サーバーは mcpServers キーに command と args を指定します',
            ]}
            keywords={['PLUGIN', 'skills', 'mcpServers']}
          />

        <PageNavigation />
      </div>
    </div>
  );
}
