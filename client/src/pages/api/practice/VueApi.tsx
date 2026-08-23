import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const layers = [
  {
    name: "Composition API（ref + onMounted + fetch）",
    role: "依存ゼロの素の実装。loading / error / data を自分で ref に持つ。仕組みを理解する基礎。",
  },
  {
    name: "VueUse useFetch",
    role: "リアクティブな URL の変化で自動再取得。isFetching / error / data を最初から提供する薄いラッパー。",
  },
  {
    name: "Pinia（store + actions）",
    role: "複数コンポーネントで共有するサーバ状態をストアに集約。取得ロジックを actions に寄せる。",
  },
  {
    name: "TanStack Query（@tanstack/vue-query）",
    role: "キャッシュ・再取得・重複排除をライブラリに任せる。useQuery で宣言的に書く。",
  },
];

export default function VueApi() {
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
            Vue での API 連携
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Vue 3 では、API から取得したデータをどこに持たせ、いつ取りに行くかを
            自分で組み立てます。素の Composition API から始め、VueUse の
            useFetch、 Pinia による状態の集約、TanStack Query
            のキャッシュ機構まで、 規模に応じた選択肢を実装で見ていきます。型は
            openapi-typescript で サーバの契約とそろえます。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "Vue 3",
            "Composition API",
            "VueUse",
            "Pinia",
            "TanStack Query",
          ]}
        >
          <p>
            Vue 3 の <code>{"<script setup>"}</code>{" "}
            では、状態をリアクティブに持つ手段（<code>ref</code> /{" "}
            <code>reactive</code>）と副作用のタイミング（<code>onMounted</code>{" "}
            等）が明確に分かれています。 そのため
            <strong>
              「取得した値をどこに置くか」を設計判断として選べます
            </strong>
            。 1 コンポーネント内で完結するならローカルの
            ref、画面をまたいで共有するなら
            Pinia、キャッシュや再取得を任せたいなら TanStack Query、というように
            規模に合わせて手段を足していけるのが Vue の API 連携です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 全体像 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              4 つの選択肢を規模で使い分ける
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Vue で API を叩く方法は 1
              つではありません。下にいくほど機能が増え、 依存も増えます。
              <strong>小さく始めて、必要になったら足す</strong>のが
              基本方針です。まずは全体像を整理します。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      手段
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {layers.map((l) => (
                    <tr key={l.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary align-top">
                        {l.name}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {l.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox
              type="info"
              title="Composition API は土台、ライブラリは省力化"
            >
              VueUse・Pinia・TanStack Query はいずれも Composition API
              の上に乗る ライブラリです。<code>ref</code> と{" "}
              <code>onMounted</code> で手書きする流れを理解しておくと、
              各ライブラリが「どの手間を肩代わりしているか」が
              分かり、選択を誤りにくくなります。
            </InfoBox>
          </section>

          {/* Composition API */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Composition API — ref と onMounted で素の fetch
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              まずは依存ゼロの基本形です。<code>{"<script setup>"}</code> の中で{" "}
              <code>ref</code> を 3 つ用意し（<code>data</code> /{" "}
              <code>loading</code> / <code>error</code>）、
              <code>onMounted</code> でコンポーネントの初回マウント時に{" "}
              <code>fetch</code> を呼びます。 テンプレートはこの 3
              状態を見て表示を切り替えます。
            </p>

            <CodeBlock
              language="html"
              title="UserList.vue — SFC 全体（template + script setup）"
              code={`<template>
  <p v-if="loading">読み込み中...</p>
  <p v-else-if="error">エラー: {{ error }}</p>
  <ul v-else>
    <li v-for="user in data" :key="user.id">{{ user.name }}</li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface User {
  id: number
  name: string
}

const data = ref<User[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await fetch('/api/users')
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
    data.value = await res.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
})
</script>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ポイントは 3 つです。
              <strong>
                ref の中身は <code>.value</code>
              </strong>{" "}
              で読み書きすること（テンプレート内では自動で展開されるので不要）。
              <strong>
                <code>onMounted</code> はマウント後に 1 回だけ走る
              </strong>
              こと。
              <strong>
                <code>finally</code> で必ず loading を下ろす
              </strong>
              こと。 エラー時に loading が立ったまま固まる事故を防げます。
            </p>

            <InfoBox type="warning" title="onMounted は SSR では走らない">
              <code>onMounted</code> はクライアントのマウント後フックです。Nuxt
              の ようなサーバサイドレンダリング環境では、サーバ側で{" "}
              <code>onMounted</code> 内の fetch は実行されません。 SSR
              でサーバ側でも取得したい場合は、Nuxt の <code>useFetch</code> /{" "}
              <code>useAsyncData</code> など SSR 対応の composable
              を使います（この章は SPA 前提です）。
            </InfoBox>
          </section>

          {/* VueUse useFetch */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              VueUse の useFetch — リアクティブ URL で自動再取得
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              手書きの定型を減らすなら VueUse の <code>useFetch</code> です。
              戻り値として <code>data</code> / <code>error</code> /{" "}
              <code>isFetching</code>{" "}
              などのリアクティブな状態がまとめて手に入ります。 さらに{" "}
              <strong>
                URL に ref を渡すと、その値が変わるたびに自動で再取得
              </strong>{" "}
              します。
            </p>

            <CodeBlock
              language="ts"
              title="useFetch — リアクティブな URL で再取得 + JSON パース"
              code={`import { ref, computed } from 'vue'
import { useFetch } from '@vueuse/core'

const userId = ref(1)
// userId が変わると url が変わり、自動で再取得される
const url = computed(() => \`/api/users/\${userId.value}\`)

// .json() で JSON としてパースし、refetch で手動再取得も可能
const { data, error, isFetching, execute } = useFetch(url, {
  refetch: true, // url（ref/computed）の変化で自動再取得
}).json<User>()

interface User {
  id: number
  name: string
}

// userId.value = 2 にするだけで再取得が走る
// execute() を呼べば同じ URL でも手動で取り直せる`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              手書き版と比べると、<code>loading</code> 相当の{" "}
              <code>isFetching</code>、エラー、データの 3
              状態を自分で組まずに済みます。
              <code>.json{"<User>"}()</code> を付けると <code>data</code> が{" "}
              <code>User</code> 型として扱えます。URL がリアクティブなので、
              検索ボックスやページャと組み合わせると、入力に応じた再取得が自然に書けます。
            </p>

            <InfoBox type="info" title="useFetch は fetch の薄いラッパー">
              VueUse の <code>useFetch</code> はブラウザ標準の{" "}
              <code>fetch</code> を
              リアクティブに包んだものです。キャッシュや重複リクエストの排除までは
              面倒を見ません。 そこまで欲しくなったら、後述の TanStack Query
              に乗り換えるのが素直です。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="素の Composition API（ref + onMounted + fetch）に対して、VueUse の useFetch を使う主な利点は？"
              options={[
                {
                  label:
                    "loading / error / data の状態と、URL の変化に応じた自動再取得を自分で書かずに済む",
                  correct: true,
                },
                {
                  label: "fetch より高速にネットワークリクエストを送れる",
                },
                {
                  label: "SSR でサーバ側のレンダリング時に必ず実行される",
                },
                {
                  label: "ref を使わずに状態を持てるようになる",
                },
              ]}
              explanation="useFetch は fetch をリアクティブに包んだもので、isFetching / error / data をまとめて返し、ref/computed の URL が変われば自動で再取得します。手書きの定型コードを減らすのが目的で、ネットワーク速度や SSR 実行を変えるものではありません。状態は内部でも ref で持たれています。"
            />
          </section>

          {/* Pinia */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Pinia — 画面をまたぐサーバ状態を store に集約
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              取得したデータを複数のコンポーネントで共有したい、取得ロジックを
              一箇所にまとめたい——そんなときは Pinia です。
              <code>defineStore</code> で <code>state</code>（持つデータ）と{" "}
              <code>actions</code>（取得・更新の処理）を
              定義し、コンポーネントからは <code>actions</code>{" "}
              を呼ぶだけにします。
            </p>

            <CodeBlock
              language="ts"
              title="stores/users.ts — actions で fetch する Setup Store"
              code={`import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  name: string
}

export const useUsersStore = defineStore('users', () => {
  // state: リアクティブな共有データ
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // action: サーバから取得して state を更新する
  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('/api/users')
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
      users.value = await res.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
    } finally {
      loading.value = false
    }
  }

  return { users, loading, error, fetchUsers }
})`}
            />

            <CodeBlock
              language="html"
              title="コンポーネント側 — store を呼び出して使う"
              code={`<template>
  <button @click="store.fetchUsers()">再読み込み</button>
  <p v-if="store.loading">読み込み中...</p>
  <ul v-else>
    <li v-for="u in store.users" :key="u.id">{{ u.name }}</li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'

const store = useUsersStore()
onMounted(() => store.fetchUsers())
</script>`}
            />

            <InfoBox type="info" title="Composition API と Pinia の役割分担">
              Composition API
              は「このコンポーネントの中の状態と副作用」を扱う道具です。 Pinia
              はそれを<strong>コンポーネントの外に出して共有・再利用</strong>
              するための ストアです。 1 画面で閉じる取得はローカルの ref
              で十分、 ヘッダーのユーザー情報やカート内容のように
              <strong>複数画面で同じ状態を見る</strong>
              ものは Pinia に置く、と切り分けると迷いません。
            </InfoBox>
          </section>

          {/* TanStack Query */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              TanStack Query（Vue 版）— キャッシュと再取得を任せる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              サーバ状態のキャッシュ、バックグラウンド再取得、重複リクエストの排除まで
              欲しくなったら <code>@tanstack/vue-query</code> です。React
              版と同じ <code>useQuery</code> を Vue の Composition API
              として使えます。
              キーごとにキャッシュされ、同じデータを複数箇所で参照しても 1
              回しか取りに行きません。
            </p>

            <CodeBlock
              language="ts"
              title="useQuery — queryKey でキャッシュ、queryFn で取得"
              code={`import { useQuery } from '@tanstack/vue-query'

interface User {
  id: number
  name: string
}

// data / isPending / isError はリアクティブな ref
const { data, isPending, isError, error } = useQuery({
  queryKey: ['users'],
  queryFn: async (): Promise<User[]> => {
    const res = await fetch('/api/users')
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
    return res.json()
  },
})

// queryKey が同じなら他のコンポーネントとキャッシュを共有する`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              使う前に <code>app.use(VueQueryPlugin)</code>{" "}
              でプラグインを登録します。 戻り値の <code>data</code> /{" "}
              <code>isPending</code> / <code>isError</code>{" "}
              はすべてリアクティブなので、テンプレートではそのまま{" "}
              <code>{"{{ }}"}</code> や <code>v-if</code> で参照できます。
              「鮮度が切れたら裏で取り直す」といった挙動を自前で書かずに済むのが利点です。
            </p>
          </section>

          {/* 型安全 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              型安全 — openapi-typescript でサーバと型をそろえる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここまでの例では <code>interface User</code> を手書きしましたが、
              サーバの OpenAPI 仕様があるなら <code>openapi-typescript</code> で
              型を自動生成できます。
              <strong>サーバの契約が変われば型も変わる</strong>ので、
              フィールド名の変更や型のズレをビルド時に検知できます。
            </p>

            <CodeBlock
              language="bash"
              title="OpenAPI スキーマから型を生成する"
              code={`# サーバの openapi.json から TypeScript の型定義を生成
npx openapi-typescript ./openapi.json -o ./src/types/api.d.ts`}
            />

            <InfoBox
              type="warning"
              title="id が int か文字列かは契約のズレの典型"
            >
              生成された型では、<code>id</code> がサーバ仕様どおり{" "}
              <code>number</code> なのか <code>string</code>{" "}
              なのかが明確になります。手書きの型で <code>id: number</code>{" "}
              と決め打ちしていると、サーバが文字列 ID
              を返した瞬間に実行時まで気づけません。 また OpenAPI の{" "}
              <code>object</code>（<code>additionalProperties</code>）は{" "}
              <code>{"{ [key: string]: unknown }"}</code> にマップされます （
              <code>any</code> ではありません）。<code>unknown</code> なので、
              使う前に型を絞る必要があり、これがズレの早期発見につながります。
            </InfoBox>
          </section>

          {/* CORS の注意 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              開発時の落とし穴 — ポート違いは別オリジン
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Vite の開発サーバ（例 <code>:5173</code>）から別ポートの API（例{" "}
              <code>:8000</code>）を直接叩くと、ブラウザは
              <strong>別オリジン</strong>
              とみなし CORS を強制します。ポートが違うだけで別オリジンです。
              <code>fetch</code> は失敗しても、同じ URL を <code>curl</code>{" "}
              では成功する——という食い違いは、CORS
              がブラウザだけの仕組みだからです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  ブラウザは CORS を強制する
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <code>:5173 → :8000</code>{" "}
                  はポート違いで別オリジン。非単純リクエストでは preflight の{" "}
                  <code>OPTIONS</code> が本リクエストの前に飛ぶ。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  curl / サーバ間は CORS 無視
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  同じリクエストでも <code>curl</code> やサーバ同士の通信は CORS
                  の対象外。「curl で通るのに ブラウザで失敗」はこれが原因。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              回避の定番は、フロントと同一オリジンのプロキシを挟むことです。Vite
              なら <code>server.proxy</code> で <code>/api</code>{" "}
              をバックエンドへ転送すれば、ブラウザからは同一オリジンに見えて
              CORS を避けられます。 Nuxt を使う場合は <code>server/api</code>
              （Nitro）を BFF にすると、 ブラウザは同一オリジンの Nuxt
              サーバだけを叩くため CORS を回避できます。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Composition API で「ref + onMounted」を使って fetch するとき、onMounted を使う理由として正しいのは？"
              options={[
                {
                  label:
                    "コンポーネントのマウント後に 1 回だけ副作用（fetch）を実行するため",
                  correct: true,
                },
                {
                  label: "onMounted の中でしか ref を宣言できないため",
                },
                {
                  label: "onMounted を使うと CORS を回避できるため",
                },
                {
                  label: "fetch は onMounted の外では呼び出せないため",
                },
              ]}
              explanation="onMounted はコンポーネントがマウントされた後に呼ばれるライフサイクルフックで、初回データ取得のような副作用を 1 回だけ走らせるのに適しています。ref はどこでも宣言でき、fetch もどこからでも呼べます。CORS の回避とは無関係です。"
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              選び方のまとめ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              4
              つの手段は排他ではなく、積み重ねです。状況に応じて足し引きします。
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  1 コンポーネントで完結する取得:
                </span>{" "}
                素の <code>ref</code> + <code>onMounted</code> +{" "}
                <code>fetch</code>。 依存を増やさず仕組みも見通せる。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  入力に応じた再取得を手軽に:
                </span>{" "}
                VueUse の <code>useFetch</code>。リアクティブな URL
                で自動再取得、
                <code>isFetching</code> / <code>error</code> / <code>data</code>{" "}
                付き。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  画面をまたぐ共有状態:
                </span>{" "}
                Pinia。取得ロジックを <code>actions</code>{" "}
                に寄せ、複数画面で同じ <code>state</code> を参照する。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  キャッシュ・再取得を任せる:
                </span>{" "}
                TanStack Query（<code>@tanstack/vue-query</code>）の{" "}
                <code>useQuery</code>。<code>queryKey</code> でキャッシュ共有。
              </li>
            </ul>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vue.js - Composition API（公式）",
                  url: "https://vuejs.org/guide/extras/composition-api-faq.html",
                  description:
                    "ref / reactive / ライフサイクルフックなど Composition API の公式ガイド",
                },
                {
                  title: "VueUse - useFetch",
                  url: "https://vueuse.org/core/usefetch/",
                  description:
                    "リアクティブな URL での自動再取得、isFetching / error / data の API リファレンス",
                },
                {
                  title: "Pinia 公式ドキュメント",
                  url: "https://pinia.vuejs.org/",
                  description:
                    "defineStore / state / actions による Vue 公式の状態管理ライブラリ",
                },
                {
                  title: "TanStack Query - Vue",
                  url: "https://tanstack.com/query/latest/docs/framework/vue/overview",
                  description:
                    "useQuery によるサーバ状態のキャッシュ・再取得を扱う Vue 版ドキュメント",
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
