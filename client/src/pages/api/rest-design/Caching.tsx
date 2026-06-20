import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const directives = [
  {
    name: "max-age=<秒>",
    role: "このレスポンスを何秒間「新鮮」とみなすか。期間内はキャッシュをそのまま使う。",
  },
  {
    name: "no-cache",
    role: "キャッシュしてもよいが、使う前に必ずサーバへ再検証する（ETag 等で確認）。",
  },
  {
    name: "no-store",
    role: "一切キャッシュしない。個人情報・認証トークンなど保存させたくない応答に使う。",
  },
  {
    name: "private",
    role: "ブラウザなど特定ユーザーのキャッシュには保存可。CDN など共有キャッシュには保存させない。",
  },
  {
    name: "public",
    role: "CDN・プロキシなど共有キャッシュにも保存してよい。",
  },
  {
    name: "s-maxage=<秒>",
    role: "CDN など共有キャッシュ専用の有効期間。max-age を上書きする。",
  },
];

export default function Caching() {
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
            HTTP キャッシュと条件付きリクエスト
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            同じデータを何度も取得するのは、帯域もサーバ資源も無駄にします。HTTP
            には、レスポンスを再利用したり「変わっていないなら本文を送らない」仕組みが
            標準で備わっています。Cache-Control・ETag・条件付きリクエストを設計に組み込むと、
            アプリを速く・安くできます。
          </p>
        </div>

        <WhyNowBox
          tags={["HTTP", "Cache-Control", "ETag", "304", "パフォーマンス"]}
        >
          <p>
            キャッシュは「フロントエンドの最適化」だと思われがちですが、
            <strong>何をどれだけキャッシュ可能にするかは API の設計判断</strong>
            です。 サーバが返すヘッダー次第で、ブラウザや CDN
            の挙動が決まります。 適切に設計すれば、一覧やマスタデータのような
            「あまり変わらない応答」を再利用させて、
            サーバの負荷とレスポンス時間を同時に下げられます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* なぜ API でキャッシュ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              キャッシュは「鮮度」と「再検証」の2軸で考える
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              HTTP キャッシュの考え方は、大きく 2 つの段階に分かれます。ひとつは
              <strong>鮮度（freshness）</strong>
              ——「一定期間はサーバに聞かずキャッシュを使う」。 もうひとつは
              <strong>再検証（validation）</strong>——「鮮度が切れたら、
              本当に変わったかをサーバに問い合わせ、変わっていなければ本文を再送しない」。
              この 2 段階を理解すると、各ヘッダーの役割が整理できます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">① 鮮度</p>
                  <p className="text-muted-foreground">
                    <code>Cache-Control: max-age=60</code> なら 60
                    秒間はキャッシュをそのまま使い、
                    サーバへのリクエスト自体が発生しない。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">② 再検証</p>
                  <p className="text-muted-foreground">
                    鮮度切れ後、<code>ETag</code> をサーバへ送って確認。
                    変化なしなら <code>304</code>{" "}
                    が返り、本文は再ダウンロードしない。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="キャッシュが効くのは主に GET">
              安全（safe）で冪等な <code>GET</code> はキャッシュと相性が良く、
              レスポンスの再利用が前提にできます。一方
              <code>POST</code>{" "}
              のように状態を変える操作は通常キャッシュしません。
              「どのメソッドがキャッシュ可能か」は、前の章で学んだ安全性・冪等性の話と地続きです。
            </InfoBox>
          </section>

          {/* Cache-Control */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Cache-Control — 鮮度と保存先を指示する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              キャッシュ制御の中心は
              <code>Cache-Control</code>
              レスポンスヘッダーです。
              ディレクティブを組み合わせて「どれくらい新鮮とみなすか」
              「誰がキャッシュしてよいか」を指定します。代表的なものを整理します。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      ディレクティブ
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {directives.map((d) => (
                    <tr key={d.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {d.name}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {d.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="http"
              title="あまり変わらないマスタデータのレスポンス例"
              code={`HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: public, max-age=300
ETag: "v3-9c1f2a"

{ "categories": ["book", "music", "game"] }`}
            />

            <InfoBox type="warning" title="no-cache と no-store は別物">
              名前が紛らわしい2つです。<code>no-store</code> は
              「一切保存しない」（毎回サーバから取り直す）。
              <code>no-cache</code> は「保存はするが、使う前に必ず再検証する」。
              認証トークンや個人情報のように残したくない応答には
              <code>no-store</code>、
              最新性は担保しつつ転送量は減らしたい応答には
              <code>no-cache</code> + <code>ETag</code> を使います。
            </InfoBox>
          </section>

          {/* ETag と条件付きリクエスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ETag と条件付きリクエスト（304 Not Modified）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>ETag</code>
              は、レスポンス本文の「バージョン識別子」です（内容のハッシュなど）。
              クライアントは次回、その値を
              <code>If-None-Match</code>
              ヘッダーで送ります。サーバは現在の ETag と比較し、 一致すれば
              <strong>
                本文を送らず <code>304 Not Modified</code> だけを返します
              </strong>
              。 これが条件付きリクエストです。
            </p>

            <CodeBlock
              language="http"
              title="① 初回リクエストと、ETag 付きレスポンス"
              code={`GET /v1/articles/42 HTTP/1.1

HTTP/1.1 200 OK
ETag: "a1b2c3"
Cache-Control: no-cache

{ "id": 42, "title": "API 設計入門", "body": "..." }`}
            />

            <CodeBlock
              language="http"
              title="② 2回目: ETag を再検証 → 変化なしなら 304（本文なし）"
              code={`GET /v1/articles/42 HTTP/1.1
If-None-Match: "a1b2c3"

HTTP/1.1 304 Not Modified
ETag: "a1b2c3"`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ポイントは、<strong>304 にはボディが無い</strong>ことです。
              リソースが大きいほど、再ダウンロードを丸ごと省ける効果は大きくなります。
              日時ベースで同じことを行う
              <code>Last-Modified</code> / <code>If-Modified-Since</code>
              もありますが、秒単位の精度しかないため、 より正確な
              <code>ETag</code> が好まれます。
            </p>

            <CodeBlock
              language="bash"
              title="curl で条件付きリクエストを試す"
              code={`# 初回: ETag を確認
curl -i https://api.example.com/v1/articles/42

# 取得した ETag を付けて再検証（変化なしなら 304 が返る）
curl -i https://api.example.com/v1/articles/42 \\
  -H 'If-None-Match: "a1b2c3"'`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="クライアントが If-None-Match に ETag を付けて送り、リソースが変わっていなかった。サーバが返すべきは？"
              options={[
                { label: "200 OK（本文を再送する）" },
                {
                  label: "304 Not Modified（本文を送らない）",
                  correct: true,
                },
                { label: "404 Not Found" },
                { label: "412 Precondition Failed" },
              ]}
              explanation="ETag が一致＝内容に変化なしなので、サーバは本文を再送せず 304 Not Modified を返します。クライアントは手元のキャッシュをそのまま使えます。本文の再ダウンロードを省けるのが条件付きリクエストの利点です。"
            />
          </section>

          {/* 共有キャッシュ / CDN */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              共有キャッシュ（CDN）と private / public
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              キャッシュには、ブラウザのように 1
              ユーザー専用の「プライベートキャッシュ」と、 CDN
              やプロキシのように複数ユーザーで共有される「共有キャッシュ」があります。
              ここを取り違えると<strong>事故になります</strong>。 ユーザー A
              向けの個人データを共有キャッシュに保存してしまうと、 ユーザー B
              に漏れる可能性があるからです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  個人データ
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <code>Cache-Control: private, max-age=0</code>{" "}
                  等。共有キャッシュには 保存させない。認証必須の応答は{" "}
                  <code>no-store</code> も検討。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  公開・共通データ
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <code>Cache-Control: public, s-maxage=600</code> 等。CDN
                  に載せて オリジンへのアクセスを大幅に減らせる。
                </p>
              </div>
            </div>

            <InfoBox type="warning" title="認証付き応答のキャッシュは慎重に">
              <code>Authorization</code>
              ヘッダーを伴う応答は、デフォルトでは共有キャッシュに保存されにくい挙動ですが、
              設計で <code>public</code>{" "}
              を明示すると保存されうるため注意します。 個人に紐づくデータは{" "}
              <code>private</code> または <code>no-store</code>
              を基本とし、「誰でも同じ結果」のデータだけを共有キャッシュに載せます。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="no-cache と no-store の違いとして正しいのは？"
              options={[
                {
                  label:
                    "no-store は一切保存しない。no-cache は保存するが使う前に必ず再検証する",
                  correct: true,
                },
                { label: "どちらも同じ意味で、キャッシュを完全に無効化する" },
                { label: "no-cache の方が強く、一切保存しない" },
                { label: "no-store はブラウザ専用、no-cache は CDN 専用" },
              ]}
              explanation="no-store は「保存禁止」で毎回サーバから取得します。no-cache は「保存はするが、再利用の前に必ずサーバへ再検証する」です。最新性を保ちつつ転送量を減らしたいなら no-cache + ETag、機密データを残したくないなら no-store を使います。"
            />
          </section>

          {/* 設計上の注意 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              キャッシュ設計の落とし穴
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              キャッシュは強力ですが、設定を誤ると「古いデータが消えない」「個人データが漏れる」
              といった事故につながります。設計時に押さえるべき点を挙げます。
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  更新があるデータに長い max-age を付けない:
                </span>{" "}
                一度キャッシュされると、期間内はサーバの変更が届きません。頻繁に変わるなら
                <code>no-cache</code> + <code>ETag</code> で都度再検証します。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  個人データを共有キャッシュに載せない:
                </span>{" "}
                <code>private</code> / <code>no-store</code>{" "}
                を明示し、ユーザー間でのデータ混線を防ぎます。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  キャッシュ無効化の手段を用意する:
                </span>{" "}
                内容が変わったら ETag も変える、URL
                にバージョンやハッシュを含める、
                といった「確実に新しい応答へ切り替える」方法を設計に組み込みます。
              </li>
            </ul>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "MDN - HTTP キャッシュ",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Caching",
                  description:
                    "鮮度・再検証・Cache-Control の全体像を日本語で解説。最初に読むと良い",
                },
                {
                  title: "MDN - Cache-Control",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Cache-Control",
                  description:
                    "各ディレクティブ（max-age / no-cache / private 等）の詳細",
                },
                {
                  title: "MDN - ETag",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/ETag",
                  description:
                    "ETag と If-None-Match による条件付きリクエストの仕組み",
                },
                {
                  title: "RFC 9111 - HTTP Caching",
                  url: "https://www.rfc-editor.org/rfc/rfc9111",
                  description:
                    "HTTP キャッシュの一次仕様。鮮度計算や再検証の正式な定義",
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
