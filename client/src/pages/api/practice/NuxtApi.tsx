import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const apiComparison = [
  {
    name: "useFetch",
    when: "セットアップ時の宣言的取得（コンポーネントが表示されたら自動で取りに行くデータ）",
    ssr: "SSR で実行され、同一キーのリクエストを重複排除する",
  },
  {
    name: "useAsyncData",
    when: "取得ロジックを自分で書きたいとき。$fetch を中で呼びつつ SSR・キャッシュの恩恵を受ける",
    ssr: "useFetch と同じく SSR 対応。key と handler 関数を渡す",
  },
  {
    name: "$fetch",
    when: "イベントハンドラ内・命令的な呼び出し（ボタン押下時の POST など）",
    ssr: "宣言的ラッパーを通さない素の HTTP クライアント（ofetch）",
  },
];

export default function NuxtApi() {
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
            Nuxt での API 連携
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Nuxt 3 / 4 には、SSR とクライアントの両方で動くデータ取得の仕組みが
            最初から組み込まれています。useFetch・useAsyncData・$fetch
            の使い分けと、 server/api（Nitro）を自前の BFF にして外部 API
            をプロキシする方法を、 実際のコードで整理します。
          </p>
        </div>

        <WhyNowBox tags={["Nuxt", "useFetch", "$fetch", "Nitro", "BFF"]}>
          <p>
            「fetch を書けばデータは取れる」だけなら難しくありません。難しいのは
            <strong>SSR で二重に取りに行かないこと</strong>と
            <strong>CORS を踏まないこと</strong>です。 Nuxt はこの 2
            つに対する標準的な答え——SSR 対応のコンポーザブルと、 同一オリジンで
            API を提供する server/api（Nitro）——を持っています。
            どのツールをどこで使うかを最初に決めておくと、後から設計が崩れません。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 全体像 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3 つの取得手段を「宣言的か命令的か」で分ける
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nuxt のデータ取得には大きく 3
              つの入口があります。混乱しやすいので、 まず
              <strong>「いつ呼ばれるか」</strong>で分類します。
              コンポーネントが表示されるタイミングで自動的に取るのが
              <code>useFetch</code> / <code>useAsyncData</code>（宣言的）。
              ボタン押下などイベントの中で自分のタイミングで叩くのが
              <code>$fetch</code>（命令的）です。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      API
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      使う場面
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      SSR・性質
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiComparison.map((a) => (
                    <tr key={a.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {a.name}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {a.when}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {a.ssr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox
              type="info"
              title="useFetch は useAsyncData + $fetch のラッパー"
            >
              <code>useFetch(url)</code> は、内部的に
              <code>useAsyncData</code> と <code>$fetch</code>
              を組み合わせた糖衣構文です。 URL を渡すだけで済む典型ケースは{" "}
              <code>useFetch</code>、 取得ロジックを自分で組み立てたいときは
              <code>useAsyncData</code> に <code>$fetch</code>
              を渡す、と覚えると整理できます。
            </InfoBox>
          </section>

          {/* useFetch */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              useFetch — 表示と同時に取る宣言的取得
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>useFetch</code> は <code>{"<script setup>"}</code>
              の中で呼ぶことを前提にした宣言的なコンポーザブルです。
              サーバ側レンダリング（SSR）の段階で実行され、その結果を HTML
              と一緒にクライアントへ渡します。 これにより、
              <strong>ハイドレーション後にもう一度同じ取得が走らない</strong>
              ——つまり同一キーのリクエストが重複排除されます。
            </p>

            <CodeBlock
              language="html"
              title="pages/users.vue — useFetch で一覧を取得"
              code={`<script setup lang="ts">
// SSR で実行され、結果は HTML と一緒にクライアントへ渡る。
// 同じ key のリクエストは重複排除されるため、ハイドレーション後に再取得されない。
const { data: users, pending, error, refresh } = await useFetch('/api/users', {
  // lazy: ナビゲーションをブロックせず、解決を待たずに描画へ進む
  lazy: true,
  // key: 重複排除と キャッシュの識別子。明示しない場合は URL から自動生成される
  key: 'users-list',
  // transform: 受け取った生データを画面用に整形してから data に入れる
  transform: (rows: { id: number; name: string }[]) =>
    rows.map((u) => ({ id: u.id, label: u.name })),
})
</script>

<template>
  <p v-if="pending">読み込み中...</p>
  <p v-else-if="error">取得に失敗しました</p>
  <ul v-else>
    <li v-for="u in users" :key="u.id">{{ u.label }}</li>
  </ul>
  <button @click="refresh()">再取得</button>
</template>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              戻り値の <code>data</code> / <code>pending</code> /
              <code>error</code> はリアクティブな
              <code>ref</code> です。<code>refresh()</code>
              を呼べば同じキーで再取得できます。 一覧やマスタデータのように
              「ページを開いたら表示しておきたいデータ」に向いています。
            </p>

            <InfoBox type="success" title="useFetch は SSR で重複排除される">
              <code>useFetch</code> はサーバで取得した結果を
              <strong>payload に載せてクライアントへ渡す</strong>ため、
              同一キーの取得がクライアント側で再実行されません。 これが「素の{" "}
              <code>fetch</code> を <code>onMounted</code>
              で叩く」やり方との一番の違いです。後者はサーバとクライアントで
              二重に取りに行きがちです。
            </InfoBox>

            <InfoBox type="warning" title="仕様 vs 実測: ssr:false だと useFetch の意味が変わる">
              Nuxt は<strong>既定で SSR が有効</strong>（<code>ssr: true</code>）です。
              ここで説明した「SSR で取得 → payload で渡す → 重複排除」はその前提で活きます。アプリを{" "}
              <code>ssr: false</code>（SPA モード）で動かすと、サーバ側レンダリングが
              無いため <code>useFetch</code> の取得はクライアントで走り、SSR
              由来の重複排除という利点は実質的に消えます。この構成では{" "}
              <code>useFetch</code> は <code>$fetch</code> + 状態管理（Pinia
              など）の組み合わせに役割が近づきます。「useFetch
              ＝常に SSR で重複排除」と思い込むと SPA
              構成で期待がずれるため、自分のアプリの <code>ssr</code>{" "}
              設定を必ず確認してください。
            </InfoBox>
          </section>

          {/* $fetch */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              $fetch — イベントの中で命令的に叩く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>$fetch</code> は Nuxt が同梱する HTTP
              クライアント（ofetch）そのものです。 JSON
              を自動でパースし、エラー時は例外を投げます。
              <strong>
                セットアップ時の宣言的取得ではなく、ボタン押下などイベントハンドラの中
              </strong>
              で使うのが基本です。ここで <code>useFetch</code>
              を呼んではいけません（コンポーザブルはセットアップ時に呼ぶ前提のため）。
            </p>

            <CodeBlock
              language="ts"
              title="作成ボタンの onClick で $fetch を呼ぶ"
              code={`// イベントハンドラ内では useFetch ではなく $fetch を使う。
// useFetch はセットアップ時の宣言的取得用で、クリック時の命令的呼び出しには向かない。
async function createUser(name: string) {
  try {
    const created = await $fetch('/api/users', {
      method: 'POST',
      body: { name },
    })
    // 一覧を再取得したい場合は、対応する useFetch の refresh() を呼ぶか
    // refreshNuxtData('users-list') でキーを指定して更新する
    await refreshNuxtData('users-list')
    return created
  } catch (e) {
    // ofetch は非 2xx で例外を投げる。e.data にサーバの本文が入る
    console.error('作成に失敗しました', e)
    throw e
  }
}`}
            />

            <InfoBox type="warning" title="useFetch と $fetch を取り違えない">
              迷ったときの基準は<strong>「呼ばれるタイミング」</strong>です。
              画面表示と同時に取りたい（宣言的・SSR で重複排除したい）なら
              <code>useFetch</code> / <code>useAsyncData</code>。 クリックや
              submit のようなユーザー操作の中で叩く（命令的）なら
              <code>$fetch</code>。 イベントハンドラ内で
              <code>useFetch</code> を呼ぶと、SSR
              の重複排除が効かないだけでなく、
              コンポーザブルの利用規約からも外れます。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="「作成」ボタンの onClick で API に POST したい。使うべきは？"
              options={[
                {
                  label: "useFetch（イベントハンドラの中で呼ぶ）",
                },
                {
                  label: "$fetch（命令的に呼ぶ）",
                  correct: true,
                },
                { label: "useAsyncData をボタン内で await する" },
                { label: "ブラウザ標準の fetch を直接使うのが唯一の正解" },
              ]}
              explanation="useFetch / useAsyncData はセットアップ時の宣言的取得用で、SSR の重複排除を前提にしています。ボタン押下のようなイベントハンドラの中では、命令的に呼べる $fetch（ofetch）を使います。一覧を更新したいときは対応する useFetch の refresh() か refreshNuxtData() を呼びます。"
            />
          </section>

          {/* server/api (Nitro) */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              server/api（Nitro）— 自前の API を同一オリジンで持つ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nuxt は <code>server/api/</code>
              ディレクトリにハンドラを置くだけで、 Nuxt サーバ自身が API
              を提供できます（サーバエンジンは Nitro）。 ファイル名に HTTP
              メソッドを含めます——
              <code>server/api/users.get.ts</code> は<code>GET /api/users</code>
              、<code>server/api/users.post.ts</code> は
              <code>POST /api/users</code> に対応します。
            </p>

            <CodeBlock
              language="ts"
              title="server/api/users.get.ts — Nitro のイベントハンドラ"
              code={`// ファイル名のサフィックス .get で GET /api/users に対応する。
// defineEventHandler が Nitro のハンドラを定義するヘルパ。
export default defineEventHandler(async (event) => {
  // クエリパラメータの取得（例: /api/users?limit=20）
  const { limit } = getQuery(event)

  // ここで外部 BE（例: FastAPI）を叩いてもよいし、DB を直接読んでもよい。
  // サーバ間通信なのでブラウザの CORS は関係しない。
  const rows = await $fetch('http://localhost:8000/users', {
    query: { limit },
  })

  return rows // 返り値は自動で JSON シリアライズされる
})`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ハンドラの戻り値は自動で JSON にシリアライズされます。クエリは
              <code>getQuery(event)</code>、ボディは
              <code>await readBody(event)</code>
              で読みます。これで、フロントからは <code>/api/users</code>
              という<strong>同一オリジンのパス</strong>を叩くだけになります。
            </p>
          </section>

          {/* BFF と CORS */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              server/api を BFF にして CORS を回避する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここが Nuxt の API 連携で一番効く設計です。CORS は
              <strong>ブラウザだけが強制する</strong>仕組みで、 サーバ間の通信や{" "}
              <code>curl</code> には適用されません。 ブラウザから直接外部
              BE（例: <code>localhost:8000</code> の FastAPI）を叩くと、Nuxt
              が動く <code>localhost:3000</code>
              とはポートが違うため<strong>別オリジン</strong>になり、
              プリフライト（OPTIONS）や CORS エラーに悩まされます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-muted border border-border p-4">
                  <p className="font-bold text-foreground mb-1">
                    直叩き（CORS を踏む）
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    ブラウザ（:3000）→ FastAPI（:8000）。
                    ポートが違うので別オリジン。 非単純リクエストはプリフライト
                    OPTIONS が先行し、 サーバ側で CORS 設定が要る。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    BFF 経由（CORS を回避）
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    ブラウザ（:3000）→ Nuxt server/api（同一オリジン）→
                    FastAPI（:8000）。 後段はサーバ間通信なので CORS は無関係。
                  </p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              つまり、外部 BE への呼び出しを <code>server/api/</code>
              に閉じ込めると、 ブラウザは
              <strong>常に同一オリジンの Nuxt サーバだけ</strong>
              を叩くようになり、 CORS を回避できます。前述の{" "}
              <code>server/api/users.get.ts</code>
              が、まさにこのプロキシ（BFF: Backend For Frontend）です。
            </p>

            <CodeBlock
              language="bash"
              title="curl は CORS を無視する（だから直接叩けてしまう）"
              code={`# curl にはオリジンの概念がない。CORS はブラウザだけの仕組みなので、
# サーバ間や curl からは外部 BE をそのまま叩ける。
curl -i http://localhost:8000/users

# 一方ブラウザで :3000 から :8000 を fetch すると別オリジン扱いになり、
# 非単純リクエストは preflight OPTIONS が先行する。
# → server/api 経由（同一オリジン）にすれば、この問題自体が消える。`}
            />

            <InfoBox
              type="success"
              title="server/api を BFF にすると CORS を回避できる"
            >
              外部 BE への通信を Nuxt の server/api
              に集約すると、ブラウザは同一オリジンの Nuxt だけを叩くため、CORS
              が発生しません。 さらに、API
              キーなどの秘匿情報をサーバ側に置けるため、
              ブラウザに露出させずに済むという利点もあります。
            </InfoBox>
          </section>

          {/* 型安全 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              型安全 — openapi-typescript と server ルートの型
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>server/api/</code>
              のハンドラの戻り値の型は、<code>useFetch('/api/users')</code>の{" "}
              <code>data</code> に<strong>自動で推論されます</strong>。 自前の
              API は Nitro が型を繋いでくれます。一方、外部 BE の型は OpenAPI
              から
              <code>openapi-typescript</code>
              で生成して、BFF の中で当てるのが安全です。
            </p>

            <CodeBlock
              language="ts"
              title="openapi-typescript で生成した型を BFF で使う"
              code={`import type { components } from '~/types/api' // openapi-typescript の生成物

type User = components['schemas']['User']

export default defineEventHandler(async (event): Promise<User[]> => {
  // 外部 BE の応答に生成済みの型を当てる。契約のズレを型で検出できる。
  const rows = await $fetch<User[]>('http://localhost:8000/users')
  return rows
})`}
            />

            <InfoBox type="warning" title="id の型ズレは「契約のズレ」のサイン">
              <code>openapi-typescript</code> は、スキーマの
              object（additionalProperties）を
              <code>{"{ [key: string]: unknown }"}</code>
              にマップします（<code>any</code> ではありません）。 また
              <code>id</code> がスキーマ上は整数なのに実 API は文字列を返す、
              といったズレは<strong>契約のズレの典型</strong>です。 生成した型を
              BFF で当てておくと、こうした不一致をビルド時に拾えます。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="ブラウザ（:3000）から外部 FastAPI（:8000）を直接 fetch すると CORS エラーになる。Nuxt らしい回避策は？"
              options={[
                {
                  label:
                    "外部 BE への呼び出しを server/api に置き、ブラウザは同一オリジンの Nuxt だけを叩く",
                  correct: true,
                },
                {
                  label: "useFetch を使えば CORS は自動で無効になる",
                },
                {
                  label: "curl で叩けば CORS が出ないので、その設定を流用する",
                },
                {
                  label:
                    "fetch のヘッダーに Access-Control-Allow-Origin を付ける",
                },
              ]}
              explanation="CORS はブラウザが強制する仕組みで、別オリジン（:3000 と :8000 はポート違いで別オリジン）への非単純リクエストはプリフライトを伴います。Nuxt では外部 BE への通信を server/api（Nitro）に集約し、ブラウザは同一オリジンの Nuxt サーバだけを叩くようにすれば CORS を回避できます。後段の Nuxt→FastAPI はサーバ間通信なので CORS は関係しません。Access-Control-Allow-Origin はレスポンス側のヘッダーで、クライアントの fetch から付けるものではありません。"
            />
          </section>

          {/* 実機検証済みの実例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              実機検証済みの実例（FastAPI + Nuxt）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここまでの内容を、実際に動く FastAPI + Nuxt
              の構成で確認した実コードで見ます。 以下はすべて typecheck
              通過・実機でのレスポンス 200 を確認済みのものです。
            </p>

            <h3 className="text-base font-bold text-foreground mb-2">
              ① OpenAPI から型生成して使う
            </h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              BE の OpenAPI から TypeScript 型を生成し、生成型をそのまま使います。
              BE がモデルを変えたら再生成で型が変わり、合わない箇所が型エラーで即わかります。
            </p>
            <CodeBlock
              language="bash"
              title="型生成（package.json の scripts に登録）"
              code={`pnpm gen:api
# = openapi-typescript http://localhost:8000/openapi.json -o app/types/api.ts`}
            />
            <CodeBlock
              language="ts"
              title="app/stores/memos.ts — 生成型をそのまま使う"
              code={`import type { components } from '~/types/api'

// BE の Pydantic モデル MemoRead がそのまま型になる
export type Memo = components['schemas']['MemoRead']
// 型付き Pydantic → { id: number; title: string; body: string; created_at: string }
// 対比: dict[str, Any] は { [key: string]: unknown } に潰れ、型安全が効かない`}
            />

            <h3 className="text-base font-bold text-foreground mb-2 mt-8">
              ② server/api（Nitro）を BFF にして CORS を回避する
            </h3>
            <CodeBlock
              language="ts"
              title="server/api/memos.get.ts — Nuxt サーバが FastAPI をプロキシ"
              code={`export default defineEventHandler(async (event) => {
  const { fastapiBase } = useRuntimeConfig(event) // サーバ専用設定（ブラウザに露出しない）
  return await $fetch(\`\${fastapiBase}/memos\`)      // サーバ間通信 → CORS は無関係
})`}
            />
            <CodeBlock
              language="ts"
              title="nuxt.config.ts"
              code={`export default defineNuxtConfig({
  runtimeConfig: {
    fastapiBase: 'http://localhost:8000',         // サーバ専用
    public: { apiBase: 'http://localhost:8000' },  // クライアントにも露出
  },
})`}
            />
            <InfoBox type="success" title="実測: BFF 経由はブラウザに CORS が出ない">
              ブラウザから <code>GET :3000/api/memos</code>（同一オリジン）を叩くと、
              200 で FastAPI の memos がプロキシ返却され、CORS
              は発生しませんでした。 対して直叩きの{" "}
              <code>GET :8000/memos</code> は、サーバが{" "}
              <code>access-control-allow-origin</code> を返す必要があります。
            </InfoBox>

            <h3 className="text-base font-bold text-foreground mb-2 mt-8">
              ③ useFetch（宣言的）と $fetch（命令的）の実コード
            </h3>
            <CodeBlock
              language="ts"
              title="pages/bff.vue — useFetch: 宣言的・SSR 対応・表示データ向け"
              code={`const { data: memos, pending, error } = await useFetch<Memo[]>('/api/memos')`}
            />
            <CodeBlock
              language="ts"
              title="composable + store — $fetch: 命令的・イベント内/onMounted 向け"
              code={`// app/composables/useApi.ts
export const callApi = <T>(path: string, opts = {}) =>
  $fetch<T>(path, { baseURL: usePublicApiBase(), ...opts })

// store 内
this.memos = await callApi<Memo[]>('/memos')                            // 取得
await callApi<Memo>('/memos', { method: 'POST', body: { title, body } }) // 送信（イベント内）`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed text-sm">
              出典: FastAPI + Nuxt の sandbox 実装（typecheck 通過・実機 200 確認）。
            </p>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Nuxt - Data Fetching",
                  url: "https://nuxt.com/docs/getting-started/data-fetching",
                  description:
                    "useFetch / useAsyncData / $fetch の使い分けと SSR 重複排除の公式解説",
                },
                {
                  title: "Nuxt - server ディレクトリ",
                  url: "https://nuxt.com/docs/guide/directory-structure/server",
                  description:
                    "server/api のファイル命名規則（.get / .post 等）とハンドラの書き方",
                },
                {
                  title: "Nitro - API Routes",
                  url: "https://nitro.build/guide/routing",
                  description:
                    "Nuxt のサーバエンジン Nitro のルーティングとイベントハンドラ",
                },
                {
                  title: "ofetch（$fetch）",
                  url: "https://github.com/unjs/ofetch",
                  description:
                    "$fetch の実体。自動 JSON パース・エラー時例外などの挙動",
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
