import { LayoutGrid, Server, Flame } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import JevMeter from "@/components/JevMeter";
import CodePreview from "@/components/CodePreview";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * サンプルアプリ3: ダッシュボードの自動強調
 * STEP 20: Jevセクション
 * - 20枚のカードを1リクエストで一括採点し、大きさ・並び・帯が組み替わる
 * - 質問を増やしても応答時間がほとんど変わらないことを実測で示す
 * - 上限に張り付いた同点はコードが変化率で並べる
 * - 数値は2026-09-20にjev-1.13.0を実際に呼んで得たもの
 */

export default function JevDashboardApp() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 20</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          サンプルアプリ3: ダッシュボードの自動強調
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          20個の指標を1リクエストでまとめて採点し、いま見るべきものが大きく前に出る画面を作ります。データが変われば、並びも大きさも色の帯も組み替わります。判断を1つずつ呼んでいては成り立たない作りで、まとめて聞けることが設計の前提になります。
        </p>

        <WhyNowBox
          tags={["一括採点", "score", "レイアウトの組み替え", "実測値つき"]}
        >
          <p>
            ダッシュボードは、置いた人が「大事な順」を決めた時点で固定されます。実際に見るべきものは日によって変わりますが、その順序をコードで書こうとすると、指標ごとのしきい値を人が全部決めることになります。人が数秒で決められる「今日はこれを先に見るべきか」を、指標の数だけまとめて聞きます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <LayoutGrid className="text-primary" size={28} />
              1. 画面が組み替わる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              平常時と障害の当日で、同じ20枚がどう並び替わるかを見てください。採点はJevの実測値をそのまま置いています。
            </p>
            <CodePreview
              title="判断でレイアウトが変わる（Jevは呼ばない。採点は実測値を固定で持つ）"
              previewHeight={420}
              code={`// 2つの時点と、それぞれに対するJevの採点（2026-09-20の実測値）。
// ボタンで切り替えると、同じ20枚のカードの大きさ・並び・帯が組み替わる
const METRICS = {
  平常時: [
    ["エラー率", "0.21%", 1.16], ["応答時間p95", "280ms", 0.97], ["売上", "412万円/日", 0.68],
    ["処理待ち", "18件", 0.66], ["7日継続率", "41.2%", 0.63], ["未処理の問い合わせ", "23件", 0.62],
    ["解約率", "1.8%", 0.6], ["登録完了率", "34.2%", 0.58], ["返金", "4件/週", 0.55],
    ["有料転換", "21件/日", 0.54], ["新規登録", "312件/日", 0.53], ["日次利用者数", "9,800人", 0.52],
    ["不具合報告", "9件/日", 0.51], ["試用開始", "88件/日", 0.5], ["月間利用者数", "48,200人", 0.49],
    ["推奨度", "34点", 0.48], ["デプロイ回数", "12回/週", 0.47], ["空き容量", "62%", 0.45],
    ["初回表示", "1.4秒", 0.32], ["CPU使用率", "38%", 0.22],
  ],
  障害の当日: [
    ["エラー率", "7.4%", 2], ["応答時間p95", "2,100ms", 2], ["未処理の問い合わせ", "148件", 2],
    ["初回表示", "6.2秒", 2], ["処理待ち", "240件", 2], ["空き容量", "9%", 1.98],
    ["CPU使用率", "92%", 1.96], ["売上", "190万円/日", 1.95], ["登録完了率", "11.5%", 1.9],
    ["不具合報告", "63件/日", 1.88], ["返金", "17件/週", 1.6], ["日次利用者数", "6,100人", 1.55],
    ["新規登録", "140件/日", 1.5], ["試用開始", "41件/日", 1.4], ["有料転換", "6件/日", 1.35],
    ["解約率", "2.1%", 1.2], ["月間利用者数", "48,100人", 0.9], ["推奨度", "31点", 0.82],
    ["7日継続率", "40.9%", 0.67], ["デプロイ回数", "14回/週", 0.64],
  ],
};

const BAND_NOW = 1.5, BAND_SOON = 0.8;
const bandOf = (s) => (s >= BAND_NOW ? "now" : s >= BAND_SOON ? "soon" : "later");
const LABEL = { now: "すぐ見る", soon: "気に留める", later: "あとで" };
const COLOR = { now: "var(--text-danger)", soon: "var(--text-accent)", later: "var(--text-muted)" };

function Card({ row, big }) {
  const [name, value, score] = row;
  const band = bandOf(score);
  return (
    <div style={{
      gridColumn: big ? "span 2" : "span 1",
      border: "1px solid var(--border)", borderRadius: 10, padding: big ? 14 : 10,
      background: "var(--bg-card)",
    }}>
      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 2 }}>
        <span style={{ width: 8, height: 8, borderRadius: 8, background: COLOR[band] }} />
        <span style={{ fontSize: 12, color: COLOR[band] }}>{LABEL[band]}</span>
      </div>
      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{name}</div>
      <div style={{ fontSize: big ? 24 : 16, fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>見るべき度 {score}</div>
    </div>
  );
}

function App() {
  const [when, setWhen] = useState("平常時");
  const rows = METRICS[when];
  const nowCount = rows.filter((r) => bandOf(r[2]) === "now").length;
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {Object.keys(METRICS).map((k) => (
          <button key={k} onClick={() => setWhen(k)} aria-pressed={k === when}
            style={{ fontSize: 13, fontWeight: k === when ? 700 : 400 }}>{k}</button>
        ))}
      </div>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>
        20枚を1リクエストで採点し、点の高い順に並べる。「すぐ見る」は{nowCount}枚
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {rows.map((row, i) => <Card key={row[0]} row={row} big={i < 2} />)}
      </div>
    </div>
  );
}`}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              2. 20問を1リクエストで送る
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              質問は指標ごとに1つ作り、まとめて送ります。公式ドキュメントは、質問はそれぞれ独立に並列で評価されると説明しています。手元でも、質問を増やしても応答時間はほとんど変わりませんでした。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <caption className="text-left text-muted-foreground mb-2">
                  同じstateに質問の数を変えて送った（2026-09-20、jev-1.13.0で実測）
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      質問の数
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      応答時間
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      入力トークン
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border">1問</td>
                    <td className="p-3 border-b border-border">669ms</td>
                    <td className="p-3 border-b border-border">404</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">5問</td>
                    <td className="p-3 border-b border-border">574ms</td>
                    <td className="p-3 border-b border-border">614</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">10問</td>
                    <td className="p-3 border-b border-border">289ms</td>
                    <td className="p-3 border-b border-border">880</td>
                  </tr>
                  <tr>
                    <td className="p-3">20問</td>
                    <td className="p-3">289ms</td>
                    <td className="p-3">1,407</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              このダッシュボードでは、20問を1リクエストにまとめて入力2,666トークンでした。指標ごとに分けて送ると、1件あたり約415トークンで、20件なら約8,300トークンになります。まとめたほうが少なく、待ち時間も1回分で済みます。
            </p>
            <JevMeter
              title="判断の数を増やすと、2つの送り方の差がどこに出るか"
              description="ボタンを押すと、処理した判断の数が増えます。上の表の1問（669ms、404トークン）と20問（289ms、1,407トークン）を、そのまま掛け算しています。"
              unitLabel="判断"
              steps={[20, 100, 1000]}
              strategies={[
                {
                  id: "single",
                  label: "1問ずつ送る",
                  note: "判断1つにつき1リクエスト",
                  unitsPerRequest: 1,
                  latencyMs: 669,
                  inputTokens: 404,
                },
                {
                  id: "batch",
                  label: "20問を1リクエスト",
                  note: "stateは1回だけ送れば済む",
                  unitsPerRequest: 20,
                  latencyMs: 289,
                  inputTokens: 1407,
                },
              ]}
              measuredNote="2026-09-20、jev-1.13.0で実測"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              1,000件まで押すと、1問ずつでは11分ほどかかり、まとめれば15秒ほどで終わります。料金はどちらも$0.02に届きません。差が出るのは料金より待ち時間のほうです。判断をループの中や一覧の全件に置いてよいかどうかは、この桁を見てから決めます。
            </p>
            <CodeBlock
              language="ts"
              title="app/api/dashboard/route.ts（質問を指標の数だけ作る）"
              code={`import { TypeSafeClient, type Questions } from "@typesafe-ai/sdk";

// criteriaは「2つ以上の組」であることを型が要求する。as constを外すとstring[]になり、
// Questionsに代入できない
const LEVELS = ["今は見なくてよい", "気に留める程度", "すぐ見るべき"] as const;

const questions: Questions = Object.fromEntries(
  metrics.map((m) => [
    m.id,
    {
      type: "score" as const,
      instructions: \`指標「\${m.name}」を今すぐ確認すべき度合い\`,
      criteria: LEVELS,
    },
  ]),
);

const state = {
  役割: role,
  指標: metrics.map((m) => ({
    id: m.id, 名前: m.name, 単位: m.unit, 現在: m.current, 前日: m.previous,
  })),
};

const res = await client.systemOne({ state, questions });
const scores: Record<string, { score: number; confidence: number }> = {};
for (const m of metrics) {
  const answer = res.answers[m.id];
  // 質問を動的に組むと答えの型が広がるので、使う前に種類を確かめる
  if (answer.type !== "score") continue;
  scores[m.id] = { score: answer.score, confidence: answer.confidence };
}`}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Server className="text-primary" size={28} />
              3. 同点が並んだらコードが決める
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              障害の当日を採点すると、エラー率、応答時間p95、未処理の問い合わせ、初回表示、処理待ちの5件が上限の2.0で並びました。scoreには上限があるので、深刻さが上限を超えても点は増えません。どれを一番上に置くかは、コードが決めます。
            </p>
            <CodeBlock
              language="ts"
              title="lib/dashboard.ts（同点のときの並べ方）"
              code={`/** 表示の段。しきい値はコードが持つ */
export const BAND_NOW = 1.5;
export const BAND_SOON = 0.8;

export function changeRatio(m: Metric): number {
  if (m.previous === 0) return m.current === 0 ? 0 : 1;
  return Math.abs(m.current - m.previous) / Math.abs(m.previous);
}

/**
 * 採点を並べ替える。scoreが上限に張り付くと順位が付かないので、
 * 同点は変化の大きさで並べる（手元の測定では、障害時に5件が2.0で並んだ）
 */
export function rank(metrics: Metric[], scores: Scores): Ranked[] {
  return metrics
    .map((m) => ({
      ...m,
      score: scores[m.id].score,
      confidence: scores[m.id].confidence,
      changeRatio: changeRatio(m),
      band: bandOf(scores[m.id].score),
    }))
    .sort((a, b) => b.score - a.score || b.changeRatio - a.changeRatio);
}`}
            />
            <CodeBlock
              language="json"
              title="同点3件が変化の大きさで並んだ（2026-09-20の実測）"
              code={`  now   score 2.00  changeRatio 34.24  エラー率
  now   score 2.00  changeRatio  6.50  応答時間p95
  now   score 2.00  changeRatio  5.43  未処理の問い合わせ
  soon  score 0.85  changeRatio  0.09  推奨度
  later score 0.60  changeRatio  0.17  デプロイ回数`}
            />
            <InfoBox type="info" title="採点が取れなくても画面は消さない">
              呼び出しに失敗したときは、元の並びのままカードを出します。強調が付かないだけで、指標そのものは見えます。判断を足す前の画面が、そのまま退避先になります。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Flame className="text-primary" size={28} />
              4. 同じ形で、訴求と相手の組を採点する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              一括採点の形は、指標に限りません。訴求4つと相手3つの組み合わせ12通りを1リクエストで採点すると、どの相手に何が響くかの表ができます。配分をどう決めるかは、この表を見たコードの仕事です。
            </p>
            <CodePreview
              title="訴求×相手の採点（Jevは呼ばない。採点は実測値を固定で持つ）"
              previewHeight={340}
              code={`// 訴求4つ × 相手3つ = 12組を1リクエストで採点した結果（2026-09-20の実測値）
const APPEALS = ["導入の速さ", "費用の安さ", "サポートの手厚さ", "実績の多さ"];
const SEGMENTS = ["個人開発者", "中小企業の情シス", "大企業の調達部門"];
const SCORES = [
  [1.89, 1.57, 0.66],
  [1.79, 1.27, 0.71],
  [0.72, 1.67, 1.86],
  [0.69, 1.25, 1.9],
];

// 強さは棒の長さで表す。色の濃淡にすると、濃いところで文字が読めなくなる
// （ライトとダークで、読める濃さの範囲が逆になる）
function Bar({ value, best }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ flex: 1, height: 10, background: "var(--bg-muted)", borderRadius: 5 }}>
        <div style={{
          width: (value / 2) * 100 + "%", height: 10, borderRadius: 5,
          background: best ? "var(--text-accent)" : "var(--text-muted)",
        }} />
      </div>
      <span style={{ fontSize: 12, width: 52, textAlign: "right" }}>
        {value.toFixed(2)}{best ? " ◎" : ""}
      </span>
    </div>
  );
}

function App() {
  const best = SEGMENTS.map((_, j) =>
    SCORES.map((r) => r[j]).indexOf(Math.max(...SCORES.map((r) => r[j]))));
  return (
    <div>
      <h2 style={{ fontSize: 16, marginBottom: 2 }}>どの訴求が、誰に響くか</h2>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>
        0が響かない、2が強く響く。◎ は相手ごとの最高点
      </p>
      <table style={{ borderCollapse: "collapse", fontSize: 13, width: "100%" }}>
        <thead>
          <tr>
            <th scope="col" style={{ textAlign: "left", padding: "6px 8px" }} />
            {SEGMENTS.map((s) => (
              <th key={s} scope="col" style={{ textAlign: "left", padding: "6px 8px", fontWeight: 600 }}>{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {APPEALS.map((a, i) => (
            <tr key={a}>
              <th scope="row" style={{ textAlign: "left", padding: "6px 8px", fontWeight: 400, whiteSpace: "nowrap" }}>{a}</th>
              {SEGMENTS.map((seg, j) => (
                <td key={seg} style={{ padding: "6px 8px", minWidth: 150 }}>
                  <Bar value={SCORES[i][j]} best={best[j] === i} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 10 }}>
        配分の重みはコードが決める
      </p>
    </div>
  );
}`}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              個人開発者には導入の速さ（1.89）と費用の安さ（1.79）が上位に出て、大企業の調達部門では実績の多さ（1.90）とサポートの手厚さ（1.86）が入れ替わりました。12組で1リクエスト、入力1,263トークン、399msでした。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              5. 並べ方を書く
            </h2>
            <CodingChallenge
              title="シミュレーション: 同点は変化の大きさで並べる（Jevは呼ばない）"
              description="sortの比較関数の ___ を埋めて、点が同じときは変化の大きいものが先に来るようにしてください。"
              preview={true}
              initialCode={`// /api/dashboardが返すのと同じ形の固定データ（シミュレーション用。値は実測）
const ranked = [
  { name: "未処理の問い合わせ", score: 2, changeRatio: 5.43 },
  { name: "エラー率", score: 2, changeRatio: 34.24 },
  { name: "応答時間p95", score: 2, changeRatio: 6.5 },
  { name: "推奨度", score: 0.85, changeRatio: 0.09 },
  { name: "デプロイ回数", score: 0.6, changeRatio: 0.17 },
];

function App() {
  const sorted = [...ranked].sort((a, b) => b.score - a.score || b.___ - a.changeRatio);
  return (
    <ol style={{ fontFamily: "sans-serif", fontSize: 14, paddingLeft: 20 }}>
      {sorted.map((r) => (
        <li key={r.name} style={{ marginBottom: 6 }}>
          {r.name}
          <span style={{ color: "var(--text-muted)" }}>
            {" "}見るべき度 {r.score}・変化 {r.changeRatio}倍
          </span>
        </li>
      ))}
    </ol>
  );
}`}
              answer={`// /api/dashboardが返すのと同じ形の固定データ（シミュレーション用。値は実測）
const ranked = [
  { name: "未処理の問い合わせ", score: 2, changeRatio: 5.43 },
  { name: "エラー率", score: 2, changeRatio: 34.24 },
  { name: "応答時間p95", score: 2, changeRatio: 6.5 },
  { name: "推奨度", score: 0.85, changeRatio: 0.09 },
  { name: "デプロイ回数", score: 0.6, changeRatio: 0.17 },
];

function App() {
  const sorted = [...ranked].sort((a, b) => b.score - a.score || b.changeRatio - a.changeRatio);
  return (
    <ol style={{ fontFamily: "sans-serif", fontSize: 14, paddingLeft: 20 }}>
      {sorted.map((r) => (
        <li key={r.name} style={{ marginBottom: 6 }}>
          {r.name}
          <span style={{ color: "var(--text-muted)" }}>
            {" "}見るべき度 {r.score}・変化 {r.changeRatio}倍
          </span>
        </li>
      ))}
    </ol>
  );
}`}
              hints={[
                "同点のときに比べるのは、前日からの変化の大きさです。データのどのキーにそれが入っているかを見ます。",
              ]}
              keywords={["b.changeRatio - a.changeRatio"]}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              確認クイズ
            </h2>
            <Quiz
              question="20個の指標を採点するとき、1指標につき1リクエストを送るのと、20問を1リクエストにまとめるのとでは何が変わりますか？"
              options={[
                { label: "答えの精度が上がる" },
                {
                  label:
                    "入力トークンと待ち時間が減る。手元では約8,300トークンが2,666トークンになった",
                  correct: true,
                },
                { label: "confidenceが高くなる" },
                { label: "質問の数だけ応答時間が伸びる" },
              ]}
              explanation="stateは1回だけ送れば済むので、まとめたほうが入力トークンが減ります。質問は並列に評価されるため、応答時間も質問の数にはほとんど比例しません。実測では1問669ms、20問289msでした。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs — Speculative fan-out",
                  url: "https://docs.typesafe.ai/patterns/fan-out",
                  description:
                    "多くの質問を1リクエストに入れ、使う答えをコードが選ぶ設計。",
                },
                {
                  title: "TypeSafe AI Docs — Score",
                  url: "https://docs.typesafe.ai/primitives/score",
                  description:
                    "段階の作り方と、期待値が段階の間に落ちることの説明。",
                },
                {
                  title: "TypeSafe AI Docs — Composite scoring",
                  url: "https://docs.typesafe.ai/patterns/composite-scoring",
                  description:
                    "判断を分けて聞き、重みはコードが持つという組み立て方。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-dashboard-app" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
