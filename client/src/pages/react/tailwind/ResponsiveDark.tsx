import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function ResponsiveDark() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 23</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">レスポンシブとダークモード</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Tailwind CSS のレスポンシブブレイクポイントとダークモードを活用して、あらゆるデバイスと環境に対応する UI を作りましょう。
        </p>

        <WhyNowBox tags={['レスポンシブ', 'ダークモード', 'モバイルファースト', 'アニメーション']}>
          <p>
            現代の Web サイトでは、スマートフォンからデスクトップまで対応するレスポンシブデザインと、ダークモードへの対応が必須です。
            Tailwind CSS なら、メディアクエリを CSS ファイルに書く必要はありません。
            クラス名にプレフィックスを付けるだけで、画面サイズやカラーモードに応じたスタイルを適用できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: レスポンシブブレイクポイント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">レスポンシブブレイクポイント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tailwind には5つのブレイクポイントが用意されています。各プレフィックスは<strong>「その幅以上」</strong>を意味します。
            </p>

            <CodeBlock
              language="tsx"
              title="ブレイクポイント一覧"
              code={`// sm: 640px 以上  → スマートフォン横向き / 小型タブレット
// md: 768px 以上  → タブレット
// lg: 1024px 以上 → ノートPC
// xl: 1280px 以上 → デスクトップ
// 2xl: 1536px 以上 → 大画面ディスプレイ

// プレフィックスなし = モバイル（全画面サイズ）
// ↓ 画面が広くなるにつれて上書きされていく

<div className="text-sm md:text-base lg:text-lg">
  モバイル: 14px → タブレット: 16px → PC: 18px
</div>`}
            />

            <InfoBox type="info" title="モバイルファーストの考え方">
              <p>
                Tailwind はモバイルファーストです。プレフィックスなしのクラスがモバイルに適用され、
                <code>md:</code> や <code>lg:</code> をつけたクラスが大きな画面で上書きします。
                まずモバイルのデザインを書き、そこから画面が広くなったときの調整を追加していくのが正しい使い方です。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: レスポンシブの実践パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">レスポンシブの実践パターン</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              実際の UI でよく使うレスポンシブパターンを見ていきましょう。
            </p>

            <CodePreview
              language="tsx"
              title="レスポンシブなグリッドレイアウト"
              previewHeight={120}
              code={`function App() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      <div style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 8, boxShadow: 'var(--shadow)' }}>カード 1</div>
      <div style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 8, boxShadow: 'var(--shadow)' }}>カード 2</div>
      <div style={{ background: 'var(--bg-card)', padding: 16, borderRadius: 8, boxShadow: 'var(--shadow)' }}>カード 3</div>
    </div>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="レスポンシブなナビゲーション"
              previewHeight={200}
              code={`function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const linkStyle = { color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14 };

  return (
    <header style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow)', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>MyApp</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 10px', fontSize: 18, cursor: 'pointer', color: 'var(--text)' }}
        >
          ☰
        </button>
        <nav style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={linkStyle}>ホーム</a>
          <a href="#" style={linkStyle}>概要</a>
          <a href="#" style={linkStyle}>お問い合わせ</a>
        </nav>
      </div>
      {isOpen && (
        <nav style={{ padding: '0 16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <a href="#" style={{ ...linkStyle, display: 'block', padding: '8px 0' }}>ホーム</a>
          <a href="#" style={{ ...linkStyle, display: 'block', padding: '8px 0' }}>概要</a>
          <a href="#" style={{ ...linkStyle, display: 'block', padding: '8px 0' }}>お問い合わせ</a>
        </nav>
      )}
    </header>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="レスポンシブなパディングとフォントサイズ"
              code={`// セクションのレスポンシブ調整
<section className="px-4 md:px-8 lg:px-16 py-8 md:py-16">
  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-8">
    セクションタイトル
  </h2>
  <p className="text-base md:text-lg leading-relaxed max-w-prose">
    本文テキストもデバイスに合わせてサイズを調整します。
  </p>
</section>

// 表示/非表示の切り替え
<div className="hidden lg:block">PC でのみ表示されるサイドバー</div>
<div className="block lg:hidden">モバイルでのみ表示される要素</div>`}
            />
          </section>

          {/* セクション3: ダークモード */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ダークモード</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tailwind のダークモードは <code>dark:</code> プレフィックスで実現します。
              ライトモードとダークモードのスタイルを1つの要素に同時に記述できます。
            </p>

            <CodePreview
              language="tsx"
              title="ダークモードの基本"
              previewHeight={220}
              code={`function App() {
  const [isDark, setIsDark] = React.useState(false);
  const bg = isDark ? '#111827' : '#ffffff';
  const text = isDark ? '#ffffff' : '#111827';
  const sub = isDark ? '#9ca3af' : '#4b5563';
  const border = isDark ? '#374151' : '#e5e7eb';

  return (
    <div style={{ padding: 16 }}>
      <button
        onClick={() => setIsDark(!isDark)}
        style={{ marginBottom: 12, padding: '6px 16px', borderRadius: 8, border: '1px solid ' + border, background: isDark ? '#1f2937' : '#f3f4f6', color: text, cursor: 'pointer' }}
      >
        {isDark ? '🌙 ダーク' : '☀️ ライト'}
      </button>
      <div style={{ background: bg, padding: 16, borderRadius: 8, transition: 'all 0.3s' }}>
        <h1 style={{ color: text, fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>タイトル</h1>
        <p style={{ color: sub, margin: 0 }}>説明テキスト</p>
      </div>
      <div style={{ border: '1px solid ' + border, borderRadius: 8, padding: 16, marginTop: 12, background: bg, transition: 'all 0.3s' }}>
        <p style={{ color: text, margin: 0 }}>ボーダー付きカード</p>
      </div>
    </div>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="class 戦略の設定（CSS ファイル）"
              code={`/* src/index.css */
@import "tailwindcss";

/* class 戦略: <html class="dark"> で切り替え */
@custom-variant dark (&:where(.dark, .dark *));`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="ダークモードの切り替え機能"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    // ローカルストレージから復元、なければシステム設定を参照
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((prev) => !prev) };
}

// 使い方
function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800
                 hover:bg-gray-200 dark:hover:bg-gray-700
                 transition-colors"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}`}
            />
          </section>

          {/* セクション4: CSS 変数によるカスタムカラー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS 変数によるカスタムカラー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tailwind v4 では CSS 変数（カスタムプロパティ）を使って、独自のカラーパレットを定義できます。
              ダークモードとの組み合わせで、テーマの切り替えも簡単です。
            </p>

            <CodeBlock
              language="css"
              title="CSS 変数でカスタムテーマを定義"
              code={`/* src/index.css */
@import "tailwindcss";

@theme {
  /* ブランドカラー */
  --color-brand-50: #eff6ff;
  --color-brand-100: #dbeafe;
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;
  --color-brand-700: #1d4ed8;

  /* セマンティックカラー */
  --color-surface: #ffffff;
  --color-surface-secondary: #f9fafb;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
}

/* ダークモード用のカラー */
.dark {
  --color-surface: #111827;
  --color-surface-secondary: #1f2937;
  --color-text-primary: #f9fafb;
  --color-text-secondary: #9ca3af;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="カスタムカラーの使用"
              code={`// @theme で定義したカラーはクラス名として使える
<div className="bg-surface text-text-primary">
  <h1 className="text-brand-600">ブランドカラーの見出し</h1>
  <p className="text-text-secondary">セカンダリカラーのテキスト</p>
  <button className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded">
    ブランドボタン
  </button>
</div>`}
            />

            <InfoBox type="success" title="デザインシステムとの相性">
              <p>
                CSS 変数を使ったカスタムカラーは、Figma のデザイントークンと1対1で対応させることができます。
                デザインシステムで定義した色をそのまま Tailwind のクラス名として使えるため、
                デザインとコードの間の翻訳作業が大幅に削減されます。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: アニメーションユーティリティ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">アニメーションユーティリティ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tailwind には基本的なアニメーションとトランジションのユーティリティが用意されています。
              マイクロインタラクションの実装に便利です。
            </p>

            <CodePreview
              language="tsx"
              title="トランジションとアニメーション"
              previewHeight={220}
              css={`
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
@keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
`}
              code={`function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <button
        style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.transform = 'scale(1.05)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.transform = 'scale(1)'; }}
      >
        ホバーで色とサイズが変化
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 24, height: 24, border: '3px solid #3b82f6', borderTop: '3px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <span style={{ color: 'var(--text-muted)' }}>読み込み中...</span>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        <span style={{ animation: 'pulse 2s ease-in-out infinite' }}>パルス</span>
        <span style={{ animation: 'bounce 1s ease-in-out infinite' }}>バウンス</span>
      </div>
    </div>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="カスタムアニメーションの定義"
              code={`/* src/index.css */
@import "tailwindcss";

@theme {
  --animate-fade-in: fade-in 0.5s ease-out;
  --animate-slide-up: slide-up 0.3s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`}
            />

            <CodeBlock
              language="tsx"
              title="カスタムアニメーションの使用"
              code={`// @theme で定義したアニメーションを使う
<div className="animate-fade-in">フェードインする要素</div>
<div className="animate-slide-up">下からスライドする要素</div>`}
            />
          </section>

          {/* セクション6: 実践 — レスポンシブレイアウト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践：レスポンシブなプロフィールページ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまで学んだレスポンシブ、ダークモード、アニメーションを組み合わせた実践的な例を作りましょう。
            </p>

            <CodePreview
              language="tsx"
              title="ProfilePage.tsx"
              previewHeight={420}
              code={`function App() {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Figma', level: 80 },
    { name: 'Tailwind CSS', level: 75 },
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
      {/* ヘッダー */}
      <div style={{ background: 'linear-gradient(to right, #3b82f6, #7c3aed)', padding: '32px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#fff' }}>
          T
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#fff' }}>田中 太郎</h1>
          <p style={{ margin: '4px 0 0', color: '#dbeafe', fontSize: 16 }}>フロントエンドエンジニア</p>
        </div>
      </div>

      {/* コンテンツ */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, padding: 20, background: 'var(--bg-subtle)' }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow)' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700 }}>自己紹介</h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 14 }}>
            5年以上の Web 開発経験を持つフロントエンドエンジニアです。React と TypeScript を使った開発を専門としています。
          </p>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow)' }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 700 }}>スキル</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {skills.map(s => (
              <div key={s.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span style={{ color: 'var(--text)' }}>{s.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{s.level}%</span>
                </div>
                <div style={{ width: '100%', height: 8, background: 'var(--border)', borderRadius: 9999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: s.level + '%', background: '#3b82f6', borderRadius: 9999, transition: 'width 0.5s ease-out' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="success" title="レスポンシブ・ダークモードのポイント">
              <p>
                このコンポーネントは、モバイルでは縦並び、PC では横並びのレイアウトになります。
                ダークモードにも対応し、トランジションで切り替えアニメーションも付けています。
                実際のプロジェクトでも、この「モバイルファースト + <code>dark:</code> プレフィックス」のパターンを基本にすれば、
                あらゆるデバイスとテーマに対応できます。
              </p>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'レスポンシブデザイン - Tailwind CSS',
                  url: 'https://tailwindcss.com/docs/responsive-design',
                  description: 'ブレークポイントとモバイルファーストの設計',
                },
                {
                  title: 'ダークモード - Tailwind CSS',
                  url: 'https://tailwindcss.com/docs/dark-mode',
                  description: 'ダークモードのユーティリティ',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
