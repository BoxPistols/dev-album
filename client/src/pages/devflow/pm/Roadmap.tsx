import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const horizons = [
  {
    title: "Now",
    subtitle: "今やっていること",
    description:
      "現在着手中、または直近で着手する取り組み。スコープと意図がはっきりしていて、確度も高い。",
  },
  {
    title: "Next",
    subtitle: "次に取り組むこと",
    description:
      "Now の次に控える候補。方向性は固まりつつあるが、詳細や順序はまだ動く余地がある。",
  },
  {
    title: "Later",
    subtitle: "いつか取り組むこと",
    description:
      "まだ粗いアイデアや仮説の段階。学びによって優先順位も中身も大きく変わりうる。",
  },
];

export default function Roadmap() {
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
            ロードマップと優先順位付け
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            ロードマップは「いつ何をリリースするか」の約束表ではなく、
            「どんな成果を目指して、何から取り組むか」を共有するための地図です。
            ここでは、アウトカム起点のロードマップ・Now-Next-Later
            での表現・代表的な優先順位付けフレームを、比較しながら一通り体験できます。
          </p>
        </div>

        <WhyNowBox
          tags={["ロードマップ", "優先順位", "アウトカム", "ステークホルダー"]}
        >
          <p>
            「機能の一覧に日付を振った表」をロードマップと呼ぶと、
            日付が守れないたびに信頼が削れていきます。本来ロードマップが共有すべきは、
            どんなユーザーの課題を・どんな順番で解こうとしているか、という方向性です。
            優先順位付けのフレームと、日付ではなく成果で語る作法を身につけると、
            ステークホルダーとの会話を「期日の催促」から「価値の合意」へ動かせます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* アウトカムベース */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              アウトカムベースのロードマップ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ロードマップには大きく 2
              つの作り方があります。「どの機能をいつ作るか」を並べる
              <strong>アウトプット起点</strong>
              と、「どんな成果（課題の解決）を目指すか」を並べる
              <strong>アウトカム起点</strong>
              です。後者は、解決したい問題を主役に置き、
              その実現手段（機能）は固定しません。手段を縛らないことで、
              より良い解決策が見つかったときに柔軟に乗り換えられます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-bold text-foreground">
                      観点
                    </th>
                    <th className="text-left py-2 px-3 font-bold text-foreground">
                      アウトプット起点
                    </th>
                    <th className="text-left py-2 px-3 font-bold text-foreground">
                      アウトカム起点
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">
                      主役
                    </td>
                    <td className="py-2 px-3">作る機能</td>
                    <td className="py-2 px-3">解決したい課題・目指す成果</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">
                      手段の柔軟性
                    </td>
                    <td className="py-2 px-3">固定されやすい</td>
                    <td className="py-2 px-3">学びに応じて変えられる</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">
                      成功の測り方
                    </td>
                    <td className="py-2 px-3">予定どおり作れたか</td>
                    <td className="py-2 px-3">
                      指標（課題が解けたか）が動いたか
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="機能ではなく課題を約束する">
              「検索を改善する」より「目的の商品に 3
              クリック以内でたどり着けるようにする」と書く方が、
              チームに解決の自由度を残せます。前者は手段、後者は成果。
              ロードマップが成果で書かれていると、途中で別案に切り替えても「約束を破った」ことになりません。
            </InfoBox>
          </section>

          {/* Now-Next-Later */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Now-Next-Later
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Now-Next-Later は、ロードマップを「日付の列」ではなく
              <strong>確度の異なる 3 つの時間軸</strong>で表す形式です。
              近い未来（Now）ほど確度が高く詳細に、遠い未来（Later）ほど粗く保ちます。
              「Q3
              にリリース」のような硬い約束を避けつつ、進む方向は共有できるのが利点です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {horizons.map((h) => (
                <div
                  key={h.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {h.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {h.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Now-Next-Later 形式が、日付ベースのロードマップより優れている主な点は？"
              options={[
                { label: "開発スピードが必ず速くなる" },
                {
                  label:
                    "確度の違いを表現でき、硬い期日約束を避けつつ方向性を共有できる",
                  correct: true,
                },
                { label: "ステークホルダーへの報告が不要になる" },
                { label: "見積もりをしなくてよくなる" },
              ]}
              explanation="Now-Next-Later は時間軸を「確度」で区切ります。近い未来は詳細・高確度、遠い未来は粗いまま、と表現できるため、守れない期日を約束してしまうリスクを避けながら、進む方向だけは共有できます。"
            />
          </section>

          {/* 優先順位付けフレーム */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              優先順位付けフレームの比較
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「何から作るか」を決めるための代表的なフレームを、性格の違いで比べてみます。
              どれが正解ということはなく、判断材料の数や状況に応じて使い分けます。
              迷ったら、まず軽量な「価値 × コスト」から始め、
              候補が多くて差をつけにくいときに RICE
              のような定量手法に進むと扱いやすいです。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-bold text-foreground">
                      フレーム
                    </th>
                    <th className="text-left py-2 px-3 font-bold text-foreground">
                      考え方
                    </th>
                    <th className="text-left py-2 px-3 font-bold text-foreground">
                      向いている場面
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">
                      RICE
                    </td>
                    <td className="py-2 px-3">
                      Reach × Impact × Confidence ÷ Effort をスコア化
                    </td>
                    <td className="py-2 px-3">
                      候補が多く、定量的に比較・順位づけしたいとき
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">
                      MoSCoW
                    </td>
                    <td className="py-2 px-3">
                      Must / Should / Could / Won't の 4 区分
                    </td>
                    <td className="py-2 px-3">
                      リリース範囲の合意や、必須と任意の線引きをしたいとき
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">
                      価値 × コスト
                    </td>
                    <td className="py-2 px-3">
                      価値の高さと実装コストの 2 軸でマップに配置
                    </td>
                    <td className="py-2 px-3">
                      手早く全体像を掴み、「高価値・低コスト」を先に拾いたいとき
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox
              type="warning"
              title="スコアは判断の補助であって答えではない"
            >
              RICE の Confidence や Impact
              は、結局のところ見立てです。数式に乗せると客観的に見えますが、
              入力が主観なら出力も主観です。スコアは議論を整理する補助線として使い、
              最後はチームの判断で上書きしてよい、という前提を共有しておきましょう。
            </InfoBox>
          </section>

          {/* マイルストーン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              マイルストーンの置き方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              マイルストーンは、進捗の節目を示す目印です。
              「○月○日までに完成」という期日の宣言ではなく、
              <strong>
                「ここまで来たら次の判断ができる」という意味のある到達点
              </strong>
              として置くと機能します。
              たとえば「最小構成を社内で試せる状態」「特定セグメントに限定公開」といった、
              そこで学びや意思決定が得られる地点を選びます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  良いマイルストーン
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  到達したかを判定でき、そこで次の意思決定（続ける/方向転換）ができる節目。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  避けたいマイルストーン
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  根拠の薄い期日だけを置いたもの。守れないと信頼を損ない、学びも生まない。
                </p>
              </div>
            </div>
          </section>

          {/* ステークホルダー調整 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ステークホルダー調整
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ロードマップは、関係者との合意形成の道具でもあります。
              営業・経営・サポートなど、立場によって見たい情報は異なります。
              全員に同じ詳細を見せるより、
              <strong>相手の関心に合わせて粒度を変える</strong>方が伝わります。
              そして、要望をそのまま機能に変換するのではなく、
              背後にある課題（So
              that）まで掘り下げてから優先順位の議論に乗せるのがコツです。
            </p>

            <InfoBox type="success" title="「なぜ今これなのか」を一緒に渡す">
              ロードマップを共有するときは、並び順そのものより
              「なぜこの順番にしたのか」を添えると合意が得やすくなります。
              優先順位の根拠（どのフレームで何を重視したか）を見せることで、
              「自分の要望が下なのは軽視されたからではない」と納得してもらいやすくなります。
            </InfoBox>
          </section>

          {/* 日付ではなく方向性 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              「日付の約束」ではなく方向性
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ロードマップを日付の約束として扱うと、計画が「守る/破る」の二択になり、
              学びによる軌道修正が「失敗」に見えてしまいます。
              本来ロードマップは、
              <strong>進む方向と、その時点での最善の見立て</strong>
              を共有するものです。
              新しい情報が入れば更新されるのが正常で、更新は約束破りではなく、より良い判断の証拠です。
            </p>

            <p className="text-muted-foreground leading-relaxed">
              仕様（計画上の予定）と実測（実際の進み方）はズレます。理由は、
              市場やユーザーの反応、技術的な発見が事前には分からないからです。
              だからこそ、近い未来は確度高く・遠い未来は粗く保ち、
              定期的に見直す前提でロードマップを運用すると、変化を味方にできます。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="RICE スコアのような定量フレームを使うときの正しい心構えはどれ？"
              options={[
                { label: "スコアが最も高い項目は無条件で最優先にする" },
                {
                  label:
                    "入力が主観なら出力も主観。議論を整理する補助としてチームの判断で上書きしてよい",
                  correct: true,
                },
                {
                  label: "スコアを出したらステークホルダーとの議論は不要になる",
                },
                {
                  label:
                    "Effort を小さく見積もるほど良いスコアになるので小さく書く",
                },
              ]}
              explanation="RICE の Reach・Impact・Confidence・Effort はいずれも見立てを含みます。数式は議論を整理する補助線であり、入力が主観なら結果も主観です。スコアは絶対的な答えではなく、最終判断はチームで上書きできる前提で使うのが適切です。"
            />
          </section>

          {/* Quiz 3 */}
          <section>
            <Quiz
              question="アウトカムベースのロードマップで項目を書くとき、より適切な表現はどれ？"
              options={[
                { label: "「商品検索画面をリニューアルする」" },
                {
                  label: "「目的の商品に短い手順でたどり着けるようにする」",
                  correct: true,
                },
                { label: "「6 月末までに検索機能をリリースする」" },
                { label: "「検索 API を新しいライブラリに置き換える」" },
              ]}
              explanation="アウトカムベースでは、達成したい成果（課題の解決）を主役にします。「短い手順でたどり着けるようにする」は成果の表現で、実現手段を縛りません。画面リニューアルや API 置き換え、特定の期日は手段や約束であり、より良い解決策への乗り換えを難しくします。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Roman Pichler - The GO Product Roadmap",
                  url: "https://www.romanpichler.com/blog/goal-oriented-agile-product-roadmap/",
                  description:
                    "ゴール（アウトカム）起点のロードマップ作りを解説する一次的な記事",
                },
                {
                  title: "SVPG - Product Roadmaps",
                  url: "https://www.svpg.com/product-roadmaps/",
                  description:
                    "Marty Cagan による、機能リストとしてのロードマップの問題点と代替案",
                },
                {
                  title: "Atlassian - Product Roadmaps",
                  url: "https://www.atlassian.com/agile/product-management/product-roadmaps",
                  description:
                    "ロードマップの目的と作り方を実務目線でまとめたガイド",
                },
                {
                  title: "Intercom - The RICE scoring model",
                  url: "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/",
                  description: "RICE スコアの提唱元による定義と計算方法の解説",
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
