import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function CustomHooks() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 16</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">カスタム Hooks</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          自分だけのオリジナル Hook を作ろう。複数のコンポーネントで繰り返し使うロジックを「カスタム Hook」として切り出すことで、
          コードの重複を減らし、テストしやすく、読みやすいコードが書けます。
        </p>

        <WhyNowBox tags={['カスタムHooks', 'ロジックの再利用', 'useLocalStorage', 'useFetch']}>
          <p>
            ここまでで useState、useEffect、useContext、useReducer、useMemo、useCallback と多くの組み込み Hook を学びました。
            実際の開発では、これらを組み合わせたパターンが何度も登場します。
            カスタム Hook はそのパターンを<strong>「名前をつけて再利用可能にする」</strong>しくみです。
            React のコンポーネントが「UIの再利用」なら、カスタム Hook は「ロジックの再利用」です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: カスタム Hook とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">カスタム Hook とは？</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              カスタム Hook は「<code className="text-sm bg-muted px-1.5 py-0.5 rounded">use</code> から始まる名前の関数」で、
              中で他の Hook を使っているものです。コンポーネントではなく、ロジックだけを切り出した関数です。
            </p>
            <CodePreview
              title="useToggle カスタム Hook → ボタンを押してみよう"
              previewHeight={260}
              code={`function useToggle(initialValue) {
  const [value, setValue] = React.useState(initialValue || false)
  const toggle = () => setValue((prev) => !prev)
  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)
  return { value, toggle, setTrue, setFalse }
}

function Modal() {
  const { value: isOpen, toggle, setFalse: close } = useToggle()
  return (
    <div style={{ marginBottom: '16px' }}>
      <button onClick={toggle} style={{ padding: '6px 16px', borderRadius: '6px', backgroundColor: '#3B82F6', color: 'white', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
        モーダルを{isOpen ? '閉じる' : '開く'}
      </button>
      {isOpen && (
        <div style={{ marginTop: '8px', padding: '16px', border: '1px solid #D1D5DB', borderRadius: '8px', backgroundColor: '#F9FAFB' }}>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>モーダルの内容です</p>
          <button onClick={close} style={{ padding: '4px 12px', borderRadius: '6px', backgroundColor: '#6B7280', color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px' }}>閉じる</button>
        </div>
      )}
    </div>
  )
}

function DarkModeSwitch() {
  const { value: isDark, toggle } = useToggle()
  return (
    <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: isDark ? '#1F2937' : '#F9FAFB', color: isDark ? '#F9FAFB' : '#1F2937', display: 'inline-block' }}>
      <button onClick={toggle} style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '14px', backgroundColor: isDark ? '#3B82F6' : '#E5E7EB', color: isDark ? 'white' : '#374151' }}>
        {isDark ? 'ダークモード ON' : 'ライトモード ON'}
      </button>
    </div>
  )
}

function App() {
  return (
    <div style={{ padding: '16px' }}>
      <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>同じ useToggle を 2 箇所で使い回し:</p>
      <Modal />
      <DarkModeSwitch />
    </div>
  )
}
`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="命名規則: 必ず use から始める">
                <p>
                  カスタム Hook の名前は <strong>必ず <code>use</code> から始める</strong> 必要があります（例: <code>useToggle</code>, <code>useFetch</code>）。
                  これは React のルールで、ESLint がこのプレフィックスを使って「Hook のルール」を検証しています。
                  <code>use</code> を付けないと、他の Hook を中で呼べなくなります。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 2: useLocalStorage */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践 1: useLocalStorage</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ブラウザの localStorage にデータを保存・復元する処理を Hook にまとめます。
              useState と同じインターフェースで、自動的に永続化される state が作れます。
            </p>
            <CodeBlock
              language="tsx"
              title="hooks/useLocalStorage.ts"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // 初期値: localStorage に保存されていればそれを使う
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      console.warn(
        \`localStorage の読み込みに失敗しました: \${key}\`
      );
      return initialValue;
    }
  });

  // 値が変わったら localStorage に保存
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      console.warn(
        \`localStorage への保存に失敗しました: \${key}\`
      );
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}`}
            />

            <CodePreview
              title="useLocalStorage デモ → 値を変更してリロードしても保持されます"
              previewHeight={220}
              code={`function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch { return initialValue }
  })
  React.useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(storedValue)) } catch {}
  }, [key, storedValue])
  return [storedValue, setStoredValue]
}

function Settings() {
  const [name, setName] = useLocalStorage('demo-userName', '')
  const [fontSize, setFontSize] = useLocalStorage('demo-fontSize', 16)
  const [darkMode, setDarkMode] = useLocalStorage('demo-darkMode', false)

  return (
    <div style={{ padding: '16px', fontSize: fontSize + 'px', backgroundColor: darkMode ? '#1F2937' : '#fff', color: darkMode ? '#F9FAFB' : '#1F2937', borderRadius: '8px' }}>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>名前:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={{ border: '1px solid #D1D5DB', borderRadius: '6px', padding: '4px 8px', fontSize: '14px' }} />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>文字サイズ: {fontSize}px</label>
        <input type="range" min={12} max={24} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} />
      </div>
      <div>
        <label style={{ fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
          ダークモード
        </label>
      </div>
      <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '12px' }}>localStorage に自動保存されます</p>
    </div>
  )
}

function App() {
  return <Settings />
}
`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="デザイナーの日常でも便利">
                <p>
                  ユーザーの設定値（テーマ、フォントサイズ、サイドバーの開閉状態など）を
                  ページリロード後も保持したい場面は多いです。useLocalStorage があれば、
                  useState を 1 行置き換えるだけで永続化が完了します。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 3: useWindowSize */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践 2: useWindowSize</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ウィンドウサイズの変化をリアクティブに取得する Hook です。
              レスポンシブなレイアウトを JavaScript で制御したいときに使います。
            </p>
            <CodeBlock
              language="tsx"
              title="hooks/useWindowSize.ts"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      width,
      height,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}`}
            />

            <CodeBlock
              language="tsx"
              title="useWindowSize の使い方"
              code={`function ResponsiveLayout() {
  const { width, isMobile, isDesktop } = useWindowSize();

  return (
    <div>
      <p>現在の幅: {width}px</p>

      {isMobile ? (
        // モバイル: ハンバーガーメニュー
        <MobileMenu />
      ) : (
        // デスクトップ: サイドバー
        <Sidebar />
      )}

      <div className={isDesktop ? 'grid grid-cols-3 gap-4' : 'space-y-4'}>
        <Card title="カード 1" />
        <Card title="カード 2" />
        <Card title="カード 3" />
      </div>
    </div>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="CSS メディアクエリとの使い分け">
                <p>
                  レイアウトの切り替えだけなら CSS のメディアクエリ（Tailwind の <code>md:</code> や <code>lg:</code>）のほうが適切です。
                  useWindowSize は「ウィンドウサイズに応じてロジックを変えたい」（表示するデータ数を変える、グラフの種類を変えるなど）場合に使いましょう。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 4: useFetch */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践 3: useFetch</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              API データの取得は頻繁に行う処理です。loading、error、data の 3 状態管理と
              クリーンアップを Hook にまとめると、各コンポーネントでの記述が大幅に減ります。
            </p>
            <CodeBlock
              language="tsx"
              title="hooks/useFetch.ts"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            \`HTTP エラー: \${response.status}\`
          );
        }

        const json = (await response.json()) as T;
        setData(json);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return; // キャンセルされた場合は無視
        }
        setError(
          err instanceof Error ? err.message : '不明なエラー'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, fetchCount]);

  const refetch = () => setFetchCount((c) => c + 1);

  return { data, loading, error, refetch };
}`}
            />

            <CodeBlock
              language="tsx"
              title="useFetch の使い方"
              code={`interface Post {
  id: number;
  title: string;
  body: string;
}

function BlogPosts() {
  const { data: posts, loading, error, refetch } = useFetch<Post[]>(
    'https://jsonplaceholder.typicode.com/posts?_limit=10'
  );

  if (loading) return <p>読み込み中...</p>;
  if (error) return (
    <div>
      <p className="text-red-500">エラー: {error}</p>
      <button onClick={refetch}>再試行</button>
    </div>
  );

  return (
    <div>
      <button onClick={refetch} className="mb-4">
        データを再取得
      </button>
      <ul className="space-y-3">
        {posts?.map((post) => (
          <li key={post.id} className="border rounded p-4">
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-gray-600 text-sm">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 別のコンポーネントでも同じ Hook を再利用
function UserProfile({ userId }: { userId: number }) {
  const { data: user, loading } = useFetch<{ name: string; email: string }>(
    \`https://jsonplaceholder.typicode.com/users/\${userId}\`
  );

  if (loading) return <p>読み込み中...</p>;

  return (
    <div>
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
}`}
            />
          </section>

          {/* セクション 5: useDebounce */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践 4: useDebounce</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              検索入力のように「入力が止まってから処理したい」場合に使う Hook です。
              キー入力のたびに API を叩くのではなく、入力が落ち着いてから実行します。
            </p>
            <CodeBlock
              language="tsx"
              title="hooks/useDebounce.ts"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay ミリ秒後に値を更新
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 次の値が来たらタイマーをリセット
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}`}
            />

            <CodePreview
              title="useDebounce デモ → 入力してみよう（500ms 後に反映）"
              previewHeight={180}
              code={`function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

function SearchDemo() {
  const [query, setQuery] = React.useState('')
  const debouncedQuery = useDebounce(query, 500)
  const updateCount = React.useRef(0)
  const prevDebounced = React.useRef('')

  if (prevDebounced.current !== debouncedQuery) {
    updateCount.current += 1
    prevDebounced.current = debouncedQuery
  }

  return (
    <div style={{ padding: '16px' }}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="何か入力してみてください..." style={{ width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px', padding: '8px 12px', fontSize: '14px', marginBottom: '12px' }} />
      <div style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p><span style={{ color: '#6B7280' }}>入力中の値:</span> <strong>{query || '(空)'}</strong></p>
        <p><span style={{ color: '#6B7280' }}>デバウンス後の値:</span> <strong style={{ color: '#3B82F6' }}>{debouncedQuery || '(空)'}</strong></p>
        <p style={{ fontSize: '12px', color: '#9CA3AF' }}>デバウンス更新回数: {updateCount.current}</p>
      </div>
    </div>
  )
}

function App() {
  return <SearchDemo />
}
`}
            />
            <CodeBlock
              language="tsx"
              title="useDebounce + useFetch を組み合わせた検索"
              showLineNumbers
              code={`function SearchPage() {
  const [query, setQuery] = useState('');

  // 300ms 入力が止まってから検索値を更新
  const debouncedQuery = useDebounce(query, 300);

  // debouncedQuery が変わったときだけ API を叩く
  const { data, loading } = useFetch<Post[]>(
    debouncedQuery
      ? \`https://api.example.com/search?q=\${debouncedQuery}\`
      : ''
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索..."
        className="border rounded px-3 py-2 w-full"
      />

      {/* ユーザーが "react" と入力:
          r → re → rea → reac → react
          最後のキー入力から 300ms 後に 1 回だけ検索される */}

      {loading && <p>検索中...</p>}

      <ul>
        {data?.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="API コストの削減にも貢献">
                <p>
                  debounce なしで 5 文字入力すると 5 回の API リクエストが発生しますが、
                  useDebounce を使えば 1 回に減ります。外部 API の利用料金を抑えるのにも効果的です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 6: OSS のカスタム Hooks ライブラリ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">よく使われる OSS のカスタム Hooks</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              自分でカスタム Hook を一から作る前に、既に広く使われている OSS ライブラリを確認しましょう。
              実績のあるライブラリを使えば、エッジケースやバグ対応も含めて高品質な Hook が手に入ります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">usehooks-ts</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeScript で書かれた軽量なカスタム Hooks コレクションです。
              依存関係がなく、必要な Hook だけをインポートできます。
            </p>
            <CodeBlock
              language="tsx"
              title="usehooks-ts の主要な Hook"
              code={`import { useLocalStorage } from 'usehooks-ts';
import { useMediaQuery } from 'usehooks-ts';
import { useDebounceValue } from 'usehooks-ts';
import { useOnClickOutside } from 'usehooks-ts';
import { useCopyToClipboard } from 'usehooks-ts';
import { useEventListener } from 'usehooks-ts';
import { useInterval } from 'usehooks-ts';
import { useIsClient } from 'usehooks-ts';

// useLocalStorage: localStorage との同期（SSR 対応済み）
const [theme, setTheme] = useLocalStorage('theme', 'light');

// useMediaQuery: CSS メディアクエリを JavaScript で判定
const isMobile = useMediaQuery('(max-width: 768px)');
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

// useDebounceValue: 値のデバウンス
const [debouncedValue] = useDebounceValue(searchQuery, 300);

// useCopyToClipboard: クリップボードへのコピー
const [copiedText, copy] = useCopyToClipboard();`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ahooks</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Alibaba が開発する包括的なカスタム Hooks ライブラリです。
              60 以上の Hook が用意されており、大規模アプリケーション向けの高度な Hook も含まれています。
            </p>
            <CodeBlock
              language="tsx"
              title="ahooks の主要な Hook"
              code={`import { useRequest } from 'ahooks';
import { useInfiniteScroll } from 'ahooks';
import { useVirtualList } from 'ahooks';
import { useDrag, useDrop } from 'ahooks';

// useRequest: データ取得の高機能 Hook
// キャッシュ、ポーリング、スロットリング、ページネーションなど
const { data, loading, error, run } = useRequest(
  (params) => fetch(\`/api/users?\${params}\`).then((r) => r.json()),
  {
    debounceWait: 300,        // デバウンス
    pollingInterval: 5000,    // 5秒ごとにポーリング
    cacheKey: 'user-list',    // キャッシュ
    retryCount: 3,            // エラー時のリトライ
  }
);

// useInfiniteScroll: 無限スクロール
const { data: list, loadMore, loading: scrollLoading } = useInfiniteScroll(
  (d) => fetchList(d?.nextCursor)
);`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="自作 vs ライブラリの判断基準">
                <p>
                  シンプルな Hook（useToggle, useDebounce など）は自作で十分学習にもなります。
                  一方、useLocalStorage（SSR 対応やストレージイベント同期）や useRequest（キャッシュ、リトライ、ポーリング）のように
                  エッジケースが多い Hook はライブラリを使う方が安全です。
                  プロジェクトの規模と要件に応じて判断しましょう。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 7: カスタム Hook のテスト方法 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">カスタム Hook のテスト方法</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              カスタム Hook の大きなメリットの一つは、UI なしでロジックをテストできることです。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">@testing-library/react</code> の
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">renderHook</code> を使えば、
              コンポーネントを描画せずに Hook のテストが書けます。
            </p>

            <CodeBlock
              language="tsx"
              title="useToggle のテスト"
              showLineNumbers
              code={`import { renderHook, act } from '@testing-library/react';
import { useToggle } from './useToggle';

describe('useToggle', () => {
  test('初期値が false であること', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.value).toBe(false);
  });

  test('初期値を true に設定できること', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.value).toBe(true);
  });

  test('toggle で値が反転すること', () => {
    const { result } = renderHook(() => useToggle());

    // act で state 更新をラップする
    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(false);
  });

  test('setTrue で true に、setFalse で false になること', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.setTrue();
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.setFalse();
    });
    expect(result.current.value).toBe(false);
  });
});`}
            />

            <CodeBlock
              language="tsx"
              title="useDebounce のテスト（タイマーを使う場合）"
              showLineNumbers
              code={`import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  // Jest のフェイクタイマーを使う
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('指定時間後に値が更新されること', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'hello', delay: 300 } }
    );

    // 初期値
    expect(result.current).toBe('hello');

    // 値を変更
    rerender({ value: 'world', delay: 300 });

    // まだ 300ms 経っていないので変わらない
    expect(result.current).toBe('hello');

    // 300ms 経過させる
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // 更新されている
    expect(result.current).toBe('world');
  });
});`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="テストのポイント">
                <p>
                  <strong>renderHook</strong> で Hook を描画し、<strong>result.current</strong> で現在の戻り値にアクセスします。
                  state を更新する操作は <strong>act()</strong> でラップする必要があります。
                  rerender で props を変更したテストや、jest.useFakeTimers() でタイマーを制御したテストも可能です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 8: use の新しい規約（React 19） */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">use の新しい規約: React 19 の use API</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React 19 では新しい <code className="text-sm bg-muted px-1.5 py-0.5 rounded">use</code> API が追加されました。
              これは従来の Hook とは異なり、条件分岐やループの中でも呼べる特別な API です。
              Promise や Context を読み取るために使います。
            </p>

            <CodeBlock
              language="tsx"
              title="use API の基本"
              showLineNumbers
              code={`import { use, Suspense } from 'react';

// use は Promise を読み取れる
// Suspense と組み合わせて非同期データを宣言的に扱う
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  // use() で Promise の結果を取得
  // データが準備できるまで Suspense の fallback が表示される
  const user = use(userPromise);

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// 親コンポーネント
function App() {
  const userPromise = fetchUser(1); // Promise を作成

  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}`}
            />

            <CodeBlock
              language="tsx"
              title="use で Context を読み取る（条件分岐内でも OK）"
              code={`import { use } from 'react';
import { ThemeContext } from './ThemeContext';

function StatusMessage({ isLoggedIn }: { isLoggedIn: boolean }) {
  // use は条件分岐の中で呼べる！（従来の useContext ではNG）
  if (isLoggedIn) {
    const theme = use(ThemeContext);
    return (
      <p style={{ color: theme === 'dark' ? 'white' : 'black' }}>
        ログイン中です
      </p>
    );
  }

  return <p>ログインしてください</p>;
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="use API と従来の Hook の違い">
                <p>
                  従来の Hook（useState, useEffect など）はコンポーネントのトップレベルでしか呼べませんが、
                  <code>use</code> は条件分岐やループの中でも呼べます。
                  ただし <code>use</code> はあくまで Promise や Context の読み取りに限定されており、
                  useState や useEffect の代わりにはなりません。
                  既存の Hook のルールは引き続き有効です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 9: カスタム Hook の設計ガイド */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">カスタム Hook の設計ガイド</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. いつカスタム Hook を作るべきか</h3>
            <div className="bg-muted/30 rounded-xl p-6 mb-6">
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>同じロジックが 2 箇所以上で使われている</strong> → カスタム Hook に抽出</li>
                <li><strong>コンポーネントのロジックが長くなりすぎた</strong> → Hook に分割して責務を明確化</li>
                <li><strong>テストしたいロジックがある</strong> → Hook にすれば UI なしでテストできる</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">2. 命名のコツ</h3>
            <CodeBlock
              language="tsx"
              title="良い命名の例"
              code={`// 「何をするか」が名前から明確にわかる
useLocalStorage()   // localStorage を扱う
useWindowSize()     // ウィンドウサイズを取得する
useFetch()          // データを取得する
useDebounce()       // 値のデバウンスをする
useToggle()         // true/false を切り替える
useForm()           // フォームの状態を管理する
useMediaQuery()     // メディアクエリを判定する
useClickOutside()   // 要素外のクリックを検出する
usePrevious()       // 前回の値を保持する
useOnlineStatus()   // オンライン/オフラインを判定する`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">3. 戻り値の設計</h3>
            <CodeBlock
              language="tsx"
              title="戻り値のパターン"
              code={`// パターン 1: 配列で返す（useState 風）
// → 呼び出し側が自由に名前を付けられる
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return [value, toggle] as const;
}
const [isOpen, toggleOpen] = useToggle();
const [isDark, toggleDark] = useToggle(true);

// パターン 2: オブジェクトで返す（値が多いとき）
// → 分割代入で必要なものだけ取り出せる
function useFetch<T>(url: string) {
  // ...
  return { data, loading, error, refetch };
}
const { data, loading } = useFetch('/api/users');
// error と refetch は今は不要なので取り出さない`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="配列 vs オブジェクト の使い分け">
                <p>
                  <strong>配列</strong>: 戻り値が 2〜3 個で、同じ Hook を複数回使う可能性があるとき（名前の衝突を避けやすい）。<br />
                  <strong>オブジェクト</strong>: 戻り値が多いとき、または必要なものだけ取り出したいとき。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 10: ファイル構成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">プロジェクトでのファイル構成</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              カスタム Hook はプロジェクト内の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">hooks/</code> ディレクトリにまとめるのが一般的です。
            </p>
            <CodeBlock
              language="bash"
              title="推奨ディレクトリ構成"
              code={`src/
├── components/       # UI コンポーネント
│   ├── Button.tsx
│   └── Modal.tsx
├── hooks/            # カスタム Hooks
│   ├── useLocalStorage.ts
│   ├── useWindowSize.ts
│   ├── useFetch.ts
│   ├── useDebounce.ts
│   └── useToggle.ts
├── contexts/         # Context + Provider
│   ├── ThemeContext.tsx
│   └── AuthContext.tsx
└── pages/            # ページコンポーネント
    ├── Home.tsx
    └── Settings.tsx`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="warning" title="Hook のルールを忘れずに">
                <p>カスタム Hook でも、React の Hook ルールは同じです:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Hook はコンポーネントまたはカスタム Hook のトップレベルでのみ呼ぶ</li>
                  <li>条件分岐やループの中で Hook を呼ばない（use API は例外）</li>
                  <li>名前は必ず <code>use</code> で始める</li>
                </ul>
              </InfoBox>
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="カスタム Hook を作るべきタイミングとして最も適切なものはどれですか？"
              options={[
                { label: 'すべてのコンポーネントのロジックをカスタム Hook にすべき' },
                { label: '同じロジック（useState + useEffect のパターン）が 2 箇所以上で使われている場合', correct: true },
                { label: 'コンポーネントが 1 つの useState を使っている場合' },
                { label: 'CSS のスタイリングを管理する場合' },
              ]}
              explanation="カスタム Hook の主な目的は「ロジックの再利用」です。同じパターン（特に useState + useEffect の組み合わせ）が複数のコンポーネントで使われている場合に、カスタム Hook として抽出するのが適切です。単純な useState 1 つだけなら Hook に抽出する必要はありません。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="React 19 の use API について正しい説明はどれですか？"
              options={[
                { label: 'useState の代替として使える新しい API' },
                { label: 'Promise や Context を読み取るための API で、条件分岐内でも呼べる', correct: true },
                { label: 'すべての Hook を条件分岐内で呼べるようにする API' },
                { label: 'useEffect の代替として非同期処理を扱う API' },
              ]}
              explanation="use は Promise や Context の読み取りに使える新しい API で、従来の Hook のルール（トップレベルでのみ呼ぶ）に縛られず、条件分岐やループ内でも呼べます。ただし useState や useEffect の代替ではなく、既存の Hook のルールは引き続き有効です。"
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="useMediaQuery カスタム Hook を作成する"
              description="CSS メディアクエリの結果を返すカスタム Hook useMediaQuery を実装してください。引数にメディアクエリ文字列（例: '(max-width: 768px)'）を受け取り、マッチするかどうかの boolean を返します。window.matchMedia を使い、メディアクエリの変化を監視して結果をリアクティブに更新してください。"
              initialCode={`function useMediaQuery(query: string): boolean {
  // ここに実装してください
  // 1. window.matchMedia で初期値を取得
  // 2. useEffect でメディアクエリの変化を監視
  // 3. クリーンアップでリスナーを解除
}`}
              answer={`function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 変化を監視
    mediaQuery.addEventListener('change', handler);

    // 初回のクエリ変更にも対応
    setMatches(mediaQuery.matches);

    // クリーンアップ
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

// 使い方
// const isMobile = useMediaQuery('(max-width: 768px)');
// const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');`}
              keywords={['matchMedia(', 'addEventListener', 'removeEventListener', 'useEffect(']}
              hints={[
                'window.matchMedia(query) で MediaQueryList オブジェクトを取得できます。',
                'MediaQueryList の addEventListener("change", handler) で変化を監視します。',
                'handler の引数 event.matches がマッチ結果（boolean）です。',
              ]}
            />
          </section>

          {/* セクション 11: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="bg-muted/30 rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">1</span>
                <p className="text-muted-foreground"><strong>カスタム Hook は「ロジックの再利用」</strong>。コンポーネントが UI の再利用なら、Hook はロジックの再利用</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">2</span>
                <p className="text-muted-foreground"><strong>use プレフィックスが必須</strong>。React がこのルールで Hook の使い方を検証している</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">3</span>
                <p className="text-muted-foreground"><strong>実用的なカスタム Hook</strong>: useLocalStorage（永続化）、useWindowSize（画面サイズ）、useFetch（データ取得）、useDebounce（入力の間引き）</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">4</span>
                <p className="text-muted-foreground"><strong>OSS ライブラリを活用</strong>。usehooks-ts や ahooks には実績ある Hook が豊富に揃っている</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">5</span>
                <p className="text-muted-foreground"><strong>renderHook でテスト</strong>。UI なしでカスタム Hook のロジックを検証できる</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">6</span>
                <p className="text-muted-foreground"><strong>React 19 の use API</strong>。Promise や Context の読み取りに使え、条件分岐内でも呼べる新しい規約</p>
              </div>
            </div>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'カスタムフックでロジックを再利用する - React 公式ガイド',
                  url: 'https://ja.react.dev/learn/reusing-logic-with-custom-hooks',
                  description: 'カスタム Hook の作り方、命名規則、設計パターンを学べるチュートリアル',
                },
                {
                  title: 'use - React 公式リファレンス',
                  url: 'https://ja.react.dev/reference/react/use',
                  description: 'React 19 で追加された use API の仕様と使い方',
                },
                {
                  title: 'usehooks-ts 公式サイト',
                  url: 'https://usehooks-ts.com/',
                  description: 'TypeScript 製カスタム Hook コレクション。ソースコード付きで学習にも最適',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'カスタム Hook の中で別のカスタム Hook を呼べますか？',
                  answer: 'はい、カスタム Hook の中で他のカスタム Hook を自由に呼べます。たとえば useFetch の中で useDebounce を使ったり、useTheme の中で useLocalStorage を使ったりできます。これがカスタム Hook の強力な点で、小さな Hook を組み合わせて大きな Hook を作る「コンポジション」が可能です。',
                },
                {
                  question: '同じカスタム Hook を複数のコンポーネントで使うと state は共有されますか？',
                  answer: 'いいえ、共有されません。カスタム Hook はロジックの再利用であり、state の共有ではありません。各コンポーネントが同じカスタム Hook を呼ぶと、それぞれ独立した state が作られます。state を共有したい場合は useContext と組み合わせる必要があります。',
                },
                {
                  question: 'usehooks-ts と ahooks のどちらを選ぶべきですか？',
                  answer: 'usehooks-ts は軽量で依存関係がなく、必要な Hook だけをインポートできるため、小〜中規模のプロジェクトに適しています。ahooks は 60 以上の Hook を提供し、useRequest（高度なデータ取得）や useVirtualList（仮想リスト）など大規模アプリ向けの Hook も揃っています。プロジェクトの規模と必要な機能に応じて選びましょう。',
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
