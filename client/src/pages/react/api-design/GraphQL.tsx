import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function GraphQL() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 34</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">GraphQL 入門</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          REST API では「サーバーが決めた形」でデータが返ってきますが、
          GraphQL では「クライアントが欲しいデータの形を指定」できます。
          この違いを体験しながら理解しましょう。
        </p>

        <WhyNowBox tags={['GraphQL', 'Query', 'Mutation', 'Apollo Client']}>
          <p>
            前のステップで fetch API と REST API の基本を学びました。
            REST は URL ごとにデータが決まっていて分かりやすい反面、
            「欲しくないデータまで取得してしまう」「1画面に必要なデータを揃えるために何度もリクエストが必要」
            といった課題があります。GraphQL はこれらを解決するために生まれました。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">

          {/* ── セクション1: REST の課題を体験する ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">REST API の「困りごと」を体験する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              まずは REST API で「ユーザーとその投稿」を取得する場面を考えてみましょう。
              下のデモでは、2回のリクエストを送っています。
            </p>

            <CodePreview
              code={`function App() {
  const [step, setStep] = React.useState(0)
  const [user, setUser] = React.useState(null)
  const [posts, setPosts] = React.useState(null)
  const [log, setLog] = React.useState([])

  const addLog = (msg) => setLog(prev => [...prev, msg])

  const fetchUser = async () => {
    setStep(1)
    addLog("GET /users/1 を送信中...")
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
    const data = await res.json()
    setUser(data)
    addLog("ユーザー取得完了（名前・メール・住所・会社...全部返ってきた）")
    addLog("→ 必要なのは名前だけなのに、不要なデータも含まれている")
  }

  const fetchPosts = async () => {
    setStep(2)
    addLog("GET /users/1/posts を送信中...")
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1/posts")
    const data = await res.json()
    setPosts(data.slice(0, 3))
    addLog("投稿取得完了（10件返ってきた）")
    addLog("→ 2回リクエストが必要だった（アンダーフェッチ）")
    setStep(3)
  }

  const reset = () => { setStep(0); setUser(null); setPosts(null); setLog([]) }

  return (
    <div style={{ fontFamily: "system-ui", padding: "16px", fontSize: "14px" }}>
      <h3 style={{ fontWeight: "bold", marginBottom: "12px" }}>REST: ユーザー+投稿を取得</h3>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        <button onClick={fetchUser} disabled={step >= 1}
          style={{ padding: "8px 16px", background: step >= 1 ? "#9CA3AF" : "#3B82F6", color: "white", border: "none", borderRadius: "6px", cursor: step >= 1 ? "default" : "pointer" }}>
          1. ユーザー取得
        </button>
        <button onClick={fetchPosts} disabled={step < 1 || step >= 2}
          style={{ padding: "8px 16px", background: step < 1 || step >= 2 ? "#9CA3AF" : "#3B82F6", color: "white", border: "none", borderRadius: "6px", cursor: step < 1 || step >= 2 ? "default" : "pointer" }}>
          2. 投稿取得
        </button>
        <button onClick={reset}
          style={{ padding: "8px 16px", background: "#6B7280", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          リセット
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
        <div style={{ padding: "12px", background: "#F3F4F6", borderRadius: "8px", minHeight: "80px" }}>
          <div style={{ fontWeight: "600", fontSize: "13px", color: "#6B7280", marginBottom: "4px" }}>ユーザー</div>
          {user ? (
            <div>
              <div style={{ fontWeight: "bold" }}>{user.name}</div>
              <div style={{ fontSize: "13px", color: "#9CA3AF" }}>+メール, 住所, 会社, 電話... (不要なデータ)</div>
            </div>
          ) : <span style={{ color: "#9CA3AF" }}>未取得</span>}
        </div>
        <div style={{ padding: "12px", background: "#F3F4F6", borderRadius: "8px", minHeight: "80px" }}>
          <div style={{ fontWeight: "600", fontSize: "13px", color: "#6B7280", marginBottom: "4px" }}>投稿</div>
          {posts ? posts.map(p => (
            <div key={p.id} style={{ fontSize: "13px", marginBottom: "2px" }}>- {p.title.slice(0, 30)}...</div>
          )) : <span style={{ color: "#9CA3AF" }}>未取得</span>}
        </div>
      </div>

      <div style={{ padding: "12px", background: "#1F2937", borderRadius: "8px", color: "#D1D5DB", fontSize: "13px", fontFamily: "monospace", maxHeight: "120px", overflow: "auto" }}>
        <div style={{ color: "#9CA3AF", marginBottom: "4px" }}>// リクエストログ</div>
        {log.length === 0 && <div style={{ color: "#6B7280" }}>ボタンを押してリクエストを送信してみよう</div>}
        {log.map((l, i) => (
          <div key={i} style={{ color: l.startsWith("→") ? "#FBBF24" : "#D1D5DB" }}>{l}</div>
        ))}
      </div>
    </div>
  )
}`}
              title="REST API の2つの課題を体験"
              previewHeight={380}
            />

            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              REST でこの画面のデータを揃えるには 2 回のリクエストが必要でした。
              しかも 1 回目のユーザー取得では、名前以外の不要なデータ（住所、電話番号、会社情報...）も
              すべて返ってきます。この 2 つの課題に名前がついています。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">オーバーフェッチ</h3>
                <p className="text-sm text-muted-foreground">
                  使わないデータまで取得してしまうこと。
                  名前だけ欲しいのに、住所や電話番号も含むレスポンスが返る。
                  モバイル通信では特に無駄が大きい。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">アンダーフェッチ</h3>
                <p className="text-sm text-muted-foreground">
                  1 つの API では必要なデータが足りず、複数回リクエストが必要になること。
                  リクエスト回数が増えると画面表示が遅くなる。
                </p>
              </div>
            </div>
          </section>

          {/* ── セクション2: GraphQL の仕組み ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">GraphQL はどう解決するか</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              GraphQL では <strong>クライアントが「欲しいデータの形」を指定</strong>してリクエストします。
              サーバーはその形どおりのデータだけを返します。
            </p>

            {/* フロー図 */}
            <div className="mb-6 p-6 rounded-xl border border-border bg-card">
              <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">REST vs GraphQL のリクエストフロー</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* REST */}
                <div>
                  <div className="text-sm font-bold text-foreground mb-3">REST（複数回リクエスト）</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">1</span>
                      <code className="text-xs bg-muted px-2 py-1 rounded">GET /users/1</code>
                    </div>
                    <div className="ml-3 border-l-2 border-border pl-3 text-xs text-muted-foreground py-1">
                      名前 + メール + 住所 + 電話 + 会社...（全部返る）
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">2</span>
                      <code className="text-xs bg-muted px-2 py-1 rounded">GET /users/1/posts</code>
                    </div>
                    <div className="ml-3 border-l-2 border-border pl-3 text-xs text-muted-foreground py-1">
                      投稿一覧（タイトル + 本文 + ID...全部返る）
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground bg-muted p-2 rounded">
                    計 2 リクエスト、不要なデータあり
                  </div>
                </div>
                {/* GraphQL */}
                <div>
                  <div className="text-sm font-bold text-foreground mb-3">GraphQL（1回のリクエスト）</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-xs flex items-center justify-center font-bold">1</span>
                      <code className="text-xs bg-muted px-2 py-1 rounded">POST /graphql</code>
                    </div>
                    <div className="ml-3 border-l-2 border-green-300 dark:border-green-800 pl-3 text-xs py-1">
                      <pre className="text-muted-foreground whitespace-pre">{`{ user(id: 1) {
    name          ← 名前だけ
    posts { title } ← タイトルだけ
  }
}`}</pre>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 p-2 rounded">
                    計 1 リクエスト、欲しいデータだけ取得
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="GraphQL のエンドポイントは 1 つだけ">
              <p>
                REST では <code>/users</code>, <code>/posts</code>, <code>/comments</code> と
                リソースごとに URL が分かれますが、GraphQL では <code>/graphql</code> という
                1 つのエンドポイントにすべてのリクエストを送ります。
                「何を取得するか」は URL ではなくクエリの中身で指定します。
              </p>
            </InfoBox>
          </section>

          {/* ── セクション3: クエリの書き方 ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">クエリの書き方</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              GraphQL には 3 種類のオペレーションがあります。
              まずは最も基本的な「Query（読み取り）」から見ていきましょう。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                <h3 className="font-bold text-foreground mb-1 text-sm">Query</h3>
                <p className="text-xs text-muted-foreground">データを<strong>読み取る</strong>。REST の GET に相当。</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-1 text-sm">Mutation</h3>
                <p className="text-xs text-muted-foreground">データを<strong>変更する</strong>。REST の POST/PUT/DELETE に相当。</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-1 text-sm">Subscription</h3>
                <p className="text-xs text-muted-foreground">データの<strong>変更をリアルタイム受信</strong>。チャットなどに使う。</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              Query は「欲しいデータの形」をそのまま書きます。
              JSON からキー名だけを抜き出したような見た目です。
            </p>

            <CodeBlock
              language="graphql"
              title="Query: 必要なフィールドだけ指定する"
              code={`query {
  user(id: "1") {
    name        # ← 名前だけ取得（住所やメールは不要なので書かない）
    email       # ← メールも欲しければ追加する
  }
}

# サーバーからのレスポンス:
# {
#   "data": {
#     "user": {
#       "name": "田中太郎",
#       "email": "tanaka@example.com"
#     }
#   }
# }
# → 書いたフィールドだけが返る！`}
            />

            <p className="text-muted-foreground my-4 leading-relaxed">
              ネストして関連データも一度に取得できます。
              これが REST で複数回リクエストが必要だった問題の解決策です。
            </p>

            <CodeBlock
              language="graphql"
              title="ネストしたクエリ: 関連データを 1 回で取得"
              code={`query {
  user(id: "1") {
    name
    posts {         # ← ユーザーの投稿も同時に取得
      title
      comments {    # ← 投稿のコメントも同時に取得
        body
        author {
          name      # ← コメントした人の名前まで一気に取れる
        }
      }
    }
  }
}
# REST なら /users/1 + /users/1/posts + /posts/X/comments + /users/Y
# の 4 回以上のリクエストが必要だったものが 1 回で済む`}
            />

            <Quiz
              question="GraphQL クエリで取得されるフィールドはどれ？"
              options={[
                { label: 'スキーマに定義されたすべてのフィールド' },
                { label: 'サーバーが決めた固定のフィールド' },
                { label: 'クエリに書いたフィールドだけ', correct: true },
                { label: '要求した型のすべてのフィールド' },
              ]}
              explanation="GraphQL ではクエリに明示的に書いたフィールドだけがレスポンスに含まれます。これによりオーバーフェッチを防げます。"
            />
          </section>

          {/* ── セクション3.5: クエリ変数 ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">クエリ変数: 値を動的に渡す</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ユーザー ID や検索キーワードなど、リクエストのたびに変わる値を
              クエリに埋め込むには<strong>変数（Variables）</strong>を使います。
              文字列結合ではなく、型付きの引数として安全に値を渡せます。
            </p>

            <CodeBlock
              language="graphql"
              title="変数を使ったクエリ"
              code={`# $userId は変数。型は ID!（必須）
query GetUser($userId: ID!) {
  user(id: $userId) {
    name
    email
  }
}

# 変数は JSON で別途渡す:
# { "userId": "1" }
#
# 変数を使うメリット:
# - クエリを文字列結合せずに済む（SQLインジェクションと同じ対策）
# - 同じクエリを変数だけ変えて再利用できる
# - Apollo Client がキャッシュキーに使える`}
            />
          </section>

          {/* ── セクション4: Mutation ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Mutation: データを変更する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              データの作成・更新・削除には Mutation を使います。
              先ほど学んだ変数を使って、入力値を安全に渡します。
            </p>

            <CodeBlock
              language="graphql"
              title="Mutation の基本構文"
              code={`# ユーザーを新規作成
mutation {
  createUser(input: {
    name: "山田花子"
    email: "hanako@example.com"
  }) {
    # 作成されたユーザーのうち、返してほしいフィールド
    id
    name
  }
}

# レスポンス:
# { "data": { "createUser": { "id": "42", "name": "山田花子" } } }`}
            />

            <InfoBox type="info" title="Mutation でも返すフィールドを指定できる">
              <p>
                REST の POST は「サーバーが決めた形のレスポンス」が返りますが、
                GraphQL の Mutation は Query と同じく、返してほしいフィールドを指定できます。
                作成結果の ID だけ欲しい場合は <code>id</code> だけ書けば十分です。
              </p>
            </InfoBox>
          </section>

          {/* ── セクション5: スキーマ ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">スキーマ: API の「設計図」</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              GraphQL の API は<strong>スキーマ</strong>という設計図で定義されます。
              「どんなデータがあり、どんなクエリが使えるか」をすべて記述したものです。
              REST の OpenAPI（次のページで解説）に相当しますが、GraphQL ではスキーマが必須です。
            </p>

            <CodeBlock
              language="graphql"
              title="スキーマの読み方"
              code={`# 「!」は必須フィールド（null にならない）
# 「[Post!]!」は Post の配列で、配列自体も要素も null にならない

type User {
  id: ID!           # ユニークな識別子
  name: String!     # 文字列（必須）
  email: String!
  posts: [Post!]!   # このユーザーの投稿一覧
}

type Post {
  id: ID!
  title: String!
  body: String!
  author: User!     # 投稿者（User 型への参照）
}

# どんなクエリが使えるかを定義
type Query {
  user(id: ID!): User         # ID を指定して 1 人取得
  users(limit: Int): [User!]! # 一覧取得
}

# どんな変更操作が使えるかを定義
type Mutation {
  createUser(name: String!, email: String!): User!
}`}
            />

            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              スキーマがあると以下のメリットがあります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card text-center">
                <div className="text-2xl mb-2">&#128196;</div>
                <h3 className="font-bold text-foreground mb-1 text-sm">自動ドキュメント</h3>
                <p className="text-xs text-muted-foreground">スキーマがそのまま API のドキュメントになる</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card text-center">
                <div className="text-2xl mb-2">&#128270;</div>
                <h3 className="font-bold text-foreground mb-1 text-sm">入力補完</h3>
                <p className="text-xs text-muted-foreground">使えるフィールド名をエディタが提案してくれる</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card text-center">
                <div className="text-2xl mb-2">&#128736;</div>
                <h3 className="font-bold text-foreground mb-1 text-sm">型の自動生成</h3>
                <p className="text-xs text-muted-foreground">TypeScript の型を自動生成できる</p>
              </div>
            </div>

            <Quiz
              question="GraphQL スキーマの type Query は何を定義する？"
              options={[
                { label: 'データベースのテーブル構造' },
                { label: 'クライアントが実行できる読み取り操作の一覧', correct: true },
                { label: 'レスポンスの HTTP ステータスコード' },
                { label: 'クエリの実行速度の上限' },
              ]}
              explanation="type Query はクライアントが実行できるクエリ（読み取り操作）を定義します。user(id: ID!) や users(limit: Int) のように、呼び出し方と戻り値の型を宣言します。"
            />
          </section>

          {/* ── セクション6: React での実装 ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React で GraphQL を使う</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React で GraphQL を使うには、クライアントライブラリが必要です。
              最も広く使われているのが <strong>Apollo Client</strong> です。
              「データの取得」「ローディング管理」「キャッシュ」をまとめて面倒を見てくれます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. セットアップ</h3>

            <CodeBlock
              language="bash"
              title="インストール"
              code={`pnpm add @apollo/client graphql`}
            />

            <p className="text-muted-foreground my-4 leading-relaxed">
              アプリ全体を <code>ApolloProvider</code> でラップして、GraphQL サーバーの URL を設定します。
              REST で言うところの「ベース URL の設定」に相当します。
            </p>

            <CodeBlock
              language="tsx"
              title="Apollo Client のセットアップ"
              showLineNumbers
              code={`import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// クライアントを作成（GraphQL サーバーの URL を指定）
const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(), // レスポンスをキャッシュして高速化
});

// アプリ全体をラップ
function App() {
  return (
    <ApolloProvider client={client}>
      <UserList />
    </ApolloProvider>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">2. useQuery でデータ取得</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>useQuery</code> フックにクエリを渡すと、
              <code>loading</code>・<code>error</code>・<code>data</code> の 3 つの状態が自動管理されます。
              REST で書いていた <code>useState</code> + <code>useEffect</code> のパターンが不要になります。
            </p>

            <CodeBlock
              language="tsx"
              title="useQuery: loading / error / data を自動管理"
              showLineNumbers
              code={`import { gql, useQuery } from '@apollo/client';

// GraphQL クエリを定義
const GET_USERS = gql\`
  query GetUsers {
    users(limit: 10) {
      id
      name
      email
    }
  }
\`;

function UserList() {
  // REST のように useState + useEffect を書く必要がない！
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error.message}</p>;

  return (
    <ul>
      {data.users.map((user) => (
        <li key={user.id}>{user.name} ({user.email})</li>
      ))}
    </ul>
  );
}`}
            />

            <div className="my-6 p-4 rounded-xl border border-border bg-card">
              <h4 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider">REST vs Apollo Client の比較</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-bold text-foreground mb-2">REST（手動管理）</div>
                  <pre className="text-xs text-muted-foreground bg-muted p-3 rounded overflow-x-auto">{`const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('/api/users')
    .then(res => res.json())
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);`}</pre>
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground mb-2">Apollo Client（自動管理）</div>
                  <pre className="text-xs text-muted-foreground bg-muted p-3 rounded overflow-x-auto">{`const { loading, error, data } = useQuery(
  GET_USERS
);

// これだけで:
// - ローディング状態を管理
// - エラーハンドリング
// - データのキャッシュ
// - 同じクエリの重複リクエスト防止
// が自動で行われる`}</pre>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">3. useMutation でデータ変更</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>useMutation</code> はデータの作成・更新・削除に使います。
              実行関数とローディング/エラー状態がセットで返されます。
            </p>

            <CodeBlock
              language="tsx"
              title="useMutation: データの作成"
              showLineNumbers
              code={`import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_USER = gql\`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
    }
  }
\`;

function CreateUserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // createUser は実行関数、loading と error は状態
  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({
      variables: { name, email }, // クエリの変数に値を渡す
    });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button disabled={loading}>
        {loading ? '送信中...' : '作成'}
      </button>
      {error && <p>エラー: {error.message}</p>}
    </form>
  );
}`}
            />

            <Quiz
              question="Apollo Client の useQuery が自動で管理してくれるのは？"
              options={[
                { label: 'loading 状態のみ' },
                { label: 'loading + error + data + キャッシュ', correct: true },
                { label: 'データベースへの直接接続' },
                { label: 'サーバーサイドレンダリング' },
              ]}
              explanation="useQuery は loading / error / data の3状態を自動管理し、さらにレスポンスのキャッシュや同じクエリの重複防止まで行います。REST で手動管理していた部分が大幅に簡略化されます。"
            />
          </section>

          {/* ── セクション7: 型安全な開発 ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">GraphQL Code Generator: 型を自動生成</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              GraphQL のスキーマには型情報が含まれているため、
              TypeScript の型定義を自動生成できます。
              手動で <code>interface User &#123;...&#125;</code> を書く必要がなくなります。
            </p>

            <div className="mb-6 p-5 rounded-xl border border-border bg-card">
              <h4 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">型自動生成のフロー</h4>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <div className="p-3 rounded-lg bg-muted text-center flex-1">
                  <div className="text-xs font-bold text-foreground">GraphQL スキーマ</div>
                  <div className="text-xs text-muted-foreground mt-1">type User &#123; name: String! &#125;</div>
                </div>
                <div className="text-muted-foreground font-bold hidden md:block">&#8594;</div>
                <div className="text-muted-foreground font-bold md:hidden">&#8595;</div>
                <div className="p-3 rounded-lg bg-primary/10 text-center flex-1">
                  <div className="text-xs font-bold text-foreground">Code Generator</div>
                  <div className="text-xs text-muted-foreground mt-1">自動変換</div>
                </div>
                <div className="text-muted-foreground font-bold hidden md:block">&#8594;</div>
                <div className="text-muted-foreground font-bold md:hidden">&#8595;</div>
                <div className="p-3 rounded-lg bg-muted text-center flex-1">
                  <div className="text-xs font-bold text-foreground">TypeScript 型 + Hook</div>
                  <div className="text-xs text-muted-foreground mt-1">interface User &#123; name: string &#125;</div>
                </div>
              </div>
            </div>

            <CodeBlock
              language="bash"
              title="GraphQL Code Generator のインストール（client-preset 推奨）"
              code={`pnpm add -D @graphql-codegen/cli @graphql-codegen/client-preset`}
            />

            <p className="text-muted-foreground my-4 leading-relaxed">
              設定ファイルで「スキーマの場所」と「クエリファイルの場所」を指定します。
              <code>npx graphql-codegen</code> を実行すると型が自動生成されます。
            </p>

            <CodeBlock
              language="typescript"
              title="codegen.ts（設定ファイル）"
              showLineNumbers
              code={`// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://api.example.com/graphql', // スキーマの取得先
  documents: ['src/**/*.tsx'],                // クエリを含むファイル
  generates: {
    './src/generated/': {
      preset: 'client',  // client-preset: 型 + TypedDocumentNode を生成
    },
  },
};

