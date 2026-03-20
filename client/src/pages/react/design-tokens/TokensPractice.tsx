import CodeBlock from "@/components/CodeBlock";
import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import CodingChallenge from "@/components/CodingChallenge";
import ReferenceLinks from "@/components/ReferenceLinks";

export default function TokensPractice() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 71</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          デザイントークンの実践
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          デザイントークンとは、デザイン上の決定事項を名前付きの値として管理する仕組みです。
          色だけでなく、スペーシング、フォントサイズ、シャドウ、ボーダー、アニメーションまで、
          すべての視覚的プロパティをトークン化し、デザインとコードの一貫性を保ちます。
        </p>

        <WhyNowBox
          tags={[
            "デザイントークン",
            "CSS変数",
            "Material Design",
            "Figma Variables",
            "ダークモード",
            "Tailwind CSS",
          ]}
        >
          <p>
            Step 59 でデザインシステムの全体像を学びました。
            デザインシステムの基盤にあるのがデザイントークンです。
            トークンが定義されていなければ、コンポーネントの色やサイズは開発者の判断でバラバラになります。
            このステップでは、Material Design 3 と Apple HIG
            の体系を参考にしながら、 CSS 変数で実装し、Figma Variables
            と対応させる方法を学びます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: デザイントークンとは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デザイントークンとは
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザイントークンは、色・スペーシング・フォントサイズ・シャドウなどのデザイン上の決定事項を、
              名前付きの変数として定義したものです。 ハードコードされた値（
              <code>#3b82f6</code>、<code>16px</code>）の代わりに、
              意味のある名前（<code>--color-primary</code>、
              <code>--spacing-4</code>）を使うことで、
              デザインの意図がコードに残り、変更にも強くなります。
            </p>

            <div className="rounded-lg border border-border p-5 mb-6">
              <h3 className="font-bold text-foreground mb-3">
                Material Design 3 のトークン階層
              </h3>
              <p className="text-sm text-foreground/80 mb-4">
                Material Design 3 では、デザイントークンを 3
                つの階層に分類しています。
                下層から上層に向かって抽象度が上がり、コンポーネントは最上層のトークンのみを参照します。
              </p>
              <CodeBlock
                language="text"
                title="MD3 トークン階層: Reference → System → Component"
                code={`┌─────────────────────────────────────────────────┐
│  Component Tokens（コンポーネント固有）          │
│  例: --md-filled-button-container-color          │
│      → sys.color.primary を参照                  │
├─────────────────────────────────────────────────┤
│  System Tokens（テーマ全体の共通値）             │
│  例: --md-sys-color-primary: #6750A4             │
│      → ref.palette.primary40 を参照              │
├─────────────────────────────────────────────────┤
│  Reference Tokens（生の値）                      │
│  例: --md-ref-palette-primary40: #6750A4         │
│      → 変更されることが少ない基盤の値            │
└─────────────────────────────────────────────────┘`}
              />
            </div>

            <div className="rounded-lg border border-border p-5 mb-6">
              <h3 className="font-bold text-foreground mb-3">
                Apple HIG のセマンティックカラー
              </h3>
              <p className="text-sm text-foreground/80 mb-3">
                Apple の Human Interface Guidelines
                では、用途に基づいたセマンティックカラーを定義しています。
                <code>label</code>、<code>secondaryLabel</code>、
                <code>systemBackground</code> のように、
                「何に使うか」で命名し、ライトモードとダークモードで値が自動的に切り替わります。
              </p>
              <CodeBlock
                language="text"
                title="Apple HIG セマンティックカラーの例"
                code={`名前                    Light        Dark         用途
───────────────────────────────────────────────────────
label                   #000000      #FFFFFF      主要テキスト
secondaryLabel          #3C3C43/60%  #EBEBF5/60%  補助テキスト
systemBackground        #FFFFFF      #000000      画面背景
secondarySystemBg       #F2F2F7      #1C1C1E      グループ化背景
separator               #3C3C43/29%  #545458/65%  区切り線
systemBlue              #007AFF      #0A84FF      アクション/リンク`}
              />
            </div>

            <InfoBox type="info" title="2つのアプローチの共通点">
              <p>
                Material Design も Apple HIG
                も、「生の値をそのまま使わない」という点で一致しています。
                生の色値（#6750A4）を直接コンポーネントに指定するのではなく、
                セマンティックな名前（primary、label）を介して参照する。
                この間接参照がデザイントークンの核心です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: トークンの 6 カテゴリ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              トークンの 6 カテゴリ
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              デザイントークンは色だけではありません。UI を構成する 6
              つのカテゴリすべてをトークン化することで、
              デザインの一貫性を保ちます。Atomic Design における
              Atoms（原子）に相当する最小単位です。
            </p>

            {/* 2a: カラー */}
            <div className="rounded-lg border border-border p-5 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                  a
                </span>
                <h3 className="font-bold text-foreground">カラー</h3>
              </div>
              <p className="text-sm text-foreground/80 mb-4">
                Primary、Secondary、Surface、Background、Error の 5
                系統を基本とし、
                ライトモードとダークモードの両方で値を定義します。
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">
                        トークン名
                      </th>
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">
                        Light
                      </th>
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">
                        Dark
                      </th>
                      <th className="text-left py-2 font-semibold text-foreground">
                        用途
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/80">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">
                        --color-primary
                      </td>
                      <td className="py-2 pr-4">#2563EB</td>
                      <td className="py-2 pr-4">#60A5FA</td>
                      <td className="py-2">ボタン、リンク、アクセント</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">
                        --color-secondary
                      </td>
                      <td className="py-2 pr-4">#7C3AED</td>
                      <td className="py-2 pr-4">#A78BFA</td>
                      <td className="py-2">バッジ、装飾的要素</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">
                        --color-surface
                      </td>
                      <td className="py-2 pr-4">#FFFFFF</td>
                      <td className="py-2 pr-4">#1E1E2E</td>
                      <td className="py-2">カード、パネルの背景</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">
                        --color-background
                      </td>
                      <td className="py-2 pr-4">#F8FAFC</td>
                      <td className="py-2 pr-4">#0F172A</td>
                      <td className="py-2">ページ全体の背景</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs">
                        --color-error
                      </td>
                      <td className="py-2 pr-4">#DC2626</td>
                      <td className="py-2 pr-4">#F87171</td>
                      <td className="py-2">エラー状態、バリデーション</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2b: スペーシング */}
            <div className="rounded-lg border border-border p-5 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 flex items-center justify-center font-bold text-xs">
                  b
                </span>
                <h3 className="font-bold text-foreground">スペーシング</h3>
              </div>
              <p className="text-sm text-foreground/80 mb-4">
                Material Design では 4px グリッドシステムを採用しています。 8
                の倍数を基本とすることで、要素間の余白が視覚的にリズムを持ちます。
              </p>
              <CodeBlock
                language="css"
                title="スペーシングトークン（4px grid system）"
                code={`:root {
  --spacing-0: 0px;
  --spacing-1: 4px;    /* 極小（アイコンと文字の間） */
  --spacing-2: 8px;    /* 小（関連要素の間隔） */
  --spacing-3: 12px;   /* やや小 */
  --spacing-4: 16px;   /* 基本（パディング、マージン） */
  --spacing-6: 24px;   /* 中（セクション内の間隔） */
  --spacing-8: 32px;   /* 大（セクション間の間隔） */
  --spacing-12: 48px;  /* 特大（主要セクション間） */
  --spacing-16: 64px;  /* 最大（ページ上下の余白） */
}`}
              />
              <InfoBox type="info" title="なぜ 4px / 8px の倍数なのか">
                <p>
                  一般的なディスプレイのピクセル密度では、4px
                  の倍数が整数のレンダリングになるため、
                  サブピクセルによるぼやけが発生しません。 また、8px
                  を基本単位にすることで、要素間のリズムが揃い、視覚的な調和が生まれます。
                  Material Design のガイドラインでもこの 4dp / 8dp
                  グリッドが推奨されています。
                </p>
              </InfoBox>
            </div>

            {/* 2c: フォントサイズ */}
            <div className="rounded-lg border border-border p-5 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 flex items-center justify-center font-bold text-xs">
                  c
                </span>
                <h3 className="font-bold text-foreground">
                  フォントサイズ（Type Scale）
                </h3>
              </div>
              <p className="text-sm text-foreground/80 mb-4">
                タイポグラフィのトークンは font-size だけでなく、line-height と
                letter-spacing もセットで定義します。 この 3
                つが揃って初めて、読みやすいテキストが実現します。
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">
                        トークン名
                      </th>
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">
                        font-size
                      </th>
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">
                        line-height
                      </th>
                      <th className="text-left py-2 font-semibold text-foreground">
                        letter-spacing
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/80">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">
                        --text-caption
                      </td>
                      <td className="py-2 pr-4">12px</td>
                      <td className="py-2 pr-4">1.33</td>
                      <td className="py-2">0.4px</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">
                        --text-body-sm
                      </td>
                      <td className="py-2 pr-4">14px</td>
                      <td className="py-2 pr-4">1.43</td>
                      <td className="py-2">0.25px</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">
                        --text-body
                      </td>
                      <td className="py-2 pr-4">16px</td>
                      <td className="py-2 pr-4">1.5</td>
                      <td className="py-2">0.5px</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">
                        --text-title-sm
                      </td>
                      <td className="py-2 pr-4">20px</td>
                      <td className="py-2 pr-4">1.4</td>
                      <td className="py-2">0.15px</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">
                        --text-title
                      </td>
                      <td className="py-2 pr-4">24px</td>
                      <td className="py-2 pr-4">1.33</td>
                      <td className="py-2">0px</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">
                        --text-headline-sm
                      </td>
                      <td className="py-2 pr-4">28px</td>
                      <td className="py-2 pr-4">1.29</td>
                      <td className="py-2">0px</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs">
                        --text-headline
                      </td>
                      <td className="py-2 pr-4">32px</td>
                      <td className="py-2 pr-4">1.25</td>
                      <td className="py-2">0px</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2d: シャドウ / Elevation */}
            <div className="rounded-lg border border-border p-5 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs">
                  d
                </span>
                <h3 className="font-bold text-foreground">
                  シャドウ / Elevation
                </h3>
              </div>
              <p className="text-sm text-foreground/80 mb-4">
                Material Design では、要素の「高さ（Elevation）」を 0dp から
                24dp のスケールで表現します。 Elevation
                が高いほど、ユーザーの注意を引き、操作対象であることを示します。
              </p>
              <CodeBlock
                language="css"
                title="Elevation トークン"
                code={`:root {
  /* Light モード: box-shadow で Elevation を表現 */
  --shadow-none: none;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);           /* Elevation 1 */
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);          /* Elevation 2 */
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);         /* Elevation 3 */
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);         /* Elevation 4 */
}

.dark {
  /* Dark モード: 影は見えにくいため、Surface の明度で Elevation を表現 */
  --shadow-none: none;
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.4);
  --shadow-md: 0 4px 8px -1px rgb(0 0 0 / 0.5);
  --shadow-lg: 0 10px 20px -3px rgb(0 0 0 / 0.5);
  --shadow-xl: 0 20px 30px -5px rgb(0 0 0 / 0.6);

  /* Surface の明度で Elevation を補完 */
  --surface-elevation-0: #121212;
  --surface-elevation-1: #1E1E1E;  /* +5% white overlay */
  --surface-elevation-2: #232323;  /* +7% white overlay */
  --surface-elevation-3: #282828;  /* +8% white overlay */
  --surface-elevation-4: #2C2C2C;  /* +9% white overlay */
}`}
              />
              <InfoBox type="warning" title="ダークモードの Elevation">
                <p>
                  ダークモードでは黒い背景に黒い影を落としても見えません。
                  Material Design のガイドラインでは、ダークモードの Elevation
                  を 「Surface
                  に白のオーバーレイを重ねて明度を上げる」ことで表現します。
                  Elevation が高い要素ほど Surface が明るくなります。
                </p>
              </InfoBox>
            </div>

            {/* 2e: ボーダー / Radius */}
            <div className="rounded-lg border border-border p-5 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-xs">
                  e
                </span>
                <h3 className="font-bold text-foreground">ボーダー / Radius</h3>
              </div>
              <p className="text-sm text-foreground/80 mb-4">
                border-radius と border-width もトークンとして定義します。
                角丸のサイズが統一されていないと、「このボタンは角丸 4px
                だがカードは 8px」 のように視覚的なノイズが増えます。
              </p>
              <CodeBlock
                language="css"
                title="ボーダートークン"
                code={`:root {
  /* border-radius スケール */
  --radius-none: 0px;
  --radius-sm: 4px;    /* 小さな要素（バッジ、チップ） */
  --radius-md: 8px;    /* 標準（ボタン、入力フィールド） */
  --radius-lg: 12px;   /* 大きな要素（カード、ダイアログ） */
  --radius-xl: 16px;   /* モーダル、大型パネル */
  --radius-full: 9999px; /* 完全な丸（アバター、ピル） */

  /* border-width */
  --border-thin: 1px;   /* 区切り線、入力フィールド */
  --border-thick: 2px;  /* フォーカスリング、強調ボーダー */

  /* border-color */
  --border-default: #E2E8F0;
  --border-strong: #CBD5E1;
}

.dark {
  --border-default: #334155;
  --border-strong: #475569;
}`}
              />
            </div>

            {/* 2f: アニメーション */}
            <div className="rounded-lg border border-border p-5 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 flex items-center justify-center font-bold text-xs">
                  f
                </span>
                <h3 className="font-bold text-foreground">アニメーション</h3>
              </div>
              <p className="text-sm text-foreground/80 mb-4">
                アニメーションの duration と easing もトークン化します。
                ニールセンのユーザビリティヒューリスティクス
                #1「システム状態の可視性」によれば、
                状態変化をユーザーに伝えるフィードバックが必要です。
                アニメーショントークンを統一することで、アプリ全体のフィードバックが一貫します。
              </p>
              <CodeBlock
                language="css"
                title="アニメーショントークン"
                code={`:root {
  /* Duration */
  --duration-fast: 150ms;    /* ホバー、フォーカス等の即時反応 */
  --duration-normal: 200ms;  /* ボタンクリック、トグル切替 */
  --duration-slow: 300ms;    /* モーダル表示、ページ遷移 */
  --duration-slower: 500ms;  /* 大きなレイアウト変更 */

  /* Easing */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);  /* 汎用（ease-in-out 相当） */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);          /* 要素が退場する時 */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);         /* 要素が登場する時 */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* 遊び心のあるバウンド */
}

/* 使い方の例 */
.button {
  transition: background-color var(--duration-fast) var(--ease-default),
              transform var(--duration-fast) var(--ease-out);
}
.modal-enter {
  animation: slide-up var(--duration-slow) var(--ease-out);
}`}
              />
            </div>
          </section>

          {/* セクション 3: CSS 変数による実装 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CSS 変数による実装
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              6 カテゴリのトークンを CSS
              カスタムプロパティ（変数）として定義します。
              <code>:root</code> にライトモードの値を設定し、<code>.dark</code>{" "}
              セレクタでダークモードの値を上書きします。
            </p>

            <CodeBlock
              language="css"
              title="tokens.css — トークン定義の全体像"
              showLineNumbers
              code={`/* ================================
   Design Tokens — tokens.css
   ================================ */

:root {
  /* --- カラー --- */
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-secondary: #7C3AED;
  --color-surface: #FFFFFF;
  --color-background: #F8FAFC;
  --color-error: #DC2626;
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-text: #0F172A;
  --color-text-muted: #64748B;

  /* --- スペーシング --- */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-12: 48px;
  --spacing-16: 64px;

  /* --- フォントサイズ --- */
  --text-caption: 12px;
  --text-body-sm: 14px;
  --text-body: 16px;
  --text-title-sm: 20px;
  --text-title: 24px;
  --text-headline-sm: 28px;
  --text-headline: 32px;

  /* --- line-height --- */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* --- シャドウ --- */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);

  /* --- ボーダー --- */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  --border-default: #E2E8F0;

  /* --- アニメーション --- */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}

