import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

export default function NetworkVpc() {
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
            ネットワークと VPC
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            VPC（Virtual Private Cloud）は、AWS
            の中に作る自分専用のネットワークです。
            サーバーやデータベースを「どのネットワークの・どの区画に・どうつなぐか」を決める土台で、
            セキュリティと可用性に直結します。この章では、VPC の構成要素と
            典型的なネットワーク設計を、図とルール例で掴みます。
          </p>
        </div>

        <WhyNowBox
          tags={["VPC", "サブネット", "セキュリティグループ", "CIDR", "NAT"]}
        >
          <p>
            「DB
            に外部から直接つながらないようにしたい」「アプリサーバーはインターネットに出したいが
            DB
            は隠したい」——こうした要件は、ネットワークの区画分けで実現します。
            VPC を理解すると、設計図の「なぜこの構成なのか」が読めるようになり、
            セキュリティの抜け穴にも気づきやすくなります。アプリのコードと同じくらい、
            <strong>どこに置くか</strong>が安全性を決めます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* VPC とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              VPC とは — 自分専用の仮想ネットワーク
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              VPC は、AWS
              のリージョン内に作る論理的に隔離されたネットワーク空間です。
              この中に EC2 や RDS などのリソースを配置します。
              他のアカウントや他の VPC
              とは原則として分離されており、明示的に接続を設定しない限り
              外からは見えません。自社オフィスにネットワークを引くのに似た感覚で、
              AWS 上に自分のネットワークを設計するイメージです。
            </p>

            <InfoBox type="info" title="VPC はリージョンに属する">
              VPC は 1 つのリージョン内に作られ、その中の複数の AZ
              にまたがってサブネットを配置できます。 リージョンをまたぐ VPC
              は作れないため、地理的に分散させたい場合は リージョンごとに VPC
              を用意し、必要に応じて接続します。
            </InfoBox>
          </section>

          {/* CIDR とサブネット */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CIDR とサブネット
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              VPC を作るときは、使う IP アドレスの範囲を <strong>CIDR</strong>
              （例: <code>10.0.0.0/16</code>）で指定します。
              <code>/16</code> は「先頭 16 ビットが固定」という意味で、約 6.5
              万個のアドレスを表します。 この大きな範囲を、さらに小さな
              <strong>サブネット</strong>（例: <code>10.0.1.0/24</code>
              ）に分割し、 用途や AZ ごとにリソースを配置します。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="text-left font-bold p-3 border-b border-border">
                      表記
                    </th>
                    <th className="text-left font-bold p-3 border-b border-border">
                      意味
                    </th>
                    <th className="text-left font-bold p-3 border-b border-border">
                      おおよそのアドレス数
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border font-mono text-foreground">
                      10.0.0.0/16
                    </td>
                    <td className="p-3 border-b border-border">
                      VPC 全体に割り当てる広い範囲
                    </td>
                    <td className="p-3 border-b border-border">約 65,536</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border font-mono text-foreground">
                      10.0.1.0/24
                    </td>
                    <td className="p-3 border-b border-border">
                      1 つのサブネット
                    </td>
                    <td className="p-3 border-b border-border">256</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-foreground">
                      10.0.1.0/28
                    </td>
                    <td className="p-3">小さな区画</td>
                    <td className="p-3">16</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              仕様上のアドレス数と、実際に使える数はわずかにずれます。各サブネットでは
              AWS が予約する 5 個のアドレスがあるため、<code>/24</code> の 256
              個のうち利用できるのは 251 個です。
              「計算上の数より少し少ない」という点を覚えておくと、設計時に困りません。
            </p>
          </section>

          {/* パブリック/プライベート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              パブリックサブネットとプライベートサブネット
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              サブネットは、インターネットとの接続関係によって 2
              種類に分けて考えます。
              この区別は「どのルートテーブルに紐づくか」で決まり、サブネット自体に
              public/private という属性があるわけではない点がポイントです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  パブリックサブネット
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  インターネットゲートウェイ経由で外部と直接やり取りできる区画。
                  ロードバランサーや踏み台サーバーなど、外部に面するリソースを置く。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  プライベートサブネット
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  外部から直接アクセスできない区画。DB
                  やアプリサーバーなど、隠したいリソースを置く。外への通信は NAT
                  経由でおこなう。
                </p>
              </div>
            </div>
          </section>

          {/* ゲートウェイとルートテーブル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ゲートウェイとルートテーブル
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              サブネットがどこへ通信できるかは、<strong>ルートテーブル</strong>
              （宛先ごとの行き先表）で決まります。
              外部との出入り口になるのが各種ゲートウェイです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  インターネットゲートウェイ（IGW）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  VPC
                  とインターネットをつなぐ出入り口。これをルートテーブルに設定したサブネットが
                  「パブリック」になる。双方向の通信が可能。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  NAT ゲートウェイ
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  プライベートサブネットから外への通信だけを許す出口。
                  外からの接続は受け付けないため、DB
                  を隠したままパッケージ更新などの外部通信ができる。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              ルートテーブルは「この宛先（CIDR）への通信は、この出口（ターゲット）へ送る」という対応表です。
              下はパブリックサブネット用ルートテーブルのイメージです。
            </p>

            <CodeBlock
              language="bash"
              title="パブリックサブネットのルートテーブル（イメージ）"
              code={`# 宛先 (Destination)      ターゲット (Target)
10.0.0.0/16              local        # VPC 内部はそのまま
0.0.0.0/0                igw-xxxxxxxx # それ以外（外部）は IGW へ`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="プライベートサブネットに置いた DB サーバーから、外部のパッケージ更新サーバーへ通信させたい。適切な構成はどれ？"
              options={[
                { label: "DB をパブリックサブネットに移す" },
                {
                  label: "NAT ゲートウェイ経由で外への通信のみを許可する",
                  correct: true,
                },
                { label: "インターネットゲートウェイを DB に直接付ける" },
                { label: "ルートテーブルを削除する" },
              ]}
              explanation="NAT ゲートウェイは、プライベートサブネットからの「外への通信」だけを許し、外からの接続は受け付けません。DB をインターネットに公開せずに、更新などの外部通信だけを可能にできます。"
            />
          </section>

          {/* セキュリティグループ vs NACL */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              セキュリティグループとネットワーク ACL の違い
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              通信を制御する仕組みは 2
              層あります。リソース単位で守るセキュリティグループと、サブネット単位で守る
              ネットワーク
              ACL（NACL）です。役割が異なるため、両者の違いを押さえておきます。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="text-left font-bold p-3 border-b border-border">
                      観点
                    </th>
                    <th className="text-left font-bold p-3 border-b border-border">
                      セキュリティグループ
                    </th>
                    <th className="text-left font-bold p-3 border-b border-border">
                      ネットワーク ACL
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      適用対象
                    </td>
                    <td className="p-3 border-b border-border">
                      リソース（EC2 等）単位
                    </td>
                    <td className="p-3 border-b border-border">
                      サブネット単位
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      状態
                    </td>
                    <td className="p-3 border-b border-border">
                      ステートフル（戻りの通信は自動許可）
                    </td>
                    <td className="p-3 border-b border-border">
                      ステートレス（戻りも明示が必要）
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      ルール
                    </td>
                    <td className="p-3 border-b border-border">
                      許可（Allow）のみ
                    </td>
                    <td className="p-3 border-b border-border">
                      許可と拒否（Deny）の両方
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      主な使いどころ
                    </td>
                    <td className="p-3">日常的な通信制御の主役</td>
                    <td className="p-3">サブネット全体の補助的な防御</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-6 mb-4 leading-relaxed">
              実務ではセキュリティグループが主役です。下は、Web
              サーバー用セキュリティグループのインバウンドルール例です。
            </p>

            <CodeBlock
              language="bash"
              title="Web サーバー用セキュリティグループ（インバウンド）"
              code={`# タイプ   ポート  ソース            用途
HTTPS    443     0.0.0.0/0         # 全世界からの HTTPS を許可
HTTP     80      0.0.0.0/0         # 全世界からの HTTP を許可
SSH      22      203.0.113.10/32   # 管理者の固定 IP からのみ SSH 許可`}
            />

            <InfoBox type="warning" title="0.0.0.0/0 の SSH 開放は避ける">
              管理用の SSH（ポート 22）を <code>0.0.0.0/0</code>
              （全世界）に開放すると、 総当たり攻撃の標的になります。SSH
              は管理者の固定 IP だけに絞るか、踏み台サーバーや Session Manager
              経由に限定するのが安全です。
            </InfoBox>
          </section>

          {/* 3層構成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              典型的な 3 層構成
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Web アプリでよく使われるのが、ロードバランサー層・アプリ層・DB
              層を ネットワークで分ける 3
              層構成です。外に面する部分だけを公開し、奥にいくほど隠す——
              という多層防御の考え方が表れています。下はテキストでの構成イメージです。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <CodeBlock
                language="bash"
                title="3 層構成の配置イメージ"
                code={`インターネット
      |
   [ IGW ]
      |
┌─────────────────────────── VPC (10.0.0.0/16) ───────────────────────────┐
│                                                                          │
│  パブリックサブネット (10.0.1.0/24)                                       │
│     └─ ALB（ロードバランサー） ← 外部からのアクセス受付                   │
│                                                                          │
│  プライベートサブネット A (10.0.11.0/24)                                  │
│     └─ アプリサーバー（EC2 / ECS） ← ALB からのみ受け付ける              │
│                                                                          │
│  プライベートサブネット B (10.0.21.0/24)                                  │
│     └─ データベース（RDS） ← アプリサーバーからのみ受け付ける            │
│                                                                          │
└──────────────────────────────────────────────────────────────────────┘`}
              />
            </div>

            <p className="text-muted-foreground leading-relaxed">
              外部からアクセスできるのは ALB だけで、アプリサーバーは ALB
              からの通信のみ、 DB
              はアプリサーバーからの通信のみを受け付けるようセキュリティグループで絞ります。
              さらに各層を複数 AZ に分散させると、可用性も高められます。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="セキュリティグループとネットワーク ACL の違いとして正しいものはどれ？"
              options={[
                {
                  label:
                    "セキュリティグループはサブネット単位、NACL はリソース単位で適用される",
                },
                {
                  label:
                    "セキュリティグループはステートフルで許可ルールのみ、NACL はステートレスで許可と拒否の両方を書ける",
                  correct: true,
                },
                {
                  label: "どちらも拒否（Deny）ルールしか書けない",
                },
                {
                  label: "セキュリティグループは VPC をまたいで適用される",
                },
              ]}
              explanation="セキュリティグループはリソース単位・ステートフルで、許可ルールのみを書きます（戻りの通信は自動で許可）。ネットワーク ACL はサブネット単位・ステートレスで、許可と拒否の両方を書け、戻りの通信も明示が必要です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Amazon VPC ユーザーガイド",
                  url: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html",
                  description:
                    "VPC・サブネット・ルートテーブルなど中心概念の公式解説",
                },
                {
                  title: "VPC のセキュリティグループ",
                  url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",
                  description:
                    "ステートフルなリソース単位のファイアウォールの仕組みとルール設計",
                },
                {
                  title: "ネットワーク ACL（NACL）",
                  url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html",
                  description:
                    "サブネット単位・ステートレスな通信制御の公式ドキュメント",
                },
                {
                  title: "NAT ゲートウェイ",
                  url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html",
                  description:
                    "プライベートサブネットから外部への通信を実現する仕組み",
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
