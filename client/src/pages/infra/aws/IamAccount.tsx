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

const iamEntities = [
  {
    title: "ユーザー（User）",
    examples: "個々の人・システム",
    description:
      "AWS を操作する主体。人やプログラムに 1 つずつ割り当てる。ログイン用パスワードや、プログラム用のアクセスキーを持てる。",
  },
  {
    title: "グループ（Group）",
    examples: "developers / admins",
    description:
      "ユーザーをまとめる箱。グループにポリシーを付けると、所属ユーザー全員にまとめて権限が適用される。権限管理の基本単位。",
  },
  {
    title: "ロール（Role）",
    examples: "EC2 用 / Lambda 用ロール",
    description:
      "「一時的に引き受ける権限のセット」。人ではなくサービスやアプリに権限を渡すときに使う。アクセスキーを埋め込まずに済む。",
  },
  {
    title: "ポリシー（Policy）",
    examples: "S3 読み取り許可など",
    description:
      "「誰が・何に・何をできるか」を JSON で記述した許可のルール。ユーザー・グループ・ロールに付けて初めて権限が決まる。",
  },
];

export default function IamAccount() {
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
            アカウント設計と IAM
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            AWS を安全に使う土台が IAM（Identity and Access Management）です。
            「誰が・どのリソースに・何をできるか」を細かく決められる一方、設定を誤ると
            事故や情報漏洩につながります。この章では、最初に整えておきたいアカウントの守りと、
            IAM の中心概念を実務目線で整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["IAM", "最小権限", "MFA", "アクセスキー", "Organizations"]}
        >
          <p>
            クラウドのトラブルの多くは、性能ではなく
            <strong>権限設定のミス</strong>から起こります。
            広すぎる権限のキーが漏れる、ルートユーザーで作業して取り返しのつかない操作をする——
            こうした事故は、最初に正しい設計をしておけば大半が防げます。 IAM
            は「あとで直す」より「最初に整える」ことで効果を発揮する領域です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ルートユーザー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ルートユーザーは日常で使わない
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AWS アカウントを作ると、まず<strong>ルートユーザー</strong>
              （登録したメールアドレスでログインする最上位の存在）ができます。
              ルートユーザーはアカウントのあらゆる操作ができてしまうため、日常作業には使いません。
              請求情報の変更やアカウント解約など、ルートにしかできない一部の操作に限って使うのが原則です。
            </p>

            <InfoBox type="error" title="まず最初にやること">
              アカウント作成直後に、ルートユーザーへ MFA（多要素認証）を設定し、
              日常作業用の IAM ユーザーまたは IAM Identity Center
              のユーザーを別途用意します。
              ルートのアクセスキーは作らない（あれば削除する）のが鉄則です。
            </InfoBox>
          </section>

          {/* IAM の4要素 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              IAM の中心 — ユーザー・グループ・ロール・ポリシー
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              IAM は 4
              つの概念の組み合わせで権限を表現します。ざっくり言えば「主体（ユーザー／ロール）」に
              「ルール（ポリシー）」を付け、「グループ」でまとめて管理する、という構造です。
              特にロールは、アプリやサービスに権限を渡す手段として重要になります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {iamEntities.map((e) => (
                <div
                  key={e.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {e.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {e.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {e.description}
                  </p>
                </div>
              ))}
            </div>

            <MermaidDiagram
              title="図: ユーザー・グループ・ロール・ポリシーの関係"
              chart={`flowchart TD
    U["ユーザー（人）"] --> GRP["グループ（developers）"]
    GRP -->|"ポリシーを付与"| P1["ポリシー（許可ルール）"]
    SVC["サービス（EC2 / Lambda）"] -->|"引き受け"| ROLE["ロール（一時権限）"]
    ROLE -->|"ポリシーを付与"| P2["ポリシー（許可ルール）"]
    P1 --> RES["AWS リソース（S3 など）"]
    P2 --> RES`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              権限の付け方には「ユーザーに直接付ける」「グループ経由で付ける」「ロールを引き受けて付ける」の
              選択肢があります。人にはグループ、サービスにはロール、という使い分けを基本にすると整理しやすくなります。
            </p>
          </section>

          {/* ポリシーの例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ポリシーは JSON で「許可」を書く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ポリシーは JSON
              で記述します。中心は「どの操作（Action）を・どのリソース（Resource）に対して・
              許可するか拒否するか（Effect）」の組み合わせです。下は、特定の S3
              バケットへの読み取りだけを許可する例です。
            </p>

            <CodeBlock
              language="json"
              title="S3 バケットへの読み取りのみを許可するポリシー"
              code={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowReadOnlyOnExampleBucket",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-example-bucket",
        "arn:aws:s3:::my-example-bucket/*"
      ]
    }
  ]
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              IAM
              の基本姿勢は「明示的に許可したものだけが許される（デフォルト拒否）」です。
              書いていない操作は自動的にできません。さらに、どこかに明示的な
              Deny があれば Allow より優先されます。
              この「許可は加算、拒否は最優先」のルールを覚えておくと、
              権限の挙動を予測しやすくなります。
            </p>

            <MermaidDiagram
              title="図: ポリシー評価の流れ（明示的 Deny が最優先）"
              chart={`flowchart TD
    REQ["リクエスト（この操作を許可？）"] --> D{"明示的な Deny がある？"}
    D -->|"はい"| DENY["拒否（最優先）"]
    D -->|"いいえ"| A{"明示的な Allow がある？"}
    A -->|"はい"| ALLOW["許可"]
    A -->|"いいえ"| DEF["暗黙の拒否（デフォルト）"]`}
            />

            <p className="text-muted-foreground mt-6 mb-4 leading-relaxed">
              実際に書いてみましょう。下のポリシーは、特定の S3
              バケットへの読み取りだけを許可するものです。Effect・Action・Resource
              の穴を埋めてください。
            </p>

            <CodingChallenge
              preview
              previewType="config"
              title="S3 読み取り許可の IAM ポリシーを完成させよう"
              description="特定バケットへの読み取り（s3:GetObject）を「許可」する IAM ポリシーの Effect・Action・Resource を埋めてください。"
              initialCode={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowReadOnly",
      "Effect": "___",
      "Action": "s3:___",
      "Resource": "arn:aws:s3:::my-example-bucket/*"
    }
  ]
}`}
              answer={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowReadOnly",
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-example-bucket/*"
    }
  ]
}`}
              hints={[
                "許可するときの Effect は Allow（拒否は Deny）",
                "オブジェクトを読み取るアクションは GetObject",
              ]}
              keywords={["Allow", "GetObject"]}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="アプリ（EC2 や Lambda）に AWS の権限を渡すとき、最も推奨される方法はどれ？"
              options={[
                { label: "ソースコードにアクセスキーを直接書き込む" },
                { label: "ルートユーザーのアクセスキーを共有する" },
                {
                  label: "IAM ロールを割り当て、一時的な認証情報で操作させる",
                  correct: true,
                },
                { label: "全員に管理者権限を付与しておく" },
              ]}
              explanation="サービスやアプリには IAM ロールを割り当てます。ロールは一時的な認証情報を自動で発行・更新するため、長期のアクセスキーをコードに埋め込む必要がなく、漏洩リスクを下げられます。"
            />
          </section>

          {/* 最小権限とMFA */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              最小権限の原則・MFA・アクセスキーの扱い
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>最小権限の原則</strong>
              とは、「仕事に必要な権限だけを与える」という考え方です。
              「とりあえず管理者権限」で始めると、後から絞るのは難しくなります。
              最初は狭く与え、足りなければ足す方向で運用するのが安全です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ログインには <strong>MFA（多要素認証）</strong>を必須にします。
              パスワードが漏れても、もう一つの認証要素がなければログインできないため、被害を大きく抑えられます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  アクセスキーを作りすぎない
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  プログラム用の長期キーは漏洩源になりやすい。可能ならロールや
                  IAM Identity Center の一時認証情報に寄せる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  コードに書かない・ローテーションする
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  キーをリポジトリにコミットしない。定期的に更新し、不要になったら即削除する。
                </p>
              </div>
            </div>

            <InfoBox type="warning" title="アクセスキー漏洩への備え">
              アクセスキーが GitHub
              などに誤って公開されると、不正利用や高額課金につながることがあります。
              キーは環境変数やシークレットマネージャーで管理し、リポジトリに含めないこと、
              そして漏洩に気づいたら即座に無効化（ローテーション）することが重要です。
              そもそもキーを発行しない設計（ロール中心）が、最も確実な漏洩対策です。
            </InfoBox>
          </section>

          {/* Organizations / Identity Center */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              複数アカウント — Organizations と IAM Identity Center
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              組織やプロジェクトが増えると、1
              つのアカウントにすべてを詰め込むより、
              用途ごとにアカウントを分ける方が安全で管理しやすくなります。
              そのための仕組みが AWS Organizations と IAM Identity Center です。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="text-left font-bold p-3 border-b border-border">
                      サービス
                    </th>
                    <th className="text-left font-bold p-3 border-b border-border">
                      役割
                    </th>
                    <th className="text-left font-bold p-3 border-b border-border">
                      解決すること
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      AWS Organizations
                    </td>
                    <td className="p-3 border-b border-border">
                      複数アカウントをまとめて管理する
                    </td>
                    <td className="p-3 border-b border-border">
                      本番・開発・検証などをアカウント単位で分離し、請求も一括管理
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border font-medium text-foreground">
                      IAM Identity Center（旧 AWS SSO）
                    </td>
                    <td className="p-3 border-b border-border">
                      複数アカウントへのログインを一元化する
                    </td>
                    <td className="p-3 border-b border-border">
                      1 つの認証で必要なアカウント・権限に切り替えてアクセス
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              本番環境と開発環境を別アカウントに分けておくと、開発中の操作ミスが本番に波及しにくくなります。
              IAM Identity Center を使えば、こうした複数アカウントへのアクセスを
              ユーザーごとに発行する長期キーなしで、一時認証情報で扱えます。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="「最小権限の原則」を一言で表すとどれ？"
              options={[
                {
                  label: "とりあえず全員に管理者権限を与えておく",
                },
                {
                  label: "仕事に必要な権限だけを与え、足りなければ後から足す",
                  correct: true,
                },
                { label: "権限は一切設定せず誰でも操作できるようにする" },
                { label: "ルートユーザーを全員で共有する" },
              ]}
              explanation="最小権限の原則は、必要な操作に必要な権限だけを与える考え方です。広い権限から絞るのは難しいため、狭く始めて足りなければ追加する運用が、事故と漏洩被害の両方を抑えます。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "IAM のセキュリティのベストプラクティス",
                  url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
                  description:
                    "ルートユーザーの保護・最小権限・MFA など、最初に読むべき指針",
                },
                {
                  title: "IAM ユーザーガイド（概要）",
                  url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
                  description:
                    "ユーザー・グループ・ロール・ポリシーの基本概念の公式解説",
                },
                {
                  title: "AWS Organizations ユーザーガイド",
                  url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html",
                  description:
                    "マルチアカウント管理の仕組みと、アカウント分離の考え方",
                },
                {
                  title: "AWS IAM Identity Center ユーザーガイド",
                  url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html",
                  description:
                    "複数アカウントへのアクセスを一元化する仕組み（旧 AWS SSO）",
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
