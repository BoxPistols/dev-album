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

const managedTakeover = [
  {
    title: "バックアップと復旧",
    description:
      "自動バックアップ・スナップショット・特定時点への復元（PITR）を AWS が用意する。手動の cron バックアップを自前で組む必要がない。",
  },
  {
    title: "パッチとバージョン管理",
    description:
      "OS や DB エンジンのセキュリティパッチ適用を、メンテナンスウィンドウ内で自動適用できる。サーバに SSH して更新する作業から解放される。",
  },
  {
    title: "可用性とスケール",
    description:
      "マルチ AZ による自動フェイルオーバーや、リードレプリカの追加をコンソール操作で行える。冗長構成を手作業で組まなくてよい。",
  },
];

export default function Database() {
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
            データベース（RDS / Aurora / DynamoDB）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            アプリのデータをどこに保存するかは、設計の中心です。AWS
            にはリレーショナルな RDS / Aurora、NoSQL の DynamoDB、 キャッシュの
            ElastiCache など、目的別のマネージドデータベースがそろっています。
            ここでは、それぞれの得意分野と、マネージドにすることで何が楽になるのかを一通り掴めます。
          </p>
        </div>

        <WhyNowBox tags={["RDS", "Aurora", "DynamoDB", "ElastiCache", "NoSQL"]}>
          <p>
            データベースは「動けば良い」では済まない領域です。バックアップ・冗長化・
            パッチ適用・スケールを誤ると、障害やデータ消失に直結します。
            マネージドデータベースは、これらの運用作業を AWS
            に肩代わりさせる仕組みです。フロントエンドやアプリ開発に集中するためにも、
            「どの DB を選ぶと、どの運用が自動化されるのか」を理解しておくと、
            構成の判断がぶれにくくなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* RDS */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              RDS — マネージドなリレーショナルデータベース
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              RDS（Relational Database Service）は、MySQL / PostgreSQL / MariaDB
              / Oracle / SQL Server といった
              <strong>リレーショナルデータベースをマネージドで提供</strong>
              するサービスです。 使い慣れた SQL
              とテーブル設計をそのまま使いながら、 運用の重い部分を AWS
              に任せられます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">マルチ AZ</p>
                  <p className="text-muted-foreground">
                    別のアベイラビリティゾーンに同期スタンバイを持ち、障害時に自動フェイルオーバー
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">リードレプリカ</p>
                  <p className="text-muted-foreground">
                    読み取り専用の複製を増やし、参照クエリの負荷を分散できる
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    自動バックアップ
                  </p>
                  <p className="text-muted-foreground">
                    日次スナップショット +
                    トランザクションログで特定時点に復元できる
                  </p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              ここで覚えておきたいのは、
              <strong>
                マルチ AZ は可用性のため、リードレプリカはスケールのため
              </strong>
              という役割の違いです。マルチ AZ
              のスタンバイは通常は読み取りに使わず、
              あくまで障害時の切り替え先です。混同しやすいので、目的で分けて理解しておきましょう。
            </p>

            <MermaidDiagram
              title="図: RDS のマルチ AZ とリードレプリカの構成"
              chart={`flowchart TD
    APP["アプリケーション"] -->|"書き込み・読み取り"| PRI["プライマリ（AZ-a）"]
    PRI -.->|"同期レプリケーション"| STB["スタンバイ（AZ-c・障害時に昇格）"]
    PRI -.->|"非同期レプリケーション"| RR1["リードレプリカ 1"]
    PRI -.->|"非同期レプリケーション"| RR2["リードレプリカ 2"]
    APP -->|"参照のみ"| RR1
    APP -->|"参照のみ"| RR2`}
            />
          </section>

          {/* Aurora */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Aurora — クラウドネイティブな互換データベース
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Aurora は AWS が独自に作り直した、
              <strong>MySQL / PostgreSQL 互換</strong>のデータベースです。
              アプリからは MySQL や PostgreSQL として接続できるため、
              既存のドライバやツールをそのまま使えます。一方でストレージ層は
              クラウド向けに再設計されており、複数 AZ
              にまたがってデータを冗長化し、
              ストレージは使った分だけ自動で拡張されます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「RDS
              の運用の手軽さ」と「クラウド向けの可用性・スケール」を両取りしたい場合の
              選択肢になります。さらに Aurora Serverless を使うと、
              負荷に応じて容量を自動で増減させ、アクセスの波が大きいワークロードに合わせやすくなります。
            </p>

            <InfoBox type="info" title="互換性の意味">
              「MySQL 互換」とは、接続プロトコルや SQL 方言の多くが MySQL
              と揃っているという意味です。
              アプリ側のコードを書き換えずに移行しやすい一方で、
              内部実装は別物なので、性能特性やまれな挙動の差は仕様で確認しておくと安全です。
            </InfoBox>
          </section>

          {/* DynamoDB */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              DynamoDB — マネージドな NoSQL
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              DynamoDB は AWS のフルマネージドな
              <strong>NoSQL（キーバリュー / ドキュメント）データベース</strong>
              です。
              テーブルにサーバ容量の概念がなく、アクセス量が増えても自動でスケールします。
              ミリ秒単位の応答を大規模なトラフィックでも維持しやすいのが特徴で、
              セッション管理・カート・IoT・大量の書き込みがある用途で選ばれます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              設計の鍵は<strong>パーティションキー</strong>です。 DynamoDB
              はパーティションキーの値でデータを分散して保存します。
              リレーショナルのように「後から自由に JOIN して検索」はせず、
              <strong>あらかじめアクセスパターンを決めてキーを設計する</strong>
              のが基本になります。 ここがリレーショナル DB
              と最も発想が異なる点です。
            </p>

            <CodeBlock
              language="bash"
              title="DynamoDB テーブル作成とクエリの例（AWS CLI）"
              code={`# パーティションキー userId + ソートキー createdAt のテーブルを作成
aws dynamodb create-table \\
  --table-name Orders \\
  --attribute-definitions \\
      AttributeName=userId,AttributeType=S \\
      AttributeName=createdAt,AttributeType=S \\
  --key-schema \\
      AttributeName=userId,KeyType=HASH \\
      AttributeName=createdAt,KeyType=RANGE \\
  --billing-mode PAY_PER_REQUEST

# 特定ユーザーの注文を、パーティションキー指定で取得
aws dynamodb query \\
  --table-name Orders \\
  --key-condition-expression "userId = :u" \\
  --expression-attribute-values '{":u": {"S": "user-42"}}'`}
            />

            <CodingChallenge
              preview
              previewType="terminal"
              title="DynamoDB テーブルを作成するコマンドを完成させよう"
              description="userId をパーティションキー（HASH）にした Orders テーブルを作成します。サブコマンドと key-schema のキータイプを埋めてください。"
              initialCode={`# userId をパーティションキーにした Orders テーブルを作る
aws dynamodb ___ \\
  --table-name Orders \\
  --attribute-definitions AttributeName=userId,AttributeType=S \\
  --key-schema AttributeName=userId,KeyType=___ \\
  --billing-mode PAY_PER_REQUEST`}
              answer={`# userId をパーティションキーにした Orders テーブルを作る
aws dynamodb create-table \\
  --table-name Orders \\
  --attribute-definitions AttributeName=userId,AttributeType=S \\
  --key-schema AttributeName=userId,KeyType=HASH \\
  --billing-mode PAY_PER_REQUEST`}
              hints={[
                "テーブルを作るサブコマンドは create-table",
                "パーティションキーの KeyType は HASH（ソートキーは RANGE）",
              ]}
              keywords={["create-table", "HASH"]}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="DynamoDB のパーティションキー設計で正しい考え方はどれ？"
              options={[
                {
                  label: "後から自由に JOIN するので、キーは適当でよい",
                },
                {
                  label:
                    "あらかじめアクセスパターンを決め、それに合わせてキーを設計する",
                  correct: true,
                },
                {
                  label: "パーティションキーはテーブルごとに 1 回しか使えない",
                },
                {
                  label: "キーを設計するとリレーショナル DB に自動変換される",
                },
              ]}
              explanation="DynamoDB はパーティションキーでデータを分散保存し、キー指定で高速に取得します。リレーショナル DB のように任意の条件で JOIN・検索する設計ではなく、先にアクセスパターンを決めてキー（とソートキー・インデックス）を設計するのが基本です。ここが NoSQL とリレーショナルの発想の分かれ目になります。"
            />
          </section>

          {/* ElastiCache */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ElastiCache — インメモリのキャッシュ層
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ElastiCache は<strong>Valkey / Memcached / Redis OSS</strong>{" "}
              をマネージドで提供する、
              インメモリのデータストアです。データをメモリ上に持つため、 RDS や
              DynamoDB へのアクセスより一段速い応答が得られます。
              よく読むデータをキャッシュして DB の負荷を下げたり、
              セッションやランキングのような一時的なデータを保持したりするのに使われます。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Valkey と Redis OSS
              はデータ構造（リスト・セット・ソート済みセットなど）や永続化、
              レプリケーションに対応し、用途が広いのが特徴です（Valkey は Linux
              Foundation 傘下の BSD ライセンスの key/value
              データストアで、Redis OSS 互換をうたっています）。Memcached
              はシンプルなキャッシュに特化しています。 「DB
              の手前に置いて読み取りを速くする層」と捉えると役割を掴みやすくなります。
            </p>
          </section>

          {/* リレーショナル vs NoSQL */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リレーショナル vs NoSQL の選び方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              どちらが優れているという話ではなく、
              <strong>データの形とアクセスパターン</strong>で選びます。
              関連が複雑で柔軟な検索が必要ならリレーショナル、
              アクセスパターンが決まっていて極端なスケールが要るなら NoSQL、
              というのが大まかな指針です。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="text-left p-3 border-b border-border">
                      観点
                    </th>
                    <th className="text-left p-3 border-b border-border">
                      リレーショナル（RDS / Aurora）
                    </th>
                    <th className="text-left p-3 border-b border-border">
                      NoSQL（DynamoDB）
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border text-foreground font-medium">
                      データモデル
                    </td>
                    <td className="p-3 border-b border-border">
                      テーブルと関連（スキーマあり）
                    </td>
                    <td className="p-3 border-b border-border">
                      キー中心（柔軟なスキーマ）
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border text-foreground font-medium">
                      検索
                    </td>
                    <td className="p-3 border-b border-border">
                      JOIN や複雑なクエリが得意
                    </td>
                    <td className="p-3 border-b border-border">
                      事前に決めたキー / インデックスで取得
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border text-foreground font-medium">
                      スケール
                    </td>
                    <td className="p-3 border-b border-border">
                      主に垂直 + リードレプリカで分散
                    </td>
                    <td className="p-3 border-b border-border">
                      水平に自動スケール、超大規模に強い
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border text-foreground font-medium">
                      整合性
                    </td>
                    <td className="p-3 border-b border-border">
                      トランザクションで強い整合性
                    </td>
                    <td className="p-3 border-b border-border">
                      結果整合性が基本（強整合も選べる）
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-foreground font-medium">
                      向く用途
                    </td>
                    <td className="p-3">会計・在庫・関連が複雑な業務データ</td>
                    <td className="p-3">セッション・カート・大量書き込み</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              実際のシステムでは「中心は RDS、頻繁に読む部分は ElastiCache、
              大量に書き込むイベントは DynamoDB」のように
              <strong>組み合わせて使う</strong>ことも多くあります。 1
              つに絞り込む必要はなく、データごとに適材適所で選べると考えておきましょう。
            </p>
          </section>

          {/* マネージドが肩代わりするもの */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              マネージド DB が運用で肩代わりするもの
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「マネージド」が具体的に何を楽にしてくれるのかを整理しておくと、
              自前でサーバに DB を立てる場合との違いが見えてきます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {managedTakeover.map((m) => (
                <div
                  key={m.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {m.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>

            <CodeBlock
              language="ts"
              title="RDS（PostgreSQL）への接続イメージ（概念例）"
              code={`import { Pool } from "pg";

// 接続情報は環境変数やシークレットマネージャから取得する（直書きしない）
const pool = new Pool({
  host: process.env.DB_HOST,        // RDS のエンドポイント
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: true },
});

const result = await pool.query(
  "SELECT id, name FROM users WHERE id = $1",
  [42],
);`}
            />

            <InfoBox type="warning" title="マネージドでも設計責任は残る">
              バックアップやパッチは AWS が肩代わりしますが、
              テーブル設計・インデックス・接続情報の管理・適切なインスタンスサイズの選定は
              利用者側の責任です。「マネージド = 何もしなくてよい」ではなく、
              「運用の重い部分を任せて、設計に集中できる」と捉えるのが正確です。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="RDS の「マルチ AZ」と「リードレプリカ」の役割の違いとして正しいのはどれ？"
              options={[
                {
                  label: "どちらも読み取り負荷を分散するための機能で違いはない",
                },
                {
                  label:
                    "マルチ AZ は可用性（障害時の自動フェイルオーバー）、リードレプリカは参照負荷の分散が主目的",
                  correct: true,
                },
                {
                  label:
                    "マルチ AZ はバックアップ、リードレプリカは暗号化のための機能",
                },
                {
                  label:
                    "マルチ AZ は NoSQL 専用、リードレプリカはリレーショナル専用",
                },
              ]}
              explanation="マルチ AZ は別のアベイラビリティゾーンに同期スタンバイを置き、障害時に自動で切り替えるための可用性機能です。通常は読み取りには使いません。一方リードレプリカは読み取り専用の複製を増やして参照クエリの負荷を分散するためのもので、目的が異なります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Amazon RDS ユーザーガイド",
                  url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html",
                  description:
                    "マルチ AZ・リードレプリカ・自動バックアップなど RDS の機能を解説した公式ガイド",
                },
                {
                  title: "Amazon Aurora ユーザーガイド",
                  url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html",
                  description:
                    "MySQL / PostgreSQL 互換の Aurora のアーキテクチャと特徴をまとめた公式ドキュメント",
                },
                {
                  title: "Amazon DynamoDB 開発者ガイド",
                  url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html",
                  description:
                    "パーティションキー設計・クエリ・スケールなど DynamoDB の基礎を学べる公式ガイド",
                },
                {
                  title: "Amazon ElastiCache ドキュメント",
                  url: "https://docs.aws.amazon.com/elasticache/",
                  description:
                    "Valkey / Memcached / Redis OSS をマネージドで使う ElastiCache の公式ドキュメント",
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
