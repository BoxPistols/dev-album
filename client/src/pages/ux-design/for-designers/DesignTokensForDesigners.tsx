import { Link } from "wouter";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

export default function DesignTokensForDesigners() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 12</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          デザイントークン入門（デザイナー向け）
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          デザイントークンとは、「デザインの決め事に名前をつけたもの」です。
          このページはコードを書いたことがないデザイナーに向けて、コード無しでトークンの考え方と
          Figma
          での実践手順を説明します。エンジニアの方も、デザイナーとの共通言語を確認する目的で読めます。
        </p>

        <WhyNowBox
          tags={[
            "デザイナー向け",
            "デザイントークン",
            "Figma Variables",
            "共通言語",
            "AI 駆動開発",
          ]}
        >
          <p>
            AI
            にデザインの実装を任せる開発が広がるほど、「この色」「あの余白」という指差しは通用しなくなります。
            デザインの決め事に名前がついていれば、デザイナー・エンジニア・AI
            の三者が同じ言葉で同じ結果を指せます。
            トークンはそのための語彙です。このセクション（STEP
            12〜14）はデザイナーを読者として書かれています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: トークン = 決め事に名前をつけたもの */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              トークンは「決め事に名前をつけたもの」
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              普段のデザイン作業でも「メインの青はこれ」「カードの角丸はいつもこのくらい」という決め事は既に持っているはずです。
              その決め事ひとつひとつに名前をつけて、一覧表にしたものがデザイントークンです。
              新しい技術ではなく、頭の中のルールを名前つきで外に出す作業だと考えてください。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* 色の決め事 */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-3">色の決め事</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary flex-shrink-0 border border-border" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        メインの色
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ボタン・リンクに使う
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-foreground flex-shrink-0 border border-border" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        本文の色
                      </p>
                      <p className="text-xs text-muted-foreground">
                        読ませるテキストに使う
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-muted flex-shrink-0 border border-border" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        薄い背景の色
                      </p>
                      <p className="text-xs text-muted-foreground">
                        セクションの区切りに使う
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 余白の決め事 */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-3">余白の決め事</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-4 w-2 bg-primary/40 rounded-sm flex-shrink-0"
                      style={{ width: "8px" }}
                    />
                    <p className="text-sm text-foreground/80">
                      せまい余白（8px）— アイコンと文字の間
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="h-4 bg-primary/40 rounded-sm flex-shrink-0"
                      style={{ width: "16px" }}
                    />
                    <p className="text-sm text-foreground/80">
                      ふつうの余白（16px）— カードの内側
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="h-4 bg-primary/40 rounded-sm flex-shrink-0"
                      style={{ width: "32px" }}
                    />
                    <p className="text-sm text-foreground/80">
                      広い余白（32px）— セクションの間
                    </p>
                  </div>
                </div>
              </div>

              {/* 角丸の決め事 */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-3">角丸の決め事</h3>
                <div className="flex items-end gap-4">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-primary/15 border border-primary/30 rounded-sm mb-2" />
                    <p className="text-xs text-muted-foreground">
                      小（4px）
                      <br />
                      タグ
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-14 h-14 bg-primary/15 border border-primary/30 rounded-lg mb-2" />
                    <p className="text-xs text-muted-foreground">
                      中（8px）
                      <br />
                      ボタン
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-14 h-14 bg-primary/15 border border-primary/30 rounded-2xl mb-2" />
                    <p className="text-xs text-muted-foreground">
                      大（16px）
                      <br />
                      カード
                    </p>
                  </div>
                </div>
              </div>

              {/* 文字の決め事 */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-3">文字の決め事</h3>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-foreground">
                    見出し（20px / 太字）
                  </p>
                  <p className="text-base text-foreground/80">
                    本文（16px / 標準）
                  </p>
                  <p className="text-xs text-muted-foreground">
                    補足（12px / 薄い色）
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="このページの前提">
              <p>
                トークンの 3 層構造や Atomic Design の概念は{" "}
                <Link href="/ux-design/ui-design/design-system">
                  <span className="text-primary underline cursor-pointer">
                    デザインシステム構築
                  </span>
                </Link>
                （STEP 10）で紹介しています。このページは概念の復習ではなく、
                「デザイナーが自分の Figma
                でトークンを実践する」ことに踏み込みます。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: Figma Variables との対応 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Figma Variables はトークンそのもの
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              トークンのために新しいツールを覚える必要はありません。Figma の
              Variables
              パネルにある機能が、そのままトークンの仕組みに対応しています。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-3 font-semibold text-foreground">
                        トークンの世界の言葉
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">
                        Figma での名前
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">
                        何をするか
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">
                        トークン
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        Variable（変数）
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        名前と値のペア。色・数値・文字列を登録できる
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">
                        トークンの分類
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        Collection（コレクション）
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        Variables をまとめるフォルダ。「色」「余白」などで分ける
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">
                        テーマ切り替え
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        Mode（モード）
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        同じ名前に Light / Dark など複数の値を持たせる
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">
                        トークンの参照
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        Alias（エイリアス）
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        値を直接入れず、別の Variable
                        を指す。「この色はあの色と同じ」
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <InfoBox type="success" title="つまり">
              <p>
                Figma で Variables
                を整理して名前をつける作業が、そのままチームのデザイントークン設計になります。
                エンジニアはその名前をコード側の変数名として引き継ぎます。名前が共有資産です。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: 3層構造を比喩で + Figma 実践手順 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              3 層構造 — 原液・用途名・部品専用
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              トークンは 3 段階に分けて名前をつけると運用しやすくなります。
              飲み物にたとえると「原液 → 用途に合わせて薄めたもの →
              特定の料理専用の割り方」の関係です。
            </p>

            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-24 text-right text-xs font-medium text-muted-foreground flex-shrink-0 pt-2">
                    Global
                    <br />
                    （原液）
                  </div>
                  <div className="flex-1 rounded-lg bg-muted/50 border border-border px-4 py-3">
                    <p className="text-sm font-medium text-foreground">
                      blue-600 = 濃い青
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ただの色。まだ「何に使うか」は決まっていない
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 flex-shrink-0" />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="text-muted-foreground ml-6"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 2v12M4 10l4 4 4-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-24 text-right text-xs font-medium text-muted-foreground flex-shrink-0 pt-2">
                    Alias
                    <br />
                    （用途名）
                  </div>
                  <div className="flex-1 rounded-lg bg-primary/5 border border-primary/20 px-4 py-3">
                    <p className="text-sm font-medium text-foreground">
                      色/アクション = blue-600 を指す
                    </p>
                    <p className="text-xs text-primary mt-1">
                      「押せるものの色」という役割の名前。中身の青は後から差し替えられる
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 flex-shrink-0" />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="text-muted-foreground ml-6"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 2v12M4 10l4 4 4-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-24 text-right text-xs font-medium text-muted-foreground flex-shrink-0 pt-2">
                    Component
                    <br />
                    （部品専用）
                  </div>
                  <div className="flex-1 rounded-lg bg-primary/10 border border-primary/30 px-4 py-3">
                    <p className="text-sm font-medium text-foreground">
                      ボタン/背景 = 色/アクション を指す
                    </p>
                    <p className="text-xs text-primary mt-1">
                      ボタンという部品だけが使う名前。部品単位で例外を作りたいときの逃げ道になる
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-4">
              自分の Figma で実践する手順
            </h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--background)" }}
                  >
                    1
                  </span>
                </div>
                <div className="flex-1 rounded-xl border border-border bg-card p-5">
                  <h4 className="font-bold text-foreground mb-2">
                    Collection を 2 つ作る
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    ローカルバリアブルのパネルで「Primitives（原液）」と「Semantic（用途名）」の
                    2 つの Collection を作ります。最初から 3
                    層すべては作らず、Component 層は必要になってからで十分です。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--background)" }}
                  >
                    2
                  </span>
                </div>
                <div className="flex-1 rounded-xl border border-border bg-card p-5">
                  <h4 className="font-bold text-foreground mb-2">
                    Primitives に色の原液を登録する
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    今使っている色を全部集め、blue-100〜blue-900
                    のような濃さの段階つきの名前で登録します。
                    ここでは「何に使うか」を考えなくて構いません。似た色が複数見つかったら統合のチャンスです。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--background)" }}
                  >
                    3
                  </span>
                </div>
                <div className="flex-1 rounded-xl border border-border bg-card p-5">
                  <h4 className="font-bold text-foreground mb-2">
                    Semantic に用途名をつけて Alias で繋ぐ
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    「text/primary」「bg/card」「border/default」のような役割の名前で
                    Variable を作り、 値には Primitives の色を Alias
                    として指定します。デザインで実際に使うのはこちらの名前だけです。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--background)" }}
                  >
                    4
                  </span>
                </div>
                <div className="flex-1 rounded-xl border border-border bg-card p-5">
                  <h4 className="font-bold text-foreground mb-2">
                    Mode で Dark テーマの値を足す
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Semantic の Collection に「Dark」Mode
                    を追加し、同じ名前に暗い背景用の値を割り当てます。
                    フレームの Mode
                    を切り替えるだけで、全画面が一括でダークテーマに変わることを確認してください。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* セクション4: 名前の付け方 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              名前の付け方 — 見た目名より役割名
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              トークン設計で最も価値があるのは名前の付け方です。「blue-500（見た目の名前）」と
              「text-primary（役割の名前）」の違いは、ダークモードを作った瞬間にはっきりします。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-red-200 dark:border-red-800 bg-card p-5">
                <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-3">
                  見た目の名前だけで運用した場合
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  「本文は blue-900」と決めていたのに、ダークモードでは blue-900
                  は背景に沈んで読めません。「blue-900
                  なのに実際は薄い水色」という矛盾した指定が生まれ、
                  名前が嘘をつき始めます。
                </p>
                <div
                  className="rounded-lg p-3 flex items-center justify-between"
                  style={{ backgroundColor: "#18181B" }}
                >
                  <span className="text-sm" style={{ color: "#1E3A8A" }}>
                    blue-900 の本文…読めない
                  </span>
                </div>
              </div>
              <div className="rounded-xl border border-green-200 dark:border-green-800 bg-card p-5">
                <p className="text-xs font-bold text-green-600 dark:text-green-400 mb-3">
                  役割の名前で運用した場合
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  「本文は text-primary」と決めておけば、Light では濃い色、Dark
                  では明るい色を同じ名前に割り当てるだけです。名前は「本文の色」という役割を指し続け、矛盾しません。
                </p>
                <div className="space-y-2">
                  <div
                    className="rounded-lg p-3 border border-border"
                    style={{ backgroundColor: "#FAFAFA" }}
                  >
                    <span className="text-sm" style={{ color: "#3F3F46" }}>
                      text-primary（Light の値）
                    </span>
                  </div>
                  <div
                    className="rounded-lg p-3"
                    style={{ backgroundColor: "#18181B" }}
                  >
                    <span className="text-sm" style={{ color: "#E4E4E7" }}>
                      text-primary（Dark の値）
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="見た目名が不要なわけではない">
              <p>
                blue-500 のような見た目の名前は Global（原液）層で使います。
                役割名（Alias
                層）が原液を指す構造にすることで、「役割は固定、中身は差し替え可能」になります。
                デザイン作業やエンジニアへの指定で使うのは役割名の方です。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: エンジニア・AI との会話が変わる */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              トークンがあると依頼が 1 文で済む
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              トークンの効果が最初に表れるのは、エンジニアや AI
              への依頼の場面です。
              スクリーンショットに矢印を引いて説明していた内容が、名前ひとつで正確に伝わるようになります。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-3 font-semibold text-foreground">
                        トークンなしの依頼
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">
                        トークンありの依頼
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 text-foreground/80">
                        「ボタンの青、もう少し落ち着いた感じにできますか？場所は設定画面と、あとトップにもあって…」
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        「color/action の値を blue-600 から blue-700
                        に変えてください」→ 全画面に一括反映
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-foreground/80">
                        「カードの中の余白、ここは 16 でここは 20
                        になってるので揃えてほしいです（スクショ添付）」
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        「カード内側の余白は space-4（16px）に統一してください」
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-foreground/80">
                        「ダークモードのときだけ文字が見づらいので、いい感じに調整お願いします」
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        「Dark Mode の text-secondary が暗すぎるので、1
                        段明るい値に変えてください」
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-foreground/80 mb-4 leading-relaxed">
              エンジニアがトークンをコードでどう実装しているかは{" "}
              <Link href="/react/design-tokens/tokens-practice">
                <span className="text-primary underline cursor-pointer">
                  デザイントークンの実践（React マニュアル）
                </span>
              </Link>
              で解説しています。読まなくてもデザイン作業には支障ありませんが、
              「Figma の Variables
              とコードの変数が同じ名前で繋がっている」ことが見えると、ハンドオフの精度が上がります。
            </p>
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>

            <Quiz
              question="ダークモード対応を見据えたとき、デザイン作業で使う名前として適切なのはどれ？"
              options={[
                { label: "blue-900（色の見た目そのままの名前）" },
                { label: "text-primary（役割を表す名前）", correct: true },
                { label: "iro-01（連番の名前）" },
                { label: "noriko-blue（決めた人の名前）" },
              ]}
              explanation="役割名（text-primary = 本文の色）なら、Light と Dark で中身の色を差し替えても名前と実態が矛盾しません。見た目名（blue-900）は Global 層（原液）でのみ使い、作業では役割名を使います。"
            />

            <Quiz
              question="Figma でトークンの「テーマ切り替え」（Light / Dark で同じ名前に別の値を持たせる）を実現する機能はどれ？"
              options={[
                { label: "Auto Layout" },
                { label: "Component Property" },
                { label: "Variables の Mode", correct: true },
                { label: "Dev Mode" },
              ]}
              explanation="Variables の Mode を使うと、1 つの Variable（トークン）に Light / Dark など複数の値を持たせ、フレーム単位で切り替えられます。Auto Layout はレイアウト、Component Property は部品の差し替え、Dev Mode はエンジニア向けの検査画面の機能です。"
            />
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "W3C Design Tokens Community Group",
                  url: "https://www.w3.org/community/design-tokens/",
                  description:
                    "デザイントークンの標準仕様を策定しているコミュニティグループ。Figma や Adobe も参加",
                },
                {
                  title: "Figma: Guide to variables",
                  url: "https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma",
                  description:
                    "Figma Variables の公式ガイド。Collection・Mode・Alias の操作方法",
                },
                {
                  title: "Material Design 3",
                  url: "https://m3.material.io/",
                  description:
                    "Google のデザインシステム。トークンの命名と階層設計の実例として参考になる",
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
