import {
  UserPlus,
  KeyRound,
  CreditCard,
  Route,
  ShieldAlert,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * アカウント登録とAPIキー・課金の準備
 * STEP 13: Jevセクション
 * - 直接契約（TypeSafe AIコンソール）と、Vercel AI Gateway経由の2ルート
 * - ウェイトリスト、キー発行、支払い方法、予算上限
 * - 公式に確認できたことと、公式ドキュメントに記載が無いことを分けて書く
 */

export default function JevAccount() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 13</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          アカウント登録とAPIキー・課金の準備
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          コードを書く前に、Jevを呼ぶための契約とキーをそろえます。STEP 18〜22
          のサンプルアプリは実際にJevを呼ぶので、
          ここを飛ばすと動きません。ルートは2つあります。TypeSafe AI
          と直接契約する方法と、Vercel AI Gateway経由で使う方法です。
        </p>

        <WhyNowBox
          tags={[
            "ウェイトリスト",
            "APIキー",
            "支払い方法",
            "予算上限",
            "Vercel AI Gateway",
          ]}
        >
          <p>
            有料API
            は「キーを取る」だけでは動かず、支払い方法の登録や残高が要ることが多いです。
            どこで何を登録し、いくらまで使われ得るかを先に把握しておくと、初回の呼び出しで401のエラーに当たっても原因を順に確かめられます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 前提 */}
          <section>
            <InfoBox type="warning" title="このページの根拠の強さについて">
              ルートAの始め方（ウェイトリスト）、キーを発行する場所、単価と課金の対象は、TypeSafe
              AIの公式サイトと公式ドキュメントで2026-09-20に確認した内容です。ルートBはVercel
              の公式ドキュメントに基づきます。
              コンソールにログインした後の画面は確認していません。支払い方法の登録など、公式ドキュメントに記載が無い手順はコンソールの案内に従ってください。
              画面の文言や手順は変わるので、迷ったら各節のリンク先（公式）を正としてください。
            </InfoBox>
          </section>

          {/* ルート選択 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Route className="text-primary" size={28} />
              1. どちらのルートで使うか
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      観点
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      A. TypeSafe AIと直接契約
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      B. Vercel AI Gateway経由
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">
                      使うSDK
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      公式SDK（@typesafe-ai/sdk /
                      typesafe-sdk）。本セクションのコードはこちら
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      同じ公式SDK。baseURLとキーを替えて、VercelのTypeSafe互換API
                      に向ける。新しく書くコードならAI SDKの評価用APIも選べる
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">
                      登録
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      ウェイトリストに登録する（公式サイトのFAQ「Join the
                      waitlist!」）
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      Vercel
                      アカウントがあればすぐ。前払いクレジットを購入して使う
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">
                      キー
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      TYPESAFE_API_KEY（SDKが読む環境変数名として公式SDK
                      で確認済み）
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      AI_GATEWAY_API_KEY（Vercel公式ドキュメントで確認済み）
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">
                      向く人
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      TypeSafe AIのコンソールとPlaygroundも使いたい。本教材の前提
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      すでにVercelに課金していて、複数モデルの請求を1
                      か所にまとめたい
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              本セクションはAを前提に進めます。A
              のウェイトリストが通るまでの間にB
              で先に触る、という使い方もできます。BでもSTEP 14以降のコードは公式
              SDKのまま使えます。替えるのは接続先とキー、モデル名の指定です（「3.
              ルートB」で扱います）。
            </p>
          </section>

          {/* A: 直接契約 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <UserPlus className="text-primary" size={28} />
              2. ルートA: TypeSafe AIに登録してキーを取る
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    label: "公式サイト（typesafe.ai）でウェイトリストに登録する",
                    desc: "公式サイトのFAQは、始め方を「Join the waitlist!」と案内している。トップページの「Join Waitlist」から登録する。登録後に使えるようになるまでの連絡方法と期間は、公式に記載なし",
                  },
                  {
                    step: "2",
                    label: "コンソール（console.typesafe.ai）にログインする",
                    desc: "公式のQuick startは、Playground（https://console.typesafe.ai/playground）にログインして質問を試す手順から始めている。コードを書く前に、ここで質問の形を試せる",
                  },
                  {
                    step: "3",
                    label: "APIキーを発行し、表示された直後に控える",
                    desc: "発行する場所はhttps://console.typesafe.ai/keys（公式のQuick start）。キーの全文を後から見られるかは公式ドキュメントに記載なし。発行時にしか表示されない前提で扱い、用途別（開発 / 本番）に分けて発行する",
                  },
                  {
                    step: "4",
                    label: "支払いの設定をコンソールで確認する",
                    desc: "支払い方法の登録手順は公式ドキュメントに記載なし。コンソールの画面の案内に従う",
                  },
                  {
                    step: "5",
                    label: "公式ドキュメントのModelsページで単価を確認する",
                    desc: "Modelsページ（https://docs.typesafe.ai/models）は「Charged per input token. Output tokens are free.」としている。2026-09-20時点の単価は、Jev 1.13が入力100万トークンあたり$0.042。単価は改定されるので、使う前に同じページで確かめる",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs font-bold">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
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
              キーが取れたら、次の1行で疎通を確かめます。SDK
              を入れる前に、キーが通るかだけを切り分けるためです。
              エンドポイントは公式SDKの既定値（
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                https://api.typesafe.ai
              </code>
              ）と、 SDKが呼んでいるパス（
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                GET /v1/models
              </code>
              ）から取っています。
            </p>
            <CodeBlock
              language="bash"
              title="キーの疎通確認（モデル一覧が返ればOK）"
              code={`export TYPESAFE_API_KEY="<コンソールで発行したキー>"

curl -sS https://api.typesafe.ai/v1/models \\
  -H "Authorization: Bearer $TYPESAFE_API_KEY"`}
            />
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-bold text-foreground mb-1">
                  200でモデル一覧
                </p>
                <p className="text-sm text-muted-foreground">
                  キーが通っている。STEP 14へ進む
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-bold text-foreground mb-1">401</p>
                <p className="text-sm text-muted-foreground">
                  キーが違う、失効、貼り付け時の空白混入。コンソールで再発行
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-bold text-foreground mb-1">
                  403と「Must supply an API key!」
                </p>
                <p className="text-sm text-muted-foreground">
                  キーがリクエストに付いていない。exportした変数名と、値が空でないかを確認
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              公式のAPIリファレンスのエラー表にあるステータスは401（キーが無いか無効）、422（リクエスト本文の検証エラー）、429（レート制限）、529（一時的な過負荷）です。
              403はこの表にありませんが、2026-09-20にキーを付けずに上のcurl
              を実行したところ、403と「Must supply an API key! Check your
              request and try again.」が返りました。422と429
              をコードでどう受けるかはSTEP 16で扱います。529はSDK
              の既定のリトライ対象（500〜599）に含まれます。
            </p>
          </section>

          {/* B: Vercel AI Gateway */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <CreditCard className="text-primary" size={28} />
              3. ルートB: Vercel AI Gateway経由で使う
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Vercelは2026-09-16付のchangelogで、JevがAI Gateway
              で使えるようになったと告知しています（モデルIDは{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                typesafe-ai/jev
              </code>
              ）。 このルートの課金とキーはVercel側の仕組みで、Vercel
              の公式ドキュメントで手順を確認できます。
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    label:
                      "VercelのチームでAI Gatewayのクレジットを購入する",
                    desc: "前払い制。ダッシュボードのほか、公式ドキュメントに載っているAPI（POST /v1/billing/buy）やMCPツールでも購入できる。残高はGET /v1/creditsで確認できる",
                  },
                  {
                    step: "2",
                    label: "AI GatewayのAPIキーを発行する",
                    desc: "ダッシュボードかCLI（vercel ai-gateway api-keys create）。キーごとに予算上限（--limit）と更新周期（--refresh-period）を付けられる。2026-09-20時点のVercelのドキュメントは、--limitが使えるのはVercel CLI v59.13.0以降で、それより前の版では非推奨の--budgetを使うとしている",
                  },
                  {
                    step: "3",
                    label: "環境変数AI_GATEWAY_API_KEYに入れる",
                    desc: ".env.localに書く。Vercelにデプロイした関数からはOIDCトークンでも認証できる",
                  },
                  {
                    step: "4",
                    label:
                      "モデル一覧でtypesafe-ai/jevが見えることを確認する",
                    desc: "GET https://ai-gateway.vercel.sh/v1/models は認証なしで一覧と単価を返す",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs font-bold">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
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
            <CodeBlock
              language="bash"
              title="予算上限付きのキーをCLIで作る（Vercel公式ドキュメントの例を元に、キーの名前だけ変えたもの）"
              code={`vercel ai-gateway api-keys create --name jev-dev --limit 10 --refresh-period monthly`}
            />
            <p className="text-muted-foreground mt-6 mb-4 leading-relaxed">
              Vercelは、TypeSafeのAPIと同じ形で呼べる互換API（ベースURLは{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                https://ai-gateway.vercel.sh/typesafe
              </code>
              ）を公開しています。Vercelのドキュメントは移行の手順を「Change the
              base URL and the API key」「Everything else stays the
              same」と説明しています。公式SDKの初期化を次の形にすれば、STEP 14
              以降のコードをそのまま使えます。
            </p>
            <CodeBlock
              language="ts"
              title="公式SDKをAI Gatewayに向ける（Vercel公式ドキュメントの例から）"
              code={`import { TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: "https://ai-gateway.vercel.sh/typesafe",
});

const result = await client.systemOne({
  model: "typesafe-ai/jev",
  state: "I was charged twice for my subscription.",
  questions: {
    refund: {
      type: "noul",
      instructions: "Is the customer asking for money back?",
    },
  },
});`}
            />
            <p className="text-muted-foreground mt-3 mb-4 leading-relaxed">
              Vercelの例はmodelに{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                typesafe-ai/jev
              </code>{" "}
              を指定しています。本教材のコードはmodelを省略しているので、ルートB
              ではmodelを明示するか、STEP 14の表にある環境変数
              TYPESAFE_DEFAULT_MODELに同じ値を入れます。Vercel
              のドキュメントは、この互換APIの応答がTypeSafeのフィールド名（answers、noul、usage.input_tokens）を使うとしています。
            </p>
            <InfoBox type="info" title="ルートBでの呼び出し方">
              上の互換APIとは別に、Vercelは新しく書くコード向けにAI SDK
              の評価用API（experimental_evaluate）を案内しています。こちらは応答の形が公式
              SDKと違います。Vercelのナレッジベース記事「How to classify,
              route, and score with Jev and AI SDK」によると、noulに当たる質問は
              booleanという型になり、答えはprobabilityに入ります。confidence
              は答えの中ではなくresult.providerMetadata.typesafe.confidence
              に質問IDごとに入ります。
              本教材のサンプルアプリは公式SDKの応答の形（answers.x.noulや
              answers.x.confidence）を読むので、AI SDK
              で書く場合は呼び出しに加えて、応答を読む部分も書き換えます。
            </InfoBox>
          </section>

          {/* キーの扱い */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <KeyRound className="text-primary" size={28} />
              4. キーと請求の管理ルール
            </h2>
            <div className="space-y-3">
              {[
                {
                  title: "開発用と本番用でキーを分ける",
                  body: "漏えい時に本番だけ残して開発用を無効化できる。ルートBではキーごとに予算上限も付けられる。",
                },
                {
                  title: "予算上限を先に付ける",
                  body: "ループの中でJevを呼ぶ設計（STEP 20の一括評価など）は、バグで無限に呼ぶと請求が伸びる。上限が付けられる仕組みなら最初に付ける。",
                },
                {
                  title: "usageをログに残す",
                  body: "STEP 16で扱うusage.input_tokensを毎回記録し、請求書の数字と突き合わせられるようにする。",
                },
                {
                  title: "キーは .envに置き、リポジトリに入れない",
                  body: "STEP 14の .gitignore確認とNEXT_PUBLIC_ を付けないルール。",
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
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <ShieldAlert className="text-primary" size={28} />
              5. 進む前のチェック
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>ルートAなら、curlでモデル一覧が200で返る</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    ルートB
                    なら、クレジット残高があり、キーに予算上限が付いている
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    キーが .env（または .env.local）にあり、その行がgit
                    の差分に出ない
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    公式ドキュメントのModelsページで現在の単価を見て、1
                    リクエストあたりの概算を自分で出した
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="Jevの課金について、公式SDK同梱のスキーマから確認できることは？"
              options={[
                { label: "出力トークンにも入力と同じ単価がかかる" },
                {
                  label:
                    "入力トークンが課金対象で、出力トークンは執筆時点で無料",
                  correct: true,
                },
                { label: "リクエスト回数で課金される" },
                { label: "月額固定" },
              ]}
              explanation="スキーマのUsageはinput_tokensをbillable、output_tokensを「currently free of charge」と説明しています。単価そのものは改定されるので、公式ドキュメントのModelsページ（https://docs.typesafe.ai/models）で確認します。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI — Quick start",
                  url: "https://docs.typesafe.ai/introduction/quickstart",
                  description:
                    "公式のはじめ方。Playgroundとキーを発行する場所の案内。",
                },
                {
                  title: "TypeSafe AI",
                  url: "https://typesafe.ai/",
                  description: "公式サイト。ウェイトリストの登録とFAQ。",
                },
                {
                  title: "TypeSafe AI Docs — Models",
                  url: "https://docs.typesafe.ai/models",
                  description: "単価と課金の対象、エイリアス、モデル一覧のAPI。",
                },
                {
                  title: "TypeSafe AI Docs — API reference",
                  url: "https://docs.typesafe.ai/api",
                  description: "エラーのステータス一覧（401 / 422 / 429 / 529）。",
                },
                {
                  title:
                    "Vercel changelog — TypeSafe AI's Jev now available on AI Gateway",
                  url: "https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway",
                  description: "ルートBの告知。モデルID typesafe-ai/jev。",
                },
                {
                  title:
                    "Vercel KB — How to classify, route, and score with Jev and AI SDK",
                  url: "https://vercel.com/kb/guide/typesafe-jev-and-ai-sdk",
                  description:
                    "AI SDKの評価用APIで書く場合の呼び出し方と応答の形。",
                },
                {
                  title: "Vercel Docs — TypeSafe API with AI Gateway",
                  url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/typesafe",
                  description:
                    "公式SDKのままAI Gatewayを使うための互換API。ベースURLと認証。",
                },
                {
                  title: "Vercel Docs — vercel ai-gateway（CLI）",
                  url: "https://vercel.com/docs/cli/ai-gateway",
                  description: "api-keys createの--limitと--refresh-period。",
                },
                {
                  title: "Vercel Docs — AI Gateway API keys",
                  url: "https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys",
                  description: "キーの発行・削除。",
                },
                {
                  title: "Vercel Docs — AI Gateway budgets",
                  url: "https://vercel.com/docs/ai-gateway/observability-and-spend/budgets",
                  description: "キー・プロジェクト単位の予算上限。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-account" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
