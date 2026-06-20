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

const features = [
  {
    name: "レンダリング戦略",
    detail: "SSR（既定）/ SSG / ISR / SPA を route 単位で選べる",
    next: "Next.js の SSR / SSG / ISR に相当",
  },
  {
    name: "ファイルベースルーティング",
    detail: "app/pages/ にファイルを置くだけでルートが生成される",
    next: "Next.js の app/ ルーティングに相当",
  },
  {
    name: "自動 import",
    detail: "components / composables / utils を import 文なしで使える",
    next: "Next.js にはない Nuxt 独自の利便性",
  },
  {
    name: "server/api（Nitro）",
    detail: "同一プロジェクト内に API エンドポイントを書ける（BFF）",
    next: "Next.js の Route Handlers に相当",
  },
  {
    name: "モジュールエコシステム",
    detail: "@nuxt/image・@nuxtjs/i18n など設定 1 行で機能を追加",
    next: "Next.js のプラグインより統合度が高い",
  },
];

export default function WhatIsNuxt() {
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
            Nuxt とは / プロジェクト作成
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Nuxt は Vue のメタフレームワークです。React でいう Next.js
            にあたり、SSR・ファイルベースルーティング・自動 import・サーバー API
            を最初から備えています。ここでは Nuxt 4 のプロジェクトを作って、
            開発サーバーが立ち上がるところまでを確認します。
          </p>
        </div>

        <WhyNowBox tags={["Nuxt 4", "SSR", "Nitro", "自動 import", "srcDir"]}>
          <p>
            Vue 単体（create-vue）は SPA の枠組みだけを提供します。実務では
            SSR・SEO・サーバー API
            が必要になる場面が多く、それらを自前で組むより
            <strong>Nuxt</strong>
            に任せる方が速くて確実です。Nuxt 4 で <code>srcDir</code> が
            <code>app/</code> 既定に変わったため、古い記事との差分を
            最初に押さえておくと迷いません。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Nuxt 4 のディレクトリ構成
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nuxt 4 では既定の srcDir が app/ になり、pages / components / composables が app/ 配下に入ります。サーバーは server/、設定は nuxt.config.ts です。
            </p>
            <MermaidDiagram
              title="Nuxt 4 のディレクトリ構成（図）"
              chart={`flowchart TD
  ROOT["プロジェクト"] --> APP["app/ (Nuxt4 既定 srcDir)"]
  ROOT --> SRV["server/ (Nitro)"]
  ROOT --> CFG["nuxt.config.ts"]
  APP --> PG["pages/ (ルート)"]
  APP --> CM["components/ (自動import)"]
  APP --> CMP["composables/ (自動import)"]`}
            />
          </section>
          {/* Nuxt が提供するもの */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Nuxt が提供するもの
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nuxt は Vue 3 + Vite の上に、サーバーサイドの仕組み（Nitro）と
              開発体験を載せたフレームワークです。React 経験者は「Vue 版の
              Next.js」と捉えると対応関係がつかみやすいです。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      提供機能
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      内容
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      Next.js との対応
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((f) => (
                    <tr key={f.name} className="border-b border-border">
                      <td className="py-2 pr-4 font-bold text-foreground whitespace-nowrap align-top">
                        {f.name}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {f.detail}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {f.next}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="Nuxt = Vue 版の Next.js という理解">
              レンダリング戦略・ファイルベースルーティング・サーバー API
              という骨格は Next.js とよく似ています。違いは、Vue の Composition
              API（<code>ref</code> / <code>computed</code>）と SFC
              をベースにしている点と、自動 import が標準で効く点です。
            </InfoBox>
          </section>

          {/* プロジェクト作成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              プロジェクトを作って起動する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              公式のスキャフォールディングで作成します。
              <code>npm create nuxt@latest</code> が現在の入口で、内部では
              <code>nuxi</code>（Nuxt の CLI）が動きます。既存ディレクトリに
              初期化したい場合は <code>npx nuxi init</code> も使えます。
            </p>

            <CodeBlock
              language="bash"
              title="Nuxt プロジェクトを作成して起動する"
              code={`# 対話形式でプロジェクトを作成（パッケージマネージャを選択）
npm create nuxt@latest my-nuxt-app

# あるいは nuxi で初期化する
# npx nuxi init my-nuxt-app

# 依存をインストールして開発サーバーを起動
cd my-nuxt-app
npm install
npm run dev
# → http://localhost:3000 で開発サーバーが立ち上がる`}
            />

            <InfoBox type="info" title="ポートは 3000（Vue 単体は 5173）">
              create-vue（Vite）の既定ポートが <code>5173</code>
              なのに対し、Nuxt の開発サーバーは <code>3000</code> です。Next.js
              と同じ番号なので、複数アプリを同時に立ち上げるときは
              ポート競合に注意してください。
            </InfoBox>
          </section>

          {/* app/ ディレクトリ構成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              app/ ディレクトリ構成（Nuxt 4）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nuxt 4 では、アプリのソースが <code>app/</code>{" "}
              配下にまとまります。
              <code>pages/</code>・<code>components/</code>・
              <code>composables/</code>・<code>stores/</code> はすべて
              <code>app/</code> の中に置きます。プロジェクト直下には
              設定ファイルとサーバーコードが並びます。
            </p>

            <CodeBlock
              language="bash"
              title="Nuxt 4 のディレクトリツリー"
              code={`my-nuxt-app/
├─ app/                  # アプリ本体（Nuxt 4 の srcDir 既定）
│  ├─ app.vue            # ルートコンポーネント
│  ├─ pages/             # ファイルベースルーティング
│  ├─ components/        # 自動 import される（import 文不要）
│  ├─ composables/       # 自動 import される（useXxx）
│  └─ stores/            # Pinia ストア
├─ server/               # Nitro（サーバー）
│  └─ api/               # server/api/xxx.get.ts などの API
├─ public/               # 静的アセット（そのまま配信）
├─ nuxt.config.ts        # Nuxt 全体の設定
├─ tsconfig.json         # ルート tsconfig（references で分割設定を参照）
└─ package.json`}
            />

            <InfoBox
              type="info"
              title="Nuxt 4 で srcDir が app/ に変わった（仕様 vs 実測ギャップ）"
            >
              Nuxt 3 では <code>pages/</code> や <code>components/</code> を
              プロジェクト<strong>直下</strong>に置いていました。Nuxt 4 では
              既定の <code>srcDir</code> が <code>app/</code> になり、これらは
              <code>app/</code> 配下に移動します。
              <strong>
                ルート直下に pages/ を置いている記事はほぼ Nuxt 3 時代のもの
              </strong>
              と判断できます。手元の挙動が記事と違うときは、まず Nuxt
              のバージョンと <code>srcDir</code> を疑ってください。 （出典: Nuxt
              4 の Directory Structure / Upgrade Guide）
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Nuxt が標準で提供するものとして正しいのはどれ？"
              options={[
                {
                  label:
                    "SSR・ファイルベースルーティング・サーバー API（Nitro）を最初から備える",
                  correct: true,
                },
                { label: "状態管理ライブラリの実装そのもの（Pinia の代替）" },
                { label: "Vue 本体を置き換える独自の UI ライブラリ" },
                { label: "CSS フレームワーク（Tailwind の代替）" },
              ]}
              explanation="Nuxt は Vue のメタフレームワークで、SSR/SSG/ISR/SPA のレンダリング戦略、app/pages/ によるファイルベースルーティング、server/api/（Nitro）によるサーバー API を標準で備えます。状態管理は Pinia、UI やスタイルは別途モジュールやライブラリで補う構成です（Nuxt 自体が Pinia や Tailwind を置き換えるわけではありません）。"
            />
          </section>

          {/* nuxt.config.ts */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              nuxt.config.ts の役割
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              プロジェクトの設定は <code>nuxt.config.ts</code> に集約します。
              モジュールの追加、レンダリングモード、環境変数（
              <code>runtimeConfig</code>）などをここで宣言します。React の
              <code>next.config.js</code> にあたる位置づけです。
            </p>

            <CodeBlock
              language="ts"
              title="nuxt.config.ts — 設定の起点"
              code={`export default defineNuxtConfig({
  // Nuxt 4 の挙動を明示的に有効化（Nuxt 4 では既定）
  compatibilityVersion: 4,

  // 追加するモジュール（自動で機能が組み込まれる）
  modules: ['@pinia/nuxt', '@nuxt/image'],

  // 環境変数。public はクライアントにも露出する
  runtimeConfig: {
    apiSecret: '',                  // サーバー専用
    public: {
      apiBase: '/api',              // クライアントにも露出
    },
  },
})`}
            />

            <InfoBox type="info" title="compatibilityVersion は 4">
              <code>compatibilityVersion: 4</code> を指定すると Nuxt 4
              の挙動になります。Nuxt 3.12 以降では先行して有効化でき、Nuxt 4
              では既定値です。段階的に移行したいときは、ここを切り替えて
              挙動差を確認できます。
            </InfoBox>
          </section>

          {/* 自動 import */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              自動 import — import 文を書かない
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nuxt では <code>components/</code>・<code>composables/</code>・
              <code>utils/</code> に置いたものが自動で import されます。Vue
              本体の
              <code>ref</code> / <code>computed</code> や Nuxt の{" "}
              <code>useFetch</code> なども import 文なしで使えます。React
              の「毎回 import する」感覚との最大の違いです。
            </p>

            <CodeBlock
              language="html"
              title="app/pages/index.vue — import なしで composable / コンポーネントを使う"
              code={`<script setup lang="ts">
// ref / computed / useFetch を import せずに使える（自動 import）
const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>

<template>
  <!-- components/ のコンポーネントも import 不要で使える -->
  <AppHeader />
  <button @click="count++">count is {{ count }}</button>
  <p>doubled: {{ doubled }}</p>
</template>`}
            />

            <InfoBox type="success" title="型補完も効く">
              自動 import は <code>.nuxt/</code> に型定義を生成するため、 import
              文を書かなくても IDE の補完と型チェックが効きます。TypeScript
              は分割 tsconfig（<code>.nuxt/tsconfig.app.json</code> など）を
              ルートの <code>tsconfig.json</code> が <code>references</code>
              で参照する構成になっています。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Nuxt の自動 import の説明として正しいのはどれ？"
              options={[
                {
                  label:
                    "components / composables / utils に置いたものは import 文なしで使える",
                  correct: true,
                },
                { label: "すべての npm パッケージが自動で import される" },
                {
                  label:
                    "ref や computed も必ず手動で import しなければならない",
                },
                { label: "自動 import を使うと型補完が効かなくなる" },
              ]}
              explanation="Nuxt は components / composables / utils に置いたファイルと、Vue・Nuxt のコア API（ref・computed・useFetch など）を自動 import します。import 文を省略しても .nuxt/ に生成される型定義で補完と型チェックが効きます。対象は npm パッケージ全般ではなく、規約ディレクトリとコア API です。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Nuxt 公式 - Introduction",
                  url: "https://nuxt.com/docs/getting-started/introduction",
                  description: "Nuxt の概要と提供する機能の公式解説",
                },
                {
                  title: "Nuxt 公式 - Installation",
                  url: "https://nuxt.com/docs/getting-started/installation",
                  description:
                    "npm create nuxt@latest / nuxi init でのプロジェクト作成手順",
                },
                {
                  title: "Nuxt 公式 - Directory Structure",
                  url: "https://nuxt.com/docs/guide/directory-structure/app",
                  description:
                    "Nuxt 4 の app/ ディレクトリ構成の公式リファレンス",
                },
                {
                  title: "Nuxt 公式 - Upgrade Guide（Nuxt 4）",
                  url: "https://nuxt.com/docs/getting-started/upgrade",
                  description:
                    "srcDir の app/ 化や compatibilityVersion の変更点",
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
