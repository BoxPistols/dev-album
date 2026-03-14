import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function React19Features() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 18</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">React 19 の新機能</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React 19 では Hooks 以外にも多くの新機能が追加されました。
          ref の扱いが簡単に、メタデータをコンポーネントから直接管理でき、
          React Compiler による自動メモ化でパフォーマンスチューニングの手間が大幅に減ります。
        </p>

        <WhyNowBox tags={['ref as prop', 'Document Metadata', 'React Compiler', 'エラーレポーティング']}>
          <p>
            React 19 の新機能は「開発者の手間を減らす」ことに重点を置いています。
            forwardRef のような<strong>ボイラープレートの削減</strong>、
            メタデータ管理の<strong>標準化</strong>、
            そして React Compiler による<strong>自動最適化</strong>。
            これらを理解することで、よりシンプルで高速な React アプリケーションが構築できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: ref as prop */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ref as prop: forwardRef が不要に</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React 19 では、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">ref</code> を
              通常の props として直接受け取れるようになりました。
              これにより、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">forwardRef</code> でコンポーネントをラップする必要がなくなります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">従来のパターン（React 18 以前）</h3>
            <CodeBlock
              language="tsx"
              title="forwardRef を使った旧パターン"
              showLineNumbers
              code={`import { forwardRef } from 'react';

// forwardRef でラップが必要だった
const FancyInput = forwardRef<HTMLInputElement, { label: string }>(
  function FancyInput({ label }, ref) {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} className="border rounded px-3 py-2" />
      </div>
    );
  }
);

// 使用側
function Form() {
  const inputRef = useRef<HTMLInputElement>(null);
  return <FancyInput ref={inputRef} label="名前" />;
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">React 19 の新パターン</h3>
            <CodeBlock
              language="tsx"
              title="ref を直接 props で受け取る新パターン"
              showLineNumbers
              code={`import { useRef } from 'react';

// forwardRef なしで ref を props として受け取れる！
function FancyInput({
  label,
  ref,
}: {
  label: string;
  ref?: React.Ref<HTMLInputElement>;
}) {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} className="border rounded px-3 py-2" />
    </div>
  );
}

