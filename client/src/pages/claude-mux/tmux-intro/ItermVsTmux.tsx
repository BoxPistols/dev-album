import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function ItermVsTmux() {
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
            iTerm2との違い
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Macユーザーが理解すべき根本的な違いを明確にします。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              根本的な違い
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              iTerm2とtmuxは、一見すると似たように見えますが、基本的な機能を提供する層が大きく異なります。
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/50 border-b border-slate-300 dark:border-slate-700">
                    <th className="p-3 text-left font-semibold text-foreground">比較項目</th>
                    <th className="p-3 text-left font-semibold text-foreground">iTerm2</th>
                    <th className="p-3 text-left font-semibold text-foreground">tmux</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <td className="p-3 font-semibold text-foreground">種類</td>
                    <td className="p-3 text-muted-foreground">ターミナルエミュレータ</td>
                    <td className="p-3 text-muted-foreground">ターミナルマルチプレクサー</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <td className="p-3 font-semibold text-foreground">動作位置</td>
                    <td className="p-3 text-muted-foreground">MacのGUIアプリとして動作</td>
                    <td className="p-3 text-muted-foreground">シェル内でサーバーとして動作</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <td className="p-3 font-semibold text-foreground">SSH接続時</td>
                    <td className="p-3 text-muted-foreground">接続切断で作業終了</td>
                    <td className="p-3 text-muted-foreground">接続切断後もセッション継続</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <td className="p-3 font-semibold text-foreground">設定方法</td>
                    <td className="p-3 text-muted-foreground">GUI設定 + plist</td>
                    <td className="p-3 text-muted-foreground">tmux.conf（テキストファイル）</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <td className="p-3 font-semibold text-foreground">クロスプラットフォーム</td>
                    <td className="p-3 text-muted-foreground">Macのみ</td>
                    <td className="p-3 text-muted-foreground">Mac/Windows/Linux</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              主要な違いの詳細解説
            </h2>

            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  1. ターミナルエミュレータ vs マルチプレクサー
                </h3>
                <p className="text-foreground mb-4 leading-relaxed">
                  <strong>iTerm2</strong>は、Macのターミナルをより使いやすくするためのアプリケーションです。ウィンドウを分割したり、タブを作成したりできますが、これらはすべてMacのアプリ内で管理されます。
                </p>
                <p className="text-foreground leading-relaxed">
                  <strong>tmux</strong>は、ターミナルエミュレータ（iTerm2など）の中で動作する独立したプログラムであり、バックグラウンドでサーバーとして動作します。これにより、ターミナルアプリを閉じてもtmuxのセッションは生き続けます。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  2. SSH接続時の最大の違い
                </h3>
                <p className="text-foreground mb-4 leading-relaxed">
                  <strong>iTerm2での問題</strong>: リモートサーバーへSSH接続している際にWi-Fiが切れたりPCをスリープさせたりすると、接続が切れ、実行中の処理も強制終了してしまいます。
                </p>
                <CodeBlock
                  code={`# iTerm2: SSH接続を切ると、すべてが終了
$ ssh user@remote-server
# ...作業中...
# (接続が切れると、作業内容は失われます)`}
                  language="bash"
                />
                <p className="text-foreground mt-4 mb-4 leading-relaxed">
                  <strong>tmuxでの解決</strong>: tmuxセッション内で作業していれば、SSH接続が切れてもセッションはサーバー上で生き続けます。再接続後に「アタッチ」することで、作業をそのまま再開できます。
                </p>
                <CodeBlock
                  code={`# tmux: セッション内でSSH接続
$ tmux new-session -s work
# ...作業中...
# (接続が切れても、サーバー上でtmuxは動いている)

# 再接続後
$ tmux attach -t work  # 作業状態を完全に復元`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  3. 設定の柔軟性
                </h3>
                <p className="text-foreground mb-4 leading-relaxed">
                  <strong>iTerm2</strong>は、GUIを使って設定を行います。直感的ですが、設定の共有やバージョン管理は難しい場合があります。
                </p>
                <p className="text-foreground mb-4 leading-relaxed">
                  <strong>tmux</strong>は、<code>.tmux.conf</code>というテキストファイルですべてを設定します。これはGitで管理でき、チームメンバーと設定を共有したり、新しいマシンへ環境を移行したりすることが非常に簡単です。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              なぜエンジニアがtmuxを学ぶべきか
            </h2>

            <InfoBox type="info" title="環境の一貫性">
              エンジニアが開発に関わる際、個人のMacだけでなく、共有の開発サーバーやCI環境など、様々な環境で作業することがあります。tmuxを使えば、どの環境でも同じ操作感と生産性を維持できます。
            </InfoBox>

            <p className="text-foreground mt-8 leading-relaxed">
              次のページでは、環境準備を始め、tmuxを実際にインストールします。
            </p>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="SSH 切断後のセッション復帰を練習しよう"
            description="リモートサーバーで tmux セッションを作成し、SSH 接続が切れた後に再接続する手順を書いてください。"
            initialCode={`# SSH + tmux のワークフロー\n\n# 1. リモートサーバーに SSH 接続\n\n# 2. tmux セッションを作成して作業開始\n\n# 3. (接続が切れた後) 再度 SSH 接続\n\n# 4. tmux セッションに再アタッチ`}
            answer={`# SSH + tmux のワークフロー\n\n# 1. リモートサーバーに SSH 接続\nssh user@remote-server\n\n# 2. tmux セッションを作成して作業開始\ntmux new-session -s work\n\n# 3. (接続が切れた後) 再度 SSH 接続\nssh user@remote-server\n\n# 4. tmux セッションに再アタッチ\ntmux attach -t work`}
            hints={[
              'tmux セッション内で作業すれば、SSH 切断後もプロセスが継続します',
              'attach -t でセッション名を指定して再接続します',
              'tmux ls で既存のセッションを確認できます',
            ]}
            keywords={['ssh', 'new-session', 'attach', 'tmux']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
