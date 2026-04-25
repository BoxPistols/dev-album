import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

export default function CmuxAgentTeams() {
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
            cmux と Agent Teams
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Claude Code の teammate モードを cmux のネイティブ split で扱う。
            tmux なしで並列タスク分割を構成する。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* ── Agent Teams とは ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Agent Teams とは
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              Claude Code の teammate モードは、1
              つの親セッションから複数の子セッション（teammate）を起動して、
              タスクを並列に進めるための仕組み。レビュー担当・実装担当・テスト担当のようにロールを分けて運用する。
            </p>

            <p className="text-foreground mb-6 leading-relaxed">
              従来は親と子のセッションを別々のターミナル分割（tmux ペインや
              iTerm の split）に配置する必要があったが、 cmux は teammate
              を「ネイティブの split + サイドバーのメタデータ」として扱える。
              tmux 不要で並列ワークフローが組める点が特徴。
            </p>

            <InfoBox type="info" title="前提">
              teammate モードは Claude Code
              の機能。利用可能なバージョン・契約プランは公式ドキュメントを確認する。
              cmux はそれを「どう表示・操作するか」を担う層。
            </InfoBox>
          </section>

          {/* ── cmux claude-teams コマンド ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              cmux claude-teams コマンド
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              cmux には teammate 起動を 1
              コマンドで行うサブコマンドが用意されている。
              親セッションを開始すると、teammate がネイティブ split
              として展開される。
            </p>

            <CodeBlock
              language="bash"
              code={`# 親セッションを開始（teammate を split で起動）
cmux claude-teams

# プロジェクト指定で起動
cd ~/projects/my-app
cmux claude-teams

# teammate のロールを後から追加
# 親セッションのプロンプトで teammate を spawn`}
            />

            <p className="text-foreground mt-6 leading-relaxed">
              起動後はサイドバーに「親」と「各
              teammate」が並ぶ。それぞれが独立した split を持ち、 git
              ブランチ・ポート・最新の通知テキストがメタデータとして表示される。
            </p>
          </section>

          {/* ── ワークスペース構造 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ワークスペース構造
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              teammate を運用するときの典型的なレイアウト。1
              ワークスペース内に親と teammate を split で配置する。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      ペイン
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      役割
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      動作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">親</td>
                    <td className="p-3 text-muted-foreground">
                      調整役・全体方針
                    </td>
                    <td className="p-3 text-muted-foreground">
                      タスクの分配と統合
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      teammate A
                    </td>
                    <td className="p-3 text-muted-foreground">実装担当</td>
                    <td className="p-3 text-muted-foreground">
                      機能ブランチで作業
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      teammate B
                    </td>
                    <td className="p-3 text-muted-foreground">レビュー担当</td>
                    <td className="p-3 text-muted-foreground">
                      差分の検査・指摘
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      teammate C
                    </td>
                    <td className="p-3 text-muted-foreground">テスト担当</td>
                    <td className="p-3 text-muted-foreground">
                      テスト追加・実行
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-foreground leading-relaxed">
              cmux サイドバーに各 teammate のステータスが表示されるため、
              「誰が今動いていて、誰が入力待ちか」を一目で把握できる。
            </p>
          </section>

          {/* ── tmux との比較 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              tmux ベースの teammate 運用との比較
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              teammate は tmux ペインで運用することもできる。cmux
              ネイティブ運用との違いを整理する。
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      観点
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      tmux + iTerm
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      cmux ネイティブ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      起動コマンド
                    </td>
                    <td className="p-3 text-muted-foreground">
                      tmux + 手動 split
                    </td>
                    <td className="p-3 text-muted-foreground">
                      cmux claude-teams
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      teammate 識別
                    </td>
                    <td className="p-3 text-muted-foreground">
                      ペインタイトル
                    </td>
                    <td className="p-3 text-muted-foreground">
                      サイドバーメタデータ
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      入力待ちの可視化
                    </td>
                    <td className="p-3 text-muted-foreground">
                      なし（自前で工夫）
                    </td>
                    <td className="p-3 text-muted-foreground">
                      通知リング・未読バッジ
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      リモート利用
                    </td>
                    <td className="p-3 text-muted-foreground">可</td>
                    <td className="p-3 text-muted-foreground">
                      不可（macOS ローカル）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      セッション永続化
                    </td>
                    <td className="p-3 text-muted-foreground">tmux で永続</td>
                    <td className="p-3 text-muted-foreground">アプリ依存</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="使い分け">
              ローカル開発で teammate を素早く回すなら cmux ネイティブ。 SSH
              経由のリモート作業や永続化が必要な場合は tmux ベース。
            </InfoBox>
          </section>

          {/* ── 実践パターン ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              実践パターン
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              teammate を活かす典型的なフローを 3 つ紹介する。
            </p>

            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  実装と並走するレビュー
                </h3>
                <p className="text-muted-foreground">
                  実装担当の teammate がコミットするたび、レビュー担当の
                  teammate が差分を検査する。
                  入力待ちの通知リングで親がレビュー結果を確認する。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  仕様駆動の役割分担
                </h3>
                <p className="text-muted-foreground">
                  親が仕様（specs/）を更新、teammate A が実装、teammate B
                  がテスト追加、 teammate C がドキュメント更新を担当する。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  バグ調査と再現テスト
                </h3>
                <p className="text-muted-foreground">
                  teammate A がログを掘る、teammate B が再現テストを書く、
                  teammate C が修正案を試す。親が結果を統合する。
                </p>
              </div>
            </div>
          </section>

          {/* ── 注意点 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">注意点</h2>

            <div className="space-y-4">
              <InfoBox type="info" title="同一作業ツリーでの競合">
                teammate
                が同じディレクトリで並列に編集するとコンフリクトが発生しやすい。
                並列タスクは git worktree
                で作業ツリーを分離すると安全（次ページ参照）。
              </InfoBox>

              <InfoBox type="info" title="モデル選択">
                teammate ごとに使うモデルを変えると効果的。
                レビュー担当は深い思考を、実装担当は速い応答を、といった役割分担ができる。
              </InfoBox>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
