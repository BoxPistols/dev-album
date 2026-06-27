import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const pillars = [
  {
    title: "メトリクス",
    examples: "metrics",
    description:
      "時間とともに変化する数値。リクエスト数・レイテンシ・エラー率・CPU 使用率など。集計・しきい値判定・グラフ化に向き、システムの「健康状態」を俯瞰できる。",
  },
  {
    title: "ログ",
    examples: "logs",
    description:
      "個々の出来事の記録。何が・いつ・どんな文脈で起きたかを残す。構造化しておくと、特定のリクエストやエラーを後から追いやすい。",
  },
  {
    title: "トレース",
    examples: "traces",
    description:
      "1つのリクエストが複数サービスをまたいで流れる様子を追跡する。どのサービスのどの処理で時間がかかったかを、つながりとして可視化できる。",
  },
];

const tools = [
  {
    title: "Prometheus / Grafana",
    description:
      "Prometheus がメトリクスを収集・保存し、Grafana がそれを可視化する組み合わせ。オープンソースで、自前運用の定番。",
  },
  {
    title: "Sentry",
    description:
      "エラーと例外の追跡に強い。スタックトレースや発生頻度をまとめ、フロントエンド・バックエンド双方の不具合検知に使われる。",
  },
  {
    title: "Datadog",
    description:
      "メトリクス・ログ・トレースを統合的に扱うマネージド SaaS。導入が速く、横断的な可観測性をまとめて得たいときに向く。",
  },
];

