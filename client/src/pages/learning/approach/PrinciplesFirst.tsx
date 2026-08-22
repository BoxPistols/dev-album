import { Link } from "wouter";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

/** 変わる層と変わらない層の対応。左が原理、右がその時々の実装 */
const LAYERS: [string, string, string][] = [
  [
    "HTTP のメソッドと状態コード",
    "fetch / axios / ky、その時々のクライアント",
    "道具が変わっても、GET が安全で PUT が冪等という取り決めは変わらない",
  ],
  [
    "リレーショナルモデルと正規化",
    "MySQL / PostgreSQL / SQLite、ORM の書き方",
    "テーブル設計の良し悪しの基準は製品を跨いで同じ",
  ],
  [
    "参照透過と副作用の分離",
    "React の hooks、Vue の composables",
    "「副作用をどこに置くか」はフレームワークが変わっても同じ問い",
  ],
  [
    "ボックスモデルと包含ブロック",
    "Flexbox / Grid / Tailwind のクラス名",
    "レイアウトが崩れる理由は、たいてい記法ではなく包含関係にある",
  ],
  [
    "トークン化とコンテキスト長",
    "各モデルの名前、価格、上限値",
    "モデルは頻繁に入れ替わるが、入力が有限だという制約は残る",
  ],
];

export default function PrinciplesFirst() {
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
            原理原則から入る
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            覚えることを減らす方法は、覚える量を分けることです。
            数年で変わるものと、ほとんど変わらないもの。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold mb-6">2 つの層に分けて置く</h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              新しい技術を学ぶとき、覚える対象は 2 種類あります。
              <strong>その製品固有の書き方</strong>と、
              <strong>その下にある取り決めや仕組み</strong>です。前者は数年で入れ替わり、
              後者は長く残ります。時間の配分を変えると、次の領域に移ったときの
              持ち越しが増えます。
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm min-w-[50rem]">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">長く残る層</th>
                    <th className="text-left p-3 font-semibold">入れ替わる層</th>
                    <th className="text-left p-3 font-semibold">持ち越せること</th>
                  </tr>
                </thead>
                <tbody>
                  {LAYERS.map(([a, b, c]) => (
                    <tr key={a} className="border-t border-border">
                      <td className="p-3 font-medium">{a}</td>
                      <td className="p-3 text-muted-foreground">{b}</td>
                      <td className="p-3 text-muted-foreground">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">どちらの層かを見分ける</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              分類に迷ったら、次の問いで判定できます。
            </p>
            <ul className="space-y-3 leading-relaxed text-muted-foreground list-disc pl-5">
              <li>
                <strong>10 年前にも存在したか。</strong> 名前が変わっていても
                同じ考え方があったなら、長く残る層です
              </li>
              <li>
                <strong>競合製品にも同じ概念があるか。</strong> あるなら、
                それは製品固有ではなく分野の共有物です
              </li>
              <li>
                <strong>仕様書や RFC があるか。</strong> 標準化されているものは、
                実装より寿命が長い
              </li>
            </ul>
            <div className="mt-6">
              <InfoBox type="info" title="バージョン番号が付くものは入れ替わる層">
                「React 19 の」「Next.js 15 の」と書ける知識は、そのバージョンと
                寿命を共にします。役に立たないという意味ではなく、
                <strong>そこに置いた時間は持ち越せない</strong>という意味です。
              </InfoBox>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">原理から入ると何が変わるか</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              具体例で見ます。CSS でレイアウトが崩れたとき、
              入れ替わる層だけを持っている場合と、下の層も持っている場合で、
              取れる手が変わります。
            </p>
            <CodeBlock
              language="text"
              title="同じ症状に対する 2 通りの反応"
              code={`症状: 子要素が親からはみ出す

書き方だけ知っている場合
  overflow-hidden を足す → 収まった → なぜ収まったかは不明
  別の場所で同じことが起きても、また試行錯誤になる

包含ブロックを知っている場合
  「この子の幅は誰を基準に決まっているか」を先に確かめる
  → 基準が想定と違う → 基準側を直す
  → 同じ理由の崩れを、次からは見ただけで当てられる`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              前者が悪いわけではありません。締切のある場面では正しい判断です。
              ただ、前者だけを積み上げても<strong>次に速くなりません</strong>。
              後で同じ問題に当たったときに効くのは後者のほうです。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">
              ただし、原理から入ると動き始めが遅い
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              仕様書から読み始めると、最初の 1 つが動くまでに時間がかかります。
              実務では、先に動かしてから原理に戻るほうが合っている場面が多くあります。
            </p>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              現実的な順序はこうです。
              <strong>動かす → 動いた理由を 1 段だけ下に降りて確かめる → 次へ進む。</strong>
              全部を下まで降りる必要はありません。降りる癖があるかどうかで、
              半年後の差が出ます。
            </p>
            <div className="mt-6">
              <InfoBox type="info" title="降りる先の見つけ方">
                公式ドキュメントの本文にリンクされている仕様書や RFC が、
                だいたい 1 段下の層です。
                <Link
                  href="/learning/sources/primary-sources"
                  className="text-primary underline underline-offset-2 mx-1"
                >
                  一次情報の見分け方
                </Link>
                で、その辿り方を扱います。
              </InfoBox>
            </div>
          </section>
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
