import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function LoadingError() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 38</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Loading / Error UI</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Next.js のファイル規約を使って、読み込み中の表示とエラー処理を実装します。
          loading.tsx、error.tsx、not-found.tsx の使い方と、Suspense 境界との関係を理解しましょう。
        </p>

        <WhyNowBox tags={['loading.tsx', 'error.tsx', 'not-found.tsx', 'Suspense', 'エラー処理']}>
          <p>
            ユーザー体験は「待ち時間」と「エラー時の対応」で大きく左右されます。
            Next.js はファイルを配置するだけで適切なローディング UI とエラー UI を自動的に表示してくれます。
            デザイナーとして、これらの状態を美しくデザインすることが UX 向上の鍵です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: loading.tsx */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">loading.tsx - ローディング UI</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              フォルダ内に <code className="text-sm bg-muted px-1.5 py-0.5 rounded">loading.tsx</code> を配置するだけで、
              そのルートのデータ取得中に自動的に表示されるローディング UI を定義できます。
              内部的には React の Suspense を使っています。
            </p>

            <CodeBlock
              code={`// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* ヘッダーのスケルトン */}
      <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />

      {/* カードグリッドのスケルトン */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-32 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-24" />
          </div>
        ))}
      </div>

      {/* テーブルのスケルトン */}
      <div className="border rounded-lg p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-32 mb-4" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4 mb-3">
            <div className="h-4 bg-gray-200 rounded flex-1" />
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}`}
              language="tsx"
              title="スケルトン UI のローディング"
            />

            <CodeBlock
              code={`// シンプルなスピナー版
// app/blog/loading.tsx
export default function BlogLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">記事を読み込んでいます...</p>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="シンプルなスピナー"
            />

            <InfoBox type="success" title="スケルトン UI を推奨">
              <p>
                スピナーよりもスケルトン UI（実際のコンテンツの形を模した灰色のプレースホルダー）の方が、
                ユーザーに「もうすぐ表示される」という安心感を与えます。
                実際のレイアウトに合わせたスケルトンを作ることで、CLS（レイアウトのずれ）も防げます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: loading.tsx の仕組み */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">loading.tsx の仕組み</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              loading.tsx は、Next.js が内部的に以下のような Suspense ラッパーを自動生成することで動作します。
            </p>

            <CodeBlock
              code={`// Next.js が内部的に行っていること:
// app/dashboard/layout.tsx の children が Suspense で包まれる

import Loading from './loading';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        {children}  {/* ← page.tsx の内容 */}
      </Suspense>
    </div>
  );
}

