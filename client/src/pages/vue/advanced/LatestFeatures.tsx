import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

// React 概念との対応表（移行者向けに再掲）
const reactMapping = [
  {
    react: "useState",
    vue: "ref / reactive",
    note: ".value でアクセス（template では自動アンラップ）",
  },
  { react: "useMemo", vue: "computed", note: "依存を自動追跡してキャッシュ" },
  {
    react: "useEffect",
    vue: "watch / watchEffect",
    note: "watchEffect は依存を自動収集",
  },
  {
    react: "props（読み取り専用）",
    vue: "defineProps",
    note: "コンパイラマクロ。import 不要",
  },
  {
    react: "value + onChange（制御）",
    vue: "defineModel",
    note: "v-model の双方向を 1 行で",
  },
  {
    react: "useRef（DOM 参照）",
    vue: "useTemplateRef",
    note: "テンプレート参照を宣言的に取得",
  },
  { react: "useId", vue: "useId", note: "SSR 安全な一意 ID（同名）" },
  {
    react: "Context / 状態ライブラリ",
    vue: "Pinia（defineStore）",
    note: "state / getters / actions",
  },
];

// 学んだ章の振り返りチェックリスト
const reviewChecklist = [
  {
    area: "Vue 基礎",
    items:
      "SFC（script setup / template / style）、ディレクティブ（v-if / v-for / v-bind / v-on）",
  },
  {
    area: "リアクティビティ",
    items: "ref / reactive / computed / watch、toRefs でリアクティビティを保つ",
  },
  {
    area: "コンポーネント",
    items: "props / emits / slots、defineModel による双方向バインディング",
  },
  {
    area: "状態管理",
    items: "Pinia（defineStore、storeToRefs でリアクティブに分割代入）",
  },
  {
    area: "ルーティング",
    items:
      "Vue Router（createRouter、router-link、useRoute / useRouter、ナビゲーションガード）",
  },
  {
    area: "Nuxt",
    items:
      "srcDir=app/、useFetch / useAsyncData / $fetch、server/api（Nitro）、routeRules",
  },
];

