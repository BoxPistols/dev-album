import { Server, LayoutPanelLeft, TestTube2 } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * サンプルアプリ: サポートチケットのトリアージ
 * STEP 16: Jev セクション
 * - 構成（React UI → Route Handler → Jev）
 * - サーバー側: Route Handler の実装
 * - クライアント側: 結果の表示と信頼度による分岐
 * - テスト: SDK をモックする
 */

export default function JevTriageApp() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 16</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          サンプルアプリ: サポートチケットのトリアージ
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          ここまでの内容を 1
          つの小さなアプリにまとめます。問い合わせ本文を入力すると、担当チーム・緊急度・不満度を
          Jev が判定し、
          確信度が低いものは「人が確認」として表示するアプリです。Next.js の
          Route Handler と React で組みます。
        </p>

        <WhyNowBox
          tags={["Next.js", "Route Handler", "React", "TypeScript", "モック"]}
        >
          <p>
            型付きの答えが返る利点は、UI
            に直結させたときに一番分かります。パースも例外処理も要らず、
            <code className="text-sm bg-muted px-1 rounded">
              answers.category.choice
            </code>{" "}
            をそのまま表示に使えます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 構成 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <LayoutPanelLeft className="text-primary" size={28} />
              構成
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    label: "app/triage/page.tsx（クライアント）",
                    desc: "テキストエリアと送信ボタン。/api/triage に POST し、結果を描画する",
                  },
                  {
                    step: "2",
                    label: "app/api/triage/route.ts（サーバー）",
                    desc: "TYPESAFE_API_KEY を持ち、Jev に 3 つの質問を投げ、UI が使う形に整形して返す",
                  },
                  {
                    step: "3",
                    label: "lib/triage.ts（共有）",
                    desc: "リクエスト / レスポンスの型と、確信度から表示状態を決める純粋関数",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs font-bold">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground font-mono">
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
            <p className="text-muted-foreground mt-4 leading-relaxed">
              判定ロジック（しきい値の比較）を純粋関数に分けておくのがポイントです。API
              を呼ばずに単体テストでき、
              この教材のブラウザ内プレビューでも同じ関数を動かせます。
            </p>
          </section>

          {/* 共有の型 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              1. 共有の型と判定関数
            </h2>
            <CodeBlock
              language="ts"
              title="lib/triage.ts"
              code={`export type Team = "billing" | "technical" | "sales";

export interface TriageResult {
  team: Team;
  teamConfidence: number;   // choice の confidence
  urgent: number;           // noul: 0〜1
  frustration: number;      // score: 0〜2 の期待値
}

export type Disposition = "auto" | "review";

// 確信度が低い、または迷っている帯にあるものは人に回す
export function decide(r: TriageResult, threshold = 0.8): Disposition {
  if (r.teamConfidence < threshold) return "review";
  if (r.urgent > 0.35 && r.urgent < 0.65) return "review";
  return "auto";
}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              しきい値は引数にして外から差し替えられるようにしておきます。STEP
              17 で、実データからこの値を決める手順を扱います。
            </p>
          </section>

          {/* サーバー */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Server className="text-primary" size={28} />
              2. Route Handler
            </h2>
            <CodeBlock
              language="ts"
              title="app/api/triage/route.ts"
              code={`import { choice, noul, score, TypeSafeClient, APIConnectionError } from "@typesafe-ai/sdk";
import type { TriageResult } from "@/lib/triage";

// モジュールスコープで 1 つ作る。リクエストごとに new しない
const client = new TypeSafeClient();

export async function POST(req: Request) {
  const { subject, message } = (await req.json()) as {
    subject: string;
    message: string;
  };

  if (!message?.trim()) {
    return Response.json({ error: "message is required" }, { status: 400 });
  }

  try {
    const { answers, model } = await client.systemOne(
      {
        state: { subject, message },
        questions: {
          team: choice("Which team should handle this ticket?", {
            billing: "Charges, invoices, refunds",
            technical: "Bugs, errors, outages",
            sales: "Plans, upgrades, quotes",
          }),
          urgent: noul("Does this need attention today?"),
          frustration: score("How frustrated is the customer?", [
            "Calm",
            "Annoyed",
            "Angry",
          ]),
        },
      },
      { timeout: 5000 },
    );

    const result: TriageResult = {
      team: answers.team.choice,
      teamConfidence: answers.team.confidence,
      urgent: answers.urgent.noul,
      frustration: answers.frustration.score,
    };

    console.info("triage", { model, team: result.team });
    return Response.json(result);
  } catch (err) {
    if (err instanceof APIConnectionError) {
      // 判断が得られなかった。UI 側で「手動で振り分け」に倒す
      return Response.json({ error: "unavailable" }, { status: 503 });
    }
    throw err;
  }
}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                answers.team.choice
              </code>{" "}
              の型は
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                "billing" | "technical" | "sales"
              </code>{" "}
              に推論されるので、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                TriageResult.team
              </code>{" "}
              にそのまま代入できます。
              質問の選択肢を増やしたら、この代入で型エラーになって Team
              の更新漏れに気づけます。
            </p>
            <InfoBox type="info" title="Server Action でも同じ">
              フォーム送信なら Route Handler の代わりに Server Action
              でも書けます。どちらもサーバーで動くので API キーは漏れません。
              ここでは fetch で呼ぶ形が分かりやすいので Route Handler
              にしています。
            </InfoBox>
          </section>

          {/* クライアント */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              3. クライアント側の表示
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              結果を受け取って描画する部分です。プレビューはブラウザ内で動くので、fetch
              の代わりにサーバーが返すのと同じ形のモック応答を使っています。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                decide()
              </code>{" "}
              の ___
              を埋めて、確信度が低いときに「人が確認」と表示されるようにしてください。
            </p>
            <CodingChallenge
              title="確信度で表示を分ける"
              description="decide() の ___ を埋めて、チームの確信度が threshold 未満なら 'review' を返すようにしてください。プレビューでは 2 件のモック結果が表示されます。"
              preview={true}
              initialCode={`// サーバー（/api/triage）が返すのと同じ形のモック
const mockResults = [
  { subject: "Duplicate charge", team: "billing", teamConfidence: 0.93, urgent: 0.88, frustration: 1.7 },
  { subject: "Question about plans", team: "sales", teamConfidence: 0.52, urgent: 0.12, frustration: 0.2 },
];

function decide(r, threshold = 0.8) {
  if (r.teamConfidence < ___) return "review";
  if (r.urgent > 0.35 && r.urgent < 0.65) return "review";
  return "auto";
}

function levelLabel(score) {
  const labels = ["Calm", "Annoyed", "Angry"];
  return labels[Math.round(score)];
}

function TicketCard({ r }) {
  const disposition = decide(r);
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, marginBottom: 8 }}>
      <strong>{r.subject}</strong>
      <div>チーム: {r.team}（確信度 {Math.round(r.teamConfidence * 100)}%）</div>
      <div>緊急: {r.urgent >= 0.5 ? "はい" : "いいえ"}（{Math.round(r.urgent * 100)}%）</div>
      <div>不満度: {levelLabel(r.frustration)}（{r.frustration.toFixed(1)}）</div>
      <div style={{ marginTop: 6, fontWeight: 600 }}>
        {disposition === "auto" ? "自動で振り分け" : "人が確認"}
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {mockResults.map((r) => <TicketCard key={r.subject} r={r} />)}
    </div>
  );
}`}
              answer={`// サーバー（/api/triage）が返すのと同じ形のモック
