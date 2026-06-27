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

const perspectives = [
  {
    title: "正確性",
    description:
      "仕様どおりに動くか。エッジケース・境界値・エラー時の挙動を満たしているか。テストが意図を表現できているか。",
  },
  {
    title: "設計",
    description:
      "責務の分割は妥当か。既存の構造に馴染んでいるか。過剰に複雑でないか、将来の変更に耐えるか。",
  },
  {
    title: "可読性",
    description:
      "初めて読む人が追えるか。制御フローが素直か。コメントは「なぜ」を説明しているか。",
  },
  {
    title: "テスト",
    description:
      "変更に見合うテストがあるか。失敗時に原因が分かるか。意味のない網羅ではなく要点を突いているか。",
  },
  {
    title: "セキュリティ",
    description:
      "入力検証・認可・機密情報の扱いは適切か。インジェクションや権限漏れの余地はないか。",
  },
  {
    title: "パフォーマンス",
    description:
      "明らかな非効率（N+1・不要な再計算）はないか。ただし計測なき早すぎる最適化は避ける。",
  },
];

export default function Perspectives() {
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
            レビュー観点とチェックリスト
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            「何を見るか」が定まっていないレビューは、見る人によって指摘がばらつきます。
            正確性・設計・可読性・テスト・セキュリティといった観点を整理し、
            ブロッキングと nit を区別し、機械に任せられる部分は人が見ない——
            この線引きがレビューを速く正確にします。
          </p>
        </div>

        <WhyNowBox
          tags={["レビュー観点", "チェックリスト", "nit", "Linter", "PR分割"]}
        >
          <p>
            観点を言語化しておくと、レビュアーごとの当たり外れが減ります。
            <strong>「正確性は見たが設計は見ていなかった」</strong>
            といった抜けを防げますし、新しくチームに入った人もすぐ同じ基準でレビューできます。
            さらに「これはブロッカーか、好みの提案か」を明示すると、
            作者は何を必ず直し何を任意で扱うか判断でき、無用な往復が減ります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 観点別 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              観点別に何を見るか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レビューは漠然と読むより、観点を持って読むほうが漏れません。
              代表的な観点を整理します。すべてを毎回フルで見る必要はなく、
              変更の性質に応じて重みを変えるのが現実的です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {perspectives.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 命名 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              命名は可読性の入口
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              命名は独立した観点として扱う価値があります。
              変数・関数・型の名前が意図を表していれば、コメントが少なくても読めます。
              逆に名前が実態とずれていると、読む人は名前を疑いながらコードを追うことになり、
              レビューも保守も重くなります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レビューでは「この名前から中身が想像できるか」「同じ概念に複数の呼び方が混ざっていないか」を見ます。
              良い命名は、後から読む人——半年後の自分を含む——への最も安いドキュメントです。
            </p>

            <InfoBox type="info" title="観点に優先順位をつける">
              すべての観点が同格ではありません。正確性とセキュリティはブロッカーになりやすく、
              可読性や命名は文脈で軽重が変わります。
              「まず正しく動くか・安全か」を確認し、その上で設計と可読性を見る、と段階を意識すると指摘が整理されます。
            </InfoBox>
          </section>

          {/* ブロッキング vs nit */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ブロッキング指摘と nit（任意）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              すべての指摘が「直さないとマージできない」わけではありません。
              <strong>ブロッキング</strong>は修正が必須の指摘、
              <strong>nit（nitpick の略、任意）</strong>
              は好みや細かい改善提案で、
              対応してもしなくてもよいものです。これを明示すると作者の判断がぶれません。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      種類
                    </th>
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      意味
                    </th>
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      対応
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">
                      ブロッキング
                    </td>
                    <td className="py-2 px-3">
                      バグ・設計上の問題・安全性の懸念など、解決すべき指摘
                    </td>
                    <td className="py-2 px-3">
                      マージ前に対応または合意が必要
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">
                      nit（任意）
                    </td>
                    <td className="py-2 px-3">
                      好み・細かな改善提案。直すと少し良くなる程度
                    </td>
                    <td className="py-2 px-3">
                      対応は作者の裁量。見送ってよい
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              指摘の頭に <code>nit:</code>{" "}
              と付けるだけで、レビュアーの温度感が伝わります。 ブロッカーと nit
              が混ざると、作者は全部を必須と受け取って疲弊しがちです。
            </p>

            <MermaidDiagram
              title="図: 指摘の判断フロー"
              chart={`flowchart TD
    S["気づいた点"] --> Q{"マージを止めるべき?<br/>(バグ・安全性・設計の問題)"}
    Q -->|"はい"| RC["Request changes<br/>(ブロッキング)"]
    Q -->|"いいえ"| N{"好み・細かい改善?"}
    N -->|"はい"| NIT["nit: として伝える<br/>(任意)"]
    N -->|"いいえ"| AP["Approve"]
    RC --> A["作者が対応 or 合意"]
    NIT --> A
    A --> AP`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="指摘に「nit:」を付ける目的として最も適切なのは？"
              options={[
                { label: "その指摘を必ず修正させるため" },
                {
                  label:
                    "好みや細かい提案であり、対応は任意だとレビュアーの温度感を伝えるため",
                  correct: true,
                },
                { label: "CI のチェックを追加するため" },
                { label: "PR をクローズするため" },
              ]}
              explanation="nit（nitpick）は「直すと少し良くなる程度の任意の提案」を示します。ブロッカーと区別して伝えることで、作者は必ず直すべき指摘と見送ってよい指摘を判断でき、無用な往復が減ります。"
            />
          </section>

          {/* Linter に任せる */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Linter・フォーマッタに任せる範囲は人が見ない
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              インデント・クォートの種類・セミコロンの有無といったスタイルは、
              人がレビューで指摘するものではありません。
              <strong>
                Prettier のようなフォーマッタと ESLint のような Linter
                で自動化し、CI で強制します
              </strong>
              。 そうすればレビューで「スペースが」「改行が」という指摘が消え、
              人は設計や正確性に集中できます。
            </p>

            <InfoBox type="success" title="スタイル論争を仕組みで終わらせる">
              スタイルの好みは決着がつきにくく、レビューを消耗させます。
              ツールで一律に整形してしまえば、議論の対象から外れます。
              「機械が直せることは機械に、人にしか判断できないことを人に」が原則です。
            </InfoBox>
          </section>

          {/* 大きすぎる PR */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              大きすぎる PR の扱い
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              差分が大きすぎる PR は、無理に通すと見落としが増えます。
              レビュアーとして受け取ったときは、まず
              <strong>分割を提案する</strong>のが健全です。
              「リファクタリングと機能追加を分けられないか」「先に基盤部分だけ出せないか」と相談すれば、
              各 PR が読み切れるサイズに収まります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              どうしても分割できない場合は、PR の説明で「どこから読むべきか」
              「変更の中心はどのファイルか」を案内すると、レビュアーの負荷が下がります。
              大きい PR
              は時間がかかる前提でレビュー期限を緩めるなど、運用面の配慮も有効です。
            </p>
          </section>

          {/* チェックリスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              レビューチェックリスト
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              観点を実際のレビューで使える形にまとめたものが以下です。
              すべてを毎回満たす必要はなく、変更の性質に応じて該当項目を確認します。
            </p>

            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
                <li>
                  仕様どおりに動くか。エッジケースとエラー時の挙動を確認したか
                </li>
                <li>設計はこのコードベースの既存パターンに馴染んでいるか</li>
                <li>
                  不必要に複雑になっていないか。もっと素直な書き方はないか
                </li>
                <li>変数・関数・型の名前は意図を表しているか</li>
                <li>変更に見合うテストがあり、失敗時に原因が分かるか</li>
                <li>入力検証・認可・機密情報の扱いに穴はないか</li>
                <li>明らかな非効率（N+1・不要な再計算）はないか</li>
                <li>
                  スタイルは Linter /
                  フォーマッタで担保済みで、人が見る必要はないか
                </li>
                <li>指摘はブロッキングと nit を区別して伝えたか</li>
                <li>PR は読み切れるサイズか。大きすぎるなら分割を提案したか</li>
              </ul>
            </div>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="差分が大きすぎる PR を受け取ったレビュアーの対応として最も健全なのは？"
              options={[
                {
                  label: "見落としが増えても、そのまま一気にレビューして通す",
                },
                {
                  label:
                    "リファクタリングと機能追加を分けるなど、読み切れる単位への分割を提案する",
                  correct: true,
                },
                { label: "レビューせずに自動マージを許可する" },
                { label: "スタイルの指摘だけして承認する" },
              ]}
              explanation="大きすぎる PR は無理に通すと見落としが増えます。分割を提案して各 PR を読み切れるサイズにするのが健全です。分割できない場合は説明で読む順を案内するなど、負荷を下げる工夫をします。"
            />
          </section>

          {/* ハンズオン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ハンズオン: 指摘を分類する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              次の指摘は「直さないとマージできない」のか「任意の好み」なのか。
              頭にラベルを付けて温度感を伝えましょう。null 参照は実行時例外を招くブロッキング指摘です。
            </p>
            <CodingChallenge
              preview
              previewType="markdown"
              title="ブロッキング指摘にラベルを付けよう"
              description="null のとき例外になる指摘は対応必須です。頭に付けるラベルを埋めてください（任意の好みは nit、要対応は issue）。"
              initialCode={`___: この入力が null のとき例外になります。検証が必要です。`}
              answer={`issue: この入力が null のとき例外になります。検証が必要です。`}
              hints={["対応が必須な問題の指摘は issue"]}
              keywords={["issue"]}
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Google - What to look for in a code review",
                  url: "https://google.github.io/eng-practices/review/reviewer/looking-for.html",
                  description:
                    "設計・機能・複雑さ・テスト・命名など、レビューで見るべき観点の網羅的なガイド",
                },
                {
                  title: "Google - Navigating a CL in review",
                  url: "https://google.github.io/eng-practices/review/reviewer/navigate.html",
                  description:
                    "大きな変更をどの順で読むか、レビューの進め方の指針",
                },
                {
                  title: "Conventional Comments",
                  url: "https://conventionalcomments.org/",
                  description:
                    "nit や suggestion など、指摘の種類を明示するコメント記法の標準",
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
