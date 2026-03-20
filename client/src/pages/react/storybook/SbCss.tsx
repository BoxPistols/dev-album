import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import CodingChallenge from '@/components/CodingChallenge';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function SbCss() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 55</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">CSS 環境別 Storybook 表示</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          プレーン CSS、Tailwind CSS、MUI、styled-components / Emotion
          ――それぞれの CSS 環境で Storybook を正しく表示する方法を学びます。
          環境ごとの「設定の違い」と「共通パターン」を理解すれば、
          どの技術スタックでも迷わず Storybook を導入できます。
        </p>

        <WhyNowBox tags={['preview.ts', 'CSS Modules', 'Tailwind v4', 'MUI ThemeProvider', 'styled-components', 'Emotion', 'decorator']}>
          <p>
            Storybook はアプリ本体とは別のビルドプロセスで動作します。
            そのため、アプリ側で設定した CSS やテーマが自動的に反映されるわけではありません。
            「アプリでは表示されるのに Storybook では崩れる」という問題の原因は、
            ほぼ全てこのギャップにあります。
            ここで環境別の設定方法を押さえておけば、チーム全員が安心して Storybook を使えるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: 全体像 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS 環境と Storybook の関係</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Storybook でコンポーネントを正しく表示するために必要な設定は、
              使っている CSS 環境によって異なります。しかし、やるべきことは共通して 2 つだけです。
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">1. グローバルスタイルの読み込み</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  リセット CSS、フォント定義、CSS 変数などのグローバルスタイルを
                  Storybook 環境にも読み込む設定です。
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">.storybook/preview.ts</code> で行います。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">2. テーマ / プロバイダーの適用</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  MUI の ThemeProvider や styled-components の GlobalStyle など、
                  React のコンテキストで提供するスタイルを
                  Storybook の decorator で各ストーリーにラップします。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="デザイナーの方へ">
              <p>
                Storybook でコンポーネントの見た目がアプリと違う場合、まずこの 2 つの設定を確認してください。
                設定ファイルの場所は <code>.storybook/</code> フォルダです。
                エンジニアに「preview.ts と decorator の設定を見せて」と伝えれば、原因を特定できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: プレーン CSS / CSS Modules */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">プレーン CSS / CSS Modules での Storybook 表示</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              最もシンプルな CSS 環境です。グローバル CSS を <code>preview.ts</code> で
              インポートするだけで動作します。CSS Modules は Vite がデフォルトでサポートしているため、
              Storybook 側の追加設定は不要です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">グローバル CSS の読み込み</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              アプリのエントリーポイント（<code>main.tsx</code> など）でインポートしているグローバル CSS を、
              Storybook の <code>preview.ts</code> でも同じようにインポートします。
            </p>

            <CodeBlock
              language="css"
              title="src/styles/global.css"
              code={`/* リセット CSS とグローバル変数 */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-text: #1e293b;
  --color-bg: #ffffff;
  --font-sans: 'Inter', system-ui, sans-serif;
  --radius: 8px;
}

body {
  font-family: var(--font-sans);
  color: var(--color-text);
  background-color: var(--color-bg);
}`}
            />

            <div className="mt-4">
              <CodeBlock
                language="ts"
                title=".storybook/preview.ts - グローバル CSS 読み込み"
                showLineNumbers
                code={`import type { Preview } from '@storybook/react';

// アプリと同じグローバル CSS をインポート
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;`}
              />
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">CSS Modules の Storybook 対応</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules（<code>.module.css</code>）は Vite ベースの Storybook では追加設定なしで動作します。
              コンポーネントファイルで通常通りインポートするだけです。
            </p>

            <CodeBlock
              language="css"
              title="src/components/Button/Button.module.css"
              code={`.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.primary {
  background-color: var(--color-primary);
  color: white;
  border: none;
}

.primary:hover {
  opacity: 0.9;
}

.secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}`}
            />

            <div className="mt-4">
              <CodeBlock
                language="tsx"
                title="src/components/Button/Button.tsx"
                showLineNumbers
                code={`import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  variant = 'primary',
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={\`\${styles.button} \${styles[variant]}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}`}
              />
            </div>

            <div className="mt-4">
              <CodeBlock
                language="tsx"
                title="src/components/Button/Button.stories.tsx"
                showLineNumbers
                code={`import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'ボタン',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'ボタン',
  },
};`}
              />
            </div>

            <InfoBox type="success" title="ポイント">
              <p>
                CSS Modules はファイル名に <code>.module.css</code> を付けるだけで自動的にスコープされます。
                Storybook 側で特別なプラグイン設定は不要です。
                Vite の CSS Modules サポートがそのまま使われます。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">CSS Modules のビジュアルプレビュー</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules でスコープされたクラス名がどのように適用されるか、実際のカードコンポーネントで確認します。
              各クラスは <code>.module.css</code> によって自動的にユニークな名前に変換されます。
            </p>
            <CodePreview previewOnly previewOnly
              title="CSS Modules でスタイリングされたコンポーネント"
              code={`function CardCssModules() {
  /* CSS Modules ではスコープされたクラス名が自動生成される
     例: .card → .Card_card_x7k2a */
  const styles = {
    card: {
      border: '1px solid var(--border)',
      borderRadius: '12px',
      overflow: 'hidden',
      maxWidth: '320px',
      fontFamily: '"Inter", system-ui, sans-serif',
      background: 'var(--bg)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    },
    image: {
      width: '100%',
      height: '160px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '14px',
      fontWeight: '600',
      letterSpacing: '0.05em',
    },
    body: {
      padding: '16px',
    },
    tag: {
      display: 'inline-block',
      background: '#eef2ff',
      color: '#4f46e5',
      fontSize: '11px',
      fontWeight: '600',
      padding: '2px 8px',
      borderRadius: '9999px',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    title: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#1e293b',
      margin: '0 0 6px 0',
    },
    desc: {
      fontSize: '13px',
      color: 'var(--text-muted)',
      margin: '0 0 12px 0',
      lineHeight: '1.5',
    },
    btn: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '8px 16px',
      background: '#4f46e5',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    scopeInfo: {
      marginTop: '12px',
      padding: '8px 12px',
      background: 'var(--bg-muted)',
      borderRadius: '6px',
      border: '1px dashed #cbd5e1',
    },
    scopeText: {
      fontSize: '10px',
      color: 'var(--text-muted)',
      fontFamily: 'monospace',
      margin: 0,
    },
  };

  return (
    <div style={{ padding: '24px', background: 'var(--bg-muted)', minHeight: '100%' }}>
      <div style={styles.card}>
        <div style={styles.image}>CSS Modules Card</div>
        <div style={styles.body}>
          <span style={styles.tag}>scoped</span>
          <h3 style={styles.title}>プロフィールカード</h3>
          <p style={styles.desc}>CSS Modules で自動スコープされたクラスが適用されています。名前衝突の心配がありません。</p>
          <button style={styles.btn}>詳細を見る</button>
          <div style={styles.scopeInfo}>
            <p style={styles.scopeText}>クラス名: .Card_card_x7k2a</p>
            <p style={styles.scopeText}>クラス名: .Card_title_m3j1b</p>
          </div>
        </div>
      </div>
    </div>
  );
}`}
            />
          </section>

          {/* セクション 3: Tailwind CSS */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Tailwind CSS での Storybook 表示</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Tailwind CSS v4 は CSS ファーストの設定になり、Storybook との統合がよりシンプルになりました。
              Vite プラグインを使うことで、アプリと Storybook の両方で同じ Tailwind 設定を共有できます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">Tailwind v4 + Storybook の設定</h3>

            <CodeBlock
              language="bash"
              title="必要なパッケージのインストール"
              code={`pnpm add -D tailwindcss @tailwindcss/vite`}
            />

            <div className="mt-4">
              <CodeBlock
                language="css"
                title="src/styles/app.css - Tailwind v4 のエントリーポイント"
                showLineNumbers
                code={`/* Tailwind v4: @import で読み込むだけ */
@import "tailwindcss";

/* カスタムテーマ設定 */
@theme {
  --color-brand: #3b82f6;
  --color-brand-dark: #1d4ed8;
  --font-sans: 'Inter', system-ui, sans-serif;
  --radius-default: 0.5rem;
}`}
              />
            </div>

            <div className="mt-4">
              <CodeBlock
                language="ts"
                title=".storybook/main.ts - Vite プラグインの設定"
                showLineNumbers
                code={`import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mts|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Tailwind v4 の Vite プラグインを追加
    config.plugins = config.plugins || [];
    config.plugins.push(tailwindcss());
    return config;
  },
};

export default config;`}
              />
            </div>

            <div className="mt-4">
              <CodeBlock
                language="ts"
                title=".storybook/preview.ts - Tailwind CSS の読み込み"
                showLineNumbers
                code={`import type { Preview } from '@storybook/react';

// Tailwind のエントリー CSS をインポート
import '../src/styles/app.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;`}
              />
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ダークモード切替の decorator</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Tailwind のダークモードを Storybook 上で切り替えられるようにするには、
              decorator で <code>html</code> 要素に <code>dark</code> クラスを付け外しする仕組みを作ります。
              Storybook のツールバーから簡単に切り替えられるようになります。
            </p>

            <CodeBlock
              language="tsx"
              title=".storybook/preview.tsx - ダークモード decorator"
              showLineNumbers
              code={`import type { Preview, Decorator } from '@storybook/react';
import '../src/styles/app.css';

// ダークモード切替用の decorator
const withDarkMode: Decorator = (Story, context) => {
  const isDark = context.globals.theme === 'dark';

  // Storybook の iframe 内の html 要素にクラスを適用
  document.documentElement.classList.toggle('dark', isDark);

  return (
    <div className={isDark ? 'bg-gray-900 text-white p-4' : 'bg-white text-gray-900 p-4'}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withDarkMode],
  // ツールバーにテーマ切替ボタンを追加
  globalTypes: {
    theme: {
      name: 'テーマ',
      description: 'ライト / ダークモードの切替',
      
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'ライト', icon: 'sun' },
          { value: 'dark', title: 'ダーク', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;`}
            />

            <InfoBox type="info" title="Tailwind v3 との違い">
              <p>
                Tailwind v3 では <code>tailwind.config.js</code> を使い、
                <code>@tailwind base; @tailwind components; @tailwind utilities;</code> の 3 ディレクティブが必要でした。
                v4 では <code>@import "tailwindcss";</code> の 1 行と <code>@theme</code> ブロックに統一されています。
                Storybook での設定もよりシンプルになりました。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Tailwind CSS のビジュアルプレビュー</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              同じカードコンポーネントを Tailwind CSS のユーティリティクラスで構築した場合のイメージです。
              クラス名を見るだけでスタイルが把握できるのが Tailwind の特徴です。
            </p>
            <CodePreview previewOnly previewOnly
              title="Tailwind CSS コンポーネント"
              code={`function CardTailwind() {
  /* Tailwind ではユーティリティクラスで直接スタイルを適用する
     ここでは inline style で Tailwind 的なアプローチを再現 */
  return (
    <div style={{ padding: '24px', background: 'var(--bg-muted)', minHeight: '100%' }}>
      <div style={{
        maxWidth: '320px',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'var(--bg)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        fontFamily: '"Inter", system-ui, sans-serif',
      }}>
        {/* bg-gradient-to-br from-cyan-500 to-blue-600 */}
        <div style={{
          width: '100%',
          height: '160px',
          background: 'linear-gradient(to bottom right, #06b6d4, #2563eb)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
        }}>Tailwind Card</div>

        {/* p-4 space-y-2 */}
        <div style={{ padding: '16px' }}>
          {/* text-xs font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full */}
          <span style={{
            display: 'inline-block',
            background: '#ecfeff',
            color: '#0891b2',
            fontSize: '11px',
            fontWeight: '600',
            padding: '2px 8px',
            borderRadius: '9999px',
            marginBottom: '8px',
            textTransform: 'uppercase',
          }}>utility-first</span>

          {/* text-base font-bold text-slate-800 */}
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px 0' }}>
            プロフィールカード
          </h3>

          {/* text-sm text-slate-500 */}
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 12px 0', lineHeight: '1.5' }}>
            Tailwind のユーティリティクラスだけで構築。className に直接スタイルを記述します。
          </p>

          {/* bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-semibold */}
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 16px',
            background: '#0891b2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
          }}>詳細を見る</button>

          {/* クラス名の可視化 */}
          <div style={{
            marginTop: '12px',
            padding: '8px 12px',
            background: '#f0fdfa',
            borderRadius: '6px',
            border: '1px dashed #99f6e4',
          }}>
            <p style={{ fontSize: '10px', color: '#5eead4', fontFamily: 'monospace', margin: '0 0 2px 0' }}>
              className="rounded-xl shadow-md overflow-hidden"
            </p>
            <p style={{ fontSize: '10px', color: '#5eead4', fontFamily: 'monospace', margin: 0 }}>
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}`}
            />
          </section>

          {/* セクション 4: MUI (Material UI) */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">MUI (Material UI) での Storybook 表示</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              MUI は React のコンテキストを通じてテーマを提供します。
              Storybook では decorator を使って、すべてのストーリーを
              <code>ThemeProvider</code> と <code>CssBaseline</code> でラップします。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">ThemeProvider decorator の設定</h3>

            <CodeBlock
              language="tsx"
              title="src/theme.ts - MUI テーマ定義"
              showLineNumbers
              code={`import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#3b82f6' },
    secondary: { main: '#8b5cf6' },
  },
  typography: {
    fontFamily: '"Inter", "Noto Sans JP", sans-serif',
  },
  shape: { borderRadius: 8 },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#60a5fa' },
    secondary: { main: '#a78bfa' },
  },
  typography: {
    fontFamily: '"Inter", "Noto Sans JP", sans-serif',
  },
  shape: { borderRadius: 8 },
});`}
            />

            <div className="mt-4">
              <CodeBlock
                language="tsx"
                title=".storybook/preview.tsx - MUI decorator"
                showLineNumbers
                code={`import type { Preview, Decorator } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '../src/theme';

// MUI テーマを適用する decorator
const withMuiTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withMuiTheme],
  globalTypes: {
    theme: {
      name: 'テーマ',
      description: 'MUI テーマの切替',
      
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'ライト' },
          { value: 'dark', title: 'ダーク' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;`}
              />
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">MUI テーマを Controls パネルで表示する</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              MUI のテーマ値（色、スペーシング、角丸など）を Storybook の Controls パネルから
              動的に変更できるようにすると、デザイナーとの調整が格段に楽になります。
            </p>

            <CodeBlock
              language="tsx"
              title="src/stories/ThemeShowcase.stories.tsx"
              showLineNumbers
              code={`import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Button, Stack, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// テーマの現在値を表示するコンポーネント
function ThemeShowcase() {
  const theme = useTheme();

  return (
    <Stack spacing={3}>
      <Typography variant="h5">テーマプレビュー</Typography>

      {/* カラーパレット */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          カラーパレット
        </Typography>
        <Stack direction="row" spacing={1}>
          {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map(
            (color) => (
              <Chip
                key={color}
                label={color}
                color={color}
                sx={{ minWidth: 80 }}
              />
            )
          )}
        </Stack>
      </Box>

      {/* ボタンバリエーション */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          ボタン
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
        </Stack>
      </Box>

      {/* テーマ情報 */}
      <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="caption" component="pre">
          {JSON.stringify(
            {
              mode: theme.palette.mode,
              borderRadius: theme.shape.borderRadius,
              fontFamily: theme.typography.fontFamily,
            },
            null,
            2
          )}
        </Typography>
      </Box>
    </Stack>
  );
}

const meta: Meta = {
  title: 'Theme/Showcase',
  component: ThemeShowcase,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};`}
            />

            <InfoBox type="warning" title="CssBaseline を忘れずに">
              <p>
                <code>CssBaseline</code> は MUI のリセット CSS に相当するコンポーネントです。
                これを decorator に含めないと、ブラウザのデフォルトスタイルが残り、
                フォントサイズやマージンがアプリと異なる表示になることがあります。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: styled-components / Emotion */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">styled-components / Emotion での Storybook 表示</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS-in-JS ライブラリでは、グローバルスタイルの適用とテーマプロバイダーの設定を
              Storybook の decorator で行います。両ライブラリの API は異なりますが、パターンは共通です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">styled-components の場合</h3>

            <CodeBlock
              language="tsx"
              title="src/styles/GlobalStyle.ts"
              showLineNumbers
              code={`import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle\`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: \${({ theme }) => theme.fonts.body};
    color: \${({ theme }) => theme.colors.text};
    background-color: \${({ theme }) => theme.colors.bg};
    line-height: 1.6;
  }
\`;

export default GlobalStyle;`}
            />

            <div className="mt-4">
              <CodeBlock
                language="tsx"
                title="src/styles/theme.ts"
                showLineNumbers
                code={`export const lightTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    text: '#1e293b',
    bg: '#ffffff',
    border: '#e2e8f0',
  },
  fonts: {
    body: '"Inter", system-ui, sans-serif',
    heading: '"Inter", system-ui, sans-serif',
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
};

export const darkTheme = {
  colors: {
    primary: '#60a5fa',
    secondary: '#a78bfa',
    text: '#f1f5f9',
    bg: '#0f172a',
    border: '#334155',
  },
  fonts: {
    body: '"Inter", system-ui, sans-serif',
    heading: '"Inter", system-ui, sans-serif',
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
};`}
              />
            </div>

            <div className="mt-4">
              <CodeBlock
                language="tsx"
                title=".storybook/preview.tsx - styled-components decorator"
                showLineNumbers
                code={`import type { Preview, Decorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../src/styles/GlobalStyle';
import { lightTheme, darkTheme } from '../src/styles/theme';

const withStyledComponents: Decorator = (Story, context) => {
  const theme = context.globals.theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withStyledComponents],
  globalTypes: {
    theme: {
      name: 'テーマ',
      
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'ライト' },
          { value: 'dark', title: 'ダーク' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;`}
              />
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Emotion の場合</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion も同様のパターンですが、グローバルスタイルの定義には <code>Global</code> コンポーネントを使い、
              テーマプロバイダーは <code>@emotion/react</code> の <code>ThemeProvider</code> を使います。
            </p>

            <CodeBlock
              language="tsx"
              title=".storybook/preview.tsx - Emotion decorator"
              showLineNumbers
              code={`import type { Preview, Decorator } from '@storybook/react';
import { ThemeProvider, Global, css } from '@emotion/react';
import { lightTheme, darkTheme } from '../src/styles/theme';

// Emotion のグローバルスタイル
const globalStyles = (theme: typeof lightTheme) => css\`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: \${theme.fonts.body};
    color: \${theme.colors.text};
    background-color: \${theme.colors.bg};
  }
\`;

const withEmotion: Decorator = (Story, context) => {
  const theme = context.globals.theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles(theme)} />
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withEmotion],
  globalTypes: {
    theme: {
      name: 'テーマ',
      
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'ライト' },
          { value: 'dark', title: 'ダーク' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;`}
            />

            <InfoBox type="info" title="styled-components と Emotion の選び方">
              <p>
                API はほぼ同じですが、Emotion は MUI v5 の内部でも使われているため、
                MUI と併用する場合は Emotion を選ぶのが自然です。
                styled-components はエコシステムが成熟しており、独立したスタイリングライブラリとしての実績があります。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">styled-components のビジュアルプレビュー</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS-in-JS アプローチでは、スタイルが JavaScript の中に埋め込まれます。
              テーマの値を props 経由で参照し、動的なスタイリングが可能です。
            </p>
            <CodePreview previewOnly previewOnly
              title="styled-components スタイル"
              code={`function CardStyledComponents() {
  /* styled-components / Emotion では JS の中にスタイルを書く
     テーマ値は props.theme で参照可能 */
  const theme = {
    primary: '#8b5cf6',
    primaryLight: '#ede9fe',
    text: '#1e293b',
    textMuted: '#64748b',
    bg: '#ffffff',
    border: '#e2e8f0',
    radius: '12px',
  };

  return (
    <div style={{ padding: '24px', background: 'var(--bg-muted)', minHeight: '100%' }}>
      <div style={{
        maxWidth: '320px',
        borderRadius: theme.radius,
        overflow: 'hidden',
        background: theme.bg,
        border: '1px solid ' + theme.border,
        fontFamily: '"Inter", system-ui, sans-serif',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07)',
      }}>
        {/* background: \${({ theme }) => theme.gradient} */}
        <div style={{
          width: '100%',
          height: '160px',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
        }}>styled-components Card</div>

        <div style={{ padding: '16px' }}>
          {/* \${({ theme }) => theme.colors.primaryLight} */}
          <span style={{
            display: 'inline-block',
            background: theme.primaryLight,
            color: theme.primary,
            fontSize: '11px',
            fontWeight: '600',
            padding: '2px 8px',
            borderRadius: '9999px',
            marginBottom: '8px',
            textTransform: 'uppercase',
          }}>css-in-js</span>

          <h3 style={{ fontSize: '16px', fontWeight: '700', color: theme.text, margin: '0 0 6px 0' }}>
            プロフィールカード
          </h3>
          <p style={{ fontSize: '13px', color: theme.textMuted, margin: '0 0 12px 0', lineHeight: '1.5' }}>
            styled-components ではテーマ値を JS 変数として参照。動的なスタイリングが得意です。
          </p>

          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 16px',
            background: theme.primary,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
          }}>詳細を見る</button>

          <div style={{
            marginTop: '12px',
            padding: '8px 12px',
            background: '#faf5ff',
            borderRadius: '6px',
            border: '1px dashed #c4b5fd',
          }}>
            <p style={{ fontSize: '10px', color: '#a78bfa', fontFamily: 'monospace', margin: '0 0 2px 0' }}>
              background: theme.primary
            </p>
            <p style={{ fontSize: '10px', color: '#a78bfa', fontFamily: 'monospace', margin: 0 }}>
              color: theme.text
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}`}
            />
          </section>

          {/* セクション 6: 環境別比較表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">環境別の設定比較</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              各 CSS 環境で必要な設定を一覧で比較します。
              どの環境でも「グローバルスタイル読み込み」と「テーマ適用」の 2 ステップである点に注目してください。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left p-3 font-semibold text-foreground">CSS 環境</th>
                    <th className="text-left p-3 font-semibold text-foreground">グローバルスタイル</th>
                    <th className="text-left p-3 font-semibold text-foreground">テーマ適用</th>
                    <th className="text-left p-3 font-semibold text-foreground">追加設定</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">プレーン CSS</td>
                    <td className="p-3 text-foreground/80">preview.ts で import</td>
                    <td className="p-3 text-foreground/80">不要</td>
                    <td className="p-3 text-foreground/80">なし</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="p-3 font-medium text-foreground">CSS Modules</td>
                    <td className="p-3 text-foreground/80">preview.ts で import</td>
                    <td className="p-3 text-foreground/80">不要</td>
                    <td className="p-3 text-foreground/80">Vite が自動対応</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">Tailwind v4</td>
                    <td className="p-3 text-foreground/80">preview.ts で import</td>
                    <td className="p-3 text-foreground/80">decorator（ダークモード時）</td>
                    <td className="p-3 text-foreground/80">main.ts で @tailwindcss/vite プラグイン</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="p-3 font-medium text-foreground">MUI</td>
                    <td className="p-3 text-foreground/80">CssBaseline（decorator 内）</td>
                    <td className="p-3 text-foreground/80">ThemeProvider decorator</td>
                    <td className="p-3 text-foreground/80">テーマファイルの共有</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">styled-components</td>
                    <td className="p-3 text-foreground/80">GlobalStyle（decorator 内）</td>
                    <td className="p-3 text-foreground/80">ThemeProvider decorator</td>
                    <td className="p-3 text-foreground/80">テーマファイルの共有</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="p-3 font-medium text-foreground">Emotion</td>
                    <td className="p-3 text-foreground/80">Global（decorator 内）</td>
                    <td className="p-3 text-foreground/80">ThemeProvider decorator</td>
                    <td className="p-3 text-foreground/80">テーマファイルの共有</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ダークモード対応の比較プレビュー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ダークモード対応の比較</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Storybook の decorator でダークモードを切り替えると、コンポーネントの見た目がどう変わるかを確認します。
              ライトモードとダークモードを並べて比較することで、テーマ設計の品質を検証できます。
            </p>
            <CodePreview previewOnly previewOnly
              title="ダークモード対応の比較"
              previewHeight={420}
              code={`function DarkModeComparison() {
  const lightTheme = {
    bg: '#ffffff',
    cardBg: '#ffffff',
    text: '#1e293b',
    textMuted: '#64748b',
    border: '#e2e8f0',
    primary: '#3b82f6',
    primaryBg: '#eff6ff',
    tag: '#dbeafe',
    tagText: '#2563eb',
    surfaceBg: '#f8fafc',
  };

  const darkTheme = {
    bg: '#0f172a',
    cardBg: '#1e293b',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    border: '#334155',
    primary: '#60a5fa',
    primaryBg: '#1e3a5f',
    tag: '#1e3a5f',
    tagText: '#93c5fd',
    surfaceBg: '#1e293b',
  };

  function Card({ theme, mode }) {
    return (
      <div style={{
        flex: '1 1 0',
        minWidth: '240px',
        borderRadius: '12px',
        overflow: 'hidden',
        background: theme.cardBg,
        border: '1px solid ' + theme.border,
        fontFamily: '"Inter", system-ui, sans-serif',
      }}>
        <div style={{
          padding: '10px 16px',
          background: theme.surfaceBg,
          borderBottom: '1px solid ' + theme.border,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {mode === 'light' ? '☀ ライトモード' : '☾ ダークモード'}
          </span>
          <span style={{
            fontSize: '10px',
            color: theme.tagText,
            background: theme.tag,
            padding: '2px 6px',
            borderRadius: '4px',
            fontWeight: '600',
          }}>{mode}</span>
        </div>
        <div style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: theme.text, margin: '0 0 8px 0' }}>
            通知カード
          </h3>
          <p style={{ fontSize: '12px', color: theme.textMuted, margin: '0 0 12px 0', lineHeight: '1.5' }}>
            新しいコメントが 3 件あります。確認してください。
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              padding: '6px 14px',
              background: theme.primary,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
            }}>確認する</button>
            <button style={{
              padding: '6px 14px',
              background: 'transparent',
              color: theme.primary,
              border: '1px solid ' + theme.primary,
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
            }}>後で</button>
          </div>
          <div style={{
            marginTop: '12px',
            padding: '8px',
            background: theme.primaryBg,
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: theme.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: '700',
              flexShrink: 0,
            }}>A</div>
            <div>
              <p style={{ fontSize: '11px', fontWeight: '600', color: theme.text, margin: 0 }}>Alice</p>
              <p style={{ fontSize: '10px', color: theme.textMuted, margin: 0 }}>デザインレビューをお願いします</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '24px',
      background: '#f1f5f9',
      minHeight: '100%',
      flexWrap: 'wrap',
    }}>
      <Card theme={lightTheme} mode="light" />
      <Card theme={darkTheme} mode="dark" />
    </div>
  );
}`}
            />
          </section>

          {/* コーディングチャレンジ */}
          <section>
            <CodingChallenge
              title="Storybook の decorator でテーマ切替を実装"
              description="テーマ切替の ___ を埋めてください。ボタンの onClick でモードを切り替え、themes オブジェクトから現在のテーマを取得してスタイルに適用します。"
              preview={true}
              initialCode={`function ThemeDecorator() {
  const [mode, setMode] = React.useState('light');

  const themes = {
    light: {
      bg: '#ffffff',
      text: '#1e293b',
      muted: '#64748b',
      primary: '#3b82f6',
      border: '#e2e8f0',
    },
    dark: {
      bg: '#0f172a',
      text: '#f1f5f9',
      muted: '#94a3b8',
      primary: '#60a5fa',
      border: '#334155',
    },
  };

  const t = themes[___]; // ← ここを埋める（現在のテーマを取得）

  return (
    <div style={{
      padding: '24px',
      background: t.bg,
      minHeight: '200px',
      fontFamily: '"Inter", system-ui, sans-serif',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => ___(mode === 'light' ? 'dark' : 'light')} // ← ここを埋める（state更新関数）
          style={{
            padding: '6px 14px',
            background: t.primary,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          {mode === 'light' ? 'ダークモードへ' : 'ライトモードへ'}
        </button>
      </div>

      <div style={{
        padding: '16px',
        border: '1px solid ' + t.border,
        borderRadius: '8px',
        background: mode === 'light' ? '#f8fafc' : '#1e293b',
      }}>
        <h3 style={{ color: t.text, margin: '0 0 8px 0', fontSize: '16px' }}>
          サンプルコンポーネント
        </h3>
        <p style={{ color: t.muted, margin: 0, fontSize: '13px' }}>
          テーマが正しく切り替わっています
        </p>
      </div>
    </div>
  );
}`}
              answer={`function ThemeDecorator() {
  const [mode, setMode] = React.useState('light');

  const themes = {
    light: {
      bg: '#ffffff',
      text: '#1e293b',
      muted: '#64748b',
      primary: '#3b82f6',
      border: '#e2e8f0',
    },
    dark: {
      bg: '#0f172a',
      text: '#f1f5f9',
      muted: '#94a3b8',
      primary: '#60a5fa',
      border: '#334155',
    },
  };

  const t = themes[mode];

  return (
    <div style={{
      padding: '24px',
      background: t.bg,
      minHeight: '200px',
      fontFamily: '"Inter", system-ui, sans-serif',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          style={{
            padding: '6px 14px',
            background: t.primary,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          {mode === 'light' ? 'ダークモードへ' : 'ライトモードへ'}
        </button>
      </div>

      <div style={{
        padding: '16px',
        border: '1px solid ' + t.border,
        borderRadius: '8px',
        background: mode === 'light' ? '#f8fafc' : '#1e293b',
      }}>
        <h3 style={{ color: t.text, margin: '0 0 8px 0', fontSize: '16px' }}>
          サンプルコンポーネント
        </h3>
        <p style={{ color: t.muted, margin: 0, fontSize: '13px' }}>
          テーマが正しく切り替わっています
        </p>
      </div>
    </div>
  );
}`}
              keywords={['themes[mode]', 'setMode(']}
              hints={[
                'themes オブジェクトのキーは mode 変数（"light" または "dark"）で取得します',
                'state を更新する関数名は useState の慣例で setMode です',
              ]}
            />
          </section>

          {/* セクション 7: 生徒の疑問 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">よくある疑問</h2>

            <div className="rounded-lg border border-border p-6 mb-6">
              <h3 className="font-bold text-foreground mb-3">
                「環境ごとに設定が違いすぎて混乱します。共通のルールはありますか？」
              </h3>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                よい質問です。実は、どの CSS 環境でもやることは 2 つだけです。
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</span>
                  <div>
                    <p className="font-semibold text-foreground">グローバルなスタイルを Storybook に読み込む</p>
                    <p className="text-sm text-foreground/80">
                      CSS ファイルなら <code>preview.ts</code> で import。
                      React コンポーネント型（GlobalStyle / CssBaseline / Global）なら decorator 内で使用。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</span>
                  <div>
                    <p className="font-semibold text-foreground">テーマやプロバイダーを decorator でラップする</p>
                    <p className="text-sm text-foreground/80">
                      テーマシステムを持つライブラリ（MUI、styled-components、Emotion）では
                      ThemeProvider を decorator に設定。テーマがないライブラリ（プレーン CSS / Tailwind）では不要。
                    </p>
                  </div>
                </div>
              </div>

              <CodeBlock
                language="tsx"
                title="共通パターンのまとめ"
                showLineNumbers
                code={`// .storybook/preview.tsx の共通構造

import type { Preview, Decorator } from '@storybook/react';

// 1. グローバル CSS の import（CSS ファイル型の場合）
import '../src/styles/global.css';

// 2. テーマプロバイダーの decorator（テーマシステムがある場合）
const withTheme: Decorator = (Story, context) => {
  // context.globals でツールバーの値を取得
  const isDark = context.globals.theme === 'dark';

  return (
    // <YourThemeProvider theme={isDark ? darkTheme : lightTheme}>
    //   <YourGlobalStyle />  // React コンポーネント型のグローバルスタイル
    //   <Story />
    // </YourThemeProvider>
    <Story />
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      name: 'テーマ',
      
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'ライト' },
          { value: 'dark', title: 'ダーク' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;`}
              />

              <InfoBox type="success" title="覚えるのは 2 ステップだけ">
                <p>
                  「グローバルスタイルの読み込み場所」と「テーマプロバイダーの有無」を確認するだけで、
                  どの CSS 環境でも Storybook の設定ができます。
                  新しい CSS ライブラリを使うときも、この 2 つの観点で公式ドキュメントを読めば迷いません。
                </p>
              </InfoBox>
            </div>

            <div className="rounded-lg border border-border p-6">
              <h3 className="font-bold text-foreground mb-3">
                「decorator って何ですか？ なぜ必要なのですか？」
              </h3>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                decorator は「ストーリーをラップする関数」です。
                通常の React アプリでは、<code>App.tsx</code> や <code>main.tsx</code> で
                ThemeProvider などのプロバイダーがアプリ全体をラップしています。
                Storybook では各ストーリーが独立して描画されるため、
                アプリのプロバイダー設定が適用されません。
                decorator を使うことで、全ストーリーに共通のプロバイダーを適用できます。
              </p>

              <CodeBlock
                language="tsx"
                title="decorator の概念図"
                code={`// アプリでの構造
<App>
  <ThemeProvider>      ← アプリ全体をラップ
    <Router>
      <MyComponent />  ← コンポーネント
    </Router>
  </ThemeProvider>
</App>

// Storybook での構造（decorator 使用）
<Decorator>
  <ThemeProvider>      ← decorator がストーリーをラップ
    <Story />          ← 個別のストーリー
  </ThemeProvider>
</Decorator>`}
              />
            </div>
          </section>

          {/* セクション 8: 実践チェックリスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践チェックリスト</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Storybook でスタイルが正しく表示されないときは、以下を順番に確認してください。
            </p>

            <div className="space-y-3">
              {[
                'preview.ts でグローバル CSS をインポートしているか',
                'テーマプロバイダーが decorator に設定されているか',
                'Tailwind の場合: @tailwindcss/vite プラグインが main.ts に追加されているか',
                'MUI の場合: CssBaseline が decorator に含まれているか',
                'CSS-in-JS の場合: GlobalStyle / Global が decorator に含まれているか',
                'ダークモード切替: globalTypes と toolbar が設定されているか',
                'テーマファイルのパスが正しいか（相対パスに注意）',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground/80">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Styling and CSS - Storybook',
                  url: 'https://storybook.js.org/docs/configure/styling-and-css',
                  description: 'Storybook でのスタイル設定',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
