import { Wallet, Server, LayoutPanelLeft, TestTube2 } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * サンプルアプリ1: 家計簿の自動仕分け
 * STEP 18: Jevセクション
 * - 日常生活の題材。支出1件をカテゴリに仕分け、固定費かどうか、見直し候補かを判定する
 * - choice + noul + scoreを1リクエストで使う基本形
 * - Next.js Route Handler + React。実際にJevを呼ぶ
 */

export default function JevLedgerApp() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 18</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          サンプルアプリ1: 家計簿の自動仕分け
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          支出を1件入力すると、Jev
          がカテゴリ（食費・交通・住居・娯楽・医療・その他）を選び、固定費かどうかと「見直す価値があるか」を返します。
          確信が低いものだけ自分で直す、という家計簿アプリの土台です。1
          本目なので、Jevを呼ぶ最も基本的な形をNext.jsで組みます。
        </p>

        <WhyNowBox
          tags={["日常生活", "Next.js", "Route Handler", "React", "実際に呼ぶ"]}
        >
          <p>
            家計簿が続かない理由の1
            つは仕分けの手間です。仕分けは「候補が決まっていて、毎日繰り返し、迷ったものだけ自分で決めればよい」判断で、STEP
            12で見たJev向きの3条件をそのまま満たします。 LLM
            に頼むと文章で返ってきてパースが要りますが、Jev
            ならカテゴリ名と確率がそのままUIに載ります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 前提と準備 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              0. 前提と準備
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              このアプリは実際にJevを呼びます。STEP 13の疎通確認とSTEP 14
              の最初の呼び出しが済んでいることが前提です。 3
              本のサンプルアプリは1つのNext.js
              プロジェクトに順に足していくので、ここで土台を作ります。
            </p>
            <CodeBlock
              language="bash"
              title="プロジェクトを作ってSDKを入れる（Node.js 20以上）"
              code={`npx create-next-app@latest jev-apps --typescript --app --src-dir=false --import-alias "@/*"
cd jev-apps
pnpm add @typesafe-ai/sdk
pnpm add -D vitest`}
            />
            <CodeBlock
              language="bash"
              title=".env.local（リポジトリに入れない。.gitignoreに .env*.localがあることを確認）"
              code={`TYPESAFE_API_KEY=<コンソールで発行したキー>`}
            />
            <div className="rounded-xl border border-border bg-card p-5 mt-4">
              <p className="text-sm font-bold text-foreground mb-2">
                このページで作るファイル
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 font-mono">
                <li>lib/ledger.ts</li>
                <li>app/api/ledger/route.ts</li>
                <li>app/ledger/page.tsx</li>
                <li>lib/ledger.test.ts</li>
              </ul>
            </div>
          </section>

          {/* 型 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Wallet className="text-primary" size={28} />
              1. 共有の型と判定関数
            </h2>
            <CodeBlock
              language="ts"
              title="lib/ledger.ts"
              code={`export type Category = "food" | "transport" | "housing" | "leisure" | "health" | "other";

export const CATEGORY_LABEL: Record<Category, string> = {
  food: "食費",
  transport: "交通",
  housing: "住居・光熱",
  leisure: "娯楽",
  health: "医療・健康",
  other: "その他",
};

export interface LedgerResult {
  category: Category;
  categoryConfidence: number; // choiceのconfidence
  fixedCost: number;          // noul: 固定費である確率0〜1
  reviewWorth: number;        // score: 見直す価値0〜2の期待値
}

export type Disposition = "auto" | "confirm";

// 確信が低いものだけ本人に確認してもらう
export function decide(r: LedgerResult, threshold = 0.8): Disposition {
  return r.categoryConfidence >= threshold ? "auto" : "confirm";
}`}
            />
          </section>

          {/* Route Handler */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Server className="text-primary" size={28} />
              2. Route Handler — Jevを呼ぶ
            </h2>
            <CodeBlock
              language="ts"
              title="app/api/ledger/route.ts"
              code={`import { choice, noul, score, TypeSafeClient, APIConnectionError } from "@typesafe-ai/sdk";
import type { LedgerResult } from "@/lib/ledger";

// モジュールスコープで1つ作る。リクエストごとにnewしない
const client = new TypeSafeClient();

export async function POST(req: Request) {
  const { merchant, amount, memo, date } = (await req.json()) as {
    merchant: string;
    amount: number;
    memo?: string;
    date?: string;
  };

  if (!merchant?.trim() || !Number.isFinite(amount)) {
    return Response.json({ error: "merchant and amount are required" }, { status: 400 });
  }

  try {
    const { answers, model } = await client.systemOne(
      {
        state: { merchant, amount_jpy: amount, memo: memo ?? "", date: date ?? "" },
        questions: {
          category: choice("Which household budget category does this expense belong to?", {
            food: "Groceries, restaurants, cafes, convenience stores",
            transport: "Trains, buses, taxis, fuel, parking",
            housing: "Rent, utilities, internet, home supplies",
            leisure: "Entertainment, hobbies, subscriptions for fun, travel",
            health: "Pharmacy, clinics, gym, insurance",
            other: "Anything that does not fit the categories above",
          }),
          fixedCost: noul("Is this a recurring fixed cost (same amount every month)?"),
          reviewWorth: score("Is this expense worth reviewing to reduce spending?", [
            "Nothing to review",
            "Worth a look",
            "Likely unnecessary or overpriced",
          ]),
        },
      },
      { timeout: 5000 },
    );

    const result: LedgerResult = {
      category: answers.category.choice,
      categoryConfidence: answers.category.confidence,
      fixedCost: answers.fixedCost.noul,
      reviewWorth: answers.reviewWorth.score,
    };

    console.info("ledger", { model, category: result.category });
    return Response.json(result);
  } catch (err) {
    if (err instanceof APIConnectionError) {
      // 判断が得られなかった。UI側で「自分で選ぶ」に倒す
      return Response.json({ error: "unavailable" }, { status: 503 });
    }
    throw err;
  }
}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                answers.category.choice
              </code>{" "}
              の型はcriteriaのキーから
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                "food" | "transport" | …
              </code>{" "}
              に推論されるので、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                LedgerResult.category
              </code>{" "}
              にそのまま代入できます。
              カテゴリを増やしたら、この代入で型エラーになってCategory
              の更新漏れに気づけます。
            </p>
            <InfoBox type="info" title="金額をstateに入れる意味">
              「同じ店でも500円なら食費、30,000
              円なら娯楽（会食）」のように、金額は判断材料になります。判断に使ってほしい値は
              stateに入れる、というSTEP 16の原則です。
              一方で口座番号やカード番号は判断に不要なので入れません。
            </InfoBox>
          </section>

          {/* 実行 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              3. 実行して確認する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              UIを作る前に、Route Handler単体をcurlで叩いて、本物のJev
              の答えが返ることを確かめます。
            </p>
            <CodeBlock
              language="bash"
              title="開発サーバーを起動"
              code={`pnpm dev`}
            />
            <CodeBlock
              language="bash"
              title="別のターミナルからPOSTする"
              code={`curl -sS http://localhost:3000/api/ledger \\
  -H "Content-Type: application/json" \\
  -d '{"merchant":"セブンイレブン","amount":680,"memo":"昼ごはん","date":"2026-09-19"}'`}
            />
            <CodeBlock
              language="json"
              title="返ってくる形（数値は呼ぶたびに変わり得る）"
              code={`{"category":"food","categoryConfidence":0.9,"fixedCost":0.05,"reviewWorth":0.4}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              「Netflix 1,490円」「JR東日本220円」「ドラッグストア3,200
              円」など、手元のレシートで何件か叩いてみてください。 fixedCost
              がサブスクで高く出るか、店名だけでは迷う支出でcategoryConfidence
              が下がるかを見ると、次のUIの分岐が実感できます。
            </p>
          </section>

          {/* UI */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <LayoutPanelLeft className="text-primary" size={28} />
              4. 入力フォームと結果の表示
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              店名・金額・メモを入れて送ると、Jev
              の仕分け結果が出ます。確信が低いときはカテゴリの選択肢を出して本人に確定してもらいます。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                http://localhost:3000/ledger
              </code>{" "}
              で開きます。
            </p>
            <CodeBlock
              language="tsx"
              title="app/ledger/page.tsx"
              code={`"use client";

import { useState } from "react";
import { CATEGORY_LABEL, decide, type Category, type LedgerResult } from "@/lib/ledger";

const REVIEW = ["見直し不要", "一度見てみる", "減らせるかも"];

export default function LedgerPage() {
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [result, setResult] = useState<LedgerResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "unavailable">("idle");
  const [confirmed, setConfirmed] = useState<Category | null>(null);

  async function submit() {
    setStatus("loading");
    setResult(null);
    setConfirmed(null);
    const res = await fetch("/api/ledger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ merchant, amount: Number(amount), memo }),
    });
    if (!res.ok) {
      setStatus("unavailable");
      return;
    }
    setResult((await res.json()) as LedgerResult);
    setStatus("idle");
  }

  const needsConfirm = result && decide(result) === "confirm";
  const finalCategory = confirmed ?? result?.category;

  return (
    <main style={{ maxWidth: 560, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>家計簿の自動仕分け</h1>
      <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <label htmlFor="merchant">店名</label>
        <input id="merchant" value={merchant} onChange={(e) => setMerchant(e.target.value)} style={{ display: "block", width: "100%", marginBottom: 8 }} />
        <label htmlFor="amount">金額（円）</label>
        <input id="amount" type="number" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ display: "block", width: "100%", marginBottom: 8 }} />
        <label htmlFor="memo">メモ（任意）</label>
        <input id="memo" value={memo} onChange={(e) => setMemo(e.target.value)} style={{ display: "block", width: "100%", marginBottom: 8 }} />
        <button type="submit" disabled={status === "loading" || !merchant.trim() || !amount}>
          {status === "loading" ? "仕分け中…" : "仕分ける"}
        </button>
      </form>

      {status === "unavailable" && (
        <p role="alert">仕分けを取得できませんでした。カテゴリを自分で選んでください。</p>
      )}

      {result && (
        <section style={{ marginTop: 24, border: "1px solid #ccc", borderRadius: 8, padding: 12 }}>
          <p>
            カテゴリ: <strong>{CATEGORY_LABEL[finalCategory!]}</strong>
            （確信度 {Math.round(result.categoryConfidence * 100)}%{confirmed ? "・本人が確定" : ""}）
          </p>
          <p>固定費: {result.fixedCost >= 0.5 ? "はい" : "いいえ"}（{Math.round(result.fixedCost * 100)}%）</p>
          <p>見直し: {REVIEW[Math.round(result.reviewWorth)]}（{result.reviewWorth.toFixed(1)}）</p>
          {needsConfirm && !confirmed && (
            <fieldset style={{ marginTop: 8 }}>
              <legend>迷っています。正しいカテゴリを選んでください</legend>
              {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
                <button key={c} type="button" onClick={() => setConfirmed(c)} style={{ marginRight: 6, marginTop: 6 }}>
                  {CATEGORY_LABEL[c]}
                </button>
              ))}
            </fieldset>
          )}
        </section>
      )}
    </main>
  );
}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              本人が確定した結果は、Jevの答えと一緒に保存しておきます。「Jev
              が迷った支出に本人が付けた正解」が溜まると、STEP 23
              のしきい値決めに使えます。
            </p>
            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              ブラウザ内シミュレーション: 判定ロジックだけを試す
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              この教材のプレビューは外部APIへ出られないので、ここだけはJev
              を呼びません。サーバーが返すのと同じ形の固定データで、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                decide()
              </code>{" "}
              の分岐だけを確認します。手元のアプリでは上のpage.tsx
              が本物の答えで同じ表示をします。
            </p>
            <CodingChallenge
              title="シミュレーション: 確信度で「自動」と「確認」を分ける"
              description="decide() の ___ を埋めて、カテゴリの確信度がthreshold未満なら 'confirm' を返すようにしてください。プレビューには固定データ3件が表示されます（Jevは呼びません）。"
              preview={true}
              initialCode={`// サーバー（/api/ledger）が返すのと同じ形の固定データ（シミュレーション用）
const LABEL = { food: "食費", transport: "交通", housing: "住居・光熱", leisure: "娯楽", health: "医療・健康", other: "その他" };
const results = [
  { merchant: "セブンイレブン", amount: 680, category: "food", categoryConfidence: 0.93, fixedCost: 0.05, reviewWorth: 0.4 },
  { merchant: "Netflix", amount: 1490, category: "leisure", categoryConfidence: 0.96, fixedCost: 0.97, reviewWorth: 1.2 },
  { merchant: "ドン・キホーテ", amount: 3200, category: "other", categoryConfidence: 0.48, fixedCost: 0.03, reviewWorth: 0.9 },
];

function decide(r, threshold = 0.8) {
  return r.categoryConfidence < ___ ? "confirm" : "auto";
}

function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {results.map((r) => (
        <div key={r.merchant} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <strong>{r.merchant}</strong> {r.amount}円
          <div>{LABEL[r.category]}（{Math.round(r.categoryConfidence * 100)}%）{r.fixedCost >= 0.5 ? "・固定費" : ""}</div>
          <div style={{ fontWeight: 600 }}>{decide(r) === "auto" ? "自動で仕分け" : "本人に確認"}</div>
        </div>
      ))}
    </div>
  );
}`}
              answer={`// サーバー（/api/ledger）が返すのと同じ形の固定データ（シミュレーション用）
const LABEL = { food: "食費", transport: "交通", housing: "住居・光熱", leisure: "娯楽", health: "医療・健康", other: "その他" };
const results = [
  { merchant: "セブンイレブン", amount: 680, category: "food", categoryConfidence: 0.93, fixedCost: 0.05, reviewWorth: 0.4 },
  { merchant: "Netflix", amount: 1490, category: "leisure", categoryConfidence: 0.96, fixedCost: 0.97, reviewWorth: 1.2 },
  { merchant: "ドン・キホーテ", amount: 3200, category: "other", categoryConfidence: 0.48, fixedCost: 0.03, reviewWorth: 0.9 },
];

function decide(r, threshold = 0.8) {
  return r.categoryConfidence < threshold ? "confirm" : "auto";
}

function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {results.map((r) => (
        <div key={r.merchant} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <strong>{r.merchant}</strong> {r.amount}円
          <div>{LABEL[r.category]}（{Math.round(r.categoryConfidence * 100)}%）{r.fixedCost >= 0.5 ? "・固定費" : ""}</div>
          <div style={{ fontWeight: 600 }}>{decide(r) === "auto" ? "自動で仕分け" : "本人に確認"}</div>
        </div>
      ))}
    </div>
  );
}`}
              hints={[
                "比較相手は引数のthresholdです。確信度がthreshold未満なら本人に確認します",
              ]}
              keywords={["categoryConfidence < threshold"]}
            />
          </section>

          {/* テスト */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <TestTube2 className="text-primary" size={28} />
              5. テスト — APIを呼ばずに検証する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              判定関数は純粋関数なのでそのまま単体テストできます。Route Handler
              はSDKの{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                fetch
              </code>{" "}
              オプションで通信を差し替えられるので、ネットワークに出ずに応答の形を固定してテストできます。
            </p>
            <CodeBlock
              language="ts"
              title="lib/ledger.test.ts"
              code={`import { describe, expect, it } from "vitest";
