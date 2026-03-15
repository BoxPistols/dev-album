import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';

export default function SnackbarPatterns() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 64</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Snackbar / Toast の設計</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          ユーザーに操作結果やシステム状態を一時的に伝える通知 UI は、どのアプリにも欠かせない要素です。
          Snackbar、Toast、Notification の違いを理解し、アニメーション、配置、アクセシビリティまで包括的に設計する方法を学びます。
        </p>

        <WhyNowBox tags={['Snackbar', 'Toast', 'Notification', 'アクセシビリティ', 'アニメーション']}>
          <p>
            React コンポーネントの設計、状態管理、CSS アニメーションの基礎を学んできました。
            ここではそれらの知識を統合し、実務で頻出する「一時通知 UI」を設計します。
            単にライブラリを使うだけでなく、内部の仕組みを理解することで、
            プロジェクト固有の要件に対応できる柔軟な通知システムを構築できるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: 概念の違い */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Snackbar / Toast / Notification の違い</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              これらの用語はしばしば混同されますが、厳密にはそれぞれ異なる文脈と用途を持っています。
              Material Design と一般的な UI 設計における使い分けを整理しましょう。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">種類</th>
                    <th className="text-left p-3 font-semibold text-foreground">主な用途</th>
                    <th className="text-left p-3 font-semibold text-foreground">消去方法</th>
                    <th className="text-left p-3 font-semibold text-foreground">典型的な位置</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">Snackbar</td>
                    <td className="p-3">操作の結果フィードバック（保存完了、削除完了など）</td>
                    <td className="p-3">自動消去 + 任意のアクション（Undo など）</td>
                    <td className="p-3">画面下部中央</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">Toast</td>
                    <td className="p-3">軽量な通知（成功、エラー、情報）</td>
                    <td className="p-3">自動消去 or 手動閉じ</td>
                    <td className="p-3">画面右上または右下</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">Notification</td>
                    <td className="p-3">重要度の高い情報（新しいメッセージ、システムアラートなど）</td>
                    <td className="p-3">手動消去が基本</td>
                    <td className="p-3">画面右上、通知パネル</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="実務での使い分け">
              <p>
                多くのプロジェクトでは Snackbar と Toast を区別せず「Toast」と呼ぶことが一般的です。
                重要なのは用語の統一よりも、「ユーザーの操作を阻害しない一時通知」と「注意を引く必要がある永続的な通知」を
                明確に区別することです。このマニュアルでは、一時通知全般を「Snackbar / Toast」として扱います。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: 出現アニメーション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">出現方法とアニメーションパターン</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Snackbar のアニメーションはユーザー体験に直結します。
              動きが速すぎると見逃し、遅すぎると待たされる印象になります。
              代表的な 3 つのパターンを紹介します。
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">Slide-in</h3>
                <p className="text-sm text-muted-foreground">
                  画面外から滑り込む動き。最も一般的で、出現元の方向がユーザーに直感的に伝わる。
                  下部配置なら下から、右上配置なら右からスライドするのが自然。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">Fade-in</h3>
                <p className="text-sm text-muted-foreground">
                  透明から不透明へ変化する動き。控えめで上品な印象。
                  ただし単独で使うと出現位置が分かりにくい場合がある。
                  slide-in と組み合わせると効果的。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">Scale</h3>
                <p className="text-sm text-muted-foreground">
                  小さい状態から拡大する動き。注目を集めやすいが、使いすぎると煩わしくなる。
                  重要度の高い通知に限定して使うのが良い。
                </p>
              </div>
            </div>

            <CodeBlock
              language="css"
              title="CSS によるアニメーション定義"
              code={`/* Slide-in（下部配置向け） */
.snackbar-slide-enter {
  transform: translateY(100%);
  opacity: 0;
}
.snackbar-slide-active {
  transform: translateY(0);
  opacity: 1;
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
              opacity 200ms ease-in;
}
.snackbar-slide-exit {
  transform: translateY(100%);
  opacity: 0;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
              opacity 150ms ease-out;
}

/* Fade-in + 軽い上方向のスライド */
.snackbar-fade-enter {
  opacity: 0;
  transform: translateY(8px);
}
.snackbar-fade-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 200ms ease-in,
              transform 200ms ease-out;
}
.snackbar-fade-exit {
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 150ms ease-out,
              transform 150ms ease-in;
}

/* Scale（重要通知向け） */
.snackbar-scale-enter {
  transform: scale(0.85);
  opacity: 0;
}
.snackbar-scale-active {
  transform: scale(1);
  opacity: 1;
  transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 200ms ease-in;
}`}
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code>cubic-bezier(0.4, 0, 0.2, 1)</code> は Material Design が推奨する標準的なイージング関数です。
              exit アニメーションは enter より短く設定するのが定石です（消える動きはユーザーが待たなくて良い）。
            </p>
          </section>

          {/* ビジュアルプレビュー: 基本的な Snackbar */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Snackbar のビジュアルプレビュー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              実際に動作する Snackbar のデモで、基本的な表示・非表示の挙動を確認しましょう。
              ボタンをクリックすると Snackbar が出現します。
            </p>

            <CodePreview
              code={`function SnackbarDemo() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <div style={{ padding: '20px', minHeight: '200px', position: 'relative' }}>
      <button
        onClick={() => setShow(true)}
        style={{
          padding: '10px 20px',
          background: 'var(--text-accent, #6366f1)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
        }}
      >
        Snackbar を表示
      </button>
      {show && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#323232',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            animation: 'slideUp 300ms ease-out',
          }}
        >
          <span>操作が完了しました</span>
          <button
            onClick={() => setShow(false)}
            style={{
              background: 'transparent',
              color: '#90caf9',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            閉じる
          </button>
        </div>
      )}
      <style>{\`
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      \`}</style>
    </div>
  );
}`}
              language="tsx"
              title="基本的な Snackbar（下部中央・3秒自動消去）"
            />

            <CodePreview
              code={`function UndoToastDemo() {
  const [items, setItems] = useState(['メール A', 'メール B', 'メール C']);
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const handleDelete = (index) => {
    const deleted = items[index];
    setItems((prev) => prev.filter((_, i) => i !== index));
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ message: \`"\${deleted}" を削除しました\`, deleted, index });
    timerRef.current = setTimeout(() => setToast(null), 6000);
  };

  const handleUndo = () => {
    if (!toast) return;
    setItems((prev) => {
      const next = [...prev];
      next.splice(toast.index, 0, toast.deleted);
      return next;
    });
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(null);
  };

  return (
    <div style={{ padding: '20px', minHeight: '220px', position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item, i) => (
          <div
            key={item}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 16px',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '14px',
            }}
          >
            <span style={{ color: '#1e293b' }}>{item}</span>
            <button
              onClick={() => handleDelete(i)}
              style={{
                padding: '4px 12px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              削除
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center', padding: '20px' }}>
            すべて削除されました
          </p>
        )}
      </div>
      {toast && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#323232',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            animation: 'slideUp2 300ms ease-out',
            whiteSpace: 'nowrap',
          }}
        >
          <span>{toast.message}</span>
          <button
            onClick={handleUndo}
            style={{
              background: 'transparent',
              color: '#fbbf24',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            元に戻す
          </button>
          <button
            onClick={() => { if (timerRef.current) clearTimeout(timerRef.current); setToast(null); }}
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.6)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      )}
      <style>{\`
        @keyframes slideUp2 {
          from { transform: translateX(-50%) translateY(20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      \`}</style>
    </div>
  );
}`}
              language="tsx"
              title="Undo アクション付き Toast"
            />
          </section>

          {/* セクション3: 位置の設計 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">配置の設計と使い分け</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Snackbar をどこに表示するかは、情報の重要度とユーザーの操作動線に大きく影響します。
              位置ごとの特徴と、適切な使い分けを解説します。
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30">
                <h3 className="font-bold text-foreground mb-2">bottom-center（下部中央）</h3>
                <p className="text-sm text-muted-foreground">
                  Material Design の標準位置。ユーザーの視線を大きく移動させず、コンテンツの閲覧を妨げにくい。
                  モバイルでは画面幅いっぱいに広げるケースが多い。操作結果のフィードバックに最適。
                </p>
              </div>
              <div className="p-4 rounded-r-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/30">
                <h3 className="font-bold text-foreground mb-2">top-right（右上）</h3>
                <p className="text-sm text-muted-foreground">
                  複数の通知を縦にスタッキングしやすい位置。SaaS アプリやダッシュボードで頻用される。
                  通知が複数同時に出る可能性がある場合に向いている。
                </p>
              </div>
              <div className="p-4 rounded-r-lg border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/30">
                <h3 className="font-bold text-foreground mb-2">top-center（上部中央）</h3>
                <p className="text-sm text-muted-foreground">
                  エラーメッセージなど、見逃してはいけない情報に適している。
                  ただしヘッダーナビゲーションと重なるリスクがあるため、z-index の管理が必要。
                </p>
              </div>
              <div className="p-4 rounded-r-lg border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/30">
                <h3 className="font-bold text-foreground mb-2">bottom-left（左下）</h3>
                <p className="text-sm text-muted-foreground">
                  チャット UI やヘルプウィジェットと共存させる場合に使われる。
                  右下に FAB（Floating Action Button）がある場合の代替位置としても有用。
                </p>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="位置を制御する CSS クラス"
              code={`/* Snackbar コンテナの位置定義 */
.snackbar-container {
  position: fixed;
  z-index: 1400; /* MUI の Snackbar と同じ z-index */
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none; /* コンテナ自体はクリック透過 */
}

.snackbar-container > * {
  pointer-events: auto; /* 個々の Snackbar はクリック可能 */
}

/* 位置バリエーション */
.snackbar-bottom-center {
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}

.snackbar-top-right {
  top: 24px;
  right: 24px;
  align-items: flex-end;
}

.snackbar-top-center {
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}

.snackbar-bottom-left {
  bottom: 24px;
  left: 24px;
  align-items: flex-start;
}

/* モバイル対応: 下部配置は全幅に */
@media (max-width: 600px) {
  .snackbar-bottom-center {
    left: 16px;
    right: 16px;
    transform: none;
  }
}`}
            />

            <CodePreview
              code={`function PositionDemo() {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const positions = [
    { key: 'bottom-center', label: '下部中央', style: { bottom: '12px', left: '50%', transform: 'translateX(-50%)' } },
    { key: 'top-right', label: '右上', style: { top: '12px', right: '12px' } },
    { key: 'bottom-left', label: '左下', style: { bottom: '12px', left: '12px' } },
    { key: 'top-center', label: '上部中央', style: { top: '12px', left: '50%', transform: 'translateX(-50%)' } },
  ];

  const addToast = (pos) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, position: pos.key, label: pos.label, style: pos.style }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  };

  const colorMap = {
    'bottom-center': '#3b82f6',
    'top-right': '#22c55e',
    'bottom-left': '#a855f7',
    'top-center': '#f97316',
  };

  return (
    <div style={{ padding: '20px', minHeight: '260px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {positions.map((pos) => (
          <button
            key={pos.key}
            onClick={() => addToast(pos)}
            style={{
              padding: '8px 16px',
              background: colorMap[pos.key],
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            {pos.label}
          </button>
        ))}
      </div>
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            position: 'absolute',
            ...t.style,
            background: colorMap[t.position],
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            animation: 'fadeIn3 250ms ease-out',
            zIndex: 10,
          }}
        >
          {t.label} に表示
        </div>
      ))}
      <style>{\`
        @keyframes fadeIn3 {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      \`}</style>
    </div>
  );
}`}
              language="tsx"
              title="配置の違いを体験（4 つの位置）"
            />
          </section>

          {/* ビジュアルプレビュー: スタッキング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">スタッキングのビジュアルプレビュー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              複数の通知が重なる場合の挙動を実際に確認しましょう。
              ボタンを連続クリックすると、通知が右上にスタックされていきます（最大 3 件）。
            </p>

            <CodePreview
              code={`function StackedToastDemo() {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const types = [
    { type: 'success', bg: '#16a34a', label: '保存しました' },
    { type: 'error', bg: '#dc2626', label: 'エラーが発生しました' },
    { type: 'info', bg: '#2563eb', label: '新しい通知があります' },
    { type: 'warning', bg: '#d97706', label: '容量が残りわずかです' },
  ];

  const addToast = () => {
    const pick = types[idRef.current % types.length];
    const id = ++idRef.current;
    setToasts((prev) => {
      const next = [...prev, { id, ...pick }];
      return next.slice(-3);
    });
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ padding: '20px', minHeight: '240px', position: 'relative' }}>
      <button
        onClick={addToast}
        style={{
          padding: '10px 20px',
          background: 'var(--text-accent, #6366f1)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
        }}
      >
        Toast を追加（連続クリック可）
      </button>
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxWidth: '260px',
        }}
      >
        {toasts.map((t, i) => (
          <div
            key={t.id}
            style={{
              background: t.bg,
              color: 'white',
              padding: '10px 16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              fontSize: '13px',
              fontWeight: '500',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
              animation: 'slideIn4 250ms ease-out',
            }}
          >
            <span>{t.label}</span>
            <button
              onClick={() => removeToast(t.id)}
              style={{
                background: 'transparent',
                color: 'rgba(255,255,255,0.7)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                lineHeight: 1,
                padding: '0 2px',
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <style>{\`
        @keyframes slideIn4 {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      \`}</style>
    </div>
  );
}`}
              language="tsx"
              title="スタック表示（右上・最大3件）"
            />
          </section>

          {/* セクション4: 自動消去 vs 手動消去 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">自動消去と手動消去の設計指針</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              通知をいつ消すかは、情報の重要度とユーザーが取るべきアクションによって決まります。
              適切なタイマー設定は、ユーザーのストレスを軽減します。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">シナリオ</th>
                    <th className="text-left p-3 font-semibold text-foreground">推奨秒数</th>
                    <th className="text-left p-3 font-semibold text-foreground">理由</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3">簡潔な成功メッセージ（「保存しました」）</td>
                    <td className="p-3 font-medium text-foreground">3 秒</td>
                    <td className="p-3">ユーザーが確認するだけで十分。長く表示する必要がない</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">アクション付き（「削除しました。元に戻す」）</td>
                    <td className="p-3 font-medium text-foreground">5 - 8 秒</td>
                    <td className="p-3">ユーザーがメッセージを読み、Undo を押すかどうか判断する時間が必要</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">長めの情報メッセージ</td>
                    <td className="p-3 font-medium text-foreground">6 - 10 秒</td>
                    <td className="p-3">テキスト量に応じて、読み切れる時間を確保する</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">エラーメッセージ</td>
                    <td className="p-3 font-medium text-foreground">手動消去</td>
                    <td className="p-3">エラーの内容を確認し、対処する時間が必要。勝手に消えると困る</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">ネットワークエラー（接続断など）</td>
                    <td className="p-3 font-medium text-foreground">永続表示</td>
                    <td className="p-3">問題が解消されるまで表示し続けるべき</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="tsx"
              title="ホバー時にタイマーを一時停止する実装"
              code={`import { useEffect, useRef, useCallback } from 'react';

function useAutoHide(duration: number | null, onHide: () => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const remainingRef = useRef(duration ?? 0);
  const startTimeRef = useRef(0);

  const start = useCallback(() => {
    if (duration === null) return; // 手動消去モード
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(onHide, remainingRef.current);
  }, [duration, onHide]);

  const pause = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      // 経過分を差し引いて残り時間を記録
      const elapsed = Date.now() - startTimeRef.current;
      remainingRef.current = Math.max(remainingRef.current - elapsed, 0);
    }
  }, []);

  const resume = useCallback(() => {
    start();
  }, [start]);

  useEffect(() => {
    remainingRef.current = duration ?? 0;
    start();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration, start]);

  return { pause, resume };
}

// 使用例
function SnackbarItem({ message, duration, onClose }: {
  message: string;
  duration: number | null;
  onClose: () => void;
}) {
  const { pause, resume } = useAutoHide(duration, onClose);

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      className="snackbar-item"
    >
      <span>{message}</span>
      <button onClick={onClose} aria-label="通知を閉じる">
        x
      </button>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="ホバー一時停止は必須ではないが推奨">
              <p>
                ホバー時のタイマー一時停止は WCAG の要件ではありませんが、
                ユーザビリティの観点から強く推奨されます。
                特にアクション付き Snackbar では、マウスが Snackbar 上にある間は消えないことが
                ユーザーの期待に合致します。フォーカス時の一時停止も同様に実装しましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: アクション付き Snackbar */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">アクション付き Snackbar（Undo パターン）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              「削除しました -- 元に戻す」のような Undo パターンは、破壊的操作のユーザー体験を大幅に改善します。
              確認ダイアログで操作を止めるのではなく、操作を即座に実行してから取り消しの選択肢を提供するアプローチです。
            </p>

            <CodeBlock
              language="tsx"
              title="Undo パターンの実装"
              showLineNumbers
              code={`import { useState, useCallback, useRef } from 'react';

interface UndoableAction {
  id: string;
  message: string;
  execute: () => void;
  undo: () => void;
}

function useUndoableAction() {
  const [pending, setPending] = useState<UndoableAction | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const UNDO_DURATION = 6000;

  const perform = useCallback((action: UndoableAction) => {
    // 前の pending があれば確定する
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 操作を即座に実行（楽観的更新）
    action.execute();
    setPending(action);

    // タイマーで確定（Undo されなかった場合）
    timerRef.current = setTimeout(() => {
      setPending(null);
    }, UNDO_DURATION);
  }, []);

  const undoAction = useCallback(() => {
    if (pending) {
      if (timerRef.current) clearTimeout(timerRef.current);
      pending.undo(); // 操作を巻き戻す
      setPending(null);
    }
  }, [pending]);

  const dismiss = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPending(null);
  }, []);

  return { pending, perform, undoAction, dismiss };
}

// 使用例: メール削除
function EmailList() {
  const [emails, setEmails] = useState([
    { id: '1', subject: '会議のお知らせ' },
    { id: '2', subject: 'レビュー依頼' },
    { id: '3', subject: '週次レポート' },
  ]);
  const { pending, perform, undoAction, dismiss } = useUndoableAction();

  const deleteEmail = (id: string) => {
    const target = emails.find((e) => e.id === id);
    if (!target) return;

    perform({
      id,
      message: \`"\${target.subject}" を削除しました\`,
      execute: () => setEmails((prev) => prev.filter((e) => e.id !== id)),
      undo: () => setEmails((prev) => [...prev, target]),
    });
  };

  return (
    <div>
      {emails.map((email) => (
        <div key={email.id}>
          <span>{email.subject}</span>
          <button onClick={() => deleteEmail(email.id)}>削除</button>
        </div>
      ))}

      {pending && (
        <div role="status" aria-live="polite" className="snackbar">
          <span>{pending.message}</span>
          <button onClick={undoAction}>元に戻す</button>
          <button onClick={dismiss} aria-label="閉じる">x</button>
        </div>
      )}
    </div>
  );
}`}
            />
          </section>

          {/* セクション6: スタッキング戦略 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">複数通知のスタッキング戦略</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              複数の通知が同時に発生した場合の表示方法は、大きく 3 つの戦略に分けられます。
              アプリの特性に応じて選択しましょう。
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">1. 縦にスタック表示</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  複数の通知を同時に表示し、新しい通知を上（または下）に積み上げる方式。
                  SaaS アプリや管理画面でよく使われる。最大表示数を制限し（3 - 5 件程度）、
                  超過分はキューに入れるのが一般的。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">2. 1 件ずつ入れ替え</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  常に最新の 1 件だけを表示し、新しい通知が来たら前の通知を差し替える。
                  Material Design の Snackbar はこの方式を推奨している。
                  シンプルだが、前の通知を見逃すリスクがある。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">3. 折りたたみスタック</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  最新の通知のみフル表示し、過去の通知は縮小表示（カードが重なっているように見せる）。
                  sonner や react-hot-toast で採用されているパターン。
                  ホバーすると全件が展開される。
                </p>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="キュー管理付きスタッキングの実装（useReducer）"
              showLineNumbers
              code={`import { useReducer, useCallback } from 'react';

// 通知の型定義
interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration: number | null;
}

// アクションの型
type ToastAction =
  | { type: 'ADD'; toast: Toast }
  | { type: 'REMOVE'; id: string }
  | { type: 'PROMOTE' }; // キューから表示領域に移動

interface ToastState {
  visible: Toast[];   // 現在表示中の通知
  queue: Toast[];     // 表示待ちのキュー
}

const MAX_VISIBLE = 3;

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD': {
      // 表示枠に空きがあれば即表示、なければキューに追加
      if (state.visible.length < MAX_VISIBLE) {
        return {
          ...state,
          visible: [...state.visible, action.toast],
        };
      }
      return {
        ...state,
        queue: [...state.queue, action.toast],
      };
    }
    case 'REMOVE': {
      const newVisible = state.visible.filter((t) => t.id !== action.id);
      // 空きが出たらキューから補充
      if (state.queue.length > 0 && newVisible.length < MAX_VISIBLE) {
        const [next, ...restQueue] = state.queue;
        return {
          visible: [...newVisible, next],
          queue: restQueue,
        };
      }
      return { ...state, visible: newVisible };
    }
    default:
      return state;
  }
}

// カスタムフック
function useToast() {
  const [state, dispatch] = useReducer(toastReducer, {
    visible: [],
    queue: [],
  });

  const addToast = useCallback((
    message: string,
    type: Toast['type'] = 'info',
    duration: number | null = 4000,
  ) => {
    const id = crypto.randomUUID();
    dispatch({ type: 'ADD', toast: { id, message, type, duration } });
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  return { toasts: state.visible, queueLength: state.queue.length, addToast, removeToast };
}`}
            />
          </section>

          {/* セクション7: アニメーション詳細 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">アニメーション: CSS transition vs Web Animations API</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Snackbar のアニメーションは、CSS transition だけでも十分実装できますが、
              Web Animations API を使うと JavaScript から直接制御でき、
              exit アニメーション完了後に DOM から削除するタイミングを正確に制御できます。
            </p>

            <CodeBlock
              language="tsx"
              title="Web Animations API による exit アニメーション"
              showLineNumbers
              code={`import { useRef, useCallback } from 'react';

function useExitAnimation() {
  const elementRef = useRef<HTMLDivElement>(null);

  const animateExit = useCallback((): Promise<void> => {
    const el = elementRef.current;
    if (!el) return Promise.resolve();

    // Web Animations API で exit アニメーションを実行
    const animation = el.animate(
      [
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: 'translateX(100%)' },
      ],
      {
        duration: 250,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards', // アニメーション終了状態を維持
      }
    );

    // Promise を返すので await で完了を待てる
    return animation.finished.then(() => undefined);
  }, []);

  return { elementRef, animateExit };
}

// 使用例
function SnackbarItemWithAnimation({
  message,
  onRemove,
}: {
  message: string;
  onRemove: () => void;
}) {
  const { elementRef, animateExit } = useExitAnimation();

  const handleClose = async () => {
    await animateExit(); // アニメーション完了を待ってから
    onRemove();          // 親に削除を通知（DOM から除去される）
  };

  return (
    <div ref={elementRef} className="snackbar-item animate-slide-in">
      <span>{message}</span>
      <button onClick={handleClose}>閉じる</button>
    </div>
  );
}`}
            />

            <div className="overflow-x-auto mt-6 mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">特性</th>
                    <th className="text-left p-3 font-semibold text-foreground">CSS transition</th>
                    <th className="text-left p-3 font-semibold text-foreground">Web Animations API</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3">enter アニメーション</td>
                    <td className="p-3">簡単（CSS クラスの付け外し）</td>
                    <td className="p-3">簡単（animate メソッド）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">exit アニメーション</td>
                    <td className="p-3">やや面倒（完了タイミングの検知が必要）</td>
                    <td className="p-3">容易（animation.finished で await）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">途中キャンセル</td>
                    <td className="p-3">CSS クラスの付け替えで対応</td>
                    <td className="p-3">animation.cancel() で制御可能</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">ブラウザ対応</td>
                    <td className="p-3">全ブラウザ対応</td>
                    <td className="p-3">主要ブラウザ対応済み</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* セクション8: React での実装 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React での実装: Context + Portal パターン</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              アプリ全体から通知を発火できるようにするには、React Context でグローバルな通知システムを構築し、
              Portal で DOM ツリーの最上位にレンダリングするのが定石です。
            </p>

            <CodeBlock
              language="tsx"
              title="ToastContext の定義"
              showLineNumbers
              code={`// contexts/ToastContext.tsx
import { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';

// --- 型定義 ---
interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration: number | null;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  toast: (message: string, options?: Partial<Omit<Toast, 'id' | 'message'>>) => string;
  dismiss: (id: string) => void;
}

// --- Context ---
const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast は ToastProvider の内部で使用してください');
  return ctx;
}

// --- Reducer ---
type Action =
  | { type: 'ADD'; toast: Toast }
  | { type: 'REMOVE'; id: string };

function reducer(state: Toast[], action: Action): Toast[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.toast].slice(-5); // 最大 5 件
    case 'REMOVE':
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

// --- Provider ---
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, dispatch] = useReducer(reducer, []);

  const toast = useCallback((
    message: string,
    options: Partial<Omit<Toast, 'id' | 'message'>> = {},
  ) => {
    const id = crypto.randomUUID();
    dispatch({
      type: 'ADD',
      toast: {
        id,
        message,
        type: options.type ?? 'info',
        duration: options.duration ?? 4000,
        action: options.action,
      },
    });
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {createPortal(
        <ToastContainer toasts={toasts} onDismiss={dismiss} />,
        document.body
      )}
    </ToastContext.Provider>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="ToastContainer コンポーネント"
              showLineNumbers
              code={`// components/ToastContainer.tsx
function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      aria-live="polite"
      aria-relevant="additions"
      className="fixed bottom-6 right-6 z-[1400] flex flex-col gap-2 max-w-sm w-full"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

// 個々の Toast アイテム
function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // 自動消去
  useEffect(() => {
    if (toast.duration === null) return;
    const timer = setTimeout(() => handleDismiss(), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.duration]);

  const handleDismiss = async () => {
    // exit アニメーション
    if (ref.current) {
      await ref.current.animate(
        [
          { opacity: 1, transform: 'translateX(0)' },
          { opacity: 0, transform: 'translateX(100%)' },
        ],
        { duration: 200, easing: 'ease-out', fill: 'forwards' }
      ).finished;
    }
    onDismiss(toast.id);
  };

  // タイプに応じた色
  const colorMap = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-amber-600',
    info: 'bg-blue-600',
  };

  return (
    <div
      ref={ref}
      role="status"
      className={\`\${colorMap[toast.type]} text-white px-4 py-3 rounded-lg shadow-lg
        flex items-center gap-3 animate-slide-in-right\`}
    >
      <span className="flex-1 text-sm">{toast.message}</span>
      {toast.action && (
        <button
          onClick={toast.action.onClick}
          className="text-sm font-bold underline hover:no-underline"
        >
          {toast.action.label}
        </button>
      )}
      <button
        onClick={handleDismiss}
        aria-label="通知を閉じる"
        className="text-white/80 hover:text-white"
      >
        x
      </button>
    </div>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="使用例: 任意のコンポーネントから通知を発火"
              code={`import { useToast } from '@/contexts/ToastContext';

function SaveButton() {
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      toast('保存しました', { type: 'success' });
    } catch {
      toast('保存に失敗しました。もう一度お試しください。', {
        type: 'error',
        duration: null,  // 手動消去
      });
    }
  };

  return <button onClick={handleSave}>保存</button>;
}

// Undo 付きの例
function DeleteButton({ itemId }: { itemId: string }) {
  const { toast, dismiss } = useToast();

  const handleDelete = () => {
    const deletedItem = removeItem(itemId); // 楽観的削除

    toast('アイテムを削除しました', {
      type: 'info',
      duration: 6000,
      action: {
        label: '元に戻す',
        onClick: () => {
          restoreItem(deletedItem); // 復元処理
        },
      },
    });
  };

  return <button onClick={handleDelete}>削除</button>;
}`}
            />
          </section>

          {/* セクション9: アクセシビリティ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">アクセシビリティ対応</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Snackbar は視覚的な通知ですが、スクリーンリーダーのユーザーにも正しく情報を伝える必要があります。
              WAI-ARIA のライブリージョンを正しく使うことが鍵です。
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">aria-live="polite" と role="status"</h3>
                <p className="text-sm text-muted-foreground">
                  通常の通知には <code>aria-live="polite"</code>（または <code>role="status"</code>）を使います。
                  スクリーンリーダーが現在読み上げ中の内容を中断せず、読み終わってから通知を読み上げます。
                  成功メッセージや情報通知にはこちらが適切です。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">aria-live="assertive" と role="alert"</h3>
                <p className="text-sm text-muted-foreground">
                  緊急性の高い通知には <code>aria-live="assertive"</code>（または <code>role="alert"</code>）を使います。
                  現在の読み上げを中断して即座に通知を読み上げます。
                  エラーメッセージやセキュリティに関する警告など、本当に緊急の場合のみ使用してください。
                  乱用するとユーザー体験を著しく損ないます。
                </p>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="アクセシビリティ対応の通知コンテナ"
              code={`// アクセシビリティのベストプラクティス
function AccessibleToastContainer({ toasts }: { toasts: Toast[] }) {
  // ライブリージョンのコンテナは常に DOM に存在させる
  // （動的に追加するとスクリーンリーダーが認識しない場合がある）
  return (
    <>
      {/* 通常の通知用 */}
      <div
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions"
        className="fixed bottom-6 right-6 z-[1400] flex flex-col gap-2"
      >
        {toasts
          .filter((t) => t.type !== 'error')
          .map((t) => (
            <div key={t.id} role="status">
              {t.message}
            </div>
          ))}
      </div>

      {/* 緊急通知用（エラーなど） */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="fixed top-6 right-6 z-[1400] flex flex-col gap-2"
      >
        {toasts
          .filter((t) => t.type === 'error')
          .map((t) => (
            <div key={t.id} role="alert">
              {t.message}
            </div>
          ))}
      </div>
    </>
  );
}

