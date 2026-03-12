import { ArrowRight, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';


/**
 * React 実践 - デザイン変更と Git 管理
 * デザイン方針: ジャーニーマップ
 * - React コンポーネントを編集
 * - デザイン変更を実装
 * - Git でバージョン管理
 * - セルフレビューの実践
 */

export default function ModifyReact() {
  const [, navigate] = useLocation();
  const { selectedOS } = useOS();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 16 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            デザイン変更と Git 管理を実践しよう
          </h1>
          <p className="text-lg text-muted-foreground">
            React アプリのデザインを変更し、Git でバージョン管理します。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* OS Toggle */}
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* Purpose of This Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            このセクションの目的
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              React の「ハローワールド」を作成することが目的ではなく、以下を実現することです：
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">React アプリを起動</h4>
                  <p className="text-muted-foreground text-sm">
                    開発サーバーを起動し、ブラウザでアプリを確認できる。
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">デザイン変更を実装</h4>
                  <p className="text-muted-foreground text-sm">
                    コンポーネントのテキストや色を変更し、実装スキルを体験。
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Git で管理</h4>
                  <p className="text-muted-foreground text-sm">
                    Commit、Push、Pull を実践し、Git の実用性を理解。
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
                    GitHub で自分の変更を確認し、セルフマージを実践。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-lg">
              <p className="text-muted-foreground">
                これにより、Git での開発体験を得て、自信を持つことができます。
              </p>
            </div>
          </div>
        </section>

        {/* Edit App Component */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            App.js を編集してデザイン変更
          </h2>

          <div className="space-y-8">
            {/* Step 1: Open App.js */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  App.js を開く
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cursor の左パネルで、「src/App.js」をクリックして開いてください。
              </p>
            </div>

            {/* Step 2: Edit Content */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  テキストを変更
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                App.js の内容を以下のように編集してください。
              </p>

              <CodeBlock
                code={`import logo from './logo.svg';\nimport './App.css';\n\nfunction App() {\n  return (\n    <div className="App">\n      <header className="App-header">\n        <img src={logo} className="App-logo" alt="logo" />\n        <p>\n          Welcome to My React App!\n        </p>\n        <p style={{fontSize: '18px', color: '#10B981'}}>\n          I'm learning React and Git!\n        </p>\n        <a\n          className="App-link"\n          href="https://reactjs.org"\n          target="_blank"\n          rel="noopener noreferrer"\n        >\n          Learn React\n        </a>\n      </header>\n    </div>\n  );\n}\n\nexport default App;`}
                language="jsx"
                title="App.js の編集例"
              />

              <p className="text-muted-foreground mt-4">
                編集内容：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>テキストを「Welcome to My React App!」に変更</li>
                <li>新しいメッセージを追加</li>
                <li>テキストの色をエメラルドグリーン（#10B981）に変更</li>
              </ul>

              <InfoBox type="info">
                ファイルを保存（Cmd + S / Ctrl + S）すると、ブラウザが自動的に更新されます。
              </InfoBox>
            </div>

            {/* Step 3: Verify Changes */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  ブラウザで変更を確認
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                ブラウザで http://localhost:3000 を確認して、変更が反映されているか確認してください。
              </p>

              <InfoBox type="success">
                テキストと色が変更されていれば、デザイン変更成功です！
              </InfoBox>
            </div>
          </div>
        </section>

        {/* Git Management */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Git でバージョン管理
          </h2>

          <div className="space-y-8">
            {/* Step 1: Initialize Git */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  Git リポジトリを初期化（初回のみ）
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                プロジェクトが Git で管理されていない場合、以下のコマンドで初期化してください。
              </p>

              <CodeBlock
                code={`git init`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="Git リポジトリを初期化"
              />

              <p className="text-muted-foreground mt-4">
                すでに Git で管理されている場合は、このステップをスキップしてください。
              </p>
            </div>

            {/* Step 2: Check Status */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  変更を確認
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cursor のターミナルで、以下のコマンドを実行して、変更を確認してください。
              </p>

              <CodeBlock
                code={`git status`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="Git ステータスを確認"
              />

              <p className="text-muted-foreground mt-4">
                「modified: src/App.js」のように、変更されたファイルが表示されます。
              </p>
            </div>

            {/* Step 3: Create Branch */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  ブランチを作成
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                実践的な開発を体験するため、ブランチを作成してください。
              </p>

              <CodeBlock
                code={`git checkout -b feature/update-welcome-message`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="ブランチを作成して切り替え"
              />
            </div>

            {/* Step 4: Commit Changes */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  変更を Commit
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                以下のコマンドで、変更を Commit してください。
              </p>

              <CodeBlock
                code={`git add src/App.js\ngit commit -m "Update welcome message and styling"`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="ファイルを Commit"
              />

              <InfoBox type="info">
                コミットメッセージは、変更内容を明確に説明するものにしましょう。
              </InfoBox>
            </div>

            {/* Step 5: View Diff */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  セルフレビュー：差分を確認
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Commit 前に、変更内容を確認することが重要です。以下のコマンドで差分を確認してください。
              </p>

              <CodeBlock
                code={`git log --oneline -n 3`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="最新の Commit を確認"
              />

              <p className="text-muted-foreground mt-4">
                または、GitHub で確認することもできます。
              </p>

              <InfoBox type="info">
                セルフレビューを習慣づけることで、品質の高いコードを保証できます。
              </InfoBox>
            </div>

            {/* Step 6: Push and Create PR */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  6
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  GitHub に Push してセルフマージ
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                ブランチを GitHub に Push してください。
              </p>

              <CodeBlock
                code={`git push -u origin feature/update-welcome-message`}
                language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                title="ブランチを Push"
              />

              <p className="text-muted-foreground mt-4">
                GitHub のリポジトリページを開くと、「Create Pull Request」というボタンが表示されます。クリックして、Pull Request を作成してください。
              </p>

              <ol className="space-y-2 text-muted-foreground list-decimal list-inside mt-4">
                <li>GitHub のリポジトリページを開く</li>
                <li>「Create Pull Request」をクリック</li>
                <li>タイトルと説明を入力（例：「Update welcome message and styling」）</li>
                <li>「Create Pull Request」をクリック</li>
                <li>Pull Request ページで、変更内容を確認</li>
                <li>「Merge pull request」をクリックしてマージ</li>
              </ol>

              <InfoBox type="success">
                セルフレビューとセルフマージを実践しました！これで、実際の開発フローを体験できました。
              </InfoBox>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            学習成果
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              このマニュアルを完了することで、以下のスキルを習得しました：
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 pb-4 border-b border-border">
                <span className="text-2xl">✓</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">環境構築</h4>
                  <p className="text-muted-foreground text-sm">
                    Cursor、Git、Node.js をインストール・設定できる
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <span className="text-2xl">✓</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">GitHub の基本</h4>
                  <p className="text-muted-foreground text-sm">
                    アカウント作成、リポジトリ管理、SSH 認証ができる
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <span className="text-2xl">✓</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Git ワークフロー</h4>
                  <p className="text-muted-foreground text-sm">
                    Commit、Push、Pull、ブランチ、マージができる
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <span className="text-2xl">✓</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">セルフレビュー</h4>
                  <p className="text-muted-foreground text-sm">
                    差分・履歴確認、セルフマージができる
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">✓</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">React 開発体験</h4>
                  <p className="text-muted-foreground text-sm">
                    React プロジェクトを起動し、デザイン変更を実装できる
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-lg">
              <p className="text-muted-foreground font-semibold">
                これらのスキルは、実際のプロジェクト開発で即座に活用できます。継続して学習し、さらなるスキルアップを目指しましょう！
              </p>
            </div>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="React プロジェクトの Git ワークフローを書いてみよう"
            description="ブランチを作成し、ファイルをステージング・コミットして、GitHub に Push するまでの一連のコマンドを書いてください。"
            initialCode={`# 1. 新しいブランチを作成して切り替え\n\n# 2. 変更したファイルをステージング\n\n# 3. コミット\n\n# 4. GitHub に Push\n`}
            answer={`# 1. 新しいブランチを作成して切り替え\ngit checkout -b feature/update-welcome-message\n\n# 2. 変更したファイルをステージング\ngit add src/App.js\n\n# 3. コミット\ngit commit -m "Update welcome message and styling"\n\n# 4. GitHub に Push\ngit push -u origin feature/update-welcome-message`}
            keywords={['git checkout -b', 'git add', 'git commit', 'git push']}
            hints={[
              'git checkout -b でブランチ作成と切り替えを同時に行います',
              'git add でファイルをステージング、git commit -m でコミットします',
              'git push -u origin ブランチ名 で GitHub に Push します',
            ]}
            preview
          />
        </section>

        {/* Completion */}
        <section className="mb-12">
          <InfoBox type="success" title="マニュアル完了！">
            はじめての GitHub・React 導入マニュアルを完了しました。Git での開発体験を通じて、自信を持って開発に取り組めるようになりました。おめでとうございます！
          </InfoBox>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/git/react/setup')}>戻る</Button>
          <Button className="gap-2" onClick={() => navigate('/git')}>
            トップページに戻る
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
