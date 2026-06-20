import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const algorithms = [
  {
    name: "固定ウィンドウ",
    summary:
      "「1分あたり100回」のように、固定の時間枠ごとにカウントをリセットする。",
    pro: "実装が単純でメモリも少ない。",
    con: "枠の境界をまたぐと短時間に上限の2倍が通ってしまう（バースト集中）。",
  },
  {
    name: "スライディングウィンドウ",
    summary:
      "現在時刻から遡った直近の一定期間で件数を数える。窓が連続的に動く。",
    pro: "境界のバースト問題を緩和し、上限が滑らかに効く。",
    con: "リクエストのタイムスタンプを保持する分、固定ウィンドウより重い。",
  },
  {
    name: "トークンバケット",
    summary:
      "一定レートでトークンを補充するバケツ。リクエストごとに1つ消費し、空なら拒否。",
    pro: "溜まったトークン分のバーストを許容しつつ、平均レートを制限できる。",
    con: "バケツ容量と補充レートの2パラメータを設計する必要がある。",
  },
  {
    name: "リーキーバケット",
    summary: "リクエストをキューに入れ、一定レートで「漏らす」ように処理する。",
    pro: "出力レートが常に一定で、下流を安定した流量で守れる。",
    con: "キューが溢れると破棄。バーストを吸収しにくく、待ち時間が増えうる。",
  },
];

const scopes = [
  {
    unit: "API キー単位",
    role: "発行したキーごとに上限を設定。プラン別に上限を変えるなど課金と結び付けやすい。",
  },
  {
    unit: "ユーザー単位",
    role: "ログインユーザーごとに制限。1ユーザーが複数デバイスから叩いても合算できる。",
  },
  {
    unit: "IP 単位",
    role: "認証前のエンドポイントやログイン試行の保護に有効。ただしNAT配下では複数人が同一IPになる点に注意。",
  },
];

