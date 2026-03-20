import CodeBlock from "@/components/CodeBlock";
import CodePreview from "@/components/CodePreview";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

export default function ComponentDriven() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 70
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          コンポーネント駆動開発（CDD）
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          ページ全体ではなく、小さなコンポーネントから積み上げていくボトムアップ型の開発手法を学びます。
          Figma のコンポーネント設計から Storybook での検証、React
          での実装まで、一貫したワークフローを構築します。
        </p>

        <WhyNowBox
          tags={[
            "CDD",
            "Atomic Design",
            "Figma",
            "Storybook",
            "Story-first",
            "Design Tokens",
          ]}
        >
          <p>
            React コンポーネントの作り方、Storybook での Story 記述、Figma
            との連携を学んできました。
            しかし、これらのツールを「どういう順番で、どう組み合わせるか」というワークフロー全体は
            まだ整理していません。CDD はこのワークフローを体系化した手法であり、
            Figma・Storybook・React を一本の線でつなぐ設計指針になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: CDD とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CDD とは
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              コンポーネント駆動開発（Component-Driven Development）は、UI
              をページ単位ではなく
              コンポーネント単位で設計・実装・テストするボトムアップの開発手法です。
              最小のパーツから作り始め、それらを組み合わせてページを構成します。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              従来のトップダウン開発では、ページのワイヤーフレームを作り、その中の各パーツを実装していきます。
              CDD
              ではこの順序を逆転させ、まずボタンや入力フィールドのような単体パーツを完成させてから、
              それらを組み合わせてページを構築します。
            </p>

            <InfoBox type="info" title="Atomic Design との対応">
              <p className="mb-2">
                Brad Frost が提唱した Atomic Design は、UI
                を5段階の階層で分類するモデルです。 CDD
                の「小さいものから大きいものへ」という思想と一致しています。
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <strong>Atom（原子）</strong> ---
                  ボタン、アイコン、テキスト入力など、これ以上分割できない最小要素
                </li>
                <li>
                  <strong>Molecule（分子）</strong> --- Atom
                  を組み合わせた小機能。検索バー（Input + Button）など
                </li>
                <li>
                  <strong>Organism（有機体）</strong> --- Molecule
                  を組み合わせた独立セクション。ヘッダー、フッターなど
                </li>
                <li>
                  <strong>Template（テンプレート）</strong> --- Organism
                  を配置したページ構造。実データなし
                </li>
                <li>
                  <strong>Page（ページ）</strong> --- Template
                  に実データを流し込んだ最終画面
                </li>
              </ul>
            </InfoBox>

            <CodePreview
              previewOnly
              code={`function AtomicDesignLevels() {
  const levels = [
    { name: 'Atom', color: '#6366F1', example: 'Button, Icon, Label', desc: '最小UI要素' },
    { name: 'Molecule', color: '#8B5CF6', example: 'SearchBar, FormField', desc: 'Atom の組み合わせ' },
    { name: 'Organism', color: '#A855F7', example: 'Header, Sidebar', desc: 'Molecule の集合体' },
    { name: 'Template', color: '#C084FC', example: 'DashboardLayout', desc: '構造のみ（データなし）' },
    { name: 'Page', color: '#D8B4FE', example: 'HomePage', desc: '実データ注入済み' },
  ];
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: '16px' }}>Atomic Design の階層</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {levels.map((l, i) => (
          <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40 + i * 24, height: '36px', borderRadius: '6px', background: l.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>{l.name}</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{l.desc}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{l.example}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '16px', padding: '10px 14px', borderRadius: '6px', background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
        <span style={{ fontSize: '11px', color: '#475569' }}>CDD では下から上へ（Atom → Page）順番に構築する</span>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="Atomic Design: 小さい要素から大きい要素へ"
            />
          </section>

          {/* セクション2: Figma のコンポーネント階層 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Figma のコンポーネント階層
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Figma の Component / Variant / Instance という概念は、CDD の Atom
              / Molecule / Organism にそのまま対応します。 Figma
              でコンポーネントを設計するとき、この対応を意識すると、 React
              の実装に直結する設計が自然に生まれます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">
                      Atomic Design
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      Figma の概念
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      具体例
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Atom</td>
                    <td className="p-3">Component + Variant</td>
                    <td className="p-3">
                      Button（primary / secondary / danger の Variant）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Molecule</td>
                    <td className="p-3">Component（複数 Instance を含む）</td>
                    <td className="p-3">
                      SearchBar（Input Instance + Button Instance）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Organism</td>
                    <td className="p-3">
                      Component（Molecule Instance を含む）
                    </td>
                    <td className="p-3">
                      Header（Logo + SearchBar + UserMenu）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Template</td>
                    <td className="p-3">Frame（Organism Instance を配置）</td>
                    <td className="p-3">
                      DashboardLayout（Header + Sidebar + MainContent）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Page</td>
                    <td className="p-3">Frame（実データ入りのプロトタイプ）</td>
                    <td className="p-3">
                      ダッシュボード画面（実際のテキスト・画像入り）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodePreview
              previewOnly
              code={`function FigmaHierarchy() {
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: '20px' }}>Figma → React: コンポーネント階層の実例</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ padding: '12px 16px', borderRadius: '8px', border: '2px solid #6366F1', background: '#EEF2FF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#6366F1', textTransform: 'uppercase' }}>Atom</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Figma: Component + Variant</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ padding: '6px 14px', borderRadius: '6px', background: '#6366F1', color: 'white', border: 'none', fontSize: '12px', fontWeight: 600 }}>Primary</button>
            <button style={{ padding: '6px 14px', borderRadius: '6px', background: '#E2E8F0', color: 'var(--text)', border: 'none', fontSize: '12px', fontWeight: 600 }}>Secondary</button>
            <button style={{ padding: '6px 14px', borderRadius: '6px', background: '#EF4444', color: 'white', border: 'none', fontSize: '12px', fontWeight: 600 }}>Danger</button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg width="20" height="24" viewBox="0 0 20 24"><path d="M10 0v20m0 0l-5-5m5 5l5-5" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ padding: '12px 16px', borderRadius: '8px', border: '2px solid #8B5CF6', background: '#F5F3FF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#8B5CF6', textTransform: 'uppercase' }}>Molecule</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Figma: Component (Instance x2)</span>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <input placeholder="検索..." style={{ padding: '6px 12px', borderRadius: '6px 0 0 6px', border: '1px solid #CBD5E1', fontSize: '12px', flex: 1, background: 'white', color: 'var(--text)' }} readOnly />
            <button style={{ padding: '6px 14px', borderRadius: '0 6px 6px 0', background: '#6366F1', color: 'white', border: 'none', fontSize: '12px', fontWeight: 600 }}>検索</button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg width="20" height="24" viewBox="0 0 20 24"><path d="M10 0v20m0 0l-5-5m5 5l5-5" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ padding: '12px 16px', borderRadius: '8px', border: '2px solid #A855F7', background: '#FAF5FF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#A855F7', textTransform: 'uppercase' }}>Organism</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Figma: Component (Molecule + Atom Instance)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border)' }}>
            <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>Logo</span>
            <div style={{ display: 'flex', gap: '4px', flex: 1, maxWidth: '200px', margin: '0 16px' }}>
              <input placeholder="検索..." style={{ padding: '4px 8px', borderRadius: '4px 0 0 4px', border: '1px solid #CBD5E1', fontSize: '11px', flex: 1, background: 'white', color: 'var(--text)' }} readOnly />
              <button style={{ padding: '4px 10px', borderRadius: '0 4px 4px 0', background: '#6366F1', color: 'white', border: 'none', fontSize: '11px', fontWeight: 600 }}>検索</button>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>U</div>
          </div>
        </div>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="Atom → Molecule → Organism の構築過程"
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              Figma で Variant を定義すると、React では Props
              の型定義に直結します。 たとえば Button コンポーネントに{" "}
              <code>variant: primary | secondary | danger</code> と
              <code>size: sm | md | lg</code> の Variant があれば、 React 側の
              Props も <code>variant: 'primary' | 'secondary' | 'danger'</code>{" "}
              になります。
            </p>
          </section>

          {/* セクション3: Storybook の役割 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CDD における Storybook の役割
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Storybook は CDD
              のワークフローにおいて、コンポーネントを隔離して開発・テスト・文書化する
              ワークベンチの役割を担います。各コンポーネントを独立した環境で動かし、
              Props のバリエーションを網羅的に可視化します。
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">隔離開発</h3>
                <p className="text-sm text-muted-foreground">
                  ページの文脈から切り離してコンポーネント単体で動作確認する。
                  依存関係なしに Props だけで動く状態を保証する。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">
                  バリエーション管理
                </h3>
                <p className="text-sm text-muted-foreground">
                  CSF3 形式で Story を書き、Props の全組み合わせを可視化する。
                  Controls パネルで動的に値を変更して確認する。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">文書化</h3>
                <p className="text-sm text-muted-foreground">
                  Story を書くだけで、コンポーネントの仕様書が自動生成される。
                  TypeScript の型定義から Props テーブルも出力される。
                </p>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="CSF3 で Story を書く例: Button コンポーネント"
              code={`// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Meta: コンポーネントの基本情報
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',           // サイドバーの階層
  component: Button,
  argTypes: {
    variant: {
      control: 'select',           // Controls パネルで select 表示
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'radio',            // Controls パネルで radio 表示
      options: ['sm', 'md', 'lg'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

// 各バリエーションを Story として定義
export const Primary: Story = {
  args: { variant: 'primary', size: 'md', children: '送信する' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', children: 'キャンセル' },
};

export const Danger: Story = {
  args: { variant: 'danger', size: 'md', children: '削除する' },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
  args: { variant: 'primary' },
};`}
            />

            <InfoBox type="info" title="Storybook の title と Atomic Design">
              <p>
                Story の <code>title</code> プロパティを{" "}
                <code>'Atoms/Button'</code>、<code>'Molecules/SearchBar'</code>
                、<code>'Organisms/Header'</code> のように Atomic Design
                の階層に合わせて設定すると、Storybook のサイドバーが Atomic
                Design の分類でそのまま整理されます。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: CDD のワークフロー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CDD のワークフロー
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              CDD では、Figma での設計から React
              での実装まで、5つのステップを順に進めます。 重要なのは「Story
              を先に書く（Story-first）」というアプローチです。
              テスト駆動開発（TDD）がテストを先に書くように、CDD では Story
              を先に定義してから実装に入ります。
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-r-lg border-l-4 border-violet-500 bg-violet-50 dark:bg-violet-950/30">
                <h3 className="font-bold text-foreground mb-2">
                  Step 1: Figma でコンポーネント設計
                </h3>
                <p className="text-sm text-muted-foreground">
                  Figma でコンポーネントを作成し、Variant を定義する。 Button
                  なら variant（primary / secondary / danger）と size（sm / md /
                  lg）の Variant Property を設定する。Auto Layout
                  でレスポンシブ挙動も定義しておく。
                </p>
              </div>
              <div className="p-4 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30">
                <h3 className="font-bold text-foreground mb-2">
                  Step 2: Storybook で Story を先に書く（Story-first）
                </h3>
                <p className="text-sm text-muted-foreground">
                  Figma の Variant を見ながら、先に Story ファイルを作成する。
                  この段階ではコンポーネント本体はまだ存在しない。
                  「このコンポーネントにどんな Props が必要か」を Story の args
                  で先に決める。
                </p>
              </div>
              <div className="p-4 rounded-r-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/30">
                <h3 className="font-bold text-foreground mb-2">
                  Step 3: React でコンポーネント実装
                </h3>
                <p className="text-sm text-muted-foreground">
                  Story で定義した Props
                  のインターフェースに合わせてコンポーネントを実装する。
                  TypeScript の型定義を先に書き、Figma
                  のデザインに一致するようスタイリングする。
                </p>
              </div>
              <div className="p-4 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30">
                <h3 className="font-bold text-foreground mb-2">
                  Step 4: Storybook で動作確認 + テスト
                </h3>
                <p className="text-sm text-muted-foreground">
                  Storybook を起動して全 Story が正しく表示されるか確認する。
                  Controls で Props
                  を動的に変更し、想定外の見た目にならないか検証する。
                  必要に応じて play 関数でインタラクションテストを追加する。
                </p>
              </div>
              <div className="p-4 rounded-r-lg border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-950/30">
                <h3 className="font-bold text-foreground mb-2">
                  Step 5: ページに組み込み
                </h3>
                <p className="text-sm text-muted-foreground">
                  動作確認が完了したコンポーネントを、Template や Page
                  に組み込む。 Atom を Molecule に、Molecule を Organism
                  にと、ボトムアップで組み立てていく。
                </p>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="Story-first: 実装の前に Story を書く"
              code={`// Step 2: まず Story を書く（この時点で Button.tsx はまだない）
// Button.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
// import { Button } from './Button';  // まだ存在しない

// 仮の Button を使って Story の構造を先に決める
const Button = (props: {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) => <button>{props.children}</button>;

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

// Figma の Variant に対応する Story を列挙
export const Primary: Story = {
  args: { variant: 'primary', size: 'md', children: '送信' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', children: 'キャンセル' },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'SM' },
};

export const Large: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Large' },
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', children: '無効', disabled: true },
};

// Step 3 で Button.tsx を実装 → import を切り替え
// Step 4 で Storybook 上の表示を確認`}
            />

            <InfoBox type="warning" title="Story-first のメリット">
              <p>
                Story を先に書くことで、「このコンポーネントにどんな Props
                が必要か」が 実装前に明確になります。Figma のデザインを見ながら
                Story を書く過程で、 Variant の漏れや Props
                の設計ミスに早期に気づけます。 実装後に「この Props
                は不要だった」「この状態を考慮していなかった」という手戻りを減らせます。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: Figma → Storybook 対応表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Figma → Storybook / React の対応表
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Figma の設計概念が、Storybook の Story や React
              の実装にどう変換されるかを整理します。
              この対応関係を理解しておくと、Figma のデザインを見た瞬間に React
              のコード構造がイメージできるようになります。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">
                      Figma の概念
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      Storybook / React
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      具体例
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Variant Property</td>
                    <td className="p-3">Story の args / Props の型</td>
                    <td className="p-3">
                      <code>variant: primary | secondary</code> →{" "}
                      <code>
                        args: {"{"} variant: 'primary' {"}"}
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Auto Layout</td>
                    <td className="p-3">CSS Flexbox / Grid</td>
                    <td className="p-3">
                      横並び + gap: 8 → <code>display: flex; gap: 8px</code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Design Tokens</td>
                    <td className="p-3">CSS 変数 / テーマ定数</td>
                    <td className="p-3">
                      <code>color/primary: #6366F1</code> →{" "}
                      <code>--color-primary: #6366F1</code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Boolean Property</td>
                    <td className="p-3">boolean 型の Props</td>
                    <td className="p-3">
                      <code>disabled: true/false</code> →{" "}
                      <code>disabled?: boolean</code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Text Property</td>
                    <td className="p-3">string 型の Props</td>
                    <td className="p-3">
                      <code>label: "送信"</code> → <code>children: string</code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Instance Swap</td>
                    <td className="p-3">ReactNode 型の Props</td>
                    <td className="p-3">
                      アイコン差し替え → <code>icon?: ReactNode</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="tsx"
              title="Figma のプロパティ → React Props への変換例"
              code={`// Figma の Button コンポーネント設計:
//   Variant Property: variant = primary | secondary | danger
//   Variant Property: size = sm | md | lg
//   Boolean Property: disabled = true | false
//   Text Property: label = "ボタン"
//   Instance Swap: iconLeft = none | check | arrow

// ↓ React の Props 型に変換

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';   // Variant Property
  size: 'sm' | 'md' | 'lg';                      // Variant Property
  disabled?: boolean;                              // Boolean Property
  children: React.ReactNode;                       // Text Property
  iconLeft?: React.ReactNode;                      // Instance Swap
  onClick?: () => void;                            // Figma には対応なし（振る舞い）
}

// Figma の Auto Layout → CSS Flexbox
// padding: 8, 16 → padding: '8px 16px'
// gap: 8 → gap: '8px'
// Layout: Horizontal → flexDirection: 'row'
// Layout: Vertical → flexDirection: 'column'

// Figma の Design Tokens → CSS 変数
// color/primary: #6366F1 → --color-primary: #6366F1;
// spacing/md: 16 → --spacing-md: 16px;
// radius/md: 8 → --radius-md: 8px;`}
            />
          </section>

          {/* セクション6: 手作業を排除する考え方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手作業を排除する考え方
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              CDD のワークフローで最も非効率なのは、Figma
              のデザイントークン（色、フォントサイズ、スペーシング等）を 手動で
              CSS にコピーする作業です。 デザイナーが Figma で{" "}
              <code>#6366F1</code> を <code>#4F46E5</code> に変更したとき、
              エンジニアがそれを手動で CSS
              にも反映するのでは、ミスと遅延が避けられません。
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20">
                <h3 className="font-bold text-foreground mb-2">
                  手動コピーの問題
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>Figma のトークンとコードのトークンがずれる</li>
                  <li>変更時に全ファイルを手動で書き換える必要がある</li>
                  <li>値のコピーミスが発生しやすい</li>
                  <li>
                    デザイナーの変更がコードに反映されるまでに時間がかかる
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/20">
                <h3 className="font-bold text-foreground mb-2">
                  自動変換の利点
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>
                    Figma のトークンが唯一の情報源（Single Source of Truth）
                  </li>
                  <li>変更は自動的にコードへ反映される</li>
                  <li>手作業のミスが原理的に発生しない</li>
                  <li>デザイナーとエンジニアの同期コストが大幅に低下</li>
                </ul>
              </div>
            </div>

            <CodeBlock
              language="json"
              title="Style Dictionary: トークンの定義ファイル"
              code={`// tokens.json（Figma からエクスポートしたデザイントークン）
{
  "color": {
    "primary": { "value": "#6366F1", "type": "color" },
    "secondary": { "value": "#64748B", "type": "color" },
    "danger": { "value": "#EF4444", "type": "color" },
    "background": { "value": "#FFFFFF", "type": "color" },
    "text": { "value": "#1E293B", "type": "color" }
  },
  "spacing": {
    "xs": { "value": "4px", "type": "spacing" },
    "sm": { "value": "8px", "type": "spacing" },
    "md": { "value": "16px", "type": "spacing" },
    "lg": { "value": "24px", "type": "spacing" }
  },
  "radius": {
    "sm": { "value": "4px", "type": "borderRadius" },
    "md": { "value": "8px", "type": "borderRadius" },
    "lg": { "value": "16px", "type": "borderRadius" }
  }
}`}
            />

            <CodeBlock
              language="css"
              title="Style Dictionary が自動生成する CSS 変数"
              code={`/* 自動生成: tokens.css
   Style Dictionary が tokens.json から変換して出力 */
:root {
  --color-primary: #6366F1;
  --color-secondary: #64748B;
  --color-danger: #EF4444;
  --color-background: #FFFFFF;
  --color-text: #1E293B;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
}

/* Figma でトークンを変更 → JSON を再エクスポート →
   Style Dictionary で再ビルド → CSS 変数が自動更新 */`}
            />

            <CodeBlock
              language="text"
              title="トークン自動変換の全体像"
              code={`┌──────────────┐     ┌────────────────────┐     ┌──────────────┐
│   Figma      │     │  Token Studio /    │     │  React /     │
│              │────▶│  Style Dictionary  │────▶│  CSS 変数    │
│  デザイン    │     │                    │     │              │
│  トークン    │     │  JSON → CSS/TS     │     │  コンポーネ  │
│  を管理      │     │  自動変換          │     │  ントで参照  │
└──────────────┘     └────────────────────┘     └──────────────┘

Token Studio for Figma:
  Figma プラグイン。Figma 内でトークンを管理し、
  JSON 形式でエクスポートできる。
  GitHub と連携して自動 PR を作成することも可能。

Style Dictionary:
  Amazon が開発した OSS。JSON 形式のトークン定義を
  CSS 変数、SCSS 変数、JS/TS 定数など複数形式に変換する。`}
            />

            <InfoBox type="info" title="段階的な導入">
              <p>
                トークンの自動変換は便利ですが、初期導入にはセットアップコストがかかります。
                まずは Figma でトークンを整理し、手動で CSS
                変数に定義する段階から始めて、
                プロジェクトが成長してきたら自動変換を導入するのが現実的です。
                重要なのは「トークンを一箇所で管理する」という考え方自体です。
              </p>
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="CDD（コンポーネント駆動開発）における Story-first アプローチの目的として、最も適切なものはどれですか？"
              options={[
                { label: "Storybook のビルド速度を向上させるため" },
                {
                  label:
                    "実装前に Props のインターフェースを明確にし、設計のミスや漏れを早期に発見するため",
                  correct: true,
                },
                {
                  label: "React コンポーネントのパフォーマンスを最適化するため",
                },
                { label: "Figma プラグインとの自動連携を有効にするため" },
              ]}
              explanation="Story-first は TDD（テスト駆動開発）の考え方を UI 開発に適用したものです。Story を先に書くことで、コンポーネントに必要な Props の型・バリエーション・エッジケースを実装前に洗い出せます。Figma のデザインと Story の args を照合する過程で、Variant の漏れや Props 設計の問題に早期に気づけるのが最大の利点です。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Figma の Variant Property は、Storybook / React ではどの概念に対応しますか？"
              options={[
                { label: "Story の decorators" },
                { label: "Story の args（= React の Props）", correct: true },
                { label: "Story の play 関数" },
                { label: "Story の parameters" },
              ]}
              explanation="Figma の Variant Property（例: variant = primary | secondary）は、React コンポーネントの Props の型定義に直接対応します。Storybook では、各 Variant の組み合わせを Story の args として定義します。たとえば Figma で variant: primary を選んでいる状態は、Story では args: { variant: 'primary' } に相当します。"
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="Story-first でコンポーネントの Story を定義しよう"
              description={`Figma で設計された Badge コンポーネントの Story を完成させてください。
Figma の Variant Property は variant（info / success / warning / error）と size（sm / md）です。
穴埋め部分を埋めて、全 Variant の Story を定義してください。`}
              preview={false}
              initialCode={`import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: '___/Badge',   // Atomic Design の階層
  component: Badge,
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Info: Story = {
  args: { variant: '___', size: 'md', children: '情報' },
};

export const Success: Story = {
  args: { variant: 'success', size: '___', children: '完了' },
};

export const Warning: Story = {
  args: { ___: 'warning', size: 'md', children: '注意' },
};

export const Error: Story = {
  args: { variant: '___', size: 'md', children: 'エラー' },
};`}
              answer={`import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Info: Story = {
  args: { variant: 'info', size: 'md', children: '情報' },
};

export const Success: Story = {
  args: { variant: 'success', size: 'md', children: '完了' },
};

export const Warning: Story = {
  args: { variant: 'warning', size: 'md', children: '注意' },
};

export const Error: Story = {
  args: { variant: 'error', size: 'md', children: 'エラー' },
};`}
              hints={[
                "Badge は最小のUI要素なので、Atomic Design では Atoms 階層に分類されます",
                'Info の variant は "info" です',
                'Success の size は他と同じ "md" です',
                'Warning で空欄になっているキーは "variant" です',
              ]}
              keywords={["Atoms", "info", "md", "variant", "error"]}
            />
          </section>

          {/* まとめ */}
          <section>
            <InfoBox type="success" title="このステップのまとめ">
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  CDD
                  はコンポーネント単位で設計・実装・テストするボトムアップ開発手法
                </li>
                <li>
                  Atomic Design の5階層（Atom → Page）が CDD
                  の構築順序に対応する
                </li>
                <li>
                  Figma の Component / Variant / Instance が React の Props
                  型定義に直結する
                </li>
                <li>
                  Story-first で実装前に Props のインターフェースを確定させる
                </li>
                <li>
                  Figma の Variant Property → Story の args、Auto Layout →
                  Flexbox、Design Tokens → CSS 変数
                </li>
                <li>
                  デザイントークンの手動コピーは Style Dictionary
                  等で自動化できる
                </li>
              </ul>
            </InfoBox>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Component-Driven Development - Storybook",
                  url: "https://www.componentdriven.org/",
                  description: "CDD の概念とワークフローの公式ガイド",
                },
                {
                  title: "Atomic Design by Brad Frost",
                  url: "https://atomicdesign.bradfrost.com/",
                  description:
                    "Atomic Design の原典。UI を5階層に分類する設計手法",
                },
                {
                  title: "Style Dictionary - Amazon",
                  url: "https://styledictionary.com/",
                  description:
                    "デザイントークンを複数プラットフォームの形式に変換する OSS",
                },
                {
                  title: "Tokens Studio for Figma",
                  url: "https://tokens.studio/",
                  description:
                    "Figma 内でデザイントークンを管理・エクスポートするプラグイン",
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