// 使用側は変わらない
function Form() {
  const inputRef = useRef<HTMLInputElement>(null);
  return <FancyInput ref={inputRef} label="名前" />;
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="移行は段階的でOK">
                <p>
                  <code>forwardRef</code> は React 19 でも引き続き動作します。
                  ただし将来のバージョンで非推奨になる予定なので、新しいコンポーネントでは
                  ref を直接 props で受け取るパターンを使いましょう。
                  既存の forwardRef コンポーネントは、リファクタリングの機会に徐々に移行すれば問題ありません。
                </p>
              </InfoBox>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ref コールバックのクリーンアップ</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React 19 では、ref コールバックからクリーンアップ関数を返せるようになりました。
              これにより、DOM ノードのマウント・アンマウント時の処理がより明確に書けます。
            </p>

            <CodeBlock
              language="tsx"
              title="ref コールバックのクリーンアップ"
              showLineNumbers
              code={`function MeasuredDiv() {
  return (
    <div
      ref={(node) => {
        if (node) {
          // マウント時: サイズ監視を開始
          const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
              console.log('サイズ変更:', entry.contentRect);
            }
          });
          observer.observe(node);

          // クリーンアップ関数を返す（React 19 の新機能）
          return () => {
            observer.disconnect();
          };
        }
      }}
    >
      リサイズを監視するコンテンツ
    </div>
  );
}`}
            />
          </section>

          {/* セクション 2: Document Metadata */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Document Metadata: タイトルやメタタグの管理</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React 19 では、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;title&gt;</code>、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;meta&gt;</code>、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;link&gt;</code> を
              コンポーネント内で直接レンダリングできます。
              React がこれらの要素を自動的に <code>&lt;head&gt;</code> に移動してくれます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">従来のパターン</h3>
            <CodeBlock
              language="tsx"
              title="react-helmet を使った旧パターン"
              code={`// React 18 以前: react-helmet や react-helmet-async が必要だった
import { Helmet } from 'react-helmet-async';

function BlogPost({ post }: { post: Post }) {
  return (
    <>
      <Helmet>
        <title>{post.title} | My Blog</title>
        <meta name="description" content={post.summary} />
        <meta property="og:title" content={post.title} />
      </Helmet>
      <article>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </article>
    </>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">React 19 の新パターン</h3>
            <CodeBlock
              language="tsx"
              title="コンポーネントから直接メタデータをレンダリング"
              showLineNumbers
              code={`// React 19: サードパーティライブラリ不要！
function BlogPost({ post }: { post: Post }) {
  return (
    <article>
      {/* React が自動的に <head> に移動する */}
      <title>{post.title} | My Blog</title>
      <meta name="description" content={post.summary} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.summary} />
      <link rel="canonical" href={\`https://example.com/blog/\${post.slug}\`} />

      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}

// 各ページコンポーネントが自分のメタデータを管理
function ProductPage({ product }: { product: Product }) {
  return (
    <div>
      <title>{product.name} - ショップ</title>
      <meta name="description" content={product.description} />

      <h1>{product.name}</h1>
      <p>\u00A5{product.price.toLocaleString()}</p>
    </div>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="SSR との連携">
                <p>
                  Document Metadata は SSR（サーバーサイドレンダリング）でも正しく動作します。
                  React がサーバー上でレンダリングする際、<code>&lt;title&gt;</code> や <code>&lt;meta&gt;</code> を
                  自動的に HTML の <code>&lt;head&gt;</code> セクションに配置します。
                  Next.js や Remix などのフレームワークとも互換性があります。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 3: Stylesheet サポート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Stylesheet サポート: スタイルシートの優先度制御</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React 19 では、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;link rel="stylesheet"&gt;</code> に
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">precedence</code> 属性を指定することで、
              スタイルシートの読み込み順序を制御できます。
              React がスタイルシートの読み込み完了を待ってからコンポーネントを表示するため、
              スタイルのちらつき（FOUC）を防げます。
            </p>

            <CodeBlock
              language="tsx"
              title="Stylesheet の優先度制御"
              showLineNumbers
              code={`function App() {
  return (
    <div>
      {/* precedence で読み込み順序を制御 */}
      {/* "default" < "high" の順で適用される */}
      <link rel="stylesheet" href="/styles/reset.css" precedence="default" />
      <link rel="stylesheet" href="/styles/global.css" precedence="default" />
      <link rel="stylesheet" href="/styles/theme.css" precedence="high" />

      <MainContent />
    </div>
  );
}

function DashboardPage() {
  return (
    <div>
      {/* このページ固有のスタイルシート */}
      {/* コンポーネントがレンダリングされたときだけ読み込まれる */}
      <link rel="stylesheet" href="/styles/dashboard.css" precedence="default" />

      <h1>ダッシュボード</h1>
      <DashboardWidgets />
    </div>
  );
}

function ProfilePage() {
  return (
    <div>
      {/* 別のページ固有のスタイルシート */}
      <link rel="stylesheet" href="/styles/profile.css" precedence="default" />

      <h1>プロフィール</h1>
      <ProfileDetails />
    </div>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="重複排除と読み込み順序">
                <p>
                  同じ <code>href</code> のスタイルシートが複数のコンポーネントで指定されても、
                  React は 1 回だけ読み込みます（重複排除）。
                  <code>precedence</code> は CSS のカスケード順序に対応し、
                  React が DOM 内でのスタイルシートの配置順を管理します。
                </p>
              </InfoBox>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">非同期スクリプトのサポート</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              スタイルシートと同様に、<code>&lt;script async&gt;</code> もコンポーネント内で宣言でき、
              重複排除されます。
            </p>

            <CodeBlock
              language="tsx"
              title="async スクリプトの宣言"
              code={`function Analytics() {
  return (
    <div>
      {/* async スクリプトもコンポーネント内で宣言可能 */}
      {/* 同じ src のスクリプトは重複排除される */}
      <script async src="https://analytics.example.com/script.js" />

      <AnalyticsDashboard />
    </div>
  );
}

function ChatWidget() {
  return (
    <div>
      {/* 別のコンポーネントでも同じスクリプトを宣言できる */}
      {/* React が重複を自動で排除する */}
      <script async src="https://chat.example.com/widget.js" />

      <ChatUI />
    </div>
  );
}`}
            />
          </section>

          {/* セクション 4: React Compiler */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React Compiler: 自動メモ化</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React Compiler（旧称: React Forget）は、コンポーネントの再レンダリングを自動的に最適化するコンパイラです。
              これにより、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">useMemo</code>、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useCallback</code>、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">React.memo</code> を
              手動で書く必要がほとんどなくなります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">手動メモ化の問題点</h3>
            <CodeBlock
              language="tsx"
              title="従来: 手動でメモ化を管理"
              showLineNumbers
              code={`import { useMemo, useCallback, memo } from 'react';

// 問題 1: メモ化し忘れる
// 問題 2: 依存配列を間違える
// 問題 3: どこにメモ化が必要かの判断が難しい

function ProductList({ products, category }: Props) {
  // useMemo: 計算結果のキャッシュ
  const filteredProducts = useMemo(
    () => products.filter((p) => p.category === category),
    [products, category]  // 依存配列を正確に管理する必要あり
  );

  // useCallback: 関数のキャッシュ
  const handleSort = useCallback(
    (field: string) => {
      // ソート処理
    },
    [] // 依存配列を忘れるとバグの原因に
  );

  return (
    <div>
      {filteredProducts.map((product) => (
        // React.memo: コンポーネントのキャッシュ
        <MemoizedProductCard key={product.id} product={product} onSort={handleSort} />
      ))}
    </div>
  );
}

// memo でラップが必要
const MemoizedProductCard = memo(function ProductCard({ product, onSort }: CardProps) {
  return <div>{product.name}</div>;
});`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">React Compiler が解決すること</h3>
            <CodeBlock
              language="tsx"
              title="React Compiler 導入後: メモ化不要"
              showLineNumbers
              code={`// React Compiler が自動でメモ化を行うため、
// useMemo, useCallback, memo が不要に！

function ProductList({ products, category }: Props) {
  // コンパイラが自動で products と category が
  // 変わったときだけ再計算するようにしてくれる
  const filteredProducts = products.filter(
    (p) => p.category === category
  );

  // コンパイラが自動で安定した参照を保つ
  const handleSort = (field: string) => {
    // ソート処理
  };

  return (
    <div>
      {filteredProducts.map((product) => (
        // memo でラップしなくても、コンパイラが
        // 不要な再レンダリングをスキップしてくれる
        <ProductCard key={product.id} product={product} onSort={handleSort} />
      ))}
    </div>
  );
}

// memo 不要！
function ProductCard({ product, onSort }: CardProps) {
  return <div>{product.name}</div>;
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">React Compiler の導入方法</h3>
            <CodeBlock
              language="bash"
              title="インストール"
              code={`# Babel プラグインをインストール
npm install -D babel-plugin-react-compiler

# ESLint プラグイン（推奨）
npm install -D eslint-plugin-react-compiler`}
            />

            <CodeBlock
              language="tsx"
              title="Vite での設定例"
              showLineNumbers
              code={`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', {
            // オプション設定
          }],
        ],
      },
    }),
  ],
});`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="warning" title="React Compiler の現状">
                <p>
                  React Compiler は React 19 とともにリリースされましたが、
                  まだ成熟途上のツールです。小規模なプロジェクトから段階的に導入し、
                  動作を検証しながら範囲を広げることを推奨します。
                  既存の useMemo / useCallback はそのまま残しても問題なく、
                  コンパイラが自動的に最適化します。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 5: 改善されたエラーレポーティング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">改善されたエラーレポーティング</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React 19 では、エラーハンドリングが大幅に改善されました。
              重複するエラーログの排除、Hydration エラーの詳細化など、
              デバッグがより効率的になります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">エラーログの重複排除</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React 18 では、レンダリング中のエラーが 2 回ログに出力されていました
              （1 回はキャッチされたエラー、もう 1 回は再スロー）。
              React 19 ではこの重複が解消され、1 回のエラーログに統一されます。
            </p>

            <CodeBlock
              language="tsx"
              title="React 18 のエラーログ（重複あり）"
              code={`// React 18 のコンソール出力:
// 1. Uncaught Error: エラーメッセージ
//    at Component (Component.tsx:10)
// 2. Error: エラーメッセージ          ← 重複！
//    at Component (Component.tsx:10)
// 3. The above error occurred in the <Component> component...

// React 19 のコンソール出力:
// 1. Error: エラーメッセージ
//    at Component (Component.tsx:10)
// → 重複なし、情報が明確`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">onCaughtError と onUncaughtError</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              createRoot に新しいエラーハンドリングオプションが追加されました。
              Error Boundary でキャッチされたエラーとされなかったエラーを区別して処理できます。
            </p>

            <CodeBlock
              language="tsx"
              title="新しいエラーハンドリングオプション"
              showLineNumbers
              code={`import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!, {
  // Error Boundary でキャッチされたエラー
  onCaughtError: (error, errorInfo) => {
    console.log('キャッチされたエラー:', error.message);
    console.log('コンポーネントスタック:', errorInfo.componentStack);
    // エラー監視サービスに送信（重大度: warning）
    reportToErrorService(error, { severity: 'warning' });
  },

  // Error Boundary でキャッチされなかったエラー
  onUncaughtError: (error, errorInfo) => {
    console.error('未キャッチのエラー:', error.message);
    // エラー監視サービスに送信（重大度: critical）
    reportToErrorService(error, { severity: 'critical' });
  },

  // Hydration 中のリカバリーエラー
  onRecoverableError: (error, errorInfo) => {
    console.warn('リカバリーエラー:', error.message);
    reportToErrorService(error, { severity: 'info' });
  },
});

root.render(<App />);`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Hydration エラーの改善</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              SSR 使用時の Hydration ミスマッチエラーが、より詳細で分かりやすくなりました。
              差分が diff 形式で表示され、何が違うのかが一目で分かります。
            </p>

            <CodeBlock
              language="tsx"
              title="改善された Hydration エラーメッセージ"
              code={`// React 18 の Hydration エラー:
// "Text content does not match. Server: "Hello" Client: "World""
// → 場所が分かりにくい

// React 19 の Hydration エラー:
// Hydration failed because the server rendered HTML didn't match the client.
// As a result this tree will be regenerated on the client.
//
// +  <div>
// +    <p>
// -      Hello    ← サーバー
// +      World    ← クライアント
// +    </p>
// +  </div>
// → diff 形式でどこが違うか明確に表示`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="デバッグ効率の向上">
                <p>
                  これらのエラーレポーティングの改善により、
                  本番環境でのエラー分類（キャッチ済み / 未キャッチ）が容易になり、
                  Hydration エラーの原因特定が格段に速くなります。
                  特にチーム開発では、エラーの重大度に応じた適切なアラート設定が可能になります。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 6: その他の改善 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">その他の注目すべき改善点</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">Context を Provider なしで使用</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React 19 では <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;Context.Provider&gt;</code> の代わりに
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;Context&gt;</code> を直接レンダリングできます。
            </p>

            <CodeBlock
              language="tsx"
              title="Context の簡略化"
              showLineNumbers
              code={`import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

// React 18: <ThemeContext.Provider> が必要
function AppOld() {
  return (
    <ThemeContext.Provider value="dark">
      <MainContent />
    </ThemeContext.Provider>
  );
}

// React 19: <ThemeContext> を直接使える
function AppNew() {
  return (
    <ThemeContext value="dark">
      <MainContent />
    </ThemeContext>
  );
}
// ThemeContext.Provider は将来非推奨になる予定`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">preload / preinit API</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              リソースの事前読み込みを宣言的に制御する新しい API が追加されました。
            </p>

            <CodeBlock
              language="tsx"
              title="リソースの事前読み込み"
              showLineNumbers
              code={`import { prefetchDNS, preconnect, preload, preinit } from 'react-dom';

function AppShell() {
  // DNS の事前解決
  prefetchDNS('https://api.example.com');

  // コネクションの事前確立
  preconnect('https://cdn.example.com');

  // リソースの事前読み込み（キャッシュに入れる）
  preload('https://cdn.example.com/fonts/inter.woff2', { as: 'font' });
  preload('/hero-image.webp', { as: 'image' });

  // スクリプトの事前初期化（読み込み + 実行）
  preinit('https://cdn.example.com/analytics.js', { as: 'script' });

  return <App />;
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="パフォーマンス最適化に有効">
                <p>
                  これらの preload API を使うと、ユーザーが実際にリソースを必要とする前に
                  ブラウザが事前にダウンロードを開始できます。特にフォント、画像、外部スクリプトの
                  読み込み時間を短縮するのに効果的です。React が自動的に適切な
                  <code>&lt;link rel="preload"&gt;</code> タグを <code>&lt;head&gt;</code> に挿入します。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 7: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="bg-muted/30 rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">1</span>
                <p className="text-muted-foreground">
                  <strong>ref as prop</strong>: forwardRef が不要に。ref を通常の props として直接受け取れる
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">2</span>
                <p className="text-muted-foreground">
                  <strong>Document Metadata</strong>: title, meta, link をコンポーネントから直接レンダリング。react-helmet 不要
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">3</span>
                <p className="text-muted-foreground">
                  <strong>Stylesheet サポート</strong>: precedence 属性でスタイルシートの読み込み順序と表示タイミングを制御
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">4</span>
                <p className="text-muted-foreground">
                  <strong>React Compiler</strong>: useMemo / useCallback / memo を自動化。手動メモ化が不要に
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">5</span>
                <p className="text-muted-foreground">
                  <strong>エラーレポーティング改善</strong>: 重複排除、onCaughtError / onUncaughtError、Hydration エラーの詳細化
                </p>
              </div>
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="React 19 での ref の扱いについて正しい説明はどれですか？"
              options={[
                { label: 'ref は引き続き forwardRef でのみ渡せる' },
                { label: 'ref は廃止され、代わりに useImperativeHandle を使う' },
                { label: 'ref を通常の props として受け取れるようになり、forwardRef が不要になった', correct: true },
                { label: 'ref は関数コンポーネントでは使えなくなった' },
              ]}
              explanation="React 19 では ref を通常の props として直接受け取れます。forwardRef でコンポーネントをラップする必要がなくなりました。forwardRef 自体はまだ動作しますが、新しいコードでは props で直接受け取るパターンが推奨されます。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="React Compiler について正しい説明はどれですか？"
              options={[
                { label: 'TypeScript を JavaScript にコンパイルするツール' },
                { label: 'コンポーネントの再レンダリングを自動的に最適化し、手動の useMemo/useCallback を不要にする', correct: true },
                { label: 'React コンポーネントをネイティブアプリにコンパイルするツール' },
                { label: 'JSX を HTML に変換するためのサーバーサイドツール' },
              ]}
              explanation="React Compiler はビルド時にコードを解析し、不要な再レンダリングを自動的に排除する最適化を行います。これにより、開発者が手動で useMemo、useCallback、React.memo を書いてパフォーマンスを最適化する必要がほとんどなくなります。"
            />
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'React 19 リリースブログ',
                  url: 'https://ja.react.dev/blog/2024/12/05/react-19',
                  description: 'React 19 の全新機能を紹介する公式ブログ記事',
                },
                {
                  title: 'React Compiler',
                  url: 'https://ja.react.dev/learn/react-compiler',
                  description: 'React Compiler の仕組み、導入方法、対応状況',
                },
                {
                  title: 'リソースの事前読み込み - React 公式',
                  url: 'https://ja.react.dev/reference/react-dom#resource-preloading-apis',
                  description: 'preload, preinit, prefetchDNS, preconnect の API リファレンス',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'React Compiler を導入すると、既存の useMemo / useCallback は削除すべきですか？',
                  answer: 'いいえ、既存のコードはそのまま残して問題ありません。React Compiler は既存のメモ化コードと共存できます。コンパイラが自動メモ化を行うため、既存の useMemo / useCallback は冗長になりますが、削除しなくても害はありません。新しいコードから段階的にメモ化の記述を省略していくのがおすすめです。',
                },
                {
                  question: 'Document Metadata は Next.js の Metadata API と競合しますか？',
                  answer: 'Next.js の Metadata API（export const metadata や generateMetadata）は Next.js 固有の機能で、React 19 の Document Metadata とは異なるレイヤーで動作します。Next.js を使っている場合は、Next.js の Metadata API を引き続き使うことが推奨されます。React 19 の Document Metadata は、フレームワークなしで React を使っている場合や、フレームワークが独自のメタデータ API を持たない場合に特に有用です。',
                },
                {
                  question: 'ref コールバックのクリーンアップ関数を返すと、TypeScript でエラーになりますか？',
                  answer: 'React 19 の型定義（@types/react 19）では、ref コールバックからクリーンアップ関数を返すことが型として許可されています。ただし、@types/react 18 の型定義を使っている場合はエラーになる可能性があるため、@types/react を 19 にアップデートしてください。React 19 本体と型定義のバージョンを揃えることが重要です。',
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
