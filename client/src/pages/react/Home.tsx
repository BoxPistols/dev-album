import { BookOpen, Code2, Layers, Palette, Rocket, Server, Layout, Sparkles, Zap, ArrowRight, Keyboard, Search, Settings, Eye, Copy, Maximize2, RotateCcw, GripVertical, CheckCircle2, Lightbulb } from 'lucide-react';
import { Link } from 'wouter';
import PageNavigation from '@/components/PageNavigation';

const curriculumPart1 = [
  {
    icon: <BookOpen size={20} />,
    title: 'はじめに',
    steps: 'STEP 1-2',
    description: 'マニュアルの概要と開発環境の構築',
    color: 'bg-blue-500',
  },
  {
    icon: <Code2 size={20} />,
    title: 'React の基本',
    steps: 'STEP 3-7',
    description: 'JSX、コンポーネント、Props、TypeScript',
    color: 'bg-blue-600',
  },
  {
    icon: <Sparkles size={20} />,
    title: '状態管理とイベント',
    steps: 'STEP 8-11',
    description: 'useState、イベント処理、フォーム',
    color: 'bg-indigo-500',
  },
  {
    icon: <Layers size={20} />,
    title: 'Hooks 深掘り',
    steps: 'STEP 12-16',
    description: 'useEffect、useContext、カスタム Hooks',
    color: 'bg-indigo-600',
  },
  {
    icon: <Palette size={20} />,
    title: 'CSS スタイリング',
    steps: 'STEP 17-21',
    description: 'CSS Modules、styled-components、Emotion',
    color: 'bg-violet-500',
  },
  {
    icon: <Palette size={20} />,
    title: 'Tailwind CSS',
    steps: 'STEP 22-24',
    description: 'ユーティリティCSS、shadcn/ui',
    color: 'bg-violet-600',
  },
  {
    icon: <Layout size={20} />,
    title: 'MUI (Material UI)',
    steps: 'STEP 25-27',
    description: 'MUI 7 の導入・活用・カスタマイズ',
    color: 'bg-purple-500',
  },
  {
    icon: <Rocket size={20} />,
    title: '実践アプリ制作',
    steps: 'STEP 28-30',
    description: 'API 連携、ルーティング、ポートフォリオ',
    color: 'bg-purple-600',
  },
];

const curriculumPart2 = [
  {
    icon: <Server size={20} />,
    title: 'Next.js 基礎',
    steps: 'STEP 31-34',
    description: 'プロジェクト作成、ルーティング、レイアウト',
    color: 'bg-emerald-500',
  },
  {
    icon: <Server size={20} />,
    title: 'Server / Client',
    steps: 'STEP 35-38',
    description: 'RSC、データフェッチング、Loading UI',
    color: 'bg-emerald-600',
  },
  {
    icon: <Code2 size={20} />,
    title: 'Next.js 実践',
    steps: 'STEP 39-42',
    description: 'Server Actions、ミドルウェア、最適化',
    color: 'bg-teal-500',
  },
  {
    icon: <Palette size={20} />,
    title: 'Next.js + CSS',
    steps: 'STEP 43-44',
    description: 'Tailwind / MUI / CSS Modules 統合',
    color: 'bg-teal-600',
  },
  {
    icon: <Rocket size={20} />,
    title: 'デプロイと総まとめ',
    steps: 'STEP 45-46',
    description: 'Vercel デプロイ、学習の次のステップ',
    color: 'bg-cyan-600',
  },
];

const curriculumPart3 = [
  {
    icon: <Layers size={20} />,
    title: 'Storybook',
    steps: 'STEP 47-52',
    description: '導入・構造・CSS・Figma連携・応用',
    color: 'bg-pink-500',
  },
];

const curriculumPart4 = [
  {
    icon: <Zap size={20} />,
    title: 'アーキテクチャ',
    steps: 'STEP 53-55',
    description: '設計・デザインシステム・保守運用',
    color: 'bg-emerald-600',
  },
];

