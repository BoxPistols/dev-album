import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function EmotionPage() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 20</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Emotion</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          もう一つの人気 CSS-in-JS ライブラリ「Emotion」を学びます。
          styled-components との違いや、Emotion 独自の css prop アプローチを理解しましょう。
        </p>

        <WhyNowBox tags={['Emotion', 'css prop', 'styled', 'テーマ']}>
          <p>
            styled-components を学んだ今、もう一つの主要な CSS-in-JS ライブラリである Emotion を知ることで、
            プロジェクトに最適なツールを選択できるようになります。
            Emotion は styled-components と似た API に加え、より柔軟な「css prop」というアプローチを提供します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: インストール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">インストールとセットアップ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion は主に2つのパッケージから構成されています。
              用途に応じて必要なパッケージをインストールします。
            </p>

            <CodeBlock
              language="bash"
              title="インストール"
              code={`# css prop を使う場合（推奨）
npm install @emotion/react

# styled API も使う場合（styled-components 風の書き方）
npm install @emotion/react @emotion/styled`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Vite でのセットアップ</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion の css prop を使うには、JSX の変換方法を設定する必要があります。
              方法は2つあります。
            </p>

            <CodeBlock
              language="typescript"
              title="方法1: vite.config.ts で設定（推奨）"
              code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',  // Emotion の JSX 変換を使用
      babel: {
        plugins: ['@emotion/babel-plugin'],  // オプション: 追加最適化
      },
    }),
  ],
});`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="typescript"
              title="方法2: tsconfig.json で設定"
              code={`{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react"
  }
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="方法3: ファイル単位で設定（JSX pragma）"
              code={`// ファイルの先頭にこのコメントを追加
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

// このファイル内で css prop が使える
function App() {
  return (
    <div css={css\`padding: 24px;\`}>
      こんにちは
    </div>
  );
}`}
            />

            <InfoBox type="info" title="どの方法を選ぶ？">
              <p>
                プロジェクト全体で Emotion を使う場合は方法1（vite.config.ts）がおすすめです。
                部分的にだけ使う場合や、試しに使ってみたい場合は方法3（JSX pragma）が手軽です。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: css prop vs styled API 使い分けガイド */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">css prop vs styled API の使い分け</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion の大きな特徴は、<strong>css prop</strong> と <strong>styled API</strong> の
              2つのスタイリング手法を提供していることです。
              どちらを使うべきか迷う場面が多いので、使い分けの基準を明確にしましょう。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-border rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-4 py-3 text-left font-semibold">観点</th>
                    <th className="border border-border px-4 py-3 text-left font-semibold">css prop</th>
                    <th className="border border-border px-4 py-3 text-left font-semibold">styled API</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium">新コンポーネントの作成</td>
                    <td className="border border-border px-4 py-2">不要（既存要素に直接適用）</td>
                    <td className="border border-border px-4 py-2">必要（ラッパーコンポーネント生成）</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-2 font-medium">再利用性</td>
                    <td className="border border-border px-4 py-2">変数に抽出して再利用</td>
                    <td className="border border-border px-4 py-2">コンポーネントとして再利用</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium">適した場面</td>
                    <td className="border border-border px-4 py-2">一度きりのスタイル、プロトタイプ</td>
                    <td className="border border-border px-4 py-2">UIライブラリ、共通コンポーネント</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-2 font-medium">動的スタイル</td>
                    <td className="border border-border px-4 py-2">関数で生成、テーマコールバック</td>
                    <td className="border border-border px-4 py-2">props で制御</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium">コードの見通し</td>
                    <td className="border border-border px-4 py-2">JSX に直接スタイルが見える</td>
                    <td className="border border-border px-4 py-2">スタイルとJSXが分離</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-2 font-medium">移行コスト</td>
                    <td className="border border-border px-4 py-2">JSX pragma 設定が必要</td>
                    <td className="border border-border px-4 py-2">styled-components とほぼ同じ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">推奨: 使い分けの基本方針</h3>
            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <ul className="space-y-3 text-foreground/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">1.</span>
                  <span><strong>ページ固有のレイアウト</strong>やその場限りのスタイルには <strong>css prop</strong> — 新しいコンポーネントを作る必要がなく、手軽</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">2.</span>
                  <span><strong>共通 UI コンポーネント</strong>（Button, Card, Badge 等）には <strong>styled</strong> — 再利用しやすく、props による動的スタイルが書きやすい</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">3.</span>
                  <span>1つのプロジェクト内で両方を混在させても問題ない — Emotion はどちらも同じスタイルシートに挿入する</span>
                </li>
              </ul>
            </div>

            <CodePreview
              language="tsx"
              title="混在パターンの実例（プレビュー）"
              code={`function App() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
          プロフィール{' '}
          <span style={{ padding: '2px 8px', borderRadius: 9999, fontSize: '0.75rem', background: '#eff6ff', color: '#3b82f6', verticalAlign: 'middle' }}>Pro</span>
        </h1>
        <button style={{ padding: '10px 20px', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', background: '#3b82f6', color: 'white' }}>編集</button>
      </header>
      <div style={{ background: '#f8fafc', borderRadius: 12, padding: 24 }}>
        <p style={{ color: '#64748b', lineHeight: 1.6 }}>styled API と css prop を1つのページで混在して使えます。</p>
      </div>
    </div>
  );
}`}
              previewHeight={160}
            />
          </section>

          {/* セクション3: css prop アプローチ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">css prop アプローチ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion の最大の特徴は <code className="bg-muted px-1.5 py-0.5 rounded text-sm">css</code> prop です。
              既存の HTML 要素やコンポーネントに直接スタイルを渡せます。
              新しいコンポーネントを作成する必要がないのが大きな利点です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">テンプレートリテラル記法</h3>
            <CodePreview
              language="tsx"
              title="css prop + テンプレートリテラル（プレビュー）"
              code={`function App() {
  return (
    <div style={{
      background: 'white', borderRadius: 12, padding: 24,
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
        カードタイトル
      </h3>
      <p style={{ color: '#64748b', lineHeight: 1.6 }}>
        カードの説明文です。Emotion の css prop で直接スタイルを適用しています。
      </p>
    </div>
  );
}`}
              previewHeight={140}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">オブジェクト記法</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS をオブジェクトとして書く方法もあります。TypeScript との相性が良く、
              プロパティ名の補完が効きます。
            </p>

            <CodeBlock
              language="tsx"
              title="css prop + オブジェクト記法"
              code={`/** @jsxImportSource @emotion/react */

function Card() {
  return (
    <div
      css={{
        background: 'white',
        borderRadius: 12,        // 数値は px に変換される
        padding: 24,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        transition: 'box-shadow 0.2s ease',
        '&:hover': {             // ネストもオブジェクトで
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        },
        '@media (max-width: 768px)': {  // メディアクエリ
          padding: 16,
        },
      }}
    >
      <h3 css={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>
        カードタイトル
      </h3>
    </div>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">スタイルを変数に抽出</h3>
            <CodeBlock
              language="tsx"
              title="スタイルの分離"
              code={`/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// スタイルを変数として定義
const cardStyle = css\`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
\`;

const titleStyle = css\`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
\`;

// 動的スタイルは関数で
const statusStyle = (isActive: boolean) => css\`
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: \${isActive ? '#dcfce7' : '#fee2e2'};
  color: \${isActive ? '#16a34a' : '#dc2626'};
\`;

function StatusCard({ title, isActive }: { title: string; isActive: boolean }) {
  return (
    <div css={cardStyle}>
      <h3 css={titleStyle}>{title}</h3>
      <span css={statusStyle(isActive)}>
        {isActive ? 'アクティブ' : '非アクティブ'}
      </span>
    </div>
  );
}`}
            />
          </section>

          {/* セクション4: styled アプローチ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">styled アプローチ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">@emotion/styled</code> を使うと、
              styled-components とほぼ同じ API でスタイルコンポーネントを作成できます。
            </p>

            <CodeBlock
              language="tsx"
              title="@emotion/styled の使い方"
              code={`import styled from '@emotion/styled';

// styled-components とほぼ同じ API
const Container = styled.div\`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
\`;

const Title = styled.h1\`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
\`;

// props ベースの動的スタイル
const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>\`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  background: \${(props) => (props.$variant === 'primary' ? '#3b82f6' : '#f1f5f9')};
  color: \${(props) => (props.$variant === 'primary' ? 'white' : '#334155')};

  &:hover {
    opacity: 0.9;
  }
\`;

// スタイルの拡張
const RoundButton = styled(Button)\`
  border-radius: 9999px;
\`;

// オブジェクト記法も可能
const Badge = styled.span({
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: 9999,
  fontSize: '0.75rem',
  fontWeight: 500,
  backgroundColor: '#eff6ff',
  color: '#3b82f6',
});`}
            />

            <InfoBox type="info" title="styled-components からの移行">
              <p>
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">@emotion/styled</code> は
                styled-components と API がほぼ同じです。
                import 文を <code className="bg-muted px-1.5 py-0.5 rounded text-sm">import styled from '@emotion/styled'</code>
                に変更するだけで、多くのコードがそのまま動きます。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: スタイルの合成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">スタイルの合成（Composition）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion の大きな強みの一つが、スタイルの合成です。
              複数のスタイルを組み合わせて、新しいスタイルを作れます。
            </p>

            <CodePreview
              language="tsx"
              title="配列でスタイルを合成（プレビュー）"
              code={`function App() {
  var base = {
    border: 'none', borderRadius: 8, fontWeight: 600,
    cursor: 'pointer', marginRight: 8, marginBottom: 8,
  };
  var variants = {
    primary: { background: '#3b82f6', color: 'white' },
    secondary: { background: '#f1f5f9', color: '#334155' },
    outline: { background: 'transparent', color: '#3b82f6', border: '2px solid #3b82f6' },
  };
  var sizes = {
    sm: { padding: '6px 12px', fontSize: '0.8rem' },
    md: { padding: '10px 20px', fontSize: '0.875rem' },
    lg: { padding: '14px 28px', fontSize: '1rem' },
  };

  function Btn({ variant, size, children }) {
    var s = Object.assign({}, base, variants[variant || 'primary'], sizes[size || 'md']);
    return React.createElement('button', { style: s }, children);
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      <Btn variant="primary" size="sm">Primary SM</Btn>
      <Btn variant="secondary" size="md">Secondary MD</Btn>
      <Btn variant="outline" size="lg">Outline LG</Btn>
      <Btn variant="primary" size="lg">Primary LG</Btn>
    </div>
  );
}`}
              previewHeight={80}
            />

            <InfoBox type="success" title="合成の利点">
              <p>
                スタイルの合成により、基本スタイルとバリアントスタイルを明確に分離できます。
                配列の後ろのスタイルが前のスタイルを上書きするため、
                スタイルの優先順位が直感的で予測可能です。
              </p>
            </InfoBox>
          </section>

          {/* セクション6: Emotion + TypeScript の型安全テーマ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Emotion + TypeScript の型安全テーマ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion のテーマ機能は TypeScript と深く統合できます。
              テーマの型を正しく設定すると、テーマの値を参照するときに補完とエラーチェックが効くようになります。
            </p>

            <CodeBlock
              language="tsx"
              title="型安全なテーマの定義"
              code={`// src/theme.ts — テーマ定義
export const lightTheme = {
  colors: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    secondary: '#8b5cf6',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    textMuted: '#64748b',
    border: '#e2e8f0',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  },
  spacing: (factor: number) => \`\${factor * 4}px\`,
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.06)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 12px 32px rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
  },
} as const;

export const darkTheme: typeof lightTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#60a5fa',
    primaryHover: '#93bbfd',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    border: '#334155',
  },
  shadow: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg: '0 12px 32px rgba(0, 0, 0, 0.5)',
  },
};

export type AppTheme = typeof lightTheme;`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="typescript"
              title="src/emotion.d.ts — Emotion の Theme 型を拡張"
              code={`// この型定義が TypeScript の補完を有効にする鍵
import type { AppTheme } from './theme';

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}

// これで props.theme のすべてのプロパティに型補完が効く:
// props.theme.colors.primary  → string ✓
// props.theme.colors.foo      → TypeScript エラー ✗
// props.theme.spacing(3)      → "12px" ✓
// props.theme.radius.lg       → "12px" ✓`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="型安全なテーマの使用"
              code={`/** @jsxImportSource @emotion/react */
import { css, ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { lightTheme, darkTheme } from './theme';
import { useState } from 'react';

// styled で使う場合 — props.theme に型補完が効く
const Card = styled.div\`
  background: \${(p) => p.theme.colors.surface};
  color: \${(p) => p.theme.colors.text};
  border: 1px solid \${(p) => p.theme.colors.border};
  border-radius: \${(p) => p.theme.radius.lg};
  padding: \${(p) => p.theme.spacing(6)};
  box-shadow: \${(p) => p.theme.shadow.md};
  font-family: \${(p) => p.theme.typography.fontFamily};
\`;

// css prop + テーマコールバック — useTheme() が不要
function Alert({ type, children }: { type: 'success' | 'warning' | 'danger'; children: React.ReactNode }) {
  return (
    <div
      css={(theme) => ({
        padding: theme.spacing(4),
        borderRadius: theme.radius.md,
        borderLeft: \`4px solid \${theme.colors[type]}\`,
        background: theme.colors.surface,
        fontSize: theme.typography.fontSize.sm,
      })}
    >
      {children}
    </div>
  );
}

// useTheme フックでテーマにアクセス
function ThemeInfo() {
  const theme = useTheme();
  return (
    <p css={{ color: theme.colors.textMuted, fontSize: theme.typography.fontSize.xs }}>
      現在のプライマリカラー: {theme.colors.primary}
    </p>
  );
}

// アプリ
function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Card>
        <Alert type="success">テーマが正しく適用されています</Alert>
        <ThemeInfo />
        <button onClick={() => setIsDark(!isDark)}>テーマ切替</button>
      </Card>
    </ThemeProvider>
  );
}`}
            />

            <InfoBox type="info" title="spacing 関数パターン">
              <p>
                <code className="bg-muted px-1 rounded">spacing(factor: number)</code> のように関数でスペーシングを定義すると、
                <code className="bg-muted px-1 rounded">spacing(1)</code> = 4px、<code className="bg-muted px-1 rounded">spacing(2)</code> = 8px...
                のように一貫したスケールで値を使えます。
                MUI のテーマでもこのパターンが採用されています。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: @emotion/babel-plugin */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">@emotion/babel-plugin の最適化</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">@emotion/babel-plugin</code> はオプションですが、
              導入すると開発体験とパフォーマンスの両面でメリットがあります。
            </p>

            <CodeBlock
              language="bash"
              title="インストール"
              code={`npm install -D @emotion/babel-plugin`}
            />

            <div className="mt-4" />

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-foreground mb-3">プラグインが行う最適化</h3>
              <div className="space-y-3 text-foreground/80 text-sm">
                <div>
                  <strong className="text-foreground">1. ソースマッピング</strong>
                  <p className="ml-4 mt-1">開発者ツールで、生成されたクラス名がどのコンポーネント・ファイルに由来するかを確認できるようになります。</p>
                </div>
                <div>
                  <strong className="text-foreground">2. ラベル付け</strong>
                  <p className="ml-4 mt-1">生成されるクラス名に変数名やコンポーネント名が含まれ、デバッグしやすくなります（例: <code className="bg-muted px-1 rounded">css-cardStyle-1a2b3c</code>）。</p>
                </div>
                <div>
                  <strong className="text-foreground">3. CSS の最適化</strong>
                  <p className="ml-4 mt-1">不要な空白や改行を除去し、CSS 文字列を圧縮します。</p>
                </div>
                <div>
                  <strong className="text-foreground">4. 静的スタイルの事前評価</strong>
                  <p className="ml-4 mt-1">props に依存しない静的なスタイルをビルド時に事前計算し、ランタイムのオーバーヘッドを削減します。</p>
                </div>
              </div>
            </div>

            <CodeBlock
              language="typescript"
              title="vite.config.ts での設定"
              code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          [
            '@emotion/babel-plugin',
            {
              sourceMap: true,        // ソースマッピング（開発時に有用）
              autoLabel: 'dev-only',  // ラベルは開発時のみ付与
              labelFormat: '[dirname]--[filename]--[local]',
              // → 例: components--Card--cardStyle
            },
          ],
        ],
      },
    }),
  ],
});`}
            />
          </section>

          {/* セクション8: styled-components との比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">styled-components との比較</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-4 py-3 text-left font-semibold">特徴</th>
                    <th className="border border-border px-4 py-3 text-left font-semibold">styled-components</th>
                    <th className="border border-border px-4 py-3 text-left font-semibold">Emotion</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium">styled API</td>
                    <td className="border border-border px-4 py-2">対応</td>
                    <td className="border border-border px-4 py-2">対応（@emotion/styled）</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-2 font-medium">css prop</td>
                    <td className="border border-border px-4 py-2">v6 で対応（限定的）</td>
                    <td className="border border-border px-4 py-2">完全対応（主要機能）</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium">スタイルの合成</td>
                    <td className="border border-border px-4 py-2">拡張のみ</td>
                    <td className="border border-border px-4 py-2">配列で合成可能</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-2 font-medium">バンドルサイズ</td>
                    <td className="border border-border px-4 py-2">約 12.7 kB</td>
                    <td className="border border-border px-4 py-2">約 11.2 kB</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium">MUI との関係</td>
                    <td className="border border-border px-4 py-2">MUI v4 で代替オプション（デフォルトは JSS）</td>
                    <td className="border border-border px-4 py-2">MUI v5 のデフォルト</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-2 font-medium">SSR</td>
                    <td className="border border-border px-4 py-2">ServerStyleSheet が必要</td>
                    <td className="border border-border px-4 py-2">extractCritical が必要</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* セクション9: 実践例 レスポンシブカード */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: レスポンシブレイアウト</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion の css prop を使って、レスポンシブなレイアウトコンポーネントを作ります。
            </p>

            <CodeBlock
              language="tsx"
              title="レスポンシブグリッドレイアウト"
              code={`/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// ブレイクポイント定義
