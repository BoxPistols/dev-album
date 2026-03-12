import { ArrowRight, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import WhyNowBox from '@/components/WhyNowBox';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';


/**
 * Git ワークフロー実践 - ブランチの基本
 * デザイン方針: ジャーニーマップ
 * - ブランチの概念
 * - ブランチの作成・切り替え
 * - マージの基本
 */

export default function BranchWorkflow() {
  const [, navigate] = useLocation();
  const { selectedOS } = useOS();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 14 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            ブランチの基本を学ぼう
          </h1>
          <p className="text-lg text-muted-foreground">
            ブランチを使って、複数の機能を並行開発できます。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <WhyNowBox
          title="ブランチとは"
          tags={['並行開発', 'リスク分離', 'PR・レビュー']}
        >
          <p>
            ブランチは作業用のコピーを作る機能です。「別名で保存」のようなもので、元のコードはそのまま残した状態で変更を試せます。
          </p>
          <p>
            例えば、AI に大きな変更を依頼するときにブランチを使うと、うまくいかなかった場合でも元のコードに戻せます。変更が問題なければ main ブランチに取り込み（マージ）、問題があればそのブランチを捨てて終わりです。
          </p>
        </WhyNowBox>

        {/* OS Toggle */}
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* What is Branch */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            ブランチとは
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              ブランチは、プロジェクトの「分岐」です。メインの開発ラインから分岐させて、新しい機能を開発したり、バグを修正したりできます。複数人での開発時に、互いに影響を与えずに作業できます。
            </p>
            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <p className="text-sm text-foreground/80">
                <strong>例：</strong> Word の「名前を付けて保存」で別ファイルを作る操作に近いです。ただし Git のブランチは差分だけを管理するため、元のファイルのコピーではありません。作業が完了したら main に取り込めます（マージ）。
              </p>
            </div>

            <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-lg">
              <h3 className="font-semibold text-foreground mb-3">ブランチのメリット</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>複数の機能を並行開発できる</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>メインの開発に影響を与えない</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>機能ごとに整理できる</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>失敗した開発を簡単に破棄できる</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
              <h3 className="font-semibold text-foreground mb-3">ブランチの例</h3>
              <p className="text-muted-foreground text-sm mb-3">
                一般的なブランチ構成：
              </p>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• <strong>main</strong> - 本番環境用（安定したコード）</li>
                <li>• <strong>develop</strong> - 開発用（開発中のコード）</li>
                <li>• <strong>feature/new-feature</strong> - 新機能開発用</li>
                <li>• <strong>bugfix/bug-name</strong> - バグ修正用</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Create and Switch Branch */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            ブランチを作成・切り替え
          </h2>

          <div className="space-y-8">
            {/* Step 1: View Current Branch */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  現在のブランチを確認
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cursor のターミナルで、以下のコマンドを実行してください。
              </p>

              <CodeBlock
                code={`git branch`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="ブランチ一覧を表示"
              />

              <CodeBlock
                code={`* main\n  develop`}
                language="bash"
                title="git branch の出力例"
              />

              <p className="text-muted-foreground mt-4">
                「*」が付いているブランチが、現在のブランチです。
              </p>
            </div>

            {/* Step 2: Create New Branch */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  新しいブランチを作成
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                以下のコマンドで、新しいブランチを作成します。
              </p>

              <CodeBlock
                code={`git branch feature/update-content`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="新しいブランチを作成"
              />

              <p className="text-muted-foreground mt-4">
                「feature/update-content」という新しいブランチが作成されます。
              </p>

              <InfoBox type="info">
                ブランチ名は、機能や目的を表すわかりやすい名前を付けましょう。
              </InfoBox>
            </div>

            {/* Step 3: Switch Branch */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  ブランチを切り替え
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                以下のコマンドで、ブランチを切り替えます。
              </p>

              <CodeBlock
                code={`git checkout feature/update-content`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="ブランチを切り替え"
              />

              <p className="text-muted-foreground mt-4">
                または、以下のコマンドでも同じです（より新しい方法）：
              </p>

              <CodeBlock
                code={`git switch feature/update-content`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="git switch でブランチを切り替え"
              />

              <InfoBox type="info">
                ブランチを切り替えると、ファイルの内容がそのブランチの状態に変わります。
              </InfoBox>
            </div>

            {/* Step 4: Create and Switch at Once */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  ブランチを作成して切り替え（ショートカット）
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                以下のコマンドで、ブランチを作成して同時に切り替えられます。
              </p>

              <CodeBlock
                code={`git checkout -b feature/new-feature`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="ブランチを作成して切り替え"
              />

              <p className="text-muted-foreground mt-4">
                または：
              </p>

              <CodeBlock
                code={`git switch -c feature/new-feature`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="git switch -c でブランチを作成して切り替え"
              />
            </div>
          </div>
        </section>

        {/* Make Changes on Branch */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            ブランチで変更を加える
          </h2>

          <div className="space-y-8">
            {/* Step 1: Edit File */}
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
                feature/update-content ブランチで、hello.txt を編集してください。
              </p>

              <CodeBlock
                code={`Hello, Git!\nThis is my first Git project.\nI'm learning Git and GitHub.\nI'm excited to learn more!\n\nBranch development is fun!`}
                language="text"
                title="hello.txt の編集例"
              />
            </div>

            {/* Step 2: Commit Changes */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  変更を Commit
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                編集したファイルを Commit します。
              </p>

              <CodeBlock
                code={`git add .\ngit commit -m "Add branch development message"`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="ファイルを Commit"
              />
            </div>

            {/* Step 3: Push Branch */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  ブランチを GitHub に Push
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                ブランチを GitHub にアップロードします。
              </p>

              <CodeBlock
                code={`git push -u origin feature/update-content`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="ブランチを Push"
              />

              <p className="text-muted-foreground mt-4">
                「-u」オプションは、ローカルブランチをリモートブランチに関連付けます。
              </p>
            </div>
          </div>
        </section>

        {/* Merge Branch */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            ブランチをマージ
          </h2>

          <div className="space-y-8">
            {/* Explanation */}
            <div className="bg-card border border-border rounded-lg p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                マージは、別のブランチの変更をメインブランチに統合する操作です。開発が完了した機能をメインブランチに取り込むときに使用します。
              </p>
            </div>

            {/* Step 1: Switch to Main */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  Main ブランチに切り替え
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                マージする前に、メインブランチに切り替えます。
              </p>

              <CodeBlock
                code={`git switch main`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="Main ブランチに切り替え"
              />
            </div>

            {/* Step 2: Merge Branch */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  ブランチをマージ
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                以下のコマンドで、feature/update-content ブランチを main にマージします。
              </p>

              <CodeBlock
                code={`git merge feature/update-content`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="ブランチをマージ"
              />

              <p className="text-muted-foreground mt-4">
                マージが成功すると、feature/update-content の変更が main に統合されます。
              </p>

              <InfoBox type="info">
                マージ後、main ブランチのファイルが更新されます。
              </InfoBox>
            </div>

            {/* Step 3: Push Merged Main */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  マージされた Main を Push
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                マージされた main ブランチを GitHub に Push します。
              </p>

              <CodeBlock
                code={`git push origin main`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="Main ブランチを Push"
              />
            </div>

            {/* Step 4: Delete Branch */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  ブランチを削除（オプション）
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                マージが完了したら、ブランチを削除できます。
              </p>

              <CodeBlock
                code={`git branch -d feature/update-content`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="ローカルブランチを削除"
              />

              <p className="text-muted-foreground mt-4">
                リモートのブランチも削除する場合：
              </p>

              <CodeBlock
                code={`git push origin --delete feature/update-content`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="リモートブランチを削除"
              />
            </div>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="ブランチ操作を書いてみよう"
            description="「feature/dark-mode」という名前の新しいブランチを作成して、そのブランチに切り替えるコマンドを1行で書いてください。"
            initialCode={`git `}
            answer={`git checkout -b feature/dark-mode`}
            hints={[
              'ブランチの作成と切り替えを同時に行うオプションがあります',
              'git checkout に -b オプションを付けると、作成と切り替えを同時にできます',
              'git switch -c でも同じことができます',
            ]}
            keywords={['feature/dark-mode', '-b']}
            preview
          />
        </section>

        {/* Completion */}
        <section className="mb-12">
          <InfoBox type="success" title="ブランチの基本習得！">
            ブランチの作成・切り替え・マージができるようになりました。これで、より実践的な開発ワークフローが実現できます。次は、既存のリポジトリから学び、React 開発に進みます。
          </InfoBox>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/git/workflow/history')}>戻る</Button>
          <Button className="gap-2" onClick={() => navigate('/git/react/setup')}>
              次へ：React 開発環境セットアップ
              
              <ArrowRight size={20} />
            </Button>
        </div>
      </div>
    </div>
  );
}
