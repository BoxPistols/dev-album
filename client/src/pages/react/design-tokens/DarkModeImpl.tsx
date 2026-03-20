import CodeBlock from "@/components/CodeBlock";
import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import CodingChallenge from "@/components/CodingChallenge";
import ReferenceLinks from "@/components/ReferenceLinks";

export default function DarkModeImpl() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 72</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          ダークモードの実装
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          CSS 変数によるテーマ切替、React での ThemeProvider
          パターン、色設計の注意点、フォーム要素の対応、テストとデバッグ手法を網羅的に扱う。
          デザイナーとエンジニアの双方が参照できる実装ガイドとして構成する。
        </p>

        <WhyNowBox
          tags={[
            "CSS変数",
            "ThemeProvider",
            "ダークモード",
            "WCAG",
            "FOUC対策",
          ]}
        >
          <p>
            STEP 70 でダークモードの必要性を、STEP 71
            でデザイントークンの設計を学んだ。
            このステップでは、それらの知識を統合して「動くダークモード」を実装する。
            CSS 変数の定義だけでは不十分で、JavaScript
            による切替ロジック、localStorage への永続化、 FOUC（Flash of
            Unstyled Content）対策まで含めて初めて実用的なダークモードになる。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ──────────────────────────────────────────── */}
          {/* セクション1: CSS 変数によるテーマ切替の基本 */}
          {/* ──────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              1. CSS 変数によるテーマ切替の基本
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ダークモード実装の基盤は CSS カスタムプロパティ（CSS
              変数）にある。
              <code>:root</code> にライトモードの値を定義し、<code>.dark</code>{" "}
              クラスでダークモードの値を上書きする。 この方式なら、JavaScript
              側はクラスの付け外しだけで済む。
            </p>

            <CodeBlock
              language="css"
              title="テーマ用 CSS 変数の定義"
              code={`/* styles/theme.css */

/* ライトモード（デフォルト） */
:root {
  --color-bg: #FFFFFF;
  --color-bg-card: #F8FAFC;
  --color-bg-muted: #F1F5F9;
  --color-text: #1E293B;
  --color-text-muted: #64748B;
  --color-border: #E2E8F0;
  --color-primary: #3B82F6;
  --color-shadow: rgba(0, 0, 0, 0.08);
}

/* ダークモード */
.dark {
  --color-bg: #151D2B;
  --color-bg-card: #1C2536;
  --color-bg-muted: #243044;
  --color-text: #CDD5E0;
  --color-text-muted: #8B95A5;
  --color-border: #2D3B4F;
  --color-primary: #60A5FA;
  --color-shadow: rgba(0, 0, 0, 0.3);
}

/* CSS 変数を使ったスタイル定義 */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: background-color 0.2s, color 0.2s;
}

.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  box-shadow: 0 1px 3px var(--color-shadow);
}`}
            />

            <p className="text-muted-foreground mb-4 leading-relaxed mt-6">
              OS のシステム設定に追従させるには、
              <code>prefers-color-scheme</code> メディアクエリを使う。
              ただし、ユーザーが手動で切り替えた設定を優先する場合は、
              <code>.dark</code> クラス方式と組み合わせる必要がある。
            </p>

            <CodeBlock
              language="css"
              title="メディアクエリによるシステム設定への追従"
              code={`/* .dark クラスがなく、かつ OS がダークモードの場合に適用 */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --color-bg: #151D2B;
    --color-bg-card: #1C2536;
    --color-bg-muted: #243044;
    --color-text: #CDD5E0;
    --color-text-muted: #8B95A5;
    --color-border: #2D3B4F;
    --color-primary: #60A5FA;
    --color-shadow: rgba(0, 0, 0, 0.3);
  }
}`}
            />

            <p className="text-muted-foreground mb-4 leading-relaxed mt-6">
              JavaScript からテーマを手動で切り替えるには、
              <code>classList.toggle</code> と <code>localStorage</code>{" "}
              を組み合わせる。
            </p>

            <CodeBlock
              language="js"
              title="JavaScript での手動テーマ切替"
              code={`// テーマの初期化（ページ読み込み時）
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (saved === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    // 保存値がない → システム設定に従う
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }
}

