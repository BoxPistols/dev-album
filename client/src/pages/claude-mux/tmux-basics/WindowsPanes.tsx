import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';

export default function WindowsPanes() {
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
            ウィンドウとペインの操作
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            画面を自由自在に分割・整理して、マルチタスク環境を構築します。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ウィンドウ操作 (Tabs)
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              iTerm2の「タブ」に相当します。全画面を切り替えて使いたい場合に便利です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">作成</span>
                  <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm font-mono">Prefix + c</code>
                </div>
                <p className="text-sm text-muted-foreground">新しいウィンドウを開きます。</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">名前変更</span>
                  <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm font-mono">Prefix + ,</code>
                </div>
                <p className="text-sm text-muted-foreground">ウィンドウの名前を変更します。</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">次のウィンドウ</span>
                  <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm font-mono">Prefix + n</code>
                </div>
                <p className="text-sm text-muted-foreground">番号順に次のウィンドウへ移動。</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">前のウィンドウ</span>
                  <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm font-mono">Prefix + p</code>
                </div>
                <p className="text-sm text-muted-foreground">番号順に前のウィンドウへ移動。</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">番号指定ジャンプ</span>
                  <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm font-mono">Prefix + 0..9</code>
                </div>
                <p className="text-sm text-muted-foreground">指定した番号のウィンドウに直接移動します。</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ペイン操作 (Splits)
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              1つの画面を分割して使います。ログを見ながらコマンドを打つ時などに最適です。
            </p>

            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-foreground mb-4">画面分割</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                    <div className="w-16 h-12 border-2 border-slate-300 dark:border-slate-700 rounded mb-2 flex">
                      <div className="w-1/2 border-r-2 border-slate-300 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-950/20"></div>
                      <div className="w-1/2 bg-slate-50 dark:bg-slate-900"></div>
                    </div>
                    <span className="font-bold text-foreground">左右分割</span>
                    <code className="text-sm text-emerald-600 mt-1">Prefix + %</code>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                    <div className="w-16 h-12 border-2 border-slate-300 dark:border-slate-700 rounded mb-2 flex flex-col">
                      <div className="h-1/2 border-b-2 border-slate-300 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-950/20"></div>
                      <div className="h-1/2 bg-slate-50 dark:bg-slate-900"></div>
                    </div>
                    <span className="font-bold text-foreground">上下分割</span>
                    <code className="text-sm text-emerald-600 mt-1">Prefix + "</code>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-foreground mb-4">移動と調整</h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <span className="text-foreground">ペイン間の移動</span>
                    <code className="px-2 py-1 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm font-mono">Prefix + 矢印キー</code>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <span className="text-foreground">ペインのズーム（最大化/戻す）</span>
                    <code className="px-2 py-1 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm font-mono">Prefix + z</code>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <span className="text-foreground">ペインを閉じる</span>
                    <code className="px-2 py-1 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm font-mono">Ctrl + d (または exit)</code>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-foreground">ペイン番号の表示</span>
                    <code className="px-2 py-1 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm font-mono">Prefix + q</code>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              AIコーディング実践配置
            </h2>

            <InfoBox type="info" title="推奨レイアウト">
              <p className="mb-2">AIコーディングを行う際の個人的なおすすめレイアウトです。</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>まず <code>Prefix + %</code> で左右に分割</li>
                <li>右側のペインで <code>Prefix + "</code> で上下に分割</li>
                <li><strong>左側 (大):</strong> Claude Code CLI / エディタ</li>
                <li><strong>右上 (小):</strong> サーバーログ / 監視</li>
                <li><strong>右下 (小):</strong> コマンド実行 / テスト</li>
              </ol>
            </InfoBox>
          </section>

          <section>
             <h2 className="text-3xl font-bold text-foreground mb-6">
              まとめ
            </h2>
            <p className="text-foreground mb-8 leading-relaxed">
              これでtmuxの基本的な操作はの基本操作を確認しました。ウィンドウで作業コンテキストを分け、ペインで情報を一覧化することで、作業効率は大幅に向上します。
            </p>
          </section>
        </div>

        <CodingChallenge
          preview
          previewType="terminal"
          title="ウィンドウとペインのコマンドを書いてみよう"
          description="tmux コマンドラインから、ウィンドウの作成・名前変更、ペインの分割を行うコマンドを書いてください。"
          initialCode={`# ウィンドウとペインの操作コマンド\n# 1. "editor" という名前の新しいウィンドウを作成\n\n# 2. 現在のペインを左右に分割\n\n# 3. 現在のペインを上下に分割\n`}
          answer={`# ウィンドウとペインの操作コマンド\n# 1. "editor" という名前の新しいウィンドウを作成\ntmux new-window -n editor\n\n# 2. 現在のペインを左右に分割\ntmux split-window -h\n\n# 3. 現在のペインを上下に分割\ntmux split-window -v`}
          keywords={['new-window', 'split-window -h', 'split-window -v']}
          hints={[
            'tmux new-window -n <名前> で名前付きウィンドウを作成します',
            'split-window に -h（水平=左右）または -v（垂直=上下）を指定します',
          ]}
        />

        <PageNavigation />
      </div>
    </div>
  );
}
