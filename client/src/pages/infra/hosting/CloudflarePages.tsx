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

const bindings = [
  {
    title: "KV",
    examples: "Key-Value ストア",
    description:
      "結果整合性のキーバリュー。読み取りが多く更新頻度が低い設定値やセッションのキャッシュなどに向く。",
  },
  {
    title: "D1",
    examples: "SQLite ベースの DB",
    description:
      "エッジで動く SQL データベース。SQLite 互換で、リレーショナルなデータをエッジ近くに置ける。",
  },
  {
    title: "R2",
    examples: "オブジェクトストレージ",
    description:
      "S3 互換のオブジェクトストレージ。画像やファイルの保存に使い、外向き転送（egress）料金がかからないのが特徴。",
  },
  {
    title: "Durable Objects",
    examples: "状態を持つアクター",
    description:
      "一貫した状態を保つ単一インスタンス。リアルタイム共同編集やカウンタなど、強い整合性が要る処理に向く。",
  },
];

export default function CloudflarePages() {
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
            Cloudflare Pages / Workers
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Cloudflare
            はグローバルなエッジネットワークの上で、静的ホスティングの Pages
            とサーバレスの Workers を提供します。フロントエンドの配信と
            エッジでの動的処理を、世界中に分散したロケーションで実行できます。
            ここでは Pages と Workers の関係、wrangler CLI、KV / D1 / R2 /
            Durable Objects といった bindings、そして広い無料枠と互換フラグを
            一通り押さえます。
          </p>
        </div>

        <WhyNowBox
          tags={["Cloudflare", "Pages", "Workers", "Edge", "KV", "D1", "R2"]}
        >
          <p>
            これまでアプリは「どこか一つのリージョン」で動くのが普通でした。
            Cloudflare はコードもデータもエッジに寄せることで、ユーザーの近くで
            処理を完結させる方向に振っています。bindings
            の考え方を理解すると、データベースやストレージを「外部 API
            として叩く」のではなく「実行環境に結び付けて使う」という
            エッジ前提の設計が見えてきます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* Pages と Workers の関係 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Pages（静的 + Functions）と Workers の関係
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Cloudflare Pages は Git
              連携で静的サイトをビルド・配信するサービスで、
              <code>functions/</code> ディレクトリに置いた関数（Pages
              Functions）でサーバ処理も 足せます。Workers
              は、より汎用的な「エッジで動くサーバレス関数」そのものです。 Pages
              Functions は内部的に Workers
              の仕組みの上に乗っており、近年は両者が 統合される方向にあります。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">Pages</p>
                  <p className="text-muted-foreground">
                    静的サイトの配信が主役。Git 連携・プレビュー・Functions
                    を備える
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">Workers</p>
                  <p className="text-muted-foreground">
                    エッジで動く汎用サーバレス関数。bindings で ストレージや DB
                    を結び付ける
                  </p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              ざっくり言えば「サイトを置きたいなら Pages、エッジで動く API
              やロジックを書きたいなら Workers」が出発点で、両者を
              組み合わせて一つのアプリにできます。
            </p>
          </section>

          {/* wrangler CLI */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              wrangler CLI
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>wrangler</code> は Cloudflare の公式 CLI で、Workers や
              Pages の開発・デプロイ・bindings
              管理を担います。ローカルでの実行、 設定ファイル{" "}
              <code>wrangler.toml</code> の管理、KV や D1
              の作成までをコマンドで行えます。下は Worker の最小構成です。
            </p>

            <CodeBlock
              language="ts"
              title="src/index.ts（Worker の fetch ハンドラ）"
              code={`export interface Env {
  // wrangler.toml で宣言した binding が型として渡る
  MY_KV: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const name = url.searchParams.get("name") ?? "world";

    // KV から訪問回数を読み書きする例
    const key = "visits";
    const current = Number((await env.MY_KV.get(key)) ?? "0");
    await env.MY_KV.put(key, String(current + 1));

    return Response.json({ message: \`Hello, \${name}\`, visits: current + 1 });
  },
};`}
            />

            <CodeBlock
              language="bash"
              title="主要コマンド"
              code={`# ローカルで開発サーバを起動
npx wrangler dev

# 本番にデプロイ
npx wrangler deploy

# KV ネームスペースを作成
npx wrangler kv namespace create MY_KV`}
            />
          </section>

          {/* bindings */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              bindings（KV・D1・R2・Durable Objects）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              bindings は、Worker
              にストレージやデータベースなどのリソースを「結び付ける」仕組みです。
              外部 API として URL を叩くのではなく、設定で宣言したリソースが
              実行時に環境オブジェクト（<code>env</code>）の
              プロパティとして渡されます。これにより接続情報をコードに
              ハードコードせず、型付きで安全に扱えます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bindings.map((b) => (
                <div
                  key={b.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {b.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {b.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>

            <MermaidDiagram
              title="図: リクエストから Worker、bindings 経由のリソース利用"
              chart={`flowchart LR
    U["ユーザーのリクエスト"] --> W["Worker（エッジで実行）"]
    W --> E["env オブジェクト"]
    E --> KV["KV<br/>（設定値・キャッシュ）"]
    E --> D1["D1<br/>（SQL データ）"]
    E --> R2["R2<br/>（ファイル・画像）"]
    KV --> RES["レスポンスを生成"]
    D1 --> RES
    R2 --> RES
    RES --> U`}
            />

            <div className="mt-8">
              <CodingChallenge
                preview
                previewType="terminal"
                title="KV ネームスペースを作成する wrangler コマンドを書こう"
                description="MY_KV という名前の KV ネームスペースを作成する wrangler コマンドを完成させてください。"
                initialCode={`npx wrangler kv namespace ___ MY_KV`}
                answer={`npx wrangler kv namespace create MY_KV`}
                hints={[
                  "新しいネームスペースを作るサブコマンドは create",
                ]}
                keywords={["create"]}
              />
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Cloudflare の bindings の説明として正しいのは？"
              options={[
                {
                  label:
                    "外部 API の URL を Worker のコードに直接書き込む仕組み",
                },
                {
                  label:
                    "設定で宣言したリソースが実行時に env オブジェクト経由で型付きで渡される仕組み",
                  correct: true,
                },
                {
                  label: "静的ファイルを CDN にアップロードする機能",
                },
                {
                  label: "ビルドの前後にフックを差し込む拡張",
                },
              ]}
              explanation="bindings は KV / D1 / R2 / Durable Objects などのリソースを Worker に結び付ける仕組みです。wrangler.toml で宣言すると、実行時に env オブジェクトのプロパティとしてリソースが渡されます。接続情報をハードコードせず、型付きで安全に扱える点が利点です。"
            />
          </section>

          {/* エッジ実行とグローバル分散 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              エッジ実行とグローバル分散
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Workers は世界中のエッジロケーションで動くため、ユーザーに
              物理的に近い場所でコードが実行されます。これにより
              往復のレイテンシを抑えられます。一方で、コードはどのロケーションでも
              動く前提になるため、特定のリージョンに固定したデータベースへ
              毎回アクセスすると、せっかくの近さが活きない場合があります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              そこで D1 のようなエッジ寄りのデータベースや、KV
              のような分散ストアと組み合わせて、データもユーザーの近くに
              置く設計が重要になります。
            </p>

            <InfoBox type="info" title="「近い」を活かすにはデータも寄せる">
              コードをエッジに置いても、データだけ遠いリージョンにあると
              実測レイテンシは縮みません。仕様上はグローバル分散でも、
              ボトルネックはデータの取得元になりがちです。bindings で
              エッジ側のストレージを使うことが、低レイテンシを実現する鍵です。
            </InfoBox>
          </section>

          {/* 無料枠と nodejs_compat */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              無料枠の上限と nodejs_compat 互換フラグ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              無料プランには上限があります。公式のドキュメントでは Workers Free
              のリクエスト数が 1 日あたり 100,000、Pages Free のビルド回数が 1
              か月あたり 500 と示されています（
              <a
                href="https://developers.cloudflare.com/workers/platform/limits/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Workers の制限
              </a>
              ／
              <a
                href="https://developers.cloudflare.com/pages/platform/limits/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Pages の制限
              </a>
              ）。数値は変わることがあるため、実際に使う前に公式ページで確認してください。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Workers のランタイムは Node.js そのものではなく、Web 標準 API
              を基本とした独自ランタイムです。 そのため Node.js
              固有のモジュール（<code>node:buffer</code> など）に依存する
              ライブラリは、互換フラグ <code>nodejs_compat</code>{" "}
              を有効にすると一部が動くようになります。
            </p>

            <CodeBlock
              language="toml"
              title="wrangler.toml"
              code={`name = "my-worker"
main = "src/index.ts"
compatibility_date = "2026-06-01"

# Node.js 互換 API を有効化
compatibility_flags = ["nodejs_compat"]

# KV を binding として結び付ける
[[kv_namespaces]]
binding = "MY_KV"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# D1 データベースを binding として結び付ける
[[d1_databases]]
binding = "DB"
database_name = "app-db"
database_id = "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy"`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>nodejs_compat</code> はあくまで一部 API
              の互換であり、Node.js の全機能が動くわけではありません。「仕様では
              Web 標準 ランタイム、実測では一部 Node API も使える」と捉え、依存
              ライブラリがエッジ環境で動くかは事前に確認するのが安全です。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Workers のランタイムについて正しいのは？"
              options={[
                {
                  label: "Node.js そのものなので全モジュールがそのまま動く",
                },
                {
                  label:
                    "Web 標準 API を基本とする独自ランタイムで、nodejs_compat で一部の Node API を補える",
                  correct: true,
                },
                {
                  label: "ブラウザの DOM がそのまま使える",
                },
                {
                  label: "Deno のランタイムをそのまま採用している",
                },
              ]}
              explanation="Workers は Web 標準 API を基本とする独自のエッジランタイムで、Node.js そのものではありません。Node 固有モジュールに依存するライブラリは compatibility_flags に nodejs_compat を加えると一部が動きますが、全機能の互換ではないため事前検証が必要です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Cloudflare Workers ドキュメント",
                  url: "https://developers.cloudflare.com/workers/",
                  description:
                    "Workers のランタイム・bindings・デプロイの公式ドキュメント",
                },
                {
                  title: "Cloudflare Pages ドキュメント",
                  url: "https://developers.cloudflare.com/pages/",
                  description:
                    "静的ホスティングと Pages Functions の公式ガイド",
                },
                {
                  title: "Wrangler CLI リファレンス",
                  url: "https://developers.cloudflare.com/workers/wrangler/",
                  description:
                    "wrangler のコマンドと wrangler.toml 設定の公式リファレンス",
                },
                {
                  title: "Bindings（KV / D1 / R2 / Durable Objects）",
                  url: "https://developers.cloudflare.com/workers/runtime-apis/bindings/",
                  description:
                    "各種ストレージ・データベースを Worker に結び付ける方法",
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
