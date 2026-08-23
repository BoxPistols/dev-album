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
import MermaidDiagram from "@/components/MermaidDiagram";

// 設計フローの 5 段階（用語の噛み砕きを各 step に同梱）
const flowSteps = [
  {
    no: "1",
    title: "要件",
    summary: "何を扱うかを言葉で書き出す",
    detail:
      "まず仕様を文章で書く。名詞（ユーザー、注文、商品）はエンティティ候補、動詞（注文する、レビューを書く）は操作やリレーションの候補になる。",
  },
  {
    no: "2",
    title: "概念モデル",
    summary: "エンティティとリレーションを ER 図に",
    detail:
      "拾った名詞を箱にし、箱と箱のつながり（1:1 / 1:N / N:M）を線で結ぶ。まだ DB も型も考えない、実装非依存の絵。",
  },
  {
    no: "3",
    title: "論理モデル",
    summary: "属性・キー・型を確定する",
    detail:
      "各エンティティに属性を足し、主キー（PK）と外部キー（FK）を決め、おおまかな型（文字列・整数・日時）を付ける。まだ特定の DB 製品には依存しない。",
  },
  {
    no: "4",
    title: "物理モデル",
    summary: "実 DB のテーブル設計に落とす",
    detail:
      "PostgreSQL や MySQL など実際の DB に合わせ、テーブル・カラム型・インデックス・制約（NOT NULL / UNIQUE / FK）を決める。ここで初めて DB 製品に依存する。",
  },
  {
    no: "5",
    title: "API リソース設計",
    summary: "エンティティをリソース（URL）にする",
    detail:
      "エンティティを /users・/orders のようなリソースに、リレーションをネスト（/users/{id}/orders）や参照に対応づける。物理モデルとは別の「外向きの契約」を組み立てる。",
  },
];

// 名詞 / 動詞 / 状態 を設計要素へ対応づける指針
const mappingRows = [
  {
    source: "名詞",
    example: "ユーザー、注文、商品",
    target: "エンティティ → リソース（/users, /orders）",
  },
  {
    source: "動詞",
    example: "注文する、キャンセルする、取得する",
    target: "操作 → HTTP メソッド（POST / DELETE / GET）",
  },
  {
    source: "状態・性質",
    example: "名前、価格、注文日時",
    target: "属性（カラム / フィールド）",
  },
  {
    source: "名詞どうしの関係",
    example: "ユーザーが注文を持つ",
    target: "リレーション → ネストまたは FK 参照",
  },
];