const mockResults = [
  { subject: "Duplicate charge", team: "billing", teamConfidence: 0.93, urgent: 0.88, frustration: 1.7 },
  { subject: "Question about plans", team: "sales", teamConfidence: 0.52, urgent: 0.12, frustration: 0.2 },
];

function decide(r, threshold = 0.8) {
  if (r.teamConfidence < threshold) return "review";
  if (r.urgent > 0.35 && r.urgent < 0.65) return "review";
  return "auto";
}

function levelLabel(score) {
  const labels = ["Calm", "Annoyed", "Angry"];
  return labels[Math.round(score)];
}

function TicketCard({ r }) {
  const disposition = decide(r);
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, marginBottom: 8 }}>
      <strong>{r.subject}</strong>
      <div>チーム: {r.team}（確信度 {Math.round(r.teamConfidence * 100)}%）</div>
      <div>緊急: {r.urgent >= 0.5 ? "はい" : "いいえ"}（{Math.round(r.urgent * 100)}%）</div>
      <div>不満度: {levelLabel(r.frustration)}（{r.frustration.toFixed(1)}）</div>
      <div style={{ marginTop: 6, fontWeight: 600 }}>
        {disposition === "auto" ? "自動で振り分け" : "人が確認"}
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {mockResults.map((r) => <TicketCard key={r.subject} r={r} />)}
    </div>
  );
}`}
              hints={[
                "比較相手は引数の threshold です。確信度が threshold 未満のときにレビューへ回します",
              ]}
              keywords={["teamConfidence < threshold"]}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              実際のページでは、モック配列の代わりに{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                fetch("/api/triage", {"{"} method: "POST", … {"}"})
              </code>{" "}
              の結果を state に入れます。 503
              が返ったら「判断が得られなかった」表示にして、手動で振り分けられる
              UI を出します。
            </p>
            <CodeBlock
              language="tsx"
              title="app/triage/page.tsx（送信部分の抜粋）"
              code={`"use client";

