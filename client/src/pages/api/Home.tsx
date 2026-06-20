import { Link } from "wouter";
import {
  ArrowRight,
  Globe,
  Boxes,
  FileJson,
  Wrench,
  ShieldCheck,
  GitFork,
  Keyboard,
} from "lucide-react";

const sectionCards = [
  {
    number: 1,
    title: "API の基礎",
    steps: "STEP 2-5",
    description:
      "API・HTTP・REST という設計思想と、リソース指向の URI 設計を整理する。サーバ言語に依存しない普遍的な土台を作る。",
    href: "/api/basics/what-is-api",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    number: 2,
    title: "REST API 設計",
    steps: "STEP 6-10",
    description:
      "HTTP メソッドの使い分け・ステータスコード・リクエスト/レスポンス・ページネーション・エラー設計を、実例で具体化する。",
    href: "/api/rest-design/http-methods",
    icon: <Boxes className="w-6 h-6" />,
  },
  {
    number: 3,
    title: "OpenAPI / Swagger",
    steps: "STEP 11-15",
    description:
      "OpenAPI でAPIを「契約」として記述する方法。ドキュメント構造・スキーマ・Swagger UI・スキーマファースト開発までを扱う。",
    href: "/api/openapi/what-is-openapi",
    icon: <FileJson className="w-6 h-6" />,
  },
  {
    number: 4,
    title: "API 構築実践",
    steps: "STEP 16-19",
    description:
      "モックサーバーから始め、入力バリデーション・認証認可・バージョニングまで、API を「動かしながら」固める実践プロセス。",
    href: "/api/build/mock-server",
    icon: <Wrench className="w-6 h-6" />,
  },
  {
    number: 5,
    title: "API 検証と品質",
    steps: "STEP 20-22",
    description:
      "契約テスト・Spectral によるスキーマ Lint・API セキュリティ設計。契約のズレを検知し、品質をCIで担保する。",
    href: "/api/quality/contract-testing",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    number: 6,
    title: "発展",
    steps: "STEP 23-24",
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
