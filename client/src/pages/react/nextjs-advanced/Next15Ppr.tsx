import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function Next15Ppr() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 47</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Partial Pre-rendering と最新レンダリング</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Next.js の Partial Pre-rendering（PPR）は、静的コンテンツと動的コンテンツを一つのページで最適に組み合わせる
          革新的なレンダリング手法です。従来の SSR / SSG / ISR を超える、新しいレンダリング手法を確認しましょう。
        </p>

        <WhyNowBox tags={['PPR', 'Partial Pre-rendering', 'Suspense', 'dynamicIO', 'Next.js 16', 'React Compiler']}>
          <p>
            従来の Next.js では、ページ単位で「静的」か「動的」かを選ぶ必要がありました。
            PPR はこの制約を取り除き、ページの一部を静的に事前レンダリングしつつ、
            動的な部分だけをリクエスト時に生成します。これにより、初回表示速度と最新データの両立が可能になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: PPR とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">PPR（Partial Pre-rendering）とは</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Partial Pre-rendering は、ビルド時に生成できる静的な「シェル」と、
              リクエスト時にサーバーで生成する動的な「コンテンツ」を一つのレスポンスとして返す仕組みです。
              ユーザーにはまず静的なシェルが即座に表示され、動的な部分はストリーミングで後から届きます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">従来のレンダリング方式との比較</h3>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h4 className="font-bold text-foreground mb-3">従来の方式</h4>
                <div className="space-y-3 text-sm text-foreground/80">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground w-12 shrink-0">SSG</span>
                    <span>ビルド時に全て生成。高速だが動的データに対応できない</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground w-12 shrink-0">SSR</span>
                    <span>毎回サーバーで生成。最新データだが初回表示が遅い</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-foreground w-12 shrink-0">ISR</span>
                    <span>定期的に再生成。静的と動的の折衷だがページ全体が対象</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                <h4 className="font-bold text-foreground mb-3">PPR</h4>
                <div className="space-y-3 text-sm text-foreground/80">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>ページの静的部分はビルド時に生成（CDN から配信）</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>動的部分だけリクエスト時にサーバーで生成</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>Suspense の境界で自動的に分離</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>SSG の速度と SSR の鮮度を両立</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-6 mb-6">
              <h4 className="font-bold text-foreground mb-3">PPR の処理フロー</h4>
              <div className="space-y-3 text-sm text-foreground/80">
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">1</span>
                  <span><strong>ビルド時:</strong> ページの静的部分（ナビゲーション、レイアウト、静的テキスト等）を HTML として事前生成。動的部分にはフォールバック（loading UI）を埋め込む</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">2</span>
                  <span><strong>リクエスト時:</strong> 静的シェルを即座にレスポンスとして送信開始（CDN キャッシュから）</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">3</span>
                  <span><strong>ストリーミング:</strong> 動的部分がサーバーで生成され次第、HTML ストリームとして追加送信。フォールバックが実際のコンテンツに置換される</span>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="PPR は実験的機能">
              <p>
                PPR は Next.js 15 時点ではまだ実験的（experimental）な機能です。
                本番利用は可能ですが、API が将来変更される可能性があります。
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">next.config.ts</code> で明示的に有効化する必要があります。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: 静的シェル + 動的コンテンツ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">静的シェル + 動的コンテンツ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              PPR の核心は、React の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">Suspense</code> を使って
              静的な部分と動的な部分を自動的に分離することです。Suspense の境界の外側は静的シェルとしてビルド時に生成され、
              内側は動的コンテンツとしてリクエスト時に生成されます。
            </p>

            <CodeBlock
              code={`// app/products/[id]/page.tsx
// PPR が有効な場合、このページは自動的に分割される

import { Suspense } from 'react';
import { ProductInfo } from './ProductInfo';
import { ProductReviews } from './ProductReviews';
import { RecommendedProducts } from './RecommendedProducts';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* ===== 静的シェル部分 ===== */}
      {/* ナビゲーション、レイアウト、見出しなどは静的に生成 */}
      <nav className="mb-8">
        <a href="/">ホーム</a> / <a href="/products">商品一覧</a>
      </nav>

      {/* ===== 動的コンテンツ 1 ===== */}
      {/* Suspense の中は動的に生成される */}
      <Suspense fallback={<ProductInfoSkeleton />}>
        <ProductInfo id={id} />
      </Suspense>

      {/* ===== 静的シェル部分 ===== */}
      <h2 className="text-2xl font-bold mt-12 mb-6">レビュー</h2>

      {/* ===== 動的コンテンツ 2 ===== */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={id} />
      </Suspense>

      {/* ===== 静的シェル部分 ===== */}
      <h2 className="text-2xl font-bold mt-12 mb-6">おすすめ商品</h2>

      {/* ===== 動的コンテンツ 3 ===== */}
      <Suspense fallback={<RecommendedSkeleton />}>
        <RecommendedProducts productId={id} />
      </Suspense>
    </div>
  );
}

// スケルトン UI（ビルド時にシェルに埋め込まれる）
function ProductInfoSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-64 bg-gray-200 rounded-lg" />
      <div className="h-8 bg-gray-200 rounded w-2/3" />
      <div className="h-6 bg-gray-200 rounded w-1/4" />
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}

function RecommendedSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-48 bg-gray-200 rounded-lg" />
      ))}
    </div>
  );
}`}
              language="tsx"
              title="PPR によるページ分割の例"
              showLineNumbers
            />

            <CodeBlock
              code={`// 動的コンテンツのコンポーネント例
// app/products/[id]/ProductInfo.tsx

// このコンポーネントは動的データを取得するため、
// PPR では動的コンテンツとして扱われる
export async function ProductInfo({ id }: { id: string }) {
  // 動的なデータ取得（cookies、headers を使う場合も動的になる）
  const product = await fetch(
    \`https://api.example.com/products/\${id}\`,
    { cache: 'no-store' } // 動的データ
  ).then((res) => res.json());

  return (
    <div>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-2xl text-blue-600 mt-2">
        ¥{product.price.toLocaleString()}
      </p>
      <p className="text-gray-600 mt-4">{product.description}</p>
    </div>
  );
}

// app/products/[id]/ProductReviews.tsx
import { cookies } from 'next/headers';

export async function ProductReviews({
  productId,
}: {
  productId: string;
}) {
  // cookies() を使うと自動的に動的レンダリングになる
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  const reviews = await fetch(
    \`https://api.example.com/products/\${productId}/reviews\`
  ).then((res) => res.json());

  return (
    <div className="space-y-4">
      {reviews.map((review: any) => (
        <div
          key={review.id}
          className="border rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold">{review.author}</span>
            <span className="text-yellow-500">
              {'★'.repeat(review.rating)}
            </span>
            {review.authorId === userId && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                あなたのレビュー
              </span>
            )}
          </div>
          <p className="text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}`}
              language="tsx"
              title="動的コンテンツのコンポーネント"
              showLineNumbers
            />

            <InfoBox type="success" title="PPR の最大のメリット">
              <p>
                PPR では、開発者がページの分割方法を意識する必要がほとんどありません。
                通常通り <code className="text-sm bg-muted px-1.5 py-0.5 rounded">Suspense</code> を配置するだけで、
                Next.js が自動的に静的部分と動的部分を判別してくれます。
                これまで SSG と SSR のどちらを選ぶか悩んでいた場面で、PPR が最適解を提供してくれます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 3: PPR の設定と使い方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">PPR の設定と使い方</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              PPR を使うには、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next.config.ts</code> で
              実験的機能として有効化し、ページ単位またはアプリ全体で適用を選択します。
            </p>

            <CodeBlock
              code={`// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // PPR を有効化（incremental モード）
    ppr: 'incremental',
  },
};

export default nextConfig;

// 'incremental' を指定すると、ページ単位で PPR を有効にできる
// true を指定するとアプリ全体で PPR が有効になる`}
              language="typescript"
              title="next.config.ts での PPR 有効化"
            />

            <CodeBlock
              code={`// ページ単位で PPR を有効にする場合
// app/products/[id]/page.tsx

// このルートセグメントで PPR を有効化
export const experimental_ppr = true;

import { Suspense } from 'react';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      {/* 静的シェル */}
      <header>
        <h1>商品詳細</h1>
      </header>

      {/* 動的コンテンツ */}
      <Suspense fallback={<p>読み込み中...</p>}>
        <ProductDetail id={id} />
      </Suspense>
    </div>
  );
}

// レイアウトでも PPR を設定可能
// app/dashboard/layout.tsx
export const experimental_ppr = true;

// このレイアウト配下の全ページで PPR が有効になる
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* サイドバーは静的シェルとして事前生成 */}
      <aside className="w-64 border-r p-4">
        <nav>
          <a href="/dashboard">概要</a>
          <a href="/dashboard/analytics">分析</a>
          <a href="/dashboard/settings">設定</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}`}
              language="tsx"
              title="ページ・レイアウト単位での PPR 設定"
              showLineNumbers
            />

            <InfoBox type="warning" title="動的関数に注意">
              <p>
                PPR では、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">cookies()</code>、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">headers()</code>、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">searchParams</code> などの
                動的関数を Suspense の外側で使うと、ページ全体が動的レンダリングになり PPR の効果が失われます。
                動的関数は必ず Suspense の内側のコンポーネントで使用してください。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: Suspense を使った動的コンテンツの分離パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Suspense を使った動的コンテンツの分離パターン</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              PPR を最大限に活用するには、動的データの取得を適切に Suspense の中に分離する設計が重要です。
              いくつかの実践的なパターンを見ていきましょう。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">パターン 1: ユーザー固有コンテンツの分離</h3>

            <CodeBlock
              code={`// app/page.tsx
// ホームページ: 共通コンテンツ（静的）+ ユーザー固有（動的）

import { Suspense } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { PersonalizedRecommendations } from '@/components/PersonalizedRecommendations';
import { CartSummary } from '@/components/CartSummary';

export const experimental_ppr = true;

export default function HomePage() {
  return (
    <div>
      {/* 静的: ヒーローバナーは全ユーザー共通 */}
      <HeroSection />

      {/* 静的: おすすめ商品はビルド時に生成可能 */}
      <FeaturedProducts />

      {/* 動的: ユーザーごとのパーソナライズされたおすすめ */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <PersonalizedRecommendations />
      </Suspense>

      {/* 動的: ログインユーザーのカート情報 */}
      <Suspense fallback={<CartSkeleton />}>
        <CartSummary />
      </Suspense>
    </div>
  );
}

// PersonalizedRecommendations.tsx
import { cookies } from 'next/headers';

export async function PersonalizedRecommendations() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    return <p>ログインするとパーソナライズされたおすすめが表示されます</p>;
  }

  const recommendations = await fetch(
    \`https://api.example.com/recommendations/\${userId}\`
  ).then((res) => res.json());

  return (
    <section>
      <h2>あなたへのおすすめ</h2>
      <div className="grid grid-cols-4 gap-4">
        {recommendations.map((item: any) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}`}
              language="tsx"
              title="パターン 1: ユーザー固有コンテンツの分離"
              showLineNumbers
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">パターン 2: リアルタイムデータの分離</h3>

            <CodeBlock
              code={`// app/dashboard/page.tsx
// ダッシュボード: 固定UI（静的）+ リアルタイムデータ（動的）

import { Suspense } from 'react';

export const experimental_ppr = true;

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* 静的: ダッシュボードのヘッダーとナビゲーション */}
      <div className="col-span-12">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
      </div>

      {/* 動的: リアルタイムの売上サマリー */}
      <div className="col-span-8">
        <Suspense fallback={<ChartSkeleton />}>
          <SalesChart />
        </Suspense>
      </div>

      {/* 動的: 最新の注文一覧 */}
      <div className="col-span-4">
        <Suspense fallback={<OrderListSkeleton />}>
          <RecentOrders />
        </Suspense>
      </div>

      {/* 静的: ヘルプセクション */}
      <div className="col-span-12">
        <HelpSection />
      </div>
    </div>
  );
}

// 並列データ取得: 各 Suspense は独立して解決される
// SalesChart が遅くても RecentOrders は先に表示される
async function SalesChart() {
  const data = await fetch('https://api.example.com/sales/chart', {
    cache: 'no-store',
  }).then((res) => res.json());

  return <Chart data={data} />;
}

async function RecentOrders() {
  const orders = await fetch('https://api.example.com/orders/recent', {
    cache: 'no-store',
  }).then((res) => res.json());

  return (
    <ul className="space-y-2">
      {orders.map((order: any) => (
        <li key={order.id} className="border rounded p-3">
          <span className="font-bold">#{order.id}</span>
          <span className="ml-2">¥{order.total.toLocaleString()}</span>
        </li>
      ))}
    </ul>
  );
}`}
              language="tsx"
              title="パターン 2: リアルタイムデータの分離"
              showLineNumbers
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">パターン 3: ネストされた Suspense</h3>

            <CodeBlock
              code={`// 複数の動的部分を段階的にストリーミング
import { Suspense } from 'react';

export const experimental_ppr = true;

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <article>
      {/* 動的: 記事本文（最優先で取得） */}
      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleContent params={params} />
      </Suspense>

      {/* 動的: コメント（記事の後に表示されれば良い） */}
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments params={params} />

        {/* ネストされた Suspense: 関連記事はさらに後でOK */}
        <Suspense fallback={<RelatedSkeleton />}>
          <RelatedArticles params={params} />
        </Suspense>
      </Suspense>
    </article>
  );
}

// ストリーミング順序:
// 1. 静的シェル（article タグ、スケルトン）が即座に表示
// 2. ArticleContent が準備でき次第、ストリーミングで表示
// 3. Comments が準備でき次第、ストリーミングで表示
// 4. RelatedArticles が最後にストリーミングで表示`}
              language="tsx"
              title="パターン 3: ネストされた Suspense"
              showLineNumbers
            />
          </section>

          {/* セクション 5: dynamicIO */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">dynamicIO</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">dynamicIO</code> は Next.js 15 で導入された実験的な機能で、
              データ取得の動的・静的判別をより厳密に制御します。有効にすると、キャッシュされていないデータアクセスが
              Suspense の外側にある場合にビルドエラーが発生し、PPR の最適な設計を強制します。
            </p>

            <CodeBlock
              code={`// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
    dynamicIO: true, // dynamicIO を有効化
  },
};

export default nextConfig;`}
              language="typescript"
              title="dynamicIO の有効化"
            />

            <CodeBlock
              code={`// dynamicIO が有効な場合の挙動

// NG: Suspense なしで動的データにアクセス → ビルドエラー
export default async function Page() {
  // これはビルド時にエラーになる
  // 動的データが Suspense の外側にあるため
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}

// OK: Suspense 内で動的データにアクセス
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>ページタイトル</h1>
      <Suspense fallback={<p>読み込み中...</p>}>
        <DynamicContent />
      </Suspense>
    </div>
  );
}

async function DynamicContent() {
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();
  return <div>{json.message}</div>;
}

// 静的にしたい場合は 'use cache' を使う
import { cacheLife } from 'next/cache';

async function CachedContent() {
  'use cache';
  cacheLife('hours'); // キャッシュの有効期間を設定

  const data = await fetch('https://api.example.com/config');
  const json = await data.json();
  return <div>{json.siteName}</div>;
}`}
              language="tsx"
              title="dynamicIO の動作例"
              showLineNumbers
            />

            <InfoBox type="info" title="'use cache' ディレクティブ">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">dynamicIO</code> と共に導入された
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use cache'</code> ディレクティブは、
                コンポーネントや関数のレンダリング結果をキャッシュするための仕組みです。
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">cacheLife()</code> でキャッシュの有効期間を、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">cacheTag()</code> でタグベースの無効化を制御できます。
                これらは <code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use server'</code> や
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use client'</code> と同じディレクティブの仕組みです。
              </p>
            </InfoBox>

            <CodeBlock
              code={`// 'use cache' の実践的な使い方

import { cacheLife, cacheTag } from 'next/cache';

// コンポーネント単位のキャッシュ
async function ProductList() {
  'use cache';
  cacheLife('minutes');         // 数分間キャッシュ
  cacheTag('product-list');     // タグで管理

  const products = await db.product.findMany();

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}

// 関数単位のキャッシュ
async function getCategories() {
  'use cache';
  cacheLife('days');             // 日単位でキャッシュ
  cacheTag('categories');

  return await db.category.findMany();
}

// Server Action でキャッシュを無効化
'use server';
import { revalidateTag } from 'next/cache';

export async function addProduct(formData: FormData) {
  await db.product.create({ ... });
  revalidateTag('product-list'); // キャッシュを無効化
}`}
              language="tsx"
              title="'use cache' によるキャッシュ制御"
            />
          </section>

          {/* セクション 6: Next.js 16 プレビュー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Next.js 16 プレビュー</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js 16 は、React Compiler のデフォルト有効化や Node.js ランタイムの改善など、
              パフォーマンスと開発者体験のさらなる向上が予定されています。主な変更点をプレビューしましょう。
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                <h3 className="font-bold text-foreground mb-3">React Compiler デフォルト有効化</h3>
                <div className="space-y-2 text-sm text-foreground/80">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>useMemo / useCallback / React.memo が不要に</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>コンパイラが自動でメモ化を最適化</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>既存コードの変更なしで恩恵を受けられる</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>手動メモ化のコードは残しても問題ない</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                <h3 className="font-bold text-foreground mb-3">Node.js ランタイムの改善</h3>
                <div className="space-y-2 text-sm text-foreground/80">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>ストリーミングの改善でレスポンス速度向上</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>コールドスタートの高速化</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>メモリ使用量の最適化</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>Edge Runtime との API 統一が進む</span>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`// Next.js 16 での React Compiler の効果

// Before: 手動でメモ化が必要だった
'use client';

import { useMemo, useCallback, memo } from 'react';

const ExpensiveList = memo(function ExpensiveList({
  items,
  onSelect,
}: {
  items: Item[];
  onSelect: (id: string) => void;
}) {
  const sorted = useMemo(
    () => items.sort((a, b) => a.name.localeCompare(b.name)),
    [items]
  );

  const handleClick = useCallback(
    (id: string) => {
      onSelect(id);
    },
    [onSelect]
  );

  return (
    <ul>
      {sorted.map((item) => (
        <li key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});

// After: React Compiler が自動でメモ化（Next.js 16）
// useMemo, useCallback, memo を書かなくても同等の最適化
'use client';

function ExpensiveList({
  items,
  onSelect,
}: {
  items: Item[];
  onSelect: (id: string) => void;
}) {
  const sorted = items.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <ul>
      {sorted.map((item) => (
        <li key={item.id} onClick={() => onSelect(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// React Compiler が依存関係を解析し、
// 必要な箇所だけ自動的にメモ化してくれる`}
              language="tsx"
              title="React Compiler による自動メモ化"
              showLineNumbers
            />

            <CodeBlock
              code={`// Next.js 16 の主要な設定変更

// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // React Compiler はデフォルトで有効
  // 無効にしたい場合のみ設定
  // reactCompiler: false,

  experimental: {
    // PPR がより安定化（将来的にデフォルトになる可能性）
    ppr: 'incremental',

    // dynamicIO の安定化
    dynamicIO: true,
  },
};

export default nextConfig;

// Turbopack のビルドサポートも進行中
// next build --turbopack が将来的に安定版に`}
              language="typescript"
              title="Next.js 16 の設定例"
            />

            <InfoBox type="info" title="段階的なアップグレード">
              <p>
                Next.js 16 への移行は段階的に行えます。React Compiler はデフォルトで有効になりますが、
                既存の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useMemo</code> や
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useCallback</code> はそのまま動作します。
                コンパイラは手動のメモ化と共存するため、徐々にコードを簡素化していけます。
                PPR についても <code className="text-sm bg-muted px-1.5 py-0.5 rounded">incremental</code> モードで
                ページ単位の導入が可能です。
              </p>
            </InfoBox>
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">レンダリング方式の進化まとめ</h2>
            <div className="rounded-lg border border-border bg-muted/30 p-6">
              <div className="space-y-4 text-sm text-foreground/80">
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-foreground w-40 shrink-0">SSG（静的生成）</span>
                  <span>ビルド時に全ページを HTML 化。ブログや LP に最適。データ更新には再ビルドが必要</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-foreground w-40 shrink-0">SSR（サーバー生成）</span>
                  <span>リクエストごとにサーバーで HTML 生成。常に最新データだが、レスポンスが遅くなりがち</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-foreground w-40 shrink-0">ISR（増分静的再生成）</span>
                  <span>定期的に静的ページを再生成。SSG と SSR の中間だが、ページ全体が対象</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-foreground w-40 shrink-0">PPR（部分事前生成）</span>
                  <span>ページ内の静的部分と動的部分を自動分離。Suspense ベースでベストな組み合わせを実現</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-foreground w-40 shrink-0">dynamicIO + use cache</span>
                  <span>コンポーネント・関数単位の細粒度キャッシュ制御。PPR と組み合わせて最適なパフォーマンスを実現</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="PPR（Partial Pre-rendering）の説明として正しいものはどれですか？"
              options={[
                { label: 'ページ全体をクライアントサイドでレンダリングする手法' },
                { label: 'ページの静的部分をビルド時に生成し、動的部分をリクエスト時にストリーミングで送信する手法', correct: true },
                { label: 'ページ全体を一定時間ごとにサーバーで再生成する手法（ISR と同じ）' },
                { label: '全ページを Edge Runtime で高速にレンダリングする手法' },
              ]}
              explanation="PPR は Suspense の境界を利用して、ページの静的な部分（シェル）をビルド時に生成し、動的な部分をリクエスト時にサーバーで生成してストリーミングで送信します。これにより、SSG の高速な初回表示と SSR の最新データを一つのページで両立できます。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="PPR を有効にしたページで、動的データの取得が Suspense の外側にある場合、何が起こりますか？"
              options={[
                { label: '動的データが無視され、空の値が表示される' },
                { label: '自動的に Suspense が挿入されて問題なく動作する' },
                { label: 'ページ全体が動的レンダリングになり、PPR の恩恵が失われる', correct: true },
                { label: 'ビルドが失敗してデプロイできない' },
              ]}
              explanation="PPR は Suspense の境界で静的部分と動的部分を分離します。動的な処理（cookies()、headers()、キャッシュなしの fetch など）が Suspense の外側にある場合、ページ全体が動的レンダリングとなり、静的シェルの事前生成が行われません。dynamicIO を有効にすると、このケースでビルドエラーが発生し、問題を早期に検出できます。"
            />
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Partial Prerendering - Next.js Docs',
                  url: 'https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering',
                  description: 'PPR の公式ドキュメント。設定方法と仕組みの詳細',
                },
                {
                  title: 'dynamicIO - Next.js Docs',
                  url: 'https://nextjs.org/docs/app/api-reference/config/next-config-js/dynamicIO',
                  description: 'dynamicIO の設定と use cache ディレクティブのリファレンス',
                },
                {
                  title: 'Next.js 16 RC ブログ',
                  url: 'https://nextjs.org/blog/next-15-3',
                  description: 'React Compiler、Turbopack ビルドなどの最新アップデート',
                },
                {
                  title: 'Rendering - Next.js Docs',
                  url: 'https://nextjs.org/docs/app/building-your-application/rendering',
                  description: 'Next.js のレンダリング方式（SSR, SSG, ISR, PPR）の全体像',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'PPR を使うと既存の SSG や ISR のページはどうなりますか？',
                  answer: 'PPR は既存のレンダリング方式と共存できます。ppr: "incremental" を設定すると、experimental_ppr = true を指定したページだけが PPR 対象になります。SSG や ISR を使っている既存ページは影響を受けません。段階的に PPR に移行していくことが可能です。',
                },
                {
                  question: 'PPR はどのホスティングサービスでも使えますか？',
                  answer: 'PPR は Node.js サーバーで動作する Next.js のスタンドアロンモードで使用できます。Vercel では最適化されたインフラで動作しますが、セルフホスティング（Docker、AWS、GCP など）でも利用可能です。ただし、CDN でのキャッシュ設定がホスティング環境によって異なる場合があるため、静的シェルのキャッシュ設定を適切に行う必要があります。',
                },
                {
                  question: 'React Compiler を有効にすると既存コードが壊れることはありますか？',
                  answer: 'React の公式ルール（Hooks のルール、純粋なレンダリング、イミュータブルな props/state）に従っている場合は問題ありません。React Compiler はこれらのルールを前提に最適化を行います。ルール違反のコード（例: レンダリング中の副作用、ミュータブルな操作）がある場合は、コンパイラが警告を出すか最適化をスキップします。Next.js 16 ではコンパイラを無効にするオプションも用意されています。',
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
