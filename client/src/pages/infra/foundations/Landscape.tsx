import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const serviceLayers = [
  {
    title: "IaaS",
    full: "Infrastructure as a Service",
    examples: "AWS EC2、GCP Compute Engine",
    description:
      "仮想マシン・ストレージ・ネットワークを部品として借りる。OS から上は自分で管理する。自由度が高い一方で運用の負担も大きい。",
  },
  {
    title: "PaaS",
    full: "Platform as a Service",
    examples: "Vercel、Heroku、Cloud Run",
    description:
      "アプリのコードを渡せば、実行環境・スケール・デプロイをプラットフォームが面倒を見る。OS やサーバー管理を意識せずに済む。",
  },
  {
    title: "SaaS",
    full: "Software as a Service",
    examples: "Gmail、Notion、Figma",
    description:
      "完成したソフトウェアをサービスとして使う。利用者は機能を使うだけで、インフラもアプリも提供側が運用する。",
  },
  {
    title: "FaaS",
    full: "Function as a Service",
    examples: "AWS Lambda、Cloudflare Workers",
    description:
      "関数単位でコードをデプロイし、リクエストが来たときだけ実行する。サーバーの常駐を前提にしない実行モデル。",
  },
];

const providers = [
  {
    title: "総合クラウド",
    examples: "AWS / GCP / Azure",
    description:
      "計算・ストレージ・データベース・ネットワークまで、ほぼあらゆる部品を提供する大規模プラットフォーム。組み合わせの自由度が高い。",
  },
  {
    title: "フロント寄りプラットフォーム",
    examples: "Vercel / Netlify / Cloudflare",
    description:
      "フロントエンドのデプロイとエッジ配信に強い。設定より規約を重視し、Git push からデプロイまでの体験を整えている。",
  },
  {
    title: "BaaS",
    examples: "Supabase / Firebase",
    description:
      "認証・データベース・ストレージをまとめて提供し、バックエンドを書かずにアプリを組み立てられる層。後の章で扱う。",
  },
];