export default function LatestFeatures() {
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
            Vue 3.5 / Nuxt 4 の最新機能と総まとめ
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            このマニュアルの最後に、Vue 3.5 と Nuxt 4
            で入った新機能を押さえます。とくに{" "}
            <strong>reactive props destructure</strong> と{" "}
            <strong>defineModel</strong>{" "}
            は日々の開発を確実に変えます。あわせて、ここまで学んだ章を振り返り、次の一歩を示します。
          </p>
        </div>

        <WhyNowBox
          tags={["Vue 3.5", "Nuxt 4", "defineModel", "useId", "総まとめ"]}
        >
          <p>
            Vue 3.5 と Nuxt 4
            は、過去のバージョンで「分かりにくかった・冗長だった」部分を整理した実用重視のリリースです。
            とくに props を分割代入するとリアクティビティが切れる罠や、
            <code>v-model</code> の手書きボイラープレートは、
            新しいマクロでそのまま解消されました。
            古い書き方を覚え直す必要はなく、これからは新しい書き方を選ぶだけで済みます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* reactive props destructure */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              reactive props destructure（Vue 3.5 の目玉）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              これまで <code>defineProps</code>{" "}
              の戻り値を分割代入すると、その瞬間に値が「ただの定数」になり、
              親から渡された props が更新されても追従しませんでした。Vue 3.5
              では、コンパイラがこの分割代入を変換して
              <strong>リアクティビティを保ったまま</strong>{" "}
              受け取れるようになりました。 既定値も <code>=</code>{" "}
              で素直に書けます。
            </p>

            <CodeBlock
              language="html"
              title="Before — Vue 3.4 以前（分割代入はリアクティビティが切れる）"
              code={`<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ count?: number; label?: string }>(),
  { count: 0, label: 'カウント' }
)

// props 経由で参照しないとリアクティビティが保てない
const doubled = computed(() => props.count * 2)
</script>

<template>
  <p>{{ props.label }}: {{ props.count }}（×2 = {{ doubled }}）</p>
</template>`}
            />

            <CodeBlock
              language="html"
              title="After — Vue 3.5（分割代入 + 既定値でリアクティビティ維持）"
              code={`<script setup lang="ts">
import { computed } from 'vue'

// 分割代入しても count / label はリアクティブなまま
// 既定値は = でそのまま書ける（withDefaults 不要）
const { count = 0, label = 'カウント' } = defineProps<{
  count?: number
  label?: string
}>()

// props. を付けずに直接参照できる
const doubled = computed(() => count * 2)
</script>

<template>
  <p>{{ label }}: {{ count }}（×2 = {{ doubled }}）</p>
</template>`}
            />

            <InfoBox type="info" title="React の props との違い">
              React の関数コンポーネントでは{" "}
              <code>function Card({"{ count }"})</code>{" "}
              と分割代入しても、再レンダーのたびに関数が呼ばれるため新しい値が入ります。
              Vue の <code>{"<script setup>"}</code> は{" "}
              <strong>1 度だけ</strong>{" "}
              実行されるため、分割代入したローカル変数を更新に追従させるにはコンパイラの変換が必要でした。Vue
              3.5 はこの変換を標準で行います。
            </InfoBox>
          </section>

          {/* defineModel */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              defineModel（v-model 双方向の決定版）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              子コンポーネントで <code>v-model</code> を受け取るには、以前は{" "}
              <code>modelValue</code> という props と{" "}
              <code>update:modelValue</code> という emit
              を手書きする必要がありました。
              <code>defineModel</code> は、この一連を 1 行にまとめます。
              戻り値は <code>ref</code>{" "}
              として扱え、書き込むと自動で親へ更新が伝わります。
            </p>

            <CodeBlock
              language="html"
              title="Before — props + emit を手書き"
              code={`<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <input :value="props.modelValue" @input="onInput" />
</template>`}
            />

            <CodeBlock
              language="html"
              title="After — defineModel で 1 行"
              code={`<script setup lang="ts">
// model は ref のように読み書きでき、変更は自動で親に伝わる
const model = defineModel<string>()
</script>

<template>
  <input v-model="model" />
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              親側は <code>{'<MyInput v-model="text" />'}</code>{" "}
              と書くだけです。複数の値を双方向にしたいときは{" "}
              <code>defineModel('first')</code> のように名前付きで宣言します。
              React で言えば「value と onChange を毎回ペアで配線していたのが、1
              つの双方向ハンドルになった」イメージです。
            </p>
          </section>

          {/* useId / useTemplateRef / onWatcherCleanup */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              useId・useTemplateRef・onWatcherCleanup
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Vue 3.5 では、地味ですが実務で効く小さな API
              も追加されました。とくに <code>useId</code>{" "}
              は、ラベルと入力欄の紐付けなど a11y で重要な「一意な ID」を SSR
              でもズレなく生成します。
            </p>

            <CodeBlock
              language="html"
              title="useId — SSR 安全な一意 ID（label と input の紐付け）"
              code={`<script setup lang="ts">
import { useId } from 'vue'

// サーバーとクライアントで同じ ID になり、hydration がズレない
const id = useId()
</script>

<template>
  <label :for="id">メールアドレス</label>
  <input :id="id" type="email" />
</template>`}
            />

            <div className="rounded-xl border border-border bg-card p-5 mt-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <code className="text-primary">useId()</code> — SSR 安全な一意
                  ID。React の <code>useId</code> と同じ役割で、a11y
                  のラベル紐付けに使う。
                </li>
                <li>
                  <code className="text-primary">useTemplateRef()</code> —
                  テンプレート参照を宣言的に取得。
                  <code>{'ref="el"'}</code> と <code>useTemplateRef('el')</code>{" "}
                  を名前で結ぶ（React の <code>useRef</code> + ref
                  属性に相当）。
                </li>
                <li>
                  <code className="text-primary">onWatcherCleanup()</code> —
                  watcher
                  の中から後始末を登録できる。再実行や破棄の前にタイマー解除やリクエスト中断を行える。
                </li>
              </ul>
            </div>

            <CodeBlock
              language="html"
              title="useTemplateRef — テンプレート参照を名前で受け取る"
              code={`<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'

// テンプレートの ref="input" と名前で結びつく
const inputRef = useTemplateRef<HTMLInputElement>('input')

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <input ref="input" />
</template>`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Vue 3.5 の reactive props destructure の利点として正しいものはどれ？"
              options={[
                {
                  label:
                    "props を分割代入しても、既定値つきでリアクティビティが保たれる",
                  correct: true,
                },
                {
                  label: "props を分割代入すると値が固定され、更新されなくなる",
                },
                {
                  label: "props が自動でグローバルな状態として共有される",
                },
                {
                  label: "defineProps の import が不要になる新機能である",
                },
              ]}
              explanation="Vue 3.5 の reactive props destructure は、defineProps の戻り値を = による既定値つきで分割代入しても、コンパイラが変換することでリアクティビティを維持します。これにより props. を付けずに直接参照でき、withDefaults も不要になります。なお defineProps はコンパイラマクロで元から import 不要です（この点は 3.5 の新機能ではありません）。"
            />
          </section>

          {/* Nuxt 4 復習 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Nuxt 4 の要点（復習）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nuxt 4 で最も体感が変わるのは{" "}
              <strong>
                <code>srcDir</code> の既定が <code>app/</code>
              </strong>{" "}
              になった点です。 これまでルート直下に置いていた{" "}
              <code>pages/</code>・<code>components/</code>・
              <code>composables/</code>・<code>stores/</code> が{" "}
              <code>app/</code>{" "}
              配下に移りました。サーバー側の設定とアプリ側のコードが物理的に分かれます。
            </p>

            <CodeBlock
              language="bash"
              title="Nuxt 4 の標準ディレクトリ（srcDir=app/）"
              code={`my-nuxt-app/
├─ app/
│  ├─ pages/          # ファイルベースルーティング
│  ├─ components/     # 自動 import される
│  ├─ composables/    # 自動 import される
│  ├─ stores/         # Pinia ストア
│  └─ app.vue         # ルートコンポーネント
├─ server/
│  └─ api/            # Nitro のサーバー API
├─ nuxt.config.ts
└─ tsconfig.json      # .nuxt の生成 tsconfig を references で参照`}
            />

            <div className="rounded-xl border border-border bg-card p-5 mt-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">分割 tsconfig</strong>:
                  ルートの <code>tsconfig.json</code> は{" "}
                  <code>.nuxt/tsconfig.app.json</code> などを{" "}
                  <code>references</code> で参照する構成。app
                  とサーバーで型コンテキストが分かれる。
                </li>
                <li>
                  <strong className="text-foreground">
                    compatibilityVersion 4
                  </strong>
                  : Nuxt 4 では既定で有効。Nuxt 3.12+ でも{" "}
                  <code>nuxt.config.ts</code> に書けば先行して有効化できる。
                </li>
                <li>
                  <strong className="text-foreground">
                    useFetch は SSR 前提
                  </strong>
                  : <code>ssr: true</code>{" "}
                  のときサーバーとクライアントで取得が重複排除される。
                  <code>ssr: false</code>（SPA）ではクライアント取得のみになり、
                  <code>$fetch</code> + Pinia に近い動きになる。
                </li>
              </ul>
            </div>

            <InfoBox
              type="warning"
              title="Nuxt 3 のチュートリアルとパスがズレる"
            >
              Web 上の Nuxt 3 向け記事は <code>pages/</code>{" "}
              をルート直下に置いて いることが多く、Nuxt 4 の{" "}
              <code>app/pages/</code>
              とパスが食い違います。
              ファイルが見つからないときは、まず「どの階層に置く前提の記事か」を確認してください。
            </InfoBox>
          </section>

          {/* 総まとめチェックリスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ここまでの総まとめ（振り返りチェックリスト）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              このマニュアルで扱った領域を一覧で振り返ります。
              手が止まる項目があれば、その章に戻って実際にコードを書き直すのが定着の近道です。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted whitespace-nowrap">
                      領域
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      押さえる項目
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reviewChecklist.map((row) => (
                    <tr key={row.area} className="border-b border-border">
                      <td className="py-2 pr-4 font-bold text-foreground whitespace-nowrap align-top">
                        {row.area}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {row.items}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* React 移行者向け対応表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              React からの移行者向け 対応表（再掲）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              React で身についた概念は、Vue
              でもほぼそのまま対応します。最後に対応関係を一覧で確認しておきます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted whitespace-nowrap">
                      React
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted whitespace-nowrap">
                      Vue
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      補足
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reactMapping.map((row) => (
                    <tr key={row.react} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-muted-foreground whitespace-nowrap align-top">
                        {row.react}
                      </td>
                      <td className="py-2 px-4 font-mono text-primary whitespace-nowrap align-top">
                        {row.vue}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox
              type="success"
              title="Composition API は React Hooks に近い"
            >
              <code>{"<script setup>"}</code> + <code>ref</code> /{" "}
              <code>computed</code> / <code>watch</code> の組み合わせは、React
              Hooks の発想にとても近いものです。
              「状態」「派生値」「副作用」を関数で組み立てるという考え方は共通なので、
              書き方の対応さえ押さえれば移行のコストは小さく済みます。
            </InfoBox>
          </section>

          {/* 次のステップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              次のステップ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              基礎が一通り揃ったら、小さくても良いので実アプリを 1
              本作るのが最も効きます。
              詰まったところがそのまま、次に深掘りすべきテーマになります。
            </p>

            <div className="rounded-xl border border-border bg-card p-5">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">実アプリを作る</strong> —
                  Pinia + Vue Router（または Nuxt）で、CRUD
                  と画面遷移を含む小さなアプリを 1 本完成させる。
                </li>
                <li>
                  <strong className="text-foreground">VueUse を使う</strong> —
                  マウス座標・ローカルストレージ・ダークモードなど、よく使う
                  composable
                  がまとまったユーティリティ集。自作する前にまず探す。
                </li>
                <li>
                  <strong className="text-foreground">
                    Nuxt モジュールを試す
                  </strong>{" "}
                  — 画像最適化・コンテンツ・認証などの機能を、Nuxt
                  モジュールとして設定だけで足せる。エコシステムの広さを体感できる。
                </li>
              </ul>
            </div>
          </section>

          {/* Quiz 2 — 総合 */}
          <section>
            <Quiz
              question="Nuxt 4 で useFetch による SSR の重複排除（同じデータをサーバーとクライアントで二重取得しない）が効くのはどの条件のとき？"
              options={[
                {
                  label: "ssr: true（既定の SSR モード）のとき",
                  correct: true,
                },
                { label: "ssr: false（SPA モード）のとき" },
                { label: "$fetch をイベントハンドラ内で呼んだとき" },
                { label: "routeRules で prerender を指定したページに限る" },
              ]}
              explanation="useFetch はサーバーで取得した結果をクライアントへ受け渡し、ハイドレーション時に再取得しないことで重複を防ぎます。これが効くのは ssr: true のときです。ssr: false（SPA）ではサーバー側レンダリングがないためクライアント取得のみになり、命令的な $fetch + Pinia に近い動きになります。イベントハンドラ内の取得には $fetch を使うのが基本です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vue 3.5 リリースブログ",
                  url: "https://blog.vuejs.org/posts/vue-3-5",
                  description:
                    "reactive props destructure・useId・useTemplateRef などの公式アナウンス",
                },
                {
                  title: "Vue 公式 - defineModel",
                  url: "https://ja.vuejs.org/api/sfc-script-setup.html#definemodel",
                  description:
                    "v-model を簡潔に扱う defineModel の公式リファレンス（日本語）",
                },
                {
                  title: "Nuxt 公式ドキュメント",
                  url: "https://nuxt.com/docs",
                  description:
                    "srcDir=app/・useFetch・server/api など Nuxt 4 の公式ガイド",
                },
                {
                  title: "VueUse",
                  url: "https://vueuse.org/",
                  description:
                    "実務で使う composable を集めたユーティリティ集（次の一歩におすすめ）",
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
