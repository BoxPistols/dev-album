import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import {
  User,
  Target,
  Frown,
  TrendingUp,
  MapPin,
  MessageSquare,
  Brain,
  Hand,
  Ear,
  Eye,
} from "lucide-react";

const personaData = {
  name: "田中 美咲（32歳）",
  role: "IT 企業の営業職",
  goal: "仕事帰りに手早く日用品をまとめ買いしたい",
  frustration: "商品比較に時間がかかり、結局カートに入れたまま離脱する",
  behavior: "通勤電車でスマホ閲覧、週末にまとめて購入する傾向",
  device: "iPhone メイン、PC はほぼ使わない",
  quote: "比較しなくても安心して買える仕組みがほしい",
};

const journeyPhases = [
  {
    phase: "認知",
    action: "SNS 広告を見てサイトを訪問",
    thought: "こんなサービスがあるんだ",
    emotion: "neutral" as const,
    touchpoint: "Instagram 広告",
    issue: "広告とLPの印象にギャップがある",
  },
  {
    phase: "検討",
    action: "商品カテゴリを閲覧、レビューを確認",
    thought: "他の商品と何が違うのだろう",
    emotion: "negative" as const,
    touchpoint: "商品一覧ページ、レビュー",
    issue: "比較機能がなく判断に時間がかかる",
  },
  {
    phase: "購入",
    action: "カートに商品を入れて決済",
    thought: "送料を含めると割高に感じる",
    emotion: "negative" as const,
    touchpoint: "カート、決済画面",
    issue: "送料表示が遅く、離脱が発生する",
  },
  {
    phase: "利用",
    action: "商品が届き、使用開始",
    thought: "思ったより使いやすい",
    emotion: "positive" as const,
    touchpoint: "配送メール、商品同梱物",
    issue: "使い方ガイドが不十分",
  },
  {
    phase: "推奨",
    action: "友人に共有、レビューを投稿",
    thought: "次回も使いたい",
    emotion: "positive" as const,
    touchpoint: "レビュー画面、SNS",
    issue: "レビュー投稿の導線がわかりにくい",
  },
];

const journeySteps = [
  {
    step: 1,
    title: "スコープを定義する",
    description:
      "どのペルソナの、どのシナリオを対象にするかを明確にする。全体像を一枚にまとめようとせず、具体的な利用場面に絞る。",
  },
  {
    step: 2,
    title: "フェーズを設定する",
    description:
      "ユーザー行動を時系列で区切る。認知 → 検討 → 購入 → 利用 → 推奨が典型的だが、サービスに合わせて調整する。",
  },
  {
    step: 3,
    title: "各フェーズの行動・思考・感情を記録する",
    description:
      "インタビューやアンケートのデータを元に、各フェーズでユーザーが何をし、何を考え、どう感じるかを書き出す。",
  },
  {
    step: 4,
    title: "タッチポイントと課題を特定する",
    description:
      "ユーザーがサービスと接触するポイントを洗い出し、そこで発生している課題を記録する。",
  },
  {
    step: 5,
    title: "改善機会を可視化する",
    description:
      "感情の落ち込みが大きい箇所が改善の優先ポイント。課題の隣に具体的な改善案を追記する。",
  },
];

const empathyQuadrants = [
  {
    label: "Think",
    title: "考えていること",
    icon: <Brain className="w-5 h-5" />,
    color:
      "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20",
    items: [
      "他の選択肢の方が安いかもしれない",
      "このサービスは信頼できるのか",
      "時間をかけずに決めたい",
    ],
  },
  {
    label: "Feel",
    title: "感じていること",
    icon: <Ear className="w-5 h-5" />,
    color:
      "border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/20",
    items: [
      "選択肢が多すぎて不安",
      "比較に疲れている",
      "良い買い物をしたいという期待",
    ],
  },
  {
    label: "Say",
    title: "言っていること",
    icon: <MessageSquare className="w-5 h-5" />,
    color:
      "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20",
    items: [
      "もっと簡単に選べないの？",
      "友達にすすめられたから使ってみた",
      "レビューが少ないと不安",
    ],
  },
  {
    label: "Do",
    title: "行動していること",
    icon: <Hand className="w-5 h-5" />,
    color:
      "border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20",
    items: [
      "複数タブで価格を比較している",
      "カートに入れたまま放置する",
      "レビューを上から3件だけ読む",
    ],
  },
];

