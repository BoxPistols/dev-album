import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const labels = [
  {
    title: "praise",
    description: "良い点を素直に伝える。承認以外の前向きなフィードバック。",
  },
  {
    title: "nitpick",
    description: "些細だが直しておきたい小さな指摘。任意（non-blocking）扱いが基本。",
  },
  {
    title: "suggestion",
    description: "具体的な改善案。こうするとどうか、という提案。",
  },
  {
    title: "issue",
    description: "問題の指摘。対応が必要な懸念を表す。",
  },
  {
    title: "question",
    description: "意図を確認する質問。指摘ではなく理解のため。",
  },
  {
    title: "thought",
    description: "レビュー中に浮かんだ着想。non-blocking だが議論の種になる。",
  },
  {
    title: "chore",
    description: "受け入れ前に済ませたい定型作業（プロセス上の必須対応）。",
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
            レビュー文化とコミュニケーション
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            レビューの質は、技術力だけでなく言葉の選び方に左右されます。
            人ではなくコードを批評し、提案は質問の形で出し、良い点には感謝を伝える。
            こうした小さな作法が心理的安全性を保ち、レビューを続けやすい協働の場にします。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "心理的安全性",
            "Conventional Comments",
            "SLA",
            "非同期",
            "コミュニケーション",
          ]}
        >
          <p>
            同じ指摘でも、言い方ひとつで受け取り方は大きく変わります。
            <strong>
              「ここ間違ってる」と「ここはこうするとどうでしょう？」
            </strong>
            は、伝える内容が同じでも作者の心理に与える影響がまったく違います。
            レビューが安全な場であれば、人は素直に指摘を受け入れ、自分の疑問も出しやすくなります。
            逆に攻撃的な場では防御が生まれ、学びも品質も遠ざかります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 心理的安全性 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              心理的安全性
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              心理的安全性とは「指摘しても、質問しても、間違えても、罰せられない」とメンバーが感じられる状態です。
              レビューにおいてこれが欠けると、レビュアーは指摘を遠慮し、作者は防御的になります。
              結果として、本来見つかるはずの問題が見過ごされます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              安全性は宣言ではなく日々の振る舞いで作られます。
              レビュアーが穏やかな言葉を選び、作者が指摘を人格否定と捉えない——
              この相互の積み重ねが、率直に意見を交わせる土台になります。
            </p>
          </section>

          {/* 人ではなくコードを批評する */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              人ではなくコードを批評する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レビューで批評する対象は「コード」であって「書いた人」ではありません。
              <strong>
                「あなたはなぜこんな書き方を」ではなく「このコードはこう変えると読みやすくなる」
              </strong>
              と、主語をコードに置きます。主語が人になると、指摘は批判として響きやすくなります。
            </p>

            <InfoBox type="info" title="主語を「コード」に置く">
              「You wrote this confusingly」ではなく「This is hard to follow」。
              英語のレビュー文化でよく言われる言い換えです。日本語でも同じで、
              「あなた」を主語にせず、コードや事象を主語にするだけで角が取れます。
            </InfoBox>
          </section>

          {/* Conventional Comments */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Conventional Comments
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              指摘の意図を一目で伝える記法が
              <strong>Conventional Comments</strong>です。
              コメントの先頭にラベルを付け、それが praise（称賛）なのか
              nitpick（些細な指摘）なのか issue（問題）なのかを明示します。
              これにより作者は「必ず直すべきか・任意か・ただの質問か」をすぐ判断できます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {labels.map((l) => (
                <div
                  key={l.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-primary mb-2 text-base font-mono">
                    {l.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {l.description}
                  </p>
                </div>
              ))}
            </div>

            <CodeBlock
              language="md"
              title="Conventional Comments の記法例"
              code={`praise: テストのエッジケースまで丁寧に書かれていて読みやすいです。

nitpick: 変数名を items より userItems にすると意図が伝わりやすそうです。

suggestion: ここは早期 return にすると、ネストが浅くなって読みやすくなります。

issue: この入力が null のとき例外になります。検証を追加する必要があります。

question: この分岐はどんなケースを想定していますか？ 意図を確認させてください。

# label と任意の decoration を組み合わせる書き方
suggestion (non-blocking): この命名は好みなので、対応は任意で大丈夫です。`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Conventional Comments でコメント先頭にラベル（praise / nitpick / issue など）を付ける狙いは？"
              options={[
                { label: "コメントの文字数を減らすため" },
                {
                  label:
                    "その指摘が必須か任意か質問かを明示し、作者が対応を判断しやすくするため",
                  correct: true,
                },
                { label: "CI に自動修正させるため" },
                { label: "レビュアーを匿名にするため" },
              ]}
              explanation="Conventional Comments はラベルで指摘の種類を示します。praise は称賛、nitpick は些細な指摘、issue は要対応、question は確認です。作者は先頭を見るだけで「必ず直すか・任意か・質問か」を判断でき、無用な往復が減ります。"
            />
          </section>

          {/* 質問形式・感謝 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              質問形式での提案と感謝
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              提案を<strong>質問の形</strong>
              で出すと、押し付けにならず対話が生まれます。
              「ここはこうすべき」より「ここはこうするとどうでしょう？」のほうが、
              作者は別の文脈や制約を説明しやすくなります。
              レビュアーが見落としている事情があるかもしれず、質問形式はその余地を残します。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              そして<strong>良い点には感謝や称賛を素直に伝えます</strong>。
              レビューは指摘ばかりになりがちですが、praise
              を一言添えるだけで場の空気が変わります。
              「丁寧にテストが書かれていて助かりました」のような言葉が、次のレビューの心理的ハードルを下げます。
            </p>

            <InfoBox type="success" title="提案は相談、批評はコードへ">
              「命令」ではなく「相談」、「人」ではなく「コード」。
              この2つを守るだけで、レビューの往復は驚くほど穏やかになります。
              質問形式は弱腰ではなく、相手の文脈を尊重する姿勢の表れです。
            </InfoBox>
          </section>

          {/* SLA と非同期 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              レビュー SLA と非同期コミュニケーション
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レビューが滞ると PR が積み上がり、開発全体が詰まります。
              そこでチームで<strong>レビュー SLA</strong>——
              「依頼から1営業日以内に一次レビューを返す」といった目安——を決めておくと、
              作者は待ち時間を見積もれ、レビュアーも優先度を判断しやすくなります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レビューは基本的に<strong>非同期コミュニケーション</strong>です。
              相手の作業を止めずに済む反面、文章だけだとニュアンスが伝わりにくい弱点があります。
              だからこそ Conventional Comments
              のようなラベルや、丁寧な言葉選びが効いてきます。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      手段
                    </th>
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      向いている場面
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">
                      非同期（PR コメント）
                    </td>
                    <td className="py-2 px-3">
                      通常のレビュー。記録が残り、互いの時間を拘束しない
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">
                      同期（通話・ペア）
                    </td>
                    <td className="py-2 px-3">
                      議論が長引いたとき・認識が大きくずれたとき
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 議論が長引いたら同期へ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              議論が長引いたら同期へ切り替える
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              コメントの往復が3〜4回続いても収束しないときは、テキストの限界を疑います。
              <strong>
                そのまま書き続けるより、短い通話やペア作業に切り替えたほうが速く合意できます
              </strong>
              。
              文章だと数十分かかるすれ違いが、声で話せば数分で解けることはよくあります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              同期に切り替えたら、決まったことは PR コメントに要約して残します。
              口頭の合意は記録に残らないため、後から経緯を追えるよう書き戻すのが大切です。
              非同期を基本にしつつ、行き詰まりは同期で抜ける——この使い分けがレビューを前に進めます。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="PR 上のコメントの往復が何度も続いて収束しないとき、推奨される対応は？"
              options={[
                { label: "作者が折れて指摘どおりに直すまでコメントを続ける" },
                {
                  label:
                    "短い通話やペア作業など同期コミュニケーションに切り替え、決定は PR に書き戻す",
                  correct: true,
                },
                { label: "PR をクローズして最初からやり直す" },
                { label: "レビュアーを交代する" },
              ]}
              explanation="テキストでの往復が長引くのは、文章の限界に達しているサインです。同期（通話・ペア）に切り替えると速く合意できます。口頭の合意は記録に残らないため、決まったことは PR コメントに要約して書き戻します。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Conventional Comments",
                  url: "https://conventionalcomments.org/",
                  description:
                    "praise / nitpick / suggestion / issue / question / thought / chore などのラベル記法の公式仕様",
                },
                {
                  title: "Google - How to write code review comments",
                  url: "https://google.github.io/eng-practices/review/reviewer/comments.html",
                  description:
                    "礼儀正しく、コードに向けて、理由を添えて書くレビューコメントの指針",
                },
                {
                  title: "Google - Handling pushback in code reviews",
                  url: "https://google.github.io/eng-practices/review/reviewer/pushback.html",
                  description:
                    "意見が対立したときの向き合い方。感情的にならず合意へ導く方法",
                },
                {
                  title:
                    "GitHub Docs - Reviewing proposed changes in a pull request",
                  url: "https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request",
                  description:
                    "GitHub 上でレビューコメントを残す具体的な操作と非同期レビューの流れ",
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
