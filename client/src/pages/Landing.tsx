import { Link } from "wouter";
import {
  manuals,
  getManualPages,
  sections,
  pages,
  type ManualId,
} from "@/lib/navigation";
import { ArrowRight, Code2, GitBranch, Box, Terminal } from "lucide-react";
import CodePreview from "@/components/CodePreview";
import CodingChallenge from "@/components/CodingChallenge";

/* ── マニュアル別アイコン ── */
const manualIcons: Record<ManualId, React.ReactNode> = {
  react: <Code2 size={20} />,
  git: <GitBranch size={20} />,
  threejs: <Box size={20} />,
  "claude-mux": <Terminal size={20} />,
};

const manualDetails: Record<ManualId, { tagline: string; topics: string[] }> = {
  react: {
    tagline:
      "コンポーネントの基本から CSS・Next.js・デプロイまで一通り体験できる",
    topics: [
      "React 19 + TypeScript",
      "Next.js 15 App Router",
      "Tailwind / MUI / Storybook",
      "デザインシステム構築",
    ],
  },
  git: {
    tagline: "Git の基本操作からブランチ運用・チーム開発の流れを学べる",
    topics: [
      "Git の仕組みと基本操作",
      "ブランチ戦略とマージ",
      "GitHub PR / Issue 運用",
      "AI エージェント連携",
    ],
  },
  threejs: {
    tagline: "ブラウザ上で 3D グラフィックスを動かしながら学べる入門コース",
    topics: [
      "Three.js シーン構築",
      "React Three Fiber",
      "ライティング・マテリアル",
      "飛行シミュレーション",
    ],
  },
  "claude-mux": {
    tagline: "AI ツールと tmux を使った開発ワークフローを試しながら学べる",
    topics: [
      "Claude Code CLI 活用",
      "tmux マルチプレクサ",
      "MCP サーバー / Hooks",
      "CI/CD パイプライン",
    ],
  },
};

/* ── ライブエディタ デモ用コード ── */
const liveEditorDemoCode = `function Greeting() {
  return (
    <div style={{
      fontFamily: "system-ui, sans-serif",
      padding: "2rem",
      textAlign: "center",
    }}>
      <h1 style={{ color: "#2563eb", fontSize: "1.5rem" }}>
        Hello World
      </h1>
      <p style={{ color: "var(--text-muted)" }}>
        React コンポーネントのプレビュー
      </p>
    </div>
  );
}`;

/* ── チャレンジ デモ用 ── */
const challengeDemoCode = `function App() {
  return (
    <div style={{
      display: "___", // ← "flex" に変えてみよう
      gap: "1rem",
      padding: "1.5rem",
      fontFamily: "system-ui, sans-serif",
      color: "var(--text)",
    }}>
      <div style={{
        padding: "1rem",
        background: "var(--bg-accent)",
        borderRadius: "0.5rem",
        border: "1px solid var(--border)",
        flex: 1,
      }}>
        <strong>Card A</strong>
      </div>
      <div style={{
        padding: "1rem",
        background: "var(--bg-accent)",
        borderRadius: "0.5rem",
        border: "1px solid var(--border)",
        flex: 1,
      }}>
        <strong>Card B</strong>
      </div>
      <div style={{
        padding: "1rem",
        background: "var(--bg-accent)",
        borderRadius: "0.5rem",
        border: "1px solid var(--border)",
        flex: 1,
      }}>
        <strong>Card C</strong>
      </div>
    </div>
  );
}`;

const challengeDemoAnswer = `function App() {
  return (
    <div style={{
      display: "flex",
      gap: "1rem",
      padding: "1.5rem",
      fontFamily: "system-ui, sans-serif",
      color: "var(--text)",
    }}>
      <div style={{
        padding: "1rem",
        background: "var(--bg-accent)",
        borderRadius: "0.5rem",
        border: "1px solid var(--border)",
        flex: 1,
      }}>
        <strong>Card A</strong>
      </div>
      <div style={{
        padding: "1rem",
        background: "var(--bg-accent)",
        borderRadius: "0.5rem",
        border: "1px solid var(--border)",
        flex: 1,
      }}>
        <strong>Card B</strong>
      </div>
      <div style={{
        padding: "1rem",
        background: "var(--bg-accent)",
        borderRadius: "0.5rem",
        border: "1px solid var(--border)",
        flex: 1,
      }}>
        <strong>Card C</strong>
      </div>
    </div>
  );
}`;

