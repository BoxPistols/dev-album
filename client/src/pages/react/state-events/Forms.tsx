import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function Forms() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 11</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          フォーム入門
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          ログインフォーム、問い合わせフォーム、設定画面 ── Web アプリに欠かせないフォームの実装パターンを学びます。React では「制御コンポーネント」というアプローチで、フォームの状態を完全にコントロールします。
        </p>

        <WhyNowBox tags={['フォーム', '制御コンポーネント', 'バリデーション', '実践']}>
          <p>
            useState、イベントハンドリング、条件分岐 ── ここまで学んだ知識が、フォーム実装ですべてつながります。フォームは Web アプリの中で最もインタラクティブな部分であり、これらの知識を総動員する実践的なテーマです。
          </p>
          <p>
            デザイナーとして「フォームの入力状態」「バリデーションエラー」「送信中の表示」をデザインしてきた方も多いでしょう。React でそれらを実装する方法を理解することで、デザインと実装の橋渡しができるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 制御コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">制御コンポーネント（Controlled Components）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React のフォームでは、入力要素の値を state で管理します。これを「制御コンポーネント」と呼びます。<code className="text-sm bg-muted px-1.5 py-0.5 rounded">value</code> と <code className="text-sm bg-muted px-1.5 py-0.5 rounded">onChange</code> のセットが基本パターンです。
            </p>
            <CodePreview
              code={`function ControlledInput() {
  const [name, setName] = React.useState('');

  return (
    <div style={{ padding: '24px', maxWidth: '400px' }}>
      {/*
        制御コンポーネントの仕組み:
        1. value={name} で state の値を input に反映
        2. onChange で入力値を受け取り state を更新
        3. state が更新されると再レンダリング → value が更新される

        この循環で、React が入力値を完全に制御する
      */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="ここに入力してみてください"
        style={{
          width: '100%', padding: '8px 12px',
          border: '1px solid var(--border)', borderRadius: '8px',
          fontSize: '14px', outline: 'none',
        }}
      />
      <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
        現在の値: 「{name}」({name.length}文字)
      </p>
    </div>
  );
}

function App() { return <ControlledInput /> }`}
              language="tsx"
              title="制御コンポーネントの基本"
              previewHeight={140}
            />
            <InfoBox type="info" title="なぜ制御コンポーネントを使うのか？">
              <p>
                value と onChange を使うことで、React が入力値の「唯一の真実の情報源（Single Source of Truth）」になります。バリデーション、値のフォーマット、条件付きの入力制限など、あらゆる制御が可能になります。
              </p>
            </InfoBox>
          </section>

          {/* 非制御コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">非制御コンポーネント（Uncontrolled Components）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              制御コンポーネントの対となる方法が「非制御コンポーネント」です。state で値を管理せず、DOM 自体が値を保持します。<code className="text-sm bg-muted px-1.5 py-0.5 rounded">useRef</code> を使って DOM から直接値を取得します。
            </p>
            <CodeBlock
              code={`import { useRef } from 'react';

function UncontrolledInput() {
  // useRef で DOM 要素への参照を作成
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // DOM から直接値を取得
    const value = inputRef.current?.value;
    console.log('入力値:', value);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md space-y-4">
      {/* ref を渡すだけ。value も onChange も不要 */}
      <input
        ref={inputRef}
        type="text"
        defaultValue=""  // 初期値は defaultValue で設定
        className="w-full px-3 py-2 border rounded-lg"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        送信
      </button>
    </form>
  );
}

