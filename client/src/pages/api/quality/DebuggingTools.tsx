import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

// curl の主要オプション早見表（CLI デバッグの最小語彙）
const curlFlags = [
  {
    flag: "-i",
    role: "レスポンスヘッダーを本文と一緒に表示する。ステータス行とヘッダーを確認したいときの基本。",
  },
  {
    flag: "-X <method>",
    role: "HTTP メソッドを指定する（-X POST 等）。-d を付けると省略時は自動で POST になる。",
  },
  {
    flag: "-H <header>",
    role: "リクエストヘッダーを追加する（-H 'Content-Type: application/json' 等）。複数指定可。",
  },
  {
    flag: "-d <body>",
    role: "リクエストボディを送る。JSON を送るなら -H で Content-Type も明示する。",
  },
  {
    flag: "-v",
    role: "詳細表示。送受信したヘッダー・TLS ハンドシェイク・接続先 IP まで出る。切り分けの主役。",
  },
  {
    flag: "--compressed",
    role: "gzip 等の圧縮を要求し、受信時に自動展開する。実運用に近い転送量で確認できる。",
  },
];

// 検証ツールの位置づけ整理（いつ使うか）
const toolMap = [
  {
    purpose: "モック",
    tool: "Prism",
    when: "OpenAPI 定義から仮サーバを立て、実装前にフロントが叩けるようにする。",
  },
  {
    purpose: "Lint",
    tool: "Spectral",
    when: "OpenAPI / AsyncAPI 定義の書き方を静的検査し、命名や構造の崩れを早期に検出する。",
  },
  {
    purpose: "スキーマ準拠テスト",
    tool: "schemathesis / Dredd",
    when: "実装が OpenAPI 定義どおり応答するかを自動生成テストで突く。",
  },
  {
    purpose: "契約テスト",
    tool: "Pact",
    when: "消費側と提供側の期待を契約として固定し、片方の変更が相手を壊さないか検証する。",
  },
  {
    purpose: "可観測性",
    tool: "ログ / トレース",
    when: "本番で再現困難な障害を、構造化ログと分散トレースで事後に追う。",
  },
];

