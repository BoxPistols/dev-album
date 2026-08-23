import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const componentSlots = [
  {
    title: "schemas",
    description:
      "データモデルの形（User、Order など）。$ref で最も多く参照される。型生成・検証の正本になる。",
  },
  {
    title: "responses",
    description:
      "再利用するレスポンス定義。共通のエラーレスポンス（404、500 など）をまとめて参照する。",
  },
  {
    title: "parameters",
    description:
      "共通のクエリ・パスパラメータ。ページネーションの limit / offset などを各 path から参照する。",
  },
  {
    title: "requestBodies",
    description:
      "再利用するリクエストボディ定義。同じ入力形式を複数の操作で使い回す。",
  },
  {
    title: "securitySchemes",
    description:
      "認証方式の定義（Bearer、API Key、OAuth2 など）。各操作の security から名前で参照する。",
  },
];

const constraintKeywords = [
  {
    keyword: "type / format",
    example: "type: string, format: email / uuid / date-time",
    description:
      "基本型と書式。format は補助的なヒントで、検証の厳密さは実装に依存する。",
  },
  {
    keyword: "required",
    example: "required: [id, name]",
    description:
      "必須プロパティの名前を配列で列挙する。properties の中ではなくスキーマ直下に書く。",
  },
  {
    keyword: "enum",
    example: "enum: [active, suspended, deleted]",
    description: "取りうる値を限定する。状態（status）などで多用される。",
  },
  {
    keyword: "数値・文字列の制約",
    example: "minLength / maxLength / minimum / maximum",
    description:
      "長さや範囲の境界。バリデーションの根拠になり、生成コードにも反映できる。",
  },
];

