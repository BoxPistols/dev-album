import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const tools = [
  {
    title: "Terraform",
    examples: "HCL / 宣言的",
    description:
      "HashiCorp が開発する宣言的 IaC ツール。HCL という専用言語で「あるべき状態」を記述し、state と差分を取って適用する。プロバイダが豊富で、複数クラウドにまたがる構成にも使える。",
  },
  {
    title: "Pulumi",
    examples: "TypeScript / Python など",
    description:
      "汎用プログラミング言語でインフラを記述できる IaC ツール。ループや条件分岐を言語の機能でそのまま書ける。型やテストなど既存のエコシステムを活かしたいときに向く。",
  },
  {
    title: "クラウド純正",
    examples: "CloudFormation / Bicep",
    description:
      "各クラウドベンダが提供する純正の IaC。対象クラウドに密着していて新機能への追従が速い一方、他クラウドへの移植性は低い。",
  },
];

export default function Iac() {
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
            Infrastructure as Code
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Infrastructure as
            Code（IaC）は、サーバやネットワークといったインフラの構成を
            コードとして記述し、バージョン管理・レビュー・再現を可能にする手法です。
            手動構築の何が問題なのか、宣言的という考え方、Terraform と Pulumi、
            べき等性・state 管理・plan→apply
            のフロー、そしてドリフトと再現性までを順に見ていきます。
          </p>
        </div>

        <WhyNowBox tags={["IaC", "Terraform", "Pulumi", "宣言的", "state"]}>
          <p>
            「あのサーバ、誰がどう設定したか分からない」という状態は、
            手作業でインフラを組むと避けがたく生まれます。 IaC
            は、その設定をコードに書き出すことで、
            <strong>構成を読めて・レビューできて・もう一度作れる</strong>
            ものに変えます。
            重要なのはツールの操作より、「あるべき状態を宣言し、現実をそこへ寄せる」という考え方です。
            この発想を持つと、インフラの変更が GitHub
            の差分のように扱えるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手動構築の何が問題か
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              管理画面をクリックして作ったインフラは、その場では動きます。
              しかし記録が残るのは「結果の状態」だけで、
              <strong>どういう意図でどの順に設定したか</strong>
              は人の記憶に残ります。
              同じ環境をもう一つ作ろうとすると手順が再現できず、
              本番とステージングの差（環境差異）が静かに広がっていきます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              IaC は、この手順を構成ファイルとして書き出します。
              変更は差分としてレビューでき、履歴は Git に残り、
              同じファイルを適用すれば同じ環境が再現されます。
              「手順書」ではなく「実行可能な定義」を持つのが要点です。
            </p>

            <InfoBox type="warning" title="手順書は腐る、コードは検証できる">
              手順を文章で残しても、UI の変更や設定項目の増加でずれていきます。
              IaC
              は定義そのものを実行するため、ずれがあれば適用時に表面化します。
              「ドキュメントとしての手順書」から「検証可能な定義」への移行が IaC
              の本質です。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              宣言的 と 命令的
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              IaC のアプローチは大きく二つに分かれます。
              <strong>命令的</strong>
              は「何をどの順で実行するか」を手順として書く方式、
              <strong>宣言的</strong>
              は「最終的にどうあってほしいか」だけを書き、
              そこへ至る手順はツールに任せる方式です。 Terraform
              は宣言的の代表で、現在の状態と望む状態の差分を計算して適用します。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 text-foreground font-bold border-b border-border">
                      観点
                    </th>
                    <th className="text-left p-3 text-foreground font-bold border-b border-border">
                      命令的
                    </th>
                    <th className="text-left p-3 text-foreground font-bold border-b border-border">
                      宣言的
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">
                      書くもの
                    </td>
                    <td className="p-3 text-muted-foreground">実行する手順</td>
                    <td className="p-3 text-muted-foreground">あるべき状態</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground font-medium">
                      差分の計算
                    </td>
                    <td className="p-3 text-muted-foreground">自分で考える</td>
                    <td className="p-3 text-muted-foreground">ツールが計算</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-foreground font-medium">再実行</td>
                    <td className="p-3 text-muted-foreground">副作用に注意</td>
                    <td className="p-3 text-muted-foreground">
                      同じ結果に収束
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Terraform と Pulumi
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              代表的なツールを整理します。 Terraform は HCL
              という専用言語で記述し、宣言に集中できます。 Pulumi は TypeScript
              や Python などの汎用言語で書けるため、
              ループや型を言語の機能としてそのまま使えます。
              どちらが優れているという話ではなく、
              チームの言語資産と構成の複雑さで選び分けます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tools.map((t) => (
                <div
                  key={t.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {t.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {t.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t.description}
                  </p>
                </div>
              ))}
            </div>

            <CodeBlock
              language="hcl"
              title="main.tf — S3 バケットの宣言（Terraform）"
              code={`terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-northeast-1"
}

resource "aws_s3_bucket" "assets" {
  bucket = "dev-album-assets"

  tags = {
    Environment = "production"
    ManagedBy   = "terraform"
  }
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>resource</code>{" "}
              ブロックが「このバケットがあってほしい」という宣言です。
              実行する手順は書きません。Terraform が現状と比べ、
              足りなければ作成、設定が違えば更新、定義から消えれば削除します。
            </p>
          </section>

          <section>
            <Quiz
              question="宣言的 IaC（Terraform など）の特徴として正しいのはどれ？"
              options={[
                {
                  label:
                    "リソースを作成する手順を順番どおりに記述し、その通りに実行する",
                },
                {
                  label:
                    "あるべき状態を記述し、現状との差分はツールが計算して適用する",
                  correct: true,
                },
                { label: "毎回すべてのリソースを削除してから作り直す" },
                { label: "state を持たず、常に手動で差分を確認する必要がある" },
              ]}
              explanation="宣言的 IaC では「最終的にどうあってほしいか」だけを書きます。現在の状態（state）と望む状態を比較して必要な差分をツールが計算するため、同じ定義を何度適用しても同じ状態に収束します。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              べき等性・state・plan→apply
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              宣言的 IaC を支えるのが<strong>べき等性</strong>です。
              同じ定義を何度適用しても、結果は同じ状態に収束します。
              これを実現するために Terraform は <strong>state</strong>
              （現在の状態の記録）を持ち、 定義と state
              を突き合わせて差分を出します。 実際の運用は <code>plan</code>{" "}
              で差分を確認し、
              <code>apply</code> で適用する二段構えが基本です。
            </p>

            <CodeBlock
              language="bash"
              title="plan で差分を確認してから apply"
              code={`# 差分を計算して表示する（変更はしない）
terraform plan

# 内容を確認したうえで適用する
terraform apply`}
            />

            <InfoBox type="warning" title="state は信頼の源、扱いに注意">
              state
              にはリソースの識別子に加え、機微な値が含まれることがあります。
              チーム運用では state
              をローカルに置かず、ロック機能を持つリモートバックエンドで共有します。
              仕様上は「定義 = 現実」のはずですが、実測では state
              が壊れたりズレたりすると 意図しない再作成が起きるため、state
              の保護とバックアップは最優先で設計します。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ドリフト・モジュール化・再現性
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>ドリフト</strong>
              は、コードの定義と実際のインフラがずれた状態を指します。
              管理画面から手で変更を加えると、state と現実が食い違い、 次の
              apply で意図しない差分が出ます。
              ドリフトを防ぐには「変更は必ずコード経由で行う」という規律が要ります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              構成が大きくなると、繰り返し使う定義を
              <strong>モジュール</strong>として切り出します。
              同じ構成を環境ごとに変数だけ変えて再利用でき、 staging と
              production の差を小さく保てます。 モジュール化と state
              管理が揃って、はじめて
              「同じ環境をもう一度作れる」という再現性が成立します。
            </p>
          </section>

          <section>
            <Quiz
              question="管理コンソールから手動でリソースを変更した結果、Terraform の定義と実際のインフラがずれた状態を何と呼ぶ？"
              options={[
                { label: "べき等性（idempotency）" },
                { label: "ドリフト（drift）", correct: true },
                { label: "ロールバック（rollback）" },
                { label: "プロビジョニング（provisioning）" },
              ]}
              explanation="コードの定義と実際のインフラがずれた状態をドリフトと呼びます。手動変更が主な原因で、次の plan/apply で意図しない差分として現れます。変更は常にコード経由で行うことがドリフトを防ぐ基本です。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Terraform Documentation",
                  url: "https://developer.hashicorp.com/terraform/docs",
                  description:
                    "HCL の構文、state、plan/apply、モジュールの公式リファレンス",
                },
                {
                  title: "Terraform - State の管理",
                  url: "https://developer.hashicorp.com/terraform/language/state",
                  description: "state の役割とリモートバックエンドによる共有",
                },
                {
                  title: "Pulumi Documentation",
                  url: "https://www.pulumi.com/docs/",
                  description:
                    "汎用言語で IaC を書く Pulumi の概念とチュートリアル",
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
