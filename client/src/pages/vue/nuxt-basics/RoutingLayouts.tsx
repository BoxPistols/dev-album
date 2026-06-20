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

const routeMap = [
  {
    file: "app/pages/index.vue",
    route: "/",
    role: "トップページ。ディレクトリの index.vue がそのまま親パスになる",
  },
  {
    file: "app/pages/about.vue",
    route: "/about",
    role: "静的ルート。ファイル名がそのままパスになる",
  },
  {
    file: "app/pages/users/index.vue",
    route: "/users",
    role: "users ディレクトリの一覧ページ",
  },
  {
    file: "app/pages/users/[id].vue",
    route: "/users/:id",
    role: "動的ルート。[id] が URL パラメータになる",
  },
  {
    file: "app/pages/[...slug].vue",
    route: "/* （未マッチの全パス）",
    role: "キャッチオール。404 ページや任意階層に使う",
  },
];

export default function RoutingLayouts() {
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
            ファイルベースルーティングとレイアウト
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Nuxt は <code>app/pages/</code>{" "}
            にファイルを置くだけでルートが自動生成されます。
            ルーター設定を手で書く Vue Router の上に、ファイル配置 = URL
            という規約を被せたものです。動的ルート・キャッチオール・共通レイアウトまでを一通り確認します。
          </p>
        </div>

        <WhyNowBox
          tags={["Nuxt 4", "Routing", "NuxtPage", "NuxtLink", "Layouts"]}
        >
          <p>
            Next.js の App Router を触ったことがあれば、{" "}
            <strong>ファイル配置がそのまま URL になる</strong>{" "}
            という発想はすぐ馴染みます。 Nuxt も同じ思想で、{" "}
            <code>app/pages/</code> 以下のファイル名・ディレクトリ名から{" "}
            <code>vue-router</code> の設定を自動生成します。
            ルーティングを宣言的に保てるので、URL
            設計とディレクトリ構成が常に一致します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ファイル名からルートへの対応
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              app/pages/ に置いたファイル名が、そのまま URL のルートに対応します。動的ルートは [id]、キャッチオールは [...slug] です。
            </p>
            <MermaidDiagram
              title="ファイル名からルートへの対応（図）"
              chart={`flowchart LR
  F1["app/pages/index.vue"] --> R1["/"]
  F2["app/pages/users/[id].vue"] --> R2["/users/:id"]
  F3["app/pages/[...slug].vue"] --> R3["キャッチオール"]`}
            />
          </section>
          {/* ファイル → ルートの対応 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ファイル配置がそのままルートになる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nuxt 4 では <code>app/pages/</code>{" "}
              にコンポーネントを置くと、ファイル名・ディレクトリ名から
              ルートが自動生成されます。次の対応表が基本ルールです。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      ファイル
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      生成される URL
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {routeMap.map((r) => (
                    <tr key={r.file} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {r.file}
                      </td>
                      <td className="py-2 px-4 font-mono text-foreground whitespace-nowrap align-top">
                        {r.route}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {r.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="Nuxt 4 では app/pages/ 配下">
              Nuxt 3 では <code>pages/</code>{" "}
              がプロジェクトルート直下でしたが、Nuxt 4 では既定の{" "}
              <code>srcDir</code> が <code>app/</code> になり、
              <code>pages/</code> ・<code>components/</code> ・
              <code>layouts/</code> はすべて <code>app/</code>{" "}
              配下に置きます。これが Nuxt 3 からの最大の体感差です。
            </InfoBox>
          </section>

          {/* NuxtPage と app.vue */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ルートを描画する NuxtPage
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              現在の URL にマッチしたページは <code>{"<NuxtPage />"}</code>{" "}
              の位置に描画されます。 Vue Router の{" "}
              <code>{"<router-view>"}</code> に当たり、Next.js でいう{" "}
              <code>layout</code> 内の <code>children</code>{" "}
              の差し込み口に近い役割です。
            </p>

            <CodeBlock
              language="html"
              title="app/app.vue — アプリの土台"
              code={`<template>
  <div>
    <header>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/users">Users</NuxtLink>
    </header>

    <!-- 現在のルートに対応するページがここに描画される -->
    <NuxtPage />
  </div>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ページ間の遷移には <code>{"<NuxtLink>"}</code> を使います。{" "}
              <code>to</code> に遷移先パスを渡すと、内部的に{" "}
              <code>{"<a>"}</code> を出力しつつ
              クライアントサイドルーティング（フルリロードなしの遷移）を行います。
              React Router の <code>{"<Link>"}</code> や Next.js の{" "}
              <code>{"<Link>"}</code> と同じ立ち位置です。
            </p>
          </section>

          {/* 動的ルート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              動的ルート [id] とパラメータ取得
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ファイル名を <code>[id].vue</code> のように角括弧で囲むと、
              その部分が URL パラメータになります。値は{" "}
              <code>useRoute().params.id</code> で取り出します。
            </p>

            <CodeBlock
              language="html"
              title="app/pages/users/[id].vue — 動的ルート"
              code={`<script setup lang="ts">
// useRoute は自動 import されるため import 不要
const route = useRoute()

// /users/42 にアクセスすると id は "42"（文字列）
const id = route.params.id
</script>

<template>
  <div>
    <h1>ユーザー詳細</h1>
    <p>ユーザー ID: {{ id }}</p>

    <NuxtLink to="/users">一覧に戻る</NuxtLink>
  </div>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              プログラムから遷移したい場合は <code>navigateTo</code>{" "}
              を使います。 ボタンのクリックハンドラやデータ取得後など、
              テンプレートではなくスクリプト側で遷移を起こすときに便利です。
            </p>

            <CodeBlock
              language="ts"
              title="navigateTo — スクリプトからの遷移"
              code={`async function goToUser(id: number) {
  // パス文字列でもオブジェクトでも渡せる
  await navigateTo(\`/users/\${id}\`)
}

// クエリ付きで遷移する例
function search(keyword: string) {
  return navigateTo({ path: '/users', query: { q: keyword } })
}`}
            />

            <InfoBox
              type="info"
              title="動的は [id]、キャッチオールは [...slug]"
            >
              単一セグメントの動的ルートは <code>[id].vue</code>、
              任意の階層数を 1 ファイルで受けるキャッチオールは{" "}
              <code>[...slug].vue</code> です。 キャッチオールでは{" "}
              <code>useRoute().params.slug</code> が パスを分割した配列（例:{" "}
              <code>/docs/a/b</code> なら <code>['docs', 'a', 'b']</code>
              ）になります。 どのルートにもマッチしなかったパスを拾えるので、404
              ページや CMS の任意パスに使います。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="app/pages/users/[id].vue が生成するルートはどれ？"
              options={[
                { label: "/users（id は無視される）" },
                { label: "/users/:id（id が動的パラメータ）", correct: true },
                { label: "/users/[id]（角括弧がそのまま URL に出る）" },
                { label: "ルートは生成されない（手動登録が必要）" },
              ]}
              explanation="角括弧で囲んだファイル名 [id].vue は動的ルート /users/:id を生成します。URL の :id 部分は useRoute().params.id で取り出せます。角括弧は URL にはそのまま出ず、パラメータ名の宣言として機能します。"
            />
          </section>

          {/* レイアウト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              共通レイアウト（app/layouts/）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ヘッダーやサイドバーなど、複数ページで共有する枠は{" "}
              <code>app/layouts/</code> に置きます。 <code>default.vue</code>{" "}
              を作ると、レイアウトを指定していない全ページに自動で適用されます。
              ページ本体は <code>{"<slot />"}</code> の位置に差し込まれます。
            </p>

            <CodeBlock
              language="html"
              title="app/layouts/default.vue — 既定レイアウト"
              code={`<template>
  <div>
    <header class="site-header">
      <NuxtLink to="/">Dev Album</NuxtLink>
    </header>

    <main>
      <!-- ページ本体がここに差し込まれる -->
      <slot />
    </main>

    <footer>共通フッター</footer>
  </div>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              名前付きレイアウト（例 <code>admin.vue</code>）を作った場合は、
              ページ側で <code>definePageMeta</code>{" "}
              を使って明示的に指定します。
            </p>

            <CodeBlock
              language="html"
              title="app/pages/admin/index.vue — レイアウトを指定する"
              code={`<script setup lang="ts">
// このページだけ admin レイアウトを使う
definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <h1>管理画面</h1>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>app.vue</code> 側でレイアウトを有効にするには、{" "}
              <code>{"<NuxtPage />"}</code> を <code>{"<NuxtLayout>"}</code>{" "}
              で包みます。 <code>app/layouts/</code>{" "}
              を使う場合に必要な配線です。
            </p>

            <CodeBlock
              language="html"
              title="app/app.vue — レイアウトを有効にする"
              code={`<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>`}
            />
          </section>

          {/* Next.js との対応 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Next.js のルーティングとの対応
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ファイルベースという発想は Next.js
              と共通ですが、命名規約と差し込み口の名前が異なります。
              対応関係を押さえると移行がスムーズです。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      概念
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      Nuxt
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      Next.js（App Router）
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 text-muted-foreground align-top">
                      ページ
                    </td>
                    <td className="py-2 px-4 font-mono text-primary align-top">
                      app/pages/about.vue
                    </td>
                    <td className="py-2 px-4 font-mono text-foreground align-top">
                      app/about/page.tsx
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 text-muted-foreground align-top">
                      動的ルート
                    </td>
                    <td className="py-2 px-4 font-mono text-primary align-top">
                      [id].vue
                    </td>
                    <td className="py-2 px-4 font-mono text-foreground align-top">
                      [id]/page.tsx
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 text-muted-foreground align-top">
                      キャッチオール
                    </td>
                    <td className="py-2 px-4 font-mono text-primary align-top">
                      [...slug].vue
                    </td>
                    <td className="py-2 px-4 font-mono text-foreground align-top">
                      [...slug]/page.tsx
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 text-muted-foreground align-top">
                      レイアウト
                    </td>
                    <td className="py-2 px-4 font-mono text-primary align-top">
                      app/layouts/default.vue
                    </td>
                    <td className="py-2 px-4 font-mono text-foreground align-top">
                      app/layout.tsx
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 text-muted-foreground align-top">
                      子の差し込み口
                    </td>
                    <td className="py-2 px-4 font-mono text-primary align-top">
                      {"<NuxtPage /> / <slot />"}
                    </td>
                    <td className="py-2 px-4 font-mono text-foreground align-top">
                      {"{children}"}
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 text-muted-foreground align-top">
                      リンク
                    </td>
                    <td className="py-2 px-4 font-mono text-primary align-top">
                      {"<NuxtLink to>"}
                    </td>
                    <td className="py-2 px-4 font-mono text-foreground align-top">
                      {"<Link href>"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox
              type="warning"
              title="Next.js の layout とは適用範囲が違う"
            >
              Next.js の <code>layout.tsx</code>{" "}
              はディレクトリ単位でネストして自動適用されます。 一方 Nuxt の{" "}
              <code>app/layouts/</code> は <code>default.vue</code>{" "}
              が全ページ既定で、 それ以外はページ側の{" "}
              <code>definePageMeta({"{ layout }"})</code>{" "}
              で個別に指定する仕組みです。
              ディレクトリ階層と自動連動はしない点に注意してください。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="NuxtLink の役割として正しいものはどれ？"
              options={[
                {
                  label:
                    "クライアントサイドルーティングでページ遷移する内部リンク",
                  correct: true,
                },
                { label: "API へデータを取得しに行く関数" },
                { label: "レイアウトを切り替えるためのメタ情報設定" },
                { label: "サーバーサイドでのみ動く外部リダイレクト専用タグ" },
              ]}
              explanation="NuxtLink は内部リンク用のコンポーネントで、to に遷移先を渡すとフルリロードなしのクライアントサイドルーティングで遷移します。React Router や Next.js の Link に相当します。スクリプトから遷移したいときは navigateTo を使います。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Nuxt 公式 - Routing",
                  url: "https://nuxt.com/docs/getting-started/routing",
                  description:
                    "ファイルベースルーティング・動的ルート・NuxtPage の公式解説",
                },
                {
                  title: "Nuxt 公式 - Views（Layouts）",
                  url: "https://nuxt.com/docs/getting-started/views",
                  description:
                    "app.vue / layouts / NuxtLayout / NuxtPage の関係",
                },
                {
                  title: "Nuxt 公式 - definePageMeta",
                  url: "https://nuxt.com/docs/api/utils/define-page-meta",
                  description:
                    "ページごとのレイアウト・ミドルウェア等のメタ指定",
                },
                {
                  title: "Vue Router 公式",
                  url: "https://router.vuejs.org/",
                  description:
                    "Nuxt が内部で使うルーターの仕様（useRoute / useRouter）",
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
