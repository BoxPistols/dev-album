import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const ec2Concepts = [
  {
    title: "AMI（Amazon Machine Image）",
    examples: "OS + 初期設定のテンプレート",
    description:
      "インスタンスを起動する元になるイメージ。OS や必要なソフトをあらかじめ含めておけば、同じ構成のサーバーを何台でも同じ状態で立ち上げられる。",
  },
  {
    title: "インスタンスタイプ",
    examples: "t3.micro / m5.large / c5.xlarge",
    description:
      "CPU・メモリ・ネットワーク性能の組み合わせ。t 系は汎用で小規模向け、m 系はバランス型、c 系は計算重視——というように用途で選ぶ。",
  },
  {
    title: "user-data",
    examples: "起動時に走る初期化スクリプト",
    description:
      "インスタンス起動時に一度だけ実行されるスクリプト。パッケージのインストールやアプリの配置を自動化できる。",
  },
];

const models = [
  {
    title: "EC2（仮想サーバー）",
    examples: "OS から自分で管理",
    description:
      "もっとも自由度が高い。OS のバージョン・常駐プロセス・ミドルウェアを細かく制御できる代わりに、パッチ適用やスケール設計を自分で担う。",
  },
  {
    title: "ECS / Fargate（コンテナ）",
    examples: "Docker イメージを動かす",
    description:
      "コンテナ単位でアプリを動かす。Fargate ならサーバー管理が不要で、コンテナの実行に集中できる。EC2 とサーバーレスの中間の位置づけ。",
  },
  {
    title: "Lambda（サーバーレス）",
    examples: "関数を置くだけで実行",
    description:
      "イベントに応じて関数を実行する。サーバーの存在を意識せず、実行時間ぶんだけ課金される。常時稼働しない処理やイベント駆動に向く。",
  },
];

