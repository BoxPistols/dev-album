import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const sessionVsJwt = [
  {
    point: "状態の持ち方",
    session: "サーバー側にセッション情報を保持。Cookie には ID だけ",
    jwt: "トークン自体に情報を含む。サーバーは状態を持たない",
  },
  {
    point: "失効",
    session: "サーバー側で削除すれば即座に無効化できる",
    jwt: "発行後は有効期限まで使える。即時失効には別の仕組みが要る",
  },
  {
    point: "スケール",
    session: "セッションストアの共有が必要",
    jwt: "検証は鍵だけで完結し、サーバー間で共有が要らない",
  },
  {
    point: "向く場面",
    session: "単一サービスや古典的な Web アプリ",
    jwt: "サービス間連携やステートレスな API",
  },
];

export default function Auth() {
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
            認証・認可とシークレット管理
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            認証（誰か）と認可（何をしてよいか）は別の問いです。BFF
            を境界として扱うと、セッションやトークン、Cookie
            の属性、シークレットの置き場所をどう設計するかが定まります。
            このページでは認証と認可の違いから、セッションと JWT の比較、
            HttpOnly Cookie や OAuth2 / OIDC の概観、CSRF
            までを一通り整理します。
          </p>
        </div>

        <WhyNowBox tags={["認証", "認可", "JWT", "Cookie", "OAuth2", "CSRF"]}>
          <p>
            フロントエンドからログインを実装すると、「トークンをどこに保存するか」で
            必ず迷います。便利だからと localStorage に置くと、XSS
            の隙間からトークンが盗まれる経路を自分で開けてしまいます。
            認証情報は「ブラウザの JavaScript
            から触れない場所」に置くのが原則で、 BFF と HttpOnly Cookie
            を組み合わせると、その原則を素直に実装できます。
            設計の勘所を先に押さえておくと、後から作り直す手戻りを避けられます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 認証と認可の違い */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              認証と認可は別の問い
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              認証（Authentication）は「あなたは誰か」を確かめることです。
              認可（Authorization）は「あなたはこの操作をしてよいか」を判断することです。
              ログインで本人確認するのが認証、ログイン後に
              「この記事を編集できるか」を判定するのが認可です。 この 2
              つを混同すると、ログインさえ通れば何でもできてしまう、
              といった穴が生まれます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  認証（Authentication）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ユーザーが本人であることを確認する。パスワード・OTP・パスキーなどで「誰か」を特定する。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  認可（Authorization）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  確認済みの相手が、どのリソースに・どの操作をしてよいかを判定する。ロールや権限で「何をしてよいか」を決める。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="順番がある">
              認可は認証の後に来ます。まず「誰か」を確定してから、その人の権限を判定します。
              認証を通したことと、操作を許可したことは別物だと意識すると、権限チェックの抜けに気づきやすくなります。
            </InfoBox>
          </section>

          {/* セッション vs JWT */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              セッション vs JWT
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              認証が通った後、「ログイン状態」をどう保つかには 2
              つの代表的な方法があります。サーバー側に状態を持つセッション方式と、
              トークン自体に情報を含める JWT
              方式です。どちらが良いという話ではなく、失効のしやすさと
              スケールのしやすさのどちらを取るかで選びます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground">
                      観点
                    </th>
                    <th className="text-left py-2 pr-4 font-bold text-foreground">
                      セッション
                    </th>
                    <th className="text-left py-2 font-bold text-foreground">
                      JWT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sessionVsJwt.map((row) => (
                    <tr key={row.point} className="border-b border-border">
                      <td className="py-2 pr-4 font-medium text-foreground align-top">
                        {row.point}
                      </td>
                      <td className="py-2 pr-4 text-muted-foreground align-top">
                        {row.session}
                      </td>
                      <td className="py-2 text-muted-foreground align-top">
                        {row.jwt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              JWT は「サーバーが状態を持たない」点が利点ですが、その裏返しとして
              <strong>発行後の即時失効が難しい</strong>
              という弱点があります。仕様では有効期限まで有効ですが、実測では
              「ログアウトしたのにトークンがまだ通る」事故が起きがちです。理由は、
              トークンを検証するだけのサーバーは失効リストを参照しないからです。
              短い有効期限とリフレッシュトークン、あるいは失効リストの併用で補います。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="認証（Authentication）と認可（Authorization）の違いとして正しいのはどれ？"
              options={[
                { label: "認証は速度、認可は安全性を指す" },
                {
                  label:
                    "認証は「誰か」を確認すること、認可は「何をしてよいか」を判定すること",
                  correct: true,
                },
                {
                  label:
                    "認証はサーバー側、認可はクライアント側で行う処理のこと",
                },
                { label: "両者は同じ意味で、呼び方が違うだけ" },
              ]}
              explanation="認証は本人確認（あなたは誰か）、認可は権限判定（あなたはこの操作をしてよいか）です。認可は認証の後に行います。ログインを通したことと、特定の操作を許可したことは別の判断です。"
            />
          </section>

          {/* Cookie と HttpOnly */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Cookie 属性と「トークンを JS に置かない」原則
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              認証情報の保存先として推奨されるのは、適切な属性を付けた Cookie
              です。ブラウザの JavaScript
              から読めない場所にトークンを置くことで、XSS
              でスクリプトが走っても認証情報を直接持ち出されにくくします。鍵になるのが次の
              3 つの属性です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  HttpOnly
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  JavaScript からアクセス不可にする。document.cookie
                  に出ないため XSS で読み取られにくい。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Secure
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  HTTPS の通信でのみ送信する。平文の経路に Cookie
                  が乗らないようにする。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  SameSite
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  別サイトからのリクエストへの送信を制限する。Lax / Strict で
                  CSRF を緩和する。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              BFF を使うと、この設計が素直に書けます。ブラウザは BFF
              にログイン要求を送り、BFF が外部の認証サービスとやり取りして、
              結果を HttpOnly Cookie
              としてブラウザに渡します。アクセストークンそのものは BFF
              が保持し、ブラウザの JavaScript には渡しません。
            </p>

            <CodeBlock
              language="ts"
              title="app/api/login/route.ts — HttpOnly Cookie をセットする"
              code={`import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // 外部の認証サービスへ問い合わせ（アクセストークンは BFF が保持）
  const res = await fetch("https://auth.internal/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
  }

  const { sessionToken } = await res.json();
  const response = NextResponse.json({ ok: true });

  // ブラウザの JS からは読めない Cookie として返す
  response.cookies.set("session", sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 時間
  });

  return response;
}`}
            />

            <InfoBox type="warning" title="localStorage にトークンを置かない">
              localStorage や sessionStorage は JavaScript
              から自由に読めるため、XSS が成立すると中身を丸ごと持ち出されます。
              認証トークンは HttpOnly Cookie に置くか、BFF
              が保持して直接はクライアントに渡さない設計にします。
            </InfoBox>
          </section>

          {/* OAuth2 / OIDC */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              OAuth2 / OpenID Connect の概観
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「Google でログイン」のような外部サービス連携を支えるのが OAuth2
              と OpenID
              Connect（OIDC）です。役割が違うので、まず分けて捉えます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  OAuth2 ＝ 認可の仕組み
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ユーザーの許可のもと、アプリが外部リソースへアクセスする「権限の委譲」を扱う。アクセストークンを発行する。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  OIDC ＝ 認証の上乗せ
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  OAuth2 の上に「誰がログインしたか」を載せる層。ID
                  トークン（JWT）でユーザーの身元を伝える。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              フロントエンドで重要なのは、これらのフローで得たアクセストークンを
              <strong>ブラウザの JavaScript に置かない</strong>
              ことです。トークンの受け取りと保持を BFF
              側で行い、ブラウザにはセッション用の HttpOnly Cookie
              だけを返すと、トークンが XSS の射程から外れます。
            </p>

            <InfoBox type="info" title="BFF パターンが推奨される理由">
              SPA に直接トークンを渡す構成より、BFF
              がトークンを保持してフロントには Cookie
              を返す構成が、近年のブラウザ向けアプリでは安全側の選択として広く推奨されています。
            </InfoBox>
          </section>

          {/* シークレット管理と CSRF */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              環境変数によるシークレット管理と CSRF
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              API キーや署名鍵などのシークレットは、コードに直接書かず、
              サーバー側の環境変数やシークレットマネージャから読み込みます。
              リポジトリにコミットしてしまうと、たとえ後から消しても Git
              の履歴に残るため、漏洩したものとして鍵の再発行が必要になります。
              <code>.env</code> は <code>.gitignore</code>{" "}
              に入れ、フロントに露出させてよい値とサーバー専用の値を分けて扱います。
            </p>

            <CodeBlock
              language="bash"
              title=".env（コミットしない。サーバー側でだけ読む）"
              code={`# サーバー専用。ブラウザには渡さない
SERVICE_API_KEY=sk_live_xxxxxxxxxxxx
SESSION_SECRET=change_me_to_a_long_random_value

# Next.js で NEXT_PUBLIC_ を付けた値だけがブラウザに露出する
# 秘密には絶対に付けない`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              CSRF（クロスサイトリクエストフォージェリ）は、ログイン中のユーザーの
              ブラウザに、本人の意図しないリクエストを別サイトから送らせる攻撃です。
              Cookie が自動送信される性質を悪用します。対策の基本は、Cookie の
              <code>SameSite</code> 属性（Lax / Strict）と、状態を変える操作への
              CSRF トークンの併用です。
            </p>

            <InfoBox type="warning" title="SameSite だけに頼りきらない">
              SameSite=Lax は多くの CSRF
              を防ぎますが、すべてを塞ぐわけではありません。GET
              で副作用のある処理を作らない、状態変更には CSRF
              トークンを併用する、といった基本も合わせて守ると堅くなります。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="ブラウザ向けアプリで認証トークンを保存する場所として、最も安全側の選択はどれ？"
              options={[
                { label: "localStorage に JSON 文字列として保存する" },
                {
                  label:
                    "HttpOnly / Secure / SameSite を付けた Cookie に置く（またはトークンは BFF が保持する）",
                  correct: true,
                },
                { label: "グローバル変数に入れてメモリで持ち回す" },
                { label: "URL のハッシュフラグメントに付ける" },
              ]}
              explanation="localStorage は JavaScript から読めるため XSS で持ち出されます。HttpOnly Cookie は JS からアクセスできず、Secure で HTTPS 限定、SameSite で CSRF を緩和できます。BFF がトークンを保持してフロントには Cookie だけ返す構成が、近年広く推奨されます。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "MDN - Set-Cookie",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Set-Cookie",
                  description:
                    "HttpOnly / Secure / SameSite など Cookie 属性の正確な定義",
                },
                {
                  title:
                    "OWASP - Cross-Site Request Forgery Prevention Cheat Sheet",
                  url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html",
                  description:
                    "CSRF 対策の実務的なチェックシート。SameSite とトークンの併用を解説",
                },
                {
                  title: "OAuth 2.0",
                  url: "https://oauth.net/2/",
                  description:
                    "OAuth2 の仕様とフローの公式入口。認可フレームワークの一次情報",
                },
                {
                  title: "OpenID Connect",
                  url: "https://openid.net/developers/how-connect-works/",
                  description:
                    "OIDC が OAuth2 にどう認証を載せるかを示す公式解説",
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
