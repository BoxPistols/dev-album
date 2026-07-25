import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';
import { Link } from 'wouter';

export default function OpenApiSwagger() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 35</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">OpenAPI / Swagger</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          REST API の「設計図」を書く標準規格 OpenAPI と、その設計図から
          ドキュメント・モックサーバー・型安全なクライアントを自動生成する仕組みを学びます。
          まずは実際に API を叩いて体験しましょう。
        </p>

        <WhyNowBox tags={['OpenAPI', 'Swagger UI', 'API 設計', '型生成', 'モック']}>
          <p>
            前のステップで GraphQL を学びましたが、現在の Web 開発では REST API が依然として主流です。
            REST を「なんとなく」使うのではなく、OpenAPI で仕様を明文化すると、
            フロントとバックの認識ズレを防ぎ、型やドキュメントを自動生成できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">

          {/* ── セクション1: API デバッガーで体験 ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まず API を叩いてみよう</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              REST API がどう動くか、実際にリクエストを送って確かめましょう。
              下のデバッガーで HTTP メソッドと URL を変えてリクエストを送信できます。
              公開 API（JSONPlaceholder）を使っているので安全です。
            </p>

            <CodePreview
              code={`function App() {
  const [method, setMethod] = React.useState("GET")
  const [path, setPath] = React.useState("/users")
  const [body, setBody] = React.useState('{ "name": "テスト太郎", "email": "test@example.com" }')
  const [response, setResponse] = React.useState(null)
  const [status, setStatus] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [elapsed, setElapsed] = React.useState(null)

  const BASE = "https://jsonplaceholder.typicode.com"

  const presets = [
    { label: "ユーザー一覧", method: "GET", path: "/users" },
    { label: "ユーザー1件", method: "GET", path: "/users/1" },
    { label: "投稿一覧(3件)", method: "GET", path: "/posts?_limit=3" },
    { label: "投稿を作成", method: "POST", path: "/posts" },
  ]

  const send = async () => {
    setLoading(true)
    setResponse(null)
    const start = Date.now()
    try {
      const opts = { method, headers: { "Content-Type": "application/json" } }
      if (method === "POST" || method === "PUT") opts.body = body
      const res = await fetch(BASE + path, opts)
      const data = await res.json()
      setStatus(res.status)
      setElapsed(Date.now() - start)
      setResponse(JSON.stringify(data, null, 2))
    } catch (e) {
      setStatus("Error")
      setResponse(e.message)
      setElapsed(Date.now() - start)
    }
    setLoading(false)
  }

  const statusColor = status >= 200 && status < 300 ? "#22C55E" : status >= 400 ? "#EF4444" : "#6B7280"

  return (
    <div style={{ fontFamily: "system-ui", padding: "16px", fontSize: "14px" }}>
      <div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "16px" }}>REST API デバッガー</div>

      <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
        {presets.map((p, i) => (
          <button key={i} onClick={() => { setMethod(p.method); setPath(p.path) }}
            style={{ padding: "4px 10px", background: "#F3F4F6", color: "#1f2937", border: "1px solid #E5E7EB", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
        <select value={method} onChange={e => setMethod(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #D1D5DB", fontWeight: "bold", fontSize: "14px",
            color: method === "GET" ? "#3B82F6" : method === "POST" ? "#22C55E" : method === "PUT" ? "#F59E0B" : "#EF4444" }}>
          <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
        </select>
        <input value={path} onChange={e => setPath(e.target.value)}
          style={{ flex: 1, padding: "8px 12px", borderRadius: "6px", border: "1px solid #D1D5DB", fontFamily: "monospace", fontSize: "14px" }}
          placeholder="/users" />
        <button onClick={send} disabled={loading}
          style={{ padding: "8px 20px", background: "#3B82F6", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", opacity: loading ? 0.6 : 1 }}>
          {loading ? "..." : "送信"}
        </button>
      </div>

      {(method === "POST" || method === "PUT") && (
        <div style={{ marginBottom: "8px" }}>
          <div style={{ fontSize: "14px", color: "#6B7280", marginBottom: "4px" }}>Request Body (JSON)</div>
          <textarea value={body} onChange={e => setBody(e.target.value)}
            style={{ width: "100%", height: "60px", padding: "8px", borderRadius: "6px", border: "1px solid #D1D5DB", fontFamily: "monospace", fontSize: "14px", resize: "vertical", boxSizing: "border-box" }} />
        </div>
      )}

      <div style={{ background: "#1F2937", borderRadius: "8px", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", borderBottom: "1px solid #374151" }}>
          <span style={{ color: "#9CA3AF", fontSize: "14px" }}>Response</span>
          <div style={{ display: "flex", gap: "12px" }}>
            {status && <span style={{ color: statusColor, fontSize: "14px", fontWeight: "bold" }}>Status: {status}</span>}
            {elapsed != null && <span style={{ color: "#9CA3AF", fontSize: "14px" }}>{elapsed}ms</span>}
          </div>
        </div>
        <pre style={{ color: "#D1D5DB", padding: "12px", fontSize: "14px", fontFamily: "monospace", maxHeight: "200px", overflow: "auto", margin: 0, whiteSpace: "pre-wrap" }}>
          {response || "// プリセットボタンを選んで「送信」を押してみよう"}
        </pre>
      </div>
    </div>
  )
}`}
              title="API デバッガー: メソッドと URL を変えてリクエストを送ってみよう"
              previewHeight={430}
            />

            <p className="text-muted-foreground mt-4 mb-2 leading-relaxed">
              試してみましたか？ いくつか気づくことがあるはずです。
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
              <li><code>GET /users</code> — ユーザー一覧が返る。各ユーザーにはメール、住所、会社など全フィールドが含まれる</li>
              <li><code>GET /users/1</code> — ID 指定で 1 人だけ取得できる</li>
              <li><code>POST /posts</code> — Request Body の JSON でデータを送信し、201 Created が返る</li>
            </ul>

            <InfoBox type="info" title="これが REST API の基本パターン">
              <p>
                URL（エンドポイント）と HTTP メソッド（GET/POST/PUT/DELETE）の組み合わせで
                何をするかが決まります。この「どんなエンドポイントがあり、何を送って何が返るか」を
                正確に記述するのが、次に学ぶ OpenAPI の役割です。
              </p>
            </InfoBox>
          </section>

          {/* ── セクション2: OpenAPI とは ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">OpenAPI とは「API の設計図」</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              上のデバッガーで API を使えましたが、次の情報はどこに書いてありますか？
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-lg border border-border bg-card text-sm">
                <span className="text-foreground font-medium">Q.</span> <code>/users</code> にはどんなクエリパラメータが使える？
              </div>
              <div className="p-3 rounded-lg border border-border bg-card text-sm">
                <span className="text-foreground font-medium">Q.</span> POST で送る JSON の必須フィールドは？
              </div>
              <div className="p-3 rounded-lg border border-border bg-card text-sm">
                <span className="text-foreground font-medium">Q.</span> レスポンスのデータ型は？
              </div>
              <div className="p-3 rounded-lg border border-border bg-card text-sm">
                <span className="text-foreground font-medium">Q.</span> 認証は必要？ どの方式？
              </div>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              これらを <strong>YAML ファイル 1 つに全部書く</strong>のが OpenAPI Specification（OAS）です。
              元は「Swagger」という名前でしたが、2016 年に OpenAPI に改称されました。
              現在の Swagger はツール群（Swagger UI, Swagger Editor）のブランド名です。
            </p>

            {/* 用語カード */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                <h3 className="font-bold text-foreground mb-1 text-sm">OpenAPI Specification</h3>
                <p className="text-xs text-muted-foreground">API の仕様を記述する<strong>規格</strong>（YAML/JSON）</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-1 text-sm">Swagger UI</h3>
                <p className="text-xs text-muted-foreground">OpenAPI 定義から<strong>ドキュメントを自動生成</strong>するツール</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-1 text-sm">Swagger Editor</h3>
                <p className="text-xs text-muted-foreground">ブラウザ上で OpenAPI 定義を<strong>編集・プレビュー</strong></p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-1 text-sm">コード生成ツール</h3>
                <p className="text-xs text-muted-foreground">定義から TypeScript の<strong>型と API クライアントを生成</strong></p>
              </div>
            </div>

            <Quiz
              question="「OpenAPI」と「Swagger」の関係は？"
              options={[
                { label: '全く別のプロジェクト' },
                { label: 'OpenAPI は仕様の名前、Swagger はツール群のブランド名', correct: true },
                { label: 'Swagger は OpenAPI の旧バージョン' },
                { label: '同じものの別名' },
              ]}
              explanation="元は Swagger Specification という名前でしたが、仕様自体は OpenAPI Specification に改称されました。Swagger の名前は Swagger UI / Editor / Codegen などのツール群のブランドとして残っています。"
            />
          </section>

          {/* ── セクション3: 定義の書き方 ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">OpenAPI 定義の書き方</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              OpenAPI 定義は YAML で書くのが一般的です。
              ここでは Todo API を例に、OpenAPI 定義のパーツを順に見ていきましょう。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. API の基本情報</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              まず「この API は何で、どこにあるか」を宣言します。
            </p>

            <CodeBlock
              language="yaml"
              title="openapi.yaml: ヘッダー部分"
              showLineNumbers
              code={`openapi: "3.1.0"              # OpenAPI のバージョン
info:
  title: Todo API              # API の名前
  description: タスク管理 API   # 説明
  version: "1.0.0"             # API のバージョン

servers:                       # API サーバーの URL
  - url: https://api.example.com/v1
    description: 本番環境
  - url: http://localhost:3000/v1
    description: 開発環境`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">2. エンドポイント定義</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              「どの URL に何を送ると何が返るか」を定義します。
              デバッガーで試した <code>GET /todos</code> を記述してみましょう。
            </p>

            <CodeBlock
              language="yaml"
              title="paths: エンドポイントの定義"
              showLineNumbers
              code={`paths:
  /todos:
    get:                           # HTTP メソッド
      summary: Todo一覧を取得       # このエンドポイントの説明
      operationId: getTodos        # コード生成時の関数名になる
      parameters:                  # クエリパラメータの定義
        - name: status
          in: query                # URL のクエリ文字列
          description: 完了状態でフィルタ
          schema:
            type: string
            enum: [all, completed, pending]  # 許可される値
            default: all
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
      responses:                   # レスポンスの定義
        "200":
          description: 成功
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Todo"  # 型を参照`}
            />

            <InfoBox type="info" title="$ref とは？">
              <p>
                <code>$ref: "#/components/schemas/Todo"</code> は「同じファイル内の Todo 型定義を参照する」
                という意味です。同じ型を何度も書かなくて済み、変更も 1 箇所で済みます。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">3. データ型の定義</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              API で扱うデータの型（スキーマ）を定義します。
              TypeScript の interface に似ていますが、YAML で書きます。
            </p>

            <CodeBlock
              language="yaml"
              title="components/schemas: データ型の定義"
              showLineNumbers
              code={`components:
  schemas:
    Todo:
      type: object
      required:            # 必須フィールド
        - id
        - title
        - completed
      properties:
        id:
          type: string
          format: uuid     # UUID 形式であることを示す
          example: "550e8400-e29b-41d4-a716-446655440000"
        title:
          type: string
          minLength: 1     # バリデーション: 1文字以上
          maxLength: 200   # バリデーション: 200文字以下
          example: "牛乳を買う"
        completed:
          type: boolean
          default: false
        createdAt:
          type: string
          format: date-time`}
            />

            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              この定義を書くだけで、以下が自動的に得られます。
            </p>

            {/* 自動生成のフロー */}
            <div className="mb-6 p-5 rounded-xl border border-border bg-card">
              <h4 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">1 つの YAML から自動生成できるもの</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-primary/10 text-center">
                  <div className="text-lg mb-1">&#128196;</div>
                  <div className="text-xs font-bold text-foreground">openapi.yaml</div>
                  <div className="text-xs text-muted-foreground">API の設計図</div>
                </div>
                <div className="p-3 rounded-lg bg-muted text-center">
                  <div className="text-lg mb-1">&#128214;</div>
                  <div className="text-xs font-bold text-foreground">Swagger UI</div>
                  <div className="text-xs text-muted-foreground">ドキュメント</div>
                </div>
                <div className="p-3 rounded-lg bg-muted text-center">
                  <div className="text-lg mb-1">&#128187;</div>
                  <div className="text-xs font-bold text-foreground">TypeScript 型</div>
                  <div className="text-xs text-muted-foreground">型安全なコード</div>
                </div>
                <div className="p-3 rounded-lg bg-muted text-center">
                  <div className="text-lg mb-1">&#128640;</div>
                  <div className="text-xs font-bold text-foreground">モックサーバー</div>
                  <div className="text-xs text-muted-foreground">並行開発</div>
                </div>
              </div>
            </div>

            <Quiz
              question="OpenAPI 定義の operationId は何に使われる？"
              options={[
                { label: 'データベースの主キー' },
                { label: 'コード生成時の関数名やフック名', correct: true },
                { label: 'HTTP リクエストのヘッダー' },
                { label: 'API のバージョン番号' },
              ]}
              explanation="operationId: getTodos と書くと、コード生成ツールが useGetTodos() のような関数を自動生成します。分かりやすい名前をつけることが大切です。"
            />
          </section>

          {/* ── セクション4: 型安全なクライアント生成 ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">OpenAPI から型安全な API クライアントを生成</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              OpenAPI 定義があれば、TypeScript の型と API クライアントを<strong>自動生成</strong>できます。
              手動で <code>interface Todo &#123;...&#125;</code> や <code>fetch('/todos')</code> を書く必要がなくなります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">orval: React + TanStack Query 向け</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>orval</strong> は OpenAPI 定義から TanStack Query（旧 React Query）の
              カスタムフックを自動生成するツールです。
            </p>

            <CodeBlock
              language="bash"
              title="インストール"
              code={`pnpm add -D orval
pnpm add @tanstack/react-query`}
            />

            <p className="text-muted-foreground my-4 leading-relaxed">
              設定ファイルで「どの OpenAPI 定義から、どこに、何を生成するか」を指定します。
            </p>

            <CodeBlock
              language="typescript"
              title="orval.config.ts"
              showLineNumbers
              code={`import { defineConfig } from 'orval';

export default defineConfig({
  todoApi: {
    input: {
      target: './openapi.yaml',  // OpenAPI 定義の場所
    },
    output: {
      target: './src/api/generated',  // 生成先
      client: 'react-query',          // TanStack Query のフックを生成
    },
  },
});`}
            />

            <p className="text-muted-foreground my-4 leading-relaxed">
              <code>npx orval</code> を実行すると、型とフックが自動生成されます。
              使い方は手書きの場合と比べてみましょう。
            </p>

            <div className="my-6 p-4 rounded-xl border border-border bg-card">
              <h4 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider">手書き vs 自動生成</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-bold text-foreground mb-2">手書き（今までのやり方）</div>
                  <pre className="text-xs text-muted-foreground bg-muted p-3 rounded overflow-x-auto">{`// 型を手動で定義
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

// fetch を手動で書く
const res = await fetch('/todos');
const todos: Todo[] = await res.json();
// → API が変わっても型が古いまま...`}</pre>
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground mb-2">自動生成（orval）</div>
                  <pre className="text-xs text-muted-foreground bg-muted p-3 rounded overflow-x-auto">{`// 自動生成されたフックを使うだけ
import { useGetTodos } from './api/generated';

const { data, isLoading } = useGetTodos({
  status: 'pending',
  limit: 10,
});
// → data の型は自動で Todo[]
// → API が変わったら再生成するだけ`}</pre>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">openapi-typescript: 型だけ生成</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              フックは不要で型定義だけ欲しい場合は <code>openapi-typescript</code> + <code>openapi-fetch</code> の組み合わせが軽量です。
            </p>

            <CodeBlock
              language="tsx"
              title="openapi-fetch: パスも型安全な fetch"
              showLineNumbers
              code={`import createClient from 'openapi-fetch';
import type { paths } from './api/schema'; // 自動生成された型

const client = createClient<paths>({
  baseUrl: 'https://api.example.com/v1',
});

// パス名、クエリパラメータ、レスポンスがすべて型チェックされる
const { data, error } = await client.GET('/todos', {
  params: {
    query: { status: 'pending', limit: 10 },
  },
});
// data は Todo[] 型（自動推論）
// client.GET('/typo') はコンパイルエラー`}
            />

            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">ツール</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">何を生成する？</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">向いている場面</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">orval</td>
                    <td className="py-3 px-4">型 + React Query フック</td>
                    <td className="py-3 px-4">React プロジェクトですぐに使いたい</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">openapi-typescript</td>
                    <td className="py-3 px-4">型定義のみ</td>
                    <td className="py-3 px-4">fetch の書き方は自分で決めたい</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">openapi-generator</td>
                    <td className="py-3 px-4">型 + クライアント（多言語）</td>
                    <td className="py-3 px-4">TypeScript 以外の言語も使う</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Quiz
              question="OpenAPI 定義から自動生成した型を使うメリットは？"
              options={[
                { label: 'コードの実行速度が上がる' },
                { label: 'API の変更に型が自動追従し、不整合をコンパイル時に検知できる', correct: true },
                { label: 'サーバーが不要になる' },
                { label: 'テストを書かなくて済む' },
              ]}
              explanation="API の仕様が変わったら openapi.yaml を更新して再生成するだけで、古い型を使っている箇所がコンパイルエラーになります。手動管理では気づけない不整合を防げます。"
            />
          </section>

          {/* ── セクション5: モックサーバー ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">モックサーバーで並行開発</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              バックエンドの実装が完了する前に、フロントエンドの開発を先に始めたい。
              OpenAPI 定義があれば、それを元にモックサーバーを自動で立てられます。
            </p>

            {/* 開発フロー図 */}
            <div className="mb-6 p-5 rounded-xl border border-border bg-card">
              <h4 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">API ファースト開発フロー</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold mt-0.5">1</span>
                  <div>
                    <div className="text-sm font-bold text-foreground">OpenAPI 定義をチームで作成・レビュー</div>
                    <div className="text-xs text-muted-foreground">「/todos に GET すると Todo の配列が返る」などを YAML で合意</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold mt-0.5">2</span>
                  <div>
                    <div className="text-sm font-bold text-foreground">フロントとバックが並行開発</div>
                    <div className="text-xs text-muted-foreground">フロント: モックサーバーを使って UI を開発 / バック: 定義に沿って実装</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold mt-0.5">3</span>
                  <div>
                    <div className="text-sm font-bold text-foreground">統合テスト</div>
                    <div className="text-xs text-muted-foreground">モックを本番 API に切り替えて動作確認。定義が同じなので大きなズレが起きにくい</div>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              language="bash"
              title="Prism: OpenAPI からモックサーバーを自動起動"
              code={`# インストール
pnpm add -D @stoplight/prism-cli

# モックサーバーを起動（openapi.yaml の example 値がレスポンスに使われる）
npx prism mock openapi.yaml

# → http://127.0.0.1:4010 で API が利用可能
# → GET /todos → openapi.yaml の example に基づいたデータが返る`}
            />

            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              ブラウザ内でモックしたい場合は <strong>MSW（Mock Service Worker）</strong> が便利です。
              テスト時にも使えるため、フロントエンドプロジェクトでは広く採用されています。
            </p>

            <CodeBlock
              language="tsx"
              title="MSW: ブラウザ内でリクエストをインターセプト"
              showLineNumbers
              code={`import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

const handlers = [
  // GET /v1/todos をインターセプトしてモックデータを返す
  http.get('/v1/todos', () => {
    return HttpResponse.json([
      { id: '1', title: '牛乳を買う', completed: false },
      { id: '2', title: 'レポートを書く', completed: true },
    ]);
  }),

  // POST /v1/todos もモック
  http.post('/v1/todos', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      { id: crypto.randomUUID(), ...body, completed: false },
      { status: 201 }
    );
  }),
];

// 開発環境でのみ有効化
if (import.meta.env.DEV) {
  const worker = setupWorker(...handlers);
  worker.start();
}`}
            />
          </section>

          {/* ── セクション6: REST API 設計のコツ ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">REST API 設計のベストプラクティス</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              OpenAPI で定義する前に、REST API 自体の設計ルールを押さえておきましょう。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">エンドポイント設計</h3>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">メソッド</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">URL</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">意味</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-4"><code className="text-blue-600 dark:text-blue-400 font-bold">GET</code></td>
                    <td className="py-2 px-4"><code>/users</code></td>
                    <td className="py-2 px-4">一覧取得</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-4"><code className="text-green-600 dark:text-green-400 font-bold">POST</code></td>
                    <td className="py-2 px-4"><code>/users</code></td>
                    <td className="py-2 px-4">新規作成</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-4"><code className="text-blue-600 dark:text-blue-400 font-bold">GET</code></td>
                    <td className="py-2 px-4"><code>/users/&#123;id&#125;</code></td>
                    <td className="py-2 px-4">個別取得</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-4"><code className="text-yellow-600 dark:text-yellow-400 font-bold">PUT</code></td>
                    <td className="py-2 px-4"><code>/users/&#123;id&#125;</code></td>
                    <td className="py-2 px-4">全体更新</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-4"><code className="text-yellow-600 dark:text-yellow-400 font-bold">PATCH</code></td>
                    <td className="py-2 px-4"><code>/users/&#123;id&#125;</code></td>
                    <td className="py-2 px-4">部分更新（名前だけ変更など）</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4"><code className="text-red-600 dark:text-red-400 font-bold">DELETE</code></td>
                    <td className="py-2 px-4"><code>/users/&#123;id&#125;</code></td>
                    <td className="py-2 px-4">削除</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="URL の設計ルール">
              <p>
                URL には<strong>複数形の名詞</strong>を使います（<code>/users</code>, <code>/posts</code>）。
                動詞は使わず、HTTP メソッドで操作を表現します。
                <code>/users/1/posts</code> のようにネストする場合は「ユーザー 1 の投稿一覧」という所有関係を示します。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ステータスコード</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              API デバッガーで <code>Status: 200</code> や <code>201</code> が表示されていましたね。
              ステータスコードはリクエストの結果を番号で伝える仕組みです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
                <h3 className="font-bold text-foreground mb-2 text-sm">2xx 成功</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li><strong>200</strong> OK（一般的な成功）</li>
                  <li><strong>201</strong> Created（作成成功）</li>
                  <li><strong>204</strong> No Content（削除成功）</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20">
                <h3 className="font-bold text-foreground mb-2 text-sm">4xx クライアントエラー</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li><strong>400</strong> Bad Request（不正なリクエスト）</li>
                  <li><strong>401</strong> Unauthorized（認証必要）</li>
                  <li><strong>404</strong> Not Found（存在しない）</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
                <h3 className="font-bold text-foreground mb-2 text-sm">5xx サーバーエラー</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li><strong>500</strong> Internal Server Error</li>
                  <li><strong>503</strong> Service Unavailable</li>
                </ul>
              </div>
            </div>

            <Quiz
              question="POST /users で新しいユーザーを作成し成功した場合、適切なステータスコードは？"
              options={[
                { label: '200 OK' },
                { label: '201 Created', correct: true },
                { label: '204 No Content' },
                { label: '301 Moved Permanently' },
              ]}
              explanation="201 Created は「リソースの作成に成功した」ことを示す専用のステータスコードです。200 OK でも動きますが、201 のほうが作成操作であることが明確に伝わります。"
            />
          </section>

          {/* ── セクション7: GraphQL vs OpenAPI ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">GraphQL と REST + OpenAPI の使い分け</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              前のページで学んだ GraphQL と、このページの REST + OpenAPI。
              プロジェクトの特性に応じて選びましょう。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">観点</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">REST + OpenAPI</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">GraphQL</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">データ取得</td>
                    <td className="py-3 px-4">サーバーが形式を決定</td>
                    <td className="py-3 px-4">クライアントが形式を指定</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">キャッシュ</td>
                    <td className="py-3 px-4">URL ベースで自然にキャッシュ</td>
                    <td className="py-3 px-4">専用の仕組みが必要</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">学習コスト</td>
                    <td className="py-3 px-4">低い（HTTP の知識で十分）</td>
                    <td className="py-3 px-4">やや高い（専用言語）</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">向いている場面</td>
                    <td className="py-3 px-4">CRUD 中心、社内ツール</td>
                    <td className="py-3 px-4">複雑なデータ関係、複数クライアント</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="実務でのよくある構成">
              <p>
                社内の管理画面やシンプルな CRUD アプリでは REST + OpenAPI が効率的です。
                複雑なデータ関係を持つ顧客向けアプリや、モバイル/Web で取得データを変えたい場合は
                GraphQL が適しています。両者を組み合わせるハイブリッド構成も実務では見られます。
              </p>
            </InfoBox>
          </section>

          <section>
            <InfoBox type="info" title="API 設計を体系的に学ぶ">
              このページは React 開発の文脈で OpenAPI / Swagger を扱いました。
              REST の設計原則・リソース設計・ステータスコード・エラー設計・認証認可・
              契約テスト・セキュリティまで、API 設計そのものをゼロから体系的に学びたい場合は、{" "}
              <Link
                href="/api"
                className="text-primary font-medium underline underline-offset-2"
              >
                API 設計 / OpenAPI 入門マニュアル
              </Link>{" "}
              を参照してください。OpenAPI の書き方は{" "}
              <Link
                href="/api/openapi/what-is-openapi"
                className="text-primary font-medium underline underline-offset-2"
              >
                OpenAPI 仕様とは
              </Link>{" "}
              から詳しく扱っています。
            </InfoBox>
          </section>
        </div>

        <section>
          <ReferenceLinks
            links={[
              {
                title: 'OpenAPI Specification',
                url: 'https://spec.openapis.org/oas/latest.html',
                description: 'OpenAPI 仕様の公式ドキュメント',
              },
              {
                title: 'Swagger Editor',
                url: 'https://editor.swagger.io/',
                description: 'ブラウザで OpenAPI 定義を編集・プレビュー',
              },
              {
                title: 'orval',
                url: 'https://orval.dev/',
                description: 'OpenAPI から React Query フックを自動生成',
              },
              {
                title: 'openapi-typescript',
                url: 'https://openapi-ts.dev/',
                description: 'OpenAPI から TypeScript 型を生成',
              },
            ]}
          />
        </section>

        <PageNavigation />
      </div>
    </div>
  );
}
