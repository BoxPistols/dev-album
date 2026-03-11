import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function DataFetching() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 37</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">データフェッチング</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Next.js でのデータ取得の方法を学びます。サーバーサイドでの fetch、キャッシュ戦略、再検証、並列データ取得、
          そして Suspense を使ったストリーミングまで、実践的なパターンを理解しましょう。
        </p>

        <WhyNowBox tags={['fetch', 'キャッシュ', 'revalidate', '並列取得', 'Suspense']}>
          <p>
            データの取得方法はアプリのパフォーマンスを大きく左右します。
            Next.js はサーバーサイドでの fetch を拡張し、キャッシュや再検証を簡単に制御できるようにしています。
            正しいパターンを知ることで、高速で最新のデータを表示するアプリを作れます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: サーバーサイド fetch */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">サーバーサイド fetch</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Server Component では、標準の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">fetch</code> API を使ってデータを取得します。
              Next.js はこの fetch を拡張して、キャッシュや再検証の機能を追加しています。
            </p>

            <CodeBlock
              code={`// app/posts/page.tsx
// Server Component でのデータ取得（基本）
type Post = {
  id: number;
  title: string;
  body: string;
};

export default async function PostsPage() {
  // サーバーで実行される fetch
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');

  if (!res.ok) {
    throw new Error('データの取得に失敗しました');
  }

  const posts: Post[] = await res.json();

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">投稿一覧</h1>
      <div className="space-y-4">
        {posts.slice(0, 10).map((post) => (
          <article key={post.id} className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-gray-600 mt-1 line-clamp-2">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}`}
              language="tsx"
              title="基本的なデータ取得"
            />

            <InfoBox type="info" title="fetch はサーバーで実行される">
              <p>
                Server Component 内の fetch はサーバー上で実行されます。
                そのため、API キーをヘッダーに含めても、ブラウザには露出しません。
                また、データソースがサーバーと同じネットワーク内にある場合、レイテンシーが大幅に低減されます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: キャッシュ戦略 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">キャッシュ戦略</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js の fetch は、キャッシュの動作をオプションで制御できます。
              適切なキャッシュ戦略を選ぶことで、パフォーマンスとデータの鮮度を両立できます。
            </p>

            <CodeBlock
              code={`// 1. デフォルト: キャッシュなし（Next.js 15 以降）
// Next.js 15 では fetch はデフォルトでキャッシュされない（no-store 相当）
const res = await fetch('https://api.example.com/data');

// 2. 明示的にキャッシュする（静的データに推奨）
// 変更頻度の低いデータには force-cache を指定する
const res2 = await fetch('https://api.example.com/static-data', {
  cache: 'force-cache',
});

// 3. 時間ベースの再検証（ISR）
// 指定秒数の間はキャッシュを使い、期限切れ後に再取得
const res3 = await fetch('https://api.example.com/posts', {
  next: { revalidate: 60 }, // 60秒ごとに再検証
});

// 4. タグベースの再検証
// 特定のイベント時にキャッシュを無効化
const res4 = await fetch('https://api.example.com/products', {
  next: { tags: ['products'] }, // 'products' タグを付ける
});
// → revalidateTag('products') でキャッシュを無効化できる`}
              language="tsx"
              title="キャッシュオプション"
            />

            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">戦略</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">使い所</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">例</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">デフォルト（no-store）</td>
                    <td className="py-3 px-4">常に最新データを取得（Next.js 15 以降）</td>
                    <td className="py-3 px-4">ダッシュボード、在庫数</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">force-cache</td>
                    <td className="py-3 px-4">変更頻度の低い静的データ</td>
                    <td className="py-3 px-4">会社概要、静的コンテンツ</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">revalidate: N</td>
                    <td className="py-3 px-4">定期的に更新</td>
                    <td className="py-3 px-4">ブログ記事、ニュース</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">tags</td>
                    <td className="py-3 px-4">イベント駆動で更新</td>
                    <td className="py-3 px-4">商品情報（更新時に無効化）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* セクション 3: 再検証（Revalidation） */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">再検証（Revalidation）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              キャッシュされたデータを更新する方法は2つあります。
              時間ベースの自動再検証と、オンデマンド（手動）の再検証です。
            </p>

            <CodeBlock
              code={`// 時間ベースの再検証
// ページ単位で設定する場合
export const revalidate = 60; // このページ全体を60秒ごとに再検証

export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  // ...
}

// fetch 単位で設定する場合
const data1 = await fetch(url1, { next: { revalidate: 30 } });  // 30秒
const data2 = await fetch(url2, { next: { revalidate: 3600 } }); // 1時間`}
              language="tsx"
              title="時間ベースの再検証"
            />

            <CodeBlock
              code={`// オンデマンド再検証（Server Action や Route Handler から）
import { revalidatePath, revalidateTag } from 'next/cache';

// パスベースの再検証
// 指定パスのキャッシュをすべて無効化
export async function updatePost(id: string, data: FormData) {
  'use server';

  await db.post.update({ where: { id }, data: { /* ... */ } });

  // /blog ページのキャッシュを無効化
  revalidatePath('/blog');

  // 特定の記事ページも無効化
  revalidatePath(\`/blog/\${id}\`);
}

// タグベースの再検証
// 特定のタグが付いた fetch のキャッシュを無効化
export async function updateProduct(id: string) {
  'use server';

  await db.product.update({ where: { id }, data: { /* ... */ } });

  // 'products' タグが付いたすべての fetch キャッシュを無効化
  revalidateTag('products');
}`}
              language="tsx"
              title="オンデマンド再検証"
            />

            <InfoBox type="success" title="タグベース再検証の便利さ">
              <p>
                タグベースの再検証を使うと、「商品データが更新されたら、商品一覧ページも個別ページもすべて更新」
                といった柔軟な制御が可能です。パスをひとつひとつ指定する必要がありません。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: 並列データ取得 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">並列データ取得</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              複数のデータを取得する場合、順番に取得するとウォーターフォール（滝のように連鎖的な遅延）が発生します。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">Promise.all</code> を使って並列に取得しましょう。
            </p>

            <CodeBlock
              code={`// NG: ウォーターフォール（順番に取得）
export default async function Dashboard() {
  const user = await fetchUser();        // 200ms 待つ
  const posts = await fetchPosts();      // さらに 300ms 待つ
  const analytics = await fetchAnalytics(); // さらに 250ms 待つ
  // 合計: 750ms

  return (
    <div>
      <UserProfile user={user} />
      <PostList posts={posts} />
      <Analytics data={analytics} />
    </div>
  );
}

// OK: 並列取得
export default async function Dashboard() {
  // すべてのリクエストを同時に開始
  const [user, posts, analytics] = await Promise.all([
    fetchUser(),        // 200ms
    fetchPosts(),       // 300ms
    fetchAnalytics(),   // 250ms
  ]);
  // 合計: 300ms（最も遅いリクエストの時間）

  return (
    <div>
      <UserProfile user={user} />
      <PostList posts={posts} />
      <Analytics data={analytics} />
    </div>
  );
}`}
              language="tsx"
              title="並列 vs 直列データ取得"
            />

            <InfoBox type="warning" title="ウォーターフォールに注意">
              <p>
                async/await を連続で書くとウォーターフォールになります。
                互いに依存しないデータ取得は必ず <code className="text-sm bg-muted px-1.5 py-0.5 rounded">Promise.all</code> で並列化しましょう。
                ただし、前のリクエストの結果が次のリクエストに必要な場合（ユーザー情報 → そのユーザーの投稿）は直列で問題ありません。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: Suspense でストリーミング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Suspense でストリーミング</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              React の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">Suspense</code> を使うと、
              データの取得が完了した部分から順次表示する「ストリーミング」を実現できます。
              ユーザーは遅いデータの取得を待たずに、ページの一部を先に見ることができます。
            </p>

            <CodeBlock
              code={`import { Suspense } from 'react';

// メインページ（Server Component）
export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-6 p-8">
      <h1 className="col-span-2 text-3xl font-bold">ダッシュボード</h1>

      {/* すぐに表示される */}
      <div className="col-span-2">
        <WelcomeMessage />
      </div>

      {/* データ取得中はスケルトンを表示 */}
      <Suspense fallback={<CardSkeleton />}>
        <RevenueChart />  {/* データ取得に2秒かかる */}
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <RecentOrders />  {/* データ取得に1秒かかる */}
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <CustomerTable />  {/* データ取得に3秒かかる */}
      </Suspense>
    </div>
  );
}

// スケルトンコンポーネント
function CardSkeleton() {
  return (
    <div className="border rounded-lg p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="col-span-2 border rounded-lg p-6 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-10 bg-gray-200 rounded mb-2" />
      ))}
    </div>
  );
}

// 各コンポーネントは独立してデータを取得
async function RevenueChart() {
  const data = await fetch('https://api.example.com/revenue', {
    cache: 'no-store',
  }).then(res => res.json());
  return <div className="border rounded-lg p-6">売上チャート: {data.total}</div>;
}

async function RecentOrders() {
  const orders = await fetch('https://api.example.com/orders', {
    cache: 'no-store',
  }).then(res => res.json());
  return <div className="border rounded-lg p-6">最近の注文: {orders.length}件</div>;
}`}
              language="tsx"
              title="Suspense を使ったストリーミング"
              showLineNumbers
            />

            <InfoBox type="info" title="ストリーミングの仕組み">
              <p>
                Suspense で囲まれた各セクションは、データの取得が完了した順に表示されます。
                1秒で完了する RecentOrders が先に表示され、3秒かかる CustomerTable は後から表示されます。
                ユーザーはページが「段階的に完成していく」様子を見ることができ、体感速度が大幅に向上します。
              </p>
            </InfoBox>
          </section>

          {/* セクション 6: データ取得のベストプラクティス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">データ取得のベストプラクティス</h2>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold text-foreground mb-1">1. データは使う場所で取得する</h4>
                <p className="text-sm text-foreground/80">
                  親コンポーネントでまとめて取得して Props で流すより、各コンポーネントが必要なデータを直接取得するほうが良いです。
                  Next.js は同一レンダリングパス内で同じ URL への fetch を自動的にメモ化（Request Memoization）するため、パフォーマンスの心配は不要です。
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold text-foreground mb-1">2. 独立したデータは並列に取得する</h4>
                <p className="text-sm text-foreground/80">
                  Promise.all または Suspense を使って、互いに依存しないデータを並列に取得しましょう。
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold text-foreground mb-1">3. 適切なキャッシュ戦略を選ぶ</h4>
                <p className="text-sm text-foreground/80">
                  すべてのデータに no-store を使うのは避けましょう。変更頻度に応じて revalidate の秒数を設定するのがベストです。
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold text-foreground mb-1">4. Suspense でユーザー体験を向上</h4>
                <p className="text-sm text-foreground/80">
                  遅いデータ取得がある場合は Suspense で包み、スケルトン UI を表示しましょう。
                  デザイナーの腕の見せどころです。
                </p>
              </div>
            </div>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'データ取得 - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/data-fetching/fetching',
                  description: 'Server Components でのデータ取得パターン',
                },
                {
                  title: 'キャッシュ - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/caching',
                  description: 'Next.js のキャッシュメカニズムの全体像',
                },
                {
                  title: 'revalidatePath / revalidateTag - Next.js',
                  url: 'https://nextjs.org/docs/app/api-reference/functions/revalidatePath',
                  description: 'キャッシュの再検証 API',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
