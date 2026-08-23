import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

// OWASP API Security Top 10（2023年版）の上位リスク。本ページで扱う代表項目を抜粋
const owaspRisks = [
  {
    id: "API1",
    title: "オブジェクトレベル認可不備（BOLA）",
    description:
      "ID を指定するエンドポイントで所有者チェックを怠り、認証済みユーザーが他人のリソースを読み書きできてしまう。OWASP が発生頻度を Widespread と評価し、2023 年版で 1 位に置いている類型。",
  },
  {
    id: "API2",
    title: "認証の不備",
    description:
      "トークン検証の漏れ、弱いパスワードポリシー、JWT の署名未検証など。「誰であるか」の確認が甘い状態。",
  },
  {
    id: "API3",
    title: "オブジェクトプロパティレベルの認可不備",
    description:
      "マスアサインメント（更新不可のはずのフィールドを書き込めてしまう）や、過剰なデータ露出（必要以上の項目をレスポンスに含める）。",
  },
  {
    id: "API4",
    title: "リソース消費の無制限",
    description:
      "レート制限やサイズ上限がなく、大量リクエストや巨大ペイロードでコスト増大・サービス停止を招く。",
  },
  {
    id: "API5",
    title: "機能レベル認可不備",
    description:
      "一般ユーザーが管理者向けエンドポイント（削除・権限変更など）を呼べてしまう。ロールに応じた機能制限の欠落。",
  },
];

