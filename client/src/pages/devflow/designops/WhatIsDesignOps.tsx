import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import MermaidDiagram from "@/components/MermaidDiagram";

const domains = [
  {
    title: "プロセス",
    description:
      "デザインの依頼受付・レビュー・承認・ハンドオフといった一連の流れを整える。属人化した「お願いベース」の運用を、誰が見ても辿れる仕組みに置き換える。",
  },
  {
    title: "ツール",
    description:
      "Figma・デザインシステム・トークン管理・ストレージの構成と権限を設計する。ツールが増えるほど整理の責任も増えるため、運用ルールとセットで考える。",
  },
  {
    title: "人",
    description:
      "デザイナーの採用・オンボーディング・スキル育成・役割分担を支える。新しく入った人がすぐに同じ品質で動けるよう、暗黙知を明文化する。",
  },
  {
    title: "ガバナンス",
    description:
      "命名規則・トークンの追加ルール・コンポーネントの承認フローなど、品質を保つための取り決めを運用する。自由と一貫性のバランスを取る役割。",
  },
];

export default function WhatIsDesignOps() {
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
            DesignOps とは
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            DesignOps（デザインオプス）は、デザインを「作る」ことそのものではなく、
            デザイン業務が滞りなく回るための運用を最適化する取り組みです。
            プロセス・ツール・人・ガバナンスを整えることで、
            デザイナーが本来やるべき設計に集中できる環境を一通り整理していきます。
          </p>
        </div>

        <WhyNowBox
          tags={["DesignOps", "運用最適化", "デザインシステム", "スケール"]}
        >
          <p>
            デザイナーが 1〜2
            人のうちは、口頭の合意とその場の判断で十分回ります。
            しかしチームが増え、扱う画面が増えると、
            「同じボタンが画面ごとに微妙に違う」「依頼の窓口が分からない」といった摩擦が積み重なります。
            DesignOps は、こうした摩擦をプロセスと仕組みで減らし、
            デザインの品質とスピードを両立させるための考え方です。
            開発側で当たり前になった DevOps
            の発想を、デザイン領域に持ち込んだものと捉えると掴みやすくなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* DesignOps の定義 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              DesignOps は「デザインの運用」を最適化する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              DesignOps
              を一言でいうと「デザイナーがデザインに集中できるようにする裏方の仕事」です。
              成果物そのものではなく、成果物が生まれる<strong>流れ</strong>
              を扱います。
              依頼がどこから来て、誰がレビューし、どうやって実装に渡るのか。
              その経路を可視化し、無駄や手戻りを減らすことが目的です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nielsen Norman Group は DesignOps を
              「人・プロセス・クラフトを編成し最適化することで、デザインの価値とインパクトをスケールに応じて増幅すること」
              と整理しています（原文
              &quot;The orchestration and optimization of people, processes, and
              craft in order to amplify design&rsquo;s value and impact at
              scale.&quot; の訳）。
              つまり個々のデザイナーの腕前ではなく、チーム全体が安定して良い結果を出せる土台づくりが主役です。
            </p>

            <InfoBox
              type="info"
              title="デザインの「品質」と「運用の品質」は別物"
            >
              優れたデザイナーが揃っていても、依頼経路やレビュー基準が曖昧だと成果物はばらつきます。
              DesignOps が扱うのは後者、つまり「運用の品質」です。
              個人の力に頼らず、仕組みで一定の水準を保てるようにします。
            </InfoBox>
          </section>

          {/* DevOps との対比 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              DevOps との対比で捉える
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              DevOps が開発と運用の間の壁を取り払い、
              リリースを速く・安全にする取り組みだったように、 DesignOps
              はデザインと、その前後にいる関係者（PM・エンジニア・QA）との連携をなめらかにします。
              発想の出発点は近く、対象領域がデザインに移った形です。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      観点
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      DevOps
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      DesignOps
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">
                      主な対象
                    </td>
                    <td className="py-3 px-4">ビルド・デプロイ・監視</td>
                    <td className="py-3 px-4">依頼・レビュー・ハンドオフ</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">
                      繰り返す単位
                    </td>
                    <td className="py-3 px-4">リリースのパイプライン</td>
                    <td className="py-3 px-4">デザインの制作フロー</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">
                      品質の担保
                    </td>
                    <td className="py-3 px-4">テスト・CI/CD</td>
                    <td className="py-3 px-4">デザインレビュー・トークン</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">
                      共通の狙い
                    </td>
                    <td className="py-3 px-4" colSpan={2}>
                      関係者の壁を減らし、品質を保ったまま流れを速くする
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="DesignOps が主に扱う対象として最も適切なのはどれ？"
              options={[
                { label: "個々のデザイナーの作図スキルそのもの" },
                {
                  label:
                    "依頼・レビュー・ハンドオフといった、デザインが生まれる流れの最適化",
                  correct: true,
                },
                { label: "ブランドのロゴデザインの作成" },
                { label: "サーバーのデプロイ自動化" },
              ]}
              explanation="DesignOps は成果物そのものではなく、それが生まれる運用（プロセス・ツール・人・ガバナンス）を最適化する取り組みです。個人のスキル向上やロゴ制作は範囲外で、DevOps の発想をデザイン領域に応用したものと捉えると分かりやすくなります。"
            />
          </section>

          {/* 扱う領域 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              扱う領域: プロセス・ツール・人・ガバナンス
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              DesignOps の仕事は広く見えますが、大きく 4
              つの領域に整理できます。
              どれかひとつだけを整えても効果は限定的で、 4
              つを噛み合わせることで初めてチーム全体の流れがなめらかになります。
            </p>

            <MermaidDiagram
              title="図: DesignOps が扱う4領域"
              chart={`flowchart TD
    DO["DesignOps<br/>(デザインの運用最適化)"] --> P["プロセス<br/>(依頼・レビュー・承認)"]
    DO --> T["ツール<br/>(Figma・トークン・権限)"]
    DO --> H["人<br/>(採用・育成・役割分担)"]
    DO --> G["ガバナンス<br/>(命名・追加ルール・承認)"]
    P --> R["デザイナーが<br/>設計に集中できる環境"]
    T --> R
    H --> R
    G --> R`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domains.map((d) => (
                <div
                  key={d.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {d.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {d.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* デザインシステムとトークン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デザインシステムとトークン
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              DesignOps の中核にあるのがデザインシステムです。
              色・余白・タイポグラフィといった基礎を
              <strong>デザイントークン</strong>として定義し、
              デザインと実装の両方が同じ値を参照できるようにします。
              トークンは「primary は #2563EB」といった生の値を、
              <code>color.primary</code> のような名前に紐づけたもので、
              値を一箇所で変えれば全画面に反映されるのが利点です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここで仕様と実測のズレに触れておきます。
              仕様上はトークンを変えれば全画面が一斉に追従するはずですが、
              実測ではハードコードされた値が残っていて一部だけ古い色のまま、ということが起こります。
              理由は、トークン導入前に書かれたコードや、急ぎで直接値を入れた箇所が残るためです。
              トークンは「導入したら自動で揃う」のではなく、「揃え続ける運用」が伴って初めて機能します。
            </p>

            <InfoBox
              type="success"
              title="トークンは「一度きり」ではなく「育てる」もの"
            >
              トークンは最初から完璧に揃える必要はありません。
              色から始め、余白・角丸・影と段階的に範囲を広げていくのが現実的です。
              重要なのは、新しい値を足すときのルール（誰が承認し、どこに追加するか）を決めておくことです。
            </InfoBox>
          </section>

          {/* デザイン負債 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デザイン負債
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              技術的負債と同じように、デザインにも<strong>負債</strong>
              が溜まります。 「とりあえず」で作られた一回限りのコンポーネント、
              トークンを使わずに直接指定された色、画面ごとに少しずつ違うボタン。
              ひとつひとつは小さくても、積み重なると修正コストが膨らみ、
              ブランドの一貫性も崩れていきます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              デザイン負債は完全には避けられません。
              締め切りの前では妥協が必要なこともあります。
              大切なのは、負債を「見える化」して、いつ返すかを意識的に決めることです。
              どのコンポーネントが古いか、どの画面がトークン未対応かを一覧にしておくと、
              リファクタリングの優先順位をつけやすくなります。
            </p>
          </section>

          {/* デザイナーがスケールする時の課題 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デザイナーがスケールする時の課題
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              チームに人が増えると、これまで口頭で済んでいた合意が回らなくなります。
              新しく入ったデザイナーが既存のルールを知らずに別パターンを作ってしまう、
              レビューの基準が人によって違う、依頼の窓口が分からず作業が止まる。
              こうした課題は、人が増えるほど顕在化します。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              DesignOps
              は、暗黙知を明文化することでこのスケールの壁を越えやすくします。
              命名規則・レビュー観点・依頼テンプレートを文書として残し、
              誰が入っても同じ判断ができる状態をつくる。
              これにより、人数が増えても品質を保ったままスピードを維持できます。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="デザイントークンを導入したのに一部の画面だけ古い色のままになることがある。最も近い理由はどれ？"
              options={[
                { label: "トークンは仕様上、自動で全画面に反映されないから" },
                {
                  label:
                    "ハードコードされた値や、トークン導入前のコードが残っているため、揃え続ける運用が必要だから",
                  correct: true,
                },
                { label: "トークンは色には使えないから" },
                { label: "Figma とコードは絶対に同期できないから" },
              ]}
              explanation="仕様上はトークンを変えれば全画面が追従しますが、実測では直接値を入れた箇所やトークン導入前のコードが残り、一部だけ古いまま、ということが起こります。トークンは「導入したら自動で揃う」のではなく「揃え続ける運用」が伴って機能します。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Nielsen Norman Group - DesignOps 101",
                  url: "https://www.nngroup.com/articles/design-operations-101/",
                  description:
                    "DesignOps の定義と扱う領域を体系的に整理した入門記事",
                },
                {
                  title: "Figma - デザインシステムの解説",
                  url: "https://www.figma.com/design-systems/",
                  description:
                    "デザインシステムとトークンの考え方を、実例を交えて紹介",
                },
                {
                  title: "Design Tokens Community Group",
                  url: "https://www.designtokens.org/",
                  description:
                    "デザイントークンの標準仕様を策定するコミュニティの公式サイト",
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
