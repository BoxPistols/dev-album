import { PenLine, Server, ListChecks } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * サンプルアプリ 2: UI 文言チェッカー
 * STEP 19: Jev セクション
 * - デザイナー向けの題材。ボタン・エラー・空状態の文言を、チームのライティング指針に照らして判定する
 * - 「そのまま OK / 直す / 出さない」の 3 分岐。判定に失敗したら「直す」側へ倒す
 * - 指針の本文を state で渡す（基準をモデルの常識に任せない）
 */

export default function JevCopyCheckApp() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 19</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          サンプルアプリ 2: UI 文言チェッカー
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          ボタンのラベル、エラーメッセージ、空状態の文言を入れると、チームのライティング指針に照らして
          Jev が判定します。
          「意図が伝わるか」「敬体・常体が指針と合っているか」「ネガティブな言い回しか」「総合品質」を数値で返し、
          そのまま出せるもの、直すもの、出してはいけないものに分けます。デザインシステムのレビューを支える道具です。
        </p>

        <WhyNowBox
          tags={[
            "デザイナー向け",
            "マイクロコピー",
            "3 分岐",
            "フェイルクローズ",
            "React",
          ]}
        >
          <p>
            UI
            文言のレビューは、指針を知っている人がボトルネックになりがちです。指針の本文を
            state に渡して Jev に一次判定させると、
            レビュー依頼の前に自分で直せる部分が増え、レビュアーは迷った文言だけを見ればよくなります。
            この教材自体のライティング指針（ネガティブ訴求禁止、フラットなトーン）も同じやり方で機械にかけられます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 前提 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">0. 前提</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP 18 で作った jev-apps プロジェクトに追加します。API キーは同じ
              .env.local を使い、実際に Jev を呼びます。 作るファイルは
              lib/copycheck.ts、app/api/copycheck/route.ts、app/copycheck/page.tsx
              の 3 つです。
            </p>
          </section>

          {/* 判定の設計 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <PenLine className="text-primary" size={28} />
              1. 判定の設計
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      clear
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      noul
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      読んだ人が「何が起きる / 何をすればよいか」を理解できるか
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      tone
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      choice
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      敬体 / 常体 / 混在。指針が敬体なら常体・混在は直す対象
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      negative
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      noul
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      利用者を責める・脅す・不安をあおる言い回しか
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      quality
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      score
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      指針全体に照らした総合品質（0 出せない 〜 2
                      そのまま出せる）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CodeBlock
              language="ts"
              title="lib/copycheck.ts — 型と 3 分岐"
              code={`export type Component = "button" | "error" | "empty_state" | "notification";
export type Tone = "polite" | "plain" | "mixed";

export interface CopyResult {
  clear: number;     // noul 0〜1
  tone: Tone;
  toneConfidence: number;
  negative: number;  // noul 0〜1
  quality: number;   // score 0〜2 の期待値
}

export type Verdict = "ok" | "revise" | "block";

// 指針が敬体（polite）のチームを想定。しきい値は STEP 23 の手順で決め直す
export function verdict(r: CopyResult, okAbove = 0.85, blockNegativeAbove = 0.9): Verdict {
  if (r.negative >= blockNegativeAbove) return "block";
  if (r.clear >= okAbove && r.negative < 0.1 && r.tone === "polite" && r.quality >= 1.5) return "ok";
  return "revise";
}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              「出さない（block）」は、ネガティブ訴求の確率が高いときに限っています。分かりにくいだけの文言は直せば済むので「直す」に回します。
            </p>
          </section>

          {/* Route Handler */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Server className="text-primary" size={28} />
              2. Route Handler — 指針を state で渡し、失敗したら「直す」に倒す
            </h2>
            <CodeBlock
              language="ts"
              title="app/api/copycheck/route.ts"
              code={`import { choice, noul, score, TypeSafeClient } from "@typesafe-ai/sdk";
import { verdict, type Component, type CopyResult } from "@/lib/copycheck";

const client = new TypeSafeClient();

// チームのライティング指針。変えたらここを変えるだけで判定が変わる
const GUIDELINE = [
  "Use polite Japanese (desu/masu). Never mix polite and plain forms in one screen.",
  "Buttons start with the action the user takes (e.g. 保存する, 送信する). Avoid vague labels like OK.",
  "Error messages say what happened and what to do next, in that order. Never blame the user.",
  "Empty states tell the user what will appear here and offer one next action.",
  "No fear-based or negative framing (e.g. 失敗します, 損をします). State the benefit or the fact flatly.",
];

export async function POST(req: Request) {
  const { component, copy } = (await req.json()) as { component: Component; copy: string };

  try {
    const { answers } = await client.systemOne(
      {
        state: { guideline: GUIDELINE, component, copy },
        questions: {
          clear: noul("Can a first-time user understand what happens or what to do from this copy alone?", {
            true: "The action or outcome is unambiguous",
            false: "The user would have to guess",
          }),
          tone: choice("Which register does the copy use?", {
            polite: "Polite desu/masu form throughout",
            plain: "Plain form throughout",
            mixed: "Both forms mixed",
          }),
          negative: noul("Does the copy blame, threaten, or alarm the user?"),
          quality: score("Rate the copy against the guideline", [
            "Should not ship",
            "Needs edits",
            "Ready to ship",
          ]),
        },
      },
      { timeout: 5000 },
    );

    const result: CopyResult = {
      clear: answers.clear.noul,
      tone: answers.tone.choice,
      toneConfidence: answers.tone.confidence,
      negative: answers.negative.noul,
      quality: answers.quality.score,
    };
    return Response.json({ verdict: verdict(result), ...result });
  } catch {
    // 判定が得られなかった文言を「OK」にはしない。人が見る「直す」列に置く
    return Response.json({ verdict: "revise", error: "unavailable" }, { status: 200 });
  }
}`}
            />
            <InfoBox type="warning" title="フェイルクローズにする">
              サンプルアプリ 1 では失敗を 503
              で返し、本人に選んでもらいました。ここでは失敗を「直す」として扱い、「OK」側には倒しません。
              API の障害中に未チェックの文言が OK 扱いで流れる事故を、この 1
              行で防いでいます。
            </InfoBox>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              指針の本文を state
              に入れているのがポイントです。「何が良い文言か」をモデルの常識に任せず、自分たちの基準を毎回渡します。
              指針を改訂したら、コードを変えずに GUIDELINE
              の配列を変えるだけで判定が変わります。
            </p>
          </section>

          {/* 実行 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              3. 実行して確認する
            </h2>
            <CodeBlock
              language="bash"
              title="良い文言と、直したい文言を 1 件ずつ叩く"
              code={`curl -sS http://localhost:3000/api/copycheck \\
  -H "Content-Type: application/json" \\
  -d '{"component":"error","copy":"保存できませんでした。通信状況を確認して、もう一度お試しください。"}'

curl -sS http://localhost:3000/api/copycheck \\
  -H "Content-Type: application/json" \\
  -d '{"component":"button","copy":"OK"}'`}
            />
            <CodeBlock
              language="json"
              title="返ってくる形（数値は呼ぶたびに変わり得る）"
              code={`{"verdict":"ok","clear":0.95,"tone":"polite","toneConfidence":0.9,"negative":0.02,"quality":1.8}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              「入力に誤りがあります」「今すぐ登録しないと損をします」「削除する」なども叩いてみてください。
              negative が跳ねる文言、clear が下がる文言、tone が mixed
              になる文言を自分の目で見ると、指針の文を直す材料にもなります。
            </p>
          </section>

          {/* UI */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <ListChecks className="text-primary" size={28} />
              4. チェック画面
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              コンポーネント種別と文言を入れて判定し、結果を一覧に積んでいく画面です。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                http://localhost:3000/copycheck
              </code>{" "}
              で開きます。
            </p>
            <CodeBlock
              language="tsx"
              title="app/copycheck/page.tsx"
              code={`"use client";

import { useState } from "react";
import type { Component, CopyResult, Verdict } from "@/lib/copycheck";

type Row = CopyResult & { id: string; component: Component; copy: string; verdict: Verdict };
const LABEL: Record<Verdict, string> = { ok: "そのまま出せる", revise: "直す", block: "出さない" };
const COMPONENTS: Record<Component, string> = { button: "ボタン", error: "エラー", empty_state: "空状態", notification: "通知" };

export default function CopyCheckPage() {
  const [component, setComponent] = useState<Component>("button");
  const [copy, setCopy] = useState("");
  const [rows, setRows] = useState<Row[]>([]);

  async function submit() {
    const res = await fetch("/api/copycheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ component, copy }),
    });
    const data = (await res.json()) as Omit<Row, "id" | "component" | "copy">;
    setRows((prev) => [{ ...data, id: crypto.randomUUID(), component, copy }, ...prev]);
    setCopy("");
  }

  return (
    <main style={{ maxWidth: 640, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>UI 文言チェッカー</h1>
      <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <label htmlFor="component">コンポーネント</label>
        <select id="component" value={component} onChange={(e) => setComponent(e.target.value as Component)} style={{ display: "block", marginBottom: 8 }}>
          {(Object.keys(COMPONENTS) as Component[]).map((c) => <option key={c} value={c}>{COMPONENTS[c]}</option>)}
        </select>
        <label htmlFor="copy">文言</label>
        <textarea id="copy" rows={3} value={copy} onChange={(e) => setCopy(e.target.value)} style={{ display: "block", width: "100%", marginBottom: 8 }} />
        <button type="submit" disabled={!copy.trim()}>判定する</button>
      </form>
      {rows.map((r) => (
        <div key={r.id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, marginTop: 8 }}>
          <div style={{ fontWeight: 600 }}>{LABEL[r.verdict]}<span style={{ fontWeight: 400, color: "#555" }}>（{COMPONENTS[r.component]}）</span></div>
          <div>{r.copy}</div>
          <div style={{ fontSize: 12, color: "#555" }}>
            伝わる {Math.round(r.clear * 100)}% / 文体 {r.tone} / ネガティブ {Math.round(r.negative * 100)}% / 品質 {r.quality.toFixed(1)}
          </div>
        </div>
      ))}
    </main>
  );
}`}
            />
            <InfoBox type="info" title="言い換え案は Jev の仕事ではない">
              Jev
              は「直す必要がある」と数値で言えますが、直した文言は書けません。言い換え案が欲しければ、「直す」と判定された文言だけを
              LLM に渡します。 全件を LLM に渡すより安く速く、しかも LLM
              の出力をもう一度 Jev
              に通せば「直った」ことも数値で確かめられます（STEP 23）。
            </InfoBox>
            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              ブラウザ内シミュレーション: 3 分岐だけを試す
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              教材のプレビューは Jev
              を呼べないので、サーバーの応答と同じ形の固定データで{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                verdict()
              </code>{" "}
              の分岐だけを確認します。___ を埋めてください。
            </p>
            <CodingChallenge
              title="シミュレーション: 3 分岐の判定を完成させる"
              description="verdict() の ___ を埋めて、ネガティブ確率が blockNegativeAbove 以上なら 'block'、伝わる確率が okAbove 以上で他の条件も満たせば 'ok'、それ以外を 'revise' にしてください。"
              preview={true}
              initialCode={`// /api/copycheck が返すのと同じ形の固定データ（シミュレーション用）
const results = [
  { copy: "保存できませんでした。通信状況を確認して、もう一度お試しください。", clear: 0.95, tone: "polite", negative: 0.02, quality: 1.8 },
  { copy: "OK", clear: 0.3, tone: "polite", negative: 0.01, quality: 0.6 },
  { copy: "今すぐ登録しないと損をします！", clear: 0.7, tone: "polite", negative: 0.94, quality: 0.2 },
  { copy: "入力に誤りがある。修正してください。", clear: 0.6, tone: "mixed", negative: 0.35, quality: 0.9 },
];

function verdict(r, okAbove = 0.85, blockNegativeAbove = 0.9) {
  if (r.negative >= ___) return "block";
  if (r.clear >= ___ && r.negative < 0.1 && r.tone === "polite" && r.quality >= 1.5) return "ok";
  return "revise";
}

const LABEL = { ok: "そのまま出せる", revise: "直す", block: "出さない" };

function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {results.map((r) => (
        <div key={r.copy} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <div style={{ fontWeight: 600 }}>{LABEL[verdict(r)]}</div>
          <div>{r.copy}</div>
          <div style={{ fontSize: 12, color: "#555" }}>
            伝わる {Math.round(r.clear * 100)}% / 文体 {r.tone} / ネガティブ {Math.round(r.negative * 100)}% / 品質 {r.quality.toFixed(1)}
          </div>
        </div>
      ))}
    </div>
  );
}`}
              answer={`// /api/copycheck が返すのと同じ形の固定データ（シミュレーション用）
const results = [
  { copy: "保存できませんでした。通信状況を確認して、もう一度お試しください。", clear: 0.95, tone: "polite", negative: 0.02, quality: 1.8 },
  { copy: "OK", clear: 0.3, tone: "polite", negative: 0.01, quality: 0.6 },
  { copy: "今すぐ登録しないと損をします！", clear: 0.7, tone: "polite", negative: 0.94, quality: 0.2 },
  { copy: "入力に誤りがある。修正してください。", clear: 0.6, tone: "mixed", negative: 0.35, quality: 0.9 },
];

function verdict(r, okAbove = 0.85, blockNegativeAbove = 0.9) {
  if (r.negative >= blockNegativeAbove) return "block";
  if (r.clear >= okAbove && r.negative < 0.1 && r.tone === "polite" && r.quality >= 1.5) return "ok";
  return "revise";
}

const LABEL = { ok: "そのまま出せる", revise: "直す", block: "出さない" };

function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {results.map((r) => (
        <div key={r.copy} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <div style={{ fontWeight: 600 }}>{LABEL[verdict(r)]}</div>
          <div>{r.copy}</div>
          <div style={{ fontSize: 12, color: "#555" }}>
            伝わる {Math.round(r.clear * 100)}% / 文体 {r.tone} / ネガティブ {Math.round(r.negative * 100)}% / 品質 {r.quality.toFixed(1)}
          </div>
        </div>
      ))}
    </div>
  );
}`}
              hints={[
                "出さない条件は引数 blockNegativeAbove 以上です",
                "そのまま出せる条件の 1 つ目は引数 okAbove 以上です",
              ]}
              keywords={[">= blockNegativeAbove", ">= okAbove"]}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              正しく埋まると、1 件目が「そのまま出せる」、3
              件目が「出さない」、残りが「直す」になります。
              「OK」というボタンラベルは、ネガティブではないが何が起きるか伝わらない、という理由で「直す」に入ります。
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
                  title: "レビュアーの最終判断を記録する",
                  body: "「直す」と出た文言をレビュアーがどう扱ったかを保存する。これが STEP 23 でしきい値を決めるラベル付きデータになる。",
                },
                {
                  title: "デザインツールやリポジトリと繋ぐ",
                  body: "文言を 1 件ずつ手で入れるのは最初だけ。Figma のテキストレイヤーやリポジトリの i18n ファイルから一括で読み、STEP 20 の一括評価の形で回す。",
                },
                {
                  title: "指針の改訂を判定で検証する",
                  body: "GUIDELINE を変えたら、同じ文言セットを再評価して verdict の分布がどう動くかを見る。指針の文が曖昧だと分布が動かない。",
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
              question="Jev の呼び出しが失敗したとき、このアプリが文言を「直す」列に置く理由は？"
              options={[
                { label: "「直す」が最も処理コストが低いから" },
                {
                  label:
                    "障害中に未チェックの文言が OK 扱いで流れる事故を防ぐため（OK 側に倒さない）",
                  correct: true,
                },
                { label: "SDK がそう返すから" },
                { label: "出さない扱いにするとデザイナーが困るから" },
              ]}
              explanation="判定が得られなかった状態を「OK」と同一視すると、障害中に全件が通過します。失敗は人が見る側（直す）に倒します。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs — noul",
                  url: "https://docs.typesafe.ai/primitives/noul",
                  description:
                    "criteria の true / false で「何を伝わると数えるか」を明示する。",
                },
                {
                  title: "Next.js — Route Handlers",
                  url: "https://nextjs.org/docs/app/building-your-application/routing/route-handlers",
                  description: "サーバー側のエンドポイント。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-copycheck-app" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
