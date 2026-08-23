import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const designDecisions = [
  {
    title: "命名規則",
    choice: "camelCase か snake_case",
    description:
      "createdAt か created_at か。どちらでも動くが、API 全体で 1 つに統一する。混在が最悪のパターン。",
  },
  {
    title: "エンベロープ",
    choice: "包む か 生で返す",
    description:
      "{ data, meta } で包むか、リソースを直接返すか。賛否あるが、決めたら全エンドポイントで揃える。",
  },
  {
    title: "日時形式",
    choice: "ISO 8601 / RFC 3339",
    description:
      "UTC + 末尾 Z で統一する。タイムゾーン省略やエポック秒の混在は事故のもと。",
  },
  {
    title: "null と省略",
    choice: "null を返す か キーごと省く",
    description:
      "値がないとき null を入れるか、そのキー自体を出さないか。方針を決めてドキュメントに書く。",
  },
];

export default function RequestResponse() {
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
            リクエスト / レスポンス設計
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            URL とメソッドが「どのリソースをどう操作するか」を決めるのに対し、
            ボディは「実際にやり取りするデータの形」を決めます。
            ここで一貫性を欠くと、利用側はエンドポイントごとに違う読み方を強いられます。
            このページでは、リクエスト / レスポンスのボディをどう設計すれば、
            利用側が迷わず安定して使えるかを整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["JSON", "命名規則", "エンベロープ", "ISO 8601", "一貫性"]}
        >
          <p>
            個々のエンドポイントは、単体で見れば「とりあえず動く
            JSON」を返せます。 問題は API <strong>全体</strong>を 1
            つのものとして見たときです。 あるエンドポイントは{" "}
            <code>createdAt</code>、別では <code>created_at</code>、日時は片方が{" "}
            <code>Z</code> 付き、片方が
            タイムゾーンなし——こうした「局所最適の寄せ集め」は、
            利用側のコードを if 分岐だらけにし、バグの温床になります。
            設計で効くのは、個々の正しさより
            <strong>API 全体での一貫性</strong>です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* リクエストボディの基本 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リクエストボディの基本
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              データを送る POST / PUT / PATCH では、ボディの形式を
              Content-Type ヘッダーで宣言します。JSON で送るなら{" "}
              <code>Content-Type: application/json</code> を付けて「中身は JSON
              だ」と伝えます。
              サーバはこのヘッダーを見てパース方法を決めます。RFC 9110 は、
              Content-Type が無いときの扱いを受信側の裁量とし、{" "}
              <code>application/octet-stream</code>
              と見なすか中身を調べて判定してよいと定めています。
              どう扱われるかはサーバ実装によって変わるため、必ず付けます。
            </p>

            <CodeBlock
              language="bash"
              title="リクエスト（ユーザー作成）"
              code={`curl -X POST https://api.example.com/v1/users \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -d '{
    "name": "田中 花子",
    "email": "hanako@example.com"
  }'`}
            />

            <InfoBox type="info" title="Content-Type と Accept の役割は違う">
              <code>Content-Type</code> は「自分が今<strong>送る</strong>
              ボディの形式」、<code>Accept</code> は「自分が
              <strong>受け取りたい</strong>レスポンスの形式」です。 GET
              にボディは基本ないので <code>Content-Type</code> は不要ですが、
              <code>Accept</code> はどのメソッドでも意味を持ちます。
            </InfoBox>
          </section>

          {/* レスポンスの一貫性 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              一貫性が最重要 — 4 つの設計判断
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レスポンス設計で繰り返し議論になるのは、次の 4
              点です。重要なのは「どれが絶対正解か」ではなく、
              <strong>API 全体で 1 つに決めて貫くこと</strong>です。
              決めて守れば、利用側は 1 度学べば全エンドポイントに応用できます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {designDecisions.map((d) => (
                <div
                  key={d.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {d.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {d.choice}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {d.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 命名規則 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              命名規則を API 全体で統一する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              JSON のキー名を camelCase にするか snake_case
              にするかは、技術的な優劣より文化の問題です。 JavaScript /
              TypeScript 中心なら camelCase が馴染み、Ruby / Python 中心なら
              snake_case が多く見られます。 どちらを選んでも構いませんが、
              <strong>混在だけは避けます</strong>。
              下は「揃っていない悪い例」と「揃っている良い例」です。
            </p>

            <CodeBlock
              language="json"
              title="悪い例 — 命名と日時形式が混在している"
              code={`{
  "id": 42,
  "userName": "田中 花子",
  "email_address": "hanako@example.com",
  "created_at": "2026-06-20 09:00:00",
  "updatedAt": 1750410000
}`}
            />

            <CodeBlock
              language="json"
              title="良い例 — camelCase と ISO 8601 で統一"
              code={`{
  "id": 42,
  "userName": "田中 花子",
  "emailAddress": "hanako@example.com",
  "createdAt": "2026-06-20T09:00:00Z",
  "updatedAt": "2026-06-20T09:00:00Z"
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              悪い例では、利用側が <code>userName</code> /{" "}
              <code>email_address</code>{" "}
              のように毎回どちらの流儀かを意識しなければならず、
              日時も「文字列なのか数値（エポック秒）なのか」を確認する手間が生じます。
              良い例なら 1 つのルールを覚えるだけで全フィールドを読めます。
            </p>
          </section>

          {/* 日時形式 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              日時は ISO 8601 / RFC 3339 で統一する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              日時表現は事故が起きやすい箇所です。推奨は ISO 8601 のうち、
              インターネット用途に絞った RFC 3339 の形式です。 具体的には{" "}
              <strong>UTC</strong> で表し、末尾に <code>Z</code>（Zulu time =
              UTC）を付けます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">推奨</p>
                  <p className="text-muted-foreground mb-2">
                    UTC + 末尾 Z の ISO 8601 / RFC 3339
                  </p>
                  <code className="text-foreground">2026-06-20T09:00:00Z</code>
                </div>
                <div className="rounded-lg bg-muted border border-border p-4">
                  <p className="font-bold text-foreground mb-1">避けたい例</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li>
                      タイムゾーンなし <code>2026-06-20 09:00:00</code>
                    </li>
                    <li>
                      エポック秒 <code>1750410000</code>（人が読めない）
                    </li>
                    <li>ローカル時刻でゾーンが曖昧</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              タイムゾーンを省くと、サーバとクライアントが別地域にいるとき
              「これは何時のことか」が一意に定まりません。 UTC + <code>Z</code>{" "}
              に固定しておけば、表示側で各ユーザーのローカル時刻に変換するだけで済みます。
            </p>

            <InfoBox type="warning" title="仕様の範囲 vs 実運用の現実">
              ISO 8601
              は本来かなり広い表記（週番号や省略形など）を許容する規格です。
              すべてを受理しようとするとパーサが複雑になるため、実運用では
              <strong>RFC 3339 の「UTC + Z」形式に絞る</strong>のが現実解です。
              「仕様は広いが、自分の API
              では狭く固定する」という割り切りが安定につながります。
            </InfoBox>
          </section>

          {/* エンベロープ論争 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              エンベロープ論争 — 包むか、生で返すか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レスポンスでリソースを「包む（エンベロープ）」べきか、
              生で返すべきかは、長く続く設計論争です。 エンベロープは{" "}
              <code>data</code> にリソース本体、<code>meta</code>{" "}
              にページ情報などの付帯情報を入れる形式です。
              どちらにも長所があり、
              <strong>正解は 1 つではありません</strong>。
            </p>

            <CodeBlock
              language="json"
              title="エンベロープあり — data / meta で包む"
              code={`{
  "data": [
    { "id": 1, "userName": "田中 花子" },
    { "id": 2, "userName": "佐藤 太郎" }
  ],
  "meta": {
    "page": 1,
    "perPage": 20,
    "totalCount": 128
  }
}`}
            />

            <CodeBlock
              language="json"
              title="エンベロープなし — リソースを生で返す（メタはヘッダー等で）"
              code={`[
  { "id": 1, "userName": "田中 花子" },
  { "id": 2, "userName": "佐藤 太郎" }
]`}
            />

            <div className="rounded-xl border border-border bg-card p-5 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    エンベロープあり
                  </p>
                  <p className="text-muted-foreground">
                    ページ情報やエラー情報を本体と同じ JSON
                    に同居させられる。レスポンスの「形」が常に一定で、
                    クライアントの受け取りコードを共通化しやすい。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    エンベロープなし
                  </p>
                  <p className="text-muted-foreground">
                    レスポンスがそのままリソースなので素直で軽い。 メタ情報は{" "}
                    <code>Link</code> ヘッダーや独自ヘッダーに載せる。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox
              type="success"
              title="どちらでもよい。揃っていることが価値"
            >
              エンベロープの有無は宗教論争になりがちですが、利用側にとっての
              本当の苦痛は「<strong>エンドポイントごとに形が違う</strong>
              」ことです。
              一覧は包んで返すのに詳細は生で返す、といった不統一が一番つらい。
              方針を 1 つ決め、全エンドポイントで一貫させてください。
            </InfoBox>
          </section>

          {/* null と省略 / content negotiation */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              null / 省略の方針と Content Negotiation
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              値が存在しないフィールドを <code>null</code>{" "}
              で返すか、キーごと省くかも決めておくべき点です。 一般に、
              <strong>レスポンスの「形」を安定させたいなら null を明示</strong>
              する方が利用側は扱いやすくなります。 キーが出たり消えたりすると、
              受け取り側で「キーがあるか」と「値が null か」の両方を
              チェックする羽目になるためです。
            </p>

            <CodeBlock
              language="json"
              title="null を明示する例 — キーは常に存在する"
              code={`{
  "id": 42,
  "userName": "田中 花子",
  "nickname": null,
  "deletedAt": null
}`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              また、クライアントが受け取りたい形式をサーバに伝える仕組みが{" "}
              <strong>Content Negotiation（内容交渉）</strong>です。
              リクエストの <code>Accept</code> ヘッダーに希望する MIME
              タイプを書くと、サーバが対応していれば その形式で返します。多くの
              Web API は JSON のみ対応ですが、 CSV や XML
              も返すなら、この仕組みで切り替えます。
            </p>

            <CodeBlock
              language="http"
              title="Accept ヘッダーで JSON を要求する"
              code={`GET /v1/users/42 HTTP/1.1
Host: api.example.com
Accept: application/json`}
            />

            <InfoBox type="info" title="バージョンを Accept に載せる流派もある">
              API のバージョンを URL（<code>/v1/...</code>）ではなく{" "}
              <code>Accept</code> ヘッダー（例:{" "}
              <code>application/vnd.example.v1+json</code>）で
              指定する設計もあります。これは Content Negotiation の応用ですが、
              採用は分かれます。ここでも大切なのは「方式を 1
              つに決めて一貫させる」ことです。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="API のレスポンス全体で日時を表すとき、最も無難な形式はどれ？"
              options={[
                { label: "サーバのローカル時刻（タイムゾーン表記なし）" },
                {
                  label:
                    "UTC + 末尾 Z の ISO 8601 / RFC 3339（例: 2026-06-20T09:00:00Z）",
                  correct: true,
                },
                { label: "エポック秒の整数（例: 1750410000）で固定" },
                { label: "エンドポイントごとに読みやすい形式を選ぶ" },
              ]}
              explanation="日時は UTC + 末尾 Z の ISO 8601 / RFC 3339 で統一するのが無難です。タイムゾーンなしは「いつの時刻か」が曖昧になり、エポック秒は人が読みづらく、エンドポイントごとの使い分けは一貫性を壊します。UTC で固定し、表示側でローカル時刻に変換するのが安全です。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="エンベロープ（{ data, meta } で包む形式）について正しい姿勢はどれ？"
              options={[
                {
                  label: "必ずエンベロープで包まなければ REST 違反になる",
                },
                {
                  label:
                    "包む / 包まないはどちらも妥当。重要なのは API 全体で一貫させること",
                  correct: true,
                },
                { label: "包むと必ずパフォーマンスが落ちるので避けるべき" },
                {
                  label:
                    "一覧は包み、詳細は生で返すなど用途ごとに変えるのが理想",
                },
              ]}
              explanation="エンベロープの有無に絶対の正解はありません。どちらにも長所があり、選択は設計判断です。利用側にとって本当の負担は形式そのものより「エンドポイントごとに形が違うこと」なので、方針を 1 つ決めて全体で一貫させることが最優先です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "RFC 3339 - Date and Time on the Internet",
                  url: "https://www.rfc-editor.org/info/rfc3339/",
                  description:
                    "インターネットで日時を表す標準。ISO 8601 のうち実用的なサブセットを規定している",
                },
                {
                  title: "MDN - Content-Type ヘッダー",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Headers/Content-Type",
                  description:
                    "リクエスト / レスポンスのボディ形式を伝えるヘッダーの仕様",
                },
                {
                  title: "MDN - Content negotiation",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/Content_negotiation",
                  description:
                    "Accept ヘッダーによる内容交渉の仕組み。形式の切り替えを学べる",
                },
                {
                  title: "MDN - JSON",
                  url: "https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Scripting/JSON",
                  description:
                    "Web API のボディで最も使われる JSON の基礎と扱い方",
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
