import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function TmuxConfig() {
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
            tmux.confの基本
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            設定ファイルを作成して、tmuxを自分の好みにカスタマイズする第一歩を踏み出しましょう。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              設定ファイルの場所
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              tmuxの設定はホームディレクトリ直下の <code>.tmux.conf</code> というファイルに記述します。デフォルトではこのファイルは存在しないため、自分で作成する必要があります。
            </p>
            <CodeBlock
              code={`# 設定ファイルの作成（または開く）
$ touch ~/.tmux.conf
$ nano ~/.tmux.conf`}
              language="bash"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              まず設定すべき3つの基本
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              まずは以下の3つの設定を追加することをお勧めします。これだけで使い勝手が大幅に向上します。
            </p>

            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-xl font-semibold text-foreground mb-3">1. マウス操作を有効にする</h3>
                <p className="text-muted-foreground mb-2">
                  ペインのサイズ調整やスクロール、ウィンドウ切り替えをマウスで行えるようになります。初心者に必須の設定です。
                </p>
                <CodeBlock
                  code={`set -g mouse on`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-xl font-semibold text-foreground mb-3">2. インデックスを1から始める</h3>
                <p className="text-muted-foreground mb-2">
                  デフォルトではウィンドウ番号は0から始まりますが、キーボードの数字キーの並び（1が左端）に合わせて1から始める方が直感的です。
                </p>
                <CodeBlock
                  code={`set -g base-index 1
setw -g pane-base-index 1`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-xl font-semibold text-foreground mb-3">3. 256色表示を有効にする</h3>
                <p className="text-muted-foreground mb-2">
                  ターミナルの色が正しく表示されるようにします。Vimなどで色が崩れるのを防ぎます。
                </p>
                <CodeBlock
                  code={`set -g default-terminal "screen-256color"`}
                  language="bash"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              設定の反映
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              ファイルを保存しただけでは設定は反映されません。以下のコマンドを実行して設定を再読み込みするか、tmuxを一度終了して再起動する必要があります。
            </p>
            
            <InfoBox type="warning" title="注意">
              tmuxセッション内で実行してください。
            </InfoBox>

            <CodeBlock
              code={`# 設定ファイルの再読み込み
$ tmux source ~/.tmux.conf`}
              language="bash"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              まとめ: 最初の.tmux.conf
            </h2>
            <p className="text-foreground mb-4">
              ここまでの内容をまとめたファイルです。これをコピーして <code>~/.tmux.conf</code> に貼り付けてください。
            </p>
            <CodeBlock
              code={`# マウス操作を有効にする
set -g mouse on

# インデックスを1から始める
set -g base-index 1
setw -g pane-base-index 1

# 256色端末を使用する
set -g default-terminal "screen-256color"`}
              language="bash"
            />
          </section>

          <CodingChallenge
            preview
            previewType="terminal"
            title="tmux.conf を書いてみよう"
            description="プリフィックスキーを Ctrl+a に変更し、マウス操作を有効にし、ウィンドウ番号を1から始める設定を書いてください。"
            initialCode={`# tmux.conf を完成させてください\n\n# プリフィックスキーを Ctrl+a に変更\n\n# マウス操作を有効にする\n\n# ウィンドウ番号を1から始める`}
            answer={`# プリフィックスキーを Ctrl+a に変更\nunbind C-b\nset -g prefix C-a\nbind C-a send-prefix\n\n# マウス操作を有効にする\nset -g mouse on\n\n# ウィンドウ番号を1から始める\nset -g base-index 1\nsetw -g pane-base-index 1`}
            hints={[
              'プリフィックスキーの変更には unbind と set -g prefix を使います',
              'マウス有効化は set -g mouse on です',
              'ウィンドウ番号は base-index、ペイン番号は pane-base-index で設定します',
            ]}
            keywords={['prefix', 'C-a', 'mouse on', 'base-index 1']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
