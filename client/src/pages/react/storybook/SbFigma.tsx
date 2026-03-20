import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import CodingChallenge from '@/components/CodingChallenge';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function SbFigma() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 56</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Figma 連携と Chromatic</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Figma のデザインを Storybook に埋め込み、Design Tokens をコードに変換し、
          Chromatic でビジュアルリグレッションテストを行う。
          デザインとコードの間のギャップを埋める実践的なワークフローを学びます。
        </p>

        <WhyNowBox tags={['Figma', 'addon-designs', 'Design Tokens', 'Chromatic', 'ビジュアルリグレッション', 'CI/CD']}>
          <p>
            デザイナーが Figma で作ったデザインと、エンジニアが実装したコンポーネント。
            この 2 つが「本当に一致しているか」を確認する方法がないと、
            レビューのたびに「ここ微妙に違います」のやりとりが発生します。
            Figma 連携と Chromatic を導入すれば、デザインの確認と UI の品質管理を自動化できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: 全体像 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Storybook と Figma 連携の全体像</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Storybook と Figma の連携は、大きく分けて 3 つのレベルがあります。
              プロジェクトの規模やチームの成熟度に合わせて、段階的に導入できます。
            </p>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="rounded-lg border border-border p-5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm mb-3">1</div>
                <h3 className="font-bold text-foreground mb-2">デザイン埋め込み</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Storybook のパネルに Figma のフレームを表示。
                  コンポーネントの「あるべき姿」を実装と並べて確認できます。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-sm mb-3">2</div>
                <h3 className="font-bold text-foreground mb-2">Design Tokens 共有</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Figma で定義した色・フォント・スペーシングなどの Design Tokens を
                  コードに自動変換。デザインとコードの値を一致させます。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-sm mb-3">3</div>
                <h3 className="font-bold text-foreground mb-2">ビジュアルテスト</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Chromatic で UI のスナップショットを撮影し、
                  変更前後の差分を検出。意図しない UI の変更を防ぎます。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="デザイナーの方へ">
              <p>
                Figma 連携はデザイナーにとって最もメリットが大きい機能です。
                Storybook を開くだけで「自分のデザインと実装の差」を確認できます。
                Chromatic を使えば、エンジニアのコード変更で UI が崩れた場合に自動で通知されます。
                「実装がデザインと違う」という問題の発見が大幅に早くなります。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: addon-designs */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">@storybook/addon-designs で Figma フレームを埋め込む</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code>@storybook/addon-designs</code> を使うと、Storybook の「Design」タブに
              Figma のフレームを直接表示できます。エンジニアは実装とデザインを並べて確認しながら開発できます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">インストールと設定</h3>

            <CodeBlock
              language="bash"
              title="addon-designs のインストール"
              code={`pnpm add -D @storybook/addon-designs`}
            />

            <div className="mt-4">
              <CodeBlock
                language="ts"
                title=".storybook/main.ts - addon の登録"
                showLineNumbers
                code={`import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mts|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-designs',  // 追加
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;`}
              />
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Figma URL をストーリーに設定</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ストーリーの <code>parameters.design</code> に Figma のフレーム URL を設定します。
              Figma で対象フレームを右クリックし「Copy link to selection」で URL を取得できます。
            </p>

            <CodeBlock
              language="tsx"
              title="src/components/Button/Button.stories.tsx"
              showLineNumbers
              code={`import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Figma フレームの埋め込み設定
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xxxxx/Design-System?node-id=123-456',
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

// ストーリーごとに異なる Figma フレームを指定することも可能
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'ボタン',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xxxxx/Design-System?node-id=123-789',
    },
  },
};`}
            />

            <CodePreview previewOnly previewOnly
              title="Figma Variant → Story Variant"
              code={`function VariantMapping() {
  const variants = ['Primary', 'Secondary', 'Ghost'];
  const states = ['Default', 'Hover', 'Disabled'];
  const colors = {
    Primary:   { bg: '#3b82f6', hover: '#2563eb', text: '#fff' },
    Secondary: { bg: '#f1f5f9', hover: '#e2e8f0', text: '#334155' },
    Ghost:     { bg: 'transparent', hover: '#f1f5f9', text: '#3b82f6' },
  };
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
        <span style={{ fontSize: '10px', background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: 99, fontWeight: 600 }}>Figma Variants</span>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>=</span>
        <span style={{ fontSize: '10px', background: '#fae8ff', color: '#86198f', padding: '2px 8px', borderRadius: 99, fontWeight: 600 }}>Storybook Stories</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(3, 1fr)', gap: '3px' }}>
        <div />
        {states.map(s => (
          <div key={s} style={{ fontSize: '10px', textAlign: 'center', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', paddingBottom: 6 }}>{s}</div>
        ))}
        {variants.map(v => {
          const c = colors[v];
          return [
            <div key={v + '-label'} style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center' }}>{v}</div>,
            ...states.map((s, si) => (
              <div key={v + s} style={{ display: 'flex', justifyContent: 'center', padding: '6px' }}>
                <button style={{
                  padding: '6px 16px', borderRadius: 6, fontSize: '12px', fontWeight: 600, border: v === 'Ghost' ? '1px solid #cbd5e1' : 'none', cursor: 'pointer',
                  background: si === 0 ? c.bg : si === 1 ? c.hover : c.bg, color: c.text,
                  opacity: si === 2 ? 0.4 : 1,
                  boxShadow: si === 1 && v === 'Primary' ? '0 4px 12px rgba(59,130,246,0.3)' : 'none',
                }}>Button</button>
              </div>
            ))
          ];
        })}
      </div>
      <div style={{ marginTop: '14px', padding: '10px 12px', background: 'var(--bg-muted)', borderRadius: 8, display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Figma:</span>
        <code style={{ fontSize: '10px', color: '#7c3aed', background: '#f5f3ff', padding: '2px 6px', borderRadius: 3 }}>variant=Primary, state=Hover</code>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{'→'}</span>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Story:</span>
        <code style={{ fontSize: '10px', color: '#0369a1', background: '#f0f9ff', padding: '2px 6px', borderRadius: 3 }}>PrimaryHover</code>
      </div>
    </div>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">複数のデザインを表示</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              1 つのストーリーに対して、PC 版とモバイル版など複数のデザインを表示することもできます。
            </p>

            <CodeBlock
              language="tsx"
              title="複数の Figma フレームを指定"
              showLineNumbers
              code={`export const Responsive: Story = {
  args: {
    children: 'レスポンシブボタン',
  },
  parameters: {
    design: [
      {
        name: 'Desktop',
        type: 'figma',
        url: 'https://www.figma.com/file/xxxxx/Design?node-id=100-200',
      },
      {
        name: 'Mobile',
        type: 'figma',
        url: 'https://www.figma.com/file/xxxxx/Design?node-id=100-300',
      },
    ],
  },
};`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">デザイナーとエンジニアの確認フロー</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              addon-designs を導入した後の、実務での確認フローを紹介します。
            </p>

            <div className="space-y-3 mb-4">
              {[
                { role: 'デザイナー', action: 'Figma でコンポーネントをデザインし、フレーム URL を共有' },
                { role: 'エンジニア', action: 'ストーリーの parameters.design に URL を設定' },
                { role: 'エンジニア', action: 'Storybook の Design タブでデザインと実装を並べて開発' },
                { role: 'デザイナー', action: 'Storybook を確認し、デザインとの差異をフィードバック' },
                { role: '両者', action: '差異を修正して再確認。一致したらマージ' },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {step.role}
                    </span>
                    <p className="text-sm text-foreground/80 mt-1">{step.action}</p>
                  </div>
                </div>
              ))}
            </div>

            <InfoBox type="success" title="Figma のアクセス権限">
              <p>
                addon-designs は Figma の埋め込み機能を使います。
                チームメンバーが Figma ファイルの閲覧権限を持っていれば、
                Storybook から直接 Figma フレームを見ることができます。
                権限がない場合は「Sign in to Figma」の画面が表示されます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 3: Design Tokens */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Design Tokens をコードに変換する</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Design Tokens とは、色・フォント・スペーシング・角丸などのデザイン値を、
              プラットフォームに依存しない形式（通常は JSON）で定義したものです。
              Figma で定義した Design Tokens を CSS 変数や JS オブジェクトに変換することで、
              デザインとコードの値を完全に一致させることができます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">Tokens Studio（旧 Figma Tokens）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Tokens Studio は Figma のプラグインで、デザイントークンを JSON 形式でエクスポートできます。
              GitHub と直接連携して、トークンの変更を自動的にリポジトリにプッシュすることも可能です。
            </p>

            <CodeBlock
              language="json"
              title="tokens.json - Tokens Studio からエクスポートされた JSON"
              showLineNumbers
              code={`{
  "color": {
    "primary": {
      "value": "#3b82f6",
      "type": "color",
      "description": "メインブランドカラー"
    },
    "secondary": {
      "value": "#8b5cf6",
      "type": "color",
      "description": "アクセントカラー"
    },
    "text": {
      "default": {
        "value": "#1e293b",
        "type": "color"
      },
      "muted": {
        "value": "#64748b",
        "type": "color"
      }
    }
  },
  "spacing": {
    "xs": { "value": "4px", "type": "spacing" },
    "sm": { "value": "8px", "type": "spacing" },
    "md": { "value": "16px", "type": "spacing" },
    "lg": { "value": "24px", "type": "spacing" },
    "xl": { "value": "32px", "type": "spacing" }
  },
  "borderRadius": {
    "sm": { "value": "4px", "type": "borderRadius" },
    "md": { "value": "8px", "type": "borderRadius" },
    "lg": { "value": "16px", "type": "borderRadius" },
    "full": { "value": "9999px", "type": "borderRadius" }
  },
  "typography": {
    "heading": {
      "fontFamily": { "value": "Inter", "type": "fontFamilies" },
      "fontWeight": { "value": "700", "type": "fontWeights" },
      "fontSize": { "value": "24px", "type": "fontSizes" }
    },
    "body": {
      "fontFamily": { "value": "Inter", "type": "fontFamilies" },
      "fontWeight": { "value": "400", "type": "fontWeights" },
      "fontSize": { "value": "16px", "type": "fontSizes" }
    }
  }
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Style Dictionary で変換する</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Style Dictionary は Amazon が開発した Design Tokens 変換ツールです。
              JSON 形式のトークンを CSS 変数、JavaScript オブジェクト、iOS / Android のネイティブ形式など、
              さまざまな出力形式に変換できます。
            </p>

            <CodeBlock
              language="bash"
              title="Style Dictionary のインストール"
              code={`pnpm add -D style-dictionary`}
            />

            <div className="mt-4">
              <CodeBlock
                language="js"
                title="style-dictionary.config.js"
                showLineNumbers
                code={`import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  platforms: {
    // CSS 変数として出力
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/tokens/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
    },
    // JavaScript オブジェクトとして出力
    js: {
      transformGroup: 'js',
      buildPath: 'src/styles/tokens/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'javascript/es6',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();`}
              />
            </div>

            <div className="mt-4">
              <CodeBlock
                language="css"
                title="出力例: src/styles/tokens/variables.css"
                code={`:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-text-default: #1e293b;
  --color-text-muted: #64748b;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 16px;
  --border-radius-full: 9999px;
}`}
              />
            </div>

            <div className="mt-4">
              <CodeBlock
                language="ts"
                title="出力例: src/styles/tokens/tokens.ts"
                code={`export const ColorPrimary = '#3b82f6';
export const ColorSecondary = '#8b5cf6';
export const ColorTextDefault = '#1e293b';
export const ColorTextMuted = '#64748b';
export const SpacingXs = '4px';
export const SpacingSm = '8px';
export const SpacingMd = '16px';
export const SpacingLg = '24px';
export const SpacingXl = '32px';
export const BorderRadiusSm = '4px';
export const BorderRadiusMd = '8px';
export const BorderRadiusLg = '16px';
export const BorderRadiusFull = '9999px';`}
              />
            </div>

            <CodePreview previewOnly previewOnly
              title="デザイントークンの対応表"
              code={`function DesignTokenMap() {
  const tokens = [
    { figma: 'Primary', css: '--color-primary', value: '#3b82f6' },
    { figma: 'Secondary', css: '--color-secondary', value: '#8b5cf6' },
    { figma: 'Text/Default', css: '--color-text-default', value: '#1e293b' },
    { figma: 'Text/Muted', css: '--color-text-muted', value: '#64748b' },
  ];
  const spacings = [
    { label: 'xs', value: '4px' },
    { label: 'sm', value: '8px' },
    { label: 'md', value: '16px' },
    { label: 'lg', value: '24px' },
    { label: 'xl', value: '32px' },
  ];
  const typo = [
    { name: 'Heading', size: '24px', weight: '700' },
    { name: 'Subheading', size: '18px', weight: '600' },
    { name: 'Body', size: '16px', weight: '400' },
    { name: 'Caption', size: '12px', weight: '400' },
  ];
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700 }}>Color Tokens</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {tokens.map((t, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 28px 1fr auto', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '6px', background: 'var(--bg-muted)' }}>
              <span style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>Figma: {t.figma}</span>
              <div style={{ width: 22, height: 22, borderRadius: 4, background: t.value, border: '1px solid var(--border)' }} />
              <code style={{ fontSize: '11px', color: '#3b82f6', background: '#eff6ff', padding: '2px 6px', borderRadius: 3 }}>{t.css}</code>
              <code style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.value}</code>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h3 style={{ margin: '0 0 10px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700 }}>Spacing Scale</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {spacings.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '11px', width: 24, color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</span>
                <div style={{ height: 14, width: parseInt(s.value) * 3, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: 3, transition: 'width 0.3s' }} />
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ margin: '0 0 10px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700 }}>Typography Scale</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {typo.map((t, i) => (
              <div key={i} style={{ fontSize: t.size, fontWeight: t.weight, color: '#1e293b', lineHeight: 1.4 }}>
                {t.name} <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 400 }}>({t.size} / {t.weight})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="Design Tokens の運用フロー">
              <p>
                実務では次のフローが一般的です:
                (1) デザイナーが Figma の Tokens Studio でトークンを管理
                (2) 変更時に GitHub に JSON をプッシュ
                (3) CI で Style Dictionary を実行し CSS 変数 / JS に変換
                (4) 生成ファイルをコードにインポートして使用。
                この仕組みにより「デザイナーが色を変更 → コードに自動反映」が実現します。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: Chromatic */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Chromatic によるビジュアルリグレッションテスト</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Chromatic は Storybook のメンテナーチームが開発しているサービスで、
              UI の見た目を自動テストします。コードを変更するたびにストーリーのスクリーンショットを撮影し、
              前回との差分を検出して「意図しない UI の変更」を防ぎます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">Chromatic とは</h3>
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">ビジュアルテスト</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  各ストーリーのスクリーンショットを撮影し、ピクセルレベルで変更前後を比較。
                  CSS の 1px のずれも検出します。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">UI レビュー</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  変更があったコンポーネントの差分をチーム全員で確認。
                  デザイナーも「承認」「却下」のフィードバックができます。
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">Chromatic の導入手順</h3>

            <CodeBlock
              language="bash"
              title="Chromatic のインストール"
              code={`pnpm add -D chromatic`}
            />

            <div className="mt-4">
              <CodeBlock
                language="bash"
                title="初回セットアップ（プロジェクトトークンの取得）"
                code={`# 1. https://www.chromatic.com/ でアカウント作成
# 2. GitHub リポジトリを連携
# 3. プロジェクトトークンが発行される

# 初回のスナップショットを撮影
npx chromatic --project-token=chpt_xxxxxxxxxxxxxxxx`}
              />
            </div>

            <div className="mt-4">
              <CodeBlock
                language="json"
                title="package.json - スクリプトの追加"
                code={`{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "chromatic": "chromatic --exit-zero-on-changes"
  }
}`}
              />
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">GitHub Actions との CI/CD 連携</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              PR を作成するたびに自動的に Chromatic を実行し、UI の変更を検出する設定です。
              デザイナーやレビュアーは Chromatic の UI で変更を確認できます。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/workflows/chromatic.yml"
              showLineNumbers
              code={`name: Chromatic

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  chromatic:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # 全履歴が必要（差分比較のため）

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: \${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          exitZeroOnChanges: true  # 変更があっても CI を失敗させない
          exitOnceUploaded: true   # アップロード完了後に終了（高速化）`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">UI レビューワークフロー</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Chromatic が変更を検出すると、PR に「UI Review」のステータスチェックが追加されます。
              チームメンバーは Chromatic の Web UI で変更を確認し、承認または却下できます。
            </p>

            <div className="space-y-3 mb-6">
              {[
                'エンジニアが PR を作成',
                'GitHub Actions が Chromatic を自動実行',
                'Chromatic が各ストーリーのスクリーンショットを撮影',
                '前回のベースラインと比較し、差分を検出',
                '変更があれば PR に「UI Review needed」ステータスを表示',
                'デザイナー / レビュアーが Chromatic UI で差分を確認',
                '意図した変更なら「Accept」、意図しない変更なら「Deny」',
                '全ての変更が Accept されたら PR をマージ',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground/80">{step}</p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">スナップショットテストの仕組み</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Chromatic のスナップショットテストは、通常のユニットテストとは異なるアプローチで
              UI の品質を担保します。
            </p>

            <CodeBlock
              language="text"
              title="スナップショットテストの流れ"
              code={`[ベースライン]                    [新しいビルド]
  Button.stories                   Button.stories
  ┌──────────────┐                 ┌──────────────┐
  │  ボタン       │   ──比較──→    │  ボタン       │
  │  (青色)       │                 │  (緑色)       │  ← 変更検出！
  └──────────────┘                 └──────────────┘

  Card.stories                     Card.stories
  ┌──────────────┐                 ┌──────────────┐
  │  カード       │   ──比較──→    │  カード       │  ← 変更なし
  │              │                 │              │
  └──────────────┘                 └──────────────┘

  → Button の色が変わったことを検出
  → レビュアーに「この変更は意図したものですか？」と確認`}
            />

            <CodePreview previewOnly previewOnly
              title="Visual Regression テスト"
              code={`function VisualRegressionDemo() {
  const [showDiff, setShowDiff] = React.useState(true);
  const Btn = ({ label, bg, radius, changed }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <div style={{ position: 'relative' }}>
        <button style={{ padding: '8px 24px', borderRadius: radius, background: bg, color: '#fff', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>{label}</button>
        {changed && showDiff && (
          <div style={{ position: 'absolute', inset: -3, border: '2px solid #ef4444', borderRadius: radius + 3, pointerEvents: 'none', animation: 'pulse 2s infinite' }} />
        )}
      </div>
      {changed && showDiff && (
        <span style={{ fontSize: '9px', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase' }}>Changed</span>
      )}
    </div>
  );
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <style>{'@keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.5 } }'}</style>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <button onClick={() => setShowDiff(!showDiff)} style={{ fontSize: '11px', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)', background: showDiff ? '#fef2f2' : '#f0fdf4', color: showDiff ? '#dc2626' : '#16a34a', cursor: 'pointer', fontWeight: 600 }}>
          {showDiff ? 'Diff ハイライト ON' : 'Diff ハイライト OFF'}
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', textAlign: 'center' }}>Baseline (前回)</div>
          <div style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '16px', background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <Btn label="Primary" bg="#3b82f6" radius={6} />
            <Btn label="Secondary" bg="#8b5cf6" radius={6} />
            <Btn label="Danger" bg="#ef4444" radius={6} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '28px', gap: '4px' }}>
          <span style={{ fontSize: '18px', color: 'var(--text-muted)' }}>{'→'}</span>
          <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>DIFF</span>
        </div>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', textAlign: 'center' }}>New Build (今回)</div>
          <div style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '16px', background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <Btn label="Primary" bg="#3b82f6" radius={6} />
            <Btn label="Secondary" bg="#7c3aed" radius={6} changed />
            <Btn label="Danger" bg="#ef4444" radius={12} changed />
          </div>
        </div>
      </div>
      <div style={{ marginTop: '14px', padding: '10px 12px', background: '#fef2f2', borderRadius: 8, border: '1px solid #fecaca' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626', marginBottom: '4px' }}>Chromatic が検出した変更:</div>
        <div style={{ fontSize: '11px', color: '#7f1d1d' }}>
          <div>{'・'} Secondary ボタン: 色が #8b5cf6 {'→'} #7c3aed に変化</div>
          <div>{'・'} Danger ボタン: border-radius が 6px {'→'} 12px に変化</div>
        </div>
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="warning" title="Chromatic の無料枠">
              <p>
                Chromatic の無料プランでは月 5,000 スナップショットまで利用できます。
                ストーリー数が多いプロジェクトでは、<code>--only-changed</code> オプションで
                変更のあったストーリーだけテストすることで、スナップショット数を節約できます。
                <code>npx chromatic --only-changed</code> で実行します。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: デザイナー視点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デザイナー視点: なぜ Chromatic が重要か</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Chromatic は技術的なツールですが、最大の恩恵を受けるのはデザイナーです。
              なぜなら「意図しない UI の変更」を自動的に検出してくれるからです。
            </p>

            <div className="rounded-lg border border-border p-6 mb-6">
              <h3 className="font-bold text-foreground mb-3">Chromatic がない場合のよくある問題</h3>
              <div className="space-y-3">
                {[
                  'エンジニアが共通コンポーネントを修正 → 別画面のレイアウトが崩れたことに気づかない',
                  'ライブラリのバージョンアップ → スタイルが微妙に変わったことに気づかない',
                  'CSS の修正 → 意図しないコンポーネントにまで影響が出ていることに気づかない',
                  'リリース後にユーザーから「画面が変わった」と報告を受けて初めて発覚',
                ].map((problem, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-red-500 flex-shrink-0 mt-0.5">-</span>
                    <p className="text-sm text-foreground/80">{problem}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-6 mb-6">
              <h3 className="font-bold text-foreground mb-3">Chromatic がある場合</h3>
              <div className="space-y-3">
                {[
                  '全てのストーリーの見た目が自動チェックされるため、影響範囲を見落とさない',
                  'デザイナーが UI レビューで「承認 / 却下」できるため、品質のゲートキーパーになれる',
                  'ベースラインが更新されるため「いつ、どの PR で変わったか」の履歴が残る',
                  'リリース前に問題を発見でき、ユーザーに影響する前に修正できる',
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-green-500 flex-shrink-0 mt-0.5">+</span>
                    <p className="text-sm text-foreground/80">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <CodePreview previewOnly previewOnly
              title="デザインシステムのコンポーネント一覧"
              code={`function ComponentCatalog() {
  const Avatar = ({ name, color }) => (
    <div style={{ width: 36, height: 36, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 700 }}>
      {name[0]}
    </div>
  );
  const Badge = ({ label, color }) => (
    <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 10px', borderRadius: 99, background: color + '18', color: color, border: '1px solid ' + color + '40' }}>{label}</span>
  );
  const BtnComp = ({ label, bg }) => (
    <button style={{ padding: '6px 16px', borderRadius: 6, background: bg, color: '#fff', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>{label}</button>
  );
  const Card = ({ title }) => (
    <div style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '14px', background: 'var(--bg)' }}>
      <div style={{ width: '100%', height: 48, borderRadius: 6, background: 'linear-gradient(135deg, #dbeafe, #ede9fe)', marginBottom: 10 }} />
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>{title}</div>
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 2 }}>説明テキスト</div>
    </div>
  );
  const Input = ({ placeholder }) => (
    <input readOnly placeholder={placeholder} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border)', fontSize: '12px', width: '100%', outline: 'none', color: '#475569' }} />
  );
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Design System / Components</span>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: 'auto' }}>5 components</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <div style={{ border: '1px solid #f1f5f9', borderRadius: 10, padding: '14px', background: '#fafbfc' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase' }}>Avatar</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Avatar name="Alice" color="#3b82f6" />
            <Avatar name="Bob" color="#8b5cf6" />
            <Avatar name="Cat" color="#f59e0b" />
          </div>
        </div>
        <div style={{ border: '1px solid #f1f5f9', borderRadius: 10, padding: '14px', background: '#fafbfc' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase' }}>Badge</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <Badge label="新着" color="#3b82f6" />
            <Badge label="人気" color="#f59e0b" />
            <Badge label="完了" color="#22c55e" />
          </div>
        </div>
        <div style={{ border: '1px solid #f1f5f9', borderRadius: 10, padding: '14px', background: '#fafbfc' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase' }}>Button</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <BtnComp label="Primary" bg="#3b82f6" />
            <BtnComp label="Danger" bg="#ef4444" />
          </div>
        </div>
        <div style={{ border: '1px solid #f1f5f9', borderRadius: 10, padding: '14px', background: '#fafbfc', gridColumn: 'span 2' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase' }}>Card</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <Card title="ダッシュボード" />
            <Card title="プロフィール" />
          </div>
        </div>
        <div style={{ border: '1px solid #f1f5f9', borderRadius: 10, padding: '14px', background: '#fafbfc' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase' }}>Input</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Input placeholder="メールアドレス" />
            <Input placeholder="パスワード" />
          </div>
        </div>
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="デザイナーも Chromatic にアクセスできる">
              <p>
                Chromatic はブラウザベースのサービスです。
                デザイナーも GitHub アカウントがあれば、コードに触れることなく
                UI の変更をレビューし、承認 / 却下のフィードバックができます。
                エンジニアとデザイナーの協業において非常に強力なツールです。
              </p>
            </InfoBox>
          </section>

          {/* セクション 6: Storybook Publish */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Storybook を静的サイトとして公開する</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Storybook はビルドすると静的な HTML/CSS/JS ファイルになります。
              これを Web サーバーにデプロイすれば、開発環境がなくてもブラウザから
              コンポーネントカタログを閲覧できます。
              デザイナーや PM がコンポーネントの状態を確認する際にとても便利です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">ビルドとデプロイ</h3>

            <CodeBlock
              language="bash"
              title="Storybook のビルド"
              code={`# 静的ファイルを生成（デフォルトで storybook-static/ に出力）
pnpm build-storybook

# 生成されたファイルの確認
ls storybook-static/
# index.html  iframe.html  assets/  ...`}
            />

            <div className="mt-4">
              <CodeBlock
                language="yaml"
                title=".github/workflows/deploy-storybook.yml - GitHub Pages へのデプロイ"
                showLineNumbers
                code={`name: Deploy Storybook

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm build-storybook

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: storybook-static

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`}
              />
            </div>

            <InfoBox type="success" title="Chromatic でも公開できる">
              <p>
                Chromatic を使っている場合、ビルドするたびに自動的に
                Storybook が公開されます。Chromatic の URL を共有するだけで
                チーム全員がコンポーネントカタログにアクセスできるため、
                GitHub Pages の設定が不要になります。
              </p>
            </InfoBox>
          </section>

          {/* ワークフロー図 & チャレンジ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Figma → Code → Storybook ワークフロー</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザインからコンポーネントが完成するまでの 3 ステップを可視化します。
              Figma でデザイン → コードに変換 → Storybook で確認・テスト、という流れが基本です。
            </p>

            <CodePreview previewOnly previewOnly
              title="Figma → Code → Storybook ワークフロー"
              code={`function WorkflowDiagram() {
  const steps = [
    { icon: '🎨', title: 'Figma', sub: 'デザイン & トークン定義', color: '#7c3aed', bg: '#f5f3ff', items: ['コンポーネント設計', 'Variant 定義', 'Design Tokens 管理'] },
    { icon: '💻', title: 'Code', sub: 'Style Dictionary & 実装', color: '#0369a1', bg: '#f0f9ff', items: ['tokens.json 変換', 'CSS 変数生成', 'コンポーネント実装'] },
    { icon: '📖', title: 'Storybook', sub: '確認 & テスト', color: '#059669', bg: '#f0fdf4', items: ['Stories 作成', 'Figma 埋め込み', 'Chromatic テスト'] },
  ];
  return (
    <div style={{ padding: '24px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: '0' }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ flex: 1, border: '2px solid ' + s.color + '30', borderRadius: 12, padding: '16px', background: s.bg, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: s.color }}>{s.title}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{s.sub}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {s.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#475569' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {i < 2 && (
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 6px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  <svg width="28" height="20" viewBox="0 0 28 20"><path d="M2 10h20m0 0l-6-6m6 6l-6 6" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontSize: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>{i === 0 ? 'Transform' : 'Verify'}</span>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: '16px', padding: '10px 14px', borderRadius: 8, background: 'var(--bg-muted)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke="#22c55e" strokeWidth="1.5" fill="none"/><path d="M5 8l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span style={{ fontSize: '11px', color: '#475569' }}>Chromatic CI が各 PR で自動実行 → デザイナーがレビュー → マージ</span>
      </div>
    </div>
  );
}`}
            />

            <CodingChallenge
              title="デザイントークン ショーケースを作ろう"
              description="colors と typography 配列の ___ を埋めてください。Success（緑）と Body（本文サイズ）のデザイントークンを追加します。"
              preview={true}
              initialCode={`function TokenShowcase() {
  const colors = [
    { name: 'Primary', value: '#3b82f6' },
    { name: 'Secondary', value: '#8b5cf6' },
    { name: '___', value: '#22c55e' }, // ← ここを埋める（トークン名）
    { name: 'Warning', value: '#f59e0b' },
    { name: 'Danger', value: '#ef4444' },
  ];

  const typography = [
    { name: 'Heading', size: '28px', weight: '700' },
    { name: 'Subheading', size: '20px', weight: '600' },
    { name: '___', size: '16px', weight: '400' }, // ← ここを埋める（トークン名）
    { name: 'Caption', size: '12px', weight: '400' },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '12px' }}>
        Color Palette
      </h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {colors.map((c, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 10, background: c.value, boxShadow: '0 2px 8px ' + c.value + '40' }} />
            <div style={{ fontSize: '10px', marginTop: 4, color: '#475569', fontWeight: 600 }}>{c.name}</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{c.value}</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '12px' }}>
        Typography Scale
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {typography.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontSize: t.size, fontWeight: t.weight, color: '#1e293b' }}>{t.name}</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{t.size} / {t.weight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`}
              answer={`function TokenShowcase() {
  const colors = [
    { name: 'Primary', value: '#3b82f6' },
    { name: 'Secondary', value: '#8b5cf6' },
    { name: 'Success', value: '#22c55e' },
    { name: 'Warning', value: '#f59e0b' },
    { name: 'Danger', value: '#ef4444' },
  ];

  const typography = [
    { name: 'Heading', size: '28px', weight: '700' },
    { name: 'Subheading', size: '20px', weight: '600' },
    { name: 'Body', size: '16px', weight: '400' },
    { name: 'Caption', size: '12px', weight: '400' },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '12px' }}>
        Color Palette
      </h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {colors.map((c, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 10, background: c.value, boxShadow: '0 2px 8px ' + c.value + '40' }} />
            <div style={{ fontSize: '10px', marginTop: 4, color: '#475569', fontWeight: 600 }}>{c.name}</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{c.value}</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '12px' }}>
        Typography Scale
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {typography.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontSize: t.size, fontWeight: t.weight, color: '#1e293b' }}>{t.name}</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{t.size} / {t.weight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`}
              hints={[
                '緑色 #22c55e に対応するトークン名は Success です',
                '16px/400 の本文サイズに対応するトークン名は Body です',
              ]}
              keywords={["'Success'", "'Body'"]}
            />
          </section>

          {/* セクション 7: まとめと実践チェックリスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ: 段階的な導入のすすめ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Figma 連携と Chromatic は一度にすべて導入する必要はありません。
              プロジェクトの状況に合わせて段階的に導入することをおすすめします。
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">まず: Storybook を公開する</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      Storybook をビルドして GitHub Pages や Chromatic で公開します。
                      エンジニア以外のメンバーもコンポーネントを確認できるようになります。
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">次に: addon-designs で Figma を埋め込む</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      主要コンポーネントから始めて、Figma の URL をストーリーに設定します。
                      デザインと実装の比較が簡単になります。
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">さらに: Chromatic でビジュアルテスト</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      CI に Chromatic を組み込み、PR ごとの UI 変更を自動検出します。
                      デザイナーも UI レビューに参加できるようになります。
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">4</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">発展: Design Tokens の自動同期</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      Tokens Studio + Style Dictionary で、Figma のデザイントークンを
                      コードに自動変換するパイプラインを構築します。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Figma 連携 - Storybook',
                  url: 'https://storybook.js.org/docs/sharing/design-integrations',
                  description: 'デザインツールとの統合',
                },
                {
                  title: 'Chromatic',
                  url: 'https://www.chromatic.com/',
                  description: 'ビジュアルリグレッションテストサービス',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
