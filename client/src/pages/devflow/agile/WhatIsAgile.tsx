import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const values = [
  {
    left: "プロセスやツール",
    right: "個人と対話",
    description:
      "良いツールやプロセスは助けになるが、最終的に価値を生むのは人と人のやり取り。手順より会話を優先する。",
  },
  {
    left: "包括的なドキュメント",
    right: "動くソフトウェア",
    description:
      "分厚い仕様書より、実際に動いて触れるものを早く出す。動くものが議論と意思決定の土台になる。",
  },
  {
    left: "契約交渉",
    right: "顧客との協調",
    description:
      "契約で縛り合うより、顧客と同じ側に立って一緒に課題を解く。要求は固定せず一緒に育てる。",
  },
  {
    left: "計画に従うこと",
    right: "変化への対応",
    description:
      "計画は重要だが、計画通りに進めること自体が目的ではない。学びに応じて計画を更新していく。",
  },
];

const misconceptions = [
  {
    myth: "アジャイル = 無計画",
    truth:
      "計画はする。ただし一度立てた計画に固執せず、スプリントごとに見直し続ける。「計画より計画する行為」を重視する。",
  },
  {
    myth: "アジャイル = ドキュメント不要",
    truth:
      "ドキュメントは書く。優先順位が「包括的なドキュメントより動くソフトウェア」なだけで、必要なドキュメントは残す。",
  },
  {
    myth: "アジャイル = 速く作ること",
    truth:
      "スピードそのものではなく、変化に対応しながら価値を継続的に届けることが目的。短サイクルは手段にすぎない。",
  },
];

