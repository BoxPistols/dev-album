import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodingChallenge from "@/components/CodingChallenge";

const useCases = [
  {
    title: "認証チェック",
    examples: "Cookie / JWT の検証",
    description:
      "ページに到達する前にトークンを確認し、未認証ならログインへリダイレクト。オリジンまで届かせず門前で弾ける。",
  },
  {
    title: "A/B テスト",
    examples: "出し分け・フラグ",
    description:
      "リクエスト時に振り分けを決め、Cookie に保持。エッジで判定するため初回表示が速い。",
  },
  {
    title: "geo 振り分け",
    examples: "国・地域での分岐",
    description:
      "リクエストの地理情報をもとに、言語や地域別ページへ案内する。エッジは利用者の位置を把握しやすい。",
  },
  {
    title: "リライト / リダイレクト",
    examples: "URL の書き換え",
    description:
      "パスの正規化や旧 URL の転送を、アプリ本体を呼ぶ前に処理する。設定の集約点になる。",
  },
];

export default function EdgeFunctions() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        {/* Header */}
        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            エッジ関数とエッジコンピューティング
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            エッジ関数は、CDN
            のエッジ上で短いコードを実行する仕組みです。利用者に近い場所で
            認証やリライトといった処理を挟めるのが特徴です。
            このページでは、エッジランタイム（V8 isolate）と Node
            ランタイムの違い、 Web 標準 API に寄せる
            WinterTC（旧 WinterCG）の流れ、そして制約とユースケースを整理します。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "エッジ関数",
            "V8 isolate",
            "WinterTC",
            "Middleware",
            "Web標準",
          ]}
        >
          <p>
            Next.js の Middleware や Vercel・Cloudflare のエッジ実行は、
            「サーバレス関数の一種」に見えて、実は
            <strong>動く土台が違います</strong>。
            この違いを知らないと、ローカルでは動いたコードがエッジで
            <code>Module not found</code> になって戸惑います。
            エッジランタイムが何をできて何をできないかを先に押さえると、
            どこに何を置くべきかの判断が速くなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* V8 isolate vs Node */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              エッジランタイム（V8 isolate）と Node ランタイムの違い
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              通常のサーバレス関数は <strong>Node.js</strong>{" "}
              プロセスを起動して動きます。 これに対しエッジ関数の多くは{" "}
              <strong>V8 isolate</strong> という軽量な実行単位で動きます。
              isolate は OS プロセスより起動が速く、メモリも軽いため、
              コールドスタートをほぼ意識せず世界中のエッジで走らせられます。
              代わりに Node の
              API（ファイルシステムやネイティブモジュール）は使えません。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      観点
                    </th>
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      エッジ（V8 isolate）
                    </th>
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      Node ランタイム
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">起動</td>
                    <td className="py-2 px-3">
                      ごく軽量、コールドスタートが小さい
                    </td>
                    <td className="py-2 px-3">プロセス起動が必要</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">API</td>
                    <td className="py-2 px-3">Web 標準 API 中心</td>
                    <td className="py-2 px-3">Node API フルセット</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">ファイル/ネイティブ</td>
                    <td className="py-2 px-3">fs・net・ネイティブ拡張は不可</td>
                    <td className="py-2 px-3">利用可能</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">実行場所</td>
                    <td className="py-2 px-3">世界中のエッジ</td>
                    <td className="py-2 px-3">特定リージョン</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="isolate は「コンテナより小さい箱」">
              isolate は 1 つの V8 エンジン内で互いに隔離された実行単位です。
              プロセスやコンテナを丸ごと立てるより圧倒的に軽いため、
              リクエストごとに使い捨てても起動コストがほぼ表に出ません。
              この軽さがエッジ全域への展開を可能にしています。
            </InfoBox>
          </section>

          {/* WinterTC と Web 標準 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              WinterTC と Web 標準 API
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              エッジランタイムが Node API
              を持たないなら、何を頼りにコードを書くのか。 答えが
              <strong>Web 標準 API</strong>です。 <code>fetch</code>・
              <code>Request</code>・<code>Response</code>・<code>URL</code>・
              <code>Headers</code>・<code>crypto.subtle</code>{" "}
              といった、ブラウザでも使える API がエッジでも使えます。
              この「ランタイム間で共通の最小 API」を揃えようとする取り組みが
              <strong>WinterTC</strong>（Ecma International の技術委員会 TC55、旧
              WinterCG）で、その成果物が
              <strong>Minimum common web API</strong>{" "}
              仕様です（2026 年 7 月 31 日付ドラフト）。
            </p>

            <CodeBlock
              language="ts"
              title="Web 標準 API だけで書いたエッジ処理"
              code={`// fetch / Request / Response はブラウザと共通の Web 標準 API
export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  const data = await fetch("https://api.example.com/ping").then((r) => r.json());
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              Web 標準に寄せておくと、Vercel・Cloudflare・Deno
              など複数のエッジ環境で
              同じコードが動きやすくなります。「ブラウザで使える API
              を選ぶ」が指針です。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="エッジランタイム（V8 isolate）でコードを書くとき、優先して使うべき API はどれ？"
              options={[
                { label: "Node の fs・path・net モジュール" },
                {
                  label: "fetch / Request / Response などの Web 標準 API",
                  correct: true,
                },
                { label: "OS 固有のネイティブ拡張" },
                { label: "child_process によるプロセス起動" },
              ]}
              explanation="エッジランタイムは Node API のフルセットを持たず、Web 標準 API を中心に提供します。fetch・Request・Response・URL・crypto.subtle などブラウザ互換の API を使えば、複数のエッジ環境で同じコードが動きやすくなります。fs や net、ネイティブ拡張、child_process は使えません。"
            />
          </section>

          {/* Next.js Middleware / Edge Runtime */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Next.js の Middleware と Edge Runtime
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Next.js でエッジ実行に触れる代表例が <code>middleware.ts</code>{" "}
              です。 これはリクエストがページやルートに届く<strong>前</strong>
              に走り、 リダイレクト・リライト・ヘッダ付与などを行えます。
              ルートやページ自体も <code>runtime: "edge"</code>{" "}
              を指定すればエッジで動かせますが、 その場合は前述の制約（Node API
              不可）を受けます。
            </p>

            <CodeBlock
              language="ts"
              title="middleware.ts — 認証チェックの例"
              code={`import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;

  // 未認証ならログインへ。ページに到達する前にエッジで弾く
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// /dashboard 以下にだけ適用する
export const config = { matcher: ["/dashboard/:path*"] };`}
            />

            <InfoBox type="success" title="Middleware は「門番」">
              Middleware は全リクエストの入口に立つ門番です。
              ここで認証・リダイレクト・国別振り分けをまとめて処理すると、
              個々のページに同じ判定を書かずに済みます。matcher
              で適用範囲を絞るのがコツです。
            </InfoBox>

            <MermaidDiagram
              title="図: リクエストが middleware を通ってページに届くまで"
              chart={`sequenceDiagram
    participant U as "利用者"
    participant M as "middleware(エッジ)"
    participant P as "ページ / ルート"
    U->>M: "リクエスト"
    alt "未認証"
      M-->>U: "ログインへリダイレクト"
    else "認証済み"
      M->>P: "next() で通過"
      P-->>U: "ページを返す"
    end`}
            />

            <InfoBox type="info" title="この領域は動きが速い（2026 年時点）">
              エッジ実行の API は標準化が進む一方で、各プラットフォームの「推奨」は
              変わり続けています。たとえば Vercel は、単独の Edge Functions より
              Node.js ランタイム（Fluid compute）を既定として案内する方向に動いており、
              Next.js でも <code>middleware</code> の呼び名や位置づけが見直されています。
              ここで重要なのは個別の名前ではなく、「ユーザーに近い場所で軽い処理を素早く返す」
              というモデルです。具体的な設定名・既定値は、必ず利用時点の公式ドキュメントで確認してください。
            </InfoBox>
          </section>

          {/* 制約（仕様 vs 実測） */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              制約：使えない API と CPU 時間
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              エッジ関数には明確な制約があります。Node の <code>fs</code>・
              <code>net</code>{" "}
              などは使えず、ネイティブ依存のライブラリも動きません。 さらに、1
              リクエストあたりの<strong>CPU 時間</strong>に上限があります。
              長い計算や重い処理は、エッジではなく通常のサーバレス関数（Node
              ランタイム）に寄せるのが基本です。
            </p>

            <InfoBox type="warning" title="仕様と実測のズレ：CPU 時間 ≠ 実時間">
              仕様上の制限は多くが「実時間」ではなく「CPU 時間」で定義されます。
              つまり、外部 API を待っている間（I/O 待ち）は CPU
              を消費しないため、 全体の応答が数秒かかっても CPU
              時間としては収まることがあります。 逆に、JSON
              の巨大なパースや暗号計算など CPU を使い続ける処理は、
              実時間が短くても上限に当たります。「重いのは時間ではなく計算量」と捉えると、
              どの処理をエッジに置けるかの判断がぶれません。具体的な上限値はプラットフォームとプランで変わるため、
              利用先のドキュメントで都度確認してください。
            </InfoBox>
          </section>

          {/* ユースケース */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              エッジ関数が向くユースケース
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              エッジ関数は「軽くて、利用者に近い場所で完結すると嬉しい処理」に向きます。
              リクエストの入口で素早く判定し、必要に応じて振り分ける用途が代表例です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {useCases.map((u) => (
                <div
                  key={u.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {u.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {u.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {u.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              いずれも「アプリ本体に届く前に、近い場所で素早く判断する」という共通点があります。
              逆に、重い計算・大きな依存ライブラリ・データベースとの長い処理は、
              Node
              ランタイムのサーバレス関数に任せると役割分担が明確になります。
            </p>

            <div className="mt-8">
              <CodingChallenge
                preview
                previewType="config"
                title="ハンズオン: middleware の matcher を埋めよう"
                description="middleware を /dashboard 以下のパスにだけ適用する matcher を書いてください。:path* で配下のパスをまとめて指定します。"
                initialCode={`// middleware.ts の末尾。/dashboard 以下にだけ適用する
// /dashboard とその配下すべてにマッチさせる
export const config = { matcher: ["___"] };`}
                answer={`// middleware.ts の末尾。/dashboard 以下にだけ適用する
// /dashboard とその配下すべてにマッチさせる
export const config = { matcher: ["/dashboard/:path*"] };`}
                hints={[
                  "/dashboard 配下を再帰的に指す書き方は /dashboard/:path*",
                ]}
                keywords={["/dashboard/:path*"]}
              />
            </div>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="エッジ関数の CPU 時間制限について、正しい理解はどれ？"
              options={[
                {
                  label:
                    "外部 API を待っている I/O 待ちの時間も CPU 時間に数える",
                },
                {
                  label:
                    "CPU 時間は計算で消費する時間で、I/O 待ちは消費しない。重い計算が上限に当たりやすい",
                  correct: true,
                },
                { label: "実時間が短ければ必ず制限に収まる" },
                { label: "CPU 時間に上限はなく、好きなだけ計算してよい" },
              ]}
              explanation="制限は多くが実時間ではなく CPU 時間で定義されます。外部 API を待つ I/O 待ちの間は CPU を消費しないため上限に響きにくく、逆に巨大な JSON パースや暗号計算など CPU を使い続ける処理が上限に当たりやすくなります。重い計算は Node ランタイム側へ寄せるのが定石です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Next.js - Middleware",
                  url: "https://nextjs.org/docs/app/api-reference/file-conventions/middleware",
                  description:
                    "middleware.ts でリクエスト前にリダイレクト・リライトを行う公式ガイド",
                },
                {
                  title: "Vercel - Edge Functions",
                  url: "https://vercel.com/docs/functions/runtimes/edge",
                  description:
                    "エッジランタイムの実行モデル・対応 API・制約のリファレンス",
                },
                {
                  title: "Cloudflare Workers - Runtime APIs",
                  url: "https://developers.cloudflare.com/workers/runtime-apis/",
                  description:
                    "Workers が提供する Web 標準ベースのランタイム API 一覧",
                },
                {
                  title: "WinterTC（TC55）- Minimum common web API",
                  url: "https://min-common-api.proposal.wintertc.org/",
                  description:
                    "ランタイム横断で共通化を目指す Web 標準 API の仕様提案",
                },
              ]}
            />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
