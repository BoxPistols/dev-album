import { Monitor, Code, Puzzle, Keyboard, Settings, Layout } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function IdeIntegration() {
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
            VS Code・JetBrains 連携
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            Claude Code を IDE に統合し、エディタ上から直接 AI アシスタントを活用するワークフローを構築する。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* VS Code 連携 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Code className="text-[var(--claude-primary)]" />
              VS Code 連携
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code は VS Code の統合ターミナルで動作するだけでなく、専用の拡張機能を通じてエディタとシームレスに統合できます。
            </p>

            <div className="space-y-6">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">拡張機能のインストール</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  VS Code Marketplace から Claude Code 拡張機能をインストールします。
                </p>
                <CodeBlock language="bash" code={`# VS Code のコマンドラインからインストール
code --install-extension anthropic.claude-code

# または VS Code 内で
# Cmd+Shift+X → "Claude Code" を検索 → インストール`} />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">主要な機能</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'インラインチャット', desc: 'エディタ内で直接 Claude と対話。選択したコードをコンテキストとして自動送信' },
                    { label: 'ターミナル統合', desc: 'VS Code のターミナルパネルに Claude Code セッションを統合' },
                    { label: 'ファイル同期', desc: 'エディタで開いているファイルをコンテキストとして自動認識' },
                    { label: 'diff プレビュー', desc: 'Claude の提案する変更を VS Code の diff ビューでプレビュー' },
                  ].map(item => (
                    <div key={item.label} className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <h5 className="font-bold text-xs text-[var(--claude-primary)] mb-1">{item.label}</h5>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">キーボードショートカット</h3>
                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-900">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">ショートカット</th>
                        <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">動作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {[
                        ['Cmd+Esc (macOS)', 'Claude Code パネルを開く / 閉じる'],
                        ['Ctrl+Esc (Windows/Linux)', 'Claude Code パネルを開く / 閉じる'],
                        ['Cmd+Shift+P → "Claude"', 'Claude Code コマンドの一覧を表示'],
                      ].map(([key, desc]) => (
                        <tr key={key} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-4 py-3 font-mono font-bold text-[var(--claude-primary)] whitespace-nowrap">{key}</td>
                          <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* JetBrains 連携 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Puzzle className="text-[var(--claude-primary)]" />
              JetBrains 連携
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              IntelliJ IDEA、WebStorm、PyCharm などの JetBrains IDE でも Claude Code プラグインが利用可能です。
            </p>

            <div className="space-y-6">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">プラグインのインストール</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  JetBrains Marketplace からプラグインをインストールします。
                </p>
                <CodeBlock language="text" code={`Settings → Plugins → Marketplace
→ "Claude Code" を検索 → Install → IDE を再起動`} />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">JetBrains 固有の機能</h3>
                <div className="space-y-3">
                  {[
                    { label: 'ツールウィンドウ統合', desc: 'Claude Code をサイドパネルのツールウィンドウとして表示。コード編集と並行して利用可能。' },
                    { label: 'プロジェクト構造の認識', desc: 'JetBrains のプロジェクトモデルを活用し、モジュール構成やビルド設定を自動認識。' },
                    { label: '統合ターミナル', desc: 'JetBrains の統合ターミナルで Claude Code セッションを直接起動。' },
                  ].map(item => (
                    <div key={item.label} className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <h5 className="font-bold text-xs text-[var(--claude-primary)] mb-1">{item.label}</h5>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ターミナル統合 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Monitor className="text-[var(--claude-primary)]" />
              ターミナル統合のセットアップ
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              IDE の拡張機能を使わず、統合ターミナルから直接 Claude Code を使う場合のセットアップ手順です。
            </p>

            <CodeBlock language="bash" code={`# ターミナル統合のセットアップ（Shift+Enter で改行入力を有効化）
claude /terminal-setup

# iTerm2 / Terminal.app / VS Code ターミナルそれぞれに
# 対応した設定が自動で適用される`} />

            <InfoBox type="info" title="Shift+Enter の設定">
              デフォルトでは Enter でプロンプトが送信されます。<code>/terminal-setup</code> を実行すると、ターミナルに合わせた Shift+Enter による改行入力の設定が行われます。
            </InfoBox>
          </section>

          {/* デスクトップアプリ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Layout className="text-[var(--claude-primary)]" />
              デスクトップアプリ
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code はスタンドアロンのデスクトップアプリとしても利用可能です。IDE に依存せず、独立した環境で Claude Code を使用したい場合に便利です。
            </p>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold mb-3">デスクトップアプリの特徴</h3>
              <ul className="space-y-2">
                {[
                  'ネイティブウィンドウとして独立して動作',
                  'キーボードショートカットでの素早い呼び出し',
                  'システムトレイからの常駐起動',
                  '複数プロジェクトの同時管理',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-[var(--claude-primary)] mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 実践的な使い分け */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Settings className="text-[var(--claude-primary)]" />
              実践的な使い分け
            </h2>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">環境</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">適したケース</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">利点</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    ['ターミナル (CLI)', 'tmux 統合、スクリプト連携、ヘッドレス実行', '柔軟性が高い、環境非依存'],
                    ['VS Code 拡張機能', 'Web フロントエンド開発、TypeScript プロジェクト', 'エディタとのシームレスな統合'],
                    ['JetBrains プラグイン', 'Java/Kotlin 開発、大規模プロジェクト', 'IDE の高度な解析機能との連携'],
                    ['デスクトップアプリ', 'IDE を使わない開発、スタンドアロン利用', '軽量、独立した作業環境'],
                  ].map(([env, useCase, benefit]) => (
                    <tr key={env} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-[var(--claude-primary)] whitespace-nowrap">{env}</td>
                      <td className="px-4 py-3 text-muted-foreground">{useCase}</td>
                      <td className="px-4 py-3 text-muted-foreground">{benefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="tmux との併用がおすすめ">
              IDE 統合と tmux は排他ではありません。IDE のターミナルパネルで tmux セッションを起動し、Claude Code を実行するハイブリッド構成が実用的です。tmux によるセッション永続化の恩恵を受けつつ、IDE の機能も活用できます。
            </InfoBox>
          </section>

          {/* Keyboard 操作 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Keyboard className="text-[var(--claude-primary)]" />
              IDE 共通の操作ヒント
            </h2>
            <div className="space-y-4">
              {[
                { title: 'コンテキストの活用', desc: 'エディタで開いているファイルは自動的にコンテキストとして認識されます。@file メンションで明示的にファイルを指定することも可能です。' },
                { title: 'ワークスペース設定', desc: 'プロジェクトルートに CLAUDE.md を配置することで、IDE の種類に関係なく一貫した指示をエージェントに伝えられます。' },
                { title: '複数ウィンドウでの利用', desc: '異なるプロジェクトを別々の IDE ウィンドウで開き、それぞれに独立した Claude Code セッションを起動できます。' },
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
            title="IDE 連携のセットアップコマンドを書こう"
            description="VS Code 拡張機能のインストールとターミナル統合のセットアップコマンドを書いてください。"
            initialCode={`# IDE 連携セットアップ\n\n# 1. VS Code に Claude Code 拡張機能をインストール:\n\n# 2. ターミナル統合のセットアップ（Shift+Enter有効化）:\n\n# 3. VS Code でパネルを開くショートカット（macOS）:\n\n# 4. VS Code コマンドパレットから Claude を検索:`}
            answer={`# IDE 連携セットアップ\n\n# 1. VS Code に Claude Code 拡張機能をインストール:\ncode --install-extension anthropic.claude-code\n\n# 2. ターミナル統合のセットアップ（Shift+Enter有効化）:\nclaude /terminal-setup\n\n# 3. VS Code でパネルを開くショートカット（macOS）:\n# Cmd+Esc\n\n# 4. VS Code コマンドパレットから Claude を検索:\n# Cmd+Shift+P → "Claude"`}
            hints={[
              'code --install-extension で VS Code 拡張機能をCLIからインストールできます',
              '/terminal-setup で Shift+Enter による改行入力を有効化します',
              'macOS では Cmd+Esc でパネルを開閉します',
            ]}
            keywords={['code --install-extension', 'anthropic.claude-code', '/terminal-setup', 'Cmd+Esc']}
          />

        <PageNavigation />
      </div>
    </div>
  );
}
