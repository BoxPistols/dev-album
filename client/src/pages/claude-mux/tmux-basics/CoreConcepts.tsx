import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function CoreConcepts() {
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
            コアコンセプト
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            tmuxの基本的な概念を理解することが、効率的な使用の鍵となります。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              tmuxの3つの階層構造
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              tmuxは、セッション、ウィンドウ、ペインの3つの階層で構成されています。
            </p>

            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  1. セッション (Session)
                </h3>
                <p className="text-foreground mb-4">
                  tmuxの最上位の単位です。セッションは、複数のウィンドウを含むコンテナのようなものです。
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  <li>SSH接続が切れても、セッションは継続します</li>
                  <li>複数のセッションを同時に実行できます</li>
                  <li>セッション内のすべてのウィンドウを一度に復旧できます</li>
                </ul>
              </div>

              <div className="p-6 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  2. ウィンドウ (Window)
                </h3>
                <p className="text-foreground mb-4">
                  セッション内の独立したタブのようなものです。各ウィンドウは独立した作業スペースです。
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  <li>1つのセッション内に複数のウィンドウを作成できます</li>
                  <li>ウィンドウ間を素早く切り替えられます</li>
                  <li>各ウィンドウは独立したシェルセッションを持ちます</li>
                </ul>
              </div>

              <div className="p-6 rounded-lg border border-purple-200 bg-purple-50 dark:bg-purple-950/20">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  3. ペイン (Pane)
                </h3>
                <p className="text-foreground mb-4">
                  ウィンドウ内の分割領域です。1つのウィンドウを複数のペインに分割できます。
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  <li>1つのウィンドウを複数のペインに分割できます</li>
                  <li>複数のコマンドを同時に実行・監視できます</li>
                  <li>ペイン間でテキストをコピー&ペーストできます</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              プリフィックスキー
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              tmuxのすべてのコマンドは、プリフィックスキーを押してから実行されます。デフォルトはCtrl+Bです。
            </p>

            <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                基本的なプリフィックスキーコマンド
              </h3>
              <CodeBlock
                code={`# プリフィックスキー: Ctrl+B
# 新しいウィンドウを作成
Ctrl+B C

# ウィンドウを切り替え
Ctrl+B N (次のウィンドウ)
Ctrl+B P (前のウィンドウ)

# ペインを分割
Ctrl+B % (縦分割)
Ctrl+B " (横分割)`}
                language="bash"
              />
            </div>

            <InfoBox type="info" title="プリフィックスキーのカスタマイズ">
              プリフィックスキーは ~/.tmux.conf で変更できます。例えば、Ctrl+A に変更することが一般的です。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              AIコーディングでの活用
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              tmuxの階層構造は、AIコーディングの生産性を大幅に向上させます。
            </p>

            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  典型的なワークフロー
                </h3>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  <li><strong>セッション</strong>: プロジェクト全体（例: "my-project"）</li>
                  <li><strong>ウィンドウ1</strong>: エディタ（Claude Code CLI）</li>
                  <li><strong>ウィンドウ2</strong>: ビルド/テスト実行</li>
                  <li><strong>ウィンドウ3</strong>: ドキュメント参照</li>
                  <li><strong>ペイン分割</strong>: 複数のコマンドを同時に監視</li>
                </ul>
              </div>

              <InfoBox type="success" title="効率化のポイント">
                SSH接続が切れても、セッションを再接続すれば、すべてのウィンドウとペインが復旧されます。これにより、リモート開発の生産性が大幅に向上します。
              </InfoBox>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              次のステップ
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              次のページでは、実際に最初のセッションを作成して、これらの概念を実践します。
            </p>

            <InfoBox type="success" title="理解完了">
              tmuxの3つの階層構造とプリフィックスキーの概念が理解できたら、次のページに進みましょう。
            </InfoBox>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="tmux のウィンドウとペイン操作を書こう"
            description="tmux でウィンドウの作成、ペインの分割、ペイン間の移動のコマンドを書いてください。プリフィックスキー（Ctrl+B）を使います。"
            initialCode={`# tmux の基本操作（プリフィックス = Ctrl+B）\n\n# 1. 新しいウィンドウを作成\n\n# 2. 次のウィンドウに切り替え\n\n# 3. ペインを左右に分割\n\n# 4. ペインを上下に分割\n\n# 5. 次のペインに移動`}
            answer={`# tmux の基本操作（プリフィックス = Ctrl+B）\n\n# 1. 新しいウィンドウを作成\nCtrl+B C\n\n# 2. 次のウィンドウに切り替え\nCtrl+B N\n\n# 3. ペインを左右に分割\nCtrl+B %\n\n# 4. ペインを上下に分割\nCtrl+B "\n\n# 5. 次のペインに移動\nCtrl+B O`}
            hints={[
              'C は Create（作成）の頭文字です',
              'N は Next（次）の頭文字です',
              '% は縦の分割線に見立てた記号です',
            ]}
            keywords={['Ctrl+B', 'C', 'N', '%']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
