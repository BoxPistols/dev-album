import { GitBranch, Settings, Shield, Workflow, Zap, Tag } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function GitHubActions() {
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
            GitHub Actions 連携
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            Claude Code を GitHub Actions に組み込み、PR の自動レビュー・Issue 対応・CI パイプラインでの AI 活用を実現する。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* claude-code-action の概要 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Workflow className="text-[var(--claude-primary)]" />
              claude-code-action の概要
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">anthropics/claude-code-action@v1</code> は、GitHub Actions 上で Claude Code を実行するための公式アクションです。PR へのコードレビュー、Issue の自動分析・実装、PR コメントを介した対話的な操作を可能にします。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'PR レビュー', desc: 'プルリクエストの差分を分析し、改善点やバグの可能性をコメントとして投稿' },
                { label: 'Issue 対応', desc: 'Issue の内容を読み取り、修正 PR を自動生成。ラベルでトリガー制御が可能' },
                { label: '対話的操作', desc: 'PR コメントで @claude にメンションすると、追加の修正や説明を依頼できる' },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-sm text-[var(--claude-primary)] mb-2">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* セットアップ手順 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Settings className="text-[var(--claude-primary)]" />
              セットアップ手順
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">1. API キーの設定</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  リポジトリの Settings → Secrets and variables → Actions に <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">ANTHROPIC_API_KEY</code> を追加します。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">2. ワークフローファイルの作成</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">.github/workflows/claude.yml</code> を作成します。
                </p>
                <CodeBlock language="yaml" code={`name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_target:
    types: [opened, synchronize]
  issues:
    types: [opened, labeled]

jobs:
  claude:
    # PR コメントでの @claude メンションに応答
    if: |
      (github.event_name == 'issue_comment' &&
       contains(github.event.comment.body, '@claude')) ||
      github.event_name == 'pull_request_target' ||
      github.event_name == 'issues'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
      issues: write
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}`} />
              </div>
            </div>
          </section>

          {/* トリガーイベント */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Zap className="text-[var(--claude-primary)]" />
              トリガーイベント
            </h2>

            <div className="space-y-6">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-2">issue_comment — @claude メンション</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  PR のコメントで <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">@claude</code> にメンションすると、Claude がコメント内容に応じた処理（コードレビュー、修正、説明など）を実行します。
                </p>
                <CodeBlock language="yaml" code={`on:
  issue_comment:
    types: [created]

# if 条件で @claude メンションのみにフィルタ
if: |
  github.event_name == 'issue_comment' &&
  contains(github.event.comment.body, '@claude')`} />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-2">pull_request_target — 自動レビュー</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  PR のオープンや更新時に自動でコードレビューを実行します。<code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">direct_prompt</code> パラメータでレビュー指示を渡せます。
                </p>
                <CodeBlock language="yaml" code={`on:
  pull_request_target:
    types: [opened, synchronize]

steps:
  - uses: anthropics/claude-code-action@v1
    with:
      anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}
      direct_prompt: |
        このPRの変更をレビューしてください。
        コードの品質、潜在的なバグ、改善点を指摘してください。`} />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-2">issues — Issue の自動対応</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Issue のオープンやラベル付与をトリガーに、内容を分析して修正 PR を自動生成します。
                </p>
                <CodeBlock language="yaml" code={`on:
  issues:
    types: [opened, labeled]

# 特定ラベルでフィルタリングする場合
if: |
  github.event_name == 'issues' &&
  contains(github.event.issue.labels.*.name, 'claude')`} />
              </div>
            </div>
          </section>

          {/* 主要パラメータ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Tag className="text-[var(--claude-primary)]" />
              主要パラメータ
            </h2>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">パラメータ</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">説明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    ['anthropic_api_key', 'Anthropic API キー（必須）'],
                    ['direct_prompt', '直接プロンプトを指定して実行（レビュー指示など）'],
                    ['allowed_tools', '許可するツールのカンマ区切りリスト'],
                    ['disallowed_tools', '禁止するツールのカンマ区切りリスト'],
                    ['max_turns', 'エージェントの最大ターン数（デフォルト: 制限なし）'],
                    ['custom_instructions', 'CLAUDE.md に追加する独自指示'],
                    ['timeout_minutes', 'アクション実行のタイムアウト（分）'],
                  ].map(([param, desc]) => (
                    <tr key={param} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-[var(--claude-primary)] whitespace-nowrap">{param}</td>
                      <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="direct_prompt と use_claude_code">
              <code>direct_prompt</code> を指定すると、Issue/PR の内容とは別にプロンプトを直接渡せます。自動レビューなど定型処理に活用できます。
            </InfoBox>
          </section>

          {/* セキュリティと権限 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Shield className="text-[var(--claude-primary)]" />
              セキュリティと権限
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              GitHub Actions で Claude Code を安全に運用するために、適切な権限設定が重要です。
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">必要な permissions</h3>
                <CodeBlock language="yaml" code={`permissions:
  contents: read        # リポジトリ内容の読み取り
  pull-requests: write  # PR へのコメント投稿
  issues: write         # Issue へのコメント投稿`} />
              </div>

              <InfoBox type="warning" title="pull_request_target の注意点">
                <code>pull_request_target</code> はベースブランチのコンテキストで実行されるため、フォークからの PR でもシークレットにアクセスできます。信頼できないリポジトリでは <code>if</code> 条件でフィルタリングしてください。
              </InfoBox>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">ツール制限による安全性向上</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">allowed_tools</code> や <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">disallowed_tools</code> でエージェントが使えるツールを制限できます。
                </p>
                <CodeBlock language="yaml" code={`- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}
    # Bash ツールを禁止（コード変更のみ許可）
    disallowed_tools: "Bash"
    # または許可ツールのみ指定
    allowed_tools: "Read,Glob,Grep"`} />
              </div>
            </div>
          </section>

          {/* 実践パターン */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <GitBranch className="text-[var(--claude-primary)]" />
              実践パターン
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">PR 自動レビュー</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  すべての PR に対して自動レビューを実行し、コメントとして投稿する設定です。
                </p>
                <CodeBlock language="yaml" code={`name: PR Review
on:
  pull_request_target:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}
          direct_prompt: |
            この PR の差分をレビューしてください:
            - コードの品質と可読性
            - 潜在的なバグやエッジケース
            - セキュリティ上の懸念
            - テストの充足度
          max_turns: 3`} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">ラベルベースの Issue 対応</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">claude</code> ラベルが付いた Issue のみ自動処理するパターンです。
                </p>
                <CodeBlock language="yaml" code={`name: Issue Handler
on:
  issues:
    types: [labeled]

jobs:
  handle:
    if: github.event.label.name == 'claude'
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}
          custom_instructions: |
            修正は最小限にし、テストを追加してください。
            コミットメッセージは日本語で書いてください。`} />
              </div>
            </div>

            <InfoBox type="info" title="GitLab CI/CD でも利用可能">
              Claude Code は GitLab CI/CD パイプラインでも同様に利用できます。<code>claude -p</code>（パイプモード）をスクリプトステップで呼び出すことで、プラットフォームに依存しない自動化が構築できます。
            </InfoBox>
          </section>
        </div>

        <CodingChallenge
            preview
            previewType="terminal"
            title="GitHub Actions ワークフローを書こう"
            description="Claude Code の claude-code-action を使った GitHub Actions ワークフローファイルの基本構成を YAML で書いてください。PR レビューと Issue 対応の両方に対応するトリガー設定を含めましょう。"
            initialCode={`# .github/workflows/claude.yml\nname: Claude Code\n\n# トリガーイベントを定義\non:\n  # PR コメントで @claude メンション:\n  # PR のオープン・更新:\n  # Issue のオープン・ラベル付与:\n\njobs:\n  claude:\n    # if 条件:\n    runs-on: ubuntu-latest\n    permissions:\n      # 必要な権限を設定:\n    steps:\n      # claude-code-action を使用:`}
            answer={`# .github/workflows/claude.yml\nname: Claude Code\n\non:\n  issue_comment:\n    types: [created]\n  pull_request_target:\n    types: [opened, synchronize]\n  issues:\n    types: [opened, labeled]\n\njobs:\n  claude:\n    if: |\n      (github.event_name == 'issue_comment' &&\n       contains(github.event.comment.body, '@claude')) ||\n      github.event_name == 'pull_request_target' ||\n      github.event_name == 'issues'\n    runs-on: ubuntu-latest\n    permissions:\n      contents: read\n      pull-requests: write\n      issues: write\n    steps:\n      - uses: anthropics/claude-code-action@v1\n        with:\n          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}`}
            hints={[
              'トリガーは issue_comment, pull_request_target, issues の3種類',
              'permissions には contents: read, pull-requests: write, issues: write が必要',
              'アクションは anthropics/claude-code-action@v1 を使用',
            ]}
            keywords={['issue_comment', 'pull_request_target', 'claude-code-action', 'ANTHROPIC_API_KEY', 'permissions']}
          />

        <PageNavigation />
      </div>
    </div>
  );
}
