import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

// 可観測性の3本柱（ログ / メトリクス / トレース）を整理した図解カード用データ
const pillars = [
  {
    name: "ログ（Logs）",
    summary: "「いつ・何が起きたか」を時系列の出来事として残す。",
    detail:
      "1 イベント = 1 行。構造化（JSON）にして検索・集計可能にする。相関 ID を必ず含める。",
  },
  {
    name: "メトリクス（Metrics）",
    summary: "数値の集計。レイテンシ・エラー率・スループットなど。",
    detail:
      "時系列の集約値。ダッシュボードやアラートの土台になる。RED メソッドで整理する。",
  },
  {
    name: "トレース（Traces）",
    summary: "1 リクエストが複数サービスをどう流れたかを可視化。",
    detail:
      "サービス境界をまたぐ処理の連鎖を 1 本のタイムラインとして追える。W3C Trace Context が標準。",
  },
];

// RED メソッドの3指標
const redMethod = [
  {
    name: "Rate（流量）",
    role: "単位時間あたりのリクエスト数。スループット。例: 1 秒あたりのリクエスト件数。",
  },
  {
    name: "Errors（エラー）",
    role: "失敗したリクエストの割合。例: 5xx の比率、エラー率。",
  },
  {
    name: "Duration（所要時間）",
    role: "リクエスト処理にかかった時間。平均ではなくパーセンタイル（p50 / p95 / p99）で見る。",
  },
];

