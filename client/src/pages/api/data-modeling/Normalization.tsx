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

// 正規形の段階を表で示すためのデータ
const normalForms = [
  {
    name: "第1正規形 (1NF)",
    rule: "各セルは単一値。1カラムにカンマ区切りで複数値を入れない。",
    fix: "繰り返し列・配列は別テーブル/別行に分ける。",
  },
  {
    name: "第2正規形 (2NF)",
    rule: "1NF かつ、複合主キーの一部にだけ依存する属性（部分関数従属）を排除。",
    fix: "主キーの一部で決まる属性を、その一部をキーにした別テーブルへ。",
  },
  {
    name: "第3正規形 (3NF)",
    rule: "2NF かつ、主キー以外の属性に依存する属性（推移的関数従属）を排除。",
    fix: "「キー以外の列で決まる列」を、その列をキーにした別テーブルへ。",
  },
];

export default function Normalization() {
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
            正規化と良いモデルの指針
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            正規化は、難しそうな理論より「1つの事実は1か所に」という一言で捉えると一気に分かりやすくなります。
            同じデータが複数の場所に重複していると、片方だけ直して片方が古いまま、という事故（更新異常）が起きます。
            これを防ぐためにテーブルを分割するのが正規化です。BE/DB
            が苦手なフロントエンドの人にも、 API
            レスポンスの形を考えるうえで効いてきます。
          </p>
        </div>

        <WhyNowBox
          tags={["正規化", "1NF/2NF/3NF", "更新異常", "RDB", "API設計"]}
        >
          <p>
            API が返すデータの裏側には、たいてい複数のテーブルがあります。
            <strong>
              テーブルの分け方（モデリング）が崩れていると、API
              も整合性を保てません
            </strong>
            。 「1つの事実は1か所に」を守ると、データの重複と更新漏れが減り、
            結果として API のレスポンスも素直で予測しやすくなります。 正規化は
            DB だけの話に見えて、API の設計品質に直結する基礎です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 正規化とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              正規化とは「1つの事実は1か所に」
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>正規化（normalization）</strong>
              とは、冗長（同じデータの重複）をなくし、更新異常を防ぐために、
              テーブルを意味のある単位に分割していく手法です。
              <strong>更新異常</strong>
              とは、同じデータが複数箇所にあるせいで、ひとつを更新したときに
              他の場所が古いまま残り、データが食い違ってしまう問題を指します。
              ゴールはシンプルで、「ある事実を表す値は、データベースの中の 1
              か所だけに置く」ことです。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <p className="font-bold text-foreground mb-2 text-base">
                更新異常の具体例
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                注文テーブルに「ユーザー名」と「ユーザーのメールアドレス」を毎行コピーして持っていたとします。
                ユーザーがメールアドレスを変更したら、そのユーザーの過去の注文行
                <strong>すべて</strong>を書き換えなければ整合しません。 1
                行でも漏れると、同じユーザーなのにメールが食い違う状態になります。
                ユーザー情報を <code>user</code> テーブルに 1
                か所だけ持ち、注文側は <code>user_id</code> で参照すれば、変更は
                1 か所で済みます。
              </p>
            </div>

            <InfoBox type="info" title="まず直感、理論は後でいい">
              正規形（1NF / 2NF / 3NF）には正確な定義がありますが、
              実務でモデルを組むときは、まず「同じ値をあちこちにコピーしていないか？」を疑うだけで
              多くの問題を避けられます。用語は、その直感に名前を付けたものだと考えてください。
            </InfoBox>
          </section>

          {/* 正規形の段階 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              正規形の3段階（1NF → 2NF → 3NF）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              正規化は段階的に進みます。下にいくほど「重複の余地」を削っていくイメージです。
              まずは表で全体像をつかみ、続く節で 1NF
              を具体的なテーブルで見ていきます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted whitespace-nowrap">
                      正規形
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      ルール
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      やること
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {normalForms.map((nf) => (
                    <tr key={nf.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-bold text-primary whitespace-nowrap align-top">
                        {nf.name}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {nf.rule}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {nf.fix}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="用語の噛み砕き">
              <strong>主キー（PK）</strong>＝行を一意に識別する列。
              <strong>外部キー（FK）</strong>
              ＝他テーブルの主キーを指す参照（例：
              <code>order.user_id</code> が <code>user.id</code> を指す）。
              <strong>関数従属</strong>
              ＝「A が決まれば B
              が決まる」という関係。正規化は、この「決まり方」が
              主キー以外にぶら下がっていないかを点検する作業です。
            </InfoBox>
          </section>

          {/* 1NF: 単一値 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              第1正規形（1NF）— 1セル1値にする
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              1NF のルールは「各セルは単一値。繰り返し列や配列を 1
              つのセルに詰め込まない」です。
              フロントエンドでは配列をそのまま持ちがちですが、RDB
              の素直な形は「1 行 = 1 つの事実」です。 下は、タグをカンマ区切りで
              1 列に押し込んだ
              <strong>1NF 違反</strong>の例です。
            </p>

            <CodeBlock
              language="sql"
              title="Before — 1NF 違反（tags に複数値を詰め込み）"
              code={`-- tags 列に "react,api,ts" のように複数値を入れている
CREATE TABLE post (
  id    INT PRIMARY KEY,
  title TEXT NOT NULL,
  tags  TEXT  -- 例: "react,api,ts"（複数値を1セルに）
);

-- 問題: 「api タグの記事だけ取得」が文字列検索になり壊れやすい。
-- タグの追加・削除・改名がすべて文字列操作になる。`}
            />

            <CodeBlock
              language="sql"
              title="After — 1NF（タグを別テーブルに分け、1行1値に）"
              code={`CREATE TABLE post (
  id    INT PRIMARY KEY,
  title TEXT NOT NULL
);

-- 1つのタグ = 1行。post と tag の対応を中間テーブルで表す（N:M）
CREATE TABLE tag (
  id   INT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE post_tag (
  post_id INT NOT NULL REFERENCES post(id),
  tag_id  INT NOT NULL REFERENCES tag(id),
  PRIMARY KEY (post_id, tag_id)  -- 複合主キー
);`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              記事とタグは「1 つの記事に複数タグ、1 つのタグに複数記事」という
              <strong>多対多（N:M）</strong>の関係です。N:M は、両者の id を持つ
              <strong>中間テーブル（join table）</strong>（ここでは
              <code>post_tag</code>）で表現します。これで「api
              タグの記事一覧」も普通の結合で取れます。
            </p>
          </section>

          {/* 2NF / 3NF */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              第2正規形・第3正規形 — 「ぶら下がる先」を正す
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              2NF と 3NF は、どちらも「ある列が、主キー全体ではなく
              別のものに依存していないか」を点検します。違いは依存先です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  2NF — 部分関数従属を排除
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  主キーが複合キー（複数列）のとき、その
                  <strong>一部だけ</strong>で決まる属性を別テーブルへ。
                  例：主キーが (<code>order_id</code>, <code>product_id</code>)
                  の明細行に「商品名」を置くと、 商品名は{" "}
                  <code>product_id</code> だけで決まる＝部分従属。商品名は
                  <code>product</code> テーブルへ。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  3NF — 推移的関数従属を排除
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  主キー以外の列が<strong>別の非キー列</strong>
                  で決まる場合に分離。 例：<code>user</code> 表に{" "}
                  <code>zip</code>（郵便番号）と <code>city</code>{" "}
                  を両方置くと、
                  <code>city</code> は <code>zip</code>{" "}
                  で決まる＝推移的従属。住所マスタへ分ける。
                </p>
              </div>
            </div>

            <CodeBlock
              language="sql"
              title="3NF の例 — city は zip に従属するので分離"
              code={`-- Before: user に city が混ざっている（city は zip で決まる）
CREATE TABLE user (
  id   INT PRIMARY KEY,
  name TEXT,
  zip  TEXT,
  city TEXT  -- zip → city の推移的従属
);

-- After: 郵便番号→市区町村は別マスタに 1 か所だけ持つ
CREATE TABLE zip_area (
  zip  TEXT PRIMARY KEY,
  city TEXT NOT NULL
);

CREATE TABLE user (
  id   INT PRIMARY KEY,
  name TEXT,
  zip  TEXT REFERENCES zip_area(zip)
);`}
            />

            <InfoBox type="success" title="覚え方のコツ">
              2NF も 3NF も合言葉は同じ「1つの事実は1か所に」です。
              「この列、ほんとに主キー全体で決まる？
              それとも誰か他の列で決まる？」
              と一行ずつ問い直すだけで、自然と分離すべき箇所が見えてきます。
            </InfoBox>
          </section>

          {/* ER 図 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ER 図で関係を描く（カーディナリティ）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              テーブル同士の関係（リレーション）は <strong>ER 図</strong>
              で可視化します。要は「どのエンティティが、どれと、
              どんな個数で繋がるか」を表す図です。個数の関係を
              <strong>カーディナリティ</strong>と呼び、1:1 / 1:N / N:M
              の3種類があります。 まずは記号で描いた図を見てください。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-2 font-mono">USER</p>
                  <ul className="text-muted-foreground font-mono space-y-1">
                    <li>id (PK)</li>
                    <li>name</li>
                    <li>email</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-2 font-mono">ORDER</p>
                  <ul className="text-muted-foreground font-mono space-y-1">
                    <li>id (PK)</li>
                    <li>user_id (FK)</li>
                    <li>total</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-2 font-mono">
                    ORDER_ITEM
                  </p>
                  <ul className="text-muted-foreground font-mono space-y-1">
                    <li>order_id (FK)</li>
                    <li>product_id (FK)</li>
                    <li>qty</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground font-mono space-y-1">
                <p>
                  USER 1 ──&lt;
                  ORDER&nbsp;&nbsp;（1人のユーザーは複数の注文を持つ＝1:N）
                </p>
                <p>
                  ORDER 1 ──&lt;
                  ORDER_ITEM&nbsp;&nbsp;（1注文は複数の明細を持つ＝1:N）
                </p>
                <p>
                  ORDER &gt;──&lt; PRODUCT&nbsp;&nbsp;（多対多。ORDER_ITEM
                  が中間テーブル＝N:M）
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              同じ関係を「コードとして」書くこともできます。
              <strong>mermaid の erDiagram 記法</strong>
              を使うと、テキストで ER
              図を管理でき、差分レビューやドキュメント化が容易です。
              記号の意味は <code>||</code>＝ちょうど1、<code>o&#123;</code>
              ＝0以上の多、
              <code>|&#123;</code>＝1以上の多、です。
            </p>

            <MermaidDiagram
              title="mermaid erDiagram で同じ関係を書く（図）"
              chart={`erDiagram
  USER ||--o{ ORDER : places
  ORDER ||--|{ ORDER_ITEM : contains
  PRODUCT ||--o{ ORDER_ITEM : "appears in"

  USER {
    int id PK
    string name
    string email
  }
  ORDER {
    int id PK
    int user_id FK
    int total
  }
  ORDER_ITEM {
    int order_id FK
    int product_id FK
    int qty
  }`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>USER ||--o&#123; ORDER</code>{" "}
              は「ユーザーはちょうど1、注文は0以上」＝
              <strong>1:N</strong> を表します。多対多（N:M）は、上の
              <code>ORDER_ITEM</code> のように中間テーブルを挟んで、2つの 1:N
              に分解して描くのが定石です。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="次のうち、第1正規形（1NF）に違反しているのはどれ？"
              options={[
                {
                  label:
                    '1つの tags 列に "react,api,ts" のようにカンマ区切りで複数値を入れている',
                  correct: true,
                },
                { label: "ユーザー情報を user テーブルに1か所だけ持っている" },
                {
                  label:
                    "注文と商品の多対多を order_item という中間テーブルで表している",
                },
                { label: "各行が主キーで一意に識別できる" },
              ]}
              explanation="1NF は「各セルは単一値」が原則です。1列にカンマ区切りで複数値を詰め込むのは典型的な 1NF 違反で、別テーブル（や別行）に分けて1セル1値にします。中間テーブルで多対多を表すのは正しい設計です。"
            />
          </section>

          {/* 非正規化 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              非正規化 — あえて冗長を許すトレードオフ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              正規化は整合性のための手法ですが、テーブルを分けるほど
              読み取り時の<strong>結合（JOIN）</strong>が増え、
              読み取りが重くなることがあります。そこで、
              <strong>非正規化（denormalization）</strong>
              ——読み取りを速くするために、あえて一部のデータを重複して持つ
              ——という逆向きの判断もあります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  正規化を優先する場面
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  書き込み・更新が多い／整合性が最優先。重複を持たないので
                  更新は1か所で済み、更新異常が起きない。まずはここから。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  非正規化を検討する場面
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  読み取りが圧倒的に多く JOIN
                  がボトルネック。集計値やよく一緒に読む値を あえて重複保持して
                  JOIN を減らす。整合性は別途担保が必要。
                </p>
              </div>
            </div>

            <InfoBox type="warning" title="非正規化はコストとセットで判断する">
              非正規化は「読み取りが速くなる」代わりに、
              <strong>重複したデータを書き込み時に同期させる責任</strong>
              を負います。同期を忘れると、まさに更新異常が再発します。
              「読み多寡（read
              が圧倒的に多いか）」と「ずれたときの被害」を見比べ、
              迷ったらまず正規化を優先するのが安全です。
            </InfoBox>
          </section>

          {/* API への影響 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              正規化された DB と API レスポンスの関係
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              正規化すると、1 つの概念が複数テーブルに分かれます。しかし、API
              の利用者（多くはフロントエンド）は、
              <strong>毎回テーブルを意識したくありません</strong>。 そのため API
              側で結合し、「1
              つの使いやすいリソース」としてまとめて返すのが普通です。 DB
              の物理構造をそのまま API の形にする必要はありません。
            </p>

            <CodeBlock
              language="json"
              title="user / order / order_item を結合し、1リソースとして返す例"
              code={`{
  "id": 42,
  "total": 5800,
  "user": { "id": 7, "name": "Ito", "email": "ito@example.com" },
  "items": [
    { "product": "Keyboard", "qty": 1 },
    { "product": "Mouse",    "qty": 2 }
  ]
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              DB は正規化されて 3 テーブルに分かれていても、API
              は文脈に合わせて結合し、ネストした 1 つの JSON
              にまとめられます。どこまでまとめるか・どこから別エンドポイントに分けるかは、
              フロントエンドの使い方とのすり合わせで決まります。詳しくは{" "}
              <Link
                href="/api/collaboration/backend-frontend"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                バックエンドとフロントエンドの協働
              </Link>{" "}
              を参照してください。
            </p>

            <InfoBox type="info" title="DB構造をそのままAPIに晒さなくてよい">
              正規化は BE/DB 側の関心事です。API
              レスポンスは、利用側が扱いやすい形に
              <strong>結合・整形してから返して構いません</strong>。 「DB
              のテーブル = API のリソース」と思い込まず、
              テーブルは整合性のために正規化しつつ、API
              は利用文脈に合わせて組み立てる、と分けて考えるのが実用的です。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="非正規化（denormalization）をあえて行う主な理由はどれ？"
              options={[
                {
                  label:
                    "JOIN を減らして読み取りを高速化するため（書き込み時の整合コストとのトレードオフ）",
                  correct: true,
                },
                { label: "更新異常を起こしやすくして整合性を下げるため" },
                { label: "1NF 違反を意図的に作り出すため" },
                { label: "外部キーを廃止して参照関係をなくすため" },
              ]}
              explanation="非正規化はあえて冗長を許し、JOIN を減らして読み取りを速くする最適化です。代償として、重複データを書き込み時に同期する責任が増えます。読み取りが圧倒的に多い場面で、整合コストと天秤にかけて判断します。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "PostgreSQL Documentation - CREATE TABLE",
                  url: "https://www.postgresql.org/docs/current/sql-createtable.html",
                  description:
                    "PRIMARY KEY / REFERENCES（外部キー）など、テーブル定義の一次リファレンス",
                },
                {
                  title: "Mermaid - Entity Relationship Diagrams",
                  url: "https://mermaid.js.org/syntax/entityRelationshipDiagram.html",
                  description:
                    "erDiagram 記法とカーディナリティ記号（||--o{ 等）の公式仕様",
                },
                {
                  title: "MDN - データベース正規化（用語集）",
                  url: "https://developer.mozilla.org/en-US/docs/Glossary/Database_normalization",
                  description: "正規化の目的と更新異常の考え方を簡潔に解説",
                },
                {
                  title: "Wikipedia - Database normalization",
                  url: "https://en.wikipedia.org/wiki/Database_normalization",
                  description: "1NF / 2NF / 3NF と関数従属の定義をまとめた解説",
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
