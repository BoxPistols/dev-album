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

const approaches = [
  {
    title: "スキーマベース",
    examples: "Schemathesis、Dredd",
    description:
      "実際のレスポンスを OpenAPI などのスキーマに照合する。provider 側を起点に「仕様どおりの形で返しているか」を検証する。既存の OpenAPI があれば導入しやすい。",
  },
  {
    title: "コンシューマ駆動契約（CDC）",
    examples: "Pact",
    description:
      "consumer が「こう呼ぶ／こう返ってほしい」を定義し、その契約を provider が満たすか検証する。検証の起点が consumer 側にあるのが最大の特徴。",
  },
];

export default function ContractTesting() {
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
            契約テスト
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            契約テスト（Contract Testing）は、API
            の契約と実装がズレていないかを自動で検証する仕組みです。
            フロント（consumer）とバック（provider）が別々に進化するなかで、
            ドキュメントどおりに動いているかを CI
            で機械的に確認し、契約違反をマージ前に止めます。
          </p>
        </div>

        <WhyNowBox
          tags={["契約テスト", "OpenAPI", "Pact", "Schemathesis", "CI"]}
        >
          <p>
            型生成（OpenAPI から TypeScript 型を吐く）を導入すると、
            「コードと契約の<strong>静的な</strong>ズレ」は防げます。
            しかし型は契約という設計図を写したものにすぎず、
            <strong>実際にサーバが返すレスポンス</strong>
            がその設計図どおりかは保証しません。 契約には <code>id</code>{" "}
            が数値とあるのに実装は文字列を返している、
            必須のはずのフィールドが欠ける——こうした実行時のズレは、
            契約と実装の両方を突き合わせて初めて検出できます。それが契約テストの役割です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              契約テストの位置づけ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              OpenAPI を契約の正本とし、コンシューマとプロバイダの双方がそれに沿っているかを CI で検証します。ズレはマージ前に検知します。
            </p>
            <MermaidDiagram
              title="契約テストの位置づけ（図）"
              chart={`flowchart LR
  O["OpenAPI (契約の正本)"] --> C["コンシューマ: 契約に沿って呼ぶ"]
  O --> P["プロバイダ: 契約通り返すか"]
  C --> T["契約テスト (CI)"]
  P --> T
  T -->|"ズレを検知"| F["マージ前に失敗"]`}
            />
          </section>

          {/* 問題 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              なぜ契約と実装はズレるのか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              フロントとバックは別チーム・別リポジトリ・別リリースサイクルで動くことが多く、
              それぞれが独立して変更を加えます。契約（OpenAPI
              など）を真ん中に置いても、
              「契約を更新したが実装が追いついていない」「実装を変えたが契約を直し忘れた」
              という<strong>片側だけの変更</strong>が日常的に発生します。
              型生成は契約を写すだけなので、契約自体が実装とズレていれば、ズレた型が生成されるだけです。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">consumer</p>
                  <p className="text-muted-foreground">
                    API を呼ぶ側。フロントや別サービス。契約を信じて実装する
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">契約（OpenAPI）</p>
                  <p className="text-muted-foreground">
                    両者が従うべき合意。だが「守られている保証」はそれ自体にはない
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">provider</p>
                  <p className="text-muted-foreground">
                    API を返す側。バック。実装は契約と独立に変わりうる
                  </p>
                </div>
              </div>
            </div>

            <InfoBox
              type="warning"
              title="型生成だけでは実行時のズレは捕まらない"
            >
              OpenAPI からの型生成は「契約 → コード」の写像を自動化するもので、
              防げるのは静的な不整合（型の取り違え、フィールド名のタイポなど）です。
              サーバが実際に返す値が契約どおりかは、レスポンスを実物と突き合わせない限り分かりません。
              型生成と契約テストは<strong>守る範囲が違う</strong>
              ため、片方では穴が残ります。
            </InfoBox>
          </section>

          {/* 契約テストとは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              契約テストとは
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              契約テストは、「consumer と provider
              が同じ契約に従っているか」を自動検証する仕組みです。
              ユニットテストが 1 つの関数の振る舞いを、E2E
              が画面全体の動作を確かめるのに対し、 契約テストが見るのは
              <strong>境界面（API のリクエスト／レスポンスの形）だけ</strong>
              です。
              そのぶん高速で、両サービスを同時に立ち上げなくても検証できるケースが多いのが利点です。
            </p>

            <div className="rounded-xl border border-border bg-card p-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-2 pr-4 font-bold text-foreground">
                      テストの種類
                    </th>
                    <th className="py-2 pr-4 font-bold text-foreground">
                      確かめる対象
                    </th>
                    <th className="py-2 font-bold text-foreground">
                      両サービス起動
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4">ユニットテスト</td>
                    <td className="py-2 pr-4">
                      関数・モジュール単体のロジック
                    </td>
                    <td className="py-2">不要</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4">契約テスト</td>
                    <td className="py-2 pr-4">API 境界面の形（契約の遵守）</td>
                    <td className="py-2">原則不要</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">E2E テスト</td>
                    <td className="py-2 pr-4">システム全体の通し動作</td>
                    <td className="py-2">必要</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 2系統 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              2 つのアプローチ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              契約テストには大きく 2 系統あります。違いは
              <strong>検証の起点がどちら側にあるか</strong>です。
              スキーマベースは provider
              が「仕様どおりに返しているか」を見る方向、 CDC は consumer
              が「自分はこう使う」と宣言した契約を provider
              が満たすか見る方向です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {approaches.map((a) => (
                <div
                  key={a.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {a.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {a.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* スキーマベース */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              スキーマベース：実レスポンスを OpenAPI に照合する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              既に OpenAPI を書いている場合、スキーマベースの検証が最短です。
              Schemathesis は OpenAPI
              を読み込み、定義からテストケースを生成して実際の API を叩き、
              返ってきたレスポンスがスキーマに一致するかを検証します。 下は
              OpenAPI を指定して provider に対して実行するイメージです。
            </p>

            <CodeBlock
              language="bash"
              title="Schemathesis：OpenAPI を実 API に照合"
              code={`# OpenAPI 仕様を読み込み、定義から生成したリクエストで実 API を検証
schemathesis run https://api.example.com/openapi.json \\
  --url https://api.example.com \\
  --checks all

# 違反例（抜粋）:
# 1. Response conforms to schema
#     Schema: { "id": { "type": "integer" } }
#     Received: { "id": "42" }   <- 文字列で返っている`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ここで検出しているのは、まさに型生成では防げない実行時のズレです。
              契約上 <code>id</code> は整数なのに、実装が文字列を返している。
              スキーマベースは provider
              の応答を実物で突き合わせるため、こうしたズレを表面化させます。
            </p>
          </section>

          {/* CDC / Pact */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              コンシューマ駆動契約（CDC）：consumer 起点で契約を作る
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Pact に代表される CDC では、
              <strong>consumer が先に契約を書きます</strong>。 consumer
              のテストの中で「このリクエストを送ったら、このレスポンスが返ってほしい」を宣言し、
              その期待を pact ファイル（契約）として出力します。 provider
              側はその pact ファイルを読み込み、自分の実装が consumer
              の期待を満たすかを検証します。 検証の方向が consumer → provider
              に向いているのが、スキーマベースとの決定的な違いです。
            </p>

            <CodeBlock
              language="bash"
              title="Pact：consumer が契約を生成し provider が検証する流れ"
              code={`# 1. consumer 側: テスト実行で期待を宣言 → pact ファイル(契約)を生成
npm run test:pact:consumer
#   -> ./pacts/frontend-userservice.json が出力される

# 2. provider 側: 生成された契約を読み込み、実装が満たすか検証
npm run test:pact:provider
#   Verifying a pact between frontend and userservice
#     GET /users/42 returns a user
#       returns a response which has status code 200 (OK)
#       has a matching body (OK)`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              この仕組みの利点は、provider
              が「実際に使われている契約だけ」を検証できる点です。
              使われていないフィールドや、誰も呼んでいないエンドポイントの変更でビルドが落ちることがありません。
              一方で、consumer が宣言していない使い方は検証されないため、
              スキーマベースとは守備範囲が異なります。
            </p>

            <InfoBox type="info" title="スキーマベースと CDC は排他ではない">
              スキーマベースは「仕様の全体が守られているか」を、 CDC
              は「実際に使われている経路が壊れていないか」を見ます。 公開 API
              には OpenAPI ベース、社内のサービス間連携には Pact、
              というように対象に応じて使い分けたり併用したりするのが現実的です。
            </InfoBox>
          </section>

          {/* CI 連携 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CI で実行し、マージ前に止める
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              契約テストの価値は、CI に組み込んで
              <strong>契約違反をマージ前に検知する</strong>
              ことで最大化されます。
              人間のレビューに頼ると見落とすズレを、機械が毎回確実に拾います。
              下はプルリクエストで provider の契約検証を走らせる GitHub Actions
              の断片です。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/workflows/contract-test.yml（抜粋）"
              code={`name: contract-test
on:
  pull_request:
    branches: [main]

jobs:
  schema-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.13"
      - run: pip install schemathesis
      # API を起動してから OpenAPI と照合（違反があれば exit code 非0 で job 失敗）
      - run: |
          ./scripts/start-api.sh &
          schemathesis run http://localhost:8080/openapi.json \\
            --url http://localhost:8080 \\
            --checks all`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ジョブが失敗すればプルリクエストはマージできません。
              契約違反が本番に出る前に、開発者の手元で「どのフィールドがどうズレたか」が分かります。
              これが、契約を仕様として固定したうえで検証を自動化する具体的な姿です。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="コンシューマ駆動契約（CDC, Pact）で、契約の検証はどの方向で進む？"
              options={[
                {
                  label:
                    "consumer が期待を契約として定義し、provider がそれを満たすか検証する",
                  correct: true,
                },
                {
                  label:
                    "provider が契約を定義し、consumer がそれに従うか検証する",
                },
                { label: "契約は自動生成され、人間は一切関与しない" },
                {
                  label:
                    "consumer と provider が同時に契約を書いて多数決で決める",
                },
              ]}
              explanation="CDC（Consumer-Driven Contract）は名前のとおり consumer 起点です。consumer が「こう呼ぶ／こう返ってほしい」を宣言して契約（pact ファイル）を生成し、provider はその契約を満たすかを検証します。検証の方向が consumer → provider に向くのがスキーマベースとの決定的な違いです。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="OpenAPI からの型生成と、契約テストの関係として正しいものは？"
              options={[
                { label: "型生成があれば契約テストは不要になる" },
                { label: "契約テストがあれば型生成は不要になる" },
                {
                  label:
                    "型生成は静的なズレを、契約テストは実行時の実レスポンスのズレを防ぐ。守る範囲が違うので両方やる",
                  correct: true,
                },
                { label: "どちらも同じものを検証しているので片方で十分" },
              ]}
              explanation="型生成は契約をコードに写すもので、防げるのは静的な不整合です。サーバが実際に返す値が契約どおりかまでは保証しません。契約テストは実レスポンスを契約に照合して実行時のズレを捕まえます。守備範囲が異なる補完関係なので、両方を併用するのが現実的です。"
            />
          </section>

          {/* まとめ InfoBox */}
          <section>
            <InfoBox
              type="success"
              title="静的検査と実行時検証はセットで考える"
            >
              型生成（静的）と契約テスト（実行時）は競合せず、層が違うだけです。
              型でビルド時にコードと契約の写し間違いを潰し、
              契約テストで「実装が本当に契約どおり返すか」を CI で確かめる。
              この 2
              層を重ねることで、ドキュメントと実装が静かにズレていく事故を実用的に防げます。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Pact ドキュメント",
                  url: "https://docs.pact.io/",
                  description:
                    "コンシューマ駆動契約テストの代表ツール。CDC の考え方と consumer/provider の検証フローを解説",
                },
                {
                  title: "Schemathesis ドキュメント",
                  url: "https://schemathesis.readthedocs.io/",
                  description:
                    "OpenAPI を読み込み、実レスポンスをスキーマに照合するスキーマベース検証ツールの公式ドキュメント",
                },
                {
                  title: "OpenAPI Specification",
                  url: "https://spec.openapis.org/oas/latest.html",
                  description:
                    "契約テストの土台となる API 契約フォーマットの公式仕様",
                },
                {
                  title: "Martin Fowler - ContractTest",
                  url: "https://martinfowler.com/bliki/ContractTest.html",
                  description:
                    "契約テストの位置づけと、consumer/provider の境界を検証する考え方の解説記事",
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
