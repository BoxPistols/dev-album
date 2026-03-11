import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import { useOS } from '@/contexts/OSContext';
import OSToggle from '@/components/OSToggle';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function Prerequisites() {
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
            前提知識
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            tmuxを学ぶ前に、ターミナルの基本的な操作を理解しておくことが重要です。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              必要な前提知識
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              このマニュアルを進める前に、以下の知識があると学習がスムーズです。
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                <h3 className="font-semibold text-foreground mb-2">✓ ターミナルの基本操作</h3>
                <p className="text-muted-foreground">
                  cd、ls、mkdir、rm などの基本コマンドを使ったことがある
                </p>
              </div>

              <div className="p-4 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                <h3 className="font-semibold text-foreground mb-2">✓ ファイルエディタの使用経験</h3>
                <p className="text-muted-foreground">
                  vim、nano、またはその他のテキストエディタでファイルを編集したことがある
                </p>
              </div>

              <div className="p-4 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                <h3 className="font-semibold text-foreground mb-2">✓ 環境変数の概念</h3>
                <p className="text-muted-foreground">
                  PATH、HOME などの基本的な環境変数について理解している
                </p>
              </div>

              <div className="p-4 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                <h3 className="font-semibold text-foreground mb-2">✓ プロセスの概念</h3>
                <p className="text-muted-foreground">
                  バックグラウンドプロセス、フォアグラウンドプロセスの違いを理解している
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              初心者向けのヒント
            </h2>

            <InfoBox type="info" title="心配不要です">
              上記の知識がない場合でも、このマニュアルを進めることはできます。わからない用語が出てきたら、その都度調べながら進めてください。学習の過程で自然と身につきます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ターミナルの動作確認
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              以下のコマンドを実行して、ターミナルが正しく動作していることを確認してください。
            </p>

            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  基本的なコマンド確認
                </h3>
                <CodeBlock
                  code={`# 現在のディレクトリを表示
$ pwd
/Users/username

# ホームディレクトリのファイル一覧を表示
$ ls ~
Desktop    Documents  Downloads  Library    Movies     Music      Pictures

# 環境変数を確認
$ echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`}
                  language="bash"
                />
              </div>

              <InfoBox type="success" title="確認完了">
                上記のコマンドが実行できれば、ターミナルの基本的な操作は問題ありません。
              </InfoBox>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              OS環境の確認
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              お使いのOSを選択して、確認コマンドを確認しましょう。
            </p>

            <OSToggle />

            <div className="space-y-4 animate-in fade-in duration-500">
              {selectedOS === 'mac' ? (
                <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    macOS の確認
                  </h3>
                  <CodeBlock
                    code={`# macOSのバージョン確認
$ sw_vers
ProductName:            macOS
ProductVersion:         14.x.x`}
                    language="bash"
                  />
                </div>
              ) : (
                <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Windows (WSL2) / Linux の確認
                  </h3>
                  <CodeBlock
                    code={`# Linuxのバージョン確認
$ lsb_release -a
Distributor ID: Ubuntu
Release:        22.04`}
                    language="bash"
                  />
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              次のステップ
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              前提知識の確認が完了したら、次のステップでは実際にtmuxをインストールします。
            </p>

            <InfoBox type="success" title="準備完了">
              ターミナルの基本操作が確認できたら、次のページに進んでtmuxをインストールしましょう。
            </InfoBox>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="ターミナルの基本を確認しよう"
            description="tmux を学ぶ前に必要な基本的なターミナルコマンドを書いてください。カレントディレクトリの表示、ファイル一覧、環境変数の確認を行いましょう。"
            initialCode={`# ターミナルの基本確認\n\n# 1. 現在のディレクトリを表示\n\n# 2. ホームディレクトリのファイル一覧\n\n# 3. PATH 環境変数を表示\n\n# 4. シェルの種類を確認`}
            answer={`# ターミナルの基本確認\n\n# 1. 現在のディレクトリを表示\npwd\n\n# 2. ホームディレクトリのファイル一覧\nls ~\n\n# 3. PATH 環境変数を表示\necho $PATH\n\n# 4. シェルの種類を確認\necho $SHELL`}
            hints={[
              'pwd は Print Working Directory の略です',
              '~ はホームディレクトリを表します',
              '$変数名 で環境変数の値を参照できます',
            ]}
            keywords={['pwd', 'ls', 'echo', 'PATH']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
