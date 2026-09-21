import { Inbox, Server, SlidersHorizontal } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * サンプルアプリ1: 問い合わせの選別
 * STEP 18: Jevセクション
 * - メールやチャットで届く問い合わせを、担当チームと緊急度で振り分ける典型例
 * - choice + noulを1リクエストで使う基本形
 * - 選択肢に「どれでもない」を入れる前後を実測で比べる
 * - 応答例の値は2026-09-20にjev-1.13.0を実際に呼んで得たもの
 */

export default function JevTriageApp() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 18</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          サンプルアプリ1: 問い合わせの選別
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          メールやチャットで届く問い合わせを、担当チームと緊急度で振り分けます。Jevの使い道としていちばん典型的な形で、公式のQuick
          startも同じ題材を使っています。このページでは、日本語の問い合わせを実際にJevへ送った結果をもとに、選択肢の設計としきい値の決め方を組み立てます。
        </p>

        <WhyNowBox tags={["典型例", "choice", "noul", "Next.js", "実測値つき"]}>
          <p>
            問い合わせの振り分けは、人が1件ずつ読めば数秒で判断できる仕事です。Jevが向いているのはこの種類の判断で、答えが「どのチームか」「急ぎか」という決まった形になります。形が決まっているので、結果をそのままコードの分岐に使えます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">0. 前提</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP 13でAPIキーを用意し、STEP
              14でSDKを入れた状態から始めます。Next.jsのプロジェクトを1つ作り、以降のサンプルアプリも同じプロジェクトに足していきます。
            </p>
            <CodeBlock
              language="bash"
              title="プロジェクトを作る"
              code={`npx create-next-app@latest jev-apps --ts --app --no-src-dir --eslint --tailwind --import-alias "@/*"
cd jev-apps
npm install @typesafe-ai/sdk
echo 'TYPESAFE_API_KEY=ここにキーを貼る' > .env.local`}
            />
            <InfoBox type="warning" title=".env.localをコミットしない">
              create-next-appが作る.gitignoreには.env*が入っています。キーを書いたファイルがgit
              statusに出ないことを確かめてから進めてください。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Inbox className="text-primary" size={28} />
              1. 質問を設計する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              聞くことは2つです。担当チームはchoice、緊急かどうかはnoulで聞きます。choiceの選択肢には、名前だけでなく「何が当てはまるか」の説明を書きます。
            </p>
            <CodeBlock
              language="ts"
              title="質問の定義"
              code={`const questions = {
  department: {
    type: "choice",
    instructions: "この問い合わせを担当すべきチーム",
    criteria: {
      billing: "請求、支払い、返金、領収書、解約後の請求",
      technical: "不具合、エラー、設定方法、連携の失敗",
      sales: "料金プラン、見積もり、導入前の相談",
      other: "上のどれにも当てはまらない。お礼、感想、雑談など、対応を求めていない内容",
    },
  },
  is_urgent: {
    type: "noul",
    instructions: "このメッセージは、今日中の対応が要る緊急の内容である",
  },
} as const;`}
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
              「どれでもない」を選択肢に入れる
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Jevは、与えた選択肢の中から必ず1つを選びます。当てはまるものが無い入力でも、どれかが選ばれます。otherを入れる前と後で、同じお礼のメッセージを送った結果です。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <caption className="text-left text-muted-foreground mb-2">
                  入力:「いつもありがとうございます。新しい画面、使いやすくなりました。」（2026-09-20、jev-1.13.0で実測）
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      選択肢
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      選ばれたもの
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      confidence
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border">
                      billing / technical / sales
                    </td>
                    <td className="p-3 border-b border-border">
                      technical（確率0.99）
                    </td>
                    <td className="p-3 border-b border-border">0.99</td>
                  </tr>
                  <tr>
                    <td className="p-3">otherを足した4つ</td>
                    <td className="p-3">other（確率1）</td>
                    <td className="p-3">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox
              type="warning"
              title="confidenceが高くても、正しいとは限らない"
            >
              otherが無いときの判定は、当てはまらない入力なのにconfidenceが0.99でした。confidenceは確率の集中の度合いで、選択肢の設計が入力に合っているかは教えてくれません。公式のFAQも「Jev
              guarantees the shape of its answers, not that every decision is
              correct」としています。受け皿の選択肢は、しきい値では代わりになりません。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Server className="text-primary" size={28} />
              2. Route Handlerから呼ぶ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              キーをブラウザに出さないよう、Jevはサーバー側から呼びます。判定結果をどう扱うかの規則は、UIからもテストからも使えるようにlibへ分けます。
            </p>
            <CodeBlock
              language="ts"
              title="lib/triage.ts"
              code={`export type Department = "billing" | "technical" | "sales" | "other";

export type TriageResult = {
  department: Department;
  confidence: number;
  urgent: number;
};

export type Route = "auto" | "review";

// confidenceが低い判定と、緊急度が中間の判定は人が確認する
export const CONFIDENCE_THRESHOLD = 0.8;
export const URGENT_LOW = 0.3;
export const URGENT_HIGH = 0.7;

export function decide(result: TriageResult): Route {
  if (result.confidence < CONFIDENCE_THRESHOLD) return "review";
  if (result.urgent > URGENT_LOW && result.urgent < URGENT_HIGH) return "review";
  return "auto";
}`}
            />
            <CodeBlock
              language="ts"
              title="app/api/triage/route.ts"
              code={`import { TypeSafeClient } from "@typesafe-ai/sdk";
import type { TriageResult } from "@/lib/triage";

// timeoutは1回あたりの値。リトライを止めて、待ち時間の上限を5秒にする
function createClient() {
  return new TypeSafeClient({ timeout: 5000, retry: { maxRetries: 0 } });
}

export async function POST(request: Request) {
  const { message } = (await request.json()) as { message?: string };
  if (!message || message.length > 2000) {
    return Response.json({ error: "messageは1〜2000文字で送る" }, { status: 400 });
  }
  try {
    const response = await createClient().systemOne({
      state: message,
      questions: {
        department: {
          type: "choice",
          instructions: "この問い合わせを担当すべきチーム",
          criteria: {
            billing: "請求、支払い、返金、領収書、解約後の請求",
            technical: "不具合、エラー、設定方法、連携の失敗",
            sales: "料金プラン、見積もり、導入前の相談",
            other: "上のどれにも当てはまらない。お礼、感想、雑談など、対応を求めていない内容",
          },
        },
        is_urgent: {
          type: "noul",
          instructions: "このメッセージは、今日中の対応が要る緊急の内容である",
        },
      },
    });
    const { department, is_urgent } = response.answers;
    const result: TriageResult = {
      department: department.choice,
      confidence: department.confidence,
      urgent: is_urgent.noul,
    };
    return Response.json({ ...result, model: response.model });
  } catch {
    // 判定できなかったときは、人が確認する側に倒す
    return Response.json({ error: "判定できなかった", route: "review" }, { status: 503 });
  }
}`}
            />
            <InfoBox type="info" title="クライアントをリクエストの中で作る理由">
              TypeSafeClientは、作る時点でTYPESAFE_API_KEYを読みます。モジュールの先頭で作ると、キーの無い環境ではnext
              buildが設定の収集で止まります。リクエストの中で作れば、キーが無くてもビルドは通り、呼び出しだけが503になります。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              3. 実行して確認する
            </h2>
            <CodeBlock
              language="bash"
              title="開発サーバーを起動"
              code={`npm run dev`}
            />
            <CodeBlock
              language="bash"
              title="別のターミナルからPOSTする"
              code={`curl -sS http://localhost:3000/api/triage \\
  -H "Content-Type: application/json" \\
  -d '{"message":"今月の請求が2回引き落とされています。至急確認して返金してください。"}'`}
            />
            <CodeBlock
              language="json"
              title="返ってきた応答（2026-09-20の実測）"
              code={`{"department":"billing","confidence":1,"urgent":0.79,"model":"jev-1.13.0"}`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              modelには、指定したjev-latestではなく、実際に使われた版のIDが入ります。応答までの時間は、手元の測定で0.3〜1.0秒でした。
            </p>
            <InfoBox
              type="info"
              title="仕様では形が決まり、実測では確率の値が動く"
            >
              同じ入力を4回送ると、選ばれたラベルは4回とも同じで、確率は0.66〜0.74、confidenceは0.48〜0.61の範囲で動きました（公式Quick
              startの英語の例、2026-09-20、jev-1.13.0）。上の応答と手元の値が少し違っても、誤りではありません。値がしきい値の近くにあると判定が入れ替わり得るので、次の節で中間の帯を人の確認に回します。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <SlidersHorizontal className="text-primary" size={28} />
              4. しきい値を自分のデータで決める
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              架空の問い合わせ12件を、日本語と英語の両方で送りました。担当チームは、答えがはっきりしている10件すべてで期待どおりになり、日本語でも英語でも同じでした。緊急度のnoulは次のように分かれました。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <caption className="text-left text-muted-foreground mb-2">
                  緊急度のnoul（日本語の入力、2026-09-20、jev-1.13.0で実測）
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      入力
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border"
                    >
                      noul
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border">
                      本番のAPIが500を返し続けている
                    </td>
                    <td className="p-3 border-b border-border">0.95</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">
                      ログインできず業務が止まっている
                    </td>
                    <td className="p-3 border-b border-border">0.93</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">
                      請求が2回引き落とされた。至急
                    </td>
                    <td className="p-3 border-b border-border">0.80</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">
                      解約したのに今月も請求が来た
                    </td>
                    <td className="p-3 border-b border-border">0.48</td>
                  </tr>
                  <tr>
                    <td className="p-3">
                      料金の質問、急がない不具合、宛名の変更など7件
                    </td>
                    <td className="p-3">0.05〜0.15</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              急ぎの3件と急がない7件の間は大きく開いていて、その間に1件だけ入りました。「解約したのに請求が来た」は、急ぎとも急がないとも読めます。lib/triage.tsが0.3〜0.7を人の確認に回しているのは、この帯に入る入力があるためです。帯の幅は、自分の問い合わせを数十件送って、間に入る件数を見てから決めます。
            </p>
            <InfoBox type="info" title="日本語で使う前に確かめること">
              公式のModelsページは「English is the primary training language and
              where accuracy is currently
              best」とし、日本語を含む言語は自分のデータで確かめてから使うよう求めています。今回の12件では日本語と英語で担当チームの判定は一致しましたが、選択肢の説明を「billing:
              支払いの問題」のように短くした別の測定では、同じ内容でも英語ではbilling、日本語ではtechnicalになった例がありました。選択肢の説明を具体的に書き、自分のデータで両方の言語の結果を比べてください。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              5. 振り分けの規則を試す
            </h2>
            <CodingChallenge
              title="シミュレーション: 人の確認に回す条件（Jevは呼ばない）"
              description="decideの ___ を埋めて、confidenceが低い判定と、緊急度が中間の判定をreviewに回してください。データは上の実測値です。"
              preview={true}
              initialCode={`// /api/triageが返すのと同じ形の固定データ（シミュレーション用。値は実測）
const results = [
  { text: "請求が2回引き落とされた。至急", department: "billing", confidence: 1, urgent: 0.8 },
  { text: "解約したのに今月も請求が来た", department: "billing", confidence: 1, urgent: 0.48 },
  { text: "決済サービスとの連携が3日失敗している", department: "technical", confidence: 0.53, urgent: 0.92 },
  { text: "いつもありがとうございます", department: "other", confidence: 1, urgent: 0.05 },
];

function decide(r) {
  if (r.confidence < ___) return "review";
  if (r.urgent > 0.3 && r.urgent < 0.7) return "review";
  return "auto";
}

function App() {
  return (
    <ul style={{ fontFamily: "sans-serif", fontSize: 14, paddingLeft: 16 }}>
      {results.map((r) => (
        <li key={r.text} style={{ marginBottom: 8 }}>
          {r.text}
          <div style={{ color: "#555" }}>
            {r.department}・緊急度{r.urgent}・{decide(r) === "review" ? "人が確認" : "自動で振り分け"}
          </div>
        </li>
      ))}
    </ul>
  );
}`}
              answer={`// /api/triageが返すのと同じ形の固定データ（シミュレーション用。値は実測）
const results = [
  { text: "請求が2回引き落とされた。至急", department: "billing", confidence: 1, urgent: 0.8 },
  { text: "解約したのに今月も請求が来た", department: "billing", confidence: 1, urgent: 0.48 },
  { text: "決済サービスとの連携が3日失敗している", department: "technical", confidence: 0.53, urgent: 0.92 },
  { text: "いつもありがとうございます", department: "other", confidence: 1, urgent: 0.05 },
];

function decide(r) {
  if (r.confidence < 0.8) return "review";
  if (r.urgent > 0.3 && r.urgent < 0.7) return "review";
  return "auto";
}

function App() {
  return (
    <ul style={{ fontFamily: "sans-serif", fontSize: 14, paddingLeft: 16 }}>
      {results.map((r) => (
        <li key={r.text} style={{ marginBottom: 8 }}>
          {r.text}
          <div style={{ color: "#555" }}>
            {r.department}・緊急度{r.urgent}・{decide(r) === "review" ? "人が確認" : "自動で振り分け"}
          </div>
        </li>
      ))}
    </ul>
  );
}`}
              hints={[
                "confidenceのしきい値はlib/triage.tsのCONFIDENCE_THRESHOLDと同じ値です。",
              ]}
              keywords={["r.confidence < 0.8"]}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              確認クイズ
            </h2>
            <Quiz
              question="どのチームにも当てはまらないお礼のメッセージが、confidence 0.99でtechnicalに振り分けられました。最初に直すのはどこですか？"
              options={[
                { label: "confidenceのしきい値を0.995に上げる" },
                {
                  label: "choiceの選択肢に「どれでもない」を足す",
                  correct: true,
                },
                { label: "同じ入力を何度か送って多数決を取る" },
                { label: "timeoutを長くする" },
              ]}
              explanation="Jevは与えた選択肢の中から必ず1つを選びます。当てはまる選択肢が無い入力でもconfidenceは高く出るので、しきい値では防げません。実測では、otherを足すと同じ入力がother（確率1）になりました。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs — Quick start",
                  url: "https://docs.typesafe.ai/introduction/quickstart",
                  description:
                    "問い合わせの振り分けを題材にした公式の最初の例。",
                },
                {
                  title: "TypeSafe AI Docs — Choice",
                  url: "https://docs.typesafe.ai/primitives/choice",
                  description:
                    "選択肢の書き方と、probabilitiesとconfidenceの読み方。",
                },
                {
                  title: "TypeSafe AI Docs — Models",
                  url: "https://docs.typesafe.ai/models",
                  description: "対応言語についての記述と、1リクエストの上限。",
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
