import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function Routing() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 29</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">React Router</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          複数ページのアプリを作るための React Router を学びましょう。URL に応じたページの切り替え、
          ページ間のナビゲーション、動的なルーティングを実装します。
        </p>

        <WhyNowBox tags={['React Router', 'SPA', 'ルーティング', 'ナビゲーション']}>
          <p>
            React はデフォルトではシングルページアプリケーション（SPA）で、URL の切り替え機能がありません。
            React Router を使えば、<code>/about</code> や <code>/products/123</code> のように
            URL に応じて異なるコンポーネントを表示できます。
            実際のアプリ開発には必須の知識です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: インストールとセットアップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">インストールとセットアップ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React Router v7 をインストールし、基本的なルーティングを設定しましょう。
            </p>

            <CodeBlock
              language="bash"
              title="インストール"
              code={`pnpm add react-router`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="src/main.tsx — BrowserRouter の設定"
              showLineNumbers
              code={`import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);`}
            />

            <InfoBox type="info" title="BrowserRouter とは">
              <p>
                <code>BrowserRouter</code> は、ブラウザの History API を使って URL を管理します。
                アプリ全体を <code>BrowserRouter</code> で囲むことで、
                その中のすべてのコンポーネントで React Router の機能が使えるようになります。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: Routes と Route */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Routes と Route でページを定義する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>Routes</code> の中に <code>Route</code> を並べることで、URL とコンポーネントの対応を定義します。
            </p>

            <CodeBlock
              language="tsx"
              title="src/App.tsx — ルーティング定義"
              showLineNumbers
              code={`import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div>
      {/* 共通のヘッダー（すべてのページで表示） */}
      <Header />

      {/* URL に応じてページを切り替え */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* どのルートにもマッチしない場合（404 ページ） */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* 共通のフッター */}
      <Footer />
    </div>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="各ページコンポーネントの例"
              code={`// src/pages/Home.tsx
export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">ホーム</h1>
      <p className="text-gray-600">ようこそ！</p>
    </div>
  );
}

// src/pages/About.tsx
export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">私たちについて</h1>
      <p className="text-gray-600">チームの紹介ページです。</p>
    </div>
  );
}

// src/pages/NotFound.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <p className="text-xl text-gray-600 mt-4">ページが見つかりません</p>
      </div>
    </div>
  );
}`}
            />
          </section>

          {/* セクション3: Link と NavLink */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Link と NavLink でナビゲーション</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ページ間の移動には <code>Link</code> コンポーネントを使います。
              通常の <code>&lt;a&gt;</code> タグとは違い、ページのリロードなしで画面を切り替えます。
            </p>

            <CodeBlock
              language="tsx"
              title="Link と NavLink の使い方"
              showLineNumbers
              code={`import { Link, NavLink } from 'react-router';

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-6">
        {/* Link: シンプルなリンク */}
        <Link to="/" className="text-xl font-bold text-gray-900">
          MyApp
        </Link>

        {/* NavLink: 現在のページをハイライトできる */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-semibold'
              : 'text-gray-600 hover:text-gray-900'
          }
        >
          ホーム
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-semibold'
              : 'text-gray-600 hover:text-gray-900'
          }
        >
          概要
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-semibold'
              : 'text-gray-600 hover:text-gray-900'
          }
        >
          お問い合わせ
        </NavLink>
      </nav>
    </header>
  );
}`}
            />

            <InfoBox type="warning" title="a タグを使わない理由">
              <p>
                通常の <code>&lt;a href="/about"&gt;</code> タグを使うと、ページ全体がリロードされてしまいます。
                React Router の <code>Link</code> を使えば、JavaScript で画面の一部だけを差し替えるため、
                高速でスムーズなページ遷移が実現できます。これが SPA の大きなメリットです。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: useNavigate */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useNavigate でプログラム的に遷移</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ボタンクリックやフォーム送信後など、JavaScript のコードからページを遷移させるには
              <code>useNavigate</code> フックを使います。
            </p>

            <CodeBlock
              language="tsx"
              title="useNavigate の使い方"
              showLineNumbers
              code={`import { useNavigate } from 'react-router';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ログイン処理...
    const success = await login(email, password);

    if (success) {
      // ダッシュボードに遷移
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* フォームの中身 */}
      <button type="submit">ログイン</button>
    </form>
  );
}

// その他の使い方
function NavigationExamples() {
  const navigate = useNavigate();

  return (
    <div>
      {/* 特定のページに遷移 */}
      <button onClick={() => navigate('/settings')}>
        設定へ
      </button>

      {/* 前のページに戻る（ブラウザの戻るボタンと同じ） */}
      <button onClick={() => navigate(-1)}>
        戻る
      </button>

      {/* 現在のページを置き換え（履歴に残さない） */}
      <button onClick={() => navigate('/home', { replace: true })}>
        ホームへ（履歴に残さない）
      </button>
    </div>
  );
}`}
            />
          </section>

          {/* セクション5: useParams — 動的ルーティング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useParams — 動的ルーティング</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>/products/123</code> のように、URL の一部を変数として受け取るのが動的ルーティングです。
              商品詳細ページやユーザープロフィールページなどで使います。
            </p>

            <CodeBlock
              language="tsx"
              title="動的ルートの定義と使い方"
              showLineNumbers
              code={`// App.tsx でルート定義
