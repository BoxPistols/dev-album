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
          <span className="step-badge">STEP 26</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">レスポンシブとダークモード</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Tailwind CSS のレスポンシブブレイクポイントとダークモードを活用して、あらゆるデバイスと環境に対応する UI を作りましょう。
        </p>

        <WhyNowBox tags={['レスポンシブ', 'ダークモード', 'モバイルファースト', 'アニメーション']}>
          <p>
            現代の Web サイトでは、スマートフォンからデスクトップまで対応するレスポンシブデザインと、ダークモードへの対応が一般的になっています。
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
              以下のプレビューは Tailwind の実コンパイラで動いています。プレビュー中央のハンドルをドラッグして幅を変えると、
              <code>sm:</code>（640px）や <code>md:</code>（768px）の切り替わりを実際に確認できます。
            </p>

            <CodePreview
              language="tsx"
              title="レスポンシブなグリッドレイアウト"
              previewHeight={280}
              libs={['tailwind']}
              code={`function App() {
  // モバイル: 1列 → sm(640px〜): 2列 → md(768px〜): 3列
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      <div className="rounded-lg bg-white p-4 text-zinc-800 shadow-sm dark:bg-zinc-800 dark:text-zinc-100">カード 1</div>
      <div className="rounded-lg bg-white p-4 text-zinc-800 shadow-sm dark:bg-zinc-800 dark:text-zinc-100">カード 2</div>
      <div className="rounded-lg bg-white p-4 text-zinc-800 shadow-sm dark:bg-zinc-800 dark:text-zinc-100">カード 3</div>
    </div>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="レスポンシブなナビゲーション"
              previewHeight={240}
              libs={['tailwind']}
              code={`function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const link = 'text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100';

  // md 未満: ハンバーガー + 開閉メニュー / md 以上: 横並びナビのみ
  return (
    <header className="rounded-lg bg-white shadow-sm dark:bg-zinc-800">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">MyApp</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="rounded-md border border-zinc-300 px-3 py-1 text-lg text-zinc-700 md:hidden dark:border-zinc-600 dark:text-zinc-200"
        >
          ☰
        </button>
        <nav className="hidden gap-6 md:flex">
          <a href="#" className={link}>ホーム</a>
          <a href="#" className={link}>概要</a>
          <a href="#" className={link}>お問い合わせ</a>
        </nav>
      </div>
      {isOpen && (
        <nav className="flex flex-col gap-1 px-4 pb-3 md:hidden">
          <a href="#" className={link + ' block py-2'}>ホーム</a>
          <a href="#" className={link + ' block py-2'}>概要</a>
          <a href="#" className={link + ' block py-2'}>お問い合わせ</a>
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
              以下のデモのトグルボタンは <code>document.documentElement.classList.toggle('dark')</code> で
              html 要素の class を実際に切り替えており、<code>dark:</code> 付きのスタイルがまとめて反映されます。
            </p>

            <CodePreview
              language="tsx"
              title="ダークモードの基本"
              previewHeight={260}
              libs={['tailwind']}
              code={`function App() {
  // html 要素の .dark class を直接切り替える（class 戦略）
  const [isDark, setIsDark] = React.useState(
    () => document.documentElement.classList.contains('dark')
  );

  const toggle = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(document.documentElement.classList.contains('dark'));
  };

  return (
    <div className="rounded-lg bg-zinc-100 p-4 transition-colors duration-200 dark:bg-zinc-950">
      <button
        onClick={toggle}
        className="mb-3 rounded-lg border border-zinc-300 bg-white px-4 py-1.5 text-zinc-900 transition-colors duration-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
      >
        {isDark ? '🌙 ダーク' : '☀️ ライト'}
      </button>
      <div className="rounded-lg bg-white p-4 transition-colors duration-200 dark:bg-zinc-900">
        <h1 className="mb-1 text-xl font-bold text-zinc-900 dark:text-white">タイトル</h1>
        <p className="text-zinc-600 dark:text-zinc-400">説明テキスト</p>
      </div>
      <div className="mt-3 rounded-lg border border-zinc-200 bg-white p-4 transition-colors duration-200 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-zinc-900 dark:text-zinc-100">ボーダー付きカード</p>
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
              <code>animate-spin</code>・<code>animate-pulse</code>・<code>animate-bounce</code> は keyframes を書かずにそのまま使える内蔵アニメーションです。
              ホバー時の変化は <code>hover:</code> と <code>transition</code>・<code>duration-200</code> の組み合わせで実装します。
            </p>

            <CodePreview
              language="tsx"
              title="トランジションとアニメーション"
              previewHeight={220}
              libs={['tailwind']}
              code={`function App() {
  return (
    <div className="flex flex-col gap-4 p-2">
      <button className="self-start rounded-lg bg-blue-600 px-5 py-2 text-white transition duration-200 ease-out hover:scale-105 hover:bg-blue-700">
        ホバーで色とサイズが変化
      </button>

      <div className="flex items-center gap-4">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <span className="text-zinc-500 dark:text-zinc-400">読み込み中...</span>
      </div>

      <div className="flex gap-6">
        <span className="animate-pulse text-zinc-800 dark:text-zinc-200">パルス</span>
        <span className="animate-bounce text-zinc-800 dark:text-zinc-200">バウンス</span>
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
              previewHeight={560}
              libs={['tailwind']}
              code={`function App() {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Figma', level: 80 },
    { name: 'Tailwind CSS', level: 75 },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 font-sans dark:border-zinc-700">
      {/* ヘッダー */}
      <div className="flex items-center gap-4 bg-linear-to-r from-blue-500 to-violet-600 px-6 py-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 text-2xl text-white md:h-18 md:w-18">
          T
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-white md:text-2xl">田中 太郎</h1>
          <p className="mt-1 text-sm text-blue-100 md:text-base">フロントエンドエンジニア</p>
        </div>
      </div>

      {/* コンテンツ: モバイルは1列、md 以上で 2fr 1fr の2カラム */}
      <div className="grid grid-cols-1 gap-4 bg-zinc-50 p-5 transition-colors duration-200 md:grid-cols-[2fr_1fr] dark:bg-zinc-900">
        <div className="rounded-xl bg-white p-5 shadow-sm transition-colors duration-200 dark:bg-zinc-800">
          <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">自己紹介</h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            5年以上の Web 開発経験を持つフロントエンドエンジニアです。React と TypeScript を使った開発を専門としています。
          </p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm transition-colors duration-200 dark:bg-zinc-800">
          <h2 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-100">スキル</h2>
          <div className="flex flex-col gap-3">
            {skills.map(s => (
              <div key={s.name}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-zinc-800 dark:text-zinc-200">{s.name}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">{s.level}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-[width] duration-500 ease-out"
                    style={{ width: s.level + '%' }}
                  />
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
                このコンポーネントは <code>grid-cols-1 md:grid-cols-[2fr_1fr]</code> により、
                モバイルでは縦並び、768px 以上では 2:1 の横並びレイアウトになります（プレビューの幅ハンドルで確認できます）。
                配色は <code>dark:</code> プレフィックスでダークモードに対応し、<code>transition-colors</code> で切り替えを滑らかにしています。
                この「モバイルファースト + <code>dark:</code> プレフィックス」のパターンを基本にすれば、
                あらゆるデバイスとテーマに対応できます。
                スキルバーの幅だけは値が動的なため <code>style</code> で渡しています。
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
