import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const kvServices = [
  {
    title: "Redis",
    sub: "インメモリ KV",
    description:
      "メモリ上で動く高速な KV ストア。キャッシュ・セッション・レート制限カウンタなど、短命で取得頻度の高いデータに向く。",
  },
  {
    title: "Cloudflare KV",
    sub: "エッジ KV",
    description:
      "エッジに分散配置される KV。読み取りに最適化され、設定値や軽量データを世界中の近い拠点から返せる。",
  },
  {
    title: "Upstash",
    sub: "サーバーレス Redis",
    description:
      "HTTP/REST でアクセスできるサーバーレス Redis。エッジ関数からも使いやすく、従量課金で小さく始められる。",
  },
];

export default function BeyondRelational() {
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
            KV・ベクトル・オブジェクトストレージ
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            リレーショナル DB
            がすべてのデータに最適とは限りません。キャッシュには KV
            ストア、類似検索にはベクトル DB、画像やファイルには
            オブジェクトストレージ、というように、データの性質に合わせた保管先があります。
            ここでは KV・ベクトル・オブジェクトストレージの役割と、
            用途別の使い分けを一通り整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["KV", "Redis", "ベクトルDB", "pgvector", "RAG", "S3", "R2"]}
        >
          <p>
            セッションを毎回 RDB に問い合わせると遅くなり、画像を DB
            に詰め込むとコストが膨らみます。 AI
            機能で「意味の近い文書」を探すには、行と列の検索では届きません。
            こうした場面で、KV ストア・ベクトル
            DB・オブジェクトストレージが力を発揮します。
            「何を・どこに置くか」を選べると、システム全体が素直な形になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* KV ストア */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              KV ストアとユースケース（キャッシュ・セッション）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              KV（Key-Value）ストアは「キーを渡すと値が返る」というシンプルな構造のデータベースです。
              JOIN
              や複雑な検索はできない代わりに、取得が非常に速いのが特長です。
              キャッシュ・セッション・レート制限のカウンタなど、
              「キー1つで引ける短命なデータ」に向いています。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {kvServices.map((s) => (
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

            <CodeBlock
              language="ts"
              title="KV をキャッシュとして使う（Upstash Redis の例）"
              code={`import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

async function getUserCached(id: number) {
  const key = \`user:\${id}\`;

  // まずキャッシュを見る
  const cached = await redis.get(key);
  if (cached) return cached;

  // なければ DB から取り、TTL 付きで保存
  const user = await fetchUserFromDb(id);
  await redis.set(key, user, { ex: 60 }); // 60秒で失効
  return user;
}`}
            />

            <InfoBox type="info" title="KV は「正」ではなく「写し」に使う">
              キャッシュやセッションのデータは、失効や消失を前提に設計します。
              KV が消えても元データ（RDB
              やオブジェクトストレージ）から復元できる構成にしておくと、
              障害時にもシステムが壊れません。KV は信頼できる原本ではなく、
              速さのための「写し」と捉えるのが安全です。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="KV ストアがキャッシュやセッションに向いている主な理由はどれ？"
              options={[
                { label: "複雑な JOIN を高速に実行できるから" },
                {
                  label:
                    "キー1つで値を引く構造のため取得が速く、短命なデータに適しているから",
                  correct: true,
                },
                { label: "トランザクションの ACID を最も厳密に守れるから" },
                { label: "画像やファイルを最も安く保存できるから" },
              ]}
              explanation="KV ストアはキーから値を直接引く単純な構造で、取得が高速です。JOIN や複雑検索には向きませんが、キャッシュ・セッション・カウンタのように「キー1つで引ける短命なデータ」に最適です。画像保存はオブジェクトストレージの役割です。"
            />
          </section>

          {/* ベクトル DB と RAG */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ベクトル DB と RAG（pgvector / Pinecone）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ベクトル DB
              は、テキストや画像を数値の並び（埋め込みベクトル）に変換して保存し、
              「意味の近さ」で検索できるデータベースです。
              キーワードの一致ではなく、ベクトル間の距離で「似ているもの」を引けるため、
              AI の検索や推薦に使われます。代表例が、PostgreSQL の拡張
              <strong>pgvector</strong>と、専用サービスの
              <strong>Pinecone</strong>です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              この仕組みの代表的な使い道が
              <strong>RAG（Retrieval-Augmented Generation）</strong>
              です。質問に関連する文書をベクトル検索で集め、 それを LLM
              のコンテキストに渡して回答させます。社内文書を踏まえた回答などを、
              モデルを再学習せずに実現できます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">1. 埋め込み</p>
                  <p className="text-muted-foreground">
                    文書をベクトル化して保存する
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">2. 検索</p>
                  <p className="text-muted-foreground">
                    質問に近いベクトルを取り出す
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">3. 生成</p>
                  <p className="text-muted-foreground">
                    取り出した文書を添えて LLM に回答させる
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="success" title="まず pgvector から始める選択肢">
              既に PostgreSQL を使っているなら、pgvector
              拡張を入れるだけでベクトル検索を始められます。専用のベクトル DB
              を増やす前に、まず手元の DB
              で試し、規模や検索性能が足りなくなってから Pinecone
              のような専用サービスを検討する、という順序が無駄を生みにくいです。
            </InfoBox>
          </section>

          {/* オブジェクトストレージ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              オブジェクトストレージ（S3 / Cloudflare R2）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              画像・動画・PDF のような大きなファイルは、RDB
              に直接入れるとコストも性能も悪化します。 こうしたファイルは
              <strong>オブジェクトストレージ</strong>に置くのが定石です。 Amazon{" "}
              <strong>S3</strong> や Cloudflare <strong>R2</strong>{" "}
              が代表で、各ファイルに URL（キー）が割り当てられ、 アプリは DB
              にその URL だけを保存します。R2
              は外向きの転送料が無料という料金設計で知られています。
            </p>

            <CodeBlock
              language="ts"
              title="オブジェクトストレージへアップロードし、URL を DB に保存"
              code={`import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// R2 は S3 互換 API なので同じ SDK で扱える
const s3 = new S3Client({ region: "auto", endpoint: R2_ENDPOINT });

async function uploadAvatar(userId: number, file: Uint8Array) {
  const key = \`avatars/\${userId}.png\`;

  await s3.send(
    new PutObjectCommand({ Bucket: "media", Key: key, Body: file }),
  );

  // DB にはファイル本体ではなく URL（キー）だけを保存する
  await db.update(users).set({ avatarUrl: key }).where(eq(users.id, userId));
}`}
            />

            <InfoBox type="warning" title="ファイル本体を RDB に入れない">
              画像のバイト列を RDB
              のカラムに詰めると、バックアップやクエリが重くなり、ストレージ単価も高くつきます。
              ファイルはオブジェクトストレージに置き、DB には参照（URL
              やキー）とメタデータだけを持たせる——この分担が、
              性能とコストの両面で扱いやすくなります。
            </InfoBox>
          </section>

          {/* 用途別の使い分け */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              用途別の使い分け
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここまでの保管先を「何を置くか」で並べると、選び方が見えてきます。
              1つに寄せるのではなく、データの性質ごとに適した場所へ振り分けるのが、
              現代的なアプリ構成の基本です。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-foreground font-bold">
                      データ
                    </th>
                    <th className="text-left p-3 text-foreground font-bold">
                      向いている保管先
                    </th>
                    <th className="text-left p-3 text-foreground font-bold">
                      理由
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">
                      関連のある構造化データ
                    </td>
                    <td className="p-3">リレーショナル DB</td>
                    <td className="p-3">
                      整合性・JOIN・トランザクションが要る
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">
                      キャッシュ・セッション
                    </td>
                    <td className="p-3">KV ストア（Redis 等）</td>
                    <td className="p-3">キー1つで高速に引ける／短命でよい</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">
                      意味の近い文書検索
                    </td>
                    <td className="p-3">ベクトル DB（pgvector 等）</td>
                    <td className="p-3">距離で「似ているもの」を引ける</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">
                      画像・動画・ファイル
                    </td>
                    <td className="p-3">オブジェクトストレージ（S3 / R2）</td>
                    <td className="p-3">大きいファイルを安く・URL で扱える</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="使い分けは組み合わせて使う">
              実際のアプリは、これらを併用します。ユーザー情報は RDB、
              セッションは KV、アバター画像はオブジェクトストレージ、
              ドキュメント検索はベクトル DB
              ——というように、1つのサービスが複数の保管先を持つのが普通です。
              「全部 RDB」でも「全部
              NoSQL」でもなく、データごとの適材適所を選びます。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="ベクトル DB が可能にする検索はどれ？"
              options={[
                { label: "主キーによる完全一致の検索" },
                {
                  label: "埋め込みベクトルの距離による「意味の近いもの」の検索",
                  correct: true,
                },
                { label: "ファイルサイズ順の並べ替え" },
                { label: "トランザクションのロールバック" },
              ]}
              explanation="ベクトル DB はテキストや画像を埋め込みベクトルに変換して保存し、ベクトル間の距離で「意味が近いもの」を検索します。キーワードの完全一致ではなく類似度で引けるため、RAG のように関連文書を集めて LLM に渡す用途に使われます。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Redis Documentation",
                  url: "https://redis.io/docs/latest/",
                  description: "KV ストアの基本操作・TTL・データ構造の一次情報",
                },
                {
                  title: "Upstash Documentation",
                  url: "https://upstash.com/docs",
                  description:
                    "HTTP/REST でアクセスするサーバーレス Redis のガイド",
                },
                {
                  title: "pgvector（GitHub）",
                  url: "https://github.com/pgvector/pgvector",
                  description:
                    "PostgreSQL でベクトル検索を行う拡張。距離演算子の一覧",
                },
                {
                  title: "Cloudflare R2 Documentation",
                  url: "https://developers.cloudflare.com/r2/",
                  description:
                    "S3 互換のオブジェクトストレージ。料金とアップロード方法",
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
