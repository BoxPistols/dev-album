import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function DeepLearning() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="step-badge">STEP 9</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          ディープラーニング入門
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          ニューラルネットワークの基本構造から CNN・RNN・Transformer の進化、
          PyTorch での実装まで、ディープラーニングの全体像を把握します。
        </p>

        <WhyNowBox tags={['ニューラルネットワーク', 'CNN', 'Transformer', 'PyTorch']}>
          <p>
            ディープラーニング（DL）は画像認識・自然言語処理・LLM の基盤技術です。
            前のステップで scikit-learn による従来の機械学習を体験しました。
            ここからは、より複雑なパターンを学習できるニューラルネットワークの仕組みと、
            PyTorch を使った実装の基本を理解します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ニューラルネットワークの仕組み */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ニューラルネットワークの仕組み</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ニューラルネットワークは、人間の脳の神経細胞（ニューロン）の仕組みを模倣した計算モデルです。
              入力データを受け取り、複数の「層」を通して変換し、最終的に予測を出力します。
            </p>

            {/* 層構造の図解 */}
            <div className="flex items-center justify-center gap-3 md:gap-6 mb-8">
              <div className="rounded-xl border border-border bg-card p-4 text-center min-w-[90px]">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold text-xs">IN</span>
                </div>
                <h4 className="font-bold text-foreground text-xs mb-1">入力層</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">データを受け取る</p>
              </div>

              <span className="text-muted-foreground text-lg">→</span>

              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center min-w-[90px]">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold text-xs">x N</span>
                </div>
                <h4 className="font-bold text-foreground text-xs mb-1">隠れ層</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">特徴を抽出・変換</p>
              </div>

              <span className="text-muted-foreground text-lg">→</span>

              <div className="rounded-xl border border-border bg-card p-4 text-center min-w-[90px]">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold text-xs">OUT</span>
                </div>
                <h4 className="font-bold text-foreground text-xs mb-1">出力層</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">予測を出力</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>「層を深くする」のが「ディープ」ラーニング</strong>です。
              隠れ層を何層も重ねることで、より複雑なパターンを表現できるようになります。
            </p>

            {/* 各概念の説明 */}
            <div className="grid md:grid-cols-2 gap-3 mb-6">
              <div className="rounded-xl border border-border bg-card p-4">
                <h4 className="font-bold text-foreground text-sm mb-1">重み（Weight）</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  各ニューロン間の接続の強さ。学習によって自動的に調整される。
                  重要な入力ほど大きい重みが割り当てられる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <h4 className="font-bold text-foreground text-sm mb-1">バイアス（Bias）</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  各ニューロンの「基準値」を調整するパラメータ。
                  重みとセットで学習される。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <h4 className="font-bold text-foreground text-sm mb-1">活性化関数（ReLU）</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ニューロンの出力に非線形性を加える関数。
                  ReLU は負の値を 0 にし、正の値はそのまま通す。現在最も広く使われている。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <h4 className="font-bold text-foreground text-sm mb-1">損失関数と勾配降下法</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  損失関数は「予測と正解のずれ」を数値化する。
                  勾配降下法は、損失を最小化するように重みを繰り返し更新するアルゴリズム。
                </p>
              </div>
            </div>
          </section>

          {/* CNN → RNN → Transformer の進化 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CNN → RNN → Transformer の進化</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ディープラーニングは、扱うデータの種類に応じて異なるアーキテクチャが発展してきました。
              画像処理の CNN から始まり、時系列の RNN を経て、現在は Transformer が主流です。
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary text-lg font-bold">1</span>
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm">CNN</h3>
                <p className="text-xs text-primary font-medium mb-2">Convolutional Neural Network</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  画像認識の基盤技術。フィルタ（カーネル）を画像上でスライドさせて、
                  エッジや模様などの特徴を段階的に抽出する。
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                    画像認識
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                    物体検出
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary text-lg font-bold">2</span>
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm">RNN</h3>
                <p className="text-xs text-primary font-medium mb-2">Recurrent Neural Network</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  時系列データや文章など、順序のあるデータを処理する。
                  前の出力を次の入力に渡すことで、文脈を保持する。
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                    時系列予測
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                    音声認識
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-3">
                  <span className="text-primary text-lg font-bold">3</span>
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm">Transformer</h3>
                <p className="text-xs text-primary font-medium mb-2">Attention Is All You Need</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Attention 機構で入力全体を並列に処理する。
                  RNN の逐次処理を不要にし、大規模学習を可能にした。LLM の基盤技術。
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                    LLM
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                    翻訳
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                    画像生成
                  </span>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="なぜ Transformer が主流になったのか">
              <p>
                RNN はデータを順番に処理するため、長い文章では学習に時間がかかり、
                遠くの単語間の関係が薄れてしまう問題（勾配消失）がありました。
                Transformer は Attention 機構ですべての単語の関係を一度に計算できるため、
                並列処理による高速化と、長距離の依存関係の学習を両立しています。
              </p>
            </InfoBox>
          </section>

          {/* PyTorch の例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">PyTorch でシンプルなネットワークを書く</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              PyTorch は Meta が開発したディープラーニングフレームワークです。
              Python の書き方に近く、デバッグがしやすいため、研究から実務まで広く使われています。
            </p>

            <h3 className="text-lg font-bold text-foreground mb-3">ネットワークの定義</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">nn.Module</code> を継承してネットワーク構造を定義します。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">__init__</code> で層を定義し、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">forward</code> でデータの流れを記述します。
            </p>

            <CodeBlock
              language="python"
              title="nn.Module でネットワークを定義"
              showLineNumbers
              code={`import torch
import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        # 入力 4次元 → 隠れ層 16ニューロン
        self.fc1 = nn.Linear(4, 16)
        # 隠れ層 16 → 出力 3クラス
        self.fc2 = nn.Linear(16, 3)
        # 活性化関数
        self.relu = nn.ReLU()

    def forward(self, x):
        # 入力 → 隠れ層 → ReLU → 出力
        x = self.fc1(x)    # 線形変換
        x = self.relu(x)   # 活性化関数を適用
        x = self.fc2(x)    # 出力層
        return x

# モデルのインスタンス化
model = SimpleNet()
print(model)`}
            />

            <h3 className="text-lg font-bold text-foreground mb-3 mt-8">学習ループ</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              PyTorch の学習は 4 ステップの繰り返しです。
              forward（順伝播）→ loss（損失計算）→ backward（逆伝播）→ step（重み更新）。
            </p>

            <CodeBlock
              language="python"
              title="学習ループの基本形"
              showLineNumbers
              code={`import torch.optim as optim

# 損失関数: 分類にはクロスエントロピーを使う
criterion = nn.CrossEntropyLoss()
# オプティマイザ: 勾配降下法の改良版（Adam）
optimizer = optim.Adam(model.parameters(), lr=0.01)

# 学習ループ
for epoch in range(100):
    # 1. 順伝播: 入力データから予測を計算
    outputs = model(X_train_tensor)

    # 2. 損失計算: 予測と正解のずれを計算
    loss = criterion(outputs, y_train_tensor)

    # 3. 逆伝播: 各重みの勾配を計算
    optimizer.zero_grad()  # 勾配をリセット
    loss.backward()        # 勾配を計算

    # 4. 重み更新: 勾配方向に重みを調整
    optimizer.step()

    if (epoch + 1) % 20 == 0:
        print(f"Epoch [{epoch+1}/100], Loss: {loss.item():.4f}")`}
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              各エポック（epoch）でデータ全体を 1 回通し、損失が徐々に下がっていくことで学習が進みます。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">zero_grad()</code> を呼ばないと
              前回の勾配が蓄積されてしまうため、毎回リセットが必要です。
            </p>
          </section>

          {/* PyTorch vs TensorFlow */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">PyTorch と TensorFlow の比較</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ディープラーニングの 2 大フレームワークを比較します。
              どちらを選んでも基本的な能力に大差はなく、プロジェクトやチームの方針で決めることが一般的です。
            </p>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left px-4 py-3 font-bold text-foreground">項目</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">PyTorch</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">TensorFlow</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="px-4 py-3 font-medium text-foreground">開発元</td>
                    <td className="px-4 py-3 text-muted-foreground">Meta（旧 Facebook）</td>
                    <td className="px-4 py-3 text-muted-foreground">Google</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3 font-medium text-foreground">計算グラフ</td>
                    <td className="px-4 py-3 text-muted-foreground">動的（Define-by-Run）</td>
                    <td className="px-4 py-3 text-muted-foreground">静的（Eager mode で動的も可）</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3 font-medium text-foreground">デバッグ</td>
                    <td className="px-4 py-3 text-muted-foreground">Python 標準のデバッガが使える</td>
                    <td className="px-4 py-3 text-muted-foreground">TensorBoard が充実</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3 font-medium text-foreground">主な用途</td>
                    <td className="px-4 py-3 text-muted-foreground">研究、プロトタイピング</td>
                    <td className="px-4 py-3 text-muted-foreground">プロダクション、モバイル展開</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3 font-medium text-foreground">学習コスト</td>
                    <td className="px-4 py-3 text-muted-foreground">Python に慣れていれば低い</td>
                    <td className="px-4 py-3 text-muted-foreground">Keras API で入門しやすい</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* GPU と Google Colab */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">GPU と Google Colab</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ディープラーニングでは大量の行列演算を行うため、CPU だけでは学習に時間がかかります。
              GPU（Graphics Processing Unit）は数千のコアを持ち、行列演算を並列に処理できるため、
              学習速度が大幅に向上します。
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground text-sm mb-2">なぜ GPU が必要か</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ニューラルネットワークの学習は、行列の掛け算の繰り返しです。
                  CPU は少数のコアで逐次処理するのに対し、GPU は数千のコアで同時に計算できます。
                  大規模なモデルでは、GPU を使うことで学習時間が数十倍〜数百倍速くなります。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground text-sm mb-2">Google Colab なら無料で GPU</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Google Colab はブラウザ上で Python を実行できる環境で、
                  無料枠で GPU が利用可能です。環境構築が不要なため、
                  ディープラーニングの学習を始めるのに適しています。
                </p>
              </div>
            </div>

            <CodeBlock
              language="python"
              title="PyTorch で GPU を使う"
              showLineNumbers
              code={`# GPU が使えるか確認
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"使用デバイス: {device}")

# モデルとデータを GPU に転送
model = SimpleNet().to(device)
X_tensor = X_tensor.to(device)
y_tensor = y_tensor.to(device)

# あとは通常通り学習するだけ
# GPU 上で自動的に並列計算される`}
            />
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="ディープラーニングの「ディープ」は何を指す？"
              options={[
                { label: '学習データの量が多いこと' },
                { label: 'ニューラルネットワークの層の深さ', correct: true },
                { label: '高い計算精度のこと' },
                { label: '学習にかかる時間の長さ' },
              ]}
              explanation="ディープラーニングの「ディープ」は、ニューラルネットワークの隠れ層を多数重ねること（層が深い）を指します。層を深くすることで、より複雑で抽象的なパターンを段階的に学習できるようになります。"
            />

            <div className="mt-4">
              <InfoBox type="info" title="転移学習 -- 大規模モデルの知識を流用する">
                <p>
                  転移学習（Transfer Learning）は、大量のデータで事前学習された大規模モデルの知識を、
                  別のタスクに流用する手法です。
                  例えば、ImageNet で学習済みの画像認識モデルを土台にして、
                  自分の少量のデータで微調整（Fine-tuning）するだけで高い精度が得られます。
                  ゼロから学習するより大幅にデータ量と計算コストを削減できるため、
                  実務では転移学習を前提にすることが一般的です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'PyTorch 公式チュートリアル',
                  url: 'https://docs.pytorch.org/tutorials/',
                  description: 'PyTorch の公式チュートリアル。初歩から応用まで',
                },
                {
                  title: 'TensorFlow 公式ガイド',
                  url: 'https://www.tensorflow.org/guide',
                  description: 'TensorFlow / Keras の公式ドキュメント',
                },
                {
                  title: 'Google Colab',
                  url: 'https://colab.research.google.com/',
                  description: 'ブラウザ上で Python + GPU を無料で使える環境',
                },
                {
                  title: 'Attention Is All You Need（原論文）',
                  url: 'https://arxiv.org/abs/1706.03762',
                  description: 'Transformer アーキテクチャを提案した 2017 年の論文',
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
