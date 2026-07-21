import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";

export default function Assignment() {
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
            アサインとレビューの自動割り当て
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            「この PR、誰が見るの？」で止まる時間をなくします。変更したパスから
            レビュー担当を自動で指名し、担当者アサインも機械に任せて、
            レビューが確実に始まる状態を作ります。
          </p>
        </div>

        <WhyNowBox
          tags={["CODEOWNERS", "レビュー", "アサイン", "ルーティング"]}
        >
          <p>
            レビューが遅れる最大の理由は、能力ではなく
            <strong>「誰が担当か決まっていない」</strong>ことです。
            担当が曖昧だと、全員が「誰かが見るだろう」と思って誰も見ません。
            変更した領域から担当を自動で決めれば、この宙ぶらりんがなくなります。
            ルーティングは、開発フロー自動化の中でも効果が見えやすい部分です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              担当者（assignee）とレビュアー（reviewer）は別物
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              GitHub には 2 種類の「担当」があります。<strong>Assignee</strong>{" "}
              はその Issue / PR を進める責任者、<strong>Reviewer</strong> は
              レビューを依頼された人です。自動化ではこの両方を扱いますが、
              特に効果が大きいのはレビュアーの自動指名です。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CODEOWNERS — 変更パスでレビュー担当を決める
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>.github/CODEOWNERS</code> は、「このパスの変更は、この人／
              チームがオーナー」という対応表です。PR がそのパスを変更すると、
              GitHub が<strong>自動でオーナーにレビューを依頼</strong>します。
              後半・後方のルールほど優先される（最後にマッチした行が勝つ）点に
              注意します。
            </p>

            <CodeBlock
              language="bash"
              title=".github/CODEOWNERS"
              code={`# 既定のオーナー（どのパスにもマッチ）
*                       @org/maintainers

# 領域ごとのオーナー
/client/src/pages/git/  @org/git-team
/client/src/features/   @org/threejs-team
*.md                    @org/docs-team

# CI 設定はプラットフォーム班が見る（最後にマッチした行が優先）
/.github/               @org/platform`}
            />

            <InfoBox
              type="info"
              title="CODEOWNERS はレビュー依頼、必須化は保護ルール"
            >
              CODEOWNERS を置くだけでは「自動でレビュー依頼が飛ぶ」までです。
              「オーナーの承認がないとマージできない」ようにするには、
              ブランチ保護で <strong>Require review from Code Owners</strong>{" "}
              を有効にします（次のページで扱います）。
              指名（CODEOWNERS）と強制（保護ルール）は別の設定です。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              チームへの自動割り振り — 負荷分散
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              CODEOWNERS にチームを指定した場合、GitHub の
              <strong>コードレビューの自動割り当て</strong>設定を使うと、
              チームの中から実際のレビュアーを自動で選べます。
              ラウンドロビン（順番）や負荷分散（担当数の少ない人）といった
              アルゴリズムを選べ、特定の人にレビューが偏るのを防げます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              作成者を自動でアサインする
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「PR の作成者を、その PR の assignee にする」のは単純ですが、
              一覧で担当が空欄にならず地味に効きます。アクションを使うと、 PR
              が開かれたときに自動で設定できます。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/workflows/assign-author.yml"
              code={`name: Assign author

on:
  pull_request:
    types: [opened]

jobs:
  assign:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - name: 作成者を assignee に
        run: gh pr edit "$PR" --add-assignee "$AUTHOR"
        env:
          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          PR: \${{ github.event.pull_request.number }}
          AUTHOR: \${{ github.event.pull_request.user.login }}
          GH_REPO: \${{ github.repository }}`}
            />
          </section>

          <section>
            <Quiz
              question="CODEOWNERS を置いたら、変更パスのオーナーへ自動でレビュー依頼は飛ぶようになった。しかしオーナーの承認なしでもマージできてしまう。追加で必要な設定はどれ？"
              options={[
                { label: "CODEOWNERS のパスを * に変更する" },
                {
                  label:
                    "ブランチ保護で Require review from Code Owners を有効にする",
                  correct: true,
                },
                { label: "labeler ワークフローを追加する" },
                { label: "assignee を自動設定する" },
              ]}
              explanation="CODEOWNERS は「レビュー依頼を自動で飛ばす」までで、承認を必須化する機能ではありません。オーナーの承認をマージ条件にするには、ブランチ保護（またはルールセット）で Require review from Code Owners を有効にします。指名と強制は別の設定である、という切り分けが重要です。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手を動かす — CODEOWNERS を書く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Markdown はドキュメント班、それ以外の既定は maintainers が
              オーナーになる CODEOWNERS の <code>___</code> を埋めてください。
            </p>

            <CodingChallenge
              preview
              previewType="config"
              title="CODEOWNERS を完成させよう"
              description="既定のオーナーを全パスに設定し、Markdown だけドキュメント班に割り当てます。"
              initialCode={`# 既定のオーナー（全パス）
___                @org/maintainers

# Markdown はドキュメント班
*.md               ___`}
              answer={`# 既定のオーナー（全パス）
*                  @org/maintainers

# Markdown はドキュメント班
*.md               @org/docs-team`}
              hints={[
                "どのパスにもマッチする既定パターンは * （アスタリスク）",
                "オーナーは @組織/チーム 形式で書く（例: @org/docs-team）",
              ]}
              keywords={["*", "@org/docs-team"]}
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "About code owners",
                  url: "https://docs.github.com/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners",
                  description: "CODEOWNERS の構文とレビュー自動依頼の仕組み",
                },
                {
                  title: "Managing code review settings for your team",
                  url: "https://docs.github.com/organizations/organizing-members-into-teams/managing-code-review-settings-for-your-team",
                  description:
                    "チーム内のレビュアー自動割り当て（ラウンドロビン等）",
                },
                {
                  title: "About assignees",
                  url: "https://docs.github.com/issues/tracking-your-work-with-issues/assigning-issues-and-pull-requests-to-other-github-users",
                  description: "Issue / PR の担当者アサインの基本",
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
