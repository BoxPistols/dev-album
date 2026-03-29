import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function VisualDesign() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 9</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          ビジュアルデザインの原則
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          色、文字、余白、レイアウト。ビジュアルデザインには再現可能な法則があります。
          デザインの 4 原則からゲシュタルトの法則まで、根拠のある判断基準を身につけます。
        </p>

        <WhyNowBox tags={['4原則', '色彩理論', 'タイポグラフィ', 'ゲシュタルト', 'WCAG']}>
          <p>
            見た目の良し悪しには法則があります。「なんとなくダサい」「どこか読みにくい」
            という感覚の正体は、近接・整列・反復・コントラストなどの原則で説明できます。
            原則を知ることで、感覚に頼らず論理的にデザインを改善できるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: デザインの4原則 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">デザインの 4 原則</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              Robin Williams の著書『ノンデザイナーズ・デザインブック』で提唱された 4 原則は、
              あらゆるビジュアルデザインの基礎になります。
              それぞれの原則を Before / After の観点で理解しましょう。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* 近接 */}
              <div className="rounded-xl border border-border bg-card p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">近接</h3>
                    <p className="text-sm text-muted-foreground">Proximity</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                  関連する要素を近づけ、無関係な要素を離す。グループの意味が視覚的に伝わる。
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted/50 p-3 border border-border">
                    <p className="text-xs font-bold text-muted-foreground mb-2">Before</p>
                    <div className="space-y-2 text-xs text-foreground/70">
                      <div className="bg-foreground/10 rounded px-2 py-1">タイトル</div>
                      <div className="bg-foreground/10 rounded px-2 py-1">画像</div>
                      <div className="bg-foreground/10 rounded px-2 py-1">説明文</div>
                      <div className="bg-foreground/10 rounded px-2 py-1">価格</div>
                    </div>
                    <p className="text-[12px] text-muted-foreground mt-2">等間隔 = 関係が不明</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 p-3 border border-primary/20">
                    <p className="text-xs font-bold text-primary mb-2">After</p>
                    <div className="space-y-1 text-xs text-foreground/70 mb-2">
                      <div className="bg-primary/10 rounded px-2 py-1">タイトル</div>
                      <div className="bg-primary/10 rounded px-2 py-1">画像</div>
                    </div>
                    <div className="space-y-1 text-xs text-foreground/70">
                      <div className="bg-primary/10 rounded px-2 py-1">説明文</div>
                      <div className="bg-primary/10 rounded px-2 py-1">価格</div>
                    </div>
                    <p className="text-[12px] text-primary mt-2">グループ化 = 意味が明確</p>
                  </div>
                </div>
              </div>

              {/* 整列 */}
              <div className="rounded-xl border border-border bg-card p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">整列</h3>
                    <p className="text-sm text-muted-foreground">Alignment</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                  要素同士を見えない線で揃える。中央揃えの乱用を避け、基準線を意識する。
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted/50 p-3 border border-border">
                    <p className="text-xs font-bold text-muted-foreground mb-2">Before</p>
                    <div className="space-y-1.5 text-xs text-foreground/70">
                      <div className="bg-foreground/10 rounded px-2 py-1 w-3/4">見出し</div>
                      <div className="bg-foreground/10 rounded px-2 py-1 w-full ml-2">テキスト</div>
                      <div className="bg-foreground/10 rounded px-2 py-1 w-2/3 ml-4">ボタン</div>
                    </div>
                    <p className="text-[12px] text-muted-foreground mt-2">バラバラの配置</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 p-3 border border-primary/20">
                    <p className="text-xs font-bold text-primary mb-2">After</p>
                    <div className="space-y-1.5 text-xs text-foreground/70">
                      <div className="bg-primary/10 rounded px-2 py-1 w-3/4">見出し</div>
                      <div className="bg-primary/10 rounded px-2 py-1 w-full">テキスト</div>
                      <div className="bg-primary/10 rounded px-2 py-1 w-2/3">ボタン</div>
                    </div>
                    <p className="text-[12px] text-primary mt-2">左揃えで統一</p>
                  </div>
                </div>
              </div>

              {/* 反復 */}
              <div className="rounded-xl border border-border bg-card p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">反復</h3>
                    <p className="text-sm text-muted-foreground">Repetition</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                  色・フォント・余白・装飾などを一貫して繰り返す。統一感とリズムが生まれる。
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted/50 p-3 border border-border">
                    <p className="text-xs font-bold text-muted-foreground mb-2">Before</p>
                    <div className="space-y-1.5 text-xs">
                      <div className="bg-red-200 dark:bg-red-900/40 rounded px-2 py-1 text-foreground/70">項目 A</div>
                      <div className="bg-blue-200 dark:bg-blue-900/40 rounded px-2 py-1 text-foreground/70 font-bold">項目 B</div>
                      <div className="bg-green-200 dark:bg-green-900/40 rounded px-2 py-1 text-foreground/70 italic">項目 C</div>
                    </div>
                    <p className="text-[12px] text-muted-foreground mt-2">毎回異なるスタイル</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 p-3 border border-primary/20">
                    <p className="text-xs font-bold text-primary mb-2">After</p>
                    <div className="space-y-1.5 text-xs text-foreground/70">
                      <div className="bg-primary/10 rounded px-2 py-1 border-l-2 border-primary">項目 A</div>
                      <div className="bg-primary/10 rounded px-2 py-1 border-l-2 border-primary">項目 B</div>
                      <div className="bg-primary/10 rounded px-2 py-1 border-l-2 border-primary">項目 C</div>
                    </div>
                    <p className="text-[12px] text-primary mt-2">同じパターンで統一</p>
                  </div>
                </div>
              </div>

              {/* コントラスト */}
              <div className="rounded-xl border border-border bg-card p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">コントラスト</h3>
                    <p className="text-sm text-muted-foreground">Contrast</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                  異なる要素に明確な差をつける。中途半端な差は「間違い」に見えてしまう。
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted/50 p-3 border border-border">
                    <p className="text-xs font-bold text-muted-foreground mb-2">Before</p>
                    <div className="space-y-1 text-foreground/70">
                      <p className="text-sm">見出し</p>
                      <p className="text-[13px]">本文テキスト</p>
                    </div>
                    <p className="text-[12px] text-muted-foreground mt-2">差が小さく曖昧</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 p-3 border border-primary/20">
                    <p className="text-xs font-bold text-primary mb-2">After</p>
                    <div className="space-y-1 text-foreground/70">
                      <p className="text-lg font-bold">見出し</p>
                      <p className="text-xs">本文テキスト</p>
                    </div>
                    <p className="text-[12px] text-primary mt-2">サイズ・太さで明確な差</p>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="4 原則の適用順">
              <p>
                まず<strong>近接</strong>で情報をグループ化し、<strong>整列</strong>で見えない線を通す。
                次に<strong>反復</strong>で一貫性を持たせ、最後に<strong>コントラスト</strong>で重要な要素を際立たせる。
                この順序で適用すると、体系的にレイアウトを改善できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: 色彩理論の基礎 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">色彩理論の基礎</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              色はユーザーの感情や行動に直接影響を与えます。
              色相環の仕組みと配色パターンを理解し、論理的に色を選べるようになりましょう。
            </p>

            {/* 色相環ダイアグラム */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="font-bold text-foreground mb-4">色相環（Color Wheel）</h3>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-48 h-48 flex-shrink-0">
                  <svg viewBox="0 0 200 200" className="w-full h-full" aria-label="色相環の概念図">
                    {/* 12色の色相環 */}
                    {[
                      { angle: 0, color: '#EF4444' },
                      { angle: 30, color: '#F97316' },
                      { angle: 60, color: '#EAB308' },
                      { angle: 90, color: '#84CC16' },
                      { angle: 120, color: '#22C55E' },
                      { angle: 150, color: '#14B8A6' },
                      { angle: 180, color: '#06B6D4' },
                      { angle: 210, color: '#3B82F6' },
                      { angle: 240, color: '#6366F1' },
                      { angle: 270, color: '#8B5CF6' },
                      { angle: 300, color: '#D946EF' },
                      { angle: 330, color: '#EC4899' },
                    ].map(({ angle, color }) => {
                      const rad = (angle - 90) * (Math.PI / 180);
                      const cx = 100 + 70 * Math.cos(rad);
                      const cy = 100 + 70 * Math.sin(rad);
                      return (
                        <circle
                          key={angle}
                          cx={cx}
                          cy={cy}
                          r="18"
                          fill={color}
                          opacity="0.85"
                        />
                      );
                    })}
                    <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 2" />
                  </svg>
                </div>
                <div className="flex-1 space-y-2 text-sm text-foreground/80">
                  <p>
                    <strong className="text-foreground">色相（Hue）</strong>: 赤・青・緑など色の種類。色相環上の位置で表現される。
                  </p>
                  <p>
                    <strong className="text-foreground">彩度（Saturation）</strong>: 色の鮮やかさ。高いほど鮮明、低いほどグレーに近づく。
                  </p>
                  <p>
                    <strong className="text-foreground">明度（Brightness）</strong>: 色の明るさ。高いほど白に近く、低いほど黒に近づく。
                  </p>
                </div>
              </div>
            </div>

            {/* 配色パターン */}
            <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
              <h3 className="font-bold text-foreground p-4 pb-2">代表的な配色パターン</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-3 font-semibold text-foreground">パターン</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">関係</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">特徴</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">配色例</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">補色</td>
                      <td className="px-4 py-3 text-foreground/80">色相環の対角（180度）</td>
                      <td className="px-4 py-3 text-foreground/80">強いコントラスト、目を引く</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <span className="w-6 h-6 rounded bg-blue-500" title="Blue" />
                          <span className="w-6 h-6 rounded bg-orange-500" title="Orange" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">類似色</td>
                      <td className="px-4 py-3 text-foreground/80">色相環で隣接（30度以内）</td>
                      <td className="px-4 py-3 text-foreground/80">調和的、落ち着いた印象</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <span className="w-6 h-6 rounded bg-blue-500" title="Blue" />
                          <span className="w-6 h-6 rounded bg-cyan-500" title="Cyan" />
                          <span className="w-6 h-6 rounded bg-teal-500" title="Teal" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">トライアド</td>
                      <td className="px-4 py-3 text-foreground/80">色相環を 3 等分（120度間隔）</td>
                      <td className="px-4 py-3 text-foreground/80">バランスのよい多色使い</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <span className="w-6 h-6 rounded bg-red-500" title="Red" />
                          <span className="w-6 h-6 rounded bg-blue-500" title="Blue" />
                          <span className="w-6 h-6 rounded bg-yellow-500" title="Yellow" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">モノクロマティック</td>
                      <td className="px-4 py-3 text-foreground/80">同一色相の明度・彩度違い</td>
                      <td className="px-4 py-3 text-foreground/80">統一感が高く、失敗しにくい</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <span className="w-6 h-6 rounded bg-blue-300" title="Light Blue" />
                          <span className="w-6 h-6 rounded bg-blue-500" title="Blue" />
                          <span className="w-6 h-6 rounded bg-blue-700" title="Dark Blue" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* WCAG コントラスト比 */}
            <div className="rounded-xl border border-border bg-card p-6 mb-4">
              <h3 className="font-bold text-foreground mb-3">WCAG コントラスト比の基準</h3>
              <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                Web Content Accessibility Guidelines（WCAG）では、テキストと背景のコントラスト比に最低基準を定めています。
                色を選ぶ際は、見た目の美しさだけでなくこの基準を満たすことが必要です。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-lg bg-muted/50 p-4 border border-border text-center">
                  <p className="text-2xl font-bold text-foreground mb-1">4.5 : 1</p>
                  <p className="text-sm text-muted-foreground">通常テキスト（AA）</p>
                  <p className="text-[12px] text-muted-foreground mt-1">18px 未満のテキスト</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 border border-border text-center">
                  <p className="text-2xl font-bold text-foreground mb-1">3 : 1</p>
                  <p className="text-sm text-muted-foreground">大きなテキスト（AA）</p>
                  <p className="text-[12px] text-muted-foreground mt-1">18px 以上 or 14px 太字</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 border border-border text-center">
                  <p className="text-2xl font-bold text-foreground mb-1">7 : 1</p>
                  <p className="text-sm text-muted-foreground">通常テキスト（AAA）</p>
                  <p className="text-[12px] text-muted-foreground mt-1">最も厳格な基準</p>
                </div>
              </div>
            </div>

            <InfoBox type="warning" title="色だけで情報を伝えない">
              <p>
                エラー表示を赤色だけで示すと、色覚に多様性のあるユーザーには伝わりません。
                アイコンやテキストを必ず併用し、色以外の手段でも情報が伝わるようにしましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: タイポグラフィの基礎 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">タイポグラフィの基礎</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              タイポグラフィは読みやすさと印象を決定づける要素です。
              フォントの選定、サイズの階層設計、行間・字間の調整が品質に直結します。
            </p>

            {/* フォント分類 */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="font-bold text-foreground mb-4">フォントの分類</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg bg-muted/30 p-4 border border-border">
                  <p className="text-lg font-serif text-foreground mb-2">Serif</p>
                  <p className="text-sm text-muted-foreground mb-2">セリフ体</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    文字の端に「ひげ飾り」がある書体。権威・伝統的な印象。長文の可読性が高い。
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    例: Times New Roman, Georgia, Noto Serif JP
                  </p>
                </div>
                <div className="rounded-lg bg-muted/30 p-4 border border-border">
                  <p className="text-lg font-sans text-foreground mb-2">Sans-serif</p>
                  <p className="text-sm text-muted-foreground mb-2">サンセリフ体</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    ひげ飾りのないシンプルな書体。モダン・クリーンな印象。UI に最適。
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    例: Helvetica, Inter, Noto Sans JP
                  </p>
                </div>
                <div className="rounded-lg bg-muted/30 p-4 border border-border">
                  <p className="text-lg font-mono text-foreground mb-2">Monospace</p>
                  <p className="text-sm text-muted-foreground mb-2">等幅書体</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    全文字が同じ幅の書体。コードエディタやターミナルで使われる。
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    例: Fira Code, JetBrains Mono, Source Code Pro
                  </p>
                </div>
              </div>
            </div>

            {/* 文字サイズの階層 */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="font-bold text-foreground mb-4">文字サイズの階層（Type Scale）</h3>
              <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                見出しから本文、キャプションまで、文字サイズの階層を一貫した比率で設計します。
                1.25 倍（Major Third）や 1.333 倍（Perfect Fourth）の比率がよく使われます。
              </p>
              <div className="space-y-3 border-l-2 border-primary/20 pl-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-xs text-muted-foreground w-16 flex-shrink-0">36px</span>
                  <span className="text-4xl font-bold text-foreground">H1 見出し</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-xs text-muted-foreground w-16 flex-shrink-0">28px</span>
                  <span className="text-3xl font-bold text-foreground">H2 見出し</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-xs text-muted-foreground w-16 flex-shrink-0">22px</span>
                  <span className="text-2xl font-semibold text-foreground">H3 見出し</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-xs text-muted-foreground w-16 flex-shrink-0">16px</span>
                  <span className="text-base text-foreground">本文テキスト</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-xs text-muted-foreground w-16 flex-shrink-0">14px</span>
                  <span className="text-sm text-muted-foreground">補助テキスト</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-xs text-muted-foreground w-16 flex-shrink-0">12px</span>
                  <span className="text-xs text-muted-foreground">キャプション</span>
                </div>
              </div>
            </div>

            {/* 行間・字間の推奨値 */}
            <div className="rounded-xl border border-border bg-card overflow-hidden mb-4">
              <h3 className="font-bold text-foreground p-4 pb-2">行間・字間の推奨値</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-3 font-semibold text-foreground">プロパティ</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">推奨値</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">説明</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">行間（line-height）</td>
                      <td className="px-4 py-3 text-foreground/80">1.5 ~ 1.8</td>
                      <td className="px-4 py-3 text-foreground/80">本文の可読性を確保する。日本語は 1.7 ~ 1.8 が読みやすい</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">見出し行間</td>
                      <td className="px-4 py-3 text-foreground/80">1.2 ~ 1.4</td>
                      <td className="px-4 py-3 text-foreground/80">見出しは詰め気味に。大きな文字は行間が広がりすぎる</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">字間（letter-spacing）</td>
                      <td className="px-4 py-3 text-foreground/80">0 ~ 0.05em</td>
                      <td className="px-4 py-3 text-foreground/80">本文はほぼゼロ。見出しはわずかに広げることもある</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">1 行の文字数</td>
                      <td className="px-4 py-3 text-foreground/80">40 ~ 70 文字</td>
                      <td className="px-4 py-3 text-foreground/80">長すぎると視線の移動で疲れる。max-width で制御する</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* セクション4: 余白の重要性 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">余白（ホワイトスペース）の重要性</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              余白は「何もない空間」ではなく、情報を整理しユーザーの視線を導くためのデザイン要素です。
              適切な余白はコンテンツの視認性と高級感を向上させます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* 余白なし */}
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs font-bold text-muted-foreground mb-3">余白が不十分な例</p>
                <div className="bg-muted/50 rounded p-2 text-xs text-foreground/70 space-y-0">
                  <p className="font-bold">商品タイトル</p>
                  <p>商品の説明テキストがここに入ります。改行もなく詰まった印象。</p>
                  <p className="font-bold">価格: 1,980円</p>
                  <p>購入ボタン</p>
                  <p className="font-bold">レビュー</p>
                  <p>星4.5 - 128件のレビュー</p>
                </div>
                <p className="text-[12px] text-muted-foreground mt-2">情報の区切りが曖昧で読みにくい</p>
              </div>

              {/* 適切な余白 */}
              <div className="rounded-xl border border-primary/20 bg-card p-4">
                <p className="text-xs font-bold text-primary mb-3">余白が適切な例</p>
                <div className="bg-primary/5 rounded p-4 text-xs text-foreground/70 space-y-4">
                  <div>
                    <p className="font-bold text-sm mb-1">商品タイトル</p>
                    <p className="leading-relaxed">商品の説明テキストがここに入ります。余白があることで読みやすくなります。</p>
                  </div>
                  <div>
                    <p className="font-bold">価格: 1,980円</p>
                    <p className="mt-2">購入ボタン</p>
                  </div>
                  <div>
                    <p className="font-bold">レビュー</p>
                    <p className="mt-1">星4.5 - 128件のレビュー</p>
                  </div>
                </div>
                <p className="text-[12px] text-primary mt-2">セクション間に余白があり構造が明確</p>
              </div>
            </div>

            <InfoBox type="info" title="8px グリッドシステム">
              <p>
                余白の値は 8 の倍数（8, 16, 24, 32, 48, 64...）で統一すると、リズム感のあるレイアウトになります。
                Tailwind CSS の spacing スケール（p-2 = 8px, p-4 = 16px...）はこの考え方に沿っています。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: ゲシュタルトの法則 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">ゲシュタルトの法則</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              ゲシュタルト心理学は「人間がどのように視覚情報をまとまりとして認識するか」を研究した分野です。
              UI デザインで直感的なレイアウトを作るための理論的な裏付けになります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* 近接の法則 */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2">近接の法則</h3>
                <p className="text-sm text-muted-foreground mb-3">Law of Proximity</p>
                <div className="flex justify-center gap-8 py-4 mb-3 bg-muted/30 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  近くにある要素は同じグループとして認識される。フォームのラベルと入力欄の距離設計に活用。
                </p>
              </div>

              {/* 類似の法則 */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2">類似の法則</h3>
                <p className="text-sm text-muted-foreground mb-3">Law of Similarity</p>
                <div className="flex justify-center gap-2 py-4 mb-3 bg-muted/30 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="w-3 h-3 rounded bg-primary" />
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="w-3 h-3 rounded bg-primary" />
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="w-3 h-3 rounded bg-primary" />
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  形や色が似ている要素は同じ種類と認識される。アイコンのスタイル統一やボタンの色分けに活用。
                </p>
              </div>

              {/* 閉合の法則 */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2">閉合の法則</h3>
                <p className="text-sm text-muted-foreground mb-3">Law of Closure</p>
                <div className="flex justify-center py-4 mb-3 bg-muted/30 rounded-lg">
                  <svg width="80" height="50" viewBox="0 0 80 50" className="text-primary">
                    <path d="M 10 25 A 20 20 0 0 1 40 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 6" />
                    <path d="M 40 5 A 20 20 0 0 1 70 25" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M 70 25 A 20 20 0 0 1 40 45" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M 40 45 A 20 20 0 0 1 10 25" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 6" />
                  </svg>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  不完全な形でも、脳が自動的に閉じた形として補完する。カードや枠線のデザインに関係する。
                </p>
              </div>

              {/* 連続の法則 */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2">連続の法則</h3>
                <p className="text-sm text-muted-foreground mb-3">Law of Continuity</p>
                <div className="flex justify-center py-4 mb-3 bg-muted/30 rounded-lg">
                  <svg width="120" height="50" viewBox="0 0 120 50" className="text-primary">
                    <path d="M 10 40 Q 40 5 60 25 Q 80 45 110 10" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    <circle cx="10" cy="40" r="4" fill="currentColor" />
                    <circle cx="60" cy="25" r="4" fill="currentColor" />
                    <circle cx="110" cy="10" r="4" fill="currentColor" />
                  </svg>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  視線は滑らかな線や方向に沿って流れる。ステッパーやタイムラインの UI に活用される。
                </p>
              </div>
            </div>
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="デザインの 4 原則のうち、関連する要素を近づけ無関係な要素を離す原則はどれ？"
              options={[
                { label: '整列（Alignment）' },
                { label: '近接（Proximity）', correct: true },
                { label: 'コントラスト（Contrast）' },
                { label: '反復（Repetition）' },
              ]}
              explanation="近接（Proximity）は、関連する要素を物理的に近くに配置し、グループの意味を視覚的に伝える原則です。整列は基準線の統一、コントラストは差の強調、反復はスタイルの一貫性に関する原則です。"
            />

            <Quiz
              question="WCAG における通常テキスト（AA レベル）のコントラスト比の最低基準は？"
              options={[
                { label: '3 : 1' },
                { label: '4.5 : 1', correct: true },
                { label: '7 : 1' },
                { label: '2 : 1' },
              ]}
              explanation="WCAG の AA レベルでは、通常テキスト（18px 未満）に 4.5:1 以上のコントラスト比が必要です。3:1 は大きなテキスト向け、7:1 は AAA レベル（最も厳格）の基準です。"
            />
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Robin Williams: The Non-Designer\'s Design Book',
                  url: 'https://www.oreilly.com/library/view/the-non-designers-design/9780133966350/',
                  description: 'デザインの 4 原則を提唱した名著。デザイナー以外にも必読',
                },
                {
                  title: 'WCAG 2.2: コントラスト (最低限)',
                  url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html',
                  description: 'W3C のコントラスト比基準の公式ガイドライン',
                },
                {
                  title: 'Google Fonts',
                  url: 'https://fonts.google.com/',
                  description: '無料 Web フォントの配信サービス。Noto Sans JP など日本語フォントも豊富',
                },
                {
                  title: 'Laws of UX',
                  url: 'https://lawsofux.com/',
                  description: 'ゲシュタルトの法則を含む UX 法則のビジュアルリファレンス',
                },
              ]}
            />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
