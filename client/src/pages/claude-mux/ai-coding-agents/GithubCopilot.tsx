import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

export default function GithubCopilot() {
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
            GitHub Copilot
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            GitHub が提供する AI 開発アシスタント。IDE
            のコード補完から始まり、現在はチャット・CLI・自律的な
            コーディングエージェントまでを含む製品群に拡大している。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "GitHub Copilot",
            "コード補完",
            "エージェントモード",
            "コーディングエージェント",
            "モデル選択",
          ]}
        >
          <p>
            Copilot の強みは GitHub というプラットフォームとの一体化です。Issue
            をエージェントに 割り当てると PR が返ってくる、という開発フローは
            GitHub
            を使うチームなら追加のインフラなしで試せます。また、Claude・GPT・Gemini
            など複数ベンダーのモデルを 1
            つの契約で切り替えられる点も他のツールにない特徴です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ── 製品の全体像 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              製品の全体像
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              「Copilot」は単一のツールではなく、複数の提供形態の総称になっている。
            </p>

            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  IDE のコード補完とチャット
                </h3>
                <p className="text-muted-foreground">
                  VS Code・Visual Studio・JetBrains・Neovim・Xcode・Eclipse
                  等でインライン補完と Copilot Chat が使える。github.com
                  上のチャットや GitHub Mobile、Windows Terminal にも対応する。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  エージェントモード（同期・エディタ内）
                </h3>
                <p className="text-muted-foreground">
                  エディタの中でリアルタイムに協働するモード。ローカルの
                  開発環境に対して自律的に編集を行い、結果をその場で
                  確認しながら進められる。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  コーディングエージェント（非同期・クラウド）
                </h3>
                <p className="text-muted-foreground">
                  GitHub 上の Issue に「Copilot」をアサインするか{" "}
                  <code>@copilot</code> にメンションすると、GitHub Actions
                  上の一時的な開発環境でタスクを実行し、ドラフト PR
                  を作成する。GitHub MCP サーバーと Playwright MCP
                  サーバーが既定で有効。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Copilot CLI（ターミナルエージェント）
                </h3>
                <p className="text-muted-foreground">
                  ターミナルで動くエージェント。ローカルのファイル編集・Git
                  操作に加え、GitHub.com の PR・Issue・ワークフローとも
                  対話できる。MCP サーバーにも対応する。
                </p>
              </div>
            </div>
          </section>

          {/* ── インストールと始め方（CLI） ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              インストールと始め方（Copilot CLI）
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              IDE 版は各エディタの拡張機能からインストールする。ここでは
              このマニュアルの主題に近い CLI を取り上げる。Node.js 22
              以上が必要で、有効な Copilot サブスクリプションが前提となる。
            </p>

            <CodeBlock
              language="bash"
              code={`# npm でインストール（Node.js 22+）
npm install -g @github/copilot

# Homebrew (macOS / Linux)
brew install --cask copilot-cli

# 起動（初回は /login で GitHub アカウント認証）
copilot

# 非対話モード
copilot -p "この PR の変更点を要約して"`}
            />

            <InfoBox type="info" title="カスタム指示ファイル">
              リポジトリ全体の指示は{" "}
              <code>.github/copilot-instructions.md</code>{" "}
              に記述する。リポジトリ内の <code>AGENTS.md</code>
              や、ルートの <code>CLAUDE.md</code> / <code>GEMINI.md</code>{" "}
              も読み込まれるため、他のエージェントとルールを共有しやすい。
            </InfoBox>
          </section>

          {/* ── プランと料金 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              プランと料金
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              個人向けは無料プランから始められる。公式ドキュメントによると
              Copilot の利用量は「AI クレジット」で計測され、
              どのプランにも月あたりの割り当てが含まれる。 コード補完と Next
              edit suggestions は AI クレジットの対象外。
              料金・枠の体系は改定されることがあるため、
              最新は公式の料金ページで確認したい（以下は執筆時点の公式表記）。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      プラン
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      月額
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      概要
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">Free</td>
                    <td className="p-3 text-muted-foreground">$0</td>
                    <td className="p-3 text-muted-foreground">
                      補完 2,000 回/月・チャット 50 回/月
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">Pro</td>
                    <td className="p-3 text-muted-foreground">$10</td>
                    <td className="p-3 text-muted-foreground">
                      補完無制限、コーディングエージェント・コードレビュー
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">Pro+</td>
                    <td className="p-3 text-muted-foreground">$39</td>
                    <td className="p-3 text-muted-foreground">
                      高性能モデル（Opus 等）とより大きなクレジット枠
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      Business / Enterprise
                    </td>
                    <td className="p-3 text-muted-foreground">$19 / $39</td>
                    <td className="p-3 text-muted-foreground">
                      組織向け。ガバナンス・ポリシー管理・監査
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-foreground mb-4 leading-relaxed">
              認証済みの学生・教員・人気 OSS
              のメンテナーは無料でアクセスできる制度がある。
            </p>
          </section>

          {/* ── モデル選択 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              モデル選択という特徴
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              Copilot はモデルベンダーに縛られない。公式ドキュメントの
              対応モデル一覧には Anthropic の Claude 系、OpenAI の GPT
              系、Google の Gemini 系が並んでおり、プランに応じて
              タスクごとに切り替えられる（CLI では <code>/model</code>）。 「1
              つの契約で複数ベンダーのモデルを比較できる」点は、
              モデルごとの得手不得手を実務で確かめる環境として便利だ。
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
                      GitHub Copilot
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
                      IDE 補完 + GitHub プラットフォーム統合
                    </td>
                    <td className="p-3 text-muted-foreground">
                      ターミナルファーストのエージェント
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      モデル
                    </td>
                    <td className="p-3 text-muted-foreground">
                      複数ベンダーから選択（Claude / GPT / Gemini 等）
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Claude ファミリー
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      Issue → PR の自動化
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Issue アサインで標準機能として動く
                    </td>
                    <td className="p-3 text-muted-foreground">
                      GitHub Actions（claude-code-action）を自分で構成
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      指示ファイル
                    </td>
                    <td className="p-3 text-muted-foreground">
                      copilot-instructions.md / AGENTS.md / CLAUDE.md も参照
                    </td>
                    <td className="p-3 text-muted-foreground">CLAUDE.md</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="補完とエージェントは併用できる">
              「タイピング中の補完は Copilot、タスク単位の作業は Claude
              Code」という併用は実務でよく見られる構成だ。役割が重ならないため、
              どちらかを選ぶ必要は必ずしもない。詳しくはマルチ AI
              セクションで扱う。
            </InfoBox>
          </section>

          {/* ── Quiz ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>

            <div className="space-y-6">
              <Quiz
                question="Copilot の「エージェントモード」と「コーディングエージェント」の違いとして正しいのはどれ？"
                options={[
                  { label: "名前が違うだけで同じ機能" },
                  {
                    label:
                      "エージェントモードはエディタ内で同期的に、コーディングエージェントは GitHub 上で非同期に動き PR を作る",
                    correct: true,
                  },
                  {
                    label:
                      "エージェントモードは有料、コーディングエージェントは無料",
                  },
                  { label: "どちらも CLI 専用の機能" },
                ]}
                explanation="エージェントモードはエディタ内のリアルタイム協働（ローカル環境を直接編集）、コーディングエージェントは Issue のアサインやメンションを起点に GitHub Actions 上の環境で非同期に作業してドラフト PR を作る機能です。同期/非同期・ローカル/クラウドという軸で使い分けます。"
              />

              <Quiz
                question="リポジトリ全体に適用される Copilot のカスタム指示を置く標準的な場所はどれ？"
                options={[
                  { label: "package.json の copilot フィールド" },
                  { label: ".github/copilot-instructions.md", correct: true },
                  { label: ".vscode/copilot.json" },
                  { label: "README.md の先頭" },
                ]}
                explanation=".github/copilot-instructions.md がリポジトリ全体のカスタム指示ファイルです。パス別の指示は .github/instructions/ 配下、またリポジトリ内の AGENTS.md やルートの CLAUDE.md / GEMINI.md も参照されるため、複数エージェントでルールを共有できます。"
              />
            </div>
          </section>

          {/* ── Reference Links ── */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "GitHub Copilot ドキュメント",
                  url: "https://docs.github.com/copilot",
                  description: "機能・プラン・設定の一次情報",
                },
                {
                  title: "GitHub Copilot features / pricing",
                  url: "https://github.com/features/copilot",
                  description: "プラン別の料金と機能比較",
                },
                {
                  title: "Copilot CLI について",
                  url: "https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli",
                  description: "ターミナルエージェントの概念と使い方",
                },
                {
                  title: "コーディングエージェントについて",
                  url: "https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent",
                  description: "Issue アサインから PR 作成までの仕組み",
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
