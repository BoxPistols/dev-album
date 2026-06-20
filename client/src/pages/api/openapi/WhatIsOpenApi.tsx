import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const ecosystemTools = [
  {
    title: "Swagger UI",
    role: "ドキュメント",
    description:
      "OpenAPI ドキュメントからブラウザで動く API リファレンスを生成する。試しにリクエストを送る「Try it out」機能を持つ。",
  },
  {
    title: "Redoc",
    role: "ドキュメント",
    description:
      "三カラムの読みやすい静的ドキュメントを生成する。Swagger UI より閲覧寄りの見た目で、公開ドキュメント向き。",
  },
  {
    title: "openapi-typescript",
    role: "型生成",
    description:
      "OpenAPI ドキュメントから TypeScript の型定義を生成する。レスポンスやリクエストの形をコードと一致させられる。",
  },
  {
    title: "Prism",
    role: "モックサーバ",
    description:
      "OpenAPI ドキュメントを読み込み、定義どおりに応答するモックサーバを立てる。実装前にクライアントを開発できる。",
  },
  {
    title: "Spectral",
    role: "Lint",
    description:
      "OpenAPI ドキュメントの記述ルールを検査する。命名規則や必須項目の欠落を CI で自動チェックできる。",
  },
];

export default function WhatIsOpenApi() {
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
            OpenAPI 仕様とは
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            OpenAPI Specification（OAS）は、REST API
            を機械可読な形式で記述するための標準フォーマットです。 YAML または
            JSON で「どの URL に・どんなリクエストを送ると・何が返るか」を
            一つのファイルに書き、それをドキュメント生成・モック・型生成・契約テストの
            「単一の正本（source of truth）」として使います。
          </p>
        </div>

        <WhyNowBox tags={["OpenAPI", "OAS", "Swagger", "YAML", "契約"]}>
          <p>
            前章で API を「クライアントとサーバの契約」と捉え直しました。
            その契約を文章ではなく<strong>機械可読なファイル</strong>
            として書くのが OpenAPI
            です。契約をコードと同じリポジトリで管理できれば、
            ドキュメントの陳腐化・型のズレ・モックの手作業といった問題を、
            ツールに肩代わりさせられます。OpenAPI を学ぶことは、
            「契約を一度書けば複数の成果物が自動で揃う」仕組みを手に入れることです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* OpenAPI とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              OpenAPI は REST API の「設計図」
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              OpenAPI Specification は、REST API
              の構造を決まった書式で記述するための仕様です。
              エンドポイントのパス、HTTP
              メソッド、パラメータ、リクエストボディ、
              レスポンスの形とステータスコードを、人間にもツールにも読める形で表現します。
              出力は YAML または JSON
              のどちらでもよく、内容は同じです。慣習的にファイル名は{" "}
              <code>openapi.yaml</code> または <code>openapi.json</code>{" "}
              が使われます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">人間が読む</p>
                  <p className="text-muted-foreground">
                    Swagger UI / Redoc で API リファレンスとして閲覧
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">ツールが読む</p>
                  <p className="text-muted-foreground">
                    型生成・モック・Lint・契約テストの入力になる
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">正本になる</p>
                  <p className="text-muted-foreground">
                    1 つのファイルから複数の成果物が自動で揃う
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="仕様であって実装ではない">
              OpenAPI は API の「書き方の規約」を定めるものであって、
              サーバの実装言語やフレームワークには依存しません。 Node.js でも Go
              でも Python でも、同じ OpenAPI ドキュメントで契約を表現できます。
            </InfoBox>
          </section>

          {/* Swagger との関係 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Swagger と OpenAPI の関係
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここが最も混同されやすい点です。歴史的な経緯を押さえると整理できます。
              元々この仕様は「Swagger 仕様」と呼ばれていました。 2015 年に仕様が
              OpenAPI Initiative（Linux Foundation 傘下）に寄贈され、 バージョン
              3.0 から名称が「OpenAPI Specification」に改称されました。 つまり
              2.0 までが Swagger、3.0 以降が OpenAPI という同じ系譜の仕様です。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-2 pr-4 font-bold text-foreground">
                      名称
                    </th>
                    <th className="py-2 pr-4 font-bold text-foreground">
                      指すもの
                    </th>
                    <th className="py-2 font-bold text-foreground">補足</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      Swagger 2.0
                    </td>
                    <td className="py-2 pr-4">旧称時代の仕様バージョン</td>
                    <td className="py-2">現在の OpenAPI 3.x の前身</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      OpenAPI 3.x
                    </td>
                    <td className="py-2 pr-4">改称後の仕様そのもの</td>
                    <td className="py-2">機械可読な API 記述フォーマット</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-foreground">
                      Swagger（現在）
                    </td>
                    <td className="py-2 pr-4">SmartBear のツール群の名前</td>
                    <td className="py-2">Swagger UI / Swagger Editor など</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              現在の「Swagger」は、SmartBear 社が提供するツール群（Swagger
              UI、Swagger Editor など）のブランド名を指します。
              仕様そのものは「OpenAPI」、ツールの名前として「Swagger」が残っている、
              と覚えると混乱しません。
            </p>
          </section>

          {/* バージョン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              バージョン: 3.0 系と 3.1
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              現在広く使われているのは 3.0 系と 3.1
              です。両者の最も大きな違いはスキーマの扱いです。 3.0 系は JSON
              Schema の一部を取り入れつつ独自の差分を持っていましたが、 3.1 では
              JSON Schema の Draft 2020-12
              と完全互換になりました。これにより、JSON Schema の表現をそのまま
              OpenAPI のスキーマとして使えるようになっています。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-2 pr-4 font-bold text-foreground">
                      バージョン
                    </th>
                    <th className="py-2 pr-4 font-bold text-foreground">
                      スキーマ
                    </th>
                    <th className="py-2 font-bold text-foreground">特徴</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      3.0.x
                    </td>
                    <td className="py-2 pr-4">
                      JSON Schema 部分準拠（独自差分あり）
                    </td>
                    <td className="py-2">対応ツールが最も多く枯れている</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-foreground">
                      3.1.x
                    </td>
                    <td className="py-2 pr-4">
                      JSON Schema 2020-12 と完全互換
                    </td>
                    <td className="py-2">
                      スキーマ資産を共有しやすい。新規はこちら推奨
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="success" title="3.1 で JSON Schema と整合した意義">
              3.0 系では OpenAPI 独自のスキーマ方言が必要で、 既存の JSON Schema
              資産をそのまま流用できない場面がありました。 3.1 で JSON Schema
              2020-12
              と完全互換になったことで、バリデーション・型生成・他システムとの
              スキーマ共有が一貫した仕組みで扱えるようになりました。
              ただしツールの 3.1
              対応状況には差があり、移行時は使用ツールの対応版を確認するのが現実的です。
            </InfoBox>
          </section>

          {/* 最小の OpenAPI ドキュメント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              最小の OpenAPI ドキュメント
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              OpenAPI ドキュメントには、必須のトップレベル項目があります。
              バージョンを示す <code>openapi</code>、API のメタ情報を書く{" "}
              <code>info</code>、 そしてエンドポイントを定義する{" "}
              <code>paths</code> です。 下は「ユーザーを 1
              件取得する」だけを定義した最小例です。
            </p>

            <CodeBlock
              language="yaml"
              title="openapi.yaml（最小構成）"
              code={`openapi: 3.1.0
info:
  title: User API
  version: 1.0.0
paths:
  /users/{userId}:
    get:
      summary: ユーザーを 1 件取得する
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      responses:
        "200":
          description: 取得成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
                  email:
                    type: string
                    format: email`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              このファイルだけで、Swagger UI はリファレンスを描画でき、Prism
              はモックサーバを立てられ、openapi-typescript は型を生成できます。1
              つの契約から複数の成果物が派生する—— これが OpenAPI
              を「正本」と呼ぶ理由です。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Swagger と OpenAPI の関係として正しいのはどれ？"
              options={[
                {
                  label:
                    "OpenAPI は Swagger を置き換えるために作られた、まったく別系統の競合仕様である",
                },
                {
                  label:
                    "2.0 までが「Swagger 仕様」、3.0 から「OpenAPI 仕様」に改称された同じ系譜で、現在の Swagger は SmartBear のツール群の名前",
                  correct: true,
                },
                {
                  label:
                    "Swagger は JSON 専用、OpenAPI は YAML 専用という記述形式の違いを指す名称である",
                },
                {
                  label:
                    "OpenAPI はフロントエンド用、Swagger はバックエンド用という用途の違いを指す",
                },
              ]}
              explanation="元は「Swagger 仕様」と呼ばれ、3.0 から「OpenAPI Specification」に改称されました。両者は同じ系譜の仕様です。現在「Swagger」と言うと、SmartBear が提供する Swagger UI / Swagger Editor などのツール群を指します。記述形式（YAML / JSON）はどちらの名称とも無関係です。"
            />
          </section>

          {/* 契約を正本にする理由 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              なぜ契約を明文化するのか
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              契約を文章のドキュメントだけで管理すると、実装と少しずつズレていきます。
              「ドキュメントには <code>id</code>{" "}
              は数値とあるのに、実際は文字列が返る」といった事故は、
              ドキュメントが手動更新で、検証されないことから生まれます。 OpenAPI
              ドキュメントを<strong>正本</strong>に据えると、
              次の成果物がすべて同じファイルから派生します。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <span className="font-bold text-foreground">
                    ドキュメント自動生成:
                  </span>{" "}
                  契約を書けば API リファレンスが常に最新になる
                </li>
                <li>
                  <span className="font-bold text-foreground">
                    モックサーバ:
                  </span>{" "}
                  実装前でも契約どおりに応答するサーバを立てられる
                </li>
                <li>
                  <span className="font-bold text-foreground">型生成:</span>{" "}
                  TypeScript の型をコードと契約で一致させられる
                </li>
                <li>
                  <span className="font-bold text-foreground">契約テスト:</span>{" "}
                  実装が契約どおりに応答しているかを自動検証できる
                </li>
              </ul>
            </div>

            <InfoBox type="warning" title="正本は 1 つに保つ">
              OpenAPI の運用で崩れやすいのは「正本が複数できる」ことです。
              実装側で別のスキーマを手書きし、OpenAPI
              ファイルと二重管理になると、結局ズレが再発します。 正本は{" "}
              <code>openapi.yaml</code> など 1
              箇所に定め、型もモックもそこから生成する一方向の流れを守ります。
            </InfoBox>
          </section>

          {/* エコシステム */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              OpenAPI のエコシステム
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              OpenAPI
              ドキュメントを正本にすると、それを入力にする多くのツールが使えます。
              代表的なものを役割ごとに挙げます。これらは「同じ 1
              つのファイル」を共有して動くため、ツールを増やしても契約は 1
              つのままです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ecosystemTools.map((tool) => (
                <div
                  key={tool.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-baseline justify-between mb-1 gap-2">
                    <h3 className="font-bold text-foreground text-base">
                      {tool.title}
                    </h3>
                    <span className="text-xs text-primary font-medium whitespace-nowrap">
                      {tool.role}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="OpenAPI ドキュメントを「正本（source of truth）」として運用する利点はどれ？"
              options={[
                { label: "API のレスポンスが自動的に速くなる" },
                {
                  label:
                    "1 つの契約ファイルからドキュメント・モック・型・契約テストが派生し、実装とのズレを防げる",
                  correct: true,
                },
                { label: "サーバの実装言語を YAML に統一できる" },
                {
                  label:
                    "クライアントが API キーなしでアクセスできるようになる",
                },
              ]}
              explanation="OpenAPI を正本に据える価値は、1 つの契約ファイルから複数の成果物（ドキュメント・モックサーバ・型定義・契約テスト）が自動で派生し、すべてが同じ契約を参照する点にあります。これにより、手動更新によるドキュメントと実装のズレを防げます。応答速度や実装言語、認証とは関係ありません。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "OpenAPI Specification（公式）",
                  url: "https://spec.openapis.org/oas/latest.html",
                  description:
                    "OpenAPI Initiative が公開する最新仕様の本文。トップレベル項目の定義を確認できる",
                },
                {
                  title: "OpenAPI Initiative",
                  url: "https://www.openapis.org/",
                  description:
                    "仕様を策定する団体の公式サイト。バージョンの歴史と関連情報がまとまっている",
                },
                {
                  title: "Swagger - OpenAPI とは",
                  url: "https://swagger.io/specification/",
                  description:
                    "SmartBear（Swagger）による仕様解説。ツール群と仕様の関係も把握できる",
                },
                {
                  title: "JSON Schema 公式サイト",
                  url: "https://json-schema.org/",
                  description:
                    "OpenAPI 3.1 が互換となった JSON Schema の仕様。スキーマ記述の基礎",
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
