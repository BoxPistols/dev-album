import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 37</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">レイアウトとナビゲーション</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Next.js のレイアウトシステムを使って、ヘッダー、サイドバー、フッターなどの共通 UI を効率的に管理する方法を学びます。
          メタデータ API やフォント最適化も合わせて理解しましょう。
        </p>

        <WhyNowBox tags={['layout.tsx', 'template.tsx', 'metadata', 'next/font', 'ネストレイアウト']}>
          <p>
            デザイナーにとってレイアウトは最も馴染みのある概念です。
            Figma でコンポーネントをフレームにまとめるように、Next.js ではレイアウトファイルで共通の枠組みを定義します。
            一度設定すればすべてのページに自動適用されるため、一貫性のあるデザインを保てます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: ルートレイアウト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ルートレイアウト</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">app/layout.tsx</code> はアプリケーション全体の枠組みを定義する特別なファイルです。
              これは唯一の必須レイアウトで、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;html&gt;</code> タグと
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;body&gt;</code> タグを含める必要があります。
            </p>

            <CodeBlock
              code={`// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'マイサイト',
    template: '%s | マイサイト', // 子ページのタイトルが %s に入る
  },
  description: 'Next.js で作ったサイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}  {/* ← ページの内容がここに挿入される */}
        </main>
        <Footer />
      </body>
    </html>
  );
}`}
              language="tsx"
              title="ルートレイアウト"
              showLineNumbers
            />

            <InfoBox type="info" title="レイアウトは再レンダリングされない">
              <p>
                レイアウトコンポーネントはページ遷移時に再レンダリングされません。
                これにより、ヘッダーやサイドバーの状態（スクロール位置、入力値など）が保持されます。
                これは React Router + Outlet パターンに似ていますが、Next.js が自動的に行ってくれます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: ネストレイアウト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ネストレイアウト</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              サブディレクトリに layout.tsx を配置すると、そのセクション固有のレイアウトを追加できます。
              親のレイアウトの中に子のレイアウトがネストされます。
            </p>

            <CodeBlock
              code={`app/
├── layout.tsx              # ルートレイアウト（全ページ共通）
├── page.tsx                # / のページ
├── dashboard/
│   ├── layout.tsx          # ダッシュボード用レイアウト
│   ├── page.tsx            # /dashboard
│   ├── analytics/
│   │   └── page.tsx        # /dashboard/analytics
│   └── settings/
│       └── page.tsx        # /dashboard/settings
└── blog/
    ├── layout.tsx          # ブログ用レイアウト
    ├── page.tsx            # /blog
    └── [slug]/
        └── page.tsx        # /blog/[slug]`}
              language="plaintext"
              title="ネストレイアウトのファイル構造"
            />

            <CodeBlock
              code={`// app/dashboard/layout.tsx
// ダッシュボードセクション専用のレイアウト
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* サイドバー */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">ダッシュボード</h2>
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            概要
          </Link>
          <Link
            href="/dashboard/analytics"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            アナリティクス
          </Link>
          <Link
            href="/dashboard/settings"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            設定
          </Link>
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}`}
              language="tsx"
              title="ダッシュボード用ネストレイアウト"
            />

            <p className="text-foreground/80 mt-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">/dashboard</code> 以下のすべてのページに
              サイドバーが表示されます。ルートレイアウトのヘッダー・フッターも引き続き表示されるため、
              レイアウトが「入れ子」になります。
            </p>
          </section>

          {/* セクション 3: template.tsx */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">template.tsx - 遷移ごとに再マウント</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">template.tsx</code> は layout.tsx とほぼ同じですが、
              ページ遷移ごとにコンポーネントが再マウントされるという違いがあります。
            </p>

            <CodeBlock
              code={`// app/blog/template.tsx
// ブログ記事を開くたびにフェードインアニメーションを実行
'use client';

import { useEffect, useState } from 'react';

export default function BlogTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);

  // ページ遷移ごとに実行される（layout.tsx では実行されない）
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div
      className={\`transition-opacity duration-500 \${
        isVisible ? 'opacity-100' : 'opacity-0'
      }\`}
    >
      {children}
    </div>
  );
}`}
              language="tsx"
              title="template.tsx でページ遷移アニメーション"
            />

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">特徴</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">layout.tsx</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">template.tsx</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">ページ遷移時</td>
                    <td className="py-3 px-4">状態を保持（再レンダリングなし）</td>
                    <td className="py-3 px-4">毎回再マウント</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">useEffect</td>
                    <td className="py-3 px-4">初回のみ実行</td>
                    <td className="py-3 px-4">遷移ごとに実行</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">用途</td>
                    <td className="py-3 px-4">ナビゲーション、サイドバーなど</td>
                    <td className="py-3 px-4">アニメーション、ページビュー記録</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* セクション 4: 共有ナビゲーション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">共有ナビゲーションの実装</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ヘッダーナビゲーションを作成し、アクティブなリンクをハイライトする実践的なパターンを見てみましょう。
            </p>

            <CodeBlock
              code={`// components/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'ホーム' },
  { href: '/about', label: '会社概要' },
  { href: '/blog', label: 'ブログ' },
  { href: '/contact', label: 'お問い合わせ' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          MySite
        </Link>

        <nav className="flex gap-1">
          {navLinks.map((link) => {
            // 現在のパスとリンク先が一致するかチェック
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={\`px-3 py-2 rounded-md text-sm font-medium transition-colors \${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }\`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}`}
              language="tsx"
              title="アクティブリンク付きヘッダー"
            />

            <InfoBox type="success" title="usePathname でアクティブ状態を判定">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">usePathname()</code> で現在の URL パスを取得し、
                リンク先と比較することでアクティブ状態を判定できます。
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">startsWith</code> を使うと、サブページ（/blog/xxx）でも
                親リンク（/blog）をアクティブにできます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: Metadata API */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Metadata API</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js の Metadata API を使うと、ページごとに <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;title&gt;</code> や
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;meta&gt;</code> タグを簡単に設定できます。
              SEO やソーシャルメディアでの表示に重要です。
            </p>

            <CodeBlock
              code={`// app/layout.tsx - グローバルメタデータ
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'マイサイト',           // デフォルトのタイトル
    template: '%s | マイサイト',     // 子ページ: "ブログ | マイサイト"
  },
  description: 'ポートフォリオサイト',
  keywords: ['デザイン', 'ポートフォリオ', 'Web制作'],
  authors: [{ name: '山田太郎' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://mysite.com',
    siteName: 'マイサイト',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'マイサイト',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@myhandle',
  },
};`}
              language="tsx"
              title="グローバルメタデータ"
            />

            <CodeBlock
              code={`// app/blog/[slug]/page.tsx - ページごとの動的メタデータ
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

// 動的にメタデータを生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetch(
    \`https://api.example.com/posts/\${slug}\`
  ).then(res => res.json());

  return {
    title: post.title,          // → "記事タイトル | マイサイト"
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  // ... ページの内容
}`}
              language="tsx"
              title="動的メタデータ生成"
            />
          </section>

          {/* セクション 6: next/font */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">next/font でフォント最適化</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">next/font</code> を使うと、Google Fonts やローカルフォントを
              パフォーマンスに最適化された形で読み込めます。CLS（Cumulative Layout Shift）を防ぐための自動処理も行われます。
            </p>

            <CodeBlock
              code={`// Google Fonts を使う場合
import { Inter, Noto_Sans_JP } from 'next/font/google';

// 欧文フォント
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // CSS 変数として使う場合
});

// 日本語フォント
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={\`\${inter.variable} \${notoSansJP.variable}\`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}

// tailwind.config.ts で CSS 変数をフォントとして設定
// fontFamily: {
//   sans: ['var(--font-noto-sans-jp)', 'var(--font-inter)', 'sans-serif'],
// }`}
              language="tsx"
              title="Google Fonts の最適化読み込み"
            />

            <CodeBlock
              code={`// ローカルフォントを使う場合
import localFont from 'next/font/local';

const myFont = localFont({
  src: [
    {
      path: '../fonts/MyFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/MyFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-my-font',
});`}
              language="tsx"
              title="ローカルフォントの読み込み"
            />

            <InfoBox type="info" title="next/font のメリット">
              <p>
                <strong>ゼロ CLS</strong>: フォント読み込み中のレイアウトのずれを防止。<br />
                <strong>セルフホスト</strong>: Google Fonts でもビルド時にダウンロードされ、外部リクエストが発生しない。<br />
                <strong>自動最適化</strong>: font-display、プリロード、サブセットが自動設定される。<br />
                デザイナーが大切にするタイポグラフィを、パフォーマンスを犠牲にせず実現できます。
              </p>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'レイアウト - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates',
                  description: 'レイアウトとテンプレートの公式ガイド',
                },
                {
                  title: 'メタデータ API - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/optimizing/metadata',
                  description: 'メタデータの設定方法',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
