import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const sfcBlocks = [
  {
    block: "<script setup>",
    role: "ロジック・状態・import を書く。React の関数コンポーネント本体に相当",
  },
  {
    block: "<template>",
    role: "見た目（HTML ベースのマークアップ）。React の return 内 JSX に相当",
  },
  {
    block: "<style>",
    role: "スタイル。scoped を付けるとそのコンポーネントだけに効く",
  },
];

export default function Components() {
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
            コンポーネントの基本
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Vue の UI は <code>.vue</code>（単一ファイルコンポーネント、SFC）
            を組み合わせて作ります。3
            ブロック構成の意味、子コンポーネントの作り方と使い方、 そして slot
            による「中身の差し込み」までを、具体的な SFC コードで確認します。
          </p>
        </div>

        <WhyNowBox
          tags={["SFC", "script setup", "コンポーネント", "slot", "Vue 3"]}
        >
          <p>
            React で UI を関数コンポーネントに分割するのと同じく、Vue でも画面を
            小さな <strong>コンポーネント</strong> に分けて組み立てます。 Vue 3
            の <code>{"<script setup>"}</code> では、 子コンポーネントを{" "}
            <strong>import するだけで使える</strong>（明示的な登録が不要）
            ため、React の感覚に近い手触りで分割を進められます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 3 ブロック構成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              SFC の 3 ブロック構成
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              1 つの <code>.vue</code> ファイルは、ロジック・見た目・スタイルの
              3 ブロックで構成されます。React では JSX
              の中に全部を書きますが、Vue
              は役割ごとにブロックが分かれているため、どこに何を書くかが視覚的に明確です。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      ブロック
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sfcBlocks.map((b) => (
                    <tr key={b.block} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {b.block}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {b.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="html"
              title="src/components/Greeting.vue — 最小の SFC"
              code={`<script setup lang="ts">
import { ref } from 'vue'

const name = ref('Vue')
</script>

<template>
  <p class="greeting">こんにちは、{{ name }} さん</p>
</template>

<style scoped>
.greeting {
  color: #42b883;
}
</style>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>{'<script setup lang="ts">'}</code>{" "}
              内で宣言した変数や関数は、 そのまま <code>{"<template>"}</code>{" "}
              から参照できます。React のように
              <code>return</code> で JSX
              を返すのではなく、テンプレートが別ブロックとして 並ぶのが Vue
              のスタイルです。
            </p>
          </section>

          {/* 子コンポーネントの作成と利用 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              子コンポーネントを作って使う
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              別の <code>.vue</code> ファイルを作り、親側で <code>import</code>
              するだけで子コンポーネントとして使えます。 Vue 2 で必要だった{" "}
              <code>components</code> オプションへの登録は、
              <code>{"<script setup>"}</code> では不要です。 import した名前が
              そのままテンプレートのタグ名になります。
            </p>

            <CodeBlock
              language="html"
              title="src/components/UserCard.vue — 子コンポーネント（props を受け取る）"
              code={`<script setup lang="ts">
// defineProps はコンパイラマクロ（import 不要）
const props = defineProps<{
  name: string
  role: string
}>()
</script>

<template>
  <div class="card">
    <p class="name">{{ props.name }}</p>
    <p class="role">{{ props.role }}</p>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 12px 16px;
}
.role {
  color: #71717a;
  font-size: 0.875rem;
}
</style>`}
            />

            <CodeBlock
              language="html"
              title="src/App.vue — 親が子を import して使う"
              code={`<script setup lang="ts">
// import するだけで <UserCard> として使える（登録不要）
import UserCard from './components/UserCard.vue'
</script>

<template>
  <main>
    <h1>メンバー一覧</h1>
    <UserCard name="佐藤" role="エンジニア" />
    <UserCard name="鈴木" role="デザイナー" />
  </main>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              React で <code>{'<UserCard name="佐藤" />'}</code> と書くのと
              ほぼ同じ感覚です。 違いは「子を import
              すれば自動でタグとして使える」点と、 props を{" "}
              <code>defineProps</code> という<strong>コンパイラマクロ</strong>
              （import 不要）で受け取る点です。
            </p>

            <InfoBox type="info" title="props の型は defineProps で宣言する">
              <code>{"defineProps<{ name: string }>()"}</code> のように型引数で
              props を宣言すると、TypeScript
              の補完と型チェックがそのまま効きます。 React の{" "}
              <code>{"Props"}</code> 型定義に相当する役割を、Vue では
              <code>defineProps</code> が担います（props
              の詳細は別の章で扱います）。
            </InfoBox>
          </section>

          {/* Quiz 1: 登録 */}
          <section>
            <Quiz
              question="Vue 3 の <script setup> で、子コンポーネントを使うために必要なことは？"
              options={[
                {
                  label:
                    "子コンポーネントを import すれば、そのまま template でタグとして使える",
                  correct: true,
                },
                {
                  label: "components オプションに登録してから template で使う",
                },
                {
                  label:
                    "main.ts で app.component() を呼んでグローバル登録する",
                },
                { label: "defineComponent で明示的にラップする必要がある" },
              ]}
              explanation="<script setup> では、子コンポーネントを import するだけで template 内のタグとして使えます。components オプションへの明示的な登録は不要です（Vue 2 の Options API では必要でした）。app.component() によるグローバル登録も可能ですが、通常はファイル単位の import が推奨されます。"
            />
          </section>

          {/* slot */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              slot で「中身」を差し込む
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              props は「データ」を渡しますが、slot は
              <strong>「マークアップ（中身）」</strong>を渡す仕組みです。
              子コンポーネントのテンプレートに <code>{"<slot />"}</code>
              を置くと、親がタグの内側に書いた内容がそこに差し込まれます。 React
              の <code>children</code> に相当します。
            </p>

            <CodeBlock
              language="html"
              title="src/components/Panel.vue — デフォルトスロット"
              code={`<script setup lang="ts"></script>

<template>
  <section class="panel">
    <!-- 親がタグの内側に書いた内容がここに入る -->
    <slot />
  </section>
</template>

<style scoped>
.panel {
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 16px;
}
</style>`}
            />

            <CodeBlock
              language="html"
              title="親が Panel の中身を渡す"
              code={`<script setup lang="ts">
import Panel from './components/Panel.vue'
</script>

<template>
  <Panel>
    <!-- このマークアップが Panel の <slot /> に差し込まれる -->
    <h2>お知らせ</h2>
    <p>本日のメンテナンスは完了しました。</p>
  </Panel>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              React で <code>{"<Panel>...</Panel>"}</code> の中身が
              <code>props.children</code> として渡るのと同じ考え方です。Vue では
              その差し込み口を <code>{"<slot />"}</code> として明示します。
            </p>
          </section>

          {/* 名前付きスロット */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              名前付きスロットで複数の差し込み口を作る
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              差し込み口を複数持ちたい場合は、<code>name</code> を付けた
              <strong>名前付きスロット</strong>を使います。 親側は
              <code>{"<template #名前>"}</code>（<code>v-slot:</code>{" "}
              の短縮記法） でどのスロットに入れるかを指定します。
              ヘッダー・本文・フッターを 分けたカードなどで役立ちます。
            </p>

            <CodeBlock
              language="html"
              title="src/components/Card.vue — header / default / footer の 3 スロット"
              code={`<script setup lang="ts"></script>

<template>
  <article class="card">
    <header class="card-header">
      <slot name="header" />
    </header>

    <div class="card-body">
      <!-- 名前のない slot がデフォルトスロット -->
      <slot />
    </div>

    <footer class="card-footer">
      <slot name="footer" />
    </footer>
  </article>
</template>

<style scoped>
.card {
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  overflow: hidden;
}
.card-header,
.card-footer {
  background: #f4f4f5;
  padding: 8px 16px;
}
.card-body {
  padding: 16px;
}
</style>`}
            />

            <CodeBlock
              language="html"
              title="親が各スロットに中身を割り当てる"
              code={`<script setup lang="ts">
import Card from './components/Card.vue'
</script>

<template>
  <Card>
    <!-- #header は v-slot:header の短縮記法 -->
    <template #header>
      <h2>プロフィール</h2>
    </template>

    <!-- template で囲まないものはデフォルトスロットに入る -->
    <p>Vue を学習中のエンジニアです。</p>

    <template #footer>
      <button>編集する</button>
    </template>
  </Card>
</template>`}
            />

            <InfoBox
              type="success"
              title="slot は React の children / render props に相当"
            >
              名前のないデフォルトスロットは React の{" "}
              <code>props.children</code> に、名前付きスロットは「複数の
              children を名前で渡す」発想に近いものです。 さらに slot
              から親へ値を渡す「スコープ付きスロット」は、React の
              <strong>render props</strong>
              に相当します（発展トピックとして公式ドキュメントを参照してください）。
            </InfoBox>
          </section>

          {/* 分割の考え方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              コンポーネント分割の考え方
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              「データを渡したい」なら
              props、「見た目の一部を外から差し替えたい」 なら
              slot、と役割で使い分けるのが基本です。 汎用的な枠
              （Panel・Card・Dialog など）は slot
              で中身を受け取ると、再利用しやすくなります。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <p className="text-foreground font-bold mb-3">使い分けの目安</p>
              <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed">
                <li>
                  <code className="text-primary">props</code> —
                  文字列・数値・オブジェクトなど「値」を渡したいとき
                </li>
                <li>
                  <code className="text-primary">slot</code> —
                  見出しやボタンなど「マークアップ（中身）」を外から差し込みたいとき
                </li>
                <li>
                  <code className="text-primary">名前付き slot</code> —
                  ヘッダー・本文・フッターのように差し込み口が複数あるとき
                </li>
              </ul>
            </div>

            <InfoBox type="warning" title="props と slot を取り違えない">
              タイトル文字列のような単純な値まで slot
              で渡すと、かえって冗長になります。 値は props、構造を持つ中身は
              slot、と切り分けると、
              親側の記述がすっきりして再利用性も上がります。
            </InfoBox>
          </section>

          {/* Quiz 2: slot の役割 */}
          <section>
            <Quiz
              question="子コンポーネントの template に書いた <slot /> の役割は？"
              options={[
                {
                  label:
                    "親がそのコンポーネントのタグの内側に書いたマークアップが差し込まれる場所",
                  correct: true,
                },
                {
                  label: "props を受け取るための予約タグ",
                },
                {
                  label:
                    "子コンポーネントを非同期に読み込むためのプレースホルダ",
                },
                { label: "スタイルを scoped にするための宣言" },
              ]}
              explanation="<slot /> は、親がそのコンポーネントのタグの内側に書いた内容（マークアップ）を差し込む場所です。React の props.children に相当します。名前を付けない slot がデフォルトスロット、name 属性を付けると名前付きスロットになり、親は <template #名前> で対応する中身を割り当てます。props はあくまで「値」を渡す仕組みで、slot とは役割が異なります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vue 公式 - コンポーネントの基礎",
                  url: "https://ja.vuejs.org/guide/essentials/component-basics.html",
                  description:
                    "コンポーネントの定義・利用・props の基本（日本語）",
                },
                {
                  title: "Vue 公式 - スロット",
                  url: "https://ja.vuejs.org/guide/components/slots.html",
                  description:
                    "デフォルトスロット・名前付きスロット・スコープ付きスロットの解説（日本語）",
                },
                {
                  title: "Vue 公式 - 単一ファイルコンポーネント",
                  url: "https://ja.vuejs.org/guide/scaling-up/sfc.html",
                  description: "SFC の構造と 3 ブロックの仕組み（日本語）",
                },
                {
                  title: "Vue 公式 - script setup",
                  url: "https://ja.vuejs.org/api/sfc-script-setup.html",
                  description:
                    "import するだけで子を使える仕組みやコンパイラマクロの仕様（日本語）",
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
