import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function VerifyInstall() {
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
            インストール確認
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            tmuxが正しくインストールされたことを確認します。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">バージョン確認</h2>
            <p className="text-foreground mb-8 leading-relaxed">
              まず、tmuxが正しくインストールされているか、バージョンを確認します。
            </p>
            <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <CodeBlock
                code={`$ tmux -V
tmux 3.3a`}
                language="bash"
              />
              <p className="text-foreground mt-4">
                バージョン番号が表示されれば、インストールは成功です。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">最初のセッション作成</h2>
            <p className="text-foreground mb-8 leading-relaxed">
              実際にtmuxセッションを作成して、動作を確認します。
            </p>
            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  ステップ 1: 新しいセッションを作成
                </h3>
                <CodeBlock
                  code={`$ tmux new-session -s test`}
                  language="bash"
                />
                <p className="text-foreground mt-4">
                  このコマンドを実行すると、tmuxセッションが起動します。ターミナルの下部に緑色のステータスバーが表示されます。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  ステップ 2: セッションから抜ける
                </h3>
                <p className="text-foreground mb-4">
                  tmuxセッションから抜けるには、以下のキーボードショートカットを使用します。
                </p>
                <CodeBlock
                  code={`# Ctrl+B を押してから D を押す
Ctrl+B D`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  ステップ 3: セッション一覧を確認
                </h3>
                <CodeBlock
                  code={`$ tmux list-sessions
test: 1 windows (created Fri Feb 21 12:00:00 2026)`}
                  language="bash"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">次のステップ</h2>
            <p className="text-foreground mb-8 leading-relaxed">
              ここまでで、tmuxの基本的な環境準備が完了しました。次のセクションでは、tmuxの基本操作を詳しく学びます。
            </p>
            <InfoBox type="success" title="準備完了">
              tmuxが正常に動作することが確認できたら、次のセクション「tmux基礎」に進みましょう。
            </InfoBox>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="tmux セッションの基本操作を練習しよう"
            description="tmux セッションの作成、確認、デタッチ、再接続、終了の一連の操作を書いてください。"
            initialCode={`# tmux の基本操作\n\n# 1. test という名前のセッションを作成\n\n# 2. セッションからデタッチ\n\n# 3. セッション一覧を確認\n\n# 4. セッションに再接続\n\n# 5. セッションを終了`}
            answer={`# tmux の基本操作\n\n# 1. test という名前のセッションを作成\ntmux new-session -s test\n\n# 2. セッションからデタッチ\nCtrl+B D\n\n# 3. セッション一覧を確認\ntmux list-sessions\n\n# 4. セッションに再接続\ntmux attach -t test\n\n# 5. セッションを終了\ntmux kill-session -t test`}
            hints={[
              'デタッチは Ctrl+B を押した後に D を押す2ステップ操作です',
              'list-sessions（または ls）でセッション一覧を表示できます',
              'kill-session -t でセッションを名前指定で終了できます',
            ]}
            keywords={['new-session', 'Ctrl+B', 'list-sessions', 'kill-session']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
