import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function UseReducer() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 14</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">useReducer</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          useState だけでは管理しきれない、複雑な状態を整理するための Hook。
          「何が起きたか（アクション）」と「どう変わるか（リデューサー）」を分離することで、状態の変化が予測しやすくなります。
        </p>

        <WhyNowBox tags={['useReducer', 'dispatch', 'reducer', '複雑な状態管理']}>
          <p>
            useState を複数組み合わせて管理していると、「この state が変わったらあの state も変えて...」と処理が絡み合い始めます。
            useReducer を使えば、<strong>すべての状態変化を 1 箇所に集約</strong>でき、バグを減らしながらコードの見通しがよくなります。
            React 公式も「複雑な state ロジックには useReducer を推奨」しています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: useState の限界 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useState だけでは辛くなるとき</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              まず、useState だけで頑張ろうとして複雑になるケースを見てみましょう。
            </p>
            <CodeBlock
              language="tsx"
              title="useState で管理が複雑になる例"
              code={`function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 商品を追加するたびに複数の state を更新...
  const addItem = (item: CartItem) => {
    setItems([...items, item]);
    setTotal(total + item.price);
    setItemCount(itemCount + 1);
    // discount は条件次第で変わったり変わらなかったり...
    if (itemCount + 1 >= 3) {
      setDiscount(total * 0.1);
    }
  };

  // 削除も同様に複数の state を同時に更新...
  // どこかで整合性が崩れるリスクが高い
}`}
            />
            <div className="mt-6 mb-6">
              <InfoBox type="warning" title="関連する state のバラバラ管理は危険">
                <p>
                  複数の useState が互いに依存していると、更新のタイミングがずれたり、
                  1 つだけ更新し忘れたりしてバグの原因になります。
                  useReducer を使えば、これらを 1 つのオブジェクトにまとめて一括管理できます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 2: useReducer の基本 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useReducer の基本構造</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useReducer は 3 つの要素で構成されています:
            </p>
            <ol className="list-decimal list-inside text-muted-foreground mb-6 space-y-2">
              <li><strong>State（状態）</strong>: 現在のデータ</li>
              <li><strong>Action（アクション）</strong>: 「何が起きたか」を表すオブジェクト</li>
              <li><strong>Reducer（リデューサー）</strong>: State と Action を受け取り、新しい State を返す関数</li>
            </ol>

            <div className="mb-6">
              <InfoBox type="info" title="身近なたとえ">
                <p>
                  Figma のバージョン履歴に似ています。各変更（Action）が「テキスト色を赤に変更」「フォントサイズを 16px に変更」のように記録され、
                  Reducer がそれを受け取って新しいデザイン（State）を生成します。何がどう変わったかが明確で、やり直し（undo）もしやすいのが特徴です。
                </p>
              </InfoBox>
            </div>

            <CodeBlock
              language="tsx"
              title="useReducer の基本構文"
              showLineNumbers
              code={`import { useReducer } from 'react';

// 1. State の型
interface CounterState {
  count: number;
}

// 2. Action の型
type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; payload: number };

// 3. Reducer 関数
function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    case 'set':
      return { count: action.payload };
    default:
      return state;
  }
}

// 4. コンポーネントで使う
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="text-center">
      <p className="text-4xl font-bold mb-4">{state.count}</p>
      <div className="flex gap-2 justify-center">
        <button onClick={() => dispatch({ type: 'decrement' })}>
          -1
        </button>
        <button onClick={() => dispatch({ type: 'reset' })}>
          リセット
        </button>
        <button onClick={() => dispatch({ type: 'increment' })}>
          +1
        </button>
        <button onClick={() => dispatch({ type: 'set', payload: 100 })}>
          100にセット
        </button>
      </div>
    </div>
  );
}`}
            />

            <CodePreview
              title="useReducer カウンター → ボタンを押してみよう"
              previewHeight={160}
              code={`function counterReducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'decrement': return { count: state.count - 1 }
    case 'reset': return { count: 0 }
    case 'set': return { count: action.payload }
    default: return state
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(counterReducer, { count: 0 })

  const btnStyle = (bg) => ({
    padding: '6px 16px', borderRadius: '8px', border: 'none',
    cursor: 'pointer', color: 'white', backgroundColor: bg, fontSize: '14px',
  })

  return (
    <div style={{ textAlign: 'center', padding: '16px' }}>
      <p style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>{state.count}</p>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => dispatch({ type: 'decrement' })} style={btnStyle('#EF4444')}>-1</button>
        <button onClick={() => dispatch({ type: 'reset' })} style={btnStyle('#6B7280')}>リセット</button>
        <button onClick={() => dispatch({ type: 'increment' })} style={btnStyle('#3B82F6')}>+1</button>
        <button onClick={() => dispatch({ type: 'set', payload: 100 })} style={btnStyle('#8B5CF6')}>100にセット</button>
      </div>
    </div>
  )
}

function App() {
  return <Counter />
}
`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="dispatch とは？">
                <p>
                  <code>dispatch</code> は「アクションを送る」関数です。
                  <code>dispatch(&#123; type: 'increment' &#125;)</code> と書くと、Reducer に「increment アクションが発生した」と伝えます。
                  Reducer がそれを受け取り、新しい state を返します。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 3: Flux アーキテクチャとの関連 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Flux アーキテクチャとの関連</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useReducer の設計は、Facebook（現 Meta）が提唱した <strong>Flux アーキテクチャ</strong>をベースにしています。
              Flux は「データの流れを一方向にする」ことで、アプリの状態管理を予測しやすくするパターンです。
              Redux もこの Flux の考え方をベースにした状態管理ライブラリです。
            </p>
            <CodeBlock
              language="text"
              title="Flux の一方向データフロー"
              code={`ユーザー操作
    ↓
 Action（何が起きたかを記述）
    ↓
 Dispatcher（Action を Reducer に送る）
    ↓
 Reducer（Action に基づいて State を更新）
    ↓
 新しい State
    ↓
 View（UI を更新）
    ↓
 ユーザー操作...（繰り返し）`}
            />
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useReducer はこの Flux パターンを React の Hook として実装したものです。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">dispatch</code> が Dispatcher の役割を果たし、
              Reducer 関数が Store の更新ロジックを担当します。
            </p>
            <div className="mb-6">
              <InfoBox type="info" title="Redux との違い">
                <p>
                  Redux はグローバルに 1 つの Store を持ち、ミドルウェアや DevTools などの豊富なエコシステムがあります。
                  useReducer はコンポーネントローカルな状態管理に適しています。
                  useReducer + useContext を組み合わせると Redux に近い構成が作れますが、
                  大規模アプリでは Redux Toolkit や Zustand のほうが機能面で優れています。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 4: useState との比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useState と useReducer の使い分け</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">観点</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">useState</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">useReducer</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">状態の数</td>
                    <td className="py-3 px-4">1〜2 個の独立した値</td>
                    <td className="py-3 px-4">複数の関連する値</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">更新ロジック</td>
                    <td className="py-3 px-4">シンプルな代入</td>
                    <td className="py-3 px-4">条件分岐が多い複雑な更新</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">コード量</td>
                    <td className="py-3 px-4">少ない</td>
                    <td className="py-3 px-4">やや多い（型定義 + Reducer）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium">テスト</td>
                    <td className="py-3 px-4">コンポーネントごと</td>
                    <td className="py-3 px-4">Reducer 関数を単体テスト可能</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">デバッグ</td>
                    <td className="py-3 px-4">どこで変わったか追いにくい</td>
                    <td className="py-3 px-4">Action を見れば変更の経緯がわかる</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-6">
              <InfoBox type="success" title="判断基準">
                <p>
                  迷ったら useState から始めましょう。「state を更新する場所が 3 箇所以上ある」「複数の state が常にセットで更新される」
                  と感じたら useReducer への移行を検討するタイミングです。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 5: Reducer の TypeScript 型付け */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Reducer の TypeScript 型付け</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useReducer は TypeScript との相性が非常に優れています。
              Action をユニオン型（Discriminated Union）で定義すると、switch 文の中で
              TypeScript が自動的に型を絞り込み、タイプミスやペイロードの漏れを防いでくれます。
            </p>
            <CodeBlock
              language="tsx"
              title="TypeScript による厳密な型付け"
              showLineNumbers
              code={`// State の型
interface FormState {
  name: string;
  email: string;
  age: number;
  errors: Record<string, string>;
  isSubmitting: boolean;
}

// Action の型: Discriminated Union（判別可能なユニオン型）
type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormState; value: string | number }
  | { type: 'SET_ERROR'; field: string; message: string }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      // TypeScript は action.field と action.value の型を知っている
      return { ...state, [action.field]: action.value };

    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };

    case 'CLEAR_ERRORS':
      // このケースでは payload がないことを TypeScript が保証
      return { ...state, errors: {} };

    case 'SUBMIT_START':
      return { ...state, isSubmitting: true };

    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false };

    case 'SUBMIT_ERROR':
      // action.error が string 型であることが保証される
      return {
        ...state,
        isSubmitting: false,
        errors: { submit: action.error },
      };

    // すべての case を処理しないと TypeScript がエラーを出す
    // （exhaustive check）
    default:
      return state;
  }
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="Discriminated Union の強力さ">
                <p>
                  Action の <code>type</code> プロパティによって TypeScript が型を自動的に絞り込むため、
                  <code>case 'SET_FIELD':</code> の中では <code>action.field</code> と <code>action.value</code> が利用可能だとわかります。
                  <code>case 'CLEAR_ERRORS':</code> では payload プロパティにアクセスしようとするとコンパイルエラーになります。
                  これにより、Action のミスマッチをコンパイル時に検出できます。
                </p>
              </InfoBox>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">網羅性チェック（Exhaustive Check）</h3>
            <CodeBlock
              language="tsx"
              title="すべてのアクションを処理しているか検証する"
              code={`// never 型を使った網羅性チェック
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.message } };
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true };
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false };
    case 'SUBMIT_ERROR':
      return { ...state, isSubmitting: false, errors: { submit: action.error } };
    default: {
      // 新しい Action を追加して case を書き忘れると
      // ここで TypeScript がコンパイルエラーを出す
      const _exhaustive: never = action;
      return state;
    }
  }
}`}
            />
          </section>

          {/* セクション 6: Todo アプリ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: useReducer で Todo アプリを作る</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useReducer の威力を感じられる、実用的な Todo アプリを作ってみましょう。
              追加・削除・完了切り替え・フィルターの機能を持ちます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. 型定義とリデューサー</h3>
            <CodeBlock
              language="tsx"
              title="todoReducer.ts"
              showLineNumbers
              code={`// Todo の型
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// State の型
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  nextId: number;
}