<Routes>
  <Route path="/products" element={<ProductList />} />
  {/* :id が動的パラメータ */}
  <Route path="/products/:id" element={<ProductDetail />} />
  <Route path="/users/:userId/posts/:postId" element={<UserPost />} />
</Routes>

// ProductDetail.tsx — URL パラメータを取得
import { useParams, Link } from 'react-router';

function ProductDetail() {
  // URL が /products/42 の場合、id は "42"
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Link to="/products" className="text-blue-500 hover:underline">
        ← 商品一覧に戻る
      </Link>
      <h1 className="text-3xl font-bold mt-4">商品 #{id}</h1>
      {/* API から商品データを取得して表示 */}
    </div>
  );
}

// 複数のパラメータ
function UserPost() {
  const { userId, postId } = useParams<{
    userId: string;
    postId: string;
  }>();

  return (
    <div>
      <h1>ユーザー {userId} の投稿 {postId}</h1>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="useParams の型">
              <p>
                <code>useParams</code> が返す値は常に <code>string | undefined</code> です。
                数値として使いたい場合は <code>Number(id)</code> で変換してください。
                また、パラメータが undefined の場合のハンドリングも忘れずに行いましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション6: ネストされたルート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ネストされたルート</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ルートを入れ子にすることで、共通のレイアウト（サイドバーやヘッダー）を持つページ群を定義できます。
            </p>

            <CodeBlock
              language="tsx"
              title="ネストされたルートの構成"
              showLineNumbers
              code={`import { Routes, Route, Outlet, NavLink } from 'react-router';

// ダッシュボードのレイアウト（共通部分）
function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      {/* サイドバー（すべての子ルートで共通） */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            end // 完全一致のときだけアクティブ
            className={({ isActive }) =>
              \`block px-3 py-2 rounded \${
                isActive ? 'bg-gray-700' : 'hover:bg-gray-800'
              }\`
            }
          >
            概要
          </NavLink>
          <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) =>
              \`block px-3 py-2 rounded \${
                isActive ? 'bg-gray-700' : 'hover:bg-gray-800'
              }\`
            }
          >
            分析
          </NavLink>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              \`block px-3 py-2 rounded \${
                isActive ? 'bg-gray-700' : 'hover:bg-gray-800'
              }\`
            }
          >
            設定
          </NavLink>
        </nav>
      </aside>

      {/* メインコンテンツ（子ルートがここに描画される） */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

// ルート定義
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* ネストされたルート */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* index: /dashboard にアクセスしたときに表示 */}
        <Route index element={<DashboardOverview />} />
        <Route path="analytics" element={<DashboardAnalytics />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>
    </Routes>
  );
}`}
            />

            <InfoBox type="info" title="Outlet とは">
              <p>
                <code>Outlet</code> は「子ルートのコンポーネントが描画される場所」を示すプレースホルダーです。
                親ルートのレイアウトコンポーネント内に配置すると、URL に応じて子ルートの中身が切り替わります。
                Next.js の <code>layout.tsx</code> と <code>children</code> に似た考え方です。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: 実践 — マルチページアプリ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践：マルチページアプリの構成</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまで学んだ React Router の機能を使って、実際のアプリのルーティング構成を設計してみましょう。
            </p>

            <CodeBlock
              language="tsx"
              title="実践的なルーティング構成"
              showLineNumbers
              code={`import { Routes, Route } from 'react-router';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// ページコンポーネント
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      {/* メインレイアウト（ヘッダー + フッター） */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* 認証レイアウト（ヘッダーなし） */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ダッシュボード（サイドバー付き） */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// フォルダ構成
// src/
// ├── layouts/
// │   ├── MainLayout.tsx      （ヘッダー + Outlet + フッター）
// │   ├── AuthLayout.tsx      （シンプルな中央配置レイアウト）
// │   └── DashboardLayout.tsx （サイドバー + Outlet）
// ├── pages/
// │   ├── Home.tsx
// │   ├── ProductList.tsx
// │   ├── ProductDetail.tsx
// │   ├── Cart.tsx
// │   ├── Login.tsx
// │   ├── Register.tsx
// │   ├── Dashboard.tsx
// │   └── NotFound.tsx
// └── App.tsx`}
            />

            <InfoBox type="success" title="React Router のまとめ">
              <p>
                React Router を使えば、SPA でありながらマルチページのようなナビゲーション体験を実現できます。
                <code>Routes/Route</code> でページを定義し、<code>Link</code> でナビゲーション、
                <code>useNavigate</code> でプログラム的な遷移、<code>useParams</code> で動的パラメータを取得。
                ネストされたルートで共通レイアウトを実現。
                次のステップでは、これまで学んだすべてを組み合わせてポートフォリオサイトを制作します。
              </p>
            </InfoBox>
          </section>
        </div>

        {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'React Router 公式ドキュメント',
                  url: 'https://reactrouter.com/',
                  description: 'React Router v7 の公式ガイドと API リファレンス',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
