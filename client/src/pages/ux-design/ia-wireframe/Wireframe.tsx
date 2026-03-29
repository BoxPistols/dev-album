import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import {
  PenTool,
  Layers,
  Palette,
  Smartphone,
  Monitor,
  LayoutGrid,
  List,
  BarChart3,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

const wireframeLevels = [
  {
    level: "Lo-fi",
    icon: <PenTool className="w-5 h-5" />,
    resolution: "低",
    time: "数分〜1時間",
    tool: "紙とペン、ホワイトボード",
    purpose: "アイデアの素早い検討、チーム内のラフな合意形成",
    description:
      "手書きのスケッチ。要素の配置と優先度だけを確認する。ビジュアルの品質は問わない。",
    color: "border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20",
  },
  {
    level: "Mid-fi",
    icon: <Layers className="w-5 h-5" />,
    resolution: "中",
    time: "数時間〜1日",
    tool: "Figma、Sketch、Adobe XD（グレースケール）",
    purpose: "レイアウトと情報構造の確定、ユーザーテストの素材",
    description:
      "デジタルツールで作成するグレースケールのワイヤーフレーム。テキスト、画像プレースホルダー、ボタンの配置を具体的に定義する。",
    color: "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20",
  },
  {
    level: "Hi-fi",
    icon: <Palette className="w-5 h-5" />,
    resolution: "高",
    time: "数日〜",
    tool: "Figma（カラー、タイポグラフィ、画像込み）",
    purpose: "最終デザインの確認、開発チームへの引き渡し",
    description:
      "カラー、タイポグラフィ、実際の画像やコピーを含んだ完成形に近いデザイン。プロトタイプとして動作確認にも使う。",
    color: "border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-950/20",
  },
];

const includeItems = [
  "ページのレイアウト構造",
  "ナビゲーションの配置",
  "コンテンツの優先順位",
  "CTAボタンの位置",
  "フォーム要素の構成",
  "画像・動画のプレースホルダー",
];

const excludeItems = [
  "最終的なカラーパレット",
  "写真やイラストの選定",
  "アニメーションの詳細",
  "コピーライティングの完成版",
  "ブランドフォントの適用",
  "マイクロインタラクション",
];

const layoutPatterns = [
  {
    name: "F パターン",
    icon: "F",
    description:
      "テキスト中心のページで自然な視線の動き。上部を横に読み、左側を縦にスキャンする。ブログや記事ページに適している。",
    useCase: "ブログ、ニュースサイト、テキスト主体のページ",
  },
  {
    name: "Z パターン",
    icon: "Z",
    description:
      "左上→右上→左下→右下と視線が Z 字に動くパターン。コンテンツが少ないランディングページに適している。",
    useCase: "LP、プロダクトページ、シンプルなトップページ",
  },
  {
    name: "カードレイアウト",
    icon: <LayoutGrid className="w-5 h-5" />,
    description:
      "情報をカード単位で並べるパターン。各カードが独立したコンテンツを持ち、スキャンしやすい。レスポンシブにも対応しやすい。",
    useCase: "EC 商品一覧、ポートフォリオ、ダッシュボード",
  },
  {
    name: "リストレイアウト",
    icon: <List className="w-5 h-5" />,
    description:
      "情報を縦に並べるパターン。検索結果やフィードの表示に適している。項目間の比較がしやすい。",
    useCase: "検索結果、メール一覧、タスクリスト",
  },
  {
    name: "ダッシュボード",
    icon: <BarChart3 className="w-5 h-5" />,
    description:
      "複数のウィジェットやグラフを一画面に配置するパターン。概要把握とドリルダウンの起点として機能する。",
    useCase: "管理画面、アナリティクス、モニタリング",
  },
];

const responsiveBreakpoints = [
  { device: "Mobile", width: "〜767px", cols: "1列", icon: <Smartphone className="w-5 h-5" /> },
  { device: "Tablet", width: "768px〜1023px", cols: "2列", icon: <Smartphone className="w-6 h-6" /> },
  { device: "Desktop", width: "1024px〜", cols: "3〜4列", icon: <Monitor className="w-5 h-5" /> },
];

export default function Wireframe() {
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
            ワイヤーフレーム設計
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            ビジュアルデザインに入る前に、ページの構造とレイアウトをワイヤーフレームで検証します。
          </p>
        </div>

        {/* WhyNowBox */}
        <WhyNowBox tags={["ワイヤーフレーム", "Lo-fi", "Mid-fi", "レイアウト", "モバイルファースト"]}>
          <p>
            色やフォントを決める前に、ページの骨格を確認する工程がワイヤーフレームです。
            ビジュアルを作り込んでから「構造が違った」と気づくと手戻りが大きい。
            ワイヤーフレームの段階でレイアウトと情報の優先順位を検証することで、後工程の効率が上がる。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 3段階のワイヤーフレーム */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Layers className="text-primary" />
              ワイヤーフレームの 3 段階
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ワイヤーフレームは解像度に応じて 3 段階に分かれます。
              プロジェクトのフェーズに応じて適切な段階を選択します。
            </p>

            {/* Visual Flow: Lo-fi → Mid-fi → Hi-fi */}
            <div className="flex flex-col md:flex-row items-center gap-3 mb-8">
              {wireframeLevels.map((wf, index) => (
                <div key={wf.level} className="flex items-center gap-3 w-full md:w-auto">
                  <div
                    className={`flex-1 md:flex-initial rounded-xl border-2 p-5 ${wf.color}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-primary">{wf.icon}</span>
                      <span className="font-bold text-foreground text-lg">
                        {wf.level}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {wf.description}
                    </p>
                  </div>
                  {index < wireframeLevels.length - 1 && (
                    <ArrowRight className="hidden md:block text-muted-foreground flex-shrink-0" size={20} />
                  )}
                </div>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-primary/30">
                    <th className="text-left py-3 px-4 font-bold text-foreground bg-muted">
                      項目
                    </th>
                    {wireframeLevels.map((wf) => (
                      <th
                        key={wf.level}
                        className="text-center py-3 px-4 font-bold text-primary bg-primary/5"
                      >
                        {wf.level}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground bg-muted">
                      解像度
                    </td>
                    {wireframeLevels.map((wf) => (
                      <td
                        key={wf.level}
                        className="py-3 px-4 text-muted-foreground text-center"
                      >
                        {wf.resolution}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground bg-muted">
                      所要時間
                    </td>
                    {wireframeLevels.map((wf) => (
                      <td
                        key={wf.level}
                        className="py-3 px-4 text-muted-foreground text-center"
                      >
                        {wf.time}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground bg-muted">
                      ツール
                    </td>
                    {wireframeLevels.map((wf) => (
                      <td
                        key={wf.level}
                        className="py-3 px-4 text-muted-foreground text-center"
                      >
                        {wf.tool}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground bg-muted">
                      用途
                    </td>
                    {wireframeLevels.map((wf) => (
                      <td
                        key={wf.level}
                        className="py-3 px-4 text-muted-foreground text-center"
                      >
                        {wf.purpose}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 含めるもの / 含めないもの */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ワイヤーフレームに含めるもの / 含めないもの
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ワイヤーフレームの役割は構造の検証です。
              含める要素と含めない要素を明確にしておくと、目的がぶれにくくなります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h3 className="font-bold text-foreground text-sm">
                    含めるもの
                  </h3>
                </div>
                <ul className="space-y-2">
                  {includeItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <h3 className="font-bold text-foreground text-sm">
                    含めないもの
                  </h3>
                </div>
                <ul className="space-y-2">
                  {excludeItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <InfoBox type="info" title="ワイヤーフレームをグレースケールにする理由">
              色を入れると「見た目の印象」にフィードバックが偏る。
              グレースケールにすることで、レイアウトと情報構造に対するフィードバックを集中的に得られる。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="ユーザーテストの素材として適切で、Figma でグレースケールで作成するワイヤーフレームの段階は？"
              options={[
                { label: "Lo-fi（紙とペンのスケッチ）" },
                {
                  label: "Mid-fi（デジタルのグレースケールワイヤーフレーム）",
                  correct: true,
                },
                { label: "Hi-fi（カラー・画像込みのデザイン）" },
                { label: "プロトタイプ（インタラクション付き）" },
              ]}
              explanation="Mid-fi ワイヤーフレームはデジタルツールで作成するグレースケールのレイアウトで、ユーザーテストの素材として適しています。Lo-fi は初期検討用、Hi-fi は最終確認用と位置づけられます。"
            />
          </section>

          {/* レイアウトパターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <LayoutGrid className="text-primary" />
              レイアウトパターン
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ワイヤーフレームで使われる代表的なレイアウトパターンを把握しておくと、
              ページの目的に応じた構造を素早く選択できます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {layoutPatterns.map((pattern) => (
                <div
                  key={pattern.name}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    {typeof pattern.icon === "string" ? (
                      <span className="text-primary font-black text-lg">
                        {pattern.icon}
                      </span>
                    ) : (
                      <span className="text-primary">{pattern.icon}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-2">
                    {pattern.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {pattern.description}
                  </p>
                  <div className="text-xs bg-muted rounded-lg px-3 py-1.5 text-muted-foreground">
                    {pattern.useCase}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* レスポンシブ設計 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Smartphone className="text-primary" />
              レスポンシブ設計（モバイルファースト）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ワイヤーフレームの段階からレスポンシブ対応を考慮する。
              モバイルファーストとは、最小画面から設計を始め、画面が広がるにつれて要素を追加するアプローチです。
            </p>

            {/* Device breakpoints visual */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {responsiveBreakpoints.map((bp) => (
                <div
                  key={bp.device}
                  className="flex-1 rounded-xl border border-border bg-card p-4 text-center"
                >
                  <div className="flex justify-center mb-2 text-primary">
                    {bp.icon}
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-1">
                    {bp.device}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {bp.width}
                  </p>
                  <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-bold">
                    {bp.cols}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile first flow */}
            <div className="rounded-xl border border-border bg-muted/30 p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">
                モバイルファーストの設計フロー
              </h3>
              <div className="space-y-2">
                {[
                  {
                    step: 1,
                    text: "モバイル画面（1列）でコンテンツの優先順位を決める",
                  },
                  {
                    step: 2,
                    text: "タブレット画面で 2 列レイアウトを検討する",
                  },
                  {
                    step: 3,
                    text: "デスクトップ画面でサイドバーや追加情報を配置する",
                  },
                  {
                    step: 4,
                    text: "各ブレークポイントでナビゲーションの切り替えを設計する",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-center gap-3"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      {item.step}
                    </span>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <InfoBox type="warning" title="デスクトップファーストの落とし穴">
              デスクトップから設計を始めると、モバイルに縮小する際に要素を「削る」思考になる。
              モバイルファーストで始めると、必要な要素だけを配置し、画面が広がるにつれて補足情報を追加する設計になるため、
              コンテンツの優先順位が明確になる。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="モバイルファースト設計の主な利点は？"
              options={[
                { label: "デスクトップ版のデザインを先に完成させられる" },
                {
                  label: "コンテンツの優先順位が明確になり、必要な要素に絞った設計ができる",
                  correct: true,
                },
                { label: "モバイルユーザーだけをターゲットにできる" },
                { label: "レスポンシブ対応が不要になる" },
              ]}
              explanation="モバイルファーストで設計すると、限られた画面サイズの中でコンテンツの優先順位を決めることが求められる。これにより、本当に必要な要素に絞った設計ができ、画面が大きくなるにつれて補足情報を追加するアプローチになる。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Wireframing - Interaction Design Foundation",
                  url: "https://www.interaction-design.org/literature/topics/wireframing",
                  description:
                    "ワイヤーフレームの定義から実践まで体系的にまとめた解説",
                },
                {
                  title: "Mobile First Design - Luke Wroblewski",
                  url: "https://www.lukew.com/ff/entry.asp?933",
                  description:
                    "モバイルファーストの提唱者による原点記事",
                },
                {
                  title: "web.dev: Learn CSS Layout",
                  url: "https://web.dev/learn/css/layout",
                  description:
                    "CSS レイアウトの基本パターンを学ぶ web.dev のガイド",
                },
                {
                  title: "Figma - Design Tool",
                  url: "https://www.figma.com/",
                  description:
                    "ワイヤーフレームからプロトタイプまで対応するデザインツール",
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