/* ── メイン ── */
export default function Landing() {
  const totalPages = pages.length;

  return (
    <div className="min-h-screen bg-background">
      {/* ═══ Hero — ミニマル ═══ */}
      <section className="mesh-gradient text-white relative">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <p className="text-sm font-mono tracking-[0.2em] uppercase text-zinc-400 mb-8">
            Dev Album
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 leading-[1.1] tracking-tight">
            Web 開発の
            <br />
            実践リファレンス
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl leading-relaxed mb-10">
            Git・React・Claude Code・Three.js。 4 領域を Web
            標準とアクセシビリティの視点で解説。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/react"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-white text-zinc-900 font-semibold text-sm hover:bg-zinc-100 transition-colors"
            >
              学習をはじめる
              <ArrowRight size={16} />
            </Link>
            <a
              href="#manuals"
              className="inline-flex items-center gap-2 px-6 py-3 rounded border border-zinc-700 text-zinc-300 font-medium text-sm hover:border-zinc-500 hover:text-white transition-colors"
            >
              マニュアル一覧
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Numbers ═══ */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-wrap gap-12 md:gap-20">
          <div>
            <p className="text-3xl font-heading font-bold text-foreground">
              {totalPages}
            </p>
            <p className="text-sm text-muted-foreground mt-1">ステップ</p>
          </div>
          <div>
            <p className="text-3xl font-heading font-bold text-foreground">
              {manuals.length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">マニュアル</p>
          </div>
          <div>
            <p className="text-3xl font-heading font-bold text-foreground">
              {sections.filter((s) => s.manualId).length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">セクション</p>
          </div>
        </div>
      </section>

      {/* ═══ Manual Cards ═══ */}
      <section id="manuals" className="scroll-mt-8">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <p className="text-xs font-mono tracking-[0.15em] uppercase text-muted-foreground mb-2">
            Manuals
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">
            4 つのマニュアル
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {manuals.map((m, i) => {
              const pageCount = getManualPages(m.id).length;
              const details = manualDetails[m.id];
              return (
                <Link
                  key={m.id}
                  href={`/${m.id}`}
                  className="group bg-card rounded border border-border hover:border-primary/50 transition-colors p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center flex-shrink-0 text-foreground font-mono text-sm font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {m.shortTitle}
                        </h3>
                        <ArrowRight
                          size={16}
                          className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {pageCount} ステップ
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {details.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {details.topics.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground"
                      >
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

      {/* ═══ Live Editor Demo ═══ */}
      <section className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <p className="text-xs font-mono tracking-[0.15em] uppercase text-muted-foreground mb-2">
            Features
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            コードを書きながら学べる
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl leading-relaxed">
            ブラウザ上でコードを編集し即座にプレビュー。環境構築なしで実験できます。
          </p>
          <CodePreview
            code={liveEditorDemoCode}
            language="tsx"
            title="Hello World"
            previewHeight={200}
          />
        </div>
      </section>

      {/* ═══ Challenge Demo ═══ */}
      <section className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <p className="text-xs font-mono tracking-[0.15em] uppercase text-muted-foreground mb-2">
            Try It
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            体験してみる
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl leading-relaxed">
            空欄を埋めてカードを横並びにしてください。
          </p>
          <CodingChallenge
            title="display を埋めてカードを横並びにする"
            description={`display: "___" を埋めて、3 つのカードを横並びにしてください。`}
            initialCode={challengeDemoCode}
            answer={challengeDemoAnswer}
            keywords={["flex"]}
            hints={[
              "CSS の Flexbox を使います。display に指定する値を考えてみましょう。",
              '答えは "flex" です。display: "flex" と書くと子要素が横並びになります。',
            ]}
            preview
          />
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 text-center">
          <Link
            href="/react"
            className="inline-flex items-center gap-2 px-8 py-3 rounded bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            React マニュアルからはじめる
            <ArrowRight size={16} />
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            アカウント不要・無料・すぐに始められます
          </p>
        </div>
      </section>
    </div>
  );
}
