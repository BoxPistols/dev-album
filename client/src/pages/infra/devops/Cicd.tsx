import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const stages = [
  {
    title: "CI（継続的インテグレーション）",
    examples: "lint / test / build",
    description:
      "コードを共有ブランチに統合するたびに、自動で検査する仕組み。書式・型・テスト・ビルドが通るかをマージ前に確認し、壊れた変更を早い段階で止める。",
  },
  {
    title: "CD（継続的デリバリー / デプロイ）",
    examples: "deploy / release",
    description:
      "CI を通った成果物を、決められた環境へ自動で届ける仕組み。承認を挟んで手動で出す形（デリバリー）と、検査を通れば自動で本番へ出す形（デプロイ）がある。",
  },
  {
    title: "パイプライン",
    examples: "workflow",
    description:
      "CI と CD をつないだ一連の流れ。push や PR をきっかけに、検査からデプロイまでが順番に走る。各段が独立して再実行できると運用が楽になる。",
  },
];

const deployStrategies = [
  {
    title: "ローリング",
    description:
      "稼働中のインスタンスを少しずつ新バージョンへ入れ替える。追加リソースが少なく済む一方、切り替え中は新旧が混在する。",
  },
  {
    title: "ブルーグリーン",
    description:
      "新環境（グリーン）を別に立て、検証後にトラフィックをまるごと切り替える。問題があれば旧環境（ブルー）へ即座に戻せる。",
  },
  {
    title: "カナリア",
    description:
      "新バージョンへ一部のトラフィックだけを流し、指標を見ながら段階的に比率を上げる。影響範囲を絞って異常を早く検知できる。",
  },
];

