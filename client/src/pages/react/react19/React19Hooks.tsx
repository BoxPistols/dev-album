import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function React19Hooks() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 17</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">React 19 の新しい Hooks</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React 19 では、フォーム処理や非同期操作をよりシンプルに扱うための新しい Hooks が追加されました。
          useActionState、useOptimistic、useFormStatus を使うことで、
          これまで手動で管理していた「送信中」「エラー」「楽観的更新」の状態管理が大幅に簡単になります。
        </p>

        <WhyNowBox tags={['useActionState', 'useOptimistic', 'useFormStatus', 'useTransition']}>
          <p>
            これまでの React では、フォーム送信時の loading 状態やエラーハンドリングを
            useState と useEffect を組み合わせて手動で管理する必要がありました。
            React 19 の新しい Hooks は、こうした<strong>「よくあるパターン」を公式にサポート</strong>します。
            特に Server Actions と組み合わせたとき、効果的です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: useActionState */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useActionState: フォームアクションの状態管理</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useActionState</code> は、
              フォームの送信処理（アクション）の結果を状態として管理する Hook です。
              従来は useState で loading、error、data をそれぞれ管理していましたが、
              useActionState なら 1 つの Hook で完結します。
            </p>

            <CodeBlock
              language="tsx"
              title="useActionState の基本構文"
              showLineNumbers
              code={`import { useActionState } from 'react';

// useActionState<State, Payload>(action, initialState, permalink?)
// action: (previousState: State, formData: FormData) => State | Promise<State>
// initialState: 初期状態
// 戻り値: [state, formAction, isPending]

const [state, formAction, isPending] = useActionState(
  async (previousState, formData) => {
    // フォーム送信時の処理
    // previousState: 前回の状態（初回は initialState）
    // formData: フォームのデータ
    return newState; // 新しい状態を返す
  },
  initialState
);`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">実践例: ログインフォーム</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ログインフォームを useActionState で実装してみましょう。
              送信中の状態、成功・失敗の結果がすべて 1 つの Hook で管理できます。
            </p>

            <CodeBlock
              language="tsx"
              title="useActionState を使ったログインフォーム"
              showLineNumbers
              code={`import { useActionState } from 'react';

// アクションの結果の型
interface LoginState {
  error: string | null;
  success: boolean;
}

// ログイン処理（API呼び出し）
async function loginAction(
  previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // バリデーション
  if (!email || !password) {
    return { error: 'メールアドレスとパスワードを入力してください', success: false };
  }

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return { error: 'メールアドレスまたはパスワードが正しくありません', success: false };
    }

    return { error: null, success: true };
  } catch {
    return { error: 'ネットワークエラーが発生しました', success: false };
  }
}

function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: null,
    success: false,
  });

  if (state.success) {
    return <p className="text-green-600">ログインに成功しました！</p>;
  }

  return (
    <form action={formAction}>
      {state.error && (
        <p className="text-red-500 mb-4">{state.error}</p>
      )}

      <div className="mb-4">
        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isPending ? 'ログイン中...' : 'ログイン'}
      </button>
    </form>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="action 属性に関数を渡す">
                <p>
                  React 19 では、<code>&lt;form&gt;</code> の <code>action</code> 属性に関数を直接渡せます。
                  これにより <code>onSubmit</code> + <code>e.preventDefault()</code> のパターンが不要になります。
                  <code>useActionState</code> の第2戻り値 <code>formAction</code> をそのまま
                  <code>action</code> に渡すだけで、フォームの送信と状態管理が連携します。
                </p>
              </InfoBox>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">従来のパターンとの比較</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useActionState を使う前と後のコードを比較してみましょう。
              状態管理がどれだけシンプルになるか一目瞭然です。
            </p>

            <CodeBlock
              language="tsx"
              title="従来のパターン（React 18）"
              code={`function LoginFormOld() {
  // 3 つの state を個別管理...
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/login', { /* ... */ });
      if (!res.ok) {
        setError('ログインに失敗しました');
      } else {
        setSuccess(true);
      }
    } catch {
      setError('ネットワークエラー');
    } finally {
      setIsPending(false);
    }
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}`}
            />

            <CodeBlock
              language="tsx"
              title="React 19 のパターン（useActionState）"
              code={`function LoginFormNew() {
  // 1 つの Hook ですべて管理！
  const [state, formAction, isPending] = useActionState(
    loginAction,
    { error: null, success: false }
  );

  return <form action={formAction}>{/* ... */}</form>;
}
// state.error, state.success, isPending がすべて自動管理`}
            />
          </section>

          {/* セクション 2: useOptimistic */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useOptimistic: 楽観的 UI 更新</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useOptimistic</code> は、
              サーバーへの送信を待たずに UI を即座に更新する「楽観的更新」を簡単に実装する Hook です。
              ユーザーの操作に対して瞬時にフィードバックを返し、サーバーの応答後に正しい状態に同期します。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">楽観的更新とは？</h3>
            <div className="bg-muted/30 rounded-xl p-6 mb-6">
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>通常の更新</strong>: ボタンクリック → サーバー送信 → 応答を待つ → UI 更新（遅い）</li>
                <li><strong>楽観的更新</strong>: ボタンクリック → UI を即座に更新 → サーバー送信 → 失敗したら元に戻す（速い）</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                SNS の「いいね」ボタンが代表例です。押した瞬間にハートが赤くなり、
                サーバーの応答を待ちません。
              </p>
            </div>

            <CodeBlock
              language="tsx"
              title="useOptimistic の基本構文"
              showLineNumbers
              code={`import { useOptimistic } from 'react';

// useOptimistic<State, UpdateValue>(state, updateFn)
// state: 現在の実際の状態
// updateFn: 楽観的な状態を計算する関数
// 戻り値: [optimisticState, addOptimistic]

const [optimisticState, addOptimistic] = useOptimistic(
  currentState,
  (currentState, optimisticValue) => {
    // 楽観的な新しい状態を返す
    return newOptimisticState;
  }
);`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">実践例: いいねボタン</h3>

            <CodeBlock
              language="tsx"
              title="useOptimistic を使ったいいねボタン"
              showLineNumbers
              code={`import { useOptimistic, useActionState } from 'react';

interface Post {
  id: number;
  title: string;
  likes: number;
  isLiked: boolean;
}

function LikeButton({ post, onLike }: { post: Post; onLike: (postId: number) => Promise<Post> }) {
  // 楽観的な状態を管理
  const [optimisticPost, addOptimisticLike] = useOptimistic(
    post,
    (currentPost, _optimisticValue: null) => ({
      ...currentPost,
      likes: currentPost.isLiked ? currentPost.likes - 1 : currentPost.likes + 1,
      isLiked: !currentPost.isLiked,
    })
  );

  async function handleLike() {
    // 1. UI を即座に更新（楽観的更新）
    addOptimisticLike(null);

    // 2. サーバーに送信（失敗したら自動で元に戻る）
    await onLike(post.id);
  }

  return (
    <button onClick={handleLike} className="flex items-center gap-2">
      <span className={optimisticPost.isLiked ? 'text-red-500' : 'text-gray-400'}>
        {optimisticPost.isLiked ? '\u2764\uFE0F' : '\u2661'}
      </span>
      <span>{optimisticPost.likes}</span>
    </button>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">実践例: メッセージ送信</h3>
            <CodeBlock
              language="tsx"
              title="メッセージ一覧での楽観的更新"
              showLineNumbers
              code={`import { useOptimistic } from 'react';

interface Message {
  id: string;
  text: string;
  sending?: boolean; // 送信中フラグ（楽観的表示用）
}

function MessageThread({
  messages,
  sendMessage,
}: {
  messages: Message[];
  sendMessage: (text: string) => Promise<void>;
}) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentMessages, newMessage: string) => [
      ...currentMessages,
      {
        id: \`temp-\${Date.now()}\`,
        text: newMessage,
        sending: true, // 送信中は薄く表示
      },
    ]
  );

  async function handleSubmit(formData: FormData) {
    const text = formData.get('message') as string;

    // 即座にメッセージを表示（薄い状態で）
    addOptimisticMessage(text);

    // サーバーに送信
    await sendMessage(text);
    // 成功すると messages prop が更新され、sending: true が消える
  }

  return (
    <div>
      <ul className="space-y-2">
        {optimisticMessages.map((msg) => (
          <li
            key={msg.id}
            className={msg.sending ? 'opacity-50' : ''}
          >
            {msg.text}
            {msg.sending && <span className="text-xs text-gray-400 ml-2">送信中...</span>}
          </li>
        ))}
      </ul>

      <form action={handleSubmit}>
        <input name="message" placeholder="メッセージを入力..." />
        <button type="submit">送信</button>
      </form>
    </div>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="warning" title="楽観的更新の注意点">
                <p>
                  楽観的更新は<strong>「ほぼ確実に成功する操作」</strong>に使いましょう。
                  支払い処理やデータ削除など、失敗する可能性が高い操作や取り消しが難しい操作には不向きです。
                  サーバーのレスポンスが来ると楽観的状態は自動的にリセットされ、
                  実際の状態に置き換わります。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 3: useFormStatus */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useFormStatus: フォーム送信中の状態取得</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useFormStatus</code> は、
              親の <code>&lt;form&gt;</code> の送信状態を子コンポーネントから読み取る Hook です。
              <code>react-dom</code> からインポートします。
              送信ボタンやインジケーターのコンポーネントを作るときに便利です。
            </p>

            <CodeBlock
              language="tsx"
              title="useFormStatus の基本"
              showLineNumbers
              code={`import { useFormStatus } from 'react-dom';

// useFormStatus() は親の <form> 内で呼ぶ必要がある
// 戻り値: { pending, data, method, action }

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? '送信中...' : '送信'}
    </button>
  );
}

// 使い方: <form> の中に配置するだけ
function ContactForm() {
  async function handleSubmit(formData: FormData) {
    await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    });
  }

  return (
    <form action={handleSubmit}>
      <input name="name" placeholder="お名前" />
      <input name="email" placeholder="メール" />
      <textarea name="message" placeholder="メッセージ" />

      {/* SubmitButton は自動的に親 form の送信状態を取得 */}
      <SubmitButton />
    </form>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">再利用可能なフォームコンポーネント</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useFormStatus を使えば、どのフォームでも使い回せる汎用的なコンポーネントを作れます。
            </p>

            <CodeBlock
              language="tsx"
              title="汎用フォームコンポーネント集"
              showLineNumbers
              code={`import { useFormStatus } from 'react-dom';

// 送信ボタン: あらゆるフォームで使える
function SubmitButton({
  children = '送信',
  pendingText = '送信中...',
}: {
  children?: React.ReactNode;
  pendingText?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {pending ? pendingText : children}
    </button>
  );
}

// フォーム全体のオーバーレイ
function FormOverlay() {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return (
    <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded">
      <p className="text-sm text-gray-500">処理中です...</p>
    </div>
  );
}

// 入力フィールド: 送信中は無効化
function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { pending } = useFormStatus();
  return <input {...props} disabled={pending || props.disabled} />;
}

// 組み合わせて使う
function RegistrationForm() {
  return (
    <form action={registerUser} className="relative">
      <FormOverlay />
      <FormInput name="username" placeholder="ユーザー名" />
      <FormInput name="email" type="email" placeholder="メール" />
      <SubmitButton pendingText="登録中...">アカウント作成</SubmitButton>
    </form>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="useFormStatus は子コンポーネントから呼ぶ">
                <p>
                  <code>useFormStatus</code> は <code>&lt;form&gt;</code> を直接レンダリングしているコンポーネントでは使えません。
                  必ず <code>&lt;form&gt;</code> の<strong>子コンポーネント</strong>で呼ぶ必要があります。
                  これは、どの <code>&lt;form&gt;</code> の状態を読み取るかを React が自動判定するための制約です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 4: useTransition の改善 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useTransition の改善点: async transitions</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React 18 で追加された <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useTransition</code> が
              React 19 でさらに強化されました。最大の変更点は、
              <strong>startTransition に非同期関数（async function）を渡せる</strong>ようになったことです。
            </p>

            <CodeBlock
              language="tsx"
              title="React 18 の useTransition（同期のみ）"
              code={`// React 18: startTransition には同期関数のみ
const [isPending, startTransition] = useTransition();

function handleClick() {
  startTransition(() => {
    // 同期的な state 更新のみ
    setSearchResults(filterData(query));
  });
}`}
            />

            <CodeBlock
              language="tsx"
              title="React 19 の useTransition（非同期対応）"
              showLineNumbers
              code={`import { useTransition, useState } from 'react';

function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();

  async function handleSearch(query: string) {
    // React 19: async 関数を渡せる！
    startTransition(async () => {
      // 非同期処理（API呼び出し）も transition として扱える
      const data = await fetch(\`/api/search?q=\${query}\`);
      const json = await data.json();
      setResults(json.results);
      // isPending は async 関数が完了するまで true のまま
    });
  }

  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {isPending && <p className="text-gray-400">検索中...</p>}
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">useTransition vs useActionState の使い分け</h3>
            <div className="bg-muted/30 rounded-xl p-6 mb-6">
              <ul className="list-disc list-inside text-muted-foreground space-y-3">
                <li>
                  <strong>useActionState</strong>: フォームの送信処理に最適。
                  <code>&lt;form action=&#123;...&#125;&gt;</code> と連携し、FormData を自動的に受け取る。
                  結果の状態管理もセットになっている。
                </li>
                <li>
                  <strong>useTransition</strong>: フォーム以外の非同期操作（検索、フィルタ、ページ遷移など）に最適。
                  既存の state 更新を「優先度の低い更新」としてマークする。
                  isPending で処理中かどうかだけを追跡する。
                </li>
              </ul>
            </div>

            <CodeBlock
              language="tsx"
              title="useTransition を使ったタブ切り替え"
              showLineNumbers
              code={`import { useState, useTransition } from 'react';

function TabContainer() {
  const [activeTab, setActiveTab] = useState('posts');
  const [isPending, startTransition] = useTransition();

  function switchTab(tab: string) {
    startTransition(async () => {
      // タブ切り替え時にデータを事前に取得
      await prefetchTabData(tab);
      setActiveTab(tab);
    });
  }

  return (
    <div>
      <div className="flex gap-2 border-b">
        {['posts', 'comments', 'profile'].map((tab) => (
          <button
            key={tab}
            onClick={() => switchTab(tab)}
            className={activeTab === tab ? 'border-b-2 border-blue-500 font-bold' : ''}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* isPending 中は前のタブの内容を表示しつつ、薄くする */}
      <div className={isPending ? 'opacity-50 pointer-events-none' : ''}>
        <TabContent tab={activeTab} />
      </div>
    </div>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="isPending でスムーズな UX">
                <p>
                  <code>isPending</code> が true の間、現在のコンテンツをそのまま表示しながら
                  ローディングインジケーターを重ねて表示できます。
                  これにより、画面が一瞬白くなるフラッシュを防ぎ、
                  スムーズなユーザー体験を提供できます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 5: 組み合わせパターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Hooks を組み合わせた実践例</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useActionState と useOptimistic を組み合わせると、
              フォーム送信と楽観的更新を同時に実現できます。
            </p>

            <CodeBlock
              language="tsx"
              title="Todo アプリ: useActionState + useOptimistic"
              showLineNumbers
              code={`import { useOptimistic, useActionState } from 'react';
import { useFormStatus } from 'react-dom';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  pending?: boolean;
}

interface TodoState {
  todos: Todo[];
  error: string | null;
}

// サーバーへの送信を模擬
async function addTodoAction(
  prevState: TodoState,
  formData: FormData
): Promise<TodoState> {
  const text = formData.get('todo') as string;

  if (!text.trim()) {
    return { ...prevState, error: 'Todoを入力してください' };
  }

  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const newTodo = await response.json();

    return {
      todos: [...prevState.todos, newTodo],
      error: null,
    };
  } catch {
    return { ...prevState, error: '追加に失敗しました' };
  }
}

function AddTodoButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? '追加中...' : '追加'}
    </button>
  );
}

function TodoApp() {
  const [state, formAction] = useActionState(addTodoAction, {
    todos: [],
    error: null,
  });

  // 楽観的に Todo を表示
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    state.todos,
    (currentTodos, newText: string) => [
      ...currentTodos,
      { id: \`temp-\${Date.now()}\`, text: newText, completed: false, pending: true },
    ]
  );

  async function handleSubmit(formData: FormData) {
    const text = formData.get('todo') as string;
    if (text.trim()) {
      addOptimisticTodo(text);
    }
    return formAction(formData);
  }

  return (
    <div>
      <form action={handleSubmit}>
        <input name="todo" placeholder="新しいTodo..." />
        <AddTodoButton />
      </form>
      {state.error && <p className="text-red-500">{state.error}</p>}
      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id} className={todo.pending ? 'opacity-50' : ''}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}`}
            />
          </section>

          {/* セクション 6: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="bg-muted/30 rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">1</span>
                <p className="text-muted-foreground">
                  <strong>useActionState</strong>: フォームアクションの結果（成功・失敗）と isPending を 1 つの Hook で管理
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">2</span>
                <p className="text-muted-foreground">
                  <strong>useOptimistic</strong>: サーバー応答を待たずに UI を即座に更新。失敗時は自動で元に戻る
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">3</span>
                <p className="text-muted-foreground">
                  <strong>useFormStatus</strong>: 子コンポーネントから親フォームの送信状態を取得。再利用可能なボタンに最適
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">4</span>
                <p className="text-muted-foreground">
                  <strong>useTransition</strong>: React 19 で async 対応に。非同期操作中も isPending で UX をスムーズに
                </p>
              </div>
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="useActionState の戻り値として正しい組み合わせはどれですか？"
              options={[
                { label: '[state, dispatch]' },
                { label: '[state, formAction, isPending]', correct: true },
                { label: '[isPending, startTransition]' },
                { label: '[optimisticState, addOptimistic]' },
              ]}
              explanation="useActionState は [state, formAction, isPending] の 3 つを返します。state はアクションの結果、formAction は <form action={...}> に渡す関数、isPending は処理中かどうかの boolean です。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="useFormStatus について正しい説明はどれですか？"
              options={[
                { label: '<form> を直接レンダリングしているコンポーネント内で使う' },
                { label: 'react パッケージからインポートする' },
                { label: '<form> の子コンポーネント内で使い、親フォームの送信状態を取得する', correct: true },
                { label: 'useActionState の代わりに使える' },
              ]}
              explanation="useFormStatus は react-dom からインポートし、<form> の子コンポーネント内で呼びます。親の <form> が action で送信中かどうか（pending）、送信データ（data）、メソッド（method）などを取得できます。<form> を直接レンダリングしているコンポーネントでは使えないことに注意してください。"
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="useActionState でコメント投稿フォームを作成する"
              description="useActionState を使って、コメント投稿フォームを実装してください。アクション関数は formData からコメントテキストを取得し、バリデーション（空文字チェック）を行い、成功時は { comments: [...prev, newComment], error: null } を、失敗時は { ...prev, error: 'エラーメッセージ' } を返してください。"
              initialCode={`import { useActionState } from 'react';

interface CommentState {
  comments: string[];
  error: string | null;
}

// ここにアクション関数と CommentForm コンポーネントを実装してください
// 1. commentAction 関数: prevState と formData を受け取り、新しい CommentState を返す
// 2. CommentForm コンポーネント: useActionState を使ってフォームを実装`}
              answer={`import { useActionState } from 'react';

interface CommentState {
  comments: string[];
  error: string | null;
}

async function commentAction(
  prevState: CommentState,
  formData: FormData
): Promise<CommentState> {
  const text = formData.get('comment') as string;

  if (!text.trim()) {
    return { ...prevState, error: 'コメントを入力してください' };
  }

  // 実際にはここでサーバーに送信
  return {
    comments: [...prevState.comments, text],
    error: null,
  };
}

function CommentForm() {
  const [state, formAction, isPending] = useActionState(commentAction, {
    comments: [],
    error: null,
  });

  return (
    <div>
      <form action={formAction}>
        <input name="comment" placeholder="コメントを入力..." />
        <button type="submit" disabled={isPending}>
          {isPending ? '送信中...' : '投稿'}
        </button>
      </form>
      {state.error && <p className="text-red-500">{state.error}</p>}
      <ul>
        {state.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}`}
              keywords={['useActionState(', 'formData.get(', 'action={formAction}', 'isPending']}
              hints={[
                'useActionState の第1引数はアクション関数、第2引数は初期状態です。',
                'アクション関数は (previousState, formData) => newState の形式です。',
                'formData.get("comment") でフォームの値を取得できます。',
              ]}
            />
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'useActionState - React 公式リファレンス',
                  url: 'https://ja.react.dev/reference/react/useActionState',
                  description: 'フォームアクションの状態管理 Hook の仕様と使い方',
                },
                {
                  title: 'useOptimistic - React 公式リファレンス',
                  url: 'https://ja.react.dev/reference/react/useOptimistic',
                  description: '楽観的 UI 更新の Hook の仕様と実践パターン',
                },
                {
                  title: 'useFormStatus - React 公式リファレンス',
                  url: 'https://ja.react.dev/reference/react-dom/hooks/useFormStatus',
                  description: 'フォーム送信状態を子コンポーネントから取得する Hook',
                },
                {
                  title: 'React 19 アップグレードガイド',
                  url: 'https://ja.react.dev/blog/2024/12/05/react-19',
                  description: 'React 19 の全新機能と移行方法の公式ブログ記事',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'useActionState は Server Components でしか使えないのですか？',
                  answer: 'いいえ、useActionState はクライアントコンポーネントでも問題なく使えます。Server Actions と組み合わせると最も効果的ですが、通常のクライアントサイドのフォーム処理（fetch での API 呼び出しなど）にも使用できます。action 関数は同期・非同期のどちらでも構いません。',
                },
                {
                  question: 'useOptimistic で楽観的更新が失敗した場合、自動的に元に戻りますか？',
                  answer: 'はい、自動的に元に戻ります。useOptimistic の第1引数に渡した「実際の状態（state）」が更新されると、楽観的な状態は破棄されて実際の状態に置き換わります。サーバーからエラーが返された場合、実際の state が変わらないため、楽観的な変更は自然にリセットされます。',
                },
                {
                  question: 'useFormStatus と useActionState の isPending の違いは何ですか？',
                  answer: 'useActionState の isPending はそのフォームのアクションが処理中かどうかを、フォームを管理しているコンポーネント自身で取得します。一方、useFormStatus は子コンポーネントから親フォームの送信状態を取得するための Hook です。再利用可能なボタンコンポーネントなど、フォームの外に切り出した部品で使うのに適しています。',
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
