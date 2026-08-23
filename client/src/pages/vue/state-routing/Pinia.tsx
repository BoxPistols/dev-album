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

const storeParts = [
  {
    part: "state",
    setup: "ref / reactive",
    options: "state() が返すオブジェクト",
    role: "保持するデータ本体",
  },
  {
    part: "getters",
    setup: "computed",
    options: "getters のメソッド",
    role: "state から算出した値（キャッシュされる）",
  },
  {
    part: "actions",
    setup: "通常の関数",
    options: "actions のメソッド",
    role: "state を変更する処理（非同期も書ける）",
  },
];

export default function Pinia() {
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
            Pinia による状態管理
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            複数のコンポーネントで共有する状態（ログイン中のユーザー、カートの中身など）を、
            <strong>Pinia</strong> で一元管理します。Pinia は Vue
            公式の状態管理ライブラリで、 旧 Vuex に代わる現在の推奨です。React
            でいう Redux / Zustand のポジションにあたります。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "Pinia",
            "defineStore",
            "storeToRefs",
            "状態共有",
            "Vuex 後継",
          ]}
        >
          <p>
            propsの受け渡し（props
            drilling）だけで状態を共有しようとすると、階層が深いほど受け渡しが煩雑になります。
            複数の離れたコンポーネントが同じ状態を読み書きする場面では、
            <strong>Pinia</strong>{" "}
            のようなストアに状態を集約する方が見通しが良くなります。 Pinia は
            TypeScript
            との相性が良く、ボイラープレートが少ない点が旧Vuexからの大きな改善です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Pinia の単方向データフロー
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              コンポーネントは action を呼んで state を更新し、state と getters がコンポーネントに反映されます。単方向の流れを図にします。
            </p>
            <MermaidDiagram
              title="Pinia の単方向データフロー（図）"
              chart={`flowchart LR
  C["コンポーネント"] -->|"action 呼び出し"| AC["actions"]
  AC -->|"更新"| ST["state"]
  ST --> G["getters"]
  G --> C
  ST --> C`}
            />
          </section>

          {/* セットアップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              インストールとアプリへの登録
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              create-vue
              で「Pinia」を選んでいれば設定済みです。後から追加する場合は
              <code>pinia</code> をインストールし、
              <code>createPinia()</code> を <code>app.use()</code> に渡します。
            </p>

            <CodeBlock
              language="bash"
              title="Pinia を追加する"
              code={`npm install pinia`}
            />

            <CodeBlock
              language="ts"
              title="src/main.ts — Pinia をアプリに登録"
              code={`import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia()) // これで全コンポーネントからストアを使える
app.mount('#app')`}
            />
          </section>

          {/* defineStore（setup スタイル） */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ストアを定義する（setup スタイル）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>defineStore</code> でストアを定義します。第 1
              引数はストアの一意な ID、第 2
              引数に「ストアの中身を返す関数」を渡すのが
              <strong>setup スタイル</strong>です。コンポーネントの{" "}
              <code>{"<script setup>"}</code> とほぼ同じ書き味で、
              <code>ref</code>（state）・<code>computed</code>
              （getters）・通常の関数（actions）を定義して、 使いたいものを{" "}
              <code>return</code> します。
            </p>

            <CodeBlock
              language="ts"
              title="src/stores/counter.ts — setup スタイルのストア"
              code={`import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 第1引数 'counter' はストアの一意な ID
export const useCounterStore = defineStore('counter', () => {
  // state … ref / reactive で定義する
  const count = ref(0)

  // getters … computed（state から算出、キャッシュされる）
  const doubled = computed(() => count.value * 2)

  // actions … 通常の関数。state を直接書き換えてよい
  function increment() {
    count.value++
  }

  // 使うものだけ return する（これがストアの公開 API になる）
  return { count, doubled, increment }
})`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              setup スタイルでは <code>count.value</code> のように{" "}
              <code>.value</code> でアクセスします（ストア関数の中は
              コンポーネントの <code>{"<script setup>"}</code>{" "}
              と同じ感覚です）。 一方で、
              <code>state</code> / <code>getters</code> / <code>actions</code>{" "}
              というキーを持つオブジェクトを渡す
              <strong>options スタイル</strong>
              も選べます。どちらでも機能は同じなので、
              <code>{"<script setup>"}</code> に慣れているなら setup
              スタイルが移行しやすいです。
            </p>

            <div className="overflow-x-auto mt-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      要素
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      setup スタイル
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      options スタイル
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {storeParts.map((p) => (
                    <tr key={p.part} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {p.part}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {p.setup}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {p.options}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {p.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 利用側 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              コンポーネントから使う（storeToRefs）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ストアは <code>useCounterStore()</code>{" "}
              を呼んで取り出します。ここで重要なのが
              <code>storeToRefs</code> です。ストアの state / getters
              をテンプレートで使いたいとき、 単純に分割代入すると{" "}
              <strong>リアクティビティが切れます</strong>。
              <code>storeToRefs</code> で包むと、各プロパティを ref
              として取り出せるため、 リアクティブなまま分割代入できます。actions
              は ref で包む必要がないため、 ストアから直接取り出します。
            </p>

            <CodeBlock
              language="html"
              title="Counter.vue — storeToRefs でリアクティブに分割代入"
              code={`<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

// state / getters は storeToRefs で取り出す（リアクティビティ維持）
const { count, doubled } = storeToRefs(store)

// actions は関数なので、ストアから直接取り出してよい
const { increment } = store
</script>

<template>
  <div>
    <p>count: {{ count }}</p>
    <p>doubled: {{ doubled }}</p>
    <button @click="increment">+1</button>
  </div>
</template>`}
            />

            <InfoBox
              type="warning"
              title="ストアを直接分割代入するとリアクティビティが切れる"
            >
              <code>{"const { count } = useCounterStore()"}</code>{" "}
              のように直接分割代入すると、その時点の値がコピーされるだけで、
              以降ストアが更新されても画面に反映されません。これは{" "}
              <code>reactive</code> オブジェクトを分割代入したときと同じ罠です。
              <strong>
                state / getters を取り出すときは必ず{" "}
                <code>storeToRefs(store)</code> を経由する
              </strong>
              のが鉄則です。actions は関数なので分割代入しても問題ありません。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="storeToRefs の役割として正しいものはどれ？"
              options={[
                {
                  label:
                    "ストアの state / getters を ref として取り出し、分割代入してもリアクティビティを保つ",
                  correct: true,
                },
                { label: "ストアの actions を非同期化する" },
                {
                  label: "複数のストアを 1 つに結合する",
                },
                {
                  label: "ストアの値を localStorage に永続化する",
                },
              ]}
              explanation="storeToRefs は、ストアの state / getters を ref に変換して取り出すための関数です。ストアをそのまま分割代入すると reactive オブジェクトを分割代入したときと同様にリアクティビティが切れますが、storeToRefs で包めばリアクティブなまま { count, doubled } のように受け取れます。actions は関数なのでこの変換は不要で、ストアから直接取り出します。"
            />
          </section>

          {/* 非同期 action */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              actions で非同期処理（認証ユーザーの例）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              actions の中では <code>async / await</code> で API を呼んで state
              を更新できます。 複数のコンポーネントで共有したい
              「ログイン中のユーザー」のような状態は、ストアにまとめると
              どこからでも同じ状態を読み書きできます。
            </p>

            <CodeBlock
              language="ts"
              title="src/stores/user.ts — 非同期 action を持つストア"
              code={`import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)

  // ログイン状態を算出（getter）
  const isLoggedIn = computed(() => user.value !== null)

  // 非同期 action … API を呼んで state を更新する
  async function fetchUser(id: number) {
    loading.value = true
    try {
      const res = await fetch(\`/api/users/\${id}\`)
      user.value = (await res.json()) as User
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
  }

  return { user, loading, isLoggedIn, fetchUser, logout }
})`}
            />

            <InfoBox type="info" title="ストアは「呼ばれたとき」に初期化される">
              <code>useUserStore()</code>{" "}
              を初めて呼んだタイミングでストアのインスタンスが作られ、
              以降は同じ ID（<code>'user'</code>
              ）のストアを呼ぶと同一インスタンスが返ります。 そのため別々の
              コンポーネントで <code>useUserStore()</code> を呼んでも、同じ
              state を共有できます。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Pinia と provide / inject の使い分けとして適切なものはどれ？"
              options={[
                {
                  label:
                    "アプリ全体で共有しロジック（getter / action）も持たせたい状態は Pinia、特定のツリー内へ値を流し込むだけなら provide / inject",
                  correct: true,
                },
                {
                  label:
                    "Pinia は非推奨なので、状態共有は常に provide / inject を使う",
                },
                {
                  label:
                    "provide / inject はリアクティブにできないため、状態共有には使えない",
                },
                {
                  label:
                    "両者は完全に同じ機能なので、どちらを使っても違いはない",
                },
              ]}
              explanation="Pinia はアプリ全体で共有する状態と、それに付随するロジック（getters / actions）・devtools 連携・SSR 対応までを含む状態管理ライブラリです。一方 provide / inject は、特定のコンポーネントツリー内に値（ref を渡せばリアクティブにもできる）を「prop を介さず流し込む」ための仕組みで、ロジックの集約や devtools 連携は持ちません。アプリ規模の共有状態は Pinia、局所的な依存注入は provide / inject、と使い分けます。"
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Vuex ではなく Pinia を選ぶ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              旧 Vuex は <code>mutations</code> を経由して state
              を変更する設計で、ボイラープレートが多く TypeScript
              の型付けも煩雑でした。Pinia は <code>mutations</code>{" "}
              を廃止し、actions から直接 state を変更できます。 現在は Pinia が
              Vue 公式の推奨であり、 新規プロジェクトでは Pinia
              を選ぶのが標準です。
            </p>
            <InfoBox type="success" title="React 経験者向けの対応づけ">
              Redux の store / reducer / action を 1 つにまとめたのが Pinia の{" "}
              <code>defineStore</code> だと考えると 掴みやすいです。Zustand の{" "}
              <code>create</code> で作るストアにも近く、
              ボイラープレートの少なさという点で Zustand に似た感触です。
              違いは、Pinia の state が Vue のリアクティビティ（<code>ref</code>{" "}
              / <code>reactive</code>） の上に乗っている点です。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Pinia 公式 - はじめに",
                  url: "https://pinia.vuejs.org/introduction.html",
                  description: "Pinia の概要と Vuex との違い（英語）",
                },
                {
                  title: "Pinia 公式 - ストアの定義",
                  url: "https://pinia.vuejs.org/core-concepts/",
                  description:
                    "setup スタイル / options スタイルでの defineStore の書き方",
                },
                {
                  title: "Pinia 公式 - ストアを使う（storeToRefs）",
                  url: "https://pinia.vuejs.org/core-concepts/",
                  description:
                    "storeToRefs でリアクティビティを保って分割代入する",
                },
                {
                  title: "Vue 公式 - 状態管理",
                  url: "https://ja.vuejs.org/guide/scaling-up/state-management",
                  description: "Pinia を含む Vue の状態管理の考え方（日本語）",
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