export default function WhatIsAgile() {
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
            アジャイルとは
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            アジャイルは特定の手法の名前ではなく、ソフトウェア開発の進め方に対する
            <strong>価値観と原則</strong>のことです。 このページでは 2001
            年のアジャイルソフトウェア開発宣言に立ち返り、 4 つの価値と 12
            の原則、ウォーターフォールとの違い、そしてよくある誤解を一通り整理します。
          </p>
        </div>

        <WhyNowBox tags={["アジャイル", "宣言", "反復", "価値観", "原則"]}>
          <p>
            「うちはアジャイルでやってます」という言葉は現場でよく聞きますが、
            その中身は人によってかなり違います。デイリーミーティングをしているだけのチームもあれば、
            宣言の価値観まで腹落ちしているチームもあります。
            ツールや儀式から入ると形だけのアジャイルになりがちなので、 まず
            <strong>何を大事にする考え方なのか</strong>
            という出発点を押さえておくと、
            スクラムやカンバンといった具体的な手法の意味が後から繋がって理解できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* アジャイル宣言 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              アジャイルソフトウェア開発宣言の 4 つの価値
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              2001 年に 17
              人の技術者が集まり、軽量な開発手法の共通点をまとめたのが
              「アジャイルソフトウェア開発宣言」です。宣言は 4
              つの価値からなり、 いずれも<strong>「左より右を重視する」</strong>
              という形で書かれています。
              ここで大事なのは、左側に価値がないとは言っていない点です。
              どちらも価値があるが、より重きを置くのは右側だ、という相対的な優先順位を示しています。
            </p>

            <div className="space-y-3">
              {values.map((v) => (
                <div
                  key={v.right}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2 text-sm">
                    <span className="text-muted-foreground line-through">
                      {v.left}
                    </span>
                    <span className="text-muted-foreground">よりも</span>
                    <span className="font-bold text-primary">{v.right}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="「左に価値がない」わけではない">
              宣言の末尾には「左記のことがらに価値があることを認めながらも、私たちは右記のことがらにより価値をおく」と明記されています。
              ドキュメントも計画も契約も必要です。優先順位の話だと理解しておくと、
              「アジャイルだからドキュメントを書かなくていい」という極端な解釈を避けられます。
            </InfoBox>
          </section>

          {/* 12 原則 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              背後にある 12 の原則
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              宣言には 4 つの価値を支える 12 の原則が添えられています。
              全部を暗記する必要はありませんが、貫いているテーマを掴んでおくと実践に活きます。
              要点をいくつか挙げます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  早く継続的に届ける
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  価値あるソフトウェアを早期から継続的にリリースし、顧客満足を最優先にする。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  変化を歓迎する
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  開発の後半であっても要求の変更を受け入れ、変化を顧客の競争優位に変える。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  動くものが進捗の尺度
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  動くソフトウェアこそが進捗を測る最も確かな指標。資料の量では測らない。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  対面・対話を重視
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  情報を伝える最も効率的な方法は、顔を合わせた会話。チームと顧客が日々協働する。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  持続可能なペース
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  開発者が一定のペースを保ち続けられるようにする。一時的な無理に頼らない。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  ふりかえって調整する
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  定期的に自分たちのやり方を見直し、より効果的になるよう振る舞いを調整する。
                </p>
              </div>
            </div>
          </section>

          {/* ウォーターフォールとの対比 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ウォーターフォールとの対比
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              アジャイルは、要件定義・設計・実装・テストを一直線に進める
              ウォーターフォール型開発への問題意識から生まれました。
              ウォーターフォールが悪い手法というわけではなく、要件が固まっていて変化が少ない領域では有効です。
              一方で、要求が動きやすいソフトウェア開発では、後戻りのコストが大きくなりがちです。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="text-left p-3 border-b border-border font-bold">
                      観点
                    </th>
                    <th className="text-left p-3 border-b border-border font-bold">
                      ウォーターフォール
                    </th>
                    <th className="text-left p-3 border-b border-border font-bold">
                      アジャイル
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      進め方
                    </td>
                    <td className="p-3 border-b border-border">
                      工程を順に一度ずつ通す
                    </td>
                    <td className="p-3 border-b border-border">
                      短いサイクルを反復する
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      要求の扱い
                    </td>
                    <td className="p-3 border-b border-border">
                      最初に固定する前提
                    </td>
                    <td className="p-3 border-b border-border">
                      途中の変更を歓迎する
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      動くものを見る時期
                    </td>
                    <td className="p-3 border-b border-border">
                      終盤にまとめて
                    </td>
                    <td className="p-3 border-b border-border">
                      毎サイクルの終わりに
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      リスクの表面化
                    </td>
                    <td className="p-3 border-b border-border">
                      終盤に集中しやすい
                    </td>
                    <td className="p-3 border-b border-border">
                      早期に小刻みに分散
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      向いている状況
                    </td>
                    <td className="p-3">要件が安定し変化が少ない</td>
                    <td className="p-3">要求が動き不確実性が高い</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="アジャイルソフトウェア開発宣言の「4 つの価値」の正しい捉え方はどれ？"
              options={[
                {
                  label:
                    "左側（プロセス・ドキュメント等）には価値がないと宣言している",
                },
                {
                  label:
                    "左右どちらにも価値があると認めたうえで、右側により重きを置くという優先順位を示している",
                  correct: true,
                },
                { label: "ドキュメントと計画を完全に禁止している" },
                { label: "ツールの選定を最優先せよという主張である" },
              ]}
              explanation="宣言は「左記のことがらに価値があることを認めながらも、右記のことがらにより価値をおく」と明記しています。左を否定するのではなく、相対的な優先順位を示したものです。"
            />
          </section>

          {/* 反復・漸進的デリバリー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              反復的・漸進的にデリバリーする
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              アジャイルを支える実装上の核が、反復（iterative）と漸進（incremental）です。
              反復とは、同じ対象を短いサイクルで何度も作り直して磨き込むこと。
              漸進とは、機能を少しずつ積み上げて全体を育てていくことです。 この
              2
              つを組み合わせると、毎サイクルの終わりに「動いて触れるもの」が手に入り、
              フィードバックを早く受け取れます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  反復 (Iterative)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ラフな試作を作り、フィードバックを受けて作り直す。少しずつ精度を上げていくアプローチ。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  漸進 (Incremental)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  完成済みの部品を一つずつ足していく。各増分はそれ自体で価値を持つ完成された機能になる。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              早く動くものを出すと、要求の認識ズレや使い勝手の問題を早期に発見できます。
              終盤にまとめて確認する進め方では、ズレが積み重なってから露見しますが、
              短いサイクルなら一回あたりのズレが小さく、修正コストも抑えられます。
            </p>
          </section>

          {/* よくある誤解 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              よくある誤解
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              アジャイルは言葉が独り歩きしやすく、極端な解釈をされがちです。
              代表的な誤解と、宣言に立ち返ったときの実際の意味を並べておきます。
            </p>

            <div className="space-y-3">
              {misconceptions.map((m) => (
                <div
                  key={m.myth}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <p className="font-bold text-foreground mb-1 text-sm">
                    誤解: {m.myth}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {m.truth}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="warning" title="儀式だけ真似ると形骸化する">
              デイリーミーティングやスプリントといった「型」だけを導入し、
              価値観や原則を置き去りにすると、会議が増えただけで変化に対応できないチームになりがちです。
              手法を入れる前に、何のためにそれをやるのかを宣言に立ち返って確認すると、形骸化を避けやすくなります。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="「アジャイル = 無計画」という理解が誤りである理由として最も適切なのは？"
              options={[
                { label: "アジャイルでは計画を立てること自体が禁止だから" },
                {
                  label:
                    "計画は立てるが、それに固執せず学びに応じて見直し続ける点が本質だから",
                  correct: true,
                },
                { label: "アジャイルでは見積もりをしてはいけないから" },
                { label: "計画を立てるとスプリントが回らなくなるから" },
              ]}
              explanation="アジャイルは計画を否定しません。一度立てた計画に固執せず、スプリントごとに見直し更新し続けることを重視します。「計画」より「計画する行為（学びへの適応）」に価値を置く、と捉えると正確です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "アジャイルソフトウェア開発宣言（日本語）",
                  url: "https://agilemanifesto.org/iso/ja/manifesto.html",
                  description:
                    "4 つの価値を記した宣言の公式日本語訳。原典に一度は目を通しておきたい",
                },
                {
                  title: "アジャイル宣言の背後にある原則（日本語）",
                  url: "https://agilemanifesto.org/iso/ja/principles.html",
                  description: "宣言を支える 12 の原則の公式日本語訳",
                },
                {
                  title: "Atlassian - Agile とは",
                  url: "https://www.atlassian.com/ja/agile",
                  description:
                    "アジャイル・スクラム・カンバンを実務目線で解説したガイド集",
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
