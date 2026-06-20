import { Link } from "wouter";
import {
  ArrowRight,
  Globe,
  Boxes,
  FileJson,
  Wrench,
  ShieldCheck,
  GitFork,
  Users,
  Code2,
  Rocket,
  Keyboard,
} from "lucide-react";

const sectionCards = [
  {
    number: 1,
    title: "API の基礎",
    steps: "STEP 3-6",
    description:
      "API・HTTP・REST という設計思想と、リソース指向の URI 設計を整理する。サーバ言語に依存しない普遍的な土台を作る。",
    href: "/api/basics/what-is-api",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    number: 2,
    title: "REST API 設計",
    steps: "STEP 7-13",
    description:
      "HTTP メソッド・ステータスコード・リクエスト/レスポンス・ページネーション・エラー設計・HTTP キャッシュ・べき等キーを、実例で具体化する。",
    href: "/api/rest-design/http-methods",
    icon: <Boxes className="w-6 h-6" />,
  },
  {
    number: 3,
    title: "OpenAPI / Swagger",
    steps: "STEP 14-18",
    description:
      "OpenAPI でAPIを「契約」として記述する方法。ドキュメント構造・スキーマ・Swagger UI・スキーマファースト開発までを扱う。",
    href: "/api/openapi/what-is-openapi",
    icon: <FileJson className="w-6 h-6" />,
  },
  {
    number: 4,
    title: "API 構築実践",
    steps: "STEP 19-24",
    description:
      "モックサーバーから始め、バリデーション・認証認可・レート制限・Webhooks・バージョニングまで、API を「動かしながら」固める。",
    href: "/api/build/mock-server",
    icon: <Wrench className="w-6 h-6" />,
  },
  {
    number: 5,
    title: "API 検証と品質",
    steps: "STEP 25-29",
    description:
      "契約テスト・Spectral Lint・セキュリティ・可観測性、そしてデバッグと GUI/CLI ツールの使い方。品質を CI と運用で担保する。",
    href: "/api/quality/contract-testing",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    number: 6,
    title: "設計と協業",
    steps: "STEP 30-31",
    description:
      "バックエンドとフロントエンドの API 設計の違いと協業。デザイン・情報設計（IA）と API の関連を、デザイナー視点も交えて整理する。",
    href: "/api/collaboration/backend-frontend",
    icon: <Users className="w-6 h-6" />,
  },
  {
    number: 7,
    title: "フロントエンド実践",
    steps: "STEP 32-35",
    description:
      "React・Next.js・Vue・Nuxt それぞれでの API 連携を、データフェッチ・型生成・ローディング/エラー処理まで実装で学ぶ。",
    href: "/api/practice/react",
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    number: 8,
    title: "発展",
    steps: "STEP 36-37",
    description:
      "GraphQL・gRPC など REST 以外の選択肢と使い分け。最後に設計チェックリストで全体を振り返る。",
    href: "/api/advanced/beyond-rest",
    icon: <GitFork className="w-6 h-6" />,
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
                ゼロから学ぶ API 設計
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-sans font-bold text-foreground mb-6 leading-tight">
            API 設計 / OpenAPI 入門
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            REST API の設計原則から OpenAPI/Swagger
            による仕様化、モック・バリデーション・認証、 契約テストや Lint
            による検証まで。「なんとなく動く API」ではなく、
            一貫性があり壊れにくい API
            を設計するための考え方を、サーバ言語に依存しない形で順を追って学びます。
          </p>

          <Link
            href="/api/basics/what-is-api"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            学習を始める
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* クイックスタート CTA（FE 向け） */}
      <section className="px-4 md:px-8 -mt-6 mb-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/api/quickstart" className="group block">
            <div className="flex items-start gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5 md:p-6 hover:border-primary/50 hover:shadow-sm transition-all">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  現場で急いでいる方へ — クイックスタート
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  バックエンドやデータベースが苦手なフロントエンドエンジニアが、要点を絞って最短で
                  API を扱えるようになるための学習フローです。「まず読む順」を案内します。
                </p>
              </div>
              <ArrowRight
                className="flex-shrink-0 mt-1 text-primary group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </div>
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
            まずは「API とは何か」から
          </h2>
          <p className="text-muted-foreground mb-8">
            API
            がクライアントとサーバの「契約」であることを理解するところから始めましょう。
          </p>
          <Link
            href="/api/basics/what-is-api"
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
