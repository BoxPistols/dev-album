import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';


/**
 * 環境準備 - Node.js インストール
 * デザイン方針: ジャーニーマップ
 * - Mac/Windows 両対応のインストール手順
 * - React 実行に必要な npm の説明
 * - インストール確認方法を提供
 */

export default function NodejsInstall() {
  const [, navigate] = useLocation();
  const { selectedOS } = useOS();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 5 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            Node.js をインストールしよう
          </h1>
          <p className="text-lg text-muted-foreground">
            React を実行するために必要な Node.js をインストールします。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* OS Toggle */}
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* What is Node.js */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Node.js とは
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Node.js は、JavaScript をパソコンで実行できるようにするプログラムです。通常、JavaScript はブラウザ（Chrome や Safari）で実行されますが、Node.js を使うと、パソコン上で直接 JavaScript を実行できます。React を開発する際には、Node.js が必要です。
            </p>

            <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-lg">
              <h3 className="font-semibold text-foreground mb-3">Node.js に含まれるもの</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Node.js - JavaScript の実行環境</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>npm - パッケージマネージャー（ライブラリ管理ツール）</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span>npx - パッケージの一時実行ツール</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Installation Steps */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            インストール手順
          </h2>

          {selectedOS === 'mac' ? (
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground self-center">
                    Homebrew で Node.js をインストール
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Git のインストール時に Homebrew をインストール済みであれば、以下のコマンドで Node.js をインストールできます。
                </p>

                <CodeBlock
                  code={`brew install node`}
                  language="bash"
                  title="Node.js インストールコマンド"
                />

                <InfoBox type="info" title="ターミナルの使い方">
                  上のコードをコピー（Cmd + C）して、ターミナルに貼り付け（Cmd + V）し、Enter キーを押してください。
                </InfoBox>
              </div>

              {/* Step 2 */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground self-center">
                    インストール確認
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  以下のコマンドを実行して、Node.js と npm がインストールされたか確認します。
                </p>

                <CodeBlock
                  code={`node --version\nnpm --version`}
                  language="bash"
                  title="Node.js と npm バージョン確認"
                />

                <p className="text-muted-foreground mt-4">
                  実行結果に「v18.x.x」や「v20.x.x」のようにバージョン番号が表示されれば、インストール成功です。
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground self-center">
                    Node.js をダウンロード
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  以下のリンクから Node.js をダウンロードしてください。LTS（Long Term Support）版をお勧めします。
                </p>
                <a
                  href="https://nodejs.org/en/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Download size={18} />
                  Node.js ダウンロード
                </a>
              </div>

              {/* Step 2 */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground self-center">
                    インストーラーを実行
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  ダウンロードされた node-vxx.x.x-x64.msi をダブルクリックして実行します。
                </p>
                <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                  <li>インストールウィザードが表示されます</li>
                  <li>「Next」をクリックして進めます</li>
                  <li>デフォルト設定のままで問題ありません</li>
                  <li>「Install」をクリックしてインストールを開始</li>
                </ol>
              </div>

              {/* Step 3 */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground self-center">
                    インストール確認
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  PowerShell を開いて、以下のコマンドを実行してください。
                </p>

                <CodeBlock
                  code={`node --version\nnpm --version`}
                  language="powershell"
                  title="Node.js と npm バージョン確認"
                />

                <p className="text-muted-foreground mt-4">
                  実行結果に「v18.x.x」や「v20.x.x」のようにバージョン番号が表示されれば、インストール成功です。
                </p>
              </div>
            </div>
          )}
        </section>

        {/* npm について */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            npm について
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-muted-foreground">
              npm は、Node.js に付属するパッケージマネージャーです。React などのライブラリをインストール・管理するために使用します。
            </p>

            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
              <h3 className="font-semibold text-foreground mb-3">npm の役割</h3>
              <p className="text-muted-foreground">
                npm は、他の人が作成したコード（ライブラリ）をダウンロードして、自分のプロジェクトで使えるようにするツールです。React、Vue、Angular などのフレームワークも npm でインストールします。
              </p>
            </div>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="Node.js と npm のバージョン確認コマンドを書いてみよう"
            description="Node.js と npm がインストールされたか確認するためのコマンドを書いてください。"
            initialCode={`# Node.js のバージョンを確認\n\n# npm のバージョンを確認\n`}
            answer={`# Node.js のバージョンを確認\nnode --version\n\n# npm のバージョンを確認\nnpm --version`}
            keywords={['node', '--version', 'npm']}
            hints={[
              'node コマンドに --version オプションを付けます',
              'npm も同じく --version オプションでバージョンを確認できます',
            ]}
            preview
          />
        </section>

        {/* Completion */}
        <section className="mb-12">
          <InfoBox type="success" title="環境準備完了！">
            Cursor、Git、Node.js のインストールが完了しました。次は GitHub アカウントを作成して、実際に開発を始めます。
          </InfoBox>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/git/environment/git')}>戻る</Button>
          <Button className="gap-2" onClick={() => navigate('/git/github/account')}>
              次へ：GitHub アカウント作成
              
              <ArrowRight size={20} />
            </Button>
        </div>
      </div>
    </div>
  );
}
