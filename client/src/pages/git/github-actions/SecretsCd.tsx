import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";
import PipelineDiagram from "@/components/PipelineDiagram";
import CodingChallenge from "@/components/CodingChallenge";

export default function SecretsCd() {
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
            シークレットと環境・デプロイ（CD）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            検査を通った成果物を環境へ届ける段階（CD）に進みます。
            秘密情報の安全な渡し方、staging と production の分離、
            そして承認を挟んだデプロイまでを組み立てます。
          </p>
        </div>

        <WhyNowBox tags={["secrets", "permissions", "environment", "OIDC"]}>
          <p>
            デプロイには API キーやトークンといった秘密情報が必要です。
            これをコードに直接書くと、リポジトリを見た全員に漏れます。 CD
            で最も事故が起きやすいのは「秘密情報の扱い」と「権限の広さ」です。
            必要な情報を必要な場所だけに、必要な権限だけを渡す——
            この原則を、GitHub Actions の仕組みに落とし込んでいきます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              シークレットを渡す
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              秘密情報は、リポジトリの{" "}
              <strong>Settings → Secrets and variables → Actions</strong>{" "}
              に登録し、ワークフローからは <code>secrets</code>{" "}
              コンテキスト経由で参照します。 コードには値そのものを書きません。
            </p>

            <CodeBlock
              language="yaml"
              title="secrets を env に渡す"
              code={`jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: デプロイ
        run: ./scripts/deploy.sh
        env:
          DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}`}
            />

            <InfoBox type="warning" title="マスクされる。でも加工すると漏れる">
              ログに出た秘密情報は、Actions が自動でマスク（<code>***</code>
              ）します。対象は登録したシークレットだけではなく、Azure
              の各種キーやデータベース接続文字列のように、
              登録していなくても機微と認識される値も伏せ字化されます。
              逆に、登録済みのシークレットでも伏せ字化は保証されません。
              値が変形されうる経路が複数あることに加え、
              ランナーが伏せ字化できるのは現在のジョブ内で使われたシークレットに限られます。
              実測でも Base64 化したり一部を切り出して <code>echo</code> すると、
              マスクをすり抜けて平文で残ることがあります。
              秘密情報は加工して出力せず、必要な step でだけ使うのが基本です。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              GITHUB_TOKEN と権限の最小化
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ワークフローには <code>GITHUB_TOKEN</code> という一時トークンが
              自動で渡されます。これでコメント投稿やリリース作成などができます。
              既定の権限は Enterprise / Organization の作成時期で分かれ、2023 年 2 月 2
              日以降に作成されたものは全スコープ read-only、それ以前に作成されたものは全スコープ
              read and write が既定です（個人アカウントの新規リポジトリは{" "}
              <code>contents</code> と <code>packages</code> の read のみ）。
              どちらの既定であっても <code>permissions</code> を明示して、
              そのワークフローに必要な権限だけへ絞るのが安全側の設計です。
            </p>

            <CodeBlock
              language="yaml"
              title="必要な権限だけを与える"
              code={`permissions:
  contents: read      # リポジトリの読み取りだけ許可

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write  # このジョブだけリリース作成のため書き込み可
    steps:
      - uses: actions/checkout@v4
      - run: ./scripts/release.sh`}
            />

            <InfoBox type="info" title="トップレベルで絞り、ジョブで足す">
              <code>permissions</code> はワークフロー全体（トップレベル）と
              ジョブ単位の両方で書けます。トップレベルで{" "}
              <code>contents: read</code> のように絞っておき、
              書き込みが要るジョブだけで権限を足すと、
              「うっかり広い権限のまま」を防げます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              環境を分ける — staging と production
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              デプロイ先は通常、検証用の <strong>staging</strong> と本番の{" "}
              <strong>production</strong> に分かれます。GitHub の{" "}
              <strong>Environments</strong> を使うと、環境ごとにシークレットや
              承認ルール（保護環境）を設定できます。<code>environment</code>{" "}
              を指定したジョブは、その環境のシークレットと保護ルールに従います。
            </p>

            <CodeBlock
              language="yaml"
              title="環境ごとのデプロイ"
              code={`jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - run: ./scripts/deploy.sh
        env:
          TARGET_URL: \${{ vars.STAGING_URL }}
          DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production   # 承認者を必須にできる（保護環境）
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - run: ./scripts/deploy.sh
        env:
          TARGET_URL: \${{ vars.PRODUCTION_URL }}
          DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}`}
            />

            <PipelineDiagram
              caption="図: 検査から本番まで。承認ゲートで人が最後の一押しを行う"
              stages={[
                { label: "CI", detail: "lint/test/build" },
                { label: "staging", detail: "自動デプロイ" },
                { label: "承認", detail: "必須レビュアー", highlight: true },
                { label: "production", detail: "本番デプロイ" },
              ]}
            />

            <InfoBox type="info" title="保護環境で「最後の一押し」を人に">
              production 環境に<strong>必須レビュアー</strong>を設定すると、
              そのジョブは承認されるまで待機状態で止まります。
              これが継続的デリバリー（人が承認して本番へ）と
              継続的デプロイ（承認なしで本番へ）の分かれ目です。
              ロールバックがすぐできない変更ほど、承認を挟む価値があります。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              長期シークレットを持たない — OIDC
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              クラウド（AWS など）へデプロイするとき、長期間有効なアクセスキーを
              シークレットに置くと、漏れたときの被害が大きくなります。
              <strong>OIDC</strong> を使うと、ジョブごとに GitHub が発行する
              短命なトークンをクラウド側で検証し、その場限りの権限を得られます。
              リポジトリに長期キーを保存せずに済みます。
            </p>

            <CodeBlock
              language="yaml"
              title="OIDC で AWS の一時認証を得る"
              code={`permissions:
  id-token: write   # OIDC トークンの発行に必要
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/deploy
          aws-region: ap-northeast-1
      - run: ./scripts/deploy.sh`}
            />

            <InfoBox type="warning" title="OIDC には id-token: write が要る">
              OIDC を使うジョブは <code>permissions</code> に{" "}
              <code>id-token: write</code> が必要です。これを忘れると
              「トークンを発行できない」というエラーで落ちます。
              権限を最小化する方針と、OIDC に必要な権限を足す操作は
              両立させる必要があります。
            </InfoBox>
          </section>

          <section>
            <Quiz
              question="本番デプロイの前に「人による承認」を必須にしたい。GitHub Actions で使う仕組みはどれ？"
              options={[
                { label: "matrix に production を追加する" },
                {
                  label:
                    "production 環境（Environment）に必須レビュアーを設定する",
                  correct: true,
                },
                { label: "runs-on を production にする" },
                { label: "concurrency で production を指定する" },
              ]}
              explanation="Environments に必須レビュアーを設定すると、その環境を使うジョブは承認されるまで待機します。これが継続的デリバリー（承認して本番へ）を実現する仕組みです。matrix は展開、runs-on はランナー、concurrency は同時実行制御で、いずれも承認とは関係ありません。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手を動かす — シークレットと環境を組む
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              production 環境で、シークレットのトークンを使ってデプロイする
              ジョブの <code>___</code> を埋めてください。
            </p>

            <CodingChallenge
              preview
              previewType="terminal"
              title="環境とシークレットを書こう"
              description="production 環境を指定し、secrets からデプロイトークンを env に渡します。"
              initialCode={`jobs:
  deploy:
    runs-on: ubuntu-latest
    ___: production
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        run: ./scripts/deploy.sh
        env:
          DEPLOY_TOKEN: \${{ ___.DEPLOY_TOKEN }}`}
              answer={`jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        run: ./scripts/deploy.sh
        env:
          DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}`}
              hints={[
                "デプロイ先の環境（保護環境）を指定するキーは environment",
                "登録した秘密情報を参照するコンテキストは secrets",
              ]}
              keywords={["environment", "secrets"]}
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Using secrets in GitHub Actions",
                  url: "https://docs.github.com/actions/security-guides/using-secrets-in-github-actions",
                  description: "シークレットの登録・参照・マスクの仕組み",
                },
                {
                  title: "Using environments for deployment",
                  url: "https://docs.github.com/actions/deployment/targeting-different-environments/using-environments-for-deployment",
                  description: "staging / production の分離と保護環境・承認",
                },
                {
                  title: "OpenID Connect (OIDC) の利用",
                  url: "https://docs.github.com/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect",
                  description: "長期シークレットを持たずにクラウドへ認証する",
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
