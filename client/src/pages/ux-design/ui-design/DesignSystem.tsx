import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 10</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          デザインシステム構築
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          デザインシステムは、一貫した UI を効率的に作るための仕組みです。
          デザイントークン、Atomic Design、運用フローまでを体系的に学びます。
        </p>

        <WhyNowBox tags={['デザインシステム', 'トークン', 'Atomic Design', 'Figma', '運用']}>
          <p>
            一貫した UI を効率的に作る仕組みがデザインシステムです。
            プロダクトが成長するとコンポーネントが増え、デザインの不整合が起こりやすくなります。
            デザイントークンとコンポーネントライブラリを構築・運用することで、
            品質を維持しながらスケールできる体制が作れます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: デザインシステムとは */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">デザインシステムとは</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              デザインシステムは、単なるスタイルガイドやコンポーネント集ではなく、
              3 つの要素で構成される包括的な仕組みです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="8" y1="8" x2="8" y2="18" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <h3 className="font-bold text-foreground mb-2">スタイルガイド</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  色、タイポグラフィ、余白、アイコンなどのビジュアルルール。
                  ブランドの視覚的な一貫性を定義する。
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <h3 className="font-bold text-foreground mb-2">コンポーネントライブラリ</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  ボタン、入力フィールド、カードなど再利用可能な UI パーツ。
                  デザインと実装の両方で共有される。
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 4h12M4 8h10M4 12h12M4 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="font-bold text-foreground mb-2">ドキュメント</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  使い方のガイドライン、Do / Don&apos;t、アクセシビリティ要件。
                  チーム全員が同じ判断基準を持てる。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="スタイルガイドとの違い">
              <p>
                スタイルガイドは「どう見せるか」のルール集、
                デザインシステムは「どう作り、どう運用するか」まで含んだ仕組みです。
                コンポーネントのコード実装、バージョン管理、変更プロセスまでが対象になります。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: デザイントークン */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">デザイントークン</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              デザイントークンは、色・余白・タイポグラフィ・シャドウなどのデザイン値を変数として一元管理する仕組みです。
              トークンを使うことで、テーマの切り替えやブランドの変更に柔軟に対応できます。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
              <h3 className="font-bold text-foreground p-4 pb-2">トークンのカテゴリと例</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-3 font-semibold text-foreground">カテゴリ</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">トークン例</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">値の例</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">用途</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">Color</td>
                      <td className="px-4 py-3 font-mono text-xs text-foreground/80">--color-primary</td>
                      <td className="px-4 py-3 text-foreground/80">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded bg-primary flex-shrink-0" />
                          <span>#2563EB</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-foreground/80">ボタン、リンク、フォーカス</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">Spacing</td>
                      <td className="px-4 py-3 font-mono text-xs text-foreground/80">--space-4</td>
                      <td className="px-4 py-3 text-foreground/80">16px</td>
                      <td className="px-4 py-3 text-foreground/80">パディング、マージン</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">Typography</td>
                      <td className="px-4 py-3 font-mono text-xs text-foreground/80">--font-size-body</td>
                      <td className="px-4 py-3 text-foreground/80">16px / 1.5</td>
                      <td className="px-4 py-3 text-foreground/80">本文テキスト</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">Shadow</td>
                      <td className="px-4 py-3 font-mono text-xs text-foreground/80">--shadow-sm</td>
                      <td className="px-4 py-3 text-foreground/80">0 1px 2px rgba(0,0,0,0.05)</td>
                      <td className="px-4 py-3 text-foreground/80">カード、ドロップダウン</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">Border Radius</td>
                      <td className="px-4 py-3 font-mono text-xs text-foreground/80">--radius-lg</td>
                      <td className="px-4 py-3 text-foreground/80">12px</td>
                      <td className="px-4 py-3 text-foreground/80">カード、モーダル</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* トークンのレイヤー構造 */}
            <div className="rounded-xl border border-border bg-card p-6 mb-4">
              <h3 className="font-bold text-foreground mb-4">トークンのレイヤー構造</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-24 text-right text-xs font-medium text-muted-foreground flex-shrink-0">
                    Global
                  </div>
                  <div className="flex-1 rounded-lg bg-muted/50 border border-border px-4 py-2">
                    <p className="text-sm font-mono text-foreground/80">blue-600 = #2563EB</p>
                    <p className="text-[12px] text-muted-foreground mt-1">生の色値。ブランドに依存しない</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 text-right flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" className="ml-auto text-muted-foreground" aria-hidden="true">
                      <path d="M8 2v12M4 10l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 text-right text-xs font-medium text-muted-foreground flex-shrink-0">
                    Alias
                  </div>
                  <div className="flex-1 rounded-lg bg-primary/5 border border-primary/20 px-4 py-2">
                    <p className="text-sm font-mono text-foreground/80">--color-primary = blue-600</p>
                    <p className="text-[12px] text-primary mt-1">意味を持つ名前に変換。テーマごとに切り替え可能</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 text-right flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" className="ml-auto text-muted-foreground" aria-hidden="true">
                      <path d="M8 2v12M4 10l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 text-right text-xs font-medium text-muted-foreground flex-shrink-0">
                    Component
                  </div>
                  <div className="flex-1 rounded-lg bg-primary/10 border border-primary/30 px-4 py-2">
                    <p className="text-sm font-mono text-foreground/80">--button-bg = var(--color-primary)</p>
                    <p className="text-[12px] text-primary mt-1">コンポーネント固有のトークン。用途を限定</p>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="success" title="トークンの利点">
              <p>
                デザインツール（Figma）とコード（CSS 変数 / Tailwind config）で同じトークン名を共有すると、
                デザインと実装のズレを防げます。ダークモード対応も Alias レイヤーの値を切り替えるだけで実現できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: Atomic Design */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">Atomic Design</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              Brad Frost が提唱した Atomic Design は、UI を 5 段階の粒度で整理する設計手法です。
              最小の単位から組み合わせてページを構築することで、再利用性と一貫性を両立します。
            </p>

            {/* Atomic Design フロー図 */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="font-bold text-foreground mb-6">5 段階の構成要素</h3>
              <div className="flex flex-col gap-4">
                {/* Atoms */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1 rounded-lg bg-muted/30 border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-foreground">Atoms（原子）</h4>
                      <span className="text-[12px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">最小単位</span>
                    </div>
                    <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                      これ以上分解できない最小の UI 要素。単独では機能を持たない。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-md bg-primary text-sm font-medium" style={{ color: 'var(--background)' }}>ボタン</span>
                      <span className="px-3 py-1 rounded-md border border-border text-sm text-foreground/70">入力欄</span>
                      <span className="text-sm text-foreground/70 flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-primary inline-block" />
                        アイコン
                      </span>
                      <span className="text-sm font-medium text-foreground">ラベル</span>
                    </div>
                  </div>
                </div>

                {/* 矢印 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 flex-shrink-0 flex justify-center">
                    <svg width="16" height="24" viewBox="0 0 16 24" className="text-primary/40" aria-hidden="true">
                      <path d="M8 0v20M3 16l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1" />
                </div>

                {/* Molecules */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1 rounded-lg bg-muted/30 border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-foreground">Molecules（分子）</h4>
                      <span className="text-[12px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Atoms の組み合わせ</span>
                    </div>
                    <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                      複数の Atoms を組み合わせた、単一の機能を持つグループ。
                    </p>
                    <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-2 w-fit">
                      <span className="px-3 py-1 rounded border border-border text-xs text-muted-foreground">検索ワードを入力</span>
                      <span className="px-3 py-1 rounded bg-primary text-xs font-medium" style={{ color: 'var(--background)' }}>検索</span>
                    </div>
                    <p className="text-[12px] text-muted-foreground mt-2">例: 検索フォーム = 入力欄 + ボタン</p>
                  </div>
                </div>

                {/* 矢印 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 flex-shrink-0 flex justify-center">
                    <svg width="16" height="24" viewBox="0 0 16 24" className="text-primary/40" aria-hidden="true">
                      <path d="M8 0v20M3 16l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1" />
                </div>

                {/* Organisms */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1 rounded-lg bg-muted/30 border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-foreground">Organisms（有機体）</h4>
                      <span className="text-[12px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Molecules の組み合わせ</span>
                    </div>
                    <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                      複数の Molecules を組み合わせた、独立した UI セクション。ページ内で明確な役割を持つ。
                    </p>
                    <div className="bg-card border border-border rounded-lg p-3 w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-foreground">Logo</span>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>ホーム</span>
                          <span>製品</span>
                          <span>お問い合わせ</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded border border-border text-[12px] text-muted-foreground">検索</span>
                          <span className="px-2 py-0.5 rounded bg-primary text-[12px]" style={{ color: 'var(--background)' }}>ログイン</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[12px] text-muted-foreground mt-2">例: ヘッダー = ロゴ + ナビゲーション + 検索フォーム + ボタン</p>
                  </div>
                </div>

                {/* 矢印 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 flex-shrink-0 flex justify-center">
                    <svg width="16" height="24" viewBox="0 0 16 24" className="text-primary/40" aria-hidden="true">
                      <path d="M8 0v20M3 16l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1" />
                </div>

                {/* Templates */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1 rounded-lg bg-muted/30 border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-foreground">Templates（テンプレート）</h4>
                      <span className="text-[12px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">レイアウト構造</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      Organisms を配置したページのレイアウト骨格。
                      実データの代わりにプレースホルダーを使い、構造のみを定義する。
                    </p>
                  </div>
                </div>

                {/* 矢印 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 flex-shrink-0 flex justify-center">
                    <svg width="16" height="24" viewBox="0 0 16 24" className="text-primary/40" aria-hidden="true">
                      <path d="M8 0v20M3 16l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1" />
                </div>

                {/* Pages */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1 rounded-lg bg-muted/30 border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-foreground">Pages（ページ）</h4>
                      <span className="text-[12px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">実データ適用</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      Templates に実際のデータを流し込んだ最終形。
                      ユーザーが目にする実際の画面そのもの。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* セクション4: デザインシステムの実例比較 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">代表的なデザインシステムの比較</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              各社のデザインシステムは、プラットフォームやブランドの方針に応じて異なるアプローチを取っています。
              それぞれの特徴を比較し、自分のプロジェクトに合った参考先を見つけましょう。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-3 font-semibold text-foreground">システム</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">提供元</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">主な対象</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">特徴</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">Material Design</td>
                      <td className="px-4 py-3 text-foreground/80">Google</td>
                      <td className="px-4 py-3 text-foreground/80">Android / Web</td>
                      <td className="px-4 py-3 text-foreground/80">物理世界のメタファー。マテリアル（素材）の重なりや影で奥行きを表現。トークンシステムが充実</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">Apple HIG</td>
                      <td className="px-4 py-3 text-foreground/80">Apple</td>
                      <td className="px-4 py-3 text-foreground/80">iOS / macOS</td>
                      <td className="px-4 py-3 text-foreground/80">プラットフォーム固有の作法を重視。SF Symbols、Dynamic Type、Haptics などの OS 機能と連携</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">Ant Design</td>
                      <td className="px-4 py-3 text-foreground/80">Alibaba</td>
                      <td className="px-4 py-3 text-foreground/80">エンタープライズ Web</td>
                      <td className="px-4 py-3 text-foreground/80">ビジネスアプリケーション向け。テーブル・フォーム・チャートなどデータ表示に強い。React 向け実装が豊富</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">Carbon Design</td>
                      <td className="px-4 py-3 text-foreground/80">IBM</td>
                      <td className="px-4 py-3 text-foreground/80">エンタープライズ</td>
                      <td className="px-4 py-3 text-foreground/80">アクセシビリティへの注力が特徴。IBM Plex フォントファミリー。厳格なガバナンスプロセス</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* セクション5: Figma でのデザインシステム構築フロー */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">Figma でのデザインシステム構築フロー</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              Figma はデザインシステムの構築と共有に適したツールです。
              以下の 4 ステップで、チームで共有できるデザインシステムの基盤を作れます。
            </p>

            <div className="space-y-4 mb-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold" style={{ color: 'var(--background)' }}>1</span>
                </div>
                <div className="flex-1 rounded-xl border border-border bg-card p-5">
                  <h3 className="font-bold text-foreground mb-2">カラースタイル定義</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Primary、Secondary、Background、Foreground、Error などの色を
                    Figma の Local Styles または Variables に登録する。
                    Light / Dark テーマ分の値を設定し、Variable Mode で切り替え可能にする。
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold" style={{ color: 'var(--background)' }}>2</span>
                </div>
                <div className="flex-1 rounded-xl border border-border bg-card p-5">
                  <h3 className="font-bold text-foreground mb-2">テキストスタイル定義</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Heading 1 ~ 6、Body、Caption、Overline などのテキストスタイルを作成。
                    フォントファミリー、サイズ、ウェイト、行間をセットで登録する。
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold" style={{ color: 'var(--background)' }}>3</span>
                </div>
                <div className="flex-1 rounded-xl border border-border bg-card p-5">
                  <h3 className="font-bold text-foreground mb-2">コンポーネント作成</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    ボタン、入力フィールド、カードなどの基本コンポーネントを作成。
                    Auto Layout でレスポンシブに対応し、カラースタイルとテキストスタイルを適用する。
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold" style={{ color: 'var(--background)' }}>4</span>
                </div>
                <div className="flex-1 rounded-xl border border-border bg-card p-5">
                  <h3 className="font-bold text-foreground mb-2">バリアント設定</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    各コンポーネントに Size（sm / md / lg）、State（default / hover / disabled）、
                    Type（primary / secondary / ghost）などのバリアントを追加。
                    Component Properties でテキストやアイコンの差し替えを可能にする。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="Figma Variables と Local Styles">
              <p>
                Figma Variables はトークンの一元管理に適しており、テーマ切り替え（Mode）に対応しています。
                Local Styles はグラデーションや複合スタイルに適しています。
                両方を併用し、Variables で値を定義して Styles で適用するのが実践的です。
              </p>
            </InfoBox>
          </section>

          {/* セクション6: デザインシステムの運用 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">デザインシステムの運用</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              デザインシステムは作って終わりではなく、継続的な運用が必要です。
              バージョニング、ガバナンス、ドキュメントの 3 軸で品質を維持します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-3">バージョニング</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">&#8226;</span>
                    <span>セマンティックバージョニング（1.2.3）で変更の影響度を明示</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">&#8226;</span>
                    <span>破壊的変更はメジャーバージョンで通知</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">&#8226;</span>
                    <span>CHANGELOG で変更履歴を記録</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-3">ガバナンス</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">&#8226;</span>
                    <span>コンポーネント追加・変更のレビュープロセスを定義</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">&#8226;</span>
                    <span>デザインと実装の責任範囲を明確化</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">&#8226;</span>
                    <span>定期的な監査で使用状況を把握</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-3">ドキュメント</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">&#8226;</span>
                    <span>各コンポーネントの Do / Don&apos;t を明記</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">&#8226;</span>
                    <span>Storybook 等でインタラクティブなドキュメントを提供</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">&#8226;</span>
                    <span>アクセシビリティ要件を各コンポーネントに記載</span>
                  </li>
                </ul>
              </div>
            </div>

            <InfoBox type="warning" title="デザインシステムのアンチパターン">
              <p>
                「全部入り」を目指して最初から巨大なシステムを作ると、メンテナンスが追いつかず形骸化します。
                まずは色とタイポグラフィのトークン + 使用頻度の高いコンポーネント 5 ~ 10 個から始め、
                プロダクトの成長に合わせて段階的に拡張するのが現実的です。
              </p>
            </InfoBox>
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="Atomic Design で、ボタンと入力欄を組み合わせた検索フォームはどの段階に該当する？"
              options={[
                { label: 'Atoms（原子）' },
                { label: 'Molecules（分子）', correct: true },
                { label: 'Organisms（有機体）' },
                { label: 'Templates（テンプレート）' },
              ]}
              explanation="Molecules は複数の Atoms を組み合わせた、単一の機能を持つグループです。検索フォームは「入力欄（Atom）+ ボタン（Atom）」の組み合わせなので Molecules に該当します。"
            />

            <Quiz
              question="デザイントークンの 3 層構造で、--button-bg のようなコンポーネント固有の値を定義するのはどのレイヤー？"
              options={[
                { label: 'Global トークン' },
                { label: 'Alias トークン' },
                { label: 'Component トークン', correct: true },
                { label: 'Semantic トークン' },
              ]}
              explanation="Component トークンは特定のコンポーネントに紐づく値を定義するレイヤーです。--button-bg のように用途を限定した名前をつけ、値には Alias トークン（--color-primary など）を参照します。"
            />
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Material Design 3',
                  url: 'https://m3.material.io/',
                  description: 'Google のデザインシステム。トークン、コンポーネント、ガイドラインが充実',
                },
                {
                  title: 'Apple Human Interface Guidelines',
                  url: 'https://developer.apple.com/design/human-interface-guidelines/',
                  description: 'Apple プラットフォーム向けデザインの公式ガイドライン',
                },
                {
                  title: 'Atomic Design by Brad Frost',
                  url: 'https://atomicdesign.bradfrost.com/',
                  description: 'Atomic Design の提唱者による無料の解説書',
                },
                {
                  title: 'Figma: デザインシステムガイド',
                  url: 'https://help.figma.com/hc/en-us/articles/14552950499351-Guide-to-design-systems-in-Figma',
                  description: 'Figma でデザインシステムを構築するための公式ガイド',
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
