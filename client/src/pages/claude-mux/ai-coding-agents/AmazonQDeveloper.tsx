import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

export default function AmazonQDeveloper() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Amazon Q Developer
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            AWS が提供する開発者向け AI アシスタント。IDE・CLI・AWS
            マネジメントコンソールを横断して、コーディング支援と AWS
            リソースの操作・質問応答を提供する。現在は後継製品「Kiro」への
            移行期にある。
          </p>
        </div>

        <WhyNowBox
          tags={["Amazon Q Developer", "AWS", "Kiro", "コード変換", "Bedrock"]}
        >
          <p>
            AWS 上でアプリケーションを運用しているなら、「コードだけでなく AWS
            リソースそのものを理解するアシスタント」という Q Developer
            の位置づけは他のツールにない観点です。同時に、製品としては Kiro
            への移行が公式に告知されているため、「今どの部分が使えて、どこへ
            向かうのか」を正しく把握しておくことが選定の前提になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ── 重要: Kiro への移行 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              まず知っておくこと: Kiro への移行
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              AWS は公式ブログで、Amazon Q Developer の IDE
              プラグインと有料サブスクリプションを 2027 年 4 月 30
              日にサポート終了すると発表している。新規のサインアップ
              （無料枠・サブスクリプション）は 2026 年 5 月 15
              日で受付を終了した。後継はスペック駆動開発を掲げる開発環境
              「Kiro」（IDE / CLI）で、Q Developer のエージェンティック
              コーディング・インラインチャット・MCP 対応などを引き継ぐ。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      提供形態
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      現在の状況（公式発表ベース）
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      IDE プラグイン / 有料サブスク
                    </td>
                    <td className="p-3 text-muted-foreground">
                      既存ユーザーは 2027-04-30 まで利用可。新規受付は終了
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">CLI</td>
                    <td className="p-3 text-muted-foreground">
                      Kiro CLI にリブランド済み（コマンドは kiro-cli）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      AWS コンソール内のアシスタント
                    </td>
                    <td className="p-3 text-muted-foreground">
                      サンセットの対象外。継続提供される
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      コード変換（Java / .NET）
                    </td>
                    <td className="p-3 text-muted-foreground">
                      サポート終了後は AWS Transform に移管
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="warning" title="これから学ぶ人へ">
              新規に「Amazon Q Developer」を契約することはできない。AWS 系の AI
              コーディング環境をこれから選ぶ場合は Kiro（kiro.dev）が
              実質的な入口になる。このページは「AWS
              エコシステムのアシスタントに何ができるか」を把握する目的で
              読んでほしい。
            </InfoBox>
          </section>

          {/* ── 何ができるか ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              何ができるか
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              公式ドキュメントは Q Developer を「AWS アプリケーションの理解・
              構築・拡張・運用を支援する生成 AI アシスタント」と定義する。
              基盤は Amazon Bedrock 上に構築されている。
            </p>

            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  IDE でのコーディング支援
                </h3>
                <p className="text-muted-foreground">
                  VS Code・JetBrains・Visual Studio・Eclipse
                  向けプラグインで、インライン補完・チャット・エージェンティック
                  コーディング（プロジェクトを読み、差分を提案し、シェル
                  コマンドを生成・実行）・MCP サーバー連携を提供する。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  AWS リソースへの質問応答
                </h3>
                <p className="text-muted-foreground">
                  AWS マネジメントコンソール・ドキュメントサイト・モバイル
                  アプリ・Slack / Microsoft Teams から、自分の AWS
                  リソースやアーキテクチャ、ベストプラクティスについて質問
                  できる。この「運用側」の統合が最大の特色で、コンソール内
                  アシスタントはサンセット後も継続する。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  コード変換とセキュリティ
                </h3>
                <p className="text-muted-foreground">
                  Java のバージョンアップ（v8 / v11 / v17 / v21 → v17 / v21）や
                  .NET Framework からクロスプラットフォーム .NET
                  への移植を自動化する。組み込みのセキュリティスキャンと AI
                  による修復提案、公開コード類似の参照トラッカーも備える。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  CLI（現 Kiro CLI）
                </h3>
                <p className="text-muted-foreground">
                  コンテキスト対応の CLI 補完と、自然言語からの bash
                  コマンド生成を提供してきた。現在は Kiro CLI
                  として提供されている。
                </p>
              </div>
            </div>

            <CodeBlock
              language="bash"
              code={`# 現行の CLI (Kiro CLI) のインストール (macOS)
curl -fsSL https://cli.kiro.dev/install | bash

# チャットを開始
kiro-cli

# セッションの再開
kiro-cli chat --resume

# 対話中: /context でコンテキスト管理、!cmd で直接シェル実行`}
            />
          </section>

          {/* ── 認証と料金 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              認証と料金（受付終了前の体系）
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              認証は 2 系統あった。個人開発者は AWS アカウント不要の AWS Builder
              ID で無料枠を使い、組織は IAM Identity Center 経由で Pro
              プランを管理する、という構成が基本だった。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      プラン
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      料金
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      主な内容
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">Free</td>
                    <td className="p-3 text-muted-foreground">$0</td>
                    <td className="p-3 text-muted-foreground">
                      エージェンティックリクエスト 50 回/月、Java 変換 1,000
                      行/月
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">Pro</td>
                    <td className="p-3 text-muted-foreground">
                      $19/ユーザー/月
                    </td>
                    <td className="p-3 text-muted-foreground">
                      管理ダッシュボード・ポリシー管理・IP 補償、Java 変換 4,000
                      行/月（アカウントでプール）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-foreground mb-4 leading-relaxed">
              いずれも新規受付は終了している。既存の Pro サブスクリプションは
              Kiro でも利用できるが、計測単位（リクエスト vs クレジット）が
              異なると FAQ に明記されている。
            </p>
          </section>

          {/* ── Claude Code との違い ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Claude Code との違い
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      観点
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      Amazon Q Developer
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      Claude Code
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">重心</td>
                    <td className="p-3 text-muted-foreground">
                      AWS リソースの理解・運用 + コーディング支援
                    </td>
                    <td className="p-3 text-muted-foreground">
                      汎用のコーディングエージェント
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      提供環境
                    </td>
                    <td className="p-3 text-muted-foreground">
                      IDE・CLI・AWS コンソール・Slack / Teams
                    </td>
                    <td className="p-3 text-muted-foreground">
                      ターミナル・IDE 連携・CI
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      基盤モデル
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Amazon Bedrock 経由（Claude 系モデルの提供実績あり）
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Claude ファミリーを直接利用
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      製品の現在地
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Kiro への移行期（新規受付終了）
                    </td>
                    <td className="p-3 text-muted-foreground">
                      継続的に機能拡張中
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      固有の強み
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Java / .NET の大規模コード変換、AWS 運用との一体化
                    </td>
                    <td className="p-3 text-muted-foreground">
                      MCP・Hooks・Subagents 等の拡張性
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="AWS 中心のチームの現実解">
              「AWS コンソールでの運用質問は Q（コンソール内アシスタント）、
              コーディングは Kiro または他のエージェント」という分担が、
              移行期の現実的な構成になる。エンタープライズの Java
              バージョンアップのような変換タスクは AWS Transform
              系サービスの領域として切り分けて考えるとよい。
            </InfoBox>
          </section>

          {/* ── Quiz ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>

            <div className="space-y-6">
              <Quiz
                question="Amazon Q Developer の提供形態のうち、Kiro への移行後も継続提供されると公式に案内されているものはどれ？"
                options={[
                  { label: "IDE プラグイン" },
                  { label: "有料サブスクリプションの新規受付" },
                  {
                    label: "AWS マネジメントコンソール内のアシスタント",
                    correct: true,
                  },
                  { label: "Java コード変換の IDE 機能" },
                ]}
                explanation="AWS の公式発表では、IDE プラグインと有料サブスクリプションは 2027-04-30 にサポート終了、CLI は Kiro CLI にリブランド、コード変換は AWS Transform へ移管とされています。一方、AWS マネジメントコンソールなど AWS ファーストパーティ体験内のアシスタントはサンセットの対象外です。"
              />

              <Quiz
                question="Amazon Q Developer（および後継の Kiro）が他の AI コーディングツールと比べて特徴的だった点はどれ？"
                options={[
                  { label: "完全オフラインで動作する" },
                  {
                    label:
                      "コーディング支援に加えて、自分の AWS リソースへの質問や Java / .NET の大規模コード変換を扱う",
                    correct: true,
                  },
                  { label: "モデルを自分で学習させられる" },
                  { label: "ブラウザ専用で IDE には統合されない" },
                ]}
                explanation="Q Developer はコード補完・チャットに加えて、AWS コンソールからのリソース質問応答、Java バージョンアップ（v8/v11/v17/v21 → v17/v21）や .NET 移植の自動変換、セキュリティスキャンなど、AWS エコシステムと運用に踏み込んだ機能が特徴でした。"
              />
            </div>
          </section>

          {/* ── Reference Links ── */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Amazon Q Developer 公式ページ",
                  url: "https://aws.amazon.com/jp/q/developer/",
                  description: "製品概要・提供形態の一次情報",
                },
                {
                  title: "Amazon Q Developer ドキュメント",
                  url: "https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html",
                  description: "機能・認証・IDE 対応の詳細",
                },
                {
                  title: "End of support 発表 (AWS DevOps Blog)",
                  url: "https://aws.amazon.com/blogs/devops/amazon-q-developer-end-of-support-announcement/",
                  description: "サポート終了スケジュールと Kiro への移行方針",
                },
                {
                  title: "Kiro 公式ドキュメント",
                  url: "https://kiro.dev/docs/cli/",
                  description: "後継製品 Kiro CLI のインストールと使い方",
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
