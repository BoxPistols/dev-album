import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function ConditionalList() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">
            STEP 10
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          条件分岐とリスト表示
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          「ログイン中なら名前を表示、そうでなければログインボタンを表示」「商品一覧をカードで並べる」── 実際の UI で頻出する条件分岐とリスト表示のパターンをマスターしましょう。
        </p>

        <WhyNowBox tags={['条件分岐', 'リスト表示', '動的UI', 'key']}>
          <p>
            useState でデータを管理し、イベントで操作できるようになりました。次は、そのデータに応じて「何を表示するか」を制御する方法を学びます。
          </p>
          <p>
            Figma のバリアントやコンポーネントプロパティで「状態A のときはこの表示、状態B のときはこの表示」と切り替えるのと同じですが、React ではコードで柔軟に制御できます。データの数だけリストを自動生成することも可能です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 条件分岐: 三項演算子 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">条件分岐の3つの方法</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JSX の中で条件によって表示を変えるには、主に3つの方法があります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">方法1: 三項演算子（A か B か）</h3>
            <CodePreview
              code={`function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  return (
    <div style={{ padding: '16px' }}>
      {isLoggedIn ? (
        <div>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>ようこそ、田中さん！</p>
          <button
            onClick={() => setIsLoggedIn(false)}
            style={{ padding: '8px 16px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            ログアウト
          </button>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: '18px', color: '#6B7280', marginBottom: '8px' }}>ログインしてください</p>
          <button
            onClick={() => setIsLoggedIn(true)}
            style={{ padding: '8px 16px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            ログイン
          </button>
        </div>
      )}
    </div>
  )
}

function App() {
  return <LoginStatus />
}
`}
              title="三項演算子で切り替え → ボタンをクリックしてみよう"
              previewHeight={100}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">方法2: && 演算子（表示するかしないか）</h3>
            <CodePreview
              code={`function Notification({ count }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button style={{
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        backgroundColor: 'white',
        cursor: 'pointer',
        fontSize: '14px',
      }}>
        通知
      </button>

      {/* count が 0 より大きいときだけバッジを表示 */}
      {count > 0 && (
        <span style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          backgroundColor: '#EF4444',
          color: 'white',
          fontSize: '11px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
        }}>
          {count}
        </span>
      )}
    </div>
  )
}

function App() {
  return (
    <div style={{ display: 'flex', gap: '32px', padding: '16px', alignItems: 'center' }}>
      <div>
        <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>count=3（バッジあり）</p>
        <Notification count={3} />
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>count=0（バッジなし）</p>
        <Notification count={0} />
      </div>
    </div>
  )
}
`}
              title="&& 演算子: 条件を満たすときだけ表示"
              previewHeight={80}
            />
            <InfoBox type="warning" title="&& の注意点: 0 が表示される問題">
              <p>
                <code>{'{count && <span>...</span>}'}</code> と書くと、count が 0 のとき「0」が画面に表示されてしまいます。数値を条件にするときは <code>{'{count > 0 && <span>...</span>}'}</code> のように明示的な比較を使いましょう。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">方法3: 早期 return / if-else（複雑な分岐）</h3>
            <CodeBlock
              code={`type Status = 'loading' | 'error' | 'empty' | 'success';

interface DataViewProps {
  status: Status;
  data?: string[];
  errorMessage?: string;
}

function DataView({ status, data, errorMessage }: DataViewProps) {
  // 早期 return で特殊なケースを先に処理
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-gray-500">読み込み中...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-red-600 font-medium">エラーが発生しました</p>
        <p className="text-red-400 text-sm mt-1">{errorMessage}</p>
      </div>
    );
  }

  if (status === 'empty' || !data || data.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-400 text-lg">データがありません</p>
        <p className="text-gray-300 text-sm mt-1">新しいデータを追加してください</p>
      </div>
    );
  }

  // success: メインの表示
  return (
    <ul className="divide-y">
      {data.map((item, index) => (
        <li key={index} className="p-3">{item}</li>
      ))}
    </ul>
  );
}`}
              language="tsx"
              title="早期 return で複雑な分岐を整理する"
              showLineNumbers
            />
            <InfoBox type="success" title="使い分けのガイド">
              <div className="space-y-1">
                <p><strong>三項演算子</strong>: A か B かの2択を切り替えたいとき</p>
                <p><strong>&& 演算子</strong>: 表示するかしないかの1択のとき</p>
                <p><strong>早期 return</strong>: 3つ以上の分岐や、loading/error/empty のパターン</p>
              </div>
            </InfoBox>
          </section>

          {/* 実践的UIパターン: タブ切替 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践的UIパターン: タブ切り替え</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              タブ UI は条件分岐の代表的なパターンです。state でアクティブなタブを管理し、対応するコンテンツを表示します。
            </p>
            <CodePreview
              code={`const TABS = [
  { id: 'overview', label: '概要' },
  { id: 'features', label: '機能' },
  { id: 'pricing', label: '料金' },
]

function TabPanel() {
  const [activeTab, setActiveTab] = React.useState('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>プロダクト概要</h3>
            <p style={{ color: '#4B5563', fontSize: '14px' }}>
              このプロダクトは、チームのコラボレーションを効率化するツールです。
            </p>
          </div>
        )
      case 'features':
        return (
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>主な機能</h3>
            <ul style={{ color: '#4B5563', fontSize: '14px', listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '4px' }}>- リアルタイムコラボレーション</li>
              <li style={{ marginBottom: '4px' }}>- タスク管理</li>
              <li>- ファイル共有</li>
            </ul>
          </div>
        )
      case 'pricing':
        return (
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>料金プラン</h3>
            <p style={{ color: '#4B5563', fontSize: '14px' }}>月額 ¥980 から</p>
          </div>
        )
    }
  }

  return (
    <div style={{ maxWidth: '400px' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #E5E7EB' }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #3B82F6' : '2px solid transparent',
              color: activeTab === tab.id ? '#2563EB' : '#6B7280',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ padding: '16px' }}>
        {renderContent()}
      </div>
    </div>
  )
}

function App() {
  return <TabPanel />
}
`}
              title="タブ切り替え UI → タブをクリックしてみよう"
              previewHeight={180}
            />
          </section>

          {/* 実践的UIパターン: アコーディオン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践的UIパターン: アコーディオン</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              アコーディオンは「開く/閉じる」の条件分岐を配列の各項目に適用したパターンです。
            </p>
            <CodePreview
              code={`function Accordion() {
  const [openId, setOpenId] = React.useState(null)

  const ITEMS = [
    { id: 1, title: '返品はできますか？', content: '商品到着後7日以内であれば返品可能です。' },
    { id: 2, title: '送料はいくらですか？', content: '全国一律 500円です。5,000円以上で送料無料。' },
    { id: 3, title: '届くまでどれくらい？', content: '通常2-3営業日でお届けします。' },
  ]

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div style={{ maxWidth: '400px' }}>
      {ITEMS.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id} style={{ border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px' }}>
            <button
              onClick={() => handleToggle(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: '#F9FAFB',
              }}
            >
              <span>{item.title}</span>
              <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
              <div style={{ padding: '12px 16px', borderTop: '1px solid #E5E7EB', fontSize: '14px', color: '#4B5563' }}>
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function App() {
  return <Accordion />
}
`}
              title="アコーディオン UI → クリックして開閉してみよう"
              previewHeight={220}
            />
          </section>

          {/* 実践的UIパターン: ステッパー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践的UIパターン: ステッパー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ステッパーは「現在のステップに応じて表示を切り替える」パターンです。フォームのウィザードや設定画面でよく使われます。
            </p>
            <CodePreview
              code={`const STEPS = ['基本情報', '詳細設定', '確認']

function Stepper() {
  const [currentStep, setCurrentStep] = React.useState(0)

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div style={{ maxWidth: '420px', padding: '16px' }}>
      {/* ステップインジケーター */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        {STEPS.map((step, i) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              fontSize: '13px',
              fontWeight: 'bold',
              backgroundColor: i <= currentStep ? '#3B82F6' : '#E5E7EB',
              color: i <= currentStep ? 'white' : '#6B7280',
            }}>
              {i + 1}
            </div>
            <span style={{
              marginLeft: '6px',
              fontSize: '13px',
              color: i <= currentStep ? '#2563EB' : '#9CA3AF',
              fontWeight: i <= currentStep ? '500' : 'normal',
            }}>
              {step}
            </span>
            {i < STEPS.length - 1 && (
              <div style={{
                margin: '0 12px',
                height: '2px',
                width: '32px',
                backgroundColor: i < currentStep ? '#3B82F6' : '#E5E7EB',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* ステップごとのコンテンツ */}
      <div style={{ minHeight: '80px', padding: '16px', border: '1px solid #E5E7EB', borderRadius: '8px', marginBottom: '16px' }}>
        {currentStep === 0 && (
          <div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '15px' }}>基本情報を入力</h3>
            <p style={{ fontSize: '13px', color: '#6B7280' }}>名前やメールアドレスを入力してください。</p>
          </div>
        )}
        {currentStep === 1 && (
          <div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '15px' }}>詳細設定</h3>
            <p style={{ fontSize: '13px', color: '#6B7280' }}>通知設定やプランを選択してください。</p>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '15px' }}>内容を確認</h3>
            <p style={{ fontSize: '13px', color: '#6B7280' }}>入力内容を確認して送信してください。</p>
          </div>
        )}
      </div>

      {/* ナビゲーションボタン */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          style={{
            padding: '6px 16px',
            fontSize: '13px',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            backgroundColor: 'white',
            cursor: currentStep === 0 ? 'default' : 'pointer',
            opacity: currentStep === 0 ? 0.3 : 1,
          }}
        >
          戻る
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === STEPS.length - 1}
          style={{
            padding: '6px 16px',
            fontSize: '13px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#3B82F6',
            color: 'white',
            cursor: currentStep === STEPS.length - 1 ? 'default' : 'pointer',
            opacity: currentStep === STEPS.length - 1 ? 0.3 : 1,
          }}
        >
          {currentStep === STEPS.length - 1 ? '送信' : '次へ'}
        </button>
      </div>
    </div>
  )
}