export default function Landscape() {
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
            クラウドとインフラの全体像
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            インフラの世界には IaaS・PaaS・SaaS・FaaS といった「層」と、
            AWS・GCP・Azure のような総合クラウドや Vercel・Cloudflare のような
            フロント寄りプラットフォームが並んでいます。
            まずはこの地図を頭に入れて、この先の各トピックがどこに位置するかを掴みます。
          </p>
        </div>

        <WhyNowBox
          tags={["クラウド", "IaaS", "PaaS", "SaaS", "責任共有モデル"]}
        >
          <p>
            フロントエンドを書いていると、デプロイ先は「とりあえず
            Vercel」で済むことが多いものです。
            けれど少し先に進むと、データベースはどこに置くか、認証はどう用意するか、
            コストは誰がどう負担するか——といった選択が次々に現れます。
            その判断は、まず「どんな層・どんなプロバイダがあるのか」という地図がないと始められません。
            ここでは特定のクラウドに肩入れせず、共通の語彙と構造を押さえます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* オンプレ vs クラウド */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              オンプレミスとクラウドの違い
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>オンプレミス</strong>
              は、自社でサーバー機材を買い、置き場所・電源・ネットワーク・故障対応まで
              すべて自分たちで持つ方式です。初期投資が大きく、容量は事前に見積もって用意します。
              対して<strong>クラウド</strong>
              は、必要な分だけ借りて使った分だけ払う方式です。
              数分でサーバーを立て、不要になれば捨てられます。この「所有から利用へ」の転換が、
              現代のアプリ開発のスピードを支えています。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-bold text-foreground">
                      観点
                    </th>
                    <th className="text-left py-3 pr-4 font-bold text-foreground">
                      オンプレミス
                    </th>
                    <th className="text-left py-3 font-bold text-foreground">
                      クラウド
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">初期コスト</td>
                    <td className="py-3 pr-4">大きい（機材購入）</td>
                    <td className="py-3">小さい（従量課金）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">スケール</td>
                    <td className="py-3 pr-4">機材調達が必要で遅い</td>
                    <td className="py-3">設定変更で即時に増減</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pr-4">運用責任</td>
                    <td className="py-3 pr-4">物理層まで自社</td>
                    <td className="py-3">物理層は事業者が担う</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">向くケース</td>
                    <td className="py-3 pr-4">厳格な規制・固定負荷</td>
                    <td className="py-3">変動負荷・スピード重視</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* サービスの層 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              IaaS / PaaS / SaaS / FaaS という「層」
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              クラウドのサービスは「どこまでを事業者に任せるか」で層に分けられます。
              下にいくほど自分で管理する範囲が広く（自由度が高く）、
              上にいくほど任せる範囲が広い（手間が少ない）と捉えると整理しやすくなります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceLayers.map((layer) => (
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
                    {layer.full} ／ {layer.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="層は「排他」ではなく「組み合わせ」">
              実際のアプリは複数の層をまたいで構成されます。たとえば フロントは
              PaaS（Vercel）、認証は SaaS、画像変換は FaaS、
              という具合に、適材適所で組み合わせるのが一般的です。 「全部 IaaS
              で揃える」必要はありません。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="OS のバージョン管理やセキュリティパッチ適用を自分で行う必要があるのはどれ？"
              options={[
                { label: "SaaS" },
                { label: "FaaS" },
                { label: "IaaS", correct: true },
                { label: "PaaS" },
              ]}
              explanation="IaaS は仮想マシンなど「インフラの部品」を借りる層なので、OS から上の管理は利用者の責任です。PaaS・FaaS・SaaS では、OS やミドルウェアの面倒は事業者側が見るため、利用者は OS のパッチ適用を意識せずに済みます。"
            />
          </section>

          {/* プロバイダの位置づけ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              主要プロバイダとプラットフォームの位置づけ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              プロバイダは大きく「何でも揃う総合クラウド」と「特定領域に特化したプラットフォーム」に分かれます。
              フロントエンドエンジニアがまず触れるのは後者であることが多く、
              総合クラウドはその裏側で部品として使われていることもあります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {providers.map((p) => (
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
          </section>

          {/* リージョンと AZ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リージョンとアベイラビリティゾーン
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              クラウドのサーバーは世界中のデータセンターに分散しています。
              <strong>リージョン</strong>は地理的に離れた拠点の単位（例:
              東京、バージニア北部）で、
              ユーザーに近いリージョンを選ぶとレイテンシが下がります。
              各リージョンの中には、電源やネットワークが独立した
              <strong>アベイラビリティゾーン（AZ）</strong>が複数あり、 片方の
              AZ が落ちてももう片方で動かす、という冗長構成に使われます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              データの保存場所には法令や規約が絡むこともあります。
              「どのリージョンにデータを置くか」は、レイテンシだけでなく
              コンプライアンスの観点でも検討する必要があります。
            </p>

            <InfoBox type="warning" title="リージョンをまたぐと遅くなる">
              アプリのサーバーは東京、データベースはバージニア、という構成にすると、
              1
              リクエストごとに太平洋を往復することになり、体感速度が大きく落ちます。
              関連するコンポーネントは、原則として同じリージョンにまとめるのが基本です。
            </InfoBox>
          </section>

          {/* 責任共有モデル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              責任共有モデル
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              クラウドのセキュリティは「事業者と利用者の分担」で考えます。これを
              <strong>責任共有モデル</strong>
              と呼びます。事業者はデータセンターの物理セキュリティや
              ハードウェア、仮想化基盤の安全を守ります。一方、利用者はアプリのコード、
              アクセス権限の設定、保存するデータの扱いに責任を持ちます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここを誤解すると「クラウドだから安全」と思い込み、公開設定のミスで情報が漏れる、
              といった事故につながります。クラウドが守ってくれる範囲と、
              自分で守る範囲の線引きを常に意識しておくことが大切です。
            </p>

            <InfoBox type="success" title="マネージドサービスの利点">
              データベースやキャッシュを「マネージドサービス」として使うと、
              バックアップ・パッチ適用・障害時のフェイルオーバーを事業者が肩代わりしてくれます。
              自分で運用する範囲が減るぶん、アプリの価値を作る作業に集中しやすくなります。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="責任共有モデルにおいて、一般に「利用者」の責任に含まれるのはどれ？"
              options={[
                { label: "データセンターの物理的な入退室管理" },
                { label: "サーバーハードウェアの故障対応" },
                {
                  label: "アクセス権限の設定とアプリのコードのセキュリティ",
                  correct: true,
                },
                { label: "仮想化基盤そのもののセキュリティ" },
              ]}
              explanation="物理セキュリティ・ハードウェア・仮想化基盤は事業者の責任です。利用者は、その上で動かすアプリのコード、誰に何を許可するかというアクセス権限、保存するデータの扱いに責任を持ちます。『クラウドだから安全』ではなく、線引きを意識することが重要です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "AWS - クラウドコンピューティングとは",
                  url: "https://aws.amazon.com/jp/what-is-cloud-computing/",
                  description:
                    "クラウドの定義とサービスモデルを提供側の視点で整理した公式解説",
                },
                {
                  title: "Google Cloud - IaaS / PaaS / SaaS の違い",
                  url: "https://cloud.google.com/learn/paas-vs-iaas-vs-saas",
                  description:
                    "各サービスモデルの責任範囲を図解付きで比較した公式ドキュメント",
                },
                {
                  title: "AWS - 責任共有モデル",
                  url: "https://aws.amazon.com/jp/compliance/shared-responsibility-model/",
                  description:
                    "事業者と利用者のセキュリティ分担を定義した公式の原典",
                },
                {
                  title: "Cloudflare - クラウドコンピューティングとは",
                  url: "https://www.cloudflare.com/learning/cloud/what-is-the-cloud/",
                  description:
                    "クラウドの基本概念をベンダー横断の視点でまとめた学習リソース",
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
