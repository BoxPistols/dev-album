import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

// モックサーバを使う典型的な場面（3 ケース）
const mockUseCases = [
  {
    title: "フロントの並行開発",
    description:
      "バックエンドの実装完了を待たずに、契約（OpenAPI）に沿ったレスポンスでフロントを作り始められる。API が後から実装されても、契約が同じなら差し替えるだけで済む。",
  },
  {
    title: "設計レビューの前倒し",
    description:
      "モックは「契約の実行可能なプレビュー」。レビュアーが実際にリクエストを送って手触りを確認できるので、URL 設計やレスポンス形状の問題を実装前に見つけられる。",
  },
  {
    title: "不安定な依存先の代替",
    description:
      "外部 API やまだ不安定なサービスの代わりにモックを立てると、ローカル開発や CI が外部状態に左右されず安定する。",
  },
];

export default function MockServer() {
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
            モックサーバから始める
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            OpenAPI
            で契約を書いたら、その契約をそのまま動くサーバとして起動できます。
            モックサーバを使うと、フロントエンドはバックエンドの実装完了を待たずに開発を始められ、
            設計レビューを「動かしながら」前倒しで回せます。 ここでは Stoplight
            製の Prism を例に、契約から数秒でモックを立てる流れを押さえます。
          </p>
        </div>

        <WhyNowBox
          tags={["OpenAPI", "Prism", "モックサーバ", "並行開発", "契約駆動"]}
        >
          <p>
            「バックエンドができてからフロントを作る」という直列の進め方は、待ち時間を生みます。
            一方で、フロントが勝手にダミーデータを{" "}
            <code>const dummy = [...]</code>{" "}
            とハードコードすると、実装と乖離して
            <strong>後で大きく作り直す</strong>羽目になりがちです。
            この両方を避けるのが「契約をモックとして動かす」やり方です。 OpenAPI
            という単一の契約を起点にモックを生成すれば、フロントが触っているレスポンスは常に契約と一致し、
            並行開発と設計レビューの前倒しを同時に実現できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* なぜモック */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              なぜモックサーバが必要か
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              モックサーバは、OpenAPI
              などの契約を読み込んで「契約どおりのレスポンスを返すだけ」のサーバです。
              実際のビジネスロジックやデータベースは持ちません。
              これだけのものが、開発の進め方を直列から並行へと変えます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">OpenAPI 契約</p>
                  <p className="text-muted-foreground">
                    パス・スキーマ・example を機械可読に定義した 1 枚の仕様
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">モックサーバ</p>
                  <p className="text-muted-foreground">
                    契約を読み込んで、契約どおりのレスポンスを返すだけのサーバ
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    フロント / レビュアー
                  </p>
                  <p className="text-muted-foreground">
                    実 API を待たずに、契約に沿ったレスポンスで開発・確認できる
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockUseCases.map((useCase) => (
                <div
                  key={useCase.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Prism で起動 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Prism で契約からモックを起動する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Prism は Stoplight 製のオープンソースのモックサーバです。 OpenAPI
              ファイルを引数に渡すだけで、契約に沿ったエンドポイントを持つ HTTP
              サーバが立ち上がります。
              <code>npx</code> 経由ならインストールせずにそのまま試せます。
            </p>

            <CodeBlock
              language="bash"
              title="Prism でモックサーバを起動"
              code={`# グローバルインストール
npm install -g @stoplight/prism-cli

# OpenAPI ファイルからモックを起動
prism mock openapi.yaml

# インストールせずに試す場合
npx @stoplight/prism-cli mock openapi.yaml

# 起動すると次のように待ち受ける
# [CLI] …  awaiting  Starting Prism…
# [CLI] ℹ  info      GET   http://127.0.0.1:4010/users/42
# [CLI] ▶  start     Prism is listening on http://127.0.0.1:4010`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              レスポンスの中身は契約から決まります。 Prism は、対象のパスに
              <strong>example が定義されていればそれを優先して返し</strong>、
              example がなければ既定の <strong>static 生成</strong>{" "}
              でスキーマを辿って静的な値を組み立てます（<code>default</code> 値 →{" "}
              <code>examples</code> 配列の先頭 → nullable なら{" "}
              <code>null</code> → <code>format</code>{" "}
              指定があればその format に応じた固定値 → いずれも無ければ string は{" "}
              <code>"string"</code>、number は <code>0</code>）。 つまり契約さえあれば、データを 1
              件も書かなくてもモックは成立します。 リクエストごとにランダムな値を返す
              dynamic モードを使う場合は、起動時に{" "}
              <code>prism mock -d openapi.yaml</code> とするか、リクエストに{" "}
              <code>Prefer: dynamic=true</code> を付けます。
            </p>
          </section>

          {/* example 付き契約 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              example でレスポンスを具体化する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              スキーマだけのモックは「型は合っているが内容は適当」になりがちです（名前が{" "}
              <code>string</code>、日付が <code>2019-08-24T14:15:22Z</code>{" "}
              のような汎用値になる）。 契約に <code>example</code>{" "}
              を書いておくと、現実に近い具体値が返り、
              フロントの見た目確認やレビューの精度が上がります。
            </p>

            <CodeBlock
              language="yaml"
              title="openapi.yaml — example 付きのレスポンス定義"
              code={`paths:
  /users/{id}:
    get:
      summary: ユーザーを 1 件取得
      parameters:
        - name: id
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
                required: [id, name, email]
                properties:
                  id: { type: integer }
                  name: { type: string }
                  email: { type: string, format: email }
                  createdAt: { type: string, format: date-time }
              example:
                id: 42
                name: 田中 花子
                email: hanako@example.com
                createdAt: "2026-06-20T09:00:00Z"`}
            />

            <InfoBox
              type="success"
              title="example を充実させるほどモックの質が上がる"
            >
              モックの説得力は、契約に書かれた example の質でほぼ決まります。
              代表値・境界値・長い名前・空配列など、実際に起こりうるパターンを
              example
              に書き足しておくと、フロントの表示崩れやレビューでの見落としを早期に発見できます。
              「型が合っているだけのモック」と「現実的なモック」では、レビューで拾えるバグの数が変わります。
            </InfoBox>
          </section>

          {/* モックを叩く */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              モックを curl で叩いて確認する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              起動したモックは普通の HTTP サーバなので、curl やフロントの fetch
              からそのまま叩けます。 example
              を定義したパスにリクエストすると、その example
              がそのまま返ります。
            </p>

            <CodeBlock
              language="bash"
              title="モックにリクエストを送る"
              code={`# example が定義されているのでその値がそのまま返る
curl http://127.0.0.1:4010/users/42 \\
  -H "Accept: application/json"

# レスポンス（契約の example と一致）
# {
#   "id": 42,
#   "name": "田中 花子",
#   "email": "hanako@example.com",
#   "createdAt": "2026-06-20T09:00:00Z"
# }`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              契約に複数の <code>examples</code>{" "}
              （複数形）を定義しておくと、Prism は <code>Prefer</code>{" "}
              ヘッダーで返すパターンを切り替えられます。
              成功・エラー・空など、画面ごとに見たい状態を指定して取得できます。
            </p>

            <CodeBlock
              language="bash"
              title="Prefer ヘッダーでレスポンスのパターンを切り替える"
              code={`# ステータスコードを指定して 404 のレスポンスを返させる
curl http://127.0.0.1:4010/users/999 \\
  -H "Prefer: code=404"

# 名前付き example を指定して特定パターンを返させる
curl http://127.0.0.1:4010/users/42 \\
  -H "Prefer: example=emptyName"`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="OpenAPI からモックサーバを立てる主な利点はどれ？"
              options={[
                { label: "本番のデータベースを高速化できる" },
                {
                  label:
                    "バックエンドの完成を待たずにフロントを並行開発でき、契約に沿った設計レビューを前倒しできる",
                  correct: true,
                },
                { label: "API のレスポンスが暗号化される" },
                { label: "OpenAPI ファイルが不要になる" },
              ]}
              explanation="モックサーバは契約（OpenAPI）に沿ったレスポンスを返すため、フロントは実装完了を待たずに並行で開発できます。さらにモックは「契約の実行可能なプレビュー」なので、レビュアーが実際に叩いて URL 設計やレスポンス形状を実装前に確認でき、設計レビューを前倒しできます。"
            />
          </section>

          {/* バリデーションプロキシ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              モックの先へ：バリデーションプロキシ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              実 API が出来てきたら、Prism は <code>mock</code> ではなく{" "}
              <code>proxy</code> モードでも使えます。 これは実 API
              へリクエストを中継しつつ、
              <strong>
                行き帰りのリクエスト・レスポンスが契約に沿っているかを検証する
              </strong>
              モードです。契約違反（必須フィールド欠落、型の不一致など）を検出して報告します。
            </p>

            <CodeBlock
              language="bash"
              title="proxy モードで契約適合を検証しながら中継する"
              code={`# 実 API（http://localhost:3000）へ中継しつつ契約と照合する
prism proxy openapi.yaml http://localhost:3000

# 契約に違反すると、該当箇所が違反として報告される`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              これにより、開発の初期は「契約 → モック」でフロントを進め、
              実装が揃ってきたら「契約 ↔ 実 API」の適合を継続的に検証する、
              という一貫した流れを 1 つの契約で回せます。
            </p>

            <InfoBox
              type="warning"
              title="モックは「正しさ」ではなく「契約適合」を保証する"
            >
              モックが返すのは、あくまで契約に書いた example
              やスキーマどおりの値です。
              ビジネスロジックの正しさ（在庫が本当に足りているか、権限が妥当か等）は検証しません。
              モックで確認できるのは「契約の形が噛み合うか」までで、
              実際の振る舞いの正しさは実 API
              のテストで担保する、という役割分担を意識してください。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Prism の mock モードと proxy モードの違いとして正しいのはどれ？"
              options={[
                {
                  label:
                    "mock は契約から擬似レスポンスを返し、proxy は実 API へ中継しつつ契約適合を検証する",
                  correct: true,
                },
                { label: "mock は HTTPS 専用で、proxy は HTTP 専用である" },
                {
                  label:
                    "mock はデータベースに書き込み、proxy は読み取り専用になる",
                },
                { label: "両者に違いはなく、別名のエイリアスである" },
              ]}
              explanation="mock モードは実 API を持たない段階で、契約（example / スキーマ）から擬似レスポンスを生成して返します。proxy モードは実 API が存在する段階で、リクエストを実 API へ中継しながら、行き帰りが契約に沿っているかを検証します。前者は並行開発、後者は契約適合の継続検証に使います。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Prism 公式ドキュメント",
                  url: "https://docs.stoplight.io/docs/prism/674b27b261c3c-prism-overview",
                  description:
                    "Stoplight 製モックサーバ Prism の公式ガイド。mock / proxy モードや Prefer ヘッダーの使い方を網羅",
                },
                {
                  title: "Prism リポジトリ（GitHub）",
                  url: "https://github.com/stoplightio/prism",
                  description:
                    "Prism のソースとインストール手順。CLI オプションや動的レスポンス生成の挙動を確認できる",
                },
                {
                  title: "OpenAPI Specification - Example Object",
                  url: "https://spec.openapis.org/oas/latest.html#example-object",
                  description:
                    "OpenAPI 仕様の example / examples の定義。モックの質を左右する example の書き方の一次情報",
                },
                {
                  title: "OpenAPI Initiative",
                  url: "https://www.openapis.org/",
                  description:
                    "OpenAPI 仕様の公式サイト。契約駆動開発の起点となる仕様の全体像を把握できる",
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
