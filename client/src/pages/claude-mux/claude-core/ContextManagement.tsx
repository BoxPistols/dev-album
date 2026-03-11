import { FileText, Filter, EyeOff, Layers, FolderTree, Brain } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';

export default function ContextManagement() {
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
            コンテキスト管理
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            CLAUDE.mdによるメモリ管理と、.claudeignoreによる参照範囲の制御。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* CLAUDE.md メモリ階層 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Layers className="text-[var(--claude-primary)]" />
              CLAUDE.md メモリ階層
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Codeは複数階層のCLAUDE.mdファイルから指示を読み込みます。チーム共有・個人設定・プロジェクト固有の指示を分離管理できます。
            </p>
            <div className="space-y-3">
              {[
                { scope: 'プロジェクト共有', path: './CLAUDE.md', desc: 'チームメンバーと共有するプロジェクト指示。Git管理対象。', color: 'text-blue-600 dark:text-blue-400' },
                { scope: 'プロジェクトルール', path: '.claude/rules/*.md', desc: 'トピック別のモジュラーな指示ファイル。パス条件付きfrontmatter対応。', color: 'text-blue-600 dark:text-blue-400' },
                { scope: 'ユーザー共通', path: '~/.claude/CLAUDE.md', desc: '全プロジェクトに適用される個人設定。', color: 'text-purple-600 dark:text-purple-400' },
                { scope: 'ユーザールール', path: '~/.claude/rules/*.md', desc: '全プロジェクト用の個人ルール。', color: 'text-purple-600 dark:text-purple-400' },
                { scope: 'プロジェクトローカル', path: './CLAUDE.local.md', desc: '個人のプロジェクト固有設定。.gitignore対象。', color: 'text-emerald-600 dark:text-emerald-400' },
              ].map(item => (
                <div key={item.path} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <div className="min-w-[120px]">
                    <span className={`text-xs font-bold ${item.color}`}>{item.scope}</span>
                  </div>
                  <div className="flex-1">
                    <code className="text-sm font-mono text-[var(--claude-primary)]">{item.path}</code>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <InfoBox type="info" title="読み込み順序">
              作業ディレクトリからルートまで再帰的にCLAUDE.mdを検索します。子ディレクトリのCLAUDE.mdは、Claudeがそのディレクトリのファイルにアクセスした際にオンデマンドで読み込まれます。
            </InfoBox>
          </section>

          {/* @import と初期化 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FolderTree className="text-[var(--claude-primary)]" />
              @import構文とルール管理
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              CLAUDE.md内で <code>@path/to/file</code> と記述することで、外部ファイルを参照・インポートできます。
            </p>
            <CodeBlock code={`# CLAUDE.md の例

プロジェクトの技術スタックはReact + TypeScript + Tailwind CSS。

@docs/coding-standards.md
@~/.claude/my-global-rules.md`} language="markdown" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2">相対・絶対パス対応</h4>
                <p className="text-xs text-muted-foreground"><code>@./local-file.md</code> や <code>@~/global.md</code> の両方に対応。再帰インポートは最大深度5。</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2">パス条件付きルール</h4>
                <p className="text-xs text-muted-foreground"><code>.claude/rules/*.md</code> のfrontmatterで <code>paths: ["src/api/**/*.ts"]</code> を指定すると、該当パスのファイル操作時のみ適用されます。</p>
              </div>
            </div>
          </section>

          {/* 自動メモリ */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Brain className="text-[var(--claude-primary)]" />
              自動メモリ
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Claudeはセッション中に学んだパターンや設定を自動的に記録します。
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <code className="text-xs text-[var(--claude-primary)]">~/.claude/projects/&lt;project&gt;/memory/MEMORY.md</code>
                <p className="text-xs text-muted-foreground mt-1">プロジェクト別の自動メモリ。起動時にMEMORY.mdの先頭200行が読み込まれます。</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-muted-foreground"><code>/memory</code> コマンドでCLAUDE.mdを直接編集可能。「これを覚えて」と指示すれば、Claudeが自動的にメモリに保存します。</p>
              </div>
            </div>
          </section>

          {/* .claudeignore */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Filter className="text-[var(--claude-primary)]" />
              .claudeignore
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              <code>.gitignore</code> と同様の構文で、Claude Codeがスキャン時に無視するファイル・ディレクトリを指定します。
            </p>
            <CodeBlock
              code={`# .claudeignore の例
node_modules/
dist/
build/
*.log
.git/
package-lock.json
pnpm-lock.yaml
*.svg
*.png
.env
.env.*
secrets/`}
              language="text"
            />
          </section>

          {/* セキュリティ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <EyeOff className="text-amber-500" />
              秘匿情報の保護
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              <code>.env</code> ファイルや秘密鍵は必ず <code>.claudeignore</code> に含めてください。加えて、<code>settings.json</code> のパーミッション設定でファイル読み取りを明示的に拒否できます。
            </p>
            <CodeBlock code={`// .claude/settings.json の例
{
  "permissions": {
    "deny": ["Read(./.env)", "Read(./secrets/**)"]
  }
}`} language="json" />
            <InfoBox type="warning" title="セキュリティ">
              .claudeignore とパーミッション設定は補完的なセキュリティレイヤーです。両方を設定することで、エージェントによる意図しないファイルアクセスを防止できます。
            </InfoBox>
          </section>

          {/* コンテキスト監視 */}
          <section className="p-8 rounded-2xl border border-[var(--claude-primary)]/20 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <FileText className="text-[var(--claude-primary)]" />
              コンテキスト使用量の監視
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              以下のコマンドでコンテキストウィンドウの使用状況を把握できます。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                <code className="text-sm font-bold text-[var(--claude-primary)]">/context</code>
                <p className="text-xs text-muted-foreground mt-2">カラーグリッドで視覚的に確認</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                <code className="text-sm font-bold text-[var(--claude-primary)]">/compact</code>
                <p className="text-xs text-muted-foreground mt-2">会話履歴を要約して圧縮</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                <code className="text-sm font-bold text-[var(--claude-primary)]">/clear</code>
                <p className="text-xs text-muted-foreground mt-2">タスク切替時に完全リセット</p>
              </div>
            </div>
          </section>
        </div>

        <CodingChallenge
          preview
          previewType="markdown"
          title="CLAUDE.md を設計してみよう"
          description="プロジェクトルートの CLAUDE.md に、コンテキスト階層・@import・.claudeignore のルールをまとめたガイドを書いてください。"
          initialCode={`# CLAUDE.md\n\n## プロジェクト概要\n\n## コンテキスト管理\n\n## 除外設定`}
          answer={`# CLAUDE.md\n\n## プロジェクト概要\nReact + TypeScript のWebアプリケーション。\n\n## コンテキスト管理\n- チーム共有ルール: ./CLAUDE.md\n- 個人設定: ~/.claude/CLAUDE.md\n- トピック別: .claude/rules/*.md\n\n@docs/api-guide.md\n@.claude/rules/testing.md\n\n## 除外設定\n.claudeignore に以下を追加:\n- node_modules/\n- dist/\n- .env\n- *.log`}
          hints={[
            'CLAUDE.md はプロジェクトの技術スタックと基本ルールを定義します',
            '@import で外部ファイルを参照できます（@path/to/file.md）',
            '.claudeignore で不要なファイルをスキャン対象外にしましょう',
          ]}
          keywords={['CLAUDE.md', '@', '.claudeignore', 'node_modules']}
        />

        <PageNavigation />
      </div>
    </div>
  );
}
