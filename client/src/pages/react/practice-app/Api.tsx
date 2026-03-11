import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function Api() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 28</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">API 連携</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          外部の API からデータを取得して表示する方法を学びましょう。fetch API と async/await を使ったデータ取得、
          ローディング状態やエラーハンドリングまで実践的に解説します。
        </p>

        <WhyNowBox tags={['fetch API', 'async/await', 'ローディング', 'エラーハンドリング', 'axios']}>
          <p>
            ここまではコンポーネントの中に直接データを書いていましたが、実際のアプリでは外部の API（サーバー）からデータを取得します。
            天気情報、ユーザーデータ、商品一覧など、ほぼすべての Web アプリがAPI通信を行います。
            React で API を扱うパターンを身につければ、動的なアプリが作れるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: fetch API の基本 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">fetch API の基本</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>fetch</code> はブラウザに組み込まれた API 通信の関数です。
              追加のライブラリなしで HTTP リクエストを送信できます。
            </p>

            <CodeBlock
              language="tsx"
              title="fetch の基本的な使い方"
              code={`// GET リクエスト（データを取得）
const response = await fetch('https://api.example.com/users');
const data = await response.json(); // JSON として解析
console.log(data); // [{ id: 1, name: "田中" }, ...]

// POST リクエスト（データを送信）
const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: '山田太郎',
    email: 'taro@example.com',
  }),
});
const newUser = await response.json();`}
            />

            <InfoBox type="info" title="API とは？">
              <p>
                API（Application Programming Interface）は、アプリケーション同士がデータをやり取りするための仕組みです。
                Web API の場合、URL（エンドポイント）にリクエストを送ると、JSON 形式でデータが返ってきます。
                例えば <code>https://api.example.com/users</code> にアクセスするとユーザー一覧が返ってくる、というイメージです。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: async/await */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">async / await で非同期処理を書く</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              API 通信は「非同期」で行われます。リクエストを送信してからレスポンスが返るまで時間がかかるため、
              <code>async/await</code> を使って「待つ」処理を書きます。
            </p>

            <CodeBlock
              language="tsx"
              title="async / await の構文"
              code={`// async: この関数は非同期処理を含む
// await: この処理が完了するまで待つ

async function fetchUsers() {
  try {
    // 1. API にリクエストを送信し、レスポンスを待つ
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    // 2. レスポンスが正常か確認
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    // 3. JSON データとして解析
    const users = await response.json();

    return users;
  } catch (error) {
    // ネットワークエラーなどをキャッチ
    console.error('データの取得に失敗しました:', error);
    throw error;
  }
}`}
            />

            <InfoBox type="warning" title="try / catch を忘れずに">
              <p>
                API 通信はネットワーク障害やサーバーエラーで失敗する可能性があります。
                必ず <code>try / catch</code> でエラーをハンドリングしましょう。
                エラーを無視するとアプリが無言で壊れ、ユーザーは何が起きたか分かりません。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: React でのデータ取得パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React でのデータ取得パターン</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React では <code>useEffect</code> と <code>useState</code> を組み合わせてデータを取得します。
              ローディング中、成功、エラーの3つの状態を管理するのがポイントです。
            </p>

            <CodeBlock
              language="tsx"
              title="基本的なデータ取得パターン"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

