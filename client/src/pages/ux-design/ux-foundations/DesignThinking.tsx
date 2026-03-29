import {
  Lightbulb,
  Search,
  Target,
  Sparkles,
  Box,
  FlaskConical,
  ArrowRight,
  RefreshCcw,
  AlertTriangle,
} from 'lucide-react';
import WhyNowBox from '@/components/WhyNowBox';
import InfoBox from '@/components/InfoBox';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';
import PageNavigation from '@/components/PageNavigation';

const steps = [
  {
    num: 1,
    label: 'Empathize',
    title: '共感',
    icon: <Search className="w-5 h-5" />,
    color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
    what: 'ユーザーの行動・感情・ニーズを深く理解する段階。',
    why: '作り手の思い込みではなく、実際のユーザー視点で課題を捉えるため。',
    how: 'インタビュー、行動観察、共感マップの作成などを通じてユーザーの体験を追体験する。',
  },
  {
    num: 2,
    label: 'Define',
    title: '問題定義',
    icon: <Target className="w-5 h-5" />,
    color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    what: '共感で得たインサイトを整理し、解決すべき本質的な問題を明文化する段階。',
    why: '解くべき問題を間違えると、どんな優れた解決策も意味をなさないため。',
    how: 'ペルソナ作成、ユーザーストーリー、POV（Point of View）ステートメントの策定。',
  },
  {
    num: 3,
    label: 'Ideate',
    title: '創造',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    what: '定義した問題に対して、できるだけ多くの解決アイデアを発散的に生み出す段階。',
    why: '最初に思いつく解決策は最善とは限らない。選択肢を広げることで質の高い解が見つかる。',
    how: 'ブレインストーミング、スケッチ、How Might We 質問、マインドマップなどを活用する。',
  },
  {
    num: 4,
    label: 'Prototype',
    title: 'プロトタイプ',
    icon: <Box className="w-5 h-5" />,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    what: 'アイデアを低コストで素早く形にする段階。',
    why: '頭の中のアイデアを具体化することで、チーム内の認識を揃え、テスト可能にするため。',
    how: 'ペーパープロトタイプ、ワイヤーフレーム、Figma プロトタイプなど、忠実度を段階的に上げる。',
  },
  {
    num: 5,
    label: 'Test',
    title: 'テスト',
    icon: <FlaskConical className="w-5 h-5" />,
    color: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800',
    what: 'プロトタイプをユーザーに使ってもらい、フィードバックを得る段階。',
    why: '仮説が正しいかを実際のユーザー行動で検証し、改善点を特定するため。',
    how: 'ユーザビリティテスト、A/B テスト、ヒューリスティック評価などを実施する。',
  },
];

const brainstormingRules = [
  {
    title: '質より量',
    desc: 'まずは数を出すことを優先する。判断は後回し。',
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    title: '批判禁止',
    desc: 'アイデア出しの段階では否定や評価をしない。',
    icon: <AlertTriangle className="w-5 h-5" />,
  },
  {
    title: '便乗歓迎',
    desc: '他者のアイデアに乗っかって発展させる。',
    icon: <ArrowRight className="w-5 h-5" />,
  },
  {
    title: '突飛な発想OK',
    desc: '実現性を気にせず自由に発想する。制約は後から考える。',
    icon: <Sparkles className="w-5 h-5" />,
  },
];

const hmwExamples = [
  {
    problem: 'ユーザーがアプリの初回設定で離脱している',
    hmw: 'How might we 初回設定を「楽しい体験」に変えられないか？',
  },
  {
    problem: 'ECサイトでカート放棄率が高い',
    hmw: 'How might we 購入完了までの心理的ハードルを下げられないか？',
  },
  {
    problem: '社内ツールのマニュアルが読まれない',
    hmw: 'How might we マニュアルを読まなくても使えるUIにできないか？',
  },
];

