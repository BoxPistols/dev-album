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

const pillars = [
  {
    title: "Database",
    description:
      "本物の PostgreSQL。テーブル・ビュー・関数・拡張をそのまま使える。SQL の知識がそのまま活きる。",
  },
  {
    title: "Auth",
    description:
      "メール・パスワード、ソーシャルログイン、マジックリンクに対応。ユーザーは DB の行と結びつく。",
  },
  {
    title: "Storage",
    description:
      "ファイルをバケット単位で管理。アクセス制御は DB と同じポリシーの考え方で書ける。",
  },
  {
    title: "Realtime",
    description:
      "テーブルの変更（INSERT/UPDATE/DELETE）を購読し、クライアントへ即時配信する。",
  },
  {
    title: "Edge Functions",
    description:
      "Deno ランタイムで動くサーバーレス関数。クライアントに置けない処理や Webhook を担う。",
  },
  {
    title: "supabase-js",
    description:
      "公式の TypeScript クライアント。DB・Auth・Storage・Realtime を一つの API から扱える。",
  },
];

export default function Supabase() {
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
            Supabase
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Supabase は、PostgreSQL を中心に据えたオープンソースの BaaS です。
            認証・ストレージ・リアルタイム・サーバーレス関数を、 標準的な SQL
            とリレーショナルモデルの上で一通り扱えます。 「DB が PostgreSQL
            そのもの」である点が、設計と移行の見通しを良くしています。
          </p>
        </div>

        <WhyNowBox tags={["Supabase", "PostgreSQL", "RLS", "Realtime", "OSS"]}>
          <p>
            BaaS
            は便利でも、独自のデータモデルに縛られると後の移行が重くなります。
            Supabase は土台が PostgreSQL なので、学んだ SQL がそのまま活き、
            データを標準的な形で持てます。さらにオープンソースでセルフホストも可能なため、
            「クラウドの手軽さ」と「自分で抱え込める安心感」の両方を選べます。
            まずは各機能が PostgreSQL の上にどう乗っているかを掴むのが近道です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* PostgreSQL ベース */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              すべては PostgreSQL の上に乗っている
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Supabase の特徴は、独自 DB ではなく
              <strong>本物の PostgreSQL</strong>を中心に据えていることです。
              テーブル設計・リレーション・SQL 関数・拡張機能がそのまま使え、
              認証もストレージもこの DB
              と結びつきます。データは標準的なリレーショナル形式で残るため、
              いざとなれば pg_dump
              でエクスポートして別環境へ移すこともできます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="SQL の知識が無駄にならない">
              多くの BaaS は独自のクエリ方言を持ちますが、Supabase は PostgreSQL
              なので、 既存の
              SQL・インデックス・トランザクションの知識がそのまま使えます。
              これは学習コストと移行コストの両方を下げる、地味だが効く性質です。
            </InfoBox>

            <MermaidDiagram
              title="図: クライアントから PostgreSQL へ届くまで（RLS の関所）"
              chart={`flowchart LR
    C["クライアント<br/>(supabase-js)"] -->|"anon key"| AU["Auth"]
    AU -->|"auth.uid() を付与"| RLS{"RLS ポリシー"}
    RLS -->|"許可された行のみ"| PG["PostgreSQL"]
    RLS -.->|"許可外は<br/>存在しない扱い"| X["遮断"]
    PG --> C`}
            />
          </section>

          {/* Auth と RLS */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Auth と Row Level Security (RLS)
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Supabase ではクライアントが DB
              に直接アクセスできる構成を取れます。 ここで安全性を支えるのが{" "}
              <strong>Row Level Security (RLS)</strong> です。 RLS は PostgreSQL
              の標準機能で、「どの行を誰が読み書きできるか」を
              テーブルに対するポリシーとして宣言します。ログインしたユーザーの
              ID を使い、 自分のデータだけにアクセスを限定する、といった制御を
              SQL で書きます。
            </p>

            <CodeBlock
              language="sql"
              title="RLS ポリシーの例（自分の投稿だけ操作できる）"
              code={`-- テーブルに RLS を有効化する
alter table posts enable row level security;

-- 読み取り: 自分が所有する行だけを返す
create policy "read own posts"
  on posts for select
  using ( auth.uid() = user_id );

-- 書き込み: 自分の user_id を持つ行だけ挿入できる
create policy "insert own posts"
  on posts for insert
  with check ( auth.uid() = user_id );`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>auth.uid()</code> は、ログイン中ユーザーの ID
              を返す関数です。RLS を有効化すると、
              ポリシーで許可された行以外は存在しないかのように振る舞います。
              認可ロジックがアプリ側ではなく DB
              に集約されるため、クライアントを信用しすぎずに済みます。
            </p>

            <InfoBox type="warning" title="RLS の有効化を忘れると素通しになる">
              テーブルに RLS を有効化しないまま公開キーでアクセスを許すと、
              ポリシーが効かず誰でも読み書きできてしまうことがあります。
              「公開するテーブルには必ず RLS
              を有効化し、明示的に許可を書く」を基本にしてください。
            </InfoBox>

            <div className="mt-8">
              <CodingChallenge
                preview
                previewType="config"
                title="ハンズオン: RLS ポリシーを埋めよう"
                description="posts テーブルで「自分が所有する行だけ読める」SELECT ポリシーを完成させてください。ログイン中ユーザーの ID を返す関数と、所有者を表す列を比較します。"
                initialCode={`-- 読み取り: 自分が所有する行だけを返す
create policy "read own posts"
  on posts for select
  using ( ___ = user_id );`}
                answer={`-- 読み取り: 自分が所有する行だけを返す
create policy "read own posts"
  on posts for select
  using ( auth.uid() = user_id );`}
                hints={[
                  "ログイン中ユーザーの ID を返す関数は auth.uid()",
                ]}
                keywords={["auth.uid()"]}
              />
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Supabase の Row Level Security (RLS) の役割はどれ？"
              options={[
                { label: "テーブルの列を暗号化すること" },
                {
                  label:
                    "どの行を誰が読み書きできるかを DB のポリシーとして宣言し、認可を DB 側で行うこと",
                  correct: true,
                },
                { label: "SQL の実行速度を上げること" },
                { label: "クライアントの JavaScript を難読化すること" },
              ]}
              explanation="RLS は PostgreSQL 標準の機能で、行単位のアクセス制御をポリシーとして宣言します。auth.uid() などを使って「自分のデータだけ」といった制御を DB 側に集約できるため、クライアントが直接 DB を叩く構成でも安全性を保てます。"
            />
          </section>

          {/* supabase-js */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              supabase-js クライアント
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              フロントエンドからは <code>supabase-js</code>{" "}
              を使い、DB・Auth・Storage・Realtime を一つの API から扱います。
              クエリはメソッドチェーンで書き、RLS が効いているので、
              返ってくる行は自動的にユーザーの権限に絞られます。
            </p>

            <CodeBlock
              language="ts"
              title="supabase-js のクエリ例"
              code={`import { createClient } from "@supabase/supabase-js";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 投稿を作成する（RLS により自分の行だけ挿入が許可される）
const { data, error } = await supabase
  .from("posts")
  .insert({ title: "はじめての投稿", user_id: userId })
  .select()
  .single();

// 自分の投稿を新しい順に取得する
const { data: posts } = await supabase
  .from("posts")
  .select("id, title, created_at")
  .order("created_at", { ascending: false })
  .limit(20);`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              anon key（公開キー）はクライアントに置けますが、それでも安全なのは
              RLS が行レベルでアクセスを絞るからです。逆に言えば、RLS
              を書かないと 公開キーで素通しになるため、クライアント直アクセスと
              RLS はセットで考えます。
            </p>
          </section>

          {/* Realtime / Storage / Edge Functions */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Realtime・Storage・Edge Functions
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              基本機能のほかに、リアルタイム配信・ファイル管理・サーバーレス関数が揃います。
              いずれも PostgreSQL を中心とした世界観の延長で使えます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Realtime
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  テーブルの変更を購読し、クライアントへ即時配信する。チャットや共同編集の土台になる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Storage
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  画像や動画をバケットで管理。アクセス制御は RLS
                  と同じポリシーの発想で書ける。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Edge Functions
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Deno で動くサーバーレス関数。決済連携や Webhook
                  受信など、秘匿処理を担う。
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Edge Functions が <strong>Deno</strong>{" "}
              ランタイムである点は実装に影響します。npm
              パッケージの一部はそのまま動かないことがあり、 標準 Web API や
              Deno 互換のモジュールを前提に書くと安定します。
            </p>
          </section>

          {/* OSS / セルフホスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              オープンソースとセルフホスト
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Supabase は<strong>オープンソース</strong>で、Docker などを使って
              自分のインフラ上にセルフホストできます。クラウドのマネージドサービスとして使い始め、
              要件が変われば自前運用へ移す、という選択肢を残せます。データが標準的な
              PostgreSQL に
              収まっていることと相まって、ロックインの度合いを自分でコントロールしやすい構成です。
            </p>

            <InfoBox type="success" title="始めやすさと抱え込める安心の両立">
              マネージドで素早く始め、必要になったらセルフホストへ。どちらも同じ
              PostgreSQL が土台なので、
              アプリのコードを大きく書き換えずに運用形態を選び直せます。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Supabase の Edge Functions が動くランタイムはどれ？"
              options={[
                { label: "ブラウザの V8（クライアント上）" },
                { label: "Node.js のみ" },
                { label: "Deno", correct: true },
                { label: "Python のサーバープロセス" },
              ]}
              explanation="Supabase の Edge Functions は Deno ランタイムで動作します。そのため標準 Web API や Deno 互換モジュールを前提に書くと安定し、Node 固有の一部 npm パッケージはそのまま動かないことがあります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Supabase Documentation",
                  url: "https://supabase.com/docs",
                  description:
                    "Supabase の公式ドキュメント。DB・Auth・Storage・Realtime・Edge Functions を網羅",
                },
                {
                  title: "Supabase - Row Level Security",
                  url: "https://supabase.com/docs/guides/database/postgres/row-level-security",
                  description:
                    "RLS の考え方とポリシーの書き方を解説した公式ガイド",
                },
                {
                  title: "supabase-js リファレンス",
                  url: "https://supabase.com/docs/reference/javascript/introduction",
                  description:
                    "JavaScript / TypeScript クライアントの API リファレンス",
                },
                {
                  title: "Supabase Edge Functions",
                  url: "https://supabase.com/docs/guides/functions",
                  description:
                    "Deno ベースのサーバーレス関数の作成・デプロイガイド",
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
