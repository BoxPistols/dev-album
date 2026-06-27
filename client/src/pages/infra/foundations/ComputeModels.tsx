import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

export default function ComputeModels() {
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
            サーバー / サーバーレス / エッジ
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            コードをどこでどう動かすかには、大きく三つの実行モデルがあります。
            常駐するサーバー、リクエストのたびに起動するサーバーレス、
            ユーザーに近い場所で動くエッジです。
            それぞれの仕組み・課金・制約を比べながら、使い分けの基準を作ります。
          </p>
        </div>

        <WhyNowBox
          tags={["サーバーレス", "エッジ", "FaaS", "コールドスタート"]}
        >
          <p>
            「Vercel に置いた API ルートは、いったいどこで動いているのか」——
            この問いに答えられると、なぜ初回だけ遅いのか、なぜグローバル変数が次のリクエストで消えるのか、
            といった挙動が腑に落ちます。実行モデルを知ることは、
            性能・コスト・コードの書き方すべてに効いてきます。ここでは三つのモデルを並べて、
            それぞれが何を前提にしているかを試しながら学べます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 三つのモデル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              三つの実行モデル
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              実行モデルは「サーバーが常に起きているか」「どこで動くか」で性格が変わります。
              まずは三つの典型を押さえます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  常駐サーバー
                </h3>
                <p
                  className="text-xs text-primary font-medium mb-2"
                  style={{ fontSize: 13 }}
                >
                  VM / コンテナ
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  プロセスが常に立ち上がっていて、リクエストを待ち受ける。
                  メモリ上に状態を保てる一方、アイドル時も課金され、
                  負荷に応じた台数管理が必要。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  サーバーレス
                </h3>
                <p
                  className="text-xs text-primary font-medium mb-2"
                  style={{ fontSize: 13 }}
                >
                  FaaS / Lambda
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  リクエストが来たときだけ関数を起動し、終わると片付ける。
                  スケールは自動。アイドル時は課金されないが、
                  起動の遅延（コールドスタート）が起きうる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  エッジ
                </h3>
                <p
                  className="text-xs text-primary font-medium mb-2"
                  style={{ fontSize: 13 }}
                >
                  V8 isolate / Workers
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ユーザーに近い世界各地の拠点で、軽量な V8 isolate として動く。
                  起動が速くレイテンシが低い反面、使える API
                  や実行時間に制約がある。
                </p>
              </div>
            </div>
          </section>

          {/* 比較表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              モデルごとの比較
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              同じ「コードを動かす」でも、起動の速さ・状態の持ち方・課金の仕方が大きく違います。
              横に並べると、それぞれの得意・不得意が見えてきます。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-bold text-foreground">
                      観点
                    </th>
                    <th className="text-left py-3 pr-4 font-bold text-foreground">
                      常駐サーバー
                    </th>
                    <th className="text-left py-3 pr-4 font-bold text-foreground">
                      サーバーレス
                    </th>
                    <th className="text-left py-3 font-bold text-foreground">
                      エッジ
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">起動</td>
                    <td className="py-3 pr-4">常時起動済み</td>
                    <td className="py-3 pr-4">初回は遅延あり</td>
                    <td className="py-3">ほぼ即時</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">状態保持</td>
                    <td className="py-3 pr-4">メモリに保持可</td>
                    <td className="py-3 pr-4">原則持てない</td>
                    <td className="py-3">原則持てない</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">スケール</td>
                    <td className="py-3 pr-4">台数を自分で管理</td>
                    <td className="py-3 pr-4">自動</td>
                    <td className="py-3">自動・全世界</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">実行時間</td>
                    <td className="py-3 pr-4">制限なし</td>
                    <td className="py-3 pr-4">数十秒〜数分の上限</td>
                    <td className="py-3">短時間向け</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">課金</td>
                    <td className="py-3 pr-4">常時稼働分</td>
                    <td className="py-3 pr-4">実行時間 × メモリ</td>
                    <td className="py-3">リクエスト数</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">向く用途</td>
                    <td className="py-3 pr-4">常時接続・重い処理</td>
                    <td className="py-3 pr-4">変動する API 処理</td>
                    <td className="py-3">認証・リダイレクト・整形</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* コールドスタート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              コールドスタート — 仕様と実測のギャップ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              サーバーレスは「使った分だけ」を実現するため、しばらく呼ばれないと実行環境を片付けます。
              次のリクエストでは環境を作り直すため、初回だけ余分な時間がかかります。これが
              <strong>コールドスタート</strong>です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              仕様では「リクエストが来たら関数を実行する」とだけ書かれていますが、
              実測ではランタイムや依存パッケージの量によって初回の応答が数百ミリ秒から数秒ぶれることがあります。
              理由は、環境の確保・コードのロード・初期化が初回にだけ走るからです。
              二回目以降は温まった環境（ウォーム）が再利用され、速くなります。
              エッジの V8 isolate
              は起動が軽く、このギャップが小さいのが特徴です。
            </p>

            <CodeBlock
              language="ts"
              title="初期化はハンドラの外に置くと使い回せる"
              code={`// ハンドラの外 = ウォーム時に再利用される領域
const client = createDbClient(process.env.DATABASE_URL);

export async function handler(req: Request) {
  // ここはリクエストごとに走る
  const rows = await client.query("SELECT 1");
  return Response.json(rows);
}`}
            />

            <InfoBox type="info" title="「60fps 保証」と同じ構図">
              「リクエストが来たら即実行」は仕様上の理想で、実測は環境依存です。
              定数のように見える挙動が実環境でぶれるのは珍しくありません。
              ぶれる前提で、初期化を軽くする・接続を使い回す、といった設計で吸収します。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="サーバーレス関数で初回のリクエストだけ遅くなる現象を何と呼ぶ？"
              options={[
                { label: "メモリリーク" },
                { label: "コールドスタート", correct: true },
                { label: "タイムアウト" },
                { label: "スロットリング" },
              ]}
              explanation="しばらく呼ばれないと実行環境が片付けられ、次のリクエストで環境の確保・コードのロード・初期化がまとめて走るため、初回だけ遅くなります。これがコールドスタートです。二回目以降は温まった環境が再利用されます。"
            />
          </section>

          {/* 状態を持てない前提 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              状態を持てない前提で書く
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              サーバーレスとエッジは、リクエストごとに別のインスタンスで実行されることがあります。
              そのため、メモリ上の変数に値をためて「次のリクエストでも使えるはず」と考えると裏切られます。
              カウンタやセッションをグローバル変数に置くと、別インスタンスでは消えています。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              状態は、データベース・Redis・オブジェクトストレージなど
              <strong>外部の永続化先</strong>に預けるのが原則です。関数自体は
              「入力を受け取り、外部に読み書きし、結果を返す」だけのステートレスな部品として書きます。
            </p>

            <CodeBlock
              language="ts"
              title="グローバル変数に状態をためてはいけない例"
              code={`// アンチパターン: 別インスタンスでは 0 に戻る
let counter = 0;

export async function handler() {
  counter += 1; // この値は保証されない
  return Response.json({ counter });
}

// 正しくは外部ストアに保存する
// await redis.incr("counter");`}
            />

            <InfoBox type="warning" title="ウォーム時に「たまたま残る」のが罠">
              ウォームなインスタンスが再利用されると、グローバル変数の値がたまたま残ることがあります。
              開発中は動いて見えるのに、本番でインスタンスが増えた途端に壊れる——
              この「たまに動く」が一番厄介です。最初から状態を外部に置く設計にしておきます。
            </InfoBox>
          </section>

          {/* 使い分け */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              使い分けの基準
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              迷ったら、まず<strong>リクエストの性質</strong>から考えます。
              常時接続や長時間の重い処理（WebSocket、動画変換、機械学習推論）は常駐サーバーが向きます。
              変動するトラフィックの API 処理はサーバーレスが扱いやすく、
              認証チェック・リダイレクト・A/B
              振り分けのような「軽くて速さが効く処理」はエッジが得意です。
              一つに揃える必要はなく、入口はエッジ、本処理はサーバーレス、
              重い一部だけ常駐サーバー、といった組み合わせが現実的です。
            </p>

            <InfoBox type="success" title="まずはマネージドな選択肢から">
              フロントエンドから始めるなら、PaaS
              が提供するサーバーレス関数やエッジ関数が入口として扱いやすいです。
              台数管理やスケール設定を意識せずに動かせるので、まず動かして挙動を観察し、
              制約にぶつかったら常駐サーバーを検討する、という順序が無理のない進め方です。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="エッジ（V8 isolate）が特に得意とする処理はどれ？"
              options={[
                { label: "数分かかる動画のエンコード" },
                {
                  label:
                    "リクエストの認証チェックやリダイレクトなど軽量で低レイテンシが効く処理",
                  correct: true,
                },
                { label: "メモリ上に大量の状態を保持し続ける処理" },
                { label: "長時間の WebSocket 常時接続" },
              ]}
              explanation="エッジはユーザーに近い拠点で軽量に動き、起動が速く低レイテンシです。一方で実行時間や使える API に制約があり、状態は持てません。そのため、軽くて速さが効く処理（認証・リダイレクト・整形）に向き、重い処理や常時接続は別のモデルに任せます。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "AWS Lambda - サーバーレスの仕組み",
                  url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
                  description:
                    "代表的な FaaS の実行モデルと制約を解説した公式ドキュメント",
                },
                {
                  title: "Cloudflare Workers - How Workers works",
                  url: "https://developers.cloudflare.com/workers/reference/how-workers-works/",
                  description:
                    "エッジで使われる V8 isolate の仕組みを説明した公式リファレンス",
                },
                {
                  title: "Vercel - Functions の概要",
                  url: "https://vercel.com/docs/functions",
                  description:
                    "サーバーレス関数とエッジ関数の違いと使い分けを示す公式ドキュメント",
                },
                {
                  title: "MDN - HTTP の概要",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Overview",
                  description:
                    "実行モデルの土台となるリクエスト/レスポンスの基礎",
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
