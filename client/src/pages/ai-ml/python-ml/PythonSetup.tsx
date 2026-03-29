import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function PythonSetup() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="step-badge">STEP 4</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          Python 環境構築
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          ML のライブラリを使うために、Python の開発環境を整えましょう。
          pyenv と venv による管理方法を中心に解説します。
        </p>

        <WhyNowBox tags={['Python', 'pyenv', 'venv', 'pip']}>
          <p>
            ML のライブラリは Python が圧倒的に豊富です。
            scikit-learn、PyTorch、TensorFlow など主要なフレームワークはすべて Python で利用できます。
            バージョン管理と仮想環境を最初に整備しておくことで、ライブラリの競合やトラブルを防げます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* インストール方法の比較 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Python インストール方法の比較</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Python のインストール方法はいくつかあります。
              目的や開発スタイルに合った方法を選びましょう。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-4 font-bold text-foreground bg-muted/50" style={{ minWidth: '140px' }}>
                      方法
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground bg-muted/50" style={{ minWidth: '180px' }}>
                      特徴
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground bg-muted/50" style={{ minWidth: '160px' }}>
                      向いている人
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">python.org（公式）</td>
                    <td className="py-3 px-4 text-muted-foreground">公式インストーラ。シンプルだがバージョン切替が手動</td>
                    <td className="py-3 px-4 text-muted-foreground">入門者、単一バージョンで十分な場合</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">pyenv</td>
                    <td className="py-3 px-4 text-muted-foreground">複数バージョンの管理・切替が容易。軽量</td>
                    <td className="py-3 px-4 text-muted-foreground">Web 開発者、複数プロジェクトを扱う人</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">Anaconda / Miniconda</td>
                    <td className="py-3 px-4 text-muted-foreground">データサイエンス系パッケージが同梱。conda で環境管理</td>
                    <td className="py-3 px-4 text-muted-foreground">データサイエンティスト、研究者</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="このマニュアルの推奨">
              <p>
                Web 開発者には <strong>pyenv + venv</strong> の組み合わせを推奨します。
                軽量でバージョン管理がしやすく、既存の開発環境と競合しにくいのが利点です。
              </p>
            </InfoBox>
          </section>

          {/* pyenv のインストール */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">pyenv で Python をインストール</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              pyenv は Python のバージョン管理ツールです。
              プロジェクトごとに異なるバージョンの Python を使い分けることができます。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">1. pyenv のインストール</h3>
            <CodeBlock
              code={`# macOS（Homebrew）
brew install pyenv

# Linux / WSL
curl https://pyenv.run | bash`}
              language="bash"
              title="pyenv のインストール"
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">2. シェル設定の追加</h3>
            <CodeBlock
              code={`# ~/.zshrc または ~/.bashrc に追加
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"`}
              language="bash"
              title="シェル設定（.zshrc / .bashrc）"
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">3. Python のインストールと設定</h3>
            <CodeBlock
              code={`# インストール可能なバージョンを確認
pyenv install --list | grep "3.11"

# Python 3.11 をインストール
pyenv install 3.11.8

# グローバルのデフォルトバージョンを設定
pyenv global 3.11.8

# バージョンを確認
python --version
# Python 3.11.8`}
              language="bash"
              title="Python のインストールとバージョン設定"
            />
          </section>

          {/* venv による仮想環境 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">venv で仮想環境を作る</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              venv は Python 標準の仮想環境ツールです。
              プロジェクトごとに独立したパッケージ環境を作ることで、
              ライブラリのバージョン競合を防ぎます。
            </p>

            <CodeBlock
              code={`# プロジェクトディレクトリに移動
cd my-ml-project

# 仮想環境を作成（.venv ディレクトリが生成される）
python -m venv .venv

# 仮想環境を有効化
# macOS / Linux
source .venv/bin/activate

# Windows（PowerShell）
# .venv\Scripts\Activate.ps1

# 有効化されると、プロンプトに (.venv) が表示される
(.venv) $ python --version

# 仮想環境を無効化するとき
deactivate`}
              language="bash"
              title="仮想環境の作成と有効化"
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">ML ライブラリのインストール</h3>
            <CodeBlock
              code={`# 仮想環境を有効化した状態で実行
pip install numpy pandas matplotlib scikit-learn

# インストール済みパッケージの確認
pip list

# requirements.txt に書き出し（チームで共有するため）
pip freeze > requirements.txt

# 別の環境で同じパッケージを復元
pip install -r requirements.txt`}
              language="bash"
              title="ライブラリのインストールと管理"
            />

            <InfoBox type="warning" title=".venv を Git に含めない">
              <p>
                仮想環境のディレクトリ（.venv）は .gitignore に追加しましょう。
                環境そのものではなく、requirements.txt を共有することでチーム間の再現性を確保します。
              </p>
            </InfoBox>
          </section>

          {/* VS Code 設定 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">VS Code + Python 拡張機能</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              VS Code に Python 拡張機能をインストールすると、
              コード補完、リント、デバッグ、Jupyter Notebook の実行が可能になります。
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">Python 拡張機能をインストール</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    VS Code の拡張機能パネルで「Python」を検索し、Microsoft 公式の拡張機能をインストール。
                    Pylance（型チェック・補完）も自動で含まれる。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">Python インタープリタを選択</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    コマンドパレット（Cmd+Shift+P）で「Python: Select Interpreter」を実行し、
                    .venv 内の Python を選択する。これにより補完やリントが仮想環境のパッケージを参照する。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">動作確認</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    .py ファイルを作成し、右上の実行ボタンまたはターミナルから <code className="bg-muted px-1 py-0.5 rounded text-xs">python ファイル名.py</code> で実行できることを確認する。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Jupyter Notebook */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Jupyter Notebook の導入</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Jupyter Notebook は、コードの実行結果をセルごとに確認できる対話的な開発環境です。
              データの可視化や試行錯誤に適しており、ML の学習・実験に広く使われています。
            </p>

            <CodeBlock
              code={`# Jupyter のインストール
pip install jupyter

# Notebook を起動（ブラウザが開く）
jupyter notebook

# または VS Code 内で .ipynb ファイルを作成すれば
# VS Code の Jupyter 拡張機能で直接実行可能`}
              language="bash"
              title="Jupyter Notebook のインストールと起動"
            />

            <CodeBlock
              code={`# Notebook のセルで実行するコードの例
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title("sin(x)")
plt.xlabel("x")
plt.ylabel("y")
plt.grid(True)
plt.show()`}
              language="python"
              title="Jupyter Notebook でのグラフ描画例"
            />
          </section>

          {/* Google Colab */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Google Colab（インストール不要の選択肢）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ローカル環境を構築せずに ML を試したい場合は、Google Colab が手軽です。
              ブラウザだけで Jupyter Notebook を実行でき、GPU も無料枠で利用できます。
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground text-sm mb-2">メリット</h4>
                <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                  <li>インストール不要。Google アカウントがあればすぐ開始</li>
                  <li>GPU / TPU が無料枠で利用可能</li>
                  <li>NumPy、pandas、scikit-learn 等が最初から利用可能</li>
                  <li>Google Drive と連携してデータを読み書きできる</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground text-sm mb-2">注意点</h4>
                <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                  <li>セッションは一定時間で切断される（無料枠: 約90分）</li>
                  <li>ランタイムを再起動するとインストールしたパッケージが消える</li>
                  <li>大規模データの処理にはローカル環境のほうが安定する</li>
                  <li>本番運用には向かない（学習・実験用途向き）</li>
                </ul>
              </div>
            </div>

            <InfoBox type="info" title="使い分けの目安">
              <p>
                学習や小規模な実験には Colab、実務や中〜大規模プロジェクトにはローカル環境（pyenv + venv）がおすすめです。
                まずは Colab で試して、慣れてきたらローカル環境に移行するのもよいアプローチです。
              </p>
            </InfoBox>
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="venv は何のために使う？"
              options={[
                { label: 'Python のバージョンを切り替えるため', correct: false },
                { label: 'プロジェクトごとに独立したパッケージ環境を作るため', correct: true },
                { label: 'Python の実行速度を向上させるため', correct: false },
              ]}
              explanation="venv はプロジェクトごとに独立した仮想環境を作り、ライブラリのバージョン競合を防ぐためのツールです。Python のバージョン管理には pyenv を使います。"
            />
          </section>

          {/* Python 2 vs 3 */}
          <section>
            <InfoBox type="warning" title="Python 2 と Python 3">
              <p>
                Python 2 は 2020年1月にサポートが終了しています。
                新規プロジェクトでは必ず Python 3.10 以上を使いましょう。
                古いチュートリアルやコードで <code className="bg-muted px-1 py-0.5 rounded text-xs">print "hello"</code>（括弧なし）
                のような書き方を見かけたら、それは Python 2 の構文です。
                Python 3 では <code className="bg-muted px-1 py-0.5 rounded text-xs">print("hello")</code> と書きます。
              </p>
            </InfoBox>
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Python 公式: venv ドキュメント',
                  url: 'https://docs.python.org/ja/3/library/venv.html',
                  description: 'Python 標準の仮想環境モジュールの公式ガイド',
                },
                {
                  title: 'pyenv GitHub',
                  url: 'https://github.com/pyenv/pyenv',
                  description: 'pyenv のインストール手順と使い方',
                },
                {
                  title: 'VS Code: Python in VS Code',
                  url: 'https://code.visualstudio.com/docs/python/python-tutorial',
                  description: 'VS Code での Python 開発環境セットアップガイド',
                },
                {
                  title: 'Jupyter 公式',
                  url: 'https://jupyter.org/',
                  description: 'Jupyter Notebook / JupyterLab の公式サイト',
                },
              ]}
            />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
