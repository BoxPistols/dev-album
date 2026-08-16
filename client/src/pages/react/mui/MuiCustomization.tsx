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
              previewHeight={400}
              code={`import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Chip, Stack, Box, Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
    secondary: { main: '#ec4899' },
    error: { main: '#ef4444' },
    warning: { main: '#f59e0b' },
    success: { main: '#10b981' },
    info: { main: '#3b82f6' },
  },
});

// theme.palette から実際の値を取り出して表示するスウォッチ
function Swatch({ color, label }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box sx={{ width: 28, height: 28, borderRadius: 1, bgcolor: color, border: '1px solid rgba(0,0,0,0.1)' }} />
      <Typography variant="caption">{label}</Typography>
      <Typography variant="caption" color="text.secondary">{color}</Typography>
    </Stack>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* このテーマは light 固定なので、テーマ自身の背景色を塗って外側と切り離す */}
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 2, borderRadius: 2 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Button variant="contained" color="primary">primary</Button>
            <Button variant="contained" color="secondary">secondary</Button>
            <Button variant="outlined" color="error">error</Button>
          </Stack>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip label="success" color="success" />
            <Chip label="warning" color="warning" />
            <Chip label="info" color="info" />
          </Stack>
          <Typography variant="subtitle2">theme.palette.primary の値</Typography>
          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
            <Swatch color={theme.palette.primary.light} label="light" />
            <Swatch color={theme.palette.primary.main} label="main" />
            <Swatch color={theme.palette.primary.dark} label="dark" />
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="ダークモードのパレット"
              previewHeight={300}
              code={`import { useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Paper, Typography, Switch, Stack, Button } from '@mui/material';

function App() {
  const [mode, setMode] = useState('light');
  // mode が変わるたびにテーマを作り直す
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 3, borderRadius: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="body2">light</Typography>
          <Switch
            checked={mode === 'dark'}
            onChange={(e) => setMode(e.target.checked ? 'dark' : 'light')}
            inputProps={{ 'aria-label': 'ダークモード切替' }}
          />
          <Typography variant="body2">dark</Typography>
        </Stack>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>palette.mode: {mode}</Typography>
          <Typography variant="body2" color="text.secondary">
            mode を切り替えると、背景・文字・ボタンの色がテーマから自動で再計算されます。
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }}>ボタンも自動対応</Button>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}`}
            />

            <InfoBox type="info" title="light / dark の自動対応">
              <p>
                デフォルトパレットを使っている場合、<code>mode: 'dark'</code> を設定すると
                <code>palette.text</code> / <code>palette.action</code> / <code>palette.background</code> / <code>palette.divider</code> の値がダーク向けに切り替わります。
                アプリ全体の背景もダークにするには、<code>ThemeProvider</code> の内側に <code>CssBaseline</code> を置きます。
                独自のパレットを持つ場合は、<code>mode</code> に応じた値を自分で用意します。
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

            <p className="text-muted-foreground my-4 leading-relaxed">
              上の設定を反映した結果です。見出しのウェイトと文字サイズ、本文の行間、ボタンの大文字変換なしが実際の描画で確認できます。
            </p>

            <CodePreview
              language="tsx"
              title="タイポグラフィ設定の結果"
              previewHeight={530}
              code={`import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, Button, Stack, Divider, Box } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans JP", "Helvetica Neue", Arial, sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.3, letterSpacing: '-0.02em' },
    h2: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.4 },
    h3: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.4 },
    h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '1rem', lineHeight: 1.8 },
    body2: { fontSize: '0.875rem', lineHeight: 1.7 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* このテーマは light 固定なので、テーマ自身の背景色を塗って外側と切り離す */}
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 2, borderRadius: 2 }}>
        <Stack spacing={1.5}>
          <Typography variant="h1">見出し H1</Typography>
          <Typography variant="h2">見出し H2</Typography>
          <Typography variant="h3">見出し H3</Typography>
          <Typography variant="h4">見出し H4</Typography>
          <Divider />
          <Typography variant="body1">
            本文 body1。日本語は行間を広めに取ると読みやすくなります。lineHeight 1.8 を設定した状態です。
          </Typography>
          <Typography variant="body2" color="text.secondary">
            本文 body2。補助テキストや注釈に使います。lineHeight 1.7。
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button variant="contained">Submit form</Button>
            <Typography variant="caption" color="text.secondary">大文字変換なし</Typography>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}`}
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

            <p className="text-muted-foreground my-4 leading-relaxed">
              上の設定を反映したテーマを適用した結果です。全ボタンの角丸とパディング、アウトラインの枠線 2px、テキストフィールドとカードの角丸が一括で揃います。
            </p>

            <CodePreview
              language="tsx"
              title="オーバーライドの結果"
              previewHeight={490}
              code={`import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, TextField, Card, CardContent, Typography, Stack, Box } from '@mui/material';

