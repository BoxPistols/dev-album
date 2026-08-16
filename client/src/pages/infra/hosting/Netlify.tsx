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

const featureCards = [
  {
    title: "Netlify Functions",
    examples: "リージョン実行",
    description:
      "リージョンで動くサーバレス関数。Node.js などのランタイムでバックエンド処理を書ける。長めの処理やデータベース接続に向く。",
  },
  {
    title: "Edge Functions",
    examples: "Deno ベース",
    description:
      "エッジで動く軽量関数。Deno ランタイムで Web 標準 API を使い、リクエストの書き換えや認証チェックを低レイテンシで処理する。",
  },
  {
    title: "Forms / Plugins",
    examples: "フォーム収集・ビルド拡張",
    description:
      "HTML フォームの送信を保存する Forms や、ビルド前後にフックを差し込む Build Plugins など、静的サイトに動的機能を足す仕組み。",
  },
];

export default function Netlify() {
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
            Netlify
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Netlify は静的サイトホスティングを軸に、サーバレス関数や
            エッジ関数、フォーム収集までをまとめて提供するプラットフォームです。
            Git 連携でビルドとデプロイを自動化し、設定は{" "}
            <code>netlify.toml</code> に集約できます。ここでは Functions・ Edge
            Functions・リダイレクト/ヘッダ・Deploy Previews・Forms・ Build
            Plugins を一通り見ていきます。
          </p>
        </div>

        <WhyNowBox
          tags={["Netlify", "静的ホスティング", "Functions", "Edge", "Deno"]}
        >
          <p>
            静的サイトは速くて安全ですが、フォーム送信や認証など
            「少しのサーバ処理」が必要になる場面が必ず出てきます。Netlify は
            静的配信を土台にしつつ、必要な部分だけ関数で補える構成を
            取っているため、フルスタックのサーバを立てずに動的機能を
            足せます。設定ファイルとリダイレクトの書き方を知っておくと、 SPA
            のルーティングや段階的な移行もスムーズに進められます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 静的ホスティング + Functions */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              静的ホスティング + Netlify Functions
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Netlify の基本は、ビルドした静的ファイルを CDN
              から配信することです。そこへ Netlify Functions
              を組み合わせると、サーバレス関数でバックエンド処理を足せます。
              Functions はリージョンを選べるサーバレス実行環境で、データベースアクセスや
              外部 API の中継など、少し重めの処理に向きます。関数は
              <code>netlify/functions/</code> に置くと自動でデプロイされ、URL
              が払い出されます。AWS Lambda
              のハンドラ形式で書く互換モードも残っていますが、公式ドキュメント（2026 年
              8 月時点）では非推奨で、2027 年 7 月 1
              日以降はこのモードを含むデプロイを受け付けないと案内されています。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featureCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {card.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {card.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Edge Functions */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Edge Functions（Deno ベース）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Edge Functions は Deno
              ランタイムで動く軽量な関数で、世界中のエッジロケーションで
              実行されます。リクエストやレスポンスを書き換えたり、
              地域に応じて出し分けたり、認証チェックを手前で済ませたりといった
              用途に向きます。Deno ベースなので <code>fetch</code> や{" "}
              <code>Request</code> / <code>Response</code> といった Web 標準 API
              をそのまま使える点が特徴です。
            </p>

            <CodeBlock
              language="ts"
              title="netlify/edge-functions/geo.ts"
              code={`import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  // 訪問者の国コードに応じてレスポンスを変える
  const country = context.geo?.country?.code ?? "US";
  return new Response(JSON.stringify({ country }), {
    headers: { "content-type": "application/json" },
  });
};`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              Functions が「特定リージョンでまとまった処理をする」のに対し、
              Edge Functions は「ユーザーの近くで素早く判断する」役割です。
              用途で使い分けるのが基本です。
            </p>
          </section>

          {/* netlify.toml */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              netlify.toml の設定例
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ビルドコマンド・公開ディレクトリ・関数の置き場所・リダイレクト・
              ヘッダなどは <code>netlify.toml</code>{" "}
              にまとめて宣言できます。リポジトリにコミットしておけば、
              設定がコードとして履歴に残り、環境間で再現できます。
            </p>

            <CodeBlock
              language="toml"
              title="netlify.toml"
              code={`[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

# SPA を index.html にフォールバック（クライアントルーティング）
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# 静的アセットに長期キャッシュを付与
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"`}
            />

            <MermaidDiagram
              title="図: ビルドパイプラインとリクエスト時のリダイレクト解決"
              chart={`flowchart TD
    G["git push"] --> BC["build.command を実行<br/>（npm run build）"]
    BC --> PUB["build.publish を CDN に配信<br/>（dist）"]
    PUB --> CDN["CDN エッジに公開"]
    CDN --> REQ["ユーザーのリクエスト"]
    REQ --> M{"redirects に<br/>マッチする？"}
    M -->|"status 301"| RD["別 URL へリダイレクト"]
    M -->|"status 200"| RW["URL を変えず /index.html を返す<br/>（SPA リライト）"]
    M -->|"マッチなし"| ST["静的ファイルを返す"]`}
            />

            <div className="mt-8">
              <CodingChallenge
                preview
                previewType="config"
                title="netlify.toml のビルドと SPA リダイレクトを埋めよう"
                description="ビルドコマンド・公開ディレクトリ・SPA フォールバックのリダイレクトを完成させてください。全パスを /index.html に status 200 で返します。"
                initialCode={`[build]
  command = "npm run build"
  publish = "___"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = ___`}
                answer={`[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`}
                hints={[
                  "publish はビルド成果物の出力先ディレクトリ。Vite なら dist",
                  "SPA フォールバックは URL を変えず中身を差し替えるリライト。status は 200",
                ]}
                keywords={["dist", "200"]}
              />
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="SPA でページをリロードすると 404 になる。netlify.toml でどう直す？"
              options={[
                {
                  label: "publish ディレクトリを変更する",
                },
                {
                  label:
                    "全パスを /index.html に status 200 でフォールバックするリダイレクトを追加する",
                  correct: true,
                },
                { label: "Edge Functions を有効にする" },
                { label: "Cache-Control ヘッダを外す" },
              ]}
              explanation="SPA はクライアント側でルーティングするため、サーバには /index.html しか存在しません。全パスを /index.html に status 200（リライト）でフォールバックさせることで、どの URL を直接開いてもアプリが立ち上がり、JS 側がルートを解決します。"
            />
          </section>

          {/* リダイレクト・ヘッダ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リダイレクト・ヘッダ（_redirects / _headers）
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>netlify.toml</code> に書く代わりに、公開ディレクトリ直下の{" "}
              <code>_redirects</code> と <code>_headers</code>{" "}
              というプレーンテキストファイルでも同じことを宣言できます。
              ビルドツールが特定のディレクトリを丸ごと出力する構成では、
              こちらの方が扱いやすいことがあります。
            </p>

            <CodeBlock
              language="bash"
              title="public/_redirects"
              code={`# 旧 URL から新 URL への恒久リダイレクト
/old-page   /new-page   301

# SPA フォールバック（リライト）
/*          /index.html 200`}
            />

            <p className="text-muted-foreground mt-6 mb-2 leading-relaxed">
              ステータスコードの違いに注意します。<code>301</code>{" "}
              は恒久リダイレクトでブラウザに URL の変更を伝え、
              <code>200</code> は URL
              を変えずに中身だけ差し替える「リライト」です。SPA
              フォールバックには <code>200</code> を使います。
            </p>

            <InfoBox type="warning" title="301 と 200 を取り違えない">
              SPA フォールバックを <code>301</code>{" "}
              にしてしまうと、ブラウザがアドレスバーを <code>/index.html</code>{" "}
              に書き換えてしまい、ルーティングが崩れます。「URL
              を変えずに中身を返す」場面は必ず <code>200</code>{" "}
              （リライト）を使うのが鉄則です。
            </InfoBox>
          </section>

          {/* Deploy Previews / Forms / Plugins */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Deploy Previews・Forms・ビルドプラグイン
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Deploy Previews</strong> は、プルリクエストごとに固有の
              URL を払い出してビルド結果を配信する機能です。マージ前に
              実物を触って確認でき、レビューに非エンジニアも参加できます。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Forms</strong> は、Netlify UI の Forms で{" "}
              <strong>form detection を有効にした上で</strong>、HTML フォームに{" "}
              <code>data-netlify="true"</code>（または{" "}
              <code>netlify</code>）属性を付けると送信内容を収集できる機能です。
              属性だけでは収集は始まらないので、
              先に UI 側の設定を済ませます。バックエンドを
              書かずに問い合わせフォームを設置でき、送信通知やスパム対策も
              用意されています。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>Build Plugins</strong>{" "}
              は、ビルドの前後に処理を差し込む拡張です。Lighthouse
              による品質計測やサイトマップ生成、キャッシュ最適化などを
              ビルドパイプラインに組み込めます。
            </p>

            <CodeBlock
              language="js"
              title="netlify/functions/hello.js"
              code={`// /.netlify/functions/hello でアクセスできる
export const handler = async (event) => {
  const name = event.queryStringParameters?.name ?? "world";
  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: \`Hello, \${name}\` }),
  };
};`}
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Netlify Functions と Edge Functions の使い分けとして適切なのは？"
              options={[
                {
                  label:
                    "Functions は Deno、Edge Functions は Lambda で動くので速度で選ぶ",
                },
                {
                  label:
                    "重めの処理やデータベース接続は Functions、ユーザーの近くで素早く判断する処理は Edge Functions",
                  correct: true,
                },
                {
                  label: "どちらも同じなので好きな方を選べばよい",
                },
                {
                  label: "Edge Functions は静的ファイルの配信専用",
                },
              ]}
              explanation="Functions は Lambda ベースのリージョン実行で、データベース接続や重めの処理に向きます。Edge Functions は Deno ベースでエッジ実行され、リクエスト書き換えや認証チェックなど低レイテンシで素早く判断したい処理に向きます。役割が異なるため用途で使い分けます。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Netlify ドキュメント",
                  url: "https://docs.netlify.com/",
                  description:
                    "ビルド・デプロイ・関数・フォームまでを網羅した公式ドキュメント",
                },
                {
                  title: "netlify.toml リファレンス",
                  url: "https://docs.netlify.com/configure-builds/file-based-configuration/",
                  description:
                    "build / redirects / headers など設定ファイルの全項目",
                },
                {
                  title: "Edge Functions（Deno）",
                  url: "https://docs.netlify.com/edge-functions/overview/",
                  description:
                    "Deno ベースのエッジ関数の仕組みとコンテキスト API",
                },
                {
                  title: "Redirects & Rewrites",
                  url: "https://docs.netlify.com/routing/redirects/",
                  description:
                    "_redirects / リライトの記法とステータスコードの挙動",
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
