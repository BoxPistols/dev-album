import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function DataLibraries() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="step-badge">STEP 6</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          NumPy・Pandas・Matplotlib
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          ML に不可欠なデータ処理と可視化の3ライブラリを、基本操作に絞って押さえます。
        </p>

        <WhyNowBox tags={['NumPy', 'Pandas', 'Matplotlib', 'データ前処理']}>
          <p>
            機械学習では「データの準備」が作業時間の大半を占めます。
            数値計算の NumPy、表形式データの Pandas、可視化の Matplotlib はその中核を担う3ライブラリです。
            scikit-learn や PyTorch も内部で NumPy の配列（ndarray）を扱うため、
            この3つを使えることが ML の実践における前提条件になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 3ライブラリの関係 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              3ライブラリの全体像
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              NumPy、Pandas、Matplotlib はそれぞれ異なる役割を持ち、組み合わせて使います。
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">N</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">NumPy -- 数値計算の基盤</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    多次元配列（ndarray）を中心とした高速な数値演算ライブラリ。
                    行列計算、線形代数、統計処理を効率的に行えます。
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <span className="text-lg">&#8595;</span>
                  <span className="text-xs">ndarray を基盤として利用</span>
                  <span className="text-lg">&#8595;</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">P</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Pandas -- データ操作</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    DataFrame（表形式データ構造）による直感的なデータ操作。
                    CSV の読み込み、フィルタリング、集計、欠損値処理を簡潔に書けます。
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <span className="text-lg">&#8595;</span>
                  <span className="text-xs">データを渡して描画</span>
                  <span className="text-lg">&#8595;</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 dark:text-orange-400 font-bold text-lg">M</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Matplotlib -- 可視化</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    折れ線グラフ、散布図、ヒストグラムなどの描画ライブラリ。
                    データの傾向や分布を視覚的に確認するために使います。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* NumPy */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              NumPy -- 多次元配列と数値演算
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              NumPy の中核は <code className="bg-muted px-1 py-0.5 rounded text-xs">ndarray</code>（N-dimensional array）です。
              Python 標準のリストと異なり、同じ型の要素で構成され、C 言語レベルの速度で演算できます。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">配列の作成</h3>
            <CodeBlock
              code={`import numpy as np

# リストから配列を作成
a = np.array([1, 2, 3, 4, 5])
print(a)          # [1 2 3 4 5]
print(a.dtype)    # int64
print(a.shape)    # (5,)

# 2次元配列（行列）
matrix = np.array([
    [1, 2, 3],
    [4, 5, 6],
])
print(matrix.shape)  # (2, 3) -- 2行3列

# よく使う初期化関数
zeros = np.zeros((3, 4))       # 3x4 のゼロ行列
ones = np.ones((2, 3))         # 2x3 の1行列
rand = np.random.randn(3, 3)   # 3x3 の標準正規分布乱数
seq = np.arange(0, 10, 2)      # [0, 2, 4, 6, 8]
lin = np.linspace(0, 1, 5)     # [0.0, 0.25, 0.5, 0.75, 1.0]`}
              language="python"
              title="NumPy 配列の作成"
              showLineNumbers
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">形状変更と演算</h3>
            <CodeBlock
              code={`import numpy as np

a = np.array([1, 2, 3, 4, 5, 6])

# 形状変更（reshape）
b = a.reshape(2, 3)   # 2行3列に変換
print(b)
# [[1 2 3]
#  [4 5 6]]

# -1 を使うと自動計算
c = a.reshape(3, -1)  # 3行 x 自動列数
print(c.shape)         # (3, 2)

# 要素ごとの演算（ブロードキャスト）
x = np.array([1, 2, 3])
print(x + 10)         # [11 12 13]
print(x * 2)          # [2 4 6]
print(x ** 2)         # [1 4 9]

# 配列同士の演算
y = np.array([10, 20, 30])
print(x + y)          # [11 22 33]
print(x * y)          # [10 40 90]

# 統計関数
data = np.array([85, 92, 78, 95, 88])
print(np.mean(data))   # 87.6  -- 平均
print(np.std(data))    # 5.85  -- 標準偏差
print(np.max(data))    # 95    -- 最大値
print(np.argmax(data)) # 3     -- 最大値のインデックス`}
              language="python"
              title="形状変更と演算"
              showLineNumbers
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">スライシング</h3>
            <CodeBlock
              code={`import numpy as np

matrix = np.array([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
])

# 行のスライス
print(matrix[0])       # [1 2 3 4]  -- 1行目
print(matrix[1:])      # [[5,6,7,8],[9,10,11,12]]  -- 2行目以降

# 列のスライス
print(matrix[:, 0])    # [1 5 9]   -- 1列目
print(matrix[:, 1:3])  # [[2,3],[6,7],[10,11]]  -- 2-3列目

# 条件によるフィルタリング（ブールインデックス）
data = np.array([3, 7, 1, 9, 4, 6])
mask = data > 5
print(mask)            # [False True False True False True]
print(data[mask])      # [7 9 6]  -- 5より大きい要素だけ`}
              language="python"
              title="スライシングとフィルタリング"
              showLineNumbers
            />

            <InfoBox type="info" title="ndarray と Python リストの違い">
              <p>
                Python の標準リストは異なる型の要素を混在でき柔軟ですが、
                数値演算は遅くなります。NumPy の ndarray は同一型に制限される代わりに、
                C 言語レベルの速度で計算できます。100万要素の配列で比較すると、
                NumPy は Python リストの 10-100 倍高速です。
              </p>
            </InfoBox>
          </section>

          {/* Pandas */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Pandas -- 表形式データの操作
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Pandas の <code className="bg-muted px-1 py-0.5 rounded text-xs">DataFrame</code> は
              Excel のスプレッドシートのような表形式のデータ構造です。
              行と列にラベルが付き、直感的にデータを操作できます。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">DataFrame の作成と基本操作</h3>
            <CodeBlock
              code={`import pandas as pd

# 辞書から DataFrame を作成
df = pd.DataFrame({
    "name": ["Alice", "Bob", "Carol", "Dave"],
    "age": [25, 30, 28, 35],
    "score": [85, 92, 78, 95],
    "city": ["Tokyo", "Osaka", "Tokyo", "Nagoya"],
})

print(df)
#     name  age  score    city
# 0  Alice   25     85   Tokyo
# 1    Bob   30     92   Osaka
# 2  Carol   28     78   Tokyo
# 3   Dave   35     95  Nagoya

# 基本情報の確認
print(df.shape)       # (4, 4) -- 4行4列
print(df.dtypes)      # 各列のデータ型
print(df.describe())  # 数値列の統計サマリー`}
              language="python"
              title="DataFrame の作成と基本情報"
              showLineNumbers
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">CSV の読み込みとデータ確認</h3>
            <CodeBlock
              code={`import pandas as pd

# CSV ファイルの読み込み
df = pd.read_csv("data.csv")

# 先頭・末尾の確認
print(df.head())      # 先頭5行
print(df.tail(3))     # 末尾3行

# データの概要
print(df.info())      # 列名、型、非null数
print(df.describe())  # 統計サマリー（平均、標準偏差、最小、最大等）

# 欠損値の確認
print(df.isnull().sum())  # 列ごとの欠損値数`}
              language="python"
              title="CSV の読み込みとデータ確認"
              showLineNumbers
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">列の選択とフィルタリング</h3>
            <CodeBlock
              code={`import pandas as pd

df = pd.DataFrame({
    "name": ["Alice", "Bob", "Carol", "Dave"],
    "age": [25, 30, 28, 35],
    "score": [85, 92, 78, 95],
    "city": ["Tokyo", "Osaka", "Tokyo", "Nagoya"],
})

# 列の選択
print(df["name"])           # Series（1列）
print(df[["name", "score"]]) # DataFrame（複数列）

# 条件によるフィルタリング
high_score = df[df["score"] >= 90]
print(high_score)
#   name  age  score    city
# 1  Bob   30     92   Osaka
# 3 Dave   35     95  Nagoya

# 複数条件（& で AND、| で OR）
tokyo_high = df[(df["city"] == "Tokyo") & (df["score"] >= 80)]
print(tokyo_high)
#    name  age  score   city
# 0 Alice   25     85  Tokyo

# 集計
print(df["score"].mean())              # 87.5
print(df.groupby("city")["score"].mean())
# city
# Nagoya    95.0
# Osaka     92.0
# Tokyo     81.5`}
              language="python"
              title="列の選択、フィルタリング、集計"
              showLineNumbers
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">データの加工</h3>
            <CodeBlock
              code={`import pandas as pd

df = pd.DataFrame({
    "name": ["Alice", "Bob", "Carol"],
    "score": [85, 92, 78],
    "grade": [None, "A", None],
})

# 新しい列の追加
df["passed"] = df["score"] >= 80
print(df)

# 欠損値の処理
df["grade"] = df["grade"].fillna("B")  # NaN を "B" で埋める
print(df)

# 列の値を変換（apply）
df["score_normalized"] = df["score"].apply(lambda x: x / 100)
print(df)

# ソート
df_sorted = df.sort_values("score", ascending=False)
print(df_sorted)

# CSV への書き出し
df.to_csv("output.csv", index=False)`}
              language="python"
              title="データの加工と保存"
              showLineNumbers
            />

            <InfoBox type="info" title="Series と DataFrame">
              <p>
                Pandas には2つの主要なデータ構造があります。
                <code className="bg-muted px-1 py-0.5 rounded text-xs">Series</code> は1次元のラベル付き配列（1列分のデータ）、
                <code className="bg-muted px-1 py-0.5 rounded text-xs">DataFrame</code> は2次元のラベル付き表（複数列のデータ）です。
                DataFrame の各列は Series です。
              </p>
            </InfoBox>
          </section>

          {/* Matplotlib */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Matplotlib -- データの可視化
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Matplotlib はデータをグラフとして描画するライブラリです。
              ML ではデータの分布確認、学習曲線の監視、予測結果の評価などに使います。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">折れ線グラフ</h3>
            <CodeBlock
              code={`import matplotlib.pyplot as plt

# 学習曲線の可視化（典型的な ML ユースケース）
epochs = range(1, 11)
train_loss = [0.9, 0.7, 0.5, 0.35, 0.25, 0.18, 0.13, 0.1, 0.08, 0.06]
val_loss = [0.95, 0.75, 0.6, 0.5, 0.45, 0.42, 0.41, 0.40, 0.40, 0.39]

plt.figure(figsize=(8, 5))
plt.plot(epochs, train_loss, label="Train Loss", marker="o")
plt.plot(epochs, val_loss, label="Validation Loss", marker="s")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.title("Learning Curve")
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`}
              language="python"
              title="折れ線グラフ（学習曲線）"
              showLineNumbers
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">散布図</h3>
            <CodeBlock
              code={`import matplotlib.pyplot as plt
import numpy as np

# 2クラスのデータを生成
np.random.seed(42)
class_a = np.random.randn(50, 2) + [2, 2]
class_b = np.random.randn(50, 2) + [-2, -2]

plt.figure(figsize=(6, 6))
plt.scatter(class_a[:, 0], class_a[:, 1], label="Class A", alpha=0.7)
plt.scatter(class_b[:, 0], class_b[:, 1], label="Class B", alpha=0.7)
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")
plt.title("2-Class Scatter Plot")
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`}
              language="python"
              title="散布図（2クラス分類の可視化）"
              showLineNumbers
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">ヒストグラム</h3>
            <CodeBlock
              code={`import matplotlib.pyplot as plt
import numpy as np

# データの分布を確認（ML の前処理で頻出）
np.random.seed(42)
data = np.random.normal(loc=170, scale=10, size=1000)  # 身長データ（平均170, 標準偏差10）

plt.figure(figsize=(8, 5))
plt.hist(data, bins=30, edgecolor="white", alpha=0.7)
plt.axvline(np.mean(data), color="red", linestyle="--", label=f"Mean: {np.mean(data):.1f}")
plt.xlabel("Height (cm)")
plt.ylabel("Frequency")
plt.title("Distribution of Height Data")
plt.legend()
plt.tight_layout()
plt.show()`}
              language="python"
              title="ヒストグラム（データの分布確認）"
              showLineNumbers
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">複数グラフの並列表示</h3>
            <CodeBlock
              code={`import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
x = np.linspace(0, 10, 100)

# subplot で複数グラフを並べる
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# 折れ線
axes[0].plot(x, np.sin(x))
axes[0].set_title("Sine Wave")

# 散布図
axes[1].scatter(np.random.randn(100), np.random.randn(100), alpha=0.5)
axes[1].set_title("Random Scatter")

# ヒストグラム
axes[2].hist(np.random.randn(1000), bins=30, edgecolor="white")
axes[2].set_title("Normal Distribution")

plt.tight_layout()
plt.show()`}
              language="python"
              title="subplot による複数グラフの並列表示"
              showLineNumbers
            />

            <InfoBox type="info" title="Jupyter Notebook との相性">
              <p>
                Matplotlib は Jupyter Notebook と組み合わせて使うのが一般的です。
                ノートブックのセルでグラフを描画すると、コードの直下に結果が表示されるため、
                データの探索や可視化を対話的に進められます。
                <code className="bg-muted px-1 py-0.5 rounded text-xs">%matplotlib inline</code> を
                セルの先頭に書くと、<code className="bg-muted px-1 py-0.5 rounded text-xs">plt.show()</code> なしでも
                グラフが表示されます。
              </p>
            </InfoBox>
          </section>

          {/* 3ライブラリを組み合わせた実践例 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              3ライブラリを組み合わせた実践例
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              実際の ML ワークフローでは、3つのライブラリを組み合わせて使います。
              CSV データの読み込みから可視化までの一連の流れを確認しましょう。
            </p>

            <CodeBlock
              code={`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# 1. データの準備（Pandas）
df = pd.DataFrame({
    "hours_studied": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "test_score": [35, 45, 50, 60, 65, 70, 78, 85, 90, 95],
})

# 2. 基本統計の確認（Pandas + NumPy）
print("=== 統計サマリー ===")
print(df.describe())
print(f"\\n相関係数: {df['hours_studied'].corr(df['test_score']):.3f}")

# 3. NumPy で計算
x = df["hours_studied"].values  # Pandas -> NumPy 変換
y = df["test_score"].values

# 回帰直線の係数を計算
slope, intercept = np.polyfit(x, y, 1)
print(f"傾き: {slope:.2f}, 切片: {intercept:.2f}")

# 4. Matplotlib で可視化
plt.figure(figsize=(8, 5))
plt.scatter(x, y, label="Actual Data", zorder=5)
plt.plot(x, slope * x + intercept, color="red",
         linestyle="--", label=f"y = {slope:.1f}x + {intercept:.1f}")
plt.xlabel("Hours Studied")
plt.ylabel("Test Score")
plt.title("Study Hours vs Test Score")
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`}
              language="python"
              title="CSV -> 統計分析 -> 回帰直線の可視化"
              showLineNumbers
            />

            <InfoBox type="success" title="ML ワークフローの基本パターン">
              <p>
                この「Pandas でデータ読み込み → NumPy で計算 → Matplotlib で可視化」という流れは
                ML プロジェクトの基本パターンです。次の STEP 以降で扱う scikit-learn や
                PyTorch でも、この3ライブラリとの連携は常に発生します。
              </p>
            </InfoBox>
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="Pandas の DataFrame で特定の列を選択する方法として正しいのは？"
              options={[
                { label: 'df.select("column_name")' },
                { label: 'df["column_name"]', correct: true },
                { label: 'df.get_column("column_name")' },
                { label: 'df.column("column_name")' },
              ]}
              explanation='DataFrame の列にアクセスするには df["column_name"] と書きます。複数列を選択する場合は df[["col1", "col2"]] のようにリストで指定します。df.column_name というドット記法も使えますが、列名にスペースや特殊文字が含まれる場合は使えないため、ブラケット記法が推奨されます。'
            />

            <Quiz
              question="NumPy の ndarray が Python の標準リストより高速な理由は？"
              options={[
                { label: 'Python のリストよりメモリを多く使うため' },
                { label: '要素が同一の型に制限され、C 言語レベルで最適化されているため', correct: true },
                { label: 'GPU を自動的に使用するため' },
                { label: 'データを圧縮して保持するため' },
              ]}
              explanation="NumPy の ndarray は全要素が同じデータ型（例: float64）で構成されるため、メモリ上に連続して配置でき、C/Fortran で実装された最適化コードで高速に処理できます。Python の標準リストは異なる型を混在できる柔軟性がある分、各要素がオブジェクトへの参照として保持され、演算のオーバーヘッドが大きくなります。"
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span><strong>NumPy</strong> の ndarray は ML における数値計算の基盤で、要素ごとの演算やスライシングが可能</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span><strong>Pandas</strong> の DataFrame で CSV の読み込み、列選択、条件フィルタ、集計を直感的に行える</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span><strong>Matplotlib</strong> で折れ線グラフ、散布図、ヒストグラムなどを描画できる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span>3ライブラリは <strong>NumPy（計算） → Pandas（操作） → Matplotlib（可視化）</strong> の流れで連携する</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span>ndarray と DataFrame の相互変換（<code className="bg-muted px-1 py-0.5 rounded text-xs">.values</code>）は ML で頻出するパターン</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'NumPy 公式 - Quickstart Tutorial',
                  url: 'https://numpy.org/doc/stable/user/quickstart.html',
                  description: 'ndarray の基本操作を公式チュートリアルで学ぶ',
                },
                {
                  title: 'Pandas 公式 - 10 Minutes to pandas',
                  url: 'https://pandas.pydata.org/docs/user_guide/10min.html',
                  description: 'DataFrame の基本操作を10分で把握するクイックガイド',
                },
                {
                  title: 'Matplotlib 公式 - Tutorials',
                  url: 'https://matplotlib.org/stable/tutorials/index.html',
                  description: 'グラフの種類別チュートリアルとギャラリー',
                },
                {
                  title: 'Kaggle Learn - Pandas',
                  url: 'https://www.kaggle.com/learn/pandas',
                  description: 'Kaggle の無料 Pandas コースで実践的に学ぶ',
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
