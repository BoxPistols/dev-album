import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';
import { Monitor, Apple } from 'lucide-react';
import { usePlatform } from '@/contexts/PlatformContext';

export default function Setup() {
  const { platform, setPlatform } = usePlatform();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 2
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          環境構築
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React の開発に必要なツールをインストールし、最初のプロジェクトを作成して、
          ブラウザに「Hello」を表示するところまで進めましょう。
        </p>

        {/* OS 切り替えタブ */}
        <div className="flex p-1 bg-muted rounded-xl mb-8 w-fit">
          <button
            onClick={() => setPlatform('mac')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              platform === 'mac'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Apple size={16} />
            macOS
          </button>
          <button
            onClick={() => setPlatform('windows')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              platform === 'windows'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Monitor size={16} />
            Windows
          </button>
        </div>

        <WhyNowBox tags={['Terminal', 'Node.js', 'Volta', 'pnpm', 'VS Code']}>
          <p>
            料理をする前にキッチンを整えるように、コードを書く前に開発環境を整えます。
            デザイナーにとって最大の難所は「ターミナル（黒い画面）」かもしれませんが、
            一度セットアップしてしまえば、あとは決まったコマンドを打つだけです。
            {platform === 'mac' ? 'Mac なら標準の「ターミナル」' : 'Windows なら「PowerShell」'} を使って進めていきましょう。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 1. ターミナルの準備 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">1. {platform === 'mac' ? 'ターミナル' : 'PowerShell'} の準備</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ターミナル（または PowerShell）は、文字でパソコンに命令を出す道具です。
              React の開発では必須となります。
            </p>

            {platform === 'mac' ? (
              <div className="rounded-xl border border-border bg-card p-6 mb-6">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2 text-lg">
                  macOS: ターミナル
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Mac に最初から入っている「ターミナル」アプリを使います。
                  背景が黒や白のシンプルな画面ですが、ここで全てのツールを操作します。
                </p>
                <div className="bg-slate-950 rounded-lg p-4 mb-4 border border-slate-800">
                  <div className="flex gap-1.5 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <code className="text-slate-300 text-sm">
                    Last login: Tue Mar 10 10:00:00 on ttys000<br />
                    user@MacBook-Pro ~ % _
                  </code>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                  <li><strong>起動方法:</strong> Cmd + Space で「terminal」と検索</li>
                  <li><strong>見た目:</strong> 白または黒の背景に、最後に <code className="bg-muted px-1 rounded">%</code> が表示されます</li>
                </ul>
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card p-6 mb-6">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2 text-lg">
                  Windows: PowerShell
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Windows では「PowerShell（パワーシェル）」がターミナルの役割を果たします。
                  見た目は青色または黒色の画面です。
                </p>
                <div className="bg-indigo-950 rounded-lg p-4 mb-4 border border-indigo-900 shadow-inner">
                  <div className="flex justify-between items-center mb-3 border-b border-indigo-900 pb-2">
                    <span className="text-[10px] text-indigo-300 font-mono">Windows PowerShell</span>
                    <div className="flex gap-3">
                      <div className="w-2 h-0.5 bg-indigo-300" />
                      <div className="w-2.5 h-2.5 border border-indigo-300" />
                      <div className="text-indigo-300 text-xs mt-[-4px]">×</div>
                    </div>
                  </div>
                  <code className="text-indigo-100 text-sm">
                    Windows PowerShell<br />
                    Copyright (C) Microsoft Corporation. All rights reserved.<br /><br />
                    PS C:\Users\YourName&gt; _
                  </code>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                  <li><strong>起動方法:</strong> Winキー で「PowerShell」と検索</li>
                  <li><strong>見た目:</strong> 青または黒の背景に、最初に <code className="bg-muted px-1 rounded">PS</code> と表示されます</li>
                </ul>
              </div>
            )}

            <h3 className="text-xl font-bold text-foreground mb-4">基本コマンド</h3>
            <CodeBlock
              code={`# フォルダを移動する (Change Directory)
cd フォルダ名

# 一つ上のフォルダに戻る
cd ..

# コマンドを中断する / サーバーを止める
Ctrl + C`}
              language="bash"
              title={platform === 'mac' ? 'ターミナル' : 'PowerShell'}
            />
          </section>

          {/* 2. Git のインストール */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">2. Git のインストール</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              プログラムの変更履歴を記録するツールです。React プロジェクトの作成に必要です。
            </p>

            {platform === 'mac' ? (
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-bold text-foreground mb-3">macOS での導入</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  標準で入っていることが多いですが、一度確認しましょう。
                </p>
                <CodeBlock code="git --version" language="bash" title="ターミナル" />
                <p className="text-xs text-muted-foreground mt-3">
                  ※インストールを促すダイアログが出たら、指示に従って進めてください。
                </p>
              </div>
            ) : (
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-bold text-foreground mb-3 text-lg">Windows での導入</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  公式サイトから「Git for Windows」をダウンロードしてインストールしてください。
                </p>
                <a
                  href="https://git-scm.com/download/win"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Git for Windows をダウンロード
                </a>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                  ※インストールの設定は、全て「Next（デフォルト）」のままで大丈夫です。
                </p>
              </div>
            )}
          </section>

          {/* 3. Node.js のインストール */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">3. Node.js のインストール</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React を動かすためのエンジンです。
              <strong>Volta（ボルタ）</strong> という管理ツールを使うと、後の作業が非常に楽になります。
            </p>

            <div className="space-y-6">
              {platform === 'mac' ? (
                <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Apple size={18} />
                    macOS: Volta のインストール
                  </h3>
                  <ol className="text-sm text-muted-foreground space-y-4 list-decimal pl-5">
                    <li>
                      <p className="font-medium text-foreground mb-1">Homebrew をインストール（未導入の場合）</p>
                      <CodeBlock
                        code={`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`}
                        language="bash"
                        title="ターミナル"
                      />
                    </li>
                    <li>
                      <p className="font-medium text-foreground mb-1">Volta をインストール</p>
                      <CodeBlock
                        code={`brew install volta`}
                        language="bash"
                        title="ターミナル"
                      />
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-primary/20 bg-primary/5 shadow-sm">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Monitor size={18} />
                    Windows: Volta のインストール
                  </h3>
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-5 border border-primary/10 mb-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      公式サイトからインストーラーをダウンロードして実行します。
                    </p>
                    <a
                      href="https://volta.sh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded hover:bg-slate-700 transition-colors"
                    >
                      Volta 公式サイト (volta.sh)
                    </a>
                    <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                      "Windows Installer" をダウンロードして実行し、完了後に<strong>PCを再起動</strong>してください。
                    </p>
                  </div>
                </div>
              )}

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">Node.js を有効化する</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Volta が入ったら、以下のコマンドを 1 行打つだけで Node.js が使えるようになります。
                </p>
                <CodeBlock
                  code={`# 最新の安定版を固定
volta install node@lts

# インストール確認
node --version`}
                  language="bash"
                  title={platform === 'mac' ? 'ターミナル' : 'PowerShell'}
                />
              </div>
            </div>
          </section>

          {/* 4. pnpm のインストール */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">4. pnpm のインストール</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ライブラリを追加するためのツールです。
            </p>

            <CodeBlock
              code={`# pnpm をインストール
volta install pnpm

# インストール確認
pnpm --version`}
              language="bash"
              title={platform === 'mac' ? 'ターミナル' : 'PowerShell'}
            />
          </section>

          {/* 5. VS Code */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">5. エディタのセットアップ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              コードを書くためのエディタ、<strong>VS Code</strong> をインストールします。
            </p>
            <a
              href="https://code.visualstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-bold rounded-lg hover:bg-muted transition-colors"
            >
              VS Code をダウンロード
            </a>
            <div className="mt-6">
              <InfoBox type="info" title="おすすめ拡張機能">
                <p className="text-sm">
                  「Prettier」「ESLint」「Tailwind CSS IntelliSense」を入れておくと開発が楽になります。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* 6. 最初のプロジェクト */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">6. 最初のプロジェクトを作成</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              いよいよ React アプリを作ります。
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">1. フォルダを作成して移動</p>
                <CodeBlock
                  code={`mkdir -p ~/projects
cd ~/projects`}
                  language="bash"
                  title={platform === 'mac' ? 'ターミナル' : 'PowerShell'}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">2. Vite プロジェクトを作成</p>
                <CodeBlock
                  code={`pnpm create vite my-app --template react-ts`}
                  language="bash"
                  title={platform === 'mac' ? 'ターミナル' : 'PowerShell'}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">3. 起動する</p>
                <CodeBlock
                  code={`cd my-app
pnpm install
pnpm dev`}
                  language="bash"
                  title={platform === 'mac' ? 'ターミナル' : 'PowerShell'}
                />
              </div>
            </div>

            <InfoBox type="success" title="成功！">
              <p className="text-sm">
                ブラウザで <code className="bg-muted px-1 rounded">http://localhost:5173</code> を開いて、画面が表示されれば完了です。
              </p>
            </InfoBox>
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">まとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{platform === 'mac' ? 'ターミナル' : 'PowerShell'} の使い方がわかった</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Git、Node.js (Volta)、pnpm をインストールした</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>最初の React アプリがブラウザで動いた</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Node.js 公式サイト',
                  url: 'https://nodejs.org/',
                  description: 'Node.js のダウンロードとドキュメント',
                },
                {
                  title: 'Volta - JavaScript ツールマネージャー',
                  url: 'https://volta.sh/',
                  description: 'Node.js バージョン管理ツール',
                },
                {
                  title: 'Vite 公式ドキュメント',
                  url: 'https://vite.dev/guide/',
                  description: 'Vite によるプロジェクト作成と設定',
                },
                {
                  title: 'pnpm 公式ドキュメント',
                  url: 'https://pnpm.io/ja/',
                  description: '高速なパッケージマネージャー',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
