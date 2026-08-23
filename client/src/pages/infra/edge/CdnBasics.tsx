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

const cacheStrategies = [
  {
    title: "静的アセット",
    examples: "JS / CSS / 画像 / フォント",
    description:
      "ビルドごとにファイル名へハッシュが付く（content hash）ため、内容が変われば URL も変わる。だから max-age を 1 年にして immutable で固定できる。",
  },
  {
    title: "HTML / ドキュメント",
    examples: "ページ本体、SSR レスポンス",
    description:
      "URL が変わらないまま中身が更新される。長期キャッシュは避け、s-maxage + stale-while-revalidate で短く保ちつつ裏で更新する。",
  },
  {
    title: "API レスポンス",
    examples: "JSON、一覧データ",
    description:
      "鮮度の要件次第。数秒〜数分の s-maxage でエッジに乗せると負荷を大きく減らせる。ユーザー固有データは private にしてエッジへ載せない。",
  },
];

export default function CdnBasics() {
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
            CDN とキャッシュの基礎
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            CDN（Content Delivery
            Network）は、世界中に分散したサーバにコンテンツの複製を置き、
            利用者にいちばん近い拠点から配信する仕組みです。
            このページでは「なぜ CDN で速くなるのか」を出発点に、
            Cache-Control・stale-while-revalidate・ETag・パージといった
            キャッシュ制御の基本を、HTTP ヘッダの実例とともに整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["CDN", "キャッシュ", "Cache-Control", "ETag", "エッジ"]}
        >
          <p>
            フロントエンドのデプロイ先（Vercel・Netlify・Cloudflare
            Pages）は、その実体が CDN
            です。設定を意識しなくても恩恵は受けられますが、
            「なぜこのファイルは更新されないのか」「なぜ古い HTML
            が返るのか」といった疑問に答えるには、
            <strong>キャッシュ制御の仕組みを自分の言葉で説明できる</strong>
            必要があります。
            ヘッダひとつの違いが配信速度と鮮度のバランスを決めるからです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* オリジン / エッジ / PoP */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              オリジン・エッジ・PoP の関係
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              CDN を理解する第一歩は、登場人物を整理することです。
              本物のコンテンツを持つサーバを<strong>オリジン</strong>、
              世界中に分散してキャッシュを返す拠点を<strong>エッジ</strong>、
              エッジが集まった物理的な接続点を
              <strong>PoP（Point of Presence）</strong>と呼びます。
              利用者のリクエストはまず最寄りのエッジに届き、そこにキャッシュがあれば即座に返されます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">オリジン</p>
                  <p className="text-muted-foreground">
                    正本を持つサーバ。エッジにキャッシュが無いときだけ問い合わされる
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">エッジ</p>
                  <p className="text-muted-foreground">
                    利用者に近い場所でキャッシュを保持し配信する代理サーバ
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">PoP</p>
                  <p className="text-muted-foreground">
                    エッジが置かれた物理拠点。利用者との距離（遅延）を縮める
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="HIT と MISS">
              リクエストがエッジのキャッシュで完結することを「キャッシュ HIT」、
              キャッシュが無くオリジンへ取りに行くことを「キャッシュ
              MISS」と呼びます。 レスポンスの <code>cf-cache-status</code> や{" "}
              <code>x-vercel-cache</code> ヘッダで、HIT したか MISS
              したかを確認できます。
            </InfoBox>

            <MermaidDiagram
              title="図: キャッシュ HIT / MISS と再検証の流れ"
              chart={`flowchart TD
    U["ユーザー"] --> E{"エッジに<br/>新鮮なキャッシュ?"}
    E -->|"HIT(新鮮)"| R["即座に返す"]
    E -->|"MISS(無い/期限切れ)"| O["オリジンへ問い合わせ"]
    O --> C{"内容は<br/>変わった?"}
    C -->|"変化あり"| N["200 + 本体を再取得"]
    C -->|"変化なし"| NM["304 Not Modified<br/>(本体なし)"]
    N --> S["エッジに保存して返す"]
    NM --> S
    S --> R`}
            />
          </section>

          {/* なぜ速くなるか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              なぜ CDN で速くなるのか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              高速化の理由は大きく 2 つあります。1 つは
              <strong>物理的な距離の短縮</strong>です。
              データは光速以下でしか進めないため、
              東京の利用者が米国のオリジンへ往復するより、
              東京のエッジで完結したほうが往復遅延（RTT）が小さくなります。 もう
              1 つは<strong>オリジン負荷の軽減</strong>です。
              多数のリクエストがエッジで吸収されるため、オリジンは MISS
              の分だけ処理すればよくなります。
            </p>

            <CodeBlock
              language="bash"
              title="エッジで HIT したレスポンスのヘッダ例"
              code={`HTTP/2 200
content-type: text/css
cache-control: public, max-age=31536000, immutable
age: 4213
cf-cache-status: HIT
x-cache: HIT`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>age</code>{" "}
              はそのレスポンスがエッジに乗ってから経過した秒数、
              <code>cf-cache-status: HIT</code>{" "}
              はエッジのキャッシュから返されたことを示します。
              オリジンには一切到達していません。
            </p>
          </section>

          {/* Cache-Control */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Cache-Control（max-age と s-maxage）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              キャッシュの寿命を決める中心が <code>Cache-Control</code>{" "}
              ヘッダです。 <code>max-age</code>{" "}
              は「ブラウザ（共有・私有を問わず）が
              何秒キャッシュを新鮮とみなすか」、 <code>s-maxage</code> は「CDN
              などの共有キャッシュ専用の寿命」です。
              <code>s-maxage</code> があると、共有キャッシュは{" "}
              <code>max-age</code> より <code>s-maxage</code> を優先します。
            </p>

            <CodeBlock
              language="bash"
              title="代表的な Cache-Control の指定"
              code={`# 静的アセット: 1年キャッシュ、内容が変わらない前提
cache-control: public, max-age=31536000, immutable

# CDN は60秒、ブラウザは10秒だけ新鮮とみなす
cache-control: public, max-age=10, s-maxage=60

# キャッシュさせない（毎回オリジンで再検証）
cache-control: no-store

# キャッシュはするが利用前に必ず再検証
cache-control: no-cache`}
            />

            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      ディレクティブ
                    </th>
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      対象
                    </th>
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      意味
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">
                      <code>max-age</code>
                    </td>
                    <td className="py-2 px-3">全キャッシュ</td>
                    <td className="py-2 px-3">新鮮とみなす秒数</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">
                      <code>s-maxage</code>
                    </td>
                    <td className="py-2 px-3">共有キャッシュ（CDN）</td>
                    <td className="py-2 px-3">
                      max-age を上書きする CDN 専用の寿命
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">
                      <code>public / private</code>
                    </td>
                    <td className="py-2 px-3">共有キャッシュの可否</td>
                    <td className="py-2 px-3">
                      private は CDN に載せずブラウザのみ
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">
                      <code>immutable</code>
                    </td>
                    <td className="py-2 px-3">ブラウザ</td>
                    <td className="py-2 px-3">
                      期限内はリロードでも再検証しない
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <CodingChallenge
                preview
                previewType="config"
                title="ハンズオン: Cache-Control を埋めよう"
                description="静的アセットを「全キャッシュで 1 年間（31536000 秒）新鮮」かつ「期限内は再検証しない」設定にしてください。max-age と immutable を埋めます。"
                initialCode={`# 静的アセット: 1年キャッシュ、内容が変わらない前提
# max-age に秒数、最後に再検証を抑制するディレクティブを入れる
cache-control: public, max-age=___, ___`}
                answer={`# 静的アセット: 1年キャッシュ、内容が変わらない前提
# max-age に秒数、最後に再検証を抑制するディレクティブを入れる
cache-control: public, max-age=31536000, immutable`}
                hints={[
                  "1 年は秒に直すと 31536000",
                  "期限内のリロードでも再検証させないのは immutable",
                ]}
                keywords={["31536000", "immutable"]}
              />
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="CDN（共有キャッシュ）の寿命だけを 60 秒にし、ブラウザのキャッシュは短く保ちたい。適切な指定は？"
              options={[
                { label: "cache-control: max-age=60" },
                {
                  label: "cache-control: public, max-age=10, s-maxage=60",
                  correct: true,
                },
                { label: "cache-control: no-store" },
                { label: "cache-control: private, max-age=60" },
              ]}
              explanation="s-maxage は共有キャッシュ（CDN）専用の寿命で、max-age を上書きします。max-age=10 でブラウザは短く、s-maxage=60 で CDN は 60 秒キャッシュ、という分離ができます。private にすると CDN に載らず、no-store だとそもそもキャッシュされません。"
            />
          </section>

          {/* stale-while-revalidate */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              stale-while-revalidate で「速さ」と「鮮度」を両立する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>max-age</code>{" "}
              が切れた瞬間、次のリクエストはオリジンへの問い合わせを待たされます（キャッシュ
              MISS）。 これを避けるのが <code>stale-while-revalidate</code>
              （SWR）です。
              「期限切れの古いキャッシュをまず返しつつ、裏側で新しい内容を取りに行く」という挙動になり、
              利用者は待たされず、次のアクセスからは新しい内容が返ります。
            </p>

            <CodeBlock
              language="bash"
              title="SWR の指定"
              code={`# 60秒は新鮮。その後 600秒間は「古いまま返しつつ裏で更新」
cache-control: public, s-maxage=60, stale-while-revalidate=600`}
            />

            <InfoBox type="success" title="待ち時間を表に出さない更新">
              SWR
              は「常に最新を返す」わけではなく「最新化のコストをユーザーの待ち時間から外す」発想です。
              数十秒〜数分の鮮度ズレを許容できる一覧やトップページに向いています。
              一方、決済結果のように一瞬の古さも許されない箇所には使いません。
            </InfoBox>
          </section>

          {/* ETag と条件付きリクエスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ETag と条件付きリクエスト
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              キャッシュが期限切れになっても、内容が前回と同じなら再ダウンロードは無駄です。
              そこで使うのが<strong>条件付きリクエスト</strong>です。 オリジンは{" "}
              <code>ETag</code>（内容のハッシュ等で作る識別子）を付けて返し、
              ブラウザは次回 <code>If-None-Match</code>{" "}
              にその値を載せて問い合わせます。
              内容が変わっていなければ、オリジンは本体を含まない{" "}
              <code>304 Not Modified</code> を返します。
            </p>

            <CodeBlock
              language="bash"
              title="ETag による再検証（304）"
              code={`# 1回目: 本体と ETag が返る
< HTTP/2 200
< etag: "a1b2c3d4"
< cache-control: no-cache

# 2回目: ブラウザが ETag を添えて問い合わせ
> GET /data.json
> if-none-match: "a1b2c3d4"

# 内容が同じなら本体なしの 304
< HTTP/2 304 Not Modified
< etag: "a1b2c3d4"`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              304 は本文を含まないため、転送量を抑えながら鮮度を保てます。
              <code>Last-Modified</code> と <code>If-Modified-Since</code>{" "}
              という時刻ベースの組み合わせも同じ目的で使えますが、 ETag
              のほうが内容ベースで正確です。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="ETag を使った条件付きリクエストで、内容が変わっていないとき返るのは？"
              options={[
                { label: "200 OK（本体つき）" },
                { label: "304 Not Modified（本体なし）", correct: true },
                { label: "404 Not Found" },
                { label: "412 Precondition Failed" },
              ]}
              explanation="If-None-Match に添えた ETag がオリジンの現在の ETag と一致すれば、内容に変化がない証拠です。サーバは本体を含まない 304 Not Modified を返し、ブラウザは手元のキャッシュを使い回します。本体を再送しないので転送量を節約できます。"
            />
          </section>

          {/* キャッシュ無効化 (purge) */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              キャッシュ無効化（purge）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              期限を待たずにエッジのキャッシュを捨てたいときに使うのが
              <strong>パージ（purge / invalidation）</strong>です。
              緊急の修正を即座に反映する、
              誤って公開した内容を引っ込める、といった場面で必要になります。
              主な方式は「URL
              単位の個別パージ」「タグ単位のパージ」「全体パージ」です。
            </p>

            <CodeBlock
              language="bash"
              title="Cloudflare API で URL を個別パージする例"
              code={`curl -X POST \\
  "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/purge_cache" \\
  -H "Authorization: Bearer <API_TOKEN>" \\
  -H "Content-Type: application/json" \\
  --data '{"files":["https://example.com/style.css"]}'`}
            />

            <InfoBox type="info" title="パージの反映時間は自分で計測する">
              Cloudflare
              の公式ドキュメントはパージについて「instantly」「immediately」と述べるだけで、
              全 PoP に行き渡るまでの時間を数値では公開していません。
              反映のタイミングを前提にした運用を組むなら、自分の環境で計測して確かめます。
              恒久的な更新はパージに頼らず、ファイル名のハッシュ化で URL
              ごと変える設計が安全です。
            </InfoBox>
          </section>

          {/* 静的 vs 動的 のキャッシュ戦略 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              静的アセット vs 動的コンテンツのキャッシュ戦略
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              何をどう乗せるかは、コンテンツの性質で変わります。
              ビルドでファイル名にハッシュが付く静的アセットは長期固定、 URL
              が変わらない HTML は短命＋裏更新、ユーザー固有データは載せない、
              という方針を基本にすると整理しやすくなります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cacheStrategies.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {s.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {s.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              「URL
              が内容とともに変わるなら長く、変わらないなら短く」が指針です。
              ハッシュ付きアセットを <code>immutable</code> で 1 年固定し、HTML
              を SWR で短く保つ組み合わせが、 多くの SPA・SSR
              構成での出発点になります。
            </p>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "MDN - Cache-Control",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Headers/Cache-Control",
                  description:
                    "max-age・s-maxage・no-store など各ディレクティブの正確な定義",
                },
                {
                  title: "MDN - HTTP キャッシュ",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/Caching",
                  description:
                    "条件付きリクエスト・ETag・再検証の全体像をまとめたガイド",
                },
                {
                  title: "Cloudflare - How the cache works",
                  url: "https://developers.cloudflare.com/cache/concepts/default-cache-behavior/",
                  description:
                    "CDN がどのレスポンスをどう判定してキャッシュするかの実装解説",
                },
                {
                  title: "Vercel - Edge Network Caching",
                  url: "https://vercel.com/docs/caching/cdn-cache",
                  description:
                    "s-maxage・stale-while-revalidate を使った CDN キャッシュ制御の実例",
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
