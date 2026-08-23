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

const useCases = [
  {
    event: "決済完了",
    detail:
      "決済代行サービスが処理を確定した瞬間に通知。注文ステータスの更新やメール送信のトリガーにする。",
  },
  {
    event: "CI ビルド完了",
    detail:
      "ビルド・テストが終わったら結果を通知。成功・失敗に応じて Slack 投稿やデプロイを起動する。",
  },
  {
    event: "メッセージ受信",
    detail:
      "チャットツールに新着が届いたら通知。ポーリングなしでリアルタイムに反応できる。",
  },
  {
    event: "外部サービスのイベント",
    detail:
      "リポジトリへの push、課金プランの変更など、他社サービス側で起きた変化を受け取る。",
  },
];

export default function Webhooks() {
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
            Webhooks と非同期 API
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            「サーバ側で何かが起きたら知りたい」とき、クライアントが繰り返し問い合わせる（ポーリング）のは
            無駄が多い設計です。Webhook は、イベントが起きた瞬間にサーバ側から
            クライアントへ通知する「逆向きの
            API」です。配信保証・リトライ・署名検証を 正しく設計すると、決済や
            CI 連携のような重要な通知を取りこぼさず安全に受け取れます。
          </p>
        </div>

        <WhyNowBox
          tags={["Webhook", "非同期", "HMAC", "リトライ", "202 Accepted"]}
        >
          <p>
            通常の API は<strong>クライアントが要求してサーバが応答する</strong>
            一方向の流れです。
            しかし「いつ起きるか分からないイベント」を待つ場合、
            クライアントが何度も「もう終わった？」と尋ね続けるポーリングは、
            遅延も負荷も大きくなります。 Webhook は向きを反転させ、
            <strong>サーバがイベント発生時にクライアントへ POST する</strong>
            ことで、 無駄なリクエストを消し、通知を即時化します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Webhook の配信とリトライ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              イベントが起きると提供側が受信側の登録 URL へ POST します。受信側は署名を検証し、2xx を返せなければ提供側が再送します。
            </p>
            <MermaidDiagram
              title="Webhook の配信とリトライ（図）"
              chart={`sequenceDiagram
  participant P as 提供側 (送信)
  participant R as 受信側 (登録URL)
  Note over P: イベント発生
  P->>R: POST (署名つきペイロード)
  R->>R: HMAC 署名を検証
  R-->>P: 2xx (受領)
  Note over P,R: 2xx が来なければ指数バックオフで再送`}
            />
          </section>

          {/* Webhook とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Webhook は「サーバから呼ばれる API」
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Webhook とは、サーバ側で特定のイベントが起きたとき、
              <strong>
                サーバが「クライアントが事前に登録した URL」へ POST する
              </strong>
              仕組みです。普段の API ではクライアントがサーバを呼びますが、
              Webhook
              ではその関係が逆になります。クライアントは「受信用のエンドポイント」を
              用意して送信側に登録しておき、イベントが届くのを待ちます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    ポーリング（従来）
                  </p>
                  <p className="text-muted-foreground">
                    クライアントが「まだ？」と定期的に問い合わせる。イベントがなくても
                    リクエストが発生し、通知も間隔ぶん遅れる。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    Webhook（プッシュ）
                  </p>
                  <p className="text-muted-foreground">
                    イベントが起きた瞬間にサーバ側から POST
                    が届く。無駄な問い合わせが消え、
                    通知がほぼリアルタイムになる。
                  </p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              代表的なユースケースを整理します。いずれも「いつ起きるか分からないが、
              起きたらすぐ反応したい」イベントです。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted whitespace-nowrap">
                      イベント
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      用途
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {useCases.map((u) => (
                    <tr key={u.event} className="border-b border-border">
                      <td className="py-2 pr-4 font-bold text-primary whitespace-nowrap align-top">
                        {u.event}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {u.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="登録の流れ">
              受信側はまず「通知を受け取る URL」を送信側サービスに登録します
              （管理画面や登録用 API 経由）。以降、対象イベントが起きるたびに、
              送信側がその URL へ <code>POST</code> リクエストを投げてきます。
              何のイベントを受け取るか（イベントタイプ）を選べるサービスが多いです。
            </InfoBox>
          </section>

          {/* ペイロード設計 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              イベントタイプとペイロード設計
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Webhook の本文（ペイロード）には、最低限
              <strong>「何のイベントか」「いつ起きたか」「対象は何か」</strong>
              を含めます。受信側がイベントごとに処理を分岐できるよう
              <code>type</code> を持たせ、後述するべき等処理のために
              <strong>一意な event id</strong> を必ず付けるのが定石です。
            </p>

            <CodeBlock
              language="json"
              title="Webhook ペイロード例（決済完了イベント）"
              code={`{
  "id": "evt_01HZX8QK3M9P2T",
  "type": "payment.succeeded",
  "created_at": "2026-06-20T09:15:30Z",
  "data": {
    "payment_id": "pay_8f31a0",
    "amount": 4800,
    "currency": "JPY",
    "order_id": "order_2291"
  }
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>id</code>{" "}
              はこの配信を識別する値で、受信側が「もう処理した配信か」を
              判定するために使います。<code>type</code> でハンドラを振り分け、
              <code>data</code> に対象リソースの情報を入れます。
              ペイロードに含める情報は最小限にし、機密性の高い詳細は 受信側が{" "}
              <code>data</code> 内の ID をキーに本 API
              で再取得する設計も有効です。
            </p>
          </section>

          {/* 配信保証とリトライ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              配信保証は at-least-once — 重複は前提
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ネットワークや受信側は不安定です。送信側は、受信側から成功応答
              （通常 <code>2xx</code>）が返らなければ、時間を置いて再送します。
              再送は<strong>指数バックオフ</strong>
              （失敗のたびに間隔を倍々で広げる）で
              行うのが一般的です。この仕組みのため、多くの Webhook の配信保証は
              <strong>at-least-once（少なくとも 1 回）</strong>になります。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <p className="font-bold text-foreground mb-2 text-base">
                指数バックオフのイメージ
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                1 回目失敗 → 数秒後に再送 → また失敗 → 数十秒後 → 数分後 →
                数時間後…
                と間隔を広げながら、上限回数まで再送します。受信側が一時的に落ちていても、
                復帰後の再送で届く可能性が残ります。
              </p>
            </div>

            <InfoBox type="info" title="exactly-once は基本的に期待しない">
              「ちょうど 1
              回だけ届く（exactly-once）」を分散環境で保証するのは難しく、
              実運用の Webhook は <code>at-least-once</code> が前提です。つまり
              <strong>同じイベントが 2 回以上届くことがある</strong>。受信側は
              これを異常ではなく通常ケースとして扱い、後述のべき等処理で吸収します。
            </InfoBox>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              重複が届く前提なので、受信側は
              <strong>event id でべき等に処理</strong>します。
              これは前章で扱ったべき等キーと地続きの考え方です。処理済みの id
              を記録しておき、 同じ id が再び来たら処理をスキップして{" "}
              <code>200</code> を返します。
            </p>

            <CodeBlock
              language="ts"
              title="event id による重複排除（べき等処理）"
              code={`async function handleEvent(event: WebhookEvent) {
  // すでに処理済みの id なら何もしない（重複を無視）
  const already = await store.has(event.id);
  if (already) return;

  // 業務処理は1回だけ実行
  await processPayment(event.data);

  // 処理済みとして id を記録（次回の重複検知に使う）
  await store.add(event.id);
}`}
            />
          </section>

          {/* 署名検証 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              セキュリティ — HMAC 署名でなりすましを防ぐ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              受信エンドポイントは公開 URL です。つまり
              <strong>その URL を知っていれば誰でも POST できます</strong>。
              偽の決済完了イベントを送り込まれたら大事故です。これを防ぐため、
              送信側は<strong>共有シークレット</strong>を使ってペイロードに
              <strong>HMAC 署名</strong>（例:
              HMAC-SHA256）を付け、ヘッダーで渡します。
              受信側は同じシークレットで署名を計算し直し、一致するか検証します。
              シークレットを知らない第三者は正しい署名を作れないため、なりすましを防げます。
            </p>

            <CodeBlock
              language="http"
              title="署名とタイムスタンプを付けた配信リクエスト"
              code={`POST /webhooks/payment HTTP/1.1
Host: app.example.com
Content-Type: application/json
X-Webhook-Timestamp: 1750410930
X-Webhook-Signature: sha256=7e3f9b2c5a...（HMAC-SHA256 の16進）

{"id":"evt_01HZX8QK3M9P2T","type":"payment.succeeded", ...}`}
            />

            <p className="text-muted-foreground mt-6 mb-4 leading-relaxed">
              署名対象には<strong>タイムスタンプを含める</strong>のが重要です。
              これにより、一度盗まれた正規のリクエストを後から再送する
              <strong>リプレイ攻撃</strong>を防げます。受信側はタイムスタンプが
              古すぎる（例: 5 分以上前）リクエストを拒否します。
            </p>

            <CodeBlock
              language="ts"
              title="受信側の署名検証（擬似コード）"
              code={`import { createHmac, timingSafeEqual } from "node:crypto";

const TOLERANCE_SEC = 300; // 5分より古いリクエストは拒否

function verify(
  rawBody: string,
  timestamp: string,
  signature: string,
  secret: string,
): boolean {
  // リプレイ対策: タイムスタンプが古すぎたら拒否
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (age > TOLERANCE_SEC) return false;

  // 署名対象は「タイムスタンプ + 本文」（送信側と同じ組み立て方）
  const signed = timestamp + "." + rawBody;
  const expected =
    "sha256=" + createHmac("sha256", secret).update(signed).digest("hex");

  // タイミング攻撃を避けるため定数時間で比較する
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}`}
            />

            <InfoBox
              type="warning"
              title="署名検証は必須 — 公開 URL は誰でも叩ける"
            >
              受信エンドポイントは外部からアクセスできる公開 URL
              です。署名検証を 省くと、
              <strong>誰でも偽イベントを送り込めます</strong>。
              署名のないリクエスト、シークレットの一致しないリクエストは
              すべて拒否してください。また署名比較は通常の <code>===</code>{" "}
              ではなく
              <strong>定数時間比較</strong>（<code>timingSafeEqual</code>{" "}
              等）を使い、
              比較時間の差から鍵を推測されるタイミング攻撃を避けます。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Webhook の受信エンドポイントで HMAC 署名を検証する主な目的は？"
              options={[
                {
                  label:
                    "送信元が共有シークレットを知る正規の相手かを確認し、なりすましを防ぐ",
                  correct: true,
                },
                { label: "ペイロードを圧縮して転送量を減らすため" },
                { label: "重複した配信を 1 回にまとめるため" },
                { label: "レスポンスをキャッシュ可能にするため" },
              ]}
              explanation="受信エンドポイントは公開 URL なので誰でも POST できます。送信側は共有シークレットで HMAC 署名を付け、受信側が同じシークレットで再計算して一致を確認します。シークレットを知らない第三者は正しい署名を作れないため、偽のイベント（なりすまし）を弾けます。重複排除は別の仕組み（event id によるべき等処理）の役割です。"
            />
          </section>

          {/* 受信側の作法 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              受信側の作法 — まず 2xx、重い処理は後回し
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              送信側は、応答が遅い・タイムアウトすると「失敗」とみなして再送します。
              受信ハンドラで重い処理（メール送信・外部 API
              呼び出し・集計など）を 同期的に実行すると、応答が遅れて
              <strong>不要な再送（＝重複）を招きます</strong>。 そこで受信側は、
              <strong>署名検証と最小限の記録だけを行ってすぐ 2xx を返し</strong>
              、 実処理はキューやバックグラウンドジョブに回すのが定石です。
            </p>

            <CodeBlock
              language="ts"
              title="検証 → 即 200 → 非同期で処理"
              code={`app.post("/webhooks/payment", async (req, res) => {
  // 1. 署名検証（失敗なら 401 で即拒否）
  if (!verify(req.rawBody, req.header("X-Webhook-Timestamp"),
              req.header("X-Webhook-Signature"), SECRET)) {
    return res.sendStatus(401);
  }

  // 2. 重い処理はキューに積むだけ。ここでは実行しない
  await queue.enqueue(req.body);

  // 3. すぐ 200 を返す → 送信側は成功とみなし再送しない
  res.sendStatus(200);
});`}
            />

            <InfoBox type="success" title="速い 2xx が重複を減らす">
              受信ハンドラを軽く保つほど、タイムアウト由来の再送が減ります。
              「受け取った事実だけを素早く確定し、続きは自分のペースで処理する」
              という分業が、Webhook 受信の基本姿勢です。
            </InfoBox>
          </section>

          {/* 非同期パターン 202 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              関連: 202 Accepted による非同期処理
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Webhook は「サーバ → クライアント」のプッシュですが、逆に
              <strong>クライアントが投げた重い処理を非同期に扱う</strong>
              パターンも
              同じイベント駆動の発想です。即座に完了できない処理に対し、サーバは
              <strong>202 Accepted</strong>
              （受理したがまだ完了していない）を返します。
              クライアントはステータス用 URL をポーリングするか、完了時に
              Webhook で 通知を受け取ります。
            </p>

            <CodeBlock
              language="http"
              title="重い処理を受理して 202 を返す"
              code={`POST /v1/reports HTTP/1.1
Content-Type: application/json

{ "kind": "monthly", "month": "2026-05" }

HTTP/1.1 202 Accepted
Location: /v1/reports/rep_771/status

{ "id": "rep_771", "status": "processing" }`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              受理後の進捗確認には 2 通りあります。<strong>ポーリング</strong>は
              クライアントが <code>Location</code> の URL を定期的に{" "}
              <code>GET</code>
              して <code>status</code> を見ます。<strong>Webhook</strong>
              では、処理が 終わった時点でサーバがクライアントの登録 URL
              へ完了イベントを POST します。 通知頻度が低く即時性が欲しいなら
              Webhook、シンプルさを優先するなら
              ポーリング、という使い分けになります。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Webhook の配信保証が at-least-once（重複が届きうる）のとき、受信側が取るべき対応は？"
              options={[
                {
                  label:
                    "ペイロードの event id を記録し、同じ id が再度来たら処理をスキップする（べき等処理）",
                  correct: true,
                },
                {
                  label: "重複が届いた時点で送信側に 500 を返して再送を止める",
                },
                {
                  label:
                    "受信のたびに必ず処理を実行する。重複しても問題にならない",
                },
                { label: "署名を外して受信を高速化し、重複を許容する" },
              ]}
              explanation="at-least-once では同じイベントが複数回届くことがあります。受信側は一意な event id を処理済みとして記録し、同じ id が再来したらスキップして 200 を返す「べき等処理」で吸収します。これは前章のべき等キーと同じ考え方です。500 を返すと送信側はさらに再送を続けてしまうため逆効果です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "MDN - HTTP レスポンスステータスコード",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Status",
                  description:
                    "202 Accepted など、非同期処理で使うステータスコードの定義を日本語で確認できる",
                },
                {
                  title: "RFC 9110 - HTTP Semantics（202 Accepted）",
                  url: "https://www.rfc-editor.org/info/rfc9110/",
                  description:
                    "202 Accepted の正式な意味（受理したが処理は未完了）を定義する一次仕様",
                },
                {
                  title:
                    "RFC 2104 - HMAC: Keyed-Hashing for Message Authentication",
                  url: "https://www.rfc-editor.org/info/rfc2104/",
                  description:
                    "HMAC の一次仕様。共有鍵を用いたメッセージ認証の仕組みを定義",
                },
                {
                  title: "Stripe Docs - Webhooks",
                  url: "https://docs.stripe.com/webhooks",
                  description:
                    "署名検証・リトライ・即時 2xx 応答など、実運用の Webhook 設計の参考になる代表例",
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
