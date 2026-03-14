import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function NextRouting() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 36</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">ページとルーティング</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Next.js App Router のファイル規約を学びます。page.tsx、layout.tsx、loading.tsx、error.tsx といった特別なファイル名の役割と、動的ルート、Link コンポーネント、ナビゲーション用の Hooks を理解しましょう。
        </p>

        <WhyNowBox tags={['App Router', 'page.tsx', 'layout.tsx', '動的ルート', 'Link']}>
          <p>
            ルーティングは Web アプリの骨格です。Next.js のファイルベースルーティングを理解することで、
            直感的にページを追加・管理できるようになります。React Router とは異なるアプローチですが、よりシンプルです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: App Router のファイル規約 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">App Router のファイル規約</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              App Router では、特定のファイル名に特別な意味があります。
              これらのファイルを配置するだけで、Next.js が自動的にルーティングやレイアウト、エラーハンドリングを構築します。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">ファイル名</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">役割</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">必須？</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono text-sm">page.tsx</td>
                    <td className="py-3 px-4">ルートの UI を定義。これがないとページとして認識されない</td>
                    <td className="py-3 px-4">はい</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono text-sm">layout.tsx</td>
                    <td className="py-3 px-4">共通のレイアウト。子ルートで共有される</td>
                    <td className="py-3 px-4">ルートのみ必須</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono text-sm">loading.tsx</td>
                    <td className="py-3 px-4">読み込み中に表示される UI</td>
                    <td className="py-3 px-4">いいえ</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono text-sm">error.tsx</td>
                    <td className="py-3 px-4">エラー発生時に表示される UI</td>
                    <td className="py-3 px-4">いいえ</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono text-sm">not-found.tsx</td>
                    <td className="py-3 px-4">404 ページ</td>
                    <td className="py-3 px-4">いいえ</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono text-sm">template.tsx</td>
                    <td className="py-3 px-4">layout に似ているが、遷移ごとに再マウントされる</td>
                    <td className="py-3 px-4">いいえ</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-sm">route.ts</td>
                    <td className="py-3 px-4">API エンドポイント（Route Handler）</td>
                    <td className="py-3 px-4">いいえ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              code={`// app/page.tsx - トップページ
export default function Home() {
  return <h1>ホーム</h1>;
}

// app/about/page.tsx - アバウトページ
export default function About() {
  return <h1>私たちについて</h1>;
}

// app/blog/page.tsx - ブログ一覧
export default function Blog() {
  return <h1>ブログ一覧</h1>;
}`}
              language="tsx"
              title="基本的なページの作成"
            />

            <InfoBox type="info" title="page.tsx がないフォルダは URL にならない">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">app/components/</code> のように page.tsx を含まないフォルダは、
                URL としてアクセスできません。コンポーネントやユーティリティを app/ 内に整理する際に便利です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: 動的ルート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">動的ルート [slug]</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ブログ記事や商品ページのように、URL の一部が動的に変わるページを作るには、フォルダ名を角括弧で囲みます。
            </p>

            <CodeBlock
              code={`app/
├── blog/
│   ├── page.tsx              → /blog（一覧ページ）
│   └── [slug]/
│       └── page.tsx          → /blog/hello-world, /blog/nextjs-tips など
├── products/
│   └── [id]/
│       └── page.tsx          → /products/1, /products/abc など
└── shop/
    └── [...categories]/
        └── page.tsx          → /shop/men, /shop/men/shoes, /shop/men/shoes/nike など`}
              language="plaintext"
              title="動的ルートのファイル構造"
            />

            <CodeBlock
              code={`// app/blog/[slug]/page.tsx
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  // slug を使ってデータを取得
  // 例: /blog/hello-world なら slug = "hello-world"
  const post = await fetch(
    \`https://api.example.com/posts/\${slug}\`
  ).then(res => res.json());

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// ビルド時に静的生成するパスを指定（SSG の場合）
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json());

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}`}
              language="tsx"
              title="動的ルートのページコンポーネント"
            />

            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold text-foreground mb-1">
                  <code className="text-sm bg-muted px-1.5 py-0.5 rounded">[slug]</code> - 単一の動的セグメント
                </h4>
                <p className="text-sm text-foreground/80">
                  URL の1つのセグメントをキャプチャ。<code className="text-sm bg-muted px-1.5 py-0.5 rounded">/blog/hello</code> にマッチ。
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold text-foreground mb-1">
                  <code className="text-sm bg-muted px-1.5 py-0.5 rounded">[...slug]</code> - キャッチオール
                </h4>
                <p className="text-sm text-foreground/80">
                  複数セグメントをキャプチャ。<code className="text-sm bg-muted px-1.5 py-0.5 rounded">/shop/a/b/c</code> で slug = ["a", "b", "c"]。
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold text-foreground mb-1">
                  <code className="text-sm bg-muted px-1.5 py-0.5 rounded">[[...slug]]</code> - オプショナルキャッチオール
                </h4>
                <p className="text-sm text-foreground/80">
                  セグメントがなくてもマッチ。<code className="text-sm bg-muted px-1.5 py-0.5 rounded">/shop</code> にも <code className="text-sm bg-muted px-1.5 py-0.5 rounded">/shop/a/b</code> にもマッチ。
                </p>
              </div>
            </div>
          </section>

          {/* セクション 3: ルートグループ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ルートグループ (group)</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              フォルダ名を丸括弧で囲むと、URL に影響を与えずにルートを整理できます。
              これは「ルートグループ」と呼ばれ、レイアウトを分けたいときに特に便利です。
            </p>

            <CodeBlock
              code={`app/
├── (marketing)/           # URL に (marketing) は含まれない
│   ├── layout.tsx         # マーケティングページ共通レイアウト
│   ├── page.tsx           → /
│   ├── about/
│   │   └── page.tsx       → /about
│   └── pricing/
│       └── page.tsx       → /pricing
├── (dashboard)/           # URL に (dashboard) は含まれない
│   ├── layout.tsx         # ダッシュボード共通レイアウト（サイドバーなど）
│   ├── dashboard/
│   │   └── page.tsx       → /dashboard
│   └── settings/
│       └── page.tsx       → /settings
└── layout.tsx             # 全ページ共通のルートレイアウト`}
              language="plaintext"
              title="ルートグループでレイアウトを分ける"
            />

            <InfoBox type="success" title="デザイナーに嬉しいルートグループ">
              <p>
                マーケティングページは全幅のヘッダー付き、管理画面はサイドバー付きなど、
                セクションごとにまったく違うレイアウトを使い分けられます。
                URL がシンプルなまま保たれるのもポイントです。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: Link コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Link コンポーネント</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ページ間のナビゲーションには、Next.js の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">Link</code> コンポーネントを使います。
              HTML の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;a&gt;</code> タグの代わりに使うことで、
              ページ遷移がクライアントサイドで行われ、高速になります。
            </p>

            <CodeBlock
              code={`import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="flex gap-4 p-4">
      {/* 基本的なリンク */}
      <Link href="/">ホーム</Link>

      {/* スタイル付きリンク */}
      <Link
        href="/about"
        className="text-blue-600 hover:underline"
      >
        アバウト
      </Link>

      {/* 動的ルートへのリンク */}
      <Link href="/blog/hello-world">
        記事を読む
      </Link>

      {/* クエリパラメータ付きのリンク */}
      <Link href="/search?q=react&page=1">
        検索結果を見る
      </Link>

      {/* target="_blank" で外部リンクのように開く */}
      <Link href="/terms" target="_blank">
        利用規約
      </Link>
    </nav>
  );
}`}
              language="tsx"
              title="Link コンポーネントの使い方"
            />

            <InfoBox type="info" title="Link のプリフェッチ機能">
              <p>
                Link コンポーネントは、ビューポート内に表示されたリンク先のページを自動的にプリフェッチ（事前読み込み）します。
                そのため、ユーザーがクリックした瞬間にページが表示され、非常に高速なナビゲーション体験を実現します。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: useRouter と usePathname */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useRouter と usePathname</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              プログラム的にナビゲーションしたい場合や、現在の URL パスを取得したい場合は、
              Next.js が提供する Hooks を使います。これらは Client Component でのみ使用できます。
            </p>

            <CodeBlock
              code={`'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function NavigationExample() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 現在のパスを表示
  console.log(pathname); // 例: "/blog/hello-world"

  // クエリパラメータを取得
  const query = searchParams.get('q'); // ?q=nextjs → "nextjs"

  return (
    <div>
      <p>現在のページ: {pathname}</p>
      {query && <p>検索キーワード: {query}</p>}

      {/* プログラム的なナビゲーション */}
      <button onClick={() => router.push('/dashboard')}>
        ダッシュボードへ
      </button>

      <button onClick={() => router.back()}>
        戻る
      </button>

      <button onClick={() => router.refresh()}>
        ページを更新
      </button>

      {/* replace: 履歴に残さずに遷移 */}
      <button onClick={() => router.replace('/login')}>
        ログインへ（履歴に残さない）
      </button>
    </div>
  );
}`}
              language="tsx"
              title="ナビゲーション用 Hooks"
            />

            <InfoBox type="warning" title="'use client' を忘れずに">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useRouter</code>、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">usePathname</code>、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useSearchParams</code> はすべて Client Component でのみ使えます。
                ファイルの先頭に <code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use client'</code> を追加することを忘れないでください。
              </p>
            </InfoBox>
          </section>

          {/* セクション 6: 実践 - ブログの基本ルーティング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: ブログの基本ルーティング</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              学んだ内容を組み合わせて、シンプルなブログのルーティングを作ってみましょう。
            </p>

            <CodeBlock
              code={`// app/blog/page.tsx - ブログ一覧
