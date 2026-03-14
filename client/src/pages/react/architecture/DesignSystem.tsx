import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 59</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          デザインシステムの設計と構築
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          デザインシステムは「コンポーネントライブラリ」ではありません。
          デザインの意思決定を体系化し、チーム全体で一貫した UI を作り続けるための「仕組み」です。
          その設計思想から実装まで、段階を追って学びます。
        </p>

        <WhyNowBox tags={['デザインシステム', 'デザイントークン', 'コンポーネントAPI', 'Storybook', 'Figma連携']}>
          <p>
            Step 53 でアーキテクチャの全体像を学びました。
            このステップでは、デザインとコードの接点である「デザインシステム」に焦点を当てます。
            Figma でデザインを作り、React でコンポーネントを実装し、Storybook でドキュメント化する。
            この一連の流れを設計する力が、デザイナーとエンジニアの両方に求められています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: デザインシステムとは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デザインシステムとは</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              「デザインシステム」という言葉は曖昧に使われがちですが、正確には以下の3つの要素で構成されます。
            </p>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">1</span>
                  <h3 className="font-bold text-foreground">デザイン原則（Design Principles）</h3>
                </div>
                <p className="text-sm text-foreground/80">
                  「なぜこのデザインにするのか」という判断基準。例: 「シンプルさを最優先する」
                  「アクセシビリティは妥協しない」「一貫性は新規性に勝る」。
                  これがデザインシステムの「憲法」になります。
                </p>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs">2</span>
                  <h3 className="font-bold text-foreground">デザイントークン + コンポーネント</h3>
                </div>
                <p className="text-sm text-foreground/80">
                  色、間隔、フォント、影などのデザイントークンと、それらを使って構築された
                  UI コンポーネント群。Figma のライブラリとコードのコンポーネントが対応する。
                </p>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">3</span>
                  <h3 className="font-bold text-foreground">ドキュメントとガバナンス</h3>
                </div>
                <p className="text-sm text-foreground/80">
                  使い方のガイドライン、Do / Don't の例示、バージョン管理のルール。
                  Storybook がこの役割を担うことが多い。「生きたドキュメント」として常に最新の状態を保つ。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="生徒の疑問: 「MUI を使えばデザインシステムは不要では？」">
              <p>
                MUI は「Material Design というデザインシステムの実装」です。
                Google のデザイン原則に基づいたトークンとコンポーネントが提供されます。
                MUI をそのまま使うなら、独自のデザインシステムを構築する必要性は低いです。
                ただし、自社ブランドに合わせたカスタマイズが増えてくると、
                「自社のデザイン原則」を明文化する=独自デザインシステムの構築が必要になってきます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: デザインシステムの階層構造 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デザインシステムの階層構造</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              デザインシステムは、基盤から応用へと階層的に構築されます。
              下層が安定していないと上層が崩れる、建築の基礎工事のようなものです。
            </p>

            <CodeBlock
              language="text"
              title="デザインシステムの階層"
              code={`┌──────────────────────────────────────┐
│  Templates                           │  ← ページレイアウト
│  (DashboardLayout, AuthLayout)       │
├──────────────────────────────────────┤
│  Patterns                            │  ← 複合パターン
│  (Card, Dialog, Form, DataTable)     │
├──────────────────────────────────────┤
│  Primitives                          │  ← 基本コンポーネント
│  (Button, Input, Badge, Avatar)      │
├──────────────────────────────────────┤
│  Foundation                          │  ← 基盤スタイル
│  (リセットCSS, グローバルスタイル)      │
├──────────────────────────────────────┤
│  Design Tokens                       │  ← 最下層・すべての基礎
│  (色, 間隔, フォント, 影, 角丸)        │
└──────────────────────────────────────┘`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Design Tokens（デザイントークン）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザイントークンとは、デザイン上の「決定事項」を名前付きの値として定義したものです。
              「この青は #3B82F6」「本文のフォントサイズは 16px」「カードの角丸は 8px」のように、
              デザインの意思決定を変数として管理します。
            </p>

            <p className="text-foreground/80 mb-4 leading-relaxed">
              トークンはさらに「グローバルトークン」「セマンティックトークン」「コンポーネントトークン」の
              3層に分けるのが一般的です。
            </p>

            <CodeBlock
              language="css"
              title="3層のトークン構造（CSS Custom Properties）"
              code={`/* --- グローバルトークン: 生の値 --- */
:root {
  /* 色パレット */
  --color-blue-50: #eff6ff;
  --color-blue-100: #dbeafe;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-700: #1d4ed8;

  /* 間隔 */
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */

  /* フォントサイズ */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;

  /* 角丸 */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;
}

/* --- セマンティックトークン: 用途別の意味 --- */
:root {
  --color-primary: var(--color-blue-600);
  --color-primary-hover: var(--color-blue-700);
  --color-background: #ffffff;
  --color-foreground: #0f172a;
  --color-muted: #64748b;
  --color-border: #e2e8f0;
  --color-error: #ef4444;
  --color-success: #22c55e;
}

/* ダークモード */
[data-theme="dark"] {
  --color-background: #0f172a;
  --color-foreground: #f8fafc;
  --color-muted: #94a3b8;
  --color-border: #334155;
}

/* --- コンポーネントトークン: 特定コンポーネントの値 --- */
:root {
  --button-height-sm: 2rem;
  --button-height-md: 2.5rem;
  --button-height-lg: 3rem;
  --button-padding-x: var(--spacing-4);
  --button-radius: var(--radius-md);
  --input-height: 2.5rem;
  --input-border-color: var(--color-border);
  --card-padding: var(--spacing-6);
  --card-radius: var(--radius-lg);
}`}
            />

            <InfoBox type="info" title="なぜ3層に分けるのか？">
              <p>
                グローバルトークン（blue-600）を直接コンポーネントに使うと、
                「ブランドカラーを青から緑に変えたい」となったとき、全てのコンポーネントを修正する必要があります。
                セマンティックトークン（primary）を介しておけば、<code>--color-primary</code> の値を変えるだけで
                アプリ全体のブランドカラーが切り替わります。ダークモード対応も同じ仕組みで実現できます。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Foundation（基盤）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              リセット CSS でブラウザのデフォルトスタイルを統一し、
              グローバルスタイルで基本的な見た目（フォント、背景色、テキスト色）を設定します。
            </p>

            <CodeBlock
              language="css"
              title="Foundation の例"
              code={`/* リセット CSS（最低限） */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* グローバルスタイル */
html {
  font-family: 'Inter', 'Noto Sans JP', sans-serif;
  font-size: var(--font-size-base);
  line-height: 1.6;
  color: var(--color-foreground);
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
}

/* フォーカスリングのデフォルト（アクセシビリティ） */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* スクロールバーのスタイル（任意） */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--color-background);
}
::-webkit-scrollbar-thumb {
  background: var(--color-muted);
  border-radius: var(--radius-full);
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Primitives（基本コンポーネント）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザインシステムの「部品箱」です。Button、Input、Badge、Avatar など、
              最も基本的で再利用性の高いコンポーネント群。これらの品質がシステム全体の品質を左右します。
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Patterns（複合パターン）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Primitives を組み合わせた、より大きな UI パターンです。
              Card、Dialog、Form、DataTable など。ビジネスロジックは持たず、
              UI の構造とインタラクションのみを担当します。
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Templates（テンプレート）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ページの骨格となるレイアウトパターンです。ヘッダー、サイドバー、メインコンテンツ、フッターの
              配置を定義します。実際のデータは持たず、「どこに何を配置するか」の構造のみを提供します。
            </p>
          </section>

          {/* セクション 3: デザイントークンの実装 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デザイントークンの実装</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              デザイントークンの実装方法は主に3つあります。プロジェクトの規模と要件に応じて選びましょう。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">アプローチ1: CSS Custom Properties</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              最もシンプルで、フレームワーク非依存のアプローチです。
              CSS ファイルに変数を定義し、あらゆるスタイリング手法から参照できます。
              前のセクションで示した例がこれにあたります。Tailwind CSS のテーマ設定とも相性が良いです。
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">アプローチ2: JS オブジェクト</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              TypeScript でトークンを定義し、型安全にスタイルを管理するアプローチです。
              CSS-in-JS ライブラリや Tailwind の設定で利用します。
            </p>

            <CodeBlock
              language="tsx"
              title="JS オブジェクトでトークン管理"
              code={`// tokens/colors.ts
export const colors = {
  // グローバルトークン
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    500: '#64748b',
    900: '#0f172a',
  },
} as const;

// tokens/semantic.ts
export const semantic = {
  light: {
    primary: colors.blue[600],
    primaryHover: colors.blue[700],
    background: '#ffffff',
    foreground: colors.gray[900],
    muted: colors.gray[500],
    border: '#e2e8f0',
  },
  dark: {
    primary: colors.blue[500],
    primaryHover: colors.blue[600],
    background: colors.gray[900],
    foreground: colors.gray[50],
    muted: '#94a3b8',
    border: '#334155',
  },
} as const;

// tokens/spacing.ts
export const spacing = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  6: '1.5rem',
  8: '2rem',
  12: '3rem',
  16: '4rem',
} as const;

