import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

// 検証する観点（型・必須・範囲・形式・列挙値）を 1 枚で見渡せる表データ
const validationAxes = [
  {
    axis: "型（type）",
    example: "age は数値、name は文字列",
    failure: '文字列 "twenty" が age に来る',
  },
  {
    axis: "必須（required）",
    example: "email は省略不可",
    failure: "email フィールドが欠落している",
  },
  {
    axis: "範囲（min / max）",
    example: "age は 0〜120、quantity は 1 以上",
    failure: "age が -5 や 999 で来る",
  },
  {
    axis: "形式（format）",
    example: "email 形式、文字数、正規表現",
    failure: '"abc" が email として来る',
  },
  {
    axis: "列挙値（enum）",
    example: "role は admin / member のみ",
    failure: "role に superuser が来る",
  },
];

export default function Validation() {
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
            入力バリデーション
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            API に届くデータは、すべて「信頼できない入力」として扱います。
            クライアントからのリクエストは改ざん・誤送信・悪意のいずれの可能性もあるため、
            サーバ側で型・必須・範囲・形式を必ず検証してから処理に渡します。
            この章では、何を・どこで・どう検証し、失敗をどう返すかを整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["バリデーション", "防御的設計", "Zod", "JSON Schema", "422"]}
        >
          <p>
            フロントエンドで入力チェックを書くと、つい「これでデータは綺麗だ」と安心しがちです。
            しかし HTTP リクエストは <code>curl</code> や DevTools
            から自由に送れるため、 ブラウザ側の検証は{" "}
            <strong>いつでも迂回されます</strong>。 API
            を設計する立場では「クライアント検証は UX
            のため、サーバ検証はセキュリティのため」
            という役割分担を最初に腹落ちさせておくことが、後の事故を大きく減らします。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 2層の検証 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              クライアント検証とサーバ検証は別物
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              入力検証は「どちらか一方」ではなく、目的の違う 2
              層として両方を用意します。
              クライアント側は送信前にエラーを即時表示して{" "}
              <strong>UX を良くする</strong>ためのもの。
              サーバ側は不正なデータを
              <strong>絶対に通さない</strong>ための最後の砦です。 ブラウザの
              JavaScript は無効化も改変もできるので、
              サーバ検証を省略すると防御がまるごと消えます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    クライアント検証（UX）
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    入力中に即フィードバック。無駄な往復を減らす。
                    ただし迂回可能なので「親切機能」であってセキュリティ境界ではない。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    サーバ検証（セキュリティ）
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    信頼境界。改ざんされたリクエストも含めて必ず再検証する。
                    ここを通ったデータだけがビジネスロジックに渡る。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox
              type="warning"
              title="クライアント検証はセキュリティではない"
            >
              ブラウザ側の検証は迂回されることを前提に設計します。
              攻撃者は画面を一切使わず、HTTP
              リクエストを直接組み立てて送れるからです。
              サーバ検証は「念のため」ではなく「必須」です。
            </InfoBox>
          </section>

          {/* どこで検証するか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              どこで検証するか — 境界で、できるだけ早く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              検証は API 境界（リクエストを受け取った直後）で、
              ビジネスロジックに渡る<strong>前</strong>に行います。
              早期に弾けば、不正なデータがデータベースアクセスや決済処理など
              「副作用のある層」に流れ込むのを防げます。
              逆に検証を後回しにすると、途中まで処理が進んでから失敗し、
              中途半端な状態が残りやすくなります。
            </p>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-xs">
                <div className="rounded-lg bg-muted border border-border p-3">
                  <p className="font-bold text-foreground mb-1">
                    リクエスト受信
                  </p>
                  <p className="text-muted-foreground">
                    生の入力（信頼しない）
                  </p>
                </div>
                <div className="rounded-lg bg-primary/10 border border-primary/30 p-3">
                  <p className="font-bold text-primary mb-1">バリデーション</p>
                  <p className="text-muted-foreground">
                    ここで弾く。失敗なら即レスポンス
                  </p>
                </div>
                <div className="rounded-lg bg-muted border border-border p-3">
                  <p className="font-bold text-foreground mb-1">
                    ビジネスロジック
                  </p>
                  <p className="text-muted-foreground">検証済みデータのみ</p>
                </div>
                <div className="rounded-lg bg-muted border border-border p-3">
                  <p className="font-bold text-foreground mb-1">
                    永続化 / 副作用
                  </p>
                  <p className="text-muted-foreground">DB・外部 API など</p>
                </div>
              </div>
            </div>
          </section>

          {/* 何を検証するか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              何を検証するか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              検証する観点は大きく 5
              つに整理できます。各フィールドについて、これらを宣言的に定義しておくと
              抜け漏れを防げます。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="text-left font-bold text-foreground p-3">
                      観点
                    </th>
                    <th className="text-left font-bold text-foreground p-3">
                      例
                    </th>
                    <th className="text-left font-bold text-foreground p-3">
                      弾くべき入力
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {validationAxes.map((row) => (
                    <tr
                      key={row.axis}
                      className="border-b border-border last:border-0"
                    >
                      <td className="p-3 font-medium text-foreground whitespace-nowrap">
                        {row.axis}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.example}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.failure}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* スキーマで検証する */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              スキーマを正本にする
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              手書きの <code>if</code>
              チェックを並べると、観点の抜けや重複が起きやすくなります。
              代わりに、JSON Schema や OpenAPI、あるいは Zod
              のようなスキーマライブラリで
              <strong>検証ルールを 1 か所に宣言</strong>
              し、ランタイムで強制するのが現代的な方法です。
              スキーマを「正本」とすれば、 OpenAPI
              ドキュメントと実際の検証が一致し、契約のズレが起きにくくなります。
            </p>

            <CodeBlock
              language="ts"
              title="Zod でリクエストボディのスキーマを定義する"
              code={`import { z } from "zod";

// ユーザー作成リクエストの正本スキーマ
const CreateUserSchema = z.object({
  // 形式: email 形式を強制
  email: z.string().email(),
  // 範囲: 8〜72 文字（bcrypt の上限を意識）
  password: z.string().min(8).max(72),
  // 必須 + 長さ
  name: z.string().min(1).max(50),
  // 列挙値: 受け付ける値を固定
  role: z.enum(["member", "admin"]).default("member"),
  // 範囲: 0〜120 の整数
  age: z.number().int().min(0).max(120).optional(),
});

// 型はスキーマから導出（手書きの interface と二重管理しない）
type CreateUserInput = z.infer<typeof CreateUserSchema>;

export function validateCreateUser(body: unknown) {
  // safeParse は throw せず結果オブジェクトを返す
  const result = CreateUserSchema.safeParse(body);
  if (!result.success) {
    // result.error.issues に全フィールドのエラーが入る
    return { ok: false as const, issues: result.error.issues };
  }
  return { ok: true as const, data: result.data };
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ポイントは <code>z.infer</code> で TypeScript
              の型をスキーマから導出している点です。
              検証ルールと型を二重管理せず、スキーマを変えれば型も検証も同時に追従します。
            </p>

            <InfoBox
              type="info"
              title="スキーマと型を二重管理しない"
            >
              スキーマライブラリの最大の利点は「ランタイム検証」と「コンパイル時の型」を
              1 つの定義から得られることです。
              手書きの型定義と検証ロジックを別々に持つと、片方だけ更新して
              ズレるという典型的なバグを生みます。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="リクエストの入力バリデーションに失敗したとき、最も適切な HTTP ステータスはどれ？（リクエスト構文自体は正しい場合）"
              options={[
                { label: "200 OK を返し、本文にエラーメッセージを入れる" },
                { label: "500 Internal Server Error" },
                {
                  label:
                    "422 Unprocessable Content（または 400 Bad Request）でどのフィールドがなぜ不正かを返す",
                  correct: true,
                },
                { label: "301 Moved Permanently" },
              ]}
              explanation="構文は正しいが内容（セマンティクス）が不正な入力には 422 Unprocessable Content が適しています。フレームワークによっては 400 Bad Request を使う流儀もあり、どちらも 4xx でクライアント起因のエラーを表します。500 はサーバ側の障害を表すので、入力ミスに使うと原因の切り分けを誤らせます。200 を返してエラーを本文に隠すのは、HTTP のセマンティクスに反するアンチパターンです。"
            />
          </section>

          {/* 失敗時のレスポンス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              失敗時は「どこが・なぜ」を全件まとめて返す
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              検証に失敗したら <strong>422 Unprocessable Content</strong>{" "}
              （または 400 Bad Request）を返します。 このとき、最初に見つけた 1
              件で打ち切るのではなく、
              <strong>不正だったフィールドを全件</strong>
              まとめて返すのが親切な設計です。 1
              件ずつ直して送り直す往復を、利用者に強いずに済みます。
            </p>

            <CodeBlock
              language="json"
              title="422 レスポンス（複数の検証エラーをまとめて返す）"
              code={`{
  "type": "https://example.com/errors/validation",
  "title": "入力内容を検証できませんでした",
  "status": 422,
  "errors": [
    {
      "field": "email",
      "code": "invalid_format",
      "message": "メールアドレスの形式が正しくありません"
    },
    {
      "field": "password",
      "code": "too_short",
      "message": "パスワードは8文字以上で入力してください"
    },
    {
      "field": "role",
      "code": "invalid_enum",
      "message": "role は member または admin のいずれかです"
    }
  ]
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>field</code> でどこが、 <code>code</code>{" "}
              で機械可読な理由（クライアントが分岐や i18n に使える）、{" "}
              <code>message</code> で人間向けの説明を返しています。
              エラー本文の構造を <strong>全エンドポイントで統一</strong>
              しておくと、クライアント側のエラーハンドリングを共通化できます。
            </p>
          </section>

          {/* マスアサインメント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              マスアサインメント対策 — 許可したフィールドだけ受理する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              受け取った JSON をそのままモデルに流し込む実装は危険です。
              利用者が本来更新できないはずのフィールド（たとえば{" "}
              <code>role</code> や <code>isAdmin</code>、 <code>balance</code>）
              を勝手に紛れ込ませて、権限昇格や残高改ざんを狙えるからです。
              これを<strong>マスアサインメント脆弱性</strong>と呼びます。
              対策は単純で、<strong>許可したフィールドだけを抜き出す</strong>
              （allow-list 方式）ことです。
            </p>

            <CodeBlock
              language="ts"
              title="許可フィールドだけを受理する（allow-list）"
              code={`// 危険: 受け取った body をそのまま展開すると role も上書きされる
// await db.user.update({ where: { id }, data: req.body });

// 安全: スキーマで定義したフィールドだけが result.data に入る。
// role はスキーマに含めず、サーバ側でのみ決定する
const result = UpdateProfileSchema.safeParse(req.body);
if (!result.success) {
  return res.status(422).json(toErrorBody(result.error));
}

// result.data には email / name など「更新を許可した項目」しか存在しない
await db.user.update({
  where: { id: currentUserId },
  data: result.data,
});`}
            />

            <InfoBox type="error" title="拒否リストではなく許可リストで防ぐ">
              「危険なフィールドを除外する」拒否リスト方式は、
              新しいフィールドが増えたときに除外し忘れて穴が開きます。
              「許可したフィールドだけ通す」許可リスト方式なら、
              未知のフィールドはデフォルトで弾かれます。スキーマ検証は
              この許可リストを自然に実現します。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="クライアント側（ブラウザ）で入力検証を実装済みなのに、なぜサーバ側でも同じ検証が必要なのか？"
              options={[
                { label: "サーバ検証のほうが処理が速いから" },
                {
                  label:
                    "HTTP リクエストは画面を介さず直接送れるため、クライアント検証は迂回でき、サーバが信頼境界になるから",
                  correct: true,
                },
                { label: "クライアント検証は古い技術で非推奨だから" },
                { label: "JSON のサイズを小さくできるから" },
              ]}
              explanation="ブラウザの JavaScript は無効化・改変が可能で、攻撃者は curl や DevTools からリクエストを直接組み立てて送れます。つまりクライアント検証は『迂回できる親切機能』であり、セキュリティ境界はあくまでサーバ側です。クライアント検証（UX）とサーバ検証（セキュリティ）は目的が違うため、両方を用意します。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "MDN - 422 Unprocessable Content",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Status/422",
                  description:
                    "構文は正しいが内容を処理できないリクエストに使うステータスの定義",
                },
                {
                  title: "Zod 公式ドキュメント",
                  url: "https://zod.dev/",
                  description:
                    "スキーマから型と検証を同時に得る TypeScript ファーストの検証ライブラリ",
                },
                {
                  title: "JSON Schema",
                  url: "https://json-schema.org/",
                  description:
                    "言語非依存で検証ルールを宣言する仕様。OpenAPI のスキーマ定義の基盤",
                },
                {
                  title: "OWASP - Mass Assignment Cheat Sheet",
                  url: "https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html",
                  description:
                    "マスアサインメント脆弱性とその対策（許可リスト方式）の解説",
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
