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

const pillars = [
  {
    title: "運用上の優秀性",
    description:
      "システムを動かし、監視し、改善し続ける力。手順の自動化や、変更を小さく頻繁に行う仕組みづくりを扱う。",
  },
  {
    title: "セキュリティ",
    description:
      "データと権限を守る。最小権限・暗号化・監査ログ・脅威検知など、守りの設計をまとめた柱。",
  },
  {
    title: "信頼性",
    description:
      "障害から回復し、需要の変化に応える力。冗長化・自動復旧・バックアップ・スケールが論点になる。",
  },
  {
    title: "パフォーマンス効率",
    description:
      "リソースを効率よく使い、需要に合わせて選び直す。適切なサービス選定とスケール方式を扱う。",
  },
  {
    title: "コスト最適化",
    description:
      "不要な支出を避け、価値に対して払う。料金の可視化・適正サイズ化・購入オプションの活用が中心。",
  },
  {
    title: "持続可能性",
    description:
      "ワークロードの環境負荷を抑える。リソースの効率利用やマネージドサービスの活用で消費を下げる。",
  },
];

export default function CostOps() {
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
            コスト管理と Well-Architected
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            クラウドは「使った分だけ払う」従量課金です。便利な反面、
            気づかないうちに料金が積み上がることもあります。
            ここでは、コストを可視化して制御する仕組みと、監視・監査の基本、
            そして AWS の設計指針である Well-Architected
            フレームワークを一通り押さえます。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "コスト",
            "Budgets",
            "CloudWatch",
            "CloudTrail",
            "Well-Architected",
          ]}
        >
          <p>
            個人開発でも実務でも、最初にぶつかりやすいのが「思ったより請求が高い」問題です。
            原因の多くは、消し忘れたリソースや、無料枠の上限超過、想定外のデータ転送量です。
            これらは、料金の見える化とアラートの設定で、早い段階で気づけます。
            さらに Well-Architected の 6 本柱を知っておくと、
            コストだけでなく信頼性やセキュリティも含めて構成を点検する視点が持てます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 従量課金の考え方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              従量課金と「気づいたら高額」を避ける
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AWS の料金は基本的に
              <strong>使った分だけ後払い</strong>です。
              サーバの稼働時間、ストレージの保管量、データ転送量などが積み上がって請求になります。
              月額固定ではないため、リソースを立てっぱなしにしたり、
              大きなインスタンスを動かし続けたりすると、料金が静かに増えていきます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「気づいたら高額」を避けるコツはシンプルです。
              <strong>使い終わったリソースは消す</strong>、
              <strong>料金を定期的に見る</strong>、
              <strong>上限に近づいたら通知が来るようにする</strong>。 この 3
              つを最初に仕込んでおけば、想定外の請求はかなり防げます。
            </p>

            <InfoBox type="warning" title="消し忘れやすいもの">
              停止したつもりの EC2 にひもづく EBS ボリューム、使われていない
              Elastic IP、放置されたロードバランサや NAT ゲートウェイは、
              動いていなくても課金され続けることがあります。
              リソースを作ったら「いつ・誰が消すか」をセットで決めておくと安全です。
            </InfoBox>
          </section>

          {/* 料金の可視化ツール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Billing・Cost Explorer・Budgets
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              料金を扱うツールは役割で分かれています。まず全体像を眺め、
              次に内訳を分析し、最後に上限を超えそうなときに通知する、という流れです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Billing（請求ダッシュボード）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  今月いくらかかっているか、サービス別の概算を把握する入り口。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Cost Explorer
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  期間・サービス・タグ別に費用を可視化し、傾向を分析する。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Budgets（予算）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  月額や使用量の上限を決め、超えそうになったらメールや SNS
                  で通知する。
                </p>
              </div>
            </div>

            <CodeBlock
              language="json"
              title="月 50 USD の予算と 80% 到達でのアラート定義（概念例）"
              code={`{
  "BudgetName": "monthly-cost-guard",
  "BudgetType": "COST",
  "TimeUnit": "MONTHLY",
  "BudgetLimit": { "Amount": "50", "Unit": "USD" },
  "Notification": {
    "ComparisonOperator": "GREATER_THAN",
    "NotificationType": "ACTUAL",
    "Threshold": 80,
    "ThresholdType": "PERCENTAGE"
  }
}`}
            />

            <MermaidDiagram
              title="図: コストの可視化から通知までの流れ"
              chart={`flowchart LR
    USE["リソース利用（従量課金）"] --> BILL["Billing（請求の全体像）"]
    USE --> CE["Cost Explorer（内訳の分析）"]
    USE --> BUD["Budgets（上限としきい値）"]
    BUD -->|"しきい値超過"| ALERT["アラート（メール / SNS）"]
    ALERT --> ME["担当者が対処"]`}
            />

            <CodingChallenge
              preview
              previewType="config"
              title="月次予算とアラートの定義を完成させよう"
              description="月 50 USD のコスト予算を作り、実績が 80% に達したら通知する Budgets の定義を埋めてください。BudgetType・Amount・Threshold の穴を埋めます。"
              initialCode={`{
  "BudgetName": "monthly-cost-guard",
  "BudgetType": "___",
  "TimeUnit": "MONTHLY",
  "BudgetLimit": { "Amount": "___", "Unit": "USD" },
  "Notification": {
    "ComparisonOperator": "GREATER_THAN",
    "NotificationType": "ACTUAL",
    "Threshold": ___,
    "ThresholdType": "PERCENTAGE"
  }
}`}
              answer={`{
  "BudgetName": "monthly-cost-guard",
  "BudgetType": "COST",
  "TimeUnit": "MONTHLY",
  "BudgetLimit": { "Amount": "50", "Unit": "USD" },
  "Notification": {
    "ComparisonOperator": "GREATER_THAN",
    "NotificationType": "ACTUAL",
    "Threshold": 80,
    "ThresholdType": "PERCENTAGE"
  }
}`}
              hints={[
                "費用ベースの予算なら BudgetType は COST",
                "月 50 USD の上限なので Amount は 50",
                "80% で通知するなら Threshold は 80",
              ]}
              keywords={["COST", "50", "80"]}
            />
          </section>

          {/* タグによるコスト配分 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              タグによるコスト配分
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              リソースが増えてくると「どのプロジェクトが・どの環境が
              いくら使っているか」を分けて見たくなります。そこで使うのが
              <strong>タグ</strong>です。リソースに
              <code>Project</code> や <code>Environment</code>{" "}
              などのタグを付け、 それを<strong>コスト配分タグ</strong>
              として有効化すると、 Cost Explorer
              でタグ単位の費用を集計できるようになります。
            </p>

            <CodeBlock
              language="bash"
              title="リソースにコスト配分用のタグを付ける（AWS CLI）"
              code={`# EC2 インスタンスに Project / Environment タグを付与
aws ec2 create-tags \\
  --resources i-0123456789abcdef0 \\
  --tags Key=Project,Value=dev-album \\
         Key=Environment,Value=staging`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              タグ付けは早めにルール化しておくと効果的です。
              後からまとめてタグを付け直すのは手間がかかるうえ、
              タグのキーがばらつくと集計が正しく出ません。 「全リソースに
              Project と Environment を必ず付ける」程度の
              シンプルな規約から始めると運用しやすくなります。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="想定外の高額請求を早めに防ぐ仕組みとして最も適切なのはどれ？"
              options={[
                { label: "Cost Explorer でグラフを眺めるだけにする" },
                {
                  label:
                    "Budgets で上限と通知しきい値を設定し、超えそうになったらアラートを受け取る",
                  correct: true,
                },
                { label: "リソースを一切タグ付けしない" },
                { label: "請求は月末に一度だけ確認する" },
              ]}
              explanation="Cost Explorer は分析、Budgets は上限超過の検知に向いています。Budgets で月額や使用量の上限としきい値（例: 80%）を設定しておくと、超えそうになった段階で通知が届き、手遅れになる前に対処できます。可視化と通知をセットで仕込むのが効果的です。"
            />
          </section>

          {/* 無料利用枠 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              無料利用枠の注意点（仕様 vs 実測）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AWS には無料利用枠（Free Tier）があり、学習や検証に役立ちます。
              ただし「無料」と書かれていても、条件を外れると課金される点を理解しておく必要があります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>仕様では</strong>「12 か月無料」「毎月一定量まで無料」
              といった枠が定義されています。
              <strong>実測では</strong>、12 か月の期限を過ぎた、
              無料枠の上限（時間・容量・転送量）を超えた、
              あるいはそもそも無料枠の対象外サービスを使った、
              といった理由で請求が発生することがあります。
              <strong>理由は</strong>
              、無料枠はあくまで「特定の条件下での割引」であり、
              使用量や期間という前提を外れると通常料金に切り替わるためです。
            </p>

            <InfoBox type="info" title="無料枠を安心して使うために">
              無料枠の使用量アラート（Free Tier usage alerts）を有効にし、
              さらに少額（例: 数 USD）の Budgets を併用しておくと、
              「無料のつもりが課金されていた」に早く気づけます。
              無料枠の対象・上限・期限は変動するため、
              利用前に公式ページで現在の条件を確認するのが確実です。
            </InfoBox>
          </section>

          {/* CloudWatch / CloudTrail */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CloudWatch と CloudTrail
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              運用では「システムの状態を見る」仕組みと「誰が何をしたかを記録する」仕組みの
              両方が要ります。前者が CloudWatch、後者が CloudTrail です。
              役割が違うので、セットで理解しておくと監視と監査の設計がしやすくなります。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="text-left p-3 border-b border-border">
                      項目
                    </th>
                    <th className="text-left p-3 border-b border-border">
                      CloudWatch
                    </th>
                    <th className="text-left p-3 border-b border-border">
                      CloudTrail
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border text-foreground font-medium">
                      目的
                    </td>
                    <td className="p-3 border-b border-border">
                      監視（システムの健全性を見る）
                    </td>
                    <td className="p-3 border-b border-border">
                      監査（API 操作の記録を残す）
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border text-foreground font-medium">
                      集める情報
                    </td>
                    <td className="p-3 border-b border-border">
                      メトリクス・ログ・アラーム
                    </td>
                    <td className="p-3 border-b border-border">
                      「誰が・いつ・何を操作したか」の証跡
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-foreground font-medium">
                      代表的な使い方
                    </td>
                    <td className="p-3">
                      CPU 使用率のアラーム、ログの集約・検索
                    </td>
                    <td className="p-3">
                      設定変更や削除操作の追跡、セキュリティ調査
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              CloudWatch
              アラームは、しきい値を超えたときに通知やオートスケールを
              トリガーできます。先ほどの Budgets と組み合わせれば、
              「コストの異常」も「システムの異常」も、どちらも通知で早く気づける構成になります。
            </p>
          </section>

          {/* Well-Architected 6 本柱 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Well-Architected フレームワークの 6 本柱
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Well-Architected フレームワークは、AWS
              上のシステムを点検するための設計指針です。 次の
              <strong>6 本柱</strong>の観点で構成を見直すことで、
              コスト・信頼性・セキュリティなどのバランスを意識した設計に近づけます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-foreground text-base">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              6 本柱は「どれか 1 つだけ満たせばよい」ものではなく、
              トレードオフを見ながらバランスを取るためのチェック観点です。
              たとえばコストを下げると信頼性が落ちることもあるため、
              全体を見渡して判断するための共通言語として使われます。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="CloudWatch と CloudTrail の役割分担として正しいのはどれ？"
              options={[
                {
                  label: "どちらも請求額を計算するための課金ツールである",
                },
                {
                  label:
                    "CloudWatch は監視（メトリクス・ログ・アラーム）、CloudTrail は監査（誰が何を操作したかの記録）",
                  correct: true,
                },
                {
                  label:
                    "CloudWatch は監査ログ専用、CloudTrail は CPU 監視専用",
                },
                {
                  label: "両方とも無料枠の使用量を制限するための機能である",
                },
              ]}
              explanation="CloudWatch はメトリクス・ログ・アラームでシステムの健全性を監視するためのサービス、CloudTrail は「誰がいつ何の API 操作をしたか」を記録する監査のためのサービスです。監視と監査は目的が異なるため、両方をセットで使うと運用とセキュリティの両面をカバーできます。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "AWS Well-Architected フレームワーク",
                  url: "https://aws.amazon.com/architecture/well-architected/",
                  description:
                    "6 本柱の設計指針とレビューの考え方をまとめた公式ページ",
                },
                {
                  title: "AWS Cost Management（Cost Explorer / Budgets）",
                  url: "https://docs.aws.amazon.com/cost-management/latest/userguide/what-is-costmanagement.html",
                  description:
                    "費用の可視化・予算・アラートなどコスト管理機能の公式ドキュメント",
                },
                {
                  title: "AWS 無料利用枠（Free Tier）",
                  url: "https://aws.amazon.com/free/",
                  description:
                    "無料枠の対象サービス・上限・期間を確認できる公式ページ。条件は随時更新される",
                },
                {
                  title: "Amazon CloudWatch ユーザーガイド",
                  url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html",
                  description:
                    "メトリクス・ログ・アラームによる監視を解説した公式ドキュメント",
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
