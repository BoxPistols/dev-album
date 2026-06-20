import { Link } from "wouter";
import {
  ArrowRight,
  Sprout,
  Layers,
  Boxes,
  Palette,
  Server,
  Rocket,
  Sparkles,
  Keyboard,
} from "lucide-react";

const sectionCards = [
  {
    number: 1,
    title: "Vue の基礎",
    steps: "STEP 2-6",
    description:
      "環境構築・テンプレート構文・リアクティビティ（ref / reactive）・コンポーネント・Props / Emits。Vue 3 の土台を固める。",
    href: "/vue/basics/setup",
    icon: <Sprout className="w-6 h-6" />,
  },
  {
    number: 2,
    title: "Composition API",
    steps: "STEP 7-11",
    description:
      "script setup と TypeScript・computed / watch・ライフサイクル・Composables・provide / inject。ロジックを組み立てる中核。",
    href: "/vue/composition/script-setup",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    number: 3,
    title: "状態管理とルーティング",
    steps: "STEP 12-13",
    description:
      "Vue Router によるルーティングと、Pinia によるアプリ全体の状態管理。複数画面のアプリを成立させる。",
    href: "/vue/state-routing/router",
    icon: <Boxes className="w-6 h-6" />,
  },
  {
    number: 4,
    title: "スタイリングと UI",
    steps: "STEP 14",
    description:
      "SFC の scoped スタイル・CSS Modules・Tailwind・UI ライブラリ。Vue でのスタイリングの選択肢を整理する。",
    href: "/vue/styling/sfc-styling",
    icon: <Palette className="w-6 h-6" />,
  },
  {
    number: 5,
    title: "Nuxt 基礎",
    steps: "STEP 15-17",
    description:
      "Nuxt とは何か・ファイルベースルーティングとレイアウト・データ取得（useFetch / useAsyncData / $fetch）。",
    href: "/vue/nuxt-basics/what-is-nuxt",
    icon: <Server className="w-6 h-6" />,
  },
  {
    number: 6,
    title: "Nuxt サーバーと実践",
    steps: "STEP 18-21",
    description:
      "server/api と Nitro・レンダリングモード（SSR / SSG / ISR）・ミドルウェア / プラグイン / モジュール・デプロイ。",
    href: "/vue/nuxt-server/server-api",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    number: 7,
    title: "最新と総まとめ",
    steps: "STEP 22",
    description:
      "Vue 3.5 / Nuxt 4 の最新機能（reactive props destructure・defineModel・useId 等）と、全体の振り返り。",
    href: "/vue/advanced/latest-features",
    icon: <Sparkles className="w-6 h-6" />,
  },
];

const shortcuts = [
  { keys: ["←", "→"], label: "前後のページに移動" },
  { keys: ["B"], label: "ブックマーク" },
  { keys: ["T"], label: "テーマ切り替え" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-primary font-medium text-sm">
                Vue 3 / Nuxt を実践的に学ぶ
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-sans font-bold text-foreground mb-6 leading-tight">
            Vue 3 / Nuxt 入門
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Vue 3 のリアクティビティと Composition API から、Pinia・Vue Router、
            そして Nuxt
            によるサーバーサイドレンダリング・データ取得・デプロイまで。 React
            マニュアルと同じ「読んで、書いて、結果を見る」進め方で、現代的な
            Vue/Nuxt 開発を一通り体験します。
          </p>

          <Link
            href="/vue/basics/setup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            学習を始める
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Section Cards */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-sans font-bold text-center text-foreground mb-12">
            カリキュラム
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sectionCards.map((card) => (
              <Link key={card.number} href={card.href} className="group block">
                <div className="bg-card border border-border rounded-xl p-6 hover:shadow-sm transition-shadow h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-sans font-bold text-sm">
                        {card.number}
                      </span>
                    </div>
                    <div className="text-primary">{card.icon}</div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {card.steps}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* React との対応 */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-muted border border-border rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground mb-3">
            React 経験者へ：対応する概念
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <p className="text-muted-foreground">
              useState →{" "}
              <span className="text-foreground font-medium">
                ref / reactive
              </span>
            </p>
            <p className="text-muted-foreground">
              useMemo →{" "}
              <span className="text-foreground font-medium">computed</span>
            </p>
            <p className="text-muted-foreground">
              useEffect →{" "}
              <span className="text-foreground font-medium">
                watch / watchEffect
              </span>
            </p>
            <p className="text-muted-foreground">
              カスタムフック →{" "}
              <span className="text-foreground font-medium">Composables</span>
            </p>
            <p className="text-muted-foreground">
              Context →{" "}
              <span className="text-foreground font-medium">
                provide / inject
              </span>
            </p>
            <p className="text-muted-foreground">
              Next.js →{" "}
              <span className="text-foreground font-medium">Nuxt</span>
            </p>
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-muted border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Keyboard size={18} className="text-muted-foreground" />
              <h3 className="text-sm font-bold text-foreground">
                キーボードショートカット
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {shortcuts.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        className="inline-block px-2 py-0.5 rounded border border-border bg-card text-xs font-mono text-foreground"
                        style={{ fontSize: 13 }}
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
            まずは環境構築から
          </h2>
          <p className="text-muted-foreground mb-8">
            create-vue で Vue 3 + TypeScript
            のプロジェクトを作るところから始めましょう。
          </p>
          <Link
            href="/vue/basics/setup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            今すぐ始める
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
