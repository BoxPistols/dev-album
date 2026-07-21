import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import PipelineDiagram from "@/components/PipelineDiagram";

export default function CiPractice() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            CI 実践：lint・test・build
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            React + TypeScript + Vite のプロジェクトを題材に、実用的な CI
            パイプラインを組み立てます。キャッシュで速くし、失敗した成果物を
            残し、そして「CI が通らないとマージできない」状態まで作ります。
          </p>
        </div>

        <WhyNowBox tags={["キャッシュ", "artifact", "ブランチ保護", "バッジ"]}>
          <p>
            CI は「書いて終わり」ではなく、
            <strong>速く・信頼でき・マージの条件になっている</strong>
            ところまで作って初めて機能します。遅い CI は待たれずに無視され、
            通らなくてもマージできる CI は「飾り」になります。
            このページでは、CI
            を実際のガードレールにするための設定をまとめて扱います。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              実用的な CI ワークフロー
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              型チェック・lint・テスト・ビルドを 1 ジョブで順に走らせます。
              <code>setup-node</code> の <code>cache: npm</code> を付けると、
              依存のダウンロードがキャッシュされ、2 回目以降が速くなります。
            </p>

            <PipelineDiagram
              caption="図: 1 つの検査ジョブが順に通す step"
              stages={[
                { label: "checkout", detail: "取得" },
                { label: "install", detail: "npm ci" },
                { label: "typecheck", detail: "tsc" },
                { label: "lint", detail: "eslint" },
                { label: "test", detail: "vitest" },
                { label: "build", detail: "vite", highlight: true },
              ]}
            />

            <CodeBlock
              language="yaml"
              title=".github/workflows/ci.yml"
              code={`name: CI

on:
  push:
    branches: [main]
  pull_request:

concurrency:
  group: ci-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: 依存をインストール
        run: npm ci

      - name: 型チェック
        run: npm run typecheck

      - name: Lint
        run: npm run lint

      - name: Unit テスト
        run: npm run test

      - name: ビルド
        run: npm run build`}
            />

            <InfoBox type="info" title="npm ci と npm install の違い">
              CI では <code>npm install</code> ではなく <code>npm ci</code>{" "}
              を使います。<code>npm ci</code> は <code>package-lock.json</code>{" "}
              の内容を厳密に再現し、
              <code>node_modules</code> を作り直します。 仕様上、
              <code>package.json</code> の <code>^1.2.3</code>{" "}
              は「範囲」ですが、実測でインストールされる版は lockfile で固定
              されます。CI で lockfile どおりに入れることで、 「手元と CI
              で依存の版が違う」事故を防げます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              キャッシュはなぜ効くのか、なぜ危ういのか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>cache: npm</code> は、内部で lockfile のハッシュを
              キーにして依存を保存・復元します。lockfile が変われば
              キーも変わり、新しい依存が取り直されます。
              自前でキャッシュを組むときも、この「キーに lockfile のハッシュを
              含める」原則は同じです。
            </p>

            <CodeBlock
              language="yaml"
              title="自前でキャッシュを組む場合のキー設計"
              code={`      - name: 依存キャッシュ
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: npm-\${{ runner.os }}-\${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            npm-\${{ runner.os }}-`}
            />

            <InfoBox
              type="warning"
              title="キャッシュは速さのためで、正しさは保証しない"
            >
              キーの設計を誤ると、古い依存を引いたまま緑のチェックが付くことが
              あります。仕様では「同じ入力なら同じ結果」ですが、実測では
              キャッシュ汚染で手元と結果がズレることがあります。
              おかしいと感じたら、キーを変える（バージョン接頭辞を足す）か、
              キャッシュを無効化して走らせ直すのが確実です。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              失敗した証拠を残す — アーティファクト
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              E2E テスト（Playwright など）が落ちたとき、スクリーンショットや
              レポートをダウンロードできると原因を追いやすくなります。
              <code>upload-artifact</code> で成果物を保存します。
              <code>if: failure()</code>{" "}
              を付けると、失敗したときだけ保存できます。
            </p>

            <CodeBlock
              language="yaml"
              title="E2E レポートを失敗時に保存"
              code={`      - name: E2E テスト
        run: npm run test:e2e

      - name: レポートを保存
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CI をマージの条件にする — ブランチ保護
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ワークフローを置くだけでは、CI
              が落ちてもマージはできてしまいます。 リポジトリの{" "}
              <strong>Settings → Branches</strong> で main に
              保護ルールを設定し、「ステータスチェックの成功を必須にする」を
              有効にすると、CI が緑にならない限りマージできなくなります。 これで
              CI が実際のガードレールになります。
            </p>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold text-foreground mb-3">設定の要点</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>
                    <strong>Require status checks to pass</strong> を有効にし、
                    CI ジョブ（例: verify）を必須チェックに指定する
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>
                    <strong>Require branches to be up to date</strong> で、 古い
                    main の上でのマージを防ぐ
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>
                    必要に応じて{" "}
                    <strong>Require a pull request before merging</strong>{" "}
                    でレビューを必須にする
                  </span>
                </li>
              </ul>
            </div>

            <InfoBox type="info" title="バッジで状態を見せる">
              README に CI の状態バッジを貼ると、リポジトリを開いた人が
              一目で「今 main が緑か」を確認できます。ワークフロー名を URL
              に含めた Markdown を README に貼るだけです。
            </InfoBox>

            <CodeBlock
              language="markdown"
              title="README.md に貼るバッジ"
              code={`![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)`}
            />
          </section>

          <section>
            <Quiz
              question="CI ワークフローを置いたのに、CI が失敗したままの PR がマージされてしまう。まず確認すべき設定はどれ？"
              options={[
                { label: "ワークフローの name を変更する" },
                {
                  label: "ブランチ保護でステータスチェックの成功を必須にする",
                  correct: true,
                },
                { label: "runs-on を macOS に変更する" },
                { label: "キャッシュを無効化する" },
              ]}
              explanation="ワークフローを置くだけでは、CI の結果はマージの可否に影響しません。Settings → Branches のブランチ保護で「Require status checks to pass」を有効にし、対象の CI ジョブを必須チェックに指定して初めて、CI が通らない限りマージできない状態になります。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手を動かす — キャッシュ付き CI を仕上げる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              依存キャッシュを有効にし、クリーンインストールでテストする
              ワークフローの <code>___</code> を埋めてください。
            </p>

            <CodingChallenge
              preview
              previewType="terminal"
              title="キャッシュ付き CI を完成させよう"
              description="setup-node のキャッシュを有効にし、依存を lockfile どおりに入れてテストします。"
              initialCode={`name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          ___: npm
      - name: Install
        run: npm ___
      - name: Test
        run: npm test`}
              answer={`name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install
        run: npm ci
      - name: Test
        run: npm test`}
              hints={[
                "setup-node で依存キャッシュを有効にするキーは cache",
                "lockfile どおりにクリーンインストールするコマンドは npm ci",
              ]}
              keywords={["cache", "ci"]}
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Building and testing Node.js",
                  url: "https://docs.github.com/actions/automating-builds-and-tests/building-and-testing-nodejs",
                  description:
                    "Node プロジェクトの CI 構成とキャッシュの公式ガイド",
                },
                {
                  title: "Storing workflow data as artifacts",
                  url: "https://docs.github.com/actions/using-workflows/storing-workflow-data-as-artifacts",
                  description: "テストレポートやビルド成果物の保存と保持期間",
                },
                {
                  title: "About protected branches",
                  url: "https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches",
                  description: "必須ステータスチェックとマージ条件の設定",
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