export default function UserList() {
  // 3つの状態を管理
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );

        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '不明なエラーが発生しました'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // 空の依存配列 = マウント時に1回だけ実行

  // ローディング中
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent
                        rounded-full animate-spin" />
        <span className="ml-3 text-gray-600">読み込み中...</span>
      </div>
    );
  }

  // エラー時
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800 font-medium">エラーが発生しました</p>
        <p className="text-red-600 text-sm mt-1">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          再読み込み
        </button>
      </div>
    );
  }

  // 成功時
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ユーザー一覧</h1>
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 bg-white rounded-lg border border-gray-200
                       hover:border-blue-300 transition-colors"
          >
            <h2 className="font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-400 mt-1">{user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="3つの状態を忘れない">
              <p>
                API 連携では必ず<strong>ローディング中</strong>、<strong>成功（データ表示）</strong>、<strong>エラー</strong>の
                3つの UI を用意しましょう。これを忘れると、データ取得中に空白画面が表示されたり、
                エラー時にユーザーが何もできなくなったりします。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: カスタムフックでの抽象化 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">カスタムフックでの抽象化</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              データ取得のロジックはカスタムフックに切り出すと、再利用性が高まります。
            </p>

            <CodeBlock
              language="tsx"
              title="useFetch カスタムフック"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const json: T = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラー');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}

// 使い方がとてもシンプルになる！
function UserList() {
  const { data: users, loading, error, refetch } = useFetch<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  );

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error} <button onClick={refetch}>再試行</button></p>;

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
            />
          </section>

          {/* セクション5: axios の紹介 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">axios の紹介</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>axios</code> は fetch の代替となる人気の HTTP クライアントライブラリです。
              レスポンスの自動 JSON 変換やインターセプター機能など、便利な機能が揃っています。
            </p>

            <CodeBlock
              language="bash"
              title="インストール"
              code={`pnpm add axios`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="axios の使い方"
              showLineNumbers
              code={`import axios from 'axios';

// axios インスタンスを作成（ベース URL を設定）
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 10秒でタイムアウト
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET リクエスト
async function getUsers() {
  // fetch と違い、response.json() が不要
  const { data } = await api.get<User[]>('/users');
  return data; // 直接 JSON データが返る
}

// POST リクエスト
async function createUser(user: { name: string; email: string }) {
  const { data } = await api.post<User>('/users', user);
  return data;
}

// PUT リクエスト（更新）
async function updateUser(id: number, user: Partial<User>) {
  const { data } = await api.put<User>(\`/users/\${id}\`, user);
  return data;
}

// DELETE リクエスト
async function deleteUser(id: number) {
  await api.delete(\`/users/\${id}\`);
}

// エラーハンドリング
async function fetchWithErrorHandling() {
  try {
    const { data } = await api.get('/users');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // axios 固有のエラー情報にアクセスできる
      console.error('ステータス:', error.response?.status);
      console.error('データ:', error.response?.data);
    }
    throw error;
  }
}`}
            />

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">機能</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">fetch</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">axios</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">JSON 変換</td>
                    <td className="py-3 px-4">手動（response.json()）</td>
                    <td className="py-3 px-4">自動</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">エラーハンドリング</td>
                    <td className="py-3 px-4">HTTP エラーは throw しない</td>
                    <td className="py-3 px-4">4xx/5xx を自動的にエラーとして扱う</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">タイムアウト</td>
                    <td className="py-3 px-4">AbortController が必要</td>
                    <td className="py-3 px-4">オプションで設定可能</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">インストール</td>
                    <td className="py-3 px-4">不要（ブラウザ組み込み）</td>
                    <td className="py-3 px-4">npm install が必要</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* セクション6: 実践 — Todo アプリ API 連携 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践：Todo API 連携アプリ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JSONPlaceholder の Todo API を使って、Todo の一覧表示・追加・完了切り替えができるアプリを作りましょう。
            </p>

            <CodeBlock
              language="tsx"
              title="TodoApp.tsx"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  // Todo一覧を取得
  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos?_limit=10'
        );
        if (!response.ok) throw new Error('取得失敗');
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラー');
      } finally {
        setLoading(false);
      }
    }
    fetchTodos();
  }, []);

  // Todo を追加（API に POST）
  const addTodo = async () => {
    if (!newTitle.trim()) return;

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newTitle,
            completed: false,
            userId: 1,
          }),
        }
      );
      const newTodo: Todo = await response.json();

      // ローカルの state に追加（APIは仮のIDを返す）
      setTodos((prev) => [
        { ...newTodo, id: Date.now() },
        ...prev,
      ]);
      setNewTitle('');
    } catch (err) {
      alert('追加に失敗しました');
    }
  };

  // 完了状態を切り替え
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500
                        border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8 p-4 bg-red-50
                      border border-red-200 rounded-lg text-center">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Todo アプリ</h1>

      {/* 入力フォーム */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="新しいタスクを入力..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg
                     hover:bg-blue-600 transition-colors font-medium"
        >
          追加
        </button>
      </div>

      {/* Todo リスト */}
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={\`flex items-center gap-3 p-3 rounded-lg border
                        cursor-pointer transition-colors
                        \${todo.completed
                          ? 'bg-green-50 border-green-200'
                          : 'bg-white border-gray-200 hover:border-blue-300'
                        }\`}
          >
            <div className={\`w-5 h-5 rounded-full border-2 flex items-center
                            justify-center transition-colors
                            \${todo.completed
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300'
                            }\`}>
              {todo.completed && (
                <span className="text-white text-xs">✓</span>
              )}
            </div>
            <span className={\`flex-1 \${
              todo.completed
                ? 'line-through text-gray-400'
                : 'text-gray-800'
            }\`}>
              {todo.title}
            </span>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-400 mt-4 text-center">
        {todos.filter((t) => t.completed).length} / {todos.length} 完了
      </p>
    </div>
  );
}`}
            />

            <InfoBox type="success" title="API 連携のポイント">
              <p>
                このアプリで学んだポイントをまとめます。
                (1) <code>useEffect</code> でマウント時にデータ取得、
                (2) loading / error / data の3状態を管理、
                (3) POST でデータを送信、
                (4) ローカルの state を更新して即座に UI に反映。
                この基本パターンはほとんどの React アプリで使えます。
              </p>
            </InfoBox>
          </section>
        </div>

        {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Fetch API - MDN',
                  url: 'https://developer.mozilla.org/ja/docs/Web/API/Fetch_API',
                  description: 'Fetch API の Web 標準リファレンス',
                },
                {
                  title: 'useEffect - React',
                  url: 'https://ja.react.dev/reference/react/useEffect',
                  description: 'データ取得に使う useEffect の公式ガイド',
                },
                {
                  title: 'TanStack Query',
                  url: 'https://tanstack.com/query/latest',
                  description: 'サーバーステート管理の定番ライブラリ',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
