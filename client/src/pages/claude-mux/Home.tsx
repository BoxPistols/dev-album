import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Zap, Code2, Layers, Brain, Shield, Keyboard, Search, Settings, Eye, CheckCircle2, Lightbulb, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { parts, getSectionsByPart } from "@/lib/navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/40 dark:to-slate-900/40">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-[var(--claude-primary)]" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Claude Code 実践ガイド</h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 hidden md:block">tmux統合による最適な開発環境の構築</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="inline-flex px-4 py-2 bg-slate-100 dark:bg-slate-800 text-[var(--claude-primary)] rounded-full text-sm font-medium items-center gap-2 border border-[var(--claude-primary)]/20">
              <Brain className="w-4 h-4" />
              AIエージェントによるソフトウェア開発の実践
            </div>
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-[var(--claude-primary)]/10 text-[var(--claude-primary)] border border-[var(--claude-primary)]/20">v1.1.0</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            Claude Code で始める<br />
            <span className="text-[var(--claude-primary)]">AI駆動開発</span>
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Anthropic 公式の CLI エージェント Claude Code を体系的に学び、tmux による環境管理と組み合わせた、再現可能な開発ワークフローを構築します。
          </p>

          <Link href="/claude-mux/getting-started/welcome">
            <Button className="bg-[var(--claude-primary)] hover:opacity-90 text-white px-8 py-6 text-lg flex items-center gap-2 mx-auto">
              ガイドを読む
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* PR Points */}
        <div className="bg-white/40 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 mb-20 backdrop-blur-sm">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-center max-w-4xl mx-auto">
            コード生成、テスト実行、Git操作を自律的に遂行するAIエージェントと、セッション永続化・画面分割を提供するターミナルマルチプレクサー。この組み合わせにより、開発者はコードレビューと設計判断に集中できます。
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-3xl font-bold text-[var(--claude-primary)] mb-2">42</div>
            <p className="text-slate-600 dark:text-slate-400">ステップの体系的なカリキュラム</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-3xl font-bold text-[var(--claude-primary)] mb-2">15</div>
            <p className="text-slate-600 dark:text-slate-400">セクション構成（基礎編＋発展編）</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-3xl font-bold text-[var(--claude-primary)] mb-2">実践</div>
            <p className="text-slate-600 dark:text-slate-400">MCP・Subagents・tmux統合</p>
          </div>
        </div>
      </section>

      {/* このガイドの使い方 */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-10 text-center">
          このガイドの使い方
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* コーディングチャレンジ（フル幅カード） */}
          <div className="md:col-span-3 bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <Code2 className="w-5 h-5 text-[var(--claude-primary)]" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">コーディングチャレンジ（インタラクティブエディタ）の使い方</h4>
            </div>

            <div className="space-y-5 text-sm text-slate-600 dark:text-slate-400">
              {/* エディタ構成 */}
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200 mb-2">エディタの構成</p>
                <p>各学習ページにはインタラクティブなコードエディタが埋め込まれています。画面は左右に分割されており、<strong className="text-slate-700 dark:text-slate-300">左側がコード入力エリア</strong>、<strong className="text-slate-700 dark:text-slate-300">右側がプレビューエリア</strong>です。コードは直接編集でき、入力内容に応じてプレビューが自動更新されます（400ms のデバウンス付き）。</p>
              </div>

              {/* プレビュータイプ */}
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200 mb-2">プレビューの種類</p>
                <ul className="space-y-1.5 ml-1">
                  <li className="flex items-start gap-2">
                    <span className="inline-block mt-0.5 px-1.5 py-0.5 text-xs font-medium bg-slate-800 dark:bg-slate-700 text-green-400 rounded font-mono shrink-0">Terminal</span>
                    <span><strong className="text-slate-700 dark:text-slate-300">ターミナルプレビュー</strong> — シェルコマンドをシンタックスハイライト付きで表示します。コマンドの構文を視覚的に確認できます。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block mt-0.5 px-1.5 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded font-mono shrink-0">Markdown</span>
                    <span><strong className="text-slate-700 dark:text-slate-300">Markdown プレビュー</strong> — 入力した Markdown をリアルタイムで HTML に変換し、整形された状態で表示します。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block mt-0.5 px-1.5 py-0.5 text-xs font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded font-mono shrink-0">JSON</span>
                    <span><strong className="text-slate-700 dark:text-slate-300">Config (JSON) プレビュー</strong> — JSON のバリデーションを行い、フォーマット済みの出力を表示します。構文エラーがあればエラーメッセージが表示されます。</span>
                  </li>
                </ul>
              </div>

              {/* ボタン説明 */}
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200 mb-3">操作ボタン</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="shrink-0 mt-0.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-600 text-white rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        チェック
                      </span>
                    </div>
                    <span>コードを採点します。キーワードベースの緩い判定で、完全一致でなくても正解と判定されます。</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="shrink-0 mt-0.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-amber-400 text-amber-600 dark:text-amber-400 rounded-md">
                        <Lightbulb className="w-3.5 h-3.5" />
                        ヒント
                      </span>
                    </div>
                    <span>段階的にヒントを表示します。押すたびに次のヒントが追加で表示されます。</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="shrink-0 mt-0.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 rounded-md">
                        <Eye className="w-3.5 h-3.5" />
                        模範解答
                      </span>
                    </div>
                    <span>模範解答の表示 / 非表示を切り替えます。トグル式で何度でも切替可能です。</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="shrink-0 mt-0.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 rounded-md">
                        <RotateCcw className="w-3.5 h-3.5" />
                        リセット
                      </span>
                    </div>
                    <span>エディタの内容を初期状態に戻します。やり直したいときに使います。</span>
                  </div>
                </div>
              </div>

              {/* ショートカット情報 */}
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-300">
                <Keyboard className="w-4 h-4 mt-0.5 shrink-0" />
                <span>エディタ内ショートカット: <kbd className="px-1.5 py-0.5 text-xs bg-blue-100 dark:bg-blue-800/50 rounded border border-blue-300 dark:border-blue-700 font-mono">Tab</kbd> でインデント挿入。コードは横スクロール対応。</span>
              </div>
            </div>
          </div>

          {/* キーボードショートカット */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <Keyboard className="w-5 h-5 text-[var(--claude-primary)]" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">キーボードショートカット</h4>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono">←</kbd>
                <kbd className="px-1.5 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono">→</kbd>
                <span>前後のページに移動</span>
              </li>
              <li className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono">Shift+←</kbd>
                <kbd className="px-1.5 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono">Shift+→</kbd>
                <span>前後のセクションに移動</span>
              </li>
              <li className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono">Cmd/Ctrl+K</kbd>
                <span>検索にフォーカス</span>
              </li>
              <li className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono">Home</kbd>
                <span>ページトップにスクロール</span>
              </li>
            </ul>
          </div>

          {/* キーワード検索 */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <Search className="w-5 h-5 text-[var(--claude-primary)]" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">キーワード検索</h4>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>サイドバーの検索欄にキーワードを入力</li>
              <li>ページタイトルだけでなく、H2見出しのキーワードでも検索可能</li>
              <li>検索結果の「#」付きサブアイテムをクリックで該当箇所にスクロール＆ハイライト</li>
            </ul>
          </div>

          {/* 画面設定 */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <Settings className="w-5 h-5 text-[var(--claude-primary)]" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">画面設定</h4>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>ダークモード / ライトモード切替</li>
              <li>ブックマーク機能</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800 py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-12 text-center">
            主要な学習項目
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-[var(--claude-primary)]/30 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Code2 className="w-6 h-6 text-[var(--claude-primary)]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Claude Code の体系的理解
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    スラッシュコマンド、コンテキスト管理、セキュリティ設定、トークン最適化。CLI エージェントの全機能を網羅的に解説します。
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-[var(--claude-primary)]/30 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Zap className="w-6 h-6 text-[var(--claude-primary)]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    MCP・Subagents・Skills
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Figma、Sentry 等の外部ツール連携、並列処理、カスタム自動化。エージェントの拡張機能を実践的に学びます。
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <Layers className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    tmux による環境管理
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    セッション永続化、画面分割、プラグイン管理。AIエージェントの監視に最適なターミナル環境を構築します。
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-[var(--claude-primary)]/30 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Shield className="w-6 h-6 text-[var(--claude-primary)]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    統合ワークフロー
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Claude Code × tmux × MCP の統合。CLAUDE.md、.mcp.json、.tmuxp.yaml による環境のコード化。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-12 text-center">
          ロードマップ
        </h3>

        <div className="space-y-12">
          {parts.map((part) => {
            const partSections = getSectionsByPart(part.id);
            return (
              <div key={part.id}>
                <div className="flex items-center gap-3 mb-6">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">{part.title}</h4>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{part.description}</span>
                </div>
                <div className="space-y-4">
                  {partSections.map((section) => {
                    const isClaude = section.colorScheme === 'claude';
                    const globalIndex = parts.slice(0, parts.indexOf(part)).reduce((acc, p) => acc + getSectionsByPart(p.id).length, 0) + partSections.indexOf(section) + 1;
                    return (
                      <div key={section.id} className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center ${
                            isClaude
                              ? 'bg-slate-100 dark:bg-slate-800 text-[var(--claude-primary)]'
                              : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                          }`}>
                            {globalIndex}
                          </div>
                          <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{section.title}</h4>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 ml-14">
                          {section.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center text-slate-600 dark:text-slate-400">
          <p>
            © 2026 Claude Code 実践ガイド
          </p>
        </div>
      </footer>
    </div>
  );
}
