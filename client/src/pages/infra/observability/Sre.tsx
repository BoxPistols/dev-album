import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodingChallenge from "@/components/CodingChallenge";

const availability = [
  {
    title: "99.9%（スリーナイン）",
    examples: "月間 約43分の停止",
    description:
      "一般的な Web サービスでよく目標にされる水準。月あたり約43分のダウンを許容する計算になる。",
  },
  {
    title: "99.99%（フォーナイン）",
    examples: "月間 約4分の停止",
    description:
      "冗長化や自動復旧を相応に作り込まないと届かない水準。コストと運用負荷が大きく上がる。",
  },
  {
    title: "99.999%（ファイブナイン）",
    examples: "月間 約26秒の停止",
    description:
      "達成・維持のコストが急激に高まる。本当にここまで必要かを、事業価値と照らして判断する。",
  },
];

export default function Sre() {
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
            SRE と信頼性設計
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            SRE（Site Reliability
            Engineering）は、信頼性をエンジニアリングの対象として扱う考え方です。
            SLI・SLO・SLA
            の違い、エラーバジェット、トイル削減、オンコールとインシデント対応、
            非難なきポストモーテム、そして可用性（9
            の数）と現実のトレードオフまでを、
            実務に結びつく形で一通り整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["SRE", "SLO", "エラーバジェット", "信頼性", "ポストモーテム"]}
        >
          <p>
            「落ちないシステム」を目指すほど、コストと開発速度が犠牲になります。
            SRE は、信頼性を「上げれば上げるほど良いもの」ではなく
            <strong>目標値を決めて管理するもの</strong>として扱います。
            どこまで信頼性に投資し、どこから新機能に振るか——
            その判断を感覚ではなく指標で行えるようにするのが、この章の狙いです。
            SLI・SLO・エラーバジェットという道具立てを押さえると、議論が具体的になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              SRE の考え方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              SRE
              は、運用の課題をソフトウェアエンジニアリングで解こうとする取り組みです。
              手作業の運用を自動化し、信頼性を数値で測り、
              「どこまでの信頼性を目指すか」を意思決定の対象にします。
              鍵になるのは、<strong>信頼性は無限に追わない</strong>
              という割り切りです。 100%
              の可用性はコストが見合わず、ユーザーも体感では区別できません。
            </p>

            <InfoBox type="info" title="信頼性は『十分か』で測る">
              目標は「絶対に落とさない」ではなく「合意した水準を保つ」です。
              過剰な信頼性は、本来なら機能開発に回せたはずの時間を消費します。
              SRE は、その配分を指標に基づいて決めるための枠組みです。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              SLI・SLO・SLA の違い
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              よく混同される3つを整理します。
              <strong>SLI</strong> は実際に測る指標（例:
              成功したリクエストの割合）、
              <strong>SLO</strong> はその指標に対する社内の目標（例: 99.9%）、
              <strong>SLA</strong>{" "}
              は顧客との契約上の約束で、破ると返金などの責任が生じます。 SLO は
              SLA より厳しめに置くのが定石です。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 text-foreground font-bold border-b border-border">
                      用語
                    </th>
                    <th className="text-left p-3 text-foreground font-bold border-b border-border">
                      意味
                    </th>
                    <th className="text-left p-3 text-foreground font-bold border-b border-border">
                      対象
                    </th>
                    <th className="text-left p-3 text-foreground font-bold border-b border-border">
                      破った場合
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">SLI</td>
                    <td className="p-3 text-muted-foreground">
                      実際に測る指標（成功率・レイテンシなど）
                    </td>
                    <td className="p-3 text-muted-foreground">
                      計測値そのもの
                    </td>
                    <td className="p-3 text-muted-foreground">—（測定対象）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">SLO</td>
                    <td className="p-3 text-muted-foreground">
                      SLI に対する社内目標（例: 99.9%）
                    </td>
                    <td className="p-3 text-muted-foreground">自チーム</td>
                    <td className="p-3 text-muted-foreground">
                      改善に着手・機能開発を抑制
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-foreground font-medium">SLA</td>
                    <td className="p-3 text-muted-foreground">
                      顧客との契約上の約束
                    </td>
                    <td className="p-3 text-muted-foreground">顧客</td>
                    <td className="p-3 text-muted-foreground">
                      返金・違約など契約上の責任
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              エラーバジェット
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              SLO を 99.9% に置くと、残りの 0.1% は
              「許容される失敗の枠」になります。これが
              <strong>エラーバジェット</strong>です。
              バジェットに余裕があるうちは、新機能やリリースに積極的に振れます。
              使い切りそうなら、信頼性の改善を優先する——
              という形で、開発速度と信頼性のせめぎ合いを数値で裁定できます。
            </p>

            <InfoBox type="info" title="バジェットは『使ってよい』もの">
              エラーバジェットは、ゼロを目指すための監視値ではありません。
              余っているなら、それはリリースや実験に使える余地です。
              信頼性チームと開発チームの綱引きを、
              感情ではなく残りバジェットで判断できるようにするのが狙いです。
            </InfoBox>

            <MermaidDiagram
              title="図: SLI から行動までのつながり"
              chart={`flowchart LR
    SLI["SLI（成功率を測る）"] --> SLO["SLO（目標 99.9%）"]
    SLO --> EB["エラーバジェット（残り 0.1%）"]
    EB -->|"余裕あり"| FEAT["新機能・リリースに振る"]
    EB -->|"使い切り"| REL["信頼性改善を優先・リリース凍結"]`}
            />

            <CodingChallenge
              preview
              previewType="markdown"
              title="エラーバジェットを計算してみよう"
              description="月間リクエスト 1,000,000 件・SLO 99.9% のとき、許容される失敗の件数（エラーバジェット）を埋めてください。___ を計算結果に置き換えます。"
              initialCode={`# エラーバジェット計算

- 月間リクエスト数: 1,000,000
- SLO: 99.9%（成功率の目標）
- 許容される失敗率: 0.1%

許容される失敗件数 = 1,000,000 * 0.001 = ___ 件

この件数を使い切るまでは、リリースや実験に振ってよい。`}
              answer={`# エラーバジェット計算

- 月間リクエスト数: 1,000,000
- SLO: 99.9%（成功率の目標）
- 許容される失敗率: 0.1%

許容される失敗件数 = 1,000,000 * 0.001 = 1000 件

この件数を使い切るまでは、リリースや実験に振ってよい。`}
              hints={[
                "1,000,000 の 0.1% は 1,000,000 * 0.001",
              ]}
              keywords={["1000"]}
            />
          </section>

          <section>
            <Quiz
              question="SLI・SLO・SLA の関係として正しいのはどれ？"
              options={[
                { label: "SLA は実際に測る指標、SLO は契約上の約束である" },
                {
                  label:
                    "SLI は測る指標、SLO はその社内目標、SLA は顧客との契約上の約束である",
                  correct: true,
                },
                { label: "3つはすべて同じもので、呼び方が違うだけである" },
                { label: "SLO は必ず SLA より厳しくしてはいけない" },
              ]}
              explanation="SLI は計測する指標そのもの、SLO はその指標に対する社内目標、SLA は顧客との契約です。破ったときの責任が重い SLA に対し、SLO はそれより厳しめに置いて余裕を持たせるのが定石です。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              トイル・オンコール・ポストモーテム
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>トイル</strong>
              は、手作業で繰り返される、自動化できるはずの運用作業を指します。
              トイルが増えると改善の時間が奪われるため、SRE
              は計測して削減対象にします。
              <strong>オンコール</strong>は、障害時に対応する当番制です。
              インシデントが起きたら、まず影響を抑え（緩和）、それから根本対応へ進みます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              収束後に書くのが<strong>ポストモーテム</strong>です。 重要なのは
              <strong>非難なき（blameless）</strong>姿勢で、
              「誰のミスか」ではなく「なぜその状況でその判断が起きたか」を
              仕組みの問題として掘り下げます。
              人を責める文化は、事実の共有を妨げ、再発を防げなくします。
            </p>

            <InfoBox type="warning" title="非難なきポストモーテムが学びを生む">
              人を責める場にすると、当事者は情報を隠すようになり、
              本当の原因が表に出てきません。
              ポストモーテムの目的は犯人捜しではなく、
              同じ障害を二度起こさない仕組みを作ることです。
              「人ではなくプロセスを直す」という前提を共有します。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              可用性（9 の数）と現実のトレードオフ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              可用性は「9 の数」で語られます。9 が一つ増えるごとに、
              許容される停止時間は一桁ずつ短くなり、
              達成コストは大きく跳ね上がります。 「とにかく高く」ではなく、
              <strong>事業に必要な水準</strong>
              を見極めることが信頼性設計の核心です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availability.map((a) => (
                <div
                  key={a.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {a.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {a.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              仕様（契約上の SLA）では「99.9%」と定めても、
              実測の可用性は依存先の障害やデプロイ失敗で振れます。
              理由は、自分たちの制御外の要素（外部
              API・ネットワーク・クラウド側障害）が
              可用性に直接効くからです。だからこそ目標値には余裕を持たせ、
              エラーバジェットで日々の振れを吸収します。
            </p>
          </section>

          <section>
            <Quiz
              question="非難なき（blameless）ポストモーテムの目的として最も適切なのはどれ？"
              options={[
                { label: "障害を起こした担当者を特定して責任を問うこと" },
                {
                  label:
                    "なぜその状況でその判断が起きたかを仕組みの問題として掘り下げ、再発を防ぐこと",
                  correct: true,
                },
                { label: "障害の記録を残さず早く忘れること" },
                { label: "可用性の目標値を必ず100%に引き上げること" },
              ]}
              explanation="非難なきポストモーテムは、犯人捜しではなく仕組みの改善を目的とします。人を責めると情報が隠れ、真の原因にたどり着けません。『人ではなくプロセスを直す』という前提で、同じ障害を繰り返さない仕組みを作ります。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Google SRE Book",
                  url: "https://sre.google/sre-book/table-of-contents/",
                  description:
                    "SRE の原典。SLO・エラーバジェット・トイル・ポストモーテムの考え方を体系的に解説",
                },
                {
                  title: "Google SRE Workbook",
                  url: "https://sre.google/workbook/table-of-contents/",
                  description: "SLO の実装やアラート設計など、実務寄りの手引き",
                },
                {
                  title: "SRE Book - Postmortem Culture",
                  url: "https://sre.google/sre-book/postmortem-culture/",
                  description: "非難なきポストモーテムの文化と書き方の章",
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
