import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function StyledComponents() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 22</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">styled-components</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          最も人気のある CSS-in-JS ライブラリ「styled-components」を実践的に学びます。
          インストールから、動的スタイル、テーマ、アニメーションまで幅広くカバーします。
        </p>

        <WhyNowBox tags={['styled-components', 'CSS-in-JS', 'テーマ', 'アニメーション']}>
          <p>
            前のステップで CSS-in-JS の概念を学びました。
            ここでは実際に styled-components を使って、コンポーネントにスタイルを適用する方法を体験します。
            多くの React プロジェクトで採用されているため、コードを読む場面でも必ず役に立ちます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: インストールとセットアップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">インストールとセットアップ</h2>

            <CodeBlock
              language="bash"
              title="インストール"
              code={`# npm の場合
npm install styled-components

# TypeScript の型定義（styled-components v6 では不要、v5 以前は必要）
npm install -D @types/styled-components`}
            />

            <div className="mt-4" />

            <InfoBox type="info" title="styled-components v6">
              <p>
                styled-components v6 からは TypeScript の型定義が本体に含まれています。
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">@types/styled-components</code> は不要です。
                また、v6 では transient props（$接頭辞）がデフォルトで推奨されるようになりました。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Vite での設定</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Vite プロジェクトでは、特別な設定なしで styled-components を使えます。
              ただし、開発体験を向上させるプラグインを追加すると便利です。
            </p>

            <CodeBlock
              language="bash"
              title="Babel プラグイン（推奨）"
              code={`npm install -D babel-plugin-styled-components`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="typescript"
              title="vite.config.ts"
              code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,  // コンポーネント名をクラス名に含める（デバッグ用）
              fileName: false,    // ファイル名は含めない
            },
          ],
        ],
      },
    }),
  ],
});`}
            />

            <InfoBox type="info" title="displayName の効果">
              <p>
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">displayName: true</code> にすると、
                開発者ツールで <code className="bg-muted px-1.5 py-0.5 rounded text-sm">sc-bdVTJa</code> の代わりに
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">Button-sc-bdVTJa</code> のようにコンポーネント名が表示され、
                デバッグが格段にしやすくなります。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: 基本的な使い方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">基本的な使い方</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              styled-components では、<code className="bg-muted px-1.5 py-0.5 rounded text-sm">styled.要素名</code> に
              テンプレートリテラルで CSS を渡してコンポーネントを作ります。
            </p>

            <CodePreview
              language="tsx"
              title="基本的なスタイルコンポーネント"
              code={`function App() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b', marginBottom: 16, lineHeight: 1.2 }}>
        React でスタイリングを学ぼう
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: 1.8, maxWidth: 640 }}>
        styled-components を使えば、CSS の知識をそのまま活かして
        コンポーネントにスタイルを適用できます。
      </p>
      <button style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '12px 24px', border: 'none', borderRadius: 8,
        backgroundColor: '#3b82f6', color: 'white',
        fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
        marginTop: 16,
      }}>
        はじめる
      </button>
    </div>
  );
}`}
              previewHeight={200}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">ネストと擬似要素</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              SCSS のようなネスト記法が使えます。<code className="bg-muted px-1.5 py-0.5 rounded text-sm">&</code> は現在の要素を参照します。
            </p>

            <CodeBlock
              language="tsx"
              title="ネストと擬似要素の例"
              code={`const Card = styled.div\`
  background: white;
  border-radius: 12px;
  padding: 24px;
  position: relative;
  overflow: hidden;

  /* ホバー時のスタイル */
  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  /* 擬似要素 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  }

  /* 子要素のスタイル */
  & h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 8px;
  }

  & p {
    color: #64748b;
    line-height: 1.6;
  }

  /* 隣接セレクタ */
  & + & {
    margin-top: 16px;
  }

  /* メディアクエリ */
  @media (max-width: 768px) {
    padding: 16px;
  }
\`;`}
            />
          </section>

          {/* セクション3: Props ベースの動的スタイル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Props ベースの動的スタイル</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              styled-components の最大の強みの一つは、props に基づいてスタイルを動的に変更できることです。
              v6 では、DOM に渡さない props には <code className="bg-muted px-1.5 py-0.5 rounded text-sm">$</code> 接頭辞（transient props）を使います。
            </p>

            <CodePreview
              language="tsx"
              title="動的スタイルの基本"
              code={`function App() {
  function Button({ primary, children }) {
    return (
      <button style={{
        padding: '10px 20px', borderRadius: 6, fontWeight: 600,
        cursor: 'pointer', transition: 'all 0.2s ease',
        backgroundColor: primary ? '#3b82f6' : 'transparent',
        color: primary ? 'white' : '#3b82f6',
        border: '2px solid #3b82f6', marginRight: 8,
      }}>
        {children}
      </button>
    );
  }

  return (
    <div>
      <Button primary>プライマリ</Button>
      <Button>アウトライン</Button>
    </div>
  );
}`}
              previewHeight={80}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">複数の props を使う例</h3>
            <CodePreview
              language="tsx"
              title="サイズとバリアントの組み合わせ"
              code={`function App() {
  var variants = {
    primary: { backgroundColor: '#3b82f6', color: 'white', border: 'none' },
    secondary: { backgroundColor: '#6b7280', color: 'white', border: 'none' },
    outline: { backgroundColor: 'transparent', color: '#3b82f6', border: '2px solid #3b82f6' },
    ghost: { backgroundColor: 'transparent', color: '#374151', border: 'none' },
  };
  var sizes = {
    sm: { padding: '6px 12px', fontSize: '0.75rem' },
    md: { padding: '10px 20px', fontSize: '0.875rem' },
    lg: { padding: '14px 28px', fontSize: '1rem' },
  };

  function StyledButton({ variant, size, fullWidth, children }) {
    var v = variant || 'primary';
    var s = size || 'md';
    var style = Object.assign({
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: 8, borderRadius: 8, fontWeight: 600, cursor: 'pointer',
      transition: 'all 0.2s ease', width: fullWidth ? '100%' : 'auto',
    }, variants[v], sizes[s]);
    return React.createElement('button', { style: style }, children);
  }

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <StyledButton variant="primary" size="sm">小さいボタン</StyledButton>
      <StyledButton variant="secondary" size="md">中ボタン</StyledButton>
      <StyledButton variant="outline" size="lg">大きいアウトライン</StyledButton>
      <StyledButton variant="ghost">ゴースト</StyledButton>
      <StyledButton variant="primary" fullWidth>全幅ボタン</StyledButton>
    </div>
  );
}`}
              previewHeight={120}
            />

            <InfoBox type="warning" title="$ 接頭辞を忘れずに">
              <p>
                styled-components v6 では、スタイリング専用の props には
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">$</code> を付けましょう。
                付けないと、その props が実際の DOM 要素に HTML 属性として渡されてしまい、
                コンソールに警告が表示されます。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: v6 の変更点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">styled-components v6 の主な変更点</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              styled-components v6 は 2023年にリリースされました。
              v5 からの移行時に知っておくべき主な変更点を解説します。
            </p>

            <div className="space-y-4">
              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">1. TypeScript の型定義が内蔵</h3>
                <p className="text-sm text-foreground/80">
                  <code className="bg-muted px-1 rounded">@types/styled-components</code> が不要になりました。
                  パッケージ本体に型定義が含まれているため、インストールするだけで TypeScript の補完が効きます。
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">2. Transient Props（$接頭辞）が推奨</h3>
                <p className="text-sm text-foreground/80">
                  スタイリング専用の props には <code className="bg-muted px-1 rounded">$</code> を付けることが強く推奨されます。
                  <code className="bg-muted px-1 rounded">shouldForwardProp</code> を手動で設定する必要がなくなりました。
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">3. スタイルの注入方法の変更</h3>
                <p className="text-sm text-foreground/80">
                  v6 では <code className="bg-muted px-1 rounded">CSSOM（insertRule）</code> ではなく
                  テキストノードベースの注入に変更されました。React の Concurrent Mode との互換性が向上しています。
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">4. .attrs() の仕様変更</h3>
                <p className="text-sm text-foreground/80">
                  <code className="bg-muted px-1 rounded">.attrs()</code> にオブジェクトを直接渡す書き方が非推奨になり、
                  関数形式（<code className="bg-muted px-1 rounded">{`.attrs((props) => ({ ... }))`}</code>）が推奨されます。
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">5. Node.js 16+ / React 18+ が必須</h3>
                <p className="text-sm text-foreground/80">
                  v6 は Node.js 16 以上、React 18 以上を要求します。
                  古い環境では v5 を継続使用する必要があります。
                </p>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="v5 → v6 の変更例"
              code={`// === v5 の書き方 ===
// shouldForwardProp が必要だった
const Box = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>\`
  opacity: \${(p) => (p.isActive ? 1 : 0.5)};
\`;

// .attrs() にオブジェクトを渡していた
const Input = styled.input.attrs({
  type: 'text',
  placeholder: '入力してください',
})\`
  padding: 8px;
\`;


// === v6 の書き方 ===
// $ 接頭辞で shouldForwardProp が不要に
const Box = styled.div<{ $isActive: boolean }>\`
  opacity: \${(p) => (p.$isActive ? 1 : 0.5)};
\`;

// .attrs() は関数形式を使う
const Input = styled.input.attrs(() => ({
  type: 'text',
  placeholder: '入力してください',
}))\`
  padding: 8px;
\`;`}
            />
          </section>

          {/* セクション5: スタイルの拡張 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">スタイルの拡張（Extending Styles）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              既存のスタイルコンポーネントを拡張して、新しいコンポーネントを作れます。
              CSS のカスケードのように、ベースのスタイルを継承しつつ追加・上書きができます。
            </p>

            <CodePreview
              language="tsx"
              title="スタイルの拡張"
              code={`function App() {
  var base = {
    padding: '10px 20px', border: 'none', borderRadius: 8,
    fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
  };

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <button style={{ ...base, backgroundColor: '#e2e8f0', color: '#334155' }}>ベース</button>
      <button style={{ ...base, backgroundColor: '#3b82f6', color: 'white' }}>プライマリ</button>
      <button style={{ ...base, backgroundColor: '#ef4444', color: 'white' }}>デンジャー</button>
      <button style={{ ...base, backgroundColor: '#3b82f6', color: 'white', borderRadius: 9999, padding: '10px 24px' }}>ラウンド</button>
    </div>
  );
}`}
              previewHeight={80}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">as prop でタグを変更</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">as</code> prop を使うと、
              スタイルはそのままにレンダリングされる HTML タグを変更できます。
            </p>

            <CodeBlock
              language="tsx"
              title="as prop の活用"
              code={`const Button = styled.button\`
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  cursor: pointer;
\`;

function Navigation() {
  return (
    <nav>
      {/* button として描画 */}
      <Button onClick={() => console.log('click')}>ボタン</Button>

      {/* a タグとして描画（リンクとして使う） */}
      <Button as="a" href="/about">アバウト</Button>

      {/* Link コンポーネントとして描画（React Router 等） */}
      <Button as={Link} to="/contact">お問い合わせ</Button>
    </nav>
  );
}`}
            />
          </section>

          {/* セクション6: SSR 対応 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">SSR 対応（ServerStyleSheet）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              styled-components を SSR（Next.js 等）で使う場合、サーバー側でスタイルを収集して
              HTML に埋め込む処理が必要です。これを行わないと FOUC（Flash of Unstyled Content）が発生します。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">Next.js Pages Router での設定</h3>
            <CodeBlock
              language="tsx"
              title="pages/_document.tsx（Next.js Pages Router）"
              code={`import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      // レンダリング中にスタイルを収集
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}  {/* 収集したスタイルを注入 */}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Next.js App Router での注意点</h3>
            <CodeBlock
              language="tsx"
              title="app/layout.tsx での設定（概要）"
              code={`// Next.js App Router では styled-components は Client Component でのみ動作する
// lib/registry.tsx
'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}`}
            />

            <InfoBox type="warning" title="App Router での制約">
              <p>
                Next.js App Router では styled-components は Client Component（<code className="bg-muted px-1 rounded">'use client'</code>）
                でのみ使用できます。Server Components 内では直接使えないため、
                スタイリングの適用範囲に注意が必要です。
                この制約が、Next.js プロジェクトで Tailwind CSS や CSS Modules が好まれる理由の一つです。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: グローバルスタイル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">グローバルスタイル</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">createGlobalStyle</code> を使うと、
              アプリケーション全体に適用されるグローバルスタイルを定義できます。
              リセット CSS やフォントの設定に使います。
            </p>

            <CodeBlock
              language="tsx"
              title="グローバルスタイルの定義"
              code={`import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle\`
  /* リセット */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ベーススタイル */
  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      sans-serif;
    line-height: 1.5;
    color: \${(props) => props.theme.colors.text};
    background-color: \${(props) => props.theme.colors.background};
  }

  /* リンク */
  a {
    color: \${(props) => props.theme.colors.primary};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* 画像 */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
\`;

// App のルートで使用
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />  {/* ← ここに配置 */}
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}`}
            />
          </section>

          {/* セクション8: テーミング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">テーミング（ThemeProvider）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">ThemeProvider</code> を使うと、
              アプリケーション全体で共有するデザイントークン（色、スペーシング、フォントなど）を定義できます。
            </p>

            <CodeBlock
              language="tsx"
              title="テーマの定義と適用"
              code={`import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useState } from 'react';

// テーマの型定義
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

// ライトテーマ
const lightTheme: Theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    textMuted: '#64748b',
    border: '#e2e8f0',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
};

// ダークテーマ
const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    primary: '#60a5fa',
    secondary: '#a78bfa',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    border: '#334155',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 30px rgba(0, 0, 0, 0.5)',
  },
};

// styled-components の DefaultTheme を拡張（型補完用）
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// テーマを使ったコンポーネント
const Card = styled.div\`
  background: \${(props) => props.theme.colors.surface};
  color: \${(props) => props.theme.colors.text};
  border: 1px solid \${(props) => props.theme.colors.border};
  border-radius: \${(props) => props.theme.borderRadius.lg};
  padding: \${(props) => props.theme.spacing.lg};
  box-shadow: \${(props) => props.theme.shadows.md};
\`;

// テーマを切り替えるアプリ
function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Card>
        <h2>テーマの切り替え</h2>
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? 'ライトモード' : 'ダークモード'}に切り替え
        </button>
      </Card>
    </ThemeProvider>
  );
}`}
            />
          </section>

          {/* セクション9: テスト時のスタイル検証 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">テスト時のスタイル検証</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              styled-components で作ったコンポーネントをテストする際、
              スタイルの適用状態を検証する方法を知っておくことは重要です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">jest-styled-components</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">jest-styled-components</code> を使うと、
              スナップショットテストにスタイルの情報を含めることができます。
            </p>

            <CodeBlock
              language="bash"
              title="インストール"
              code={`npm install -D jest-styled-components`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="スタイルのテスト例"
              code={`import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import Button from './Button';
import { lightTheme } from './theme';

// テーマ付きのレンダリングヘルパー
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Button', () => {
  it('プライマリバリアントで正しいスタイルが適用される', () => {
    const { container } = renderWithTheme(
      <Button $variant="primary">テスト</Button>
    );

    // toHaveStyleRule でスタイルを検証
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      '#3b82f6'
    );
    expect(container.firstChild).toHaveStyleRule('color', 'white');
  });

  it('disabled 時にスタイルが変わる', () => {
    const { container } = renderWithTheme(
      <Button $variant="primary" disabled>テスト</Button>
    );

    expect(container.firstChild).toHaveStyleRule('opacity', '0.5', {
      modifier: ':disabled',
    });
  });

  it('ホバー時のスタイルが正しい', () => {
    const { container } = renderWithTheme(
      <Button $variant="primary">テスト</Button>
    );

    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      '#2563eb',
      { modifier: ':hover' }
    );
  });
});`}
            />

            <InfoBox type="info" title="スタイルテストの方針">
              <p>
                すべてのスタイルを網羅的にテストする必要はありません。
                重要な動的スタイル（props によるバリアント切替、状態に応じた変化）に絞ってテストし、
                見た目の確認は Storybook やビジュアルリグレッションテストに任せるのが効率的です。
              </p>
            </InfoBox>
          </section>

          {/* セクション10: パフォーマンス Tips */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">パフォーマンス Tips</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              styled-components はランタイムでスタイルを生成するため、使い方によってはパフォーマンスに影響します。
              以下のポイントを守ることで、パフォーマンスを最大限に保てます。
            </p>

            <div className="space-y-4">
              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">1. コンポーネント関数の外でスタイルを定義する</h3>
                <p className="text-sm text-foreground/80 mb-3">
                  最も重要なルールです。レンダリングのたびにスタイルコンポーネントが再生成されることを防ぎます。
                </p>
                <CodeBlock
                  language="tsx"
                  title="正しい例 vs 間違った例"
                  code={`// NG: レンダリングのたびに新しいコンポーネントが作られる
function Card() {
  const Wrapper = styled.div\`padding: 24px;\`;
  return <Wrapper>...</Wrapper>;
}

// OK: モジュールスコープで一度だけ作られる
const Wrapper = styled.div\`padding: 24px;\`;
function Card() {
  return <Wrapper>...</Wrapper>;
}`}
                />
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">2. 動的 props の代わりに CSS 変数を使う</h3>
                <p className="text-sm text-foreground/80 mb-3">
                  動的な props は値が変わるたびに新しい CSS クラスを生成します。
                  頻繁に変わる値には CSS カスタムプロパティ（変数）を使うと効率的です。
                </p>
                <CodeBlock
                  language="tsx"
                  title="CSS 変数を使ったパフォーマンス改善"
                  code={`// NG: value が変わるたびに新しい CSS クラスが生成される
const ProgressFill = styled.div<{ $value: number }>\`
  width: \${(p) => p.$value}%;
\`;

// OK: CSS 変数経由なら同じクラスのまま値だけが変わる
const ProgressFill = styled.div\`
  width: var(--progress-value);
\`;

function ProgressBar({ value }: { value: number }) {
  return (
    <ProgressFill
      style={{ '--progress-value': \`\${value}%\` } as React.CSSProperties}
    />
  );
}`}
                />
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">3. 不要な再レンダリングを防ぐ</h3>
                <p className="text-sm text-foreground/80">
                  styled-components は React のコンポーネントなので、通常の React と同じく
                  <code className="bg-muted px-1 rounded">React.memo</code> で不要な再レンダリングを防げます。
                  特にリスト内で使われるスタイルコンポーネントでは効果的です。
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">4. 深いネストを避ける</h3>
                <p className="text-sm text-foreground/80">
                  スタイルの拡張チェーン（<code className="bg-muted px-1 rounded">styled(styled(styled(Base)))</code>）が
                  深くなると、各レンダリングで複数のコンポーネントレイヤーを通過するため遅くなります。
                  2〜3段階までに留めましょう。
                </p>
              </div>
            </div>
          </section>

          {/* セクション11: アニメーション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">アニメーション（keyframes）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">keyframes</code> ヘルパーを使うと、
              CSS アニメーションを定義できます。自動的にユニークな名前が生成されるため、衝突の心配がありません。
            </p>

            <CodePreview
              language="tsx"
              title="アニメーションの定義と使用"
              code={`function App() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <div>
        <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 8 }}>スピナー</p>
        <div className="spinner" />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 8 }}>フェードインカード</p>
        <div className="fade-card" style={{
          padding: 24, background: 'white', borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxWidth: 200,
        }}>
          カード内容
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 8 }}>スケルトン</p>
        <div className="skeleton" style={{ width: '100%', height: 20, borderRadius: 4, marginBottom: 8 }} />
        <div className="skeleton" style={{ width: '70%', height: 20, borderRadius: 4, marginBottom: 8 }} />
        <div className="skeleton" style={{ width: '50%', height: 20, borderRadius: 4 }} />
      </div>
    </div>
  );
}`}
              css={`
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.spinner {
  width: 32px; height: 32px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
.fade-card {
  animation: fadeIn 0.6s ease-out;
}
.skeleton {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
`}
              previewHeight={140}
            />
          </section>

          {/* セクション12: ベストプラクティス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ベストプラクティス</h2>

            <CodeBlock
              language="tsx"
              title="よくある間違いと正しい書き方"
              code={`// NG: コンポーネント内でスタイルを定義（レンダリングごとに再生成される）
function Card() {
  const Wrapper = styled.div\`
    padding: 24px;
  \`;
  return <Wrapper>...</Wrapper>;
}

// OK: コンポーネントの外で定義
const Wrapper = styled.div\`
  padding: 24px;
\`;
function Card() {
  return <Wrapper>...</Wrapper>;
}


// NG: transient prop なしで DOM に渡される
const Box = styled.div<{ isActive: boolean }>\`
  opacity: \${(p) => (p.isActive ? 1 : 0.5)};
\`;
// <div isActive="true"> ← DOM に不要な属性が渡る

// OK: $ 接頭辞で DOM への伝播を防ぐ
const Box = styled.div<{ $isActive: boolean }>\`
  opacity: \${(p) => (p.$isActive ? 1 : 0.5)};
\`;
// <div> ← クリーンな DOM`}
            />

            <div className="mt-6" />

            <InfoBox type="success" title="まとめ">
              <p>
                styled-components は CSS の知識をそのまま活かしながら、
                コンポーネントベースのスタイリングを実現する強力なライブラリです。
                次のステップでは、似た API を持ちつつも異なるアプローチを提供する Emotion を学びます。
              </p>
            </InfoBox>
          </section>

          {/* 理解度チェック 1 */}
          <section>
            <Quiz
              question="styled-components v6 で transient props（$接頭辞）を使う理由として正しいのはどれですか？"
              options={[
                { label: 'パフォーマンスを向上させるため' },
                { label: 'スタイリング専用の props が DOM 要素に HTML 属性として渡されるのを防ぐため', correct: true },
                { label: 'TypeScript の型チェックを有効にするため' },
                { label: 'SSR でスタイルを正しく抽出するため' },
              ]}
              explanation="$ 接頭辞（transient props）は、styled-components がその props を DOM に転送しないことを示します。$variant, $size のようなスタイリング専用の props を使うと、実際のHTMLには <div variant='primary'> のような不要な属性が付かず、React のコンソール警告も防げます。"
            />
          </section>

          {/* 理解度チェック 2 */}
          <section>
            <Quiz
              question="styled-components のパフォーマンスを改善するために最も重要なのはどれですか？"
              options={[
                { label: 'すべてのスタイルを1つのファイルにまとめる' },
                { label: 'スタイルコンポーネントの定義をコンポーネント関数の外に置く', correct: true },
                { label: 'テーマを使わずにハードコードする' },
                { label: 'CSS ネスティングを避ける' },
              ]}
              explanation="スタイルコンポーネントをコンポーネント関数の内部で定義すると、レンダリングのたびに新しいスタイルコンポーネントが生成されてしまいます。モジュールのトップレベル（関数の外）で定義することで、一度だけ生成されるようになり、パフォーマンスが大幅に改善されます。"
            />
          </section>

          {/* コーディングチャレンジ */}
          <section>
            <CodingChallenge
              title="Props で動的スタイリングする Button を作成"
              description="styled-components で $variant と $size を受け取る Button コンポーネントを作成してください。$variant は 'primary' | 'danger' の2種類、$size は 'sm' | 'lg' の2種類です。$variant に応じて背景色を変え、$size に応じてパディングとフォントサイズを変えてください。"
              initialCode={`import styled from 'styled-components';

// ここに StyledButton を定義
const StyledButton = styled.button<{
  $variant?: 'primary' | 'danger';
  $size?: 'sm' | 'lg';
}>\`
  /* ここにスタイルを書く */
\`;`}
              answer={`import styled from 'styled-components';

const StyledButton = styled.button<{
  $variant?: 'primary' | 'danger';
  $size?: 'sm' | 'lg';
}>\`
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  background-color: \${(p) => p.$variant === 'danger' ? '#ef4444' : '#3b82f6'};
  color: white;

  padding: \${(p) => p.$size === 'lg' ? '14px 28px' : '6px 12px'};
  font-size: \${(p) => p.$size === 'lg' ? '1rem' : '0.75rem'};

  &:hover {
    opacity: 0.9;
  }
\`;`}
              keywords={['$variant', '$size', 'background-color:', 'padding:']}
              hints={[
                '${(props) => ...} の中で三項演算子を使って props の値に応じた CSS 値を返します',
                'props.$variant === "danger" で variant を判定し、背景色を切り替えます',
                'props.$size === "lg" でサイズを判定し、padding と font-size を切り替えます',
              ]}
            />
          </section>

          {/* リファレンスリンク */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'styled-components 公式ドキュメント',
                  url: 'https://styled-components.com/docs',
                  description: 'API リファレンス、テーミング、SSR 対応など公式の包括的なドキュメント',
                },
                {
                  title: 'styled-components v5 → v6 マイグレーションガイド',
                  url: 'https://styled-components.com/docs/faqs#what-do-i-need-to-do-to-migrate-to-v6',
                  description: 'v5 から v6 へのアップグレード手順と破壊的変更の一覧',
                },
                {
                  title: 'styled-components GitHub リポジトリ',
                  url: 'https://github.com/styled-components/styled-components',
                  description: 'ソースコード、Issue、リリースノートを確認できる公式リポジトリ',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'styled-components と Emotion のどちらを選べばいいですか？',
                  answer: 'API はほぼ同じなので、どちらを選んでも大きな差はありません。styled API のみで統一したいなら styled-components、css prop も活用したいなら Emotion がおすすめです。MUI v5 を使う場合は Emotion が内蔵されています。コミュニティの大きさでは styled-components が勝ります。',
                },
                {
                  question: 'styled-components は React Server Components で使えますか？',
                  answer: 'いいえ、styled-components はランタイムで JavaScript を実行してスタイルを生成するため、Server Components 内では直接使えません。"use client" を付けた Client Component 内でのみ使用できます。Next.js App Router を使う場合は、CSS Modules や Tailwind CSS の方がシンプルに統合できます。',
                },
                {
                  question: 'styled-components のスタイルはどこに出力されますか？',
                  answer: 'ランタイムで <head> 内の <style> タグに CSS が注入されます。開発者ツールの Elements パネルで確認すると、<style data-styled="active"> のようなタグ内に生成された CSS が格納されています。babel-plugin-styled-components を使うと、デバッグしやすいクラス名になります。',
                },
                {
                  question: 'styled-components のパフォーマンスが心配です。測定する方法はありますか？',
                  answer: 'React DevTools の Profiler を使って、スタイルコンポーネントの再レンダリング回数と所要時間を確認できます。また、ブラウザの Performance タブで "Recalculate Style" にかかる時間を測定すると、CSS-in-JS のオーバーヘッドを可視化できます。問題があれば CSS 変数の活用やコンポーネントのメモ化を検討してください。',
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
