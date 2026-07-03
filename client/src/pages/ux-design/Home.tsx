import {
  BookOpen,
  Users,
  Layers,
  Palette,
  MousePointerClick,
  SwatchBook,
  ClipboardCheck,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'wouter';
import PageNavigation from '@/components/PageNavigation';

const sections = [
  {
    icon: <BookOpen size={20} />,
    title: 'UX の基礎',
    steps: 'STEP 2-4',
    description: 'UX の定義、デザインプロセス、デザイン思考の基本',
    path: '/ux-design/ux-foundations/what-is-ux',
  },
  {
    icon: <Users size={20} />,
    title: 'ユーザーリサーチ',
    steps: 'STEP 5-6',
    description: 'リサーチ手法、ペルソナ、ジャーニーマップの作成',
    path: '/ux-design/research/user-research',
  },
  {
    icon: <Layers size={20} />,
    title: 'IA とワイヤーフレーム',
    steps: 'STEP 7-8',
    description: '情報アーキテクチャの設計とワイヤーフレーム作成',
    path: '/ux-design/ia-wireframe/information-architecture',
  },
  {
    icon: <Palette size={20} />,
    title: 'UI デザイン',
    steps: 'STEP 9-10',
    description: 'ビジュアルデザインの原則とデザインシステム構築',
    path: '/ux-design/ui-design/visual-design',
  },
  {
    icon: <MousePointerClick size={20} />,
    title: 'プロトタイピング',
    steps: 'STEP 11',
    description: 'Figma を使ったインタラクティブプロトタイプの作成',
    path: '/ux-design/prototyping/figma-prototype',
  },
  {
    icon: <SwatchBook size={20} />,
    title: 'デザイナーのためのトークンとコンポーネント',
    steps: 'STEP 12-14',
    description: 'コード無しで学ぶデザイントークン・コンポーネント思考・AI との共通言語',
    path: '/ux-design/for-designers/design-tokens-for-designers',
  },
  {
    icon: <ClipboardCheck size={20} />,
    title: '評価と改善',
    steps: 'STEP 15',
    description: 'ユーザビリティテストの実施と改善サイクル',
    path: '/ux-design/evaluation/usability-testing',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-rose-500 to-orange-500 dark:from-pink-800 dark:via-rose-700 dark:to-orange-700">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 md:py-28 relative z-10">
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              全15ステップ
            </span>
            <span className="text-xs font-semibold text-pink-200/90 bg-pink-400/10 backdrop-blur-sm px-3 py-1 rounded-full border border-pink-300/10">
              UX Design
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-[1.1]"
            style={{ letterSpacing: '-0.035em' }}
          >
            UX デザイン入門
          </h1>
          <p className="text-lg md:text-xl text-pink-100/90 mb-10 leading-relaxed max-w-2xl">
            ユーザーリサーチからプロトタイピング、ユーザビリティテストまで。
            エンジニアの視点で UX デザインの考え方と実践手法を一通り学べるマニュアルです。
          </p>
          <Link
            href="/ux-design/ux-foundations/what-is-ux"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-rose-700 font-semibold rounded-xl hover:bg-pink-50 transition-all duration-200"
          >
            学習をはじめる
            <ArrowRight
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* このマニュアルの対象 */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-16 pb-8">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            このマニュアルの対象
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            フロントエンドやバックエンドの開発に携わるエンジニアで、UX
            デザインの基礎を体系的に学びたい方を想定しています。
            デザイナーとの協業で「なぜこのデザインなのか」を理解し、実装判断に活かすことが目標です。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: '前提知識',
                value: 'HTML/CSS の基本的な理解',
              },
              {
                label: '想定時間',
                value: '各ステップ 15-30 分程度',
              },
              {
                label: '進め方',
                value: '順番に読む / 興味のある章から',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-card p-4"
              >
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* セクション一覧 */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">
            カリキュラム
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map((section) => (
              <Link
                key={section.title}
                href={section.path}
                className="group rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-150"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {section.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground">
                        {section.steps}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* ページナビゲーション */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-16">
        <PageNavigation />
      </div>
    </div>
  );
}
