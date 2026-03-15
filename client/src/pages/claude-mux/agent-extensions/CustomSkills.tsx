import { Sparkles, Code, Webhook, FolderOpen } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function CustomSkills() {
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
            Skills・コマンド・Hooks
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            プロジェクト固有の知識、カスタムコマンド、ライフサイクルフックによるエージェントの拡張。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* Skills */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Sparkles className="text-[var(--claude-primary)]" />
              Skills（スキル）
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Skillsは <code>.claude/skills/*/SKILL.md</code> に配置する専門知識の定義です。スラッシュコマンドとして呼び出せ、段階的に知識を提供（Progressive Disclosure）します。
            </p>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              SKILL.md は YAML frontmatter（<code>name</code>, <code>description</code>）と Markdown 本文で構成される。
              <code>name</code> がそのまま <code>/スラッシュコマンド名</code> になり、<code>description</code> は Claude が自動判断で呼び出す際の判定基準になる。
            </p>
            <CodeBlock code={`# .claude/skills/deploy/SKILL.md

---
name: deploy
description: バージョンアップ、CHANGELOG 生成、Git タグ作成、デプロイ確認を行う
---

## 手順
1. package.json のバージョンをインクリメント
2. CHANGELOG.md を変更内容から自動生成
3. Git タグを "v{version}" 形式で作成
4. CI/CD パイプラインの状態を確認`} language="markdown" />

            <h3 className="text-xl font-bold mt-8 mb-4">すぐに使える Skills パターン集</h3>

            <div className="space-y-4">
              <CodeBlock title="コードレビュー Skill" code={`# .claude/skills/review/SKILL.md
---
name: review
description: 現在のブランチの PR をレビューする
---

1. \`gh pr view\` で PR の概要を取得
2. \`gh pr diff\` で差分を取得
3. コード品質・セキュリティ・パフォーマンスの観点で分析
4. 改善提案をまとめて報告`} language="markdown" />

              <CodeBlock title="コミットメッセージ Skill" code={`# .claude/skills/commit/SKILL.md
---
name: commit
description: 変更内容を分析して適切なコミットメッセージで commit する
---

1. \`git diff --staged\` で変更内容を確認
2. 変更の種類を判定（feature / fix / refactor / docs / test）
3. 日本語で簡潔なコミットメッセージを生成
4. \`git commit\` を実行（push はしない）`} language="markdown" />

              <CodeBlock title="テスト実行 Skill" code={`# .claude/skills/test/SKILL.md
---
name: test
description: テストを実行し、失敗があれば修正を試みる
---

1. \`npm test\` または \`npx vitest run\` を実行
2. 失敗したテストがあれば原因を分析
3. 修正案を提示し、ユーザーの確認後に修正を実行
4. 再度テストを実行して成功を確認`} language="markdown" />

              <CodeBlock title="HTML 可視化 Skill（スクリプト連携）" code={`# .claude/skills/visualize/SKILL.md
---
name: visualize
description: データを HTML で可視化してブラウザで開く
---

以下のスクリプトを使って HTML レポートを生成し、ブラウザで開く:

\`\`\`bash
node .claude/skills/visualize/scripts/generate-report.js
open /tmp/report.html
\`\`\``} language="markdown" />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2">サポートファイル</h4>
                <p className="text-xs text-muted-foreground"><code>scripts/</code>（実行スクリプト）、<code>examples/</code>（出力例）、<code>template.md</code>（テンプレート）を SKILL.md から参照できる。</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2">frontmatter オプション</h4>
                <p className="text-xs text-muted-foreground"><code>name</code>（/コマンド名）、<code>description</code>（自動呼び出し判定）が必須。Agent Skills 標準に準拠。</p>
              </div>
            </div>
          </section>

          {/* カスタムコマンド */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Code className="text-[var(--claude-primary)]" />
              カスタムスラッシュコマンド
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Markdownファイルを特定のディレクトリに配置するだけで、独自のスラッシュコマンドを追加できます。
            </p>
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-baseline gap-3 mb-2">
                  <h4 className="font-bold text-sm">プロジェクトコマンド</h4>
                  <code className="text-xs text-muted-foreground">.claude/commands/*.md</code>
                </div>
                <p className="text-xs text-muted-foreground mb-3"><code>/project:コマンド名</code> で呼び出し。チーム全員が使用可能。</p>
                <CodeBlock code={`# .claude/commands/review-pr.md

現在のブランチのPRをレビューしてください。
1. gh pr diff で差分を確認
2. コード品質、セキュリティ、パフォーマンスの観点で分析
3. 改善提案をまとめて報告`} language="markdown" />
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-baseline gap-3 mb-2">
                  <h4 className="font-bold text-sm">ユーザーコマンド</h4>
                  <code className="text-xs text-muted-foreground">~/.claude/commands/*.md</code>
                </div>
                <p className="text-xs text-muted-foreground"><code>/user:コマンド名</code> で呼び出し。全プロジェクトで使用可能な個人コマンド。</p>
              </div>
            </div>
          </section>

          {/* Hooks */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Webhook className="text-[var(--claude-primary)]" />
              Hooks（ライフサイクルフック）
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Hooksは、エージェントの動作の各段階（ツール実行前後、セッション開始時など）にカスタム処理を挿入する仕組みです。<code>settings.json</code> で設定します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { event: 'PreToolUse', desc: 'ツール呼び出し実行前。ブロック可能。' },
                { event: 'PostToolUse', desc: 'ツール呼び出し成功後。フィードバック提供。' },
                { event: 'UserPromptSubmit', desc: 'プロンプト送信時（処理前）。ブロック可能。' },
                { event: 'Stop', desc: 'エージェント応答完了時。ブロック可能。' },
                { event: 'SessionStart', desc: 'セッション開始/再開時。' },
                { event: 'Notification', desc: '通知送信時。' },
              ].map(item => (
                <div key={item.event} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <code className="text-[var(--claude-primary)] font-bold text-sm">{item.event}</code>
                  <p className="text-xs text-muted-foreground mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
            <CodeBlock code={`// .claude/settings.json の Hooks 設定例
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": ".claude/hooks/validate-command.sh"
        }]
      }
    ]
  }
}`} language="json" />
            <InfoBox type="info" title="フックの種類">
              <code>command</code>（シェルコマンド実行）、<code>prompt</code>（モデルでyes/no判定）、<code>agent</code>（サブエージェントで検証）の3タイプがあります。
            </InfoBox>
          </section>

          {/* Skills vs Subagents */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <FolderOpen className="text-[var(--claude-primary)]" />
              使い分けガイド
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm mb-2">Skills</h4>
                <p className="text-xs text-muted-foreground">知識の提供。「何を知っているか」を定義。</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm mb-2">Subagents</h4>
                <p className="text-xs text-muted-foreground">タスクの委譲。「何を実行するか」を委任。</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm mb-2">Hooks</h4>
                <p className="text-xs text-muted-foreground">動作の制御。「いつ何を挟むか」を設定。</p>
              </div>
            </div>
          </section>
          <CodingChallenge
            preview
            previewType="config"
            title="Hooks で自動フォーマットを設定しよう"
            description="settings.json に PostToolUse Hook を設定して、ファイル書き込み後に自動的に prettier を実行する設定を書いてください。"
            initialCode={`{\n  "hooks": {\n    "PostToolUse": [\n      {\n        "matcher": "",\n        "hooks": [\n          {\n            "type": "",\n            "command": ""\n          }\n        ]\n      }\n    ]\n  }\n}`}
            answer={`{\n  "hooks": {\n    "PostToolUse": [\n      {\n        "matcher": "Write",\n        "hooks": [\n          {\n            "type": "command",\n            "command": "jq -r '.tool_input.file_path' | xargs prettier --write 2>/dev/null || true"\n          }\n        ]\n      }\n    ]\n  }\n}`}
            hints={[
              'matcher には "Write" を指定してファイル書き込み時のみ発火させます',
              'type は "command" でシェルコマンドを実行します',
              '|| true でエラーを無視し、Hook 失敗によるセッション中断を防ぎます',
            ]}
            keywords={['Write', 'command', 'prettier', 'tool_input.file_path']}
          />
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
