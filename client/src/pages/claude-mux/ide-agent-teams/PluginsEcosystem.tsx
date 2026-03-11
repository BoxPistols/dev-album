import { Package, Blocks, Search, Settings, BookOpen, Plug } from 'lucide-react';
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
            Claude Code の機能を拡張するプラグインシステムと、コミュニティのエコシステムの活用方法。
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
              Claude Code のプラグインは、Hooks・Skills・カスタムスラッシュコマンド・MCP サーバーをバンドルした拡張パッケージです。npm レジストリからインストールでき、Claude Code の機能を大幅に拡張できます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Skills', desc: 'スラッシュコマンドとして呼び出せるカスタム機能。コード生成、レビュー、デプロイなどの定型処理をパッケージ化' },
                { label: 'Hooks', desc: 'ライフサイクルイベントに応じた自動処理。セッション開始時の環境セットアップ、ツール実行前後のバリデーションなど' },
                { label: 'MCP サーバー', desc: '外部サービスとの接続を提供。データベース、API、クラウドサービスへのアクセスを追加' },
                { label: 'エージェント', desc: 'カスタムサブエージェントの定義。特定ドメインに特化した AI アシスタントをプラグインとして配布' },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-sm text-[var(--claude-primary)] mb-2">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* プラグインの管理 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Settings className="text-[var(--claude-primary)]" />
              プラグインの管理
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">インストールと管理</h3>
                <CodeBlock language="bash" code={`# プラグインのインストール
/plugins install <plugin-name>

# インストール済みプラグインの一覧
/plugins list

# プラグインのアンインストール
/plugins uninstall <plugin-name>

# プラグインの更新
/plugins update <plugin-name>`} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">設定ファイルでの管理</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  プラグインの有効/無効はグローバル設定ファイルで管理されます。
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
              プラグインはグローバルにインストールされ、すべてのプロジェクトで利用可能です。特定のプロジェクトでのみ使用したい場合は、CLAUDE.md でプラグインの Skills を参照する運用が推奨されます。
            </InfoBox>
          </section>

          {/* プラグインの発見 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Search className="text-[var(--claude-primary)]" />
              プラグインの発見
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              公式・コミュニティ製のプラグインは npm レジストリで公開されています。
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">公式プラグインの例</h3>
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
                        ['コードレビュー', 'PR の差分分析、コーディング規約チェック、セキュリティスキャン'],
                        ['ドキュメント生成', 'API ドキュメント、README、変更履歴の自動生成'],
                        ['テスト支援', 'テストケース生成、カバレッジ分析、リグレッションテスト'],
                        ['デプロイ', 'ステージング/本番デプロイ、ロールバック操作の自動化'],
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
              独自のプラグインを作成して npm に公開することで、チームやコミュニティと共有できます。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">プラグインの構成</h3>
                <CodeBlock language="text" code={`my-claude-plugin/
├── package.json          # name, version, main
├── skills/
│   └── my-skill.md       # カスタムスラッシュコマンド
├── hooks/
│   └── pre-commit.sh     # ライフサイクルフック
├── agents/
│   └── reviewer.md       # カスタムエージェント定義
└── mcp/
    └── config.json       # MCP サーバー設定`} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">package.json の設定</h3>
                <CodeBlock language="json" code={`{
  "name": "my-claude-plugin",
  "version": "1.0.0",
  "description": "Claude Code 用カスタムプラグイン",
  "claude-code-plugin": {
    "skills": ["skills/*.md"],
    "hooks": {
      "PreToolUse": ["hooks/pre-commit.sh"]
    }
  }
}`} />
              </div>
            </div>

            <InfoBox type="info" title="プラグインのセキュリティ">
              プラグインはシェルコマンドの実行やファイルへのアクセスが可能です。信頼できるソースからのみインストールし、コードを確認してから有効化してください。
            </InfoBox>
          </section>
        </div>

        <CodingChallenge
            preview
            previewType="config"
            title="カスタムスラッシュコマンドとプラグイン設定を書こう"
            description="プロジェクト固有のスラッシュコマンドの作成と、MCP サーバーの設定を JSON で書いてください。"
            initialCode={`// カスタムコマンドの作成手順\n// mkdir -p .claude/commands\n\n// .claude/commands/review.md の内容:\n// （レビュー指示を書く）\n\n// MCP サーバーの設定\n// .claude/settings.json\n{\n  "mcpServers": {\n    // GitHub MCP サーバー:\n\n    // Filesystem MCP サーバー:\n  }\n}`}
            answer={`// カスタムコマンドの作成手順\n// mkdir -p .claude/commands\n\n// .claude/commands/review.md の内容:\n// 現在のブランチの差分をレビューしてください。\n// 確認項目: コード品質、バグ、セキュリティ、テスト\n\n// MCP サーバーの設定\n// .claude/settings.json\n{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": {\n        "GITHUB_TOKEN": "ghp_..."\n      }\n    },\n    "filesystem": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]\n    }\n  }\n}`}
            hints={[
              '.claude/commands/ にマークダウンファイルを置くとスラッシュコマンドになります',
              'MCP サーバーは mcpServers キーに command と args を指定します',
              '@modelcontextprotocol/server-github で GitHub API 連携が可能です',
            ]}
            keywords={['mcpServers', 'command', 'args', '@modelcontextprotocol', '.claude/commands']}
          />

        <PageNavigation />
      </div>
    </div>
  );
}
