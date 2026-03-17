import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import CodingChallenge from '@/components/CodingChallenge';
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
            ここからは「自分のコンポーネントに Story を書く」方法を扱います。
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

            <p className="text-muted-foreground my-4 leading-relaxed">
              上のコードで定義した Story が Storybook 上ではこのように表示されます。
              各バリエーションがカタログのように一覧でき、デザイナーもコードを読まずに確認できます。
            </p>

            <CodePreview
  code={`function StoryOutputDemo() {
  const base = { padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', border: 'none', transition: 'all 0.2s', fontFamily: 'system-ui, sans-serif' };
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {/* Storybook ヘッダー風 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Components / Button</span>
        </div>
        {/* Story 一覧 */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Primary */}
            <div>
              <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Primary</div>
              <button style={{ ...base, background: '#6366f1', color: 'white' }}>ボタン</button>
            </div>
            {/* Secondary */}
            <div>
              <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Secondary</div>
              <button style={{ ...base, background: '#e2e8f0', color: '#334155' }}>ボタン</button>
            </div>
            {/* Danger */}
            <div>
              <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Danger</div>
              <button style={{ ...base, background: '#ef4444', color: 'white' }}>削除する</button>
            </div>
            {/* All Variants */}
            <div>
              <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>All Variants</div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button style={{ ...base, background: '#6366f1', color: 'white' }}>Primary</button>
                <button style={{ ...base, background: '#e2e8f0', color: '#334155' }}>Secondary</button>
                <button style={{ ...base, background: '#ef4444', color: 'white' }}>Danger</button>
                <button style={{ ...base, background: 'transparent', color: '#6366f1', border: '1px solid #6366f1' }}>Ghost</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`}
  title="CSF で書いた Story の出力イメージ"
  language="tsx"
/>
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

            <p className="text-muted-foreground my-4 leading-relaxed">
              args を変えるだけでコンポーネントの見た目がどう変わるか、実際に試してみましょう。
              下のコードで <code>title</code> や <code>hasImage</code> を編集すると、カードの表示がリアルタイムに変化します。
            </p>

            <CodePreview
  code={`function ArgsVariationDemo() {
  const [activeTab, setActiveTab] = React.useState(0);
  const variants = [
    { title: 'React 入門ガイド', description: '初心者向けのチュートリアルです。', hasImage: true, imgColor: '#6366f1' },
    { title: 'CSS Tips', description: 'レスポンシブデザインのコツ', hasImage: false, imgColor: '' },
    { title: '超長いタイトルのカードで折り返し表示のテストを行う場合はこのように書きます', description: 'エッジケースの確認', hasImage: true, imgColor: '#f59e0b' },
  ];
  const tabs = ['画像あり', '画像なし', '長いタイトル'];
  const v = variants[activeTab];
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>args を切り替えてバリエーション確認</div>
      {/* タブ */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActiveTab(i)} style={{ padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', background: activeTab === i ? '#6366f1' : '#f1f5f9', color: activeTab === i ? 'white' : '#64748b', transition: 'all 0.2s' }}>{t}</button>
        ))}
      </div>
      {/* カード */}
      <div style={{ width: '320px', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {v.hasImage && <div style={{ height: '160px', background: v.imgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 700 }}>Image</div>}
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 700, color: '#1e293b', lineHeight: 1.4 }}>{v.title}</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>{v.description}</p>
        </div>
      </div>
      {/* 現在の args 表示 */}
      <div style={{ marginTop: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>現在の args</div>
        <code style={{ fontSize: '12px', color: '#6366f1' }}>{'{ title: "' + v.title.substring(0, 30) + (v.title.length > 30 ? '...' : '') + '", hasImage: ' + v.hasImage + ' }'}</code>
      </div>
    </div>
  );
}`}
  title="args によるバリエーション管理"
  language="tsx"
