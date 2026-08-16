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

const ceremonies = [
  {
    title: "スプリントプランニング",
    purpose:
      "このスプリントで何を・なぜ・どう作るかを計画し、スプリントゴールを定める。",
    timebox: "1か月スプリントで最大 8 時間。短いスプリントでは通常それより短くなる。",
  },
  {
    title: "デイリースクラム",
    purpose:
      "開発者がスプリントゴールに対する進捗を点検し、当日の計画を調整する。",
    timebox: "毎日 15 分（タイムボックス）。同じ時間・同じ場所で行う。",
  },
  {
    title: "スプリントレビュー",
    purpose:
      "インクリメントをステークホルダーに見せ、フィードバックを得て今後を検討する。",
    timebox: "1か月スプリントで最大 4 時間。短いスプリントでは通常それより短くなる。",
  },
  {
    title: "スプリントレトロスペクティブ",
    purpose: "チームの進め方をふりかえり、次に試す改善を具体的に決める。",
    timebox: "1か月スプリントで最大 3 時間。短いスプリントでは通常それより短くなる。",
  },
];

export default function Sprint() {
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
            スプリントとイベント
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            スプリントは、スクラムの心臓部にあたる
            <strong>固定の期間（タイムボックス）</strong>です。
            このページでは、スプリントの性質と 4
            つのイベントの目的・所要時間の目安、
            スプリントゴールや進捗を見るための指標、そして完成の定義（DoD）を、
            実務で使えるかたちで一通り整理します。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "スプリント",
            "タイムボックス",
            "DoD",
            "バーンダウン",
            "ベロシティ",
          ]}
        >
          <p>
            スプリントの期間や各イベントの時間配分は、現場では「なんとなくの慣習」で運用されがちです。
            けれど、それぞれが
            <strong>何のためにあり、どれくらいの時間を上限とするか</strong>を
            理解しておくと、会議が長引いて疲弊する事態や、ふりかえりが省略されて改善が止まる事態を避けられます。
            指標の読み方も合わせて押さえると、チームの状態を数字で語れるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* スプリント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              スプリント — 固定タイムボックス
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              スプリントは 1
              か月以内の固定期間で、すべての作業とイベントを内包する器です。
              一般的には 1〜2
              週間で運用するチームが多く、期間は途中で延長しません。
              ゴールが達成できそうになくても期間を伸ばさないことで、リズムが保たれ、
              見積もりや計画の精度を経験的に高めていけます。
            </p>

            <InfoBox type="info" title="期間を固定する理由">
              スプリントの長さを一定に保つと、毎回同じ尺度で計画・検査・適応ができます。
              期間がその都度変わると、ベロシティのような指標が比較できなくなり、学習の蓄積が難しくなります。
              「短いほど早くフィードバックを得られるが、その分オーバーヘッドも増える」というトレードオフで長さを選びます。
            </InfoBox>
          </section>

          {/* 4つのイベント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              スプリント内の 4 つのイベント
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              スプリントの中では 4 つのイベントが順に行われます。
              それぞれにタイムボックス（上限時間）が決められています。
              プランニング・レビュー・レトロスペクティブの 3
              つは、スクラムガイド（2020 年版）が示す
              <strong>1 か月スプリントでの上限</strong>で、
              短いスプリントでは「通常それより短くなる」とされています。
              デイリースクラムだけはスプリントの長さによらず 15
              分のイベントとして定義されています。
            </p>

            <div className="space-y-3">
              {ceremonies.map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {c.purpose}
                  </p>
                  <p
                    className="text-xs text-primary font-medium"
                    style={{ fontSize: 13 }}
                  >
                    所要時間の目安: {c.timebox}
                  </p>
                </div>
              ))}
            </div>

            <MermaidDiagram
              title="図: 1 スプリント内のイベントのタイムライン"
              chart={`flowchart LR
    START["スプリント開始"] --> PLAN["スプリントプランニング"]
    PLAN --> DEV["開発期間（毎日デイリースクラム）"]
    DEV --> REV["スプリントレビュー"]
    REV --> RETRO["レトロスペクティブ"]
    RETRO --> END["スプリント終了 → 次へ"]`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="スプリントの期間について、スクラムの考え方に最も近いのはどれ？"
              options={[
                {
                  label:
                    "ゴールが達成できそうにないときは期間を延長してでも完成させる",
                },
                {
                  label:
                    "期間は固定し、途中で延長しない。達成しきれなければ次に持ち越す",
                  correct: true,
                },
                { label: "毎回スプリントの長さを変えて柔軟に調整する" },
                { label: "スプリントの長さは必ず 1 か月にする" },
              ]}
              explanation="スプリントは固定タイムボックスで、途中で延長しません。一定のリズムを保つことで指標が比較可能になり、見積もりや計画の精度を経験的に高められます。長さ自体は 1〜2 週間など、チームに合わせて選びます。"
            />
          </section>

          {/* スプリントゴール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              スプリントゴール
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              スプリントゴールは、そのスプリントで達成したい
              <strong>単一の目的</strong>
              です。個々のバックログ項目の寄せ集めではなく、
              「このスプリントで何を実現するのか」を一文で語れるものにします。
              ゴールがあると、途中で細かい優先順位の判断に迷ったとき、
              「これはゴールに資するか」という軸で意思決定できます。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              ゴールはスプリントプランニングで定め、スプリントバックログのコミットメントになります。
              実装の細部はスプリント中に調整してよいですが、ゴールそのものは原則として変えません。
            </p>
          </section>

          {/* ベロシティとバーンダウン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ベロシティとバーンダウン
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              進捗を見るための代表的な指標が、ベロシティとバーンダウンチャートです。
              いずれもスクラムガイドが必須としているものではありませんが、多くのチームが補助的に使います。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  ベロシティ
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  1
                  スプリントで完了したストーリーポイントの量。数スプリント分の平均で、次の計画の参考にする。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  バーンダウンチャート
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  残作業量の推移を時系列で描いた図。理想線と実績線のズレから、進み具合の傾向を読む。
                </p>
              </div>
            </div>

            <InfoBox type="warning" title="ベロシティは「評価指標」ではない">
              仕様としてベロシティは「次の計画の見込みを立てる参考値」ですが、
              実測ではチーム間の比較や成果評価に流用されがちです。
              理由は数字が一人歩きしやすいからで、見積もりの基準やメンバー構成が違えば値は単純比較できません。
              ベロシティはあくまで同じチームの予測精度を上げる道具として扱うのが安全です。
            </InfoBox>
          </section>

          {/* 完成の定義 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              完成の定義 (Definition of Done)
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              完成の定義（DoD）は、インクリメントが「完成」と言える状態を満たすための、
              チーム共通のチェックリストです。これが曖昧だと、人によって「完成」の意味がずれ、
              レビュー直前やリリース直前で手戻りが発生します。DoD
              を明文化しておくと、 何をもって作業を終えるかの認識が揃います。
            </p>

            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-foreground mb-3 text-sm">
                DoD に含まれる例
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li>・受け入れ基準を満たし、関連テストが通っている</li>
                <li>・コードレビューが完了している</li>
                <li>・必要なドキュメントが更新されている</li>
                <li>・ステージング環境で動作確認が済んでいる</li>
              </ul>
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              DoD はチームが成熟するにつれて見直して構いません。
              最初は緩めでも、レトロスペクティブを通じて少しずつ基準を引き上げていくと、
              品質の底上げが無理なく進みます。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="完成の定義 (DoD) を明文化しておく主な利点はどれ？"
              options={[
                { label: "ベロシティの数値を大きく見せられる" },
                {
                  label:
                    "「完成」の意味がチームで揃い、レビューやリリース直前の手戻りを減らせる",
                  correct: true,
                },
                { label: "スプリントの期間を自由に延長できる" },
                { label: "デイリースクラムを省略できる" },
              ]}
              explanation="DoD はインクリメントが完成と言える条件をチームで合意したものです。明文化することで「完成したつもり」のズレがなくなり、後工程での手戻りを減らせます。"
            />
          </section>

          {/* ハンズオン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ハンズオン: バーンダウンを読み、ゴールを書く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              バーンダウンチャートは残作業量の推移です。
              下のメモは 10 日スプリントの 5 日目時点。理想線では残り 20pt のはずが
              実績は 30pt 残っています。空欄を埋めて、状態の読み取りとスプリントゴールを完成させましょう。
            </p>
            <CodingChallenge
              preview
              previewType="markdown"
              title="バーンダウンを読み、スプリントゴールを書こう"
              description="残作業が理想線より多い状態は『遅れている』。1 つ目の空欄を『遅れている』に、スプリントゴールを『検索結果ページを表示できる』に書き換えてください（___ を埋める）。"
              initialCode={`# バーンダウン読み取り（10日スプリント / 5日目）
- 理想線の残り: 20pt
- 実績の残り: 30pt
- 判定: 実績が理想より多いので ___

# スプリントゴール
- ___`}
              answer={`# バーンダウン読み取り（10日スプリント / 5日目）
- 理想線の残り: 20pt
- 実績の残り: 30pt
- 判定: 実績が理想より多いので 遅れている

# スプリントゴール
- 検索結果ページを表示できる`}
              hints={[
                "実績の残りが理想線より上にあるとき、進捗は遅れている",
                "ゴールは一文の目的にする。検索結果ページを表示できる、と書く",
              ]}
              keywords={["遅れている", "検索結果ページを表示できる"]}
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
                    "スプリントと各イベント、コミットメントの定義を確認できる一次資料",
                },
                {
                  title: "Atlassian - スプリント計画",
                  url: "https://www.atlassian.com/ja/agile/scrum/sprint-planning",
                  description:
                    "スプリントプランニングの進め方を実務目線でまとめたガイド",
                },
                {
                  title: "Atlassian - スプリントレトロスペクティブ",
                  url: "https://www.atlassian.com/ja/agile/scrum/retrospectives",
                  description:
                    "ふりかえりの目的と進め方、よくあるフォーマットを解説",
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
