import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function Next15Features() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 46</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Next.js 15 の新機能</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Next.js 15 では、Turbopack の安定化、非同期リクエスト API、キャッシングのデフォルト変更など、
          開発者体験とパフォーマンスの両面で大きなアップデートが行われました。
          実務で押さえておくべき主要な変更点を一つずつ確認していきましょう。
        </p>

        <WhyNowBox tags={['Next.js 15', 'Turbopack', 'async API', 'after()', 'next/form', 'next.config.ts']}>
          <p>
            Next.js 15 は App Router の成熟に伴い、開発体験の改善と API の一貫性向上に焦点を当てたリリースです。
            特にキャッシングのデフォルト変更は、これまでの Next.js 開発者が感じていた「予想外のキャッシュ」問題を解消します。
            新しいプロジェクトを始める場合はもちろん、既存プロジェクトのアップグレード時にも把握しておくべき変更が多く含まれています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: Turbopack の安定化 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Turbopack の安定化</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js 15 で、開発サーバー向けの <code className="text-sm bg-muted px-1.5 py-0.5 rounded">Turbopack</code> が
              安定版としてリリースされました。Turbopack は Rust ベースの次世代バンドラーで、webpack に比べて圧倒的な速度を実現します。
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">webpack（従来）</h3>
                <div className="space-y-2 text-sm text-foreground/80">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">&#9679;</span>
                    <span>JavaScript ベース</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">&#9679;</span>
                    <span>大規模プロジェクトで起動・HMR が遅い</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">&#9679;</span>
                    <span>豊富なプラグインエコシステム</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">&#9679;</span>
                    <span>本番ビルドにも使用可能</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                <h3 className="font-bold text-foreground mb-3">Turbopack</h3>
                <div className="space-y-2 text-sm text-foreground/80">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>Rust ベースで高速</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>開発サーバー起動が最大 76% 高速化</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>HMR（Hot Module Replacement）が最大 96% 高速化</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>インクリメンタルコンパイルで必要なモジュールだけ処理</span>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`# Turbopack で開発サーバーを起動
next dev --turbopack

# package.json に設定しておくのが便利
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start"
  }
}`}
              language="bash"
              title="Turbopack の有効化"
            />

            <InfoBox type="info" title="本番ビルドは引き続き webpack">
              <p>
                Next.js 15 時点で Turbopack が安定版となったのは開発サーバー（<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next dev</code>）のみです。
                本番ビルド（<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next build</code>）では引き続き webpack が使われます。
                Turbopack による本番ビルドのサポートは将来のリリースで予定されています。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: 非同期リクエスト API */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">非同期リクエスト API</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js 15 の最も重要な破壊的変更の一つが、リクエスト固有のデータへのアクセスが非同期になったことです。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">params</code>、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">searchParams</code>、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">cookies()</code>、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">headers()</code> はすべて Promise を返すようになりました。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">params の変更</h3>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                <h4 className="font-semibold text-red-600 dark:text-red-400 text-sm mb-2">Before（Next.js 14）</h4>
                <CodeBlock
                  code={`// app/blog/[slug]/page.tsx
type Props = {
  params: { slug: string };
};

// params を同期的に使える
export default function Page({
  params,
}: Props) {
  return <h1>{params.slug}</h1>;
}`}
                  language="tsx"
                />
              </div>
              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                <h4 className="font-semibold text-green-600 dark:text-green-400 text-sm mb-2">After（Next.js 15）</h4>
                <CodeBlock
                  code={`// app/blog/[slug]/page.tsx
type Props = {
  params: Promise<{ slug: string }>;
};

// params を await する必要がある
export default async function Page({
  params,
}: Props) {
  const { slug } = await params;
  return <h1>{slug}</h1>;
}`}
                  language="tsx"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">searchParams の変更</h3>

            <CodeBlock
              code={`// app/search/page.tsx

// Next.js 15: searchParams も Promise を返す
type Props = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q, page } = await searchParams;

  const results = await fetchSearchResults(q, Number(page) || 1);

  return (
    <div>
      <h1>「{q}」の検索結果</h1>
      {results.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}`}
              language="tsx"
              title="searchParams の非同期アクセス"
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">cookies() と headers() の変更</h3>

            <CodeBlock
              code={`// Next.js 15: cookies() と headers() も非同期に
import { cookies, headers } from 'next/headers';

export default async function DashboardPage() {
  // cookies() が Promise を返すように変更
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value ?? 'light';

  // headers() も Promise を返すように変更
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');

  return (
    <div data-theme={theme}>
      <p>User Agent: {userAgent}</p>
    </div>
  );
}

// Server Action 内でも同じ
'use server';
export async function setTheme(formData: FormData) {
  const theme = formData.get('theme') as string;
  const cookieStore = await cookies();
  cookieStore.set('theme', theme);
}`}
              language="tsx"
              title="cookies() / headers() の非同期アクセス"
            />

            <InfoBox type="warning" title="移行時の注意">
              <p>
                この変更は破壊的変更です。Next.js 14 からアップグレードする場合、すべての
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">params</code>、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">searchParams</code>、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">cookies()</code>、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">headers()</code> の使用箇所を修正する必要があります。
                Next.js は <code className="text-sm bg-muted px-1.5 py-0.5 rounded">npx @next/codemod@canary next-async-request-api .</code> という
                codemod ツールを提供しているので、大規模プロジェクトでは活用しましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション 3: キャッシングのデフォルト変更 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">キャッシングのデフォルト変更</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js 15 では、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">fetch</code> のデフォルト挙動が大きく変わりました。
              以前はデフォルトで <code className="text-sm bg-muted px-1.5 py-0.5 rounded">force-cache</code>（キャッシュ優先）でしたが、
              Next.js 15 からは <code className="text-sm bg-muted px-1.5 py-0.5 rounded">no-store</code>（キャッシュなし）がデフォルトになりました。
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                <h4 className="font-semibold text-red-600 dark:text-red-400 text-sm mb-2">Next.js 14 のデフォルト</h4>
                <CodeBlock
                  code={`// デフォルトで force-cache
// 一度取得したデータがキャッシュされる
const data = await fetch(
  'https://api.example.com/data'
);
// 上記は以下と同じ:
const data = await fetch(
  'https://api.example.com/data',
  { cache: 'force-cache' }
);`}
                  language="tsx"
                />
              </div>
              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                <h4 className="font-semibold text-green-600 dark:text-green-400 text-sm mb-2">Next.js 15 のデフォルト</h4>
                <CodeBlock
                  code={`// デフォルトで no-store
// 毎回最新のデータを取得する
const data = await fetch(
  'https://api.example.com/data'
);
// 上記は以下と同じ:
const data = await fetch(
  'https://api.example.com/data',
  { cache: 'no-store' }
);`}
                  language="tsx"
                />
              </div>
            </div>

            <CodeBlock
              code={`// キャッシュしたい場合は明示的に指定する

// パターン 1: 永続キャッシュ
const staticData = await fetch('https://api.example.com/config', {
  cache: 'force-cache',
});

// パターン 2: 時間ベースの再検証（ISR）
const revalidatedData = await fetch('https://api.example.com/posts', {
  next: { revalidate: 3600 }, // 1時間ごとに再検証
});

// パターン 3: タグベースの再検証
const taggedData = await fetch('https://api.example.com/products', {
  next: { tags: ['products'] }, // revalidateTag('products') で無効化
});

// パターン 4: ルートセグメント設定でページ全体を制御
// app/blog/page.tsx
export const dynamic = 'force-static';  // ページ全体を静的に
export const revalidate = 3600;          // 1時間ごとに再生成`}
              language="tsx"
              title="明示的なキャッシュ設定"
              showLineNumbers
            />

            <InfoBox type="success" title="なぜデフォルトが変わったのか">
              <p>
                Next.js 14 の「デフォルトでキャッシュ」は、多くの開発者にとって予想外の挙動を引き起こしていました。
                データが更新されているのに古い値が表示される問題に悩む声が多く、
                Next.js チームは「キャッシュはオプトイン（明示的に指定）すべき」という方針に変更しました。
                これにより、初心者にとっての驚きが減り、意図的なキャッシュ設計がしやすくなります。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: after() API */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">after() API</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">after()</code> は、レスポンスの送信が完了した後に
              追加の処理を実行するための新しい API です。ユーザーへのレスポンスをブロックせずに、
              ログの送信、分析イベントの記録、キャッシュの更新などのバックグラウンド処理を行えます。
            </p>

            <CodeBlock
              code={`import { after } from 'next/server';
import { log } from '@/lib/logger';
import { analytics } from '@/lib/analytics';

export default async function DashboardPage() {
  const data = await fetchDashboardData();

  // レスポンス送信後にバックグラウンドで実行される
  after(async () => {
    // ページ閲覧のログを記録
    await log('dashboard_viewed', {
      timestamp: new Date().toISOString(),
    });

    // 分析イベントを送信
    await analytics.track('page_view', {
      page: '/dashboard',
    });
  });

  // この JSX はすぐにユーザーに返される
  return (
    <div>
      <h1>ダッシュボード</h1>
      <DashboardContent data={data} />
    </div>
  );
}`}
              language="tsx"
              title="after() の基本的な使い方"
              showLineNumbers
            />

            <CodeBlock
              code={`// Server Action でも使える
'use server';

import { after } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function createOrder(formData: FormData) {
  const order = await db.order.create({
    data: {
      product: formData.get('product') as string,
      quantity: Number(formData.get('quantity')),
    },
  });

  revalidatePath('/orders');

  // レスポンス後にメール送信や在庫更新を非同期で処理
  after(async () => {
    // 注文確認メールの送信
    await sendOrderConfirmationEmail(order);

    // 在庫の更新
    await updateInventory(order.product, order.quantity);

    // 外部サービスへの通知
    await notifyWarehouse(order);
  });

  return { success: true, orderId: order.id };
}

// Middleware でも使用可能
// middleware.ts
import { NextResponse } from 'next/server';
import { after } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  after(async () => {
    // アクセスログの記録
    await logAccess({
      path: request.nextUrl.pathname,
      method: request.method,
      ip: request.ip,
    });
  });

  return response;
}`}
              language="tsx"
              title="Server Action / Middleware での after()"
            />

            <InfoBox type="info" title="after() vs waitUntil()">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">after()</code> は Vercel の
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">waitUntil()</code> と似ていますが、
                Next.js のネイティブ API として提供されるため、セルフホスティング環境でも使えるのが利点です。
                Vercel にデプロイする場合は内部的に <code className="text-sm bg-muted px-1.5 py-0.5 rounded">waitUntil()</code> が使われます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: next/form コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">next/form コンポーネント</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js 15 で新たに追加された <code className="text-sm bg-muted px-1.5 py-0.5 rounded">{'<Form>'}</code> コンポーネントは、
              HTML の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">{'<form>'}</code> を拡張したものです。
              遷移先のルートをプリフェッチし、クライアントサイドナビゲーションを行います。
              検索フォームなどの GET フォームで特に効果的です。
            </p>

            <CodeBlock
              code={`import Form from 'next/form';

export default function SearchForm() {
  return (
    // action に URL パスを指定すると、GET リクエストで遷移
    <Form action="/search" className="flex gap-2">
      <input
        name="q"
        type="text"
        placeholder="検索キーワード..."
        className="border rounded-lg px-3 py-2 flex-1"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        検索
      </button>
    </Form>
    // 送信すると /search?q=入力値 にクライアントサイドで遷移
    // 遷移先の loading.tsx や layout が即座に表示される
  );
}

// next/form の3つのメリット:
// 1. プリフェッチ: フォームが表示された時点で遷移先をプリフェッチ
// 2. クライアントサイドナビゲーション: フルリロードではなく SPA 遷移
// 3. プログレッシブエンハンスメント: JS 無効でも動作`}
              language="tsx"
              title="next/form を使った検索フォーム"
              showLineNumbers
            />

            <CodeBlock
              code={`// 検索結果ページ側の実装
// app/search/page.tsx
type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  if (!q) {
    return <p>検索キーワードを入力してください</p>;
  }

  const results = await searchProducts(q);

  return (
    <div>
      <h1>「{q}」の検索結果: {results.length}件</h1>
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name} - ¥{item.price}</li>
        ))}
      </ul>
    </div>
  );
}

// app/search/loading.tsx
// next/form によるクライアントサイド遷移時に表示される
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}`}
              language="tsx"
              title="検索結果ページと loading.tsx"
            />
          </section>

          {/* セクション 6: next.config.ts サポート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">next.config.ts サポート</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js 15 から、設定ファイルを TypeScript で記述できるようになりました。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">next.config.ts</code> を使うと、
              型チェックと IDE の補完が効いた状態で設定を書けます。
            </p>

            <CodeBlock
              code={`// next.config.ts（TypeScript）
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 画像の最適化設定
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.example.com',
        pathname: '/uploads/**',
      },
    ],
  },

  // 実験的機能の有効化
  experimental: {
    ppr: true,            // Partial Pre-rendering
    dynamicIO: true,      // Dynamic IO
    after: true,          // after() API（15.1 以降はデフォルトで有効）
  },

  // リダイレクト設定も型安全に
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },

  // ヘッダー設定
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};

export default nextConfig;`}
              language="typescript"
              title="next.config.ts の例"
              showLineNumbers
            />

            <InfoBox type="success" title="移行は簡単">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">next.config.js</code> から
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">next.config.ts</code> への移行は、
                ファイル名の変更と <code className="text-sm bg-muted px-1.5 py-0.5 rounded">import type {'{ NextConfig }'} from 'next'</code> の
                追加だけです。CommonJS の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">module.exports</code> を
                ESM の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">export default</code> に変更します。
              </p>
            </InfoBox>
          </section>

          {/* セクション 7: forbidden() / unauthorized() ヘルパー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">forbidden() / unauthorized() ヘルパー</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js 15 では、HTTP の 403（Forbidden）と 401（Unauthorized）レスポンスを簡単に返すための
              新しいヘルパー関数が追加されました。<code className="text-sm bg-muted px-1.5 py-0.5 rounded">notFound()</code> の
              認証・認可版と考えるとわかりやすいでしょう。
            </p>

            <CodeBlock
              code={`// app/admin/page.tsx
import { forbidden } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function AdminPage() {
  const session = await auth();

  // 認証されていない場合: 401 unauthorized.tsx を表示
  if (!session) {
    unauthorized();
  }

  // 認可されていない場合: 403 forbidden.tsx を表示
  if (session.user.role !== 'admin') {
    forbidden();
  }

  return (
    <div>
      <h1>管理者ダッシュボード</h1>
      <AdminDashboard />
    </div>
  );
}`}
              language="tsx"
              title="forbidden() / unauthorized() の基本的な使い方"
            />

            <CodeBlock
              code={`// app/forbidden.tsx - 403 エラーページ
// notFound() に対する not-found.tsx と同じ仕組み
export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">403</h1>
      <p className="text-xl text-gray-600 mb-8">
        このページにアクセスする権限がありません
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        ホームに戻る
      </a>
    </div>
  );
}

// app/unauthorized.tsx - 401 エラーページ
export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">401</h1>
      <p className="text-xl text-gray-600 mb-8">
        ログインが必要です
      </p>
      <a
        href="/login"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        ログインページへ
      </a>
    </div>
  );
}

// next.config.ts で experimental.authInterrupts を有効化
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true, // forbidden() / unauthorized() を有効化
  },
};

export default nextConfig;`}
              language="tsx"
              title="カスタムエラーページと設定"
              showLineNumbers
            />

            <InfoBox type="info" title="not-found.tsx と同じ階層構造">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">forbidden.tsx</code> と
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">unauthorized.tsx</code> は、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">not-found.tsx</code> と同じように
                各ルートセグメントに配置できます。最も近い親セグメントのファイルが使われるため、
                セクションごとに異なるエラー画面を表示できます。
              </p>
            </InfoBox>
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Next.js 15 の変更点まとめ</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-foreground font-semibold">機能</th>
                    <th className="text-left py-3 px-4 text-foreground font-semibold">変更内容</th>
                    <th className="text-left py-3 px-4 text-foreground font-semibold">影響</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">Turbopack</td>
                    <td className="py-3 px-4">開発サーバーで安定版に</td>
                    <td className="py-3 px-4 text-green-600 dark:text-green-400">性能向上</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">リクエスト API</td>
                    <td className="py-3 px-4">params 等が非同期に</td>
                    <td className="py-3 px-4 text-red-600 dark:text-red-400">破壊的変更</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">キャッシュ</td>
                    <td className="py-3 px-4">デフォルトが no-store に</td>
                    <td className="py-3 px-4 text-red-600 dark:text-red-400">破壊的変更</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">after()</td>
                    <td className="py-3 px-4">レスポンス後の処理</td>
                    <td className="py-3 px-4 text-green-600 dark:text-green-400">新機能</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">next/form</td>
                    <td className="py-3 px-4">プリフェッチ付きフォーム</td>
                    <td className="py-3 px-4 text-green-600 dark:text-green-400">新機能</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">next.config.ts</td>
                    <td className="py-3 px-4">TypeScript 設定ファイル</td>
                    <td className="py-3 px-4 text-green-600 dark:text-green-400">新機能</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">forbidden/unauthorized</td>
                    <td className="py-3 px-4">403/401 ヘルパー</td>
                    <td className="py-3 px-4 text-green-600 dark:text-green-400">新機能</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Next.js 15 で fetch() のデフォルトのキャッシュ挙動はどのように変更されましたか？"
              options={[
                { label: 'force-cache から no-store に変更された（毎回最新データを取得）', correct: true },
                { label: 'no-store から force-cache に変更された（キャッシュ優先）' },
                { label: 'stale-while-revalidate がデフォルトになった' },
                { label: 'キャッシュの挙動は変更されていない' },
              ]}
              explanation="Next.js 15 では、開発者の混乱を避けるために fetch のデフォルトが force-cache（キャッシュ優先）から no-store（毎回取得）に変更されました。キャッシュが必要な場合は、明示的に cache: 'force-cache' や next: { revalidate: 秒数 } を指定します。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Next.js 15 の after() API の役割として正しいものはどれですか？"
              options={[
                { label: 'コンポーネントのレンダリング後に DOM を操作する（useEffect の代替）' },
                { label: 'ページ遷移後にアニメーションを実行する' },
                { label: 'レスポンスの送信後にバックグラウンドでサーバー処理を実行する', correct: true },
                { label: 'ビルド後に静的ファイルを生成する' },
              ]}
              explanation="after() は、ユーザーへのレスポンス送信が完了した後にサーバー上でバックグラウンド処理を実行するための API です。ログ記録、分析イベントの送信、キャッシュの更新など、レスポンスをブロックしない処理に適しています。useEffect とは異なり、サーバーサイドで動作します。"
            />
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Next.js 15 リリースブログ',
                  url: 'https://nextjs.org/blog/next-15',
                  description: 'Next.js 15 の全変更点の公式発表',
                },
                {
                  title: 'Next.js 15 アップグレードガイド',
                  url: 'https://nextjs.org/docs/app/building-your-application/upgrading/version-15',
                  description: 'Next.js 14 からのアップグレード手順と破壊的変更の一覧',
                },
                {
                  title: 'after - Next.js Docs',
                  url: 'https://nextjs.org/docs/app/api-reference/functions/after',
                  description: 'after() API の詳細なリファレンス',
                },
                {
                  title: 'Turbopack - Next.js Docs',
                  url: 'https://nextjs.org/docs/architecture/turbopack',
                  description: 'Turbopack のアーキテクチャと設定方法',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'Next.js 14 から 15 へのアップグレードはどのくらい大変ですか？',
                  answer: '主な作業は非同期リクエスト API への対応です。params、searchParams、cookies()、headers() の使用箇所を await する形に書き換える必要があります。Next.js 公式の codemod ツール（npx @next/codemod@canary next-async-request-api .）を使えば、多くの変換を自動化できます。キャッシングのデフォルト変更については、既存コードが明示的に cache オプションを指定していれば影響はありません。',
                },
                {
                  question: 'Turbopack は webpack のプラグインと互換性がありますか？',
                  answer: 'いいえ、Turbopack は webpack とは異なるアーキテクチャのため、webpack プラグインとの直接的な互換性はありません。ただし、Next.js が標準で提供する機能（CSS Modules、PostCSS、画像最適化など）はすべてサポートされています。カスタム webpack 設定に依存している場合は、開発時に Turbopack を使わず webpack を使い続けることもできます（next dev で --turbopack フラグを省略するだけ）。',
                },
                {
                  question: 'after() API はセルフホスティングでも使えますか？',
                  answer: 'はい、after() は Next.js のネイティブ API なので、Node.js サーバーでのセルフホスティングでも動作します。Vercel にデプロイする場合は内部的に waitUntil() が活用されますが、セルフホスティングでは Node.js のイベントループを利用してレスポンス後に処理を継続します。Docker コンテナやカスタムサーバーでも問題なく使えます。',
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
