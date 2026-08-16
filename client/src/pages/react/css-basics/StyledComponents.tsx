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
          代表的な CSS-in-JS ライブラリのひとつ「styled-components」を実践的に学びます。
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
              code={`import styled from 'styled-components';

const Wrapper = styled.div\`
  max-width: 640px;
\`;

const Title = styled.h1\`
  font-size: 2rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 12px;
\`;

const Lead = styled.p\`
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.8;
\`;

const StartButton = styled.button\`
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: #3b82f6;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background-color: #2563eb;
  }
\`;

function App() {
  return (
    <Wrapper>
      <Title>React でスタイリングを学ぼう</Title>
      <Lead>
        styled.要素名 にテンプレートリテラルで CSS を渡すと、
        そのスタイルを持つコンポーネントが作られます。
      </Lead>
      <StartButton>はじめる</StartButton>
    </Wrapper>
  );
}`}
              previewHeight={300}
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
              code={`import styled from 'styled-components';

const Button = styled.button\`
  padding: 10px 20px;
  border: 2px solid #3b82f6;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 8px;
  transition: all 0.2s ease;

  /* $primary の値でスタイルを切り替える */
  background-color: \${(props) => (props.$primary ? '#3b82f6' : 'transparent')};
  color: \${(props) => (props.$primary ? 'white' : '#3b82f6')};

  &:hover {
    opacity: 0.85;
  }
\`;

function App() {
  return (
    <div>
      <Button $primary>プライマリ</Button>
      <Button>アウトライン</Button>
    </div>
  );
}`}
              previewHeight={100}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">複数の props を使う例</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">css</code> ヘルパーでスタイルの断片を定義し、
              props の値をキーにしたマップで切り替えると、バリアントが増えても見通しを保てます。
            </p>
            <CodePreview
              language="tsx"
              title="サイズとバリアントの組み合わせ"
              code={`import styled, { css } from 'styled-components';

const variants = {
  primary: css\`
    background-color: #3b82f6;
    color: white;
    border: none;
  \`,
  secondary: css\`
    background-color: #6b7280;
    color: white;
    border: none;
  \`,
  outline: css\`
    background-color: transparent;
    color: #3b82f6;
    border: 2px solid #3b82f6;
  \`,
  ghost: css\`
    background-color: transparent;
    color: var(--text);
    border: none;
  \`,
};

const sizes = {
  sm: css\`
    padding: 6px 12px;
    font-size: 0.75rem;
  \`,
  md: css\`
    padding: 10px 20px;
    font-size: 0.875rem;
  \`,
  lg: css\`
    padding: 14px 28px;
    font-size: 1rem;
  \`,
};

const StyledButton = styled.button\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: \${(p) => (p.$fullWidth ? '100%' : 'auto')};

  \${(p) => variants[p.$variant ?? 'primary']}
  \${(p) => sizes[p.$size ?? 'md']}
\`;

function App() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <StyledButton $variant="primary" $size="sm">小さいボタン</StyledButton>
      <StyledButton $variant="secondary" $size="md">中ボタン</StyledButton>
      <StyledButton $variant="outline" $size="lg">大きいアウトライン</StyledButton>
      <StyledButton $variant="ghost">ゴースト</StyledButton>
      <StyledButton $variant="primary" $fullWidth>全幅ボタン</StyledButton>
    </div>
  );
}`}
              previewHeight={200}
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
                <h3 className="font-semibold text-foreground mb-2">3. スタイルの注入方法は v5 から変わっていない</h3>
                <p className="text-sm text-foreground/80">
                  注入方式の既定は v5.3 と v6.0 で同一で、
                  <code className="bg-muted px-1 rounded">{`useCSSOMInjection: !DISABLE_SPEEDY`}</code> です。
                  本番ビルドでは <code className="bg-muted px-1 rounded">CSSOM（insertRule）</code>、
                  開発ビルドではテキストノードが使われます（この分岐は v5 の時点で存在します）。
                  v6 系の現行コードではテキストノード実装そのものが削除され、ブラウザビルドは常に CSSOM（insertRule）です。
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">4. .attrs() の仕様変更</h3>
                <p className="text-sm text-foreground/80">
                  オブジェクト形式（<code className="bg-muted px-1 rounded">{`.attrs({ ... })`}</code>）は v6 でも現行の API です。
                  v6 での変更点は 2 つで、attrs が値を与える props がコンポーネントの型上で optional になること、
                  <code className="bg-muted px-1 rounded">{`.attrs((props) => ...)`}</code> のコールバックが受け取る props が
                  イミュータブルなスナップショットになり、<code className="bg-muted px-1 rounded">{`props.type = 'button'`}</code> のような
                  書き換えが no-op になることです（値はコールバックの戻り値で返します）。
                  なお、オブジェクトの値に関数を書くサブ関数形式（<code className="bg-muted px-1 rounded">{`.attrs({ prop: (props) => ... })`}</code>）は
                  v4 で非推奨になり v5 で削除済みです。
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">5. Node.js 16 以上が必須</h3>
                <p className="text-sm text-foreground/80">
                  v6 は Node.js 16 以上を要求します（package.json の
                  <code className="bg-muted px-1 rounded">{`engines: { node: '>= 16' }`}</code>）。
                  React 側の peer 要件は <code className="bg-muted px-1 rounded">{`react / react-dom >= 16.8.0`}</code> で、
                  v6.0.0 から現行の 6.5.3 まで同じです。React 17 の環境でもそのまま v6 を使えます。
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

