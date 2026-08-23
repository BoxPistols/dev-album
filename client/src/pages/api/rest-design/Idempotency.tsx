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

// メソッド別の冪等性まとめ（前章「HTTP メソッド」と地続き）
const methods = [
  {
    name: "GET",
    idempotent: "冪等",
    note: "何回呼んでも状態は変わらない。べき等キーは不要。",
  },
  {
    name: "PUT",
    idempotent: "冪等",
    note: "同じ内容を何回送っても結果は同じ（上書き）。べき等キーは不要。",
  },
  {
    name: "DELETE",
    idempotent: "冪等",
    note: "2 回目以降は「既に無い」状態が続くだけ。べき等キーは不要。",
  },
  {
    name: "POST",
    idempotent: "非冪等",
    note: "呼ぶたびに新しいリソースが作られる。リトライで二重作成が起きる。べき等キーが要る。",
  },
];

export default function Idempotency() {
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
            べき等キーと安全なリトライ
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            ネットワークは必ず途中で切れます。POST
            を送ってレスポンスが返ってこなかったとき、クライアントは
            「成功したのか、まだなのか」を判断できません。再送すれば二重に注文や決済が走るかもしれない。
            この危うさを安全に解消するのが「べき等キー（Idempotency-Key）」です。
            決済 API で広く使われている、実績のある設計パターンを見ていきます。
          </p>
        </div>

        <WhyNowBox
          tags={["POST", "Idempotency-Key", "リトライ", "決済 API", "冪等性"]}
        >
          <p>
            GET / PUT / DELETE は元々
            <strong>冪等</strong>
            なので、何度リトライしても結果は変わりません。 問題は
            <strong>POST</strong>
            です。レスポンスが届かなかっただけで処理自体は成功していた、
            というケースが一番厄介で、クライアントが善意で再送した結果、
            注文や決済が二重に作られます。 サーバ側が「同じリクエストは 1
            回しか実行しない」仕組みを提供すれば、
            クライアントは安心してリトライできます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              べき等キーによる二重作成防止
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              同じ Idempotency-Key の再送には保存済みの結果を返すため、ネットワーク再送で同じ POST が二度届いても二重に作成されません。
            </p>
            <MermaidDiagram
              title="べき等キーによる二重作成防止（図）"
              chart={`sequenceDiagram
  participant C as クライアント
  participant S as API サーバー
  C->>S: POST /orders (Idempotency-Key: abc)
  S->>S: キー abc を保存して処理
  S-->>C: 201 Created
  Note over C: レスポンス未達 → 再送
  C->>S: POST /orders (Idempotency-Key: abc)
  S->>S: キー abc は処理済み
  S-->>C: 同じ 201 (二重作成しない)`}
            />
          </section>

          {/* 問題: 届かなかったレスポンス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              問題は「成功したのに届かなかった」レスポンス
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              タイムアウトや回線断は、リクエストとレスポンスの
              <strong>どちらの方向でも</strong>
              起こります。とくに厄介なのは、サーバが処理を完了して
              レスポンスを返したのに、その応答だけがクライアントに届かなかったケースです。
              クライアントから見ると「失敗」にしか見えないため、再送します。
              しかし POST は非冪等なので、その再送が
              <strong>2 件目の注文・2 回目の課金</strong>を生みます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    ① レスポンスが届かない
                  </p>
                  <p className="text-muted-foreground">
                    サーバは注文を作成済み。だが回線断で
                    <code>201 Created</code> がクライアントに届かない。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">② 善意の再送</p>
                  <p className="text-muted-foreground">
                    クライアントは失敗とみなして再送。べき等キーが無ければ
                    <strong>2 件目の注文</strong>が作られてしまう。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="warning" title="「失敗に見える成功」が最も危ない">
              通信エラーには「本当に届かなかった」場合と「届いて処理されたが、
              応答が返らなかった」場合があり、クライアントからは区別できません。
              だからクライアントは安全側に倒してリトライします。
              サーバが冪等性を保証していないと、
              この善意のリトライがそのまま重複処理になります。
            </InfoBox>
          </section>

          {/* 復習: メソッドと冪等性 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              復習: 冪等なメソッド・冪等でないメソッド
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              べき等キーが必要なのは主に
              <code>POST</code>
              です。理由は前の章「HTTP メソッド」と地続きで、 GET / PUT / DELETE
              はそもそも冪等だからです。
              下の表で、どのメソッドにべき等キーが要るかを整理します。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      メソッド
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted whitespace-nowrap">
                      冪等性
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      リトライ時の挙動
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {methods.map((m) => (
                    <tr key={m.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {m.name}
                      </td>
                      <td className="py-2 px-4 text-foreground whitespace-nowrap align-top">
                        {m.idempotent}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {m.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="PATCH は要注意">
              <code>PATCH</code>
              は実装次第で冪等にも非冪等にもなります。「絶対値に設定する」差分なら冪等ですが、
              「在庫を 1 減らす」のような相対演算は非冪等です。 後者のような
              <code>PATCH</code> は <code>POST</code> と同様に
              べき等キーの保護対象として扱うのが安全です。
            </InfoBox>
          </section>

          {/* 解決: Idempotency-Key */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              解決策: Idempotency-Key ヘッダー
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              クライアントは「この 1 回の操作」を表す一意なキー（UUID v4
              など）を生成し、
              <code>Idempotency-Key</code>
              ヘッダーに付けて送ります。 サーバは初回処理時に
              <strong>「キー → 結果」を保存</strong>し、 同じキーで再送が来たら
              <strong>
                処理は実行せず、保存済みのレスポンスをそのまま返します
              </strong>
              。 これで「実際の処理は 1
              回だけ」「クライアントは何回でも安全にリトライできる」
              が両立します。
            </p>

            <CodeBlock
              language="bash"
              title="① Idempotency-Key を付けて POST する"
              code={`# クライアントが UUID v4 を 1 回生成（リトライ間で同じ値を使い続ける）
KEY=$(uuidgen)

curl -i -X POST https://api.example.com/v1/orders \\
  -H 'Content-Type: application/json' \\
  -H "Idempotency-Key: $KEY" \\
  -d '{ "item_id": 42, "quantity": 1 }'

# レスポンスが届かなかったら、同じ $KEY で再送する（新規 UUID を作らない）
curl -i -X POST https://api.example.com/v1/orders \\
  -H 'Content-Type: application/json' \\
  -H "Idempotency-Key: $KEY" \\
  -d '{ "item_id": 42, "quantity": 1 }'`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              2 回目のリクエストでもサーバは
              <strong>同じレスポンス</strong>（同じ注文
              ID、同じステータスコード）を返します。
              本文も初回とまったく同じです。クライアントから見れば「リトライしても結果は変わらない」、
              つまり POST が冪等であるかのように振る舞います。
            </p>
          </section>

          {/* サーバ側ロジック */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              サーバ側の擬似ロジック
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              サーバは「キーで保存済みの結果を引く → あればそれを返す →
              無ければ処理して保存する」
              という流れを実装します。同時再送に備えてキーを
              <strong>ロック</strong>
              し、リクエストボディの一致確認も入れます。
            </p>

            <CodeBlock
              language="ts"
              title="キー保存と再送時の応答（擬似コード）"
              code={`type StoredResult = {
  requestHash: string; // リクエストボディのハッシュ（同一キー異内容の検出用）
  status: number;      // 保存したステータスコード
  body: unknown;       // 保存したレスポンス本文
};

async function handleCreateOrder(req: Request): Promise<Response> {
  const key = req.headers.get("Idempotency-Key");
  if (!key) {
    // キー必須にする場合は 400 を返す設計もある
    return json(400, { error: "Idempotency-Key header is required" });
  }

  const requestHash = sha256(await req.text());

  // ① 保存済みの結果を引く
  const saved = await store.get(key);
  if (saved) {
    // ②-a 同じキーで内容が違うリクエストは矛盾 → 422 で拒否
    if (saved.requestHash !== requestHash) {
      return json(422, { error: "Idempotency-Key reused with different body" });
    }
    // ②-b 内容が同じ再送 → 保存済みレスポンスをそのまま返す（処理は実行しない）
    return json(saved.status, saved.body);
  }

  // ③ 同時再送に備えてキーをロック（取れなければ別リクエストが処理中）
  const lock = await store.acquireLock(key);
  if (!lock) {
    return json(409, { error: "A request with this key is already in progress" });
  }

  try {
    // ④ ここで初めて実際の処理を 1 回だけ実行する
    const order = await createOrder(requestHash);
    const result: StoredResult = { requestHash, status: 201, body: order };

    // ⑤ 結果を保存（TTL を付ける。例: 24 時間）
    await store.set(key, result, { ttlSeconds: 24 * 60 * 60 });
    return json(result.status, result.body);
  } finally {
    await store.releaseLock(key);
  }
}`}
            />

            <InfoBox
              type="success"
              title="ポイントは「処理は 1 回、応答は何回でも」"
            >
              実際の副作用（注文作成・課金）は<strong>初回の 1 回だけ</strong>
              実行されます。 2
              回目以降は保存済みの結果を返すだけなので、副作用は発生しません。
              クライアントは「成功するまでリトライする」というシンプルな戦略を、安全に取れます。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="なぜ POST に Idempotency-Key が必要で、GET / PUT / DELETE には基本不要なのか？"
              options={[
                {
                  label:
                    "GET / PUT / DELETE は元々冪等で再送しても結果が変わらないが、POST は非冪等で再送すると二重作成が起きるから",
                  correct: true,
                },
                {
                  label: "POST はボディが大きく、再送すると帯域を消費するから",
                },
                {
                  label:
                    "GET / PUT / DELETE はキャッシュ可能だが POST はキャッシュ不可だから",
                },
                {
                  label: "POST だけが Authorization ヘッダーを必要とするから",
                },
              ]}
              explanation="GET / PUT / DELETE は冪等なので、何度リトライしても状態は同じ結果に収束します。一方 POST は呼ぶたびに新しいリソースを作る非冪等な操作なので、リトライがそのまま二重作成（注文・決済の重複）につながります。べき等キーは、この POST にだけ「1 回しか実行しない」保証を与える仕組みです。"
            />
          </section>

          {/* 設計の要点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              設計の要点: TTL・ボディ不一致・同時実行
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              べき等キーは「保存して引く」だけに見えて、運用上の判断ポイントがいくつかあります。
              特に重要な 3 点を整理します。
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  保存期間（TTL）を決める:
                </span>{" "}
                キー → 結果を永久に保持はしません。 例えば
                <code>24h</code>
                で破棄します。TTL
                を過ぎたキーで再送が来ると新規処理として扱われるため、
                クライアント側のリトライ期間と整合させます。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  同一キー・異なるボディは拒否する:
                </span>{" "}
                同じキーで内容の違うリクエストが来たら、矛盾です。
                保存済みの結果を誤って返さないよう、
                <code>422 Unprocessable Entity</code> または
                <code>409 Conflict</code> で拒否します。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  処理中の同時再送をロックする:
                </span>{" "}
                初回がまだ処理中のうちに再送が届くと、保存がまだ無いため
                二重に処理されかねません。キー単位でロックを取り、 処理中なら
                <code>409</code> を返すなどして競合を防ぎます。
              </li>
            </ul>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="サーバが既に処理済みの Idempotency-Key で、内容も同じリクエストの再送を受け取った。返すべき挙動は？"
              options={[
                {
                  label:
                    "処理は実行せず、初回に保存したレスポンスをそのまま返す",
                  correct: true,
                },
                {
                  label: "改めて処理を実行し、2 件目のリソースを作成する",
                },
                {
                  label: "常に 409 Conflict を返して再送を拒否する",
                },
                {
                  label: "304 Not Modified を返して本文を省略する",
                },
              ]}
              explanation="同一キー・同一内容の再送は「届かなかったレスポンスの再取得」とみなせます。サーバは副作用を実行せず、初回に保存した結果（同じステータス・同じ本文）をそのまま返します。これで処理は 1 回だけ、クライアントは安全にリトライできます。なお 409 は「処理中の同時再送」、422 は「同一キーで内容が違う」場合に使い分けます。"
            />
          </section>

          {/* キー生成の注意 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              キーはクライアントが作り、リトライ間で固定する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              この仕組みが成立する前提は、
              <strong>同じ操作には同じキーを使い続ける</strong>
              ことです。
              キーはサーバではなくクライアントが生成します（操作の一意性を
              知っているのはクライアントだからです）。
              リトライのたびに新しいキーを作ってしまうと、
              サーバから見れば「別の操作」になり、重複が防げません。
            </p>

            <CodeBlock
              language="ts"
              title="操作開始時に 1 回だけキーを作り、リトライで使い回す"
              code={`async function placeOrder(payload: OrderPayload) {
  // 操作の開始時に 1 回だけ生成する（crypto.randomUUID は UUID v4 を返す）
  const idempotencyKey = crypto.randomUUID();

  // リトライ間でも同じ idempotencyKey を渡し続ける
  return retry(() =>
    fetch("https://api.example.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey, // 再試行でも値は変えない
      },
      body: JSON.stringify(payload),
    }),
  );
}`}
            />

            <InfoBox
              type="warning"
              title="やってはいけない: リトライごとに新規キー"
            >
              <code>retry()</code>
              の内側でキーを生成すると、再試行のたびに別キーになり、
              サーバには毎回「新しい操作」として届きます。
              結果、べき等キーがあるのに二重作成が起きます。 キー生成は必ず
              <strong>リトライループの外側（操作の開始時）</strong>で 1
              回だけ行います。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Stripe - Idempotent requests",
                  url: "https://docs.stripe.com/api/idempotent_requests",
                  description:
                    "Idempotency-Key ヘッダーの実運用例。TTL や同一キーの扱いまで具体的に解説",
                },
                {
                  title: "MDN - Idempotent",
                  url: "https://developer.mozilla.org/ja/docs/Glossary/Idempotent",
                  description:
                    "HTTP メソッドの冪等性の定義。どのメソッドが冪等かを日本語で確認できる",
                },
                {
                  title: "IETF Draft - The Idempotency-Key HTTP Header Field",
                  url: "https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/",
                  description:
                    "Idempotency-Key ヘッダーの挙動を整理した IETF ドラフト。2026-04-18 に期限切れ・アーカイブ済みで RFC 化はしていないため、設計の参考として読む",
                },
                {
                  title: "MDN - 422 Unprocessable Content",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Status/422",
                  description:
                    "同一キーで内容が異なる場合などに使うステータスコードの定義",
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
