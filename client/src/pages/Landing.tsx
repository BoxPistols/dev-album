import { Link } from 'wouter';
import { manuals, getManualPages, type ManualId } from '@/lib/navigation';
import { ArrowRight, BookOpen } from 'lucide-react';

const manualBgColors: Record<ManualId, string> = {
  react: 'from-blue-600 to-blue-700',
  git: 'from-orange-500 to-orange-600',
  threejs: 'from-cyan-500 to-cyan-600',
  'claude-mux': 'from-amber-500 to-amber-600',
};

const manualDescriptions: Record<ManualId, string[]> = {
  react: ['React / TypeScript 基礎', 'Next.js サーバーコンポーネント', 'Storybook & デザインシステム'],
  git: ['Git & GitHub の基本', 'ブランチ・マージワークフロー', 'AI エージェント連携'],
  threejs: ['Three.js 3D グラフィックス', 'React Three Fiber', '飛行シミュレーション開発'],
  'claude-mux': ['Claude Code CLI 活用', 'tmux マルチプレクサ', 'MCP / Hooks / CI/CD'],
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* ヒーロー */}
      <div className="mesh-gradient text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={24} />
            <span className="text-sm font-medium tracking-wider uppercase opacity-80">統合学習マニュアル</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 leading-tight">
            すべてのマニュアルを<br />
            <span className="text-blue-200">ひとつの場所で</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            React・Git・Three.js・Claude Code の 4 つの学習マニュアルを統合。
            共通の UI と検索で、必要な知識にすぐアクセスできます。
          </p>
        </div>
      </div>

      {/* マニュアルカード */}
      <div className="max-w-5xl mx-auto px-6 -mt-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {manuals.map((m) => {
            const pageCount = getManualPages(m.id).length;
            const descriptions = manualDescriptions[m.id];
            return (
              <Link
                key={m.id}
                href={`/${m.id}`}
                className="group relative bg-card border border-border rounded-2xl p-6 card-hover overflow-hidden"
              >
                {/* アクセントバー */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${manualBgColors[m.id]}`} />

                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${manualBgColors[m.id]} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-heading font-bold text-2xl">{m.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {m.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-3">{pageCount} ステップ</p>
                    <ul className="space-y-1">
                      {descriptions.map((d) => (
                        <li key={d} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* 統計 */}
        <div className="mt-12 text-center">
          <div className="inline-flex gap-8 px-8 py-4 rounded-2xl bg-muted/50 border border-border">
            <div>
              <p className="text-2xl font-bold text-primary">149</p>
              <p className="text-xs text-muted-foreground">ステップ</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">4</p>
              <p className="text-xs text-muted-foreground">マニュアル</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">44</p>
              <p className="text-xs text-muted-foreground">セクション</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
