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

const hooks = [
  {
    name: "onBeforeMount",
    timing: "マウント直前",
    use: "DOM 生成前に走る初期処理。DOM 参照はまだ使えない",
  },
  {
    name: "onMounted",
    timing: "DOM マウント後",
    use: "データ取得・イベント登録・DOM 参照の利用・外部ライブラリの初期化",
  },
  {
    name: "onBeforeUpdate",
    timing: "再レンダー直前",
    use: "更新前の DOM 状態を読む（スクロール位置の退避など）",
  },
  {
    name: "onUpdated",
    timing: "再レンダー後",
    use: "更新後の DOM を参照する処理。状態更新を入れると無限ループに注意",
  },
  {
    name: "onBeforeUnmount",
    timing: "破棄直前",
    use: "まだ動いているインスタンスへの最終アクセス",
  },
  {
    name: "onUnmounted",
    timing: "破棄後",
    use: "イベント解除・タイマー解除・購読解除などのクリーンアップ",
  },
];

const reactMap = [
  {
    react: "useEffect(() => {...}, [])",
    vue: "onMounted(() => {...})",
    note: "依存配列が空 = マウント時に 1 回だけ実行",
  },
  {
    react: "useEffect の return () => {...}",
    vue: "onUnmounted(() => {...})",
    note: "クリーンアップ。解除・破棄処理をここに集める",
  },
  {
    react: "useEffect(() => {...}) （依存なし）",
    vue: "onUpdated(() => {...})",
    note: "毎レンダー後。Vue はリアクティブ依存で更新が決まる",
  },
  {
    react: "（明示的な相当なし）",
    vue: "onBeforeMount / onBeforeUpdate",
    note: "DOM 反映前のフックは React には直接の対応がない",
  },
];

