import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import { useLocation } from 'wouter';

/**
 * 環境準備 - 前提知識
 * デザイン方針: ジャーニーマップ
 * - 学習に必要な基本概念を説明
 * - ターミナルの基本を理解
 * - Mac vs Windows の違いを明確に
 */

export default function Prerequisites() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 1 / 4
          </div>
          <h1 className="text-4xl font-poppins font-bold text-foreground mb-4">
            前提知識を理解しよう
          </h1>
          <p className="text-lg text-muted-foreground">
            GitHub と React を学ぶ前に、必要な基本概念とツールについて理解しましょう。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <WhyNowBox
          title="このページで学ぶこと"
          tags={['Git', 'GitHub', 'ターミナル', '基本概念']}
        >
          <p>
            Git はファイルの変更履歴を記録するツール、GitHub はそれをオンラインに保存・共有する場所、ターミナルはこれらを操作するための画面です。
          </p>
          <p>
            料理に例えると、Git は「どの材料をいつ使ったか」を記録する台帳、GitHub はその台帳をチームで共有する棚のようなものです。AI がコードを書いてくれるとしても、どこに置いてどう管理するかの仕組みは別に必要です。
          </p>
          <p>
            セットアップは最初の一度だけで、以降の操作はほぼ決まった手順の繰り返しになります。
          </p>
        </WhyNowBox>

        {/* What is Git? */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            Git とは何か
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Git は、ファイルの変更履歴を管理するツール（バージョン管理システム）です。「最終版」「最終版_v2」「最終版_v3_本当の最終」のように複数のファイルを作ってしまう状況を、Git では1つのファイルで管理できます。
            </p>
            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <p className="text-sm text-foreground/80">
                <strong>使用例：</strong> AI に変更を加えてもらったがうまくいかなかった場合、特定の時点のコードに戻せます。
              </p>
            </div>

            <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-lg">
              <h3 className="font-semibold text-foreground mb-3">Git の主な機能</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>ファイルの変更履歴を記録・管理</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>複数人での同時作業をサポート</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>過去のバージョンに戻すことが可能</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>変更内容の詳細な比較が可能</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* What is GitHub? */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            GitHub とは何か
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              GitHub は、Git で管理されたプロジェクトをクラウド上に保存・共有するサービスです。Git はローカル（自分のパソコン）でファイル管理をしますが、GitHub はそれをインターネット上に保存することで、複数人での協力や、パソコンが壊れた時のバックアップが可能になります。
            </p>
            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <p className="text-sm text-foreground/80">
                <strong>使用例：</strong> Figma でデザインし、AI がコードを書き、GitHub でエンジニアに渡す。Google Drive にプロジェクトフォルダを置くのに近いイメージです。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">Git（ローカル）</h4>
                <p className="text-sm text-muted-foreground">
                  自分のパソコンでファイルの変更履歴を管理
                </p>
              </div>
              <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">GitHub（クラウド）</h4>
                <p className="text-sm text-muted-foreground">
                  インターネット上にプロジェクトを保存・共有
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terminal Basics */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            ターミナルの基本
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              ターミナル（コマンドラインインターフェース）は、マウスを使わずにキーボードでコンピュータに指示を出すツールです。Git や Node.js などの開発ツールはターミナルから操作することが多いため、基本的な使い方を理解しておくことが重要です。
            </p>
            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <p className="text-sm text-foreground/80">
                <strong>例：</strong> Finder やエクスプローラーをクリックして操作するのが GUI、ターミナルにコマンドを入力して操作するのが CUI です。どちらも同じ操作をしていますが、方法が違います。
              </p>
            </div>

            <InfoBox type="info" title="ターミナルとは">
              ターミナルはテキストベースのインターフェースで、コマンドを入力して実行します。GUI（グラフィカルユーザーインターフェース）とは異なり、キーボードのみで操作します。
            </InfoBox>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">ターミナルを開く方法</h3>

              {/* Mac */}
              <div className="border-l-4 border-primary pl-6 py-4">
                <h4 className="font-semibold text-foreground mb-3">Mac</h4>
                <p className="text-muted-foreground mb-3">
                  以下の方法でターミナルを開くことができます：
                </p>
                <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                  <li>Spotlight 検索（Command + Space）で「Terminal」と入力</li>
                  <li>Finder → アプリケーション → ユーティリティ → ターミナル</li>
                </ol>
              </div>

              {/* Windows */}
              <div className="border-l-4 border-secondary pl-6 py-4">
                <h4 className="font-semibold text-foreground mb-3">Windows</h4>
                <p className="text-muted-foreground mb-3">
                  このガイドでは PowerShell を使用します。以下の方法で開くことができます：
                </p>
                <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                  <li>スタートメニューで「PowerShell」と検索</li>
                  <li>ファイルエクスプローラーで右クリック → 「ここで PowerShell を開く」</li>
                  <li>Windows キー + X → Windows PowerShell</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            必要なツール一覧
          </h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="space-y-4">
              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Cursor</h4>
                  <p className="text-muted-foreground text-sm">
                    AI を搭載したコードエディタ。コーディングをサポートしてくれます。
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Git</h4>
                  <p className="text-muted-foreground text-sm">
                    ファイルの変更履歴を管理するバージョン管理システム。
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Node.js</h4>
                  <p className="text-muted-foreground text-sm">
                    JavaScript をパソコンで実行できるようにするプログラム。React を動かすために必要です。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">GitHub アカウント</h4>
                  <p className="text-muted-foreground text-sm">
                    プロジェクトをクラウド上に保存・共有するためのアカウント。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <InfoBox type="success" title="準備完了">
            基本概念を理解しました。次のステップでは、実際にツールをインストールしていきます。
          </InfoBox>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <div></div>
          <Button className="gap-2" onClick={() => navigate('/git/environment/cursor')}>
              次へ：Cursor をインストール
              
              <ArrowRight size={20} />
            </Button>
        </div>
      </div>
    </div>
  );
}
