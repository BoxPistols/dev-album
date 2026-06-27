import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodingChallenge from "@/components/CodingChallenge";

const accountabilities = [
  {
    title: "プロダクトオーナー",
    role: "What を決める",
    description:
      "プロダクトの価値を最大化する責任を持つ。プロダクトバックログを管理し、何を優先して作るかを意思決定する。ステークホルダーとチームの橋渡し役。",
  },
  {
    title: "スクラムマスター",
    role: "How well を支える",
    description:
      "スクラムが正しく機能するよう支援する。チームの障害を取り除き、自己管理と改善を促す。指示役ではなくサーバントリーダー。",
  },
  {
    title: "開発者",
    role: "How を担う",
    description:
      "スプリントで実際にインクリメントを作る人たち。どう作るかを自分たちで計画し、品質に責任を持つ。職能横断で構成される。",
  },
];

const events = [
  {
    title: "スプリント",
    summary: "他の全イベントを内包する固定期間のタイムボックス（1か月以内）。",
  },
  {
    title: "スプリントプランニング",
    summary:
      "このスプリントで何を・どう作るかを計画し、スプリントゴールを定める。",
  },
  {
    title: "デイリースクラム",
    summary: "開発者が毎日 15 分で計画を点検し、必要なら調整する短い同期の場。",
  },
  {
    title: "スプリントレビュー",
    summary:
      "成果物をステークホルダーに見せ、フィードバックを得て次を検討する。",
  },
  {
    title: "スプリントレトロスペクティブ",
    summary: "自分たちの進め方をふりかえり、次に試す改善を決める。",
  },
];

const artifacts = [
  {
    title: "プロダクトバックログ",
    commitment: "コミットメント: プロダクトゴール",
    description:
      "プロダクトに必要なものを順序づけた一覧。常に更新され続ける唯一の作業の源。最上位の項目ほど詳細に磨かれる。",
  },
  {
    title: "スプリントバックログ",
    commitment: "コミットメント: スプリントゴール",
    description:
      "今スプリントで取り組む項目と、それを実現する計画。開発者のもので、スプリント中に随時更新される。",
  },
  {
    title: "インクリメント",
    commitment: "コミットメント: 完成の定義 (DoD)",
    description:
      "スプリントで積み上がった、使える状態の成果物。DoD を満たして初めて「完成」と呼べる。",
  },
];

