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

const globalLayers = [
  {
    title: "リージョン（Region）",
    examples: "ap-northeast-1（東京）、us-east-1（バージニア北部）",
    description:
      "地理的に独立したデータセンター群のまとまり。リージョンごとに法令やレイテンシが変わるため、ユーザーに近い場所を選ぶのが基本。リージョン間は明示的に指定しない限り分離されている。",
  },
  {
    title: "アベイラビリティゾーン（AZ）",
    examples: "ap-northeast-1a / 1c / 1d",
    description:
      "1 つのリージョン内にある、電源・ネットワークが独立した複数のデータセンター。複数 AZ にまたがって配置すると、片方の障害でもサービスを継続しやすくなる。",
  },
  {
    title: "エッジロケーション",
    examples: "CloudFront の配信拠点",
    description:
      "世界中に分散したキャッシュ拠点。CloudFront などが利用し、ユーザーに近い場所から静的コンテンツを返すことで応答を速くする。",
  },
];

const serviceMap = [
  {
    title: "コンピュート",
    examples: "EC2 / Lambda",
    description:
      "コードを実行する場所。EC2 は仮想サーバー、Lambda はイベント駆動で関数を実行するサーバーレス。",
  },
  {
    title: "ストレージ",
    examples: "S3",
    description:
      "オブジェクトストレージ。画像・動画・バックアップ・静的サイトなど、ファイル単位のデータを安価に大量保存する。",
  },
  {
    title: "データベース",
    examples: "RDS / DynamoDB",
    description:
      "RDS はマネージドなリレーショナル DB（PostgreSQL/MySQL 等）、DynamoDB はフルマネージドな NoSQL。",
  },
  {
    title: "ネットワーク / 配信",
    examples: "VPC / CloudFront",
    description:
      "VPC は仮想ネットワーク、CloudFront は CDN。リソースをどこに置き、どう外部へ届けるかを担う。",
  },
  {
    title: "認証・認可",
    examples: "IAM",
    description:
      "誰が・どのリソースに・何をできるかを制御する仕組み。すべてのサービス利用の前提になる土台。",
  },
  {
    title: "監視・運用",
    examples: "CloudWatch",
    description:
      "メトリクス・ログ・アラームを集約する。動かした後の「見える化」を担当する。",
  },
];

