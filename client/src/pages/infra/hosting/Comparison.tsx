import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodingChallenge from "@/components/CodingChallenge";

const useCases = [
  {
    title: "Next.js 中心",
    recommend: "Vercel",
    description:
      "App Router・ISR・Image 最適化などフレームワーク機能をそのまま活かしたいなら、開発元が運営する Vercel が素直。設定が少なく済む。",
  },
  {
    title: "静的中心 + 少しの動的",
    recommend: "Netlify",
    description:
      "静的サイトにフォーム送信や軽いサーバ処理を足したい場合。Forms やリダイレクト設定が手厚く、設定ファイルで完結しやすい。",
  },
  {
    title: "エッジ重視・低レイテンシ",
    recommend: "Cloudflare",
    description:
      "コードとデータをユーザーの近くで動かしたい場合。Workers と KV/D1/R2 を組み合わせ、無料プランのままエッジ前提の設計を試せる。",
  },
  {
    title: "フルコントロール",
    recommend: "自前 VPS / コンテナ",
    description:
      "ランタイムやネットワークを細かく制御したい、特殊なミドルウェアを動かしたい場合。運用コストは増えるが自由度は最も高い。",
  },
];

export default function Comparison() {
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
            ホスティングの比較と選び方
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Vercel・Netlify・Cloudflare、そして自前の VPS / コンテナは、
            それぞれ得意領域が異なります。ここでは開発体験・エッジ対応・
            価格モデル・ベンダーロックイン・得意領域という観点で各サービスを
            並べ、用途別の選び方とロックインを避ける指針を整理します。
            「どれが正解か」ではなく「どの場面でどれが噛み合うか」を
            掴むのが目的です。
          </p>
        </div>

        <WhyNowBox
          tags={["比較", "選定", "ロックイン", "DX", "エッジ", "価格"]}
        >
          <p>
            ホスティングは一度選ぶと移行に手間がかかるため、最初の選定が
            後々の開発体験とコストを左右します。とはいえ「人気だから」で
            選ぶと、自分の要件と噛み合わずに苦労することがあります。
            各サービスの設計思想を観点ごとに比べておくと、要件が変わった時にも
            「何を基準に乗り換えるか」を自分で判断できるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 比較表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              4 つの選択肢を観点で比較する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              下表は代表的な観点での傾向をまとめたものです。価格や上限値は
              改定で変動するため、ここでは「考え方の傾向」を示します。
              実際の見積もりは各社の最新の料金ページで確認してください。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="text-left p-3 border-b border-border">
                      観点
                    </th>
                    <th className="text-left p-3 border-b border-border">
                      Vercel
                    </th>
                    <th className="text-left p-3 border-b border-border">
                      Netlify
                    </th>
                    <th className="text-left p-3 border-b border-border">
                      Cloudflare
                    </th>
                    <th className="text-left p-3 border-b border-border">
                      自前 VPS / コンテナ
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">
                      開発体験（DX）
                    </td>
                    <td className="p-3">Next.js と密結合で快適</td>
                    <td className="p-3">設定が分かりやすい</td>
                    <td className="p-3">CLI 中心でやや学習要</td>
                    <td className="p-3">自由だが構築コスト大</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">
                      エッジ対応
                    </td>
                    <td className="p-3">Edge Functions あり</td>
                    <td className="p-3">Edge Functions（Deno）</td>
                    <td className="p-3">エッジが中核</td>
                    <td className="p-3">自前で CDN 構築が必要</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">
                      価格モデル
                    </td>
                    <td className="p-3">無料枠 + 従量</td>
                    <td className="p-3">無料枠 + 従量</td>
                    <td className="p-3">無料枠 + 従量</td>
                    <td className="p-3">サーバ定額が中心</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">
                      ロックイン
                    </td>
                    <td className="p-3">中（機能依存しやすい）</td>
                    <td className="p-3">中</td>
                    <td className="p-3">中〜高（bindings 依存）</td>
                    <td className="p-3">低（標準技術で構築）</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      得意領域
                    </td>
                    <td className="p-3">Next.js / フロント主導</td>
                    <td className="p-3">静的 + 軽い動的</td>
                    <td className="p-3">エッジ / 低レイテンシ</td>
                    <td className="p-3">特殊要件 / 細かい制御</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              どのマネージドサービスも「Git にプッシュすれば配信される」
              開発体験は共通です。差が出るのはエッジの扱い・価格の伸び方・
              特定機能への依存度です。
            </p>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              価格の行は課金の<strong>体系</strong>だけを示しています。無料枠の上限や
              有料プランの金額（たとえば Cloudflare の Workers Paid は 2026 年 8
              月時点で月額 $5 から）は各社が随時見直すため、金額で判断するときは
              公式の料金ページで確認してください。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="比較表から読み取れる、マネージドサービス共通の利点はどれ？"
              options={[
                { label: "どれも完全に無料で使い続けられる" },
                {
                  label:
                    "Git 連携でビルドとデプロイが自動化され、サーバ構築なしに配信できる",
                  correct: true,
                },
                { label: "どれもベンダーロックインが一切ない" },
                { label: "すべて同じランタイムで動く" },
              ]}
              explanation="Vercel・Netlify・Cloudflare はいずれも Git にプッシュするとビルドとデプロイが自動で走り、サーバ構築なしに配信できる点が共通の利点です。無料枠の広さやエッジの扱い、ロックインの度合いはサービスごとに異なります。"
            />
          </section>

          {/* 用途別の選び方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              用途別の選び方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              要件を軸にすると選定が早くなります。下は典型的な 4
              パターンと、最初に検討する候補です。あくまで出発点で、
              チームの慣れや既存資産によって最適解は変わります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {useCases.map((u) => (
                <div
                  key={u.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {u.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    まず検討: {u.recommend}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {u.description}
                  </p>
                </div>
              ))}
            </div>

            <MermaidDiagram
              title="図: どのホスティングを選ぶかの判断フロー"
              chart={`flowchart TD
    S["ホスティングを選ぶ"] --> Q1{"ランタイムや<br/>ネットワークを<br/>細かく制御したい？"}
    Q1 -->|"はい"| VPS["自前 VPS / コンテナ"]
    Q1 -->|"いいえ"| Q2{"Next.js 中心？"}
    Q2 -->|"はい"| VER["Vercel"]
    Q2 -->|"いいえ"| Q3{"エッジ実行と<br/>低レイテンシが要件？"}
    Q3 -->|"はい"| CF["Cloudflare"]
    Q3 -->|"いいえ"| Q4{"静的中心 +<br/>少しの動的？"}
    Q4 -->|"はい"| NET["Netlify"]
    Q4 -->|"いいえ"| VER`}
            />

            <div className="mt-8">
              <CodingChallenge
                preview
                previewType="markdown"
                title="要件から選定理由を書こう"
                description="「静的サイトにフォーム送信を足したい」という要件に対して、まず検討するサービス名を空欄に入れて選定メモを完成させてください。"
                initialCode={`## 選定メモ

- 要件: 静的サイトにフォーム送信を足したい
- まず検討するサービス: ___
- 理由: Forms やリダイレクト設定が手厚く、設定ファイルで完結しやすいため`}
                answer={`## 選定メモ

- 要件: 静的サイトにフォーム送信を足したい
- まず検討するサービス: Netlify
- 理由: Forms やリダイレクト設定が手厚く、設定ファイルで完結しやすいため`}
                hints={[
                  "静的中心 + 少しの動的（フォーム送信）に手厚いのは Netlify",
                ]}
                keywords={["Netlify"]}
              />
            </div>
          </section>

          {/* ベンダーロックイン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ベンダーロックインとの付き合い方
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              マネージドサービスは便利ですが、その会社固有の機能に深く
              依存するほど、別サービスへの移行は重くなります。ロックインは
              ゼロにできないものの、「どこまで許容し、どこで線を引くか」を
              意識すると後の選択肢を残せます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ポイントは、ビジネスロジックを特定プラットフォームの API
              から切り離しておくことです。たとえば関数のハンドラは薄く保ち、
              中身は標準的な関数として書いておけば、ランタイムが変わっても
              中核ロジックは再利用できます。
            </p>

            <InfoBox type="info" title="ロックインを抑える 3 つの指針">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  ビジネスロジックはプラットフォーム固有 API
                  から分離し、薄いアダプタ層で繋ぐ
                </li>
                <li>
                  保存データは標準フォーマット（SQL・S3 互換など）を選び、
                  エクスポート手段を確認しておく
                </li>
                <li>
                  ビルドは標準的なコマンドで完結させ、特定 UI
                  操作に依存しない（設定をコード化する）
                </li>
              </ul>
            </InfoBox>
          </section>

          {/* 移行のしやすさ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              「乗り換えられる状態」を保つ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最初の選定で完璧を狙うより、要件の変化に応じて乗り換えられる
              状態を保つ方が現実的です。トラフィックが増えてコストが合わなく
              なったり、エッジ要件が出てきたりと、前提は時間とともに変わります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              そのためにも、設定ファイルをリポジトリにコミットし、環境変数や
              ビルド手順を文書化しておくことが効きます。「このサービスでしか
              動かない部分」を把握しているだけで、移行の見積もりが立てやすく
              なります。
            </p>

            <InfoBox type="warning" title="無料枠の前提は変わる">
              無料枠や価格は各社の方針で改定されます。「仕様では無料の範囲、
              実測では規模拡大で従量課金に入る」ことは珍しくありません。
              想定トラフィックでの概算を一度出し、コスト境界を把握しておくと、
              後から慌てずに済みます。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="ベンダーロックインを抑える設計として最も効果的なのは？"
              options={[
                { label: "常に最も安いサービスへ毎月乗り換える" },
                {
                  label:
                    "ビジネスロジックをプラットフォーム固有 API から分離し、薄いアダプタ層で繋ぐ",
                  correct: true,
                },
                { label: "すべての機能をその会社の独自 API で書く" },
                { label: "設定をダッシュボードだけで管理する" },
              ]}
              explanation="ロックインはゼロにできませんが、ビジネスロジックを固有 API から切り離し、薄いアダプタ層で繋いでおくと、ランタイムやサービスが変わっても中核ロジックを再利用できます。標準フォーマットでのデータ保存や設定のコード化も、移行のしやすさを保つ助けになります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vercel ドキュメント",
                  url: "https://vercel.com/docs",
                  description:
                    "Vercel の機能・料金・制限を確認できる公式ドキュメント",
                },
                {
                  title: "Netlify ドキュメント",
                  url: "https://docs.netlify.com/",
                  description:
                    "Netlify のビルド・関数・フォーム機能の公式ドキュメント",
                },
                {
                  title: "Cloudflare Developer Platform",
                  url: "https://developers.cloudflare.com/",
                  description:
                    "Pages / Workers / ストレージなどエッジ基盤の公式ドキュメント",
                },
                {
                  title: "The Twelve-Factor App",
                  url: "https://12factor.net/ja/",
                  description:
                    "設定の外部化や移植性など、ロックインを抑える設計原則の指針",
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
