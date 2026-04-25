import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

export default function CmuxWorktrees() {
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
            cmux と git worktree
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            複数エージェントを並列で動かすときの作業ツリー分離。 git worktree と
            cmux のワークスペースを 1:1 で対応させる。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* ── なぜ worktree か ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              なぜ worktree が必要か
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              Claude Code は作業ディレクトリ全体を扱う前提で動く。
              同じディレクトリで 2 つのエージェントを並列に走らせると、
              編集競合・ビルドキャッシュの破壊・ブランチ切り替えの取り合いといった問題が発生する。
            </p>

            <p className="text-foreground mb-6 leading-relaxed">
              git worktree は同じ <code className="text-primary">.git</code>{" "}
              データベースを共有しながら、
              作業ツリー（ファイル群）だけを別ディレクトリに切り出す機能。
              ブランチごとに独立したディレクトリを持てるため、エージェントごとに「自分の作業場」を割り当てられる。
            </p>

            <InfoBox type="info" title="ポイント">
              worktree は clone とは別物。
              <code className="text-primary">.git</code> を二重に持たないため、
              ディスク使用量・同期コストが小さい。ブランチは元リポジトリと同期している。
            </InfoBox>
          </section>

          {/* ── 基本コマンド ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              git worktree の基本
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              cmux と組み合わせる前に、worktree のコマンドを押さえておく。
            </p>

            <CodeBlock
              language="bash"
              code={`# 新しい worktree を作成（既存ブランチをチェックアウト）
git worktree add ../my-app-feature feature/login

# 新しいブランチを切って worktree を作る
git worktree add -b feature/api ../my-app-api

# 一覧を確認
git worktree list

# 不要になった worktree を削除
git worktree remove ../my-app-feature`}
            />

            <p className="text-foreground mt-6 leading-relaxed">
              親ディレクトリの隣に{" "}
              <code className="text-primary">my-app-feature</code> /
              <code className="text-primary">my-app-api</code>{" "}
              といった作業ツリーが並ぶ構成になる。
            </p>
          </section>

          {/* ── cmux と組み合わせる ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              cmux のワークスペースと対応させる
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              cmux のサイドバーは各ワークスペースのカレントディレクトリと git
              ブランチを表示する。 「ワークスペース ＝
              worktree」で揃えると、視覚的にも論理的にも分離が明確になる。
            </p>

            <CodeBlock
              language="bash"
              code={`# 1. メイン作業ツリー
cd ~/projects/my-app
cmux  # WS 1: main ブランチ

# 2. 機能 A 用 worktree を追加
git worktree add -b feature/a ../my-app-a

# 3. cmux で新規ワークスペース
# Cmd+Shift+N
cd ~/projects/my-app-a
claude  # WS 2: feature/a で作業

# 4. 機能 B 用 worktree も同様
git worktree add -b feature/b ../my-app-b
# 別ワークスペース WS 3 を作って claude を起動`}
            />

            <p className="text-foreground mt-6 leading-relaxed">
              この構成だと、サイドバーには「main」「feature/a」「feature/b」の 3
              つのワークスペースが並び、
              それぞれが別の作業ツリーで動く。エージェント同士が干渉しない。
            </p>
          </section>

          {/* ── 運用パターン ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              運用パターン
            </h2>

            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  実験的タスクの並列実行
                </h3>
                <p className="text-muted-foreground">
                  「アプローチ A」と「アプローチ B」を別 worktree で同時に試す。
                  どちらが筋が良いかを比較してから、片方を main に取り込む。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  本番修正と機能開発の同居
                </h3>
                <p className="text-muted-foreground">
                  本番ホットフィックスを main から hotfix worktree
                  で切り出して、 進行中の機能ブランチには触れずに修正・PR
                  を出す。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  レビュー専用 worktree
                </h3>
                <p className="text-muted-foreground">
                  PR をチェックアウトする専用 worktree を用意し、
                  別エージェントにレビューを任せる。実装中のブランチを止めずに済む。
                </p>
              </div>
            </div>
          </section>

          {/* ── ツールバリエーション ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              関連ツール
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              「cmux」を名乗る別系統のツールも存在する。区別しておく。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      ツール
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      性質
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      worktree との関係
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      manaflow-ai/cmux
                    </td>
                    <td className="p-3 text-muted-foreground">
                      macOS ネイティブターミナル
                    </td>
                    <td className="p-3 text-muted-foreground">
                      ワークスペース = worktree で運用
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      craigsc/cmux
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Bash 製のシェルツール
                    </td>
                    <td className="p-3 text-muted-foreground">
                      worktree のライフサイクル管理が中心
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="このマニュアルの対象">
              本ガイドは macOS ネイティブの manaflow-ai/cmux を扱う。
              craigsc/cmux はシェル運用に閉じたい人向けの別系統。worktree
              駆動という思想は共通する。
            </InfoBox>
          </section>

          {/* ── 後始末 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">後始末</h2>

            <p className="text-foreground mb-6 leading-relaxed">
              worktree
              を作りっぱなしにすると、ディスク上に古いブランチの作業ツリーが残る。
              タスクが終わったら片付ける習慣をつける。
            </p>

            <CodeBlock
              language="bash"
              code={`# マージ済みブランチの worktree を削除
git worktree remove ../my-app-a

# 強制削除（変更が残っている場合）
git worktree remove --force ../my-app-a

# 一覧から消えていない孤立 worktree を整理
git worktree prune`}
            />

            <p className="text-foreground mt-6 leading-relaxed">
              cmux
              のワークスペースも同時に閉じる。サイドバーから不要なワークスペースを削除しておくと整理しやすい。
            </p>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
