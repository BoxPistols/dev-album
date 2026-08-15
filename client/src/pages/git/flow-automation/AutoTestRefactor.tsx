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

export default function AutoTestRefactor() {
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
            自動テストと自動修正（リファクタリング）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            「壊れていないか検査する」だけでなく、「直せるものは機械が直す」まで
            進めます。整形・依存更新・定型的な修正を自動化し、レビューに回る前に
            機械で片付く部分を減らします。
          </p>
        </div>

        <WhyNowBox
          tags={["自動テスト", "整形", "Dependabot", "CodeQL", "AI 修正"]}
        >
          <p>
            レビューで「セミコロンが」「import の順が」と指摘し合うのは、
            人の時間の使い方として惜しい部分です。フォーマットや依存更新のような
            <strong>答えが決まっている修正</strong>
            は機械に任せ、人は設計や意図の
            レビューに集中する——これが自動修正の狙いです。テストという土台の上に、
            自動で直す層を重ねていきます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              土台は自動テスト
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              自動修正が成立するのは、「直した結果が壊れていないか」を
              テストが保証してくれるからです。CI 実践で組んだ lint・test・build
              が、自動修正の安全網になります。まずここが緑であることが前提です。
            </p>

            <figure className="my-6">
              <figcaption className="text-sm text-muted-foreground mb-3 font-medium">
                図: 何を機械に任せ、何を人が判断するかの線引き
              </figcaption>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-5">
                  <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-3">
                    機械に任せる（答えが決まっている）
                  </p>
                  <ul className="space-y-1.5 text-sm text-foreground/80">
                    <li>・整形（フォーマット）</li>
                    <li>・lint の自動修正</li>
                    <li>・パッチ / マイナーの依存更新</li>
                    <li>・定型的なリファクタリング</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-5">
                  <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-3">
                    人が判断する（意図・設計が要る）
                  </p>
                  <ul className="space-y-1.5 text-sm text-foreground/80">
                    <li>・メジャー更新の取り込み</li>
                    <li>・設計や API の変更</li>
                    <li>・仕様の解釈が必要な修正</li>
                    <li>・マージの最終承認</li>
                  </ul>
                </div>
              </div>
            </figure>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              整形を自動で直す — auto-fix
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              リンタやフォーマッタの多くは <code>--fix</code>{" "}
              で自動修正できます。 これを CI で走らせ、修正結果を PR に
              <strong>コミットし返す</strong>
              構成にすると、開発者が整形を忘れても機械が揃えます。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/workflows/autofix.yml"
              code={`name: Autofix

on: pull_request

permissions:
  contents: write   # 修正結果を push し返すため

jobs:
  format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - name: 整形と自動修正
        run: |
          npm run format
          npm run lint -- --fix
      - name: 修正があればコミット
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "style: 自動整形"`}
            />

            <InfoBox
              type="warning"
              title="GITHUB_TOKEN の push は次の CI を起動しない"
            >
              自動コミットには落とし穴があります。既定の{" "}
              <code>GITHUB_TOKEN</code> で push したコミットは、
              <strong>新しいワークフロー実行を起こしません</strong>。
              これは無限ループを防ぐための仕様ですが、実測では
              「整形コミットに対して CI が回らず、必須チェックが未完のまま」
              という詰まりを生みます。回避するには、専用のトークン（PAT や
              GitHub App）で push するか、整形は「修正する」のではなく
              「差分があれば失敗させて知らせる」方式にします。
              なお、フォークからの PR では <code>on: pull_request</code> に
              書き込み権限のあるトークンはそもそも渡らないため、
              <code>permissions: contents: write</code> を付けても
              push 自体が失敗します。フォーク PR も対象にするなら、
              ラベル付けと同様に <code>pull_request_target</code>{" "}
              を検討します（その場合はフォーク側のコードを実行しない構成にします）。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              依存を自動で更新する — Dependabot
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>Dependabot</strong> は、依存パッケージに更新が出たら
              自動で PR を作る仕組みです。<code>.github/dependabot.yml</code>{" "}
              に設定を書くだけで有効になります。更新をまとめる（group）と、 PR
              の洪水を防げます。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/dependabot.yml"
              code={`version: 2
updates:
  - package-ecosystem: npm
    directory: "/"
    schedule:
      interval: weekly
    groups:
      minor-and-patch:
        update-types: [minor, patch]`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              さらに、パッチ・マイナー更新は CI が通れば
              <strong>自動マージ</strong>する構成もよく使われます。 Dependabot
              の PR にだけ反応し、更新の種類を見て自動マージを有効にします。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/workflows/dependabot-automerge.yml"
              code={`name: Dependabot auto-merge

on: pull_request

permissions:
  contents: write
  pull-requests: write

jobs:
  automerge:
    runs-on: ubuntu-latest
    if: github.actor == 'dependabot[bot]'
    steps:
      - name: 更新情報を取得
        id: meta
        uses: dependabot/fetch-metadata@v2
      - name: パッチ・マイナーは自動マージ
        if: steps.meta.outputs.update-type != 'version-update:semver-major'
        run: gh pr merge --auto --squash "$PR_URL"
        env:
          PR_URL: \${{ github.event.pull_request.html_url }}
          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}`}
            />

            <InfoBox type="info" title="メジャー更新は人が見る">
              破壊的変更が入りうるメジャー更新（<code>semver-major</code>）は
              自動マージから外し、人が確認します。「答えが決まっている更新だけを
              機械に任せる」という線引きが、自動化を安全に保つコツです。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              安全性を自動で検査する — CodeQL
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>CodeQL</strong> は、GitHub が提供するコード解析で、
              脆弱性の疑いを自動で見つけます。
              <strong>Security → Code scanning</strong> から有効化でき、PR
              ごとに走らせて結果を PR 上に表示できます。
              テストが「壊れていないか」を見るのに対し、CodeQL は
              「危険なパターンがないか」を見ます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              AI による修正・リファクタリング
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              近年は、AI
              エージェントを開発フローに組み込む構成も現実的になりました。
              Copilot の autofix のように、
              検出した問題に対して修正案を提示する仕組みもあります。
            </p>

            <InfoBox type="warning" title="AI が作った変更も、ゲートは同じ">
              AI が生成した PR も、人の PR とまったく同じ検査・レビュー・
              マージ条件を通します。むしろ、書き手が機械になるほど
              「マージの前に人が承認する」というガバナンスの価値は上がります。
              自動修正は速さのためで、最終的な責任の所在は人に残す——
              この原則は変えません（マージ制御は最後のページで扱います）。
            </InfoBox>
          </section>

          <section>
            <Quiz
              question="CI 内で lint --fix の結果を GITHUB_TOKEN で push し返したのに、その整形コミットに対する必須 CI が回らず PR がマージできない。原因はどれ？"
              options={[
                {
                  label:
                    "GITHUB_TOKEN で push したコミットは新しいワークフローを起動しない仕様のため",
                  correct: true,
                },
                { label: "lint --fix は CI では動かないため" },
                { label: "pull_request トリガーは push では動かないため" },
                { label: "Dependabot が競合しているため" },
              ]}
              explanation="無限ループを防ぐため、既定の GITHUB_TOKEN で作成した push は新しいワークフロー実行を起こしません。そのため自動整形コミットに対して必須チェックが回らず、未完のまま止まります。専用トークン（PAT / GitHub App）で push するか、修正せず「差分があれば失敗させる」方式にして回避します。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手を動かす — Dependabot を設定する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              npm の依存を毎週チェックし、マイナー・パッチをまとめる Dependabot
              設定の <code>___</code> を埋めてください。
            </p>

            <CodingChallenge
              preview
              previewType="terminal"
              title="dependabot.yml を完成させよう"
              description="npm エコシステムを毎週チェックし、minor と patch を 1 つのグループにまとめます。"
              initialCode={`version: 2
updates:
  - package-ecosystem: ___
    directory: "/"
    schedule:
      interval: ___
    groups:
      minor-and-patch:
        update-types: [minor, patch]`}
              answer={`version: 2
updates:
  - package-ecosystem: npm
    directory: "/"
    schedule:
      interval: weekly
    groups:
      minor-and-patch:
        update-types: [minor, patch]`}
              hints={[
                "Node のパッケージ管理を指すエコシステム名は npm",
                "毎週の更新チェックを指す interval の値は weekly",
              ]}
              keywords={["npm", "weekly"]}
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Configuring Dependabot version updates",
                  url: "https://docs.github.com/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates",
                  description: "dependabot.yml の書き方とグループ化",
                },
                {
                  title: "About code scanning with CodeQL",
                  url: "https://docs.github.com/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql",
                  description: "自動セキュリティ解析の有効化と仕組み",
                },
                {
                  title: "Claude Code GitHub Actions",
                  url: "https://docs.claude.com/en/docs/claude-code/github-actions",
                  description: "GitHub Actions と組み合わせる方法の公式ドキュメント",
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
