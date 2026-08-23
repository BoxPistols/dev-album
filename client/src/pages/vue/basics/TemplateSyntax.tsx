import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const directives = [
  {
    name: "v-bind（:）",
    purpose: "属性に値をバインドする",
    react: "属性式 href={url}",
  },
  {
    name: "v-on（@）",
    purpose: "イベントを購読する",
    react: "onClick={handler}",
  },
  {
    name: "v-if / v-else",
    purpose: "条件で DOM を付け外しする",
    react: "三項演算子 / 論理積 &&",
  },
  {
    name: "v-show",
    purpose: "条件で display を切り替える",
    react: "style={{ display: ... }}",
  },
  {
    name: "v-for",
    purpose: "配列・オブジェクトを繰り返す",
    react: "配列の map()",
  },
  {
    name: "v-model",
    purpose: "フォーム入力と値を双方向に同期",
    react: "value + onChange の手書き",
  },
];

export default function TemplateSyntax() {
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
            テンプレート構文とディレクティブ
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Vue の <code>{"<template>"}</code> は、HTML
            をベースにした宣言的な記法です。 マスタッシュ補間
            <code>{"{{ }}"}</code> で値を表示し、<strong>ディレクティブ</strong>
            （<code>v-</code>{" "}
            から始まる特別な属性）で属性バインド・イベント・条件・繰り返しを表現します。
            React の JSX で式・<code>onClick</code>・三項・
            <code>map()</code> として書いていたものが、Vue では HTML
            の属性として並びます。
          </p>
        </div>

        <WhyNowBox tags={["v-bind", "v-on", "v-if", "v-for", "v-model"]}>
          <p>
            ディレクティブは Vue テンプレートの中心です。これらを覚えると、JSX
            で関数として書いていた表示ロジックの大半が HTML
            の属性で表現できるようになります。 React 経験者は{" "}
            <code>{"{value}"}</code> →<code>{"{{ value }}"}</code>、
            <code>onClick</code> →<code>@click</code>、<code>map()</code> →{" "}
            <code>v-for</code>{" "}
            の対応を押さえると、テンプレートを素早く読めます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 対応表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ディレクティブの全体像（React 対応つき）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              この章で扱う主なディレクティブと、React
              での対応する書き方をまとめます。
              名前と用途を先に俯瞰してから、個別の例に進みます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      ディレクティブ
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      用途
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      React での対応
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {directives.map((d) => (
                    <tr key={d.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {d.name}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {d.purpose}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground font-mono">
                        {d.react}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* マスタッシュ補間 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              マスタッシュ補間とテキスト表示
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              二重中括弧 <code>{"{{ }}"}</code>{" "}
              の中に式を書くと、その結果がテキストとして描画されます。 React の
              JSX で <code>{"{value}"}</code>{" "}
              と書くのに当たります。中括弧の数が違う（Vue は 2 つ、JSX は 1
              つ）点だけ注意してください。
            </p>

            <CodeBlock
              language="html"
              title="補間 — 値・式・メソッド呼び出し"
              code={`<script setup lang="ts">
import { ref } from 'vue'

const name = ref('Vue')
const count = ref(3)

function shout(text: string) {
  return text.toUpperCase()
}
</script>

<template>
  <!-- 変数を表示 -->
  <p>Hello {{ name }}</p>

  <!-- 式も書ける（文は書けない） -->
  <p>2 倍は {{ count * 2 }}</p>

  <!-- メソッド呼び出しも式として評価される -->
  <p>{{ shout(name) }}</p>
</template>`}
            />

            <InfoBox type="info" title="補間に書けるのは「式」だけ">
              <code>{"{{ }}"}</code> の中に書けるのは 1
              つの式（値を返すもの）です。
              <code>if</code> 文や <code>for</code> などの文は書けません。これは
              JSX
              の中括弧と同じ制約で、条件分岐や繰り返しは専用のディレクティブ（
              <code>v-if</code> / <code>v-for</code>）で行います。
            </InfoBox>
          </section>

          {/* v-bind */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              属性バインド — v-bind（省略記法 :）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              属性の値を変数や式にしたいときは <code>v-bind</code>{" "}
              を使います。実際にはコロン <code>:</code>{" "}
              の省略記法をほぼ常に使います。 JSX の <code>href={"{url}"}</code>{" "}
              に当たり、Vue では <code>:href="url"</code> と書きます。
            </p>

            <CodeBlock
              language="html"
              title="v-bind — 属性に式を渡す"
              code={`<script setup lang="ts">
import { ref } from 'vue'

const url = ref('https://vuejs.org')
const isActive = ref(true)
const imageSrc = ref('/logo.png')
</script>

<template>
  <!-- :href は v-bind:href の省略記法 -->
  <a :href="url">公式サイト</a>

  <!-- クラスのオブジェクト構文（true のキーだけ付く） -->
  <p :class="{ active: isActive }">状態つきの段落</p>

  <!-- 属性名も式で書ける -->
  <img :src="imageSrc" alt="ロゴ" />
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>:class</code>{" "}
              にオブジェクトを渡すと、値が真のキーだけがクラスとして付きます。
              React の <code>classnames</code> ライブラリと同じ発想が、Vue
              では標準機能として使えます。
            </p>
          </section>

          {/* v-on */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              イベント — v-on（省略記法 @）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              イベントの購読は <code>v-on</code>、省略記法は <code>@</code>{" "}
              です。 JSX の <code>onClick={"{handler}"}</code> が、Vue では{" "}
              <code>@click="handler"</code> になります。 修飾子（
              <code>.prevent</code> など）でよくある定型処理を短く書けます。
            </p>

            <CodeBlock
              language="html"
              title="v-on — クリックと修飾子"
              code={`<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <!-- @click は v-on:click の省略記法 -->
  <button @click="increment">+1</button>

  <!-- インライン式も書ける -->
  <button @click="count++">直接 +1</button>

  <!-- 修飾子: submit の preventDefault を自動で行う -->
  <form @submit.prevent="increment">
    <button type="submit">送信</button>
  </form>

  <p>count: {{ count }}</p>
</template>`}
            />

            <InfoBox type="info" title="修飾子は React の手書きを置き換える">
              React では <code>e.preventDefault()</code>{" "}
              をハンドラ内で自分で呼びますが、Vue は{" "}
              <code>@submit.prevent</code> のように{" "}
              <strong>イベント修飾子</strong> で宣言的に書けます。 ほかにも{" "}
              <code>.stop</code>（伝播停止）・
              <code>.once</code>（一度だけ）・<code>@keyup.enter</code>
              （Enter キー限定）などがあります。
            </InfoBox>
          </section>

          {/* v-if / v-show */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              条件分岐 — v-if / v-else-if / v-else と v-show
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              条件で表示を切り替える方法は 2 種類あります。
              <code>v-if</code> は要素を DOM に付けたり外したりし、
              <code>v-show</code> は要素を残したまま <code>display</code>{" "}
              を切り替えます。 React では三項演算子や論理積 <code>&&</code>{" "}
              で書き分けていた部分が、Vue ではディレクティブになります。
            </p>

            <CodeBlock
              language="html"
              title="v-if / v-else-if / v-else と v-show"
              code={`<script setup lang="ts">
import { ref } from 'vue'

const score = ref(80)
const isOpen = ref(true)
</script>

<template>
  <!-- v-if: 条件で DOM ごと付け外しする -->
  <p v-if="score >= 80">合格（DOM が存在する）</p>
  <p v-else-if="score >= 60">あと一歩</p>
  <p v-else>不合格</p>

  <!-- v-show: 要素は常に DOM にあり、display を切り替える -->
  <p v-show="isOpen">トグル対象（display で表示制御）</p>
  <button @click="isOpen = !isOpen">切り替え</button>
</template>`}
            />

            <InfoBox type="warning" title="v-if と v-show の使い分け">
              <p className="mb-2">
                <code>v-if</code> は条件が偽のとき要素を DOM
                から完全に外します。
                付け外しのたびに生成・破棄のコストがかかるため、
                <strong>切り替え頻度が低い</strong>場合に向きます。
              </p>
              <p>
                <code>v-show</code> は要素を DOM に残したまま{" "}
                <code>display: none</code> を切り替えるだけなので、
                <strong>頻繁に表示・非表示を繰り返す</strong>{" "}
                トグル（タブやアコーディオン）に向きます。 なお{" "}
                <code>v-show</code> は <code>v-else</code>{" "}
                と組み合わせられない点に注意してください。
              </p>
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="v-if と v-show の違いとして正しいものはどれ？"
              options={[
                {
                  label:
                    "v-if は DOM ごと付け外し、v-show は display を切り替える（要素は DOM に残る）",
                  correct: true,
                },
                {
                  label:
                    "v-if は display を切り替え、v-show は DOM ごと付け外しする",
                },
                {
                  label: "どちらも完全に同じで、書き方が違うだけ",
                },
                {
                  label: "v-show は条件分岐できず、v-if だけが条件を持てる",
                },
              ]}
              explanation="v-if は条件が偽のとき要素を DOM から外し、真になったときに再生成します。一方 v-show は要素を常に DOM に残し、CSS の display プロパティだけを切り替えます。そのため、切り替え頻度が高いトグルには v-show、初期表示の有無が決まりほぼ変わらない場合には v-if が向きます。"
            />
          </section>

          {/* v-for */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リスト描画 — v-for（key 必須）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              配列やオブジェクトを繰り返して描画するには <code>v-for</code>{" "}
              を使います。 React の <code>map()</code> に当たり、各要素に一意な{" "}
              <code>:key</code> を付ける点も React と同じです。
              配列だけでなくオブジェクトも反復できます。
            </p>

            <CodeBlock
              language="html"
              title="v-for — 配列とオブジェクトの反復"
              code={`<script setup lang="ts">
import { ref } from 'vue'

const todos = ref([
  { id: 1, title: '買い物' },
  { id: 2, title: '掃除' },
])

const profile = ref({ name: 'Hana', role: 'engineer' })
</script>

<template>
  <!-- 配列: item と index を受け取れる。:key は安定した id を使う -->
  <ul>
    <li v-for="(todo, index) in todos" :key="todo.id">
      {{ index + 1 }}. {{ todo.title }}
    </li>
  </ul>

  <!-- オブジェクト: value, key の順で受け取る -->
  <ul>
    <li v-for="(value, key) in profile" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ul>
</template>`}
            />

            <InfoBox type="warning" title="index を key にしない">
              <p className="mb-2">
                <code>:key="index"</code> のように配列のインデックスを key
                にすると、並び替えや途中の削除・挿入が起きたときに Vue
                が要素を正しく対応づけられず、入力状態が別の行に移るなどの不具合につながります。
              </p>
              <p>
                各データが持つ <strong>安定した一意の id</strong>（例:{" "}
                <code>todo.id</code>）を key に使ってください。これは React の{" "}
                <code>map()</code> + <code>key</code> でも同じ注意点です。
              </p>
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="v-for で :key に配列の index を使うのを避けるべき主な理由はどれ？"
              options={[
                {
                  label:
                    "並び替えや要素の挿入・削除で対応づけがずれ、入力状態などが別の行に移ることがあるから",
                  correct: true,
                },
                {
                  label: "index は文字列なので key には数値しか使えないから",
                },
                {
                  label: "index を使うとリストがまったく描画されないから",
                },
                {
                  label: "Vue では :key 自体が不要で、付けると逆に遅くなるから",
                },
              ]}
              explanation="リストの順序が変わったり途中の要素が増減したりすると、index ベースの key は同じ要素を指さなくなります。その結果、Vue が DOM を誤って再利用し、フォームの入力値が別の行に残るといった不具合が起きます。各データの安定した一意 id を key にすれば、要素を正しく追跡できます。なお :key 自体は v-for で実質的に必須です。"
            />
          </section>

          {/* v-model */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              双方向バインド — v-model（フォーム入力）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              フォーム入力と状態を同期させるには <code>v-model</code>{" "}
              を使います。 React では <code>value</code> と{" "}
              <code>onChange</code>{" "}
              を自分でつなぐ「制御コンポーネント」を書きますが、 Vue は{" "}
              <code>v-model</code>{" "}
              がその両方をまとめて行います。入力種別ごとに正しいプロパティ・イベントを自動で選んでくれます。
            </p>

            <CodeBlock
              language="html"
              title="v-model — テキスト・チェックボックス・セレクト"
              code={`<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const agreed = ref(false)
const fruit = ref('apple')
</script>

<template>
  <!-- テキスト入力: value と input イベントを自動でつなぐ -->
  <input v-model="text" placeholder="名前" />
  <p>入力中: {{ text }}</p>

  <!-- チェックボックス: boolean と同期 -->
  <label>
    <input type="checkbox" v-model="agreed" />
    同意する
  </label>
  <p>同意: {{ agreed }}</p>

  <!-- セレクト: 選択値と同期 -->
  <select v-model="fruit">
    <option value="apple">りんご</option>
    <option value="banana">バナナ</option>
  </select>
  <p>選択: {{ fruit }}</p>
</template>`}
            />

            <InfoBox type="success" title="React の制御コンポーネントとの対応">
              React で <code>value={"{text}"}</code> +{" "}
              <code>onChange={"{e => setText(e.target.value)}"}</code> と書く 2
              行ぶんが、Vue では <code>v-model="text"</code> の 1
              つにまとまります。 さらに <code>.trim</code>（前後空白除去）・
              <code>.number</code>（数値変換）・<code>.lazy</code>（change
              で同期）などの修飾子で、 よくある変換を宣言的に追加できます。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vue 公式 - テンプレート構文",
                  url: "https://ja.vuejs.org/guide/essentials/template-syntax",
                  description: "補間・v-bind・ディレクティブの基本（日本語）",
                },
                {
                  title: "Vue 公式 - 条件付きレンダリング",
                  url: "https://ja.vuejs.org/guide/essentials/conditional",
                  description:
                    "v-if / v-else / v-show の違いと使い分け（日本語）",
                },
                {
                  title: "Vue 公式 - リストレンダリング",
                  url: "https://ja.vuejs.org/guide/essentials/list",
                  description: "v-for と :key の正しい使い方（日本語）",
                },
                {
                  title: "Vue 公式 - フォーム入力バインディング",
                  url: "https://ja.vuejs.org/guide/essentials/forms",
                  description: "v-model と入力種別ごとの挙動・修飾子（日本語）",
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
