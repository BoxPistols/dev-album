import { Link } from "wouter";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

export default function ComponentThinking() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 13</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          コンポーネント思考
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          「ページをコピーして直す」から「部品を直すと全ページに反映される」への発想転換がコンポーネント思考です。
          このページはデザイナー向けに、Figma
          のコンポーネント機能とエンジニアの部品づくりが
          同じ考え方であることを、コード無しで説明します。
        </p>

        <WhyNowBox
          tags={[
            "デザイナー向け",
            "コンポーネント",
            "バリアント",
            "Figma",
            "ハンドオフ",
          ]}
        >
          <p>
            エンジニアも AI も、画面を「部品の組み合わせ」として作ります。
            デザイナーが Figma
            で部品の構造を揃えておくと、実装側はその構造をそのまま写せます。
            逆に部品化されていないデザインは、実装のたびに「これは同じボタン？別物？」という確認が発生します。
            部品の考え方と伝え方を身につけることが、このページの目標です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: 発想転換 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              コピーして直す vs 部品を直す
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              ボタンの色を変えたいとき、5 つの画面それぞれのボタンを 1
              個ずつ直すのが「コピー運用」、 大元のボタンを 1
              回直して全画面に反映させるのが「部品運用」です。 画面が 5
              枚のうちは差がわずかですが、50 枚になると決定的な差になります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-red-200 dark:border-red-800 bg-card p-5">
                <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-3">
                  コピー運用 — 5 画面 × 1 個ずつ修正
                </p>
                <div className="space-y-2 mb-3">
                  {["トップ", "一覧", "詳細", "設定", "マイページ"].map(
                    (page) => (
                      <div
                        key={page}
                        className="flex items-center justify-between rounded-lg bg-muted/40 border border-border px-3 py-2"
                      >
                        <span className="text-xs text-muted-foreground">
                          {page}画面
                        </span>
                        <span
                          className="px-2 py-0.5 rounded bg-primary/80 text-[11px]"
                          style={{ color: "var(--background)" }}
                        >
                          個別に修正
                        </span>
                      </div>
                    ),
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  修正漏れが起きる。1
                  個だけ古いままのボタンが残り、「どれが正しい状態か」が分からなくなる。
                </p>
              </div>
              <div className="rounded-xl border border-green-200 dark:border-green-800 bg-card p-5">
                <p className="text-xs font-bold text-green-600 dark:text-green-400 mb-3">
                  部品運用 — 大元を 1 回修正
                </p>
                <div className="rounded-lg bg-primary/10 border border-primary/30 px-3 py-2 mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">
                    大元のボタン（Main Component）
                  </span>
                  <span
                    className="px-2 py-0.5 rounded bg-primary text-[11px]"
                    style={{ color: "var(--background)" }}
                  >
                    ここだけ修正
                  </span>
                </div>
                <div className="flex justify-center my-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="text-muted-foreground"
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
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {["トップ", "一覧", "詳細", "設定", "マイページ"].map(
                    (page) => (
                      <div
                        key={page}
                        className="rounded-lg bg-muted/40 border border-border px-3 py-1.5 text-center"
                      >
                        <span className="text-xs text-muted-foreground">
                          {page} 自動反映
                        </span>
                      </div>
                    ),
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  正しい状態は常に 1 か所。全画面が自動で追従する。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="Figma ではすでに体験している考え方">
              <p>
                Figma のコンポーネント（Main
                Component）とインスタンスの関係がまさにこれです。
                重要なのは、エンジニアのコードもまったく同じ仕組みで動いているという点です。
                だからデザインの部品構造は、実装の部品構造にそのまま引き継げます。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: Figma と React の対応表 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Figma とエンジニアの部品は同じ概念
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              エンジニアが React などで作る「コンポーネント」と、Figma
              のコンポーネント機能は、 名前が違うだけでほぼ 1:1
              に対応します。右列の英単語はコードに登場する言葉ですが、
              読めなくて構いません。「自分が Figma
              でやっている操作に、実装側の対応物がある」ことだけ掴んでください。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-4 py-3 font-semibold text-foreground">
                        Figma でのあなたの操作
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">
                        エンジニア側の対応物
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">
                        共通する考え方
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 text-foreground/80">
                        Main Component を作る
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        コンポーネントを定義する
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        大元は 1 つだけ
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-foreground/80">
                        インスタンスを画面に置く
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        コンポーネントを呼び出す
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        コピーではなく参照。大元に追従する
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-foreground/80">
                        Component Property で文言を差し替える
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        props
                        <span className="text-muted-foreground">
                          （プロップス）
                        </span>
                        で値を渡す
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        部品は同じ、中身だけ変える
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-foreground/80">
                        Variant を切り替える
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        variant という props を渡す
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        あらかじめ決めた選択肢から選ぶ
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-foreground/80">
                        Boolean Property でアイコンの表示を切る
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        true / false の props
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        オン・オフの 2 択
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-foreground/80">
                        Instance Swap で中の部品を入れ替える
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        children（子要素）を差し込む
                      </td>
                      <td className="px-4 py-3 text-foreground/80">
                        枠は共通、中身は自由
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <InfoBox type="success" title="この対応が分かると何が変わるか">
              <p>
                エンジニアに「このボタン、ラベルとサイズは Property
                にしてあります」と伝えるだけで、 実装側は「props は label と
                size だな」と設計を写せます。
                デザインの構造がそのまま実装の設計図になる、というのがコンポーネント思考の実利です。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: バリアントの軸設計 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              バリアントは「軸」で設計する
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              ボタンのバリアントを作るとき、「種類（variant）」「大きさ（size）」「状態（state）」は
              それぞれ独立した軸として分けます。軸を分けておけば、少ない定義で全組み合わせを表現できます。
            </p>

            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="font-bold text-foreground mb-4">
                3 つの独立した軸（ボタンの例）
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="rounded-lg bg-muted/30 border border-border p-4">
                  <p className="text-xs font-bold text-primary mb-2">
                    種類（variant）
                  </p>
                  <div className="space-y-2">
                    <span
                      className="block w-fit px-3 py-1 rounded-md bg-primary text-xs font-medium"
                      style={{ color: "var(--background)" }}
                    >
                      Primary
                    </span>
                    <span className="block w-fit px-3 py-1 rounded-md border border-primary text-primary text-xs font-medium">
                      Secondary
                    </span>
                    <span className="block w-fit px-3 py-1 rounded-md text-primary text-xs font-medium">
                      Ghost
                    </span>
                  </div>
                </div>
                <div className="rounded-lg bg-muted/30 border border-border p-4">
                  <p className="text-xs font-bold text-primary mb-2">
                    大きさ（size）
                  </p>
                  <div className="space-y-2">
                    <span className="block w-fit px-2 py-0.5 rounded-md bg-primary/15 border border-primary/30 text-[11px] text-foreground">
                      Small
                    </span>
                    <span className="block w-fit px-3 py-1 rounded-md bg-primary/15 border border-primary/30 text-xs text-foreground">
                      Medium
                    </span>
                    <span className="block w-fit px-4 py-1.5 rounded-md bg-primary/15 border border-primary/30 text-sm text-foreground">
                      Large
                    </span>
                  </div>
                </div>
                <div className="rounded-lg bg-muted/30 border border-border p-4">
                  <p className="text-xs font-bold text-primary mb-2">
                    状態（state）
                  </p>
                  <div className="space-y-2 text-xs text-foreground/80">
                    <p>Default（通常）</p>
                    <p>Hover（カーソルが乗った）</p>
                    <p>Disabled（押せない）</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                3 軸 × 各 3 択なら、定義は 9 個で 27
                通りの組み合わせを表現できます。 軸が独立しているので「Secondary
                の Large の Disabled」のような指定が言葉だけで成立します。
              </p>
            </div>

            <div className="rounded-xl border border-red-200 dark:border-red-800 bg-card p-5 mb-6">
              <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-3">
                軸を混ぜると破綻する
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                軸を分けずに「PrimaryLarge」「PrimaryLargeHover」「SecondarySmallDisabled」…のように
                1 本の名前に全部を詰めると、27
                通りすべてに別々の名前が必要になります。
                さらに「Danger」という種類を 1 つ足しただけで、作り直しが 9
                個発生します。
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "PrimaryLarge",
                  "PrimaryLargeHover",
                  "PrimarySmallDisabled",
                  "SecondaryLargeHover",
                  "GhostSmall",
                  "…あと 22 個",
                ].map((name) => (
                  <span
                    key={name}
                    className="px-2 py-1 rounded bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-[11px] text-foreground/70"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <InfoBox type="warning" title="軸が 4 本以上必要になったら">
              <p>
                1 つの部品に軸が 4 本も 5
                本も必要になるのは、部品が大きすぎる合図です。
                「ボタン」と「アイコンボタン」を分ける、カードの中を小さい部品に割るなど、部品自体の分割を検討してください。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: 部品の粒度 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              どこまで部品化するか — 粒度の目安
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              なんでも部品化すればよいわけではありません。粒度の考え方は{" "}
              <Link href="/ux-design/ui-design/design-system">
                <span className="text-primary underline cursor-pointer">
                  デザインシステム構築
                </span>
              </Link>
              で紹介した Atomic Design が参考になりますが、日々の判断には次の 3
              つの目安で十分です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2">
                  3 回使ったら部品化
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  同じ見た目を 3 回作ったら Main Component にします。 1
                  回目から部品化すると、仕様が固まる前に作り込んでしまい、かえって直しにくくなります。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2">
                  迷ったら小さく
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  「検索フォームごと部品」より「入力欄」と「ボタン」を部品にして組む方が使い回せます。
                  大きい部品は小さい部品の組み合わせで作ります。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2">
                  例外は作らず相談
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  「この画面だけ少し違うボタン」を Detach
                  して作ると部品運用が崩れる入り口になります。
                  例外が必要ならバリアント追加をチームで検討します。
                </p>
              </div>
            </div>
          </section>

          {/* セクション5: ハンドオフチェックリスト */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              ハンドオフ — これだけ伝われば実装できる
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              部品をエンジニアに渡すとき、ピクセル単位の指定書は不要です。
              次のチェックリストが埋まっていれば、実装側は迷わず作業に入れます。
            </p>

            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <ul className="space-y-3">
                {[
                  {
                    label: "部品の名前",
                    detail:
                      "「Button」「Card」など。Figma のコンポーネント名がそのまま実装の名前になる",
                  },
                  {
                    label: "バリアントの軸と選択肢",
                    detail:
                      "種類（Primary / Secondary / Ghost）× 大きさ（S / M / L）× 状態（Default / Hover / Disabled）",
                  },
                  {
                    label: "差し替え可能な部分",
                    detail:
                      "ラベル文言・アイコンの有無など、Property にした項目の一覧",
                  },
                  {
                    label: "使っているトークン",
                    detail:
                      "背景は color/action、余白は space-4 など。生の数値ではなくトークン名で",
                  },
                  {
                    label: "禁止事項・注意点",
                    detail:
                      "「ラベルは 2 行にしない」「Disabled 中はカーソルを変える」など、見た目から読み取れないルール",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      className="text-primary mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <rect
                        x="1.5"
                        y="1.5"
                        width="15"
                        height="15"
                        rx="4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M5.5 9l2.5 2.5L13 6.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <InfoBox
              type="info"
              title="状態（Hover / Focus など）は全部描かなくてよい"
            >
              <p>
                デザインシステムの命名とトークンが揃っていれば、Hover や Focus
                の見た目はエンジニアがルールから導出できます。全状態 ×
                全画面を描き切るより、 「状態のルール」を 1
                か所で定義して共有する方が、抜け漏れなく速く進みます。
              </p>
            </InfoBox>
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>

            <Quiz
              question="Figma の「Component Property でボタンのラベル文言を差し替えられるようにする」操作は、エンジニアの世界の何に対応する？"
              options={[
                { label: "デザイントークン" },
                { label: "props（部品に値を渡す仕組み）", correct: true },
                { label: "ダークモード" },
                { label: "バージョン管理" },
              ]}
              explanation="Figma の Component Property は、React などの props に対応します。どちらも「部品の大元は 1 つのまま、使う場所ごとに中身だけ変える」ための仕組みです。"
            />

            <Quiz
              question="ボタンのバリアント設計として適切なのはどれ？"
              options={[
                {
                  label: "「PrimaryLargeHover」のように 1 つの名前に全部詰める",
                },
                {
                  label: "種類・大きさ・状態を独立した軸として分ける",
                  correct: true,
                },
                { label: "画面ごとに専用のボタンを作る" },
                { label: "バリアントは作らず、都度 Detach して調整する" },
              ]}
              explanation="軸（種類 × 大きさ × 状態）を独立させると、少ない定義で全組み合わせを表現でき、軸の追加にも強くなります。名前に全部詰めると組み合わせの数だけ定義が必要になり、破綻します。"
            />
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Figma: Guide to components",
                  url: "https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma",
                  description: "Main Component とインスタンスの公式ガイド",
                },
                {
                  title: "Figma: デザインシステムガイド",
                  url: "https://help.figma.com/hc/en-us/articles/14552950499351-Guide-to-design-systems-in-Figma",
                  description:
                    "Figma でデザインシステムを構築するための公式ガイド",
                },
                {
                  title: "Atomic Design by Brad Frost",
                  url: "https://atomicdesign.bradfrost.com/",
                  description:
                    "部品の粒度を体系的に考えるための古典。無料公開されている",
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
