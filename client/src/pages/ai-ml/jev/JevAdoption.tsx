import { Layers, Plug, Ruler } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * 既存のアプリに後から入れる
 * STEP 24: Jevセクション
 * - すでにLLMを使っているアプリと、AIを入れていないアプリの2つの入口で書く
 * - 実例は2026-09-20から09-21に実際に測って出したPRとissue
 * - 入れないほうがよい場合も同じ重さで書く
 */

export default function JevAdoption() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 24</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          既存のアプリに後から入れる
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          ここまでは新しく作る前提でした。動いているアプリに後から足すときは、どこに入れるかより先に、入れる価値があるかを測る順序が要ります。このページは、実際に手元のアプリで測って入れた記録です。
        </p>

        <WhyNowBox tags={["導入", "置き換え", "測り方", "実例つき"]}>
          <p>
            判断が速くて安いと分かっても、既存のコードのどこに入るかは別の話です。入れる場所を間違えると、動いていたものが確率で揺れるようになります。逆に、入れる価値のある場所は、たいてい「条件が増え続けているif文」か「LLMに書かせたJSONをパースしている箇所」に隠れています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Ruler className="text-primary" size={28} />
              1. 入れる前に測る
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              先に「この数値を満たしたら入れる」を決めます。決めてから測らないと、出た数字に合わせて基準のほうが動きます。
            </p>
            <CodeBlock
              language="text"
              title="基準の書き方（実際に使ったもの）"
              code={`検査ツール: いま人手に回しているルールを機械判定にできるか
  入れる条件: 正しい文章での誤検出が2件以下、かつ問題のある文章の検出が5件以上

FAQの選択: キーワードの一致から型付き判定に替えるか
  入れる条件: 正解率が現状以上、かつFAQに無い質問に誤って答えない

ブックマークの分類: JSONのパースから型付き判定に替えるか
  入れる条件: 手で付けた正解との一致が90%以上、かつパース失敗が0件`}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              正解データは、新しく作らずに済むことが多いです。検査ツールには「この文は検出されるべき」「この文は誤検出してはいけない」という例が辞書に入っていました。FAQには質問と回答の対応があり、分類には既存のフォルダがあります。測る装置が既にあるところから始めると、数値がすぐ出ます。
            </p>
            <InfoBox type="info" title="測ってから設計を直す">
              最初の測定で基準を満たさないことがあります。検査ツールの例では、11個の質問をそのまま投げたときは検出8件・誤検出8件でした。質問に辞書の例を添え、「UIの文言か本文か」を先に判定してから当てる形に変えると、検出10件・誤検出1件になりました。数値が出ると、どこを直せばよいかも見えます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Plug className="text-primary" size={28} />
              2. すでにLLMを使っているアプリ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              外部に送ること自体は既に始まっているので、境界の議論は要りません。狙うのは、LLMに構造化された答えを書かせている箇所です。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <caption className="text-left text-muted-foreground mb-2">
                  置き換えの型
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="text-left p-3 border-b border-border">いまの作り</th>
                    <th scope="col" className="text-left p-3 border-b border-border">置き換え先</th>
                    <th scope="col" className="text-left p-3 border-b border-border">変わること</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border">JSONを書かせてパースする分類</td>
                    <td className="p-3 border-b border-border">choice</td>
                    <td className="p-3 border-b border-border">パース失敗が起きない。確率とconfidenceが付く</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">自由文に点数を書かせる採点</td>
                    <td className="p-3 border-b border-border">score</td>
                    <td className="p-3 border-b border-border">数値が型で返る。観点ごとに分けられる</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">高いモデルに全部を投げる</td>
                    <td className="p-3 border-b border-border">choiceで振り分け</td>
                    <td className="p-3 border-b border-border">簡単なものを安い経路へ回せる</td>
                  </tr>
                  <tr>
                    <td className="p-3">出力をそのまま使う</td>
                    <td className="p-3">noulで検査</td>
                    <td className="p-3">出す前に止める分岐を作れる</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
              実例: FAQの選択
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Storybookに常駐するチャットで、FAQの選択が3段構えになっていました。同義語を展開してキーワードの長さを合算し、閾値3で判定。届かなければあいまい検索（閾値0.6、採用は0.45）。それでも決まらなければ低い点のものを返す、という作りです。しきい値が3つあり、どれを動かしても別の質問の結果が変わります。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              言い換えた質問20件と、どのFAQでも答えられない質問10件で比べました。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <caption className="text-left text-muted-foreground mb-2">
                  FAQ 10件に対する選択（2026-09-20、jev-1.13.0で実測）
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="text-left p-3 border-b border-border">方式</th>
                    <th scope="col" className="text-left p-3 border-b border-border">言い換えた20件の正解</th>
                    <th scope="col" className="text-left p-3 border-b border-border">FAQに無い10件への誤答</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border">キーワードの一致</td>
                    <td className="p-3 border-b border-border">12</td>
                    <td className="p-3 border-b border-border">1</td>
                  </tr>
                  <tr>
                    <td className="p-3">choice</td>
                    <td className="p-3">19</td>
                    <td className="p-3">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              外した1件はconfidence 0.56でした。しきい値を0.6に置くと「選べなかった」側に落ち、既存のキーワード検索に回ります。置き換えではなく、前に足して外れたら元の道に戻す形にすると、失敗したときの動きが今までと同じになります。
            </p>
            <CodeBlock
              language="ts"
              title="前に足して、選べなければ元の経路に落とす"
              code={`const picked = await pickFaqWithAi(query);
if (picked && picked.index !== null) {
  return FAQ[picked.index].answer;
}
// キーが無い、通信が失敗した、確信が低い、どれでもない場合
return findFaqAnswer(query);`}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Layers className="text-primary" size={28} />
              3. AIを入れていないアプリ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              外部に送ることが新しく始まるので、境界の判断が先に要ります。送るものを限定できるか、既定をオフにできるか、送れない環境でも動くかを決めてから入れます。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              入れる場所は「規約はあるが検査が無いところ」に隠れています。文章の検査ツールでは、135のルールのうち11件が「機械では判定できない」として人手のチェックリストになっていました。体言止めの連打、ダイアログの題、エラーの3要素、ボタンの語彙、空状態の書き分けなど、文脈を見ないと決められないものです。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <caption className="text-left text-muted-foreground mb-2">
                  人手に回していた11ルールの判定（2026-09-20、jev-1.13.0で実測。正しい文章81件と辞書の例22件で測定）
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="text-left p-3 border-b border-border">設計</th>
                    <th scope="col" className="text-left p-3 border-b border-border">しきい値</th>
                    <th scope="col" className="text-left p-3 border-b border-border">検出（11件中）</th>
                    <th scope="col" className="text-left p-3 border-b border-border">誤検出</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border">質問だけを渡す</td>
                    <td className="p-3 border-b border-border">0.8</td>
                    <td className="p-3 border-b border-border">8</td>
                    <td className="p-3 border-b border-border">8</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">例を添え、種別で絞る</td>
                    <td className="p-3 border-b border-border">0.8</td>
                    <td className="p-3 border-b border-border">10</td>
                    <td className="p-3 border-b border-border">1</td>
                  </tr>
                  <tr>
                    <td className="p-3">例を添え、種別で絞る</td>
                    <td className="p-3">0.9</td>
                    <td className="p-3">9</td>
                    <td className="p-3">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="warning" title="既定をオフにする">
              このツールは「検出にLLMを使わない」という方針で配っていました。方針と衝突する追加は、既定をオフにして、付けたときだけ動く形にします。付けなければ依存もネットワークも増えません。送るものも、検査対象のテキストと辞書の記述だけに限り、ファイル名やパスは送らないようにします。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              4. 入れないほうがよい場合
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              測った結果、入れないと決めたものもあります。数値が出れば、入れない判断も同じ根拠で下せます。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <caption className="text-left text-muted-foreground mb-2">
                  入れないと決めたもの
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="text-left p-3 border-b border-border">対象</th>
                    <th scope="col" className="text-left p-3 border-b border-border">理由</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border">受信箱の並べ替え</td>
                    <td className="p-3 border-b border-border">「いま見るべき度」を聞くと、20件中17件でconfidenceが0.6未満だった。期日も状態も無い題だけでは材料が足りない</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">使用量の表示</td>
                    <td className="p-3 border-b border-border">判断が数値としきい値の比較で、正解が一意に決まる。確率と待ち時間を足すだけになる</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">画像の採点</td>
                    <td className="p-3 border-b border-border">Jevに画像は渡せない</td>
                  </tr>
                  <tr>
                    <td className="p-3">秘密の検出</td>
                    <td className="p-3">秘密かどうかの判定を外部に送ることになり、道具の目的と衝突する</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              安全に関わる判定を替えるときは、順序も見ます。緊急度を判定している箇所は、型で返るようになる利点が大きい一方、判定の回帰を見る仕組みが無いまま確率的な判定に替えるのは順序が逆です。先に固定の入力と期待値を置き、いまの経路で記録を取ってから替えます。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              5. 落とす条件を書く
            </h2>
            <CodingChallenge
              title="シミュレーション: 確信が低いときは元の経路に戻す（Jevは呼ばない）"
              description="pickの ___ を埋めて、confidenceがしきい値未満のときは既存の検索に落としてください。値は実測のものです。"
              preview={true}
              initialCode={`// 型付き判定の結果（シミュレーション用。値は実測）
const RESULTS = [
  { q: "OpenAIの鍵はどこに書けばいいですか", choice: "faq1", confidence: 0.99 },
  { q: "この相談窓口で何ができるのか教えて", choice: "none", confidence: 0.56 },
  { q: "左の一覧から表示を切り替える方法", choice: "faq4", confidence: 0.55 },
  { q: "今日の東京の天気を教えて", choice: "none", confidence: 1 },
];
const MIN = { confidence: 0.6 };

function pick(r) {
  if (r.choice === "none") return null;
  if (r.confidence < MIN.___) return null;
  return r.choice;
}

function App() {
  return (
    <ul style={{ fontFamily: "sans-serif", fontSize: 14, paddingLeft: 18 }}>
      {RESULTS.map((r) => {
        const picked = pick(r);
        return (
          <li key={r.q} style={{ marginBottom: 8 }}>
            {r.q}
            <div style={{ color: picked ? "var(--text-muted)" : "var(--text-accent)" }}>
              {picked ? picked + " を返す" : "既存の検索に落とす"}（confidence {r.confidence}）
            </div>
          </li>
        );
      })}
    </ul>
  );
}`}
              answer={`// 型付き判定の結果（シミュレーション用。値は実測）
const RESULTS = [
  { q: "OpenAIの鍵はどこに書けばいいですか", choice: "faq1", confidence: 0.99 },
  { q: "この相談窓口で何ができるのか教えて", choice: "none", confidence: 0.56 },
  { q: "左の一覧から表示を切り替える方法", choice: "faq4", confidence: 0.55 },
  { q: "今日の東京の天気を教えて", choice: "none", confidence: 1 },
];
const MIN = { confidence: 0.6 };

function pick(r) {
  if (r.choice === "none") return null;
  if (r.confidence < MIN.confidence) return null;
  return r.choice;
}

function App() {
  return (
    <ul style={{ fontFamily: "sans-serif", fontSize: 14, paddingLeft: 18 }}>
      {RESULTS.map((r) => {
        const picked = pick(r);
        return (
          <li key={r.q} style={{ marginBottom: 8 }}>
            {r.q}
            <div style={{ color: picked ? "var(--text-muted)" : "var(--text-accent)" }}>
              {picked ? picked + " を返す" : "既存の検索に落とす"}（confidence {r.confidence}）
            </div>
          </li>
        );
      })}
    </ul>
  );
}`}
              hints={[
                "MINに入っているキーを見ます。比べるのは確信の度合いです。",
              ]}
              keywords={["MIN.confidence"]}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">確認クイズ</h2>
            <Quiz
              question="動いているアプリに後から入れるとき、最初にやることは？"
              options={[
                { label: "いちばん効果が大きそうな箇所を探して置き換える" },
                {
                  label: "「この数値を満たしたら入れる」を先に決めてから測る",
                  correct: true,
                },
                { label: "全部の判断をまとめて置き換えて、まとめて測る" },
                { label: "しきい値を調整しながら、結果が良くなるまで試す" },
              ]}
              explanation="決める前に測ると、出た数字に合わせて基準のほうが動きます。正解データは新しく作らずに済むことが多く、辞書の例、FAQの対応、既存のフォルダがそのまま使えます。しきい値は、検出と誤検出の両方を見てから決めます。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs — LLM guardrails",
                  url: "https://docs.typesafe.ai/cookbooks/llm_guardrails",
                  description: "LLMの入力・出力・道具の呼び出しに検査を置く型。",
                },
                {
                  title: "TypeSafe AI Docs — Intent routing",
                  url: "https://docs.typesafe.ai/patterns/intent-routing",
                  description: "受け取った要求を、決まった処理・専用のモデル・人に振り分ける型。",
                },
                {
                  title: "TypeSafe AI Docs — Confidence",
                  url: "https://docs.typesafe.ai/confidence",
                  description: "確信の度合いで自動処理と人の確認を分ける考え方。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-adoption" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
