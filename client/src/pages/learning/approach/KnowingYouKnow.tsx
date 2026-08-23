import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const CHECKS: { title: string; question: string; fail: string; fix: string }[] = [
  {
    title: "説明できるか",
    question:
      "その技術を知らない人に、たとえ話を使わずに 3 分で説明できるか。専門用語を使うたびに、その語も説明できるか",
    fail: "説明が「〜みたいなもの」で終わる。用語を別の用語で言い換えている",
    fix: "公式ドキュメントの該当箇所に戻り、定義そのものを読む",
  },
  {
    title: "再現できるか",
    question:
      "手元の環境を一度まっさらにして、メモを見ずに同じ状態まで戻せるか",
    fail: "どこかで手が止まる。前回どう解決したか思い出せない",
    fix: "その箇所だけ手順を書き出す。書けない箇所が、理解が飛んでいる箇所",
  },
  {
    title: "予測できるか",
    question:
      "「ここをこう変えたらこうなる」を先に言ってから実行し、当たるか",
    fail: "実行してみないとわからない。結果を見てから理由を作っている",
    fix: "外れた予測を 1 つ選び、なぜ外れたかを調べる。ここが一番伸びる",
  },
];

export default function KnowingYouKnow() {
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
            「わかったつもり」を見つける
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            読んで納得した状態と、使える状態は別です。自分で判定する方法があります。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold mb-6">読めた気がする理由</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              解説を読んでいるあいだは、書き手が組み立てた順序に乗っているので
              話がつながって見えます。この「つながって見える」は理解ではなく、
              <strong>その文章を読めたという事実</strong>です。自分で順序を組み立てる
              段になると別の作業になります。
            </p>
            <p className="leading-relaxed text-muted-foreground">
              差を埋める前に、まず差があるかを測ります。次の 3 つで判定できます。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">3 つの自己検査</h2>
            <div className="space-y-4">
              {CHECKS.map((c, i) => (
                <div
                  key={c.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-xs font-bold text-primary tabular-nums">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-bold">{c.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-3">{c.question}</p>
                  <dl className="text-sm space-y-1.5">
                    <div className="flex gap-2">
                      <dt className="shrink-0 w-24 text-muted-foreground">
                        通らない印
                      </dt>
                      <dd className="text-muted-foreground">{c.fail}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0 w-24 text-muted-foreground">次の一手</dt>
                      <dd className="text-muted-foreground">{c.fix}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">
              予測を先に書くと、外れたことが残る
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              3 つのうち一番効くのは予測です。実行する前に結果を書いておくと、
              外れたときに<strong>自分の理解のどこがずれていたかが記録として残ります</strong>。
              結果を見てから理由を考えると、この情報は残りません。
            </p>
            <CodeBlock
              language="markdown"
              title="実行前に 2 行書くだけでよい"
              code={`## 試すこと
useEffect の依存配列を空にする

## 予測
マウント時に 1 回だけ走る

## 実際
開発環境では 2 回走った

## 差の原因
React の Strict Mode が意図的に 2 回呼んでいる。
仕様は「レンダー後に実行」で、回数は環境で変わる。`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              この形にしておくと、後から読み返したときに
              「何を誤解していたか」がそのまま読めます。正解だけ書いたメモは、
              半年後に読んでも当たり前のことしか書いていません。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">仕様と実測がずれる場所を疑う</h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              予測が外れる箇所には偏りがあります。多くは
              <strong>仕様で決まっている値と、実際の環境で観測される値がずれる場所</strong>
              です。ここを知っていると、外れる前に身構えられます。
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm min-w-[44rem]">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">仕様の言い分</th>
                    <th className="text-left p-3 font-semibold">実測で起きること</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["CSS の 100vh はビューポートの高さ", "iOS Safari ではアドレスバーを含む。100dvh が現代の解"],
                    ["semver の ^1.2.3 は 1.2.3 以上 2.0.0 未満を許容する", "実際に入るのは lockfile が固定した 1 つのバージョン"],
                    ["useEffect はレンダー後に実行される", "開発時の Strict Mode では 2 回走る"],
                    ["requestAnimationFrame は毎フレーム呼ばれる", "タブが非アクティブだと止まる。60fps は保証ではない"],
                  ].map(([a, b]) => (
                    <tr key={a} className="border-t border-border">
                      <td className="p-3">{a}</td>
                      <td className="p-3 text-muted-foreground">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <InfoBox type="info" title="ずれていても、自分のせいではない">
                こうしたずれは環境の側の事情で、読み違えたわけではありません。
                <strong>「仕様では X、実測では Y。理由は Z」</strong>の形でメモに残すと、
                同じ驚きを繰り返さずに済みます。
              </InfoBox>
            </div>
          </section>
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
