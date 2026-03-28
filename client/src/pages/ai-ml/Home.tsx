import { Link } from "wouter";
import { ArrowRight, Brain, Code2, Cpu, Server, Keyboard } from "lucide-react";

const sectionCards = [
  {
    number: 1,
    title: "AI 概論",
    steps: "STEP 2-3",
    description:
      "AI・ML・DL・LLM の全体像と基礎概念を整理する。各技術の位置づけと歴史的な流れを把握する。",
    href: "/ai-ml/ai-overview/landscape",
    icon: <Brain className="w-6 h-6" />,
  },
  {
    number: 2,
    title: "Python for ML",
    steps: "STEP 4-6",
    description:
      "Python 環境構築から基本文法、NumPy・Pandas によるデータ処理までを実践的に扱う。",
    href: "/ai-ml/python-ml/python-setup",
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    number: 3,
    title: "機械学習の基礎",
    steps: "STEP 7-8",
    description:
      "教師あり学習の仕組みとディープラーニングの基本構造を、コード例とともに学ぶ。",
    href: "/ai-ml/ml-fundamentals/supervised",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    number: 4,
    title: "LMOps",
    steps: "STEP 9-10",
    description:
      "LLM の仕組み・RAG・ベクトル検索・プロンプト設計など、運用に必要な知識を整理する。",
    href: "/ai-ml/lmops/llm-basics",
    icon: <Server className="w-6 h-6" />,
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
                Web 開発者のための AI 入門
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-sans font-bold text-foreground mb-6 leading-tight">
            AI / Python / 機械学習
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Python の基礎から機械学習・ディープラーニング・LLM・LMOps まで、Web
            開発者の視点で実践的に学ぶマニュアルです。
            理論の深追いよりも、開発現場で必要になる概念と使い方に焦点を当てています。
          </p>

          <Link
            href="/ai-ml/ai-overview/landscape"
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
            まずは全体像から
          </h2>
          <p className="text-muted-foreground mb-8">
            AI・ML・DL・LLM の関係を整理するところから始めましょう。
          </p>
          <Link
            href="/ai-ml/ai-overview/landscape"
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
