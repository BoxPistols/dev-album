import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import { useOS } from '@/contexts/OSContext';
import OSToggle from '@/components/OSToggle';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function InstallTmux() {
  const { selectedOS } = useOS();

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
            tmuxのインストール
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            お使いのOSを選択して、tmuxをインストールしましょう。
          </p>

          <OSToggle />
        </div>

        <div className="space-y-12 mt-8">
          {selectedOS === 'mac' ? (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                macOS でのインストール
              </h2>

              <p className="text-foreground mb-8 leading-relaxed">
                macOSではHomebrewを使用してインストールするのが最も簡単です。
              </p>

              <div className="space-y-4">
                <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    ステップ 1: Homebrewの確認
                  </h3>
                  <p className="text-foreground mb-4">
                    まず、Homebrewがインストールされているか確認します。
                  </p>
                  <CodeBlock
                    code={`$ brew --version
Homebrew 4.x.x`}
                    language="bash"
                  />
                </div>

                <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    ステップ 2: tmuxのインストール
                  </h3>
                  <CodeBlock
                    code={`$ brew install tmux`}
                    language="bash"
                  />
                </div>

                <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    ステップ 3: インストール確認
                  </h3>
                  <CodeBlock
                    code={`$ tmux -V
tmux 3.3a (またはそれ以降)`}
                    language="bash"
                  />
                </div>
              </div>
            </section>
          ) : (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Windows (WSL2) でのインストール
              </h2>

              <p className="text-foreground mb-8 leading-relaxed">
                Windows Subsystem for Linux 2 (WSL2) 上の Ubuntu 等で実行します。
              </p>

              <div className="space-y-4">
                <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    ステップ 1: パッケージリストの更新
                  </h3>
                  <CodeBlock
                    code={`$ sudo apt update`}
                    language="bash"
                  />
                </div>

                <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    ステップ 2: tmuxのインストール
                  </h3>
                  <CodeBlock
                    code={`$ sudo apt install tmux`}
                    language="bash"
                  />
                </div>

                <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    ステップ 3: インストール確認
                  </h3>
                  <CodeBlock
                    code={`$ tmux -V
tmux 3.x.x`}
                    language="bash"
                  />
                </div>
              </div>

              <InfoBox type="info" title="WSL2のヒント">
                Windowsユーザーの場合、PowerShellやコマンドプロンプトではなく、必ずWSL2のターミナル（Ubuntu等）を開いて実行してください。
              </InfoBox>
            </section>
          )}

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              次のステップ
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              tmux のインストールが完了したら、次のステップでは実際に tmux を起動して、動作を確認します。
            </p>

            <InfoBox type="success" title="インストール完了">
              tmux のバージョンが表示されたら、インストールは成功です。次のページに進みましょう。
            </InfoBox>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="tmux のインストールコマンドを書こう"
            description="macOS と Linux の両方で tmux をインストールするコマンドを書いてください。インストール後の確認コマンドも含めましょう。"
            initialCode={`# tmux のインストール\n\n# macOS (Homebrew)\n\n# Linux (apt)\n\n# インストール確認`}
            answer={`# tmux のインストール\n\n# macOS (Homebrew)\nbrew install tmux\n\n# Linux (apt)\nsudo apt update && sudo apt install tmux\n\n# インストール確認\ntmux -V`}
            hints={[
              'macOS では Homebrew を使います（brew install）',
              'Linux では apt パッケージマネージャーを使います',
              '-V（大文字）でバージョンを確認できます',
            ]}
            keywords={['brew install', 'apt install', 'tmux -V']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