import Link from 'next/link';

const posts = [
  { slug: 'getting-started', title: 'Next.js 入門', date: '2025-01-15' },
  { slug: 'routing-basics', title: 'ルーティングの基本', date: '2025-01-20' },
  { slug: 'data-fetching', title: 'データ取得', date: '2025-01-25' },
];

export default function BlogList() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">ブログ</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={\`/blog/\${post.slug}\`}
            className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500 text-sm mt-1">{post.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}`}
              language="tsx"
              title="ブログ一覧ページ"
            />

            <CodeBlock
              code={`// app/blog/[slug]/page.tsx - 個別記事ページ
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Link
        href="/blog"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← ブログ一覧に戻る
      </Link>
      <article>
        <h1 className="text-3xl font-bold mb-4">
          記事: {slug}
        </h1>
        <p className="text-gray-600">
          この記事のスラッグは「{slug}」です。
          実際のアプリではここでデータベースやCMSから記事を取得します。
        </p>
      </article>
    </div>
  );
}`}
              language="tsx"
              title="個別記事ページ"
            />
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'ルーティング - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/routing',
                  description: 'App Router のルーティングの仕組み',
                },
                {
                  title: 'Link コンポーネント - Next.js',
                  url: 'https://nextjs.org/docs/app/api-reference/components/link',
                  description: 'Link コンポーネントの API リファレンス',
                },
                {
                  title: 'useRouter - Next.js',
                  url: 'https://nextjs.org/docs/app/api-reference/functions/use-router',
                  description: 'プログラムによるナビゲーション',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
