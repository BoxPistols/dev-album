import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const projectFiles = [
  {
    path: "index.html",
    role: "アプリのエントリ HTML。#app に Vue がマウントされる",
  },
  { path: "src/main.ts", role: "createApp で App.vue をマウントする起点" },
  {
    path: "src/App.vue",
    role: "ルートコンポーネント（単一ファイルコンポーネント）",
  },
  { path: "src/components/", role: "再利用するコンポーネント置き場" },
  { path: "vite.config.ts", role: "Vite（ビルド/開発サーバー）の設定" },
  { path: "tsconfig.json", role: "TypeScript の設定（vue-tsc で型チェック）" },
];

export default function Setup() {
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
            環境構築とプロジェクト作成
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Vue 3 のプロジェクトは、公式の <code>create-vue</code>（Vite
            ベース）で作るのが現在の標準です。 TypeScript
            を有効にしたプロジェクトを作り、開発サーバーが立ち上がるところまでを確認します。
          </p>
        </div>

        <WhyNowBox tags={["Vue 3", "create-vue", "Vite", "TypeScript", "SFC"]}>
          <p>
            Vue
            のプロジェクト作成方法はいくつか変遷がありましたが、現在の公式推奨は
            <strong>create-vue</strong>（内部で Vite を使う）です。 古い記事には
            Vue CLI（webpack ベース）の手順が残っていますが、
            新規プロジェクトでは Vite ベースの create-vue
            を選ぶのが速くて確実です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* プロジェクト作成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              create-vue でプロジェクトを作る
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              対話形式で機能（TypeScript・Vue Router・Pinia
              など）を選べます。まずは TypeScript を有効にし、
              ほかは後から追加できるので最小構成で始めます。
            </p>

            <CodeBlock
              language="bash"
              title="プロジェクトを作成して起動する"
              code={`# 対話形式でプロジェクトを作成（TypeScript を「Yes」に）
npm create vue@latest my-vue-app

# 依存をインストールして開発サーバーを起動
cd my-vue-app
npm install
npm run dev
# → http://localhost:5173 で開発サーバーが立ち上がる`}
            />

            <InfoBox type="info" title="pnpm / yarn でも同じ">
              <code>pnpm create vue@latest</code> や{" "}
              <code>yarn create vue</code>{" "}
              でも同様に作成できます。チームのパッケージマネージャに合わせてください。
              型チェックは <code>vue-tsc</code>、Lint は ESLint（flat
              config）が現在の標準的な組み合わせです。
            </InfoBox>
          </section>

          {/* ディレクトリ構成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              生成されるディレクトリ構成
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              create-vue が生成する主なファイルです。React の{" "}
              <code>main.tsx</code> + <code>App.tsx</code> に当たるのが、Vue
              では <code>main.ts</code> + <code>App.vue</code> です。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      パス
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projectFiles.map((f) => (
                    <tr key={f.path} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {f.path}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground">
                        {f.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* main.ts と App.vue */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              アプリの起点（main.ts と App.vue）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>main.ts</code> で <code>createApp</code> を呼び、ルートの
              <code>App.vue</code> を <code>#app</code> にマウントします。
              これが Vue アプリの起動シーケンスです。
            </p>

            <CodeBlock
              language="ts"
              title="src/main.ts — アプリのマウント"
              code={`import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

createApp(App).mount('#app')`}
            />

            <CodeBlock
              language="html"
              title="src/App.vue — 単一ファイルコンポーネント（SFC）"
              code={`<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello Vue 3')
</script>

<template>
  <h1>{{ message }}</h1>
</template>

<style scoped>
h1 {
  color: #42b883;
}
</style>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>.vue</code> ファイルは
              <strong>単一ファイルコンポーネント（SFC）</strong>と呼ばれ、
              <code>{"<script setup>"}</code>（ロジック）・
              <code>{"<template>"}</code>（見た目）・
              <code>{"<style>"}</code>（スタイル）を 1
              ファイルにまとめます。この 3 ブロック構成が Vue
              開発の基本単位です。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="現在の Vue 3 で、新規プロジェクトを作る公式推奨の方法はどれ？"
              options={[
                { label: "Vue CLI（webpack ベース）" },
                {
                  label: "create-vue（Vite ベース、npm create vue@latest）",
                  correct: true,
                },
                { label: "ブラウザに CDN スクリプトを直接書く" },
                { label: "Create React App" },
              ]}
              explanation="現在の Vue 公式推奨は create-vue（内部で Vite を使用）です。npm create vue@latest で対話的にプロジェクトを作れます。Vue CLI は webpack ベースで、現在は新規プロジェクトでは非推奨です。CDN は学習やプロトタイプでは使えますが、本格的な開発には向きません。"
            />
          </section>

          {/* SFC の意義 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              なぜ SFC（単一ファイルコンポーネント）なのか
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React では JSX で見た目とロジックを 1 つの関数にまとめますが、Vue
              は <code>.vue</code>
              ファイルの中で 3 つのブロックに分けます。 関心ごと（ロジック /
              テンプレート / スタイル）が視覚的に分かれるため、
              どこに何を書くかが明確です。
            </p>
            <InfoBox type="success" title="scoped スタイルが標準で使える">
              <code>{"<style scoped>"}</code>{" "}
              と書くだけで、そのコンポーネントだけに効くスタイルになります。
              クラス名の衝突を気にせずスタイルを書ける点は、Vue の SFC
              の大きな利点です（詳しくはスタイリングの章で扱います）。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Vue 公式 - クイックスタート",
                  url: "https://ja.vuejs.org/guide/quick-start.html",
                  description:
                    "create-vue を使ったプロジェクト作成の公式手順（日本語）",
                },
                {
                  title: "create-vue（GitHub）",
                  url: "https://github.com/vuejs/create-vue",
                  description: "公式スキャフォールディングツールのリポジトリ",
                },
                {
                  title: "Vue 公式 - 単一ファイルコンポーネント",
                  url: "https://ja.vuejs.org/guide/scaling-up/sfc.html",
                  description: "SFC の構造と仕組みの解説（日本語）",
                },
                {
                  title: "Vite 公式",
                  url: "https://ja.vitejs.dev/",
                  description:
                    "create-vue が内部で使うビルドツール Vite の公式（日本語）",
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
