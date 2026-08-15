import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

export default function OpenAiCodex() {
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
            OpenAI Codex
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            OpenAI のコーディングエージェント。ターミナルで動く CLI、IDE
            拡張、クラウド実行環境、GitHub 連携という複数の形態で提供され、
            ChatGPT アカウントでサインインして使える。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "Codex CLI",
            "ChatGPT",
            "AGENTS.md",
            "サンドボックス",
            "クラウドタスク",
          ]}
        >
          <p>
            Codex は「ローカルの CLI」と「クラウドの非同期エージェント」を
            同じアカウントで行き来できる点が特徴です。手元で対話しながら進める作業と、
            クラウドに委任して並列で走らせる作業を使い分けるスタイルは、
            エージェント活用の次の段階を考えるうえで参考になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ── インストールと始め方 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              インストールと始め方
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              CLI は Rust 製のオープンソース（Apache
              2.0）で、macOS・Linux・Windows（ネイティブ / WSL）に対応する。
            </p>

            <CodeBlock
              language="bash"
              code={`# npm でインストール
npm install -g @openai/codex

# Homebrew (macOS)
brew install --cask codex

# インストールスクリプト (macOS / Linux)
curl -fsSL https://chatgpt.com/codex/install.sh | sh

# 起動
codex`}
            />

            <p className="text-foreground mt-6 mb-4 leading-relaxed">
              初回起動時に「Sign in with ChatGPT」で認証する。ChatGPT の
              各プラン（Free / Go / Plus / Pro / Business / Edu / Enterprise）に
              Codex の利用枠が含まれており、別途 API
              キーを設定すればトークン従量課金でも使える。
            </p>

            <InfoBox type="info" title="利用枠の目安">
              利用枠はモデルごとに上限が異なる。公式の料金ページでは、Plus
              プラン（月額 $20）の GPT-5.6 Sol は 5 時間あたり 10〜100
              メッセージとされている。Pro プランは Plus の 5 倍（月額 $100）と 20
              倍（月額 $200）のティアから選ぶ。上限に達した場合も API
              キー従量課金へ切り替えて継続できる。
            </InfoBox>
          </section>

          {/* ── 基本的な使い方 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              基本的な使い方
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              <code>codex</code> で対話型 TUI が起動する。エージェントの
              自律度は「承認モード」で制御し、既定（バージョン管理された
              ディレクトリでは on-request）ではワークスペース内の読み書きと
              コマンド実行を自動で行い、ワークスペース外やネットワーク
              アクセスは承認を求める。
            </p>

            <CodeBlock
              language="bash"
              code={`# 対話モード
codex

# 読み取り専用で相談だけする
codex --sandbox read-only

# 非対話モード（スクリプト / CI 向け）
codex exec "テストの失敗原因を調査して修正して"

# JSON Lines で出力
codex exec --json "リポジトリ構成を要約して" | jq

# 直近のセッションを再開
codex resume --last`}
            />

            <p className="text-foreground mt-6 mb-4 leading-relaxed">
              サンドボックスは OS の仕組み（macOS は Seatbelt、Linux は bwrap +
              seccomp）で実装されており、ネットワークアクセスは
              既定で無効。プロジェクトのルールは <code>AGENTS.md</code>{" "}
              に記述して読み込ませる。
            </p>

            <InfoBox type="warning" title="フルアクセスは慎重に">
              <code>--dangerously-bypass-approvals-and-sandbox</code>
              （通称 <code>--yolo</code>）は承認とサンドボックスの両方を
              無効化する。CI の使い捨て環境など、影響範囲を限定できる場面
              以外では避けたい。
            </InfoBox>
          </section>

          {/* ── 特徴と得意分野 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              特徴と得意分野
            </h2>

            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  クラウドタスクへの委任
                </h3>
                <p className="text-muted-foreground">
                  chatgpt.com/codex
                  のクラウド環境で非同期タスクを並列実行できる。 GitHub
                  アカウントを接続すると、クラウド側で作業した結果を PR
                  として提案させられる。IDE
                  拡張からクラウドタスクの進行を監視し、
                  差分をローカルに適用することもできる。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  GitHub 連携（@codex メンション）
                </h3>
                <p className="text-muted-foreground">
                  Issue や PR で <code>@codex</code>{" "}
                  にメンションするとクラウドタスクが起動し、変更の提案や
                  コードレビューのフィードバックを返す。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  IDE 拡張とデスクトップアプリ
                </h3>
                <p className="text-muted-foreground">
                  VS Code / Cursor / Windsurf 向け拡張と、JetBrains 系 IDE
                  向けの連携、<code>codex app</code>{" "}
                  で起動するデスクトップ体験が提供されている。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  MCP・構造化出力
                </h3>
                <p className="text-muted-foreground">
                  MCP サーバーによるツール拡張に対応。<code>codex exec</code>{" "}
                  では <code>--output-schema</code> で JSON Schema
                  に沿った構造化出力を得られるため、自動化パイプラインに
                  組み込みやすい。
                </p>
              </div>
            </div>
          </section>

          {/* ── Claude Code との違い ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Claude Code との違い
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              CLI・IDE 連携・GitHub Actions
              連携という構成はよく似ている。特性の違いを整理する。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      観点
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      OpenAI Codex
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      Claude Code
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      モデル
                    </td>
                    <td className="p-3 text-muted-foreground">
                      GPT ファミリー（OpenAI）
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Claude ファミリー（Anthropic）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      契約の入口
                    </td>
                    <td className="p-3 text-muted-foreground">
                      ChatGPT アカウント（Free 含む各プラン）
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Claude サブスクリプションまたは API
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      コンテキストファイル
                    </td>
                    <td className="p-3 text-muted-foreground">AGENTS.md</td>
                    <td className="p-3 text-muted-foreground">
                      CLAUDE.md（AGENTS.md も参照可能な設計にできる）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      クラウド実行
                    </td>
                    <td className="p-3 text-muted-foreground">
                      chatgpt.com/codex のクラウドタスクが標準機能
                    </td>
                    <td className="p-3 text-muted-foreground">
                      GitHub Actions（claude-code-action）等で構成
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      CLI 実装
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Rust 製・オープンソース（Apache 2.0）
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Node.js ベース・プロプライエタリ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="既に ChatGPT を契約しているなら">
              ChatGPT の有料プランを契約済みであれば、追加費用なしで Codex
              を試せる。逆に Claude
              のサブスクリプションを軸にしているなら、Codex は API
              従量課金でスポット的に比較検証する、という始め方が現実的だ。
            </InfoBox>
          </section>

          {/* ── Quiz ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>

            <div className="space-y-6">
              <Quiz
                question="Codex CLI が既定でネットワークアクセスを扱う方針として正しいのはどれ？"
                options={[
                  { label: "常に自由にアクセスできる" },
                  {
                    label:
                      "サンドボックスで既定は無効。必要な場合は設定や承認で許可する",
                    correct: true,
                  },
                  { label: "HTTPS のみ自動許可される" },
                  { label: "ネットワーク機能自体が存在しない" },
                ]}
                explanation="Codex のサンドボックス（macOS は Seatbelt、Linux は bwrap + seccomp）ではネットワークアクセスが既定で無効です。ワークスペース外の操作やネットワークが必要な場合は承認フローや設定（network_access）で明示的に許可します。"
              />

              <Quiz
                question="スクリプトや CI から Codex を非対話で実行するコマンドはどれ？"
                options={[
                  { label: "codex run" },
                  { label: "codex --headless" },
                  { label: "codex exec", correct: true },
                  { label: "codex batch" },
                ]}
                explanation="codex exec はプロンプトを渡して非対話で実行するモードです。--json で JSON Lines 出力、--output-schema で構造化出力を指定でき、自動化パイプラインに組み込めます。"
              />
            </div>
          </section>

          {/* ── Reference Links ── */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "OpenAI Codex 公式ドキュメント",
                  url: "https://developers.openai.com/codex",
                  description: "CLI・IDE・クラウドの全体像と各機能の一次情報",
                },
                {
                  title: "openai/codex (GitHub)",
                  url: "https://github.com/openai/codex",
                  description: "CLI のソースコード・インストール手順・README",
                },
                {
                  title: "Codex Pricing",
                  url: "https://developers.openai.com/codex/pricing",
                  description: "プラン別の利用枠・クレジット・API 従量課金",
                },
                {
                  title: "Codex Approvals & Security",
                  url: "https://developers.openai.com/codex/agent-approvals-security",
                  description: "承認モードとサンドボックスの仕様",
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
