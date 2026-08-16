import { Terminal, Keyboard, FileText, Zap, Settings } from 'lucide-react';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

function CheatTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-900">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((row, i) => (
            <tr key={i} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 ${j === 0 ? 'font-mono font-bold text-[var(--claude-primary)] whitespace-nowrap' : 'text-muted-foreground'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ClaudeCheatsheet() {
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
            Claude Code チートシート
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            日常的に参照するコマンド、ショートカット、設定の網羅的な一覧。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* スラッシュコマンド: コア操作 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Terminal className="text-[var(--claude-primary)]" />
              スラッシュコマンド — コア操作
            </h2>
            <CheatTable
              headers={['コマンド', '説明']}
              rows={[
                ['/help', '利用可能なコマンドの一覧とヘルプを表示'],
                ['/init', 'CLAUDE.md を生成（CLAUDE_CODE_NEW_INIT=1 で対話セットアップ）'],
                ['/clear', '空コンテキストで新会話開始。前会話は /resume で復帰可（エイリアス: /reset, /new）'],
                ['/compact [focus]', '会話を要約してコンテキスト開放（同セッション継続）'],
                ['/model [model]', 'モデル切替。引数なしでピッカー、左右キーで effort 調整'],
                ['/effort [level|auto]', 'effort level 切替: low / medium / high / xhigh / max（モデル依存、auto で既定値）'],
                ['/doctor', '環境と設定の健全性を診断し、修正もできる。結果を先に報告し、変更前に確認を求める（エイリアス: /checkup）'],
                ['/exit (/quit)', 'REPLを終了（Ctrl+D でも可）'],
              ]}
            />
          </section>

          {/* スラッシュコマンド: セッション管理 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <FileText className="text-[var(--claude-primary)]" />
              スラッシュコマンド — セッション管理
            </h2>
            <CheatTable
              headers={['コマンド', '説明']}
              rows={[
                ['/resume [session]', '過去のセッションを ID / 名前で再開（引数なしでピッカー）。エイリアス: /continue'],
                ['/branch [name]', '会話を分岐して分岐先に切り替える。元セッションは /resume から戻れる'],
                ['/rewind', '会話 / コードを巻き戻し or 以降を要約。Esc×2 でも起動（/checkpoint, /undo）'],
                ['/rename [name]', 'セッションに識別名を付与（引数なしで自動命名）'],
                ['/export [filename]', '対話履歴をプレーンテキスト出力（引数なしでダイアログ）'],
                ['/copy [N]', '最後または N 番目以前のアシスタント応答をコピー'],
                ['/diff', '未コミット差分とターン毎差分をインタラクティブ表示'],
              ]}
            />
          </section>

          {/* スラッシュコマンド: 設定・ワークフロー */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Settings className="text-[var(--claude-primary)]" />
              スラッシュコマンド — 設定・ワークフロー
            </h2>
            <CheatTable
              headers={['コマンド', '説明']}
              rows={[
                ['/config', 'theme / model / output style 等の Settings UI（エイリアス: /settings）'],
                ['/permissions', 'allow / ask / deny ルールを管理（エイリアス: /allowed-tools）'],
                ['/memory', 'CLAUDE.md と auto-memory を編集 / 閲覧'],
                ['/usage', 'セッションコスト + プラン使用制限 + 統計（エイリアス: /cost, /stats）'],
                ['/context', 'コンテキスト使用量をカラーグリッド表示と最適化提案'],
                ['/review [PR]', 'PR をローカルレビュー（深いレビューは /ultrareview）'],
                ['/security-review', 'カレントブランチ差分をセキュリティ観点で解析'],
                ['/plan [description]', 'プランモード突入。説明を渡すと即タスク開始'],
                ['/agents', 'subagent 設定を管理'],
                ['/skills', 'skill 一覧（t キーでトークン数ソート）'],
                ['/hooks', 'tool イベントの hook 設定を表示'],
                ['/mcp', 'MCP サーバー接続と OAuth 認証を管理'],
                ['/login (/logout)', 'Anthropic アカウントにサインイン / アウト'],
                ['/status', 'バージョン / モデル / アカウント / 接続を Status タブに表示'],
                ['/feedback (/bug)', 'フィードバック送信'],
                ['/terminal-setup', 'Shift+Enter 等のキーバインドをターミナルへインストール'],
              ]}
            />
          </section>

          {/* CLI 起動オプション */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Zap className="text-[var(--claude-primary)]" />
              CLI 起動オプション
            </h2>
            <CheatTable
              headers={['コマンド', '説明']}
              rows={[
                ['claude', '対話モード（REPL）を起動'],
                ['claude "prompt"', '初期プロンプト付きで対話モードを起動'],
                ['claude -p "prompt"', '非対話モード。結果を出力して終了（パイプ対応）'],
                ['claude -c / claude --continue', '直前のセッションを継続して起動'],
                ['claude --resume <id>', '指定セッション ID または名前で再開'],
                ['claude --continue --fork-session', '直前を分岐起動（新 ID、元セッションは保持）'],
                ['claude --model <name>', '使用モデルを指定（opus, sonnet, haiku, opusplan, opus[1m] 等）'],
                ['claude --effort <level>', 'effort level を起動時に指定（low / medium / high / xhigh / max）'],
                ['claude --debug', '起動時からデバッグログを有効化'],
                ['claude --verbose', '詳細ログを表示して起動'],
                ['claude --dangerously-skip-permissions', '全権限を自動承認（CI/スクリプト用）'],
                ['cat file | claude -p "prompt"', 'ファイル内容をパイプで渡して処理'],
                ['claude update', 'Claude Code を最新版に更新（設定変更は /config key=value か settings.json で）'],
                ['claude mcp list', '登録済み MCP サーバの一覧と接続状態を表示'],
              ]}
            />
          </section>

          {/* キーボードショートカット */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Keyboard className="text-[var(--claude-primary)]" />
              キーボードショートカット（REPL内）
            </h2>
            <CheatTable
              headers={['キー', '動作']}
              rows={[
                ['Enter', 'プロンプトを送信'],
                ['Shift + Enter', '改行を挿入（ターミナル設定が必要）'],
                ['Escape', '応答の生成を中断'],
                ['Escape × 2', '入力が空なら /rewind を起動、入力中はドラフトをクリア'],
                ['Ctrl + C', '実行中の操作を中断 / 入力クリア、2 回で終了'],
                ['Ctrl + D', 'REPL を終了'],
                ['Ctrl + O', '詳細トランスクリプト表示の切替'],
                ['Up / Down', '入力履歴の参照'],
                ['Shift + Tab', 'パーミッションモード切替（default → acceptEdits → plan、有効化時は auto 等も）'],
                ['Ctrl + R', 'コマンド履歴の逆検索'],
                ['! で始める', 'bash コマンドを直接実行'],
                ['/ で始める', 'スラッシュコマンド / skill 呼び出し'],
                ['@ で始める', 'ファイルパス補完'],
              ]}
            />
          </section>

          {/* CLAUDE.md 設定 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <FileText className="text-[var(--claude-primary)]" />
              CLAUDE.md の構成
            </h2>
            <CheatTable
              headers={['ファイル', 'スコープ', '用途']}
              rows={[
                ['CLAUDE.md', 'プロジェクトルート', 'プロジェクト全体の指示（チーム共有）'],
                ['CLAUDE.local.md', 'プロジェクトルート', '個人用の追加指示（.gitignore 推奨）'],
                ['~/.claude/CLAUDE.md', 'ユーザーグローバル', '全プロジェクト共通の個人設定'],
                ['サブディレクトリ/CLAUDE.md', 'ディレクトリスコープ', '特定ディレクトリ配下での追加指示'],
              ]}
            />
            <div className="mt-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">読み込み順:</strong> 起動時に全文読み込まれるのは、作業ディレクトリとその上位階層にある CLAUDE.md / CLAUDE.local.md です。管理ポリシー → ユーザー（<code>~/.claude/CLAUDE.md</code>）→ プロジェクト → ローカルの順に、ファイルシステムのルート側から作業ディレクトリ側へ連結されます（上書きではないので優先順位はなく、作業ディレクトリに近いものが最後に読まれます）。サブディレクトリの CLAUDE.md は起動時ではなく、Claude がそのディレクトリのファイルを読んだ時点で遅延読み込みされます。
                <code className="mx-1">CLAUDE.local.md</code> はプロジェクトの <code>.gitignore</code> に追加して個人設定を管理します。
              </p>
            </div>
          </section>

          {/* パーミッションモード */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Settings className="text-[var(--claude-primary)]" />
              パーミッションモード
            </h2>
            <CheatTable
              headers={['モード', '動作']}
              rows={[
                ['default（デフォルト）', '読み取りは自動許可、書き込み・実行は毎回確認'],
                ['plan', '読み取り専用。コード変更の計画のみ作成し実行しない'],
                ['acceptEdits', 'ファイル編集を自動許可、コマンド実行は毎回確認'],
                ['dontAsk', '許可済みルール以外のツール呼び出しを自動拒否（CI・スクリプト向け）'],
                ['bypassPermissions', '全権限チェックをスキップ（隔離されたコンテナ / VM 専用）'],
              ]}
            />
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="Claude Code の日常コマンドを書こう"
            description="開発中によく使う Claude Code のスラッシュコマンドと CLI オプションを組み合わせたワークフローを書いてください。"
            initialCode={`# Claude Code 日常ワークフロー\n\n# 1. プロジェクトで Claude を起動\ncd ~/projects/my-app && claude\n\n# 2. コンテキスト使用量を確認\n/___  # ← ここを埋める\n\n# 3. コンテキストが多い場合に圧縮\n/___ auth関連の変更に集中  # ← ここを埋める\n\n# 4. コストを確認\n/___  # ← ここを埋める\n\n# 5. PRのコードレビュー\n/___  # ← ここを埋める`}
            answer={`# Claude Code 日常ワークフロー\n\n# 1. プロジェクトで Claude を起動\ncd ~/projects/my-app && claude\n\n# 2. コンテキスト使用量を確認\n/context\n\n# 3. コンテキストが多い場合に圧縮\n/compact auth関連の変更に集中\n\n# 4. コストを確認\n/cost\n\n# 5. PRのコードレビュー\n/review`}
            hints={[
              '/context でコンテキストウィンドウの使用量をビジュアル表示します',
              '/compact にフォーカス指示を添えると重要な文脈を保持できます',
              '/review は現在のブランチの差分を自動でレビューします',
            ]}
            keywords={['context', 'compact', 'cost', 'review']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
