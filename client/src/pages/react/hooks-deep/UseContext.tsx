import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function UseContext() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 13</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">useContext</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          「バケツリレー」を卒業しよう。アプリ全体で共有したいデータ（テーマ、ログイン状態、言語設定など）を、props を何階層も渡すことなく、どのコンポーネントからでも直接アクセスできるしくみを学びます。
        </p>

        <WhyNowBox tags={['useContext', 'グローバル状態', 'Props Drilling', 'Provider']}>
          <p>
            アプリが大きくなると、あるデータを深い階層のコンポーネントに渡すために何段もの props リレーが必要になります。
            これを「Props Drilling（プロップス・ドリリング）」と呼び、コードが複雑で壊れやすくなる原因です。
            useContext を使えば、<strong>必要なコンポーネントから直接データを取り出せる</strong>ので、中間のコンポーネントがスッキリします。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: Props Drilling の問題 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Props Drilling の問題</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              まず、Context を使わない場合にどんな問題が起きるか見てみましょう。
              たとえば「ダークモード」の設定を深い階層のコンポーネントに渡す場合:
            </p>
            <CodeBlock
              language="tsx"
              title="Props Drilling の例（つらいパターン）"
              code={`// App → Layout → Sidebar → SidebarItem に theme を渡したい

function App() {
  const [theme, setTheme] = useState('light');
  return <Layout theme={theme} setTheme={setTheme} />;
}

function Layout({ theme, setTheme }: LayoutProps) {
  // Layout 自身は theme を使わないのに、渡すためだけに受け取っている
  return (
    <div>
      <Sidebar theme={theme} setTheme={setTheme} />
      <Main theme={theme} />
    </div>
  );
}

function Sidebar({ theme, setTheme }: SidebarProps) {
  // Sidebar も theme を使わないが、子に渡すために受け取る
  return <SidebarItem theme={theme} setTheme={setTheme} />;
}

function SidebarItem({ theme, setTheme }: SidebarItemProps) {
  // やっとここで使う！
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      現在のテーマ: {theme}
    </button>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="身近なたとえ">
                <p>
                  Figma でたとえると、Props Drilling はマスターコンポーネントの色をインスタンスに変更するために、
                  途中の全フレームにひとつずつ変数を設定しているような状態です。
                  Context は「デザイントークン」のように、どの階層からでも直接参照できるグローバルな値の仕組みです。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 2: Context の基本 3 ステップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Context の 3 ステップ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Context を使うには、3 つの手順を踏みます:
            </p>
            <ol className="list-decimal list-inside text-muted-foreground mb-6 space-y-2">
              <li><strong>createContext</strong> で Context を作成する</li>
              <li><strong>Provider</strong> で値を供給する（上位コンポーネント）</li>
              <li><strong>useContext</strong> で値を取り出す（下位コンポーネント）</li>
            </ol>

            <h3 className="text-lg font-semibold text-foreground mb-3">ステップ 1: Context を作成する</h3>
            <CodeBlock
              language="tsx"
              title="ThemeContext.tsx"
              showLineNumbers
              code={`import { createContext } from 'react';

// Context の型を定義
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Context を作成（デフォルト値を渡す）
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ステップ 2: Provider で値を供給する</h3>
            <CodeBlock
              language="tsx"
              title="ThemeProvider コンポーネント"
              showLineNumbers
              code={`import { useState, ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ステップ 3: useContext で値を取り出す</h3>
            <CodeBlock
              language="tsx"
              title="任意のコンポーネントから直接アクセス"
              showLineNumbers
              code={`import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemeToggleButton() {
  // useContext で ThemeContext の値を直接取得
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={
        theme === 'dark'
          ? 'bg-gray-800 text-white p-3 rounded'
          : 'bg-white text-gray-800 p-3 rounded border'
      }
    >
      {theme === 'dark' ? 'ダークモード' : 'ライトモード'}
    </button>
  );
}

// このコンポーネントは App の何階層下にあっても OK！
// props で theme を渡す必要がない`}
            />
          </section>

          {/* セクション 3: Provider の配置 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Provider の配置場所</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Provider は、その値を使いたいコンポーネントの「上位」に配置します。
              アプリ全体で使う値なら、最上位の App コンポーネントで囲みます。
            </p>
            <CodeBlock
              language="tsx"
              title="App.tsx で Provider を配置"
              code={`import { ThemeProvider } from './context/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      {/* ThemeProvider の中のすべてのコンポーネントが
          useContext(ThemeContext) を使える */}
      <Layout>
        <Sidebar />
        <Main />
      </Layout>
    </ThemeProvider>
  );
}

