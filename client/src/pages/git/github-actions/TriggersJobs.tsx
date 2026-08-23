import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodingChallenge from "@/components/CodingChallenge";

export default function TriggersJobs() {
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
            トリガー・ジョブ・ステップの制御
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            「いつ走らせるか」を絞り込み、「どの順で走らせるか」を組み立てます。
            トリガーの条件、ジョブ間の依存、条件分岐、そして 1 つのジョブを
            複数条件へ展開するマトリクスまでを扱います。
          </p>
        </div>

        <WhyNowBox tags={["on", "needs", "if", "matrix", "concurrency"]}>
          <p>
            最小構成は「push で全部走る」でしたが、実運用では 「main への push
            のときだけデプロイ」「ドキュメントだけの変更では走らせない」
            といった絞り込みが必要になります。無駄なジョブを減らすことは、
            実行時間（＝料金と待ち時間）を減らすことに直結します。
            制御のキーを知っておくと、パイプラインを目的に合わせて設計できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              トリガーを絞り込む
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>on</code> には複数のイベントを並べられます。ブランチや
              変更パスで絞ると、必要なときだけ走らせられます。 手動実行の{" "}
              <code>workflow_dispatch</code> と、定期実行の{" "}
              <code>schedule</code> もよく使います。
            </p>

            <CodeBlock
              language="yaml"
              title="トリガーの絞り込み"
              code={`on:
  push:
    branches: [main]
    paths:
      - "src/**"
      - "package.json"
  pull_request:
    branches: [main]
  workflow_dispatch:      # Actions タブから手動で実行できる
  schedule:
    - cron: "0 0 * * 1"   # 毎週月曜 00:00 UTC に実行`}
            />

            <InfoBox type="warning" title="cron の既定は UTC。JST とは 9 時間ずれる">
              <code>schedule</code> の cron は<strong>既定で UTC</strong>で
              評価されます。日本時間の平日朝 9 時は UTC では同日 0 時に
              なるため <code>0 0 * * 1-5</code> で正しく表現できますが、
              JST 9 時より前の時刻を指定する場合は UTC では「前日」に
              ずれるため、曜日を 1 日前にずらす必要があります。 各
              schedule に <code>timezone</code>（IANA タイムゾーン文字列）を
              添えると、そのタイムゾーンで評価させることもできます。 仕様は
              「既定は UTC で解釈」ですが、 実測では「思ったより 9 時間早い /
              遅い」とズレて驚くことが多い箇所です。 加えて、GitHub
              全体の負荷が高い時刻は数分〜遅延することがあり、 cron
              は「おおよその時刻」と捉えるのが安全です。
            </InfoBox>

            <CodeBlock
              language="yaml"
              title="タイムゾーンを指定する（夏時間のある地域では繰り上がりに注意）"
              code={`on:
  schedule:
    - cron: "30 5 * * 1-5"
      timezone: "America/New_York"   # 指定したタイムゾーンで評価される`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ジョブの依存関係 — needs
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ジョブは既定で<strong>並列</strong>に走ります。順序を付けたい
              ときは <code>needs</code> で「このジョブは別のジョブの完了を待つ」
              と宣言します。下の例では、lint と test が並列に走り、
              両方が成功したときだけ build が走ります。
            </p>

            <CodeBlock
              language="yaml"
              title="needs で順序を付ける"
              code={`jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test

  build:
    needs: [lint, test]   # lint と test の両方が成功したら走る
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build`}
            />

            <MermaidDiagram
              title="図: needs による依存関係"
              chart={`flowchart LR
    L["lint"] --> B["build"]
    T["test"] --> B
    B --> D["deploy"]`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              条件分岐 — if
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ジョブや step は <code>if</code> で実行条件を付けられます。 「main
              への push のときだけデプロイする」のような分岐は、 コンテキスト（
              <code>github.ref</code> など）を参照して書きます。
            </p>

            <CodeBlock
              language="yaml"
              title="main への push のときだけ deploy"
              code={`jobs:
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - uses: actions/checkout@v4
      - run: ./scripts/deploy.sh`}
            />

            <InfoBox type="info" title="コンテキストと式">
              <code>github.ref</code> や <code>github.event_name</code> は
              「今どういう状況で走っているか」を表すコンテキストです。
              <code>{"${{ }}"}</code> で囲むと式として評価されますが、
              <code>if</code> の中では囲みを省略できます。
              条件が複雑になったら、まず「今どのブランチ・どのイベントか」を
              分けて考えると整理しやすくなります。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              マトリクス — 1 つのジョブを複数条件へ展開
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>マトリクス</strong>は、1 つのジョブ定義を複数の条件 （Node
              のバージョンや OS）へ自動展開する仕組みです。 下の例は 3 つの Node
              バージョンで並列にテストし、
              互換性をまとめて検査します。組み合わせのぶんだけジョブが増える
              ため、実行時間も増える点は意識しておきます。
            </p>

            <CodeBlock
              language="yaml"
              title="Node 3 バージョンでの並列テスト"
              code={`jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: npm
      - run: npm ci
      - run: npm test`}
            />

            <figure className="my-8">
              <figcaption className="text-sm text-muted-foreground mb-3 font-medium">
                図: 1 つの定義が 3 つの並列ジョブに展開される
              </figcaption>
              <div className="rounded-2xl border border-border bg-muted/20 p-5">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* 定義 */}
                  <div className="rounded-xl border-2 border-primary/30 bg-card p-4 md:w-52 flex-shrink-0">
                    <p className="text-xs font-bold text-foreground mb-1">
                      ジョブ定義（1 つ）
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      matrix.node-version
                    </p>
                    <p className="font-mono text-sm text-primary mt-1">
                      [18, 20, 22]
                    </p>
                  </div>

                  <div className="flex items-center justify-center md:flex-col text-muted-foreground">
                    <span className="text-xs font-bold">展開</span>
                    <span className="text-2xl leading-none">→</span>
                  </div>

                  {/* 展開後 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                    {["18", "20", "22"].map((v) => (
                      <div
                        key={v}
                        className="rounded-lg border border-border bg-card p-3 text-center"
                      >
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground text-xs font-bold mb-1.5">
                          ▢
                        </span>
                        <p className="text-xs font-bold text-foreground">
                          test
                        </p>
                        <p className="font-mono text-xs text-muted-foreground">
                          node {v}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  3 つは<strong>同時（並列）</strong>に走り、それぞれ独立に成否が出ます
                </p>
              </div>
            </figure>

            <InfoBox type="info" title="fail-fast の既定は true">
              マトリクスは既定で <code>fail-fast: true</code> です。1 つの
              組み合わせが失敗すると、残りの組み合わせが即座にキャンセルされます。
              「どのバージョンで落ちるか」を全部知りたいときは{" "}
              <code>fail-fast: false</code> にして、すべて最後まで走らせます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              同時実行を 1 本に絞る — concurrency
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              同じブランチに続けて push すると、古い実行と新しい実行が
              二重に走ります。<code>concurrency</code> だけを付けた場合に
              自動でキャンセルされるのは<strong>待機中（pending）の実行</strong>
              までで、すでに走っている実行はそのまま続きます。
              <code>cancel-in-progress: true</code> を足すと実行中のものも
              打ち切られ、最新の 1 本だけが残ります。CI
              の待ち時間と無駄な消費を減らせます。
            </p>

            <CodeBlock
              language="yaml"
              title="古い実行を打ち切る"
              code={`concurrency:
  group: ci-\${{ github.ref }}
  cancel-in-progress: true`}
            />

            <Quiz
              question="lint と test を並列で走らせ、両方が成功したときだけ build を走らせたい。build ジョブに書くべきキーはどれ？"
              options={[
                { label: "runs-on: [lint, test]" },
                { label: "needs: [lint, test]", correct: true },
                { label: "if: [lint, test]" },
                { label: "matrix: [lint, test]" },
              ]}
              explanation="ジョブ間の依存は needs で宣言します。needs: [lint, test] と書くと、build は lint と test の両方が成功するまで待機し、どちらかが失敗すれば build は実行されません。runs-on はランナー指定、if は条件式、matrix は展開のためのキーです。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手を動かす — マトリクスと依存を組む
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              test を Node 20 と 22 のマトリクスで走らせ、build は test の
              完了を待つように <code>___</code> を埋めてください。
            </p>

            <CodingChallenge
              preview
              previewType="terminal"
              title="マトリクスと needs を書こう"
              description="matrix で 2 つの Node バージョンに展開し、build ジョブが test に依存するようにします。"
              initialCode={`jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      ___:
        node-version: [20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
      - run: npm ci && npm test
  build:
    ___: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build`}
              answer={`jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
      - run: npm ci && npm test
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build`}
              hints={[
                "複数条件へ展開する定義のキーは matrix",
                "他ジョブの完了を待つ依存のキーは needs",
              ]}
              keywords={["matrix", "needs"]}
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Events that trigger workflows",
                  url: "https://docs.github.com/actions/reference/workflows-and-actions/events-that-trigger-workflows",
                  description:
                    "push / pull_request / schedule / workflow_dispatch の一覧",
                },
                {
                  title: "Using a matrix for your jobs",
                  url: "https://docs.github.com/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations",
                  description: "マトリクスの展開・include / exclude・fail-fast",
                },
                {
                  title: "Using concurrency",
                  url: "https://docs.github.com/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency",
                  description: "同時実行の制御と古い実行のキャンセル",
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
