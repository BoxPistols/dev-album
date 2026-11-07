import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';
import PageSources from '@/components/PageSources';

export default function Next15Features() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 48</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Next.js 15 / 16の新機能</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Next.js 15では、開発サーバー向けTurbopackの安定化、非同期リクエストAPI、キャッシングのデフォルト変更が入りました。
          Next.js 16では、Turbopackが既定のバンドラーになり、middlewareがproxyへ改称され、Cache Componentsが導入されています。
          実務で押さえておくべき主要な変更点を、版ごとに説明します。
        </p>

        <WhyNowBox tags={['Next.js 15', 'Next.js 16', 'Turbopack', 'async API', 'after()', 'next/form', 'next.config.ts', 'proxy', 'cacheComponents', 'React Compiler']}>
          <p>
            Next.js 15 は App Router の成熟に伴い、開発体験の改善と API の一貫性向上に焦点を当てたリリースです。
            特にキャッシングのデフォルト変更は、これまでの Next.js 開発者が感じていた「予想外のキャッシュ」問題を解消します。
            新しいプロジェクトを始める場合はもちろん、既存プロジェクトのアップグレード時にも把握しておくべき変更が多く含まれています。
          </p>
          <p className="mt-3">
            2026-11-07時点のnpmのlatestは16.4.5で、新規プロジェクトは16系で始まります。
            このページは前半が15、後半の「Next.js 16の変更点」が16の内容です。15の節に出てくるフラグのうち、16で不要になったものはその場で注記しています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: Turbopack の安定化 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Turbopackの安定化（Next.js 15）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js 15 で、開発サーバー向けの <code className="text-sm bg-muted px-1.5 py-0.5 rounded">Turbopack</code> が
              安定版としてリリースされました。Turbopack は Rust ベースのバンドラーで、webpack より高速に動作します。
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
                    <span>ローカルサーバー起動が最大 76.7% 高速化</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>Fast Refresh によるコード更新が最大 96.3% 高速化</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>インクリメンタルコンパイルで必要なモジュールだけ処理</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  高速化の数値は公式ブログが示す vercel.com（大規模な Next.js アプリ）での計測値。一般的な値ではなく、プロジェクトの規模や構成で変わる。
                </p>
              </div>
            </div>

            <CodeBlock
              code={`# Next.js 15の場合。16では既定なのでフラグは要らない
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
              title="Next.js 15でのTurbopackの有効化"
            />

            <InfoBox type="info" title="本番ビルドの対応はNext.js 16で完了した">
              <p>
                Next.js 15.0で安定版になったのは開発サーバー（<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next dev</code>）だけで、本番ビルド（<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next build</code>）はwebpackのままでした。
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">next build</code>のTurbopack対応は15.3で実験的サポート、15.5でベータと進み、16.0で安定版になって既定のバンドラーに変わりました。
                現在の挙動は、このページ後半の「Next.js 16の変更点」にまとめています。
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
              Next.js 14 まではデフォルトが <code className="text-sm bg-muted px-1.5 py-0.5 rounded">force-cache</code>（キャッシュ優先）でしたが、
              Next.js 15 からはデフォルトではキャッシュされなくなりました。
              キャッシュしたい fetch には <code className="text-sm bg-muted px-1.5 py-0.5 rounded">cache: 'force-cache'</code> を明示します。
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
                  code={`// デフォルトではキャッシュされない
const data = await fetch(
  'https://api.example.com/data'
);
// キャッシュしたい場合は明示する:
const cached = await fetch(
  'https://api.example.com/data',
  { cache: 'force-cache' }
);`}
                  language="tsx"
                />
              </div>
            </div>

            <p className="text-foreground/80 mb-6 leading-relaxed">
              このデフォルトを公式ドキュメントは <code className="text-sm bg-muted px-1.5 py-0.5 rounded">auto no cache</code> と呼び、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">no-store</code> とは挙動が異なります。
              デフォルトのままなら、Request-time API を使わないルートでは <code className="text-sm bg-muted px-1.5 py-0.5 rounded">next build</code> 時に一度だけ取得して静的にプリレンダされます。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">no-store</code> を明示した場合は、そのルートでも毎リクエスト取得します。
            </p>

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
  next: { tags: ['products'] }, // revalidateTag('products', 'max')で無効化（16で第2引数が必須）
});

// パターン 4: ルートセグメント設定でページ全体を制御
// cacheComponentsが有効なプロジェクトではビルドエラーになる（Next.js 16の節を参照）
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
// 16ではmiddlewareは非推奨で、proxy.tsへ改称された
// middleware.ts
import { NextResponse } from 'next/server';
import { after } from 'next/server';
// request.ip は Next.js 15 で削除された。
// Vercel では @vercel/functions の ipAddress() を使う
import { ipAddress } from '@vercel/functions';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  after(async () => {
    // アクセスログの記録
    await logAccess({
      path: request.nextUrl.pathname,
      method: request.method,
      ip: ipAddress(request),
    });
  });

  return response;
}`}
              language="tsx"
              title="Server Action / Middleware での after()"
            />

            <InfoBox type="warning" title="request.ip は Next.js 15 で削除された">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">request.ip</code> は Next.js 15 で削除されているため、
                そのまま書くと TypeScript ではプロパティ不在の型エラーになります。
                Vercel にデプロイする場合は <code className="text-sm bg-muted px-1.5 py-0.5 rounded">@vercel/functions</code> の
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">ipAddress(request)</code> を使います。
                それ以外のホスティングでは <code className="text-sm bg-muted px-1.5 py-0.5 rounded">x-forwarded-for</code> などのヘッダを、
                ホスティング側の仕様に合わせて読みます。
                既存コードの一括変換には <code className="text-sm bg-muted px-1.5 py-0.5 rounded">npx @next/codemod@latest next-request-geo-ip .</code> が使えます。
              </p>
            </InfoBox>

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

  // Next.js 15の実験的機能。ppr / dynamicIOは16で削除され、cacheComponentsへ統合された
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

          {/* Next.js 16の変更点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Next.js 16の変更点</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js 16は2025年10月21日に公開されました。2026年10月6日公開の16.4では、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">create-next-app</code>が生成する設定も変わっています。
              ここでは実務への影響が大きい5点を扱います。Cache ComponentsとReact Compilerの使い方は次のページで詳しく扱います。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">Turbopackの既定化とビルド対応</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js 16で、Turbopackは<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next dev</code>と<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next build</code>の両方で既定のバンドラーになりました。
              15まで必要だった<code className="text-sm bg-muted px-1.5 py-0.5 rounded">--turbopack</code>フラグは要りません。webpackを使い続けるときは<code className="text-sm bg-muted px-1.5 py-0.5 rounded">--webpack</code>を付けます。
              公式ブログは本番ビルドが2〜5倍、Fast Refreshが最大10倍速いとしていますが、これは公式の提示値で、手元の速度はプロジェクトの規模や構成で変わります。
            </p>

            <CodeBlock
              code={`// package.json（Next.js 16）
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}

// webpackを使い続ける場合
{
  "scripts": {
    "dev": "next dev --webpack",
    "build": "next build --webpack",
    "start": "next start"
  }
}`}
              language="json"
              title="バンドラーの指定"
            />

            <InfoBox type="warning" title="webpackの設定があるとnext buildは失敗する">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">next.config</code>にカスタムの<code className="text-sm bg-muted px-1.5 py-0.5 rounded">webpack</code>設定があるプロジェクトで<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next build</code>を実行すると、誤設定を防ぐためにビルドが失敗します。
                対処は3つです。設定を無視してTurbopackで進める<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next build --turbopack</code>、
                設定をTurbopack向けのオプションへ移す方法、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">--webpack</code>でwebpackを使い続ける方法です。
                自分で設定していなくても、プラグインが<code className="text-sm bg-muted px-1.5 py-0.5 rounded">webpack</code>オプションを足していることがあります。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">middlewareからproxyへ</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">middleware</code>のファイル規約は非推奨になり、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">proxy</code>へ改称されました。ファイル名と関数名の両方を変えます。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">proxy</code>のランタイムは<code className="text-sm bg-muted px-1.5 py-0.5 rounded">nodejs</code>で、変更できません。<code className="text-sm bg-muted px-1.5 py-0.5 rounded">edge</code>ランタイムを使い続けるときは<code className="text-sm bg-muted px-1.5 py-0.5 rounded">middleware</code>のまま残します。
            </p>

            <CodeBlock
              code={`# ファイル名と関数名をまとめて書き換える
npx @next/codemod@canary middleware-to-proxy .

# 手で変える場合
mv middleware.ts proxy.ts

// proxy.ts
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url));
}`}
              language="bash"
              title="middlewareからproxyへの移行"
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">cacheComponents</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Cache Componentsは<code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use cache'</code>ディレクティブを中心に、ページ・コンポーネント・関数の単位でキャッシュを指定する仕組みです。
              データ取得は既定でリクエスト時に実行され、キャッシュするものを明示します。
              Next.js 16で<code className="text-sm bg-muted px-1.5 py-0.5 rounded">experimental.ppr</code>、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">experimental.dynamicIO</code>、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">experimental.useCache</code>は削除され、
              トップレベルの<code className="text-sm bg-muted px-1.5 py-0.5 rounded">cacheComponents</code>に統合されました。公式ブログは、Next.js 17でこのモデルを既定にするとしています。
            </p>

            <CodeBlock
              code={`// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  // 16.3以降。公式は一緒に明示するよう案内している。未設定だと警告が出る
  partialPrefetching: true,
};

export default nextConfig;`}
              language="typescript"
              title="Cache Componentsの有効化"
            />

            <InfoBox type="warning" title="新規プロジェクトでは最初から有効になっている">
              <p>
                仕様では、Next.js 16の公開時点でCache Componentsはフラグを書いて有効にする機能でした。
                実測では、2026-11-07に<code className="text-sm bg-muted px-1.5 py-0.5 rounded">create-next-app</code> 16.4.5で作ったプロジェクトの<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next.config.ts</code>に<code className="text-sm bg-muted px-1.5 py-0.5 rounded">cacheComponents: true</code>が入っていました。
                理由は、16.4から新規アプリで既定で有効になったためです。
                このとき<code className="text-sm bg-muted px-1.5 py-0.5 rounded">export const revalidate</code>や<code className="text-sm bg-muted px-1.5 py-0.5 rounded">export const dynamic</code>はビルドエラーになり、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">Suspense</code>の外でキャッシュしない<code className="text-sm bg-muted px-1.5 py-0.5 rounded">fetch</code>を呼ぶページも、プリレンダーのエラーでビルドが止まります。
                このページの前半にあるルートセグメント設定の例は、Cache Componentsを無効にしたプロジェクト向けです。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">React Compiler</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">reactCompiler</code>は<code className="text-sm bg-muted px-1.5 py-0.5 rounded">experimental</code>から昇格し、stableになりました。既定では無効です。
              有効にするには<code className="text-sm bg-muted px-1.5 py-0.5 rounded">babel-plugin-react-compiler</code>を入れて、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">reactCompiler: true</code>を書きます。
              Babelを使うため、開発時とビルド時のコンパイル時間は増えます。
            </p>

            <CodeBlock
              code={`# プラグインを入れる
npm install -D babel-plugin-react-compiler

// next.config.ts
const nextConfig: NextConfig = {
  reactCompiler: true,
};`}
              language="bash"
              title="React Compilerの有効化"
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">Node.jsの要件</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js 16はNode.js 18をサポートしません。動作環境の下限は次のとおりです。
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-foreground font-semibold">項目</th>
                    <th className="text-left py-3 px-4 text-foreground font-semibold">Next.js 16の要件</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">Node.js</td>
                    <td className="py-3 px-4">20.9.0以上</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">TypeScript</td>
                    <td className="py-3 px-4">5.1.0以上</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">ブラウザ</td>
                    <td className="py-3 px-4">Chrome 111+、Edge 111+、Firefox 111+、Safari 16.4+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-foreground/80 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">params</code>や<code className="text-sm bg-muted px-1.5 py-0.5 rounded">cookies()</code>の同期アクセスも16で完全に削除され、15の移行期間に残っていた書き方は動かなくなります。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">revalidateTag()</code>は第2引数に<code className="text-sm bg-muted px-1.5 py-0.5 rounded">cacheLife</code>プロファイルが必要になりました。
            </p>
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
                    <td className="py-3 px-4">デフォルトでキャッシュしない</td>
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

            <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Next.js 16の変更点まとめ</h2>
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
                    <td className="py-3 px-4">devとbuildの既定に</td>
                    <td className="py-3 px-4 text-red-600 dark:text-red-400">破壊的変更</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">proxy</td>
                    <td className="py-3 px-4">middlewareから改称</td>
                    <td className="py-3 px-4 text-red-600 dark:text-red-400">非推奨化</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">cacheComponents</td>
                    <td className="py-3 px-4">ppr / dynamicIO / useCacheを統合。16.4から新規アプリで有効</td>
                    <td className="py-3 px-4">新機能</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">React Compiler</td>
                    <td className="py-3 px-4">stableに昇格。既定は無効</td>
                    <td className="py-3 px-4">新機能</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Node.js</td>
                    <td className="py-3 px-4">20.9.0以上が必須</td>
                    <td className="py-3 px-4 text-red-600 dark:text-red-400">破壊的変更</td>
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
                { label: 'force-cache がデフォルトではなくなり、デフォルトではキャッシュされなくなった', correct: true },
                { label: 'デフォルトが force-cache に変更された（キャッシュ優先）' },
                { label: 'stale-while-revalidate がデフォルトになった' },
                { label: 'キャッシュの挙動は変更されていない' },
              ]}
              explanation="Next.js 15 では、開発者の混乱を避けるために fetch のデフォルトが force-cache（キャッシュ優先）からキャッシュしない挙動に変わりました。公式ドキュメントはこのデフォルトを auto no cache と呼び、no-store の明示とは区別しています。キャッシュが必要な場合は、明示的に cache: 'force-cache' や next: { revalidate: 秒数 } を指定します。"
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

          {/* Quiz 3 */}
          <section>
            <Quiz
              question="Next.js 16でnext buildを実行したとき、既定で使われるバンドラーはどれですか？"
              options={[
                { label: 'webpack' },
                { label: 'Turbopack', correct: true },
                { label: 'Rspack' },
                { label: 'Vite' },
              ]}
              explanation="Next.js 16でTurbopackはnext devとnext buildの両方で既定になりました。webpackを使い続けるときは--webpackを付けます。Next.js 15.0で安定版になったのは開発サーバーだけで、本番ビルドは16.0で安定版になりました。"
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
                  url: 'https://nextjs.org/docs/app/guides/upgrading/version-15',
                  description: 'Next.js 14 からのアップグレード手順と破壊的変更の一覧',
                },
                {
                  title: 'Next.js 16リリースブログ',
                  url: 'https://nextjs.org/blog/next-16',
                  description: 'Next.js 16の全変更点の公式発表',
                },
                {
                  title: 'Next.js 16.4リリースブログ',
                  url: 'https://nextjs.org/blog/next-16-4',
                  description: '新規アプリでCache Componentsが既定で有効になった版の公式発表',
                },
                {
                  title: 'Next.js 16アップグレードガイド',
                  url: 'https://nextjs.org/docs/app/guides/upgrading/version-16',
                  description: 'Next.js 15からのアップグレード手順と破壊的変更の一覧',
                },
                {
                  title: 'after - Next.js Docs',
                  url: 'https://nextjs.org/docs/app/api-reference/functions/after',
                  description: 'after() API の詳細なリファレンス',
                },
                {
                  title: 'Turbopack - Next.js Docs',
                  url: 'https://nextjs.org/docs/app/api-reference/turbopack',
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
                  answer: 'いいえ、Turbopackはwebpackプラグインに対応していません。webpackローダーには対応しています。CSS Modules・PostCSS・静的アセットのインポートといった主要機能は設定なしで動作します。一方でApp Routerのroot layout自動生成や、CSS Modulesの一部レガシー機能（単独の:local / :global、@valueルールなど）、sassOptions.functions、Yarn PnPは未対応と公式に明記されています。カスタムwebpack設定に依存している場合は、Next.js 16ではnext devとnext buildに--webpackを付けてwebpackを使い続けられます。',
                },
                {
                  question: 'Next.js 15から16へのアップグレードはどう進めますか？',
                  answer: 'npx @next/codemod@canary upgrade latestを実行すると、turbopack設定の移動、next lintからESLint CLIへの移行、middlewareからproxyへの移行などを自動で処理します。このcodemodはすべての移行を実行するわけではありません。同期のparamsやcookies()が残っているときは、npx @next/codemod@canary next-async-request-api .も実行します。',
                },
                {
                  question: 'after() API はセルフホスティングでも使えますか？',
                  answer: 'はい、after() は Next.js のネイティブ API なので、Node.js サーバーでのセルフホスティングでも動作します。Vercel にデプロイする場合は内部的に waitUntil() が活用されますが、セルフホスティングでは Node.js のイベントループを利用してレスポンス後に処理を継続します。Docker コンテナやカスタムサーバーでも問題なく使えます。',
                },
              ]}
            />
          </section>

          <section>
            <PageSources path="/react/nextjs-advanced/next15-features" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
