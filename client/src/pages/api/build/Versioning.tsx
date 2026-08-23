import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const changeKinds = [
  {
    label: "非破壊的（後方互換あり）",
    tone: "success" as const,
    items: [
      "レスポンスへのフィールド追加",
      "任意（オプショナル）パラメータの追加",
      "新しいエンドポイントの追加",
      "新しい任意のレスポンスヘッダーの追加",
    ],
  },
  {
    label: "破壊的（後方互換なし）",
    tone: "error" as const,
    items: [
      "フィールドの削除・改名",
      "フィールドの型変更（数値 → 文字列など）",
      "任意パラメータの必須化",
      "レスポンス構造の変更（配列 → オブジェクト等）",
      "エラー形式・ステータスコードの意味変更",
    ],
  },
];

const strategies = [
  {
    name: "URL パス",
    example: "/v1/users",
    pros: "見ただけで分かる。キャッシュ・ルーティングが容易。ブラウザでそのまま叩ける",
    cons: "URL がバージョンに縛られる。同一リソースに複数 URL が存在する",
  },
  {
    name: "ヘッダー",
    example: "Accept: application/vnd.example.v2+json",
    pros: "URL は不変のまま。コンテンツネゴシエーションの仕組みに沿う",
    cons: "ブラウザで確認しづらい。指定漏れ時の既定バージョンの扱いが要設計",
  },
  {
    name: "クエリ",
    example: "/users?version=2",
    pros: "実装が手軽。既存 URL に後付けしやすい",
    cons: "省略時の挙動が曖昧になりがち。キャッシュキーが分かれやすい",
  },
];

