import CodeBlock from "@/components/CodeBlock";
import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

export default function DesignQA() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 77
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          デザイン QA の自動化
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          実装がデザインと一致しているかを自動検証する仕組みを構築します。
          Chromatic による Visual Regression
          テスト、デザイナー参加型のレビューフロー、
          アクセシビリティの自動チェックまで、デザイン QA の全体像を扱います。
        </p>

        <WhyNowBox
          tags={[
            "Chromatic",
            "Visual Regression",
            "axe-core",
            "a11y",
            "GitHub Actions",
            "デザインQA",
          ]}
        >
          <p>
            コンポーネント駆動開発では、Story
            が「コンポーネントの仕様書」として機能します。 しかし Story
            があっても、デザインとの差分を人間が目視で確認し続けるのは現実的ではありません。
            ここでは Storybook の Story を活用して、デザイン QA
            を自動化する手法を学びます。 CI
            に組み込むことで、デザインの品質をコードレビューと同じレベルで維持できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: デザイン QA とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デザイン QA とは
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザイン QA（Quality Assurance）は、実装された UI
              がデザインカンプと一致しているかを検証するプロセスです。
              フロントエンド開発において、機能テスト（ロジックが正しいか）とは別に、
              「見た目がデザイン通りか」を確認する工程が必要になります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              手動確認の限界
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              従来のデザイン QA は、デザイナーまたは QA 担当者がブラウザと Figma
              を並べて目視確認する手法が主流でした。
              この方法には以下の問題があります。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                <strong>見落とし</strong>:
                微妙なピクセルのズレ、フォントウェイトの違い、余白の差異は人間の目では検出しにくい
              </li>
              <li>
                <strong>主観のばらつき</strong>:
                「許容範囲」の判断が担当者ごとに異なる
              </li>
              <li>
                <strong>時間コスト</strong>:
                全ページ・全状態を網羅的に確認すると膨大な時間がかかる
              </li>
              <li>
                <strong>リグレッション</strong>: 修正済みの UI
                が別の変更で再び崩れても気づきにくい
              </li>
            </ul>

            <InfoBox type="info" title="デザイン QA の自動化がもたらす効果">
              <p>
                自動化により「変更前後の差分」をピクセル単位で検出できるため、
                人間は「差分が意図的かどうか」の判断に集中できます。
                確認作業の時間は大幅に短縮され、見落としのリスクも低減します。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: Chromatic の仕組み */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Chromatic の仕組み
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Chromatic は Storybook
              のメンテナーが開発しているクラウドサービスで、 Visual Regression
              テストとデザインレビューの基盤を提供します。
              基本的な動作フローは以下の通りです。
            </p>

            <ol className="list-decimal list-inside space-y-2 text-foreground/80 mb-6">
              <li>Storybook の全 Story のスクリーンショットを自動取得する</li>
              <li>
                前回のビルド（ベースライン）と新ビルドのスクリーンショットをピクセル単位で比較する
              </li>
              <li>差分が検出された Story を一覧表示する</li>
              <li>
                レビュアーが差分を確認し、Accept（承認）または
                Reject（却下）を判定する
              </li>
              <li>GitHub PR のステータスチェックに結果を反映する</li>
            </ol>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              セットアップ
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Chromatic のセットアップは、npm
              パッケージをインストールしてプロジェクトトークンを指定するだけです。
              Storybook がすでに動作していれば、追加の設定はほぼ不要です。
            </p>

            <CodeBlock
              language="bash"
              title="Chromatic のインストールと初回実行"
              code={`# パッケージのインストール
npm install --save-dev chromatic

# 初回ビルド（ベースラインの作成）
npx chromatic --project-token=chpt_xxxxxxxxxxxxxxx

# package.json にスクリプトを追加
# "scripts": {
#   "chromatic": "chromatic --exit-zero-on-changes"
# }`}
            />

            <p className="text-foreground/80 mb-4 leading-relaxed">
              初回実行時はすべての Story がベースラインとして登録されます。
              2回目以降の実行で、ベースラインとの差分が検出されるようになります。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                --exit-zero-on-changes
              </code>{" "}
              オプションを付けると、 差分がある場合でも CI
              が失敗扱いにならず、レビューを待つ状態になります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              GitHub Actions との連携
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              PR を作成するたびに自動で Chromatic を実行し、差分検出結果を PR
              のステータスチェックに反映させます。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/workflows/chromatic.yml"
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
          fetch-depth: 0  # 差分比較のため全履歴を取得

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: \${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          exitZeroOnChanges: true
          autoAcceptChanges: main  # main ブランチは自動承認`}
            />

            <InfoBox type="warning" title="プロジェクトトークンの管理">
              <p>
                プロジェクトトークンは GitHub リポジトリの Secrets
                に登録します。 コードに直接記述してはいけません。 Chromatic
                の管理画面 &gt; Manage &gt; Configure
                からトークンを取得できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 3: Visual Regression テストの実践 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Visual Regression テストの実践
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Visual Regression テストを効果的に運用するには、
              テスト対象の選定、しきい値の調整、環境差異への対処が必要です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              テスト対象の選定
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              すべての Story をテスト対象にするか、主要なパスだけに絞るかは、
              プロジェクトの規模とビルド時間のトレードオフで決定します。
            </p>

            <CodeBlock
              language="tsx"
              title="Story 単位でのテスト対象制御"
              code={`// すべての Story をテスト対象にする（デフォルト）
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

// 特定の Story をスナップショットから除外する
export const AnimatedButton: StoryObj<typeof Button> = {
  args: { children: 'Animated' },
  parameters: {
    // アニメーションが毎回異なるため除外
    chromatic: { disableSnapshot: true },
  },
};

// 特定の viewport でテストする
export const ResponsiveCard: StoryObj<typeof Card> = {
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280],  // モバイル、タブレット、デスクトップ
    },
  },
};`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3">
              しきい値の設定
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Chromatic はデフォルトでピクセル単位の差分を検出します。
              Anti-aliasing
              やサブピクセルレンダリングの違いで意図しない差分が報告される場合、
              しきい値を調整して対処します。
            </p>

            <CodeBlock
              language="tsx"
              title="差分検出のしきい値設定"
              code={`// .storybook/preview.ts
const preview: Preview = {
  parameters: {
    chromatic: {
      // 差分しきい値: 0 は完全一致、0.063 はデフォルト
      diffThreshold: 0.063,
      // アニメーションを無効化してスナップショットを安定させる
      pauseAnimationAtEnd: true,
    },
  },
};

export default preview;`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3">
              フォントレンダリング差異への対処
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ローカル環境と CI
              環境（Ubuntu）でフォントのレンダリング結果が異なることがあります。
              これにより、コードを変更していないにもかかわらず差分が報告される場合があります。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>Web フォント（Google Fonts 等）を使用して環境差を吸収する</li>
              <li>
                Storybook の{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  preview-head.html
                </code>{" "}
                でフォントを事前読み込みする
              </li>
              <li>
                フォントが読み込まれるまでスナップショットの取得を遅延させる
              </li>
            </ul>

            <CodeBlock
              language="tsx"
              title="フォント読み込み待機の設定"
              code={`// .storybook/preview.ts
const preview: Preview = {
  parameters: {
    chromatic: {
      // フォント読み込みを待機（ms）
      delay: 500,
    },
  },
  // ローダーでフォント読み込みを保証
  loaders: [
    async () => {
      await document.fonts.ready;
      return {};
    },
  ],
};`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3">
              レスポンシブテスト
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Chromatic では Story ごとに複数の viewport を指定でき、 1 つの
              Story
              からモバイル・タブレット・デスクトップのスナップショットを一括取得できます。
            </p>

            <CodeBlock
              language="tsx"
              title="グローバル viewport 設定"
              code={`// .storybook/preview.ts
const preview: Preview = {
  parameters: {
    chromatic: {
      // プロジェクト全体のデフォルト viewport
      viewports: [375, 1280],
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '800px' } },
      },
    },
  },
};`}
            />

            <InfoBox type="info" title="スナップショット数とコスト">
              <p>
                Chromatic
                の無料プランには月間のスナップショット数に上限があります（5,000枚）。
                viewport を 3 つ指定すると、1 Story あたり 3
                枚のスナップショットを消費します。 テスト対象の Story 数と
                viewport 数のバランスを考慮して設定してください。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: デザイナーが参加する QA フロー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デザイナーが参加する QA フロー
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザイン QA は開発者だけの作業ではありません。
              デザイナーが直接差分を確認し、意図した変更かどうかを判断できるフローを構築します。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              Chromatic の UI レビュー
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Chromatic
              のレビュー画面では、変更前後のスクリーンショットを並べて比較できます。
              デザイナーに Chromatic のプロジェクトへのアクセス権を付与し、
              以下のフローで QA を実施します。
            </p>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                開発者が PR を作成すると、Chromatic が自動でビルドを実行する
              </li>
              <li>
                差分が検出されると、Chromatic
                のレビュー画面に差分一覧が表示される
              </li>
              <li>
                デザイナーが各差分を確認し、Accept（意図通り）または Request
                Changes（修正依頼）を選択する
              </li>
              <li>
                すべての差分が Accept されると、GitHub PR
                のステータスチェックが通過する
              </li>
            </ol>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              PR にスクリーンショットを自動添付する
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Chromatic を導入していない場合や、PR
              上でも視覚的な確認を行いたい場合は、 GitHub Actions
              でスクリーンショットを撮影して PR
              コメントに添付する方法もあります。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/workflows/screenshot.yml"
              code={`name: Screenshot

on:
  pull_request:
    branches: [main]

jobs:
  screenshot:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Storybook
        run: npm run build-storybook

      - name: Capture screenshots
        run: npx storycap --serverCmd "npx http-server storybook-static -p 6006" http://localhost:6006

      - name: Upload screenshots
        uses: actions/upload-artifact@v4
        with:
          name: screenshots
          path: __screenshots__/

      - name: Comment on PR
        uses: marocchino/sticky-pull-request-comment@v2
        with:
          header: screenshots
          message: |
            ## スクリーンショット
            Storybook のスクリーンショットを取得しました。
            [Artifacts](\${{ github.server_url }}/\${{ github.repository }}/actions/runs/\${{ github.run_id }}) からダウンロードできます。`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3">
              Figma との併用
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Figma の Dev Mode
              を使うと、デザインカンプのプロパティ（色、余白、フォントサイズ等）を
              数値で確認できます。Chromatic
              が「変更前後の差分」を検出するのに対し、 Figma
              は「デザインと実装の初回一致」を確認する用途に適しています。
              両者を組み合わせることで、初期実装と継続的な保守の両方をカバーできます。
            </p>

            <InfoBox type="info" title="レビュー権限の設計">
              <p>
                Chromatic のレビュー権限は「Developer」と「Reviewer」の 2
                種類があります。 デザイナーには Reviewer 権限を付与し、Accept /
                Reject の操作のみを許可します。
                これにより、ビルドの再実行やベースラインの強制更新といった操作を制限できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: Storybook Accessibility Addon */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Storybook Accessibility Addon
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザイン QA の範囲は見た目の一致だけではありません。
              アクセシビリティ（a11y）もデザイン品質の一部として自動検証します。
              Storybook の a11y addon は、axe-core エンジンを使用して 各 Story
              のアクセシビリティ違反を自動検出します。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              セットアップ
            </h3>

            <CodeBlock
              language="bash"
              title="a11y addon のインストール"
              code={`npm install --save-dev @storybook/addon-a11y`}
            />

            <CodeBlock
              language="tsx"
              title=".storybook/main.ts に追加"
              code={`// .storybook/main.ts
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',  // 追加
  ],
  framework: '@storybook/react-vite',
};

export default config;`}
            />

            <p className="text-foreground/80 mb-4 leading-relaxed">
              addon を追加すると、Storybook の各 Story
              のパネルに「Accessibility」タブが表示されます。
              タブを開くと、axe-core
              が検出した違反・警告・合格項目の一覧を確認できます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              検出できる項目
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                <strong>コントラスト比</strong>:
                テキストと背景色のコントラストが WCAG 基準を満たしているか
              </li>
              <li>
                <strong>ARIA 属性</strong>:
                ボタンやフォーム要素に適切なラベルが設定されているか
              </li>
              <li>
                <strong>フォーカス管理</strong>:
                キーボードで操作可能か、フォーカスインジケーターが表示されるか
              </li>
              <li>
                <strong>見出しの階層</strong>: h1 → h2 → h3 の順序が正しいか
              </li>
              <li>
                <strong>画像の代替テキスト</strong>: img 要素に alt
                属性が設定されているか
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              CI での a11y チェック
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Storybook のテストランナーと a11y addon を組み合わせると、 CI
              でアクセシビリティ違反を自動検出して PR をブロックできます。
            </p>

            <CodeBlock
              language="bash"
              title="テストランナーのインストール"
              code={`npm install --save-dev @storybook/test-runner axe-playwright`}
            />

            <CodeBlock
              language="tsx"
              title=".storybook/test-runner.ts"
              code={`import type { TestRunnerConfig } from '@storybook/test-runner';
import { injectAxe, checkA11y } from 'axe-playwright';

const config: TestRunnerConfig = {
  async preVisit(page) {
    // 各 Story の表示前に axe-core を注入
    await injectAxe(page);
  },
  async postVisit(page) {
    // Story の表示後に a11y チェックを実行
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};

export default config;`}
            />

            <CodeBlock
              language="yaml"
              title="GitHub Actions で a11y テストを実行"
              code={`name: Accessibility

on:
  pull_request:
    branches: [main]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Build Storybook
        run: npm run build-storybook

      - name: Run a11y tests
        run: |
          npx concurrently -k -s first -n "SB,TEST" \\
            "npx http-server storybook-static -p 6006 --silent" \\
            "npx wait-on http://localhost:6006 && npm run test-storybook"`}
            />

            <InfoBox type="warning" title="a11y 違反の優先度">
              <p>
                axe-core は違反を「critical」「serious」「moderate」「minor」の
                4 段階で分類します。
                すべての違反を一度に修正するのは現実的ではないため、 まず
                critical と serious を PR ブロック対象にし、 moderate
                以下は警告として段階的に対応する運用を推奨します。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              特定ルールの無効化
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              プロジェクトの事情で特定の a11y ルールを無効化する必要がある場合、
              Story 単位またはグローバルで設定できます。
            </p>

            <CodeBlock
              language="tsx"
              title="Story 単位での a11y ルール無効化"
              code={`export const DarkOverlay: StoryObj<typeof Modal> = {
  args: { open: true },
  parameters: {
    a11y: {
      config: {
        rules: [
          // 背景オーバーレイのコントラスト比を意図的にスキップ
          { id: 'color-contrast', enabled: false },
        ],
      },
    },
  },
};`}
            />
          </section>

          {/* Quiz 1 */}
          <Quiz
            question="Chromatic の Visual Regression テストで、アニメーションを含む Story が毎回差分として検出されてしまう場合、適切な対処法はどれですか？"
            options={[
              { label: "Chromatic のしきい値を 1.0 に設定して差分を無視する" },
              {
                label:
                  "chromatic: { disableSnapshot: true } でその Story をスナップショット対象から除外する",
                correct: true,
              },
              { label: "Story ファイル自体を削除する" },
              {
                label:
                  "GitHub Actions のワークフローからその Story を grep で除外する",
              },
            ]}
            explanation="アニメーションを含む Story は実行タイミングによってスクリーンショットが異なるため、parameters.chromatic.disableSnapshot: true で対象外にします。しきい値を 1.0 にすると他の Story の差分も検出されなくなり、テストの意味が失われます。Story を削除すると Storybook のカタログとしての価値も失われます。"
          />

          {/* Quiz 2 */}
          <Quiz
            question="Storybook の a11y addon と CI を連携する際、axe-playwright の checkA11y はどのタイミングで実行しますか？"
            options={[
              { label: "Storybook のビルド前（preVisit）" },
              {
                label: "Storybook の各 Story が表示された後（postVisit）",
                correct: true,
              },
              { label: "GitHub Actions のワークフローの最初のステップ" },
              { label: "npm install の直後" },
            ]}
            explanation="axe-core による a11y チェックは、Story がレンダリングされた後に実行する必要があります。test-runner の postVisit フックで checkA11y を呼び出すことで、各 Story の表示完了後にアクセシビリティを検証します。preVisit では axe-core の注入（injectAxe）を行います。"
          />

          {/* 参考リンク */}
          <ReferenceLinks
            links={[
              {
                title: "Chromatic - Visual testing for Storybook",
                url: "https://www.chromatic.com/docs/",
                description:
                  "Chromatic の公式ドキュメント。セットアップからチーム運用まで。",
              },
              {
                title: "Storybook Accessibility Addon",
                url: "https://storybook.js.org/addons/@storybook/addon-a11y",
                description:
                  "a11y addon の公式ページ。設定オプションとルールの一覧。",
              },
              {
                title: "axe-core Rules",
                url: "https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md",
                description: "axe-core が検出するルールの全一覧と説明。",
              },
              {
                title: "Storybook Test Runner",
                url: "https://storybook.js.org/docs/writing-tests/integrations/test-runner",
                description:
                  "テストランナーの公式ドキュメント。a11y テストとの連携方法。",
              },
            ]}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
