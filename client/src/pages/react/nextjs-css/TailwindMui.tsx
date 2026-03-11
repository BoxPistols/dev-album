import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function TailwindMui() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 43</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Next.js × Tailwind / MUI</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Next.js App Router で Tailwind CSS と MUI（Material UI）を使う方法を学びます。
          それぞれの導入手順、設定方法、App Router との互換性について理解しましょう。
        </p>

        <WhyNowBox tags={['Tailwind CSS', 'MUI', 'Material UI', 'App Router', 'SSR']}>
          <p>
            Next.js で CSS フレームワークを使う際には、App Router 特有の注意点があります。
            特に MUI のような CSS-in-JS ライブラリは Server Component との互換性に工夫が必要です。
            このステップでは、実務で最も使われる Tailwind CSS と MUI の設定方法を、
            App Router に対応した形で解説します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: Tailwind CSS in Next.js */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Tailwind CSS のセットアップ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">create-next-app</code> を使えば、
              プロジェクト作成時に Tailwind CSS を自動で設定できます。
              手動で追加する場合の手順も確認しましょう。
            </p>

            <CodeBlock
              code={`# create-next-app で Tailwind 付きプロジェクトを作成
npx create-next-app@latest my-app
# ✔ Would you like to use Tailwind CSS? … Yes を選択

# 既存プロジェクトに手動で追加する場合
npm install tailwindcss @tailwindcss/postcss postcss

# Tailwind v4 ではCSSファイルに@importを追加するだけでOK`}
              language="bash"
              title="Tailwind CSS のインストール"
            />

            <CodeBlock
              code={`/* app/globals.css - Tailwind v4 */
@import "tailwindcss";

/* カスタム CSS 変数やベーススタイルもここに追加 */
@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --font-sans: 'Inter', 'Noto Sans JP', sans-serif;
}

/* postcss.config.mjs */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;`}
              language="css"
              title="globals.css と PostCSS 設定"
            />

            <CodeBlock
              code={`// app/layout.tsx - グローバルCSSを読み込む
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}

// app/page.tsx - Tailwind でスタイリング
export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        こんにちは、Next.js！
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        Tailwind CSS で美しい UI を素早く構築できます。
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg
                         hover:bg-blue-700 transition-colors font-medium">
        はじめる
      </button>
    </main>
  );
}`}
              language="tsx"
              title="Tailwind CSS を使ったコンポーネント"
            />

            <InfoBox type="success" title="Tailwind と App Router の相性">
              <p>
                Tailwind CSS はビルド時に CSS を生成する仕組みのため、
                Server Component でも Client Component でも問題なく動作します。
                ランタイムでの JavaScript 処理が不要なため、パフォーマンスにも優れています。
                App Router で最も推奨されるスタイリング手法の一つです。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: Tailwind のカスタマイズ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Tailwind のカスタマイズ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              プロジェクトのデザインシステムに合わせて Tailwind をカスタマイズする方法です。
              色、フォント、ブレークポイントなどを自由に設定できます。
            </p>

            <CodeBlock
              code={`/* app/globals.css - Tailwind v4 でのカスタマイズ */
@import "tailwindcss";

@theme {
  /* カスタムカラー */
  --color-brand-50: #eff6ff;
  --color-brand-100: #dbeafe;
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;
  --color-brand-700: #1d4ed8;

  /* フォント */
  --font-sans: 'Noto Sans JP', 'Inter', system-ui, sans-serif;
  --font-heading: 'Inter', system-ui, sans-serif;

  /* カスタム間隔 */
  --spacing-18: 4.5rem;
  --spacing-88: 22rem;

  /* アニメーション */
  --animate-fade-in: fade-in 0.5s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ベーススタイル */
@layer base {
  h1 { @apply text-3xl font-bold tracking-tight; }
  h2 { @apply text-2xl font-bold; }
  h3 { @apply text-xl font-semibold; }
}

/* カスタムコンポーネント */
@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-brand-600 text-white rounded-lg
           hover:bg-brand-700 transition-colors font-medium;
  }
  .card {
    @apply rounded-xl border border-gray-200 bg-white p-6
           shadow-sm hover:shadow-md transition-shadow;
  }
}`}
              language="css"
              title="デザインシステムに合わせたカスタマイズ"
            />

            <CodeBlock
              code={`// コンポーネントでカスタムクラスを使う
export function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card">
      <h3 className="text-brand-700 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      <button className="btn-primary mt-4">詳しく見る</button>
    </div>
  );
}

// cn ユーティリティ（clsx + tailwind-merge）を使うパターン
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 条件付きクラスの適用
export function Badge({
  variant = 'default',
  children,
}: {
  variant?: 'default' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variant === 'default' && 'bg-gray-100 text-gray-800',
        variant === 'success' && 'bg-green-100 text-green-800',
        variant === 'warning' && 'bg-amber-100 text-amber-800',
        variant === 'error' && 'bg-red-100 text-red-800'
      )}
    >
      {children}
    </span>
  );
}`}
              language="tsx"
              title="カスタムクラスと cn ユーティリティ"
            />
          </section>

          {/* セクション 3: MUI (Material UI) のセットアップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">MUI（Material UI）のセットアップ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              MUI は CSS-in-JS（Emotion）を使用しているため、App Router で使うには
              追加の設定が必要です。SSR でスタイルが正しく適用されるように設定しましょう。
            </p>

            <CodeBlock
              code={`# MUI のインストール
npm install @mui/material @mui/material-nextjs @emotion/react @emotion/cache @emotion/styled

# アイコンも使う場合
npm install @mui/icons-material`}
              language="bash"
              title="MUI のインストール"
            />

            <CodeBlock
              code={`// app/layout.tsx - MUI の App Router 対応設定
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {/* AppRouterCacheProvider で Emotion のキャッシュを管理 */}
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}`}
              language="tsx"
              title="MUI の App Router 設定"
            />

            <CodeBlock
              code={`// lib/theme.ts - MUI テーマの定義
