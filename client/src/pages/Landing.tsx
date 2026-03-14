import { Link } from 'wouter';
import { manuals, getManualPages, sections, pages, type ManualId } from '@/lib/navigation';
import {
  ArrowRight,
  BookOpen,
  Code2,
  GitBranch,
  Box,
  Terminal,
  Target,
  Zap,
  CheckCircle2,
  Layers,
  PenTool,
  Users,
  Rocket,
} from 'lucide-react';

/* ── マニュアル別カラー ── */
const manualGradients: Record<ManualId, string> = {
  react: 'from-indigo-500 to-indigo-600',
  git: 'from-rose-500 to-rose-600',
  threejs: 'from-teal-500 to-teal-600',
  'claude-mux': 'from-violet-500 to-violet-600',
};

const manualTextColors: Record<ManualId, string> = {
  react: 'text-indigo-600 dark:text-indigo-400',
  git: 'text-rose-600 dark:text-rose-400',
  threejs: 'text-teal-600 dark:text-teal-400',
  'claude-mux': 'text-violet-600 dark:text-violet-400',
};

const manualIcons: Record<ManualId, React.ReactNode> = {
  react: <Code2 size={24} />,
  git: <GitBranch size={24} />,
  threejs: <Box size={24} />,
  'claude-mux': <Terminal size={24} />,
};

const manualDetails: Record<ManualId, { tagline: string; topics: string[] }> = {
  react: {
    tagline: 'コンポーネント設計からデプロイまで、フロントエンド開発の全体像を掴む',
    topics: ['React 19 + TypeScript', 'Next.js 15 App Router', 'Tailwind / MUI / Storybook', 'デザインシステム構築'],
  },
  git: {
    tagline: 'ひとりの開発からチーム開発へ、バージョン管理の実践力を身につける',
    topics: ['Git の仕組みと基本操作', 'ブランチ戦略とマージ', 'GitHub PR / Issue 運用', 'AI エージェント連携'],
  },
  threejs: {
    tagline: 'Web ブラウザで 3D 表現を実現する、インタラクティブ開発入門',
    topics: ['Three.js シーン構築', 'React Three Fiber', 'ライティング・マテリアル', '飛行シミュレーション'],
  },
  'claude-mux': {
    tagline: 'AI を開発ワークフローに組み込み、生産性を飛躍的に向上させる',
    topics: ['Claude Code CLI 活用', 'tmux マルチプレクサ', 'MCP サーバー / Hooks', 'CI/CD パイプライン'],
  },
};

/* ── 対象者 ── */
const audiences = [
  {
    icon: <Rocket size={24} />,
    title: 'フロントエンド入門者',
    description: 'HTML / CSS は書けるが、React やモダンな開発ツールに踏み出せていない方。環境構築からデプロイまで一気通貫で学べます。',
  },
  {
    icon: <Users size={24} />,
    title: 'チーム開発に参加する方',
    description: 'Git のブランチ運用、PR レビュー、Storybook でのコンポーネント管理など、チームで働くための実践スキルを習得。',
  },
  {
    icon: <Zap size={24} />,
    title: 'AI で開発を加速したい方',
    description: 'Claude Code や MCP を使い、コーディング・テスト・デプロイを AI と協働で進める次世代の開発手法を体験。',
  },
];

/* ── 学習体験の特徴 ── */
const features = [
  {
    icon: <Code2 size={20} />,
    title: 'ライブエディタ',
    description: 'ブラウザ上でコードを書いて即座にプレビュー。環境構築なしで実験できます。',
  },
  {
    icon: <CheckCircle2 size={20} />,
    title: 'コーディングチャレンジ',
    description: '各ステップにチャレンジ問題。ヒントと模範解答で理解を確認しながら進めます。',
  },
  {
    icon: <Target size={20} />,
    title: 'クイズ & FAQ',
    description: '知識の定着を確認するクイズと、つまずきやすいポイントを FAQ で解消。',
  },
  {
    icon: <Layers size={20} />,
    title: 'ステップバイステップ',
    description: '全 154 ステップを段階的に進行。前のステップの知識が次で活きる構成です。',
  },
];

/* ── 学習ロードマップ ── */
const roadmap = [
  { phase: '基礎', label: 'React + TypeScript', color: 'bg-indigo-500', description: 'コンポーネント・状態管理・Hooks の基本を固める' },
  { phase: '応用', label: 'Next.js + CSS', color: 'bg-teal-500', description: 'SSR/SSG、ルーティング、スタイリングを実践' },
  { phase: '品質', label: 'Storybook + Git', color: 'bg-rose-500', description: 'コンポーネント管理とチーム開発ワークフロー' },
  { phase: '加速', label: 'AI + 3D', color: 'bg-violet-500', description: 'Claude Code で生産性向上、Three.js で表現力拡張' },
];