export default function Observability() {
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
            API の可観測性
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            可観測性（Observability）とは、システムの外部出力からその内部状態を
            どれだけ推測できるか、という性質です。本番で動く API
            は必ず想定外の挙動をします。
            そのとき「何が起きているか」を後から追えるかどうかが、
            復旧速度と品質を左右します。 ログ・メトリクス・トレースの 3
            本柱を、設計の段階から組み込んでいきます。
          </p>
        </div>

        <WhyNowBox
          tags={["Observability", "ログ", "メトリクス", "トレース", "SLO"]}
        >
          <p>
            可観測性は「運用チームが後で足すもの」と思われがちですが、
            <strong>相関 ID の発行やログの構造化は API の設計判断</strong>
            です。 リクエストがサーバに入った時点で ID
            を発行し、全ログ・全サービスへ伝播させる——
            この導線は後付けが難しく、境界の設計に組み込んでおく必要があります。
            適切に設計すれば、障害発生時に「1
            リクエストの全行程」を数分で追えるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 3本柱 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              可観測性の3本柱 — ログ / メトリクス / トレース
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              可観測性は、性質の異なる 3
              種類のテレメトリ（観測データ）で構成されます。
              それぞれ得意な問いが違います。「何が起きたか」はログ、
              「どれくらい起きているか」はメトリクス、「どこで時間がかかったか」はトレース。
              3 つを組み合わせて初めて、システムの内部状態を外から推測できます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {pillars.map((p) => (
                <div
                  key={p.name}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-primary mb-1 text-base">
                    {p.name}
                  </h3>
                  <p className="text-sm text-foreground mb-2 leading-relaxed">
                    {p.summary}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {p.detail}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="モニタリングと可観測性の違い">
              モニタリングは「あらかじめ決めた指標を監視する」こと、可観測性は
              「想定していなかった問いにも答えられる」状態を指します。 3
              本柱はモニタリングの道具でもありますが、相関 ID
              で横断的に追えるようにしておくと、
              事前に想定しなかった障害も後から再構成できます。
            </InfoBox>
          </section>

          {/* ログ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ログ — 構造化 + 相関 ID で「1リクエストを追える」状態にする
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              人間が読む整形済みテキストのログは、機械で検索・集計しづらいのが弱点です。
              本番 API では<strong>構造化ログ（JSON 形式）</strong>
              を基本にします。 さらに、リクエストごとに
              <strong>相関 ID（Correlation ID / Request ID）</strong>を 1
              つ発行し、 そのリクエスト処理中に出力される全ログへ同じ ID
              を付与します。 こうすると、1 件のリクエストに関するログだけを ID
              で抽出できます。
            </p>

            <CodeBlock
              language="json"
              title="構造化ログの1行（相関 ID を含む）"
              code={`{ "timestamp": "2026-06-20T09:31:04.512Z", "level": "error", "service": "orders-api", "request_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "method": "POST", "path": "/v1/orders", "status": 500, "duration_ms": 842, "message": "failed to reserve inventory" }`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              相関 ID は HTTP ヘッダーで受け渡します。よく使われるのが
              <code>X-Request-Id</code>
              です（標準仕様で固定された名前ではなく、デファクトの慣習名）。
              クライアントやゲートウェイが付けて送ってきたらそれを使い、
              無ければサーバ側で生成します。そして
              <strong>同じ ID をレスポンスヘッダーにも返します</strong>。
              これにより、利用者は問い合わせ時にその ID
              を伝えるだけで、運用側がログを特定できます。
            </p>

            <CodeBlock
              language="http"
              title="相関 ID をリクエスト/レスポンスで往復させる"
              code={`POST /v1/orders HTTP/1.1
Host: api.example.com
X-Request-Id: f47ac10b-58cc-4372-a567-0e02b2c3d479
Content-Type: application/json

HTTP/1.1 500 Internal Server Error
X-Request-Id: f47ac10b-58cc-4372-a567-0e02b2c3d479
Content-Type: application/json`}
            />

            <InfoBox
              type="success"
              title="相関 ID は最初に発行し、全サービスへ伝播する"
            >
              相関 ID は<strong>最初のリクエストで一度だけ発行</strong>し、
              そこから先のすべてのサービス呼び出しに引き回します。 サービス A が
              B を、B が C を呼ぶなら、同じ ID を A → B → C と伝播させます。
              各サービスが勝手に新しい ID
              を振り直すと、横断的な追跡ができなくなります。
            </InfoBox>
          </section>

          {/* メトリクス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              メトリクス — RED メソッドと SLI / SLO
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              メトリクスは数値の集計です。API の健全性を測る代表的な枠組みが、
              リクエスト駆動サービス向けの
              <strong>RED メソッド（Rate / Errors / Duration）</strong>です。
              この 3
              つを見ておけば、「どれだけ来ているか・どれだけ失敗しているか・どれだけ遅いか」を把握できます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      指標
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      意味
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {redMethod.map((m) => (
                    <tr key={m.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {m.name}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {m.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              レイテンシ（所要時間）は<strong>平均で見てはいけません</strong>。
              平均は、一部の極端に遅いリクエストを多数の速いリクエストが薄めてしまい、
              「実際に遅さを体験しているユーザー」を見えなくします。 そこで
              <strong>パーセンタイル</strong>を使います。p95 が「全リクエストの
              95% がこの時間以内」、p99 が「99% がこの時間以内」を意味します。
              p50（中央値）が速くても p99 が極端に遅ければ、100 人に 1
              人は遅さを体験しています。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">SLI（指標）</p>
                  <p className="text-muted-foreground">
                    Service Level Indicator。実際に測る値。例: 「直近 30
                    日の成功した GET /v1/orders の p99 レイテンシ」。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">SLO（目標）</p>
                  <p className="text-muted-foreground">
                    Service Level Objective。SLI に対する目標値。例:「p99 を
                    300ms 以内、可用性 99.9% を維持する」。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox
              type="warning"
              title="仕様値（SLO）と実測値（SLI）はずれる前提で設計する"
            >
              SLO は「こうありたい」という<strong>目標</strong>、SLI は実際に
              <strong>観測される値</strong>です。 この 2 つは必ずずれます。SLO
              を 100% に置くと、わずかな揺らぎでも違反になり、
              アラートが鳴り続けて無視される文化が生まれます。
              意図的に許容範囲（エラーバジェット）を残し、 「99.9%
              を割ったら対応する」という運用にするのが現実解です。
            </InfoBox>
          </section>

          {/* トレース */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              トレース — W3C Trace Context と OpenTelemetry
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              マイクロサービスでは、1
              リクエストが複数のサービスを次々に呼び出します。
              「どこで時間がかかったか」「どのサービスで失敗したか」を 1
              本のタイムラインとして可視化するのが
              <strong>分散トレーシング</strong>です。 1 リクエスト全体を
              <strong>トレース</strong>、各サービス内の処理単位を
              <strong>スパン</strong>と呼びます。
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              トレース情報をサービス間で受け渡す標準が
              <strong>W3C Trace Context</strong>で、
              <code>traceparent</code>
              ヘッダーを使います。実装側のデファクトスタンダードは
              <strong>OpenTelemetry（OTel）</strong>で、
              ログ・メトリクス・トレースを
              統一的に扱う計装（instrumentation）の仕組みを提供します。
            </p>

            <CodeBlock
              language="http"
              title="traceparent ヘッダー（W3C Trace Context）"
              code={`GET /v1/orders/42 HTTP/1.1
Host: api.example.com
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
X-Request-Id: f47ac10b-58cc-4372-a567-0e02b2c3d479`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>traceparent</code> の値は
              <code>version-trace-id-parent-id-flags</code>の 4
              つをハイフンで区切った形式です。 中央の
              <strong>trace-id</strong>（上の例では
              <code>4bf92f35...e4736</code>）が 1 リクエスト全体を通して共通の
              ID で、これが各サービスのスパンを 1
              本のトレースに束ねます。後続のサービスはこのヘッダーを受け取り、
              自分のスパンを足して下流へ伝播させます。
            </p>

            <InfoBox type="info" title="相関 ID と trace-id は役割が重なる">
              <code>X-Request-Id</code> による相関 ID と、Trace Context の
              trace-id はどちらも「1
              リクエストを横断的に束ねる」目的が重なります。 OpenTelemetry
              を導入する場合は trace-id を相関キーとして使い、 ログにも trace-id
              を埋め込むと、ログとトレースを相互に行き来できます。 独自の
              X-Request-Id
              はクライアント向けの分かりやすい問い合わせ番号として併用できます。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="可観測性（Observability）の3本柱として正しい組み合わせは？"
              options={[
                { label: "認証 / 認可 / 暗号化" },
                {
                  label: "ログ / メトリクス / トレース",
                  correct: true,
                },
                { label: "キャッシュ / リトライ / タイムアウト" },
                { label: "ページネーション / フィルタ / ソート" },
              ]}
              explanation="可観測性は、ログ（何が起きたか）・メトリクス（どれくらい起きているか）・トレース（どこで時間がかかったか）の3本柱で構成されます。それぞれ得意な問いが異なり、組み合わせて初めてシステムの内部状態を外から推測できます。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="相関 ID（Correlation ID / Request ID）を使う主な目的は？"
              options={[
                {
                  label:
                    "1 つのリクエストに関するログを複数サービス横断で追跡できるようにするため",
                  correct: true,
                },
                { label: "レスポンスを暗号化して盗聴を防ぐため" },
                { label: "同じデータへのリクエストをキャッシュから返すため" },
                { label: "リクエストのレート制限をかけるため" },
              ]}
              explanation="相関 ID は、1 リクエストの処理中に出力される全ログ・全サービスに同じ ID を付与し、後から「このリクエストに何が起きたか」を横断的に追跡可能にするためのものです。最初のリクエストで発行し、下流サービスへ伝播させるのがポイントです。"
            />
          </section>

          {/* 設計上の注意 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              設計上の注意 — 境界で発行し、機密は出さない
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              可観測性は強力ですが、ログに何でも書くと別のリスクになります。
              設計時に押さえるべき点を挙げます。
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  相関 ID は API 境界で発行・伝播する:
                </span>{" "}
                リクエストが入る最前段（ゲートウェイや入口のハンドラ）で ID
                を受け取るか生成し、下流の全呼び出しへ引き回します。後から各所に足すのは困難です。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  エラーログには十分な文脈を、機密は残さない:
                </span>{" "}
                request_id・パス・ステータス・所要時間は残しますが、パスワード・トークン・カード番号・個人情報は
                ログに出しません（セキュリティ章のマスキング・最小化と整合させます）。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  レイテンシはパーセンタイルで見る:
                </span>{" "}
                平均は遅いリクエストを覆い隠します。p50 / p95 / p99
                を記録し、p99 の悪化を品質劣化の早期シグナルとして扱います。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">標準に寄せる:</span>{" "}
                独自フォーマットより、W3C Trace Context（traceparent）と
                OpenTelemetry
                に寄せると、ツール・ベンダー間の互換性が得られます。
              </li>
            </ul>

            <InfoBox type="warning" title="可観測性のコストを忘れない">
              全リクエストを 100% トレースし、全ログを長期保存すると、
              ストレージと 転送のコストが膨らみます。実務では
              <strong>サンプリング</strong>（一部のトレースだけ保存）や、
              ログレベルでの絞り込みを併用します。エラーや遅いリクエストは
              優先的に残し、正常系は間引く、といった設計が現実的です。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "OpenTelemetry 公式ドキュメント",
                  url: "https://opentelemetry.io/docs/",
                  description:
                    "ログ・メトリクス・トレースを統一的に扱う計装の事実上の標準。概念と各言語の SDK を解説",
                },
                {
                  title: "W3C Trace Context（仕様）",
                  url: "https://www.w3.org/TR/trace-context/",
                  description:
                    "traceparent ヘッダーの一次仕様。trace-id / parent-id / flags のフォーマット定義",
                },
                {
                  title: "Google SRE Book — Monitoring Distributed Systems",
                  url: "https://sre.google/sre-book/monitoring-distributed-systems/",
                  description:
                    "四大シグナル・パーセンタイル・アラート設計を解説した章（無料公開）。SLO そのものは同書の別章 Service Level Objectives が扱う",
                },
                {
                  title: "MDN - HTTP ヘッダー一覧",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Headers",
                  description:
                    "X-Request-Id など各ヘッダーの位置づけを確認できる日本語リファレンス",
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