export default function RateLimiting() {
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
            レート制限とスロットリング
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            公開された API
            には、際限なくリクエストが飛んできます。レート制限は、
            濫用や過負荷からサーバを守り、すべての利用者へ資源を公平に配分するための仕組みです。
            どのステータスコードを返し、どのヘッダーで「いつ再試行してよいか」を伝えるか。
            そしてクライアントはそれをどう受け止めるべきか。送る側・受ける側の両方を設計します。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "429",
            "Retry-After",
            "RateLimit",
            "トークンバケット",
            "バックオフ",
          ]}
        >
          <p>
            レート制限は「サーバを落とさないための防御」だけではありません。
            <strong>
              正しいステータスとヘッダーで伝えれば、クライアントは自律的に振る舞いを調整できます
            </strong>
            。 「いつ・どれだけ再試行してよいか」を機械可読な形で返すことで、
            無駄なリトライの連打を防ぎ、サーバとクライアントの双方が安定します。
            濫用・DoS の防止、コスト管理、公平なリソース配分——これらは API
            設計の一部です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* なぜレート制限 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              なぜレート制限が必要か
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レート制限の目的は大きく3つです。いずれも「特定の利用者が資源を独占しない」
              ことに帰着します。設計する前に、自分の API
              がどの目的を重視するのかを決めておきます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  濫用・DoS の防止
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  短時間の大量リクエストでサーバを飽和させる攻撃や、暴走したクライアントを
                  上限で止めて、サービス全体の停止を防ぐ。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  公平なリソース配分
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  1人のヘビーユーザーが帯域や計算資源を独占しないよう上限を設け、
                  すべての利用者が一定の応答性を得られるようにする。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  コスト管理
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  従量課金の外部 API
                  や計算資源を下流に持つ場合、リクエスト数の上限が
                  そのままコストの上限になる。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="スロットリングとレート制限">
              「レート制限」は上限を超えたリクエストを拒否することを指し、「スロットリング」は
              超過分を遅延させたり間引いたりして流量を均す挙動を指すことが多い用語です。
              実務では厳密に区別せず使われることもありますが、「拒否」か「平準化」かで
              クライアントへの返し方が変わる点は意識しておくとよいです。
            </InfoBox>
          </section>

          {/* 429 と Retry-After */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              429 Too Many Requests と Retry-After
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              上限を超えたリクエストに対しては
              <code>429 Too Many Requests</code>
              を返します（RFC 6585 で定義）。 そして
              <strong>
                <code>Retry-After</code>{" "}
                ヘッダーで「いつ再試行してよいか」を伝えます
              </strong>
              。 値は<strong>秒数</strong>（例: <code>Retry-After: 30</code>
              ）か、
              <strong>HTTP 日時</strong>（例:{" "}
              <code>Retry-After: Wed, 21 Oct 2026 07:28:00 GMT</code>
              ）のどちらかです。
              これにより、クライアントは無駄に即リトライせず、適切なタイミングまで待てます。
            </p>

            <CodeBlock
              language="http"
              title="上限超過時のレスポンス例（429 + Retry-After + RateLimit 系ヘッダー）"
              code={`HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 30
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1782547680

{
  "error": "rate_limited",
  "message": "リクエストが多すぎます。30秒後に再試行してください。"
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>X-RateLimit-Reset</code>{" "}
              の値はサービスによって表現が異なります。Unix
              タイムスタンプ（上の例）を使う実装もあれば、リセットまでの残り秒数を入れる実装もあります。
              利用する API
              のドキュメントで「絶対時刻か、残り秒数か」を必ず確認してください。
            </p>

            <InfoBox
              type="info"
              title="429 は「あとで成功しうる」ことを意味する"
            >
              <code>429</code>{" "}
              はクライアント側のエラーですが、「今は多すぎる」だけで、時間を置けば成功しうる一時的な状態です。
              これに対して <code>400</code>{" "}
              のようなリクエスト自体の誤りは、同じ内容で再送しても成功しません。
              リトライしてよいエラーかどうかをステータスで判断できることが、機械可読な
              API の利点です。
            </InfoBox>
          </section>

          {/* 慣習ヘッダー vs 標準 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ヘッダーの「慣習」と「標準化」のギャップ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              残り回数やリセット時刻を伝えるヘッダーには、長らく公式な標準がありませんでした。
              そのため多くの API が <code>X-RateLimit-Limit</code> /{" "}
              <code>X-RateLimit-Remaining</code> /{" "}
              <code>X-RateLimit-Reset</code> という名前を事実上の標準（de
              facto）として使ってきました。 一方で IETF
              では、これらに代わる正式な
              <code>RateLimit</code>{" "}
              系ヘッダーの標準化が進行中（Internet-Draft）です。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    慣習（de facto）
                  </p>
                  <p className="text-muted-foreground">
                    <code>X-RateLimit-Limit</code> /{" "}
                    <code>X-RateLimit-Remaining</code> /{" "}
                    <code>X-RateLimit-Reset</code>。多くの既存 API
                    で使われており、相互運用の実績が厚い。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">標準化（draft）</p>
                  <p className="text-muted-foreground">
                    IETF で <code>RateLimit</code> /{" "}
                    <code>RateLimit-Policy</code> 系の標準化が Internet-Draft
                    として進行中。仕様は更新されうるため固定値として扱わない。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox
              type="warning"
              title="X-RateLimit-* は de facto、標準は IETF draft（進行中）"
            >
              <code>X-RateLimit-*</code> は RFC
              で定義された正式な標準ヘッダーではなく、業界で広まった慣習です。
              一方、IETF の <code>RateLimit</code> 系ヘッダーは Internet-Draft
              の段階で、内容が変わる可能性があります。
              実装するなら「既存クライアントと相互運用しやすい慣習ヘッダーを返しつつ、
              標準が固まったら移行する」という二段構えが現実的です。
              いずれにせよ、
              <strong>
                再試行の可否は標準の <code>Retry-After</code> で確実に伝える
              </strong>
              のが安全です。
            </InfoBox>
          </section>

          {/* アルゴリズム比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              レート制限アルゴリズムの比較
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「1分に100回まで」をどう数えるかには複数の方式があります。
              バーストをどこまで許すか、実装・メモリのコストをどこまで許容するかで選びます。
              代表的な4方式を比較します。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      方式
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      仕組み
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      長所
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      短所
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {algorithms.map((a) => (
                    <tr key={a.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {a.name}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {a.summary}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {a.pro}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {a.con}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="success" title="迷ったらトークンバケット">
              トークンバケットは、普段は溜まったトークン分のバースト（瞬間的な集中）を許容しつつ、
              長い目では補充レートに収束させられるため、多くの API
              やゲートウェイで採用されています。
              「平常時は柔軟に、長期的には平均レートで制限したい」という要件によく合います。
            </InfoBox>
          </section>

          {/* 制限の単位 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              何を単位に制限するか（キー / ユーザー / IP）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              同じ「100回/分」でも、何を1つの主体として数えるかで意味が変わります。
              用途に応じて単位を選び、組み合わせることもあります。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      単位
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      特徴と向き不向き
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scopes.map((s) => (
                    <tr key={s.unit} className="border-b border-border">
                      <td className="py-2 pr-4 font-bold text-primary whitespace-nowrap align-top">
                        {s.unit}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {s.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              実務では、認証前のログインエンドポイントは IP
              単位で守り、認証後はユーザー単位や API
              キー単位に切り替える、といった併用がよく行われます。
              どの単位でカウントしているかを <code>X-RateLimit-*</code>{" "}
              などで開示すると、利用者が自分のペースを把握しやすくなります。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="API が上限超過のリクエストに返すべきステータスと、再試行タイミングを伝えるヘッダーの組み合わせは？"
              options={[
                { label: "503 Service Unavailable と Location" },
                {
                  label: "429 Too Many Requests と Retry-After",
                  correct: true,
                },
                { label: "403 Forbidden と Allow" },
                { label: "400 Bad Request と Cache-Control" },
              ]}
              explanation="上限超過は 429 Too Many Requests（RFC 6585）で返し、いつ再試行してよいかは Retry-After ヘッダーで伝えます。Retry-After の値は秒数か HTTP 日時のいずれかで、クライアントはこれに従って待ってから再送します。"
            />
          </section>

          {/* クライアント側の作法 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              クライアント側の作法 — 指数バックオフとジッター
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              良いクライアントは、<code>429</code> を受けたら
              <strong>
                まず <code>Retry-After</code> に従います
              </strong>
              。 ヘッダーが無い場合や一時的な障害（<code>503</code> など）では、
              <strong>指数バックオフ</strong>
              （再試行ごとに待ち時間を倍々に伸ばす）で
              サーバへの負荷を抑えます。さらに<strong>ジッター</strong>
              （待ち時間に乱数のばらつきを加える）を入れて、
              多数のクライアントが同時刻にリトライして再び詰まる「同期した波」を防ぎます。
            </p>

            <CodeBlock
              language="ts"
              title="429 を尊重しつつ、指数バックオフ + ジッターで再試行する擬似コード"
              code={`// 最大リトライ回数まで、429/503 を指数バックオフで再試行する
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 5,
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await fetch(url, options);

    // 成功、または再試行で解決しないエラーはそのまま返す
    if (res.status !== 429 && res.status !== 503) {
      return res;
    }
    if (attempt === maxRetries) {
      return res; // リトライ上限。呼び出し側でハンドリング
    }

    // ① サーバが Retry-After を返していれば最優先で従う（秒数を想定）
    const retryAfter = res.headers.get("Retry-After");
    let waitMs: number;
    if (retryAfter !== null && /^\\d+$/.test(retryAfter)) {
      waitMs = Number(retryAfter) * 1000;
    } else {
      // ② 無ければ指数バックオフ: base * 2^attempt
      const base = 500; // 0.5秒
      waitMs = base * 2 ** attempt;
    }

    // ③ ジッター: 待ち時間に 0〜100% のばらつきを足し、同時リトライを分散
    const jitter = Math.random() * waitMs;
    await new Promise((resolve) => setTimeout(resolve, waitMs + jitter));
  }

  throw new Error("unreachable");
}`}
            />

            <InfoBox
              type="warning"
              title="429 を無視した即時リトライは状況を悪化させる"
            >
              上限に達したクライアントが待たずに連打すると、サーバの負荷はさらに上がり、
              他の利用者の応答も巻き添えで悪化します。<code>Retry-After</code>{" "}
              が示す時刻まで待つ、無ければ指数バックオフで間隔を空ける——これが
              「行儀の良いクライアント」の基本です。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="トークンバケット方式の特徴として最も適切なのは？"
              options={[
                {
                  label:
                    "溜まったトークン分のバーストを許容しつつ、平均レートを制限できる",
                  correct: true,
                },
                {
                  label: "出力を常に一定レートに均し、バーストを一切許容しない",
                },
                {
                  label: "固定の時間枠ごとにカウントを0に戻すだけの単純な方式",
                },
                {
                  label: "リクエストのタイムスタンプを保持せずメモリを使わない",
                },
              ]}
              explanation="トークンバケットは一定レートでトークンを補充し、リクエストごとに1つ消費します。普段使わずに溜まったトークン分のバースト（瞬間的な集中）を許容しつつ、長期的には補充レート＝平均レートに収束させられます。出力を常に一定に均すのはリーキーバケットの性質です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "MDN - 429 Too Many Requests",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Status/429",
                  description:
                    "429 ステータスと Retry-After ヘッダーの使い方を日本語で解説",
                },
                {
                  title: "MDN - Retry-After",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Retry-After",
                  description:
                    "秒数 / HTTP 日時のどちらでも指定できる Retry-After の仕様",
                },
                {
                  title: "RFC 6585 - Additional HTTP Status Codes",
                  url: "https://www.rfc-editor.org/rfc/rfc6585",
                  description:
                    "429 Too Many Requests を定義した一次仕様（4.4 節）",
                },
                {
                  title: "IETF - RateLimit header fields for HTTP (draft)",
                  url: "https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/",
                  description:
                    "RateLimit 系ヘッダーの標準化を進める Internet-Draft。慣習との差を確認できる",
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
