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

const apiComparison = [
  {
    api: "useFetch",
    style: "宣言的（コンポーネントの setup で呼ぶ）",
    when: "ページ表示時に必要なデータを URL を渡して取得する",
    ssr: "SSR でサーバー取得 → payload でクライアントへ受け渡し（重複排除あり）",
  },
  {
    api: "useAsyncData",
    style: "宣言的（key + 任意の非同期関数）",
    when: "取得ロジックが複雑・複数取得をまとめる・$fetch を中で組み合わせる",
    ssr: "useFetch と同じ仕組み（useFetch は useAsyncData の薄いラッパー）",
  },
  {
    api: "$fetch",
    style: "命令的（イベントハンドラ内などで直接呼ぶ）",
    when: "ボタン押下時の POST、フォーム送信、onMounted での追加取得",
    ssr: "重複排除なし。呼んだ場所で 1 回 fetch するだけ",
  },
];

export default function DataFetching() {
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
            データ取得（useFetch / useAsyncData / $fetch）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Nuxt のデータ取得は <code>useFetch</code>・<code>useAsyncData</code>
            ・<code>$fetch</code> の 3
            つが軸です。「ページ表示時に宣言的に取る」のか「イベントの中で命令的に呼ぶ」のかで使い分けます。
            React で <code>fetch</code> を <code>useEffect</code>{" "}
            の中に書いていたものが、Nuxt
            では役割ごとに整理されている、と捉えると掴みやすいです。
          </p>
        </div>

        <WhyNowBox
          tags={["Nuxt 4", "useFetch", "useAsyncData", "$fetch", "SSR"]}
        >
          <p>
            Nuxt は SSR（サーバーサイドレンダリング）が既定です。
            サーバーで取得したデータをそのままクライアントへ渡せると、
            画面のちらつきや「同じ API を 2
            回叩く」無駄を避けられます。これを担うのが <code>useFetch</code> と{" "}
            <code>useAsyncData</code> です。
            一方、ボタンを押した瞬間に送信するような命令的な処理には{" "}
            <code>$fetch</code> を使います。
            まず役割の違いを押さえると、後のページ設計が一気に楽になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              useFetch の SSR データフロー
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              useFetch は ssr:true ではサーバーで取得し、その結果を payload に載せてクライアントへ渡します。ハイドレーション後に再取得しない（重複排除）流れを図で確認します。
            </p>
            <MermaidDiagram
              title="useFetch の SSR データフロー（図）"
              chart={`sequenceDiagram
  participant B as ブラウザ
  participant N as Nuxt サーバー
  participant A as API
  B->>N: ページ要求
  N->>A: useFetch でサーバ取得
  A-->>N: データ
  N-->>B: HTML と payload
  Note over B: ハイドレーション 再取得しない`}
            />
          </section>

          {/* 3 つの API */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3 つの API の役割
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              まず全体像です。<code>useFetch</code> は URL
              を渡すだけの宣言的取得、<code>useAsyncData</code>{" "}
              は任意の非同期処理を
              <code>key</code> 付きで包む宣言的取得、<code>$fetch</code>{" "}
              はその場で 1 回呼ぶ命令的取得です。
              <code>$fetch</code> の実体は <code>ofetch</code>{" "}
              というライブラリで、<code>fetch</code> をラップしてレスポンスの
              JSON 化やエラー処理を扱いやすくしたものです。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      API
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      スタイル
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      使いどき
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      SSR の挙動
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiComparison.map((row) => (
                    <tr key={row.api} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {row.api}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {row.style}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {row.when}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {row.ssr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              <code>useFetch</code> は内部的には <code>useAsyncData</code> +{" "}
              <code>$fetch</code> の組み合わせです。つまり「URL
              を渡すだけで済むなら <code>useFetch</code>
              、取得ロジックを自分で書きたいなら <code>useAsyncData</code>
              、宣言的に取りたいわけではないなら <code>$fetch</code>
              」という関係です。
            </p>
          </section>

          {/* useFetch */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              useFetch — URL を渡すだけの宣言的取得
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>useFetch</code> は取得先の URL を渡すと、<code>data</code>・
              <code>pending</code>・<code>error</code>・<code>refresh</code>{" "}
              を返します。SSR ではサーバーで取得し、その結果を payload
              に載せてクライアントへ渡すため、
              ブラウザ側で同じリクエストを再実行しません（重複排除）。
            </p>

            <CodeBlock
              language="html"
              title="app/pages/users.vue — useFetch でユーザー一覧を取得"
              code={`<script setup lang="ts">
type User = { id: number; name: string }

// URL を渡すだけ。SSR ではサーバーで取得して payload でクライアントへ渡す
const { data: users, pending, error, refresh } = await useFetch<User[]>(
  '/api/users',
)
</script>

<template>
  <div>
    <button @click="refresh()">再取得</button>

    <p v-if="pending">読み込み中…</p>
    <p v-else-if="error">取得に失敗しました</p>
    <ul v-else>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>`}
            />

            <InfoBox type="info" title="返り値の使い分け">
              <code>data</code> が取得結果、<code>pending</code>{" "}
              がローディング状態、<code>error</code> がエラー、
              <code>refresh</code> が再取得関数です。React で言えば{" "}
              <code>data</code> / <code>isLoading</code> / <code>error</code>{" "}
              を返すデータ取得フック （SWR や TanStack
              Query）に近い感覚ですが、Nuxt では SSR
              との連携が標準で組み込まれています。
            </InfoBox>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              クエリやヘッダーを渡す場合は、第 2 引数にオプションを渡します。
              <code>query</code> が変わると自動で再取得されます。
            </p>

            <CodeBlock
              language="html"
              title="app/pages/search.vue — クエリ連動の useFetch"
              code={`<script setup lang="ts">
const keyword = ref('')

// keyword（ref）が変わると自動で再取得される
const { data: results, pending } = await useFetch('/api/search', {
  query: { q: keyword },
})
</script>

<template>
  <input v-model="keyword" placeholder="検索キーワード" />
  <p v-if="pending">検索中…</p>
  <ul v-else>
    <li v-for="item in results" :key="item.id">{{ item.title }}</li>
  </ul>
</template>`}
            />
          </section>

          {/* useAsyncData */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              useAsyncData — 任意の非同期処理を包む
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              取得ロジックが「URL を 1 本叩くだけ」では済まないとき、
              <code>useAsyncData</code> を使います。第 1 引数の <code>key</code>{" "}
              で取得結果を識別し、第 2 引数の非同期関数の中で{" "}
              <code>$fetch</code> を好きに組み合わせられます。
              <code>key</code>{" "}
              は重複排除とキャッシュの単位になるため、一意な文字列を付けます。
            </p>

            <CodeBlock
              language="html"
              title="app/pages/dashboard.vue — 複数取得をまとめる useAsyncData"
              code={`<script setup lang="ts">
// key を付けて、中で $fetch を自由に組み合わせる
const { data: dashboard, pending } = await useAsyncData(
  'dashboard',
  async () => {
    const [user, stats] = await Promise.all([
      $fetch('/api/me'),
      $fetch('/api/stats'),
    ])
    return { user, stats }
  },
)
</script>

<template>
  <p v-if="pending">読み込み中…</p>
  <section v-else>
    <h2>{{ dashboard.user.name }} さんのダッシュボード</h2>
    <p>投稿数: {{ dashboard.stats.posts }}</p>
  </section>
</template>`}
            />

            <InfoBox type="info" title="useFetch は useAsyncData のラッパー">
              <code>useFetch(url)</code> は{" "}
              <code>useAsyncData(key, () =&gt; $fetch(url))</code>{" "}
              をほぼ自動化したものです。URL を渡すだけで済むなら{" "}
              <code>useFetch</code>、取得の中身を自分で書きたいなら{" "}
              <code>useAsyncData</code>、と覚えれば迷いません。
            </InfoBox>
          </section>

          {/* $fetch */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              $fetch — イベント内の命令的呼び出し
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ボタンを押した瞬間の POST
              やフォーム送信は「ページ表示時の宣言的取得」ではなく
              「ユーザー操作に応じた命令的呼び出し」です。こういう場面では{" "}
              <code>$fetch</code> を直接呼びます。<code>useFetch</code>{" "}
              をイベントハンドラの中で呼ぶのは誤用で、
              <code>$fetch</code> が正解です。
            </p>

            <CodeBlock
              language="ts"
              title="イベントハンドラ内での $fetch（script setup の一部）"
              code={`const title = ref('')
const submitting = ref(false)

// クリック時に POST する。宣言的取得ではないので $fetch を使う
async function createPost() {
  submitting.value = true
  try {
    const created = await $fetch('/api/posts', {
      method: 'POST',
      body: { title: title.value },
    })
    // 成功時の処理（一覧へ反映、画面遷移など）
    await navigateTo(\`/posts/\${created.id}\`)
  } catch (e) {
    // エラー時の処理
  } finally {
    submitting.value = false
  }
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              判断軸はシンプルです。
              <strong>
                「ページを表示するために要るデータ」なら宣言的取得（ useFetch /
                useAsyncData）、「操作したときに発生する処理」なら命令的呼び出し（$fetch）
              </strong>{" "}
              です。前者は SSR と重複排除の恩恵を受け、後者はその場で 1
              回だけ走ります。
            </p>
          </section>

          {/* SSR 前提の仕様 vs 実測 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              重複排除が効くのは ssr: true のときだけ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここが Nuxt データ取得で一番つまずきやすい点です。
              <code>useFetch</code> の「サーバーで取得 → payload
              でクライアントへ渡す → ブラウザ側で再取得しない」
              という重複排除のメリットは、
              <strong>SSR が有効（ssr: true、既定）のとき</strong>{" "}
              に成立します。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>nuxt.config.ts</code> で <code>ssr: false</code>（SPA
              モード）にすると、サーバー側レンダリングが行われないため、
              取得はすべてクライアントで走ります。この状態では{" "}
              <code>useFetch</code> の「サーバー取得 → payload
              受け渡し」が起きず、 役割としては <code>$fetch</code> + Pinia
              （クライアントで取得してストアに入れる）に近づきます。
              「仕様としては SSR
              連携あり、実測ではモード次第で消える」というギャップを先に知っておくと、
              SPA 構成にしたとたん挙動が変わって戸惑うことを避けられます。
            </p>

            <CodeBlock
              language="ts"
              title="nuxt.config.ts — レンダリングモードの違いが取得挙動を変える"
              code={`export default defineNuxtConfig({
  // 既定は ssr: true。このとき useFetch はサーバーで取得して
  // payload でクライアントへ渡し、ブラウザ側の再取得を抑える（重複排除）
  ssr: true,

  // ssr: false（SPA）にすると、取得はすべてクライアントで走る。
  // useFetch の「サーバー取得 → 重複排除」のメリットは消え、
  // 役割は $fetch + Pinia に近づく
  // ssr: false,
})`}
            />

            <InfoBox
              type="warning"
              title="useFetch の SSR メリットは ssr: true 前提"
            >
              <code>useFetch</code> / <code>useAsyncData</code>{" "}
              の「サーバーで取得して重複排除」という強みは{" "}
              <strong>ssr: true（既定）でのみ成立</strong>します。
              <code>ssr: false</code>
              （SPA）に切り替えるとサーバーレンダリングが無くなり、
              取得はクライアントだけで実行されます。「同じ API を 2
              回叩かない」前提が崩れるので、SPA 構成では
              <code>$fetch</code> + 状態管理（Pinia
              等）での取得設計を前提に考えます。
              <br />
              <span className="text-muted-foreground">
                出典: Nuxt 4 のレンダリングモード（ssr オプション）の挙動。
              </span>
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="ボタンをクリックしたときにサーバーへ POST してデータを作成したい。使うべき API は？"
              options={[
                {
                  label: "useFetch をクリックハンドラの中で呼ぶ",
                },
                {
                  label: "$fetch をクリックハンドラの中で呼ぶ",
                  correct: true,
                },
                {
                  label: "useAsyncData を template の中で直接呼ぶ",
                },
                {
                  label: "onMounted の中で useFetch を呼ぶ",
                },
              ]}
              explanation="ボタン押下時の POST は「ユーザー操作に応じた命令的呼び出し」なので $fetch を使います。useFetch / useAsyncData はコンポーネントの setup で呼ぶ宣言的なデータ取得で、イベントハンドラの中で呼ぶのは誤用です。判断軸は『ページ表示に要るデータ＝宣言的取得、操作で発生する処理＝$fetch』です。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="useFetch の「サーバーで取得して payload でクライアントへ渡し、再取得を抑える」重複排除が効くのはどのとき？"
              options={[
                {
                  label: "ssr: true（既定）でサーバーレンダリングが有効なとき",
                  correct: true,
                },
                { label: "ssr: false（SPA モード）のとき" },
                { label: "$fetch を併用したときだけ" },
                { label: "レンダリングモードに関係なく常に効く" },
              ]}
              explanation="重複排除はサーバーで取得した結果を payload に載せてクライアントへ渡す仕組みなので、ssr: true（既定）でサーバーレンダリングが行われるときに成立します。ssr: false（SPA）にするとサーバー取得が無くなり、取得はクライアントだけで走るため、このメリットは消えて $fetch + Pinia に役割が近づきます。"
            />
          </section>

          {/* Nuxt 4 のデータ共有 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              key によるデータ共有と getCachedData
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>useFetch</code> / <code>useAsyncData</code> の取得結果は{" "}
              <code>key</code> 単位で Nuxt のペイロードに保持されます。 同じ{" "}
              <code>key</code>{" "}
              で複数のコンポーネントから呼ぶと、取得結果が共有されます。 さらに{" "}
              <code>getCachedData</code>{" "}
              オプションを渡すと、すでにキャッシュに値があるときに再取得をスキップでき、
              画面遷移で戻ってきたときの再取得を避けられます。
            </p>

            <CodeBlock
              language="ts"
              title="getCachedData でキャッシュ済みなら再取得をスキップ（script setup の一部）"
              code={`const nuxtApp = useNuxtApp()

const { data: user } = await useAsyncData(
  'current-user',
  () => $fetch('/api/me'),
  {
    // すでに payload / static にキャッシュがあればそれを使い、再取得を抑える
    getCachedData: (key) =>
      nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
  },
)`}
            />

            <InfoBox type="success" title="同じ key は 1 回の取得を共有する">
              一覧ページとヘッダーの両方で同じユーザー情報が要るなら、同一{" "}
              <code>key</code> で <code>useAsyncData</code> を呼べば取得は 1
              回で済み、結果が共有されます。
              <code>key</code> を取得内容ごとに一意で安定させておくのが、
              データ共有とキャッシュを正しく効かせるコツです。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Nuxt 公式 - Data Fetching",
                  url: "https://nuxt.com/docs/getting-started/data-fetching",
                  description:
                    "useFetch / useAsyncData / $fetch の使い分けと SSR 連携の公式解説",
                },
                {
                  title: "Nuxt 公式 - useFetch",
                  url: "https://nuxt.com/docs/api/composables/use-fetch",
                  description: "useFetch のオプションと返り値のリファレンス",
                },
                {
                  title: "Nuxt 公式 - useAsyncData",
                  url: "https://nuxt.com/docs/api/composables/use-async-data",
                  description:
                    "key と非同期関数、getCachedData オプションのリファレンス",
                },
                {
                  title: "Nuxt 公式 - $fetch（ofetch）",
                  url: "https://nuxt.com/docs/api/utils/dollarfetch",
                  description:
                    "命令的な $fetch（内部は ofetch）の使い方と注意点",
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
