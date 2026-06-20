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

// エンドポイント一覧（Step 4 のリソース設計表で使用）
const endpoints = [
  {
    method: "GET",
    path: "/posts",
    role: "投稿の一覧を取得する。ページネーションや絞り込みもここで扱う。",
  },
  {
    method: "POST",
    path: "/posts",
    role: "新しい投稿を作成する。本文（title / body）を送る。",
  },
  {
    method: "GET",
    path: "/posts/{id}",
    role: "1 件の投稿の詳細を取得する。",
  },
  {
    method: "GET",
    path: "/posts/{id}/comments",
    role: "ある投稿に紐づくコメントの一覧を取得する（1:N の子リソース）。",
  },
  {
    method: "POST",
    path: "/posts/{id}/comments",
    role: "ある投稿に新しいコメントを追加する。",
  },
  {
    method: "GET",
    path: "/tags",
    role: "タグの一覧を取得する。投稿と独立して存在するマスタ。",
  },
  {
    method: "PUT",
    path: "/posts/{id}/tags",
    role: "ある投稿に付くタグの集合を丸ごと差し替える（N:M の関連を更新）。",
  },
];

export default function WorkedExample() {
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
            実践: 要件から ER図・テーブル・API まで
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            データモデリングの各概念を、ひとつの題材で一気通貫に通します。題材は
            シンプルなブログです。ユーザーが投稿を書き、その投稿にコメントとタグが付く——
            この一文の要件から出発し、エンティティの抽出 → ER図 → テーブル定義 →
            API リソース → OpenAP
            スキーマまで、同じ流れの中で順に組み立てていきます。 「なぜ API
            がこの形になるのか」を、データの構造から逆算して理解するのが目的です。
          </p>
        </div>

        <WhyNowBox tags={["要件", "ER図", "正規化", "リソース設計", "OpenAPI"]}>
          <p>
            API の形は、思いつきで決まるものではありません。
            <strong>背後にあるデータの構造（誰が何を持つか）</strong>
            が決まると、エンドポイントの形は自然と導かれます。 ここでは BE / DB
            が苦手な人でも追えるよう、専門用語を 1 行で噛み砕きながら、要件 →
            ER図 → テーブル → API
            の一本道を実際に歩きます。一度この流れを通すと、 既存 API
            を見たときに「このリソースは元の表のどこから来たのか」が読めるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* Step 1: 要件から抽出 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Step 1 — 要件の文から「もの」と「操作」を抜き出す
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              モデリングの出発点は、要件を 1
              文で言い切ることです。今回の要件はこうです。
              <strong>
                「ユーザーが投稿を書き、その投稿にコメントとタグが付く」
              </strong>
              。この文から、データの登場人物（エンティティ）と、そこに対する操作を抜き出します。
              コツは品詞で見ること——<strong>名詞がエンティティ</strong>、
              <strong>動詞が操作（＝後の API）</strong>
              になりやすい、という見立てです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  名詞 → エンティティ
                </h3>
                <ul className="text-sm text-muted-foreground leading-relaxed space-y-1">
                  <li>
                    <code>User</code>（ユーザー）
                  </li>
                  <li>
                    <code>Post</code>（投稿）
                  </li>
                  <li>
                    <code>Comment</code>（コメント）
                  </li>
                  <li>
                    <code>Tag</code>（タグ）
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  動詞 → 操作（後の API）
                </h3>
                <ul className="text-sm text-muted-foreground leading-relaxed space-y-1">
                  <li>投稿を書く → 投稿の作成</li>
                  <li>コメントする → コメントの追加</li>
                  <li>タグが付く → タグ付けの更新</li>
                  <li>（暗黙）一覧で見る → 取得</li>
                </ul>
              </div>
            </div>

            <InfoBox type="info" title="エンティティとは">
              エンティティ（entity）とは、システムが扱う「もの・事柄」の単位です。
              現実世界で「これは別々に数えられる」と感じるものは、たいていエンティティになります。
              「ユーザー」と「投稿」は別々に数えられるので、別のエンティティです。
              この時点では完璧でなくてよく、要件の文に出てくる名詞をまず素直に並べます。
            </InfoBox>
          </section>

          {/* Step 2: ER図 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Step 2 — エンティティ同士の関係を ER図にする
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              次に、抜き出したエンティティが
              <strong>どう繋がるか</strong>を決めます。これが ER図（Entity
              Relationship 図）です。ここで重要なのが
              <strong>カーディナリティ</strong>——「片方 1 件に対して、もう片方は
              何件まで対応するか」という多重度です。記法は
              <code>1:1</code> / <code>1:N</code> / <code>N:M</code> の 3
              種で表します。今回の関係を言葉にすると、こうなります。
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed mb-6">
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  User 1 ──{"<"} N Post（1:N）:
                </span>{" "}
                1 人のユーザーは複数の投稿を書ける。逆に 1 つの投稿の著者は 1
                人。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  Post 1 ──{"<"} N Comment（1:N）:
                </span>{" "}
                1 つの投稿には複数のコメントが付く。逆に 1 つのコメントは 1
                つの投稿に属する。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  Post N {">"}──{"<"} M Tag（N:M）:
                </span>{" "}
                1 つの投稿に複数のタグが付き、1 つのタグも複数の投稿で使われる。
                この多対多は、後述する中間テーブル <code>post_tags</code>{" "}
                で表します。
              </li>
            </ul>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              この関係を、まずは見た目で掴むためにボックスで描いてみます。各ボックスが
              エンティティ、その中の一覧が属性（持っているデータ項目）です。
              <code>PK</code> は主キー（行を一意に識別する列）、
              <code>FK</code> は外部キー（他テーブルの主キーを指す列）です。
            </p>

            {/* Tailwind ボックスによる ER 図 */}
            <div className="rounded-xl border border-border bg-muted p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="font-bold text-primary mb-2">USER</p>
                  <ul className="text-sm text-muted-foreground font-mono space-y-1">
                    <li>id (PK)</li>
                    <li>name</li>
                    <li>email</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="font-bold text-primary mb-2">POST</p>
                  <ul className="text-sm text-muted-foreground font-mono space-y-1">
                    <li>id (PK)</li>
                    <li>user_id (FK → user.id)</li>
                    <li>title</li>
                    <li>body</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="font-bold text-primary mb-2">COMMENT</p>
                  <ul className="text-sm text-muted-foreground font-mono space-y-1">
                    <li>id (PK)</li>
                    <li>post_id (FK → post.id)</li>
                    <li>body</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="font-bold text-primary mb-2">TAG</p>
                  <ul className="text-sm text-muted-foreground font-mono space-y-1">
                    <li>id (PK)</li>
                    <li>name</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 md:col-span-2">
                  <p className="font-bold text-primary mb-2">
                    POST_TAGS（中間テーブル）
                  </p>
                  <ul className="text-sm text-muted-foreground font-mono space-y-1">
                    <li>post_id (FK → post.id)</li>
                    <li>tag_id (FK → tag.id)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-5 text-sm text-muted-foreground font-mono leading-relaxed">
                <p>USER 1 ──{"<"} N POST</p>
                <p>POST 1 ──{"<"} N COMMENT</p>
                <p>
                  POST N {">"}──{"<"} M TAG（経由: POST_TAGS）
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              同じ図を、コードとして書く方法もあります。
              <strong>mermaid</strong> の <code>erDiagram</code>{" "}
              記法を使うと、テキストから
              ER図を生成できます。リレーションの記号は、
              <code>||</code> がちょうど 1、<code>o{"{"}</code> が 0 以上の多、
              <code>
                {"|"}
                {"{"}
              </code>{" "}
              が 1 以上の多を表します。
            </p>

            <CodeBlock
              language="markdown"
              title="mermaid erDiagram（テキストから ER図を生成）"
              code={`erDiagram
    USER ||--o{ POST : writes
    POST ||--o{ COMMENT : has
    POST }o--o{ TAG : tagged

    USER {
        int id PK
        string name
        string email
    }
    POST {
        int id PK
        int user_id FK
        string title
        string body
    }
    COMMENT {
        int id PK
        int post_id FK
        string body
    }
    TAG {
        int id PK
        string name
    }`}
            />

            <InfoBox type="info" title="N:M は「直接は繋げない」">
              リレーショナルデータベースでは、テーブル同士を N:M
              で直接つなぐことはできません。1 行の中に「複数の tag_id」を
              詰め込むと、検索や更新が破綻するためです。そこで、関係そのものを 1
              つの表（中間テーブル）として独立させます。
              <code>post_tags</code> の 1
              行が「この投稿に、このタグが付いている」 という 1
              つの事実を表します。
            </InfoBox>
          </section>

          {/* Step 3: テーブル定義（物理モデル） */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Step 3 — ER図をテーブル定義（物理モデル）に落とす
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ER図が固まったら、実際のデータベースの表に変換します。これが物理モデルで、
              <code>CREATE TABLE</code> 文として書けます。1:N の関係は、
              <strong>「多」の側に外部キーを持たせる</strong>のが基本です。
              たとえば「1 ユーザーに N 投稿」なら、Post 側に
              <code>user_id</code> を置きます（User 側に「投稿 id
              の配列」を持たせるのは避ける——これは正規化の考え方そのものです）。
            </p>

            <CodeBlock
              language="sql"
              title="基本テーブル（User / Post / Comment / Tag）"
              code={`CREATE TABLE users (
    id     INTEGER PRIMARY KEY,
    name   TEXT NOT NULL,
    email  TEXT NOT NULL UNIQUE
);

CREATE TABLE posts (
    id       INTEGER PRIMARY KEY,
    user_id  INTEGER NOT NULL REFERENCES users(id),  -- 著者（1:N の「多」側に FK）
    title    TEXT NOT NULL,
    body     TEXT NOT NULL
);

CREATE TABLE comments (
    id       INTEGER PRIMARY KEY,
    post_id  INTEGER NOT NULL REFERENCES posts(id),   -- どの投稿へのコメントか
    body     TEXT NOT NULL
);

CREATE TABLE tags (
    id    INTEGER PRIMARY KEY,
    name  TEXT NOT NULL UNIQUE
);`}
            />

            <p className="text-muted-foreground mt-6 mb-4 leading-relaxed">
              N:M の <code>Post</code> と <code>Tag</code> は、
              <strong>中間テーブル</strong> <code>post_tags</code>{" "}
              で表します。この表は「どの投稿に、どのタグが付くか」だけを保持し、
              主キーは 2 つの外部キーの組み合わせ（複合主キー）にします。
              同じ組み合わせが 2 回入らないようにするためです。
            </p>

            <CodeBlock
              language="sql"
              title="中間テーブル（N:M を表す post_tags）"
              code={`CREATE TABLE post_tags (
    post_id  INTEGER NOT NULL REFERENCES posts(id),
    tag_id   INTEGER NOT NULL REFERENCES tags(id),
    PRIMARY KEY (post_id, tag_id)   -- 複合主キー: 同じ組は 1 回だけ
);`}
            />

            <InfoBox type="success" title="正規化の直感：1つの事実は1か所に">
              ここまでの設計は、自然と「正規形」に沿っています。第1正規形（1NF）は
              <strong>各セルが単一値で、繰り返し列や配列を持たない</strong>
              こと—— だから Post
              に「タグの配列」を直接持たせず、行に分けました。
              第2正規形（2NF）は複合主キーの一部にだけ依存する属性（部分関数従属）を排除すること、
              第3正規形（3NF）は主キー以外の属性に依存する属性（推移的関数従属）を排除すること。
              堅苦しいですが、根っこの直感は
              <strong>「1 つの事実は 1 か所にだけ書く」</strong>です。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Post と Tag は「1 つの投稿に複数タグ、1 つのタグは複数投稿」という N:M の関係です。これをリレーショナルDBで正しく表す方法は？"
              options={[
                {
                  label:
                    "posts テーブルに tag_id を複数並べた列（配列）を持たせる",
                },
                {
                  label:
                    "post_id と tag_id を持つ中間テーブル post_tags を作る",
                  correct: true,
                },
                { label: "tags テーブルに post の本文をコピーして持たせる" },
                { label: "N:M は表現できないので 1:N に作り変える" },
              ]}
              explanation="N:M はテーブル同士を直接つなげないため、関係そのものを 1 つの表＝中間テーブル（join table）として独立させます。post_tags の 1 行が「この投稿に、このタグが付いている」という 1 つの事実を表します。配列を 1 セルに詰めると 1NF を満たさず、検索・更新が破綻します。"
            />
          </section>

          {/* Step 4: API リソース設計 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Step 4 — テーブルから API のリソースを設計する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              テーブルが決まると、API
              のエンドポイントはほぼ機械的に導けます。基本は
              <strong>エンティティ＝リソース＝URL のパス</strong>です。Post は
              <code>/posts</code>、Tag は <code>/tags</code>。1:N
              の子は親の下にネストし（<code>/posts/{"{id}"}/comments</code>）、
              操作の種類は HTTP メソッド（GET / POST / PUT）で表します。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      メソッド
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      パス
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints.map((e) => (
                    <tr
                      key={`${e.method} ${e.path}`}
                      className="border-b border-border"
                    >
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {e.method}
                      </td>
                      <td className="py-2 px-4 font-mono text-foreground whitespace-nowrap align-top">
                        {e.path}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {e.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              N:M のタグ付けは <code>PUT /posts/{"{id}"}/tags</code>{" "}
              で「その投稿に付くタグ集合を丸ごと差し替える」のが扱いやすい設計です。
              リクエストボディでタグ id の集合を送ると、サーバ側は
              <code>post_tags</code> の該当行を入れ替えます。1
              件ずつ付け外しするより、状態が明快になります。
            </p>

            <CodeBlock
              language="http"
              title="タグ集合を丸ごと差し替える（N:M の更新）"
              code={`PUT /posts/42/tags HTTP/1.1
Content-Type: application/json

{ "tagIds": [3, 7, 12] }

HTTP/1.1 200 OK
Content-Type: application/json

{ "postId": 42, "tagIds": [3, 7, 12] }`}
            />
          </section>

          {/* Step 5: OpenAPI スキーマ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Step 5 — Post を OpenAPI スキーマで定義する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              最後に、リソースの「形」を機械可読な仕様として書きます。OpenAPI の{" "}
              <code>components/schemas</code>{" "}
              に、各リソースの構造を定義します。ここでテーブルの列が、そのまま
              スキーマのプロパティに対応します。他のスキーマを参照するときは
              <code>$ref</code> を使い、定義の重複を避けます。
            </p>

            <CodeBlock
              language="yaml"
              title="Post スキーマ（User を $ref で参照、tags は配列）"
              code={`components:
  schemas:
    Post:
      type: object
      required: [id, title, body, authorId]
      properties:
        id:
          type: integer
          example: 42
        title:
          type: string
          example: "API 設計入門"
        body:
          type: string
        authorId:
          type: integer
          description: "投稿者の User.id（FK に対応）"
        author:
          $ref: '#/components/schemas/User'   # User スキーマを再利用
        tags:
          type: array
          items:
            $ref: '#/components/schemas/Tag'   # N:M を配列で表現

    User:
      type: object
      required: [id, name]
      properties:
        id: { type: integer }
        name: { type: string }
        email: { type: string, format: email }

    Tag:
      type: object
      required: [id, name]
      properties:
        id: { type: integer }
        name: { type: string }`}
            />

            <InfoBox
              type="info"
              title="DB の FK は、API では「埋め込み or 参照」"
            >
              テーブルの <code>posts.user_id</code>（FK）は、API では 2
              通りに表現できます。id だけを返す（<code>authorId</code>）か、
              User オブジェクトを丸ごと埋め込む（<code>author</code>）か。
              前者は軽く、後者は 1 回の取得で済みます。どちらが正解かは
              使われ方次第で、両方を用意する設計もよくあります。
              スキーマ部品の再利用については{" "}
              <Link href="/api/openapi/schema-components">
                <span className="text-primary underline cursor-pointer">
                  OpenAPI のスキーマ部品
                </span>
              </Link>{" "}
              の章で詳しく扱います。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="このウォークスルーで踏んだ設計の流れとして、正しい順序は？"
              options={[
                {
                  label:
                    "要件 → エンティティ抽出 → ER図 → テーブル定義 → API リソース → OpenAPI スキーマ",
                  correct: true,
                },
                {
                  label:
                    "OpenAPI スキーマ → API リソース → 要件 → ER図 → テーブル定義",
                },
                {
                  label:
                    "テーブル定義 → 要件 → OpenAPI スキーマ → ER図 → API リソース",
                },
                {
                  label:
                    "API リソース → テーブル定義 → 要件 → エンティティ抽出 → ER図",
                },
              ]}
              explanation="出発点は常に要件です。要件から名詞でエンティティを抽出し、関係を ER図に表し、それをテーブル定義（物理モデル）へ落とし、テーブルから API リソースを導き、最後に OpenAPI スキーマで形を機械可読にします。後段は前段から導かれるため、順序が逆になることはありません。"
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              まとめ — 要件から API までは一本の流れ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここまでで、たった 1 文の要件が、ER図・テーブル・API・スキーマへと
              一本の流れで展開されました。重要なのは、
              <strong>各段が前の段から導かれている</strong>ことです。
              エンティティが決まれば関係が決まり、関係が決まればテーブルが決まり、
              テーブルが決まればリソースとスキーマが決まる。だから、できあがった
              API を見て「なぜこの形か」と迷ったら、1
              段ずつ遡れば必ず根拠に辿り着きます。
            </p>

            <div className="rounded-xl border border-border bg-muted p-5 mb-6">
              <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                要件（1 文）
                <br />
                &nbsp;&nbsp;→ エンティティ（User / Post / Comment / Tag）
                <br />
                &nbsp;&nbsp;→ ER図（1:N と N:M、中間テーブル）
                <br />
                &nbsp;&nbsp;→ テーブル定義（PK / FK / 複合主キー）
                <br />
                &nbsp;&nbsp;→ API リソース（/posts, /posts/{"{id}"}/comments,
                /tags）
                <br />
                &nbsp;&nbsp;→ OpenAPI スキーマ（$ref で部品を再利用）
              </p>
            </div>

            <InfoBox type="success" title="一度、自分の手で回してみる">
              この流れは、読むだけより一度自分で回すと一気に腑に落ちます。
              身近な題材（蔵書管理、買い物リスト、勤怠など）を 1
              文の要件にして、 同じ 5
              ステップを辿ってみてください。自分でエンティティを抜き、 N:M
              に気づき、中間テーブルを作る——その体験を 1 回通すと、API
              設計の「なぜこの形か」が自分の判断として身につきます。
            </InfoBox>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              次は、ここで触れたスキーマ部品の再利用を掘り下げる{" "}
              <Link href="/api/openapi/schema-components">
                <span className="text-primary underline cursor-pointer">
                  OpenAPI のスキーマ部品
                </span>
              </Link>{" "}
              や、リソースとは何かを基礎から整理する{" "}
              <Link href="/api/basics/resources">
                <span className="text-primary underline cursor-pointer">
                  リソースの考え方
                </span>
              </Link>{" "}
              へ進むと、この流れの各段がさらに深く理解できます。
            </p>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Mermaid - Entity Relationship Diagrams",
                  url: "https://mermaid.js.org/syntax/entityRelationshipDiagram.html",
                  description:
                    "erDiagram 記法の公式リファレンス。リレーション記号と属性の書き方",
                },
                {
                  title: "PostgreSQL - CREATE TABLE",
                  url: "https://www.postgresql.org/docs/current/sql-createtable.html",
                  description:
                    "PRIMARY KEY / REFERENCES（外部キー）など物理モデルの正式な構文",
                },
                {
                  title: "OpenAPI Specification",
                  url: "https://spec.openapis.org/oas/latest.html",
                  description:
                    "components/schemas と $ref によるスキーマ定義・再利用の一次仕様",
                },
                {
                  title: "MDN - REST",
                  url: "https://developer.mozilla.org/ja/docs/Glossary/REST",
                  description:
                    "リソースとエンドポイントという REST の基本概念の解説",
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
