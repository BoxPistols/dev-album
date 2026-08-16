import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const methods = [
  {
    name: "GET",
    safe: "安全",
    idempotent: "冪等",
    crud: "Read",
    use: "リソースの取得。サーバの状態を変えない。ボディは持たないのが基本",
  },
  {
    name: "POST",
    safe: "非安全",
    idempotent: "非冪等",
    crud: "Create",
    use: "リソースの新規作成。送るたびに新しいリソースが増える",
  },
  {
    name: "PUT",
    safe: "非安全",
    idempotent: "冪等",
    crud: "Update（全置換）",
    use: "リソース全体を送ったボディで置き換える。指定 URL に作成も兼ねうる",
  },
  {
    name: "PATCH",
    safe: "非安全",
    idempotent: "非冪等",
    crud: "Update（部分）",
    use: "リソースの一部だけを更新する。差分だけを送る",
  },
  {
    name: "DELETE",
    safe: "非安全",
    idempotent: "冪等",
    crud: "Delete",
    use: "リソースの削除。2 回目以降は「すでに無い」状態で安定する",
  },
];

export default function HttpMethods() {
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
            HTTP メソッドの使い分け
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            REST API では、操作の種類を URL ではなく HTTP メソッド（GET / POST /
            PUT / PATCH / DELETE）で表現します。
            どれを選ぶかは好みではなく、「安全」「冪等」という 2
            つの性質で決まります。
            この章では各メソッドの意味と、リトライ設計に直結する冪等性の考え方を整理します。
          </p>
        </div>

        <WhyNowBox tags={["GET", "POST", "PUT", "PATCH", "冪等性"]}>
          <p>
            「データを取るなら GET、保存するなら POST」くらいの理解でも API
            は動きます。 しかし API を<strong>設計する</strong>側、
            あるいはネットワークが不安定な環境でリトライを実装する側に回ると、
            メソッド選びは事故に直結します。 同じ POST を 2
            回送って注文が二重に作られる、 失敗したと思った PUT
            を再送して安全に復旧できる —— この差は「冪等性」という 1
            つの性質から生まれます。まずメソッドの定義を正確に押さえます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 安全と冪等の定義 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              2 つの軸：「安全」と「冪等」
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              メソッドの使い分けは、次の 2
              つの性質で判断します。言葉が似ていますが別物です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-primary mb-2 text-base">
                  安全（Safe）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  リクエストを送ってもサーバの状態を変えない、という性質。 GET
                  のように「読むだけ」の操作が該当します。
                  安全なメソッドは、ユーザーが意図せず副作用を起こさないことが保証されます。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-primary mb-2 text-base">
                  冪等（Idempotent）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  同じリクエストを 1 回送っても 10
                  回送っても、サーバの最終的な状態が同じになる、という性質。
                  「状態が変わらない」ではなく「何回やっても同じ結果に落ち着く」点が安全との違いです。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="安全 ⊂ 冪等の関係">
              安全なメソッドは状態を変えないので、当然どれだけ送っても状態は同じ
              ——つまり安全なら必ず冪等です。逆は成り立ちません。DELETE
              は状態を変える（安全ではない）ので非安全ですが、
              何回送っても「削除済み」で安定するので冪等です。
            </InfoBox>
          </section>

          {/* 一覧表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              メソッド早見表
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              RFC 9110（HTTP Semantics）が定める各メソッドの性質と、よく対応する
              CRUD 操作を一覧にします。PATCH だけは RFC 9110 ではなく RFC 5789
              が定義しており、同仕様が「安全でも冪等でもない」と明記しています。
              ただし patch document の作り方次第で、個々の PATCH
              リクエストを冪等に構成することはできます。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="p-3 font-bold text-foreground">メソッド</th>
                    <th className="p-3 font-bold text-foreground">安全</th>
                    <th className="p-3 font-bold text-foreground">冪等</th>
                    <th className="p-3 font-bold text-foreground">CRUD</th>
                    <th className="p-3 font-bold text-foreground">主な用途</th>
                  </tr>
                </thead>
                <tbody>
                  {methods.map((m) => (
                    <tr
                      key={m.name}
                      className="border-b border-border last:border-0"
                    >
                      <td className="p-3 font-mono font-bold text-primary">
                        {m.name}
                      </td>
                      <td className="p-3 text-muted-foreground">{m.safe}</td>
                      <td className="p-3 text-muted-foreground">
                        {m.idempotent}
                      </td>
                      <td className="p-3 text-muted-foreground">{m.crud}</td>
                      <td className="p-3 text-muted-foreground">{m.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* curl 例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              各メソッドの呼び出し例
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              同じ <code>/v1/users</code>{" "}
              というリソースに対して、メソッドを変えるだけで操作の意味が変わります。
              curl の <code>-X</code> でメソッドを、<code>-d</code> で
              リクエストボディを指定しています。
            </p>

            <CodeBlock
              language="bash"
              title="GET / POST / PUT / PATCH / DELETE"
              code={`# 取得（安全・冪等）— ボディなし
curl -X GET https://api.example.com/v1/users/42

# 作成（非安全・非冪等）— 送るたびに 1 件増える
curl -X POST https://api.example.com/v1/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"田中 花子","email":"hanako@example.com"}'

# 全置換（非安全・冪等）— 42 を丸ごと置き換える
curl -X PUT https://api.example.com/v1/users/42 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"田中 花子","email":"new@example.com","role":"admin"}'

# 部分更新（非安全）— email だけ変える
curl -X PATCH https://api.example.com/v1/users/42 \\
  -H "Content-Type: application/json" \\
  -d '{"email":"new@example.com"}'

# 削除（非安全・冪等）— 2 回目以降は「すでに無い」で安定
curl -X DELETE https://api.example.com/v1/users/42`}
            />
          </section>

          {/* PUT vs PATCH */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              PUT と PATCH の違い
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              どちらも「更新」ですが、送るボディの意味が違います。 PUT は
              <strong>リソース全体を送ったボディで置き換える</strong>のに対し、
              PATCH は<strong>変更したいフィールドだけを送る</strong>。
              下の例で、同じ「email を変えたい」要求がどう変わるか比べます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <CodeBlock
                language="json"
                title="PUT のボディ（全フィールドを送る）"
                code={`{
  "name": "田中 花子",
  "email": "new@example.com",
  "role": "admin"
}`}
              />
              <CodeBlock
                language="json"
                title="PATCH のボディ（変える分だけ）"
                code={`{
  "email": "new@example.com"
}`}
              />
            </div>

            <InfoBox type="warning" title="PUT で一部だけ送ると欠落する">
              PUT は「全体置換」なので、<code>name</code> や <code>role</code>{" "}
              を省いて <code>email</code>{" "}
              だけ送る実装にすると、省いたフィールドが消える（null
              になる）解釈が正しい振る舞いです。 「一部だけ変えたい」ときは
              PATCH を使います。 ただし PATCH
              のセマンティクスはメディアタイプ依存で、JSON Merge Patch（RFC
              7396）や JSON Patch（RFC 6902）など複数の形式があります。
            </InfoBox>
          </section>

          {/* Quiz 1: PUT vs PATCH */}
          <section>
            <Quiz
              question="ユーザーの email だけを変更したい。最も適切なメソッドとボディは？"
              options={[
                {
                  label: "PUT で email だけを含むボディを送る",
                },
                {
                  label: "PATCH で変更する email フィールドだけを送る",
                  correct: true,
                },
                { label: "GET にボディを付けて email を送る" },
                { label: "POST で新しいユーザーを作り直す" },
              ]}
              explanation="一部のフィールドだけを更新するのは PATCH の役割です。PUT は「リソース全体の置換」なので、email だけを送ると残りのフィールドが欠落する解釈になり、意図せずデータを失う恐れがあります。GET は安全なメソッドでボディによる更新はしません。"
            />
          </section>

          {/* POST が冪等でない理由 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              POST が冪等でない理由
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              POST は「コレクションに新しいリソースを追加する」操作です。
              同じ作成リクエストを 2 回送れば、リソースが 2
              件できます。これが「非冪等」の正体です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              対して PUT は「指定した URL
              のリソースをこの内容にする」なので、何回送っても その URL
              のリソースは同じ内容に落ち着きます（冪等）。 DELETE も「その URL
              のリソースを無くす」なので、何回送っても「無い」で
              安定します（冪等）。違いは
              <strong>「対象 URL が固定されているか」</strong>です。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <p className="text-sm font-bold text-foreground mb-3">
                同じリクエストを 2 回送った結果
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    POST /v1/users（非冪等）
                  </p>
                  <p className="text-muted-foreground">
                    1 回目：id=42 を作成 / 2 回目：id=43 を作成。ユーザーが 2
                    人増える
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    PUT /v1/users/42（冪等）
                  </p>
                  <p className="text-muted-foreground">
                    1 回目：42 を更新 / 2 回目：42 を同じ内容で更新。状態は同じ
                  </p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              この性質はリトライ設計に直結します。 ネットワークが切れて
              レスポンスが返らなかったとき、冪等なメソッド（GET / PUT /
              DELETE）は「とりあえず再送」しても状態が壊れません。
              しかし非冪等な POST は、再送すると二重作成のリスクがあります。
            </p>
          </section>

          {/* InfoBox: 冪等性とリトライ */}
          <section>
            <InfoBox type="success" title="冪等性はリトライ安全性そのもの">
              「サーバには届いたがレスポンスが返らなかった」状況では、
              成功したか 失敗したかをクライアントは判別できません。
              このとき冪等なメソッドなら、 安全に再送して結果を取り直せます。
              非冪等な POST を安全に再送したい場合は、クライアントが一意なキーを{" "}
              <code>Idempotency-Key</code> ヘッダーで送り、 サーバが
              「このキーは処理済み」と覚えておくことで、 2
              回目以降を「最初の結果の再生」として扱う設計が使われます（決済 API
              などで一般的）。
            </InfoBox>
          </section>

          {/* Quiz 2: POST 冪等 */}
          <section>
            <Quiz
              question="POST が「冪等でない」とされるのはなぜ？"
              options={[
                { label: "POST はサーバの状態を変えないから" },
                {
                  label:
                    "同じ作成リクエストを複数回送ると、その回数だけリソースが作られるから",
                  correct: true,
                },
                {
                  label: "POST は GET より通信が遅いから",
                },
                {
                  label: "POST はレスポンスボディを返さないから",
                },
              ]}
              explanation="冪等とは「同じリクエストを何回送っても最終状態が同じ」という性質です。POST は新規作成なので、2 回送ればリソースが 2 件できてしまい、最終状態が回数に依存します。だから非冪等です。リトライを安全にしたい場合は Idempotency-Key などの仕組みを併用します。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "RFC 9110 - HTTP Semantics（Methods）",
                  url: "https://www.rfc-editor.org/rfc/rfc9110.html#name-methods",
                  description:
                    "各 HTTP メソッドの安全性・冪等性を定義する一次仕様。GET/POST/PUT/PATCH/DELETE の正確な意味はここが基準",
                },
                {
                  title: "MDN - HTTP リクエストメソッド",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Methods",
                  description:
                    "各メソッドの用途・安全・冪等を日本語でまとめた実用リファレンス",
                },
                {
                  title: "RFC 5789 - PATCH Method for HTTP",
                  url: "https://www.rfc-editor.org/rfc/rfc5789.html",
                  description:
                    "PATCH メソッドを定義する仕様。冪等性がボディの形式に依存する理由が読み取れる",
                },
                {
                  title: "RFC 7396 - JSON Merge Patch",
                  url: "https://www.rfc-editor.org/rfc/rfc7396.html",
                  description:
                    "PATCH のボディ形式の一つ。部分更新の差分をどう表現するかの代表的な仕様",
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
