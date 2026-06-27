import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const calmsCards = [
  {
    letter: "C",
    title: "Culture（文化）",
    description:
      "Dev と Ops の間にある壁を取り払い、共通のゴールに向かって協力する姿勢。非難ではなく学習を選ぶ文化が土台になる。",
  },
  {
    letter: "A",
    title: "Automation（自動化）",
    description:
      "ビルド・テスト・デプロイ・監視といった反復作業を自動化する。手作業を減らすことで、人は判断と改善に集中できる。",
  },
  {
    letter: "L",
    title: "Lean（リーン）",
    description:
      "小さく作って早く出し、ムダを減らす。大きな一括リリースより、小さな変更を継続的に流す方が問題を見つけやすい。",
  },
  {
    letter: "M",
    title: "Measurement（計測）",
    description:
      "推測ではなくデータで判断する。デプロイ頻度や復旧時間を計測し、改善が効いているかを確かめる。",
  },
  {
    letter: "S",
    title: "Sharing（共有）",
    description:
      "知識・ツール・成功も失敗も共有する。情報を一部の人に閉じ込めず、チーム全体で学べる状態を保つ。",
  },
];

const threeWays = [
  {
    number: 1,
    title: "フロー（左から右へ）",
    description:
      "開発から運用、利用者へと続く作業の流れを最適化する。仕掛り中の作業を減らし、小さなバッチで価値を早く届ける。",
  },
  {
    number: 2,
    title: "フィードバック（右から左へ）",
    description:
      "本番や下流で起きたことを上流に素早く返す。問題が見つかったらすぐ知らせ、手戻りが大きくなる前に直す。",
  },
  {
    number: 3,
    title: "継続的な学習と実験",
    description:
      "失敗から学び、日々の改善と実験を習慣にする。心理的安全性があって初めて、人は問題を隠さず共有できる。",
  },
];

