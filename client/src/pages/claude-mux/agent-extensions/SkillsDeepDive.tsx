import {
  Sparkles,
  FolderTree,
  Settings2,
  Braces,
  GitFork,
  HelpCircle,
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

export default function SkillsDeepDive() {
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
            Skills 深掘り
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            置き場所と優先順位、frontmatter
            の設計、引数、複数ファイル構成、フォーク実行まで。Skills
            を道具として使いこなすための一段深い知識。
          </p>
          <VerifiedBox
            verifiedAt="2026-08-22"
            cmuxVersion="Claude Code 2.1.239"
            platform="macOS (Apple Silicon)"
            officialDocs="https://code.claude.com/docs/en/skills"
            officialDocsLabel="公式: Extend Claude with skills"
          />
        </div>

        <div className="space-y-12 mt-8">
          {/* 置き場所と優先順位 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FolderTree className="text-[var(--claude-primary)]" />
              置き場所が「誰が使えるか」を決める
            </h2>
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 mb-4">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      レベル
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      パス
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      適用範囲
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    [
                      "Personal",
                      "~/.claude/skills/<name>/SKILL.md",
                      "自分の全プロジェクト",
                    ],
                    [
                      "Project",
                      ".claude/skills/<name>/SKILL.md",
                      "そのプロジェクトのみ（Git でチーム共有）",
                    ],
                    [
                      "Plugin",
                      "<plugin>/skills/<name>/SKILL.md",
                      "プラグインを有効にした場所",
                    ],
                    ["Enterprise", "managed settings 配下", "組織の全ユーザー"],
                  ].map(([level, path, scope]) => (
                    <tr key={level} className="bg-white dark:bg-slate-900">
                      <td className="px-4 py-3 font-bold text-[var(--claude-primary)] whitespace-nowrap">
                        {level}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {path}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {scope}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <InfoBox type="info" title="同名スキルの解決ルール">
              レベル間では enterprise &gt; personal &gt; project
              の順に勝ちます。プラグインスキルは{" "}
              <code>plugin-name:skill-name</code>{" "}
              の名前空間を持つため衝突しません。
              <code>.claude/commands/deploy.md</code> と{" "}
              <code>.claude/skills/deploy/SKILL.md</code> が両方あるときは
              <strong>スキルが優先</strong>
              されます。モノレポでは作業ディレクトリ配下の入れ子の{" "}
              <code>.claude/skills/</code> も <code>apps/web:deploy</code>{" "}
              のようなディレクトリ修飾名で読み込まれます。
            </InfoBox>
          </section>

          {/* 呼び出しの制御 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Sparkles className="text-[var(--claude-primary)]" />
              呼び出しの 2 経路を設計する
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              スキルは「ユーザーが <code>/name</code> で呼ぶ」「Claude が{" "}
              <code>description</code> を見て自動で使う」の 2
              経路で起動します。frontmatter でこの 2 経路を独立に制御できます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">
                  disable-model-invocation: true
                </code>
                <p className="text-xs text-muted-foreground mt-2">
                  Claude の自動呼び出しを止める。デプロイ手順のように
                  <strong>人が明示的に起動すべきワークフロー</strong>に付ける。
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">
                  user-invocable: false
                </code>
                <p className="text-xs text-muted-foreground mt-2">
                  <code>/</code> メニューから隠す。ユーザーが直接呼ぶ意味のない
                  <strong>背景知識スキル</strong>に付ける。
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <code>description</code> は Claude
              が使いどきを判断する唯一の手がかりです。利用者が自然に言いそうなキーワードを含め、主要ユースケースを先頭に書きます（
              <code>when_to_use</code> との合計は一覧上 1,536
              文字で切り詰められる）。
            </p>
          </section>

          {/* 引数 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Braces className="text-[var(--claude-primary)]" />
              引数を受け取る
            </h2>
            <CodeBlock
              code={`# .claude/skills/fix-issue/SKILL.md
---
name: fix-issue
description: GitHub issue を番号指定で修正する
disable-model-invocation: true
argument-hint: "[issue-number]"
---

GitHub issue $ARGUMENTS をコーディング規約に従って修正してください。

1. issue の内容を読む
2. 要件を整理する
3. 修正を実装しテストを書く
4. コミットを作成する`}
              language="markdown"
            />
            <div className="mt-4 space-y-3">
              {[
                {
                  syntax: "$ARGUMENTS",
                  desc: "スキル名の後ろに続く入力全体に置換される（/fix-issue 123 → 「GitHub issue 123 を…」）",
                },
                {
                  syntax: "$ARGUMENTS[N] / $N",
                  desc: "位置指定で個別の引数にアクセスする（$0 が最初の引数）",
                },
                {
                  syntax: "argument-hint",
                  desc: "オートコンプリート時に期待する引数の形を表示する",
                },
              ].map((item) => (
                <div
                  key={item.syntax}
                  className="flex items-start gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50"
                >
                  <code className="text-[var(--claude-primary)] font-bold text-xs min-w-[140px] shrink-0">
                    {item.syntax}
                  </code>
                  <span className="text-sm text-muted-foreground">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
            <InfoBox type="info" title="$ARGUMENTS を書き忘れても引数は届く">
              スキル本文に <code>$ARGUMENTS</code> が無い場合、Claude Code
              は入力を <code>ARGUMENTS: &lt;入力&gt;</code>{" "}
              として本文末尾に追記します。また{" "}
              <code>/write-tests /fix-issue 123</code> のように 1
              メッセージで複数スキルを重ねて起動できます。
            </InfoBox>
          </section>

          {/* 複数ファイル */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Settings2 className="text-[var(--claude-primary)]" />
              複数ファイル構成と Progressive Disclosure
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              SKILL.md は<strong>概要とナビゲーションに徹し</strong>
              、詳細は別ファイルへ分けます。参照ファイルは必要になったときにだけ読み込まれるため、スキルを増やしてもコンテキストを圧迫しません。公式は
              SKILL.md を 500 行以下に保つことを推奨しています。
            </p>
            <CodeBlock
              code={`my-skill/
├── SKILL.md       # 必須。概要と「どのファイルに何があるか」
├── reference.md   # 詳細な API 仕様（必要時にロード）
├── examples.md    # 使用例（必要時にロード）
└── scripts/
    └── helper.py  # ユーティリティ（実行される。ロードはされない）

# SKILL.md からの参照の書き方
## Additional resources
- API の詳細は [reference.md](reference.md)
- 使用例は [examples.md](examples.md)`}
              language="text"
            />
          </section>

          {/* フォーク実行 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <GitFork className="text-[var(--claude-primary)]" />
              サブエージェントで実行する（context: fork）
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              <code>context: fork</code>{" "}
              を付けると、スキルはフォークされたサブエージェントのコンテキストで実行されます。大量のファイルを読む調査系スキルでも、メインの会話コンテキストを消費しません。
            </p>
            <CodeBlock
              code={`---
name: audit-deps
description: 依存パッケージの脆弱性と更新状況を監査する
context: fork        # フォークしたサブエージェントで実行
agent: Explore       # 使用するサブエージェントタイプ（任意）
background: false    # true（既定）ならバックグラウンド実行
allowed-tools: Bash(npm audit *) Read Grep
model: haiku         # このスキル実行中だけのモデル上書き（任意）
---`}
              language="markdown"
            />
            <p className="text-sm text-muted-foreground mt-4">
              <code>allowed-tools</code>{" "}
              はスキルを起動したターンの間だけツールを事前承認します（次のメッセージでクリア）。
              <code>model</code> / <code>effort</code>{" "}
              はそのスキルの実行中だけの上書きです。
            </p>
          </section>

          {/* 他機能との使い分け */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4">
              他の拡張機能との使い分け
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      目的
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      選ぶ機能
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    [
                      "毎セッション必ず読ませたい規約・前提",
                      "CLAUDE.md（常時コンテキストに載る）",
                    ],
                    [
                      "特定の作業のときだけ使う手順・専門知識",
                      "Skills（必要時にだけロードされる）",
                    ],
                    [
                      "独立したコンテキストで委譲したいタスク",
                      "Subagents（結果だけが返る）",
                    ],
                    [
                      "LLM を介さず確実に実行したい処理",
                      "Hooks（イベントで決定的に発火）",
                    ],
                    ["外部サービス・データへの接続", "MCP サーバー"],
                    ["上記をまとめてチームに配布", "Plugins"],
                  ].map(([goal, feature]) => (
                    <tr key={goal} className="bg-white dark:bg-slate-900">
                      <td className="px-3 py-2 text-muted-foreground">
                        {goal}
                      </td>
                      <td className="px-3 py-2 font-bold text-[var(--claude-primary)] whitespace-nowrap">
                        {feature}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* トラブルシューティング */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <HelpCircle className="text-[var(--claude-primary)]" />
              トラブルシューティング
            </h2>
            <div className="space-y-3">
              {[
                {
                  symptom: "スキルが発動しない",
                  fix: "description に利用者が自然に言うキーワードを足す。「What skills are available?」で認識されているか確認。frontmatter の YAML が壊れていると本文だけ読み込まれ description が空になる（--debug でパースエラーを確認）。",
                },
                {
                  symptom: "発動しすぎる",
                  fix: "description をより具体的にする。手動起動だけでよければ disable-model-invocation: true を付ける。",
                },
                {
                  symptom: "description が切り詰められる",
                  fix: 'スキル一覧のコンテキスト予算はモデルのコンテキストウィンドウの 1%。/doctor で一覧のコストと上位要因を確認し、skillListingBudgetFraction で予算を上げるか、低優先スキルを skillOverrides で "name-only" にする。',
                },
              ].map((item) => (
                <div
                  key={item.symptom}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50"
                >
                  <h4 className="font-bold text-sm mb-1 text-[var(--claude-primary)]">
                    {item.symptom}
                  </h4>
                  <p className="text-sm text-muted-foreground">{item.fix}</p>
                </div>
              ))}
            </div>
          </section>

          <CodingChallenge
            preview
            previewType="markdown"
            title="手動起動専用のスキルを設計しよう"
            description="リリース作業のスキルを書いてください。人が /release とだけ打って起動し（Claude の自動呼び出しは禁止）、バージョン番号を引数で受け取ります。"
            initialCode={`# .claude/skills/release/SKILL.md\n\n---\nname: release\ndescription: バージョンを上げてタグを打ち、リリースノートを作る\n___: true  # ← ここを埋める（自動呼び出しの禁止）\nargument-hint: "[version]"\n---\n\nバージョン ___ のリリース作業を行ってください。  # ← ここを埋める（引数の置換）\n\n1. package.json の version を更新\n2. CHANGELOG.md に変更内容を追記\n3. Git タグを "v{version}" 形式で作成\n4. リリースノートの下書きを作成`}
            answer={`# .claude/skills/release/SKILL.md\n\n---\nname: release\ndescription: バージョンを上げてタグを打ち、リリースノートを作る\ndisable-model-invocation: true\nargument-hint: "[version]"\n---\n\nバージョン $ARGUMENTS のリリース作業を行ってください。\n\n1. package.json の version を更新\n2. CHANGELOG.md に変更内容を追記\n3. Git タグを "v{version}" 形式で作成\n4. リリースノートの下書きを作成`}
            hints={[
              "disable-model-invocation: true で Claude の自動呼び出しを止め、/release の手動起動だけにします",
              "$ARGUMENTS はスキル名の後ろに続く入力（バージョン番号）に置換されます",
            ]}
            keywords={["disable-model-invocation", "$ARGUMENTS"]}
          />

          {/* 参考リンク */}
          <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-xl font-bold mb-4">参考リンク</h2>
            <ul className="space-y-2 text-sm">
              {[
                {
                  label: "Extend Claude with skills（公式）",
                  url: "https://code.claude.com/docs/en/skills",
                },
                {
                  label: "Extend Claude Code — 機能の使い分け（公式）",
                  url: "https://code.claude.com/docs/en/features-overview",
                },
                {
                  label: "エージェントスキル入門（公式ラーニングパス）",
                  url: "https://academy.claude.com/ja/courses/introduction-to-agent-skills",
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
