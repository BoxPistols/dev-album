import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import { Link } from "wouter";

const TEST_PYRAMID = `        ▲  少ない・遅い・高コスト
       ╱ ╲
      ╱E2E╲        ブラウザ全体を操作して
     ╱─────╲       ユーザーの流れを再現する
    ╱ 統合   ╲     複数の部品を組み合わせて
   ╱──────────╲    連携を確かめる
  ╱   単体      ╲  関数・ロジック 1 つの
 ╱──────────────╲ 振る舞いを確かめる
▼ 多い・速い・低コスト`;

const ICE_CREAM_CONE = `▲ 多い・遅い・高コスト
 ╲   E2E      ╱   ← 手動テストと E2E に偏る
  ╲──────────╱
   ╲  統合  ╱
    ╲──────╱
     ╲単体╱        ← 単体テストが薄い
      ▼ 少ない`;

export default function TestingOverview() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 78</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          テストの全体像とテストピラミッド
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          テストは特定のライブラリを覚える作業ではなく、コードの振る舞いを言葉で書き留める作業です。
          このセクションでは、どの層のテストをどれだけ書くかを決める「テストピラミッド」と、
          テストをフレームワークから独立させる「振る舞いをテストする」という考え方を土台として押さえます。
        </p>

        <WhyNowBox
          tags={[
            "テストピラミッド",
            "単体テスト",
            "E2E",
            "疎結合",
            "テスト戦略",
          ]}
        >
          <p>
            テストの書き方は無数にありますが、判断の軸は 2 つに集約できます。
            <strong>「どの層をどれだけ書くか(テストピラミッド)」</strong>と、
            <strong>「何を確かめるか(実装詳細ではなく振る舞い)」</strong>です。
            この 2 つを先に理解しておくと、Vitest・React Testing
            Library・Playwright といった
            個別のツールを学ぶときに、それぞれがピラミッドのどこを担い、なぜその書き方をするのかが一本の線でつながります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              なぜテストを書くのか
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テストを書く目的は「バグをゼロにする」ことではありません。
              変更を続けながらコードの品質を保つための足場を作ることです。効果は主に
              3 つに整理できます。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                <strong>回帰を検出する安全網</strong>:
                一度直した不具合が再び壊れたとき、
                テストが赤くなって気づかせてくれます。手作業の目視確認では見落とす箇所を自動で守れます。
              </li>
              <li>
                <strong>実行可能な仕様書</strong>:
                テストコードは「この入力ならこの結果になる」という
                期待を実行できる形で残します。ドキュメントと違い、仕様がずれれば失敗するので古くなりません。
              </li>
              <li>
                <strong>リファクタリングの土台</strong>:
                振る舞いを固定したテストがあると、
                内部構造を書き換えても結果が変わらないことを機械的に確認できます。安心して整理に踏み込めます。
              </li>
            </ul>
            <InfoBox type="info" title="テストは「変更を続けるための投資」">
              <p>
                書いた瞬間の価値は小さく感じますが、テストの価値はコードを変更するたびに積み上がります。
                二度と触らないコードにテストは要りませんが、育て続けるコードほどテストが効いてきます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              テストピラミッド
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テストピラミッドは、テストを「単体・統合・E2E」の 3 層に分け、
              下の層ほど数を多く、上の層ほど数を絞るという配分の指針です。
              下に行くほど 1
              件あたりの実行が速く、書く・直すコストが低く、失敗したときに原因を特定しやすくなります。
              上に行くほど本番に近い状況を検証できますが、遅く・壊れやすく・原因の切り分けが難しくなります。
            </p>
            <CodeBlock
              language="text"
              title="テストピラミッド"
              code={TEST_PYRAMID}
            />
            <p className="text-foreground/80 mb-4 leading-relaxed">
              各層の役割は次のように分担します。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                <strong>単体テスト(多い・速い・低コスト)</strong>:
                関数やロジック 1
                つを切り離して確かめます。数が多くても一瞬で回るので、開発中に何度でも走らせられます。
              </li>
              <li>
                <strong>統合テスト(中間)</strong>:
                複数の部品を組み合わせ、連携が意図どおりかを確かめます。コンポーネントとその中で使うロジックをまとめて検証する層がここに当たります。
              </li>
              <li>
                <strong>E2E テスト(少ない・遅い・高コスト)</strong>:
                実際のブラウザを操作し、ユーザーの一連の流れを再現します。本番に最も近い代わりに、1
                件が重く、少数の主要導線に絞ります。
              </li>
            </ul>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              この配分が逆転し、遅い E2E
              や手動テストに頼って土台の単体テストが薄いと、
              形が「アイスクリームコーン」になります。テストは重く遅く、壊れたときに原因を追いにくい状態です。
            </p>
            <CodeBlock
              language="text"
              title="アンチパターン: アイスクリームコーン"
              code={ICE_CREAM_CONE}
            />
            <InfoBox type="warning" title="上の層を「厚く」しすぎない">
              <p>
                E2E は本番に近いぶん安心感がありますが、実行が遅く、少しの UI
                変更でも壊れます。
                同じ振る舞いを下の層で確かめられるなら下の層で確かめ、E2E
                は代替できない主要導線に絞るのが、
                ピラミッドを保つ基本方針です。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              振る舞いをテストする(実装詳細に依存しない)
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              良いテストと壊れやすいテストを分ける最大の軸は、
              <strong>
                「振る舞い」を確かめているか、「実装詳細」を確かめているか
              </strong>
              です。
              振る舞いとは「この入力に対してこの結果になる」「このボタンを押すとこの文言が表示される」という、
              外から観測できる約束です。実装詳細とは、内部でどの変数名を使ったか、どの関数を経由したかといった、
              結果に影響しない内部の作りです。
            </p>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              実装詳細に依存したテストは、リファクタリングのたびに壊れます。
              結果は同じなのに内部を変えただけでテストが赤くなるなら、そのテストはリファクタリングを妨げる負債です。
              振る舞いだけを確かめるテストは、内部を書き換えても結果が変わらない限り緑のまま保たれ、
              安心して構造を整理できます。
            </p>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              この考え方が、テストをフレームワークから独立させます。振る舞いは「入力と出力」という抽象で書けるため、
              テストを支える道具は次のように移植可能です。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                <strong>Vitest</strong> は関数の入出力を確かめる道具なので、
                React に限らず任意の TypeScript / JavaScript
                のロジックに使えます。
              </li>
              <li>
                <strong>Playwright</strong>{" "}
                はブラウザを操作してユーザーの流れを再現する道具なので、 React
                で作ったかどうかに関係なく、任意の Web アプリに使えます。
              </li>
              <li>
                <strong>React Testing Library(RTL)</strong> の
                「ユーザーが見る・操作するものを対象にする」という思想は、
                他のフレームワークの Testing Library
                系ツールにもそのまま受け継がれています。
              </li>
            </ul>
            <InfoBox
              type="info"
              title="テストは特定フレームワークと疎結合であるべき"
            >
              <p>
                実装詳細ではなく振る舞いをテストする、という 1
                つの原則が疎結合の背骨です。
                この背骨がある限り、ツールを乗り換えても、フレームワークを移行しても、
                テストで表現した「振る舞いの約束」は資産として残ります。
                以降のページで学ぶ Vitest・RTL・Playwright
                は、この同じ原則を別々の層で実践する道具として理解してください。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              このセクションの地図
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              「テスト戦略」セクションは、ピラミッドの各層に対応する 4
              ページで構成します。
              いずれも「振る舞いをテストする」という原則を、担当する層で具体化していきます。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                <Link
                  href="/react/testing/vitest-unit"
                  className="text-primary underline underline-offset-2 font-medium"
                >
                  Vitest で単体テスト
                </Link>{" "}
                — ピラミッドの土台。関数・ロジックの入出力を高速に確かめる。
              </li>
              <li>
                <Link
                  href="/react/testing/rtl-components"
                  className="text-primary underline underline-offset-2 font-medium"
                >
                  React コンポーネントのテスト(RTL)
                </Link>{" "}
                —
                統合層。ユーザーが見る表示・操作を基準にコンポーネントを確かめる。
              </li>
              <li>
                <Link
                  href="/react/testing/playwright-e2e"
                  className="text-primary underline underline-offset-2 font-medium"
                >
                  Playwright で E2E テスト
                </Link>{" "}
                — ピラミッドの頂点。ブラウザで主要導線を通して確かめる。
              </li>
              <li>
                <Link
                  href="/react/testing/snapshot-visual"
                  className="text-primary underline underline-offset-2 font-medium"
                >
                  スナップショットとビジュアルリグレッション
                </Link>{" "}
                — 出力の変化を差分として捉える補助的なテスト手法。
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              このアプリ自身の現状を正直に見る
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              教材を丁寧に見せるより、実物の判断を見せるほうが学びになります。
              この Dev Album 自身のテストは、現時点で次のような構成です。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                ロジックの<strong>単体テスト(Vitest)</strong>は実在します。
                プレビュー用のトランスパイル検証などを Vitest で回しています。
              </li>
              <li>
                <strong>E2E テスト(Playwright)</strong>
                も実在します。主要な画面遷移をブラウザで確認しています。
              </li>
              <li>
                一方で、<strong>コンポーネントテスト(RTL)</strong>と
                <strong>スナップショット</strong>は現時点で実装していません。
              </li>
            </ul>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              これはピラミッドの「土台」と「頂点」は持ち、「中間層」を意図的に省いた形です。
              このアプリは表示ロジックが薄く UI
              中心のため、壊れて困る挙動の多くは
              「ロジックの単体テスト」か「主要導線の
              E2E」で捉えられる、という判断に基づいています。
              コンポーネントテストを増やす価値が上回った時点で中間層を足す、というトレードオフを選んでいる、というのが正直な現状です。
            </p>
            <InfoBox
              type="info"
              title="「全部書く」ではなく「どこに投資するか」"
            >
              <p>
                テストピラミッドは、すべての層を最大限埋めるための図ではありません。
                対象の性質に合わせて、どの層にどれだけ投資するかを決めるための図です。
                このアプリのように「中間層をあえて持たない」という選択も、根拠があれば正しい判断になります。
              </p>
            </InfoBox>
          </section>

          <Quiz
            question="テストピラミッドの土台(単体テスト)を厚くし、頂点(E2E)を絞るのはなぜですか?"
            options={[
              {
                label: "E2E テストのほうが本番に近く、常に正確な結果を返すから",
              },
              {
                label:
                  "下の層ほど速く・低コストで、失敗時の原因も特定しやすく、多く走らせても負担が小さいから",
                correct: true,
              },
              {
                label:
                  "単体テストだけ書けば統合や E2E は不要になり、テストの総数を減らせるから",
              },
            ]}
            explanation="下の層(単体)は実行が速く、書く・直すコストが低く、失敗したときの原因を特定しやすいため、数を多く持っても負担が小さくなります。上の層(E2E)は本番に近い代わりに遅く壊れやすいので、主要導線に絞ります。各層は役割が異なり、単体だけで統合や E2E を置き換えられるわけではありません。"
          />

          <Quiz
            question="「実装詳細ではなく振る舞いをテストする」ことが、テストをフレームワークから独立させるのはなぜですか?"
            options={[
              {
                label:
                  "振る舞いを入力と出力という抽象で書けるため、内部の作りを変えてもテストが残り、道具やフレームワークを乗り換えても資産になるから",
                correct: true,
              },
              {
                label:
                  "振る舞いをテストすると、どのフレームワークでも同じ API のテストコードになるから",
              },
              {
                label:
                  "実装詳細をテストするほうが遅いので、速さのために振る舞いを選ぶだけだから",
              },
            ]}
            explanation="振る舞いは「この入力にこの出力」という外から観測できる約束で、内部の実装に依存しません。だから内部をリファクタリングしてもテストは緑のまま残り、ツールやフレームワークを移行しても「振る舞いの約束」は資産として引き継げます。これが Vitest・Playwright・RTL の思想が層を越えて移植可能である理由です。"
          />

          <ReferenceLinks
            links={[
              {
                title: "Martin Fowler「TestPyramid」",
                url: "https://martinfowler.com/bliki/TestPyramid.html",
                description:
                  "テストピラミッドの考え方の解説。用語の出自は Mike Cohn『Succeeding with Agile』(2009) と同記事の Etymology 節に記されている。",
              },
              {
                title:
                  "Kent C. Dodds「The Testing Trophy and Testing Classifications」",
                url: "https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications",
                description:
                  "振る舞い重視の観点から各テスト層を整理し直したモデル。",
              },
              {
                title: "Vitest 公式ドキュメント",
                url: "https://vitest.dev/",
                description:
                  "このセクションで単体テストに使う Vitest の公式リファレンス。",
              },
            ]}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
