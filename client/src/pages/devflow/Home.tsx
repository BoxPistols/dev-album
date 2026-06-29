import { Link } from "wouter";
import {
  ArrowRight,
  Repeat,
  ListTodo,
  Workflow,
  GitPullRequest,
  Palette,
  Users,
  Keyboard,
} from "lucide-react";

const sectionCards = [
  {
    number: 1,
    title: "アジャイルとスクラム",
    steps: "STEP 2-5",
    description:
      "アジャイルソフトウェア開発宣言から、スクラムの役割・イベント・作成物、スプリントの回し方、カンバンとフロー効率まで。反復的にプロダクトを育てる考え方を体系的に学ぶ。",
    href: "/devflow/agile/what-is-agile",
    icon: <Repeat className="w-6 h-6" />,
  },
  {
    number: 2,
    title: "プロジェクトマネジメント",
    steps: "STEP 6-8",
    description:
      "プロダクトバックログの作り方と優先順位づけ、見積もりとプランニング、進捗の可視化。やることの整理と意思決定の流れを実務寄りに整理する。",
    href: "/devflow/pm/backlog",
    icon: <ListTodo className="w-6 h-6" />,
  },
  {
    number: 3,
    title: "DevOps とデリバリー",
    steps: "STEP 9-11",
    description:
      "DevOps の文化と原則、CI/CD パイプライン、継続的デリバリーとリリース戦略。コードを書いてから本番に届くまでの一連の流れを通して理解する。",
    href: "/devflow/devops/culture",
    icon: <Workflow className="w-6 h-6" />,
  },
  {
    number: 4,
    title: "コードレビュー",
    steps: "STEP 12-15",
    description:
      "なぜレビューするのか、レビュアー/作成者それぞれの視点、プルリクエストの粒度とコメントの書き方。チームの品質を支えるレビューの作法を学ぶ。",
    href: "/devflow/review/why-review",
    icon: <GitPullRequest className="w-6 h-6" />,
  },
  {
    number: 5,
    title: "DesignOps とデザインフロー",
    steps: "STEP 16-18",
    description:
      "DesignOps とは何か、デザインシステムと運用、デザイナーとエンジニアの協業フロー。デザインを仕組みとして回すための考え方を扱う。",
    href: "/devflow/designops/what-is-designops",
    icon: <Palette className="w-6 h-6" />,
  },
  {
    number: 6,
    title: "チーム品質とコラボレーション",
    steps: "STEP 19-21",
    description:
      "ドキュメンテーション、非同期コミュニケーション、心理的安全性とふりかえり。コードの外側にあるチーム開発の土台を整理する。",
    href: "/devflow/team/documentation",
    icon: <Users className="w-6 h-6" />,
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
                ゼロから学ぶチーム開発
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-sans font-bold text-foreground mb-6 leading-tight">
            開発フロー / チーム / DesignOps 入門
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            アジャイル・スクラムから DevOps・コードレビュー・DesignOps
            まで、コードを書く前後にあるチーム開発の流れを体系的に学ぶ
          </p>

          <Link
            href="/devflow/agile/what-is-agile"
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
            まずは「アジャイルとは」から
          </h2>
          <p className="text-muted-foreground mb-8">
            チーム開発の流れを理解する出発点として、アジャイルの価値観を押さえるところから始めましょう。
          </p>
          <Link
            href="/devflow/agile/what-is-agile"
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
