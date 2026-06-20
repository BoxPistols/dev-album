import { Link } from "wouter";
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

const h3Utils = [
  {
    util: "getQuery(event)",
    role: "クエリ文字列（?page=1 など）をオブジェクトで取得する",
  },
  {
    util: "readBody(event)",
    role: "POST / PUT のリクエストボディを読み取る（JSON を自動パース）",
  },
  {
    util: "getRouterParam(event, 'id')",
    role: "[id].ts のような動的ルートのパラメータを取得する",
  },
  {
    util: "useRuntimeConfig(event)",
    role: "runtimeConfig（サーバ専用シークレットを含む）を読み出す",
  },
  {
    util: "setResponseStatus(event, 201)",
    role: "レスポンスのステータスコードを設定する",
  },
  {
    util: "createError({ statusCode, statusMessage })",
    role: "エラーを投げる（クライアントに JSON エラーが返る）",
  },
];

const fileRouting = [
  { path: "server/api/users.get.ts", role: "GET /api/users に対応" },
  { path: "server/api/users.post.ts", role: "POST /api/users に対応" },
  {
    path: "server/api/users/[id].get.ts",
    role: "GET /api/users/123 のような動的ルート",
  },
  {
    path: "server/routes/health.ts",
    role: "/api を付けない任意パス（/health 等）",
  },
  {
    path: "server/middleware/log.ts",
    role: "全リクエストで走るサーバーミドルウェア",
  },
];

