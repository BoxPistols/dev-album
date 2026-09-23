import { Shapes, Scale, Server } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodePreview from "@/components/CodePreview";
import CodingChallenge from "@/components/CodingChallenge";
import JevMeter from "@/components/JevMeter";
import SliderChallenge from "@/components/SliderChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * サンプルアプリ4: デザイン案の探索
 * STEP 21: Jevセクション
 * - コードが候補を組み合わせで作り、Jevが観点ごとに採点し、コードが重みで順位を決める
 * - 評価関数としての使い方。順位を信じてよい条件を実測（揺れと差）で示す
 * - confidenceは分布の集中度で、スコアの高さとは別物であることを内訳で示す
 * - 数値は2026-09-20にjev-1.13.0を実際に呼んで得たもの
 */

type CriterionKey = "clarity" | "findable" | "mistake" | "fit";

/** コードが組み合わせで作った12案と、Jevの採点（2026-09-20、jev-1.13.0で実測） */
const DESIGN_CANDIDATES: {
  id: string;
  label: string;
  outline: boolean;
  padding: string;
  s: Record<CriterionKey, number>;
}[] = [
  {
    id: "c1",
    label: "保存",
    outline: false,
    padding: "余白小",
    s: { clarity: 0.96, findable: 1.89, mistake: 1.33, fit: 1.78 },
  },
  {
    id: "c2",
    label: "保存",
    outline: false,
    padding: "余白大",
    s: { clarity: 0.68, findable: 1.88, mistake: 1.45, fit: 1.77 },
  },
  {
    id: "c3",
    label: "保存",
    outline: true,
    padding: "余白小",
    s: { clarity: 0.63, findable: 1.14, mistake: 1.48, fit: 0.26 },
  },
  {
    id: "c4",
    label: "保存",
    outline: true,
    padding: "余白大",
    s: { clarity: 0.5, findable: 1.19, mistake: 1.39, fit: 0.25 },
  },
  {
    id: "c5",
    label: "保存して次へ",
    outline: false,
    padding: "余白小",
    s: { clarity: 1.98, findable: 1.9, mistake: 1.38, fit: 1.82 },
  },
  {
    id: "c6",
    label: "保存して次へ",
    outline: false,
    padding: "余白大",
    s: { clarity: 1.97, findable: 1.89, mistake: 1.36, fit: 1.81 },
  },
  {
    id: "c7",
    label: "保存して次へ",
    outline: true,
    padding: "余白小",
    s: { clarity: 1.94, findable: 1.02, mistake: 1.4, fit: 0.34 },
  },
  {
    id: "c8",
    label: "保存して次へ",
    outline: true,
    padding: "余白大",
    s: { clarity: 1.94, findable: 1.05, mistake: 1.38, fit: 0.29 },
  },
  {
    id: "c9",
    label: "変更を保存",
    outline: false,
    padding: "余白小",
    s: { clarity: 1.28, findable: 1.89, mistake: 1.4, fit: 1.83 },
  },
  {
    id: "c10",
    label: "変更を保存",
    outline: false,
    padding: "余白大",
    s: { clarity: 1.33, findable: 1.89, mistake: 1.36, fit: 1.81 },
  },
  {
    id: "c11",
    label: "変更を保存",
    outline: true,
    padding: "余白小",
    s: { clarity: 1.04, findable: 1.16, mistake: 1.45, fit: 0.29 },
  },
  {
    id: "c12",
    label: "変更を保存",
    outline: true,
    padding: "余白大",
    s: { clarity: 0.99, findable: 1.23, mistake: 1.41, fit: 0.31 },
  },
];

/** 同じ案を3回採点したときの合計点の振れ幅（実測で0.005〜0.038）から決めた */
const DESIGN_NOISE = 0.04;