const theme = createTheme({
  palette: { primary: { main: '#6366f1' } },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, padding: '10px 24px', fontSize: '0.9375rem', fontWeight: 600, textTransform: 'none' },
        containedPrimary: { '&:hover': { boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)' } },
        outlined: { borderWidth: 2, '&:hover': { borderWidth: 2 } },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'medium' },
      styleOverrides: { root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } } },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* このテーマは light 固定なので、テーマ自身の背景色を塗って外側と切り離す */}
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 2, borderRadius: 2 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Button variant="contained">角丸 8px</Button>
            <Button variant="outlined">枠線 2px</Button>
          </Stack>
          <TextField label="メールアドレス" placeholder="you@example.com" fullWidth />
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700 }}>Card は角丸 12px</Typography>
              <Typography variant="body2" color="text.secondary">
                MuiCard の styleOverrides で、全カードのボーダーとシャドウが統一されます。
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}`}
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
              previewHeight={390}
              code={`import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Button, Stack, Typography, Box } from '@mui/material';

// 1. styleOverrides: テーマ経由で全 Button に適用
const theme = createTheme({
  palette: { primary: { main: '#6366f1' } },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none', fontWeight: 600 },
      },
    },
  },
});

// 3. styled(): 再利用可能なカスタムコンポーネント
const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #6366f1, #ec4899)',
  color: '#fff',
  padding: '10px 24px',
  '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.2)' },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* このテーマは light 固定なので、テーマ自身の背景色を塗って外側と切り離す */}
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 2, borderRadius: 2 }}>
        <Stack spacing={2}>
          <div>
            <Typography variant="caption" color="text.secondary">1. styleOverrides（全ボタン共通）</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
              <Button variant="contained">角丸 8px</Button>
              <Button variant="outlined">統一スタイル</Button>
            </Stack>
          </div>
          <div>
            <Typography variant="caption" color="text.secondary">2. sx prop（この 1 箇所だけ個別調整）</Typography>
            <div>
              <Button variant="contained" sx={{ mt: 1, mb: 1, px: 4 }}>送信</Button>
            </div>
          </div>
          <div>
            <Typography variant="caption" color="text.secondary">3. styled()（再利用コンポーネント）</Typography>
            <div>
              <GradientButton sx={{ mt: 0.5 }}>グラデーションボタン</GradientButton>
            </div>
          </div>
        </Stack>
      </Box>
    </ThemeProvider>
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

            <p className="text-muted-foreground my-4 leading-relaxed">
              完成したテーマを実際の画面に適用した結果です。AppBar・Card・Chip・Button・Dialog がすべて同じブランド設定で描画されます。「ダイアログを開く」をクリックすると実際にモーダルが開きます。
            </p>

            <CodePreview
              language="tsx"
              title="ZENN Design テーマの実画面"
              previewHeight={520}
              code={`import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, Card, CardContent, Chip, Stack, Box } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#6366f1', light: '#818cf8', dark: '#4f46e5', contrastText: '#ffffff' },
    secondary: { main: '#ec4899' },
    background: { default: '#fafbfc', paper: '#ffffff' },
    text: { primary: '#1a1a2e', secondary: '#6b7280' },
  },
  typography: {
    fontFamily: '"Noto Sans JP", "Inter", sans-serif',
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { padding: '10px 24px' } } },
    MuiCard: { styleOverrides: { root: { border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' } } },
    MuiAppBar: { styleOverrides: { root: { boxShadow: '0 1px 3px rgba(0,0,0,0.06)' } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
  },
});

function App() {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 2 }}>
        <AppBar position="static" color="primary" sx={{ borderRadius: 2, mb: 2 }}>
          <Toolbar variant="dense">
            <Typography sx={{ mr: 1 }}>🎨</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, flexGrow: 1 }}>ZENN Design</Typography>
            <Button color="inherit" size="small">ログイン</Button>
          </Toolbar>
        </AppBar>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>ブランドテーマの適用結果</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              パレット・タイポグラフィ・角丸・オーバーライドを 1 つのテーマに統合しています。
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
              <Chip label="primary" color="primary" />
              <Chip label="secondary" color="secondary" />
              <Chip label="outlined" variant="outlined" />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={() => setOpen(true)}>ダイアログを開く</Button>
              <Button variant="outlined">キャンセル</Button>
            </Stack>
          </CardContent>
        </Card>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>ブランドテーマのダイアログ</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary">
              Dialog にもテーマの角丸とタイポグラフィが反映されます。クリックで実際に開閉できます。
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>閉じる</Button>
            <Button variant="contained" onClick={() => setOpen(false)}>OK</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}`}
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
