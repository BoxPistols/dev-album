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

const apiMap = [
  {
    api: "computed",
    react: "useMemo",
    purpose: "依存から派生した値を作る（キャッシュあり）",
  },
  {
    api: "watch",
    react: "useEffect（依存配列あり）",
    purpose: "特定のソースの変化に反応して副作用を実行する",
  },
  {
    api: "watchEffect",
    react: "useEffect（依存配列なし・自動収集）",
    purpose: "依存を自動収集して即時実行する副作用",
  },
];

export default function ComputedWatch() {
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
            computed と watch
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            状態から「別の値を作る」のが <code>computed</code>、状態の変化に
            「反応して何かをする」のが <code>watch</code> /{" "}
            <code>watchEffect</code> です。 この役割分担を最初に押さえると、Vue
            のリアクティビティは一気に整理されます。
          </p>
        </div>

        <WhyNowBox
          tags={["computed", "watch", "watchEffect", "派生状態", "Vue 3.5"]}
        >
          <p>
            「画面に出す合計金額」のような<strong>派生値</strong>は{" "}
            <code>computed</code>、「保存する」「ログを送る」「URL
            を書き換える」のような
            <strong>副作用</strong>は <code>watch</code> /{" "}
            <code>watchEffect</code> に分けます。 React の <code>useMemo</code>{" "}
            / <code>useEffect</code>
            と対応づけて覚えると、どちらを使うか迷わなくなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              computed と watch の使い分け
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              値を導出したいなら computed、変化に反応して副作用を起こしたいなら watch、という判断軸を図にします。
            </p>
            <MermaidDiagram
              title="computed と watch の使い分け（図）"
              chart={`flowchart TD
  Q{"何をしたい?"} -->|"値を導出する"| C["computed (キャッシュされる)"]
  Q -->|"変化に反応して副作用"| W["watch / watchEffect"]
  C --> T["テンプレートで使う"]
  W --> S["API 呼び出し等の副作用"]`}
            />
          </section>

          {/* 全体像 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3 つの API の役割
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              まずは全体像です。React の対応概念と並べると、それぞれの守備範囲が
              はっきりします。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      Vue API
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      React の対応
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiMap.map((row) => (
                    <tr key={row.api} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {row.api}
                      </td>
                      <td className="py-2 px-4 font-mono text-muted-foreground whitespace-nowrap align-top">
                        {row.react}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {row.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              判断の基準はシンプルです。
              <strong>「画面に出したい値そのもの」なら computed</strong>、
              <strong>「値の変化に反応して別のことをしたい」なら watch</strong>
              。 この一文で大半のケースは振り分けられます。
            </p>
          </section>

          {/* computed */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              computed — 依存が変わった時だけ再計算
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>computed</code> は、参照した <code>ref</code> /{" "}
              <code>reactive</code> の値が変わった時だけ再計算し、 それ以外は
              <strong>キャッシュした結果を返します</strong>。React の{" "}
              <code>useMemo</code> と同じく、無駄な再計算を避けられます。
            </p>

            <CodeBlock
              language="html"
              title="computed — 派生値はキャッシュされる"
              code={`<script setup lang="ts">
import { ref, computed } from 'vue'

const price = ref(1000)
const quantity = ref(3)

// price か quantity が変わった時だけ再計算される
const total = computed(() => price.value * quantity.value)

// 何度参照してもキャッシュが返るので関数本体は走らない
console.log(total.value) // 3000
console.log(total.value) // 3000（再計算なし）
</script>

<template>
  <p>単価: {{ price }} 円</p>
  <p>数量: {{ quantity }}</p>
  <p>合計: {{ total }} 円</p>
  <button @click="quantity++">+1</button>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>computed</code> の戻り値も <code>ref</code>{" "}
              と同じく、スクリプトでは <code>.value</code>{" "}
              でアクセスし、テンプレートでは自動でアンラップされます。 既定では
              <strong>読み取り専用</strong>です。
            </p>
          </section>

          {/* computed getter/setter */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              computed の getter / setter
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              関数を 1 つ渡すと読み取り専用ですが、<code>get</code> /{" "}
              <code>set</code> を持つオブジェクトを渡すと
              <strong>書き込み可能な computed</strong>{" "}
              になります。フォームの双方向バインドなどで役立ちます。
            </p>

            <CodeBlock
              language="ts"
              title="書き込み可能な computed（getter / setter）"
              code={`import { ref, computed } from 'vue'

const firstName = ref('Taro')
const lastName = ref('Yamada')

const fullName = computed({
  get() {
    return \`\${firstName.value} \${lastName.value}\`
  },
  set(value: string) {
    // "Taro Yamada" を分解して両方の ref に反映
    const [first, last] = value.split(' ')
    firstName.value = first
    lastName.value = last
  },
})

fullName.value = 'Hanako Suzuki'
console.log(firstName.value) // 'Hanako'`}
            />
          </section>

          {/* watch */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              watch — 特定のソースを監視して副作用を実行
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>watch</code>{" "}
              は「監視するソース」と「変化したときに実行する関数」を
              明示的に渡します。 コールバックは<strong>新しい値と古い値</strong>
              （<code>newValue</code> / <code>oldValue</code>）を受け取れます。
            </p>

            <CodeBlock
              language="html"
              title="watch — newValue / oldValue とオプション"
              code={`<script setup lang="ts">
import { ref, watch } from 'vue'

const keyword = ref('')

watch(
  keyword,
  (newValue, oldValue) => {
    // keyword が変わるたびに実行される（副作用）
    fetchResults(newValue)
    console.log(\`"\${oldValue}" → "\${newValue}"\`)
  },
  {
    immediate: true, // 初回マウント時にも 1 回実行する
    // deep: true,   // オブジェクト内部の変更まで深く監視する
    // once: true,   // 1 回だけ実行して自動で停止する
  }
)

function fetchResults(q: string) {
  // 検索 API を叩くなどの副作用
}
</script>

<template>
  <input v-model="keyword" placeholder="検索キーワード" />
</template>`}
            />

            <InfoBox type="info" title="複数ソースの監視と deep の注意">
              第 1 引数を配列にすると{" "}
              <code>watch([a, b], ([newA, newB]) ={">"} ...)</code>{" "}
              で複数ソースをまとめて監視できます。
              <code>reactive</code> オブジェクトを直接渡すと暗黙に{" "}
              <code>deep</code> 監視になり、 大きなオブジェクトでは
              コストが上がる点に注意してください。必要な部分だけを{" "}
              <code>() ={">"} obj.field</code> のように getter
              で渡すのが安全です。
            </InfoBox>
          </section>

          {/* watchEffect */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              watchEffect — 依存を自動収集して即実行
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>watchEffect</code>{" "}
              は監視ソースを明示しません。関数の中で参照した リアクティブな値を
              <strong>自動で依存として収集</strong>し、
              そのいずれかが変わると再実行します。React の依存配列を書かない{" "}
              <code>useEffect</code> に近い感覚です（ただし依存は自動推論）。
            </p>

            <CodeBlock
              language="ts"
              title="watchEffect — 参照した値を自動で追跡"
              code={`import { ref, watchEffect } from 'vue'

const userId = ref(1)
const token = ref('')

// userId と token を関数内で参照しているので、
// どちらが変わってもこの副作用が再実行される
watchEffect(() => {
  fetchUser(userId.value, token.value)
})
// 初回も即座に 1 回実行される（immediate 相当が既定）

function fetchUser(id: number, t: string) {
  // 取得処理
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>watchEffect</code> は「初回も実行したい」「依存が多くて
              列挙が面倒」な副作用に向きます。一方で「古い値が欲しい」
              「特定のソースだけ厳密に監視したい」場合は <code>watch</code>{" "}
              を選びます。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="入力した商品リストから「合計金額」を画面に表示したい。最も適切なのはどれ？"
              options={[
                {
                  label:
                    "watch でリストを監視し、コールバック内で別の ref に合計を代入する",
                },
                {
                  label:
                    "computed で合計を算出する（依存が変わった時だけ再計算・キャッシュされる）",
                  correct: true,
                },
                {
                  label:
                    "watchEffect の中で DOM を直接書き換えて合計を表示する",
                },
                {
                  label:
                    "毎回テンプレートでループして合計を再計算するだけにする",
                },
              ]}
              explanation="「状態から派生した表示用の値」は computed が第一選択です。computed は依存が変わった時だけ再計算し、結果をキャッシュします。watch で別の ref に値を代入する方法は動きますが、状態が二重に増え、同期漏れやタイミングのバグを招きやすいアンチパターンです。派生値は computed、副作用は watch、と覚えてください。"
            />
          </section>

          {/* onWatcherCleanup */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Vue 3.5: onWatcherCleanup でクリーンアップ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              非同期処理を行う watch では、前の処理が終わる前に次の変化が
              来ることがあります。Vue 3.5 で追加された{" "}
              <code>onWatcherCleanup</code>{" "}
              を使うと、次の実行・コンポーネント破棄の直前に
              クリーンアップ（リクエスト中断など）を登録できます。React の{" "}
              <code>useEffect</code> が返すクリーンアップ関数に相当します。
            </p>

            <CodeBlock
              language="ts"
              title="onWatcherCleanup — 古いリクエストを中断する"
              code={`import { ref, watch, onWatcherCleanup } from 'vue'

const id = ref(1)

watch(id, (newId) => {
  const controller = new AbortController()

  fetch(\`/api/users/\${newId}\`, { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => {
      // 取得したデータを使う
    })

  // 次に id が変わる前（または破棄前）に呼ばれる
  onWatcherCleanup(() => {
    controller.abort() // 古いリクエストを中断
  })
})`}
            />

            <InfoBox type="success" title="watchEffect でも使える">
              <code>onWatcherCleanup</code> は <code>watch</code> /{" "}
              <code>watchEffect</code> の<strong>同期実行中</strong>に呼べます。
              タイマー解除・購読解除・進行中リクエストの中断など、
              「次の実行までに片付けたい処理」をここにまとめると、 リークや
              競合状態を防げます。
            </InfoBox>
          </section>

          {/* 使い分け */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              使い分けの指針
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              迷ったら、次の順で考えると整理できます。
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-foreground mb-2">
                  値が欲しい → computed
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  既存の状態から計算できる表示用の値。フィルタ結果・合計・
                  整形済み文字列など。キャッシュが効く。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-foreground mb-2">
                  反応して動かす → watch
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  特定のソースの変化に対する副作用。API 取得・保存・
                  ルーティング・古い値との比較が必要な処理。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-foreground mb-2">
                  即実行 + 自動依存 → watchEffect
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  初回から走らせたい・依存が多くて列挙が面倒な副作用。
                  古い値は使わないケース向け。
                </p>
              </div>
            </div>

            <InfoBox
              type="warning"
              title="watch で派生値を作るのはアンチパターン"
            >
              「合計を表示したいから <code>watch</code> で別の ref
              に代入する」は避けてください。 同じ情報を 2
              つの状態に持つことになり、片方の更新漏れで表示が
              ずれるバグの温床になります。
              <strong>派生状態は computed を第一選択</strong>とし、
              <code>watch</code>{" "}
              は「状態を作る」のではなく「状態の変化に反応する」用途に限定します。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="computed の「キャッシュ」について正しい説明はどれ？"
              options={[
                {
                  label:
                    "参照した依存が変わらなければ、何度アクセスしても再計算されず前回の結果を返す",
                  correct: true,
                },
                {
                  label: "アクセスするたびに必ず関数本体を再実行する",
                },
                {
                  label: "一度計算したら依存が変わっても二度と更新されない",
                },
                {
                  label: "キャッシュは無効にできず、常に手動でクリアが必要",
                },
              ]}
              explanation="computed は参照している依存（ref / reactive など）が変化した時だけ再計算し、それ以外は前回の結果をキャッシュして返します。依存が変われば自動で再計算されるので「二度と更新されない」わけではありません。同じ計算を複数箇所で参照しても 1 回しか走らないため、重い算出処理ほど computed の恩恵が大きくなります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vue 公式 - 算出プロパティ（Computed）",
                  url: "https://ja.vuejs.org/guide/essentials/computed",
                  description:
                    "computed の基本・キャッシュ・getter / setter の解説（日本語）",
                },
                {
                  title: "Vue 公式 - ウォッチャー（Watchers）",
                  url: "https://ja.vuejs.org/guide/essentials/watchers",
                  description:
                    "watch / watchEffect とオプション、onWatcherCleanup の解説（日本語）",
                },
                {
                  title: "Vue 公式 - リアクティビティ API: コア",
                  url: "https://ja.vuejs.org/api/reactivity-core",
                  description:
                    "computed / watch / watchEffect の API リファレンス（日本語）",
                },
                {
                  title: "Vue 公式 - リアクティビティの基礎",
                  url: "https://ja.vuejs.org/guide/essentials/reactivity-fundamentals",
                  description:
                    "ref / reactive とリアクティビティの仕組み（日本語）",
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
