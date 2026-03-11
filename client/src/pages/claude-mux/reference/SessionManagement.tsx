import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function SessionManagement() {
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
            セッション管理の最適化
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            PCを再起動しても作業環境を維持するための「永続化」テクニック。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              tmuxの弱点：再起動
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              tmuxは非常に堅牢ですが、PC自体を再起動するとすべてのセッションが消えてしまいます。これを解決するのが <strong>tmux-resurrect</strong> プラグインです。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              tmux-resurrect の導入
            </h2>
            
            <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                設定の追加
              </h3>
              <p className="text-muted-foreground mb-2">
                TPM（STEP 13で導入済み）を使っていれば簡単です。<code>~/.tmux.conf</code> に以下を追加します。
              </p>
              <CodeBlock
                code={`set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'

# 自動復元を有効にする（オプション）
set -g @continuum-restore 'on'`}
                language="bash"
              />
              <p className="mt-4 text-sm text-muted-foreground">
                追加後、<code>Prefix + I</code> でインストールします。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              使い方：保存と復元
            </h2>
            <p className="text-foreground mb-4">
              インストールしたら、以下のショートカットで環境を保存・復元できます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                <h3 className="text-xl font-semibold text-foreground mb-2">環境を保存する</h3>
                <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 font-mono mb-2">Prefix + Ctrl-s</div>
                <p className="text-emerald-800 dark:text-emerald-300">
                  現在のすべてのセッション、ウィンドウ、ペインの配置、実行中のプログラム（一部）を保存します。"Tmux environment saved!" と表示されます。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                <h3 className="text-xl font-semibold text-foreground mb-2">環境を復元する</h3>
                <div className="text-3xl font-bold text-blue-700 font-mono mb-2">Prefix + Ctrl-r</div>
                <p className="text-blue-800">
                  保存された状態を復元します。PC再起動後、tmuxを起動してから実行します。"Tmux environment restored!" と表示されます。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              tmux-continuum による完全自動化
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              手動での保存を忘れてしまうことが心配ですか？ <code>tmux-continuum</code> を使えば、バックグラウンドで15分ごとに自動保存してくれます。
            </p>
            <InfoBox type="success" title="自動化のメリット">
              PCが突然クラッシュしても、最大15分前の状態には戻れます。また、<code>@continuum-restore 'on'</code> を設定しておけば、tmux起動時に前回の状態が自動的に復元されます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              次のステップ
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              いよいよ最後です。困ったときのトラブルシューティングと、学習のまとめを行います。
            </p>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="セッション永続化の設定を書こう"
            description="tmux-resurrect と tmux-continuum をセットアップする tmux.conf の設定を書いてください。自動保存と自動復元を有効にしましょう。"
            initialCode={`# ~/.tmux.conf セッション永続化設定\n\n# 1. tmux-resurrect プラグインを追加\n\n# 2. tmux-continuum プラグインを追加\n\n# 3. 自動復元を有効にする`}
            answer={`# ~/.tmux.conf セッション永続化設定\n\n# 1. tmux-resurrect プラグインを追加\nset -g @plugin 'tmux-plugins/tmux-resurrect'\n\n# 2. tmux-continuum プラグインを追加\nset -g @plugin 'tmux-plugins/tmux-continuum'\n\n# 3. 自動復元を有効にする\nset -g @continuum-restore 'on'`}
            hints={[
              'TPM のプラグイン登録は set -g @plugin で行います',
              'tmux-continuum は 15分ごとに自動保存してくれます',
              'Prefix + Ctrl-s で手動保存、Prefix + Ctrl-r で手動復元です',
            ]}
            keywords={['tmux-resurrect', 'tmux-continuum', '@continuum-restore', '@plugin']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
