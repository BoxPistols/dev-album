import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function Rsc() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 38</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Server Components</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React Server Components（RSC）は React の新しいパラダイムです。コンポーネントをサーバーで実行することで、
          バンドルサイズの削減、直接的なデータアクセス、セキュリティの向上を実現します。
        </p>

        <WhyNowBox tags={['RSC', 'Server Component', 'async Component', 'データ取得']}>
          <p>
            Server Components は Next.js App Router のデフォルト動作であり、最も重要な概念の一つです。
            従来のクライアントサイドのみの React とは根本的に異なるメンタルモデルが必要ですが、
            理解すればより効率的でパフォーマンスの高いアプリケーションを構築できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: Server Components とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Server Components とは</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              従来の React では、すべてのコンポーネントがブラウザ（クライアント）で実行されていました。
              Server Components は、コンポーネントをサーバー上で実行し、レンダリング結果（HTML）だけをブラウザに送ります。
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">従来の React（CSR）</h3>
                <div className="space-y-2 text-sm text-foreground/80">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground font-mono w-4">1.</span>
                    <span>ブラウザが空の HTML を受け取る</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground font-mono w-4">2.</span>
                    <span>JavaScript をダウンロード（大きい）</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground font-mono w-4">3.</span>
                    <span>JS が実行されて画面が表示される</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground font-mono w-4">4.</span>
                    <span>API にデータを取りに行く</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground font-mono w-4">5.</span>
                    <span>データが来てやっと完成</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                <h3 className="font-bold text-foreground mb-3">Server Components（RSC）</h3>
                <div className="space-y-2 text-sm text-foreground/80">
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-mono w-4">1.</span>
                    <span>サーバーでコンポーネントを実行</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-mono w-4">2.</span>
                    <span>サーバーでデータも取得</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-mono w-4">3.</span>
                    <span>完成した HTML をブラウザに送る</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-mono w-4">4.</span>
                    <span>即座に画面が表示される</span>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="デフォルトで Server Component">
              <p>
                Next.js App Router では、すべてのコンポーネントがデフォルトで Server Component です。
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use client'</code> を明示的に書かない限り、
                サーバーで実行されます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: Server Components のメリット */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Server Components のメリット</h2>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">1. バンドルサイズの削減</h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  Server Component のコードはブラウザに送られません。
                  大きなライブラリ（日付処理、マークダウンパーサーなど）をサーバー側でのみ使えば、
                  ユーザーがダウンロードする JavaScript の量が大幅に減ります。
                </p>
                <CodeBlock
                  code={`// Server Component - marked はブラウザに送られない
import { marked } from 'marked';         // 50KB のライブラリ
import sanitizeHtml from 'sanitize-html'; // 200KB のライブラリ

export default async function BlogPost({ slug }: { slug: string }) {
  const post = await getPost(slug);
  const html = sanitizeHtml(marked(post.markdown));

  // ブラウザには HTML 文字列だけが送られる
  return <article dangerouslySetInnerHTML={{ __html: html }} />;
}
// → ユーザーのブラウザには 250KB のライブラリが送られない！`}
                  language="tsx"
                  title="バンドルサイズの削減"
                />
              </div>

              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">2. 直接的なデータアクセス</h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  Server Component からはデータベースや内部 API に直接アクセスできます。
                  REST API を経由する必要がないため、コードがシンプルになります。
                </p>
                <CodeBlock
                  code={`// Server Component - データベースに直接アクセス
import { db } from '@/lib/database';

export default async function ProductList() {
  // API エンドポイントを作る必要がない！
  const products = await db.product.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4">
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-gray-600">{product.price.toLocaleString()}円</p>
        </div>
      ))}
    </div>
  );
}`}
                  language="tsx"
                  title="直接的なデータベースアクセス"
                />
              </div>

              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">3. セキュリティの向上</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  API キー、データベースの接続情報、ビジネスロジックがブラウザに露出しません。
                  Server Component のコードはサーバー上でのみ実行されるため、機密情報を安全に扱えます。
                </p>
              </div>
            </div>
          </section>

          {/* セクション 3: async コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">async コンポーネント</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Server Components は <code className="text-sm bg-muted px-1.5 py-0.5 rounded">async</code> 関数として定義できます。
              これにより、コンポーネント内で直接 <code className="text-sm bg-muted px-1.5 py-0.5 rounded">await</code> を使ってデータを取得できます。
              従来の React では useEffect + useState パターンが必要でしたが、はるかにシンプルになります。
            </p>

            <CodeBlock
              code={`// 従来の React（Client Component）でのデータ取得
'use client';
import { useState, useEffect } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;
  if (!user) return null;

  return <div>{user.name}</div>;
}`}
              language="tsx"
              title="従来のパターン（複雑）"
            />

            <CodeBlock
              code={`// Server Component でのデータ取得
// useState も useEffect も不要！
export default async function UserProfile() {
  const user = await fetch('https://api.example.com/user').then(
    res => res.json()
  );

  return <div>{user.name}</div>;
}

// エラーハンドリングは error.tsx で行う
// ローディング表示は loading.tsx で行う
// → コンポーネント自体は「データがある状態」だけを考えればいい`}
              language="tsx"
              title="Server Component のパターン（シンプル）"
            />

            <InfoBox type="success" title="コードが劇的にシンプルに">
              <p>
                Server Component では、useState、useEffect、ローディング状態、エラー状態の管理がすべて不要になります。
                コンポーネントは「データがすでにある状態」で書けるため、デザイナーにとっても理解しやすいコードになります。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: Server Component でのデータ取得パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Server Component でのデータ取得パターン</h2>

            <CodeBlock
              code={`// パターン 1: fetch API を使う
export default async function Posts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return (
    <ul>
      {posts.slice(0, 5).map((post: { id: number; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// パターン 2: データベースに直接アクセス
import { prisma } from '@/lib/prisma';

export default async function Users() {
  const users = await prisma.user.findMany();
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// パターン 3: ファイルシステムにアクセス
import { readFile } from 'fs/promises';
import path from 'path';

export default async function Readme() {
  const content = await readFile(
    path.join(process.cwd(), 'README.md'),
    'utf-8'
  );
  return <pre>{content}</pre>;
}`}
              language="tsx"
              title="様々なデータ取得パターン"
            />

            <InfoBox type="warning" title="Server Component で使えないもの">
              <p>
                Server Component では以下の機能は使えません。これらが必要な場合は Client Component にする必要があります。<br />
                <strong>Hooks</strong>: useState, useEffect, useRef など<br />
                <strong>イベントハンドラ</strong>: onClick, onChange など<br />
                <strong>ブラウザ API</strong>: window, document, localStorage など
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: Server / Client の境界 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Server と Client の境界</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              実際のアプリケーションでは、Server Component と Client Component を組み合わせて使います。
              ページ全体を Server Component にしつつ、インタラクティブな部分だけを Client Component にする、
              というのが基本的なパターンです。
            </p>

            <CodeBlock
              code={`// app/products/[id]/page.tsx - Server Component
import { AddToCartButton } from './AddToCartButton';
import { ProductReviews } from './ProductReviews';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetch(
    \`https://api.example.com/products/\${id}\`
  ).then(res => res.json());

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* 静的な部分は Server Component のまま */}
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-2xl font-bold mt-4">
        {product.price.toLocaleString()}円
      </p>

      {/* インタラクティブな部分だけ Client Component */}
      <AddToCartButton productId={product.id} />

      {/* レビューセクション（静的な表示のみなら Server Component でOK） */}
      <ProductReviews productId={product.id} />
    </div>
  );
}`}
              language="tsx"
              title="Server と Client の組み合わせ"
            />

            <CodeBlock
              code={`// app/products/[id]/AddToCartButton.tsx - Client Component
'use client';

import { useState } from 'react';

export function AddToCartButton({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    // カートに追加するロジック
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      {added ? 'カートに追加しました！' : 'カートに追加'}
    </button>
  );
}`}
              language="tsx"
              title="Client Component 部分"
            />

            <InfoBox type="info" title="設計の基本原則">
              <p>
                「できるだけ Server Component を使い、インタラクティブな部分だけを Client Component にする」が基本原則です。
                ページ全体を <code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use client'</code> にするのは避けましょう。
                必要な部分だけを小さな Client Component として切り出すのがベストプラクティスです。
              </p>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Server Components - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/rendering/server-components',
                  description: 'Server Components のレンダリングとデータ取得',
                },
                {
                  title: 'Server Components - React',
                  url: 'https://ja.react.dev/reference/rsc/server-components',
                  description: 'React 公式の Server Components リファレンス',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
