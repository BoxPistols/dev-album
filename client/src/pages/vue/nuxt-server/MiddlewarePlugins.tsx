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

const extensionPoints = [
  {
    name: "ルートミドルウェア",
    place: "app/middleware/",
    role: "ページ遷移の前に走る。認証ガード・リダイレクトなどナビゲーション制御",
    next: "Next.js の middleware.ts に近い（ただし Nuxt はクライアント側でも動く）",
  },
  {
    name: "プラグイン",
    place: "app/plugins/",
    role: "起動時に 1 度走る。ヘルパーやライブラリを全体に注入する",
    next: "Next.js には直接の対応概念がない（providers / instrumentation が近い）",
  },
  {
    name: "モジュール",
    place: "nuxt.config の modules",
    role: "ビルド時にプロジェクトへ機能を追加する（パッケージ単位の拡張）",
    next: "Next.js のプラグイン/インテグレーション設定に近い",
  },
];

export default function MiddlewarePlugins() {
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
            ミドルウェア・プラグイン・モジュール
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Nuxt の拡張機構は 3 つに分かれます。
            <strong>ルートミドルウェア</strong>（遷移を制御する）、
            <strong>プラグイン</strong>（全体に共通処理を注入する）、
            <strong>モジュール</strong>（機能パッケージを丸ごと追加する）。
            それぞれ「いつ・どこで走るか」が違うので、用途で使い分けます。
          </p>
        </div>

        <WhyNowBox
          tags={["Nuxt 4", "ミドルウェア", "プラグイン", "モジュール", "認証"]}
        >
          <p>
            「ログインしていない人をログインページへ飛ばす」「日付フォーマッタを
            全コンポーネントから使えるようにする」「画像最適化を導入する」——
            これらはそれぞれ別の仕組みで解決します。 ルートミドルウェアは
            <strong>遷移の前のガード</strong>、プラグインは
            <strong>起動時の注入</strong>、モジュールは
            <strong>ビルド時の機能追加</strong>。
            役割の境界を最初に押さえておくと、
            「どこに書けばいいか」で迷わなくなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ルートミドルウェアの流れ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ページ遷移の前にルートミドルウェアが走り、条件を満たさなければ navigateTo でリダイレクトします。認証ガードの典型的な流れです。
            </p>
            <MermaidDiagram
              title="ルートミドルウェアの流れ（図）"
              chart={`flowchart TD
  N["ページ遷移"] --> M["ルートミドルウェア (認証チェック)"]
  M -->|"OK"| P["ページを表示"]
  M -->|"NG"| R["navigateTo でリダイレクト"]`}
            />
          </section>

          {/* 3つの拡張点の俯瞰 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3 つの拡張点を俯瞰する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              まず全体像です。Nuxt 4 では <code>app/</code>{" "}
              配下が標準のソースディレクトリなので、 ミドルウェアとプラグインは{" "}
              <code>app/middleware/</code> / <code>app/plugins/</code>{" "}
              に置きます。 モジュールはファイルではなく <code>nuxt.config</code>{" "}
              の <code>modules</code> 配列に登録します。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      仕組み
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      置き場所
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      React/Next との対応
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {extensionPoints.map((e) => (
                    <tr key={e.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-bold text-foreground whitespace-nowrap align-top">
                        {e.name}
                      </td>
                      <td className="py-2 px-4 font-mono text-primary whitespace-nowrap align-top">
                        {e.place}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {e.role}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {e.next}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ルートミドルウェア */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ルートミドルウェア — 遷移を制御する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ルートミドルウェアは <strong>ページが表示される前</strong>{" "}
              に走る関数です。 <code>app/middleware/</code> に{" "}
              <code>defineNuxtRouteMiddleware</code> で定義し、遷移先{" "}
              <code>to</code> と遷移元 <code>from</code> を 受け取って、必要なら{" "}
              <code>navigateTo</code> で別ページへ
              リダイレクトします。認証ガードの典型的な置き場所です。
            </p>

            <CodeBlock
              language="ts"
              title="app/middleware/auth.ts — 未ログインなら /login へ飛ばす"
              code={`export default defineNuxtRouteMiddleware((to, from) => {
  // useUserSession は自前 or nuxt-auth-utils 等のログイン状態 composable を想定
  const { loggedIn } = useUserSession()

  // すでにログインページにいるなら何もしない（無限リダイレクト防止）
  if (to.path === '/login') return

  if (!loggedIn.value) {
    // navigateTo を return するとそのままリダイレクトされる
    return navigateTo('/login')
  }
})`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              作っただけでは走りません。
              個別のページに適用するには、そのページの{" "}
              <code>{"<script setup>"}</code> で <code>definePageMeta</code>{" "}
              を使ってミドルウェア名を指定します。
            </p>

            <CodeBlock
              language="html"
              title="app/pages/dashboard.vue — auth ミドルウェアを適用する"
              code={`<script setup lang="ts">
// ファイル名の auth.ts が 'auth' という名前になる
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <h1>ダッシュボード（ログイン必須）</h1>
</template>`}
            />

            <InfoBox type="info" title="グローバルに走らせるなら .global.ts">
              ファイル名を <code>app/middleware/auth.global.ts</code> のように{" "}
              <code>.global</code> を付けると、
              <code>definePageMeta</code> なしで{" "}
              <strong>すべてのページ遷移</strong> で自動的に走ります。
              全画面共通の認証チェックやアクセスログにはこちらが向きます。
              特定ページだけに掛けたい場合はサフィックスなし +{" "}
              <code>definePageMeta</code> の組み合わせを使います。
            </InfoBox>
          </section>

          {/* プラグイン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              プラグイン — 共通処理を注入する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              プラグインは <strong>アプリ起動時に 1 度だけ</strong>{" "}
              走るコードです。 <code>app/plugins/</code> に{" "}
              <code>defineNuxtPlugin</code> で定義し、
              <code>nuxtApp.provide()</code>{" "}
              でヘルパーを注入すると、全コンポーネントから <code>$xxx</code> や{" "}
              <code>useNuxtApp()</code> 経由で呼べるようになります。
              日付フォーマッタや外部ライブラリの
              初期化など、横断的に使うものを置きます。
            </p>

            <CodeBlock
              language="ts"
              title="app/plugins/hello.ts — $hello ヘルパーを全体に注入する"
              code={`export default defineNuxtPlugin(() => {
  return {
    provide: {
      // $hello という名前で全コンポーネントから使えるようになる
      hello: (name: string) => \`Hello, \${name}!\`,
    },
  }
})`}
            />

            <CodeBlock
              language="html"
              title="任意のコンポーネントから注入したヘルパーを使う"
              code={`<script setup lang="ts">
const { $hello } = useNuxtApp()
const greeting = $hello('Nuxt')  // → "Hello, Nuxt!"
</script>

<template>
  <p>{{ greeting }}</p>
</template>`}
            />

            <InfoBox
              type="info"
              title=".client / .server サフィックスで実行環境を絞る"
            >
              プラグインは SSR では{" "}
              <strong>サーバーとクライアントの両方</strong>{" "}
              で走ります。ブラウザ専用の処理（<code>window</code> や{" "}
              <code>localStorage</code> を触るもの）は{" "}
              <code>app/plugins/xxx.client.ts</code>、 サーバー専用の処理は{" "}
              <code>xxx.server.ts</code>{" "}
              と名付けると、その環境でだけ実行されます。 「サーバーで window
              がなくて落ちる」事故を防げます。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="「未ログインのユーザーを /login へリダイレクトする」処理を置くのに最も適した仕組みはどれ？"
              options={[
                {
                  label:
                    "ルートミドルウェア（defineNuxtRouteMiddleware + navigateTo）",
                  correct: true,
                },
                { label: "プラグイン（defineNuxtPlugin）" },
                { label: "Nuxt モジュール（nuxt.config の modules）" },
                { label: "vite.config の resolve.alias" },
              ]}
              explanation="ページ遷移の前に走り、条件に応じて navigateTo でリダイレクトできるのはルートミドルウェアです。認証ガードはルートミドルウェアの代表的なユースケースです。プラグインは起動時の注入、モジュールはビルド時の機能追加が役割で、遷移ごとのガードには向きません。"
            />
          </section>

          {/* モジュール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              モジュール — 機能をパッケージごと追加する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nuxt モジュールは <strong>ビルド時に Nuxt 本体を拡張する</strong>{" "}
              パッケージです。 画像最適化・状態管理・コンテンツ管理などを、
              <code>nuxt.config</code> の <code>modules</code>{" "}
              配列に追加するだけで導入できます。 追加すると、そのモジュールが
              用意した composable やコンポーネントが 自動 import
              されて使えるようになります。
            </p>

            <CodeBlock
              language="ts"
              title="nuxt.config.ts — modules に追加して機能を有効化する"
              code={`export default defineNuxtConfig({
  modules: [
    '@nuxt/image',   // <NuxtImg> による画像最適化を追加
    '@pinia/nuxt',   // Pinia をセットアップ（useXxxStore が自動 import に）
  ],

  // モジュールごとの設定はトップレベルのキーで渡せる
  image: {
    quality: 80,
  },
})`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              たとえば <code>@pinia/nuxt</code> を入れると、
              <code>app/stores/</code> に置いた <code>defineStore</code> が自動
              import され、<code>import</code> 文なしで{" "}
              <code>useXxxStore()</code> を呼べます。 モジュールは「設定 1
              行で機能が増える」のが利点で、
              公式・コミュニティの豊富なエコシステムが揃っています。
            </p>

            <InfoBox type="success" title="自動 import がモジュールの恩恵">
              Nuxt は <code>components/</code> / <code>composables/</code> /{" "}
              <code>utils/</code> を自動 import
              します。モジュールはこの仕組みに乗って、 自前のコンポーネントや
              composable を <code>import</code>{" "}
              なしで使えるよう登録してくれます。だから導入後すぐに{" "}
              <code>{"<NuxtImg>"}</code> のようなタグが書けます。
            </InfoBox>
          </section>

          {/* 使い分けのまとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              迷ったときの判断軸
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              3 つは「いつ走るか」で役割が決まります。
              下の図解で対応づけて覚えておくと、設計時に迷いません。
            </p>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-foreground mb-1">
                  遷移を制御したい
                </p>
                <p className="text-sm text-muted-foreground">
                  認証ガード・条件リダイレクト・遷移ログ →{" "}
                  <strong>ルートミドルウェア</strong>
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-foreground mb-1">
                  共通処理を注入したい
                </p>
                <p className="text-sm text-muted-foreground">
                  ヘルパー・外部 SDK 初期化・グローバルな状態 →{" "}
                  <strong>プラグイン</strong>
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-foreground mb-1">
                  機能を丸ごと足したい
                </p>
                <p className="text-sm text-muted-foreground">
                  画像最適化・Pinia・コンテンツ管理 →{" "}
                  <strong>モジュール</strong>
                </p>
              </div>
            </div>

            <InfoBox
              type="warning"
              title="モジュールでプラグインの代わりはしない"
            >
              自作の小さなヘルパーを共有したいだけなら、わざわざモジュール化せず{" "}
              <strong>プラグイン</strong> で十分です。
              モジュールは「他人にも配れる
              パッケージ単位の拡張」を作るときの選択肢で、
              アプリ内の共通処理にはオーバースペックになりがちです。
              まずプラグイン、再利用が複数プロジェクトに広がったら
              モジュール化を検討する、という順序が実用的です。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="@nuxt/image のような Nuxt モジュールを有効化するには、どこに追加する？"
              options={[
                { label: "app/plugins/ にファイルを置く" },
                {
                  label: "nuxt.config の modules 配列に追加する",
                  correct: true,
                },
                { label: "app/middleware/ にファイルを置く" },
                { label: "package.json の scripts に書く" },
              ]}
              explanation="Nuxt モジュールは nuxt.config の modules 配列に文字列で追加して有効化します（例: modules: ['@nuxt/image']）。プラグインやミドルウェアはファイルを置く方式ですが、モジュールは設定ファイルへの登録で機能が増えるのが特徴です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Nuxt 公式 - Route Middleware",
                  url: "https://nuxt.com/docs/guide/directory-structure/middleware",
                  description:
                    "defineNuxtRouteMiddleware / .global / definePageMeta の公式解説",
                },
                {
                  title: "Nuxt 公式 - Plugins",
                  url: "https://nuxt.com/docs/guide/directory-structure/plugins",
                  description:
                    "defineNuxtPlugin / provide / .client / .server サフィックスの解説",
                },
                {
                  title: "Nuxt 公式 - Modules",
                  url: "https://nuxt.com/docs/4.x/guide/modules/getting-started",
                  description: "modules 配列への登録とモジュールの仕組みの概要",
                },
                {
                  title: "Nuxt Modules（公式エコシステム）",
                  url: "https://nuxt.com/modules",
                  description:
                    "@nuxt/image・@pinia/nuxt など公式・コミュニティモジュール一覧",
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
