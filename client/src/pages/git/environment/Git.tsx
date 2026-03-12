import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';


/**
 * 環境準備 - Git インストール
 * デザイン方針: ジャーニーマップ
 * - Mac/Windows 両対応のインストール手順
 * - インストール確認方法を提供
 * - ターミナルコマンドをコピペ可能に
 */

export default function GitInstall() {
  const [, navigate] = useLocation();
  const { selectedOS } = useOS();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 4 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            Git をインストールしよう
          </h1>
          <p className="text-lg text-muted-foreground">
            バージョン管理システム Git をインストールします。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* OS Toggle */}
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* What is Git */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Git をインストールする理由
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Git は、ファイルの変更履歴を管理するツールです。このガイドでは、React のコードを Git で管理し、変更内容を GitHub に保存します。Git がなければ、これらの操作ができません。
            </p>
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
                    Homebrew をインストール（Mac）
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Mac では Homebrew というパッケージマネージャーを使って Git をインストールするのが簡単です。まず Homebrew をインストールしましょう。
                </p>

                <p className="text-muted-foreground mb-4">
                  ターミナルを開いて、以下のコマンドをコピー&ペーストして実行してください。
                </p>

                <CodeBlock
                  code={`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`}
                  language="bash"
                  title="Homebrew インストールコマンド"
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
                    Git をインストール
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Homebrew がインストールされたら、以下のコマンドで Git をインストールします。
                </p>

                <CodeBlock
                  code={`brew install git`}
                  language="bash"
                  title="Git インストールコマンド"
                />
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
                  以下のコマンドを実行して、Git がインストールされたか確認します。
                </p>

                <CodeBlock
                  code={`git --version`}
                  language="bash"
                  title="Git バージョン確認コマンド"
                />

                <p className="text-muted-foreground mt-4">
                  実行結果に「git version 2.x.x」のようにバージョン番号が表示されれば、インストール成功です。
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
                    Git for Windows をダウンロード
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  以下のリンクから Git for Windows をダウンロードしてください。
                </p>
                <a
                  href="https://git-scm.com/download/win"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Download size={18} />
                  Git for Windows ダウンロード
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
                  ダウンロードされた Git-x.xx.x-64-bit.exe をダブルクリックして実行します。
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
                  code={`git --version`}
                  language="powershell"
                  title="Git バージョン確認コマンド"
                />

                <p className="text-muted-foreground mt-4">
                  実行結果に「git version 2.x.x」のようにバージョン番号が表示されれば、インストール成功です。
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            トラブルシューティング
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                「git: command not found」と表示される場合
              </h3>
              <p className="text-muted-foreground">
                ターミナル/PowerShell を再起動してから、もう一度コマンドを実行してください。
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                Mac で Homebrew インストール時にエラーが出る場合
              </h3>
              <p className="text-muted-foreground">
                Xcode Command Line Tools が必要な場合があります。以下のコマンドを実行してください。
              </p>
              <CodeBlock
                code={`xcode-select --install`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="Git の初期設定コマンドを書いてみよう"
            description="Git をインストールした後に実行する、ユーザー名とメールアドレスの設定コマンドを書いてください。名前は「Taro」、メールは「taro@example.com」とします。"
            initialCode={`# ユーザー名を設定\n\n# メールアドレスを設定\n`}
            answer={`# ユーザー名を設定\ngit config --global user.name "Taro"\n\n# メールアドレスを設定\ngit config --global user.email "taro@example.com"`}
            keywords={['git config', '--global', 'user.name', 'user.email']}
            hints={[
              'git config --global でグローバル設定ができます',
              'user.name と user.email をそれぞれ設定します',
            ]}
            preview
          />
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <InfoBox type="success">
            Git がインストールできました。次は Node.js をインストールします。
          </InfoBox>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/git/environment/cursor')}>戻る</Button>
          <Button className="gap-2" onClick={() => navigate('/git/environment/nodejs')}>
              次へ：Node.js をインストール
              
              <ArrowRight size={20} />
            </Button>
        </div>
      </div>
    </div>
  );
}