export default function DebuggingTools() {
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
            API のデバッグと GUI / CLI ツール
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            API が「動かない」とき、闇雲にコードを書き換えても直りません。まず
            障害が「どの層」で起きているかを切り分け、再現可能な最小リクエストを
            作るのが先です。ここでは切り分けの方法論を軸に、ブラウザ DevTools・
            Postman 系 GUI・curl / HTTPie / jq といった CLI を、診断手順とともに
            ひととおり試せるように整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["デバッグ", "DevTools", "curl", "HTTPie", "CORS", "切り分け"]}
        >
          <p>
            API のトラブルは、原因が
            <strong>クライアント・ネットワーク・サーバのどこにあるか</strong>
            を見極めないと、直す場所を間違えます。
            ブラウザだけで失敗を見ていると 「CORS
            なのにサーバのバグだと思い込む」「認証エラーを認可エラーと混同する」
            といった誤診が起きます。 GUI と CLI を併用し、
            <strong>同じリクエストを別経路から再現する</strong>
            ことで、原因の層を確実に分離できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 切り分けの方法論 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              まず「どの層か」を切り分ける
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              デバッグの第一歩は、原因を 3 つの層に分解することです。
              <strong>クライアント</strong>（ブラウザ・アプリのコード）、
              <strong>ネットワーク</strong>（CORS・プロキシ・DNS・TLS）、
              <strong>サーバ</strong>（API 本体・依存先）。
              この切り分けを飛ばすと、サーバのバグだと思って延々とサーバを直し続けて、
              実はブラウザ側の CORS だった、という遠回りに陥ります。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">クライアント</p>
                  <p className="text-muted-foreground">
                    URL の組み立て、ヘッダー、ボディのシリアライズ、状態管理。
                    DevTools の Network で「実際に送った内容」を見る。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">ネットワーク</p>
                  <p className="text-muted-foreground">
                    CORS・preflight・プロキシ・TLS。ブラウザだけで失敗し
                    <code>curl</code> では通るなら、まずここを疑う。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">サーバ</p>
                  <p className="text-muted-foreground">
                    <code>curl</code> でも再現するなら原因はサーバ側。
                    ステータス・レスポンス本文・サーバログで詰める。
                  </p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              切り分けの核心は<strong>再現可能な最小リクエスト</strong>です。
              ブラウザの複雑な状態を取り除き、<code>curl</code> 1
              行で同じ呼び出しを 再現します。そのリクエストが <code>curl</code>{" "}
              で失敗するなら、原因は サーバ側（または認証・URL）にあります。
              <code>curl</code> では通るのにブラウザだけ失敗するなら、原因は
              CORS か
              クライアント側のコードです。この分岐だけで、調べる範囲が一気に狭まります。
            </p>

            <InfoBox type="success" title="切り分けの鉄則: curl で再現してみる">
              不具合を見つけたら、まずブラウザの Network
              パネルから該当リクエストを 「Copy as
              cURL」でコピーし、ターミナルで実行します。
              <strong>curl で同じエラーが出れば BE（サーバ）側の問題</strong>、
              <strong>
                curl は通るのにブラウザだけ失敗するなら CORS かクライアント側
              </strong>
              です。この一手で「どこを直すか」が確定します。
            </InfoBox>
          </section>

          {/* GUI: DevTools */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              GUI ①: ブラウザ DevTools の Network パネル
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ブラウザで起きた API 不具合は、まず DevTools の Network パネルで
              「実際に何が送られ、何が返ってきたか」を見ます。コードが意図したとおり
              リクエストを組み立てているとは限らないので、推測ではなく観測します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Headers / Status
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  リクエスト・レスポンス両方のヘッダーとステータスコードを確認。
                  <code>Content-Type</code>・<code>Authorization</code>・CORS
                  関連 ヘッダーがここに出る。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Payload / Response / Preview
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  送ったボディ（Payload）と返ってきた本文（Response）。Preview
                  は JSON を整形表示する。422 の <code>detail</code>{" "}
                  配列もここで読む。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Timing
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  DNS 解決・接続・TTFB（最初のバイトまで）・受信の内訳。
                  遅延がネットワークかサーバ処理かを切り分けられる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Initiator
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  「このリクエストを誰が発火したか」を呼び出しスタックで示す。
                  想定外のリクエストの出所を特定するのに使う。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              実務で効く操作が 2 つあります。<strong>Preserve log</strong>{" "}
              を有効に
              すると、ページ遷移やリダイレクトをまたいでログが消えません（ログイン後の
              リダイレクトで失敗するケースで必須）。<strong>フィルタ</strong>で
              <code>Fetch/XHR</code> に絞ると、画像や CSS を除いて API
              呼び出しだけを 見られます。
            </p>

            <InfoBox type="info" title="Copy as cURL がデバッグの起点になる">
              Network パネルでリクエストを右クリックすると「Copy as
              cURL」が選べます。
              ブラウザが実際に送ったヘッダー・Cookie・ボディがそのまま curl
              コマンドに
              なるので、これをターミナルに貼って実行すれば、前節の「curl
              で再現」を 一瞬で始められます。
            </InfoBox>
          </section>

          {/* GUI: Postman / Insomnia / Bruno */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              GUI ②: Postman / Insomnia / Bruno
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              リクエストを繰り返し組み立てて試すなら、専用の API クライアントが
              便利です。共通して<strong>コレクション</strong>
              （リクエストの保存・整理）、
              <strong>環境変数</strong>（dev / staging / prod
              でホストやトークンを切替）、
              <strong>認証設定</strong>（Bearer・Basic・OAuth 等の補助
              UI）を備えます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Postman
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  最も普及。コレクション共有・テストスクリプト・モックなど機能が広い。
                  クラウド同期が前提のワークフローになりやすい。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Insomnia
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  軽量でシンプル。REST に加え GraphQL・gRPC にも対応。環境変数の
                  扱いが直感的。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Bruno
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  リクエストを<strong>ローカルのプレーンファイル</strong>
                  として保存する のが特徴。git
                  管理・コードレビューに乗せられ、クラウド前提を避けられる。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="Bruno はリクエストを git 管理できる">
              Postman がコレクションをクラウド側に持ちがちなのに対し、Bruno は
              各リクエストを <code>.bru</code>{" "}
              形式のローカルファイルで保持します。
              リポジトリにコミットすれば、エンドポイント定義の変更履歴を
              <strong>diff として追え、PR レビューの対象にできます</strong>。
              チームで API の使い方を共有・監査したいときに向いています。
            </InfoBox>
          </section>

          {/* GUI: Swagger UI */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              GUI ③: Swagger UI の Try it out
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              OpenAPI 定義から自動生成される Swagger UI には、各エンドポイントを
              ブラウザから直接叩ける<strong>Try it out</strong>があります。
              定義（型・必須パラメータ）を見ながら実リクエストを送れるので、
              ドキュメントと実装の一致を確認するのに便利です。FastAPI などは
              <code>/docs</code> で標準提供します。
            </p>

            <InfoBox type="warning" title="Try it out は実エンドポイントを叩く">
              Try it out は<strong>本物のサーバへ実リクエストを送ります</strong>
              。 本番環境の Swagger UI で <code>DELETE</code> や{" "}
              <code>POST</code> を
              押すと、実データを変更・削除してしまいます。本番では Try it out を
              無効化するか、検証は staging / ローカルで行うのが安全です。
            </InfoBox>
          </section>

          {/* CLI: curl / HTTPie / jq */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CLI: curl / HTTPie / jq
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              CLI ツールは「再現可能な最小リクエスト」を 1
              行で表現でき、コピー＆貼り付け で共有しやすいのが利点です。中心は{" "}
              <code>curl</code>。主要オプションを
              押さえれば、ほとんどの切り分けに足ります。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      オプション
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {curlFlags.map((f) => (
                    <tr key={f.flag} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {f.flag}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {f.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="bash"
              title="curl -v の出力例（送受信ヘッダーと接続が見える）"
              code={`$ curl -v https://api.example.com/v1/articles/42
*   Trying 203.0.113.10:443...
* Connected to api.example.com (203.0.113.10) port 443
* using HTTP/2
> GET /v1/articles/42 HTTP/2
> Host: api.example.com
> User-Agent: curl/8.7.1
> Accept: */*
>
< HTTP/2 200
< content-type: application/json
< etag: "a1b2c3"
< cache-control: no-cache
<
{ "id": 42, "title": "API 設計入門" }`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              <code>{">"}</code> で始まる行が送信したリクエスト、
              <code>{"<"}</code> で始まる行が受信したレスポンスです。
              <code>-v</code> なら接続先 IP・ プロトコル（HTTP/2）・TLS
              の様子まで見えるので、「そもそも繋がっているか」
              「どのヘッダーを実際に送ったか」をここで確定できます。
            </p>

            <CodeBlock
              language="bash"
              title="HTTPie は人間に読みやすい構文（POST + JSON）"
              code={`# http <METHOD> <URL> key=value ... で JSON ボディを送れる
http POST https://api.example.com/v1/articles \\
  title="API 設計入門" \\
  Authorization:"Bearer eyJ...token"

# レスポンスは自動で色付き整形される（status・headers・body）`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              <code>HTTPie</code> は <code>key=value</code> で JSON
              ボディを組み立て、
              <code>Header:value</code> でヘッダーを足せます。<code>curl</code>{" "}
              より
              タイプ量が少なく、出力も整形済みなので手早い確認に向きます。一方、
              <code>curl</code>{" "}
              の方が低レイヤを観察でき、どこにでも入っているという
              強みがあります。
            </p>

            <CodeBlock
              language="bash"
              title="jq でレスポンス JSON を整形・抽出する"
              code={`# 全体を整形表示
curl -s https://api.example.com/v1/articles/42 | jq

# 特定フィールドだけ取り出す
curl -s https://api.example.com/v1/articles/42 | jq '.title'

# 配列から id だけ並べる
curl -s https://api.example.com/v1/articles | jq '.[].id'`}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code>-s</code>（silent）で進捗表示を消し、パイプで{" "}
              <code>jq</code> に 渡すと、生の JSON
              を整形・絞り込みできます。配列の中身や入れ子の値を
              確認するのが一気に楽になります。
            </p>
          </section>

          {/* よくある失敗の診断手順 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              よくある失敗の診断手順
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              症状ごとに「まず何を見るか」が決まっています。代表的なものを、
              切り分けの順序つきで整理します。
            </p>

            <CodeBlock
              language="bash"
              title="curl は通るのにブラウザだけ CORS で弾かれる対比"
              code={`# ① curl では成功する（CORS はブラウザだけが強制する。curl は無視）
$ curl -i http://localhost:8000/api/articles
HTTP/1.1 200 OK
content-type: application/json
[ ... 正常なデータ ... ]

# ② 同じ API を localhost:3000 のブラウザ JS から fetch すると失敗
#   ブラウザのコンソール:
#   Access to fetch at 'http://localhost:8000/api/articles' from origin
#   'http://localhost:3000' has been blocked by CORS policy:
#   No 'Access-Control-Allow-Origin' header is present on the requested resource.

# → curl(=サーバ) は正常。原因はサーバの CORS ヘッダー設定（クライアント実装ではない）
#   :3000 と :8000 はポート違い = 別オリジン。サーバ側で許可オリジンを設定する`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              非単純リクエスト（<code>Authorization</code> ヘッダー付きや
              <code>application/json</code> の <code>PUT</code>{" "}
              等）では、ブラウザは 本番リクエストの前に <code>OPTIONS</code> の
              preflight を自動で送ります。 Network パネルに <code>OPTIONS</code>{" "}
              が並ぶのは正常で、これが失敗して いる場合はサーバの preflight
              応答（許可メソッド・ヘッダー）を見直します。
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed mb-6">
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  401 と 403 を取り違えない:
                </span>{" "}
                <code>401 Unauthorized</code> は<strong>認証</strong>の失敗
                （誰か分からない＝トークン未送付・期限切れ）。
                <code>403 Forbidden</code>は<strong>認可</strong>
                の失敗（誰かは分かるが権限がない）。 401
                ならトークンの付与・更新を、403 なら権限・ロールを疑う。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  422 はバリデーション:
                </span>{" "}
                ボディの形が定義と合っていない。<code>Content-Type</code> が
                <code>application/json</code>{" "}
                か、必須フィールドが欠けていないかを 確認する。FastAPI
                なら本文の <code>detail</code> 配列の
                <code>loc</code> がどのフィールドかを示す。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  404 は URL / メソッド / プレフィックス違い:
                </span>{" "}
                パスの綴り・末尾スラッシュ・<code>/api/v1</code> のような
                プレフィックスの付け忘れ、メソッド違い（GET のルートに
                POST）を疑う。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  5xx / timeout はサーバとその依存先:
                </span>{" "}
                クライアントでは直せない。サーバログ・スタックトレース・DB
                や外部 API など依存先の死活を見る。timeout
                は依存先の遅延や接続プールの枯渇が多い。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  Content-Type 不一致:
                </span>{" "}
                JSON を送ったつもりがフォーム形式で送っていた、サーバが返す
                Content-Type と実体がずれている等。リクエスト・レスポンス双方の
                <code>Content-Type</code> を Network / <code>-i</code>{" "}
                で突き合わせる。
              </li>
            </ul>

            <CodeBlock
              language="json"
              title="FastAPI の 422 と 401 のボディ形（読み方を知っておく）"
              code={`// 422: バリデーション失敗（loc がどのフィールドかを示す）
{
  "detail": [
    {
      "type": "missing",
      "loc": ["body", "title"],
      "msg": "Field required",
      "input": {}
    }
  ]
}

// 401: 認証失敗（detail は単なる文字列）
{ "detail": "Not authenticated" }`}
            />
          </section>

          {/* Quiz 1: CORS */}
          <section>
            <Quiz
              question="curl では 200 で返るのに、localhost:3000 のブラウザから fetch すると『blocked by CORS policy』で失敗する。原因の層はどこか？"
              options={[
                {
                  label:
                    "サーバの CORS 設定（curl は通る＝サーバ自体は動作。ブラウザだけが CORS を強制している）",
                  correct: true,
                },
                { label: "クライアントの JSON シリアライズのバグ" },
                { label: "データベースの接続エラー" },
                { label: "curl のバージョンが古いことによる差異" },
              ]}
              explanation="CORS はブラウザだけが強制する仕組みで、curl やサーバ間通信では無視されます。curl で 200 が返るならサーバ本体は正常に応答しており、ブラウザだけが Access-Control-Allow-Origin が無いために弾いています。:3000 と :8000 はポート違いで別オリジンなので、サーバ側で許可オリジンを設定するのが対処です。クライアントのコードを直しても解決しません。"
            />
          </section>

          {/* 検証ツールの位置づけ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              検証ツールの位置づけ整理
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              デバッグが「起きた不具合を追う」のに対し、検証ツールは「不具合を未然に
              防ぐ」側です。目的ごとに使うツールが分かれているので、
              「いつ使うか」を 1 行で押さえておきます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      目的
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      代表ツール
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      いつ使うか
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {toolMap.map((t) => (
                    <tr key={t.purpose} className="border-b border-border">
                      <td className="py-2 pr-4 font-bold text-foreground whitespace-nowrap align-top">
                        {t.purpose}
                      </td>
                      <td className="py-2 px-4 font-mono text-primary whitespace-nowrap align-top">
                        {t.tool}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {t.when}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              手元のデバッグ（DevTools /
              curl）で「いま起きている問題」を特定し、 検証ツール（Spectral /
              schemathesis / Pact 等）を CI に組み込んで
              「次に起きる問題」を減らす——この 2 段構えが、API
              品質の現実的な進め方です。 型レベルの契約のズレ（例:{" "}
              <code>id</code> が int か文字列か）は、
              <code>openapi-typescript</code> で生成した型と実装を突き合わせると
              早期に表面化します。
            </p>
          </section>

          {/* Quiz 2: 401 vs 403 */}
          <section>
            <Quiz
              question="ログイン済みのユーザーが管理者専用 API を叩いたら 403 が返った。次にまず疑うべきは？"
              options={[
                {
                  label:
                    "認可（権限・ロール）。誰かは分かっているが、その操作をする権限がない",
                  correct: true,
                },
                { label: "認証トークンが未送付または期限切れ" },
                { label: "URL のプレフィックス（/api/v1）の付け忘れ" },
                { label: "リクエストボディのバリデーションエラー" },
              ]}
              explanation="403 Forbidden は認可の失敗で、『身元は分かっているが権限がない』状態です。トークン未送付・期限切れなら 401 Unauthorized が返ります。403 が出たらユーザーのロールや権限設定を見直すのが先で、トークンの再取得では解決しません。401 = 認証（誰か分からない）、403 = 認可（権限がない）と区別します。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title:
                    "Chrome DevTools - Network パネルでネットワーク活動を検査",
                  url: "https://developer.chrome.com/docs/devtools/network",
                  description:
                    "リクエスト/レスポンスの読み方、Preserve log、フィルタ、Initiator の公式解説",
                },
                {
                  title: "MDN - CORS（オリジン間リソース共有）",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/CORS",
                  description:
                    "preflight・許可ヘッダー・なぜブラウザだけが強制するかを日本語で解説",
                },
                {
                  title: "curl 公式マニュアル",
                  url: "https://curl.se/docs/manual.html",
                  description:
                    "-i / -X / -H / -d / -v など主要オプションの一次情報",
                },
                {
                  title: "HTTPie ドキュメント",
                  url: "https://httpie.io/docs/cli",
                  description:
                    "http コマンドの構文・JSON 送信・認証指定の公式ガイド",
                },
                {
                  title: "Bruno - Git 管理できる API クライアント",
                  url: "https://docs.usebruno.com/",
                  description:
                    "リクエストをローカルファイルで保持し git 管理する設計の公式ドキュメント",
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