function App() {
  return <Stepper />
}
`}
              title="ステッパー（マルチステップ）UI → 「次へ」をクリックしてみよう"
              previewHeight={220}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="JSX の中で「count が 0 のときに何も表示しない」正しい書き方はどれですか？"
              options={[
                { label: '{count && <span>{count}件</span>}' },
                { label: '{count > 0 && <span>{count}件</span>}', correct: true },
                { label: '{count !== 0 ? <span>{count}件</span>}' },
                { label: '{if (count > 0) <span>{count}件</span>}' },
              ]}
              explanation="count && <span>...</span> だと count が 0 のときに「0」が画面に表示されてしまいます。数値を条件にする場合は count > 0 && のように明示的な比較演算子を使いましょう。JSX の中では if 文は使えません。三項演算子なら使えますが、この選択肢では構文エラーになります。"
            />
          </section>

          {/* リスト表示: .map() */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">リスト表示: .map()</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              配列データをリストとして表示するには、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">.map()</code> メソッドを使います。配列の各要素を JSX に変換して表示します。
            </p>
            <CodePreview
              code={`function ProductList() {
  const products = [
    { id: 1, name: 'デザインブック', price: 2980, emoji: '\u{1F4D6}', category: '書籍' },
    { id: 2, name: 'ワイヤレスマウス', price: 4500, emoji: '\u{1F5B1}', category: 'デバイス' },
    { id: 3, name: 'モニターライト', price: 6800, emoji: '\u{1F4A1}', category: 'デバイス' },
  ]

  return (
    <div style={{ display: 'flex', gap: '12px', padding: '16px', flexWrap: 'wrap' }}>
      {products.map((product) => (
        <div key={product.id} style={{
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          overflow: 'hidden',
          width: '140px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}>
          <div style={{
            height: '80px',
            backgroundColor: '#F9FAFB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
          }}>
            {product.emoji}
          </div>
          <div style={{ padding: '10px' }}>
            <span style={{
              fontSize: '11px',
              color: '#6B7280',
              backgroundColor: '#F3F4F6',
              padding: '1px 6px',
              borderRadius: '4px',
            }}>
              {product.category}
            </span>
            <h3 style={{ fontWeight: 'bold', fontSize: '13px', marginTop: '6px' }}>{product.name}</h3>
            <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#2563EB', marginTop: '4px' }}>
              \u00A5{product.price.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function App() {
  return <ProductList />
}
`}
              title="配列データをカードリストとして表示"
              previewHeight={200}
            />
          </section>

          {/* key prop */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">key prop: なぜ必要なのか</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">.map()</code> でリストを表示するとき、各要素に <code className="text-sm bg-muted px-1.5 py-0.5 rounded">key</code> prop を設定する必要があります。これは React がリストの変更を効率的に追跡するための仕組みです。
            </p>
            <CodeBlock
              code={`// key のルール

// OK: ユニークな id を使う（最も推奨）
{users.map((user) => (
  <UserCard key={user.id} user={user} />
))}

// OK: ユニークな文字列を使う
{tags.map((tag) => (
  <span key={tag}>{tag}</span>
))}

// NG: index を key にする（非推奨）
// 項目の追加・削除・並び替えで不具合が起きる可能性あり
{items.map((item, index) => (
  <li key={index}>{item}</li>  // 順番が変わるとバグる
))}

// 例外: 静的で絶対に変わらないリストなら index でもOK
const menuItems = ['ホーム', '製品', '会社概要'];
{menuItems.map((item, index) => (
  <li key={index}>{item}</li>  // 変わらないリストなのでOK
))}`}
              language="tsx"
              title="key の正しい使い方"
            />
            <InfoBox type="info" title="key は React 内部で使われる特別な prop">
              <p>
                key はコンポーネントの Props として渡されるわけではなく、React が内部で「どの要素が追加・削除・変更されたか」を特定するために使います。key が正しくないと、入力中のテキストが別の行に移動するなどの予期せぬバグが起きます。
              </p>
            </InfoBox>
          </section>

          {/* key の深掘り */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">key を変えると何が起きるか</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              key は React にとって要素の「身分証明書」です。key が変わると、React はその要素を完全に破棄して新しく作り直します。この仕組みを理解すると、key を活用したテクニックも使えるようになります。
            </p>
            <CodePreview
              code={`// key を使ってコンポーネントをリセットする

function EditableProfile({ userId }) {
  const [name, setName] = React.useState('')
  const [bio, setBio] = React.useState('')

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前を入力..."
        style={{ display: 'block', width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', marginBottom: '8px', boxSizing: 'border-box' }}
      />
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="自己紹介を入力..."
        style={{ display: 'block', width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px', resize: 'vertical', minHeight: '60px', boxSizing: 'border-box' }}
      />
      <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>ユーザーID: {userId}</p>
    </div>
  )
}

function UserSwitcher() {
  const [selectedUserId, setSelectedUserId] = React.useState(1)

  const buttons = [
    { id: 1, label: 'ユーザー1', color: '#3B82F6' },
    { id: 2, label: 'ユーザー2', color: '#22C55E' },
    { id: 3, label: 'ユーザー3', color: '#A855F7' },
  ]

  return (
    <div style={{ padding: '16px', maxWidth: '360px' }}>
      <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
        入力してからユーザーを切り替えると state がリセットされます
      </p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setSelectedUserId(btn.id)}
            style={{
              padding: '4px 12px',
              backgroundColor: selectedUserId === btn.id ? btn.color : '#E5E7EB',
              color: selectedUserId === btn.id ? 'white' : '#4B5563',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* key を userId にすることで、ユーザーが変わるたびに
          EditableProfile の state が自動的にリセットされる */}
      <EditableProfile key={selectedUserId} userId={selectedUserId} />
    </div>
  )
}

function App() {
  return <UserSwitcher />
}
`}
              title="key を活用してコンポーネントの state をリセット → 入力してからユーザーを切り替えてみよう"
              previewHeight={260}
            />
            <InfoBox type="warning" title="key とパフォーマンスの関係">
              <p>
                key が変わるとコンポーネントは完全に再作成されます。これは便利なテクニックですが、意図せず key が毎回変わるとパフォーマンスに悪影響があります。例えば <code>key={'{Math.random()}'}</code> のようにランダムな値を key に使うと、毎回すべての要素が再作成されてしまいます。key には安定した一意の値（データベースの ID など）を使いましょう。
              </p>
            </InfoBox>

            <CodePreview
              code={`// index を key にした場合の問題を具体的に見てみる

function IndexKeyProblem() {
  const [items, setItems] = React.useState(['りんご', 'バナナ', 'みかん'])
  const [newItem, setNewItem] = React.useState('')

  const handleAddToTop = () => {
    if (newItem.trim()) {
      setItems([newItem, ...items])
      setNewItem('')
    }
  }

  const listItemStyle = {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '6px',
  }

  const inputStyle = {
    padding: '4px 8px',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    fontSize: '13px',
  }

  return (
    <div style={{ padding: '16px', maxWidth: '400px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="フルーツ名"
          style={{ flex: 1, padding: '6px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px' }}
        />
        <button
          onClick={handleAddToTop}
          style={{ padding: '6px 12px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          先頭に追加
        </button>
      </div>

      <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
        各行のメモ欄に何か入力してから「先頭に追加」してみてください
      </p>

      <h4 style={{ fontWeight: 'bold', color: '#EF4444', fontSize: '14px', marginBottom: '6px' }}>
        NG: key=index（メモがズレる）
      </h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
        {items.map((item, index) => (
          <li key={index} style={listItemStyle}>
            <span style={{ fontSize: '13px', minWidth: '60px' }}>{item}</span>
            <input style={inputStyle} placeholder="メモ" />
          </li>
        ))}
      </ul>

      <h4 style={{ fontWeight: 'bold', color: '#22C55E', fontSize: '14px', marginBottom: '6px' }}>
        OK: key=item（メモが正しく追従する）
      </h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li key={item} style={listItemStyle}>
            <span style={{ fontSize: '13px', minWidth: '60px' }}>{item}</span>
            <input style={inputStyle} placeholder="メモ" />
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return <IndexKeyProblem />
}
`}
              title="index を key にした場合の具体的な問題 → メモを入力してから追加してみよう"
              previewHeight={400}
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="リスト表示で key にインデックス（index）を使うのが問題になるのは、どのようなケースですか？"
              options={[
                { label: 'リストの見た目を変更するとき' },
                { label: 'リストの項目を追加・削除・並べ替えるとき', correct: true },
                { label: 'リストの項目が100件を超えるとき' },
                { label: 'リストをネスト（入れ子）にするとき' },
              ]}
              explanation="index を key にすると、項目の追加・削除・並べ替え時に、React が要素を正しく特定できなくなります。例えば先頭に項目を追加すると、すべての index がズレるため、React は全要素が変更されたと誤認し、入力中のテキストがズレるなどのバグが発生します。静的なリストならば index でも問題ありません。"
            />
          </section>

          {/* フィルタリングとソート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フィルタリングとソート</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">.filter()</code> で条件に合う要素だけを抽出し、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">.sort()</code> で並び替えができます。
            </p>
            <CodePreview
              code={`function TaskBoard() {
  const tasks = [
    { id: 1, title: 'デザインレビュー', priority: 'high', done: false },
    { id: 2, title: 'ミーティング資料作成', priority: 'medium', done: true },
    { id: 3, title: 'バグ修正', priority: 'high', done: false },
    { id: 4, title: 'ドキュメント更新', priority: 'low', done: false },
    { id: 5, title: 'テスト実行', priority: 'medium', done: true },
  ]

  const [filter, setFilter] = React.useState('all')

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.done
    if (filter === 'done') return task.done
    return true
  })

  const priorityColors = {
    high: { bg: '#FEE2E2', color: '#B91C1C' },
    medium: { bg: '#FEF3C7', color: '#92400E' },
    low: { bg: '#D1FAE5', color: '#065F46' },
  }

  const filters = [
    { key: 'all', label: 'すべて' },
    { key: 'active', label: '未完了' },
    { key: 'done', label: '完了' },
  ]

  return (
    <div style={{ padding: '16px', maxWidth: '400px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: filter === f.key ? '#3B82F6' : '#F3F4F6',
              color: filter === f.key ? 'white' : '#4B5563',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div>
        {filteredTasks.map((task) => (
          <div key={task.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            marginBottom: '6px',
            opacity: task.done ? 0.5 : 1,
          }}>
            <span style={{
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 'bold',
              backgroundColor: priorityColors[task.priority].bg,
              color: priorityColors[task.priority].color,
            }}>
              {task.priority}
            </span>
            <span style={{ textDecoration: task.done ? 'line-through' : 'none', fontSize: '14px' }}>
              {task.title}
            </span>
          </div>
        ))}
      </div>
      <p style={{ marginTop: '8px', fontSize: '13px', color: '#6B7280' }}>
        {filteredTasks.length} 件表示中（全 {tasks.length} 件）
      </p>
    </div>
  )
}

function App() {
  return <TaskBoard />
}
`}
              title="フィルタリング → ボタンで切り替えてみよう"
              previewHeight={280}
            />
          </section>

          {/* 空の状態 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">空の状態（Empty State）の処理</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              リストが空のときに何も表示されないと、ユーザーは「読み込み中？」「エラー？」と混乱します。適切な空の状態メッセージを表示しましょう。
            </p>
            <CodePreview
              code={`function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      textAlign: 'center',
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        backgroundColor: '#F3F4F6',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12px',
        fontSize: '24px',
      }}>
        \u{1F4ED}
      </div>
      <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#374151' }}>{title}</h3>
      {description && (
        <p style={{ marginTop: '4px', fontSize: '13px', color: '#9CA3AF', maxWidth: '240px' }}>
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            marginTop: '12px',
            padding: '6px 16px',
            backgroundColor: '#3B82F6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

function BookmarkList() {
  const [bookmarks, setBookmarks] = React.useState([])

  const addSample = () => {
    setBookmarks(['React入門ガイド', 'TypeScript実践', 'CSS設計パターン'])
  }

  if (bookmarks.length === 0) {
    return (
      <EmptyState
        title="ブックマークがありません"
        description="気になる記事をブックマークすると、ここに表示されます"
        actionLabel="サンプルを追加"
        onAction={addSample}
      />
    )
  }

  return (
    <div style={{ padding: '16px' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {bookmarks.map((bookmark) => (
          <li key={bookmark} style={{
            padding: '8px 12px',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            marginBottom: '6px',
            fontSize: '14px',
          }}>
            {bookmark}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setBookmarks([])}
        style={{ marginTop: '8px', fontSize: '12px', color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
      >
        リセット
      </button>
    </div>
  )
}

function App() {
  return <BookmarkList />
}
`}
              title="再利用可能な EmptyState コンポーネント → 「サンプルを追加」をクリックしてみよう"
              previewHeight={220}
            />
          </section>

          {/* 実践例: フィルタ付きカードギャラリー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: フィルタ付きカードギャラリー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              条件分岐、リスト表示、フィルタリング、空の状態を組み合わせた実用的なギャラリーコンポーネントです。
            </p>
            <CodePreview
              code={`const CATEGORIES = [
  { value: 'all', label: 'すべて' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'モバイル' },
  { value: 'branding', label: 'ブランディング' },
  { value: 'illustration', label: 'イラスト' },
]

const WORKS = [
  { id: 1, title: 'ECサイトリデザイン', category: 'web', emoji: '\u{1F6D2}', featured: true },
  { id: 2, title: '天気アプリUI', category: 'mobile', emoji: '\u{26C5}', featured: false },
  { id: 3, title: 'カフェロゴデザイン', category: 'branding', emoji: '\u{2615}', featured: true },
  { id: 4, title: 'ダッシュボード', category: 'web', emoji: '\u{1F4CA}', featured: false },
  { id: 5, title: 'フィットネスアプリ', category: 'mobile', emoji: '\u{1F3CB}', featured: true },
  { id: 6, title: 'キャラクターデザイン', category: 'illustration', emoji: '\u{1F3A8}', featured: false },
]

function DesignGallery() {
  const [activeCategory, setActiveCategory] = React.useState('all')
  const [showFeaturedOnly, setShowFeaturedOnly] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')

  const filteredWorks = WORKS.filter((work) => {
    if (activeCategory !== 'all' && work.category !== activeCategory) return false
    if (showFeaturedOnly && !work.featured) return false
    if (searchQuery && !work.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ padding: '16px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>デザインギャラリー</h2>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="作品名で検索..."
        style={{ width: '100%', padding: '6px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', marginBottom: '10px', fontSize: '13px', boxSizing: 'border-box' }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            style={{
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeCategory === cat.value ? '#3B82F6' : '#F3F4F6',
              color: activeCategory === cat.value ? 'white' : '#4B5563',
            }}
          >
            {cat.label}
          </button>
        ))}
        <label style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto', fontSize: '12px' }}>
          <input
            type="checkbox"
            checked={showFeaturedOnly}
            onChange={(e) => setShowFeaturedOnly(e.target.checked)}
          />
          注目のみ
        </label>
      </div>

      {filteredWorks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <p style={{ color: '#9CA3AF', fontSize: '14px' }}>条件に一致する作品がありません</p>
          <button
            onClick={() => { setActiveCategory('all'); setShowFeaturedOnly(false); setSearchQuery('') }}
            style={{ marginTop: '8px', fontSize: '12px', color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            フィルターをリセット
          </button>
        </div>
      ) : (
        <>
          <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
            {filteredWorks.length} 件の作品
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {filteredWorks.map((work) => (
              <div key={work.id} style={{ border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '60px', backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                  {work.emoji}
                  {work.featured && (
                    <span style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      backgroundColor: '#FBBF24',
                      color: '#78350F',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      padding: '1px 6px',
                      borderRadius: '999px',
                    }}>
                      注目
                    </span>
                  )}
                </div>
                <div style={{ padding: '8px' }}>
                  <span style={{ fontSize: '10px', color: '#6B7280', textTransform: 'uppercase' }}>
                    {CATEGORIES.find((c) => c.value === work.category)?.label}
                  </span>
                  <h3 style={{ fontWeight: 'bold', fontSize: '12px', marginTop: '2px' }}>{work.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function App() {
  return <DesignGallery />
}
`}
              title="フィルタ付きカードギャラリー → 検索・フィルタを試してみよう"
              previewHeight={380}
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="カテゴリフィルター付き商品リスト"
              description="商品データの配列から、選択されたカテゴリの商品だけを表示するフィルタリングロジックを完成させてください。'all' の場合は全商品を返します。"
              initialCode={`const products = [
  { id: 1, name: 'ノートPC', category: 'electronics', price: 89000 },
  { id: 2, name: 'デスクチェア', category: 'furniture', price: 45000 },
  { id: 3, name: 'モニター', category: 'electronics', price: 32000 },
  { id: 4, name: 'デスク', category: 'furniture', price: 28000 },
  { id: 5, name: 'キーボード', category: 'electronics', price: 12000 },
];

const selectedCategory = 'electronics'; // 'all' | 'electronics' | 'furniture'

// ここにフィルタリングのコードを書いてください
const filteredProducts = products;`}
              answer={`const products = [
  { id: 1, name: 'ノートPC', category: 'electronics', price: 89000 },
  { id: 2, name: 'デスクチェア', category: 'furniture', price: 45000 },
  { id: 3, name: 'モニター', category: 'electronics', price: 32000 },
  { id: 4, name: 'デスク', category: 'furniture', price: 28000 },
  { id: 5, name: 'キーボード', category: 'electronics', price: 12000 },
];

const selectedCategory = 'electronics'; // 'all' | 'electronics' | 'furniture'

const filteredProducts = selectedCategory === 'all'
  ? products
  : products.filter((product) => product.category === selectedCategory);`}
              keywords={['filteredProducts', '.filter(', 'selectedCategory']}
              hints={[
                'selectedCategory が "all" のときは products をそのまま返します。',
                '.filter() メソッドを使って、product.category が selectedCategory と一致するものだけを抽出します。',
                '三項演算子を使うとスッキリ書けます: selectedCategory === "all" ? products : products.filter(...)',
              ]}
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">条件分岐</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- 三項演算子: A か B か</li>
                  <li>- && 演算子: 表示するかしないか</li>
                  <li>- 早期 return: 複雑な分岐</li>
                  <li>- 数値 + && は {'> 0'} で比較する</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">リスト表示</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- .map() で配列を JSX に変換</li>
                  <li>- key にはユニークな id を使う</li>
                  <li>- key を変えると state がリセットされる</li>
                  <li>- .filter() でフィルタリング</li>
                  <li>- 空の状態を忘れずに対応する</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'React 公式: Conditional Rendering',
                  url: 'https://react.dev/learn/conditional-rendering',
                  description: '三項演算子、&& 演算子、早期 return による条件分岐のパターンを解説',
                },
                {
                  title: 'React 公式: Rendering Lists',
                  url: 'https://react.dev/learn/rendering-lists',
                  description: '.map() によるリスト表示と key prop の正しい使い方',
                },
                {
                  title: 'React 公式: Preserving and Resetting State',
                  url: 'https://react.dev/learn/preserving-and-resetting-state',
                  description: 'key を使った state のリセットや、React が state を保持する仕組み',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'index を key に使うのは絶対にダメ？',
                  answer: '絶対にダメということではありません。リストが静的で、項目の追加・削除・並べ替えが一切行われない場合は index でも問題ありません。例えばメニュー項目のような固定リストです。ただし、動的に変化するリスト（Todo リスト、検索結果など）では、必ず一意の ID を key にしましょう。迷ったら ID を使っておけば安全です。',
                },
                {
                  question: '大量のリスト（1000件以上）のパフォーマンスが気になる場合は？',
                  answer: '大量のリストを一度にレンダリングするとパフォーマンスが低下します。対策として「仮想スクロール（Virtual Scrolling）」があり、画面に見えている部分だけをレンダリングします。react-window や @tanstack/react-virtual といったライブラリが代表的です。ページネーション（ページ分割）やインフィニットスクロール（無限スクロール）も有効な手段です。',
                },
                {
                  question: 'JSX の中で null と undefined の違いは？',
                  answer: 'どちらも JSX の中で使うと「何も表示しない」という同じ結果になります。条件分岐で「何も表示しない」ことを明示したい場合は null を返すのが一般的な慣習です。一方、false や空文字列 "" も何も表示されません。ただし数値の 0 は「0」として表示されてしまうので注意が必要です。',
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
