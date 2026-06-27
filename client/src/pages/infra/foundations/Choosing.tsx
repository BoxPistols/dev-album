import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const renderingStrategies = [
  {
    title: "CSR",
    full: "Client-Side Rendering",
    description:
      "ブラウザで JavaScript を実行して画面を組み立てる。初回表示は遅めだが、操作の多いアプリに向く。管理画面やダッシュボードと相性が良い。",
  },
  {
    title: "SSR",
    full: "Server-Side Rendering",
    description:
      "リクエストごとにサーバーで HTML を生成して返す。最新データを反映でき、初回表示も速い。サーバーの実行コストはかかる。",
  },
  {
    title: "SSG",
    full: "Static Site Generation",
    description:
      "ビルド時に HTML を作り置きする。配信が速く安価で堅牢。更新頻度の低いページ（ブログ・ドキュメント）に向く。",
  },
  {
    title: "ISR",
    full: "Incremental Static Regeneration",
    description:
      "作り置きした静的ページを、一定間隔やアクセス契機で裏側で再生成する。SSG の速さと、ある程度の鮮度を両立させる。",
  },
];

export default function Choosing() {
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
            アーキテクチャの選択軸
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            レンダリング戦略やモノリスか分割か、といった構成の選択には、
            コスト・スケーラビリティ・運用負荷・レイテンシ・チームサイズという軸があります。
            「最強の構成」を探すのではなく、いまの状況に合う一手を選ぶための判断の物差しを作ります。
          </p>
        </div>

        <WhyNowBox tags={["アーキテクチャ", "SSR", "モノリス", "トレードオフ"]}>
          <p>
            技術選定は「正解」を当てるゲームに見えがちですが、実際はトレードオフの取捨選択です。
            速さを取ればコストが上がり、柔軟さを取れば運用が増えます。
            大事なのは、いまのチーム規模・トラフィック・更新頻度に対して
            「どの軸を優先するか」を言語化できることです。
            ここでは選択肢を並べ、何を犠牲に何を得るのかを試しながら整理します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* レンダリング戦略 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              レンダリング戦略 — CSR / SSR / SSG / ISR
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              フロントエンドの構成で最初に分かれるのが「HTML
              をいつ・どこで作るか」です。
              ページの性質（更新頻度・操作量・初回表示の重要度）によって、向く戦略が変わります。
              一つのアプリの中でページごとに使い分けることもできます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderingStrategies.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {s.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {s.full}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="混ぜて使うのが現代の標準">
              最近のフレームワークは、ページ単位でレンダリング方式を切り替えられます。
              トップページは SSG、商品ページは ISR、マイページは
              SSR、というように、
              ページの性質ごとに最適な方式を選ぶのが一般的です。
              「アプリ全体で一つ」と考えなくて構いません。
            </InfoBox>
          </section>

          {/* モノリス vs マイクロサービス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              モノリス vs マイクロサービス
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              バックエンドの構成は、一つのアプリにまとめる
              <strong>モノリス</strong>と、 機能ごとに独立したサービスに分ける
              <strong>マイクロサービス</strong>が両極です。
              モノリスは開発・デプロイ・デバッグが単純で、小〜中規模では生産性が高くなります。
              マイクロサービスは部分ごとの独立したスケールやデプロイができる反面、
              サービス間通信・分散トランザクション・監視といった複雑さが加わります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              実務では、まずモノリスで始め、ボトルネックが明確になった部分だけを切り出す、
              という進め方が無理がありません。最初から細かく分けると、
              得られる利点より運用の負担が先に来ることが多いからです。
            </p>

            <InfoBox type="warning" title="分割は「組織の都合」で増えやすい">
              マイクロサービスは技術的な必要より、チームを分けたい・独立してデプロイしたいという
              組織の都合で選ばれることがあります。それ自体は妥当な理由ですが、
              小さなチームで多数のサービスを持つと、運用と通信のコストが
              開発スピードを上回ることがあります。規模に見合っているかを都度確認します。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="更新頻度が低く、表示速度を最優先したいドキュメントサイトに最も向くのは？"
              options={[
                { label: "CSR" },
                { label: "SSR" },
                { label: "SSG", correct: true },
                { label: "リクエストごとのフル再生成" },
              ]}
              explanation="更新がまれで速さが重要なページは、ビルド時に HTML を作り置きする SSG が最適です。配信が速く、サーバーの実行コストもかからず、堅牢です。最新性が多少必要なら ISR で再生成の仕組みを足します。"
            />
          </section>

          {/* トレードオフ表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              トレードオフを軸で並べる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              構成の選択は、いくつかの軸の綱引きです。何を優先するかで答えが変わります。
              代表的な軸と、それぞれを重視したときに有利な方向を並べてみます。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-bold text-foreground">
                      軸
                    </th>
                    <th className="text-left py-3 pr-4 font-bold text-foreground">
                      重視すると有利な方向
                    </th>
                    <th className="text-left py-3 font-bold text-foreground">
                      代償になりやすいもの
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">コスト</td>
                    <td className="py-3 pr-4">SSG・サーバーレス・マネージド</td>
                    <td className="py-3">柔軟さ・最新性</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">スケーラビリティ</td>
                    <td className="py-3 pr-4">ステートレス・サービス分割</td>
                    <td className="py-3">構成の単純さ</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">運用負荷</td>
                    <td className="py-3 pr-4">モノリス・マネージド多用</td>
                    <td className="py-3">細かい最適化の余地</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">レイテンシ</td>
                    <td className="py-3 pr-4">エッジ・CDN・キャッシュ</td>
                    <td className="py-3">データの鮮度・実装の手間</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">チームサイズ</td>
                    <td className="py-3 pr-4">小さいほどモノリスが有利</td>
                    <td className="py-3">独立デプロイの自由度</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 判断フロー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              まず何を選ぶべきか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              判断に迷ったら、上から順に問いを当てていくと選択肢が絞れます。
              先に「いま必要なもの」を決め、将来必要になったら見直す、という前提で考えます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                <li>
                  <span className="text-foreground font-medium">
                    更新頻度は？
                  </span>{" "}
                  低ければ SSG、中程度なら ISR、常に最新なら SSR を軸に。
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    チームは小さい？
                  </span>{" "}
                  小さいならモノリス＋マネージドで運用を軽く保つ。
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    トラフィックは予測できる？
                  </span>{" "}
                  変動が激しいならサーバーレス、常時高負荷なら常駐サーバーを検討。
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    レイテンシは要件？
                  </span>{" "}
                  グローバルに速さが必要ならエッジ・CDN・キャッシュを足す。
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    本当に分割が必要？
                  </span>{" "}
                  ボトルネックが明確になるまでは分けない。
                </li>
              </ol>
            </div>

            <InfoBox type="success" title="デフォルトを一つ持っておく">
              毎回ゼロから比較するのは大変です。
              「小〜中規模なら、モノリス＋マネージド DB＋必要に応じて
              SSG/ISR」のような
              自分のデフォルト構成を一つ決めておき、要件が外れたときだけ
              意識的に変える、という運用にすると判断が速くなります。
            </InfoBox>
          </section>

          {/* オーバーエンジニアリング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              オーバーエンジニアリングを避ける
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              将来の負荷や要件を見越して、最初から大規模向けの構成を組みたくなることがあります。
              けれど、来るかどうか分からない負荷のために複雑さを先払いすると、
              いま必要な開発スピードを失います。多くのプロダクトは、想定したスケールに到達する前に
              方向転換や見直しを迎えます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              指針はシンプルです。
              <strong>
                いま必要な最小の構成から始め、
                実際にボトルネックが観測されてから手を入れる
              </strong>
              。
              そのためにも、後の章で扱う可観測性（どこが遅いかを測る仕組み）が効いてきます。
              推測で複雑さを足すより、計測してから足すほうが、結果的に無駄が減ります。
            </p>

            <InfoBox type="info" title="複雑さは「あとから足せる」">
              モノリスからサービスを切り出すことは、必要になったときにできます。
              逆に、最初から分散させた構成を後で一つに戻すのは大変です。
              「単純なほうから始めて、必要に応じて複雑にする」方向が、引き返しやすい選択です。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="小規模なチームで新しいプロダクトを始めるとき、推奨されやすい初手はどれ？"
              options={[
                { label: "最初から機能ごとにマイクロサービスへ分割する" },
                {
                  label:
                    "モノリスとマネージドサービスで始め、ボトルネックが見えたら切り出す",
                  correct: true,
                },
                {
                  label: "予測される最大負荷に合わせて大規模構成を先に用意する",
                },
                { label: "すべてを自前運用の常駐サーバーで構築する" },
              ]}
              explanation="小規模では、来るか分からない負荷のために複雑さを先払いすると開発スピードを失います。モノリス＋マネージドで単純に始め、実際にボトルネックが観測されてから必要な部分だけ切り出すほうが、引き返しやすく無駄が少なくなります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vercel - Rendering 戦略の概要",
                  url: "https://vercel.com/docs/frameworks/nextjs",
                  description:
                    "CSR/SSR/SSG/ISR の使い分けをフレームワーク視点で整理した公式ドキュメント",
                },
                {
                  title:
                    "MDN - クライアントサイドとサーバーサイドのレンダリング",
                  url: "https://developer.mozilla.org/ja/docs/Glossary/SSR",
                  description:
                    "レンダリング方式とパフォーマンスの関係を解説した中立的なリファレンス",
                },
                {
                  title: "AWS - マイクロサービスとは",
                  url: "https://aws.amazon.com/jp/microservices/",
                  description:
                    "モノリスとマイクロサービスの違いと適用条件をまとめた公式解説",
                },
                {
                  title: "Google Cloud - アーキテクチャ フレームワーク",
                  url: "https://cloud.google.com/architecture/framework",
                  description:
                    "コスト・運用・信頼性などの軸で設計を評価する観点を示す公式ガイド",
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
