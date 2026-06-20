import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const authMethods = [
  {
    title: "API キー",
    use: "主にサーバ間連携",
    description:
      "リクエストに固定の秘密文字列を添える最も単純な方式。発行・失効が容易な反面、漏れると即座に悪用される。ブラウザに埋め込むと露出するため、サーバ間や CI など露出しない経路で使う。",
  },
  {
    title: "Bearer トークン",
    use: "汎用的なアクセストークン",
    description:
      "Authorization: Bearer <token> ヘッダーで送る。トークンを「持っている者」がアクセスを許される（bearer = 持参人）。中身の形式は問わず、ランダム文字列でも JWT でもよい。",
  },
  {
    title: "JWT",
    use: "自己完結トークン",
    description:
      "署名付きで「誰が・いつまで有効か」を本体に含む。サーバは DB を引かず署名検証だけで検証できる。半面、発行後にサーバ側から個別に失効させにくい。",
  },
  {
    title: "OAuth 2.0 / OIDC",
    use: "第三者への権限委譲",
    description:
      "ユーザーがパスワードを渡さず、特定の権限（スコープ）だけをアプリに委譲する枠組み。OIDC は OAuth 2.0 の上に「認証（ログイン）」の層を足した仕様。",
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
            認証と認可
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            「あなたは誰か」を確かめるのが認証、「あなたに何を許すか」を判断するのが認可です。
            この 2 つは混同されがちですが、別の関心事であり、API
            のセキュリティ設計では両方を分けて扱う必要があります。
            この章では代表的な認証方式と、401 / 403 の使い分け、OpenAPI
            での宣言の仕方までを通して押さえます。
          </p>
        </div>

        <WhyNowBox tags={["認証", "認可", "Bearer", "JWT", "OAuth 2.0"]}>
          <p>
            認証と認可は、言葉が似ているうえに実装上は同じレイヤーで処理されることも多く、
            <strong>設計者の頭の中でも混ざりやすい</strong>領域です。 しかしこの
            2
            つを混同すると、「ログインしているのに他人のデータが見える」「権限がないのに
            401 を返してログイン画面に飛ばしてしまう」といった、
            セキュリティとユーザー体験の両方を損なう事故につながります。
            方式の選定（API キー / Bearer / JWT / OAuth）も、
            「誰を相手にするか」「どこで使うか」で正解が変わります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 認証と認可は別物 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              認証（AuthN）と認可（AuthZ）は別物
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              認証（Authentication,
              AuthN）は「あなたは誰か」を確認する処理です。
              一方、認可（Authorization,
              AuthZ）は「確認できたあなたに、何を許すか」を判断する処理です。
              ログインに成功しても（認証
              OK）、管理者専用ページにアクセスする権限はない（認可
              NG）——という状況は普通に起こります。
              <strong>認証は認可の前提</strong>
              ですが、認証が通れば何でもできるわけではありません。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    認証 / Authentication（AuthN）
                  </p>
                  <p className="text-muted-foreground">
                    「誰か」を確認する。パスワード・トークン・証明書などで本人性を検証する。失敗時は
                    401。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    認可 / Authorization（AuthZ）
                  </p>
                  <p className="text-muted-foreground">
                    確認済みの相手に「何を許すか」を判断する。ロール・スコープ・所有者チェックなど。失敗時は
                    403。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="順序は「認証 → 認可」">
              処理の流れは必ず認証が先で、認可が後です。誰だか分からない相手に対して
              「何を許すか」は判断できません。 実装でも、まずトークンを検証して
              利用者を特定し（認証）、その上で「この利用者はこの操作をしてよいか」
              を確かめる（認可）、という 2 段構えになります。
            </InfoBox>
          </section>

          {/* 認証方式 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              代表的な認証方式
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              認証方式に唯一の正解はなく、「誰を相手にするか」「どこで使うか」で選びます。
              サーバ間だけなら API
              キーで十分なことも多く、エンドユーザーが絡むなら OAuth 2.0 / OIDC
              を検討します。 まずはそれぞれの特徴を整理します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {authMethods.map((method) => (
                <div
                  key={method.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {method.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {method.use}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Authorization ヘッダーの実例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              トークンの送り方（Authorization ヘッダー）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Bearer トークンは <code>Authorization</code> ヘッダーに
              <code>Bearer</code> スキームを付けて送ります。 下は curl
              での例です。トークンは必ずヘッダーに入れ、URL
              のクエリ文字列には入れません。
            </p>

            <CodeBlock
              language="bash"
              title="Authorization ヘッダー付きのリクエスト"
              code={`# Bearer トークンを Authorization ヘッダーに付与する
curl https://api.example.com/v1/me \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \\
  -H "Accept: application/json"

# API キー方式の場合（専用ヘッダーを使うことが多い）
curl https://api.example.com/v1/me \\
  -H "X-API-Key: sk_live_3f9c1a..." \\
  -H "Accept: application/json"`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ここで <code>Bearer</code> は「持参人」の意味で、
              そのトークンを持っている者をアクセス主体とみなす方式を指します。
              だからこそトークンの漏洩は致命的で、HTTPS
              での暗号化が前提になります。
            </p>

            <InfoBox type="warning" title="トークンを URL クエリに入れない">
              <code>?token=...</code> のように URL
              にトークンを載せると、サーバのアクセスログ、ブラウザの履歴、
              リファラ（Referer）ヘッダー、プロキシのログなど、
              <strong>意図しない複数の場所に平文で残ります</strong>。
              トークンは必ずヘッダー（または HTTP-only Cookie）で送ります。
            </InfoBox>
          </section>

          {/* Quiz 1: 認証 vs 認可 */}
          <section>
            <Quiz
              question="「ログインには成功したが、管理者ページは開けなかった」。これはどちらの問題？"
              options={[
                {
                  label: "認証（AuthN）に失敗した",
                },
                {
                  label: "認証は成功し、認可（AuthZ）で権限が足りなかった",
                  correct: true,
                },
                { label: "認証と認可は同じ処理なので区別できない" },
                { label: "どちらでもなく、単なる通信エラー" },
              ]}
              explanation="ログインに成功した時点で「誰か」の確認（認証）は通っています。問題はその先の「このユーザーに管理者ページを許すか」という判断、つまり認可です。認証が通っても認可で弾かれることはあり、この 2 つは別物として扱う必要があります。"
            />
          </section>

          {/* JWT と失効 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              JWT と「失効しにくい」という弱点
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JWT（JSON Web Token, RFC
              7519）は、利用者の情報と有効期限を本体に含み、
              署名で改ざんを検出できる自己完結型のトークンです。 サーバは DB
              を引かずに署名検証だけで「正当なトークンか」を判断できるため、
              スケールしやすいのが利点です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ただし<strong>仕様上の利点が、運用上の弱点にもなります</strong>。
              「サーバが状態を持たずに検証できる」ということは、裏を返せば
              「一度発行したトークンを、有効期限が来る前にサーバ側から個別に無効化しにくい」
              ということです。
              ログアウトや権限剥奪を即座に反映するのが難しくなります。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <p className="font-bold text-foreground mb-3 text-sm">
                実務での緩和策
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li>
                  ・<strong>アクセストークンの有効期限を短くする</strong>
                  （数分〜十数分）。失効できなくても、すぐ期限切れになる
                </li>
                <li>
                  ・<strong>リフレッシュトークン</strong>
                  を併用し、期限切れ時に再発行する。リフレッシュ側はサーバで管理して失効可能にする
                </li>
                <li>
                  ・即時失効が必須なら、失効リスト（ブロックリスト）を持つか、
                  そもそも DB 参照型の不透明トークンを選ぶ
                </li>
              </ul>
            </div>

            <InfoBox type="warning" title="「失効できる」と思い込まない">
              JWT の有効期限を「1 日」「1 週間」と長くしたまま運用すると、
              漏洩したトークンや権限剥奪したはずのユーザーが、
              その期間ずっと有効なままになります。 JWT
              を採用するなら「アクセストークンは短命 +
              リフレッシュトークンで補う」
              をセットで設計するのが現実的な落とし所です。
            </InfoBox>
          </section>

          {/* 401 vs 403 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              401（未認証）と 403（権限なし）の使い分け
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              認証と認可が別物である以上、エラーの返し方も分けます。 HTTP
              では認証の失敗に 401、認可の失敗に 403 を割り当てるのが基本です。
              この使い分けはクライアントの挙動を左右します。 401
              ならログイン（再認証）を促し、403
              なら「権限がない」と伝えるのが自然な対応だからです。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground">
                      ステータス
                    </th>
                    <th className="text-left py-2 pr-4 font-bold text-foreground">
                      意味
                    </th>
                    <th className="text-left py-2 font-bold text-foreground">
                      想定する状況
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-mono text-primary">401</td>
                    <td className="py-2 pr-4">Unauthorized（未認証）</td>
                    <td className="py-2">
                      トークンが無い・無効・期限切れ。「誰か」が確認できていない
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-primary">403</td>
                    <td className="py-2 pr-4">Forbidden（権限なし）</td>
                    <td className="py-2">
                      認証は済んでいるが、その操作を許可されていない
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              名前のねじれに注意してください。401 の英語表記は
              <code>Unauthorized</code> ですが、実際には
              <strong>「認証されていない（未認証）」</strong>を意味します。
              認可（Authorization）の失敗はむしろ 403 <code>Forbidden</code>{" "}
              側です。 仕様上の名前と実際の役割がずれている代表例なので、 「401
              = 未認証 / 403 = 認証済みだが権限なし」と覚え直すのが安全です。
            </p>

            <InfoBox type="warning" title="WWW-Authenticate は自動では付かない">
              RFC 7235 は 401 応答に <code>WWW-Authenticate</code>{" "}
              ヘッダー（どの認証方式が必要かを示す）を付けるべき（SHOULD）と
              定めています。しかし多くのフレームワークは既定で付与しません。
              たとえば FastAPI の <code>HTTPException(401)</code> は{" "}
              <code>WWW-Authenticate</code> を自動付与しないため、{" "}
              <code>{'headers={"WWW-Authenticate": "Bearer"}'}</code>{" "}
              のように手動で指定します。ここでも「仕様が求める姿」と
              「フレームワークの既定」を分けて確認するのが安全です。
            </InfoBox>

            <InfoBox type="info" title="存在を隠したい時は 404 も選択肢">
              「その人にとって存在自体を知られたくないリソース」では、403
              の代わりに 404 を返す設計もあります。403
              は「存在するが触れない」と示唆してしまうためです。 ただし API
              の一貫性を損なうので、採用するならポリシーとして統一します。
            </InfoBox>
          </section>

          {/* OpenAPI での宣言 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              OpenAPI で認証を宣言する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              OpenAPI では、認証方式を <code>components.securitySchemes</code>{" "}
              で定義し、 <code>security</code>{" "}
              で「どのエンドポイントにどの方式を適用するか」を宣言します。
              これにより、認証の要件が機械可読な契約として明文化され、
              ドキュメント生成やクライアント生成にも反映されます。
            </p>

            <CodeBlock
              language="yaml"
              title="securitySchemes の定義（Bearer / JWT・OAuth 2.0・API キー）"
              code={`components:
  securitySchemes:
    # Bearer トークン（中身が JWT であることを bearerFormat で明示）
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

    # OAuth 2.0（認可コードフロー + スコープ）
    oauth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://auth.example.com/authorize
          tokenUrl: https://auth.example.com/token
          scopes:
            read:users: ユーザー情報の読み取り
            write:users: ユーザー情報の更新

    # API キー（専用ヘッダー）
    apiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key

# 全エンドポイントの既定として Bearer を要求
security:
  - bearerAuth: []`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>security</code>{" "}
              はトップレベルにも、各オペレーション単位にも書けます。
              オペレーション側で <code>security: []</code>{" "}
              と空配列を指定すれば、そのエンドポイントだけ認証不要にできます
              （公開エンドポイントの宣言）。
            </p>
          </section>

          {/* Quiz 2: 401 vs 403 */}
          <section>
            <Quiz
              question="認証は通っているが、その操作の権限を持たない利用者に返すべきステータスは？"
              options={[
                { label: "401 Unauthorized" },
                { label: "403 Forbidden", correct: true },
                { label: "400 Bad Request" },
                { label: "500 Internal Server Error" },
              ]}
              explanation="認証済み（誰かは分かっている）だが操作を許可されていない場合は 403 Forbidden です。401 Unauthorized は名前に反して「未認証」を意味し、トークンが無い・無効・期限切れのときに返します。「401 = 未認証 / 403 = 認証済みだが権限なし」と区別します。"
            />
          </section>

          {/* 鉄則 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              実装で外せない鉄則
            </h2>
            <div className="rounded-xl border border-border bg-card p-5">
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <li>
                  ・<strong>必ず HTTPS を使う。</strong>
                  トークンや API キーは平文の機密情報。HTTP では盗聴され、Bearer
                  方式は「持っている者勝ち」なので即座に悪用される
                </li>
                <li>
                  ・<strong>トークンを URL クエリに入れない。</strong>
                  ログ・履歴・リファラ・プロキシに平文で残る。必ずヘッダーか
                  HTTP-only Cookie で送る
                </li>
                <li>
                  ・<strong>認証と認可を分けて実装する。</strong>
                  トークン検証（認証）と権限チェック（認可）を別の処理として書き、401
                  と 403 を正しく返し分ける
                </li>
                <li>
                  ・<strong>アクセストークンは短命にする。</strong>
                  失効しにくい JWT
                  ほど有効期限を短く保ち、リフレッシュトークンで補う
                </li>
              </ul>
            </div>

            <InfoBox type="success" title="まとめ">
              認証（誰か）と認可（何を許すか）を分けて考え、方式は相手と用途で選ぶ。
              トークンはヘッダーで HTTPS 越しに送り、401 / 403
              を正しく返し分ける。JWT
              を使うなら短い有効期限とリフレッシュトークンをセットで設計する——
              これが API のアクセス制御を堅牢に保つための土台になります。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "RFC 6750 - OAuth 2.0 Bearer Token Usage",
                  url: "https://datatracker.ietf.org/doc/html/rfc6750",
                  description:
                    "Authorization: Bearer ヘッダーの仕様。トークンの送り方と扱いの注意点を定義",
                },
                {
                  title: "RFC 7519 - JSON Web Token (JWT)",
                  url: "https://datatracker.ietf.org/doc/html/rfc7519",
                  description:
                    "JWT の構造（ヘッダー・ペイロード・署名）と検証ルールを定めた仕様",
                },
                {
                  title: "OpenAPI Specification - Authentication",
                  url: "https://swagger.io/docs/specification/v3_0/authentication/",
                  description:
                    "securitySchemes と security による認証宣言の書き方を解説した公式ドキュメント",
                },
                {
                  title: "MDN - HTTP 認証",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/Authentication",
                  description:
                    "Authorization ヘッダーと 401 / WWW-Authenticate の仕組みを日本語で解説",
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
