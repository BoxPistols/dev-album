export interface TrainingChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  initialCode: string;
  answer: string;
  hints: string[];
  keywords: string[];
}

export const level4Challenges: TrainingChallenge[] = [
  // ─── 1. レスポンシブナビ（ハンバーガー） ───
  {
    id: 'l4-01',
    title: 'レスポンシブナビ（ハンバーガー）',
    description:
      'デスクトップでは横並びナビ、モバイル（幅600px未満）ではハンバーガーボタンとスライドダウンメニューを表示するナビゲーションを作成してください。useStateでメニューの開閉を管理します。',
    difficulty: 'hard',
    initialCode: `function App() {
  // TODO: useState でメニュー開閉と画面幅を管理
  // TODO: useEffect で resize イベントを監視
  return (
    <nav>
      {// ハンバーガーボタン（モバイル時のみ表示）}
      {// ナビリンク一覧}
    </nav>
  );
}`,
    answer: `function App() {
  const [open, setOpen] = React.useState(false);
  const [mobile, setMobile] = React.useState(window.innerWidth < 600);

  React.useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 600);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const links = ['Home', 'About', 'Services', 'Contact'];

  return (
    <nav style={{ background: '#1a1a2e', padding: '12px 20px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#e94560', fontWeight: 'bold', fontSize: 20 }}>Logo</span>
        {mobile ? (
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: 24,
              cursor: 'pointer',
            }}
          >
            {open ? '\\u2715' : '\\u2630'}
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 24 }}>
            {links.map((l) => (
              <a key={l} href="#" style={{ color: '#eee', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        )}
      </div>
      {mobile && open && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            padding: '12px 0',
            borderTop: '1px solid #333',
            marginTop: 12,
          }}
        >
          {links.map((l) => (
            <a key={l} href="#" style={{ color: '#eee', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}`,
    hints: [
      'useState を2つ使い、メニュー開閉(open)と画面幅判定(mobile)を管理します',
      'useEffect 内で window の resize イベントを監視し、600px 未満なら mobile を true にします',
      'mobile が true のときだけハンバーガーボタンを表示し、open が true のときメニューを展開します',
    ],
    keywords: [
      'useState',
      'useEffect',
      'resize',
      'innerWidth',
      'addEventListener',
      'removeEventListener',
      'flexDirection',
      'column',
      'onClick',
    ],
  },

  // ─── 2. ダークモード切替 ───
  {
    id: 'l4-02',
    title: 'ダークモード切替',
    description:
      'トグルボタンでライト／ダークテーマを切り替えるUIを作成してください。useStateでテーマを管理し、ラッパーdivの背景色・文字色をインラインスタイルで切り替えます。',
    difficulty: 'medium',
    initialCode: `function App() {
  // TODO: useState でダークモードを管理
  return (
    <div>
      {// テーマ切り替えボタン}
      {// コンテンツ}
    </div>
  );
}`,
    answer: `function App() {
  const [dark, setDark] = React.useState(false);

  const theme = dark
    ? { bg: '#1a1a2e', text: '#e0e0e0', card: '#16213e', accent: '#e94560' }
    : { bg: '#f5f5f5', text: '#222', card: '#fff', accent: '#0f3460' };

  return (
    <div
      style={{
        background: theme.bg,
        color: theme.text,
        minHeight: '100vh',
        padding: 32,
        transition: 'background 0.3s, color 0.3s',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <button
          onClick={() => setDark(!dark)}
          style={{
            padding: '8px 20px',
            borderRadius: 20,
            border: 'none',
            background: theme.accent,
            color: '#fff',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      {['Card A', 'Card B', 'Card C'].map((c) => (
        <div
          key={c}
          style={{
            background: theme.card,
            padding: 20,
            borderRadius: 8,
            marginBottom: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'background 0.3s',
          }}
        >
          {c}
        </div>
      ))}
    </div>
  );
}`,
    hints: [
      'useState(false) でダークモードの ON/OFF を管理します',
      'dark の値に応じて背景色・文字色・カード色を切り替えるテーマオブジェクトを作ります',
      'transition プロパティを使うとスムーズにテーマが切り替わります',
    ],
    keywords: [
      'useState',
      'onClick',
      'background',
      'color',
      'transition',
      'dark',
      'light',
      'theme',
    ],
  },

  // ─── 3. フォーム + バリデーション ───
  {
    id: 'l4-03',
    title: 'フォーム + バリデーション',
    description:
      '名前・メール・パスワードの入力フォームを作成してください。各フィールドにインラインバリデーションを付け、エラーメッセージを表示します。全項目が有効になるまで送信ボタンを無効化してください。',
    difficulty: 'hard',
    initialCode: `function App() {
  // TODO: useState でフォーム値とエラーを管理
  // TODO: バリデーション関数を作成
  return (
    <form>
      {// 名前、メール、パスワードの入力欄}
      {// エラーメッセージ}
      {// 送信ボタン}
    </form>
  );
}`,
    answer: `function App() {
  const [values, setValues] = React.useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const validate = (field, value) => {
    if (field === 'name') return value.trim().length < 2 ? '名前は2文字以上で入力してください' : '';
    if (field === 'email') return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value) ? '' : '有効なメールアドレスを入力してください';
    if (field === 'password') return value.length < 6 ? 'パスワードは6文字以上で入力してください' : '';
    return '';
  };

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, [field]: val }));
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validate(field, val) }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(field, values[field]) }));
  };

  const isValid =
    values.name.trim().length >= 2 &&
    /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email) &&
    values.password.length >= 6;

  const fieldStyle = (field) => ({
    width: '100%',
    padding: '10px 12px',
    fontSize: 14,
    border: errors[field] ? '2px solid #e94560' : '2px solid #ccc',
    borderRadius: 6,
    outline: 'none',
    boxSizing: 'border-box',
  });

  const fields = [
    { key: 'name', label: '名前', type: 'text' },
    { key: 'email', label: 'メール', type: 'email' },
    { key: 'password', label: 'パスワード', type: 'password' },
  ];

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>アカウント登録</h2>
      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {fields.map((f) => (
          <div key={f.key}>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold', fontSize: 14 }}>{f.label}</label>
            <input
              type={f.type}
              value={values[f.key]}
              onChange={handleChange(f.key)}
              onBlur={handleBlur(f.key)}
              style={fieldStyle(f.key)}
            />
            {touched[f.key] && errors[f.key] && (
              <p style={{ color: '#e94560', fontSize: 12, margin: '4px 0 0' }}>{errors[f.key]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={!isValid}
          style={{
            padding: '12px 0',
            borderRadius: 6,
            border: 'none',
            background: isValid ? '#0f3460' : '#aaa',
            color: '#fff',
            fontSize: 16,
            cursor: isValid ? 'pointer' : 'not-allowed',
          }}
        >
          登録する
        </button>
      </form>
    </div>
  );
}`,
    hints: [
      'useState を3つ使い、入力値(values)・エラー(errors)・タッチ済み(touched)を管理します',
      'onBlur 時にバリデーションを実行し、touched フラグを立てます。touched なフィールドのみエラーを表示します',
      '全フィールドのバリデーションが通る場合のみ isValid を true にし、ボタンの disabled を制御します',
    ],
    keywords: [
      'useState',
      'onChange',
      'onBlur',
      'validate',
      'disabled',
      'email',
      'password',
      'error',
      'touched',
    ],
  },

  // ─── 4. テーブルの横スクロール ───
  {
    id: 'l4-04',
    title: 'テーブルの横スクロール',
    description:
      '8列の幅広テーブルをスクロール可能なラッパーで囲み、左右にグラデーションのシャドウインジケーターを表示してください。スクロール位置に応じてシャドウの表示を制御します。',
    difficulty: 'medium',
    initialCode: `function App() {
  // TODO: スクロール可能なテーブルラッパーを作成
  // TODO: グラデーションシャドウを表示
  return (
    <div>
      {// テーブルラッパー}
      {// テーブル}
    </div>
  );
}`,
    answer: `function App() {
  const ref = React.useRef(null);
  const [scroll, setScroll] = React.useState({ left: false, right: true });

  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;
    setScroll({
      left: el.scrollLeft > 0,
      right: el.scrollLeft < el.scrollWidth - el.clientWidth - 1,
    });
  };

  const cols = ['ID', '名前', 'メール', '部署', '役職', '入社日', '電話番号', 'ステータス'];
  const rows = Array.from({ length: 6 }, (_, i) => [
    i + 1,
    '社員 ' + (i + 1),
    'user' + (i + 1) + '@example.com',
    '開発部',
    'エンジニア',
    '2024-01-0' + (i + 1),
    '090-0000-000' + i,
    i % 2 === 0 ? '在籍' : '休職',
  ]);

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif', position: 'relative' }}>
      <h2 style={{ marginBottom: 16 }}>社員一覧</h2>
      {scroll.left && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 56,
            bottom: 0,
            width: 30,
            background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
      {scroll.right && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 56,
            bottom: 0,
            width: 30,
            background: 'linear-gradient(to left, rgba(0,0,0,0.1), transparent)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
      <div
        ref={ref}
        onScroll={handleScroll}
        style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid #ddd' }}
      >
        <table style={{ width: 1000, borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              {cols.map((c) => (
                <th
                  key={c}
                  style={{
                    padding: '10px 14px',
                    textAlign: 'left',
                    background: '#0f3460',
                    color: '#fff',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '10px 14px', whiteSpace: 'nowrap', borderBottom: '1px solid #eee' }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,
    hints: [
      'useRef でスクロールコンテナを参照し、onScroll でスクロール位置を監視します',
      'scrollLeft が 0 より大きければ左シャドウ、scrollWidth - clientWidth より小さければ右シャドウを表示します',
      'シャドウは position: absolute + linear-gradient + pointerEvents: none で実装します',
    ],
    keywords: [
      'useRef',
      'onScroll',
      'scrollLeft',
      'scrollWidth',
      'overflowX',
      'auto',
      'linear-gradient',
      'pointerEvents',
      'none',
    ],
  },

  // ─── 5. モーダル + backdrop ───
  {
    id: 'l4-05',
    title: 'モーダル + backdrop',
    description:
      'ボタンクリックでモーダルを表示してください。半透明のbackdropをクリックするか、右上のXボタンでモーダルを閉じられるようにします。',
    difficulty: 'medium',
    initialCode: `function App() {
  // TODO: useState でモーダルの開閉を管理
  return (
    <div>
      {// モーダルを開くボタン}
      {// モーダル + backdrop}
    </div>
  );
}`,
    answer: `function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 40, textAlign: 'center' }}>
      <h2>モーダルデモ</h2>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: '12px 32px',
          fontSize: 16,
          border: 'none',
          borderRadius: 6,
          background: '#0f3460',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        モーダルを開く
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 32,
              width: 400,
              maxWidth: '90%',
              position: 'relative',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'none',
                border: 'none',
                fontSize: 20,
                cursor: 'pointer',
                color: '#666',
              }}
            >
              \\u2715
            </button>
            <h3 style={{ margin: '0 0 12px' }}>確認ダイアログ</h3>
            <p style={{ color: '#555', lineHeight: 1.6, marginBottom: 20 }}>
              この操作を実行してもよろしいですか？この変更は取り消せません。
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setOpen(false)}
                style={{ padding: '8px 20px', borderRadius: 6, border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}
              >
                キャンセル
              </button>
              <button
                onClick={() => setOpen(false)}
                style={{ padding: '8px 20px', borderRadius: 6, border: 'none', background: '#e94560', color: '#fff', cursor: 'pointer' }}
              >
                実行する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`,
    hints: [
      'useState(false) でモーダルの表示・非表示を管理します',
      'backdrop の onClick で setOpen(false) を呼び、モーダル本体には e.stopPropagation() で伝播を止めます',
      'position: fixed + top/left/right/bottom: 0 で全画面の backdrop を作ります',
    ],
    keywords: [
      'useState',
      'onClick',
      'stopPropagation',
      'position',
      'fixed',
      'rgba',
      'zIndex',
      'alignItems',
      'center',
    ],
  },

  // ─── 6. ステッパー（マルチステップ） ───
  {
    id: 'l4-06',
    title: 'ステッパー（マルチステップ）',
    description:
      '3ステップの進捗インジケーターを作成してください。円形のステップアイコンを線で繋ぎ、Next/Backボタンで進行を制御します。現在・完了・未完了でスタイルを切り替えてください。',
    difficulty: 'hard',
    initialCode: `function App() {
  // TODO: useState で現在のステップを管理
  // TODO: ステップ表示とナビゲーション
  return (
    <div>
      {// ステップインジケーター}
      {// ステップ内容}
      {// Next / Back ボタン}
    </div>
  );
}`,
    answer: `function App() {
  const [step, setStep] = React.useState(0);
  const steps = [
    { label: '個人情報', content: '名前・生年月日・電話番号を入力してください。' },
    { label: '住所', content: '郵便番号・都道府県・市区町村・番地を入力してください。' },
    { label: '確認', content: '入力内容を確認して送信してください。' },
  ];

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: 14,
                  background: i <= step ? '#0f3460' : '#ddd',
                  color: i <= step ? '#fff' : '#888',
                  transition: 'background 0.3s, color 0.3s',
                }}
              >
                {i < step ? '\\u2713' : i + 1}
              </div>
              <span
                style={{
                  fontSize: 12,
                  marginTop: 6,
                  color: i <= step ? '#0f3460' : '#999',
                  fontWeight: i === step ? 'bold' : 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 3,
                  background: i < step ? '#0f3460' : '#ddd',
                  margin: '0 8px',
                  marginBottom: 24,
                  borderRadius: 2,
                  transition: 'background 0.3s',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div
        style={{
          background: '#f9f9f9',
          padding: 24,
          borderRadius: 8,
          textAlign: 'center',
          minHeight: 80,
          marginBottom: 24,
        }}
      >
        <h3 style={{ margin: '0 0 8px' }}>{steps[step].label}</h3>
        <p style={{ color: '#555', margin: 0 }}>{steps[step].content}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          style={{
            padding: '10px 24px',
            borderRadius: 6,
            border: '1px solid #ccc',
            background: step === 0 ? '#eee' : '#fff',
            cursor: step === 0 ? 'not-allowed' : 'pointer',
            fontSize: 14,
          }}
        >
          Back
        </button>
        <button
          onClick={() => setStep(step + 1)}
          disabled={step === steps.length - 1}
          style={{
            padding: '10px 24px',
            borderRadius: 6,
            border: 'none',
            background: step === steps.length - 1 ? '#aaa' : '#0f3460',
            color: '#fff',
            cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer',
            fontSize: 14,
          }}
        >
          {step === steps.length - 1 ? '送信' : 'Next'}
        </button>
      </div>
    </div>
  );
}`,
    hints: [
      'useState(0) で現在のステップ番号を管理し、Next/Back で +1/-1 します',
      'ステップ円の間に flex: 1 の div を挟んで接続線を作ります。完了済みなら色を変えます',
      'i < step なら完了（チェックマーク）、i === step なら現在（アクティブ色）、i > step なら未完了（グレー）に分岐します',
    ],
    keywords: [
      'useState',
      'Fragment',
      'borderRadius',
      '50%',
      'flex',
      'disabled',
      'transition',
      'step',
      'onClick',
    ],
  },

  // ─── 7. 検索フィルター ───
  {
    id: 'l4-07',
    title: '検索フィルター',
    description:
      '10件のアイテムリストと検索入力欄を作成してください。入力に応じてリアルタイムでリストをフィルタリングし、マッチ部分をハイライト表示してください。',
    difficulty: 'medium',
    initialCode: `function App() {
  // TODO: useState で検索クエリを管理
  // TODO: フィルタリングロジック
  return (
    <div>
      {// 検索入力欄}
      {// フィルタ済みリスト}
    </div>
  );
}`,
    answer: `function App() {
  const [query, setQuery] = React.useState('');

  const items = [
    'React フレームワーク',
    'Next.js サーバーサイドレンダリング',
    'TypeScript 型安全',
    'Tailwind CSS ユーティリティ',
    'Material UI コンポーネント',
    'Storybook ビジュアルテスト',
    'Vite ビルドツール',
    'ESLint コード品質',
    'Prettier コードフォーマット',
    'Jest ユニットテスト',
  ];

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const highlight = (text) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      React.createElement(React.Fragment, null,
        text.slice(0, idx),
        React.createElement('span', { style: { background: '#ffe066', padding: '0 2px', borderRadius: 2 } }, text.slice(idx, idx + query.length)),
        text.slice(idx + query.length)
      )
    );
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: 16 }}>技術スタック検索</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="キーワードを入力..."
        style={{
          width: '100%',
          padding: '10px 14px',
          fontSize: 14,
          border: '2px solid #ddd',
          borderRadius: 8,
          outline: 'none',
          boxSizing: 'border-box',
          marginBottom: 16,
        }}
      />
      <p style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>{filtered.length} 件の結果</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filtered.map((item) => (
          <li
            key={item}
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #eee',
              fontSize: 14,
            }}
          >
            {highlight(item)}
          </li>
        ))}
        {filtered.length === 0 && (
          <li style={{ padding: 20, textAlign: 'center', color: '#999' }}>該当する項目がありません</li>
        )}
      </ul>
    </div>
  );
}`,
    hints: [
      'useState で検索クエリを管理し、onChange でリアルタイム更新します',
      'filter + toLowerCase().includes() でアイテムを絞り込みます',
      'indexOf でマッチ位置を見つけ、slice で前・マッチ・後に分割してハイライト用 span を挿入します',
    ],
    keywords: [
      'useState',
      'onChange',
      'filter',
      'includes',
      'toLowerCase',
      'indexOf',
      'slice',
      'highlight',
      'placeholder',
    ],
  },

  // ─── 8. 無限スクロール風リスト ───
  {
    id: 'l4-08',
    title: '無限スクロール風リスト',
    description:
      '最初に10件のアイテムを表示し、「もっと見る」ボタンで10件ずつ追加表示するリストを作成してください。useStateの配列で管理し、ローディング状態も表現してください。',
    difficulty: 'hard',
    initialCode: `function App() {
  // TODO: useState でアイテムリストとページを管理
  // TODO: もっと見るボタンで追加読み込み
  return (
    <div>
      {// アイテムリスト}
      {// もっと見るボタン}
    </div>
  );
}`,
    answer: `function App() {
  const generateItems = (start, count) =>
    Array.from({ length: count }, (_, i) => ({
      id: start + i,
      title: '記事タイトル #' + (start + i),
      excerpt: 'これはアイテム ' + (start + i) + ' の概要テキストです。ここに本文の一部が表示されます。',
    }));

  const [items, setItems] = React.useState(generateItems(1, 10));
  const [loading, setLoading] = React.useState(false);
  const total = 50;

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => [...prev, ...generateItems(prev.length + 1, 10)]);
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: 16 }}>ニュースフィード</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: 16,
              background: '#fff',
              borderRadius: 8,
              border: '1px solid #eee',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <h4 style={{ margin: '0 0 6px', color: '#0f3460' }}>{item.title}</h4>
            <p style={{ margin: 0, fontSize: 13, color: '#666', lineHeight: 1.5 }}>{item.excerpt}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        {items.length < total ? (
          <button
            onClick={loadMore}
            disabled={loading}
            style={{
              padding: '12px 32px',
              fontSize: 14,
              border: 'none',
              borderRadius: 6,
              background: loading ? '#aaa' : '#0f3460',
              color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? '読み込み中...' : 'もっと見る'}
          </button>
        ) : (
          <p style={{ color: '#999', fontSize: 13 }}>全ての記事を表示しました</p>
        )}
        <p style={{ fontSize: 12, color: '#bbb', marginTop: 8 }}>
          {items.length} / {total} 件表示中
        </p>
      </div>
    </div>
  );
}`,
    hints: [
      'useState で items 配列と loading 状態を管理します。初期値は generateItems で10件生成します',
      'loadMore 関数では setLoading(true) → setTimeout で遅延 → スプレッド構文で既存配列に追記 → setLoading(false) とします',
      'items.length が total に達したら「もっと見る」ボタンの代わりに完了メッセージを表示します',
    ],
    keywords: [
      'useState',
      'setTimeout',
      'setLoading',
      'loadMore',
      'disabled',
      'Array.from',
      'spread',
      'prev',
      'length',
    ],
  },

  // ─── 9. ドラッグ＆ドロップファイルアップロード ───
  {
    id: 'l4-09',
    title: 'ドラッグ＆ドロップファイルアップロード',
    description:
      '破線ボーダーのドロップゾーンを作成してください。ドラッグ中はスタイルが変わり、ドロップしたファイル名を一覧表示します（実際のアップロードは不要、表示のみ）。',
    difficulty: 'medium',
    initialCode: `function App() {
  // TODO: useState でドラッグ状態とファイル一覧を管理
  // TODO: onDragOver, onDragLeave, onDrop イベント
  return (
    <div>
      {// ドロップゾーン}
      {// ファイル一覧}
    </div>
  );
}`,
    answer: `function App() {
  const [dragging, setDragging] = React.useState(false);
  const [files, setFiles] = React.useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files).map((f) => ({
      name: f.name,
      size: (f.size / 1024).toFixed(1) + ' KB',
      type: f.type || 'unknown',
    }));
    setFiles((prev) => [...prev, ...dropped]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: 16 }}>ファイルアップロード</h2>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragging ? '3px solid #0f3460' : '3px dashed #ccc',
          borderRadius: 12,
          padding: 40,
          textAlign: 'center',
          background: dragging ? '#e8f0fe' : '#fafafa',
          transition: 'all 0.2s',
          cursor: 'pointer',
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>{dragging ? '\\uD83D\\uDCE5' : '\\uD83D\\uDCC1'}</div>
        <p style={{ color: '#666', margin: 0 }}>
          {dragging ? 'ここにドロップしてください' : 'ファイルをドラッグ＆ドロップ'}
        </p>
      </div>
      {files.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>{files.length} 件のファイル</p>
          {files.map((f, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: 6,
                marginBottom: 6,
                fontSize: 13,
              }}
            >
              <div>
                <strong>{f.name}</strong>
                <span style={{ color: '#999', marginLeft: 8 }}>{f.size}</span>
              </div>
              <button
                onClick={() => removeFile(i)}
                style={{ background: 'none', border: 'none', color: '#e94560', cursor: 'pointer', fontSize: 16 }}
              >
                \\u2715
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`,
    hints: [
      'onDragOver で e.preventDefault() を呼ばないとドロップが無効化されるので必須です',
      'onDrop で e.dataTransfer.files からファイル情報を取得し、useState の配列に追加します',
      'dragging 状態に応じてボーダーを dashed から solid に変え、背景色も変更してフィードバックを示します',
    ],
    keywords: [
      'useState',
      'onDragOver',
      'onDragLeave',
      'onDrop',
      'preventDefault',
      'dataTransfer',
      'files',
      'dashed',
      'solid',
    ],
  },

  // ─── 10. レスポンシブカードグリッド ───
  {
    id: 'l4-10',
    title: 'レスポンシブカードグリッド',
    description:
      'CSS Grid の auto-fill + minmax を使い、モバイルで1列、タブレットで2列、デスクトップで3列に自動で切り替わるカードグリッドを作成してください。',
    difficulty: 'easy',
    initialCode: `function App() {
  // TODO: CSS Grid で auto-fill + minmax を使ったカードグリッド
  return (
    <div>
      {// カードグリッド}
    </div>
  );
}`,
    answer: `function App() {
  const cards = [
    { title: 'React', desc: 'ユーザーインターフェース構築のためのJavaScriptライブラリ', color: '#61dafb' },
    { title: 'Next.js', desc: 'React フレームワークでSSR/SSGをサポート', color: '#000' },
    { title: 'TypeScript', desc: '型安全なJavaScriptのスーパーセット', color: '#3178c6' },
    { title: 'Tailwind', desc: 'ユーティリティファーストのCSSフレームワーク', color: '#38bdf8' },
    { title: 'Material UI', desc: 'Google Material Designベースのコンポーネント', color: '#1976d2' },
    { title: 'Vite', desc: '高速な次世代フロントエンドビルドツール', color: '#646cff' },
  ];

  return (
    <div style={{ padding: 32, fontFamily: 'sans-serif', maxWidth: 960, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 24, textAlign: 'center' }}>技術スタック</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 20,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              background: '#fff',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            <div style={{ height: 8, background: card.color }} />
            <div style={{ padding: 20 }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>{card.title}</h3>
              <p style={{ margin: 0, fontSize: 14, color: '#666', lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    hints: [
      'gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" で自動的にカラム数が調整されます',
      'auto-fill は利用可能なスペースに応じてカラムを繰り返し、minmax で最小260px・最大1frを指定します',
      'gap プロパティでカード間のスペースを均等に設定します',
    ],
    keywords: [
      'display',
      'grid',
      'gridTemplateColumns',
      'repeat',
      'auto-fill',
      'minmax',
      'gap',
      '1fr',
    ],
  },
];
