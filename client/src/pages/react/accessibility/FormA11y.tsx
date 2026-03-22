import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';

export default function FormA11y() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 68</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Form のアクセシビリティ</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          フォームは Web で最もインタラクティブな要素であり、アクセシビリティ上の問題が最も起きやすい箇所です。
          ラベルの紐付け、エラーメッセージの伝達、キーボード操作、送信時の UX まで包括的に解説します。
        </p>

        <div className="space-y-12 mt-8">
          {/* セクション 1: 基本原則 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フォームアクセシビリティの基本原則</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              フォームのアクセシビリティは 4 つの原則に集約されます。
              (1) すべてのフィールドにプログラム的に紐付いたラベルがある、
              (2) エラーが明確に伝わる、(3) キーボードだけで全操作が完結する、
              (4) 状態変化が支援技術に通知される。これらが一つでも欠けると、
              スクリーンリーダーやキーボード操作のユーザーがフォームを正しく使えなくなります。
            </p>
          </section>

          {/* セクション 2: ラベルの必須性 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ラベルの必須性</h2>

            <CodeBlock
              language="html"
              title="label + for / aria-label / aria-labelledby"
              showLineNumbers
              code={`<!-- 方法 1: for 属性で id を指定（最も推奨） -->
<label for="email">メールアドレス</label>
<input type="email" id="email" name="email" />

<!-- 方法 2: label で input を囲む（暗黙的な紐付け） -->
<label>
  メールアドレス
  <input type="email" name="email" />
</label>

<!-- 方法 3: aria-label（視覚的ラベルがない場合） -->
<input type="search" aria-label="サイト内検索" placeholder="検索..." />

<!-- 方法 4: aria-labelledby（別の要素をラベルとして参照） -->
<h2 id="billing-title">請求先住所</h2>
<form aria-labelledby="billing-title">
  <label for="address">住所</label>
  <input type="text" id="address" name="address" />
</form>

<!-- 複数の要素をラベルにする -->
<span id="card-label">カード番号</span>
<span id="card-hint">（ハイフンなし 16 桁）</span>
<input type="text" aria-labelledby="card-label card-hint"
       inputmode="numeric" />`}
            />

            <InfoBox type="warning" title="placeholder はラベルの代替にならない">
              <p>
                <code>placeholder</code> は入力のヒントであり、ラベルの代わりにはなりません。
                入力を始めると消えるため、何を入力すべきか分からなくなります。
                多くのスクリーンリーダーは placeholder をラベルとして読み上げません。
                必ず <code>label</code> または <code>aria-label</code> と併用してください。
              </p>
            </InfoBox>
          </section>

          {/* セクション 3: エラーメッセージの伝達 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">エラーメッセージの伝達</h2>

            <CodePreview
              language="tsx"
              title="aria-describedby + aria-invalid によるエラー伝達"
              code={`function EmailField() {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');

  const validate = () => {
    if (!email) setError('メールアドレスは必須です');
    else if (!email.includes('@')) setError('有効なメールアドレスを入力してください');
    else setError('');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '400px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validate}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? 'email-error' : undefined}
          placeholder="example@mail.com"
          style={{ width: '100%', padding: '10px 12px', border: error ? '2px solid #ef4444' : '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: error ? '#fef2f2' : 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box', outline: 'none' }}
        />
        {error && (
          <p id="email-error" role="alert" style={{ margin: '6px 0 0', fontSize: '13px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span aria-hidden="true">&#9888;</span> {error}
          </p>
        )}
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
        フォーカスを外すとバリデーションが実行されます
      </p>
    </div>
  );
}`}
            />

            <CodeBlock
              language="tsx"
              title="aria-errormessage（新しい属性）"
              showLineNumbers
              code={`// aria-errormessage: aria-invalid="true" の時だけ読み上げられるエラー専用属性
// ただしスクリーンリーダー対応がまだ不完全な場合がある
// 確実を期すなら aria-describedby + role="alert" を推奨
<input
  type="password"
  id="password"
  aria-invalid={hasError ? 'true' : undefined}
  aria-errormessage={hasError ? 'password-error' : undefined}
/>`}
            />

            <div className="mt-4">
              <CodePreview
                language="tsx"
                title="エラーサマリー: フォーム上部にエラー一覧を表示"
                code={`function FormWithErrorSummary() {
  const [errors, setErrors] = React.useState({});
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name) newErrors.name = '名前は必須です';
    if (!email) newErrors.email = 'メールアドレスは必須です';
    setErrors(newErrors);
  };

  const errKeys = Object.keys(errors);

  return (
    <form onSubmit={handleSubmit} noValidate style={{ padding: '24px', maxWidth: '420px', fontFamily: 'system-ui, sans-serif' }}>
      {errKeys.length > 0 && (
        <div role="alert" tabIndex={-1} style={{ padding: '12px 16px', marginBottom: '20px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: '700', color: '#b91c1c' }}>
            {errKeys.length} 件のエラーがあります
          </h2>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {Object.entries(errors).map(([field, msg]) => (
              <li key={field} style={{ fontSize: '13px', marginBottom: '4px' }}>
                <a href={'#' + field} style={{ color: '#dc2626', textDecoration: 'underline' }}>{msg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>
          名前 <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input id="name" type="text" value={name} onChange={e => setName(e.target.value)}
          aria-invalid={errors.name ? 'true' : undefined}
          style={{ width: '100%', padding: '10px 12px', border: errors.name ? '2px solid #ef4444' : '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>
          メールアドレス <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
          aria-invalid={errors.email ? 'true' : undefined}
          style={{ width: '100%', padding: '10px 12px', border: errors.email ? '2px solid #ef4444' : '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box' }} />
      </div>
      <button type="submit" style={{ padding: '10px 24px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
        送信する
      </button>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '12px 0 0' }}>
        空欄のまま送信するとエラーサマリーが表示されます
      </p>
    </form>
  );
}`}
              />
            </div>

            <InfoBox type="info" title="エラーサマリーのポイント">
              <ul className="list-disc pl-4 space-y-1">
                <li><code>role="alert"</code> でスクリーンリーダーに即座に通知する</li>
                <li><code>tabIndex={'{-1}'}</code> + <code>focus()</code> でプログラム的にフォーカスを移動する</li>
                <li>各エラーからフィールドへのアンカーリンクで該当箇所にジャンプできるようにする</li>
              </ul>
            </InfoBox>
          </section>

          {/* セクション 4: 必須フィールド */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">必須フィールドの表現</h2>

            <CodePreview
              language="tsx"
              title="アクセシブルな必須フィールドの実装"
              code={`function RequiredFieldDemo() {
  return (
    <div style={{ padding: '24px', maxWidth: '420px', fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
        <span style={{ color: '#ef4444' }} aria-hidden="true">*</span> は必須項目です
      </p>

      {/* 良い例: required + aria-required + 視覚的な表示 */}
      <div style={{ marginBottom: '20px', padding: '16px', border: '1px solid #86efac', borderRadius: '8px', background: '#f0fdf4' }}>
        <p style={{ fontSize: '12px', fontWeight: '700', color: '#16a34a', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>良い例</p>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="fullname" style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>
            名前 <span style={{ color: '#ef4444' }} aria-hidden="true">*</span>
          </label>
          <input id="fullname" type="text" required aria-required="true" placeholder="山田 太郎"
            style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label htmlFor="company" style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>
            会社名 <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '400' }}>（任意）</span>
          </label>
          <input id="company" type="text" placeholder="株式会社サンプル"
            style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box' }} />
        </div>
      </div>

      {/* 悪い例 */}
      <div style={{ padding: '16px', border: '1px solid #fca5a5', borderRadius: '8px', background: '#fef2f2' }}>
        <p style={{ fontSize: '12px', fontWeight: '700', color: '#dc2626', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>悪い例</p>
        <div>
          <label htmlFor="phone" style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>
            電話番号 *
          </label>
          <input id="phone" type="tel"
            style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box' }} />
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#dc2626' }}>
            required / aria-required なし → スクリーンリーダーが必須を認識できない
          </p>
        </div>
      </div>
    </div>
  );
}`}
            />
          </section>

          {/* セクション 5: フィールドのグループ化 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フィールドのグループ化と説明テキスト</h2>

            <CodeBlock
              language="html"
              title="fieldset/legend とヒントテキストの紐付け"
              showLineNumbers
              code={`<!-- fieldset + legend でグループ化 -->
<fieldset>
  <legend>お届け先住所</legend>
  <label for="zip">郵便番号</label>
  <input type="text" id="zip" autocomplete="postal-code" />
  <label for="city">市区町村</label>
  <input type="text" id="city" autocomplete="address-level2" />
</fieldset>

<!-- ラジオボタンには fieldset/legend が必須 -->
<fieldset>
  <legend>お支払い方法</legend>
  <input type="radio" id="credit" name="payment" value="credit" />
  <label for="credit">クレジットカード</label>
  <input type="radio" id="bank" name="payment" value="bank" />
  <label for="bank">銀行振込</label>
</fieldset>

<!-- div ではスクリーンリーダーがグループを認識できない -->
<div class="address-group">
  <h3>お届け先住所</h3>  <!-- これは見出しであってグループ名ではない -->
  <label for="zip2">郵便番号</label>
  <input type="text" id="zip2" />
</div>

<!-- aria-describedby でヒントテキストを紐付け -->
<label for="username">ユーザー名</label>
<input type="text" id="username" aria-describedby="username-hint" />
<p id="username-hint">3〜20文字の半角英数字とアンダースコアが使用できます</p>`}
            />
          </section>

          {/* 理解度チェック 1 */}
          <section>
            <Quiz
              question="フォームフィールドのエラーをスクリーンリーダーに確実に伝えるための最も適切な組み合わせはどれですか？"
              options={[
                { label: 'エラーメッセージを赤色で表示するだけ' },
                { label: 'aria-invalid="true" と aria-describedby でエラーメッセージ要素を参照する', correct: true },
                { label: 'placeholder にエラーメッセージを表示する' },
                { label: 'title 属性にエラーメッセージを設定する' },
              ]}
              explanation="aria-invalid='true' はフィールドが無効であることを伝え、aria-describedby でエラーメッセージの id を参照するとフォーカス時にエラー内容が読み上げられます。色だけでは色覚制約のあるユーザーに伝わらず、placeholder は入力開始で消え、title はデフォルトで読み上げられません。"
            />
          </section>

          {/* セクション 6: よくあるフォームの課題 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">よくあるフォームの課題と問題点</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">placeholder 依存の危険性</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              placeholder をラベル代わりに使うパターンは多いですが、(1) 入力開始で消えてしまう、
              (2) デフォルトの薄いグレーが WCAG コントラスト比を満たさない、
              (3) ブラウザの自動翻訳が placeholder を翻訳しない場合がある、
              という理由から推奨されません。必ず label と併用してください。
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">disabled vs readonly の使い分け</h3>
            <CodeBlock
              language="html"
              title="disabled と readonly のアクセシビリティ上の違い"
              showLineNumbers
              code={`<!-- disabled: Tab で飛ばされる、スクリーンリーダーが読み飛ばす場合あり、
     フォーム送信時に値が含まれない -->
<input type="text" id="plan1" value="スタンダード" disabled />

<!-- readonly: Tab で到達、スクリーンリーダーが読み上げる、
     フォーム送信時に値が含まれる -->
<input type="text" id="plan2" value="スタンダード" readonly />

<!-- 使い分け:
  disabled → そのフィールドが現在無関係（条件分岐で無効化）
  readonly → 値を見せたいが変更は不可（確認画面など） -->`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">日付入力のクロスブラウザ問題と代替</h3>
            <CodeBlock
              language="html"
              title="アクセシブルな日付入力の代替パターン"
              showLineNumbers
              code={`<!-- パターン: 3 つの select に分割 -->
<fieldset>
  <legend>生年月日</legend>
  <label for="birth-year">年</label>
  <select id="birth-year" autocomplete="bday-year">
    <option value="">----</option>
  </select>
  <label for="birth-month">月</label>
  <select id="birth-month" autocomplete="bday-month">
    <option value="">--</option>
  </select>
  <label for="birth-day">日</label>
  <select id="birth-day" autocomplete="bday-day">
    <option value="">--</option>
  </select>
</fieldset>`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">カスタム select のアクセシビリティ</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ネイティブの <code>{'<select>'}</code> を独自ドロップダウンに置き換えると、
              キーボード操作やスクリーンリーダー対応が欠落しがちです。
              必要な ARIA 属性とキーボード操作を示します。
            </p>

            <CodeBlock
              language="tsx"
              title="カスタム select の最低要件"
              showLineNumbers
              code={`<label id="color-label">好きな色</label>
<div
  role="combobox"
  aria-expanded={isOpen}
  aria-haspopup="listbox"
  aria-labelledby="color-label"
  aria-controls="color-listbox"
  tabIndex={0}
  onKeyDown={handleKeyDown}
>
  <span>{selectedOption || '選択してください'}</span>
</div>
{isOpen && (
  <ul id="color-listbox" role="listbox" aria-labelledby="color-label">
    {options.map((opt, i) => (
      <li key={opt.value} role="option" aria-selected={selectedIndex === i}>
        {opt.label}
      </li>
    ))}
  </ul>
)}

{/* 必要なキーボード操作:
  Enter/Space: ドロップダウンの開閉
  上下矢印: 選択肢の移動
  Home/End: 最初/最後の選択肢に移動
  Escape: 閉じる
  文字キー: 一致する選択肢にジャンプ

  現実的な推奨: Radix UI / Headless UI / React Aria を使う */}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">ファイルアップロード・CAPTCHA</h3>
            <CodeBlock
              language="tsx"
              title="アクセシブルなカスタムファイルアップロード"
              showLineNumbers
              code={`function AccessibleFileUpload() {
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label htmlFor="file-upload">添付ファイル</label>
      {/* sr-only で視覚的に隠す（display:none だとフォーカス不可） */}
      <input
        type="file"
        id="file-upload"
        ref={inputRef}
        onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
        className="sr-only"
        accept=".pdf,.doc,.docx"
        aria-describedby="file-hint"
      />
      <button type="button" onClick={() => inputRef.current?.click()}>
        ファイルを選択
      </button>
      <span aria-live="polite">
        {fileName ? \`選択中: \${fileName}\` : 'ファイル未選択'}
      </span>
      <p id="file-hint">PDF, DOC, DOCX 形式（最大 5MB）</p>
    </div>
  );
}

// CAPTCHA のアクセシビリティ:
// - 画像 CAPTCHA: 視覚障害者は読めない。最もアクセシブルでない
// - reCAPTCHA v3: ユーザー操作不要で透過的。問題が最も少ない
// - Cloudflare Turnstile: 非対話型でプライバシーも良好
// - ハニーポット: 隠しフィールドでボット検知。操作不要でアクセシブル`}
            />
          </section>

          {/* コーディングチャレンジ 1 */}
          <section>
            <CodingChallenge
              preview={true}
              title="アクセシブルなフォームフィールドを作成"
              description="メールアドレスフィールドの ___ を埋めてください。label の紐付け、必須属性、エラー状態の ARIA 属性を設定します。"
              initialCode={`function App() {
  return (
    <div>
      <label ___="email">メールアドレス <span aria-hidden="true">*</span></label>
      <input
        type="email"
        id="email"
        name="email"
        required
        ___="true"
        aria-invalid="true"
        ___="email-hint email-error"
      />
      <p id="email-hint">確認メールを送信します</p>
      <p id="email-error" role="alert">有効なメールアドレスを入力してください</p>
    </div>
  );
}`}
              answer={`function App() {
  return (
    <div>
      <label for="email">メールアドレス <span aria-hidden="true">*</span></label>
      <input
        type="email"
        id="email"
        name="email"
        required
        aria-required="true"
        aria-invalid="true"
        aria-describedby="email-hint email-error"
      />
      <p id="email-hint">確認メールを送信します</p>
      <p id="email-error" role="alert">有効なメールアドレスを入力してください</p>
    </div>
  );
}`}
              keywords={['for=', 'aria-required', 'aria-describedby']}
              hints={[
                'label と input を紐付ける属性は for です（React では htmlFor）',
                '必須であることをスクリーンリーダーに伝える属性は aria-required です',
                '説明テキストを紐付ける属性は aria-describedby です',
              ]}
            />
          </section>

          {/* セクション 7: フォーム送信の UX */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フォーム送信の UX</h2>

            <CodePreview
              language="tsx"
              title="送信中の状態表示・フォーカス管理・ダブルサブミット防止"
              code={`function ContactForm() {
  const [status, setStatus] = React.useState('idle');
  const [name, setName] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus(name ? 'success' : 'error');
    }, 1500);
  };

  const handleReset = () => { setStatus('idle'); setName(''); };

  return (
    <form onSubmit={handleSubmit} aria-busy={status === 'submitting'} style={{ padding: '24px', maxWidth: '420px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="contact-name" style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>
          お名前
        </label>
        <input id="contact-name" type="text" value={name} onChange={e => setName(e.target.value)}
          disabled={status === 'submitting'}
          placeholder="名前を入力すると成功、空欄だとエラー"
          style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)', boxSizing: 'border-box', opacity: status === 'submitting' ? 0.6 : 1 }} />
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
        <button type="submit" disabled={status === 'submitting'} aria-disabled={status === 'submitting'}
          style={{ padding: '10px 24px', background: status === 'submitting' ? '#93c5fd' : '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: status === 'submitting' ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {status === 'submitting' && <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />}
          {status === 'submitting' ? '送信中...' : '送信する'}
        </button>
        {(status === 'success' || status === 'error') && (
          <button type="button" onClick={handleReset} style={{ padding: '10px 16px', background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
            リセット
          </button>
        )}
      </div>

      <div tabIndex={-1} role="status" aria-live="polite">
        {status === 'success' && (
          <div style={{ padding: '12px 16px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#16a34a', fontSize: '18px' }}>&#10003;</span>
            <p style={{ margin: 0, fontSize: '14px', color: '#15803d', fontWeight: '500' }}>お問い合わせを受け付けました。</p>
          </div>
        )}
        {status === 'error' && (
          <div role="alert" style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#dc2626', fontSize: '18px' }}>&#10007;</span>
            <p style={{ margin: 0, fontSize: '14px', color: '#b91c1c', fontWeight: '500' }}>送信に失敗しました。再度お試しください。</p>
          </div>
        )}
      </div>
      <style>{\`@keyframes spin { to { transform: rotate(360deg) } }\`}</style>
    </form>
  );
}`}
            />

            <InfoBox type="warning" title="disabled と aria-disabled の違い">
              <p>
                <code>disabled</code> はボタンをフォーカス不可にするため、
                キーボードユーザーが「送信中」を認識しにくくなります。
                <code>aria-disabled="true"</code> ならフォーカスは残りつつ操作を無効化できますが、
                クリックイベントは発火するため JavaScript 側で重複送信を防ぐ必要があります。
              </p>
            </InfoBox>
          </section>

          {/* セクション 8: 複雑なフォームパターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">複雑なフォームパターン</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">マルチステップフォーム</h3>
            <CodeBlock
              language="tsx"
              title="アクセシブルなマルチステップフォーム"
              showLineNumbers
              code={`function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const stepTitles = ['個人情報', 'お届け先', '確認'];

  return (
    <div>
      {/* 進捗インジケーター */}
      <nav aria-label="フォームの進捗">
        <ol>
          {stepTitles.map((title, i) => {
            const step = i + 1;
            return (
              <li key={step} aria-current={step === currentStep ? 'step' : undefined}>
                ステップ {step}: {title}
                {step < currentStep && <span className="sr-only">（完了）</span>}
                {step === currentStep && <span className="sr-only">（現在）</span>}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* ステップの内容 */}
      <div role="group"
           aria-label={\`ステップ \${currentStep} / 3: \${stepTitles[currentStep - 1]}\`}>
        <h2>ステップ {currentStep}: {stepTitles[currentStep - 1]}</h2>
        {/* フォームフィールド */}
      </div>

      <div>
        {currentStep > 1 && (
          <button type="button" onClick={() => setCurrentStep((s) => s - 1)}>
            前のステップに戻る
          </button>
        )}
        {currentStep < 3 ? (
          <button type="button" onClick={() => setCurrentStep((s) => s + 1)}>
            次のステップへ進む
          </button>
        ) : (
          <button type="submit">送信する</button>
        )}
      </div>
    </div>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">動的フィールドの追加/削除</h3>
            <CodeBlock
              language="tsx"
              title="動的フィールドのアクセシブルな管理"
              showLineNumbers
              code={`function DynamicPhoneFields() {
  const [phones, setPhones] = useState(['']);
  const lastInputRef = useRef<HTMLInputElement>(null);

  const addField = () => setPhones([...phones, '']);

  useEffect(() => {
    if (phones.length > 1) lastInputRef.current?.focus();
  }, [phones.length]);

  return (
    <fieldset>
      <legend>電話番号<span className="sr-only">（{phones.length} 件）</span></legend>
      {phones.map((phone, i) => (
        <div key={i} role="group" aria-label={\`電話番号 \${i + 1}\`}>
          <label htmlFor={\`phone-\${i}\`}>電話番号 {i + 1}</label>
          <input type="tel" id={\`phone-\${i}\`} value={phone}
                 ref={i === phones.length - 1 ? lastInputRef : undefined}
                 autocomplete="tel" onChange={/* ... */} />
          {phones.length > 1 && (
            <button type="button" aria-label={\`電話番号 \${i + 1} を削除\`}
                    onClick={() => setPhones(phones.filter((_, j) => j !== i))}>
              削除
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addField}>電話番号を追加</button>
      <div aria-live="polite" className="sr-only">電話番号は {phones.length} 件です</div>
    </fieldset>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">バリデーションのタイミング</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              リアルタイム（入力中）バリデーションは即座のフィードバックが利点ですが、
              入力途中にエラーが表示されて混乱やスクリーンリーダーの頻繁な読み上げの原因になります。
              推奨は <strong>onBlur（フォーカス移動時）+ 送信時</strong> の組み合わせです。
              フィールドからフォーカスが外れたときにバリデーションし、
              送信時に全フィールドを再チェックしてエラーサマリーを表示します。
              パスワード強度メーターや文字数カウンターのように、
              入力中のフィードバックが自然な場面でのみリアルタイムを使いましょう。
            </p>
          </section>

          {/* 理解度チェック 2 */}
          <section>
            <Quiz
              question="マルチステップフォームで現在のステップを支援技術に伝えるために最も適切な方法はどれですか？"
              options={[
                { label: '各ステップの背景色を変えて強調する' },
                { label: 'aria-current="step" で現在のステップをマークし、role="group" で各ステップの内容をグループ化する', correct: true },
                { label: 'JavaScript の alert() でステップ番号を表示する' },
                { label: 'title 属性にステップ番号を設定する' },
              ]}
              explanation="aria-current='step' は進捗インジケーター上で現在のステップを支援技術に明示的に伝えます。各ステップの内容を role='group' と aria-label でグループ化すれば、スクリーンリーダーユーザーも全体の中での位置を把握できます。視覚的な強調だけでは支援技術には伝わりません。"
            />
          </section>

          {/* セクション 9: autocomplete 属性 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">autocomplete 属性の正しい使い方</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code>autocomplete</code> を正しく設定すると、ブラウザの自動入力が適切に動作し、
              ユーザーの入力負担を大幅に軽減します。WCAG 2.1 の達成基準 1.3.5 でも要求されています。
            </p>

            <CodeBlock
              language="html"
              title="主要な autocomplete 値の使用例"
              showLineNumbers
              code={`<!-- 氏名 -->
<input type="text" id="name" autocomplete="name" />
<input type="text" id="family" autocomplete="family-name" />
<input type="text" id="given" autocomplete="given-name" />

<!-- 連絡先 -->
<input type="email" id="email" autocomplete="email" />
<input type="tel" id="tel" autocomplete="tel" />

<!-- 住所 -->
<input type="text" id="postal" autocomplete="postal-code" inputmode="numeric" />
<input type="text" id="addr1" autocomplete="address-level1" />
<input type="text" id="addr2" autocomplete="address-line1" />

<!-- クレジットカード -->
<input type="text" id="cc-name" autocomplete="cc-name" />
<input type="text" id="cc-number" autocomplete="cc-number" inputmode="numeric" />
<input type="text" id="cc-exp" autocomplete="cc-exp" placeholder="MM/YY" />
<input type="text" id="cc-csc" autocomplete="cc-csc" inputmode="numeric" />

<!-- ログイン / 新規登録 -->
<input type="text" id="user" autocomplete="username" />
<input type="password" id="pass" autocomplete="current-password" />
<input type="password" id="new-pass" autocomplete="new-password" />`}
            />

            <InfoBox type="info" title="autocomplete と認知アクセシビリティ">
              <p>
                autocomplete の恩恵はスクリーンリーダーユーザーだけのものではありません。
                認知障害や運動障害のあるユーザーにとって自動入力は入力負担を大きく軽減します。
                パスワードマネージャーが正しく動作するためにも
                <code>autocomplete="username"</code> と <code>autocomplete="current-password"</code> の設定は重要です。
              </p>
            </InfoBox>
          </section>

          {/* コーディングチャレンジ 2 */}
          <section>
            <CodingChallenge
              preview={true}
              title="マルチステップフォームの進捗インジケーターを実装"
              description="進捗インジケーターの ___ を埋めてください。現在のステップ（ステップ 2）に適切な ARIA 属性を設定します。"
              initialCode={`function App() {
  return (
    <nav aria-label="フォームの進捗">
      <ol>
        <li>
          ステップ 1: 個人情報
          <span class="sr-only">（完了）</span>
        </li>
        <li ___="___">
          ステップ 2: お届け先
        </li>
        <li>
          ステップ 3: 確認
        </li>
      </ol>
    </nav>
  );
}`}
              answer={`function App() {
  return (
    <nav aria-label="フォームの進捗">
      <ol>
        <li>
          ステップ 1: 個人情報
          <span class="sr-only">（完了）</span>
        </li>
        <li aria-current="step">
          ステップ 2: お届け先
        </li>
        <li>
          ステップ 3: 確認
        </li>
      </ol>
    </nav>
  );
}`}
              keywords={['aria-current="step"']}
              hints={[
                '現在のステップを示す ARIA 属性は aria-current で、値は "step" です',
              ]}
            />
          </section>

          {/* セクション 10: チェックリスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フォームアクセシビリティチェックリスト</h2>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">基本チェック</h3>
                <div className="space-y-2">
                  {[
                    'すべての入力フィールドに label が紐付いている',
                    'required / aria-required で必須を明示',
                    'エラーが aria-invalid + aria-describedby で伝わる',
                    'fieldset / legend で関連フィールドをグループ化',
                    'autocomplete 属性が適切に設定されている',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-border flex-shrink-0" />
                      <p className="text-sm text-foreground/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">UX チェック</h3>
                <div className="space-y-2">
                  {[
                    'Tab キーで全フィールドを順に移動できる',
                    '送信中の状態が aria-busy で通知される',
                    '送信結果にフォーカスが移動する',
                    'ダブルサブミットが防止されている',
                    'placeholder だけに依存していない',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-border flex-shrink-0" />
                      <p className="text-sm text-foreground/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <InfoBox type="success" title="テストを習慣にする">
              <p>
                フォームのアクセシビリティは「実装して終わり」ではありません。
                (1) キーボードだけで全操作を完了できるか試す、
                (2) スクリーンリーダー（VoiceOver, NVDA）で実際に操作する、
                (3) axe DevTools や Lighthouse でチェックする、
                の 3 段階テストを習慣にしましょう。
                特にカスタム UI コンポーネントはネイティブ要素と同等の操作性を必ず検証してください。
              </p>
            </InfoBox>
          </section>

          {/* 理解度チェック 3 */}
          <section>
            <Quiz
              question="カスタム select コンポーネントで必要なキーボード操作として正しいものはどれですか？"
              options={[
                { label: 'Tab キーで選択肢を1つずつ移動する' },
                { label: 'Ctrl + クリックで複数選択する' },
                { label: 'Enter/Space で開閉し、上下矢印キーで選択肢を移動する', correct: true },
                { label: 'F2 キーで編集モードに入る' },
              ]}
              explanation="WAI-ARIA の combobox / listbox パターンでは、Enter/Space でドロップダウンの開閉、上下矢印で選択肢間の移動、Escape で閉じる、Home/End で最初/最後へ、文字キーで一致する選択肢にジャンプが期待されます。Tab はフィールド間の移動に使うため、選択肢の移動には使いません。"
            />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