// .attrs() のコールバック引数を直接書き換えていた
const Input = styled.input.attrs((props) => {
  props.type = 'text';
  return props;
})\`
  padding: 8px;
\`;


// === v6 の書き方 ===
// $ 接頭辞で shouldForwardProp が不要に
const Box = styled.div<{ $isActive: boolean }>\`
  opacity: \${(p) => (p.$isActive ? 1 : 0.5)};
\`;

// コールバック引数はイミュータブル。値は戻り値で返す
const Input = styled.input.attrs(() => ({
  type: 'text',
  placeholder: '入力してください',
}))\`
  padding: 8px;
\`;

// オブジェクト形式も v6 の現行 API（v5 から変わらず使える）
const SearchInput = styled.input.attrs({
  type: 'search',
  placeholder: '検索',
})\`
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
              code={`import styled from 'styled-components';

const Button = styled.button\`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  background-color: var(--bg-muted);
  color: var(--text);
\`;

// styled(既存コンポーネント) でベースのスタイルを継承して上書きする
const PrimaryButton = styled(Button)\`
  background-color: #3b82f6;
  color: white;
\`;

const DangerButton = styled(PrimaryButton)\`
  background-color: #ef4444;
\`;

const RoundButton = styled(PrimaryButton)\`
  border-radius: 9999px;
  padding: 10px 24px;
\`;

function App() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button>ベース</Button>
      <PrimaryButton>プライマリ</PrimaryButton>
      <DangerButton>デンジャー</DangerButton>
      <RoundButton>ラウンド</RoundButton>
    </div>
  );
}`}
              previewHeight={150}
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
              title="app/layout.tsx での設定（概要・v6.2 以前向け）"
              code={`// v6.2 以前の App Router では styled-components は Client Component でのみ動作する
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

            <InfoBox type="info" title="v6.3.0 以降はレジストリ不要">
              <p>
                上のレジストリが必要なのは v6.2 以前です。v6.3.0 以降は RSC
                をゼロ設定でサポートし、<code className="bg-muted px-1 rounded">'use client'</code>
                もレジストリも不要になりました。ただし RSC では{' '}
                <code className="bg-muted px-1 rounded">ThemeProvider</code> が何もしないため、
                テーマは CSS 変数で用意します。既存の{' '}
                <code className="bg-muted px-1 rounded">ServerStyleSheet</code>{' '}
                を使う構成もそのまま動きます。（出典: styled-components v6.3.0
                リリースノート、2026 年 8 月時点）
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
              code={`import styled, { keyframes } from 'styled-components';

const spin = keyframes\`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
\`;

const fadeIn = keyframes\`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
\`;

const shimmer = keyframes\`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
\`;

const Spinner = styled.div\`
  width: 32px;
  height: 32px;
  border: 3px solid var(--border);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: \${spin} 0.8s linear infinite;
\`;

const FadeCard = styled.div\`
  padding: 24px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  max-width: 200px;
  animation: \${fadeIn} 0.6s ease-out;
\`;

const Skeleton = styled.div\`
  height: 20px;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--border) 25%, var(--bg-muted) 50%, var(--border) 75%);
  background-size: 200% 100%;
  animation: \${shimmer} 1.5s ease-in-out infinite;
\`;

function App() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>スピナー</p>
        <Spinner />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>フェードインカード</p>
        <FadeCard>カード内容</FadeCard>
      </div>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>スケルトン</p>
        <Skeleton style={{ marginBottom: 8 }} />
        <Skeleton style={{ width: '70%', marginBottom: 8 }} />
        <Skeleton style={{ width: '50%' }} />
      </div>
    </div>
  );
}`}
              previewHeight={280}
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
              description="styled-components の動的スタイルの ___ を埋めてください。Props に応じて背景色とパディングを三項演算子で切り替えます。"
              initialCode={`import styled from 'styled-components';

const StyledButton = styled.button<{
  $variant?: 'primary' | 'danger';
  $size?: 'sm' | 'lg';
}>\`
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  background-color: \${(p) => p.$variant === '___' ? '#ef4444' : '#3b82f6'}; // ← ここを埋める
  color: white;

  padding: \${(p) => p.___ === 'lg' ? '14px 28px' : '6px 12px'}; // ← ここを埋める
  font-size: \${(p) => p.$size === 'lg' ? '1rem' : '0.75rem'};

  &:hover {
    opacity: 0.9;
  }
\`;

function App() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <StyledButton $variant="primary" $size="sm">保存</StyledButton>
      <StyledButton $variant="danger" $size="lg">削除</StyledButton>
    </div>
  );
}`}
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
\`;

function App() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <StyledButton $variant="primary" $size="sm">保存</StyledButton>
      <StyledButton $variant="danger" $size="lg">削除</StyledButton>
    </div>
  );
}`}
              keywords={["'danger'", '$size']}
              hints={[
                '赤い背景色 #ef4444 に対応する variant 値は danger です',
                'パディングを切り替える Props 名は $size です（$ プレフィックスが必要）',
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
                  answer: 'API はほぼ同じなので、どちらを選んでも大きな差はありません。styled API のみで統一したいなら styled-components、css prop も活用したいなら Emotion がおすすめです。MUI v5 を使う場合は Emotion が内蔵されています。',
                },
                {
                  question: 'styled-components は React Server Components で使えますか？',
                  answer: 'v6.3.0 以降は使えます。RSC 環境を自動検出し、"use client" もレジストリもなしで動きます（inline の style タグを React 19 が巻き上げて重複排除する仕組み）。ただし ThemeProvider と StyleSheetManager は RSC では何もしないため、テーマは CSS 変数でビルド時に用意します。v6.2 以前は Client Component 内でのみ使用できました。（出典: styled-components v6.3.0 リリースノート、2026 年 8 月時点）',
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
