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

const uiStates = [
  {
    state: "loading",
    when: "リクエスト送信中。まだデータも失敗も確定していない。",
    ui: "スケルトンやスピナーを表示。レイアウトのガタつきを避ける。",
  },
  {
    state: "error",
    when: "通信失敗・4xx/5xx・パース失敗など。",
    ui: "原因と再試行ボタンを示す。「失敗しました」だけで終わらせない。",
  },
  {
    state: "empty",
    when: "成功したが配列が 0 件。",
    ui: "「データがありません」と次の行動を提示。loading と区別する。",
  },
  {
    state: "success",
    when: "データが 1 件以上ある。",
    ui: "本来の一覧・詳細を描画する。",
  },
];

export default function ReactApi() {
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
            React での API 連携
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            SPA（クライアントサイドの React）から API
            を呼ぶときに毎回ぶつかるのが、
            「読み込み中・エラー・空・成功」をどう扱うか、そして「画面の表示中に
            別のリクエストが返ってきたらどうするか」です。素の{" "}
            <code>fetch</code> + <code>useEffect</code> から始めて、 TanStack
            Query
            でサーバ状態の管理をライブラリに任せる流れ、最後に型安全な呼び出しまでを実装で見ていきます。
          </p>
        </div>

        <WhyNowBox
          tags={["React", "fetch", "useEffect", "TanStack Query", "型安全"]}
        >
          <p>
            API 連携のコードは、最初は <code>fetch</code> を{" "}
            <code>useEffect</code> で呼ぶだけに見えます。
            ところが実運用では、依存配列の漏れによる無限ループ、
            アンマウント後の状態更新、
            連続入力で古いレスポンスが後から上書きする
            <strong>レースコンディション</strong>
            が必ず出てきます。これらは「サーバ状態」という、 React の{" "}
            <code>useState</code>
            が本来想定していない領域の問題です。
            正しい道具立てを知っておくと、最初から壊れにくい連携が書けます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* サーバ状態とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              「サーバ状態」はクライアント状態とは別物
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              React の <code>useState</code>{" "}
              は、フォーム入力やモーダルの開閉など
              <strong>クライアントが所有する状態</strong>
              を扱うのに向いています。 一方 API
              から取ってくるデータは、本当の持ち主がサーバ側にいる
              <strong>サーバ状態</strong>です。
              手元のコピーはいつ古くなるか分からず、
              キャッシュ・再取得・複数画面での共有といった固有の悩みを抱えます。
              ここを <code>useState</code>
              だけで管理しようとすると、コードが膨らんでいきます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    クライアント状態
                  </p>
                  <p className="text-muted-foreground">
                    入力値・タブの選択・開閉フラグなど。持ち主は自分。
                    <code>useState</code> / <code>useReducer</code> で十分。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">サーバ状態</p>
                  <p className="text-muted-foreground">
                    API
                    が返すデータ。持ち主はサーバ。鮮度・キャッシュ・再取得が論点になり、
                    専用ライブラリの出番。
                  </p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              この記事ではまず素の <code>fetch</code>
              で「何が大変か」を体感し、その大変さを TanStack Query
              がどう肩代わりするかという順で進めます。データの型を OpenAPI
              から生成して固める話は{" "}
              <Link
                href="/react/api-design/openapi-swagger"
                className="text-primary underline underline-offset-2"
              >
                OpenAPI / Swagger の章
              </Link>
              と地続きです。
            </p>
          </section>

          {/* 素の fetch + useEffect */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              素の fetch + useEffect — 3 状態と後始末
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ライブラリを入れる前に、手で書くとどうなるかを押さえます。最低限
              <code>data</code> / <code>loading</code> / <code>error</code> の 3
              状態を持ち、<code>useEffect</code>
              の依存配列に「再取得のトリガーになる値」を正しく並べます。 そして
              <strong>後始末（クリーンアップ）</strong>が要です。
              ユーザーが素早く操作して複数のリクエストが飛ぶと、
              <strong>
                遅く出発したリクエストが先に出発したものより後に返る
              </strong>
              ことがあり、 古い結果が新しい結果を上書きしてしまいます。これが
              レースコンディションです。<code>AbortController</code>
              で前のリクエストを中断し、 アンマウント時には状態更新を止めます。
            </p>

            <CodeBlock
              language="tsx"
              title="useEffect + AbortController で 3 状態とレースを処理する"
              code={`import { useEffect, useState } from "react";

type User = { id: number; name: string };

function useUser(userId: number) {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // この effect 専用のコントローラ。後で中断に使う
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(\`/api/users/\${userId}\`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json() as Promise<User>;
      })
      .then((json) => setData(json))
      .catch((err: unknown) => {
        // 中断は失敗ではないので握りつぶす
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err : new Error("unknown"));
      })
      .finally(() => setLoading(false));

    // userId が変わった時 / アンマウント時に前リクエストを中断
    return () => controller.abort();
  }, [userId]); // ← 依存配列に userId を入れ忘れると古い id のまま固定される

  return { data, loading, error };
}`}
            />

            <InfoBox
              type="warning"
              title="依存配列とクリーンアップは対で考える"
            >
              依存配列に <code>userId</code>
              を入れ忘れると、最初の id のまま再取得されません。
              逆に毎レンダー新しく作られる関数やオブジェクトを依存に入れると、
              無限に再取得されます。そして
              <code>return () =&gt; controller.abort()</code>{" "}
              を返さないと、画面を離れた後にレスポンスが届いて
              「アンマウント済みコンポーネントの状態更新」になります。
              <strong>依存配列とクリーンアップは必ずセットで設計</strong>
              します。 これは dev-album の React 章で扱う <code>
                useEffect
              </code>{" "}
              の挙動と同じ原則です。
            </InfoBox>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ここまでで分かるのは、<strong>1 つの API</strong>
              を呼ぶだけでも考えることが多い、ということです。
              これを画面ごと・エンドポイントごとに手書きすると、
              キャッシュ・再取得・重複排除といった共通の悩みを毎回作り込むことになります。
            </p>
          </section>

          {/* TanStack Query: useQuery */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              TanStack Query — useQuery で宣言的に取得する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>TanStack Query</strong>（旧 React Query）は、
              サーバ状態の管理を専門に引き受けるライブラリです。
              <code>useQuery</code> に「このデータの一意なキー（
              <code>queryKey</code>）」と「取得関数（<code>queryFn</code>）」を
              渡すだけで、<code>data</code> / <code>isPending</code> /{" "}
              <code>isError</code>{" "}
              を宣言的に受け取れます。キャッシュ・重複リクエストの排除・
              ウィンドウ復帰時の自動再取得・<code>stale</code>
              （鮮度切れ）の管理を、 ライブラリ側が面倒を見ます。
            </p>

            <CodeBlock
              language="tsx"
              title="useQuery: 取得と状態分岐を宣言的に書く"
              code={`import { useQuery } from "@tanstack/react-query";

type User = { id: number; name: string };

async function fetchUser(userId: number): Promise<User> {
  const res = await fetch(\`/api/users/\${userId}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}

function UserCard({ userId }: { userId: number }) {
  const { data, isPending, isError, error } = useQuery({
    // 同じ queryKey の取得は自動で重複排除・共有される
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    staleTime: 30_000, // 30 秒は「新鮮」とみなし再取得しない
  });

  if (isPending) return <p>読み込み中…</p>;
  if (isError) return <p>取得に失敗: {error.message}</p>;
  return <p>{data.name}</p>;
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              先ほど手書きした <code>AbortController</code>
              や依存配列の管理、ローディング/エラーの
              <code>useState</code> は、すべて <code>useQuery</code>
              の内部に隠れます。 取得元が変わったら <code>queryKey</code>
              に値を含めるだけで、古いリクエストの扱いも 任せられます。書くのは
              <strong>「キー」と「取り方」だけ</strong>です。
            </p>

            <InfoBox type="info" title="サーバ状態は useState で抱えない">
              API から取ったデータをそのまま <code>useState</code>{" "}
              に入れて自前で loading / error
              を管理するのは、小さな画面では動きますが、
              キャッシュ・再取得・複数画面での共有が絡むと破綻します。
              <strong>
                サーバ状態は TanStack Query 等の専用ライブラリに任せ
              </strong>
              、<code>useState</code>
              はフォーム入力やUIの開閉といったクライアント状態に専念させると、
              役割が分かれて見通しが良くなります。
            </InfoBox>
          </section>

          {/* TanStack Query: useMutation */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              useMutation — 作成・更新と invalidate
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              取得が <code>useQuery</code> なら、作成・更新・削除のような
              <strong>状態を変える操作</strong>は <code>useMutation</code>{" "}
              です。 成功したら <code>queryClient.invalidateQueries</code>{" "}
              で関連する
              <code>queryKey</code>
              を「古い」と印付けします。すると該当の <code>useQuery</code>{" "}
              が自動で 再取得され、一覧が最新の状態に更新されます。手で
              <code>setData</code> し直す必要はありません。
            </p>

            <CodeBlock
              language="tsx"
              title="useMutation: 作成後に一覧を再取得させる"
              code={`import { useMutation, useQueryClient } from "@tanstack/react-query";

type NewUser = { name: string };

async function createUser(input: NewUser) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}

function CreateUserButton() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // ["users"] を古い印にする → 該当 useQuery が自動再取得される
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <button
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ name: "新規ユーザー" })}
    >
      {mutation.isPending ? "作成中…" : "作成"}
    </button>
  );
}`}
            />

            <InfoBox type="success" title="読み取りと書き込みで道具を分ける">
              <code>useQuery</code> は「サーバの今を映す（読み取り）」、
              <code>useMutation</code> は「サーバを変える（書き込み）」と
              役割がはっきり分かれます。書き込みのあとに{" "}
              <code>invalidateQueries</code> で 読み取り側を更新する、という
              一方向の流れを守ると、画面とサーバの整合が取りやすくなります。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="素の fetch を useEffect で呼ぶとき、AbortController を使う主な目的は？"
              options={[
                {
                  label:
                    "依存値の変化やアンマウント時に古いリクエストを中断し、レースや不要な状態更新を防ぐ",
                  correct: true,
                },
                { label: "リクエストを高速化してレスポンスを早く返すため" },
                { label: "JSON のパースを自動で行うため" },
                {
                  label: "サーバ側でリクエストをキャッシュさせるため",
                },
              ]}
              explanation="AbortController は、useEffect の依存値が変わった時やコンポーネントのアンマウント時に return のクリーンアップで abort() を呼び、進行中のリクエストを中断します。これにより「遅れて返った古いレスポンスが新しい結果を上書きする」レースコンディションや、アンマウント後の状態更新を防げます。速度やキャッシュとは無関係です。"
            />
          </section>

          {/* 型安全 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              型安全 — OpenAPI から型を生成して呼ぶ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>fetch</code> の戻り値は既定で <code>any</code>{" "}
              寄りになりがちで、
              <code>res.json()</code> は標準の型定義で{" "}
              <code>Promise&lt;any&gt;</code>{" "}
              です（だからこそ放置すると危険）。
              手で型注釈を書くと、サーバの定義とズレても気づけません。
              そこで OpenAPI 定義から型を生成する{" "}
              <strong>openapi-typescript</strong>{" "}
              と、その型を使う薄いクライアント
              <strong>openapi-fetch</strong>
              を組み合わせると、パス・メソッド・パラメータ・レスポンスが
              すべて型でチェックされます。<code>id</code> が int
              なのか文字列なのか といった
              <strong>契約のズレ</strong>を、実行前に検出できます。
            </p>

            <CodeBlock
              language="bash"
              title="OpenAPI 定義から型を生成する"
              code={`# OpenAPI スキーマ(JSON/YAML) から TypeScript の型を生成
