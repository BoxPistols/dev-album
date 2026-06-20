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

const buildModes = [
  {
    command: "nuxt build",
    output: ".output/",
    role: "SSR サーバーを生成。Node サーバーや各種プラットフォームで動かす",
  },
  {
    command: "nuxt generate",
    output: ".output/public/",
    role: "全ページを事前レンダリングした静的ファイルを生成（SSG）",
  },
  {
    command: "nuxt preview",
    output: "—",
    role: "build 後の .output をローカルで起動して本番相当の動作を確認",
  },
];

const nitroPresets = [
  { name: "vercel", role: "Vercel 向け。リポジトリ連携で自動検出される" },
  { name: "netlify", role: "Netlify 向け。Functions として出力" },
  {
    name: "node-server",
    role: "汎用 Node サーバー（.output/server/index.mjs）",
  },
  { name: "cloudflare", role: "Cloudflare Workers / Pages 向け" },
  { name: "static", role: "静的ホスティング向け（nuxt generate 相当）" },
];

export default function Deploy() {
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
            Nuxt のデプロイ
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Nuxt は <code>nuxt build</code> で SSR サーバーを、
            <code>nuxt generate</code> で静的サイトを出力します。 出力を担う{" "}
            <strong>Nitro</strong>{" "}
            がデプロイ先を自動検出するため、多くの場合は設定なしで Vercel
            などへ公開できます。 環境変数と <code>runtimeConfig</code>{" "}
            の扱いを押さえれば、秘密情報を漏らさず安全に運用できます。
          </p>
        </div>

        <WhyNowBox tags={["Nuxt 4", "Nitro", "SSR", "SSG", "runtimeConfig"]}>
          <p>
            Nuxt の出力エンジンである <strong>Nitro</strong>{" "}
            は、デプロイ先のプラットフォームを自動で検出して 最適な形式 （Vercel
            Functions / Netlify Functions / Node サーバー / 静的ファイル
            など）に変換します。 React + 自前サーバーのように
            「どこに何を置くか」を毎回考える必要が少なく、 多くの場合は{" "}
            <code>nuxt build</code> と Git push
            だけで本番に出せます。仕組みを理解しておくと、 SSR
            と静的化の使い分け ・秘密情報の扱いで迷わなくなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ビルドからデプロイまでの流れ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              nuxt build の後、Nitro がデプロイ先を自動検出（プリセット）して各プラットフォーム向けの出力を生成します。
            </p>
            <MermaidDiagram
              title="ビルドからデプロイまでの流れ（図）"
              chart={`flowchart LR
  S["ソース"] --> B["nuxt build"]
  B --> N["Nitro がプリセットを自動検出"]
  N --> V["Vercel"]
  N --> NL["Netlify"]
  N --> NS["node-server"]`}
            />
          </section>

          {/* build vs generate */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              build と generate の違い
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nuxt のビルドには 2 つのモードがあります。
              <code>nuxt build</code> は<strong>SSR サーバー</strong>を生成し、
              リクエストごとにサーバーで HTML を組み立てます。
              <code>nuxt generate</code> は
              <strong>全ページを事前レンダリング</strong>
              した静的ファイルを生成し、サーバーなしで配信できます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      コマンド
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      出力
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {buildModes.map((m) => (
                    <tr key={m.command} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {m.command}
                      </td>
                      <td className="py-2 px-4 font-mono text-muted-foreground whitespace-nowrap align-top">
                        {m.output}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {m.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="bash"
              title="ビルドして本番相当で確認する"
              code={`# SSR サーバーをビルド → .output/ に出力
npx nuxt build

# build した成果物をローカルで本番相当に起動して確認
npx nuxt preview
# → http://localhost:3000 で .output が動く

# 静的サイト（SSG）として全ページを事前レンダリング
npx nuxt generate
# → .output/public/ に静的ファイルが出力される`}
            />

            <InfoBox
              type="info"
              title="動的データがあるなら build、なければ generate"
            >
              ログインやリクエストごとに変わる内容を扱うなら{" "}
              <code>nuxt build</code>（SSR）が向きます。 内容がほぼ固定の
              ドキュメント・ブログ・LP なら <code>nuxt generate</code>
              （SSG）で サーバー不要・最速配信にできます。 ページ単位で混在
              させたい場合は、次のセクションの <code>routeRules</code>
              でルートごとに指定します。
            </InfoBox>
          </section>

          {/* Nitro presets */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Nitro プリセットがデプロイ先を自動検出する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              出力エンジンの <strong>Nitro</strong>{" "}
              は、ビルド環境からデプロイ先を推測して 出力形式を切り替えます。
              Vercel や Netlify 上でビルドすれば、そのプラットフォーム向けの
              プリセットが自動で選ばれます。明示したいときは{" "}
              <code>nuxt.config.ts</code> の <code>nitro.preset</code>{" "}
              で指定します。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      プリセット
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nitroPresets.map((p) => (
                    <tr key={p.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {p.name}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {p.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="ts"
              title="nuxt.config.ts — プリセットと routeRules"
              code={`export default defineNuxtConfig({
  nitro: {
    // 通常は自動検出。明示するならプリセット名を指定
    preset: 'node-server',
  },
  // ルート単位でレンダリング方式を切り替える（ハイブリッド）
  routeRules: {
    '/': { prerender: true }, // トップは静的化
    '/blog/**': { isr: 3600 }, // ブログは ISR（1時間ごとに再生成）
    '/admin/**': { ssr: false }, // 管理画面は SPA（クライアントのみ）
  },
})`}
            />

            <InfoBox
              type="success"
              title="routeRules で SSR / SSG / ISR を混在できる"
            >
              すべてを SSR にするか静的にするか、で悩む必要はありません。
              <code>routeRules</code> を使うとルートごとに{" "}
              <code>prerender</code>（静的化）・<code>isr</code>（定期再生成）・
              <code>ssr: false</code>（SPA）を指定でき、 1
              つのプロジェクトの中で最適な方式を組み合わせられます。
            </InfoBox>
          </section>

          {/* runtimeConfig */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              環境変数と runtimeConfig
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              本番の値（API キーやエンドポイント）は <code>runtimeConfig</code>{" "}
              で扱います。 ここに置いた値は <strong>サーバー専用</strong>
              で、ブラウザには渡りません。 一方で <code>public</code>{" "}
              に置いた値だけは <strong>クライアントにも露出</strong>します。
              React で言えば、 サーバー専用の環境変数とブラウザに埋め込まれる{" "}
              <code>VITE_</code> 変数の違いに近い区別です。
            </p>

            <CodeBlock
              language="ts"
              title="nuxt.config.ts — runtimeConfig の定義"
              code={`export default defineNuxtConfig({
  runtimeConfig: {
    // サーバー専用（ブラウザに露出しない）
    apiSecret: '', // → 環境変数 NUXT_API_SECRET で上書き

    // public はクライアントにも露出する
    public: {
      apiBase: '/api', // → 環境変数 NUXT_PUBLIC_API_BASE で上書き
    },
  },
})`}
            />

            <p className="text-muted-foreground mt-6 mb-4 leading-relaxed">
              本番では <code>.env</code> や プラットフォームの環境変数で値を
              注入します。キーは <code>NUXT_</code> プレフィックス + 大文字
              スネークケースで、<code>public</code> の下は{" "}
              <code>NUXT_PUBLIC_</code> プレフィックスになります。
            </p>

            <CodeBlock
              language="bash"
              title="環境変数で runtimeConfig を上書きする"
              code={`# .env もしくはホスティングの環境変数設定で定義する
# runtimeConfig.apiSecret を上書き（サーバー専用）
NUXT_API_SECRET=server-only-secret-value

# runtimeConfig.public.apiBase を上書き（クライアントにも露出）
NUXT_PUBLIC_API_BASE=https://api.example.com`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              コードからの読み取りは <code>useRuntimeConfig()</code> です。
              サーバー側（<code>server/api</code> 等）では全フィールドを、
              クライアント側では <code>config.public</code> だけを参照できます。
            </p>

            <CodeBlock
              language="ts"
              title="server/api/data.get.ts — サーバー側で読み取る"
              code={`export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // サーバー専用の値はここでだけ読める
  const secret = config.apiSecret

  // public の値はサーバー・クライアント両方から読める
  const apiBase = config.public.apiBase

  return { apiBase }
})`}
            />

            <InfoBox
              type="warning"
              title="runtimeConfig.public はブラウザに露出する"
            >
              <code>public</code> に置いた値は、ビルド後のクライアント JS
              に埋め込まれて 誰でも閲覧できます。API キー・トークン・DB
              接続情報などの シークレットは{" "}
              <strong>
                絶対に <code>public</code> に置かないでください
              </strong>
              。 秘密情報は <code>runtimeConfig</code>{" "}
              直下（サーバー専用）に置き、
              <code>server/api</code> 経由でのみ利用します。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="runtimeConfig の public に置いた値の扱いとして正しいのはどれ？"
              options={[
                {
                  label: "サーバー専用で、ブラウザには一切渡らない",
                },
                {
                  label: "クライアントにも露出し、ビルド後の JS から閲覧できる",
                  correct: true,
                },
                {
                  label: "暗号化されてブラウザに渡るため秘密情報を置いてよい",
                },
                {
                  label: "本番ビルドでは自動的に削除される",
                },
              ]}
              explanation="runtimeConfig.public に置いた値はクライアント側にも露出し、ビルド後の JS に埋め込まれて誰でも閲覧できます。そのため API キーなどのシークレットは public に置いてはいけません。秘密情報は runtimeConfig 直下（サーバー専用）に置き、NUXT_ プレフィックスの環境変数で上書きします。"
            />
          </section>

          {/* Vercel deploy */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Vercel へデプロイする
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Vercel では GitHub などのリポジトリを連携するだけで、 Nitro が{" "}
              <code>vercel</code> プリセットを自動検出してビルドします。
              ビルドコマンドや出力先の指定は基本的に不要（ゼロコンフィグ）です。
              環境変数はダッシュボードまたは CLI で設定します。
            </p>

            <CodeBlock
              language="bash"
              title="Vercel CLI でデプロイする手順"
              code={`# Vercel CLI をインストール
npm i -g vercel

# プロジェクトをリンク（初回のみ対話で設定）
vercel link

# 環境変数を登録（NUXT_ プレフィックスで runtimeConfig に対応）
vercel env add NUXT_API_SECRET
vercel env add NUXT_PUBLIC_API_BASE

# 本番デプロイ
vercel --prod`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              実運用では CLI を使わず、Vercel ダッシュボードで GitHub
              リポジトリを連携する方法が一般的です。push のたびに 自動で
              ビルド・デプロイされ、Pull Request ごとにプレビュー URL
              も発行されます。
            </p>

            <InfoBox type="info" title="静的サイトとして出すなら">
              SSR が不要なら、ビルドコマンドを <code>nuxt generate</code> に
              切り替えて <code>.output/public</code>{" "}
              を静的配信する形にもできます。 Vercel・Netlify どちらも
              静的出力をそのままホスティングできます。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="nuxt build と nuxt generate の違いとして正しいのはどれ？"
              options={[
                {
                  label:
                    "build は SSR サーバーを、generate は静的ファイルを出力する",
                  correct: true,
                },
                {
                  label: "build は開発用、generate は本番用で出力内容は同じ",
                },
                {
                  label:
                    "generate は SSR サーバーを、build は静的ファイルを出力する",
                },
                {
                  label: "どちらも常に Node サーバーが必要になる",
                },
              ]}
              explanation="nuxt build はリクエストごとにサーバーで HTML を組み立てる SSR サーバー（.output/）を生成します。nuxt generate は全ページを事前レンダリングした静的ファイル（.output/public/）を生成し、サーバーなしで配信できます。ルート単位で混在させたい場合は routeRules を使います。"
            />
          </section>

          {/* 本番の落とし穴 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              本番の落とし穴
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              デプロイ自体は自動化されますが、設定ミスは本番でだけ
              表面化しがちです。公開前に次の 2 点を必ず確認します。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <h3 className="font-bold text-foreground mb-3">
                クライアントに秘密情報を漏らさない
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                API キーやトークンを <code>runtimeConfig.public</code> や{" "}
                <code>NUXT_PUBLIC_</code> 環境変数に置くと、ビルド後の JS
                に埋め込まれて露出します。秘密情報は <code>runtimeConfig</code>{" "}
                直下に置き、
                <code>server/api</code>（Nitro）経由でのみアクセスします。 外部
                API を <code>server/api</code> でプロキシすれば、キーを
                クライアントに出さずに同一オリジンで呼べます。
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <h3 className="font-bold text-foreground mb-3">
                ssr 設定を確認する
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <code>ssr: false</code>（SPA）にすると、
                <code>useFetch</code> の SSR 重複排除が効かず、
                データ取得はすべてクライアント側になります。SEO や
                初期表示速度が重要なページで意図せず SPA になっていないか、
                <code>nuxt.config.ts</code> と <code>routeRules</code>{" "}
                を確認します。
              </p>
            </div>

            <CodeBlock
              language="ts"
              title="server/api でキーを隠して外部 API をプロキシする"
              code={`// server/api/weather.get.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  // サーバー専用キーはクライアントに出さない
  const data = await $fetch('https://api.example.com/weather', {
    headers: { Authorization: \`Bearer \${config.apiSecret}\` },
  })

  return data
})`}
            />

            <InfoBox type="success" title="公開前チェックリスト">
              <code>nuxt preview</code> で本番相当の動作を確認する／
              シークレットが <code>public</code> に紛れていないか確認する／
              ホスティングに環境変数（<code>NUXT_</code> プレフィックス）を
              登録したか確認する。この 3 点を通せば、デプロイ後の
              「本番でだけ動かない」を大きく減らせます。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Nuxt 公式 - Deployment",
                  url: "https://nuxt.com/docs/getting-started/deployment",
                  description:
                    "build / generate とプラットフォーム別デプロイの公式ガイド",
                },
                {
                  title: "Nuxt 公式 - runtimeConfig",
                  url: "https://nuxt.com/docs/guide/going-further/runtime-config",
                  description:
                    "サーバー専用 / public の使い分けと環境変数による上書き",
                },
                {
                  title: "Nuxt 公式 - Rendering Modes",
                  url: "https://nuxt.com/docs/guide/concepts/rendering",
                  description:
                    "SSR / SSG / SPA / ハイブリッド（routeRules）の解説",
                },
                {
                  title: "Nitro - Deploy Providers",
                  url: "https://nitro.build/deploy",
                  description:
                    "Nitro が対応する各プラットフォームのプリセット一覧",
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
