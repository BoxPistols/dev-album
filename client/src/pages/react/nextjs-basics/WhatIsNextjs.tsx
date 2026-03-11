import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function WhatIsNextjs() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 31</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Next.js とは</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React を学んだ次のステップとして、Next.js を使ったフルスタック Web 開発に踏み出しましょう。サーバーサイドレンダリングやファイルベースルーティングなど、React 単体では得られない強力な機能を手に入れることができます。
        </p>

        <WhyNowBox tags={['Next.js', 'SSR', 'App Router', 'フルスタック']}>
          <p>
            React だけでも UI は作れますが、SEO 対策、パフォーマンス最適化、API の構築、デプロイまでを一貫して行うには Next.js が最適です。
            現在の React 公式ドキュメントでも、新規プロジェクトには Next.js などのフレームワークの使用が推奨されています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: なぜ React の次に Next.js なのか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">なぜ React の次に Next.js なのか</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              これまで学んできた React + Vite の構成は、クライアントサイドレンダリング（CSR）と呼ばれる方式です。
              ブラウザが JavaScript をダウンロードして実行するまで、画面には何も表示されません。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">課題</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">React + Vite</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Next.js</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">SEO</td>
                    <td className="py-3 px-4">検索エンジンが空の HTML を受け取る</td>
                    <td className="py-3 px-4">サーバーで HTML を生成して返す</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">初期表示速度</td>
                    <td className="py-3 px-4">JS ダウンロード後にレンダリング</td>
                    <td className="py-3 px-4">HTML が即座に表示される</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">ルーティング</td>
                    <td className="py-3 px-4">React Router を別途設定</td>
                    <td className="py-3 px-4">ファイル構造がルートになる</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">API</td>
                    <td className="py-3 px-4">別のバックエンドが必要</td>
                    <td className="py-3 px-4">同じプロジェクト内に API を作成可能</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">デプロイ</td>
                    <td className="py-3 px-4">静的ホスティングのみ</td>
                    <td className="py-3 px-4">Vercel で簡単デプロイ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="デザイナーにとっての Next.js">
              <p>
                ポートフォリオサイトやクライアントのランディングページなど、SEO が重要なプロジェクトでは Next.js が特に力を発揮します。
                デザインの意図を最速でユーザーに届けるための技術基盤です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: レンダリング方式を理解する */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">レンダリング方式を理解する</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              Next.js の最大の特徴は、ページごとに最適なレンダリング方式を選べることです。
              3つの主要な方式を、料理に例えて理解しましょう。
            </p>

            <div className="grid gap-6 md:grid-cols-1 mb-6">
              <div className="rounded-lg border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">SSR（Server-Side Rendering）</h3>
                <p className="text-sm text-muted-foreground mb-3">リクエストごとにサーバーで HTML を生成</p>
                <p className="text-foreground/80 text-sm leading-relaxed mb-3">
                  レストランの「注文を受けてから作る料理」のようなもの。常に最新のデータで HTML を生成します。
                  ユーザーのリクエストごとにサーバーが動くため、リアルタイム性が求められるページに適しています。
                </p>
                <CodeBlock
                  code={`// app/dashboard/page.tsx
// デフォルトで SSR（動的レンダリング）
export default async function Dashboard() {
  // サーバーで実行される
  const data = await fetch('https://api.example.com/stats', {
    cache: 'no-store' // キャッシュしない = リクエスト毎に取得
  });
  const stats = await data.json();

  return <div>最新の統計: {stats.visitors}人</div>;
}`}
                  language="tsx"
                  title="SSR の例"
                />
              </div>

              <div className="rounded-lg border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">SSG（Static Site Generation）</h3>
                <p className="text-sm text-muted-foreground mb-3">ビルド時に HTML を事前生成</p>
                <p className="text-foreground/80 text-sm leading-relaxed mb-3">
                  「作り置きの料理」のようなもの。ビルド時に HTML を生成し、CDN から配信します。
                  最も高速ですが、データが更新されるとビルドし直す必要があります。
                </p>
                <CodeBlock
                  code={`// app/about/page.tsx
// 静的データのみ = 自動的に SSG になる
export default function About() {
  return (
    <div>
      <h1>私たちについて</h1>
      <p>このサイトは Next.js で作られています。</p>
    </div>
  );
}

// 動的パスの場合は generateStaticParams を使う
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}`}
                  language="tsx"
                  title="SSG の例"
                />
              </div>

              <div className="rounded-lg border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">ISR（Incremental Static Regeneration）</h3>
                <p className="text-sm text-muted-foreground mb-3">一定時間ごとに静的ページを再生成</p>
                <p className="text-foreground/80 text-sm leading-relaxed mb-3">
                  「定期的に作り直す料理」のようなもの。SSG の速さと SSR の鮮度を両立します。
                  指定した秒数が経過すると、バックグラウンドでページを再生成します。
                </p>
                <CodeBlock
                  code={`// app/blog/page.tsx
export default async function Blog() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 } // 60秒ごとに再生成
  });
  const data = await posts.json();

  return (
    <ul>
      {data.map((post: { id: number; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`}
                  language="tsx"
                  title="ISR の例"
                />
              </div>
            </div>

            <InfoBox type="success" title="Next.js が自動で判断してくれる">
              <p>
                App Router では、コンポーネントの内容に基づいて Next.js が自動的に最適なレンダリング方式を選びます。
                動的なデータ取得がなければ SSG、あれば SSR というように、開発者が明示的に指定する必要はほとんどありません。
              </p>
            </InfoBox>
          </section>

          {/* セクション 3: ファイルベースルーティング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ファイルベースルーティング</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js では、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">app/</code> ディレクトリ内のフォルダ構造がそのまま URL のパスになります。
              React Router のような設定ファイルは不要です。
            </p>

            <CodeBlock
              code={`app/
├── page.tsx              → /
├── about/
│   └── page.tsx          → /about
├── blog/
│   ├── page.tsx          → /blog
│   └── [slug]/
│       └── page.tsx      → /blog/hello-world, /blog/nextjs-tutorial ...
├── dashboard/
│   ├── layout.tsx        → ダッシュボード共通レイアウト
│   ├── page.tsx          → /dashboard
│   └── settings/
│       └── page.tsx      → /dashboard/settings
└── layout.tsx            → 全ページ共通のルートレイアウト`}
              language="plaintext"
              title="ファイル構造 = URL 構造"
            />

            <p className="text-foreground/80 mt-4 leading-relaxed">
              フォルダ名がパスのセグメントになり、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">page.tsx</code> がそのルートの UI を定義します。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">[slug]</code> のように角括弧で囲むと動的なルートになります。
            </p>
          </section>

          {/* セクション 4: React Server Components */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React Server Components（RSC）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js 13 以降の App Router では、コンポーネントはデフォルトで「Server Component」として動作します。
              これは React の新しいパラダイムで、コンポーネントがサーバー上で実行されることを意味します。
            </p>

            <CodeBlock
              code={`// これは Server Component（デフォルト）
// サーバーでのみ実行され、ブラウザには HTML だけが送られる
export default async function ProductPage() {
  // データベースに直接アクセスできる！
  const products = await db.query('SELECT * FROM products');

  return (
    <div>
      <h1>商品一覧</h1>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.price}円</p>
        </div>
      ))}
    </div>
  );
}

// ブラウザでの操作が必要な場合は Client Component にする
// ファイルの先頭に 'use client' を追加
'use client';
export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>❤️</button>;
}`}
              language="tsx"
              title="Server Component vs Client Component"
            />

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Server Component のメリット</h4>
                <ul className="text-sm text-foreground/80 space-y-1">
                  <li>JavaScript バンドルサイズが小さくなる</li>
                  <li>データベースに直接アクセスできる</li>
                  <li>API キーなどの機密情報を安全に扱える</li>
                  <li>初期表示が高速</li>
                </ul>
              </div>
              <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Client Component が必要な場面</h4>
                <ul className="text-sm text-foreground/80 space-y-1">
                  <li>useState, useEffect などの Hooks を使う</li>
                  <li>onClick などのイベントハンドラを使う</li>
                  <li>ブラウザ API（localStorage など）にアクセスする</li>
                  <li>インタラクティブな UI が必要</li>
                </ul>
              </div>
            </div>
          </section>

          {/* セクション 5: React + Vite との比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React + Vite との比較まとめ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              これまで学んできた React + Vite と Next.js の違いを整理しましょう。
              Next.js は React を置き換えるものではなく、React の上に構築されたフレームワークです。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">機能</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">React + Vite</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Next.js</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">種類</td>
                    <td className="py-3 px-4">ライブラリ + ビルドツール</td>
                    <td className="py-3 px-4">フルスタックフレームワーク</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">レンダリング</td>
                    <td className="py-3 px-4">CSR のみ</td>
                    <td className="py-3 px-4">SSR / SSG / ISR / CSR</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">ルーティング</td>
                    <td className="py-3 px-4">自分で設定（React Router）</td>
                    <td className="py-3 px-4">ファイルベース（自動）</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">API エンドポイント</td>
                    <td className="py-3 px-4">別途バックエンド必要</td>
                    <td className="py-3 px-4">Route Handlers で同梱</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">画像最適化</td>
                    <td className="py-3 px-4">自分で設定</td>
                    <td className="py-3 px-4">next/image で自動</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">学習コスト</td>
                    <td className="py-3 px-4">React の基礎のみ</td>
                    <td className="py-3 px-4">React + Next.js 固有の概念</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="React の知識はそのまま活きる">
              <p>
                Next.js は React の上に構築されているため、コンポーネント、Props、Hooks など、これまで学んだ知識はすべてそのまま使えます。
                Next.js で新たに学ぶのは、ルーティング、データ取得、レンダリング方式の選択といったフレームワーク固有の概念です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 6: Next.js の歴史と現在 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Next.js の歴史と現在</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js は Vercel 社が開発・メンテナンスしているオープンソースのフレームワークです。
              2016年にリリースされて以来、React エコシステムの中心的な存在として進化を続けています。
            </p>

            <div className="space-y-3">
              <div className="flex gap-4 items-start">
                <div className="w-20 flex-shrink-0 text-sm font-mono text-primary font-bold">2016</div>
                <div className="text-sm text-foreground/80">Next.js 1.0 リリース。Pages Router による SSR が目玉機能</div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-20 flex-shrink-0 text-sm font-mono text-primary font-bold">2020</div>
                <div className="text-sm text-foreground/80">Next.js 10。next/image による画像最適化が追加</div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-20 flex-shrink-0 text-sm font-mono text-primary font-bold">2022</div>
                <div className="text-sm text-foreground/80">Next.js 13。App Router と React Server Components の導入</div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-20 flex-shrink-0 text-sm font-mono text-primary font-bold">2024</div>
                <div className="text-sm text-foreground/80">Next.js 15。Turbopack の安定化、Server Actions の強化</div>
              </div>
            </div>

            <InfoBox type="warning" title="Pages Router と App Router">
              <p>
                ネット上の情報には古い「Pages Router」の記事が多く残っています。
                このマニュアルでは現在推奨されている「App Router」のみを扱います。
                調べ物をする際は「App Router」というキーワードを含めて検索してください。
              </p>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Next.js 公式ドキュメント',
                  url: 'https://nextjs.org/docs',
                  description: 'Next.js の包括的な公式ガイド',
                },
                {
                  title: 'Next.js とは - Learn',
                  url: 'https://nextjs.org/learn',
                  description: 'Next.js の対話型チュートリアル',
                },
                {
                  title: 'React 公式 - フレームワークから始める',
                  url: 'https://ja.react.dev/learn/start-a-new-react-project',
                  description: 'React 公式が推奨するフレームワークの選び方',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
