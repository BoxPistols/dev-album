import { Stethoscope, Server, ClipboardList, ShieldAlert } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * サンプルアプリ 4: 診療所の受付振り分け
 * STEP 21: Jev セクション
 * - 医療現場の「受付業務」を題材にする。診断はしない
 * - Web 予約・問い合わせの文面から、診療科・予約の急ぎ度・受付が電話で確認すべきかを判定する
 * - 緊急の兆候があれば自動処理せず即スタッフへ。失敗時もスタッフへ（フェイルクローズ）
 * - 要配慮個人情報の扱いを先に書く
 */

export default function JevClinicApp() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 21</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          サンプルアプリ 4: 診療所の受付振り分け
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Web
          予約フォームや問い合わせに書かれた文面から、どの診療科の枠に入れるか、どれくらい早い枠が要るか、受付が電話で確認すべきかを
          Jev が判定します。 受付スタッフが 1
          件ずつ読んで振り分けている作業を、確信の高いものだけ自動にして待ち時間を減らすアプリです。
          診断や医学的判断は一切しません。判定するのは「受付の業務上の扱い」だけです。
        </p>

        <WhyNowBox
          tags={[
            "医療現場",
            "受付業務",
            "緊急時は人へ",
            "フェイルクローズ",
            "要配慮個人情報",
          ]}
        >
          <p>
            医療現場で自動化してよいのは「誰がいつ見るか」を決める事務の部分で、「何の病気か」ではありません。
            Jev は候補を渡した範囲でしか答えないので、「診療科は 5
            つのどれか」「電話確認が要るか」のように、
            自動化してよい範囲を質問の形そのもので区切れます。この区切り方が、このページの本題です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 前提と扱い */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <ShieldAlert className="text-primary" size={28} />
              0. 前提と、始める前に決めること
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP 18 の jev-apps プロジェクトに追加し、実際に Jev
              を呼びます。作るファイルは
              lib/reception.ts、app/api/reception/route.ts、app/reception/page.tsx
              の 3 つです。
              ただし、このアプリだけは技術より先に決めることがあります。
            </p>
            <InfoBox
              type="warning"
              title="要配慮個人情報を外部 API に送ることになる"
            >
              病歴や症状を含む文面は、日本の個人情報保護法で「要配慮個人情報」にあたります。外部の
              API に送る前に、
              利用目的の明示と本人の同意、委託先の管理、データの保存期間・保存場所を、施設の責任者と確認してください。
              TypeSafe AI
              の利用規約とデータ保持の方針は執筆環境から確認できていません。契約前に公式で確認し、満たさない場合はこのアプリを本番に置かないでください。
              練習では実在の患者の文面を使わず、この教材の例文か自作の文面を使います。
            </InfoBox>
            <div className="rounded-xl border border-border bg-card p-6 mt-4">
              <p className="text-sm font-bold text-foreground mb-3">
                このアプリが守る 4 つの線引き
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    診断・重症度の医学的判断はしない。判定するのは「診療科の枠」「予約の急ぎ度」「受付が電話するか」という事務の扱い
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    緊急の兆候（胸の痛み、意識、大量出血、呼吸困難など）の確率が少しでも上がったら自動処理をやめ、直ちにスタッフに回す。アプリの画面にも救急の連絡先を常に出す
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    氏名・生年月日・患者番号・連絡先は state
                    に入れない。送るのは文面と年代のみ
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    判定に失敗したら「スタッフ確認」に倒す。自動で枠に入れない
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* 判定の設計 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Stethoscope className="text-primary" size={28} />
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
                      emergencySigns
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      noul
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      文面に救急対応を要する兆候の記述があるか（最初に見る。少しでも高ければ人へ）
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      department
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      choice
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      この施設にある診療科のうち、どの枠で受けるか
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      timing
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      score
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      予約枠の急ぎ度（通常 / 今週 /
                      今日）。医学的重症度ではなく「受付としてどの枠を案内するか」
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      needCallback
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      noul
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      文面だけでは枠を決められず、受付が電話で確認すべきか
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CodeBlock
              language="ts"
              title="lib/reception.ts — 型と振り分け"
              code={`export type Department = "internal" | "orthopedics" | "dermatology" | "pediatrics" | "unknown";

export const DEPARTMENT_LABEL: Record<Department, string> = {
  internal: "内科",
  orthopedics: "整形外科",
  dermatology: "皮膚科",
  pediatrics: "小児科",
  unknown: "受付で確認",
};

export interface ReceptionResult {
  emergencySigns: number;   // noul 0〜1
  department: Department;
  departmentConfidence: number;
  timing: number;           // score 0〜2 の期待値
  needCallback: number;     // noul 0〜1
}

export type Route = "staff_now" | "callback" | "auto_book";

// 緊急の兆候は低いしきい値で人へ。自動予約は確信が高いときだけ
export function route(r: ReceptionResult, emergencyAt = 0.2, autoAt = 0.85): Route {
  if (r.emergencySigns >= emergencyAt) return "staff_now";
  if (r.needCallback >= 0.5 || r.department === "unknown" || r.departmentConfidence < autoAt) return "callback";
  return "auto_book";
}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              緊急の兆候のしきい値を 0.2
              と低く置いているのは、見逃しのコストが極端に高いからです。誤検知（緊急でないのにスタッフに回る）は受付が読めば済みますが、見逃しは済みません。
              STEP 16
              で扱った「誤検知と見逃しのコストが非対称なら、しきい値は真ん中に置かない」の典型例です。
            </p>
          </section>

          {/* Route Handler */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Server className="text-primary" size={28} />
              2. Route Handler — 個人情報を落として呼び、失敗はスタッフへ
            </h2>
            <CodeBlock
              language="ts"
              title="app/api/reception/route.ts"
              code={`import { choice, noul, score, TypeSafeClient } from "@typesafe-ai/sdk";
import { route, type ReceptionResult } from "@/lib/reception";

const client = new TypeSafeClient();

// この施設で受けられる診療科。無いものは unknown に落として受付が確認する
const DEPARTMENTS = {
  internal: "Fever, cough, stomach pain, general check-ups",
  orthopedics: "Joint, bone, back or muscle pain, injuries from falls",
  dermatology: "Rashes, itching, skin conditions",
  pediatrics: "Patients under 15 for any symptom",
  unknown: "Does not fit the departments above, or cannot tell from the message",
} as const;

export async function POST(req: Request) {
  // 氏名・患者番号・連絡先はここで受け取らない。文面と年代だけ
  const { message, ageBand } = (await req.json()) as {
    message: string;
    ageBand: "child" | "adult" | "senior";
  };

  try {
    const { answers } = await client.systemOne(
      {
        state: { message, age_band: ageBand },
        questions: {
          emergencySigns: noul(
            "Does the message describe signs that require emergency care rather than a booked visit?",
            {
              true: "Chest pain, trouble breathing, loss of consciousness, heavy bleeding, sudden severe symptoms",
              false: "Symptoms that can wait for a booked appointment",
            },
          ),
          department: choice("Which department slot should the front desk book?", DEPARTMENTS),
          timing: score("How soon should the front desk offer a slot?", [
            "Regular slot within the usual waiting time",
            "A slot this week",
            "A slot today",
          ]),
          needCallback: noul("Should the front desk call the patient to clarify before booking?"),
        },
      },
      { timeout: 5000 },
    );

    const result: ReceptionResult = {
      emergencySigns: answers.emergencySigns.noul,
      department: answers.department.choice,
      departmentConfidence: answers.department.confidence,
      timing: answers.timing.score,
      needCallback: answers.needCallback.noul,
    };
    return Response.json({ route: route(result), ...result });
  } catch {
    // 判定が得られなかった申し込みを自動で枠に入れない。スタッフが見る
    return Response.json({ route: "callback", error: "unavailable" }, { status: 200 });
  }
}`}
            />
            <InfoBox
              type="info"
              title="診療科の一覧を state ではなく criteria に置く理由"
            >
              サンプルアプリ 2 では指針を state に入れました。ここでは診療科を
              choice の criteria に置いています。
              「答えはこの中からしか出ない」という制約そのものが欲しいからです。施設に無い診療科を勝手に案内する余地が、型の上で消えます。
            </InfoBox>
          </section>

          {/* 実行 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              3. 実行して確認する
            </h2>
            <CodeBlock
              language="bash"
              title="通常の申し込みと、緊急の兆候がある文面を 1 件ずつ叩く（例文はすべて架空）"
              code={`curl -sS http://localhost:3000/api/reception \\
  -H "Content-Type: application/json" \\
  -d '{"message":"3日前から膝が痛くて階段がつらいです。来週あたりで診てもらえますか","ageBand":"adult"}'

curl -sS http://localhost:3000/api/reception \\
  -H "Content-Type: application/json" \\
  -d '{"message":"さっきから胸が締め付けられるように痛くて息が苦しいです。今日行けますか","ageBand":"senior"}'`}
            />
            <CodeBlock
              language="json"
              title="返ってくる形（数値は呼ぶたびに変わり得る）"
              code={`{"route":"auto_book","emergencySigns":0.02,"department":"orthopedics","departmentConfidence":0.9,"timing":0.6,"needCallback":0.1}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              2 件目は emergencySigns が高く出て route が staff_now
              になるはずです。もしならなければ、しきい値ではなく noul の
              criteria の文を見直します。
              「どの兆候を緊急と数えるか」は施設ごとに決めるもので、その決定は
              criteria の文として残ります。
            </p>
          </section>

          {/* UI */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <ClipboardList className="text-primary" size={28} />
              4. 受付スタッフの画面
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              申し込みが「スタッフ対応」「電話で確認」「自動予約」の 3
              列に分かれて並ぶ画面です。救急の案内は画面の最上部に常に出します。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                http://localhost:3000/reception
              </code>{" "}
              で開きます。
            </p>
            <CodeBlock
              language="tsx"
              title="app/reception/page.tsx"
              code={`"use client";

import { useState } from "react";
import { DEPARTMENT_LABEL, type ReceptionResult, type Route } from "@/lib/reception";

type Row = ReceptionResult & { id: string; message: string; route: Route };
const COLUMNS: Record<Route, string> = { staff_now: "スタッフ対応（すぐ）", callback: "電話で確認", auto_book: "自動予約" };
const TIMING = ["通常枠", "今週の枠", "今日の枠"];

export default function ReceptionPage() {
  const [message, setMessage] = useState("");
  const [ageBand, setAgeBand] = useState<"child" | "adult" | "senior">("adult");
  const [rows, setRows] = useState<Row[]>([]);

  async function submit() {
    const res = await fetch("/api/reception", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, ageBand }),
    });
    const data = (await res.json()) as Omit<Row, "id" | "message">;
    setRows((prev) => [{ ...data, id: crypto.randomUUID(), message }, ...prev]);
    setMessage("");
  }

  return (
    <main style={{ maxWidth: 960, margin: "40px auto", fontFamily: "sans-serif" }}>
      <p role="note" style={{ border: "2px solid #c00", padding: 8 }}>
        緊急の場合はこの画面ではなく 119 番、または救急外来へ。
      </p>
      <h1>受付の振り分け</h1>
      <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <label htmlFor="ageBand">年代</label>
        <select id="ageBand" value={ageBand} onChange={(e) => setAgeBand(e.target.value as typeof ageBand)} style={{ display: "block", marginBottom: 8 }}>
          <option value="child">15 歳未満</option>
          <option value="adult">成人</option>
          <option value="senior">高齢者</option>
        </select>
        <label htmlFor="message">申し込みの文面（氏名や連絡先は含めない）</label>
        <textarea id="message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} style={{ display: "block", width: "100%", marginBottom: 8 }} />
        <button type="submit" disabled={!message.trim()}>振り分ける</button>
      </form>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 16 }}>
        {(Object.keys(COLUMNS) as Route[]).map((col) => (
          <section key={col} aria-labelledby={\`col-\${col}\`}>
            <h2 id={\`col-\${col}\`} style={{ fontSize: 16 }}>{COLUMNS[col]}</h2>
            {rows.filter((r) => r.route === col).map((r) => (
              <article key={r.id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 8, marginBottom: 8 }}>
                <div>{r.message}</div>
                <div style={{ fontSize: 12, color: "#555" }}>
                  {DEPARTMENT_LABEL[r.department]}（{Math.round(r.departmentConfidence * 100)}%）/ {TIMING[Math.round(r.timing)]} / 緊急兆候 {Math.round(r.emergencySigns * 100)}%
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}`}
            />
            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              ブラウザ内シミュレーション: 振り分けだけを試す
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              教材のプレビューは Jev
              を呼べないので、サーバーの応答と同じ形の固定データ（架空の文面）で{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                route()
              </code>{" "}
              の分岐だけを確認します。___ を埋めてください。
            </p>
            <CodingChallenge
              title="シミュレーション: 緊急の兆候を最初に見る"
              description="route() の ___ を埋めて、緊急の兆候の確率が emergencyAt 以上なら他の条件より先に 'staff_now' を返すようにしてください。"
              preview={true}
              initialCode={`// /api/reception が返すのと同じ形の固定データ（シミュレーション用。文面は架空）
const results = [
  { message: "3日前から膝が痛くて階段がつらいです", emergencySigns: 0.02, department: "orthopedics", departmentConfidence: 0.9, timing: 0.6, needCallback: 0.1 },
  { message: "胸が締め付けられるように痛くて息が苦しいです", emergencySigns: 0.88, department: "internal", departmentConfidence: 0.8, timing: 1.9, needCallback: 0.2 },
  { message: "子どもの背中に赤い発疹が出ています。熱はありません", emergencySigns: 0.05, department: "pediatrics", departmentConfidence: 0.55, timing: 1.1, needCallback: 0.6 },
];
const LABEL = { staff_now: "スタッフ対応（すぐ）", callback: "電話で確認", auto_book: "自動予約" };

function route(r, emergencyAt = 0.2, autoAt = 0.85) {
  if (r.emergencySigns >= ___) return "staff_now";
  if (r.needCallback >= 0.5 || r.department === "unknown" || r.departmentConfidence < autoAt) return "callback";
  return "auto_book";
}

function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {results.map((r) => (
        <div key={r.message} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <div style={{ fontWeight: 600 }}>{LABEL[route(r)]}</div>
          <div>{r.message}</div>
          <div style={{ fontSize: 12, color: "#555" }}>緊急兆候 {Math.round(r.emergencySigns * 100)}% / 診療科の確信度 {Math.round(r.departmentConfidence * 100)}%</div>
        </div>
      ))}
    </div>
  );
}`}
              answer={`// /api/reception が返すのと同じ形の固定データ（シミュレーション用。文面は架空）
const results = [
  { message: "3日前から膝が痛くて階段がつらいです", emergencySigns: 0.02, department: "orthopedics", departmentConfidence: 0.9, timing: 0.6, needCallback: 0.1 },
  { message: "胸が締め付けられるように痛くて息が苦しいです", emergencySigns: 0.88, department: "internal", departmentConfidence: 0.8, timing: 1.9, needCallback: 0.2 },
  { message: "子どもの背中に赤い発疹が出ています。熱はありません", emergencySigns: 0.05, department: "pediatrics", departmentConfidence: 0.55, timing: 1.1, needCallback: 0.6 },
];
const LABEL = { staff_now: "スタッフ対応（すぐ）", callback: "電話で確認", auto_book: "自動予約" };

function route(r, emergencyAt = 0.2, autoAt = 0.85) {
  if (r.emergencySigns >= emergencyAt) return "staff_now";
  if (r.needCallback >= 0.5 || r.department === "unknown" || r.departmentConfidence < autoAt) return "callback";
  return "auto_book";
}

function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {results.map((r) => (
        <div key={r.message} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <div style={{ fontWeight: 600 }}>{LABEL[route(r)]}</div>
          <div>{r.message}</div>
          <div style={{ fontSize: 12, color: "#555" }}>緊急兆候 {Math.round(r.emergencySigns * 100)}% / 診療科の確信度 {Math.round(r.departmentConfidence * 100)}%</div>
        </div>
      ))}
    </div>
  );
}`}
              hints={[
                "緊急の兆候の比較相手は引数 emergencyAt です。低い値で人へ回します",
              ]}
              keywords={[">= emergencyAt"]}
            />
          </section>

          {/* 運用 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              5. 運用で足すもの
            </h2>
            <div className="space-y-3">
              {[
                {
                  title:
                    "スタッフの最終判断を記録し、緊急の見逃しをゼロで監視する",
                  body: "「自動予約」に入ったのに来院時に緊急対応になった件が 1 件でもあれば、しきい値ではなく criteria を直す。この指標だけは 0 を目標にする。",
                },
                {
                  title: "同意と説明を画面に組み込む",
                  body: "申し込みフォームに「振り分けの補助に外部サービスを使う」ことと送る情報の範囲を明示し、同意を取る。同意しない人向けの手動受付の導線も残す。",
                },
                {
                  title: "施設ごとに診療科と兆候の criteria を持つ",
                  body: "診療科の一覧と緊急兆候の説明は施設の設定として保存し、コードに埋め込まない。",
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
              question="このアプリで緊急の兆候のしきい値を 0.2 と低く置いている理由は？"
              options={[
                { label: "noul の値は全体的に低く出るから" },
                {
                  label: "見逃しのコストが誤検知のコストより極端に高いから",
                  correct: true,
                },
                { label: "SDK の既定値だから" },
                { label: "スタッフの人数が多いから" },
              ]}
              explanation="誤検知はスタッフが読めば済みますが、見逃しは済みません。コストが非対称なら、しきい値は真ん中ではなく見逃しを減らす側に置きます。"
            />
            <Quiz
              question="このアプリが Jev に判定させてよい範囲は？"
              options={[
                { label: "症状から病名を推定する" },
                {
                  label: "受付としてどの枠を案内し、誰が確認するかを決める",
                  correct: true,
                },
                { label: "処方の要否" },
                { label: "来院の必要性の医学的判断" },
              ]}
              explanation="判定するのは事務の扱い（診療科の枠、急ぎ度、電話確認の要否）だけです。医学的判断は質問の候補に入れないことで、型の上で範囲を区切ります。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title:
                    "個人情報保護委員会 — 医療・介護関係事業者における個人情報の適切な取扱いのためのガイダンス",
                  url: "https://www.ppc.go.jp/",
                  description:
                    "個人情報保護委員会。「医療・介護関係事業者における個人情報の適切な取扱いのためのガイダンス」で要配慮個人情報と委託の考え方を確認する。",
                },
                {
                  title: "TypeSafe AI Docs",
                  url: "https://docs.typesafe.ai/",
                  description:
                    "データの取り扱い・利用規約は契約前に公式で確認する。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-clinic-app" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
