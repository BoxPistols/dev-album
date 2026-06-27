import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodingChallenge from "@/components/CodingChallenge";

const flowSteps = [
  {
    number: 1,
    title: "検知",
    description:
      "監視・アラート・ユーザー報告などで異常に気づく。早く気づけるほど影響を抑えられる。",
  },
  {
    number: 2,
    title: "トリアージ",
    description:
      "影響範囲と深刻さを見積もり、重大度（Sev）を判定する。優先順位を決める最初の関門。",
  },
  {
    number: 3,
    title: "指揮官",
    description:
      "インシデント指揮官を立て、判断と進行の責任を一本化する。手を動かす人とは役割を分ける。",
  },
  {
    number: 4,
    title: "コミュニケーション",
    description:
      "関係者・利用者へ状況を定期的に共有する。沈黙は不安を生むため、進捗が無くても発信する。",
  },
  {
    number: 5,
    title: "収束",
    description:
      "影響が止まり通常運用に戻ったことを確認し、宣言する。ここからポストモーテムへ移る。",
  },
];

const sevLevels = [
  {
    level: "Sev1",
    label: "重大",
    description:
      "主要機能が全面停止、または広範囲の利用者に深刻な影響。全力で即対応する。",
  },
  {
    level: "Sev2",
    label: "高",
    description:
      "重要機能の一部が利用できない。回避策はあるが利用者への影響が大きい。",
  },
  {
    level: "Sev3",
    label: "中",
    description:
      "限定的な機能の不具合。影響は一部にとどまり、通常の対応時間で扱える。",
  },
];

