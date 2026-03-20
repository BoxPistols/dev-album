import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function UseEffect() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 12</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">useEffect</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          コンポーネントの「外の世界」とつながるための Hook。API からデータを取ってきたり、タイマーを設定したり、ブラウザのタイトルを変えたり――React の描画以外の処理はすべて「副作用（Side Effect）」と呼びます。
        </p>

        <WhyNowBox tags={['useEffect', '副作用', 'API連携', 'クリーンアップ']}>
          <p>
            ここまでで useState によるデータの管理、イベントによるユーザー操作の受け取りを学びました。
            しかし実際のアプリでは「画面が表示されたらサーバーからデータを取得する」「一定間隔で情報を更新する」といった、
            <strong>描画のタイミングに合わせて外部と通信する処理</strong>が必要です。それが useEffect の出番です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: 副作用とは何か */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">副作用（Side Effect）とは？</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React コンポーネントの主な仕事は「props と state を受け取って UI を返す」ことです。
              それ以外の処理――たとえばネットワーク通信、DOM の直接操作、タイマーの設定など――はすべて「副作用」と呼ばれます。
            </p>
            <div className="mb-6">
              <InfoBox type="info" title="身近なたとえ">
                <p>
                  Figma で言えば、コンポーネントが「見た目を返す」のが本業、プラグインを動かしたり外部データを読み込んだりするのが副作用です。
                  useEffect は「コンポーネントにプラグインを接続するしくみ」と考えてください。
                </p>
              </InfoBox>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              副作用の代表例をいくつか挙げます:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
              <li>API からデータを取得する（fetch / axios）</li>
              <li>ブラウザの <code className="text-sm bg-muted px-1.5 py-0.5 rounded">document.title</code> を変更する</li>
              <li><code className="text-sm bg-muted px-1.5 py-0.5 rounded">setInterval</code> / <code className="text-sm bg-muted px-1.5 py-0.5 rounded">setTimeout</code> でタイマーを仕掛ける</li>
              <li>イベントリスナー（スクロール、リサイズなど）を登録する</li>
              <li>localStorage への読み書き</li>
            </ul>
          </section>

          {/* セクション 2: useEffect のメンタルモデル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useEffect のメンタルモデル: 「同期」ではなく「副作用」</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useEffect を正しく使うために最も大切なのは、そのメンタルモデルです。
              多くの初学者は useEffect を「ライフサイクルメソッドの代替」と考えがちですが、
              React 公式の推奨するメンタルモデルは<strong>「外部システムとの同期」</strong>です。
            </p>
            <CodeBlock
              language="tsx"
              title="メンタルモデルの違い"
              code={`// NG なメンタルモデル: ライフサイクルベース
// 「マウント時にこれをやって、更新時にあれをやって...」
useEffect(() => {
  // componentDidMount の代わり？ → 違う！
}, []);

// OK なメンタルモデル: 同期ベース
// 「この state/props と外部システムを同期させる」
useEffect(() => {
  // roomId が変わるたびに、チャットルームとの接続を同期する
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);`}
            />
            <p className="text-muted-foreground mb-4 leading-relaxed">
              この「同期」の考え方を持つと、自然にクリーンアップが必要なケースが見えてきます。
              「接続したなら切断する」「登録したなら解除する」「開始したなら停止する」。
              セットアップとクリーンアップは常にペアです。
            </p>
            <div className="mb-6">
              <InfoBox type="info" title="React 18 の Strict Mode">
                <p>
                  開発モード（Strict Mode）では、React は意図的にコンポーネントを 2 回マウント・アンマウントします。
                  これは「クリーンアップが正しく実装されているか」を検証するための仕組みです。
                  「useEffect が 2 回実行される」と困惑したら、それは Strict Mode の正常な動作です。
                  本番ビルドでは 1 回だけ実行されます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 3: useEffect の基本構文 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useEffect の基本構文</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useEffect は 2 つの引数を取ります: 「実行したい処理（コールバック関数）」と「依存配列」です。
            </p>
            <CodeBlock
              language="tsx"
              title="基本構文"
              code={`import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // ここに副作用の処理を書く
    console.log('コンポーネントがレンダーされました');
  }, [/* 依存配列 */]);

  return <div>Hello</div>;
}`}
            />
            <div className="mt-6 mb-6">
              <InfoBox type="info" title="依存配列のルール">
                <p>依存配列は useEffect の「いつ再実行するか」を決める重要なしくみです。</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>配列なし</strong>: 毎回のレンダー後に実行（ほぼ使わない）</li>
                  <li><strong>空配列 <code>[]</code></strong>: マウント時（初回表示時）だけ実行</li>
                  <li><strong>値を入れた配列 <code>[count, name]</code></strong>: その値が変わったときだけ実行</li>
                </ul>
              </InfoBox>
            </div>
          </section>

          {/* セクション 4: 依存配列の詳細 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">依存配列を理解する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              依存配列は useEffect で最も重要な概念です。3 つのパターンをコードで見てみましょう。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">パターン 1: 空の依存配列（マウント時のみ）</h3>
            <CodeBlock
              language="tsx"
              title="マウント時に1回だけ実行"
              code={`function WelcomeMessage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // コンポーネントが画面に初めて表示されたときだけ実行
    console.log('ようこそ！');
    setMessage('ページが読み込まれました');
  }, []); // ← 空配列 = マウント時のみ

  return <p>{message}</p>;
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">パターン 2: 特定の値を監視</h3>
            <CodePreview
              title="count が変わるたびに実行 → ボタンをクリックしてみよう"
              previewHeight={100}
              code={`function PageTitle() {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    document.title = \`クリック数: \${count}\`
  }, [count])

  return (
    <div style={{ textAlign: 'center', padding: '16px' }}>
      <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
        タブタイトルが「クリック数: {count}」に変わります
      </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{ padding: '8px 20px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}
      >
        クリック: {count}
      </button>
    </div>
  )
}

function App() {
  return <PageTitle />
}
`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">パターン 3: 複数の依存値</h3>
            <CodePreview
              title="どちらか一方が変わったら実行 → 検索・カテゴリを変えてみよう"
              previewHeight={160}
              code={`function SearchResults() {
  const [query, setQuery] = React.useState('')
  const [category, setCategory] = React.useState('all')
  const [log, setLog] = React.useState('')

  React.useEffect(() => {
    setLog('検索: "' + query + '" カテゴリ: ' + category)
  }, [query, category])

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="検索..."
          style={{ flex: 1, minWidth: '120px', border: '1px solid #D1D5DB', borderRadius: '6px', padding: '6px 10px', fontSize: '14px' }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ border: '1px solid #D1D5DB', borderRadius: '6px', padding: '6px 8px', fontSize: '14px' }}>
          <option value="all">すべて</option>
          <option value="design">デザイン</option>
          <option value="code">コード</option>
        </select>
      </div>
      <p style={{ fontSize: '13px', color: '#6B7280', backgroundColor: '#F3F4F6', padding: '8px 12px', borderRadius: '6px', fontFamily: 'monospace' }}>
        {log || '(まだ入力されていません)'}
      </p>
    </div>
  )
}

function App() {
  return <SearchResults />
}
`}
            />
          </section>

          {/* セクション 5: クリーンアップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">クリーンアップ関数</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              副作用のなかには、コンポーネントが画面から消えたときに「後片付け」が必要なものがあります。
              たとえばタイマーやイベントリスナーです。useEffect のコールバックから関数を <code className="text-sm bg-muted px-1.5 py-0.5 rounded">return</code> すると、それがクリーンアップ関数になります。
            </p>
            <CodeBlock
              language="tsx"
              title="クリーンアップの基本"
              code={`useEffect(() => {
  // セットアップ: 副作用を開始
  const timer = setInterval(() => {
    console.log('1秒経過');
  }, 1000);

  // クリーンアップ: 副作用を解除
  return () => {
    clearInterval(timer);
  };
}, []); // マウント時にセットアップ、アンマウント時にクリーンアップ`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="warning" title="クリーンアップを忘れるとどうなる？">
                <p>
                  タイマーやイベントリスナーのクリーンアップを忘れると、コンポーネントが画面から消えた後もバックグラウンドで処理が動き続けます。
                  これはメモリリークの原因になり、アプリが徐々に重くなっていきます。
                </p>
              </InfoBox>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">実例: ウィンドウリサイズの監視</h3>
            <CodePreview
              title="リサイズイベントの監視 → ブラウザ幅を変えてみよう"
              previewHeight={100}
              code={`function WindowSize() {
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  React.useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ padding: '16px', textAlign: 'center' }}>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
        ウィンドウサイズ: {size.width} x {size.height}
      </p>
      <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '8px' }}>
        ブラウザのウィンドウサイズを変えるとリアルタイムで更新されます
      </p>
    </div>
  )
}

function App() {
  return <WindowSize />
}
`}
            />
          </section>

          {/* セクション 6: データ取得 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: API からデータを取得する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useEffect の最も一般的な使い方の一つが、API からデータを取得することです。
              ローディング状態とエラー状態もあわせて管理するパターンを見てみましょう。
            </p>
            <CodePreview
              title="API データ取得の完全なパターン → 読み込みを確認してみよう"
              previewHeight={360}
              code={`function UserList() {
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )
        if (!response.ok) {
          throw new Error('データの取得に失敗しました')
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : '不明なエラー')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (loading) {
    return <p style={{ padding: '16px', color: '#6B7280' }}>読み込み中...</p>
  }
  if (error) {
    return <p style={{ padding: '16px', color: '#EF4444' }}>エラー: {error}</p>
  }

  return (
    <ul style={{ listStyle: 'none', padding: '8px 16px', margin: 0 }}>
      {users.map((user) => (
        <li key={user.id} style={{ padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', marginBottom: '6px' }}>
          <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '0 0 2px 0' }}>{user.name}</p>
          <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{user.email}</p>
        </li>
      ))}
    </ul>
  )
}

function App() {
  return <UserList />
}
`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="async/await と useEffect">
                <p>
                  useEffect のコールバック関数自体を <code>async</code> にすることはできません。
                  代わりに、コールバックの中で async 関数を定義してすぐに呼び出すパターンを使います。
                  これは React の仕様上の制約です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 7: レースコンディション対策 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">レースコンディション対策</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              レースコンディションとは、「複数の非同期処理が同時に走り、古い結果が新しい結果を上書きしてしまう」問題です。
              たとえばユーザーがすばやくページを切り替えた場合、前のページのデータが後から到着して、
              現在のページのデータを上書きしてしまうことがあります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">方法 1: boolean フラグで無視する</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最もシンプルな方法は、クリーンアップ時にフラグを立て、レスポンスを無視することです。
            </p>
            <CodeBlock
              language="tsx"
              title="boolean フラグによるレースコンディション対策"
              showLineNumbers
              code={`function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // フラグ: このエフェクトがまだ有効かどうか
    let ignore = false;

    const fetchUser = async () => {
      const res = await fetch(
        \`https://jsonplaceholder.typicode.com/users/\${userId}\`
      );
      const data: User = await res.json();

      // クリーンアップで ignore = true になっていたら
      // この結果は古い（userId が既に変わっている）ので無視
      if (!ignore) {
        setUser(data);
      }
    };

    fetchUser();

    // クリーンアップ: userId が変わったら前の結果を無視
    return () => {
      ignore = true;
    };
  }, [userId]);

  return user ? <p>{user.name}</p> : <p>読み込み中...</p>;
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">方法 2: AbortController でリクエスト自体をキャンセル</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              より効率的な方法として、AbortController を使って HTTP リクエスト自体をキャンセルできます。
              不要な通信をネットワークレベルで中止できるため、帯域幅の節約にもなります。
            </p>
            <CodeBlock
              language="tsx"
              title="AbortController によるキャンセル"
              showLineNumbers
              code={`function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // AbortController のインスタンスを作成
    const controller = new AbortController();

    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          \`https://jsonplaceholder.typicode.com/users/\${userId}\`,
          { signal: controller.signal } // ← signal を渡す
        );

        if (!res.ok) {
          throw new Error(\`HTTP \${res.status}\`);
        }

        const data: User = await res.json();
        setUser(data);
      } catch (err) {
        // AbortError は「正常なキャンセル」なので無視する
        if (err instanceof DOMException && err.name === 'AbortError') {
          console.log('リクエストがキャンセルされました');
          return;
        }
        setError(
          err instanceof Error ? err.message : '不明なエラー'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // クリーンアップ: controller.abort() でリクエストをキャンセル
    return () => {
      controller.abort();
    };
  }, [userId]);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <div>
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="AbortController の仕組み">
                <p>
                  AbortController は Web 標準の API です。<code>controller.abort()</code> を呼ぶと、
                  その <code>signal</code> を渡した fetch リクエストが即座に中断され、
                  <code>AbortError</code> が throw されます。ブラウザはネットワーク接続自体を切断するため、
                  レスポンスの待ち時間やデータ転送も節約できます。
                </p>
              </InfoBox>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">AbortController をタイムアウトに応用する</h3>
            <CodeBlock
              language="tsx"
              title="リクエストのタイムアウト設定"
              code={`useEffect(() => {
  const controller = new AbortController();

  // 5秒経過したら自動的にキャンセル
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5000);

  const fetchData = async () => {
    try {
      const res = await fetch(url, { signal: controller.signal });
      const data = await res.json();
      setData(data);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('リクエストがタイムアウトしました');
        return;
      }
      setError('データの取得に失敗しました');
    }
  };

  fetchData();

  return () => {
    clearTimeout(timeoutId);
    controller.abort();
  };
}, [url]);`}
            />
          </section>

          {/* セクション 8: 検索パラメータ付きのデータ取得 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">応用: 検索条件が変わるたびにデータを再取得</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              依存配列に検索キーワードを入れることで、入力が変わるたびに自動的にデータを再取得できます。
              AbortController を使ったレースコンディション対策も含めた完全版です。
            </p>
            <CodePreview
              title="検索連動のデータ取得 → キーワードを入力してみよう"
              previewHeight={340}
              code={`function SearchPosts() {
  const [query, setQuery] = React.useState('')
  const [posts, setPosts] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!query.trim()) {
      setPosts([])
      return
    }
    const controller = new AbortController()
    const searchPosts = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/posts?q=' + query,
          { signal: controller.signal }
        )
        const data = await res.json()
        setPosts(data.slice(0, 5))
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
      } finally {
        setLoading(false)
      }
    }
    searchPosts()
    return () => controller.abort()
  }, [query])

  return (
    <div style={{ padding: '16px' }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="記事を検索...（例: react, javascript）"
        style={{ width: '100%', border: '1px solid #D1D5DB', borderRadius: '6px', padding: '8px 12px', fontSize: '14px', marginBottom: '12px' }}
      />
      {loading && <p style={{ fontSize: '13px', color: '#6B7280' }}>検索中...</p>}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {posts.map((post) => (
          <li key={post.id} style={{ padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', marginBottom: '6px' }}>
            <h3 style={{ fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px 0' }}>{post.title}</h3>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{post.body}</p>
          </li>
        ))}
      </ul>
      {!loading && query && posts.length === 0 && (
        <p style={{ fontSize: '13px', color: '#9CA3AF', textAlign: 'center', padding: '16px' }}>結果が見つかりませんでした</p>
      )}
    </div>
  )
}

function App() {
  return <SearchPosts />
}
`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="AbortController でレースコンディションを防ぐ">
                <p>
                  ユーザーがすばやく入力すると、前のリクエストが終わる前に次のリクエストが始まります。
                  AbortController を使ってクリーンアップ時に前のリクエストをキャンセルすることで、
                  「古い結果が新しい結果を上書きしてしまう」問題（レースコンディション）を防げます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 9: タイマーの例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: タイマーを作る</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useEffect とクリーンアップを組み合わせた、実用的なカウントダウンタイマーの例です。
            </p>
            <CodePreview
              title="カウントダウンタイマー → スタートを押してみよう"
              previewHeight={200}
              code={`function CountdownTimer() {
  const [seconds, setSeconds] = React.useState(60)
  const [isRunning, setIsRunning] = React.useState(false)

  React.useEffect(() => {
    if (!isRunning) return
    if (seconds <= 0) {
      setIsRunning(false)
      return
    }
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [isRunning, seconds])

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div style={{ textAlign: 'center', padding: '24px' }}>
      <p style={{ fontSize: '48px', fontFamily: 'monospace', fontWeight: 'bold', marginBottom: '20px' }}>
        {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={() => setIsRunning(!isRunning)}
          style={{ padding: '8px 24px', borderRadius: '8px', backgroundColor: '#3B82F6', color: 'white', border: 'none', cursor: 'pointer', fontSize: '15px' }}
        >
          {isRunning ? '一時停止' : 'スタート'}
        </button>
        <button
          onClick={() => { setIsRunning(false); setSeconds(60) }}
          style={{ padding: '8px 24px', borderRadius: '8px', backgroundColor: '#E5E7EB', color: '#374151', border: 'none', cursor: 'pointer', fontSize: '15px' }}
        >
          リセット
        </button>
      </div>
    </div>
  )
}

function App() {
  return <CountdownTimer />
}
`}
            />
          </section>

          {/* セクション 10: よくある間違い */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">よくある間違いと注意点</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. 依存配列の漏れ</h3>
            <CodeBlock
              language="tsx"
              title="NG: 依存配列に必要な値が抜けている"
              code={`// NG: count を使っているのに依存配列に入れていない
useEffect(() => {
  document.title = \`カウント: \${count}\`;
}, []); // ESLint が警告を出してくれる

// OK: count を依存配列に含める
useEffect(() => {
  document.title = \`カウント: \${count}\`;
}, [count]);`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">2. 無限ループ</h3>
            <CodeBlock
              language="tsx"
              title="NG: useEffect 内で state を更新して無限ループ"
              code={`// NG: 毎回 state が変わる → 再レンダー → useEffect → state 変更 → ...
useEffect(() => {
  setCount(count + 1); // 無限ループ！
}, [count]);

// NG: オブジェクトを依存配列に入れる（毎回新しい参照になる）
const options = { page: 1 }; // レンダーのたびに新しいオブジェクト
useEffect(() => {
  fetchData(options);
}, [options]); // 毎回「変わった」と判定される → 無限ループ`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">3. useEffect を使いすぎない</h3>
            <div className="mb-4">
              <InfoBox type="warning" title="useEffect は最後の手段">
                <p>
                  React 公式ドキュメントでも「useEffect は外部システムとの同期のためのもの」と強調されています。
                  以下のケースでは useEffect は不要です:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>props / state から計算できる値</strong> → 変数に直接代入するだけ</li>
                  <li><strong>ユーザー操作に反応する処理</strong> → イベントハンドラーに書く</li>
                  <li><strong>レンダー結果を変換するだけ</strong> → useMemo を検討</li>
                </ul>
              </InfoBox>
            </div>
            <CodeBlock
              language="tsx"
              title="useEffect が不要なケース"
              code={`// NG: useEffect で計算結果を state に入れている
const [items, setItems] = useState<Item[]>([]);
const [filteredItems, setFilteredItems] = useState<Item[]>([]);

useEffect(() => {
  setFilteredItems(items.filter((item) => item.active));
}, [items]);

// OK: レンダー中に直接計算する
const [items, setItems] = useState<Item[]>([]);
const filteredItems = items.filter((item) => item.active);
// useEffect 不要！シンプルで高速`}
            />
          </section>

          {/* セクション 11: useEffect のライフサイクル図解 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useEffect のライフサイクルを図解する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useEffect がいつ実行され、クリーンアップがいつ呼ばれるかを時系列で理解しましょう。
            </p>
            <CodeBlock
              language="text"
              title="useEffect の実行タイミング"
              code={`[初回レンダー]
  1. コンポーネントの関数が実行される（JSX を返す）
  2. React が DOM を更新する
  3. ブラウザが画面を描画する
  4. useEffect のコールバックが実行される ← ここ

[依存値が変わったとき]
  1. コンポーネントの関数が再実行される
  2. React が DOM を更新する
  3. ブラウザが画面を描画する
  4. 前回の useEffect のクリーンアップが実行される ← ここ
  5. 新しい useEffect のコールバックが実行される ← ここ

[アンマウント時]
  1. React がコンポーネントを削除
  2. 最後の useEffect のクリーンアップが実行される ← ここ`}
            />
            <div className="mt-6 mb-6">
              <InfoBox type="info" title="重要: useEffect は描画後に実行される">
                <p>
                  useEffect はレンダー（DOM 更新）の後に非同期で実行されます。
                  そのため、useEffect の中で重い処理をしても画面の描画はブロックされません。
                  逆に「DOM 更新の前に実行したい」場合は <code>useLayoutEffect</code> を使いますが、
                  こちらは特殊なケースでのみ必要です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="useEffect のクリーンアップ関数はいつ実行されますか？"
              options={[
                { label: 'コンポーネントがマウントされたとき' },
                { label: 'useEffect のコールバックが実行される直前（再実行時）と、コンポーネントがアンマウントされたとき', correct: true },
                { label: 'コンポーネントの state が変更されるたび' },
                { label: 'ブラウザのタブが閉じられたとき' },
              ]}
              explanation="クリーンアップ関数は、依存値が変わって useEffect が再実行される直前と、コンポーネントがアンマウントされるときに実行されます。前回のエフェクトを掃除してから新しいエフェクトを開始する、という流れです。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="次のうち、useEffect を使うべきでないケースはどれですか？"
              options={[
                { label: 'API からデータを取得して表示する' },
                { label: 'ウィンドウの resize イベントを監視する' },
                { label: 'props から計算できるフィルター結果を state に保存する', correct: true },
                { label: 'WebSocket 接続を確立してメッセージを受信する' },
              ]}
              explanation="props や state から計算できる値は、レンダー中に直接変数に代入すれば十分です。わざわざ useEffect + useState で管理すると、不要な再レンダーが発生し、コードも複雑になります。React 公式でも「You Might Not Need an Effect」として注意が呼びかけられています。"
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="API からユーザーリストを取得して表示する"
              description="useEffect 内の ___ を埋めてください。AbortController で fetch をキャンセル可能にし、クリーンアップで abort するのがポイントです。"
              initialCode={`function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new ___(); // ← ここを埋める

    const fetchUsers = async () => {
      try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controller.___ } // ← ここを埋める
        );
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => controller.___(); // ← ここを埋める（クリーンアップ）
  }, []);

  if (loading) return <p>読み込み中...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
              answer={`function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controller.signal }
        );
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => controller.abort();
  }, []);

  if (loading) return <p>読み込み中...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
              keywords={['AbortController', 'controller.signal', 'controller.abort()']}
              hints={[
                'fetch をキャンセル可能にするクラスは AbortController です',
                'fetch の第2引数に渡すプロパティは signal です',
                'クリーンアップで呼ぶメソッドは abort() です',
              ]}
            />
          </section>

          {/* セクション 12: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="bg-muted/30 rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">1</span>
                <p className="text-muted-foreground"><strong>useEffect は副作用のための Hook</strong>。API 通信、タイマー、イベントリスナーなど「レンダー以外の処理」に使う</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">2</span>
                <p className="text-muted-foreground"><strong>メンタルモデルは「外部システムとの同期」</strong>。ライフサイクルではなく、state/props と外部の状態を一致させる仕組み</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">3</span>
                <p className="text-muted-foreground"><strong>依存配列で実行タイミングを制御</strong>。空配列はマウント時のみ、値を入れるとその値が変わったときに再実行</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">4</span>
                <p className="text-muted-foreground"><strong>クリーンアップ関数を忘れずに</strong>。タイマーやイベントリスナーは必ず後片付けする</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">5</span>
                <p className="text-muted-foreground"><strong>AbortController でレースコンディションを防ぐ</strong>。非同期処理のキャンセルはクリーンアップの必須パターン</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">6</span>
                <p className="text-muted-foreground"><strong>useEffect を使いすぎない</strong>。計算結果やイベント処理には不要。外部システムとの同期にだけ使う</p>
              </div>
            </div>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'useEffect - React 公式リファレンス',
                  url: 'https://ja.react.dev/reference/react/useEffect',
                  description: 'useEffect の API 仕様、使い方、注意点を網羅した公式ドキュメント',
                },
                {
                  title: 'エフェクトで同期する - React 公式ガイド',
                  url: 'https://ja.react.dev/learn/synchronizing-with-effects',
                  description: 'useEffect のメンタルモデルと正しい使い方を学べるチュートリアル',
                },
                {
                  title: 'エフェクトは不要かもしれない - React 公式ガイド',
                  url: 'https://ja.react.dev/learn/you-might-not-need-an-effect',
                  description: 'useEffect の過剰使用を避けるためのガイド。代替パターンも紹介',
                },
                {
                  title: 'エフェクトから依存値を取り除く - React 公式ガイド',
                  url: 'https://ja.react.dev/learn/removing-effect-dependencies',
                  description: '依存配列の不要な値を減らして、エフェクトをシンプルにする方法',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'useEffect と useLayoutEffect の違いは何ですか？',
                  answer: 'useEffect はブラウザの描画後に非同期で実行されますが、useLayoutEffect は DOM 更新後、ブラウザの描画前に同期的に実行されます。useLayoutEffect は DOM のサイズや位置を測定してから描画したい場合（ツールチップの位置計算など）に使います。ほとんどのケースでは useEffect で十分です。',
                },
                {
                  question: '開発モードで useEffect が 2 回実行されるのはバグですか？',
                  answer: 'バグではありません。React 18 の Strict Mode では、意図的にコンポーネントをマウント → アンマウント → 再マウントさせます。これはクリーンアップが正しく実装されているかを検証するための仕組みです。本番ビルドでは 1 回だけ実行されます。2 回実行されても問題ないようにクリーンアップを実装しましょう。',
                },
                {
                  question: 'useEffect の中で async/await を直接使えないのはなぜですか？',
                  answer: 'useEffect のコールバック関数は「クリーンアップ関数」または「undefined」を返す必要がありますが、async 関数は必ず Promise を返します。Promise はクリーンアップ関数として使えないため、useEffect のコールバック自体を async にすることはできません。代わりに、コールバック内で async 関数を定義して呼び出すパターンを使います。',
                },
                {
                  question: 'データ取得に useEffect を使わず、TanStack Query や SWR を使うべきですか？',
                  answer: '実際のプロダクション開発では、TanStack Query（旧 React Query）や SWR の利用が推奨されています。これらのライブラリはキャッシュ、再試行、レースコンディション対策、重複排除、バックグラウンド更新などを自動的に処理してくれます。useEffect での手動データ取得は学習目的には優れていますが、本番では専用ライブラリの方が堅牢で使いやすいです。',
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
