import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import MermaidDiagram from "@/components/MermaidDiagram";

const concepts = [
  {
    term: "イベント (event)",
    desc: "ワークフローを起動するきっかけ。push・pull_request・スケジュール・手動実行などがある。",
  },
  {
    term: "ワークフロー (workflow)",
    desc: ".github/workflows/ に置く YAML ファイル 1 つ。1 リポジトリに複数置ける。",
  },
  {
    term: "ジョブ (job)",
    desc: "ワークフロー内の実行単位。既定では並列に走り、needs で順序を付けられる。",
  },
  {
    term: "ステップ (step)",
    desc: "ジョブの中の手順。上から順に実行される。コマンド実行かアクション呼び出し。",
  },
  {
    term: "アクション (action)",
    desc: "再利用できる部品。checkout や setup-node など公式・サードパーティ製がある。",
  },
  {
    term: "ランナー (runner)",
    desc: "ジョブを実際に動かすマシン。GitHub がホストする仮想環境か、自前のサーバー。",
  },
];

export default function Intro() {
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
            GitHub Actions と CI/CD 入門
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            GitHub Actions は、GitHub に組み込まれた自動化の仕組みです。push や
            プルリクエストといった「リポジトリで起きたこと」をきっかけに、検査・ビルド・
            デプロイを自動で走らせられます。この編では、最初のワークフローから
            CI/CD パイプラインの実践までを、YAML を書きながら一通り体験します。
          </p>
        </div>

        <WhyNowBox tags={["CI/CD", "自動化", "GitHub", "再現性"]}>
          <p>
            「手元では動いたのに、他の人の環境では壊れる」——
            この事故の多くは、検査やリリースの手順が人の記憶に依存していることから生まれます。
            GitHub Actions は、その手順を YAML
            として書き出し、毎回同じ順番で機械に実行させます。
            価値があるのは自動化そのものより、
            <strong>誰がやっても同じ結果になる</strong>という再現性です。
            ブランチ操作を学んだ次のステップとして、
            「そのブランチが安全かを機械に検査させる」段階に進みます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CI と CD は何をする仕組みか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              CI（継続的インテグレーション）は、変更を共有ブランチに統合するたびに
              <strong>自動で検査する</strong>
              仕組みです。lint・型チェック・テスト・
              ビルドが通るかをマージ前に確認し、壊れた変更を早い段階で止めます。
              CD（継続的デリバリー / デプロイ）は、検査を通った成果物を
              <strong>決められた環境へ自動で届ける</strong>仕組みです。 GitHub
              Actions は、この両方を同じ YAML の中で扱えます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  CI（統合を検査する）
                </h3>
                <p className="text-xs text-primary font-medium mb-2">
                  lint / test / build
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  push や PR のたびに走り、変更が壊れていないかを確認する。
                  落ちたらマージを止める、という「門番」の役割を担う。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  CD（成果物を届ける）
                </h3>
                <p className="text-xs text-primary font-medium mb-2">
                  deploy / release
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  CI を通った成果物を staging や本番へ届ける。
                  承認を挟む形（デリバリー）と、検査を通れば自動で出す形（デプロイ）がある。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              GitHub Actions の登場人物
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              GitHub Actions を読み書きするには、6
              つの言葉を押さえれば十分です。 上から下へ「大きい単位 →
              小さい単位」に並んでいます。 この階層が頭に入っていると、YAML
              のどこを直せばよいかが分かります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {concepts.map((c) => (
                <div
                  key={c.term}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {c.term}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>

            <MermaidDiagram
              title="図: イベントからステップまでの流れ"
              chart={`flowchart TB
    E["イベント（push / PR）"] --> W["ワークフロー（ci.yml）"]
    W --> J1["ジョブ: lint"]
    W --> J2["ジョブ: test"]
    J1 --> S1["ステップ: checkout"]
    J1 --> S2["ステップ: npm run lint"]
    J2 --> S3["ステップ: checkout"]
    J2 --> S4["ステップ: npm test"]`}
            />
          </section>

          <section>
            <Quiz
              question="GitHub Actions で「ワークフローを起動するきっかけ」を指す言葉はどれ？"
              options={[
                { label: "ジョブ (job)" },
                { label: "イベント (event)", correct: true },
                { label: "ランナー (runner)" },
                { label: "アクション (action)" },
              ]}
              explanation="ワークフローは、リポジトリで起きたイベント（push・pull_request・schedule・workflow_dispatch など）をきっかけに起動します。ジョブはワークフロー内の実行単位、ランナーは実際に動かすマシン、アクションは再利用できる部品です。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              どこで動くのか — ランナーと料金
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ジョブは<strong>ランナー</strong>
              と呼ばれるマシンの上で実行されます。 最も手軽なのは GitHub
              がホストするランナー（
              <code>ubuntu-latest</code>{" "}
              など）で、ジョブごとにまっさらな仮想環境が
              立ち上がり、終わると破棄されます。手元の PC
              には何もインストールされません。
              大きなビルドや特殊な環境が必要なときは、自前のマシンを
              <strong>セルフホストランナー</strong>
              として登録することもできます。
            </p>

            <InfoBox
              type="info"
              title="無料枠は「仕様の値」、実測は使い方で変わる"
            >
              パブリックリポジトリでの GitHub ホストランナーは基本的に無料です。
              プライベートリポジトリには毎月の無料実行時間（分）が用意されていますが、
              これは<strong>仕様上の上限値</strong>で、実測の消費は OS
              係数で変わります。 Linux は 1 倍ですが、Windows は 2 倍、macOS は
              10 倍の速さで 分を消費します。同じ 10 分のジョブでも、macOS では
              100 分ぶん減ります。 無料枠の残量を気にするときは「実行時間 × OS
              係数」で見積もります。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              この編で作るもの
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              次のページから、実際に手を動かして次のものを組み立てていきます。
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">1.</span>
                <span>最初のワークフロー YAML と、その各キーの意味</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">2.</span>
                <span>
                  トリガーの絞り込みと、ジョブ間の依存・条件分岐・マトリクス
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">3.</span>
                <span>
                  Node / React 向けの CI パイプライン（lint・test・build
                  とキャッシュ）
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">4.</span>
                <span>
                  シークレット・環境の分離と、デプロイ（CD）の組み立て
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">5.</span>
                <span>再利用ワークフロー・最適化・失敗したときの調べ方</span>
              </li>
            </ul>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "GitHub Actions ドキュメント",
                  url: "https://docs.github.com/actions",
                  description:
                    "ワークフロー・ジョブ・ステップの構文と、公式の入門ガイド",
                },
                {
                  title: "Understanding GitHub Actions",
                  url: "https://docs.github.com/actions/learn-github-actions/understanding-github-actions",
                  description:
                    "イベント・ジョブ・ランナーといった中核概念の解説",
                },
                {
                  title: "About billing for GitHub Actions",
                  url: "https://docs.github.com/billing/managing-billing-for-github-actions/about-billing-for-github-actions",
                  description:
                    "無料枠の分数と OS 別の消費係数の公式リファレンス",
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
