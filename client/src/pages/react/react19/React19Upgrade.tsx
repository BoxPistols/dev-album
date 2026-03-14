import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function React19Upgrade() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 19</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">React 19 アップグレードガイド</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React 18 から React 19 へのアップグレード方法を、手順ごとに解説します。
          破壊的変更を把握し、非推奨 API の移行を行い、スムーズにアップグレードしましょう。
          新しいプロジェクトでも、既存の非推奨パターンを避けるために知っておくべき内容です。
        </p>

        <WhyNowBox tags={['アップグレード', '破壊的変更', 'TypeScript', '移行チェックリスト']}>
          <p>
            React 19 は React 18 から多くの改善を含む一方で、
            長年「非推奨」とされてきた API がついに<strong>削除</strong>されました。
            このガイドでは、変更点をすべて把握し、最小限の修正で安全にアップグレードする方法を学びます。
            これから React を始める方も、避けるべき古いパターンを知るために目を通しておきましょう。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: アップグレード手順 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. アップグレード手順</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React 19 へのアップグレードは、パッケージの更新から始めます。
              以下の手順に従って進めましょう。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">ステップ 1: パッケージの更新</h3>
            <CodeBlock
              language="bash"
              title="npm でアップグレード"
              showLineNumbers
              code={`# React 本体と ReactDOM を更新
npm install react@19 react-dom@19

# TypeScript の型定義を更新
npm install -D @types/react@19 @types/react-dom@19

# バージョンを確認
npm list react react-dom`}
            />

            <CodeBlock
              language="bash"
              title="関連パッケージの互換性確認"
              showLineNumbers
              code={`# React 19 対応の ESLint プラグイン
npm install -D eslint-plugin-react-hooks@latest

# React Compiler（任意）
npm install -D babel-plugin-react-compiler
npm install -D eslint-plugin-react-compiler

# テストライブラリの更新
npm install -D @testing-library/react@latest`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="warning" title="React 18.3 を先にインストール">
                <p>
                  いきなり 19 にアップグレードする前に、まず <strong>React 18.3</strong>（18 系の最終バージョン）に
                  アップデートすることをお勧めします。18.3 では React 19 で削除される API について
                  <strong>非推奨の警告</strong>が表示されるため、事前に修正すべき箇所を把握できます。
                </p>
              </InfoBox>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ステップ 2: Codemod で自動変換</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React チームが提供する codemod ツールを使うと、多くの変更を自動的に適用できます。
            </p>

            <CodeBlock
              language="bash"
              title="codemod の実行"
              showLineNumbers
              code={`# React 19 向けの codemod を実行
npx codemod@latest react/19/migration-recipe

# 個別の codemod を実行することも可能
# PropTypes の削除
npx codemod@latest react/prop-types-typescript

# forwardRef の解除
npx codemod@latest react/19/replace-reactdom-render

# 変更後、必ず差分を確認
git diff`}
            />
          </section>

          {/* セクション 2: 破壊的変更 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. 破壊的変更まとめ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React 19 で削除された API と変更点をまとめます。
              これらの多くは React 16〜17 の時点ですでに非推奨とされていたものです。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">PropTypes の削除</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              実行時の型チェック機構である PropTypes が React パッケージから完全に削除されました。
              TypeScript を使っている場合は影響ありませんが、
              PropTypes を使っているプロジェクトは TypeScript に移行する必要があります。
            </p>

            <CodeBlock
              language="tsx"
              title="PropTypes → TypeScript への移行"
              showLineNumbers
              code={`// 旧: PropTypes（React 19 で削除）
import PropTypes from 'prop-types';

function Greeting({ name, age }) {
  return <p>{name}さん（{age}歳）</p>;
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
};

Greeting.defaultProps = {
  age: 20,
};

// 新: TypeScript で型定義
interface GreetingProps {
  name: string;
  age?: number;
}

function Greeting({ name, age = 20 }: GreetingProps) {
  return <p>{name}さん（{age}歳）</p>;
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">defaultProps の非推奨（関数コンポーネント）</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              関数コンポーネントの <code className="text-sm bg-muted px-1.5 py-0.5 rounded">defaultProps</code> は
              非推奨になりました。代わりにデフォルト引数（ES2015）を使用します。
              クラスコンポーネントの defaultProps は引き続きサポートされます。
            </p>

            <CodeBlock
              language="tsx"
              title="defaultProps → デフォルト引数"
              showLineNumbers
              code={`// 旧: defaultProps（関数コンポーネントでは非推奨）
function Button({ variant, size }: ButtonProps) {
  // ...
}
Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
};

// 新: デフォルト引数を使用
function Button({
  variant = 'primary',
  size = 'medium',
}: ButtonProps) {
  // ...
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Legacy Context の削除</h3>
            <CodeBlock
              language="tsx"
              title="Legacy Context → createContext + useContext"
              showLineNumbers
              code={`// 旧: Legacy Context API（React 19 で削除）
// childContextTypes / getChildContext を使ったパターン
class ThemeProvider extends React.Component {
  getChildContext() {
    return { theme: 'dark' };
  }
  render() {
    return this.props.children;
  }
}
ThemeProvider.childContextTypes = {
  theme: PropTypes.string,
};

// 新: createContext + useContext（React 16.3+ で利用可能）
const ThemeContext = createContext('light');

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext value="dark">
      {children}
    </ThemeContext>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>ボタン</button>;
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">String Refs の削除</h3>
            <CodeBlock
              language="tsx"
              title="String Refs → useRef / createRef"
              showLineNumbers
              code={`// 旧: String Refs（React 19 で削除）
class OldForm extends React.Component {
  handleSubmit = () => {
    // this.refs.input は文字列で参照
    const value = this.refs.input.value;
  };
  render() {
    return <input ref="input" />;
  }
}

// 新: useRef（関数コンポーネント）
function NewForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    const value = inputRef.current?.value;
  }

  return <input ref={inputRef} />;
}

// 新: createRef（クラスコンポーネント）
class NewFormClass extends React.Component {
  inputRef = createRef<HTMLInputElement>();

  handleSubmit = () => {
    const value = this.inputRef.current?.value;
  };

  render() {
    return <input ref={this.inputRef} />;
  }
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">その他の削除・変更</h3>
            <div className="bg-muted/30 rounded-xl p-6 mb-6">
              <ul className="list-disc list-inside text-muted-foreground space-y-3">
                <li>
                  <strong>react-dom/test-utils の削除</strong>: <code>act</code> は <code>react</code> パッケージからインポートします。
                  <code>ReactDOM.render</code> と <code>ReactDOM.unmountComponentAtNode</code> も削除されました。
                </li>
                <li>
                  <strong>ReactDOM.findDOMNode の削除</strong>: 代わりに ref を使用してください。
                </li>
                <li>
                  <strong>element.ref アクセスの非推奨</strong>: <code>element.ref</code> は削除予定です。
                  ref は props として渡されるようになりました。
                </li>
                <li>
                  <strong>react-dom/server の一部 API 削除</strong>:
                  <code>renderToStaticNodeStream</code> が削除されました。
                  <code>renderToString</code> は引き続き使えますが推奨されません。
                </li>
              </ul>
            </div>
          </section>

          {/* セクション 3: 非推奨 API の代替方法 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. 非推奨 API の代替方法テーブル</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              削除・非推奨になった API とその代替方法を一覧で確認できます。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">旧 API</th>
                    <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">状態</th>
                    <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">代替</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="border border-border px-4 py-2"><code className="text-sm bg-muted px-1 rounded">PropTypes</code></td>
                    <td className="border border-border px-4 py-2 text-red-500 font-semibold">削除</td>
                    <td className="border border-border px-4 py-2">TypeScript の型定義</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2"><code className="text-sm bg-muted px-1 rounded">defaultProps</code>（関数）</td>
                    <td className="border border-border px-4 py-2 text-yellow-600 font-semibold">非推奨</td>
                    <td className="border border-border px-4 py-2">ES2015 デフォルト引数</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2"><code className="text-sm bg-muted px-1 rounded">Legacy Context</code></td>
                    <td className="border border-border px-4 py-2 text-red-500 font-semibold">削除</td>
                    <td className="border border-border px-4 py-2"><code className="text-sm">createContext</code> + <code className="text-sm">useContext</code></td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2"><code className="text-sm bg-muted px-1 rounded">String Refs</code></td>
                    <td className="border border-border px-4 py-2 text-red-500 font-semibold">削除</td>
                    <td className="border border-border px-4 py-2"><code className="text-sm">useRef</code> / <code className="text-sm">createRef</code></td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2"><code className="text-sm bg-muted px-1 rounded">findDOMNode</code></td>
                    <td className="border border-border px-4 py-2 text-red-500 font-semibold">削除</td>
                    <td className="border border-border px-4 py-2">ref を使用</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2"><code className="text-sm bg-muted px-1 rounded">ReactDOM.render</code></td>
                    <td className="border border-border px-4 py-2 text-red-500 font-semibold">削除</td>
                    <td className="border border-border px-4 py-2"><code className="text-sm">createRoot().render()</code></td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2"><code className="text-sm bg-muted px-1 rounded">ReactDOM.hydrate</code></td>
                    <td className="border border-border px-4 py-2 text-red-500 font-semibold">削除</td>
                    <td className="border border-border px-4 py-2"><code className="text-sm">hydrateRoot()</code></td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2"><code className="text-sm bg-muted px-1 rounded">unmountComponentAtNode</code></td>
                    <td className="border border-border px-4 py-2 text-red-500 font-semibold">削除</td>
                    <td className="border border-border px-4 py-2"><code className="text-sm">root.unmount()</code></td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2"><code className="text-sm bg-muted px-1 rounded">react-dom/test-utils</code></td>
                    <td className="border border-border px-4 py-2 text-red-500 font-semibold">削除</td>
                    <td className="border border-border px-4 py-2"><code className="text-sm">act</code> は react から import</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2"><code className="text-sm bg-muted px-1 rounded">forwardRef</code></td>
                    <td className="border border-border px-4 py-2 text-yellow-600 font-semibold">将来非推奨</td>
                    <td className="border border-border px-4 py-2">ref を props で直接受け取る</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2"><code className="text-sm bg-muted px-1 rounded">Context.Provider</code></td>
                    <td className="border border-border px-4 py-2 text-yellow-600 font-semibold">将来非推奨</td>
                    <td className="border border-border px-4 py-2"><code className="text-sm">&lt;Context&gt;</code> を直接使用</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* セクション 4: createRoot / hydrateRoot */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. createRoot / hydrateRoot の変更点</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React 18 で導入された <code className="text-sm bg-muted px-1.5 py-0.5 rounded">createRoot</code> と
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">hydrateRoot</code> に、
              React 19 では新しいオプションが追加されました。
            </p>

            <CodeBlock
              language="tsx"
              title="createRoot の新しいオプション"
              showLineNumbers
              code={`import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root')!, {
  // React 19 で追加されたエラーハンドリングオプション

  // Error Boundary でキャッチされたエラー
  onCaughtError: (error, errorInfo) => {
    logToService('caught', error, errorInfo.componentStack);
  },

  // Error Boundary でキャッチされなかったエラー
  onUncaughtError: (error, errorInfo) => {
    logToService('uncaught', error, errorInfo.componentStack);
    // ユーザーにエラー画面を表示するなどの処理
  },

  // リカバリーエラー（Hydration ミスマッチなど）
  onRecoverableError: (error, errorInfo) => {
    logToService('recoverable', error, errorInfo.componentStack);
  },
});

root.render(<App />);`}
            />

            <CodeBlock
              language="tsx"
              title="hydrateRoot の変更点"
              showLineNumbers
              code={`import { hydrateRoot } from 'react-dom/client';

// React 19 の hydrateRoot
const root = hydrateRoot(
  document.getElementById('root')!,
  <App />,
  {
    onCaughtError: (error, errorInfo) => {
      // キャッチされたエラー
    },
    onUncaughtError: (error, errorInfo) => {
      // 未キャッチのエラー
    },
    onRecoverableError: (error, errorInfo) => {
      // Hydration ミスマッチなどのリカバリーエラー
      // React 19 ではミスマッチ時の diff 情報がより詳細に
    },
  }
);`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="render コールバックの削除">
                <p>
                  React 18 で非推奨だった <code>createRoot().render()</code> の第2引数（コールバック）が
                  React 19 で完全に削除されました。レンダリング後の処理には
                  <code>useEffect</code> や <code>requestIdleCallback</code> を使用してください。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 5: TypeScript の型変更 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. TypeScript の型変更</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">@types/react@19</code> では
              いくつかの型が変更されています。TypeScript を使っている場合、
              これらの変更に対応する必要があります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">useRef は引数が必須に</h3>
            <CodeBlock
              language="tsx"
              title="useRef の型変更"
              showLineNumbers
              code={`// React 18: 引数なしで呼べた
const ref = useRef<HTMLDivElement>(); // OK in React 18

// React 19: 引数が必須（null を明示する）
const ref = useRef<HTMLDivElement>(null); // React 19 ではこちらが必要

// 初期値なしのミュータブル ref
const countRef = useRef<number>(0);       // OK
const timerRef = useRef<number | null>(null); // OK`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">useRef の戻り値の型変化</h3>
            <CodeBlock
              language="tsx"
              title="MutableRefObject の変更"
              showLineNumbers
              code={`// React 18: useRef(null) は RefObject（.current が readonly）
// useRef(initialValue) は MutableRefObject

// React 19: useRef の戻り値が統一された
// useRef<T>(null) → RefObject<T | null>（.current は readonly）
// useRef<T>(value) → RefObject<T>（.current は readonly に見えるが書き換え可能）

// DOM 要素への ref（readonly でOK）
const divRef = useRef<HTMLDivElement>(null);
// divRef.current は HTMLDivElement | null

// ミュータブルな値の保存（明示的に null を型に含める）
const intervalRef = useRef<number | null>(null);
// intervalRef.current = window.setInterval(...); // OK`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ReactElement の型変更</h3>
            <CodeBlock
              language="tsx"
              title="ReactElement のジェネリクス"
              showLineNumbers
              code={`// React 18
// ReactElement<P, T> の props は P | null だった

// React 19
// ReactElement<P, T> の props は P になった（null が除外）
// 多くの場合、影響はありません

// 影響がある例: props に null をチェックしていた場合
function processElement(element: React.ReactElement) {
  // React 18: element.props は any | null
  // React 19: element.props は any（null ではない）
  const { children } = element.props; // null チェック不要に
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">JSX 名前空間の変更</h3>
            <CodeBlock
              language="tsx"
              title="JSX 名前空間"
              showLineNumbers
              code={`// React 18: グローバルな JSX 名前空間を使用
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'my-element': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

// React 19: React.JSX 名前空間を使用
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'my-element': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

// tsconfig.json で設定が必要な場合
// "jsx": "react-jsx" を使用していれば自動対応`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="warning" title="型エラーへの対処法">
                <p>
                  アップグレード後に型エラーが大量に出た場合、まず
                  <code>@types/react</code> と <code>@types/react-dom</code> が 19 系に
                  更新されているか確認してください。
                  また、<code>node_modules</code> を削除して再インストールすると
                  古いキャッシュが原因のエラーが解消される場合があります。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 6: 移行チェックリスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. 移行チェックリスト</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React 19 へのアップグレード時に確認すべき項目の一覧です。
              上から順番に対応していきましょう。
            </p>

            <div className="bg-muted/30 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">事前準備</h3>
              <ul className="list-none space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span>React 18.3 にアップデートし、非推奨の警告を確認</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span>テストスイートがすべてパスすることを確認</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span>Git で現在の状態をコミット（ロールバック用）</span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">パッケージ更新</h3>
              <ul className="list-none space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span><code className="text-sm bg-muted px-1 rounded">react</code> と <code className="text-sm bg-muted px-1 rounded">react-dom</code> を 19 に更新</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span><code className="text-sm bg-muted px-1 rounded">@types/react</code> と <code className="text-sm bg-muted px-1 rounded">@types/react-dom</code> を 19 に更新</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span><code className="text-sm bg-muted px-1 rounded">eslint-plugin-react-hooks</code> を最新に更新</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span>サードパーティライブラリの React 19 互換性を確認</span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">コードの修正</h3>
              <ul className="list-none space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span>PropTypes を使っている場合は TypeScript の型に移行</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span>defaultProps をデフォルト引数に置き換え</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span>String Refs を useRef / createRef に置き換え</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span>Legacy Context を createContext + useContext に移行</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span><code className="text-sm bg-muted px-1 rounded">findDOMNode</code> の使用箇所を ref に置き換え</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span><code className="text-sm bg-muted px-1 rounded">useRef</code> の呼び出しに <code className="text-sm bg-muted px-1 rounded">null</code> 引数を追加</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span><code className="text-sm bg-muted px-1 rounded">react-dom/test-utils</code> の <code className="text-sm bg-muted px-1 rounded">act</code> を <code className="text-sm bg-muted px-1 rounded">react</code> からインポートに変更</span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">テストと検証</h3>
              <ul className="list-none space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span>TypeScript のビルドが通ることを確認</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span>ユニットテストがすべてパスすることを確認</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span>開発サーバーでアプリが正常に動作することを確認</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span>本番ビルドが正常に完了することを確認</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-0.5">[ ]</span>
                  <span>ステージング環境でのテスト</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="段階的な移行を推奨">
                <p>
                  すべてを一度に移行する必要はありません。React 19 は多くの旧 API を削除しましたが、
                  <code>forwardRef</code> や <code>Context.Provider</code> など「将来非推奨」のものは
                  まだ動作します。まず破壊的変更（削除済み API）に対応し、
                  次に非推奨 API を段階的に移行していくアプローチが安全です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 7: よくあるエラーと対処法 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">よくあるエラーと対処法</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">サードパーティライブラリの互換性エラー</h3>
            <CodeBlock
              language="bash"
              title="peer dependency エラーへの対処"
              showLineNumbers
              code={`# よくあるエラー:
# npm ERR! Could not resolve dependency:
# npm ERR! peer react@"^18.0.0" from some-library@1.0.0

# 対処法 1: ライブラリのアップデートを確認
npm info some-library versions

# 対処法 2: --legacy-peer-deps で一時的にスキップ
npm install --legacy-peer-deps

# 対処法 3: overrides で強制的にバージョンを指定（package.json）
# {
#   "overrides": {
#     "some-library": {
#       "react": "^19.0.0"
#     }
#   }
# }`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">act のインポート変更</h3>
            <CodeBlock
              language="tsx"
              title="テストファイルの修正"
              showLineNumbers
              code={`// 旧: react-dom/test-utils からインポート（React 19 で削除）
import { act } from 'react-dom/test-utils';

// 新: react からインポート
import { act } from 'react';

// テストコードは変更不要
test('カウンターが増加する', async () => {
  const { result } = renderHook(() => useCounter());

  await act(async () => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="React 19 で完全に削除された API はどれですか？"
              options={[
                { label: 'forwardRef' },
                { label: 'String Refs と Legacy Context', correct: true },
                { label: 'useCallback と useMemo' },
                { label: 'Context.Provider' },
              ]}
              explanation="String Refs（ref='input' 形式）と Legacy Context（childContextTypes / getChildContext）は React 19 で完全に削除されました。forwardRef と Context.Provider はまだ動作しますが、将来のバージョンで非推奨になる予定です。useCallback と useMemo は引き続きサポートされています。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="React 19 の TypeScript 型定義で変更された useRef の挙動はどれですか？"
              options={[
                { label: 'useRef は非推奨になり、useState で代替すべき' },
                { label: 'useRef のジェネリクス型が不要になった' },
                { label: 'useRef は初期値の引数が必須になった（null を明示する必要がある）', correct: true },
                { label: 'useRef は DOM 要素にしか使えなくなった' },
              ]}
              explanation="@types/react@19 では useRef<T>() のように引数なしで呼ぶとエラーになります。DOM 要素への ref では useRef<HTMLDivElement>(null) のように null を明示的に渡す必要があります。これは型の安全性を向上させるための変更です。"
            />
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'React 19 にアップグレードする方法 - 公式ガイド',
                  url: 'https://ja.react.dev/blog/2024/04/25/react-19-upgrade-guide',
                  description: '破壊的変更と移行手順の公式ガイド',
                },
                {
                  title: 'React 19 リリースブログ',
                  url: 'https://ja.react.dev/blog/2024/12/05/react-19',
                  description: 'React 19 の全新機能と変更点のまとめ',
                },
                {
                  title: 'React 19 Codemod',
                  url: 'https://github.com/codemod-com/codemod',
                  description: 'コードの自動変換ツール。PropTypes 削除や API 変更を自動適用',
                },
                {
                  title: 'React TypeScript Cheatsheet',
                  url: 'https://react-typescript-cheatsheet.netlify.app/',
                  description: 'React + TypeScript の型定義パターン集（React 19 対応）',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'React 18 から 19 へのアップグレードは大変ですか？',
                  answer: 'プロジェクトの状態によります。TypeScript を使い、React 18 の新しい API（createRoot など）をすでに採用しているプロジェクトでは、変更は最小限です。一方、PropTypes、String Refs、Legacy Context などの古い API を多用しているプロジェクトでは、移行に時間がかかる場合があります。まず React 18.3 にアップデートして非推奨の警告を確認し、影響範囲を把握してから計画的に進めましょう。',
                },
                {
                  question: 'サードパーティライブラリが React 19 に対応していない場合はどうすべきですか？',
                  answer: '多くの人気ライブラリは React 19 に対応していますが、メンテナンスが活発でないライブラリは対応が遅れることがあります。対処法としては、(1) ライブラリの GitHub Issue で対応状況を確認、(2) npm の --legacy-peer-deps フラグで一時的にインストール、(3) package.json の overrides でバージョンを強制指定、(4) 代替ライブラリへの移行を検討、などがあります。',
                },
                {
                  question: 'React 19 にアップグレードしないとどうなりますか？',
                  answer: 'React 18 は引き続き動作し、セキュリティパッチも当面提供されます。ただし、新しい機能（useActionState、useOptimistic、React Compiler など）は使えません。また、新しいライブラリやフレームワークが React 19 を最低バージョンとして要求し始める可能性があります。急ぐ必要はありませんが、計画的に移行を進めることをお勧めします。',
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
