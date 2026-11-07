import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';
import PageSources from '@/components/PageSources';

export default function ProjectSetup() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 37</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Next.js プロジェクト作成</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          create-next-app を使って Next.js プロジェクトを作成し、ディレクトリ構造や開発サーバーの起動方法を学びます。
          Vite での経験を活かしながら、Next.js 特有の構成を理解しましょう。
        </p>

        <WhyNowBox tags={['create-next-app', 'App Router', 'TypeScript', 'プロジェクト構造']}>
          <p>
            実際に手を動かしながら学ぶのが最も効率的です。
            プロジェクトを作成し、ファイル構造を理解することで、これ以降のステップで登場する概念が具体的にイメージできるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: create-next-app */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">create-next-app でプロジェクト作成</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Vite で <code className="text-sm bg-muted px-1.5 py-0.5 rounded">npm create vite@latest</code> を使ったように、
              Next.js には <code className="text-sm bg-muted px-1.5 py-0.5 rounded">create-next-app</code> という公式のセットアップツールがあります。
            </p>

            <CodeBlock
              code={`# 最新の Next.js プロジェクトを作成
npx create-next-app@latest my-next-app

# 最初に既定を使うかどうかを聞かれる:
# Would you like to use the recommended Next.js defaults? → No, customize settings

# No, customize settings を選んだときだけ、個別の質問が続く:
# Would you like to use TypeScript? → Yes
# Which linter would you like to use? → ESLint
# Would you like to use React Compiler? → No
# Would you like to use Tailwind CSS? → Yes
# Would you like your code inside a \`src/\` directory? → Yes
# Would you like to use App Router? (recommended) → Yes
# Would you like to use Cache Components? → No（理由は下の注記）
# Would you like to customize the import alias (\`@/*\` by default)? → No
# Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? → Yes
# Would you like to help improve Next.js by letting agents prepare anonymized feedback for your review as you code? → No

# 質問を飛ばして作る。前回の選択が保存されていなければ既定になる（src/は作られず、Cache Componentsは有効）
npx create-next-app@latest my-next-app --yes

# 既定のままCache Componentsだけ無効にする
npx create-next-app@latest my-next-app --yes --no-cache-components`}
              language="bash"
              title="プロジェクト作成コマンド"
            />

            <InfoBox type="info" title="推奨設定の理由">
              <p>
                <strong>TypeScript</strong>: 型安全性で開発効率アップ。<br />
                <strong>Tailwind CSS</strong>: Next.js との相性が抜群。設定不要で使える。<br />
                <strong>src/ ディレクトリ</strong>: プロジェクトのルートをきれいに保てる。<br />
                <strong>App Router</strong>: 最新の推奨アーキテクチャ。<br />
                <strong>Turbopack</strong>: 既定のバンドラー。対話では聞かれない。webpackへの切り替えは<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next dev --webpack</code>と<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next build --webpack</code>で行う。
              </p>
            </InfoBox>

            <InfoBox type="warning" title="Cache Componentsを無効にして作る理由">
              <p>
                公式はNext.js 16.4からCache Componentsをすべてのアプリに勧めていて、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">create-next-app</code>の既定も有効です。
                このマニュアルのデータ取得とキャッシュの解説は、これまでのモデルで書いています。
                有効なプロジェクトでは<code className="text-sm bg-muted px-1.5 py-0.5 rounded">export const revalidate</code>や<code className="text-sm bg-muted px-1.5 py-0.5 rounded">export const dynamic</code>がビルドエラーになり、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">Suspense</code>の外でキャッシュしない<code className="text-sm bg-muted px-1.5 py-0.5 rounded">fetch</code>を呼ぶページもビルドが止まります（2026-11-07に16.4.5で実測）。
                STEPを順に進めるときは無効で作り、Cache Componentsは「Next.js 15 / 16の新機能」とPPRのページで学ぶ流れを勧めます。
              </p>
            </InfoBox>

            <InfoBox type="info" title="create-next-appの--webpackは生成物を変えなかった">
              <p>
                仕様では、公式のcreate-next-appリファレンスに<code className="text-sm bg-muted px-1.5 py-0.5 rounded">--turbopack</code>と<code className="text-sm bg-muted px-1.5 py-0.5 rounded">--webpack</code>が載っていて、生成する<code className="text-sm bg-muted px-1.5 py-0.5 rounded">package.json</code>に反映すると書かれています。
                実測では、16.4.5の<code className="text-sm bg-muted px-1.5 py-0.5 rounded">--help</code>にどちらも無く、付けてもエラーにならず、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">package.json</code>と<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next.config.ts</code>は既定と同じでした。
                理由は公式の説明が見当たらず、確認できていません。
                また生成される<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next.config.ts</code>はTailwindを<code className="text-sm bg-muted px-1.5 py-0.5 rounded">@tailwindcss/turbopack</code>のローダーで処理します。
                そのため<code className="text-sm bg-muted px-1.5 py-0.5 rounded">next build --webpack</code>はビルド自体は成功しますが、実測ではユーティリティクラスのCSSが生成されませんでした。
                webpackへ切り替えるときはTailwindの設定も変える必要があります。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: プロジェクト構造 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">プロジェクト構造を理解する</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              作成されたプロジェクトのディレクトリ構造を確認しましょう。
              Vite プロジェクトとの違いに注目してください。
            </p>

            <CodeBlock
              code={`my-next-app/
├── src/
│   └── app/                    # App Router のルートディレクトリ
│       ├── layout.tsx          # ルートレイアウト（全ページ共通の枠組み）
│       ├── page.tsx            # トップページ（/ のUI）
│       ├── globals.css         # グローバルCSS（Tailwind のインポート含む）
│       └── favicon.ico         # ファビコン
├── public/                     # 静的ファイル置き場（画像、フォントなど）
│   ├── next.svg
│   └── vercel.svg
├── next.config.ts              # Next.js の設定ファイル
├── next-env.d.ts               # Next.jsの型定義（自動生成）
├── tsconfig.json               # TypeScript の設定
├── eslint.config.mjs           # ESLint の設定
├── AGENTS.md                   # コーディングエージェント向けの案内
├── package.json
└── package-lock.json`}
              language="plaintext"
              title="Next.js プロジェクトのディレクトリ構造"
            />

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-bold text-foreground mb-2">app/ ディレクトリ</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  App Router の中心となるディレクトリ。ここにページ、レイアウト、API ルートなど、アプリケーションのすべてを配置します。
                  Vite プロジェクトの <code className="text-sm bg-muted px-1.5 py-0.5 rounded">src/</code> に相当しますが、
                  ファイル名に特別な意味があるのが大きな違いです。
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h3 className="font-bold text-foreground mb-2">public/ ディレクトリ</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  画像やフォントなど、ビルド処理を通さずそのまま配信したい静的ファイルを置きます。
                  Vite プロジェクトの <code className="text-sm bg-muted px-1.5 py-0.5 rounded">public/</code> と同じ役割です。
                  <code className="text-sm bg-muted px-1.5 py-0.5 rounded">/public/logo.png</code> は
                  <code className="text-sm bg-muted px-1.5 py-0.5 rounded">/logo.png</code> でアクセスできます。
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h3 className="font-bold text-foreground mb-2">next.config.ts</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Next.js の設定ファイル。画像の外部ドメイン許可、リダイレクト設定、環境変数の公開設定などを行います。
                  Vite の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">vite.config.ts</code> に相当します。
                </p>
              </div>
            </div>
          </section>

          {/* セクション 3: 重要なファイルの中身 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">重要なファイルの中身</h2>

            <h3 className="text-lg font-bold text-foreground mb-3 mt-6">app/layout.tsx - ルートレイアウト</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              全ページに共通する HTML の枠組みを定義します。Vite での <code className="text-sm bg-muted px-1.5 py-0.5 rounded">index.html</code> に相当しますが、
              React コンポーネントとして記述できるのが大きな違いです。
            </p>

            <CodeBlock
              code={`// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Google Fonts を最適化して読み込み
const inter = Inter({
  subsets: ["latin"],
});

// ページのメタデータ（SEO に重要）
export const metadata: Metadata = {
  title: "My Next.js App",
  description: "Next.js で作ったアプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}  {/* ← ここにページの内容が入る */}
      </body>
    </html>
  );
}`}
              language="tsx"
              title="ルートレイアウト"
              showLineNumbers
            />

            <h3 className="text-lg font-bold text-foreground mb-3 mt-8">app/page.tsx - トップページ</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              URL <code className="text-sm bg-muted px-1.5 py-0.5 rounded">/</code> にアクセスしたときに表示されるページです。
              Vite での <code className="text-sm bg-muted px-1.5 py-0.5 rounded">App.tsx</code> に相当します。
            </p>

            <CodeBlock
              code={`// src/app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js!</h1>
      <p>ここがトップページです。</p>
    </main>
  );
}

