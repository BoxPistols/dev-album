import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodingChallenge from "@/components/CodingChallenge";

const heuristics = [
  {
    number: 1,
    title: "システム状態の可視化",
    description:
      "今どういう状態か（読み込み中・保存済みなど）を、適切なフィードバックで利用者に伝える。",
  },
  {
    number: 2,
    title: "現実世界との一致",
    description:
      "専門用語ではなく、利用者が日常で使う言葉や概念に沿った表現にする。",
  },
  {
    number: 3,
    title: "ユーザーの自由と制御",
    description:
      "誤操作からの「やり直し」や「キャンセル」を、緊急脱出口として用意する。",
  },
  {
    number: 4,
    title: "一貫性と標準",
    description:
      "同じ意味の要素は同じ見た目・言葉で。プラットフォームの慣習にも従う。",
  },
  {
    number: 5,
    title: "エラーの予防",
    description:
      "そもそもエラーが起きにくい設計にする。確認・制約・初期値で事故を防ぐ。",
  },
  {
    number: 6,
    title: "記憶より認識",
    description:
      "覚えさせるより、選べるようにする。選択肢や手順を画面上に見せる。",
  },
  {
    number: 7,
    title: "柔軟性と効率",
    description:
      "初心者にも上級者にも対応する。ショートカットなどで効率化の余地を残す。",
  },
  {
    number: 8,
    title: "最小限で美しいデザイン",
    description:
      "関係のない情報を削ぎ落とす。ノイズが多いほど重要な情報が埋もれる。",
  },
  {
    number: 9,
    title: "エラーからの回復支援",
    description: "問題を平易な言葉で示し、原因と解決策を具体的に伝える。",
  },
  {
    number: 10,
    title: "ヘルプとドキュメント",
    description:
      "必要なときに探せるヘルプを用意する。タスクに紐づいた具体的な案内が望ましい。",
  },
];

const a11yChecks = [
  {
    title: "コントラスト",
    description:
      "本文は背景との比が 4.5:1 以上、大きな文字は 3:1 以上（WCAG AA）。色だけでなく明度差で読めるかを確認する。",
  },
  {
    title: "フォーカス",
    description:
      "Tab キーで全ての操作要素に到達でき、今どこにフォーカスがあるか視覚的に分かるか。フォーカスリングを消していないかを見る。",
  },
  {
    title: "タッチ領域",
    description:
      "ボタンやリンクのタップ範囲が十分か。一般に 44×44px 以上が目安で、隣の要素と近すぎて誤タップしないかも確認する。",
  },
];

