import { Link } from "wouter";
import {
  ArrowRight,
  Sprout,
  Shapes,
  GitFork,
  Wrench,
  Keyboard,
} from "lucide-react";

const sectionCards = [
  {
    number: 1,
    title: "Goの基礎",
    steps: "STEP 2-5",
    description:
      "環境構築・変数と型・制御構文・関数と複数戻り値・defer・スライスとマップ。TypeScriptと対比しながら文法の土台を作る。",
    href: "/go/basics/setup",
    icon: <Sprout className="w-6 h-6" />,
  },
  {
    number: 2,
    title: "型とインターフェース",
    steps: "STEP 6-9",
    description:
      "構造体とメソッド・暗黙に満たすインターフェース・ジェネリクス・値としてのエラー。Goの設計の考え方をつかむ。",
    href: "/go/types/structs-methods",
    icon: <Shapes className="w-6 h-6" />,
  },
  {
    number: 3,
    title: "並行処理",
    steps: "STEP 10-11",
    description:
      "goroutineとchannel・select・contextによるキャンセル・sync.WaitGroupとMutex。async/awaitとの違いを整理する。",
    href: "/go/concurrency/goroutines-channels",
    icon: <GitFork className="w-6 h-6" />,
  },
  {
    number: 4,
    title: "実践",
    steps: "STEP 12-14",
    description:
      "go.modとパッケージ・gofmtとgo vet・go testとテーブル駆動テスト・net/httpだけで書くJSON API。",
    href: "/go/practice/modules-tooling",
    icon: <Wrench className="w-6 h-6" />,
  },
];

const tsMapping = [
  { ts: "const / let", go: "const / var / :=" },
  { ts: "interface（構造的）", go: "interface（暗黙に満たす）" },
  { ts: "class", go: "struct + メソッド" },
  { ts: "throw / try-catch", go: "戻り値のerror" },
  { ts: "Promise / async-await", go: "goroutine / channel" },
  { ts: "npm + package.json", go: "go mod + go.mod" },
  { ts: "Prettier / ESLint", go: "gofmt / go vet" },
  { ts: "Vitest / Jest", go: "go test（標準）" },
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
                TypeScript経験者のためのGo
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-sans font-bold text-foreground mb-6 leading-tight">
            Go入門
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Goは静的型付けでコンパイルして単一のバイナリを作る言語です。APIサーバー・CLI・インフラのツール（Docker、Kubernetes、Terraformなど）で広く使われています。
            このマニュアルではTypeScriptとの対比で文法を押さえ、型・エラー・並行処理を経て、標準ライブラリだけでJSON
            APIを書くところまで進めます。
          </p>

          <Link
            href="/go/basics/setup"
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

      {/* TypeScriptとの対応 */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-muted border border-border rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground mb-3">
            TypeScript経験者へ：対応する概念
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {tsMapping.map((row) => (
              <p key={row.ts} className="text-muted-foreground">
                {row.ts} →{" "}
                <span className="text-foreground font-medium">{row.go}</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 進め方 */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground mb-3">
            コードの動かし方
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            このサイトのプレビューはブラウザ上でJavaScriptを動かす仕組みなので、Goのコードはその場では実行しません。
            各ページのコードは手元の
            <code className="bg-muted px-1 py-0.5 rounded text-xs">go run</code>
            か、ブラウザで動く公式の
            <a
              href="https://go.dev/play/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 mx-1"
            >
              Go Playground
            </a>
            に貼り付けて試せます。出力はコード中のコメントに書いてあります。
          </p>
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
            Goをインストールして、go mod initからHello
            Worldを動かすところまで進めます。
          </p>
          <Link
            href="/go/basics/setup"
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
