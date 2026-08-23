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

const troubleshoot = [
  {
    symptom: "ワークフローがそもそも走らない",
    cause:
      "フォルダ名が .github/workflows か、on の条件（ブランチ・パス）を確認する。",
  },
  {
    symptom: "npm ci が package.json が無いと言う",
    cause: "最初の step に actions/checkout があるかを確認する。",
  },
  {
    symptom: "手元では通るのに CI だけ落ちる",
    cause: "Node のバージョン差・環境変数の有無・キャッシュ汚染を疑う。",
  },
  {
    symptom: "secrets が空になる",
    cause: "fork からの PR では secrets が渡らない。登録名のスペルも確認する。",
  },
];

export default function ReuseTroubleshoot() {
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
            再利用・最適化・トラブルシュート
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            同じ設定を複数のリポジトリやワークフローで使い回し、実行時間を削り、
            落ちたときに素早く原因へたどり着く——運用フェーズの技術をまとめます。
            この編の仕上げです。
          </p>
        </div>

        <WhyNowBox
          tags={["再利用", "composite", "最適化", "デバッグ", "セキュリティ"]}
        >
          <p>
            ワークフローは、増えるほど「同じことを何度も書いている」状態になります。
            再利用の仕組みを知ると、変更を 1 か所に集約できます。 また CI
            は毎日何度も走るため、数十秒の短縮でも積み重なると大きな差になります。
            そして落ちたとき——調べ方を知っているかどうかで、復旧の速さが変わります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              再利用ワークフロー（workflow_call）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>on: workflow_call</code> を持つワークフローは、他の
              ワークフローから<strong>呼び出せる部品</strong>になります。 共通の
              CI 手順を 1 本にまとめ、各リポジトリからは呼ぶだけにできます。
            </p>

            <figure className="my-6">
              <figcaption className="text-sm text-muted-foreground mb-3 font-medium">
                図: 同じ YAML をコピーして持つ場合と、1 本を共有する場合
              </figcaption>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-5">
                  <p className="text-sm font-bold text-red-800 dark:text-red-300 mb-3">
                    コピペ（修正が 3 か所に散る）
                  </p>
                  <div className="space-y-2">
                    {["repo A", "repo B", "repo C"].map((r) => (
                      <div
                        key={r}
                        className="flex items-center gap-2 rounded-lg bg-card border border-border px-3 py-2"
                      >
                        <span className="font-mono text-xs text-foreground">
                          {r}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground ml-auto">
                          ci.yml（全文コピー）
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-5">
                  <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-3">
                    再利用（修正は 1 か所だけ）
                  </p>
                  <div className="space-y-2">
                    {["repo A", "repo B", "repo C"].map((r) => (
                      <div
                        key={r}
                        className="flex items-center gap-2 rounded-lg bg-card border border-border px-3 py-2"
                      >
                        <span className="font-mono text-xs text-foreground">
                          {r}
                        </span>
                        <span className="font-mono text-xs text-primary ml-auto">
                          uses: reusable-ci.yml →
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/30 px-3 py-2">
                      <span className="font-mono text-xs font-bold text-primary">
                        reusable-ci.yml（共有 1 本）
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </figure>

            <CodeBlock
              language="yaml"
              title=".github/workflows/reusable-ci.yml（呼ばれる側）"
              code={`name: Reusable CI

on:
  workflow_call:
    inputs:
      node-version:
        type: string
        default: "20"

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ inputs.node-version }}
          cache: npm
      - run: npm ci
      - run: npm run lint && npm test && npm run build`}
            />

            <CodeBlock
              language="yaml"
              title=".github/workflows/ci.yml（呼ぶ側）"
              code={`name: CI
on: [push, pull_request]

jobs:
  call-ci:
    uses: ./.github/workflows/reusable-ci.yml
    with:
      node-version: "20"`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              合成アクション（composite action）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「checkout → setup-node → npm ci」のような、いつも同じ数 step の
              並びは<strong>合成アクション</strong>に切り出せます。
              ワークフロー全体ではなく、step の並びを 1 つのアクションとして
              再利用したいときに向いています。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/actions/setup/action.yml"
              code={`name: Setup
description: チェックアウトと Node セットアップと依存インストール
runs:
  using: composite
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: npm
    - run: npm ci
      shell: bash`}
            />

            <InfoBox
              type="info"
              title="再利用ワークフローと合成アクションの使い分け"
            >
              <strong>ジョブ丸ごと</strong>を共有したいなら再利用ワークフロー、
              <strong>step の並び</strong>を共有したいなら合成アクション、と
              分けて考えると迷いません。合成アクションの <code>run</code> には{" "}
              <code>shell</code> の指定が必須である点に注意します。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              実行時間を削る
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  キャッシュと path フィルタ
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  依存キャッシュで再取得を避け、<code>paths</code> で
                  無関係な変更（ドキュメントのみ等）では走らせない。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  concurrency で二重実行を止める
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  連続 push の古い実行を <code>cancel-in-progress</code> で
                  打ち切り、最新の 1 本だけを残す。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  timeout-minutes で暴走を止める
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ハングしたジョブが無料枠を食い潰す前に、上限時間で
                  自動的に打ち切る。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  マトリクスを絞る
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  全 OS × 全バージョンは組み合わせ爆発を招く。
                  代表的な組み合わせに絞る。
                </p>
              </div>
            </div>

            <CodeBlock
              language="yaml"
              title="timeout と path フィルタ"
              code={`on:
  push:
    paths-ignore:
      - "**.md"
      - "docs/**"

jobs:
  verify:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              落ちたときの調べ方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              失敗は Actions タブのログから追います。どの step で落ちたかは
              赤い印で分かります。それでも原因が見えないときは、
              デバッグログを有効にすると内部の詳細が出ます。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      症状
                    </th>
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      まず疑うところ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {troubleshoot.map((t) => (
                    <tr
                      key={t.symptom}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3 text-foreground font-medium align-top">
                        {t.symptom}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground align-top">
                        {t.cause}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="デバッグログとローカル実行">
              リポジトリ変数（Secrets and variables → Actions → Variables）に{" "}
              <code>ACTIONS_STEP_DEBUG</code> を <code>true</code> で登録して
              再実行すると、各 step の詳細ログが出ます。 また{" "}
              <code>nektos/act</code> を使うと、push する前に手元で
              ワークフローを試せます。ただし act はランナー環境を完全再現する
              わけではないため、仕様上は「ローカルで検証可能」でも、
              実測では本番ランナーと差が出ることがあります。最終確認は 実際の
              Actions で行うのが確実です。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              サードパーティのアクションを安全に使う
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>uses</code> でサードパーティのアクションを呼ぶとき、
              <code>@v4</code> のようなタグは後から中身が差し替わる可能性が
              あります。供給元を信頼しきれない場合は、コミット SHA で
              固定すると、指定した時点のコードに固定できます。
            </p>

            <CodeBlock
              language="yaml"
              title="タグ指定と SHA 固定"
              code={`# タグ指定（読みやすいが中身は変わりうる）
- uses: actions/checkout@v4

# SHA 固定（中身が変わらない・監査しやすい）
- uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 # v4.1.1`}
            />

            <Quiz
              question="複数のリポジトリで、まったく同じ CI ジョブ（checkout → 依存 → lint/test/build）を使い回したい。最も適した仕組みはどれ？"
              options={[
                { label: "matrix で全リポジトリを展開する" },
                {
                  label:
                    "on: workflow_call を持つ再利用ワークフローとして切り出す",
                  correct: true,
                },
                { label: "concurrency グループを共有する" },
                { label: "各リポジトリに YAML をコピーして貼る" },
              ]}
              explanation="ジョブ丸ごとを複数のワークフロー・リポジトリで共有するには、on: workflow_call を持つ再利用ワークフローが適しています。呼ぶ側は uses でそのワークフローを指定するだけになり、変更は 1 か所に集約できます。コピー&ペーストは一見早いですが、後から全箇所を直す手間と漏れを生みます。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手を動かす — 再利用ワークフローを呼ぶ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              共通 CI を切り出した <code>reusable-ci.yml</code> を、呼ぶ側から
              使う設定です。<code>___</code> を埋めてください。
            </p>

            <CodingChallenge
              preview
              previewType="terminal"
              title="再利用ワークフローの呼び出しを書こう"
              description="呼ぶ側は uses で別ワークフローを指定し、with で入力を渡します。"
              initialCode={`name: CI
on: [push, pull_request]
jobs:
  call-ci:
    ___: ./.github/workflows/reusable-ci.yml
    ___:
      node-version: "20"`}
              answer={`name: CI
on: [push, pull_request]
jobs:
  call-ci:
    uses: ./.github/workflows/reusable-ci.yml
    with:
      node-version: "20"`}
              hints={[
                "別のワークフローを呼び出すジョブレベルのキーは uses",
                "呼び出し先へ入力値を渡すキーは with",
              ]}
              keywords={["uses", "with"]}
            />
          </section>

          <section>
            <InfoBox type="success" title="GitHub Actions / CI/CD 編、修了">
              最初のワークフローから、トリガー制御・CI パイプライン・
              シークレットとデプロイ・再利用と最適化まで、GitHub Actions を
              一通り組み立てられるようになりました。次は実際のリポジトリで、
              小さな CI を 1 本置いてブランチ保護に紐づけるところから始めると、
              学んだことがそのまま日々の開発のガードレールになります。
            </InfoBox>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Reusing workflows",
                  url: "https://docs.github.com/actions/how-tos/reuse-automations/reuse-workflows",
                  description: "workflow_call による再利用ワークフローの作り方",
                },
                {
                  title: "Creating a composite action",
                  url: "https://docs.github.com/actions/tutorials/create-actions/create-a-composite-action",
                  description: "step の並びを再利用する合成アクション",
                },
                {
                  title: "Security hardening for GitHub Actions",
                  url: "https://docs.github.com/actions/reference/security/secure-use",
                  description: "権限の最小化・SHA 固定・secrets の守り方",
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