export default function SchemaComponents() {
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
            スキーマとコンポーネント
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            OpenAPI では、データモデルを <code>components/schemas</code>{" "}
            に一度だけ定義し、 各エンドポイントから <code>$ref</code>{" "}
            で参照して再利用します。 同じ User
            の形を何度も書く代わりに「正本」を一つ用意することで、
            ドキュメント・型生成・バリデーションを一つの仕様から一気通貫で揃えられます。
          </p>
        </div>

        <WhyNowBox
          tags={["OpenAPI", "schemas", "$ref", "JSON Schema", "再利用"]}
        >
          <p>
            エンドポイントが増えるほど、同じデータ構造が仕様のあちこちに散らばります。
            User の形を 10 箇所に直書きすると、項目を 1 つ足すたびに 10
            箇所を直すことになり、 修正漏れが必ず起きます。
            <strong>
              components/schemas にモデルを集約し、 $ref で参照する
            </strong>
            のは、コードでいう「関数の切り出し」と同じ DRY の考え方です。
            ここを押さえると、OpenAPI が単なるドキュメントではなく
            「型とバリデーションの単一の正本」として効いてくる理由が見えてきます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* schemas と $ref */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              components/schemas に正本を置く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              データモデルは <code>components/schemas</code>{" "}
              の下に名前付きで定義します。
              各エンドポイント（paths）では中身を直書きせず、
              <code>$ref: "#/components/schemas/User"</code> のように JSON
              Pointer で参照します。 これで User の定義は仕様内に 1
              箇所だけになり、変更が全参照に伝播します。
            </p>

            <CodeBlock
              language="yaml"
              title="schemas に User を定義し、paths から $ref で参照する"
              code={`components:
  schemas:
    User:
      type: object
      required: [id, email, createdAt]
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email
        name:
          type: string
          maxLength: 100
        status:
          type: string
          enum: [active, suspended, deleted]
        createdAt:
          type: string
          format: date-time

paths:
  /users/{id}:
    get:
      summary: ユーザーを 1 件取得
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>$ref</code> の値はファイル内の場所を指す JSON Pointer です。
              <code>#</code> はドキュメントのルート、続く{" "}
              <code>/components/schemas/User</code> が
              その中の位置を表します。別ファイルへの参照 （
              <code>./schemas/user.yaml#/User</code>{" "}
              など）も書けますが、まずは同一ファイル内の
              再利用から始めるのが扱いやすいです。
            </p>

            <InfoBox type="info" title="$ref はコードの「関数呼び出し」に近い">
              直書きを <code>$ref</code>{" "}
              に置き換える作業は、重複コードを関数に切り出すのと同じです。
              定義（正本）は 1 箇所、呼び出し（参照）は何箇所でも。
              モデルに項目を 1 つ足したいとき、直すのは schemas
              の定義だけで済みます。
            </InfoBox>
          </section>

          {/* JSON Schema ベース */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              スキーマは JSON Schema がベース
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              OpenAPI のスキーマ記述は JSON Schema をベースにしています
              （OpenAPI 3.1 は JSON Schema との互換性が高く、3.0
              は一部に差分があります）。
              <code>type</code> で基本型を、<code>properties</code> で各項目を、
              <code>required</code>{" "}
              で必須項目を、そして各種キーワードで制約を表現します。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-border">
                    <th className="py-2 pr-4 font-semibold">キーワード</th>
                    <th className="py-2 pr-4 font-semibold">例</th>
                    <th className="py-2 font-semibold">役割</th>
                  </tr>
                </thead>
                <tbody>
                  {constraintKeywords.map((row) => (
                    <tr
                      key={row.keyword}
                      className="border-b border-border last:border-0 align-top"
                    >
                      <td className="py-2 pr-4 font-medium text-primary whitespace-nowrap">
                        {row.keyword}
                      </td>
                      <td className="py-2 pr-4 text-muted-foreground">
                        <code className="text-xs">{row.example}</code>
                      </td>
                      <td className="py-2 text-muted-foreground">
                        {row.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              「値を持たない」ことを許す表現は、バージョンで書き方が変わる代表例です。
              OpenAPI 3.0 では <code>nullable: true</code> を付けます。 3.1 では
              JSON Schema に揃い、<code>type</code> を配列にして
              <code>type: [string, "null"]</code>{" "}
              と書きます。同じ意図でも構文が違うため、
              対象バージョンを確認してから書くのが安全です。
            </p>

            <CodeBlock
              language="yaml"
              title="nullable の書き方はバージョンで変わる"
              code={`# OpenAPI 3.0
deletedAt:
  type: string
  format: date-time
  nullable: true

# OpenAPI 3.1（JSON Schema に準拠）
deletedAt:
  type: [string, "null"]
  format: date-time`}
            />

            <InfoBox type="warning" title="format は「保証」ではなく「ヒント」">
              <code>format: email</code> や <code>format: uuid</code>{" "}
              は書式の意図を伝えますが、
              実際にどこまで厳密に検証されるかは利用するツールやバリデータの実装に依存します。
              「format を書けば必ず弾かれる」と思い込まず、
              アプリ側の入力検証も別途用意するのが現実的です。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="components/schemas に User を定義し、各 path から $ref で参照する一番の目的は？"
              options={[
                { label: "レスポンスの転送量を小さくするため" },
                {
                  label:
                    "モデル定義を 1 箇所に集約して再利用し、変更を全参照に一括反映するため（DRY）",
                  correct: true,
                },
                { label: "API の応答速度を上げるため" },
                { label: "認証を不要にするため" },
              ]}
              explanation="$ref は「定義の参照」です。User の形を schemas に 1 箇所だけ定義し、各エンドポイントから参照することで、項目の追加・変更が全参照に一括で反映されます。これはコードで重複を関数に切り出すのと同じ DRY の考え方で、性能や転送量とは関係ありません。"
            />
          </section>

          {/* スキーマの合成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              allOf / oneOf / anyOf でスキーマを合成する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              既存のスキーマを組み合わせて新しいスキーマを作るには、合成キーワードを使います。
              用途で 3 つを使い分けます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  allOf
                </h3>
                <p
                  className="text-xs text-primary font-medium mb-2"
                  style={{ fontSize: 13 }}
                >
                  すべてを満たす（合成・継承的）
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  複数スキーマをマージする。共通の基底スキーマに差分を足す「継承」的な使い方が定番。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  oneOf
                </h3>
                <p
                  className="text-xs text-primary font-medium mb-2"
                  style={{ fontSize: 13 }}
                >
                  ちょうど 1 つに一致
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  候補のうち厳密に 1
                  つだけに一致する多態。種類で分岐するレスポンスに使う。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  anyOf
                </h3>
                <p
                  className="text-xs text-primary font-medium mb-2"
                  style={{ fontSize: 13 }}
                >
                  1 つ以上に一致
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  候補のいずれか（複数可）に一致すればよい。緩い「どれか」の表現。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              下は <code>allOf</code> の例です。共通項目を持つ{" "}
              <code>BaseUser</code> を基底にして、 管理者だけが持つ項目を足した{" "}
              <code>AdminUser</code> を合成しています。
              基底を直すと、それを合成した全スキーマに反映されます。
            </p>

            <CodeBlock
              language="yaml"
              title="allOf で基底スキーマに差分を合成する"
              code={`components:
  schemas:
    BaseUser:
      type: object
      required: [id, email]
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email

    AdminUser:
      allOf:
        - $ref: "#/components/schemas/BaseUser"
        - type: object
          required: [permissions]
          properties:
            permissions:
              type: array
              items:
                type: string

    # oneOf: 種類で分岐する多態（discriminator で判別を明示できる）
    Notification:
      oneOf:
        - $ref: "#/components/schemas/EmailNotification"
        - $ref: "#/components/schemas/PushNotification"
      discriminator:
        propertyName: channel`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>oneOf</code> / <code>anyOf</code> に
              <code>discriminator</code> を添えると、どのプロパティ （ここでは{" "}
              <code>channel</code>
              ）を見れば種類を判別できるかをツールに伝えられます。
              コード生成や検証が分岐を扱いやすくなります。
            </p>
          </section>

          {/* example で例示 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              example / examples で具体値を示す
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              型と制約だけでは「実際にどんな値が入るのか」が伝わりにくいことがあります。
              <code>example</code>（単一の例）や <code>examples</code>
              （名前付きの複数例）を
              添えると、ドキュメントの読み手が一目で具体像を掴め、モックサーバの応答にも使われます。
            </p>

            <CodeBlock
              language="yaml"
              title="スキーマに example を添える"
              code={`components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
          example: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
        email:
          type: string
          format: email
          example: "hanako@example.com"
        status:
          type: string
          enum: [active, suspended, deleted]
          example: "active"`}
            />

            <InfoBox
              type="success"
              title="スキーマを正本にすると一気通貫になる"
            >
              schemas
              を「型とバリデーションの単一の正本」と位置づけると、その仕様から
              TypeScript
              などの型定義を生成し、サーバ・クライアント双方の入出力検証に同じスキーマを使え、
              モックやドキュメントも同じ定義から導けます。
              仕様・型・検証がバラバラに育つのを防ぎ、ズレが入り込む隙間を減らせます。
            </InfoBox>
          </section>

          {/* components の他のスロット */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              components には schemas 以外も置ける
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>components</code> は再利用部品の置き場で、
              <code>schemas</code>{" "}
              はその一部です。レスポンス・パラメータ・リクエストボディ・
              認証方式なども、ここにまとめて <code>$ref</code> で参照できます。
              繰り返し出てくる定義はここに集約するのが基本方針です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {componentSlots.map((slot) => (
                <div
                  key={slot.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    <code>{slot.title}</code>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {slot.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              たとえば共通のエラーレスポンスを <code>components/responses</code>{" "}
              に定義しておけば、 各操作の <code>responses</code> から{" "}
              <code>$ref</code> で参照でき、 404 や 500
              の形を仕様全体で統一できます。schemas での再利用と同じ発想を、
              レスポンスやパラメータにも広げる、と捉えると分かりやすいです。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="共通の項目を持つ基底スキーマに差分を足して新しいスキーマを作りたい。適した合成キーワードは？"
              options={[
                {
                  label: "allOf（複数スキーマをすべて満たすよう合成する）",
                  correct: true,
                },
                { label: "oneOf（候補のうち厳密に 1 つに一致）" },
                { label: "anyOf（候補のいずれか 1 つ以上に一致）" },
                { label: "enum（取りうる値を限定）" },
              ]}
              explanation="allOf は列挙したスキーマをすべて満たす＝マージする合成で、基底スキーマに差分を足す「継承的」な使い方に向きます。oneOf / anyOf は型の分岐（多態）を表すためのもので、合成の用途が異なります。enum は値の限定で合成とは無関係です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "OpenAPI Specification - Components Object",
                  url: "https://spec.openapis.org/oas/latest.html",
                  description:
                    "components の各スロット（schemas / responses / parameters 等）と $ref の正式定義",
                },
                {
                  title: "OpenAPI Specification - Schema Object",
                  url: "https://spec.openapis.org/oas/latest.html",
                  description:
                    "type / properties / required / allOf / oneOf / discriminator などスキーマ記述の仕様",
                },
                {
                  title: "JSON Schema - 公式サイト",
                  url: "https://json-schema.org/",
                  description:
                    "OpenAPI のスキーマ記述の土台となる JSON Schema の仕様とガイド",
                },
                {
                  title: "Swagger - Reusing Descriptions ($ref)",
                  url: "https://swagger.io/docs/specification/v3_0/components/",
                  description:
                    "components と $ref による再利用を図解付きで解説したチュートリアル",
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
