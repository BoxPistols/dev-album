import { Megaphone, Server, BarChart3 } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * サンプルアプリ 5: マーケティングの反応分析
 * STEP 22: Jev セクション
 * - キャンペーン後に届く問い合わせ・SNS の言及・アンケートをまとめて評価する
 * - 購買意図（score）、検討段階（choice）、ブランドへの態度（choice）、担当が今日連絡すべきか（noul）
 * - 集計してキャンペーンごとに比較する（分析）+ 個別に次の行動を決める（運用）の両方
 */

export default function JevLeadsApp() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 22</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          サンプルアプリ 5: マーケティングの反応分析
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          キャンペーンを打った後に届く問い合わせ、SNS
          の言及、アンケートの自由記述をまとめて Jev に渡し、
          購買意図の強さ、検討段階、ブランドへの態度、今日連絡すべきかを判定します。
          個別には「誰に今日連絡するか」を決め、集計すれば「どのキャンペーンが検討段階の人を動かしたか」が数値で比べられます。
        </p>

        <WhyNowBox
          tags={[
            "マーケティング",
            "購買意図",
            "集計と比較",
            "一括評価",
            "次の行動",
          ]}
        >
          <p>
            反応の分析は「読んで分類して集計する」作業で、人手だと母数が増えるほど遅れます。Jev
            なら分類が確率で返るので、 集計はただの足し算になり、キャンペーン A
            と B
            の比較を当日中に出せます。個別の反応には確信度が付くので、担当者は迷った分だけ読めば済みます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 前提 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">0. 前提</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP 18 の jev-apps プロジェクトに追加し、実際に Jev
              を呼びます。作るファイルは
              lib/reactions.ts、app/api/reactions/analyze/route.ts、app/reactions/page.tsx
              の 3 つです。 配列 state の一括評価（サンプルアプリ
              3）を、集計まで伸ばした形です。
            </p>
            <InfoBox
              type="warning"
              title="送る前に個人を特定できる情報を落とす"
            >
              SNS
              の投稿や問い合わせには、アカウント名・メールアドレス・電話番号が含まれます。分析に要るのは文面とキャンペーンの識別子だけなので、それ以外は
              state に入れる前に落とします。
              集計結果は個人に紐づけず、個別対応の判断は自社のデータベース側で本人と結びつけます。
            </InfoBox>
          </section>

          {/* 設計 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Megaphone className="text-primary" size={28} />
              1. 判定の設計と質問の組み立て
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      質問名
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      型
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      何を判定するか
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      使い道
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      intent
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      score
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      購買意図の強さ（0 無し 〜 3 今すぐ買いたい）
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      個別: 連絡の優先順。集計: キャンペーン別の平均
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      stage
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      choice
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      認知 / 比較検討 / 決定 / 既存顧客
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      集計: どの段階の人を動かしたか
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      attitude
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      choice
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      好意的 / 中立 / 否定的
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      集計: 否定的な反応の割合。個別: 否定的なら営業ではなく CS
                      へ
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      contactToday
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      noul
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      担当者が今日中に連絡すべきか
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      個別: 今日のリスト
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CodeBlock
              language="ts"
              title="lib/reactions.ts"
              code={`import { choice, noul, score, type ChoiceQuestion, type NoulQuestion, type ScoreQuestion } from "@typesafe-ai/sdk";

export interface Reaction {
  id: string;
  campaign: string;   // 例: "spring-sale", "webinar-0912"
  channel: "inquiry" | "sns" | "survey";
  text: string;       // 個人を特定できる情報は落としてから入れる
}

export const INTENT = ["No purchase intent", "Curious", "Comparing options", "Ready to buy now"] as const;
export type Stage = "awareness" | "consideration" | "decision" | "existing_customer";
export type Attitude = "positive" | "neutral" | "negative";

export function buildQuestions(items: Reaction[]) {
  const q: Record<string, ScoreQuestion<typeof INTENT> | ChoiceQuestion | NoulQuestion> = {};
  for (const r of items) {
    q[\`i_\${r.id}\`] = score({ task: "Rate purchase intent", reaction_id: r.id }, INTENT);
    q[\`s_\${r.id}\`] = choice({ task: "Which stage is this person at?", reaction_id: r.id }, {
      awareness: "Just learned about the product",
      consideration: "Comparing with alternatives or asking about details",
      decision: "Asking about price, contract, or how to start",
      existing_customer: "Already uses the product",
    });
    q[\`a_\${r.id}\`] = choice({ task: "Attitude toward the brand", reaction_id: r.id }, {
      positive: null,
      neutral: null,
      negative: null,
    });
    q[\`c_\${r.id}\`] = noul({ task: "Should a sales or support person contact this person today?", reaction_id: r.id });
  }
  return q;
}

export interface Analyzed extends Reaction {
  intent: number;          // 0〜3 の期待値
  stage: Stage;
  attitude: Attitude;
  contactToday: number;    // 0〜1
}

// 集計: キャンペーン別に、平均購買意図・決定段階の割合・否定的な割合
export function summarize(rows: Analyzed[]) {
  const byCampaign = new Map<string, Analyzed[]>();
  for (const r of rows) byCampaign.set(r.campaign, [...(byCampaign.get(r.campaign) ?? []), r]);
  return [...byCampaign].map(([campaign, rs]) => ({
    campaign,
    count: rs.length,
    avgIntent: rs.reduce((a, r) => a + r.intent, 0) / rs.length,
    decisionRate: rs.filter((r) => r.stage === "decision").length / rs.length,
    negativeRate: rs.filter((r) => r.attitude === "negative").length / rs.length,
  }));
}`}
            />
          </section>

          {/* Route Handler */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Server className="text-primary" size={28} />
              2. Route Handler — 一括評価して、個別と集計の両方を返す
            </h2>
            <CodeBlock
              language="ts"
              title="app/api/reactions/analyze/route.ts"
              code={`import { TypeSafeClient } from "@typesafe-ai/sdk";
import { buildQuestions, summarize, type Analyzed, type Attitude, type Reaction, type Stage } from "@/lib/reactions";

const client = new TypeSafeClient();

export async function POST(req: Request) {
  const { items } = (await req.json()) as { items: Reaction[] };
  if (items.length === 0) return Response.json({ rows: [], summary: [] });

  const { answers, usage } = await client.systemOne({
    state: items.map((r) => ({ reaction_id: r.id, campaign: r.campaign, channel: r.channel, text: r.text })),
    questions: buildQuestions(items),
  });

  const rows: Analyzed[] = items.map((r) => {
    const i = answers[\`i_\${r.id}\`];
    const s = answers[\`s_\${r.id}\`];
    const a = answers[\`a_\${r.id}\`];
    const c = answers[\`c_\${r.id}\`];
    if (i.type !== "score" || s.type !== "choice" || a.type !== "choice" || c.type !== "noul") {
      throw new Error("unexpected answer type");
    }
    return { ...r, intent: i.score, stage: s.choice as Stage, attitude: a.choice as Attitude, contactToday: c.noul };
  });

  rows.sort((x, y) => y.intent - x.intent);
  console.info("reactions analyzed", { count: items.length, input_tokens: usage.input_tokens });
  return Response.json({ rows, summary: summarize(rows) });
}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              1 リクエストで 1 件あたり 4 問なので、20 件なら 80
              問です。usage.input_tokens を見ながら、1
              回に入れる件数を決めます。
              キャンペーン期間中に毎時回すなら、その時間に届いた分をまとめるのが自然です。
            </p>
          </section>

          {/* 実行 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              3. 実行して確認する
            </h2>
            <CodeBlock
              language="bash"
              title="2 つのキャンペーンの反応をまとめて評価する（文面は架空）"
              code={`curl -sS http://localhost:3000/api/reactions/analyze \\
  -H "Content-Type: application/json" \\
  -d '{"items":[
    {"id":"r1","campaign":"spring-sale","channel":"inquiry","text":"法人プランの見積もりをお願いします。来月から使いたいです"},
    {"id":"r2","campaign":"spring-sale","channel":"sns","text":"セールやってるけど他社の方が安い気がする"},
    {"id":"r3","campaign":"webinar-0912","channel":"survey","text":"説明が分かりやすかった。無料プランで試してみます"},
    {"id":"r4","campaign":"webinar-0912","channel":"sns","text":"また値上げ？もう解約しようかな"}
  ]}'`}
            />
            <CodeBlock
              language="json"
              title="返ってくる形（数値は呼ぶたびに変わり得る）"
              code={`{
  "rows": [
    {"id":"r1","campaign":"spring-sale","intent":2.8,"stage":"decision","attitude":"positive","contactToday":0.9, ...},
    ...
  ],
  "summary": [
    {"campaign":"spring-sale","count":2,"avgIntent":1.7,"decisionRate":0.5,"negativeRate":0.5},
    {"campaign":"webinar-0912","count":2,"avgIntent":1.0,"decisionRate":0,"negativeRate":0.5}
  ]
}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              r4 のように否定的で既存顧客らしい反応は、購買意図が低くても
              contactToday が高く出ることがあります。営業ではなく CS
              が連絡する対象です。
              「連絡すべきか」と「誰が連絡するか」を別の質問に分けている理由がここにあります。
            </p>
          </section>

          {/* UI */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <BarChart3 className="text-primary" size={28} />
              4. 集計表と今日の連絡リスト
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              上にキャンペーン別の集計表、下に「今日連絡する人」のリストを出す画面です。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                http://localhost:3000/reactions
              </code>{" "}
              で開きます。入力は本来 CRM や SNS
              の取得ツールから来ますが、ここでは固定の 4 件を送ります。
            </p>
            <CodeBlock
              language="tsx"
              title="app/reactions/page.tsx"
              code={`"use client";

import { useState } from "react";
import type { Analyzed, Reaction } from "@/lib/reactions";

const SAMPLE: Reaction[] = [
  { id: "r1", campaign: "spring-sale", channel: "inquiry", text: "法人プランの見積もりをお願いします。来月から使いたいです" },
  { id: "r2", campaign: "spring-sale", channel: "sns", text: "セールやってるけど他社の方が安い気がする" },
  { id: "r3", campaign: "webinar-0912", channel: "survey", text: "説明が分かりやすかった。無料プランで試してみます" },
  { id: "r4", campaign: "webinar-0912", channel: "sns", text: "また値上げ？もう解約しようかな" },
];
type Summary = { campaign: string; count: number; avgIntent: number; decisionRate: number; negativeRate: number };
const STAGE = { awareness: "認知", consideration: "比較検討", decision: "決定", existing_customer: "既存顧客" };
const ATTITUDE = { positive: "好意的", neutral: "中立", negative: "否定的" };

export default function ReactionsPage() {
  const [rows, setRows] = useState<Analyzed[]>([]);
  const [summary, setSummary] = useState<Summary[]>([]);

  async function analyze() {
    const res = await fetch("/api/reactions/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: SAMPLE }),
    });
    const data = (await res.json()) as { rows: Analyzed[]; summary: Summary[] };
    setRows(data.rows);
    setSummary(data.summary);
  }

  const today = rows.filter((r) => r.contactToday >= 0.5);

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>マーケティングの反応分析</h1>
      <button onClick={analyze}>4 件を分析する</button>

      <h2>キャンペーン別の集計</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr><th>キャンペーン</th><th>件数</th><th>平均購買意図（0〜3）</th><th>決定段階の割合</th><th>否定的な割合</th></tr>
        </thead>
        <tbody>
          {summary.map((s) => (
            <tr key={s.campaign}>
              <td style={{ padding: 6 }}>{s.campaign}</td>
              <td style={{ padding: 6 }}>{s.count}</td>
              <td style={{ padding: 6 }}>{s.avgIntent.toFixed(1)}</td>
              <td style={{ padding: 6 }}>{Math.round(s.decisionRate * 100)}%</td>
              <td style={{ padding: 6 }}>{Math.round(s.negativeRate * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>今日連絡する（{today.length} 件）</h2>
      {today.map((r) => (
        <article key={r.id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 8, marginBottom: 8 }}>
          <div>{r.text}</div>
          <div style={{ fontSize: 12, color: "#555" }}>
            {r.attitude === "negative" ? "担当: CS" : "担当: 営業"} / {STAGE[r.stage]} / {ATTITUDE[r.attitude]} / 購買意図 {r.intent.toFixed(1)}
          </div>
        </article>
      ))}
    </main>
  );
}`}
            />
            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              ブラウザ内シミュレーション: 集計だけを試す
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              教材のプレビューは Jev
              を呼べないので、サーバーが返す形の固定データで{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                summarize()
              </code>{" "}
              の集計だけを確認します。___ を埋めてください。
            </p>
            <CodingChallenge
              title="シミュレーション: キャンペーン別に集計する"
              description="summarize() の ___ を埋めて、決定段階（stage が 'decision'）の割合と、否定的（attitude が 'negative'）の割合を出してください。"
              preview={true}
              initialCode={`// /api/reactions/analyze の rows と同じ形の固定データ（シミュレーション用。文面は架空）
const rows = [
  { id: "r1", campaign: "spring-sale", intent: 2.8, stage: "decision", attitude: "positive", contactToday: 0.9 },
  { id: "r2", campaign: "spring-sale", intent: 1.2, stage: "consideration", attitude: "negative", contactToday: 0.3 },
  { id: "r3", campaign: "webinar-0912", intent: 1.6, stage: "consideration", attitude: "positive", contactToday: 0.4 },
  { id: "r4", campaign: "webinar-0912", intent: 0.3, stage: "existing_customer", attitude: "negative", contactToday: 0.8 },
  { id: "r5", campaign: "webinar-0912", intent: 2.5, stage: "decision", attitude: "positive", contactToday: 0.9 },
];

function summarize(rows) {
  const byCampaign = new Map();
  for (const r of rows) byCampaign.set(r.campaign, [...(byCampaign.get(r.campaign) ?? []), r]);
  return [...byCampaign].map(([campaign, rs]) => ({
    campaign,
    count: rs.length,
    avgIntent: rs.reduce((a, r) => a + r.intent, 0) / rs.length,
    decisionRate: rs.filter((r) => r.stage === ___).length / rs.length,
    negativeRate: rs.filter((r) => r.attitude === ___).length / rs.length,
  }));
}

function App() {
  const summary = summarize(rows);
  return (
    <table style={{ fontFamily: "sans-serif", borderCollapse: "collapse" }}>
      <thead>
        <tr><th>キャンペーン</th><th>件数</th><th>平均購買意図</th><th>決定段階</th><th>否定的</th></tr>
      </thead>
      <tbody>
        {summary.map((s) => (
          <tr key={s.campaign}>
            <td style={{ padding: 6 }}>{s.campaign}</td>
            <td style={{ padding: 6 }}>{s.count}</td>
            <td style={{ padding: 6 }}>{s.avgIntent.toFixed(1)}</td>
            <td style={{ padding: 6 }}>{Math.round(s.decisionRate * 100)}%</td>
            <td style={{ padding: 6 }}>{Math.round(s.negativeRate * 100)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`}
              answer={`// /api/reactions/analyze の rows と同じ形の固定データ（シミュレーション用。文面は架空）
const rows = [
  { id: "r1", campaign: "spring-sale", intent: 2.8, stage: "decision", attitude: "positive", contactToday: 0.9 },
  { id: "r2", campaign: "spring-sale", intent: 1.2, stage: "consideration", attitude: "negative", contactToday: 0.3 },
  { id: "r3", campaign: "webinar-0912", intent: 1.6, stage: "consideration", attitude: "positive", contactToday: 0.4 },
  { id: "r4", campaign: "webinar-0912", intent: 0.3, stage: "existing_customer", attitude: "negative", contactToday: 0.8 },
  { id: "r5", campaign: "webinar-0912", intent: 2.5, stage: "decision", attitude: "positive", contactToday: 0.9 },
];

function summarize(rows) {
  const byCampaign = new Map();
  for (const r of rows) byCampaign.set(r.campaign, [...(byCampaign.get(r.campaign) ?? []), r]);
  return [...byCampaign].map(([campaign, rs]) => ({
    campaign,
    count: rs.length,
    avgIntent: rs.reduce((a, r) => a + r.intent, 0) / rs.length,
    decisionRate: rs.filter((r) => r.stage === "decision").length / rs.length,
    negativeRate: rs.filter((r) => r.attitude === "negative").length / rs.length,
  }));
}

function App() {
  const summary = summarize(rows);
  return (
    <table style={{ fontFamily: "sans-serif", borderCollapse: "collapse" }}>
      <thead>
        <tr><th>キャンペーン</th><th>件数</th><th>平均購買意図</th><th>決定段階</th><th>否定的</th></tr>
      </thead>
      <tbody>
        {summary.map((s) => (
          <tr key={s.campaign}>
            <td style={{ padding: 6 }}>{s.campaign}</td>
            <td style={{ padding: 6 }}>{s.count}</td>
            <td style={{ padding: 6 }}>{s.avgIntent.toFixed(1)}</td>
            <td style={{ padding: 6 }}>{Math.round(s.decisionRate * 100)}%</td>
            <td style={{ padding: 6 }}>{Math.round(s.negativeRate * 100)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`}
              hints={[
                '決定段階は stage が "decision" の行です',
                '否定的は attitude が "negative" の行です',
              ]}
              keywords={['"decision"', '"negative"']}
            />
            <InfoBox type="info" title="平均を鵜呑みにしない">
              avgIntent は score の期待値の平均で、件数が少ないうちは 1
              件で大きく動きます。集計表には件数を必ず並べ、比較は同じ規模のキャンペーン同士で行います。
              「なぜ否定的なのか」は Jev
              では分かりません。否定的な反応の文面を人が読むか、LLM
              に要約させる別工程が要ります。
            </InfoBox>
          </section>

          {/* 運用 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              5. 運用で足すもの
            </h2>
            <div className="space-y-3">
              {[
                {
                  title: "成約との突き合わせ",
                  body: "「決定段階」と判定した人が実際に契約したかを後から記録する。これが intent と stage の質問文を直す材料であり、STEP 23 のしきい値決めのラベルになる。",
                },
                {
                  title: "キャンペーンごとの criteria を変えない",
                  body: "比較のために、同じ期間は同じ質問文で評価する。質問文を変えたら、過去分も再評価してから比べる。",
                },
                {
                  title: "取り込みの自動化",
                  body: "CRM・SNS 取得ツール・アンケートの書き出しから、個人情報を落とす前処理を通して毎時まとめて送る。",
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
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="「今日連絡すべきか」と「検討段階」を別の質問に分けている理由は？"
              options={[
                { label: "質問が多いほど精度が上がるから" },
                {
                  label:
                    "否定的な既存顧客のように、購買意図が低くても連絡すべき人がいるから",
                  correct: true,
                },
                { label: "noul の方が安いから" },
                { label: "集計表の列を増やすため" },
              ]}
              explanation="連絡の要否は購買意図だけでは決まりません。1 質問 1 判断に分けると、営業向けと CS 向けを別々に取り出せます（STEP 16 の原則）。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs — score",
                  url: "https://docs.typesafe.ai/primitives/score",
                  description: "期待値スコアの解釈。平均を取るときの注意。",
                },
                {
                  title: "@typesafe-ai/sdk（npm）",
                  url: "https://www.npmjs.com/package/@typesafe-ai/sdk",
                  description:
                    "配列 state と JSON の instructions が受け付けられることは型定義で確認できる。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-leads-app" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
