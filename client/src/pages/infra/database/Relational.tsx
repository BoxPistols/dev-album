import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const tableParts = [
  {
    title: "テーブル（表）",
    sub: "users, orders",
    description:
      "同じ種類のデータをまとめた集合。スプレッドシートの1枚のシートに相当する。1テーブル1エンティティが基本。",
  },
  {
    title: "行（レコード）",
    sub: "1人のユーザー",
    description:
      "テーブル内の1件のデータ。実体（ユーザー、注文）1つにあたる。主キーで一意に識別できるようにする。",
  },
  {
    title: "列（カラム）",
    sub: "name, email, created_at",
    description:
      "各データが持つ属性。型（INTEGER, TEXT, TIMESTAMP 等）と制約（NOT NULL, UNIQUE）を列ごとに定める。",
  },
];

const postgresStrengths = [
  {
    title: "JSONB",
    description:
      "JSON をバイナリ形式で保存し、内部にインデックスを張れる。リレーショナルの厳密さと、半構造化データの柔軟さを1つのテーブルで両立できる。",
  },
  {
    title: "拡張（EXTENSION）",
    description:
      "PostGIS（地理空間）、pg_trgm（あいまい検索）など、CREATE EXTENSION 一行で機能を足せる。コア機能を拡張で補強する設計思想を持つ。",
  },
  {
    title: "pgvector",
    description:
      "埋め込みベクトルを保存し、近傍検索（類似度検索）を実行できる拡張。専用ベクトル DB を増やさず、既存の PostgreSQL で RAG を構成できる。",
  },
];