// 重要: キーボードでアクションボタンに到達できること
function ToastWithAction({ message, actionLabel, onAction, onClose }: {
  message: string;
  actionLabel: string;
  onAction: () => void;
  onClose: () => void;
}) {
  return (
    <div role="status" aria-live="polite">
      <span>{message}</span>
      {/* Tab キーでフォーカス可能 */}
      <button onClick={onAction}>{actionLabel}</button>
      <button onClick={onClose} aria-label="通知を閉じる">x</button>
    </div>
  );
}`}
            />

            <InfoBox type="warning" title="aria-live の注意点">
              <ul className="list-disc pl-4 space-y-1">
                <li><code>aria-live</code> のコンテナは初回レンダリング時に DOM に存在している必要がある。動的に生成すると一部のスクリーンリーダーで認識されない</li>
                <li><code>aria-live="assertive"</code> を多用すると、スクリーンリーダーユーザーの操作が頻繁に中断され、深刻なユーザビリティの低下を招く</li>
                <li>自動消去する場合でも、通知内容をスクリーンリーダーが読み上げる十分な時間を確保する（最低 5 秒程度）</li>
                <li>Undo ボタンなどのアクションはキーボードでフォーカス可能かつ操作可能であること</li>
              </ul>
            </InfoBox>
          </section>

          {/* セクション10: アンチパターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">よくあるアンチパターン</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Toast / Snackbar は便利ですが、誤った使い方をすると逆にユーザー体験を損ないます。
              以下のアンチパターンを避けましょう。
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-lg border-2 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">1. Toast の大量連発</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  ループ処理の中で Toast を発火し、一度に数十件の通知が表示されるケース。
                  画面を埋め尽くすだけでなく、スクリーンリーダーも混乱する。
                </p>
                <CodeBlock
                  language="tsx"
                  title="NG: ループ内で個別に Toast を発火"
                  code={`// やってはいけない