const techTopics = [
  { name: 'React 19', color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
  { name: 'TypeScript', color: 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800' },
  { name: 'CSS Modules', color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
  { name: 'styled-components', color: 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800' },
  { name: 'Emotion', color: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
  { name: 'Tailwind CSS', color: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800' },
  { name: 'shadcn/ui', color: 'bg-slate-100 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700' },
  { name: 'MUI 7', color: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
  { name: 'Next.js 15', color: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800' },
  { name: 'Storybook', color: 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800' },
  { name: 'Vite', color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
];

function FloatingReactIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <g stroke="currentColor" strokeWidth="1.5" opacity="0.3">
        <ellipse rx="24" ry="9" cx="32" cy="32" />
        <ellipse rx="24" ry="9" cx="32" cy="32" transform="rotate(60 32 32)" />
        <ellipse rx="24" ry="9" cx="32" cy="32" transform="rotate(120 32 32)" />
      </g>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background grain page-enter">
      {/* Hero */}
      <div className="relative overflow-hidden mesh-gradient">
        {/* フローティング要素 */}
        <FloatingReactIcon className="absolute top-12 right-[15%] w-24 h-24 text-white/20 float-slow hidden md:block" />
        <FloatingReactIcon className="absolute bottom-16 left-[10%] w-16 h-16 text-cyan-300/20 float-reverse hidden md:block" />
        <FloatingReactIcon className="absolute top-1/2 right-[8%] w-12 h-12 text-emerald-300/15 float-slow hidden lg:block" />

        {/* グリッドオーバーレイ */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />

        <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 md:py-28 relative z-10">
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              全55ステップ
            </span>
            <span className="text-xs font-semibold text-cyan-200/90 bg-cyan-400/10 backdrop-blur-sm px-3 py-1 rounded-full border border-cyan-300/10">
              React + Next.js + Storybook
            </span>
            <span className="text-xs font-mono text-white/50">
              v2.1.0
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1]" style={{ letterSpacing: '-0.035em' }}>
            React 完全入門
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-emerald-300">
              マニュアル
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/90 mb-10 leading-relaxed max-w-2xl">
            環境構築から CSS スタイリング、Next.js、Storybook、デザインシステムまで。
            手を動かしながら、モダンフロントエンド開発の全体像を一歩ずつ学んでいきましょう。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/react/intro/setup"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg shadow-black/10"
            >
              <Rocket size={18} />
              学習をはじめる
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#curriculum"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/15"
            >
              <BookOpen size={18} />
              カリキュラムを見る
            </a>
          </div>
        </div>
      </div>

      {/* このガイドの使い方 */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-16 pb-8">
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 section-accent">このガイドの使い方</h2>

          {/* ライブエディタの使い方（フル幅） */}
          <div className="rounded-xl border border-border bg-card p-6 card-hover mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                <Code2 size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground">ライブエディタの使い方</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              各ページのコードブロックは<strong className="text-foreground">直接編集可能</strong>です。コードを変更すると右側のプレビューがリアルタイムで更新されます。
            </p>

            {/* ツールバー再現 */}
            <div className="rounded-lg border border-[#313244] bg-[#181825] px-4 py-2.5 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f38ba8]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f9e2af]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1]" />
                </div>
                <span className="text-xs text-[#cdd6f4]/50 ml-1">タイトル</span>
                <span className="text-[10px] font-mono text-[#cdd6f4]/30 uppercase">tsx</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#cdd6f4]/40">
                <Code2 size={14} />
                <Eye size={14} />
                <Copy size={14} />
                <Maximize2 size={14} />
              </div>
            </div>

            {/* ボタン説明 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm mb-4">
              <div className="flex items-start gap-2.5">
                <Code2 size={15} className="text-blue-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground"><strong className="text-foreground">&lt;/&gt; コード</strong> — コードのみ表示に切替</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Eye size={15} className="text-blue-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground"><strong className="text-foreground">プレビュー</strong> — プレビューのみ表示に切替</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Copy size={15} className="text-blue-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground"><strong className="text-foreground">コピー</strong> — コードをクリップボードにコピー</span>
              </div>
              <div className="flex items-start gap-2.5">
                <RotateCcw size={15} className="text-amber-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground"><strong className="text-foreground">リセット</strong> — コード変更時に表示、元に戻す</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Maximize2 size={15} className="text-blue-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground"><strong className="text-foreground">拡大/縮小</strong> — エディタの表示サイズを切替</span>
              </div>
              <div className="flex items-start gap-2.5">
                <GripVertical size={15} className="text-blue-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground"><strong className="text-foreground">ドラッグハンドル</strong> — コード/プレビューの幅を調整</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>エディタ内ショートカット:</strong>{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-xs font-mono border border-blue-300 dark:border-blue-700">Tab</kbd> でインデント挿入、
                コードは横スクロールに対応しています。
              </p>
            </div>
          </div>

          {/* コーディングチャレンジの使い方（フル幅） */}
          <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/10 p-6 card-hover mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground">コーディングチャレンジの使い方</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              各ページ下部にある<strong className="text-foreground">緑色のエリア</strong>がコーディングチャレンジです。お題に沿ってコードを書き、採点やヒントを活用しながら学習を進められます。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <div className="px-2 py-0.5 rounded bg-emerald-600 text-white text-xs font-medium shrink-0 mt-0.5">チェック</div>
                <span className="text-muted-foreground">コードを採点します。キーワードベースの緩い判定で、完全一致でなくても正解になります</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-xs font-medium shrink-0 mt-0.5">
                  <Lightbulb size={10} />ヒント
                </div>
                <span className="text-muted-foreground">段階的にヒントを表示。複数のヒントがある場合は「次のヒント」で順番に表示されます</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded border border-border text-muted-foreground text-xs font-medium shrink-0 mt-0.5">
                  <Eye size={10} />模範解答
                </div>
                <span className="text-muted-foreground">模範解答のコードを表示/非表示できます。自分のコードと見比べて学習しましょう</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded text-muted-foreground text-xs font-medium shrink-0 mt-0.5">
                  <RotateCcw size={10} />リセット
                </div>
                <span className="text-muted-foreground">コードを初期状態に戻します。採点結果やヒント表示もリセットされます</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* キーボードショートカット */}
            <div className="rounded-xl border border-border bg-card p-6 card-hover">
              <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center mb-4">
                <Keyboard size={20} className="text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-3">ページナビゲーション</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono border border-border shrink-0">&larr;</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono border border-border shrink-0">&rarr;</kbd>
                  <span>前後のページ</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono border border-border shrink-0">Shift+&larr;&rarr;</kbd>
                  <span>前後のセクション</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono border border-border shrink-0">Cmd/Ctrl+K</kbd>
                  <span>検索にフォーカス</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono border border-border shrink-0">Home</kbd>
                  <span>ページトップ</span>
                </div>
              </div>
            </div>

            {/* キーワード検索 */}
            <div className="rounded-xl border border-border bg-card p-6 card-hover">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center mb-4">
                <Search size={20} className="text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-3">キーワード検索</h3>
              <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <li>サイドバーの検索欄にキーワードを入力</li>
                <li>ページタイトル + H2 見出しで検索可能</li>
                <li><span className="font-mono text-foreground">#</span> 付きサブアイテムクリックで該当箇所にスクロール＆ハイライト</li>
              </ul>
            </div>

            {/* 画面設定 */}
            <div className="rounded-xl border border-border bg-card p-6 card-hover">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-4">
                <Settings size={20} className="text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-3">画面設定</h3>
              <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <li>ダークモード / ライトモード切替</li>
                <li>ワイドモード / 通常モード切替</li>
                <li>サイドバー上部のアイコンから変更</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        {/* 対象読者 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8">このマニュアルについて</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-6 card-hover">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-4">
                <Palette size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">こんな方に</h3>
              <ul className="text-sm text-muted-foreground space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">-</span>
                  HTML/CSS の基礎知識がある方
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">-</span>
                  React を基礎から体系的に学びたい方
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">-</span>
                  JavaScript の経験は不問（基礎から解説）
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">-</span>
                  Figma や Adobe XD でデザインを作っている方にも
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 card-hover">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-4">
                <Rocket size={20} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">学べること</h3>
              <ul className="text-sm text-muted-foreground space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-0.5">-</span>
                  React + TypeScript の基礎から実践まで
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-0.5">-</span>
                  5種類以上の CSS スタイリング手法
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-0.5">-</span>
                  shadcn/ui、MUI 7 などのコンポーネントライブラリ
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-0.5">-</span>
                  Next.js + Storybook + デザインシステム
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 技術スタック */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-4">扱う技術スタック</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            モダンなフロントエンド開発で使われる主要な技術を網羅的に学びます。
          </p>
          <div className="flex flex-wrap gap-2">
            {techTopics.map((topic) => (
              <span
                key={topic.name}
                className={`inline-block px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 hover:-translate-y-0.5 ${topic.color}`}
              >
                {topic.name}
              </span>
            ))}
          </div>
        </section>

        {/* カリキュラム */}
        <section id="curriculum" className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-2">カリキュラム</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            全55ステップを4部構成で進めます。
          </p>

          {/* 第1部 */}
          <CurriculumPart
            partLabel="第1部"
            partTitle="React + Vite + TypeScript（STEP 1-30）"
            partColor="bg-primary/10 text-primary"
            items={curriculumPart1}
          />

          {/* 第2部 */}
          <CurriculumPart
            partLabel="第2部"
            partTitle="Next.js（STEP 31-46）"
            partColor="bg-accent/10 text-accent"
            items={curriculumPart2}
          />

          {/* 第3部 */}
          <CurriculumPart
            partLabel="第3部"
            partTitle="Storybook（STEP 47-52）"
            partColor="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
            items={curriculumPart3}
          />

          {/* 第4部 */}
          <CurriculumPart
            partLabel="第4部"
            partTitle="アーキテクチャ（STEP 53-55）"
            partColor="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
            items={curriculumPart4}
          />
        </section>

        {/* 前提知識 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8">前提知識</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="space-y-4">
              <PrereqItem level="ok" title="HTML / CSS の基礎" desc="タグの意味、クラス名、基本的なレイアウトが分かればOK" />
              <PrereqItem level="ok" title="デザインツールの経験（あると良い）" desc="Figma、Adobe XD、Sketchなど。コンポーネントの概念が分かると理解が速い" />
              <PrereqItem level="plus" title="JavaScript（なくても大丈夫）" desc="変数、関数、配列などの基礎。分からなくても各ステップで丁寧に解説します" />
              <PrereqItem level="none" title="プログラミング経験は不要" desc="ターミナル操作から環境構築まで、ゼロから解説します" />
            </div>
          </div>
        </section>

        {/* 学習の進め方 */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">学習の進め方</h2>
          <div className="space-y-4">
            {[
              { num: 1, title: '順番に進める', desc: '各ステップは前のステップの知識を前提としています。STEP 1 から順番に進めてください。' },
              { num: 2, title: '手を動かす', desc: 'コード例は全てコピー可能です。必ず自分の環境で動かし、少しずつ変更を加えてみてください。' },
              { num: 3, title: '視覚的に確認する', desc: 'コードを変更したら必ずブラウザで結果を確認。ライブエディタでその場で動作を試すこともできます。' },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card card-hover">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold text-sm">{item.num}</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <PageNavigation />
      </div>
    </div>
  );
}

function CurriculumPart({ partLabel, partTitle, partColor, items }: {
  partLabel: string;
  partTitle: string;
  partColor: string;
  items: typeof curriculumPart1;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className={`px-3 py-1 text-sm font-bold rounded-full ${partColor}`}>
          {partLabel}
        </div>
        <h3 className="text-xl font-bold text-foreground">{partTitle}</h3>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((section) => (
          <div
            key={section.title}
            className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card card-hover"
          >
            <div className={`w-10 h-10 rounded-xl ${section.color} flex items-center justify-center flex-shrink-0`}>
              <span className="text-white">{section.icon}</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-foreground text-sm">{section.title}</h4>
                <span className="text-xs text-muted-foreground">{section.steps}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{section.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrereqItem({ level, title, desc }: { level: 'ok' | 'plus' | 'none'; title: string; desc: string }) {
  const config = {
    ok: { bg: 'bg-green-100 dark:bg-green-900/40', text: 'text-green-600 dark:text-green-400', label: 'OK' },
    plus: { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-600 dark:text-amber-400', label: '+' },
    none: { bg: 'bg-slate-100 dark:bg-slate-800/40', text: 'text-slate-500 dark:text-slate-400', label: '-' },
  }[level];

  return (
    <div className="flex items-start gap-3">
      <div className={`w-6 h-6 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
        <span className={`${config.text} text-xs font-bold`}>{config.label}</span>
      </div>
      <div>
        <p className="font-medium text-foreground text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
