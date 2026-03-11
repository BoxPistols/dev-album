import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function FirstSession() {
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
            最初のセッション作成
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            実際にセッションを作成して、tmuxの基本操作を学びます。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              セッション作成の基本
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              tmuxでセッションを作成する最も簡単な方法を紹介します。
            </p>

            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  方法1: 名前を指定してセッション作成
                </h3>
                <CodeBlock
                  code={`$ tmux new-session -s myproject
# または短縮形
$ tmux new -s myproject`}
                  language="bash"
                />
                <p className="text-foreground mt-4">
                  "myproject" という名前のセッションが作成され、すぐに接続されます。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  方法2: 名前なしでセッション作成
                </h3>
                <CodeBlock
                  code={`$ tmux new-session
# または短縮形
$ tmux new

# 結果: 0, 1, 2... という番号が自動割り当てされます`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  方法3: セッション作成と同時にコマンド実行
                </h3>
                <CodeBlock
                  code={`$ tmux new-session -s work -c ~/projects/myapp
# セッションが作成され、~/projects/myapp ディレクトリで開始されます`}
                  language="bash"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              セッション内での操作
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              セッション内で使用する基本的なコマンドを紹介します。
            </p>

            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  セッションから抜ける
                </h3>
                <CodeBlock
                  code={`# キーボードショートカット
Ctrl+B D

# または exit コマンド
$ exit`}
                  language="bash"
                />
                <p className="text-foreground mt-4">
                  Ctrl+B D を使用すると、セッションは実行されたまま、ターミナルに戻ります。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  セッション一覧を確認
                </h3>
                <CodeBlock
                  code={`$ tmux list-sessions
# または短縮形
$ tmux ls

# 出力例:
# myproject: 1 windows (created Fri Feb 21 12:00:00 2026)
# work: 1 windows (created Fri Feb 21 12:05:00 2026)`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  セッションに再接続
                </h3>
                <CodeBlock
                  code={`$ tmux attach-session -t myproject
# または短縮形
$ tmux a -t myproject
$ tmux attach -t myproject`}
                  language="bash"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              実践例: AIコーディングセッション
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              AIコーディングに最適化されたセッション設定の例を紹介します。
            </p>

            <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                セッション作成例
              </h3>
              <CodeBlock
                code={`# プロジェクトディレクトリでセッション作成
$ cd ~/projects/my-ai-project
$ tmux new-session -s dev -c .

# セッション内で複数のウィンドウを作成
Ctrl+B C  # 新しいウィンドウ作成
Ctrl+B C  # さらに新しいウィンドウ作成

# ウィンドウ1: エディタ（Claude Code CLI）
$ claude-code

# ウィンドウ2: テスト実行
$ npm test

# ウィンドウ3: ドキュメント参照
$ python -m http.server 8000`}
                language="bash"
              />
            </div>

            <InfoBox type="success" title="セッション作成完了">
              セッションが作成できたら、次のページでウィンドウとペインの操作を学びます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              トラブルシューティング
            </h2>

            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  問題: セッションが作成されない
                </h3>
                <CodeBlock
                  code={`# tmuxが正しくインストールされているか確認
$ which tmux
$ tmux -V

# tmuxサーバーを再起動
$ tmux kill-server
$ tmux new-session -s test`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  問題: セッション名が重複している
                </h3>
                <CodeBlock
                  code={`# 既存のセッションを確認
$ tmux ls

# 同じ名前のセッションを削除
$ tmux kill-session -t myproject

# 新しいセッションを作成
$ tmux new-session -s myproject`}
                  language="bash"
                />
              </div>
            </div>
          </section>
        </div>

        <CodingChallenge
          preview
          previewType="terminal"
          title="tmux セッション管理コマンドを書いてみよう"
          description="新しいセッション作成、一覧表示、アタッチの基本コマンドを書いてください。"
          initialCode={`# セッション管理の基本コマンド\n# 1. 新しいセッションを "dev" という名前で作成\n\n# 2. セッション一覧を表示\n\n# 3. "dev" セッションにアタッチ\n`}
          answer={`# セッション管理の基本コマンド\n# 1. 新しいセッションを "dev" という名前で作成\ntmux new-session -s dev\n\n# 2. セッション一覧を表示\ntmux list-sessions\n\n# 3. "dev" セッションにアタッチ\ntmux attach -t dev`}
          keywords={['new-session', 'list-sessions', 'attach -t']}
          hints={['tmux new-session -s <名前> で名前付きセッション作成', 'tmux list-sessions で一覧、tmux attach -t <名前> でアタッチ']}
        />

        <PageNavigation />
      </div>
    </div>
  );
}
