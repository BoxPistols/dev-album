import { ToggleLeft, ListTree, Gauge, Percent } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * 3つの質問型と確率の読み方
 * STEP 15: Jevセクション
 * - noul: はい/いいえ の確率
 * - choice: 選択肢とラベルごとの確率
 * - score: 順序付きルーブリックと期待値
 * - confidenceとprobabilitiesの違い、しきい値の考え方
 */

export default function JevPrimitives() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 15</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          3つの質問型と確率の読み方
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Jevに投げられる質問はnoul / choice / scoreの3
          種類だけです。それぞれの質問の書き方と、返ってくる答えの形を、 公式
          SDKの型定義とAPI
          スキーマから起こして確認します。最後に、確率をどう行動に変換するかを扱います。
        </p>

        <WhyNowBox
          tags={["noul", "choice", "score", "confidence", "probabilities"]}
        >
          <p>
            3
            つしかないので覚えるのは簡単ですが、答えに含まれる数値の意味を取り違えると設計を誤ります。
            特にchoiceのconfidenceとprobabilities、score
            の期待値は、最初に正確に押さえる価値があります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 共通 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              質問に共通する形
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              どの質問も{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                type
              </code>
              、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                instructions
              </code>
              （何を判断するか）、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                criteria
              </code>
              （答えの候補の説明）で構成されます。 instructionsと各criteria
              の説明は、文字列のほかJSONオブジェクトや配列も渡せます。 choice
              とscoreのcriteriaの説明は{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                null
              </code>{" "}
              にでき、その場合はラベル名だけで解釈されます。
            </p>
            <CodeBlock
              language="json"
              title="HTTPで直接送る場合の形（POST /v1/systemone）"
              code={`{
  "model": "jev-latest",
  "state": { "subject": "Duplicate charge", "message": "Please help." },
  "questions": {
    "billing": { "type": "noul", "instructions": "Is this message about billing?" },
    "tone": {
      "type": "choice",
      "instructions": "What is the tone of this message?",
      "criteria": { "angry": "An upset or hostile message", "calm": "A neutral or polite message" }
    },
    "urgency": {
      "type": "score",
      "instructions": "How urgent is this message?",
      "criteria": ["Can wait", "Needs attention this week", "Needs attention today"]
    }
  }
}`}
            />
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              SDKを使うとこのJSONを組み立てる必要はありません。以下では
              JavaScript SDKのヘルパー
              <code className="text-sm bg-muted px-1 rounded">noul()</code> /
              <code className="text-sm bg-muted px-1 rounded">choice()</code> /
              <code className="text-sm bg-muted px-1 rounded">score()</code>{" "}
              で書きます。
            </p>
          </section>

          {/* noul */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <ToggleLeft className="text-primary" size={28} />
              noul — はい / いいえ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              「はい」である確率を1つの数値で返します。API
              スキーマの説明はこうです。
            </p>
            <blockquote className="border-l-4 border-primary/40 pl-4 text-sm text-muted-foreground mb-4 leading-relaxed">
              Probability of a yes answer or a true statement, from 0 to 1.
              Values near 1 favor yes or true, values near 0 favor no or false,
              and values near 0.5 indicate uncertainty.
              <span className="block mt-1 text-xs">
                — typesafe-sdk 0.7.0に同梱のOpenAPI
                生成スキーマ（NoulAnswer.noul）
              </span>
            </blockquote>
            <div className="grid md:grid-cols-2 gap-4">
              <CodeBlock
                language="ts"
                title="質問"
                code={`noul("Is this message spam?", {
  true: "Unsolicited advertising",
  false: "A legitimate conversation",
})`}
              />
              <CodeBlock
                language="json"
                title="答え（answers.spam）"
                code={`{ "type": "noul", "noul": 0.98 }`}
              />
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              instructions
              は疑問文でも平叙文でも構いません。スキーマの例には「Is this
              message spam?」と 「This message contains unsolicited
              advertising.」の両方が挙げられています。 criteriaのtrue / false
              は省略できます。付けると「何を“はい”と数えるか」の境界が明確になります。
            </p>
          </section>

          {/* choice */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <ListTree className="text-primary" size={28} />
              choice — 名前付きの選択肢から1つ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              criteria
              はラベル名をキーにしたオブジェクトです。答えには最も確率の高いラベル、その確信度、全ラベルの確率が入ります。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <CodeBlock
                language="ts"
                title="質問"
                code={`choice("What is the tone of this message?", {
  angry: "An upset or hostile message",
  calm: "A neutral or polite message",
  excited: "An enthusiastic or eager message",
})`}
              />
              <CodeBlock
                language="json"
                title="答え（answers.tone）"
                code={`{
  "type": "choice",
  "choice": "angry",
  "confidence": 0.9,
  "probabilities": {
    "angry": 0.8, "calm": 0.1, "excited": 0.1
  }
}`}
              />
            </div>
            <div className="rounded-xl border border-border bg-card p-6 mt-4">
              <h3 className="text-lg font-bold text-foreground mb-3">
                confidenceとprobabilitiesは別物
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    <span className="font-mono text-foreground">
                      probabilities
                    </span>{" "}
                    は「各ラベルがどれくらいありそうか」。スキーマは合計が「approximately
                    1」になると書いています。
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    <span className="font-mono text-foreground">
                      confidence
                    </span>{" "}
                    は「選んだラベルへの確信度」。スキーマは「use lower values
                    to flag uncertain selections for
                    review」と用途を示しています。
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>
                    スキーマの例ではchoiceがangry、confidenceが
                    0.9、probabilitiesのangryが0.8
                    と、両者は一致していません。confidence
                    を「最大の確率」と同一視しないでください。
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              TypeScriptでは、criteriaのキーがそのまま{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                choice
              </code>{" "}
              の型と
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                probabilities
              </code>{" "}
              のキーの型になります。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                answers.tone.choice === "angry"
              </code>{" "}
              のような比較で、存在しないラベルを書くと型エラーになります。
            </p>
          </section>

          {/* score */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Gauge className="text-primary" size={28} />
              score — 順序付きのルーブリックで段階評価
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              criteria
              は配列で、並び順がそのままスコアになります。スキーマの説明は
              「Each description's position determines its score, starting at
              zero.」です。 JavaScript SDKは2
              段階未満の配列を送信前に弾きます。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <CodeBlock
                language="ts"
                title="質問"
                code={`score("How urgent is this message?", [
  "Can wait",                    // 0
  "Needs attention this week",   // 1
  "Needs attention today",       // 2
])`}
              />
              <CodeBlock
                language="json"
                title="答え（answers.urgency）"
                code={`{
  "type": "score",
  "score": 1.7,
  "confidence": 0.9,
  "legend": {
    "0": "Can wait",
    "1": "Needs attention this week",
    "2": "Needs attention today"
  },
  "probabilities": { "0": 0.1, "1": 0.1, "2": 0.8 }
}`}
              />
            </div>
            <div className="rounded-xl border border-border bg-card p-6 mt-4">
              <h3 className="text-lg font-bold text-foreground mb-3">
                scoreが1.7のような小数になる理由
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                score
                は「確率で重み付けした段階の平均（期待値）」です。スキーマは
                「Expected score: the probability-weighted average of the rubric
                levels. May fall between integer levels.」と説明しています。
                上の例なら0×0.1 + 1×0.1 + 2×0.8 = 1.7です。
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                段階として扱いたいなら{" "}
                <code className="text-sm bg-muted px-1 rounded">
                  probabilities
                </code>{" "}
                の最大値のキーを取るか、
                <code className="text-sm bg-muted px-1 rounded">
                  Math.round(score)
                </code>{" "}
                で丸めます。どちらを使うかは用途で決まります。
                並び替え（優先度順にソート）なら期待値のまま、表示ラベルを選ぶなら最大確率の段階が素直です。
              </p>
            </div>
            <InfoBox type="info" title="legendのキーは文字列">
              JSONのキーは文字列なので、legendとprobabilitiesのキーは "0" /
              "1" / "2" です。 Python SDKはこれをintキーのdict
              に変換して返します。TypeScriptではcriteria
              を固定長のタプルで渡すと、キーの型が "0" | "1" | "2"
              に絞られます。
            </InfoBox>
          </section>

          {/* 確率を行動に変換 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Percent className="text-primary" size={28} />
              確率を行動に変換する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Jev
              の答えは確率のままです。「何をするか」に変えるのはアプリ側の仕事で、変換の道具はしきい値です。
            </p>
            <CodeBlock
              language="ts"
              title="しきい値で3つに分ける（noulの例）"
              code={`const p = answers.spam.noul;

if (p >= 0.9) {
  // ほぼ確実にスパム: 自動で非表示
} else if (p <= 0.1) {
  // ほぼ確実に正常: そのまま公開
} else {
  // 迷っている: 人のレビュー待ちに積む
}`}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              しきい値の値（0.9や
              0.1）は仕様で決まる定数ではありません。誤検知のコストと見逃しのコストが業務ごとに違うからです。
              STEP 23
              で、ラベル付きデータを使ってしきい値を決める手順を扱います。
            </p>
            <InfoBox type="warning" title="仕様値と実測値のギャップ">
              仕様ではnoulは0〜1の確率、choiceのprobabilitiesは合計が約1
              です。実測では、同じ入力でもモデルの更新（jev-latest
              の指す先が変わる）で
              数値が少し動くことがあります。しきい値ぎりぎりの入力は、モデル更新のたびに判定が入れ替わり得ます。
              運用では「ぎりぎりの帯」を人に回す設計にしておくと、更新の影響が自動処理に直撃しません。
            </InfoBox>
          </section>

          {/* Challenge */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              コーディングチャレンジ
            </h2>
            <CodingChallenge
              title="3種類の質問を1リクエストに入れる"
              description="___ を埋めて、noul / choice / scoreの質問を1つずつ持つリクエストを完成させてください。scoreのcriteriaは配列、choiceのcriteriaはオブジェクトです。"
              preview={false}
              previewType="terminal"
              initialCode={`import { noul, choice, score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const { answers } = await client.systemOne({
  state: { subject: "Duplicate charge", message: "I was charged twice. Fix this NOW." },
  questions: {
    billing: ___("Is this about billing?"),
    tone: choice("What is the tone?", ___),
    urgency: score("How urgent is this?", ___),
  },
});

console.log(answers.billing.noul);
console.log(answers.tone.choice, answers.tone.confidence);
console.log(answers.urgency.score);`}
              answer={`import { noul, choice, score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const { answers } = await client.systemOne({
  state: { subject: "Duplicate charge", message: "I was charged twice. Fix this NOW." },
  questions: {
    billing: noul("Is this about billing?"),
    tone: choice("What is the tone?", { angry: null, calm: null }),
    urgency: score("How urgent is this?", ["Can wait", "This week", "Today"]),
  },
});

console.log(answers.billing.noul);
console.log(answers.tone.choice, answers.tone.confidence);
console.log(answers.urgency.score);`}
              hints={[
                "はい/いいえ の質問はnoul() です",
                "choiceのcriteriaは { ラベル: 説明 | null } のオブジェクトです",
                "scoreのcriteriaは配列で、先頭が0点。2要素以上が必要です",
              ]}
              keywords={["noul(", "{ angry", '["Can wait"']}
            />
          </section>

          {/* Quiz */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="scoreの答えが1.7のとき、正しい解釈は？"
              options={[
                { label: "段階1.7という新しい段階が作られた" },
                {
                  label: "段階ごとの確率で重み付けした期待値が1.7",
                  correct: true,
                },
                { label: "確率1.7で段階1が選ばれた" },
                { label: "エラー値" },
              ]}
              explanation="scoreは「probability-weighted average of the rubric levels」で、整数の段階の間に落ちることがあります。段階として扱うならprobabilitiesの最大値を取るか丸めます。"
            />
            <Quiz
              question="choiceのconfidenceについて正しいのは？"
              options={[
                { label: "probabilitiesの最大値と常に等しい" },
                {
                  label:
                    "選んだラベルへの確信度で、低いものをレビューに回す用途が示されている",
                  correct: true,
                },
                { label: "probabilitiesの合計" },
                { label: "ラベルの数の逆数" },
              ]}
              explanation="スキーマはconfidenceを「Confidence in the selected choice」と定義し、「use lower values to flag uncertain selections for review」と用途を示しています。例では最大確率（0.8）とconfidence（0.9）が異なります。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs — noul",
                  url: "https://docs.typesafe.ai/primitives/noul",
                  description: "SDKの型定義がリンクしているnoulの解説。",
                },
                {
                  title: "TypeSafe AI Docs — choice",
                  url: "https://docs.typesafe.ai/primitives/choice",
                  description: "choiceの解説。",
                },
                {
                  title: "TypeSafe AI Docs — score",
                  url: "https://docs.typesafe.ai/primitives/score",
                  description: "scoreの解説。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-primitives" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
