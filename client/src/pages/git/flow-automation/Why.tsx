import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import MermaidDiagram from "@/components/MermaidDiagram";

const pains = [
  {
    title: "手作業のばらつき",
    body: "ラベル付け・アサイン・ボード更新を人が毎回やると、忘れる・付け間違える・人によって基準が違う、が必ず起きる。",
  },
  {
    title: "レビューの詰まり",
    body: "「これ誰が見るの？」で PR が放置される。担当が決まらないまま時間だけ過ぎ、マージが遅れる。",
  },
  {
    title: "意図しないマージ",
    body: "レビューも CI も通らないまま main にマージされ、本番が壊れる。ルールが人の善意頼みだと防げない。",
  },
  {
    title: "見えない進捗",
    body: "Issue と PR がボードに反映されず、今どこまで進んでいるかが誰にも分からない。",
  },
];

const layers = [
  {
    layer: "品質ゲート",
    tool: "CI/CD（GitHub Actions）",
    role: "壊れた変更を検査で止め、通ったものだけを届ける。",
  },
  {
    layer: "雑務の自動化",
    tool: "自動テスト・自動修正・Dependabot",
    role: "整形・依存更新・定型修正を機械に任せ、人はレビューに集中する。",
  },
  {
    layer: "分類",
    tool: "自動ラベル・トリアージ",
    role: "変更の種類や規模を自動で分類し、探しやすく・振り分けやすくする。",
  },
  {
    layer: "ルーティング",
    tool: "CODEOWNERS・自動アサイン",
    role: "「誰が見るか」を自動で決める。ドメインの担当へ確実に届ける。",
  },
  {
    layer: "可視化",
    tool: "GitHub Projects",
    role: "Issue / PR を自動でボードへ載せ、進捗を一目で追えるようにする。",
  },
  {
    layer: "ガバナンス",
    tool: "ブランチ保護・ルールセット",
    role: "承認と検査を通らない限りマージできない、という安全柵を設ける。",
  },
];

