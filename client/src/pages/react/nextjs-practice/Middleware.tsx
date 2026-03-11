import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function Middleware() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 41</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">ミドルウェアと認証</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Next.js のミドルウェアを使って、リクエストが処理される前にロジックを実行する方法を学びます。
          認証チェック、リダイレクト、ヘッダー操作など、実務で必須のパターンを理解しましょう。
        </p>

        <WhyNowBox tags={['middleware.ts', '認証', 'リダイレクト', 'NextResponse', 'matcher']}>
          <p>
            ミドルウェアは、ユーザーのリクエストがページに到達する前に実行される「門番」のような機能です。
            ログインしていないユーザーをログインページに誘導したり、特定の条件でリダイレクトしたり、
            リクエストヘッダーを書き換えたりできます。本番アプリでは必ず使うことになる重要な機能です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: ミドルウェアの基本 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ミドルウェアの基本</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ミドルウェアは、プロジェクトのルートに
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">middleware.ts</code> ファイルを配置して定義します。
              すべてのリクエストに対して実行され、レスポンスを返す前に処理を挟むことができます。
            </p>

            <CodeBlock
              code={`// middleware.ts（プロジェクトのルート or src/ 直下に配置）
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // リクエストの情報を確認
  console.log('リクエスト URL:', request.url);
  console.log('メソッド:', request.method);
  console.log('パス:', request.nextUrl.pathname);

  // そのまま次の処理に進む
  return NextResponse.next();
}

// どのパスでミドルウェアを実行するか指定
export const config = {
  matcher: [
    // 静的ファイルと _next を除外するパターン
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};`}
              language="tsx"
              title="middleware.ts の基本構造"
            />

            <CodeBlock
              code={`// ファイル配置
my-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── middleware.ts    ← ここ（src を使う場合）
├── middleware.ts         ← または ここ（src を使わない場合）
├── next.config.ts
└── package.json

// 注意: middleware.ts はプロジェクト内に1つだけ
// app/ ディレクトリの中ではなく、その上の階層に配置する`}
              language="plaintext"
              title="middleware.ts の配置場所"
            />

            <InfoBox type="warning" title="ミドルウェアの実行環境">
              <p>
                ミドルウェアは Edge Runtime で実行されます。
                Node.js のすべての API が使えるわけではありません。
                ファイルシステムアクセスや一部の Node.js モジュールは使用できないため注意してください。
                ただし、Web 標準の API（fetch、Response、URL など）は使用可能です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: matcher の設定 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">matcher の設定</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">config.matcher</code> を使って、
              ミドルウェアを実行するパスを絞り込みます。すべてのリクエストに実行するとパフォーマンスに影響するため、
              必要なパスだけに限定しましょう。
            </p>

            <CodeBlock
              code={`// パターン 1: 特定のパスだけに適用
export const config = {
  matcher: '/dashboard/:path*',
};

// パターン 2: 複数のパスに適用
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/api/:path*'],
};

// パターン 3: 正規表現で細かく制御
export const config = {
  matcher: [
    // /api、/_next/static、/_next/image、favicon.ico 以外のすべてに適用
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

// パターン 4: middleware 内で条件分岐（matcher を使わない場合）
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 静的ファイルをスキップ
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // それ以外の処理
  // ...
}`}
              language="tsx"
              title="matcher のパターン"
            />

            <InfoBox type="info" title=":path* の意味">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">/dashboard/:path*</code> は
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">/dashboard</code> とそのすべてのサブパス
                （/dashboard/settings、/dashboard/users/123 など）にマッチします。
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">*</code> は0個以上のパスセグメントにマッチします。
              </p>
            </InfoBox>
          </section>

          {/* セクション 3: リダイレクト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">リダイレクトとリライト</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ミドルウェアの代表的な用途として、条件に応じたリダイレクトとリライトがあります。
            </p>

            <CodeBlock
              code={`import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // リダイレクト: URL が変わる（ブラウザのアドレスバーも変わる）
  // 古い URL から新しい URL へ
  if (pathname === '/old-blog') {
    return NextResponse.redirect(new URL('/blog', request.url));
  }

  // 条件付きリダイレクト
  if (pathname.startsWith('/legacy/')) {
    const newPath = pathname.replace('/legacy/', '/new/');
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // リライト: URL はそのまま、内部的に別のページを表示
  // /blog/hello → 実際は /posts/hello のコンテンツを表示
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '');
    return NextResponse.rewrite(
      new URL(\`/posts/\${slug}\`, request.url)
    );
  }

  // 地域ベースのリダイレクト
  const country = request.geo?.country || 'JP';
  if (pathname === '/' && country === 'US') {
    return NextResponse.rewrite(new URL('/en', request.url));
  }

  return NextResponse.next();
}`}
              language="tsx"
              title="リダイレクトとリライト"
            />

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">リダイレクト（redirect）</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  ブラウザのアドレスバーの URL が変わります。
                  ユーザーが古い URL にアクセスしたとき、新しい URL に案内する場合に使います。
                  SEO 的にも 301/302 リダイレクトとして正しく処理されます。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">リライト（rewrite）</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  アドレスバーの URL は変わらず、内部的に別のページのコンテンツを表示します。
                  A/B テストやプロキシ、多言語対応などに使います。
                  ユーザーには URL の変化が見えません。
                </p>
              </div>
            </div>
          </section>

          {/* セクション 4: 認証パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">認証パターン</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ミドルウェアの最も重要な用途の一つが認証チェックです。
              ログインしていないユーザーを保護されたページからリダイレクトする実装を見てみましょう。
            </p>

            <CodeBlock
              code={`// middleware.ts - JWT トークンベースの認証
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 保護するパスのリスト
const protectedPaths = ['/dashboard', '/settings', '/profile'];

// 認証不要のパス（ログインページなど）
const authPaths = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cookie からセッショントークンを取得
  const token = request.cookies.get('session-token')?.value;
  const isAuthenticated = !!token;

  // 保護されたページへのアクセス
  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  if (isProtectedPath && !isAuthenticated) {
    // ログインページにリダイレクト（元のURLを保存）
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ログイン済みユーザーがログインページにアクセス
  const isAuthPath = authPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  if (isAuthPath && isAuthenticated) {
    // ダッシュボードにリダイレクト
    return NextResponse.redirect(
      new URL('/dashboard', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/profile/:path*',
    '/login',
    '/register',
    '/forgot-password',
  ],
};`}
              language="tsx"
              title="認証ミドルウェアの実装"
              showLineNumbers
            />

            <CodeBlock
              code={`// NextAuth.js (Auth.js) を使う場合はもっとシンプル
// middleware.ts
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*'],
};

// → NextAuth が自動的に認証チェックとリダイレクトを行う

// カスタマイズする場合
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(request) {
    // 追加のロジック
    const { pathname } = request.nextUrl;
    const role = request.nextauth.token?.role;

    // 管理者のみアクセス可能
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(
        new URL('/dashboard', request.url)
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);`}
              language="tsx"
              title="NextAuth.js との連携"
            />

            <InfoBox type="success" title="ミドルウェア認証のメリット">
              <p>
                ミドルウェアで認証チェックを行うと、保護されたページのコンポーネントが実行される前にリダイレクトできます。
                各ページに認証チェックのコードを書く必要がなく、一箇所で管理できるのが大きなメリットです。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: ヘッダーとCookieの操作 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ヘッダーと Cookie の操作</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ミドルウェアではリクエスト・レスポンスのヘッダーや Cookie を操作できます。
              セキュリティヘッダーの追加やトラッキングに活用できます。
            </p>

            <CodeBlock
              code={`import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // レスポンスヘッダーを追加
  const response = NextResponse.next();

  // セキュリティヘッダー
  response.headers.set(
    'X-Frame-Options',
    'DENY'
  );
  response.headers.set(
    'X-Content-Type-Options',
    'nosniff'
  );
  response.headers.set(
    'Referrer-Policy',
    'strict-origin-when-cross-origin'
  );

  // リクエストヘッダーを追加（Server Component で読める）
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);
  requestHeaders.set('x-request-id', crypto.randomUUID());

  const responseWithHeaders = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Cookie の操作
  // Cookie を設定
  responseWithHeaders.cookies.set('visited', 'true', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30日
  });

  // Cookie を読む
  const theme = request.cookies.get('theme')?.value;
  if (theme) {
    requestHeaders.set('x-theme', theme);
  }

  return responseWithHeaders;
}`}
              language="tsx"
              title="ヘッダーと Cookie の操作"
            />
          </section>

          {/* セクション 6: 実践的なミドルウェア */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践的なミドルウェア設計</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              実際のプロジェクトでは複数の処理を組み合わせます。
              整理されたミドルウェアの書き方を見てみましょう。
            </p>

            <CodeBlock
              code={`// middleware.ts - 実践的な構成
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // 1. メンテナンスモード
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';
  if (isMaintenanceMode && pathname !== '/maintenance') {
    return NextResponse.rewrite(
      new URL('/maintenance', request.url)
    );
  }

  // 2. 認証チェック
  const token = request.cookies.get('session')?.value;
  if (pathname.startsWith('/dashboard') && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. レート制限（簡易版）
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    response.headers.set('X-RateLimit-Limit', '100');
  }

  // 4. セキュリティヘッダー
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // 5. リクエスト情報をヘッダーに追加
  response.headers.set('x-pathname', pathname);

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
};`}
              language="tsx"
              title="実践的なミドルウェアの構成"
              showLineNumbers
            />

            <InfoBox type="info" title="ミドルウェアの処理順序">
              <p>
                ミドルウェア内の処理は上から順に実行されます。
                早期リターン（return）でリダイレクトすると、それ以降の処理は実行されません。
                重要度の高い処理（メンテナンスモード、認証）を上に、付加的な処理（ヘッダー追加）を下に配置しましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション 7: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">ミドルウェアでできること</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>認証チェックとリダイレクト</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>パスの書き換え（リライト）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>セキュリティヘッダーの追加</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>Cookie の読み書き</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>地域・デバイスベースの分岐</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">注意点</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">&#9679;</span>
                    <span>Edge Runtime の制約がある</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">&#9679;</span>
                    <span>プロジェクトに1ファイルのみ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">&#9679;</span>
                    <span>matcher で対象パスを絞る</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">&#9679;</span>
                    <span>重い処理は避ける（レイテンシに影響）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">&#9679;</span>
                    <span>データベースアクセスは不可</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Middleware - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/routing/middleware',
                  description: 'ミドルウェアの設定と使い方',
                },
                {
                  title: 'Edge Runtime - Next.js',
                  url: 'https://nextjs.org/docs/app/api-reference/edge',
                  description: 'Edge Runtime の制約と利点',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
