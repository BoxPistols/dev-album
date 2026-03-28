import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function Supervised() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="step-badge">STEP 7</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          教師あり学習の実践
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          scikit-learn を使って、データの読み込みからモデルの評価まで、機械学習の基本ワークフローを一通り体験します。
        </p>

        <WhyNowBox tags={['scikit-learn', '分類', '回帰', '過学習']}>
          <p>
            前のステップで教師あり学習の概念を理解しました。
            ここからは scikit-learn で実際にコードを書いて ML を体験します。
            scikit-learn は Python の ML ライブラリの中で最も広く使われており、
            データの前処理からモデルの評価まで統一的な API で操作できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ML 実践フロー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ML 実践フロー</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              教師あり学習は、以下の 6 ステップで進めます。どのアルゴリズムでもこの流れは共通です。
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {[
                { num: 1, title: 'データ読み込み', desc: 'データセットを取得し確認する' },
                { num: 2, title: '前処理', desc: '欠損値処理、型変換、正規化' },
                { num: 3, title: '分割', desc: '訓練データとテストデータに分ける' },
                { num: 4, title: '学習', desc: 'モデルを選び、訓練データで学習' },
                { num: 5, title: '予測', desc: 'テストデータで予測を実行' },
                { num: 6, title: '評価', desc: '精度を計算し汎化性能を確認' },
              ].map((step) => (
                <div key={step.num} className="rounded-xl border border-border bg-card p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <span className="text-primary font-bold text-sm">{step.num}</span>
                  </div>
                  <h4 className="font-bold text-foreground text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mb-4 text-muted-foreground text-sm flex-wrap">
              <span className="px-3 py-1 rounded-lg bg-muted font-medium">読み込み</span>
              <span>→</span>
              <span className="px-3 py-1 rounded-lg bg-muted font-medium">前処理</span>
              <span>→</span>
              <span className="px-3 py-1 rounded-lg bg-muted font-medium">分割</span>
              <span>→</span>
              <span className="px-3 py-1 rounded-lg bg-muted font-medium">学習</span>
              <span>→</span>
              <span className="px-3 py-1 rounded-lg bg-muted font-medium">予測</span>
              <span>→</span>
              <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary font-medium">評価</span>
            </div>
          </section>

          {/* 分類の実践: ステップ1 データ読み込み */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">分類の実践: Iris データセット</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ML の入門で定番の <strong>Iris（アヤメ）データセット</strong> を使います。
              3 種類のアヤメの花を、花弁とがく片の大きさから分類する問題です。
              ステップごとにコードを確認していきましょう。
            </p>

            <h3 className="text-lg font-bold text-foreground mb-3">1. データの読み込みと DataFrame 化</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              scikit-learn にはサンプルデータセットが内蔵されています。
              読み込んだデータを pandas の DataFrame に変換すると、データの中身を確認しやすくなります。
            </p>

            <CodeBlock
              language="python"
              title="Iris データセットの読み込み"
              showLineNumbers
              code={`from sklearn.datasets import load_iris
import pandas as pd

# データセットの読み込み
iris = load_iris()

# DataFrame に変換して確認しやすくする
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['target'] = iris.target

print(df.head())
# => sepal length, sepal width, petal length, petal width, target

# 特徴量（入力データ）とラベル（正解データ）に分離
X = iris.data      # shape: (150, 4)
y = iris.target     # shape: (150,)

print("クラス名:", iris.target_names)
# => ['setosa', 'versicolor', 'virginica']`}
            />

            <p className="text-muted-foreground mt-4 mb-2 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">X</code> が特徴量（入力）、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">y</code> がラベル（正解）です。
              ML では特徴量を大文字 X（行列）、ラベルを小文字 y（ベクトル）と書く慣例があります。
            </p>

            <h3 className="text-lg font-bold text-foreground mb-3 mt-8">2. データの分割（train_test_split）</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              データを<strong>訓練データ（80%）</strong>と<strong>テストデータ（20%）</strong>に分割します。
              モデルが見たことのないデータで評価することで、汎化性能を正しく測定できます。
            </p>

            <CodeBlock
              language="python"
              title="train_test_split でデータを分割"
              showLineNumbers
              code={`from sklearn.model_selection import train_test_split

# データを 80% : 20% に分割
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,       # テストデータの割合
    random_state=42,     # 再現性のための乱数シード
    stratify=y           # クラス比率を維持して分割
)

print("訓練データ:", X_train.shape)  # => (120, 4)
print("テストデータ:", X_test.shape)  # => (30, 4)`}
            />

            <p className="text-muted-foreground mt-4 mb-2 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">stratify=y</code> を指定すると、
              各クラスの比率が訓練データとテストデータで同じになるように分割されます。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">random_state</code> は乱数シードで、同じ値を指定すれば何度実行しても同じ分割結果が得られます。
            </p>

            <h3 className="text-lg font-bold text-foreground mb-3 mt-8">3. モデルの学習（fit）</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              決定木（DecisionTreeClassifier）を使って学習させます。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">fit()</code> に訓練データを渡すだけで完了します。
            </p>

            <CodeBlock
              language="python"
              title="決定木モデルの学習"
              showLineNumbers
              code={`from sklearn.tree import DecisionTreeClassifier

# モデルの作成
model = DecisionTreeClassifier(random_state=42)

# 訓練データで学習
model.fit(X_train, y_train)

print("学習完了")`}
            />

            <p className="text-muted-foreground mt-4 mb-2 leading-relaxed">
              scikit-learn の統一インターフェースにより、別のアルゴリズムに切り替えても
              この <code className="text-sm bg-muted px-1.5 py-0.5 rounded">fit</code> /
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">predict</code> の流れは変わりません。
            </p>

            <h3 className="text-lg font-bold text-foreground mb-3 mt-8">4. 予測と精度評価</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              学習済みモデルでテストデータに対する予測を行い、正解率（Accuracy）を算出します。
            </p>

            <CodeBlock
              language="python"
              title="予測と精度評価"
              showLineNumbers
              code={`from sklearn.metrics import accuracy_score

# テストデータで予測
y_pred = model.predict(X_test)

# 正解率を計算
accuracy = accuracy_score(y_test, y_pred)
print(f"テスト精度: {accuracy:.2f}")
# => テスト精度: 0.97（97%）

# 個別の予測結果を確認
for i in range(5):
    true_label = iris.target_names[y_test[i]]
    pred_label = iris.target_names[y_pred[i]]
    match = "OK" if y_test[i] == y_pred[i] else "NG"
    print(f"  正解: {true_label}, 予測: {pred_label} [{match}]")`}
            />

            <div className="mt-4">
              <InfoBox type="success" title="全体の流れを振り返る">
                <p>
                  データ読み込み → <code className="text-sm bg-muted px-1.5 py-0.5 rounded">train_test_split</code> →
                  <code className="text-sm bg-muted px-1.5 py-0.5 rounded">fit</code> →
                  <code className="text-sm bg-muted px-1.5 py-0.5 rounded">predict</code> →
                  <code className="text-sm bg-muted px-1.5 py-0.5 rounded">accuracy_score</code>。
                  この流れが scikit-learn の基本パターンです。
                  アルゴリズムを変えてもこの流れは変わりません。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* 回帰の実践 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">回帰の実践: 住宅価格の予測</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              分類がカテゴリを予測するのに対し、<strong>回帰</strong>は連続する数値を予測します。
              ここでは LinearRegression を使ってカリフォルニアの住宅価格を予測してみましょう。
            </p>

            <CodeBlock
              language="python"
              title="線形回帰による住宅価格予測"
              showLineNumbers
              code={`from sklearn.datasets import fetch_california_housing
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# カリフォルニア住宅価格データセット
housing = fetch_california_housing()
X, y = housing.data, housing.target

# データ分割
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 線形回帰モデルで学習
model = LinearRegression()
model.fit(X_train, y_train)

# 予測と評価
y_pred = model.predict(X_test)

rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)
print(f"RMSE: {rmse:.4f}")  # 平均二乗誤差の平方根
print(f"R2:   {r2:.4f}")    # 決定係数（1 に近いほど良い）`}
            />

            <div className="mt-4">
              <InfoBox type="info" title="分類と回帰の違い">
                <p>
                  <strong>分類</strong>はカテゴリ（離散値）を予測するタスク（例: スパム判定、画像認識）。
                  <strong>回帰</strong>は数値（連続値）を予測するタスク（例: 価格予測、気温予測）。
                  評価指標も異なり、分類では正解率（Accuracy）、回帰では RMSE や R2 スコアを使います。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* 代表的なアルゴリズム比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">代表的なアルゴリズムの比較</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              scikit-learn で使える代表的な教師あり学習アルゴリズムを比較します。
              すべて同じ <code className="text-sm bg-muted px-1.5 py-0.5 rounded">fit</code> /
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">predict</code> で操作できます。
            </p>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left px-4 py-3 font-bold text-foreground">アルゴリズム</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">特徴</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">向いているケース</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="px-4 py-3 font-medium text-foreground">決定木</td>
                    <td className="px-4 py-3 text-muted-foreground">解釈しやすい、可視化しやすい</td>
                    <td className="px-4 py-3 text-muted-foreground">ルールを確認したい場合</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3 font-medium text-foreground">ランダムフォレスト</td>
                    <td className="px-4 py-3 text-muted-foreground">高精度、過学習しにくい</td>
                    <td className="px-4 py-3 text-muted-foreground">多くの実務タスク</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3 font-medium text-foreground">SVM</td>
                    <td className="px-4 py-3 text-muted-foreground">少データでも高精度</td>
                    <td className="px-4 py-3 text-muted-foreground">テキスト分類、小規模データ</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3 font-medium text-foreground">k-NN</td>
                    <td className="px-4 py-3 text-muted-foreground">シンプル、学習不要</td>
                    <td className="px-4 py-3 text-muted-foreground">レコメンデーション</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 過学習 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">過学習（Overfitting）を理解する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              過学習とは、モデルが訓練データに過剰に適合し、
              未知のデータに対する予測性能が低下する現象です。
              「テストの答えを丸暗記して、少し違う問題は解けなくなる」状態に近いです。
            </p>

            {/* 過学習の図解 */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground text-sm mb-3">適切な学習（Good Fit）</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-20">訓練精度</span>
                    <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                      <div className="h-full bg-primary/60 rounded-full" style={{ width: '92%' }} />
                    </div>
                    <span className="text-xs font-medium text-foreground w-10 text-right">92%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-20">テスト精度</span>
                    <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '90%' }} />
                    </div>
                    <span className="text-xs font-medium text-foreground w-10 text-right">90%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  訓練とテストの精度が近い = 汎化できている
                </p>
              </div>

              <div className="rounded-xl border border-red-200 dark:border-red-800 bg-card p-5">
                <h4 className="font-bold text-foreground text-sm mb-3">過学習（Overfitting）</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-20">訓練精度</span>
                    <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '98%' }} />
                    </div>
                    <span className="text-xs font-medium text-foreground w-10 text-right">98%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-20">テスト精度</span>
                    <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '65%' }} />
                    </div>
                    <span className="text-xs font-medium text-foreground w-10 text-right">65%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  訓練精度 98% vs テスト精度 65% = 丸暗記状態
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              過学習を防ぐ主な対策は以下の通りです。
            </p>

            <div className="grid md:grid-cols-3 gap-3 mb-6">
              <div className="rounded-xl border border-border bg-card p-4">
                <h4 className="font-bold text-foreground text-sm mb-1">データ増量</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  訓練データを増やすことで、モデルがより一般的なパターンを学習しやすくなる
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <h4 className="font-bold text-foreground text-sm mb-1">正則化</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  モデルの複雑度にペナルティを与えて、過度なフィッティングを抑制する
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <h4 className="font-bold text-foreground text-sm mb-1">交差検証</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  データを複数パターンで分割・評価し、モデルの安定性を確認する
                </p>
              </div>
            </div>
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="train_test_split の目的は？"
              options={[
                { label: 'データの欠損値を補完するため' },
                { label: 'モデルの汎化性能を正しく評価するため', correct: true },
                { label: 'データの特徴量を正規化するため' },
                { label: 'モデルの学習速度を上げるため' },
              ]}
              explanation="train_test_split でデータを訓練用とテスト用に分割することで、モデルが「見たことのないデータ」に対してどれだけ正しく予測できるか（汎化性能）を評価できます。訓練データだけで評価すると、丸暗記していても高い精度が出てしまい、本当の実力が分かりません。"
            />

            <Quiz
              question="訓練精度は高いがテスト精度が低い現象は？"
              options={[
                { label: '未学習（Underfitting）' },
                { label: '過学習（Overfitting）', correct: true },
                { label: '適切な学習（Good Fit）' },
                { label: 'データの前処理不足' },
              ]}
              explanation="訓練データに対しては高い精度が出るのにテストデータでは精度が落ちる場合、モデルが訓練データのパターンを丸暗記しており、未知のデータに汎化できていない状態です。これを過学習（Overfitting）と呼びます。対策としてはデータの追加、正則化、交差検証などがあります。"
            />
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'scikit-learn 公式ドキュメント',
                  url: 'https://scikit-learn.org/stable/',
                  description: 'scikit-learn の全アルゴリズムと API リファレンス',
                },
                {
                  title: 'scikit-learn: Supervised Learning',
                  url: 'https://scikit-learn.org/stable/supervised_learning.html',
                  description: '教師あり学習のアルゴリズム一覧と使い方ガイド',
                },
                {
                  title: 'Google Machine Learning Crash Course',
                  url: 'https://developers.google.com/machine-learning/crash-course',
                  description: 'Google が提供する ML 入門コース（無料）',
                },
                {
                  title: 'Kaggle Learn: Intro to Machine Learning',
                  url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
                  description: 'Kaggle の対話型 ML 入門チュートリアル',
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
