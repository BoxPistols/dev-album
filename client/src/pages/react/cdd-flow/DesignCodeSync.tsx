import CodeBlock from "@/components/CodeBlock";
import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

export default function DesignCodeSync() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 76</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          デザインとコードの自動同期
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Figma のデザイントークンをコードに自動反映し、実装済み UI を Figma
          に逆変換する。
          双方向の同期パイプラインを構築して、デザインとコードの乖離を構造的に排除する方法を解説します。
        </p>

        <WhyNowBox
          tags={[
            "Design Tokens",
            "Style Dictionary",
            "Token Studio",
            "generate_figma_design",
            "CI/CD",
            "Figma Variables",
          ]}
        >
          <p>
            デザイナーが Figma
            で色を変更したとき、エンジニアがコード上の値を手動で書き換える。
            エンジニアが実装した UI
            をデザイナーに確認してもらうとき、スクリーンショットを Slack
            に貼る。
            こうした手作業はプロジェクトの規模が大きくなるほど、伝達ミスとコストの原因になります。
            Design Tokens の CI/CD と Code-to-Figma の自動生成を導入すれば、
            デザインとコードの間の手作業を構造的に排除できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: 双方向同期の全体像 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              双方向同期の全体像
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザインとコードの同期には、2 つの方向があります。
              どちらか一方だけでは不十分で、プロジェクトのフェーズに応じて使い分ける必要があります。
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                    F
                  </div>
                  <span className="text-lg font-bold text-foreground">
                    &#8594;
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-sm">
                    C
                  </div>
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  Figma &#8594; Code（デザイン先行）
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  Figma で定義した Design Tokens（色、フォント、スペーシング）を
                  tokens.json として export し、CSS 変数や JS
                  定数に自動変換する。
                </p>
                <div className="space-y-1.5 text-sm text-foreground/80">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500">&#9679;</span>
                    <span>デザインシステムが先にある場合</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500">&#9679;</span>
                    <span>ブランドカラーやタイポグラフィの一括管理</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500">&#9679;</span>
                    <span>複数プロジェクトへのトークン配布</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-sm">
                    C
                  </div>
                  <span className="text-lg font-bold text-foreground">
                    &#8594;
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                    F
                  </div>
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  Code &#8594; Figma（実装先行）
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  実装済みの UI コンポーネントを Figma
                  の編集可能なレイヤーとして
                  自動生成する。スクリーンショットではなく、ベクターデータとして取り込む。
                </p>
                <div className="space-y-1.5 text-sm text-foreground/80">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>
                      0&#8594;1 フェーズでデザインが追いついていない場合
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>実装結果をデザイナーに共有してレビューを受ける</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&#9679;</span>
                    <span>プロトタイプをデザインツール上で再利用する</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-foreground/80 mb-4 leading-relaxed">
              この 2
              つのフローを組み合わせることで、デザインとコードの間に「一方通行のボトルネック」が生まれない体制を作ります。
              以降のセクションでは、それぞれのフローの具体的な実装方法を順に説明します。
            </p>

            <InfoBox type="info" title="手作業の排除が目的">
              <p>
                双方向同期の目的は「デザイナーとエンジニアの間の手作業を排除すること」です。
                色コードの手動コピー、フォントサイズの目視確認、スクリーンショットの貼り付け
                &#8212; これらの作業は全て自動化の対象です。
                手作業が残っている限り、伝達ミスとコストが必ず発生します。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: Figma → Code（Design Tokens CI/CD） */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Figma &#8594; Code: Design Tokens CI/CD
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Figma で定義した Design Tokens
              をコードに自動反映するパイプラインを構築します。
              全体のフローは以下の通りです。
            </p>

            {/* フロー図 */}
            <div className="rounded-xl border border-border bg-muted/30 p-6 mb-6">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Figma &#8594; Code パイプライン
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <div className="px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium">
                  Figma Variables
                </div>
                <span className="text-muted-foreground font-bold">&#8594;</span>
                <div className="px-3 py-2 rounded-lg bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 font-medium">
                  Token Studio
                </div>
                <span className="text-muted-foreground font-bold">&#8594;</span>
                <div className="px-3 py-2 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-medium">
                  tokens.json (GitHub)
                </div>
                <span className="text-muted-foreground font-bold">&#8594;</span>
                <div className="px-3 py-2 rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 font-medium">
                  Style Dictionary
                </div>
                <span className="text-muted-foreground font-bold">&#8594;</span>
                <div className="px-3 py-2 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-medium">
                  CSS 変数 / JS 定数
                </div>
              </div>
            </div>

            {/* ステップ 1: Figma Variables */}
            <h3 className="text-lg font-semibold text-foreground mb-3">
              1. Figma Variables で Design Tokens を定義する
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Figma の Variables
              機能を使って、プロジェクトで使用する色、フォントサイズ、スペーシングなどを定義します。
              Variables は Figma 内でコレクション単位で管理でき、モード（Light /
              Dark など）の切り替えにも対応しています。
            </p>

            <div className="rounded-lg border border-border p-5 mb-6">
              <h4 className="font-bold text-foreground mb-3">
                Figma Variables の設計例
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">
                        コレクション
                      </th>
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">
                        変数名
                      </th>
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">
                        Light
                      </th>
                      <th className="text-left py-2 font-semibold text-foreground">
                        Dark
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/80">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Colors</td>
                      <td className="py-2 pr-4 font-mono text-xs">
                        primary/500
                      </td>
                      <td className="py-2 pr-4">#2563EB</td>
                      <td className="py-2">#60A5FA</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Colors</td>
                      <td className="py-2 pr-4 font-mono text-xs">
                        background/default
                      </td>
                      <td className="py-2 pr-4">#FFFFFF</td>
                      <td className="py-2">#0F172A</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Colors</td>
                      <td className="py-2 pr-4 font-mono text-xs">
                        text/primary
                      </td>
                      <td className="py-2 pr-4">#1E293B</td>
                      <td className="py-2">#F1F5F9</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">Spacing</td>
                      <td className="py-2 pr-4 font-mono text-xs">
                        spacing/sm
                      </td>
                      <td className="py-2 pr-4" colSpan={2}>
                        8px
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Spacing</td>
                      <td className="py-2 pr-4 font-mono text-xs">
                        spacing/md
                      </td>
                      <td className="py-2 pr-4" colSpan={2}>
                        16px
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ステップ 2: Token Studio */}
            <h3 className="text-lg font-semibold text-foreground mb-3">
              2. Token Studio for Figma で tokens.json を GitHub に export
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <a
                href="https://tokens.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Token Studio for Figma
              </a>{" "}
              は、 Figma Variables を JSON 形式で export し、GitHub
              リポジトリに直接 push できるプラグインです。 Figma
              上でトークンを変更すると、自動的に Pull Request が作成されます。
            </p>

            <CodeBlock
              language="json"
              title="tokens/global.json - Token Studio が出力する JSON"
              code={`{
  "colors": {
    "primary": {
      "500": {
        "$value": "#2563EB",
        "$type": "color",
        "$description": "メインのブランドカラー"
      },
      "600": {
        "$value": "#1D4ED8",
        "$type": "color"
      }
    },
    "background": {
      "default": {
        "$value": "#FFFFFF",
        "$type": "color"
      }
    },
    "text": {
      "primary": {
        "$value": "#1E293B",
        "$type": "color"
      }
    }
  },
  "spacing": {
    "sm": {
      "$value": "8px",
      "$type": "dimension"
    },
    "md": {
      "$value": "16px",
      "$type": "dimension"
    },
    "lg": {
      "$value": "24px",
      "$type": "dimension"
    },
    "xl": {
      "$value": "32px",
      "$type": "dimension"
    }
  },
  "fontSizes": {
    "sm": {
      "$value": "14px",
      "$type": "dimension"
    },
    "base": {
      "$value": "16px",
      "$type": "dimension"
    },
    "lg": {
      "$value": "18px",
      "$type": "dimension"
    },
    "xl": {
      "$value": "20px",
      "$type": "dimension"
    }
  }
}`}
            />

            <InfoBox type="warning" title="Token Studio の GitHub 連携設定">
              <p>
                Token Studio の Pro プランでは、GitHub
                リポジトリとの直接連携がサポートされています。
                無料プランの場合は手動で JSON を export する必要があります。
                チームで運用する場合は、Pro プランの導入を検討してください。
                連携設定では、対象リポジトリ、ブランチ、出力先ディレクトリを指定します。
              </p>
            </InfoBox>

            {/* ステップ 3: Style Dictionary */}
            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">
              3. Style Dictionary で CSS 変数 / JS 定数に変換する
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <a
                href="https://styledictionary.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Style Dictionary
              </a>{" "}
              は Amazon が開発したトークン変換ツールです。 tokens.json
              を入力として、CSS カスタムプロパティ、SCSS 変数、JavaScript
              定数、TypeScript 型定義など、
              複数のフォーマットに一括変換できます。
            </p>

            <CodeBlock
              language="bash"
              title="Style Dictionary のインストール"
              code={`pnpm add -D style-dictionary`}
            />

            <CodeBlock
              language="js"
              title="style-dictionary.config.mjs - 変換設定"
              code={`import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  platforms: {
    // CSS カスタムプロパティとして出力
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/tokens/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    // TypeScript の定数として出力
    ts: {
      transformGroup: 'js',
      buildPath: 'src/styles/tokens/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'javascript/es6',
        },
      ],
    },
    // Tailwind CSS 用のテーマ拡張として出力
    tailwind: {
      transformGroup: 'js',
      buildPath: 'src/styles/tokens/',
      files: [
        {
          destination: 'tailwind-theme.js',
          format: 'javascript/module-flat',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();`}
            />

            <p className="text-foreground/80 mb-4 leading-relaxed">
              上記の設定で{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                pnpm style-dictionary build
              </code>{" "}
              を実行すると、 以下のようなファイルが生成されます。
            </p>

            <CodeBlock
              language="css"
              title="src/styles/tokens/variables.css - 生成された CSS 変数"
              code={`:root {
  /* Colors */
  --colors-primary-500: #2563EB;
  --colors-primary-600: #1D4ED8;
  --colors-background-default: #FFFFFF;
  --colors-text-primary: #1E293B;

  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* Font Sizes */
  --font-sizes-sm: 14px;
  --font-sizes-base: 16px;
  --font-sizes-lg: 18px;
  --font-sizes-xl: 20px;
}`}
            />

            <CodeBlock
              language="ts"
              title="src/styles/tokens/tokens.ts - 生成された TypeScript 定数"
              code={`export const ColorsPrimary500 = '#2563EB';
export const ColorsPrimary600 = '#1D4ED8';
export const ColorsBackgroundDefault = '#FFFFFF';
export const ColorsTextPrimary = '#1E293B';
export const SpacingSm = '8px';
export const SpacingMd = '16px';
export const SpacingLg = '24px';
export const SpacingXl = '32px';
export const FontSizesSm = '14px';
export const FontSizesBase = '16px';
export const FontSizesLg = '18px';
export const FontSizesXl = '20px';`}
            />

            {/* ステップ 4: GitHub Actions */}
            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">
              4. GitHub Actions で PR を自動生成する
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Token Studio が tokens.json を push したら、GitHub Actions で
              Style Dictionary のビルドを実行し、 生成された CSS / TS
              ファイルを含む Pull Request を自動作成します。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/workflows/design-tokens.yml"
              code={`name: Design Tokens Sync

on:
  push:
    paths:
      - 'tokens/**'
    branches:
      - main

jobs:
  build-tokens:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile

      # Style Dictionary でトークンをビルド
      - name: Build design tokens
        run: pnpm style-dictionary build

      # 変更がある場合のみ PR を作成
      - name: Check for changes
        id: changes
        run: |
          git diff --quiet src/styles/tokens/ || echo "changed=true" >> $GITHUB_OUTPUT

      - name: Create Pull Request
        if: steps.changes.outputs.changed == 'true'
        uses: peter-evans/create-pull-request@v6
        with:
          token: \${{ secrets.GITHUB_TOKEN }}
          commit-message: 'design tokens: Figma の変更を反映'
          title: 'Design Tokens の自動更新'
          body: |
            Figma で Design Tokens が更新されました。
            Style Dictionary で CSS 変数と TypeScript 定数を再生成しました。

            ## 変更内容
            - \\\`src/styles/tokens/variables.css\\\`
            - \\\`src/styles/tokens/tokens.ts\\\`
            - \\\`src/styles/tokens/tailwind-theme.js\\\`

            ## 確認事項
            - [ ] Storybook でコンポーネントの表示を確認
            - [ ] Chromatic でビジュアルリグレッションを確認
          branch: design-tokens/auto-update
          labels: design-tokens, automated`}
            />
          </section>

          {/* セクション 3: Code → Figma */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Code &#8594; Figma: generate_figma_design
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              逆方向のフロー &#8212; 実装済みの UI を Figma
              に取り込む方法を説明します。 Claude Code や VS Code から{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                generate_figma_design
              </code>{" "}
              ツールを使うと、 コードベースの UI を Figma
              の編集可能なレイヤーとして生成できます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              仕組み
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              generate_figma_design
              は、コンポーネントの構造とスタイル情報を解析し、 Figma
              のネイティブ要素（フレーム、テキスト、ベクター）として再構築します。
              スクリーンショットの画像貼り付けではなく、編集可能なデザインデータとして取り込む点が特徴です。
            </p>

            <div className="rounded-xl border border-border bg-muted/30 p-6 mb-6">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Code &#8594; Figma の変換プロセス
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      コンポーネントの構造解析
                    </p>
                    <p className="text-sm text-foreground/80">
                      JSX / TSX のコンポーネントツリーを解析し、DOM
                      構造を取得する
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      スタイル情報のキャプチャ
                    </p>
                    <p className="text-sm text-foreground/80">
                      CSS / Tailwind
                      のクラスを解決し、計算済みスタイル（色、サイズ、余白）を取得する
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Figma レイヤーとして生成
                    </p>
                    <p className="text-sm text-foreground/80">
                      Auto Layout
                      を適用したフレーム、編集可能なテキスト、コンポーネント分離された構造を生成する
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Figma ファイルに配置
                    </p>
                    <p className="text-sm text-foreground/80">
                      指定した Figma
                      ファイルのページに、生成したデザインを配置する
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              生成されるデザインの特徴
            </h3>
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-bold text-foreground mb-2 text-sm">
                  Auto Layout 対応
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Flexbox / Grid に対応するレイアウトが Auto Layout
                  として再現される。
                  デザイナーがリサイズしてもレイアウトが崩れない。
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-bold text-foreground mb-2 text-sm">
                  テキスト編集可能
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  テキスト要素はラスタライズされず、Figma
                  のテキストレイヤーとして生成される。
                  フォント、サイズ、行間をそのまま編集できる。
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-bold text-foreground mb-2 text-sm">
                  コンポーネント分離
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  React コンポーネントの境界が Figma のグループ /
                  コンポーネントとして分離される。
                  再利用可能な単位でデザインを管理できる。
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-bold text-foreground mb-2 text-sm">
                  スタイル忠実度
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  色、角丸、影、ボーダーなどのスタイルが Figma
                  のプロパティとして再現される。 CSS の値が直接 Figma
                  の設定にマッピングされる。
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              ユースケース
            </h3>
            <div className="rounded-lg border border-border p-5 mb-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-foreground mb-1 text-sm">
                    プロトタイプ共有
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    エンジニアが実装したコンポーネントを Figma に取り込み、
                    デザイナーがプロトタイプのフローに組み込む。 Figma
                    のプロトタイピング機能（インタラクション、トランジション）をそのまま使える。
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1 text-sm">
                    デザインレビュー
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    実装結果を Figma に配置し、元のデザインと並べて比較する。
                    Figma のコメント機能でフィードバックを受けられるため、
                    「スクリーンショットを Slack
                    に貼って確認」のフローが不要になる。
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1 text-sm">
                    0&#8594;1 フェーズ
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    デザインよりコードが先行するスタートアップの初期フェーズで、
                    エンジニアが作った UI をデザインアセットとして蓄積する。
                    後からデザインシステムを整備する際の起点として利用できる。
                  </p>
                </div>
              </div>
            </div>

            <CodeBlock
              language="ts"
              title="generate_figma_design の呼び出し例（Claude Code MCP）"
              code={`// Claude Code / VS Code から Figma MCP ツールを呼び出す例
// 実際の呼び出しは Claude Code のツール経由で行う

// 1. コンポーネントの説明をテキストで渡す
generate_figma_design({
  file_key: 'your-figma-file-key',
  title: 'Button コンポーネント',
  description: \`
    プライマリボタン。角丸 8px、高さ 40px。
    背景色 #2563EB、テキスト白。
    ホバー時に背景色が #1D4ED8 に変わる。
    disabled 時は opacity 0.5。
    アイコン付きバリアントあり。
  \`,
  page_name: 'Components / Buttons',
});

// 2. 実装コードを直接渡す
generate_figma_design({
  file_key: 'your-figma-file-key',
  title: 'Card レイアウト',
  description: \`
    以下の React コンポーネントを Figma デザインに変換してください:

    <Card className="p-6 rounded-xl border shadow-sm">
      <CardHeader>
        <Avatar src="/user.jpg" size={48} />
        <div>
          <h3 className="font-bold text-lg">ユーザー名</h3>
          <p className="text-sm text-muted-foreground">エンジニア</p>
        </div>
      </CardHeader>
      <CardBody>
        <p>カードの本文テキストがここに入ります。</p>
      </CardBody>
    </Card>
  \`,
  page_name: 'Components / Cards',
});`}
            />

            <InfoBox type="info" title="generate_figma_design の制約">
              <p>
                generate_figma_design
                はテキストベースの記述からデザインを生成するため、
                複雑なアニメーションやインタラクティブな状態の完全な再現は難しい場合があります。
                静的なレイアウトとスタイルの再現が主な用途です。 また、Figma の
                API キーと MCP サーバーの設定が必要です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: CI/CD パイプラインの実装例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CI/CD パイプラインの完全な実装例
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Design Tokens の変更から Storybook
              の更新、ビジュアルリグレッションテストまでを
              一貫して自動化するパイプラインの全体像を示します。
            </p>

            {/* パイプラインの流れ */}
            <div className="rounded-xl border border-border bg-muted/30 p-6 mb-6">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                CI/CD パイプライン全体フロー
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <span className="text-foreground/80">
                    tokens/ ディレクトリへの push を検知
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-8">
                  <span className="text-muted-foreground">&#8595;</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-violet-500 text-white flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <span className="text-foreground/80">
                    Style Dictionary でトークンをビルド
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-8">
                  <span className="text-muted-foreground">&#8595;</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <span className="text-foreground/80">
                    PR 作成（変更がある場合のみ）
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-8">
                  <span className="text-muted-foreground">&#8595;</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-green-500 text-white flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <span className="text-foreground/80">
                    Storybook をビルドして Chromatic に公開
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-8">
                  <span className="text-muted-foreground">&#8595;</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-red-500 text-white flex items-center justify-center font-bold text-xs">
                    5
                  </div>
                  <span className="text-foreground/80">
                    ビジュアルリグレッションテストの結果を PR にコメント
                  </span>
                </div>
              </div>
            </div>

            <CodeBlock
              language="yaml"
              title=".github/workflows/design-tokens-full.yml - 完全なパイプライン"
              code={`name: Design Tokens Full Pipeline

on:
  push:
    paths:
      - 'tokens/**'
    branches:
      - main

jobs:
  # ステップ 1: トークンのビルドと PR 作成
  build-and-pr:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    outputs:
      pr-number: \${{ steps.create-pr.outputs.pull-request-number }}
      has-changes: \${{ steps.changes.outputs.changed }}

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile

      # Style Dictionary でビルド
      - name: Build design tokens
        run: pnpm style-dictionary build

      # 差分チェック
      - name: Check for changes
        id: changes
        run: |
          git diff --quiet src/styles/tokens/ || echo "changed=true" >> $GITHUB_OUTPUT

      # PR 作成
      - name: Create Pull Request
        id: create-pr
        if: steps.changes.outputs.changed == 'true'
        uses: peter-evans/create-pull-request@v6
        with:
          token: \${{ secrets.GITHUB_TOKEN }}
          commit-message: 'design tokens: Figma の変更を反映'
          title: 'Design Tokens の自動更新'
          body: |
            Figma で Design Tokens が更新されました。

            ## 自動処理
            - Style Dictionary でトークンをビルド
            - Storybook と Chromatic でビジュアル検証
          branch: design-tokens/auto-update
          labels: design-tokens, automated

  # ステップ 2: Storybook ビルドと Chromatic
  visual-test:
    needs: build-and-pr
    if: needs.build-and-pr.outputs.has-changes == 'true'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          ref: design-tokens/auto-update
          fetch-depth: 0

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile

      # Storybook ビルド
      - name: Build Storybook
        run: pnpm build-storybook

      # Chromatic でビジュアルテスト
      - name: Chromatic
        id: chromatic
        uses: chromaui/action@latest
        with:
          projectToken: \${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          storybookBuildDir: storybook-static
          exitZeroOnChanges: true
          autoAcceptChanges: false

      # テスト結果を PR にコメント
      - name: Comment on PR
        if: needs.build-and-pr.outputs.pr-number
        uses: actions/github-script@v7
        with:
          script: |
            const prNumber = \${{ needs.build-and-pr.outputs.pr-number }};
            const storybookUrl = '\${{ steps.chromatic.outputs.storybookUrl }}';
            const buildUrl = '\${{ steps.chromatic.outputs.buildUrl }}';

            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: prNumber,
              body: [
                '## Chromatic ビジュアルテスト結果',
                '',
                \\\`- Storybook: \\\${storybookUrl}\\\`,
                \\\`- Chromatic Build: \\\${buildUrl}\\\`,
                '',
                'トークン変更による UI の差分を上記リンクで確認してください。',
              ].join('\\n'),
            });`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">
              package.json のスクリプト設定
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ローカル開発でもトークンビルドを実行できるよう、package.json
              にスクリプトを追加します。
            </p>

            <CodeBlock
              language="json"
              title="package.json - scripts 抜粋"
              code={`{
  "scripts": {
    "tokens:build": "style-dictionary build",
    "tokens:watch": "nodemon --watch tokens/ --ext json --exec 'pnpm tokens:build'",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "chromatic": "chromatic --project-token=$CHROMATIC_PROJECT_TOKEN"
  },
  "devDependencies": {
    "style-dictionary": "^4.0.0",
    "nodemon": "^3.1.0",
    "@storybook/react-vite": "^8.4.0",
    "chromatic": "^11.0.0"
  }
}`}
            />

            <InfoBox type="warning" title="Chromatic の無料枠">
              <p>
                Chromatic の無料プランでは、月 5,000
                スナップショットまで利用できます。 Design Tokens
                の変更は全コンポーネントのスナップショットに影響するため、
                頻繁にトークンを更新するプロジェクトでは、スナップショット数に注意が必要です。
                TurboSnap
                を有効にすると、変更の影響を受けるコンポーネントだけをテスト対象にできます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: 手作業の特定と自動化 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手作業が発生するポイントと回避策
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザインとコードの間で発生する典型的な手作業を列挙し、
              それぞれをどのツールで自動化するかを整理します。
            </p>

            <div className="rounded-lg border border-border overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                        手作業
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                        リスク
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground border-b border-border">
                        自動化ツール
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/80">
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">色コードの手動コピー</td>
                      <td className="py-3 px-4 text-red-600 dark:text-red-400">
                        タイプミスで微妙な色ズレが発生
                      </td>
                      <td className="py-3 px-4">
                        Token Studio + Style Dictionary
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">フォントサイズの目視確認</td>
                      <td className="py-3 px-4 text-red-600 dark:text-red-400">
                        14px と 16px の差に気付かない
                      </td>
                      <td className="py-3 px-4">Design Tokens + CSS 変数</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">スペーシングの計算</td>
                      <td className="py-3 px-4 text-red-600 dark:text-red-400">
                        余白の不一致が蓄積する
                      </td>
                      <td className="py-3 px-4">
                        Spacing トークン + Tailwind テーマ
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">スクリーンショットの共有</td>
                      <td className="py-3 px-4 text-red-600 dark:text-red-400">
                        古い画像が参照される
                      </td>
                      <td className="py-3 px-4">generate_figma_design</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">UI 差分の目視レビュー</td>
                      <td className="py-3 px-4 text-red-600 dark:text-red-400">
                        見落としが発生する
                      </td>
                      <td className="py-3 px-4">
                        Chromatic ビジュアルリグレッション
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">ダークモード対応の手動確認</td>
                      <td className="py-3 px-4 text-red-600 dark:text-red-400">
                        Light だけ確認して Dark が壊れる
                      </td>
                      <td className="py-3 px-4">
                        Figma Variables のモード + Chromatic
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              ツールチェーンの選定指針
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              全てのツールを一度に導入する必要はありません。
              プロジェクトの規模とチームの状況に応じて、段階的に導入していくのが現実的です。
            </p>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-green-500 text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h4 className="font-bold text-foreground">
                    最小構成（1-2 人チーム）
                  </h4>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Figma Variables を手動で tokens.json に export し、Style
                  Dictionary でビルドする。 CI/CD
                  は後から追加する。まずはトークンの一元管理を始めることが最優先。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h4 className="font-bold text-foreground">
                    標準構成（3-10 人チーム）
                  </h4>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Token Studio Pro で GitHub 連携を設定し、GitHub Actions
                  でトークンのビルドと PR 作成を自動化する。 Chromatic
                  を導入してビジュアルリグレッションテストを CI に組み込む。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-violet-500 text-white flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <h4 className="font-bold text-foreground">
                    フル構成（10 人以上 / 複数プロダクト）
                  </h4>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  上記に加え、generate_figma_design で Code &#8594; Figma
                  の逆変換も導入する。
                  複数プロダクト間でトークンを共有するパッケージとして配布し、
                  各プロダクトの Storybook を Composition で統合する。
                </p>
              </div>
            </div>

            <CodeBlock
              language="ts"
              title="style-dictionary.config.mjs - Dark モード対応の設定例"
              code={`import StyleDictionary from 'style-dictionary';

// Light モードのトークン
const sdLight = new StyleDictionary({
  source: ['tokens/light/**/*.json', 'tokens/global/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/tokens/',
      files: [
        {
          destination: 'light.css',
          format: 'css/variables',
          options: {
            selector: ':root, [data-theme="light"]',
            outputReferences: true,
          },
        },
      ],
    },
  },
});

// Dark モードのトークン
const sdDark = new StyleDictionary({
  source: ['tokens/dark/**/*.json', 'tokens/global/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/tokens/',
      files: [
        {
          destination: 'dark.css',
          format: 'css/variables',
          options: {
            selector: '[data-theme="dark"]',
            outputReferences: true,
          },
        },
      ],
    },
  },
});

await Promise.all([
  sdLight.buildAllPlatforms(),
  sdDark.buildAllPlatforms(),
]);`}
            />

            <CodeBlock
              language="css"
              title="生成される Light / Dark のトークン"
              code={`/* src/styles/tokens/light.css */
:root, [data-theme="light"] {
  --colors-primary-500: #2563EB;
  --colors-background-default: #FFFFFF;
  --colors-text-primary: #1E293B;
}

/* src/styles/tokens/dark.css */
[data-theme="dark"] {
  --colors-primary-500: #60A5FA;
  --colors-background-default: #0F172A;
  --colors-text-primary: #F1F5F9;
}`}
            />

            <InfoBox type="success" title="自動化の効果">
              <p>
                この仕組みを導入したチームでは、デザイン変更のコード反映にかかる時間が
                「数時間～数日」から「PR
                マージの数分」に短縮されたという報告があります。
                特にダークモード対応やマルチブランド対応のプロジェクトで、
                手作業の排除による品質向上の効果が顕著です。
              </p>
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <Quiz
            question="Token Studio for Figma が GitHub リポジトリに push する主なファイル形式は何ですか？"
            options={[
              { label: "CSS ファイル（.css）" },
              { label: "JSON ファイル（tokens.json）", correct: true },
              { label: "YAML ファイル（.yml）" },
              { label: "Figma のバイナリファイル（.fig）" },
            ]}
            explanation="Token Studio は Design Tokens を JSON 形式（tokens.json）で export します。この JSON を Style Dictionary などの変換ツールで CSS 変数や JavaScript 定数に変換するのが一般的なフローです。CSS や YAML に直接 export する機能はありません。"
          />

          {/* Quiz 2 */}
          <Quiz
            question="generate_figma_design で生成された Figma デザインの特徴として正しいものはどれですか？"
            options={[
              { label: "スクリーンショットの画像として貼り付けられる" },
              { label: "閲覧のみ可能で、編集はできない" },
              {
                label:
                  "Auto Layout が適用され、テキストも編集可能な状態で生成される",
                correct: true,
              },
              { label: "Figma のローカルファイルにのみ保存される" },
            ]}
            explanation="generate_figma_design は、スクリーンショットではなく Figma のネイティブ要素（フレーム、テキスト）として生成します。Auto Layout が適用されるためリサイズに対応し、テキストレイヤーとして生成されるため文言の編集もそのまま行えます。"
          />

          {/* リファレンスリンク */}
          <ReferenceLinks
            links={[
              {
                title: "Style Dictionary - Amazon",
                url: "https://styledictionary.com/",
                description:
                  "Design Tokens の変換ツール。tokens.json から CSS、JS、iOS、Android 向けの出力を生成する。",
              },
              {
                title: "Token Studio for Figma",
                url: "https://tokens.studio/",
                description:
                  "Figma Variables を JSON で export し、GitHub リポジトリに直接 push できるプラグイン。",
              },
              {
                title: "Chromatic - Visual Testing",
                url: "https://www.chromatic.com/",
                description:
                  "Storybook ベースのビジュアルリグレッションテストサービス。UI の差分を自動検出する。",
              },
              {
                title: "Design Tokens W3C Community Group",
                url: "https://design-tokens.github.io/community-group/format/",
                description:
                  "Design Tokens の標準フォーマット仕様。$value、$type などのプロパティ名の仕様を定義。",
              },
              {
                title: "Figma Variables - 公式ドキュメント",
                url: "https://help.figma.com/hc/en-us/articles/15339657135383",
                description:
                  "Figma Variables の作成と管理方法。コレクション、モード、スコープの設定を解説。",
              },
              {
                title: "peter-evans/create-pull-request",
                url: "https://github.com/peter-evans/create-pull-request",
                description:
                  "GitHub Actions で PR を自動生成するアクション。Design Tokens のパイプラインで使用。",
              },
            ]}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
