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

const mergeStrategies = [
  {
    title: "Squash and merge",
    description:
      "PR のコミットを1つにまとめて main に乗せる。履歴が PR 単位で1行になり読みやすい。途中の試行錯誤コミットを残したくないチーム向け。",
  },
  {
    title: "Rebase and merge",
    description:
      "PR の各コミットを main の先頭に積み直す。マージコミットを作らず履歴が一直線になる。コミットを意味単位で整えている場合に有効。",
  },
  {
    title: "Merge commit",
    description:
      "マージコミットを作り、ブランチの分岐と合流を履歴に残す。いつ何が統合されたかを正確に追える反面、履歴が枝分かれして見える。",
  },
];

export default function PullRequest() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        {/* Header */}
        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            Pull Request の運用
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Pull
            Request（PR）はレビューの単位であり、変更を共有する最小のパッケージです。
            小さく出す、説明を添える、CI
            を必須にする——こうした運用の積み重ねが、
            レビューの速さと質を両立させます。ここでは PR
            を回しやすくする実践を整理します。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "Pull Request",
            "CI",
            "マージ戦略",
            "コードオーナー",
            "GitHub",
          ]}
        >
          <p>
            PR
            は単なる「マージ申請」ではなく、レビュアーが変更を理解するための入口です。
            <strong>
              同じ変更でも、PR
              の作り方ひとつでレビューの所要時間は大きく変わります。
            </strong>
            小さく分割し、意図を説明し、CI で機械的なチェックを済ませておく。
            この準備があるかどうかで、レビュアーは「設計の議論」に集中できるか
            「読み解き作業」に時間を取られるかが分かれます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* PR のライフサイクル図 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              PR のライフサイクル
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              PR は「開く → CI → レビュー → 承認 → マージ」という流れで進みます。
              各ステップで誰が何をするかを整理すると、運用の勘所が掴めます。
            </p>
            <MermaidDiagram
              title="図: PR のライフサイクル"
              chart={`sequenceDiagram
    participant A as "作者"
    participant G as "GitHub"
    participant CI as "CI"
    participant R as "レビュアー"
    A->>G: "PR を open"
    G->>CI: "チェック起動"
    CI-->>G: "Lint / 型 / テスト 結果"
    G->>R: "レビュー依頼"
    R->>A: "コメント (指摘・質問)"
    A->>G: "修正を push"
    G->>CI: "再チェック"
    R->>G: "Approve"
    A->>G: "Merge"`}
            />
          </section>

          {/* 小さい PR の価値 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              小さい PR の価値
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              PR が小さいほどレビューは速く、正確になります。Google の
              Engineering Practices は「どれくらいが大きすぎるかに厳密な基準は無い」
              と断った上で、100 行程度が妥当なサイズ、1000
              行は大きすぎることが多く、判断はレビュアー次第だとしています。 小さい
              PR は
              <strong>
                レビュー負荷を下げ、フィードバックを早め、コンフリクトのリスクも減らします
              </strong>
              。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              大きな機能は「動く最小単位」に分割して出すのが基本です。たとえば
              「APIの追加」「画面の追加」「両者の結合」のように段階を分ければ、
              各 PR が独立して読め、レビューも並行して進められます。
            </p>

            <InfoBox type="info" title="目安は「一度に読み切れる量」">
              行数の絶対基準より「レビュアーが一気に読み切れるか」を基準にすると実用的です。
              機能が分割しづらいときは、リファクタリングと機能追加を別 PR
              に分けるだけでも、 差分の意図がぐっと追いやすくなります。
            </InfoBox>
          </section>

          {/* Draft PR とセルフレビュー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Draft PR とセルフレビュー
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              実装の途中で方向性だけ共有したいときは
              <strong>Draft PR（下書き PR）</strong>を使います。 GitHub
              の公式ドキュメントによれば、Draft PR
              はマージできず、コードオーナーへのレビュー依頼も自動では行われません。
              正式なレビュー依頼をせずに作業中の内容を共有できる状態です。
              完成したら Ready for review に切り替えてレビュアーに渡します。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レビューを依頼する前に、まず自分で差分を上から下まで読む
              <strong>セルフレビュー</strong>を習慣にすると効果的です。
              デバッグ用の出力、消し忘れたコメント、無関係なフォーマット変更などは、
              自分で先に拾えばレビュアーの時間を本質的な議論に回せます。
            </p>

            <Quiz
              question="GitHub の Draft PR の説明として、公式ドキュメントに合致するのはどれ？"
              options={[
                { label: "そのままマージでき、レビューも自動で依頼される" },
                {
                  label:
                    "マージはできず、コードオーナーへのレビュー依頼も自動では行われない",
                  correct: true,
                },
                { label: "差分がレビュアーから見えなくなる" },
                { label: "作成後は Ready for review に切り替えられない" },
              ]}
              explanation="Draft PR は「まだレビュー依頼の準備が整っていない」状態を表します。公式ドキュメントは、Draft PR はマージできず、コードオーナーへのレビュー依頼も自動では行われないと説明しています。作業中の内容を、正式なレビュー依頼をせずに共有したいときに使い、完成したら Ready for review に切り替えます。"
            />
          </section>

          {/* PR テンプレートと説明 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              PR テンプレートと説明の書き方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              PR の説明は「何を・なぜ・どう確認したか」を伝える場です。
              差分を読めば「何が変わったか」は分かりますが、
              <strong>
                「なぜその変更が必要か」「どう動作確認したか」はコードに現れません
              </strong>
              。 ここを言語化するとレビューが一気に楽になります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              リポジトリ直下に <code>.github/pull_request_template.md</code>{" "}
              を置くと、 PR
              作成時に説明欄へ自動で雛形が入ります。全員が同じ観点で書けるようになり、
              書き忘れも減ります。
            </p>

            <CodeBlock
              language="md"
              title=".github/pull_request_template.md"
              code={`## 概要
<!-- この PR で何を変えたか、1〜2文で -->

## 背景・目的
<!-- なぜこの変更が必要か。関連 Issue があればリンク -->
Closes #

## 変更内容
- [ ] 変更点1
- [ ] 変更点2

## 動作確認
<!-- どう確認したか。手順・スクショ・テスト結果など -->

## レビュー観点
<!-- 特に見てほしい箇所、判断に迷った点 -->

## チェックリスト
- [ ] セルフレビュー済み
- [ ] テストを追加/更新した
- [ ] ドキュメントを更新した（必要な場合）`}
            />
          </section>

          {/* CI を必須化 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CI を必須化する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Lint・型チェック・テストといった機械的に判定できる項目は、
              人がレビューで見るのではなく CI に任せます。 GitHub の
              <strong>ブランチ保護ルール</strong>
              で「特定のチェックが通らないとマージできない」
              ように設定すると、壊れたコードが main に入るのを構造的に防げます。
            </p>

            <InfoBox type="warning" title="人の確認を CI に置き換える">
              「テストが通っているか」を人が毎回手で確認するのは非効率で、見落としも起きます。
              必須チェックとして CI を required にすれば、レビュアーは 「CI
              が緑であること」を前提に、設計や仕様の議論へ集中できます。
            </InfoBox>
          </section>

          {/* レビュアー指定とコードオーナー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              レビュアー指定とコードオーナー
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              誰にレビューを頼むかは品質に直結します。
              変更領域に詳しい人を指名すれば的確なフィードバックが得られます。
              <code>.github/CODEOWNERS</code> を設定すると、
              特定のパスを変更した PR
              に対して担当者を自動でレビュアーに割り当てられます。
            </p>

            <CodeBlock
              language="bash"
              title=".github/CODEOWNERS"
              code={`# 各行: パターン  担当者/チーム
# 後の行ほど優先される

*                    @org/maintainers
/client/src/api/     @org/backend
/client/src/ui/      @org/frontend
*.md                 @org/docs`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              CODEOWNERS は「そのパスの責任者」を明示する役割も持ちます。
              ブランチ保護で「コードオーナーのレビューを必須」にすれば、
              担当領域の変更が必ずその領域の詳しい人を通る運用になります。
            </p>

            <div className="mt-6">
              <CodingChallenge
                preview
                previewType="config"
                title="CODEOWNERS の1行を書こう"
                description="client/src/ui 配下を変更した PR に @org/frontend を自動でレビュアー割り当てする CODEOWNERS の行を完成させてください。"
                initialCode={`# パターン  担当者/チーム
/client/src/ui/      ___`}
                answer={`# パターン  担当者/チーム
/client/src/ui/      @org/frontend`}
                hints={["担当チームは @ から始まる @org/frontend"]}
                keywords={["@org/frontend"]}
              />
            </div>
          </section>

          {/* マージ戦略 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              マージ戦略（squash / rebase / merge commit）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              PR を main
              に取り込む方法は主に3つあります。どれを選ぶかで履歴の見え方が変わります。
              チームでひとつに統一しておくと、履歴の読み方が安定します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mergeStrategies.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              squash は PR
              単位で履歴が1行になり、 リバートやレビューの単位がそろいます。
              一方、コミットを意味のある単位で丁寧に積む文化なら rebase
              が活きます。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Lint・型チェック・テストを CI で必須化する利点として最も適切なのは？"
              options={[
                { label: "レビュアーの人数を減らせるから" },
                {
                  label:
                    "機械的に判定できる項目を自動で担保し、人は設計や仕様の議論に集中できるから",
                  correct: true,
                },
                { label: "PR の差分行数を自動で減らせるから" },
                { label: "マージ戦略を自動で選べるから" },
              ]}
              explanation="CI を必須化すると、テストや型チェックといった機械が判定できる項目はツールが担保します。人は「設計でよいか」「仕様に合っているか」というツールでは判断しにくい部分にレビューの時間を使えます。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "GitHub Docs - About pull requests",
                  url: "https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests",
                  description:
                    "PR の基本概念と Draft PR を含むライフサイクルの公式ドキュメント",
                },
                {
                  title: "GitHub Docs - About code owners",
                  url: "https://docs.github.com/ja/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners",
                  description:
                    "CODEOWNERS ファイルの書き方と自動レビュアー割り当ての仕様",
                },
                {
                  title: "GitHub Docs - About protected branches",
                  url: "https://docs.github.com/ja/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches",
                  description:
                    "必須ステータスチェックやマージ条件を設定するブランチ保護の解説",
                },
                {
                  title: "Google Engineering Practices - Small CLs",
                  url: "https://google.github.io/eng-practices/review/developer/small-cls.html",
                  description:
                    "なぜ変更を小さく保つべきか、その理由と分割の指針",
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