'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#8b5cf6',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Noto Sans JP", "Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // 大文字変換を無効化
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme;`}
              language="tsx"
              title="MUI テーマのカスタマイズ"
            />

            <InfoBox type="warning" title="MUI コンポーネントは Client Component">
              <p>
                MUI のコンポーネントは内部で React の hooks やイベントハンドラを使用しているため、
                Client Component でのみ使用できます。MUI コンポーネントを使うファイルには
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use client'</code> を付けるか、
                Server Component から Client Component として import してください。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: MUI コンポーネントの使い方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">MUI コンポーネントの使い方</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              App Router で MUI コンポーネントを使うときの、Server / Client Component の構成パターンを見てみましょう。
            </p>

            <CodeBlock
              code={`// app/dashboard/page.tsx - Server Component（データ取得）
import { DashboardContent } from './DashboardContent';

export default async function DashboardPage() {
  // サーバーでデータを取得
  const stats = await fetch('https://api.example.com/stats').then(
    (res) => res.json()
  );

  // Client Component にデータを渡す
  return <DashboardContent stats={stats} />;
}

// ---

// app/dashboard/DashboardContent.tsx - Client Component（MUI）
'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
} from '@mui/material';
import { TrendingUp, People, ShoppingCart } from '@mui/icons-material';

type Stats = {
  revenue: number;
  users: number;
  orders: number;
};

export function DashboardContent({ stats }: { stats: Stats }) {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        ダッシュボード
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <TrendingUp color="primary" />
                <Typography variant="body2" color="text.secondary">
                  売上
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight="bold">
                {stats.revenue.toLocaleString()}円
              </Typography>
              <Chip label="+12.5%" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <People color="secondary" />
                <Typography variant="body2" color="text.secondary">
                  ユーザー数
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight="bold">
                {stats.users.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <ShoppingCart color="action" />
                <Typography variant="body2" color="text.secondary">
                  注文数
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight="bold">
                {stats.orders.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Button variant="contained" sx={{ mt: 4 }}>
        レポートを表示
      </Button>
    </Box>
  );
}`}
              language="tsx"
              title="Server Component + MUI Client Component の構成"
              showLineNumbers
            />
          </section>

          {/* セクション 5: Tailwind vs MUI 比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Tailwind CSS vs MUI：どちらを選ぶ？</h2>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">Tailwind CSS が向いている場合</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>独自デザインのサイト（ポートフォリオ、LP）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>Figma のデザインを忠実に再現したい</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>Server Component を多用する構成</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>バンドルサイズを小さくしたい</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>パフォーマンスを最優先にしたい</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">MUI が向いている場合</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>管理画面・ダッシュボード系アプリ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>Material Design に沿った UI が必要</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>テーブル、ダイアログ、フォームが多い</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>アクセシビリティ対応済みのコンポーネントが欲しい</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>デザインシステムが確立されていない</span>
                  </li>
                </ul>
              </div>
            </div>

            <InfoBox type="info" title="両方使うことも可能">
              <p>
                Tailwind CSS と MUI は共存できます。MUI でコンポーネントの構造を作り、
                Tailwind でレイアウトや微調整を行うハイブリッドアプローチも実践的です。
                ただし、スタイルの競合に注意が必要です。
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">important: true</code> の設定や
                CSS の優先順位を理解しておきましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション 6: shadcn/ui という選択肢 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">shadcn/ui という選択肢</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Tailwind CSS ベースで、MUI のようなコンポーネント集が欲しい場合は
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">shadcn/ui</code> が人気です。
              コンポーネントのコードがプロジェクトにコピーされるため、自由にカスタマイズできます。
            </p>

            <CodeBlock
              code={`# shadcn/ui のセットアップ
npx shadcn@latest init

# コンポーネントを追加
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add table`}
              language="bash"
              title="shadcn/ui のインストール"
            />

            <CodeBlock
              code={`// shadcn/ui を使った例
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Server Component でもそのまま使える！
export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">料金プラン</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>スターター</CardTitle>
            <CardDescription>個人利用向け</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold mb-4">無料</p>
            <Button className="w-full" variant="outline">
              始める
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle>プロ</CardTitle>
            <CardDescription>チーム向け</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold mb-4">¥2,980/月</p>
            <Button className="w-full">申し込む</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// shadcn/ui の特徴:
// - Tailwind CSS ベース（Server Component で動作）
// - コードがプロジェクトに入るのでカスタマイズ自由
// - Radix UI ベースでアクセシビリティも万全
// - App Router との相性が最も良い UI ライブラリの一つ`}
              language="tsx"
              title="shadcn/ui の使用例"
            />

            <InfoBox type="success" title="デザイナーにおすすめ">
              <p>
                shadcn/ui はコンポーネントのソースコードがプロジェクト内にあるため、
                デザインの微調整が非常にやりやすいです。Tailwind CSS の知識があればすぐに使いこなせます。
                App Router との相性も良く、現在の Next.js プロジェクトで最も人気のある選択肢の一つです。
              </p>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'CSS スタイリング - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/styling',
                  description: 'Next.js でのスタイリング手法の概要',
                },
                {
                  title: 'Tailwind CSS - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/styling/tailwind-css',
                  description: 'Next.js での Tailwind CSS の設定',
                },
                {
                  title: 'Material UI - Next.js 統合',
                  url: 'https://mui.com/material-ui/integrations/nextjs/',
                  description: 'MUI を Next.js App Router で使う方法',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
