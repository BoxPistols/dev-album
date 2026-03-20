import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';

export default function FormGroup() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 65</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          Form グループの構造と課題
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          フォームはウェブアプリケーションの中核です。正しい HTML 構造、
          アクセシビリティ、バリデーション、React での管理手法まで包括的に学びましょう。
        </p>

        <div className="space-y-12 mt-8">
          {/* セクション1: フォームの基本 HTML 構造 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フォームの基本 HTML 構造</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>form</code>、<code>fieldset</code>、<code>legend</code>、<code>label</code>、<code>input</code> の
              正しい階層を理解することが、アクセシブルなフォーム作りの第一歩です。
            </p>

            <CodePreview
              code={`function FormStructureDemo() {
  return (
    <form style={{ padding: '20px', maxWidth: '420px' }} onSubmit={e => e.preventDefault()}>
      <fieldset style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', margin: '0 0 16px 0' }}>
        <legend style={{ fontWeight: 'bold', padding: '0 8px', color: 'var(--text)' }}>個人情報</legend>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>
            氏名 <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input id="name" type="text" required style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>
            メールアドレス <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input id="email" type="email" required style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box' }} />
        </div>
      </fieldset>
      <fieldset style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', margin: '0 0 16px 0' }}>
        <legend style={{ fontWeight: 'bold', padding: '0 8px', color: 'var(--text)' }}>パスワード設定</legend>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>
            パスワード <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input id="password" type="password" minLength={8} required style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box' }} />
        </div>
      </fieldset>
      <button type="submit" style={{ padding: '8px 24px', background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>登録する</button>
    </form>
  );
}`}
              language="tsx"
              title="fieldset / legend によるフォーム構造"
            />

            <div className="space-y-3 mt-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">form: </strong>
                  フォーム全体のコンテナ。JS 制御でも必ず form 要素を使う。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">fieldset + legend: </strong>
                  関連するフォーム要素をグループ化。スクリーンリーダーがグループ単位で読み上げる。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">label: </strong>
                  入力フィールドの説明。for 属性で input の id と紐付ける。クリックで input にフォーカスが移る。
                </p>
              </div>
            </div>
          </section>

          {/* セクション2: label と input の紐付け */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">label と input の紐付け</h2>

            <CodePreview
              code={`function LabelAssociationDemo() {
  const [bio, setBio] = React.useState('');
  const [agreed, setAgreed] = React.useState(false);
  return (
    <div style={{ padding: '20px', maxWidth: '420px' }}>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>方法1: for/id で紐付ける（明示的ラベル・推奨）</p>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>ユーザー名</label>
        <input type="text" id="username" name="username" placeholder="例: yamada_taro" style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <label htmlFor="bio" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>自己紹介</label>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{bio.length}/200</span>
        </div>
        <textarea id="bio" name="bio" maxLength={200} value={bio} onChange={e => setBio(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box', minHeight: '60px', resize: 'vertical', fontFamily: 'inherit' }} />
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '16px 0' }} />
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>方法2: label の中に input をネスト（暗黙的ラベル）</p>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text)', cursor: 'pointer' }}>
        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: 'var(--text-accent)' }} />
        利用規約に同意する
      </label>
    </div>
  );
}`}
              language="tsx"
              title="明示的ラベル（推奨）vs 暗黙的ラベル"
            />

            <InfoBox type="warning" title="明示的ラベルを推奨する理由">
              <ul className="list-disc pl-4 space-y-1">
                <li>label と input を離れた位置に配置できる（柔軟なレイアウト対応）</li>
                <li>一部の古いスクリーンリーダーでの互換性が高い</li>
                <li>Testing Library 等で for/id の関係を検証しやすい</li>
              </ul>
              <p className="mt-2">
                暗黙的ラベルはチェックボックスやラジオボタンなど、ラベルと入力が密接に並ぶ場合に使う。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: fieldset + legend の活用 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">fieldset + legend の活用</h2>

            <CodeBlock
              language="html"
              title="ラジオボタン群と住所フォーム"
              showLineNumbers
              code={`<!-- スクリーンリーダーは「配送方法、通常配送、ラジオボタン」と読む -->
<fieldset>
  <legend>配送方法</legend>
  <label>
    <input type="radio" name="shipping" value="standard" />
    通常配送（3-5営業日）
  </label>
  <label>
    <input type="radio" name="shipping" value="express" />
    速達（1-2営業日）
  </label>
</fieldset>

<!-- 住所フォームのグループ化 -->
<fieldset>
  <legend>配送先住所</legend>
  <label for="zip">郵便番号</label>
  <input type="text" id="zip" name="zip"
         pattern="\\d{3}-?\\d{4}" placeholder="123-4567" />
  <label for="pref">都道府県</label>
  <select id="pref" name="prefecture">
    <option value="">選択してください</option>
    <option value="tokyo">東京都</option>
  </select>
  <label for="city">市区町村</label>
  <input type="text" id="city" name="city" />
</fieldset>`}
            />
          </section>

          {/* セクション4: よくある HTML 構造の間違い */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">よくある HTML 構造の間違い</h2>

            <CodeBlock
              language="html"
              title="4つの代表的な間違い"
              code={`<!-- 間違い1: div で囲むだけで fieldset を使わない -->
<div class="form-group">
  <h3>お支払い方法</h3>  <!-- h3 ではラジオとの関連を認識できない -->
  <label><input type="radio" name="pay" value="card" /> カード</label>
</div>
<!-- 正解 --> <fieldset><legend>お支払い方法</legend>...</fieldset>

<!-- 間違い2: label なしの input -->
<span>メール</span>  <!-- span はラベルとして認識されない -->
<input type="email" name="email" />
<!-- 正解 --> <label for="email">メール</label><input id="email" ... />

<!-- 間違い3: placeholder をラベル代わりにする -->
<input type="text" placeholder="氏名を入力" />
<!-- 問題: 入力開始で消える、コントラスト比が低い、SR非対応の場合あり -->
<!-- 正解 --> <label for="name">氏名</label>
             <input id="name" placeholder="例: 山田 太郎" />

<!-- 間違い4: display:none でラベルを隠す -->
<label style="display:none">検索</label>  <!-- SR からも見えなくなる -->
<!-- 正解: visually-hidden パターン -->
<label for="search" class="visually-hidden">検索</label>
<input type="search" id="search" placeholder="検索..." />`}
            />

            <CodeBlock
              language="css"
              title="visually-hidden パターン"
              code={`.visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap; border: 0;
}
/* SR は読み上げるが、視覚的には見えない */`}
            />

            <InfoBox type="error" title="display: none は使わない">
              <p>
                <code>display: none</code> や <code>visibility: hidden</code> はスクリーンリーダーからも隠されます。
                視覚的に隠す場合は <code>visually-hidden</code> パターンか <code>aria-label</code> を使ってください。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: バリデーション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">バリデーション: ネイティブ vs JavaScript</h2>

            <CodeBlock
              language="html"
              title="ネイティブバリデーション属性"
              code={`<form>
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <input type="tel" name="phone"
         pattern="\\d{2,4}-\\d{2,4}-\\d{4}"
         title="例: 03-1234-5678" />
  <input type="password" name="password"
         minlength="8" maxlength="128" required />
  <input type="number" name="age" min="18" max="120" />
  <button type="submit">送信</button>
</form>`}
            />

            <div className="mt-4" />

            <CodePreview
              code={`function ValidationStatesDemo() {
  const [name, setName] = React.useState('山田 太郎');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('abc');
  const [submitted, setSubmitted] = React.useState(true);

  const errors = {};
  if (submitted) {
    if (!name) errors.name = '氏名は必須です';
    if (!email) errors.email = 'メールは必須です';
    else if (!/^[^@]+@[^@]+\\.[^@]+$/.test(email)) errors.email = '有効なメールアドレスを入力してください';
    if (!password) errors.password = 'パスワードは必須です';
    else if (password.length < 8) errors.password = 'パスワードは8文字以上で入力してください';
  }

  const fieldStyle = (hasError, isValid) => ({
    width: '100%', padding: '8px 12px',
    border: hasError ? '2px solid #ef4444' : isValid ? '2px solid #22c55e' : '1px solid var(--border)',
    borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box',
    outline: 'none',
  });

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <form style={{ padding: '20px', maxWidth: '420px' }} onSubmit={handleSubmit} noValidate>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>フィールドを編集してバリデーション状態の変化を確認できます</p>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="vs-name" style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>
          氏名 <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input id="vs-name" value={name} onChange={e => setName(e.target.value)}
          aria-invalid={!!errors.name} style={fieldStyle(errors.name, submitted && name)} />
        {errors.name ? <p role="alert" style={{ margin: '4px 0 0', fontSize: '13px', color: '#ef4444' }}>{errors.name}</p>
         : submitted && name ? <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#22c55e' }}>OK</p> : null}
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="vs-email" style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>
          メール <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input id="vs-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
          aria-invalid={!!errors.email} style={fieldStyle(errors.email, submitted && email && !errors.email)} />
        {errors.email ? <p role="alert" style={{ margin: '4px 0 0', fontSize: '13px', color: '#ef4444' }}>{errors.email}</p>
         : submitted && email && !errors.email ? <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#22c55e' }}>OK</p> : null}
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="vs-pw" style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>
          パスワード <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input id="vs-pw" type="password" value={password} onChange={e => setPassword(e.target.value)}
          aria-invalid={!!errors.password} style={fieldStyle(errors.password, submitted && password && !errors.password)} />
        {errors.password ? <p role="alert" style={{ margin: '4px 0 0', fontSize: '13px', color: '#ef4444' }}>{errors.password}</p>
         : submitted && password && !errors.password ? <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#22c55e' }}>OK</p> : null}
      </div>
      <button type="submit" style={{ padding: '8px 24px', background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>送信</button>
    </form>
  );
}`}
              language="tsx"
              title="バリデーション状態の視覚フィードバック（valid / invalid）"
            />

            <InfoBox type="info" title="使い分けのベストプラクティス">
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>ネイティブ</strong>: シンプルなフォーム向け。デザインのカスタマイズが困難</li>
                <li><strong>JS</strong>: 複雑な条件（パスワード一致、非同期チェック等）に対応可能</li>
                <li><strong>推奨</strong>: JS バリデーションをメインに、required や type="email" はセマンティクスとして残す</li>
              </ul>
            </InfoBox>
          </section>

          {/* セクション6: エラー表示パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">エラー表示のパターン</h2>

            <CodePreview
              code={`function InlineErrorDemo() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('test@invalid');
  const [submitted, setSubmitted] = React.useState(true);

  const nameError = submitted && !name ? '氏名は必須です' : '';
  const emailError = submitted && email && !/^[^@]+@[^@]+\\.[^@]+$/.test(email) ? '有効なメールアドレスを入力してください' : '';

  return (
    <form style={{ padding: '20px', maxWidth: '420px' }} onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="ie-name" style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>
          氏名 <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input id="ie-name" value={name} onChange={e => setName(e.target.value)}
          aria-invalid={!!nameError} aria-describedby={nameError ? 'ie-name-error' : undefined}
          style={{ width: '100%', padding: '8px 12px', border: nameError ? '2px solid #ef4444' : '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box' }} />
        {nameError && <p id="ie-name-error" role="alert" style={{ margin: '4px 0 0', fontSize: '13px', color: '#ef4444' }}>{nameError}</p>}
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="ie-email" style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>メールアドレス</label>
        <input id="ie-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
          aria-invalid={!!emailError} aria-describedby={emailError ? 'ie-email-error' : undefined}
          style={{ width: '100%', padding: '8px 12px', border: emailError ? '2px solid #ef4444' : '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box' }} />
        {emailError && <p id="ie-email-error" role="alert" style={{ margin: '4px 0 0', fontSize: '13px', color: '#ef4444' }}>{emailError}</p>}
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>入力してエラーの表示/非表示を確認できます</p>
    </form>
  );
}`}
              language="tsx"
              title="インラインエラー + aria-describedby"
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="エラーサマリー（フォーム上部にまとめて表示）"
              showLineNumbers
              code={`function ErrorSummary({ errors }: {
  errors: Record<string, string>;
}) {
  const entries = Object.entries(errors);
  if (entries.length === 0) return null;
  return (
    <div role="alert" aria-labelledby="err-title" className="error-summary">
      <h3 id="err-title">{entries.length} 件のエラーがあります</h3>
      <ul>
        {entries.map(([field, msg]) => (
          <li key={field}>
            <a href={\`#field-\${field}\`}
               onClick={e => {
                 e.preventDefault();
                 document.getElementById(\`field-\${field}\`)?.focus();
               }}>{msg}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="role='alert' の効果">
              <p>
                <code>role="alert"</code> を付けた要素が DOM に追加されると、
                スクリーンリーダーが即座にその内容を読み上げます（ライブリージョン）。
                フォーム送信後に動的に表示されるエラーメッセージに有効です。
              </p>
            </InfoBox>
          </section>

          {/* 理解度チェック1 */}
          <section>
            <Quiz
              question="ラジオボタン群をグループ化する際、最も適切な HTML はどれですか？"
              options={[
                { label: 'div + h3 でグループのタイトルを付ける' },
                { label: 'fieldset + legend でグループ化する', correct: true },
                { label: 'section + aria-label でグループ化する' },
                { label: 'ul + li でリスト構造にする' },
              ]}
              explanation="fieldset + legend の組み合わせが正解です。スクリーンリーダーは fieldset 内の各ラジオボタンにフォーカスした際に legend の内容を文脈として読み上げます。div + h3 では見た目は似ていても、スクリーンリーダーがラジオボタンとグループ名の関連を認識できません。"
            />
          </section>

          {/* セクション7: React でのフォーム管理 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React でのフォーム管理</h2>

            <CodeBlock
              language="tsx"
              title="制御コンポーネント vs 非制御コンポーネント"
              showLineNumbers
              code={`// 制御コンポーネント: state が唯一の信頼できる情報源
function ControlledForm() {
  const [name, setName] = useState('');
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="c-name">氏名</label>
      <input id="c-name" value={name}
             onChange={e => setName(e.target.value)} />
    </form>
  );
}
// メリット: リアルタイムバリデーション、条件付きフィールド制御が容易
// デメリット: フィールド数が多いとボイラープレートが増える

// 非制御コンポーネント: DOM が値を管理
function UncontrolledForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="u-name">氏名</label>
      <input id="u-name" name="name" defaultValue="" />
    </form>
  );
}
// メリット: コードがシンプル、再レンダリングが少ない
// デメリット: リアルタイムバリデーションが難しい`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="React Hook Form: 非制御ベースの高機能ライブラリ"
              showLineNumbers
              code={`import { useForm } from 'react-hook-form';

interface FormValues { name: string; email: string; }

function RHFForm() {
  const {
    register, handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <label htmlFor="rhf-name">氏名</label>
      <input id="rhf-name"
        {...register('name', {
          required: '氏名は必須です',
          minLength: { value: 2, message: '2文字以上' },
        })}
        aria-invalid={!!errors.name} />
      {errors.name && <p role="alert">{errors.name.message}</p>}

      <label htmlFor="rhf-email">メール</label>
      <input id="rhf-email" type="email"
        {...register('email', {
          required: 'メールは必須です',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
            message: '有効なメールアドレスを入力してください',
          },
        })}
        aria-invalid={!!errors.email} />
      {errors.email && <p role="alert">{errors.email.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '送信中...' : '送信'}
      </button>
    </form>
  );
}
// 設計思想: 非制御ベースで再レンダリングを最小限に抑える
// register() が ref + onChange + onBlur を自動設定`}
            />
          </section>

          {/* セクション8: 複雑なフォームの構造化 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">複雑なフォームの構造化</h2>

            <CodeBlock
              language="tsx"
              title="マルチステップフォーム"
              showLineNumbers
              code={`function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '',
  });
  const update = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <form onSubmit={handleFinalSubmit}>
      <nav aria-label="フォームの進行状況">
        <ol>
          <li aria-current={step === 1 ? 'step' : undefined}>基本情報</li>
          <li aria-current={step === 2 ? 'step' : undefined}>詳細</li>
          <li aria-current={step === 3 ? 'step' : undefined}>確認</li>
        </ol>
      </nav>

      {step === 1 && (
        <fieldset>
          <legend>基本情報（1/3）</legend>
          <label htmlFor="ms-name">氏名</label>
          <input id="ms-name" value={formData.name}
                 onChange={e => update('name', e.target.value)} />
          <button type="button" onClick={() => setStep(2)}>次へ</button>
        </fieldset>
      )}
      {step === 3 && (
        <fieldset>
          <legend>確認（3/3）</legend>
          <dl><dt>氏名</dt><dd>{formData.name}</dd></dl>
          <button type="button" onClick={() => setStep(2)}>戻る</button>
          <button type="submit">送信</button>
        </fieldset>
      )}
    </form>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="条件付きフィールドと動的フォーム"
              showLineNumbers
              code={`// 条件付きフィールド: 選択に応じて追加入力を表示
function ConditionalForm() {
  const [method, setMethod] = useState('');
  return (
    <fieldset>
      <legend>連絡先</legend>
      <label htmlFor="cf-method">連絡方法</label>
      <select id="cf-method" value={method}
              onChange={e => setMethod(e.target.value)}>
        <option value="">選択してください</option>
        <option value="email">メール</option>
        <option value="phone">電話</option>
      </select>
      {method === 'email' && (
        <div>
          <label htmlFor="cf-email">メールアドレス</label>
          <input type="email" id="cf-email" name="email" required />
        </div>
      )}
      {method === 'phone' && (
        <div>
          <label htmlFor="cf-phone">電話番号</label>
          <input type="tel" id="cf-phone" name="phone" required />
        </div>
      )}
    </fieldset>
  );
}

// 動的フォーム: フィールドの追加・削除
function DynamicSkills() {
  const [skills, setSkills] = useState([
    { id: crypto.randomUUID(), name: '' },
  ]);
  const add = () =>
    setSkills(p => [...p, { id: crypto.randomUUID(), name: '' }]);
  const remove = (id: string) =>
    setSkills(p => p.filter(s => s.id !== id));
  return (
    <fieldset>
      <legend>スキル一覧</legend>
      {skills.map((skill, i) => (
        <div key={skill.id}>
          <label htmlFor={\`skill-\${i}\`}>スキル {i + 1}</label>
          <input id={\`skill-\${i}\`} value={skill.name}
                 onChange={e => {
                   const next = [...skills];
                   next[i] = { ...skill, name: e.target.value };
                   setSkills(next);
                 }} />
          <button type="button" onClick={() => remove(skill.id)}
                  aria-label={\`スキル\${i + 1}を削除\`}>削除</button>
        </div>
      ))}
      <button type="button" onClick={add}>スキルを追加</button>
    </fieldset>
  );
}`}
            />
          </section>

          {/* セクション9: よくある課題 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">よくある課題と対策</h2>

            <h3 className="text-xl font-semibold text-foreground mt-4 mb-3">autocomplete 属性</h3>
            <CodeBlock
              language="html"
              title="主要な autocomplete 値"
              code={`<input name="name" autocomplete="name" />
<input name="email" autocomplete="email" />
<input name="tel" autocomplete="tel" />
<input name="zip" autocomplete="postal-code" />
<input name="address" autocomplete="street-address" />
<input name="current_pw" type="password" autocomplete="current-password" />
<input name="new_pw" type="password" autocomplete="new-password" />
<input name="otp" autocomplete="one-time-code" inputmode="numeric" />`}
            />

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">パスワードフィールドの UX</h3>
            <CodePreview
              code={`function PasswordFieldDemo() {
  const [pw, setPw] = React.useState('');
  const [show, setShow] = React.useState(false);

  const strength = (p) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[a-z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    return s;
  };
  const labels = ['', '弱い', '普通', '強い', '非常に強い'];
  const colors = ['', '#ef4444', '#f59e0b', '#22c55e', '#16a34a'];
  const score = strength(pw);

  return (
    <div style={{ padding: '20px', maxWidth: '420px' }}>
      <label htmlFor="pw-field" style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>パスワード</label>
      <div style={{ position: 'relative', display: 'flex', gap: '8px' }}>
        <input type={show ? 'text' : 'password'} id="pw-field"
          value={pw} onChange={e => setPw(e.target.value)}
          aria-describedby={pw ? 'pw-strength' : undefined}
          placeholder="8文字以上（大文字・小文字・数字を含む）"
          style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box' }} />
        <button type="button" onClick={() => setShow(!show)}
          aria-label={show ? 'パスワードを隠す' : 'パスワードを表示'}
          style={{ padding: '8px 14px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg)', color: 'var(--text)', cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap' }}>
          {show ? '隠す' : '表示'}
        </button>
      </div>
      {pw && (
        <div style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: i <= score ? colors[score] : 'var(--border)' }} />
            ))}
          </div>
          <p id="pw-strength" aria-live="polite" style={{ margin: 0, fontSize: '13px', color: colors[score] || 'var(--text-secondary)' }}>
            強度: {labels[score] || '入力してください'}
          </p>
        </div>
      )}
    </div>
  );
}`}
              language="tsx"
              title="パスワード表示切替と強度インジケーター"
            />

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">ファイルアップロード・select・date input</h3>
            <CodeBlock
              language="tsx"
              title="カスタムファイル入力の基本パターン"
              code={`function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  return (
    <div>
      <label htmlFor="file-upload">画像</label>
      <input ref={inputRef} type="file" id="file-upload"
             accept="image/png,image/jpeg"
             onChange={e => setFile(e.target.files?.[0] ?? null)}
             className="visually-hidden" />
      <button type="button" onClick={() => inputRef.current?.click()}>
        {file ? file.name : 'ファイルを選択'}
      </button>
    </div>
  );
}

// select のスタイリング: appearance: none で矢印を消してカスタムアイコンを被せる
// 完全カスタムが必要なら Radix UI Select を使う

// date input: ブラウザ間で UI が異なる
// 対策1: ネイティブ input + min/max で簡易対応
// 対策2: react-datepicker 等のライブラリを使う
// 対策3: 年/月/日 の select に分割する`}
            />

            <InfoBox type="info" title="カスタマイズの優先順位">
              <ol className="list-decimal pl-4 space-y-1">
                <li><strong>ネイティブ要素をそのまま使う</strong>（a11y とモバイル対応が自動確保）</li>
                <li><strong>appearance: none + CSS</strong> で外枠だけカスタマイズ</li>
                <li><strong>ヘッドレス UI ライブラリ</strong>（Radix UI、Headless UI、React Aria）</li>
                <li><strong>フルカスタム実装</strong>（最後の手段。WAI-ARIA の完全理解が必要）</li>
              </ol>
            </InfoBox>
          </section>

          {/* 理解度チェック2 */}
          <section>
            <Quiz
              question="React Hook Form が非制御コンポーネントをベースにしている主な理由はどれですか？"
              options={[
                { label: 'コードの記述量を減らすため' },
                { label: '入力のたびに再レンダリングが発生するのを避けるため', correct: true },
                { label: 'TypeScript との互換性を高めるため' },
                { label: 'ネイティブバリデーションを活用するため' },
              ]}
              explanation="制御コンポーネントでは onChange のたびに state が更新され、コンポーネントが再レンダリングされます。フィールド数が多いと1文字入力するたびにフォーム全体が再描画され、パフォーマンスに影響します。React Hook Form は非制御ベースで ref を使い DOM から直接値を取得することで、不要な再レンダリングを最小限に抑えています。"
            />
          </section>

          {/* 理解度チェック3 */}
          <section>
            <Quiz
              question="エラーメッセージに role='alert' を付ける効果はどれですか？"
              options={[
                { label: 'エラーメッセージが赤色で表示される' },
                { label: 'エラーメッセージがアニメーション付きで表示される' },
                { label: 'スクリーンリーダーが要素の出現を即座に読み上げる', correct: true },
                { label: 'ブラウザがエラーをコンソールにログ出力する' },
              ]}
              explanation="role='alert' はライブリージョンの一種です。この属性を持つ要素が DOM に挿入されると、スクリーンリーダーが自動的にその内容を読み上げます。視覚的な変化はなく、支援技術向けの情報です。バリデーションエラーのように動的に表示されるメッセージに使用します。"
            />
          </section>

          {/* コーディングチャレンジ1 */}
          <section>
            <CodingChallenge
              preview={true}
              title="アクセシブルなお問い合わせフォーム"
              description="フォームの ___ を埋めてください。fieldset + legend でグループ化し、label の for と input の id を紐付けます。"
              initialCode={`<form>
  <___>
    <___>お問い合わせ内容</___>

    <fieldset>
      <legend>お問い合わせ種別</legend>
      <label>
        <input type="radio" name="type" value="general" />
        一般
      </label>
      <label>
        <input type="radio" name="type" value="support" />
        技術サポート
      </label>
      <label>
        <input type="radio" name="type" value="other" />
        その他
      </label>
    </fieldset>

    <label for="contact-name">氏名</label>
    <input type="text" id="contact-name" name="name" required />

    <label for="contact-email">メール</label>
    <input type="email" id="contact-email" name="email" required />

    <label for="contact-message">メッセージ</label>
    <textarea id="contact-message" name="message" required></textarea>
  </fieldset>

  <button type="submit">送信</button>
</form>`}
              answer={`<form>
  <fieldset>
    <legend>お問い合わせ内容</legend>

    <fieldset>
      <legend>お問い合わせ種別</legend>
      <label>
        <input type="radio" name="type" value="general" />
        一般
      </label>
      <label>
        <input type="radio" name="type" value="support" />
        技術サポート
      </label>
      <label>
        <input type="radio" name="type" value="other" />
        その他
      </label>
    </fieldset>

    <label for="contact-name">氏名</label>
    <input type="text" id="contact-name" name="name" required />

    <label for="contact-email">メール</label>
    <input type="email" id="contact-email" name="email" required />

    <label for="contact-message">メッセージ</label>
    <textarea id="contact-message" name="message" required></textarea>
  </fieldset>

  <button type="submit">送信</button>
</form>`}
              hints={[
                'フォーム要素をグループ化する要素は fieldset です',
                'グループのタイトルを定義する要素は legend です',
              ]}
              keywords={['<fieldset>', '<legend>']}
            />
          </section>

          {/* コーディングチャレンジ2 */}
          <section>
            <CodingChallenge
              preview={true}
              title="インラインエラー表示付き FormField コンポーネント"
              description="FormField の ___ を埋めてください。label と input を紐付け、エラー時の ARIA 属性を設定します。"
              initialCode={`function FormField({ label, name, type = 'text', error }) {
  const id = \`field-\${name}\`;
  const errorId = \`\${id}-error\`;

  return (
    <div>
      <label ___={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        ___={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="___">
          {error}
        </p>
      )}
    </div>
  );
}`}
              answer={`function FormField({ label, name, type = 'text', error }) {
  const id = \`field-\${name}\`;
  const errorId = \`\${id}-error\`;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}`}
              hints={[
                'React で label の for 属性を書くには htmlFor を使います',
                'エラー状態を伝える ARIA 属性は aria-invalid です',
                'スクリーンリーダーに即座に読み上げさせるロールは alert です',
              ]}
              keywords={['htmlFor', 'aria-invalid', 'role="alert"']}
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">HTML 構造: </strong>
                  form {'>'} fieldset {'>'} legend + label + input の正しい階層を守る
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">ラベル: </strong>
                  すべての入力に label を紐付ける。placeholder はラベルの代替にならない
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">バリデーション: </strong>
                  JS をメインに、ネイティブ属性もセマンティクスとして併用
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">エラー表示: </strong>
                  aria-describedby + role="alert" で支援技術に通知
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">React: </strong>
                  大規模フォームには React Hook Form が有効。非制御ベースで高パフォーマンス
                </p>
              </div>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