// もはや Layout や Sidebar に theme props を渡す必要なし！`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="複数の Provider を重ねる">
                <p>
                  アプリが複雑になると、テーマ、認証、言語など複数の Context が必要になります。
                  Provider は入れ子にできるので、必要な分だけ重ねましょう。
                </p>
              </InfoBox>
            </div>

            <CodeBlock
              language="tsx"
              title="複数の Provider を重ねる"
              code={`function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <Layout />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}`}
            />
          </section>

          {/* セクション 4: 完全なテーマ切り替えの実装 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: テーマ切り替え機能を作る</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでの知識をまとめて、完全なテーマ切り替え機能を実装してみましょう。
              Context の作成、Provider、カスタム Hook までを 1 つのファイルにまとめるパターンです。
            </p>
            <CodeBlock
              language="tsx"
              title="context/ThemeContext.tsx（完全版）"
              showLineNumbers
              code={`import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// 型定義
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

// Context 作成
const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

// Provider コンポーネント
export function ThemeProvider({ children }: { children: ReactNode }) {
  // localStorage から初期値を読み込む
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });

  // テーマが変わったら localStorage に保存 & HTML に反映
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark: theme === 'dark' }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// カスタム Hook（useContext をラップ）
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useTheme は ThemeProvider の中で使ってください'
    );
  }
  return context;
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="カスタム Hook でラップするメリット">
                <p>
                  <code>useContext(ThemeContext)</code> を直接使う代わりに、<code>useTheme()</code> というカスタム Hook を作ることで:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Provider の外で使ったときにエラーメッセージが出る（デバッグが楽）</li>
                  <li>import が 1 つで済む（ThemeContext を知らなくてよい）</li>
                  <li>将来の実装変更に強い</li>
                </ul>
              </InfoBox>
            </div>

            <CodePreview
              title="テーマ切り替えの動作デモ → ボタンを押してみよう"
              previewHeight={260}
              code={`const ThemeContext = React.createContext({
  isDark: false,
  toggleTheme: () => {},
})

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = React.useState(false)
  const toggleTheme = () => setIsDark((prev) => !prev)
  return (
    React.createElement(ThemeContext.Provider, { value: { isDark, toggleTheme } }, children)
  )
}

function useTheme() {
  return React.useContext(ThemeContext)
}

function Header() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <header style={{
      padding: '12px 16px',
      backgroundColor: isDark ? '#1F2937' : '#F9FAFB',
      color: isDark ? '#F9FAFB' : '#1F2937',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '8px',
      marginBottom: '12px',
    }}>
      <h1 style={{ fontSize: '16px', fontWeight: 'bold' }}>My App</h1>
      <button onClick={toggleTheme} style={{
        padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer',
        backgroundColor: isDark ? '#3B82F6' : '#2563EB', color: 'white', fontSize: '13px',
      }}>
        {isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
      </button>
    </header>
  )
}

function Card({ title, children }) {
  const { isDark } = useTheme()
  return (
    <div style={{
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid',
      borderColor: isDark ? '#374151' : '#E5E7EB',
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      color: isDark ? '#F9FAFB' : '#1F2937',
      marginBottom: '8px',
    }}>
      <h2 style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '14px' }}>{title}</h2>
      {children}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Card title="カード 1"><p style={{ fontSize: '13px' }}>Context でテーマが共有されています</p></Card>
      <Card title="カード 2"><p style={{ fontSize: '13px' }}>どの階層でも useTheme() で取得できます</p></Card>
    </ThemeProvider>
  )
}
`}
            />
            <CodeBlock
              language="tsx"
              title="テーマを使うコンポーネント（コード例）"
              code={`import { useTheme } from './context/ThemeContext';

function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        {isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
      </button>
    </header>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  const { isDark } = useTheme();

  return (
    <div className={
      isDark
        ? 'bg-gray-800 text-white border-gray-700 rounded-lg p-4 border'
        : 'bg-white text-gray-900 border-gray-200 rounded-lg p-4 border'
    }>
      <h2 className="font-bold mb-2">{title}</h2>
      {children}
    </div>
  );
}`}
            />
          </section>

          {/* セクション 5: 複数 Context の組み合わせ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">複数 Context の組み合わせ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              実際のアプリでは、テーマ、認証、言語、通知など複数の Context を組み合わせて使います。
              それぞれの Context を独立して作成し、必要な場所で useContext を呼ぶことで、
              関心の分離を保ちながらグローバルなデータ共有が実現できます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">言語切り替え Context</h3>
            <CodeBlock
              language="tsx"
              title="context/LanguageContext.tsx"
              showLineNumbers
              code={`import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

type Language = 'ja' | 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ja: { greeting: 'こんにちは', logout: 'ログアウト', settings: '設定' },
  en: { greeting: 'Hello', logout: 'Logout', settings: 'Settings' },
  zh: { greeting: '你好', logout: '登出', settings: '设置' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ja');

  // 簡易的な翻訳関数
  const t = (key: string): string => {
    return translations[language][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage は LanguageProvider の中で使ってください');
  }
  return context;
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">複数の Context を組み合わせて使う</h3>
            <CodePreview
              title="テーマ + 言語切り替えデモ → 操作してみよう"
              previewHeight={180}
              code={`const ThemeCtx = React.createContext({ isDark: false, toggleTheme: () => {} })
const LangCtx = React.createContext({ language: 'ja', setLanguage: () => {}, t: (k) => k })

const translations = {
  ja: { greeting: 'こんにちは', settings: '設定' },
  en: { greeting: 'Hello', settings: 'Settings' },
  zh: { greeting: '你好', settings: '设置' },
}

function Providers({ children }) {
  const [isDark, setIsDark] = React.useState(false)
  const [language, setLanguage] = React.useState('ja')
  const t = (key) => translations[language][key] || key
  return (
    React.createElement(ThemeCtx.Provider, { value: { isDark, toggleTheme: () => setIsDark(p => !p) } },
      React.createElement(LangCtx.Provider, { value: { language, setLanguage, t } }, children)
    )
  )
}

function Header() {
  const { isDark, toggleTheme } = React.useContext(ThemeCtx)
  const { language, setLanguage, t } = React.useContext(LangCtx)
  return (
    <header style={{
      padding: '12px 16px', borderRadius: '8px', marginBottom: '12px',
      backgroundColor: isDark ? '#1F2937' : '#F9FAFB',
      color: isDark ? '#F9FAFB' : '#1F2937',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px',
    }}>
      <h1 style={{ fontSize: '16px', fontWeight: 'bold' }}>{t('greeting')}</h1>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button onClick={toggleTheme} style={{ padding: '4px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: isDark ? '#3B82F6' : '#2563EB', color: 'white', fontSize: '12px' }}>
          {isDark ? 'Light' : 'Dark'}
        </button>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '12px' }}>
          <option value="ja">日本語</option>
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
      </div>
    </header>
  )
}

function Content() {
  const { isDark } = React.useContext(ThemeCtx)
  const { t } = React.useContext(LangCtx)
  return (
    <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid', borderColor: isDark ? '#374151' : '#E5E7EB', backgroundColor: isDark ? '#1F2937' : '#fff', color: isDark ? '#F9FAFB' : '#1F2937' }}>
      <p style={{ fontSize: '13px' }}>{t('settings')} - 複数の Context を組み合わせています</p>
    </div>
  )
}

function App() {
  return (
    <Providers>
      <Header />
      <Content />
    </Providers>
  )
}
`}
            />
            <CodeBlock
              language="tsx"
              title="複数 Context を消費するコンポーネント（コード例）"
              showLineNumbers
              code={`import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';
import { useAuth } from './context/AuthContext';

function Header() {
  // 3 つの Context からそれぞれ必要な値を取得
  const { isDark, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <header className={isDark ? 'bg-gray-900 text-white' : 'bg-white'}>
      <h1>{t('greeting')}{isLoggedIn ? \`, \${user?.name}\` : ''}</h1>

      <div className="flex gap-2">
        {/* テーマ切り替え */}
        <button onClick={toggleTheme}>
          {isDark ? 'Light' : 'Dark'}
        </button>

        {/* 言語切り替え */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'ja' | 'en' | 'zh')}
        >
          <option value="ja">日本語</option>
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>

        {/* ログアウト */}
        {isLoggedIn && (
          <button onClick={logout}>{t('logout')}</button>
        )}
      </div>
    </header>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="Provider のネスト順序">
                <p>
                  Provider 同士に依存関係がある場合、依存される側を外側に配置します。
                  たとえば AuthProvider が ThemeProvider に依存する場合は、ThemeProvider を外側に置きます。
                  依存関係がなければ順序は自由ですが、よく使われる「テーマ → 認証 → 言語」のような慣習に従うと読みやすくなります。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 6: Context vs Props Drilling の判断基準 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Context vs Props Drilling の判断基準</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Context は強力ですが、すべての props リレーを Context に置き換えるべきではありません。
              どちらを使うかの判断基準を見てみましょう。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">シナリオ</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">推奨</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">理由</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">親→子の 1-2 段の props 受け渡し</td>
                    <td className="py-3 px-4 font-medium">Props</td>
                    <td className="py-3 px-4">シンプルで追跡しやすい</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">テーマ、認証、言語などアプリ全体の設定</td>
                    <td className="py-3 px-4 font-medium">Context</td>
                    <td className="py-3 px-4">多くのコンポーネントが必要とするデータ</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">中間コンポーネントが props を使わず通過させるだけ</td>
                    <td className="py-3 px-4 font-medium">Context</td>
                    <td className="py-3 px-4">Props Drilling の典型的なケース</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">コンポーネントの再利用性を保ちたい</td>
                    <td className="py-3 px-4 font-medium">Props</td>
                    <td className="py-3 px-4">Context に依存すると再利用しにくくなる</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">頻繁に変わる値（入力中のテキストなど）</td>
                    <td className="py-3 px-4 font-medium">Props / State</td>
                    <td className="py-3 px-4">Context は全消費者を再レンダーさせる</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">Context の代わりに「コンポジション」を使う</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Props Drilling の解決策は Context だけではありません。
              「コンポーネント合成（コンポジション）」で、中間コンポーネントが props を受け渡す必要をなくすこともできます。
            </p>
            <CodeBlock
              language="tsx"
              title="コンポジションで Props Drilling を回避"
              showLineNumbers
              code={`// NG: Props Drilling
function App() {
  const [user, setUser] = useState(currentUser);
  return <Layout user={user} />; // Layout → Sidebar → UserMenu に渡す
}

// OK: コンポジション（children を使う）
function App() {
  const [user, setUser] = useState(currentUser);

  return (
    <Layout
      sidebar={
        // App が直接 UserMenu を作る → Layout は user を知らなくてよい
        <Sidebar>
          <UserMenu user={user} />
        </Sidebar>
      }
    >
      <Main />
    </Layout>
  );
}

function Layout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  // Layout は user props を受け取る必要がない！
  return (
    <div className="flex">
      {sidebar}
      <main>{children}</main>
    </div>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="コンポジション vs Context の使い分け">
                <p>
                  コンポジションは「特定のコンポーネントにだけ渡したい」場合に適しています。
                  一方、Context は「ツリーのどこからでもアクセスしたい」場合に適しています。
                  React 公式ドキュメントでも、Context を使う前にまずコンポジションを検討することを推奨しています。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 7: 認証情報の共有 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">もう一つの実例: 認証情報の共有</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              テーマと並んで Context がよく使われるのが、ログインユーザーの情報です。
              ヘッダーにユーザー名を表示したり、認証状態に応じてページを出し分けたりするケースです。
            </p>
            <CodeBlock
              language="tsx"
              title="context/AuthContext.tsx"
              showLineNumbers
              code={`import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // 実際は API にリクエストを送る
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setUser(data.user);
  };

  const logout = () => {
    setUser(null);
    // 実際は API にログアウトリクエストも送る
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth は AuthProvider の中で使ってください');
  }
  return context;
}`}
            />

            <CodeBlock
              language="tsx"
              title="認証状態に応じた表示"
              code={`import { useAuth } from './context/AuthContext';

