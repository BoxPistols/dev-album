import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function PythonBasics() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="step-badge">STEP 5</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          Python 基本文法
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          JavaScript との違いを意識しながら、ML に必要な Python の基礎を最短で押さえます。
        </p>

        <WhyNowBox tags={['Python', 'ML 基礎', 'JavaScript 比較']}>
          <p>
            機械学習のライブラリ（NumPy、scikit-learn、PyTorch など）はほぼすべて Python で書かれています。
            JavaScript の経験があれば、Python の文法は短時間で習得できます。
            ここでは ML で頻出する文法に絞って、JS との対比で効率的に学びましょう。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* JS vs Python 比較表 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              JavaScript と Python の構文比較
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JS の知識をベースに、Python の構文を対比で確認します。
              最大の違いは「ブロックをインデントで表す」点です。
            </p>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left px-4 py-3 font-semibold text-foreground border-b border-border">項目</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground border-b border-border">JavaScript</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground border-b border-border">Python</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground">変数宣言</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">const x = 10</code></td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">x = 10</code></td>
                  </tr>
                  <tr className="border-b border-border bg-card">
                    <td className="px-4 py-3 font-medium text-foreground">ブロック</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">{'{ }'}</code> 波括弧</td>
                    <td className="px-4 py-3">インデント（スペース4つ）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground">関数定義</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">{'const f = (x) => x * 2'}</code></td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">def f(x): return x * 2</code></td>
                  </tr>
                  <tr className="border-b border-border bg-card">
                    <td className="px-4 py-3 font-medium text-foreground">出力</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">console.log()</code></td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">print()</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground">文字列埋め込み</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">{'`Hello ${name}`'}</code></td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">{'f"Hello {name}"'}</code></td>
                  </tr>
                  <tr className="border-b border-border bg-card">
                    <td className="px-4 py-3 font-medium text-foreground">配列 / リスト</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">[1, 2, 3]</code></td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">[1, 2, 3]</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground">オブジェクト / 辞書</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">{'{a: 1}'}</code></td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">{`{"a": 1}`}</code></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">型システム</td>
                    <td className="px-4 py-3">動的型付け（TS で静的型）</td>
                    <td className="px-4 py-3">動的型付け（型ヒントで補完）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="セミコロンと括弧">
              <p>
                Python ではセミコロンは不要です。行末が文の終わりになります。
                また、<code className="bg-muted px-1 py-0.5 rounded text-xs">if</code> や
                <code className="bg-muted px-1 py-0.5 rounded text-xs">for</code> の条件に括弧は不要です。
              </p>
            </InfoBox>
          </section>

          {/* 変数と型 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              変数とデータ型
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Python は動的型付け言語です。宣言キーワード（const / let）は不要で、
              代入時に型が自動的に決まります。ML でよく使う型を確認しましょう。
            </p>

            <CodeBlock
              code={`# 数値型
x = 42          # int（整数）
y = 3.14        # float（浮動小数点）
z = 1 + 2j      # complex（複素数、信号処理等で使用）

# 文字列
name = "Python"
multi = """複数行の
文字列も書ける"""

# 真偽値（先頭が大文字）
is_trained = True   # JS の true に対応
is_valid = False    # JS の false に対応

# None（JS の null に対応）
result = None

# 型の確認
print(type(x))      # <class 'int'>
print(type(y))      # <class 'float'>
print(type(name))   # <class 'str'>`}
              language="python"
              title="基本的なデータ型"
              showLineNumbers
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
              コレクション型
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Python のコレクションは ML のデータ操作で頻繁に使います。
              特にリスト（list）と辞書（dict）は必須です。
            </p>

            <CodeBlock
              code={`# リスト（JS の Array に対応、ミュータブル）
scores = [85, 92, 78, 95, 88]
scores.append(90)          # 末尾に追加
print(scores[0])           # 85（インデックスは 0 始まり）
print(scores[-1])          # 90（末尾の要素）
print(scores[1:3])         # [92, 78]（スライス：index 1 から 3 の手前まで）

# タプル（イミュータブルなリスト、変更不可）
shape = (28, 28, 1)        # 画像の縦、横、チャンネル数
print(shape[0])            # 28

# 辞書（JS の Object に対応）
config = {
    "learning_rate": 0.001,
    "epochs": 100,
    "batch_size": 32,
}
print(config["epochs"])    # 100
config["optimizer"] = "adam"  # キーの追加

# セット（重複なしの集合）
labels = {0, 1, 2, 3, 4}
labels.add(5)
print(len(labels))         # 6`}
              language="python"
              title="コレクション型"
              showLineNumbers
            />
          </section>

          {/* リスト内包表記 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              リスト内包表記
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              リスト内包表記（list comprehension）は Python の特徴的な構文で、
              ML のデータ前処理やフィルタリングで頻繁に使います。
              JS の <code className="bg-muted px-1 py-0.5 rounded text-xs">array.map()</code> や
              <code className="bg-muted px-1 py-0.5 rounded text-xs">array.filter()</code> に相当しますが、
              より簡潔に書けます。
            </p>

            <CodeBlock
              code={`# 基本形: [式 for 変数 in イテラブル]
squares = [x ** 2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

# JS で書くと: [0,1,2,3,4].map(x => x ** 2)

# 条件付き: [式 for 変数 in イテラブル if 条件]
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]

# JS で書くと: [...Array(10).keys()].filter(x => x % 2 === 0)

# ML での実用例: データの正規化
raw = [100, 200, 300, 400, 500]
max_val = max(raw)
normalized = [x / max_val for x in raw]
print(normalized)  # [0.2, 0.4, 0.6, 0.8, 1.0]

# 辞書内包表記
word_count = {"hello": 3, "world": 5, "python": 2}
frequent = {k: v for k, v in word_count.items() if v >= 3}
print(frequent)  # {'hello': 3, 'world': 5}`}
              language="python"
              title="リスト内包表記と辞書内包表記"
              showLineNumbers
            />

            <InfoBox type="info" title="range() について">
              <p>
                <code className="bg-muted px-1 py-0.5 rounded text-xs">range(5)</code> は 0, 1, 2, 3, 4 を生成します（5 は含まない）。
                <code className="bg-muted px-1 py-0.5 rounded text-xs">range(2, 8)</code> で開始値を指定、
                <code className="bg-muted px-1 py-0.5 rounded text-xs">range(0, 10, 2)</code> でステップ値も指定できます。
              </p>
            </InfoBox>
          </section>

          {/* 関数 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              関数定義
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Python の関数は <code className="bg-muted px-1 py-0.5 rounded text-xs">def</code> キーワードで定義します。
              ML ライブラリでは <code className="bg-muted px-1 py-0.5 rounded text-xs">*args</code> や
              <code className="bg-muted px-1 py-0.5 rounded text-xs">**kwargs</code> がよく使われるため、
              あわせて確認しておきましょう。
            </p>

            <CodeBlock
              code={`# 基本的な関数
def greet(name):
    return f"Hello, {name}!"

print(greet("Python"))  # Hello, Python!

# デフォルト引数（JS のデフォルトパラメータと同じ）
def train(epochs=10, lr=0.001):
    print(f"Training for {epochs} epochs with lr={lr}")

train()              # epochs=10, lr=0.001
train(epochs=50)     # epochs=50, lr=0.001
train(lr=0.01)       # epochs=10, lr=0.01

# *args: 可変長の位置引数（タプルとして受け取る）
def add_all(*args):
    return sum(args)

print(add_all(1, 2, 3, 4))  # 10

# **kwargs: 可変長のキーワード引数（辞書として受け取る）
def build_model(**kwargs):
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

build_model(optimizer="adam", loss="mse", metrics=["accuracy"])

# lambda（JS のアロー関数に近い、1行の無名関数）
square = lambda x: x ** 2
print(square(5))  # 25

# ソートでの lambda 活用
data = [("alice", 85), ("bob", 92), ("carol", 78)]
data.sort(key=lambda x: x[1], reverse=True)
print(data)  # [('bob', 92), ('alice', 85), ('carol', 78)]`}
              language="python"
              title="関数定義と引数パターン"
              showLineNumbers
            />
          </section>

          {/* f-string */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              f-string（フォーマット文字列）
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JS のテンプレートリテラル（バッククォート + ${'{}'}）に相当する機能です。
              文字列の先頭に <code className="bg-muted px-1 py-0.5 rounded text-xs">f</code> を付けると、
              波括弧の中で式を評価できます。
            </p>

            <CodeBlock
              code={`name = "Neural Network"
accuracy = 0.9534
epochs = 100

# 基本的な埋め込み
print(f"Model: {name}")

# 式の評価
print(f"Accuracy: {accuracy * 100}%")  # Accuracy: 95.34%

# 書式指定（ML のログ出力で頻出）
print(f"Accuracy: {accuracy:.2f}")     # Accuracy: 0.95（小数2桁）
print(f"Accuracy: {accuracy:.1%}")     # Accuracy: 95.3%（パーセント表示）
print(f"Epoch: {epochs:04d}")          # Epoch: 0100（ゼロ埋め4桁）

# 複数行
summary = (
    f"Model: {name}\\n"
    f"Epochs: {epochs}\\n"
    f"Accuracy: {accuracy:.2%}"
)
print(summary)`}
              language="python"
              title="f-string の書式指定"
              showLineNumbers
            />
          </section>

          {/* クラス */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              クラスの基礎
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ML ライブラリ（PyTorch、scikit-learn など）ではクラスが多用されます。
              特に PyTorch のモデル定義ではクラスの継承が必須です。
              JS のクラスと概念は同じですが、構文に違いがあります。
            </p>

            <CodeBlock
              code={`class Model:
    # コンストラクタ（JS の constructor に対応）
    def __init__(self, name, layers):
        self.name = name          # self は JS の this に対応
        self.layers = layers
        self.trained = False

    # メソッド（第1引数に self が必要）
    def summary(self):
        status = "trained" if self.trained else "untrained"
        return f"{self.name}: {self.layers} layers ({status})"

    def train(self, epochs=10):
        print(f"Training {self.name} for {epochs} epochs...")
        self.trained = True

# インスタンス化（new キーワード不要）
model = Model("CNN", 5)
print(model.summary())   # CNN: 5 layers (untrained)
model.train(epochs=20)   # Training CNN for 20 epochs...
print(model.summary())   # CNN: 5 layers (trained)

# 継承（ML フレームワークで頻出パターン）
class AdvancedModel(Model):
    def __init__(self, name, layers, dropout=0.5):
        super().__init__(name, layers)  # 親クラスの __init__ を呼ぶ
        self.dropout = dropout

    def summary(self):
        base = super().summary()
        return f"{base}, dropout={self.dropout}"

adv = AdvancedModel("ResNet", 50, dropout=0.3)
print(adv.summary())  # ResNet: 50 layers (untrained), dropout=0.3`}
              language="python"
              title="クラスの定義と継承"
              showLineNumbers
            />

            <InfoBox type="info" title="self について">
              <p>
                Python のメソッドは第1引数に必ず
                <code className="bg-muted px-1 py-0.5 rounded text-xs">self</code> を取ります。
                JS の <code className="bg-muted px-1 py-0.5 rounded text-xs">this</code> に相当しますが、
                明示的に書く必要がある点が異なります。呼び出し時には自動的に渡されるため、
                <code className="bg-muted px-1 py-0.5 rounded text-xs">model.summary()</code> のように
                引数なしで呼べます。
              </p>
            </InfoBox>
          </section>

          {/* 型ヒント */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              型ヒント（Type Hints）
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Python 3.5 以降では型ヒントが使えます。TypeScript と同様に、
              エディタの補完やバグの早期発見に役立ちます。
              ML プロジェクトでもコードの可読性向上のために積極的に使われています。
            </p>

            <CodeBlock
              code={`# 変数の型ヒント
name: str = "Linear Regression"
accuracy: float = 0.95
epochs: int = 100
is_trained: bool = False

# 関数の型ヒント
def train_model(
    data: list[float],
    epochs: int = 10,
    lr: float = 0.001,
) -> dict[str, float]:
    # 訓練ロジック
    return {"loss": 0.05, "accuracy": 0.95}

# リストや辞書の型
scores: list[int] = [85, 92, 78]
config: dict[str, int | float] = {
    "epochs": 100,
    "lr": 0.001,
}

# Optional（None を許容する型）
from typing import Optional

def find_best_model(
    models: list[str],
    metric: str = "accuracy",
) -> Optional[str]:
    if not models:
        return None
    return models[0]`}
              language="python"
              title="型ヒントの基本"
              showLineNumbers
            />

            <InfoBox type="warning" title="型ヒントは強制ではない">
              <p>
                TypeScript とは異なり、Python の型ヒントは実行時に検査されません。
                あくまで開発ツール（mypy、Pyright）やエディタの補完のための情報です。
                型が間違っていてもプログラムは実行できてしまうため、
                静的解析ツールを併用するのが一般的です。
              </p>
            </InfoBox>
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="Python でブロック（if や for の中身）を表すのは？"
              options={[
                { label: '波括弧 { }' },
                { label: 'インデント（スペース）', correct: true },
                { label: 'セミコロン ;' },
                { label: 'begin ... end キーワード' },
              ]}
              explanation="Python ではインデント（通常スペース4つ）でブロックを表します。波括弧は辞書やセットの定義に使い、ブロックの区切りには使いません。この仕様により、コードの見た目が統一され、可読性が高くなります。"
            />

            <Quiz
              question="[x**2 for x in range(5)] の結果は？"
              options={[
                { label: '[1, 4, 9, 16, 25]' },
                { label: '[0, 1, 4, 9, 16]', correct: true },
                { label: '[0, 2, 4, 6, 8]' },
                { label: '[0, 1, 2, 3, 4]' },
              ]}
              explanation="range(5) は 0, 1, 2, 3, 4 を生成します。それぞれを2乗すると 0, 1, 4, 9, 16 になります。range は 0 から始まり、指定した数の手前まで生成する点に注意してください。"
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span>Python はインデントでブロックを表し、セミコロンや波括弧は不要</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span>基本型: <strong>int, float, str, bool, None</strong>、コレクション: <strong>list, dict, tuple, set</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span>リスト内包表記で <strong>map / filter 相当の操作</strong>を簡潔に書ける</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span>関数は <strong>def</strong> で定義し、<strong>*args / **kwargs</strong> で可変長引数を受け取れる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span>f-string で JS のテンプレートリテラルと同様の文字列埋め込みができる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span>クラスの継承は ML フレームワークのモデル定義で必須パターン</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span>型ヒントでコードの可読性と開発体験を向上できる</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Python 公式チュートリアル',
                  url: 'https://docs.python.org/ja/3/tutorial/',
                  description: 'Python の基礎から応用まで網羅した公式ドキュメント（日本語）',
                },
                {
                  title: 'Python 型ヒント - mypy ドキュメント',
                  url: 'https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html',
                  description: '型ヒントの書き方チートシート',
                },
                {
                  title: 'Real Python - List Comprehensions',
                  url: 'https://realpython.com/list-comprehension-python/',
                  description: 'リスト内包表記の詳細な解説と実践例',
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
