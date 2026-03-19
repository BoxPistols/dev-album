import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import CodingChallenge from '@/components/CodingChallenge';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function SbAdvanced() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 57</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Storybook 応用とカスタマイズ</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Addons エコシステム、カスタムテーマ、テストランナー、API モック、
          複数 Storybook の統合まで。Storybook をチームの開発基盤として最大限に活用する方法を解説します。
        </p>

        <WhyNowBox tags={['Addons', 'a11y', 'viewport', 'カスタムテーマ', 'テストランナー', 'MSW', 'Composition']}>
          <p>
            Storybook の基本的な使い方を覚えたら、次は開発体験とチーム運用を改善する「応用」の番です。
            アクセシビリティチェックの自動化、レスポンシブ対応の確認、
            テストの統合、API モックの活用など、実務で使われる機能を扱います。
            これらを使いこなせば「Storybook を導入してよかった」とチーム全員が実感できるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: Addons エコシステム */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Addons エコシステム</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Storybook の Addons は、開発パネルにタブやツールバーボタンを追加する拡張機能です。
              公式・コミュニティ合わせて数百の Addons が公開されており、
              必要な機能をプラグインとして組み込めます。
              ここでは実務で特に役立つ Addons を紹介します。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">@storybook/addon-a11y（アクセシビリティチェック）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              axe-core をベースにしたアクセシビリティの自動チェックツールです。
              各ストーリーの表示時に WCAG 違反を検出し、修正方法のガイダンスを表示します。
            </p>

            <CodeBlock
              language="bash"
              title="インストール"
              code={`pnpm add -D @storybook/addon-a11y`}
            />

            <div className="mt-4">
              <CodeBlock
                language="ts"
                title=".storybook/main.ts - addon-a11y の登録"
                showLineNumbers
                code={`import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',  // 追加
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;`}
              />
            </div>

            <div className="mt-4">
              <CodeBlock
                language="tsx"
                title="特定のルールを無効化する例"
                showLineNumbers
                code={`import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    a11y: {
      config: {
        rules: [
          // 意図的にテキストを持たないアイコンボタンの場合
          // aria-label で対応済みなら、このルールを無効化
          { id: 'button-name', enabled: false },
        ],
      },
    },
  },
};

export default meta;`}
              />
            </div>

            <InfoBox type="info" title="デザイナーの方へ: アクセシビリティが重要な理由">
              <p>
                コントラスト比が不足した配色や、クリック領域が小さすぎるボタンは
                a11y addon が自動的に指摘してくれます。デザイン段階では気づきにくい問題を
                実装段階で発見でき、より多くのユーザーに使いやすい UI を作れます。
              </p>
            </InfoBox>

            <p className="text-muted-foreground my-4 leading-relaxed">
              addon-a11y のパネルでは、コンポーネントに対する WCAG 準拠チェックの結果が
              リアルタイムに表示されます。以下はその出力イメージです。
            </p>

            <CodePreview previewOnly previewOnly
  code={`function A11yAddonPanel() {
  const violations = [
    { impact: 'critical', rule: 'color-contrast', desc: 'テキストのコントラスト比が 2.5:1 です（最低 4.5:1 が必要）', element: '<span class="light-text">', fix: 'テキスト色をより濃い色に変更するか、背景色を明るくしてください' },
    { impact: 'serious', rule: 'button-name', desc: 'アイコンのみのボタンにアクセシブルな名前がありません', element: '<button class="icon-btn">', fix: 'aria-label 属性を追加してボタンの目的を説明してください' },
  ];
  const passes = [
    { rule: 'aria-roles', desc: 'ARIA ロールが正しく使用されています' },
    { rule: 'image-alt', desc: 'すべての画像に代替テキストがあります' },
    { rule: 'heading-order', desc: '見出しの順序が正しいです' },
  ];
  const impactColors = { critical: { bg: '#fef2f2', border: '#fca5a5', text: '#dc2626', badge: '#dc2626' }, serious: { bg: '#fffbeb', border: '#fcd34d', text: '#d97706', badge: '#d97706' } };
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: '1px solid var(--border, #e0e0e0)', borderRadius: '8px', overflow: 'hidden' }}>
      {/* パネルタブ */}
      <div style={{ display: 'flex', gap: '2px', padding: '8px 12px', borderBottom: '1px solid var(--border, #e0e0e0)', background: 'var(--bg, #f8f8f8)', fontSize: '12px' }}>
        <span style={{ padding: '4px 10px', color: 'var(--text-muted, #888)' }}>Controls</span>
        <span style={{ padding: '4px 10px', color: 'var(--text-muted, #888)' }}>Actions</span>
        <span style={{ padding: '4px 10px', background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', borderRadius: '4px', fontWeight: 600 }}>Accessibility</span>
      </div>
      <div style={{ padding: '16px' }}>
        {/* Violations */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626' }}>Violations</span>
          <span style={{ background: '#fef2f2', color: '#dc2626', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px' }}>{violations.length}</span>
        </div>
        {violations.map((v, i) => {
          const c = impactColors[v.impact];
          return (
            <div key={i} style={{ background: c.bg, border: '1px solid ' + c.border, borderRadius: '6px', padding: '12px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ background: c.badge, color: '#fff', fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: '3px', textTransform: 'uppercase' }}>{v.impact}</span>
                <span style={{ fontWeight: 600, fontSize: '13px', color: c.text }}>{v.rule}</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text, #444)', margin: '0 0 6px', lineHeight: 1.5 }}>{v.desc}</p>
              <div style={{ fontSize: '11px', color: 'var(--text-muted, #888)', fontFamily: 'monospace', background: 'rgba(0,0,0,0.05)', padding: '4px 8px', borderRadius: '4px', marginBottom: '6px' }}>{v.element}</div>
              <p style={{ fontSize: '11px', color: c.text, margin: 0 }}>修正方法: {v.fix}</p>
            </div>
          );
        })}
        {/* Passes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '16px 0 8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#16a34a' }}>Passes</span>
          <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px' }}>{passes.length}</span>
        </div>
        {passes.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#f0fdf4', borderRadius: '6px', marginBottom: '4px' }}>
            <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '12px' }}>✓</span>
            <span style={{ fontSize: '12px', color: 'var(--text, #444)' }}><strong>{p.rule}</strong>: {p.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`}
  title="Addon パネルのイメージ"
  language="tsx"
