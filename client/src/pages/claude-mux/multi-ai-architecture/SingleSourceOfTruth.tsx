import { Database, Link2, FolderSync, GitBranch, CheckCircle, Cog } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

const hierarchyData = [
  { level: '組織ポリシー', claude: '/etc/claude-code/CLAUDE.md', cursor: '（VS Code Policy）', copilot: 'Organization settings' },
  { level: 'プロジェクト', claude: 'CLAUDE.md\n.claude/rules/*.md', cursor: '.cursor/rules/*.mdc', copilot: '.github/copilot-instructions.md' },
  { level: '個人', claude: '~/.claude/CLAUDE.md', cursor: 'User settings', copilot: 'User settings' },
  { level: 'ローカル', claude: 'CLAUDE.local.md', cursor: '（.cursorrules）', copilot: '（なし）' },
];

export default function SingleSourceOfTruth() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            シングルソースオブトゥルース設計
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            複数の AI ツール間でルール・スキル・指示を一元管理し、品質基準の分散・劣化を防ぐ SSOT パターン。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* SSOT の必要性 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Database className="text-[var(--claude-primary)] shrink-0" />
              なぜ SSOT が必要か
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code の <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">CLAUDE.md</code>、Cursor の <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">.cursor/rules/</code>、Copilot の <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">copilot-instructions.md</code> にそれぞれ同じルールを手動でコピーすると、更新漏れや内容の乖離が発生します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: '更新漏れ', desc: '1 箇所を更新しても他のツールの設定が古いまま残る', color: 'text-red-500 dark:text-red-400' },
                { label: '内容の乖離', desc: '各ツールで異なるルールが混在し基準がぶれる', color: 'text-amber-500 dark:text-amber-400' },
                { label: 'メンテナンスコスト', desc: 'ツール追加のたびにコピー作業が増大する', color: 'text-orange-500 dark:text-orange-400' },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className={`font-bold text-sm mb-2 ${item.color}`}>{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="解決の原則">
              「ルールの正本は 1 箇所だけ。各ツール固有の設定ファイルはその正本を参照する」というアーキテクチャで一貫性とメンテナンス性を両立できます。
            </InfoBox>
          </section>

          {/* シンボリックリンクパターン */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Link2 className="text-[var(--claude-primary)] shrink-0" />
              <span>パターン 1: シンボリックリンク方式</span>
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              共通ルールを <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">.agents/rules/</code> に配置し、各ツールからシンボリックリンクで参照する方式です。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-3">ディレクトリ構造</h3>
                <CodeBlock language="text" code={`.agents/          # 共通ルール（正本）
├── rules/
│   ├── base.md
│   ├── coding-standards.md
│   ├── review-checklist.md
│   └── security-policy.md
├── commands/
│   ├── review.md
│   └── deep-research.md
└── skills/
    └── code-review/
        └── SKILL.md

# シンボリックリンクで参照
CLAUDE.md
  → .agents/rules/base.md
.claude/commands/review.md
  → ../../.agents/commands/review.md
.github/copilot-instructions.md
  → ../.agents/rules/base.md`} />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-3">セットアップスクリプト</h3>
                <CodeBlock language="bash" code={`#!/bin/bash
# scripts/setup-ai-rules.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Claude Code
mkdir -p "$ROOT/.claude/commands"
ln -sf "../../.agents/commands/review.md" \\
  "$ROOT/.claude/commands/review.md"

# GitHub Copilot
mkdir -p "$ROOT/.github"
ln -sf "../.agents/rules/base.md" \\
  "$ROOT/.github/copilot-instructions.md"

# AGENTS.md（Codex 等）
ln -sf ".agents/rules/base.md" \\
  "$ROOT/AGENTS.md"`} />
              </div>

              <InfoBox type="warning" title="シンボリックリンクの注意点">
                Windows では管理者権限が必要な場合があります。Git では <code>core.symlinks = true</code> を確認してください。
              </InfoBox>
            </div>
          </section>

          {/* AGENTS.md パターン */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <FolderSync className="text-[var(--claude-primary)] shrink-0" />
              <span>パターン 2: AGENTS.md 統一方式</span>
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              プロジェクトルートの <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">AGENTS.md</code> を唯一のルールファイルとし、各ツールに参照させる方式です。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-3">AGENTS.md の構成例</h3>
                <CodeBlock language="markdown" code={`# AGENTS.md

## プロジェクト概要
- 名前: my-project
- スタック: TypeScript, React, Rails
- Node.js: v20, pnpm

## ビルド・テスト
\`\`\`bash
pnpm install  # 依存関係
pnpm dev      # 開発サーバー
pnpm test     # テスト実行
pnpm lint     # リンター
\`\`\`

## コーディング規約
- TypeScript strict モード
- any 型の使用禁止
- 関数コンポーネント + hooks
- Tailwind CSS
- Vitest + Testing Library

## レビュー基準
- セキュリティ: OWASP Top 10
- パフォーマンス: N+1 回避
- アクセシビリティ: WAI-ARIA`} />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-3">各ツールでの参照設定</h3>
                <CodeBlock language="json" code={`// VS Code settings.json
{
  "github.copilot.chat.useAgentsMdFile": true
}
// Claude Code は AGENTS.md を自動認識`} />
                <CodeBlock language="markdown" code={`<!-- CLAUDE.md -->
# Claude Code 固有設定

AGENTS.md の規約に従ってください。

## 追加コンテキスト
- Subagents で並列調査
- 拡張思考をレビュー時に有効化
- 編集前に必ず Read で確認`} />
              </div>
            </div>

            <InfoBox type="info" title="使い分け">
              AGENTS.md には全ツール共通の情報を、CLAUDE.md には Claude Code 固有の振る舞い指示のみを記述します。
            </InfoBox>
          </section>

          {/* ビルドスクリプトパターン */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Cog className="text-[var(--claude-primary)] shrink-0" />
              <span>パターン 3: ビルドスクリプト生成方式</span>
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              各ツールが異なるファイル形式を要求する場合、共通ソースから各形式に変換するスクリプトを用意します。
            </p>

            <CodeBlock language="bash" code={`#!/bin/bash
# scripts/sync-ai-rules.sh
set -euo pipefail
RULES=".agents/rules"

# 1. CLAUDE.md の生成
{
  echo "# プロジェクトルール"; echo ""
  cat "$RULES/base.md"; echo ""
  echo "## コーディング規約"
  cat "$RULES/coding-standards.md"
} > CLAUDE.md

# 2. AGENTS.md の生成
cp CLAUDE.md AGENTS.md

# 3. Cursor rules（.mdc 形式）
mkdir -p .cursor/rules
for f in "$RULES"/*.md; do
  name=$(basename "$f" .md)
  {
    echo "---"
    echo "description: $name"
    echo "alwaysApply: true"
    echo "---"; echo ""
    cat "$f"
  } > ".cursor/rules/$name.mdc"
done

# 4. Copilot instructions
mkdir -p .github
cp CLAUDE.md .github/copilot-instructions.md`} />

            <InfoBox type="info" title="CI での自動同期">
              pre-commit フックや CI に組み込むことで、<code>.agents/rules/</code> の変更が各ツールに自動反映されます。
            </InfoBox>
          </section>

          {/* 階層的ルール管理 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <GitBranch className="text-[var(--claude-primary)] shrink-0" />
              階層的ルール管理
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              組織 → プロジェクト → 個人の階層でルールを管理する設計です。
            </p>

            {/* モバイル: カード表示 */}
            <div className="md:hidden space-y-4 mb-6">
              {hierarchyData.map(item => (
                <div key={item.level} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-foreground mb-2">{item.level}</h4>
                  <div className="space-y-1.5 text-xs">
                    <div>
                      <span className="font-medium text-[var(--claude-primary)]">Claude Code:</span>
                      <p className="font-mono text-muted-foreground whitespace-pre-line">{item.claude}</p>
                    </div>
                    <div>
                      <span className="font-medium text-[var(--claude-primary)]">Cursor:</span>
                      <p className="font-mono text-muted-foreground">{item.cursor}</p>
                    </div>
                    <div>
                      <span className="font-medium text-[var(--claude-primary)]">Copilot:</span>
                      <p className="font-mono text-muted-foreground break-all">{item.copilot}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* デスクトップ: テーブル表示 */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">階層</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">Claude Code</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">Cursor</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">Copilot</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {hierarchyData.map(item => (
                    <tr key={item.level} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-foreground whitespace-nowrap">{item.level}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-pre-line">{item.claude}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-pre-line">{item.cursor}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-pre-line">{item.copilot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock language="text" code={`# 階層的ルール管理の例

## 組織レベル（全プロジェクト共通）
~/.claude/CLAUDE.md
├── セキュリティポリシー
├── ライセンス遵守ルール
└── コミットメッセージ規約

## プロジェクトレベル
./CLAUDE.md
├── 技術スタック情報
├── ディレクトリ構成
└── コーディング規約

## 個人レベル（Git 管理外）
./CLAUDE.local.md
├── デバッグ時の特殊設定
└── 実験的な指示`} />
          </section>

          {/* ベストプラクティス */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="text-[var(--claude-primary)] shrink-0" />
              SSOT 運用のベストプラクティス
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: '.agents/rules/ を正本として Git 管理',
                  desc: '共通ルールソースはバージョン管理し、変更履歴を追跡可能にします。',
                },
                {
                  title: 'ツール固有の差分は最小限に',
                  desc: '各ツールには「共通ルールへの参照」と「固有の振る舞い指示」のみ記述します。',
                },
                {
                  title: 'ルール変更は PR レビューを通す',
                  desc: 'ルール変更は全ツールに波及します。PR でチームレビューを行いましょう。',
                },
                {
                  title: '.gitignore でローカル設定を除外',
                  desc: 'CLAUDE.local.md、settings.local.json、API キーは .gitignore に登録します。',
                },
                {
                  title: 'rules-to-skills フィードバックループ',
                  desc: '頻出する指摘は rules/ に追加し、成熟したら skills/ にパッケージ化します。',
                },
              ].map(item => (
                <div key={item.title} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 md:p-6 rounded-xl border-2 border-[var(--claude-primary)] bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base md:text-lg font-bold mb-3">.gitignore の推奨設定</h3>
              <CodeBlock language="text" code={`# ローカル設定（Git管理外）
CLAUDE.local.md
.claude/settings.local.json

# 以下は Git 管理対象
# CLAUDE.md
# AGENTS.md
# .agents/
# .cursor/rules/
# .gemini/config.yaml
# .github/copilot-instructions.md`} />
            </div>
          </section>
        </div>

        <CodingChallenge
            preview
            previewType="terminal"
            title="SSOT ルール同期スクリプトを書こう"
            description=".agents/rules/ の共通ルールソースから各 AI ツールの設定ファイルを生成するシェルスクリプトを書いてください。"
            initialCode={`#!/bin/bash\n# scripts/sync-ai-rules.sh\nset -euo pipefail\nRULES=".agents/rules"\n\n# 1. CLAUDE.md の生成（base.md + coding-standards.md を結合）:\n\n# 2. AGENTS.md の生成:\n\n# 3. Copilot instructions の生成:\n\n# 4. シンボリックリンクの作成:\n# .claude/commands/review.md → .agents/commands/review.md`}
            answer={`#!/bin/bash\n# scripts/sync-ai-rules.sh\nset -euo pipefail\nRULES=".agents/rules"\n\n# 1. CLAUDE.md の生成（base.md + coding-standards.md を結合）:\n{\n  echo "# プロジェクトルール"; echo ""\n  cat "$RULES/base.md"; echo ""\n  echo "## コーディング規約"\n  cat "$RULES/coding-standards.md"\n} > CLAUDE.md\n\n# 2. AGENTS.md の生成:\ncp CLAUDE.md AGENTS.md\n\n# 3. Copilot instructions の生成:\nmkdir -p .github\ncp CLAUDE.md .github/copilot-instructions.md\n\n# 4. シンボリックリンクの作成:\nmkdir -p .claude/commands\nln -sf "../../.agents/commands/review.md" \\\n  .claude/commands/review.md`}
            hints={[
              'cat と echo でファイルを結合して CLAUDE.md を生成します',
              'cp で AGENTS.md や copilot-instructions.md に複製します',
              'ln -sf でシンボリックリンクを作成して共通コマンドを参照します',
            ]}
            keywords={['CLAUDE.md', 'AGENTS.md', 'copilot-instructions', 'ln -sf', '.agents/rules']}
          />

        <PageNavigation />
      </div>
    </div>
  );
}
