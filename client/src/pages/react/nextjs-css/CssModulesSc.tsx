import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function CssModulesSc() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 49</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          Next.js × CSS Modules / styled-components
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          CSS Modules と styled-components / Emotion を Next.js App Router で使う方法を学びます。
          それぞれの設定方法、メリット・デメリット、最適な選び方を理解しましょう。
        </p>

        <WhyNowBox tags={['CSS Modules', 'styled-components', 'Emotion', 'CSS-in-JS', 'スコープ付きCSS']}>
          <p>
            Tailwind CSS や MUI 以外にも、CSS のスタイリング手法は複数あります。
            CSS Modules は Next.js に組み込みで対応しており、設定不要で使えます。
            styled-components や Emotion は CSS-in-JS の代表的なライブラリです。
            プロジェクトの要件に応じて最適な手法を選べるようになりましょう。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: CSS Modules */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS Modules</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules は <code className="text-sm bg-muted px-1.5 py-0.5 rounded">.module.css</code> という拡張子のファイルで、
              クラス名が自動的にスコープされる（他のコンポーネントと衝突しない）CSS の仕組みです。
              Next.js では設定不要で使えます。
            </p>

            <CodeBlock
              code={`/* app/components/Button/Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
}

.primary {
  background-color: #3b82f6;
  color: white;
}

.primary:hover {
  background-color: #2563eb;
}

.secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.secondary:hover {
  background-color: #e5e7eb;
}

.large {
  padding: 1rem 2rem;
  font-size: 1rem;
}

.small {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
}`}
              language="css"
              title="Button.module.css"
            />

            <CodeBlock
              code={`// app/components/Button/Button.tsx
import styles from './Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
};

// Server Component でも Client Component でも使える！
export function Button({
  variant = 'primary',
  size,
  children,
  onClick,
}: ButtonProps) {
  // クラス名を結合
  const className = [
    styles.button,
    styles[variant],
    size ? styles[size] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

// 実際に生成される HTML:
// <button class="Button_button__x7f2k Button_primary__a3b1c">
//   送信する
// </button>
// → クラス名がハッシュ付きになり、衝突しない`}
              language="tsx"
              title="CSS Modules を使ったコンポーネント"
            />

            <InfoBox type="success" title="CSS Modules のメリット">
              <p>
                <strong>設定不要</strong>: Next.js に組み込み対応。インストール不要。<br />
                <strong>スコープ付き</strong>: クラス名が自動でユニークになり、スタイルの衝突を防止。<br />
                <strong>Server Component 対応</strong>: ランタイム JavaScript 不要でパフォーマンスが良い。<br />
                <strong>型安全</strong>: TypeScript の typed-css-modules を使えば補完も効く。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: CSS Modules の実践パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS Modules の実践パターン</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              実際のプロジェクトで使える、CSS Modules の便利なパターンを紹介します。
            </p>

            <CodeBlock
              code={`/* app/components/Card/Card.module.css */
.card {
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.content {
  padding: 1.5rem;
}

.title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #111827;
}

.description {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
  /* 3行で省略 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* メディアクエリも普通に使える */
@media (max-width: 768px) {
  .content {
    padding: 1rem;
  }
}

/* CSS 変数で柔軟にカスタマイズ */
.card {
  --card-bg: white;
  --card-radius: 12px;
  background: var(--card-bg);
  border-radius: var(--card-radius);
}

/* composes で他のクラスを組み合わせる */
.featuredCard {
  composes: card;
  border-color: #3b82f6;
  border-width: 2px;
}`}
              language="css"
              title="実践的な CSS Modules"
            />

            <CodeBlock
              code={`// app/components/Card/Card.tsx
import Image from 'next/image';
import styles from './Card.module.css';

type CardProps = {
  title: string;
  description: string;
  image: string;
  featured?: boolean;
};

export function Card({ title, description, image, featured }: CardProps) {
  return (
    <article className={featured ? styles.featuredCard : styles.card}>
      <Image
        src={image}
        alt={title}
        width={400}
        height={225}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}`}
              language="tsx"
              title="Card コンポーネント"
            />

            <CodeBlock
              code={`// グローバル CSS と CSS Modules の使い分け

// app/globals.css - グローバルスタイル（リセット、変数、共通スタイル）
// → app/layout.tsx で import

// app/components/Header/Header.module.css - コンポーネント固有のスタイル
// → 各コンポーネントで import

// ファイル構成の例
// app/
// ├── globals.css
// ├── layout.tsx
// └── components/
//     ├── Header/
//     │   ├── Header.tsx
//     │   └── Header.module.css
//     ├── Card/
//     │   ├── Card.tsx
//     │   └── Card.module.css
//     └── Button/
//         ├── Button.tsx
//         └── Button.module.css`}
              language="tsx"
              title="ファイル構成のベストプラクティス"
            />
          </section>

          {/* セクション 3: styled-components */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">styled-components</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              styled-components は CSS-in-JS ライブラリの代表格です。
              JavaScript 内で CSS を記述し、スタイル付きのコンポーネントを作成します。
              Next.js App Router で使うには SSR の設定が必要です。
            </p>

            <CodeBlock
              code={`# インストール
npm install styled-components
npm install -D @types/styled-components`}
              language="bash"
              title="styled-components のインストール"
            />

            <CodeBlock
              code={`// next.config.ts - styled-components のコンパイラ設定
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true, // SWC で styled-components を最適化
  },
};

export default nextConfig;`}
              language="tsx"
              title="next.config.ts の設定"
            />

            <CodeBlock
              code={`// lib/StyledComponentsRegistry.tsx
'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // SSR でスタイルを収集してHTMLに挿入するための仕組み
  const [styledComponentsStyleSheet] = useState(
    () => new ServerStyleSheet()
  );

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
}

// app/layout.tsx で使う
// import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry';
//
// export default function RootLayout({ children }) {
//   return (
//     <html lang="ja">
//       <body>
//         <StyledComponentsRegistry>
//           {children}
//         </StyledComponentsRegistry>
//       </body>
//     </html>
//   );
// }`}
              language="tsx"
              title="SSR 対応レジストリ"
              showLineNumbers
            />

            <CodeBlock
              code={`// styled-components の使用例
'use client';

import styled from 'styled-components';

// スタイル付きコンポーネントを定義
const Wrapper = styled.div\`
  max-width: 48rem;
  margin: 0 auto;
  padding: 2rem;
\`;

const Title = styled.h1\`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
\`;

// Props でスタイルを制御
const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' }>\`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  background-color: \${(props) =>
    props.$variant === 'secondary' ? '#f3f4f6' : '#3b82f6'};
  color: \${(props) =>
    props.$variant === 'secondary' ? '#374151' : 'white'};

  &:hover {
    background-color: \${(props) =>
      props.$variant === 'secondary' ? '#e5e7eb' : '#2563eb'};
  }
\`;

// コンポーネントとして使う
export function StyledPage() {
  return (
    <Wrapper>
      <Title>styled-components の例</Title>
      <StyledButton>プライマリ</StyledButton>
      <StyledButton $variant="secondary">セカンダリ</StyledButton>
    </Wrapper>
  );
}`}
              language="tsx"
              title="styled-components の使用例"
            />

            <InfoBox type="warning" title="styled-components は Client Component のみ">
              <p>
                styled-components は JavaScript のランタイムで CSS を生成するため、
                Server Component では使用できません。
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use client'</code> が必須です。
                パフォーマンスの観点から、App Router では CSS Modules や Tailwind CSS が推奨されています。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: Emotion */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Emotion</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Emotion は styled-components と似た CSS-in-JS ライブラリで、MUI の内部でも使われています。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">css</code> prop と
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">styled</code> API の両方を提供します。
            </p>

            <CodeBlock
              code={`# Emotion のインストール
npm install @emotion/react @emotion/styled @emotion/cache

# MUI と一緒に使う場合（MUI は Emotion を内部で使用）
npm install @mui/material @emotion/react @emotion/styled`}
              language="bash"
              title="Emotion のインストール"
            />

            <CodeBlock
              code={`// Emotion の styled API（styled-components とほぼ同じ）
'use client';

import styled from '@emotion/styled';

const Card = styled.div\`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
\`;

const Badge = styled.span<{ color?: string }>\`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: \${(props) => props.color || '#eff6ff'};
  color: \${(props) => (props.color ? 'white' : '#3b82f6')};
\`;

export function EmotionExample() {
  return (
    <Card>
      <Badge>新着</Badge>
      <h3>Emotion で作ったカード</h3>
      <p>styled-components と似た書き方ができます。</p>
    </Card>
  );
}`}
              language="tsx"
              title="Emotion の使用例"
            />
          </section>

          {/* セクション 5: スタイリング手法の比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">スタイリング手法の比較まとめ</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-bold text-foreground">手法</th>
                    <th className="text-left p-3 font-bold text-foreground">Server Component</th>
                    <th className="text-left p-3 font-bold text-foreground">設定</th>
                    <th className="text-left p-3 font-bold text-foreground">バンドルサイズ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">Tailwind CSS</td>
                    <td className="p-3 text-green-600 font-medium">対応</td>
                    <td className="p-3 text-foreground/80">自動（create-next-app）</td>
                    <td className="p-3 text-foreground/80">小さい</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">CSS Modules</td>
                    <td className="p-3 text-green-600 font-medium">対応</td>
                    <td className="p-3 text-foreground/80">不要（組み込み）</td>
                    <td className="p-3 text-foreground/80">小さい</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">styled-components</td>
                    <td className="p-3 text-red-600 font-medium">非対応</td>
                    <td className="p-3 text-foreground/80">Registry 必要</td>
                    <td className="p-3 text-foreground/80">やや大きい</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">Emotion</td>
                    <td className="p-3 text-red-600 font-medium">非対応</td>
                    <td className="p-3 text-foreground/80">Registry 必要</td>
                    <td className="p-3 text-foreground/80">やや大きい</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">MUI</td>
                    <td className="p-3 text-red-600 font-medium">非対応</td>
                    <td className="p-3 text-foreground/80">CacheProvider 必要</td>
                    <td className="p-3 text-foreground/80">大きい</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">shadcn/ui</td>
                    <td className="p-3 text-green-600 font-medium">対応</td>
                    <td className="p-3 text-foreground/80">CLI で追加</td>
                    <td className="p-3 text-foreground/80">小さい</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="デザイナーへのおすすめ">
              <p>
                <strong>最初に学ぶなら</strong>: Tailwind CSS。最も使われており、App Router との相性も最高です。<br />
                <strong>コンポーネント集も欲しいなら</strong>: shadcn/ui（Tailwind ベース）。<br />
                <strong>既存プロジェクトで使う場合</strong>: プロジェクトの既存の手法に合わせましょう。<br />
                CSS Modules は「CSS を普通に書きたい」場合の良い選択肢です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 6: 選び方のフローチャート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">どれを選ぶ？判断フロー</h2>

            <div className="space-y-3">
              <div className="rounded-lg border border-border p-4">
                <p className="text-foreground/80 text-sm">
                  <strong className="text-foreground">Q: Server Component を多用する？</strong><br />
                  → Yes: Tailwind CSS / CSS Modules / shadcn/ui<br />
                  → No（ほぼ Client Component）: どの手法でもOK
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-foreground/80 text-sm">
                  <strong className="text-foreground">Q: 既製のコンポーネント集が欲しい？</strong><br />
                  → Yes（Material Design）: MUI<br />
                  → Yes（カスタマイズ重視）: shadcn/ui<br />
                  → No（自分で作る）: Tailwind CSS / CSS Modules
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-foreground/80 text-sm">
                  <strong className="text-foreground">Q: CSS を直接書きたい？</strong><br />
                  → Yes（スコープ付き）: CSS Modules<br />
                  → Yes（JS 内で書きたい）: styled-components / Emotion<br />
                  → No（ユーティリティクラス派）: Tailwind CSS
                </p>
              </div>
            </div>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'CSS Modules - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/styling/css-modules',
                  description: 'Next.js での CSS Modules の使い方',
                },
                {
                  title: 'CSS-in-JS - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/styling/css-in-js',
                  description: 'styled-components 等の設定方法',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
