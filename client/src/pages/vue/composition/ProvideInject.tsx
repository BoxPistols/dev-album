import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const reactMap = [
  {
    react: "createContext(defaultValue)",
    vue: "InjectionKey<T> を作る",
    note: "型付きの受け渡し口を定義する",
  },
  {
    react: "<Context.Provider value={...}>",
    vue: "provide(key, value)",
    note: "親で値を供給する",
  },
  {
    react: "useContext(Context)",
    vue: "inject(key)",
    note: "子孫で値を受け取る",
  },
  {
    react: "value に渡したオブジェクト",
    vue: "ref / reactive を provide",
    note: "更新が子孫まで反応する",
  },
];

export default function ProvideInject() {
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
            provide / inject
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            親コンポーネントで値を <code>provide</code> し、深い階層の子孫で
            <code>inject</code> して受け取る仕組みです。 props
            を中間コンポーネントへ延々と渡し続ける「props ドリリング」を避け、
            テーマやロケールのようなグローバル寄りの値を
            すっきり共有できます。React の Context（
            <code>createContext</code> / <code>useContext</code>
            ）と同じ役割です。
          </p>
        </div>

        <WhyNowBox
          tags={["provide", "inject", "InjectionKey", "依存性注入", "Context"]}
        >
          <p>
            コンポーネントが深くネストしてくると、上位で持っている値を下位へ届けるために
            関係のない中間コンポーネントにも props
            を通さなければなりません。これが
            <strong>props ドリリング</strong>です。 Vue の <code>provide</code>{" "}
            / <code>inject</code> は、 親が供給した値を{" "}
            <em>階層を飛び越えて</em>
            子孫が直接受け取れるようにし、 中間の受け渡しを不要にします。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 基本 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              基本: 親で provide、子孫で inject
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              親で <code>provide(キー, 値)</code> を呼ぶと、その配下の
              <strong>すべての子孫</strong>が <code>inject(キー)</code>{" "}
              で値を取り出せます。 間にいくつコンポーネントを挟んでも、props
              を経由する必要はありません。
            </p>

            <CodeBlock
              language="html"
              title="親 — provide で値を供給する"
              code={`<script setup lang="ts">
import { provide } from 'vue'
import Child from './Child.vue'

// 文字列キーで値を供給する（最小の形）
provide('message', 'こんにちは')
</script>

<template>
  <Child />
</template>`}
            />

            <CodeBlock
              language="html"
              title="子孫 — inject で値を受け取る"
              code={`<script setup lang="ts">
import { inject } from 'vue'

// 親（あるいは祖先）が provide した値を受け取る
// 見つからない場合に備えて第 2 引数で既定値を指定できる
const message = inject('message', '既定のあいさつ')
</script>

<template>
  <p>{{ message }}</p>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>inject</code> の第 2 引数は<strong>既定値</strong>です。
              対応する <code>provide</code>{" "}
              が祖先に存在しないときに使われるため、
              コンポーネントを単体で使った テストや再利用がしやすくなります。
            </p>
          </section>

          {/* React 対応 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              React Context との対応
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              React 経験者なら Context をそのまま読み替えられます。
              「供給する側」と「受け取る側」が分かれている構造は同じで、 Vue
              では Provider コンポーネントで包む代わりに
              <code>provide</code> 関数を呼ぶ点が違います。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      React
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      Vue
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reactMap.map((row) => (
                    <tr key={row.vue} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
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

            <InfoBox type="info" title="React Context 相当の機能">
              <code>provide</code> / <code>inject</code> は React の
              <strong>Context</strong>（<code>createContext</code> +{" "}
              <code>useContext</code>）に対応する依存性注入の仕組みです。
              「親から子孫へ、階層を飛ばして値を渡す」という目的も使いどころも
              ほぼ同じだと考えて差し支えありません。
            </InfoBox>
          </section>

          {/* InjectionKey */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              型安全に渡す: InjectionKey
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              文字列キーは手軽ですが、<code>inject</code> の戻り値の型が
              <code>unknown</code> になりがちで、タイプミスにも気づけません。
              TypeScript では <code>InjectionKey</code> を使うと、
              <strong>供給する値と受け取る値の型が結びつく</strong>ため、
              補完が効き、キーの取り違えもコンパイル時に検出できます。
            </p>

            <CodeBlock
              language="ts"
              title="keys.ts — 型付きのキーを 1 か所で定義する"
              code={`import type { InjectionKey, Ref } from 'vue'

export interface UserSession {
  name: string
  role: 'admin' | 'member'
}

// 値の型 (Ref<UserSession>) を InjectionKey に埋め込む
export const sessionKey: InjectionKey<Ref<UserSession>> =
  Symbol('userSession')`}
            />

            <CodeBlock
              language="html"
              title="親 — 型付きキーで provide"
              code={`<script setup lang="ts">
import { provide, ref } from 'vue'
import { sessionKey, type UserSession } from './keys'

const session = ref<UserSession>({ name: 'Hanako', role: 'admin' })

// キーの型に合った値しか渡せない（型違いはコンパイルエラー）
provide(sessionKey, session)
</script>`}
            />

            <CodeBlock
              language="html"
              title="子孫 — 型が自動で付いて取り出せる"
              code={`<script setup lang="ts">
import { inject } from 'vue'
import { sessionKey } from './keys'

// session は Ref<UserSession> | undefined と推論される
const session = inject(sessionKey)
</script>

<template>
  <p v-if="session">ようこそ {{ session.name }} さん</p>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>InjectionKey</code> には <code>Symbol</code>{" "}
              を使うのが定石です。 文字列キーと違い<strong>必ず一意</strong>に
              なるため、別ライブラリや別機能のキーと偶然衝突する心配がありません。
            </p>
          </section>

          {/* リアクティブな値 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リアクティブな値を渡す
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>ref</code> や <code>reactive</code> で作った値をそのまま
              <code>provide</code> すると、 親側で更新したときに{" "}
              <strong>子孫の表示も自動で追従</strong>します。 ただ素の文字列や
              数値を渡すと、その時点の値の<em>スナップショット</em>になり、
              後から変えても子孫には伝わりません。
            </p>

            <CodeBlock
              language="html"
              title="親 — ref を provide し、更新関数も一緒に渡す"
              code={`<script setup lang="ts">
import { provide, ref, readonly } from 'vue'
import { themeKey } from './keys'

const theme = ref<'light' | 'dark'>('light')
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// 値は readonly で渡し、変更は専用の関数に集約する
provide(themeKey, {
  theme: readonly(theme),
  toggleTheme,
})
</script>

<template>
  <button @click="toggleTheme">テーマ切り替え</button>
  <slot />
</template>`}
            />

            <CodeBlock
              language="html"
              title="子孫 — provide された ref に反応する"
              code={`<script setup lang="ts">
import { inject } from 'vue'
import { themeKey } from './keys'

const injected = inject(themeKey)
</script>

<template>
  <!-- 親が toggleTheme を呼ぶと、ここの表示も自動で変わる -->
  <div :class="injected?.theme === 'dark' ? 'theme-dark' : 'theme-light'">
    現在のテーマ: {{ injected?.theme }}
  </div>
</template>`}
            />

            <InfoBox type="warning" title="更新は親側に集約する">
              子孫から直接 <code>ref</code>{" "}
              を書き換えると、どこで状態が変わったのか追えなくなります。 値は{" "}
              <code>readonly</code> で渡し、更新したいときは 一緒に provide した
              <strong>
                関数（上の例では <code>toggleTheme</code>）
              </strong>
              を呼ぶ設計にすると、
              データの流れが「親で変える・子で読む」に保てます。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="provide / inject が最も向いているのはどの用途？"
              options={[
                {
                  label:
                    "テーマやロケール、現在ユーザーなど、多くの子孫が参照するグローバル寄りの値の共有",
                  correct: true,
                },
                { label: "親子間で 1 段だけ値を渡す（通常の props で十分）" },
                {
                  label: "兄弟コンポーネント同士でイベントを直接やり取りする",
                },
                { label: "API レスポンスをキャッシュして再取得を防ぐ" },
              ]}
              explanation="provide / inject は、深い階層の多くの子孫が共通して参照する値（テーマ・ロケール・現在ユーザーなど）を、中間の props 受け渡しなしで届けるための仕組みです。親子 1 段なら通常の props で十分で、わざわざ inject を使う必要はありません。兄弟間の通信や取得キャッシュは別の手段（状態管理ライブラリやデータ取得 composable）の領域です。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="TypeScript で provide / inject を型安全にするために使うものは？"
              options={[
                {
                  label: "文字列キーをそのまま使い、戻り値を as でキャストする",
                },
                {
                  label:
                    "InjectionKey<T>（多くは Symbol）を定義し、provide と inject で共有する",
                  correct: true,
                },
                { label: "defineProps のコンパイラマクロを使う" },
                { label: "any を返す inject にして型チェックを無効化する" },
              ]}
              explanation="InjectionKey<T> を一度定義しておけば、provide で渡せる値の型と inject の戻り値の型が結びつき、補完とコンパイル時チェックが効きます。Symbol を使うとキーが必ず一意になり衝突しません。as キャストや any は型安全を捨てることになり、defineProps は props 受け取り用のマクロで provide / inject とは別物です。"
            />
          </section>

          {/* 使い分け */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              使いすぎない: Pinia との使い分け
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>provide</code> / <code>inject</code>{" "}
              は便利ですが、多用すると 「この値はどこの祖先から来ているのか」が
              コードを追わないと分からなくなります。 props
              と違ってデータの出どころが暗黙になるのが弱点です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              目安として、<strong>特定のコンポーネントツリーの内側</strong>
              （ダイアログの中、フォームの中など）で閉じた共有なら provide /
              inject が向きます。 一方、画面をまたいで使う
              <strong>アプリ全体の状態</strong>（ログインユーザー、カート、
              通知など）は、専用の状態管理ライブラリ
              <strong>Pinia</strong> の方が、 出どころが明確で DevTools
              でも追いやすくなります。
            </p>

            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-bold text-foreground mb-3">
                判断の目安
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li>
                  <strong className="text-foreground">provide / inject</strong>
                  ：ツリー内に閉じた共有（テーマ、フォームの設定、コンポーネントライブラリの内部連携）
                </li>
                <li>
                  <strong className="text-foreground">Pinia</strong>
                  ：画面をまたぐアプリ全体の状態。state / getters / actions
                  が整理され、出どころが明確
                </li>
              </ul>
            </div>

            <InfoBox type="info" title="アプリ全体の状態は Pinia が向く">
              ログインユーザーやカートのような、複数の画面で共有する状態は
              <strong>Pinia</strong> の方が適しています。 provide / inject
              は「どこから来た値か」が暗黙になりやすいため、
              アプリ全体に広がる状態管理には Pinia のような専用ストアを選ぶと、
              データフローが追いやすくなります。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vue 公式 - provide / inject",
                  url: "https://ja.vuejs.org/guide/components/provide-inject.html",
                  description:
                    "provide / inject の基本・リアクティビティ・InjectionKey の解説（日本語）",
                },
                {
                  title:
                    "Vue 公式 - TypeScript で provide / inject を型付けする",
                  url: "https://ja.vuejs.org/guide/typescript/composition-api.html#typing-provide-inject",
                  description:
                    "InjectionKey を使った型安全な受け渡しの公式手順",
                },
                {
                  title: "Vue 公式 API - provide()",
                  url: "https://ja.vuejs.org/api/composition-api-dependency-injection.html",
                  description:
                    "provide / inject 関数の API リファレンス（日本語）",
                },
                {
                  title: "Pinia 公式",
                  url: "https://pinia.vuejs.org/",
                  description:
                    "アプリ全体の状態管理に向く Vue 公式の状態管理ライブラリ",
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
