import { Users, GitBranch, MessageSquare, FolderTree, Workflow, Shield } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function AgentOrchestration() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            エージェントチームの協調
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            複数の Claude Code インスタンスを協調させ、大規模タスクを分担・並列処理するマルチエージェントパターン。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* マルチエージェントの概要 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Users className="text-[var(--claude-primary)]" />
              マルチエージェントの概要
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code は複数のインスタンスを同時に実行できます。tmux のペインを活用して複数エージェントを起動し、それぞれが異なるタスクを担当する「エージェントチーム」を構成できます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { label: 'タスク分割', desc: '大きなタスクをサブタスクに分割し、各エージェントに割り当て' },
                { label: '並列処理', desc: '独立したタスクを複数エージェントで同時実行して高速化' },
                { label: '専門化', desc: '各エージェントに異なる役割（コーディング、テスト、レビュー）を割り当て' },
                { label: 'ワークツリー分離', desc: 'Git ワークツリーで各エージェントに独立した作業領域を提供' },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-sm text-[var(--claude-primary)] mb-2">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <InfoBox type="warning" title="実験的機能">
              マルチエージェント協調は公式ドキュメントで「experimental」と位置づけられています。同一ファイルへの同時書き込みによるコンフリクトなど、課題が残っている点に留意してください。
            </InfoBox>
          </section>

          {/* tmux でのマルチエージェント */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Workflow className="text-[var(--claude-primary)]" />
              tmux でのマルチエージェント構成
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              tmux のペイン分割を活用して、複数の Claude Code インスタンスを視覚的に管理できます。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">基本的な構成例</h3>
                <CodeBlock language="bash" code={`# tmux セッションを作成
tmux new-session -s agents

# ペインを分割して複数エージェントを起動
# 左ペイン: フロントエンド担当
claude "React コンポーネントを実装して"

# Prefix + % で右ペインを作成
# 右ペイン: バックエンド担当
claude "API エンドポイントを実装して"

# Prefix + " で下ペインを作成
# 下ペイン: テスト担当
claude "テストを書いて実行して"`} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">tmuxp による自動化</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  tmuxp の設定ファイルでマルチエージェント環境を一括構築できます。
                </p>
                <CodeBlock language="yaml" code={`# ~/.tmuxp/agent-team.yaml
session_name: agent-team
windows:
  - window_name: agents
    layout: main-vertical
    panes:
      - shell_command:
          - cd ~/project
          - claude "フロントエンドの実装を担当して"
      - shell_command:
          - cd ~/project
          - claude "バックエンドの実装を担当して"
      - shell_command:
          - cd ~/project
          - claude "テストの作成と実行を担当して"`} />
                <CodeBlock language="bash" code={`# 一括起動
tmuxp load agent-team`} />
              </div>
            </div>
          </section>

          {/* Git ワークツリー分離 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <GitBranch className="text-[var(--claude-primary)]" />
              Git ワークツリーによる分離
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              複数エージェントが同じファイルを編集するとコンフリクトが発生します。Git ワークツリーを使って各エージェントに独立したディレクトリを提供することで、安全な並列作業が可能になります。
            </p>

            <CodeBlock language="bash" code={`# メインリポジトリから作業用ワークツリーを作成
git worktree add ../project-frontend feature/frontend
git worktree add ../project-backend feature/backend
git worktree add ../project-tests feature/tests

# 各ワークツリーで独立したエージェントを起動
# ペイン1
cd ../project-frontend && claude

# ペイン2
cd ../project-backend && claude

# ペイン3
cd ../project-tests && claude`} />

            <InfoBox type="info" title="ワークツリーの利点">
              各ワークツリーは独立したディレクトリとブランチを持つため、ファイルの競合が発生しません。作業完了後は各ブランチをマージすることで変更を統合できます。
            </InfoBox>

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-3">作業完了後のマージ</h3>
              <CodeBlock language="bash" code={`# メインブランチに戻る
cd ~/project
git checkout main

# 各機能ブランチをマージ
git merge feature/frontend
git merge feature/backend
git merge feature/tests

# ワークツリーを削除
git worktree remove ../project-frontend
git worktree remove ../project-backend
git worktree remove ../project-tests`} />
            </div>
          </section>

          {/* Subagents との違い */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FolderTree className="text-[var(--claude-primary)]" />
              Subagents とマルチインスタンスの違い
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code には 2 つの「マルチエージェント」アプローチがあります。用途に応じて使い分けてください。
            </p>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">特性</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">Subagents（Task ツール）</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">マルチインスタンス</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    ['起動方法', 'メインエージェントが自動的に起動', 'ユーザーが手動で複数起動'],
                    ['コンテキスト', 'メインの会話コンテキストを継承', '各インスタンスが独立'],
                    ['制御', 'メインエージェントが統括', 'ユーザーが各インスタンスを管理'],
                    ['ファイル操作', '同一ディレクトリで動作（注意が必要）', 'ワークツリーで分離可能'],
                    ['適したタスク', '調査・分析・部分的な実装', '独立した機能の並列開発'],
                  ].map(([feature, sub, multi]) => (
                    <tr key={feature} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-foreground whitespace-nowrap">{feature}</td>
                      <td className="px-4 py-3 text-muted-foreground">{sub}</td>
                      <td className="px-4 py-3 text-muted-foreground">{multi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* コミュニケーション方法 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <MessageSquare className="text-[var(--claude-primary)]" />
              エージェント間の情報共有
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              独立したエージェントインスタンス間で直接的な通信はできませんが、以下の方法で情報を共有できます。
            </p>

            <div className="space-y-4">
              {[
                {
                  title: 'CLAUDE.md による共有指示',
                  desc: 'プロジェクトルートの CLAUDE.md に共通の指示やアーキテクチャ方針を記述することで、全エージェントが同じ知識を持って作業を開始できます。',
                },
                {
                  title: 'ファイルシステムを介した共有',
                  desc: '一方のエージェントが生成したファイル（仕様書、インターフェース定義など）を、別のエージェントが読み取ることで間接的に情報を伝達できます。',
                },
                {
                  title: 'Git を介した共有',
                  desc: '各ワークツリーで作業した結果をコミット・プッシュし、他のワークツリーで pull することで変更を共有できます。',
                },
                {
                  title: 'ユーザーによる仲介',
                  desc: '一方のエージェントの出力をコピーし、別のエージェントへのプロンプトとして貼り付けることで、人間が情報のハブとして機能します。',
                },
              ].map(item => (
                <div key={item.title} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ベストプラクティス */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Shield className="text-[var(--claude-primary)]" />
              マルチエージェントのベストプラクティス
            </h2>

            <div className="space-y-3">
              {[
                { title: 'ファイル操作の分離を徹底する', desc: '各エージェントが編集するファイルの範囲を明確に分離してください。同じファイルへの同時書き込みはデータ破損やコンフリクトの原因になります。' },
                { title: 'インターフェースを先に定義する', desc: '各エージェントの担当範囲の境界（API 定義、型定義など）を事前に確定させてから並列作業を開始すると、統合時の手戻りが減ります。' },
                { title: '小さく始めて段階的に拡大する', desc: 'まず 2 エージェントで試し、ワークフローが安定してから段数を増やしてください。管理コストは線形以上に増加します。' },
                { title: '統合ポイントを設ける', desc: '各エージェントの作業が一定段階に達したら、一度マージして動作確認を行うチェックポイントを設けてください。' },
              ].map(item => (
                <div key={item.title} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <CodingChallenge
            preview
            previewType="terminal"
            title="マルチエージェント環境を構築しよう"
            description="tmux と Git ワークツリーを使って、複数の Claude Code インスタンスを安全に並列実行する環境構築コマンドを書いてください。"
            initialCode={`# マルチエージェント環境構築\n\n# 1. tmux セッションを作成:\n\n# 2. Git ワークツリーを作成（フロントエンド用）:\n\n# 3. Git ワークツリーを作成（バックエンド用）:\n\n# 4. 各ワークツリーで Claude を起動:\n\n# 5. 作業完了後のマージとワークツリー削除:`}
            answer={`# マルチエージェント環境構築\n\n# 1. tmux セッションを作成:\ntmux new-session -s agents\n\n# 2. Git ワークツリーを作成（フロントエンド用）:\ngit worktree add ../project-frontend feature/frontend\n\n# 3. Git ワークツリーを作成（バックエンド用）:\ngit worktree add ../project-backend feature/backend\n\n# 4. 各ワークツリーで Claude を起動:\ncd ../project-frontend && claude\n# 別ペインで:\ncd ../project-backend && claude\n\n# 5. 作業完了後のマージとワークツリー削除:\ngit merge feature/frontend\ngit merge feature/backend\ngit worktree remove ../project-frontend\ngit worktree remove ../project-backend`}
            hints={[
              'git worktree add で独立した作業ディレクトリを作成できます',
              '各ワークツリーは独立したブランチを持つためファイル競合が発生しません',
              '作業完了後は git merge で変更を統合します',
            ]}
            keywords={['tmux new-session', 'git worktree add', 'git worktree remove', 'git merge']}
          />

        <PageNavigation />
      </div>
    </div>
  );
}