function EmotionIndicator({ type }: { type: "positive" | "negative" | "neutral" }) {
  const config = {
    positive: { label: "Good", color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
    negative: { label: "Bad", color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30" },
    neutral: { label: "Neutral", color: "text-muted-foreground", bg: "bg-muted" },
  };
  const c = config[type];
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${c.color} ${c.bg}`}>
      {c.label}
    </span>
  );
}

export default function PersonaJourney() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        {/* Header */}
        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            ペルソナとジャーニーマップ
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            リサーチで得たユーザー情報を「ペルソナ」と「ジャーニーマップ」に整理し、チーム全体で共有できる形にします。
          </p>
        </div>

        {/* WhyNowBox */}
        <WhyNowBox tags={["ペルソナ", "ジャーニーマップ", "エンパシーマップ", "UXリサーチ"]}>
          <p>
            インタビューやアンケートで集めたデータは、そのままではチーム間の認識がずれやすい。
            ペルソナとジャーニーマップはリサーチ結果を設計判断に活かすための可視化ツールで、
            「誰のために作るか」「どこに課題があるか」をチーム全員が同じ目線で共有できるようになる。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ペルソナとは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <User className="text-primary" />
              ペルソナとは
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ペルソナは、ターゲットユーザーを代表する架空の人物像です。
              実際のリサーチデータに基づいて作成し、チーム全体がユーザー視点で判断できるようにする。
              「平均的なユーザー」ではなく、具体的な一人の人物として描くことが重要です。
            </p>

            {/* 良いペルソナの要素 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {[
                { icon: <User className="w-4 h-4" />, label: "名前・写真" },
                { icon: <MapPin className="w-4 h-4" />, label: "属性・背景" },
                { icon: <Target className="w-4 h-4" />, label: "ゴール" },
                { icon: <Frown className="w-4 h-4" />, label: "フラストレーション" },
                { icon: <TrendingUp className="w-4 h-4" />, label: "行動パターン" },
                { icon: <MessageSquare className="w-4 h-4" />, label: "代表的な発言" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-card text-sm"
                >
                  <span className="text-primary flex-shrink-0">{item.icon}</span>
                  <span className="text-foreground font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* ペルソナ例 */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
                  <User className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {personaData.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {personaData.role}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                      Goal
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {personaData.goal}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-wider mb-1">
                      Frustration
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {personaData.frustration}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      Behavior
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {personaData.behavior}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      Device
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {personaData.device}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground italic">
                  "{personaData.quote}"
                </p>
              </div>
            </div>

            <InfoBox type="info" title="ペルソナ作成の注意点">
              ペルソナはリサーチデータから作成する。チームの想像だけで書いたものは
              「仮説ペルソナ」にすぎない。ユーザーインタビューやアンケートの結果を
              反映させることで、設計判断の根拠として機能する。
            </InfoBox>
          </section>

          {/* カスタマージャーニーマップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Eye className="text-primary" />
              カスタマージャーニーマップ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ジャーニーマップはユーザーがサービスと関わる一連の体験を時系列で可視化するツールです。
              横軸にフェーズ、縦軸に行動・思考・感情・タッチポイント・課題を配置します。
            </p>

            {/* Journey Map Visual */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b-2 border-primary/30">
                    <th className="text-left py-3 px-3 font-bold text-foreground bg-muted w-28">
                      フェーズ
                    </th>
                    {journeyPhases.map((p) => (
                      <th
                        key={p.phase}
                        className="text-center py-3 px-3 font-bold text-primary bg-primary/5"
                      >
                        {p.phase}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground bg-muted">
                      行動
                    </td>
                    {journeyPhases.map((p) => (
                      <td
                        key={p.phase}
                        className="py-3 px-3 text-muted-foreground text-center"
                      >
                        {p.action}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground bg-muted">
                      思考
                    </td>
                    {journeyPhases.map((p) => (
                      <td
                        key={p.phase}
                        className="py-3 px-3 text-muted-foreground text-center italic"
                      >
                        {p.thought}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground bg-muted">
                      感情
                    </td>
                    {journeyPhases.map((p) => (
                      <td key={p.phase} className="py-3 px-3 text-center">
                        <EmotionIndicator type={p.emotion} />
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground bg-muted">
                      接点
                    </td>
                    {journeyPhases.map((p) => (
                      <td
                        key={p.phase}
                        className="py-3 px-3 text-muted-foreground text-center"
                      >
                        {p.touchpoint}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-foreground bg-muted">
                      課題
                    </td>
                    {journeyPhases.map((p) => (
                      <td
                        key={p.phase}
                        className="py-3 px-3 text-red-600 dark:text-red-400 text-center text-xs"
                      >
                        {p.issue}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="感情曲線に注目する">
              感情が「Bad」に下がっている箇所が改善の優先ポイントになる。
              ジャーニーマップは問題の発見だけでなく、改善施策の優先順位付けにも使える。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="ペルソナを作成する際、最も重要な情報源は？"
              options={[
                { label: "チームメンバーの直感や経験" },
                { label: "競合サービスのターゲット設定" },
                {
                  label: "ユーザーインタビューやアンケートなどのリサーチデータ",
                  correct: true,
                },
                { label: "マーケティング部門の要望" },
              ]}
              explanation="ペルソナはリサーチデータに基づいて作成する。チームの想像だけで書いたものは「仮説ペルソナ」であり、設計判断の根拠としては不十分になる。実際のユーザーの声や行動データを反映させることが重要。"
            />
          </section>

          {/* ジャーニーマップの作り方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ジャーニーマップの作り方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              以下の 5 ステップで、実用的なジャーニーマップを作成できます。
            </p>

            <div className="space-y-3">
              {journeySteps.map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 items-start rounded-xl border border-border bg-card p-4"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* エンパシーマップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Brain className="text-primary" />
              エンパシーマップ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              エンパシーマップは、ユーザーの内面を Think（考えていること）/ Feel（感じていること）/
              Say（言っていること）/ Do（行動していること）の 4 象限で整理するフレームワークです。
              ペルソナを補完し、ユーザーの心理をより深く理解するために使います。
            </p>

            {/* 4-quadrant visual */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {empathyQuadrants.map((q) => (
                <div
                  key={q.label}
                  className={`rounded-xl border-2 p-5 ${q.color}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-foreground">{q.icon}</span>
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        {q.label}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {q.title}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {q.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-foreground/80 leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-muted-foreground mt-1 flex-shrink-0">
                          -
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="エンパシーマップの使いどころ">
              ペルソナが「何をする人か」を定義するのに対し、エンパシーマップは「なぜそうするか」を掘り下げる。
              両者を組み合わせることで、表面的な行動の裏にある動機を設計に反映できる。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="ジャーニーマップで改善の優先度を判断する際、最も注目すべき要素は？"
              options={[
                { label: "タッチポイントの数" },
                { label: "各フェーズの行動回数" },
                {
                  label: "感情が大きく下がっている箇所（ペインポイント）",
                  correct: true,
                },
                { label: "フェーズの名称の一貫性" },
              ]}
              explanation="ジャーニーマップでは感情の落ち込みが大きい箇所がペインポイントとなる。ここがユーザー体験のボトルネックであり、改善のインパクトが最も大きい箇所として優先的に対応する。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Personas - Interaction Design Foundation",
                  url: "https://www.interaction-design.org/literature/topics/personas",
                  description:
                    "ペルソナの定義、作成手順、テンプレートを網羅した解説記事",
                },
                {
                  title: "Customer Journey Maps - Nielsen Norman Group",
                  url: "https://www.nngroup.com/articles/customer-journey-mapping/",
                  description:
                    "ジャーニーマップの設計方法と実例をまとめたガイド",
                },
                {
                  title: "Empathy Mapping - Nielsen Norman Group",
                  url: "https://www.nngroup.com/articles/empathy-mapping/",
                  description:
                    "エンパシーマップの作成方法とワークショップでの活用方法",
                },
                {
                  title: "Lean UX（O'Reilly）",
                  url: "https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/",
                  description:
                    "Jeff Gothelf による Lean UX の実践ガイド",
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
