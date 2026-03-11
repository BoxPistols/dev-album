import { ShieldCheck, Lock, Unlock, Key, Shield, Settings } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';

export default function SecurityPermissions() {
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
            セキュリティと権限設定
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            パーミッションモード、ルールベース制御、サンドボックスによるエージェントの安全管理。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* 承認フロー */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <ShieldCheck className="text-[var(--claude-primary)]" />
              承認フロー（Human-in-the-loop）
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Codeはデフォルトで「人間による承認」を基本としています。操作の種類に応じて承認の要否が決まります。
            </p>
            <div className="space-y-4">
              {[
                { icon: <Unlock className="w-4 h-4 text-emerald-500" />, title: '読み取り操作', desc: 'ファイルの閲覧、検索、読み取り専用のコマンドは多くの場合自動で許可されます。' },
                { icon: <Lock className="w-4 h-4 text-amber-500" />, title: '書き込み・実行操作', desc: 'ファイルの編集・作成、シェルコマンドの実行、Git操作等は承認プレビューが表示されます。' },
                { icon: <Shield className="w-4 h-4 text-red-500" />, title: 'MCP外部ツール', desc: 'MCP経由の外部サービス呼び出し（GitHub API、Slack投稿等）も承認が必要です。' },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* パーミッションモード */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Settings className="text-[var(--claude-primary)]" />
              パーミッションモード
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              <code>Shift+Tab</code> でモードを切替えられます。作業の性質に応じて適切なモードを選択してください。
            </p>
            <div className="space-y-3">
              {[
                { mode: 'default', desc: '各ツール初回使用時にパーミッション確認を表示。標準的な開発に推奨。', color: 'text-emerald-600' },
                { mode: 'acceptEdits', desc: 'ファイル編集操作を自動承認。Bashコマンドは引き続き確認。', color: 'text-blue-600' },
                { mode: 'plan', desc: '分析のみ。ファイル変更・コマンド実行を一切行わない読み取り専用モード。', color: 'text-purple-600' },
                { mode: 'dontAsk', desc: '事前に許可されたツール以外は自動拒否。CI/CD環境向け。', color: 'text-amber-600' },
                { mode: 'bypassPermissions', desc: '全パーミッション確認をスキップ。隔離されたサンドボックス環境でのみ使用。', color: 'text-red-600' },
              ].map(item => (
                <div key={item.mode} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <code className={`font-bold text-sm min-w-[160px] ${item.color}`}>{item.mode}</code>
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* パーミッションルール */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Key className="text-[var(--claude-primary)]" />
              パーミッションルール
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              <code>settings.json</code> でツール単位の許可/拒否ルールを定義できます。評価順序は <strong>deny → ask → allow</strong> です。
            </p>
            <CodeBlock code={`// .claude/settings.json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Read"
    ],
    "ask": [
      "Bash(git push *)",
      "Bash(git commit *)"
    ],
    "deny": [
      "Bash(curl *)",
      "Read(./.env)",
      "Read(./secrets/**)"
    ]
  }
}`} language="json" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { rule: 'Bash(npm run *)', desc: '"npm run"で始まるコマンドにマッチ' },
                { rule: 'Read(./.env)', desc: '.envファイルの読み取りにマッチ' },
                { rule: 'Edit(/src/**/*.ts)', desc: 'src配下のTSファイル編集にマッチ' },
                { rule: 'mcp__puppeteer__*', desc: 'puppeteerサーバの全ツールにマッチ' },
              ].map(item => (
                <div key={item.rule} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <code className="text-xs text-[var(--claude-primary)]">{item.rule}</code>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* サンドボックス */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Shield className="text-[var(--claude-primary)]" />
              サンドボックス
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              パーミッションとは別に、OS レベルのサンドボックスでプロセスを隔離できます。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm mb-1">macOS</h4>
                <p className="text-xs text-muted-foreground">Seatbelt（sandbox-exec）による分離</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm mb-1">Linux</h4>
                <p className="text-xs text-muted-foreground">bubblewrap（bwrap）による分離</p>
              </div>
            </div>
            <InfoBox type="warning" title="最小権限の原則">
              パーミッションルールとサンドボックスは補完的なセキュリティレイヤーです。常に「最小権限の原則」を適用し、必要最小限の権限のみを付与してください。
            </InfoBox>
          </section>

          {/* 設定ファイルの階層 */}
          <section>
            <h2 className="text-3xl font-bold mb-6">設定ファイルの優先順位</h2>
            <p className="leading-relaxed mb-4 text-sm text-muted-foreground">
              複数箇所の設定が存在する場合、以下の優先順位で適用されます（上が最優先）。
            </p>
            <div className="space-y-2">
              {[
                { priority: '1', name: 'マネージドポリシー', path: 'managed-settings.json', desc: '組織管理者が配置。最優先。' },
                { priority: '2', name: 'コマンドライン引数', path: '--permission-mode 等', desc: 'セッション単位の一時オーバーライド。' },
                { priority: '3', name: 'プロジェクトローカル', path: '.claude/settings.local.json', desc: '個人のプロジェクト固有設定。' },
                { priority: '4', name: 'プロジェクト共有', path: '.claude/settings.json', desc: 'チーム共有の設定。Git管理対象。' },
                { priority: '5', name: 'ユーザー設定', path: '~/.claude/settings.json', desc: '全プロジェクト共通の個人設定。' },
              ].map(item => (
                <div key={item.priority} className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <span className="text-sm font-bold text-[var(--claude-primary)] w-6 text-center">{item.priority}</span>
                  <div className="flex-1">
                    <span className="font-bold text-sm">{item.name}</span>
                    <code className="text-xs text-muted-foreground ml-2">{item.path}</code>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <CodingChallenge
          preview
          previewType="config"
          title="パーミッション設定を書いてみよう"
          description=".claude/settings.json に、npm/git の基本コマンドを許可し、.env ファイルの読み取りと curl の実行を拒否するパーミッションルールを書いてください。"
          initialCode={`{\n  "permissions": {\n    "allow": [\n      // npm と git の基本コマンドを許可\n    ],\n    "deny": [\n      // .env の読み取りと curl を拒否\n    ]\n  }\n}`}
          answer={`{\n  "permissions": {\n    "allow": [\n      "Bash(npm run *)",\n      "Bash(git status)",\n      "Bash(git diff *)",\n      "Read"\n    ],\n    "deny": [\n      "Bash(curl *)",\n      "Read(./.env)",\n      "Read(./secrets/*)"\n    ]\n  }\n}`}
          hints={[
            'allow/deny にはツール名とパターンを "Tool(pattern)" 形式で指定します',
            'Bash コマンドは "Bash(npm run *)" のようにワイルドカードが使えます',
            'ファイル操作は "Read(./.env)" のようにパスを指定します',
          ]}
          keywords={['permissions', 'allow', 'deny', 'Bash(', 'Read(']}
        />

        <PageNavigation />
      </div>
    </div>
  );
}
