import CodeBlock from "@/components/CodeBlock";
import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

export default function WhyDarkMode() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 70
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          ダークモードはなぜ必要か
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          ダークモードは「見た目の好み」ではなく、アクセシビリティ、バッテリー効率、OS
          との一貫性に関わる設計上の要件です。 ブラウザと OS
          がどのようにテーマ情報を伝達するか、デザイナーとエンジニアがそれぞれ何を担うかを整理します。
        </p>

        <WhyNowBox
          tags={[
            "prefers-color-scheme",
            "WCAG",
            "Material Design",
            "Apple HIG",
            "アクセシビリティ",
          ]}
        >
          <p>
            デザイントークンを学ぶにあたり、「なぜ Light と Dark の 2
            テーマが必要なのか」を理解しておく必要があります。
            ダークモード対応は、OS・ブラウザ・デザインガイドライン・アクセシビリティ基準のすべてが要求する標準仕様です。
            この背景を知らずにトークン設計を始めると、後から全面的な再設計を迫られます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: ブラウザと OS の仕組み */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ブラウザと OS の仕組み
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ダークモードは OS レベルで設定され、ブラウザを経由して CSS
              に伝達されます。
              この伝達経路を理解することが、正しい実装の前提となります。
            </p>

            <h3 className="text-lg font-bold text-foreground mb-3">
              OS レベルのダークモード設定
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              主要な OS はすべて、システム全体のテーマ（ライト /
              ダーク）をユーザーが選択できる機能を備えています。 この設定は OS
              のアクセシビリティ機能の一部として位置づけられています。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">
                      OS
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      設定場所
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      導入バージョン
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">macOS</td>
                    <td className="p-3">システム設定 &gt; 外観</td>
                    <td className="p-3">Mojave (2018)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Windows</td>
                    <td className="p-3">設定 &gt; 個人用設定 &gt; 色</td>
                    <td className="p-3">Windows 10 1809 (2018)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">iOS</td>
                    <td className="p-3">設定 &gt; 画面表示と明るさ</td>
                    <td className="p-3">iOS 13 (2019)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Android</td>
                    <td className="p-3">
                      設定 &gt; ディスプレイ &gt; ダークテーマ
                    </td>
                    <td className="p-3">Android 10 (2019)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-bold text-foreground mb-3">
              prefers-color-scheme メディアクエリ
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ブラウザは OS のテーマ設定を読み取り、CSS の{" "}
              <code>prefers-color-scheme</code>{" "}
              メディアクエリを通じてウェブページに伝達します。
              この仕組みにより、ウェブアプリケーションはユーザーの OS
              設定に自動的に追従できます。
            </p>

            <CodeBlock
              language="css"
              title="prefers-color-scheme の基本的な使い方"
              code={`/* ライトモード（デフォルト） */
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a1a2e;
  --border-color: #e2e8f0;
}

/* ダークモード: OS 設定が dark のとき自動適用 */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #151d2b;
    --text-primary: #cdd5e0;
    --border-color: #2d3748;
  }
}

/* 使用側はテーマを意識しない */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}`}
            />

            <h3 className="text-lg font-bold text-foreground mb-3 mt-8">
              伝達経路の全体像
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              OS の設定がウェブページに届くまでの流れを整理します。
              ブラウザが仲介役となり、CSS と JavaScript
              の両方からテーマ情報にアクセスできます。
            </p>

            <CodeBlock
              language="text"
              title="テーマ伝達の流れ"
              code={`[OS 設定]          [ブラウザ]           [ウェブページ]
   │                    │                     │
   │  テーマ: dark      │                     │
   ├───────────────────>│                     │
   │                    │  CSS メディアクエリ   │
   │                    ├────────────────────>│
   │                    │  @media             │
   │                    │  (prefers-color-    │
   │                    │   scheme: dark)     │
   │                    │                     │
   │                    │  JavaScript API     │
   │                    ├────────────────────>│
   │                    │  window.            │
   │                    │  matchMedia(        │
   │                    │   '(prefers-color-  │
   │                    │    scheme: dark)')  │
   │                    │                     │`}
            />

            <h3 className="text-lg font-bold text-foreground mb-3 mt-8">
              JavaScript による検知
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              CSS だけでなく、JavaScript からも OS のテーマ設定を取得できます。
              React アプリケーションでは、この API
              を使ってテーマの状態管理を行います。
            </p>

            <CodeBlock
              language="ts"
              title="JavaScript で OS テーマを検知する"
              code={`// 現在のテーマを取得
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
console.log(isDark ? 'ダークモード' : 'ライトモード');

// テーマ変更をリアルタイムに監視
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', (e) => {
  console.log(e.matches ? 'ダークモードに変更' : 'ライトモードに変更');
});`}
            />

            <h3 className="text-lg font-bold text-foreground mb-3 mt-8">
              color-scheme meta タグ
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>color-scheme</code> meta タグは、ブラウザのネイティブ UI
              要素（スクロールバー、フォームコントロール、
              選択範囲のハイライト色など）にもテーマを反映させるための宣言です。
              CSS だけでは制御できない部分をカバーします。
            </p>

            <CodeBlock
              language="html"
              title="color-scheme の設定"
              code={`<!-- HTML の <head> 内 -->
<meta name="color-scheme" content="light dark">

<!-- CSS で設定する場合 -->
<style>
  :root {
    color-scheme: light dark;
  }
</style>

<!--
  この宣言により、ブラウザは以下を自動調整する:
  - スクロールバーの色
  - input, select, textarea のデフォルト背景色
  - テキスト選択時のハイライト色
  - デフォルトのリンク色
  - 「初回描画時の白フラッシュ」の防止
-->`}
            />

            <InfoBox type="warning" title="color-scheme を忘れると起こる問題">
              <p>
                CSS 変数でダークモードの色を設定しても、
                <code>color-scheme</code> の宣言がないと
                フォーム要素のデフォルト背景が白のまま残る、スクロールバーがライトテーマのままになる、
                ページ読み込み時に一瞬白い画面がフラッシュする、といった問題が発生します。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: なぜダークモードが必要か */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              なぜダークモードが必要か
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ダークモードは単なる見た目のバリエーションではありません。
              医学的根拠、ハードウェア特性、UX 原則の 3
              つの観点から必要性が裏付けられています。
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30">
                <h3 className="font-bold text-foreground mb-2">目の疲労軽減</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  暗い環境で明るい画面を見ると、瞳孔が収縮し、毛様体筋に負荷がかかります。
                  OLED
                  ディスプレイでは、ダークモードにより画面全体の輝度が低下するため、
                  長時間使用時の目の疲労を軽減できます。ただし、LCD
                  ディスプレイではバックライトの仕組み上、
                  暗い色を表示していても輝度の低下は限定的です。
                </p>
              </div>

              <div className="p-4 rounded-r-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/30">
                <h3 className="font-bold text-foreground mb-2">
                  アクセシビリティ
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  光過敏症（Photophobia）の人にとって、明るい画面は物理的な苦痛を伴います。
                  片頭痛の誘因となる場合もあります。
                  ロービジョンのユーザーの中には、暗い背景に明るいテキストのほうが読みやすいと報告する人がいます。
                  ダークモードの提供は、これらのユーザーへの配慮として機能します。
                </p>
              </div>

              <div className="p-4 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30">
                <h3 className="font-bold text-foreground mb-2">
                  バッテリー消費
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  OLED
                  ディスプレイでは、黒いピクセルは文字通り発光しないため、電力を消費しません。
                  Google の調査によると、YouTube
                  アプリでダークモードを使用した場合、 OLED 画面の最大輝度時で約
                  60% のバッテリー節約になるとされています。
                  スマートフォンの大半が OLED
                  を採用する現在、これは実用的な利点です。
                </p>
              </div>

              <div className="p-4 rounded-r-lg border-l-4 border-violet-500 bg-violet-50 dark:bg-violet-950/30">
                <h3 className="font-bold text-foreground mb-2">
                  ユーザーの選択権
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Apple Human Interface Guidelines は「ユーザーの好みを尊重する
                  (Respect user preferences)」を 基本原則として掲げています。OS
                  で設定したテーマがアプリに反映されないことは、
                  この原則に反します。
                  ニールセンのユーザビリティヒューリスティック
                  #4「一貫性と標準」の観点からも、 OS
                  のテーマ設定にアプリが追従することは、ユーザーの期待に沿う振る舞いです。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="数値で見るダークモード普及率">
              <p>
                Android
                の設定データによると、ダークモードを有効にしているユーザーは 80%
                以上です（2023 年時点）。 macOS / iOS
                でも過半数がダークモードを使用しているとされています。
                ダークモードは「一部のこだわり派の機能」ではなく、大多数のユーザーが日常的に使う標準機能です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 3: 誰が作り、誰が使うか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              誰が作り、誰が使うか
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ダークモード対応は、デザイナーとエンジニアの共同作業です。
              それぞれの役割と、よくある失敗パターンを整理します。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">
                      担当
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      責務
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      成果物
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">デザイナー</td>
                    <td className="p-3">
                      Light / Dark の 2 テーマを Figma
                      上で設計。セマンティックなトークン名を定義
                    </td>
                    <td className="p-3">
                      Figma の
                      Variables、カラーパレット、コントラスト比の検証結果
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">エンジニア</td>
                    <td className="p-3">
                      CSS 変数でテーマ切替を実装。
                      <code>prefers-color-scheme</code> を検知して自動切替
                    </td>
                    <td className="p-3">
                      CSS 変数定義、テーマ切替ロジック、Storybook での検証
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">共同</td>
                    <td className="p-3">
                      トークン名の命名規則を合意。各モードでのコントラスト比を検証
                    </td>
                    <td className="p-3">
                      デザイントークン仕様書、カラー対応表
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-bold text-foreground mb-3">
              「ライトを反転するだけ」では不十分な理由
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ダークモードの設計でもっとも多い失敗は、ライトモードの色を単純に反転させることです。
              以下の 3 つの理由から、ダーク用に独立した設計が必要です。
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">
                  1. コントラスト比の再計算
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ライトモードで WCAG AA (4.5:1)
                  を満たしていた色の組み合わせが、
                  単純に反転するとコントラスト不足になることがあります。
                  特にグレーの中間調は、ダークモードで視認性が低下しやすい領域です。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">
                  2. 影とエレベーションの調整
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ライトモードでは <code>box-shadow</code>{" "}
                  で奥行きを表現しますが、
                  暗い背景の上に暗い影を落としても視認できません。 Material
                  Design 3 では、ダークモードのエレベーションを影ではなく
                  surface の明度差（tonal overlay）で表現します。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">
                  3. 画像と装飾の明度調整
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  白い背景を前提にした画像やイラストは、ダークモードで浮いて見えます。
                  <code>filter: brightness(0.85)</code> で全体を少し暗くするか、
                  ダークモード用の素材を別途用意する対応が必要です。
                </p>
              </div>
            </div>

            <CodeBlock
              language="css"
              title="反転だけでは不十分な例"
              code={`/* NG: 単純な色反転 */
:root {
  --surface: #ffffff;
  --on-surface: #1a1a2e;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
@media (prefers-color-scheme: dark) {
  :root {
    --surface: #1a1a2e;      /* 反転 */
    --on-surface: #ffffff;    /* 反転 */
    --shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 同じ → 見えない */
  }
}

/* OK: ダーク用に個別設計 */
@media (prefers-color-scheme: dark) {
  :root {
    --surface: #1e293b;
    --on-surface: #cdd5e0;   /* 純白ではなく少し抑えた色 */
    --shadow: none;           /* 影の代わりにボーダーで区切る */
    --surface-elevated: #273449; /* 明度差でエレベーション表現 */
  }
}`}
            />
          </section>

          {/* セクション 4: Material Design と Apple HIG の方針比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Material Design と Apple HIG の方針比較
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Google の Material Design 3 と Apple の Human Interface Guidelines
              は、
              ダークモードに対して異なるアプローチを取りながらも、根底にある思想は共通しています。
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30">
                <h3 className="font-bold text-foreground mb-2">
                  Material Design 3
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                  <li>
                    <strong>Dynamic Color:</strong>{" "}
                    ユーザーの壁紙からキーカラーを抽出し、 Light / Dark
                    両方のカラースキームを自動生成する
                  </li>
                  <li>
                    <strong>Surface tones:</strong> ダークモードの背景は純黒
                    (#000000) ではなく、 微妙に色味を持たせた暗色（#1C1B1F
                    など）を推奨する
                  </li>
                  <li>
                    <strong>Elevation with tonal overlay:</strong>{" "}
                    ダークモードではシャドウの代わりに、
                    エレベーションが高い要素ほど surface を明るくする。
                    Elevation 0 = #1C1B1F、Elevation 1 = #2B2930
                    のように段階的に変化する
                  </li>
                  <li>
                    <strong>カラーロール:</strong> Primary, Secondary, Tertiary,
                    Error の各色に on-*, *-container, on-*-container
                    の派生色を定義する
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-r-lg border-l-4 border-gray-500 bg-gray-50 dark:bg-gray-950/30">
                <h3 className="font-bold text-foreground mb-2">
                  Apple Human Interface Guidelines
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                  <li>
                    <strong>Semantic colors:</strong> <code>label</code>,{" "}
                    <code>secondaryLabel</code>,<code> systemBackground</code>,{" "}
                    <code>secondarySystemBackground</code> など、
                    用途に基づいた名前でシステムカラーを定義する
                  </li>
                  <li>
                    <strong>Vibrancy:</strong>{" "}
                    背景の上にかぶさるコンテンツに半透明のブラー効果を適用する。
                    ダークモードでは背景色を透過させることで奥行きを表現する
                  </li>
                  <li>
                    <strong>Materials:</strong> Thick / Regular / Thin /
                    Ultrathin の 4 段階のブラー効果を Light / Dark
                    それぞれに用意する
                  </li>
                  <li>
                    <strong>Elevated appearance:</strong> iPad
                    のスプリットビューなど、 elevated な文脈では通常より明るい
                    base color を使用する
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-bold text-foreground mb-3">
              共通する設計原則
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Material Design と Apple HIG
              は、表面上は異なるアプローチを取りますが、
              根底にある原則は一致しています。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">
                      原則
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      Material Design 3
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      Apple HIG
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">セマンティックな色名</td>
                    <td className="p-3">on-surface, surface-variant</td>
                    <td className="p-3">label, secondaryLabel</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">具体値の抽象化</td>
                    <td className="p-3">Color Role で用途を定義</td>
                    <td className="p-3">System Color で用途を定義</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">純黒の回避</td>
                    <td className="p-3">#000 は使わず toned surface</td>
                    <td className="p-3">#000 は使わず systemBackground</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">エレベーション表現</td>
                    <td className="p-3">明度差 (tonal overlay)</td>
                    <td className="p-3">Vibrancy / Materials</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="css"
              title="セマンティックな色名の実装例"
              code={`/*
 * 具体的な色値ではなく、用途に基づいた名前を使う
 * → テーマを切り替えても、使用側のコードは変更不要
 */
:root {
  /* Surface: 背景 */
  --color-surface: #ffffff;
  --color-surface-elevated: #f8fafc;
  --color-on-surface: #1a1a2e;

  /* Primary: 主要アクション */
  --color-primary: #6366f1;
  --color-on-primary: #ffffff;
  --color-primary-container: #e0e0ff;

  /* Border */
  --color-outline: #e2e8f0;
  --color-outline-variant: #cbd5e1;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: #151d2b;
    --color-surface-elevated: #1e293b;
    --color-on-surface: #cdd5e0;

    --color-primary: #a5b4fc;
    --color-on-primary: #312e81;
    --color-primary-container: #3730a3;

    --color-outline: #2d3748;
    --color-outline-variant: #4a5568;
  }
}`}
            />

            <InfoBox type="info" title="なぜセマンティックな名前が必要か">
              <p>
                <code>--color-blue-500</code>{" "}
                のような具体的な色名でトークンを定義すると、
                ダークモードで「青」が別の色味になったときに名前と値が矛盾します。
                <code>--color-primary</code>{" "}
                のように用途ベースの名前にすることで、
                テーマが変わっても名前の意味は一貫します。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: WCAG コントラスト比 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              WCAG コントラスト比
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ダークモードでは、コントラスト比の調整がライトモードより繊細です。
              「暗い背景だから明るい文字にすればいい」という単純な考えでは、
              別の種類の問題が発生します。
            </p>

            <h3 className="text-lg font-bold text-foreground mb-3">
              WCAG 基準の概要
            </h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">
                      レベル
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      通常テキスト
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      大きなテキスト (18px bold / 24px)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">AA（最低基準）</td>
                    <td className="p-3">4.5 : 1 以上</td>
                    <td className="p-3">3 : 1 以上</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">AAA（推奨基準）</td>
                    <td className="p-3">7 : 1 以上</td>
                    <td className="p-3">4.5 : 1 以上</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-bold text-foreground mb-3">
              ダークモードのコントラスト問題
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ダークモードでは、コントラスト比が高すぎても低すぎても問題です。
              暗い背景に純白のテキストを置くと、コントラスト比が最大の 21:1
              になり、 長時間の読書で目が疲れます（ハレーション効果）。
              推奨される範囲と具体例を以下に示します。
            </p>

            <CodePreview
              previewOnly
              code={`function ContrastComparison() {
  const examples = [
    {
      label: 'NG: コントラスト強すぎ',
      fg: '#FFFFFF',
      bg: '#000000',
      ratio: '21:1',
      verdict: 'NG',
      note: '純白 + 純黒。ハレーション効果で長時間閲覧に不向き',
      verdictColor: '#EF4444',
    },
    {
      label: '推奨: 適度なコントラスト',
      fg: '#CDD5E0',
      bg: '#151D2B',
      ratio: '9.5:1',
      verdict: 'AAA',
      note: '十分なコントラストを保ちつつ、目に負担が少ない',
      verdictColor: '#22C55E',
    },
    {
      label: 'NG: コントラスト不足',
      fg: '#6B7280',
      bg: '#1F2937',
      ratio: '3.2:1',
      verdict: 'FAIL',
      note: '通常テキストの AA 基準 (4.5:1) を下回る',
      verdictColor: '#EF4444',
    },
  ];

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        ダークモードのコントラスト比 比較
      </p>
      {examples.map((ex, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'center' }}>
          <div style={{
            background: ex.bg,
            color: ex.fg,
            padding: '20px 24px',
            borderRadius: '8px',
            fontSize: '15px',
            lineHeight: 1.6,
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{ fontWeight: 700, marginBottom: '4px' }}>{ex.label}</div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>
              The quick brown fox jumps over the lazy dog.
              <br />
              素早い茶色の狐が怠け者の犬を飛び越える。
            </div>
          </div>
          <div style={{ textAlign: 'center', minWidth: '100px' }}>
            <div style={{
              fontSize: '20px',
              fontWeight: 800,
              color: ex.verdictColor,
              marginBottom: '2px',
            }}>
              {ex.ratio}
            </div>
            <div style={{
              display: 'inline-block',
              padding: '2px 10px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 700,
              color: 'white',
              background: ex.verdictColor,
            }}>
              {ex.verdict}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.3 }}>
              {ex.note}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}`}
              language="tsx"
              title="コントラスト比の比較: 強すぎ / 適切 / 不足"
            />

            <h3 className="text-lg font-bold text-foreground mb-3 mt-8">
              推奨値の根拠
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              前景 <code>#CDD5E0</code> / 背景 <code>#151D2B</code>{" "}
              の組み合わせが推奨される理由は以下の通りです。
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">
                  コントラスト比 9.5:1
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  WCAG AAA
                  基準（7:1）を十分に超えており、どのユーザーにとっても読みやすい。
                  一方で 21:1（純白 +
                  純黒）のような過剰なコントラストではないため、
                  ハレーション効果を避けられます。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">
                  背景 #151D2B が純黒でない理由
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  純黒 (#000000) の背景は OLED
                  ディスプレイで「スミア」と呼ばれるにじみ現象を引き起こすことがあります。
                  スクロール時に暗い背景と明るいテキストの境界がにじんで見えるのがその症状です。
                  わずかに明るい暗色 (#151D2B)
                  を使うことで、この問題を軽減できます。
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">
                  前景 #CDD5E0 が純白でない理由
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  純白 (#FFFFFF) のテキストは暗い背景上で「輝いて」見え、
                  文字の輪郭がにじむハレーション効果が発生します。
                  わずかに彩度を落とした #CDD5E0 を使うことで、
                  十分な視認性を保ちつつ、長時間の読書でも目が疲れにくくなります。
                </p>
              </div>
            </div>

            <CodeBlock
              language="css"
              title="ダークモードのテキスト階層設計"
              code={`@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #151d2b;

    /* テキスト階層: 高コントラスト → 低コントラスト */
    --color-text-primary: #cdd5e0;     /* 9.5:1 - 見出し、本文 */
    --color-text-secondary: #94a3b8;   /* 5.4:1 - 補助テキスト (AA) */
    --color-text-tertiary: #64748b;    /* 3.4:1 - ラベル (大文字のみ AA) */
    --color-text-disabled: #475569;    /* 2.1:1 - 非活性 (装飾的要素) */

    /* 注意: tertiary 以下は通常テキストの AA を満たさない */
    /* → 小さい文字には使わない。アイコンや装飾要素に限定する */
  }
}`}
            />

            <InfoBox type="warning" title="コントラスト比の検証ツール">
              <p>
                設計時に必ずコントラスト比を検証してください。 Chrome DevTools
                の Color Picker には WCAG コントラスト比の表示機能があります。
                また、Figma の Contrast プラグインや{" "}
                <code>webaim.org/resources/contrastchecker</code>{" "}
                も利用できます。
                「目で見て読めるから大丈夫」という判断は、ロービジョンのユーザーを考慮していません。
              </p>
            </InfoBox>
          </section>

          {/* セクション 6: ライト/ダーク比較デモ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ライト/ダーク比較デモ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              同一のカードコンポーネントが、ライトモードとダークモードでどのように変化するかを比較します。
              色の反転だけでなく、影の処理、テキストの明度、ボーダーの強度が異なることに注目してください。
            </p>

            <CodePreview
              previewOnly
              code={`function LightDarkComparison() {
  const cardStyle = (isDark) => ({
    background: isDark ? '#1e293b' : '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
    boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
    flex: 1,
    minWidth: '240px',
  });

  const containerBg = (isDark) => ({
    background: isDark ? '#0f172a' : '#f8fafc',
    padding: '20px',
    borderRadius: '12px',
    flex: 1,
    minWidth: '260px',
  });

  const heading = (isDark) => ({
    color: isDark ? '#cdd5e0' : '#1a1a2e',
    fontSize: '16px',
    fontWeight: 700,
    margin: '0 0 8px',
  });

  const text = (isDark) => ({
    color: isDark ? '#94a3b8' : '#64748b',
    fontSize: '13px',
    lineHeight: 1.6,
    margin: '0 0 16px',
  });

  const btn = (isDark) => ({
    background: isDark ? '#818cf8' : '#6366f1',
    color: isDark ? '#1e1b4b' : '#ffffff',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
  });

  const badge = (isDark) => ({
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 600,
    background: isDark ? '#1e1b4b' : '#eef2ff',
    color: isDark ? '#a5b4fc' : '#4338ca',
    marginBottom: '12px',
  });

  const label = (isDark) => ({
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: isDark ? '#64748b' : '#94a3b8',
    marginBottom: '12px',
  });

  const renderCard = (isDark) => (
    <div style={containerBg(isDark)}>
      <div style={label(isDark)}>{isDark ? 'Dark Mode' : 'Light Mode'}</div>
      <div style={cardStyle(isDark)}>
        <div style={badge(isDark)}>New</div>
        <h3 style={heading(isDark)}>プロジェクト設定</h3>
        <p style={text(isDark)}>
          テーマ、言語、通知の設定を管理します。変更は即座に反映されます。
        </p>
        <button style={btn(isDark)}>設定を開く</button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: '16px', padding: '16px', flexWrap: 'wrap' }}>
      {renderCard(false)}
      {renderCard(true)}
    </div>
  );
}`}
              language="tsx"
              title="同一コンポーネントの Light / Dark 比較"
              previewHeight={340}
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              上の比較で確認できるポイントは以下の通りです。
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground text-sm mb-4">
              <li>
                ダークモードのカードには <code>box-shadow</code>{" "}
                がなく、代わりにボーダーで区切られている
              </li>
              <li>
                テキスト色は純白ではなく、<code>#cdd5e0</code>（プライマリ）と{" "}
                <code>#94a3b8</code>（セカンダリ）の階層がある
              </li>
              <li>
                ボタンの色はダークモードで少し明るい <code>#818cf8</code>{" "}
                に変わり、テキストは暗色に反転している
              </li>
              <li>バッジの背景色もダークモード用に個別設計されている</li>
            </ul>
          </section>

          {/* Quiz */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              理解度チェック
            </h2>

            <Quiz
              question="ダークモードで純黒 (#000000) の背景を避けるべき理由として、最も適切なものはどれですか？"
              options={[
                {
                  label:
                    "CSS の仕様で #000000 をダークモードの背景に使うことは禁止されている",
                },
                {
                  label:
                    "OLED ディスプレイでスミア（にじみ）が発生し、スクロール時にテキストの境界がぼやける",
                  correct: true,
                },
                {
                  label:
                    "#000000 はすべてのブラウザで正しくレンダリングされない",
                },
                {
                  label:
                    "Material Design が #000000 の使用を完全に禁止している",
                },
              ]}
              explanation="OLED ディスプレイでは、完全な黒のピクセルはオフ状態です。スクロール時にオフ → オンの切り替えに遅延が生じ、テキストの境界がにじむ「スミア」が発生します。Material Design 3 も Apple HIG も純黒を避けることを推奨していますが、「禁止」ではありません。微妙に明るい暗色（#151D2B など）を使うことでこの問題を軽減できます。"
            />

            <Quiz
              question="prefers-color-scheme メディアクエリについて正しい記述はどれですか？"
              options={[
                {
                  label:
                    "JavaScript からのみアクセスでき、CSS では使用できない",
                },
                { label: "ユーザーがウェブサイト内で手動設定した値を返す" },
                {
                  label:
                    "OS レベルのテーマ設定をブラウザが読み取り、CSS と JavaScript の両方から参照できる",
                  correct: true,
                },
                {
                  label:
                    "サーバーサイドでのみ評価され、クライアントサイドでは無効になる",
                },
              ]}
              explanation="prefers-color-scheme は OS のテーマ設定をブラウザが仲介する仕組みです。CSS では @media (prefers-color-scheme: dark) { ... } で、JavaScript では window.matchMedia('(prefers-color-scheme: dark)') でアクセスできます。ウェブサイト独自のテーマ切替機能とは別の仕組みであり、OS の設定を反映します。"
            />
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "MDN: prefers-color-scheme",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme",
                  description: "メディアクエリの仕様と対応ブラウザ一覧",
                },
                {
                  title: "Material Design 3: Dark theme",
                  url: "https://m3.material.io/styles/color/dynamic/choosing-a-source",
                  description:
                    "Material Design 3 のダークテーマ設計ガイドライン",
                },
                {
                  title: "Apple HIG: Dark Mode",
                  url: "https://developer.apple.com/design/human-interface-guidelines/dark-mode",
                  description: "Apple のダークモード設計原則",
                },
                {
                  title: "WCAG 2.1: Contrast (Minimum)",
                  url: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html",
                  description: "コントラスト比の最低基準と計算方法",
                },
                {
                  title: "WebAIM Contrast Checker",
                  url: "https://webaim.org/resources/contrastchecker/",
                  description: "前景色と背景色のコントラスト比を計算するツール",
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
