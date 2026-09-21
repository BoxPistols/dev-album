import { SlidersHorizontal, Workflow, FlaskConical, Ban } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * 応用: 信頼度ゲートとLLMとの組み合わせ
 * STEP 23: Jevセクション
 * - 信頼度ゲート（自動 / 人 / 上位モデル）の3分岐
 * - LLMの前段・後段にJevを置く構成
 * - しきい値の決め方と評価の回し方
 * - Jevでは扱えないこと
 */

export default function JevAdvanced() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 23</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          応用: 信頼度ゲートとLLMとの組み合わせ
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Jev単体で完結する仕事は多くありません。実際のシステムでは、Jev
          の確率で分岐を作り、確信が持てない入力だけをLLM
          や人に回す構成になります。 このページでは、その分岐の設計、LLM
          との役割分担、しきい値を実データで決める手順、そしてJev
          の守備範囲外を扱います。
        </p>

        <WhyNowBox
          tags={["信頼度ゲート", "LLMジャッジ", "評価", "しきい値", "制約"]}
        >
          <p>
            LMOpsの講座では「LLM
            の出力を評価する」課題を扱いました。評価そのものも「この回答は根拠と矛盾しないか」という型付きの判断です。
            Jevをそこに置くと、LLMの出力を別のLLM
            に読ませる構成より、判断が数値で返り、しきい値で扱えます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 信頼度ゲート */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <SlidersHorizontal className="text-primary" size={28} />
              信頼度ゲート — 3つの出口
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP 18では「自動 / 本人に確認」の2
              分岐でした。公式ドキュメントのConfidenceのページは、confidence
              を高・中・低の3つの帯に分ける形を出発点として示しています。高は自動で進め、中は確認やレビューを挟み、低は人に回すか別のシステムに任せます。ここでは、中間の帯をLLM
              に回す例を作ります。
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    label: "確信が高い（confidence ≥ 上のしきい値）",
                    desc: "Jevの答えで自動処理。ここを通る割合はデータとしきい値で決まるので、後述の手順で測る",
                  },
                  {
                    step: "2",
                    label: "中間の帯",
                    desc: "LLMにstateとJevの答えを渡し、根拠付きで再判定させる。文章での説明が要る場面もここ",
                  },
                  {
                    step: "3",
                    label: "確信が低い（confidence < 下のしきい値）",
                    desc: "人のレビュー待ちに積む。Jevのprobabilitiesを並べて表示すると判断が速い",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs font-bold">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <CodeBlock
              language="ts"
              title="3分岐のゲート"
              code={`type Route = "auto" | "escalate" | "review";

export function gate(confidence: number, upper = 0.85, lower = 0.5): Route {
  if (confidence >= upper) return "auto";
  if (confidence >= lower) return "escalate";
  return "review";
}`}
            />
          </section>

          {/* LLMとの組み合わせ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Workflow className="text-primary" size={28} />
              LLMとの組み合わせ方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              JevをLLM
              の前に置くか後ろに置くかで、役割が変わります。両方使う構成もあります。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-bold text-primary mb-2">
                  前段: 振り分け
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  入力をJevで分類し、LLMを呼ぶ必要があるものだけ呼ぶ。FAQ
                  で済む問い合わせは定型応答、複雑なものだけLLMに回す。
                </p>
                <CodeBlock
                  language="ts"
                  code={`const { answers } = await jev.systemOne({
  state: { message },
  questions: {
    kind: choice("What does the user need?", {
      faq: "Answered by an existing help article",
      account: "Requires looking up their account",
      complex: "Needs a written explanation",
    }),
  },
});
if (answers.kind.choice === "complex") {
  // ここで初めてLLMを呼ぶ
}`}
                />
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-bold text-primary mb-2">
                  後段: 検査（LLMジャッジの置き換え）
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  LLMが書いた回答を公開前にJev
                  で採点する。根拠との矛盾、禁止事項、トーンをnoul / score
                  で聞く。
                </p>
                <CodeBlock
                  language="ts"
                  code={`const { answers } = await jev.systemOne({
  state: { question, sources, draft },
  questions: {
    grounded: noul(
      "Is every claim in draft supported by sources?"
    ),
    refusal_needed: noul(
      "Should this question be declined per policy?"
    ),
    quality: score("Rate the draft", [
      "Unusable", "Needs edits", "Ready to send",
    ]),
  },
});`}
                />
              </div>
            </div>
            <InfoBox type="info" title="LLMジャッジとの違い">
              LLMに「この回答を1〜5
              で採点して」と頼む方法（LLM-as-a-judge）でも、JSON
              の形で点数を受け取れます。TypeSafe AIのFAQ
              は違いを「returning typed answers with calibrated
              probabilities」と説明しています。Jevのscoreには段階ごとの
              probabilitiesとconfidence
              が付くので、迷いの大きい採点だけを人に回す分岐が書けます。一方で「なぜその点数か」の説明は返らないので、
              説明が要るレビュー画面では、Jevの数値とLLMの説明を併用します。
            </InfoBox>
          </section>

          {/* しきい値の決め方 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <FlaskConical className="text-primary" size={28} />
              しきい値を実データで決める
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              しきい値は勘で決めず、正解ラベル付きのデータで決めます。機械学習の基礎（STEP
              8）で扱った評価と同じ手順です。
            </p>
            <div className="rounded-xl border border-border bg-card p-6 mb-4">
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    label: "ラベル付きデータを用意する",
                    desc: "過去のチケット数百件に、人が付けた正解（担当チーム等）を添える",
                  },
                  {
                    step: "2",
                    label: "全件をJevに通し、答えとconfidenceを保存する",
                    desc: "モデル名も一緒に保存する（jev-latestの指す先が変わるため）",
                  },
                  {
                    step: "3",
                    label:
                      "しきい値を動かして、自動処理の割合と誤りの割合を表にする",
                    desc: "しきい値を上げると自動処理が減り、誤りも減る。業務が許容できる誤り率で線を引く",
                  },
                  {
                    step: "4",
                    label: "ぎりぎりの帯に何件入るかを見る",
                    desc: "ここが人の負担になる。多すぎるなら質問のinstructionsとcriteriaを見直す",
                  },
                  {
                    step: "5",
                    label: "モデルの版を固定し、版を上げる前に2〜4を回す",
                    desc: "公式はjev-latestのような別名が新しい版へ移ると書き、しきい値を調整した版のIDを指定して固定することを勧めている。リクエストのmodelに版のID（2026-09-20時点ではjev-1.13.0）を渡すと固定できる。新しい版でも同じデータで表を作り直してから切り替える",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs font-bold">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <CodeBlock
              language="ts"
              title="しきい値ごとの自動処理率と正解率を出す"
              code={`interface Row { predicted: string; expected: string; confidence: number }

export function sweep(rows: Row[], thresholds: number[]) {
  return thresholds.map((t) => {
    const auto = rows.filter((r) => r.confidence >= t);
    const correct = auto.filter((r) => r.predicted === r.expected);
    return {
      threshold: t,
      autoRate: auto.length / rows.length,               // 自動処理の割合
      accuracy: auto.length ? correct.length / auto.length : 1, // 自動処理した中の正解率
    };
  });
}`}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              この表から、たとえば「正解率99%
              以上を保てる最も低いしきい値」のように線を引きます（99%
              は説明用の例）。公式ドキュメントは「Thresholds scale with
              risk」として、同じシステムの中でも、誤ったときの影響が大きい行動ほど高いしきい値を置くとしています。
              数値は業務ごとに違うので、この教材では固定しません。
            </p>
          </section>

          {/* Challenge */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              コーディングチャレンジ
            </h2>
            <CodingChallenge
              title="しきい値を動かして表を作る"
              description="___ を埋めて、confidenceがしきい値以上の行だけを自動処理とみなし、その中の正解率を計算してください。プレビューに表が出ます。"
              preview={true}
              initialCode={`const rows = [
  { predicted: "billing", expected: "billing", confidence: 0.95 },
  { predicted: "sales", expected: "sales", confidence: 0.88 },
  { predicted: "technical", expected: "billing", confidence: 0.71 },
  { predicted: "billing", expected: "billing", confidence: 0.64 },
  { predicted: "sales", expected: "technical", confidence: 0.41 },
];

function sweep(rows, thresholds) {
  return thresholds.map((t) => {
    const auto = rows.filter((r) => r.confidence >= ___);
    const correct = auto.filter((r) => r.predicted === r.___);
    return {
      threshold: t,
      autoRate: auto.length / rows.length,
      accuracy: auto.length ? correct.length / auto.length : 1,
    };
  });
}

function App() {
  const table = sweep(rows, [0.5, 0.7, 0.9]);
  return (
    <table style={{ fontFamily: "sans-serif", borderCollapse: "collapse" }}>
      <thead>
        <tr><th>しきい値</th><th>自動処理率</th><th>正解率</th></tr>
      </thead>
      <tbody>
        {table.map((row) => (
          <tr key={row.threshold}>
            <td style={{ padding: 6 }}>{row.threshold}</td>
            <td style={{ padding: 6 }}>{Math.round(row.autoRate * 100)}%</td>
            <td style={{ padding: 6 }}>{Math.round(row.accuracy * 100)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`}
              answer={`const rows = [
  { predicted: "billing", expected: "billing", confidence: 0.95 },
  { predicted: "sales", expected: "sales", confidence: 0.88 },
  { predicted: "technical", expected: "billing", confidence: 0.71 },
  { predicted: "billing", expected: "billing", confidence: 0.64 },
  { predicted: "sales", expected: "technical", confidence: 0.41 },
];

function sweep(rows, thresholds) {
  return thresholds.map((t) => {
    const auto = rows.filter((r) => r.confidence >= t);
    const correct = auto.filter((r) => r.predicted === r.expected);
    return {
      threshold: t,
      autoRate: auto.length / rows.length,
      accuracy: auto.length ? correct.length / auto.length : 1,
    };
  });
}

function App() {
  const table = sweep(rows, [0.5, 0.7, 0.9]);
  return (
    <table style={{ fontFamily: "sans-serif", borderCollapse: "collapse" }}>
      <thead>
        <tr><th>しきい値</th><th>自動処理率</th><th>正解率</th></tr>
      </thead>
      <tbody>
        {table.map((row) => (
          <tr key={row.threshold}>
            <td style={{ padding: 6 }}>{row.threshold}</td>
            <td style={{ padding: 6 }}>{Math.round(row.autoRate * 100)}%</td>
            <td style={{ padding: 6 }}>{Math.round(row.accuracy * 100)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`}
              hints={[
                "しきい値はmapのコールバック引数tです。confidenceがt以上なら自動処理です",
                "正解かどうかはpredictedとexpectedの一致で決めます",
              ]}
              keywords={["confidence >= t", "r.expected"]}
            />
          </section>

          {/* 扱えないこと */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Ban className="text-primary" size={28} />
              Jevに任せる範囲と、コードやLLMに任せる範囲
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              守備範囲を先に知っておくと、設計で迷いません。まずAPI
              の入出力の形から言えることを挙げ、そのあとに公式が挙げている得意・不得意を挙げます。
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "文章の生成・要約・翻訳",
                  body: "応答にテキストの枠が無い。これらはLLMの仕事。",
                },
                {
                  title: "候補を自分で発明する",
                  body: "choiceは渡したラベルからしか選ばない。「他に何がある？」は聞けない。新しい候補は人かLLMが出し、Jevは選ぶ。",
                },
                {
                  title: "自由な数値の出力",
                  body: "scoreは渡した段階の期待値。「金額を見積もって」のような連続値は、段階に切るか別の手段を使う。",
                },
                {
                  title: "判断理由の説明",
                  body: "probabilitiesは「どれくらい迷ったか」は示すが「なぜか」は示さない。説明が要る画面ではLLMを併用する。",
                },
                {
                  title: "ストリーミング",
                  body: "答えは1回でまとまって返る。SDKにもストリーミングの口は無い。",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <p className="text-sm font-bold text-foreground mb-1">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              公式が挙げている得意・不得意
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeSafe AIのFAQは、Jevを分類・振り分け・採点・評価のような
              「common-sense
              judgments」向けとし、複雑な数学やチェスのような計画など長い推論が要る仕事は大規模な推論モデルのほうが向く場合があるとしています。Jev
              1.13のjaggedness
              のページは、次の仕事をコード側に置くよう勧めています（2026-09-20時点）。
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "数え上げ",
                  body: "単語の文字数、文中の出現回数、長いリストの件数。コードで数える。条件に合う件数が欲しいときは、候補ごとにnoulで聞き、合計はコードで出す。",
                },
                {
                  title: "日付と時刻の比較",
                  body: "どちらが先か、何日離れているか、期間に入るか。日付の読み取りはchoiceで行い、並べ替えや差の計算はコードで行う。",
                },
                {
                  title: "数値表現の近さの判断",
                  body: "16進の色コードやRGBの値どうしが近いか。コードで変換し、計算済みの数値か名前の付いた区分を渡す。",
                },
                {
                  title: "計算",
                  body: "公式は「Jev is not a calculator.」と書き、計算のロジックはコードで実装するよう勧めている。",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <p className="text-sm font-bold text-foreground mb-1">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              日本語で使うとき
            </h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              公式ドキュメントのModelsのページは、言語について次のように書いています。
            </p>
            <blockquote className="border-l-4 border-primary/40 pl-4 text-sm text-muted-foreground mb-4 leading-relaxed">
              English is the primary training language and where accuracy is
              currently best. Other languages, including CJK scripts, are
              handled but not equally well; test on your own content before
              relying on Jev for a non-English workload
              <span className="block mt-1 text-xs">
                — TypeSafe AI Docs「Models」Language support（2026-09-20時点）
              </span>
            </blockquote>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              日本語のstate
              で使うときは、「しきい値を実データで決める」の手順をそのまま当てます。自分の日本語データに正解ラベルを付けてJev
              に通し、confidence
              ごとの正解率を表にして、人の確認に回す範囲を決めます。
            </p>
            <InfoBox type="warning" title="確率は「正しさの保証」ではない">
              公式ドキュメントのScoreのページは、confidence 1.0
              の例について「This describes the model's answer, not a guarantee
              that the answer is correct.」と注記しています。confidence
              はprobabilitiesの分布がどれだけ1
              点に集まっているかを表す値で、正解率ではありません。confidence
              が高い判断にどの程度の誤りが含まれるかは、自分のデータでconfidence
              と正解率を並べて測ります。しきい値の上に乗った判断も、抜き取りで人が検査し続けます。
              また、学習データに由来する偏りはJevにも起こり得ます。LMOps
              の講座で扱ったバイアスの点検を、Jev
              の判断にも同じように回してください。
            </InfoBox>
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              セクションのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    Jevはstateに対するnoul / choice / score
                    の質問に、確率で答えるモデル。テキストは返さない
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    APIキーはサーバー側に置く。SDK
                    はブラウザ実行を既定で拒否する
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    confidenceはprobabilitiesの分布の集中度から計算される値で、noul
                    には付かない。scoreは期待値で、整数の間に落ちる
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    1質問1判断に分け、1
                    リクエストにまとめる。失敗は「いいえ」と区別する
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    しきい値はラベル付きデータで決める。モデルは版のID
                    で固定し、版を上げる前に測り直す
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="LLMが書いた回答を公開前に検査する役としてJevを使う利点は？"
              options={[
                { label: "検査結果が文章で返るので読みやすい" },
                {
                  label:
                    "判断が数値（確率・スコア）で返り、しきい値で機械的に扱える",
                  correct: true,
                },
                { label: "回答の修正案まで生成してくれる" },
                { label: "検査の理由を説明してくれる" },
              ]}
              explanation="Jevの答えは数値なので、パースや形式崩れの処理なしにしきい値で分岐できます。理由の説明や修正案は返らないので、必要ならLLMを併用します。"
            />
            <Quiz
              question="しきい値の決め方として適切なのは？"
              options={[
                { label: "0.5に固定する（確率なので中央が妥当）" },
                {
                  label:
                    "正解ラベル付きデータで自動処理率と正解率を表にし、業務が許容する誤り率で決める",
                  correct: true,
                },
                { label: "モデルの公式ドキュメントに書いてある推奨値を使う" },
                { label: "最初の10件を見て決める" },
              ]}
              explanation="しきい値は誤検知と見逃しのコストで決まり、業務ごとに違います。ラベル付きデータでしきい値を動かし、許容できる誤り率で線を引きます。モデルの版を上げる前に測り直します。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs",
                  url: "https://docs.typesafe.ai/",
                  description: "公式ドキュメント。ガイドと事例。",
                },
                {
                  title: "TypeSafe AI Docs — Confidence",
                  url: "https://docs.typesafe.ai/confidence",
                  description:
                    "confidenceの定義、3つの帯、行動ごとにしきい値を変える考え方。",
                },
                {
                  title: "TypeSafe AI Docs — Jev 1.13 jaggedness",
                  url: "https://docs.typesafe.ai/model-jaggedness/jev-1.13",
                  description:
                    "数え上げ、日付の比較、数値表現など、コード側に置くよう勧めている仕事の一覧。",
                },
                {
                  title: "TypeSafe AI Docs — Models",
                  url: "https://docs.typesafe.ai/models",
                  description: "版のIDと別名、対応言語の記述。",
                },
                {
                  title: "TypeSafe AI Blog",
                  url: "https://typesafe.ai/blog/introducing-system-one-models-and-jev",
                  description:
                    "System OneモデルとJevの発表記事（TypeSafe AI）。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-advanced" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
