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

const dataFlow = [
  {
    direction: "親 → 子",
    api: "defineProps",
    react: "props（属性として渡す）",
    note: "子は props を読み取り専用として受け取る",
  },
  {
    direction: "子 → 親",
    api: "defineEmits",
    react: "コールバック props（onChange など）",
    note: "子が emit でイベントを発火し、親がハンドラで受ける",
  },
  {
    direction: "親 ⇄ 子（双方向）",
    api: "defineModel",
    react: "value + onChange の制御コンポーネント",
    note: "v-model のための props と emit をまとめて宣言する",
  },
];

export default function PropsEmits() {
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
            Props と Emits
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            コンポーネント同士のデータの受け渡しを扱います。親から子へ渡すのが
            <code>defineProps</code>、子から親へイベントを返すのが
            <code>defineEmits</code>、そして双方向バインディングを簡潔に書くのが
            <code>defineModel</code> です。React の props +
            コールバックと対応づけながら整理します。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "defineProps",
            "defineEmits",
            "defineModel",
            "v-model",
            "Vue 3.5",
          ]}
        >
          <p>
            <code>defineProps</code> / <code>defineEmits</code> /{" "}
            <code>defineModel</code> は<strong>コンパイラマクロ</strong>で、
            <code>{"<script setup>"}</code> の中で import なしに使えます。 Vue
            3.4 で <code>defineModel</code> が安定版になり、Vue 3.5 では props
            を分割代入してもリアクティビティが維持されるようになりました。
            古い記事の <code>props.modelValue</code> +{" "}
            <code>emit('update:modelValue')</code>
            を手書きする手順は、今は <code>defineModel</code>{" "}
            に置き換えられます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Props と Emits のデータの向き
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              データは props で親から子へ下り、イベントは emit
              で子から親へ上がります。v-model はこの組み合わせで双方向にします。
            </p>
            <MermaidDiagram
              title="Props と Emits のデータの向き（図）"
              chart={`flowchart TD
  P["親"] -->|"props (データを下へ)"| C["子"]
  C -->|"emit (イベントを上へ)"| P
  P -->|"v-model (双方向)"| C`}
            />
          </section>

          {/* データの流れ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              コンポーネント間のデータの流れ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Vue のデータフローは「親から子へは props、子から親へは
              emit」が基本です。React の「props を下に流し、コールバックを props
              として渡してイベントを上に返す」のと同じ考え方です。双方向にしたいときだけ
              <code>defineModel</code> を使います。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      向き
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      Vue の API
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      React の対応
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      メモ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataFlow.map((d) => (
                    <tr key={d.api} className="border-b border-border">
                      <td className="py-2 pr-4 font-medium text-foreground whitespace-nowrap align-top">
                        {d.direction}
                      </td>
                      <td className="py-2 px-4 font-mono text-primary whitespace-nowrap align-top">
                        {d.api}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {d.react}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {d.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* defineProps */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              defineProps で親からデータを受け取る
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              子コンポーネントは <code>defineProps</code>{" "}
              で受け取るデータを宣言します。型ベースで書くと、ジェネリック引数に渡した型がそのまま
              props の型になります。<code>?</code>{" "}
              を付けた項目は任意（省略可能）です。React の{" "}
              <code>{"function Card(props: Props)"}</code> に当たる宣言が、Vue
              ではこのマクロです。
            </p>

            <CodeBlock
              language="html"
              title="UserCard.vue — 型ベースの defineProps"
              code={`<script setup lang="ts">
// 型ベースで props を宣言する（import 不要のコンパイラマクロ）
interface Props {
  name: string
  age?: number   // ? は任意の props
}

const props = defineProps<Props>()
</script>

<template>
  <div class="card">
    <p>{{ props.name }}</p>
    <!-- template 内では props. を省いて直接参照してもよい -->
    <p v-if="age">{{ age }} 歳</p>
  </div>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              親側は属性のように値を渡します。文字列以外（数値・真偽値・配列・オブジェクトなど）を渡すときは
              <code>v-bind</code>（短縮形 <code>:</code>）を使います。
            </p>

            <CodeBlock
              language="html"
              title="親コンポーネント — props を渡す"
              code={`<script setup lang="ts">
import UserCard from './UserCard.vue'
</script>

<template>
  <!-- 文字列はそのまま、数値は : で式として渡す -->
  <UserCard name="田中" :age="28" />
</template>`}
            />
          </section>

          {/* デフォルト値 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デフォルト値の与え方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              props が省略されたときの初期値を設定します。
              <strong>Vue 3.5</strong>{" "}
              からは、戻り値を既定値つきで分割代入してもリアクティビティが保たれるようになりました。React
              のデフォルト引数（<code>{"{ size = 'md' }"}</code>
              ）と同じ感覚で書けます。
            </p>

            <CodeBlock
              language="html"
              title="reactive props destructure（Vue 3.5+）"
              code={`<script setup lang="ts">
interface Props {
  label: string
  size?: 'sm' | 'md' | 'lg'
}

// Vue 3.5: 既定値つきで分割代入してもリアクティビティが切れない
const { label, size = 'md' } = defineProps<Props>()
</script>

<template>
  <button :class="size">{{ label }}</button>
</template>`}
            />

            <InfoBox
              type="success"
              title="Vue 3.5 で「分割代入でリアクティビティが切れる」罠が解消された"
            >
              Vue 3.4 以前は、props
              を分割代入で取り出すとその時点の値で固定され、親が更新しても追従しませんでした（このため
              <code>withDefaults</code>{" "}
              でデフォルト値を別途宣言するのが定番でした）。
              <strong>Vue 3.5 の reactive props destructure</strong> により、
              <code>{"const { size = 'md' } = defineProps<Props>()"}</code>{" "}
              のように書いてもコンパイラがリアクティブな参照へ変換するため、分割代入と既定値を同時に安全に書けます。
            </InfoBox>
          </section>

          {/* defineEmits */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              defineEmits で子から親へイベントを返す
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              子から親へデータを返すときは <code>defineEmits</code>{" "}
              でイベントを宣言し、<code>emit('イベント名', 値)</code>{" "}
              で発火します。親側は <code>@イベント名</code>（<code>v-on</code>
              の短縮形）で受け取ります。React の <code>
                {"onSubmit={...}"}
              </code>{" "}
              コールバックと同じ役割です。
            </p>

            <CodeBlock
              language="html"
              title="SearchBox.vue — defineEmits でイベントを発火"
              code={`<script setup lang="ts">
import { ref } from 'vue'

// 型ベースで「発火するイベントと引数の型」を宣言する
const emit = defineEmits<{
  search: [keyword: string]   // search イベントは string を1つ渡す
}>()

const keyword = ref('')

function onSubmit() {
  emit('search', keyword.value)   // 親へ keyword を返す
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="keyword" />
    <button type="submit">検索</button>
  </form>
</template>`}
            />

            <CodeBlock
              language="html"
              title="親コンポーネント — @search でイベントを受ける"
              code={`<script setup lang="ts">
import SearchBox from './SearchBox.vue'

function handleSearch(keyword: string) {
  console.info('検索:', keyword)
}
</script>

<template>
  <!-- @search は v-on:search の短縮形 -->
  <SearchBox @search="handleSearch" />
</template>`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="型ベースで props を宣言するとき、defineProps の使い方として正しいのは？"
              options={[
                {
                  label:
                    "defineProps<Props>() のようにジェネリック引数へ型を渡す（import は不要）",
                  correct: true,
                },
                {
                  label: "import { defineProps } from 'vue' してから呼び出す",
                },
                {
                  label: "props は this.$props でしか参照できない",
                },
                {
                  label: "型は書けず、必ずランタイムの配列で宣言する",
                },
              ]}
              explanation="defineProps はコンパイラマクロなので import は不要で、<script setup> の中でそのまま使えます。defineProps<Props>() のように型をジェネリック引数で渡すと、その型がそのまま props の型になります。this.$props は Options API 時代の参照方法で、script setup では戻り値（props）または template で直接名前を参照します。"
            />
          </section>

          {/* v-model: 従来 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              v-model の仕組み（従来の書き方）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>v-model</code> は「値を渡す props」と「更新を返す
              emit」を組み合わせた糖衣構文です。Vue 3.4
              より前は、子コンポーネント側で <code>modelValue</code> という
              props と <code>update:modelValue</code>{" "}
              というイベントを自分で書く必要がありました。React
              の制御コンポーネント（
              <code>value</code> + <code>onChange</code>）と構造は同じです。
            </p>

            <CodeBlock
              language="html"
              title="MyInput.vue — modelValue を手書きする旧来の形"
              code={`<script setup lang="ts">
// 親の <MyInput v-model="text" /> は実体としてこの2つに展開される
defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>`}
            />
          </section>

          {/* v-model: defineModel */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              defineModel で双方向を簡潔に書く（Vue 3.4+）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>Vue 3.4</strong> で安定版になった <code>defineModel</code>{" "}
              を使うと、<code>modelValue</code> props と
              <code>update:modelValue</code> emit のペアを 1
              行で宣言できます。戻り値は <code>ref</code> のように振る舞い、
              <code>.value</code>{" "}
              に代入すると自動で親へ更新が伝わります。前の節の{" "}
              <code>MyInput.vue</code> がそのまま次のように短くなります。
            </p>

            <CodeBlock
              language="html"
              title="MyInput.vue — defineModel 版"
              code={`<script setup lang="ts">
// modelValue props と update:modelValue emit を一括で宣言する
const model = defineModel<string>()
</script>

<template>
  <!-- model は ref のように扱える。v-model でそのまま双方向に -->
  <input v-model="model" />
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              親側の使い方は変わりません。<code>v-model</code>{" "}
              で結ぶだけで、子の入力が親の状態へ反映されます。
            </p>

            <CodeBlock
              language="html"
              title="親コンポーネント — v-model で結ぶ"
              code={`<script setup lang="ts">
import { ref } from 'vue'
import MyInput from './MyInput.vue'

const text = ref('')
</script>

<template>
  <MyInput v-model="text" />
  <p>入力中: {{ text }}</p>
</template>`}
            />

            <InfoBox type="info" title="名前付き v-model も書ける">
              <code>{"defineModel('title')"}</code> のように名前を渡すと、親側で{" "}
              <code>v-model:title</code> として複数の双方向バインディングを 1
              コンポーネントに持たせられます。
              フォーム部品で「値」と「妥当性」を別々に双方向化したいときなどに使います。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="defineModel の役割として最も正しいのは？"
              options={[
                {
                  label:
                    "v-model のための modelValue props と update:modelValue emit のペアを 1 行で宣言する",
                  correct: true,
                },
                {
                  label: "グローバルな状態管理ストアを定義する",
                },
                {
                  label: "コンポーネントの型定義ファイル（.d.ts）を生成する",
                },
                {
                  label: "props を読み取り専用にロックして変更を禁止する",
                },
              ]}
              explanation="defineModel は v-model に必要な「値を受け取る props」と「更新を返す emit」をまとめて宣言するコンパイラマクロです（Vue 3.4 で安定版）。戻り値は ref のように扱え、.value への代入が親へ伝わります。グローバルな状態管理は Pinia の defineStore の役割で、defineModel とは別物です。"
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              使い分けの指針
            </h2>
            <div className="rounded-xl border border-border bg-card p-5">
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                <li>
                  <strong className="text-foreground">親 → 子に値を渡す</strong>
                  だけなら <code>defineProps</code>。props
                  は読み取り専用として扱う（子で直接書き換えない）。
                </li>
                <li>
                  <strong className="text-foreground">
                    子 → 親にイベントを返す
                  </strong>
                  なら <code>defineEmits</code>
                  。クリックや送信などの「通知」はこちら。
                </li>
                <li>
                  <strong className="text-foreground">
                    入力部品のように双方向にしたい
                  </strong>
                  なら <code>defineModel</code>。modelValue を手書きせずに済む。
                </li>
              </ul>
            </div>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              React で言えば、props はそのまま props、emit はコールバック
              props、 defineModel は <code>value</code> + <code>onChange</code>{" "}
              をまとめた制御コンポーネントに相当します。対応づけて覚えると迷いません。
            </p>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vue 公式 - Props",
                  url: "https://ja.vuejs.org/guide/components/props.html",
                  description:
                    "defineProps の宣言方法・型付け・デフォルト値の解説（日本語）",
                },
                {
                  title: "Vue 公式 - イベント（Emits）",
                  url: "https://ja.vuejs.org/guide/components/events.html",
                  description:
                    "defineEmits と emit によるイベント発火の解説（日本語）",
                },
                {
                  title: "Vue 公式 - v-model（コンポーネント）",
                  url: "https://ja.vuejs.org/guide/components/v-model.html",
                  description:
                    "defineModel と双方向バインディングの公式解説（日本語）",
                },
                {
                  title: "Vue 公式 - Reactive Props Destructure",
                  url: "https://ja.vuejs.org/guide/components/props.html#reactive-props-destructure",
                  description:
                    "Vue 3.5 の props 分割代入でリアクティビティを保つ仕組み（日本語）",
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
