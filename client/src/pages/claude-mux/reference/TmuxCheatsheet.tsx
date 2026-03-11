import { Monitor, Layout, Columns, Copy, Settings } from 'lucide-react';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

function CheatTable({ headers, rows, color = 'emerald' }: { headers: string[]; rows: string[][]; color?: 'emerald' | 'slate' }) {
  const accentClass = color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : 'text-[var(--claude-primary)]';
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
                <td key={j} className={`px-4 py-3 ${j === 0 ? `font-mono font-bold ${accentClass} whitespace-nowrap` : 'text-muted-foreground'}`}>
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

export default function TmuxCheatsheet() {
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
            tmux チートシート
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            セッション、ウィンドウ、ペインの操作を中心とした tmux コマンドの網羅的な一覧。
          </p>
          <div className="p-4 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              <strong>Prefix</strong> = デフォルトは <code className="font-bold">Ctrl + B</code>。
              以下の表で「Prefix + X」は「Ctrl+B を押して離した後、X を押す」を意味します。
            </p>
          </div>
        </div>

        <div className="space-y-12 mt-8">
          {/* セッション操作 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Monitor className="text-emerald-600 dark:text-emerald-400" />
              セッション操作
            </h2>
            <h3 className="text-lg font-semibold text-foreground mb-3">シェルからの操作</h3>
            <CheatTable
              headers={['コマンド', '説明']}
              rows={[
                ['tmux', '新しいセッションを作成して接続'],
                ['tmux new -s <name>', '名前付きセッションを作成'],
                ['tmux ls', '全セッションの一覧を表示'],
                ['tmux attach -t <name>', '指定セッションに再接続'],
                ['tmux kill-session -t <name>', '指定セッションを終了'],
                ['tmux kill-server', '全セッションを終了（tmuxサーバーを停止）'],
                ['tmux rename-session -t <old> <new>', 'セッション名を変更'],
              ]}
            />
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">tmux 内からの操作</h3>
            <CheatTable
              headers={['キー', '説明']}
              rows={[
                ['Prefix + d', 'セッションからデタッチ（バックグラウンドへ）'],
                ['Prefix + $', 'セッション名を変更'],
                ['Prefix + s', 'セッション一覧を表示して切替え'],
                ['Prefix + (', '前のセッションに切替え'],
                ['Prefix + )', '次のセッションに切替え'],
                ['Prefix + L', '最後に使用したセッションに切替え'],
              ]}
            />
          </section>

          {/* ウィンドウ操作 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Layout className="text-emerald-600 dark:text-emerald-400" />
              ウィンドウ操作
            </h2>
            <CheatTable
              headers={['キー', '説明']}
              rows={[
                ['Prefix + c', '新しいウィンドウを作成'],
                ['Prefix + n', '次のウィンドウに切替え'],
                ['Prefix + p', '前のウィンドウに切替え'],
                ['Prefix + 0-9', '番号指定でウィンドウを切替え'],
                ['Prefix + w', 'ウィンドウ一覧を表示して選択'],
                ['Prefix + ,', '現在のウィンドウ名を変更'],
                ['Prefix + &', '現在のウィンドウを閉じる（確認あり）'],
                ['Prefix + l', '最後に使用したウィンドウに切替え'],
                ['Prefix + f', 'ウィンドウをテキスト検索'],
                ['Prefix + .', 'ウィンドウの番号を変更'],
              ]}
            />
          </section>

          {/* ペイン操作 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Columns className="text-emerald-600 dark:text-emerald-400" />
              ペイン操作
            </h2>
            <CheatTable
              headers={['キー', '説明']}
              rows={[
                ['Prefix + %', '左右に分割（垂直分割）'],
                ['Prefix + "', '上下に分割（水平分割）'],
                ['Prefix + o', '次のペインに移動'],
                ['Prefix + ;', '直前のペインに戻る'],
                ['Prefix + 矢印キー', '矢印方向のペインに移動'],
                ['Prefix + q', 'ペイン番号を表示（番号を押して移動）'],
                ['Prefix + x', '現在のペインを閉じる（確認あり）'],
                ['Prefix + z', 'ペインをズーム（全画面切替え）'],
                ['Prefix + {', 'ペインを前方に入替え'],
                ['Prefix + }', 'ペインを後方に入替え'],
                ['Prefix + Space', 'レイアウトを順に切替え'],
                ['Prefix + Ctrl+矢印', 'ペインサイズを調整（1セルずつ）'],
                ['Prefix + Alt+矢印', 'ペインサイズを調整（5セルずつ）'],
                ['Prefix + !', 'ペインを独立したウィンドウに変換'],
              ]}
            />
          </section>

          {/* コピーモード */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Copy className="text-emerald-600 dark:text-emerald-400" />
              コピーモード
            </h2>
            <CheatTable
              headers={['キー', '説明']}
              rows={[
                ['Prefix + [', 'コピーモードに入る'],
                ['q / Escape', 'コピーモードを終了'],
                ['Space', '選択開始（vi モード）'],
                ['Enter', '選択範囲をコピーしてコピーモードを終了'],
                ['Prefix + ]', 'コピーしたテキストを貼り付け'],
                ['↑ ↓ ← →', 'カーソルを移動'],
                ['g', 'バッファの先頭へ移動'],
                ['G', 'バッファの末尾へ移動'],
                ['/ または ?', '前方 / 後方検索'],
                ['n / N', '次の / 前の検索結果へ移動'],
              ]}
            />
            <div className="mt-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">vi モードの有効化:</strong>{' '}
                <code>set -g mode-keys vi</code> を <code>~/.tmux.conf</code> に追加すると、コピーモードで vi 風のキーバインドが使えます。
              </p>
            </div>
          </section>

          {/* tmux.conf 主要設定 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Settings className="text-emerald-600 dark:text-emerald-400" />
              tmux.conf 主要設定
            </h2>
            <CheatTable
              headers={['設定', '説明']}
              rows={[
                ['set -g prefix C-a', 'Prefix キーを Ctrl+A に変更'],
                ['set -g mouse on', 'マウス操作を有効化（クリック、スクロール、リサイズ）'],
                ['set -g base-index 1', 'ウィンドウ番号を 1 から開始'],
                ['setw -g pane-base-index 1', 'ペイン番号を 1 から開始'],
                ['set -g default-terminal "tmux-256color"', '256色対応ターミナルに設定'],
                ['set -g history-limit 10000', 'スクロールバッファの行数を設定'],
                ['set -g escape-time 0', 'Escape キーの遅延をなくす（vi ユーザー向け）'],
                ['set -g renumber-windows on', 'ウィンドウ削除時に番号を自動リナンバリング'],
                ['set -g status-position top', 'ステータスバーを上部に表示'],
                ['setw -g mode-keys vi', 'コピーモードで vi キーバインドを使用'],
              ]}
            />
          </section>

          {/* bind コマンド */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Settings className="text-emerald-600 dark:text-emerald-400" />
              カスタムキーバインド（bind）
            </h2>
            <CheatTable
              headers={['設定例', '説明']}
              rows={[
                ['bind r source-file ~/.tmux.conf', 'Prefix + r で設定を再読込'],
                ['bind | split-window -h', 'Prefix + | で左右分割'],
                ['bind - split-window -v', 'Prefix + - で上下分割'],
                ['bind h select-pane -L', 'Prefix + h で左のペインへ移動'],
                ['bind j select-pane -D', 'Prefix + j で下のペインへ移動'],
                ['bind k select-pane -U', 'Prefix + k で上のペインへ移動'],
                ['bind l select-pane -R', 'Prefix + l で右のペインへ移動'],
                ['bind -r H resize-pane -L 5', 'Prefix + H でペインを左に5セル拡大'],
                ['bind -r J resize-pane -D 5', 'Prefix + J でペインを下に5セル拡大'],
              ]}
            />
            <div className="mt-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">-r フラグ:</strong>{' '}
                Prefix を繰り返し押さずに連続してキーを入力できます（リサイズ操作に便利）。
              </p>
            </div>
          </section>

          {/* tmux コマンドラインモード */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Monitor className="text-emerald-600 dark:text-emerald-400" />
              コマンドラインモード
            </h2>
            <CheatTable
              headers={['キー / コマンド', '説明']}
              rows={[
                ['Prefix + :', 'コマンドラインモードに入る'],
                [':list-keys', '全キーバインドを一覧表示'],
                [':list-sessions', '全セッションを一覧表示'],
                [':show-options -g', 'グローバルオプションを表示'],
                [':display-message', '現在のペイン/ウィンドウ情報を表示'],
                [':swap-window -t <n>', '現在のウィンドウを指定番号と入替え'],
                [':move-pane -t <session>:<window>', 'ペインを別セッション/ウィンドウに移動'],
              ]}
            />
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="tmux のよく使う操作を復習しよう"
            description="tmux でセッション管理、ウィンドウ操作、ペイン操作の主要コマンドを書いてください。シェルコマンドとプリフィックスキー操作の両方を含めましょう。"
            initialCode={`# tmux 主要操作の復習\n\n# セッション操作\n# 名前付きセッション作成:\n# セッション一覧:\n# セッション再接続:\n\n# ウィンドウ操作（Prefix +）\n# 新規作成:\n# 次へ移動:\n# 名前変更:\n\n# ペイン操作（Prefix +）\n# 左右分割:\n# 上下分割:\n# ズーム切替:`}
            answer={`# tmux 主要操作の復習\n\n# セッション操作\n# 名前付きセッション作成:\ntmux new -s dev\n# セッション一覧:\ntmux ls\n# セッション再接続:\ntmux attach -t dev\n\n# ウィンドウ操作（Prefix +）\n# 新規作成: Ctrl+B C\n# 次へ移動: Ctrl+B N\n# 名前変更: Ctrl+B ,\n\n# ペイン操作（Prefix +）\n# 左右分割: Ctrl+B %\n# 上下分割: Ctrl+B "\n# ズーム切替: Ctrl+B Z`}
            hints={[
              'tmux new -s は new-session -s の省略形です',
              'tmux ls は list-sessions の省略形です',
              'Ctrl+B Z でペインのズーム（全画面）を切り替えられます',
            ]}
            keywords={['tmux new', 'tmux ls', 'attach', 'Ctrl+B']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
