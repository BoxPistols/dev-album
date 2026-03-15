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

export const level3Challenges: TrainingChallenge[] = [
  // ── 1. ホバーで拡大するカード ──
  {
    id: 'l3-1',
    title: 'ホバーで拡大するカード',
    description:
      'マウスホバー時に少し拡大するカードを作成してください。onMouseEnter / onMouseLeave と useState、または CSS transition を使います。',
    difficulty: 'easy',
    initialCode: `function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f4f8' }}>
      {/* ここにホバーで拡大するカードを実装 */}
    </div>
  );
}`,
    answer: `function App() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f4f8' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 280,
          padding: 24,
          borderRadius: 12,
          background: '#fff',
          boxShadow: hovered ? '0 8px 30px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.1)',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
        }}
      >
        <h3 style={{ margin: '0 0 8px', fontSize: 18, color: '#1a202c' }}>カードタイトル</h3>
        <p style={{ margin: 0, fontSize: 14, color: '#718096', lineHeight: 1.6 }}>
          ホバーすると少し拡大します。トランジションで滑らかにアニメーションします。
        </p>
      </div>
    </div>
  );
}`,
    hints: [
      'useState で hovered 状態を管理しましょう',
      'onMouseEnter / onMouseLeave でフラグを切り替えます',
      'transform: scale(1.05) で少し拡大できます',
      'transition プロパティで滑らかに変化させましょう',
    ],
    keywords: ['onMouseEnter', 'onMouseLeave', 'useState', 'scale', 'transition'],
  },

  // ── 2. アコーディオン ──
  {
    id: 'l3-2',
    title: 'アコーディオン',
    description:
      '3つの折りたたみ可能な FAQ アイテムを作成してください。クリックで展開/折りたたみし、同時に1つだけ開く排他制御にします。',
    difficulty: 'medium',
    initialCode: `function App() {
  const faqs = [
    { q: 'React とは何ですか？', a: 'Facebook が開発した UI ライブラリです。コンポーネントベースで効率的な描画を行います。' },
    { q: 'JSX とは何ですか？', a: 'JavaScript の中に HTML のような構文を書ける拡張記法です。Babel でトランスパイルされます。' },
    { q: 'useState とは何ですか？', a: '関数コンポーネントで状態を管理するための React Hook です。' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f7fafc' }}>
      {/* ここにアコーディオンを実装 */}
    </div>
  );
}`,
    answer: `function App() {
  const [openIndex, setOpenIndex] = React.useState(null);
  const faqs = [
    { q: 'React とは何ですか？', a: 'Facebook が開発した UI ライブラリです。コンポーネントベースで効率的な描画を行います。' },
    { q: 'JSX とは何ですか？', a: 'JavaScript の中に HTML のような構文を書ける拡張記法です。Babel でトランスパイルされます。' },
    { q: 'useState とは何ですか？', a: '関数コンポーネントで状態を管理するための React Hook です。' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f7fafc' }}>
      <div style={{ width: 480 }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ marginBottom: 8, borderRadius: 8, overflow: 'hidden', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: '100%',
                padding: '14px 18px',
                border: 'none',
                background: openIndex === i ? '#4299e1' : '#fff',
                color: openIndex === i ? '#fff' : '#2d3748',
                fontSize: 15,
                fontWeight: 600,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {faq.q}
              <span style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>&#9660;</span>
            </button>
            <div
              style={{
                maxHeight: openIndex === i ? 200 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
                padding: openIndex === i ? '12px 18px' : '0 18px',
              }}
            >
              <p style={{ margin: 0, fontSize: 14, color: '#4a5568', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    hints: [
      'useState(null) で現在開いているインデックスを管理します',
      'クリック時に同じインデックスなら null、違えばそのインデックスをセット',
      'maxHeight を 0 と固定値で切り替えるとアニメーションできます',
      '▼ 記号を rotate で回転させると開閉が分かりやすくなります',
    ],
    keywords: ['useState', 'onClick', 'maxHeight', 'transition', 'openIndex'],
  },

  // ── 3. トースト通知 ──
  {
    id: 'l3-3',
    title: 'トースト通知',
    description:
      'ボタンを押すと右下にトースト通知が表示され、3秒後に自動で消える UI を作成してください。',
    difficulty: 'medium',
    initialCode: `function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f4f8' }}>
      {/* ここにトースト通知を実装 */}
    </div>
  );
}`,
    answer: `function App() {
  const [show, setShow] = React.useState(false);

  const showToast = () => {
    setShow(true);
    setTimeout(() => setShow(false), 3000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f4f8' }}>
      <button
        onClick={showToast}
        style={{
          padding: '12px 24px',
          fontSize: 15,
          fontWeight: 600,
          color: '#fff',
          background: '#4299e1',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        通知を表示
      </button>

      {show && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            padding: '14px 24px',
            background: '#2d3748',
            color: '#fff',
            borderRadius: 8,
            fontSize: 14,
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          保存しました！
        </div>
      )}

      <style>{\`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      \`}</style>
    </div>
  );
}`,
    hints: [
      'useState(false) で表示/非表示を管理します',
      'setTimeout で 3 秒後に setShow(false) を呼びます',
      'position: fixed; bottom; right で右下に配置します',
      '@keyframes でフェードインアニメーションを追加しましょう',
    ],
    keywords: ['useState', 'setTimeout', 'fixed', 'bottom', 'right', '@keyframes'],
  },

  // ── 4. ローディングスピナー ──
  {
    id: 'l3-4',
    title: 'ローディングスピナー',
    description:
      'CSS のみで回転するスピナーアニメーションを作成してください。<style> タグと @keyframes をコンポーネント内に書きます。',
    difficulty: 'easy',
    initialCode: `function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f7fafc' }}>
      {/* ここにローディングスピナーを実装 */}
    </div>
  );
}`,
    answer: `function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f7fafc' }}>
      <div className="spinner" />
      <p style={{ marginTop: 16, fontSize: 14, color: '#718096' }}>読み込み中...</p>

      <style>{\`
        .spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #4299e1;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      \`}</style>
    </div>
  );
}`,
    hints: [
      'border で円を作り、border-top だけ色を変えます',
      'border-radius: 50% で円形にします',
      '@keyframes spin で 0deg → 360deg の回転を定義します',
      'animation: spin 0.8s linear infinite で無限回転させます',
    ],
    keywords: ['border-radius', '50%', '@keyframes', 'rotate', 'animation', 'infinite'],
  },

  // ── 5. スケルトンスクリーン ──
  {
    id: 'l3-5',
    title: 'スケルトンスクリーン',
    description:
      'カード型のシマーローディングプレースホルダーを作成してください。丸いアバター＋テキスト行の骨格 UI を CSS アニメーションで光らせます。',
    difficulty: 'medium',
    initialCode: `function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f4f8' }}>
      {/* ここにスケルトンスクリーンを実装 */}
    </div>
  );
}`,
    answer: `function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f4f8' }}>
      <div style={{ width: 320, padding: 20, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <div className="skeleton" style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ marginLeft: 12, flex: 1 }}>
            <div className="skeleton" style={{ height: 14, borderRadius: 4, marginBottom: 8, width: '60%' }} />
            <div className="skeleton" style={{ height: 12, borderRadius: 4, width: '40%' }} />
          </div>
        </div>
        <div className="skeleton" style={{ height: 12, borderRadius: 4, marginBottom: 8, width: '100%' }} />
        <div className="skeleton" style={{ height: 12, borderRadius: 4, marginBottom: 8, width: '90%' }} />
        <div className="skeleton" style={{ height: 12, borderRadius: 4, width: '75%' }} />
      </div>

      <style>{\`
        .skeleton {
          background: linear-gradient(90deg, #e2e8f0 25%, #edf2f7 50%, #e2e8f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      \`}</style>
    </div>
  );
}`,
    hints: [
      'linear-gradient で左から右へ光が流れる効果を作ります',
      'background-size: 200% にしてアニメーションで位置をずらします',
      'アバターは border-radius: 50% で丸くします',
      'テキスト行は高さ 12px 程度の矩形で表現します',
    ],
    keywords: ['linear-gradient', 'background-size', '@keyframes', 'shimmer', 'animation'],
  },

  // ── 6. カウンター（+/- ボタン） ──
  {
    id: 'l3-6',
    title: 'カウンター（+/- ボタン）',
    description:
      '数値表示と +/- ボタンのカウンターを作成してください。最小値 0、最大値 99 の範囲制限をつけます。',
    difficulty: 'easy',
    initialCode: `function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f7fafc' }}>
      {/* ここにカウンターを実装 */}
    </div>
  );
}`,
    answer: `function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f7fafc' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: '16px 24px', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <button
          onClick={() => setCount(c => Math.max(0, c - 1))}
          disabled={count === 0}
          style={{
            width: 40,
            height: 40,
            fontSize: 20,
            fontWeight: 700,
            border: 'none',
            borderRadius: 8,
            background: count === 0 ? '#e2e8f0' : '#fc8181',
            color: '#fff',
            cursor: count === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          −
        </button>
        <span style={{ fontSize: 32, fontWeight: 700, minWidth: 48, textAlign: 'center', color: '#2d3748' }}>
          {count}
        </span>
        <button
          onClick={() => setCount(c => Math.min(99, c + 1))}
          disabled={count === 99}
          style={{
            width: 40,
            height: 40,
            fontSize: 20,
            fontWeight: 700,
            border: 'none',
            borderRadius: 8,
            background: count === 99 ? '#e2e8f0' : '#48bb78',
            color: '#fff',
            cursor: count === 99 ? 'not-allowed' : 'pointer',
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}`,
    hints: [
      'useState(0) で数値を管理します',
      'Math.max(0, c - 1) で最小値 0 を保証します',
      'Math.min(99, c + 1) で最大値 99 を保証します',
      'disabled プロパティで上限/下限時にボタンを無効化しましょう',
    ],
    keywords: ['useState', 'Math.max', 'Math.min', 'onClick', 'disabled'],
  },

  // ── 7. 画像カルーセル ──
  {
    id: 'l3-7',
    title: '画像カルーセル',
    description:
      '3枚の画像を prev/next ボタンで切り替えるカルーセルを作成してください。現在位置を示すドットインジケーターも付けます。画像は背景色で代用して構いません。',
    difficulty: 'hard',
    initialCode: `function App() {
  const slides = [
    { bg: '#4299e1', label: 'Slide 1' },
    { bg: '#48bb78', label: 'Slide 2' },
    { bg: '#ed8936', label: 'Slide 3' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f4f8' }}>
      {/* ここにカルーセルを実装 */}
    </div>
  );
}`,
    answer: `function App() {
  const [current, setCurrent] = React.useState(0);
  const slides = [
    { bg: '#4299e1', label: 'Slide 1' },
    { bg: '#48bb78', label: 'Slide 2' },
    { bg: '#ed8936', label: 'Slide 3' },
  ];

  const prev = () => setCurrent(i => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f4f8' }}>
      <div style={{ width: 400, textAlign: 'center' }}>
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
          <div
            style={{
              height: 240,
              background: slides[current].bg,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'background 0.4s ease',
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>{slides[current].label}</span>
          </div>
          <button
            onClick={prev}
            style={{
              position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)',
              width: 36, height: 36, borderRadius: '50%', border: 'none',
              background: 'rgba(255,255,255,0.8)', fontSize: 18, cursor: 'pointer', fontWeight: 700,
            }}
          >
            ‹
          </button>
          <button
            onClick={next}
            style={{
              position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)',
              width: 36, height: 36, borderRadius: '50%', border: 'none',
              background: 'rgba(255,255,255,0.8)', fontSize: 18, cursor: 'pointer', fontWeight: 700,
            }}
          >
            ›
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: 10, height: 10, borderRadius: '50%', border: 'none',
                background: i === current ? '#4299e1' : '#cbd5e0', cursor: 'pointer',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}`,
    hints: [
      'useState(0) で現在のスライドインデックスを管理します',
      'prev/next で循環するよう三項演算子を使います',
      'ドットは slides.map で生成し、クリックで setCurrent(i) します',
      'position: absolute で矢印ボタンをスライド上に重ねます',
    ],
    keywords: ['useState', 'onClick', 'setCurrent', 'position', 'absolute', 'borderRadius'],
  },

  // ── 8. ドラッグ可能なリスト並び替え ──
  {
    id: 'l3-8',
    title: 'ドラッグ可能なリスト並び替え',
    description:
      '5つのアイテムを上下ボタンで並び替えできるリストを作成してください。各行に ▲ ▼ ボタンを配置し、クリックで位置を入れ替えます。',
    difficulty: 'hard',
    initialCode: `function App() {
  const initialItems = ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f7fafc' }}>
      {/* ここにリスト並び替えを実装 */}
    </div>
  );
}`,
    answer: `function App() {
  const [items, setItems] = React.useState(['HTML', 'CSS', 'JavaScript', 'React', 'Next.js']);

  const moveUp = (index) => {
    if (index === 0) return;
    const next = [...items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    setItems(next);
  };

  const moveDown = (index) => {
    if (index === items.length - 1) return;
    const next = [...items];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    setItems(next);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f7fafc' }}>
      <div style={{ width: 340 }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 16, color: '#2d3748' }}>学習順を並び替え</h3>
        {items.map((item, i) => (
          <div
            key={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 14px',
              marginBottom: 6,
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <span style={{ width: 24, fontSize: 13, color: '#a0aec0', fontWeight: 600 }}>{i + 1}</span>
            <span style={{ flex: 1, fontSize: 15, color: '#2d3748' }}>{item}</span>
            <button
              onClick={() => moveUp(i)}
              disabled={i === 0}
              style={{
                width: 28, height: 28, border: 'none', borderRadius: 4, marginRight: 4,
                background: i === 0 ? '#edf2f7' : '#e2e8f0', cursor: i === 0 ? 'default' : 'pointer',
                fontSize: 12,
              }}
            >
              ▲
            </button>
            <button
              onClick={() => moveDown(i)}
              disabled={i === items.length - 1}
              style={{
                width: 28, height: 28, border: 'none', borderRadius: 4,
                background: i === items.length - 1 ? '#edf2f7' : '#e2e8f0',
                cursor: i === items.length - 1 ? 'default' : 'pointer',
                fontSize: 12,
              }}
            >
              ▼
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    hints: [
      'useState で配列を管理し、スプレッドでコピーしてから入れ替えます',
      '分割代入 [a, b] = [b, a] で要素をスワップできます',
      '先頭要素の ▲ と末尾要素の ▼ は disabled にしましょう',
      'key にはインデックスではなくアイテム名を使うと再レンダリングが安定します',
    ],
    keywords: ['useState', 'moveUp', 'moveDown', 'disabled', 'setItems'],
  },

  // ── 9. 文字数カウンター付きテキストエリア ──
  {
    id: 'l3-9',
    title: '文字数カウンター付きテキストエリア',
    description:
      'テキストエリアの下に「42/200」のような文字数カウンターを表示してください。180文字以上で色が赤に変わります。',
    difficulty: 'easy',
    initialCode: `function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f4f8' }}>
      {/* ここに文字数カウンター付きテキストエリアを実装 */}
    </div>
  );
}`,
    answer: `function App() {
  const [text, setText] = React.useState('');
  const maxLen = 200;
  const warnAt = 180;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f4f8' }}>
      <div style={{ width: 400 }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value.slice(0, maxLen))}
          placeholder="ここにテキストを入力..."
          style={{
            width: '100%',
            height: 120,
            padding: 12,
            fontSize: 14,
            border: '2px solid',
            borderColor: text.length >= warnAt ? '#fc8181' : '#e2e8f0',
            borderRadius: 8,
            resize: 'vertical',
            outline: 'none',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
          }}
        />
        <p
          style={{
            textAlign: 'right',
            margin: '6px 0 0',
            fontSize: 13,
            fontWeight: 600,
            color: text.length >= warnAt ? '#e53e3e' : '#a0aec0',
            transition: 'color 0.2s',
          }}
        >
          {text.length}/{maxLen}
        </p>
      </div>
    </div>
  );
}`,
    hints: [
      'useState(\'\') でテキストを管理します',
      'onChange で .slice(0, maxLen) して最大長を制限します',
      'text.length >= 180 で色を切り替えます',
      'テンプレートリテラルで {text.length}/{maxLen} を表示します',
    ],
    keywords: ['useState', 'onChange', 'text.length', 'slice', 'textarea'],
  },

  // ── 10. コピーボタン ──
  {
    id: 'l3-10',
    title: 'コピーボタン',
    description:
      'テキストフィールドと「コピー」ボタンを作成してください。ボタンをクリックするとテキストがクリップボードにコピーされ、ボタンが「コピー済み」に2秒間変わります。',
    difficulty: 'medium',
    initialCode: `function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f7fafc' }}>
      {/* ここにコピーボタンを実装 */}
    </div>
  );
}`,
    answer: `function App() {
  const [copied, setCopied] = React.useState(false);
  const textValue = 'https://example.com/share/abc123';

  const handleCopy = () => {
    navigator.clipboard.writeText(textValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f7fafc' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="text"
          readOnly
          value={textValue}
          style={{
            width: 280,
            padding: '10px 14px',
            fontSize: 14,
            border: '2px solid #e2e8f0',
            borderRadius: 8,
            outline: 'none',
            background: '#fff',
            color: '#4a5568',
          }}
        />
        <button
          onClick={handleCopy}
          style={{
            padding: '10px 18px',
            fontSize: 14,
            fontWeight: 600,
            border: 'none',
            borderRadius: 8,
            background: copied ? '#48bb78' : '#4299e1',
            color: '#fff',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background 0.3s',
          }}
        >
          {copied ? 'コピー済み' : 'コピー'}
        </button>
      </div>
    </div>
  );
}`,
    hints: [
      'navigator.clipboard.writeText() でクリップボードに書き込みます',
      'useState(false) でコピー済み状態を管理します',
      'setTimeout で 2 秒後に false に戻します',
      'ボタンのテキストと背景色を copied で切り替えましょう',
    ],
    keywords: ['useState', 'clipboard', 'writeText', 'setTimeout', 'setCopied'],
  },
];
