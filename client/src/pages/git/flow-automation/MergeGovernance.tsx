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
import MergeGate from "@/components/MergeGate";

const rules = [
  {
    rule: "プルリクエストを必須にする",
    guard: "main への直接 push を禁止し、変更は必ず PR を経由させる。",
  },
  {
    rule: "承認を必須にする（1 名以上）",
    guard: "レビューなしのマージを止める。作成者は自分の PR を承認できない。",
  },
  {
    rule: "コードオーナーのレビューを必須にする",
    guard: "CODEOWNERS で指名された担当の承認がないとマージできない。",
  },
  {
    rule: "新しいコミットで古い承認を無効化",
    guard: "承認後にこっそり変更を足す、を防ぐ。差分が変われば再レビュー。",
  },
  {
    rule: "ステータスチェックの成功を必須にする",
    guard: "CI（lint / test / build）が緑でないとマージできない。",
  },
  {
    rule: "ブランチを最新にしてからマージ",
    guard: "古い main の上で通った緑を信用しない。統合後の状態で再検査する。",
  },
  {
    rule: "強制 push とブランチ削除を禁止",
    guard: "履歴の書き換えや保護ブランチの消去を防ぐ。",
  },
  {
    rule: "管理者にもルールを適用する",
    guard: "「管理者だから素通り」をなくし、全員が同じ柵の中に入る。",
  },
];

