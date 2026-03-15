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

export const level2Challenges: TrainingChallenge[] = [
  // ─── 1. アバター + ステータスバッジ (easy) ───
  {
    id: 'l2-01',
    title: 'アバター + ステータスバッジ',
    description:
      '丸いアバター画像の右下に、オンライン状態を示す小さな緑色のバッジを重ねて表示してください。',
    difficulty: 'easy',
    initialCode: `function App() {
  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--bg-muted)' }}>
        {/* ここにステータスバッジを追加 */}
      </div>
    </div>
  );
}`,
    answer: `function App() {
  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 64, height: 64 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--bg-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            fontSize: 24,
          }}
        >
          A
        </div>
        <span
          style={{
            position: 'absolute',
            bottom: 2,
            right: 2,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#22c55e',
            border: '2px solid var(--bg)',
          }}
        />
      </div>
    </div>
  );
}`,
    hints: [
      '親要素に position: relative を設定する',
      'バッジに position: absolute と bottom / right を指定する',
      'border で背景色との区切りを付けると見栄えが良い',
    ],
    keywords: ['position', 'relative', 'absolute', 'borderRadius', 'bottom', 'right'],
  },

  // ─── 2. タブ切り替え (medium) ───
  {
    id: 'l2-02',
    title: 'タブ切り替え',
    description:
      '3 つのタブ（タブ1 / タブ2 / タブ3）を作り、クリックでアクティブ状態とコンテンツを切り替えてください。',
    difficulty: 'medium',
    initialCode: `function App() {
  const tabs = ['タブ1', 'タブ2', 'タブ3'];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', gap: 0 }}>
        {tabs.map((tab) => (
          <button key={tab} style={{ padding: '8px 20px' }}>
            {tab}
          </button>
        ))}
      </div>
      <div style={{ padding: 16 }}>コンテンツがここに表示される</div>
    </div>
  );
}`,
    answer: `function App() {
  const [active, setActive] = React.useState(0);
  const tabs = ['タブ1', 'タブ2', 'タブ3'];
  const contents = [
    'タブ1のコンテンツです。ここに最初のセクションの情報を表示します。',
    'タブ2のコンテンツです。二番目のセクションの情報が入ります。',
    'タブ3のコンテンツです。三番目のセクションの情報が入ります。',
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', borderBottom: '2px solid var(--border)' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            style={{
              padding: '10px 24px',
              background: 'none',
              border: 'none',
              borderBottom: active === i ? '2px solid var(--text)' : '2px solid transparent',
              color: active === i ? 'var(--text)' : 'var(--text-muted)',
              fontWeight: active === i ? 700 : 400,
              cursor: 'pointer',
              marginBottom: -2,
              fontSize: 14,
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={{ padding: 20, color: 'var(--text)', lineHeight: 1.6 }}>
        {contents[active]}
      </div>
    </div>
  );
}`,
    hints: [
      'useState でアクティブなタブのインデックスを管理する',
      'アクティブタブに borderBottom を付けて強調する',
      'marginBottom: -2 でタブの下線と親の borderBottom を重ねる',
    ],
    keywords: ['useState', 'onClick', 'borderBottom', 'active', 'cursor', 'fontWeight'],
  },

  // ─── 3. ドロップダウンメニュー (medium) ───
  {
    id: 'l2-03',
    title: 'ドロップダウンメニュー',
    description:
      'ボタンをクリックすると下にメニューリストが表示・非表示されるドロップダウンを作ってください。',
    difficulty: 'medium',
    initialCode: `function App() {
  const items = ['プロフィール', '設定', 'ログアウト'];

  return (
    <div style={{ padding: 40 }}>
      <button style={{ padding: '8px 16px' }}>メニュー ▼</button>
      {/* ドロップダウンリストをここに追加 */}
    </div>
  );
}`,
    answer: `function App() {
  const [open, setOpen] = React.useState(false);
  const items = ['プロフィール', '設定', 'ログアウト'];

  return (
    <div style={{ padding: 40 }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            padding: '8px 20px',
            background: 'var(--bg-accent)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          メニュー {open ? '▲' : '▼'}
        </button>
        {open && (
          <ul
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: 4,
              padding: '4px 0',
              listStyle: 'none',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              minWidth: 160,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 10,
            }}
          >
            {items.map((item) => (
              <li
                key={item}
                style={{
                  padding: '8px 16px',
                  cursor: 'pointer',
                  color: 'var(--text)',
                  fontSize: 14,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-muted)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}`,
    hints: [
      'useState で開閉状態を管理する',
      'メニューは position: absolute で配置し、親を position: relative にする',
      'boxShadow で浮き上がって見える効果を付ける',
    ],
    keywords: ['useState', 'position', 'absolute', 'relative', 'boxShadow', 'zIndex'],
  },

  // ─── 4. パンくずリスト (easy) ───
  {
    id: 'l2-04',
    title: 'パンくずリスト',
    description:
      '「ホーム > カテゴリ > 商品名」のようなパンくずリストを flex レイアウトで作ってください。',
    difficulty: 'easy',
    initialCode: `function App() {
  const crumbs = ['ホーム', 'カテゴリ', '商品名'];

  return (
    <div style={{ padding: 24 }}>
      {/* パンくずリストを実装 */}
      {crumbs.map((c) => (
        <span key={c}>{c}</span>
      ))}
    </div>
  );
}`,
    answer: `function App() {
  const crumbs = ['ホーム', 'カテゴリ', '商品名'];

  return (
    <div style={{ padding: 24 }}>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
        }}
      >
        {crumbs.map((crumb, i) => (
          <React.Fragment key={crumb}>
            {i > 0 && (
              <span style={{ color: 'var(--text-muted)' }}>&gt;</span>
            )}
            <span
              style={{
                color: i < crumbs.length - 1 ? 'var(--text-muted)' : 'var(--text)',
                fontWeight: i === crumbs.length - 1 ? 600 : 400,
                cursor: i < crumbs.length - 1 ? 'pointer' : 'default',
                textDecoration: i < crumbs.length - 1 ? 'underline' : 'none',
              }}
            >
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}`,
    hints: [
      'display: flex と gap で横並びにする',
      '区切り文字 > を各アイテム間に挿入する（最初の要素以外）',
      '最後の要素だけスタイルを変えて現在地を示す',
    ],
    keywords: ['display', 'flex', 'gap', 'Fragment', 'textDecoration', 'fontWeight'],
  },

  // ─── 5. 価格テーブル (hard) ───
  {
    id: 'l2-05',
    title: '価格テーブル',
    description:
      'Free / Pro / Enterprise の3つの価格カードを横並びで表示してください。中央の Pro カードを強調表示します。',
    difficulty: 'hard',
    initialCode: `function App() {
  const plans = [
    { name: 'Free', price: '¥0', features: ['1プロジェクト', '1GBストレージ', 'メールサポート'] },
    { name: 'Pro', price: '¥1,980', features: ['10プロジェクト', '50GBストレージ', '優先サポート', 'API連携'] },
    { name: 'Enterprise', price: '¥9,800', features: ['無制限', '1TBストレージ', '24/7サポート', 'API連携', 'SSO'] },
  ];

  return (
    <div style={{ padding: 24 }}>
      {plans.map((plan) => (
        <div key={plan.name}>
          <h3>{plan.name}</h3>
          <p>{plan.price}/月</p>
          <ul>
            {plan.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}`,
    answer: `function App() {
  const plans = [
    { name: 'Free', price: '¥0', features: ['1プロジェクト', '1GBストレージ', 'メールサポート'] },
    { name: 'Pro', price: '¥1,980', features: ['10プロジェクト', '50GBストレージ', '優先サポート', 'API連携'], highlighted: true },
    { name: 'Enterprise', price: '¥9,800', features: ['無制限', '1TBストレージ', '24/7サポート', 'API連携', 'SSO'] },
  ];

  return (
    <div
      style={{
        padding: 24,
        display: 'flex',
        gap: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {plans.map((plan) => (
        <div
          key={plan.name}
          style={{
            border: plan.highlighted ? '2px solid #3b82f6' : '1px solid var(--border)',
            borderRadius: 12,
            padding: 28,
            width: 220,
            background: plan.highlighted ? 'var(--bg-accent)' : 'var(--bg)',
            transform: plan.highlighted ? 'scale(1.05)' : 'none',
            boxShadow: plan.highlighted ? '0 8px 24px rgba(59,130,246,0.18)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {plan.highlighted && (
            <span
              style={{
                background: '#3b82f6',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 10px',
                borderRadius: 9999,
                marginBottom: 8,
              }}
            >
              おすすめ
            </span>
          )}
          <h3
            style={{
              margin: '0 0 4px',
              fontSize: 20,
              color: 'var(--text)',
            }}
          >
            {plan.name}
          </h3>
          <p
            style={{
              fontSize: 28,
              fontWeight: 700,
              margin: '8px 0 4px',
              color: 'var(--text)',
            }}
          >
            {plan.price}
            <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-muted)' }}>/月</span>
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '16px 0',
              width: '100%',
            }}
          >
            {plan.features.map((f) => (
              <li
                key={f}
                style={{
                  padding: '6px 0',
                  fontSize: 13,
                  color: 'var(--text-muted)',
                  borderBottom: '1px solid var(--border)',
                  textAlign: 'center',
                }}
              >
                {f}
              </li>
            ))}
          </ul>
          <button
            style={{
              marginTop: 'auto',
              padding: '10px 28px',
              border: plan.highlighted ? 'none' : '1px solid var(--border)',
              borderRadius: 6,
              background: plan.highlighted ? '#3b82f6' : 'var(--bg)',
              color: plan.highlighted ? '#fff' : 'var(--text)',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 14,
              width: '100%',
            }}
          >
            {plan.highlighted ? '今すぐ始める' : '選択する'}
          </button>
        </div>
      ))}
    </div>
  );
}`,
    hints: [
      'display: flex で横並びにし、中央のカードだけ transform: scale で拡大する',
      '強調カードには border / boxShadow / background を差別化する',
      '「おすすめ」バッジを条件付きで表示する',
    ],
    keywords: [
      'display',
      'flex',
      'transform',
      'scale',
      'boxShadow',
      'borderRadius',
      'highlighted',
      'flexDirection',
      'column',
    ],
  },

  // ─── 6. ツールチップ (medium) ───
  {
    id: 'l2-06',
    title: 'ツールチップ',
    description:
      'テキストにマウスを重ねると、上側に小さなツールチップが表示されるコンポーネントを作ってください。',
    difficulty: 'medium',
    initialCode: `function App() {
  return (
    <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
      <span style={{ borderBottom: '1px dashed var(--text-muted)', cursor: 'help' }}>
        ここにカーソルを合わせてください
      </span>
    </div>
  );
}`,
    answer: `function App() {
  const [show, setShow] = React.useState(false);

  return (
    <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
      <span
        style={{ position: 'relative', display: 'inline-block' }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <span
          style={{
            borderBottom: '1px dashed var(--text-muted)',
            cursor: 'help',
            color: 'var(--text)',
          }}
        >
          ここにカーソルを合わせてください
        </span>
        {show && (
          <span
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: 8,
              padding: '6px 12px',
              background: '#1e293b',
              color: '#f1f5f9',
              fontSize: 12,
              borderRadius: 4,
              whiteSpace: 'nowrap',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            補足情報をここに表示します
            <span
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                borderWidth: 5,
                borderStyle: 'solid',
                borderColor: '#1e293b transparent transparent transparent',
              }}
            />
          </span>
        )}
      </span>
    </div>
  );
}`,
    hints: [
      'onMouseEnter / onMouseLeave で表示フラグを切り替える',
      'ツールチップは position: absolute, bottom: 100% で上に表示する',
      'transform: translateX(-50%) と left: 50% で中央揃え',
    ],
    keywords: [
      'useState',
      'onMouseEnter',
      'onMouseLeave',
      'position',
      'absolute',
      'translateX',
      'bottom',
      'whiteSpace',
    ],
  },

  // ─── 7. 通知バッジ付きアイコン (easy) ───
  {
    id: 'l2-07',
    title: '通知バッジ付きアイコン',
    description:
      'ベルアイコンの右上に、未読件数を示す赤い丸バッジを重ねて表示してください。',
    difficulty: 'easy',
    initialCode: `function App() {
  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <div style={{ fontSize: 32 }}>
        <span role="img" aria-label="bell">\\u{1F514}</span>
        {/* 通知バッジをここに追加 */}
      </div>
    </div>
  );
}`,
    answer: `function App() {
  const count = 3;

  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block', fontSize: 32 }}>
        <span role="img" aria-label="bell">\\u{1F514}</span>
        {count > 0 && (
          <span
            style={{
              position: 'absolute',
              top: -4,
              right: -8,
              minWidth: 20,
              height: 20,
              background: '#ef4444',
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--bg)',
              padding: '0 4px',
            }}
          >
            {count}
          </span>
        )}
      </div>
    </div>
  );
}`,
    hints: [
      '親要素を position: relative にする',
      'バッジは position: absolute で top / right をマイナス値に設定',
      'minWidth と borderRadius: 50% で丸いバッジにする',
    ],
    keywords: ['position', 'relative', 'absolute', 'top', 'right', 'minWidth', 'borderRadius'],
  },

  // ─── 8. プログレスバー (easy) ───
  {
    id: 'l2-08',
    title: 'プログレスバー',
    description:
      '65% の進捗を示す水平プログレスバーをラベル付きで作ってください。',
    difficulty: 'easy',
    initialCode: `function App() {
  const percent = 65;

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: '0 auto' }}>
      <div>進捗: {percent}%</div>
      <div style={{ height: 20, background: 'var(--bg-muted)', borderRadius: 10 }}>
        {/* 塗りつぶし部分をここに追加 */}
      </div>
    </div>
  );
}`,
    answer: `function App() {
  const percent = 65;

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8,
          fontSize: 14,
          color: 'var(--text)',
        }}
      >
        <span>進捗</span>
        <span style={{ fontWeight: 600 }}>{percent}%</span>
      </div>
      <div
        style={{
          height: 20,
          background: 'var(--bg-muted)',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: percent + '%',
            height: '100%',
            background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
            borderRadius: 10,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}`,
    hints: [
      '外側のバーに overflow: hidden を設定する',
      '内側の div に width を % 指定で塗りつぶす',
      'linear-gradient でグラデーション色にすると見栄えが良い',
    ],
    keywords: ['overflow', 'hidden', 'width', 'borderRadius', 'linear-gradient', 'transition'],
  },

  // ─── 9. タグ入力フィールド (hard) ───
  {
    id: 'l2-09',
    title: 'タグ入力フィールド',
    description:
      'テキストを入力して Enter を押すとタグが追加され、X ボタンでタグを削除できるコンポーネントを作ってください。',
    difficulty: 'hard',
    initialCode: `function App() {
  return (
    <div style={{ padding: 40, maxWidth: 400, margin: '0 auto' }}>
      <div style={{ border: '1px solid var(--border)', borderRadius: 6, padding: 8 }}>
        <input
          type="text"
          placeholder="タグを入力して Enter"
          style={{ border: 'none', outline: 'none', width: '100%', padding: 4, background: 'transparent', color: 'var(--text)' }}
        />
      </div>
    </div>
  );
}`,
    answer: `function App() {
  const [tags, setTags] = React.useState(['React', 'TypeScript']);
  const [input, setInput] = React.useState('');

  const addTag = (e) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput('');
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: '0 auto' }}>
      <div
        style={{
          border: '1px solid var(--border)',
          borderRadius: 6,
          padding: 8,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          alignItems: 'center',
          background: 'var(--bg)',
        }}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              background: 'var(--bg-accent)',
              color: 'var(--text)',
              padding: '4px 10px',
              borderRadius: 9999,
              fontSize: 13,
            }}
          >
            {tag}
            <span
              onClick={() => removeTag(tag)}
              style={{
                cursor: 'pointer',
                marginLeft: 2,
                fontWeight: 700,
                fontSize: 14,
                lineHeight: 1,
                color: 'var(--text-muted)',
              }}
            >
              \\u00d7
            </span>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={addTag}
          placeholder="タグを入力して Enter"
          style={{
            border: 'none',
            outline: 'none',
            flex: 1,
            minWidth: 120,
            padding: 4,
            background: 'transparent',
            color: 'var(--text)',
            fontSize: 14,
          }}
        />
      </div>
    </div>
  );
}`,
    hints: [
      'useState でタグ配列と入力値を管理する',
      'onKeyDown で Enter キーを検知してタグを追加',
      'タグの X ボタンは onClick で filter して削除',
    ],
    keywords: [
      'useState',
      'onKeyDown',
      'Enter',
      'filter',
      'flexWrap',
      'inline-flex',
      'borderRadius',
    ],
  },

  // ─── 10. 評価スター (medium) ───
  {
    id: 'l2-10',
    title: '評価スター',
    description:
      '5 つの星をクリックすると、クリックした位置まで黄色く塗りつぶされる評価コンポーネントを作ってください。',
    difficulty: 'medium',
    initialCode: `function App() {
  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: 4, fontSize: 28 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} style={{ cursor: 'pointer' }}>\\u2606</span>
        ))}
      </div>
    </div>
  );
}`,
    answer: `function App() {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);

  return (
    <div style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'flex', gap: 4, fontSize: 32 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            style={{
              cursor: 'pointer',
              color: n <= (hover || rating) ? '#facc15' : 'var(--text-muted)',
              transition: 'color 0.15s ease',
              userSelect: 'none',
            }}
          >
            {n <= (hover || rating) ? '\\u2605' : '\\u2606'}
          </span>
        ))}
      </div>
      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
        {rating > 0 ? rating + ' / 5' : '評価してください'}
      </span>
    </div>
  );
}`,
    hints: [
      'useState で現在の評価値を管理する',
      'hover 用の state を追加するとUXが良くなる',
      'n <= rating なら塗りつぶし星 ★、それ以外は白抜き ☆',
    ],
    keywords: ['useState', 'onClick', 'onMouseEnter', 'onMouseLeave', 'color', 'userSelect'],
  },
];
