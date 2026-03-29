import { Layers, Monitor, Users, ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function WhatIsUx() {
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
            UX デザインとは
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            「ユーザー体験」の設計がなぜ必要なのか、UI との違いや基本モデルを整理する。
          </p>
        </div>

        {/* WhyNowBox */}
        <WhyNowBox
          title="エンジニアが UX を学ぶ意義"
          tags={['実装判断', 'デザイナー協業', '手戻り削減']}
        >
          <p>
            UX の考え方を知っていると、「このボタンをどこに置くか」「エラー時にどう伝えるか」といった実装上の判断に根拠を持てるようになる。
            デザイナーとの会話で意図を正しく受け取り、仕様の曖昧さを早期に解消できる。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* UX vs UI の比較 */}
          <section>
            <h2 className="text-3xl font-bold mb-6">UX と UI の違い</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              UX と UI は混同されやすいが、対象とする範囲が異なる。
              UI は「見た目と操作」に限定される一方、UX はサービスとの接点全体を含む。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* UX カード */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">UX（User Experience）</h3>
                    <p className="text-xs text-muted-foreground">体験全体の設計</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    サービスの利用前から利用後までの体験全体
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    ユーザーの目的達成までの流れを設計
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    リサーチ、IA、ワイヤーフレームなどを含む
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    「予約が 3 ステップで完了する」のような構造的な話
                  </li>
                </ul>
              </div>

              {/* UI カード */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Monitor size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">UI（User Interface）</h3>
                    <p className="text-xs text-muted-foreground">見た目・操作の設計</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    画面上のボタン、フォーム、レイアウトなど
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    色、タイポグラフィ、アイコンの選定
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    操作フィードバック（ホバー、クリック反応）
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    「ボタンの色は青で角丸 8px」のような視覚的な話
                  </li>
                </ul>
              </div>
            </div>

            <InfoBox type="info" title="たとえ話">
              <p>
                レストランに例えると、UX は「予約のしやすさ」「注文から料理が届くまでの流れ」「会計のスムーズさ」を含む体験全体。
                UI は「メニューのフォントや配色」「注文ボタンの位置」など目に見える接点のデザイン。
              </p>
            </InfoBox>
          </section>

          {/* UX の 5 要素 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Layers className="text-primary" />
              UX の 5 要素（Jesse James Garrett）
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              「The Elements of User Experience」で提唱されたモデル。
              抽象的な戦略レイヤーから具体的な表層レイヤーへと、5 段階で構成される。
              下のレイヤーが固まっていないまま上位を作ると、後から大きな手戻りが発生する。
            </p>

            {/* 5 要素ピラミッド: 1(戦略)=土台が最も広い → 5(表層)=頂点が最も狭い */}
            <div className="space-y-2 mb-8">
              {[
                {
                  number: 5,
                  label: '表層（Surface）',
                  desc: 'ビジュアルデザイン: 色、タイポグラフィ、画像の選定',
                  width: 'max-w-[55%]',
                  badgeBg: 'bg-pink-500',
                  bg: 'bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800',
                },
                {
                  number: 4,
                  label: '骨格（Skeleton）',
                  desc: 'レイアウト、ナビゲーション配置、ボタン位置の設計',
                  width: 'max-w-[68%]',
                  badgeBg: 'bg-violet-500',
                  bg: 'bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800',
                },
                {
                  number: 3,
                  label: '構造（Structure）',
                  desc: '情報アーキテクチャ: 情報の分類と階層関係の定義',
                  width: 'max-w-[80%]',
                  badgeBg: 'bg-blue-500',
                  bg: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
                },
                {
                  number: 2,
                  label: '要件（Scope）',
                  desc: '機能要件とコンテンツ要件の定義',
                  width: 'max-w-[90%]',
                  badgeBg: 'bg-teal-500',
                  bg: 'bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800',
                },
                {
                  number: 1,
                  label: '戦略（Strategy）',
                  desc: 'ユーザーニーズとビジネス目標の明確化',
                  width: 'max-w-full',
                  badgeBg: 'bg-amber-500',
                  bg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800',
                },
              ].map((layer) => (
                <div key={layer.number} className={`${layer.width} w-full mx-auto`}>
                  <div
                    className={`rounded-lg border ${layer.bg} px-4 py-3 flex items-center gap-3`}
                  >
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full ${layer.badgeBg} flex items-center justify-center text-xs font-bold text-white`}
                      style={{ minWidth: '1.75rem' }}
                    >
                      {layer.number}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground">{layer.label}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {layer.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <span>具体（上）</span>
              <span>&#8592;</span>
              <span>ピラミッド</span>
              <span>&#8594;</span>
              <span>抽象（下 = 土台）</span>
            </div>

            <InfoBox type="warning" title="よくある失敗">
              <p>
                戦略レイヤー（誰のために、何を解決するか）を曖昧にしたまま UI デザインに着手すると、
                「きれいだけど使われない」プロダクトができあがる。
                各レイヤーを下から順に固めていくのが基本。
              </p>
            </InfoBox>
          </section>

          {/* 良い UX の具体例 */}
          <section>
            <h2 className="text-3xl font-bold mb-6">良い UX の具体例</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              予約サイトを例に、UX の改善前と改善後を比較する。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Before */}
              <div className="rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/10 p-5">
                <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-3">
                  Before
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 flex-shrink-0" style={{ fontSize: '13px' }}>--</span>
                    予約フォームが 1 ページに全項目表示
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 flex-shrink-0" style={{ fontSize: '13px' }}>--</span>
                    入力エラーが送信後にまとめて表示
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 flex-shrink-0" style={{ fontSize: '13px' }}>--</span>
                    現在のステップが分からず離脱率が高い
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 flex-shrink-0" style={{ fontSize: '13px' }}>--</span>
                    予約完了後の確認手段が不明確
                  </li>
                </ul>
              </div>

              {/* After */}
              <div className="rounded-xl border-2 border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/10 p-5">
                <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider mb-3">
                  After
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    ステップ分割（日付 → 人数 → 確認）で認知負荷を軽減
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    入力直後にリアルタイムバリデーション
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    プログレスバーで現在位置を常に表示
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    完了画面にメール確認・カレンダー追加の導線
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* UX の ROI */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="text-primary" />
              UX の ROI
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              UX リサーチへの投資は、開発後の手戻りコストと比較すると合理的な選択になる。
              問題の発見タイミングが遅れるほど修正コストは増大する。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-3 px-4 font-bold text-foreground" style={{ fontSize: '13px' }}>
                      発見フェーズ
                    </th>
                    <th className="text-center py-3 px-4 font-bold text-foreground" style={{ fontSize: '13px' }}>
                      相対コスト
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground" style={{ fontSize: '13px' }}>
                      具体例
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground" style={{ fontSize: '13px' }}>リサーチ段階</td>
                    <td className="py-3 px-4 text-center font-bold text-green-600 dark:text-green-400" style={{ fontSize: '13px' }}>1x</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>インタビューで要件を修正</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground" style={{ fontSize: '13px' }}>デザイン段階</td>
                    <td className="py-3 px-4 text-center font-bold text-amber-600 dark:text-amber-400" style={{ fontSize: '13px' }}>5x</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>プロトタイプの画面遷移を変更</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground" style={{ fontSize: '13px' }}>開発段階</td>
                    <td className="py-3 px-4 text-center font-bold text-orange-600 dark:text-orange-400" style={{ fontSize: '13px' }}>10x</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>実装済みの画面構成を再設計</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground" style={{ fontSize: '13px' }}>リリース後</td>
                    <td className="py-3 px-4 text-center font-bold text-red-600 dark:text-red-400" style={{ fontSize: '13px' }}>30-100x</td>
                    <td className="py-3 px-4" style={{ fontSize: '13px' }}>既存ユーザーへの影響を含む全面改修</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="success" title="エンジニアへの実利">
              <p>
                UX リサーチの結果を把握していれば、「なぜこの仕様なのか」を理解した上でコードを書ける。
                仕様の意図が不明なまま実装するより、結果として手戻りが少なくなる。
              </p>
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <Quiz
            question="UX と UI の違いとして最も適切な説明はどれか？"
            options={[
              { label: 'UX はビジュアルデザイン、UI はコーディングのこと' },
              { label: 'UX はモバイル向け、UI は PC 向けの設計のこと' },
              { label: 'UX は体験全体の設計、UI は見た目・操作の設計', correct: true },
              { label: 'UX と UI は同じ意味で使い分ける必要はない' },
            ]}
            explanation="UX（User Experience）はサービスとの接点全体の体験設計を指し、UI（User Interface）は画面上の見た目や操作性の設計に限定される。UX は UI を包含するより広い概念。"
          />

          {/* Quiz 2 */}
          <Quiz
            question="UX の 5 要素（Garrett モデル）で最も抽象的なレイヤーはどれか？"
            options={[
              { label: '表層（Surface）' },
              { label: '骨格（Skeleton）' },
              { label: '構造（Structure）' },
              { label: '戦略（Strategy）', correct: true },
            ]}
            explanation="戦略レイヤーは「誰のために」「何を解決するか」というビジネス目標とユーザーニーズを定義する最も抽象的な層。ここが曖昧なまま具体的な設計に進むと手戻りが大きくなる。"
          />

          {/* ReferenceLinks */}
          <ReferenceLinks
            links={[
              {
                title: 'The Elements of User Experience - Jesse James Garrett',
                url: 'https://jjg.net/elements/',
                description: 'UX の 5 要素モデルの原典',
              },
              {
                title: 'Nielsen Norman Group - UX の定義',
                url: 'https://www.nngroup.com/articles/definition-user-experience/',
                description: 'NNg による UX の公式な定義と解説',
              },
              {
                title: 'Interaction Design Foundation - UX Design',
                url: 'https://www.interaction-design.org/literature/topics/ux-design',
                description: 'UX デザインの包括的な学習リソース',
              },
            ]}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
