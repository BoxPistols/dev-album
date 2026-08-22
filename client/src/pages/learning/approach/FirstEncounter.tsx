import { Link } from "wouter";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import StepHeading from "@/components/StepHeading";
import PageToc from "@/components/PageToc";

export default function FirstEncounter() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            初めての領域に入る手順
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            全体像から入って、最小の実行まで下りる。順序を決めておくと、
            どこで止まっているかが自分でわかります。
          </p>
        </div>

        <PageToc
          items={[
            { id: "overview", label: "全体像をつかむ", step: 1 },
            { id: "vocabulary", label: "用語を 10 個だけ拾う", step: 2 },
            { id: "smallest", label: "動く最小のものを 1 つ通す", step: 3 },
            { id: "diff", label: "うまくいかない箇所を切り分ける", step: 4 },
            { id: "order", label: "順序を守る理由" },
          ]}
        />

        <div className="space-y-12 mt-8">
          <section>
            <StepHeading step={1} id="overview" title="全体像をつかむ" />
            <p className="leading-relaxed mb-4 text-muted-foreground">
              最初に読むのは、その技術の<strong>公式サイトのトップページと
              「はじめに」にあたる 1 ページだけ</strong>です。目的は、それが何を解決する
              道具なのかと、周辺に何があるのかを掴むことです。細部は読み飛ばします。
            </p>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              このとき答えを出しておきたい問いは 3 つです。
            </p>
            <ul className="space-y-2 leading-relaxed text-muted-foreground list-disc pl-5">
              <li>これは何の問題を解決する道具か</li>
              <li>これを使わない場合、代わりに何を使うか</li>
              <li>これは何の上に乗っているか（前提となる技術）</li>
            </ul>
            <div className="mt-6">
              <InfoBox type="info" title="ここで検索結果の記事から入らない">
                検索上位に出る解説記事は、書かれた時点のバージョンで止まっています。
                全体像を掴む段階でずれた前提が入ると、後の判断が全部ずれます。
                公式が読みにくい場合でも、まず公式の目次だけは見ておきます。
              </InfoBox>
            </div>
          </section>

          <section>
            <StepHeading step={2} id="vocabulary" title="用語を 10 個だけ拾う" />
            <p className="leading-relaxed mb-4 text-muted-foreground">
              新しい領域が読めない原因の多くは、概念が難しいからではなく、
              <strong>その分野だけで通じる言葉を知らない</strong>ことです。公式ドキュメントの
              目次と最初のページに繰り返し出てくる語を、10 個くらい書き出します。
            </p>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              このとき、辞書的な定義を写すのではなく、
              <strong>「この分野ではこう使う」という 1 行</strong>で書きます。
              自分の言葉にならないものは、まだ掴めていない印です。
            </p>
            <CodeBlock
              language="markdown"
              title="用語メモの例（Git を初めて触るとき）"
              code={`- リポジトリ: 変更の履歴ごと保存してある作業フォルダ
- コミット: ある時点の状態に名前と説明をつけて記録すること
- ブランチ: 履歴を枝分かれさせて、本流を壊さずに試すための線
- マージ: 枝分かれした変更を本流に合流させること
- リモート: 手元とは別の場所にある同じリポジトリ（GitHub 等）
- push / pull: 手元の記録を送る / 向こうの記録を取り込む`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              10 個で足りるのかと思うかもしれませんが、この段階では足ります。
              残りは実際に触ったときに必要になった順で増えます。
            </p>
          </section>

          <section>
            <StepHeading step={3} id="smallest" title="動く最小のものを 1 つ通す" />
            <p className="leading-relaxed mb-4 text-muted-foreground">
              公式のクイックスタートを、<strong>省略せずそのまま</strong>最後まで実行します。
              自分の環境に合わせて手順を変えたくなりますが、最初の 1 回は変えません。
              変えると、失敗したときに手順の問題か環境の問題か分けられなくなります。
            </p>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              通ったら、<strong>1 箇所だけ変えて壊してみます</strong>。値を変える、行を消す、
              名前を間違える。壊れ方を見ると、その部分が何を担当していたかがわかります。
              これは読むだけでは手に入らない情報です。
            </p>
            <div className="mt-6">
              <InfoBox type="info" title="期待する出力を先に決めておく">
                「これが出れば成功」を実行前に書いておくと、成功と失敗の境目が
                自分で判定できます。書けないなら、まだ何を試しているのかが
                固まっていない状態です。
              </InfoBox>
            </div>
          </section>

          <section>
            <StepHeading step={4} id="diff" title="うまくいかない箇所を切り分ける" />
            <p className="leading-relaxed mb-4 text-muted-foreground">
              動かないときに全体を見直すと時間がかかります。
              <strong>動くとわかっている状態と、いま動かない状態の差を 1 つずつ減らす</strong>
              ほうが速く着きます。
            </p>
            <CodeBlock
              language="text"
              title="切り分けの型"
              code={`公式のサンプルそのまま     → 動く    ← ここが起点
  + 自分のデータに差し替え → 動く
  + 設定ファイルを追加     → 動かない  ← 原因はこの 1 手
  + 本番の構成にする       → （まだ試さない）`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              1 手ずつ足すのがこつです。2 つ同時に変えると、どちらが原因か決められず、
              結局もう一度やり直すことになります。
            </p>
            <p className="leading-relaxed mt-4 text-muted-foreground">
              詰まったときの手順は
              <Link
                href="/learning/habits/when-stuck"
                className="text-primary underline underline-offset-2 mx-1"
              >
                「詰まったときの手順」
              </Link>
              で詳しく扱います。
            </p>
          </section>

          <section>
            <h2 id="order" className="text-3xl font-bold mb-6 scroll-mt-24">
              順序を守る理由
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              この 4 つは、飛ばしても進めます。実際、多くの人はいきなり 3 から始めます。
              動けばそれで構いません。問題は動かなかったときで、1 と 2 を飛ばしていると、
              <strong>エラーメッセージが何の話をしているのかがわからない</strong>ため、
              切り分けの起点が作れません。
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm min-w-[34rem]">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">飛ばした段階</th>
                    <th className="text-left p-3 font-semibold">後から出てくる症状</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["全体像", "他の道具でやるべきことを、この道具で無理に解こうとする"],
                    ["用語", "エラーメッセージも検索結果も、読んでいるつもりで頭に入らない"],
                    ["最小の実行", "設定を直しても、直った実感が持てない"],
                    ["切り分け", "直った理由がわからないので、次に同じことが起きる"],
                  ].map(([a, b]) => (
                    <tr key={a} className="border-t border-border">
                      <td className="p-3 whitespace-nowrap font-medium">{a}</td>
                      <td className="p-3 text-muted-foreground">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