export default config;`}
            />

            <p className="text-muted-foreground my-4 leading-relaxed">
              生成された型を使うと、useQuery のレスポンスに自動で型が付きます。
            </p>

            <CodeBlock
              language="tsx"
              title="自動生成された型を使う"
              showLineNumbers
              code={`import { useQuery } from '@apollo/client';
import { graphql } from '../generated'; // 自動生成された型付き関数

// graphql() でクエリを書くと、変数とレスポンスの型が自動推論される
const GET_USERS = graphql(\`
  query GetUsers($limit: Int) {
    users(limit: $limit) {
      id
      name
      email
    }
  }
\`);

function UserList() {
  const { data, loading, error } = useQuery(GET_USERS, {
    variables: { limit: 10 },
  });
  // data?.users は自動的に { id: string; name: string; email: string }[] 型
  // 存在しないフィールド user.xxx にアクセスするとコンパイルエラー
}`}
            />
          </section>

          {/* ── セクション8: 採用判断 ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">GraphQL を使うべき場面</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              GraphQL は万能ではありません。プロジェクトの特性に応じて REST と使い分けましょう。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
                <h3 className="font-bold text-foreground mb-2 text-sm">GraphQL が向いている</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>- 複数リソースをまたぐデータ取得が多い</li>
                  <li>- モバイルと Web で取得データを変えたい</li>
                  <li>- フロントが API の変更待ちなく開発したい</li>
                  <li>- 型安全な API 連携を重視する</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2 text-sm">REST で十分</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>- CRUD 中心のシンプルなアプリ</li>
                  <li>- ファイルアップロードが主体</li>
                  <li>- HTTP キャッシュを細かく制御したい</li>
                  <li>- チームに GraphQL 経験者がいない</li>
                </ul>
              </div>
            </div>

            <Quiz
              question="モバイルアプリと Web アプリで同じ API を使うが、モバイルでは通信量を抑えたい。どちらが適切？"
              options={[
                { label: 'REST — モバイル用とWeb用のエンドポイントを別々に用意する' },
                { label: 'GraphQL — クライアントごとに必要なフィールドだけ指定できる', correct: true },
                { label: 'どちらでも同じ' },
              ]}
              explanation="GraphQL ではクエリに書くフィールドを変えるだけで、同じ API からモバイルは最小限のデータ、Web はリッチなデータを取得できます。REST だとエンドポイントを分けるか、不要なデータも含めて返すことになりがちです。"
            />
          </section>

          {/* ── セクション9: 軽量代替 ── */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">軽量な代替: urql</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Apollo Client は高機能ですが、バンドルサイズが大きめです（gzip 約 40-50KB）。
              より軽量な <code>urql</code>（gzip 約 10KB）という選択肢もあります。
              使い方は Apollo Client とほぼ同じです。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">観点</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Apollo Client</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">urql</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">サイズ</td>
                    <td className="py-3 px-4">約 40-50 KB (gzip)</td>
                    <td className="py-3 px-4">約 10 KB (gzip)</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">キャッシュ</td>
                    <td className="py-3 px-4">正規化キャッシュ（高機能）</td>
                    <td className="py-3 px-4">ドキュメントキャッシュ（シンプル）</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">DevTools</td>
                    <td className="py-3 px-4">Apollo DevTools（Chrome拡張）</td>
                    <td className="py-3 px-4">基本的なログのみ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <InfoBox type="info" title="次のステップ: REST API でも型安全に">
          <p>
            REST API を使うプロジェクトでも、GraphQL と同じように型安全な開発や
            ドキュメント自動生成ができます。次のページでは OpenAPI（Swagger）を使って
            REST API の仕様を定義し、型やモックサーバーを自動生成する方法を学びます。
          </p>
        </InfoBox>

        <section>
          <ReferenceLinks
            links={[
              {
                title: 'GraphQL 公式 — Learn',
                url: 'https://graphql.org/learn/',
                description: 'GraphQL の基本概念を公式チュートリアルで学ぶ',
              },
              {
                title: 'Apollo Client (React)',
                url: 'https://www.apollographql.com/docs/react/',
                description: 'Apollo Client の React 向け公式ドキュメント',
              },
              {
                title: 'GraphQL Code Generator',
                url: 'https://the-guild.dev/graphql/codegen',
                description: 'スキーマから TypeScript 型とフックを自動生成',
              },
            ]}
          />
        </section>

        <PageNavigation />
      </div>
    </div>
  );
}
