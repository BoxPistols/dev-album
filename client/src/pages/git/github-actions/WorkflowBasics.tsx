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

export default function WorkflowBasics() {
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
            ワークフローの基本構造
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            ワークフローは <code>.github/workflows/</code> 配下に置いた YAML
            ファイルです。ファイルを 1 つ作れば、それだけで動き始めます。
            まずは最小のワークフローを 1 本書き、各キーが何を指すのかを
            上から順に読み解いていきます。
          </p>
        </div>

        <WhyNowBox tags={["YAML", "on", "jobs", "steps"]}>
          <p>
            ワークフローの YAML は、覚えるキーがそれほど多くありません。
            <code>on</code>・<code>jobs</code>・<code>steps</code> の 3
            つの骨格さえ掴めば、大半のワークフローは読めるようになります。
            最初に「動く 1 本」を丸ごと見てから、部品に分解していくと、
            後で複雑な設定が出てきても迷いません。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ファイルの置き場所
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ワークフローは、リポジトリのルートにある{" "}
              <code>.github/workflows/</code> フォルダの中に置きます。
              ファイル名は自由（<code>ci.yml</code> や <code>deploy.yml</code>{" "}
              など）で、拡張子は <code>.yml</code> または <code>.yaml</code>{" "}
              です。このフォルダに置いて push するだけで、GitHub
              が自動的に認識します。
            </p>

            <CodeBlock
              language="text"
              title="リポジトリ内の配置"
              code={`my-project/
├── .github/
│   └── workflows/
│       ├── ci.yml        ← 検査用のワークフロー
│       └── deploy.yml    ← デプロイ用のワークフロー
├── src/
├── package.json
└── README.md`}
            />

            <InfoBox
              type="warning"
              title="フォルダ名は複数形。単数だと動かない"
            >
              フォルダは <code>.github/workflows</code>（workflow
              <strong>s</strong>）です。
              <code>.github/workflow</code> のように単数にすると、GitHub は
              ワークフローとして認識せず、Actions タブに何も出てきません。
              「設定したのに走らない」ときは、まずこのパスのスペルを疑います。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              動く 1 本を丸ごと読む
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              下は、push と PR をきっかけに依存インストールと lint・test・build
              を順に走らせる、実用最小のワークフローです。
              まず全体を眺めてから、キーごとの意味を確認します。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/workflows/ci.yml"
              code={`name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - name: リポジトリを取得
        uses: actions/checkout@v4

      - name: Node をセットアップ
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: 依存をインストール
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test

      - name: Build
        run: npm run build`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              キーを 1 つずつ読み解く
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1">
                  <code>name</code>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ワークフローの表示名。Actions タブの一覧に出る名前です。
                  省略するとファイルのパスが名前になります。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1">
                  <code>on</code>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  トリガー。ここでは「main への push」と「すべての
                  PR」で起動します。
                  ここを変えると、いつ走るかが変わります（次のページで詳しく扱います）。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1">
                  <code>jobs</code> / <code>verify</code>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ジョブの集まりと、その中の 1 ジョブ。<code>verify</code>{" "}
                  は自分で付けたジョブ ID です。ジョブが 1 つでも{" "}
                  <code>jobs</code> の下に置く必要があります。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1">
                  <code>runs-on</code>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  このジョブを動かすランナー。<code>ubuntu-latest</code> は
                  GitHub がホストする Linux 環境です。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1">
                  <code>steps</code> / <code>uses</code> / <code>run</code>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  手順の並び。<code>uses</code> は公開アクションの再利用（
                  <code>actions/checkout@v4</code> など）、<code>run</code>{" "}
                  はシェルコマンドの実行です。step は上から順に走り、 どれか 1
                  つでも失敗するとジョブは止まります。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="uses と run の使い分け">
              <code>uses</code> は「他人が作った部品を呼ぶ」、<code>run</code>{" "}
              は「自分でコマンドを打つ」と考えると分かりやすいです。
              チェックアウトや Node セットアップのような定型作業はアクション（
              <code>uses</code>）に任せ、プロジェクト固有のコマンド（
              <code>npm test</code> など）は <code>run</code> で書きます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              checkout を忘れるとどうなるか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ランナーは毎回まっさらな状態で起動するため、最初の step で
              <code>actions/checkout</code> を実行してリポジトリの中身を
              ランナー上に取り出す必要があります。これを忘れると、
              <code>npm ci</code> が <code>package.json が見つからない</code>{" "}
              といったエラーで落ちます。「最初の step は checkout」と
              覚えておくと安全です。
            </p>

            <Quiz
              question="ジョブの最初に actions/checkout を置く理由として正しいのはどれ？"
              options={[
                {
                  label:
                    "ランナーは初期状態ではリポジトリの中身を持っていないため",
                  correct: true,
                },
                { label: "checkout がないと GitHub にログインできないため" },
                {
                  label: "checkout が Node.js をインストールしてくれるため",
                },
                { label: "checkout を書かないと料金が発生するため" },
              ]}
              explanation="GitHub ホストランナーはジョブごとにまっさらな仮想環境として起動します。リポジトリのファイルはまだ存在しないため、actions/checkout でランナー上に取り出してから、依存インストールやビルドを行います。Node のセットアップは別途 setup-node が担います。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手を動かす — 最初のワークフローを完成させる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              骨格を自分で埋めてみます。<code>___</code> を正しいキーや値に
              置き換えて、push で lint が走るワークフローを完成させてください。
            </p>

            <CodingChallenge
              preview
              previewType="config"
              title="ワークフローの骨格を完成させよう"
              description="トリガー・ランナー・ステップの必須キーを埋めます。checkout のあと、依存インストールと lint を走らせます。"
              initialCode={`name: CI
___:
  push:
    branches: [main]
jobs:
  lint:
    runs-on: ___
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install
        ___: npm ci
      - name: Lint
        run: npm run lint`}
              answer={`name: CI
on:
  push:
    branches: [main]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install
        run: npm ci
      - name: Lint
        run: npm run lint`}
              hints={[
                "トリガーを宣言するトップレベルのキーは on",
                "GitHub がホストする Linux ランナーの指定は ubuntu-latest",
                "シェルコマンドを実行する step のキーは run",
              ]}
              keywords={["on", "ubuntu-latest", "run"]}
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Workflow syntax for GitHub Actions",
                  url: "https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions",
                  description: "name / on / jobs / steps など全キーの仕様",
                },
                {
                  title: "actions/checkout",
                  url: "https://github.com/actions/checkout",
                  description: "リポジトリをランナーへ取り出す公式アクション",
                },
                {
                  title: "actions/setup-node",
                  url: "https://github.com/actions/setup-node",
                  description: "Node.js のバージョン指定と依存キャッシュ",
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