// テーマの手動切替
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// システム設定の変更を監視
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      // ユーザーが手動設定していない場合のみ追従
      document.documentElement.classList.toggle('dark', e.matches);
    }
  });`}
            />

            <InfoBox type="info" title="CSS 変数方式の利点">
              <p>
                CSS 変数方式では、テーマの色定義が CSS
                に集約されるため、JavaScript は<code>classList</code>{" "}
                の操作だけを担当する。 色の追加・変更は CSS
                ファイルの編集だけで完結し、JavaScript の修正は不要になる。
              </p>
            </InfoBox>
          </section>

          {/* ──────────────────────────────────────────── */}
          {/* セクション2: React でのダークモード実装 */}
          {/* ──────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              2. React でのダークモード実装
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React アプリでは、Context API を使った ThemeProvider
              パターンが標準的な手法となる。 System（OS 追従）/ Light / Dark の
              3 モードを提供し、localStorage で永続化する。
            </p>

            <CodeBlock
              language="tsx"
              title="ThemeProvider の完全実装"
              code={`// contexts/ThemeContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

type Theme = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

// OS のカラースキーム設定を取得
function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

// テーマの保存値を取得
function getSavedTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem('theme') as Theme) ?? 'system';
}

// テーマに応じてクラスを適用
function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getSavedTheme);
  const [resolvedTheme, setResolvedTheme] =
    useState<ResolvedTheme>(() =>
      getSavedTheme() === 'system'
        ? getSystemTheme()
        : (getSavedTheme() as ResolvedTheme)
    );

  // テーマ変更時の処理
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    const resolved =
      newTheme === 'system' ? getSystemTheme() : newTheme;
    setResolvedTheme(resolved);
    applyTheme(resolved);
  };

  // 初回マウント時にテーマを適用
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  // OS 設定の変更を監視
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const resolved = e.matches ? 'dark' : 'light';
        setResolvedTheme(resolved);
        applyTheme(resolved);
      }
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// カスタム Hook
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme は ThemeProvider 内で使用してください');
  }
  return ctx;
}`}
            />

            <CodeBlock
              language="tsx"
              title="テーマ切替 UI コンポーネント"
              code={`// components/ThemeToggle.tsx
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

