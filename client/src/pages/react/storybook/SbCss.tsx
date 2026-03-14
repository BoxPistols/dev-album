import CodeBlock from '@/components/CodeBlock';
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
      defaultValue: 'light',
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
      defaultValue: 'light',
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
      defaultValue: 'light',
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
      defaultValue: 'light',
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
      defaultValue: 'light',
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
