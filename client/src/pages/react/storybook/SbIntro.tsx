import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function SbIntro() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 52</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Storybook とは</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Storybook は UI コンポーネントを「アプリの外」で個別に開発・テスト・ドキュメント化するためのツールです。
          エンジニアにとっての開発環境であり、デザイナーにとっての UI カタログであり、チーム全体にとっての共通言語になります。
        </p>

        <WhyNowBox tags={['Storybook', 'コンポーネントカタログ', 'UI ドキュメント', 'チーム協業']}>
          <p>
            React コンポーネントの作り方、Props の渡し方、CSS のスタイリングを学んできました。
            しかしコンポーネントが増えるにつれ、「あのボタン、どんな状態があったっけ？」「エラー時の見た目は？」
            といった確認作業が増えていきます。Storybook はこの問題を解決し、
            コンポーネントの全バリエーションを一覧・操作できる環境を提供します。
            デザイナーとエンジニアの認識ずれも、これで大幅に減らせます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: Storybook とは何か */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Storybook とは何か</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Storybook は、UI コンポーネントを「孤立した環境」で描画・操作できるオープンソースツールです。
              アプリ本体を起動しなくても、個々のコンポーネントを確認できます。
              3つの顔を持っています。
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">コンポーネントカタログ</h3>
                <p className="text-sm text-muted-foreground">
                  プロジェクト内の全コンポーネントを一覧表示。ボタン、カード、フォームなど、
                  どんなパーツがあるかをブラウザで確認できます。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">UI ドキュメント</h3>
                <p className="text-sm text-muted-foreground">
                  各コンポーネントの Props、使い方、バリエーションが自動的にドキュメント化されます。
                  新メンバーのオンボーディングにも最適です。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">開発環境</h3>
                <p className="text-sm text-muted-foreground">
                  ホットリロード付きで、コンポーネント単体を開発できます。
                  アプリ全体を動かす必要がないので、開発速度が上がります。
                </p>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="Storybook の世界観（イメージ）"
              code={`// アプリ本体の開発では、コンポーネントはページの中に埋め込まれている
// → 特定の状態を再現するのが大変（ログイン状態、エラー状態 etc.）

// Storybook では、コンポーネントを「1つだけ」取り出して表示できる
// → すべてのバリエーションを自由に切り替えて確認

// 例: Button コンポーネントの Story
export const Primary = {
  args: {
    variant: 'primary',
    label: '送信する',
  },
};

export const Disabled = {
  args: {
    variant: 'primary',
    label: '送信する',
    disabled: true,
  },
};

export const Loading = {
  args: {
    variant: 'primary',
    label: '送信中...',
    isLoading: true,
  },
};`}
            />
          </section>

          {/* セクション2: なぜ Storybook を使うべきか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">なぜ Storybook を使うべきか</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Storybook を導入するメリットは、立場によって異なります。
              それぞれの視点から見てみましょう。
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30">
                <h3 className="font-bold text-foreground mb-2">エンジニアの視点</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>コンポーネントを単独で開発できるので、依存関係に振り回されない</li>
                  <li>エッジケース（長いテキスト、空データ、エラー状態）を簡単にテストできる</li>
                  <li>Props の組み合わせを GUI で試せるので、動作確認が速い</li>
                  <li>リファクタリング時にビジュアルリグレッションを検出できる</li>
                </ul>
              </div>
              <div className="p-4 rounded-r-lg border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-950/30">
                <h3 className="font-bold text-foreground mb-2">デザイナーの視点</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>実装済みコンポーネントの「実物」を確認できる（Figma のモックではなく）</li>
                  <li>すべてのバリエーションが一覧になっているので、抜け漏れに気づきやすい</li>
                  <li>デザインレビューの効率が格段に上がる（URL を共有するだけ）</li>
                  <li>「こう実装されるはず」ではなく「こう実装されている」を確認できる</li>
                </ul>
              </div>
              <div className="p-4 rounded-r-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/30">
                <h3 className="font-bold text-foreground mb-2">チーム全体の視点</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>「このコンポーネント、すでにあるよ」という発見ができる（重複開発の防止）</li>
                  <li>新メンバーが既存コンポーネントを素早く把握できる</li>
                  <li>デザイナーとエンジニアの「認識ずれ」を最小化できる</li>
                  <li>コンポーネントの仕様が「生きたドキュメント」として常に最新を保つ</li>
                </ul>
              </div>
            </div>
          </section>

          {/* セクション3: 素朴な疑問 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">「普通に画面で確認すれば良くない？」</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              これは Storybook を初めて知った人が必ず抱く疑問です。
              確かに、ブラウザでアプリを動かせばコンポーネントは見えます。
              しかし、実際の開発現場ではそれだけでは不十分な場面が多々あります。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">確認したいこと</th>
                    <th className="text-left p-3 font-semibold text-foreground">アプリ画面で確認</th>
                    <th className="text-left p-3 font-semibold text-foreground">Storybook で確認</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3">ボタンの基本表示</td>
                    <td className="p-3">できる</td>
                    <td className="p-3">できる</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">エラー状態のフォーム</td>
                    <td className="p-3">わざとエラーを起こす必要あり</td>
                    <td className="p-3">Story で即座に確認</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">データ0件の一覧画面</td>
                    <td className="p-3">DB を空にする必要あり</td>
                    <td className="p-3">空配列の Props を渡すだけ</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">名前が100文字のユーザー</td>
                    <td className="p-3">テストデータの作成が必要</td>
                    <td className="p-3">args で長い文字列を渡すだけ</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">ローディング中の表示</td>
                    <td className="p-3">ネットワークを遅延させる</td>
                    <td className="p-3">isLoading: true を渡すだけ</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3">全コンポーネントの一覧</td>
                    <td className="p-3">全画面を巡回する必要あり</td>
                    <td className="p-3">サイドバーで一覧表示</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="Storybook が特に威力を発揮する場面">
              <ul className="list-disc pl-4 space-y-1">
                <li>共通コンポーネントライブラリの開発・管理</li>
                <li>複数チームで同じコンポーネントを共有するプロジェクト</li>
                <li>デザイナーがコードの実装結果を確認したい場面</li>
                <li>コンポーネントの Props が多く、組み合わせパターンが膨大な場合</li>
              </ul>
            </InfoBox>
          </section>

          {/* セクション4: Storybook が解決する問題 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Storybook が解決する4つの問題</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">1. コンポーネントの孤立確認</h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  アプリ内では、コンポーネントは親コンポーネント、ルーティング、認証状態、API レスポンスなど
                  多くの依存関係の中で動いています。Storybook ではこれらから切り離し、
                  コンポーネント単体の動作を確認できます。
                </p>
                <CodeBlock
                  language="tsx"
                  title="孤立した環境での確認"
                  code={`// アプリ内では UserProfile は認証状態やAPI呼び出しに依存している
// Storybook では、Props だけでコンポーネントを描画

// UserProfile.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { UserProfile } from './UserProfile';

const meta: Meta<typeof UserProfile> = {
  component: UserProfile,
};
export default meta;

type Story = StoryObj<typeof UserProfile>;

// 認証済みユーザー
export const LoggedIn: Story = {
  args: {
    user: {
      name: '田中太郎',
      email: 'tanaka@example.com',
      avatar: '/avatar.jpg',
    },
    isLoggedIn: true,
  },
};

// 未認証
export const LoggedOut: Story = {
  args: {
    user: null,
    isLoggedIn: false,
  },
};`}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">2. 状態バリエーションの網羅</h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  1つのコンポーネントが取りうるすべての状態を、Story として定義できます。
                  「この Props の組み合わせのとき、見た目はどうなる？」を網羅的に確認できます。
                </p>
                <CodeBlock
                  language="tsx"
                  title="バリエーションの網羅"
                  code={`// Alert コンポーネントの全バリエーション
export const Info: Story = {
  args: { type: 'info', message: '情報メッセージです' },
};

export const Success: Story = {
  args: { type: 'success', message: '保存しました' },
};

export const Warning: Story = {
  args: { type: 'warning', message: '入力内容を確認してください' },
};

export const Error: Story = {
  args: { type: 'error', message: 'エラーが発生しました' },
};

// エッジケースも Story として残せる
export const LongMessage: Story = {
  args: {
    type: 'info',
    message: 'とても長いメッセージがある場合の表示を確認します。'.repeat(5),
  },
};

export const WithCloseButton: Story = {
  args: {
    type: 'info',
    message: '閉じるボタン付き',
    dismissible: true,
  },
};`}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">3. ドキュメントの自動生成</h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  TypeScript の型定義やコメントから、Props の説明や使用例が自動的にドキュメント化されます。
                  Story を書くだけで、常に最新のドキュメントが維持されます。
                </p>
                <CodeBlock
                  language="tsx"
                  title="型からドキュメントが生成される"
                  code={`// コンポーネントの Props 型
interface ButtonProps {
  /** ボタンのスタイルバリアント */
  variant: 'primary' | 'secondary' | 'danger';
  /** ボタンのサイズ */
  size?: 'sm' | 'md' | 'lg';
  /** ボタンのラベルテキスト */
  label: string;
  /** 非活性状態にするか */
  disabled?: boolean;
  /** クリック時のコールバック */
  onClick?: () => void;
}