const options = [
  { value: 'light' as const, icon: Sun, label: 'ライト' },
  { value: 'dark' as const, icon: Moon, label: 'ダーク' },
  { value: 'system' as const, icon: Monitor, label: 'システム' },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-1 p-1 rounded-lg bg-muted">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={\`flex items-center gap-1.5 px-3 py-1.5
            rounded-md text-sm transition-all
            \${theme === value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
            }\`}
          aria-label={\`\${label}モードに切替\`}
        >
          <Icon size={14} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}`}
            />

            <p className="text-muted-foreground mb-4 leading-relaxed mt-6">
              Tailwind CSS を使う場合は <code>dark:</code>{" "}
              プレフィックスで各モードのスタイルを定義する。 Tailwind v4 では{" "}
              <code>@custom-variant</code> で <code>.dark</code>{" "}
              クラス方式を指定する。
            </p>

            <CodeBlock
              language="css"
              title="Tailwind v4 での dark モード設定"
              code={`/* src/index.css */
@import "tailwindcss";

/* class 戦略: <html class="dark"> でダークモードを切り替え */
@custom-variant dark (&:where(.dark, .dark *));`}
            />

            <CodeBlock
              language="tsx"
              title="Tailwind dark: プレフィックスの使用例"
              code={`function Card({ title, description }: CardProps) {
  return (
    <div className="bg-white dark:bg-slate-800
                    border border-slate-200 dark:border-slate-700
                    rounded-xl p-6 shadow-sm dark:shadow-none">
      <h3 className="text-slate-900 dark:text-slate-100
                     font-semibold text-lg">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mt-2">
        {description}
      </p>
    </div>
  );
}`}
            />
          </section>

          {/* ──────────────────────────────────────────── */}
          {/* セクション3: ダークモードでの色設計の注意点 */}
          {/* ──────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3. ダークモードでの色設計の注意点
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ダークモードは「色の反転」ではない。単純に白と黒を入れ替えると、コントラストが強すぎて目が疲れる。
              以下の原則に従って色を設計する。
            </p>

            <InfoBox type="warning" title="単純な反転は NG">
              <p>
                <code>#FFFFFF</code> → <code>#000000</code> の反転は避ける。
                純黒の背景に純白のテキストはコントラスト比が 21:1
                になり、長時間の閲覧で目が疲れる（ハレーション）。 推奨は背景{" "}
                <code>#151D2B</code>、テキスト <code>#CDD5E0</code>
                （コントラスト比 9.5:1）のように、
                少し彩度を加えた暗色と、やや抑えた明色の組み合わせ。
              </p>
            </InfoBox>

            <CodeBlock
              language="css"
              title="Surface の階層設計"
              code={`/* ダークモードの Surface 階層 */
/* 奥（暗い）→ 手前（明るい）の順に明度を上げる */
.dark {
  /* Level 0: 全体背景 */
  --color-bg:       #151D2B;

  /* Level 1: カード・セクション */
  --color-bg-card:  #1C2536;

  /* Level 2: ホバー・アクティブ領域 */
  --color-bg-muted: #243044;

  /* Level 3: 選択中・ハイライト */
  --color-bg-elevated: #2D3B4F;
}

/*
  Material Design の Elevation 方式:
  ダークモードではシャドウが見えにくいため、
  高い Elevation = より明るい Surface で表現する。

  Elevation 0  → #151D2B（最も暗い）
  Elevation 1  → #1C2536
  Elevation 2  → #243044
  Elevation 3  → #2D3B4F
  Elevation 4+ → #354257
*/`}
            />

            <CodePreview
              language="tsx"
              title="ライト / ダーク切替デモ"
              previewOnly
              previewHeight={380}
              code={`function App() {
  const [isDark, setIsDark] = React.useState(true);
  const t = isDark
    ? { bg: '#151D2B', card: '#1C2536', muted: '#243044', elevated: '#2D3B4F',
        text: '#CDD5E0', sub: '#8B95A5', border: '#2D3B4F', primary: '#60A5FA' }
    : { bg: '#FFFFFF', card: '#F8FAFC', muted: '#F1F5F9', elevated: '#E2E8F0',
        text: '#1E293B', sub: '#64748B', border: '#E2E8F0', primary: '#3B82F6' };

  return (
    <div style={{ background: t.bg, padding: 20, borderRadius: 12, transition: 'all 0.3s', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ color: t.text, fontWeight: 700, fontSize: 15 }}>Surface 階層デモ</span>
        <button onClick={() => setIsDark(!isDark)}
          style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid ' + t.border,
            background: t.card, color: t.text, cursor: 'pointer', fontSize: 13 }}>
          {isDark ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { label: 'Level 0: Background', bg: t.bg },
          { label: 'Level 1: Card', bg: t.card },
          { label: 'Level 2: Muted', bg: t.muted },
          { label: 'Level 3: Elevated', bg: t.elevated },
        ].map(item => (
          <div key={item.label} style={{ background: item.bg, border: '1px solid ' + t.border,
            padding: '12px 16px', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: t.text, fontSize: 13, fontWeight: 500 }}>{item.label}</span>
            <code style={{ color: t.sub, fontSize: 11, background: t.muted, padding: '2px 8px', borderRadius: 4 }}>{item.bg}</code>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: '12px 16px', background: t.card, borderRadius: 8, border: '1px solid ' + t.border }}>
        <p style={{ color: t.text, fontSize: 13, margin: '0 0 4px', fontWeight: 600 }}>画像の明度調整</p>
        <p style={{ color: t.sub, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
          ダークモードでは明るい画像が目に刺さる。<code style={{ background: t.muted, padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>
          opacity: 0.8</code> または <code style={{ background: t.muted, padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>
          filter: brightness(0.9)</code> を適用する。
        </p>
      </div>
    </div>
  );
}`}
            />

            <CodeBlock
              language="css"
              title="画像のダークモード対応"
              code={`/* ダークモードでの画像の明度調整 */
.dark img:not([data-no-dim]) {
  opacity: 0.85;
  transition: opacity 0.2s;
}
.dark img:not([data-no-dim]):hover {
  opacity: 1; /* ホバー時は元の明度に戻す */
}

/* ロゴやアイコンなど暗くしたくない画像 */
/* <img data-no-dim src="logo.svg" /> */

/* 別の手法: brightness フィルター */
.dark .hero-image {
  filter: brightness(0.9) saturate(0.95);
}`}
            />
          </section>

          {/* ──────────────────────────────────────────── */}
          {/* セクション4: フォーム要素のダークモード対応 */}
          {/* ──────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              4. フォーム要素のダークモード対応
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              フォーム要素（input、select、textarea）はブラウザのデフォルトスタイルが強く、
              CSS 変数の適用だけでは不十分な場合がある。
              <code>appearance: none</code>{" "}
              の使用と、各状態（placeholder、focus、disabled）の色を明示的に定義する。
            </p>

            <CodeBlock
              language="css"
              title="フォーム要素のダークモード CSS"
              code={`/* フォーム要素の基本スタイル */
input,
select,
textarea {
  background-color: var(--color-bg-card);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
}

/* placeholder の色 */
input::placeholder,
textarea::placeholder {
  color: var(--color-text-muted);
  opacity: 0.7;
}

/* フォーカスリング */
input:focus,
select:focus,
textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}
.dark input:focus,
.dark select:focus,
.dark textarea:focus {
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}

/* select のカスタマイズ */
select {
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* 矢印アイコン */
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}

/* disabled 状態 */
input:disabled,
select:disabled,
textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ブラウザの autofill スタイルを上書き */
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px var(--color-bg-card) inset;
  -webkit-text-fill-color: var(--color-text);
}`}
            />

            <InfoBox type="warning" title="appearance: none の注意点">
              <p>
                <code>appearance: none</code> は select 要素の矢印や checkbox
                のチェックマークなど、 ブラウザのデフォルト UI
                を完全に消去する。使用する場合は、矢印アイコンや
                チェック状態の視覚的フィードバックを自前で実装する必要がある。
                特に <code>select</code>{" "}
                要素では、矢印が消えると操作可能であることが伝わらなくなる。
              </p>
            </InfoBox>

            <CodePreview
              language="tsx"
              title="フォーム要素のダークモードデモ"
              previewOnly
              previewHeight={300}
              code={`function App() {
  const [isDark, setIsDark] = React.useState(true);
  const t = isDark
    ? { bg: '#151D2B', card: '#1C2536', text: '#CDD5E0', sub: '#8B95A5', border: '#2D3B4F', primary: '#60A5FA', ring: 'rgba(96,165,250,0.2)' }
    : { bg: '#FFFFFF', card: '#F8FAFC', text: '#1E293B', sub: '#94A3B8', border: '#E2E8F0', primary: '#3B82F6', ring: 'rgba(59,130,246,0.15)' };
  const base = { background: t.card, color: t.text, border: '1px solid ' + t.border, borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ background: t.bg, padding: 20, borderRadius: 12, fontFamily: 'system-ui', transition: 'all 0.3s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ color: t.text, fontWeight: 700, fontSize: 15 }}>フォーム要素</span>
        <button onClick={() => setIsDark(!isDark)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid ' + t.border, background: t.card, color: t.text, cursor: 'pointer', fontSize: 13 }}>
          {isDark ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={{ color: t.sub, fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>テキスト入力</label>
          <input style={base} placeholder="名前を入力..." onFocus={e => { e.target.style.borderColor = t.primary; e.target.style.boxShadow = '0 0 0 3px ' + t.ring; }} onBlur={e => { e.target.style.borderColor = t.border; e.target.style.boxShadow = 'none'; }} />
        </div>
        <div>
          <label style={{ color: t.sub, fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>セレクト</label>
          <select style={base}>
            <option>React</option><option>Vue</option><option>Angular</option>
          </select>
        </div>
        <div>
          <label style={{ color: t.sub, fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>テキストエリア</label>
          <textarea style={{ ...base, minHeight: 60, resize: 'vertical' }} placeholder="メッセージを入力..." onFocus={e => { e.target.style.borderColor = t.primary; e.target.style.boxShadow = '0 0 0 3px ' + t.ring; }} onBlur={e => { e.target.style.borderColor = t.border; e.target.style.boxShadow = 'none'; }} />
        </div>
      </div>
    </div>
  );
}`}
            />
          </section>

          {/* ──────────────────────────────────────────── */}
          {/* セクション5: テストとデバッグ */}
          {/* ──────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              5. テストとデバッグ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ダークモードの実装は「動作する」だけでなく、ライト/ダーク両方で視覚的に正しいことを検証する必要がある。
              以下のツールと手法を活用する。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
              Chrome DevTools でのテーマ強制切替
            </h3>
            <CodeBlock
              language="bash"
              title="DevTools での操作手順"
              code={`# Chrome DevTools でダークモードを強制する手順:
# 1. DevTools を開く（F12 または Cmd+Opt+I）
# 2. Cmd+Shift+P でコマンドパレットを開く
# 3. "Rendering" と入力して Rendering パネルを表示
# 4. "Emulate CSS media feature prefers-color-scheme" を設定
#    → "prefers-color-scheme: dark" を選択
#
# これにより、OS 設定を変更せずにダークモードをテストできる`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
              Storybook でのテーマ並列確認
            </h3>
            <CodeBlock
              language="tsx"
              title="Storybook のデコレータでテーマを切替"
              code={`// .storybook/preview.tsx
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#151D2B' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const bg = context.globals.backgrounds?.value;
      const isDark = bg === '#151D2B';

      // <html> にクラスを付与してテーマを切替
      document.documentElement.classList.toggle(
        'dark',
        isDark
      );

      return <Story />;
    },
  ],
};

export default preview;`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
              WCAG コントラストチェック
            </h3>
            <CodeBlock
              language="tsx"
              title="コントラスト比の計算ユーティリティ"
              code={`// utils/contrast.ts

// 相対輝度を計算（WCAG 2.1 準拠）
function luminance(hex: string): number {
  const rgb = hex.match(/[A-Fa-f0-9]{2}/g)!.map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

// コントラスト比を算出
export function contrastRatio(fg: string, bg: string): number {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// 使用例
const ratio = contrastRatio('#CDD5E0', '#151D2B');
console.log(ratio.toFixed(1)); // → "9.5"
// WCAG AA: 4.5:1 以上 → 合格
// WCAG AAA: 7:1 以上 → 合格`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
              prefers-reduced-motion との組み合わせ
            </h3>
            <CodeBlock
              language="css"
              title="テーマ切替トランジションと reduced-motion"
              code={`/* テーマ切替時のトランジション */
body {
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* reduced-motion が有効な場合はトランジションを無効化 */
@media (prefers-reduced-motion: reduce) {
  body,
  body * {
    transition-duration: 0.01ms !important;
  }
}`}
            />

            <InfoBox type="info" title="テスト観点のチェックリスト">
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>ライト → ダーク → ライト の往復で表示が崩れないこと</li>
                <li>
                  ページリロード後にテーマが保持されること（localStorage）
                </li>
                <li>OS 設定を変更したとき、system モードが追従すること</li>
                <li>
                  すべてのテキストが WCAG
                  AA（4.5:1）以上のコントラスト比を満たすこと
                </li>
                <li>
                  フォーカスリング、placeholder、disabled
                  状態が両テーマで見えること
                </li>
              </ul>
            </InfoBox>
          </section>

          {/* ──────────────────────────────────────────── */}
          {/* セクション6: よくある落とし穴 */}
          {/* ──────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              6. よくある落とし穴
            </h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              ハードコード色の残存
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              CSS 変数に統一したつもりでも、<code>#fff</code> や{" "}
              <code>#333</code> がコード中に残っているケースがある。 grep
              でハードコード色を検出し、CSS 変数に置き換える。
            </p>
            <CodeBlock
              language="bash"
              title="ハードコード色の検出"
              code={`# プロジェクト内のハードコード色を検出
grep -rn --include="*.css" --include="*.tsx" --include="*.ts" \\
  -E '#[0-9a-fA-F]{3,8}' src/ \\
  | grep -v 'node_modules' \\
  | grep -v '.css-variable'

# Tailwind のクラス名に直接色を書いているケースも検出
grep -rn 'bg-\\[#' src/
grep -rn 'text-\\[#' src/`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">
              iframe 内のテーマ非追従
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              iframe は親ドキュメントの CSS を継承しない。srcDoc を使う場合は、
              iframe 内の HTML にもテーマクラスを渡す必要がある。
            </p>
            <CodeBlock
              language="tsx"
              title="iframe へのテーマ伝搬"
              code={`function ThemedIframe({ html, isDark }: {
  html: string;
  isDark: boolean;
}) {
  const srcDoc = \`
    <!DOCTYPE html>
    <html class="\${isDark ? 'dark' : ''}">
    <head>
      <style>
        :root {
          --color-bg: #FFFFFF;
          --color-text: #1E293B;
        }
        .dark {
          --color-bg: #151D2B;
          --color-text: #CDD5E0;
        }
        body {
          background: var(--color-bg);
          color: var(--color-text);
          margin: 0;
          font-family: system-ui;
        }
      </style>
    </head>
    <body>\${html}</body>
    </html>
  \`;

  return (
    <iframe
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      className="w-full h-full border-0"
    />
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">
              サードパーティコンポーネントの対応
            </h3>
            <CodeBlock
              language="css"
              title="サードパーティ UI への CSS 変数強制適用"
              code={`/* サードパーティコンポーネントが CSS 変数に対応していない場合、
   セレクタでスタイルを上書きする */

/* 例: react-datepicker のダークモード対応 */
.dark .react-datepicker {
  background-color: var(--color-bg-card);
  border-color: var(--color-border);
  color: var(--color-text);
}

.dark .react-datepicker__header {
  background-color: var(--color-bg-muted);
  border-bottom-color: var(--color-border);
}

.dark .react-datepicker__day:hover {
  background-color: var(--color-bg-elevated);
}

/* 例: react-select のダークモード対応 */
.dark .react-select__control {
  background-color: var(--color-bg-card);
  border-color: var(--color-border);
}

.dark .react-select__menu {
  background-color: var(--color-bg-card);
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">
              FOUC（Flash of Unstyled Content）対策
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ページ読み込み時に一瞬ライトモードが見えてからダークモードに切り替わる現象を
              FOUC と呼ぶ。 React の hydration を待たずに、
              <code>&lt;head&gt;</code>{" "}
              内のインラインスクリプトでクラスを先行付与する。
            </p>
            <CodeBlock
              language="html"
              title="FOUC 対策: head 内のインラインスクリプト"
              code={`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <!--
    このスクリプトは CSS より前に実行される。
    React の hydration を待たずにクラスを付与することで
    FOUC を完全に防止する。
  -->
  <script>
    (function() {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (theme !== 'light') {
        // 保存値がない場合は OS 設定に従う
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        }
      }
    })();
  </script>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/main.tsx"></script>
</body>
</html>`}
            />

            <InfoBox type="error" title="FOUC は UX を大きく損なう">
              <p>
                FOUC
                が発生すると、ダークモードのユーザーはページ遷移のたびに白い画面がフラッシュする。
                これは暗い環境での使用時に特に不快で、アプリケーションの品質感を下げる要因になる。
                <code>&lt;head&gt;</code>{" "}
                内のインラインスクリプトによる先行付与は、 SPA・SSR
                を問わず必須の対策となる。
              </p>
            </InfoBox>
          </section>

          {/* ──────────────────────────────────────────── */}
          {/* Quiz */}
          {/* ──────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              理解度チェック
            </h2>

            <Quiz
              question="ダークモードの背景色に #000000（純黒）を使うべきでない理由として、最も適切なのはどれか？"
              options={[
                { label: "ブラウザの互換性が低いため" },
                { label: "CSS 変数では #000000 を定義できないため" },
                {
                  label:
                    "テキストとのコントラスト比が高すぎて目が疲れるため（ハレーション）",
                  correct: true,
                },
                {
                  label:
                    "ダークモードでは RGB ではなく HSL を使う規約があるため",
                },
              ]}
              explanation="純黒（#000000）と純白（#FFFFFF）の組み合わせはコントラスト比 21:1 になり、長時間の閲覧で目が疲れる。推奨は #151D2B のように少し彩度を加えた暗色を背景に使い、コントラスト比を 8:1 〜 12:1 程度に抑えること。"
            />

            <Quiz
              question="FOUC（Flash of Unstyled Content）を防止するために、テーマクラスの付与はどのタイミングで行うべきか？"
              options={[
                { label: "React の useEffect 内で行う" },
                { label: "CSS の @media クエリで自動的に行われるため不要" },
                {
                  label:
                    "<head> 内のインラインスクリプトで、CSS の読み込みより前に行う",
                  correct: true,
                },
                { label: "Service Worker で行う" },
              ]}
              explanation="React の useEffect はコンポーネントのマウント後（=画面描画後）に実行されるため、一瞬ライトモードが見えてしまう。<head> 内のインラインスクリプトは CSS の解析前に同期的に実行されるため、FOUC を完全に防止できる。"
            />
          </section>

          {/* ──────────────────────────────────────────── */}
          {/* CodingChallenge */}
          {/* ──────────────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              コーディングチャレンジ
            </h2>

            <CodingChallenge
              title="ThemeProvider の穴埋め"
              description="以下のコードの _____ 部分を埋めて、System / Light / Dark の 3 モードに対応した ThemeProvider を完成させてください。getSystemTheme() は OS のカラースキームに基づいて 'light' または 'dark' を返す関数です。"
              initialCode={`function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem('theme') ?? '_____'
  );

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    _____('theme', newTheme);
    const resolved =
      newTheme === 'system' ? _____ : newTheme;
    document.documentElement.classList.remove(
      'light', 'dark'
    );
    document.documentElement.classList._____(resolved);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`}
              answer={`function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem('theme') ?? 'system'
  );

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    const resolved =
      newTheme === 'system' ? getSystemTheme() : newTheme;
    document.documentElement.classList.remove(
      'light', 'dark'
    );
    document.documentElement.classList.add(resolved);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`}
              hints={[
                "保存値がない場合のデフォルトテーマは 'system'（OS 設定に追従）です。",
                "localStorage への保存は localStorage.setItem(key, value) です。",
                "OS のテーマを取得する関数名は getSystemTheme() です。",
                "クラスの追加は classList.add() を使います。",
              ]}
              keywords={[
                "system",
                "localStorage.setItem",
                "getSystemTheme()",
                "classList.add",
              ]}
            />
          </section>

          {/* ──────────────────────────────────────────── */}
          {/* ReferenceLinks */}
          {/* ──────────────────────────────────────────── */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title:
                    "A Complete Guide to Dark Mode on the Web - CSS-Tricks",
                  url: "https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/",
                  description:
                    "CSS 変数、メディアクエリ、JavaScript による切替の包括ガイド",
                },
                {
                  title: "prefers-color-scheme - MDN",
                  url: "https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-color-scheme",
                  description:
                    "OS のカラースキーム設定を検出するメディアクエリの仕様",
                },
                {
                  title: "Dark theme - Material Design",
                  url: "https://m2.material.io/design/color/dark-theme.html",
                  description: "Material Design のダークテーマ設計ガイドライン",
                },
                {
                  title: "Dark Mode - Tailwind CSS",
                  url: "https://tailwindcss.com/docs/dark-mode",
                  description:
                    "Tailwind CSS のダークモード設定と dark: プレフィックスの使い方",
                },
                {
                  title: "WebAIM Contrast Checker",
                  url: "https://webaim.org/resources/contrastchecker/",
                  description: "WCAG 基準のコントラスト比チェッカー",
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
