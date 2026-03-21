import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

export default function CmuxIntro() {
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
            cmux: GUI ベースのエージェント管理
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Ghostty ベースの macOS ネイティブターミナルで、複数の AI
            エージェントを効率的に管理する。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* ── cmux とは ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              cmux とは
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              cmux は macOS ネイティブのターミナルアプリケーションで、複数の AI
              コーディングエージェントを同時に管理するために設計されている。Ghostty
              のレンダリングエンジン（libghostty）をベースに、Swift + AppKit
              で実装されており、動作は軽量。
            </p>

            <p className="text-foreground mb-8 leading-relaxed">
              設計思想は「1 エージェント = 1
              ワークスペース」。各ワークスペースが独立したターミナル環境を持ち、Claude
              Code・Codex・Aider など主要な AI
              コーディングエージェントに対応する。エージェントの状態（実行中・入力待ち・完了）を通知リングで可視化し、複数のエージェントを並行して運用できる。
            </p>

            <CodeBlock
              language="bash"
              code={`# cmux の基本情報
# - macOS ネイティブアプリ（Swift + AppKit）
# - Ghostty (libghostty) ベースのターミナルレンダリング
# - 対応エージェント: Claude Code, Codex, Aider 等
# - ライセンス: オープンソース（無料）`}
            />
          </section>

          {/* ── tmux との比較 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              tmux との比較
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              cmux と tmux
              はどちらも複数のターミナルセッションを管理するツールだが、アプローチが根本的に異なる。以下の表で主要な違いを整理する。
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      項目
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      tmux
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      cmux
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">種別</td>
                    <td className="p-3 text-muted-foreground">
                      TUI マルチプレクサ
                    </td>
                    <td className="p-3 text-muted-foreground">
                      GUI ネイティブアプリ
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      プラットフォーム
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Linux / macOS / WSL
                    </td>
                    <td className="p-3 text-muted-foreground">macOS のみ</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      プレフィックスキー
                    </td>
                    <td className="p-3 text-muted-foreground">
                      必要（Ctrl+B）
                    </td>
                    <td className="p-3 text-muted-foreground">不要</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      通知機能
                    </td>
                    <td className="p-3 text-muted-foreground">なし</td>
                    <td className="p-3 text-muted-foreground">
                      通知リング + デスクトップ通知
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      ブラウザ統合
                    </td>
                    <td className="p-3 text-muted-foreground">なし</td>
                    <td className="p-3 text-muted-foreground">
                      ビルトインブラウザ
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      リモートサーバー
                    </td>
                    <td className="p-3 text-muted-foreground">
                      対応（SSH 永続化）
                    </td>
                    <td className="p-3 text-muted-foreground">非対応</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      設定方式
                    </td>
                    <td className="p-3 text-muted-foreground">
                      tmux.conf テキスト
                    </td>
                    <td className="p-3 text-muted-foreground">GUI 設定</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="使い分けのポイント">
              tmux はリモートサーバーや Linux 環境で引き続き有用。ローカル macOS
              開発では cmux が直感的に使える。
            </InfoBox>
          </section>

          {/* ── 主要機能 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              主要機能
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              cmux が提供する主要な機能を 4 つ紹介する。いずれも AI
              エージェントの並行管理を前提に設計されている。
            </p>

            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  通知リング
                </h3>
                <p className="text-muted-foreground mb-3">
                  エージェントが入力待ち状態になると、該当ワークスペースのタブに青い環（リング）が点灯する。複数のエージェントを走らせていても、どのエージェントが応答を待っているかが一目でわかる。
                </p>
                <CodeBlock
                  language="bash"
                  code={`# 未読通知のあるワークスペースにジャンプ
# Cmd+Shift+U`}
                />
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  垂直タブ
                </h3>
                <p className="text-muted-foreground">
                  サイドバーにワークスペースの一覧が垂直表示される。各タブには
                  git
                  ブランチ名、カレントディレクトリ、使用中のポート番号が表示されるため、ワークスペースの識別が容易になる。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  分割ペイン
                </h3>
                <p className="text-muted-foreground mb-3">
                  ワークスペース内でペインを分割し、エージェントの出力とターミナル操作を並べて表示できる。
                </p>
                <CodeBlock
                  language="bash"
                  code={`# 右方向に分割
# Cmd+Shift+D

# 下方向に分割
# Cmd+Shift+J`}
                />
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ビルトインブラウザ
                </h3>
                <p className="text-muted-foreground mb-3">
                  ターミナル内にブラウザを表示できる。GitHub Issues
                  やドキュメントを参照しながらエージェントに指示を出す、といった作業がウィンドウ切り替えなしで完結する。
                </p>
                <CodeBlock
                  language="bash"
                  code={`# ビルトインブラウザの表示/非表示を切り替え
# Opt+Cmd+D`}
                />
              </div>
            </div>
          </section>

          {/* ── どちらを選ぶべきか ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              どちらを選ぶべきか
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              tmux と cmux
              は競合するツールではなく、用途によって使い分けるもの。以下の判断基準を参考にする。
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground mb-1">
                  macOS でローカル開発がメイン
                </p>
                <p className="text-sm text-muted-foreground">
                  cmux を推奨。GUI
                  ベースの操作、通知リング、ビルトインブラウザにより、AI
                  エージェントの並行管理が直感的に行える。
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground mb-1">
                  リモートサーバーや Linux 環境
                </p>
                <p className="text-sm text-muted-foreground">
                  tmux を推奨。SSH セッションの永続化が必要な場面では tmux
                  が適している。
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground mb-1">
                  両方使うケース
                </p>
                <p className="text-sm text-muted-foreground">
                  ローカル作業は cmux、リモートセッション管理は tmux
                  と使い分ける。cmux のワークスペース内で SSH
                  接続し、リモート先で tmux を起動するという組み合わせも有効。
                </p>
              </div>
            </div>

            <div className="mt-8">
              <InfoBox type="info" title="併用のヒント">
                cmux はローカルのエージェント管理、tmux
                はリモートのセッション永続化と、役割を明確に分けることで両方の利点を活かせる。
              </InfoBox>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
