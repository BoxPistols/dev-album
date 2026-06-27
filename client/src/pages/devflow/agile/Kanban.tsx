import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const practices = [
  {
    title: "可視化する",
    description:
      "作業をカードにし、ボード上の列（ToDo / Doing / Done など）で流れを見える化する。今どこに何があるかが一目で分かる。",
  },
  {
    title: "WIP を制限する",
    description:
      "各列に同時進行できる数の上限（WIP 制限）を設ける。詰め込みすぎを防ぎ、一つずつ確実に終わらせる流れを作る。",
  },
  {
    title: "プル型で進める",
    description:
      "手が空いた人が次の作業を自分で引き取る。上から押し込むのではなく、キャパシティに応じて引く。",
  },
];

export default function Kanban() {
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
            カンバンとフロー効率
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            カンバンは、作業の流れを可視化し、滞りをなくして
            <strong>スムーズに流す</strong>ことに重点を置く手法です。
            このページでは、可視化・WIP 制限・プル型という基本プラクティス、
            リードタイムとサイクルタイム、フロー効率とリソース効率の違い、
            そしてスクラムとの使い分けと併用（Scrumban）を一通り整理します。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "カンバン",
            "WIP 制限",
            "フロー効率",
            "リードタイム",
            "Scrumban",
          ]}
        >
          <p>
            「忙しいのに、なぜかなかなか終わらない」——
            これは多くの人を同時に複数の作業へ割り当てた結果、
            一つひとつが滞って起きることがよくあります。 カンバンは
            <strong>稼働率を上げること</strong>ではなく、
            <strong>仕事を早く流し切ること</strong>に視点を移す手法です。
            その視点の違いを掴むと、チームの「速さ」の意味が変わって見えてきます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 基本プラクティス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              カンバンの基本プラクティス
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              カンバンは決まった役割やイテレーションを持たず、
              既存のプロセスにそのまま重ねて始められる点が特徴です。
              中心になるのが、可視化・WIP 制限・プル型という 3
              つのプラクティスです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {practices.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="WIP 制限が「流れ」を生む">
              WIP（Work In Progress＝仕掛かり中の作業）を制限すると、
              新しい作業を始める前に、まず今あるものを終わらせる必要が生まれます。
              これにより滞留が減り、一枚のカードがボードを流れきるまでの時間が短くなります。
              上限に達して手が止まったときこそ、ボトルネックが可視化された瞬間です。
            </InfoBox>
          </section>

          {/* リードタイムとサイクルタイム */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リードタイムとサイクルタイム
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              カンバンでは時間そのものを主要な指標として扱います。 よく使う 2
              つがリードタイムとサイクルタイムです。混同しやすいので、
              どこを始点に測るかで区別します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  リードタイム
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  依頼が発生してから完了するまでの全体時間。待ち時間も含む、顧客から見た所要時間。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  サイクルタイム
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  実際に着手してから完了するまでの時間。チームが手を動かしている区間を測る。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              リードタイムが長いのにサイクルタイムが短いなら、 着手前の
              <strong>待ち</strong>
              に時間が消えている、という読み取りができます。
              数字を見て「どこで止まっているか」を特定できるのが、可視化と計測の価値です。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="WIP 制限を設ける主な狙いはどれ？"
              options={[
                { label: "一人あたりの担当タスク数を最大化するため" },
                {
                  label: "同時進行を絞って滞留を減らし、作業を早く流しきるため",
                  correct: true,
                },
                { label: "ボードの列を増やして見栄えを良くするため" },
                { label: "スプリントの期間を固定するため" },
              ]}
              explanation="WIP 制限は同時に進める作業数の上限です。詰め込みを防いで一つずつ確実に終わらせることで滞留が減り、カードがボードを流れきるまでの時間が短くなります。稼働率の最大化が目的ではありません。"
            />
          </section>

          {/* フロー効率 vs リソース効率 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              フロー効率 vs リソース効率
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              カンバンの肝は、効率の見方を<strong>リソース効率</strong>から
              <strong>フロー効率</strong>へ移すことです。
              リソース効率は「人がどれだけ稼働しているか」、
              フロー効率は「作業対象がどれだけ滞らず流れているか」を見ます。
              この 2 つはしばしば対立します。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="text-left p-3 border-b border-border font-bold">
                      観点
                    </th>
                    <th className="text-left p-3 border-b border-border font-bold">
                      リソース効率
                    </th>
                    <th className="text-left p-3 border-b border-border font-bold">
                      フロー効率
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      見るもの
                    </td>
                    <td className="p-3 border-b border-border">
                      人や設備の稼働率
                    </td>
                    <td className="p-3 border-b border-border">
                      作業が流れる速さ
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      最大化すると
                    </td>
                    <td className="p-3 border-b border-border">
                      全員が常に何かに着手
                    </td>
                    <td className="p-3 border-b border-border">
                      一件を早く完了させる
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      起きやすいこと
                    </td>
                    <td className="p-3 border-b border-border">
                      仕掛かりが増え滞留する
                    </td>
                    <td className="p-3 border-b border-border">
                      手待ちが時に発生する
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      カンバンの重点
                    </td>
                    <td className="p-3">補助的に見る</td>
                    <td className="p-3">こちらを優先する</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="warning" title="稼働率 100% は速さを意味しない">
              全員が常に忙しい状態（高いリソース効率）は、一見すると効率的に見えます。
              しかし仕掛かりが増えれば一件あたりの待ち時間が伸び、
              顧客から見た完了は遅くなりがちです。
              「忙しさ」と「速く届くこと」は別物だ、という前提に立つのがフロー効率の発想です。
            </InfoBox>
          </section>

          {/* スクラムとの違いと併用 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              スクラムとの違いと併用 (Scrumban)
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              スクラムとカンバンはどちらもアジャイルの実践ですが、リズムの作り方が異なります。
              スクラムは固定スプリントという時間の区切りで反復し、
              カンバンは区切りを設けず継続的に流します。
              どちらが優れているということはなく、仕事の性質で選びます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="text-left p-3 border-b border-border font-bold">
                      観点
                    </th>
                    <th className="text-left p-3 border-b border-border font-bold">
                      スクラム
                    </th>
                    <th className="text-left p-3 border-b border-border font-bold">
                      カンバン
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      リズム
                    </td>
                    <td className="p-3 border-b border-border">
                      固定スプリントで反復
                    </td>
                    <td className="p-3 border-b border-border">継続的フロー</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      役割
                    </td>
                    <td className="p-3 border-b border-border">
                      明確な 3 つの責任
                    </td>
                    <td className="p-3 border-b border-border">
                      規定の役割はない
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      向いている仕事
                    </td>
                    <td className="p-3">計画して作る開発系</td>
                    <td className="p-3">流入が読めない運用・保守系</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              両者を組み合わせた進め方が<strong>Scrumban</strong>です。
              スクラムのイベントやふりかえりを土台にしつつ、 カンバンの WIP
              制限やフロー指標を取り入れます。
              スクラムから始めて流れの滞りに課題を感じたチームが、
              カンバンの要素を足していく、という移行の形でよく使われます。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="フロー効率とリソース効率の関係として正しいのはどれ？"
              options={[
                {
                  label:
                    "リソース効率（稼働率）を最大化すれば、必ずフロー効率も上がる",
                },
                {
                  label:
                    "稼働率を上げすぎると仕掛かりが増えて滞留し、かえって完了が遅くなることがある",
                  correct: true,
                },
                { label: "フロー効率とリソース効率は常に一致する" },
                { label: "カンバンはリソース効率の最大化を最優先する" },
              ]}
              explanation="全員が常に忙しい状態（高いリソース効率）でも、仕掛かりが増えれば一件あたりの待ち時間が伸び、顧客から見た完了は遅くなりがちです。カンバンは作業が滞らず流れるフロー効率を優先します。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Atlassian - カンバン入門",
                  url: "https://www.atlassian.com/ja/agile/kanban",
                  description:
                    "カンバンボード・WIP 制限・フローの考え方を実務目線で解説",
                },
                {
                  title: "Atlassian - カンバン vs スクラム",
                  url: "https://www.atlassian.com/ja/agile/kanban/kanban-vs-scrum",
                  description:
                    "両手法の違いと使い分け、併用について整理したガイド",
                },
                {
                  title: "アジャイルソフトウェア開発宣言（日本語）",
                  url: "https://agilemanifesto.org/iso/ja/manifesto.html",
                  description:
                    "カンバンも含むアジャイル実践の根底にある価値観の原典",
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