export default function Incident() {
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
            インシデント対応とポストモーテム
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            インシデントは、起きてから慌てないために備える対象です。
            検知から収束までの対応フロー、重大度（Sev）の判定、
            そして非難なきポストモーテムと根本原因分析（5 Whys）まで、
            障害に落ち着いて向き合い、再発を防ぐ流れを一通り整理します。
          </p>
        </div>

        <WhyNowBox tags={["インシデント", "ポストモーテム", "Sev", "5 Whys"]}>
          <p>
            障害は、どれだけ準備しても起きるときは起きます。
            問われるのは「起きないこと」ではなく「起きたときにどう動き、次にどう活かすか」です。
            対応の型を決めておけば、緊張する場面でも迷わず動けます。
            そして起きた後を学びに変える仕組みが、チームを少しずつ強くします。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 対応フロー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              インシデント対応フロー
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              インシデント対応は、検知 → トリアージ → 指揮官 →
              コミュニケーション → 収束、 という流れで進みます。
              重要なのは、各段階で「次に何をするか」が決まっていることです。
              型があると、パニックに陥らず手順に沿って動けます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flowSteps.map((s) => (
                <div
                  key={s.number}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-xs">
                        {s.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1 text-sm">
                        {s.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <MermaidDiagram
              title="図: インシデント対応の流れ"
              chart={`flowchart TD
    A["検知"] --> B["トリアージ（Sev 判定）"]
    B --> C["指揮官を任命"]
    C --> D["対応（復旧 + 状況共有）"]
    D --> E{"影響は止まったか"}
    E -->|"いいえ"| D
    E -->|"はい"| F["収束を宣言"]
    F --> G["ポストモーテム"]`}
            />

            <InfoBox type="info" title="指揮官は「手を動かさない」">
              インシデント指揮官の役割は、判断と進行の整理です。
              自分で復旧作業に没頭すると全体が見えなくなります。
              指揮と実作業を分けることで、状況を俯瞰し続けられます。
            </InfoBox>
          </section>

          {/* 重大度 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              重大度（Sev）レベル
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              すべてのインシデントを同じ熱量で扱うと、本当に重大なものへの対応が遅れます。
              そこで<strong>重大度（Severity、Sev）</strong>で段階を分けます。
              Sev
              の判定によって、誰を呼ぶか・どれだけ急ぐか・どう報告するかが変わります。
              基準を事前に言語化しておくと、判定で迷いません。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sevLevels.map((s) => (
                <div
                  key={s.level}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {s.level}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {s.label}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="インシデント指揮官（Incident Commander）の主な役割はどれ？"
              options={[
                { label: "自ら最前線で復旧作業に専念する" },
                {
                  label:
                    "判断と進行を整理し、状況を俯瞰しながら対応全体をまとめる",
                  correct: true,
                },
                { label: "障害の責任者を特定して報告する" },
                { label: "コードの修正だけを担当する" },
              ]}
              explanation="指揮官の役割は判断と進行の一本化です。自分で復旧作業に没頭すると全体が見えなくなるため、指揮と実作業を分けます。責任追及は対応の場ではなく、後の非難なきポストモーテムでも行いません。"
            />
          </section>

          {/* 非難なきポストモーテム */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              非難なきポストモーテム
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ポストモーテム（事後分析）は、収束後にインシデントを振り返る文書と会議です。
              ここで大切なのが<strong>非難なき（blameless）</strong>
              という原則です。
              「誰のせいか」を問うと、人は事実を隠すようになり、本当の原因に辿り着けません。
              個人ではなく、その人がミスをしても事故にならなかったはずの
              <strong>仕組み</strong>を見ます。
            </p>

            <InfoBox type="warning" title="人を責めると真実が隠れる">
              「ボタンを押した人」を責めても再発は防げません。
              「誰でも押し間違えうるボタンに、確認が無かった」という仕組みの問題に目を向けると、
              再発防止の打ち手が見えてきます。
            </InfoBox>
          </section>

          {/* 根本原因分析・タイムライン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              根本原因分析（5 Whys）とタイムライン
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              表面の症状だけ直しても、根本が残っていれば再発します。
              <strong>5 Whys</strong>は「なぜ？」を繰り返して、
              表面の事象から根本原因へ掘り下げる手法です。 「なぜ落ちた？ →
              メモリ不足。なぜ不足？ → 上限設定が低い。 なぜ低い？ →
              初期値のまま見直していなかった」と、原因の層を降りていきます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              掘り下げの前に、まず<strong>タイムライン</strong>
              で事実を時系列に並べます。 何時に何が起き、誰がどう対応したか。
              事実を揃えてから原因を探ると、憶測ではなく証拠に基づいた分析ができます。
              ここでも、5 Whys は「なぜ」を 5
              回と決まっているわけではありません。 仕様（手法名）では 5
              回ですが、実測では 3 回で根本に届くことも、 7
              回必要なこともあります。理由は、問題の深さは事例ごとに違うためです。
              回数ではなく「これ以上は仕組みの話だ」という地点まで掘るのが目的です。
            </p>
          </section>

          {/* ポストモーテムテンプレート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ポストモーテムのテンプレート
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ポストモーテムは形式を揃えると書きやすく、後から検索もしやすくなります。
              下のテンプレートは、概要・影響・タイムライン・根本原因・再発防止アクションを含む基本形です。
              アクションには担当と期限を添え、実際に閉じるまで追跡します。
            </p>

            <CodeBlock
              language="js"
              title="postmortem/2026-06-27-api-outage.md"
              code={`# ポストモーテム: API 障害（2026-06-27）

## サマリ

15:00〜15:42 の間、API がメモリ不足で応答しなかった。
影響: 全ユーザーの約 30% でデータ取得が失敗。重大度 Sev2。

## タイムライン

- 15:00 監視がエラー率の上昇を検知
- 15:08 指揮官を立て、Sev2 と判定
- 15:25 メモリ上限の引き上げを実施
- 15:42 エラー率が平常へ。収束を宣言

## 根本原因（5 Whys）

- なぜ落ちた? メモリ不足でプロセスが再起動を繰り返した
- なぜ不足? 上限設定が初期値のままだった
- なぜ初期値? 負荷増を見越した見直しの工程が無かった

## 再発防止アクション

- [ ] メモリ使用率のアラートを追加（担当: 山田 / 期限: 7/4）
- [ ] 上限値の定期見直しをランブックに追記（担当: 佐藤 / 期限: 7/11）`}
            />

            <InfoBox type="success" title="アクションは「閉じる」まで追う">
              ポストモーテムを書いて満足すると、再発防止アクションが放置されます。
              担当と期限を決め、完了するまでチケットとして追跡することで、学びが次に活きます。
            </InfoBox>

            <CodingChallenge
              preview
              previewType="markdown"
              title="非難なきポストモーテムを埋めよう"
              description="タイムライン・根本原因（5 Whys）・再発防止アクションの見出しを埋めてください。___ を適切な語に置き換えます。アクションには担当と期限を残します。"
              initialCode={`# ポストモーテム: ログイン障害（2026-06-27）

## サマリ

10:00〜10:25 の間、ログインが断続的に失敗した。重大度 Sev2。

## ___1

- 10:00 監視がエラー率の上昇を検知
- 10:06 指揮官を立て、Sev2 と判定
- 10:25 設定を切り戻し、収束を宣言

## ___2（5 Whys）

- なぜ失敗した? 認証サーバーが過負荷になった
- なぜ過負荷? 接続数の上限が低いまま放置されていた
- なぜ放置? 上限を見直す工程が手順に無かった

## ___3

- ___4 接続数のアラートを追加（担当: 山田 / 期限: 7/4）`}
              answer={`# ポストモーテム: ログイン障害（2026-06-27）

## サマリ

10:00〜10:25 の間、ログインが断続的に失敗した。重大度 Sev2。

## タイムライン

- 10:00 監視がエラー率の上昇を検知
- 10:06 指揮官を立て、Sev2 と判定
- 10:25 設定を切り戻し、収束を宣言

## 根本原因（5 Whys）

- なぜ失敗した? 認証サーバーが過負荷になった
- なぜ過負荷? 接続数の上限が低いまま放置されていた
- なぜ放置? 上限を見直す工程が手順に無かった

## 再発防止アクション

- [ ] 接続数のアラートを追加（担当: 山田 / 期限: 7/4）`}
              hints={[
                "事実を時系列に並べる欄は タイムライン",
                "なぜを繰り返して掘り下げる欄は 根本原因",
                "次に同じ事故を防ぐ打ち手を書く欄は 再発防止アクション",
                "未完了チェックボックスは [ ] で表す",
              ]}
              keywords={["タイムライン", "根本原因", "再発防止", "[ ]"]}
            />
          </section>

          {/* ランブック整備 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              再発防止アクションとランブック整備
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ポストモーテムから出た学びは、次に同じ場面が来たときに使える形で残します。
              その置き場が<strong>ランブック</strong>です。
              「この症状が出たらまずここを見る」「復旧はこの手順で」と書いておけば、
              次に対応する人が初動で迷わず、収束までの時間を短くできます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ランブックは一度作って終わりではなく、インシデントのたびに育てます。
              対応中に「あの手順が書いてあれば速かった」と感じた点を、収束後に追記する。
              この積み重ねが、チームの対応力を少しずつ底上げしていきます。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="非難なき（blameless）ポストモーテムを徹底する主な理由はどれ？"
              options={[
                { label: "ミスをした人を素早く特定できるから" },
                {
                  label:
                    "人を責めると事実が隠され、仕組みの根本原因に辿り着けなくなるから",
                  correct: true,
                },
                { label: "ポストモーテムを書く時間を短縮できるから" },
                { label: "アラートの数を減らせるから" },
              ]}
              explanation="人を責める文化では、当事者が事実を隠し、本当の原因に辿り着けません。非難なきポストモーテムは、個人ではなく「ミスがあっても事故にならなかったはずの仕組み」に目を向け、再発防止の打ち手を引き出します。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Google SRE - Postmortem Culture",
                  url: "https://sre.google/sre-book/postmortem-culture/",
                  description:
                    "非難なきポストモーテムの考え方と実践を解説した原典",
                },
                {
                  title: "Google SRE - Managing Incidents",
                  url: "https://sre.google/sre-book/managing-incidents/",
                  description:
                    "指揮官の役割や対応フローなど、インシデント管理の基礎",
                },
                {
                  title: "Atlassian - Incident Postmortem ガイド",
                  url: "https://www.atlassian.com/incident-management/postmortem",
                  description: "ポストモーテムの進め方とテンプレートを紹介",
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
