import { ArrowRight, Zap, Users, CheckCircle2, Eye, Box, Lightbulb, Layers, Palette, Rocket, Keyboard, Search, Monitor, Code, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIsMac, modKey, navModKey } from "@/lib/keyLabels";
import { Link } from "wouter";

export default function Home() {
  const isMac = getIsMac();

  const shortcuts = [
    { keys: `${modKey(isMac)}+K`, description: "ページ検索" },
    { keys: `${navModKey(isMac)}+↓`, description: "次のページへ移動" },
    { keys: `${navModKey(isMac)}+↑`, description: "前のページへ移動" },
    { keys: `Shift+${navModKey(isMac)}+↓`, description: "次のセクションへ移動" },
    { keys: `Shift+${navModKey(isMac)}+↑`, description: "前のセクションへ移動" },
  ];
  const learningPath = [
    {
      number: 1,
      title: "基礎編",
      description: "シーン・カメラ・ジオメトリ・マテリアル・ライト・アニメーション",
      duration: "2時間",
      icon: <Box className="w-8 h-8 text-primary" />,
    },
    {
      number: 2,
      title: "応用編",
      description: "テクスチャ・3Dモデル・インタラクション・OrbitControls",
      duration: "1時間50分",
      icon: <Layers className="w-8 h-8 text-secondary" />,
    },
    {
      number: 3,
      title: "実践編",
      description: "React Three Fiber・drei・ポートフォリオシーン作成",
      duration: "1時間30分",
      icon: <Rocket className="w-8 h-8 text-accent" />,
    },
  ];

  const benefits = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "インタラクティブ 3D プレビュー",
      description: "コードの結果をリアルタイムで3D確認できます",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "初心者向け",
      description: "プログラミング未経験でも理解できる丁寧な説明",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "パラメータ操作",
      description: "スライダーで値を変えて3Dへの影響を直感的に理解",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "段階的な学習",
      description: "基礎から実践まで、ステップバイステップで進行",
    },
  ];

  const whyThreeJs = [
    {
      icon: <Lightbulb className="w-6 h-6 text-primary" />,
      title: "Web でそのまま動く 3D",
      body: "Three.js はブラウザ上で動作する 3D ライブラリです。プラグインやアプリのインストールなしで、誰でもすぐに 3D コンテンツを体験できます。",
    },
    {
      icon: <Palette className="w-6 h-6 text-orange-500" />,
      title: "表現の幅が一気に広がる",
      body: "ポートフォリオサイト、製品ビジュアライザー、データの3D可視化、インタラクティブアート。2Dでは伝えきれない情報を立体的に表現できます。",
    },
    {
      icon: <Rocket className="w-6 h-6 text-blue-500" />,
      title: "React との相性抜群",
      body: "React Three Fiber を使えば、React のコンポーネントとして 3D シーンを組み立てられます。既存の React プロジェクトにもスムーズに統合可能です。",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-primary font-medium text-sm">
                はじめての 3D グラフィックス
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-mono font-medium border border-border">
              v1.0.0
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-sans font-bold text-foreground mb-6 leading-tight">
            Three.js
            <span className="block text-primary">入門マニュアル</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            プログラミング初心者でも、インタラクティブなプレビューで確認しながら
            Three.js を基礎から習得できます。最終的には React Three Fiber で
            ポートフォリオ用の 3D シーンを作れるようになります。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/threejs/basics/scene">
                学習を始める
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>

          <div className="inline-block bg-card border border-border rounded-lg px-6 py-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">総学習時間：</span>
              約 5 時間 20 分
            </p>
          </div>
        </div>
      </section>

      {/* このガイドの使い方 */}
      <section className="py-16 px-4 md:px-8 bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-sans font-bold text-center text-foreground mb-12">
            このガイドの使い方
          </h2>

          {/* コーディングチャレンジ（フル幅カード） */}
          <div className="bg-background border border-border rounded-xl p-6 md:p-8 hover:shadow-md transition-shadow mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                コーディングチャレンジ（インタラクティブエディタ）の使い方
              </h3>
            </div>

            <div className="space-y-4 text-sm text-muted-foreground">
              <p className="leading-relaxed">
                各ページの末尾にインタラクティブなコードエディタがあります。
                <span className="font-medium text-foreground">左側がコード入力エリア</span>、
                <span className="font-medium text-foreground">右側が Three.js 3D プレビュー</span>です。
                コードは直接編集でき、変更すると 3D プレビューが自動的に更新されます（400ms のデバウンス付き）。
              </p>

              <div>
                <p className="font-medium text-foreground mb-3">ボタンの説明</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center justify-center shrink-0 h-8 w-8 rounded-md bg-green-600 text-white">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">チェック</p>
                      <p className="text-xs mt-0.5">コードを採点します。キーワードベースの緩い判定なので、完全一致は不要です。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center justify-center shrink-0 h-8 w-8 rounded-md border border-amber-500 text-amber-500">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">ヒント</p>
                      <p className="text-xs mt-0.5">段階的にヒントを表示します。「次のヒント」ボタンで順番に確認できます。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center justify-center shrink-0 h-8 w-8 rounded-md border border-border text-foreground">
                      <Eye className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">模範解答</p>
                      <p className="text-xs mt-0.5">模範解答コードの表示 / 非表示を切り替えます。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center justify-center shrink-0 h-8 w-8 rounded-md border border-border text-foreground">
                      <RotateCcw className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">リセット</p>
                      <p className="text-xs mt-0.5">コード・採点結果・ヒントをすべて初期状態に戻します。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-2">
                <Keyboard className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <span className="font-medium">エディタ内ショートカット:</span>{" "}
                  <kbd className="px-1 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 font-mono text-[11px]">Tab</kbd>{" "}
                  でインデント挿入。コードは横スクロール対応。
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* キーボードショートカット */}
            <div className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                  <Keyboard className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  キーボードショートカット
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <kbd className="shrink-0 px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">
                    {navModKey(isMac)}+←→
                  </kbd>
                  <span>前後のページに移動</span>
                </li>
                <li className="flex items-start gap-2">
                  <kbd className="shrink-0 px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">
                    Shift+{navModKey(isMac)}+←→
                  </kbd>
                  <span>前後のセクションに移動</span>
                </li>
                <li className="flex items-start gap-2">
                  <kbd className="shrink-0 px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">
                    {modKey(isMac)}+K
                  </kbd>
                  <span>検索にフォーカス</span>
                </li>
                <li className="flex items-start gap-2">
                  <kbd className="shrink-0 px-1.5 py-0.5 rounded bg-muted border border-border text-xs font-mono text-foreground">
                    Home
                  </kbd>
                  <span>ページトップにスクロール</span>
                </li>
              </ul>
            </div>

            {/* キーワード検索 */}
            <div className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary/10 text-secondary">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  キーワード検索
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>サイドバーの検索欄にキーワードを入力</li>
                <li>ページタイトルだけでなく、H2見出しのキーワードでも検索可能</li>
                <li>
                  検索結果の
                  <span className="font-mono text-foreground">#</span>
                  付きサブアイテムをクリックで該当箇所にスクロール＆ハイライト
                </li>
              </ul>
            </div>

            {/* 画面設定 */}
            <div className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10 text-accent-foreground">
                  <Monitor className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  画面設定
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                ダークモード / ライトモードの切替に対応しています。ヘッダーのテーマ切替ボタンからお好みの表示に変更できます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* なぜ Three.js を学ぶのか */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/5 dark:to-primary/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
              なぜ Three.js を学ぶのか
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Web の表現力を一段上に引き上げる 3D グラフィックス。
              その入り口として最も人気のあるライブラリが Three.js です。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyThreeJs.map((card) => (
              <div
                key={card.title}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="font-semibold text-foreground mb-3 text-base">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 学習フロー */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-sans font-bold text-center text-foreground mb-12">
            学習フロー
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPath.map((step) => (
              <div key={step.number} className="relative group">
                <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-sans font-bold text-lg">
                        {step.number}
                      </span>
                    </div>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {step.description}
                  </p>
                  <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-xs font-medium">
                    {step.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 特徴 */}
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

      {/* キーボードショートカット */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Keyboard className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-sans font-bold text-foreground">
              キーボードショートカット
            </h2>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-6 py-3 font-semibold text-foreground">
                    キー
                  </th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">
                    動作
                  </th>
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
                    <td className="px-6 py-3 text-muted-foreground">
                      {s.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
            準備はいいですか？
          </h2>
          <p className="text-muted-foreground mb-8">
            まずは 3D シーンの基本から始めましょう。
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/threejs/basics/scene">
              今すぐ始める
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