export default function Security() {
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
            API セキュリティ設計
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            API
            のセキュリティというと「いかに認証を破られないか」を思い浮かべがちです。
            しかし実際の漏洩で多いのは、認証を突破される攻撃ではなく、
            ログイン済みのユーザーが「自分のもの以外」のデータに触れてしまう
            <strong>認可の不備</strong>です。
            このページでは脅威モデルを最初に押さえ、OWASP API Security Top 10
            を軸に具体的な対策を見ていきます。
          </p>
        </div>

        <WhyNowBox
          tags={["脅威モデル", "認可", "BOLA", "OWASP", "レート制限"]}
          title="脅威モデル TL;DR"
        >
          <p>
            公開 API で最も多い情報漏洩は「認証の突破」ではなく
            <strong>認可の不備</strong>です。
            つまり「ログインはできている正規ユーザー」が、 URL の ID
            を他人のものに書き換えるだけで、
            本来見えてはいけないデータを取得・操作できてしまうケースです。
            <code>{"/orders/1001"}</code> を <code>{"/orders/1002"}</code>
            に変えるだけで他人の注文が見える——これが代表例の
            BOLA（オブジェクトレベル認可不備）です。
            設計の出発点は「認証（誰か）」と「認可（その人がこのリソースに触れてよいか）」を
            別物として扱い、<strong>リソース単位で所有者を毎回検証する</strong>
            ことだと押さえてください。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 認証と認可の分離 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              認証と認可は別の関門
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              セキュリティ設計の土台は、この 2
              つを混同しないことです。認証を通過したからといって、
              そのユーザーがあらゆるリソースに触れてよいわけではありません。
              「正規ユーザーである」ことと「このデータの持ち主である」ことは、
              別々に確認する必要があります。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    認証（Authentication）
                  </p>
                  <p className="text-muted-foreground">
                    「あなたは誰か」を確認する関門。トークンやセッションで本人性を検証する。
                    通過しても、まだ何にアクセスしてよいかは決まっていない。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    認可（Authorization）
                  </p>
                  <p className="text-muted-foreground">
                    「あなたはこの操作・このリソースを許されているか」を確認する関門。
                    リクエストされた個々のオブジェクトに対して毎回チェックする。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="warning" title="認証を通っても認可は別途必要">
              トークンが有効＝何でもしてよい、ではありません。
              認証はゲートを開けるだけで、
              「そのユーザーがその特定のリソースの所有者か」は
              エンドポイントの中でリソース単位に検証する必要があります。
              この検証を省くと、後述する BOLA
              が成立してしまいます。認証ミドルウェアを通しただけで
              「セキュアになった」と思い込むのが最も危険な落とし穴です。
            </InfoBox>
          </section>

          {/* OWASP API Security Top 10 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              OWASP API Security Top 10（2023年版）の要点
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              OWASP は API
              に特化したリスクのランキングを公開しています。上位は一貫して
              「認可」に関する項目が占めます。ここでは設計時に必ず意識したい上位
              5 項目を取り上げます。
            </p>

            <div className="space-y-3">
              {owaspRisks.map((risk) => (
                <div
                  key={risk.id}
                  className="rounded-xl border border-border bg-card p-5 flex gap-4"
                >
                  <div className="shrink-0">
                    <span className="inline-block rounded-md bg-primary/10 text-primary font-bold text-sm px-2.5 py-1">
                      {risk.id}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1 text-base">
                      {risk.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {risk.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="上位はほぼ「認可」">
              2023年版で 1 位の BOLA、3 位のプロパティレベル認可不備、5
              位の機能レベル認可不備は、いずれも「認可」のカテゴリです。 認証（2
              位）も重要ですが、漏洩の現場では
              「認証は通っているのに認可が甘い」パターンが繰り返し報告されています。
              設計レビューではまず認可の網羅性から確認するのが効率的です。
            </InfoBox>
          </section>

          {/* BOLA の悪い例・良い例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              BOLA を防ぐ：所有者チェックの有無
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              BOLA は <code>{"/orders/:id"}</code> のように ID
              を受け取るエンドポイントで起こります。下の悪い例は、認証済みであることだけを確認し、
              「その注文がリクエスト者のものか」を検証していません。
              結果として、ID
              を他人のものに書き換えれば誰の注文でも読めてしまいます。
            </p>

            <CodeBlock
              language="ts"
              title="悪い例：所有者チェックがない（BOLA が成立する）"
              code={`// 認証ミドルウェアで req.user は埋まっている前提
app.get("/orders/:id", requireAuth, async (req, res) => {
  // ID で取得するだけ。「誰の注文か」を確認していない
  const order = await db.orders.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "not_found" });
  }
  // ログイン済みなら他人の注文でもそのまま返してしまう
  return res.json(order);
});`}
            />

            <p className="text-muted-foreground my-6 leading-relaxed">
              良い例では、取得したリソースの所有者 ID とリクエスト者の ID
              を突き合わせ、一致しなければ拒否します。
              他人のリソースの存在有無を推測されないよう、
              アクセス権がない場合は 403 ではなく 404
              を返す設計もよく採られます（存在を隠す方針）。
            </p>

            <CodeBlock
              language="ts"
              title="良い例：リソース単位で所有者を検証する"
              code={`app.get("/orders/:id", requireAuth, async (req, res) => {
  const order = await db.orders.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "not_found" });
  }
  // 所有者チェック：このユーザーの注文でなければ拒否
  if (order.userId !== req.user.id) {
    // 存在自体を漏らさないため 404 を返す方針も有効
    return res.status(404).json({ error: "not_found" });
  }
  return res.json(order);
});`}
            />

            <InfoBox type="error" title="「推測しにくい ID」は対策ではない">
              連番 ID を UUID のような推測しにくい値に変えても、BOLA
              の根本対策にはなりません。ID が漏れる経路（ログ・URL 共有・他 API
              のレスポンス）は多く、
              「当てにくいから安全」は成り立たないからです。
              必ずサーバ側でリソース単位の所有者・権限チェックを行ってください。
            </InfoBox>
          </section>

          {/* Quiz 1: BOLA とは */}
          <section>
            <Quiz
              question="BOLA（オブジェクトレベル認可不備）とは、どのような脆弱性？"
              options={[
                {
                  label:
                    "パスワードが弱く、総当たりでログインを突破されてしまう問題",
                },
                {
                  label:
                    "認証済みユーザーが、URL の ID を他人のものに変えるだけで他人のリソースを取得・操作できてしまう問題",
                  correct: true,
                },
                {
                  label: "レスポンスに余計なフィールドを含めてしまう問題",
                },
                {
                  label: "通信が HTTPS でなく平文で流れてしまう問題",
                },
              ]}
              explanation="BOLA は、ID を受け取るエンドポイントでリソース単位の所有者・権限チェックを省いた結果、認証は通っている正規ユーザーが他人のオブジェクトにアクセスできてしまう脆弱性です。OWASP API Security Top 10 2023 で 1 位に置かれ、発生頻度は Widespread と評価されています。対策はサーバ側でリソースの所有者を毎回検証することです。"
            />
          </section>

          {/* レート制限 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リソース消費を制限する：レート制限と 429
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レート制限がない API
              は、総当たり攻撃・スクレイピング・コスト増大の標的になります。
              上限を超えたリクエストには HTTP ステータス{" "}
              <code>429 Too Many Requests</code>{" "}
              を返し、いつ再試行できるかをヘッダーで伝えるのが標準的な作法です。
              クライアントが行儀よく振る舞えるよう、残り回数や復帰時刻を明示します。
            </p>

            <CodeBlock
              language="http"
              title="レート制限のレスポンスヘッダー（上限超過時）"
              code={`HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 30
RateLimit-Limit: 100
RateLimit-Remaining: 0
RateLimit-Reset: 30

{
  "error": "rate_limited",
  "message": "リクエストが多すぎます。30秒後に再試行してください。"
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>Retry-After</code>{" "}
              は秒数または日時で再試行可能なタイミングを示す標準ヘッダーです。
              <code>RateLimit-*</code>{" "}
              系のヘッダーは上限・残数・リセットまでの時間を伝えるもので、 IETF
              で標準化が進められています。仕様で定義された名称と、
              個々のサービスが独自に使う <code>X-RateLimit-*</code>{" "}
              のような名前が混在するため、利用する API
              のドキュメントで実際のヘッダー名を確認してください。
            </p>
          </section>

          {/* 多層防御の対策一覧 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              対策を多層で重ねる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              単一の対策で守りきることはできません。認可・入力・通信・公開範囲の各レイヤーで、
              それぞれ独立したガードを重ねます。下の表は設計時のチェック項目です。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-2 pr-4 font-bold text-foreground">
                      対策
                    </th>
                    <th className="py-2 font-bold text-foreground">
                      防げる主なリスク
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      リソース単位の所有者チェック
                    </td>
                    <td className="py-2">BOLA / オブジェクト認可不備</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      ロールに応じた機能制限
                    </td>
                    <td className="py-2">機能レベル認可不備</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      入力検証（型・範囲・許可リスト）
                    </td>
                    <td className="py-2">マスアサインメント / 不正入力</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      返すデータの最小化
                    </td>
                    <td className="py-2">過剰なデータ露出</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      レート制限（429 応答）
                    </td>
                    <td className="py-2">リソース消費の無制限 / 総当たり</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      HTTPS 強制
                    </td>
                    <td className="py-2">盗聴 / 中間者攻撃</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      CORS のオリジン制限
                    </td>
                    <td className="py-2">意図しないオリジンからの利用</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-foreground">
                      セキュリティヘッダー付与
                    </td>
                    <td className="py-2">ブラウザ経由の各種攻撃の緩和</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              CORS については、本番で{" "}
              <code>Access-Control-Allow-Origin: *</code>{" "}
              のようにワイルドカードを安易に使うのは避け、
              許可するオリジンを明示的に列挙するのが原則です。
              開発時の利便性でワイルドカードのまま本番に出てしまう事故が起きやすいため、
              環境ごとに設定を分けてください。
            </p>

            <InfoBox type="warning" title="CORS はブラウザだけが強制する">
              CORS はサーバ間のアクセス制御ではなく、
              <strong>ブラウザが強制するセキュリティ機構</strong>です。
              <code>curl</code> やサーバ間通信は CORS を無視するため、
              「curl では通るのに画面（ブラウザ）からは弾かれる」という現象が起きます。
              また <code>http://localhost:3000</code> から{" "}
              <code>http://localhost:8000</code> への通信は、ポートが違うだけで
              <strong>別オリジン</strong>＝CORS の対象です。JSON の POST など
              非単純リクエストでは、本リクエストの前にプリフライト（OPTIONS）が先行します。
              つまり CORS は認可の代わりにはなりません（攻撃者の curl には効きません）。
            </InfoBox>

            <InfoBox type="success" title="返すデータは「必要な分だけ」">
              過剰なデータ露出は、レスポンスに余計な項目を含めることで起こります。
              「とりあえずオブジェクト全体を返す」のではなく、
              そのエンドポイントで本当に必要なフィールドだけを明示的に選んで返します。
              内部
              ID・ハッシュ・他人の個人情報が紛れ込む事故を、設計段階で防げます。
            </InfoBox>
          </section>

          {/* Quiz 2: 認証と認可 */}
          <section>
            <Quiz
              question="認証ミドルウェアでトークンを検証すれば、API のアクセス制御は十分？"
              options={[
                {
                  label:
                    "十分。トークンが有効なら、そのユーザーは全リソースにアクセスしてよい",
                },
                {
                  label:
                    "不十分。認証は「誰か」を確認するだけで、リクエストされた個々のリソースの所有者・権限はエンドポイントごとに別途検証する必要がある",
                  correct: true,
                },
                {
                  label:
                    "不十分。ただし ID を UUID にすれば認可チェックは省略できる",
                },
                {
                  label: "十分。HTTPS を併用していれば認可は不要になる",
                },
              ]}
              explanation="認証（誰か）と認可（その人がこのリソース・操作を許されているか）は別の関門です。認証ミドルウェアを通しただけでは、リクエストされた特定のオブジェクトの所有者チェックは行われません。認可はリソース単位でエンドポイント内に実装する必要があり、これを省くと BOLA が成立します。推測しにくい ID は根本対策にはなりません。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "OWASP API Security Top 10 (2023)",
                  url: "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
                  description:
                    "API に特化した代表的リスクの公式ランキング。BOLA など各項目の解説と対策の一次情報",
                },
                {
                  title: "MDN - CORS（オリジン間リソース共有）",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/CORS",
                  description:
                    "Access-Control-Allow-Origin の挙動と設定方法。ワイルドカードの扱いを正しく理解できる",
                },
                {
                  title: "MDN - HTTP 429 Too Many Requests",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Status/429",
                  description:
                    "レート制限時に返すステータスコードと Retry-After ヘッダーの仕様",
                },
                {
                  title: "OWASP Cheat Sheet - REST Security",
                  url: "https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html",
                  description:
                    "認可・入力検証・HTTPS・セキュリティヘッダーなどの実装指針をまとめたチートシート",
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
