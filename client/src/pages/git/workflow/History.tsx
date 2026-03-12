import { ArrowRight, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import WhyNowBox from '@/components/WhyNowBox';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';


/**
 * Git ワークフロー実践 - 差分・履歴確認
 * デザイン方針: ジャーニーマップ
 * - git log で履歴確認
 * - git diff で変更内容確認
 * - GitHub Web UI での確認
 */

export default function HistoryWorkflow() {
  const [, navigate] = useLocation();
  const { selectedOS } = useOS();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 13 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            差分・履歴を確認しよう
          </h1>
          <p className="text-lg text-muted-foreground">
            Git の差分・履歴を確認し、変更内容を理解します。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <WhyNowBox
          title="履歴・差分の確認とは"
          tags={['変更の確認', 'レビュー', 'デバッグ']}
        >
          <p>
            git log はコミットの一覧を、git diff は2つの状態の差分を表示するコマンドです。Google ドキュメントの「変更履歴を表示」に近い機能です。
          </p>
          <p>
            「どのファイルの、どの行が変わったのか」を確認できます。誰かのコードをレビューする前や、変更を加えた後に意図した通りになっているか確認するときに使います。
          </p>
        </WhyNowBox>

        {/* OS Toggle */}
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* What is History and Diff */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            差分・履歴を確認する理由
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Git で管理されたファイルは、すべての変更履歴が記録されています。これにより、以下のことができます：
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">変更内容の確認</h4>
                  <p className="text-muted-foreground text-sm">
                    「何が変わったか」を詳しく確認できます。
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">変更の理由を確認</h4>
                  <p className="text-muted-foreground text-sm">
                    コミットメッセージから「なぜ変わったか」を理解できます。
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">過去のバージョンに戻す</h4>
                  <p className="text-muted-foreground text-sm">
                    間違った変更を元に戻すことができます。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">セルフレビュー</h4>
                  <p className="text-muted-foreground text-sm">
                    自分の変更を確認し、品質を保証できます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* git log - View History */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            git log：変更履歴を確認
          </h2>

          <div className="space-y-8">
            {/* Explanation */}
            <div className="bg-card border border-border rounded-lg p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                git log コマンドは、すべての Commit 履歴を表示します。「いつ、誰が、何を変更したか」を確認できます。
              </p>
            </div>

            {/* Step 1: View Log */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  git log を実行
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cursor のターミナルで、以下のコマンドを実行してください。
              </p>

              <CodeBlock
                code={`git log`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="変更履歴を表示"
              />

              <p className="text-muted-foreground mt-4">
                すべての Commit が表示されます。最新の Commit が最初に表示されます。
              </p>

              <CodeBlock
                code={`commit abc123def456... (HEAD -> main, origin/main)\nAuthor: Your Name <your.email@example.com>\nDate:   Mon Jan 15 10:30:00 2024 +0900\n\n    Add hello.txt file\n\ncommit def456ghi789...\nAuthor: GitHub <noreply@github.com>\nDate:   Mon Jan 15 10:00:00 2024 +0900\n\n    Initial commit`}
                language="bash"
                title="git log の出力例"
              />

              <InfoBox type="info">
                「q」キーを押すと、ログ表示を終了できます。
              </InfoBox>
            </div>

            {/* Step 2: Detailed Log */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  より詳しい履歴を表示
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                変更内容をより詳しく確認するには、以下のコマンドを使用します。
              </p>

              <CodeBlock
                code={`git log -p`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="変更内容を含めた履歴表示"
              />

              <p className="text-muted-foreground mt-4">
                「-p」オプションを付けると、各 Commit での変更内容（差分）が表示されます。
              </p>

              <CodeBlock
                code={`commit abc123def456...\nAuthor: Your Name <your.email@example.com>\nDate:   Mon Jan 15 10:30:00 2024 +0900\n\n    Add hello.txt file\n\ndiff --git a/hello.txt b/hello.txt\nnew file mode 100644\nindex 0000000..abc1234\n--- /dev/null\n+++ b/hello.txt\n@@ -0,0 +1,3 @@\n+Hello, Git!\n+This is my first Git project.\n+I'm learning Git and GitHub.`}
                language="bash"
                title="git log -p の出力例"
              />
            </div>

            {/* Step 3: One-line Log */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  簡潔な履歴を表示
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Commit 履歴を1行で表示する方法もあります。
              </p>

              <CodeBlock
                code={`git log --oneline`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="1行形式で履歴を表示"
              />

              <CodeBlock
                code={`abc123d Add hello.txt file\ndef456g Initial commit`}
                language="bash"
                title="git log --oneline の出力例"
              />

              <InfoBox type="info">
                このコマンドは、Commit 履歴を素早く確認したいときに便利です。
              </InfoBox>
            </div>
          </div>
        </section>

        {/* git diff - View Changes */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            git diff：変更内容を確認
          </h2>

          <div className="space-y-8">
            {/* Explanation */}
            <div className="bg-card border border-border rounded-lg p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                git diff コマンドは、現在のファイルと前の Commit の差分を表示します。「何が追加され、何が削除されたか」を確認できます。
              </p>
            </div>

            {/* Step 1: Make Change */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  ファイルを編集
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                hello.txt を開いて、以下のように編集してください。
              </p>

              <CodeBlock
                code={`Hello, Git!\nThis is my first Git project.\nI'm learning Git and GitHub.\nI'm excited to learn more!`}
                language="text"
                title="hello.txt の編集例"
              />

              <p className="text-muted-foreground mt-4">
                ファイルを保存してください。
              </p>
            </div>

            {/* Step 2: View Diff */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  git diff を実行
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cursor のターミナルで、以下のコマンドを実行してください。
              </p>

              <CodeBlock
                code={`git diff`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="変更内容を表示"
              />

              <CodeBlock
                code={`diff --git a/hello.txt b/hello.txt\nindex abc1234..def5678 100644\n--- a/hello.txt\n+++ b/hello.txt\n@@ -1,3 +1,4 @@\n Hello, Git!\n This is my first Git project.\n I'm learning Git and GitHub.\n+I'm excited to learn more!`}
                language="bash"
                title="git diff の出力例"
              />

              <div className="mt-4 space-y-2 text-muted-foreground text-sm">
                <p className="font-semibold">出力の見方：</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>「-」で始まる行 = 削除された行</li>
                  <li>「+」で始まる行 = 追加された行</li>
                  <li>何も付いていない行 = 変更されていない行</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub Web UI */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            GitHub Web UI で確認
          </h2>

          <div className="space-y-8">
            {/* Explanation */}
            <div className="bg-card border border-border rounded-lg p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                GitHub の Web UI を使うと、より視覚的に履歴と差分を確認できます。
              </p>
            </div>

            {/* Step 1: View Commits */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  GitHub のリポジトリページで Commit 履歴を確認
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                GitHub のリポジトリページで、「Commits」をクリックすると、すべての Commit が表示されます。
              </p>

              <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                <li>GitHub のリポジトリページを開く</li>
                <li>「Commits」ボタンをクリック</li>
                <li>すべての Commit 履歴が表示されます</li>
              </ol>
            </div>

            {/* Step 2: View Commit Details */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  Commit の詳細を確認
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                任意の Commit をクリックすると、その Commit の詳細が表示されます。
              </p>

              <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                <li>Commit 履歴から、確認したい Commit をクリック</li>
                <li>コミットメッセージと変更内容が表示されます</li>
                <li>ファイルの差分が視覚的に表示されます</li>
              </ol>

              <InfoBox type="info">
                GitHub の Web UI では、差分が色分けされて表示されるため、ターミナルより見やすいです。
              </InfoBox>
            </div>
          </div>
        </section>

        {/* Self-Review */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            セルフレビューの重要性
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              自分の変更を確認（セルフレビュー）することは、品質を保証するために重要です。Commit を Push する前に、以下を確認しましょう：
            </p>

            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-secondary font-bold">✓</span>
                <span className="text-muted-foreground">意図した変更が含まれているか</span>
              </div>
              <div className="flex gap-3">
                <span className="text-secondary font-bold">✓</span>
                <span className="text-muted-foreground">不要な変更が含まれていないか</span>
              </div>
              <div className="flex gap-3">
                <span className="text-secondary font-bold">✓</span>
                <span className="text-muted-foreground">コミットメッセージが適切か</span>
              </div>
              <div className="flex gap-3">
                <span className="text-secondary font-bold">✓</span>
                <span className="text-muted-foreground">コードの品質は大丈夫か</span>
              </div>
            </div>

            <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-lg">
              <p className="text-muted-foreground">
                セルフレビューを習慣づけることで、バグを減らし、より良いコードを書くことができます。
              </p>
            </div>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="履歴と差分の確認コマンドを書いてみよう"
            description="コミット履歴を1行形式で表示するコマンドと、現在の変更内容を確認するコマンドを書いてください。"
            initialCode={`# 1. 履歴を1行形式で表示\n\n# 2. 変更内容を確認\n`}
            answer={`# 1. 履歴を1行形式で表示\ngit log --oneline\n\n# 2. 変更内容を確認\ngit diff`}
            keywords={['git log', '--oneline', 'git diff']}
            hints={[
              'git log に --oneline オプションを付けると簡潔に表示できます',
              'git diff で未ステージングの変更内容を確認できます',
            ]}
            preview
          />
        </section>

        {/* Completion */}
        <section className="mb-12">
          <InfoBox type="success" title="基本的な Git ワークフロー完了！">
            Commit、Push、Pull、差分・履歴確認ができるようになりました。これで、Git の基本的な操作はマスターしました。次は、ブランチの概念を学び、実際の開発に近い体験をします。
          </InfoBox>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/git/workflow/push-pull')}>戻る</Button>
          <Button className="gap-2" onClick={() => navigate('/git/workflow/branch')}>
              次へ：ブランチの基本
              
              <ArrowRight size={20} />
            </Button>
        </div>
      </div>
    </div>
  );
}
