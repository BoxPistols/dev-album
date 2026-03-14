import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function Optimization() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 45</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">画像最適化とメタデータ</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Next.js の画像最適化機能（next/image）とメタデータ API を使って、
          パフォーマンスと SEO に優れたサイトを構築する方法を学びます。
        </p>

        <WhyNowBox tags={['next/image', 'Image', 'metadata', 'generateMetadata', 'Open Graph', 'SEO']}>
          <p>
            画像はウェブページの容量の大部分を占めます。next/image を使えば、
            自動的にフォーマット変換、リサイズ、遅延読み込みが適用されます。
            また、メタデータ API を使えば、SEO 対策と SNS シェア時の表示を簡単に設定できます。
            デザイナーにとって、見た目だけでなくパフォーマンスと共有時の見え方まで考慮することは重要です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: next/image の基本 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">next/image の基本</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">Image</code> コンポーネントは、
              HTML の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;img&gt;</code> タグを拡張したものです。
              自動的に以下の最適化が行われます。
            </p>

            <div className="space-y-3 mb-6">
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-bold text-foreground mb-1">フォーマット変換</h3>
                <p className="text-sm text-foreground/80">
                  ブラウザが対応していれば WebP や AVIF に自動変換。ファイルサイズが大幅に削減されます。
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-bold text-foreground mb-1">レスポンシブ対応</h3>
                <p className="text-sm text-foreground/80">
                  デバイスに合わせた適切なサイズの画像を自動生成。スマートフォンには小さな画像、デスクトップには大きな画像。
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-bold text-foreground mb-1">遅延読み込み</h3>
                <p className="text-sm text-foreground/80">
                  画面に表示されるタイミングで画像を読み込み（Lazy Loading）。初期表示が高速になります。
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-bold text-foreground mb-1">CLS 防止</h3>
                <p className="text-sm text-foreground/80">
                  画像の表示領域が事前に確保されるため、読み込み時のレイアウトのずれ（Cumulative Layout Shift）を防止します。
                </p>
              </div>
            </div>

            <CodeBlock
              code={`// next/image の基本的な使い方
import Image from 'next/image';

// パターン 1: ローカル画像（static import）
import heroImage from '@/images/hero.jpg';

export default function Hero() {
  return (
    <Image
      src={heroImage}
      alt="ヒーローイメージ"
      // width と height は自動で設定される
      placeholder="blur"  // ぼかしプレースホルダー（自動生成）
      priority            // LCP の画像は priority を指定
    />
  );
}

// パターン 2: リモート画像（URL指定）
export function Avatar({ url, name }: { url: string; name: string }) {
  return (
    <Image
      src={url}
      alt={\`\${name}のアバター\`}
      width={48}          // リモート画像は width/height 必須
      height={48}
      className="rounded-full"
    />
  );
}`}
              language="tsx"
              title="Image コンポーネントの基本"
            />

            <InfoBox type="info" title="ローカル画像 vs リモート画像">
              <p>
                <strong>ローカル画像</strong>（import で読み込み）: width/height は自動設定、blur プレースホルダーも自動生成されます。<br />
                <strong>リモート画像</strong>（URL 指定）: width/height を明示的に指定するか、fill を使います。
                セキュリティのため next.config.ts で許可するドメインの設定が必要です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: レスポンシブ画像 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">レスポンシブ画像</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">fill</code> プロパティと
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">sizes</code> プロパティを使って、
              親コンテナに合わせたレスポンシブ画像を実装できます。
            </p>

            <CodeBlock
              code={`import Image from 'next/image';

// パターン 1: fill で親要素にフィット
export function HeroBanner() {
  return (
    <div className="relative w-full h-[400px]">
      {/* 親要素に position: relative が必要 */}
      <Image
        src="/images/banner.jpg"
        alt="バナー画像"
        fill                          // 親要素を埋める
        style={{ objectFit: 'cover' }} // 比率を保ってトリミング
        sizes="100vw"                 // ビューポート幅いっぱい
        priority                       // ファーストビューの画像
      />
      {/* 画像の上にテキストを重ねる */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-white">タイトル</h1>
      </div>
    </div>
  );
}

// パターン 2: sizes でレスポンシブ制御
export function BlogCard({ post }: { post: { title: string; image: string } }) {
  return (
    <article className="border rounded-lg overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={post.image}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // ↑ スマホ: 100vw、タブレット: 50vw、PC: 33vw
        />
      </div>
      <div className="p-4">
        <h2 className="font-bold">{post.title}</h2>
      </div>
    </article>
  );
}

// パターン 3: グリッドレイアウトでのカード
export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}`}
              language="tsx"
              title="レスポンシブ画像のパターン"
              showLineNumbers
            />

            <InfoBox type="success" title="sizes は必ず指定しよう">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">fill</code> を使うときは
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">sizes</code> を必ず指定しましょう。
                sizes がないとブラウザはビューポート幅に基づいて画像サイズを決定するため、
                グリッドレイアウトなどでは必要以上に大きな画像がダウンロードされてしまいます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 3: 画像の設定 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">next.config.ts での画像設定</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              外部ドメインの画像を使う場合や、画像最適化の詳細設定は
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">next.config.ts</code> で行います。
            </p>

            <CodeBlock
              code={`// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // 外部画像を許可するドメイン
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',  // ワイルドカード対応
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],

    // 生成する画像サイズ（deviceSizes + imageSizes）
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // 画像フォーマット（デフォルトで WebP、AVIF も追加可能）
    formats: ['image/avif', 'image/webp'],

    // キャッシュの有効期限（秒）
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30日
  },
};

export default nextConfig;`}
              language="tsx"
              title="next.config.ts の画像設定"
            />

            <InfoBox type="warning" title="remotePatterns は必須">
              <p>
                外部 URL の画像を使う場合、remotePatterns に許可するドメインを明示的に追加する必要があります。
                設定しないとビルド時やランタイムでエラーになります。
                セキュリティのため、不要なドメインは追加しないようにしましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: メタデータ API */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">メタデータ API</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js のメタデータ API を使うと、各ページの
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;title&gt;</code> や
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;meta&gt;</code> タグを
              型安全に設定できます。SEO と SNS シェア対策の基本です。
            </p>

            <CodeBlock
              code={`// app/layout.tsx - グローバルメタデータ
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // 基本メタデータ
  title: {
    default: 'My Portfolio',           // デフォルトのタイトル
    template: '%s | My Portfolio',     // 子ページのタイトルテンプレート
  },
  description: 'デザイナー山田太郎のポートフォリオサイトです。',

  // ファビコン
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // 基本 Open Graph
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'My Portfolio',
  },

  // Twitter カード
  twitter: {
    card: 'summary_large_image',
    creator: '@yamada_design',
  },

  // ロボット設定
  robots: {
    index: true,
    follow: true,
  },
};`}
              language="tsx"
              title="ルートレイアウトのメタデータ"
            />

            <CodeBlock
              code={`// app/about/page.tsx - ページ固有のメタデータ
import type { Metadata } from 'next';

// 静的メタデータ: 変数を使わないシンプルなパターン
export const metadata: Metadata = {
  title: '自己紹介',  // → "自己紹介 | My Portfolio"（テンプレート適用）
  description: 'デザイナー山田太郎の経歴とスキルについて。',
  openGraph: {
    title: '自己紹介 - My Portfolio',
    description: 'デザイナー山田太郎の経歴とスキルについて。',
    images: [
      {
        url: '/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: '自己紹介ページ',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <div>
      <h1>自己紹介</h1>
      <p>山田太郎です。デザインが大好きです。</p>
    </div>
  );
}`}
              language="tsx"
              title="ページ固有の静的メタデータ"
            />
          </section>

          {/* セクション 5: 動的メタデータ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">動的メタデータ（generateMetadata）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ブログ記事や商品ページなど、コンテンツに応じてメタデータを変えたい場合は
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">generateMetadata</code> 関数を使います。
            </p>

            <CodeBlock
              code={`// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

// 動的メタデータ: データに基づいてメタデータを生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // データを取得（fetch はデフォルトでキャッシュされるため、
  // ページコンポーネントでの fetch と重複しても問題ない）
  const post = await fetch(
    \`https://api.example.com/posts/\${slug}\`
  ).then((res) => res.json());

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

// ページコンポーネント
export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await fetch(
    \`https://api.example.com/posts/\${slug}\`
  ).then((res) => res.json());

  return (
    <article className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-8">{post.excerpt}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}`}
              language="tsx"
              title="動的メタデータの生成"
              showLineNumbers
            />

            <InfoBox type="success" title="fetch の自動メモ化（Request Memoization）">
              <p>
                Next.js では同一レンダリングパス内で同じ URL への fetch は自動的にメモ化（重複排除）されます。
                generateMetadata とページコンポーネントの両方で同じ fetch を呼んでも、
                実際のリクエストは1回だけ実行されるため、パフォーマンスの心配は不要です。
                ※ これはキャッシュとは異なり、同一リクエスト内でのみ有効です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 6: Open Graph 画像の自動生成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">OG 画像の自動生成</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js には OG 画像を動的に生成する機能もあります。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">opengraph-image.tsx</code> ファイルで
              JSX から画像を自動生成できます。
            </p>

            <CodeBlock
              code={`// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'ブログ記事のOG画像';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetch(
    \`https://api.example.com/posts/\${params.slug}\`
  ).then((res) => res.json());

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.3,
            maxWidth: '80%',
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.8)',
            marginTop: 20,
          }}
        >
          {post.author.name} / My Portfolio
        </div>
      </div>
    ),
    { ...size }
  );
}

// これだけで、各ブログ記事の OG 画像が自動生成される！
// SNS でシェアしたときに、記事タイトル入りの画像が表示される`}
              language="tsx"
              title="OG 画像の動的生成"
            />

            <InfoBox type="info" title="OG 画像が重要な理由">
              <p>
                SNS でリンクをシェアしたときに表示される画像（OG 画像）は、
                クリック率に大きく影響します。デザイナーとして、各ページに適切な OG 画像を設定することは非常に重要です。
                Next.js の ImageResponse を使えば、画像編集ソフトなしでコードから動的に生成できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 7: next/font */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">next/font でフォント最適化</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">next/font</code> を使うと、
              Google Fonts やローカルフォントを最適化して読み込めます。
              外部リクエストなしでフォントが配信され、FOUT（Flash of Unstyled Text）を防止できます。
            </p>

            <CodeBlock
              code={`// app/layout.tsx
import { Inter, Noto_Sans_JP } from 'next/font/google';

// Google Fonts を最適化して読み込み
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto',
  weight: ['400', '500', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={\`\${inter.variable} \${notoSansJP.variable}\`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

// tailwind.config.ts で CSS 変数を使う
// fontFamily: {
//   sans: ['var(--font-noto)', 'var(--font-inter)', 'sans-serif'],
// }`}
              language="tsx"
              title="next/font による Google Fonts の最適化"
            />

            <InfoBox type="success" title="next/font のメリット">
              <p>
                next/font はビルド時にフォントファイルをダウンロードし、自サイトから配信します。
                Google Fonts への外部リクエストが不要になり、プライバシーとパフォーマンスの両方が向上します。
                CSS 変数として使えるため、Tailwind CSS との相性も抜群です。
              </p>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Image 最適化 - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/optimizing/images',
                  description: 'next/image による画像の自動最適化',
                },
                {
                  title: 'Font 最適化 - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/optimizing/fonts',
                  description: 'next/font によるフォント最適化',
                },
                {
                  title: 'メタデータ API - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/optimizing/metadata',
                  description: 'SEO のためのメタデータ設定',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
