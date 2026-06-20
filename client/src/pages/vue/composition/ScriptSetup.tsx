import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const macros = [
  {
    name: "defineProps",
    role: "親から受け取る props を型で宣言する",
    react: "props 引数の型注釈に相当",
  },
  {
    name: "defineEmits",
    role: "親へ発火するイベントを型で宣言する",
    react: "onXxx コールバック props に相当",
  },
  {
    name: "defineModel",
    role: "v-model（双方向バインド）を簡潔に定義する",
    react: "value + onChange のペアに相当",
  },
  {
    name: "defineExpose",
    role: "親が ref 経由で触れるメソッド/値を公開する",
    react: "useImperativeHandle に相当",
  },
];

export default function ScriptSetup() {
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
            script setup と TypeScript
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            <code>{"<script setup>"}</code> は Composition API
            を最小の記述量で書くための構文糖です。
            トップレベルで宣言した変数や関数が、そのまま template で使えます。
            React の関数コンポーネント + hooks に近い書き味で、TypeScript
            の型推論とも相性が良い、現在の Vue 3 の標準です。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "script setup",
            "Composition API",
            "TypeScript",
            "コンパイラマクロ",
            "Vue 3",
          ]}
        >
          <p>
            Vue 2 時代は <strong>Options API</strong>（<code>data</code> /
            <code>methods</code> / <code>computed</code>{" "}
            をオブジェクトで定義）が中心でした。 Vue 3 では{" "}
            <strong>Composition API</strong> が加わり、
            さらにその記述を簡潔にする <code>{"<script setup>"}</code>{" "}
            が定着しました。 現在の新規プロジェクトはほぼ{" "}
            <code>{'<script setup lang="ts">'}</code> で書かれます。
            既存コードの Options API
            を読めることも依然として有用ですが、書く側の標準は script setup
            です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* Options API との対比 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Options API と script setup の対比
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              同じカウンターを 2 つの書き方で並べます。Options API は機能ごとに
              <code>data</code> / <code>computed</code> / <code>methods</code>
              という「箱」へ分けて書きます。 script setup
              は箱を意識せず、必要なものをトップレベルに並べるだけです。
            </p>

            <CodeBlock
              language="html"
              title="Counter.vue — Options API（従来の書き方）"
              code={`<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      count: 0,
    }
  },
  computed: {
    doubled(): number {
      return this.count * 2
    },
  },
  methods: {
    increment() {
      this.count++
    },
  },
})
</script>

<template>
  <button @click="increment">count: {{ count }}</button>
  <p>doubled: {{ doubled }}</p>
</template>`}
            />

            <CodeBlock
              language="html"
              title="Counter.vue — script setup（現在の標準）"
              code={`<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">count: {{ count }}</button>
  <p>doubled: {{ doubled }}</p>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              script setup では <code>this</code> が登場しません。
              <code>count</code> は <code>ref</code> なのでスクリプト内では
              <code>count.value</code> でアクセスしますが、template
              では自動でアンラップされ <code>{"{{ count }}"}</code>{" "}
              のまま書けます。React で言えば <code>useState</code> の値が{" "}
              <code>ref</code>、<code>useMemo</code> が <code>computed</code>{" "}
              に近い役割です。
            </p>
          </section>

          {/* script setup の利点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              script setup の利点
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Options API と比べたときの実利は、おおむね次の 3
              点に集約されます。
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2">記述量が減る</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <code>export default</code> や <code>return</code>{" "}
                  のボイラープレートが不要。 宣言したものは自動で template
                  に公開されます。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2">型推論が効く</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <code>this</code> 経由ではなく素の変数なので、 IDE と{" "}
                  <code>vue-tsc</code> が型を素直に追えます。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2">
                  変数がそのまま使える
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  トップレベルで宣言した変数・関数・import
                  したコンポーネントが、template から直接参照できます。
                </p>
              </div>
            </div>

            <InfoBox
              type="success"
              title="import したコンポーネントの登録が不要"
            >
              Options API では <code>components: {"{ ChildView }"}</code>{" "}
              の登録が必要でした。 script setup なら <code>import</code>{" "}
              するだけで template に <code>{"<ChildView />"}</code>{" "}
              と書けます。登録の書き漏れがなくなります。
            </InfoBox>
          </section>

          {/* コンパイラマクロ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              コンパイラマクロ（import 不要）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              script setup の中だけで使える特別な関数群を
              <strong>コンパイラマクロ</strong>と呼びます。
              これらはコンパイル時に解決されるため、 <code>vue</code> からの{" "}
              <code>import</code>{" "}
              は不要です（書いてもエラーにはなりませんが必要ありません）。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      マクロ
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      React で言うと
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {macros.map((m) => (
                    <tr key={m.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {m.name}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {m.role}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {m.react}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="html"
              title="UserCard.vue — props / emit を型で宣言する"
              code={`<script setup lang="ts">
// defineProps / defineEmits は import 不要のコンパイラマクロ
const props = defineProps<{
  name: string
  age?: number
}>()

const emit = defineEmits<{
  select: [id: string]
}>()

function onClick() {
  emit('select', props.name)
}
</script>

<template>
  <button @click="onClick">
    {{ name }}<span v-if="age">（{{ age }}）</span>
  </button>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>defineProps</code> に型引数を渡すと、その型がそのまま props
              の型になります。 <code>?</code> を付けた <code>age</code>{" "}
              は任意プロパティです。 React の{" "}
              <code>{"Props { name: string; age?: number }"}</code>{" "}
              を関数引数に置くのと同じ感覚で書けます。
            </p>

            <InfoBox type="info" title="Vue 3.5 の reactive props destructure">
              以前は <code>const {"{ name }"} = defineProps(...)</code>{" "}
              のように分割代入するとリアクティビティが失われる罠がありました。
              Vue 3.5 からは分割代入してもリアクティビティが保たれ、 既定値も{" "}
              <code>const {"{ age = 0 }"} = defineProps(...)</code>{" "}
              のように自然に書けるようになっています。
            </InfoBox>
          </section>

          {/* defineModel */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              defineModel で v-model を簡潔に
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              親が <code>v-model</code>{" "}
              で双方向バインドする入力コンポーネントは、 以前は props と emit
              を手書きする必要がありました。 Vue 3.4 以降の{" "}
              <code>defineModel</code> なら 1 行で書けます。
            </p>

            <CodeBlock
              language="html"
              title="TextField.vue — defineModel による双方向バインド"
              code={`<script setup lang="ts">
// model は ref のように .value で読み書きできる
const model = defineModel<string>({ default: '' })
</script>

<template>
  <input v-model="model" />
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              親側は <code>{'<TextField v-model="keyword" />'}</code>{" "}
              と書くだけです。 React で言えば <code>value</code> と{" "}
              <code>onChange</code> のペアを 1
              つの双方向バインドにまとめたもので、
              受け側の入力コンポーネントの記述が大きく減ります。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Options API と比べたときの script setup の利点として正しいものはどれ？"
              options={[
                {
                  label:
                    "トップレベルで宣言した変数・関数がそのまま template で使え、ボイラープレートが減る",
                  correct: true,
                },
                {
                  label: "this 経由でしか state にアクセスできなくなる",
                },
                {
                  label: "TypeScript が使えなくなり、型推論が効かなくなる",
                },
                {
                  label:
                    "import したコンポーネントを components に必ず登録する必要がある",
                },
              ]}
              explanation="script setup ではトップレベルの変数・関数・import がそのまま template に公開され、export default や return、components 登録といった定型句が不要になります。this を介さない素の変数なので、TypeScript の型推論はむしろ効きやすくなります。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="defineProps / defineEmits / defineModel について正しい説明はどれ？"
              options={[
                {
                  label:
                    "script setup 内で使えるコンパイラマクロで、vue からの import は不要",
                  correct: true,
                },
                {
                  label:
                    "使う前に必ず vue から import する必要がある通常の関数",
                },
                {
                  label: "Options API 専用で、script setup では使えない",
                },
                {
                  label: "ランタイムにのみ存在し、型情報は持てない",
                },
              ]}
              explanation="defineProps / defineEmits / defineModel / defineExpose はコンパイル時に解決されるコンパイラマクロです。script setup の中でだけ使え、vue からの import は不要です。型引数を渡せるので、props や emit を TypeScript の型として宣言できます。"
            />
          </section>

          {/* TypeScript の型付け */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              TypeScript での型付け
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>lang="ts"</code> を付けるだけで SFC が TypeScript
              になります。 <code>ref</code> や <code>computed</code>{" "}
              は初期値から型を推論しますが、 明示したいときは型引数を渡せます。
            </p>

            <CodeBlock
              language="html"
              title="Profile.vue — ref / computed の型付け"
              code={`<script setup lang="ts">
import { ref, computed } from 'vue'

interface User {
  id: string
  name: string
}

// 初期値 null を許容するため型引数を明示
const user = ref<User | null>(null)

// computed の戻り値は推論されるが、明示も可能
const label = computed<string>(() =>
  user.value ? user.value.name : 'ゲスト'
)
</script>

<template>
  <p>{{ label }}</p>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              型チェックは <code>vue-tsc</code> が担います（<code>tsc</code> は
              SFC を解釈できないため）。 create-vue で TypeScript を選ぶと、
              <code>npm run build</code> 時に <code>vue-tsc</code>{" "}
              が走る構成が既定で用意されます。
            </p>

            <InfoBox type="warning" title="ref の .value 忘れに注意">
              スクリプト内では <code>count.value</code> のように{" "}
              <code>.value</code> が必要ですが、template
              では不要（自動アンラップ）です。 この非対称さは React の{" "}
              <code>useState</code> から来た人がつまずきやすい点です。
              迷ったら「スクリプトでは .value、template
              ではそのまま」と覚えてください。
            </InfoBox>
          </section>

          {/* まとめ的 InfoBox */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              どちらを学ぶべきか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              新しく書くコードは <code>{'<script setup lang="ts">'}</code>{" "}
              で問題ありません。 Options API
              は既存コードやライブラリのドキュメントで出会うため、
              「読めれば十分」という温度感で捉えておくのが実用的です。
            </p>
            <InfoBox type="info" title="script setup + lang ts が現在の標準">
              本マニュアルの以降のページは原則 script
              setup（TypeScript）で記述します。 Options API
              は概念の対応関係を理解するために紹介しましたが、新規実装で選ぶ理由は通常ありません。
              既存プロジェクトの保守で出会ったときに対応できれば十分です。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vue 公式 - <script setup>",
                  url: "https://ja.vuejs.org/api/sfc-script-setup.html",
                  description:
                    "script setup の構文・コンパイラマクロの公式リファレンス（日本語）",
                },
                {
                  title: "Vue 公式 - TypeScript で Composition API を使う",
                  url: "https://ja.vuejs.org/guide/typescript/composition-api.html",
                  description:
                    "props / emit / ref の型付けに関する公式ガイド（日本語）",
                },
                {
                  title: "Vue 公式 - Options API と Composition API",
                  url: "https://ja.vuejs.org/guide/introduction.html#api-styles",
                  description: "2 つの API スタイルの比較（日本語）",
                },
                {
                  title: "Vue 公式 - リアクティビティの基礎（ref）",
                  url: "https://ja.vuejs.org/guide/essentials/reactivity-fundamentals.html",
                  description: "ref と .value の挙動の解説（日本語）",
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