/** 振れ幅を測ったときの重み。これ以外の重みでの振れ幅は測っていない */
const DESIGN_MEASURED_WEIGHTS: Record<CriterionKey, number> = {
  clarity: 0.4,
  findable: 0.2,
  mistake: 0.3,
  fit: 0.1,
};

export default function JevDesignSearchApp() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 21</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          サンプルアプリ4: デザイン案の探索
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          ボタンの案をコードが組み合わせで作り、観点ごとにJevが採点し、重みを掛けて順位を決めます。ここでのJevは、探索の中で候補を評価する関数です。案を作るのも、重みを決めるのも、最後に選ぶのもコードの側にあります。
        </p>

        <WhyNowBox
          tags={[
            "評価関数",
            "組み合わせ",
            "重み付け",
            "順位の揺れ",
            "実測値つき",
          ]}
        >
          <p>
            案を3つ4つ見比べるだけなら人が決めれば済みます。軸が増えて十数通りになると、全部を同じ観点で見比べる手間が増え、途中で基準がぶれます。採点だけを任せれば、案の数が増えても同じ基準で並べられます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Shapes className="text-primary" size={28} />
              1. 候補はコードが作る
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ラベル3通り、主ボタンか副ボタンかの2通り、余白2通りで、12案になります。案を作るのに生成は要りません。組み合わせを回すだけです。
            </p>
            <CodeBlock
              language="ts"
              title="lib/design.ts（候補の生成）"
              code={`export type Candidate = {
  id: string;
  label: string;
  weight: "主ボタン（塗り）" | "副ボタン（枠線のみ）";
  padding: string;
};

/** 候補はコードが組み合わせで作る。生成にモデルは使わない */
export function buildCandidates(): Candidate[] {
  const labels = ["保存", "保存して次へ", "変更を保存"];
  const weights = ["主ボタン（塗り）", "副ボタン（枠線のみ）"] as const;
  const paddings = ["上下10px・左右16px", "上下14px・左右24px"];
  const out: Candidate[] = [];
  for (const label of labels)
    for (const weight of weights)
      for (const padding of paddings)
        out.push({ id: \`c\${out.length + 1}\`, label, weight, padding });
  return out;
}`}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Scale className="text-primary" size={28} />
              2. 観点ごとに採点し、重みはコードが持つ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              1つの案について4つの観点を聞き、合計点はコードが計算します。優先順位が変わったら、重みの数字だけを変えます。質問文は変えません。
            </p>
            <CodeBlock
              language="ts"
              title="lib/design.ts（観点と重み）"
              code={`export const CRITERIA = {
  clarity: "このボタンを押すと何が起きるかが、ラベルから分かる",
  findable: "画面の中でこのボタンを見つけやすい",
  mistake: "隣の「戻る」と間違えて押しにくい",
  fit: "入力フォームの確定ボタンとして、見た目の強さが適切である",
} as const;

/** 重みはコードが持つ。優先順位が変わったらここだけを変える */
export const WEIGHTS: Record<CriterionId, number> = {
  clarity: 0.4,
  findable: 0.2,
  mistake: 0.3,
  fit: 0.1,
};

export function composite(scores: Record<CriterionId, number>): number {
  return (Object.keys(WEIGHTS) as CriterionId[]).reduce(
    (sum, k) => sum + scores[k] * WEIGHTS[k],
    0,
  );
}`}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              下のプレビューは、採点を実測値で固定し、重みだけを差し替えています。ボタンの見た目も案のとおりに描いています。
            </p>
            <CodePreview
              title="重みを切り替えて順位を見る（Jevは呼ばない。採点は実測値を固定で持つ）"
              previewHeight={440}
              code={`// コードが組み合わせで作った12案と、Jevの採点（2026-09-20の実測値）。
// 重みはコードが持つ。切り替えると合計点は変わる
const CANDIDATES = [
  { id: "c1", label: "保存", weight: "fill", padding: "上下10px・左右16px", s: { clarity: 0.96, findable: 1.89, mistake: 1.33, fit: 1.78 } },
  { id: "c2", label: "保存", weight: "fill", padding: "上下14px・左右24px", s: { clarity: 0.68, findable: 1.88, mistake: 1.45, fit: 1.77 } },
  { id: "c3", label: "保存", weight: "outline", padding: "上下10px・左右16px", s: { clarity: 0.63, findable: 1.14, mistake: 1.48, fit: 0.26 } },
  { id: "c4", label: "保存", weight: "outline", padding: "上下14px・左右24px", s: { clarity: 0.5, findable: 1.19, mistake: 1.39, fit: 0.25 } },
  { id: "c5", label: "保存して次へ", weight: "fill", padding: "上下10px・左右16px", s: { clarity: 1.98, findable: 1.9, mistake: 1.38, fit: 1.82 } },
  { id: "c6", label: "保存して次へ", weight: "fill", padding: "上下14px・左右24px", s: { clarity: 1.97, findable: 1.89, mistake: 1.36, fit: 1.81 } },
  { id: "c7", label: "保存して次へ", weight: "outline", padding: "上下10px・左右16px", s: { clarity: 1.94, findable: 1.02, mistake: 1.4, fit: 0.34 } },
  { id: "c8", label: "保存して次へ", weight: "outline", padding: "上下14px・左右24px", s: { clarity: 1.94, findable: 1.05, mistake: 1.38, fit: 0.29 } },
  { id: "c9", label: "変更を保存", weight: "fill", padding: "上下10px・左右16px", s: { clarity: 1.28, findable: 1.89, mistake: 1.4, fit: 1.83 } },
  { id: "c10", label: "変更を保存", weight: "fill", padding: "上下14px・左右24px", s: { clarity: 1.33, findable: 1.89, mistake: 1.36, fit: 1.81 } },
  { id: "c11", label: "変更を保存", weight: "outline", padding: "上下10px・左右16px", s: { clarity: 1.04, findable: 1.16, mistake: 1.45, fit: 0.29 } },
  { id: "c12", label: "変更を保存", weight: "outline", padding: "上下14px・左右24px", s: { clarity: 0.99, findable: 1.23, mistake: 1.41, fit: 0.31 } },
];
// 同じ候補を3回採点したときの合計点の振れ幅（実測で0.005〜0.038）
const NOISE = 0.04;

const PRESETS = {
  "明快さを重く": { clarity: 0.4, findable: 0.2, mistake: 0.3, fit: 0.1 },
  "誤操作を避ける": { clarity: 0.2, findable: 0.1, mistake: 0.6, fit: 0.1 },
  "均等": { clarity: 0.25, findable: 0.25, mistake: 0.25, fit: 0.25 },
};

const total = (c, w) => Object.keys(w).reduce((sum, k) => sum + c.s[k] * w[k], 0);

function Sample({ c, top }) {
  const fill = c.weight === "fill";
  return (
    <button style={{
      padding: c.padding.includes("10px") ? "10px 16px" : "14px 24px", fontSize: 14, borderRadius: 8,
      border: "1px solid var(--text-accent)",
      background: fill ? "var(--text-accent)" : "transparent",
      color: fill ? "var(--bg)" : "var(--text-accent)",
      fontWeight: top ? 700 : 400,
    }}>{c.label}</button>
  );
}

function App() {
  const [preset, setPreset] = useState("明快さを重く");
  const w = PRESETS[preset];
  const ranked = [...CANDIDATES].map((c) => ({ ...c, total: total(c, w) })).sort((a, b) => b.total - a.total);
  const decided = ranked[0].total - ranked[1].total > NOISE;
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        {Object.keys(PRESETS).map((k) => (
          <button key={k} onClick={() => setPreset(k)} aria-pressed={k === preset}
            style={{ fontSize: 13, fontWeight: k === preset ? 700 : 400 }}>{k}</button>
        ))}
      </div>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>
        {decided
          ? "1位と2位の差が揺れ(" + NOISE + ")より大きいので、1案に決まる"
          : "1位と2位の差が揺れ(" + NOISE + ")より小さい。この重みでは決められない"}
      </p>
      <ol style={{ paddingLeft: 20, margin: 0 }}>
        {ranked.slice(0, 6).map((c, i) => (
          <li key={c.id} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <Sample c={c} top={i === 0} />
              <span style={{ fontSize: 13 }}>{c.total.toFixed(3)}</span>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {c.weight === "fill" ? "主ボタン" : "副ボタン"}・余白 {c.padding}
              </span>
              {i === 0 && !decided ? (
                <span style={{ fontSize: 12, color: "var(--text-danger)" }}>2位と同着扱い</span>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      <p style={{ fontSize: 13, color: "var(--text-muted)" }}>上位6案のみ表示</p>
    </div>
  );
}`}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              3通りのどれでも、上位2案は入れ替わりませんでした。手元では、見つけやすさを重くした4通り目でも同じでした。重みで動くのは3位以下で、上位はどの重みでも「保存して次へ・主ボタン」の2案です。重みをいじって結論を動かそうとする前に、案の作り方を見るほうが早い場面です。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              3. 順位を信じてよい条件
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              同じ案を3回採点すると、合計点は少しずつ動きます。動く幅より小さい差は、順位として読めません。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <caption className="text-left text-muted-foreground mb-2">
                  同じ案を3回採点した合計点（2026-09-20、jev-1.13.0で実測）
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      案
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      3回の合計点
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      振れ幅
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border">
                      保存して次へ・主ボタン・余白小
                    </td>
                    <td className="p-3 border-b border-border">
                      1.754 / 1.728 / 1.716
                    </td>
                    <td className="p-3 border-b border-border">0.038</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">
                      保存して次へ・主ボタン・余白大
                    </td>
                    <td className="p-3 border-b border-border">
                      1.734 / 1.751 / 1.729
                    </td>
                    <td className="p-3 border-b border-border">0.022</td>
                  </tr>
                  <tr>
                    <td className="p-3">変更を保存・主ボタン・余白大</td>
                    <td className="p-3">1.456 / 1.452 / 1.451</td>
                    <td className="p-3">0.005</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              1位と2位の差は0.013で、振れ幅（0.005〜0.038）より小さい値でした。この2案は、採点では区別が付きません。違いは余白だけで、余白の差は採点にほとんど出ていません。一方、1位と3位の差は0.269あり、振れ幅より十分大きいので、この順位は読めます。
            </p>
            <SliderChallenge
              title="重みを動かして、12案の順位と「決まるかどうか」を見る"
              description="採点は実測のまま固定し、重みだけを動かします。重みはコードが持つ値で、Jevは採点しか担当しません。合計点は重みで正規化しています。"
              layout="stacked"
              sliders={[
                {
                  id: "clarity",
                  label: "何が起きるか分かる",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  defaultValue: 0.4,
                },
                {
                  id: "findable",
                  label: "見つけやすい",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  defaultValue: 0.2,
                },
                {
                  id: "mistake",
                  label: "間違えて押しにくい",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  defaultValue: 0.3,
                },
                {
                  id: "fit",
                  label: "画面になじむ",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  defaultValue: 0.1,
                },
              ]}
              render={(v) => {
                const keys: CriterionKey[] = [
                  "clarity",
                  "findable",
                  "mistake",
                  "fit",
                ];
                const sum = keys.reduce((a, k) => a + v[k], 0);
                if (sum === 0) {
                  return (
                    <p className="text-sm text-foreground">
                      重みがすべて0です。どれか1つでも上げてください。
                    </p>
                  );
                }
                const ranked = DESIGN_CANDIDATES.map((c) => ({
                  ...c,
                  total: keys.reduce((a, k) => a + c.s[k] * (v[k] / sum), 0),
                })).sort((a, b) => b.total - a.total);
                const gap = ranked[0].total - ranked[1].total;
                // 振れ幅は既定の重みでの合計点について測った値。重みを変えると
                // 合計点の取り方が変わるので、同じ0.04をそのまま当てられない
                const measured = keys.every(
                  (k) =>
                    Math.abs(v[k] / sum - DESIGN_MEASURED_WEIGHTS[k]) < 0.001,
                );
                const decided = gap > DESIGN_NOISE;
                return (
                  <div className="w-full">
                    <p className="text-sm text-foreground mb-3 leading-relaxed">
                      {measured
                        ? decided
                          ? `1位と2位の差は${gap.toFixed(3)}で、揺れ（${DESIGN_NOISE}）より大きい。1案に決まります。`
                          : `1位と2位の差は${gap.toFixed(3)}で、揺れ（${DESIGN_NOISE}）以下。この重みでは決められません。`
                        : `1位と2位の差は${gap.toFixed(3)}。揺れ（${DESIGN_NOISE}）は既定の重みでの合計点について測った値なので、この重みでは決め手になりません。採り直して確かめてください。`}
                    </p>
                    <ol className="space-y-2">
                      {ranked.slice(0, 5).map((c, i) => (
                        <li
                          key={c.id}
                          className="flex items-center justify-between gap-3 text-sm"
                        >
                          <span className="flex items-center gap-3">
                            <span className="font-mono tabular-nums text-muted-foreground">
                              {i + 1}
                            </span>
                            <span
                              className={
                                c.outline
                                  ? `rounded-lg border border-primary text-primary ${c.padding === "余白小" ? "px-4 py-2.5" : "px-6 py-3.5"}`
                                  : `rounded-lg border border-primary bg-primary text-primary-foreground ${c.padding === "余白小" ? "px-4 py-2.5" : "px-6 py-3.5"}`
                              }
                            >
                              {c.label}
                            </span>
                            <span className="text-muted-foreground">
                              {c.padding}
                            </span>
                          </span>
                          <span className="font-mono tabular-nums text-foreground">
                            {c.total.toFixed(3)}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              }}
              explanation="「間違えて押しにくい」を上げていくと、4つの観点のうち案ごとの差がいちばん小さい観点（1.33〜1.48）が支配的になり、どの案も横並びになります。重みは、どの観点で差を付けたいかの宣言です。採点はJevが返しますが、何を重く見るかはコードが持ちます。なお、揺れの0.04は既定の重みでの合計点について測った値です。重みを変えると合計点の取り方が変わるため、同じ値を当てられません。本番では、使う重みで採り直して振れ幅を測ります。"
            />
            <CodeBlock
              language="ts"
              title="lib/design.ts（決められないことを返す）"
              code={`/** 採点の揺れ。同じ候補を3回採点したときの合計点の振れ幅（最大0.038）から決めた */
export const NOISE = 0.04;

/** 揺れより大きな差が付いた候補だけを「選べた」と扱う */
export function pickTop(scored: Scored[]): { top: Scored; decided: boolean } {
  const sorted = [...scored].sort((a, b) => b.total - a.total);
  return { top: sorted[0], decided: sorted[0].total - sorted[1].total > NOISE };
}`}
            />
            <InfoBox type="info" title="測れない軸があることが分かるのも結果">
              余白の差が採点に出ないのは、渡しているのが見た目ではなく文字で書いた仕様だからです。Jevは図を見ないので、間隔の微妙な違いは判断の材料になりません。案の軸を決める段階で、文字で書いて違いが出るものかを考えることになります。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              4. confidenceは分布の集中度
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              1案の内訳を見ると、点が高い観点でconfidenceが高いわけではないと分かります。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <caption className="text-left text-muted-foreground mb-2">
                  「保存して次へ・主ボタン・余白大」の内訳（2026-09-20、jev-1.13.0で実測）
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      観点
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      score
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      confidence
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      probabilities
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border">
                      ラベルから分かる
                    </td>
                    <td className="p-3 border-b border-border">1.96</td>
                    <td className="p-3 border-b border-border">0.94</td>
                    <td className="p-3 border-b border-border">
                      0.01 / 0.01 / 0.98
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">見つけやすい</td>
                    <td className="p-3 border-b border-border">1.88</td>
                    <td className="p-3 border-b border-border">0.82</td>
                    <td className="p-3 border-b border-border">
                      0.01 / 0.09 / 0.90
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">
                      間違えて押しにくい
                    </td>
                    <td className="p-3 border-b border-border">1.35</td>
                    <td className="p-3 border-b border-border">0.02</td>
                    <td className="p-3 border-b border-border">
                      0.18 / 0.28 / 0.54
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3">見た目の強さが適切</td>
                    <td className="p-3">1.83</td>
                    <td className="p-3">0.74</td>
                    <td className="p-3">0.02 / 0.14 / 0.84</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              「間違えて押しにくい」は3段階に0.18 / 0.28 /
              0.54と散っていて、confidenceは0.02です。scoreの1.35は、散った分布の期待値として出た数字にすぎません。合計点に入れる前に、confidenceの低い観点は重みを下げるか、人に確認してもらう対象にします。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Server className="text-primary" size={28} />
              5. まとめて聞くか、1案ずつ聞くか
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              12案を1リクエスト（48問）にまとめると、費用と時間は減ります。ただし順位が変わりました。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <caption className="text-left text-muted-foreground mb-2">
                  12案の採点（2026-09-20、jev-1.13.0で実測）
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      方式
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      リクエスト
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      入力トークン
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      時間
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border">
                      案ごとに分ける
                    </td>
                    <td className="p-3 border-b border-border">
                      12回（4問ずつ）
                    </td>
                    <td className="p-3 border-b border-border">7,998</td>
                    <td className="p-3 border-b border-border">3,874ms</td>
                  </tr>
                  <tr>
                    <td className="p-3">まとめて1回</td>
                    <td className="p-3">1回（48問）</td>
                    <td className="p-3">4,649</td>
                    <td className="p-3">660ms</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              順位のずれは平均1.17位、最大4位で、上位3案のうち一致したのは2案でした。まとめて聞くと、他の案が見えている状態での採点になります。接戦のところで順位が変わるので、案ごとに分けて聞いています。前のSTEPのダッシュボードのように、対象どうしが競合しない場合は、まとめたほうが有利です。
            </p>
            <JevMeter
              title="案の数を増やすと、どちらの送り方がどこで効くか"
              description="ボタンを押すと、採点した案の数が増えます。上の表の12案での実測（案ごとは12回で3,874ms・7,998トークン、まとめては1回で660ms・4,649トークン）を1リクエストあたりに割り、リクエスト数を掛けています。"
              unitLabel="案"
              steps={[12, 100, 1000]}
              strategies={[
                {
                  id: "each",
                  label: "案ごとに分ける",
                  note: "1案につき4問。順位は読める",
                  unitsPerRequest: 1,
                  latencyMs: 322.8,
                  inputTokens: 666.5,
                },
                {
                  id: "batch",
                  label: "12案をまとめて1回",
                  note: "48問。接戦の順位は変わる",
                  unitsPerRequest: 12,
                  latencyMs: 660,
                  inputTokens: 4649,
                },
              ]}
              measuredNote="2026-09-20、jev-1.13.0で実測"
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              1,000案でも、案ごとに分けて5分20秒ほど、まとめれば1分弱です。料金はどちらも$0.03に届きません。人が1案ずつ見て選ぶのとは桁が違うので、案を絞ってから採点するのではなく、作れるだけ作ってから採点する順番にできます。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              6. 決められないことを返す
            </h2>
            <CodingChallenge
              title="シミュレーション: 揺れより小さい差は決めない（Jevは呼ばない）"
              description="pickTopの ___ を埋めて、1位と2位の差が揺れ(NOISE)より大きいときだけdecidedをtrueにしてください。"
              preview={true}
              initialCode={`// /api/designが返すのと同じ形の固定データ（シミュレーション用。値は実測）
const scored = [
  { id: "c5", label: "保存して次へ", total: 1.768 },
  { id: "c6", label: "保存して次へ", total: 1.755 },
  { id: "c10", label: "変更を保存", total: 1.499 },
];
const NOISE = 0.04;

function pickTop(list) {
  const sorted = [...list].sort((a, b) => b.total - a.total);
  return { top: sorted[0], decided: sorted[0].total - sorted[1].___ > NOISE };
}

function App() {
  const { top, decided } = pickTop(scored);
  return (
    <div style={{ fontFamily: "sans-serif", fontSize: 14 }}>
      <p>1位: {top.label}（{top.total}）</p>
      <p style={{ color: decided ? "var(--text)" : "var(--text-danger)" }}>
        {decided ? "1案に決まった" : "1位と2位の差が揺れより小さい。2案を人に見せる"}
      </p>
    </div>
  );
}`}
              answer={`// /api/designが返すのと同じ形の固定データ（シミュレーション用。値は実測）
const scored = [
  { id: "c5", label: "保存して次へ", total: 1.768 },
  { id: "c6", label: "保存して次へ", total: 1.755 },
  { id: "c10", label: "変更を保存", total: 1.499 },
];
const NOISE = 0.04;

function pickTop(list) {
  const sorted = [...list].sort((a, b) => b.total - a.total);
  return { top: sorted[0], decided: sorted[0].total - sorted[1].total > NOISE };
}

function App() {
  const { top, decided } = pickTop(scored);
  return (
    <div style={{ fontFamily: "sans-serif", fontSize: 14 }}>
      <p>1位: {top.label}（{top.total}）</p>
      <p style={{ color: decided ? "var(--text)" : "var(--text-danger)" }}>
        {decided ? "1案に決まった" : "1位と2位の差が揺れより小さい。2案を人に見せる"}
      </p>
    </div>
  );
}`}
              hints={[
                "比べるのは2位の合計点です。データのどのキーに入っているかを見ます。",
              ]}
              keywords={["sorted[1].total"]}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              確認クイズ
            </h2>
            <Quiz
              question="12案を採点したところ、1位1.768、2位1.755でした。同じ案を3回採点した振れ幅は0.005〜0.038です。どうしますか？"
              options={[
                { label: "1位を採用する。0.013でも差は差" },
                {
                  label:
                    "差が振れ幅より小さいので、この2案は人に見せて決めてもらう",
                  correct: true,
                },
                { label: "10回採点して平均を取れば決まる" },
                { label: "重みを変えて、1位が決まるまで試す" },
              ]}
              explanation="測り直すたびに順位が入れ替わる差は、順位として読めません。この2案は余白だけが違い、その差は採点に出ていませんでした。回数を増やすより、決められないことを返して人に渡すほうが速く、重みを結論に合わせて動かすのは順序が逆です。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs — Composite scoring",
                  url: "https://docs.typesafe.ai/patterns/composite-scoring",
                  description:
                    "判断を観点ごとに分け、重みはコードが持つという組み立て方。",
                },
                {
                  title: "TypeSafe AI Docs — Score",
                  url: "https://docs.typesafe.ai/primitives/score",
                  description:
                    "段階の作り方と、期待値が段階の間に落ちることの説明。",
                },
                {
                  title: "TypeSafe AI Docs — Confidence",
                  url: "https://docs.typesafe.ai/confidence",
                  description: "confidenceが確率の分布から導かれること。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-design-search-app" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