// ↑ この型定義から Storybook が自動的に:
// - Props の一覧表を生成
// - 型に応じた Controls（セレクトボックス、チェックボックス等）を生成
// - JSDoc コメントを説明文として表示`}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">4. インタラクションテスト</h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Storybook 8 では play 関数を使って、ユーザー操作のシミュレーションとアサーションが可能です。
                  「ボタンをクリックしたらモーダルが開く」といった動作の自動テストを Story に組み込めます。
                </p>
                <CodeBlock
                  language="tsx"
                  title="play 関数によるインタラクションテスト"
                  code={`import { within, userEvent, expect, fn } from '@storybook/test';

export const SubmitForm: Story = {
  args: {
    onSubmit: fn(), // モック関数
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // テキストフィールドに入力
    await userEvent.type(
      canvas.getByLabelText('名前'),
      '田中太郎'
    );

    // 送信ボタンをクリック
    await userEvent.click(canvas.getByRole('button', { name: '送信' }));

    // onSubmit が呼ばれたか確認
    await expect(args.onSubmit).toHaveBeenCalledWith({
      name: '田中太郎',
    });
  },
};`}
                />
              </div>
            </div>
          </section>

          {/* セクション5: デザイナーとエンジニアの協業 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デザイナーとエンジニアの協業ポイント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Storybook は「デザインと実装の橋渡し」として最も威力を発揮します。
              それぞれの役割で、Storybook をどう活用するかを見てみましょう。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">フェーズ</th>
                    <th className="text-left p-3 font-semibold text-foreground">デザイナー</th>
                    <th className="text-left p-3 font-semibold text-foreground">エンジニア</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">設計時</td>
                    <td className="p-3">Figma でコンポーネント設計</td>
                    <td className="p-3">Figma を見て Props の型を設計</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">実装中</td>
                    <td className="p-3">Storybook のプレビューを確認</td>
                    <td className="p-3">Story を書きながら実装</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">レビュー</td>
                    <td className="p-3">Storybook の URL で全バリエーションを確認</td>
                    <td className="p-3">フィードバックを受けて修正</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">保守</td>
                    <td className="p-3">既存コンポーネントの確認・再利用提案</td>
                    <td className="p-3">Chromatic で視覚的差分を検出</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="デザイナーの方へ">
              <p>
                Storybook はコードを書かなくても利用できます。
                エンジニアが Story を作成すれば、あなたはブラウザで URL を開くだけです。
                Controls パネルで Props を変更してリアルタイムに見た目を確認したり、
                Docs タブでコンポーネントの仕様書を閲覧できます。
                「コードはわからないけど、UI の確認はしたい」という方にこそ Storybook は便利です。
              </p>
            </InfoBox>
          </section>

          {/* セクション6: エコシステム概要 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Storybook のエコシステム</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Storybook 本体だけでなく、周辺ツールやアドオンが豊富に用意されています。
              主要なものを紹介します。
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">Addons（アドオン）</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Storybook の機能を拡張するプラグインです。公式・コミュニティ合わせて数百のアドオンがあります。
                </p>
                <CodeBlock
                  language="bash"
                  title="よく使われるアドオン"
                  code={`# Storybook 8 では多くのアドオンが最初から同梱されている

# 同梱済み（追加インストール不要）
# @storybook/addon-essentials に含まれるもの:
#   - Controls: Props を GUI で変更
#   - Actions: イベントハンドラの呼び出しをログ表示
#   - Viewport: レスポンシブプレビュー
#   - Backgrounds: 背景色の切り替え
#   - Docs: ドキュメント自動生成
#   - Measure: 要素間のスペーシング表示
#   - Outline: 要素のアウトライン表示

# 追加でよく使われるアドオン
pnpm add -D @storybook/addon-a11y         # アクセシビリティチェック
pnpm add -D @storybook/addon-designs      # Figma デザイン埋め込み
pnpm add -D storybook-dark-mode            # ダークモード切り替え`}
                />
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">Chromatic</h3>
                <p className="text-sm text-muted-foreground">
                  Storybook の開発元が提供する、ビジュアルリグレッションテストの SaaS サービスです。
                  PR ごとに UI のスクリーンショットを撮影し、前回との差分をピクセル単位で検出します。
                  「気づかないうちに見た目が崩れた」を防ぎます。無料プランもあります。
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">Figma 連携</h3>
                <p className="text-sm text-muted-foreground">
                  <code>@storybook/addon-designs</code> アドオンを使うと、
                  Story の横に Figma のデザインを埋め込んで表示できます。
                  実装とデザインを並べて比較でき、デザインレビューが効率化されます。
                  また、Storybook の Connect 機能により、Figma のコンポーネントと
                  Storybook の Story を直接リンクすることもできます。
                </p>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="Figma デザイン埋め込みの例"
              code={`// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    // Figma のデザインを Storybook に埋め込む
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xxx/Design-System?node-id=123:456',
    },
  },
};
export default meta;

// → Storybook の Design タブに Figma のデザインが表示される
// → 実装とデザインを並べて比較できる`}
            />
          </section>

          {/* セクション7: Storybook の画面構成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Storybook の画面構成</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Storybook の UI は大きく4つのエリアに分かれています。
              それぞれの役割を理解しておきましょう。
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-500 text-white flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">サイドバー（左側）</h3>
                    <p className="text-sm text-muted-foreground">
                      プロジェクト内のすべての Story がツリー構造で表示されます。
                      フォルダ階層はストーリーの <code>title</code> プロパティで決まります。
                      例えば <code>title: 'Components/Button'</code> なら、
                      「Components」フォルダの中に「Button」が表示されます。
                      検索ボックスでフィルタリングも可能です。
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Canvas（メイン領域）</h3>
                    <p className="text-sm text-muted-foreground">
                      選択した Story のコンポーネントが実際に描画される領域です。
                      コンポーネントは iframe 内でレンダリングされるため、
                      アプリ本体のスタイルの影響を受けません。
                      ツールバーには、ズーム、背景切り替え、ビューポートサイズの変更ボタンがあります。
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Controls パネル（下部アドオンパネル）</h3>
                    <p className="text-sm text-muted-foreground">
                      コンポーネントの Props をリアルタイムに変更できる GUI です。
                      TypeScript の型定義から自動生成されます。
                      string 型ならテキスト入力、boolean なら toggle スイッチ、
                      union 型ならセレクトボックスが表示されます。
                      デザイナーがコードを書かずにバリエーションを試せる、最も便利な機能の1つです。
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-sm">4</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Docs タブ</h3>
                    <p className="text-sm text-muted-foreground">
                      Canvas の横にある「Docs」タブをクリックすると、
                      コンポーネントのドキュメントページが表示されます。
                      Props の一覧テーブル、全 Story のプレビュー、
                      各 Story のソースコードが自動的にまとまった1ページになります。
                      MDX で追加の説明文を書くこともできます。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              language="text"
              title="Storybook の画面レイアウト（概略図）"
              code={`┌─────────────────────────────────────────────────────┐
│  Storybook                                    [Docs] [Canvas] │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ サイドバー │           Canvas                         │
│          │     （コンポーネントの描画領域）            │
│ ◆ Components │                                       │
│   ├─ Button  │    ┌─────────────────┐               │
│   │  ├─ Primary │ │   [ 送信する ]    │               │
│   │  ├─ Secondary│ └─────────────────┘               │
│   │  └─ Disabled │                                   │
│   ├─ Card    │                                       │
│   └─ Input   │                                       │
│          │──────────────────────────────────────────│
│ ◆ Pages │  Controls  Actions  Accessibility        │
│   └─ Home│  ┌────────────────────────────┐         │
│          │  │ variant: [primary ▼]        │         │
│  [検索]  │  │ label:   [送信する      ]   │         │
│          │  │ disabled: [ ] toggle        │         │
│          │  └────────────────────────────┘         │
└──────────┴──────────────────────────────────────────┘`}
            />

            <InfoBox type="info" title="画面レイアウトはカスタマイズ可能">
              <p>
                アドオンパネルの位置（下部 or 右側）やサイドバーの幅は設定で変更できます。
                また、<code>parameters.layout</code> で Canvas 内のコンポーネントの配置
                （centered / fullscreen / padded）も Story ごとに設定できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション8: Storybook のバージョンと対応フレームワーク */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Storybook 8 の特徴と対応フレームワーク</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              このマニュアルでは Storybook 8（2024年リリース）を前提に解説します。
              Storybook は React 専用ではなく、多くのフレームワークをサポートしています。
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">Storybook 8 の主な改善点</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>ビルド速度の大幅改善（SWC ベース）</li>
                  <li>React Server Components 対応</li>
                  <li>ビジュアルテストの組み込みサポート</li>
                  <li>モバイル UI の改善</li>
                  <li>依存関係の整理・軽量化</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">対応フレームワーク</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li><strong>React</strong>（Vite / Webpack / Next.js）</li>
                  <li>Vue 3</li>
                  <li>Angular</li>
                  <li>Svelte</li>
                  <li>Web Components</li>
                  <li>Ember, Preact, Solid など</li>
                </ul>
              </div>
            </div>

            <InfoBox type="success" title="このステップのまとめ">
              <ul className="list-disc pl-4 space-y-1">
                <li>Storybook はコンポーネントを孤立環境で開発・テスト・ドキュメント化するツール</li>
                <li>エンジニアだけでなく、デザイナーやチーム全体にとって有用</li>
                <li>アプリ画面では確認しにくいエッジケースや状態バリエーションを簡単に検証できる</li>
                <li>Chromatic や Figma 連携などのエコシステムが充実している</li>
                <li>次のステップでは、実際にプロジェクトへ Storybook を導入する手順を学びます</li>
              </ul>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Storybook 公式ドキュメント',
                  url: 'https://storybook.js.org/docs',
                  description: 'Storybook の包括的なガイド',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