import { decide } from "./ledger";

describe("decide", () => {
  it("確信度がしきい値未満ならconfirm", () => {
    expect(decide({ category: "other", categoryConfidence: 0.48, fixedCost: 0, reviewWorth: 0 })).toBe("confirm");
  });
  it("確信度が高ければauto", () => {
    expect(decide({ category: "food", categoryConfidence: 0.93, fixedCost: 0, reviewWorth: 0 })).toBe("auto");
  });
});`}
            />
            <CodeBlock
              language="ts"
              title="SDKの通信を差し替える（型定義のfetchオプション）"
              code={`import { TypeSafeClient, choice } from "@typesafe-ai/sdk";

const fakeFetch = async () =>
  new Response(
    JSON.stringify({
      model: "jev-latest",
      answers: {
        category: { type: "choice", choice: "food", confidence: 0.9,
                    probabilities: { food: 0.9, transport: 0.02, housing: 0.02, leisure: 0.02, health: 0.02, other: 0.02 } },
      },
      usage: { input_tokens: 40, output_tokens: 3 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );

const client = new TypeSafeClient({ apiKey: "test", fetch: fakeFetch });
const { answers } = await client.systemOne({
  state: "x",
  questions: { category: choice(null, { food: null, transport: null, housing: null, leisure: null, health: null, other: null }) },
});
// answers.category.choice === "food"`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="このアプリでTypeSafeClientを生成する場所として適切なのは？"
              options={[
                { label: "POST関数の中で毎回newする" },
                {
                  label: "route.tsのモジュールスコープで1回だけ生成する",
                  correct: true,
                },
                { label: "page.tsx（クライアントコンポーネント）で生成する" },
                { label: "lib/ledger.tsで生成してクライアントにも渡す" },
              ]}
              explanation="クライアントはモジュールスコープで1つ作って使い回します。ブラウザ側で生成するとSDKが拒否し、仮に許可してもキーが漏れます。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Next.js — Route Handlers",
                  url: "https://nextjs.org/docs/app/building-your-application/routing/route-handlers",
                  description:
                    "appディレクトリでのAPIエンドポイントの書き方。",
                },
                {
                  title: "Next.js — Environment Variables",
                  url: "https://nextjs.org/docs/app/building-your-application/configuring/environment-variables",
                  description: ".env.localとNEXT_PUBLIC_ の扱い。",
                },
                {
                  title: "@typesafe-ai/sdk（npm）",
                  url: "https://www.npmjs.com/package/@typesafe-ai/sdk",
                  description: "クライアントオプションfetchの型定義。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-ledger-app" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