async function uploadFiles(files: File[]) {
  for (const file of files) {
    await upload(file);
    toast(\`\${file.name} をアップロードしました\`); // 10件あれば10回発火
  }
}

// 改善: まとめて1回の通知にする
async function uploadFiles(files: File[]) {
  const results = await Promise.allSettled(files.map(upload));
  const success = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.length - success;
  toast(\`\${success} 件アップロード完了\${failed > 0 ? \`（\${failed} 件失敗）\` : ''}\`);
}`}
                />
              </div>

              <div className="p-4 rounded-lg border-2 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">2. 重要情報を Toast だけで伝える</h3>
                <p className="text-sm text-muted-foreground">
                  バリデーションエラーや決済結果など、ユーザーが確実に確認すべき情報を自動消去の Toast だけで表示するのは危険。
                  数秒で消えてしまい、ユーザーが見逃す可能性が高い。
                  重要な情報はインライン表示（フォームのエラーメッセージ）やダイアログで伝え、
                  Toast は補助的な通知に留める。
                </p>
              </div>

              <div className="p-4 rounded-lg border-2 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">3. 操作を阻害する位置に表示</h3>
                <p className="text-sm text-muted-foreground">
                  送信ボタンの真上に Toast を表示して、次の操作がクリックできなくなるケース。
                  Toast はユーザーの操作動線を邪魔しない位置に配置し、
                  <code>pointer-events: none</code> をコンテナに設定して、
                  Toast の下にある要素をクリック可能にする工夫が必要。
                </p>
              </div>

              <div className="p-4 rounded-lg border-2 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">4. エラーを自動消去する</h3>
                <p className="text-sm text-muted-foreground">
                  API エラーやネットワークエラーの通知が 3 秒で消えてしまい、
                  ユーザーがエラー内容を把握できない。エラーは基本的に手動消去とし、
                  ユーザーが問題を認識してから閉じられるようにする。
                </p>
              </div>

              <div className="p-4 rounded-lg border-2 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">5. 文脈のない汎用メッセージ</h3>
                <p className="text-sm text-muted-foreground">
                  「エラーが発生しました」「成功しました」のような、何に対するフィードバックか分からないメッセージ。
                  「プロフィール画像を更新しました」「メールの送信に失敗しました」のように、
                  具体的な操作対象を含めることでユーザーの理解度が大きく向上する。
                </p>
              </div>
            </div>
          </section>

          {/* 理解度チェック 1 */}
          <section>
            <Quiz
              question="aria-live='assertive' を使うべきケースはどれですか？"
              options={[
                { label: 'ファイルの保存が完了したとき' },
                { label: 'ユーザーのセッションが期限切れになり、データが失われる可能性があるとき', correct: true },
                { label: '新しいコメントが投稿されたとき' },
                { label: 'ダークモードに切り替わったとき' },
              ]}
              explanation="aria-live='assertive' はスクリーンリーダーの現在の読み上げを中断して即座に通知を読み上げます。セッション期限切れのように、ユーザーが即座に行動しないとデータを失う可能性がある緊急の場面でのみ使用すべきです。通常の成功通知や情報通知には aria-live='polite' を使います。"
            />
          </section>

          {/* 理解度チェック 2 */}
          <section>
            <Quiz
              question="エラーメッセージの Snackbar に適切な自動消去の設定はどれですか？"
              options={[
                { label: '3 秒で自動消去する' },
                { label: '5 秒で自動消去する' },
                { label: '10 秒で自動消去する' },
                { label: '自動消去せず、ユーザーが手動で閉じる', correct: true },
              ]}
              explanation="エラーメッセージはユーザーが内容を確認し、対処方法を理解する時間が必要です。自動消去すると、ユーザーがエラーの原因を把握できないまま通知が消えてしまいます。エラーは手動消去を基本とし、ユーザーが「了解した」と判断してから閉じられるようにすべきです。"
            />
          </section>

          {/* コーディングチャレンジ */}
          <section>
            <CodingChallenge
              preview={true}
              title="Toast の型定義と Reducer を実装しよう"
              description="通知システムの核となる型定義と Reducer を完成させてください。Toast 型には id (string), message (string), type ('success' | 'error' | 'info'), duration (number | null) を定義します。Reducer は ADD アクションで通知を配列の末尾に追加し、REMOVE アクションで指定 id の通知を除外してください。"
              initialCode={`// Toast の型を定義してください
interface Toast {
  // ここに型を定義
}

type Action =
  | { type: 'ADD'; toast: Toast }
  | { type: 'REMOVE'; id: string };

function toastReducer(state: Toast[], action: Action): Toast[] {
  // ここに Reducer のロジックを実装
}`}
              answer={`interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration: number | null;
}

type Action =
  | { type: 'ADD'; toast: Toast }
  | { type: 'REMOVE'; id: string };

function toastReducer(state: Toast[], action: Action): Toast[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.toast];
    case 'REMOVE':
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}`}
              keywords={[
                'id: string',
                'message: string',
                "| 'error'",
                'duration:',
                'case \'ADD\'',
                'case \'REMOVE\'',
                '...state',
                'action.toast',
                'filter',
              ]}
              hints={[
                'Toast の type フィールドはユニオン型（リテラル型の OR）で定義します',
                'duration が null の場合は「自動消去しない」を意味します',
                'ADD では スプレッド構文で既存の配列に新しい要素を追加します',
                'REMOVE では filter メソッドで該当 id 以外の要素を残します',
              ]}
            />
          </section>

          {/* まとめ */}
          <section>
            <InfoBox type="success" title="このステップのまとめ">
              <ul className="list-disc pl-4 space-y-1">
                <li>Snackbar / Toast は操作結果の一時通知、Notification は重要度の高い永続通知として使い分ける</li>
                <li>アニメーションは enter 300ms / exit 200ms 程度を目安に、cubic-bezier イージングを使う</li>
                <li>配置は用途に応じて選択する。操作フィードバックは bottom-center、複数通知は top-right が一般的</li>
                <li>エラーは手動消去、成功は 3 秒、アクション付きは 5 - 8 秒を目安にタイマーを設定する</li>
                <li>React では Context + Portal + useReducer で通知システムを構築する</li>
                <li>aria-live="polite" を基本とし、緊急時のみ "assertive" を使う</li>
                <li>大量連発、重要情報の Toast 依存、操作阻害の位置は避ける</li>
              </ul>
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