export default function Why() {
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
            なぜ Git フローを自動化するのか
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            CI/CD 編ではパイプライン（検査とデプロイ）を組みました。ここからは
            その周りにある「開発フロー全体のエコシステム」を設計します。
            ラベル分類・担当アサイン・Projects 連携・マージの制御—— まずは
            <strong>なぜこれらを自動化すると良いのか</strong>という
            背景から始めます。
          </p>
        </div>

        <WhyNowBox tags={["開発フロー", "ガバナンス", "レビュー", "自動化"]}>
          <p>
            コードを書くこと自体は、開発の一部でしかありません。
            「その変更を誰が見て、どう分類し、いつ・どういう条件でマージするか」
            という<strong>周辺の運用</strong>
            が、チームの速度と安全を実際に決めています。
            この運用を一人ひとりの記憶と善意に委ねると、規模が大きくなるほど破綻します。
            自動化とは、
            <strong>
              チームの合意した手順を仕組みとして書き出し、
              毎回同じように実行させる
            </strong>
            ことです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              何が問題なのか — 手作業に頼るフローの綻び
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              小さなチームでは、フローの多くが「暗黙の了解」で回ります。
              しかし人が増え、PR が増えると、次のような詰まりが同時多発します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pains.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              自動化で何が変わるのか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              フローを自動化すると、得られるのは「楽になる」だけではありません。
              本質は<strong>再現性と可視性</strong>
              です。誰がやっても同じ手順が回り、
              その手順がリポジトリの設定ファイルとして
              <strong>読める形で残る</strong>ため、
              新しく入った人も「このチームはこう回している」を設定から把握できます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  一貫性
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ラベルもアサインもマージ条件も、毎回同じ基準で適用される。
                  人による差がなくなる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  集中
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  雑務が機械に移り、人はレビューと設計という
                  「判断が要る仕事」に時間を使える。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  安全
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ガバナンスを仕組みにすると、事故は「気をつける」ではなく
                  「起こせない」状態にできる。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              エコシステムの全体像 — 6 つの層
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              GitHub を中心に据えると、開発フローの自動化は次の 6
              層に整理できます。 CI/CD はそのうちの「品質ゲート」の 1
              層で、この編ではその周りの層を 1 つずつ組み立てていきます。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      層
                    </th>
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      主な仕組み
                    </th>
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {layers.map((l) => (
                    <tr
                      key={l.layer}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3 text-foreground font-medium align-top whitespace-nowrap">
                        {l.layer}
                      </td>
                      <td className="px-4 py-3 text-primary align-top whitespace-nowrap">
                        {l.tool}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground align-top">
                        {l.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              これらは独立した機能ではなく、1 本の流れとしてつながります。 Issue
              が生まれてから本番に届くまでを図にすると、
              各層がどこで働くかが見えてきます。
            </p>

            <MermaidDiagram
              title="図: Issue から本番までを貫く自動化の流れ"
              chart={`flowchart TB
    I["Issue 作成"] --> L["自動ラベル / 分類"]
    L --> PJ["Projects へ自動追加"]
    I --> A["担当の自動アサイン"]
    A --> PR["PR 作成"]
    PR --> CI["CI: lint / test / build"]
    PR --> CO["CODEOWNERS がレビュー担当を指名"]
    CI --> G{"マージゲート"}
    CO --> G
    G -->|"承認 + 検査 OK"| M["マージ（自動マージ可）"]
    G -->|"条件未達"| B["マージ不可（保護）"]
    M --> D["CD: デプロイ"]
    M --> PJD["Projects: Done へ自動移動"]`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              なぜ「今」これが効くのか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AI コーディングの普及で、コードを書く速度は上がりました。
              その結果、ボトルネックは「書く」から
              <strong>「レビュー・分類・統合・ガバナンス」へ移動</strong>
              しています。 PR
              の数が増えるほど、誰が見るか・どう分類するか・安全にマージできるかが
              追いつかなくなります。フローの自動化は、増えた変更量を
              安全なまま捌くための土台です。
            </p>

            <InfoBox
              type="warning"
              title="自動化は「意味のある柵」でなければ形骸化する"
            >
              自動化やチェックを増やすほど安全になる、とは限りません。
              誰も見ない必須チェックや、通すためだけに惰性で押す承認は、
              仕様上は「ガバナンスあり」でも、実測では「素通りする関所」になります。
              仕組みは、<strong>守る意味のあるものだけ</strong>を、
              人の手間が最小になる形で置くのが原則です。この編でも
              「何を守るために置くのか」を各層で明示していきます。
            </InfoBox>
          </section>

          <section>
            <Quiz
              question="開発フローを自動化する最大の価値として、この編が強調しているのはどれ？"
              options={[
                { label: "サーバー費用が下がること" },
                {
                  label:
                    "誰がやっても同じ手順が回る再現性と、設定として残る可視性",
                  correct: true,
                },
                { label: "コードの実行速度が上がること" },
                { label: "レビューを完全に不要にできること" },
              ]}
              explanation="自動化の本質は「楽になる」ことよりも、再現性（誰がやっても同じ基準で回る）と可視性（手順が設定ファイルとして読める形で残る）にあります。レビューを不要にするのではなく、レビューという判断の要る仕事に人が集中できるよう、周辺の雑務を仕組みへ移すのが狙いです。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              この編の進め方
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">1.</span>
                <span>
                  自動テストと自動修正（整形・依存更新・AI による修正）
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">2.</span>
                <span>ラベルと分類の自動化（トリアージの土台）</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">3.</span>
                <span>アサインとレビューの自動割り当て（CODEOWNERS）</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">4.</span>
                <span>GitHub Projects 連携（進捗の可視化）</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">5.</span>
                <span>マージガバナンス（意図せぬマージの防止）</span>
              </li>
            </ul>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "GitHub の自動化とワークフロー",
                  url: "https://docs.github.com/actions/using-workflows/about-workflows",
                  description: "ワークフローで開発プロセスを自動化する考え方",
                },
                {
                  title: "About protected branches",
                  url: "https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches",
                  description: "マージのガバナンス（ブランチ保護）の全体像",
                },
                {
                  title: "About GitHub Projects",
                  url: "https://docs.github.com/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects",
                  description:
                    "Issue / PR を横断して進捗を追う Projects の役割",
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
