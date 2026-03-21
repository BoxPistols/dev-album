import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

export default function CmuxSetup() {
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
            cmux のセットアップと活用
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            インストールから Claude Code 連携、マルチエージェント運用まで。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* ── インストール ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              インストール
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              cmux は Homebrew 経由でインストールできる。CLI
              コマンドを利用する場合は、シンボリックリンクの作成も行う。
            </p>

            <CodeBlock
              language="bash"
              code={`# Homebrew でインストール
brew install --cask cmux

# CLI コマンドのシンボリックリンク作成
sudo ln -sf "/Applications/cmux.app/Contents/Resources/bin/cmux" /usr/local/bin/cmux`}
            />

            <div className="mt-6">
              <InfoBox type="info" title="初回起動時の注意">
                初回起動時に macOS
                のセキュリティ確認が表示される場合は「開く」をクリック。
              </InfoBox>
            </div>
          </section>

          {/* ── 基本操作 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              基本操作
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              cmux は macOS
              標準のキーボードショートカット体系に沿って設計されている。tmux
              のようなプレフィックスキーは不要で、Cmd
              ベースのショートカットで操作する。
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      操作
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      ショートカット
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground">新規ワークスペース</td>
                    <td className="p-3 text-muted-foreground">
                      <code className="text-primary">Cmd+Shift+N</code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground">右ペイン分割</td>
                    <td className="p-3 text-muted-foreground">
                      <code className="text-primary">Cmd+Shift+D</code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground">下ペイン分割</td>
                    <td className="p-3 text-muted-foreground">
                      <code className="text-primary">Cmd+Shift+J</code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground">未読通知にジャンプ</td>
                    <td className="p-3 text-muted-foreground">
                      <code className="text-primary">Cmd+Shift+U</code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground">通知パネル</td>
                    <td className="p-3 text-muted-foreground">
                      <code className="text-primary">Cmd+Shift+I</code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground">ビルトインブラウザ</td>
                    <td className="p-3 text-muted-foreground">
                      <code className="text-primary">Opt+Cmd+D</code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-foreground">ワークスペース切替</td>
                    <td className="p-3 text-muted-foreground">
                      <code className="text-primary">Cmd+1</code> 〜{" "}
                      <code className="text-primary">Cmd+9</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-foreground leading-relaxed">
              tmux
              と異なり、プレフィックスキーを押してからコマンドキーを入力する二段階操作が不要。macOS
              のネイティブアプリとして、他のアプリケーションと同じ感覚で操作できる。
            </p>
          </section>

          {/* ── 実際の使い方 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              実際の使い方
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              cmux を起動してから Claude Code で作業を始めるまでの具体的な手順を紹介する。
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">
              1. 起動とワークスペース作成
            </h3>

            <p className="text-foreground mb-4 leading-relaxed">
              cmux を起動すると、デフォルトのワークスペースが開く。左サイドバーにワークスペース一覧が表示される。
            </p>

            <CodeBlock
              language="bash"
              code={`# アプリケーションから起動、または CLI から起動
cmux

# 新しいワークスペースを追加
# Cmd+Shift+N

# ワークスペースの切り替え
# Cmd+1, Cmd+2, ... Cmd+9`}
            />

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              2. Claude Code の起動と作業
            </h3>

            <p className="text-foreground mb-4 leading-relaxed">
              各ワークスペースで Claude Code を起動する。ペインを分割して dev サーバーを横に表示するのが典型的な構成。
            </p>

            <CodeBlock
              language="bash"
              code={`# ワークスペース 1 で Claude Code を起動
cd ~/projects/my-app
claude

# 右ペインに分割して dev サーバーを起動（Cmd+Shift+D で分割後）
npm run dev

# 左ペインに戻る（Cmd+[ または Cmd+] でペイン間を移動）`}
            />

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              3. 複数エージェントの並行運用
            </h3>

            <p className="text-foreground mb-4 leading-relaxed">
              別のワークスペースに切り替えて、2つ目の Claude Code セッションを起動する。
            </p>

            <CodeBlock
              language="bash"
              code={`# Cmd+Shift+N で新しいワークスペースを作成
cd ~/projects/my-app

# 別のタスクで Claude Code を起動
claude

# WS 1 のエージェントが入力待ちになると、サイドバーのタブに
# 青い通知リングが点灯する
# Cmd+Shift+U で未読のワークスペースに即ジャンプ`}
            />

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              4. ビルトインブラウザの活用
            </h3>

            <p className="text-foreground mb-4 leading-relaxed">
              GitHub Issue やドキュメントを参照しながら作業する場合、ウィンドウを切り替えずにブラウザを表示できる。
            </p>

            <CodeBlock
              language="bash"
              code={`# Opt+Cmd+D でビルトインブラウザを表示
# ターミナルとブラウザが左右に並ぶ

# GitHub Issue を開きながら Claude Code に指示を出す
# 例: 「Issue #42 の内容を確認して修正してください」

# ブラウザを閉じる: もう一度 Opt+Cmd+D`}
            />

            <div className="mt-6">
              <InfoBox type="info" title="Ghostty 設定の流用">
                既に Ghostty を使っている場合、cmux は Ghostty の設定ファイルをそのまま読み込む。フォント、カラースキーム、キーバインドなどを再設定する必要はない。
              </InfoBox>
            </div>
          </section>

          {/* ── Claude Code との連携 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Claude Code との連携
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              Claude Code の Stop Hook を設定すると、タスク完了時に cmux
              のデスクトップ通知を受け取れる。別のワークスペースで作業していても、エージェントの完了を見逃さない。
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">
              通知スクリプトの作成
            </h3>

            <p className="text-foreground mb-4 leading-relaxed">
              まず、cmux 環境でのみ通知を送る shell スクリプトを作成する。
            </p>

            <CodeBlock
              language="bash"
              code={`#!/bin/bash
# ~/.claude/hooks/cmux-notify.sh
if [ -S /tmp/cmux.sock ] || [ -n "\${CMUX_WORKSPACE_ID:-}" ]; then
  cmux notify --title "Claude Code" --body "タスク完了"
fi`}
            />

            <div className="mt-6">
              <CodeBlock
                language="bash"
                code={`# スクリプトに実行権限を付与
chmod +x ~/.claude/hooks/cmux-notify.sh`}
              />
            </div>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              settings.json の設定
            </h3>

            <p className="text-foreground mb-4 leading-relaxed">
              Claude Code の設定ファイルに Stop Hook を登録する。
            </p>

            <CodeBlock
              language="json"
              code={`{
  "hooks": {
    "stop": [
      {
        "command": "bash ~/.claude/hooks/cmux-notify.sh",
        "event": "stop"
      }
    ]
  }
}`}
            />

            <div className="mt-6">
              <InfoBox type="info" title="通知のカスタマイズ">
                cmux notify コマンドの --body
                オプションで通知内容を変更できる。タスクの種類（テスト完了、ビルド完了など）に応じてスクリプトを分けることも可能。
              </InfoBox>
            </div>
          </section>

          {/* ── マルチエージェント運用パターン ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              マルチエージェント運用パターン
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              cmux の「1 エージェント = 1
              ワークスペース」設計を活かした実践的な運用例を紹介する。
            </p>

            <div className="p-6 rounded-lg border border-border bg-card mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                フロントエンド + バックエンドの並行開発
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="text-primary font-bold min-w-fit">WS 1</div>
                  <div>
                    <p className="font-semibold text-foreground">
                      フロントエンド開発（Claude Code）
                    </p>
                    <p className="text-muted-foreground">
                      React コンポーネントの実装を指示。dev
                      サーバーをペイン分割で表示
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-primary font-bold min-w-fit">WS 2</div>
                  <div>
                    <p className="font-semibold text-foreground">
                      バックエンド API（Claude Code --resume）
                    </p>
                    <p className="text-muted-foreground">
                      API エンドポイントの実装。別セッションで並行して作業
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-primary font-bold min-w-fit">WS 3</div>
                  <div>
                    <p className="font-semibold text-foreground">
                      テスト実行（手動操作）
                    </p>
                    <p className="text-muted-foreground">
                      テストの実行と結果確認。必要に応じてデバッグ
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-foreground leading-relaxed">
              通知リングにより、各ワークスペースのエージェント状態を一目で把握できる。WS
              1 のエージェントが入力待ちになったら通知リングが点灯し、
              <code className="text-primary">Cmd+Shift+U</code>{" "}
              で即座にジャンプして対応できる。
            </p>
          </section>

          {/* ── 参考リンク ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              参考リンク
            </h2>

            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground">
                  GitHub リポジトリ
                </p>
                <p className="text-sm text-muted-foreground">
                  manaflow-ai/cmux
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground">公式サイト</p>
                <p className="text-sm text-muted-foreground">cmux.com</p>
              </div>
            </div>

            <InfoBox type="info" title="オープンソース">
              cmux は無料・オープンソース。Ghostty
              の設定ファイルがそのまま利用できる。
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
