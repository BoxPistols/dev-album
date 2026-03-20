import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function Events() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">
            STEP 9
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          イベントハンドリング
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          ユーザーのクリック、入力、送信などの操作に応答する方法を学びます。useState と組み合わせることで、インタラクティブな UI の構築パターンが完成します。
        </p>

        <WhyNowBox tags={['ユーザー操作', 'イベント', 'インタラクション']}>
          <p>
            useState で「データの変更」ができるようになりました。次は「いつ変更するか」、つまりユーザーの操作（イベント）に応答する方法を学びます。
          </p>
          <p>
            ボタンのクリック、テキストの入力、フォームの送信、キーボード操作 ── すべてのインタラクションは「イベント」として React に伝わります。デザインツールでいう「プロトタイプのトリガー」と同じ考え方です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* onClick */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">onClick: クリックイベント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最も基本的なイベントです。ボタンやリンク、カードなど、クリック可能な要素に使います。
            </p>
            <CodePreview
              code={`function ClickExample() {
  const [message, setMessage] = React.useState('ボタンをクリックしてください')
  const [count, setCount] = React.useState(0)

  const handleClick = () => {
    setCount(count + 1)
    setMessage('クリックされました！（' + (count + 1) + '回目）')
  }

  return (
    <div style={{ padding: '16px' }}>
      <p style={{ fontSize: '16px', marginBottom: '12px' }}>{message}</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleClick}
          style={{ padding: '8px 16px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          クリック
        </button>
        <button
          onClick={() => { setMessage('ボタンをクリックしてください'); setCount(0) }}
          style={{ padding: '8px 16px', backgroundColor: '#6B7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          リセット
        </button>
      </div>
    </div>
  )
}

function App() {
  return <ClickExample />
}
`}
              title="onClick の基本 → ボタンをクリックしてみよう"
              previewHeight={120}
            />
            <InfoBox type="warning" title="よくある間違い: 関数の呼び出しを渡してしまう">
              <p>
                <code>onClick={'{handleClick()}'}</code> と書くと、レンダリング時に関数が即座に実行されてしまいます。関数の「参照」を渡す必要があるので、括弧なしの <code>onClick={'{handleClick}'}</code> が正しい書き方です。引数を渡したい場合は <code>onClick={'() => handleClick(id)'}</code> のようにアロー関数で包みます。
              </p>
            </InfoBox>
          </section>

          {/* TypeScriptでのイベント型 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">TypeScript でのイベント型</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeScript を使うと、イベントハンドラに正確な型を付けることができます。型を付けることで、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">e.target</code> のプロパティに安全にアクセスでき、エディタの補完も効くようになります。
            </p>
            <CodeBlock
              code={`// よく使うイベント型の一覧

// マウスイベント
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.clientX, e.clientY);  // クリック座標
  console.log(e.currentTarget);       // イベントが設定された要素（button）
};

const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
  // HTMLDivElement を指定すると div 固有のプロパティにもアクセス可
};

// フォームイベント
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

// 入力変更イベント（要素ごとに型が異なる）
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);    // string
  console.log(e.target.checked);  // boolean（checkbox の場合）
};

const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  console.log(e.target.value);
};

const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  console.log(e.target.value);
};

// キーボードイベント
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  console.log(e.key);      // 押されたキー（'Enter', 'Escape' など）
  console.log(e.ctrlKey);  // Ctrl が押されているか
  console.log(e.metaKey);  // Cmd（Mac）が押されているか
  console.log(e.shiftKey); // Shift が押されているか
};

// フォーカスイベント
const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  console.log(e.target);         // フォーカスされた要素
  console.log(e.relatedTarget);  // フォーカスが外れた要素
};

const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  console.log('フォーカスが外れました');
};

// ドラッグイベント
const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
  e.dataTransfer.setData('text/plain', 'ドラッグ中');
};`}
              language="tsx"
              title="イベント型の一覧と使い方"
              showLineNumbers
            />
            <InfoBox type="success" title="型がわからないときは？">
              <p>
                イベントの型がわからないときは、まずインラインで書いてみましょう。例えば <code>onChange={'{(e) => {}}'}</code> と書くと、エディタ（VS Code）が自動的に <code>e</code> の型を推論してくれます。その型をコピーして関数の引数に使えば OK です。
              </p>
            </InfoBox>

            <CodeBlock
              code={`// よくあるパターン: 型を省略できるケース

// インラインなら型推論が効く
<button onClick={(e) => {
  // e は自動的に React.MouseEvent<HTMLButtonElement> と推論される
  console.log(e.clientX);
}}>クリック</button>

// 関数を別定義するときは型が必要
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.clientX);
};
<button onClick={handleClick}>クリック</button>

// イベントオブジェクトを使わないなら型は不要
const handleSimpleClick = () => {
  console.log('クリックされた');
};
<button onClick={handleSimpleClick}>クリック</button>`}
              language="tsx"
              title="型を省略できるケースとできないケース"
            />
          </section>

          {/* イベントハンドラの命名規則 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">イベントハンドラの命名規則</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              イベントハンドラ関数の命名には「handle + 対象 + イベント名」というパターンが広く使われています。
            </p>
            <CodeBlock
              code={`// 命名パターン: handle + 何を + どうする
function FormComponent() {
  // handleClick - 汎用的なクリック
  const handleClick = () => { /* ... */ };

  // handleSubmit - フォーム送信
  const handleSubmit = () => { /* ... */ };

  // handleNameChange - 名前フィールドの変更
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* ... */
  };

  // handleDeleteItem - アイテム削除
  const handleDeleteItem = (id: number) => { /* ... */ };

  // handleToggleMenu - メニューの開閉
  const handleToggleMenu = () => { /* ... */ };

  // handleKeyDown - キー押下
  const handleKeyDown = (e: React.KeyboardEvent) => { /* ... */ };

  return (
    <div>
      <button onClick={handleClick}>クリック</button>
      <input onChange={handleNameChange} />
      <form onSubmit={handleSubmit}>
        <button type="submit">送信</button>
      </form>
    </div>
  );
}

