import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function MuiCustomization() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 30</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">MUI カスタマイズ</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          MUI のテーマシステムを使いこなし、ブランドに合わせた独自の UI を構築しましょう。パレット、タイポグラフィ、コンポーネントのオーバーライドまで詳しく解説します。
        </p>

        <WhyNowBox tags={['createTheme', 'パレット', 'タイポグラフィ', 'styleOverrides', 'デザイントークン']}>
          <p>
            MUI をデフォルトのまま使うと「Material Design そのまま」の見た目になります。
            しかし実際のプロジェクトでは、ブランドカラーやフォント、角丸のサイズなどをカスタマイズする必要があります。
            MUI のテーマシステムを使えば、1か所の設定変更ですべてのコンポーネントに反映できます。
            デザイナーが Figma で定義したデザイントークンを、コードに落とし込む方法を学びましょう。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: createTheme の基本 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">createTheme の基本</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>createTheme</code> は MUI のテーマをカスタマイズするための関数です。
              パレット、タイポグラフィ、コンポーネントスタイルなど、あらゆる設定をオブジェクトで渡します。
            </p>

            <CodeBlock
              language="tsx"
              title="テーマの構造"
              showLineNumbers
              code={`import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // カラーパレット
  palette: { /* ... */ },

  // フォント・文字サイズ
  typography: { /* ... */ },

  // 角丸・シャドウなどの形状
  shape: { borderRadius: 8 },

  // スペーシングの基準値（デフォルト: 8px）
  spacing: 8,

  // 個別のコンポーネントスタイル
  components: { /* ... */ },
});

export default theme;`}
            />
          </section>

          {/* セクション2: パレットのカスタマイズ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">パレットのカスタマイズ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              パレットはアプリ全体のカラーシステムです。
              primary、secondary、error などのカラーを設定すると、すべてのコンポーネントに反映されます。
            </p>

            <CodePreview
              language="tsx"
              title="パレットの設定"
              previewHeight={260}
              code={`function App() {
  const palette = {
    primary: { main: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
    secondary: { main: '#ec4899' },
    error: '#ef4444', warning: '#f59e0b', success: '#10b981', info: '#3b82f6',
  };
  const swatch = (color, label) => (
    React.createElement('div', { key: label, style: { display: 'flex', alignItems: 'center', gap: 8 } },
      React.createElement('div', { style: { width: 32, height: 32, borderRadius: 6, background: color, border: '1px solid rgba(0,0,0,0.08)' } }),
      React.createElement('span', { style: { fontSize: 13 } }, label),
      React.createElement('code', { style: { fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 } }, color)
    )
  );
  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <strong style={{ fontSize: 14 }}>Primary</strong>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {swatch(palette.primary.light, 'light')}
        {swatch(palette.primary.main, 'main')}
        {swatch(palette.primary.dark, 'dark')}
      </div>
      <strong style={{ fontSize: 14, marginTop: 8 }}>Secondary & Semantic</strong>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {swatch(palette.secondary.main, 'secondary')}
        {swatch(palette.error, 'error')}
        {swatch(palette.warning, 'warning')}
        {swatch(palette.success, 'success')}
        {swatch(palette.info, 'info')}
      </div>
    </div>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="ダークモードのパレット"
              previewHeight={200}
              code={`function App() {
  const [isDark, setIsDark] = React.useState(false);
  const bg = isDark ? '#0f172a' : '#f8fafc';
  const paper = isDark ? '#1e293b' : '#ffffff';
  const text = isDark ? '#f1f5f9' : '#1e293b';
  const sub = isDark ? '#94a3b8' : '#64748b';
  const primary = isDark ? '#818cf8' : '#6366f1';

  return (
    <div style={{ background: bg, padding: 20, borderRadius: 8, transition: 'all 0.3s', fontFamily: 'sans-serif' }}>
      <button
        onClick={() => setIsDark(!isDark)}
        style={{ background: primary, color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, cursor: 'pointer', marginBottom: 16, transition: 'background 0.3s' }}
      >
        {isDark ? '🌙 ダークモード' : '☀️ ライトモード'}
      </button>
      <div style={{ background: paper, padding: 16, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}>
        <h3 style={{ margin: '0 0 4px', color: text, fontSize: 18, fontWeight: 600 }}>MUI テーマ切替</h3>
        <p style={{ margin: 0, color: sub, fontSize: 14 }}>palette.mode で全コンポーネントがダークモードに対応します。</p>
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="light / dark の自動対応">
              <p>
                <code>mode: 'dark'</code> を設定するだけで、MUI の全コンポーネントがダークモードに対応します。
                背景色、テキスト色、ボーダー色などが自動的に調整されます。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: タイポグラフィのカスタマイズ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">タイポグラフィのカスタマイズ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              日本語プロジェクトではフォントの変更が必要です。
              各バリアント（h1〜h6、body1、body2 など）のスタイルも個別にカスタマイズできます。
            </p>

            <CodeBlock
              language="tsx"
              title="タイポグラフィの設定"
              showLineNumbers
              code={`const theme = createTheme({
  typography: {
    // ベースフォント
    fontFamily: [
      '"Noto Sans JP"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),

    // 見出し用のフォント設定
    h1: {
      fontSize: '2.5rem',
      fontWeight: 800,
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },

    // 本文
    body1: {
      fontSize: '1rem',
      lineHeight: 1.8,       // 日本語は行間を広めに
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.7,
    },

    // ボタンのテキスト
    button: {
      textTransform: 'none',  // 英字の大文字変換を無効化
      fontWeight: 600,
    },
  },
});`}
            />

            <InfoBox type="warning" title="textTransform: 'none' は重要">
              <p>
                MUI のデフォルトではボタンのテキストがすべて大文字（<code>SUBMIT</code>）になります。
                日本語環境では不自然なので、<code>textTransform: 'none'</code> の設定を忘れずに行いましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: コンポーネントのオーバーライド */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">コンポーネントのオーバーライド</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>components</code> プロパティを使うと、特定のコンポーネントのデフォルトスタイルやプロパティを一括で変更できます。
            </p>

            <CodeBlock
              language="tsx"
              title="styleOverrides でスタイルを変更"
              showLineNumbers
              code={`const theme = createTheme({
  components: {
    // Button のカスタマイズ
    MuiButton: {
      // デフォルトの props を変更
      defaultProps: {
        disableElevation: true,  // 影をなくす
        disableRipple: false,    // リップルは有効のまま
      },
      // スタイルのオーバーライド
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.9375rem',
          fontWeight: 600,
        },
        // バリアントごとのカスタマイズ
        containedPrimary: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },

    // TextField のカスタマイズ
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },

    // Card のカスタマイズ
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0,0,0,0.06)',
        },
      },
    },

    // Paper のカスタマイズ
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});`}
            />
          </section>

          {/* セクション5: styleOverrides vs sx vs styled */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">スタイリング手法の使い分け</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              MUI には複数のスタイリング方法があります。それぞれの特徴と適切な使い分けを理解しましょう。
            </p>

            <CodePreview
              language="tsx"
              title="3つのスタイリング手法"
              previewHeight={180}
              code={`function App() {
  const baseBtn = { border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#fff' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'sans-serif' }}>
      <div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>1. styleOverrides（全ボタン共通）</span>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <button style={{ ...baseBtn, background: '#6366f1' }}>角丸 8px</button>
          <button style={{ ...baseBtn, background: '#6366f1' }}>統一スタイル</button>
        </div>
      </div>
      <div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>2. sx prop（個別調整: mt, mb）</span>
        <div style={{ marginTop: 16, marginBottom: 8 }}>
          <button style={{ ...baseBtn, background: '#6366f1' }}>送信（mt:2, mb:1 相当）</button>
        </div>
      </div>
      <div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>3. styled()（再利用コンポーネント）</span>
        <div style={{ marginTop: 4 }}>
          <button
            style={{ ...baseBtn, background: 'linear-gradient(45deg, #6366f1, #ec4899)', padding: '12px 32px', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            グラデーションボタン
          </button>
        </div>
      </div>
    </div>
  );
}`}
            />

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">手法</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">適用範囲</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">使いどころ</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">styleOverrides</td>
                    <td className="py-3 px-4">グローバル</td>
                    <td className="py-3 px-4">全コンポーネントのデフォルトスタイル変更</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">sx prop</td>
                    <td className="py-3 px-4">個別</td>
                    <td className="py-3 px-4">1回限りのスタイル調整</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">styled()</td>
                    <td className="py-3 px-4">再利用可能</td>
                    <td className="py-3 px-4">カスタムコンポーネントの作成</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* セクション6: デザイントークン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デザイントークンと MUI</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Figma のデザイントークン（色、フォント、スペーシング等）を MUI テーマにマッピングする方法を見ていきましょう。
            </p>

            <CodeBlock
              language="tsx"
              title="デザイントークンからテーマを構築"
              showLineNumbers
              code={`// デザイントークン（Figma から書き出し）
const tokens = {
  colors: {
    brand: {
      primary: '#6366f1',
      secondary: '#ec4899',
      accent: '#06b6d4',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      500: '#64748b',
      700: '#334155',
      900: '#0f172a',
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  },
  typography: {
    fontFamily: '"Noto Sans JP", sans-serif',
    heading: { weight: 700 },
    body: { weight: 400 },
  },
  spacing: {
    unit: 8, // 基本単位
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
};

// トークンを MUI テーマに変換
const theme = createTheme({
  palette: {
    primary: { main: tokens.colors.brand.primary },
    secondary: { main: tokens.colors.brand.secondary },
    error: { main: tokens.colors.semantic.error },
    warning: { main: tokens.colors.semantic.warning },
    success: { main: tokens.colors.semantic.success },
    background: {
      default: tokens.colors.neutral[50],
      paper: '#ffffff',
    },
    text: {
      primary: tokens.colors.neutral[900],
      secondary: tokens.colors.neutral[500],
    },
    divider: tokens.colors.neutral[200],
  },
  typography: {
    fontFamily: tokens.typography.fontFamily,
    h1: { fontWeight: tokens.typography.heading.weight },
    h2: { fontWeight: tokens.typography.heading.weight },
    button: { textTransform: 'none' as const },
  },
  shape: {
    borderRadius: tokens.radius.md,
  },
  spacing: tokens.spacing.unit,
});`}
            />

            <InfoBox type="success" title="デザインとコードの橋渡し">
              <p>
                このようにデザイントークンを中間レイヤーとして定義しておけば、
                デザイナーが Figma でトークンを変更したとき、
                <code>tokens</code> オブジェクトを更新するだけで全コンポーネントに反映されます。
                デザインとコードの一貫性を保つ最良の方法です。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: 実践 — ブランドテーマの構築 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践：ブランドテーマの構築</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              架空のブランド「ZENN Design」のテーマを完成させましょう。
              パレット、タイポグラフィ、コンポーネントオーバーライドを統合します。
            </p>

            <CodeBlock
              language="tsx"
              title="src/theme.ts（完成版）"
              showLineNumbers
              code={`import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#fafbfc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a2e',
      secondary: '#6b7280',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"Noto Sans JP", "Inter", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    body1: {
      lineHeight: 1.8,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          padding: '10px 24px',
          fontSize: '0.9375rem',
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0,0,0,0.06)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;`}
            />

            <CodeBlock
              language="tsx"
              title="テーマの適用"
              code={`// src/main.tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);

// これだけで全ての MUI コンポーネントが
// ZENN Design ブランドのスタイルで表示される`}
            />

            <InfoBox type="success" title="テーマカスタマイズのまとめ">
              <p>
                MUI のテーマシステムは非常に強力で、1つのファイルでアプリ全体の見た目を制御できます。
                デザイナーとエンジニアの協業において、テーマファイルは「デザインシステムの実装」そのものです。
                Figma のデザイントークンとテーマファイルを対応させることで、
                デザインとコードの一貫性を保ちましょう。
              </p>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'MUI テーマカスタマイズ',
                  url: 'https://mui.com/material-ui/customization/theming/',
                  description: 'createTheme によるテーマ設定',
                },
                {
                  title: 'sx プロパティ',
                  url: 'https://mui.com/system/getting-started/the-sx-prop/',
                  description: 'sx プロパティの使い方',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
