import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const problemFields = [
  {
    field: "type",
    description:
      'エラーの種類を識別する URI。同じ type なら同じ意味のエラー。リンク先にドキュメントを置く運用が推奨される。省略時は "about:blank" 扱い',
  },
  {
    field: "title",
    description:
      "そのエラー種別を人間向けに短く要約した文字列。同じ type なら原則同じ title になる（個別の状況は detail に書く）",
  },
  {
    field: "status",
    description:
      "HTTP ステータスコード。レスポンスの実ステータスと一致させる。中間プロキシでステータスが書き換わった時の保険にもなる",
  },
  {
    field: "detail",
    description:
      "この発生インスタンス固有の人間向け説明。title が種別の説明なのに対し、detail は「今回」何が起きたかを具体的に書く",
  },
  {
    field: "instance",
    description:
      "そのエラーが発生した個別リソースを指す URI。ログ追跡やサポート問い合わせの突き合わせに使える（任意）",
  },
];

export default function ErrorHandling() {
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
            エラーレスポンス設計
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            API が成功を返すのは簡単です。難しいのは失敗の返し方です。
            エラーの形式がエンドポイントごとにバラバラだと、クライアントは
            個別に対応を書き分けるはめになります。ここでは一貫したエラー形式、
            標準化された Problem
            Details、そして本番で内部情報を漏らさない設計を扱います。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "エラー設計",
            "RFC 9457",
            "Problem Details",
            "バリデーション",
            "セキュリティ",
          ]}
        >
          <p>
            正常系だけを作って「動いた」と思った API
            は、本番でエラーが返り始めた瞬間に破綻します。 あるエンドポイントは{" "}
            <code>{'{ "error": "..." }'}</code>、別のエンドポイントは
            <code>{'{ "message": "..." }'}</code>、さらに別のものは HTML
            を返す—— こうなるとクライアントはエラー処理を書きようがありません。
            エラーレスポンスは<strong>「失敗もまた契約の一部」</strong>
            という前提で、 正常系と同じ熱量で設計する必要があります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 一貫した形式 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              まず「形を揃える」
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              エラー設計で最初にやるべきことは、凝った仕様を選ぶことではなく
              <strong>全エンドポイントでエラーの形を統一する</strong>ことです。
              クライアントは「失敗したらこのキーを見ればいい」と一度だけ実装すれば済みます。
              下は同じ「メールアドレスが不正」という状況を、揃っていない API と
              揃っている API で比べたものです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-foreground mb-3 text-base">
                  揃っていない（避けたい）
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                  <li>
                    <code>POST /users</code> →{" "}
                    <code>{'{ "error": "bad email" }'}</code>
                  </li>
                  <li>
                    <code>POST /login</code> →{" "}
                    <code>{'{ "msg": "invalid" }'}</code>
                  </li>
                  <li>
                    <code>POST /orders</code> → HTML のエラーページ
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  キー名も構造もバラバラ。クライアントは分岐を量産する。
                </p>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="font-bold text-primary mb-3 text-base">
                  揃っている（推奨）
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                  <li>すべて同じトップレベル構造</li>
                  <li>
                    機械可読な <code>code</code> と人間向け <code>message</code>{" "}
                    を分離
                  </li>
                  <li>
                    <code>Content-Type</code> が常に JSON
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  クライアントは共通のハンドラ 1 つで処理できる。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="code と message を分ける">
              <code>message</code>{" "}
              は人間が読む文字列なので、文言の改善や多言語化で変わります。
              一方、クライアントのコードが分岐に使うのは安定した文字列の{" "}
              <code>code</code>（例: <code>EMAIL_INVALID</code>）にします。
              <code>message</code> で <code>if</code>{" "}
              文を書くと、文言修正のたびに クライアントが壊れます。
            </InfoBox>
          </section>

          {/* RFC 9457 Problem Details */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              標準形式: Problem Details (RFC 9457)
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              自前でゼロから形式を決める前に、標準があります。
              <strong>RFC 9457「Problem Details for HTTP APIs」</strong>は、
              HTTP API のエラーを表現する共通の JSON 形式を定義しています。
              これは以前の RFC 7807 を置き換えた最新版です。
              <code>Content-Type</code> に<code>application/problem+json</code>{" "}
              を使い、次のフィールドで構成します。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="text-left font-bold text-foreground px-4 py-3 w-28">
                      フィールド
                    </th>
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      意味
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {problemFields.map((row) => (
                    <tr
                      key={row.field}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3 align-top">
                        <code className="text-primary font-medium">
                          {row.field}
                        </code>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground leading-relaxed">
                        {row.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              5 つのフィールドはすべて任意ですが、実用上は <code>type</code> /{" "}
              <code>title</code> / <code>status</code> を埋め、状況に応じて{" "}
              <code>detail</code> を添えるのが基本形です。さらに RFC 9457 は
              <strong>独自拡張メンバー</strong>
              を認めており、後述のバリデーション詳細などを
              同じオブジェクトに足せます。
            </p>

            <CodeBlock
              language="json"
              title="Problem Details 形式（Content-Type: application/problem+json）"
              code={`{
  "type": "https://api.example.com/problems/insufficient-balance",
  "title": "残高が不足しています",
  "status": 403,
  "detail": "送金額 5000 円に対し、残高は 1200 円です。",
  "instance": "/accounts/12345/transfers/98765",
  "code": "INSUFFICIENT_BALANCE",
  "balance": 1200,
  "requested": 5000
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>balance</code> や <code>requested</code>、機械可読な{" "}
              <code>code</code> は RFC 9457 の独自拡張メンバーです。
              標準の骨格を保ちつつ、ドメイン固有の情報を同じ形式で運べるのが利点です。
            </p>

            <InfoBox type="success" title="標準に乗る実利">
              Problem Details
              に従うと、クライアント側のライブラリやエラー表示の仕組みが
              そのまま使えることがあります。独自形式は「自分のチームだけが知っている方言」になりがちです。
              迷ったら RFC 9457
              をベースにし、必要な情報を拡張メンバーで足すのが堅実です。
            </InfoBox>
          </section>

          {/* バリデーションエラー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              バリデーションエラーは「まとめて」返す
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              フォーム送信で「名前が空」「メールが不正」「パスワードが短い」と 3
              つ問題があるのに、最初の 1 件だけエラーを返す API は最悪です。
              ユーザーは 1 つ直して再送 → 次のエラー、を繰り返すことになります。
              <strong>不正だったフィールドを配列で一度に返す</strong>
              のが正しい設計です。
              ステータスは構文は正しいが内容が処理できないことを示す{" "}
              <code>422 Unprocessable Content</code> がよく使われます。
            </p>

            <CodeBlock
              language="json"
              title="フィールド単位のバリデーションエラー（HTTP 422）"
              code={`{
  "type": "https://api.example.com/problems/validation-error",
  "title": "入力内容に誤りがあります",
  "status": 422,
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "name",
      "code": "REQUIRED",
      "message": "名前は必須です。"
    },
    {
      "field": "email",
      "code": "INVALID_FORMAT",
      "message": "メールアドレスの形式が正しくありません。"
    },
    {
      "field": "password",
      "code": "TOO_SHORT",
      "message": "パスワードは 8 文字以上で入力してください。"
    }
  ]
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              各要素が <code>field</code>（どの入力か）と <code>message</code>
              （何が悪いか）を持つため、クライアントは対応する入力欄の下に
              エラーを並べて表示できます。<code>field</code>{" "}
              をキーにできるので、
              フロントの状態管理にそのまま流し込めるのも実用上の利点です。
            </p>

            <InfoBox type="warning" title="422 はまだ対応が分かれる">
              仕様上、構文は妥当だが意味的に処理できないリクエストには{" "}
              <code>422 Unprocessable Content</code>（旧称 Unprocessable
              Entity）が適切です。 ただし実装によっては入力エラーをすべて{" "}
              <code>400 Bad Request</code> で返す API も多くあります。
              どちらを採用するにせよ、<strong>プロジェクト内で統一</strong>し、
              ドキュメントに明記することが大切です。バラバラなのが一番困ります。
            </InfoBox>
          </section>

          {/* フレームワーク既定 vs 設計した形 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              フレームワーク既定と「設計した形」のギャップ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここまでは「こう設計すべき」という理想形（problem+json）を見てきました。
              一方で、実際のフレームワークが<strong>素で返すエラー</strong>は、
              その理想とは別の形をしていることがほとんどです。
              代表例として FastAPI の既定エラーを実測値で見てみます。
            </p>

            <CodeBlock
              language="json"
              title="FastAPI の既定 422（title 欠落の POST、実測）"
              code={`{
  "detail": [
    {
      "type": "missing",
      "loc": ["body", "title"],
      "msg": "Field required",
      "input": { "body": "x" }
    }
  ]
}`}
            />

            <CodeBlock
              language="json"
              title="FastAPI の既定 401（トークン無し、実測）"
              code={`{ "detail": "invalid or missing token" }`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              注目すべきは、同じ <code>detail</code> キーでも 422 では
              <strong>配列</strong>、401 では<strong>文字列</strong>と
              形が違うことです。さらにどちらも{" "}
              <code>application/problem+json</code>（RFC 9457）ではなく、
              <code>type</code> / <code>title</code> / <code>status</code> /{" "}
              <code>instance</code> といったフィールドも持ちません。
              「フレームワークが返す形」と「契約として設計したい形」は一致しないのが普通です。
            </p>

            <InfoBox type="info" title="既定をそのまま契約にしない">
              フレームワークの既定エラーは便利ですが、それがそのまま API
              の「契約」になるわけではありません。
              既定の形を許容するのか、problem+json に寄せて整形するのかを
              設計判断として決め、OpenAPI に明記します。
              既定任せだと、エンドポイントやフレームワークを跨いだ瞬間に形が割れます。
            </InfoBox>
          </section>

          {/* 実装例: FastAPI で problem+json */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              実装例: FastAPI で problem+json を返す（実測）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              既定の <code>{'{ "detail": ... }'}</code> ではなく RFC 9457
              に寄せるには、例外ハンドラでレスポンスの{" "}
              <strong>media_type</strong> を{" "}
              <code>application/problem+json</code> にし、type / title / status /
              detail / instance を返します。下は実機で動かした実装と実レスポンスです。
            </p>

            <CodeBlock
              language="python"
              title="FastAPI — Problem 例外ハンドラ（media_type が肝）"
              code={`class ProblemException(Exception):
    def __init__(self, *, status, title, detail, type_="about:blank", instance=None):
        ...

@app.exception_handler(ProblemException)
def problem_handler(_, exc: ProblemException):
    body = {"type": exc.type_, "title": exc.title, "status": exc.status, "detail": exc.detail}
    if exc.instance:
        body["instance"] = exc.instance
    return JSONResponse(
        status_code=exc.status,
        media_type="application/problem+json",  # ← これが肝
        content=body,
    )`}
            />

            <CodeBlock
              language="http"
              title="実レスポンス（GET /problem-demo、実測）"
              code={`HTTP/1.1 404 Not Found
content-type: application/problem+json

{
  "type": "https://example.com/probs/memo-not-found",
  "title": "Memo not found",
  "status": 404,
  "detail": "id=999 のメモは存在しません",
  "instance": "/problem-demo"
}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed text-sm">
              対比: FastAPI 既定は <code>content-type: application/json</code> +{" "}
              <code>{'{ "detail": "not found" }'}</code>。problem+json
              は media type と標準フィールドを持つ点が違います。出典: FastAPI +
              Nuxt sandbox で実測。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="エラー形式を全エンドポイントで統一すると、クライアントにとって何が嬉しい？"
              options={[
                { label: "レスポンスのバイト数が必ず小さくなる" },
                {
                  label:
                    "「失敗したらこの構造を見ればいい」と一度実装すれば、共通のハンドラで全エラーを扱える",
                  correct: true,
                },
                { label: "サーバの処理速度が上がる" },
                { label: "エラーそのものが発生しなくなる" },
              ]}
              explanation="形式が揃っていれば、クライアントはエラー処理を一度だけ実装すれば済みます。形式がエンドポイントごとに違うと、その数だけ分岐を書くことになり、対応漏れや表示崩れの原因になります。エラー形式の統一は速度や発生頻度とは無関係で、あくまで「扱いやすさ」の問題です。"
            />
          </section>

          {/* セキュリティ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              本番では内部情報を出さない
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              開発中は便利なスタックトレースや SQL
              文も、本番のエラーレスポンスに
              そのまま載せてはいけません。攻撃者にとっては設計図そのものです。
              フレームワーク名・バージョン・ファイルパス・テーブル名・内部 IP
              などが 漏れると、攻撃の足がかりになります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-foreground mb-3 text-base">
                  漏らしてはいけない
                </p>
                <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed list-disc pl-5">
                  <li>スタックトレース・例外クラス名</li>
                  <li>SQL 文・テーブル / カラム名</li>
                  <li>ファイルパス・ソース行番号</li>
                  <li>フレームワーク名とバージョン</li>
                  <li>内部ホスト名・IP アドレス</li>
                </ul>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="font-bold text-primary mb-3 text-base">
                  代わりに返すもの
                </p>
                <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed list-disc pl-5">
                  <li>一般化した安全なメッセージ</li>
                  <li>
                    機械可読な <code>code</code>
                  </li>
                  <li>
                    相関 ID（<code>traceId</code> 等）でログと突き合わせ
                  </li>
                  <li>詳細はサーバ側ログにのみ記録</li>
                </ul>
              </div>
            </div>

            <CodeBlock
              language="json"
              title="本番で 500 を返すとき（詳細はログへ、外には相関 ID のみ）"
              code={`{
  "type": "about:blank",
  "title": "サーバ内部でエラーが発生しました",
  "status": 500,
  "code": "INTERNAL_ERROR",
  "traceId": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d"
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>traceId</code>{" "}
              をレスポンスとサーバログの両方に出しておくと、
              ユーザーから「このエラーが出た」と問い合わせが来たとき、
              内部情報を一切外に出さずにログ上の原因へたどり着けます。
            </p>

            <InfoBox type="error" title="内部詳細の露出は情報漏えい">
              本番のエラーにスタックトレースや SQL
              を含めるのは、それ自体が情報漏えいです。
              攻撃者は意図的にエラーを誘発し、返ってきた内部情報から構成や脆弱性を推測します。
              対策はシンプルで、
              <strong>
                詳細はサーバ側のログにだけ記録し、
                クライアントには一般化したメッセージと相関 ID だけを返す
              </strong>
              ことです。
              環境変数で本番モードを判定し、デバッグ情報の出力を確実に切り替えてください。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="RFC 9457（Problem Details）について正しいのはどれ？"
              options={[
                {
                  label:
                    "HTTP API のエラーを表現する標準 JSON 形式で、RFC 7807 を置き換えた最新版。Content-Type は application/problem+json",
                  correct: true,
                },
                {
                  label:
                    "成功レスポンスのページネーション方式を定めた仕様である",
                },
                {
                  label:
                    "独自フィールドの追加を一切禁止しており、5 つの標準フィールドしか使えない",
                },
                {
                  label:
                    "Content-Type に application/json を使うことを必須にしている",
                },
              ]}
              explanation="RFC 9457 は HTTP API のエラーを表現する標準形式で、以前の RFC 7807 を置き換えています。type / title / status / detail / instance の標準フィールドに加え、独自拡張メンバーを足せます。メディアタイプは application/problem+json（XML 版は application/problem+xml）です。ページネーションとは無関係です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "RFC 9457 - Problem Details for HTTP APIs",
                  url: "https://www.rfc-editor.org/rfc/rfc9457.html",
                  description:
                    "エラー表現の標準形式を定める最新の RFC。フィールド定義と拡張メンバーの規則が一次情報として読める",
                },
                {
                  title: "MDN - HTTP レスポンスステータスコード",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Status",
                  description:
                    "4xx / 5xx を含む各ステータスコードの意味。422 や 400 の使い分けの根拠になる",
                },
                {
                  title: "OWASP - Improper Error Handling",
                  url: "https://owasp.org/www-community/Improper_Error_Handling",
                  description:
                    "エラーレスポンスからの情報漏えいリスクと対策を解説。内部詳細を出さない設計の裏付け",
                },
                {
                  title: "MDN - 422 Unprocessable Content",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Status/422",
                  description:
                    "バリデーションエラーで使われる 422 の定義。400 との違いを確認できる",
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