export default function Compute() {
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
            コンピュート（EC2 / ECS / Lambda）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            「コードを実際に動かす場所」を選ぶのがコンピュートサービスです。 AWS
            には自由度の高い仮想サーバー（EC2）から、コンテナ（ECS / Fargate）、
            サーバーレス（Lambda）まで、抽象度の異なる選択肢があります。
            この章では 3
            つの実行モデルの特徴と、運用負荷とのトレードオフを比較しながら掴みます。
          </p>
        </div>

        <WhyNowBox
          tags={["EC2", "ECS", "Lambda", "Auto Scaling", "サーバーレス"]}
        >
          <p>
            「サーバーを立てる」と一口に言っても、AWS
            には抽象度の異なる方法が複数あります。
            どれを選ぶかで、運用にかかる手間・スケールのしやすさ・コストの形が変わります。
            正解は一つではなく、<strong>処理の性質に合わせて選ぶ</strong>
            のが現実的です。
            選択肢の地図を持っておくと、設計の議論についていけるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* EC2 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              EC2 — 仮想サーバーという基本形
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              EC2（Elastic Compute Cloud）は、AWS
              上に仮想サーバーを立てるサービスです。 手元の PC のように OS
              を選んでログインし、好きなソフトを入れて動かせます。
              自由度が高い反面、OS
              のアップデートや監視など、運用の責任も自分側に多く残ります。 EC2
              を理解するうえで欠かせないのが、次の 3 つの概念です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {ec2Concepts.map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {c.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {c.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              起動時の初期化は user-data
              スクリプトで自動化できます。下は、起動と同時に Web
              サーバーを立ち上げる例です。
            </p>

            <CodeBlock
              language="bash"
              title="EC2 起動時に実行する user-data（例）"
              code={`#!/bin/bash
# パッケージを更新して nginx をインストール・起動する
yum update -y
yum install -y nginx
systemctl enable nginx
systemctl start nginx

# 動作確認用のページを配置
echo "<h1>Hello from EC2</h1>" > /usr/share/nginx/html/index.html`}
            />
          </section>

          {/* Auto Scaling と ALB */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Auto Scaling とロードバランサー（ALB）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              1 台のサーバーには性能の上限があります。アクセスが増えたときは、
              サーバーを<strong>増やす（スケールアウト）</strong>のが基本です。
              これを自動化するのが Auto
              Scaling、増えたサーバーへ通信を振り分けるのが
              ロードバランサー（ALB）です。両者を組み合わせると、負荷に応じて台数が伸縮し、
              障害が起きたサーバーは自動で切り離されます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Auto Scaling
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  負荷やスケジュールに応じてインスタンス数を自動で増減する。
                  最小・最大・希望の台数を決めておけば、AWS が調整してくれる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Application Load Balancer（ALB）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  受け取ったリクエストを複数のサーバーへ振り分ける。 HTTP/HTTPS
                  に対応し、ヘルスチェックで不調なサーバーを除外する。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="スケールアウトとスケールアップ">
              台数を増やすのが「スケールアウト」、1
              台の性能（インスタンスタイプ）を上げるのが「スケールアップ」です。
              Web アプリの負荷対策では、台数を増やすスケールアウト +
              ロードバランサーの組み合わせが基本になります。
            </InfoBox>
          </section>

          {/* コンテナ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              コンテナ（ECS / Fargate）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              コンテナは、アプリと実行に必要な環境をひとまとめにしたものです。
              「自分の PC
              では動くのに本番で動かない」を減らせるため、近年の標準的な配布形態になっています。
              AWS でコンテナを動かす中心が ECS（Elastic Container Service）で、
              その実行基盤として<strong>Fargate</strong>
              を選ぶと、サーバー（EC2）の管理が不要になります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              EC2 上でコンテナを動かす方式もありますが、その場合は EC2
              自体の管理が残ります。 Fargate
              は「コンテナを動かすためのサーバー」を AWS
              に任せられるため、運用の負担が軽くなります。 EC2
              とサーバーレスの中間に位置する選択肢と捉えると整理しやすくなります。
            </p>

            <InfoBox type="info" title="ECS と Fargate の関係">
              ECS は「コンテナをどう動かすか」を管理するサービス、Fargate
              は「どこで動かすか」の実行基盤の一つです。 ECS の実行基盤として
              Fargate を選ぶと、サーバーのプロビジョニングや
              パッチ適用を意識せずにコンテナを動かせます。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="アクセス数の増減に応じて EC2 の台数を自動で増減させたい。組み合わせるべきものはどれ？"
              options={[
                { label: "IAM ポリシーと S3" },
                {
                  label: "Auto Scaling とロードバランサー（ALB）",
                  correct: true,
                },
                { label: "CloudFront と VPC" },
                { label: "AMI と user-data だけ" },
              ]}
              explanation="Auto Scaling が負荷に応じて台数を増減させ、ロードバランサー（ALB）が増えたサーバーへリクエストを振り分けます。両者を組み合わせることで、負荷の変動に追従しつつ、不調なサーバーを自動で切り離せます。"
            />
          </section>

          {/* Lambda */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              サーバーレス（Lambda）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Lambda は、サーバーを意識せずに「関数」を実行できるサービスです。
              何らかのイベント（HTTP
              リクエスト、ファイルのアップロード、スケジュールなど）をきっかけに
              関数が呼び出され、処理が終われば停止します。常時稼働しないため、
              実行された時間とリクエスト数に対してだけ課金されます。
            </p>

            <CodeBlock
              language="js"
              title="Lambda ハンドラ（Node.js）の例"
              code={`// Lambda は event を受け取り、結果を返す「関数」を書くだけ
export const handler = async (event) => {
  const name = event.queryStringParameters?.name ?? "world";

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: \`Hello, \${name}\` }),
  };
};`}
            />

            <InfoBox type="warning" title="コールドスタートという実測のずれ">
              Lambda
              は「呼ばれたら即実行」と説明されますが、しばらく使われていない関数が
              久しぶりに呼ばれると、起動準備のぶん最初の応答が遅れることがあります（コールドスタート）。
              仕様上は「イベントで起動」でも、実測では初回に数百ミリ秒以上かかる場合がある、という点を
              レイテンシが重要な処理では考慮します。
            </InfoBox>
          </section>

          {/* 比較表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3 つの実行モデルの使い分け
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              EC2・コンテナ・Lambda は、抽象度（どこまで AWS
              に任せるか）が異なります。
              抽象度が上がるほど運用の手間は減りますが、制御できる範囲は狭くなります。
              処理の性質に合わせて選ぶのが基本です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {models.map((m) => (
                <div
                  key={m.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {m.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {m.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="text-left font-bold p-3 border-b border-border">
                      観点
                    </th>
                    <th className="text-left font-bold p-3 border-b border-border">
                      EC2
                    </th>
                    <th className="text-left font-bold p-3 border-b border-border">
                      ECS / Fargate
                    </th>
                    <th className="text-left font-bold p-3 border-b border-border">
                      Lambda
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      管理の度合い
                    </td>
                    <td className="p-3 border-b border-border">
                      OS まで自分で管理
                    </td>
                    <td className="p-3 border-b border-border">
                      コンテナに集中（Fargate）
                    </td>
                    <td className="p-3 border-b border-border">関数だけ書く</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      運用負荷
                    </td>
                    <td className="p-3 border-b border-border">高い</td>
                    <td className="p-3 border-b border-border">中</td>
                    <td className="p-3 border-b border-border">低い</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      課金の形
                    </td>
                    <td className="p-3 border-b border-border">
                      起動している時間
                    </td>
                    <td className="p-3 border-b border-border">
                      割り当てたリソース時間
                    </td>
                    <td className="p-3 border-b border-border">
                      実行回数と実行時間
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      向いている処理
                    </td>
                    <td className="p-3">常時稼働・細かな制御が必要</td>
                    <td className="p-3">コンテナ化済みの常駐サービス</td>
                    <td className="p-3">イベント駆動・断続的な処理</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              「マネージドの度合いが上がるほど運用は楽になるが、制御は減る」というトレードオフが核心です。
              常時稼働して細かな制御が要る処理は EC2、コンテナ化済みのサービスは
              ECS/Fargate、 断続的・イベント駆動の処理は
              Lambda——と性質で選ぶと、過不足のない構成になります。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="「マネージドの度合い」と「運用負荷」のトレードオフとして正しいものはどれ？"
              options={[
                {
                  label: "マネージドの度合いが上がるほど運用負荷も上がる",
                },
                {
                  label:
                    "マネージドの度合いが上がるほど運用負荷は下がるが、制御できる範囲は狭くなる",
                  correct: true,
                },
                {
                  label: "Lambda は EC2 より常に制御範囲が広い",
                },
                {
                  label: "どのモデルも運用負荷と制御範囲は同じ",
                },
              ]}
              explanation="EC2 → コンテナ → Lambda の順でマネージドの度合いが上がり、運用負荷は下がります。その代わり、OS やミドルウェアなど自分で制御できる範囲は狭くなります。この性質を踏まえ、処理の性質に合わせて選ぶのが基本です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Amazon EC2 ユーザーガイド",
                  url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html",
                  description:
                    "AMI・インスタンスタイプ・user-data など EC2 の中心概念の公式解説",
                },
                {
                  title: "Amazon ECS 開発者ガイド",
                  url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html",
                  description:
                    "コンテナのオーケストレーションと Fargate の概要",
                },
                {
                  title: "AWS Lambda 開発者ガイド",
                  url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
                  description:
                    "サーバーレス関数の仕組み・ハンドラ・イベントソースの公式ガイド",
                },
                {
                  title: "Elastic Load Balancing（ALB）",
                  url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html",
                  description:
                    "リクエストを複数サーバーに振り分けるロードバランサーの解説",
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