// つまり loading.tsx は Suspense の fallback に使われている`}
              language="tsx"
              title="loading.tsx の内部動作"
            />

            <CodeBlock
              code={`// Suspense を直接使えばより細かい制御が可能
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* 即座に表示 */}
      <h1 className="col-span-2 text-3xl font-bold">ダッシュボード</h1>

      {/* セクションごとに別々のローディング */}
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>

      <Suspense fallback={<StatsSkeleton />}>
        <StatsCards />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <OrdersTable />
      </Suspense>
    </div>
  );
}`}
              language="tsx"
              title="Suspense で細かい制御"
            />

            <InfoBox type="info" title="loading.tsx vs Suspense">
              <p>
                <strong>loading.tsx</strong>: ページ全体のローディングに使う。ファイルを置くだけで動く。<br />
                <strong>Suspense</strong>: ページ内の一部分のローディングに使う。より細かい制御が可能。<br />
                両方を組み合わせて使うのが理想的です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 3: error.tsx */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">error.tsx - エラー UI</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">error.tsx</code> を配置すると、
              そのルートで発生したエラーをキャッチして、フォールバック UI を表示します。
              重要: error.tsx は必ず Client Component にする必要があります。
            </p>

            <CodeBlock
              code={`// app/dashboard/error.tsx
'use client'; // 必須！

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーをログサービスに送信
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          エラーが発生しました
        </h2>
        <p className="text-gray-600 mb-6">
          {error.message || 'データの読み込み中に問題が発生しました。'}
        </p>

        <button
          onClick={reset}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          もう一度試す
        </button>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="エラー UI コンポーネント"
              showLineNumbers
            />

            <InfoBox type="info" title="reset 関数">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">reset</code> 関数を呼ぶと、
                エラー境界内のコンポーネントを再レンダリングして復旧を試みます。
                一時的なネットワークエラーなどの場合、ユーザーが「もう一度試す」ボタンを押すだけで復旧できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: not-found.tsx */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">not-found.tsx - 404 ページ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              存在しないページにアクセスされたときに表示される 404 ページを定義します。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">notFound()</code> 関数を使って、
              プログラム的に 404 を返すこともできます。
            </p>

            <CodeBlock
              code={`// app/not-found.tsx - グローバル 404 ページ
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-extrabold text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ページが見つかりません
        </h2>
        <p className="text-gray-600 mb-8">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="グローバル 404 ページ"
            />

            <CodeBlock
              code={`// app/blog/[slug]/page.tsx - プログラム的な 404
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await fetch(
    \`https://api.example.com/posts/\${slug}\`
  );

  // 記事が存在しない場合は 404 を返す
  if (!post.ok) {
    notFound(); // → app/blog/[slug]/not-found.tsx または app/not-found.tsx が表示される
  }

  const data = await post.json();

  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </article>
  );
}

// app/blog/[slug]/not-found.tsx - ブログ専用の 404
import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">記事が見つかりません</h2>
      <p className="text-gray-600 mb-6">
        この記事は削除されたか、URLが間違っている可能性があります。
      </p>
      <Link href="/blog" className="text-blue-600 hover:underline">
        ブログ一覧に戻る
      </Link>
    </div>
  );
}`}
              language="tsx"
              title="プログラム的な 404 とカスタム not-found"
            />
          </section>

          {/* セクション 5: グローバルエラーハンドリング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">グローバルエラーハンドリング</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">app/global-error.tsx</code> を使うと、
              ルートレイアウト自体でエラーが発生した場合のフォールバックを定義できます。
              これは最後の砦となるエラーハンドリングです。
            </p>

            <CodeBlock
              code={`// app/global-error.tsx
// ルートレイアウトのエラーをキャッチ
// html タグと body タグを自分で定義する必要がある
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ja">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <h1 className="text-2xl font-bold mb-4">
            予期しないエラーが発生しました
          </h1>
          <p className="text-gray-600 mb-6">
            アプリケーションに重大な問題が発生しました。
          </p>
          <button
            onClick={reset}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            アプリを再読み込み
          </button>
        </div>
      </body>
    </html>
  );
}`}
              language="tsx"
              title="グローバルエラーハンドリング"
            />

            <InfoBox type="warning" title="global-error.tsx の注意点">
              <p>
                global-error.tsx はルートレイアウトを置き換えるため、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;html&gt;</code> と
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;body&gt;</code> タグを自分で定義する必要があります。
                また、開発モードでは global-error よりもエラーオーバーレイが優先されます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 6: ファイル配置の全体像 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ファイル配置の全体像</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              loading.tsx、error.tsx、not-found.tsx の配置場所によって、影響範囲が変わります。
              全体像を確認しましょう。
            </p>

            <CodeBlock
              code={`app/
├── layout.tsx           # ルートレイアウト
├── loading.tsx          # 全ページ共通のローディング
├── error.tsx            # 全ページ共通のエラー
├── not-found.tsx        # 全ページ共通の 404
├── global-error.tsx     # ルートレイアウトのエラー（最後の砦）
├── page.tsx             # /
├── blog/
│   ├── loading.tsx      # /blog/* のローディング（上位の loading.tsx を上書き）
│   ├── error.tsx        # /blog/* のエラー
│   ├── not-found.tsx    # /blog/* の 404
│   ├── page.tsx         # /blog
│   └── [slug]/
│       ├── loading.tsx  # /blog/[slug] のローディング
│       ├── error.tsx    # /blog/[slug] のエラー
│       ├── not-found.tsx # /blog/[slug] の 404
│       └── page.tsx     # /blog/[slug]
└── dashboard/
    ├── layout.tsx       # ダッシュボードレイアウト
    ├── loading.tsx      # /dashboard/* のローディング
    ├── error.tsx        # /dashboard/* のエラー
    └── page.tsx         # /dashboard`}
              language="plaintext"
              title="ファイル配置と影響範囲"
            />

            <InfoBox type="success" title="段階的に追加できる">
              <p>
                loading.tsx や error.tsx はすべてのルートに必要なわけではありません。
                まずルートレベルに配置して全体をカバーし、
                特定のセクションに異なるデザインが必要になったら、そのフォルダにファイルを追加しましょう。
                近いフォルダのファイルが優先されます。
              </p>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'loading.js - Next.js',
                  url: 'https://nextjs.org/docs/app/api-reference/file-conventions/loading',
                  description: 'ローディング UI のファイル規約',
                },
                {
                  title: 'error.js - Next.js',
                  url: 'https://nextjs.org/docs/app/api-reference/file-conventions/error',
                  description: 'エラーハンドリングのファイル規約',
                },
                {
                  title: 'Suspense - React',
                  url: 'https://ja.react.dev/reference/react/Suspense',
                  description: 'React Suspense の公式リファレンス',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
