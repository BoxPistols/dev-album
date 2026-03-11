import { Shield, Terminal, Cpu, Monitor, Keyboard } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function ClaudeCodeIntro() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-500 text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />

          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Claude Code CLI <span className="text-[var(--claude-primary)]">の概要</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            ターミナル上で動作するエンジニア向けの自律型エージェントツール。その設計思想と基本機能。
          </p>
        </div>

        <div className="space-y-16 mt-8">
          {/* 設計コンセプト */}
          <section className="relative overflow-hidden p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-[var(--claude-primary)]">
              <Cpu className="fill-current" />
              設計コンセプト
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Codeは、Anthropicが提供するコマンドラインのAIエージェントです。開発環境と直接統合され、ファイル操作、コマンド実行、プロジェクト全体の分析をエンジニアとの対話を通じて遂行します。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-bold mb-1 text-[var(--claude-primary)]">エージェントによる自律実行</h4>
                <p className="text-xs text-muted-foreground text-justify">指示に基づき、bashコマンドやGit操作を自ら選択し実行します。必要に応じてサブエージェントを起動し並列処理を行うことも可能です。</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-bold mb-1 text-[var(--claude-primary)]">プロジェクト横断的な理解</h4>
                <p className="text-xs text-muted-foreground text-justify">個別のコード片だけでなく、リポジトリ全体の構造、依存関係、テスト状況を把握した上で、最適な修正や提案を行います。</p>
              </div>
            </div>
          </section>

          {/* 主要な機能カテゴリ */}
          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Terminal className="text-[var(--claude-primary)]" />
              主要な機能カテゴリ
            </h2>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-[var(--claude-primary)] mb-3">コード生成と修正</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">新規機能の実装、既存バグの修正、リファクタリングをファイルシステムレベルで実行します。</p>
                </div>
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-[var(--claude-primary)] mb-3">テストとデバッグ</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">テストコードの生成、テストの実行、エラーログの分析とそれに基づく修正を繰り返します。</p>
                </div>
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-[var(--claude-primary)] mb-3">リポジトリ分析</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">コードの意味的な検索（Semantic Search）や、アーキテクチャの解説、ドキュメント生成を行います。</p>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
                <h3 className="text-lg font-semibold mb-4">CLIの基本的な使い方</h3>
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <span className="text-emerald-400">$ claude</span>
                    <p className="text-slate-500 mt-1"># インタラクティブREPLを開始します。</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <span className="text-emerald-400">$ claude "src/auth のテストを修正して"</span>
                    <p className="text-slate-500 mt-1"># 初期プロンプト付きでREPLを開始します。</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <span className="text-emerald-400">$ claude -p "このコードを説明して" &lt; src/main.ts</span>
                    <p className="text-slate-500 mt-1"># 非インタラクティブモード（-p / --print）。結果を出力して終了します。パイプ入力にも対応。</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <span className="text-emerald-400">$ claude -c</span>
                    <p className="text-slate-500 mt-1"># 直前の会話を継続します（--continue）。</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <span className="text-emerald-400">$ claude --model sonnet</span>
                    <p className="text-slate-500 mt-1"># 使用モデルを指定して起動します（sonnet, opus, haiku）。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 信頼と安全性 */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Shield className="text-emerald-600" />
              信頼と安全性のモデル
            </h2>
            <p className="leading-relaxed mb-6 text-sm text-muted-foreground">
              Claude Codeは、破壊的な操作や外部通信を行う際、エンジニアの明示的な承認（Human-in-the-loop）を必要とする設計になっています。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="font-bold block mb-1">承認の対象</span>
                <p className="text-muted-foreground">ファイルへの書き込み、シェルコマンドの実行、MCP経由の外部ツール呼び出しなど。パーミッションモードにより制御可能。</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="font-bold block mb-1">保護機能</span>
                <p className="text-muted-foreground">.claudeignore による特定ファイルの読み込み遮断、サンドボックス環境（macOS: Seatbelt / Linux: bubblewrap）での動作制限。</p>
              </div>
            </div>
          </section>

          {/* IDE統合 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Monitor className="text-[var(--claude-primary)]" />
              IDE統合
            </h2>
            <p className="leading-relaxed mb-6 text-sm text-muted-foreground">
              ターミナル単独での利用に加え、主要なエディタとも統合可能です。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2">VS Code</h4>
                <p className="text-xs text-muted-foreground">サイドバー/タブパネル、インラインdiff表示、チェックポイントによるロールバック。<code className="text-[var(--claude-primary)]">Cmd+Esc</code> でフォーカス切替。</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2">JetBrains（Beta）</h4>
                <p className="text-xs text-muted-foreground">IDE diffビューア統合、自動診断共有。<code className="text-[var(--claude-primary)]">Cmd+Esc</code> でクイック起動。</p>
              </div>
            </div>
          </section>

          {/* 導入手順 */}
          <section>
            <h2 className="text-3xl font-bold mb-6">導入手順</h2>
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
                <h3 className="text-lg font-semibold mb-4 text-sm">1. インストール</h3>
                <p className="text-xs text-muted-foreground mb-4">Node.js (npm) を使用してグローバルにインストールします。</p>
                <CodeBlock code="$ npm install -g @anthropic-ai/claude-code" language="bash" />
              </div>

              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
                <h3 className="text-lg font-semibold mb-4 text-sm">2. 認証</h3>
                <p className="text-xs text-muted-foreground mb-4">Anthropicアカウント（Max/Teamプラン）またはAPIキーで認証します。</p>
                <CodeBlock code={`# ブラウザ経由でAnthropicアカウント認証
$ claude login

# APIキーで認証する場合
$ export ANTHROPIC_API_KEY=sk-ant-...`} language="bash" />
              </div>

              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
                <h3 className="text-lg font-semibold mb-4 text-sm">3. 初期設定</h3>
                <p className="text-xs text-muted-foreground mb-4">プロジェクトルートでCLAUDE.mdを生成し、エージェントにプロジェクトのコンテキストを教えます。</p>
                <CodeBlock code={`$ cd your-project
$ claude
> /init`} language="bash" />
              </div>
            </div>
          </section>

          {/* キーボードショートカット */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Keyboard className="text-[var(--claude-primary)]" />
              主要なキーボードショートカット
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { key: 'Ctrl+C', desc: '現在の生成をキャンセル' },
                { key: 'Ctrl+L', desc: 'ターミナル画面クリア（履歴保持）' },
                { key: 'Esc+Esc', desc: '巻き戻しまたは要約' },
                { key: 'Shift+Tab', desc: 'パーミッションモード切替' },
                { key: 'Option+P', desc: 'モデル切替（macOS）' },
                { key: 'Option+T', desc: '拡張思考トグル（macOS）' },
                { key: 'Ctrl+G', desc: 'テキストエディタで開く' },
                { key: '\\+Enter', desc: '複数行入力' },
              ].map(item => (
                <div key={item.key} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <code className="text-xs font-bold text-[var(--claude-primary)] bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded min-w-[100px] text-center">{item.key}</code>
                  <span className="text-xs text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="Claude Code の基本コマンドを書いてみよう"
            description="Claude Code CLI の主要な起動オプションを整理しましょう。対話モード、非対話モード、セッション継続、モデル指定の4つのコマンドをコメント付きで書いてください。"
            initialCode={`# Claude Code の起動コマンドを書いてください\n\n# 1. 対話モード（REPL）を開始\n\n# 2. 非対話モードでプロンプトを渡す\n\n# 3. 直前のセッションを継続\n\n# 4. モデルを指定して起動`}
            answer={`# Claude Code の起動コマンドを書いてください\n\n# 1. 対話モード（REPL）を開始\nclaude\n\n# 2. 非対話モードでプロンプトを渡す\nclaude -p "このプロジェクトの構造を説明して"\n\n# 3. 直前のセッションを継続\nclaude -c\n\n# 4. モデルを指定して起動\nclaude --model claude-sonnet-4-6`}
            hints={[
              '対話モードは引数なしで claude を実行します',
              '非対話モードは -p フラグを使います',
              'セッション継続は -c（--continue）フラグです',
            ]}
            keywords={['claude', '-p', '-c', '--model']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
