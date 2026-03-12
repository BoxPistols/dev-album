import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';

/**
 * 実践的な環境構築 - 開発環境の統合確認
 * デザイン方針: ジャーニーマップ
 * - すべてのツールが正しくインストールされたか確認
 * - 初めてのプロジェクト作成
 * - 開発フローの実践
 */

export default function Integration() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 22 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            開発環境の統合確認
          </h1>
          <p className="text-lg text-muted-foreground">
            すべてのツールが正しくインストールされたか確認し、初めてのプロジェクトを作成します。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* Verification */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            インストール確認
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              以下のコマンドを実行して、すべてのツールが正しくインストールされたか確認しましょう。
            </p>

            <div className="space-y-6">
              {/* Git Check */}
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold text-foreground mb-3">Git のバージョン確認</h3>
                <CodeBlock
                  code={`git --version`}
                  language="bash"
                  title="Git 確認"
                />
                <p className="text-lg text-muted-foreground mt-3">
                  実行結果例：<code className="bg-muted px-2 py-1 rounded text-primary">git version 2.40.0</code>
                </p>
              </div>

              {/* Node.js Check */}
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold text-foreground mb-3">Node.js のバージョン確認</h3>
                <CodeBlock
                  code={`node --version
npm --version`}
                  language="bash"
                  title="Node.js と npm 確認"
                />
                <p className="text-lg text-muted-foreground mt-3">
                  実行結果例：<code className="bg-muted px-2 py-1 rounded text-primary">v18.17.0</code> と <code className="bg-muted px-2 py-1 rounded text-primary">9.6.7</code>
                </p>
              </div>

              {/* Cursor Check */}
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold text-foreground mb-3">Cursor の確認</h3>
                <p className="text-lg text-muted-foreground">
                  Cursor がアプリケーションフォルダに存在し、起動できることを確認してください。
                </p>
              </div>

              {/* VSCode Check */}
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold text-foreground mb-3">VSCode の確認</h3>
                <p className="text-lg text-muted-foreground mb-3">
                  VSCode がアプリケーションフォルダに存在し、起動できることを確認してください。
                </p>
                <CodeBlock
                  code={`code --version`}
                  language="bash"
                  title="VSCode バージョン確認（オプション）"
                />
              </div>
            </div>

            <InfoBox type="success">
              すべてのコマンドが実行でき、バージョン番号が表示されれば、インストールは成功です！
            </InfoBox>
          </div>
        </section>

        {/* First Project */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            初めてのプロジェクト作成
          </h2>

          {/* Step 1 */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                1
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                プロジェクトフォルダを作成
              </h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ターミナルで以下のコマンドを実行して、プロジェクトフォルダを作成します。
            </p>
            <CodeBlock
              code={`mkdir my-first-project
cd my-first-project`}
              language="bash"
              title="プロジェクトフォルダ作成"
            />
          </div>

          {/* Step 2 */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                2
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                Git リポジトリを初期化
              </h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              プロジェクトフォルダで Git を初期化します。
            </p>
            <CodeBlock
              code={`git init`}
              language="bash"
              title="Git 初期化"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              実行結果に「Initialized empty Git repository」と表示されれば成功です。
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                3
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                最初のファイルを作成
              </h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              README.md ファイルを作成して、プロジェクトの説明を書きます。
            </p>
            <CodeBlock
              code={`touch README.md
echo "# My First Project" > README.md`}
              language="bash"
              title="README.md 作成"
            />
          </div>

          {/* Step 4 */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                4
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                VSCode で開く
              </h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              VSCode でプロジェクトを開きます。
            </p>
            <CodeBlock
              code={`code .`}
              language="bash"
              title="VSCode で開く"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              VSCode が起動し、プロジェクトフォルダが表示されます。
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                5
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                Git で管理する
              </h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              VSCode の統合ターミナルで、ファイルを Git に追加して Commit します。
            </p>
            <CodeBlock
              code={`git add README.md
git commit -m "Initial commit: Add README"`}
              language="bash"
              title="Git Commit"
            />
            <InfoBox type="success">
              これで、初めてのプロジェクトが Git で管理されました！
            </InfoBox>
          </div>
        </section>

        {/* Development Workflow */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            実践的な開発フロー
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              これからの開発は、以下のフローで進めていきます。
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">ファイルを編集</h3>
                  <p className="text-muted-foreground">VSCode でコードを書きます。</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">変更を確認</h3>
                  <p className="text-muted-foreground">
                    <code className="bg-muted px-2 py-1 rounded text-primary">git status</code> でファイルの変更を確認します。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">ステージング</h3>
                  <p className="text-muted-foreground">
                    <code className="bg-muted px-2 py-1 rounded text-primary">git add .</code> で変更をステージングします。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Commit</h3>
                  <p className="text-muted-foreground">
                    <code className="bg-muted px-2 py-1 rounded text-primary">git commit -m "メッセージ"</code> で変更を記録します。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Push（GitHub に保存）</h3>
                  <p className="text-muted-foreground">
                    <code className="bg-muted px-2 py-1 rounded text-primary">git push</code> で GitHub に送信します。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info">
              このフローを繰り返すことで、チーム開発や大規模プロジェクトに対応できるようになります。
            </InfoBox>
          </div>
        </section>

        {/* Tools Comparison */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Cursor vs VSCode - 使い分け
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cursor と VSCode は異なるエディタですが、どちらでも開発できます。以下の基準で使い分けることをお勧めします。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 font-semibold text-foreground">項目</th>
                    <th className="py-3 px-4 font-semibold text-foreground">Cursor</th>
                    <th className="py-3 px-4 font-semibold text-foreground">VSCode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-semibold text-foreground">AI 機能</td>
                    <td className="py-3 px-4 text-muted-foreground">強力（コード生成、補完）</td>
                    <td className="py-3 px-4 text-muted-foreground">拡張機能で対応</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-semibold text-foreground">拡張機能</td>
                    <td className="py-3 px-4 text-muted-foreground">VSCode ベース</td>
                    <td className="py-3 px-4 text-muted-foreground">豊富</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-semibold text-foreground">学習用途</td>
                    <td className="py-3 px-4 text-muted-foreground">初心者向け</td>
                    <td className="py-3 px-4 text-muted-foreground">プロ向け</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-foreground">推奨用途</td>
                    <td className="py-3 px-4 text-muted-foreground">AI の助けが欲しい時</td>
                    <td className="py-3 px-4 text-muted-foreground">細かい設定をしたい時</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info">
              まずは Cursor で AI の助けを借りながら学習を進めることをお勧めします。慣れてきたら VSCode に移行するのも良いでしょう。
            </InfoBox>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="プロジェクト作成から Git 管理までの流れを書いてみよう"
            description="フォルダ作成、Git 初期化、ファイル作成、コミットまでの一連のコマンドを書いてください。"
            initialCode={`# 1. プロジェクトフォルダを作成して移動\n\n# 2. Git リポジトリを初期化\n\n# 3. README.md を作成して内容を書き込む\n\n# 4. ファイルをステージングしてコミット\n`}
            answer={`# 1. プロジェクトフォルダを作成して移動\nmkdir my-first-project\ncd my-first-project\n\n# 2. Git リポジトリを初期化\ngit init\n\n# 3. README.md を作成して内容を書き込む\ntouch README.md\necho "# My First Project" > README.md\n\n# 4. ファイルをステージングしてコミット\ngit add README.md\ngit commit -m "Initial commit: Add README"`}
            keywords={['mkdir', 'git init', 'touch', 'git add', 'git commit']}
            hints={[
              'mkdir でフォルダ作成、cd で移動します',
              'git init でリポジトリを初期化します',
              'git add と git commit -m でファイルを記録します',
            ]}
            preview
          />
        </section>

        {/* Completion */}
        <section className="mb-12">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <CheckCircle className="text-primary flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
                  おめでとうございます！
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  これで、はじめての GitHub・React 環境構築マニュアルのすべてのステップが完了しました。
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  あなたは以下のスキルを習得しました：
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">Cursor、Git、Node.js のインストール</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">GitHub アカウント作成と初期設定</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">Git の基本操作（Commit、Push、Pull）</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">Linux/Ubuntu の基本コマンド</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">VSCode と Cursor の使い方</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">React の基本的な開発フロー</span>
                  </li>
                </ul>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  これからは、自信を持って開発に参加できます。新しいプロジェクトに挑戦してみてください。頑張ってください！
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
