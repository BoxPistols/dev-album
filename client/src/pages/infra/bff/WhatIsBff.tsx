import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const bffJobs = [
  {
    title: "複数 API の集約",
    description:
      "1 画面の表示に必要なデータが複数のサービスに分かれているとき、BFF がまとめて取得して 1 回のレスポンスにする。クライアントの往復回数を減らせる。",
  },
  {
    title: "レスポンスの整形",
    description:
      "汎用 API が返す冗長なデータから、その画面が必要なフィールドだけを抜き出して返す。クライアント側の変換処理を減らせる。",
  },
  {
    title: "機密情報の遮蔽",
    description:
      "外部 API キーやトークンを BFF 側に置き、ブラウザに渡さない。フロントのコードに秘密が出ないようにする境界になる。",
  },
];

const bffFrameworks = [
  {
    framework: "Next.js",
    feature: "Route Handlers（app/api）",
    note: "app/api/.../route.ts が実質的な BFF。サーバー側で外部 API を呼び、整形して返す。",
  },
  {
    framework: "Nuxt",
    feature: "server/api",
    note: "server/api/*.ts がサーバールートとして動く。Nitro 上で外部 API を集約できる。",
  },
  {
    framework: "Remix / React Router",
    feature: "loader / action",
    note: "loader 内でサーバー側のデータ取得を行う。これも BFF 的な層として機能する。",
  },
];

