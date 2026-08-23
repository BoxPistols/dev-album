import { Link } from "wouter";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

// 最小メンタルモデル: DB/サーバの概念と FE がすでに知っていることの対応
const mentalModel = [
  {
    be: "DB のテーブル（users）",
    fe: "API のリソース（/users）",
    note: "「ユーザーの集まり」を表す箱。1 テーブル ≒ 1 リソースになりやすい。",
  },
  {
    be: "テーブルの 1 行（user id=42）",
    fe: "1 件のリソース（/users/42）",
    note: "配列の 1 要素のようなもの。id で 1 件を指す。",
  },
  {
    be: "INSERT / SELECT / UPDATE / DELETE",
    fe: "POST / GET / PUT・PATCH / DELETE",
    note: "DB 操作と HTTP メソッドはほぼ 1 対 1 で対応する（CRUD）。",
  },
  {
    be: "カラムの型・NOT NULL 制約",
    fe: "スキーマの型・required（OpenAPI）",
    note: "DB の制約は、API の契約（OpenAPI スキーマ）にほぼそのまま現れる。",
  },
];

// 最短ルート（読む順）— 3 フェーズ
const phase1 = [
  {
    href: "/api/basics/what-is-api",
    title: "API とは何か",
    why: "API は「契約」。これだけは最初に腹落ちさせる",
  },
  {
    href: "/api/rest-design/http-methods",
    title: "HTTP メソッドの使い分け",
    why: "GET/POST/PUT/PATCH/DELETE = 取得/作成/更新/削除",
  },
  {
    href: "/api/rest-design/status-codes",
    title: "ステータスコード設計",
    why: "200/201/204/400/401/403/404/422/500 の意味",
  },
  {
    href: "/api/rest-design/error-handling",
    title: "エラーレスポンス設計",
    why: "失敗の「形」を知る。FE のエラー表示はここに依存する",
  },
  {
    href: "/api/openapi/swagger-ui",
    title: "Swagger UI と Redoc",
    why: "既存 API の契約を「読む」。/docs と /openapi.json",
  },
];

const phase2 = [
  {
    href: "/api/practice/react",
    title: "React での API 連携",
    why: "あなたのフレームワークで実際に叩く（Next/Vue/Nuxt も）",
  },
  {
    href: "/api/collaboration/design-and-api",
    title: "デザイン・情報設計と API",
    why: "UI 状態（loading/empty/error）↔ API。FE の強みを接続",
  },
  {
    href: "/api/quality/debugging-tools",
    title: "API のデバッグと GUI/CLI ツール",
    why: "詰まったら。DevTools Network・curl で切り分け",
  },
];

const phase3 = [
  {
    href: "/api/basics/resources",
    title: "リソースと URI 設計",
    why: "自分で設計する番になったら、まず命名から",
  },
  {
    href: "/api/rest-design/request-response",
    title: "リクエスト/レスポンス設計",
    why: "一貫性。命名・日時・エラー形を揃える",
  },
  {
    href: "/api/build/auth",
    title: "認証と認可",
    why: "401 と 403、トークンの付け方",
  },
  {
    href: "/api/collaboration/backend-frontend",
    title: "BE と FE の API 設計",
    why: "契約ファーストでバックエンドと協業する",
  },
  {
    href: "/api/advanced/summary",
    title: "設計まとめとチェックリスト",
    why: "最後に全体をチェックリストで振り返る",
  },
];

