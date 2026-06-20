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

const reactMapping = [
  {
    react: "<BrowserRouter>",
    vue: "createWebHistory()",
    note: "History API ベースのルーターを作る",
  },
  {
    react: "<Routes> / <Route>",
    vue: "routes 配列（path + component）",
    note: "ルート定義は createRouter にまとめて渡す",
  },
  {
    react: "<Link to>",
    vue: "<router-link :to>",
    note: "クリックで遷移するリンク要素",
  },
  {
    react: "<Outlet>",
    vue: "<router-view>",
    note: "一致したコンポーネントの描画先",
  },
  {
    react: "useParams()",
    vue: "useRoute().params",
    note: "動的セグメントの値を読む",
  },
  {
    react: "useNavigate()",
    vue: "useRouter().push()",
    note: "コードから命令的に遷移する",
  },
];

export default function Router() {
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
            Vue Router
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Vue Router は Vue 公式のクライアントサイドルーターです。URL
            とコンポーネントを対応づけ、
            ページ遷移・動的ルート・ネスト・認証ガードまでを 1
            つのライブラリで扱えます。 React Router
            の経験があれば、対応する概念に置き換えながら読み進められます。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "Vue Router",
            "createRouter",
            "router-view",
            "useRoute",
            "ガード",
          ]}
        >
          <p>
            SPA では URL の変化に応じて表示するコンポーネントを切り替えます。Vue
            ではこの役割を <strong>Vue Router</strong> が担います。
            <code>createRouter</code> でルーターを 1 つ作り、
            <code>router-link</code> でリンクを、<code>router-view</code>
            で描画先を置くという 3 点セットが基本構成です。 React Router の
            <code>{"<BrowserRouter>"}</code> / <code>{"<Link>"}</code> /{" "}
            <code>{"<Outlet>"}</code>
            にそのまま対応します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              URL からコンポーネント表示までの流れ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              URL を Vue Router がマッチし、router-view
              に該当コンポーネントを表示します。動的ルートのパラメータは useRoute
              で取得します。
            </p>
            <MermaidDiagram
              title="URL からコンポーネント表示までの流れ（図）"
              chart={`flowchart TD
  U["URL: /users/42"] --> R["Vue Router がマッチ"]
  R --> V["router-view に該当コンポーネントを表示"]
  V --> P["useRoute().params.id で 42 を取得"]`}
            />
          </section>

          {/* ルーターの設定 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ルーターを作る（createRouter + createWebHistory）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>createRouter</code> に <code>history</code> と{" "}
              <code>routes</code> を渡してルーターを作ります。
              <code>createWebHistory()</code> は HTML5 History API
              を使い、ハッシュなしのきれいな URL になります（React Router の
              <code>{"<BrowserRouter>"}</code> 相当）。 作ったルーターは{" "}
              <code>main.ts</code> で <code>app.use(router)</code>
              として登録します。
            </p>

            <CodeBlock
              language="ts"
              title="src/router/index.ts — ルート定義"
              code={`import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  // 遅延読み込み（動的 import）: 初回バンドルを軽くする
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
  },
  // 動的ルート: :id がパラメータになる
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('@/views/User.vue'),
  },
  // ネストルート: 親の <router-view> に children が描画される
  {
    path: '/settings',
    component: () => import('@/views/Settings.vue'),
    children: [
      { path: '', name: 'settings', component: () => import('@/views/Profile.vue') },
      { path: 'security', name: 'security', component: () => import('@/views/Security.vue') },
    ],
  },
  // マッチしない URL をまとめて受ける（404）
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue') },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})`}
            />

            <CodeBlock
              language="ts"
              title="src/main.ts — ルーターを登録する"
              code={`import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

createApp(App).use(router).mount('#app')`}
            />

            <InfoBox
              type="info"
              title="createWebHistory と createWebHashHistory"
            >
              <code>createWebHistory()</code> は <code>/about</code>{" "}
              のようなきれいな URL になりますが、 サーバー側で「すべてのパスを{" "}
              <code>index.html</code> に返す」フォールバック設定が必要です。
              静的ホスティングなどで設定が難しい場合は{" "}
              <code>createWebHashHistory()</code>（<code>/#/about</code>
              形式）を使えばサーバー設定なしで動きます。
            </InfoBox>
          </section>

          {/* router-link と router-view */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リンクと描画先（router-link / router-view）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>router-link</code> は遷移用のリンクで、<code>to</code>{" "}
              に遷移先を渡します（文字列パス、または <code>name</code> +{" "}
              <code>params</code> のオブジェクト）。
              現在のルートに一致したリンクには自動で{" "}
              <code>router-link-active</code> クラスが付くので、
              ナビの「現在地」表示に使えます。 一致したコンポーネントは{" "}
              <code>router-view</code> の位置に描画されます。
            </p>

            <CodeBlock
              language="html"
              title="src/App.vue — ナビゲーションと描画先"
              code={`<script setup lang="ts">
// router-link / router-view はグローバル登録済みのため import 不要
</script>

<template>
  <nav class="nav">
    <!-- 文字列パスで指定 -->
    <router-link to="/">ホーム</router-link>
    <router-link to="/about">アバウト</router-link>
    <!-- name + params で指定（パスの組み立てミスを防げる） -->
    <router-link :to="{ name: 'user', params: { id: 42 } }">
      ユーザー 42
    </router-link>
  </nav>

  <!-- 一致したコンポーネントがここに描画される -->
  <main>
    <router-view />
  </main>
</template>

<style scoped>
/* 現在のルートに一致したリンクには router-link-active が自動付与される */
.nav a.router-link-active {
  font-weight: bold;
  color: #42b883;
}
</style>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>router-link</code> は最終的に <code>{"<a>"}</code>{" "}
              要素として描画されますが、クリックを横取りして History API
              で遷移するため、 ページ全体のリロードは起きません。 React Router
              の<code>{"<Link>"}</code> と同じ役割です。
            </p>
          </section>

          {/* useRoute と useRouter */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              現在地を読む / 遷移する（useRoute / useRouter）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>useRoute()</code>{" "}
              は「いまどのルートにいるか」を読む（params・query・path
              など）読み取り専用のオブジェクトです。
              <code>useRouter()</code> は <code>push</code> /{" "}
              <code>replace</code> で「遷移を起こす」命令的な API です。 React
              の<code>useParams()</code> が <code>useRoute().params</code>、
              <code>useNavigate()</code> が <code>useRouter().push()</code>
              に対応します。
            </p>

            <CodeBlock
              language="html"
              title="src/views/User.vue — params と query を読み、遷移する"
              code={`<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// /users/42 → route.params.id === '42'（文字列で来る点に注意）
const userId = computed(() => route.params.id as string)

// /users/42?tab=posts → route.query.tab === 'posts'
const tab = computed(() => (route.query.tab as string) ?? 'profile')

// 同じコンポーネントのまま id だけ変わる遷移は再マウントされない。
// params の変化は watch で拾ってデータを取り直す。
watch(
  () => route.params.id,
  (id) => {
    // fetchUser(id) など。初回も拾うなら { immediate: true } を付ける
  },
)

function goEdit() {
  // 履歴に積む遷移（戻るボタンで戻れる）
  router.push({ name: 'user', params: { id: userId.value }, query: { edit: '1' } })
}

function replaceHome() {
  // 履歴を置き換える遷移（戻るボタンで戻れない。リダイレクト向き）
  router.replace('/')
}
</script>

<template>
  <section>
    <h1>ユーザー {{ userId }}</h1>
    <p>タブ: {{ tab }}</p>
    <button @click="goEdit">編集</button>
    <button @click="replaceHome">ホームへ（置き換え）</button>
  </section>
</template>`}
            />

            <InfoBox
              type="warning"
              title="useRoute は読み取り、useRouter は遷移"
            >
              役割を取り違えやすいので整理します。
              <strong>useRoute</strong>{" "}
              は「現在地の情報を読む」もので、これ自体を書き換えても遷移はしません。
              実際に URL を変えたいときは <strong>useRouter</strong> の{" "}
              <code>push</code>（履歴に積む）/ <code>replace</code>
              （履歴を置き換える）を呼びます。 テンプレート内のリンクは{" "}
              <code>router-link</code>、 イベントハンドラなど JS
              から遷移するときは <code>useRouter</code> と使い分けます。
            </InfoBox>
          </section>

          {/* React Router との対応 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              React Router との対応表
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              概念はほぼ 1 対 1 で対応します。 React で慣れた API を Vue Router
              の語彙に置き換えるだけで読めます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      React Router
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      Vue Router
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reactMapping.map((m) => (
                    <tr key={m.react} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {m.react}
                      </td>
                      <td className="py-2 px-4 font-mono text-primary whitespace-nowrap align-top">
                        {m.vue}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {m.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="動的ルート /users/:id を定義したとき、コンポーネント内で id の値を取り出す方法はどれ？"
              options={[
                { label: "useRouter().params.id" },
                { label: "useRoute().params.id", correct: true },
                { label: "this.$props.id" },
                { label: "useParams().id" },
              ]}
              explanation="現在地（params / query / path など）の読み取りは useRoute() です。/users/:id にアクセスすると useRoute().params.id に値（文字列）が入ります。useRouter() は push / replace で遷移を起こす命令的な API なので params は持ちません。useParams は React Router の API で、Vue Router には存在しません。"
            />
          </section>

          {/* ナビゲーションガード */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ナビゲーションガード（beforeEach で認証）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              遷移の前後に処理を挟めるのが<strong>ナビゲーションガード</strong>
              です。 グローバルガード <code>router.beforeEach</code>{" "}
              はすべての遷移の直前に走り、
              戻り値で「遷移を許可・中止・別の場所へリダイレクト」を制御できます。
              認証が必要なページ（<code>meta.requiresAuth</code>
              ）を未ログインで開いたら
              ログインページへ送る、という定番の使い方です。
            </p>

            <CodeBlock
              language="ts"
              title="src/router/index.ts — meta.requiresAuth で認証ガード"
              code={`// ルートに meta を付けて「認証が必要なページ」を宣言する
const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'login', component: () => import('@/views/Login.vue') },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
]

