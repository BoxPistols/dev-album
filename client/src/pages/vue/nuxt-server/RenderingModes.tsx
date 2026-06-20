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

const modeTable = [
  {
    mode: "SSR（既定）",
    when: "リクエストごとに最新の HTML が要る",
    example: "ログイン後ダッシュボード、頻繁に変わる一覧",
    next: "SSR / Dynamic",
  },
  {
    mode: "SSG（プリレンダー）",
    when: "ビルド時に内容が確定し、ほぼ変わらない",
    example: "ドキュメント、LP、規約ページ",
    next: "SSG / Static",
  },
  {
    mode: "ISR",
    when: "静的の速さで、定期的に更新も反映したい",
    example: "記事一覧、商品ページ（数分〜数時間で更新）",
    next: "ISR",
  },
  {
    mode: "SPA（ssr: false）",
    when: "SEO 不要で、認証後の管理画面など",
    example: "社内ツール、ダッシュボード（クライアント取得）",
    next: "CSR / SPA",
  },
];

export default function RenderingModes() {
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
            レンダリングモード（SSR / SSG / ISR）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Nuxt は「どこで HTML を作るか」をルート単位で選べます。既定の SSR
            から、ビルド時に静的化する SSG、静的の速さと更新性を両立する ISR、
            クライアント側だけで描画する SPA
            まで。それぞれの仕組みと使い分けを整理します。
          </p>
        </div>

        <WhyNowBox tags={["Nuxt 4", "SSR", "SSG", "ISR", "routeRules"]}>
          <p>
            Nuxt
            は単一の設定で「サーバーで描く（SSR）」「ビルド時に描く（SSG）」
            「ルートごとに混在させる（ハイブリッド）」を切り替えられます。
            Next.js の App Router
            がページ単位でレンダリング戦略を持つのに対し、Nuxt は{" "}
            <strong>routeRules</strong> で URL
            パターンごとに戦略を指定する点が特徴です。 コンテンツの更新頻度・SEO
            要件・動的度の 3 つで選ぶのがコツです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              レンダリングモードの分岐
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              routeRules を使うと、route 単位で SSR / SSG / ISR / SPA
              を切り替えられます。リクエストがどのモードに振り分けられるかを図にします。
            </p>
            <MermaidDiagram
              title="レンダリングモードの分岐（図）"
              chart={`flowchart TD
  R["リクエスト"] --> M{"routeRules"}
  M -->|"SSR (既定)"| S["毎回サーバで生成"]
  M -->|"SSG prerender"| G["ビルド時の静的HTML"]
  M -->|"ISR"| I["キャッシュ + 定期再生成"]
  M -->|"ssr:false"| P["クライアントで生成 (SPA)"]`}
            />
          </section>

          {/* SSR */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              SSR（既定）— リクエストごとにサーバーで描く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nuxt の既定は <strong>SSR（Server-Side Rendering）</strong>です。
              リクエストが来るたびにサーバー（Nitro）が HTML
              を生成して返します。サーバーで一度描いた状態を、クライアントで Vue
              が引き継いで操作可能にする工程を
              <strong>ハイドレーション</strong>と呼びます。
            </p>
            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                ハイドレーションの流れ：{" "}
                <span className="text-foreground font-medium">
                  サーバーで HTML を生成 → ブラウザが即座に表示（First Paint
                  が速い）→ JS が読み込まれて Vue が同じ DOM
                  に状態を結びつけ、イベントが効くようになる
                </span>
                。サーバーとクライアントで描画結果がズレると
                「ハイドレーションミスマッチ」の警告が出ます。
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              SSR では <code>useFetch</code> が SSR 側で実行されてデータを HTML
              に埋め込み、クライアントでの再取得を重複排除します。
              これが効くのは <code>ssr: true</code>（既定）のときです。
            </p>
          </section>

          {/* SSG */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              SSG（プリレンダー）— ビルド時に静的化する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>SSG（Static Site Generation）</strong>
              は、ビルド時に各ルートの HTML
              を生成して静的ファイルとして配信します。サーバーは不要で、CDN から
              HTML をそのまま返すため非常に高速です。内容がビルド時に確定し、
              リクエストごとに変わらないページに向きます。
            </p>

            <CodeBlock
              language="bash"
              title="全ルートを静的生成する"
              code={`# 全ルートをクロールしてプリレンダー → .output/public に静的ファイルを出力
npx nuxi generate

# 生成結果をローカルで確認
npx nuxi preview
# → 出力された静的ファイルはそのまま CDN / 静的ホスティングに置ける`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              Next.js でいう <code>output: 'export'</code>{" "}
              や静的エクスポートに近い位置づけです。
              一部のルートだけを静的化したい場合は、次の routeRules で
              <code>prerender: true</code> を指定します。
            </p>
          </section>

          {/* ISR / ハイブリッド */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ISR・ハイブリッド — routeRules でルートごとに混在させる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>nuxt.config</code> の <strong>routeRules</strong>{" "}
              を使うと、URL
              パターンごとにレンダリング戦略を指定できます。トップは
              ISR、ドキュメントは プリレンダー、管理画面は SPA、API
              はキャッシュ、といった
              <strong>ハイブリッド</strong>構成を 1 ファイルで表現できます。
            </p>

            <CodeBlock
              language="ts"
              title="nuxt.config.ts — routeRules でルート単位に指定"
              code={`export default defineNuxtConfig({
  routeRules: {
    // トップ: ISR。60 秒ごとに再生成（静的の速さ + 定期更新）
    '/': { isr: 60 },

    // ブログ記事: ビルド時にプリレンダー（SSG）
    '/blog/**': { prerender: true },

    // 商品ページ: ISR。秒数の代わりに true で「再ビルドまでキャッシュ」
    '/products/**': { isr: true },

    // 管理画面: SPA（このルートだけクライアント描画）
    '/admin/**': { ssr: false },

    // API レスポンスにキャッシュヘッダを付与
    '/api/**': { cache: { maxAge: 60 } },
  },
})`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <strong>ISR（Incremental Static Regeneration）</strong>
              は、最初のアクセスで 生成した HTML
              をキャッシュし、指定秒数が過ぎたら次のアクセスを契機に
              バックグラウンドで再生成します。静的配信の速さを保ちつつ、内容の鮮度も
              ある程度保てる中間解です。<code>isr: 60</code> なら 60 秒、
              <code>isr: true</code> なら次のデプロイまでキャッシュします。
            </p>

            <InfoBox
              type="info"
              title="routeRules でモードを混在できる（ハイブリッド）"
            >
              アプリ全体を 1 モードに固定する必要はありません。
              <code>routeRules</code> で<code>{"{ prerender: true }"}</code>
              （SSG）・
              <code>{"{ isr: 60 }"}</code>（ISR）・
              <code>{"{ ssr: false }"}</code>（SPA）・指定なし（SSR）を URL
              パターンごとに割り当て、1 つの Nuxt
              アプリ内で複数の戦略を共存させられます。
              対応する挙動は配信先（Nitro プリセット）に依存し、ISR は Vercel
              などの対応プラットフォームで有効になります。
            </InfoBox>
          </section>

          {/* SPA */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              SPA（ssr: false）— クライアントだけで描く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              アプリ全体を SPA にしたい場合は <code>ssr: false</code>{" "}
              を設定します。 サーバーは空に近い HTML
              だけを返し、描画はすべてブラウザ側で行われます。 SEO
              が不要で、認証後にしか見えない管理画面などに向きます。React で
              Vite + React Router を使った素の SPA に近い構成です。
            </p>

            <CodeBlock
              language="ts"
              title="nuxt.config.ts — アプリ全体を SPA にする"
              code={`export default defineNuxtConfig({
  // false にするとサーバーでの HTML 生成を行わず、クライアント描画になる
  ssr: false,
})`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>ssr: false</code> のとき、<code>useFetch</code> の SSR
              重複排除は働かず、データ取得はクライアント側でのみ走ります。挙動としては
              <code>$fetch</code> + Pinia で状態を持つ素朴な SPA
              に近づきます。一部ルートだけ SPA にしたい場合は、前述の routeRules
              で<code>{"{ ssr: false }"}</code> を指定します。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Nuxt の routeRules の役割として正しいものはどれ？"
              options={[
                {
                  label:
                    "URL パターンごとに SSR / SSG / ISR / SPA を指定し、混在させる",
                  correct: true,
                },
                { label: "コンポーネントの自動 import を有効にする設定" },
                { label: "TypeScript の型チェックを厳格化する設定" },
                { label: "ESLint のルールをルートごとに切り替える設定" },
              ]}
              explanation="routeRules は nuxt.config 内で URL パターンごとにレンダリング戦略を割り当てる仕組みです。prerender: true（SSG）、isr: 60（ISR）、ssr: false（SPA）、指定なし（SSR）を 1 ファイルで混在させられます。これにより、トップは ISR・ドキュメントはプリレンダー・管理画面は SPA といったハイブリッド構成が表現できます。"
            />
          </section>

          {/* 使い分け表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              使い分け — 更新頻度・SEO・動的度で選ぶ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              迷ったら「内容がいつ確定するか」を基準にします。ビルド時に確定するなら
              SSG、リクエストごとに変わるなら SSR、その中間で鮮度も欲しいなら
              ISR、 SEO が不要なら SPA。右端に Next.js の対応概念を添えました。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      モード
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      向いている状況
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      例
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      Next.js 相当
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {modeTable.map((m) => (
                    <tr key={m.mode} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {m.mode}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {m.when}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {m.example}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {m.next}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox
              type="success"
              title="既定の SSR から始めて、ルート単位で最適化する"
            >
              最初からすべてのルートを細かく分類する必要はありません。Nuxt
              の既定は SSR
              なので、まずはそのまま動かし、静的でよいページが見えてきたら
              <code>routeRules</code> で <code>prerender</code> や
              <code>isr</code>{" "}
              を足していく進め方が現実的です。全ルートを静的にできると
              判断できたら <code>nuxi generate</code> に切り替えます。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="SSG（プリレンダー）と SSR（既定）の違いとして正しいものはどれ？"
              options={[
                {
                  label:
                    "SSG はビルド時に HTML を生成して静的配信、SSR はリクエストごとにサーバーで生成する",
                  correct: true,
                },
                {
                  label:
                    "SSG はクライアントだけで描画し、SSR はサーバーだけで描画する",
                },
                {
                  label:
                    "SSG はハイドレーションが不要だが、SSR は常にハイドレーションが必要",
                },
                {
                  label: "SSG と SSR は名前が違うだけで、生成タイミングは同じ",
                },
              ]}
              explanation="SSG はビルド時に各ルートの HTML を生成し、静的ファイルとして CDN から配信します（リクエスト時にサーバー処理が不要）。SSR は既定で、リクエストごとにサーバー（Nitro）が HTML を生成します。どちらもサーバー由来の HTML をクライアントで Vue が引き継ぐハイドレーションを行う点は共通で、違いは「いつ HTML を作るか」です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Nuxt 公式 - Rendering Modes",
                  url: "https://nuxt.com/docs/guide/concepts/rendering",
                  description:
                    "SSR / SSG / SPA・ハイブリッドレンダリングの概念解説",
                },
                {
                  title: "Nuxt 公式 - routeRules",
                  url: "https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering",
                  description:
                    "ルート単位で prerender / isr / ssr を指定するハイブリッドレンダリング",
                },
                {
                  title: "Nuxt 公式 - nuxi generate",
                  url: "https://nuxt.com/docs/api/commands/generate",
                  description: "全ルートをプリレンダーして静的化するコマンド",
                },
                {
                  title: "Nuxt 公式 - Nitro デプロイプリセット",
                  url: "https://nuxt.com/docs/getting-started/deployment",
                  description:
                    "ISR などの対応はデプロイ先（Nitro プリセット）に依存する",
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
