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

// カテゴリの概要（1xx 情報応答は実務での使用が稀なため省略し、2xx〜5xx を扱う）
const categories = [
  {
    range: "2xx",
    label: "成功",
    description:
      "リクエストが正常に受理・処理された。代表例は 200 / 201 / 204。",
  },
  {
    range: "3xx",
    label: "リダイレクト",
    description:
      "リクエストを完了するには追加の操作が必要。代表例は 301 / 302 / 304。",
  },
  {
    range: "4xx",
    label: "クライアントエラー",
    description:
      "リクエスト側に問題がある。送り方・認証・権限・対象の不在など。修正の責任はクライアント側。",
  },
  {
    range: "5xx",
    label: "サーバエラー",
    description:
      "リクエストは妥当だがサーバ側で処理に失敗した。修正の責任はサーバ側。",
  },
];

// 主要コードの早見表
const codeTable = [
  {
    code: "200",
    name: "OK",
    when: "汎用の成功。GET の取得結果や、ボディを伴う更新の応答に使う。",
  },
  {
    code: "201",
    name: "Created",
    when: "新規リソースを作成した。Location ヘッダーで作成したリソースの URI を返す。",
  },
  {
    code: "204",
    name: "No Content",
    when: "成功したがレスポンスボディを返さない。DELETE や、本文不要な更新に使う。",
  },
  {
    code: "400",
    name: "Bad Request",
    when: "リクエストの構文が壊れている。JSON のパース失敗、必須パラメータの欠落など。",
  },
  {
    code: "401",
    name: "Unauthorized",
    when: "未認証。そもそも本人確認ができていない（資格情報がない／無効）。",
  },
  {
    code: "403",
    name: "Forbidden",
    when: "リクエストは理解したが実行を拒否する。典型は認証済みで権限が足りない場合だが、資格情報と無関係な理由でも返す。",
  },
  {
    code: "404",
    name: "Not Found",
    when: "対象のリソースが存在しない。存在を隠したい場合に 403 の代わりに使うこともある。",
  },
  {
    code: "409",
    name: "Conflict",
    when: "現在の状態と競合して処理できない。一意制約の重複、楽観ロックの不一致など。",
  },
  {
    code: "422",
    name: "Unprocessable Content",
    when: "構文は正しいが意味的に不正。バリデーションエラーの表現に使われることが多い（旧称 Unprocessable Entity、RFC 9110 で改称）。",
  },
  {
    code: "429",
    name: "Too Many Requests",
    when: "レート制限を超過した。Retry-After ヘッダーで再試行可能な時刻を伝えられる。",
  },
  {
    code: "500",
    name: "Internal Server Error",
    when: "サーバ内部の予期しないエラー。未処理例外などの汎用的な失敗。",
  },
  {
    code: "503",
    name: "Service Unavailable",
    when: "一時的に処理できない。メンテナンス中や過負荷。Retry-After を併用できる。",
  },
];

