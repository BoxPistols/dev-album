import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function SbFigma() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 51</span>
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
                「実装がデザインと違う」という問題の発見が劇的に早くなります。
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
