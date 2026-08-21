import {
  Layers,
  FolderTree,
  Filter,
  Link2,
  UserCog,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodingChallenge from "@/components/CodingChallenge";
import VerifiedBox from "@/components/VerifiedBox";

export default function ProjectRules() {
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
            プロジェクト指示の階層 — CLAUDE.md と .claude/rules/
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            指示を「いつ読み込まれるか」で分ける。常時ロードの
            CLAUDE.md、トピック別の rules、パスに応じた条件付きロード。
          </p>
          <VerifiedBox
            verifiedAt="2026-08-22"
            cmuxVersion="Claude Code 2.1.239"
            platform="macOS (Apple Silicon)"
            officialDocs="https://code.claude.com/docs/en/memory"
            officialDocsLabel="公式: How Claude remembers your project"
          />
        </div>

        <div className="space-y-12 mt-8">
          {/* ロードタイミングの階層 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Layers className="text-[var(--claude-primary)]" />
              「いつ読み込まれるか」で置き場所を決める
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              プロジェクト固有の指示を書く場所は 1 つではありません。
              <strong>
                常にコンテキストを消費するか、必要なときだけ載るか
              </strong>
              で使い分けます。
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      置き場所
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      ロードのタイミング
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      向いている内容
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    [
                      "CLAUDE.md",
                      "セッション開始時に毎回",
                      "全作業に効く前提・コマンド・規約",
                    ],
                    [
                      ".claude/rules/*.md（paths なし）",
                      "セッション開始時（.claude/CLAUDE.md と同じ優先度）",
                      "トピック別に分割した常時ルール",
                    ],
                    [
                      ".claude/rules/*.md（paths あり）",
                      "マッチするファイルを Claude が読んだとき",
                      "特定ディレクトリ・拡張子にだけ効く規約",
                    ],
                    [
                      "Skills",
                      "呼び出したとき、または Claude が関連と判断したとき",
                      "特定作業の手順・専門知識",
                    ],
                  ].map(([where, when, what]) => (
                    <tr key={where} className="bg-white dark:bg-slate-900">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-[var(--claude-primary)] whitespace-nowrap">
                        {where}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {when}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {what}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <InfoBox type="info" title="CLAUDE.md が長くなってきたら分割の合図">
              公式は CLAUDE.md を 200
              行以下に収めることを目安とし、それに近づいたら rules
              への分割を勧めています。長いファイルもすべて読み込まれますが、重要な指示がノイズに埋もれて
              <strong>遵守率が下がる</strong>ためです。常時必要でない指示は
              rules（paths 付き）か Skills に移します。
            </InfoBox>
          </section>

          {/* rules のセットアップ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FolderTree className="text-[var(--claude-primary)]" />
              rules のセットアップ
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              <code>.claude/rules/</code> に Markdown を置くだけです。1 ファイル
              1 トピックとし、<code>testing.md</code>{" "}
              のような内容が分かる名前を付けます。<code>.md</code> は
              <strong>再帰的に探索</strong>
              されるので、サブディレクトリで整理できます。
            </p>
            <CodeBlock
              code={`your-project/
├── .claude/
│   ├── CLAUDE.md            # 全体に効く主要な指示
│   └── rules/
│       ├── code-style.md    # コードスタイル
│       ├── testing.md       # テストの規約
│       ├── security.md      # セキュリティ要件
│       └── frontend/
│           └── react.md     # サブディレクトリも自動で見つかる`}
              language="text"
            />
          </section>

          {/* パス固有ルール */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Filter className="text-[var(--claude-primary)]" />
              パス固有ルール（条件付きロード）
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              frontmatter に <code>paths</code> を書くと、
              <strong>マッチするファイルを Claude が読んだときだけ</strong>
              そのルールが載ります。毎ツール呼び出しではなく、ファイルを読んだタイミングで発火します。
            </p>
            <CodeBlock
              code={`---
paths:
  - "src/api/**/*.ts"
---

# API 開発のルール

- すべての API エンドポイントで入力バリデーションを行う
- 標準のエラーレスポンス形式を使う
- OpenAPI のドキュメントコメントを付ける`}
              language="markdown"
            />
            <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      パターン
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      マッチするもの
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    ["**/*.ts", "任意のディレクトリの TypeScript ファイル"],
                    ["src/**/*", "src/ 配下のすべてのファイル"],
                    ["*.md", "プロジェクトルートの Markdown"],
                    [
                      "src/components/*.tsx",
                      "特定ディレクトリの React コンポーネント",
                    ],
                    [
                      "src/**/*.{ts,tsx}",
                      "ブレース展開で複数拡張子をまとめて指定",
                    ],
                  ].map(([pat, desc]) => (
                    <tr key={pat} className="bg-white dark:bg-slate-900">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-[var(--claude-primary)] whitespace-nowrap">
                        {pat}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <InfoBox type="warning" title="glob の落とし穴">
              <code>[</code> はブラケット式（<code>[abc]</code>
              ）の開始として解釈されます。<code>photos [2024/**</code>{" "}
              のようにブラケット式として読めないパターンは
              <strong>何にもマッチしません</strong>
              （同じルールの他のパターンは有効なまま）。リテラルの{" "}
              <code>[</code> を含むファイル名は <code>photos \[2024/**</code>{" "}
              のようにエスケープします。またブレース展開は組み合わせ数が乗算されるため、1
              ルールの <code>paths</code> 全体で 1,000
              パターンの予算があり、超えたパターンは展開されずリテラル扱いになります。
            </InfoBox>
          </section>

          {/* 共有とユーザーレベル */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Link2 className="text-[var(--claude-primary)]" />
              複数プロジェクトで共有する
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              <code>.claude/rules/</code>{" "}
              はシンボリックリンクに対応しています。共通ルールを 1
              箇所で保守し、各プロジェクトからリンクできます（循環リンクは検出されて適切に処理されます）。
            </p>
            <CodeBlock
              code={`# ディレクトリごとリンクする
$ ln -s ~/shared-claude-rules .claude/rules/shared

# 個別ファイルをリンクする
$ ln -s ~/company-standards/security.md .claude/rules/security.md`}
              language="bash"
            />
            <div className="mt-6 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <UserCog className="w-5 h-5 text-[var(--claude-primary)]" />
                ユーザーレベルのルール
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                <code>~/.claude/rules/</code> に置いたルールは
                <strong>マシン上の全プロジェクト</strong>
                に効きます。プロジェクト固有でない個人の好みはこちらに置きます。ユーザーレベルのルールはプロジェクトのルールより
                <strong>先に</strong>読み込まれ、プロジェクト側が優先されます。
              </p>
              <CodeBlock
                code={`~/.claude/rules/
├── preferences.md    # 個人のコーディングの好み
└── workflows.md      # 好みの進め方`}
                language="text"
              />
            </div>
          </section>

          {/* 限界 */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <AlertTriangle className="text-[var(--claude-primary)]" />
              ルールは「強制」ではない
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              公式が明記しているとおり、CLAUDE.md と同じく rules は{" "}
              <strong>
                Claude が読むガイダンスであって、Claude Code
                が強制する設定ではありません
              </strong>
              。確実に守らせたい制約は、別の層で担保します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm mb-2">Hooks</h4>
                <p className="text-xs text-muted-foreground">
                  イベントで決定的に発火し、exit 2
                  で操作をブロックできる。「この形式でしか書かせない」を機械的に保証する。
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm mb-2">Permissions</h4>
                <p className="text-xs text-muted-foreground">
                  <code>deny</code>{" "}
                  ルールはどのモードでも常に効く。「このファイルは絶対に読ませない・触らせない」を設定で担保する。
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              なお <code>--setting-sources</code> から <code>project</code>{" "}
              を除外すると、プロジェクトの rules は読み込まれません（v2.1.211
              以降、パススコープや入れ子の rules も含めて除外される）。
            </p>
          </section>

          <CodingChallenge
            preview
            previewType="markdown"
            title="パス固有ルールを書こう"
            description="テストファイルにだけ効くルールを .claude/rules/testing.md として書いてください。src 配下の .test.ts と .test.tsx の両方にマッチさせます。"
            initialCode={`# .claude/rules/testing.md\n\n---\n___:  # ← ここを埋める（パス指定の frontmatter キー）\n  - "src/**/*.test.___"  # ← ここを埋める（ts と tsx をまとめて指定）\n---\n\n# テストの規約\n\n- テスト名は「何をしたら何が起きるか」の形式で書く\n- 1 テスト 1 アサーションを原則とする\n- 新しいテストは一度壊して赤になることを確認してから採用する`}
            answer={`# .claude/rules/testing.md\n\n---\npaths:\n  - "src/**/*.test.{ts,tsx}"\n---\n\n# テストの規約\n\n- テスト名は「何をしたら何が起きるか」の形式で書く\n- 1 テスト 1 アサーションを原則とする\n- 新しいテストは一度壊して赤になることを確認してから採用する`}
            hints={[
              "frontmatter の paths フィールドで対象ファイルを glob 指定します",
              "ブレース展開 {ts,tsx} で複数拡張子を 1 パターンにまとめられます",
            ]}
            keywords={["paths", "{ts,tsx}"]}
          />

          {/* 参考リンク */}
          <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-xl font-bold mb-4">参考リンク</h2>
            <ul className="space-y-2 text-sm">
              {[
                {
                  label:
                    "How Claude remembers your project（公式・rules の正本）",
                  url: "https://code.claude.com/docs/en/memory",
                },
                {
                  label: "Explore the .claude directory（公式）",
                  url: "https://code.claude.com/docs/en/claude-directory",
                },
                {
                  label: "Extend Claude Code — 機能の使い分け（公式）",
                  url: "https://code.claude.com/docs/en/features-overview",
                },
              ].map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--claude-primary)] underline underline-offset-2"
                  >
                    {item.label}
                    <ExternalLink size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
