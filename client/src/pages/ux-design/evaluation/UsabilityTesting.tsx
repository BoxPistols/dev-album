import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function UsabilityTesting() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 12</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          ユーザビリティテストと改善
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          作ったプロダクトが実際に使えるかを検証し、改善につなげる方法を学びます。
          テスト計画の立て方から、ヒューリスティック評価、定量指標の活用、改善サイクルの回し方までを整理します。
        </p>

        <WhyNowBox tags={['ユーザビリティテスト', 'ヒューリスティック評価', 'SUS', '改善サイクル']}>
          <p>
            リサーチで課題を見つけ、ワイヤーフレームで構造を作り、プロトタイプで動きを確認してきました。
            最後のステップは「本当に使えるか」の検証です。
            実際のユーザーにタスクを実行してもらい、つまずきを観察することで、
            仮説と現実のギャップを埋める具体的な改善点が見えてきます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: ユーザビリティテストとは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ユーザビリティテストとは</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ユーザビリティテストは、実際のユーザー（またはターゲットに近い人）にプロダクトを操作してもらい、
              その様子を観察する評価手法です。ユーザーが「何に迷うか」「どこで手が止まるか」を
              直接観察することで、設計上の問題を発見します。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              アンケートやアクセス解析では「何が起きたか」しかわかりません。
              ユーザビリティテストでは「なぜそれが起きたのか」まで掘り下げることができます。
            </p>
          </section>

          {/* セクション 2: テストの種類 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">テストの種類と使い分け</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              テストには複数の軸があり、目的やリソースに応じて組み合わせます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-3 font-semibold text-foreground border border-border">軸</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground border border-border">タイプ A</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground border border-border">タイプ B</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground border border-border">判断基準</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 text-foreground border border-border font-medium">実施場所</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">対面（ラボ）</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">リモート</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">表情・操作の観察が必要なら対面、規模とコスト重視ならリモート</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="px-4 py-3 text-foreground border border-border font-medium">進行役</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">モデレーター有</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">モデレーター無</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">深掘りが必要なら有、大量データ収集なら無</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-foreground border border-border font-medium">タスク設計</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">探索的</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">タスクベース</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">初期段階は探索的、改善検証はタスクベース</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* セクション 3: テスト計画の立て方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">テスト計画の立て方</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              テストは準備の質で結果が決まります。以下の5ステップで計画を立てます。
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  step: 1,
                  title: '目的設定',
                  desc: '何を検証するかを明確にする。「ユーザーが商品購入を完了できるか」のように、具体的なタスクとゴールを定義する。',
                },
                {
                  step: 2,
                  title: '参加者リクルート',
                  desc: 'ターゲットユーザーに近い人を集める。Jakob Nielsen の研究によると、5人のテストで約80%のユーザビリティ問題を発見できる。',
                },
                {
                  step: 3,
                  title: 'タスク設計',
                  desc: '参加者に実行してもらうタスクを作成。「商品Xをカートに入れて購入手続きに進んでください」のように、誘導しない自然な表現で書く。',
                },
                {
                  step: 4,
                  title: '実施',
                  desc: '参加者にタスクを実行してもらい、操作を観察する。思考発話法（Think Aloud）で考えていることを声に出してもらうと、つまずきの原因が見えやすい。',
                },
                {
                  step: 5,
                  title: '分析',
                  desc: '観察結果を整理し、問題の重大度と頻度で優先度を付ける。全員がつまずいた箇所は最優先で改善する。',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mt-0.5">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-card border border-border rounded-lg px-4 py-3">
                    <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 5人で80%のビジュアル */}
            <div className="bg-muted/30 border border-border rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-3">5人テストの発見率</h3>
              <div className="flex items-end gap-2 h-32 mb-3">
                {[
                  { n: 1, pct: 31 },
                  { n: 2, pct: 52 },
                  { n: 3, pct: 68 },
                  { n: 4, pct: 75 },
                  { n: 5, pct: 80 },
                ].map((item) => (
                  <div key={item.n} className="flex flex-col items-center flex-1">
                    <span className="text-xs font-bold text-primary mb-1">{item.pct}%</span>
                    <div
                      className="w-full bg-primary/80 rounded-t-md transition-all"
                      style={{ height: `${(item.pct / 100) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground mt-1">{item.n}人</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                参加者数と問題発見率の関係（Nielsen/Landauer モデル）
              </p>
            </div>
          </section>

          {/* セクション 4: ヒューリスティック評価 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ヒューリスティック評価（Nielsen の 10 原則）</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ユーザーテストの前に、専門家の視点で UI を評価する手法です。
              Jakob Nielsen が提唱した10のヒューリスティクス（経験則）に照らして問題を洗い出します。
              ユーザーテストの補完として使うと効果的です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {[
                {
                  num: '01',
                  title: 'システム状態の可視化',
                  desc: '現在何が起きているかをユーザーにフィードバックする',
                  example: 'ローディング表示、進捗バー、保存完了メッセージ',
                },
                {
                  num: '02',
                  title: '実世界との一致',
                  desc: 'システム用語ではなく、ユーザーが理解できる言葉を使う',
                  example: '「レコードを削除」→「メモを消す」',
                },
                {
                  num: '03',
                  title: 'ユーザーコントロールと自由度',
                  desc: '間違った操作を元に戻せる手段を提供する',
                  example: '取り消し（Undo）、キャンセルボタン',
                },
                {
                  num: '04',
                  title: '一貫性と標準',
                  desc: '同じ操作には同じ見た目・動作を適用する',
                  example: 'ボタンのスタイル統一、用語の統一',
                },
                {
                  num: '05',
                  title: 'エラー防止',
                  desc: 'エラーが起きにくい設計にする',
                  example: '入力バリデーション、確認ダイアログ',
                },
                {
                  num: '06',
                  title: '再認 vs 記憶',
                  desc: '操作方法を覚えなくても見ればわかるようにする',
                  example: 'メニューの表示、最近使った項目の一覧',
                },
                {
                  num: '07',
                  title: '柔軟性と効率性',
                  desc: '初心者にも上級者にも使いやすくする',
                  example: 'ショートカットキー、カスタマイズ設定',
                },
                {
                  num: '08',
                  title: '美的で最小限のデザイン',
                  desc: '不要な情報を表示しない',
                  example: '段階的開示、優先度に応じた情報の整理',
                },
                {
                  num: '09',
                  title: 'エラーからの回復支援',
                  desc: 'エラーメッセージは原因と解決策を伝える',
                  example: '「入力が無効です」→「メールアドレスに @ を含めてください」',
                },
                {
                  num: '10',
                  title: 'ヘルプとドキュメント',
                  desc: '必要に応じて参照できるヘルプを用意する',
                  example: 'ツールチップ、FAQ、ガイドツアー',
                },
              ].map((item) => (
                <div key={item.num} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {item.num}
                    </span>
                    <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">{item.desc}</p>
                  <p className="text-xs text-muted-foreground/70">
                    <span className="font-medium text-muted-foreground">例: </span>{item.example}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* セクション 5: SUS */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">SUS（System Usability Scale）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              SUS は10項目の質問からなる標準化されたユーザビリティ評価アンケートです。
              John Brooke が1986年に開発し、現在も広く使われています。
              テスト後にユーザーに回答してもらい、0〜100点のスコアで使いやすさを数値化します。
            </p>

            <div className="bg-muted/30 border border-border rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-3">SUS スコアの目安</h3>
              <div className="flex items-end gap-1 h-24 mb-4">
                {[
                  { label: '0-50', color: 'bg-red-400 dark:bg-red-500', height: '25%', grade: 'F' },
                  { label: '51-67', color: 'bg-orange-400 dark:bg-orange-500', height: '45%', grade: 'D' },
                  { label: '68-80', color: 'bg-yellow-400 dark:bg-yellow-500', height: '65%', grade: 'C' },
                  { label: '81-90', color: 'bg-green-400 dark:bg-green-500', height: '85%', grade: 'B' },
                  { label: '91-100', color: 'bg-primary', height: '100%', grade: 'A' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center flex-1">
                    <span className="text-xs font-bold text-foreground mb-1">{item.grade}</span>
                    <div
                      className={`w-full ${item.color} rounded-t-md`}
                      style={{ height: item.height }}
                    />
                    <span className="text-[12px] text-muted-foreground mt-1">{item.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                平均スコアは 68 点。これを上回れば「平均以上の使いやすさ」と判断できます。
                80点以上でユーザーが積極的に他者に推薦するレベルとされています。
              </p>
            </div>
          </section>

          {/* セクション 6: 定量指標 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">定量指標</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ユーザビリティを客観的に測定するための指標を紹介します。
              テスト前後で比較することで、改善の効果を数値で確認できます。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-bold text-sm">TC</span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">タスク完了率</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  指定されたタスクを正しく完了できたユーザーの割合。
                  最も基本的な指標で、78%以上が一般的な合格ラインとされている。
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 font-bold text-sm">ER</span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">エラー率</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  タスク実行中に発生した操作ミスの回数。
                  エラーの種類（回復可能 / 不可能）も記録すると、改善の方向性が見えやすい。
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">TT</span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">所要時間</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  タスク完了までにかかった時間。
                  同じタスクの改善前後で比較することで、操作効率の向上を定量化できる。
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">NPS</span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">NPS（推奨度）</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  「このプロダクトを他者に勧めますか？」を0〜10で回答。
                  推奨者（9-10）の割合から批判者（0-6）の割合を引いた値。主観的な満足度の指標。
                </p>
              </div>
            </div>
          </section>

          {/* セクション 7: 改善サイクル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">改善サイクル</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ユーザビリティの向上は一度のテストで完了するものではありません。
              テストと改善を繰り返すことで、段階的に品質を上げていきます。
            </p>

            {/* Visual: Improvement cycle loop */}
            <div className="bg-muted/30 border border-border rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-4 text-center">テスト → 改善のループ</h3>
              <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
                {[
                  { label: 'テスト実施', icon: '1' },
                  { label: '問題の発見', icon: '2' },
                  { label: '優先度付け', icon: '3' },
                  { label: 'デザイン改善', icon: '4' },
                  { label: '再テスト', icon: '5' },
                ].map((item, i) => (
                  <div key={item.icon} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {item.icon}
                      </div>
                      <span className="text-xs text-foreground font-medium mt-1.5 text-center max-w-[80px]">
                        {item.label}
                      </span>
                    </div>
                    {i < 4 && (
                      <span className="text-primary font-bold text-lg mt-[-16px]">→</span>
                    )}
                  </div>
                ))}
              </div>
              {/* Loop back arrow */}
              <div className="flex justify-center mt-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>← 改善が確認できるまでサイクルを繰り返す →</span>
                </div>
              </div>
            </div>

            {/* 優先度マトリクス */}
            <div className="bg-card border border-border rounded-xl p-5 mb-6">
              <h3 className="font-semibold text-foreground mb-3">改善の優先度付け</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                発見した問題は「影響度」と「頻度」の2軸で優先度を判断します。
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left px-4 py-2 font-semibold text-foreground border border-border"></th>
                      <th className="text-left px-4 py-2 font-semibold text-foreground border border-border">高頻度</th>
                      <th className="text-left px-4 py-2 font-semibold text-foreground border border-border">低頻度</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 text-foreground border border-border font-medium">高影響</td>
                      <td className="px-4 py-2 border border-border">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">最優先で修正</span>
                      </td>
                      <td className="px-4 py-2 border border-border">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">次のイテレーションで対応</span>
                      </td>
                    </tr>
                    <tr className="bg-muted/20">
                      <td className="px-4 py-2 text-foreground border border-border font-medium">低影響</td>
                      <td className="px-4 py-2 border border-border">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">バックログに追加</span>
                      </td>
                      <td className="px-4 py-2 border border-border">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">余裕があれば対応</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <InfoBox type="success" title="完璧を目指さない">
              <p>
                すべての問題を一度に解決しようとすると、リリースが遅れます。
                小さく早くテストして、改善を回す。重大な問題を先に潰し、細かい改善は次のサイクルに回す。
                この「テストと改善の短いループ」こそが、ユーザビリティ向上の実践的なアプローチです。
              </p>
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <Quiz
            question="Jakob Nielsen の研究によると、ユーザビリティテストで約80%の問題を発見するために必要な参加者数は何人ですか？"
            options={[
              { label: '3人' },
              { label: '5人', correct: true },
              { label: '10人' },
              { label: '20人' },
            ]}
            explanation="Nielsen と Landauer の研究では、5人のユーザーでユーザビリティ問題の約80%を発見できることが示されています。参加者を増やしても発見率の上昇は緩やかになるため、まず5人でテストし、改善後にまた5人でテストする方がコスト効率が良いとされています。"
          />

          {/* Quiz 2 */}
          <Quiz
            question="Nielsen の 10 ヒューリスティクスのうち、「間違った操作を元に戻せる手段を提供する」ことを指す原則はどれですか？"
            options={[
              { label: 'エラー防止' },
              { label: 'ユーザーコントロールと自由度', correct: true },
              { label: 'エラーからの回復支援' },
              { label: '柔軟性と効率性' },
            ]}
            explanation="「ユーザーコントロールと自由度」は、ユーザーが間違った操作をしても取り消し（Undo）やキャンセルで元の状態に戻れることを求める原則です。「エラー防止」はエラーが起きにくい設計、「エラーからの回復支援」はエラーメッセージの質に関する原則です。"
          />

          {/* リファレンスリンク */}
          <ReferenceLinks
            links={[
              {
                title: '10 Usability Heuristics for User Interface Design',
                url: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
                description: 'Nielsen Norman Group による 10 ヒューリスティクスの解説',
              },
              {
                title: 'Why You Only Need to Test with 5 Users',
                url: 'https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/',
                description: '5人テストの根拠となる研究',
              },
              {
                title: 'System Usability Scale (SUS)',
                url: 'https://www.usability.gov/how-to-and-tools/methods/system-usability-scale.html',
                description: 'SUS の公式ガイドと計算方法',
              },
              {
                title: 'Usability Testing 101',
                url: 'https://www.nngroup.com/articles/usability-testing-101/',
                description: 'ユーザビリティテストの基本を網羅した入門ガイド',
              },
            ]}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