/* ── メイン ── */
export default function Landing() {
  const totalPages = pages.length;
  const totalSections = sections.filter((s) => s.manualId).length;

  return (
    <div className="min-h-screen bg-background">
      {/* ═══ Hero ═══ */}
      <section className="mesh-gradient text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen size={20} />
            <span className="text-sm font-medium tracking-wider uppercase opacity-80">DevDeck</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 leading-[1.15]">
            フロントエンド開発の<br />
            <span className="text-blue-200">全体像を、ひとつの場所で</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-8">
            React・Git・Three.js・Claude Code — 現場で求められる 4 つの技術領域を、
            ステップバイステップの実践形式で体系的に学べる開発ガイドコレクション。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/react"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              学習をはじめる
              <ArrowRight size={16} />
            </Link>
            <a
              href="#manuals"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              マニュアル一覧
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Problem Statement ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">Why DevDeck?</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-snug">
            断片的な情報では、<br className="hidden md:block" />開発力は身につかない
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            React のチュートリアルを終えても、Git でチーム開発する方法がわからない。
            Next.js を学んでも、デプロイや CI/CD の繋げ方が見えない。
            — 技術は単体ではなく<strong className="text-foreground">繋がりの中で</strong>初めて力になります。
            DevDeck は 4 つの技術領域を横断的に結び、
            「環境構築からデプロイ・チーム開発」までの道筋を一本のラインで描きます。
          </p>
        </div>
      </section>

      {/* ═══ Who It's For ═══ */}
      <section className="bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">Target Audience</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">こんな方に</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {audiences.map((a) => (
              <div key={a.title} className="bg-card rounded-xl p-6 border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  {a.icon}
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Learning Path ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">Learning Path</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">4 つの教材がひとつの学習パスに</h2>
        <p className="text-muted-foreground mb-10 max-w-2xl leading-relaxed">
          それぞれの教材は独立して学べますが、組み合わせることで「実務で通用する開発力」が身につきます。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roadmap.map((r, i) => (
            <div key={r.phase} className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{r.phase}</p>
                  <p className="text-sm font-semibold text-foreground">{r.label}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-11">{r.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Manual Cards ═══ */}
      <section id="manuals" className="bg-muted/30 scroll-mt-8">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">Manuals</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">4 つのマニュアル</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {manuals.map((m) => {
              const pageCount = getManualPages(m.id).length;
              const details = manualDetails[m.id];
              return (
                <Link
                  key={m.id}
                  href={`/${m.id}`}
                  className="group bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${manualGradients[m.id]} flex items-center justify-center flex-shrink-0 text-white`}>
                      {manualIcons[m.id]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {m.shortTitle}
                        </h3>
                        <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                      <p className={`text-xs font-medium ${manualTextColors[m.id]}`}>{pageCount} ステップ</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{details.tagline}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {details.topics.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ Features ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">Features</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">読むだけじゃない、書いて学ぶ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                {f.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ What You Can Do ═══ */}
      <section className="bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">Outcomes</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">学習後にできること</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {[
              'React + TypeScript でコンポーネントベースの UI を設計・実装できる',
              'Next.js で SSR/SSG アプリをビルドし Vercel にデプロイできる',
              'Git / GitHub でブランチ運用・PR レビューのチーム開発ができる',
              'Storybook でコンポーネントカタログを構築・運用できる',
              'Tailwind CSS / MUI でデザインシステムに沿った開発ができる',
              'Claude Code + MCP で AI を活用した開発ワークフローを構築できる',
              'Three.js / R3F で 3D コンテンツを Web に組み込める',
              'ポートフォリオサイトを一から設計・制作・公開できる',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <PenTool size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Stats + CTA ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <div className="inline-flex gap-10 px-8 py-5 rounded-2xl bg-muted/50 border border-border">
            <div>
              <p className="text-3xl font-bold text-primary">{totalPages}</p>
              <p className="text-xs text-muted-foreground mt-1">ステップ</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">{manuals.length}</p>
              <p className="text-xs text-muted-foreground mt-1">マニュアル</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">{totalSections}</p>
              <p className="text-xs text-muted-foreground mt-1">セクション</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link
            href="/react"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            React マニュアルからはじめる
            <ArrowRight size={16} />
          </Link>
          <p className="text-sm text-muted-foreground mt-3">
            アカウント不要・無料・すぐに始められます
          </p>
        </div>
      </section>
    </div>
  );
}
