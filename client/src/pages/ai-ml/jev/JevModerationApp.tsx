import { ShieldCheck, Server, ListOrdered } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * サンプルアプリ 2: 投稿のモデレーション
 * STEP 19: Jev セクション
 * - 公開前チェックを noul + score + choice で組む
 * - 「自動公開 / レビュー待ち / 自動非表示」の 3 分岐
 * - 失敗時は公開を止める（フェイルクローズ）
 * - レビュー待ちキューの UI
 */

export default function JevModerationApp() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 19</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          サンプルアプリ 2: 投稿のモデレーション
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          コミュニティへの投稿を公開する前に Jev
          で判定し、確実に問題ないものは自動公開、確実に違反しているものは自動非表示、
          迷うものは人のレビュー待ちキューに積むアプリです。サンプルアプリ 1
          との違いは、分岐が 3 つになることと、
          判定に失敗したときに「公開しない」側へ倒す設計です。
        </p>

        <WhyNowBox
          tags={[
            "モデレーション",
            "3 分岐",
            "フェイルクローズ",
            "キュー",
            "React",
          ]}
        >
          <p>
            モデレーションは「見逃し」と「誤検知」のコストが非対称です。見逃しはコミュニティを傷つけ、誤検知は投稿者の体験を損ないます。
            Jev
            の確率をそのまま使うと、この非対称をしきい値の置き方で表現できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 前提 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">0. 前提</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP 18 で作った jev-apps プロジェクトに追加します。API キーは同じ
              .env.local を使い、実際に Jev を呼びます。 作るファイルは
              lib/moderation.ts、app/api/moderate/route.ts、app/moderate/page.tsx
              の 3 つです。
            </p>
          </section>

          {/* 設計 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <ShieldCheck className="text-primary" size={28} />
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
                      violates
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      noul
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      ガイドラインに違反しているか（確率）
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      severity
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      score
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      違反しているとしたら、どれくらい深刻か（0〜2）
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      reason
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      choice
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      違反の種類（レビュー画面で人が確認しやすくするため）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CodeBlock
              language="ts"
              title="lib/moderation.ts — 型と 3 分岐"
              code={`export type Reason = "spam" | "harassment" | "personal_info" | "none";

export interface ModerationResult {
  violates: number;      // noul: 0〜1
  severity: number;      // score: 0〜2 の期待値
  reason: Reason;
  reasonConfidence: number;
}

export type Verdict = "publish" | "review" | "hide";

// 見逃しのコストが高いので、公開側のしきい値は低く（0.1）、
// 非表示側は誤検知を避けるため高く（0.9）置く。値は STEP 21 の手順で決め直す
export function verdict(r: ModerationResult, publishBelow = 0.1, hideAbove = 0.9): Verdict {
  if (r.violates >= hideAbove && r.severity >= 1.5) return "hide";
  if (r.violates < publishBelow) return "publish";
  return "review";
}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              自動非表示は「違反の確率が高い」だけでなく「深刻度も高い」ときに限っています。
              軽微な違反まで自動で消すと誤検知の被害が大きくなるので、そこは人に回します。
            </p>
          </section>

          {/* サーバー */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Server className="text-primary" size={28} />
              2. Route Handler — 失敗したら公開しない
            </h2>
            <CodeBlock
              language="ts"
              title="app/api/moderate/route.ts"
              code={`import { choice, noul, score, TypeSafeClient } from "@typesafe-ai/sdk";
import { verdict, type ModerationResult } from "@/lib/moderation";

const client = new TypeSafeClient();

const GUIDELINES = [
  "No unsolicited advertising or referral links.",
  "No insults or threats toward other members.",
  "No phone numbers, addresses, or other personal information.",
];

export async function POST(req: Request) {
  const { postId, body } = (await req.json()) as { postId: string; body: string };

  try {
    const { answers } = await client.systemOne(
      {
        state: { guidelines: GUIDELINES, post: body },
        questions: {
          violates: noul("Does the post violate any of the guidelines?", {
            true: "At least one guideline is clearly violated",
            false: "The post follows all guidelines",
          }),
          severity: score("If it violates, how severe is it?", [
            "Minor or borderline",
            "Clear violation",
            "Harmful; must not be shown",
          ]),
          reason: choice("Which guideline is most relevant?", {
            spam: "Advertising or referral links",
            harassment: "Insults or threats",
            personal_info: "Personal information",
            none: "No violation",
          }),
        },
      },
      { timeout: 5000 },
    );

    const result: ModerationResult = {
      violates: answers.violates.noul,
      severity: answers.severity.score,
      reason: answers.reason.choice,
      reasonConfidence: answers.reason.confidence,
    };
    return Response.json({ postId, verdict: verdict(result), ...result });
  } catch {
    // 判定が得られなかった投稿は公開しない。レビュー待ちに積んで人が見る
    return Response.json({ postId, verdict: "review", error: "unavailable" }, { status: 200 });
  }
}`}
            />
            <InfoBox type="warning" title="フェイルクローズにする">
              サンプルアプリ 1 では失敗を 503 で返し、UI
              で手動振り分けに倒しました。モデレーションでは失敗を「レビュー待ち」として扱い、
              公開側には決して倒しません。API
              の障害中に違反投稿が全部公開される事故を、この 1
              行で防いでいます。
            </InfoBox>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              state
              にガイドラインの本文を入れているのもポイントです。「何が違反か」をモデルの常識に任せず、自分たちの基準を毎回渡します。
              基準を変えたら、コードを変えずに state
              の配列を変えるだけで判定が変わります。
            </p>
          </section>

          {/* 実行して確認 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              3. 実行して確認する
            </h2>
            <CodeBlock
              language="bash"
              title="違反しそうな投稿と、問題ない投稿を 1 件ずつ叩く"
              code={`curl -sS http://localhost:3000/api/moderate \
  -H "Content-Type: application/json" \
  -d '{"postId":"p2","body":"DM me for cheap followers, link in bio"}'

curl -sS http://localhost:3000/api/moderate \
  -H "Content-Type: application/json" \
  -d '{"postId":"p1","body":"Great meetup last week, thanks all!"}'`}
            />
            <CodeBlock
              language="json"
              title="返ってくる形（数値は呼ぶたびに変わり得る）"
              code={`{"postId":"p2","verdict":"hide","violates":0.97,"severity":1.8,"reason":"spam","reasonConfidence":0.9}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              境界にありそうな文（皮肉、軽い暴言、連絡先の一部）も叩いてみてください。violates
              が 0.4〜0.7 に落ちて verdict が review
              になる帯を、自分の目で確かめておくと、しきい値の議論が実感を伴います。
            </p>
          </section>

          {/* UI */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <ListOrdered className="text-primary" size={28} />
              4. レビュー待ちキューの UI
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              モデレーターが見る画面です。投稿を送ると Route Handler が Jev
              を呼び、verdict と確率、違反の種類を表示します。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                http://localhost:3000/moderate
              </code>{" "}
              で開きます。
            </p>
            <CodeBlock
              language="tsx"
              title="app/moderate/page.tsx"
              code={`"use client";

import { useState } from "react";
import type { ModerationResult, Verdict } from "@/lib/moderation";

type Row = ModerationResult & { postId: string; verdict: Verdict; body: string };
const LABEL: Record<Verdict, string> = { publish: "自動公開", review: "レビュー待ち", hide: "自動非表示" };

export default function ModeratePage() {
  const [body, setBody] = useState("");
  const [rows, setRows] = useState<Row[]>([]);

  async function submit() {
    const postId = crypto.randomUUID();
    const res = await fetch("/api/moderate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, body }),
    });
    const data = (await res.json()) as Omit<Row, "body">;
    setRows((prev) => [{ ...data, body }, ...prev]);
    setBody("");
  }

  const queue = rows.filter((r) => r.verdict === "review");

  return (
    <main style={{ maxWidth: 640, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>投稿のモデレーション</h1>
      <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <label htmlFor="body">投稿本文</label>
        <textarea id="body" rows={3} value={body} onChange={(e) => setBody(e.target.value)} style={{ display: "block", width: "100%", marginBottom: 8 }} />
        <button type="submit" disabled={!body.trim()}>判定する</button>
      </form>
      <p>全 {rows.length} 件のうち、レビュー待ち {queue.length} 件</p>
      {rows.map((r) => (
        <div key={r.postId} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <div style={{ fontWeight: 600 }}>{LABEL[r.verdict]}</div>
          <div>{r.body}</div>
          <div style={{ fontSize: 12, color: "#555" }}>
            違反 {Math.round(r.violates * 100)}% / 深刻度 {r.severity.toFixed(1)} / 種類 {r.reason}（{Math.round(r.reasonConfidence * 100)}%）
          </div>
        </div>
      ))}
    </main>
  );
}`}
            />
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
              description="verdict() の ___ を埋めて、違反確率が hideAbove 以上かつ深刻度 1.5 以上なら 'hide'、違反確率が publishBelow 未満なら 'publish'、それ以外を 'review' にしてください。"
              preview={true}
              initialCode={`// /api/moderate が返すのと同じ形の固定データ（シミュレーション用）
const results = [
  { postId: "p1", body: "Great meetup last week, thanks all!", violates: 0.03, severity: 0.1, reason: "none", reasonConfidence: 0.95 },
  { postId: "p2", body: "DM me for cheap followers, link in bio", violates: 0.97, severity: 1.8, reason: "spam", reasonConfidence: 0.92 },
  { postId: "p3", body: "This is the dumbest take I've seen here", violates: 0.62, severity: 0.9, reason: "harassment", reasonConfidence: 0.71 },
  { postId: "p4", body: "Call me at 090-xxxx-xxxx if interested", violates: 0.55, severity: 1.1, reason: "personal_info", reasonConfidence: 0.66 },
];

function verdict(r, publishBelow = 0.1, hideAbove = 0.9) {
  if (r.violates >= ___ && r.severity >= 1.5) return "hide";
  if (r.violates < ___) return "publish";
  return "review";
}

const LABEL = { publish: "自動公開", review: "レビュー待ち", hide: "自動非表示" };

function App() {
  const queue = results.filter((r) => verdict(r) === "review");
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <p>全 {results.length} 件のうち、レビュー待ち {queue.length} 件</p>
      {results.map((r) => (
        <div key={r.postId} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <div style={{ fontWeight: 600 }}>{LABEL[verdict(r)]}</div>
          <div>{r.body}</div>
          <div style={{ fontSize: 12, color: "#555" }}>
            違反 {Math.round(r.violates * 100)}% / 深刻度 {r.severity.toFixed(1)} / 種類 {r.reason}（{Math.round(r.reasonConfidence * 100)}%）
          </div>
        </div>
      ))}
    </div>
  );
}`}
              answer={`// /api/moderate が返すのと同じ形の固定データ（シミュレーション用）
const results = [
  { postId: "p1", body: "Great meetup last week, thanks all!", violates: 0.03, severity: 0.1, reason: "none", reasonConfidence: 0.95 },
  { postId: "p2", body: "DM me for cheap followers, link in bio", violates: 0.97, severity: 1.8, reason: "spam", reasonConfidence: 0.92 },
  { postId: "p3", body: "This is the dumbest take I've seen here", violates: 0.62, severity: 0.9, reason: "harassment", reasonConfidence: 0.71 },
  { postId: "p4", body: "Call me at 090-xxxx-xxxx if interested", violates: 0.55, severity: 1.1, reason: "personal_info", reasonConfidence: 0.66 },
];

function verdict(r, publishBelow = 0.1, hideAbove = 0.9) {
  if (r.violates >= hideAbove && r.severity >= 1.5) return "hide";
  if (r.violates < publishBelow) return "publish";
  return "review";
}

const LABEL = { publish: "自動公開", review: "レビュー待ち", hide: "自動非表示" };

function App() {
  const queue = results.filter((r) => verdict(r) === "review");
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <p>全 {results.length} 件のうち、レビュー待ち {queue.length} 件</p>
      {results.map((r) => (
        <div key={r.postId} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <div style={{ fontWeight: 600 }}>{LABEL[verdict(r)]}</div>
          <div>{r.body}</div>
          <div style={{ fontSize: 12, color: "#555" }}>
            違反 {Math.round(r.violates * 100)}% / 深刻度 {r.severity.toFixed(1)} / 種類 {r.reason}（{Math.round(r.reasonConfidence * 100)}%）
          </div>
        </div>
      ))}
    </div>
  );
}`}
              hints={[
                "非表示の条件は引数 hideAbove 以上です",
                "自動公開の条件は引数 publishBelow 未満です",
              ]}
              keywords={[">= hideAbove", "< publishBelow"]}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              正しく埋まると、4 件のうち p1 が自動公開、p2 が自動非表示、p3 と
              p4 がレビュー待ちになります。 p3 と p4 は違反の確率が 0.5〜0.6
              台で「迷っている帯」にあり、ここが人の出番です。
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
                  title: "人の判定を記録する",
                  body: "レビュー待ちから人が「公開 / 非表示」を選んだ結果を保存する。これが STEP 21 でしきい値を決めるラベル付きデータになる。",
                },
                {
                  title: "自動非表示にも異議申し立ての導線を付ける",
                  body: "confidence が高くても誤検知はある。投稿者が申し立てられ、人が見直せる形にしておく。",
                },
                {
                  title: "ガイドライン変更の前後で比較する",
                  body: "state の guidelines を変えたら、同じ投稿セットを再評価して分岐の件数がどう動くかを見る。",
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
              question="Jev の呼び出しが失敗したとき、このアプリが投稿を「レビュー待ち」にする理由は？"
              options={[
                { label: "レビュー待ちが最も処理コストが低いから" },
                {
                  label:
                    "障害中に違反投稿が自動公開される事故を防ぐため（公開側に倒さない）",
                  correct: true,
                },
                { label: "SDK がそう返すから" },
                { label: "非表示にするとユーザーが怒るから" },
              ]}
              explanation="判定が得られなかった状態を「違反なし」と同一視すると、障害中に全件が公開されます。失敗は公開しない側（レビュー待ち）に倒します。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs — noul",
                  url: "https://docs.typesafe.ai/primitives/noul",
                  description:
                    "criteria の true / false で「何を違反と数えるか」を明示する。",
                },
                {
                  title: "Next.js — Route Handlers",
                  url: "https://nextjs.org/docs/app/building-your-application/routing/route-handlers",
                  description: "サーバー側のエンドポイント。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-moderation-app" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