// tokens/index.ts - すべてをまとめてエクスポート
export { colors } from './colors';
export { semantic } from './semantic';
export { spacing } from './spacing';`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">アプローチ3: tokens.json + Style Dictionary</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Figma のデザイントークンを JSON で出力し、Style Dictionary で CSS / JS / iOS / Android 向けの
              コードに自動変換するワークフローです。大規模なチームやマルチプラットフォーム展開で威力を発揮します。
            </p>

            <CodeBlock
              language="json"
              title="tokens.json（Figma から出力）"
              code={`{
  "color": {
    "primary": {
      "value": "#2563eb",
      "type": "color",
      "description": "ブランドのメインカラー"
    },
    "primary-hover": {
      "value": "#1d4ed8",
      "type": "color"
    },
    "background": {
      "value": "#ffffff",
      "type": "color"
    }
  },
  "spacing": {
    "sm": { "value": "8px", "type": "spacing" },
    "md": { "value": "16px", "type": "spacing" },
    "lg": { "value": "24px", "type": "spacing" }
  },
  "borderRadius": {
    "sm": { "value": "4px", "type": "borderRadius" },
    "md": { "value": "8px", "type": "borderRadius" }
  }
}`}
            />

            <CodeBlock
              language="javascript"
              title="Style Dictionary 設定"
              code={`// style-dictionary.config.js
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
      }],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [{
        destination: 'tokens.ts',
        format: 'javascript/es6',
      }],
    },
  },
};