/>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">@storybook/addon-viewport（レスポンシブプレビュー）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ストーリーの表示領域を iPhone、iPad、デスクトップなどの画面サイズに切り替えられます。
              <code>addon-essentials</code> に含まれているため、通常は追加インストール不要です。
              カスタムのビューポートサイズを設定することもできます。
            </p>

            <CodeBlock
              language="ts"
              title=".storybook/preview.ts - カスタムビューポートの設定"
              showLineNumbers
              code={`import type { Preview } from '@storybook/react';

const customViewports = {
  iPhoneSE: {
    name: 'iPhone SE',
    styles: { width: '375px', height: '667px' },
  },
  iPhone14Pro: {
    name: 'iPhone 14 Pro',
    styles: { width: '393px', height: '852px' },
  },
  iPadMini: {
    name: 'iPad mini',
    styles: { width: '768px', height: '1024px' },
  },
  laptop: {
    name: 'Laptop',
    styles: { width: '1366px', height: '768px' },
  },
  desktop: {
    name: 'Desktop',
    styles: { width: '1920px', height: '1080px' },
  },
};

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: customViewports,
    },
  },
};

export default preview;`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">@storybook/addon-measure（CSS レイアウト計測）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              コンポーネントの margin、padding、サイズをブラウザの DevTools のように
              視覚的にオーバーレイ表示します。<code>addon-essentials</code> に含まれています。
              デザイナーとの「この余白は何px？」のやりとりが不要になります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">@storybook/addon-backgrounds（背景色切替）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ストーリーの背景色をワンクリックで切り替えられます。
              白背景のコンポーネントをダーク背景で確認したり、
              透明背景のアイコンを異なる背景色で視認性を確認できます。
              <code>addon-essentials</code> に含まれています。
            </p>

            <CodeBlock
              language="ts"
              title="カスタム背景色の設定"
              showLineNumbers
              code={`const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a2e' },
        { name: 'gray', value: '#f3f4f6' },
        { name: 'brand', value: '#3b82f6' },
      ],
    },
  },
};`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">storybook-addon-pseudo-states（hover/focus/active 表示）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ボタンの hover 状態や input の focus 状態など、
              通常はマウス操作が必要な擬似クラスの状態を強制的に表示できます。
              インタラクション前後のスタイルを一覧で確認したい場合に便利です。
            </p>

            <CodeBlock
              language="bash"
              title="インストール"
              code={`pnpm add -D storybook-addon-pseudo-states`}
            />

            <div className="mt-4">
              <CodeBlock
                language="tsx"
                title="擬似状態のストーリー例"
                showLineNumbers
                code={`import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

// hover 状態を強制表示
export const Hover: Story = {
  args: { children: 'ホバー状態' },
  parameters: {
    pseudo: { hover: true },
  },
};

// focus 状態を強制表示
export const Focus: Story = {
  args: { children: 'フォーカス状態' },
  parameters: {
    pseudo: { focus: true },
  },
};

// 複数の擬似状態を同時に表示
export const ActiveFocus: Story = {
  args: { children: 'アクティブ + フォーカス' },
  parameters: {
    pseudo: { active: true, focus: true },
  },
};`}
              />
            </div>

            <InfoBox type="success" title="Addons の選び方">
              <p>
                Addons は入れすぎると Storybook の起動が遅くなります。
                まずは addon-essentials（Controls, Viewport, Backgrounds, Measure, Actions, Docs）を使いこなし、
                必要に応じて a11y と pseudo-states を追加するのがおすすめです。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: カスタムテーマ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Storybook のカスタマイズ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Storybook の UI 自体のテーマをカスタマイズできます。
              ブランドカラーやロゴを設定して、チーム専用のコンポーネントカタログに仕上げましょう。
              社外に公開する場合やデザインシステムの顔としても重要です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">カスタムテーマの作成</h3>

            <CodeBlock
              language="ts"
              title=".storybook/customTheme.ts"
              showLineNumbers
              code={`import { create } from '@storybook/theming/create';

export default create({
  base: 'light',  // 'light' or 'dark' をベースに選択

  // ブランドカラー
  colorPrimary: '#3b82f6',
  colorSecondary: '#8b5cf6',

  // UI の背景色
  appBg: '#f8fafc',
  appContentBg: '#ffffff',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 8,

  // フォント
  fontBase: '"Inter", "Noto Sans JP", sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  // テキストカラー
  textColor: '#1e293b',
  textInverseColor: '#ffffff',
  textMutedColor: '#64748b',

  // ツールバー
  barTextColor: '#64748b',
  barSelectedColor: '#3b82f6',
  barBg: '#ffffff',
  barHoverColor: '#3b82f6',

  // ブランド情報
  brandTitle: 'My Design System',
  brandUrl: 'https://example.com',
  brandImage: '/logo.svg',  // public フォルダに配置
  brandTarget: '_self',
});`}
            />

            <div className="mt-4">
              <CodeBlock
                language="ts"
                title=".storybook/manager.ts - テーマの適用"
                showLineNumbers
                code={`import { addons } from '@storybook/manager-api';
import customTheme from './customTheme';

addons.setConfig({
  theme: customTheme,
  // サイドバーの設定
  sidebar: {
    showRoots: true,  // ルートレベルのグループを表示
  },
  // ツールバーの設定
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});`}
              />
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ダークテーマの例</h3>

            <CodeBlock
              language="ts"
              title=".storybook/customTheme.ts - ダークテーマ版"
              showLineNumbers
              code={`import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',

  colorPrimary: '#60a5fa',
  colorSecondary: '#a78bfa',

  appBg: '#0f172a',
  appContentBg: '#1e293b',
  appBorderColor: '#334155',
  appBorderRadius: 8,

  fontBase: '"Inter", "Noto Sans JP", sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  textColor: '#e2e8f0',
  textInverseColor: '#1e293b',
  textMutedColor: '#94a3b8',

  barTextColor: '#94a3b8',
  barSelectedColor: '#60a5fa',
  barBg: '#1e293b',

  brandTitle: 'My Design System (Dark)',
  brandUrl: 'https://example.com',
  brandImage: '/logo-dark.svg',
});`}
            />

            <p className="text-muted-foreground my-4 leading-relaxed">
              カスタムデコレーターを適用すると、同じコンポーネントの見た目がどのように変わるか見てみましょう。
              左がデコレーターなし、右がテーマプロバイダーデコレーターを適用した結果です。
            </p>

            <CodePreview previewOnly previewOnly
  code={`function DecoratorComparison() {
  const cardStyle = {
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid var(--border, #e0e0e0)',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  };
  const btnBase = { padding: '8px 20px', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px' }}>
      {/* デコレーターなし */}
      <div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted, #888)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>デコレーターなし</div>
        <div style={{ ...cardStyle, background: 'var(--bg-accent, #fff)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button style={{ ...btnBase, background: '#ddd', color: 'var(--text)' }}>Primary</button>
            <button style={{ ...btnBase, background: 'transparent', color: 'var(--text)', border: '1px solid #ccc' }}>Secondary</button>
            <p style={{ fontSize: '12px', color: 'var(--text-muted, #999)', margin: 0 }}>テーマ未適用: デフォルトのスタイル</p>
          </div>
        </div>
      </div>
      {/* デコレーターあり */}
      <div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted, #888)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ background: '#a6e3a1', color: '#1e1e2e', borderRadius: '3px', padding: '1px 6px', fontSize: '10px' }}>Decorator</span>
          テーマプロバイダー適用
        </div>
        <div style={{ ...cardStyle, background: '#1e293b', borderColor: '#334155' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button style={{ ...btnBase, background: '#3b82f6', color: '#fff' }}>Primary</button>
            <button style={{ ...btnBase, background: 'transparent', color: '#e2e8f0', border: '1px solid #475569' }}>Secondary</button>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>テーマ適用済: ダークテーマのスタイル</p>
          </div>
        </div>
      </div>
    </div>
  );
}`}
  title="カスタム Decorator の効果"
  language="tsx"
/>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">カスタム Vite 設定</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Storybook の Vite ビルド設定をカスタマイズするには、
              <code>main.ts</code> の <code>viteFinal</code> を使います。
              エイリアス、プラグイン、環境変数などをアプリと同じ設定にできます。
            </p>

            <CodeBlock
              language="ts"
              title=".storybook/main.ts - Vite のカスタマイズ"
              showLineNumbers
              code={`import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // パスエイリアスの設定（アプリの tsconfig と合わせる）
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
    };

    // 環境変数の定義
    config.define = {
      ...config.define,
      'process.env.STORYBOOK': JSON.stringify(true),
    };

    return config;
  },
};

export default config;`}
            />

            <InfoBox type="warning" title="パスエイリアスの一致に注意">
              <p>
                アプリの <code>tsconfig.json</code> で設定したパスエイリアス（<code>@/</code> など）は、
                Storybook では自動的に反映されません。
                <code>viteFinal</code> で同じエイリアスを設定する必要があります。
                エイリアスが不一致だと「Module not found」エラーになります。
              </p>
            </InfoBox>
          </section>

          {/* セクション 3: テストとの連携 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">開発環境とのテスト連携</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Storybook は単なるコンポーネントカタログではなく、テスト基盤としても活用できます。
              ストーリーをそのままテストケースとして再利用することで、テストの作成コストを大幅に削減できます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">HMR 連携（コード変更の即座反映）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Storybook は Vite の HMR（Hot Module Replacement）をサポートしています。
              コンポーネントのコードを変更すると、ブラウザをリロードせずに
              ストーリーの表示が即座に更新されます。特別な設定は不要です。
            </p>

            <CodeBlock
              language="text"
              title="HMR の動作イメージ"
              code={`1. Storybook を起動: pnpm storybook
2. ブラウザで Button のストーリーを表示
3. Button.tsx のスタイルを変更して保存
4. → ブラウザが自動更新され、変更が即座に反映

※ ストーリーファイル (.stories.tsx) の変更も即座に反映されます`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">@storybook/test-runner（テストランナー）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              test-runner は、すべてのストーリーが正常にレンダリングされるかを自動テストします。
              Playwright を使って実際のブラウザ上でテストを実行するため、
              レンダリングエラーやランタイムエラーを検出できます。
            </p>

            <CodeBlock
              language="bash"
              title="test-runner のセットアップ"
              code={`# インストール
pnpm add -D @storybook/test-runner

# Playwright のブラウザをインストール
npx playwright install --with-deps chromium`}
            />

            <div className="mt-4">
              <CodeBlock
                language="json"
                title="package.json - スクリプトの追加"
                code={`{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "test-storybook": "test-storybook",
    "test-storybook:ci": "test-storybook --ci"
  }
}`}
              />
            </div>

            <div className="mt-4">
              <CodeBlock
                language="bash"
                title="テストの実行"
                code={`# Storybook が起動中であることを確認
pnpm storybook  # 別ターミナルで

# テスト実行
pnpm test-storybook

# 出力例:
# PASS src/components/Button/Button.stories.tsx
#   Button
#     ✓ Primary (120 ms)
#     ✓ Secondary (98 ms)
#     ✓ Disabled (105 ms)
# PASS src/components/Card/Card.stories.tsx
#   Card
#     ✓ Default (115 ms)
#     ✓ WithImage (130 ms)
#
# Test Suites: 12 passed, 12 total
# Tests:       38 passed, 38 total`}
              />
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Storybook と Vitest の連携</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Storybook 8 では、ストーリーを Vitest のテストケースとして直接インポートできます。
              <code>@storybook/experimental-addon-test</code> を使うと、
              ストーリーで定義した play 関数をそのままテストとして実行できます。
            </p>

            <CodeBlock
              language="bash"
              title="Vitest 連携のセットアップ"
              code={`pnpm add -D @storybook/experimental-addon-test vitest @vitest/browser`}
            />

            <div className="mt-4">
              <CodeBlock
                language="tsx"
                title="ストーリーをテストとして活用する例"
                showLineNumbers
                code={`// src/components/LoginForm/LoginForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import LoginForm from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Components/LoginForm',
  component: LoginForm,
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // メールアドレスを入力
    const emailInput = canvas.getByLabelText('メールアドレス');
    await userEvent.type(emailInput, 'test@example.com');

    // パスワードを入力
    const passwordInput = canvas.getByLabelText('パスワード');
    await userEvent.type(passwordInput, 'password123');

    // ログインボタンをクリック
    const submitButton = canvas.getByRole('button', { name: 'ログイン' });
    await userEvent.click(submitButton);

    // バリデーションエラーが表示されないことを確認
    await expect(canvas.queryByText('入力エラー')).not.toBeInTheDocument();
  },
};

export const ValidationError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 空のまま送信
    const submitButton = canvas.getByRole('button', { name: 'ログイン' });
    await userEvent.click(submitButton);

    // エラーメッセージが表示されることを確認
    await expect(canvas.getByText('メールアドレスを入力してください')).toBeInTheDocument();
  },
};`}
              />
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">MSW（Mock Service Worker）で API をモック</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              API 通信を行うコンポーネントを Storybook で表示するには、
              MSW を使ってブラウザレベルで API レスポンスをモックします。
              ネットワークリクエストを Service Worker で傍受し、定義したレスポンスを返します。
            </p>

            <CodeBlock
              language="bash"
              title="MSW のセットアップ"
              code={`# インストール
pnpm add -D msw msw-storybook-addon

# Service Worker ファイルを生成
npx msw init public/ --save`}
            />

            <div className="mt-4">
              <CodeBlock
                language="ts"
                title=".storybook/preview.ts - MSW の初期化"
                showLineNumbers
                code={`import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';

// MSW を初期化
initialize();

const preview: Preview = {
  // MSW のローダーを設定
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;`}
              />
            </div>

            <div className="mt-4">
              <CodeBlock
                language="tsx"
                title="API モックを使ったストーリー"
                showLineNumbers
                code={`import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import UserProfile from './UserProfile';

const meta: Meta<typeof UserProfile> = {
  title: 'Components/UserProfile',
  component: UserProfile,
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

// 正常系: ユーザーデータが取得できた場合
export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/user/1', () => {
          return HttpResponse.json({
            id: 1,
            name: '田中太郎',
            email: 'tanaka@example.com',
            avatar: 'https://i.pravatar.cc/150?img=1',
          });
        }),
      ],
    },
  },
};

// ローディング状態
export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/user/1', async () => {
          // 意図的に応答を遅延させてローディング状態を表示
          await new Promise((resolve) => setTimeout(resolve, 999999));
          return HttpResponse.json({});
        }),
      ],
    },
  },
};

// エラー状態
export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/user/1', () => {
          return new HttpResponse(null, { status: 500 });
        }),
      ],
    },
  },
};`}
              />
            </div>

            <InfoBox type="info" title="MSW のメリット">
              <p>
                MSW はブラウザの Service Worker レベルで動作するため、
                fetch や axios などの HTTP クライアントの種類に関係なくモックできます。
                ストーリーごとに異なるレスポンスを定義できるので、
                正常系・エラー系・ローディング中など、あらゆる状態のコンポーネントを表示できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: Composition */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Composition（複数 Storybook の統合）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              大規模なプロジェクトやモノレポ構成では、複数のパッケージがそれぞれ独自の
              Storybook を持つことがあります。Composition を使えば、
              1 つの Storybook から他の Storybook のストーリーを参照できます。
            </p>

            <CodeBlock
              language="ts"
              title=".storybook/main.ts - Composition の設定"
              showLineNumbers
              code={`import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // 他の Storybook を統合
  refs: {
    // デザインシステムの Storybook
    'design-system': {
      title: 'Design System',
      url: 'https://design-system.example.com/storybook',
    },
    // 共通コンポーネントの Storybook
    'shared-ui': {
      title: 'Shared UI',
      url: 'https://shared-ui.example.com/storybook',
    },
  },
};

export default config;`}
            />

            <InfoBox type="info" title="Composition のユースケース">
              <p>
                Composition は以下のような場面で活用されます:
                (1) デザインシステムチームと各プロダクトチームの Storybook を統合
                (2) モノレポ内の複数パッケージのコンポーネントを横断的に参照
                (3) マイクロフロントエンドの各チームの Storybook を1か所で閲覧。
                参照先の Storybook は公開 URL が必要です（Chromatic や GitHub Pages でデプロイ済みのもの）。
              </p>
            </InfoBox>

            <p className="text-muted-foreground my-4 leading-relaxed">
              MDX ファイルを使うと、Markdown のドキュメントと実際のコンポーネントを
              1つのページにまとめて表示できます。以下はその表示イメージです。
            </p>

            <CodePreview previewOnly previewOnly
  code={`function MdxDocPreview() {
  const btnStyle = { padding: '8px 20px', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' };
  return (
    <div style={{ padding: '32px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: '640px', color: 'var(--text, #333)' }}>
      <div style={{ fontSize: '11px', color: '#ff4785', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Docs / Components / Button</div>
      <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px', color: 'var(--text, #1a1a1a)' }}>Button</h1>
      <p style={{ fontSize: '15px', color: 'var(--text-muted, #666)', lineHeight: 1.7, margin: '0 0 20px' }}>
        アプリケーション全体で使用する汎用ボタンコンポーネントです。
        <code style={{ background: 'var(--bg, #f0f0f0)', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>primary</code>,
        <code style={{ background: 'var(--bg, #f0f0f0)', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>secondary</code>,
        <code style={{ background: 'var(--bg, #f0f0f0)', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>danger</code> の3バリエーションがあります。
      </p>
      <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 12px', color: 'var(--text, #1a1a1a)' }}>バリエーション</h2>
      {/* ライブコンポーネント表示エリア */}
      <div style={{ border: '1px solid var(--border, #e0e0e0)', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{ padding: '24px', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-accent, #fafafa)' }}>
          <button style={{ ...btnStyle, background: '#3b82f6', color: '#fff' }}>Primary</button>
          <button style={{ ...btnStyle, background: 'transparent', color: 'var(--text, #333)', border: '1px solid var(--border, #ccc)' }}>Secondary</button>
          <button style={{ ...btnStyle, background: '#ef4444', color: '#fff' }}>Danger</button>
        </div>
        <div style={{ borderTop: '1px solid var(--border, #e0e0e0)', padding: '8px 12px', background: 'var(--bg, #f8f8f8)', fontSize: '11px', color: 'var(--text-muted, #888)' }}>
          <span style={{ fontFamily: 'monospace' }}>{'<Button variant="primary" />'}</span>
        </div>
      </div>
      <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 12px', color: 'var(--text, #1a1a1a)' }}>Props</h2>
      {/* Props テーブル */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border, #e0e0e0)' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: 'var(--text, #333)' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: 'var(--text, #333)' }}>Type</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: 'var(--text, #333)' }}>Default</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'variant', type: '"primary" | "secondary" | "danger"', def: '"primary"' },
            { name: 'size', type: '"sm" | "md" | "lg"', def: '"md"' },
            { name: 'disabled', type: 'boolean', def: 'false' },
            { name: 'onClick', type: '() => void', def: '-' },
          ].map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border, #eee)' }}>
              <td style={{ padding: '8px 12px' }}><code style={{ color: '#3b82f6', fontWeight: 600, fontSize: '12px' }}>{row.name}</code></td>
              <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted, #888)' }}>{row.type}</td>
              <td style={{ padding: '8px 12px', fontSize: '12px', color: 'var(--text-muted, #888)' }}>{row.def}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`}
  title="MDX ドキュメント風の表示"
  language="tsx"
/>
          </section>

          {/* セクション 5: Storybook 8 の最新機能 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Storybook 8 の主要な新機能</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Storybook 8 はパフォーマンスと開発者体験に大きな改善が加えられました。
              ここでは実務に影響のある主要な変更点を紹介します。
            </p>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">Vite ファーストの設計</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Storybook 8 は Vite をデフォルトのビルドツールとして採用。
                  起動時間とリビルド速度が大幅に改善されました。
                  Webpack も引き続きサポートされますが、新規プロジェクトでは Vite が推奨です。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">React Server Components 対応</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  RSC（React Server Components）のストーリーを作成できるようになりました。
                  実験的な機能ですが、Next.js の App Router で作られた
                  Server Components のプレビューが可能です。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">テスト機能の強化</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  <code>@storybook/test</code> パッケージに
                  Vitest の expect と Testing Library の機能が統合されました。
                  追加パッケージなしでインタラクションテストが書けます。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">SWC によるトランスパイル高速化</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Babel に代わって SWC をデフォルトのトランスパイラとして採用。
                  TypeScript / JSX のコンパイルが高速化されています。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">ビジュアルテストの統合</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Chromatic のビジュアルテストが Storybook の UI に直接統合されました。
                  Storybook のパネルから直接スナップショットの差分を確認できます。
                </p>
              </div>
            </div>

            <CodeBlock
              language="bash"
              title="Storybook 8 へのアップグレード"
              code={`# 自動マイグレーションツール
npx storybook@latest upgrade

# マイグレーション後のチェック
npx storybook doctor`}
            />
          </section>

          {/* セクション 6: パフォーマンス最適化 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">よくある疑問: Storybook を入れると開発が遅くならない？</h2>

            <div className="rounded-lg border border-border p-6 mb-6">
              <h3 className="font-bold text-foreground mb-3">
                「Storybook は便利そうだけど、ビルドが重くなったり開発速度に影響しませんか？」
              </h3>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                これは初心者がよく心配するポイントです。結論から言えば、
                Storybook はアプリのビルドとは完全に独立しているため、
                <strong>アプリのビルド速度には影響しません</strong>。
                Storybook 自体の起動速度もいくつかの最適化で改善できます。
              </p>

              <h4 className="font-semibold text-foreground mb-2 mt-4">パフォーマンス最適化のコツ</h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</span>
                  <div>
                    <p className="font-semibold text-foreground">stories のグロブパターンを絞る</p>
                    <p className="text-sm text-foreground/80">
                      <code>stories: ['../src/**/*.stories.tsx']</code> を
                      <code>stories: ['../src/components/**/*.stories.tsx']</code> に限定する。
                      不要なディレクトリをスキャンしないことで起動が速くなります。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</span>
                  <div>
                    <p className="font-semibold text-foreground">不要な Addons を外す</p>
                    <p className="text-sm text-foreground/80">
                      使っていない Addons がロードされると起動時間が伸びます。
                      addon-essentials は内部で複数の Addons をロードするため、
                      不要なものは個別にオフにできます。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</span>
                  <div>
                    <p className="font-semibold text-foreground">Lazy compilation を活用する</p>
                    <p className="text-sm text-foreground/80">
                      Storybook 8 + Vite では、表示中のストーリーだけをコンパイルする
                      Lazy compilation がデフォルトで有効です。
                      ストーリー数が多くても起動時間への影響を最小限に抑えます。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">4</span>
                  <div>
                    <p className="font-semibold text-foreground">TypeScript のプロジェクト参照を活用する</p>
                    <p className="text-sm text-foreground/80">
                      <code>tsconfig.json</code> で Storybook 用の設定を分離し、
                      型チェックの範囲を限定することで速度が改善します。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              language="ts"
              title="addon-essentials の個別設定"
              showLineNumbers
              code={`// .storybook/main.ts
const config: StorybookConfig = {
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        // 使わない Addons をオフにする
        actions: true,     // イベントログ（通常は必要）
        backgrounds: true, // 背景色切替
        controls: true,    // Props 操作パネル
        docs: true,        // ドキュメントページ
        measure: false,    // レイアウト計測（不要なら無効化）
        outline: false,    // CSS アウトライン（不要なら無効化）
        viewport: true,    // ビューポート切替
        toolbars: true,    // ツールバー
        // highlight は addon-essentials に含まれません
        // 必要な場合は @storybook/addon-highlight を別途追加
      },
    },
  ],
};`}
            />

            <InfoBox type="success" title="結論: Storybook は開発を加速する">
              <p>
                最初のセットアップには時間がかかりますが、
                一度整備すれば「コンポーネントの動作確認」「デザインレビュー」
                「インタラクションテスト」が格段に速くなります。
                特にチーム開発では「Storybook を見てください」の一言で
                コンポーネントの状態を共有できるメリットは計り知れません。
              </p>
            </InfoBox>
          </section>

          {/* セクション 7: 実践チェックリスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Storybook 応用チェックリスト</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              プロジェクトの成熟度に合わせて、以下を段階的に導入していきましょう。
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">最初に導入すべきもの</h3>
                <div className="space-y-2">
                  {[
                    'addon-essentials（デフォルトで含まれる）',
                    'addon-a11y（アクセシビリティ）',
                    'カスタムビューポート設定',
                    'パスエイリアスの設定',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-border flex-shrink-0" />
                      <p className="text-sm text-foreground/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">チームが慣れてから導入</h3>
                <div className="space-y-2">
                  {[
                    'カスタムテーマ（ブランディング）',
                    'MSW による API モック',
                    'test-runner / Vitest 連携',
                    'Composition（複数 Storybook 統合）',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-border flex-shrink-0" />
                      <p className="text-sm text-foreground/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <InfoBox type="info" title="Storybook は段階的に拡張できる">
              <p>
                最初から完璧な設定を目指す必要はありません。
                まずは基本の Addons でストーリーを書き、チームが使い慣れてきたら
                テスト連携やカスタマイズを追加していく。
                この「段階的な導入」が Storybook を長く活用するコツです。
              </p>
            </InfoBox>
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="MSW で API モックのストーリーを作ろう"
              description="ユーザープロフィールを表示するコンポーネントの Story を完成させてください。parameters.msw.handlers に GET /api/user のモックハンドラーを追加し、name と email を返すようにしましょう。"
              preview={true}
              initialCode={`function UserProfile() {
  // 本来は fetch で取得するデータをモックで再現
  const user = { name: '/* ここに名前 */', email: '/* ここにメール */' };
  return (
    <div style={{
      padding: '24px',
      border: '1px solid var(--border, #e0e0e0)',
      borderRadius: '12px',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      maxWidth: '320px',
    }}>
      <div style={{
        width: '48px', height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        marginBottom: '12px',
      }} />
      <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: 'var(--text, #333)' }}>
        {user.name}
      </h3>
      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted, #888)' }}>
        {user.email}
      </p>
    </div>
  );
}`}
              answer={`function UserProfile() {
  const user = { name: '田中太郎', email: 'tanaka@example.com' };
  return (
    <div style={{
      padding: '24px',
      border: '1px solid var(--border, #e0e0e0)',
      borderRadius: '12px',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      maxWidth: '320px',
    }}>
      <div style={{
        width: '48px', height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        marginBottom: '12px',
      }} />
      <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: 'var(--text, #333)' }}>
        {user.name}
      </h3>
      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted, #888)' }}>
        {user.email}
      </p>
    </div>
  );
}`}
              keywords={['name', 'email', '田中', 'tanaka', 'user.name', 'user.email']}
              hints={[
                'user オブジェクトの name に日本語の名前を入れましょう（例: "田中太郎"）',
                'email にはメールアドレスを入れましょう（例: "tanaka@example.com"）',
                'MSW の実際のコードでは http.get で URL をマッチさせ HttpResponse.json でレスポンスを返します',
              ]}
            />
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Interaction Tests - Storybook',
                  url: 'https://storybook.js.org/docs/writing-tests/interaction-testing',
                  description: 'play 関数によるインタラクションテスト',
                },
                {
                  title: 'Addons - Storybook',
                  url: 'https://storybook.js.org/docs/addons',
                  description: 'アドオンによる機能拡張',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