export default function DesignThinking() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="step-badge">STEP 4</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          デザイン思考
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          ユーザーの課題を起点に、共感・定義・創造・試作・検証の5ステップで
          解決策を導くフレームワークを理解する。
        </p>

        <WhyNowBox tags={['デザイン思考', 'Stanford d.school', 'HMW', 'ブレインストーミング']}>
          <p>
            デザイン思考は、Stanford d.school が体系化した問題解決のフレームワークとして
            世界中の企業・教育機関で活用されている。Google、Apple、IDEO などが実践し、
            プロダクト開発だけでなくビジネス戦略や社会課題の解決にも応用されている。
            UX デザインの土台となる考え方であり、ここで全体像を把握しておくと
            後続のリサーチやプロトタイピングの位置づけが明確になる。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 5ステップの全体図 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              デザイン思考の5ステップ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Stanford d.school が提唱する5つのフェーズを順に見ていく。
              各ステップは直線的に進むのではなく、必要に応じて前のステップに戻る
              反復的なプロセスである点が重要になる。
            </p>

            {/* フロー図 */}
            <div className="mb-8 p-6 rounded-xl border border-border bg-card">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                {steps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${step.color}`}>
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-current/10 flex-shrink-0">
                        <span className="text-xs font-bold">{step.num}</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-none">{step.label}</p>
                        <p className="text-[12px] opacity-70">{step.title}</p>
                      </div>
                    </div>
                    {i < steps.length - 1 && (
                      <ArrowRight
                        size={16}
                        className="text-muted-foreground hidden md:block flex-shrink-0"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border">
                <RefreshCcw size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  各ステップ間を行き来する反復プロセス
                </span>
              </div>
            </div>
          </section>

          {/* 各ステップの詳細 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              各ステップの詳細
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              それぞれのステップで「何をするのか」「なぜ必要なのか」「どう実践するのか」を
              確認する。
            </p>

            <div className="space-y-6">
              {steps.map((step) => (
                <div
                  key={step.label}
                  className="rounded-xl border border-border bg-card overflow-hidden"
                >
                  <div className={`flex items-center gap-3 px-5 py-3 border-b border-border ${step.color} bg-opacity-50`}>
                    {step.icon}
                    <div>
                      <span className="text-sm font-bold">
                        Step {step.num}: {step.title}
                      </span>
                      <span className="text-xs opacity-60 ml-2">({step.label})</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                    <div className="p-4">
                      <p className="text-xs font-bold text-primary mb-1">What</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.what}</p>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-bold text-primary mb-1">Why</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.why}</p>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-bold text-primary mb-1">How</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.how}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How Might We */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              「How Might We」質問の作り方
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              HMW（How Might We）質問は、問題定義（Define）から創造（Ideate）へ橋渡しする
              手法として広く使われている。問題をそのまま受け止めるのではなく、
              「どうすれば〜できるか？」という形に変換することで、
              チームの発想を前向きに導く。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              良い HMW 質問は「広すぎず、狭すぎない」ことがポイントになる。
              広すぎると焦点がぼやけ、狭すぎると解決策の幅が制限される。
            </p>

            <div className="space-y-4 mb-6">
              {hmwExamples.map((ex) => (
                <div
                  key={ex.problem}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <p className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">
                    課題
                  </p>
                  <p className="text-sm text-foreground mb-3">{ex.problem}</p>
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <ArrowRight size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium text-primary">{ex.hmw}</p>
                  </div>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="HMW の構文パターン">
              <p>
                基本形は「How might we + 動詞 + 目的語 + 条件？」。
                「How might we」を日本語にする場合は「どうすれば〜できるか？」とすると自然になる。
                チームで共有する際は、付箋1枚に1つの HMW を書き出し、壁に貼って俯瞰すると
                問題の構造が見えやすくなる。
              </p>
            </InfoBox>
          </section>

          {/* ブレインストーミングのルール */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ブレインストーミングのルール
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Ideate フェーズの代表的な手法であるブレインストーミングには、
              IDEO が提唱する基本ルールがある。これを守ることで、心理的安全性を確保しながら
              アイデアの量と多様性を最大化できる。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {brainstormingRules.map((rule) => (
                <div
                  key={rule.title}
                  className="rounded-xl border border-border bg-card p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {rule.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm mb-1">{rule.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 落とし穴 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              デザイン思考の落とし穴
            </h2>

            <InfoBox type="warning" title="プロセスに固執しない">
              <p className="mb-2">
                デザイン思考は「5つのステップを順番にこなすこと」が目的ではない。
                現実のプロジェクトでは、ステップ3（Ideate）で得たアイデアが
                ステップ1（Empathize）に新たな気づきをもたらすこともある。
              </p>
              <p className="mb-2">
                重要なのは、プロセスの形式を守ることではなく、
                「ユーザーの課題に立ち返り続ける」「仮説を検証し続ける」という姿勢を保つことにある。
              </p>
              <p>
                また、デザイン思考だけで全てが解決するわけではない。
                技術的制約、ビジネス要件、法規制など、デザイン思考の外にある要素も
                総合的に判断する視点が必要になる。
              </p>
            </InfoBox>

            <div className="mt-6 rounded-xl border border-border bg-card p-6">
              <h4 className="font-bold text-foreground mb-4">よくある失敗パターン</h4>
              <div className="space-y-3">
                {[
                  {
                    pattern: 'Empathize を飛ばしていきなり Ideate に入る',
                    impact: 'ユーザー不在の解決策になり、リリース後に「使われない」機能が生まれる。',
                  },
                  {
                    pattern: '1回のサイクルで完了とみなす',
                    impact: '初回のテスト結果だけで判断し、改善の余地を見逃す。反復が不足する。',
                  },
                  {
                    pattern: 'プロトタイプの忠実度が最初から高すぎる',
                    impact: '時間がかかりすぎ、フィードバックを受けて変更する心理的コストが上がる。',
                  },
                ].map((item) => (
                  <div
                    key={item.pattern}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <AlertTriangle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.pattern}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="デザイン思考の5ステップで、ユーザーの行動や感情を深く理解するフェーズはどれか？"
              options={[
                { label: 'Define（問題定義）' },
                { label: 'Empathize（共感）', correct: true },
                { label: 'Ideate（創造）' },
                { label: 'Test（テスト）' },
              ]}
              explanation="Empathize（共感）は、ユーザーの行動・感情・ニーズを深く理解するための最初のステップ。インタビューや行動観察を通じて、作り手の思い込みではなくユーザー視点で課題を捉えることが目的となる。"
            />

            <Quiz
              question="「How Might We」質問の目的として最も適切なものはどれか？"
              options={[
                { label: '問題の原因を特定すること' },
                { label: 'チームの合意形成を図ること' },
                { label: '問題を発想の起点となる問いに変換すること', correct: true },
                { label: 'プロトタイプの仕様を決めること' },
              ]}
              explanation="HMW 質問は、課題をそのまま受け止めるのではなく「どうすれば〜できるか？」という形に変換することで、チームの発想を前向きに導く手法。Define から Ideate への橋渡しとして機能する。"
            />
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Stanford d.school: An Introduction to Design Thinking',
                  url: 'https://dschool.stanford.edu/resources/getting-started-with-design-thinking',
                  description: 'デザイン思考の原典。5ステップの詳細なプロセスガイド。',
                },
                {
                  title: 'IDEO Design Thinking',
                  url: 'https://designthinking.ideo.com/',
                  description: 'IDEO が公開するデザイン思考のリソースとケーススタディ。',
                },
                {
                  title: 'NNGroup: Design Thinking',
                  url: 'https://www.nngroup.com/articles/design-thinking/',
                  description: 'Nielsen Norman Group によるデザイン思考の実践的な解説。',
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
