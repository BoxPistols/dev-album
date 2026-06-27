import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const ormRoles = [
  {
    title: "型安全なクエリ",
    description:
      "テーブル定義から TypeScript の型を生成し、存在しない列名や型の取り違えをコンパイル時に検出できる。",
  },
  {
    title: "スキーマとマイグレーション",
    description:
      "テーブル定義を1か所に集約し、その差分からマイグレーションを生成する。スキーマ変更を履歴として管理できる。",
  },
  {
    title: "ボイラープレートの削減",
    description:
      "接続・パラメータバインド・結果のマッピングを肩代わりする。生 SQL を直に組み立てる手間を減らせる。",
  },
];

export default function Orm() {
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
            ORM（Prisma / Drizzle）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            ORM（Object-Relational Mapping）は、DB
            のテーブルをコード上のオブジェクトや型として扱えるようにする道具です。
            ここでは ORM の役割と型安全クエリ、スキーマ定義とマイグレーション、
            つまずきやすい N+1 問題を整理し、Prisma と Drizzle
            という2つの代表的な選択肢、そして生 SQL
            との使い分けを一通り見ていきます。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "ORM",
            "Prisma",
            "Drizzle",
            "型安全",
            "マイグレーション",
            "N+1",
          ]}
        >
          <p>
            TypeScript で書いたコードと DB の間には、型の境界があります。生 SQL
            は柔軟ですが、列名のタイプミスや型の取り違えが実行時まで気づけません。
            ORM はスキーマから型を生成し、この境界を埋めてくれます。Prisma と
            Drizzle は方針が対照的なので、両方の考え方を知っておくと、
            プロジェクトに合った道具を選びやすくなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ORM の役割 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ORM の役割
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ORM は、アプリ側のオブジェクト/型と、DB
              側のテーブル/行の橋渡しをします。クエリの結果を手作業で型に詰め替える代わりに、
              ORM
              が自動で対応づけてくれるため、ロジックそのものに集中しやすくなります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ormRoles.map((role) => (
                <div
                  key={role.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {role.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 型安全クエリ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              型安全クエリ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              型安全クエリの利点は、間違いを<strong>コンパイル時</strong>
              に見つけられることです。 生 SQL の文字列では <code>nme</code>{" "}
              のようなタイプミスや、数値列を文字列として扱う取り違えが、
              本番で初めて表面化することがあります。ORM
              ではスキーマから型が生成されるため、こうした誤りをエディタ上で検出できます。
            </p>

            <InfoBox type="info" title="型は「契約」をコードに持ち込む手段">
              スキーマから生成された型は、DB の構造とコードの間の「契約」です。
              列を消す・型を変えるといった破壊的変更をすると、
              その列に依存するコードが型エラーになって即座に分かります。
              実行してみるまで気づけなかった不整合を、前倒しで潰せるようになります。
            </InfoBox>
          </section>

          {/* スキーマ定義とマイグレーション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              スキーマ定義とマイグレーション
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ORM ではテーブル定義を「スキーマ」として1か所にまとめます。Prisma
              は専用の <code>schema.prisma</code> ファイルに、Drizzle は
              TypeScript のコードとして定義します。スキーマを変更したら、
              その差分から<strong>マイグレーション</strong>を生成し、
              開発・本番に同じ順序で適用します。これにより環境間のスキーマのずれを抑えられます。
            </p>

            <CodeBlock
              language="ts"
              title="Prisma — schema.prisma（スキーマ駆動）"
              code={`// schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  orders    Order[]
  createdAt DateTime @default(now())
}

model Order {
  id     Int  @id @default(autoincrement())
  total  Decimal
  user   User @relation(fields: [userId], references: [id])
  userId Int
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              Prisma では <code>prisma migrate dev</code>{" "}
              を実行すると、スキーマの差分から SQL
              マイグレーションが生成され、型付きのクライアントも同時に再生成されます。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="ORM が生成する型を使うと、なぜバグを早く見つけられる？"
              options={[
                { label: "クエリの実行が速くなるから" },
                {
                  label:
                    "存在しない列名や型の取り違えを、コンパイル時に検出できるから",
                  correct: true,
                },
                { label: "SQL を一切書かなくてよくなるから" },
                { label: "DB の容量が自動で増えるから" },
              ]}
              explanation="ORM はスキーマからコードの型を生成します。これにより、生 SQL の文字列では実行時まで気づけなかった列名のタイプミスや型の不一致を、エディタやコンパイル時に検出できます。早い段階で誤りを潰せるのが型安全の利点です。"
            />
          </section>

          {/* N+1 問題 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              N+1 問題
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              N+1 問題は、ORM を使うときに最も踏みやすい性能の落とし穴です。
              「ユーザー一覧を取り（1回）、各ユーザーの注文を1人ずつ取りに行く（N回）」
              という形で、本来1〜2回で済む取得が N+1
              回のクエリに膨らみます。件数が増えるほど遅くなります。
            </p>

            <CodeBlock
              language="ts"
              title="N+1 を避ける（関連をまとめて取得する）"
              code={`// NG: ループ内で都度クエリ -> 1 + N 回
const users = await prisma.user.findMany();
for (const u of users) {
  const orders = await prisma.order.findMany({ where: { userId: u.id } });
}

// OK: include で関連をまとめて取得 -> クエリ回数を抑える
const usersWithOrders = await prisma.user.findMany({
  include: { orders: true },
});`}
            />

            <InfoBox type="warning" title="便利さの裏でクエリが増えていないか">
              ORM は関連データへのアクセスを <code>user.orders</code>{" "}
              のように自然に書けてしまうため、その裏で追加クエリが走っていることに気づきにくいです。
              <code>include</code>（Prisma）や <code>with</code>
              （Drizzle）で関連をまとめて取得する、 発行 SQL
              をログで確認する、といった習慣で N+1 を早めに見つけられます。
            </InfoBox>
          </section>

          {/* Prisma と Drizzle の比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Prisma と Drizzle の比較
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Prisma は<strong>スキーマ駆動</strong>で、専用 DSL
              にスキーマを書き、型付きクライアントを生成する方式です。Drizzle は
              <strong>TS スキーマ・SQL 寄り</strong>で、TypeScript
              でスキーマを定義し、SQL に近い書き味のクエリビルダを提供します。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-foreground font-bold">
                      観点
                    </th>
                    <th className="text-left p-3 text-foreground font-bold">
                      Prisma
                    </th>
                    <th className="text-left p-3 text-foreground font-bold">
                      Drizzle
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">
                      スキーマ定義
                    </td>
                    <td className="p-3">専用 DSL（schema.prisma）</td>
                    <td className="p-3">TypeScript コード</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">
                      クエリの書き味
                    </td>
                    <td className="p-3">高水準なオブジェクト API</td>
                    <td className="p-3">SQL に近いクエリビルダ</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">
                      生成ステップ
                    </td>
                    <td className="p-3">クライアント生成が必要</td>
                    <td className="p-3">型はコードから直接導出</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">
                      向いている場面
                    </td>
                    <td className="p-3">読みやすさ・開発体験を重視</td>
                    <td className="p-3">SQL の制御・軽量さを重視</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="ts"
              title="Drizzle — スキーマ定義とクエリ（TS スキーマ・SQL 寄り）"
              code={`import { pgTable, bigserial, text, timestamp } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";

export const users = pgTable("users", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// SQL に近い書き味のクエリ
const result = await db
  .select()
  .from(users)
  .where(eq(users.email, "hanako@example.com"));`}
            />
          </section>

          {/* 生 SQL との使い分け */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              生 SQL との使い分け
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ORM は万能ではありません。複雑な集計、ウィンドウ関数、 DB
              固有の最適化が必要な場面では、生 SQL
              の方が読みやすく速いこともあります。 多くの ORM は「ここだけ生
              SQL」という逃げ道（raw query）を用意しているので、 全体は ORM
              で書きつつ、要所だけ SQL に落とす使い分けが現実的です。
            </p>

            <CodeBlock
              language="ts"
              title="ORM から生 SQL を使う（要所だけ落とす）"
              code={`import { sql } from "drizzle-orm";

// 複雑な集計は SQL で直接書く（値はバインドされる）
const stats = await db.execute(sql\`
  SELECT user_id, COUNT(*) AS cnt, SUM(total) AS amount
  FROM orders
  WHERE created_at >= \${since}
  GROUP BY user_id
\`);`}
            />

            <InfoBox type="success" title="ORM か 生 SQL か、の二択にしない">
              基本は ORM
              で型安全と保守性を確保し、性能や表現力が足りない箇所だけ生 SQL
              に落とす——この組み合わせが扱いやすい落としどころです。 生 SQL
              を書くときも、値は必ずバインド（プレースホルダ化）して
              インジェクションを防ぎましょう。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Prisma と Drizzle の方針の違いとして適切なのはどれ？"
              options={[
                {
                  label:
                    "Prisma は専用 DSL でスキーマを書き、Drizzle は TypeScript で定義して SQL に近いクエリを書く",
                  correct: true,
                },
                {
                  label: "Prisma は SQL を一切使えず、Drizzle は型がない",
                },
                {
                  label: "両者ともマイグレーション機能を持たない",
                },
                {
                  label: "Drizzle だけが PostgreSQL に対応している",
                },
              ]}
              explanation="Prisma はスキーマ駆動で、専用 DSL（schema.prisma）に定義し型付きクライアントを生成します。Drizzle は TypeScript でスキーマを定義し、SQL に近い書き味のクエリビルダを提供します。どちらもマイグレーションと型安全を備え、複数の DB に対応します。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Prisma 公式ドキュメント",
                  url: "https://www.prisma.io/docs",
                  description:
                    "schema.prisma の書き方・マイグレーション・include の使い方",
                },
                {
                  title: "Drizzle ORM 公式ドキュメント",
                  url: "https://orm.drizzle.team/docs/overview",
                  description:
                    "TypeScript スキーマ定義と SQL 寄りクエリビルダのガイド",
                },
                {
                  title: "Prisma - Relation queries（N+1 対策）",
                  url: "https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries",
                  description: "include による関連取得と N+1 を避ける考え方",
                },
                {
                  title: "Drizzle - Query（with による関連取得）",
                  url: "https://orm.drizzle.team/docs/rqb",
                  description:
                    "リレーショナルクエリで関連をまとめて取得する方法",
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