// ポイント:
// - 'use client' がないのでデフォルトで Server Component
// - export default が必須
// - ファイル名は必ず page.tsx`}
              language="tsx"
              title="トップページ"
            />

            <h3 className="text-lg font-bold text-foreground mb-3 mt-8">next.config.ts - 設定ファイル</h3>

            <p className="text-foreground/80 mb-4 leading-relaxed">
              作成直後のファイルは次の内容です（2026-11-07に<code className="text-sm bg-muted px-1.5 py-0.5 rounded">create-next-app</code> 16.4.5の既定で生成したものをそのまま写しています）。
              Cache Componentsを無効にして作ると、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">cacheComponents</code>と<code className="text-sm bg-muted px-1.5 py-0.5 rounded">partialPrefetching</code>の2行が入りません。
            </p>

            <CodeBlock
              code={`import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;`}
              language="typescript"
              title="生成直後のnext.config.ts"
            />

            <p className="text-foreground/80 mt-4 mb-4 leading-relaxed">
              よく使う設定を足すと次のようになります。
            </p>

            <CodeBlock
              code={`// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 外部画像のドメインを許可（next/image で使う場合）
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // リダイレクト設定
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;`}
              language="typescript"
              title="Next.js 設定ファイル"
            />
          </section>

          {/* セクション 4: 開発サーバーの起動 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">開発サーバーを起動する</h2>

            <CodeBlock
              code={`# プロジェクトディレクトリに移動
cd my-next-app

# 開発サーバーを起動
npm run dev

# 出力:
# ▲ Next.js 16.4.5 (Turbopack)
# - Local:         http://localhost:3000
# - Network:       http://192.168.x.x:3000
# ✓ Ready in 2.4s
# ✓ Running next.config.ts took 211ms
# - Cache Components enabled
# - Partial Prefetching enabled`}
              language="bash"
              title="開発サーバーの起動"
            />

            <CodeBlock
              code={`npm run build

# 出力:
# ▲ Next.js 16.4.5 (Turbopack)
# ✓ Running next.config.ts took 251ms
# - Cache Components enabled
# - Partial Prefetching enabled
#
#   Creating an optimized production build ...
# ✓ Compiled successfully in 16.5s
#   Running TypeScript ...
#   Finished TypeScript in 6.9s ...
#   Collecting page data using 5 workers ...
# ✓ Generating static pages using 5 workers (4/4) in 2.9s
#   Finalizing page optimization ...
#
# Route (app)
# ┌ ○ /
# └ ○ /_not-found
#
# ○  (Static)  prerendered as static content`}
              language="bash"
              title="本番ビルド"
            />

            <InfoBox type="info" title="出力の実測記録">
              <p>
                上の2つは、2026-11-07に<code className="text-sm bg-muted px-1.5 py-0.5 rounded">npx create-next-app@latest my-app --yes --use-npm --disable-git</code>で作ったプロジェクトの実際の出力です。
                環境はNext.js 16.4.5、React 19.3.0、Node.js 26.13.0、macOSです。
                Networkのアドレスは伏せ、npmが最初に出す行、リクエストのログ、ビルドの途中経過の行は省きました。
                仕様で決まっているのは出力の形だけで、版番号・所要時間・ワーカー数は環境によって変わります。
                Cache Componentsを無効にして作ると、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">Cache Components enabled</code>と<code className="text-sm bg-muted px-1.5 py-0.5 rounded">Partial Prefetching enabled</code>の行は出ません。
              </p>
            </InfoBox>

            <p className="text-foreground/80 mt-4 mb-4 leading-relaxed">
              ブラウザで <code className="text-sm bg-muted px-1.5 py-0.5 rounded">http://localhost:3000</code> を開くと、
              Next.js のウェルカムページが表示されます。Vite と同様にホットリロード（HMR）が有効なので、
              ファイルを保存するとブラウザが自動的に更新されます。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">コマンド</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">説明</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono text-sm">npm run dev</td>
                    <td className="py-3 px-4">開発サーバー起動（HMR 有効）</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono text-sm">npm run build</td>
                    <td className="py-3 px-4">プロダクションビルド</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono text-sm">npm run start</td>
                    <td className="py-3 px-4">ビルド済みアプリを起動</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-sm">npm run lint</td>
                    <td className="py-3 px-4">ESLint でコードチェック</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="warning" title="Vite との違い: ポート番号">
              <p>
                Vite はデフォルトで <code className="text-sm bg-muted px-1.5 py-0.5 rounded">localhost:5173</code> ですが、
                Next.js は <code className="text-sm bg-muted px-1.5 py-0.5 rounded">localhost:3000</code> を使います。
                両方同時に起動する場合はポートが重複しないので安心です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: TypeScript in Next.js */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Next.js での TypeScript</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              create-next-app で TypeScript を選択すると、設定済みの状態でプロジェクトが作られます。
              Next.js 固有の型もいくつか提供されています。
            </p>

            <CodeBlock
              code={`// Next.js が提供する主要な型

// ページコンポーネントの Props 型
// 動的ルート [slug] のパラメータを受け取る
type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  return <h1>記事: {slug}</h1>;
}

// メタデータの型
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ブログ記事',
  description: '記事の説明文',
  openGraph: {
    title: 'ブログ記事',
    images: ['/og-image.png'],
  },
};

// レイアウトコンポーネントの Props 型
type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export default function Layout({ children }: LayoutProps) {
  return <div>{children}</div>;
}`}
              language="tsx"
              title="Next.js 固有の TypeScript 型"
            />

            <InfoBox type="success" title="TypeScript の知識がそのまま活きる">
              <p>
                Step 7 で学んだ TypeScript の知識（Props の型定義、ジェネリクスなど）は Next.js でもそのまま使えます。
                Next.js 固有の型は数が限られているので、すぐに覚えられるでしょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション 6: 最初のページを編集してみよう */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">最初のページを編集してみよう</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デフォルトのウェルカムページを、自分のページに書き換えてみましょう。
            </p>

            <CodeBlock
              code={`// src/app/page.tsx を以下に置き換え
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">
        はじめての Next.js
      </h1>
      <p className="text-xl text-gray-600">
        React の知識を活かして、フルスタック Web アプリを作ろう
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-6 border rounded-lg hover:border-blue-500 transition-colors">
          <h2 className="text-lg font-semibold mb-2">Step 1</h2>
          <p className="text-sm text-gray-500">
            app/page.tsx を編集してみよう
          </p>
        </div>
        <div className="p-6 border rounded-lg hover:border-blue-500 transition-colors">
          <h2 className="text-lg font-semibold mb-2">Step 2</h2>
          <p className="text-sm text-gray-500">
            新しいページを追加してみよう
          </p>
        </div>
      </div>
    </main>
  );
}`}
              language="tsx"
              title="トップページを編集"
            />

            <p className="text-foreground/80 mt-4 leading-relaxed">
              ファイルを保存すると、ブラウザが自動的に更新されます。
              Tailwind CSS のクラスがそのまま使えることを確認してください。
            </p>

            <InfoBox type="info" title="次のステップへ">
              <p>
                プロジェクトが作成できたら、次のステップでは App Router のルーティングの仕組みを詳しく学びます。
                ファイルを追加するだけでページが増えていく、直感的な開発体験を楽しみましょう。
              </p>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'create-next-app - Next.js',
                  url: 'https://nextjs.org/docs/app/api-reference/cli/create-next-app',
                  description: 'create-next-app CLI の公式リファレンス',
                },
                {
                  title: 'プロジェクト構成 - Next.js',
                  url: 'https://nextjs.org/docs/app/getting-started/project-structure',
                  description: 'Next.js プロジェクトのファイル・フォルダ構成',
                },
              ]}
            />
          </section>

          <section className="mt-12">
            <PageSources path="/react/nextjs-basics/project-setup" />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
