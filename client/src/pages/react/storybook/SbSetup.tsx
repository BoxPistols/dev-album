import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function SbSetup() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 48</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Storybook 導入と初期画面</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React + Vite プロジェクトに Storybook を導入し、初期画面の見方を理解しましょう。
          コマンド1つでインストールが完了し、サンプルの Story がすぐに確認できます。
        </p>

        <WhyNowBox tags={['Storybook 導入', 'Vite', '初期設定', 'TypeScript']}>
          <p>
            前のステップで Storybook の概念を学びました。
            ここからは実際に手を動かしてセットアップします。
            「百聞は一見に如かず」で、動く Storybook を見ればコンポーネントカタログの価値が実感できます。
            初期状態のファイル構造を理解しておくことで、次のステップでの Story 作成がスムーズになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: インストール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React + Vite プロジェクトへの導入</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              既存の React + Vite プロジェクトに Storybook を追加するのはとても簡単です。
              <code>npx storybook@latest init</code> コマンドを実行するだけで、
              Storybook がプロジェクトのフレームワークとビルドツールを自動検出し、
              必要な設定ファイルとサンプルストーリーを生成します。
            </p>

            <CodeBlock
              language="bash"
              title="Storybook のインストール"
              code={`# プロジェクトのルートディレクトリで実行
npx storybook@latest init

# 実行すると以下が自動的に行われる:
# 1. フレームワーク（React）とビルドツール（Vite）を検出
# 2. 必要なパッケージをインストール
# 3. .storybook/ ディレクトリと設定ファイルを作成
# 4. src/stories/ にサンプルストーリーを生成
# 5. package.json に storybook / build-storybook スクリプトを追加`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="json"
              title="package.json に追加されるスクリプト"
              code={`{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}`}
            />

            <InfoBox type="info" title="ポート番号について">
              <p>
                Storybook はデフォルトでポート 6006 で起動します。
                Vite の開発サーバー（通常 5173）と異なるポートなので、
                両方を同時に起動できます。
                <code>storybook dev -p 6007</code> のようにポートを変更することも可能です。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: インストール後のファイル構造 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">インストール後のファイル構造</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>storybook init</code> を実行すると、プロジェクトに新しいファイルとディレクトリが追加されます。
              それぞれの役割を確認しましょう。
            </p>

            <CodeBlock
              language="text"
              title="追加されるファイル・ディレクトリ"
              code={`my-react-app/
├── .storybook/              # Storybook の設定ディレクトリ
│   ├── main.ts              # メイン設定（ストーリーの場所、アドオンなど）
│   └── preview.ts           # プレビュー設定（デコレーター、グローバル設定）
├── src/
│   ├── stories/             # サンプルストーリー（削除しても OK）
│   │   ├── Button.tsx       # サンプルの Button コンポーネント
│   │   ├── Button.stories.ts # Button の Story ファイル
│   │   ├── Header.tsx       # サンプルの Header コンポーネント
│   │   ├── Header.stories.ts
│   │   ├── Page.tsx         # サンプルの Page コンポーネント
│   │   ├── Page.stories.ts
│   │   ├── button.css       # サンプルの CSS
│   │   ├── header.css
│   │   ├── page.css
│   │   └── Configure.mdx    # Welcome ページ
│   └── ...（既存のファイル）
└── package.json             # storybook スクリプトが追加される`}
            />

            <div className="mt-4" />

            <InfoBox type="warning" title="src/stories/ はあくまでサンプル">
              <p>
                <code>src/stories/</code> ディレクトリに生成されるファイルはサンプルです。
                Storybook の使い方を学んだ後は、削除しても問題ありません。
                実際のプロジェクトでは、コンポーネントと同じディレクトリに Story ファイルを置くのが一般的です
                （Step 49 で詳しく解説します）。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: main.ts の設定解説 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">.storybook/main.ts の設定</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>main.ts</code> は Storybook の中核となる設定ファイルです。
              どこにある Story ファイルを読み込むか、どのアドオンを使うか、
              どのフレームワークで動作させるかを定義します。
            </p>

            <CodeBlock
              language="tsx"
              title=".storybook/main.ts"
              showLineNumbers
              code={`import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Story ファイルの場所を指定（glob パターン）
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  // 使用するアドオン
  addons: [
    '@storybook/addon-essentials',  // 必須アドオンセット
    '@storybook/addon-onboarding',  // 初回ガイド（不要なら削除可）
    '@storybook/addon-interactions', // インタラクションテスト
    '@storybook/addon-a11y',        // アクセシビリティチェック
  ],

  // フレームワーク設定
  framework: {
    name: '@storybook/react-vite',  // React + Vite
    options: {},
  },
};

export default config;`}
            />

            <div className="mt-4" />

            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">stories</h3>
                <p className="text-sm text-muted-foreground">
                  Story ファイルを検索する glob パターンの配列です。
                  デフォルトでは <code>src</code> 配下の <code>.stories.tsx</code> と <code>.mdx</code> を対象にしています。
                  パターンを変更すれば、特定のディレクトリだけを対象にしたり、除外したりできます。
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">addons</h3>
                <p className="text-sm text-muted-foreground">
                  使用するアドオンの一覧です。<code>@storybook/addon-essentials</code> には
                  Controls、Actions、Viewport、Backgrounds、Docs などの必須機能が含まれています。
                  アドオンを追加・削除するときはこの配列を編集します。
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">framework</h3>
                <p className="text-sm text-muted-foreground">
                  Storybook がどのフレームワーク・ビルドツールで動作するかを指定します。
                  React + Vite なら <code>@storybook/react-vite</code>、
                  React + Webpack なら <code>@storybook/react-webpack5</code>、
                  Next.js なら <code>@storybook/nextjs</code> を使います。
                </p>
              </div>
            </div>

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="よくあるカスタマイズ例"
              showLineNumbers
              code={`import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    // src/components 配下だけを対象にする場合
    '../src/components/**/*.stories.@(ts|tsx)',
    // ドキュメントページ
    '../src/**/*.mdx',
  ],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    // Figma 連携を追加
    '@storybook/addon-designs',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  // Vite の設定をカスタマイズ
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': '/src',  // パスエイリアスの設定
        },
      },
    });
  },

  // 静的ファイルのディレクトリ
  staticDirs: ['../public'],

  // TypeScript の設定
  typescript: {
    // react-docgen で Props の型情報を抽出
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;`}
            />

            <InfoBox type="warning" title="パスエイリアス（@/）の設定">
              <p>
                Vite プロジェクトで <code>@/</code> のようなパスエイリアスを使っている場合、
                Storybook 側にも同じエイリアスを設定する必要があります。
                <code>viteFinal</code> で Vite の設定をマージするか、
                <code>vite.config.ts</code> を自動的に読み込む設定にしましょう。
                Storybook 8 + Vite では通常、<code>vite.config.ts</code> が自動的に読み込まれます。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: preview.ts の解説 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">.storybook/preview.ts の設定</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>preview.ts</code> は、すべての Story に適用されるグローバル設定を定義するファイルです。
              デコレーター（ラッパー）、デフォルトのパラメータ、グローバルな型設定などを記述します。
            </p>

            <CodeBlock
              language="tsx"
              title=".storybook/preview.ts（デフォルト）"
              showLineNumbers
              code={`import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    // Controls アドオンの設定
    controls: {
      matchers: {
        // 'color' や 'background' を含む Props にカラーピッカーを表示
        color: /(background|color)$/i,
        // 'date' を含む Props に日付ピッカーを表示
        date: /Date$/i,
      },
    },
  },
};

export default preview;`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title=".storybook/preview.ts（実践的なカスタマイズ例）"
              showLineNumbers
              code={`import type { Preview } from '@storybook/react';
import React from 'react';

// グローバル CSS の読み込み
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // Canvas のレイアウト設定
    layout: 'centered', // 'centered' | 'fullscreen' | 'padded'

    // 背景色のプリセット
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a2e' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },

    // ビューポートのプリセット
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
  },

  // すべての Story に適用するデコレーター
  decorators: [
    // 全体をラップする例（テーマプロバイダー、ルーターなど）
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],

  // グローバルの初期値
  globalTypes: {
    locale: {
      description: '言語設定',
      defaultValue: 'ja',
      toolbar: {
        title: '言語',
        icon: 'globe',
        items: ['ja', 'en'],
      },
    },
  },
};

export default preview;`}
            />

            <div className="mt-4" />

            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">parameters</h3>
                <p className="text-sm text-muted-foreground">
                  すべての Story に適用されるデフォルトのパラメータです。
                  Controls の設定、レイアウト、背景色、ビューポートなどをここで一括指定できます。
                  個別の Story で上書きすることもできます。
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">decorators</h3>
                <p className="text-sm text-muted-foreground">
                  すべての Story をラップするコンポーネントです。
                  テーマプロバイダー、ルーター、グローバルステートなど、
                  コンポーネントの動作に必要な Provider をここで一括設定できます。
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">globalTypes</h3>
                <p className="text-sm text-muted-foreground">
                  Storybook のツールバーに表示されるグローバルな切り替え項目です。
                  言語切り替え、テーマ切り替えなど、全 Story に影響する設定をツールバーから操作できます。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="グローバル CSS の読み込み">
              <p>
                Tailwind CSS や独自のグローバル CSS を使っている場合、
                <code>preview.ts</code> で import してください。
                これをしないと、Storybook 内のコンポーネントにグローバルスタイルが適用されません。
                例えば <code>import '../src/index.css';</code> で Tailwind のベーススタイルが読み込まれます。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: 初期画面の見方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">初期画面の見方</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              インストールが完了したら、Storybook を起動して初期画面を確認しましょう。
            </p>

            <CodeBlock
              language="bash"
              title="Storybook の起動"
              code={`pnpm storybook

# ブラウザで http://localhost:6006 が自動的に開く
# 初回起動時はオンボーディングガイドが表示される`}
            />

            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">Welcome ページ</h3>
                <p className="text-sm text-muted-foreground">
                  初回起動時に表示されるページです。Storybook の基本的な使い方が紹介されています。
                  <code>Configure.mdx</code> ファイルがこのページの内容を定義しています。
                  不要になったら <code>src/stories/Configure.mdx</code> を削除すれば消えます。
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">サンプルストーリー</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  サイドバーに「Example」フォルダがあり、その中に Button、Header、Page の
                  サンプルストーリーが含まれています。それぞれをクリックして、以下を試してみましょう。
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Canvas でコンポーネントの描画を確認</li>
                  <li>Controls パネルで Props を変更してリアルタイムに反映を確認</li>
                  <li>Docs タブでドキュメントビューを確認</li>
                  <li>Actions パネルでボタンクリック時のイベントログを確認</li>
                </ul>
              </div>
            </div>

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="サンプルの Button.stories.ts を読んでみよう"
              showLineNumbers
              code={`// src/stories/Button.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

// Meta: このファイルがどのコンポーネントの Story かを定義
const meta = {
  title: 'Example/Button',     // サイドバーのパス
  component: Button,            // 対象コンポーネント
  parameters: {
    layout: 'centered',         // 中央揃えで表示
  },
  tags: ['autodocs'],           // Docs ページを自動生成
  argTypes: {
    backgroundColor: { control: 'color' }, // カラーピッカーで制御
  },
  args: {
    onClick: fn(),              // クリックイベントのモック
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 各 Story: コンポーネントのバリエーション
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};`}
            />

            <InfoBox type="info" title="satisfies キーワードについて">
              <p>
                <code>satisfies Meta&lt;typeof Button&gt;</code> は TypeScript 4.9 で追加された機能です。
                <code>as</code> と違い、型チェックを行いつつ、元の型情報（リテラル型）を保持します。
                これにより、Story 側で <code>args</code> の型推論が正確に働きます。
              </p>
            </InfoBox>
          </section>

          {/* セクション6: ファイルが増えすぎて不安 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">「ファイルが増えすぎて不安...」</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Storybook を初めて導入すると、<code>.storybook/</code> ディレクトリ、
              <code>src/stories/</code> ディレクトリ、そしてコンポーネントごとの <code>.stories.tsx</code> ファイル...
              「こんなにファイルが増えて大丈夫？」と思うのは自然なことです。
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">設定ファイルは2つだけ: </strong>
                  <code>.storybook/main.ts</code> と <code>.storybook/preview.ts</code> だけが必須の設定ファイルです。
                  一度設定すれば頻繁に変更することはありません。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">サンプルは削除 OK: </strong>
                  <code>src/stories/</code> のサンプルファイルはすべて削除して構いません。
                  学習が済んだら消してしまいましょう。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Story はコンポーネントの隣に: </strong>
                  <code>Button.tsx</code> の隣に <code>Button.stories.tsx</code> を置く方式なら、
                  新しいディレクトリは増えません。「このコンポーネントの Story はどこ？」と迷うこともありません。
                </p>
              </div>
            </div>

            <CodeBlock
              language="text"
              title="推奨: コンポーネントと Story を同じ場所に置く"
              code={`src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx            # コンポーネント本体
│   │   ├── Button.stories.tsx    # Story ファイル（隣に置く）
│   │   ├── Button.test.tsx       # テストファイル
│   │   └── Button.module.css     # スタイル
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── Card.stories.tsx
│   │   └── Card.module.css
│   └── Input/
│       ├── Input.tsx
│       ├── Input.stories.tsx
│       └── Input.module.css
├── .storybook/
│   ├── main.ts                   # 設定（1つだけ）
│   └── preview.ts                # プレビュー設定（1つだけ）
└── package.json`}
            />

            <InfoBox type="success" title="Story ファイルはアプリのビルドに含まれない">
              <p>
                <code>.stories.tsx</code> ファイルは Storybook のビルドにだけ使われます。
                <code>npm run build</code> でアプリをビルドする際には含まれません。
                ファイルが増えてもアプリのバンドルサイズには一切影響しません。安心してください。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: Next.js プロジェクトでの違い */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Next.js プロジェクトでの導入</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Next.js プロジェクトでも <code>npx storybook@latest init</code> で導入できますが、
              いくつかの違いがあります。
            </p>

            <CodeBlock
              language="bash"
              title="Next.js プロジェクトへのインストール"
              code={`# Next.js プロジェクトでも同じコマンド
npx storybook@latest init

# Storybook が Next.js を検出し、自動的に
# @storybook/nextjs フレームワークを使用する`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title=".storybook/main.ts（Next.js 版）"
              showLineNumbers
              code={`import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    // React + Vite の場合: '@storybook/react-vite'
    // Next.js の場合: '@storybook/nextjs'
    name: '@storybook/nextjs',
    options: {},
  },
};

export default config;`}
            />

            <div className="mt-4" />

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">項目</th>
                    <th className="text-left p-3 font-semibold text-foreground">React + Vite</th>
                    <th className="text-left p-3 font-semibold text-foreground">Next.js</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3">framework</td>
                    <td className="p-3"><code>@storybook/react-vite</code></td>
                    <td className="p-3"><code>@storybook/nextjs</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">next/image</td>
                    <td className="p-3">使用不可</td>
                    <td className="p-3">自動的にモック化される</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">next/link</td>
                    <td className="p-3">使用不可</td>
                    <td className="p-3">自動的にモック化される</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">next/navigation</td>
                    <td className="p-3">使用不可</td>
                    <td className="p-3">自動的にモック化される</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">Server Components</td>
                    <td className="p-3">--</td>
                    <td className="p-3">Storybook 8 で実験的サポート</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">CSS Modules</td>
                    <td className="p-3">Vite が処理</td>
                    <td className="p-3">Next.js の設定を引き継ぐ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="warning" title="Next.js の Server Components に注意">
              <p>
                Server Components は Storybook 内ではそのまま動作しません。
                Storybook はブラウザ（クライアント）で動作するため、
                Server Components を Story にするには Client Component として扱うか、
                データをモック化する必要があります。
                <code>@storybook/nextjs</code> の RSC サポートは Storybook 8 で改善されつつあります。
              </p>
            </InfoBox>
          </section>

          {/* セクション8: TypeScript の型設定 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">TypeScript での Storybook 型設定</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeScript プロジェクトでは、Story の型定義を正しく設定することで、
              args の型チェック、自動補完、ドキュメントの自動生成が最大限活用できます。
            </p>

            <CodeBlock
              language="tsx"
              title="Story ファイルの型定義パターン"
              showLineNumbers
              code={`import type { Meta, StoryObj } from '@storybook/react';
import { MyButton } from './MyButton';

// パターン1: satisfies を使う（推奨）
// → meta の型チェックが行われつつ、リテラル型が保持される
const meta = {
  title: 'Components/MyButton',
  component: MyButton,
  tags: ['autodocs'],
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ↑ こうすると args の型が自動的に MyButton の Props から推論される

export const Default: Story = {
  args: {
    label: 'ボタン',      // ← 型チェックされる
    variant: 'primary',   // ← 型チェックされる
    // typo: true,         // ← 型エラー（存在しない Props）
  },
};`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="パターン2: 型注釈を使う場合"
              showLineNumbers
              code={`import type { Meta, StoryObj } from '@storybook/react';
import { MyButton } from './MyButton';

// パターン2: 型注釈を使う
// → 型は安全だが、title のリテラル型が失われる場合がある
const meta: Meta<typeof MyButton> = {
  title: 'Components/MyButton',
  component: MyButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyButton>;

export const Default: Story = {
  args: {
    label: 'ボタン',
    variant: 'primary',
  },
};`}
            />

            <InfoBox type="info" title="react-docgen-typescript について">
              <p>
                Storybook は <code>react-docgen-typescript</code> を使って
                TypeScript のインターフェースから Props テーブルを自動生成します。
                Props に JSDoc コメントをつけておくと、Docs ページの説明文として表示されます。
                <code>/** ボタンのラベル */</code> のようなコメントを積極的に書きましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション9: dev server の起動と確認 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">開発サーバーの起動と確認</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              セットアップが完了したら、実際に Storybook を起動して動作確認をしましょう。
            </p>

            <CodeBlock
              language="bash"
              title="起動コマンドとオプション"
              code={`# 基本の起動（ポート 6006）
pnpm storybook

# ポートを指定して起動
npx storybook dev -p 6007

# ブラウザを自動で開かない
npx storybook dev --no-open

# CI 用: ビルドしてから静的ファイルとして提供
pnpm build-storybook
# → storybook-static/ ディレクトリに出力される
# → 任意のWebサーバーでホスティング可能`}
            />

            <div className="mt-6" />

            <h3 className="text-lg font-bold text-foreground mb-3">起動後のチェックリスト</h3>
            <div className="space-y-2 mb-6">
              {[
                'ブラウザで http://localhost:6006 が開くか',
                'サイドバーにサンプルの Story（Button, Header, Page）が表示されるか',
                'Button の Story をクリックして Canvas にボタンが表示されるか',
                'Controls パネルで label を変更して反映されるか',
                'Docs タブを開いて Props テーブルが表示されるか',
                'ホットリロードが動作するか（Story ファイルを編集して保存）',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded bg-card">
                  <span className="flex-shrink-0 w-5 h-5 rounded border border-border flex items-center justify-center text-xs text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <InfoBox type="warning" title="起動時のトラブルシューティング">
              <p className="mb-2">よくある問題と解決策:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <strong>ポートが使用中: </strong>
                  <code>-p 6007</code> で別のポートを指定
                </li>
                <li>
                  <strong>パスエイリアスのエラー: </strong>
                  <code>.storybook/main.ts</code> の <code>viteFinal</code> で alias を設定
                </li>
                <li>
                  <strong>CSS が適用されない: </strong>
                  <code>.storybook/preview.ts</code> でグローバル CSS を import
                </li>
                <li>
                  <strong>Node.js バージョン: </strong>
                  Storybook 8 は Node.js 18 以上が必要
                </li>
                <li>
                  <strong>キャッシュの問題: </strong>
                  <code>npx storybook@latest upgrade --force</code> または
                  <code>node_modules/.cache/storybook</code> を削除
                </li>
              </ul>
            </InfoBox>
          </section>

          {/* セクション10: 静的ビルド */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">静的ビルドとデプロイ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Storybook は静的サイトとしてビルドし、チームに共有することもできます。
              開発サーバーがなくても、ブラウザだけで全 Story を閲覧できます。
            </p>

            <CodeBlock
              language="bash"
              title="Storybook の静的ビルド"
              code={`# 静的ファイルとしてビルド
pnpm build-storybook

# 出力先: storybook-static/
# → GitHub Pages, Vercel, Netlify などにデプロイ可能

# .gitignore に追加しておく
echo "storybook-static" >> .gitignore`}
            />

            <InfoBox type="success" title="このステップのまとめ">
              <ul className="list-disc pl-4 space-y-1">
                <li><code>npx storybook@latest init</code> で自動セットアップが完了する</li>
                <li>設定ファイルは <code>.storybook/main.ts</code> と <code>preview.ts</code> の2つ</li>
                <li><code>main.ts</code> で Story の場所・アドオン・フレームワークを設定</li>
                <li><code>preview.ts</code> でグローバルなデコレーター・パラメータを設定</li>
                <li>Next.js では <code>@storybook/nextjs</code> フレームワークが使われる</li>
                <li>静的ビルドでチームに共有でき、Chromatic でホスティングもできる</li>
                <li>次のステップでは、自分のコンポーネントに Story を書く方法を学びます</li>
              </ul>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Storybook セットアップ',
                  url: 'https://storybook.js.org/docs/get-started/install',
                  description: 'プロジェクトへの Storybook 導入手順',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