export default function DesignReview() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        {/* Header */}
        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            デザインレビュー
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            デザインレビューは、できあがったデザインを多面的にチェックし、
            品質を一定の水準に揃えるための工程です。
            批評の進め方・ヒューリスティック・アクセシビリティ・一貫性という観点を
            一通り押さえながら、フィードバックの出し方と実装との差分検証までを扱います。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "デザインレビュー",
            "クリティーク",
            "ヒューリスティック",
            "アクセシビリティ",
          ]}
        >
          <p>
            デザインは「好き・嫌い」で語られがちですが、レビューを感想で終わらせると改善につながりません。
            観点を決めてチェックすれば、誰がレビューしても近い結論にたどり着けます。
            ヒューリスティックやアクセシビリティの基準を共通言語にすることで、
            デザイナーとエンジニアが同じ土俵で議論でき、手戻りも減らせます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* クリティーク */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デザインクリティーク（批評）の進め方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              クリティークは、デザインの良し悪しを
              <strong>目的に照らして</strong>検討する場です。
              「かっこいいか」ではなく「このデザインは狙った目的を果たせているか」を問います。
              まず作り手がデザインのゴールと制約を共有し、
              それからレビュアーが観点ごとに気づきを出す、という順序にすると議論が噛み合います。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              進め方のコツは、最初に「何を見てほしいか」を作り手が明示することです。
              全体のトーンを見てほしいのか、特定の画面の導線を見てほしいのかで、
              出すべきフィードバックは変わります。
              焦点が定まると、レビューは雑談ではなく前に進む議論になります。
            </p>

            <InfoBox
              type="info"
              title="批評は「人」ではなく「デザイン」に向ける"
            >
              「あなたのセンスが」ではなく「このボタンの位置が」と、
              対象をデザインそのものに限定します。
              作り手を守ることで、率直な意見が出しやすい場になります。
            </InfoBox>

            <MermaidDiagram
              title="図: デザインレビューの進め方"
              chart={`flowchart TD
    G["作り手: ゴールと制約を共有"] --> F["見てほしい焦点を明示"]
    F --> H["観点で評価<br/>(ヒューリスティック・a11y・一貫性)"]
    H --> I{"目的を果たせている?"}
    I -->|"いいえ"| C["観察・影響・提案で<br/>フィードバック"]
    I -->|"はい"| OK["承認"]
    C --> RV["作り手が改善"]
    RV --> H`}
            />
          </section>

          {/* 10ヒューリスティック */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ニールセンの 10 ユーザビリティヒューリスティック
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Jakob Nielsen が提唱した 10 個の経験則は、 UI
              を評価するときの定番チェックリストです。
              専門家でなくても、この観点に沿って見るだけで多くの問題を発見できます。
              レビューの「共通言語」として持っておくと便利です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {heuristics.map((h) => (
                <div
                  key={h.number}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-xs">
                        {h.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1 text-sm">
                        {h.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {h.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="デザインクリティークで意識すべき姿勢として最も適切なのはどれ？"
              options={[
                { label: "作り手の人柄やセンスを率直に評価する" },
                {
                  label:
                    "批評は人ではなくデザインに向け、目的に照らして気づきを出す",
                  correct: true,
                },
                { label: "感想ベースで「好き・嫌い」を共有する" },
                { label: "レビュアーが先に結論を決めてから議論する" },
              ]}
              explanation="クリティークは目的に照らしてデザインを検討する場です。批評の対象を「人」ではなく「デザインそのもの」に限定し、作り手が見てほしい焦点を先に共有すると議論が噛み合います。感想や人格評価は改善につながりません。"
            />
          </section>

          {/* アクセシビリティ観点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              アクセシビリティ観点
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              見た目の良さとは別に、誰もが使えるかという観点も外せません。
              レビューでは特にコントラスト・フォーカス・タッチ領域の 3
              点を確認すると、 多くのアクセシビリティ問題を早い段階で拾えます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {a11yChecks.map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="warning" title="コントラストは「ツールで測る」">
              色の見えやすさは目視だと判断がぶれます。 Figma
              のプラグインやブラウザの開発者ツールで実際の比率を測り、 WCAG
              AA（本文 4.5:1）を満たしているかを数値で確認するのが確実です。
            </InfoBox>
          </section>

          {/* 一貫性チェック */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              一貫性チェック
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              同じ意味を持つ要素が、画面ごとにバラバラだと利用者は戸惑います。
              ボタンの色・余白の刻み・見出しの階層・用語の使い方が揃っているかを確認します。
              ここで効くのがデザイントークンとコンポーネントです。
              「この値はトークンから来ているか」「既存コンポーネントで作れたか」を問うと、
              一貫性は仕組みで担保しやすくなります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              一貫性のレビューは、新しく作られた要素ほど丁寧に見ます。
              既存と少しだけ違う「亜種」が増えると、それがデザイン負債の入り口になるためです。
              既存パターンで実現できないか、まず確認する習慣をつけると揃いやすくなります。
            </p>
          </section>

          {/* フィードバックの出し方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              フィードバックの出し方（目的ベース）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              フィードバックは「こう直して」と解決策を押し付けるより、
              <strong>目的</strong>を起点に伝えるほうが建設的です。
              「ここを青くして」ではなく「主要アクションが目立たず見落とされそう。
              目立たせる方法を一緒に考えたい」と伝えると、
              作り手は意図を汲んで複数の解を検討できます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              観察（何が起きているか）・影響（それがどう問題か）・提案（どうしたいか）の
              3 段で組み立てると、相手に伝わりやすくなります。
              解決策はあくまで一案として添え、判断の余地を残すのがコツです。
            </p>
          </section>

          {/* デザインQA */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デザイン QA（デザインと実装の差分検証）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              デザインQA
              は、実装された画面がデザインと一致しているかを確かめる工程です。
              余白が 2px
              ずれている、フォントウェイトが違う、ホバー時の挙動が抜けている。
              こうした細かい差分は、リリース前にデザイナーが実画面を触って拾うのが効果的です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここでも仕様と実測のズレが顔を出します。
              仕様（デザインデータ）では余白が 16px でも、
              実測ではブラウザのデフォルト余白やフォントの行間が乗って見た目が変わることがあります。
              理由は、デザインツールとブラウザのレンダリングモデルが異なるためです。
              差分を見つけたら「どちらが正か」を決め、トークンやコンポーネントの側で揃えると再発を防げます。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="目的ベースのフィードバックの例として最も適切なのはどれ？"
              options={[
                { label: "「ここのボタンを青の #2563EB にしてください」" },
                {
                  label:
                    "「主要アクションが目立たず見落とされそう。目立たせる方法を一緒に考えたい」",
                  correct: true,
                },
                { label: "「全体的にいまいちなので作り直してほしい」" },
                { label: "「自分ならこう作る」と完成形を提示する" },
              ]}
              explanation="目的ベースのフィードバックは、解決策を押し付けず「観察・影響・提案」で伝えます。色の指定だけでは意図が伝わらず、作り手が別の良い解を検討する余地もなくなります。目的を共有すれば、複数の解決策を一緒に探せます。"
            />
          </section>

          {/* ハンズオン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ハンズオン: ヒューリスティックに紐づく批評を書く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              批評は感想ではなく、根拠となる観点に紐づけると伝わります。
              保存中なのに何のフィードバックも出ない画面への指摘を、対応するヒューリスティックの名前で埋めましょう。
            </p>
            <CodingChallenge
              preview
              previewType="markdown"
              title="批評コメントを観点に紐づけよう"
              description="保存処理中に状態が表示されない問題は、ニールセンの経験則のどれに反するか。空欄に観点名を埋めてください（ヒント: 今どういう状態かを伝える原則）。"
              initialCode={`観点: ___ の可視化
観察: 保存ボタンを押しても進行中の表示がなく、完了したか分からない
提案: ローディングと完了のフィードバックを追加する`}
              answer={`観点: システム状態 の可視化
観察: 保存ボタンを押しても進行中の表示がなく、完了したか分からない
提案: ローディングと完了のフィードバックを追加する`}
              hints={["今どういう状態かを伝える原則は『システム状態の可視化』"]}
              keywords={["システム状態"]}
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Nielsen Norman Group - 10 Usability Heuristics",
                  url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
                  description:
                    "10 個のユーザビリティ経験則の原典。各項目の例も豊富",
                },
                {
                  title: "WCAG 2.1 解説書（W3C）",
                  url: "https://www.w3.org/WAI/WCAG21/Understanding/",
                  description:
                    "コントラストやフォーカスなど、アクセシビリティ基準の根拠",
                },
                {
                  title: "Nielsen Norman Group - Design Critiques",
                  url: "https://www.nngroup.com/articles/design-critiques/",
                  description:
                    "クリティークの進め方とフィードバックの伝え方を解説",
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