/>
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

            <p className="text-muted-foreground my-4 leading-relaxed">
              play 関数が実行されると、フォームへの入力や送信が自動的に行われます。
              下のデモでは「テスト実行」を押すと、play 関数が何をするかをアニメーションで確認できます。
            </p>

            <CodePreview
  code={`function PlayFunctionDemo() {
  const [step, setStep] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [result, setResult] = React.useState('');
  const [log, setLog] = React.useState([]);
  const steps = [
    { action: 'email', value: 'user@example.com', log: 'userEvent.type(email, "user@example.com")' },
    { action: 'password', value: 'password123', log: 'userEvent.type(password, "password123")' },
    { action: 'click', value: '', log: 'userEvent.click(loginButton)' },
    { action: 'assert', value: '', log: 'expect(onSubmit).toHaveBeenCalled() ✓' },
  ];
  const runTest = () => {
    if (running) return;
    setRunning(true); setStep(0); setEmail(''); setPassword(''); setResult(''); setLog([]);
    let i = 0;
    const interval = setInterval(() => {
      const s = steps[i];
      if (s.action === 'email') setEmail(s.value);
      else if (s.action === 'password') setPassword(s.value);
      else if (s.action === 'click') setResult('送信中...');
      else if (s.action === 'assert') setResult('ログイン成功！');
      setLog(prev => [...prev, s.log]);
      setStep(i + 1);
      i++;
      if (i >= steps.length) { clearInterval(interval); setTimeout(() => setRunning(false), 500); }
    }, 800);
  };
  const reset = () => { setStep(0); setEmail(''); setPassword(''); setResult(''); setLog([]); setRunning(false); };
  const inputStyle = { width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', fontFamily: 'system-ui', outline: 'none', transition: 'border-color 0.2s' };
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {/* フォーム */}
        <div style={{ width: '280px', padding: '24px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>ログイン</h3>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>メールアドレス</label>
            <input value={email} readOnly style={{ ...inputStyle, borderColor: step === 1 ? '#6366f1' : '#d1d5db', boxShadow: step === 1 ? '0 0 0 2px rgba(99,102,241,0.2)' : 'none' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>パスワード</label>
            <input type="password" value={password} readOnly style={{ ...inputStyle, borderColor: step === 2 ? '#6366f1' : '#d1d5db', boxShadow: step === 2 ? '0 0 0 2px rgba(99,102,241,0.2)' : 'none' }} />
          </div>
          <button style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: step === 3 ? '#4f46e5' : '#6366f1', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer', transform: step === 3 ? 'scale(0.98)' : 'scale(1)', transition: 'all 0.15s' }}>ログイン</button>
          {result && <div style={{ marginTop: '12px', padding: '8px 12px', borderRadius: '6px', background: result.includes('成功') ? '#f0fdf4' : '#f8fafc', color: result.includes('成功') ? '#16a34a' : '#64748b', fontSize: '13px', fontWeight: 600, textAlign: 'center' }}>{result}</div>}
        </div>
        {/* ログパネル */}
        <div style={{ flex: 1, minWidth: '240px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Interactions ログ</div>
          <div style={{ background: '#1e1e2e', borderRadius: '8px', padding: '12px', minHeight: '160px' }}>
            {log.length === 0 && <div style={{ color: '#585b70', fontSize: '13px', fontStyle: 'italic' }}>テスト実行を押すと、play 関数の動作を確認できます</div>}
            {log.map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', fontSize: '12px', fontFamily: 'monospace', animation: 'fadeIn 0.3s ease' }}>
                <span style={{ color: l.includes('✓') ? '#a6e3a1' : '#89b4fa' }}>{l.includes('✓') ? '✓' : '▶'}</span>
                <span style={{ color: l.includes('✓') ? '#a6e3a1' : '#cdd6f4' }}>{l}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button onClick={runTest} disabled={running} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: running ? '#94a3b8' : '#6366f1', color: 'white', fontSize: '13px', fontWeight: 600, cursor: running ? 'not-allowed' : 'pointer' }}>{running ? '実行中...' : 'テスト実行'}</button>
            <button onClick={reset} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>リセット</button>
          </div>
        </div>
      </div>
    </div>
  );
}`}
  title="play function のインタラクションテスト"
  language="tsx"