npx openapi-typescript ./openapi.yaml -o ./src/api/schema.d.ts`}
            />

            <CodeBlock
              language="ts"
              title="openapi-fetch: 生成した型で呼び出す"
              code={`import createClient from "openapi-fetch";
import type { paths } from "./api/schema"; // ← 生成された型

const client = createClient<paths>({ baseUrl: "/api" });

// パス・メソッド・パラメータ・レスポンスがすべて型チェックされる
const { data, error } = await client.GET("/users/{id}", {
  params: { path: { id: 42 } }, // id の型はスキーマ由来。文字列を渡すと型エラー
});

if (error) {
  // error も OpenAPI のエラースキーマで型付けされる
  console.error(error);
} else {
  // data は User 型として推論される
  data.name;
}`}
            />

            <InfoBox
              type="info"
              title="object 型は any ではなく index signature になる"
            >
              <code>openapi-typescript</code> は、追加プロパティを持つ{" "}
              <code>object</code>（<code>additionalProperties</code>）を{" "}
              <code>{"{ [key: string]: unknown }"}</code> にマップします。
              <code>any</code>{" "}
              ではないので、未知のキーを触れば型エラーになります。
              なお、生成した型と実サーバが食い違うのは「契約のズレ」の典型で、
              <code>id</code> が仕様では int
              なのに実装が文字列を返す、といった例が起きます。
              型生成は「仕様」を固めますが、「実装が仕様どおり」かは
              契約テストで別途担保します。
            </InfoBox>
          </section>

          {/* UI 状態 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              loading / error / empty を描き分ける
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              API 連携の体験は、データが返ってきた後だけでなく、
              <strong>返ってくるまで</strong>と<strong>返ってこない時</strong>
              で決まります。 成功した上で 0
              件だった「空」と、まだ取得中の「読み込み中」を
              同じ表示にすると、ユーザーは「壊れたのか待てばいいのか」を判断できません。
              最低限、次の 4
              状態を別々に描き分けます（デザイン章の状態設計と同じ考え方です）。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      状態
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      いつ
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      UI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {uiStates.map((s) => (
                    <tr key={s.state} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {s.state}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {s.when}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {s.ui}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="tsx"
              title="4 状態を素直に分岐する"
              code={`function UserList() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isPending) return <Skeleton rows={5} />;           // 読み込み中
  if (isError) return <ErrorState message={error.message} onRetry={...} />; // エラー
  if (data.length === 0) return <EmptyState />;          // 空（成功 0 件）
  return (
    <ul>
      {data.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              エラー表示は「失敗しました」で止めず、
              <strong>再試行ボタン</strong>
              を添えます。空表示は「データがありません」 に加えて「最初の 1
              件を作る」導線を置くと、行き止まりになりません。 これらは{" "}
              <code>useQuery</code> の<code>isPending</code> /{" "}
              <code>isError</code> / <code>data.length</code>{" "}
              をそのまま分岐に使えます。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="素の fetch + useState ではなく useQuery（TanStack Query）を使う利点として正しいものは？"
              options={[
                {
                  label:
                    "キャッシュ・重複リクエストの排除・自動再取得・loading/error の管理をライブラリが宣言的に引き受ける",
                  correct: true,
                },
                {
                  label: "API のレスポンス自体が物理的に速くなる",
                },
                {
                  label: "CORS エラーが自動的に回避される",
                },
                {
                  label: "サーバ側のバリデーションが不要になる",
                },
              ]}
              explanation="useQuery は queryKey をキーにキャッシュし、同一キーの重複リクエストを排除し、ウィンドウ復帰時などに自動再取得し、loading（isPending）/ error（isError）を宣言的に提供します。つまりサーバ状態の管理という面倒をライブラリに任せられるのが利点です。通信速度や CORS、サーバ側バリデーションは別レイヤーの話で、useQuery が解決するものではありません。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TanStack Query 公式ドキュメント",
                  url: "https://tanstack.com/query/latest/docs/framework/react/overview",
                  description:
                    "useQuery / useMutation / queryClient とサーバ状態管理の考え方",
                },
                {
                  title: "openapi-typescript",
                  url: "https://openapi-ts.dev/",
                  description:
                    "OpenAPI 定義から TypeScript 型を生成。openapi-fetch も同ファミリー",
                },
                {
                  title: "MDN - fetch() を使用する",
                  url: "https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch",
                  description:
                    "fetch の基本・AbortController による中断・エラーハンドリング",
                },
                {
                  title: "MDN - AbortController",
                  url: "https://developer.mozilla.org/ja/docs/Web/API/AbortController",
                  description:
                    "進行中のリクエストを中断する仕組み。レース対策の中核",
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
