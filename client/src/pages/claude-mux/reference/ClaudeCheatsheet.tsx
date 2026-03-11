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
                ['/init', 'CLAUDE.md を生成してエージェントの初期設定を行う'],
                ['/clear', '会話履歴をクリアして新しいセッションを開始'],
                ['/compact [focus]', '会話を要約してコンテキストを圧縮（フォーカス指示を追加可能）'],
                ['/model', 'AIモデルを切替え（Opus / Sonnet / Haiku）'],
                ['/doctor', '環境と設定の健全性を診断'],
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
                ['/resume [session]', '過去のセッションを再開（引数なしでピッカー表示）'],
                ['/rename <name>', '現在のセッションに名前を付ける'],
                ['/export [filename]', '対話履歴をファイルまたはクリップボードに出力'],
                ['/copy', '最後のアシスタント応答をクリップボードにコピー'],
                ['/rewind', '会話やコードを以前のポイントに巻き戻す'],
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
                ['/config', '設定ファイル（API キー、パーミッション等）を管理'],
                ['/permissions', 'ツール実行の許可設定を編集'],
                ['/memory', 'CLAUDE.md の内容を確認・更新'],
                ['/project', 'プロジェクト固有の設定を管理'],
                ['/review', '現在のブランチの差分をコードレビュー'],
                ['/pr-comments', 'PRのレビューコメントを取得して対応'],
                ['/bug', 'バグレポートを作成して送信'],
                ['/login', 'Anthropic アカウントにログイン'],
                ['/logout', 'アカウントからログアウト'],
                ['/status', '認証状態とアカウント情報を確認'],
                ['/vim', 'Vim キーバインドモードの切替え'],
                ['/terminal-setup', 'ターミナル統合のセットアップ（Shift+Enter等）'],
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
                ['claude "prompt"', 'ワンショット実行（結果を出力して終了）'],
                ['claude -p "prompt"', 'パイプモード（stdin/stdout のみ、スピナー非表示）'],
                ['claude -c', '直前のセッションを継続して起動'],
                ['claude --resume <id>', '指定セッションIDで再開'],
                ['claude --model <name>', '使用モデルを指定（opus, sonnet, haiku）'],
                ['claude --allowedTools "tool"', '許可するツールを指定して起動'],
                ['claude --verbose', '詳細ログを表示して起動'],
                ['claude --dangerously-skip-permissions', '全権限を自動承認（CI/スクリプト用）'],
                ['cat file | claude "prompt"', 'ファイル内容をパイプで渡して処理'],
                ['claude config set <key> <val>', '設定値を永続的に変更'],
                ['claude mcp serve', 'Claude Code を MCP サーバーとして起動'],
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
                ['Ctrl + C', '現在の入力をキャンセル / 2回で終了'],
                ['Ctrl + D', 'REPLを終了'],
                ['Tab', 'ファイルパスの補完'],
                ['Up / Down', '入力履歴の参照'],
                ['Shift + Tab', 'モデル切替（Opus ↔ Sonnet）'],
                ['# で始める', 'メモ入力モード（エージェントに送信しない）'],
                ['! で始める', 'bash コマンドを直接実行'],
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
                <strong className="text-foreground">読み込み順:</strong> グローバル → プロジェクトルート → サブディレクトリ（深い階層が優先）。
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
                ['autoEdit', 'ファイル編集を自動許可、コマンド実行は毎回確認'],
                ['fullAuto', '全操作を自動許可（信頼できるプロジェクトのみ推奨）'],
                ['bypassPermissions', '全権限チェックをスキップ（CI/CD 専用）'],
              ]}
            />
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="Claude Code の日常コマンドを書こう"
            description="開発中によく使う Claude Code のスラッシュコマンドと CLI オプションを組み合わせたワークフローを書いてください。"
            initialCode={`# Claude Code 日常ワークフロー\n\n# 1. プロジェクトで Claude を起動\n\n# 2. コンテキスト使用量を確認\n\n# 3. コンテキストが多い場合に圧縮\n\n# 4. コストを確認\n\n# 5. PRのコードレビュー`}
            answer={`# Claude Code 日常ワークフロー\n\n# 1. プロジェクトで Claude を起動\ncd ~/projects/my-app && claude\n\n# 2. コンテキスト使用量を確認\n/context\n\n# 3. コンテキストが多い場合に圧縮\n/compact auth関連の変更に集中\n\n# 4. コストを確認\n/cost\n\n# 5. PRのコードレビュー\n/review`}
            hints={[
              '/context でコンテキストウィンドウの使用量をビジュアル表示します',
              '/compact にフォーカス指示を添えると重要な文脈を保持できます',
              '/review は現在のブランチの差分を自動でレビューします',
            ]}
            keywords={['/context', '/compact', '/cost', '/review']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
