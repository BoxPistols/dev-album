import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

export default function GeminiCli() {
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
            Gemini CLI
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Google が提供するオープンソースのターミナル AI エージェント。Gemini
            モデルをコマンドラインから直接利用でき、 個人の Google
            アカウントによる無料枠が用意されている。
          </p>
        </div>

        <WhyNowBox
          tags={["Gemini CLI", "Google", "オープンソース", "無料枠", "MCP"]}
        >
          <p>
            Claude Code と同じ「ターミナルで動く AI
            エージェント」というカテゴリの中で、 Gemini CLI は Apache 2.0
            ライセンスのオープンソースであること、
            そして個人アカウントでの無料枠が大きいことが特徴です。
            複数のエージェントを比較・併用するうえで、まず押さえておきたい選択肢のひとつです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ── インストールと始め方 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              インストールと始め方
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              npm パッケージとして配布されており、インストールせずに npx
              で試すこともできる。macOS では Homebrew にも対応している。
            </p>

            <CodeBlock
              language="bash"
              code={`# インストールせずにすぐ実行
npx @google/gemini-cli

# グローバルインストール
npm install -g @google/gemini-cli

# Homebrew (macOS)
brew install gemini-cli

# 起動
gemini`}
            />

            <p className="text-foreground mt-6 mb-4 leading-relaxed">
              認証は 3 つの方法から選べる。個人の Google
              アカウントでログインする方法が最も手軽で、公式ブログによると 1
              分あたり 60 リクエスト・1 日 1,000
              リクエストまで無料で利用できる。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      認証方法
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      特徴
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      Google アカウント (OAuth)
                    </td>
                    <td className="p-3 text-muted-foreground">
                      無料。60 リクエスト/分・1,000 リクエスト/日
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      Gemini API キー
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Google AI Studio で発行。従量課金にも対応
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      Vertex AI
                    </td>
                    <td className="p-3 text-muted-foreground">
                      企業向け。課金アカウントでより高いレート上限
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="bash"
              code={`# API キーを使う場合
export GEMINI_API_KEY="YOUR_KEY"`}
            />
          </section>

          {/* ── 基本的な使い方 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              基本的な使い方
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              <code>gemini</code> で対話モードを起動する。Claude Code
              と同様にスラッシュコマンドが用意されており、
              <code>@</code> でファイルを参照、<code>!</code>
              でシェルコマンドを実行できる。
            </p>

            <CodeBlock
              language="bash"
              code={`# 対話モードを起動
gemini

# 1 回だけ実行する非対話モード
gemini -p "このリポジトリの構成を要約して"

# JSON 形式で出力（スクリプト連携向け）
gemini -p "依存関係を一覧して" --output-format json

# モデルを指定して起動
gemini -m <model>`}
            />

            <p className="text-foreground mt-6 mb-4 leading-relaxed">
              対話モードでよく使うスラッシュコマンド:
            </p>

            <CodeBlock
              language="bash"
              code={`/help        # ヘルプを表示
/tools       # 利用可能なビルトインツール一覧
/mcp         # MCP サーバーの管理
/memory      # GEMINI.md（コンテキストファイル）の管理
/restore     # チェックポイントからの復元
/stats       # セッションの統計情報
/model       # モデルの切り替え

@src/App.tsx # ファイル内容をプロンプトに注入
!git status  # シェルコマンドを直接実行`}
            />

            <InfoBox type="warning" title="承認モードと YOLO モード">
              既定ではファイル編集やコマンド実行のたびに承認を求められる。
              <code>--approval-mode</code> で <code>default</code> /{" "}
              <code>auto_edit</code> / <code>plan</code>（読み取り専用） /{" "}
              <code>yolo</code>（全自動承認）を切り替えられる。
              <code>--yolo</code> は便利だが、意図しない変更を防ぐ仕組みが
              なくなるため、使いどころを見極めたい。
            </InfoBox>
          </section>

          {/* ── 特徴と得意分野 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              特徴と得意分野
            </h2>

            <div className="space-y-4 mb-8">
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Google 検索グラウンディング
                </h3>
                <p className="text-muted-foreground">
                  Google 検索によるグラウンディングがビルトインツールとして
                  組み込まれており、最新のドキュメントやライブラリ情報を
                  参照しながら回答を組み立てられる。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  GEMINI.md によるコンテキスト管理
                </h3>
                <p className="text-muted-foreground">
                  カレントディレクトリから上位へ階層的に GEMINI.md
                  を探索し、プロジェクトのルールを読み込む。Claude Code の
                  CLAUDE.md に相当する仕組みで、<code>/init</code>{" "}
                  で雛形を生成できる。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  チェックポイント機能
                </h3>
                <p className="text-muted-foreground">
                  ファイル変更前にプロジェクト状態のスナップショットを自動保存し、
                  <code>/restore</code> で巻き戻せる。既定では無効で、
                  settings.json の{" "}
                  <code>general.checkpointing.enabled: true</code>{" "}
                  で有効化する。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  MCP・拡張機能・GitHub Actions
                </h3>
                <p className="text-muted-foreground">
                  MCP サーバーによるツール拡張に対応。公式の GitHub Action
                  （google-github-actions/run-gemini-cli）を使うと、PR
                  の自動レビューや Issue トリアージ、<code>@gemini-cli</code>{" "}
                  メンションによる呼び出しを CI 上で運用できる。
                </p>
              </div>
            </div>

            <p className="text-foreground mb-4 leading-relaxed">
              モデルは既定で <code>auto</code>{" "}
              設定になっており、シンプルなプロンプトには Gemini 2.5
              Flash、複雑なプロンプトには Gemini 3 Pro（有効な場合。無効時は
              Gemini 2.5 Pro）が自動で使い分けられる。コンテキストウィンドウは
              100 万トークン。
            </p>
          </section>

          {/* ── Claude Code との違い ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Claude Code との違い
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              どちらもターミナルで動くコーディングエージェントで、
              スラッシュコマンド・コンテキストファイル・MCP
              対応など設計は似ている。優劣ではなく、次のような特性の違いとして
              捉えるのが実用的だ。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      観点
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      Gemini CLI
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      Claude Code
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      ライセンス
                    </td>
                    <td className="p-3 text-muted-foreground">
                      オープンソース（Apache 2.0）
                    </td>
                    <td className="p-3 text-muted-foreground">
                      プロプライエタリ
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      無料での利用
                    </td>
                    <td className="p-3 text-muted-foreground">
                      個人 Google アカウントで 1,000 リクエスト/日
                    </td>
                    <td className="p-3 text-muted-foreground">
                      サブスクリプションまたは API 従量課金が前提
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      コンテキストファイル
                    </td>
                    <td className="p-3 text-muted-foreground">GEMINI.md</td>
                    <td className="p-3 text-muted-foreground">CLAUDE.md</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      Web 検索
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Google 検索グラウンディング内蔵
                    </td>
                    <td className="p-3 text-muted-foreground">
                      WebSearch / WebFetch ツール
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      モデル
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Gemini ファミリー（auto ルーティング）
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Claude ファミリー（Opus / Sonnet / Haiku）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="併用する場合の視点">
              Gemini CLI の無料枠は「まず AI
              エージェントの働き方を体験する」入口として使いやすい。
              コンテキストファイルは GEMINI.md と CLAUDE.md
              で分かれるため、共通ルールを AGENTS.md
              等に集約して参照させる設計（マルチ AI
              セクションで詳述）を検討するとよい。
            </InfoBox>
          </section>

          {/* ── Quiz ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>

            <div className="space-y-6">
              <Quiz
                question="Gemini CLI で、プロジェクト固有のルールをエージェントに読み込ませるためのコンテキストファイルはどれ？"
                options={[
                  { label: "CLAUDE.md" },
                  { label: "GEMINI.md", correct: true },
                  { label: "gemini.config.js" },
                  { label: ".geminirc" },
                ]}
                explanation="Gemini CLI はカレントディレクトリから上位に向かって GEMINI.md を階層的に探索し、指示コンテキストとして読み込みます。/init で雛形を生成、/memory で管理できます。Claude Code の CLAUDE.md に相当する仕組みです。"
              />

              <Quiz
                question="Gemini CLI を個人の Google アカウントで無料利用する場合の 1 日あたりのリクエスト上限は？"
                options={[
                  { label: "100 リクエスト" },
                  { label: "500 リクエスト" },
                  { label: "1,000 リクエスト", correct: true },
                  { label: "無制限" },
                ]}
                explanation="公式発表では、個人 Google アカウントでのログイン利用は 60 リクエスト/分・1,000 リクエスト/日まで無料です。より多く使う場合は API キーの従量課金や Gemini Code Assist の有料ライセンスに切り替えます。"
              />
            </div>
          </section>

          {/* ── Reference Links ── */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "google-gemini/gemini-cli (GitHub)",
                  url: "https://github.com/google-gemini/gemini-cli",
                  description:
                    "公式リポジトリ。インストール方法・認証・機能一覧",
                },
                {
                  title: "Gemini CLI 公式ドキュメント",
                  url: "https://geminicli.com/docs/",
                  description:
                    "コマンドリファレンス・設定・チェックポイント等の詳細",
                },
                {
                  title: "Google 公式ブログ: Introducing Gemini CLI",
                  url: "https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-cli-open-source-ai-agent/",
                  description: "リリース発表。無料枠と提供方針の一次情報",
                },
                {
                  title: "run-gemini-cli (GitHub Actions)",
                  url: "https://github.com/google-github-actions/run-gemini-cli",
                  description:
                    "公式 GitHub Action。PR レビューや Issue トリアージの自動化",
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
