import { ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import WhyNowBox from '@/components/WhyNowBox';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';


/**
 * GitHub 基礎 - 最初のリポジトリ作成
 * デザイン方針: ジャーニーマップ
 * - GitHub 上でリポジトリを作成
 * - ローカルにクローン
 * - 基本的なファイル構成を説明
 */

export default function FirstRepo() {
  const [, navigate] = useLocation();
  const { selectedOS } = useOS();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 7 / 8
          </div>
          <h1 className="text-4xl font-poppins font-bold text-foreground mb-4">
            最初のリポジトリを作成しよう
          </h1>
          <p className="text-lg text-muted-foreground">
            GitHub 上に最初のリポジトリを作成し、ローカルにクローンします。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <WhyNowBox
          title="リポジトリとは"
          tags={['プロジェクト管理', 'バックアップ', 'チーム共有', 'GitHub Pages']}
        >
          <p>
            リポジトリは「変更履歴が付いたプロジェクトフォルダ」です。Google Drive のフォルダと似ていますが、ファイルを上書きしても以前のバージョンが残っている点が違います。
          </p>
          <p>
            コードを Slack に貼る代わりに GitHub のリンクを共有する、という使い方が一般的です。リンクを開けば誰でも最新のコードを確認できます。
          </p>
          <p>
            GitHub Pages を使うと、リポジトリの内容をそのままウェブサイトとして無料で公開することもできます。
          </p>
        </WhyNowBox>

        {/* OS Toggle */}
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* What is Repository */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            リポジトリとは
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              リポジトリは、プロジェクトのファイルと変更履歴を保存する場所です。通常のフォルダと違い、ファイルを上書きしても以前のバージョンが履歴として残ります。GitHub 上のリポジトリをローカルにコピーすることで、自分のパソコンで作業できます。
            </p>
            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <p className="text-sm text-foreground/80">
                <strong>例：</strong> Notion のページ履歴に近いです。「1週間前の状態に戻す」という操作が、プロジェクト全体のファイルに対してできます。
              </p>
            </div>

            <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-lg">
              <h3 className="font-semibold text-foreground mb-3">リポジトリの構成</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">📁</span>
                  <span>ファイル - プロジェクトのコードやドキュメント</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">📜</span>
                  <span>変更履歴 - 誰が、いつ、何を変更したか</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">🔗</span>
                  <span>ブランチ - 異なるバージョンの開発を並行実行</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Create Repository on GitHub */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            GitHub 上でリポジトリを作成
          </h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  GitHub にログイン
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                GitHub にログインしてください。
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  新しいリポジトリを作成
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                ページ右上の「+」アイコンをクリック → 「New repository」を選択します。
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  リポジトリ情報を入力
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                以下の情報を入力してください：
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Repository name</h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    リポジトリの名前を入力します。例：「my-first-project」
                  </p>
                  <InfoBox type="info">
                    リポジトリ名は英数字、ハイフン、アンダースコアのみ使用可能です。
                  </InfoBox>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description（オプション）</h4>
                  <p className="text-muted-foreground text-sm">
                    リポジトリの説明を入力します。例：「My first Git repository for learning」
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Public / Private</h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    「Public」を選択してください。誰でもリポジトリを見ることができます。
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Initialize this repository with:</h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    「Add a README file」にチェックを入れてください。
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  「Create repository」をクリック
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                リポジトリが作成されました。GitHub 上にリポジトリページが表示されます。
              </p>
            </div>
          </div>
        </section>

        {/* Clone Repository to Local */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            リポジトリをローカルにクローン
          </h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  リポジトリの URL をコピー
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                GitHub のリポジトリページで、「Code」ボタンをクリック → 「SSH」タブを選択 → URL をコピーします。
              </p>
              <InfoBox type="info">
                SSH を選択することで、先ほど設定した SSH キーを使用して認証できます。
              </InfoBox>
            </div>

            {/* Step 2 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  ターミナルを開く
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                {selectedOS === 'mac' ? 'ターミナルを開きます。' : 'PowerShell を開きます。'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  作業用フォルダに移動
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                プロジェクトを保存するフォルダに移動します。
              </p>

              {selectedOS === 'mac' ? (
                <CodeBlock
                  code={`cd ~/Documents`}
                  language="bash"
                  title="Mac: ドキュメントフォルダに移動"
                />
              ) : (
                <CodeBlock
                  code={`cd $env:USERPROFILE\\Documents`}
                  language="powershell"
                  title="Windows: ドキュメントフォルダに移動"
                />
              )}

              <InfoBox type="info">
                cd コマンドは「change directory」の略で、フォルダを移動するコマンドです。
              </InfoBox>
            </div>

            {/* Step 4 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  リポジトリをクローン
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                以下のコマンドを実行して、リポジトリをクローンします。
              </p>

              <CodeBlock
                code={`git clone git@github.com:your-username/my-first-project.git`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="リポジトリをクローン"
              />

              <p className="text-muted-foreground mt-4">
                「your-username」と「my-first-project」を、自分の GitHub ユーザー名とリポジトリ名に置き換えてください。
              </p>

              <InfoBox type="info">
                クローンとは、GitHub 上のリポジトリをローカルにコピーすることです。
              </InfoBox>
            </div>

            {/* Step 5 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  リポジトリフォルダに移動
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                クローンされたリポジトリフォルダに移動します。
              </p>

              <CodeBlock
                code={`cd my-first-project`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="リポジトリフォルダに移動"
              />
            </div>

            {/* Step 6 */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  6
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  Cursor で開く
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cursor でリポジトリを開きます。
              </p>

              <CodeBlock
                code={`cursor .`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="Cursor でリポジトリを開く"
              />

              <InfoBox type="info">
                「.」は「現在のフォルダ」を意味します。
              </InfoBox>
            </div>
          </div>
        </section>

        {/* Repository Structure */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            リポジトリの構造
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-muted-foreground">
              クローンしたリポジトリには、以下のファイルが含まれています：
            </p>

            <CodeBlock
              code={`my-first-project/\n├── README.md          # プロジェクトの説明\n├── .git/              # Git の管理ファイル（自動生成）\n└── .gitignore         # Git で管理しないファイルの指定（オプション）`}
              language="bash"
              title="リポジトリの基本構造"
            />

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-foreground mb-1">README.md</h4>
                <p className="text-muted-foreground text-sm">
                  プロジェクトの説明を書くファイルです。GitHub のリポジトリページに自動的に表示されます。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">.git/</h4>
                <p className="text-muted-foreground text-sm">
                  Git が変更履歴を管理するためのフォルダです。通常は触らないでください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub Pages Publishing */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            GitHub Pages を公開する設定
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              この環境では、GitHub Actions でビルドして GitHub Pages に公開する設定が一番シンプルです。
            </p>

            <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
              <li>リポジトリの「Settings」→「Pages」を開く</li>
              <li>「Build and deployment」の「Source」で「GitHub Actions」を選択</li>
              <li>テンプレートから「Vite」を選び、デフォルトのビルド手順を使う</li>
            </ol>

            <InfoBox type="info" title="公開フォルダの指定">
              この環境のビルド出力は「dist/public」なので、GitHub Actions の公開パスも「dist/public」に設定します。
            </InfoBox>

            <p className="text-muted-foreground">
              GitHub Pages はリポジトリ名のパスで公開されるため、Vite の base パスをリポジトリ名に合わせます。
            </p>

            <CodeBlock
              code={`// vite.config.ts\nexport default defineConfig({\n  base: '/your-repo-name/',\n});`}
              language="ts"
              title="GitHub Pages 用の base 設定"
            />

            <InfoBox type="info">
              「your-repo-name」を実際のリポジトリ名に置き換えてください。アセットやリンクが正しく表示されます。
            </InfoBox>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="リポジトリのクローンと初回コミットを書いてみよう"
            description="GitHub からリポジトリをクローンし、フォルダに移動して初回コミットするまでの流れを書いてください。"
            initialCode={`# 1. リポジトリをクローン\n\n# 2. クローンしたフォルダに移動\n\n# 3. ファイルをステージング\n\n# 4. 初回コミット\n`}
            answer={`# 1. リポジトリをクローン\ngit clone git@github.com:username/my-first-project.git\n\n# 2. クローンしたフォルダに移動\ncd my-first-project\n\n# 3. ファイルをステージング\ngit add .\n\n# 4. 初回コミット\ngit commit -m "Initial commit"`}
            keywords={['git clone', 'cd', 'git add', 'git commit']}
            hints={[
              'git clone でリモートリポジトリをコピーします',
              'cd でフォルダに移動、git add でステージング、git commit でコミット',
            ]}
            preview
          />
        </section>

        {/* Completion */}
        <section className="mb-12">
          <InfoBox type="success" title="リポジトリ作成完了！">
            GitHub 上にリポジトリを作成し、ローカルにクローンしました。次は、Git のワークフロー（Commit、Push、Pull）を学びます。
          </InfoBox>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/git/github/setup')}>戻る</Button>
          <Button className="gap-2" onClick={() => navigate('/git/github/markdown')}>
              次へ：Markdown 入門
              
              <ArrowRight size={20} />
            </Button>
        </div>
      </div>
    </div>
  );
}
