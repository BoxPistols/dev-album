import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function MlConcepts() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="step-badge">STEP 3</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          機械学習の基礎概念
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          機械学習の3つの学習方法、ワークフロー、基本用語を押さえて、
          後続ステップの土台を固めましょう。
        </p>

        <WhyNowBox tags={['機械学習', '教師あり学習', '教師なし学習', '強化学習']}>
          <p>
            ML の基本用語を押さえておくと、後のステップでライブラリやモデルを扱う際にスムーズに理解が進みます。
            ここでは「何を学習させるか」「どう評価するか」の全体像を把握しておきましょう。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 機械学習の3つのタイプ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">機械学習の3つのタイプ</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              機械学習は、学習データの与え方によって大きく3つに分類されます。
              それぞれのアプローチには得意な課題があり、目的に応じて使い分けます。
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              {/* 教師あり学習 */}
              <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-3">
                  <span className="text-blue-600 dark:text-blue-400 text-lg font-bold">1</span>
                </div>
                <h3 className="font-bold text-foreground mb-2" style={{ fontSize: '15px' }}>
                  教師あり学習
                </h3>
                <p className="text-xs text-primary font-medium mb-2">Supervised Learning</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  ラベル付きデータ（正解が分かっているデータ）を使ってモデルを学習させる。
                  入力と正解のペアから、未知のデータに対する予測ルールを獲得する。
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    分類
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    回帰
                  </span>
                </div>
              </div>

              {/* 教師なし学習 */}
              <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-3">
                  <span className="text-emerald-600 dark:text-emerald-400 text-lg font-bold">2</span>
                </div>
                <h3 className="font-bold text-foreground mb-2" style={{ fontSize: '15px' }}>
                  教師なし学習
                </h3>
                <p className="text-xs text-primary font-medium mb-2">Unsupervised Learning</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  ラベルのないデータからパターンや構造を自動的に発見する。
                  人間が気づかないデータの特徴やグループを見つけ出す。
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    クラスタリング
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    次元削減
                  </span>
                </div>
              </div>

              {/* 強化学習 */}
              <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-3">
                  <span className="text-amber-600 dark:text-amber-400 text-lg font-bold">3</span>
                </div>
                <h3 className="font-bold text-foreground mb-2" style={{ fontSize: '15px' }}>
                  強化学習
                </h3>
                <p className="text-xs text-primary font-medium mb-2">Reinforcement Learning</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  エージェントが環境と対話しながら、報酬を最大化する行動方針を学習する。
                  試行錯誤を通じて最適な戦略を獲得する。
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    ゲーム AI
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    ロボット制御
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ML ワークフロー */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">機械学習のワークフロー</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              機械学習プロジェクトは、データの収集からモデルのデプロイまで一連のステップで進みます。
              各ステップの役割を把握しておくと、全体の流れが見通しやすくなります。
            </p>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { num: 1, title: 'データ収集', desc: 'CSV、API、DB などからデータを取得' },
                  { num: 2, title: '前処理', desc: '欠損値処理、正規化、特徴量エンジニアリング' },
                  { num: 3, title: 'モデル選択', desc: '課題に適したアルゴリズムを選ぶ' },
                  { num: 4, title: '学習', desc: '訓練データでモデルのパラメータを最適化' },
                  { num: 5, title: '評価', desc: 'テストデータで精度・汎化性能を検証' },
                  { num: 6, title: 'デプロイ', desc: 'API やバッチ処理として本番環境へ展開' },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-sm font-bold">{step.num}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-foreground text-sm">{step.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  実務ではステップ 5 の評価結果に応じて、ステップ 2 や 3 に戻ることが一般的です。
                  この反復プロセスを通じてモデルの精度を改善していきます。
                </p>
              </div>
            </div>
          </section>

          {/* 基本用語 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">押さえておきたい基本用語</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              機械学習で頻出する用語を確認しておきましょう。
              これらの概念は後続のステップで繰り返し登場します。
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1" style={{ fontSize: '15px' }}>
                  特徴量（Feature）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  モデルに入力するデータの各属性。住宅価格予測であれば「面積」「築年数」「駅からの距離」などが特徴量にあたる。
                  適切な特徴量を選ぶことがモデルの精度に大きく影響する。
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1" style={{ fontSize: '15px' }}>
                  ラベル（Label）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  教師あり学習で使う正解データ。メールの「スパム / スパムでない」、画像の「猫 / 犬」など。
                  モデルはラベルを予測できるように学習する。
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1" style={{ fontSize: '15px' }}>
                  訓練データ / テストデータ
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  データセットを「学習用（訓練データ）」と「評価用（テストデータ）」に分割する。
                  一般的には 80:20 や 70:30 の比率で分割し、テストデータはモデルの評価時にだけ使う。
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1" style={{ fontSize: '15px' }}>
                  過学習（Overfitting）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  訓練データに対しては高精度だが、未知のデータに対して精度が落ちる状態。
                  テスト問題の丸暗記に似ており、応用が利かなくなる。正則化やデータの増量で対策する。
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1" style={{ fontSize: '15px' }}>
                  汎化（Generalization）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  学習に使っていない未知のデータに対しても正しく予測できる能力。
                  モデルの目標は訓練データへの適合ではなく、汎化性能の獲得にある。
                  過学習の対義語として覚えておくと整理しやすい。
                </p>
              </div>
            </div>

            <CodeBlock
              code={`# scikit-learn でのデータ分割の例
from sklearn.model_selection import train_test_split

# データを 80% 訓練用、20% テスト用に分割
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"訓練データ: {len(X_train)} 件")
print(f"テストデータ: {len(X_test)} 件")`}
              language="python"
              title="データの分割（train_test_split）"
            />
          </section>

          {/* 分類 vs 回帰 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">分類と回帰の違い</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              教師あり学習は、予測する値の種類によって「分類」と「回帰」に分かれます。
              どちらに該当するかを見極めることが、モデル選択の第一歩です。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-4 font-bold text-foreground bg-muted/50" style={{ minWidth: '100px' }}>
                      項目
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground bg-muted/50" style={{ minWidth: '200px' }}>
                      分類（Classification）
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground bg-muted/50" style={{ minWidth: '200px' }}>
                      回帰（Regression）
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">出力</td>
                    <td className="py-3 px-4 text-muted-foreground">カテゴリ（離散値）</td>
                    <td className="py-3 px-4 text-muted-foreground">数値（連続値）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">例</td>
                    <td className="py-3 px-4 text-muted-foreground">スパム判定、画像認識、感情分析</td>
                    <td className="py-3 px-4 text-muted-foreground">価格予測、気温予測、売上予測</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">評価指標</td>
                    <td className="py-3 px-4 text-muted-foreground">正解率、適合率、再現率、F1</td>
                    <td className="py-3 px-4 text-muted-foreground">MSE、RMSE、MAE、R²</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">代表的アルゴリズム</td>
                    <td className="py-3 px-4 text-muted-foreground">ロジスティック回帰、決定木、SVM</td>
                    <td className="py-3 px-4 text-muted-foreground">線形回帰、ランダムフォレスト、勾配ブースティング</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="名前に注意">
              <p>
                「ロジスティック回帰」は名前に「回帰」が含まれますが、分類アルゴリズムです。
                出力を確率に変換し、閾値で分類を行います。名前に惑わされないようにしましょう。
              </p>
            </InfoBox>
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="画像を猫か犬か判定するタスクは、分類と回帰のどちらに該当する？"
              options={[
                { label: '分類（Classification）', correct: true },
                { label: '回帰（Regression）', correct: false },
                { label: '強化学習（Reinforcement Learning）', correct: false },
              ]}
              explanation="「猫」か「犬」というカテゴリ（離散値）を予測するタスクなので、分類に該当します。出力が数値（連続値）であれば回帰になります。"
            />

            <Quiz
              question="ラベルのないデータからグループを見つけるのは、3つの学習タイプのうちどれ？"
              options={[
                { label: '教師あり学習', correct: false },
                { label: '教師なし学習', correct: true },
                { label: '強化学習', correct: false },
              ]}
              explanation="ラベルなしデータからパターンやグループを発見するのは教師なし学習です。代表的な手法にクラスタリング（k-means など）があります。教師あり学習にはラベル（正解データ）が必要です。"
            />
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Google: Machine Learning Crash Course',
                  url: 'https://developers.google.com/machine-learning/crash-course',
                  description: 'Google が提供する ML の無料入門コース',
                },
                {
                  title: 'scikit-learn: User Guide',
                  url: 'https://scikit-learn.org/stable/user_guide.html',
                  description: 'scikit-learn の公式ドキュメント。アルゴリズムの使い方と理論',
                },
                {
                  title: 'Coursera: Machine Learning（Andrew Ng）',
                  url: 'https://www.coursera.org/learn/machine-learning',
                  description: 'スタンフォード大学 Andrew Ng 教授による定番の ML コース',
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