export default function Versioning() {
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
            API バージョニング
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            一度公開した API
            は、誰かの本番システムが依存する「契約」になります。
            その契約を壊さずに API
            を進化させるための仕組みが、バージョニングです。
            ここでは何が破壊的変更かを切り分け、URL
            ・ヘッダー・クエリの各方式を比較し、 古いバージョンを安全に畳む
            非推奨フローまでを通して押さえます。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "バージョニング",
            "後方互換",
            "破壊的変更",
            "Deprecation",
            "Sunset",
          ]}
        >
          <p>
            機能追加のたびに新しい URL
            を切ってしまうと、利用者は移行に追われ、提供側は無数のバージョンを保守し続けることになります。
            逆に、互換性を気にせずレスポンス形式を変えると、依存する全クライアントが静かに壊れます。
            <strong>「いつバージョンを上げ、いつ上げないか」</strong>
            の判断軸を持つことが、 API
            を長く運用するうえでの分かれ目になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* なぜバージョニングか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              なぜバージョニングが必要か
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              API は公開した瞬間から「契約」になります。利用者は
              <code>{"/users"}</code> が特定の形の JSON
              を返すことを前提にコードを書きます。
              ところが要件は変わり続けます。フィールドを増やしたい、構造を整理したい、
              名前を直したい——こうした進化を、
              <strong>既存の利用者を壊さずに</strong>進めるための仕組みが
              バージョニングです。新旧の契約を同時に提供し、利用者が自分のペースで
              移行できる猶予を作ることが目的です。
            </p>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">v1 を提供</p>
                  <p className="text-muted-foreground">
                    既存クライアントはそのまま動き続ける
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">v2 を追加</p>
                  <p className="text-muted-foreground">
                    新しい契約を並行提供し、移行先を用意する
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">v1 を非推奨化</p>
                  <p className="text-muted-foreground">
                    猶予期間を設けてから安全に廃止する
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 破壊的 vs 非破壊的 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              破壊的変更と非破壊的変更を切り分ける
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              すべての変更がバージョンアップを必要とするわけではありません。
              鍵は「既存クライアントのコードを壊すかどうか」です。
              一般に、フィールドや任意パラメータの<strong>追加</strong>
              は非破壊的で、 既存のフィールドの
              <strong>削除・改名・型変更</strong>
              は破壊的です。
              まずはこの線引きを習慣づけると、バージョンを切るべき場面が見えてきます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {changeKinds.map((kind) => (
                <div
                  key={kind.label}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-3 text-base">
                    {kind.label}
                  </h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                    {kind.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="原則: 追加は非破壊、削除・改名は破壊的">
              「足すだけ」なら既存クライアントは新しいフィールドを無視できるので壊れません。
              一方、削除・改名・型変更は、その値を読んでいたコードを直接壊します。
              迷ったら「既存クライアントが知っている形を、そのまま読み続けられるか」を基準に判断してください。
            </InfoBox>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ただし「追加は常に安全」と過信するのは禁物です。クライアントが
              <strong>厳格バリデーション</strong>
              （未知フィールドをエラー扱い）をしている場合、
              フィールド追加でも壊れることがあります。
              <strong>仕様としては非破壊でも、実装次第で破壊になりうる</strong>
              ——この前提を共有しておくことが、実運用での事故を減らします。
            </p>
          </section>

          {/* バージョニング方式 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3 つのバージョニング方式
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              バージョンの埋め込み先には主に 3
              つの選択肢があります。最も普及しているのは URL
              パス方式です。一覧で利点と欠点を比較します。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="text-left p-3 font-bold text-foreground">
                      方式
                    </th>
                    <th className="text-left p-3 font-bold text-foreground">
                      例
                    </th>
                    <th className="text-left p-3 font-bold text-foreground">
                      利点
                    </th>
                    <th className="text-left p-3 font-bold text-foreground">
                      欠点
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {strategies.map((s) => (
                    <tr
                      key={s.name}
                      className="border-b border-border last:border-0"
                    >
                      <td className="p-3 font-medium text-foreground align-top whitespace-nowrap">
                        {s.name}
                      </td>
                      <td className="p-3 text-primary align-top">
                        <code className="text-xs">{s.example}</code>
                      </td>
                      <td className="p-3 text-muted-foreground align-top">
                        {s.pros}
                      </td>
                      <td className="p-3 text-muted-foreground align-top">
                        {s.cons}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="http"
              title="URL パス方式 vs ヘッダー方式"
              code={`# URL パス方式: バージョンが URL に現れる
GET /v1/users/42 HTTP/1.1
Host: api.example.com
Accept: application/json

# ヘッダー方式: URL は不変、Accept でバージョンを指定
GET /users/42 HTTP/1.1
Host: api.example.com
Accept: application/vnd.example.v2+json`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              どちらを採るかは API ごとに異なります。Stripe は{" "}
              <code>Stripe-Version</code>{" "}
              ヘッダーと日付ベースのリリース名でバージョンを管理しています（公式ドキュメント）。
              URL パス方式はブラウザのアドレスバーやドキュメントの curl
              例にバージョンがそのまま現れる一方、 ヘッダー方式は URL
              を変えずにバージョンを切り替えられます。
            </p>

            <InfoBox type="info" title="バージョンの粒度はメジャー単位で十分">
              <code>v1</code> <code>v2</code>
              のようにメジャー番号だけを URL に出すのが一般的です。
              セマンティックバージョニングの
              <code>v1.2.3</code>
              までを URL に持ち込むと組み合わせが爆発します。
              非破壊的な変更（パッチ・マイナー）は同じメジャーバージョン内で吸収し、
              URL を変えないのが運用しやすい形です。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="次のうち、新しいメジャーバージョンが必要になる「破壊的変更」はどれ？"
              options={[
                { label: "レスポンスに任意の新しいフィールドを 1 つ追加する" },
                { label: "新しいエンドポイントを追加する" },
                {
                  label:
                    "レスポンスの userId フィールドを数値から文字列に変更する",
                  correct: true,
                },
                { label: "省略可能なクエリパラメータを 1 つ増やす" },
              ]}
              explanation="フィールドの型変更（数値 → 文字列）は、その値を数値として読んでいた既存クライアントを壊すため破壊的変更です。フィールドやエンドポイント、任意パラメータの「追加」は、既存クライアントが無視できるため基本的に非破壊的です。"
            />
          </section>

          {/* 非推奨フロー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              古いバージョンを安全に畳む（非推奨フロー）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              新バージョンを出したら、いつかは古いバージョンを止めたくなります。
              しかし即座に止めると依存クライアントが壊れます。 そこで
              <strong>非推奨（deprecation）</strong>から
              <strong>廃止（sunset）</strong>
              まで段階を踏みます。 HTTP には、この移行を機械的に伝えるための
              <code>Deprecation</code> ヘッダー（RFC 9745）と
              <code>Sunset</code> ヘッダー（RFC 8594）が定義されています。
            </p>

            <CodeBlock
              language="http"
              title="非推奨を伝えるレスポンスヘッダー"
              code={`HTTP/1.1 200 OK
Content-Type: application/json
# このバージョンが非推奨になった日時（RFC 9745）
Deprecation: @1717200000
# 廃止予定日時。この時刻以降は提供されない（RFC 8594）
Sunset: Sat, 31 Jan 2026 23:59:59 GMT
# 移行先や告知ページへのリンク
Link: <https://api.example.com/v2/users>; rel="successor-version",
      <https://docs.example.com/migration/v1-to-v2>; rel="deprecation"`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              これらのヘッダーは、利用者のクライアントやログ監視がプログラムで検知できる点に価値があります。
              ただし<strong>ヘッダーだけに頼ってはいけません</strong>。
              多くの利用者はヘッダーを監視していないため、ドキュメント・メール・
              ダッシュボードでの能動的な告知を併用し、十分な移行期間（数ヶ月単位が一般的）を確保します。
            </p>

            <div className="rounded-xl border border-border bg-card p-5">
              <ol className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <li className="flex gap-3">
                  <span className="font-bold text-primary shrink-0">1.</span>
                  <span>
                    <strong className="text-foreground">告知</strong>
                    ：新バージョンと移行ガイドを公開し、旧バージョンの非推奨を明言する。
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary shrink-0">2.</span>
                  <span>
                    <strong className="text-foreground">
                      通知ヘッダー付与
                    </strong>
                    ：旧バージョンのレスポンスに <code>Deprecation</code> /
                    <code>Sunset</code> を付けて、機械的にも分かるようにする。
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary shrink-0">3.</span>
                  <span>
                    <strong className="text-foreground">移行期間</strong>
                    ：新旧を並行提供し、利用者が移行を完了できる猶予を設ける。
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary shrink-0">4.</span>
                  <span>
                    <strong className="text-foreground">廃止</strong>：
                    <code>Sunset</code>
                    の日時を過ぎ、利用がほぼ無くなったことを確認してから停止する。
                  </span>
                </li>
              </ol>
            </div>

            <InfoBox type="warning" title="バージョンを乱発しない">
              バージョンを切るたびに、提供側は旧バージョンの保守コストを抱え、利用者は移行コストを払います。
              安易に <code>v2</code> <code>v3</code>
              と増やすより、後方互換を最大限保ち、追加で済む変更は同じバージョン内で吸収するのが原則です。
              新メジャーバージョンは「どうしても破壊的変更が避けられない」ときの最後の手段と考えてください。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="URL パス方式（/v1/users）が最も広く使われている主な理由はどれ？"
              options={[
                {
                  label:
                    "URL を見るだけでバージョンが分かり、ブラウザや curl でそのまま確認・ルーティングできるから",
                  correct: true,
                },
                { label: "他の方式よりレスポンスが高速になるから" },
                { label: "仕様（RFC）でこの方式だけが許可されているから" },
                {
                  label:
                    "URL にバージョンを入れると自動でキャッシュが無効化されるから",
                },
              ]}
              explanation="URL パス方式は、バージョンが URL に明示されるため可視性が高く、ブラウザのアドレスバーや curl でそのまま試せ、リバースプロキシでのルーティングやキャッシュ制御も容易です。仕様上どれか 1 つに限定されているわけではなく、ヘッダーやクエリ方式も妥当な選択肢です。"
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              実装の指針
            </h2>
            <div className="rounded-xl border border-border bg-card p-5">
              <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    まず変更が破壊的かを判定する。追加で済むなら、バージョンは上げない。
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    バージョンを切るなら URL
                    パス（メジャー単位）を既定とし、特別な理由があるときだけヘッダー方式を検討する。
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    廃止は <code>Deprecation</code> / <code>Sunset</code>
                    ヘッダーとドキュメント告知を併用し、十分な移行期間を取る。
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    同時に保守するバージョン数を絞る。古いバージョンの利用状況を計測し、確実に畳む。
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "RFC 8594 - The Sunset HTTP Header Field",
                  url: "https://www.rfc-editor.org/info/rfc8594/",
                  description:
                    "リソースの廃止予定日時を伝える Sunset ヘッダーの仕様",
                },
                {
                  title:
                    "RFC 9745 - The Deprecation HTTP Response Header Field",
                  url: "https://www.rfc-editor.org/info/rfc9745/",
                  description:
                    "API やリソースの非推奨を機械可読に伝える Deprecation ヘッダーの仕様",
                },
                {
                  title: "Stripe API - Versioning",
                  url: "https://docs.stripe.com/api/versioning",
                  description:
                    "後方互換を重視した実運用のバージョニング方針。破壊的/非破壊的の線引きの実例",
                },
                {
                  title: "MDN - HTTP コンテンツネゴシエーション",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/Content_negotiation",
                  description:
                    "Accept ヘッダーによるバージョン指定（ヘッダー方式）の土台となる仕組み",
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
