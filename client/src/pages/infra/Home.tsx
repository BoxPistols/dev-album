import { Link } from "wouter";
import {
  ArrowRight,
  Cloud,
  Rocket,
  Network,
  Database,
  Boxes,
  GitBranch,
  Workflow,
  Activity,
  Keyboard,
} from "lucide-react";

const sectionCards = [
  {
    number: 1,
    title: "インフラの全体像",
    steps: "STEP 2-4",
    description:
      "オンプレミスとクラウド、IaaS/PaaS/SaaS/FaaS、サーバー/サーバーレス/エッジの実行モデルを整理し、特定クラウドに依存しない土台を作る。",
    href: "/infra/foundations/landscape",
    icon: <Cloud className="w-6 h-6" />,
  },
  {
    number: 2,
    title: "ホスティングとデプロイ",
    steps: "STEP 5-8",
    description:
      "Vercel を起点に、静的ホスティングとサーバーレス関数、環境変数、ビルドとデプロイのパイプラインを実際に動かしながら学ぶ。",
    href: "/infra/hosting/vercel",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    number: 3,
    title: "エッジと CDN",
    steps: "STEP 9-11",
    description:
      "CDN の基礎、キャッシュ戦略、エッジ関数の使いどころを整理する。ユーザーに近い場所で処理する設計を試しながら学べる。",
    href: "/infra/edge/cdn-basics",
    icon: <Network className="w-6 h-6" />,
  },
  {
    number: 4,
    title: "BaaS（Supabase / Firebase）",
    steps: "STEP 12-15",
    description:
      "BaaS の考え方と、認証・データベース・ストレージを一通り扱う。フロントエンドからバックエンド機能を呼び出す流れを体験できる。",
    href: "/infra/baas/what-is-baas",
    icon: <Boxes className="w-6 h-6" />,
  },
  {
    number: 5,
    title: "データベース",
    steps: "STEP 16-19",
    description:
      "リレーショナルと NoSQL の違い、スキーマ設計、インデックス、コネクション管理まで。データを「正しく置く」ための基礎を固める。",
    href: "/infra/database/relational",
    icon: <Database className="w-6 h-6" />,
  },
  {
    number: 6,
    title: "BFF とバックエンド設計",
    steps: "STEP 20-22",
    description:
      "Backend for Frontend の役割と、API ゲートウェイ・認証集約・データ整形を整理する。フロントとバックの境界をどこに引くかを学ぶ。",
    href: "/infra/bff/what-is-bff",
    icon: <GitBranch className="w-6 h-6" />,
  },
  {
    number: 7,
    title: "CI/CD と IaC",
    steps: "STEP 23-25",
    description:
      "継続的インテグレーション/デリバリのパイプライン、Infrastructure as Code、環境分離を扱う。手作業を仕組みに置き換える流れを掴む。",
    href: "/infra/devops/cicd",
    icon: <Workflow className="w-6 h-6" />,
  },
  {
    number: 8,
    title: "可観測性と運用",
    steps: "STEP 26-27",
    description:
      "ログ・メトリクス・トレースの三本柱、監視とアラート、SLO の考え方を整理する。動いた後の「運用」を見据えた設計を学べる。",
    href: "/infra/observability/monitoring",
    icon: <Activity className="w-6 h-6" />,
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
                ゼロから学ぶインフラと DevOps
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-sans font-bold text-foreground mb-6 leading-tight">
            バックエンド / インフラ / DevOps 入門
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            ホスティング・エッジ・BaaS・データベース・BFF・CI/CD・可観測性まで、
            フロントエンドの先にあるインフラ領域を、特定クラウドに偏らず実践的に学ぶ
          </p>

          <Link
            href="/infra/foundations/landscape"
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
            まずは「インフラの全体像」から
          </h2>
          <p className="text-muted-foreground mb-8">
            クラウドと実行モデルの地図を頭に入れると、この先の各トピックがどこに位置するかが見えてきます。
          </p>
          <Link
            href="/infra/foundations/landscape"
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
