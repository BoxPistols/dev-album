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
 * アカウント登録と API キー・課金の準備
 * STEP 13: Jev セクション
 * - 直接契約（TypeSafe AI コンソール）と、Vercel AI Gateway 経由の 2 ルート
 * - ウェイトリスト、キー発行、支払い方法、予算上限
 * - 公式に確認できたことと、二次情報でしか確認できていないことを分けて書く
 */

export default function JevAccount() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 13</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          アカウント登録と API キー・課金の準備
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          コードを書く前に、Jev を呼ぶための契約とキーをそろえます。STEP 18〜22
          のサンプルアプリは実際に Jev を呼ぶので、
          ここを飛ばすと動きません。ルートは 2 つあります。TypeSafe AI
          と直接契約する方法と、Vercel AI Gateway 経由で使う方法です。
        </p>

        <WhyNowBox
          tags={[
            "ウェイトリスト",
            "API キー",
            "支払い方法",
            "予算上限",
            "Vercel AI Gateway",
          ]}
        >
          <p>
            有料 API
            は「キーを取る」だけでは動かず、支払い方法の登録や残高が要ることが多いです。
            どこで何を登録し、いくらまで使われ得るかを先に把握しておくと、初回の呼び出しで
            401 や 402 系のエラーに当たっても落ち着いて対処できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 前提 */}
          <section>
            <InfoBox type="warning" title="このページの根拠の強さについて">
              執筆環境から TypeSafe AI
              の公式サイトとコンソールに到達できなかったため、登録画面の手順は公式ドキュメントの逐語引用ではありません。
              「公式 SDK
              で確認できたこと」「公開されている紹介記事で報告されていること」「Vercel
              の公式ドキュメントに書かれていること」を分けて書きます。
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
                      A. TypeSafe AI と直接契約
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      B. Vercel AI Gateway 経由
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">
                      使う SDK
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      公式 SDK（@typesafe-ai/sdk /
                      typesafe-sdk）。本セクションのコードはこちら
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      Vercel AI SDK（ai パッケージ）の評価用 API。書き方が変わる
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">
                      登録
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      公開情報では早期アクセスのウェイトリスト制と報告されている
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
                      TYPESAFE_API_KEY（SDK が読む環境変数名として公式 SDK
                      で確認済み）
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      AI_GATEWAY_API_KEY（Vercel 公式ドキュメントで確認済み）
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">
                      向く人
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      公式 SDK の型と機能をそのまま使いたい。本教材の前提
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      すでに Vercel に課金していて、複数モデルの請求を 1
                      か所にまとめたい
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              本セクションは A を前提に進めます。A
              のウェイトリストが通るまでの間に B
              で先に触る、という使い方もできます。 ただし B は Vercel AI SDK
              の書き方になるため、STEP 14 以降のコードをそのままは使えません。
            </p>
          </section>

          {/* A: 直接契約 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <UserPlus className="text-primary" size={28} />
              2. ルート A: TypeSafe AI に登録してキーを取る
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    label: "公式サイト（typesafe.ai）で早期アクセスに申し込む",
                    desc: "公開されている紹介記事では、ウェイトリストに登録し、承認されるとメールが届くと報告されている。承認までの日数は記事によって異なる",
                  },
                  {
                    step: "2",
                    label: "コンソール（console.typesafe.ai）にログインする",
                    desc: "承認メールの案内に従う。紹介記事では設定画面の「keys」からキーを発行すると報告されている",
                  },
                  {
                    step: "3",
                    label: "API キーを発行し、表示された直後に控える",
                    desc: "多くの API サービスと同じく、キーの全文は発行時にしか表示されない前提で扱う。用途別（開発 / 本番）に分けて発行する",
                  },
                  {
                    step: "4",
                    label: "支払い方法を登録する",
                    desc: "公開情報では、公開時点で無料枠やトライアルクレジットの記載は無く、最初のリクエストから従量課金と報告されている。カード登録画面の有無と手順はコンソールの案内に従う",
                  },
                  {
                    step: "5",
                    label: "料金ページで単価を確認する",
                    desc: "課金は入力トークンのみで、出力トークンは無料（公式 SDK 同梱のスキーマに「Output tokens are currently free of charge.」と明記）。単価は改定されるので本教材には固定しない",
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
              キーが取れたら、次の 1 行で疎通を確かめます。SDK
              を入れる前に、キーと課金が有効かだけを切り分けるためです。
              エンドポイントは公式 SDK の既定値（
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                https://api.typesafe.ai
              </code>
              ）と、 SDK が呼んでいるパス（
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                GET /v1/models
              </code>
              ）から取っています。
            </p>
            <CodeBlock
              language="bash"
              title="キーの疎通確認（モデル一覧が返れば OK）"
              code={`export TYPESAFE_API_KEY="<コンソールで発行したキー>"

curl -sS https://api.typesafe.ai/v1/models \\
  -H "Authorization: Bearer $TYPESAFE_API_KEY"`}
            />
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-bold text-foreground mb-1">
                  200 でモデル一覧
                </p>
                <p className="text-sm text-muted-foreground">
                  キーと契約が有効。STEP 14 へ進む
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
                  403 / 402 系
                </p>
                <p className="text-sm text-muted-foreground">
                  権限か支払いの問題。コンソールの請求設定と、早期アクセスの承認状態を確認
                </p>
              </div>
            </div>
          </section>

          {/* B: Vercel AI Gateway */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <CreditCard className="text-primary" size={28} />
              3. ルート B: Vercel AI Gateway 経由で使う
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Vercel は 2026-09-16 付の changelog で、Jev が AI Gateway
              で使えるようになったと告知しています（モデル ID は{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                typesafe-ai/jev
              </code>
              ）。 このルートの課金とキーは Vercel 側の仕組みで、Vercel
              の公式ドキュメントで手順を確認できます。
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    label:
                      "Vercel のチームで AI Gateway のクレジットを購入する",
                    desc: "前払い制。ダッシュボードのほか、公式ドキュメントに載っている API（POST /v1/billing/buy）や MCP ツールでも購入できる。残高は GET /v1/credits で確認できる",
                  },
                  {
                    step: "2",
                    label: "AI Gateway の API キーを発行する",
                    desc: "ダッシュボードか CLI（vercel ai-gateway api-keys create）。キーごとに予算上限（--budget）と更新周期（--refresh-period）を付けられる",
                  },
                  {
                    step: "3",
                    label: "環境変数 AI_GATEWAY_API_KEY に入れる",
                    desc: ".env.local に書く。Vercel にデプロイした関数からは OIDC トークンでも認証できる",
                  },
                  {
                    step: "4",
                    label:
                      "モデル一覧で typesafe-ai/jev が見えることを確認する",
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
              title="予算上限付きのキーを CLI で作る（Vercel 公式ドキュメントの例）"
              code={`vercel ai-gateway api-keys create --name jev-dev --budget 10 --refresh-period monthly`}
            />
            <InfoBox type="info" title="ルート B での呼び出し方">
              Vercel の案内では、AI SDK の評価用 API（experimental_evaluate）で
              Jev の choice / score / boolean を扱います。 本教材の 3
              本のアプリは公式 SDK で書いているため、ルート B で進める場合は
              Vercel のナレッジベース記事「How to classify, route, and score
              with Jev and AI SDK」に沿って呼び出し部分を置き換えてください。
              置き換えるのは Route Handler の中の呼び出しだけで、判定ロジックと
              UI はそのまま使えます。
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
                  body: "漏えい時に本番だけ残して開発用を無効化できる。予算上限も別に付けられる。",
                },
                {
                  title: "予算上限を先に付ける",
                  body: "ループの中で Jev を呼ぶ設計（STEP 20 の一括評価など）は、バグで無限に呼ぶと請求が伸びる。上限が付けられる仕組みなら最初に付ける。",
                },
                {
                  title: "usage をログに残す",
                  body: "STEP 16 で扱う usage.input_tokens を毎回記録し、請求書の数字と突き合わせられるようにする。",
                },
                {
                  title: "キーは .env に置き、リポジトリに入れない",
                  body: "STEP 14 の .gitignore 確認と NEXT_PUBLIC_ を付けないルール。",
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
                  <span>ルート A なら、curl でモデル一覧が 200 で返る</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    ルート B
                    なら、クレジット残高があり、キーに予算上限が付いている
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    キーが .env（または .env.local）にあり、その行が git
                    の差分に出ない
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    料金ページで現在の単価を見て、1
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
              question="Jev の課金について、公式 SDK 同梱のスキーマから確認できることは？"
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
              explanation="スキーマの Usage は input_tokens を billable、output_tokens を「currently free of charge」と説明しています。単価そのものは改定されるので公式の料金ページで確認します。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI — Quick start",
                  url: "https://docs.typesafe.ai/introduction/quickstart",
                  description:
                    "公式のはじめ方。登録・キー発行の手順はここを正とする。",
                },
                {
                  title: "TypeSafe AI",
                  url: "https://typesafe.ai/",
                  description: "公式サイト。早期アクセスの申し込み。",
                },
                {
                  title:
                    "Vercel changelog — TypeSafe AI's Jev now available on AI Gateway",
                  url: "https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway",
                  description: "ルート B の告知。モデル ID typesafe-ai/jev。",
                },
                {
                  title:
                    "Vercel KB — How to classify, route, and score with Jev and AI SDK",
                  url: "https://vercel.com/kb/guide/typesafe-jev-and-ai-sdk",
                  description: "ルート B での呼び出し方。",
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
