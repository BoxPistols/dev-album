import { Link } from "wouter";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

export default function AiCollaborationWithTokens() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 14</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          AI 時代のデザイン共通言語
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          トークン名とコンポーネント名は、AI
          へ指示するときの語彙としてそのまま使えます。
          このページはデザイナー向けに、「青っぽくして」と「--color-primary
          を使って」の結果の差と、 AI に渡すデザイン仕様の書き方を説明します。
        </p>

        <WhyNowBox
          tags={[
            "デザイナー向け",
            "AI 駆動開発",
            "プロンプト",
            "デザインシステム",
            "再現性",
          ]}
        >
          <p>
            AI
            がコードや画面を生成する開発では、指示の言葉がそのまま成果物の品質を決めます。
            STEP 12〜13
            で学んだトークンとコンポーネントの語彙を持っているデザイナーは、 AI
            に対して「一度で意図通り、何度やっても同じ結果」の指示が出せます。
            これはエンジニアだけでなく、Figma 上で AI
            機能を使うデザイナー自身の武器になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: 曖昧な指示とトークン指示の差 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              「青っぽく」と「--color-primary」の結果の差
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              AI に「ボタンを青っぽくしてください」と頼むと、AI
              はもっともらしい青を自分で選びます。
              問題は、選ばれる青が毎回変わることです。トークン名で指示すれば、AI
              は選ばずに参照するだけになります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-red-200 dark:border-red-800 bg-card p-5">
                <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-3">
                  「青っぽくしてください」— 4 回頼んだ結果
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-center">
                    <span
                      className="block w-12 h-12 rounded-lg border border-border"
                      style={{ backgroundColor: "#3B82F6" }}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      1 回目
                    </p>
                  </div>
                  <div className="text-center">
                    <span
                      className="block w-12 h-12 rounded-lg border border-border"
                      style={{ backgroundColor: "#0EA5E9" }}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      2 回目
                    </p>
                  </div>
                  <div className="text-center">
                    <span
                      className="block w-12 h-12 rounded-lg border border-border"
                      style={{ backgroundColor: "#1E40AF" }}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      3 回目
                    </p>
                  </div>
                  <div className="text-center">
                    <span
                      className="block w-12 h-12 rounded-lg border border-border"
                      style={{ backgroundColor: "#6366F1" }}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      4 回目
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  どれも「青っぽい」ので指示には従っている。しかし画面ごとに違う青が増え、
                  ブランドの一貫性が崩れていく。
                </p>
              </div>
              <div className="rounded-xl border border-green-200 dark:border-green-800 bg-card p-5">
                <p className="text-xs font-bold text-green-600 dark:text-green-400 mb-3">
                  「--color-primary を使ってください」— 4 回頼んだ結果
                </p>
                <div className="flex items-center gap-3 mb-3">
                  {["1 回目", "2 回目", "3 回目", "4 回目"].map((label) => (
                    <div key={label} className="text-center">
                      <span className="block w-12 h-12 rounded-lg border border-border bg-primary" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  毎回同じ色。しかも後からブランドカラーを変えたら、この 4
                  か所すべてが自動で追従する。 再現性と一貫性の両方が手に入る。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="--color-primary という書き方について">
              <p>
                頭にハイフンが 2
                つついた名前は、コードの世界でのトークンの書き方（CSS
                変数）です。
                読めなくて構いません。「チームで決めたトークン名を、コード側の表記でそのまま呼べる」
                ということだけ覚えておけば十分です。Figma の Variables
                名で伝えても意図は同じです。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: プロンプトの before/after */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              指示文の Before / After
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              コーディング AI・Figma の AI 機能・画面生成ツールなど、どの AI
              に対しても考え方は共通です。
              「形容詞で雰囲気を伝える」のをやめて、「トークン名と部品名で構造を伝える」に置き換えます。
            </p>

            <div className="space-y-4 mb-6">
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-4 py-2 bg-muted/30 border-b border-border">
                  <p className="text-sm font-bold text-foreground">
                    例 1: 色の指示
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                  <div className="p-4">
                    <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-2">
                      Before
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      「エラーのときは赤っぽい感じで目立たせてください」
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-bold text-green-600 dark:text-green-400 mb-2">
                      After
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      「エラーメッセージの文字色は color/error、背景は
                      bg/error-subtle
                      を使ってください。新しい色は作らないでください」
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-4 py-2 bg-muted/30 border-b border-border">
                  <p className="text-sm font-bold text-foreground">
                    例 2: 部品の指示
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                  <div className="p-4">
                    <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-2">
                      Before
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      「送信ボタンみたいなやつを右下に置いてください。ちょっと小さめで」
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-bold text-green-600 dark:text-green-400 mb-2">
                      After
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      「既存の Button コンポーネント（variant: Secondary、size:
                      Small）をフッター右端に置いてください。新しいボタンは作らないでください」
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-4 py-2 bg-muted/30 border-b border-border">
                  <p className="text-sm font-bold text-foreground">
                    例 3: 余白・レイアウトの指示
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                  <div className="p-4">
                    <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-2">
                      Before
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      「なんか詰まって見えるので、全体的にゆったりさせてください」
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-bold text-green-600 dark:text-green-400 mb-2">
                      After
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      「カード同士の間隔を space-4（16px）から
                      space-6（24px）に、カード内側の余白は space-4
                      のまま維持してください」
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="success" title="After に共通する 2 つの型">
              <p>
                良い指示には「①
                使う名前を指定する（トークン名・部品名・バリアント）」と 「②
                新しく作ることを禁止する（新しい色・新しいボタンを作らない）」の
                2 つが入っています。 ② を忘れると、AI
                は善意で新種のパーツを発明します。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: なぜ品質が上がるのか */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              語彙が与えられると AI は迷わない
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              デザインシステムがあると AI の出力品質が上がるのは、AI
              が「選ぶ」作業から解放されるからです。 指示が曖昧なとき、AI
              は無数の選択肢から確からしいものを推測します。
              語彙が与えられていれば、推測の余地そのものがなくなります。
            </p>

            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    語彙がないとき、AI が推測すること
                  </p>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1 flex-shrink-0">
                        &#8226;
                      </span>
                      <span>「青っぽい」はどの色コードか（無数の候補）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1 flex-shrink-0">
                        &#8226;
                      </span>
                      <span>ボタンの角丸・余白・文字サイズはいくつか</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1 flex-shrink-0">
                        &#8226;
                      </span>
                      <span>既存の部品を使うべきか、新しく作るべきか</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1 flex-shrink-0">
                        &#8226;
                      </span>
                      <span>ダークモードのときにどうするか</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    語彙があるとき、AI がやること
                  </p>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0">
                        &#8226;
                      </span>
                      <span>color/action を参照する（選択肢は 1 つ）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0">
                        &#8226;
                      </span>
                      <span>Button（Primary / Medium）の定義に従う</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0">
                        &#8226;
                      </span>
                      <span>既存部品を使う（新造は指示で禁止済み）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0">
                        &#8226;
                      </span>
                      <span>Dark の値はトークンが持っているので考えない</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed">
              つまりデザインシステムの整備は、人間のチームのためだけの仕事ではなくなりました。
              トークンと部品の一覧は、そのまま「AI
              に渡せる仕様書」として機能します。 整備の投資対効果が、AI
              の登場でもう一段上がったと言えます。
            </p>
          </section>

          {/* セクション4: AI に渡すデザイン仕様のミニテンプレート */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              AI に渡すデザイン仕様 — ミニテンプレート
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              画面や部品の実装を AI（またはAI
              を使うエンジニア）に依頼するとき、次の 5
              項目を箇条書きで添えるだけで、
              往復回数が大きく減ります。長文の仕様書は不要です。
            </p>

            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 mb-6">
              <p className="text-xs font-bold text-primary mb-4">
                テンプレート（コピーして使えます）
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-foreground">
                    1. 作るもの
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    例: お知らせ一覧画面。既存の Card
                    コンポーネントを縦に並べる。
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    2. 使うコンポーネントとバリアント
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    例: Card(default) / Button(variant: Ghost, size: Small) /
                    Badge(variant: New)。
                    ここにない部品は新しく作らず、必要なら相談してください。
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    3. 使うトークン
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    例: タイトル文字は text/primary、日付は
                    text/secondary、カード間の余白は space-4。
                    生の色コードや数値の直書きはしないでください。
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    4. 状態と挙動
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    例: 未読は Badge を表示、既読は非表示。0
                    件のときは「お知らせはありません」を text/secondary
                    で中央に表示。
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">5. 参考</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    例: Figma
                    の該当フレームへのリンク。似た構造の既存画面（設定画面の一覧）。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="warning" title="AI の出力は必ず目で検証する">
              <p>
                トークン名で指示しても、AI
                が定義にない名前や値を作ってしまうことはあります。
                納品された画面を見るときは「知らない色・知らない部品が混ざっていないか」を最初に確認してください。
                トークン一覧と見比べるだけででき、デザイナーが最も得意な検証です。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: 次の一歩 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              次の一歩 — 小さく始める
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              いきなり全社のデザインシステムを整備する必要はありません。
              次の順番で始めると、1 つのプロジェクト内でも効果を確認できます。
            </p>

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
                  <h3 className="font-bold text-foreground mb-2">
                    色と余白だけトークン化する
                  </h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    <Link href="/ux-design/for-designers/design-tokens-for-designers">
                      <span className="text-primary underline cursor-pointer">
                        STEP 12 の手順
                      </span>
                    </Link>
                    で、Figma Variables に色と余白を登録します。まずこの 2
                    種類だけで、AI への指示の精度が変わります。
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
                  <h3 className="font-bold text-foreground mb-2">
                    よく使う部品 5 個をコンポーネント化する
                  </h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    ボタン・入力欄・カードなど、登場頻度の高い部品から
                    <Link href="/ux-design/for-designers/component-thinking">
                      <span className="text-primary underline cursor-pointer">
                        STEP 13 の軸設計
                      </span>
                    </Link>
                    でバリアントを整えます。
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
                  <h3 className="font-bold text-foreground mb-2">
                    次の依頼をテンプレートで書いてみる
                  </h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    このページの 5 項目テンプレートで 1
                    件依頼してみて、往復回数が減るか確かめます。 AI
                    を使ったプロトタイピングの実践は{" "}
                    <Link href="/ux-design/prototyping/figma-prototype">
                      <span className="text-primary underline cursor-pointer">
                        Figma プロトタイピング
                      </span>
                    </Link>
                    （STEP 11）も参照してください。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>

            <Quiz
              question="AI への指示として、最も再現性が高い（毎回同じ結果になる）のはどれ？"
              options={[
                { label: "「ボタンを青っぽく、いい感じにしてください」" },
                { label: "「ボタンはブランドに合う色にしてください」" },
                {
                  label:
                    "「ボタンの背景は color/action トークンを使ってください」",
                  correct: true,
                },
                { label: "「ボタンは他のサイトを参考に青にしてください」" },
              ]}
              explanation="トークン名で指定すると、AI は色を「選ぶ」のではなく定義済みの値を「参照する」だけになるため、何度依頼しても同じ結果になります。形容詞や「参考に」という指示は、AI の推測が入るため毎回結果が揺れます。"
            />

            <Quiz
              question="AI に画面の実装を依頼するとき、指示に含めると効果的な「禁止」はどれ？"
              options={[
                { label: "「質問しないでください」" },
                {
                  label: "「定義にない新しい色や部品を作らないでください」",
                  correct: true,
                },
                { label: "「コメントを書かないでください」" },
                { label: "「3 分以内に終わらせてください」" },
              ]}
              explanation="使う語彙（トークン・部品）の指定とセットで「新造の禁止」を伝えると、AI が善意で新種の色やパーツを発明することを防げます。出力の検証も「知らない名前が混ざっていないか」の確認だけで済むようになります。"
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
                    "トークンをツール間で共有するための標準仕様。AI ツールもこの語彙に寄っていく流れにある",
                },
                {
                  title: "Figma: Guide to variables",
                  url: "https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma",
                  description:
                    "Figma Variables の公式ガイド。トークンを Figma 上で管理する起点",
                },
                {
                  title: "Material Design 3",
                  url: "https://m3.material.io/",
                  description:
                    "大規模デザインシステムの実例。トークンと部品の語彙設計の参考に",
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
