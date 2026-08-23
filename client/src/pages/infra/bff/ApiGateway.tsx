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

const gatewayRoles = [
  {
    title: "ルーティング",
    description:
      "受けたリクエストを、パスやホストに応じて適切なバックエンドサービスへ振り分ける。クライアントは単一の入口だけを知ればよい。",
  },
  {
    title: "認証・認可",
    description:
      "各サービスの手前で共通の認証チェックを行う。トークン検証を一箇所に集約し、各サービスの実装を薄く保つ。",
  },
  {
    title: "レート制限",
    description:
      "一定時間あたりのリクエスト数を制限し、特定クライアントによる過剰なアクセスから背後を守る。",
  },
  {
    title: "集約",
    description:
      "複数サービスへの呼び出しをまとめて 1 レスポンスにする。クライアントの往復回数を減らせる。",
  },
  {
    title: "監視",
    description:
      "通過する全リクエストのログ・メトリクスを一箇所で取得する。横断的な可観測性の起点になる。",
  },
  {
    title: "変換・終端",
    description:
      "TLS 終端やヘッダ変換、プロトコル変換を担う。背後のサービスを共通の前提に揃える。",
  },
];

export default function ApiGateway() {
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
            API Gateway とバックエンド構成
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            API Gateway は、クライアントとバックエンドサービス群の間に立つ
            単一の入口です。ルーティング・認証・レート制限・集約・監視を
            一箇所で担い、背後の構成をクライアントから隠します。 このページでは
            Gateway の役割と、リバースプロキシ・BFF
            との関係、そして代表的なバックエンド構成例を整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["API Gateway", "リバースプロキシ", "マイクロサービス", "BFF"]}
        >
          <p>
            サービスが 1 つのうちは、クライアントはその 1
            つを直接呼べば済みます。しかしサービスが分かれてくると、
            「どのサービスがどこにいるか」をクライアントが知る負担が増え、
            認証やレート制限を各サービスでバラバラに実装する重複も生まれます。
            API Gateway はこれらの横断的な関心事を入口に集約する考え方で、 BFF
            との違いと併用を理解しておくと、層を増やす判断を迷わずに済みます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* Gateway の役割 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              API Gateway の役割
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              API Gateway は、すべてのリクエストが最初に通る単一の入口です。
              個々のサービスが重複して持ちがちな横断的な関心事を、入口で
              一括して引き受けます。クライアントは Gateway
              の住所だけを知ればよく、
              背後のサービスがいくつあって、どこにいるかを意識せずに済みます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {gatewayRoles.map((role) => (
                <div
                  key={role.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {role.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>
                </div>
              ))}
            </div>

            <MermaidDiagram
              title="図: 単一の入口で認証・レート制限・ルーティングを担う"
              chart={`flowchart LR
    C["クライアント"] --> G["API Gateway"]
    G -.->|"認証 / レート制限 / ルーティング"| G
    G --> S1["Users サービス"]
    G --> S2["Orders サービス"]
    G --> S3["Products サービス"]`}
            />

            <InfoBox type="info" title="横断的関心事の集約所">
              認証・レート制限・ログのような「どのサービスでも必要なこと」を
              各サービスに散らすと、実装がばらつき、抜けも生まれます。Gateway
              に集約すると、各サービスは本来のドメインロジックに集中できます。
            </InfoBox>
          </section>

          {/* リバースプロキシとの関係 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リバースプロキシとの関係
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              API Gateway
              の土台にあるのがリバースプロキシです。リバースプロキシは
              クライアントからのリクエストを受け、背後のサーバーへ中継して
              結果を返す中間サーバーで、nginx や Envoy が代表例です。 API
              Gateway は、このリバースプロキシに認証・レート制限・集約・ API
              単位のルーティングといった
              <strong>API 向けの機能を上乗せしたもの</strong>
              と捉えると整理しやすくなります。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground">
                      観点
                    </th>
                    <th className="text-left py-2 pr-4 font-bold text-foreground">
                      リバースプロキシ
                    </th>
                    <th className="text-left py-2 font-bold text-foreground">
                      API Gateway
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-medium text-foreground align-top">
                      主目的
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground align-top">
                      中継・負荷分散・TLS 終端
                    </td>
                    <td className="py-2 text-muted-foreground align-top">
                      API 群への入口として横断機能を提供
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-medium text-foreground align-top">
                      認証・認可
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground align-top">
                      基本的な仕組みは標準で持つ（nginx の Basic 認証、Envoy の
                      JWT 認証・外部認可フィルタ）。API 単位のポリシー管理までは担わない
                    </td>
                    <td className="py-2 text-muted-foreground align-top">
                      入口で一括して担うのが前提
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-medium text-foreground align-top">
                      集約
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground align-top">
                      既定の役割ではない（nginx の SSI モジュールのように、別の
                      リクエストの結果を応答に差し込む仕組みはある）
                    </td>
                    <td className="py-2 text-muted-foreground align-top">
                      複数サービスをまとめる機能を持つことがある
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              実務では nginx
              のようなリバースプロキシをそのまま簡易ゲートウェイとして使うことも、
              クラウドのマネージド API Gateway
              を使うこともあります。境界はきっちり分かれているわけではなく、
              「どこまで API
              向けの機能を載せたか」で連続的に捉えるのが現実的です。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="API Gateway が単一の入口として担う役割として、当てはまらないのはどれ？"
              options={[
                { label: "リクエストを適切なサービスへルーティングする" },
                { label: "認証チェックやレート制限を入口で一括して行う" },
                {
                  label:
                    "各サービスのドメインロジック（業務計算）そのものを実装する",
                  correct: true,
                },
                { label: "通過するリクエストのログやメトリクスを収集する" },
              ]}
              explanation="API Gateway はルーティング・認証・レート制限・集約・監視といった横断的関心事を入口で担います。業務計算などのドメインロジックは背後の各サービスの責務であり、Gateway に持たせると役割がぶれて肥大化します。"
            />
          </section>

          {/* マイクロサービスの前段 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              マイクロサービスの前段に置く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              サービスを役割ごとに分けると、クライアントが直接それぞれを呼ぶのは
              負担になります。各サービスの場所を知り、認証を個別に通し、
              障害時の振る舞いを意識する必要が出てくるからです。API Gateway
              を前段に置くと、クライアントは単一の入口だけを相手にすればよくなります。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <p className="text-sm text-muted-foreground mb-3 font-medium">
                テキストで表した構成イメージ
              </p>
              <CodeBlock
                language="bash"
                title="クライアント → Gateway → サービス群"
                code={`Client
  |
  v
[ API Gateway ]  ← 認証 / レート制限 / ルーティング / 監視
  |        |        |
  v        v        v
Users   Orders   Products   (役割ごとのサービス)
Service Service  Service`}
              />
            </div>

            <InfoBox type="info" title="入口は単一、背後は分割">
              クライアントから見える入口を 1
              つに保ちつつ、背後はサービス単位で独立して開発・デプロイできます。
              この「外は単一、内は分割」の構図が、マイクロサービスで Gateway
              が好まれる理由です。
            </InfoBox>
          </section>

          {/* BFF と Gateway の違いと併用 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              BFF と API Gateway の違いと併用
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              BFF と API Gateway
              はどちらも「クライアントとサービス群の間に立つ層」ですが、
              向いている方向が違います。Gateway
              はサービス側を向いた汎用の入口で、横断的関心事を一括で担います。BFF
              はフロント側を向いた専用層で、特定の画面に必要な形へデータを整形します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  API Gateway
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  すべてのクライアント共通の入口。認証・レート制限・ルーティングなど横断機能を担う。サービス側を向く。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  BFF
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  特定フロント専用の層。集約とレスポンス整形でその画面に最適化する。フロント側を向く。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              両者は排他ではなく、併用できます。Microsoft の BFF
              パターンが示す並びは、フロントがまず API Gateway を呼び、Gateway
              がクライアント種別ごとの BFF へ振り分け、BFF
              が背後のサービス群を呼ぶ形です。 共通の認証やレート制限は入口の
              Gateway が引き受け、画面ごとの集約と整形は BFF
              が引き受けると、責務が綺麗に分かれます。
            </p>

            <CodeBlock
              language="bash"
              title="併用時のリクエストの流れ"
              code={`Browser
  -> API Gateway (共通の認証・レート制限・ルーティング)
       -> BFF (画面ごとの集約・整形、クライアント種別ごと)
            -> Users / Orders / Products サービス`}
            />

            <InfoBox type="warning" title="層は必要な分だけ">
              BFF と Gateway
              を両方置くと、デプロイと監視の対象が増えます。小規模なうちは
              フレームワークのサーバー機能（実質 BFF）だけで足りることも多く、
              Gateway
              はサービスが分かれて横断機能の重複が痛くなってから入れても遅くありません。
            </InfoBox>
          </section>

          {/* 代表的な構成例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              代表的な構成例（モノリス / サービス分割）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              すべてのアプリに Gateway
              や分割が必要なわけではありません。規模と運用体制に応じて、
              次のような段階で構成を選びます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  モノリス構成
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  1
                  つのアプリにすべての機能を入れる。クライアントは単一のバックエンドを直接呼ぶ。
                </p>
                <p
                  className="text-xs text-primary font-medium"
                  style={{ fontSize: 13 }}
                >
                  向く場面: 小〜中規模、少人数、立ち上げ初期
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  サービス分割構成
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  役割ごとにサービスを分け、前段に API Gateway
                  を置く。チームごとに独立して開発・デプロイする。
                </p>
                <p
                  className="text-xs text-primary font-medium"
                  style={{ fontSize: 13 }}
                >
                  向く場面: 大規模、複数チーム、独立リリースが必要
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              仕様の比較表ではサービス分割が常に優れて見えがちですが、実測では
              分割は運用コスト（デプロイ・監視・分散トレーシング）を伴います。理由は、
              ネットワークをまたぐ呼び出しと独立したデプロイ対象が増えるからです。
              まずモノリスで始め、痛みが見えてから分割と Gateway
              を入れる順序が、多くのチームで無難な選択になります。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="BFF と API Gateway を併用する典型的な構成として正しいのはどれ？"
              options={[
                {
                  label:
                    "BFF が Gateway を内包し、両者は必ず同一プロセスで動く",
                },
                {
                  label:
                    "フロントが API Gateway を呼び、Gateway がクライアント種別ごとの BFF へ振り分け、BFF が背後のサービス群を呼ぶ",
                  correct: true,
                },
                {
                  label:
                    "Gateway はフロント専用、BFF はサービス共通の入口になる",
                },
                { label: "両者は排他で、どちらか一方しか同じ系では使えない" },
              ]}
              explanation="BFF はフロント側を向いた画面ごとの集約・整形層、API Gateway はサービス側を向いた共通の入口です。Microsoft の BFF パターンは、クライアント → Gateway → クライアント種別ごとの BFF → マイクロサービス群という並びを示しています。画面最適化は BFF、共通の認証やレート制限は入口の Gateway と責務が分かれます。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Microsoft - API Gateway パターン",
                  url: "https://learn.microsoft.com/ja-jp/azure/architecture/microservices/design/gateway",
                  description:
                    "マイクロサービスにおける API Gateway の役割と設計を整理した公式ガイド",
                },
                {
                  title: "AWS - Amazon API Gateway とは何ですか?",
                  url: "https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/welcome.html",
                  description:
                    "API Gateway の認証・監視・デプロイを公式開発者ガイドが概観",
                },
                {
                  title: "Sam Newman - Backends For Frontends",
                  url: "https://samnewman.io/patterns/architectural/bff/",
                  description:
                    "BFF と Gateway の違いと併用を理解するための一次情報",
                },
                {
                  title: "nginx - Reverse Proxy",
                  url: "https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/",
                  description:
                    "API Gateway の土台となるリバースプロキシの設定リファレンス",
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
