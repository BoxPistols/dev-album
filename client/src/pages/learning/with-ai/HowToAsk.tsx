import { Link } from "wouter";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import PageToc from "@/components/PageToc";

const LEVELS: { name: string; ask: string; use: string }[] = [
  {
    name: "ELI5（5 歳児に説明するように）",
    ask: "専門用語を使わず、たとえ話で説明してください",
    use: "初めて聞く概念。全体像の当たりをつけたいとき",
  },
  {
    name: "入門者向け",
    ask: "前提知識は HTML と CSS だけとして説明してください",
    use: "自分が持っている知識の上に積みたいとき",
  },
  {
    name: "同僚向け",
    ask: "同じ分野の開発者に説明する粒度で。用語は正確に使ってください",
    use: "だいたい分かっていて、抜けを埋めたいとき",
  },
  {
    name: "仕様レベル",
    ask: "仕様書の記述に沿って、例外条件も含めて説明してください",
    use: "実装の根拠が要るとき。ここでは出典も一緒に求める",
  },
];

export default function HowToAsk() {
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
            AI への聞き方
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            回答の質は、質問に何が入っているかで決まります。
            変えるところは 4 つだけです。
          </p>
        </div>

        <PageToc
          items={[
            { id: "premise", label: "前提を渡す" },
            { id: "level", label: "説明のレベルを指定する" },
            { id: "source", label: "出典を要求する" },
            { id: "refute", label: "反証させる" },
            { id: "loop", label: "1 往復で終わらせない" },
          ]}
        />

        <div className="space-y-12 mt-8">
          <section>
            <h2 id="premise" className="text-3xl font-bold mb-6 scroll-mt-24">
              前提を渡す
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              同じ質問でも、環境と目的が書いてあるかどうかで回答が変わります。
              AI は書いていないことを埋めるとき、
              <strong>もっとも一般的な状況を仮定します</strong>。それが自分の状況と
              違えば、正しい答えが返ってきても役に立ちません。
            </p>
            <CodeBlock
              language="text"
              title="同じ疑問を、前提つきで聞く"
              code={`# 前提なし
テストが遅いのですが、どうすればいいですか

# 前提つき
Vitest でユニットテストが 300 件、実行に 90 秒かかっています。
Node 24 / pnpm / CI は GitHub Actions の ubuntu-latest。
うち 200 件は DOM を使わない純関数のテストです。
何を測れば、どこが遅いか特定できますか。`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              最後の 1 行にも注目してください。
              <strong>「どうすればいいか」ではなく「何を測ればよいか」</strong>を聞いています。
              いきなり解決策を求めると、当てずっぽうの改善案が並びます。
            </p>
          </section>

          <section>
            <h2 id="level" className="text-3xl font-bold mb-6 scroll-mt-24">
              説明のレベルを指定する
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              説明の粒度は、指定しなければ相手が勝手に決めます。
              指定する言い方を持っておくと、読み直しの手間が減ります。
              よく使われるのが <strong>ELI5</strong>（Explain Like I&apos;m 5 の略。
              5 歳児にするように説明して、という意味の言い回し）です。
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm min-w-[44rem]">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">レベル</th>
                    <th className="text-left p-3 font-semibold">頼み方</th>
                    <th className="text-left p-3 font-semibold">向いている場面</th>
                  </tr>
                </thead>
                <tbody>
                  {LEVELS.map((l) => (
                    <tr key={l.name} className="border-t border-border">
                      <td className="p-3 font-medium">{l.name}</td>
                      <td className="p-3 text-muted-foreground">{l.ask}</td>
                      <td className="p-3 text-muted-foreground">{l.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <InfoBox type="info" title="レベルを上げ下げして 2 回聞く">
                ELI5 で全体像を掴んでから、同じ話題を仕様レベルで聞き直すと、
                たとえ話がどこまで正確だったかがわかります。
                <strong>たとえ話は必ずどこかで破綻します</strong>。その境目を知ることが、
                概念を掴むうえでいちばん役に立ちます。
              </InfoBox>
            </div>
          </section>

          <section>
            <h2 id="source" className="text-3xl font-bold mb-6 scroll-mt-24">
              出典を要求する
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              事実を尋ねるときは、答えと一緒に
              <strong>どこに書いてあるか</strong>を求めます。出典があれば自分で検算でき、
              出典が出せない部分は「推測」だと分かります。
            </p>
            <CodeBlock
              language="text"
              title="出典を求める言い方"
              code={`公式ドキュメントの URL を添えてください。
公式に記載が見つからない項目は「未確認」と明記して、推測と分けてください。
バージョンによって挙動が違う場合は、どの版の話かを書いてください。`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              返ってきた URL は<strong>開いて確かめます</strong>。URL の形をしていても
              実在しないことがあります。これは次のページで詳しく扱います。
            </p>
          </section>

          <section>
            <h2 id="refute" className="text-3xl font-bold mb-6 scroll-mt-24">
              反証させる
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              肯定的に尋ねると、肯定的な答えが返りやすくなります。
              自分の案を確かめたいときは、<strong>支持ではなく反証を頼みます</strong>。
            </p>
            <CodeBlock
              language="text"
              title="同じ案について、2 通りの聞き方"
              code={`# 賛成が返りやすい
この設計で問題ないでしょうか

# 弱点が出やすい
この設計が破綻する条件を 3 つ挙げてください。
そのうち実際に起こりやすいものはどれで、根拠は何ですか。`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              同じ手は自分の理解にも使えます。
              「私はこう理解しました。間違っている箇所を指摘してください」と
              自分の言葉で書いて渡すと、
              <strong>説明できるかどうかの検査</strong>を同時に済ませられます。
            </p>
          </section>

          <section>
            <h2 id="loop" className="text-3xl font-bold mb-6 scroll-mt-24">
              1 往復で終わらせない
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              最初の回答は当たりをつけるためのものです。そこから絞り込みます。
              有効な返しは決まっています。
            </p>
            <ul className="space-y-2 leading-relaxed text-muted-foreground list-disc pl-5">
              <li>「その 3 番目だけ、もっと詳しく」</li>
              <li>「いま話しているのはどの版の挙動ですか」</li>
              <li>「それを手元で確かめる最短の手順を書いてください」</li>
              <li>「別のやり方があるなら、それと比べたときの短所は何ですか」</li>
            </ul>
            <p className="leading-relaxed mt-4 text-muted-foreground">
              3 番目が特に効きます。確かめる手順まで出させると、
              <strong>会話が検証可能な作業に変わります</strong>。
            </p>
            <div className="mt-6">
              <InfoBox type="info" title="コードを書かせる場面での使い分け">
                エージェントに実際の変更をさせるときの進め方は、
                <Link
                  href="/claude-code/claude-core/explore-plan-code-commit"
                  className="text-primary underline underline-offset-2 mx-1"
                >
                  探索 → 計画 → コード → コミット
                </Link>
                で扱っています。このページは、自分が理解するために聞く場面の話です。
              </InfoBox>
            </div>
          </section>
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
