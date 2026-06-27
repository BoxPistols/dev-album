import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const spaceDims = [
  {
    letter: "S",
    title: "Satisfaction（満足度）",
    description:
      "開発者の満足度や燃え尽きの度合い。健全に働けているかは生産性の土台になる。",
  },
  {
    letter: "P",
    title: "Performance（成果）",
    description:
      "コードやプロセスがもたらす結果。品質や信頼性など、アウトカムに近い指標。",
  },
  {
    letter: "A",
    title: "Activity（活動量）",
    description:
      "コミット数やPR数などの作業量。単独で評価すると誤解を招きやすい指標。",
  },
  {
    letter: "C",
    title: "Communication（協業）",
    description: "レビューや情報共有の質。知識がどれだけ流通しているかを表す。",
  },
  {
    letter: "E",
    title: "Efficiency（効率）",
    description: "中断なく作業を進められるか。待ち時間や手戻りの少なさを見る。",
  },
];

export default function Dora() {
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
            DORA メトリクスと開発生産性
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            DORA（DevOps Research and Assessment）は、ソフトウェア開発組織の
            パフォーマンスを継続調査してきたチームで、その成果が Four Keys
            と呼ばれる 4 つの指標です。 ここでは Four Keys
            の中身とベンチマーク、スループットと安定性が両立すること、 補完的な
            SPACE フレームワーク、そして指標を目標化する危険までを
            一通り整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["DORA", "Four Keys", "メトリクス", "SPACE", "生産性"]}
        >
          <p>
            「自分たちの開発は速いのか遅いのか」を感覚で語ると、議論は平行線になります。
            DORA の Four Keys は、デプロイの速さと安定性を
            <strong>計測可能な数字</strong>に落とし込みます。
            数字があれば、改善が効いているかを確かめられます。
            ただし数字は使い方を誤ると逆効果になるため、扱い方まで合わせて学びます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* Four Keys */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Four Keys — DORA の 4 指標
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Four Keys は「スループット（速さ）」を測る 2 指標と、
              「安定性」を測る 2 指標で構成されます。
              デプロイ頻度と変更リードタイムが速さ、変更失敗率と
              平均復旧時間（MTTR）が安定性です。 この 4
              つをセットで見ることで、片方だけを追って
              もう片方を犠牲にする事態を避けられます。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 font-bold text-foreground">
                      指標
                    </th>
                    <th className="text-left py-3 px-3 font-bold text-foreground">
                      分類
                    </th>
                    <th className="text-left py-3 px-3 font-bold text-foreground">
                      何を測るか
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">
                      デプロイ頻度
                    </td>
                    <td className="py-3 px-3">スループット</td>
                    <td className="py-3 px-3">
                      本番へどれだけ頻繁にリリースしているか
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">
                      変更リードタイム
                    </td>
                    <td className="py-3 px-3">スループット</td>
                    <td className="py-3 px-3">
                      コミットから本番反映までにかかる時間
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">
                      変更失敗率
                    </td>
                    <td className="py-3 px-3">安定性</td>
                    <td className="py-3 px-3">
                      デプロイのうち障害や修正を要した割合
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-foreground">
                      変更障害復旧時間（旧 MTTR）
                    </td>
                    <td className="py-3 px-3">安定性</td>
                    <td className="py-3 px-3">
                      デプロイ起因の障害が発生してから復旧するまでの時間
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              4 つ目の指標は、DORA が 2023 年に「平均復旧時間（MTTR）」から
              <strong>変更障害復旧時間（Failed Deployment Recovery Time）</strong>
              へ名称と定義を見直しています。任意の障害全般ではなく
              「デプロイ（変更）が原因の障害から復旧するまでの時間」に対象を絞った点が変更のポイントです。
              MTTR は広く知られた旧称として併記しています。
            </p>
          </section>

          {/* ベンチマーク */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Elite 〜 Low のベンチマーク
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              DORA は調査結果をもとに、組織を Elite / High / Medium / Low の 4
              段階に分類します。下の表はおおまかな目安です。
              年次調査ごとに区分やクラスタリングは見直されるため、
              <strong>正確なしきい値より、各段階の桁感の違い</strong>
              を掴むことが大切です。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 font-bold text-foreground">
                      区分
                    </th>
                    <th className="text-left py-3 px-3 font-bold text-foreground">
                      デプロイ頻度
                    </th>
                    <th className="text-left py-3 px-3 font-bold text-foreground">
                      リードタイム
                    </th>
                    <th className="text-left py-3 px-3 font-bold text-foreground">
                      復旧時間
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-primary">
                      Elite
                    </td>
                    <td className="py-3 px-3">オンデマンド（1日複数回）</td>
                    <td className="py-3 px-3">1日未満</td>
                    <td className="py-3 px-3">1時間未満</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">
                      High
                    </td>
                    <td className="py-3 px-3">1日〜1週間に1回</td>
                    <td className="py-3 px-3">1日〜1週間</td>
                    <td className="py-3 px-3">1日未満</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">
                      Medium
                    </td>
                    <td className="py-3 px-3">1週間〜1か月に1回</td>
                    <td className="py-3 px-3">1週間〜1か月</td>
                    <td className="py-3 px-3">1日未満</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-foreground">
                      Low
                    </td>
                    <td className="py-3 px-3">1か月〜半年に1回</td>
                    <td className="py-3 px-3">1か月以上</td>
                    <td className="py-3 px-3">1日〜1週間</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="しきい値は年ごとに動く">
              DORA のベンチマークは毎年の調査データから統計的に区切られるため、
              区分数やしきい値は年によって変わります。仕様では「4
              段階」とされても、 実測の年次レポートでは区分が 3
              つになる年もあります。
              理由は、回答データの分布に合わせてクラスタリングし直すからです。
              数値は最新の State of DevOps レポートで確認するのが確実です。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Four Keys のうち「安定性」を測る指標の組み合わせはどれ？"
              options={[
                { label: "デプロイ頻度 と 変更リードタイム" },
                {
                  label: "変更失敗率 と 平均復旧時間（MTTR）",
                  correct: true,
                },
                { label: "デプロイ頻度 と 変更失敗率" },
                { label: "変更リードタイム と 平均復旧時間（MTTR）" },
              ]}
              explanation="Four Keys は速さ（デプロイ頻度・変更リードタイム）と安定性（変更失敗率・平均復旧時間）の 2 軸 × 2 指標で構成されます。安定性を測るのは、失敗の割合を表す変更失敗率と、復旧の速さを表す MTTR です。"
            />
          </section>

          {/* スループットと安定性 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              スループットと安定性は両立する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              「速くリリースすれば品質が下がる」と考えられがちですが、 DORA
              の調査はその直感を否定します。
              <strong>Elite な組織は、速さと安定性の両方で高い</strong>のです。
              トレードオフではなく、両者が一緒に高まる関係が観測されています。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              理由はシンプルです。小さな変更を頻繁にデプロイすると、 1
              回あたりの変更が小さくなり、問題の原因を特定しやすくなります。
              失敗してもすぐ気づけて、すぐ戻せます。
              逆に、大きな変更をまれにリリースする方が、
              リスクが一度に集中して復旧も難しくなります。
            </p>

            <InfoBox type="success" title="小さく頻繁に出すほど安全になる">
              バッチサイズ（1回の変更量）を小さく保つと、テスト範囲が狭まり、
              ロールバックも簡単になります。速さを追求する自動化が、結果として
              安定性も底上げします。速さと安定は対立しないというのが Four Keys
              の重要な発見です。
            </InfoBox>
          </section>

          {/* SPACE */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              SPACE フレームワーク
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Four Keys はデリバリーのパフォーマンスを測りますが、
              開発生産性はそれだけでは捉えきれません。 SPACE
              は生産性を多面的に見るためのフレームワークで、 Satisfaction /
              Performance / Activity / Communication / Efficiency の 5
              次元から成ります。1 つの数字で生産性を語らず、
              複数の次元を組み合わせて見ることを勧めています。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {spaceDims.map((dim) => (
                <div
                  key={dim.letter}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex w-8 h-8 rounded-full bg-primary items-center justify-center text-primary-foreground font-bold text-sm">
                      {dim.letter}
                    </span>
                    <h3 className="font-bold text-foreground text-base">
                      {dim.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dim.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Goodhart */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              メトリクスを目標化する危険（Goodhart の法則）
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>
                「指標が目標になると、それは良い指標ではなくなる」
              </strong>
              ——これが Goodhart の法則です。
              たとえばデプロイ頻度を個人の評価目標にすると、
              意味のない小さなデプロイを量産して数字だけを稼ぐ動きが生まれます。
              指標は本来「改善の方向を確かめる物差し」であって、
              達成を競うノルマにすると歪みます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Four Keys や SPACE
              をチームの学習のために使い、個人の成績評価には使わない。 SPACE
              が複数次元を組み合わせるよう勧めるのも、 1
              つの指標を目標化したときのゲーミング（数字稼ぎ）を防ぐためです。
              数字は会話のきっかけにして、背景にある事情を一緒に読み解くのが健全な使い方です。
            </p>

            <InfoBox
              type="warning"
              title="活動量（Activity）を単独で評価しない"
            >
              コミット数や PR 数のような Activity
              指標は、単独で評価すると最も歪みやすい指標です。
              数を増やすこと自体は簡単で、価値とは結びつかないからです。
              必ず成果や満足度といった他の次元と組み合わせて見てください。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Goodhart の法則をふまえた、DORA メトリクスの健全な使い方はどれ？"
              options={[
                {
                  label: "デプロイ頻度を個人の評価目標にして、達成度を競わせる",
                },
                {
                  label:
                    "チームの学習・改善のための物差しとして使い、複数の指標を組み合わせて読む",
                  correct: true,
                },
                { label: "コミット数を最重要 KPI として全員に課す" },
                { label: "1つの指標だけを追って他は無視する" },
              ]}
              explanation="指標を個人の達成ノルマにすると、数字を稼ぐためのゲーミングが起き、本来測りたかった価値が見えなくなります（Goodhart の法則）。Four Keys や SPACE は、チームが改善の方向を確かめるための物差しとして、複数次元を組み合わせて使うのが健全です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "DORA - Capabilities & Research",
                  url: "https://dora.dev/",
                  description:
                    "DORA 公式。Four Keys の定義や年次 State of DevOps レポートの一次情報",
                },
                {
                  title: "Google Cloud - Use Four Keys metrics",
                  url: "https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance",
                  description:
                    "Four Keys を実際に計測するための解説とツールの紹介",
                },
                {
                  title: "The SPACE of Developer Productivity (ACM Queue)",
                  url: "https://queue.acm.org/detail.cfm?id=3454124",
                  description:
                    "SPACE フレームワークの原典論文。生産性を多面的に測る考え方",
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