export default function Cicd() {
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
            CI/CD パイプライン
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            CI/CD
            は、コードの検査からデプロイまでを自動化し、変更を小さく安全に届けるための仕組みです。
            ここでは CI と CD の役割の違い、GitHub Actions の基本構造、
            キャッシュやマトリクスによる効率化、環境とシークレットの扱い、
            そして代表的なデプロイ戦略までを、一通り体験できる形で整理します。
          </p>
        </div>

        <WhyNowBox tags={["CI", "CD", "GitHub Actions", "デプロイ", "自動化"]}>
          <p>
            手元では動くのに本番で壊れる、という事故の多くは
            「検査とリリースが人の手と記憶に依存している」ことから生まれます。
            CI/CD
            は、その手順をコードとして書き出し、毎回同じ順番で機械に実行させる仕組みです。
            自動化そのものより、<strong>誰がやっても同じ結果になる</strong>
            という再現性に価値があります。
            デプロイ戦略を知っておくと、リリースの不安を「設計で減らせるもの」として扱えるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CI と CD は何が違うのか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              CI と CD はひとつながりに語られますが、担う役割は分かれています。
              CI は「統合した変更が壊れていないかを検査する」段階、 CD
              は「検査を通った成果物を環境へ届ける」段階です。
              間にビルド成果物（アーティファクト）を挟むことで、検査とデプロイを別々に扱えます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stages.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {s.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {s.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="デリバリーとデプロイの線引き">
              CD
              の「D」は、継続的デリバリー（Delivery）と継続的デプロイ（Deployment）の
              両方に使われます。デリバリーは「いつでも本番へ出せる状態を保つが、最後の一押しは人が承認する」、
              デプロイは「検査を通れば人の承認なしに本番へ出す」。
              どちらが適切かは、変更の影響範囲とロールバックのしやすさで決まります。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              GitHub Actions の基本構造
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              GitHub Actions では、<code>.github/workflows/</code> 配下に置いた
              YAML が ワークフローになります。ワークフローは{" "}
              <strong>job</strong> の集まりで、 job は <strong>step</strong>{" "}
              の並びです。job は既定で並列に走り、 step
              は上から順に実行されます。下は push と PR をきっかけに、
              lint・test・build を順に走らせる最小構成です。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/workflows/ci.yml"
              code={`name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - name: チェックアウト
        uses: actions/checkout@v4

      - name: Node のセットアップ
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: 依存をインストール
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test

      - name: Build
        run: npm run build`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>on</code> がトリガー、<code>jobs</code> が実行単位、
              <code>steps</code> が手順です。<code>uses</code> は公開された
              アクションの再利用、<code>run</code>{" "}
              はシェルコマンドの実行を指します。 この粒度で書いておくと、どの
              step で落ちたかがログから一目で分かります。
            </p>
          </section>

          <section>
            <Quiz
              question="GitHub Actions のワークフローで、job と step の関係として正しいのはどれ？"
              options={[
                {
                  label: "job は step の中に含まれ、step が最上位の単位である",
                },
                {
                  label:
                    "ワークフローは job の集まりで、各 job は step の並びから成る",
                  correct: true,
                },
                { label: "job と step は同じもので、名前が違うだけ" },
                { label: "step は必ず複数の job にまたがって実行される" },
              ]}
              explanation="ワークフロー > job > step という階層です。job は既定で並列に実行され、step は job の中で上から順に実行されます。job 間に依存を持たせたいときは needs を使って順序を制御します。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              キャッシュとマトリクスで効率化する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              毎回ゼロから依存をインストールすると、CI は遅くなります。
              <strong>キャッシュ</strong>
              は、依存やビルド成果物を実行間で再利用して時間を縮める仕組みです。
              <strong>マトリクス</strong>は、ひとつの job を複数の条件（Node
              のバージョンや OS）で
              並列に展開する仕組みで、互換性をまとめて検査できます。
            </p>

            <CodeBlock
              language="yaml"
              title="マトリクスとキャッシュ"
              code={`jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: npm
      - run: npm ci
      - run: npm test`}
            />

            <InfoBox
              type="warning"
              title="キャッシュは「速くするもの」で「正しさを保証しない」"
            >
              キャッシュのキー設計を誤ると、古い依存を引いたまま成功してしまい、
              手元では再現しない緑のチェックが残ることがあります。 キーには
              lockfile
              のハッシュを含め、依存が変われば必ずキャッシュも変わるようにします。
              仕様では「同じ入力なら同じ結果」ですが、実測ではキャッシュ汚染でズレることがあるため、
              疑わしいときはキャッシュを無効化して走らせ直すのが確実です。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              環境とシークレットを分ける
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              デプロイ先は通常、検証用の <strong>staging</strong> と 本番の{" "}
              <strong>production</strong> に分かれます。 GitHub Actions の
              Environments を使うと、環境ごとに
              シークレットや承認ルール（保護環境）を設定できます。 API
              キーやデプロイトークンといった秘密情報は、コードに直接書かず
              <code>secrets</code> から参照します。
            </p>

            <CodeBlock
              language="yaml"
              title="環境とシークレットの参照"
              code={`jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: デプロイ
        run: ./scripts/deploy.sh
        env:
          DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              シークレットはログにそのまま出さないよう、Actions
              側で自動的にマスクされます。
              ただし加工して出力すると漏れることがあるため、 秘密情報は echo
              せず、必要な箇所だけで使うのが基本です。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デプロイ戦略の概観
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              本番へ新バージョンを出す方法は一つではありません。
              ダウンタイムをどこまで許容できるか、問題発生時にどれだけ早く戻せるかで、
              適した戦略が変わります。代表的な3つを押さえておきます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {deployStrategies.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              どの戦略でも共通して重要なのは、
              <strong>異常を検知したらすぐ戻せる経路</strong>
              を用意しておくことです。
              ブルーグリーンとカナリアは切り戻しが速く、ローリングは追加リソースが少ない、
              という特性で選び分けます。
            </p>
          </section>

          <section>
            <Quiz
              question="リリース直後に一部のユーザーだけへ新バージョンを流し、指標を見ながら段階的に拡大したい。適した戦略はどれ？"
              options={[
                { label: "ローリングデプロイ" },
                { label: "ブルーグリーンデプロイ" },
                { label: "カナリアデプロイ", correct: true },
                { label: "一括（ビッグバン）デプロイ" },
              ]}
              explanation="カナリアデプロイは、新バージョンへ少量のトラフィックを流して指標を観察し、問題がなければ比率を上げていく方式です。影響範囲を絞れるため、異常を小さいうちに検知できます。ブルーグリーンは「全体を一気に切り替えて、問題があれば全体を戻す」点が異なります。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "GitHub Actions ドキュメント",
                  url: "https://docs.github.com/actions",
                  description:
                    "ワークフロー・job・step の構文、キャッシュやマトリクスの公式リファレンス",
                },
                {
                  title: "Workflow syntax for GitHub Actions",
                  url: "https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions",
                  description: "YAML の各キー（on / jobs / steps）の仕様",
                },
                {
                  title: "Using environments for deployment",
                  url: "https://docs.github.com/actions/deployment/targeting-different-environments/using-environments-for-deployment",
                  description:
                    "staging / production の分離と保護環境・承認の設定",
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