// 非制御コンポーネントの使いどころ
// - ファイル入力（<input type="file">）
// - サードパーティライブラリとの連携
// - 送信時にだけ値が必要で、リアルタイムの制御が不要な場合`}
              language="tsx"
              title="非制御コンポーネントと useRef"
              showLineNumbers
            />

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 px-3 text-foreground">比較項目</th>
                    <th className="text-left py-2 px-3 text-foreground">制御コンポーネント</th>
                    <th className="text-left py-2 px-3 text-foreground">非制御コンポーネント</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium">値の管理</td>
                    <td className="py-2 px-3">useState</td>
                    <td className="py-2 px-3">DOM（useRef）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium">リアルタイム制御</td>
                    <td className="py-2 px-3">可能</td>
                    <td className="py-2 px-3">不可</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium">バリデーション</td>
                    <td className="py-2 px-3">リアルタイムに可能</td>
                    <td className="py-2 px-3">送信時のみ</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium">推奨度</td>
                    <td className="py-2 px-3">React 推奨</td>
                    <td className="py-2 px-3">特定のケースで使用</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="success" title="基本は制御コンポーネント">
              <p>
                React の公式ドキュメントでは、ほとんどのケースで制御コンポーネントを使うことを推奨しています。非制御コンポーネントは、ファイル入力（<code>{'<input type="file">'}</code>）のように、プログラムから値を設定できない要素で使います。
              </p>
            </InfoBox>
          </section>

          {/* テキスト入力とテキストエリア */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">テキスト入力とテキストエリア</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              テキスト系の入力要素は、いずれも同じパターン（value + onChange）で制御します。
            </p>
            <CodePreview
              code={`function TextInputs() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [bio, setBio] = React.useState('');

  const inputStyle = {
    width: '100%', padding: '8px 12px',
    border: '1px solid var(--border)', borderRadius: '8px',
    fontSize: '14px', outline: 'none',
  };
  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '4px' };

  return (
    <div style={{ padding: '24px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 通常のテキスト入力 */}
      <div>
        <label style={labelStyle}>名前</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
          placeholder="山田太郎" style={inputStyle} />
      </div>

      {/* メール入力 */}
      <div>
        <label style={labelStyle}>メールアドレス</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com" style={inputStyle} />
      </div>

      {/* パスワード入力 */}
      <div>
        <label style={labelStyle}>パスワード</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="8文字以上" style={inputStyle} />
        {password.length > 0 && password.length < 8 && (
          <p style={{ fontSize: '13px', color: '#ef4444', marginTop: '4px' }}>8文字以上で入力してください</p>
        )}
      </div>

      {/* テキストエリア */}
      <div>
        <label style={labelStyle}>
          自己紹介
          <span style={{ color: '#9ca3af', marginLeft: '8px' }}>{bio.length}/200</span>
        </label>
        <textarea value={bio}
          onChange={(e) => { if (e.target.value.length <= 200) setBio(e.target.value); }}
          placeholder="自己紹介を書いてください..."
          rows={4}
          style={{ ...inputStyle, resize: 'none' }} />
      </div>
    </div>
  );
}

function App() { return <TextInputs /> }`}
              language="tsx"
              title="テキスト入力のバリエーション"
              previewHeight={360}
            />
          </section>

          {/* セレクトボックス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">セレクトボックス</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              HTML の select 要素も、value と onChange で制御します。
            </p>
            <CodePreview
              code={`function SelectExample() {
  const [prefecture, setPrefecture] = React.useState('');
  const [fontSize, setFontSize] = React.useState('16');

  const prefectures = [
    { value: '', label: '選択してください' },
    { value: 'tokyo', label: '東京都' },
    { value: 'osaka', label: '大阪府' },
    { value: 'kyoto', label: '京都府' },
    { value: 'hokkaido', label: '北海道' },
    { value: 'fukuoka', label: '福岡県' },
  ];

  const selectStyle = {
    width: '100%', padding: '8px 12px',
    border: '1px solid var(--border)', borderRadius: '8px',
    fontSize: '14px', backgroundColor: '#fff',
  };

  return (
    <div style={{ padding: '24px', maxWidth: '400px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '4px' }}>都道府県</label>
        <select value={prefecture} onChange={(e) => setPrefecture(e.target.value)} style={selectStyle}>
          {prefectures.map((pref) => (
            <option key={pref.value} value={pref.value}>{pref.label}</option>
          ))}
        </select>
        {prefecture && (
          <p style={{ fontSize: '13px', color: '#16a34a', marginTop: '4px' }}>
            選択中: {prefectures.find((p) => p.value === prefecture)?.label}
          </p>
        )}
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '4px' }}>フォントサイズ</label>
        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} style={selectStyle}>
          <option value="12">12px - 小さい</option>
          <option value="16">16px - 標準</option>
          <option value="20">20px - 大きめ</option>
          <option value="24">24px - 大きい</option>
        </select>
        <p style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px', fontSize: fontSize + 'px' }}>
          このテキストのサイズが変わります
        </p>
      </div>
    </div>
  );
}

function App() { return <SelectExample /> }`}
              language="tsx"
              title="セレクトボックスの制御"
              previewHeight={300}
            />
          </section>

          {/* チェックボックスとラジオボタン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">チェックボックスとラジオボタン</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              チェックボックスは <code className="text-sm bg-muted px-1.5 py-0.5 rounded">checked</code> + <code className="text-sm bg-muted px-1.5 py-0.5 rounded">onChange</code>、ラジオボタンは <code className="text-sm bg-muted px-1.5 py-0.5 rounded">checked</code> + <code className="text-sm bg-muted px-1.5 py-0.5 rounded">onChange</code> + 共通の state で制御します。
            </p>
            <CodePreview
              code={`function CheckboxRadio() {
  const [interests, setInterests] = React.useState([]);
  const [plan, setPlan] = React.useState('free');

  const handleInterestChange = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const interestOptions = ['デザイン', 'プログラミング', '写真', 'イラスト', '動画編集'];

  const plans = [
    { value: 'free', label: 'フリープラン', price: '¥0/月' },
    { value: 'pro', label: 'プロプラン', price: '¥980/月' },
    { value: 'team', label: 'チームプラン', price: '¥2,980/月' },
  ];

  const labelStyle = {
    display: 'flex', alignItems: 'center', gap: '10px',
    cursor: 'pointer', marginBottom: '6px',
  };

  return (
    <div style={{ padding: '24px', maxWidth: '400px' }}>
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, marginBottom: '10px' }}>興味のある分野（複数選択可）</p>
        <div>
          {interestOptions.map((interest) => (
            <label key={interest} style={labelStyle}>
              <input
                type="checkbox"
                checked={interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
              />
              <span style={{ fontSize: '14px' }}>{interest}</span>
            </label>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>
          選択中: {interests.length > 0 ? interests.join(', ') : 'なし'}
        </p>
      </div>

      <div>
        <p style={{ fontSize: '13px', fontWeight: 500, marginBottom: '10px' }}>プランを選択</p>
        {plans.map((p) => (
          <label
            key={p.value}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px', marginBottom: '6px',
              border: plan === p.value ? '2px solid #3b82f6' : '1px solid #e5e7eb',
              borderRadius: '8px', cursor: 'pointer',
              backgroundColor: plan === p.value ? '#eff6ff' : '#fff',
            }}
          >
            <input
              type="radio" name="plan" value={p.value}
              checked={plan === p.value}
              onChange={(e) => setPlan(e.target.value)}
            />
            <span style={{ flex: 1, fontWeight: 500, fontSize: '14px' }}>{p.label}</span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{p.price}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function App() { return <CheckboxRadio /> }`}
              language="tsx"
              title="チェックボックスとラジオボタン"
              previewHeight={380}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="制御コンポーネントで input の値を管理するために必要な props の組み合わせはどれですか？"
              options={[
                { label: 'defaultValue と onChange' },
                { label: 'value と onChange', correct: true },
                { label: 'ref と onChange' },
                { label: 'value と onInput' },
              ]}
              explanation="制御コンポーネントでは、value で state の値を input に反映し、onChange で入力値を受け取って state を更新します。defaultValue は非制御コンポーネントで使う初期値設定用の prop です。ref も非制御コンポーネントのアプローチです。"
            />
          </section>

          {/* フォーム送信 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フォーム送信（onSubmit）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              複数の入力をまとめてフォームとして送信する方法です。<code className="text-sm bg-muted px-1.5 py-0.5 rounded">{'<form>'}</code> タグの <code className="text-sm bg-muted px-1.5 py-0.5 rounded">onSubmit</code> でまとめて処理します。
            </p>
            <CodePreview
              code={`function SignupForm() {
  const [formData, setFormData] = React.useState({
    username: '', email: '', password: '', confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('パスワードが一致しません');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      alert('送信データ: ' + JSON.stringify(formData, null, 2));
      setIsSubmitting(false);
    }, 1500);
  };

  const inputStyle = {
    width: '100%', padding: '8px 12px',
    border: '1px solid var(--border)', borderRadius: '8px',
    fontSize: '14px', outline: 'none',
  };
  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '4px' };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '24px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>アカウント作成</h2>
      <div>
        <label style={labelStyle}>ユーザー名</label>
        <input type="text" value={formData.username} required
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>メール</label>
        <input type="email" value={formData.email} required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>パスワード</label>
        <input type="password" value={formData.password} required minLength={8}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>パスワード（確認）</label>
        <input type="password" value={formData.confirmPassword} required
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          style={inputStyle} />
      </div>
      <button type="submit" disabled={isSubmitting} style={{
        width: '100%', padding: '10px', borderRadius: '8px', border: 'none',
        color: '#fff', fontWeight: 500, fontSize: '14px',
        backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
        cursor: isSubmitting ? 'not-allowed' : 'pointer',
      }}>
        {isSubmitting ? '送信中...' : 'アカウントを作成'}
      </button>
    </form>
  );
}

function App() { return <SignupForm /> }`}
              language="tsx"
              title="フォーム送信の実装"
              previewHeight={380}
            />
          </section>

          {/* 単一ハンドラで複数入力を管理 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1つのハンドラで複数の入力を管理する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              入力フィールドが増えるたびに個別の onChange を書くのは面倒です。<code className="text-sm bg-muted px-1.5 py-0.5 rounded">name</code> 属性を活用して、1つのハンドラで全フィールドを管理するテクニックがあります。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
}

function ProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
  });

  // 汎用的な変更ハンドラ
  // name 属性を使って、どのフィールドが変更されたかを判別
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,  // Computed Property で動的にキーを指定
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">姓</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">名</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">メール</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">電話番号</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">会社名</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">役職</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg bg-white"
        >
          <option value="">選択してください</option>
          <option value="designer">デザイナー</option>
          <option value="engineer">エンジニア</option>
          <option value="pm">プロダクトマネージャー</option>
          <option value="other">その他</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        保存
      </button>
    </form>
  );
}`}
              language="tsx"
              title="name 属性で汎用的な handleChange を実現"
              showLineNumbers
            />
            <InfoBox type="success" title="このパターンのメリット">
              <p>
                フィールドが10個あっても handleChange は1つで済みます。ポイントは input の <code>name</code> 属性を state のキー名と一致させることです。<code>[name]: value</code> という Computed Property Names の構文で、動的にオブジェクトのキーを指定しています。
              </p>
            </InfoBox>
          </section>

          {/* フォームバリデーション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フォームバリデーションの基本</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ユーザーが正しい形式でデータを入力しているかをチェックするのがバリデーションです。リアルタイムバリデーションと送信時バリデーションの2つの方法があります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">リアルタイムバリデーション vs 送信時バリデーション</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h4 className="font-bold text-foreground mb-2">リアルタイムバリデーション</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- 入力中またはフォーカスが外れた時に検証</li>
                  <li>- ユーザーにすぐフィードバックを返せる</li>
                  <li>- パスワード強度表示などに最適</li>
                  <li>- 過度に使うと煩わしい</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h4 className="font-bold text-foreground mb-2">送信時バリデーション</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- 送信ボタン押下時に一括検証</li>
                  <li>- 入力中にエラーが出ないので快適</li>
                  <li>- シンプルなフォームに最適</li>
                  <li>- エラー箇所が一目でわかるようにする</li>
                </ul>
              </div>
            </div>

            <CodeBlock
              code={`import { useState } from 'react';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // バリデーション関数
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'お名前は必須です';
    } else if (name.length < 2) {
      newErrors.name = 'お名前は2文字以上で入力してください';
    }

    if (!email.trim()) {
      newErrors.email = 'メールアドレスは必須です';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '正しいメールアドレスの形式で入力してください';
    }

    if (!message.trim()) {
      newErrors.message = 'メッセージは必須です';
    } else if (message.length < 10) {
      newErrors.message = 'メッセージは10文字以上で入力してください';
    }

    return newErrors;
  };

  // フォーカスが外れたとき（blur）にバリデーション
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  // 送信時にバリデーション
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 全フィールドを touched にする
    setTouched({ name: true, email: true, message: true });

    const validationErrors = validate();
    setErrors(validationErrors);

    // エラーがなければ送信
    if (Object.keys(validationErrors).length === 0) {
      console.log('送信:', { name, email, message });
      alert('送信しました！');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md space-y-4">
      <h2 className="text-xl font-bold">お問い合わせ</h2>

      {/* 名前フィールド */}
      <div>
        <label className="block text-sm font-medium mb-1">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleBlur('name')}
          className={\`w-full px-3 py-2 border rounded-lg outline-none transition-colors
            \${touched.name && errors.name
              ? 'border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-200'
            }\`}
        />
        {touched.name && errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      {/* メールフィールド */}
      <div>
        <label className="block text-sm font-medium mb-1">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email')}
          className={\`w-full px-3 py-2 border rounded-lg outline-none transition-colors
            \${touched.email && errors.email
              ? 'border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-200'
            }\`}
        />
        {touched.email && errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      {/* メッセージフィールド */}
      <div>
        <label className="block text-sm font-medium mb-1">
          メッセージ <span className="text-red-500">*</span>
          <span className="text-gray-400 ml-2">{message.length}/500</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= 500) setMessage(e.target.value);
          }}
          onBlur={() => handleBlur('message')}
          rows={4}
          className={\`w-full px-3 py-2 border rounded-lg resize-none outline-none transition-colors
            \${touched.message && errors.message
              ? 'border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-200'
            }\`}
        />
        {touched.message && errors.message && (
          <p className="text-sm text-red-500 mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
      >
        送信する
      </button>
    </form>
  );
}`}
              language="tsx"
              title="バリデーション付きお問い合わせフォーム"
              showLineNumbers
            />
            <InfoBox type="info" title="touched の役割">
              <p>
                touched はフィールドが一度でもフォーカスされたかを記録します。これにより、まだ触れていないフィールドにエラーメッセージが表示されるのを防ぎます。ユーザーがフィールドに入力してフォーカスを外したとき（blur）に初めてバリデーションエラーを表示する、というのが一般的な UX パターンです。
              </p>
            </InfoBox>
          </section>

          {/* React Hook Form の紹介 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React Hook Form の紹介</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでの手動バリデーションで「コードが多い...」と感じた方もいるでしょう。実際のプロジェクトでは、フォームライブラリを使うことが一般的です。React Hook Form は最も人気のあるフォームライブラリの1つです。
            </p>

            <CodeBlock
              code={`// React Hook Form を使わない場合（手動管理）
// - 各フィールドごとに useState が必要
// - handleChange を自分で書く
// - バリデーション関数を自作
// - errors, touched の管理も自前
// → フィールドが増えるとコードが膨大に

// React Hook Form を使う場合
import { useForm } from 'react-hook-form';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

function SignupWithRHF() {
  const {
    register,     // input に接続する関数
    handleSubmit,  // 送信ハンドラ（バリデーション付き）
    formState: { errors, isSubmitting },  // エラーと送信状態
  } = useForm<SignupData>();

  const onSubmit = async (data: SignupData) => {
    // バリデーション通過後のデータが引数に入る
    console.log(data);
    await new Promise((r) => setTimeout(r, 1000));
    alert(\`登録完了！ こんにちは、\${data.name}さん\`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">名前</label>
        <input
          {...register('name', {
            required: 'お名前は必須です',
            minLength: { value: 2, message: '2文字以上で入力してください' },
          })}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">メール</label>
        <input
          type="email"
          {...register('email', {
            required: 'メールアドレスは必須です',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '正しい形式で入力してください',
            },
          })}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">パスワード</label>
        <input
          type="password"
          {...register('password', {
            required: 'パスワードは必須です',
            minLength: { value: 8, message: '8文字以上で入力してください' },
          })}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? '送信中...' : '登録'}
      </button>
    </form>
  );
}`}
              language="tsx"
              title="React Hook Form でフォームをシンプルに"
              showLineNumbers
            />
            <InfoBox type="info" title="なぜフォームライブラリを使うのか？">
              <div className="space-y-2">
                <p><strong>コード量の削減</strong>: useState、handleChange、バリデーション関数が不要になり、コードが大幅に短くなります。</p>
                <p><strong>パフォーマンス</strong>: React Hook Form は非制御コンポーネントベースなので、入力のたびに再レンダリングが発生しません。大きなフォームでは大きな差になります。</p>
                <p><strong>バリデーション</strong>: Zod や Yup などのスキーマライブラリと統合できます。</p>
                <p><strong>まずは基本を理解してから</strong>: ライブラリの内部で何が起きているかを理解するために、制御コンポーネントの基本は必ず押さえておきましょう。</p>
              </div>
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="非制御コンポーネントで DOM から値を取得するために使う React の Hook はどれですか？"
              options={[
                { label: 'useState' },
                { label: 'useEffect' },
                { label: 'useRef', correct: true },
                { label: 'useCallback' },
              ]}
              explanation="useRef は DOM 要素への参照を作成し、.current プロパティで DOM 要素にアクセスできます。非制御コンポーネントでは、useRef で input 要素を参照し、inputRef.current.value で値を取得します。useState は制御コンポーネントのアプローチです。"
            />
          </section>

          {/* 実践例: 統合的なフォームパターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践パターン: フォームの状態管理</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              本格的なフォームでは、入力データだけでなく送信状態（idle / submitting / success / error）も管理する必要があります。以下のパターンを押さえておきましょう。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function PracticalForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '',
    newsletter: false, privacyPolicy: false,
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 汎用 handleChange（テキスト + チェックボックス対応）
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    const value = type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // バリデーション → 送信 → 状態管理
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = '必須項目です';
    if (!formData.email.trim()) newErrors.email = '必須項目です';
    if (!formData.privacyPolicy) newErrors.privacyPolicy = '同意が必要です';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setStatus('submitting');
    try {
      await new Promise((r) => setTimeout(r, 2000)); // API 呼び出し
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  // 送信完了画面
  if (status === 'success') {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">送信完了</h2>
        <p className="text-gray-500">ありがとうございます。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg space-y-5">
      {status === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          送信に失敗しました。再度お試しください。
        </div>
      )}
      {/* 各フィールド: name属性 + handleChange + errors表示 */}
      <input name="name" value={formData.name} onChange={handleChange} />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      {/* ... 他のフィールドも同じパターン ... */}
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? '送信中...' : '送信する'}
      </button>
    </form>
  );
}`}
              language="tsx"
              title="フォーム状態管理の実践パターン"
              showLineNumbers
            />
            <InfoBox type="success" title="実践フォームのポイント">
              <div className="space-y-1">
                <p><strong>状態管理</strong>: formData（入力値）、errors（エラー）、status（送信状態）の3つを分けて管理</p>
                <p><strong>汎用ハンドラ</strong>: name 属性 + Computed Property で1つの handleChange で全フィールドを管理</p>
                <p><strong>UX</strong>: 送信中はボタンを無効化し、完了画面・エラー表示を条件分岐で切り替える</p>
              </div>
            </InfoBox>
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="バリデーション付きサインアップフォーム"
              description="サインアップフォームのバリデーション関数を完成させてください。条件: (1) name は必須かつ2文字以上、(2) email は必須かつメール形式、(3) password は必須かつ8文字以上。エラーがあればオブジェクトにメッセージを設定し、なければ空のオブジェクトを返してください。"
              initialCode={`interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

