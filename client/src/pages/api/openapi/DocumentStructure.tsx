import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const topLevelKeys = [
  {
    key: "openapi",
    required: "必須",
    description:
      'OpenAPI 仕様のバージョン文字列（例 "3.1.0"）。ドキュメントのフォーマットを示す。データ自体のバージョンではない点に注意。',
  },
  {
    key: "info",
    required: "必須",
    description:
      'API のメタデータ。title / version は必須、description / contact / license などは任意。version はここでは API のバージョン（例 "1.2.0"）。',
  },
  {
    key: "servers",
    required: "任意",
    description:
      "ベース URL の配列。本番・ステージング・ローカルなどを列挙する。省略するとドキュメントを配信した場所からの相対パスが基準になる。",
  },
  {
    key: "paths",
    required: "任意",
    description:
      "エンドポイントの本体。パス → HTTP メソッド → 操作の定義をぶら下げる。3.1 では paths を省略できるが、実務ではほぼ必ず書く。",
  },
  {
    key: "components",
    required: "任意",
    description:
      "再利用部品の置き場。schemas / parameters / responses / securitySchemes などを定義し、$ref で参照して重複を避ける。",
  },
  {
    key: "security",
    required: "任意",
    description:
      "API 全体に適用する認証要件。components.securitySchemes で定義した方式を名前で参照する。操作ごとに上書きもできる。",
  },
  {
    key: "tags",
    required: "任意",
    description:
      "操作をグルーピングするためのラベル定義。description を付けられる。多くのドキュメント UI が tag 単位でセクションを分けて表示する。",
  },
];

const parameterLocations = [
  {
    in: "path",
    example: "/users/{id} の {id}",
    note: "URL パスの一部。required は必ず true。テンプレート内の名前と一致させる。",
  },
  {
    in: "query",
    example: "?page=2&limit=20",
    note: "クエリ文字列。フィルタ・ページネーションなど。required は任意。",
  },
  {
    in: "header",
    example: "X-Request-Id: abc",
    note: "リクエストヘッダー。Accept / Content-Type / Authorization は通常別扱いで定義しない。",
  },
  {
    in: "cookie",
    example: "Cookie: session=...",
    note: "Cookie 値。セッション管理などで使うが、Web API では query / header より出番は少ない。",
  },
];