export default function Lifecycle() {
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
            ライフサイクルフック
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            コンポーネントが生成され、画面に表示され、やがて破棄されるまでには決まった段階があります。
            その節目に処理を差し込むのがライフサイクルフックです。Composition
            API では <code>onMounted</code> や <code>onUnmounted</code>{" "}
            といった関数を <code>{"<script setup>"}</code>{" "}
            内で呼ぶだけで登録できます。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "onMounted",
            "onUnmounted",
            "クリーンアップ",
            "SSR",
            "useEffect 対応",
          ]}
        >
          <p>
            データ取得・イベント登録・タイマー・外部ライブラリの初期化は「いつ実行するか」が品質に直結します。
            マウント後に走らせ、破棄時に必ず後始末する——この型を覚えると、リスナーの解除漏れによるメモリリークや、
            DOM がまだ無い段階での参照エラーを避けられます。React の{" "}
            <code>useEffect</code>{" "}
            を知っていれば、対応関係で一気に理解できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              コンポーネントのライフサイクル
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              コンポーネントは生成から破棄まで決まった順序でフックが呼ばれます。全体の流れを図で押さえます。
            </p>
            <MermaidDiagram
              title="コンポーネントのライフサイクル（図）"
              chart={`flowchart TD
  A["setup 実行"] --> B["onBeforeMount"]
  B --> C["DOM マウント"]
  C --> D["onMounted (取得・登録)"]
  D --> E["状態変化で onUpdated"]
  E --> F["onBeforeUnmount"]
  F --> G["onUnmounted (クリーンアップ)"]`}
            />
          </section>
          {/* ライフサイクルの流れ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ライフサイクルの全体像
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              コンポーネントは「生成 → マウント → 更新（くり返し） →
              破棄」という流れをたどります。 Composition API のフックはすべて{" "}
              <code>on</code> プレフィックスの関数で、
              <code>{"<script setup>"}</code> の中で呼びます。import
              が必要な点が React の useEffect との違いです。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      フック
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      呼ばれる時点
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      主な用途
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hooks.map((h) => (
                    <tr key={h.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {h.name}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground whitespace-nowrap align-top">
                        {h.timing}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {h.use}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              よく使うのは <code>onMounted</code> と <code>onUnmounted</code> の
              2 つです。 まずこの 2 つを「セットで使う」習慣をつけると、
              登録したものを破棄し忘れる事故が減ります。
            </p>
          </section>

          {/* onMounted */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              onMounted — マウント後にデータを取得する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>onMounted</code> はコンポーネントの DOM
              が画面に挿入された直後に 1 回だけ呼ばれます。 DOM
              参照が使える状態なので、初回のデータ取得や DOM
              を前提とした処理の起点になります。 React の{" "}
              <code>
                useEffect(() ={">"} {"{...}"}, [])
              </code>{" "}
              （依存配列が空）に対応します。
            </p>

            <CodeBlock
              language="html"
              title="UserList.vue — onMounted で初回データ取得"
              code={`<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface User {
  id: number
  name: string
}

const users = ref<User[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await fetch('https://example.com/api/users')
    if (!res.ok) throw new Error('取得に失敗しました')
    users.value = await res.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : '不明なエラー'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <p v-if="loading">読み込み中…</p>
  <p v-else-if="error">{{ error }}</p>
  <ul v-else>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>`}
            />

            <InfoBox
              type="info"
              title="onMounted はクライアントでのみ走る（SSR では呼ばれない）"
            >
              <p className="mb-2">
                Nuxt などサーバーサイドレンダリング（SSR）環境では、
                サーバー側のレンダリング時に <code>onMounted</code>{" "}
                は呼ばれません。マウントはブラウザ側でだけ起こるためです。
              </p>
              <p>
                そのため <code>window</code> / <code>document</code> /{" "}
                <code>localStorage</code> などブラウザ専用 API を触る処理は{" "}
                <code>onMounted</code> の中に置くのが安全です。SSR
                で確実にデータを揃えたい場合は <code>useFetch</code> /{" "}
                <code>useAsyncData</code>{" "}
                を使い分けます（データ取得の章で扱います）。
              </p>
            </InfoBox>
          </section>

          {/* onUnmounted */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              onUnmounted — 破棄時にクリーンアップする
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              コンポーネントが画面から取り除かれるとき、
              登録したイベントリスナーやタイマーは自動では消えません。 これらを{" "}
              <code>onUnmounted</code>{" "}
              で明示的に解除しないと、破棄されたはずのコンポーネントの処理が動き続け、
              メモリリークの原因になります。React の <code>useEffect</code> の{" "}
              <code>return</code> で返すクリーンアップ関数に対応します。
            </p>

            <CodeBlock
              language="html"
              title="WindowSize.vue — リスナーとタイマーを登録・解除する"
              code={`<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const width = ref(window.innerWidth)
const seconds = ref(0)

let timer: number | undefined

function handleResize() {
  width.value = window.innerWidth
}

onMounted(() => {
  // イベント登録
  window.addEventListener('resize', handleResize)
  // タイマー登録
  timer = window.setInterval(() => {
    seconds.value++
  }, 1000)
})

onUnmounted(() => {
  // 登録したものを必ず解除する
  window.removeEventListener('resize', handleResize)
  if (timer !== undefined) window.clearInterval(timer)
})
</script>

<template>
  <p>ウィンドウ幅: {{ width }}px</p>
  <p>表示してから {{ seconds }} 秒</p>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ポイントは <code>onMounted</code> で登録したものと{" "}
              <code>onUnmounted</code> で解除するものを
              <strong>1 対 1 で対応させる</strong>ことです。
              <code>addEventListener</code> には{" "}
              <code>removeEventListener</code>、<code>setInterval</code> には{" "}
              <code>clearInterval</code> を、同じ関数参照・同じ ID
              を使って必ずペアで書きます。
            </p>

            <InfoBox type="warning" title="リスナー・タイマーの解除漏れに注意">
              解除を忘れると、コンポーネントが消えた後も{" "}
              <code>handleResize</code>{" "}
              が呼ばれ続けたり、タイマーが回り続けたりします。 すでに存在しない{" "}
              <code>ref</code> を更新しようとして例外になることもあります。
              「登録したら同じ場所で解除を書く」を癖にすると安全です。
            </InfoBox>
          </section>

          {/* その他のフック */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              更新まわりのフック（onBeforeMount / onUpdated / onBeforeUnmount）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>onMounted</code> / <code>onUnmounted</code>{" "}
              ほど頻繁ではありませんが、節目ごとのフックも用意されています。
              いずれも同じく <code>{"<script setup>"}</code>{" "}
              内で呼ぶだけで登録できます。
            </p>

            <CodeBlock
              language="ts"
              title="登録できる主なフック"
              code={`import {
  onBeforeMount,  // マウント直前（DOM 生成前）
  onMounted,      // マウント後（DOM 参照可）
  onBeforeUpdate, // 再レンダー直前
  onUpdated,      // 再レンダー後（更新後の DOM を参照可）
  onBeforeUnmount,// 破棄直前
  onUnmounted,    // 破棄後（クリーンアップ）
} from 'vue'`}
            />

            <InfoBox type="error" title="onUpdated で状態を更新しない">
              <code>onUpdated</code> の中でリアクティブな状態（<code>ref</code>{" "}
              など）を更新すると、その更新が再レンダーを引き起こし、 再び{" "}
              <code>onUpdated</code> が呼ばれて無限ループになります。
              <code>onUpdated</code> は「更新後の DOM
              を読む」用途にとどめ、状態の書き換えは別の場所で行います。
            </InfoBox>
          </section>

          {/* React 対応表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              React の useEffect との対応
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              React 経験者は <code>useEffect</code>{" "}
              の知識をそのまま流用できます。 ただし Vue はフックが
              <strong>役割ごとに名前で分かれている</strong>ため、
              「依存配列の書き方」で挙動を変える必要がない点が違います。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      React
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      Vue 3
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      メモ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reactMap.map((r) => (
                    <tr key={r.vue} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary align-top">
                        {r.react}
                      </td>
                      <td className="py-2 px-4 font-mono text-foreground align-top">
                        {r.vue}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {r.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="watch / watchEffect との使い分け">
              特定の値が変わったタイミングで処理したい場合は、ライフサイクルフックではなく{" "}
              <code>watch</code> / <code>watchEffect</code>{" "}
              を使います。ライフサイクルフックは「コンポーネントの生死」に、
              watch
              系は「値の変化」に対応する、と整理すると迷いません（リアクティビティの章で扱います）。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="マウント後に 1 回だけ API からデータを取得したい。最も適切なフックはどれ？"
              options={[
                { label: "onBeforeMount（DOM 生成前なので参照できない）" },
                {
                  label: "onMounted（DOM マウント後に 1 回だけ走る）",
                  correct: true,
                },
                { label: "onUpdated（再レンダーのたびに走る）" },
                { label: "onUnmounted（破棄時に走る）" },
              ]}
              explanation="初回のデータ取得は onMounted が定石です。DOM がマウントされた直後に 1 回だけ呼ばれ、React の useEffect(() => {...}, []) に対応します。onBeforeMount はまだ DOM が無く、onUpdated は更新のたびに走るため初回取得には不向きです。onUnmounted は破棄時のクリーンアップ用です。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="onMounted で window.addEventListener と setInterval を登録した。破棄時にすべきことは？"
              options={[
                {
                  label:
                    "onUnmounted で removeEventListener と clearInterval を呼び、登録したものを解除する",
                  correct: true,
                },
                { label: "何もしなくても Vue が自動で全部解除してくれる" },
                { label: "onUpdated でリスナーを再登録し直す" },
                { label: "コンポーネントを再マウントすれば解除される" },
              ]}
              explanation="addEventListener や setInterval で登録したものは自動では解除されません。onUnmounted で removeEventListener と clearInterval を、登録時と同じ関数参照・同じタイマー ID を使ってペアで解除します。これを怠ると、破棄後も処理が動き続けてメモリリークや例外の原因になります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vue 公式 - ライフサイクルフック",
                  url: "https://ja.vuejs.org/guide/essentials/lifecycle.html",
                  description:
                    "マウント・更新・破棄の各フックと呼ばれる順序の解説（日本語）",
                },
                {
                  title: "Vue 公式 - Composition API: ライフサイクルフック API",
                  url: "https://ja.vuejs.org/api/composition-api-lifecycle.html",
                  description:
                    "onMounted / onUnmounted など各関数の API リファレンス（日本語）",
                },
                {
                  title: "Nuxt 公式 - Rendering Modes",
                  url: "https://nuxt.com/docs/guide/concepts/rendering",
                  description:
                    "SSR でクライアント専用処理をどこに置くかの判断材料",
                },
                {
                  title: "Vue 公式 - watch とライフサイクル",
                  url: "https://ja.vuejs.org/guide/essentials/watchers.html",
                  description:
                    "値の変化に応じた処理（watch / watchEffect）との使い分け（日本語）",
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