export default function StatusCodes() {
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
            ステータスコード設計
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            HTTP ステータスコードは、リクエストの結果をクライアントに伝える 3
            桁の数値です。設計の良し悪しは「成功と失敗を、誰が見ても同じ意味で
            読み取れるか」で決まります。この章では、カテゴリの考え方と主要コードの
            使い分け、とくに混同しやすい 401 と 403、400 と 422
            の境界を整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["HTTP", "ステータスコード", "REST", "エラー設計", "401/403"]}
        >
          <p>
            ステータスコードを雑に扱う API は、利用者を疲弊させます。
            何を返しても <code>200</code> で <code>{`{ "error": "..." }`}</code>{" "}
            を本文に詰める設計だと、クライアントは毎回ボディをパースしないと
            成否すら判定できません。逆に、結果に正しいコードを割り当てておけば、
            クライアントはステータス行を見るだけで
            <strong>「成功か・自分が直すべきか・サーバの問題か」</strong>
            を即座に分岐できます。コードの選択は、そのまま API
            の使いやすさになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ステータスコードの分岐
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              結果が成功か、クライアント起因の失敗か、サーバ起因の失敗かで、返すべきステータスコードの系列が決まります。
            </p>
            <MermaidDiagram
              title="ステータスコードの分岐（図）"
              chart={`flowchart TD
  REQ["リクエスト"] --> A{"処理できた?"}
  A -->|"成功"| S2["2xx (200 / 201 / 204)"]
  A -->|"クライアント起因"| S4["4xx (400 / 401 / 403 / 404 / 422)"]
  A -->|"サーバ起因"| S5["5xx (500 / 503)"]`}
            />
          </section>
          {/* カテゴリ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              4 つのカテゴリ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ステータスコードは先頭の数字でカテゴリが決まります。
              細かいコードを覚える前に、まず「2xx は成功、3xx はリダイレクト、
              4xx はクライアント側の問題、5xx はサーバ側の問題」という
              <strong>責任の所在</strong>
              を押さえると、迷ったときの指針になります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.range}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-mono font-bold text-primary text-lg">
                      {cat.range}
                    </span>
                    <span className="font-bold text-foreground">
                      {cat.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="4xx と 5xx を取り違えない">
              4xx を返すべき場面（不正な入力など）で 5xx を返すと、
              監視アラートが鳴り続けて本物の障害が埋もれます。逆に、
              サーバの不具合（未処理例外）を 4xx で隠すと、
              壊れているのに「正常にエラーを返した」ように見えてしまいます。
              責任の所在をコードで正しく表現することが、運用の前提になります。
            </InfoBox>
          </section>

          {/* 主要コード早見表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              主要コードの早見表
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              実務で頻出するコードを用途とともにまとめます。
              すべてを使う必要はありません。むしろ
              <strong>少数のコードを一貫したルールで使い分ける</strong>
              ほうが、利用者にとっては予測しやすい API になります。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="text-left font-bold text-foreground px-4 py-3 w-20">
                      コード
                    </th>
                    <th className="text-left font-bold text-foreground px-4 py-3 w-44">
                      名称
                    </th>
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      使いどころ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {codeTable.map((row) => (
                    <tr
                      key={row.code}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3 font-mono font-bold text-primary align-top">
                        {row.code}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground align-top">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground leading-relaxed">
                        {row.when}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 201 Created と Location */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              201 Created と Location ヘッダー
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              POST で新規リソースを作成したら、200 ではなく{" "}
              <strong>201 Created</strong> を返すのが定石です。 さらに{" "}
              <code>Location</code> ヘッダーに、作成されたリソースの URI
              を入れます。クライアントは生成された ID を含む URL を、
              レスポンスボディを解析せずにヘッダーから直接得られます。
              ただし <code>Location</code> の付与は REST の慣習であって、
              フレームワークが自動で付けるとは限りません。たとえば FastAPI は
              201 を返しても <code>Location</code> を自動付与しないため、必要なら手動で設定します。
              「仕様・慣習としてのあるべき姿」と「フレームワークの既定動作」は分けて捉えるのが安全です。
            </p>

            <CodeBlock
              language="http"
              title="POST /v1/users へのレスポンス（作成成功）"
              code={`HTTP/1.1 201 Created
Location: https://api.example.com/v1/users/42
Content-Type: application/json

{
  "id": 42,
  "name": "田中 花子",
  "email": "hanako@example.com",
  "createdAt": "2026-06-20T09:00:00Z"
}`}
            />

            <InfoBox type="success" title="204 No Content の使いどころ">
              削除（DELETE）が成功したときや、更新が成功してボディを返す必要が
              ない場合は <strong>204 No Content</strong> が適しています。 204
              はボディを持たないと定義されているため、空の JSON や
              メッセージを詰めず、ステータスだけで成功を伝えます。
            </InfoBox>
          </section>

          {/* 401 vs 403 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              401 と 403 の違い
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              最も取り違えられるのがこの 2 つです。まずは
              <strong>
                「認証が足りない（401）」のか「リクエスト自体を拒否する（403）」のか
              </strong>
              で見分けます。403 は権限不足に限らず、資格情報とは無関係な理由による拒否も含みます（RFC 9110 15.5.4）。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="font-mono font-bold text-primary mb-1">
                  401 Unauthorized
                </p>
                <p className="font-bold text-foreground mb-2 text-sm">未認証</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  そもそも本人確認ができていない。トークンがない、
                  または無効・期限切れ。クライアントは「認証し直せば通る可能性がある」
                  と判断できる。
                </p>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="font-mono font-bold text-primary mb-1">
                  403 Forbidden
                </p>
                <p className="font-bold text-foreground mb-2 text-sm">
                  リクエストを拒否
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  サーバはリクエストを理解したうえで実行を拒否する。
                  典型は権限不足だが、IP 制限や機能の停止など、
                  資格情報と無関係な理由での拒否も含む。
                  RFC 9110 は同じ資格情報での自動的な再試行を避けるよう述べており、
                  別の資格情報での再試行は認めている。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              名前と意味がずれて見えるので、RFC 9110
              の定義で覚えるのが安全です。401 は
              「対象リソースに対する有効な認証資格を欠いている」ことを示し、
              サーバは <code>WWW-Authenticate</code>{" "}
              ヘッダーで認証方式を伝えなければなりません。 403
              は「リクエストは理解したが実行を拒否する」ことを示し、
              資格情報とは無関係な理由による拒否も含みます。
            </p>
          </section>

          {/* Quiz 1: 401 vs 403 */}
          <section>
            <Quiz
              question="ログイン済みのユーザーが、管理者専用の操作を実行しようとした。返すべきコードは？"
              options={[
                {
                  label: "401 Unauthorized（資格情報がないため）",
                },
                {
                  label:
                    "403 Forbidden（認証は済んでいるが、その操作の権限がないため）",
                  correct: true,
                },
                { label: "400 Bad Request（リクエストが不正なため）" },
                { label: "500 Internal Server Error（処理できないため）" },
              ]}
              explanation="ユーザーはログイン済み＝認証は成功しています。問題は『この操作を行う権限がない』ことなので 403 Forbidden が正解です。401 は本人確認そのものができていない（未認証）場合に使います。再ログインしても権限が変わらない状況は 403 です。"
            />
          </section>

          {/* 400 vs 422 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              400 と 422 の使い分け
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              どちらもクライアント側の入力エラーですが、層が違います。
              <strong>400 Bad Request は「構文が壊れている」</strong>、
              <strong>
                422 Unprocessable Content（旧称 Unprocessable Entity）は「構文は正しいが意味的に不正」
              </strong>
              です。たとえば JSON 自体がパースできなければ 400、 JSON
              としては妥当だが「メールアドレスの形式が不正」「年齢が負の数」
              のようなバリデーション違反は 422、という切り分けになります。
            </p>

            <CodeBlock
              language="json"
              title="422 のレスポンス例（フィールド単位のバリデーションエラー）"
              code={`{
  "type": "https://api.example.com/errors/validation",
  "title": "入力値の検証に失敗しました",
  "status": 422,
  "errors": [
    {
      "field": "email",
      "code": "invalid_format",
      "message": "メールアドレスの形式が正しくありません"
    },
    {
      "field": "age",
      "code": "out_of_range",
      "message": "age は 0 以上の整数である必要があります"
    }
  ]
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              仕様と実測のギャップを 1 点。422 は元々 WebDAV（RFC 4918）で
              定義されたコードで、近年の HTTP セマンティクス仕様（RFC 9110）にも
              取り込まれています。ただし「バリデーションエラーは必ず 422」と
              決まっているわけではなく、
              <strong>400 で統一する API も実在します</strong>。
              重要なのは厳密な正解を当てることより、プロジェクト内で
              一貫したルールを決め、ドキュメントに明記することです。
            </p>
          </section>

          {/* 混同しないための指針 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              混同しないための指針
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              迷ったときの判断順序を決めておくと、設計のブレが減ります。
              次の問いを上から順にあてはめると、4xx
              系の選択はおおむね定まります。
            </p>

            <div className="rounded-xl border border-border bg-card p-5">
              <ol className="space-y-3 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                <li>
                  リクエストの<strong>構文</strong>は読めるか？　読めなければ{" "}
                  <span className="font-mono text-primary">400</span>。
                </li>
                <li>
                  <strong>本人確認</strong>はできているか？　できていなければ{" "}
                  <span className="font-mono text-primary">401</span>。
                </li>
                <li>
                  本人は分かるが<strong>権限</strong>はあるか？　なければ{" "}
                  <span className="font-mono text-primary">403</span>。
                </li>
                <li>
                  対象の<strong>リソースは存在</strong>するか？　なければ{" "}
                  <span className="font-mono text-primary">404</span>。
                </li>
                <li>
                  構文は正しいが<strong>意味的に不正</strong>
                  か？（バリデーション違反）　{" "}
                  <span className="font-mono text-primary">422</span>。
                </li>
                <li>
                  現在の状態と<strong>競合</strong>
                  するか？（重複・ロック不一致）　{" "}
                  <span className="font-mono text-primary">409</span>。
                </li>
              </ol>
            </div>

            <InfoBox
              type="warning"
              title="401 / 403 / 400 / 422 を混同しない指針"
            >
              この 4 つは原因の層が異なります。
              <strong>401 は「有効な資格情報を欠いている」</strong>、
              <strong>403 は「理解したうえで拒否する」</strong>、
              <strong>400 は「リクエストが読めない（構文エラー）」</strong>、
              <strong>422 は「読めるが内容が不正（バリデーション）」</strong>。
              401 と 403 の典型は「未認証」と「権限不足」ですが、403
              は資格情報と無関係な理由でも返せます（時間帯やソース IP による拒否など）。
              迷ったら「クライアントは何を直せば通るのか」を考えると、
              返すべきコードが見えてきます。
            </InfoBox>
          </section>

          {/* Quiz 2: 400 vs 422 */}
          <section>
            <Quiz
              question="JSON としては妥当だが、必須フィールド email に不正な形式の文字列が入っていた。よりふさわしいコードは？"
              options={[
                { label: "200 OK（とりあえず受理する）" },
                {
                  label:
                    "422 Unprocessable Entity（構文は正しいが意味的に不正なため）",
                  correct: true,
                },
                {
                  label: "401 Unauthorized（フィールドが不正なため認証から）",
                },
                { label: "500 Internal Server Error（処理できないため）" },
              ]}
              explanation="JSON 自体はパースできている＝構文は正しいので 400 ではなく、意味的な不正を表す 422 がより適切です（400 で統一する設計も実在しますが、層の違いを表現するなら 422）。フィールドの形式違反は認証やサーバ障害とは無関係なので 401 / 500 は不適切です。"
            />
          </section>

          {/* 429 / 503 と Retry-After */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              429 / 503 は「いつ再試行できるか」も伝える
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レート制限超過の <strong>429 Too Many Requests</strong> や、
              一時的に処理できない <strong>503 Service Unavailable</strong> は、
              <code>Retry-After</code> ヘッダーを併用すると親切です。
              再試行可能になるまでの秒数、または日時を伝えることで、
              クライアントは無駄な再送を避け、適切な間隔でリトライできます。
            </p>

            <CodeBlock
              language="http"
              title="429 のレスポンス例（Retry-After 付き）"
              code={`HTTP/1.1 429 Too Many Requests
Retry-After: 60
Content-Type: application/json

{
  "title": "リクエストが多すぎます",
  "status": 429,
  "detail": "1 分あたりの上限を超えました。60 秒後に再試行してください。"
}`}
            />

            <InfoBox type="info" title="500 は『何が起きたか』を漏らさない">
              500 Internal Server Error のボディに、スタックトレースや
              内部のファイルパスをそのまま載せないようにします。
              利用者には汎用的なメッセージと相関 ID（後から調査できる識別子）
              だけを返し、詳細はサーバのログに残すのが安全な設計です。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "MDN - HTTP レスポンスステータスコード",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Status",
                  description:
                    "全ステータスコードの一覧と説明。日本語で各コードの意味を確認できる",
                },
                {
                  title: "RFC 9110 - HTTP Semantics (Status Codes)",
                  url: "https://www.rfc-editor.org/info/rfc9110/",
                  description:
                    "HTTP セマンティクスの一次仕様。各ステータスコードの正式な定義",
                },
                {
                  title: "RFC 4918 - 422（旧称 Unprocessable Entity）",
                  url: "https://www.rfc-editor.org/info/rfc4918/",
                  description:
                    "422 が初出した WebDAV 仕様。理由句は RFC 9110 で Unprocessable Content に改称された",
                },
                {
                  title: "RFC 9457 - Problem Details for HTTP APIs",
                  url: "https://www.rfc-editor.org/info/rfc9457/",
                  description:
                    "エラーレスポンスの標準フォーマット。422 / 400 のボディ設計の指針になる",
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