.dark {
  --color-primary: #60A5FA;
  --color-primary-hover: #93C5FD;
  --color-secondary: #A78BFA;
  --color-surface: #1E1E2E;
  --color-background: #0F172A;
  --color-error: #F87171;
  --color-success: #4ADE80;
  --color-warning: #FBBF24;
  --color-text: #F1F5F9;
  --color-text-muted: #94A3B8;
  --border-default: #334155;
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.4);
  --shadow-md: 0 4px 8px -1px rgb(0 0 0 / 0.5);
  --shadow-lg: 0 10px 20px -3px rgb(0 0 0 / 0.5);
  --shadow-xl: 0 20px 30px -5px rgb(0 0 0 / 0.6);
}`}
            />

            <div className="mt-6" />

            <h3 className="text-xl font-bold text-foreground mb-3">
              Tailwind CSS 4 の @theme ディレクティブとの連携
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Tailwind CSS v4 では <code>@theme</code> ディレクティブを使って
              CSS 変数を Tailwind
              のユーティリティクラスに直接マッピングできます。
              <code>:root</code> で定義したトークンを <code>@theme</code>{" "}
              内で参照することで、
              <code>bg-surface</code> や <code>text-primary</code>{" "}
              のようなクラス名が生成されます。
            </p>

            <CodeBlock
              language="css"
              title="Tailwind CSS 4 で @theme にトークンを統合"
              code={`/* src/index.css */
