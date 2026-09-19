import { KeyRound, Terminal, ShieldAlert, Wrench } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * Jev の開発環境構築
 * STEP 14: Jev セクション
 * - API キーと環境変数
 * - Node.js SDK / Python SDK の導入
 * - 最初の呼び出しと応答の確認
 * - ブラウザから呼ばない構成
 * - 環境変数と既定値の一覧、よくあるエラー
 */

export default function JevSetup() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 14</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          Jev の開発環境構築
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          API キーの取得から、Node.js と Python それぞれの公式 SDK
          の導入、最初の呼び出しまでを一通り行います。 SDK
          がブラウザからの呼び出しを既定で拒否する理由も、ここで先に押さえます。
        </p>

        <WhyNowBox
          tags={[
            "TYPESAFE_API_KEY",
            "@typesafe-ai/sdk",
            "typesafe-sdk",
            "Node.js 20",
            "Python 3.10",
          ]}
        >
          <p>
            Jev の API はキー 1
            つで呼べます。環境構築で詰まる箇所は、キーの置き場所と、どこから呼ぶかの
            2 点です。 この 2
            点を最初に正しく決めておくと、後のサンプルアプリでそのまま使い回せます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* API キー */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <KeyRound className="text-primary" size={28} />
              1. API キーと環境変数
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              公式の両 SDK は、環境変数{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                TYPESAFE_API_KEY
              </code>{" "}
              から キーを読みます。Python SDK の README は「Set TYPESAFE_API_KEY
              in your environment, then instantiate and use the
              client:」と書いています。 キーは TypeSafe AI
              のコンソールで発行します（公式サイトの案内に従ってください）。
            </p>
            <CodeBlock
              language="bash"
              title=".env（リポジトリにはコミットしない）"
              code={`TYPESAFE_API_KEY=<コンソールで発行したキーをそのまま貼る>`}
            />
            <p className="text-muted-foreground mt-3 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                .gitignore
              </code>{" "}
              に{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                .env
              </code>{" "}
              が入っていることを先に確認します。 Next.js は{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                .env.local
              </code>{" "}
              をサーバー側で自動で読みます。 Python では{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                python-dotenv
              </code>{" "}
              を使うか、シェルで export します。
            </p>
            <InfoBox type="warning" title="NEXT_PUBLIC_ を付けない">
              Next.js で環境変数名に{" "}
              <code className="text-sm bg-muted px-1 rounded">
                NEXT_PUBLIC_
              </code>{" "}
              を付けると、その値はブラウザに配布されるバンドルへ埋め込まれます。
              API キーは必ずプレフィックス無しのまま、サーバー側（Route Handler
              / Server Actions）からだけ参照します。
            </InfoBox>
          </section>

          {/* Node.js */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Terminal className="text-primary" size={28} />
              2. Node.js / TypeScript SDK
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              公式パッケージは{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                @typesafe-ai/sdk
              </code>{" "}
              です。 README は Node.js 20
              以上を前提にしています。ESM・CommonJS・TypeScript
              の型宣言が同梱されています。
            </p>
            <CodeBlock
              language="bash"
              title="インストール"
              code={`npm install @typesafe-ai/sdk
# pnpm add @typesafe-ai/sdk / yarn add @typesafe-ai/sdk でも同じ`}
            />
            <p className="text-muted-foreground mt-6 mb-4 leading-relaxed">
              最初の呼び出しです。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                TypeSafeClient
              </code>{" "}
              は引数なしで作ると環境変数からキーを読みます。 質問は{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                noul
              </code>{" "}
              /{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                choice
              </code>{" "}
              /{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                score
              </code>{" "}
              のヘルパーで作ります。
            </p>
            <CodeBlock
              language="ts"
              title="hello-jev.ts"
              code={`import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const { answers, model, usage } = await client.systemOne({
  state: "I was charged twice. Please help.",
  questions: {
    billing: noul("Is this about billing?"),
  },
});

console.log(model);                 // 例: "jev-latest"（実際に答えたモデル名）
console.log(answers.billing.noul);  // 0〜1 の数値。1 に近いほど「はい」
console.log(usage);                 // { input_tokens, output_tokens }`}
            />
            <CodeBlock
              language="bash"
              title="実行（Node.js 20 以上。TypeScript は tsx で直接実行）"
              code={`npx tsx hello-jev.ts`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                answers.billing.noul
              </code>{" "}
              が数値で出れば環境構築は完了です。 型定義上、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                answers
              </code>{" "}
              のキーと答えの型は、渡した questions から推論されます。 README
              はこれを「Answer types are inferred from your
              questions.」と説明しています。
            </p>
          </section>

          {/* Python */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              3. Python SDK
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              公式パッケージは{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                typesafe-sdk
              </code>
              （Python 3.10 以上）です。 README は{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                uv add
              </code>{" "}
              で案内していますが、pip でも入ります。 名前の似た別パッケージ（
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                typesafe
              </code>{" "}
              など）は無関係なので、名前を正確に打ちます。
            </p>
            <CodeBlock
              language="bash"
              title="インストール"
              code={`uv add typesafe-sdk
# または
pip install typesafe-sdk`}
            />
            <CodeBlock
              language="python"
              title="hello_jev.py（公式 README の例）"
              code={`from typesafe_sdk import Choice, TypeSafeClient

with TypeSafeClient() as client:
    response = client.system_one(
        state={"document": "I was charged twice. Please fix this ASAP."},
        questions={
            "category": Choice(
                instructions="What is this ticket about?",
                criteria={"billing": None, "technical": None, "other": None},
            ),
        },
    )

print(response.choices["category"].choice)`}
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Python 側は{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                with
              </code>{" "}
              で接続を閉じます。 応答は{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                response.answers
              </code>{" "}
              に全質問分が入り、 型ごとに絞った{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                nouls
              </code>{" "}
              /{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                choices
              </code>{" "}
              /{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                scores
              </code>{" "}
              も用意されています。 非同期版は{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                AsyncTypeSafeClient
              </code>{" "}
              です。
            </p>
          </section>

          {/* ブラウザから呼ばない */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <ShieldAlert className="text-primary" size={28} />
              4. ブラウザからは呼ばない
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JavaScript SDK
              は、ブラウザで実行されていることを検出すると初期化時にエラーを投げます。
              型定義のオプション{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                dangerouslyAllowBrowser
              </code>{" "}
              の説明は 「Allow browser use, exposing the API key to page users.
              Default: false.」です。 名前のとおり、これを true
              にするとページを開いた全員に API キーを渡すことになります。
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-sm font-semibold text-foreground mb-4">
                推奨する構成
              </p>
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    label: "ブラウザ（React）",
                    desc: "判断したい内容を自分のサーバーの API に POST する",
                  },
                  {
                    step: "2",
                    label: "サーバー（Next.js Route Handler など）",
                    desc: "TYPESAFE_API_KEY を持ち、SDK で Jev を呼ぶ",
                  },
                  {
                    step: "3",
                    label: "ブラウザ（React）",
                    desc: "サーバーが整形した結果（ラベル・確率）だけを受け取って描画する",
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
              STEP 18〜20 のサンプルアプリはこの構成で、実際に Jev
              を呼んで動かします。学習ステップ（STEP
              15〜16）のチャレンジはブラウザ内の練習なので API を呼びませんが、
              サンプルアプリでは STEP 13 で用意した API キーが必要です。
            </p>
          </section>

          {/* 環境変数と既定値 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Wrench className="text-primary" size={28} />
              5. 環境変数と既定値
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              両 SDK
              は同じ環境変数名を使います。コードで渡した値が環境変数より優先されます。既定値は
              SDK に同梱された定義から起こしています。
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      環境変数
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      役割
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      既定値
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      TYPESAFE_API_KEY
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      API キー（必須）
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      無し。未設定だと初期化時にエラー
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      TYPESAFE_BASE_URL
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      API のルート URL
                    </td>
                    <td className="py-3 px-4 text-muted-foreground font-mono text-xs">
                      https://api.typesafe.ai
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      TYPESAFE_DEFAULT_MODEL
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      model を省略したときのモデル名
                    </td>
                    <td className="py-3 px-4 text-muted-foreground font-mono text-xs">
                      jev-latest
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">
                      TYPESAFE_LOG_LEVEL
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      SDK のログ量（debug / info / warn / error / off）
                    </td>
                    <td className="py-3 px-4 text-muted-foreground font-mono text-xs">
                      warn
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              タイムアウトの既定は JavaScript SDK が 1 試行あたり 10000
              ミリ秒、Python SDK が 10.0 秒です。リトライの既定は STEP 16
              で扱います。
              <code className="text-sm bg-muted px-1 rounded">
                TYPESAFE_LOG_LEVEL=debug
              </code>{" "}
              はリクエストのヘッダーと本文をログに出します。
              型定義の注記どおり、キーなどの認証ヘッダーは伏せられますが本文は伏せられないので、本番では使いません。
            </p>
          </section>

          {/* よくあるエラー */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              よくあるエラーと対処
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-mono text-xs text-foreground mb-2">
                  TypeSafeError: No API key was provided. Pass `apiKey` to the
                  TypeSafeClient constructor or set the TYPESAFE_API_KEY
                  environment variable.
                </p>
                <p className="text-sm text-muted-foreground">
                  環境変数が読めていません。Next.js なら .env.local
                  の置き場所（プロジェクトルート）と、dev
                  サーバーの再起動を確認します。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-mono text-xs text-foreground mb-2">
                  TypeSafeError: TypeSafeClient is running in a browser, which
                  would expose your API key to anyone using the page. …
                </p>
                <p className="text-sm text-muted-foreground">
                  クライアントコンポーネントから SDK を import
                  しています。呼び出しを Route Handler か Server Action
                  に移します。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-mono text-xs text-foreground mb-2">
                  AuthenticationError（HTTP 401）
                </p>
                <p className="text-sm text-muted-foreground">
                  キーの値が違うか失効しています。コンソールで再発行し、前後の空白や引用符が混ざっていないかを見ます。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-mono text-xs text-foreground mb-2">
                  TypeSafeError: At least one question is required.
                </p>
                <p className="text-sm text-muted-foreground">
                  questions が空です。SDK は送信前に検査して弾きます。score の
                  criteria が 2 段階未満のときも同様にローカルで弾かれます。
                </p>
              </div>
            </div>
          </section>

          {/* Challenge */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              コーディングチャレンジ
            </h2>
            <CodingChallenge
              title="最初の呼び出しを完成させる"
              description="___ を埋めて、環境変数からキーを読むクライアントで noul の質問を 1 つ投げ、確率を表示するコードにしてください。"
              preview={false}
              previewType="terminal"
              initialCode={`import { noul, ___ } from "@typesafe-ai/sdk";

const client = new ___();

const { answers } = await client.___({
  state: "The build failed after upgrading Node.js.",
  questions: {
    technical: noul("Is this a technical issue?"),
  },
});

console.log(answers.technical.___);`}
              answer={`import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const { answers } = await client.systemOne({
  state: "The build failed after upgrading Node.js.",
  questions: {
    technical: noul("Is this a technical issue?"),
  },
});

console.log(answers.technical.noul);`}
              hints={[
                "クライアントのクラス名は TypeSafeClient です。引数なしで環境変数を読みます",
                "質問を投げるメソッドは systemOne です（Python では system_one）",
                "noul の答えは、質問名の下の noul プロパティに 0〜1 の数値で入ります",
              ]}
              keywords={["TypeSafeClient", "systemOne", ".noul"]}
            />
          </section>

          {/* Quiz */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="Next.js アプリで Jev を呼ぶ場所として適切なのは？"
              options={[
                { label: "クライアントコンポーネントの useEffect の中" },
                {
                  label: "Route Handler や Server Action などサーバー側",
                  correct: true,
                },
                {
                  label:
                    "NEXT_PUBLIC_TYPESAFE_API_KEY を定義してブラウザから直接",
                },
                { label: "どこでも同じ" },
              ]}
              explanation="SDK はブラウザ実行を既定で拒否します。API キーはサーバー側だけが持ち、ブラウザには整形済みの結果だけを返す構成にします。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs — JavaScript SDK",
                  url: "https://docs.typesafe.ai/sdk/javascript",
                  description:
                    "npm パッケージの homepage に指定されている SDK ドキュメント。",
                },
                {
                  title: "TypeSafe AI Docs — Python SDK",
                  url: "https://docs.typesafe.ai/sdk/python/",
                  description:
                    "PyPI パッケージの Documentation に指定されている SDK ドキュメント。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-setup" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