function RoadmapList({
  items,
}: {
  items: { href: string; title: string; why: string }[];
}) {
  return (
    <ol className="space-y-2">
      {items.map((item, i) => (
        <li key={item.href}>
          <Link href={item.href} className="group block">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 hover:border-primary/40 transition-colors">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div className="min-w-0">
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </span>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {item.why}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export default function Quickstart() {
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
            現場で急ぐ人のクイックスタート（FE 向け）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            「フロントは書けるが、バックエンドやデータベースは苦手。なのに現場で
            API 設計や連携をすぐやることになった」——このページは、そんな状況で
            <strong>要点だけを最短で身に付ける</strong>ための地図です。
            このマニュアルを頭から全部読む必要はありません。読む順番を絞ります。
          </p>
        </div>

        <WhyNowBox
          tags={["クイックスタート", "FE", "BE/DB 苦手", "最短", "現場"]}
        >
          <p>
            API は「バックエンドの人のもの」に見えますが、実際にデータを表示し、
            フォームを送り、エラーやローディングを出すのは
            <strong>フロントエンドのあなた</strong>です。 つまり API
            の良し悪しを最初に体感するのも、契約のズレで最初に困るのも FE
            側です。 だから「DB を完全に理解してから」ではなく、
            <strong>契約（API の約束）の読み書きから</strong>
            始めるのが、現場での最短ルートになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* このページの使い方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              このページの使い方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              下の最短ルートを<strong>上から順に</strong>たどってください。
              各リンクはこのマニュアル内の該当ページに飛びます。
              全部を完璧にする必要はありません。まず Phase 1 の 5
              つだけ押さえれば、既存 API を読んで連携できるようになります。
              「自分で設計する番」が来たら Phase 2・3 に進みます。
            </p>
            <InfoBox type="info" title="完璧主義を捨てる">
              急いでいるときに一番の敵は「全部わかってから手を動かそう」という完璧主義です。
              API は<strong>動かしながら</strong>理解するのが最速です。 まず 1
              本リクエストを送って、返ってきた JSON
              を画面に出す——そこから逆算して必要な知識を埋めます。
            </InfoBox>
          </section>

          {/* 最小限の BE/DB メンタルモデル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              最小限の「BE / DB」メンタルモデル
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              バックエンドやデータベースを深く学ぶ必要は、今はありません。
              次の対応関係だけ頭に入れれば十分です。
              <strong>
                あなたが普段触っている FE の概念に、ほぼ 1 対 1 で対応します。
              </strong>
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      バックエンド / DB
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      API / FE から見ると
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      ひとこと
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mentalModel.map((m) => (
                    <tr key={m.be} className="border-b border-border">
                      <td className="py-2 pr-4 text-muted-foreground align-top">
                        {m.be}
                      </td>
                      <td className="py-2 px-4 text-primary font-medium align-top">
                        {m.fe}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {m.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              つまり、API を触るうえで実際に必要なのは
              <strong>
                「DB
                の中身」ではなく「契約（どんな住所に、どう頼むと、どんな形で返るか）」
              </strong>
              です。その契約は OpenAPI（Swagger）という形で読めます。
            </p>

            <InfoBox
              type="success"
              title="あなたの FE スキルはそのまま武器になる"
            >
              型（TypeScript）が分かるなら、OpenAPI
              からの型生成（openapi-typescript）で 「DB を知らなくても型安全に
              API を呼ぶ」ことができます。 UI 状態（loading / empty /
              error）を設計できるなら、それは API
              のレスポンス状態の理解とほぼ同じです。新しく覚えることは思ったより少ないです。
            </InfoBox>
          </section>

          {/* 最短ルート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              最短ルート（読む順）
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    Phase 1
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    まず「既存 API を読んで連携できる」になる
                  </span>
                </div>
                <RoadmapList items={phase1} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    Phase 2
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    実装して、詰まったら直せるようになる
                  </span>
                </div>
                <RoadmapList items={phase2} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    Phase 3
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    自分で設計し、チームで効かせる
                  </span>
                </div>
                <RoadmapList items={phase3} />
              </div>
            </div>
          </section>

          {/* 詰まったときの最短デバッグ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              詰まったときの最短デバッグ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              連携がうまくいかないときは、まず「どの層で壊れているか」を切り分けます。
              ブラウザの DevTools の Network
              パネルでステータスとレスポンスを見て、 同じリクエストを{" "}
              <code>curl</code> で再現するのが基本です。
            </p>

            <CodeBlock
              language="bash"
              title="まず curl で再現して切り分ける"
              code={`# ヘッダーごと見る（-i）。返ってくるステータスと本文を確認
curl -i https://api.example.com/v1/users/42

# curl では通るのにブラウザだけ失敗する → CORS かクライアント側の問題
# curl でも失敗する → サーバ（バックエンド）側の問題`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm font-bold text-foreground mb-1">
                  401 / 403 が出る
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  401 = 認証できていない（トークン無し/無効）。403 =
                  認証は通ったが権限が無い。トークンの付け方を見直す。
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm font-bold text-foreground mb-1">
                  422 / 400 が出る
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  送ったボディが契約に合っていない。Content-Type
                  と必須フィールドを確認する。
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm font-bold text-foreground mb-1">
                  画面だけ CORS エラー
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  CORS はブラウザだけが強制する。curl
                  では通る。サーバの許可オリジン設定の問題。
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm font-bold text-foreground mb-1">
                  5xx / タイムアウト
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  サーバ側の異常。自分の FE では直せない。BE
                  担当に状況（リクエストと時刻）を渡す。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              もっと詳しい手順とツール（Postman / Bruno / HTTPie / DevTools
              の読み方）は{" "}
              <Link
                href="/api/quality/debugging-tools"
                className="text-primary font-medium underline underline-offset-2"
              >
                API のデバッグと GUI / CLI ツール
              </Link>{" "}
              にまとめています。
            </p>
          </section>

          {/* Quiz */}
          <section>
            <Quiz
              question="BE/DB が苦手な FE エンジニアが、現場で API 連携を最短で始めるとき、まず身に付けるべきは？"
              options={[
                { label: "データベースの正規化とインデックス設計" },
                {
                  label:
                    "API の「契約」（どの URL に、どう頼むと、どんな形で返るか）を読み書きすること",
                  correct: true,
                },
                { label: "サーバの OS とインフラ構成" },
                { label: "SQL のチューニング" },
              ]}
              explanation="FE が API を扱ううえで必要なのは DB の内部知識ではなく「契約」です。どのエンドポイントに、どんなリクエストを送ると、どんなレスポンス（成功・エラーの形）が返るか——これは OpenAPI/Swagger で読めます。DB の深い知識は、必要になってから少しずつで十分です。"
            />
          </section>

          {/* やらなくていいこと */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              今はやらなくていいこと
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              急いでいるときに手を広げすぎると、かえって進みません。
              次のトピックは重要ですが、
              <strong>最初の連携が動くまでは後回し</strong>で構いません。
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <li className="rounded-lg border border-border bg-muted/50 p-3">
                データベースの設計・SQL チューニング（BE
                担当の領域。契約だけ理解すれば連携できる）
              </li>
              <li className="rounded-lg border border-border bg-muted/50 p-3">
                gRPC や GraphQL などの代替プロトコル（まず REST + OpenAPI
                で十分）
              </li>
              <li className="rounded-lg border border-border bg-muted/50 p-3">
                分散トレーシングや高度な可観測性（運用フェーズで必要になってから）
              </li>
              <li className="rounded-lg border border-border bg-muted/50 p-3">
                Webhooks・契約テスト・Spectral（チームで品質を固める段階で）
              </li>
            </ul>
            <InfoBox type="warning" title="後回し = 不要ではない">
              ここで「後回し」と言ったものは、不要という意味ではありません。
              現場で API
              を一通り扱えるようになったら、このマニュアルの該当章で順に身に付けてください。
              今は「最初の 1 周を最短で回す」ことを優先します。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "MDN - HTTP の概要",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/Overview",
                  description:
                    "API の土台となる HTTP の最小知識。日本語で読める",
                },
                {
                  title: "Swagger Petstore（実物の Swagger UI）",
                  url: "https://petstore.swagger.io/",
                  description:
                    "公開されている Swagger UI。Try it out で契約の読み方を体感できる",
                },
                {
                  title: "openapi-typescript",
                  url: "https://openapi-ts.dev/",
                  description:
                    "OpenAPI から TypeScript 型を生成。DB を知らなくても型安全に呼べる",
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