export default function Scrum() {
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
            スクラムの全体像
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            スクラムは、複雑な問題に対して反復的にプロダクトを届けるための軽量なフレームワークです。
            このページでは、スクラムを構成する <strong>3 つの責任</strong>・
            <strong>5 つのイベント</strong>・<strong>3 つの作成物</strong>と、
            その土台にある経験主義の考え方を一通り整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["スクラム", "役割", "イベント", "作成物", "経験主義"]}
        >
          <p>
            スクラムは世界で最も広く使われているアジャイルのフレームワークですが、
            要素が多く「とりあえずミーティングを並べただけ」になりやすい面があります。
            全体像を一度俯瞰しておくと、それぞれのイベントや作成物が
            <strong>何のために存在するのか</strong>が繋がって見えてきます。
            個々のスプリント運用に入る前に、まず地図を手に入れておきましょう。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 3つの責任 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3 つの責任（スクラムチーム）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              スクラムチームは、プロダクトオーナー・スクラムマスター・開発者の 3
              つの責任で構成されます。上下関係ではなく、それぞれが異なる
              <strong>アカウンタビリティ（説明責任）</strong>
              を担う対等な関係です。 一般的なチーム規模は 10
              人以下が目安とされています。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {accountabilities.map((a) => (
                <div
                  key={a.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {a.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {a.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="スクラムマスターは「管理者」ではない">
              スクラムマスターは進捗を管理して指示を出す立場ではありません。
              チームが自分たちで意思決定し、改善し続けられるよう環境を整える支援役です。
              障害の除去やプロセスの番人として、チームの外側からも内側からも機能します。
            </InfoBox>
          </section>

          {/* 5つのイベント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              5 つのイベント
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              スクラムのイベントは、検査と適応の機会を定期的に作るために設計されています。
              すべてのイベントはスプリントという大きなタイムボックスの中に収まり、
              それぞれに目的があります。詳しい目的と所要時間は次のページで扱います。
            </p>

            <div className="space-y-3">
              {events.map((e, i) => (
                <div
                  key={e.title}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1 text-base">
                      {e.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {e.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <MermaidDiagram
              title="図: スクラムのループ（イベントの連鎖）"
              chart={`flowchart TD
    PB["プロダクトバックログ"] --> SP["スプリントプランニング"]
    SP -->|"スプリントゴール確定"| SG["スプリント開始"]
    SG --> DS["デイリースクラム（毎日 15 分）"]
    DS -->|"作業を進める"| DS
    DS --> SR["スプリントレビュー"]
    SR --> RT["レトロスペクティブ"]
    RT -->|"改善を次へ"| SP
    SR -->|"フィードバックを反映"| PB`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="スクラムにおけるプロダクトオーナーの主な責任はどれ？"
              options={[
                { label: "開発者にタスクを割り振り、進捗を管理する" },
                {
                  label:
                    "プロダクトの価値を最大化し、バックログの優先順位を決める",
                  correct: true,
                },
                { label: "スクラムイベントが正しく行われるよう支援する" },
                { label: "コードを実装し、テストを書く" },
              ]}
              explanation="プロダクトオーナーはプロダクトの価値最大化に責任を持ち、プロダクトバックログの管理と優先順位づけを担います。イベントの支援はスクラムマスター、実装は開発者の責任です。"
            />
          </section>

          {/* 3つの作成物 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3 つの作成物とコミットメント
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              作成物（アーティファクト）は、作業や価値を見える化するためのものです。
              現在のスクラムでは、各作成物に<strong>コミットメント</strong>
              が紐づきます。
              コミットメントは進捗を測る基準になり、透明性を高めます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {artifacts.map((a) => (
                <div
                  key={a.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {a.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {a.commitment}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="完成の定義 (DoD) は品質の共通言語">
              完成の定義は「どの状態になればインクリメントが完成と言えるか」をチームで合意したものです。
              テスト・レビュー・ドキュメントなど、満たすべき条件を明文化しておくと、
              「完成したつもり」のズレを防げます。DoD
              はスプリントとイベントのページで詳しく扱います。
            </InfoBox>
          </section>

          {/* 経験主義 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              土台にある経験主義
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              スクラムは<strong>経験主義（empiricism）</strong>
              に基づいています。
              これは「知識は経験から得られ、意思決定は観察された事実に基づく」という考え方です。
              先のことが読みきれない複雑な状況では、計画通りに進めることより、
              小さく試して結果を見て調整するほうが現実的だという立場です。
              この経験主義を支える 3 本柱が、透明性・検査・適応です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  透明性 (Transparency)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  作業やその基準が関係者に見える状態になっていること。隠れた状態では正しく検査できない。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  検査 (Inspection)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  作成物や進捗を頻繁に点検し、望ましくない差異を早く見つける。イベントが検査の機会になる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  適応 (Adaptation)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  検査でズレが見つかったら、できるだけ早くやり方や成果物を調整する。
                </p>
              </div>
            </div>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="スクラムを支える経験主義の「3 本柱」の組み合わせとして正しいのは？"
              options={[
                { label: "計画・実行・評価" },
                { label: "透明性・検査・適応", correct: true },
                { label: "速度・品質・コスト" },
                { label: "役割・イベント・作成物" },
              ]}
              explanation="スクラムの経験主義は透明性 (Transparency)・検査 (Inspection)・適応 (Adaptation) の 3 本柱で成り立ちます。見える状態にして、頻繁に点検し、ズレたら早く調整する、という循環です。"
            />
          </section>

          {/* ハンズオン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ハンズオン: スプリントゴールと完成の定義を書く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              スプリントゴールは「このスプリントで何を実現するか」の単一の目的、
              完成の定義 (DoD) は「どの状態で完成と言えるか」のチェックリストです。
              下のテンプレートの空欄を埋めて、両方を書いてみましょう。
            </p>
            <CodingChallenge
              preview
              previewType="markdown"
              title="スプリントゴールと完成の定義を書こう"
              description="決済機能を扱うスプリントを想定し、スプリントゴールの一文を『カート内の商品をクレジットカードで購入できる』に、DoD の 1 項目を『コードレビューが完了している』に書き換えてください（___ を埋める）。"
              initialCode={`# スプリントゴール
- ___

# 完成の定義 (Definition of Done)
- 受け入れ基準を満たし、関連テストが通っている
- ___
- ステージング環境で動作確認が済んでいる`}
              answer={`# スプリントゴール
- カート内の商品をクレジットカードで購入できる

# 完成の定義 (Definition of Done)
- 受け入れ基準を満たし、関連テストが通っている
- コードレビューが完了している
- ステージング環境で動作確認が済んでいる`}
              hints={[
                "ゴールは個別タスクの寄せ集めでなく一文の目的にする。カート内の商品をクレジットカードで購入できる、と書く",
                "DoD の品質ゲートとして、コードレビューが完了している、を加える",
              ]}
              keywords={[
                "カート内の商品をクレジットカードで購入できる",
                "コードレビューが完了している",
              ]}
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "スクラムガイド（公式・日本語）",
                  url: "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Japanese.pdf",
                  description:
                    "スクラムの定義を記した一次資料。役割・イベント・作成物・経験主義の原典",
                },
                {
                  title: "Scrum Guides 公式サイト",
                  url: "https://scrumguides.org/",
                  description:
                    "各言語版のスクラムガイドと改訂履歴を確認できる公式サイト",
                },
                {
                  title: "Atlassian - スクラム入門",
                  url: "https://www.atlassian.com/ja/agile/scrum",
                  description:
                    "スクラムの全体像を実務目線で解説したガイド。図解が豊富",
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
