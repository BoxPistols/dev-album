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

// データモデリングの基本用語（最初に1行で噛み砕く）
const terms = [
  {
    name: "エンティティ（実体）",
    role: "モデル化する「もの」。User・Order・Product など。テーブル ≒ API リソースとほぼ同じ単位。",
  },
  {
    name: "属性（attribute）",
    role: "エンティティが持つ性質。User なら id・name・email。テーブルの「列」にあたる。",
  },
  {
    name: "リレーション（関連）",
    role: "エンティティ同士のつながり。「User が Order を持つ」のような関係。",
  },
  {
    name: "カーディナリティ（多重度）",
    role: "関連が何対何かを表す。1:1 / 1:N / N:M の3パターンで考える。",
  },
  {
    name: "主キー（PK）",
    role: "行を一意に識別する属性。多くは id。同じ PK の行は2つと存在しない。",
  },
  {
    name: "外部キー（FK）",
    role: "他エンティティの主キーを指す属性。order.user_id が user.id を指すなど。",
  },
];

export default function ErDiagram() {
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
            ER図とデータモデリングの基礎
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            API が返す JSON
            の形は、その裏側にあるデータの「設計図」で決まります。
            何を・どう関連づけて保存するかを整理するのがデータモデリングで、
            それを目に見える形にしたものが ER図です。BE や DB が苦手でも、
            エンティティ・属性・関連の3つを押さえれば、API
            のリソース設計とまっすぐつながります。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "データモデリング",
            "ER図",
            "エンティティ",
            "主キー",
            "リレーション",
          ]}
        >
          <p>
            <Link href="/api/basics/resources">
              <span className="text-primary underline cursor-pointer">
                リソースと URI 設計
              </span>
            </Link>
            で扱った「リソース」は、そのままデータの世界の
            <strong>エンティティ</strong>に対応します。 つまり{" "}
            <code>GET /users/1/orders</code> のような URL は、 「User と Order
            がどう関連しているか」というデータモデルを写したものです。
            先にモデルを整理しておくと、URL もレスポンスの形も自然に決まり、
            後からの作り直しを減らせます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* データモデリングとは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              データモデリングとは「何を・どう関連づけて保存するか」の設計
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              データモデリングは、アプリが扱う情報を
              <strong>「もの」と「もの同士のつながり」</strong>
              に分けて整理する作業です。 たとえばEC
              サイトなら「ユーザー」「注文」「商品」という3つの「もの」があり、
              「ユーザーが注文する」「注文に商品が含まれる」というつながりがあります。
              これを図にしたものが ER図（Entity-Relationship
              Diagram、実体関連図）です。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      用語
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      意味
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {terms.map((t) => (
                    <tr key={t.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-bold text-primary whitespace-nowrap align-top">
                        {t.name}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {t.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="エンティティ ≒ テーブル ≒ API リソース">
              この3つは、同じものを別の視点から見た呼び名です。 データモデルでは
              <strong>エンティティ</strong>、 リレーショナル DB では
              <strong>テーブル</strong>、 REST API では<strong>リソース</strong>
              と呼びます。 「User」というエンティティは、DB の{" "}
              <code>users</code> テーブルになり、 API では <code>/users</code>{" "}
              というリソースとして公開されます。
              名前が違うだけで、指しているものはほぼ同じです。
            </InfoBox>
          </section>

          {/* エンティティと属性 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              エンティティと属性 — 「もの」と「その性質」
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>エンティティ</strong>はモデル化する「もの」、
              <strong>属性</strong>はその「もの」が持つ性質です。 User
              というエンティティは id・name・email といった属性を持ちます。
              ER図では、エンティティを箱として描き、その中に属性を並べます。
              箱の中で <code>PK</code>（主キー）や <code>FK</code>（外部キー）を
              印として添えるのが定石です。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <p className="text-xs font-bold text-muted-foreground mb-3 tracking-wide">
                図解: User エンティティ（角丸ボックスで描く）
              </p>
              <div className="max-w-xs">
                <div className="rounded-xl border border-border bg-muted overflow-hidden">
                  <div className="bg-primary/10 border-b border-border px-4 py-2 font-bold text-primary">
                    USER
                  </div>
                  <ul className="text-sm divide-y divide-border">
                    <li className="px-4 py-2 flex justify-between gap-4">
                      <span className="font-mono text-foreground">id</span>
                      <span className="font-mono text-primary text-xs">
                        int · PK
                      </span>
                    </li>
                    <li className="px-4 py-2 flex justify-between gap-4">
                      <span className="font-mono text-foreground">name</span>
                      <span className="font-mono text-muted-foreground text-xs">
                        string
                      </span>
                    </li>
                    <li className="px-4 py-2 flex justify-between gap-4">
                      <span className="font-mono text-foreground">email</span>
                      <span className="font-mono text-muted-foreground text-xs">
                        string
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              この箱を「コードとして書く」と、mermaid の <code>erDiagram</code>{" "}
              記法ではこうなります。属性は「型 名前 印」の順で並べ、
              <code>PK</code> / <code>FK</code> を末尾に添えます。
            </p>

            <CodeBlock
              language="markdown"
              title="mermaid: 単一エンティティの記法"
              code={`erDiagram
    USER {
        int id PK
        string name
        string email
    }`}
            />
          </section>

          {/* リレーションとカーディナリティ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リレーションとカーディナリティ — 1:1 / 1:N / N:M
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>リレーション</strong>はエンティティ同士のつながり、
              <strong>カーディナリティ（多重度）</strong>
              は「何対何か」を表します。
              基本は3パターンです。1人のユーザーが複数の注文を持つなら 1:N、
              1つの注文に複数の商品が入り、1つの商品が複数の注文に登場するなら
              N:M です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary mb-1 font-mono">1:1</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  一方が他方とちょうど1つ対応。User と
                  Profile（1人に1プロフィール）など。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary mb-1 font-mono">1:N</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  片方が複数を持つ。User 1人が Order を何件も持つ。最も頻出。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary mb-1 font-mono">N:M</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  双方が複数を持つ。Order と Product。中間テーブルで表す。
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <p className="text-xs font-bold text-muted-foreground mb-4 tracking-wide">
                図解: 1人のユーザーが複数の注文を持つ（1:N）
              </p>
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-3">
                <div className="rounded-xl border border-border bg-muted overflow-hidden w-full md:max-w-[200px]">
                  <div className="bg-primary/10 border-b border-border px-4 py-2 font-bold text-primary">
                    USER
                  </div>
                  <ul className="text-sm divide-y divide-border">
                    <li className="px-4 py-2 flex justify-between gap-4">
                      <span className="font-mono text-foreground">id</span>
                      <span className="font-mono text-primary text-xs">PK</span>
                    </li>
                    <li className="px-4 py-2">
                      <span className="font-mono text-foreground">name</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-center font-mono text-sm text-muted-foreground whitespace-nowrap px-2">
                  1 ──&lt; N
                </div>

                <div className="rounded-xl border border-border bg-muted overflow-hidden w-full md:max-w-[220px]">
                  <div className="bg-primary/10 border-b border-border px-4 py-2 font-bold text-primary">
                    ORDER
                  </div>
                  <ul className="text-sm divide-y divide-border">
                    <li className="px-4 py-2 flex justify-between gap-4">
                      <span className="font-mono text-foreground">id</span>
                      <span className="font-mono text-primary text-xs">PK</span>
                    </li>
                    <li className="px-4 py-2 flex justify-between gap-4">
                      <span className="font-mono text-foreground">user_id</span>
                      <span className="font-mono text-primary text-xs">FK</span>
                    </li>
                    <li className="px-4 py-2">
                      <span className="font-mono text-foreground">total</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                ORDER 側に <code>user_id</code>（FK）を1本持たせるだけで、
                「どのユーザーの注文か」がたどれます。1:N の関連は、
                <strong>多い側（N 側）に外部キーを置く</strong>のが基本です。
              </p>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              これを mermaid で書くと、リレーションは{" "}
              <code>USER ||--o{`{`} ORDER : places</code> のように表します。
              記号には意味があり、線の両端でカーディナリティを示します。
            </p>

            <CodeBlock
              language="markdown"
              title="mermaid: 1:N の関連を書く"
              code={`erDiagram
    USER ||--o{ ORDER : places
    USER {
        int id PK
        string name
        string email
    }
    ORDER {
        int id PK
        int user_id FK
        int total
    }`}
            />

            <div className="rounded-xl border border-border bg-card p-5 mt-6">
              <p className="text-xs font-bold text-muted-foreground mb-3 tracking-wide">
                mermaid の関連記号（左右で1つの線になる）
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <code className="text-primary">||--||</code> =
                  1対1（両端とも「ちょうど1」）
                </li>
                <li>
                  <code className="text-primary">||--o{`{`}</code> =
                  1対多（一方はちょうど1、他方は0以上の多）
                </li>
                <li>
                  <code className="text-primary">||--|{`{`}</code> =
                  1対多（他方は1以上の多。最低1件は必要）
                </li>
                <li>
                  <code className="text-primary">
                    {`}`}o--o{`{`}
                  </code>{" "}
                  = 多対多（両端とも0以上の多）
                </li>
              </ul>
            </div>
          </section>

          {/* N:M と中間テーブル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              N:M は中間テーブルでほどく
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              N:M（多対多）の関連は、外部キー1本では表せません。1つの記事に複数のタグが付き、
              1つのタグが複数の記事に付くといった関係です。 これは
              <strong>中間テーブル（join table）</strong>を1つ挟んでほどきます。
              中間テーブルは両側の外部キーを持ち、N:M を「N:1 と
              1:M」の2つに分解します。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <p className="text-xs font-bold text-muted-foreground mb-4 tracking-wide">
                図解: POST と TAG を POST_TAG でつなぐ
              </p>
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="rounded-xl border border-border bg-muted overflow-hidden w-full md:max-w-[160px]">
                  <div className="bg-primary/10 border-b border-border px-4 py-2 font-bold text-primary">
                    POST
                  </div>
                  <ul className="text-sm divide-y divide-border">
                    <li className="px-4 py-2 flex justify-between gap-4">
                      <span className="font-mono text-foreground">id</span>
                      <span className="font-mono text-primary text-xs">PK</span>
                    </li>
                    <li className="px-4 py-2">
                      <span className="font-mono text-foreground">title</span>
                    </li>
                  </ul>
                </div>

                <div className="font-mono text-sm text-muted-foreground text-center px-1">
                  1 ──&lt;
                </div>

                <div className="rounded-xl border border-primary/40 bg-primary/5 overflow-hidden w-full md:max-w-[180px]">
                  <div className="bg-primary/10 border-b border-border px-4 py-2 font-bold text-primary">
                    POST_TAG
                  </div>
                  <ul className="text-sm divide-y divide-border">
                    <li className="px-4 py-2 flex justify-between gap-4">
                      <span className="font-mono text-foreground">post_id</span>
                      <span className="font-mono text-primary text-xs">FK</span>
                    </li>
                    <li className="px-4 py-2 flex justify-between gap-4">
                      <span className="font-mono text-foreground">tag_id</span>
                      <span className="font-mono text-primary text-xs">FK</span>
                    </li>
                  </ul>
                </div>

                <div className="font-mono text-sm text-muted-foreground text-center px-1">
                  &gt;── 1
                </div>

                <div className="rounded-xl border border-border bg-muted overflow-hidden w-full md:max-w-[160px]">
                  <div className="bg-primary/10 border-b border-border px-4 py-2 font-bold text-primary">
                    TAG
                  </div>
                  <ul className="text-sm divide-y divide-border">
                    <li className="px-4 py-2 flex justify-between gap-4">
                      <span className="font-mono text-foreground">id</span>
                      <span className="font-mono text-primary text-xs">PK</span>
                    </li>
                    <li className="px-4 py-2">
                      <span className="font-mono text-foreground">name</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                POST と TAG は直接つながらず、間の POST_TAG が両方の FK
                を持ちます。 POST_TAG
                の1行が「この記事にこのタグが付いている」という1つの事実を表します。
              </p>
            </div>

            <CodeBlock
              language="markdown"
              title="mermaid: N:M を中間テーブルで表す"
              code={`erDiagram
    POST ||--o{ POST_TAG : has
    TAG  ||--o{ POST_TAG : has
    POST {
        int id PK
        string title
    }
    TAG {
        int id PK
        string name
    }
    POST_TAG {
        int post_id FK
        int tag_id FK
    }`}
            />

            <CodeBlock
              language="sql"
              title="SQL: 中間テーブルの定義"
              code={`CREATE TABLE post_tag (
  post_id INTEGER NOT NULL REFERENCES post(id),
  tag_id  INTEGER NOT NULL REFERENCES tag(id),
  PRIMARY KEY (post_id, tag_id)
);`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="1つの注文に複数の商品が入り、1つの商品が複数の注文に登場する。この関連の表し方として正しいのは？"
              options={[
                {
                  label:
                    "Order と Product を中間テーブル（order_item 等）でつなぐ N:M",
                  correct: true,
                },
                { label: "Order に product_id を1本だけ持たせる 1:N" },
                { label: "Product に order_id を1本だけ持たせる 1:N" },
                { label: "Order と Product を1:1 でつなぐ" },
              ]}
              explanation="双方が複数を持つ関係は N:M（多対多）です。外部キー1本では表せないため、両側の FK を持つ中間テーブルを挟み、「N:1 と 1:M」の2つの 1:N にほどきます。order_item のような中間テーブルがそれにあたります。"
            />
          </section>

          {/* 主キーと外部キー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              主キー（PK）と外部キー（FK） — 行を特定し、関連をつなぐ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>主キー（Primary Key）</strong>
              は、行を一意に識別する属性です。
              同じ主キーを持つ行は2つと存在しません。多くは <code>id</code>{" "}
              という連番や UUID です。
              <strong>外部キー（Foreign Key）</strong>
              は、他エンティティの主キーを指す属性で、
              これがリレーションの実体です。<code>order.user_id</code> が{" "}
              <code>user.id</code>{" "}
              を指すことで、「この注文は誰のものか」がたどれます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  主キー（PK）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  行を一意に識別する。<code>user.id</code> など。 API では{" "}
                  <code>/users/42</code> の <code>42</code> がこれにあたる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  外部キー（FK）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  他テーブルの PK を参照する。
                  <code>order.user_id → user.id</code>。
                  これが「関連」をデータとして表現する正体。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              ER図の Crow{"'"}s
              foot（鳥の足）記法は、線の端の形でカーディナリティを読みます。
              <strong>
                縦線（|）が「1」、枝分かれした鳥の足が「多」、丸（○）が「任意（0でも可）」
              </strong>
              を意味します。たとえば一方に縦線、もう一方に丸＋鳥の足なら「ちょうど1
              対 0以上の多」、 つまり 1:N です。
            </p>

            <CodeBlock
              language="sql"
              title="SQL: PK と FK の定義（1:N をスキーマで表す）"
              code={`CREATE TABLE "user" (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE "order" (
  id      INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES "user"(id),
  total   INTEGER NOT NULL
);`}
            />

            <InfoBox type="success" title="正規形は「1つの事実は1か所に」">
              データを重複なく整理する指針が正規化です。
              <strong>第1正規形（1NF）</strong>
              は各セルが単一値で、繰り返し列や配列を持たないこと。
              <strong>第2正規形（2NF）</strong>は 1NF
              に加え、複合主キーの一部にだけ依存する属性（部分関数従属）を別テーブルへ分けること。
              <strong>第3正規形（3NF）</strong>は 2NF
              に加え、主キー以外の属性に依存する属性（推移的関数従属）を別テーブルへ分けること。
              直感的には「同じ事実をあちこちに書かず、1か所にまとめる」ための段階的なルールです。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="外部キー（FK）の役割として正しいのは？"
              options={[
                {
                  label:
                    "他エンティティの主キーを参照し、エンティティ間の関連を表す",
                  correct: true,
                },
                { label: "そのテーブルの行を一意に識別する" },
                { label: "属性の値が単一であることを保証する" },
                { label: "テーブルのソート順を決める" },
              ]}
              explanation="外部キーは他テーブルの主キー（PK）を指す属性で、これがリレーションの実体です。order.user_id が user.id を指すことで「この注文は誰のものか」がたどれます。なお、行を一意に識別するのは主キー（PK）の役割で、両者は別物です。"
            />
          </section>

          {/* モデルから API へ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              モデルが決まれば URL とレスポンスも決まる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ER図でエンティティと関連を整理しておくと、API
              の形が機械的に導けます。 エンティティはコレクション URL に、1:N
              の関連はネストした URL に、
              属性はレスポンスのフィールドにそのまま対応します。
              モデルを先に固めるほど、API の設計判断が減ります。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      データモデル
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      対応する API
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 text-muted-foreground align-top">
                      User エンティティ
                    </td>
                    <td className="py-2 px-4 font-mono text-primary">
                      GET /users, GET /users/42
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 text-muted-foreground align-top">
                      User 1 ──&lt; N Order（1:N）
                    </td>
                    <td className="py-2 px-4 font-mono text-primary">
                      GET /users/42/orders
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 text-muted-foreground align-top">
                      属性 id / name / email
                    </td>
                    <td className="py-2 px-4 font-mono text-primary">
                      {`{ "id": 42, "name": "...", "email": "..." }`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              レスポンスの形（スキーマ）を再利用可能な部品として定義する話は{" "}
              <Link href="/api/openapi/schema-components">
                <span className="text-primary underline cursor-pointer">
                  OpenAPI のスキーマコンポーネント
                </span>
              </Link>
              で扱います。BE と FE でこのモデルの認識を揃える進め方は{" "}
              <Link href="/api/collaboration/backend-frontend">
                <span className="text-primary underline cursor-pointer">
                  バックエンドとフロントの連携
                </span>
              </Link>
              を参照してください。
            </p>
          </section>

          {/* ER図の作成ツール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ER図はどう描く？ — 作成ツールの選び方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ER図は紙でも描けますが、実務では専用ツールを使います。選択肢は多いですが、
              <strong>「テキスト（コード）で書くか、GUI でドラッグして描くか」</strong>
              の 2 系統に大きく分かれます。最初に意識すべきは
              <strong>「図の変更が Git で差分として追えるか」</strong>です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="font-bold text-primary mb-1">
                  コードベース（テキスト → 図を生成）
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mermaid・PlantUML・dbdiagram.io（DBML）。テキストなので Git
                  で差分レビューでき、PR で図の変更を確認できる。設計を資産として残すのに向く。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-foreground mb-1">
                  GUI（ドラッグして描く）
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Draw.io・Lucidchart・Figma/FigJam・Excalidraw。手早く自由に描け、
                  非エンジニアとの共同編集や発散に向く。差分管理は弱い。
                </p>
              </div>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      ツール
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      種別
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      特徴・向いている用途
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-medium text-foreground align-top">
                      Draw.io（diagrams.net）
                    </td>
                    <td className="py-2 px-4 align-top">GUI・無料</td>
                    <td className="py-2 px-4">
                      ブラウザ/デスクトップ/VS Code 拡張。ER テンプレ豊富。
                      <code>.drawio</code>（XML）を Git
                      管理でき、GitHub/GitLab 連携も可能。迷ったらこれ。
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-medium text-foreground align-top">
                      dbdiagram.io
                    </td>
                    <td className="py-2 px-4 align-top">コード・無料枠</td>
                    <td className="py-2 px-4">
                      DBML という DSL で DB スキーマ/ER図を記述。SQL
                      や画像にエクスポート。DB 設計に特化。
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-medium text-foreground align-top">
                      Mermaid
                    </td>
                    <td className="py-2 px-4 align-top">コード・無料</td>
                    <td className="py-2 px-4">
                      <code>erDiagram</code> 記法。Markdown/GitHub/Notion
                      に埋め込める。バージョン管理に最適（本ページでも使用）。
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-medium text-foreground align-top">
                      PlantUML
                    </td>
                    <td className="py-2 px-4 align-top">コード・無料</td>
                    <td className="py-2 px-4">
                      テキストで UML 全般＋ER を記述。CI で画像生成し、ドキュメント自動化に向く。
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-medium text-foreground align-top">
                      Lucidchart
                    </td>
                    <td className="py-2 px-4 align-top">GUI・商用</td>
                    <td className="py-2 px-4">
                      高機能・リアルタイム共同編集。チーム/エンタープライズ向け。
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-medium text-foreground align-top">
                      Figma / FigJam
                    </td>
                    <td className="py-2 px-4 align-top">GUI・無料枠</td>
                    <td className="py-2 px-4">
                      デザイン/ホワイトボード。要件整理〜概念モデルの発散・共同作業に。
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-medium text-foreground align-top">
                      Excalidraw
                    </td>
                    <td className="py-2 px-4 align-top">GUI・無料</td>
                    <td className="py-2 px-4">
                      手描き風・軽量。ブレストや初期スケッチに。
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-foreground align-top">
                      DBeaver / pgAdmin / MySQL Workbench
                    </td>
                    <td className="py-2 px-4 align-top">DB ツール</td>
                    <td className="py-2 px-4">
                      稼働中の DB から ER図を自動生成（リバースエンジニアリング）。現状把握に有効。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              dbdiagram.io のような「コードで DB を書く」ツールは、次のように記述します（DBML）。
            </p>

            <CodeBlock
              language="sql"
              title="dbdiagram.io（DBML）— テーブルと関連をコードで定義"
              code={`Table users {
  id int [pk]
  name varchar
  email varchar
}

Table orders {
  id int [pk]
  user_id int [ref: > users.id]  // 多対1（order が user を参照）
  total int
}`}
            />

            <InfoBox type="info" title="選び方の第一基準は「差分が Git で追えるか」">
              正解は 1 つではありません。設計を資産として残し、変更をレビューしたいなら
              <strong>コードベース</strong>（Mermaid / dbdiagram.io /
              PlantUML）。手早く描いて非エンジニアと合意形成したいなら
              <strong>GUI</strong>（Draw.io / Lucidchart / FigJam）。
              既存の DB があるなら <strong>リバースエンジニアリング</strong>
              （DBeaver 等）で現状を図に起こすのが速いです。
              実務では「FigJam でラフ → Draw.io か Mermaid で清書 → DB
              実装後は DB ツールで逆生成して同期」という流れもよく使われます。
            </InfoBox>
          </section>

          {/* Quiz: ツール選択 */}
          <section>
            <Quiz
              question="ER図の作成ツールを「コードベース（Mermaid / dbdiagram.io 等）」にする最大の利点は？"
              options={[
                { label: "図が必ず美しく自動整列される" },
                {
                  label:
                    "テキストなので Git で差分管理でき、変更を PR でレビューできる",
                  correct: true,
                },
                { label: "非エンジニアでもドラッグで直感的に編集できる" },
                { label: "DB に直接接続して自動で図が更新される" },
              ]}
              explanation="コードベースのツールは図の定義がテキストなので、Git で差分が追え、PR でレビューできます。設計を資産として残すのに向きます。ドラッグでの直感的編集は GUI（Draw.io 等）の利点、DB からの自動生成はリバースエンジニアリング（DBeaver 等）の利点で、別軸の話です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Draw.io（diagrams.net）",
                  url: "https://www.drawio.com/",
                  description:
                    "無料の GUI 作図ツール。ER図テンプレートがあり .drawio を Git 管理できる",
                },
                {
                  title: "dbdiagram.io（DBML）",
                  url: "https://dbdiagram.io/home",
                  description:
                    "DBML という DSL で DB スキーマ / ER図をコードで書く。SQL にエクスポート可能",
                },
                {
                  title: "Mermaid - Entity Relationship Diagrams",
                  url: "https://mermaid.js.org/syntax/entityRelationshipDiagram.html",
                  description:
                    "erDiagram 記法の公式リファレンス。関連記号と属性ブロックの書き方",
                },
                {
                  title: "Wikipedia - Entity–relationship model",
                  url: "https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model",
                  description:
                    "ER モデルとカーディナリティ・Crow's foot 記法の体系的な解説",
                },
                {
                  title: "Wikipedia - Database normalization",
                  url: "https://en.wikipedia.org/wiki/Database_normalization",
                  description:
                    "正規化（1NF / 2NF / 3NF）の定義と関数従属の解説",
                },
                {
                  title: "PostgreSQL - Foreign Keys",
                  url: "https://www.postgresql.org/docs/current/tutorial-fk.html",
                  description:
                    "外部キー制約の実装例。FK が関連を保証する仕組みを公式チュートリアルで",
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
