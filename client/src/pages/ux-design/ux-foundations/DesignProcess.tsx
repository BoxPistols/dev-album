import { Diamond, ArrowRight, RefreshCw, Repeat, Zap } from 'lucide-react';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function DesignProcess() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            デザインプロセスの全体像
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            ダブルダイヤモンド、アジャイル UX、リーン UX。代表的なプロセスモデルを比較し、使い分けを理解する。
          </p>
        </div>

        {/* WhyNowBox */}
        <WhyNowBox
          title="プロセスを知る意義"
          tags={['全体把握', '判断の軸', 'チーム連携']}
        >
          <p>
            デザインプロセスの全体像を知っていれば、「今チームは何をしているのか」「次に何が必要か」を判断できる。
            開発とデザインのタイミングを合わせるためにも、プロセスの共通言語を持つことが有効。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ダブルダイヤモンドモデル */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Diamond className="text-primary" />
              ダブルダイヤモンドモデル
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              英国 Design Council が提唱したフレームワーク。
              「正しい問題を見つける」前半と「正しい解決策を作る」後半の 2 つのダイヤモンドで構成される。
              各フェーズで発散（選択肢を広げる）と収束（絞り込む）を繰り返す。
            </p>

            {/* ダイヤモンド図 */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 前半ダイヤモンド */}
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4">
                    前半: 正しい問題を見つける
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold" style={{ color: 'var(--background)' }}>1</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Discover（発見）</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          ユーザーの行動観察やインタビューで課題を広く探索する。先入観を排除し、発散的に情報を集める。
                        </p>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                          発散フェーズ
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight size={16} className="text-primary/40 rotate-90" />
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold" style={{ color: 'var(--background)' }}>2</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Define（定義）</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          集めた情報を分析し、解くべき問題を特定する。問題文（Problem Statement）を明確にする。
                        </p>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                          収束フェーズ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 後半ダイヤモンド */}
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4">
                    後半: 正しい解決策を作る
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold" style={{ color: 'var(--background)' }}>3</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Develop（展開）</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          アイデア出し、スケッチ、プロトタイプ作成を通じて解決策の候補を広げる。
                        </p>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                          発散フェーズ
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight size={16} className="text-primary/40 rotate-90" />
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold" style={{ color: 'var(--background)' }}>4</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Deliver（提供）</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          テストとフィードバックを経て解決策を絞り込み、最終的なプロダクトとして仕上げる。
                        </p>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                          収束フェーズ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="発散と収束のリズム">
              <p>
                各ダイヤモンドの前半で選択肢を広げ（発散）、後半で絞り込む（収束）。
                このリズムを意識しないと、アイデア出しの途中で結論を急いだり、逆に収束すべき場面で延々と議論が続くことになる。
              </p>
            </InfoBox>
          </section>

          {/* 各フェーズで使うツール/手法 */}
          <section>
            <h2 className="text-3xl font-bold mb-6">
              フェーズ別のツールと手法
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              各フェーズでよく使われるツール・手法の一覧。全てを使う必要はなく、プロジェクトの規模と制約に応じて選択する。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-3 px-4 font-bold text-foreground" style={{ fontSize: '13px' }}>
                      フェーズ
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground" style={{ fontSize: '13px' }}>
                      主なツール・手法
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground" style={{ fontSize: '13px' }}>
                      アウトプット例
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground" style={{ fontSize: '13px' }}>
                      Discover
                    </td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>
                      ユーザーインタビュー、行動観察、アンケート、競合分析
                    </td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>
                      インタビュー記録、観察ノート
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground" style={{ fontSize: '13px' }}>
                      Define
                    </td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>
                      親和図法、ペルソナ作成、ジャーニーマップ
                    </td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>
                      Problem Statement、ペルソナ
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground" style={{ fontSize: '13px' }}>
                      Develop
                    </td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>
                      ブレインストーミング、スケッチ、ワイヤーフレーム、プロトタイプ
                    </td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>
                      ワイヤーフレーム、Lo-Fi プロトタイプ
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground" style={{ fontSize: '13px' }}>
                      Deliver
                    </td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>
                      ユーザビリティテスト、A/B テスト、Hi-Fi プロトタイプ
                    </td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>
                      テストレポート、最終デザイン
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ウォーターフォール vs アジャイル UX */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <RefreshCw className="text-primary" />
              ウォーターフォール vs アジャイル UX
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              デザインプロセスの進め方は、プロジェクトの開発手法に大きく左右される。
              ウォーターフォール型とアジャイル型では、UX 活動のタイミングと粒度が異なる。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* ウォーターフォール */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <ArrowRight size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">ウォーターフォール型</h3>
                    <p className="text-xs text-muted-foreground">直線的プロセス</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary flex-shrink-0 font-bold" style={{ fontSize: '13px' }}>+</span>
                    全体計画が立てやすい
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary flex-shrink-0 font-bold" style={{ fontSize: '13px' }}>+</span>
                    要件が安定しているプロジェクト向き
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 flex-shrink-0 font-bold" style={{ fontSize: '13px' }}>-</span>
                    フィードバックが遅れやすい
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 flex-shrink-0 font-bold" style={{ fontSize: '13px' }}>-</span>
                    手戻りコストが大きい
                  </li>
                </ul>
              </div>

              {/* アジャイル UX */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Repeat size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">アジャイル UX</h3>
                    <p className="text-xs text-muted-foreground">反復的プロセス</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary flex-shrink-0 font-bold" style={{ fontSize: '13px' }}>+</span>
                    スプリントごとにフィードバックを反映
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary flex-shrink-0 font-bold" style={{ fontSize: '13px' }}>+</span>
                    変化する要件に対応しやすい
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 flex-shrink-0 font-bold" style={{ fontSize: '13px' }}>-</span>
                    デザインが開発の先行を維持する必要あり
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 flex-shrink-0 font-bold" style={{ fontSize: '13px' }}>-</span>
                    全体の一貫性を保つ工夫が必要
                  </li>
                </ul>
              </div>
            </div>

            <InfoBox type="info" title="現実のプロジェクトでは">
              <p>
                多くのチームはウォーターフォールとアジャイルの中間的なやり方を採用している。
                初期の戦略・リサーチはまとめて行い、デザインと開発はスプリント単位で反復する「デュアルトラック・アジャイル」が一般的。
              </p>
            </InfoBox>
          </section>

          {/* リーン UX */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Zap className="text-primary" />
              リーン UX
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Eric Ries の Lean Startup の考え方を UX に適用したアプローチ。
              仮説を素早く検証し、学びを得ることを最優先にする。
            </p>

            {/* Build-Measure-Learn ループ */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="text-lg font-bold text-foreground mb-4 text-center">
                Build - Measure - Learn ループ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    step: 1,
                    label: 'Build（構築）',
                    desc: '仮説に基づいた最小限のプロトタイプ（MVP）を素早く作る。完璧さより速さを優先する。',
                    color: 'bg-blue-500',
                  },
                  {
                    step: 2,
                    label: 'Measure（計測）',
                    desc: 'ユーザーにプロトタイプを使ってもらい、行動データやフィードバックを収集する。',
                    color: 'bg-green-500',
                  },
                  {
                    step: 3,
                    label: 'Learn（学習）',
                    desc: '得られたデータから仮説の正否を判断し、次のサイクルの方向性を決める。',
                    color: 'bg-amber-500',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="rounded-lg border border-border bg-muted/30 p-4 text-center"
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mx-auto mb-3`}
                    >
                      <span className="text-sm font-bold" style={{ color: 'var(--background)' }}>
                        {item.step}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-foreground mb-2">{item.label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                <Repeat size={14} className="text-primary" />
                <span>このサイクルを繰り返し、仮説を継続的に検証する</span>
              </div>
            </div>

            <InfoBox type="warning" title="リーン UX の注意点">
              <p>
                「素早く作る」は「雑に作る」ではない。検証したい仮説を明確にした上で、その仮説を検証できる最小限の形を作ることが重要。
                仮説が曖昧なまま作ったプロトタイプからは有効な学びが得られない。
              </p>
            </InfoBox>
          </section>

          {/* 3 モデルの比較 */}
          <section>
            <h2 className="text-3xl font-bold mb-6">プロセスモデルの比較</h2>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-3 px-4 font-bold text-foreground" style={{ fontSize: '13px' }}>
                      観点
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground" style={{ fontSize: '13px' }}>
                      ダブルダイヤモンド
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground" style={{ fontSize: '13px' }}>
                      アジャイル UX
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground" style={{ fontSize: '13px' }}>
                      リーン UX
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground" style={{ fontSize: '13px' }}>目的</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>問題と解決策を段階的に明確化</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>開発サイクルと UX を統合</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>仮説の高速検証</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground" style={{ fontSize: '13px' }}>進め方</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>4 フェーズを順に実施</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>スプリント単位で反復</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>Build-Measure-Learn ループ</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground" style={{ fontSize: '13px' }}>適した場面</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>新規プロジェクトの初期設計</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>継続開発・チーム開発</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>スタートアップ・新機能検証</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground" style={{ fontSize: '13px' }}>成果物</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>問題定義、デザイン仕様</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>スプリントごとのデザイン</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>検証済み仮説、MVP</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Quiz 1 */}
          <Quiz
            question="ダブルダイヤモンドモデルの前半（1つ目のダイヤモンド）の目的はどれか？"
            options={[
              { label: 'プロトタイプを作成し、ユーザビリティを検証する' },
              { label: '正しい問題を見つけ、解くべき課題を定義する', correct: true },
              { label: 'ビジュアルデザインを完成させる' },
              { label: 'A/B テストで最適な UI を選定する' },
            ]}
            explanation="ダブルダイヤモンドの前半は Discover（発見）と Define（定義）で構成され、「正しい問題を見つける」ことが目的。解決策の検討は後半のダイヤモンドで行う。"
          />

          {/* Quiz 2 */}
          <Quiz
            question="リーン UX の Build-Measure-Learn ループで最も重視されるのはどれか？"
            options={[
              { label: 'プロトタイプの完成度' },
              { label: '仮説を素早く検証して学びを得ること', correct: true },
              { label: 'デザインドキュメントの網羅性' },
              { label: 'ステークホルダーの合意形成' },
            ]}
            explanation="リーン UX は「学び」を最優先にする。完璧なプロトタイプよりも、仮説を検証できる最小限の形を素早く作り、ユーザーからのフィードバックを得ることが重要。"
          />

          {/* ReferenceLinks */}
          <ReferenceLinks
            links={[
              {
                title: 'Design Council - The Double Diamond',
                url: 'https://www.designcouncil.org.uk/our-resources/the-double-diamond/',
                description: 'ダブルダイヤモンドモデルの提唱元による解説',
              },
              {
                title: 'Jeff Gothelf - Lean UX (O\'Reilly)',
                url: 'https://www.oreilly.com/library/view/lean-ux-3rd/9781098116293/',
                description: 'リーン UX の定番書籍（第 3 版）',
              },
              {
                title: 'Nielsen Norman Group - Dual-Track Agile',
                url: 'https://www.nngroup.com/articles/dual-track-agile/',
                description: 'アジャイル開発における UX の統合方法',
              },
            ]}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
