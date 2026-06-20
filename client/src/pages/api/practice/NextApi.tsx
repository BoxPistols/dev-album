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

// 取得手段ごとの「どこで動くか / 何に向くか」の早見表
const strategies = [
  {
    where: "Server Component",
    api: "async / await fetch",
    use: "初期表示。秘匿情報を伴う取得、重いデータ取得をサーバ側に閉じ込める。",
  },
  {
    where: "Route Handler",
    api: "app/api/<name>/route.ts",
    use: "自前の API エンドポイント。外部 API のプロキシ / BFF、Webhook 受信。",
  },
  {
    where: "Server Action",
    api: "'use server' 関数",
    use: "フォーム送信などの mutation。送信後に再検証して画面を更新する。",
  },
  {
    where: "Client Component",
    api: "'use client' + TanStack Query / SWR",
    use: "インタラクティブな部分。ユーザー操作に応じた追加取得・再取得。",
  },
];

export default function NextApi() {
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
            Next.js での API 連携
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Next.js の App Router では、データ取得の「置き場所」が複数あります。
            サーバで取得してそのまま描画する Server Component、自前の
            エンドポイントになる Route Handler、フォームから呼ぶ Server Action、
            そしてブラウザ側で動く Client Component。それぞれの役割と書き方を、
            実際のコードで整理します。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "Next.js",
            "App Router",
            "Server Component",
            "Route Handler",
            "Server Action",
          ]}
        >
          <p>
            「API 連携」と聞くと、ブラウザから <code>fetch</code>{" "}
            する一択を思い浮かべがちです。 ですが App Router では、
            <strong>取得をできるだけサーバ側に寄せる</strong>のが基本方針です。
            サーバで取れば API キーをブラウザに晒さずに済み、
            重い取得もユーザーの端末を待たせません。 どの部分をサーバに置き、
            どの部分をクライアントに残すか——この線引きが App Router での API
            設計の中心になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 全体像 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              取得の置き場所は 4 つ — まず全体像
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              App Router でのデータ取得は、用途に応じて 4
              つの置き場所に分かれます。
              「どこで動くコードか」を先に決めると、書き方は自然と定まります。
              まずは早見表で全体像をつかみます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      どこで
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      使う API
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      向いている用途
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {strategies.map((s) => (
                    <tr key={s.where} className="border-b border-border">
                      <td className="py-2 pr-4 font-bold text-primary whitespace-nowrap align-top">
                        {s.where}
                      </td>
                      <td className="py-2 px-4 font-mono text-muted-foreground align-top whitespace-nowrap">
                        {s.api}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {s.use}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="App Router の既定はサーバ">
              App Router では、コンポーネントはデフォルトで Server Component
              です。 ブラウザ側で動かしたいファイルにだけ、先頭へ{" "}
              <code>'use client'</code> を書いて Client Component
              に切り替えます。
              「サーバが既定、クライアントは明示的にオプトイン」という向きを
              押さえておくと、各取得手段の位置づけが分かりやすくなります。
            </InfoBox>
          </section>

          {/* Server Component の async fetch */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Server Component で async fetch
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Server Component は <strong>async 関数として定義でき</strong>、
              本体で直接 <code>await fetch(...)</code>{" "}
              できます。取得結果をそのまま JSX に 展開すれば、HTML
              はサーバで組み立てられてブラウザに届きます。
              <code>fetch</code> の呼び出しはサーバ内で完結するため、 API
              キーやトークンをブラウザに渡さずに済みます。
            </p>

            <CodeBlock
              language="tsx"
              title="app/products/page.tsx — サーバで取得してそのまま描画"
              code={`// 既定で Server Component（'use client' を書かない）
export default async function ProductsPage() {
  // この fetch はサーバ上で実行される。API キーはブラウザに渡らない
  const res = await fetch("https://api.example.com/v1/products", {
    headers: { Authorization: \`Bearer \${process.env.API_TOKEN}\` },
    // Next 拡張: 60 秒ごとに再生成（ISR 的な挙動）
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    // エラー時は error.tsx に委ねる
    throw new Error("商品の取得に失敗しました");
  }

  const products: { id: number; name: string }[] = await res.json();

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              Next.js は <code>fetch</code>{" "}
              に独自オプションを足しています。キャッシュ挙動は
              <code>{`{ cache, next }`}</code> で制御します。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 my-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">next.revalidate</p>
                  <p className="text-muted-foreground">
                    <code>{`{ next: { revalidate: 60 } }`}</code> で 60
                    秒ごとに再取得。
                    マスタや記事のような「たまに変わる」データ向き。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">cache</p>
                  <p className="text-muted-foreground">
                    <code>{`{ cache: "no-store" }`}</code>{" "}
                    なら毎回サーバから取得（動的）。
                    在庫やダッシュボードのような「常に最新」が要るデータ向き。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="success" title="取得はできるだけサーバ側で">
              初期表示に必要なデータは、まず Server Component
              での取得を検討します。 メリットは 2 つ。第一に、API
              キーやトークンがブラウザに出ないので
              <strong>秘匿情報を守れる</strong>こと。第二に、重い集計や複数 API
              のまとめ取りをサーバで済ませられるので、
              <strong>ユーザーの端末や回線の遅さに左右されにくい</strong>こと。
              「とりあえずクライアントで fetch」ではなく、サーバで取れないかを
              先に考えるのが App Router の基本です。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="App Router の Server Component で await fetch して描画する方式の説明として正しいのは？"
              options={[
                {
                  label:
                    "fetch はサーバ上で実行され、API キーをブラウザに渡さずに済む",
                  correct: true,
                },
                {
                  label:
                    "fetch は必ずブラウザ側で実行されるので API キーが露出する",
                },
                {
                  label:
                    "Server Component は async にできないため await fetch は書けない",
                },
                {
                  label:
                    "取得結果は JSON のままクライアントに送られ、HTML は描画されない",
                },
              ]}
              explanation="Server Component は async 関数として定義でき、本体で await fetch できます。この fetch はサーバ上で実行されるため、Authorization ヘッダーに使う API キーはブラウザへ渡りません。取得結果は JSX に展開され、HTML としてサーバで組み立てられてからブラウザに届きます。"
            />
          </section>

          {/* Route Handlers */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Route Handlers — 自前の API エンドポイントを作る
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              自分で API のエンドポイントを持ちたいときは、Route Handler
              を使います。
              <code>app/api/&lt;name&gt;/route.ts</code> に、HTTP
              メソッドと同名の関数 （<code>GET</code> / <code>POST</code>{" "}
              など）をエクスポートします。 引数で <code>Request</code>{" "}
              を受け取り、<code>Response</code> または <code>NextResponse</code>{" "}
              を返します。
            </p>

            <CodeBlock
              language="ts"
              title="app/api/products/route.ts — GET と POST をエクスポート"
              code={`import { NextResponse } from "next/server";

// GET /api/products
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  const products = await db.products.search(q);
  return NextResponse.json(products);
}

// POST /api/products
export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name) {
    // バリデーションエラーは 422 で返す
    return NextResponse.json(
      { detail: "name は必須です" },
      { status: 422 },
    );
  }

  const created = await db.products.create(body);
  return NextResponse.json(created, { status: 201 });
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              Route Handler は、外部 API の<strong>プロキシ / BFF</strong>
              としても使えます。 ブラウザは同一オリジンの Route Handler
              だけを叩き、実際の外部 API 呼び出しはサーバ側で行う構成です。
              この形にすると、ブラウザが 外部オリジンを直接叩かなくなるため、
              <strong>CORS を回避でき</strong>、 外部 API
              のキーもサーバ内に隠せます。
            </p>

            <CodeBlock
              language="ts"
              title="app/api/weather/route.ts — 外部 API のプロキシ（BFF）"
              code={`import { NextResponse } from "next/server";

// ブラウザは /api/weather（同一オリジン）だけを叩く。
// 外部 API への接続とキーの付与はサーバ側で完結する。
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") ?? "tokyo";

  const upstream = await fetch(
    \`https://weather.example.com/v1/now?city=\${city}\`,
    { headers: { "X-API-Key": process.env.WEATHER_KEY! } },
  );

  const data = await upstream.json();
  return NextResponse.json(data);
}`}
            />

            <InfoBox type="info" title="BFF にすると CORS を回避できる">
              CORS（クロスオリジン制限）を強制するのは
              <strong>ブラウザだけ</strong>です。サーバ間の通信や{" "}
              <code>curl</code> は CORS を無視します。 ブラウザが外部 API
              を直接叩くと、相手のオリジンが許可していなければブロックされますが、
              ブラウザが叩く先を同一オリジンの Route Handler
              にまとめれば、その壁は発生しません。 外部 API
              呼び出しはサーバ間通信になるからです。 これは Nuxt の{" "}
              <code>server/api</code>（Nitro）を BFF にして CORS
              を避ける構成と同じ考え方です。
            </InfoBox>
          </section>

          {/* Server Actions */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Server Actions — フォームから mutation を呼ぶ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              データの<strong>作成・更新・削除（mutation）</strong>には、Server
              Action が便利です。関数の先頭に <code>'use server'</code>{" "}
              を書くと、その関数はサーバ上でだけ実行される関数になります。
              フォームの <code>action</code> に直接渡せるため、クライアント側に
              <code>fetch</code> のハンドラを書かずに送信を組めます。送信後は
              <code>revalidatePath</code> / <code>revalidateTag</code>{" "}
              で再検証し、 画面を最新にします。
            </p>

            <CodeBlock
              language="tsx"
              title="app/products/new/page.tsx — Server Action とフォーム"
              code={`import { revalidatePath } from "next/cache";

export default function NewProductPage() {
  // フォーム送信時にサーバ上で実行される関数
  async function createProduct(formData: FormData) {
    "use server";

    const name = formData.get("name");
    if (typeof name !== "string" || name === "") {
      throw new Error("name は必須です");
    }

    await db.products.create({ name });

    // 一覧ページのキャッシュを破棄して再生成 → 追加が即反映される
    revalidatePath("/products");
  }

  return (
    <form action={createProduct}>
      <input name="name" type="text" required />
      <button type="submit">追加</button>
    </form>
  );
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              再検証には 2 つの方法があります。パスを指定する{" "}
              <code>revalidatePath("/products")</code> と、 タグを指定する{" "}
              <code>revalidateTag("products")</code> です。
              後者を使うときは、取得側の <code>fetch</code> に{" "}
              <code>{`{ next: { tags: ["products"] } }`}</code>{" "}
              を付けてタグを結び付けておきます。 mutation
              後に同じタグを無効化すれば、そのタグが付いた取得だけがまとめて再生成されます。
            </p>

            <InfoBox type="warning" title="Server Action は実質エンドポイント">
              <code>'use server'</code> を付けた関数は、内部的にはサーバの POST
              エンドポイントとして公開されます。 フォーム経由でしか呼ばれない
              つもりでも、外部から直接叩かれうると考え、
              <strong>サーバ側で必ず入力検証と認可チェックを行います</strong>。
              「クライアントのフォームでバリデーションしたから安全」とは考えないことです。
            </InfoBox>
          </section>

          {/* Client Components */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Client Components — インタラクティブな取得
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              検索の絞り込み、無限スクロール、ポーリングなど、
              <strong>ユーザー操作に応じて取得し直す</strong>部分は Client
              Component に置きます。 ファイル先頭に <code>'use client'</code>{" "}
              を書き、データ取得には TanStack Query の <code>useQuery</code> や
              SWR の <code>useSWR</code> を使うのが定石です。
              キャッシュ・再取得・ローディング状態をライブラリが面倒見てくれます。
            </p>

            <CodeBlock
              language="tsx"
              title="components/ProductSearch.tsx — TanStack Query で取得"
              code={`"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export function ProductSearch() {
  const [q, setQ] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["products", q],
    // 同一オリジンの Route Handler を叩く（CORS は発生しない）
    queryFn: async () => {
      const res = await fetch(\`/api/products?q=\${q}\`);
      return res.json();
    },
  });

  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} />
      {isLoading ? <p>読み込み中...</p> : <ProductList items={data} />}
    </div>
  );
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ここで叩いている <code>/api/products</code>{" "}
              は、前の節で作った同一オリジンの Route Handler です。Client
              Component から外部 API を直接叩くと CORS の壁にぶつかりますが、
              自前の Route Handler
              を経由すれば同一オリジンなので、その心配がありません。
            </p>
          </section>

          {/* 使い分け */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              使い分け — 初期表示はサーバ、操作はクライアント
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              4 つの手段は対立するものではなく、
              <strong>役割で住み分けます</strong>。
              基本の指針はシンプルです。初期表示に必要なデータは Server
              Component で取り、 ユーザー操作で動く部分だけを Client Component
              に切り出します。
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  初期表示・SEO 対象:
                </span>{" "}
                Server Component で <code>await fetch</code>。HTML
                がサーバで完成するので、
                初回描画が速く、クローラにも内容が届く。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  自前 API・外部のプロキシ:
                </span>{" "}
                Route Handler。ブラウザの叩く先を同一オリジンに集約し、CORS
                とキー露出を避ける。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  作成・更新・削除:
                </span>{" "}
                Server Action でフォームから呼び、<code>revalidatePath</code> /{" "}
                <code>revalidateTag</code> で表示を更新する。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  操作に応じた再取得:
                </span>{" "}
                Client Component + TanStack Query / SWR。検索・ポーリング・
                楽観的更新などインタラクティブな部分に限定する。
              </li>
            </ul>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              Route Handler の詳しい書き方は、
              <Link
                href="/react/nextjs-practice/route-handlers"
                className="text-primary underline underline-offset-2"
              >
                Route Handlers の実践ページ
              </Link>
              でさらに掘り下げています。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Next.js App Router の Route Handlers の役割として正しいのは？"
              options={[
                {
                  label:
                    "app/api/<name>/route.ts に GET/POST 等をエクスポートして自前の API を作れる。外部 API のプロキシ（BFF）にも使える",
                  correct: true,
                },
                {
                  label:
                    "ブラウザ側でだけ動く関数で、サーバには一切リクエストを送らない",
                },
                {
                  label: "CSS を返すための仕組みで、データ取得には使えない",
                },
                {
                  label:
                    "Server Action を呼ぶことが禁止されており、mutation を扱えない",
                },
              ]}
              explanation="Route Handler は app/api/<name>/route.ts に GET / POST などメソッド名の関数をエクスポートして作る自前のエンドポイントです。Request を受け取り Response / NextResponse を返します。外部 API のプロキシ（BFF）としても使え、ブラウザの叩く先を同一オリジンにまとめることで CORS の回避や API キーの隠蔽ができます。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Next.js Docs - Data Fetching and Caching",
                  url: "https://nextjs.org/docs/app/building-your-application/data-fetching/fetching",
                  description:
                    "Server Component での fetch とキャッシュ / 再検証（revalidate）の公式ガイド",
                },
                {
                  title: "Next.js Docs - Route Handlers",
                  url: "https://nextjs.org/docs/app/building-your-application/routing/route-handlers",
                  description:
                    "app/api/<name>/route.ts に GET/POST 等を定義する方法。Request / NextResponse の扱い",
                },
                {
                  title: "Next.js Docs - Server Actions and Mutations",
                  url: "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations",
                  description:
                    "'use server' によるフォーム mutation と revalidatePath / revalidateTag",
                },
                {
                  title: "TanStack Query - useQuery",
                  url: "https://tanstack.com/query/latest/docs/framework/react/reference/useQuery",
                  description:
                    "Client Component でのクライアント側取得に使う useQuery の公式リファレンス",
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