export default function Relational() {
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
            リレーショナル DB と PostgreSQL
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            リレーショナルデータベースは、データを「行と列を持つ表」として整理し、
            表どうしを関係（リレーション）でつなぐ仕組みです。
            ここではテーブル・主キー・正規化・インデックス・トランザクションといった土台を整理し、
            そのうえで PostgreSQL が持つ JSONB や拡張、pgvector
            の強みを一通り見ていきます。
          </p>
        </div>

        <WhyNowBox
          tags={["RDB", "PostgreSQL", "SQL", "ACID", "正規化", "インデックス"]}
        >
          <p>
            Web アプリのデータの大半は、ユーザー・注文・商品のように
            「決まった構造を持ち、互いに関連するもの」です。
            この関係を正しく表現できるのがリレーショナル DB で、なかでも
            PostgreSQL は標準準拠と拡張性で広く使われています。
            土台を理解しておくと、後で扱うサーバーレス DB・ORM・ベクトル DB
            がどれも「この土台の上の選択肢」だと見通せるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* テーブル・行・列 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              テーブル・行・列という基本構造
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              リレーショナル DB
              のデータは、まず「表（テーブル）」に整理されます。
              表は複数の「行（レコード）」を持ち、各行は「列（カラム）」という属性の集まりです。
              スプレッドシートに似ていますが、列ごとに型と制約が決まっている点が決定的に違います。
              「email は文字列で重複不可」のようなルールを DB
              側で保証できるのが強みです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tableParts.map((part) => (
                <div
                  key={part.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {part.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {part.sub}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {part.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 主キー・外部キー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              主キーと外部キーで「関係」を作る
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>主キー（PRIMARY KEY）</strong>
              は、行を一意に識別する列です。 users テーブルなら id
              がそれにあたります。一方
              <strong>外部キー（FOREIGN KEY）</strong>
              は、別テーブルの主キーを参照する列で、
              「この注文はどのユーザーのものか」という関係を表します。
              外部キー制約を張ると、存在しないユーザー ID を持つ注文を DB
              が拒否してくれるため、データの整合性が壊れにくくなります。
            </p>

            <CodeBlock
              language="sql"
              title="テーブル定義（主キー・外部キー・制約）"
              code={`CREATE TABLE users (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  name       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE orders (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id    BIGINT NOT NULL REFERENCES users(id),
  total      NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>user_id ... REFERENCES users(id)</code>{" "}
              の一行が外部キーです。これにより orders.user_id には users
              に実在する id しか入れられなくなり、
              「持ち主のいない注文」が生まれることを DB レベルで防げます。
            </p>
          </section>

          {/* 正規化 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              正規化の要点 — 重複を1か所に集める
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              正規化は「同じ事実を複数の場所に書かない」ための整理術です。
              たとえば注文テーブルにユーザー名を直接持たせると、
              ユーザーが改名したとき全注文を書き換える必要が出ます。
              ユーザー情報は users テーブルだけに置き、注文からは user_id
              で参照することで、変更を1か所で完結させられます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">第1正規形</p>
                  <p className="text-muted-foreground">
                    1セルに1値。カンマ区切りの複数値を列に詰めない
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">第2正規形</p>
                  <p className="text-muted-foreground">
                    主キーの一部にしか依存しない列を別テーブルへ
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">第3正規形</p>
                  <p className="text-muted-foreground">
                    主キー以外の列に依存する列を別テーブルへ
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="正規化と非正規化は対立しない">
              実務では、読み取りを速くするために意図的に重複を持たせる「非正規化」も使います。
              大事なのは、まず正規化された形を理解したうえで、
              「ここは性能のために崩す」と<strong>意識的に</strong>
              選ぶことです。
              最初から崩していると、整合性のバグを後から追うことになります。
            </InfoBox>
          </section>

          {/* インデックス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              インデックスと検索性能
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              インデックスは、本の索引と同じく「特定の値がどこにあるか」を高速に引くための補助構造です。
              email で検索する処理が多いなら email
              にインデックスを張ることで、全行を順に走査する代わりに
              目的の行へ近道できます。多くの場合 B-tree
              インデックスが使われ、等価検索・範囲検索の両方に効きます。
            </p>

            <CodeBlock
              language="sql"
              title="インデックスの作成と実行計画の確認"
              code={`CREATE INDEX idx_orders_user_id ON orders (user_id);

-- どう検索されるかを確認する（Seq Scan か Index Scan か）
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 42;`}
            />

            <InfoBox type="warning" title="仕様と実測のギャップに注意">
              インデックスは「あれば必ず速くなる」ものではありません。
              仕様上は検索を速くする仕組みですが、実測では行数が少ない・
              対象がテーブルの大半に一致するといった場合、プランナが
              あえて全走査（Seq Scan）を選ぶことがあります。理由は、
              インデックス経由のランダムアクセスより順次読みの方が速いと
              判断されるためです。<code>EXPLAIN ANALYZE</code>{" "}
              で実際の選択を確認する癖をつけましょう。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="外部キー制約を張る主な目的はどれ？"
              options={[
                { label: "検索を高速化するため" },
                {
                  label:
                    "参照先に存在しない値を防ぎ、テーブル間の整合性を保つため",
                  correct: true,
                },
                { label: "ディスク使用量を減らすため" },
                { label: "列を自動で正規化するため" },
              ]}
              explanation="外部キーは「この列の値は、参照先テーブルに実在する主キーでなければならない」という制約です。これにより、持ち主のいない注文のような不整合なデータが生まれることを DB レベルで防げます。検索高速化はインデックスの役割です。"
            />
          </section>

          {/* トランザクションと ACID */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              トランザクションと ACID
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              トランザクションは「複数の操作を1つのまとまりとして扱う」仕組みです。
              送金処理で「A から引く」「B
              に足す」のどちらかだけが成功すると残高が壊れますが、
              トランザクションで囲めば、両方成功するか、両方なかったことになるか
              のどちらかになります。この性質を支えるのが ACID です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Atomicity（原子性）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  全部成功するか、全部取り消すか。途中までの状態を残さない。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Consistency（一貫性）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  制約に違反する状態には遷移しない。整合性ルールが常に保たれる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Isolation（独立性）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  同時実行されるトランザクションが互いに干渉しないように見える。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Durability（永続性）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  コミットした結果は、障害が起きても失われない。
                </p>
              </div>
            </div>

            <CodeBlock
              language="sql"
              title="トランザクションの基本"
              code={`BEGIN;

UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;

COMMIT;  -- 途中で失敗したら ROLLBACK で全て取り消す`}
            />
          </section>

          {/* JOIN とマイグレーション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              JOIN とマイグレーション
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              正規化で分けたテーブルは、<strong>JOIN</strong>{" "}
              で再びつなぎ合わせて取り出します。
              「各ユーザーと、そのユーザーの注文合計」のように、
              関連するテーブルを user_id でひも付けて1つの結果にまとめられます。
            </p>

            <CodeBlock
              language="sql"
              title="JOIN の例（ユーザーごとの注文合計）"
              code={`SELECT
  u.id,
  u.name,
  COUNT(o.id)        AS order_count,
  COALESCE(SUM(o.total), 0) AS total_amount
FROM users AS u
LEFT JOIN orders AS o ON o.user_id = u.id
GROUP BY u.id, u.name
ORDER BY total_amount DESC;`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              <code>LEFT JOIN</code>{" "}
              にすると、注文が1件もないユーザーも結果に残ります（合計は 0）。
              一方<strong>マイグレーション</strong>は、テーブル定義の変更履歴を
              バージョン管理する仕組みです。「列を追加する」「インデックスを張る」
              といった変更を SQL
              ファイルとして積み上げ、開発・本番で同じ順序で適用します。
            </p>

            <InfoBox type="success" title="スキーマもコードとして管理する">
              マイグレーションファイルを Git で管理すると、DB
              の構造変更がコードレビューの対象になります。
              「誰が・いつ・なぜ列を足したか」が履歴に残り、
              本番とローカルのスキーマがずれる事故を減らせます。
              この考え方は後の章で扱う ORM
              のマイグレーション機能にも引き継がれます。
            </InfoBox>
          </section>

          {/* PostgreSQL の強み */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              PostgreSQL の強み（JSONB・拡張・pgvector）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              PostgreSQL は標準 SQL への準拠と拡張性で知られるオープンソースの
              RDB です。
              リレーショナルの厳密さを保ちながら、半構造化データやベクトル検索まで
              1つの DB
              でこなせるため、小さく始めて長く使い続けやすい選択肢になっています。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {postgresStrengths.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>

            <CodeBlock
              language="sql"
              title="JSONB 列と pgvector 拡張の例"
              code={`-- 半構造化データを JSONB で持つ
ALTER TABLE users ADD COLUMN preferences JSONB DEFAULT '{}';
SELECT * FROM users WHERE preferences->>'theme' = 'dark';

-- ベクトル検索（pgvector 拡張）
CREATE EXTENSION IF NOT EXISTS vector;
ALTER TABLE docs ADD COLUMN embedding vector(1536);
SELECT id FROM docs ORDER BY embedding <-> '[...]' LIMIT 5;`}
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="トランザクションの「原子性（Atomicity）」が保証することはどれ？"
              options={[
                { label: "クエリが必ず1秒以内に終わること" },
                {
                  label:
                    "複数の操作が、全て成功するか全て取り消されるかのどちらかになること",
                  correct: true,
                },
                { label: "データが必ず正規化されること" },
                { label: "インデックスが自動で作られること" },
              ]}
              explanation="原子性は「途中までの状態を残さない」性質です。送金のように複数の更新がセットになる処理で、一部だけ成功して残高が壊れる事態を防ぎます。失敗した場合は ROLLBACK で全ての変更がなかったことになります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "PostgreSQL 公式ドキュメント",
                  url: "https://www.postgresql.org/docs/",
                  description:
                    "テーブル定義・トランザクション・インデックス・JSONB まで網羅した一次情報",
                },
                {
                  title: "pgvector（GitHub）",
                  url: "https://github.com/pgvector/pgvector",
                  description:
                    "PostgreSQL でベクトル検索を行う拡張。インストール方法と演算子の一覧",
                },
                {
                  title: "MDN - SQL の概要",
                  url: "https://developer.mozilla.org/en-US/docs/Glossary/SQL",
                  description:
                    "SQL という言語そのものの位置づけを掴むための入り口",
                },
                {
                  title: "PostgreSQL - EXPLAIN の使い方",
                  url: "https://www.postgresql.org/docs/current/using-explain.html",
                  description:
                    "実行計画を読み、インデックスが使われているかを確認する方法",
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
