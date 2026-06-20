import { Link } from "wouter";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

// BE 観点 vs FE 観点を 1 行ずつ対比する表データ
const perspectives = [
  {
    axis: "主な関心",
    be: "正しさ・安全・永続",
    fe: "体験・状態・表示",
  },
  {
    axis: "リソースの見方",
    be: "DB のテーブル・データモデルに近い形",
    fe: "画面に必要な形（必要な項目だけ・整形済み）",
  },
  {
    axis: "バリデーション",
    be: "保存前の入力検証・認可（信頼の境界）",
    fe: "送信前の入力支援（最終的な担保はしない）",
  },
  {
    axis: "エラー",
    be: "一貫した形・正しいステータスで返す責務",
    fe: "loading / empty / error の表示に落とし込む",
  },
  {
    axis: "性能の悩み",
    be: "クエリ・インデックス・後方互換",
    fe: "over-fetch / under-fetch・往復回数",
  },
  {
    axis: "型",
    be: "スキーマ・マイグレーションを正本に管理",
    fe: "OpenAPI から型生成（openapi-typescript）",
  },
];

export default function BackendFrontend() {
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
            バックエンドとフロントエンドの API 設計
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            同じ API
            でも、バックエンド（BE）とフロントエンド（FE）では見ている景色が違います。
            BE は「正しく保存し、安全に返す」ことに、FE
            は「画面の状態を破綻なく表示する」ことに
            関心があります。違いを把握したうえで、両者が同じ正本（OpenAPI
            契約）を見て協業する方法を整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["OpenAPI", "RESTful", "契約ファースト", "型生成", "BFF"]}
        >
          <p>
            BE と FE を別々の人・チームが担当すると、認識のズレがそのまま
            <strong>バグ・手戻り・「動かない理由が分からない」状態</strong>
            を生みます。
            ズレの多くは「同じリソースを違う形でイメージしていた」ことに起因します。
            これを防ぐ鍵が、
            <strong>
              RESTful の原則を共通言語にし、OpenAPI を単一の正本にする
            </strong>
            ことです。土台が共通になれば、関心の違いは対立ではなく分業になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 共通の土台 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              共通の土台 — RESTful の原則と OpenAPI 契約
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              BE と FE は関心が違いますが、出発点は共通です。両者とも
              <strong>RESTful の原則</strong>——リソースを URL で表し、操作を
              HTTP メソッド（GET / POST / PUT /
              DELETE）で、結果をステータスコード（200 / 201 / 404 / 422
              等）で表す——という同じルールの上で会話します。これが
              「共通言語」です。さらに、その API の仕様を機械可読に書き下した
              <strong>OpenAPI</strong> を「契約の正本（single source of
              truth）」として 共有します。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    共通言語: RESTful
                  </p>
                  <p className="text-muted-foreground">
                    <code>GET /users/42</code> は「ユーザー 42 を取得」。
                    URL・メソッド・ステータスの意味は BE も FE も同じに読む。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">正本: OpenAPI</p>
                  <p className="text-muted-foreground">
                    リクエスト・レスポンスの形・型・必須項目を 1
                    ファイルに定義。 BE はそれに沿って実装し、FE
                    はそれから型を生成する。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="RESTful は「合意のショートカット」">
              リソース・メソッド・ステータスの意味が標準化されているので、毎回
              「この URL は何をする？」を相談しなくて済みます。<code>404</code>{" "}
              なら 「無い」、<code>201</code>{" "}
              なら「作成された」と、両者が同じ解釈を共有できる——
              これが共通言語としての RESTful の実利です。詳しくは
              <Link href="/react/api-design/openapi-swagger">
                <span className="text-primary underline underline-offset-2">
                  OpenAPI / Swagger の章
                </span>
              </Link>
              も参照してください。
            </InfoBox>
          </section>

          {/* BE 観点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              バックエンドの観点 — 正しさ・安全・永続
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              BE 側が API
              を設計するとき、中心にあるのは「正しく保存し、安全に返す」
              ことです。具体的には次のような関心を持ちます。
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed mb-6">
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  リソースとデータモデルの設計:
                </span>{" "}
                何をリソースとし、どう永続化するか。テーブル構造・正規化・関連の持ち方。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  入力バリデーションと認可:
                </span>{" "}
                保存前に入力を検証し、「この人がこの操作をしてよいか」を確認する。
                ここは<strong>信頼の境界</strong>で、FE の検証は当てにしない。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  後方互換とエラーの一貫性:
                </span>{" "}
                既存のクライアントを壊さずに API
                を進化させる。エラーは形・ステータスを
                揃えて、どのエンドポイントでも同じ作法で返す。
              </li>
            </ul>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              たとえば必須項目が欠けたリクエストには、FastAPI は既定で
              <code>422</code> を、構造化されたエラーボディで返します。FE
              はこの形に
              依存して「どのフィールドが足りないか」を画面に出すので、形の一貫性が
              そのまま FE の実装しやすさになります。
            </p>

            <CodeBlock
              language="json"
              title="FastAPI 既定の 422 レスポンスボディ（バリデーション失敗）"
              code={`{
  "detail": [
    {
      "type": "missing",
      "loc": ["body", "title"],
      "msg": "Field required",
      "input": {}
    }
  ]
}`}
            />

            <InfoBox
              type="warning"
              title="FE のバリデーションは「安全」ではなく「親切」"
            >
              FE 側の入力チェックはユーザー体験のためのものです。リクエストは
              <code>curl</code> や別クライアントから直接送れるため、
              <strong>最終的な正しさ・安全は必ず BE で担保</strong>します。 FE
              の検証はあくまで「送信前の親切」と位置づけます。
            </InfoBox>
          </section>

          {/* FE 観点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              フロントエンドの観点 — 体験・状態・表示
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              FE 側が API
              を見るとき、中心にあるのは「画面の状態を破綻なく表示する」
              ことです。1 つの画面は常に <code>loading</code> /{" "}
              <code>success</code> / <code>empty</code> / <code>error</code>{" "}
              のいずれかにいて、それぞれに必要なデータと表示があります。だから
              FE は、
              <strong>画面に必要な形でデータが返ってくること</strong>
              を望みます。
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed mb-6">
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  over-fetch / under-fetch を避けたい:
                </span>{" "}
                画面に使わない巨大なデータが返る（over-fetch）と無駄。逆に、 1
                画面のために何度も往復が必要（under-fetch）なのも遅い。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  扱いやすいエラー形:
                </span>{" "}
                エラー時にどのフィールドが問題かを一貫した形で受け取れると、
                エラー表示やフォームのハイライトが作りやすい。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  ページネーション・楽観的更新:
                </span>{" "}
                一覧は無限スクロール用にカーソルやページ情報が欲しい。更新は、
                応答を待たず先に UI を変える楽観的更新で速く見せたい。
              </li>
            </ul>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              これらの状態管理は、素の <code>fetch</code> でも書けますが、
              TanStack Query の <code>useQuery</code> / <code>useMutation</code>{" "}
              を使うと loading / error / キャッシュ /
              再取得を宣言的に扱えます。下は 「取得→状態分岐」の最小例です。
            </p>

            <CodeBlock
              language="tsx"
              title="FE は API を「画面の状態」として扱う（TanStack Query）"
              code={`import { useQuery } from "@tanstack/react-query";

function UserCard({ id }: { id: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      fetch(\`/api/users/\${id}\`).then((r) => r.json()),
  });

  if (isLoading) return <Spinner />; // loading
  if (isError) return <ErrorText />; // error
  if (!data) return <Empty />; // empty
  return <h2>{data.displayName}</h2>; // success
}`}
            />
          </section>

          {/* 相違点を表で整理 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              同じ /users/42 を、BE と FE は違う形で見る
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              関心の違いは、同じリソースの「見え方の違い」として現れます。BE は
              永続モデル（DB に近い形）でリソースを捉え、FE
              は画面に必要な形を望みます。 下の表で観点を並べて整理します。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      観点
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      BE（バックエンド）
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      FE（フロントエンド）
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {perspectives.map((p) => (
                    <tr key={p.axis} className="border-b border-border">
                      <td className="py-2 pr-4 font-bold text-foreground whitespace-nowrap align-top">
                        {p.axis}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {p.be}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {p.fe}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              具体例として、<code>/users/42</code> を 2
              つの視点で並べてみます。BE が
              永続モデルとして持っているデータと、FE が画面に必要とする形は、
              <strong>同じリソースでも構造が異なります</strong>。
            </p>

            <CodeBlock
              language="json"
              title="BE の永続モデル（DB に近い・内部項目も含む）"
              code={`{
  "id": 42,
  "first_name": "Hanako",
  "last_name": "Suzuki",
  "email": "hanako@example.com",
  "password_hash": "$2b$...",
  "role_id": 3,
  "created_at": "2026-01-10T09:00:00Z",
  "updated_at": "2026-06-01T12:30:00Z"
}`}
            />

            <CodeBlock
              language="json"
              title="FE が画面に必要な形（整形済み・表示用だけ）"
              code={`{
  "id": 42,
  "displayName": "鈴木 花子",
  "email": "hanako@example.com",
  "avatarUrl": "https://cdn.example.com/u/42.png",
  "isAdmin": true
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>password_hash</code>{" "}
              は画面に不要かつ漏らしてはいけないので返しません。
              <code>first_name</code> / <code>last_name</code> は表示用の{" "}
              <code>displayName</code> に整形され、<code>role_id: 3</code>{" "}
              は画面が判断 しやすい <code>isAdmin: true</code>{" "}
              に変換されています。この「内部モデル」と
              「公開する形」の差をどこで吸収するかが、協業設計の論点になります。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="FE が「画面に使わない巨大なデータまで返ってくる」状態を指す言葉は？"
              options={[
                { label: "under-fetch（必要な往復が足りない）" },
                {
                  label: "over-fetch（不要なデータまで取得している）",
                  correct: true,
                },
                { label: "prefetch（事前取得）" },
                { label: "refetch（再取得）" },
              ]}
              explanation="不要なデータまで取得してしまうのが over-fetch、1 画面のために往復が増えてしまうのが under-fetch です。どちらも体験を損なうため、FE は「画面に必要な形・量」でデータが返ることを望みます。GraphQL や BFF はこの過不足を減らす手段としてよく挙げられます。"
            />
          </section>

          {/* 協業方法 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              協業の進め方 — 契約ファーストで並行開発する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              BE と FE の関心は違っても、進め方を揃えればズレは小さくできます。
              基本は<strong>契約ファースト</strong>——実装より先に OpenAPI で
              「やり取りの形」を合意してから、両者が並行して作り始めます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <ol className="space-y-3 text-sm text-muted-foreground leading-relaxed list-decimal pl-5">
                <li>
                  <span className="font-bold text-foreground">
                    契約を合意する:
                  </span>{" "}
                  エンドポイント・リクエスト/レスポンスの形・エラー形を OpenAPI
                  に書いて 正本にする。
                </li>
                <li>
                  <span className="font-bold text-foreground">
                    モック先行で並行開発:
                  </span>{" "}
                  Prism などで OpenAPI からモックサーバを立て、BE 実装を待たずに
                  FE が 着手する。
                </li>
                <li>
                  <span className="font-bold text-foreground">
                    型生成で齟齬を消す:
                  </span>{" "}
                  openapi-typescript で契約から TS
                  型を生成。手書きの型ズレをなくす。
                </li>
                <li>
                  <span className="font-bold text-foreground">
                    契約テストでズレ検知:
                  </span>{" "}
                  実装が OpenAPI に沿っているかを CI
                  で検証し、契約違反を早期に見つける。
                </li>
                <li>
                  <span className="font-bold text-foreground">
                    細部を合意する:
                  </span>{" "}
                  命名規則（camelCase / snake_case）、日時形式（ISO
                  8601）、エラー形を 最初に決めて統一する。
                </li>
              </ol>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              型生成の流れは次の通りです。OpenAPI の定義から TS 型を生成し、FE
              は その型を <code>import</code> して使います。BE
              側で契約が変われば、 再生成した型が変わり、
              <strong>型エラーとして FE に齟齬が現れます</strong>。
            </p>

            <CodeBlock
              language="bash"
              title="OpenAPI から FE の型を生成する（openapi-typescript）"
              code={`# OpenAPI 定義から TS 型を生成
npx openapi-typescript ./openapi.yaml -o ./src/api/schema.d.ts

# 生成された型を FE のコードから利用する
#   import type { components } from "./api/schema";
#   type User = components["schemas"]["User"];`}
            />

            <InfoBox
              type="success"
              title="契約を正本にすれば、2 つの関心は 1 つの真実に集約できる"
            >
              BE の「正しさ・安全・永続」と FE
              の「体験・状態・表示」は別の関心ですが、
              <strong>同じ OpenAPI を見ている限り、両者は同じ真実を共有</strong>
              します。 契約が正本であれば、「言った／言わない」ではなく
              「契約にどう書いてあるか」で会話できます。これが協業のいちばんの効きどころです。
            </InfoBox>
          </section>

          {/* 契約のズレ + BFF */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              契約のズレの実例と、FE 専用集約層（BFF）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              契約を正本に固定する理由は、ズレが静かに型安全を壊すからです。
              典型は <strong>id の型</strong>。BE が数値の <code>id</code>{" "}
              を返している つもりでも、JSON 化や DB
              ドライバの都合で文字列になっていると、FE の
              型と実データがズレます。もう 1 つは
              <strong>自由形式オブジェクト</strong>です。BE が
              <code>dict[str, Any]</code>（任意のキーを持つ辞書）を返すと、
              openapi-typescript はそれを{" "}
              <code>{`{ [key: string]: unknown }`}</code> にマップします（
              <code>any</code> ではありません）。結果として、
              そのオブジェクトの中身には型の保証がなくなります。
            </p>

            <CodeBlock
              language="ts"
              title="自由形式オブジェクトは型安全が「潰れる」"
              code={`// OpenAPI で additionalProperties: true（dict[str, Any]）の場合、
// openapi-typescript はこう生成する:
type Metadata = { [key: string]: unknown };

// 中身のキー・型は不明なので、毎回 narrowing が必要になる
const meta: Metadata = res.metadata;
const plan = meta.plan; // unknown — そのままでは使えない
if (typeof plan === "string") {
  // ここでようやく string として扱える
}`}
            />

            <p className="text-muted-foreground mb-6 leading-relaxed">
              だからこそ、可能な範囲で「形を確定させた契約」を正本にします。
              <code>unknown</code>{" "}
              に潰れる自由形式は便利な逃げ道ですが、多用すると
              型の恩恵を失います。
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              FE の「画面に必要な形」と BE の「永続モデル」の差が大きいときは、
              <strong>BFF（Backend for Frontend）</strong>
              を間に挟む選択肢があります。 FE 専用の集約層を置き、複数の API
              をまとめたり、画面に合わせて整形して 返します。Nuxt なら{" "}
              <code>server/api</code>（Nitro）を BFF にできます。
              この構成では、ブラウザは
              <strong>同一オリジンの Nuxt サーバだけ</strong>を
              叩くため、別オリジンの API を直接呼ぶときに問題になる
              <strong>CORS を回避</strong>できます（CORS
              はブラウザだけが強制し、 サーバ間通信には影響しません）。
            </p>

            <CodeBlock
              language="ts"
              title="Nuxt の BFF（server/api）で BE をまとめて整形する"
              code={`// server/api/users/[id].get.ts （Nitro / 同一オリジンで動く）
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  // サーバ間通信なので CORS の対象外
  const u = await $fetch(\`https://api.internal/users/\${id}\`);
  // FE の画面に必要な形へ整形して返す
  return {
    id: u.id,
    displayName: \`\${u.last_name} \${u.first_name}\`,
    isAdmin: u.role_id === 3,
  };
});`}
            />

            <InfoBox type="info" title="BFF は「FE のための BE」">
              BFF は汎用 API ではなく、特定のフロントエンドのために最適化された
              集約層です。over-fetch / under-fetch の解消、複数 API の集約、CORS
              回避
              （同一オリジン化）などに効きます。一方で層が増えるぶん保守対象も増えるため、
              「画面と汎用 API
              の形が大きくずれている」ときの選択肢として捉えます。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="契約ファースト（OpenAPI を先に合意してから実装する）の利点として最も適切なのは？"
              options={[
                {
                  label:
                    "BE 実装を待たず、モックと型生成で FE が並行着手でき、齟齬を早期に検知できる",
                  correct: true,
                },
                {
                  label: "OpenAPI さえあれば BE 側のバリデーションは不要になる",
                },
                {
                  label:
                    "CORS が自動的に無効化され、どのオリジンからも呼べるようになる",
                },
                {
                  label: "FE の型を必ず手書きするため、生成ツールが不要になる",
                },
              ]}
              explanation="契約ファーストの核心は「実装前に形を合意する」ことです。OpenAPI を正本にすれば、モックサーバ（Prism 等）で FE が BE 実装を待たず着手でき、openapi-typescript で型を生成して手書きのズレをなくし、契約テストで実装の逸脱を検知できます。BE のバリデーションは依然必須で、CORS が無効化されることもありません。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "OpenAPI Specification",
                  url: "https://spec.openapis.org/oas/latest.html",
                  description:
                    "API 契約の正本となる OpenAPI の公式仕様。リクエスト/レスポンスの記述方法",
                },
                {
                  title: "openapi-typescript",
                  url: "https://openapi-ts.dev/",
                  description:
                    "OpenAPI 定義から TypeScript 型を生成する公式ドキュメント",
                },
                {
                  title: "TanStack Query",
                  url: "https://tanstack.com/query/latest",
                  description:
                    "useQuery / useMutation で取得・状態・キャッシュを宣言的に扱う公式ドキュメント",
                },
                {
                  title: "Nuxt - server ディレクトリ（Nitro）",
                  url: "https://nuxt.com/docs/guide/directory-structure/server",
                  description:
                    "server/api を BFF として使う方法。$fetch / defineEventHandler の解説",
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
