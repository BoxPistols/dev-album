import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const computeKinds = [
  {
    title: "Serverless Functions",
    examples: "Node.js / Python / Go ランタイム",
    description:
      "リクエストごとに起動するサーバレス関数。データベース接続や重い処理に向く。リージョン単位で実行され、コールドスタートが発生することがある。",
  },
  {
    title: "Edge Functions",
    examples: "Edge ランタイム（V8 isolate）",
    description:
      "世界中のエッジロケーションで動く軽量な関数。Node.js の全 API は使えない代わりに起動が速く、リダイレクトや認証チェックなど低レイテンシ処理に向く。",
  },
  {
    title: "Static / ISR",
    examples: "静的ファイル + 再生成",
    description:
      "ビルド時に生成した HTML を CDN から配信する。ISR を使うと一定間隔やリクエスト契機でページを再生成し、静的の速さと動的の鮮度を両立できる。",
  },
];

export default function Vercel() {
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
            Vercel
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Vercel は Next.js
            の開発元が運営するホスティングプラットフォームです。 Git
            にプッシュするだけで本番とプレビューが配信され、フロントエンドと
            サーバレス関数を同じプロジェクトで扱えます。ここでは Git 連携・
            Serverless / Edge Functions・ISR・設定ファイルといった主要機能と、
            無料枠やタイムアウトといった実運用上の制約を一通り押さえます。
          </p>
        </div>

        <WhyNowBox
          tags={["Vercel", "Next.js", "Serverless", "Edge", "ISR", "CDN"]}
        >
          <p>
            フロントエンドをデプロイする時、かつてはサーバ構築や CI/CD
            の設定に時間を取られていました。Vercel は Git
            連携とゼロコンフィグのビルドを前提にすることで、その手間を
            プラットフォーム側に寄せています。仕組みを知っておくと、
            「なぜプレビュー URL が自動で出るのか」「なぜ関数に
            タイムアウトがあるのか」を理解した上で設計判断ができます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* Next.js 最適化 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Next.js に最適化されたプラットフォーム
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Vercel と Next.js は同じ会社が開発しており、フレームワークの機能と
              プラットフォームの機能が密に対応しています。Next.js の App
              Router・Server Components・ISR・Image 最適化などは、Vercel
              上で追加設定なしに動くよう設計されています。 一方で Vite + React
              や Astro、SvelteKit
              などのフレームワークも公式にサポートされており、Next.js
              専用というわけではありません。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {computeKinds.map((kind) => (
                <div
                  key={kind.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {kind.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {kind.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {kind.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Git 連携と Preview Deployments */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Git 連携と Preview Deployments
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              GitHub・GitLab・Bitbucket
              のリポジトリを接続すると、プッシュやプルリクエストのたびに
              自動でビルドとデプロイが走ります。本番ブランチへのマージは
              Production Deployment、それ以外のブランチや PR は固有の URL を持つ
              Preview Deployment になります。プレビュー URL を PR
              に貼っておけば、レビュアーが実物を触りながら確認できます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">git push</p>
                  <p className="text-muted-foreground">
                    ブランチへのプッシュを Vercel が検知
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">Build</p>
                  <p className="text-muted-foreground">
                    フレームワークを自動検出してビルド
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">Preview URL</p>
                  <p className="text-muted-foreground">
                    PR ごとに固有の URL を払い出す
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="プレビューは「動く成果物」になる">
              静的なスクリーンショットではなく、本番と同じビルドが動く URL
              が出る点が要です。フォーム送信や API
              呼び出しまで含めてレビューでき、デザイナーや非エンジニアも
              ブラウザを開くだけで確認に参加できます。
            </InfoBox>
          </section>

          {/* Serverless と Edge */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Serverless Functions と Edge Functions
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Vercel ではサーバ側の処理を「関数」として書きます。 Serverless
              Functions は特定リージョンで動く Node.js
              等のランタイムで、データベース接続や 重めの処理に向きます。Edge
              Functions は V8 isolate
              ベースの軽量ランタイムで、世界中のエッジで動くため低レイテンシですが、
              Node.js の全 API は使えません。下は Next.js の API Route を Edge
              ランタイムで動かす例です。
            </p>

            <CodeBlock
              language="ts"
              title="app/api/hello/route.ts（Edge ランタイム）"
              code={`// このルートをエッジで実行する宣言
export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") ?? "world";

  return Response.json(
    { message: \`Hello, \${name}\` },
    { headers: { "Cache-Control": "public, max-age=60" } },
  );
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>runtime = "edge"</code> を外せば、同じコードが Serverless
              Functions（Node.js
              ランタイム）として動きます。データベースクライアントなど Node.js
              依存のライブラリを使う場合は Serverless を選ぶのが基本です。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Edge Functions が Serverless Functions より向いているのはどれ？"
              options={[
                {
                  label: "Node.js 専用ライブラリを使った重いデータ集計処理",
                },
                {
                  label:
                    "ユーザーの近くで素早く返したい認証チェックやリダイレクト",
                  correct: true,
                },
                { label: "長時間かかるバッチ処理" },
                { label: "大きなファイルのアップロード保存" },
              ]}
              explanation="Edge Functions は世界中のエッジで動くため低レイテンシで、認証チェックやリダイレクトなど軽量で素早さが重要な処理に向きます。一方 Node.js の全 API は使えず実行時間も短いため、重い処理や Node 依存ライブラリは Serverless Functions が適します。"
            />
          </section>

          {/* ISR・キャッシュ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ISR とキャッシュ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ISR（Incremental Static Regeneration）は、静的生成した
              ページを「一定間隔で・またはリクエストを契機に」裏側で
              再生成する仕組みです。完全な静的の速さを保ちつつ、ビルドし直さずに
              内容を更新できます。配信は CDN
              のエッジキャッシュ経由なので、再生成が完了するまでは
              古いページがそのまま返ります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レスポンスのキャッシュは <code>Cache-Control</code>{" "}
              ヘッダで制御します。意図せず動的なはずのページが
              キャッシュされたり、逆に静的なはずのページが毎回再計算されたりする
              事故を避けるため、何をどれだけキャッシュするかを明示するのが
              安全です。
            </p>

            <InfoBox type="warning" title="「最新が出ない」はキャッシュを疑う">
              ISR や CDN
              キャッシュを使うと、デプロイ直後でも一定時間は古い内容が
              配信されることがあります。「仕様では再生成される、実測では
              次のリクエストまで古い HTML
              が返る」——この時間差を前提に、即時反映が必要な箇所は
              動的レンダリングを選ぶか再検証（revalidate）を明示します。
            </InfoBox>
          </section>

          {/* 環境変数とドメイン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              環境変数・プロジェクト設定・独自ドメイン
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              環境変数はダッシュボードまたは <code>vercel</code> CLI
              から登録し、Production / Preview / Development
              の環境ごとに値を分けられます。クライアントに露出してよい値だけを
              フレームワークの規約（Next.js なら <code>NEXT_PUBLIC_</code>{" "}
              接頭辞）で公開し、API キーなどの秘密値はサーバ側に閉じます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              独自ドメインはプロジェクトに追加して DNS レコードを設定すると、
              TLS 証明書が自動で発行・更新されます。Production
              デプロイにドメインを割り当てておけば、デプロイのたびに
              ドメインを貼り替える必要はありません。
            </p>

            <CodeBlock
              language="json"
              title="vercel.json（ビルドとヘッダの設定例）"
              code={`{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "redirects": [
    { "source": "/old", "destination": "/new", "permanent": true }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}`}
            />
          </section>

          {/* 料金感と制約 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              料金感と制約（仕様 vs 実測）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              無料の Hobby プランは個人開発や検証に十分な範囲を提供しますが、
              帯域・ビルド時間・関数の実行時間に上限があります。とくに
              サーバレス関数には実行時間（タイムアウト）の上限があり、
              プランや設定で延ばせるものの無制限ではありません。
              長時間処理はキューやバックグラウンドジョブに逃がす設計が前提です。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="text-left p-3 border-b border-border">
                      観点
                    </th>
                    <th className="text-left p-3 border-b border-border">
                      仕様・建前
                    </th>
                    <th className="text-left p-3 border-b border-border">
                      実測で意識すること
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">
                      関数タイムアウト
                    </td>
                    <td className="p-3">プランで上限が決まる</td>
                    <td className="p-3">
                      重い処理は途中で打ち切られる。分割や非同期化が必要
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">
                      コールドスタート
                    </td>
                    <td className="p-3">自動スケール</td>
                    <td className="p-3">
                      初回や久々の呼び出しは起動分だけ遅くなる
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">
                      帯域・ビルド時間
                    </td>
                    <td className="p-3">無料枠あり</td>
                    <td className="p-3">
                      上限超過は従量課金または制限。規模が増えたら見直す
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      ステート保持
                    </td>
                    <td className="p-3">関数はステートレス</td>
                    <td className="p-3">
                      メモリやローカルファイルは次の呼び出しに残らない前提で書く
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              価格や上限値はプラン改定で変動するため、本番の見積もりは
              必ず公式の料金ページで最新値を確認してください。重要なのは
              「サーバレスは無限に長く動く前提では設計しない」という
              考え方です。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="サーバレス関数で長時間のバッチ処理を書こうとした時、最初に検討すべきことは？"
              options={[
                { label: "関数のメモリを最大まで上げる" },
                {
                  label:
                    "タイムアウト上限があるため、処理をキューやバックグラウンドジョブに分離する",
                  correct: true,
                },
                { label: "Edge Functions に移す" },
                { label: "キャッシュを無効化する" },
              ]}
              explanation="サーバレス関数には実行時間の上限（タイムアウト）があり、長時間処理は途中で打ち切られます。延長設定にも限界があるため、重い処理はキューやバックグラウンドジョブに切り出し、関数自体は短時間で完了させる設計にします。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vercel ドキュメント",
                  url: "https://vercel.com/docs",
                  description:
                    "デプロイ・関数・設定・ドメインまでを網羅した公式ドキュメント",
                },
                {
                  title: "Functions（Serverless / Edge）",
                  url: "https://vercel.com/docs/functions",
                  description:
                    "関数のランタイム・制限・タイムアウトの公式リファレンス",
                },
                {
                  title: "vercel.json リファレンス",
                  url: "https://vercel.com/docs/projects/project-configuration",
                  description:
                    "ビルド・リダイレクト・ヘッダなど vercel.json の設定項目",
                },
                {
                  title: "Incremental Static Regeneration",
                  url: "https://vercel.com/docs/incremental-static-regeneration",
                  description:
                    "ISR の仕組みと再検証（revalidate）の挙動を解説する公式ページ",
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
