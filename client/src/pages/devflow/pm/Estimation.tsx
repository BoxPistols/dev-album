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

const scaleItems = [
  {
    title: "フィボナッチ数列",
    examples: "1, 2, 3, 5, 8, 13, 21",
    description:
      "数字が大きくなるほど間隔が広がる。大きい項目ほど不確実性が高いという実感に合い、隣接する値で迷いにくい。ストーリーポイントの定番。",
  },
  {
    title: "T シャツサイズ",
    examples: "XS, S, M, L, XL",
    description:
      "数値を使わず相対的な大きさだけで分類する。見積もりに慣れていないチームや、粗いエピックの初期分類に向く。",
  },
  {
    title: "パワーオブツー",
    examples: "1, 2, 4, 8, 16",
    description:
      "倍々で広がるスケール。フィボナッチと同様に大きい側を粗くするが、刻みがより大胆になる。",
  },
];

export default function Estimation() {
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
            見積もりとプランニング
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            「これ、どれくらいで終わる？」という問いに、正確な時間で答えるのは難しいものです。
            アジャイルでは、絶対時間の代わりに「相対的な大きさ」で見積もり、
            その実績から将来を予測します。ここでは、ストーリーポイント・プランニングポーカー・
            ベロシティといった見積もりの道具を、考え方とセットで試しながら学べます。
          </p>
        </div>

        <WhyNowBox
          tags={["見積もり", "ストーリーポイント", "ベロシティ", "不確実性"]}
        >
          <p>
            「3 日でできます」と言ったのに 1
            週間かかった、という経験は多くの人にあります。
            原因は怠慢ではなく、見積もりの仕組みに無理があることが多いのです。
            人は所要時間を当てるのは苦手でも、「A は B よりだいたい 2
            倍大きい」という比較は得意です。
            この得意な感覚を使い、実績で補正していくのが相対見積もりの発想です。
            仕組みを理解すると、見積もりを「約束」と取り違える事故を避けられます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* なぜ相対見積もり */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              なぜ絶対時間ではなく相対見積もりなのか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「何時間かかるか」を正確に当てるのは、誰にとっても難しい作業です。
              割り込み・調査・レビュー待ちなど、所要時間は環境に大きく左右されます。
              一方で「この作業は、あの作業よりだいたい 2 倍大きい」という
              <strong>相対的な比較</strong>は、人にとってずっと自然です。
              相対見積もりは、この得意な感覚を使って項目の大きさを表します。
            </p>

            <InfoBox type="info" title="仕様と実測のズレを前提にする">
              見積もりの世界では、仕様（計画上の値）と実測（実際にかかった時間）がズレるのが普通です。
              仕様では「8 ポイント =
              数日」と感じても、実測は割り込みやレビュー待ちで前後します。
              理由は、所要時間が個人の能力だけでなく環境に左右されるからです。
              だからこそ、点ではなく<strong>実績の平均（ベロシティ）</strong>
              で将来を見ます。
            </InfoBox>
          </section>

          {/* ストーリーポイント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ストーリーポイント：大きさの単位
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ストーリーポイントは、ストーリーの「大きさ」を表す相対的な単位です。
              ここでいう大きさには、作業量・複雑さ・不確実性がまとめて含まれます。
              基準となる小さなストーリーを「2 ポイント」などと決め、
              他の項目を「それと比べて何倍くらいか」で評価していきます。
              ポイントに時間の単位は含まれません。「5 ポイント = 5
              日」という換算はしない、というのが重要なルールです。
            </p>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">作業量</p>
                  <p className="text-muted-foreground">
                    やることの多さ。画面数・対応パターンの多さなど
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">複雑さ</p>
                  <p className="text-muted-foreground">
                    難しさ・絡み合い。既存コードへの影響範囲など
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">不確実性</p>
                  <p className="text-muted-foreground">
                    分からなさ。前例の有無・外部依存の見えなさ
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* プランニングポーカー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              プランニングポーカー
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              プランニングポーカーは、チームで見積もりを揃えるための手法です。
              一つのストーリーについて、各メンバーが自分の見積もり（ポイント）を一斉に出します。
              数字が割れたら、最大と最小を出した人がその理由を説明し、
              <strong>その対話を経てもう一度出し直します</strong>。
              数字を合わせること自体より、見えていない前提を表に出すことが目的です。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-bold text-foreground">
                      手順
                    </th>
                    <th className="text-left py-2 px-3 font-bold text-foreground">
                      やること
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">1</td>
                    <td className="py-2 px-3">
                      対象ストーリーと受け入れ基準を全員で確認する
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">2</td>
                    <td className="py-2 px-3">
                      各自がカード（ポイント）を選び、一斉に提示する
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">3</td>
                    <td className="py-2 px-3">
                      最大・最小の人が根拠を説明し、認識のズレを共有する
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">4</td>
                    <td className="py-2 px-3">
                      合意に近づくまで提示を繰り返す
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <MermaidDiagram
              title="図: プランニングポーカーの流れ"
              chart={`flowchart TD
    A["ストーリーと受け入れ基準を確認"] --> B["各自がカードを選ぶ"]
    B --> C["一斉に提示する"]
    C --> D{"見積もりは揃ったか"}
    D -->|"揃った"| E["ポイント確定"]
    D -->|"割れた"| F["最大・最小の人が根拠を説明"]
    F --> B`}
            />

            <InfoBox type="warning" title="平均を取って終わりにしない">
              数字が割れたとき、機械的に平均して切り上げるのは避けましょう。
              ズレているのは、誰かが知っている前提や見落としているリスクのサインです。
              そこを言葉にする会話こそ、ポーカー本来の価値です。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="プランニングポーカーで見積もりが大きく割れたとき、まずすべきことは？"
              options={[
                { label: "全員の数字を平均して切り上げる" },
                {
                  label:
                    "最大・最小を出した人に理由を説明してもらい、前提のズレを共有する",
                  correct: true,
                },
                { label: "リーダーの数字に全員を合わせる" },
                { label: "そのストーリーを見積もり対象から外す" },
              ]}
              explanation="数字のズレは、誰かだけが知っている前提や見落としているリスクのサインです。最大・最小の根拠を共有することで認識が揃い、見積もりの精度が上がります。平均やトップダウンでの統一は、この貴重な情報を捨ててしまいます。"
            />
          </section>

          {/* スケール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              フィボナッチ・T シャツサイズ：刻みの選び方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ポイントの刻みには、わざと「飛び飛びの数列」を使います。 1, 2, 3,
              4, 5… と連続させると「3 か 4 か」で延々と迷ってしまうためです。
              大きい項目ほど不確実性が増すので、間隔を広げて
              <strong>大きい側を粗く扱う</strong>のが理にかなっています。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scaleItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {item.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {item.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ベロシティ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ベロシティで先を予測する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ベロシティは、1 スプリントでチームが完了させたポイントの合計です。
              これを数スプリント分ためると平均が見えてきて、 「残りのポイント ÷
              平均ベロシティ」で、おおよその完了時期を予測できます。
              ベロシティはチームごとの実測値なので、
              <strong>他チームと数字を比べる意味はありません</strong>。
            </p>

            <CodeBlock
              language="bash"
              title="ベロシティから完了時期を見積もる例"
              code={`# 直近 4 スプリントの完了ポイント
スプリント1: 18
スプリント2: 22
スプリント3: 20
スプリント4: 20
平均ベロシティ = (18 + 22 + 20 + 20) / 4 = 20

# 残りバックログが 120 ポイントなら
120 / 20 = 6 スプリント分が目安
# ※ 点ではなく「だいたい 5〜7 スプリント」と幅で語る`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              注意したいのは、これが約束ではなく<strong>予測</strong>
              だという点です。
              新しいメンバーの加入や割り込みでベロシティは変動します。
              だからこそ「6 スプリントで完了」と断言するより、
              幅を持たせて伝える方が誠実で、後の信頼にもつながります。
            </p>

            <div className="mt-8">
              <CodingChallenge
                preview
                previewType="markdown"
                title="ベロシティ（完了ポイントの合計）を計算しよう"
                description="あるスプリントで完了したストーリーのポイントを合計して、このスプリントのベロシティを求めてください。___ を計算結果に置き換えます。"
                initialCode={`# スプリント 5 の完了ストーリー

- ログイン改善: 3 ポイント
- 検索フィルタ: 5 ポイント
- 通知設定: 2 ポイント
- 再注文ボタン: 8 ポイント

# 未完了（カウントしない）
- 決済リファクタ: 5 ポイント（次スプリントへ持ち越し）

このスプリントのベロシティ = 3 + 5 + 2 + 8 = ___ ポイント`}
                answer={`# スプリント 5 の完了ストーリー

- ログイン改善: 3 ポイント
- 検索フィルタ: 5 ポイント
- 通知設定: 2 ポイント
- 再注文ボタン: 8 ポイント

# 未完了（カウントしない）
- 決済リファクタ: 5 ポイント（次スプリントへ持ち越し）

このスプリントのベロシティ = 3 + 5 + 2 + 8 = 18 ポイント`}
                hints={[
                  "ベロシティは完了したストーリーのポイントだけを合計する（持ち越しは含めない）",
                ]}
                keywords={["18"]}
              />
            </div>
          </section>

          {/* 不確実性のコーン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              不確実性のコーン
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「不確実性のコーン」は、プロジェクトの初期ほど見積もりの誤差が大きく、
              進むにつれて誤差が収束していく様子を表した考え方です。
              まだ何も分かっていない最初の段階では、見積もりが実際の数倍ぶれることもあります。
              これは見積もりが下手なのではなく、
              <strong>情報が足りない段階では当然に起きること</strong>です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  初期（情報が少ない）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  誤差は大きい。点ではなく広い幅で語り、細かい約束は避ける。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  中盤（学びが進む）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  実績が出て幅が狭まる。ベロシティをもとに予測を更新する。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  終盤（情報が揃う）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  残りが見え、誤差が収束。見積もりの幅が現実的に狭くなる。
                </p>
              </div>
            </div>
          </section>

          {/* 落とし穴 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              見積もりの落とし穴：コミットメントと混同しない
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              最大の落とし穴は、見積もりを
              <strong>約束（コミットメント）</strong>
              として扱ってしまうことです。
              見積もりは「現時点の情報での予測」であり、達成を保証する契約ではありません。
              ここを混同すると、見積もりが守れなかったときに人を責める空気が生まれ、
              次からは大きめに盛った見積もりが出てきます。結果として予測の精度はかえって落ちます。
            </p>

            <InfoBox type="error" title="ポイントを成果指標にしない">
              ベロシティを「もっと上げろ」という目標にすると、メンバーは見積もりを水増しします。
              数字は簡単に増えますが、実際に作る価値は増えません。
              ポイントはチーム内の計画用の道具であり、評価や競争の指標として使わないのが鉄則です。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="ストーリーポイントとベロシティの正しい使い方はどれ？"
              options={[
                { label: "他チームとベロシティを比べ、生産性を評価する" },
                {
                  label:
                    "チーム自身の実績から、残作業の完了時期を幅をもって予測する",
                  correct: true,
                },
                { label: "1 ポイント = 1 時間として工数を計算する" },
                { label: "個人ごとのポイント数で人事評価する" },
              ]}
              explanation="ポイントは相対的な大きさの単位で、時間への直接換算はしません。ベロシティはチーム固有の実測値なので、他チームとの比較や個人評価には使いません。正しい用途は、自チームの実績をもとに完了時期を幅をもって予測することです。"
            />
          </section>

          {/* Quiz 3 */}
          <section>
            <Quiz
              question="「不確実性のコーン」が示しているのはどんなこと？"
              options={[
                {
                  label: "見積もりが下手なチームほど誤差が大きいということ",
                },
                {
                  label:
                    "情報が少ない初期ほど誤差が大きく、進むにつれ収束していくこと",
                  correct: true,
                },
                { label: "ポイントは必ず時間に換算できるということ" },
                { label: "ベロシティはスプリントごとに必ず増えること" },
              ]}
              explanation="不確実性のコーンは、プロジェクト初期ほど情報が少なく見積もりの誤差が大きいこと、そして学びが進むにつれ誤差が収束することを表します。初期の大きな誤差は能力不足ではなく情報不足が原因なので、初期は点ではなく幅で語るのが適切です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Atlassian - Story Points and Estimation",
                  url: "https://www.atlassian.com/agile/project-management/estimation",
                  description:
                    "ストーリーポイントと相対見積もりの基本を平易に解説",
                },
                {
                  title: "Mountain Goat Software - Planning Poker",
                  url: "https://www.mountaingoatsoftware.com/agile/planning-poker",
                  description:
                    "プランニングポーカーの進め方と狙いをまとめた一次的な解説",
                },
                {
                  title: "Mountain Goat Software - Velocity",
                  url: "https://www.mountaingoatsoftware.com/blog/why-i-prefer-velocity-over-other-measures",
                  description: "ベロシティの考え方と、誤用しないための注意点",
                },
                {
                  title: "Wikipedia - Cone of Uncertainty",
                  url: "https://en.wikipedia.org/wiki/Cone_of_Uncertainty",
                  description: "不確実性のコーンの定義と背景を整理した参考資料",
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
