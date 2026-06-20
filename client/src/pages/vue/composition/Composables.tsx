import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const conventions = [
  {
    rule: "use プレフィックスを付ける",
    detail:
      "useMouse / useFetch のように use で始める。React のカスタムフックと同じ命名規約",
  },
  {
    rule: "リアクティブな状態を返す",
    detail:
      "内部で ref / computed を作り、それを返す。呼び出し側は .value でアクセスできる",
  },
  {
    rule: "ライフサイクルを内包してよい",
    detail:
      "onMounted / onUnmounted を composable の中に書ける。後片付けまで関数内で完結させる",
  },
  {
    rule: "1 関数 1 責務",
    detail:
      "「マウス座標を追う」「ウィンドウ幅を監視する」など、関心ごとを 1 つに絞る",
  },
];

export default function Composables() {
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
            Composables（再利用ロジック）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Composable
            は、リアクティブな状態とロジックをまとめて関数に切り出し、
            複数のコンポーネントで共有するための仕組みです。<code>use</code>{" "}
            プレフィックスを付けた関数で、React の
            <strong>カスタムフック</strong>とほぼ同じ思想です。
            ロジックを部品化して、画面ごとに書き直さない形を作ります。
          </p>
        </div>

        <WhyNowBox
          tags={["Composables", "Composition API", "ref", "useMouse", "VueUse"]}
        >
          <p>
            Options API の時代は、複数コンポーネントでロジックを共有するのに
            mixin を使っていましたが、
            どの状態がどこから来たのか追いにくいという問題がありました。
            Composition API
            では、ロジックを普通の関数（composable）として切り出せるため、
            <strong>依存関係が import で明示され</strong>、型も効きます。 React
            のカスタムフックを書いた経験があれば、考え方はそのまま使えます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* composable とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Composable とは何か
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Composable は「Composition API
              を使って、状態を持つロジックをカプセル化した関数」です。 中で{" "}
              <code>ref</code> や <code>computed</code>{" "}
              を作り、必要なライフサイクル （<code>onMounted</code>{" "}
              など）を登録し、 結果のリアクティブな値を返します。 React の
              <code>useState</code> + <code>useEffect</code> を 1
              つの関数に閉じ込めたものをイメージすると近いです。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">React との対応</strong>：
                React のカスタムフック（<code>useXxx</code>）と Vue の
                composable は、
                「状態を持つロジックを関数として共有する」という目的が同じです。
                大きな違いは、Vue の composable には{" "}
                <strong>
                  React の Hooks
                  ルール（トップレベルでのみ呼ぶ・条件分岐の中で呼ばない）が原則ない
                </strong>
                こと。 Vue
                のリアクティビティはコンポーネントのレンダー回数に依存しないためです。
              </p>
            </div>
          </section>

          {/* useMouse */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              例：useMouse を作る
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              マウス座標を追う <code>useMouse</code> を作ります。 内部で{" "}
              <code>ref</code> を 2 つ持ち、
              <code>onMounted</code> でイベントを登録、 <code>onUnmounted</code>{" "}
              で解除します。 後片付けまで関数の中で完結するのがポイントです。
            </p>

            <CodeBlock
              language="ts"
              title="src/composables/useMouse.ts — composable の定義"
              code={`import { ref, onMounted, onUnmounted } from 'vue'

// マウス座標を追跡する composable
export function useMouse() {
  // リアクティブな状態を関数の中で持つ
  const x = ref(0)
  const y = ref(0)

  function update(event: MouseEvent) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // ライフサイクルも composable の中で完結させる
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // リアクティブな状態を返す（呼び出し側で .value または template で自動アンラップ）
  return { x, y }
}`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              使う側のコンポーネントは <code>import</code>{" "}
              して呼び出すだけです。 返ってきた
              <code>x</code> / <code>y</code> は ref なので、template
              の中では自動でアンラップされ、
              <code>.value</code> を書かずにそのまま表示できます。
            </p>

            <CodeBlock
              language="html"
              title="src/components/MouseTracker.vue — 利用側 SFC"
              code={`<script setup lang="ts">
import { useMouse } from '@/composables/useMouse'

// 1 行でロジックを取り込める
const { x, y } = useMouse()
</script>

<template>
  <p>マウス座標: {{ x }}, {{ y }}</p>
</template>`}
            />

            <InfoBox
              type="info"
              title="同じ composable を複数回呼ぶと、それぞれ独立した状態になる"
            >
              <code>const a = useMouse()</code> と{" "}
              <code>const b = useMouse()</code> をそれぞれ呼ぶと、内部の{" "}
              <code>ref</code>{" "}
              は呼び出しごとに新しく作られるため、独立した状態になります。
              全コンポーネントで状態を共有したい場合は、composable ではなく
              Pinia（ストア）を使います。
            </InfoBox>
          </section>

          {/* 引数を取る composable */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              引数を受け取る composable
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              composable は引数を取れます。
              たとえば「指定したメディアクエリにマッチするか」を返す
              <code>useMediaQuery</code> です。 <code>computed</code>{" "}
              を返せば、依存が変わったときだけ再計算される算出値になります。
            </p>

            <CodeBlock
              language="ts"
              title="src/composables/useMediaQuery.ts — 引数つき composable"
              code={`import { ref, onMounted, onUnmounted } from 'vue'

// メディアクエリにマッチするかをリアクティブに返す
export function useMediaQuery(query: string) {
  const matches = ref(false)

  let mql: MediaQueryList

  function update() {
    matches.value = mql.matches
  }

  onMounted(() => {
    mql = window.matchMedia(query)
    update()
    mql.addEventListener('change', update)
  })

  onUnmounted(() => {
    mql?.removeEventListener('change', update)
  })

  return { matches }
}`}
            />

            <CodeBlock
              language="html"
              title="利用側 — 画面幅で表示を切り替える"
              code={`<script setup lang="ts">
import { useMediaQuery } from '@/composables/useMediaQuery'

const { matches: isWide } = useMediaQuery('(min-width: 768px)')
</script>

<template>
  <nav v-if="isWide">デスクトップ用ナビ</nav>
  <button v-else>メニューを開く</button>
</template>`}
            />
          </section>

          {/* 命名・規約 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              命名と書き方の規約
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              composable は普通の関数なので技術的な制約は少ないですが、
              読みやすさのために慣習があります。 React
              のカスタムフックを書いたことがあれば、ほとんど同じ感覚です。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      規約
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      内容
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {conventions.map((c) => (
                    <tr key={c.rule} className="border-b border-border">
                      <td className="py-2 pr-4 font-bold text-primary whitespace-nowrap align-top">
                        {c.rule}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {c.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="warning" title="reactive を返すなら分割代入に注意">
              composable が <code>reactive</code> なオブジェクトを返す場合、
              呼び出し側で分割代入するとリアクティビティが切れます。
              <code>ref</code> を個別に返すか、 <code>reactive</code> を返すなら
              <code>toRefs</code> を通してから返すのが安全です。 上の例のように{" "}
              <code>ref</code> を返す形が最もトラブルが少ない設計です。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Vue の composable の命名規約として正しいものはどれ？"
              options={[
                {
                  label: "Composable プレフィックスを付ける（ComposableMouse）",
                },
                {
                  label: "use プレフィックスを付ける（useMouse）",
                  correct: true,
                },
                { label: "$ プレフィックスを付ける（$mouse）" },
                { label: "PascalCase にする（Mouse）" },
              ]}
              explanation="composable は use プレフィックスを付けた関数として書くのが慣習です（useMouse / useFetch など）。これは React のカスタムフックと同じ命名規約で、「状態を持つロジックを共有する関数」であることを名前から判別できるようにするためです。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="composable は呼び出し側に何を返すのが基本？"
              options={[
                { label: "HTML 文字列" },
                {
                  label:
                    "ref / computed などのリアクティブな状態（と操作用の関数）",
                  correct: true,
                },
                { label: "DOM 要素そのもの" },
                { label: "何も返さない（戻り値は void が原則）" },
              ]}
              explanation="composable は内部で作った ref や computed といったリアクティブな状態を返すのが基本です。あわせて状態を更新するための関数を返すこともあります。template の中では ref が自動アンラップされるため、呼び出し側は .value を書かずに表示できます。"
            />
          </section>

          {/* VueUse */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              VueUse：既製の composable 集
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>VueUse</strong> は、コミュニティが整備した composable
              のコレクションです。 マウス座標・ウィンドウサイズ・localStorage
              同期・クリップボード・ダークモードなど、
              よく使うものが多数そろっています。 自分で <code>useMouse</code>{" "}
              を書く前に、まず VueUse に同じものがないか探すと早いです。
            </p>

            <CodeBlock
              language="bash"
              title="VueUse の導入"
              code={`# インストール
npm install @vueuse/core`}
            />

            <CodeBlock
              language="html"
              title="VueUse を使う — useMouse / useLocalStorage"
              code={`<script setup lang="ts">
import { useMouse, useLocalStorage } from '@vueuse/core'

// 自作せず、整備済みの composable を取り込む
const { x, y } = useMouse()

// localStorage と双方向に同期する ref
const name = useLocalStorage('user-name', '')
</script>

<template>
  <p>座標: {{ x }}, {{ y }}</p>
  <input v-model="name" placeholder="名前（自動保存）" />
</template>`}
            />

            <InfoBox type="success" title="まず VueUse を探す">
              localStorage
              同期・ダークモード・スクロール位置・無限スクロールなど、
              「よくある UI ロジック」はたいてい VueUse に既製品があります。
              React でいう usehooks 系ライブラリに近い位置づけです。
              自作する前に VueUse
              のドキュメントを検索すると、テスト済みのものをそのまま使えて確実です。
            </InfoBox>
          </section>

          {/* いつ自作・いつ Pinia */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              composable と Pinia の使い分け
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              composable は呼び出すたびに独立した状態を作ります。
              一方、アプリ全体で
              <strong>1 つの状態を共有</strong>したい
              （ログインユーザー・カート・テーマなど）場合は
              Pinia（ストア）が向いています。
            </p>
            <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
              <li>
                <strong className="text-foreground">composable</strong>：
                コンポーネントごとに独立した、再利用可能なロジック（マウス追跡・フォーム入力など）
              </li>
              <li>
                <strong className="text-foreground">Pinia</strong>：
                アプリ全体で 1
                つだけ共有する状態（認証情報・グローバル設定など）
              </li>
            </ul>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vue 公式 - コンポーザブル",
                  url: "https://ja.vuejs.org/guide/reusability/composables.html",
                  description:
                    "composable の定義・命名規約・mixin との比較（日本語）",
                },
                {
                  title: "VueUse 公式",
                  url: "https://vueuse.org/",
                  description:
                    "コミュニティ製 composable コレクションのドキュメント",
                },
                {
                  title: "Vue 公式 - リアクティビティの基礎",
                  url: "https://ja.vuejs.org/guide/essentials/reactivity-fundamentals.html",
                  description:
                    "composable の中で使う ref / reactive の基礎（日本語）",
                },
                {
                  title: "Pinia 公式",
                  url: "https://pinia.vuejs.org/",
                  description:
                    "アプリ全体で状態を共有する場合に使うストアの公式ドキュメント",
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