export default function ServerApi() {
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
            server/api と Nitro
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Nuxt は内部に <strong>Nitro</strong>{" "}
            というサーバーエンジンを持っています。
            <code>server/api/</code> にファイルを置くだけで API
            エンドポイントが生まれ、Nuxt アプリ自身がバックエンドにもなります。
            ここでは外部 API をプロキシして、ブラウザ側の CORS
            を消すところまでを扱います。
          </p>
        </div>

        <WhyNowBox
          tags={["Nuxt 4", "Nitro", "server/api", "h3", "BFF", "CORS"]}
        >
          <p>
            フロントだけでアプリを組むと、ブラウザから外部 API
            を直接叩くことになり、 CORS 設定やシークレットの露出に悩まされます。
            Nuxt の <strong>server/api</strong> を使うと、Nuxt
            自身が同一オリジンの API 層になります。ブラウザは Nuxt
            だけを叩き、Nuxt が裏で外部 API と話す——この BFF（Backend for
            Frontend）構成が、今の Nuxt 開発で標準的に選ばれます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              server/api を BFF にした CORS 回避
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ブラウザは同一オリジンの Nuxt（server/api）だけを叩き、Nuxt が外部 API をサーバ間で呼びます。サーバ間通信は CORS の対象外なので、ブラウザに CORS が出ません。
            </p>
            <MermaidDiagram
              title="server/api を BFF にした CORS 回避（図）"
              chart={`flowchart LR
  B["ブラウザ :3000"] -->|"同一オリジン"| N["Nuxt server/api (Nitro)"]
  N -->|"サーバ間 (CORS無関係)"| A["外部API :8000"]
  A -->|"データ"| N
  N -->|"レスポンス"| B`}
            />
          </section>

          {/* Nitro と server ディレクトリ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Nitro と server/ ディレクトリ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nitro は Nuxt
              のサーバーランタイムです。ページのレンダリング（SSR）も、
              <code>server/</code> 配下の API も、すべて Nitro
              が動かしています。 ファイル名がそのままルートになる
              <strong>ファイルベースルーティング</strong>で、
              拡張子の前のサフィックス（<code>.get</code> / <code>.post</code>{" "}
              など）が HTTP メソッドを表します。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      ファイル
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      対応するルート
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fileRouting.map((f) => (
                    <tr key={f.path} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {f.path}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {f.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="Nuxt 4 では app/ と server/ が並ぶ">
              Nuxt 4 ではフロント側のコード（pages / components /
              composables）が <code>app/</code> 配下に移りましたが、
              サーバー側の <code>server/</code>{" "}
              はプロジェクトルート直下のままです。 つまり <code>app/</code>
              （クライアント）と <code>server/</code>
              （Nitro）が並ぶ構成になります。
            </InfoBox>
          </section>

          {/* defineEventHandler */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              defineEventHandler でハンドラを書く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              各エンドポイントは <code>defineEventHandler</code> で包んだ関数を{" "}
              <code>export default</code> します。 引数の <code>event</code>{" "}
              から、クエリやボディ、設定を読み出します。
              <code>defineEventHandler</code> は Nitro
              の自動インポート対象なので、import は不要です。
            </p>

            <CodeBlock
              language="ts"
              title="server/api/users.get.ts — GET /api/users"
              code={`// defineEventHandler は自動インポートされる（import 不要）
export default defineEventHandler(async (event) => {
  // クエリ文字列 ?page=1&limit=20 を取得
  const { page = '1', limit = '20' } = getQuery(event)

  // ここでは固定データを返す（実際は DB や外部 API を叩く）
  const users = [
    { id: 1, name: 'Aoi' },
    { id: 2, name: 'Ren' },
  ]

  return {
    page: Number(page),
    limit: Number(limit),
    items: users,
  }
})`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              返り値はそのまま JSON
              として返ります。明示的なシリアライズは不要です。 POST では{" "}
              <code>readBody(event)</code> でボディを読み、エラーは{" "}
              <code>createError</code> で投げます。
            </p>

            <CodeBlock
              language="ts"
              title="server/api/users.post.ts — POST /api/users"
              code={`export default defineEventHandler(async (event) => {
  const body = await readBody<{ name?: string }>(event)

  if (!body?.name) {
    // statusCode を付けて投げると、その status の JSON エラーになる
    throw createError({
      statusCode: 400,
      statusMessage: 'name は必須です',
    })
  }

  setResponseStatus(event, 201)
  return { id: Date.now(), name: body.name }
})`}
            />

            <div className="overflow-x-auto mt-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      ユーティリティ
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {h3Utils.map((u) => (
                    <tr key={u.util} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {u.util}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {u.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-4 leading-relaxed text-sm">
              これらは Nitro が内部で使うサーバーフレームワーク{" "}
              <strong>h3</strong>{" "}
              のユーティリティです。やはり自動インポートされるため import
              は要りません。
            </p>
          </section>

          {/* useFetch で叩く側 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              クライアント側から useFetch で叩く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ページ側からは <code>useFetch</code> で同一オリジンの{" "}
              <code>/api/users</code> を叩きます。 相手が自分自身の Nitro
              なので、URL は相対パスで済み、SSR でも重複排除（同じリクエストを 1
              回にまとめる）が効きます。 React の <code>useEffect</code> +{" "}
              <code>fetch</code> に当たる処理が、宣言的な 1 行になります。
            </p>

            <CodeBlock
              language="html"
              title="app/pages/users.vue — server/api を叩く"
              code={`<script setup lang="ts">
// 同一オリジンの /api/users を叩く。data は ref として返る
const { data, pending, error, refresh } = await useFetch('/api/users', {
  query: { page: 1, limit: 20 },
})
</script>

<template>
  <section>
    <h1>ユーザー一覧</h1>

    <p v-if="pending">読み込み中…</p>
    <p v-else-if="error">取得に失敗しました</p>

    <ul v-else>
      <li v-for="user in data?.items" :key="user.id">
        {{ user.name }}
      </li>
    </ul>

    <button @click="refresh">再取得</button>
  </section>
</template>`}
            />

            <InfoBox type="success" title="型がエンドポイントから推論される">
              <code>server/api</code> のハンドラの返り値の型は、Nitro
              によって自動で拾われます。
              <code>useFetch('/api/users')</code> の <code>data</code> は{" "}
              <code>items</code> や <code>page</code> を持った型として推論され、
              サーバーとクライアントで型が共有されます。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="server/api のファイルで defineEventHandler が果たす役割はどれ？"
              options={[
                {
                  label:
                    "リクエストを受け取り、返り値を JSON レスポンスにするハンドラを定義する",
                  correct: true,
                },
                { label: "クライアント側のコンポーネントを定義する" },
                { label: "Vite のビルド設定を上書きする" },
                { label: "Pinia のストアを登録する" },
              ]}
              explanation="defineEventHandler は Nitro（h3）のハンドラを定義するための関数です。引数の event からクエリ・ボディ・設定を読み出し、返した値がそのまま JSON レスポンスになります。自動インポートされるため import は不要です。クライアントのコンポーネントやビルド設定とは無関係です。"
            />
          </section>

          {/* BFF プロキシ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              外部 API をプロキシして CORS を消す（BFF）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ブラウザから外部 API（例として FastAPI
              のバックエンド）を直接叩くと、 オリジンが異なるため CORS
              の設定が必要になります。 そこで <code>server/api</code> に「外部
              API への中継役」を置きます。ブラウザは同一オリジンの Nuxt
              だけを叩き、 外部 API
              との通信はサーバー側（Nitro）で完結するため、ブラウザに CORS
              は出ません。
            </p>

            <CodeBlock
              language="ts"
              title="server/api/articles.get.ts — 外部 API をプロキシ"
              code={`export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)

  // $fetch（ofetch）でサーバーから外部 API を叩く。
  // apiBase / apiToken は runtimeConfig 経由でサーバー側だけが持つ
  const articles = await $fetch('/articles', {
    baseURL: config.apiBase,            // 例: http://localhost:8000
    headers: { Authorization: \`Bearer \${config.apiToken}\` },
    query,
  })

  // ブラウザは同一オリジンの /api/articles だけを見る
  return articles
})`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              <code>apiToken</code> のようなシークレットは{" "}
              <code>runtimeConfig</code> に置きます。
              トップレベルに書いた値はサーバー専用で、ブラウザには一切送られません。
              クライアントにも見せてよい値だけを <code>public</code>{" "}
              の下に入れます。
            </p>

            <CodeBlock
              language="ts"
              title="nuxt.config.ts — runtimeConfig でシークレットを保持"
              code={`export default defineNuxtConfig({
  runtimeConfig: {
    // サーバー専用（ブラウザに露出しない）
    apiBase: process.env.NUXT_API_BASE,
    apiToken: process.env.NUXT_API_TOKEN,

    // public 配下はクライアントにも露出する
    public: {
      siteName: 'Dev Album',
    },
  },
})`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              この構成は、API
              マニュアルで扱う外部バックエンドのデバッグとも相性が良いです。
              レスポンスの中身やヘッダーを確かめる手順は{" "}
              <Link
                href="/api/quality/debugging-tools"
                className="text-primary underline underline-offset-2"
              >
                API デバッグツールのページ
              </Link>{" "}
              にまとめてあります。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="server/api に外部 API のプロキシを置くと、なぜブラウザに CORS エラーが出なくなる？"
              options={[
                {
                  label:
                    "ブラウザは同一オリジンの Nuxt だけを叩き、外部 API との通信はサーバー側で完結するから",
                  correct: true,
                },
                {
                  label:
                    "Nuxt が自動で Access-Control-Allow-Origin を外部 API に注入するから",
                },
                { label: "CORS はブラウザではなくサーバーで起きる現象だから" },
                {
                  label:
                    "useFetch を使うと CORS チェックがすべてスキップされるから",
                },
              ]}
              explanation="CORS はブラウザが異なるオリジンへのリクエストに対して行うチェックです。server/api にプロキシを置くと、ブラウザが見るのは同一オリジンの Nuxt だけになり、外部 API（別オリジン）との通信はサーバー間（Nitro → 外部 API）で完結します。サーバー間の通信にはブラウザの CORS は適用されないため、ブラウザにエラーは出ません。"
            />
          </section>

          {/* $fetch と useFetch の使い分け */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              $fetch と useFetch の使い分け
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>useFetch</code> は宣言的で、setup
              の中で「このページが必要とするデータ」を取得します（SSR
              で重複排除あり）。 一方 <code>$fetch</code>
              （ofetch）は命令的で、ボタンのクリックなど イベントハンドラの中で
              1 回だけ叩く用途に向きます。サーバー側（server/api の中）から外部
              API を呼ぶときも <code>$fetch</code> を使います。
            </p>

            <CodeBlock
              language="html"
              title="app/pages/articles.vue — useFetch と $fetch の役割分担"
              code={`<script setup lang="ts">
// ページ表示時のデータ取得は useFetch（宣言的・SSR で重複排除）
const { data: articles, refresh } = await useFetch('/api/articles')

// 投稿などのイベントは $fetch（命令的・ハンドラ内で 1 回）
async function createArticle(title: string) {
  await $fetch('/api/articles', { method: 'POST', body: { title } })
  await refresh()
}
</script>

<template>
  <ul>
    <li v-for="a in articles" :key="a.id">{{ a.title }}</li>
  </ul>
  <button @click="createArticle('新しい記事')">追加</button>
</template>`}
            />

            <InfoBox type="warning" title="setup の外で useFetch を呼ばない">
              <code>useFetch</code> / <code>useAsyncData</code> は Vue の setup
              スコープで動く composable です。
              イベントハンドラやループの中で呼ぶと正しく動きません。
              そうした場面では命令的な <code>$fetch</code> を使ってください。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Nuxt 公式 - Server Directory",
                  url: "https://nuxt.com/docs/guide/directory-structure/server",
                  description:
                    "server/api・server/routes・server/middleware の構成と書き方",
                },
                {
                  title: "Nuxt 公式 - useFetch",
                  url: "https://nuxt.com/docs/api/composables/use-fetch",
                  description: "宣言的データ取得 composable のリファレンス",
                },
                {
                  title: "Nuxt 公式 - runtimeConfig",
                  url: "https://nuxt.com/docs/guide/going-further/runtime-config",
                  description: "サーバー専用シークレットと public 値の扱い方",
                },
                {
                  title: "Nitro 公式 - Routing",
                  url: "https://nitro.build/guide/routing",
                  description:
                    "Nuxt が内部で使うサーバーエンジン Nitro のルーティング",
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
