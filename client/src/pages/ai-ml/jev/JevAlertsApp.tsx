import { Siren, Server, ArrowDownWideNarrow } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * サンプルアプリ 3: アラートの優先度付け
 * STEP 20: Jev セクション
 * - 配列 state で複数件を 1 リクエストで評価する
 * - 質問を動的に組み立てる（TypeScript の型の扱い）
 * - score の期待値で並べ替えるダッシュボード
 */

export default function JevAlertsApp() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 20</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          サンプルアプリ 3: アラートの優先度付け
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          監視システムから届くアラートを、1 リクエストでまとめて Jev
          に評価させ、緊急度の期待値で並べた一覧を作ります。 前の 2
          本と違うのは、state
          が配列になり、質問をコードで動的に組み立てる点です。
        </p>

        <WhyNowBox
          tags={[
            "一括評価",
            "配列 state",
            "動的な質問",
            "score",
            "ダッシュボード",
          ]}
        >
          <p>
            アラートは 1
            件ずつ届きますが、優先順位は「他と比べて」決まります。まとめて評価すると往復が
            1 回で済み、 score
            の期待値は連続値なので、そのまま並べ替えのキーになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 前提 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">0. 前提</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP 18 の jev-apps プロジェクトに追加します。実際に Jev
              を呼びます。作るファイルは
              lib/alerts.ts、app/api/alerts/rank/route.ts、app/alerts/page.tsx
              の 3 つです。 1 リクエストで複数件を評価するので、STEP 13
              で付けた予算上限が効いていることを確認してから進めてください。
            </p>
          </section>

          {/* 設計 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Siren className="text-primary" size={28} />
              1. state を配列にし、質問を件数ぶん作る
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              API の state
              は配列を受け付けます。各要素に番号を付け、質問名にも同じ番号を含めれば、答えと元のアラートを突き合わせられます。
              質問は 1 件につき「緊急度（score）」と「種類（choice）」の 2
              つです。
            </p>
            <CodeBlock
              language="ts"
              title="lib/alerts.ts"
              code={`import { choice, score, type ChoiceQuestion, type ScoreQuestion } from "@typesafe-ai/sdk";

export interface Alert {
  id: string;
  source: string;   // 例: "api-gateway", "payments-worker"
  message: string;
  count: number;    // 直近 10 分の発生回数
}

export const URGENCY = ["Informational", "Investigate today", "Act now"] as const;
export type Kind = "outage" | "degradation" | "security" | "noise";

// 質問名は "u_<id>" / "k_<id>"。答えを id で引けるようにする
export function buildQuestions(alerts: Alert[]) {
  const questions: Record<string, ScoreQuestion<typeof URGENCY> | ChoiceQuestion> = {};
  for (const a of alerts) {
    questions[\`u_\${a.id}\`] = score(
      { task: "Rate the urgency of this alert", alert_id: a.id },
      URGENCY,
    );
    questions[\`k_\${a.id}\`] = choice(
      { task: "Classify this alert", alert_id: a.id },
      {
        outage: "Users cannot use a core feature",
        degradation: "Slower or partially failing",
        security: "Possible unauthorized access",
        noise: "Expected or already known; no action",
      },
    );
  }
  return questions;
}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              instructions に JSON オブジェクトを渡しています。型定義では
              instructions は文字列でも JSON でもよく、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                alert_id
              </code>{" "}
              を入れることで「配列のどの要素についての質問か」を明示しています。
            </p>
            <InfoBox type="info" title="動的に組むと型の推論は弱くなる">
              質問をリテラルで書くと answers
              の型は質問ごとに推論されますが、Record で組むと各答えは「score か
              choice のどちらか」になります。 答えを読むときは{" "}
              <code className="text-sm bg-muted px-1 rounded">
                answer.type === "score"
              </code>{" "}
              で絞ります。件数が固定なら、リテラルで書いた方が型は強くなります。
            </InfoBox>
          </section>

          {/* サーバー */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Server className="text-primary" size={28} />
              2. Route Handler — 一括評価して並べる
            </h2>
            <CodeBlock
              language="ts"
              title="app/api/alerts/rank/route.ts"
              code={`import { TypeSafeClient } from "@typesafe-ai/sdk";
import { buildQuestions, type Alert, type Kind } from "@/lib/alerts";

const client = new TypeSafeClient();

export interface RankedAlert extends Alert {
  urgency: number;     // score の期待値 0〜2
  kind: Kind;
  kindConfidence: number;
}

export async function POST(req: Request) {
  const { alerts } = (await req.json()) as { alerts: Alert[] };
  if (alerts.length === 0) return Response.json({ ranked: [] });

  const { answers, usage } = await client.systemOne({
    state: alerts.map((a) => ({ alert_id: a.id, source: a.source, message: a.message, count: a.count })),
    questions: buildQuestions(alerts),
  });

  const ranked: RankedAlert[] = alerts.map((a) => {
    const u = answers[\`u_\${a.id}\`];
    const k = answers[\`k_\${a.id}\`];
    if (u.type !== "score" || k.type !== "choice") throw new Error("unexpected answer type");
    return {
      ...a,
      urgency: u.score,
      kind: k.choice as Kind,
      kindConfidence: k.confidence,
    };
  });

  ranked.sort((x, y) => y.urgency - x.urgency);
  console.info("alerts ranked", { count: alerts.length, input_tokens: usage.input_tokens });
  return Response.json({ ranked });
}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              usage の input_tokens
              をログに残しています。件数を増やすとここが伸びるので、1
              リクエストに入れる件数の目安はこの値で決めます。
              上限は手元で確認できた SDK
              とスキーマに記載が無いため、大きなバッチは自分で分割します。
            </p>
          </section>

          {/* 実行して確認 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              3. 実行して確認する
            </h2>
            <CodeBlock
              language="bash"
              title="4 件をまとめて評価する"
              code={`curl -sS http://localhost:3000/api/alerts/rank \
  -H "Content-Type: application/json" \
  -d '{"alerts":[
    {"id":"a1","source":"api-gateway","message":"5xx rate 12% (threshold 2%)","count":40},
    {"id":"a2","source":"cron","message":"nightly report finished 3 min late","count":1},
    {"id":"a3","source":"payments-worker","message":"queue lag over 4 min on 3 workers","count":3},
    {"id":"a4","source":"auth","message":"50 failed logins from one IP in 2 min","count":50}
  ]}'`}
            />
            <CodeBlock
              language="json"
              title="返ってくる形（urgency の降順。数値は呼ぶたびに変わり得る）"
              code={`{"ranked":[
  {"id":"a1","source":"api-gateway","message":"5xx rate 12% (threshold 2%)","count":40,"urgency":1.9,"kind":"outage","kindConfidence":0.9},
  {"id":"a3", ...},
  {"id":"a4", ...},
  {"id":"a2","source":"cron", ... ,"urgency":0.2,"kind":"noise","kindConfidence":0.9}
]}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              サーバーのログに出る input_tokens を見てください。件数を 4 → 20
              に増やして、トークン数がどう伸びるかを一度測っておくと、バッチの単位を決める根拠になります。
            </p>
          </section>

          {/* UI */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <ArrowDownWideNarrow className="text-primary" size={28} />
              4. 並べ替えたダッシュボード
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              アラートの一覧を送って、並べ替えられた結果を表にするページです。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                http://localhost:3000/alerts
              </code>{" "}
              で開きます。
              入力は本来監視システムから来ますが、ここではボタンで固定の 4
              件を送ります。
            </p>
            <CodeBlock
              language="tsx"
              title="app/alerts/page.tsx"
              code={`"use client";

import { useState } from "react";
import type { Alert } from "@/lib/alerts";
import type { RankedAlert } from "@/app/api/alerts/rank/route";

const SAMPLE: Alert[] = [
  { id: "a1", source: "api-gateway", message: "5xx rate 12% (threshold 2%)", count: 40 },
  { id: "a2", source: "cron", message: "nightly report finished 3 min late", count: 1 },
  { id: "a3", source: "payments-worker", message: "queue lag over 4 min on 3 workers", count: 3 },
  { id: "a4", source: "auth", message: "50 failed logins from one IP in 2 min", count: 50 },
];
const LEVEL = ["情報", "今日中に調査", "今すぐ対応"];

export default function AlertsPage() {
  const [ranked, setRanked] = useState<RankedAlert[]>([]);
  const [loading, setLoading] = useState(false);

  async function rank() {
    setLoading(true);
    const res = await fetch("/api/alerts/rank", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alerts: SAMPLE }),
    });
    const data = (await res.json()) as { ranked: RankedAlert[] };
    setRanked(data.ranked);
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>アラートの優先度付け</h1>
      <button onClick={rank} disabled={loading}>{loading ? "評価中…" : "4 件を評価して並べる"}</button>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: 16 }}>
        <thead>
          <tr><th>緊急度</th><th>種類</th><th>発生元</th><th>内容</th></tr>
        </thead>
        <tbody>
          {ranked.map((a) => (
            <tr key={a.id} style={{ opacity: a.kind === "noise" ? 0.5 : 1 }}>
              <td style={{ padding: 6 }}>{LEVEL[Math.round(a.urgency)]}（{a.urgency.toFixed(1)}）</td>
              <td style={{ padding: 6 }}>{a.kind}（{Math.round(a.kindConfidence * 100)}%）</td>
              <td style={{ padding: 6 }}>{a.source}</td>
              <td style={{ padding: 6 }}>{a.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}`}
            />
            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              ブラウザ内シミュレーション: 並べ替えだけを試す
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              教材のプレビューは Jev
              を呼べないので、サーバーが返す形の固定データで並べ替えだけを確認します。___
              を埋めてください。
            </p>
            <CodingChallenge
              title="シミュレーション: 期待値スコアで降順に並べる"
              description="sort の比較関数の ___ を埋めて、urgency が高いアラートが先頭に来るようにしてください。"
              preview={true}
              initialCode={`// /api/alerts/rank が返すのと同じ形の固定データ（シミュレーション用。並び順は未整列）
const ranked = [
  { id: "a1", source: "api-gateway", message: "5xx rate 12% (threshold 2%)", count: 40, urgency: 1.9, kind: "outage", kindConfidence: 0.93 },
  { id: "a2", source: "cron", message: "nightly report finished 3 min late", count: 1, urgency: 0.2, kind: "noise", kindConfidence: 0.88 },
  { id: "a3", source: "payments-worker", message: "queue lag over 4 min on 3 workers", count: 3, urgency: 1.6, kind: "degradation", kindConfidence: 0.74 },
  { id: "a4", source: "auth", message: "50 failed logins from one IP in 2 min", count: 50, urgency: 1.4, kind: "security", kindConfidence: 0.81 },
];

const LEVEL = ["情報", "今日中に調査", "今すぐ対応"];

function App() {
  const sorted = [...ranked].sort((x, y) => y.___ - x.urgency);
  return (
    <table style={{ fontFamily: "sans-serif", borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr><th>緊急度</th><th>種類</th><th>発生元</th><th>内容</th></tr>
      </thead>
      <tbody>
        {sorted.map((a) => (
          <tr key={a.id} style={{ opacity: a.kind === "noise" ? 0.5 : 1 }}>
            <td style={{ padding: 6 }}>{LEVEL[Math.round(a.urgency)]}（{a.urgency.toFixed(1)}）</td>
            <td style={{ padding: 6 }}>{a.kind}（{Math.round(a.kindConfidence * 100)}%）</td>
            <td style={{ padding: 6 }}>{a.source}</td>
            <td style={{ padding: 6 }}>{a.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`}
              answer={`// /api/alerts/rank が返すのと同じ形の固定データ（シミュレーション用。並び順は未整列）
const ranked = [
  { id: "a1", source: "api-gateway", message: "5xx rate 12% (threshold 2%)", count: 40, urgency: 1.9, kind: "outage", kindConfidence: 0.93 },
  { id: "a2", source: "cron", message: "nightly report finished 3 min late", count: 1, urgency: 0.2, kind: "noise", kindConfidence: 0.88 },
  { id: "a3", source: "payments-worker", message: "queue lag over 4 min on 3 workers", count: 3, urgency: 1.6, kind: "degradation", kindConfidence: 0.74 },
  { id: "a4", source: "auth", message: "50 failed logins from one IP in 2 min", count: 50, urgency: 1.4, kind: "security", kindConfidence: 0.81 },
];

const LEVEL = ["情報", "今日中に調査", "今すぐ対応"];

function App() {
  const sorted = [...ranked].sort((x, y) => y.urgency - x.urgency);
  return (
    <table style={{ fontFamily: "sans-serif", borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr><th>緊急度</th><th>種類</th><th>発生元</th><th>内容</th></tr>
      </thead>
      <tbody>
        {sorted.map((a) => (
          <tr key={a.id} style={{ opacity: a.kind === "noise" ? 0.5 : 1 }}>
            <td style={{ padding: 6 }}>{LEVEL[Math.round(a.urgency)]}（{a.urgency.toFixed(1)}）</td>
            <td style={{ padding: 6 }}>{a.kind}（{Math.round(a.kindConfidence * 100)}%）</td>
            <td style={{ padding: 6 }}>{a.source}</td>
            <td style={{ padding: 6 }}>{a.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`}
              hints={[
                "降順にするには、比較関数で y の urgency から x の urgency を引きます",
              ]}
              keywords={["y.urgency - x.urgency"]}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              表示ラベルは{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                Math.round
              </code>{" "}
              で段階に丸め、並べ替えは期待値のまま使っています。 STEP 15
              で扱った「用途で使い分ける」の実例です。noise
              は薄く表示するだけで消してはいません。判定を疑えるように残します。
            </p>
          </section>

          {/* 運用 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              5. 運用で足すもの
            </h2>
            <div className="space-y-3">
              {[
                {
                  title: "バッチの単位を決める",
                  body: "usage.input_tokens を見ながら、1 リクエストに入れる件数を決める。同じ時間帯に届いたものをまとめるのが自然。",
                },
                {
                  title: "過去の対応結果を state に足す",
                  body: "「このアラートは先週も noise だった」のような履歴を state に含めると、判定が安定する。入れすぎるとトークンが増えるので要約して渡す。",
                },
                {
                  title: "人の並べ替えを記録する",
                  body: "オペレーターが順番を入れ替えたら、その差分を保存する。Jev の順位と人の順位のずれが、質問文を直す材料になる。",
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
              question="複数のアラートを 1 リクエストで評価するとき、答えと元のアラートを突き合わせる方法は？"
              options={[
                { label: "答えは配列で返るので、インデックスで対応する" },
                {
                  label: "質問名にアラートの id を含め、答えを同じ名前で引く",
                  correct: true,
                },
                { label: "モデルが id を出力してくれる" },
                { label: "1 件ずつ呼ぶしかない" },
              ]}
              explanation="答えは質問名をキーにしたオブジェクトで返ります。質問名に id を含めておけば、配列 state のどの要素についての答えかを確実に引けます。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs — score",
                  url: "https://docs.typesafe.ai/primitives/score",
                  description: "期待値スコアとルーブリックの解説。",
                },
                {
                  title: "@typesafe-ai/sdk（npm）",
                  url: "https://www.npmjs.com/package/@typesafe-ai/sdk",
                  description:
                    "state と instructions が JSON を受け付けることは型定義（EntryType）で確認できる。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-alerts-app" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
