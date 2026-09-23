import { BarChart3, Server, Ruler } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodePreview from "@/components/CodePreview";
import CodingChallenge from "@/components/CodingChallenge";
import SliderChallenge from "@/components/SliderChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * サンプルアプリ2: データに合わせて図を選ぶ
 * STEP 19: Jevセクション
 * - 判断の結果で画面の描画が切り替わる題材。分類して終わりにしない
 * - 要約はコードが計算し、Jevは「どの図か」「何を強調するか」だけを決める
 * - 質問を1問1事に分けると何に反応しているかが見える、を実測で示す
 * - 数値は2026-09-20にjev-1.13.0を実際に呼んで得たもの
 */

/**
 * 注意書きの判定（2026-09-20、jev-1.13.0で実測）。
 * combinedは「点が少ない、または偏りが強い」の1問、fewとskewは2問に分けた場合。
 * wantは、ページ本文が「注意書きが要る」と読んだデータかどうか。
 */
const WARNING_MEASURED = [
  { name: "月次の売上12点", combined: 0.72, few: 0.18, skew: 0.55, want: true },
  {
    name: "カテゴリ別の件数6件",
    combined: 0.84,
    few: 0.59,
    skew: 0.81,
    want: true,
  },
  {
    name: "四半期×セグメント",
    combined: 0.65,
    few: 0.18,
    skew: 0.2,
    want: false,
  },
  {
    name: "3点しかないデータ",
    combined: 0.92,
    few: 0.62,
    skew: 0.58,
    want: true,
  },
];