function validate(name: string, email: string, password: string): Errors {
  const errors: Errors = {};

  // ここにバリデーションロジックを書いてください

  return errors;
}`}
              answer={`interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

function validate(name: string, email: string, password: string): Errors {
  const errors: Errors = {};

  if (!name.trim()) {
    errors.name = 'お名前は必須です';
  } else if (name.length < 2) {
    errors.name = '2文字以上で入力してください';
  }

  if (!email.trim()) {
    errors.email = 'メールアドレスは必須です';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = '正しいメールアドレスの形式で入力してください';
  }

  if (!password.trim()) {
    errors.password = 'パスワードは必須です';
  } else if (password.length < 8) {
    errors.password = '8文字以上で入力してください';
  }

  return errors;
}`}
              keywords={['errors.name', 'errors.email', 'errors.password', 'return errors']}
              hints={[
                'まず各フィールドが空でないかを .trim() で確認し、空なら「必須です」のエラーを設定します。',
                'メール形式のチェックには正規表現 /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ を使えます。',
                'if-else if の形で、「空チェック」→「形式・長さチェック」の順に書くとスッキリします。',
              ]}
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">フォームの基本</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- value + onChange = 制御コンポーネント</li>
                  <li>- ref + defaultValue = 非制御コンポーネント</li>
                  <li>- onSubmit + preventDefault でフォーム送信</li>
                  <li>- name 属性で汎用ハンドラを実現</li>
                  <li>- チェックボックスは checked + onChange</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">UX のポイント</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- blur 時にバリデーションを実行する</li>
                  <li>- 送信中は loading 表示 + ボタン無効化</li>
                  <li>- エラー/成功状態を明確に伝える</li>
                  <li>- 必須項目は * で示す</li>
                  <li>- 複雑なフォームにはライブラリを検討</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'React 公式: Sharing State Between Components',
                  url: 'https://react.dev/learn/sharing-state-between-components',
                  description: 'フォームの状態を親コンポーネントで管理し、子コンポーネント間で共有する方法',
                },
                {
                  title: 'React Hook Form 公式サイト',
                  url: 'https://react-hook-form.com/',
                  description: 'パフォーマンスに優れたフォームライブラリ。バリデーション、エラーハンドリングをシンプルに実装できる',
                },
                {
                  title: 'React 公式: Referencing Values with Refs',
                  url: 'https://react.dev/learn/referencing-values-with-refs',
                  description: 'useRef の使い方と、DOM 要素への参照を扱う方法',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: '制御コンポーネントと非制御コンポーネント、どっちがいい？',
                  answer: '基本的には制御コンポーネントが推奨です。リアルタイムバリデーション、入力値のフォーマット、条件付きの入力制限など、あらゆる制御が可能だからです。非制御コンポーネントは、ファイル入力や、大量のフィールドがあってパフォーマンスが気になるケース、サードパーティライブラリとの連携時に使います。React Hook Form は内部で非制御コンポーネントを使っているため、再レンダリングが少なく高パフォーマンスです。',
                },
                {
                  question: 'フォームライブラリは最初から使うべき？',
                  answer: '学習段階では、まず useState と onChange による制御コンポーネントの仕組みを理解するのが大切です。基本を理解した上でライブラリを使えば、何が起きているか分かるので効率的に使えます。実際のプロジェクトでは、フィールドが5つ以上あるフォームや複雑なバリデーションが必要な場合に React Hook Form を導入するのがおすすめです。',
                },
                {
                  question: 'ファイルアップロードはどう実装する？',
                  answer: 'ファイル入力（<input type="file">）は制御コンポーネントにできないため、useRef で参照するか、onChange で FileList を state に保存します。例: onChange={(e) => setFile(e.target.files?.[0] ?? null)} のように書きます。アップロード先の API には FormData オブジェクトを使って送信するのが一般的です。ドラッグ&ドロップ対応には react-dropzone などのライブラリが便利です。',
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
