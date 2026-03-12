import { ArrowRight, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import WhyNowBox from '@/components/WhyNowBox';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';


/**
 * Git ワークフロー実践 - Push と Pull
 * デザイン方針: ジャーニーマップ
 * - Push でローカルの変更を GitHub にアップロード
 * - Pull で GitHub の最新を取得
 * - リモートとローカルの同期概念
 */

export default function PushPull() {
  const [, navigate] = useLocation();
  const { selectedOS } = useOS();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 12 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            Push と Pull を実践しよう
          </h1>
          <p className="text-lg text-muted-foreground">
            ローカルの変更を GitHub にアップロード（Push）し、GitHub の最新を取得（Pull）します。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <WhyNowBox
          title="Push と Pull とは"
          tags={['クラウド同期', 'チーム共有', 'バックアップ']}
        >
          <p>
            Push は手元の変更を GitHub に送る操作、Pull は GitHub の変更を手元に取り込む操作です。Google Drive でいう「アップロード」と「ダウンロード」に近いです。ただし Git は差分だけを管理するため、ファイルが丸ごと上書きされることはありません。
          </p>
          <p>
            作業が終わったら Push してバックアップする、別のパソコンで作業を再開する前に Pull する、という流れが基本です。
          </p>
        </WhyNowBox>

        {/* OS Toggle */}
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* Local and Remote Concept */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            ローカルとリモートの概念
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Git では、2つの場所にリポジトリが存在します：
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-2xl">💻</span>
                  ローカル
                </h3>
                <p className="text-muted-foreground text-sm">
                  自分のパソコン上のリポジトリ。ここでファイルを編集し、Commit を作成します。
                </p>
              </div>

              <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-lg">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-2xl">☁️</span>
                  リモート
                </h3>
                <p className="text-muted-foreground text-sm">
                  GitHub 上のリポジトリ。複数人での共有やバックアップに使用します。
                </p>
              </div>
            </div>

            <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-lg">
              <h3 className="font-semibold text-foreground mb-3">Push と Pull</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">📤</span>
                  <span><strong>Push</strong> - ローカルの Commit をリモート（GitHub）にアップロード</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">📥</span>
                  <span><strong>Pull</strong> - リモート（GitHub）の最新をローカルに取得</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Git Push */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Push：ローカルの変更を GitHub にアップロード
          </h2>

          <div className="space-y-8">
            {/* Explanation */}
            <div className="bg-card border border-border rounded-lg p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Push は、ローカルで作成した Commit を GitHub にアップロードする操作です。これにより、他の人があなたの変更を見たり、パソコンが壊れた場合のバックアップになります。
              </p>
            </div>

            {/* Step 1: Push */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  git push を実行
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cursor のターミナルで、以下のコマンドを実行してください。
              </p>

              <CodeBlock
                code={`git push origin main`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="Push コマンド"
              />

              <p className="text-muted-foreground mt-4">
                「origin」は GitHub 上のリモートリポジトリを指し、「main」はブランチ名です。
              </p>

              <InfoBox type="info">
                初回の Push 時に、「origin」と「main」の関連付けを聞かれる場合があります。その場合は、以下のコマンドを実行してください：
              </InfoBox>

              <CodeBlock
                code={`git push -u origin main`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="初回 Push コマンド"
              />
            </div>

            {/* Step 2: Verify Push */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  GitHub で確認
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                GitHub のリポジトリページを開いて、ファイルが表示されているか確認してください。
              </p>

              <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                <li>GitHub のリポジトリページにアクセス</li>
                <li>hello.txt ファイルが表示されているか確認</li>
                <li>ファイルをクリックして、内容が正しいか確認</li>
              </ol>

              <InfoBox type="success">
                GitHub にファイルが表示されれば、Push 成功です！
              </InfoBox>
            </div>
          </div>
        </section>

        {/* Git Pull */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Pull：GitHub の最新をローカルに取得
          </h2>

          <div className="space-y-8">
            {/* Explanation */}
            <div className="bg-card border border-border rounded-lg p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Pull は、GitHub 上の最新の変更をローカルに取得する操作です。複数人での開発時に、他の人の変更を自分のパソコンに反映させるために使用します。
              </p>
            </div>

            {/* Step 1: Make Change on GitHub */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  GitHub 上でファイルを編集（シミュレーション）
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Pull の動作を確認するため、GitHub 上で hello.txt を編集します。
              </p>

              <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                <li>GitHub のリポジトリページで hello.txt をクリック</li>
                <li>右上の鉛筆アイコン（Edit）をクリック</li>
                <li>ファイルの最後に「Updated on GitHub!」と追加</li>
                <li>「Commit changes」をクリック</li>
              </ol>

              <InfoBox type="info">
                これは、他の人が GitHub 上で変更した場合をシミュレートしています。
              </InfoBox>
            </div>

            {/* Step 2: Pull */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  git pull を実行
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cursor のターミナルで、以下のコマンドを実行してください。
              </p>

              <CodeBlock
                code={`git pull origin main`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="Pull コマンド"
              />

              <p className="text-muted-foreground mt-4">
                GitHub 上の最新の変更がローカルに取得されます。
              </p>
            </div>

            {/* Step 3: Verify Pull */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  ローカルで確認
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cursor で hello.txt を開いて、「Updated on GitHub!」が追加されているか確認してください。
              </p>

              <InfoBox type="success">
                ローカルのファイルに GitHub の変更が反映されれば、Pull 成功です！
              </InfoBox>
            </div>
          </div>
        </section>

        {/* Push and Pull Workflow */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Push と Pull のワークフロー
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              開発の基本的なワークフローは、以下のように繰り返されます：
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Pull</h4>
                  <p className="text-muted-foreground text-sm">
                    GitHub から最新を取得
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Edit</h4>
                  <p className="text-muted-foreground text-sm">
                    ファイルを編集
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Commit</h4>
                  <p className="text-muted-foreground text-sm">
                    変更を Commit
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Push</h4>
                  <p className="text-muted-foreground text-sm">
                    GitHub にアップロード
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-lg">
              <p className="text-muted-foreground">
                このサイクルを繰り返すことで、ローカルと GitHub を常に同期させることができます。
              </p>
            </div>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="Push と Pull の基本フローを書いてみよう"
            description="ファイルを編集した後、ステージング・コミット・Push までの一連のコマンドと、別の環境で最新を取得する Pull コマンドを書いてください。"
            initialCode={`# 1. 変更をステージング\n\n# 2. コミット\n\n# 3. GitHub に Push\n\n# 4. 別の環境で最新を Pull\n`}
            answer={`# 1. 変更をステージング\ngit add .\n\n# 2. コミット\ngit commit -m "Update content"\n\n# 3. GitHub に Push\ngit push origin main\n\n# 4. 別の環境で最新を Pull\ngit pull origin main`}
            keywords={['git add', 'git commit', 'git push', 'git pull']}
            hints={[
              'git add でステージング、git commit -m でコミットします',
              'git push origin main で GitHub に送信、git pull origin main で取得します',
            ]}
            preview
          />
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <InfoBox type="success" title="Push と Pull 成功！">
            ローカルの変更を GitHub にアップロード（Push）し、GitHub の最新をローカルに取得（Pull）できました。次は、Git の差分・履歴を確認する方法を学びます。
          </InfoBox>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/git/workflow/commit')}>戻る</Button>
          <Button className="gap-2" onClick={() => navigate('/git/workflow/history')}>
              次へ：差分・履歴確認
              
              <ArrowRight size={20} />
            </Button>
        </div>
      </div>
    </div>
  );
}
