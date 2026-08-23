import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const stylingApproaches = [
  {
    name: "scoped",
    syntax: "<style scoped>",
    react: "CSS Modules（自動スコープ）",
    note: "そのコンポーネントだけに効く。data 属性で実現",
  },
  {
    name: "deep セレクタ",
    syntax: ":deep(.child)",
    react: "（直接の対応なし）",
    note: "scoped を貫通して子コンポーネント内部に介入",
  },
  {
    name: "module",
    syntax: "<style module> + $style",
    react: "CSS Modules（import styles）",
    note: "クラス名がハッシュ化され、$style.xxx で参照",
  },
  {
    name: "v-bind in CSS",
    syntax: "color: v-bind(textColor)",
    react: "CSS-in-JS / インラインの style 変数",
    note: "script のリアクティブな値を CSS に注入",
  },
  {
    name: "グローバル",
    syntax: "<style>（scoped なし）",
    react: "通常の import './styles.css'",
    note: "アプリ全体に効く。リセット CSS や基盤スタイル向け",
  },
];

export default function SfcStyling() {
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
            SFC とスタイリング
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Vue の単一ファイルコンポーネント（SFC）は <code>{"<style>"}</code>{" "}
            ブロックを内蔵しています。標準で
            <strong>コンポーネント単位にスコープされたスタイル</strong>
            を書けるのが大きな特徴です。 scoped・deep・module・CSS の v-bind
            という 4 つの仕組みと、Tailwind や UI
            ライブラリとの併用までを一通り確認します。
          </p>
        </div>

        <WhyNowBox
          tags={["SFC", "style scoped", "CSS Modules", "v-bind", "Tailwind"]}
        >
          <p>
            React では CSS Modules や styled-components
            を別途導入してスコープを得ますが、Vue は SFC の{" "}
            <code>{"<style scoped>"}</code>
            だけで同じ効果を標準で得られます。 一方「子コンポーネントの内部を
            親から少しだけ調整したい」「script の状態に応じて色を変えたい」
            といった現場の要求には、deep セレクタや CSS の v-bind
            という専用の仕組みが用意されています。
            この章でそれぞれの使い分けを押さえておくと、後のスタイル設計で迷いません。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 全体像 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              SFC のスタイリング手段の全体像
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              SFC の <code>{"<style>"}</code>{" "}
              には属性を付けて挙動を切り替えます。 React
              の対応概念と並べると、それぞれが何を解決する仕組みか掴みやすくなります。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      手段
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      書き方
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      React の近い概念
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stylingApproaches.map((a) => (
                    <tr key={a.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-bold text-foreground whitespace-nowrap align-top">
                        {a.name}
                      </td>
                      <td className="py-2 px-4 font-mono text-primary whitespace-nowrap align-top">
                        {a.syntax}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {a.react}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {a.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* style scoped */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              style scoped — そのコンポーネントだけに効く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>{"<style scoped>"}</code> を付けると、Vue
              コンパイラが各要素に
              <code>data-v-xxxxxxxx</code> のような一意の属性を付与し、CSS
              セレクタにもその属性を合成します。 結果として、ここで書いた{" "}
              <code>.title</code>
              は同名クラスを持つ別コンポーネントには影響しません。
            </p>

            <CodeBlock
              language="html"
              title="ScopedCard.vue — scoped でクラス衝突を防ぐ"
              code={`<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="card">
    <h3 class="title">{{ title }}</h3>
    <slot />
  </div>
</template>

<style scoped>
/* この .card / .title はこのコンポーネント内だけに効く */
.card {
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  padding: 20px;
}
.title {
  font-weight: 700;
  color: #2563eb;
}
</style>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              コンパイル後はおおよそ <code>.title[data-v-7ba5bd90]</code>{" "}
              のようなセレクタになります。 React の CSS Modules
              がクラス名をハッシュ化してスコープを作るのに対し、Vue の scoped は
              <strong>クラス名はそのまま・属性セレクタを足す</strong>方式です。
              DevTools
              で見たときにクラス名が読めるので、デバッグしやすいのが利点です。
            </p>

            <InfoBox type="success" title="scoped は標準で衝突を防げる">
              SFC に <code>scoped</code> を 1
              語足すだけで、クラス名の衝突をコンポーネント境界で止められます。
              React のように別パッケージ（CSS Modules /
              styled-components）を導入する必要はありません。 大規模化しても
              「他の画面のスタイルを壊した」 という事故が起きにくいのが SFC
              の設計上の強みです。
            </InfoBox>
          </section>

          {/* deep セレクタ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              :deep() — scoped を貫通して子に介入する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              scoped は強力ですが、
              <strong>子コンポーネントの内部要素には届きません</strong>。
              子に渡った要素には親の <code>data-v-*</code>
              属性が付かないからです。 子の内部を親から少しだけ調整したいときは{" "}
              <code>:deep()</code> セレクタで scoped を貫通させます。
            </p>

            <CodeBlock
              language="html"
              title="ParentForm.vue — 子コンポーネント内部の input を調整"
              code={`<script setup lang="ts">
import BaseInput from './BaseInput.vue'
</script>

<template>
  <div class="form">
    <!-- BaseInput の内部に <input> がある想定 -->
    <BaseInput label="メールアドレス" />
  </div>
</template>

<style scoped>
/* :deep() を付けない .input は子に届かない */
.form :deep(input) {
  border-color: #2563eb;
}

/* スロット経由で渡した内容に当てたいときは :slotted() */
.form :slotted(.note) {
  color: #71717a;
}
</style>`}
            />

            <InfoBox type="warning" title="deep は最小限に">
              <code>:deep()</code>{" "}
              は子コンポーネントの内部実装に依存します。子の DOM
              構造が変わるとスタイルが外れるため、
              <strong>
                子側で props や CSS 変数を受け取れるなら、まずそちらを優先
              </strong>
              してください。 deep は「子の API
              では届かないが、どうしても親から微調整したい」
              ケースの最終手段と捉えるのが安全です。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="<style scoped> を付けたコンポーネントで .title にスタイルを書いた。この効果として正しいのは？"
              options={[
                {
                  label: "アプリ全体の .title すべてにスタイルが当たる",
                },
                {
                  label:
                    "このコンポーネント内の .title だけに当たる（data 属性でスコープされる）",
                  correct: true,
                },
                {
                  label: "クラス名がハッシュ化され .title では参照できなくなる",
                },
                {
                  label: "子コンポーネント内部の .title まで自動で当たる",
                },
              ]}
              explanation="scoped は各要素に data-v-xxxx 属性を付与し、CSS セレクタにその属性を合成します。クラス名はそのまま使えますが、効果はこのコンポーネント内に限定されます。クラス名をハッシュ化するのは module（CSS Modules）の方で、scoped とは別物です。また scoped は子コンポーネントの内部には届かないため、そこには :deep() が必要です。"
            />
          </section>

          {/* CSS v-bind */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CSS の v-bind() — script の値を CSS に注入する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>{"<style>"}</code> の中で <code>v-bind()</code> を使うと、{" "}
              <code>{"<script setup>"}</code> の リアクティブな値を CSS
              に流し込めます。 値が変わると CSS
              変数経由で自動的に再適用されます。React で
              <code>style={"{{ color }}"}</code> をインラインで渡す代わりに、
              通常の CSS 構文のまま動的な値を扱える点が便利です。
            </p>

            <CodeBlock
              language="html"
              title="ThemeBox.vue — リアクティブな値を CSS に渡す"
              code={`<script setup lang="ts">
import { ref } from 'vue'

const textColor = ref('#2563eb')
const padding = ref(16)
</script>

<template>
  <div class="box">
    <p>v-bind で色とパディングを CSS に注入</p>
    <button @click="textColor = '#16a34a'">緑にする</button>
  </div>
</template>

<style scoped>
.box {
  /* script の ref を CSS にそのまま注入できる */
  color: v-bind(textColor);
  padding: v-bind('padding + "px"');
}
</style>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              内部的には <code>--xxxx</code> という CSS
              カスタムプロパティに変換されてインライン付与されます。
              数値に単位を足すなど式を書くときは、上の{" "}
              <code>{"v-bind('padding + \"px\"')"}</code> のように
              文字列で渡します。
            </p>
          </section>

          {/* style module */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              style module — $style で参照する CSS Modules
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>{"<style module>"}</code> を使うと、Vue は CSS Modules
              としてクラス名をハッシュ化し、
              <code>$style</code> というオブジェクトにマッピングを渡します。
              テンプレートでは <code>:class="$style.xxx"</code>
              で参照します。React の{" "}
              <code>import styles from './x.module.css'</code> +{" "}
              <code>className={"{styles.xxx}"}</code>
              とほぼ同じ考え方です。
            </p>

            <CodeBlock
              language="html"
              title="ModuleButton.vue — $style でクラスを参照"
              code={`<script setup lang="ts">
// $style はテンプレートから自動で参照できる
// useCssModule() で script からも取得可能
</script>

<template>
  <button :class="$style.button">
    送信
  </button>
</template>

<style module>
/* このクラス名はビルド時にハッシュ化される */
.button {
  background: #2563eb;
  color: #ffffff;
  border-radius: 8px;
  padding: 8px 16px;
}
</style>`}
            />

            <InfoBox type="info" title="scoped と module の使い分け">
              どちらもスコープを作りますが、
              <code>scoped</code> はクラス名をそのまま書けて手軽、{" "}
              <code>module</code> は <code>$style</code> 経由で
              <strong>クラス名を JS の値として扱える</strong>のが違いです。
              条件によってクラスを組み立てたい、TypeScript
              の補完を効かせたい場合は module が向きます。多くの場面では scoped
              で十分です。
            </InfoBox>
          </section>

          {/* Tailwind と UI ライブラリ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Tailwind と UI ライブラリの併用
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ユーティリティファースト派なら Tailwind CSS を Vue
              でもそのまま使えます。 SFC の <code>{"<template>"}</code>{" "}
              にクラスを書くだけで、 scoped
              スタイルと混在させても問題ありません。
            </p>

            <CodeBlock
              language="html"
              title="TailwindCard.vue — template にユーティリティを書く"
              code={`<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <!-- Tailwind ユーティリティをそのまま使える -->
  <div class="rounded-xl border border-zinc-200 p-5 hover:shadow-sm">
    <h3 class="font-bold text-blue-600">{{ title }}</h3>
    <slot />
  </div>
</template>`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              コンポーネント単位でまとまった UI が欲しいときは、エコシステムの
              UI ライブラリを使う選択肢もあります。 目的に応じて選びます。
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2">Vuetify</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Material Design
                  ベースで部品が豊富。管理画面など作り込み量の多い UI
                  を素早く組みたいとき。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2">Nuxt UI</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tailwind ベースで Nuxt
                  と相性が良い。ユーティリティの上に整った部品が乗る構成。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2">PrimeVue</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  データテーブルなど業務系の高機能コンポーネントが充実。テーマ切り替えも柔軟。
                </p>
              </div>
            </div>
          </section>

          {/* グローバルに当てたいとき */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              グローバルに当てたいとき
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              リセット CSS や基盤スタイルなど
              <strong>アプリ全体に効かせたいスタイル</strong> は、scoped
              を外した
              <code>{"<style>"}</code> に書くか、エントリで CSS を import
              します。 scoped ブロックの中で一部だけグローバルに当てたいときは{" "}
              <code>:global()</code> を使います。
            </p>

            <CodeBlock
              language="html"
              title="グローバルスタイルの当て方"
              code={`<!-- scoped を外せばアプリ全体に効く -->
<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
</style>

<!-- scoped の中で一部だけグローバルにしたいとき -->
<style scoped>
:global(.toast) {
  position: fixed;
  bottom: 16px;
}
</style>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              リセット CSS や Tailwind の <code>@import</code> のような基盤は、
              通常は <code>main.ts</code> で{" "}
              <code>import './assets/main.css'</code>{" "}
              のようにエントリから読み込みます。 SFC
              のスタイルブロックは「そのコンポーネント固有の見た目」を、
              エントリの CSS
              は「アプリ共通の土台」を担当する、と分けて考えると整理しやすくなります。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="親コンポーネントから、子コンポーネントの内部にある input のボーダー色を調整したい。scoped スタイルではどう書く？"
              options={[
                {
                  label: "通常どおり .input { ... } と書けば子にも届く",
                },
                {
                  label:
                    "scoped の中で :deep(input) { ... } と書いて貫通させる",
                  correct: true,
                },
                {
                  label: "$style.input を使えば子の input に当たる",
                },
                {
                  label: "v-bind(input) を CSS に書く",
                },
              ]}
              explanation="scoped スタイルは親の data-v-* 属性が付かない子の内部要素には届きません。子の内部に介入したいときは :deep() で scoped を貫通させます。ただし子の DOM 構造に依存するため、子側が props や CSS 変数で受け取れるならそちらを優先するのが安全です。$style は module、v-bind は値の注入で、いずれもこの用途とは別の仕組みです。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vue 公式 - SFC の CSS 機能",
                  url: "https://ja.vuejs.org/api/sfc-css-features",
                  description:
                    "scoped / :deep() / module / v-bind の公式リファレンス（日本語）",
                },
                {
                  title: "Vue 公式 - 単一ファイルコンポーネント",
                  url: "https://ja.vuejs.org/guide/scaling-up/sfc",
                  description:
                    "SFC の構造と style ブロックの位置づけ（日本語）",
                },
                {
                  title: "Vuetify 公式",
                  url: "https://vuetifyjs.com/",
                  description: "Material Design ベースの Vue UI ライブラリ",
                },
                {
                  title: "Nuxt UI 公式",
                  url: "https://ui.nuxt.com/",
                  description:
                    "Tailwind ベースの Vue / Nuxt 向け UI ライブラリ",
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