// 実行: npx style-dictionary build
// → build/css/variables.css と build/js/tokens.ts が自動生成`}
            />

            <InfoBox type="info" title="Figma Variables との連携">
              <p>
                Figma の Variables 機能を使えば、Figma 上でデザイントークンを定義し、
                プラグイン（Token Studio for Figma など）で JSON に出力できます。
                この JSON を Style Dictionary で変換すれば、デザイナーが Figma で変更した値が
                自動的にコードに反映されるワークフローが実現します。
                小規模チームではここまで自動化する必要はありませんが、仕組みを知っておくと
                将来の拡張がスムーズです。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: コンポーネント API 設計の原則 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">コンポーネント API 設計の原則</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              デザインシステムのコンポーネントは、多くの開発者が使う「製品」です。
              API（Props の設計）が使いにくいと、誰も使ってくれません。
              良い API は「直感的で」「一貫性があり」「柔軟」です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">Props の命名規則</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザインシステム全体で統一された命名規則を使うことで、
              新しいコンポーネントでも「使い方が推測できる」ようになります。
            </p>

            <CodeBlock
              language="tsx"
              title="統一された Props 命名規則"
              code={`// variant: 見た目のバリエーション
<Button variant="primary" />    // primary | secondary | outline | ghost | destructive
<Badge variant="success" />     // success | warning | error | info

// size: サイズ（一貫した名前を使う）
<Button size="sm" />            // sm | md | lg
<Input size="sm" />             // 同じ名前体系
<Avatar size="sm" />            // 同じ名前体系

// disabled: 無効状態（HTML 標準に合わせる）
<Button disabled />
<Input disabled />

// asChild: Radix UI スタイルの合成パターン
<Button asChild>
  <a href="/about">About</a>   {/* Button のスタイルで a タグをレンダリング */}
</Button>

// className: 追加のスタイルを許可（柔軟性のため）
<Button className="mt-4" />     // 外部からの追加スタイルを受け入れる`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Composition vs Configuration パターン</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              コンポーネントの API 設計には大きく2つのアプローチがあります。
              「設定（Configuration）」で動作を変えるか、「合成（Composition）」で組み立てるかです。
            </p>

            <CodeBlock
              language="tsx"
              title="Configuration パターン"
              code={`// Configuration: Props で全てを設定する
// メリット: 使う側はシンプル
// デメリット: Props が増えると複雑に、柔軟性が低い
<Card
  title="商品名"
  description="商品の説明文"
  image="/product.jpg"
  price={1980}
  badge="NEW"
  footer={<Button>カートに入れる</Button>}
/>

// 問題: 新しいレイアウトが必要になるたびに Props が増える
<Card
  title="..."
  titleAlign="center"          // ← 追加
  imagePosition="right"        // ← 追加
  badgePosition="top-right"    // ← 追加
  showDivider                  // ← 追加
  // ... どんどん増える
/>`}
            />

            <CodeBlock
              language="tsx"
              title="Composition パターン"
              code={`// Composition: 子コンポーネントを組み合わせる
// メリット: 柔軟、レイアウトの自由度が高い
// デメリット: 使う側のコード量が増える
<Card>
  <Card.Image src="/product.jpg" alt="商品画像" />
  <Card.Header>
    <Card.Badge>NEW</Card.Badge>
    <Card.Title>商品名</Card.Title>
  </Card.Header>
  <Card.Body>
    <Card.Description>商品の説明文</Card.Description>
    <Card.Price>1,980円</Card.Price>
  </Card.Body>
  <Card.Footer>
    <Button>カートに入れる</Button>
  </Card.Footer>
</Card>

// レイアウトを変えたい？ → 子の順番を入れ替えるだけ
<Card>
  <Card.Header>
    <Card.Title>商品名</Card.Title>
  </Card.Header>
  <Card.Image src="/product.jpg" alt="商品画像" />
  <Card.Body>...</Card.Body>
</Card>`}
            />

            <InfoBox type="success" title="実践的なアドバイス">
              <p>
                基本的には <strong>Composition パターンを推奨</strong> します。
                最初は冗長に感じますが、プロジェクトが成長するとカスタマイズ性が活きてきます。
                ただし、バリエーションが少なく用途が明確なコンポーネント（Badge、Avatar など）は
                Configuration パターンの方がシンプルで使いやすいです。
                「このコンポーネントのレイアウトを変えたいケースがあるか？」を基準に判断しましょう。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Polymorphic コンポーネント（as prop）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              「同じ見た目だけど、レンダリングする HTML 要素を変えたい」場面があります。
              例えば Button のスタイルで {'<a>'} タグをレンダリングしたい場合などです。
            </p>

            <CodeBlock
              language="tsx"
              title="Polymorphic コンポーネントの実装"
              code={`import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

// ジェネリック型で「どの要素として使うか」を型安全に
type ButtonProps<T extends ElementType = 'button'> = {
  as?: T;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'variant' | 'size'>;

function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps<T>) {
  const Component = as || 'button';
  return (
    <Component
      className={\`btn btn-\${variant} btn-\${size}\`}
      {...props}
    >
      {children}
    </Component>
  );
}

// 使用例
<Button>通常のボタン</Button>                    {/* <button> */}
<Button as="a" href="/about">リンクボタン</Button>  {/* <a> */}
<Button as={Link} to="/about">RouterLink</Button>  {/* <Link> */}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">forwardRef の使い方</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザインシステムのコンポーネントは、外部から ref を受け取れるようにするのがベストプラクティスです。
              ツールチップの位置計算やフォーカス管理など、ref が必要なケースは多いためです。
            </p>

            <CodeBlock
              language="tsx"
              title="forwardRef の実装"
              code={`import { forwardRef, ComponentPropsWithRef } from 'react';

interface InputProps extends ComponentPropsWithRef<'input'> {
  label: string;
  error?: string;
}

// forwardRef で ref を受け取れるようにする
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div>
        <label className="text-sm font-medium">{label}</label>
        <input
          ref={ref}             {/* 外部から ref を渡せる */}
          className={\`input \${error ? 'input-error' : ''} \${className ?? ''}\`}
          aria-invalid={!!error}
          aria-describedby={error ? \`\${props.id}-error\` : undefined}
          {...props}
        />
        {error && (
          <p id={\`\${props.id}-error\`} className="text-sm text-error mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; // DevTools でのデバッグ用

// 使用例: ref でフォーカスを制御
function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => { emailRef.current?.focus(); }, []);

  return <Input ref={emailRef} label="メールアドレス" />;
}`}
            />

            <InfoBox type="info" title="React 19 と ref">
              <p>
                React 19 では、関数コンポーネントが直接 ref を props として受け取れるようになりました。
                forwardRef を使わずに <code>{'({ ref, ...props })'}</code> と書けます。
                ただし、React 18 以前との互換性が必要な場合は forwardRef を使い続けてください。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: 独自デザインシステム構築のスターターキット */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">独自デザインシステム構築のスターターキット</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              「デザインシステムを作りたいけど、何から始めればいいか分からない」という方のために、
              最小限のスターターキットを紹介します。完璧を目指さず、小さく始めることが大切です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">推奨フォルダ構成</h3>

            <CodeBlock
              language="text"
              title="デザインシステムのフォルダ構成"
              code={`packages/ui/          # モノレポの場合。単体なら src/design-system/
├── tokens/
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── index.ts
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx    # Storybook
│   │   ├── Button.test.tsx       # テスト
│   │   ├── Button.module.css     # スタイル（CSS Modules の場合）
│   │   └── index.ts              # エクスポート
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.stories.tsx
│   │   ├── Input.test.tsx
│   │   └── index.ts
│   ├── Typography/
│   ├── Stack/
│   └── Card/
├── utils/
│   └── cn.ts                     # クラス名結合ユーティリティ
├── index.ts                      # 公開 API
└── package.json`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">最低限必要なコンポーネント</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              最初に作るべき5つのコンポーネントと、その理由を示します。
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex gap-3 items-start rounded-lg border border-border p-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">1</span>
                <div>
                  <p className="font-semibold text-foreground">Button</p>
                  <p className="text-sm text-foreground/80">アプリで最も頻繁に使われる UI。variant / size / disabled / loading の4つの Props で大半のケースをカバーできます。</p>
                </div>
              </div>
              <div className="flex gap-3 items-start rounded-lg border border-border p-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs">2</span>
                <div>
                  <p className="font-semibold text-foreground">Input</p>
                  <p className="text-sm text-foreground/80">フォームの基盤。label / error / disabled を内蔵し、アクセシビリティ（aria属性）を正しく設定します。</p>
                </div>
              </div>
              <div className="flex gap-3 items-start rounded-lg border border-border p-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">3</span>
                <div>
                  <p className="font-semibold text-foreground">Typography</p>
                  <p className="text-sm text-foreground/80">テキスト表示の統一。h1〜h6、本文、キャプションなど、フォントサイズ・ウェイト・行間をトークンから一括管理します。</p>
                </div>
              </div>
              <div className="flex gap-3 items-start rounded-lg border border-border p-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">4</span>
                <div>
                  <p className="font-semibold text-foreground">Stack</p>
                  <p className="text-sm text-foreground/80">レイアウトの基本。子要素を縦（VStack）または横（HStack）に並べ、gap でスペーシングを管理します。</p>
                </div>
              </div>
              <div className="flex gap-3 items-start rounded-lg border border-border p-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">5</span>
                <div>
                  <p className="font-semibold text-foreground">Card</p>
                  <p className="text-sm text-foreground/80">コンテンツのグルーピング。Composition パターンで Card.Header / Card.Body / Card.Footer を提供します。</p>
                </div>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="Button コンポーネントの実装例"
              code={`// components/Button/Button.tsx
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

// バリアントのスタイルマッピング
const variantStyles = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  outline: 'border border-border bg-transparent hover:bg-gray-50',
  ghost: 'bg-transparent hover:bg-gray-100',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
} as const;

const sizeStyles = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
} as const;

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  loading?: boolean;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium',
          'transition-colors focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-primary focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button, type ButtonProps };`}
            />

            <CodeBlock
              language="tsx"
              title="cn ユーティリティ（clsx + tailwind-merge）"
              code={`// utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// クラス名の結合 + Tailwind の重複解決
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 使用例
cn('px-4 py-2', condition && 'bg-blue-500', 'px-8')
// → 'py-2 bg-blue-500 px-8'  ← px-4 が px-8 に上書きされる`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Storybook での文書化</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザインシステムのコンポーネントは、Storybook で文書化するのが標準的な手法です。
              Step 47-52 で学んだ Storybook の知識をここで活かします。
            </p>

            <CodeBlock
              language="tsx"
              title="Button.stories.tsx"
              code={`import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],      // 自動ドキュメント生成
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
      description: 'ボタンの見た目バリエーション',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'ボタンのサイズ',
    },
    loading: {
      control: 'boolean',
      description: '読み込み中の状態',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: 'ボタン', variant: 'primary' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { children: '保存中...', loading: true },
};`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">テスト戦略</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザインシステムのコンポーネントは「多くの開発者が依存するコード」なので、
              テストの重要度が高いです。以下の3種類のテストを書きましょう。
            </p>

            <CodeBlock
              language="tsx"
              title="Button.test.tsx"
              code={`import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  // 1. レンダリングテスト
  it('テキストが表示される', () => {
    render(<Button>クリック</Button>);
    expect(screen.getByRole('button', { name: 'クリック' })).toBeInTheDocument();
  });

  // 2. インタラクションテスト
  it('クリックでハンドラが呼ばれる', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>クリック</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('disabled 時はクリックできない', async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>クリック</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('loading 時はクリックできない', async () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>保存中</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  // 3. アクセシビリティテスト
  it('フォーカスリングが表示される', () => {
    render(<Button>クリック</Button>);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });
});`}
            />
          </section>

          {/* セクション 6: デザイナーへの心構え */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デザイナーへの心構え</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              デザインシステムの構築と運用は、デザイナーとエンジニアの共同作業です。
              ここでは、デザイナーがコードの世界と向き合うための心構えを共有します。
            </p>

            <div className="space-y-6">
              <div className="rounded-lg border-2 border-violet-200 dark:border-violet-800 p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">「完璧を目指さない」最小限から始める</h3>
                <p className="text-foreground/80 mb-3 leading-relaxed">
                  最初から完璧なデザインシステムを目指すと、リリース前に燃え尽きます。
                  まずは最も使用頻度の高い 5 つのコンポーネントから始め、
                  実際のプロジェクトで使いながら育てていくのが現実的です。
                </p>
                <div className="rounded-lg bg-violet-50 dark:bg-violet-950/30 p-4">
                  <p className="text-sm font-semibold text-violet-700 dark:text-violet-300 mb-2">MVP のステップ</p>
                  <ol className="list-decimal list-inside text-sm text-foreground/80 space-y-1">
                    <li>デザイントークンを定義（色、間隔、フォント）</li>
                    <li>Button と Input を作る</li>
                    <li>Storybook に並べる</li>
                    <li>実際のプロジェクトで使ってみる</li>
                    <li>フィードバックを元に改善 → 次のコンポーネントへ</li>
                  </ol>
                </div>
              </div>

              <div className="rounded-lg border-2 border-violet-200 dark:border-violet-800 p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Figma とコードの 1:1 対応の難しさ</h3>
                <p className="text-foreground/80 mb-3 leading-relaxed">
                  Figma のコンポーネントとコードのコンポーネントを完全に 1:1 対応させるのは理想ですが、
                  現実には難しいケースがあります。以下のギャップを理解しておきましょう。
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 pr-4 font-semibold text-foreground">Figma</th>
                        <th className="text-left py-2 font-semibold text-foreground">コード</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground/80">
                      <tr className="border-b border-border/50">
                        <td className="py-2 pr-4">静的なビジュアル</td>
                        <td className="py-2">動的なインタラクション（hover, focus, animation）</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2 pr-4">固定サイズ or Auto Layout</td>
                        <td className="py-2">レスポンシブ（画面幅に応じて変化）</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2 pr-4">バリアント（手動で列挙）</td>
                        <td className="py-2">Props（プログラマティックに制御）</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2 pr-4">テキストは見た目のみ</td>
                        <td className="py-2">アクセシビリティ（スクリーンリーダー対応）</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">データは仮のもの</td>
                        <td className="py-2">実データ（長い文字列、空、エラー状態）</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-foreground/80 mt-3">
                  これらのギャップを埋めるために、デザイナーとエンジニアが定期的に同期し、
                  「Figma では表現しきれない仕様」をドキュメント化する習慣が大切です。
                </p>
              </div>

              <div className="rounded-lg border-2 border-violet-200 dark:border-violet-800 p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">デザイナーが学ぶべき最低限のコード知識</h3>
                <p className="text-foreground/80 mb-3 leading-relaxed">
                  デザイナーがコードを書く必要はありませんが、以下の知識があるとコミュニケーションが格段に良くなります。
                </p>
                <div className="space-y-2 text-sm text-foreground/80">
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 text-green-600 font-bold">1.</span>
                    <p><strong>コンポーネントの概念</strong> ― 再利用可能な UI パーツ。Figma のコンポーネントと同じ考え方</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 text-green-600 font-bold">2.</span>
                    <p><strong>Props</strong> ― コンポーネントの設定値。Figma の Properties に対応</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 text-green-600 font-bold">3.</span>
                    <p><strong>CSS の Flexbox / Grid</strong> ― Figma の Auto Layout に対応する概念</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 text-green-600 font-bold">4.</span>
                    <p><strong>レスポンシブの仕組み</strong> ― ブレイクポイントとメディアクエリの基本</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 text-green-600 font-bold">5.</span>
                    <p><strong>Git の基本</strong> ― ブランチ、コミット、PR の概念（操作は不要、概念だけ）</p>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="success" title="デザインシステムは「プロダクト」">
              <p>
                デザインシステムそのものを一つの「プロダクト」として扱いましょう。
                ユーザー（=社内の開発者・デザイナー）がいて、要望があり、バグ報告があります。
                「リリースしたら終わり」ではなく、継続的にメンテナンスし、改善していく必要があります。
                次の Step 55 では、この長期運用の具体的な方法を学びます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 7: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="rounded-lg border border-border p-6 bg-muted/30">
              <div className="space-y-3 text-foreground/80">
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">1.</span>
                  <p><strong>デザインシステム = 原則 + トークン/コンポーネント + ドキュメント</strong> ― 単なる部品集ではない</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">2.</span>
                  <p><strong>階層構造で構築する</strong> ― Tokens → Foundation → Primitives → Patterns → Templates</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">3.</span>
                  <p><strong>トークンは3層で管理</strong> ― グローバル → セマンティック → コンポーネント</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">4.</span>
                  <p><strong>API 設計は一貫性と柔軟性のバランス</strong> ― Composition パターンを基本に</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">5.</span>
                  <p><strong>最小限から始める</strong> ― Button, Input, Typography, Stack, Card の5つから</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">6.</span>
                  <p><strong>Figma とコードの完全一致は幻想</strong> ― ギャップを理解し、コミュニケーションで埋める</p>
                </div>
              </div>
            </div>

            <p className="text-foreground/80 mt-6 leading-relaxed">
              このステップでは、デザインシステムの設計思想から実装の詳細まで、一通り学びました。
              次の Step 55（最終章）では、このデザインシステムを長期的に運用し、
              チームで育てていくための実践的な方法を学びます。
              そして、55ステップの学習全体を振り返り、次のステップへの道筋を描きます。
            </p>
          </section>
        </div>

        {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Radix UI',
                  url: 'https://www.radix-ui.com/',
                  description: 'アクセシブルな Headless UI コンポーネント',
                },
                {
                  title: 'Style Dictionary',
                  url: 'https://amzn.github.io/style-dictionary/',
                  description: 'デザイントークン管理ツール',
                },
                {
                  title: 'shadcn/ui',
                  url: 'https://ui.shadcn.com/',
                  description: 'Radix + Tailwind ベースのコンポーネント集',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