export default function JevChartPickerApp() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 19</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          サンプルアプリ2: データに合わせて図を選ぶ
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          手元のデータを渡すと、折れ線・棒・散布・積み上げ帯のどれで見せるかと、読み手が最初に気づくべき点をJevが決め、画面の図がそれに合わせて切り替わります。判断の結果が、文字ではなく見た目に出るアプリです。
        </p>

        <WhyNowBox
          tags={["可視化", "choice", "noul", "描画の切り替え", "実測値つき"]}
        >
          <p>
            どの図で見せるかは、データの形が決まれば大体決まります。点の数、列の種類、外れ値の有無を数えるところまではコードでできますが、「この形ならこの図」「ここを先に見せるべき」は基準を書き切れません。人が数秒で決められて、コードには書きにくい判断が残ります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">0. 前提</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP
              18で作ったjev-appsプロジェクトに追加します。作るファイルはlib/chart.tsとapp/api/chart/route.tsの2つです。
            </p>
            <InfoBox type="info" title="Jevは図を見ません">
              APIに渡せるのは文字列かJSONで、画像は渡せません。画面を見せて「この図は読みやすいか」を聞くことはできない代わりに、コードが計算した要約を渡して「この形のデータに合う図はどれか」を聞きます。描くのはコードの仕事です。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Ruler className="text-primary" size={28} />
              1. 要約はコードが計算する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              点の数、最小と最大、標準偏差、外れ値の個数は、数えれば分かります。数え上げはコードの仕事で、モデルに任せる部分ではありません。Jevに渡すのは、その要約です。
            </p>
            <CodeBlock
              language="ts"
              title="lib/chart.ts（要約の部分）"
              code={`export type FieldKind = "number" | "time" | "category";
export type Row = Record<string, string | number>;

/** stateに渡せる形。SDKのEntryTypeと同じ範囲に収める */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/** 要約はコードが計算する。数え上げと統計をモデルに任せない */
export function summarize(
  rows: Row[],
  fields: Record<string, FieldKind>,
): { [key: string]: JsonValue } {
  const summary: { [key: string]: JsonValue } = { 行数: rows.length };
  const columns: { [key: string]: JsonValue } = {};
  for (const [key, kind] of Object.entries(fields)) {
    if (kind === "number") {
      const values = rows.map((r) => Number(r[key])).filter(Number.isFinite);
      const sorted = [...values].sort((a, b) => a - b);
      const at = (p: number) =>
        sorted[Math.min(sorted.length - 1, Math.floor(p * (sorted.length - 1)))];
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const iqr = at(0.75) - at(0.25);
      columns[key] = {
        種類: "数値",
        n: values.length,
        min: sorted[0],
        max: sorted[sorted.length - 1],
        mean: Number(mean.toFixed(2)),
        outliers: values.filter(
          (v) => v > at(0.75) + 1.5 * iqr || v < at(0.25) - 1.5 * iqr,
        ).length,
      };
    } else if (kind === "time") {
      columns[key] = {
        種類: "時間の並び",
        最初: String(rows[0]?.[key] ?? ""),
        最後: String(rows[rows.length - 1]?.[key] ?? ""),
        点の数: rows.length,
      };
    } else {
      const uniq = [...new Set(rows.map((r) => String(r[key])))];
      columns[key] = { 種類: "区分", 値の数: uniq.length, 値: uniq.slice(0, 6) };
    }
  }
  summary.列 = columns;
  return summary;
}`}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              月次の売上12件を渡すと、要約はこうなります。この形がstateです。
            </p>
            <CodeBlock
              language="json"
              title="Jevに渡すstate（実際に送ったもの）"
              code={`{"行数":12,"列":{
  "month":{"種類":"時間の並び","最初":"2025-10","最後":"2026-09","点の数":12},
  "sales":{"種類":"数値","n":12,"min":610,"max":980,"mean":892.5,"outliers":1}}}`}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              2. 質問は1問につき1つのことだけ聞く
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最初は注意書きの判定を「点の数が少ない、または偏りが強く、この図から結論を出すのは危うい」という1問で聞いていました。5つのデータで試すと、すべて0.65以上になり、どのデータも危ういという結果になりました。質問を2つに分けると、何に反応していたのかが分かります。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <caption className="text-left text-muted-foreground mb-2">
                  同じデータに、まとめて1問で聞いた場合と、2問に分けた場合（2026-09-20、jev-1.13.0で実測）
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      データ
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      まとめて1問
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      点が少ない
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      偏り
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border">
                      月次の売上12点
                    </td>
                    <td className="p-3 border-b border-border">0.72</td>
                    <td className="p-3 border-b border-border">0.18</td>
                    <td className="p-3 border-b border-border">0.55</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">
                      カテゴリ別の件数6件
                    </td>
                    <td className="p-3 border-b border-border">0.84</td>
                    <td className="p-3 border-b border-border">0.59</td>
                    <td className="p-3 border-b border-border">0.81</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">
                      四半期×セグメント
                    </td>
                    <td className="p-3 border-b border-border">0.65</td>
                    <td className="p-3 border-b border-border">0.18</td>
                    <td className="p-3 border-b border-border">0.20</td>
                  </tr>
                  <tr>
                    <td className="p-3">3点しかないデータ</td>
                    <td className="p-3">0.92</td>
                    <td className="p-3">0.62</td>
                    <td className="p-3">0.58</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              月次の売上は、点の数では0.18、偏りでは0.55でした。まとめて聞いたときの0.72は、点の数ではなく偏りのほうに反応していたと分かります。四半期のデータは、分ければどちらも低く、注意書きは要りません。
            </p>
            <SliderChallenge
              title="しきい値を1本動かして、2つの聞き方を並べる"
              description="注意書きを出す線を動かします。左は「まとめて1問」の値、右は2問に分けたときの高いほうの値で判定します。狙いは、四半期だけ注意書きを出さないことです。"
              layout="stacked"
              sliders={[
                {
                  id: "t",
                  label: "注意書きを出す線",
                  min: 0,
                  max: 1,
                  step: 0.01,
                  defaultValue: 0.5,
                },
              ]}
              render={(v) => {
                const t = v.t;
                const rows = WARNING_MEASURED.map((d) => {
                  const split = Math.max(d.few, d.skew);
                  return {
                    ...d,
                    combinedWarn: d.combined >= t,
                    splitWarn: split >= t,
                    reason: d.skew >= d.few ? "偏り" : "点が少ない",
                  };
                });
                const combinedOk = rows.every((r) => r.combinedWarn === r.want);
                const splitOk = rows.every((r) => r.splitWarn === r.want);
                return (
                  <div className="w-full">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-muted-foreground">
                          <th scope="col" className="pb-2 font-medium">
                            データ
                          </th>
                          <th scope="col" className="pb-2 font-medium">
                            まとめて1問
                          </th>
                          <th scope="col" className="pb-2 font-medium">
                            2問に分けた
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r) => (
                          <tr key={r.name} className="border-t border-border">
                            <th
                              scope="row"
                              className="py-2 pr-3 text-left font-normal text-foreground"
                            >
                              {r.name}
                              <span className="block text-xs text-muted-foreground">
                                {r.want
                                  ? "注意書きが要る"
                                  : "注意書きは要らない"}
                              </span>
                            </th>
                            <td className="py-2 pr-3 font-mono tabular-nums text-muted-foreground">
                              {r.combined.toFixed(2)}
                              <span className="ml-2 font-sans text-foreground">
                                {r.combinedWarn ? "出す" : "出さない"}
                              </span>
                            </td>
                            <td className="py-2 font-mono tabular-nums text-muted-foreground">
                              {Math.max(r.few, r.skew).toFixed(2)}
                              <span className="ml-2 font-sans text-foreground">
                                {r.splitWarn
                                  ? `出す（${r.reason}）`
                                  : "出さない"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      この線での結果: まとめて1問は
                      {combinedOk ? "狙いどおり" : "狙いと違う"}
                      、2問に分けた場合は
                      {splitOk ? "狙いどおり" : "狙いと違う"}。
                    </p>
                  </div>
                );
              }}
              explanation="狙いどおりになる線の幅が違います。まとめて1問では0.65より上、0.72以下の0.07しかありません。2問に分けると0.20より上、0.55以下で0.35あります。幅が狭いほど、データが少し変わっただけで結果がひっくり返ります。さらに、まとめて聞いた値が高いときは、点の数と偏りのどちらに反応したのかが読めません。"
            />
            <CodeBlock
              language="ts"
              title="app/api/chart/route.ts（質問の定義）"
              code={`const QUESTIONS = {
  chart: {
    type: "choice",
    instructions: "この要約のデータを1枚で見せるとき、最も適した図",
    criteria: {
      line: "時間に沿った推移を見せる折れ線",
      bar: "区分ごとの大きさを比べる棒",
      scatter: "2つの数値の関係を見せる散布図",
      stacked: "区分の構成比の移り変わりを見せる積み上げ帯",
      table: "図にせず表のまま出す",
    },
  },
  emphasis: {
    type: "choice",
    instructions: "読み手が最初に気づくべき点",
    criteria: {
      latest: "直近の変化",
      max: "最も大きい値",
      outlier: "外れ値",
      gap: "群どうしの差",
      none: "特に強調すべき点はない",
    },
  },
  // 質問は1つのことだけを聞く。2つの条件を1問にまとめると、
  // どちらで高いのか分からなくなる
  few: { type: "noul", instructions: "点の数が少なすぎて、この図から傾向を読み取れない" },
  skewed: { type: "noul", instructions: "一部の値に偏っていて、図の縮尺が他の値を潰す" },
} as const;`}
            />
            <InfoBox
              type="warning"
              title="質問を動的に組み立てると型が効かなくなる"
            >
              質問をObject.fromEntriesで作ると、キーの型がstringに広がり、答えの型をSDKが推論できなくなります。answers.chart.choiceが型エラーになるので、質問はリテラルで書きます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Server className="text-primary" size={28} />
              3. 判断を「何を描くか」に翻訳する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Jevが返すのは選ばれたラベルと確率です。それを画面の指示に変えるのはコードの仕事で、しきい値も文言もこちら側に置きます。confidenceが低いときは図を決めず、人に選んでもらいます。
            </p>
            <CodeBlock
              language="ts"
              title="lib/chart.ts（判断を描画の計画に変える）"
              code={`/** confidenceが低い判定は、図を決めずに人へ渡す */
export const CHART_CONFIDENCE_MIN = 0.6;
/** 注意書きを出すしきい値。手元の測定で、点が3件のデータが0.62だった */
export const CAUTION_MIN = 0.6;

export function planFrom(decision: Decision): Plan {
  const notes: string[] = [];
  if (decision.few >= CAUTION_MIN) notes.push("点の数が少ないため、傾向としては読まない");
  if (decision.skewed >= CAUTION_MIN) notes.push("一部の値に偏っている。縮尺に注意する");
  return {
    chart: decision.chartConfidence >= CHART_CONFIDENCE_MIN ? decision.chart : "ask",
    emphasis:
      decision.emphasisConfidence >= CHART_CONFIDENCE_MIN ? decision.emphasis : "none",
    notes,
  };
}`}
            />
            <CodeBlock
              language="ts"
              title="app/api/chart/route.ts（呼び出しの部分）"
              code={`export async function POST(request: Request) {
  const { rows, fields } = (await request.json()) as {
    rows: Row[];
    fields: Record<string, FieldKind>;
  };
  if (!Array.isArray(rows) || rows.length === 0) {
    return Response.json({ error: "rowsが空" }, { status: 400 });
  }
  const state = summarize(rows, fields);
  try {
    const client = new TypeSafeClient({ timeout: 5000, retry: { maxRetries: 1 } });
    const { answers } = await client.systemOne({ state, questions: QUESTIONS });
    const decision: Decision = {
      chart: answers.chart.choice,
      chartConfidence: answers.chart.confidence,
      emphasis: answers.emphasis.choice,
      emphasisConfidence: answers.emphasis.confidence,
      few: answers.few.noul,
      skewed: answers.skewed.noul,
    };
    return Response.json({ decision, plan: planFrom(decision), state });
  } catch {
    // 判断が取れなくても表は出せる。図の選択だけを人に渡す
    return Response.json({ plan: { chart: "ask", emphasis: "none", notes: [] } });
  }
}`}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              4. 実行して確認する
            </h2>
            <CodeBlock
              language="bash"
              title="月次の売上を送る"
              code={`curl -sS http://localhost:3000/api/chart \\
  -H "Content-Type: application/json" \\
  -d '{"fields":{"month":"time","sales":"number"},
       "rows":[{"month":"2025-10","sales":820},{"month":"2025-11","sales":860},
               {"month":"2026-08","sales":970},{"month":"2026-09","sales":610}]}'`}
            />
            <CodeBlock
              language="json"
              title="返ってきた応答（2026-09-20の実測。行は読みやすさのため折った）"
              code={`{"decision":{"chart":"line","chartConfidence":0.99,
  "emphasis":"outlier","emphasisConfidence":0.99,"few":0.2,"skewed":0.49},
 "plan":{"chart":"line","emphasis":"outlier","notes":[]}}`}
            />
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm border border-border">
                <caption className="text-left text-muted-foreground mb-2">
                  5つのデータで測った結果（2026-09-20、jev-1.13.0）
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      データ
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      選ばれた図
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      強調
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border">
                      月次の売上（直近に急落）
                    </td>
                    <td className="p-3 border-b border-border">
                      折れ線（1.00）
                    </td>
                    <td className="p-3 border-b border-border">直近の変化</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">
                      カテゴリ別の件数（1つ突出）
                    </td>
                    <td className="p-3 border-b border-border">棒（0.98）</td>
                    <td className="p-3 border-b border-border">外れ値</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">
                      広告費と成約数
                    </td>
                    <td className="p-3 border-b border-border">散布（0.81）</td>
                    <td className="p-3 border-b border-border">外れ値</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">
                      四半期×セグメントの構成比
                    </td>
                    <td className="p-3 border-b border-border">
                      積み上げ帯（0.43）
                    </td>
                    <td className="p-3 border-b border-border">直近の変化</td>
                  </tr>
                  <tr>
                    <td className="p-3">3点しかないデータ</td>
                    <td className="p-3">折れ線（0.98）</td>
                    <td className="p-3">直近の変化</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              積み上げ帯だけconfidenceが0.43で、しきい値の0.6を下回ります。この1件では図が決まらず、人に選んでもらう分岐に入ります。図の選択はデータの形だけで決まるわけではないので、迷う場合があること自体を受け止める設計にします。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <BarChart3 className="text-primary" size={28} />
              5. 判断で図を切り替える
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              判断の結果を受けて描き分けます。強調する点だけ色と太さを変え、色だけに頼らないよう値のラベルも添えます。下のコードは、判断の部分を固定値にしたものです。planのchartを差し替えると、図が入れ替わります。
            </p>
            <CodePreview
              title="判断が変わると図が変わる（Jevは呼ばない。判断は実測値を固定で持つ）"
              previewHeight={300}
              code={`// 3つのデータと、それぞれに対するJevの判断（2026-09-20の実測値）。
// ボタンで切り替えると、判断に応じて図と強調の位置が変わる
const DATASETS = {
  sales: {
    name: "月次の売上",
    values: [820, 860, 910, 880, 900, 940, 930, 960, 980, 950, 970, 610],
    labels: ["10","11","12","1","2","3","4","5","6","7","8","9"],
    plan: { chart: "line", emphasis: "latest", note: "" },
  },
  cats: {
    name: "カテゴリ別の件数",
    values: [412, 97, 88, 61, 55, 34],
    labels: ["問い合わせ","不具合","要望","解約","請求","その他"],
    plan: { chart: "bar", emphasis: "max", note: "一部の値に偏っている。縮尺に注意する" },
  },
  weekly: {
    name: "週次の登録数",
    values: [12, 19, 9],
    labels: ["W1","W2","W3"],
    plan: { chart: "line", emphasis: "latest", note: "点の数が少ないため、傾向としては読まない" },
  },
};

const W = 460, H = 190, PAD = 30;

function Chart({ data }) {
  const { values, labels, plan } = data;
  const max = Math.max(...values);
  const hot = plan.emphasis === "latest" ? values.length - 1 : values.indexOf(max);
  const x = (i) => PAD + (i * (W - PAD * 2)) / Math.max(1, values.length - 1);
  const y = (v) => H - PAD - (v / max) * (H - PAD * 2);
  const bw = (W - PAD * 2) / values.length - 8;
  return (
    <svg viewBox={"0 0 " + W + " " + H} width="100%" role="img" aria-label={data.name + "の" + (plan.chart === "line" ? "折れ線" : "棒")}>
      <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="var(--border)" strokeWidth="1" />
      {plan.chart === "line" ? (
        <g>
          <path d={values.map((v, i) => (i ? "L" : "M") + x(i) + " " + y(v)).join(" ")}
            fill="none" stroke="var(--text-muted)" strokeWidth="2" />
          {values.map((v, i) => (
            <circle key={i} cx={x(i)} cy={y(v)} r={i === hot ? 6 : 4}
              fill={i === hot ? "var(--text-danger)" : "var(--text-muted)"} />
          ))}
        </g>
      ) : (
        <g>
          {values.map((v, i) => (
            <rect key={i} x={PAD + i * (bw + 8)} y={y(v)} width={bw} height={H - PAD - y(v)} rx="4"
              fill={i === hot ? "var(--text-danger)" : "var(--text-muted)"} />
          ))}
        </g>
      )}
      <text
        x={Math.min(W - PAD, Math.max(PAD, plan.chart === "line" ? x(hot) : PAD + hot * (bw + 8) + bw / 2))}
        y={Math.max(14, y(values[hot]) - 16)}
        textAnchor={hot === values.length - 1 ? "end" : hot === 0 ? "start" : "middle"}
        fontSize="13" fill="var(--text)">
        {values[hot]}
      </text>
      {labels.map((l, i) => (
        <text key={i} x={plan.chart === "line" ? x(i) : PAD + i * (bw + 8) + bw / 2} y={H - PAD + 14}
          textAnchor="middle" fontSize="12" fill="var(--text-muted)">{l}</text>
      ))}
    </svg>
  );
}

function App() {
  const [key, setKey] = useState("sales");
  const data = DATASETS[key];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {Object.keys(DATASETS).map((k) => (
          <button key={k} onClick={() => setKey(k)}
            aria-pressed={k === key}
            style={{ fontSize: 13, fontWeight: k === key ? 700 : 400 }}>
            {DATASETS[k].name}
          </button>
        ))}
      </div>
      <h2 style={{ fontSize: 16, marginBottom: 2 }}>{data.name}</h2>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 6 }}>
        Jevの判断: {data.plan.chart === "line" ? "折れ線" : "棒"} ／ 強調は{data.plan.emphasis === "latest" ? "直近の変化" : "最も大きい値"}
      </p>
      <Chart data={data} />
      {data.plan.note ? (
        <p style={{ fontSize: 13, marginTop: 6 }}>注意: {data.plan.note}</p>
      ) : null}
    </div>
  );
}`}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              下の課題では、強調する位置を決める部分を自分で書きます。
            </p>
            <CodingChallenge
              title="シミュレーション: 判断で図を切り替える（Jevは呼ばない）"
              description="CHARTSから図を選ぶ行の ___ を埋めて、planの判断どおりに描き分けてください。埋めるまでは「人が選びます」と出ます。"
              preview={true}
              initialCode={`// /api/chartが返すのと同じ形の固定データ（シミュレーション用。値は実測）
const plan = { chart: "line", emphasis: "max", notes: [] };
const sales = [820, 860, 910, 880, 900, 940, 930, 960, 980, 950, 970, 610];
const cats = [412, 97, 88, 61, 55, 34];

const W = 460, H = 180, PAD = 28;
const x = (i, n) => PAD + (i * (W - PAD * 2)) / (n - 1);
const y = (v, max) => H - PAD - (v / max) * (H - PAD * 2);

function Line({ hot }) {
  const max = Math.max(...sales);
  const d = sales.map((v, i) => (i ? "L" : "M") + x(i, sales.length) + " " + y(v, max)).join(" ");
  return (
    <g>
      <path d={d} fill="none" stroke="var(--text-muted)" strokeWidth="2" />
      {sales.map((v, i) => (
        <circle key={i} cx={x(i, sales.length)} cy={y(v, max)} r={i === hot ? 6 : 4}
          fill={i === hot ? "var(--text-danger)" : "var(--text-muted)"} />
      ))}
      <text x={x(hot, sales.length)} y={y(sales[hot], max) - 12} textAnchor="middle"
        fontSize="13" fill="var(--text)">{sales[hot]}</text>
    </g>
  );
}

function Bar({ hot }) {
  const max = Math.max(...cats), bw = (W - PAD * 2) / cats.length - 8;
  return (
    <g>
      {cats.map((v, i) => (
        <rect key={i} x={PAD + i * (bw + 8)} y={y(v, max)} width={bw} height={H - PAD - y(v, max)}
          rx="4" fill={i === hot ? "var(--text-danger)" : "var(--text-muted)"} />
      ))}
      <text x={PAD + hot * (bw + 8) + bw / 2} y={y(cats[hot], max) - 8} textAnchor="middle"
        fontSize="13" fill="var(--text)">{cats[hot]}</text>
    </g>
  );
}

const CHARTS = { line: Line, bar: Bar };

function App() {
  const Chart = CHARTS[plan.___] ?? null;
  const values = plan.chart === "line" ? sales : cats;
  const hot = plan.emphasis === "latest" ? values.length - 1 : values.indexOf(Math.max(...values));
  return (
    <div>
      <h2 style={{ fontSize: 16, marginBottom: 4 }}>
        {plan.chart === "line" ? "月次の売上" : "カテゴリ別の件数"}
      </h2>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
        強調: {plan.emphasis}
      </p>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" role="img"
        aria-label={plan.chart === "line" ? "月次の売上の折れ線" : "カテゴリ別の件数の棒"}>
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="var(--border)" strokeWidth="1" />
        {Chart ? <Chart hot={hot} /> : null}
      </svg>
      {Chart ? null : <p style={{ fontSize: 13 }}>図が決まらなかったので、人が選びます</p>}
    </div>
  );
}`}
              answer={`// /api/chartが返すのと同じ形の固定データ（シミュレーション用。値は実測）
const plan = { chart: "line", emphasis: "max", notes: [] };
const sales = [820, 860, 910, 880, 900, 940, 930, 960, 980, 950, 970, 610];
const cats = [412, 97, 88, 61, 55, 34];

const W = 460, H = 180, PAD = 28;
const x = (i, n) => PAD + (i * (W - PAD * 2)) / (n - 1);
const y = (v, max) => H - PAD - (v / max) * (H - PAD * 2);

function Line({ hot }) {
  const max = Math.max(...sales);
  const d = sales.map((v, i) => (i ? "L" : "M") + x(i, sales.length) + " " + y(v, max)).join(" ");
  return (
    <g>
      <path d={d} fill="none" stroke="var(--text-muted)" strokeWidth="2" />
      {sales.map((v, i) => (
        <circle key={i} cx={x(i, sales.length)} cy={y(v, max)} r={i === hot ? 6 : 4}
          fill={i === hot ? "var(--text-danger)" : "var(--text-muted)"} />
      ))}
      <text x={x(hot, sales.length)} y={y(sales[hot], max) - 12} textAnchor="middle"
        fontSize="13" fill="var(--text)">{sales[hot]}</text>
    </g>
  );
}

function Bar({ hot }) {
  const max = Math.max(...cats), bw = (W - PAD * 2) / cats.length - 8;
  return (
    <g>
      {cats.map((v, i) => (
        <rect key={i} x={PAD + i * (bw + 8)} y={y(v, max)} width={bw} height={H - PAD - y(v, max)}
          rx="4" fill={i === hot ? "var(--text-danger)" : "var(--text-muted)"} />
      ))}
      <text x={PAD + hot * (bw + 8) + bw / 2} y={y(cats[hot], max) - 8} textAnchor="middle"
        fontSize="13" fill="var(--text)">{cats[hot]}</text>
    </g>
  );
}

const CHARTS = { line: Line, bar: Bar };

function App() {
  const Chart = CHARTS[plan.chart] ?? null;
  const values = plan.chart === "line" ? sales : cats;
  const hot = plan.emphasis === "latest" ? values.length - 1 : values.indexOf(Math.max(...values));
  return (
    <div>
      <h2 style={{ fontSize: 16, marginBottom: 4 }}>
        {plan.chart === "line" ? "月次の売上" : "カテゴリ別の件数"}
      </h2>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
        強調: {plan.emphasis}
      </p>
      <svg viewBox={"0 0 " + W + " " + H} width="100%" role="img"
        aria-label={plan.chart === "line" ? "月次の売上の折れ線" : "カテゴリ別の件数の棒"}>
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="var(--border)" strokeWidth="1" />
        {Chart ? <Chart hot={hot} /> : null}
      </svg>
      {Chart ? null : <p style={{ fontSize: 13 }}>図が決まらなかったので、人が選びます</p>}
    </div>
  );
}`}
              hints={[
                "planのどのキーが図の種類を持っているかを見ます。CHARTSのキーはline / barです。",
              ]}
              keywords={["CHARTS[plan.chart]"]}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              planのchartを
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded mx-1">
                bar
              </code>
              に、emphasisを
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded mx-1">
                max
              </code>
              に書き換えると、同じコードで棒が描かれます。判断が変わると画面が変わる、という関係がここで閉じます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              確認クイズ
            </h2>
            <Quiz
              question="注意書きの判定を「点が少ない、または偏りが強い」の1問で聞いたところ、5つのデータすべてが0.65以上になりました。最初に試すことは？"
              options={[
                { label: "しきい値を0.9に上げる" },
                {
                  label: "質問を「点が少ない」と「偏りが強い」の2問に分ける",
                  correct: true,
                },
                { label: "データを増やしてから聞き直す" },
                { label: "noulをchoiceに変える" },
              ]}
              explanation="1つの質問で2つのことを聞くと、どちらで高いのかが分かりません。実測では、分けたことで月次の売上が「点が少ない」0.18、「偏り」0.55となり、偏りのほうに反応していたと判明しました。しきい値の調整は、何に反応しているか分かってからの作業です。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs — Introduction",
                  url: "https://docs.typesafe.ai/introduction",
                  description:
                    "質問は1つのことだけを聞き、複数の要素が絡むなら分けてコードで合成する、という設計の説明。",
                },
                {
                  title: "TypeSafe AI Docs — Choice",
                  url: "https://docs.typesafe.ai/primitives/choice",
                  description:
                    "選択肢の書き方と、probabilitiesとconfidenceの読み方。",
                },
                {
                  title: "TypeSafe AI Docs — Confidence",
                  url: "https://docs.typesafe.ai/confidence",
                  description: "confidenceで自動処理と人の確認を分ける考え方。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-chart-picker-app" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