// コンポーネントの Props としてイベントハンドラを渡す場合は on + イベント名
interface CardProps {
  onDelete: (id: number) => void;   // Props は onXxx
  onClick: () => void;
}

function Card({ onDelete, onClick }: CardProps) {
  // 内部のハンドラは handleXxx
  const handleDeleteClick = () => {
    if (confirm('削除しますか？')) {
      onDelete(123);
    }
  };

  return (
    <div onClick={onClick}>
      <button onClick={handleDeleteClick}>削除</button>
    </div>
  );
}`}
              language="tsx"
              title="命名規則: handle vs on"
            />
            <InfoBox type="success" title="命名のルール">
              <p>
                コンポーネント内部の関数は <strong>handleXxx</strong>、Props として外部に公開するときは <strong>onXxx</strong> と名付けるのが React のお約束です。HTML のイベント（onClick, onChange）と揃えることで、直感的に理解できます。
              </p>
            </InfoBox>
          </section>

          {/* onChange */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">onChange: 入力の変更イベント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              テキスト入力、セレクトボックス、チェックボックスなど、フォーム要素の値が変わったときに発火するイベントです。
            </p>
            <CodePreview
              code={`function InputEvents() {
  const [text, setText] = React.useState('')
  const [color, setColor] = React.useState('red')

  return (
    <div style={{ padding: '16px', maxWidth: '300px' }}>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>テキスト</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="入力してみよう"
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', boxSizing: 'border-box' }}
        />
        <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>入力値: {text || '(なし)'}</p>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>色を選択</label>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
        >
          <option value="red">赤</option>
          <option value="blue">青</option>
          <option value="green">緑</option>
        </select>
        <div style={{ marginTop: '8px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: color }} />
      </div>
    </div>
  )
}

function App() {
  return <InputEvents />
}
`}
              title="onChange でフォーム入力 → 操作してみよう"
              previewHeight={240}
            />
          </section>

          {/* onSubmit と preventDefault */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">onSubmit とデフォルト動作の防止</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              フォームを送信すると、ブラウザはページを再読み込みしようとします。React アプリではこの動作を防いで、JavaScript で処理を行います。
            </p>
            <CodePreview
              code={`function SearchForm() {
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setResults((prev) => [...prev, '「' + query + '」の検索結果'])
    setQuery('')
  }

  return (
    <div style={{ padding: '16px', maxWidth: '400px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="検索ワードを入力..."
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
        />
        <button
          type="submit"
          style={{ padding: '8px 16px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          検索
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {results.map((result, i) => (
          <li key={i} style={{ padding: '8px 12px', backgroundColor: '#F9FAFB', borderRadius: '6px', marginBottom: '8px', fontSize: '14px' }}>
            {result}
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return <SearchForm />
}
`}
              title="onSubmit と preventDefault → 検索してみよう"
              previewHeight={200}
            />
            <InfoBox type="error" title="e.preventDefault() を忘れると...">
              <p>
                フォームの onSubmit で <code>e.preventDefault()</code> を忘れると、送信するたびにページが再読み込みされ、state がすべてリセットされてしまいます。React のフォーム送信では必ず呼びましょう。
              </p>
            </InfoBox>
          </section>

          {/* イベントハンドラに引数を渡す */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">イベントハンドラに引数を渡す</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              リストの各項目に対してイベントを設定するとき、どのアイテムがクリックされたかを知る必要があります。アロー関数で引数を渡しましょう。
            </p>
            <CodePreview
              code={`function NotificationList() {
  const [notifications, setNotifications] = React.useState([
    { id: 1, title: '新しいメッセージが届きました', read: false },
    { id: 2, title: 'プロジェクトが更新されました', read: false },
    { id: 3, title: 'レビューが完了しました', read: true },
  ])

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div style={{ padding: '16px', maxWidth: '400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>通知</h2>
        <button
          onClick={handleMarkAllAsRead}
          style={{ fontSize: '13px', color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
        >
          すべて既読にする
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: notification.read ? '1px solid #E5E7EB' : '1px solid #BFDBFE',
              backgroundColor: notification.read ? '#fff' : '#EFF6FF',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: notification.read ? 'normal' : '600', color: notification.read ? '#6B7280' : '#111' }}>
              {notification.title}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {!notification.read && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  style={{ fontSize: '12px', color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  既読
                </button>
              )}
              <button
                onClick={() => handleDelete(notification.id)}
                style={{ fontSize: '12px', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return <NotificationList />
}
`}
              title="引数付きイベントハンドラ → 操作してみよう"
              previewHeight={240}
            />
          </section>

          {/* キーボードイベント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">キーボードイベント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              キーボード入力を検知して、ショートカットや特定のキー操作に応答できます。
            </p>
            <CodePreview
              code={`function KeyboardEvents() {
  const [log, setLog] = React.useState([])
  const [input, setInput] = React.useState('')

  const addLog = (message) => {
    setLog((prev) => [message, ...prev.slice(0, 9)])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addLog('確定: "' + input + '"')
      setInput('')
    }
    if (e.key === 'Escape') {
      setInput('')
      addLog('入力をクリアしました')
    }
  }

  return (
    <div style={{ padding: '16px', maxWidth: '400px' }}>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
          入力してEnterで確定、Escapeでクリア
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="テキストを入力..."
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ backgroundColor: '#F9FAFB', borderRadius: '8px', padding: '12px' }}>
        <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', marginTop: 0 }}>ログ:</p>
        {log.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#9CA3AF', margin: 0 }}>まだ操作がありません</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {log.map((entry, i) => (
              <li key={i} style={{ fontSize: '14px', color: '#4B5563', marginBottom: '4px' }}>
                {entry}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function App() {
  return <KeyboardEvents />
}
`}
              title="キーボードイベント → 入力してEnter/Escを試そう"
              previewHeight={260}
            />
            <InfoBox type="info" title="よく使うキーボードイベント">
              <p>
                <code>onKeyDown</code>（キーを押したとき）が最も汎用的です。<code>e.key</code> で押されたキー名を取得し、<code>e.ctrlKey</code>、<code>e.shiftKey</code>、<code>e.metaKey</code>（Mac の Cmd）で修飾キーの状態を確認できます。
              </p>
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="次のうち、onClick に正しくイベントハンドラを渡している書き方はどれですか？"
              options={[
                { label: 'onClick={handleClick()}' },
                { label: 'onClick={handleClick}', correct: true },
                { label: 'onClick="handleClick"' },
                { label: 'onClick={handleClick(id)}' },
              ]}
              explanation="onClick には関数の「参照」を渡す必要があります。handleClick() と括弧付きで書くとレンダリング時に即座に実行されてしまいます。引数を渡したい場合は onClick={() => handleClick(id)} のようにアロー関数で包みます。"
            />
          </section>

          {/* イベントバブリングとキャプチャ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">イベントバブリングとキャプチャ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              DOM イベントには「伝播（propagation）」の仕組みがあります。あるイベントが発生すると、その要素だけでなく親要素にも伝わっていきます。これを<strong>バブリング</strong>と呼びます。
            </p>
            <CodePreview
              code={`function BubblingExample() {
  const [log, setLog] = React.useState([])

  const addLog = (message) => {
    setLog((prev) => [message, ...prev.slice(0, 9)])
  }

  return (
    <div style={{ padding: '16px', maxWidth: '400px' }}>
      <div
        onClick={() => addLog('外側の div がクリックされた')}
        style={{ padding: '24px', backgroundColor: '#DBEAFE', borderRadius: '8px', cursor: 'pointer', marginBottom: '12px' }}
      >
        <p style={{ fontSize: '14px', marginBottom: '8px', marginTop: 0 }}>外側の div</p>

        <div
          onClick={() => addLog('内側の div がクリックされた')}
          style={{ padding: '16px', backgroundColor: '#DCFCE7', borderRadius: '8px', cursor: 'pointer' }}
        >
          <p style={{ fontSize: '14px', marginBottom: '8px', marginTop: 0 }}>内側の div</p>

          <button
            onClick={() => addLog('ボタンがクリックされた')}
            style={{ padding: '8px 16px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            ボタン
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#F9FAFB', borderRadius: '8px', padding: '12px' }}>
        <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', marginTop: 0 }}>イベントログ:</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {log.map((entry, i) => (
            <li key={i} style={{ fontSize: '12px', color: '#4B5563', marginBottom: '2px' }}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function App() {
  return <BubblingExample />
}
`}
              title="イベントバブリング → ボタンをクリックしてログを確認"
              previewHeight={300}
            />

            <p className="text-muted-foreground my-4 leading-relaxed">
              バブリングを止めたい場合は <code className="text-sm bg-muted px-1.5 py-0.5 rounded">e.stopPropagation()</code> を使います。たとえば、カード全体にクリックイベントがあるけど、内部の削除ボタンだけは別の処理をしたい場合に使います。
            </p>

            <CodeBlock
              code={`function CardWithButton() {
  const handleCardClick = () => {
    console.log('カード詳細へ遷移');
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // カードの onClick が実行されるのを防ぐ
    console.log('削除処理を実行');
  };

  return (
    <div onClick={handleCardClick} className="p-4 border rounded-lg cursor-pointer">
      <h3>記事タイトル</h3>
      <p>記事の説明...</p>
      <button
        onClick={handleDeleteClick}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
      >
        削除
      </button>
    </div>
  );
}

// キャプチャフェーズ: バブリングの逆（親→子の順）
// onClickCapture を使うとキャプチャフェーズでハンドラを実行できる
// 実務で使うことはほぼないが、知っておくとデバッグに役立つ
<div onClickCapture={() => console.log('キャプチャフェーズで実行')}>
  <button onClick={() => console.log('バブリングフェーズで実行')}>
    クリック
  </button>
</div>`}
              language="tsx"
              title="stopPropagation でバブリングを止める"
            />

            <InfoBox type="info" title="バブリングの流れ">
              <div className="space-y-1">
                <p><strong>キャプチャフェーズ</strong>: window → document → ... → 親 → ターゲット（上から下へ）</p>
                <p><strong>バブリングフェーズ</strong>: ターゲット → 親 → ... → document → window（下から上へ）</p>
                <p>React のイベント（onClick など）はデフォルトでバブリングフェーズです。キャプチャフェーズで処理したい場合は <code>onClickCapture</code> を使います。</p>
              </div>
            </InfoBox>
          </section>

          {/* デバウンスとスロットル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デバウンスとスロットル</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ユーザーが高速に操作（入力やスクロールなど）するたびにイベントハンドラが大量に実行されると、パフォーマンスに悪影響を及ぼします。「デバウンス」と「スロットル」は、イベントの発火頻度を制御するテクニックです。
            </p>

            <CodeBlock
              code={`// デバウンス（Debounce）
// 「最後のイベントから一定時間待ってから実行する」
// 用途: 検索入力、ウィンドウリサイズ

import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer); // 前のタイマーをキャンセル
  }, [value, delay]);

  return debouncedValue;
}

// 使い方: 検索フォーム
function SearchWithDebounce() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300); // 300ms 待つ

  useEffect(() => {
    if (debouncedQuery) {
      console.log('API 呼び出し:', debouncedQuery);
      // ここで実際の検索 API を呼ぶ
    }
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="検索..."
      className="w-full px-3 py-2 border rounded-lg"
    />
  );
  // 「r」「re」「rea」「reac」「react」と入力しても
  // API 呼び出しは最後の「react」の1回だけ！
}`}
              language="tsx"
              title="デバウンスで検索 API の呼び出しを最適化"
              showLineNumbers
            />

            <CodeBlock
              code={`// スロットル（Throttle）
// 「一定間隔ごとに最大1回だけ実行する」
// 用途: スクロール追跡、ウィンドウリサイズ、ドラッグ操作

import { useRef, useCallback } from 'react';

function useThrottle(callback: (...args: unknown[]) => void, delay: number) {
  const lastCall = useRef(0);

  return useCallback((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  }, [callback, delay]);
}

// 使い方: スクロール位置の追跡
function ScrollTracker() {
  const handleScroll = useThrottle(() => {
    console.log('スクロール位置:', window.scrollY);
    // アナリティクスの送信やUIの更新など
  }, 200); // 200ms に1回だけ実行

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return <div>スクロールしてみてください</div>;
}`}
              language="tsx"
              title="スロットルでスクロールイベントを制御"
            />

            <InfoBox type="info" title="デバウンスとスロットルの使い分け">
              <div className="space-y-1">
                <p><strong>デバウンス</strong>: ユーザーが操作を「終えた後」に処理したいとき（検索入力、フォームバリデーション）</p>
                <p><strong>スロットル</strong>: 操作「中」も定期的に処理したいとき（スクロール追跡、ドラッグ、リサイズ）</p>
                <p>実務では lodash の <code>_.debounce()</code> や <code>_.throttle()</code> を使うことも多いです。</p>
              </div>
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="カード全体にクリックイベントがあり、内部の削除ボタンだけカードのクリックを発火させたくない場合、削除ボタンのハンドラで何を呼ぶべきですか？"
              options={[
                { label: 'e.preventDefault()' },
                { label: 'e.stopPropagation()', correct: true },
                { label: 'e.stopImmediatePropagation()' },
                { label: 'return false' },
              ]}
              explanation="e.stopPropagation() はイベントが親要素に伝播（バブリング）するのを防ぎます。e.preventDefault() はブラウザのデフォルト動作（フォーム送信など）を防ぐためのもので、バブリングの制御には使いません。React では return false でイベントを止めることはできません。"
            />
          </section>

          {/* 実践例: カラーピッカー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: インタラクティブ・カラーピッカー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでのイベント処理を組み合わせた、実用的なカラーピッカーを作ります。クリック、入力、キーボードイベントを組み合わせています。
            </p>
            <CodePreview
              code={`var PRESET_COLORS = [
  { name: 'レッド', hex: '#EF4444' },
  { name: 'オレンジ', hex: '#F97316' },
  { name: 'アンバー', hex: '#F59E0B' },
  { name: 'グリーン', hex: '#22C55E' },
  { name: 'ブルー', hex: '#3B82F6' },
  { name: 'インディゴ', hex: '#6366F1' },
  { name: 'パープル', hex: '#A855F7' },
  { name: 'ピンク', hex: '#EC4899' },
]

function ColorPicker() {
  const [selectedColor, setSelectedColor] = React.useState('#3B82F6')
  const [customHex, setCustomHex] = React.useState('#3B82F6')
  const [copiedMessage, setCopiedMessage] = React.useState('')
  const [savedColors, setSavedColors] = React.useState([])

  const handlePresetClick = (hex) => {
    setSelectedColor(hex)
    setCustomHex(hex)
  }

  const handleHexChange = (e) => {
    var value = e.target.value
    setCustomHex(value)
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setSelectedColor(value)
    }
  }

  const handleSaveColor = () => {
    if (!savedColors.includes(selectedColor)) {
      setSavedColors((prev) => [...prev, selectedColor])
    }
  }

  const handleHexKeyDown = (e) => {
    if (e.key === 'Enter' && /^#[0-9A-Fa-f]{6}$/.test(customHex)) {
      handleSaveColor()
    }
  }

  const handleCopyColor = () => {
    navigator.clipboard.writeText(selectedColor)
    setCopiedMessage('コピーしました！')
    setTimeout(() => setCopiedMessage(''), 2000)
  }

  const handleRemoveSaved = (color) => {
    setSavedColors((prev) => prev.filter((c) => c !== color))
  }

  return (
    <div style={{ padding: '16px', maxWidth: '400px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: 0, marginBottom: '16px' }}>カラーピッカー</h2>

      <div style={{ width: '100%', height: '100px', borderRadius: '12px', backgroundColor: selectedColor, transition: 'background-color 0.3s', marginBottom: '16px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <code style={{ fontSize: '16px', fontFamily: 'monospace', fontWeight: 'bold' }}>{selectedColor}</code>
        <button onClick={handleCopyColor} style={{ padding: '4px 12px', fontSize: '13px', backgroundColor: '#F3F4F6', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>コピー</button>
        <button onClick={handleSaveColor} style={{ padding: '4px 12px', fontSize: '13px', backgroundColor: '#DBEAFE', color: '#1D4ED8', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>保存</button>
        {copiedMessage && <span style={{ fontSize: '13px', color: '#16A34A' }}>{copiedMessage}</span>}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', marginTop: 0 }}>プリセット</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {PRESET_COLORS.map((color) => (
            <button
              key={color.hex}
              onClick={() => handlePresetClick(color.hex)}
              title={color.name}
              style={{
                width: '32px', height: '32px', borderRadius: '50%', border: selectedColor === color.hex ? '3px solid #3B82F6' : '2px solid transparent',
                backgroundColor: color.hex, cursor: 'pointer', outline: 'none', padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>カスタム HEX（Enter で保存）</label>
        <input type="text" value={customHex} onChange={handleHexChange} onKeyDown={handleHexKeyDown} placeholder="#FF5733" maxLength={7}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontFamily: 'monospace', boxSizing: 'border-box' }}
        />
      </div>

      {savedColors.length > 0 && (
        <div>
          <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', marginTop: 0 }}>保存した色（{savedColors.length}）</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {savedColors.map((color) => (
              <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#F9FAFB', borderRadius: '999px', padding: '4px 8px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: color }} />
                <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>{color}</span>
                <button onClick={() => handleRemoveSaved(color)} style={{ color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', marginLeft: '2px', padding: 0 }}>&times;</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  return <ColorPicker />
}
`}
              title="カラーピッカー → 色を選択・保存してみよう"
              previewHeight={480}
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="クリックカウンター + キーボードショートカット"
              description="handleKeyDown の ___ を埋めてください。e.key でキーを判定し、r でリセット、上矢印でカウントアップ、下矢印でカウントダウンします。"
              initialCode={`const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === '___') { // ← ここを埋める（リセットキー）
    setCount(0);
  }
  if (e.key === '___') { // ← ここを埋める（カウントアップキー）
    setCount((prev) => prev + 1);
  }
  if (e.key === '___') { // ← ここを埋める（カウントダウンキー）
    setCount((prev) => Math.max(0, prev - 1));
  }
};`}
              answer={`const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === 'r') {
    setCount(0);
  }
  if (e.key === 'ArrowUp') {
    setCount((prev) => prev + 1);
  }
  if (e.key === 'ArrowDown') {
    setCount((prev) => Math.max(0, prev - 1));
  }
};`}
              keywords={["'r'", "'ArrowUp'", "'ArrowDown'"]}
              hints={[
                'リセットキーは小文字の r です',
                '上矢印キーの e.key 値は ArrowUp です',
                '下矢印キーの e.key 値は ArrowDown です',
              ]}
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">主要なイベント</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- <code>onClick</code> - クリック</li>
                  <li>- <code>onChange</code> - 値の変更（input, select）</li>
                  <li>- <code>onSubmit</code> - フォーム送信</li>
                  <li>- <code>onKeyDown</code> - キーボード押下</li>
                  <li>- <code>onFocus</code> / <code>onBlur</code> - フォーカス</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">ベストプラクティス</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- 関数名は handleXxx（内部）/ onXxx（Props）</li>
                  <li>- フォーム送信は e.preventDefault() 必須</li>
                  <li>- 引数はアロー関数で渡す</li>
                  <li>- onClick={'{fn}'} であり onClick={'{fn()}'} ではない</li>
                  <li>- バブリングは stopPropagation() で制御</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'React 公式: Responding to Events',
                  url: 'https://react.dev/learn/responding-to-events',
                  description: 'イベントハンドラの基本的な使い方、命名規則、バブリングの仕組みを解説',
                },
                {
                  title: 'MDN: Event reference',
                  url: 'https://developer.mozilla.org/ja/docs/Web/Events',
                  description: 'ブラウザが提供するすべてのイベントのリファレンス',
                },
                {
                  title: 'React 公式: SyntheticEvent',
                  url: 'https://react.dev/reference/react-dom/components/common#react-event-object',
                  description: 'React の合成イベントオブジェクトの詳細なリファレンス',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'onClick と addEventListener の違いは？',
                  answer: 'React の onClick はコンポーネントのレンダリングに連動してイベントリスナーが自動管理されます。addEventListener は手動で追加・削除が必要で、管理が煩雑になりがちです。React では基本的に JSX の onClick などを使い、グローバルイベント（window の scroll や resize など）だけ useEffect 内で addEventListener を使うのが一般的です。',
                },
                {
                  question: '合成イベント（SyntheticEvent）とは？',
                  answer: 'React はブラウザのネイティブイベントをラップした「合成イベント（SyntheticEvent）」を使います。これにより、すべてのブラウザで同じ API でイベントを扱えます。e.nativeEvent で元のブラウザイベントにアクセスすることも可能ですが、通常は合成イベントだけで十分です。',
                },
                {
                  question: 'イベント型が難しい場合はどうすればいい？',
                  answer: '最初は型を省略してインラインで書き、エディタの型推論に頼りましょう。VS Code なら、onChange={(e) => {}} と書くだけで e の型が自動的に表示されます。慣れてきたら React.MouseEvent<HTMLButtonElement> のように明示的に書く練習をしましょう。型がわからなければ React.SyntheticEvent をベースの型として使うこともできます。',
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