// Action の型（ユニオン型で全アクションを列挙）
type TodoAction =
  | { type: 'add'; payload: string }
  | { type: 'toggle'; payload: number }
  | { type: 'delete'; payload: number }
  | { type: 'setFilter'; payload: 'all' | 'active' | 'completed' }
  | { type: 'clearCompleted' };

// 初期状態
const initialState: TodoState = {
  todos: [],
  filter: 'all',
  nextId: 1,
};

// Reducer 関数
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.nextId,
            text: action.payload,
            completed: false,
          },
        ],
        nextId: state.nextId + 1,
      };

    case 'toggle':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => todo.id !== action.payload
        ),
      };

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };

    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    default:
      return state;
  }
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">2. コンポーネント</h3>
            <CodePreview
              title="Todo アプリ → タスクを追加・完了・削除してみよう"
              previewHeight={380}
              code={`function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, todos: [...state.todos, { id: state.nextId, text: action.payload, completed: false }], nextId: state.nextId + 1 }
    case 'toggle':
      return { ...state, todos: state.todos.map((t) => t.id === action.payload ? { ...t, completed: !t.completed } : t) }
    case 'delete':
      return { ...state, todos: state.todos.filter((t) => t.id !== action.payload) }
    case 'setFilter':
      return { ...state, filter: action.payload }
    case 'clearCompleted':
      return { ...state, todos: state.todos.filter((t) => !t.completed) }
    default: return state
  }
}

function TodoApp() {
  const [state, dispatch] = React.useReducer(todoReducer, { todos: [], filter: 'all', nextId: 1 })
  const [input, setInput] = React.useState('')

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === 'active') return !todo.completed
    if (state.filter === 'completed') return todo.completed
    return true
  })
  const activeTodoCount = state.todos.filter((t) => !t.completed).length

  const handleAdd = () => {
    if (!input.trim()) return
    dispatch({ type: 'add', payload: input.trim() })
    setInput('')
  }

  const filterBtn = (f, label) => (
    <button key={f} onClick={() => dispatch({ type: 'setFilter', payload: f })} style={{
      padding: '4px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '13px',
      backgroundColor: state.filter === f ? '#3B82F6' : '#E5E7EB',
      color: state.filter === f ? 'white' : '#374151',
    }}>{label}</button>
  )

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '16px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Todo リスト</h1>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} placeholder="新しいタスクを入力..." style={{ flex: 1, border: '1px solid #D1D5DB', borderRadius: '6px', padding: '6px 10px', fontSize: '14px' }} />
        <button onClick={handleAdd} style={{ padding: '6px 16px', borderRadius: '6px', backgroundColor: '#3B82F6', color: 'white', border: 'none', cursor: 'pointer', fontSize: '14px' }}>追加</button>
      </div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
        {filterBtn('all', 'すべて')}{filterBtn('active', '未完了')}{filterBtn('completed', '完了済み')}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px 0' }}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', border: '1px solid #E5E7EB', borderRadius: '6px', marginBottom: '6px' }}>
            <input type="checkbox" checked={todo.completed} onChange={() => dispatch({ type: 'toggle', payload: todo.id })} />
            <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#9CA3AF' : '#1F2937', fontSize: '14px' }}>{todo.text}</span>
            <button onClick={() => dispatch({ type: 'delete', payload: todo.id })} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}>削除</button>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6B7280' }}>
        <span>残り {activeTodoCount} 件</span>
        <button onClick={() => dispatch({ type: 'clearCompleted' })} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}>完了済みを削除</button>
      </div>
    </div>
  )
}

function App() {
  return <TodoApp />
}
`}
            />
          </section>

          {/* セクション 7: immer ライブラリ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">immer でイミュータブルな更新を簡潔に書く</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Reducer ではイミュータブル（不変）な更新が必須です。つまり、state を直接変更するのではなく、
              新しいオブジェクトを作って返す必要があります。しかし、ネストが深いオブジェクトを
              スプレッド構文で更新するのは冗長で読みにくくなります。
            </p>

            <CodeBlock
              language="tsx"
              title="NG: ネストが深いと冗長になる"
              code={`// スプレッド構文による更新（正しいが冗長）
case 'UPDATE_ADDRESS':
  return {
    ...state,
    user: {
      ...state.user,
      address: {
        ...state.user.address,
        city: action.payload.city,
      },
    },
  };`}
            />

            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>immer</strong> ライブラリを使うと、あたかもオブジェクトを直接変更するかのようなコードを書きつつ、
              内部的にはイミュータブルな更新が行われます。
            </p>

            <CodeBlock
              language="tsx"
              title="immer を使ったシンプルな Reducer"
              showLineNumbers
              code={`import { useReducer } from 'react';
import { produce } from 'immer';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  coupon: string | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'APPLY_COUPON'; payload: string }
  | { type: 'CLEAR_CART' };

// produce を使うと、draft を「直接変更」するコードが書ける
// 実際には immer が内部で新しいオブジェクトを生成してくれる
const cartReducer = produce(
  (draft: CartState, action: CartAction) => {
    switch (action.type) {
      case 'ADD_ITEM': {
        const existing = draft.items.find(
          (item) => item.id === action.payload.id
        );
        if (existing) {
          // 直接変更できる！（内部でイミュータブルに処理される）
          existing.quantity += 1;
        } else {
          draft.items.push({ ...action.payload, quantity: 1 });
        }
        break;
      }

      case 'REMOVE_ITEM': {
        const index = draft.items.findIndex(
          (item) => item.id === action.payload
        );
        if (index !== -1) {
          draft.items.splice(index, 1); // 直接 splice できる！
        }
        break;
      }

      case 'UPDATE_QUANTITY': {
        const item = draft.items.find(
          (item) => item.id === action.payload.id
        );
        if (item) {
          item.quantity = action.payload.quantity;
        }
        break;
      }

      case 'APPLY_COUPON':
        draft.coupon = action.payload;
        break;

      case 'CLEAR_CART':
        draft.items = [];
        draft.coupon = null;
        break;
    }
  }
);

// 使い方
function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    coupon: null,
  });

  // ...
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="immer を使うメリット">
                <p>
                  immer は Redux Toolkit にも組み込まれている人気ライブラリです。
                  <code>npm install immer</code> でインストールできます。
                  特にネストが深い state を扱う場合に効果的で、
                  コード量が大幅に減り、可読性が向上します。
                  パフォーマンスへの影響も軽微です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 8: useReducer + useContext */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">応用: useReducer + useContext</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useReducer と useContext を組み合わせると、アプリ全体で共有する複雑な状態管理が実現できます。
              これは Redux のような状態管理ライブラリの基本的なしくみと同じ考え方です。
            </p>
            <CodeBlock
              language="tsx"
              title="Context + Reducer パターン"
              showLineNumbers
              code={`import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from 'react';

// Context を 2 つに分割（state と dispatch を分ける）
const TodoStateContext = createContext<TodoState | undefined>(
  undefined
);
const TodoDispatchContext = createContext<
  React.Dispatch<TodoAction> | undefined
>(undefined);

// Provider
export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// カスタム Hook
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('TodoProvider の中で使ってください');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('TodoProvider の中で使ってください');
  }
  return context;
}

// 使い方: どのコンポーネントからでもアクセス可能
function AddTodoButton() {
  const dispatch = useTodoDispatch();

  return (
    <button onClick={() => dispatch({ type: 'add', payload: '新しいタスク' })}>
      タスク追加
    </button>
  );
}

function TodoCount() {
  const state = useTodoState();
  const active = state.todos.filter((t) => !t.completed).length;

  return <p>残り {active} 件</p>;
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="state と dispatch を分割するメリット">
                <p>
                  state と dispatch を別々の Context にすることで、dispatch だけを使うコンポーネント（ボタンなど）は
                  state が変わっても再レンダーされません。パフォーマンスの最適化に役立ちます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 9: パターンとベストプラクティス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Reducer のベストプラクティス</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. Action は「何が起きたか」を表現する</h3>
            <CodeBlock
              language="tsx"
              title="Action の命名"
              code={`// NG: 「どう変えるか」を名前にしている
dispatch({ type: 'setItems', payload: [...items, newItem] });

// OK: 「何が起きたか」を名前にする
dispatch({ type: 'itemAdded', payload: newItem });
dispatch({ type: 'itemDeleted', payload: itemId });
dispatch({ type: 'filterChanged', payload: 'active' });`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">2. Reducer は純粋関数にする</h3>
            <CodeBlock
              language="tsx"
              title="純粋関数のルール"
              code={`// NG: Reducer の中で副作用を起こす
function badReducer(state: State, action: Action) {
  switch (action.type) {
    case 'save':
      localStorage.setItem('data', JSON.stringify(state)); // 副作用！
      fetch('/api/save', { method: 'POST' }); // 副作用！
      return state;
  }
}

// OK: Reducer は state の計算だけに集中
function goodReducer(state: State, action: Action) {
  switch (action.type) {
    case 'save':
      return { ...state, isSaved: true };
  }
}
// 副作用は useEffect や イベントハンドラーで実行する`}
            />

            <div className="mt-6">
              <InfoBox type="info" title="純粋関数とは？">
                <p>
                  同じ入力に対して常に同じ出力を返し、外部に影響を与えない関数のことです。
                  API 呼び出し、localStorage への書き込み、console.log なども「副作用」に該当します。
                  Reducer を純粋関数にすることで、テストが簡単になり、バグも見つけやすくなります。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="useReducer の Reducer 関数で正しくないものはどれですか？"
              options={[
                { label: '新しい state オブジェクトを return する' },
                { label: 'action.type を switch 文で分岐する' },
                { label: 'Reducer の中で fetch を呼んで API リクエストを送る', correct: true },
                { label: 'スプレッド構文でイミュータブルに state を更新する' },
              ]}
              explanation="Reducer は純粋関数でなければなりません。API リクエストや localStorage への書き込みなどの副作用は、Reducer ではなくイベントハンドラーや useEffect で実行します。Reducer は state の計算のみに集中させましょう。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="useState と useReducer のどちらを選ぶべきですか？「3つの state が常にセットで更新される」場合の推奨は？"
              options={[
                { label: 'useState を 3 つ使う' },
                { label: 'useState で 1 つのオブジェクトにまとめる' },
                { label: 'useReducer を使って 1 つの state にまとめ、Action で更新する', correct: true },
                { label: 'useRef を使って値を管理する' },
              ]}
              explanation="複数の state が常にセットで更新される場合は、useReducer で 1 つの state にまとめるのが最適です。Action によって「何が起きたか」を明示的に表現でき、すべての更新ロジックが Reducer に集約されるため、バグが起きにくく、デバッグもしやすくなります。"
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="ショッピングカートの useReducer 実装"
              description="cartReducer の remove と updateQuantity の ___ を埋めてください。配列のイミュータブルな更新がポイントです。"
              initialCode={`interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'add'; payload: { id: number; name: string; price: number } }
  | { type: 'remove'; payload: number }
  | { type: 'updateQuantity'; payload: { id: number; quantity: number } };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'remove':
      return {
        ...state,
        items: state.items.___((_item) => _item.id !== action.payload), // ← ここを埋める（配列メソッド名）
      };
    case 'updateQuantity':
      return {
        ...state,
        items: state.items.___((_item) => // ← ここを埋める（配列メソッド名）
          _item.id === action.payload.id
            ? { ..._item, quantity: action.payload.quantity }
            : _item
        ),
      };
    default:
      return state;
  }
}`}
              answer={`interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'add'; payload: { id: number; name: string; price: number } }
  | { type: 'remove'; payload: number }
  | { type: 'updateQuantity'; payload: { id: number; quantity: number } };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'remove':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'updateQuantity':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
}`}
              keywords={['items.filter(', 'items.map(']}
              hints={[
                'remove: 条件に合わない要素を除外するメソッドは .filter() です',
                'updateQuantity: 全要素を変換して新しい配列を作るメソッドは .map() です',
              ]}
            />
          </section>

          {/* セクション 10: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="bg-muted/30 rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">1</span>
                <p className="text-muted-foreground"><strong>useReducer は複雑な状態管理のための Hook</strong>。関連する複数の state を 1 つにまとめ、更新ロジックを集約できる</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">2</span>
                <p className="text-muted-foreground"><strong>State + Action + Reducer の 3 要素</strong>。「何が起きたか」をアクションで表現し、Reducer が新しい状態を計算する</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">3</span>
                <p className="text-muted-foreground"><strong>Flux アーキテクチャがベース</strong>。一方向データフローで状態変化を予測しやすくする設計パターン</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">4</span>
                <p className="text-muted-foreground"><strong>TypeScript との相性が良い</strong>。Action のユニオン型により、switch 文の網羅性チェックが効く</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">5</span>
                <p className="text-muted-foreground"><strong>immer でイミュータブル更新を簡潔に</strong>。ネストが深い state も直感的に更新できる</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">6</span>
                <p className="text-muted-foreground"><strong>useContext と組み合わせ</strong>ると、アプリ全体で共有する本格的な状態管理が構築できる</p>
              </div>
            </div>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'useReducer - React 公式リファレンス',
                  url: 'https://ja.react.dev/reference/react/useReducer',
                  description: 'useReducer の API 仕様、使い方、注意点を網羅した公式ドキュメント',
                },
                {
                  title: 'state ロジックをリデューサに抽出する - React 公式ガイド',
                  url: 'https://ja.react.dev/learn/extracting-state-logic-into-a-reducer',
                  description: 'useState から useReducer への移行方法を学べるチュートリアル',
                },
                {
                  title: 'リデューサとコンテクストでスケールアップ - React 公式ガイド',
                  url: 'https://ja.react.dev/learn/scaling-up-with-reducer-and-context',
                  description: 'useReducer と useContext を組み合わせてアプリをスケールする方法',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'useReducer と Redux はどう違いますか？',
                  answer: 'useReducer は React 組み込みの Hook で、コンポーネントローカルな状態管理に適しています。Redux はアプリ全体のグローバルな状態管理ライブラリで、ミドルウェア、DevTools、セレクタなどの豊富なエコシステムがあります。小〜中規模のアプリなら useReducer + useContext で十分ですが、大規模アプリやチーム開発では Redux Toolkit の方が生産性が高い場合があります。',
                },
                {
                  question: 'Reducer で非同期処理はどうすればよいですか？',
                  answer: 'Reducer 自体は純粋関数なので、その中で非同期処理を行うべきではありません。非同期処理はイベントハンドラーや useEffect で実行し、その結果を Action として dispatch します。例えば、API 呼び出しの開始時に dispatch({ type: "FETCH_START" })、成功時に dispatch({ type: "FETCH_SUCCESS", payload: data })、エラー時に dispatch({ type: "FETCH_ERROR", payload: error }) のように分けます。',
                },
                {
                  question: 'immer は必ず使うべきですか？',
                  answer: 'いいえ、必須ではありません。浅い state（ネストが 1-2 段）であればスプレッド構文で十分対応できます。immer が特に威力を発揮するのは、ネストが深いオブジェクトや配列の中のオブジェクトを更新する場合です。Redux Toolkit を使う場合は immer が内蔵されているため、自動的に恩恵を受けられます。',
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
