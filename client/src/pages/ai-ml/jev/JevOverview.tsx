import { Scale, GitCompare, ListChecks, HelpCircle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * Jev とは — System One モデル入門
 * STEP 12: Jev セクション
 * - Jev / System One モデルの位置づけ
 * - 「文章を生成しない」の意味（入出力の形）
 * - LLM との違いと、向いている仕事の見分け方
 * - このセクションの進み方
 */

export default function JevOverview() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 12</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          Jev とは — System One モデル入門
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Jev は TypeSafe AI
          が公開した、文章を一切生成しないモデルです。入力された状況（state）に対する
          「はい /
          いいえ」「どれか」「何段階目か」という型付きの質問に、確率値で答えます。
          このページでは、LLM
          と何が違うのか、どんな仕事に向いているのかを、実際の入出力の形から確かめます。
        </p>

        <WhyNowBox tags={["Jev", "System One", "確率", "分類", "ルーティング"]}>
          <p>
            LLM
            をアプリに組み込むと、「文章を書いてほしい」場面と「判断だけしてほしい」場面が混ざります。
            後者は、スパムかどうか、どの担当に回すか、どれくらい急ぎか、といった分類・採点・振り分けです。
          </p>
          <p>
            判断だけの場面で LLM
            に文章を書かせると、出力をパースする層と、形式が崩れたときの例外処理が要ります。
            Jev はこの場面専用に作られていて、答えの型が最初から決まっています。
            LLM の講座（STEP
            10–11）を終えた今なら、両者の役割分担を設計に落とせます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* Jev とは */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Scale className="text-primary" size={28} />
              Jev と System One モデル
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              TypeSafe AI は Jev を「System One
              モデル」という新しい分類の最初のモデルとして公開しました。 公式
              SDK に同梱されたスキーマでは、モデルの説明例が「General-purpose
              system one model.」、 リリース日の例が 2026-09-15
              になっています。名前はモデル ID にも使われていて、SDK
              の既定モデルは
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                jev-latest
              </code>{" "}
              です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「System
              One」は心理学で言う、速く自動的に働く判断のことです。文章を組み立てて推論する
              「System Two」的な LLM に対して、Jev
              は状況を見て即座に判断を返す役を担う、という位置づけです。
              ただし本教材では比喩に深入りせず、API
              の入出力の形で理解を固めます。
            </p>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">
                入力と出力の形
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-muted p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    入力（リクエスト）
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li>
                      <span className="font-mono text-foreground">state</span>:
                      判断の対象。テキスト、JSON オブジェクト、配列のいずれか
                    </li>
                    <li>
                      <span className="font-mono text-foreground">
                        questions
                      </span>
                      : 名前付きの質問の集まり。型は noul / choice / score の 3
                      つ
                    </li>
                    <li>
                      <span className="font-mono text-foreground">model</span>:
                      モデル名。省略時は SDK が{" "}
                      <span className="font-mono">jev-latest</span> を補う
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border bg-muted p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    出力（レスポンス）
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li>
                      <span className="font-mono text-foreground">answers</span>
                      : 質問名ごとの答え。型は質問の型と一致する
                    </li>
                    <li>
                      答えの中身は確率（0〜1）、選ばれたラベル、期待値スコアなどの数値
                    </li>
                    <li>
                      <span className="font-mono text-foreground">usage</span>:
                      入力・出力トークン数
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                出力側に「自由記述のテキスト」を入れる場所がありません。これが「文章を生成しない」の具体的な意味です。
                答えは常に、こちらが用意した型と選択肢の範囲に収まります。
              </p>
            </div>
          </section>

          {/* 最小の例 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              最小の例で形を見る
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              公式 JavaScript SDK の README
              にある例をそのまま示します。サポートチケットの本文を state
              に入れ、 「このチケットは何についてか」を 3
              択で聞いています。動かし方は次のページで扱うので、ここでは形だけ追ってください。
            </p>
            <CodeBlock
              language="ts"
              title="公式 README の例（@typesafe-ai/sdk）"
              code={`import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();
const response = await client.systemOne({
  state: { document: "I was charged twice. Please fix this ASAP." },
  questions: {
    category: choice("What is this ticket about?", {
      billing: null,
      technical: null,
      other: null,
    }),
  },
});

console.log(response.answers.category.choice);`}
            />
            <p className="text-muted-foreground mt-3 mb-6 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                answers.category
              </code>{" "}
              には、選ばれたラベル
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                choice
              </code>{" "}
              のほかに、その確信度
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                confidence
              </code>{" "}
              と、ラベルごとの確率
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                probabilities
              </code>{" "}
              が入ります。 SDK の型定義では、質問の選択肢キーがそのまま{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                probabilities
              </code>{" "}
              のキーの型になります。 選択肢に無いラベルが返る余地は、型の上でも
              API の上でもありません。
            </p>
            <CodeBlock
              language="json"
              title="answers.category の形（型定義から起こした例。数値は説明用）"
              code={`{
  "type": "choice",
  "choice": "billing",
  "confidence": 0.9,
  "probabilities": { "billing": 0.9, "technical": 0.06, "other": 0.04 }
}`}
            />
          </section>

          {/* LLM との違い */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <GitCompare className="text-primary" size={28} />
              LLM との違い
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      観点
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      LLM（Claude など）
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      Jev
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">
                      出力
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      自由記述のテキスト。JSON を頼んでも形式はテキスト経由
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      型付きの答え（確率・ラベル・スコア）のみ。テキスト出力の枠が無い
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">
                      答えの範囲
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      プロンプトで制約するが、外れることがある
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      質問で渡した選択肢・段階の中に必ず収まる
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">
                      確信度
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      「自信は 80%
                      です」と書かせても、それは文章であり数値保証ではない
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      確率と confidence が数値で返る。しきい値で分岐できる
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">
                      複数の質問
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      1 つのプロンプトにまとめるか、複数回呼ぶ
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      1
                      リクエストに名前付きの質問を複数入れ、まとめて答えを受け取る
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">
                      向く仕事
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      要約・生成・対話・コード生成・説明
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      分類・採点・振り分け・可否判定・順位付けの材料
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="info" title="速さと料金について">
              TypeSafe AI は Jev を、LLM
              より速く安く判断を返すモデルとして位置づけています。具体的な応答時間と料金は
              提供側の改定で変わるため、本教材には固定しません。公式サイトの料金ページで現在の値を確認してください。
              公式 SDK に同梱されたスキーマには、出力トークンが「currently free
              of charge」と記されています（執筆時点）。
            </InfoBox>
          </section>

          {/* 向いている仕事の見分け方 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <ListChecks className="text-primary" size={28} />
              向いている仕事の見分け方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              次の 3 つがそろう仕事は Jev の型にはまります。逆に 1
              つでも欠けるなら、LLM か従来のルールの方が素直です。
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-bold text-primary mb-2">
                  1. 答えの候補が先に分かる
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  「請求 / 技術 / その他」「急ぎか否か」「0〜2 の 3
                  段階」のように、選択肢を先に列挙できる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-bold text-primary mb-2">
                  2. 同じ判断を何度も繰り返す
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  チケット、レビュー、ログ、投稿など、同じ形の入力が大量に流れてくる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-bold text-primary mb-2">
                  3. 確率で行動を変えられる
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  確信が高ければ自動処理、低ければ人に回す、という分岐が業務として成り立つ。
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">
                例: Web サービスの中で Jev が担える判断
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>問い合わせフォームの内容を担当チームへ振り分ける</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    投稿がガイドライン違反かどうかを一次判定し、疑わしいものだけ人が見る
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    LLM
                    が書いた回答を、公開前に「根拠と矛盾していないか」で採点する
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    ユーザーの操作ログから「今このヘルプを出すべきか」を判定する
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* セクションの進み方 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <HelpCircle className="text-primary" size={28} />
              このセクションの進み方
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-3">
                {[
                  {
                    step: "13",
                    label: "開発環境の構築",
                    desc: "API キー、Node.js / Python の公式 SDK、最初の呼び出し",
                  },
                  {
                    step: "14",
                    label: "3 つの質問型と確率の読み方",
                    desc: "noul / choice / score の応答の形と、confidence の意味",
                  },
                  {
                    step: "15",
                    label: "state と質問の設計",
                    desc: "何を state に入れるか、質問の分け方、エラーとリトライ",
                  },
                  {
                    step: "16",
                    label: "サンプルアプリのアイデア 20",
                    desc: "Jev で何が作れるかを一覧で見て、講座で作る 3 つを選ぶ",
                  },
                  {
                    step: "17",
                    label: "サンプルアプリ 1: チケットのトリアージ",
                    desc: "Next.js の Route Handler と React UI で担当・緊急度・不満度を判定する",
                  },
                  {
                    step: "18",
                    label: "サンプルアプリ 2: 投稿のモデレーション",
                    desc: "公開前チェックと人のレビュー待ちキュー",
                  },
                  {
                    step: "19",
                    label: "サンプルアプリ 3: アラートの優先度付け",
                    desc: "複数件を 1 リクエストで評価し、期待値スコアで並べる",
                  },
                  {
                    step: "20",
                    label: "応用",
                    desc: "信頼度ゲート、LLM との組み合わせ、評価、Jev では扱えないこと",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-12 text-xs font-bold text-primary mt-0.5">
                      STEP {item.step}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <InfoBox type="warning" title="一次情報の扱いについて">
              本セクションの API の記述は、TypeSafe AI が公開している公式
              SDK（npm の @typesafe-ai/sdk、PyPI の typesafe-sdk）に
              同梱された型定義と、API の OpenAPI
              定義から生成されたスキーマを読んで書いています。
              各ページ末尾の出典欄に、手元で同じものを取り出す再現コマンドを載せています。
              公式ドキュメント（docs.typesafe.ai）の記述が更新されて食い違う場合は、公式を正としてください。
            </InfoBox>
          </section>

          {/* Quiz */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="Jev の応答に含まれないものはどれ？"
              options={[
                { label: "選ばれたラベルとその確信度" },
                { label: "選択肢ごとの確率" },
                {
                  label: "判断理由を説明する自由記述のテキスト",
                  correct: true,
                },
                { label: "入力・出力トークン数" },
              ]}
              explanation="Jev の応答は、質問の型に対応する数値（確率・ラベル・スコア）と usage で構成されます。自由記述のテキストを返す枠は API の応答にありません。理由の説明が必要なら LLM の役割です。"
            />
            <Quiz
              question="Jev に向いている仕事の条件として適切でないものは？"
              options={[
                { label: "答えの候補を先に列挙できる" },
                { label: "同じ形の判断を繰り返す" },
                { label: "確率に応じて処理を分岐できる" },
                {
                  label: "長い文章を新しく書き起こす必要がある",
                  correct: true,
                },
              ]}
              explanation="文章の生成は Jev の対象外です。候補が決まっていて、繰り返し発生し、確率で行動を変えられる判断が Jev の守備範囲です。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs",
                  url: "https://docs.typesafe.ai/",
                  description:
                    "公式ドキュメント。概念（System One）と質問型（primitives）の解説。",
                },
                {
                  title: "@typesafe-ai/sdk（npm）",
                  url: "https://www.npmjs.com/package/@typesafe-ai/sdk",
                  description:
                    "公式 JavaScript / TypeScript SDK。README に最小の例がある。",
                },
                {
                  title: "typesafe-sdk（PyPI）",
                  url: "https://pypi.org/project/typesafe-sdk/",
                  description: "公式 Python SDK。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-overview" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
