import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function ProductivityConfig() {
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
            生産性向上の設定
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            より直感的で高速な操作を実現するためのキーバインディングを追加します。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              キーバインドの変更方法
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              <code>bind</code> コマンドを使って、キーの割り当てを変更できます。デフォルトの使いにくいキーを、覚えやすいキーに変更しましょう。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              必須カスタマイズ3選
            </h2>

            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  1. プリフィックスキーの変更（オプション）
                </h3>
                <p className="text-muted-foreground mb-2">
                  Ctrl+B は指が届きにくい場合があります。Caps LockをCtrlに変更しているユーザーには <strong>Ctrl+A</strong> が人気です。
                </p>
                <CodeBlock
                  code={`# PrefixをCtrl+aに変更
set -g prefix C-a
unbind C-b
bind C-a send-prefix`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  2. 画面分割を直感的にする
                </h3>
                <p className="text-muted-foreground mb-2">
                  デフォルトの <code>%</code> と <code>"</code> は覚えにくいです。パイプ <code>|</code> で左右、ハイフン <code>-</code> で上下に分割するように変更します。
                </p>
                <CodeBlock
                  code={`# | でペインを縦に分割する
bind | split-window -h

# - でペインを横に分割する
bind - split-window -v`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  3. 設定ファイルの再読み込みを簡単にする
                </h3>
                <p className="text-muted-foreground mb-2">
                  設定を変更するたびにコマンドを打つのは面倒です。<code>Prefix + r</code> で再読み込みできるようにします。
                </p>
                <CodeBlock
                  code={`# 設定ファイルをリロードする
bind r source-file ~/.tmux.conf \\; display "Reloaded!"`}
                  language="bash"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Vimユーザー向け設定
            </h2>
            <p className="text-foreground mb-4">
              Vimを使用するエンジニアやエンジニアには、ペイン移動もVimライクにすることをお勧めします。
            </p>
            <CodeBlock
              code={`# Vimのキーバインドでペインを移動する
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R`}
              language="bash"
            />
          </section>

          <section>
             <h2 className="text-3xl font-bold text-foreground mb-6">
              まとめ
            </h2>
            <p className="text-foreground mb-4">
              ここまでの設定を追加した <code>~/.tmux.conf</code> の例です。
            </p>
            <CodeBlock
              code={`# ---------------------------
# 基本設定
# ---------------------------
set -g mouse on
set -g base-index 1
setw -g pane-base-index 1
set -g default-terminal "screen-256color"

# ---------------------------
# キーバインド
# ---------------------------
# | でペインを縦に分割する
bind | split-window -h
# - でペインを横に分割する
bind - split-window -v

# Vimのキーバインドでペインを移動する
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# 設定ファイルをリロードする
bind r source-file ~/.tmux.conf \\; display "Reloaded!"`}
              language="bash"
            />
            <InfoBox type="success" title="完了">
              このファイルを保存し、<code>tmux source ~/.tmux.conf</code> を実行（または tmux を再起動）すれば、新しいショートカットが使えるようになります。
            </InfoBox>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="tmux.conf のキーバインドを設定しよう"
            description="~/.tmux.conf に追加する生産性向上のキーバインド設定を書いてください。ペイン分割の直感的なキーと設定リロードを含めましょう。"
            initialCode={`# ~/.tmux.conf キーバインド設定\n\n# 1. | で左右にペイン分割\n\n# 2. - で上下にペイン分割\n\n# 3. Vim風のペイン移動 (h/j/k/l)\n\n# 4. Prefix + r で設定リロード`}
            answer={`# ~/.tmux.conf キーバインド設定\n\n# 1. | で左右にペイン分割\nbind | split-window -h\n\n# 2. - で上下にペイン分割\nbind - split-window -v\n\n# 3. Vim風のペイン移動 (h/j/k/l)\nbind h select-pane -L\nbind j select-pane -D\nbind k select-pane -U\nbind l select-pane -R\n\n# 4. Prefix + r で設定リロード\nbind r source-file ~/.tmux.conf \\; display "Reloaded!"`}
            hints={[
              'bind コマンドでキーバインドを設定します',
              'split-window -h は水平方向（左右）、-v は垂直方向（上下）の分割です',
              'select-pane -L/-D/-U/-R でペイン移動の方向を指定します',
            ]}
            keywords={['bind', 'split-window', 'select-pane', 'source-file']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
