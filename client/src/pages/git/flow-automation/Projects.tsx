import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodingChallenge from "@/components/CodingChallenge";

export default function Projects() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            GitHub Projects 連携
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Issue と PR を横断して進捗を追うのが GitHub Projects です。 新しい
            Issue を自動でボードに載せ、PR がマージされたら自動で Done へ
            動かす——手で貼り替える作業をなくし、ボードを常に現実と一致させます。
          </p>
        </div>

        <WhyNowBox tags={["Projects", "可視化", "自動追加", "ステータス"]}>
          <p>
            ボードは、更新されて初めて意味を持ちます。手で動かす前提だと、
            忙しいときほど更新が滞り、「ボードを見ても現実が分からない」状態になります。
            そうなると誰もボードを見なくなり、別途スプレッドシートで管理が始まる——
            という悪循環に陥ります。追加と移動を自動化することが、
            ボードを信頼できる情報源に保つ条件です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Projects でできること
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              現在の GitHub Projects（Projects v2）は、Issue / PR を項目として
              持ち、<strong>カスタムフィールド</strong>（ステータス・優先度・
              イテレーション・見積もりなど）を付けられます。同じデータを
              テーブル・ボード（カンバン）・ロードマップという複数のビューで
              見られるのが特徴です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  テーブル
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  スプレッドシート風。フィールドで並べ替え・フィルタして俯瞰する。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  ボード
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ステータス列のカンバン。Todo / In progress / Done
                  の流れを見る。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  ロードマップ
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  イテレーションや日付で時間軸に並べ、計画を俯瞰する。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              項目を自動で追加する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Projects には<strong>組み込みのワークフロー</strong>があり、
              設定画面から「Auto-add to project」を有効にすると、条件に合う
              Issue / PR
              を自動でボードへ載せられます。より細かく制御したいときは、
              <code>actions/add-to-project</code>{" "}
              を使ってワークフローから追加します。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/workflows/add-to-project.yml"
              code={`name: Add to project

on:
  issues:
    types: [opened]
  pull_request:
    types: [opened]

jobs:
  add-to-project:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/add-to-project@v1
        with:
          project-url: https://github.com/orgs/your-org/projects/1
          github-token: \${{ secrets.ADD_TO_PROJECT_PAT }}`}
            />

            <InfoBox
              type="warning"
              title="組織 Projects には GITHUB_TOKEN では届かない"
            >
              組織レベルの Projects を操作するには、
              <strong>Projects の権限を持つトークン</strong>が必要です。
              ワークフロー既定の <code>GITHUB_TOKEN</code> は 組織 Projects
              への書き込み権限を持たないため、 専用の PAT（または GitHub
              App）をシークレットに登録して渡します。
              仕様上は「トークンで操作できる」でも、実測では
              「既定トークンだと権限不足で失敗する」典型例です。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ステータスを自動で動かす
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Projects の組み込みワークフローは、追加だけでなく
              ステータスの自動遷移も扱えます。「項目が追加されたら Todo」 「PR
              がマージされたら Done」「Issue がクローズされたら Done」
              といった遷移を、コードを書かずに設定できます。
              これでボードが自動的に現実へ追随します。
            </p>

            <MermaidDiagram
              title="図: Issue / PR のライフサイクルとステータス自動遷移"
              chart={`flowchart LR
    O["Issue / PR 作成"] -->|"Auto-add"| T["Todo"]
    T -->|"着手"| IP["In progress"]
    IP -->|"PR マージ / クローズ"| D["Done"]`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              フローの中での位置づけ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここまでの層——ラベルで分類し、CODEOWNERS で担当を決める——と
              Projects はつながります。Issue が生まれた瞬間に、
              ラベルが付き、担当が決まり、ボードに載る。開発者が意識しなくても、
              「今どこに何があるか」が常に最新に保たれる状態が理想です。
              Projects は、その情報を人に見せる<strong>窓口</strong>
              の役割を担います。
            </p>
          </section>

          <section>
            <Quiz
              question="organization の Projects へ Issue を自動追加するワークフローが、権限不足で失敗する。最も可能性が高い原因はどれ？"
              options={[
                {
                  label:
                    "既定の GITHUB_TOKEN には組織 Projects への書き込み権限がないため",
                  correct: true,
                },
                { label: "add-to-project は PR にしか使えないため" },
                { label: "Projects v2 はワークフローから操作できないため" },
                { label: "schedule トリガーが必要なため" },
              ]}
              explanation="ワークフロー既定の GITHUB_TOKEN は、組織レベルの Projects を操作する権限を持ちません。Projects のスコープを持つ PAT または GitHub App のトークンをシークレットとして登録し、github-token に渡す必要があります。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手を動かす — 自動追加ワークフローを書く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Issue が開かれたら Projects に追加するワークフローの{" "}
              <code>___</code> を埋めてください。
            </p>

            <CodingChallenge
              preview
              previewType="config"
              title="add-to-project を完成させよう"
              description="Issue の作成時に、専用トークンで Projects へ項目を追加します。"
              initialCode={`name: Add to project
on:
  issues:
    types: [opened]
jobs:
  add:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/add-to-project@v1
        with:
          project-url: https://github.com/orgs/your-org/projects/1
          github-token: \${{ ___.ADD_TO_PROJECT_PAT }}`}
              answer={`name: Add to project
on:
  issues:
    types: [opened]
jobs:
  add:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/add-to-project@v1
        with:
          project-url: https://github.com/orgs/your-org/projects/1
          github-token: \${{ secrets.ADD_TO_PROJECT_PAT }}`}
              hints={["登録した秘密のトークンを参照するコンテキストは secrets"]}
              keywords={["secrets"]}
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Automating Projects using Actions",
                  url: "https://docs.github.com/issues/planning-and-tracking-with-projects/automating-your-project/automating-projects-using-actions",
                  description:
                    "add-to-project など Actions での Projects 自動化",
                },
                {
                  title: "Using the built-in automations",
                  url: "https://docs.github.com/issues/planning-and-tracking-with-projects/automating-your-project/using-the-built-in-automations",
                  description:
                    "組み込みワークフロー（自動追加・ステータス遷移）",
                },
                {
                  title: "About Projects",
                  url: "https://docs.github.com/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects",
                  description: "ビュー・フィールドなど Projects v2 の全体像",
                },
              ]}
            />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
