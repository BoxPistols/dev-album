import { ArrowRight, CheckCircle2, Zap, Users, BookOpen, Keyboard, BrainCircuit, Rocket, Globe, Search, Settings, Code2, Terminal, Eye, Lightbulb, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOS } from '@/contexts/OSContext';
import { modKey, navModKey } from '@/lib/keyLabels';
import { useLocation } from 'wouter';

/**
 * ホームページ - ランディング
 */

export default function Home() {
  const [, navigate] = useLocation();
  const { selectedOS } = useOS();
  const isMac = selectedOS === 'mac';

  const learningPath = [
    {
      number: 1,
      title: '環境準備',
      description: 'Cursor、Git、Node.js をインストール',
      duration: '30分',
      icon: '⚙️',
    },
    {
      number: 2,
      title: 'GitHub 基礎',
      description: 'アカウント作成と初期設定',
      duration: '20分',
      icon: '🔐',
    },
    {
      number: 3,
      title: 'Git ワークフロー',
      description: 'Commit、Push、Pull を実践',
      duration: '40分',
      icon: '🔄',
    },
    {
      number: 4,
      title: 'React 実践',
      description: 'コンポーネント作成と Git 管理',
      duration: '45分',
      icon: '⚛️',
    },
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: '実践的な学習',
      description: '実際に手を動かしながら学べます',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: '初心者向け',
      description: 'コーディング未経験者を想定した説明',
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: '達成感',
      description: '各ステップで成功体験を得られます',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'わかりやすい',
      description: 'スクリーンショット付きの詳細ガイド',
    },
  ];

  const aiContextCards = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-primary" aria-hidden="true" />,
      title: 'AI が書いたコードの置き場所',
      body: 'AI にコードを生成してもらっても、それをどこに保存して誰と共有するかは別の話です。Git はファイルの変更履歴を記録する仕組みで、「変更履歴付きのフォルダ」と考えるとイメージしやすいです。',
    },
    {
      icon: <Rocket className="w-6 h-6 text-orange-500" aria-hidden="true" />,
      title: 'AI ツールとの連携',
      body: 'Cursor や GitHub Copilot など、多くの AI コーディングツールは GitHub と連携して動きます。エンジニアとコードを共有するときも、GitHub リポジトリを介することがほとんどです。',
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-500" aria-hidden="true" />,
      title: '公開されているコードの読み方',
      body: 'AI ツールやデザインシステムの多くは GitHub 上でコードが公開されています。使い方のサンプルやバグ修正の履歴を直接確認したいときに、読み方を知っていると役立ちます。',
    },
  ];

  const shortcuts = [
    { keys: `${modKey(isMac)}+K`, description: 'ページ検索' },
    { keys: `${navModKey(isMac)}+↓`, description: '次のページへ移動' },
    { keys: `${navModKey(isMac)}+↑`, description: '前のページへ移動' },
    { keys: `Shift+${navModKey(isMac)}+↓`, description: '次のセクションへ移動' },
    { keys: `Shift+${navModKey(isMac)}+↑`, description: '前のセクションへ移動' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            <div className="inline-block px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
              <span className="text-secondary font-medium text-sm">はじめての開発入門</span>
            </div>
            <div className="inline-block px-3 py-1.5 rounded-full bg-muted border border-border">
              <span className="text-muted-foreground font-mono text-xs">v1.1.0</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-sans font-bold text-foreground mb-6 leading-tight">
            GitHub & React
            <span className="block text-primary">環境構築</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            コーディング未経験でも、ステップバイステップで GitHub と React を習得できます。実践的な開発体験を通じて、自信を持って開発に参加できるようになります。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => navigate('/git/environment/prerequisites')}
            >
              学習を始める
              <ArrowRight size={20} />
            </Button>
          </div>

          {/* Learning Duration */}
          <div className="inline-block bg-card border border-border rounded-lg px-6 py-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">総学習時間：</span> 約 2 時間 45 分
            </p>
          </div>
        </div>
      </section>

      {/* このガイドの使い方 Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-sky-50/50 to-cyan-50/50 dark:from-sky-950/20 dark:to-cyan-950/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/40 border border-sky-200 dark:border-sky-700">
              <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              <span className="text-sky-700 dark:text-sky-300 font-medium text-sm">ガイド</span>
            </div>
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
              このガイドの使い方
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              学習をスムーズに進めるための機能を紹介します。
            </p>
          </div>

          {/* コーディングチャレンジ（インタラクティブエディタ）の使い方 — 全幅カード */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 hover:shadow-md transition-shadow mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground text-lg">コーディングチャレンジ（インタラクティブエディタ）の使い方</h3>
            </div>

            {/* エディタ画面の構成 */}
            <div className="mb-6">
              <h4 className="font-semibold text-foreground text-sm mb-3">エディタ画面の構成</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                エディタは左右に分割されています。<span className="font-medium text-foreground">左側</span>がコード入力エリア、<span className="font-medium text-foreground">右側</span>がプレビューエリアです。左側にコードを入力すると、右側にリアルタイムで結果が反映されます。
              </p>
            </div>

            {/* プレビューの種類 */}
            <div className="mb-6">
              <h4 className="font-semibold text-foreground text-sm mb-3">プレビューの種類</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Terminal className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Git コマンドシミュレーター</span>
                    <span className="mx-1">—</span>
                    <span>Git コマンドを入力すると、仮想ファイルシステム上でリアルな実行結果がターミナル風に表示されます。実際の環境を使わずにコマンドの動きを確認できます。</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Code2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Markdown プレビュー</span>
                    <span className="mx-1">—</span>
                    <span>Markdown 記法で入力した内容が、即座に HTML に変換されてプレビュー表示されます。</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Terminal className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">ターミナルプレビュー</span>
                    <span className="mx-1">—</span>
                    <span>入力したコマンドがシンタックスハイライト付きで表示されます。</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* ボタンの説明 */}
            <div className="mb-6">
              <h4 className="font-semibold text-foreground text-sm mb-3">ボタンの説明</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-green-600 text-white shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground text-sm">チェック</span>
                    <p className="text-xs text-muted-foreground mt-0.5">コードを採点します。キーワードベースの緩い判定なので、完全一致でなくても正解になります。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md border border-amber-400 text-amber-500 shrink-0">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground text-sm">ヒント</span>
                    <p className="text-xs text-muted-foreground mt-0.5">押すたびに段階的にヒントが表示されます。いきなり答えを見ずに、少しずつ手がかりを得られます。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md border border-border text-muted-foreground shrink-0">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground text-sm">模範解答</span>
                    <p className="text-xs text-muted-foreground mt-0.5">模範解答のコードを表示・非表示できます。自分の回答と見比べて学習できます。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md border border-border text-muted-foreground shrink-0">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground text-sm">リセット</span>
                    <p className="text-xs text-muted-foreground mt-0.5">エディタを初期状態に戻します。最初からやり直したいときに使います。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* インフォボックス */}
            <div className="flex items-start gap-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4">
              <Keyboard className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <span className="font-medium">エディタ内ショートカット:</span> Tab でインデント挿入。コードは横スクロール対応。
              </p>
            </div>
          </div>

          {/* 3列グリッド: ショートカット・検索・画面設定 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* キーボードショートカット */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400">
                  <Keyboard className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground text-base">キーボードショートカット</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <kbd className="inline-flex items-center px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono shrink-0">←</kbd>
                  <kbd className="inline-flex items-center px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono shrink-0">→</kbd>
                  <span>前後のページに移動</span>
                </li>
                <li className="flex items-start gap-2">
                  <kbd className="inline-flex items-center px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono shrink-0">Shift+←</kbd>
                  <kbd className="inline-flex items-center px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono shrink-0">Shift+→</kbd>
                  <span>前後のセクションに移動</span>
                </li>
                <li className="flex items-start gap-2">
                  <kbd className="inline-flex items-center px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono shrink-0">{modKey(isMac)}+K</kbd>
                  <span>検索にフォーカス</span>
                </li>
                <li className="flex items-start gap-2">
                  <kbd className="inline-flex items-center px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono shrink-0">Home</kbd>
                  <span>ページトップにスクロール</span>
                </li>
              </ul>
            </div>

            {/* キーワード検索 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground text-base">キーワード検索</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 shrink-0">•</span>
                  <span>サイドバーの検索欄にキーワードを入力</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 shrink-0">•</span>
                  <span>ページタイトルだけでなく、H2 見出しのキーワードでも検索可能</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 shrink-0">•</span>
                  <span>検索結果の「#」付きサブアイテムをクリックで該当箇所にスクロール＆ハイライト</span>
                </li>
              </ul>
            </div>

            {/* 画面設定 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
                  <Settings className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground text-base">画面設定</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 shrink-0">•</span>
                  <span>ダークモード / ライトモード切替</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 shrink-0">•</span>
                  <span>OS 切替（Mac / Windows）でショートカットキーや手順が自動で変わります</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Context Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/5 dark:to-primary/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <BrainCircuit className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="text-primary font-medium text-sm">このガイドについて</span>
            </div>
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
              なぜこれを学ぶのか
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Git と GitHub はもともとエンジニア向けのツールですが、AI がコードを補助するようになったことで、非エンジニアが触れる場面も増えています。このガイドでは、実際に必要な操作だけをカバーします。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiContextCards.map((card) => (
              <div key={card.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">{card.icon}</div>
                <h3 className="font-semibold text-foreground mb-3 text-base">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          {/* Real-world scenario */}
          <div className="mt-10 bg-card border border-border rounded-xl p-8">
            <h3 className="font-bold text-foreground mb-6 text-lg">どんな場面で使うか</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">🎨</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">デザイナーの場合</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Figma でデザインしたものを AI に実装してもらい、GitHub でエンジニアに渡す。コードの中身より、ファイルをどこに置いてどう共有するかを知っていれば対応できます。
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">💼</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">企画・マーケターの場合</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    LP や社内ツールを AI に作らせて GitHub Pages で公開する。エンジニアに依頼しなくても、基本的な操作さえ覚えれば自分でできます。
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">🚀</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">副業・個人開発の場合</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    AI でプロトタイプを作り、GitHub でバージョン管理しながら改善していく。変更の履歴が残るため、どの時点にも戻せます。
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">🤝</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">エンジニアと一緒に作業する場合</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    「PR を送って」「main にマージして」といったやり取りの意味がわかるようになります。指示を出す側でも受ける側でも、同じ用語で話せると作業がスムーズになります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-sans font-bold text-center text-foreground mb-12">学習フロー</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPath.map((step, index) => (
              <div
                key={step.number}
                className="relative group"
              >
                {/* Connector Line */}
                {index % 2 === 0 && index < learningPath.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 w-6 h-0.5 bg-primary/30" />
                )}

                {/* Card */}
                <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  {/* Step Number */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-sans font-bold text-lg">
                        {step.number}
                      </span>
                    </div>
                    <span className="text-3xl">{step.icon}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {step.description}
                  </p>

                  {/* Duration Badge */}
                  <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                    {step.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 md:px-8 bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-sans font-bold text-center text-foreground mb-12">
            このガイドの特徴
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                    {benefit.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Keyboard className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-sans font-bold text-foreground">キーボードショートカット</h2>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-6 py-3 font-semibold text-foreground">キー</th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">動作</th>
                </tr>
              </thead>
              <tbody>
                {shortcuts.map((s, i) => (
                  <tr key={i} className="border-b border-border last:border-b-0">
                    <td className="px-6 py-3">
                      <kbd className="inline-flex items-center px-2 py-1 rounded bg-muted border border-border text-xs font-mono font-medium text-foreground">
                        {s.keys}
                      </kbd>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">{s.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
            準備はいいですか？
          </h2>
          <p className="text-muted-foreground mb-8">
            ガイドに沿って手を動かしながら進めていきましょう。
          </p>
          <Button
            size="lg"
            className="gap-2"
            onClick={() => navigate('/git/environment/prerequisites')}
          >
            今すぐ始める
            <ArrowRight size={20} />
          </Button>
        </div>
      </section>
    </div>
  );
}