export default function WhatIsBff() {
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
            BFF パターンとは
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            BFF は「Backend for
            Frontend」の略で、特定のフロントエンドのために用意する
            専用のバックエンド層です。フロントとサービス群の間に立ち、複数 API
            の集約・レスポンスの整形・機密情報の遮蔽を担います。 このページでは
            BFF が何を解決する層なのかと、Next.js や Nuxt
            のサーバー機能が実質的に BFF として働く点を整理します。
          </p>
        </div>

        <WhyNowBox tags={["BFF", "集約", "整形", "Next.js", "Nuxt"]}>
          <p>
            フロントエンド開発が進むと、1 画面の表示に複数の API
            を呼び、返ってきたデータを画面用に組み替える処理が増えていきます。
            この変換ロジックをブラウザに置き続けると、フロントが肥大化し、 API
            キーのような秘密もクライアントに漏れやすくなります。 BFF
            はその変換と境界を「フロントの隣のサーバー」に移す考え方で、 React
            や Vue のフレームワークが標準でサーバー機能を持つようになった今、
            特別な追加基盤なしに始められる現実的な選択肢になっています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* BFF の定義と立ち位置 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              BFF はフロント専用の集約・整形層
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              BFF は、特定のフロントエンド（Web、モバイルなど）に合わせて作る
              バックエンドです。汎用的な API
              をすべてのクライアントで共有すると、各クライアントの都合が API
              に染み出して仕様が膨らみます。BFF
              はクライアントとサービス群の間に挟まり、
              <strong>そのフロントが必要とする形だけを提供する</strong>
              ことで、汎用 API を汎用のまま保ちます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">クライアント</p>
                  <p className="text-muted-foreground">
                    ブラウザやモバイルアプリ。BFF に 1 回問い合わせる
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">BFF</p>
                  <p className="text-muted-foreground">
                    複数サービスを呼び、集約・整形して 1 つにまとめる層
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">複数サービス</p>
                  <p className="text-muted-foreground">
                    ユーザー・商品・在庫など、役割ごとに分かれた API 群
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="BFF は「翻訳と窓口」">
              BFF
              はビジネスロジックの中心ではなく、フロントの都合とサービス群の都合を
              つなぐ翻訳層です。重い計算やデータの正は背後のサービスが持ち、BFF
              は「この画面に必要な形」へ寄せる役割に徹すると、責務がぶれません。
            </InfoBox>
          </section>

          {/* フレームワークの標準機能が BFF */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Next.js Route Handlers や Nuxt server/api は実質 BFF
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              BFF というと専用のサーバーを別に立てる印象がありますが、現代の
              React / Vue
              フレームワークはサーバー側で動くエンドポイントを標準で持ちます。
              これらはブラウザに配信されず、サーバー上でだけ実行されるため、
              外部 API の呼び出しや秘密の扱いに向いた、そのまま BFF
              として使える場所です。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground">
                      フレームワーク
                    </th>
                    <th className="text-left py-2 pr-4 font-bold text-foreground">
                      サーバー機能
                    </th>
                    <th className="text-left py-2 font-bold text-foreground">
                      BFF としての使い方
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bffFrameworks.map((row) => (
                    <tr key={row.framework} className="border-b border-border">
                      <td className="py-2 pr-4 font-medium text-foreground align-top">
                        {row.framework}
                      </td>
                      <td className="py-2 pr-4 text-primary align-top">
                        {row.feature}
                      </td>
                      <td className="py-2 text-muted-foreground align-top">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              仕様の上ではこれらは単なる「サーバールート」ですが、実測としては
              フロントの専用バックエンドそのものとして機能します。理由は、
              これらがクライアントと密に同じリポジトリで開発され、その画面の都合に合わせて
              自由に整形できるからです。「BFF を建てる」前に、まず手元の
              フレームワークのサーバー機能で足りないかを確認すると無駄が減ります。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="BFF（Backend for Frontend）の役割として最も適切なのはどれ？"
              options={[
                { label: "データベースのレプリケーションを管理すること" },
                {
                  label:
                    "特定のフロント向けに複数 API を集約・整形し、必要な形だけを返すこと",
                  correct: true,
                },
                {
                  label:
                    "すべてのクライアントで完全に同じ汎用 API を提供すること",
                },
                { label: "CSS のビルドを高速化すること" },
              ]}
              explanation="BFF は特定のフロントエンドに合わせた専用バックエンドです。複数のサービスを集約し、その画面が必要とする形へ整形して返すことで、汎用 API を汎用のまま保ちつつ、クライアントの往復や変換処理を減らします。"
            />
          </section>

          {/* BFF が担う 3 つの仕事 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              集約・整形・遮蔽という 3 つの仕事
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              BFF が日常的に担う仕事は、大きく次の 3
              つに整理できます。どれも「フロントを薄く保ち、秘密を境界の内側に留める」ための役割です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {bffJobs.map((job) => (
                <div
                  key={job.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {job.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              特に 3 つ目の遮蔽は重要です。外部サービスの API キーをブラウザの
              JavaScript に置くと、開発者ツールやネットワークタブから
              簡単に読み取られます。BFF にキーを置き、サーバー側でだけ外部 API
              を呼べば、ブラウザにはキーを含まないレスポンスだけが届きます。
            </p>
          </section>

          {/* 集約の実例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Next.js Route Handler での集約例
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ダッシュボードの 1
              画面に「ユーザー情報」と「最近の注文」が必要だとします。
              ブラウザから 2 つの API を別々に叩く代わりに、Route Handler
              でまとめて取得し、画面用に整形して 1
              つのレスポンスとして返します。外部キーはサーバー側の環境変数から読み、
              クライアントには渡しません。
            </p>

            <CodeBlock
              language="ts"
              title="app/api/dashboard/route.ts"
              code={`import { NextResponse } from "next/server";

export async function GET() {
  // サーバー側でだけ参照される。ブラウザには出ない
  const apiKey = process.env.SERVICE_API_KEY;
  const headers = { Authorization: \`Bearer \${apiKey}\` };

  // 複数サービスを並行で呼んで往復を 1 回にまとめる
  const [userRes, ordersRes] = await Promise.all([
    fetch("https://users.internal/api/me", { headers }),
    fetch("https://orders.internal/api/recent", { headers }),
  ]);

  const user = await userRes.json();
  const orders = await ordersRes.json();

  // この画面が必要なフィールドだけに整形して返す
  return NextResponse.json({
    name: user.displayName,
    avatarUrl: user.avatar,
    recentOrders: orders.items.map((o: { id: string; total: number }) => ({
      id: o.id,
      total: o.total,
    })),
  });
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ブラウザは <code>/api/dashboard</code> を 1
              回呼ぶだけで、画面に必要な形のデータを受け取れます。サービスが 3
              つ 4 つに増えても、変更は BFF
              の中に閉じ込められ、クライアントのコードは安定したままにできます。
            </p>
          </section>

          {/* メリットと注意点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              メリットと注意点（層の増加）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              BFF はフロントを薄く保ち、秘密を境界に留め、往復を減らす一方で、
              間に 1 つ層が増えることそのものがコストになります。
              採用するかどうかは、得られる集約・遮蔽の価値が、
              層を保守する手間に見合うかで判断します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  メリット
                </h3>
                <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
                  <li>複数 API を 1 レスポンスに集約し往復を減らせる</li>
                  <li>画面に必要な形へ整形しフロントを薄く保てる</li>
                  <li>API キーやトークンをブラウザに出さずに済む</li>
                  <li>背後のサービス変更をクライアントから隠せる</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  注意点
                </h3>
                <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
                  <li>層が 1 つ増え、デプロイと監視の対象が増える</li>
                  <li>BFF にロジックを詰め込みすぎると肥大化する</li>
                  <li>クライアント別に BFF を増やすと数が膨らむ</li>
                  <li>遅延が 1 ホップ分加わる（集約で相殺できる場合が多い）</li>
                </ul>
              </div>
            </div>

            <InfoBox type="warning" title="BFF を「第二のモノリス」にしない">
              便利さゆえに、認証も計算もすべて BFF
              に集めると、フロントとサービスの間に重い層ができてしまいます。 BFF
              はあくまで集約と整形の窓口に留め、ビジネスロジックの正は
              背後のサービスに置くと、層を増やした価値を保てます。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="外部サービスの API キーをフロントで安全に扱うには、どこに置くのが適切？"
              options={[
                { label: "ブラウザの localStorage に保存する" },
                { label: "React コンポーネントの定数として埋め込む" },
                {
                  label:
                    "BFF（サーバー側）の環境変数に置き、サーバーからだけ外部 API を呼ぶ",
                  correct: true,
                },
                { label: "URL のクエリパラメータに付けて渡す" },
              ]}
              explanation="ブラウザに置いたキーは開発者ツールやネットワークタブから読み取れます。BFF のサーバー側環境変数にキーを置き、外部 API の呼び出しをサーバーで完結させれば、クライアントにはキーを含まないレスポンスだけが届きます。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Sam Newman - Backends For Frontends",
                  url: "https://samnewman.io/patterns/architectural/bff/",
                  description:
                    "BFF パターンの定義と背景を提唱者本人が解説した記事。出発点として最適",
                },
                {
                  title: "Next.js - Route Handlers",
                  url: "https://nextjs.org/docs/app/building-your-application/routing/route-handlers",
                  description:
                    "app/api でサーバー側エンドポイントを作る公式ドキュメント。実質 BFF の実装場所",
                },
                {
                  title: "Nuxt - Server Directory",
                  url: "https://nuxt.com/docs/guide/directory-structure/server",
                  description:
                    "server/api でサーバールートを定義する Nuxt 公式ガイド",
                },
                {
                  title: "MDN - Fetch API",
                  url: "https://developer.mozilla.org/ja/docs/Web/API/Fetch_API",
                  description:
                    "BFF から外部 API を呼ぶときに使う fetch の基礎リファレンス",
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
