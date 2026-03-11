import { useLocation } from 'wouter';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function Troubleshooting() {
  const [, navigate] = useLocation();
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
            トラブルシューティング
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            よくある問題とその解決策、そしてこれからの学習リソース。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              よくある問題 (FAQ)
            </h2>

            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
                <h3 className="text-lg font-semibold text-foreground mb-2">Q. Vimの色がおかしい（白黒になる）</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>A.</strong> ターミナルタイプの設定が正しくありません。<code>~/.tmux.conf</code> に以下が記述されているか確認してください。
                </p>
                <CodeBlock
                  code={`set -g default-terminal "screen-256color"`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
                <h3 className="text-lg font-semibold text-foreground mb-2">Q. マウスでスクロールできない</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>A.</strong> マウスモードが無効になっている可能性があります。また、コピーモードに入る必要がある場合もあります。
                </p>
                <CodeBlock
                  code={`# 設定ファイルに追加
set -g mouse on`}
                  language="bash"
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  または、<code>Prefix + [</code> でコピーモードに入ると、矢印キーやマウスでスクロールできるようになります。終了するには <code>q</code> を押します。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
                <h3 className="text-lg font-semibold text-foreground mb-2">Q. tmuxがフリーズして動かない</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>A.</strong> 特定のペインだけ固まった場合は <code>Ctrl+C</code> を試してください。tmux全体がおかしい場合は、別のターミナルタブを開いて、強制終了できます。
                </p>
                <CodeBlock
                  code={`# 全てのtmuxプロセスを終了する（注意：作業内容は消えます）
$ tmux kill-server`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
                <h3 className="text-lg font-semibold text-foreground mb-2">Q. プレフィックスキーが効かない</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>A.</strong> Caps Lockなどが干渉しているか、設定ファイルの記述ミスが考えられます。設定をリロードしても直らない場合は、一度tmuxを完全に終了（<code>exit</code> または <code>tmux kill-server</code>）して再起動してください。
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">
                マニュアル完走、おめでとうございます！
              </h2>
              <p className="text-lg text-emerald-800 dark:text-emerald-300 mb-8 max-w-2xl mx-auto">
                これであなたはtmuxの基本から応用、そしてAIコーディングとの連携までを習得しました。ここから先は、実際に日々の開発で使い倒し、自分だけの最強の環境を作り上げていってください。
              </p>
              
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => navigate('/claude-mux')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg"
                >
                  トップページに戻る
                </Button>
              </div>
            </div>
          </section>

          <CodingChallenge
            preview
            previewType="terminal"
            title="tmux のトラブルシューティングを練習しよう"
            description="よくある tmux の問題に対する解決コマンドを書いてください。色の問題、マウス有効化、tmux のリセットを含めましょう。"
            initialCode={`# tmux トラブルシューティング\n\n# 1. 256色対応の設定\n\n# 2. マウスモードを有効化\n\n# 3. tmux サーバーを強制終了\n\n# 4. 設定ファイルをリロード`}
            answer={`# tmux トラブルシューティング\n\n# 1. 256色対応の設定（~/.tmux.conf に追加）\nset -g default-terminal "screen-256color"\n\n# 2. マウスモードを有効化（~/.tmux.conf に追加）\nset -g mouse on\n\n# 3. tmux サーバーを強制終了（全セッション消去）\ntmux kill-server\n\n# 4. 設定ファイルをリロード\ntmux source ~/.tmux.conf`}
            hints={[
              '色の問題は default-terminal の設定で解決することが多いです',
              'mouse on でクリック、スクロール、ペインリサイズが有効になります',
              'kill-server は最終手段です。全セッションが終了します',
            ]}
            keywords={['default-terminal', 'mouse on', 'kill-server', 'source']}
          />

          <section className="text-center text-muted-foreground text-sm pb-8">
            <p>
              tmux Manual for Designers v1.0.0
            </p>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
