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

const compareRows = [
  {
    aspect: "対象の値",
    ref: "プリミティブ・オブジェクト・配列など何でも",
    reactive: "オブジェクト・配列のみ（プリミティブ不可）",
  },
  {
    aspect: "アクセス",
    ref: ".value 経由（template では自動アンラップ）",
    reactive: "そのままプロパティアクセス（.value 不要）",
  },
  {
    aspect: "値の差し替え",
    ref: "count.value = 5 で丸ごと再代入できる",
    reactive: "オブジェクト自体の再代入は追跡が切れる",
  },
  {
    aspect: "分割代入",
    ref: "値を取り出すと .value の参照が切れる",
    reactive: "分割代入でリアクティビティが切れる（要 toRefs）",
  },
];

export default function Reactivity() {
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
            リアクティビティ（ref / reactive）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Vue
            の中核は「状態が変わると画面が自動で追従する」リアクティビティです。
            その入口が <code>ref</code> と <code>reactive</code> の 2 つの API。
            違いと使い分け、そして「リアクティビティが切れる」典型パターンまでを
            実際の SFC で確認します。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "Composition API",
            "ref",
            "reactive",
            "toRefs",
            "リアクティビティ",
          ]}
        >
          <p>
            React の <code>useState</code>
            は「新しい値を返して再レンダリングをトリガーする」モデルですが、Vue
            は<strong>値そのものを書き換える（ミューテーション）</strong>と
            Proxy が変更を検知して再描画します。
            この発想の違いを最初に押さえておくと、
            <code>ref</code> の <code>.value</code> 忘れや
            <code>reactive</code>
            の分割代入といった定番のつまずきを避けられます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リアクティビティの伝播
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              state が変わると、依存している計算・監視・描画が連鎖して更新されます。この依存の流れを図にすると次のようになります。
            </p>
            <MermaidDiagram
              title="リアクティビティの伝播（図）"
              chart={`flowchart LR
  A["ref / reactive (state)"] -->|変更| B["依存を検知"]
  B --> C["computed 再計算"]
  B --> D["watch 発火"]
  C --> E["テンプレート再描画"]
  D --> F["副作用を実行"]`}
            />
          </section>
          {/* ref */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ref — どんな値でもリアクティブにする
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>ref</code> は値を 1 つ包んでリアクティブにします。
              数値や文字列などのプリミティブも扱える万能型です。 JavaScript
              の中では <code>.value</code> でアクセスしますが、
              <code>{"<template>"}</code> の中では自動でアンラップされるため
              <code>.value</code> は書きません。React の{" "}
              <code>const [count, setCount] = useState(0)</code>{" "}
              に当たるものが、 Vue では <code>const count = ref(0)</code> です。
            </p>

            <CodeBlock
              language="html"
              title="ref の基本 — カウンター"
              code={`<script setup lang="ts">
import { ref } from 'vue'

// プリミティブをリアクティブに包む
const count = ref(0)

function increment() {
  // JS の中では .value 経由で読み書きする
  count.value++
}
</script>

<template>
  <!-- template では .value なしでそのまま使える -->
  <p>カウント: {{ count }}</p>
  <button @click="increment">+1</button>
</template>`}
            />

            <InfoBox type="warning" title=".value の付け忘れに注意">
              JS のロジック内で <code>count++</code> と書いても、それは{" "}
              <code>ref</code> オブジェクト自体を壊すだけで値は増えません。
              <code>count.value++</code> が正解です。 一方
              <code>{"<template>"}</code> の中で <code>count.value</code>{" "}
              と書くと 逆に動きません（template では自動アンラップされるため
              <code>count</code> のまま）。「JS では <code>.value</code>
              、template では不要」と覚えてください。
            </InfoBox>
          </section>

          {/* reactive */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              reactive — オブジェクトをまるごとリアクティブに
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>reactive</code> はオブジェクトや配列を Proxy
              で包み、プロパティの読み書きを直接追跡します。 <code>.value</code>{" "}
              は不要で、通常のオブジェクトのように扱えます。
              ただしプリミティブ（数値・文字列単体）には使えません。
              フォームの入力値などまとまった状態を 1
              つにまとめたいときに向きます。
            </p>

            <CodeBlock
              language="html"
              title="reactive の基本 — フォーム状態"
              code={`<script setup lang="ts">
import { reactive } from 'vue'

// オブジェクトをまるごとリアクティブに
const form = reactive({
  name: '',
  agree: false,
})

function reset() {
  // プロパティを直接書き換えれば追跡される（.value 不要）
  form.name = ''
  form.agree = false
}
</script>

<template>
  <input v-model="form.name" placeholder="お名前" />
  <label>
    <input type="checkbox" v-model="form.agree" />
    規約に同意する
  </label>
  <button @click="reset">リセット</button>
  <p>入力中: {{ form.name }}</p>
</template>`}
            />

            <InfoBox type="info" title="reactive は「再代入」も追跡できない">
              <code>form = {"{ name: '' }"}</code>{" "}
              のようにオブジェクト自体を別物に差し替えると、 元の Proxy
              との結び付きが切れて画面に反映されません。
              <code>reactive</code>{" "}
              では「中身のプロパティを書き換える」のが基本です。
              まとめて差し替えた いときは{" "}
              <code>Object.assign(form, newValue)</code> を使うか、状態自体を{" "}
              <code>ref</code> にしてください。
            </InfoBox>
          </section>

          {/* 使い分け */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ref と reactive の使い分け
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              両者は性質が異なります。下表で違いを整理します。 結論として、
              <strong>迷ったら ref を選ぶ</strong> のが現在の実用的な指針です。
              <code>ref</code>{" "}
              はプリミティブもオブジェクトも扱え、再代入も分割代入の罠も
              比較的読みやすいためです。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      観点
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      ref
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      reactive
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((r) => (
                    <tr key={r.aspect} className="border-b border-border">
                      <td className="py-2 pr-4 font-bold text-foreground whitespace-nowrap align-top">
                        {r.aspect}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {r.ref}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {r.reactive}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-bold text-foreground mb-2">
                迷ったときの判断
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                単一の値・真偽値・カウンターは <code>ref</code>。
                「複数のプロパティを 1 つにまとめたい」かつ
                「分割代入や再代入をしない」と決められる局所的なオブジェクトなら
                <code>reactive</code> も読みやすくなります。 アプリ全体としては
                <code>ref</code> に寄せると一貫性が保てます。
              </p>
            </div>
          </section>

          {/* React との違い */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              React の useState との違い
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              React
              経験者がまず戸惑うのは「ミューテーションしていいのか？」という
              点です。React では state を直接書き換えず、必ず setter
              で新しい値を渡します。 Vue は逆に、<code>ref</code> なら{" "}
              <code>.value</code> を書き換え、 <code>reactive</code>{" "}
              ならプロパティを直接書き換えるのが正しい使い方です。
            </p>

            <CodeBlock
              language="ts"
              title="同じ「配列に追加」を React と Vue で比べる"
              code={`// React: 新しい配列を作って setter に渡す（不変更新）
const [items, setItems] = useState<string[]>([])
setItems(prev => [...prev, 'new'])

// Vue (ref): .value をミューテーションしてよい
const items = ref<string[]>([])
items.value.push('new') // push で直接書き換えてOK`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              Vue の Proxy は <code>push</code>{" "}
              のような破壊的操作も検知するため、
              スプレッドで新しい配列を作り直す必要はありません。
              この「ミューテーションが正解」という点が、React
              からの最大の発想転換 です。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="ref で作った count を JavaScript のロジック内で 1 増やす正しい書き方は？"
              options={[
                { label: "count++" },
                { label: "count.value++", correct: true },
                { label: "setCount(count + 1)" },
                { label: "count = count + 1" },
              ]}
              explanation="ref が包んだ値には JS の中では .value でアクセスします。count.value++ が正解です。count++ は ref オブジェクト自体を壊すだけで値は増えません。setCount は React の書き方で Vue には存在しません。なお <template> の中では自動アンラップされるため、そこでは count（.value なし）と書きます。"
            />
          </section>

          {/* リアクティビティが切れる */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リアクティビティが切れる典型パターン
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              もっとも多いハマりどころが、<code>reactive</code> なオブジェクトを
              分割代入で取り出したときに追跡が切れる現象です。
              分割代入はプロパティの「今の値」をコピーするだけで、Proxy
              との結び付きを 引き継がないためです。
              <code>toRefs</code> / <code>toRef</code> を使うと、各プロパティを
              ref に変換して結び付きを保てます。
            </p>

            <CodeBlock
              language="html"
              title="分割代入で切れる → toRefs で回避"
              code={`<script setup lang="ts">
import { reactive, toRefs } from 'vue'

const state = reactive({ count: 0 })

// NG: 分割代入で「今の値（0）」をコピー。以降 count は追従しない
const { count } = state

// OK: toRefs で各プロパティを ref に変換して結び付きを保つ
const { count: countRef } = toRefs(state)

function increment() {
  // state.count を直接書き換える
  state.count++
}
</script>

<template>
  <!-- count は切れているので増えない -->
  <p>切れた: {{ count }}</p>
  <!-- countRef は toRefs 経由なので追従する -->
  <p>追従: {{ countRef }}</p>
  <button @click="increment">+1</button>
</template>`}
            />

            <InfoBox
              type="warning"
              title="reactive の分割代入はリアクティビティを失う"
            >
              <code>const {"{ count }"} = state</code> のように{" "}
              <code>reactive</code> オブジェクトを分割代入すると、 取り出した{" "}
              <code>count</code> はただの数値になり、以降の変更に追従しません。
              プロパティを個別に使いたいときは <code>toRefs(state)</code>{" "}
              で各プロパティを ref 化してから分割代入してください。
              単一プロパティ なら <code>toRef(state, 'count')</code>{" "}
              も使えます。 ref 化された値は JS では <code>.value</code>{" "}
              でアクセスし、template では 自動アンラップされます。
            </InfoBox>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              なお Vue 3.5 以降は、<code>defineProps</code>{" "}
              の戻り値を既定値つきで 分割代入してもリアクティビティを維持する
              「reactive props destructure」が安定化しています。 ただしこれは
              props 限定の機能で、自前の <code>reactive</code>{" "}
              オブジェクトには適用されません。 props 以外では引き続き{" "}
              <code>toRefs</code> が必要です。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="reactive オブジェクト state を分割代入した const { count } = state について正しいのは？"
              options={[
                {
                  label:
                    "count はその時点の値をコピーするだけで、以降の変更に追従しない",
                  correct: true,
                },
                { label: "count は常に state.count に追従する" },
                { label: "count.value で読めばリアクティブになる" },
                { label: "分割代入すると state 側が更新されなくなる" },
              ]}
              explanation="reactive の分割代入は、その時点のプロパティ値をコピーするだけで Proxy との結び付きを引き継ぎません。そのため count は以降の変更に追従しなくなります。回避には toRefs(state) で各プロパティを ref 化してから分割代入します。state 側（元のオブジェクト）は分割代入の影響を受けず、変更は引き続き反映されます。"
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              この章のまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">ref</strong>:
                どんな値でも包める。 JS では <code>.value</code>、template
                では不要。迷ったらこれ。
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">reactive</strong>:
                オブジェクト・配列専用。プロパティを直接書き換える。
                再代入と分割代入で切れる。
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">toRefs / toRef</strong>:
                reactive のプロパティを ref
                化して、分割代入後もリアクティビティを 保つための回避策。
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">React との違い</strong>:
                setter で新しい値を返すのではなく、値そのものを書き換える
                （ミューテーションが正解）。
              </p>
            </div>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vue 公式 - リアクティビティの基礎",
                  url: "https://ja.vuejs.org/guide/essentials/reactivity-fundamentals",
                  description:
                    "ref / reactive の基本と使い分けの公式ガイド（日本語）",
                },
                {
                  title: "Vue 公式 - リアクティビティの詳細",
                  url: "https://ja.vuejs.org/guide/extras/reactivity-in-depth",
                  description:
                    "Proxy による変更検知の仕組みを掘り下げた解説（日本語）",
                },
                {
                  title: "Vue 公式 API - reactivity: core",
                  url: "https://ja.vuejs.org/api/reactivity-core",
                  description:
                    "ref / reactive / toRefs / toRef のシグネチャ一覧（日本語）",
                },
                {
                  title: "Vue 公式 - Reactive Props Destructure（3.5）",
                  url: "https://ja.vuejs.org/guide/components/props",
                  description:
                    "props 分割代入でリアクティビティを維持する 3.5 の機能（日本語）",
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
