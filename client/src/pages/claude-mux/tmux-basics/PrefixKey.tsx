import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function PrefixKey() {
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
            プリフィックスキーの理解
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            tmux操作の要となる「魔法の鍵」を使いこなしましょう。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              プリフィックスキーとは？
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              tmuxのコマンドを実行するために最初に押す特別なキーの組み合わせです。デフォルトでは <strong>Control + B</strong> に設定されています。
            </p>

            <div className="p-6 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                操作のリズム
              </h3>
              <div className="flex items-center gap-4 text-lg">
                <div className="px-4 py-2 bg-white dark:bg-slate-900 rounded shadow-sm border border-emerald-200 dark:border-emerald-900 font-mono">Control</div>
                <span className="text-muted-foreground">+</span>
                <div className="px-4 py-2 bg-white dark:bg-slate-900 rounded shadow-sm border border-emerald-200 dark:border-emerald-900 font-mono">B</div>
                <span className="text-muted-foreground">→</span>
                <span className="text-muted-foreground text-sm">（指を離す）</span>
                <span className="text-muted-foreground">→</span>
                <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded shadow-sm border border-slate-300 dark:border-slate-700 font-mono">コマンドキー</div>
              </div>
              <p className="mt-4 text-emerald-800 dark:text-emerald-300">
                「CtrlとBを同時に押す」→「両方の指を離す」→「実行したいコマンドのキーを押す」という3ステップです。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              なぜ必要なのか？
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="font-semibold text-foreground mb-2">コマンドの衝突を防ぐ</h3>
                <p className="text-muted-foreground">
                  ターミナル上で動作する他のアプリケーション（vim, nano, sshなど）もショートカットキーを使用します。tmuxがこれらを奪ってしまわないように、明示的に「これからtmuxの命令を送るぞ」と宣言する必要があります。
                </p>
              </div>
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="font-semibold text-foreground mb-2">誤操作の防止</h3>
                <p className="text-muted-foreground">
                  ウィンドウを閉じたり、ペインを破棄したりする強力な操作を、誤って実行してしまうのを防ぎます。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              よく使う組み合わせ
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              まずはこれだけ覚えればOKです。
            </p>

            <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">コマンドキー</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">動作</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">覚え方</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-4 py-3 font-mono font-bold text-emerald-600">c</td>
                    <td className="px-4 py-3 text-foreground">新規ウィンドウ作成</td>
                    <td className="px-4 py-3 text-muted-foreground">Create</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-900/50">
                    <td className="px-4 py-3 font-mono font-bold text-emerald-600">,</td>
                    <td className="px-4 py-3 text-foreground">ウィンドウ名の変更</td>
                    <td className="px-4 py-3 text-muted-foreground">-</td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-4 py-3 font-mono font-bold text-emerald-600">%</td>
                    <td className="px-4 py-3 text-foreground">ペインを左右に分割</td>
                    <td className="px-4 py-3 text-muted-foreground">記号の形（/で分ける）</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-900/50">
                    <td className="px-4 py-3 font-mono font-bold text-emerald-600">"</td>
                    <td className="px-4 py-3 text-foreground">ペインを上下に分割</td>
                    <td className="px-4 py-3 text-muted-foreground">-</td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-4 py-3 font-mono font-bold text-emerald-600">d</td>
                    <td className="px-4 py-3 text-foreground">セッションからデタッチ</td>
                    <td className="px-4 py-3 text-muted-foreground">Detach</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              練習してみよう
            </h2>

            <InfoBox type="success" title="レッツトライ">
              <ol className="list-decimal list-inside space-y-2 mt-2">
                <li>ターミナルで <code>tmux</code> と入力してセッションを開始</li>
                <li><code>Ctrl+B</code> を押し、指を離して <code>c</code> を押す（新しいウィンドウができる）</li>
                <li><code>Ctrl+B</code> を押し、指を離して <code>,</code> を押す（下のバーの色が変わり、名前入力待ちになる）</li>
                <li>好きな名前（例: editor）を入力してEnter</li>
              </ol>
            </InfoBox>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="プリフィックスキーの操作手順を書こう"
            description="tmux のプリフィックスキーを使った一連の操作手順を書いてください。セッション作成からウィンドウ作成、名前変更、デタッチまでの流れです。"
            initialCode={`# プリフィックスキー操作の練習\n\n# 1. tmux セッションを開始\n\n# 2. 新しいウィンドウを作成\n# (プリフィックス + ?)\n\n# 3. ウィンドウに名前を付ける\n# (プリフィックス + ?)\n\n# 4. セッションからデタッチ\n# (プリフィックス + ?)`}
            answer={`# プリフィックスキー操作の練習\n\n# 1. tmux セッションを開始\ntmux\n\n# 2. 新しいウィンドウを作成\n# Ctrl+B C\n\n# 3. ウィンドウに名前を付ける\n# Ctrl+B ,\n\n# 4. セッションからデタッチ\n# Ctrl+B D`}
            hints={[
              'プリフィックスキーは Ctrl+B を同時に押した後、指を離してからコマンドキーを押します',
              'ウィンドウ作成は C（Create）、名前変更は ,（カンマ）です',
              'デタッチは D（Detach）です',
            ]}
            keywords={['Ctrl+B', 'C', ',', 'D']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