// すべての遷移の直前に走るグローバルガード
router.beforeEach((to) => {
  const isAuthenticated = Boolean(localStorage.getItem('token'))

  if (to.meta.requiresAuth && !isAuthenticated) {
    // オブジェクトを返すとそこへリダイレクト（戻り先を query に保持）
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // 何も返さない（または true）と遷移を許可。false で中止
})`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>to</code> は遷移先のルート情報です。ガードから{" "}
              <strong>オブジェクトを返す</strong>とその場所へリダイレクト、
              <strong>false を返す</strong>と遷移を中止、
              <strong>何も返さない（または true）</strong>と遷移を許可します。
              ログイン後に元のページへ戻したいときは、上の例のように{" "}
              <code>query.redirect</code> に <code>to.fullPath</code>
              を持たせておきます。
            </p>

            <InfoBox type="success" title="ガードはルート単位でも書ける">
              全遷移共通の <code>router.beforeEach</code> のほかに、
              特定ルートだけに効く <code>beforeEnter</code>
              （routes の各エントリに記述）や、 コンポーネント内ガード（
              <code>onBeforeRouteLeave</code> / <code>onBeforeRouteUpdate</code>
              ）もあります。
              「未保存の変更があるページから離脱しようとしたら確認する」
              といった用途はコンポーネント内ガードが向いています。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="<router-link> の役割として正しいものはどれ？"
              options={[
                {
                  label:
                    "to で指定した先へ、ページ全体をリロードせずに遷移するリンクを描画する",
                  correct: true,
                },
                { label: "現在のルートの params を読み取る" },
                { label: "一致したコンポーネントを描画する場所を示す" },
                { label: "遷移の前に認証チェックを挟む" },
              ]}
              explanation="<router-link> は to で遷移先を指定するリンク（最終的に <a> として描画）で、クリックを横取りして History API で遷移するためページ全体のリロードは起きません。params の読み取りは useRoute、描画先は <router-view>、遷移前のチェックはナビゲーションガード（beforeEach 等）の役割です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vue Router 公式 - はじめに",
                  url: "https://router.vuejs.org/",
                  description:
                    "createRouter / router-link / router-view の基本構成",
                },
                {
                  title: "Vue Router 公式 - 動的なルートマッチング",
                  url: "https://router.vuejs.org/guide/essentials/dynamic-matching.html",
                  description: "/users/:id のような動的ルートと params の扱い",
                },
                {
                  title: "Vue Router 公式 - ナビゲーションガード",
                  url: "https://router.vuejs.org/guide/advanced/navigation-guards.html",
                  description:
                    "beforeEach / beforeEnter / コンポーネント内ガード",
                },
                {
                  title: "Vue Router 公式 - 遅延ローディング",
                  url: "https://router.vuejs.org/guide/advanced/lazy-loading.html",
                  description: "動的 import によるルート単位のコード分割",
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
