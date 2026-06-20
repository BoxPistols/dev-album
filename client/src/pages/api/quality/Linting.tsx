import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const ruleExamples = [
  {
    title: "operationId 必須",
    description:
      "全 operation に一意な operationId を付ける。コード生成やテストで operation を参照する際の識別子になる。",
  },
  {
    title: "description 必須",
    description:
      "operation・パラメータ・スキーマに説明文を求める。ドキュメントの空欄を機械的に検出できる。",
  },
  {
    title: "パスはケバブケース",
    description:
      "/user-profiles のように URL パスの命名規則を統一する。snake_case や camelCase の混在を防ぐ。",
  },
  {
    title: "エラーレスポンス定義",
    description:
      "成功時だけでなく 4xx・5xx のレスポンスも responses に定義することを求める。利用側がエラー処理を書ける。",
  },
  {
    title: "スキーマに example",
    description:
      "プロパティに example を付ける。ドキュメントの読みやすさと、モックサーバの自動生成の質が上がる。",
  },
  {
    title: "未使用コンポーネント検出",
    description:
      "components/schemas に定義したが参照されていないスキーマを警告。仕様の肥大化を抑える。",
  },
];

export default function Linting() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        {/* Header */}
        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            スキーマ Lint と Spectral
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            コードを ESLint で機械的にチェックするように、OpenAPI 仕様そのものの
            品質と一貫性も機械的にチェックできます。これが API ガバナンスです。
            ここでは代表的な Linter である Spectral
            を使い、組織のスタイルガイドを
            「コードとして強制する」やり方を見ていきます。
          </p>
        </div>

        <WhyNowBox
          tags={["OpenAPI", "Spectral", "Lint", "API ガバナンス", "CI"]}
        >
          <p>
            API
            の数が増えると、設計の一貫性はレビュアーの記憶力だけでは保てなくなります。
            「このパスは複数形だっけ単数形だっけ」「エラーレスポンスの形式は揃っているか」を
            人が毎回目視するのは現実的ではありません。
            <strong>仕様の品質チェックを自動化する</strong>と、
            レビューの属人性が下がり、レビュアーは命名規則のような機械的な指摘ではなく
            「この API はそもそも必要か」という本質的な議論に集中できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* API ガバナンスとは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              API ガバナンス＝仕様の品質を機械でチェックする
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              API ガバナンスとは、組織が公開する API
              の設計を一定の基準に揃えるための 仕組みです。その中核が
              <strong>スキーマ Lint</strong>
              ——OpenAPI
              仕様ファイル自体を静的解析して、命名規則・必須項目・構造の
              一貫性を検査することです。ソースコードに対する ESLint や Prettier
              の、 API 仕様版だと考えると分かりやすいです。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-muted border border-border p-4">
                  <p className="font-bold text-foreground mb-1">
                    Lint なしのレビュー
                  </p>
                  <p className="text-muted-foreground">
                    命名・必須項目・エラー定義の漏れを人が目視。指摘が属人的で、
                    レビュアーによってブレる。同じ指摘が毎回繰り返される。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    Lint ありのレビュー
                  </p>
                  <p className="text-muted-foreground">
                    機械的な指摘は CI が自動で検出。人は設計意図・ドメインの
                    妥当性という本質的な部分に集中できる。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="スタイルガイドをコード化する">
              「パスは複数形」「全 operation
              に説明を書く」といった組織のルールは、 Wiki
              に書いても読まれず守られないことがあります。 ルールを Linter
              の設定ファイルとして書き、CI で強制すると、
              ルールが実行可能なコードになり、守られているかを常に確認できます。
              レビュアーが同じ指摘を繰り返す負荷も下がります。
            </InfoBox>
          </section>

          {/* Spectral とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Spectral — OpenAPI / AsyncAPI 用の Linter
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>Spectral</strong>は Stoplight が開発するオープンソースの
              Linter です。 OpenAPI や AsyncAPI、あるいは任意の JSON / YAML
              ファイルを対象に、 ルールベースで検査できます。大きく分けて、
              すぐ使える組み込みルールセットと、組織独自のカスタムルールの 2
              つを使います。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  組み込みルールセット
                </h3>
                <p
                  className="text-xs text-primary font-medium mb-2"
                  style={{ fontSize: 13 }}
                >
                  spectral:oas / spectral:asyncapi
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  OpenAPI / AsyncAPI
                  の標準的なベストプラクティスを集めたルール群。 extends
                  で読み込むだけで、定番のチェックが一通り有効になる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  カスタムルール
                </h3>
                <p
                  className="text-xs text-primary font-medium mb-2"
                  style={{ fontSize: 13 }}
                >
                  given（JSONPath）+ then（function）
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  対象を JSONPath で絞り込み、truthy / pattern / casing
                  などの関数で検証。組織のスタイルガイドを表現できる。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              ルールには
              <code>error</code> / <code>warn</code> / <code>info</code> /{" "}
              <code>hint</code>
              という重大度（severity）を設定できます。 error が 1 件でもあれば
              Spectral は非ゼロの終了コードを返すため、 CI
              のゲートとして機能します。warn は通知だけに留めたい段階的な
              ルール導入に向きます。
            </p>
          </section>

          {/* ルール例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              よく使うルールの例
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              実務で設定することの多いルールを並べます。これらは「仕様としては
              書かなくても通る」ものですが、組織の品質基準として
              <strong>必須に格上げする</strong>
              ことで、ドキュメントとコード生成の質を底上げできます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ruleExamples.map((rule) => (
                <div
                  key={rule.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {rule.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* .spectral.yaml */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              カスタムルールを書く（.spectral.yaml）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              プロジェクト直下に
              <code>.spectral.yaml</code>
              を置くと、Spectral はそれを自動で読み込みます。
              <code>extends</code> で組み込みルールセットを継承しつつ、
              <code>rules</code>
              に独自ルールを追加するのが基本形です。 下の例は、operationId と
              description を必須にし、 パスをケバブケースに強制する設定です。
            </p>

            <CodeBlock
              language="yaml"
              title=".spectral.yaml — 組み込み継承 + カスタムルール"
              code={`extends:
  - "spectral:oas"

rules:
  # 全 operation に operationId を必須にする
  operation-operationId-required:
    description: すべての operation に operationId が必要です
    given: "$.paths[*][get,post,put,patch,delete]"
    severity: error
    then:
      field: operationId
      function: truthy

  # operation に説明文を必須にする
  operation-description-required:
    description: すべての operation に description が必要です
    given: "$.paths[*][get,post,put,patch,delete]"
    severity: error
    then:
      field: description
      function: truthy

  # URL パスはケバブケースに揃える
  path-kebab-case:
    description: パスのセグメントはケバブケースで記述してください
    given: "$.paths"
    severity: warn
    then:
      field: "@key"
      function: pattern
      functionOptions:
        match: "^(/[a-z0-9-]+|/{[a-zA-Z0-9]+})+$"

  # 成功レスポンスだけでなくエラー定義も求める
  operation-4xx-response:
    description: 4xx のエラーレスポンスを定義してください
    given: "$.paths[*][get,post,put,patch,delete].responses"
    severity: warn
    then:
      function: schema
      functionOptions:
        schema:
          type: object
          anyOf:
            - required: ["400"]
            - required: ["404"]
            - required: ["422"]`}
            />

            <InfoBox type="info" title="given は JSONPath、then は検証関数">
              ルールの構造はシンプルです。
              <strong>given</strong>
              で「どこを見るか」を JSONPath で指定し、
              <strong>then</strong>
              で「どう検証するか」を組み込み関数（truthy / pattern / casing /
              schema など）で指定します。given が複数ノードにマッチすれば、
              それぞれに then が適用されます。
            </InfoBox>
          </section>

          {/* spectral lint 実行 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              実行する（spectral lint）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              CLI から
              <code>spectral lint</code>
              に仕様ファイルを渡すだけです。
              <code>.spectral.yaml</code>
              が同じディレクトリにあれば自動で適用されます。
              違反箇所は行番号・パス・重大度つきで出力されます。
            </p>

            <CodeBlock
              language="bash"
              title="インストールと実行"
              code={`# 単発で実行する場合（npx）
npx @stoplight/spectral-cli lint openapi.yaml

# プロジェクトに入れて使う場合
npm install --save-dev @stoplight/spectral-cli
npx spectral lint openapi.yaml`}
            />

            <CodeBlock
              language="bash"
              title="出力例（違反あり）"
              code={`openapi.yaml
 12:9   error    operation-operationId-required  すべての operation に operationId が必要です  paths./users.get
 18:7   warning  path-kebab-case                 パスのセグメントはケバブケースで記述してください  paths./userProfiles
 25:9   warning  operation-4xx-response          4xx のエラーレスポンスを定義してください  paths./users.post.responses

✖ 3 problems (1 error, 2 warnings, 0 infos, 0 hints)`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              error が含まれると終了コードが非ゼロになります。
              この性質を使えば、CI のステップとして
              <code>spectral lint openapi.yaml</code>
              を実行するだけで、ルール違反のあるプルリクエストを
              マージ前に止められます。
            </p>
          </section>

          {/* CI 組み込み */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CI に組み込んでゲートにする
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ローカルで実行できるだけでは、ルールは「気が向いたら走らせるもの」に
              なりがちです。CI のジョブに組み込むことで、
              <strong>仕様の品質チェックを必ず通る関門にできます</strong>。 下は
              GitHub Actions の例です。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/workflows/api-lint.yml"
              code={`name: API Lint

on:
  pull_request:
    paths:
      - "openapi.yaml"
      - ".spectral.yaml"

jobs:
  spectral:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      # error があると終了コードが非ゼロになり、ジョブが失敗する
      - run: npx @stoplight/spectral-cli lint openapi.yaml`}
            />

            <InfoBox type="success" title="段階的にルールを厳格化する">
              既存の仕様に一気に error ルールを当てると、大量の違反で
              身動きが取れなくなります。導入初期は severity を warn にして
              現状を可視化し、新規・修正分から守らせ、件数が減ってきたら error
              に格上げするのが現実的です。
              「仕様としては合法だが、組織としては非推奨」を warn、
              「マージを止めたい」を error と使い分けます。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Spectral の主な役割はどれ？"
              options={[
                { label: "API サーバを起動してレスポンス速度を計測する" },
                {
                  label:
                    "OpenAPI などの仕様を Lint し、組織のスタイルガイドを機械的に強制する",
                  correct: true,
                },
                { label: "データベースのスキーマを自動でマイグレーションする" },
                { label: "JSON を別の形式に変換する汎用コンバータ" },
              ]}
              explanation="Spectral は OpenAPI / AsyncAPI / JSON / YAML 向けの Linter です。組み込みルールセット（spectral:oas 等）とカスタムルールで仕様ファイルの一貫性を検査し、CI に組み込むことで組織のスタイルガイドを実行可能なコードとして強制できます。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="既存の大きな仕様に Spectral を導入するとき、まず取るべき進め方は？"
              options={[
                {
                  label:
                    "すべてのルールを最初から error にして、全違反を一括で直す",
                },
                {
                  label:
                    "まず severity を warn にして現状を可視化し、件数を減らしながら段階的に error へ格上げする",
                  correct: true,
                },
                { label: "ルールを 1 つだけ残し、他はすべて無効にする" },
                { label: "CI には入れず、ローカルでだけ手動実行する" },
              ]}
              explanation="既存仕様に一気に error を当てると大量の違反で作業が止まります。warn で現状を可視化し、新規・修正分から守らせ、件数が減ったら error に格上げするのが現実的です。warn と error の使い分けは「非推奨」と「マージを止めたい」の区別に対応します。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Spectral 公式ドキュメント",
                  url: "https://docs.stoplight.io/docs/spectral",
                  description:
                    "Stoplight 製 Spectral の公式ドキュメント。CLI・ルールセット・カスタムルールの書き方を網羅",
                },
                {
                  title: "Spectral - カスタムルールの書き方",
                  url: "https://docs.stoplight.io/docs/spectral/e5b9616d6d50c-custom-rulesets",
                  description:
                    "given（JSONPath）と then（検証関数）でルールを定義する方法の詳細",
                },
                {
                  title: "Spectral - 組み込み関数リファレンス",
                  url: "https://docs.stoplight.io/docs/spectral/8719b32fab2bf-core-functions",
                  description:
                    "truthy / pattern / casing / schema など、then で使える組み込み関数の一覧",
                },
                {
                  title: "Spectral GitHub リポジトリ",
                  url: "https://github.com/stoplightio/spectral",
                  description:
                    "ソースコードと Issue。導入事例や CI 連携の議論も参照できる",
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