/>
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

            <p className="text-muted-foreground my-4 leading-relaxed">
              <code>title</code> のスラッシュ（<code>/</code>）でサイドバーが階層化されます。
              Storybook のサイドバーがどのようにグルーピングされるか視覚的に確認しましょう。
            </p>

            <CodePreview
  code={`function StoryGroupingDemo() {
  const [expanded, setExpanded] = React.useState({ Components: true, Form: true, Layout: false, Pages: false });
  const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  const Folder = ({ name, open, onClick, children, depth = 0 }) => (
    <div>
      <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', paddingLeft: 12 + depth * 16, cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#334155', borderRadius: '6px', background: 'transparent', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background='#f1f5f9'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
        <span style={{ fontSize: '10px', transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}>▶</span>
        <span style={{ fontSize: '14px' }}>{open ? '📂' : '📁'}</span>
        {name}
      </div>
      {open && <div>{children}</div>}
    </div>
  );
  const Story = ({ name, depth = 0, icon = '📄' }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', paddingLeft: 12 + depth * 16, fontSize: '13px', color: '#64748b', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.15s' }} onMouseEnter={e => { e.currentTarget.style.background='#ede9fe'; e.currentTarget.style.color='#6366f1'; }} onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#64748b'; }}>
      <span style={{ fontSize: '12px' }}>{icon}</span>
      {name}
    </div>
  );
  return (
    <div style={{ padding: '16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {/* サイドバー風ツリー */}
        <div style={{ width: '240px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '12px 8px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 12px', marginBottom: '4px' }}>Storybook Sidebar</div>
          <Folder name="Components" open={expanded.Components} onClick={() => toggle('Components')} depth={0}>
            <Story name="Button" depth={1} />
            <Folder name="Form" open={expanded.Form} onClick={() => toggle('Form')} depth={1}>
              <Story name="Input" depth={2} />
              <Story name="Select" depth={2} />
              <Story name="Checkbox" depth={2} />
            </Folder>
            <Story name="Card" depth={1} />
            <Story name="Badge" depth={1} />
          </Folder>
          <Folder name="Layout" open={expanded.Layout} onClick={() => toggle('Layout')} depth={0}>
            <Story name="Header" depth={1} />
            <Story name="Sidebar" depth={1} />
            <Story name="Footer" depth={1} />
          </Folder>
          <Folder name="Pages" open={expanded.Pages} onClick={() => toggle('Pages')} depth={0}>
            <Story name="Home" depth={1} icon="🏠" />
            <Story name="Dashboard" depth={1} icon="📊" />
          </Folder>
        </div>
        {/* title の対応表 */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>title とサイドバーの対応</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[["'Components/Button'", 'Components > Button'], ["'Components/Form/Input'", 'Components > Form > Input'], ["'Layout/Header'", 'Layout > Header'], ["'Pages/Home'", 'Pages > Home']].map(([code, result], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <code style={{ fontSize: '12px', color: '#6366f1', fontWeight: 600 }}>{code}</code>
                <span style={{ color: '#94a3b8' }}>→</span>
                <span style={{ fontSize: '13px', color: '#334155' }}>{result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`}
  title="Story のグルーピング（サイドバー階層）"
  language="tsx"