export default function DocumentStructure() {
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
            OpenAPI ドキュメントの構造
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            OpenAPI ドキュメントは、API という「契約」を機械可読な形で書き下した
            1 つの設計図です。トップレベルのいくつかのキーと、その下にぶら下がる
            paths・components の入れ子を覚えれば、初めて見る仕様書でも
            「どこに何が書いてあるか」を素早く辿れるようになります。
            このページでは全体の骨格を、最小限の YAML を読みながら把握します。
          </p>
        </div>

        <WhyNowBox tags={["OpenAPI", "YAML", "paths", "components", "契約"]}>
          <p>
            API を叩くだけなら構造を知らなくても困りません。しかし
            <strong>仕様を読む・書く・レビューする</strong>側に回ると、 OpenAPI
            ドキュメントの骨格を把握しているかどうかで作業速度が変わります。
            「このパラメータはどこに渡すのか」「このレスポンスのスキーマはどこに定義されているのか」を
            素早く辿れると、フロントとバックの認識ずれを早い段階で潰せます。
            構造を覚えることは、契約を読み解く地図を手に入れることです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* トップレベルキー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              トップレベルの 7 つのキー
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              OpenAPI ドキュメントのルートには、決められたキーが並びます。
              すべてを毎回書くわけではなく、最小構成は <code>openapi</code> と
              <code>info</code>、そして実務では <code>paths</code> です。
              残りは必要に応じて足していきます。まずは各キーの役割を一望します。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-border">
                    <th className="pb-2 pr-4 font-bold">キー</th>
                    <th className="pb-2 pr-4 font-bold whitespace-nowrap">
                      要否
                    </th>
                    <th className="pb-2 font-bold">役割</th>
                  </tr>
                </thead>
                <tbody>
                  {topLevelKeys.map((row) => (
                    <tr
                      key={row.key}
                      className="border-b border-border last:border-0 align-top"
                    >
                      <td className="py-2 pr-4">
                        <code className="text-primary font-medium">
                          {row.key}
                        </code>
                      </td>
                      <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">
                        {row.required}
                      </td>
                      <td className="py-2 text-muted-foreground leading-relaxed">
                        {row.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="2 つの version を混同しない">
              <code>openapi</code> はドキュメントの書式バージョン（例 3.1.0）、
              <code>info.version</code> は API そのもののバージョン（例
              1.2.0）です。 前者は「この設計図のフォーマット」、後者は「この API
              のリリース」を指します。
              役割が違うので、片方を変えたからといって他方を合わせる必要はありません。
            </InfoBox>
          </section>

          {/* paths の入れ子構造 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              paths の入れ子構造
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>paths</code> はドキュメントの中心です。構造は 3
              段の入れ子で、 「パス → HTTP メソッド →
              操作（Operation）」の順にぶら下がります。
              同じパスに対して複数のメソッド（<code>get</code> と{" "}
              <code>post</code> など）を並べられます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="space-y-3 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    1. パス（例 /users, /users/{"{id}"}）
                  </p>
                  <p className="text-muted-foreground">
                    リソースを表す URL
                    テンプレート。中括弧でパスパラメータを埋め込む
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 md:ml-6">
                  <p className="font-bold text-primary mb-1">
                    2. HTTP メソッド（get / post / put / patch / delete ...）
                  </p>
                  <p className="text-muted-foreground">
                    そのパスに対する操作の種類。1 パスに複数並べられる
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 md:ml-12">
                  <p className="font-bold text-primary mb-1">
                    3. 操作（operationId / summary / parameters / requestBody /
                    responses）
                  </p>
                  <p className="text-muted-foreground">
                    1 つの API 操作の中身。入力・出力・説明をここに書く
                  </p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              操作の中で使う主なフィールドは、<code>operationId</code>
              （一意な識別子）、
              <code>summary</code> / <code>description</code>（説明）、
              <code>parameters</code>（パス・クエリなどの入力）、
              <code>requestBody</code>（リクエスト本文）、
              <code>responses</code>（ステータスコード別の出力）です。 GET
              には通常 <code>requestBody</code> を付けません。
            </p>
          </section>

          {/* parameters の in */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              parameters の <code>in</code> はどこに渡すか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>parameters</code> の各要素は <code>in</code> で
              「リクエストのどの場所に値を渡すか」を宣言します。取れる値は 4
              種類です。<code>name</code> と <code>in</code> の組み合わせで 1
              つのパラメータが一意に決まり、<code>schema</code> で型を、
              <code>required</code> で必須かどうかを定義します。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-border">
                    <th className="pb-2 pr-4 font-bold whitespace-nowrap">
                      in
                    </th>
                    <th className="pb-2 pr-4 font-bold">例</th>
                    <th className="pb-2 font-bold">補足</th>
                  </tr>
                </thead>
                <tbody>
                  {parameterLocations.map((row) => (
                    <tr
                      key={row.in}
                      className="border-b border-border last:border-0 align-top"
                    >
                      <td className="py-2 pr-4">
                        <code className="text-primary font-medium">
                          {row.in}
                        </code>
                      </td>
                      <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">
                        <code>{row.example}</code>
                      </td>
                      <td className="py-2 text-muted-foreground leading-relaxed">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox
              type="warning"
              title="path パラメータの required は必ず true"
            >
              <code>in: path</code> のパラメータは URL
              の一部なので、省略は構造上 ありえません。そのため{" "}
              <code>required: true</code> を明示する必要があり、
              <code>false</code> や省略はバリデーションエラーになります。 一方{" "}
              <code>query</code> パラメータの <code>required</code> は
              省略すると <code>false</code> 扱い（任意）になります。
            </InfoBox>
          </section>

          {/* responses の構造 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              responses はステータスコードごとに定義する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>responses</code> は HTTP
              ステータスコードをキーにしたマップです。 各コードには{" "}
              <code>description</code>（必須）と、本文を持つ場合は
              <code>content</code> を書きます。<code>content</code> は
              メディアタイプ（<code>application/json</code> など）ごとに
              <code>schema</code> を持ちます。成功時の <code>200</code>{" "}
              だけでなく、
              <code>404</code> や <code>400</code>{" "}
              など失敗時の応答も書くことで、 契約としての網羅性が上がります。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">"200"</p>
                  <p className="text-muted-foreground">
                    成功。content にレスポンスボディの schema を定義
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">"404"</p>
                  <p className="text-muted-foreground">
                    リソース不在。エラー形式の schema を定義しておく
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">"default"</p>
                  <p className="text-muted-foreground">
                    上記以外をまとめて受ける任意のフォールバック
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="description は省略できない">
              各レスポンスの <code>description</code>{" "}
              は仕様上の必須フィールドです。
              「成功」「リクエストが不正」など、そのステータスが何を意味するかを
              人間向けに一言書きます。空にするとドキュメントの検証で弾かれます。
            </InfoBox>
          </section>

          {/* 完全な YAML 断片 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ひとつなぎで読む YAML 断片
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここまでの要素を 1
              つのドキュメントにまとめると次のようになります。
              <code>GET /users/{"{id}"}</code> と <code>POST /users</code>{" "}
              を題材に、
              <code>parameters</code>・<code>requestBody</code>・
              <code>responses</code> がどこに位置するか、<code>$ref</code> で
              <code>components</code> を参照する流れを追ってみてください。
            </p>

            <CodeBlock
              language="yaml"
              title="openapi.yaml（抜粋）"
              code={`openapi: 3.1.0
info:
  title: Users API
  version: 1.2.0
  description: ユーザーを管理する最小 API

servers:
  - url: https://api.example.com/v1
    description: 本番

tags:
  - name: users
    description: ユーザー関連の操作

paths:
  /users/{id}:
    get:
      operationId: getUserById
      summary: ユーザーを 1 件取得
      tags: [users]
      parameters:
        - name: id
          in: path
          required: true
          description: 取得するユーザーの ID
          schema:
            type: integer
      responses:
        "200":
          description: 取得成功
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "404":
          description: ユーザーが存在しない
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /users:
    post:
      operationId: createUser
      summary: ユーザーを作成
      tags: [users]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/NewUser"
      responses:
        "201":
          description: 作成成功
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "400":
          description: リクエストが不正
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

components:
  schemas:
    User:
      type: object
      required: [id, name, email]
      properties:
        id: { type: integer }
        name: { type: string }
        email: { type: string, format: email }
    NewUser:
      type: object
      required: [name, email]
      properties:
        name: { type: string }
        email: { type: string, format: email }
    Error:
      type: object
      properties:
        message: { type: string }`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>$ref: "#/components/schemas/User"</code> は
              「同じドキュメント内の <code>components.schemas.User</code>{" "}
              を参照する」 という意味です。同じスキーマを <code>GET</code>{" "}
              の応答と
              <code>POST</code>{" "}
              の応答の両方で使い回せるため、定義の重複を避けられます。
              この参照の仕組みが、大きな仕様書を破綻させずに保つ鍵になります。
            </p>
          </section>

          {/* tags でグルーピング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              tags でドキュメントを整理する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              エンドポイントが増えると、<code>paths</code>{" "}
              の羅列は読みにくくなります。 各操作に <code>tags</code>{" "}
              を付け、トップレベルの <code>tags</code> で
              その説明を定義しておくと、Swagger UI や Redoc などの ドキュメント
              UI が tag 単位でセクションを分けて表示します。
              「users」「orders」「auth」のように業務ドメインで切るのが一般的です。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <code>tags</code> はあくまで表示・整理のためのメタ情報で、
              ルーティングや動作には影響しません。トップレベルでの定義は任意ですが、
              <code>description</code> を添えると UI
              上の説明として表示されるため、 書いておくと読み手に親切です。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="OpenAPI の paths はどの順で入れ子になっている？"
              options={[
                {
                  label: "HTTP メソッド → パス → responses",
                },
                {
                  label: "パス → HTTP メソッド → 操作（responses など）",
                  correct: true,
                },
                { label: "responses → パス → HTTP メソッド" },
                { label: "操作 → responses → パス" },
              ]}
              explanation="paths の下はまずパス（/users など）、その下に HTTP メソッド（get / post など）、さらにその下に操作の中身（operationId・parameters・requestBody・responses）が来ます。responses はメソッドの中の 1 フィールドです。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="クエリ文字列 ?page=2 のパラメータは parameters の in に何を指定する？"
              options={[
                { label: "path" },
                { label: "query", correct: true },
                { label: "header" },
                { label: "cookie" },
              ]}
              explanation="?page=2 のようなクエリ文字列の値は in: query で宣言します。URL パステンプレートの {id} は path、リクエストヘッダーは header、Cookie 値は cookie です。in は path / query / header / cookie の 4 種類です。"
            />
          </section>

          {/* InfoBox: operationId とコード生成 */}
          <section>
            <InfoBox
              type="success"
              title="operationId はコード生成で名前になる"
            >
              <code>operationId</code>{" "}
              はドキュメント内で一意な操作の識別子です。 openapi-generator や
              orval などのコード/型ジェネレータは、この値を
              生成する関数名やメソッド名のもとに使います。たとえば
              <code>getUserById</code> という operationId は、生成された
              クライアントで <code>getUserById()</code> のような関数になります。
              曖昧な名前や重複があると生成物の名前が崩れるため、
              <strong>キャメルケースで動詞＋対象を一意に</strong>付けておくと、
              後段のツールチェーンが安定します。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "OpenAPI Specification 3.1.0",
                  url: "https://spec.openapis.org/oas/v3.1.0",
                  description:
                    "OpenAPI の公式仕様本文。各トップレベルキー・Operation・Parameter の正確な定義を確認できる",
                },
                {
                  title: "OpenAPI Initiative - Learn",
                  url: "https://learn.openapis.org/",
                  description:
                    "OpenAPI Initiative による入門ガイド。ドキュメント構造を段階的に解説している",
                },
                {
                  title: "Swagger - Paths and Operations",
                  url: "https://swagger.io/docs/specification/paths-and-operations/",
                  description:
                    "paths・operations・parameters の書き方を例付きでまとめた解説",
                },
                {
                  title: "Swagger - Describing Parameters",
                  url: "https://swagger.io/docs/specification/describing-parameters/",
                  description:
                    "parameters の in（path / query / header / cookie）と schema の詳細",
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