export default function DesignFlow() {
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
            要件からモデル・API への設計フロー
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            API は「思いつきで URL を生やす」ものではありません。要件の文章から
            エンティティとリレーションを拾い、モデルを段階的に詰めていくと、
            自然とリソース設計が決まります。この章では「要件 → 概念モデル →
            論理モデル → 物理モデル → API リソース設計」という、BE や DB
            が苦手な人でもたどれる一本道のフローを通します。
          </p>
        </div>

        <WhyNowBox
          tags={["設計フロー", "ER図", "正規化", "リソース設計", "OpenAPI"]}
        >
          <p>
            「どんな URL を作ればいいか分からない」の多くは、
            <strong>その前にモデルが固まっていない</strong>のが原因です。
            先にエンティティ（扱う対象）とリレーション（対象どうしの関係）を ER
            図で整理しておけば、1 エンティティ ≒ 1 リソースという素直な
            対応づけで API の骨格が決まります。モデルを言語化する習慣は、 FE と
            BE が同じ図を見て会話するための共通言語にもなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 用語の前提 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              まず 4 つの言葉を 1 行で
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              フローに入る前に、繰り返し出てくる言葉だけ噛み砕いておきます。
              ここが分かれば、残りは図を見ながら追えます。
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">エンティティ:</span>{" "}
                システムが扱う「もの」の単位。ユーザー・注文・商品など。だいたい
                1 つのテーブル、1 つのリソースに対応する。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">属性:</span>{" "}
                エンティティが持つ性質。ユーザーなら名前・メール。テーブルでは
                カラム、API レスポンスではフィールドになる。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">リレーション:</span>{" "}
                エンティティどうしの関係。「ユーザーは複数の注文を持つ」のような
                つながり。1:1 / 1:N / N:M の 3 種で表す。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">PK / FK:</span>{" "}
                主キー（PK）は行を一意に識別する列（user.id
                など）。外部キー（FK） は他テーブルの PK を指す列（order.user_id
                が user.id を指す）。
              </li>
            </ul>
          </section>

          {/* 5 段階フロー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              設計フローは 5 段階で進む
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              要件から API までは、いきなり URL を考えるのではなく、抽象度の高い
              ところから少しずつ具体化していきます。各段階で「決めること」が
              はっきり分かれているのがポイントです。
            </p>

            <div className="space-y-3 mb-6">
              {flowSteps.map((s) => (
                <div
                  key={s.no}
                  className="flex gap-4 rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                    {s.no}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base">
                      {s.title}
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        {s.summary}
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                      {s.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="物理モデルを知らなくても設計に入れる">
              FE は DB
              の内部（インデックスやカラム型）を知らなくても、概念モデル （ER
              図）と API 契約さえあれば設計に参加できます。物理モデルは BE
              側の関心事で、外向きの契約とは切り離せます。手早く全体像をつかむ
              には{" "}
              <Link href="/api/quickstart" className="text-primary underline">
                クイックスタート
              </Link>{" "}
              も合わせて読むと、フローの「最初の一歩」が具体的になります。
            </InfoBox>
          </section>

          {/* 要件 → 名詞・動詞の抽出 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              要件: 文章から名詞と動詞を拾う
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              最初の一歩は、要件を 1〜2 文で書き、そこから名詞と動詞に印を付ける
              だけです。名詞はエンティティ候補、動詞は操作やリレーションの候補に
              なります。機械的にできるので、設計の取っかかりとして優秀です。
            </p>

            <CodeBlock
              language="markdown"
              title="要件文から名詞・動詞を抽出する"
              code={`# 要件
ユーザー は 商品 を選んで 注文 する。
1 件の注文には 複数の商品 が含まれる。

# 名詞（=エンティティ候補）
- ユーザー  -> User
- 商品      -> Product
- 注文      -> Order

# 動詞（=操作 / リレーション候補）
- 注文する        -> POST /orders（操作）
- 注文が商品を含む -> Order と Product の N:M リレーション

# 状態・性質（=属性候補）
- ユーザー: 名前, メール
- 商品:     名前, 価格
- 注文:     注文日時, 合計金額`}
            />
          </section>

          {/* 概念モデル: ER 図 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              概念モデル: エンティティとリレーションを ER 図にする
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              拾った名詞を箱にし、箱どうしの関係を線で結びます。実装は考えず、
              「何と何がどうつながるか」だけを描くのが概念モデルです。まずは
              見た目を箱で示し、その下に同じ図を「コードとして書く」mermaid
              記法で 並べます。
            </p>

            {/* ER 図の見た目（箱で描画） */}
            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-2">USER</p>
                  <ul className="text-muted-foreground space-y-1 font-mono text-xs">
                    <li>id (PK)</li>
                    <li>name</li>
                    <li>email</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-2">ORDER</p>
                  <ul className="text-muted-foreground space-y-1 font-mono text-xs">
                    <li>id (PK)</li>
                    <li>user_id (FK)</li>
                    <li>ordered_at</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-2">PRODUCT</p>
                  <ul className="text-muted-foreground space-y-1 font-mono text-xs">
                    <li>id (PK)</li>
                    <li>name</li>
                    <li>price</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground font-mono space-y-1">
                <p>
                  USER 1 ──&lt; ORDER&nbsp;&nbsp;&nbsp;(1
                  人のユーザーは複数の注文を持つ = 1:N)
                </p>
                <p>
                  ORDER &gt;──&lt; PRODUCT&nbsp;&nbsp;(注文と商品は多対多 = N:M)
                </p>
              </div>
            </div>

            <MermaidDiagram
              title="同じ ER 図を mermaid erDiagram で書く（図）"
              chart={`erDiagram
  USER ||--o{ ORDER : places
  ORDER }o--o{ PRODUCT : contains

  USER {
    int id PK
    string name
    string email
  }
  ORDER {
    int id PK
    int user_id FK
    datetime ordered_at
  }
  PRODUCT {
    int id PK
    string name
    int price
  }`}
            />

            <InfoBox type="info" title="mermaid のカーディナリティ記号">
              <code>||</code> はちょうど 1、<code>o&#123;</code> は 0 以上の多、
              <code>|&#123;</code> は 1 以上の多。
              <code>USER ||--o&#123; ORDER</code> は「ユーザー 1 に対して注文 0
              件以上」、つまり 1:N を 表します。<code>&#125;o--o&#123;</code>{" "}
              は両端が多なので N:M です。
            </InfoBox>
          </section>

          {/* 論理 → 物理 → 正規化 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              論理モデル・物理モデルと正規化
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              概念モデルに属性・キー・型を足したものが論理モデル、それを実 DB の
              テーブルに落としたものが物理モデルです。この段階で意識するのが
              <strong>正規化</strong>——「1 つの事実は 1 か所に」だけ持つように
              テーブルを整える作業です。代表的な 3 段階を押さえます。
            </p>

            <div className="space-y-3 mb-6 text-sm">
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="font-bold text-foreground mb-1">
                  第 1 正規形（1NF）
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  各セルが単一値で、繰り返し列や配列を持たない。「商品 1, 商品
                  2, 商品 3」を 1 列に詰め込まず、行を分ける。
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="font-bold text-foreground mb-1">
                  第 2 正規形（2NF）
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  1NF
                  を満たし、複合主キーの一部にだけ依存する属性（部分関数従属）
                  を別テーブルへ分ける。
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="font-bold text-foreground mb-1">
                  第 3 正規形（3NF）
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  2NF を満たし、主キー以外の属性に依存する属性（推移的関数従属）
                  を排除する。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              N:M のリレーション（注文と商品）は、両者を直接つなげないため
              <strong>中間テーブル</strong>（join table）で表します。下の
              <code>order_items</code> がそれで、注文 1 件にどの商品が何個
              含まれるかを 1 行ずつ持ちます。
            </p>

            <CodeBlock
              language="sql"
              title="物理モデル: 中間テーブルで N:M を表す（PostgreSQL）"
              code={`CREATE TABLE users (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE orders (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id),
  ordered_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  price INTEGER NOT NULL
);

-- N:M を中間テーブルで表現
CREATE TABLE order_items (
  order_id   INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity   INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (order_id, product_id)
);`}
            />

            <InfoBox
              type="warning"
              title="正規化したモデルでも API は集約して返せる"
            >
              DB を 3NF まで分割しても、API
              レスポンスまで分割する必要はありません。
              <code>/orders/&#123;id&#125;</code> は user・items・products を
              JOIN して 1 つの JSON にまとめて返してよいのです。
              「保存の都合（正規化）」と「外向きの契約（レスポンス形）」は
              別レイヤーとして扱います。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="要件文から「商品」という名詞を拾った。設計フロー上、これは何の候補になる？"
              options={[
                {
                  label: "エンティティ（そして API のリソース /products）",
                  correct: true,
                },
                { label: "HTTP メソッド（操作）" },
                { label: "ステータスコード" },
                { label: "認証スコープ" },
              ]}
              explanation="名詞はシステムが扱う「もの」、つまりエンティティの候補です。エンティティはだいたい 1 テーブル・1 リソースに対応するので、商品は /products というリソースになります。動詞（注文する等）が操作 = HTTP メソッドの候補になるのと対になっています。"
            />
          </section>

          {/* ER → API リソース対応 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              API リソース設計: ER 図をそのまま URL に写す
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              モデルが固まれば、API への対応づけは機械的です。基本ルールは
              「名詞 → リソース、動詞 → メソッド、関係 → ネストか参照」。
              下の対応表を当てはめるだけで骨格が決まります。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      要件の要素
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      例
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      設計要素への対応
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mappingRows.map((r) => (
                    <tr key={r.source} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {r.source}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {r.example}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {r.target}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              ER と API の対応をまとめると次のとおりです。
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed mb-6">
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  1 エンティティ ≒ 1 リソース:
                </span>{" "}
                User → <code>/users</code>、Order → <code>/orders</code>
                、Product → <code>/products</code>。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  1:N → ネストまたは FK 参照:
                </span>{" "}
                「ユーザーの注文一覧」は{" "}
                <code>/users/&#123;id&#125;/orders</code>、あるいは{" "}
                <code>/orders?user_id=&#123;id&#125;</code> のクエリで表す。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  N:M → 中間リソース:
                </span>{" "}
                注文と商品の関係は <code>/orders/&#123;id&#125;/items</code>{" "}
                のように、中間テーブルをそのまま 1 リソースとして公開する。
              </li>
            </ul>

            <CodeBlock
              language="yaml"
              title="ER のエンティティを OpenAPI スキーマの一部に写す"
              code={`components:
  schemas:
    Order:
      type: object
      properties:
        id:
          type: integer
        user_id:        # FK: users.id を参照
          type: integer
        ordered_at:
          type: string
          format: date-time
        items:          # 中間テーブル order_items を集約して返す
          type: array
          items:
            $ref: '#/components/schemas/OrderItem'
      required: [id, user_id, ordered_at]

    OrderItem:
      type: object
      properties:
        product_id:
          type: integer
        quantity:
          type: integer`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              リソースの粒度やスキーマの分割をさらに詰めたいときは{" "}
              <Link
                href="/api/basics/resources"
                className="text-primary underline"
              >
                リソース設計
              </Link>{" "}
              と{" "}
              <Link
                href="/api/openapi/schema-components"
                className="text-primary underline"
              >
                スキーマコンポーネント
              </Link>{" "}
              の章が地続きです。
            </p>
          </section>

          {/* 反復 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              設計は一度では終わらない（反復する）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              このフローは一方通行に見えますが、実際は何度も往復します。要件が
              追加されればエンティティが増え、モデルが変わり、API も進化します。
              「レビューに評価を付けたい」と言われた瞬間に Review エンティティと{" "}
              <code>/reviews</code> リソースが生まれる、という具合です。
            </p>

            <p className="text-muted-foreground leading-relaxed">
              大事なのは、変わること自体は織り込み済みだと考えることです。一度
              公開した API を壊さずに進化させる方法は{" "}
              <Link
                href="/api/build/versioning"
                className="text-primary underline"
              >
                バージョニング
              </Link>{" "}
              の章で扱います。モデルの変化を API の互換性とどう両立させるかは、
              設計フローの自然な続きです。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="設計フローの段階を、抽象度の高い順（先に決める順）に並べたものは？"
              options={[
                {
                  label:
                    "要件 → 概念モデル → 論理モデル → 物理モデル → API リソース設計",
                  correct: true,
                },
                {
                  label:
                    "物理モデル → 論理モデル → 概念モデル → 要件 → API リソース設計",
                },
                {
                  label:
                    "API リソース設計 → 要件 → 物理モデル → 概念モデル → 論理モデル",
                },
                {
                  label:
                    "要件 → 物理モデル → 概念モデル → 論理モデル → API リソース設計",
                },
              ]}
              explanation="抽象度が高い「何を扱うか（要件）」から始め、概念モデル（ER 図）→ 論理モデル（属性・キー・型）→ 物理モデル（実 DB のテーブル）と少しずつ具体化し、最後に外向きの契約である API リソース設計へ落とします。いきなり物理モデルや URL から考えると、要件との対応が取れず破綻しやすくなります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Mermaid - Entity Relationship Diagrams",
                  url: "https://mermaid.js.org/syntax/entityRelationshipDiagram.html",
                  description:
                    "erDiagram 記法とカーディナリティ記号（||--o{ など）の公式リファレンス",
                },
                {
                  title: "PostgreSQL - CREATE TABLE",
                  url: "https://www.postgresql.org/docs/current/sql-createtable.html",
                  description:
                    "物理モデルで使う主キー・外部キー・制約の正式な構文",
                },
                {
                  title: "OpenAPI Specification - Schema Object",
                  url: "https://spec.openapis.org/oas/latest.html",
                  description:
                    "エンティティを API スキーマに写すときの components/schemas の仕様",
                },
                {
                  title: "MDN - REST API の設計",
                  url: "https://developer.mozilla.org/ja/docs/Glossary/REST",
                  description: "リソース指向で API を組み立てる考え方の入り口",
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