import { useState } from "react";
import { decide, type TriageResult } from "@/lib/triage";

export default function TriagePage() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<TriageResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "unavailable">("idle");

  async function submit() {
    setStatus("loading");
    const res = await fetch("/api/triage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: "", message }),
    });
    if (!res.ok) {
      setStatus("unavailable");
      return;
    }
    setResult((await res.json()) as TriageResult);
    setStatus("idle");
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
      <label htmlFor="message">問い合わせ内容</label>
      <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit" disabled={status === "loading"}>判定する</button>
      {status === "unavailable" && <p role="alert">判定を取得できませんでした。手動で振り分けてください。</p>}
      {result && <p>{decide(result) === "auto" ? "自動で振り分け" : "人が確認"}: {result.team}</p>}
    </form>
  );
}`}
            />
          </section>

          {/* テスト */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <TestTube2 className="text-primary" size={28} />
              4. テスト — API を呼ばずに検証する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              判定関数は純粋関数なので、そのまま単体テストできます。Route
              Handler は SDK の
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                fetch
              </code>{" "}
              オプションで通信を差し替えられるので、
              実際のネットワークに出ずに応答の形を固定してテストできます。
            </p>
            <CodeBlock
              language="ts"
              title="lib/triage.test.ts"
              code={`import { describe, expect, it } from "vitest";
import { decide } from "./triage";

describe("decide", () => {
  it("確信度がしきい値未満なら review", () => {
    expect(decide({ team: "sales", teamConfidence: 0.52, urgent: 0.1, frustration: 0 })).toBe("review");
  });

  it("緊急度が迷いの帯（0.35〜0.65）なら review", () => {
    expect(decide({ team: "billing", teamConfidence: 0.95, urgent: 0.5, frustration: 1 })).toBe("review");
  });

  it("どちらも明確なら auto", () => {
    expect(decide({ team: "billing", teamConfidence: 0.93, urgent: 0.88, frustration: 1.7 })).toBe("auto");
  });
});`}
            />
            <CodeBlock
              language="ts"
              title="SDK の通信を差し替える（型定義の fetch オプション）"
              code={`import { TypeSafeClient, choice } from "@typesafe-ai/sdk";

const fakeFetch = async () =>
  new Response(
    JSON.stringify({
      model: "jev-latest",
      answers: {
        team: { type: "choice", choice: "billing", confidence: 0.9,
                probabilities: { billing: 0.9, technical: 0.05, sales: 0.05 } },
      },
      usage: { input_tokens: 40, output_tokens: 3 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );

const client = new TypeSafeClient({ apiKey: "test", fetch: fakeFetch });
const { answers } = await client.systemOne({
  state: "x",
  questions: { team: choice(null, { billing: null, technical: null, sales: null }) },
});
// answers.team.choice === "billing"`}
            />
          </section>

          {/* Quiz */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="このアプリで TypeSafeClient を生成する場所として適切なのは？"
              options={[
                { label: "POST 関数の中で毎回 new する" },
                {
                  label: "route.ts のモジュールスコープで 1 回だけ生成する",
                  correct: true,
                },
                { label: "page.tsx（クライアントコンポーネント）で生成する" },
                { label: "lib/triage.ts で生成してクライアントにも渡す" },
              ]}
              explanation="クライアントはモジュールスコープで 1 つ作って使い回します。ブラウザ側で生成すると SDK が拒否し、仮に許可してもキーが漏れます。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Next.js — Route Handlers",
                  url: "https://nextjs.org/docs/app/building-your-application/routing/route-handlers",
                  description:
                    "app ディレクトリでの API エンドポイントの書き方。",
                },
                {
                  title: "Next.js — Environment Variables",
                  url: "https://nextjs.org/docs/app/building-your-application/configuring/environment-variables",
                  description: ".env.local と NEXT_PUBLIC_ の扱い。",
                },
                {
                  title: "@typesafe-ai/sdk（npm）",
                  url: "https://www.npmjs.com/package/@typesafe-ai/sdk",
                  description: "クライアントオプション fetch の型定義。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-triage-app" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
