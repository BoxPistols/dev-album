import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";

export default function SecretsPermissions() {
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
            トークン・シークレット・権限の実務
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            自動化でつまずく多くは「認証・トークン・権限」です。どの認証を
            いつ使うか、トークンをどこで発行してどこに登録するか、権限を
            どこまで絞るか。ここを一度地図にしておくと、詰まったときに
            戻ってこられます。
          </p>
        </div>

        <WhyNowBox tags={["PAT", "secrets", "GITHUB_TOKEN", "permissions"]}>
          <p>
            シークレットの利用（次ページ）に進む前に、その手前の「発行と登録と
            権限付与」を押さえます。ここが曖昧なままだと、CI が急に 403 で
            落ちる・push でパスワードを聞かれる・fork の PR で secret が空、
            といった詰まりの原因が分からず時間を溶かします。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              まず全体地図 — どの認証をいつ使うか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              GitHub の認証は 1 つではありません。「ローカルから操作するのか」
              「ワークフローから操作するのか」「自リポジトリか、他リポジトリや
              クラウドか」で使うものが変わります。
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 text-left">
                    <th className="px-4 py-3 font-bold text-foreground">
                      認証
                    </th>
                    <th className="px-4 py-3 font-bold text-foreground">
                      いつ使う
                    </th>
                    <th className="px-4 py-3 font-bold text-foreground">
                      主な用途
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium align-top whitespace-nowrap">
                      SSH キー
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      ローカルから恒常的に push / clone
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      個人マシンの日常的な git 操作
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium align-top whitespace-nowrap">
                      HTTPS + PAT
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      SSH を使わず HTTPS で認証したい
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      パスワード代わりのトークンで push / API
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium align-top whitespace-nowrap">
                      gh（GitHub CLI）
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      ローカルで対話的にログイン・PR 操作
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      <code>gh auth login</code> が裏でトークンを管理
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium align-top whitespace-nowrap">
                      GITHUB_TOKEN
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      ワークフローから自リポジトリを操作
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      Actions が自動発行。<code>permissions</code> で制御
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium align-top whitespace-nowrap">
                      PAT をシークレット登録
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      GITHUB_TOKEN では権限が届かない
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      他リポジトリ・組織 Projects への操作
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium align-top whitespace-nowrap">
                      GitHub App
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      組織で細かい権限・高いレート制限
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      Bot / 恒常的な自動化の本命
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium align-top whitespace-nowrap">
                      OIDC
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      クラウドへ長期鍵を置かずデプロイ
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      AWS 等へ <code>id-token: write</code> で一時認証
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              PAT（Personal Access Token）を発行する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              HTTPS での push や、ワークフローから広い権限が要るときに使うのが
              PAT です。新規は、リポジトリと権限を細かく絞れる{" "}
              <strong>Fine-grained token</strong> を選びます。
            </p>
            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  発行場所
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  右上アバター →{" "}
                  <strong>
                    Settings → Developer settings → Personal access tokens →
                    Fine-grained tokens
                  </strong>{" "}
                  → Generate new token
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  対象と期限を絞る
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Resource owner と Repository access（対象リポジトリ）を選び、
                  有効期限（最長 1 年）を設定します。全リポジトリではなく
                  必要なものだけを選ぶのが安全です。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  権限は必要な分だけ
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Permissions で、使う操作にだけチェックを入れます（例: Contents
                  = Read and write、Pull requests = Read and write）。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  発行直後にコピー
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  トークンは発行時に一度だけ表示されます。その場でコピーし、
                  シークレット等の安全な場所に保管します（画面を閉じると
                  二度と見られません）。
                </p>
              </div>
            </div>

            <div className="mt-6" />
            <InfoBox type="info" title="Fine-grained と classic の違い">
              classic トークンは <code>repo</code> のような粗いスコープで、 1
              つで多くの操作ができてしまい強力すぎます。fine-grained は
              リポジトリと権限を個別に絞れ、期限も必須です。特別な理由が
              なければ fine-grained を選びます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              シークレットを登録する（とスコープ）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              発行したトークンや API キーは、コードに書かず
              <strong>シークレット</strong>として登録します。登録場所は
              リポジトリの{" "}
              <strong>Settings → Secrets and variables → Actions</strong> → New
              repository secret。名前（大文字英数と <code>_</code>）と値を
              入れて保存します。参照はワークフローから行います。
            </p>
            <CodeBlock
              language="yaml"
              title="登録したシークレットを参照する"
              code={`steps:
  - name: デプロイ
    run: ./scripts/deploy.sh
    env:
      DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}`}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  Repository
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  そのリポジトリ全体で使える。最も基本。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  Environment
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  本番・ステージング等の環境ごと。承認ゲートと併用できる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  Organization
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  複数リポジトリで共有。対象リポジトリを絞れる。
                </p>
              </div>
            </div>

            <div className="mt-6" />
            <InfoBox type="warning" title="Dependabot のシークレットは別枠">
              Actions のシークレットは、Dependabot のワークフローからは
              見えません。Dependabot 用は{" "}
              <strong>Settings → Secrets and variables → Dependabot</strong>{" "}
              に別途登録します。「登録したのに Dependabot の PR で使えない」は、
              ほぼこれが原因です。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              GITHUB_TOKEN の権限を理解する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ワークフローには <code>GITHUB_TOKEN</code> が自動で渡されます。
              その既定の強さは、リポジトリの{" "}
              <strong>
                Settings → Actions → General → Workflow permissions
              </strong>{" "}
              で決まります。ベストは「既定は読み取りのみにして、必要な権限だけ
              ワークフローの <code>permissions</code> で足す」最小権限です。
            </p>
            <CodeBlock
              language="yaml"
              title="ワークフローで最小権限を宣言する"
              code={`permissions:
  contents: read        # 既定は読み取りだけに絞る
  pull-requests: write  # PR にラベル/コメントする時だけ足す`}
            />
            <InfoBox type="info" title="このサイトのリポジトリでの実例">
              この教材リポジトリの CI は{" "}
              <code>permissions: contents: read</code>{" "}
              で読み取りに固定し、labeler だけが{" "}
              <code>pull-requests: write</code> を持ちます。役割ごとに必要な分
              だけ渡す、を実演しています。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              よくあるハマり集
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 text-left">
                    <th className="px-4 py-3 font-bold text-foreground">
                      症状
                    </th>
                    <th className="px-4 py-3 font-bold text-foreground">
                      原因
                    </th>
                    <th className="px-4 py-3 font-bold text-foreground">
                      対処
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium align-top">
                      HTTPS の push でパスワードを聞かれ通らない
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      パスワード認証は廃止されている
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      PAT をパスワード代わりに入力（または gh / SSH）
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium align-top">
                      Actions が push / ラベル付けで 403
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      GITHUB_TOKEN が読み取り専用
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      Workflow permissions を read-write に、または{" "}
                      <code>permissions</code> で付与
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium align-top">
                      fork からの PR で secret が空
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      fork の PR は secret を読めない（安全のため）
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      コードを実行しない用途で <code>pull_request_target</code>{" "}
                      を使う
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium align-top">
                      fine-grained PAT で 404 / 権限不足
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      対象リポジトリ・権限を明示付与していない
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      作成時にリポジトリ選択＋必要権限を許可
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium align-top">
                      ある日突然 CI が認証エラー
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      PAT の有効期限切れ
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      期限を更新、可能なら GitHub App / OIDC へ移行
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium align-top">
                      Dependabot の PR で secret が使えない
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      Dependabot secret は Actions secret と別枠
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      Secrets → Dependabot に登録する
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <Quiz
              question="fork から来た PR のワークフローで secrets が空になるのはなぜ？"
              options={[
                {
                  label:
                    "セキュリティのため、fork の pull_request には書き込みトークンと secret が渡らない",
                  correct: true,
                },
                { label: "secret の名前が小文字だから" },
                { label: "GITHUB_TOKEN の有効期限が切れているから" },
                { label: "リポジトリで Actions が無効化されているから" },
              ]}
              explanation="fork の PR で secret を渡すと、悪意あるコードに秘密が漏れる恐れがあります。そのため GitHub は fork からの pull_request を読み取り専用・secret なしで実行します。ベース権限が要る用途は、fork のコードを実行しない前提で pull_request_target に限定して使います。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手を動かす — 最小権限を足す
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              PR にコメントやラベルを付けるワークフローに、必要な最小権限を
              足します。<code>___</code> を埋めてください。
            </p>
            <CodingChallenge
              preview
              previewType="terminal"
              title="permissions を最小で宣言しよう"
              description="読み取りは絞りつつ、PR への書き込みだけを許可します。"
              initialCode={`permissions:
  contents: read
  pull-requests: ___`}
              answer={`permissions:
  contents: read
  pull-requests: write`}
              hints={["書き込みを許可する値は write（read の反対）"]}
              keywords={["write"]}
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Personal access tokens の管理",
                  url: "https://docs.github.com/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens",
                  description: "fine-grained / classic トークンの発行と権限",
                },
                {
                  title: "Actions でシークレットを使う",
                  url: "https://docs.github.com/actions/security-guides/using-secrets-in-github-actions",
                  description: "シークレットの登録とスコープ、参照方法",
                },
                {
                  title: "GITHUB_TOKEN の自動認証",
                  url: "https://docs.github.com/actions/security-guides/automatic-token-authentication",
                  description: "既定権限と permissions による制御",
                },
                {
                  title: "OIDC によるセキュリティ強化",
                  url: "https://docs.github.com/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect",
                  description: "長期鍵を置かずクラウドへデプロイする",
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
