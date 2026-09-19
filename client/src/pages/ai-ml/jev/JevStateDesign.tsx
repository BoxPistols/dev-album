import { Database, Layers, RefreshCw, Coins } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * stateと質問の設計
 * STEP 16: Jevセクション
 * - stateに何を入れるか（テキスト / JSON）
 * - 質問の分け方（1質問1判断）
 * - 複数の質問を1リクエストで評価する
 * - usageとモデル一覧
 * - エラー型・リトライ・タイムアウトの既定
 */

export default function JevStateDesign() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 16</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          stateと質問の設計
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Jevの使い方は「stateを渡して質問する」だけですが、何をstate
          に入れ、質問をどう切るかで答えの安定性が変わります。
          このページでは設計の指針と、1
          リクエストで複数の質問を評価する形、そして失敗したときのSDK
          の振る舞いを扱います。
        </p>

        <WhyNowBox
          tags={["state", "質問設計", "一括評価", "usage", "リトライ"]}
        >
          <p>
            LLMのプロンプト設計に相当する部分です。ただしJev
            には「文体を指定する」「例を見せて真似させる」といった
            余地が少なく、代わりに「判断に必要な情報をstate
            に過不足なく入れる」「質問を1判断ずつに切る」ことが効きます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* state */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Database className="text-primary" size={28} />
              stateに何を入れるか
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              stateはAPIスキーマで「The content all questions in this request
              refer to.」と定義されています。 文字列、JSON
              オブジェクト、配列のどれでも渡せます。判断に使ってほしい情報は全部ここに入れ、判断に関係ない情報は入れません。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <CodeBlock
                language="ts"
                title="文字列で渡す"
                code={`state: "I was charged twice. Please help."`}
              />
              <CodeBlock
                language="ts"
                title="構造を持たせて渡す"
                code={`state: {
  subject: "Duplicate charge",
  message: "I was charged twice. Please help.",
  customer: { plan: "pro", tenure_months: 14 },
  history: ["2 tickets in the last 30 days"],
}`}
              />
            </div>
            <div className="rounded-xl border border-border bg-card p-6 mt-4">
              <h3 className="text-lg font-bold text-foreground mb-3">
                構造化する利点
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    キー名が「これは件名」「これは履歴」という文脈になる。文字列に連結するより意図が伝わる
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    アプリ側のデータ型をそのまま渡せるので、変換コードとテンプレート文字列が要らない
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    質問側のinstructionsからキー名で参照できる（「Use the
                    customer plan when judging priority」など）
                  </span>
                </li>
              </ul>
            </div>
            <InfoBox type="warning" title="個人情報は入れる前に落とす">
              stateはAPI
              に送信されます。氏名・メールアドレス・カード番号など、判断に不要な個人情報は送る前に除去またはマスクします。
              LMOpsの講座で扱ったPIIフィルタリングと同じ扱いです。
            </InfoBox>
          </section>

          {/* 質問の分け方 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Layers className="text-primary" size={28} />
              質問の分け方 — 1質問1判断
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              1
              つの質問に複数の判断を詰め込むと、答えの確率がどの判断を指すのか分からなくなります。
              判断ごとに質問を分け、名前を付けて1リクエストにまとめます。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-bold text-foreground mb-2">
                  分けにくい書き方
                </p>
                <CodeBlock
                  language="ts"
                  code={`urgent_billing: noul(
  "Is this an urgent billing issue?"
)`}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  「急ぎだが請求ではない」と「請求だが急ぎではない」が同じ低い確率に潰れる
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-bold text-foreground mb-2">
                  分けた書き方
                </p>
                <CodeBlock
                  language="ts"
                  code={`billing: noul("Is this about billing?"),
urgent: noul("Does this need attention today?")`}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  2つの確率を組み合わせてアプリ側で判断できる
                </p>
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              質問型の選び方
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      判断の形
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      型
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      例
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="py-3 px-4 text-muted-foreground">
                      条件を満たすか
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      noul
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      スパムか、返金要求を含むか、規約違反か
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 text-muted-foreground">
                      互いに排他的な候補から1つ
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      choice
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      担当チーム、言語、感情のカテゴリ
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 text-muted-foreground">
                      順序のある段階
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      score
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      緊急度、不満度、回答品質の5段階
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 text-muted-foreground">
                      複数当てはまる可能性があるタグ
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      noulをタグごとに
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      「請求」「ログイン」「速度」を別々のnoulにする（choice
                      は1つしか選べない）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 一括評価 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              複数の質問を1リクエストで評価する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              questions
              は名前付きのオブジェクトなので、いくつでも入れられます。答えは同じ名前で返ります。
              ネットワークの往復は1回で済み、TypeScript
              では各答えの型が質問ごとに推論されます。
            </p>
            <CodeBlock
              language="ts"
              title="問い合わせの振り分けに必要な判断をまとめて聞く"
              code={`const { answers, usage } = await client.systemOne({
  state: { subject, message },
  questions: {
    category: choice("Which team should handle this?", {
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
    refund: noul("Is the customer asking for a refund?"),
  },
});

// 型: answers.category.choiceは "billing" | "technical" | "sales"
// 型: answers.frustration.probabilitiesのキーは "0" | "1" | "2"`}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              複数の入力（チケット10件）を1回で評価したい場合は、state
              を配列にして、質問名に番号を含める形が公式SDK
              の型の範囲で書けます。 1
              リクエストに入れられる質問数の上限は、手元で確認できたSDKと
              スキーマには記載がありません。 大量のバッチは自分で分割し、usage
              を見ながら単位を決めてください。
            </p>
          </section>

          {/* usageとモデル */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Coins className="text-primary" size={28} />
              usageとモデル一覧
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              応答の{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                usage
              </code>{" "}
              には
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                input_tokens
              </code>{" "}
              と
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                output_tokens
              </code>{" "}
              が入ります。 スキーマはinput_tokensを「billable input
              tokens」、output_tokensを「currently free of
              charge」と説明しています（執筆時点）。 つまりコストはstateと
              questionsの大きさで決まります。state
              に不要な情報を入れないことがそのまま節約になります。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              使えるモデルは{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                GET /v1/models
              </code>{" "}
              で取れます。 応答の{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                model
              </code>{" "}
              は「May differ from the alias supplied in the request」とあり、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                jev-latest
              </code>{" "}
              で呼んでも実際に答えたモデル名が返ります。ログにはこちらを残します。
            </p>
            <CodeBlock
              language="ts"
              title="モデル一覧を取る"
              code={`const models = await client.models.list();
for (const m of models) {
  console.log(m.name, m.release_date, m.description);
}`}
            />
          </section>

          {/* エラーとリトライ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <RefreshCw className="text-primary" size={28} />
              エラー・リトライ・タイムアウト
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JavaScript SDKの既定値を型定義から起こします。Python SDK
              も同じ考え方で、タイムアウトは10.0秒です。
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      項目
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      既定値（@typesafe-ai/sdk 0.6.0）
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="py-3 px-4 text-foreground">timeout</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      1試行あたり10000ミリ秒。リトライ全体の合計上限は無い
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 text-foreground">maxRetries</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      2（初回に加えて最大2回）
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 text-foreground">backoff</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      500ミリ秒から倍々、最大5000ミリ秒。ジッタ0.25
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 text-foreground">
                      リトライするHTTPステータス
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      408、429、500〜599
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 text-foreground">Retry-After</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      尊重する（上限60000ミリ秒）
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 text-foreground">
                      接続エラー / タイムアウト
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      どちらもリトライ対象
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              エラー型で分岐する
            </h3>
            <CodeBlock
              language="ts"
              title="リトライ後も失敗したときの扱い"
              code={`import {
  APIConnectionError,
  AuthenticationError,
  RateLimitError,
  UnprocessableEntityError,
} from "@typesafe-ai/sdk";

try {
  const { answers } = await client.systemOne(request, { timeout: 5000 });
  return answers;
} catch (err) {
  if (err instanceof AuthenticationError) {
    // 401: キーの問題。リトライしても直らない。設定を疑う
  } else if (err instanceof UnprocessableEntityError) {
    // 422: リクエストの形が不正。err.bodyに検証エラーの位置（loc）が入る
  } else if (err instanceof RateLimitError) {
    // 429: SDKのリトライを使い切った。err.retryAfterMsを見てキューに戻す
  } else if (err instanceof APIConnectionError) {
    // 接続失敗 / タイムアウト: ネットワーク側。フォールバック（人に回す等）へ
  }
  throw err;
}`}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Jev
              の失敗は「判断が得られなかった」であって「判断が“いいえ”だった」ではありません。
              失敗時に確率0
              と同じ扱いをすると、障害のたびに全件が「正常」判定されます。失敗は必ず別の状態として扱います。
            </p>
          </section>

          {/* Challenge */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              コーディングチャレンジ
            </h2>
            <CodingChallenge
              title="複数タグをnoulで分ける"
              description="1つのchoiceに詰め込まれていた「請求 / ログイン / 速度」を、同時に当てはまり得るタグとしてnoul 3つに分けてください。___ を埋めます。"
              preview={false}
              previewType="terminal"
              initialCode={`const { answers } = await client.systemOne({
  state: { message },
  questions: {
    billing: ___("Does this mention charges, invoices, or refunds?"),
    login: noul("Does this mention signing in or passwords?"),
    performance: noul("Does this mention slowness or timeouts?"),
  },
});

const tags = Object.entries(answers)
  .filter(([, a]) => a.type === "noul" && a.___ >= 0.7)
  .map(([name]) => name);`}
              answer={`const { answers } = await client.systemOne({
  state: { message },
  questions: {
    billing: noul("Does this mention charges, invoices, or refunds?"),
    login: noul("Does this mention signing in or passwords?"),
    performance: noul("Does this mention slowness or timeouts?"),
  },
});

const tags = Object.entries(answers)
  .filter(([, a]) => a.type === "noul" && a.noul >= 0.7)
  .map(([name]) => name);`}
              hints={[
                "同時に当てはまり得る条件は、choiceではなくnoulを条件ごとに置きます",
                "noulの答えはa.noulに0〜1で入ります。しきい値と比較してタグに採用します",
              ]}
              keywords={["noul(", "a.noul"]}
            />
          </section>

          {/* Quiz */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="Jevの呼び出しがタイムアウトで失敗したとき、適切な扱いは？"
              options={[
                { label: "確率0として「いいえ」と同じ処理に流す" },
                {
                  label:
                    "「判断が得られなかった」状態として別経路（人の確認など）に回す",
                  correct: true,
                },
                { label: "確率1として「はい」と同じ処理に流す" },
                { label: "無視して次の入力に進む" },
              ]}
              explanation="失敗を「いいえ」と同一視すると、障害時に全件が正常扱いになります。失敗は判断とは別の状態として扱い、フォールバック先を決めておきます。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs — System One",
                  url: "https://docs.typesafe.ai/concepts/system-one",
                  description: "SDKの応答型がリンクしている概念ページ。",
                },
                {
                  title: "@typesafe-ai/sdk（npm）",
                  url: "https://www.npmjs.com/package/@typesafe-ai/sdk",
                  description:
                    "型定義（dist/index.d.mts）にRetryPolicyとRequestOptionsの既定値が書かれている。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-state-design" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
