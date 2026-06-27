import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const storageClasses = [
  {
    title: "S3 Standard",
    use: "頻繁にアクセスするデータ",
    description:
      "アクセス頻度が高い一般的な用途のデフォルト。取り出し料金がかからず、レイテンシも低い。",
  },
  {
    title: "S3 Standard-IA / One Zone-IA",
    use: "たまにしか読まないデータ",
    description:
      "保管料金は安いが、読み出すたびに取り出し料金がかかる。バックアップや古いログ向け。",
  },
  {
    title: "S3 Glacier 系",
    use: "アーカイブ・長期保管",
    description:
      "保管料金が最も安い代わりに、取り出しに時間（数分〜数時間）と料金がかかる。法定保存などに使う。",
  },
];

export default function StorageCdn() {
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
            ストレージと配信（S3 / CloudFront）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            AWS で最初に触れることが多いのがストレージです。中でも S3
            は、画像・動画・バックアップ・静的サイトまで幅広く使われるオブジェクトストレージです。
            ここでは S3 の基本概念と、CloudFront（CDN）を組み合わせて
            「速くて安全な配信」を作る流れを一通り体験できます。
          </p>
        </div>

        <WhyNowBox
          tags={["S3", "CloudFront", "CDN", "OAC", "ストレージクラス"]}
        >
          <p>
            フロントエンドの成果物（ビルド済みの HTML / JS / 画像）は、
            どこかに置いて配信しなければユーザーに届きません。S3
            は「ファイルを置く場所」、CloudFront
            は「世界中に速く届ける仕組み」です。 この 2
            つの組み合わせは、静的サイトでも、動的アプリの静的アセット配信でも、
            ほぼ必ず登場します。まず S3 の構造を理解し、 次に CloudFront
            で配信を最適化する流れを押さえておくと、
            多くの構成図がそのまま読めるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* S3 の基本概念 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              S3 はオブジェクトストレージ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              S3（Simple Storage Service）は
              <strong>オブジェクトストレージ</strong>です。
              フォルダ階層を持つファイルシステムとは考え方が違い、
              データは「バケット」という入れ物の中に、「キー」という名前で
              フラットに保存されます。1 つ 1 つのデータは 「オブジェクト（本体 +
              メタデータ）」として扱われます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">バケット</p>
                  <p className="text-muted-foreground">
                    オブジェクトの入れ物。リージョン単位で作り、名前は全世界で一意
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">キー</p>
                  <p className="text-muted-foreground">
                    オブジェクトの名前。<code>images/2026/cat.png</code>{" "}
                    のように「/」を含められるが、実体はフラット
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">オブジェクト</p>
                  <p className="text-muted-foreground">
                    本体データ + メタデータ。1 オブジェクト最大 50TB
                    まで保存できる
                  </p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              キーに含まれる「/」は見た目をフォルダのように見せるための区切りで、
              内部的に本当のディレクトリ構造があるわけではありません。
              この「フラットだが prefix で絞り込める」性質を理解しておくと、
              一覧取得やライフサイクルの設計が読み解きやすくなります。
            </p>
          </section>

          {/* ストレージクラスとライフサイクル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ストレージクラスとライフサイクル
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              S3 にはアクセス頻度に応じた
              <strong>ストレージクラス</strong>があり、
              「よく読むデータ」と「ほとんど読まないデータ」で料金体系を使い分けられます。
              さらに<strong>ライフサイクルルール</strong>を設定すると、
              「作成から 30 日経ったら IA へ、90 日経ったら Glacier へ、365
              日で削除」 といった移行を自動化できます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {storageClasses.map((c) => (
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
                    {c.use}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="迷ったら Intelligent-Tiering">
              アクセスパターンが読めないデータには S3 Intelligent-Tiering
              が選択肢になります。
              アクセス状況を監視して自動でクラスを移し替えるため、
              手動でライフサイクルを設計しなくても保管コストを抑えやすくなります。
              少額の監視料金がかかる点だけ把握しておきましょう。
            </InfoBox>
          </section>

          {/* 静的サイトホスティングと署名付きURL */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              静的サイトホスティングと署名付き URL
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              S3 は静的サイトの配信先としても使えます。HTML / CSS / JS
              をアップロードし、インデックスドキュメントとエラードキュメントを指定すれば、
              サーバを 1 台も立てずに Web サイトを公開できます。React や Vite
              でビルドした成果物をそのまま置けるのが利点です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              一方、バケットを公開せずに「特定の人だけ・一定時間だけ」
              ファイルにアクセスさせたい場合は
              <strong>署名付き URL（Presigned URL）</strong>を使います。
              アプリ側で有効期限つきの URL を生成して渡すと、
              受け取った人はその期限内だけオブジェクトを取得・アップロードできます。
              非公開ファイルのダウンロードリンクや、フロントからの直接アップロードでよく使われます。
            </p>

            <CodeBlock
              language="bash"
              title="ローカルのビルド成果物を S3 に同期する"
              code={`# dist/ の中身をバケットにアップロード（差分のみ転送）
aws s3 sync ./dist s3://my-site-bucket \\
  --delete \\
  --cache-control "max-age=86400"

# 単一ファイルの署名付き URL を 1 時間有効で発行
aws s3 presign s3://my-private-bucket/report.pdf \\
  --expires-in 3600`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="S3 の「キー」について正しいのはどれ？"
              options={[
                {
                  label:
                    "キーは実際のディレクトリ構造を表し、フォルダが物理的に存在する",
                },
                {
                  label:
                    "キーはオブジェクトの名前で、「/」を含められるが実体はフラットな名前空間である",
                  correct: true,
                },
                { label: "キーはバケットの暗号鍵のことである" },
                { label: "キーは 1 バケットにつき 1 つしか持てない" },
              ]}
              explanation="S3 はオブジェクトストレージで、データはバケット内にキー（名前）でフラットに保存されます。キーに含まれる「/」はコンソール上でフォルダのように見せるための区切りにすぎず、本当の階層構造ではありません。prefix で絞り込めるのはこの性質を利用したものです。"
            />
          </section>

          {/* EBS / EFS の違い */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ブロック・ファイル・オブジェクトの違い（EBS / EFS / S3）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ストレージは「どう読み書きするか」で大きく 3 種類に分かれます。 S3
              がオブジェクトストレージなのに対し、EBS は EC2 にアタッチする
              <strong>ブロックストレージ</strong>、EFS
              は複数サーバから同時にマウントできる
              <strong>ファイルストレージ</strong>です。用途が異なるので、
              ここを混同しないことが構成設計の第一歩になります。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="text-left p-3 border-b border-border">
                      項目
                    </th>
                    <th className="text-left p-3 border-b border-border">
                      EBS（ブロック）
                    </th>
                    <th className="text-left p-3 border-b border-border">
                      EFS（ファイル）
                    </th>
                    <th className="text-left p-3 border-b border-border">
                      S3（オブジェクト）
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border text-foreground font-medium">
                      アクセス形態
                    </td>
                    <td className="p-3 border-b border-border">
                      1 つの EC2 にアタッチする仮想ディスク
                    </td>
                    <td className="p-3 border-b border-border">
                      複数サーバから同時にマウント（NFS）
                    </td>
                    <td className="p-3 border-b border-border">
                      HTTP API（GET/PUT）でアクセス
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border text-foreground font-medium">
                      主な用途
                    </td>
                    <td className="p-3 border-b border-border">
                      OS のルートディスク、DB のデータ領域
                    </td>
                    <td className="p-3 border-b border-border">
                      複数台で共有する作業領域・コンテンツ
                    </td>
                    <td className="p-3 border-b border-border">
                      画像・動画・バックアップ・静的配信
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border text-foreground font-medium">
                      共有
                    </td>
                    <td className="p-3 border-b border-border">
                      基本 1 インスタンス専有
                    </td>
                    <td className="p-3 border-b border-border">
                      多数のインスタンスで共有
                    </td>
                    <td className="p-3 border-b border-border">
                      ネットワーク越しに無数のクライアント
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-foreground font-medium">容量</td>
                    <td className="p-3">作成時に確保（後から拡張可）</td>
                    <td className="p-3">使った分だけ自動で伸縮</td>
                    <td className="p-3">事実上無制限</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* CloudFront + OAC */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CloudFront と OAC でバケットを非公開のまま配信する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              CloudFront は AWS の
              <strong>CDN（コンテンツ配信ネットワーク）</strong>です。
              世界中のエッジロケーションにコンテンツをキャッシュし、
              ユーザーに最も近い拠点から配信することで、レイテンシを下げ、
              オリジン（S3 やサーバ）への負荷も軽くします。S3 の静的サイトを
              CloudFront の背後に置くのは定番の構成です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここで重要なのが<strong>OAC（Origin Access Control）</strong>
              です。 S3 バケットを直接公開すると、CloudFront を通さず S3 の URL
              に直アクセスされてしまいます。OAC を使うと、
              <strong>バケットを非公開のまま</strong>「CloudFront
              からのリクエストだけ」 を許可できます。これにより、配信は
              CloudFront に一本化され、 キャッシュ制御やアクセス制御を
              CloudFront 側で統一できます。
            </p>

            <CodeBlock
              language="json"
              title="CloudFront（OAC）からのアクセスだけ許可するバケットポリシー"
              code={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-site-bucket/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::123456789012:distribution/EDFDVBD6EXAMPLE"
        }
      }
    }
  ]
}`}
            />

            <InfoBox type="warning" title="バケットの「うっかり公開」に注意">
              S3
              の情報漏えいの多くは、バケットを意図せず公開状態にしてしまうことが原因です。
              アカウントレベルの「パブリックアクセスブロック」を有効にしたうえで、
              配信は CloudFront + OAC に寄せると、
              「非公開のまま安全に配信する」という現代的な構成になります。
              公開が本当に必要な場面以外では、バケットは閉じておくのが基本です。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="OAC（Origin Access Control）を使う目的として最も適切なのはどれ？"
              options={[
                { label: "S3 の保管料金を下げるため" },
                {
                  label:
                    "S3 バケットを非公開のまま、CloudFront 経由のアクセスだけを許可するため",
                  correct: true,
                },
                { label: "S3 のキー名を自動で短縮するため" },
                { label: "EC2 から EFS をマウントするため" },
              ]}
              explanation="OAC は、S3 バケットをパブリックにせずに CloudFront からのリクエストだけを許可する仕組みです。これにより配信経路を CloudFront に一本化でき、S3 の URL への直アクセスを防げます。バケットを公開しないままキャッシュやアクセス制御を CloudFront 側で統一できるのが利点です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Amazon S3 ユーザーガイド",
                  url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html",
                  description:
                    "バケット・キー・ストレージクラス・ライフサイクルなど S3 の全体像をまとめた公式ガイド",
                },
                {
                  title: "Amazon CloudFront 開発者ガイド",
                  url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html",
                  description:
                    "CDN の仕組み・ディストリビューション・キャッシュ動作を解説した公式ドキュメント",
                },
                {
                  title:
                    "CloudFront で S3 オリジンへのアクセスを制限する（OAC）",
                  url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html",
                  description:
                    "OAC を使ってバケットを非公開のまま配信する手順の公式解説",
                },
                {
                  title: "Amazon EBS と Amazon EFS の概要",
                  url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html",
                  description:
                    "ブロックストレージ EBS の公式ドキュメント。EFS との使い分けの起点になる",
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
