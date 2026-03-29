import {
  Users,
  MessageSquare,
  ClipboardList,
  Eye,
  FlaskConical,
  BarChart3,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import WhyNowBox from '@/components/WhyNowBox';
import InfoBox from '@/components/InfoBox';
import Quiz from '@/components/Quiz';
import CodeBlock from '@/components/CodeBlock';
import ReferenceLinks from '@/components/ReferenceLinks';
import PageNavigation from '@/components/PageNavigation';

const researchMethods = [
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: 'ユーザーインタビュー',
    category: '定性',
    desc: '1対1の対話を通じてユーザーの行動・動機・課題を深掘りする手法。',
    detail:
      '半構造化インタビュー（事前に質問リストを用意しつつ、回答に応じて柔軟に深掘り）が実務では多い。1セッション30〜60分が目安。5〜8人で主要なパターンが見えてくる。',
    tools: 'Zoom / Google Meet / 対面',
  },
  {
    icon: <ClipboardList className="w-5 h-5" />,
    title: 'アンケート調査',
    category: '定量',
    desc: '大量のユーザーからデータを収集し、傾向や分布を把握する手法。',
    detail:
      '選択式の質問で量的データを、自由記述で質的データを取得できる。回答率を上げるには質問数を10〜15問以内に抑え、所要時間を明示する。',
    tools: 'Google Forms / Typeform / SurveyMonkey',
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: '行動観察 (Contextual Inquiry)',
    category: '定性',
    desc: 'ユーザーが実際にプロダクトを使う場面を観察し、言語化されないニーズを発見する手法。',
    detail:
      'ユーザーの自然な環境で観察することで、インタビューでは出てこない暗黙の行動パターンや不満を捉えられる。「なぜそうしたか」をその場で確認する。',
    tools: '現地訪問 / 画面録画 / Lookback',
  },
  {
    icon: <FlaskConical className="w-5 h-5" />,
    title: 'A/B テスト',
    category: '定量',
    desc: '2つのバリエーションを同時に公開し、どちらがより良い成果を出すかを統計的に検証する手法。',
    detail:
      'ボタンの色やコピーの変更など、1回のテストで検証する変数は1つに絞る。十分なサンプルサイズを確保し、統計的有意差を確認する。',
    tools: 'Google Optimize / Optimizely / LaunchDarkly',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'アナリティクス分析',
    category: '定量',
    desc: 'アクセスログやイベントデータから、ユーザーの行動パターンを数値で把握する手法。',
    detail:
      'ページビュー、離脱率、コンバージョンファネルなどの指標を追跡する。ヒートマップツールと組み合わせると、クリック位置やスクロール深度も可視化できる。',
    tools: 'GA4 / Hotjar / Clarity / Mixpanel',
  },
];

const interviewGoodBad = [
  {
    bad: 'この機能は使いやすいですか？',
    good: 'この機能を最後に使ったときのことを教えてください。',
    reason: 'Yes/No で答えられる質問は表面的な回答しか得られない。具体的なエピソードを引き出す。',
  },
  {
    bad: '新機能Aと新機能B、どちらが欲しいですか？',
    good: '普段の業務で一番時間がかかっている作業は何ですか？',
    reason: '解決策を選ばせるのではなく、課題を明らかにする。解決策はデザイナーが考える。',
  },
  {
    bad: 'もしこの機能があったら使いますか？',
    good: '現在、その課題をどのように対処していますか？',
    reason: '仮定の質問への回答は信頼性が低い。現在の行動にフォーカスする。',
  },
  {
    bad: '普通、こういう場面ではどうしますか？',
    good: '先週、実際にその状況になったとき何をしましたか？',
    reason: '「普通は」という質問は理想化された回答を誘導する。具体的な過去の行動を聞く。',
  },
];

const researchPlanTemplate = `# リサーチ計画書

## 1. リサーチの目的
- 何を明らかにしたいのか
- この調査結果がどの意思決定に使われるのか

## 2. リサーチクエスチョン
- RQ1: [具体的な問い]
- RQ2: [具体的な問い]
- RQ3: [具体的な問い]

## 3. 手法の選定
- 手法: [インタビュー / アンケート / 行動観察 / A/B テスト]
- 選定理由: [なぜこの手法が最適か]

## 4. 対象者
- ターゲットユーザーの条件
- リクルーティング方法
- 参加人数: [N人]

## 5. スケジュール
| フェーズ     | 期間      | 担当者 |
|-------------|----------|--------|
| 計画・設計   | Week 1   | -      |
| リクルート   | Week 1-2 | -      |
| 実査        | Week 2-3 | -      |
| 分析・報告   | Week 3-4 | -      |

## 6. 成果物
- 分析レポート
- インサイト一覧
- 改善提案（優先度付き）`;