function UserMenu() {
  const { user, isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    return <a href="/login">ログイン</a>;
  }

  return (
    <div className="flex items-center gap-3">
      <img
        src={user!.avatarUrl}
        alt={user!.name}
        className="w-8 h-8 rounded-full"
      />
      <span>{user!.name}</span>
      <button onClick={logout} className="text-sm text-red-500">
        ログアウト
      </button>
    </div>
  );
}`}
            />
          </section>

          {/* セクション 8: パフォーマンスの落とし穴 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">パフォーマンスの落とし穴と対策</h2>

            <div className="mb-6">
              <InfoBox type="warning" title="Context の値が変わると全消費者が再レンダーされる">
                <p>
                  Provider の value が変わると、useContext でその値を読んでいるすべてのコンポーネントが再レンダーされます。
                  頻繁に変わる値（マウス位置、入力中のテキストなど）を Context に入れると、パフォーマンスが悪化することがあります。
                </p>
              </InfoBox>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">問題: value オブジェクトの不必要な再生成</h3>
            <CodeBlock
              language="tsx"
              title="NG: レンダーのたびに新しいオブジェクトが作られる"
              code={`function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // NG: レンダーのたびに新しいオブジェクトが作られる
  // → Context の消費者がすべて再レンダーされる
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => setTheme((p) => p === 'light' ? 'dark' : 'light'),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}`}
            />

            <CodeBlock
              language="tsx"
              title="OK: useMemo で value を安定させる"
              showLineNumbers
              code={`import { useMemo, useCallback } from 'react';

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // useCallback で関数を安定させる
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // useMemo で value オブジェクトを安定させる
  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">対策: Context を分割する</h3>
            <CodeBlock
              language="tsx"
              title="Context を分割してパフォーマンスを改善"
              code={`// NG: すべてを 1 つの Context に詰め込む
const AppContext = createContext({
  theme: 'light',
  user: null,
  language: 'ja',
  notifications: [],
  // ...
});

// OK: 関心ごとに Context を分割する
const ThemeContext = createContext<ThemeContextType>(...);
const AuthContext = createContext<AuthContextType>(...);
const LanguageContext = createContext<LanguageContextType>(...);
const NotificationContext = createContext<NotificationContextType>(...);

// theme が変わっても AuthContext を使うコンポーネントは再レンダーされない`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">対策: state と dispatch を別の Context にする</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              次のステップで学ぶ useReducer と組み合わせる場合、state（読み取り）と dispatch（操作）を
              別々の Context に分けることで、dispatch しか使わないコンポーネント（ボタンなど）は
              state が変わっても再レンダーされなくなります。
            </p>
            <CodeBlock
              language="tsx"
              title="state と dispatch の分離"
              code={`// state 用の Context
const TodoStateContext = createContext<TodoState | undefined>(undefined);

// dispatch 用の Context
const TodoDispatchContext = createContext<Dispatch<TodoAction> | undefined>(
  undefined
);

function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// state が変わっても AddButton は再レンダーされない
function AddButton() {
  const dispatch = useContext(TodoDispatchContext);
  return (
    <button onClick={() => dispatch?.({ type: 'add', payload: '新規' })}>
      追加
    </button>
  );
}`}
            />

            <div className="mt-6">
              <InfoBox type="info" title="Context は万能薬ではない">
                <p>
                  Context は「多くのコンポーネントで共有する、あまり頻繁に変わらないデータ」に最適です。
                  複雑な状態管理が必要な場合は、次のステップで学ぶ useReducer と組み合わせたり、
                  Zustand や Jotai といった状態管理ライブラリの導入を検討しましょう。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Context の Provider の外で useContext を呼ぶとどうなりますか？"
              options={[
                { label: 'エラーが発生してアプリがクラッシュする' },
                { label: 'createContext に渡したデフォルト値が返される', correct: true },
                { label: 'undefined が返される' },
                { label: '空のオブジェクトが返される' },
              ]}
              explanation="Provider の外で useContext を呼ぶと、createContext() に渡したデフォルト値が返されます。ただし、これは意図しない使い方であることが多いため、カスタム Hook でラップして Provider の外で使った場合にエラーを投げるようにするのがベストプラクティスです。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Context の value が変更されたとき、再レンダーされるのはどのコンポーネントですか？"
              options={[
                { label: 'Provider の子孫すべてのコンポーネント' },
                { label: 'useContext でその Context を購読しているコンポーネントのみ', correct: true },
                { label: 'Provider の直接の子コンポーネントのみ' },
                { label: 'アプリ全体のすべてのコンポーネント' },
              ]}
              explanation="Context の値が変わったとき、再レンダーされるのは useContext でその Context を購読（消費）しているコンポーネントだけです。ただし、再レンダーされたコンポーネントの子も通常どおり再レンダーされる点に注意してください。React.memo でラップされた子は props が変わらなければスキップされます。"
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="テーマ + 言語の 2 つの Context を作る"
              description="ThemeProvider と useTheme の ___ を埋めてください。Context の Provider で値を渡し、カスタム Hook で useContext を使って値を取り出すパターンです。"
              initialCode={`import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => setTheme((p) => (p === 'light' ? 'dark' : 'light'));

  return (
    <___.___ value={{ theme, toggleTheme }}> // ← ここを埋める（Context の Provider）
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = ___(ThemeContext); // ← ここを埋める（Hook 名）
  if (!context) throw new Error('useTheme は ThemeProvider の中で使ってください');
  return context;
}`}
              answer={`import { createContext, useContext, useState, ReactNode } from 'react';

// Theme Context
type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => setTheme((p) => (p === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme は ThemeProvider の中で使ってください');
  return context;
}

// Language Context
type Language = 'ja' | 'en';
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ja');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage は LanguageProvider の中で使ってください');
  return context;
}`}
              keywords={['ThemeContext.Provider', 'useContext(']}
              hints={[
                'Context の値を子コンポーネントに渡すには Context.Provider を使います',
                'Context から値を取り出す Hook は useContext です',
              ]}
            />
          </section>

          {/* セクション 9: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="bg-muted/30 rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">1</span>
                <p className="text-muted-foreground"><strong>Context は Props Drilling を解消する</strong>。中間コンポーネントを経由せずに、深い階層にデータを届けられる</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">2</span>
                <p className="text-muted-foreground"><strong>3 ステップで使える</strong>。createContext で作成 → Provider で供給 → useContext で取得</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">3</span>
                <p className="text-muted-foreground"><strong>カスタム Hook でラップ</strong>すると、使いやすさとエラーハンドリングが向上する</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">4</span>
                <p className="text-muted-foreground"><strong>複数の Context を組み合わせ</strong>て、テーマ・認証・言語などの関心事を分離できる</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">5</span>
                <p className="text-muted-foreground"><strong>パフォーマンスに注意</strong>。useMemo で value を安定させ、Context を適切に分割する</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">6</span>
                <p className="text-muted-foreground"><strong>Context の前にコンポジションを検討</strong>する。すべてを Context にする必要はない</p>
              </div>
            </div>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'useContext - React 公式リファレンス',
                  url: 'https://ja.react.dev/reference/react/useContext',
                  description: 'useContext の API 仕様、使い方、注意点を網羅した公式ドキュメント',
                },
                {
                  title: 'コンテクストで深くデータを渡す - React 公式ガイド',
                  url: 'https://ja.react.dev/learn/passing-data-deeply-with-context',
                  description: 'Context の基本的な使い方を学べるチュートリアル',
                },
                {
                  title: 'コンテクストでステートをスケールする - React 公式ガイド',
                  url: 'https://ja.react.dev/learn/scaling-up-with-reducer-and-context',
                  description: 'useReducer と useContext を組み合わせたパターン',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'Context と Redux や Zustand の違いは何ですか？',
                  answer: 'Context は React 組み込みの「値を渡すしくみ」であり、厳密には状態管理ライブラリではありません。Redux や Zustand は状態管理に特化しており、ミドルウェア、DevTools、セレクタによる部分的な再レンダー制御などの機能を備えています。小〜中規模のアプリなら Context + useReducer で十分ですが、大規模で頻繁に更新される状態を扱う場合は専用ライブラリの方がパフォーマンスと開発体験で優れます。',
                },
                {
                  question: 'Context の値をネストした Provider で上書きできますか？',
                  answer: 'はい。同じ Context の Provider を入れ子にすると、最も近い Provider の値が使われます。これは「テーマの一部だけダークモードにする」といったケースで便利です。たとえばアプリ全体は light テーマだが、フッターだけ dark テーマにする、といった実装が可能です。',
                },
                {
                  question: 'サーバーコンポーネント（RSC）で Context は使えますか？',
                  answer: 'React Server Components では useContext を直接呼ぶことはできません。Context は「Provider → 子コンポーネント」というクライアントサイドの仕組みであり、Server Components にはその概念がないためです。Server Components から Client Components に Props を渡し、Client Components 側で Context を利用するパターンが推奨されています。',
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
