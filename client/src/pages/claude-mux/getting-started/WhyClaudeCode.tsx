import { Zap, Terminal, Brain, Shield, GitBranch, Bot } from 'lucide-react';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import InfoBox from '@/components/InfoBox';

export default function WhyClaudeCode() {
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
            なぜClaude Codeなのか
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            ターミナルネイティブなAIエージェントが、開発ワークフローをどう変えるか。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* Claude Codeの位置づけ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="text-[var(--claude-primary)]" />
              ターミナルファーストのAIエージェント
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code は Anthropic が開発した公式の CLI ツールです。エディタのプラグインではなく、ターミナルで直接動作するエージェントとして設計されています。ファイルの読み書き、コマンド実行、Git操作を自律的に行い、開発者はコードレビューと方向性の判断に集中できます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <Brain className="w-5 h-5" />, title: '自律的な推論', desc: 'コードベース全体を読み解き、複数ファイルにまたがる変更を計画・実行する。' },
                { icon: <Shield className="w-5 h-5" />, title: 'サンドボックス', desc: 'ファイル操作とコマンド実行にパーミッション制御。意図しない破壊的操作を防止。' },
                { icon: <GitBranch className="w-5 h-5" />, title: 'Git統合', desc: 'ブランチ作成、コミット、PR作成まで一貫してターミナル内で完結。' },
              ].map(item => (
                <div key={item.title} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  <div className="text-[var(--claude-primary)] mb-2">{item.icon}</div>
                  <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 他ツールとの比較 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Zap className="text-[var(--claude-primary)]" />
              他のAIコーディングツールとの違い
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-bold">特徴</th>
                    <th className="text-center py-3 px-4 font-bold text-[var(--claude-primary)]">Claude Code</th>
                    <th className="text-center py-3 px-4 font-bold text-muted-foreground">エディタ拡張型</th>
                    <th className="text-center py-3 px-4 font-bold text-muted-foreground">Web UI型</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3 px-4 font-medium text-foreground">動作環境</td>
                    <td className="py-3 px-4 text-center">ターミナル</td>
                    <td className="py-3 px-4 text-center">VS Code等</td>
                    <td className="py-3 px-4 text-center">ブラウザ</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3 px-4 font-medium text-foreground">コマンド実行</td>
                    <td className="py-3 px-4 text-center text-[var(--claude-primary)] font-bold">直接実行</td>
                    <td className="py-3 px-4 text-center">限定的</td>
                    <td className="py-3 px-4 text-center">不可</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3 px-4 font-medium text-foreground">ファイル操作</td>
                    <td className="py-3 px-4 text-center text-[var(--claude-primary)] font-bold">自律的</td>
                    <td className="py-3 px-4 text-center">エディタ経由</td>
                    <td className="py-3 px-4 text-center">コピー&ペースト</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3 px-4 font-medium text-foreground">MCP連携</td>
                    <td className="py-3 px-4 text-center text-[var(--claude-primary)] font-bold">対応</td>
                    <td className="py-3 px-4 text-center">一部対応</td>
                    <td className="py-3 px-4 text-center">非対応</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3 px-4 font-medium text-foreground">バックグラウンド実行</td>
                    <td className="py-3 px-4 text-center text-[var(--claude-primary)] font-bold">tmux連携</td>
                    <td className="py-3 px-4 text-center">エディタ依存</td>
                    <td className="py-3 px-4 text-center">タブ必須</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">Git統合</td>
                    <td className="py-3 px-4 text-center text-[var(--claude-primary)] font-bold">完全</td>
                    <td className="py-3 px-4 text-center">部分的</td>
                    <td className="py-3 px-4 text-center">非対応</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* エージェンティック開発 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Bot className="text-[var(--claude-primary)]" />
              エージェンティック開発の実践
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code は単なるコード補完ツールではなく、開発タスクを自律的に遂行するエージェントです。指示を与えると、コードベースの調査、実装、テスト実行、修正のサイクルを自動で回します。
            </p>
            <div className="space-y-3">
              {[
                { step: '1', title: '調査', desc: 'プロジェクト構造を解析し、既存のパターンやコンポーネントを把握する。' },
                { step: '2', title: '計画', desc: '変更対象のファイルと修正方針を特定し、実装プランを策定する。' },
                { step: '3', title: '実装', desc: 'ファイルの作成・編集を自律的に実行。複数ファイルにまたがる変更に対応。' },
                { step: '4', title: '検証', desc: 'テストやビルドコマンドを実行し、変更の正当性を確認する。' },
              ].map(item => (
                <div key={item.step} className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
                  <div className="w-8 h-8 rounded-full bg-[var(--claude-primary)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* tmuxとの親和性 */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4">tmux との親和性</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Claude Code はターミナルで動作するため、tmux のペイン分割との相性が優れています。エージェントの実行状況、サーバーログ、Git操作を並列で監視しながら開発を進められます。
            </p>
            <InfoBox type="info" title="本ガイドの構成">
              前半で Claude Code の機能を体系的に学び、後半で tmux の操作を習得した上で、最後に両者を統合した実践ワークフローを構築します。
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