export default function UserResearch() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="step-badge">STEP 5</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          ユーザーリサーチ手法
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          仮説ではなくデータに基づいた設計判断を行うための、
          主要なリサーチ手法とその使い分けを学ぶ。
        </p>

        <WhyNowBox tags={['ユーザーリサーチ', '定性調査', '定量調査', 'インタビュー']}>
          <p>
            「ユーザーのことは分かっている」という思い込みが、使われないプロダクトを
            生み出す原因になる。ユーザーリサーチは、仮説ではなく実際のデータに基づいて
            設計判断を行うための手法群であり、デザイン思考の Empathize（共感）と
            Test（テスト）を具体的に実行する手段でもある。
            リサーチを習慣にすることで、チーム全体の意思決定の質が上がる。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 定性 vs 定量 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              定性リサーチ vs 定量リサーチ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              リサーチ手法は大きく「定性」と「定量」に分類できる。
              どちらか一方だけでは不十分であり、両方を組み合わせることで
              「なぜ」と「どのくらい」の両面から理解が深まる。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-4 font-bold text-foreground">観点</th>
                    <th className="text-center py-3 px-4 font-bold text-primary">定性リサーチ</th>
                    <th className="text-center py-3 px-4 font-bold text-primary">定量リサーチ</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">目的</td>
                    <td className="py-3 px-4 text-center">「なぜ」を理解する</td>
                    <td className="py-3 px-4 text-center">「どのくらい」を測定する</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">データの性質</td>
                    <td className="py-3 px-4 text-center">言葉・行動・感情</td>
                    <td className="py-3 px-4 text-center">数値・統計・割合</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">サンプルサイズ</td>
                    <td className="py-3 px-4 text-center">少数（5〜15人）</td>
                    <td className="py-3 px-4 text-center">多数（100人以上）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">代表的手法</td>
                    <td className="py-3 px-4 text-center">インタビュー、行動観察</td>
                    <td className="py-3 px-4 text-center">アンケート、A/Bテスト、分析</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">得意な場面</td>
                    <td className="py-3 px-4 text-center">課題の発見・深掘り</td>
                    <td className="py-3 px-4 text-center">仮説の検証・優先度判断</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">注意点</td>
                    <td className="py-3 px-4 text-center">解釈にバイアスが入りやすい</td>
                    <td className="py-3 px-4 text-center">数字の裏にある理由が見えない</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="組み合わせの基本パターン">
              <p>
                実務では「定性で課題を発見し、定量で規模を測る」という流れが多い。
                例: インタビューで「検索が使いにくい」という声が出た場合、
                アナリティクスで検索機能の利用率や離脱率を確認して
                課題の重大さを判断する。
              </p>
            </InfoBox>
          </section>

          {/* 主要な手法 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              主要なリサーチ手法
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              それぞれの手法には適した場面がある。プロジェクトのフェーズ、
              予算、時間に応じて使い分ける。
            </p>

            <div className="space-y-6">
              {researchMethods.map((method) => (
                <div
                  key={method.title}
                  className="rounded-xl border border-border bg-card overflow-hidden"
                >
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-muted/30">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      {method.icon}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-foreground text-sm">{method.title}</h4>
                      <span
                        className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${
                          method.category === '定性'
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        }`}
                      >
                        {method.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-foreground mb-3">{method.desc}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {method.detail}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-bold">Tools:</span>
                      <span>{method.tools}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* インタビュー質問の良い例 vs 悪い例 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              インタビュー質問の良い例 vs 悪い例
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              インタビューの質は質問の設計で決まる。誘導質問や仮定の質問は避け、
              ユーザーの実際の行動と具体的なエピソードを引き出す質問を設計する。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-4 font-bold text-foreground w-16">
                      <span className="sr-only">判定</span>
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">質問</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">理由</th>
                  </tr>
                </thead>
                <tbody>
                  {interviewGoodBad.map((item, i) => (
                    <>
                      <tr key={`bad-${i}`} className="border-b border-border bg-red-50/30 dark:bg-red-950/10">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <XCircle size={14} className="text-red-500" />
                            <span className="text-xs font-bold text-red-600 dark:text-red-400">NG</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{item.bad}</td>
                        <td className="py-3 px-4 text-xs text-muted-foreground" rowSpan={2}>
                          {item.reason}
                        </td>
                      </tr>
                      <tr key={`good-${i}`} className="border-b border-border bg-emerald-50/30 dark:bg-emerald-950/10">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <CheckCircle2 size={14} className="text-emerald-500" />
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">OK</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-foreground font-medium">{item.good}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="warning" title="バイアスに注意する">
              <p>
                インタビュアーの表情・相づち・質問の順序がユーザーの回答に影響を与える
                （確証バイアス、社会的望ましさバイアス）。
                質問リストを事前にレビューし、誘導的な表現がないかチェックする習慣をつける。
              </p>
            </InfoBox>
          </section>

          {/* リサーチ計画テンプレート */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              リサーチ計画テンプレート
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              リサーチを始める前に計画書を作成する。
              目的・手法・対象者・スケジュールを明文化しておくことで、
              チーム内の認識を揃え、リサーチの品質を担保できる。
              以下は実務で使えるテンプレートの例。
            </p>

            <CodeBlock
              code={researchPlanTemplate}
              language="markdown"
              title="リサーチ計画書テンプレート"
              showLineNumbers
            />

            <div className="mt-4">
              <InfoBox type="info" title="計画書の活用ポイント">
                <p>
                  リサーチ計画書はステークホルダーとの合意形成ツールでもある。
                  「何のために」「誰を対象に」「いつまでに」を明確にすることで、
                  リサーチへの理解と協力を得やすくなる。
                  また、リサーチ完了後に計画と結果を照合することで振り返りの精度が上がる。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* リサーチ手法の選び方フロー */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              手法選びの判断基準
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「どの手法を使うべきか」はプロジェクトの状況に依存する。
              以下の判断軸を使うと、適切な手法を選びやすくなる。
            </p>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground mb-1">
                      課題がまだ不明確な場合
                    </p>
                    <p className="text-sm text-muted-foreground">
                      定性リサーチ（インタビュー・行動観察）から始める。何が問題かを明らかにする。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground mb-1">
                      仮説の検証・優先度判断をしたい場合
                    </p>
                    <p className="text-sm text-muted-foreground">
                      定量リサーチ（アンケート・A/Bテスト・アナリティクス）で規模を測定する。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground mb-1">
                      デザイン案を比較したい場合
                    </p>
                    <p className="text-sm text-muted-foreground">
                      A/B テストやユーザビリティテストで実際のユーザー行動をもとに判断する。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="定性リサーチと定量リサーチの違いとして最も適切なものはどれか？"
              options={[
                { label: '定性リサーチは大人数から、定量リサーチは少人数から情報を収集する' },
                { label: '定性リサーチは「なぜ」を理解し、定量リサーチは「どのくらい」を測定する', correct: true },
                { label: '定性リサーチは数値データを、定量リサーチは文章データを扱う' },
                { label: '定性リサーチは仮説検証に、定量リサーチは課題発見に向いている' },
              ]}
              explanation="定性リサーチはインタビューや観察を通じて「なぜそうするのか」を深く理解するのに向いている。定量リサーチはアンケートやアナリティクスを通じて「どのくらいの規模か」を数値で把握する。両方を組み合わせることで課題の全体像が見える。"
            />

            <Quiz
              question="ユーザーインタビューの質問として最も適切なものはどれか？"
              options={[
                { label: 'この機能は使いやすいですよね？' },
                { label: 'もしこの機能があったら使いますか？' },
                { label: '最後にこの作業をしたとき、どのような手順で進めましたか？', correct: true },
                { label: '新デザインAとB、どちらが好みですか？' },
              ]}
              explanation="インタビューでは具体的な過去の行動を聞く質問が最も有効。誘導質問（〜ですよね？）、仮定の質問（もし〜なら）、選好の質問（どちらが好き？）は避け、ユーザーの実体験にフォーカスする。"
            />
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'NNGroup: When to Use Which User-Experience Research Methods',
                  url: 'https://www.nngroup.com/articles/which-ux-research-methods/',
                  description: '20以上のリサーチ手法を「態度 vs 行動」「定性 vs 定量」の2軸で分類した解説。',
                },
                {
                  title: 'Google: UX Research Methods',
                  url: 'https://research.google/pubs/pub43939/',
                  description: 'Google のリサーチチームによるリサーチ手法の選定ガイド。',
                },
                {
                  title: 'Steve Portigal: Interviewing Users',
                  url: 'https://portigal.com/Books/interviewing-users/',
                  description: 'ユーザーインタビューの設計と実施に関する実践的な書籍。',
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
