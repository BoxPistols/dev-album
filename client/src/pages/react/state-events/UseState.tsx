import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function UseState() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">
            STEP 8
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          useState
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React で「変化するデータ」を扱うための仕組み、useState を学びます。ボタンをクリックしたら数字が増える、テキストを入力したら表示が変わる。そんなインタラクティブな UI を作る第一歩です。
        </p>

        <WhyNowBox tags={['インタラクティブUI', '状態管理', 'Hooks']}>
          <p>
            ここまでは「表示するだけ」の静的なコンポーネントを作ってきました。しかし、実際の UI はユーザーの操作に応じて変化します。ボタンを押したらモーダルが開く、入力したらリアルタイムにプレビューされる、カウンターが増える...。
          </p>
          <p>
            これらを実現するのが「state（状態）」です。state は時間とともに変化するデータで、state が変わると React は自動的に画面を再描画します。Figma のプロトタイプで「変数」を使うのと似ていますが、React の state はもっと強力です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* state とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">state（状態）とは？</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              state は「時間とともに変化するデータ」です。Props は親から受け取る読み取り専用のデータでしたが、state はコンポーネント自身が管理し、自分で変更できます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">Props</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- 親から受け取る</li>
                  <li>- 読み取り専用（変更不可）</li>
                  <li>- 関数の引数のようなもの</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                <h3 className="font-bold text-foreground mb-2">State</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- コンポーネント自身が管理する</li>
                  <li>- 変更可能（setState で更新）</li>
                  <li>- 変更されると画面が再描画される</li>
                </ul>
              </div>
            </div>
            <InfoBox type="info" title="state が変わると画面が更新される">
              <p>
                これが React の最も重要な仕組みです。state を更新すると、React は自動的にそのコンポーネントを再レンダリング（再描画）します。手動で DOM を操作する必要はありません。
              </p>
            </InfoBox>
          </section>

          {/* useState の基本 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useState の基本: カウンター</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useState は React が提供する「Hook（フック）」の一つです。使い方はシンプルで、初期値を渡すと「現在の値」と「更新関数」のペアを返します。
            </p>
            <CodePreview
              code={`function Counter() {
  const [count, setCount] = React.useState(0)

  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <p style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>{count}</p>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button
          onClick={() => setCount(count - 1)}
          style={{ padding: '8px 16px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          - 減らす
        </button>
        <button
          onClick={() => setCount(0)}
          style={{ padding: '8px 16px', backgroundColor: '#6B7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          リセット
        </button>
        <button
          onClick={() => setCount(count + 1)}
          style={{ padding: '8px 16px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          + 増やす
        </button>
      </div>
    </div>
  )
}

function App() {
  return <Counter />
}
`}
              title="カウンター → ボタンをクリックしてみよう"
              previewHeight={180}
            />
            <CodeBlock
              code={`// useState の構造を分解して理解する

// ステップ1: useState を呼ぶと配列が返る
const result = useState(0);  // [0, 関数]

// ステップ2: 配列の分割代入で取り出す
const [count, setCount] = useState(0);
// count → 現在の値（最初は 0）
// setCount → 値を更新する関数

// ステップ3: setCount を呼ぶと値が更新される
setCount(5);    // count が 5 になる
setCount(count + 1);  // count が 1 増える

// 命名規則: [値, set値] がお約束
const [name, setName] = useState('');
const [isOpen, setIsOpen] = useState(false);
const [items, setItems] = useState<string[]>([]);`}
              language="tsx"
              title="useState の仕組みを理解する"
            />
          </section>

          {/* 文字列の state */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">文字列の state: テキスト入力</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              テキスト入力フィールドと連携するのは useState の最も一般的な使い方の一つです。入力が変わるたびに state を更新し、リアルタイムに表示に反映します。
            </p>
            <CodePreview
              code={`function NamePreview() {
  const [name, setName] = React.useState('')

  return (
    <div style={{ padding: '16px', maxWidth: '400px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
        お名前を入力してください
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="山田太郎"
        style={{ width: '100%', padding: '8px 16px', border: '1px solid #D1D5DB', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
      />

      <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
        <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>プレビュー:</p>
        <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '4px', marginBottom: '0' }}>
          {name ? 'こんにちは、' + name + 'さん！' : 'お名前を入力してください'}
        </p>
        <p style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '8px', marginBottom: 0 }}>
          {name.length} 文字入力済み
        </p>
      </div>
    </div>
  )
}

function App() {
  return <NamePreview />
}
`}
              title="テキスト入力とリアルタイムプレビュー → 名前を入力してみよう"
              previewHeight={220}
            />
          </section>

          {/* 真偽値の state */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">真偽値の state: トグル</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              真偽値（boolean）の state は、表示/非表示の切り替え、モーダルの開閉、ダークモードの切り替えなどに使います。
            </p>
            <CodePreview
              code={`function TogglePanel() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isDark, setIsDark] = React.useState(false)

  return (
    <div style={{
      backgroundColor: isDark ? '#111827' : '#fff',
      color: isDark ? '#fff' : '#111827',
      padding: '16px',
      borderRadius: '8px',
      transition: 'all 0.3s',
    }}>
      <button
        onClick={() => setIsDark(!isDark)}
        style={{
          marginBottom: '16px',
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          cursor: 'pointer',
          backgroundColor: isDark ? '#374151' : '#F9FAFB',
          color: isDark ? '#fff' : '#111',
        }}
      >
        {isDark ? 'ライトモード' : 'ダークモード'}
      </button>

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            padding: '12px 16px',
            textAlign: 'left',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: isDark ? '#1F2937' : '#F9FAFB',
            color: isDark ? '#fff' : '#111',
          }}
        >
          <span>詳細情報を見る</span>
          <span>{isOpen ? '▲' : '▼'}</span>
        </button>

        {isOpen && (
          <div style={{ padding: '12px 16px', borderTop: '1px solid #ccc' }}>
            <p>ここに詳細な情報が表示されます。</p>
            <p>isOpen が true のときだけ見えます。</p>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  return <TogglePanel />
}
`}
              title="トグル・アコーディオン → クリックしてみよう"
              previewHeight={220}
            />
          </section>

          {/* イミュータビリティの深掘り */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">state のイミュータビリティ ー なぜ直接変更はNG なのか</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React の state を更新する際に最も重要なルールが「イミュータビリティ（不変性）」です。state を直接変更してはいけません。なぜこのルールがあるのか、React の仕組みから理解しましょう。
            </p>

            <div className="p-6 rounded-xl border border-border bg-card mb-6">
              <h3 className="font-bold text-foreground mb-4 text-center">React の再レンダリング判定の仕組み</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2 text-sm">NG: 直接変更した場合</h4>
                    <div className="text-xs text-muted-foreground space-y-1 font-mono">
                      <p>const arr = [1, 2, 3]</p>
                      <p>arr.push(4)</p>
                      <p>setItems(arr)</p>
                    </div>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                      同じ参照 → React は「変更なし」と判断 → 再描画されない
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="font-bold text-green-700 dark:text-green-300 mb-2 text-sm">OK: 新しい配列を作った場合</h4>
                    <div className="text-xs text-muted-foreground space-y-1 font-mono">
                      <p>const arr = [1, 2, 3]</p>
                      <p>const newArr = [...arr, 4]</p>
                      <p>setItems(newArr)</p>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                      新しい参照 → React が「変更あり」と検知 → 再描画される
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`// React は「参照の同一性」で変更を検知する
// Object.is() で比較: 同じオブジェクトなら変更なしと判断

const [items, setItems] = useState(['A', 'B', 'C']);

// NG: 配列を直接変更しても参照は同じまま
function addItemBad() {
  items.push('D');     // 元の配列を変更
  setItems(items);     // 同じ配列オブジェクトを渡す
  // → React: Object.is(旧items, 新items) === true
  // → "何も変わってない" と判断 → 画面は更新されない！
}

// OK: 新しい配列を作ると参照が変わる
function addItemGood() {
  setItems([...items, 'D']);  // スプレッド構文で新しい配列を作成
  // → React: Object.is(旧items, 新items) === false
  // → "変わった！" と検知 → 画面が更新される！
}

// 同じ理由で、オブジェクトも直接変更NG
const [user, setUser] = useState({ name: '田中', age: 28 });

// NG
user.name = '佐藤';
setUser(user);  // 参照が同じなので検知されない

// OK
setUser({ ...user, name: '佐藤' });  // 新しいオブジェクトを作る`}
              language="tsx"
              title="なぜ直接変更ではダメなのか - 参照の同一性"
            />

            <InfoBox type="error" title="イミュータビリティが壊れるとデバッグが困難に">
              <p>
                直接変更は「たまに動く」ことがあるため、バグの発見が遅れがちです。例えば他の state が変わって再レンダリングが起きたときに、副次的に反映されることがあります。しかしこれは偶然で、信頼できる動作ではありません。「配列は push/splice しない」「オブジェクトはプロパティを直接書き換えない」を鉄則にしましょう。
              </p>
            </InfoBox>
          </section>

          {/* 配列の更新パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">配列の state: 更新パターン一覧</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              配列の state は、追加・削除・更新・並べ替えなどさまざまな操作が必要です。すべてのパターンで「新しい配列を作る」ことがポイントです。
            </p>

            <CodeBlock
              code={`import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'デザイン確認', done: false },
    { id: 2, text: 'コードレビュー', done: true },
    { id: 3, text: 'ドキュメント更新', done: false },
  ]);

  // ── 追加: スプレッド構文で末尾に追加 ──
  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, done: false };
    setTodos([...todos, newTodo]);
    // 先頭に追加したい場合: setTodos([newTodo, ...todos]);
  };

  // ── 削除: filter で該当要素を除外 ──
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ── 更新: map で該当要素だけ変更 ──
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // ── テキスト変更: map + スプレッドで部分更新 ──
  const renameTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // ── 全削除: 空配列で置き換え ──
  const clearAll = () => {
    setTodos([]);
  };

  // ── 完了済みだけ削除 ──
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.done));
  };

  return (/* UI は省略 */);
}`}
              language="tsx"
              title="配列の CRUD パターン（追加・削除・更新）"
              showLineNumbers
            />

            {/* 配列操作の対照表 */}
            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-foreground font-bold">操作</th>
                    <th className="text-left p-3 text-red-600 dark:text-red-400 font-bold">NG（直接変更）</th>
                    <th className="text-left p-3 text-green-600 dark:text-green-400 font-bold">OK（新しい配列）</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">追加</td>
                    <td className="p-3 font-mono text-xs">arr.push(item)</td>
                    <td className="p-3 font-mono text-xs">[...arr, item]</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">先頭に追加</td>
                    <td className="p-3 font-mono text-xs">arr.unshift(item)</td>
                    <td className="p-3 font-mono text-xs">[item, ...arr]</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">削除</td>
                    <td className="p-3 font-mono text-xs">arr.splice(i, 1)</td>
                    <td className="p-3 font-mono text-xs">arr.filter(...)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">更新</td>
                    <td className="p-3 font-mono text-xs">arr[i] = newItem</td>
                    <td className="p-3 font-mono text-xs">arr.map(...)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">並べ替え</td>
                    <td className="p-3 font-mono text-xs">arr.sort()</td>
                    <td className="p-3 font-mono text-xs">[...arr].sort()</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">反転</td>
                    <td className="p-3 font-mono text-xs">arr.reverse()</td>
                    <td className="p-3 font-mono text-xs">[...arr].reverse()</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="warning" title="sort() と reverse() も要注意">
              <p>
                <code>sort()</code> と <code>reverse()</code> は元の配列を変更するメソッドです。React で使うときは <code>[...arr].sort()</code> のようにコピーを作ってからソートしましょう。
              </p>
            </InfoBox>
          </section>

          {/* オブジェクトの更新パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">オブジェクトの state: 更新パターン</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              オブジェクトの state も、配列と同様に「新しいオブジェクトを作る」ことが重要です。ネストしたオブジェクトの更新は少しコツが要ります。
            </p>

            <CodePreview
              code={`function ProfileForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    department: 'design',
    agreeToTerms: false,
  })

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  var inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', boxSizing: 'border-box' }
  var labelStyle = { display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }

  return (
    <div style={{ padding: '16px', maxWidth: '400px' }}>
      <div style={{ marginBottom: '12px' }}>
        <label style={labelStyle}>名前</label>
        <input type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} style={inputStyle} />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={labelStyle}>メール</label>
        <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} style={inputStyle} />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={labelStyle}>部署</label>
        <select value={formData.department} onChange={(e) => updateField('department', e.target.value)} style={inputStyle}>
          <option value="design">デザイン部</option>
          <option value="engineering">エンジニアリング部</option>
          <option value="marketing">マーケティング部</option>
        </select>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <input type="checkbox" checked={formData.agreeToTerms} onChange={(e) => updateField('agreeToTerms', e.target.checked)} />
        <span style={{ fontSize: '14px' }}>利用規約に同意する</span>
      </label>

      <pre style={{ marginTop: '12px', padding: '12px', backgroundColor: '#F3F4F6', borderRadius: '8px', fontSize: '12px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  )
}

function App() {
  return <ProfileForm />
}
`}
              title="オブジェクトの state でフォーム管理 → 入力してみよう"
              previewHeight={380}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ネストしたオブジェクトの更新</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              オブジェクトがネスト（入れ子）になっている場合は、変更したい階層までスプレッド構文でコピーを作る必要があります。
            </p>
            <CodeBlock
              code={`interface UserProfile {
  name: string;
  address: {
    city: string;
    zipCode: string;
  };
  settings: {
    theme: 'light' | 'dark';
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
}

const [profile, setProfile] = useState<UserProfile>({
  name: '田中花子',
  address: { city: '東京', zipCode: '100-0001' },
  settings: {
    theme: 'light',
    notifications: { email: true, push: false },
  },
});

// ── 1階層目の更新 ──
setProfile({ ...profile, name: '佐藤太郎' });

// ── 2階層目の更新（address.city） ──
setProfile({
  ...profile,
  address: { ...profile.address, city: '大阪' },
});

// ── 3階層目の更新（settings.notifications.push） ──
setProfile({
  ...profile,
  settings: {
    ...profile.settings,
    notifications: {
      ...profile.settings.notifications,
      push: true,
    },
  },
});
// ネストが深いとコードが複雑になる → useReducer の導入を検討`}
              language="tsx"
              title="ネストしたオブジェクトの更新パターン"
            />

            <InfoBox type="info" title="ネストが深すぎる場合のヒント">
              <p>
                ネストが3階層以上になると、スプレッド構文だけでは読みにくくなります。対策としては: (1) state の構造をフラットにする（正規化）、(2) useReducer を使う、(3) Immer ライブラリを使って直接変更するような書き方をする（内部で自動的に新しいオブジェクトを作ってくれる）、などがあります。
              </p>
            </InfoBox>
          </section>

          {/* コールバック形式の setState */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">前の値に基づく更新: コールバック形式</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              前の state の値を使って新しい値を計算するときは、コールバック形式の setState を使いましょう。
            </p>
            <CodeBlock
              code={`const [count, setCount] = useState(0);

// 注意が必要なケース: 連続で更新する場合
function handleTripleIncrement() {
  // NG: すべて同じ count（0）を参照するので +1 にしかならない
  setCount(count + 1);  // 0 + 1 = 1
  setCount(count + 1);  // 0 + 1 = 1（同じ count を参照）
  setCount(count + 1);  // 0 + 1 = 1（同じ count を参照）
  // 結果: count は 1

  // OK: コールバック関数を使うと、最新の値を受け取れる
  setCount((prev) => prev + 1);  // 0 + 1 = 1
  setCount((prev) => prev + 1);  // 1 + 1 = 2
  setCount((prev) => prev + 1);  // 2 + 1 = 3
  // 結果: count は 3
}

// 推奨: 前の値に基づく更新では常にコールバックを使う
setCount((prev) => prev + 1);
setTodos((prev) => [...prev, newTodo]);
setUser((prev) => ({ ...prev, name: '新しい名前' }));`}
              language="tsx"
              title="コールバック形式の setState"
            />
            <InfoBox type="warning" title="いつコールバックを使うべきか？">
              <p>
                前の state の値を使って新しい値を計算するときは、常にコールバック形式 <code>{'setState((prev) => ...)'}</code> を使うのが安全です。特にイベントハンドラ内で連続して setState を呼ぶ場合は必須です。
              </p>
            </InfoBox>
          </section>

          {/* バッチ更新 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">バッチ更新 ー React 18 の自動バッチ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React 18 以降では、複数の state 更新が自動的に「バッチ（まとめて）」処理されます。これによりパフォーマンスが向上し、不要な再レンダリングが防がれます。
            </p>

            <CodeBlock
              code={`import { useState } from 'react';

function UserDashboard() {
  const [name, setName] = useState('田中');
  const [age, setAge] = useState(28);
  const [isLoading, setIsLoading] = useState(false);

  // React 18: 3つの setState が1回の再レンダリングにまとめられる
  function handleUpdate() {
    setName('佐藤');         // 再レンダリングはまだ起きない
    setAge(32);              // 再レンダリングはまだ起きない
    setIsLoading(false);     // ← ここまで来て1回だけ再レンダリング
  }

  // React 17 以前は、setTimeout や fetch 内での更新がバッチされなかった
  // React 18 以降は、どこで setState を呼んでも自動バッチされる

  async function handleFetch() {
    setIsLoading(true);                   // バッチ開始
    const response = await fetch('/api/user');
    const data = await response.json();
    setName(data.name);                   // まだバッチ中
    setAge(data.age);                     // まだバッチ中
    setIsLoading(false);                  // ← 1回だけ再レンダリング
  }

  console.log('レンダリング！'); // handleUpdate() で 1回だけ表示される

  return (
    <div>
      <p>{isLoading ? '読み込み中...' : \`\${name} (\${age}歳)\`}</p>
      <button onClick={handleUpdate}>更新</button>
      <button onClick={handleFetch}>APIから取得</button>
    </div>
  );
}`}
              language="tsx"
              title="React 18 の自動バッチ更新"
              showLineNumbers
            />

            <InfoBox type="info" title="バッチ更新を意識する場面">
              <p>
                通常はバッチ更新を意識する必要はありません。React が自動的に最適化してくれます。ただし「setState を呼んだ直後に最新の state を読みたい」場合は注意が必要です。setState は非同期的に処理されるため、呼んだ直後の state はまだ古い値です。最新の値が必要な場合は useEffect を使うか、コールバック形式で計算しましょう。
              </p>
            </InfoBox>
          </section>

          {/* 配列の state: Todo リスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: Todo リスト</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまで学んだ配列の操作パターンをすべて使った、完成度の高い Todo リストを作りましょう。
            </p>
            <CodePreview
              code={`function TodoList() {
  const [todos, setTodos] = React.useState([])
  const [input, setInput] = React.useState('')

  const addTodo = () => {
    if (!input.trim()) return
    var newTodo = { id: Date.now(), text: input, done: false }
    setTodos((prev) => [...prev, newTodo])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <div style={{ padding: '16px', maxWidth: '400px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: 0, marginBottom: '12px' }}>Todo リスト</h2>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="新しいタスク..."
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
        />
        <button
          onClick={addTodo}
          style={{ padding: '8px 16px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          追加
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid #E5E7EB', borderRadius: '8px', marginBottom: '8px' }}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
              style={{ width: '20px', height: '20px' }}
            />
            <span style={{ flex: 1, textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#9CA3AF' : '#111' }}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: '12px', fontSize: '13px', color: '#6B7280' }}>
        {todos.filter((t) => t.done).length} / {todos.length} 完了
      </p>
    </div>
  )
}

function App() {
  return <TodoList />
}
`}
              title="Todo リスト → タスクを追加・完了・削除してみよう"
              previewHeight={300}
            />
          </section>

          {/* state vs props */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">state と props の使い分け</h2>
            <InfoBox type="info" title="state と props の関係">
              <div className="space-y-3">
                <p>
                  <strong>props</strong> は「外から渡されるデータ」、<strong>state</strong> は「コンポーネント内部で管理するデータ」です。よくある設計パターンとして、親コンポーネントが state を持ち、子コンポーネントに props として渡します。
                </p>
                <div className="bg-white/50 dark:bg-black/20 rounded p-3 font-mono text-xs">
                  <p>親コンポーネント（state を持つ）</p>
                  <p>&nbsp;&nbsp;├── 子A（props で受け取る）</p>
                  <p>&nbsp;&nbsp;└── 子B（props で受け取る）</p>
                </div>
                <p>
                  state が変わると、そのデータを props として受け取っている子コンポーネントも自動的に再レンダリングされます。これが React の「単方向データフロー」です。
                </p>
              </div>
            </InfoBox>
            <CodePreview
              code={`function DisplayCount({ count, label }) {
  return (
    <div style={{ padding: '16px', backgroundColor: '#F9FAFB', borderRadius: '8px', textAlign: 'center' }}>
      <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>{label}</p>
      <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '4px 0 0' }}>{count}</p>
    </div>
  )
}

function Dashboard() {
  const [visitors, setVisitors] = React.useState(0)
  const [sales, setSales] = React.useState(0)

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <DisplayCount count={visitors} label="訪問者数" />
        <DisplayCount count={sales} label="売上件数" />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setVisitors((prev) => prev + 1)}
          style={{ padding: '6px 12px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
        >
          訪問者 +1
        </button>
        <button
          onClick={() => setSales((prev) => prev + 1)}
          style={{ padding: '6px 12px', backgroundColor: '#22C55E', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
        >
          売上 +1
        </button>
      </div>
    </div>
  )
}

function App() {
  return <Dashboard />
}
`}
              title="親の state を子に props で渡す → ボタンをクリックしてみよう"
              previewHeight={160}
            />
          </section>

          {/* Quiz */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">理解度チェック</h2>

            <Quiz
              question="次の state 更新のうち、正しいのはどれですか？

const [items, setItems] = useState(['A', 'B', 'C']);"
              options={[
                { label: "items.push('D'); setItems(items);" },
                { label: "setItems([...items, 'D']);", correct: true },
                { label: "items[3] = 'D'; setItems(items);" },
                { label: "setItems(items.push('D'));" },
              ]}
              explanation="React の state は直接変更してはいけません（イミュータビリティ）。スプレッド構文 [...items, 'D'] で新しい配列を作り、setItems に渡すのが正しい方法です。push() は元の配列を変更し、さらに配列の長さ（数値）を返すので、setItems(items.push('D')) は配列ではなく数値を設定してしまいます。"
            />

            <Quiz
              question="useState の初期値について正しい説明はどれですか？"
              options={[
                { label: '初期値は再レンダリングのたびに毎回使われる' },
                { label: '初期値は最初のレンダリング時にだけ使われる', correct: true },
                { label: '初期値を省略すると自動的に 0 になる' },
                { label: '初期値は後から変更できる' },
              ]}
              explanation="useState に渡す初期値は、コンポーネントが最初にレンダリングされるときにだけ使われます。2回目以降のレンダリングでは無視されます。これは React が内部的に state の値を保持しているためです。初期値を省略すると undefined になります。"
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="Todo リストの基本実装: 追加・削除・完了切替"
              description="addTodo, toggleTodo, deleteTodo の3つの関数を実装してください。配列の state をイミュータブルに更新することがポイントです。todos は { id: number, text: string, done: boolean }[] の形です。"
              initialCode={`const [todos, setTodos] = useState<Todo[]>([]);
const [input, setInput] = useState('');

// 追加: input の内容で新しい Todo を作り、配列に追加する
const addTodo = () => {
  // ここを実装
};

// 完了切替: 指定した id の Todo の done を反転する
const toggleTodo = (id: number) => {
  // ここを実装
};

// 削除: 指定した id の Todo を配列から除外する
const deleteTodo = (id: number) => {
  // ここを実装
};`}
              answer={`const [todos, setTodos] = useState<Todo[]>([]);
const [input, setInput] = useState('');

const addTodo = () => {
  if (!input.trim()) return;
  const newTodo: Todo = {
    id: Date.now(),
    text: input,
    done: false,
  };
  setTodos((prev) => [...prev, newTodo]);
  setInput('');
};

const toggleTodo = (id: number) => {
  setTodos((prev) =>
    prev.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
  );
};

const deleteTodo = (id: number) => {
  setTodos((prev) => prev.filter((todo) => todo.id !== id));
};`}
              keywords={['setTodos', '...prev', '.map(', '.filter(']}
              hints={[
                'addTodo: スプレッド構文 [...prev, newTodo] で新しい配列を作りましょう',
                'toggleTodo: map() で全要素をループし、id が一致するものだけ done を反転',
                'deleteTodo: filter() で id が一致しない要素だけ残す新しい配列を作りましょう',
                'すべてコールバック形式 setTodos((prev) => ...) を使うと安全です',
              ]}
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">useState の使い方</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- <code>const [値, set値] = useState(初期値)</code></li>
                  <li>- 数値、文字列、真偽値、配列、オブジェクト全対応</li>
                  <li>- set関数を呼ぶと画面が自動更新される</li>
                  <li>- React 18 で自動バッチ更新が導入された</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">絶対に守るルール</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- state は直接変更しない（イミュータブル）</li>
                  <li>- 前の値に基づく更新はコールバック形式</li>
                  <li>- 配列は push/splice ではなく spread/map/filter</li>
                  <li>- オブジェクトはスプレッド構文で新しく作る</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'useState - React 公式 API リファレンス',
                  url: 'https://react.dev/reference/react/useState',
                  description: 'useState の完全な API ドキュメント。初期化関数、コールバック形式の詳細など',
                },
                {
                  title: 'State: A Component\'s Memory - React 公式',
                  url: 'https://react.dev/learn/state-a-components-memory',
                  description: 'state の概念を基礎から解説。なぜ通常の変数ではダメなのかがわかる',
                },
                {
                  title: 'Updating Objects in State - React 公式',
                  url: 'https://react.dev/learn/updating-objects-in-state',
                  description: 'オブジェクトの state を正しく更新するパターン。ネストしたオブジェクトの扱い方',
                },
                {
                  title: 'Updating Arrays in State - React 公式',
                  url: 'https://react.dev/learn/updating-arrays-in-state',
                  description: '配列の追加・削除・変更・並べ替えを正しく行う方法。参照の比較表付き',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'useState に使える数の上限はありますか？',
                  answer: '技術的な上限はありません。1つのコンポーネントで複数の useState を使うのは正常なパターンです。ただし、useState が 5-6 個以上になったら、関連する state をオブジェクトにまとめるか、useReducer への移行を検討しましょう。可読性とメンテナンス性の観点からの目安です。',
                },
                {
                  question: 'state が多すぎる場合はどうすればいいですか？',
                  answer: 'いくつかのアプローチがあります: (1) 関連する state をオブジェクトにまとめる（例: name, email, age → user オブジェクト）、(2) useReducer を使って複雑なロジックをまとめる、(3) カスタムフックに切り出す（例: useForm()）、(4) そもそもその state が本当に必要か見直す（props や計算で導出できる値は state にしない）。',
                },
                {
                  question: 'setState は同期ですか？非同期ですか？',
                  answer: 'setState は「非同期的」に処理されます。正確には、setState を呼んだ直後に state が更新されるわけではなく、React が次のレンダリングサイクルでまとめて反映します。そのため、setState の直後に state の値を参照すると古い値が返ります。最新の値で計算したい場合はコールバック形式 setState((prev) => prev + 1) を使ってください。',
                },
                {
                  question: '初回のみ実行したい重い計算がある場合は？',
                  answer: 'useState の初期値に関数を渡す「遅延初期化（lazy initialization）」が使えます。useState(() => heavyCalculation()) のように書くと、関数は初回レンダリング時にだけ実行され、2回目以降は無視されます。useState(heavyCalculation()) と書くと毎回実行されてしまうので、必ず () => を付けて関数として渡しましょう。',
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
