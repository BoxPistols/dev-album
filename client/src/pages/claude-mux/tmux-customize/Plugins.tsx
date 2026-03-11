import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function Plugins() {
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
            プラグイン導入
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Tmux Plugin Manager (TPM) を使って、機能を拡張しましょう。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              TPM (Tmux Plugin Manager) とは
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              tmuxのプラグインを簡単に管理するためのツールです。これを入れるだけで、テーマの変更やセッション保存などの高度な機能が簡単に使えるようになります。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              導入ステップ
            </h2>

            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  1. TPMのインストール
                </h3>
                <p className="text-muted-foreground mb-2">
                  GitHubからTPMをクローンしてきます。
                </p>
                <CodeBlock
                  code={`$ git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  2. tmux.confへの記述
                </h3>
                <p className="text-muted-foreground mb-2">
                  <code>~/.tmux.conf</code> の一番下に以下の行を追加します。
                </p>
                <CodeBlock
                  code={`# プラグインのリスト
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'

# TPMの初期化（必ずファイルの最後に記述！）
run '~/.tmux/plugins/tpm/tpm'`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  3. 設定の反映とインストール
                </h3>
                <p className="text-muted-foreground mb-2">
                  以下の手順でプラグインを有効化します。
                </p>
                <ol className="list-decimal list-inside space-y-2 mt-2 text-foreground">
                  <li>tmuxを起動（または設定を再読み込み <code>tmux source ~/.tmux.conf</code>）</li>
                  <li><strong>Prefix + I</strong> (大文字のアイ) を押す</li>
                  <li>"TMUX environment reloaded." と表示されれば完了です</li>
                </ol>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              おすすめプラグイン: Dracula テーマ
            </h2>
            <p className="text-foreground mb-4">
              見た目を一瞬でかっこよくするテーマプラグインを導入してみましょう。
            </p>
            
            <div className="p-6 rounded-lg border border-purple-200 bg-purple-50 dark:bg-purple-950/20">
              <h3 className="text-xl font-semibold text-foreground mb-3">設定方法</h3>
              <p className="text-muted-foreground mb-2">
                <code>~/.tmux.conf</code> のプラグインリストに以下を追加します。
              </p>
              <CodeBlock
                code={`set -g @plugin 'dracula/tmux'

# オプション設定（日付、時間、天気を表示など）
set -g @dracula-plugins "battery cpu-usage ram-usage time"
set -g @dracula-show-powerline true
set -g @dracula-show-flags true
set -g @dracula-show-left-icon session`}
                language="bash"
              />
              <p className="mt-4 text-sm text-purple-900">
                追加後、再び <strong>Prefix + I</strong> を押してインストールすれば、ステータスバーが劇的に変化します。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              次のステップ
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              これでtmuxの環境構築は完了です。いよいよ、AIコーディングツール「Claude Code」との実践的な連携方法を学びます。
            </p>
            <InfoBox type="success" title="準備完了">
              快適なtmux環境が整いました。次のセクションへ進みましょう。
            </InfoBox>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="TPM プラグイン設定を書こう"
            description="~/.tmux.conf に TPM（Tmux Plugin Manager）とプラグインの設定を書いてください。TPM 本体、tmux-sensible、Dracula テーマを含めましょう。"
            initialCode={`# ~/.tmux.conf プラグイン設定\n\n# プラグインリスト\n# TPM 本体\n\n# tmux-sensible（推奨設定セット）\n\n# Dracula テーマ\n\n# TPM の初期化（ファイルの最後に記述）`}
            answer={`# ~/.tmux.conf プラグイン設定\n\n# プラグインリスト\n# TPM 本体\nset -g @plugin 'tmux-plugins/tpm'\n\n# tmux-sensible（推奨設定セット）\nset -g @plugin 'tmux-plugins/tmux-sensible'\n\n# Dracula テーマ\nset -g @plugin 'dracula/tmux'\nset -g @dracula-plugins "battery cpu-usage ram-usage time"\n\n# TPM の初期化（ファイルの最後に記述）\nrun '~/.tmux/plugins/tpm/tpm'`}
            hints={[
              'set -g @plugin でプラグインを登録します',
              'Dracula テーマは dracula/tmux として指定します',
              'TPM の初期化行は必ずファイルの最後に置いてください',
            ]}
            keywords={['@plugin', 'tpm', 'dracula', 'run']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