@import "tailwindcss";

@theme {
  /* カラー: CSS 変数を参照して Tailwind クラスを生成 */
  --color-primary: var(--color-primary);
  --color-secondary: var(--color-secondary);
  --color-surface: var(--color-surface);
  --color-background: var(--color-background);
  --color-error: var(--color-error);

  /* スペーシング: spacing-* クラスが使えるようになる */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;

  /* border-radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}

/* 使い方: */
/* <div className="bg-surface text-primary p-4 rounded-lg shadow-md"> */`}
            />
          </section>

          {/* セクション 4: Figma Variables との対応 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Figma Variables との対応
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Figma の Variable Collections は CSS 変数と 1:1 で対応します。
              Figma 側でトークンを管理し、コードに自動エクスポートすることで、
              デザインと実装の値の乖離を防ぎます。
            </p>

            <CodeBlock
              language="text"
              title="Figma Variables → CSS 変数の対応"
              code={`Figma Variable Collection     CSS 変数                  値 (Light)   値 (Dark)
────────────────────────────────────────────────────────────────────────────
Colors / Primary              --color-primary           #2563EB      #60A5FA
Colors / Surface              --color-surface           #FFFFFF      #1E1E2E
Colors / Background           --color-background        #F8FAFC      #0F172A
Colors / Error                --color-error             #DC2626      #F87171
Spacing / spacing-4           --spacing-4               16px         16px
Radius / radius-md            --radius-md               8px          8px

Figma の Mode                 CSS の切り替え
────────────────────────────────────────────
Light                         :root { ... }
Dark                          .dark { ... }`}
            />

            <div className="mt-6" />

            <div className="rounded-lg border border-border p-5 mb-6">
              <h3 className="font-bold text-foreground mb-3">
                Token Studio for Figma でのエクスポート
              </h3>
              <p className="text-sm text-foreground/80 mb-4">
                Token Studio（旧 Figma Tokens）は、Figma
                内でデザイントークンを管理し、 JSON
                形式でエクスポートできるプラグインです。 エクスポートした JSON
                を Style Dictionary などのツールで CSS 変数に変換します。
              </p>
              <CodeBlock
                language="tsx"
                title="Token Studio からエクスポートされた JSON の例"
                code={`// tokens.json（Token Studio のエクスポート形式）
{
  "color": {
    "primary": {
      "value": "#2563EB",
      "type": "color",
      "description": "主要なアクションカラー"
    },
    "surface": {
      "value": "#FFFFFF",
      "type": "color"
    }
  },
  "spacing": {
    "4": {
      "value": "16px",
      "type": "spacing"
    }
  },
  "borderRadius": {
    "md": {
      "value": "8px",
      "type": "borderRadius"
    }
  }
}

// Style Dictionary で CSS 変数に変換
// npx style-dictionary build --config sd.config.js
// → 出力: tokens.css（:root に CSS 変数が定義される）`}
              />
            </div>

            <InfoBox type="info" title="ワークフロー: Figma → JSON → CSS">
              <p>
                実務では以下の流れでトークンを管理します。 (1) Figma の Token
                Studio でトークンを定義・管理 → (2) JSON
                ファイルとしてリポジトリにエクスポート → (3) Style Dictionary
                などで CSS 変数に変換 → (4) CI/CD で自動変換を実行。
                これにより、デザイナーがトークンを変更すると、コード側も自動的に更新されます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: ニールセンのヒューリスティクスとの対応 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ニールセンのヒューリスティクスとの対応
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              デザイントークンは単なる「値の管理」ではありません。
              ニールセンのユーザビリティ 10 原則のうち、以下の 3
              つと直接関連しています。
            </p>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                    #1
                  </span>
                  <h3 className="font-bold text-foreground">
                    システム状態の可視性
                  </h3>
                </div>
                <p className="text-sm text-foreground/80">
                  ユーザーの操作に対するフィードバック（ホバー、フォーカス、ローディング）を
                  アニメーショントークン（<code>--duration-fast</code>、
                  <code>--ease-out</code>）で統一することで、
                  「今、何が起きているか」を一貫した速度と動きで伝えられます。
                  150ms 以下であれば「即座に反応した」とユーザーは認知します。
                </p>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 flex items-center justify-center font-bold text-xs">
                    #4
                  </span>
                  <h3 className="font-bold text-foreground">一貫性と標準</h3>
                </div>
                <p className="text-sm text-foreground/80">
                  セマンティックな命名（<code>--color-primary</code>、
                  <code>--spacing-4</code>）を
                  すべてのコンポーネントが参照することで、アプリ全体の視覚的な一貫性が自動的に保たれます。
                  新しいページを作る際も「この色はどのコードだっけ？」と迷わず、
                  トークン名を指定するだけで統一されたデザインになります。
                </p>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 flex items-center justify-center font-bold text-xs">
                    #8
                  </span>
                  <h3 className="font-bold text-foreground">
                    美的で最小限のデザイン
                  </h3>
                </div>
                <p className="text-sm text-foreground/80">
                  シャドウやボーダーをトークンで制限（<code>--shadow-sm</code>{" "}
                  から <code>--shadow-xl</code> の 4 段階のみ）
                  することで、「影の強さが 5
                  種類以上ある」ような視覚的ノイズを防ぎます。
                  使えるバリエーションを意図的に制約することが、クリーンなデザインにつながります。
                </p>
              </div>
            </div>
          </section>

          {/* トークン値の比較デモ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              トークン値の比較デモ
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              トークン化された値が実際にどのように見えるかを確認します。
              スペーシング、フォントサイズ、シャドウ、ボーダー半径の各スケールを視覚的に比較できます。
            </p>

            <CodePreview
              language="tsx"
              title="デザイントークンの視覚的比較"
              previewOnly
              previewHeight={520}
              code={`function App() {
  const spacings = [
    { name: 'spacing-1', value: 4 },
    { name: 'spacing-2', value: 8 },
    { name: 'spacing-4', value: 16 },
    { name: 'spacing-6', value: 24 },
    { name: 'spacing-8', value: 32 },
  ];
  const shadows = [
    { name: 'shadow-sm', value: '0 1px 2px 0 rgba(0,0,0,0.05)' },
    { name: 'shadow-md', value: '0 4px 6px -1px rgba(0,0,0,0.1)' },
    { name: 'shadow-lg', value: '0 10px 15px -3px rgba(0,0,0,0.1)' },
    { name: 'shadow-xl', value: '0 20px 25px -5px rgba(0,0,0,0.1)' },
  ];
  const radii = [
    { name: 'radius-sm', value: 4 },
    { name: 'radius-md', value: 8 },
    { name: 'radius-lg', value: 12 },
    { name: 'radius-xl', value: 16 },
    { name: 'radius-full', value: 9999 },
  ];

  const label = { fontSize: 11, color: '#64748b', fontFamily: 'monospace', marginBottom: 4 };
  const sectionTitle = { fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#334155' };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={sectionTitle}>Spacing Scale</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
          {spacings.map(s => (
            <div key={s.name} style={{ textAlign: 'center' }}>
              <div style={{ width: s.value, height: s.value, background: '#3b82f6', borderRadius: 2 }} />
              <div style={{ ...label, marginTop: 4 }}>{s.value}px</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={sectionTitle}>Shadow / Elevation</div>
        <div style={{ display: 'flex', gap: 16 }}>
          {shadows.map(s => (
            <div key={s.name} style={{ width: 72, height: 48, background: '#fff', borderRadius: 8, boxShadow: s.value, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ ...label, marginBottom: 0 }}>{s.name.replace('shadow-', '')}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={sectionTitle}>Border Radius</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {radii.map(r => (
            <div key={r.name} style={{ textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, background: '#e0e7ff', border: '2px solid #6366f1', borderRadius: r.value }} />
              <div style={{ ...label, marginTop: 4 }}>{r.name.replace('radius-', '')}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={sectionTitle}>Type Scale</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[{n:'caption',s:12},{n:'body-sm',s:14},{n:'body',s:16},{n:'title-sm',s:20},{n:'title',s:24},{n:'headline',s:32}].map(t => (
            <div key={t.n} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ ...label, width: 80, marginBottom: 0, textAlign: 'right', flexShrink: 0 }}>{t.s}px</span>
              <span style={{ fontSize: t.s, color: '#1e293b', lineHeight: 1.4 }}>{t.n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Material Design 3 のトークン階層で、コンポーネントが直接参照するのはどのレベルのトークンですか？"
              options={[
                { label: "Reference Tokens（生の値）" },
                { label: "System Tokens（テーマ全体の共通値）", correct: true },
                {
                  label:
                    "Component Tokens は存在せず、直接 Reference を参照する",
                },
                { label: "CSS 変数を介さず、値をハードコードする" },
              ]}
              explanation="Material Design 3 では、コンポーネントは System Tokens（例: sys.color.primary）を参照します。System Tokens は内部で Reference Tokens を参照しますが、コンポーネントはその詳細を知る必要がありません。この間接参照により、テーマの切り替えやリブランディングが容易になります。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="ダークモードで Elevation（影）が見えにくい問題に対して、Material Design が推奨する解決策はどれですか？"
              options={[
                { label: "影の色を白に変更する" },
                { label: "影の blur を大きくして強調する" },
                {
                  label: "Surface の明度を上げて Elevation を表現する",
                  correct: true,
                },
                { label: "ダークモードでは影を使わない" },
              ]}
              explanation="Material Design のダークテーマガイドラインでは、Elevation が高い要素ほど Surface に白のオーバーレイを重ねて明度を上げます。Elevation 0 は #121212、Elevation 1 は +5% の白オーバーレイ、のように段階的に明るくなります。これにより、影が見えにくい暗い背景でも要素の階層を視覚的に伝えられます。"
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="CSS 変数でデザイントークンを定義する"
              description="以下の CSS に、デザイントークンの定義を穴埋めしてください。カラー、スペーシング、ボーダー半径、アニメーションの 4 カテゴリを定義します。コメントを参考に適切な値を入力してください。"
              initialCode={`:root {
  /* カラー: Primary（青系） */
  --color-primary: ____;

  /* カラー: Error（赤系） */
  --color-error: ____;

  /* スペーシング: 基本単位 16px */
  --spacing-4: ____;

  /* ボーダー半径: 標準サイズ */
  --radius-md: ____;

  /* アニメーション: 高速な反応 */
  --duration-fast: ____;
}

.dark {
  /* ダークモード: Primary は明るめの青 */
  --color-primary: ____;

  /* ダークモード: Error は明るめの赤 */
  --color-error: ____;
}`}
              answer={`:root {
  /* カラー: Primary（青系） */
  --color-primary: #2563EB;

  /* カラー: Error（赤系） */
  --color-error: #DC2626;

  /* スペーシング: 基本単位 16px */
  --spacing-4: 16px;

  /* ボーダー半径: 標準サイズ */
  --radius-md: 8px;

  /* アニメーション: 高速な反応 */
  --duration-fast: 150ms;
}

.dark {
  /* ダークモード: Primary は明るめの青 */
  --color-primary: #60A5FA;

  /* ダークモード: Error は明るめの赤 */
  --color-error: #F87171;
}`}
              keywords={[
                "--color-primary:",
                "--color-error:",
                "--spacing-4:",
                "--radius-md:",
                "--duration-fast:",
                "16px",
                "8px",
                "150ms",
                ".dark",
              ]}
              hints={[
                "Primary カラーはライトモードでは濃い青（#2563EB）、ダークモードでは明るい青（#60A5FA）を使います",
                "スペーシングは 4px グリッドシステムで、spacing-4 は 4 × 4 = 16px です",
                "アニメーションの duration-fast は、ホバーなどの即時反応に使う 150ms が標準です",
              ]}
              previewType="terminal"
            />
          </section>

          {/* アンチパターンと失敗事例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              現場でよくある失敗パターン
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              デザイントークンの運用で頻繁に発生する問題と、その回避策を整理する。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 px-3 text-foreground">失敗パターン</th>
                    <th className="text-left py-2 px-3 text-foreground">なぜ起きるか</th>
                    <th className="text-left py-2 px-3 text-foreground">回避策</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">トークン未定義のままビジュアルを先行</td>
                    <td className="py-3 px-3">「見た目を決めてから色を整理しよう」という順序。結果、<code>#3B82F6</code> のような生の値がコード中に散在する</td>
                    <td className="py-3 px-3">Figma Variables でトークンを先に定義 → ビジュアルはトークンを参照して組む</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">いきなりコード実装に入る</td>
                    <td className="py-3 px-3">Storybook や Figma でのコンポーネント設計を省略し、ページ単位で実装。結果、再利用できないコンポーネントが量産される</td>
                    <td className="py-3 px-3">Atom → Molecule → Organism のボトムアップ順で設計してから実装（CDD）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">ライトモードだけ作ってダークを後付け</td>
                    <td className="py-3 px-3">「ダークモードは後で対応」。結果、ハードコード色が大量に残り、移行コストが膨大</td>
                    <td className="py-3 px-3">最初から CSS 変数（セマンティックトークン）で定義。Light/Dark を同時に設計</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">トークン名がデザイナーと開発者で違う</td>
                    <td className="py-3 px-3">Figma 上では「Brand Blue」、CSS では <code>--color-primary</code>。名前が合わないとコミュニケーションコストが増大</td>
                    <td className="py-3 px-3">ユビキタス言語として 1 つの命名体系に統一し、Figma / CSS / JS で同じ名前を使う</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">スペーシングやフォントを抽象化しない</td>
                    <td className="py-3 px-3"><code>padding: 16px</code> <code>margin: 24px</code> をその場で決める。画面ごとにバラつく</td>
                    <td className="py-3 px-3">4px grid の spacing scale を定義し、<code>var(--spacing-4)</code> で参照</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-foreground">Storybook を導入して満足する</td>
                    <td className="py-3 px-3">Storybook はツールであり目的ではない。カタログを作っただけでデザインとコードが一致する保証はない</td>
                    <td className="py-3 px-3">Chromatic で Visual Regression テストを自動化し、差分を検出する仕組みを CI に組み込む</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="warning" title="暗黙知を形式知に変換する">
              <p>
                デザイントークンの本質は、チーム内の「暗黙の了解」を明文化すること。
                「この青はブランドカラー」「余白は 8 の倍数」といった暗黙知を、
                <code>--color-primary</code> <code>--spacing-2</code> という形式知に変換する。
                これにより、人が入れ替わってもデザインの一貫性が維持される。
              </p>
            </InfoBox>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Material Design 3 — Design Tokens",
                  url: "https://m3.material.io/foundations/design-tokens/overview",
                  description:
                    "MD3 のトークン体系（Reference / System / Component）の公式ドキュメント",
                },
                {
                  title: "Apple Human Interface Guidelines — Color",
                  url: "https://developer.apple.com/design/human-interface-guidelines/color",
                  description:
                    "Apple HIG のセマンティックカラーとダイナミックカラーの解説",
                },
                {
                  title: "Material Design 3 — Elevation",
                  url: "https://m3.material.io/styles/elevation/overview",
                  description:
                    "Elevation とダークテーマにおける Surface の明度変化",
                },
                {
                  title: "Nielsen Norman Group — 10 Usability Heuristics",
                  url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
                  description: "ニールセンのユーザビリティ 10 原則の原典",
                },
                {
                  title: "Tailwind CSS v4 — Theme Configuration",
                  url: "https://tailwindcss.com/docs/theme",
                  description:
                    "@theme ディレクティブによる CSS 変数とユーティリティクラスの統合",
                },
                {
                  title: "Token Studio for Figma",
                  url: "https://tokens.studio/",
                  description:
                    "Figma 内でデザイントークンを管理・エクスポートするプラグイン",
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