const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 };
const mq = {
  sm: \`@media (min-width: \${breakpoints.sm}px)\`,
  md: \`@media (min-width: \${breakpoints.md}px)\`,
  lg: \`@media (min-width: \${breakpoints.lg}px)\`,
};

// レスポンシブカード
const cardStyle = css\`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }
\`;

const cardImageStyle = css\`
  width: 100%;
  height: 160px;
  object-fit: cover;

  \${mq.md} {
    height: 200px;
  }
\`;

const cardBodyStyle = css\`
  padding: 16px;

  \${mq.md} {
    padding: 20px;
  }
\`;

interface CardProps {
  image: string;
  title: string;
  description: string;
  tags: string[];
}

function Card({ image, title, description, tags }: CardProps) {
  return (
    <div css={cardStyle}>
      <img css={cardImageStyle} src={image} alt={title} />
      <div css={cardBodyStyle}>
        <h3 css={css\`
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 8px;
          \${mq.md} { font-size: 1.125rem; }
        \`}>
          {title}
        </h3>
        <p css={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
          {description}
        </p>
        <div css={css\`display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px;\`}>
          {tags.map((tag) => (
            <span
              key={tag}
              css={{
                padding: '2px 10px',
                borderRadius: 9999,
                fontSize: '0.7rem',
                fontWeight: 500,
                background: '#eff6ff',
                color: '#3b82f6',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// グリッドレイアウト
function Portfolio() {
  return (
    <div css={css\`
      display: grid;
      gap: 24px;
      grid-template-columns: 1fr;
      \${mq.sm} { grid-template-columns: repeat(2, 1fr); }
      \${mq.lg} { grid-template-columns: repeat(3, 1fr); }
    \`}>
      <Card
        image="/project1.jpg"
        title="EC サイトリデザイン"
        description="ユーザー体験を改善するためのリデザイン"
        tags={['UI/UX', 'Figma', 'React']}
      />
      {/* 他のカード... */}
    </div>
  );
}`}
            />
          </section>

          {/* セクション10: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>

            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">1.</span>
                  <span><strong>Emotion</strong> は css prop と styled の2つのアプローチを提供する CSS-in-JS ライブラリ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">2.</span>
                  <span><strong>css prop</strong> は新しいコンポーネントを作らずに既存要素にスタイルを適用でき、手軽さが魅力</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">3.</span>
                  <span><strong>スタイルの合成</strong>（配列での結合）は Emotion の大きな強み</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">4.</span>
                  <span><strong>TypeScript</strong> でテーマ型を拡張すると、テーマ値の型チェック・補完が効くようになる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">5.</span>
                  <span><strong>MUI v5</strong> が Emotion をデフォルトのスタイリングエンジンとして採用しているため、MUI と組み合わせる場合に特に有力</span>
                </li>
              </ul>
            </div>

            <div className="mt-6" />

            <InfoBox type="success" title="次のステップ">
              <p>
                ここまでで主要な CSS-in-JS ライブラリを学びました。
                次のステップでは、CSS 設計パターン（BEM、SMACSS、Atomic Design など）を学び、
                どのアプローチを選んでもスケーラブルな CSS を書くための設計指針を身につけます。
              </p>
            </InfoBox>
          </section>

          {/* 理解度チェック 1 */}
          <section>
            <Quiz
              question="Emotion の css prop と styled API の使い分けとして、最も適切なのはどれですか？"
              options={[
                { label: 'css prop は非推奨なので、常に styled を使うべき' },
                { label: 'styled は非推奨なので、常に css prop を使うべき' },
                { label: 'ページ固有のスタイルは css prop、再利用する共通コンポーネントは styled が適している', correct: true },
                { label: 'パフォーマンスの観点から、css prop のみを使うべき' },
              ]}
              explanation="css prop は新しいコンポーネントを作成せずに直接スタイルを適用できるため、ページ固有のレイアウトやワンオフのスタイルに適しています。styled API は再利用可能なコンポーネントを作る場面に適しています。両方を同じプロジェクト内で混在させても問題ありません。"
            />
          </section>

          {/* 理解度チェック 2 */}
          <section>
            <Quiz
              question="Emotion で TypeScript のテーマ型を設定する方法として正しいのはどれですか？"
              options={[
                { label: 'ThemeProvider に generics でテーマ型を渡す' },
                { label: 'declare module "@emotion/react" で Theme インターフェースを拡張する', correct: true },
                { label: 'css 関数の引数にテーマ型を指定する' },
                { label: 'テーマの型は自動的に推論されるので何もしなくてよい' },
              ]}
              explanation={'Emotion のテーマ型を有効にするには、declare module "@emotion/react" でグローバルの Theme インターフェースを拡張する型定義ファイル（.d.ts）を作成します。これにより、props.theme やテーマコールバック関数の引数に対して、定義したテーマの型が自動的に適用されます。'}
            />
          </section>

          {/* コーディングチャレンジ */}
          <section>
            <CodingChallenge
              title="Emotion でレスポンシブカードを作成"
              description="Emotion の css prop を使って、モバイルでは padding: 16px、768px 以上では padding: 24px になるカードスタイルを定義してください。オブジェクト記法で書いてください。"
              initialCode={`/** @jsxImportSource @emotion/react */

function ResponsiveCard({ children }) {
  return (
    <div css={{
      // ここにスタイルを書く
    }}>
      {children}
    </div>
  );
}`}
              answer={`/** @jsxImportSource @emotion/react */

function ResponsiveCard({ children }) {
  return (
    <div css={{
      background: 'white',
      borderRadius: 12,
      padding: 16,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      '@media (min-width: 768px)': {
        padding: 24,
      },
    }}>
      {children}
    </div>
  );
}`}
              keywords={['@media (min-width: 768px)', 'padding:', 'borderRadius']}
              hints={[
                'オブジェクト記法では数値は自動的に px になります（例: padding: 16 → padding: 16px）',
                'メディアクエリは文字列キーで指定します: \'@media (min-width: 768px)\': { ... }',
                'オブジェクト記法では CSS プロパティをキャメルケースで書きます（例: border-radius → borderRadius）',
              ]}
            />
          </section>

          {/* リファレンスリンク */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Emotion 公式ドキュメント',
                  url: 'https://emotion.sh/docs/introduction',
                  description: 'css prop、styled API、テーミングなど包括的な公式ドキュメント',
                },
                {
                  title: 'Emotion GitHub リポジトリ',
                  url: 'https://github.com/emotion-js/emotion',
                  description: 'ソースコード、Issue、リリースノートを確認できる公式リポジトリ',
                },
                {
                  title: '@emotion/babel-plugin ドキュメント',
                  url: 'https://emotion.sh/docs/@emotion/babel-plugin',
                  description: 'Babel プラグインの設定オプションと最適化の詳細',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'Emotion の css prop を使うと既存の className は無効になりますか？',
                  answer: 'いいえ、css prop と className は共存できます。css prop で生成されたクラス名と、既存の className が両方とも要素に適用されます。例えば Tailwind CSS のクラスと Emotion のスタイルを同じ要素に使うことも技術的には可能です。',
                },
                {
                  question: 'MUI v5 で Emotion の知識は必須ですか？',
                  answer: 'MUI v5 は Emotion をスタイリングエンジンとして内蔵していますが、MUI の sx prop や styled() ユーティリティ経由で使うため、Emotion を直接意識する場面は少ないです。ただし、MUI のテーマをカスタマイズする際やカスタムコンポーネントを作る際には、Emotion の仕組みを理解していると役立ちます。',
                },
                {
                  question: 'Emotion のスタイルはキャッシュされますか？',
                  answer: 'はい、Emotion は生成したスタイルを内部でキャッシュします。同じスタイル定義が複数回評価されても、一度計算した CSS は再利用されるため、同じスタイルの <style> タグが重複して生成されることはありません。@emotion/cache パッケージでキャッシュの挙動をカスタマイズすることも可能です。',
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