export default function Culture() {
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
            DevOps 文化と CALMS
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            DevOps は CI/CD
            ツールを導入することではなく、開発（Dev）と運用（Ops）が
            同じゴールに向かって協力するための「文化と働き方」です。 ここでは
            Dev と Ops が分断されるとなぜ問題が起きるのかを確認し、 DevOps
            を支える CALMS の 5 要素と、改善の流れを示す The Three Ways
            を一通り整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["DevOps", "CALMS", "文化", "責任共有", "The Three Ways"]}
        >
          <p>
            CI/CD パイプラインを組んでも、チームの働き方が変わらなければ
            リリースは速くなりません。ツールはあくまで手段で、
            本当に効くのは「誰が・どこまで責任を持ち・どう学ぶか」という
            <strong>文化</strong>の方です。DevOps を文化として捉え直すことで、
            自動化やメトリクスがなぜ必要なのかが一本の線でつながります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* サイロ問題 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Dev と Ops のサイロ問題
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              従来の組織では、開発チームは「新機能を速く出す」ことを、
              運用チームは「システムを安定させる」ことを評価されてきました。
              この 2 つの目標は一見対立します。開発は変更を増やしたいのに、
              運用は変更こそが障害の原因だと考えるからです。
              評価軸が分かれていると、両者の間に壁（サイロ）ができ、
              <strong>「壁の向こうに投げて終わり」</strong>
              という関係になりがちです。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">Dev の目標</p>
                  <p className="text-muted-foreground">
                    新機能を速く届ける。変更の量とスピードで評価される
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">壁（サイロ）</p>
                  <p className="text-muted-foreground">
                    引き継ぎで情報が落ち、障害時に責任を押し付け合う
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">Ops の目標</p>
                  <p className="text-muted-foreground">
                    安定稼働を守る。変更を抑えることで評価される
                  </p>
                </div>
              </div>
            </div>

            <InfoBox
              type="warning"
              title="対立は「人」ではなく「構造」から生まれる"
            >
              開発者と運用者が仲が悪いわけではありません。評価される目標が分かれているために、
              組織の構造として対立が生まれます。DevOps
              が文化の話から始まるのは、
              ツールを足す前に、この目標と責任の構造を見直す必要があるからです。
            </InfoBox>
          </section>

          {/* DevOps は文化 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              DevOps は文化であり、ツールだけではない
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              DevOps と聞くと、Jenkins や GitHub Actions、Kubernetes といった
              ツールを思い浮かべがちです。これらは確かに重要ですが、
              ツールを導入しただけでは DevOps にはなりません。
              <strong>
                同じツールを使っても、チームの目標が分かれたままなら
              </strong>
              サイロは残るからです。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              DevOps
              の本質は、開発と運用が「動くソフトウェアを利用者に届け続ける」という
              共通のゴールを持ち、その実現のために協力し続ける働き方です。
              ツールはその文化を支える道具であって、目的ではありません。
              次に見る CALMS は、その文化を 5
              つの観点に分解したフレームワークです。
            </p>

            <InfoBox type="info" title="「ツールから入る」失敗の典型">
              パイプラインだけ整えて組織の評価や責任分担を変えないと、
              「自動化したのにリリースが速くならない」状態になります。
              ツール導入は文化を変える入口にはなりますが、それ自体がゴールではありません。
            </InfoBox>
          </section>

          {/* CALMS */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CALMS — DevOps 文化の 5 要素
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              CALMS は DevOps
              が成熟しているかを測るための観点をまとめた頭字語です。 Culture /
              Automation / Lean / Measurement / Sharing の 5 つで、
              文化を起点に、自動化・リーン・計測・共有が連なります。 どれか 1
              つではなく、5 つが噛み合って初めて効果が出ます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {calmsCards.map((card) => (
                <div
                  key={card.letter}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex w-8 h-8 rounded-full bg-primary items-center justify-center text-primary-foreground font-bold text-sm">
                      {card.letter}
                    </span>
                    <h3 className="font-bold text-foreground text-base">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="DevOps を「文化」と捉えるべき最大の理由はどれ？"
              options={[
                { label: "ツールは無料のものだけ使うべきだから" },
                {
                  label:
                    "同じツールを導入しても、目標と責任の構造が分かれたままならサイロは残るから",
                  correct: true,
                },
                { label: "自動化は手作業より常に遅いから" },
                { label: "運用チームは不要になるから" },
              ]}
              explanation="DevOps の対立は人ではなく、評価される目標が分かれている構造から生まれます。ツールを足しても構造が変わらなければサイロは残るため、まず文化（共通ゴールと責任分担）を変える必要があります。CALMS が Culture から始まるのもこのためです。"
            />
          </section>

          {/* 責任共有 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              責任の共有 — "You build it, you run it"
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Amazon の Werner Vogels が語った
              <strong>"You build it, you run it"（作った者が運用する）</strong>
              は、DevOps の責任共有を象徴する言葉です。
              開発したチームが本番運用やオンコール対応まで担うことで、
              「リリースして終わり」ではなく、運用の痛みが開発側にも直接届きます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              この仕組みは、開発者に「運用しやすいコードを書く」動機を与えます。
              ログの出し方、監視のしやすさ、障害時の復旧手順までを開発時に意識するようになり、
              結果として品質が上がります。引き継ぎの壁がなくなることで、
              障害対応も速くなります。
            </p>

            <InfoBox type="success" title="責任共有は「丸投げ」ではない">
              "You build it, you run it"
              は開発者に運用を押し付けることではありません。
              運用の専門知識（信頼性設計やインフラ）はプラットフォームチームが支え、
              開発チームは自分のサービスの運用に責任を持つ、という協力関係です。
              SRE のようなロールは、この支え合いを仕組みにしたものです。
            </InfoBox>
          </section>

          {/* The Three Ways */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              The Three Ways — フロー・フィードバック・継続学習
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              『The DevOps Handbook』で示された The Three Ways は、 DevOps
              を実践するための 3 つの原則です。
              フローで価値を速く流し、フィードバックで問題を素早く返し、
              継続的な学習で改善し続ける——この 3 つが回り続けることで、
              チームは速さと安定の両方を高めていきます。
            </p>

            <div className="space-y-3">
              {threeWays.map((way) => (
                <div
                  key={way.number}
                  className="rounded-xl border border-border bg-card p-5 flex items-start gap-4"
                >
                  <span className="flex-shrink-0 inline-flex w-9 h-9 rounded-full bg-primary items-center justify-center text-primary-foreground font-bold text-sm">
                    {way.number}
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground text-base mb-1">
                      {way.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {way.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question='"You build it, you run it" が品質向上につながるのはなぜ？'
              options={[
                { label: "運用チームを完全に廃止できるから" },
                {
                  label:
                    "運用の痛みが開発側に直接届き、運用しやすいコードを書く動機が生まれるから",
                  correct: true,
                },
                { label: "リリース回数を減らせるから" },
                { label: "コードレビューが不要になるから" },
              ]}
              explanation="作った者が運用まで担うと、障害対応やオンコールの負担が開発者自身に返ってきます。その結果、ログ・監視・復旧のしやすさを開発時から意識するようになり、品質が上がります。これは運用の丸投げではなく、プラットフォームチームに支えられた協力関係として成立します。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Atlassian - DevOps とは / CALMS フレームワーク",
                  url: "https://www.atlassian.com/devops/frameworks/calms-framework",
                  description:
                    "CALMS の 5 要素を実務目線で解説。DevOps 文化の入口として読みやすい",
                },
                {
                  title: "Google Cloud - DevOps culture",
                  url: "https://cloud.google.com/architecture/devops/devops-culture-transform",
                  description:
                    "DORA の調査をもとにした文化変革のガイド。心理的安全性と責任共有を扱う",
                },
                {
                  title: "IT Revolution - The Three Ways",
                  url: "https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/",
                  description:
                    "『The DevOps Handbook』著者による The Three Ways の解説記事",
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
