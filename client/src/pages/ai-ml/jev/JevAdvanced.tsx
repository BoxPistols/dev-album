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
 * 応用: 信頼度ゲートと LLM との組み合わせ
 * STEP 21: Jev セクション
 * - 信頼度ゲート（自動 / 人 / 上位モデル）の 3 分岐
 * - LLM の前段・後段に Jev を置く構成
 * - しきい値の決め方と評価の回し方
 * - Jev では扱えないこと
 */

export default function JevAdvanced() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 21</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          応用: 信頼度ゲートと LLM との組み合わせ
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Jev 単体で完結する仕事は多くありません。実際のシステムでは、Jev
          の確率で分岐を作り、確信が持てない入力だけを LLM
          や人に回す構成になります。 このページでは、その分岐の設計、LLM
          との役割分担、しきい値を実データで決める手順、そして Jev
          の守備範囲外を扱います。
        </p>

        <WhyNowBox
          tags={["信頼度ゲート", "LLM ジャッジ", "評価", "しきい値", "制約"]}
        >
          <p>
            LMOps の講座では「LLM
            の出力を評価する」課題を扱いました。評価そのものも「この回答は根拠と矛盾しないか」という型付きの判断です。
            Jev をそこに置くと、LLM の出力を別の LLM
            に読ませる構成より、判断が数値で返り、しきい値で扱えます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 信頼度ゲート */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <SlidersHorizontal className="text-primary" size={28} />
              信頼度ゲート — 3 つの出口
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP 18 では「自動 / 本人に確認」の 2
              分岐でした。実運用では、間に「上位のモデルに聞き直す」を挟む 3
              分岐が使われます。
              速くて安い判断で大半を処理し、残りだけに時間とコストをかける形です。
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    label: "確信が高い（confidence ≥ 上のしきい値）",
                    desc: "Jev の答えで自動処理。大半の入力がここを通る",
                  },
                  {
                    step: "2",
                    label: "中間の帯",
                    desc: "LLM に state と Jev の答えを渡し、根拠付きで再判定させる。文章での説明が要る場面もここ",
                  },
                  {
                    step: "3",
                    label: "確信が低い（confidence < 下のしきい値）",
                    desc: "人のレビュー待ちに積む。Jev の probabilities を並べて表示すると判断が速い",
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
              title="3 分岐のゲート"
              code={`type Route = "auto" | "escalate" | "review";

export function gate(confidence: number, upper = 0.85, lower = 0.5): Route {
  if (confidence >= upper) return "auto";
  if (confidence >= lower) return "escalate";
  return "review";
}`}
            />
          </section>

          {/* LLM との組み合わせ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Workflow className="text-primary" size={28} />
              LLM との組み合わせ方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Jev を LLM
              の前に置くか後ろに置くかで、役割が変わります。両方使う構成もあります。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-bold text-primary mb-2">
                  前段: 振り分け
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  入力を Jev で分類し、LLM を呼ぶ必要があるものだけ呼ぶ。FAQ
                  で済む問い合わせは定型応答、複雑なものだけ LLM に回す。
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
  // ここで初めて LLM を呼ぶ
}`}
                />
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-bold text-primary mb-2">
                  後段: 検査（LLM ジャッジの置き換え）
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  LLM が書いた回答を公開前に Jev
                  で採点する。根拠との矛盾、禁止事項、トーンを noul / score
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
            <InfoBox type="info" title="LLM ジャッジとの違い">
              LLM に「この回答を 1〜5
              で採点して」と頼む方法（LLM-as-a-judge）は、採点がテキストで返るため、数値の取り出しと形式崩れの処理が要ります。
              Jev の score は最初から数値で、probabilities
              も付きます。一方で「なぜその点数か」の説明は返らないので、
              説明が要るレビュー画面では、Jev の数値と LLM の説明を併用します。
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
                    label: "全件を Jev に通し、答えと confidence を保存する",
                    desc: "モデル名も一緒に保存する（jev-latest の指す先が変わるため）",
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
                    desc: "ここが人の負担になる。多すぎるなら質問の instructions と criteria を見直す",
                  },
                  {
                    step: "5",
                    label: "モデル更新のたびに 2〜4 を回す",
                    desc: "同じデータで比較すると、更新で何が変わったかが数値で分かる",
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
              この表を見て「正解率 99%
              以上を保てる最も低いしきい値」を選ぶ、というのが典型的な決め方です。
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
              description="___ を埋めて、confidence がしきい値以上の行だけを自動処理とみなし、その中の正解率を計算してください。プレビューに表が出ます。"
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
                "しきい値は map のコールバック引数 t です。confidence が t 以上なら自動処理です",
                "正解かどうかは predicted と expected の一致で決めます",
              ]}
              keywords={["confidence >= t", "r.expected"]}
            />
          </section>

          {/* 扱えないこと */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Ban className="text-primary" size={28} />
              Jev では扱えないこと
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              守備範囲を先に知っておくと、設計で迷いません。以下は API
              の入出力の形から言えることです。
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "文章の生成・要約・翻訳",
                  body: "応答にテキストの枠が無い。これらは LLM の仕事。",
                },
                {
                  title: "候補を自分で発明する",
                  body: "choice は渡したラベルからしか選ばない。「他に何がある？」は聞けない。新しい候補は人か LLM が出し、Jev は選ぶ。",
                },
                {
                  title: "自由な数値の出力",
                  body: "score は渡した段階の期待値。「金額を見積もって」のような連続値は、段階に切るか別の手段を使う。",
                },
                {
                  title: "判断理由の説明",
                  body: "probabilities は「どれくらい迷ったか」は示すが「なぜか」は示さない。説明が要る画面では LLM を併用する。",
                },
                {
                  title: "ストリーミング",
                  body: "答えは 1 回でまとまって返る。SDK にもストリーミングの口は無い。",
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
            <InfoBox type="warning" title="確率は「正しさの保証」ではない">
              confidence が 0.95 でも、それは 5%
              は違うと言っているのと同じです。しきい値の上に乗った判断も、抜き取りで人が検査し続けます。
              また、学習データに由来する偏りは Jev にも起こり得ます。LMOps
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
                    Jev は state に対する noul / choice / score
                    の質問に、確率で答えるモデル。テキストは返さない
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    API キーはサーバー側に置く。SDK
                    はブラウザ実行を既定で拒否する
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    confidence と probabilities は別物。score
                    は期待値で、整数の間に落ちる
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    1 質問 1 判断に分け、1
                    リクエストにまとめる。失敗は「いいえ」と区別する
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    しきい値はラベル付きデータで決め、モデル更新のたびに測り直す
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
              question="LLM が書いた回答を公開前に検査する役として Jev を使う利点は？"
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
              explanation="Jev の答えは数値なので、パースや形式崩れの処理なしにしきい値で分岐できます。理由の説明や修正案は返らないので、必要なら LLM を併用します。"
            />
            <Quiz
              question="しきい値の決め方として適切なのは？"
              options={[
                { label: "0.5 に固定する（確率なので中央が妥当）" },
                {
                  label:
                    "正解ラベル付きデータで自動処理率と正解率を表にし、業務が許容する誤り率で決める",
                  correct: true,
                },
                { label: "モデルの公式ドキュメントに書いてある推奨値を使う" },
                { label: "最初の 10 件を見て決める" },
              ]}
              explanation="しきい値は誤検知と見逃しのコストで決まり、業務ごとに違います。ラベル付きデータでしきい値を動かし、許容できる誤り率で線を引きます。モデル更新のたびに測り直します。"
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
                  title: "TypeSafe AI Blog",
                  url: "https://typesafe.ai/blog/introducing-system-one-models-and-jev",
                  description:
                    "System One モデルと Jev の発表記事（TypeSafe AI）。",
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
