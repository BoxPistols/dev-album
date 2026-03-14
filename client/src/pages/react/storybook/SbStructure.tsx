import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function SbStructure() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 54</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Story の書き方と構造</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          CSF3（Component Story Format 3）の構造を理解し、自分のコンポーネントに Story を書けるようになりましょう。
          Meta オブジェクト、args、play 関数、decorators など、Story ファイルの全要素を実践的に学びます。
        </p>

        <WhyNowBox tags={['CSF3', 'Meta', 'args', 'argTypes', 'play 関数', 'decorators']}>
          <p>
            前のステップで Storybook をセットアップし、サンプルの Story を確認しました。
            ここからは「自分のコンポーネントに Story を書く」スキルを身につけます。
            Story の書き方を覚えれば、コンポーネントの全バリエーションをカタログ化でき、
            チーム全体で UI の品質を維持する基盤が整います。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: CSF3 の解説 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSF3（Component Story Format 3）とは</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              CSF は Story を記述するための標準フォーマットです。
              Storybook 7 以降で推奨される CSF3 は、オブジェクトベースの簡潔な書き方が特徴です。
            </p>

            <CodeBlock
              language="tsx"
              title="CSF3 の基本構造"
              showLineNumbers
              code={`import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// 1. Meta（デフォルトエクスポート）: ファイル全体の設定
const meta = {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 2. Story（名前付きエクスポート）: 各バリエーション
export const Primary: Story = {
  args: { variant: 'primary', label: 'ボタン' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', label: 'ボタン' },
};`}
            />

            <div className="mt-4 space-y-3 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">デフォルトエクスポート（Meta）: </strong>
                  ファイル全体に適用される設定。対象コンポーネント、タイトル、デフォルトの args などを定義します。1ファイルに1つ。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">名前付きエクスポート（Story）: </strong>
                  コンポーネントの各バリエーション（状態）。エクスポート名がサイドバーに表示されます。1ファイルに複数定義可能。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="CSF2 との違い">
              <p>
                CSF2 では Story を関数で定義していましたが、CSF3 ではオブジェクトとして定義します。
                <code>{`export const Primary: Story = { args: { ... } }`}</code> のように
                データだけで表現でき、コードが簡潔になりました。新規プロジェクトでは CSF3 を使いましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: Meta オブジェクト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Meta オブジェクトの詳細</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Meta はデフォルトエクスポートとして定義し、Story ファイル全体の設定を担います。
            </p>

            <CodeBlock
              language="tsx"
              title="Meta の主要プロパティ"
              showLineNumbers
              code={`import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Components/Form/Button',  // サイドバーのパス（階層化）
  component: Button,                 // 対象コンポーネント
  tags: ['autodocs'],                // Docs ページを自動生成

  // デフォルトの args（全 Story に適用）
  args: {
    label: 'ボタン',
    onClick: fn(),  // モック関数
  },

  // Controls のカスタマイズ
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
      description: 'ボタンのスタイルバリアント',
    },
    onClick: { table: { disable: true } },  // 非表示
  },

  // Story をラップするデコレーター
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],

  // パラメータ設定
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;`}
            />

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">プロパティ</th>
                    <th className="text-left p-3 font-semibold text-foreground">説明</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3"><code>title</code></td>
                    <td className="p-3">サイドバーの表示パス。省略するとファイルパスから自動生成</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code>component</code></td>
                    <td className="p-3">対象コンポーネント。Props 型推論と Docs 生成に使用</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code>tags</code></td>
                    <td className="p-3"><code>['autodocs']</code> で Docs ページを自動生成</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code>args</code></td>
                    <td className="p-3">全 Story に適用されるデフォルト Props</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code>argTypes</code></td>
                    <td className="p-3">Controls パネルの表示・動作をカスタマイズ</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code>decorators</code></td>
                    <td className="p-3">Story をラップするコンポーネント（Provider 等）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code>parameters</code></td>
                    <td className="p-3">レイアウト、背景色、ドキュメントなどの設定</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* セクション3: Story の定義方法 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Story の定義パターン</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              各 Story は名前付きエクスポートとして定義します。シンプルな形から高度な使い方まで見ていきます。
            </p>

            <CodeBlock
              language="tsx"
              title="Story の定義パターン"
              showLineNumbers
              code={`type Story = StoryObj<typeof meta>;

// パターン1: args だけ（最もシンプル）
export const Primary: Story = {
  args: { variant: 'primary', label: 'ボタン' },
};

// パターン2: render 関数でカスタムレンダリング
export const WithIcon: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <span>💾</span>
      <Button {...args} />
    </div>
  ),
  args: { label: '保存' },
};

// パターン3: 複数コンポーネントの組み合わせ
export const ButtonGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button variant="primary" label="保存" />
      <Button variant="secondary" label="キャンセル" />
      <Button variant="danger" label="削除" />
    </div>
  ),
};

// パターン4: パラメータの上書き
export const OnDarkBackground: Story = {
  args: { label: 'ダーク背景' },
  parameters: { backgrounds: { default: 'dark' } },
};

// パターン5: 表示名を変更
export const LongLabel: Story = {
  name: '長いラベルのボタン',
  args: { label: 'とても長いラベルのボタンテキスト'.repeat(3) },
};`}
            />
          </section>

          {/* セクション4: args と argTypes */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">args と argTypes の詳細</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>args</code> は Props の値、<code>argTypes</code> は Controls パネルでの表示方法を定義します。
              TypeScript の型から Controls が自動生成されますが、<code>argTypes</code> でカスタマイズできます。
            </p>

            <CodeBlock
              language="tsx"
              title="args の継承と上書き"
              showLineNumbers
              code={`const meta = {
  component: Button,
  args: {
    // 全 Story のデフォルト値
    variant: 'primary',
    size: 'md',
    label: 'ボタン',
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

// Story の args はデフォルトを上書き
export const Danger: Story = {
  args: { variant: 'danger', label: '削除する' },
  // → variant と label だけ上書き、他は meta.args のまま
};`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="argTypes のカスタマイズ"
              code={`argTypes: {
  variant: {
    control: { type: 'select' },       // セレクトボックス
    options: ['primary', 'secondary', 'danger'],
    description: 'ボタンのスタイルバリアント',
    table: { category: 'スタイル' },   // グループ化
  },
  size: {
    control: { type: 'radio' },        // ラジオボタン
    options: ['sm', 'md', 'lg'],
    table: { category: 'スタイル' },
  },
  disabled: {
    control: 'boolean',                // トグルスイッチ
    table: { category: '状態' },
  },
  onClick: {
    table: { disable: true },          // 非表示
  },
}`}
            />

            <div className="mt-4 overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">Props の型</th>
                    <th className="text-left p-3 font-semibold text-foreground">自動生成される Control</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3"><code>string</code></td>
                    <td className="p-3">テキスト入力</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code>number</code></td>
                    <td className="p-3">数値入力</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code>boolean</code></td>
                    <td className="p-3">トグルスイッチ</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code>union 型</code></td>
                    <td className="p-3">セレクトボックス</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code>() =&gt; void</code></td>
                    <td className="p-3">Actions ログ（<code>fn()</code> 使用時）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="デザイナーにとっての Controls">
              <p>
                Controls パネルはコードを触らずに Props を変更できる GUI です。
                テキスト入力、トグル、セレクトボックスの操作だけで
                「ラベルを長くしたら？」「disabled にしたら？」といった確認が完了します。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: play 関数 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">play 関数（インタラクションテスト）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>play</code> 関数で、ユーザー操作のシミュレーションとアサーションを Story に組み込めます。
            </p>

            <CodeBlock
              language="tsx"
              title="play 関数の例: フォームの送信テスト"
              showLineNumbers
              code={`import { within, userEvent, expect, fn } from '@storybook/test';
import { LoginForm } from './LoginForm';

const meta = {
  component: LoginForm,
  args: { onSubmit: fn() },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SubmitSuccess: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // フォームに入力
    await userEvent.type(canvas.getByLabelText('メールアドレス'), 'user@example.com');
    await userEvent.type(canvas.getByLabelText('パスワード'), 'password123');

    // 送信
    await userEvent.click(canvas.getByRole('button', { name: 'ログイン' }));

    // 検証
    await expect(args.onSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    });
  },
};

export const ValidationError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 空のまま送信
    await userEvent.click(canvas.getByRole('button', { name: 'ログイン' }));

    // エラーメッセージが表示されるか
    await expect(canvas.getByText('メールアドレスは必須です')).toBeInTheDocument();
  },
};`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="play 関数でよく使う API"
              code={`// ユーザー操作
await userEvent.click(element);         // クリック
await userEvent.type(element, 'text');  // テキスト入力
await userEvent.clear(element);         // クリア
await userEvent.selectOptions(el, 'v'); // セレクト選択
await userEvent.tab();                  // Tab キー

// 要素の取得（Testing Library）
canvas.getByRole('button', { name: '送信' });
canvas.getByLabelText('メール');
canvas.getByText('エラーメッセージ');

// アサーション
await expect(element).toBeInTheDocument();
await expect(element).toHaveTextContent('テキスト');
await expect(mockFn).toHaveBeenCalledWith(arg);`}
            />

            <InfoBox type="warning" title="play 関数とユニットテストの使い分け">
              <p>
                play 関数は Storybook 上でブラウザレンダリングされたコンポーネントをテストします。
                視覚的な確認とテストを同時に行えるのが利点です。
                CI では <code>@storybook/test-runner</code> で play 関数を自動実行できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション6: decorators */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">decorators でラッパーを追加</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>decorators</code> は Story をラップするコンポーネントです。
              テーマプロバイダーやルーターなど、コンポーネントの動作に必要な環境を用意します。
            </p>

            <CodeBlock
              language="tsx"
              title="よくあるデコレーターのパターン"
              code={`// テーマプロバイダー
decorators: [
  (Story) => (
    <ThemeProvider theme="light">
      <Story />
    </ThemeProvider>
  ),
];

// React Router のモック
decorators: [
  (Story) => (
    <MemoryRouter initialEntries={['/']}>
      <Story />
    </MemoryRouter>
  ),
];

// MUI テーマの適用
decorators: [
  (Story) => (
    <ThemeProvider theme={createTheme()}>
      <Story />
    </ThemeProvider>
  ),
];

// コンテキストの提供
decorators: [
  (Story) => (
    <UserContext.Provider value={{ name: 'テストユーザー' }}>
      <Story />
    </UserContext.Provider>
  ),
];`}
            />

            <InfoBox type="info" title="デコレーターの適用順序">
              <p>デコレーターは3つのレベルで設定でき、外側から順に適用されます。</p>
              <ol className="list-decimal pl-4 space-y-1 mt-2">
                <li><code>.storybook/preview.ts</code> のグローバルデコレーター</li>
                <li>Meta のデコレーター</li>
                <li>Story 個別のデコレーター</li>
              </ol>
              <p className="mt-2">
                テーマプロバイダーはグローバルに、特定コンポーネント固有のものは Meta レベルに設定するのが一般的です。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: parameters */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">parameters でレイアウト・背景設定</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>parameters</code> は Props ではなく「表示環境」を制御します。
              Canvas のレイアウト、背景色、ビューポートなどを Story ごとに設定できます。
            </p>

            <CodeBlock
              language="tsx"
              title="parameters の設定例"
              code={`parameters: {
  // Canvas のレイアウト
  layout: 'centered',  // 'centered' | 'fullscreen' | 'padded'

  // 背景色
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#1a1a2e' },
    ],
  },

  // ビューポート
  viewport: { defaultViewport: 'mobile' },
}

// Story ごとに上書き
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
  args: { title: 'モバイル表示' },
};`}
            />
          </section>

          {/* セクション8: 実践 Button */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: Button の完全な Story ファイル</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでの知識を総合して、Button コンポーネントの完全な Story を書いてみましょう。
            </p>

            <CodeBlock
              language="tsx"
              title="Button.stories.tsx"
              showLineNumbers
              code={`import type { Meta, StoryObj } from '@storybook/react';
import { fn, within, userEvent, expect } from '@storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'ghost'],
      table: { category: 'スタイル' },
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      table: { category: 'スタイル' },
    },
    isLoading: { control: 'boolean', table: { category: '状態' } },
    disabled: { control: 'boolean', table: { category: '状態' } },
    fullWidth: { control: 'boolean', table: { category: 'レイアウト' } },
    onClick: { table: { disable: true } },
  },
  args: {
    children: 'ボタン',
    variant: 'primary',
    size: 'md',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// バリアント
export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Danger: Story = { args: { variant: 'danger', children: '削除する' } };
export const Ghost: Story = { args: { variant: 'ghost' } };

// サイズ
export const Small: Story = { args: { size: 'sm', children: '小' } };
export const Large: Story = { args: { size: 'lg', children: '大' } };

// 状態
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { isLoading: true, children: '送信中...' } };

// 全バリアント一覧
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

// インタラクションテスト
export const ClickTest: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};`}
            />
          </section>

          {/* セクション9: 実践 Card */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: Card コンポーネントの Story</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              もう1つ、Card コンポーネントの Story を見てみましょう。
              複数バリエーションやエッジケースの整理方法を学びます。
            </p>

            <CodeBlock
              language="tsx"
              title="Card.stories.tsx"
              showLineNumbers
              code={`import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'カードのタイトル',
    description: 'カードの説明テキストが入ります。',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// バリアント
export const Default: Story = {};
export const Outlined: Story = { args: { variant: 'outlined' } };
export const Elevated: Story = { args: { variant: 'elevated' } };

// 画像付き
export const WithImage: Story = {
  args: {
    title: 'React 入門記事',
    imageUrl: 'https://placehold.co/600x300/3b82f6/ffffff?text=React',
  },
};

// フッター付き
export const WithFooter: Story = {
  args: {
    footer: (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>2024年12月</span>
        <button style={{ color: '#3b82f6', fontSize: '0.875rem' }}>詳しく見る →</button>
      </div>
    ),
  },
};

// クリッカブル
export const Clickable: Story = { args: { onClick: fn() } };

// エッジケース
export const LongTitle: Story = {
  name: '長いタイトル',
  args: {
    title: 'とても長いタイトルのカードで折り返しの確認をします。'.repeat(2),
  },
};

export const NoDescription: Story = {
  name: '説明文なし',
  args: { description: undefined },
};`}
            />
          </section>

          {/* セクション10: ファイル配置パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ファイル配置パターン</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Story ファイルの配置には2つの主要なパターンがあります。
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg border-2 border-green-500 bg-card">
                <h3 className="font-bold text-foreground mb-2">Colocation（推奨）</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  コンポーネントの隣に Story を置く方式。
                </p>
                <CodeBlock
                  language="text"
                  code={`src/components/
├── Button/
│   ├── Button.tsx
│   ├── Button.stories.tsx ← 隣に
│   └── Button.test.tsx
└── Card/
    ├── Card.tsx
    └── Card.stories.tsx   ← 隣に`}
                />
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">stories/ ディレクトリ</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Story を専用ディレクトリにまとめる方式。
                </p>
                <CodeBlock
                  language="text"
                  code={`src/
├── components/
│   ├── Button.tsx
│   └── Card.tsx
└── stories/
    ├── Button.stories.tsx
    └── Card.stories.tsx`}
                />
              </div>
            </div>

            <InfoBox type="info" title="Colocation が推奨される理由">
              <ul className="list-disc pl-4 space-y-1">
                <li>コンポーネントの移動・削除時に Story も一緒に扱える</li>
                <li>import パスが短く済む</li>
                <li>Storybook 公式でも推奨されているパターン</li>
              </ul>
            </InfoBox>

            <InfoBox type="success" title="Story ファイルはアプリのビルドに含まれない">
              <p>
                <code>.stories.tsx</code> は Storybook のビルドにだけ使われます。
                <code>npm run build</code> のアプリビルドには含まれず、バンドルサイズに影響しません。
              </p>
            </InfoBox>
          </section>

          {/* セクション11: Docs ページの自動生成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Docs ページの自動生成</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>tags: ['autodocs']</code> を Meta に追加すると、
              Props テーブル・全 Story のプレビュー・ソースコードが1ページにまとまったドキュメントが自動生成されます。
            </p>

            <CodeBlock
              language="text"
              title="自動生成される Docs ページの内容"
              code={`┌──────────────────────────────────────┐
│  Button                              │
│  汎用ボタンコンポーネント。            │
│                                      │
│  ┌────────────────────┐             │
│  │   [ Primary ]       │  ← Story   │
│  └────────────────────┘  のプレビュー │
│                                      │
│  Props テーブル                       │
│  ┌───────┬────────┬─────────┐       │
│  │ Name  │ Type   │ Default │       │
│  ├───────┼────────┼─────────┤       │
│  │variant│ select │ primary │       │
│  │size   │ radio  │ md      │       │
│  └───────┴────────┴─────────┘       │
│                                      │
│  全 Story のプレビュー一覧            │
└──────────────────────────────────────┘`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="MDX でカスタムドキュメントを書くことも可能"
              code={`// Button.mdx
import { Meta, Canvas, Controls } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

汎用ボタンコンポーネントです。

## 基本的な使い方

<Canvas of={ButtonStories.Primary} />

## Props

<Controls />

## デザインガイドライン

- プライマリボタンは1画面に1つが原則
- 破壊的アクションには確認ダイアログを併用`}
            />

            <InfoBox type="success" title="このステップのまとめ">
              <ul className="list-disc pl-4 space-y-1">
                <li>CSF3 は Meta（デフォルトエクスポート）と Story（名前付きエクスポート）で構成される</li>
                <li>Meta に title, component, args, argTypes, decorators, parameters を設定する</li>
                <li>args で Props を定義し、argTypes で Controls の表示をカスタマイズする</li>
                <li>play 関数でインタラクションテストを Story に組み込める</li>
                <li>decorators でテーマプロバイダーやレイアウトラッパーを追加する</li>
                <li>ファイル配置は Colocation パターンが推奨</li>
                <li><code>tags: ['autodocs']</code> で Docs ページが自動生成される</li>
              </ul>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Stories の書き方',
                  url: 'https://storybook.js.org/docs/writing-stories',
                  description: 'CSF 形式でのストーリー定義',
                },
                {
                  title: 'Args - Storybook',
                  url: 'https://storybook.js.org/docs/writing-stories/args',
                  description: 'コンポーネント Props の動的制御',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
