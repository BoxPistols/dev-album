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

const benefits = [
  {
    title: "欠陥の早期検出",
    description:
      "本番に出る前にバグやエッジケースの漏れを見つける。設計段階に近いほど修正コストは小さく、レビューはその最後の安価な検査点になる。",
  },
  {
    title: "知識共有",
    description:
      "コードを書いた人以外にも実装の意図が伝わる。仕様や設計の判断がチームの共有知になり、特定の人だけが分かる状態を減らせる。",
  },
  {
    title: "一貫性の維持",
    description:
      "命名・設計・テストの粒度をチームの基準に揃える。リポジトリ全体が同じ書き味で読めると、後から入った人も追いやすくなる。",
  },
];

export default function WhyReview() {
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
            コードレビューの目的
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            コードレビューは「間違い探し」ではありません。欠陥の早期検出、知識の共有、
            コードの共同所有、そしてチーム全体の一貫性を支える協働の場です。
            まずはレビューが何のために存在するのか、その目的を整理してから運用の話に入ります。
          </p>
        </div>

        <WhyNowBox
          tags={["コードレビュー", "品質", "知識共有", "協働", "チーム"]}
        >
          <p>
            機能を一人で書いて一人でマージできる時期は長く続きません。チームが大きくなると、
            <strong>
              「自分が書いたコードを他の人が読み、直し、運用する」
            </strong>
            前提に変わります。 レビューはその引き継ぎを成立させる仕組みであり、
            品質ゲートであると同時にチームの学習装置でもあります。
            目的を取り違えると、レビューは「通すための儀式」や「粗探しの場」に劣化してしまいます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* レビューの価値ループ図 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              レビューが生む価値のループ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レビューは一度きりの検査ではなく、作者とレビュアーの間で回り続ける循環です。
              欠陥検出・知識共有・一貫性は、この循環の中で繰り返し生まれます。
            </p>
            <MermaidDiagram
              title="図: レビューの価値ループ"
              chart={`flowchart LR
    A["作者: PR を出す"] --> R["レビュアー: コードを読む"]
    R --> F["フィードバック<br/>(指摘・質問・称賛)"]
    F --> A
    R -->|"意図を把握"| K["知識共有<br/>(バス係数↑)"]
    F -->|"基準をすり合わせ"| C["一貫性の維持"]
    K --> Q["チームの共有資産"]
    C --> Q
    Q -->|"次の PR へ"| A`}
            />
          </section>

          {/* 品質・欠陥の早期検出 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              品質と欠陥の早期検出
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レビューの最も分かりやすい効果は、バグを本番より手前で見つけることです。
              テストが拾えない領域——仕様の解釈違い、考慮漏れのエッジケース、設計上の無理——は、
              第三者の目で読むことで表面化しやすくなります。
              欠陥は発見が遅れるほど修正コストが上がるため、マージ前という早い段階で止められる価値は大きいです。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ただしレビューは万能の検査ではありません。タイポやフォーマットのような機械が拾える指摘は
              Linter
              に任せ、人は「この設計でよいか」「この仕様で合っているか」という、
              ツールでは判断しにくい部分に集中するのが効率的です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 知識共有とバス係数 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              知識共有とバス係数の低減
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「バス係数（bus
              factor）」とは、何人が突然いなくなるとプロジェクトが止まるかを表す指標です。
              ある機能を一人しか理解していない状態はバス係数 1
              で、その人が休んだ瞬間に変更も障害対応も滞ります。
              レビューを通すと、少なくとも作者とレビュアーの二人がそのコードを読み、意図を把握します。
              これだけでバス係数は上がり、チームとしての継続性が高まります。
            </p>

            <InfoBox type="info" title="レビューは最も軽い知識移転">
              ドキュメントを書くより、ペアプロを組むより、レビューは日常の開発フローに組み込まれている分だけ続きやすい知識共有手段です。
              実際に動くコードを題材に「なぜこう書いたか」を交わせるので、抽象的な設計議論より具体的に伝わります。
            </InfoBox>
          </section>

          {/* コードの共同所有 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              コードの共同所有
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レビューを習慣にすると、コードは「書いた人の持ち物」ではなく
              「チームの共有資産」になります。これを
              <strong>共同所有（collective ownership）</strong>
              と呼びます。共同所有が成立すると、誰でも他人のコードに手を入れてよいという合意が生まれ、
              特定の人にしか触れないファイルが減ります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              一方で、共同所有は「誰も責任を持たない」状態とは違います。
              全員が読み、全員が直せるからこそ、品質の基準を全員で守る——
              レビューはその基準を日々すり合わせる場でもあります。
            </p>

            <Quiz
              question="「バス係数を上げる」とは、レビューのどの効果を指している？"
              options={[
                { label: "コードの実行速度を上げること" },
                {
                  label:
                    "そのコードを理解している人を増やし、一人に依存しない状態にすること",
                  correct: true,
                },
                { label: "テストカバレッジを 100% にすること" },
                { label: "PR の数を増やすこと" },
              ]}
              explanation="バス係数は「何人欠けるとプロジェクトが止まるか」を表します。レビューで作者以外もコードを理解すれば、特定の人への依存が減り、休暇や離脱があっても開発を続けられます。これがレビューによる知識共有の核心です。"
            />
          </section>

          {/* 一貫性とメンタリング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              一貫性とメンタリング
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              リポジトリは複数人が書くほど書き味がばらつきます。レビューはその揺れを揃え、
              命名規則や設計パターンをチームの基準に収束させる場として働きます。
              一貫したコードは読む速度を上げ、レビュー自体も軽くする好循環を生みます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              さらにレビューは、経験の浅いメンバーが先輩の判断基準を学ぶメンタリングの機会にもなります。
              「なぜこの実装を選んだか」をやり取りすることで、暗黙知だった設計の勘所が言語化され、
              チーム全体の底上げにつながります。
            </p>
          </section>

          {/* 門番ではなく協働 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              レビューは「門番」ではなく「協働」
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レビュアーを「通すか落とすかを決める門番」と捉えると、レビューは対立構造になりがちです。
              作者は指摘を防御し、レビュアーは粗を探す——これでは本来の目的から外れます。
              レビューは<strong>同じゴールに向かう協働</strong>であり、
              レビュアーと作者は「このコードをより良くする」という共通の目的でテーブルに着いています。
            </p>

            <InfoBox type="success" title="協働として運用するコツ">
              指摘は「人」ではなく「コード」に向ける。提案は命令ではなく相談の形で出す。
              良い点は素直に伝える。こうした小さな振る舞いの積み重ねが、レビューを安全な協働の場に保ちます。
              詳しい作法は「レビュー文化とコミュニケーション」の章で扱います。
            </InfoBox>
          </section>

          {/* レビューしない場合のリスク */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              レビューしない場合のリスク
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レビューを省くと短期的には速く進めますが、いくつかの負債が静かに積もります。
              欠陥が本番まで届きやすくなり、知識が個人に閉じてバス係数が下がり、
              コードの書き味がばらついて読みづらくなります。
              これらは一度に表面化せず、後からまとめて開発速度を落とす形で返ってきます。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      省いたもの
                    </th>
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      後から表れるリスク
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">欠陥検出</td>
                    <td className="py-2 px-3">
                      本番障害・手戻り。発見が遅いほど修正コストが増える
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">知識共有</td>
                    <td className="py-2 px-3">
                      バス係数の低下。特定の人がいないと変更できない領域が増える
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">一貫性の確認</td>
                    <td className="py-2 px-3">
                      書き味のばらつき。読む速度が落ち、レビューも重くなる
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              もちろん、すべての変更に重いレビューを課す必要はありません。
              影響範囲やリスクに応じて軽重を付けるのが現実的です。大切なのは
              「レビューを省くと何を失うか」を理解した上で、意図的に選ぶことです。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="レビューを「門番」ではなく「協働」と捉えると、レビュアーの役割はどう変わる？"
              options={[
                { label: "通すか落とすかを判定する審査員になる" },
                {
                  label:
                    "作者と同じゴールに立ち、一緒にコードをより良くする立場になる",
                  correct: true,
                },
                { label: "コードを書き直して提出し直す担当になる" },
                { label: "指摘を一切せず承認だけする立場になる" },
              ]}
              explanation="レビューを協働と捉えると、レビュアーと作者は対立せず「このコードを良くする」という共通の目的を共有します。門番モデルは対立や防御を生みやすく、本来の目的（品質・知識共有）から離れがちです。"
            />
          </section>

          {/* ハンズオン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ハンズオン: レビューの目的を言語化する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レビュー依頼に添える短い説明を書いてみましょう。
              「なぜレビューしてほしいか（目的）」を一言で示すと、レビュアーは焦点を絞れます。
            </p>
            <CodingChallenge
              preview
              previewType="markdown"
              title="レビュー依頼の目的を埋めよう"
              description="レビュー依頼メモの目的欄を埋めてください。レビューは粗探しではなく、欠陥の早期検出と知識共有が目的です。"
              initialCode={`## レビュー依頼

このPRの目的: ___ の早期検出と知識共有

特に見てほしい: 認可まわりの分岐`}
              answer={`## レビュー依頼

このPRの目的: 欠陥 の早期検出と知識共有

特に見てほしい: 認可まわりの分岐`}
              hints={["本番より手前で止めたい対象は『欠陥』"]}
              keywords={["欠陥"]}
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Google Engineering Practices - Code Review",
                  url: "https://google.github.io/eng-practices/review/",
                  description:
                    "Google のコードレビュー実践ガイド。レビューの目的と判断基準が体系的にまとまっている",
                },
                {
                  title: "Google - The Standard of Code Review",
                  url: "https://google.github.io/eng-practices/review/reviewer/standard.html",
                  description:
                    "「コードを全体として改善するなら承認する」というレビュー基準の考え方",
                },
                {
                  title: "GitHub Docs - About pull request reviews",
                  url: "https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews",
                  description:
                    "GitHub 上でのレビューの仕組みと、レビューが協働でどう機能するかの基礎",
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
