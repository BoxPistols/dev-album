import { MessagesSquare, Server, Columns3 } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * サンプルアプリ3: ユーザーの声の分類ボード
 * STEP 20: Jevセクション
 * - プロダクト作りに関わる人向けの題材。アプリストアのレビューやアンケートの自由記述を分類して並べる
 * - 配列stateで複数件を1リクエストで評価する
 * - 質問を動的に組み立てる（TypeScriptの型の扱い）
 * - scoreの期待値で並べ、種類ごとの列に置くボードUI
 */

export default function JevFeedbackApp() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 20</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          サンプルアプリ3: ユーザーの声の分類ボード
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          アプリストアのレビュー、アンケートの自由記述、問い合わせに書かれた感想をまとめて
          Jevに渡し、 「機能の要望 / 不具合 / 使いにくさ /
          称賛」に分けて、困りごとの深刻さ順に並べたボードを作ります。 前の2
          本と違うのは、state
          が配列になり、質問をコードで動的に組み立てる点です。
        </p>

        <WhyNowBox
          tags={[
            "プロダクト作り",
            "一括評価",
            "配列state",
            "動的な質問",
            "ボードUI",
          ]}
        >
          <p>
            ユーザーの声は数が多く、全部読むと時間が溶けます。「使いにくさ」だけを深刻な順に読みたい、というのがデザイナーの現実的な要望で、
            それは分類と採点の組み合わせです。まとめて評価すれば往復が1
            回で済み、score
            の期待値は連続値なのでそのまま並べ替えのキーになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 前提 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">0. 前提</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP 18のjev-appsプロジェクトに追加します。実際にJev
              を呼びます。作るファイルは
              lib/feedback.ts、app/api/feedback/classify/route.ts、app/feedback/page.tsx
              の3つです。 1リクエストで複数件を評価するので、STEP 13
              で付けた予算上限が効いていることを確認してから進めてください。
            </p>
          </section>

          {/* 設計 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <MessagesSquare className="text-primary" size={28} />
              1. stateを配列にし、質問を件数ぶん作る
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              APIのstateは配列を受け付けます。各要素にid
              を付け、質問名にも同じid
              を含めれば、答えと元の声を突き合わせられます。 質問は1
              件につき「種類（choice）」「深刻さ（score）」「デザインで解決できる問題か（noul）」の
              3つです。
            </p>
            <CodeBlock
              language="ts"
              title="lib/feedback.ts"
              code={`import { choice, noul, score, type ChoiceQuestion, type NoulQuestion, type ScoreQuestion } from "@typesafe-ai/sdk";

export interface Feedback {
  id: string;
  source: string;   // 例: "app-store", "survey", "support"
  text: string;
}

export const SEVERITY = ["Minor or cosmetic", "Hurts the experience", "Blocks the user from their goal"] as const;
export type Kind = "request" | "bug" | "usability" | "praise";

// 質問名は "k_<id>" / "s_<id>" / "d_<id>"。答えをidで引けるようにする
export function buildQuestions(items: Feedback[]) {
  const questions: Record<string, ChoiceQuestion | ScoreQuestion<typeof SEVERITY> | NoulQuestion> = {};
  for (const f of items) {
    questions[\`k_\${f.id}\`] = choice(
      { task: "Classify this piece of user feedback", feedback_id: f.id },
      {
        request: "Asks for something the product does not do yet",
        bug: "Reports something that is broken or wrong",
        usability: "The feature exists but is hard to find, understand, or use",
        praise: "Positive feedback with no problem to solve",
      },
    );
    questions[\`s_\${f.id}\`] = score(
      { task: "How severe is the problem described, if any", feedback_id: f.id },
      SEVERITY,
    );
    questions[\`d_\${f.id}\`] = noul(
      { task: "Could a design change (layout, wording, flow) fix this without new backend work?", feedback_id: f.id },
    );
  }
  return questions;
}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              instructionsにJSONオブジェクトを渡しています。型定義では
              instructionsは文字列でもJSONでもよく、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                feedback_id
              </code>{" "}
              を入れることで「配列のどの要素についての質問か」を明示しています。
            </p>
            <InfoBox type="info" title="動的に組むと型の推論は弱くなる">
              質問をリテラルで書くとanswers
              の型は質問ごとに推論されますが、Recordで組むと各答えは「3
              種類のどれか」になります。 答えを読むときは{" "}
              <code className="text-sm bg-muted px-1 rounded">
                answer.type === "score"
              </code>{" "}
              のように絞ります。件数が固定なら、リテラルで書いた方が型は強くなります。
            </InfoBox>
          </section>

          {/* Route Handler */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Server className="text-primary" size={28} />
              2. Route Handler — 一括評価して並べる
            </h2>
            <CodeBlock
              language="ts"
              title="app/api/feedback/classify/route.ts"
              code={`import { TypeSafeClient } from "@typesafe-ai/sdk";
import { buildQuestions, type Feedback, type Kind } from "@/lib/feedback";

const client = new TypeSafeClient();

export interface ClassifiedFeedback extends Feedback {
  kind: Kind;
  kindConfidence: number;
  severity: number;      // scoreの期待値0〜2
  designFixable: number; // noul 0〜1
}

export async function POST(req: Request) {
  const { items } = (await req.json()) as { items: Feedback[] };
  if (items.length === 0) return Response.json({ classified: [] });

  const { answers, usage } = await client.systemOne({
    state: items.map((f) => ({ feedback_id: f.id, source: f.source, text: f.text })),
    questions: buildQuestions(items),
  });

  const classified: ClassifiedFeedback[] = items.map((f) => {
    const k = answers[\`k_\${f.id}\`];
    const s = answers[\`s_\${f.id}\`];
    const d = answers[\`d_\${f.id}\`];
    if (k.type !== "choice" || s.type !== "score" || d.type !== "noul") throw new Error("unexpected answer type");
    return {
      ...f,
      kind: k.choice as Kind,
      kindConfidence: k.confidence,
      severity: s.score,
      designFixable: d.noul,
    };
  });

  classified.sort((x, y) => y.severity - x.severity);
  console.info("feedback classified", { count: items.length, input_tokens: usage.input_tokens });
  return Response.json({ classified });
}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              usageのinput_tokens
              をログに残しています。件数を増やすとここが伸びるので、1
              リクエストに入れる件数の目安はこの値で決めます。
              上限は手元で確認できたSDK
              とスキーマに記載が無いため、大きなバッチは自分で分割します。
            </p>
          </section>

          {/* 実行 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              3. 実行して確認する
            </h2>
            <CodeBlock
              language="bash"
              title="4件をまとめて評価する"
              code={`curl -sS http://localhost:3000/api/feedback/classify \\
  -H "Content-Type: application/json" \\
  -d '{"items":[
    {"id":"f1","source":"app-store","text":"保存ボタンがどこにあるか分からず、入力した内容が消えました"},
    {"id":"f2","source":"survey","text":"ダークモードが欲しいです"},
    {"id":"f3","source":"support","text":"CSVを書き出すと文字化けします"},
    {"id":"f4","source":"app-store","text":"通知の設定画面が分かりやすくて助かっています"}
  ]}'`}
            />
            <CodeBlock
              language="json"
              title="返ってくる形（severityの降順。数値は呼ぶたびに変わり得る）"
              code={`{"classified":[
  {"id":"f1","source":"app-store","text":"保存ボタンが…","kind":"usability","kindConfidence":0.9,"severity":1.8,"designFixable":0.9},
  {"id":"f3", ... ,"kind":"bug","severity":1.6,"designFixable":0.1},
  {"id":"f2", ... ,"kind":"request","severity":0.4,"designFixable":0.6},
  {"id":"f4", ... ,"kind":"praise","severity":0.1,"designFixable":0.2}
]}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              サーバーのログに出るinput_tokensを見てください。件数を4 → 20
              に増やして、トークン数がどう伸びるかを一度測っておくと、バッチの単位を決める根拠になります。
            </p>
          </section>

          {/* UI */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Columns3 className="text-primary" size={28} />
              4. 種類ごとの列に並べるボード
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              分類結果を4
              列のボードに置き、各列は深刻さの高い順に並べます。「デザインで直せる」確率が高いものには印を付けます。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                http://localhost:3000/feedback
              </code>{" "}
              で開きます。入力は本来ストアや調査ツールから来ますが、ここではボタンで固定の
              4件を送ります。
            </p>
            <CodeBlock
              language="tsx"
              title="app/feedback/page.tsx"
              code={`"use client";

import { useState } from "react";
import type { Feedback, Kind } from "@/lib/feedback";
import type { ClassifiedFeedback } from "@/app/api/feedback/classify/route";

const SAMPLE: Feedback[] = [
  { id: "f1", source: "app-store", text: "保存ボタンがどこにあるか分からず、入力した内容が消えました" },
  { id: "f2", source: "survey", text: "ダークモードが欲しいです" },
  { id: "f3", source: "support", text: "CSVを書き出すと文字化けします" },
  { id: "f4", source: "app-store", text: "通知の設定画面が分かりやすくて助かっています" },
];
const KINDS: Record<Kind, string> = { usability: "使いにくさ", bug: "不具合", request: "要望", praise: "称賛" };

export default function FeedbackPage() {
  const [rows, setRows] = useState<ClassifiedFeedback[]>([]);
  const [loading, setLoading] = useState(false);

  async function classify() {
    setLoading(true);
    const res = await fetch("/api/feedback/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: SAMPLE }),
    });
    const data = (await res.json()) as { classified: ClassifiedFeedback[] };
    setRows(data.classified);
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 960, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>ユーザーの声の分類ボード</h1>
      <button onClick={classify} disabled={loading}>{loading ? "分類中…" : "4件を分類する"}</button>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 16 }}>
        {(Object.keys(KINDS) as Kind[]).map((kind) => (
          <section key={kind} aria-labelledby={\`col-\${kind}\`}>
            <h2 id={\`col-\${kind}\`} style={{ fontSize: 16 }}>{KINDS[kind]}</h2>
            {rows.filter((r) => r.kind === kind).map((r) => (
              <article key={r.id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 8, marginBottom: 8 }}>
                <div>{r.text}</div>
                <div style={{ fontSize: 12, color: "#555" }}>
                  深刻さ {r.severity.toFixed(1)}{r.designFixable >= 0.7 ? " ・デザインで直せそう" : ""}
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
              ブラウザ内シミュレーション: 並べ替えと列分けだけを試す
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              教材のプレビューはJev
              を呼べないので、サーバーが返す形の固定データで並べ替えと列分けだけを確認します。___
              を埋めてください。
            </p>
            <CodingChallenge
              title="シミュレーション: 深刻さの降順で列に並べる"
              description="sortの比較関数の ___ を埋めて、severityが高い声が各列の先頭に来るようにしてください。"
              preview={true}
              initialCode={`// /api/feedback/classifyが返すのと同じ形の固定データ（シミュレーション用。並び順は未整列）
const classified = [
  { id: "f2", text: "ダークモードが欲しいです", kind: "request", severity: 0.4, designFixable: 0.6 },
  { id: "f1", text: "保存ボタンがどこにあるか分からず、入力した内容が消えました", kind: "usability", severity: 1.8, designFixable: 0.9 },
  { id: "f5", text: "設定の項目名が何を指すのか分かりません", kind: "usability", severity: 1.1, designFixable: 0.85 },
  { id: "f3", text: "CSVを書き出すと文字化けします", kind: "bug", severity: 1.6, designFixable: 0.1 },
  { id: "f4", text: "通知の設定画面が分かりやすくて助かっています", kind: "praise", severity: 0.1, designFixable: 0.2 },
];
const KINDS = { usability: "使いにくさ", bug: "不具合", request: "要望", praise: "称賛" };

function App() {
  const sorted = [...classified].sort((x, y) => y.___ - x.severity);
  return (
    <div style={{ fontFamily: "sans-serif", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
      {Object.keys(KINDS).map((kind) => (
        <div key={kind}>
          <h3 style={{ fontSize: 14 }}>{KINDS[kind]}</h3>
          {sorted.filter((r) => r.kind === kind).map((r) => (
            <div key={r.id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 6, marginBottom: 6, fontSize: 12 }}>
              {r.text}
              <div style={{ color: "#555" }}>深刻さ {r.severity.toFixed(1)}{r.designFixable >= 0.7 ? " ・デザインで直せそう" : ""}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}`}
              answer={`// /api/feedback/classifyが返すのと同じ形の固定データ（シミュレーション用。並び順は未整列）
const classified = [
  { id: "f2", text: "ダークモードが欲しいです", kind: "request", severity: 0.4, designFixable: 0.6 },
  { id: "f1", text: "保存ボタンがどこにあるか分からず、入力した内容が消えました", kind: "usability", severity: 1.8, designFixable: 0.9 },
  { id: "f5", text: "設定の項目名が何を指すのか分かりません", kind: "usability", severity: 1.1, designFixable: 0.85 },
  { id: "f3", text: "CSVを書き出すと文字化けします", kind: "bug", severity: 1.6, designFixable: 0.1 },
  { id: "f4", text: "通知の設定画面が分かりやすくて助かっています", kind: "praise", severity: 0.1, designFixable: 0.2 },
];
const KINDS = { usability: "使いにくさ", bug: "不具合", request: "要望", praise: "称賛" };

function App() {
  const sorted = [...classified].sort((x, y) => y.severity - x.severity);
  return (
    <div style={{ fontFamily: "sans-serif", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
      {Object.keys(KINDS).map((kind) => (
        <div key={kind}>
          <h3 style={{ fontSize: 14 }}>{KINDS[kind]}</h3>
          {sorted.filter((r) => r.kind === kind).map((r) => (
            <div key={r.id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 6, marginBottom: 6, fontSize: 12 }}>
              {r.text}
              <div style={{ color: "#555" }}>深刻さ {r.severity.toFixed(1)}{r.designFixable >= 0.7 ? " ・デザインで直せそう" : ""}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}`}
              hints={[
                "降順にするには、比較関数でyのseverityからxのseverityを引きます",
              ]}
              keywords={["y.severity - x.severity"]}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              表示は列（種類）と順序（深刻さ）で情報を伝え、色だけに頼っていません。「デザインで直せそう」はテキストで付けています。
              STEP 15で扱った「期待値は並べ替えに、表示は丸めて」の実例です。
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
                  body: "usage.input_tokensを見ながら、1リクエストに入れる件数を決める。週に1回まとめて回す、のような運用が自然。",
                },
                {
                  title: "ボード上の移動を記録する",
                  body: "デザイナーがカードを別の列に動かしたら、その差分を保存する。Jevの分類と人の分類のずれが、質問文とcriteriaの説明を直す材料になる。",
                },
                {
                  title: "「デザインで直せそう」の列を作業リストにする",
                  body: "designFixableが高い順に読めば、バックエンドを待たずに着手できる改善が先に見つかる。",
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
              question="複数の声を1リクエストで評価するとき、答えと元の声を突き合わせる方法は？"
              options={[
                { label: "答えは配列で返るので、インデックスで対応する" },
                {
                  label: "質問名に声のidを含め、答えを同じ名前で引く",
                  correct: true,
                },
                { label: "モデルがidを出力してくれる" },
                { label: "1件ずつ呼ぶしかない" },
              ]}
              explanation="答えは質問名をキーにしたオブジェクトで返ります。質問名にidを含めておけば、配列stateのどの要素についての答えかを確実に引けます。"
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
                    "stateとinstructionsがJSONを受け付けることは型定義（EntryType）で確認できる。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-feedback-app" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