export default function Monitoring() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            モニタリングとログ
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            可観測性（オブザーバビリティ）は、システムの内部状態を外から推し量れる度合いを指します。
            メトリクス・ログ・トレースという3本柱、構造化ログ、計装の標準である
            OpenTelemetry、
            代表的なツール、疲労を避けるアラート設計、そしてダッシュボードまでを、
            手を動かしながら学べる形で整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["可観測性", "ログ", "メトリクス", "トレース", "OpenTelemetry"]}
        >
          <p>
            障害が起きてから「何が起きているのか分からない」では、復旧に時間がかかります。
            可観測性は、
            <strong>問題が起きたときに原因へたどり着ける状態</strong>を
            あらかじめ作っておく取り組みです。
            ログを出すこと自体が目的ではなく、「後から追える形で」記録することが鍵になります。
            3本柱の役割を押さえると、何を計装すべきかが見えてきます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              可観測性の3本柱
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              可観測性は、メトリクス・ログ・トレースの3種類の信号で支えられます。
              それぞれ得意なことが違い、補い合います。
              メトリクスで異常に気づき、ログで詳細を確かめ、
              トレースでサービス横断の流れを追う、という役割分担です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {p.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {p.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="3つは置き換えではなく補完">
              メトリクスは「何かおかしい」を安く知らせ、
              ログは「具体的に何が起きたか」を記録し、
              トレースは「どこで時間がかかったか」をつなぎます。
              どれか一つで足りることは少なく、3つを組み合わせて初めて原因へ近づけます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              構造化ログ（JSON）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              人間向けの文章ログは読めますが、機械では検索や集計がしにくくなります。
              <strong>構造化ログ</strong>は、ログを JSON
              のようなキー・値の形で出力する方式です。
              「このユーザーの・この時間帯の・エラーレベルのログ」を
              キーで絞り込めるため、調査が速くなります。
            </p>

            <CodeBlock
              language="json"
              title="構造化ログの出力例（1イベント = 1 JSON 行）"
              code={`{
  "timestamp": "2026-06-27T09:12:33.482Z",
  "level": "error",
  "service": "checkout-api",
  "traceId": "a1b2c3d4e5f60718",
  "userId": 42,
  "message": "payment provider timeout",
  "durationMs": 5021,
  "statusCode": 504
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>traceId</code>{" "}
              を含めておくと、ログとトレースを突き合わせられます。
              <code>level</code> や <code>service</code> といった共通のキーを
              チームで揃えておくと、サービス横断で同じ条件で検索できます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              OpenTelemetry という標準
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              計装（テレメトリの収集）の方法がツールごとに違うと、
              監視ツールを乗り換えるたびにコードを書き直すことになります。
              <strong>OpenTelemetry（OTel）</strong>は、
              メトリクス・ログ・トレースの収集方法を標準化する取り組みです。
              OTel に沿って計装しておけば、送り先のツールを差し替えても
              アプリ側の計装はそのまま使えます。
            </p>

            <InfoBox type="info" title="ベンダーロックインを避ける緩衝材">
              OpenTelemetry は、アプリと監視ツールの間に立つ共通の語彙です。
              アプリは OTel の形でデータを出し、 送り先（Datadog でも Grafana
              でも）は後から選べます。
              「先に計装を標準化し、ツールは後で選ぶ」という順序が取れるようになります。
            </InfoBox>
          </section>

          <section>
            <Quiz
              question="可観測性の3本柱（メトリクス・ログ・トレース）のうち、「1つのリクエストが複数サービスをまたいで流れる様子を追跡し、どこで遅延したかを可視化する」のはどれ？"
              options={[
                { label: "メトリクス" },
                { label: "ログ" },
                { label: "トレース", correct: true },
                { label: "アラート" },
              ]}
              explanation="トレースは、1リクエストが複数サービスを経由する流れを span のつながりとして記録します。どのサービスのどの処理で時間がかかったかが分かるため、分散システムの遅延調査に向きます。メトリクスは数値の集計、ログは個々の出来事の記録が得意です。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              代表的なツール
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              可観測性のツールは、自前運用のオープンソースから 統合型の SaaS
              まで幅があります。
              役割の重なりも多いので、何を重視するか（コスト・統合度・運用負荷）で選びます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tools.map((t) => (
                <div
                  key={t.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {t.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              アラート設計とダッシュボード
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              アラートは「人を呼ぶべき異常」だけに絞るのが基本です。
              鳴りすぎるアラートは<strong>アラート疲労</strong>を招き、
              本当に重要な通知まで無視されるようになります。
              「ユーザーに影響が出ている症状」を基準にアラートを組み、
              原因の細かい指標は調査用のダッシュボードに回します。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>ダッシュボード</strong>は、関連する指標を一画面にまとめ、
              障害時に状況を素早く把握するための場です。
              「正常時にどう見えるか」を普段から見ておくと、
              異常時の変化に気づきやすくなります。
            </p>

            <InfoBox
              type="warning"
              title="アラートは『症状』に、原因はダッシュボードに"
            >
              CPU が高い、という原因寄りの値で人を起こすと、
              ユーザーに影響がなくても呼び出しが発生します。
              「エラー率が上がった」「応答が遅い」といった症状で鳴らし、
              原因の切り分けはダッシュボードに任せると、通知の数を抑えられます。
            </InfoBox>
          </section>

          <section>
            <Quiz
              question="アラート疲労を避けるための設計として、最も適切なのはどれ？"
              options={[
                { label: "可能な限り多くの指標にしきい値を設定して網羅する" },
                {
                  label:
                    "ユーザーに影響が出ている症状に絞って通知し、原因調査はダッシュボードに任せる",
                  correct: true,
                },
                { label: "アラートはすべて同じ重要度で送る" },
                { label: "通知を全部無効化して手動で監視する" },
              ]}
              explanation="鳴りすぎるアラートは無視を招き、重要な通知まで埋もれます。人を呼ぶのは「ユーザー影響のある症状」に限り、CPU やメモリといった原因寄りの指標は調査用ダッシュボードで確認する、という切り分けが疲労を防ぎます。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "OpenTelemetry Documentation",
                  url: "https://opentelemetry.io/docs/",
                  description:
                    "メトリクス・ログ・トレースの計装を標準化する OTel の公式ドキュメント",
                },
                {
                  title: "Prometheus Documentation",
                  url: "https://prometheus.io/docs/introduction/overview/",
                  description: "メトリクス収集とクエリの定番 OSS の概要",
                },
                {
                  title: "Grafana Documentation",
                  url: "https://grafana.com/docs/grafana/latest/",
                  description:
                    "メトリクスやログを可視化するダッシュボードツール",
                },
                {
                  title: "Sentry Documentation",
                  url: "https://docs.sentry.io/",
                  description: "エラー・例外追跡の導入と設定リファレンス",
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