/>

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

            {/* コーディングチャレンジ 1: Badge コンポーネント */}
            <CodingChallenge
              title="Badge コンポーネントを作ろう"
              description="success / warning / error の3つのバリアントを持つ Badge コンポーネントを作成してください。各バリアントで背景色とテキスト色が変わるようにしましょう。"
              preview={true}
              initialCode={`function Badge({ variant = 'success', children }) {
  // variant に応じてスタイルを変える
  const styles = {
    // ここにバリアントごとのスタイルを定義
  };

  return (
    <span style={{
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: 600,
    }}>
      {children}
    </span>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', gap: '8px', padding: '24px', flexWrap: 'wrap' }}>
      <Badge variant="success">完了</Badge>
      <Badge variant="warning">注意</Badge>
      <Badge variant="error">エラー</Badge>
    </div>
  );
}`}
              answer={`function Badge({ variant = 'success', children }) {
  const styles = {
    success: { background: '#dcfce7', color: '#16a34a' },
    warning: { background: '#fef9c3', color: '#ca8a04' },
    error: { background: '#fee2e2', color: '#dc2626' },
  };

  return (
    <span style={{
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: 600,
      ...styles[variant],
    }}>
      {children}
    </span>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', gap: '8px', padding: '24px', flexWrap: 'wrap' }}>
      <Badge variant="success">完了</Badge>
      <Badge variant="warning">注意</Badge>
      <Badge variant="error">エラー</Badge>
    </div>
  );
}`}
              keywords={['success', 'warning', 'error', 'background', 'color', '#dcfce7', '#fee2e2', '...styles']}
              hints={[
                'styles オブジェクトに success / warning / error のキーを作り、それぞれ background と color を定義しましょう。',
                'スプレッド構文 ...styles[variant] で、variant に応じたスタイルを span に適用します。',
                'success は緑系（#dcfce7 / #16a34a）、warning は黄系（#fef9c3 / #ca8a04）、error は赤系（#fee2e2 / #dc2626）が定番です。',
              ]}
            />

            {/* コーディングチャレンジ 2: Story ファイル構造 */}
            <CodingChallenge
              title="Alert の Story を CSF3 で書こう"
              description="Alert コンポーネントの Story ファイルを CSF3 形式で完成させてください。Meta の定義と、info / success / error の3つの Story を追加しましょう。"
              preview={true}
              initialCode={`function Alert({ variant = 'info', title, children }) {
  const styles = {
    info: { bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8', icon: 'ℹ️' },
    success: { bg: '#f0fdf4', border: '#bbf7d0', color: '#16a34a', icon: '✅' },
    error: { bg: '#fef2f2', border: '#fecaca', color: '#dc2626', icon: '❌' },
  };
  const s = styles[variant] || styles.info;
  return (
    <div style={{ padding: '12px 16px', borderRadius: '8px', background: s.bg, border: '1px solid ' + s.border, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
      <span>{s.icon}</span>
      <div>
        <div style={{ fontWeight: 600, color: s.color, fontSize: '14px' }}>{title}</div>
        <div style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>{children}</div>
      </div>
    </div>
  );
}

// CSF3 形式で Story を書いてみよう
function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', maxWidth: '480px' }}>
      {/* Info Story */}

      {/* Success Story */}

      {/* Error Story */}

    </div>
  );
}`}
              answer={`function Alert({ variant = 'info', title, children }) {
  const styles = {
    info: { bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8', icon: 'ℹ️' },
    success: { bg: '#f0fdf4', border: '#bbf7d0', color: '#16a34a', icon: '✅' },
    error: { bg: '#fef2f2', border: '#fecaca', color: '#dc2626', icon: '❌' },
  };
  const s = styles[variant] || styles.info;
  return (
    <div style={{ padding: '12px 16px', borderRadius: '8px', background: s.bg, border: '1px solid ' + s.border, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
      <span>{s.icon}</span>
      <div>
        <div style={{ fontWeight: 600, color: s.color, fontSize: '14px' }}>{title}</div>
        <div style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>{children}</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', maxWidth: '480px' }}>
      <Alert variant="info" title="お知らせ">新機能が追加されました。</Alert>
      <Alert variant="success" title="完了">データの保存が完了しました。</Alert>
      <Alert variant="error" title="エラー">入力内容に問題があります。</Alert>
    </div>
  );
}`}
              keywords={['variant="info"', 'variant="success"', 'variant="error"', '<Alert', 'title=']}
              hints={[
                'Alert コンポーネントは variant, title, children の3つの props を受け取ります。',
                '各 Story は <Alert variant="..." title="...">子テキスト</Alert> の形で書きます。',
                'info / success / error の3バリアントをそれぞれ App 内に配置してください。',
              ]}
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
