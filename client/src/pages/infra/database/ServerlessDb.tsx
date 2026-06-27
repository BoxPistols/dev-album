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
import CodingChallenge from "@/components/CodingChallenge";

const services = [
  {
    title: "Neon",
    sub: "PostgreSQL",
    description:
      "ストレージとコンピュートを分離したサーバーレス PostgreSQL。ブランチング機能と HTTP/WebSocket ドライバを備える。",
  },
  {
    title: "PlanetScale",
    sub: "MySQL / Vitess",
    description:
      "Vitess をベースにした MySQL 互換サービス。スキーマ変更をブランチとデプロイリクエストで運用する設計。",
  },
  {
    title: "Turso",
    sub: "SQLite / libSQL",
    description:
      "SQLite を分散展開する libSQL ベースのサービス。エッジ近くにレプリカを置き、読み取りの近接性を高めやすい。",
  },
  {
    title: "Supabase",
    sub: "PostgreSQL + BaaS",
    description:
      "PostgreSQL に認証・ストレージ・自動 API を載せた BaaS。プール済みの接続エンドポイントも提供する。",
  },
];

export default function ServerlessDb() {
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
            サーバーレス DB と接続管理
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            サーバーレス DB
            は、サーバの台数やスケーリングを意識せずに使えるデータベースサービスです。
            Neon・PlanetScale・Turso・Supabase
            などがこの領域に並びます。ここでは各サービスの位置づけと、
            サーバーレス関数から大量に接続したときに起きる
            コネクションの問題、そしてプールやエッジ対応ドライバによる解き方を整理します。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "Serverless",
            "Neon",
            "Supabase",
            "接続プール",
            "Edge",
            "PgBouncer",
          ]}
        >
          <p>
            Vercel や Cloudflare のようなサーバーレス/エッジ環境では、
            関数が大量に同時起動します。従来型の DB
            接続をそのまま使うと、リクエストごとに接続が増えて上限に達しやすくなります。
            この「サーバーレス × 大量コネクション」の構造を理解すると、 なぜ
            Neon や Supabase
            が接続プールやエッジ対応ドライバを推しているのかが腑に落ちます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* サービスの位置づけ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              主要サービスの位置づけ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              サーバーレス DB
              と一口に言っても、土台のエンジンと得意分野はそれぞれ違います。
              PostgreSQL 系（Neon・Supabase）、MySQL 系（PlanetScale）、 SQLite
              系（Turso）といった軸で捉えると、選定の見通しが立てやすくなります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {s.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {s.sub}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* サーバーレス × 大量コネクション問題 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              サーバーレス関数 × 大量コネクション問題
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              PostgreSQL
              は接続1つごとにサーバ側でプロセス（やメモリ）を確保します。
              従来のアプリは長時間生きるプロセスが数本だけ接続を保持していたため、
              これで問題ありませんでした。ところがサーバーレス環境では、
              リクエストの波に合わせて関数インスタンスが数百同時に立ち上がり、
              それぞれが接続を開こうとします。
            </p>

            <InfoBox type="warning" title="仕様では十分、実測では足りなくなる">
              仕様では、PostgreSQL の <code>max_connections</code> は
              数百まで設定でき、一見十分に見えます。実測では、
              サーバーレス関数が同時起動するたびに接続を1つずつ開くため、
              トラフィックのスパイク時に上限へ達し
              <code>too many connections</code>{" "}
              エラーが出ることがあります。理由は、
              接続が「アプリの規模」ではなく「同時実行された関数の数」に比例して増えるからです。
              だからプーリングが必要になります。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="サーバーレス環境で DB 接続が枯渇しやすいのはなぜ？"
              options={[
                { label: "サーバーレスでは SQL が使えないから" },
                {
                  label:
                    "リクエストに応じて関数が大量に同時起動し、それぞれが接続を開こうとするから",
                  correct: true,
                },
                { label: "PostgreSQL は接続を1つしか許可しないから" },
                { label: "エッジでは暗号化が必須になるから" },
              ]}
              explanation="従来は数本の長命プロセスが接続を保持していました。サーバーレスではトラフィックに応じて関数インスタンスが多数同時に立ち上がり、各々が接続を開くため、同時接続数が一気に増えて上限に達しやすくなります。これを緩和するのが接続プールです。"
            />
          </section>

          {/* コネクションプール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              コネクションプール（PgBouncer）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              コネクションプールは、アプリと DB
              の間に立って接続を使い回す中継役です。PostgreSQL の代表格が
              <strong>PgBouncer</strong>で、
              多数のクライアント接続を、少数の実接続にまとめて DB へ流します。
              Neon や Supabase
              は、このプール済みエンドポイントを標準で提供しています。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">大量の関数</p>
                  <p className="text-muted-foreground">
                    数百の同時接続を要求する
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">PgBouncer</p>
                  <p className="text-muted-foreground">
                    接続を束ね、少数の実接続に集約する
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">PostgreSQL</p>
                  <p className="text-muted-foreground">
                    少ない実接続だけを処理する
                  </p>
                </div>
              </div>
            </div>

            <MermaidDiagram
              title="図: サーバーレス関数からプール経由で接続する流れ"
              chart={`flowchart LR
    F1["関数A"] --> P["プーラー(PgBouncer)"]
    F2["関数B"] --> P
    F3["関数C(数百同時)"] --> P
    P -->|"少数の実接続にまとめる"| PG["PostgreSQL"]`}
            />

            <InfoBox
              type="info"
              title="transaction モードと prepared statement"
            >
              PgBouncer の transaction
              プーリングは接続をトランザクション単位で貸し出すため効率が高い反面、
              セッションをまたぐ prepared statement
              と相性が悪いことがあります。プール経由で接続する際は、
              使うドライバや ORM
              がこのモードに対応しているか（または無効化が必要か）を確認しておくと安全です。
            </InfoBox>
          </section>

          {/* HTTP・エッジ対応ドライバ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              HTTP・エッジ対応ドライバ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Cloudflare Workers のようなエッジランタイムは、生の TCP
              ソケットを扱えないことがあります。 そこで Neon などは、SQL を HTTP
              や WebSocket で送る専用ドライバを用意しています。これを使うと、
              接続のたびに TCP/TLS ハンドシェイクを張り直す代わりに、軽い HTTP
              リクエストとしてクエリを投げられます。単発クエリの多い
              サーバーレス関数と特に相性がよい方式です。
            </p>

            <CodeBlock
              language="ts"
              title="Neon serverless driver（HTTP 経由）の接続例"
              code={`import { neon } from "@neondatabase/serverless";

// DATABASE_URL はプール済みエンドポイントを指す
const sql = neon(process.env.DATABASE_URL!);

export async function getUser(id: number) {
  // TCP ソケット不要。HTTP でクエリを送れる
  const rows = await sql\`SELECT id, name FROM users WHERE id = \${id}\`;
  return rows[0];
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              タグ付きテンプレートでパラメータを渡すと、値は自動でプレースホルダ化され、
              SQL インジェクションを防げます。エッジで動かす場合は、 この HTTP
              ドライバを選ぶことで TCP 制約を回避できます。
            </p>

            <div className="mt-8">
              <CodingChallenge
                preview
                previewType="config"
                title="プール済みエンドポイントを指す接続文字列を書こう"
                description="サーバーレス関数の接続枯渇を避けるには、ダイレクト接続ではなくプーラー(PgBouncer)経由のホストを指定します。pgbouncer=true を付けてプールモードを有効にした接続文字列を完成させてください。"
                initialCode={`# .env — プール経由の接続文字列
# ダイレクト接続ではなく、プーラー経由のホストを指定する
DATABASE_URL="postgres://user:pass@db.pooler.example.com:6543/app?___=true"`}
                answer={`# .env — プール経由の接続文字列
# ダイレクト接続ではなく、プーラー経由のホストを指定する
DATABASE_URL="postgres://user:pass@db.pooler.example.com:6543/app?pgbouncer=true"`}
                hints={["プーラー経由を示すクエリパラメータは pgbouncer"]}
                keywords={["pgbouncer=true"]}
              />
            </div>
          </section>

          {/* DB ブランチング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              DB ブランチング
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Neon や PlanetScale は、Git のブランチに似た
              <strong>DB ブランチング</strong>を提供します。
              本番データのコピー（コピーオンライト）を一瞬で作り、
              プレビュー環境やマイグレーションの検証に使えます。
              プルリクエストごとに使い捨ての DB
              を立て、マージしたら破棄する、といった運用が組めます。
            </p>

            <CodeBlock
              language="bash"
              title="ブランチを作って検証する（イメージ）"
              code={`# 本番からブランチを切る
neonctl branches create --name preview/pr-123

# そのブランチ専用の接続文字列を取得
neonctl connection-string preview/pr-123

# 検証が終わったら破棄
neonctl branches delete preview/pr-123`}
            />

            <InfoBox type="success" title="プレビュー環境と相性がよい">
              ブランチごとに独立したデータを持てるため、
              「本番データを汚さずにマイグレーションを試す」「PR
              プレビューに専用 DB を割り当てる」といった使い方ができます。
              スキーマ変更のレビューを、実データに近い環境で行えるのが利点です。
            </InfoBox>
          </section>

          {/* スケール課金 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              スケールと課金モデル
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              サーバーレス DB
              の多くは、使った分だけ支払う従量課金を採用しています。
              アクセスがない間はコンピュートをゼロまで縮める （scale to
              zero）サービスもあり、開発環境やトラフィックの波が大きい用途で無駄が出にくくなります。
              一方で、scale to zero
              からの復帰時には起動の待ち時間（コールドスタート）が乗ることがあります。
            </p>

            <InfoBox type="info" title="価格は変動するので一次情報で確認">
              ストレージ量・コンピュート時間・転送量など、課金軸はサービスごとに異なり、
              料金体系も改定されます。具体的な金額は断定せず、
              選定時は各サービスの料金ページで最新の条件を確認してください。
              本番では「scale to zero
              の復帰遅延が許容できるか」も含めて評価すると判断を誤りにくくなります。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="エッジランタイム向けの HTTP 対応 DB ドライバが役立つのはなぜ？"
              options={[
                {
                  label: "SQL を書かなくてよくなるから",
                },
                {
                  label:
                    "生の TCP ソケットを使えない環境でも、HTTP でクエリを送れるから",
                  correct: true,
                },
                { label: "データが自動で正規化されるから" },
                { label: "課金が必ず無料になるから" },
              ]}
              explanation="Cloudflare Workers のようなエッジ環境は生の TCP ソケットを扱えないことがあります。HTTP/WebSocket 対応ドライバは SQL を HTTP リクエストとして送れるため、こうした環境でも DB にアクセスでき、単発クエリの多いサーバーレス関数とも相性がよくなります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Neon - Serverless driver",
                  url: "https://neon.tech/docs/serverless/serverless-driver",
                  description:
                    "HTTP/WebSocket でクエリを送るドライバの公式ガイド",
                },
                {
                  title: "Supabase - Connection pooling",
                  url: "https://supabase.com/docs/guides/database/connecting-to-postgres",
                  description:
                    "プール済みエンドポイントとダイレクト接続の使い分け",
                },
                {
                  title: "PlanetScale Documentation",
                  url: "https://planetscale.com/docs",
                  description:
                    "ブランチとデプロイリクエストによるスキーマ運用の解説",
                },
                {
                  title: "PgBouncer 公式ドキュメント",
                  url: "https://www.pgbouncer.org/",
                  description:
                    "接続プーラの設定とプーリングモード（session/transaction）の違い",
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