export default function Overview() {
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
            AWS の全体像と主要サービス
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            AWS（Amazon Web
            Services）は、サーバー・ストレージ・データベース・ネットワークなどを
            必要なときに必要なだけ借りられるクラウドサービスです。
            サービスの数は数百に及びますが、最初に覚えるべきものはごく一部です。
            この章では AWS
            を「地図」として捉え、実務でよく出会う中核サービスがどこに位置するかを掴みます。
          </p>
        </div>

        <WhyNowBox tags={["AWS", "クラウド", "IaaS", "リージョン", "従量課金"]}>
          <p>
            フロントエンドや個人開発では Vercel や Netlify のような PaaS
            で完結することも多いですが、
            チームの規模が大きくなったり、独自のサーバー処理・大容量ストレージ・
            細かなネットワーク制御が必要になると、AWS のような
            <strong>クラウドの土台</strong>に触れる場面が出てきます。
            全部を覚える必要はありません。まず「どのサービスが何の役割か」という地図を持つことで、
            ドキュメントや設計ドキュメントを読んだときに迷子になりにくくなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* AWS とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              AWS とは — 代表的なハイパースケーラー
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AWS は、Microsoft Azure・Google Cloud（GCP）と並ぶ
              <strong>ハイパースケーラー</strong>
              （世界規模のクラウド事業者）の一つです。
              自前でサーバーを買って設置・運用する代わりに、AWS
              のデータセンターにある計算資源を API
              やコンソールから操作して借ります。物理的なハードウェアの調達や故障対応を
              事業者側に任せられるため、アプリ開発者は「何を動かすか」に集中しやすくなります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              提供形態はおおまかに
              IaaS（仮想サーバーやネットワークなど素材に近い層）から、
              マネージドサービス（DB
              やキューなど運用込みで提供される層）まで幅があります。
              同じ「サーバーを動かす」でも、EC2 のように自分で OS
              を管理する方法から、 Lambda
              のようにコードだけ置けば動く方法まで選択肢があるのが特徴です。
            </p>

            <InfoBox type="info" title="「全部使う」必要はない">
              AWS のサービス数は多いですが、Web
              アプリの多くは「コンピュート・ストレージ・DB・ネットワーク・認証・監視」の
              数個を組み合わせて成り立っています。まずこの骨格を押さえれば十分です。
            </InfoBox>
          </section>

          {/* グローバルインフラ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              グローバルインフラの三層
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AWS
              のリソースは「どこに置くか」が常に問われます。その物理的な土台が
              リージョン・アベイラビリティゾーン・エッジロケーションの三層です。
              リージョンを選び、その中の複数 AZ
              に分散させ、配信はエッジに任せる——
              この配置の考え方が可用性とレイテンシを左右します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {globalLayers.map((layer) => (
                <div
                  key={layer.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {layer.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {layer.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>

            <MermaidDiagram
              title="図: グローバルインフラの階層（リージョン > AZ > リソース）"
              chart={`flowchart TD
    G["AWS グローバル"] --> R1["リージョン（東京 ap-northeast-1）"]
    G --> R2["リージョン（バージニア us-east-1）"]
    R1 --> AZ1["AZ 1a"]
    R1 --> AZ2["AZ 1c"]
    AZ1 --> E1["EC2 / RDS など"]
    AZ2 --> E2["EC2 / RDS など"]
    G -.->|"配信"| EDGE["エッジロケーション（CloudFront）"]`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              日本向けサービスなら東京リージョン（ap-northeast-1）を選ぶのが定番です。
              一方で、後述の IAM のような一部のサービスや料金表示は us-east-1
              が基準になることがあり、リージョンの概念は「全サービス一律」ではない点に注意します。
            </p>
          </section>

          {/* 操作手段 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              操作する 3 つの窓口 — コンソール / CLI / SDK
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AWS は同じ操作を複数の方法でおこなえます。学習やトラブル確認は GUI
              の マネジメントコンソール、繰り返し作業や自動化は
              CLI、アプリからの操作は 各言語の
              SDK——というように、目的に応じて使い分けます。 どれも裏側では同じ
              AWS の API を呼んでいます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  マネジメントコンソール
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ブラウザの
                  GUI。全体像の把握や、設定値の確認・初回セットアップに向く。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  AWS CLI
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ターミナルから操作するコマンド。スクリプト化・自動化・CI
                  に組み込みやすい。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  SDK
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  JavaScript・Python など各言語のライブラリ。アプリのコードから
                  AWS を呼び出す。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              CLI の操作感を掴むため、まず認証情報を設定し、S3
              のバケット一覧を表示する基本的な流れを見てみます。
            </p>

            <CodeBlock
              language="bash"
              title="AWS CLI の基本（設定〜確認）"
              code={`# 認証情報とデフォルトリージョンを対話的に設定
aws configure

# 自分がどの権限で操作しているかを確認
aws sts get-caller-identity

# S3 のバケット一覧を表示
aws s3 ls

# 特定バケットの中身を一覧表示
aws s3 ls s3://my-example-bucket/

# ローカルファイルを S3 にアップロード
aws s3 cp ./index.html s3://my-example-bucket/`}
            />

            <CodingChallenge
              preview
              previewType="terminal"
              title="自分の権限と S3 バケットを確認するコマンドを書こう"
              description="今どの権限で操作しているかを確認し、続けて S3 のバケット一覧を表示する 2 つの aws CLI コマンドを書いてください。"
              initialCode={`# 今どの IAM 権限で操作しているかを確認する
aws sts get-caller-identity

# S3 のバケット一覧を表示する
aws s3 ___`}
              answer={`# 今どの IAM 権限で操作しているかを確認する
aws sts get-caller-identity

# S3 のバケット一覧を表示する
aws s3 ls`}
              hints={["バケットの一覧表示は list の意味を持つ ls サブコマンド"]}
              keywords={["ls"]}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="アベイラビリティゾーン（AZ）を複数使う主な目的はどれ？"
              options={[
                { label: "API のレスポンスを必ず JSON にするため" },
                {
                  label:
                    "電源やネットワークが独立した拠点に分散し、片方の障害でもサービスを継続しやすくするため",
                  correct: true,
                },
                { label: "リージョンの料金を無料にするため" },
                { label: "IAM の権限を不要にするため" },
              ]}
              explanation="AZ はリージョン内で物理的に独立したデータセンター群です。複数 AZ にリソースを分散させると、片方の AZ で障害が起きても別の AZ で処理を続けられるため、可用性が高まります。"
            />
          </section>

          {/* PaaS との違い */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Vercel などの PaaS との位置づけの違い
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Vercel や Netlify、Render といった PaaS
              は、デプロイ・スケール・CDN
              配信などを「決め打ちの良い設定」でまとめて提供します。
              フロントエンドやフルスタックのアプリを最短で公開するのに向いています。
              一方 AWS は、より低レイヤーから自由に組み立てられる代わりに、
              ネットワークや権限など自分で設計する範囲が広くなります。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="text-left font-bold p-3 border-b border-border">
                      観点
                    </th>
                    <th className="text-left font-bold p-3 border-b border-border">
                      Vercel などの PaaS
                    </th>
                    <th className="text-left font-bold p-3 border-b border-border">
                      AWS
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      自由度
                    </td>
                    <td className="p-3 border-b border-border">
                      用途特化で選択肢が絞られる
                    </td>
                    <td className="p-3 border-b border-border">
                      低レイヤーから自由に組める
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      設計の負担
                    </td>
                    <td className="p-3 border-b border-border">
                      少ない（多くが自動）
                    </td>
                    <td className="p-3 border-b border-border">
                      ネットワーク・権限など自分で設計
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      向いている場面
                    </td>
                    <td className="p-3 border-b border-border">
                      フロントエンド・小〜中規模の公開
                    </td>
                    <td className="p-3 border-b border-border">
                      独自処理・大規模・細かな制御
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">関係性</td>
                    <td className="p-3">
                      内部で AWS 等を利用していることも多い
                    </td>
                    <td className="p-3">PaaS の土台になりうる基盤</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              実際、多くの PaaS は内部で AWS
              などのクラウドを利用しています。両者は対立する選択肢というより、
              「どこまで自分で組み立てたいか」という抽象度の違いと捉えると整理しやすくなります。
            </p>
          </section>

          {/* 代表サービスの地図 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              代表サービスの地図
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              中核サービスを役割ごとに並べると、Web
              アプリの構成要素とほぼ対応づけられます。
              「コードを動かす」「ファイルを置く」「データを保存する」「外部とつなぐ」「権限を管理する」「監視する」——
              この対応関係を覚えておくと、設計図を読むときの足場になります。
            </p>

            <MermaidDiagram
              title="図: 代表サービスの役割マップ"
              chart={`flowchart LR
    U["ユーザー"] --> CF["CloudFront（配信）"]
    CF --> S3["S3（ストレージ）"]
    CF --> EC2["EC2 / Lambda（コンピュート）"]
    EC2 --> DB["RDS / DynamoDB（データベース）"]
    IAM["IAM（認証・認可）"] -.->|"権限"| EC2
    CW["CloudWatch（監視）"] -.->|"メトリクス"| EC2`}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {serviceMap.map((svc) => (
                <div
                  key={svc.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {svc.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {svc.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {svc.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 課金 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              従量課金と無料利用枠
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AWS の料金は基本的に<strong>従量課金</strong>
              です。使ったぶん（実行時間・転送量・保存容量など）
              だけ課金され、停止すれば多くの料金は止まります。
              新規アカウントには無料利用枠が用意されており、一定の範囲なら学習目的でも費用を抑えて試せます。
              ただし無料枠の対象・期間はサービスごとに異なるため、利用前に各サービスの料金ページを確認するのが安全です。
            </p>

            <InfoBox type="warning" title="想定外の課金を防ぐ習慣">
              使い終わったリソース（起動したままの
              EC2、保持しているスナップショット、固定 IP
              など）は、放置すると課金が続くことがあります。 請求アラート（AWS
              Budgets）を最初に設定し、不要なリソースは削除する習慣をつけると安心です。
              仕様上は「停止すれば止まる」料金でも、付随するストレージや IP
              の保持料が残ることがある、という点を覚えておきましょう。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="AWS の料金体系として最も基本的な考え方はどれ？"
              options={[
                { label: "月額固定で使い放題" },
                {
                  label:
                    "使った時間・容量・転送量などに応じて課金される従量課金",
                  correct: true,
                },
                { label: "完全無料で課金は一切発生しない" },
                { label: "アップロードしたコードの行数で課金される" },
              ]}
              explanation="AWS は従量課金が基本です。実行時間・保存容量・データ転送量などに応じて課金されます。無料利用枠もありますが、対象や期間はサービスごとに異なるため、請求アラートを設定して使いすぎを防ぐのが定石です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "AWS グローバルインフラストラクチャ",
                  url: "https://aws.amazon.com/jp/about-aws/global-infrastructure/",
                  description:
                    "リージョン・アベイラビリティゾーン・エッジロケーションの概要と一覧",
                },
                {
                  title: "AWS CLI ユーザーガイド",
                  url: "https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html",
                  description:
                    "AWS CLI のインストール・設定・基本コマンドの公式ガイド",
                },
                {
                  title: "AWS 無料利用枠",
                  url: "https://aws.amazon.com/jp/free/",
                  description:
                    "無料で試せるサービスと枠の一覧。学習開始時に確認したいページ",
                },
                {
                  title: "AWS ドキュメント（全サービス）",
                  url: "https://docs.aws.amazon.com/",
                  description:
                    "各サービスの公式ドキュメント入り口。地図から詳細へ進む拠点",
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
