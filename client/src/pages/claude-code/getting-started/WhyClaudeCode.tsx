import { Zap, Terminal, Brain, Shield, GitBranch, Bot } from 'lucide-react';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import InfoBox from '@/components/InfoBox';
import ReferenceLinks from '@/components/ReferenceLinks';

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
              Claude Code は Anthropic が提供するエージェント型のコーディングツールです。公式ドキュメントは、コードベースを読み、ファイルを編集し、コマンドを実行し、開発ツールと連携すると説明しています。動作する面はターミナルだけではなく、IDE 拡張・デスクトップアプリ・Web も公式に用意されています。このガイドが主に扱うのはターミナルの CLI で、ファイルの読み書きとコマンド実行を任せながら、開発者はコードレビューと方向性の判断に時間を使えます。
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

          {/* 公式ドキュメントで裏が取れる範囲 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Zap className="text-[var(--claude-primary)]" />
              公式ドキュメントで確認できる動作
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              このページには以前、「エディタ拡張型」「Web UI 型」という匿名のカテゴリを相手にした比較表を置いていました。カテゴリには一次情報を出す提供元が存在しないため、「非対応」「不可」といったセルを裏づける出典を当てられません。表は外し、Anthropic の公式ドキュメントに記載がある Claude Code 側の動作だけを残します。製品名を挙げた比較は「AI コーディングエージェント」の章で扱います。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-bold">項目</th>
                    <th className="text-left py-3 px-4 font-bold">公式ドキュメントの記載</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">動作する面</td>
                    <td className="py-3 px-4">ターミナル、IDE 拡張、デスクトップアプリ、Web の 4 つ。設定と MCP サーバーは面をまたいで共通に効く</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">ファイルとコマンド</td>
                    <td className="py-3 px-4">コードベースを読み、ファイルを編集し、コマンドを実行する。複数ファイルにまたがる作業に対応する</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">権限の強制</td>
                    <td className="py-3 px-4">権限のルールを強制するのはモデルではなく Claude Code 側。プロンプトや CLAUDE.md では許可範囲は変わらない</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">Bash のサンドボックス</td>
                    <td className="py-3 px-4">触れてよいファイルとネットワーク先を宣言し、境界を OS が強制する。macOS / Linux / WSL2 で動作する</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">外部ツール連携</td>
                    <td className="py-3 px-4">MCP を通じて外部ツールやデータソースに接続する</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">Git / GitHub</td>
                    <td className="py-3 px-4">GitHub Actions 上で PR や issue のコメントの @claude に反応し、変更を実装してコミットを push する</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">CLI としての合成</td>
                    <td className="py-3 px-4">Unix 哲学に沿った合成が可能で、ログをパイプで渡す・CI で回すといった使い方ができる</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ReferenceLinks
              links={[
                {
                  title: 'Claude Code — Overview',
                  url: 'https://code.claude.com/docs/en/overview',
                  description: '動作する面（ターミナル / IDE 拡張 / デスクトップ / Web）と、コードベースの読み取り・ファイル編集・コマンド実行の記載',
                },
                {
                  title: 'Claude Code — Configure permissions',
                  url: 'https://code.claude.com/docs/en/permissions',
                  description: '権限ルールを強制するのはモデルではなく Claude Code 側であるという記載',
                },
                {
                  title: 'Claude Code — Configure the sandboxed Bash tool',
                  url: 'https://code.claude.com/docs/en/sandboxing',
                  description: 'ファイルとネットワークの境界を OS が強制する仕組みと、対応 OS の記載',
                },
                {
                  title: 'Claude Code — Connect Claude Code to tools via MCP',
                  url: 'https://code.claude.com/docs/en/mcp',
                  description: 'MCP を通じた外部ツール・データソースへの接続の記載',
                },
                {
                  title: 'Claude Code — GitHub Actions',
                  url: 'https://code.claude.com/docs/en/github-actions',
                  description: 'PR / issue コメントの @claude に反応してコミットを push する記載',
                },
              ]}
            />
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

          {/* ターミナル環境との親和性 */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4">ターミナル環境との親和性</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Claude Code はターミナルで動作するため、複数のターミナルタブや cmux のようなワークスペース管理ツールとの相性が優れています。エージェントの実行状況、サーバーログ、Git操作を並列で監視しながら開発を進められます。
            </p>
            <InfoBox type="info" title="本ガイドの構成">
              前半で Claude Code の機能を体系的に学び、中盤で主要な AI コーディングエージェントの比較と cmux による環境管理を習得した上で、最後にベストプラクティスと自動化を扱います。
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
