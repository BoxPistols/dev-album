import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';

/**
 * 実践的な環境構築 - VSCode 導入
 * デザイン方針: ジャーニーマップ
 * - VSCode のインストール
 * - 拡張機能の導入
 * - WSL2 統合（Windows ユーザー向け）
 * - ターミナル統合
 */

export default function VSCodeSetup() {
  const { selectedOS } = useOS();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 21 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            VSCode を導入しよう
          </h1>
          <p className="text-lg text-muted-foreground">
            軽量で拡張性の高いエディタ VSCode をセットアップします。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* OS Toggle */}
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* What is VSCode */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            VSCode とは
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              VSCode（Visual Studio Code）は、Microsoft が開発した無料のコードエディタです。軽量で高速、拡張機能が豊富で、プロの開発者からも愛用されています。
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">VSCode の特徴</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-muted-foreground">軽量で高速（起動が早い）</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-muted-foreground">豊富な拡張機能（テーマ、言語サポート、ツール連携）</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-muted-foreground">Git との統合</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-muted-foreground">ターミナル統合</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-muted-foreground">Windows、Mac、Linux で動作</span>
                </li>
              </ul>
            </div>
            <InfoBox type="info">
              Cursor と VSCode は異なるエディタですが、どちらでも開発できます。Cursor は AI 機能が強力で、VSCode は拡張機能が豊富です。
            </InfoBox>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            インストール手順
          </h2>

          {selectedOS === 'mac' ? (
            <>
              <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    VSCode 公式サイトにアクセス
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  以下のリンクから VSCode の公式サイトにアクセスしてください。
                </p>
                <div className="bg-muted/50 border border-border rounded p-4">
                  <p className="text-lg text-foreground">
                    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      https://code.visualstudio.com/
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Mac 版をダウンロード
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  ページの「Download」ボタンをクリックすると、Mac 版の VSCode がダウンロードされます。
                </p>
                <InfoBox type="info">
                  M1/M2 Mac と Intel Mac の両方に対応しています。自動的に正しいバージョンがダウンロードされます。
                </InfoBox>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    インストール
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  ダウンロードされた Visual Studio Code.app をアプリケーションフォルダにドラッグ&ドロップします。
                </p>
                <ol className="space-y-3 list-decimal list-inside">
                  <li className="text-muted-foreground">ダウンロードフォルダから Visual Studio Code.app を見つける</li>
                  <li className="text-muted-foreground">Finder でアプリケーションフォルダを開く</li>
                  <li className="text-muted-foreground">Visual Studio Code.app をアプリケーションフォルダにドラッグ&ドロップ</li>
                </ol>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    4
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    VSCode を起動
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  アプリケーションフォルダから VSCode をダブルクリックして起動します。
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    VSCode 公式サイトにアクセス
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  以下のリンクから VSCode の公式サイトにアクセスしてください。
                </p>
                <div className="bg-muted/50 border border-border rounded p-4">
                  <p className="text-lg text-foreground">
                    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      https://code.visualstudio.com/
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Windows 版をダウンロード
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  ページの「Download」ボタンをクリックすると、Windows 版の VSCode がダウンロードされます。
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    インストーラーを実行
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  ダウンロードされた VSCodeUserSetup-x64-x.xx.x.exe をダブルクリックして実行します。
                </p>
                <InfoBox type="info">
                  インストール中に「PATH に追加」というオプションが表示されたら、チェックを入れておくと便利です。
                </InfoBox>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    4
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    VSCode を起動
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  インストール完了後、VSCode が自動的に起動します。
                </p>
              </div>
            </>
          )}
        </section>

        {/* Extensions */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            おすすめの拡張機能
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              VSCode の拡張機能を追加することで、開発効率が大幅に向上します。以下のおすすめ拡張機能をインストールしましょう。
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold text-foreground mb-2">Git Graph</h3>
                <p className="text-lg text-muted-foreground">Git のコミット履歴をグラフで視覚化します。ブランチの流れが一目で分かります。</p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold text-foreground mb-2">Prettier</h3>
                <p className="text-lg text-muted-foreground">コードを自動的にフォーマットしてくれます。コードの見た目を統一できます。</p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold text-foreground mb-2">ES7+ React/Redux/React-Native snippets</h3>
                <p className="text-lg text-muted-foreground">React のコード補完が充実します。開発速度が上がります。</p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold text-foreground mb-2">Thunder Client</h3>
                <p className="text-lg text-muted-foreground">API のテストができます。Postman のような機能を VSCode 内で使えます。</p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold text-foreground mb-2">Remote - WSL (Windows のみ)</h3>
                <p className="text-lg text-muted-foreground">WSL2 内のプロジェクトを VSCode で直接編集できます。Windows ユーザー必須です。</p>
              </div>
            </div>

            <InfoBox type="info">
              拡張機能をインストールするには、VSCode の左サイドバーの「拡張機能」アイコンをクリックして、検索してインストールします。
            </InfoBox>
          </div>
        </section>

        {/* WSL2 Integration */}
        {selectedOS === 'windows' && (
          <section className="mb-12">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
              WSL2 との統合（Windows ユーザー向け）
            </h2>
            <div className="bg-card border border-border rounded-lg p-8 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                VSCode を WSL2 と統合することで、Windows から Linux 環境のプロジェクトをシームレスに編集できます。
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">手順 1: Remote - WSL 拡張機能をインストール</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    VSCode の拡張機能マーケットプレイスから「Remote - WSL」を検索してインストールします。
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">手順 2: WSL2 で VSCode を開く</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    WSL2 のターミナルで、プロジェクトフォルダに移動して以下のコマンドを実行します。
                  </p>
                  <CodeBlock
                    code={`code .`}
                    language="bash"
                    title="WSL2 から VSCode を開く"
                  />
                  <p className="text-lg text-muted-foreground mt-4">
                    VSCode が起動し、WSL2 内のプロジェクトが表示されます。
                  </p>
                </div>

                <InfoBox type="success">
                  これで、Windows のファイルシステムと Linux のツール（Git、Node.js など）の両方を活用できます。
                </InfoBox>
              </div>
            </div>
          </section>
        )}

        {/* Terminal Integration */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            ターミナル統合
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              VSCode には統合ターミナルがあり、エディタを離れずにコマンドを実行できます。
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">ターミナルを開く</h3>
              <p className="text-lg text-muted-foreground mb-4">
                メニューから「ターミナル」→「新しいターミナル」を選択するか、Ctrl+` キーを押します。
              </p>
              <CodeBlock
                code={`# ターミナルが開いたら、以下のコマンドが使えます
git status
npm run dev
node app.js`}
                language="bash"
                title="VSCode 統合ターミナルでのコマンド実行"
              />
              <InfoBox type="info">
                統合ターミナルを使うことで、エディタとターミナルを切り替える手間が減ります。
              </InfoBox>
            </div>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="VSCode の統合ターミナルでコマンドを実行してみよう"
            description="VSCode のターミナルで Git の状態確認と開発サーバーの起動コマンドを書いてください。"
            initialCode={`# 1. Git の状態を確認\n\n# 2. 開発サーバーを起動\n\n# 3. VSCode でプロジェクトを開く\n`}
            answer={`# 1. Git の状態を確認\ngit status\n\n# 2. 開発サーバーを起動\nnpm run dev\n\n# 3. VSCode でプロジェクトを開く\ncode .`}
            keywords={['git status', 'npm run dev', 'code .']}
            hints={[
              'git status で変更ファイルの状態を確認します',
              'npm run dev で開発サーバーを起動します',
              'code . で現在のフォルダを VSCode で開きます',
            ]}
            preview
          />
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
            <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
              次のステップ
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              VSCode のセットアップが完了しました。これで実践的な開発環境が整いました。次は、すべてを統合して最初のプロジェクトを作成しましょう。
            </p>
            <Button
              onClick={() => navigate('/git/advanced/integration')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              開発環境の統合へ進む
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