export default function MergeGovernance() {
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
            マージガバナンス（意図せぬマージの防止）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            エコシステムの最後の層は、安全柵です。承認も CI も通らないまま main
            にマージされる事故を、「気をつける」ではなく「起こせない」
            状態にします。そのうえで、条件が揃ったものだけを自動でマージします。
          </p>
        </div>

        <WhyNowBox
          tags={["ブランチ保護", "承認必須", "自動マージ", "ルールセット"]}
        >
          <p>
            どれだけラベルやアサインを整えても、最後にレビューなしでマージ
            できてしまえば、フロー全体が形骸化します。逆に、マージの条件さえ
            仕組みで固めておけば、その手前の自動化は安心して回せます。
            ガバナンスは<strong>フロー全体を成立させる土台</strong>であり、
            この編の締めくくりに置く理由もそこにあります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              何が起きるのを防ぐのか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ガバナンスがないリポジトリでは、次のことが「できてしまい」ます。
              悪意ではなく、急いでいるとき・操作を誤ったときに起きる事故です。
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span>レビューを受けずに main へ直接 push する</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span>CI が落ちている PR を、赤いまま自分でマージする</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span>自分の PR を自分で承認して、そのままマージする</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span>
                  承認後に中身を差し替えて、レビュー済みの見た目で通す
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ブランチ保護 / ルールセットで柵を作る
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              main のマージ条件は、リポジトリの{" "}
              <strong>Settings → Rules （Rulesets）</strong> または{" "}
              <strong>Branches（ブランチ保護）</strong>{" "}
              で設定します。代表的なルールと、それぞれが防ぐものを並べます。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      ルール
                    </th>
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      防げること
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((r) => (
                    <tr
                      key={r.rule}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3 text-foreground font-medium align-top">
                        {r.rule}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground align-top">
                        {r.guard}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <MergeGate
              caption="図: 条件が 1 つでも欠けると、マージは保護される（例）"
              conditions={[
                { label: "PR 経由で変更している", met: true },
                { label: "CI（lint / test / build）が成功", met: true },
                { label: "作成者以外の承認が 1 名以上", met: false },
                { label: "コードオーナーの承認がある", met: false },
              ]}
            />

            <InfoBox
              type="info"
              title="Rulesets は新しい方式。まずはこちらを検討"
            >
              従来の「ブランチ保護ルール」に加え、GitHub には{" "}
              <strong>Rulesets</strong> という新しい仕組みがあります。
              複数ブランチへまとめて適用でき、組織全体へ展開でき、
              有効／無効やバイパス許可を柔軟に管理できます。
              これから設定するなら、Rulesets を軸に検討するとよいです。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              自分で承認・自分でマージを防ぐ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「承認を必須にする」を有効にすると、GitHub は
              <strong>作成者以外の承認</strong>を求めます。作成者は自分の PR を
              承認できないため、「自作自演でマージ」は仕組みとして防げます。
              さらに厳格にしたい場合は、Ruleset のバイパス許可を絞り、
              管理者にもルールを適用します。
            </p>

            <MermaidDiagram
              title="図: マージゲートの判定"
              chart={`flowchart TB
    PR["PR: main へマージ要求"] --> C1{"PR 経由か"}
    C1 -->|"直接 push"| X1["拒否"]
    C1 -->|"PR"| C2{"CI が緑か"}
    C2 -->|"赤 / 未完"| X2["マージ不可"]
    C2 -->|"緑"| C3{"作成者以外の承認があるか"}
    C3 -->|"なし / 自己承認のみ"| X3["マージ不可"]
    C3 -->|"あり"| C4{"CODEOWNERS 承認があるか"}
    C4 -->|"なし"| X4["マージ不可"]
    C4 -->|"あり"| M["マージ許可"]`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              条件が揃ったら自動でマージする — auto-merge
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ガバナンスは「止める」だけではありません。条件を満たした瞬間に
              自動でマージする<strong>auto-merge</strong> を組み合わせると、
              安全と速さを両立できます。レビュー承認と必須チェックが揃うのを
              待って、自動でマージされます。これは保護を
              <strong>回避する</strong>
              のではなく、<strong>満たしたら進める</strong>自動化です。
            </p>

            <CodeBlock
              language="bash"
              title="auto-merge を有効にする（gh CLI）"
              code={`# リポジトリ設定で "Allow auto-merge" を有効にしたうえで実行
# 承認と必須チェックが揃うまで待機し、揃ったら squash マージする
gh pr merge 123 --auto --squash`}
            />

            <InfoBox
              type="warning"
              title="auto-merge は保護ルールがあって初めて安全"
            >
              保護ルールのないリポジトリで auto-merge を有効にすると、 CI
              も承認もないまま即マージされ、むしろ危険です。 auto-merge
              は「必須チェックと必須承認」という条件があって初めて
              意味を持ちます。<strong>柵（保護）→ 自動化（auto-merge）</strong>
              の順で入れるのが鉄則です。
            </InfoBox>
          </section>

          <section>
            <Quiz
              question="「承認を必須（1 名以上）」に設定したリポジトリで、作成者が自分の PR を自分で承認してマージしようとした。何が起きる？"
              options={[
                { label: "自己承認がカウントされ、そのままマージできる" },
                {
                  label:
                    "作成者の承認は必須承認にカウントされず、他者の承認がないとマージできない",
                  correct: true,
                },
                { label: "PR が自動的にクローズされる" },
                { label: "CI が自動的に再実行される" },
              ]}
              explanation="「承認を必須にする」は、作成者以外の承認を求めます。作成者は自分の PR を承認できず、その承認は必須数にカウントされないため、他者のレビュー承認がない限りマージできません。これにより「自作自演でのマージ」を仕組みとして防げます。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手を動かす — auto-merge を有効にする
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              PR #123 について、承認と必須チェックが揃うまで待って自動で squash
              マージするコマンドの <code>___</code> を埋めてください。
            </p>

            <CodingChallenge
              preview
              previewType="terminal"
              title="auto-merge のコマンドを完成させよう"
              description="条件が揃うまで待機してから自動でマージするフラグを補います。"
              initialCode={`# 承認 + 必須チェックが揃ったら squash で自動マージ
gh pr merge 123 ___ --squash`}
              answer={`# 承認 + 必須チェックが揃ったら squash で自動マージ
gh pr merge 123 --auto --squash`}
              hints={["条件が揃うまで待って自動マージするフラグは --auto"]}
              keywords={["--auto"]}
            />
          </section>

          <section>
            <InfoBox
              type="success"
              title="GitHub 開発フロー・エコシステム、完成"
            >
              CI/CD という品質ゲートの周りに、自動テスト・自動修正、ラベル分類、
              担当アサイン、Projects 連携、そしてマージガバナンスまでを配置し、
              Issue から本番までを貫く一連の自動化を設計しました。
              まずは自分のリポジトリで、ブランチ保護（または Ruleset）で main を
              守り、CI を必須チェックに紐づけるところから始めると、
              この編で描いたエコシステムの土台がすぐに立ち上がります。
            </InfoBox>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "About rulesets",
                  url: "https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets",
                  description: "新しいマージガバナンスの仕組み（Rulesets）",
                },
                {
                  title: "About protected branches",
                  url: "https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches",
                  description: "必須承認・必須チェック・管理者への適用など",
                },
                {
                  title: "Automatically merging a pull request",
                  url: "https://docs.github.com/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request",
                  description: "条件が揃ったら自動マージする auto-merge",
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
