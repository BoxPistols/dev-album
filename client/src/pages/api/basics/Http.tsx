import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

// 主要ヘッダーの早見表。役割と方向（リクエスト/レスポンス）を併記する
const headers = [
  {
    name: "Content-Type",
    direction: "両方",
    role: "ボディのデータ形式を伝える",
    example: "application/json",
  },
  {
    name: "Accept",
    direction: "リクエスト",
    role: "クライアントが受け取りたい形式を伝える",
    example: "application/json",
  },
  {
    name: "Authorization",
    direction: "リクエスト",
    role: "認証情報（トークン等）を渡す",
    example: "Bearer eyJhbGci...",
  },
  {
    name: "Cache-Control",
    direction: "両方",
    role: "キャッシュの可否と寿命を指示する",
    example: "no-store / max-age=3600",
  },
];

// curl の代表的なフラグ。観察に使うものを絞る
const curlFlags = [
  { flag: "-i", role: "レスポンスのヘッダーも表示する" },
  { flag: "-X", role: "HTTP メソッドを指定する（GET/POST/PUT/DELETE 等）" },
  { flag: "-H", role: "リクエストヘッダーを追加する" },
  {
    flag: "-d",
    role: "リクエストボディを送る（指定すると既定で POST になる）",
  },
];

export default function Http() {
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
            HTTP の基礎
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Web API はほぼすべて HTTP の上に成り立っています。HTTP は
            「クライアントがリクエストを送り、サーバがレスポンスを返す」
            というシンプルな往復のプロトコルです。この章では、リクエストとレスポンスの構造、
            よく使うヘッダー、ステートレスという性質、そして HTTPS と curl
            での観察方法を押さえます。次章の認証は、ここで学ぶ
            「毎回情報を送る」という前提の上に組み立てられます。
          </p>
        </div>

        <WhyNowBox
          tags={["HTTP", "リクエスト", "レスポンス", "ステートレス", "HTTPS"]}
        >
          <p>
            フレームワークが <code>fetch</code> や axios
            を用意してくれるので、HTTP を意識せずに開発できる場面は多いです。
            しかし API を<strong>設計・デバッグ</strong>する側に回ると、生の
            HTTP が読めるかどうかで効率が大きく変わります。 「なぜ 401
            が返るのか」 「Content-Type を付け忘れていないか」
            といった問題は、リクエストとレスポンスの中身を直接見れば一目で分かります。
            HTTP はブラックボックスではなく、テキストで読める単純な構造です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* リクエスト/レスポンスの全体像 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              HTTP は「往復」でできている
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              HTTP のやり取りは、クライアントが送る<strong>リクエスト</strong>
              と、 サーバが返す<strong>レスポンス</strong>の 1
              往復が基本単位です。 どちらも「1 行目（開始行）＋ ヘッダー群 ＋
              空行 ＋ ボディ」 という共通の形を持ちます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-2">
                    リクエスト（クライアント → サーバ）
                  </p>
                  <ul className="text-muted-foreground space-y-1 leading-relaxed">
                    <li>
                      <strong>1行目</strong>: メソッド ＋ パス ＋ HTTP
                      バージョン
                    </li>
                    <li>
                      <strong>ヘッダー</strong>: 付帯情報（型・認証など）
                    </li>
                    <li>
                      <strong>ボディ</strong>: 送るデータ（GET では通常なし）
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-2">
                    レスポンス（サーバ → クライアント）
                  </p>
                  <ul className="text-muted-foreground space-y-1 leading-relaxed">
                    <li>
                      <strong>1行目</strong>: HTTP バージョン ＋
                      ステータスコード
                    </li>
                    <li>
                      <strong>ヘッダー</strong>: 付帯情報（型・キャッシュなど）
                    </li>
                    <li>
                      <strong>ボディ</strong>: 返すデータ（JSON など）
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="ヘッダーとボディは空行で区切られる">
              リクエストもレスポンスも、ヘッダー群の直後に空行が 1
              つ入り、そこからがボディです。 この区切りは HTTP の構文として RFC
              9110 / 9112 系で定義されています。 生のメッセージを読むときは、
              まず空行を探すとヘッダーとボディの境界がすぐ分かります。
            </InfoBox>
          </section>

          {/* 生のリクエスト/レスポンス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              生の HTTP メッセージを読む
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              下はユーザーを 1 件作成する POST
              リクエストと、その成功レスポンスです。
              普段ライブラリが隠している中身を、 テキストとして見てみます。
            </p>

            <CodeBlock
              language="http"
              title="リクエスト"
              code={`POST /v1/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1Ni

{
  "name": "田中 花子",
  "email": "hanako@example.com"
}`}
            />

            <CodeBlock
              language="http"
              title="レスポンス"
              code={`HTTP/1.1 201 Created
Content-Type: application/json
Cache-Control: no-store
Location: /v1/users/42

{
  "id": 42,
  "name": "田中 花子",
  "email": "hanako@example.com",
  "createdAt": "2026-06-20T09:00:00Z"
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              リクエストの 1 行目 <code>POST /v1/users HTTP/1.1</code> が
              「何を・どこに・どのプロトコルで」を表し、レスポンスの 1 行目
              <code>HTTP/1.1 201 Created</code> が結果のステータスを表します。
              ステータスコードは大まかに、2xx が成功、4xx
              がクライアント側の誤り、5xx
              がサーバ側の誤り、という意味の範囲に分かれます。
            </p>
          </section>

          {/* 主要ヘッダー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              押さえるべき主要ヘッダー
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ヘッダーは数多くありますが、API を扱ううえで頻出する 4
              つをまず覚えれば十分です。 とくに <code>Content-Type</code> と{" "}
              <code>Accept</code> は混同しやすいので、
              「送るデータの型」と「欲しいデータの型」と整理しておきます。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-bold text-foreground">
                      ヘッダー
                    </th>
                    <th className="px-4 py-3 font-bold text-foreground">
                      方向
                    </th>
                    <th className="px-4 py-3 font-bold text-foreground">
                      役割
                    </th>
                    <th className="px-4 py-3 font-bold text-foreground">例</th>
                  </tr>
                </thead>
                <tbody>
                  {headers.map((h) => (
                    <tr key={h.name} className="border-t border-border">
                      <td className="px-4 py-3 font-mono text-primary">
                        {h.name}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {h.direction}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {h.role}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {h.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox
              type="warning"
              title="Content-Type の付け忘れは典型的なバグ"
            >
              JSON ボディを送るのに <code>Content-Type: application/json</code>{" "}
              を付け忘れると、サーバが本文を正しくパースできず、400
              系のエラーになることがあります。
              ライブラリによっては自動付与されますが、生の <code>fetch</code> や
              curl
              では明示が必要です。送ったのに弾かれるときは、まずこのヘッダーを疑います。
            </InfoBox>
          </section>

          {/* ステートレス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              HTTP はステートレス
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              HTTP は<strong>ステートレス</strong>なプロトコルです。
              つまり、サーバは前のリクエストの記憶を持ちません。各リクエストは独立しており、
              「さっきログインした人」という文脈はサーバ側に自動では残らない、という性質です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              この性質の直接の帰結が、「認証情報を毎回送る必要がある」という点です。
              一度ログインしても、次のリクエストでは誰なのか分からないため、
              トークンなどの本人確認情報を<strong>リクエストごとに</strong>{" "}
              <code>Authorization</code>{" "}
              ヘッダーに乗せて送ります。次章の認証は、この前提の上に成り立っています。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <p className="text-sm font-bold text-foreground mb-3">
                仕様と実測のギャップ
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                HTTP プロトコル自体は仕様としてステートレスですが、実際の Web
                アプリは「ログイン状態」を保っているように見えます。これは HTTP
                が状態を持つようになったのではなく、Cookie やトークンといった
                <strong>状態を毎回運ぶ仕組み</strong>
                をアプリ層で足しているからです。プロトコルはステートレスのまま、
                状態は外側で管理している、と分けて捉えると混乱しません。
              </p>
            </div>

            <InfoBox type="info" title="だからトークンは毎回送る">
              ステートレスゆえに、サーバは「このリクエストが誰のものか」を
              そのリクエスト単体から判断する必要があります。 だから API
              では、ログイン時に受け取ったトークンを{" "}
              <code>Authorization: Bearer ...</code>{" "}
              として毎回付与します。サーバ側にログインセッションを溜め込まない設計は、
              スケールさせやすい一方で、毎回の検証コストと引き換えになります。
            </InfoBox>
          </section>

          {/* Quiz 1: ステートレス */}
          <section>
            <Quiz
              question="HTTP が「ステートレス」であるとは、どういう意味？"
              options={[
                { label: "サーバが一度に 1 リクエストしか処理できないこと" },
                {
                  label:
                    "各リクエストが独立していて、サーバが前のリクエストの状態を保持しないこと",
                  correct: true,
                },
                { label: "レスポンスにステータスコードが必ず含まれること" },
                { label: "通信が必ず暗号化されていること" },
              ]}
              explanation="ステートレスとは、サーバがクライアントのセッション状態を自動では保持しない性質です。各リクエストは独立しているため、認証情報などの文脈はクライアントが毎回リクエストに含めて送る必要があります。これが「トークンを毎回送る」設計の理由です。"
            />
          </section>

          {/* HTTPS */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              HTTPS で通信を保護する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              HTTPS は、HTTP のやり取りを <strong>TLS</strong>{" "}
              で暗号化したものです。 平文の HTTP
              では、リクエストやレスポンスの中身が経路上で読まれたり
              書き換えられたりする可能性があります。とくに{" "}
              <code>Authorization</code>{" "}
              ヘッダーでトークンを毎回送る設計では、暗号化は前提条件です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              本番の Web API は HTTPS が事実上必須です。ローカル開発では{" "}
              <code>http://localhost</code>{" "}
              を使うことが多いですが、外部に公開する API を平文の HTTP
              で運用するのは避けます。 ブラウザの多くの機能（Service Worker
              など）も、安全なオリジン（HTTPS または
              localhost）でしか動きません。
            </p>

            <InfoBox type="success" title="localhost は例外的に安全扱い">
              ブラウザは <code>http://localhost</code>{" "}
              を「安全なコンテキスト」として扱います。
              そのため、ローカル開発では HTTPS
              を立てなくても多くの機能が動きます。 ただし本番ドメインで{" "}
              <code>http://</code>{" "}
              にすると安全なコンテキストから外れ、制限される機能があります。
            </InfoBox>
          </section>

          {/* curl で観察 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              curl で HTTP を観察する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ブラウザの DevTools でも通信は見られますが、curl はリクエストを 1
              行で再現でき、共有もしやすいので、API のデバッグに向いています。
              まず覚えるフラグは 4 つです。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-bold text-foreground">
                      フラグ
                    </th>
                    <th className="px-4 py-3 font-bold text-foreground">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {curlFlags.map((f) => (
                    <tr key={f.flag} className="border-t border-border">
                      <td className="px-4 py-3 font-mono text-primary">
                        {f.flag}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {f.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="bash"
              title="POST でユーザーを作成し、レスポンスヘッダーも表示する"
              code={`curl -i -X POST https://api.example.com/v1/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1Ni" \\
  -d '{"name":"田中 花子","email":"hanako@example.com"}'`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              <code>-i</code>{" "}
              を付けると、レスポンスのステータスラインとヘッダーが本文の前に表示されます。
              認証エラーやキャッシュ挙動を調べるときは、ボディだけでなくヘッダーを見ることが重要です。
              出力はおおよそ次のようになります。
            </p>

            <CodeBlock
              language="http"
              title="curl -i の出力（レスポンス部分）"
              code={`HTTP/1.1 201 Created
Content-Type: application/json
Cache-Control: no-store
Location: /v1/users/42

{"id":42,"name":"田中 花子","email":"hanako@example.com"}`}
            />

            <InfoBox type="info" title="-d を付けると既定で POST になる">
              curl は <code>-d</code> でボディを渡すと、メソッドを明示しなくても
              POST として送ります。 GET 以外を試すときや、はっきりさせたいときは{" "}
              <code>-X</code>{" "}
              でメソッドを明示すると、コマンドの意図が読みやすくなります。
            </InfoBox>
          </section>

          {/* Quiz 2: ヘッダーの使い分け */}
          <section>
            <Quiz
              question="JSON ボディを送る POST で、ボディの形式をサーバに伝えるヘッダーはどれ？"
              options={[
                { label: "Accept: application/json" },
                { label: "Content-Type: application/json", correct: true },
                { label: "Authorization: Bearer ..." },
                { label: "Cache-Control: no-store" },
              ]}
              explanation="Content-Type は「いま送っているボディの形式」を伝えるヘッダーです。Accept は逆に「受け取りたい形式」を伝えるもので、混同しやすい点です。JSON を送るときに Content-Type を付け忘れると、サーバが本文を正しく解釈できず 400 系のエラーになることがあります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "MDN - HTTP の概要",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Overview",
                  description:
                    "リクエスト/レスポンスの構造とヘッダーを図解付きで解説した入門ドキュメント",
                },
                {
                  title: "MDN - HTTP ヘッダー リファレンス",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Headers",
                  description:
                    "Content-Type・Accept・Authorization など各ヘッダーの詳細仕様",
                },
                {
                  title: "MDN - HTTP レスポンスステータスコード",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Status",
                  description: "2xx/4xx/5xx などステータスコードの意味の一覧",
                },
                {
                  title: "RFC 9110 - HTTP Semantics",
                  url: "https://www.rfc-editor.org/rfc/rfc9110",
                  description:
                    "メソッド・ステータス・ヘッダーの意味を定義する HTTP の中核仕様（英語）",
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
