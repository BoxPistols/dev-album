import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const constraints = [
  {
    title: "クライアント-サーバ分離",
    description:
      "UI（クライアント）とデータ保存・処理（サーバ）の責務を分ける。両者は契約だけで結ばれ、独立して進化できる。",
  },
  {
    title: "ステートレス",
    description:
      "サーバはリクエスト間でクライアントの状態を保持しない。各リクエストは処理に必要な情報をすべて含む。認証トークンを毎回送るのはこの制約のため。",
  },
  {
    title: "キャッシュ可能",
    description:
      "レスポンスはキャッシュ可能かどうかを明示する。Cache-Control や ETag を使い、不要な再取得を避けて性能を上げる。",
  },
  {
    title: "統一インターフェース",
    description:
      "リソースを URI で識別し、HTTP メソッドで操作する一貫した方式。REST を REST たらしめる中心的な制約。",
  },
  {
    title: "階層化システム",
    description:
      "クライアントは接続先がサーバ本体か、間にあるロードバランサ・キャッシュ・ゲートウェイかを区別しない。途中に層を挟んでも契約は変わらない。",
  },
];

const maturityLevels = [
  {
    level: "Level 0",
    name: "単一エンドポイント（RPC 的）",
    description:
      "1 つの URL に対して全操作を POST で投げる。HTTP を「トンネル」として使うだけで、URL もメソッドも意味を持たない。",
  },
  {
    level: "Level 1",
    name: "リソースの導入",
    description:
      "操作対象ごとに URL を分ける。/users /orders のように「もの」を URI で識別し始める。ただしメソッドはまだ POST 一辺倒なことが多い。",
  },
  {
    level: "Level 2",
    name: "HTTP メソッド + ステータスコード",
    description:
      "GET / POST / PUT / DELETE を意味通りに使い、200 / 201 / 404 / 409 などのステータスコードを正しく返す。実務で「REST API」と呼ばれるものの大半はここ。",
  },
  {
    level: "Level 3",
    name: "HATEOAS",
    description:
      "レスポンスに「次に取れる操作」へのリンクを含める。クライアントは URL を組み立てず、返ってきたリンクをたどる。Fielding が定義した本来の REST はここを含む。",
  },
];

export default function Rest() {
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
            REST という設計思想
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            REST は「Representational State Transfer」の略で、Roy Fielding が
            2000 年の博士論文で定義した Web
            のアーキテクチャスタイルです。特定のプロトコルやライブラリではなく、
            いくつかの「制約」の集合として示される設計の指針です。
            この章では、その制約が実務でどう効くのかと、現実の API がどこまで
            REST に従っているのかを整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["REST", "RESTful", "HTTP", "リソース", "成熟度モデル"]}
        >
          <p>
            「REST API を作って」と言われたとき、何を満たせば REST
            なのかは意外と曖昧です。 URL をきれいにすれば REST なのか、JSON
            を返せば REST なのか——答えは
            <strong>「制約に沿っているか」</strong>です。 REST
            は仕様書ではなく設計思想なので、従う度合いに段階があります。
            その段階を知っておくと、「どこまでやれば実務として十分か」を判断でき、
            理想論に振り回されずに設計できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* REST とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              REST はプロトコルではなく「制約の集合」
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              REST は HTTP や JSON のような具体的な技術ではなく、
              <strong>アーキテクチャスタイル</strong>です。 Roy Fielding が 2000
              年の博士論文で、Web
              がなぜスケールするのかを説明するために体系化しました。
              いくつかの制約を課すことで、システムにスケーラビリティ・
              独立した進化・キャッシュ可能性といった性質をもたらす——というのが
              REST の主張です。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              これらの制約に沿って設計された API を<strong>「RESTful」</strong>
              と呼びます。 重要なのは、REST は「全か無か」ではなく、
              どの制約をどこまで満たすかという度合いがある点です。
            </p>
          </section>

          {/* 6つの制約 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              実務で効く制約
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              REST の制約のうち、Web API 設計で日常的に意識するものを挙げます。
              これらは抽象的な原則に見えますが、それぞれ具体的な実装判断に直結します。
            </p>

            <div className="space-y-3">
              {constraints.map((c) => (
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

            <InfoBox type="info" title="ステートレスがスケールの鍵">
              サーバがクライアントの状態を覚えないからこそ、
              リクエストをどのサーバインスタンスに振り分けても処理できます。
              これが水平スケール（サーバ台数を増やして負荷分散する）を容易にします。
              代償として、認証情報などを毎リクエストで送る必要があります。
            </InfoBox>
          </section>

          {/* RPC 風 vs REST 風 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              RPC 風 URL と REST 風 URL
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              統一インターフェースの違いが最もよく表れるのが URL の付け方です。
              RPC 風では「動詞」を URL
              に埋め込み、操作ごとに別エンドポイントを作ります。 REST 風では URL
              は「リソース（名詞）」を表し、 何をするかは HTTP
              メソッドで表現します。
            </p>

            <CodeBlock
              language="http"
              title="RPC 風（動詞を URL に埋め込む）"
              code={`GET  /getUser?id=1
POST /createUser
POST /updateUser?id=1
POST /deleteUser?id=1
GET  /listUsers`}
            />

            <CodeBlock
              language="http"
              title="REST 風（リソース + メソッドで表現）"
              code={`GET    /users/1      # ユーザー1 を取得
POST   /users        # ユーザーを作成
PUT    /users/1      # ユーザー1 を更新
DELETE /users/1      # ユーザー1 を削除
GET    /users        # ユーザー一覧`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              REST 風では URL から動詞が消え、<code>/users/1</code>{" "}
              という「もの」だけが残ります。 操作の種類は GET / POST / PUT /
              DELETE というメソッドが担います。
              これにより、同じリソースに対する操作が一貫した形に揃い、 利用者は
              URL の命名規則を都度覚え直さずに済みます。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="REST 風の設計で、ユーザー1 を削除する正しい表現はどれ？"
              options={[
                { label: "POST /deleteUser?id=1" },
                { label: "GET /users/1/delete" },
                { label: "DELETE /users/1", correct: true },
                { label: "POST /users/1?action=delete" },
              ]}
              explanation="REST では URL はリソース（名詞）を表し、操作は HTTP メソッドで表現します。ユーザー1 という リソース /users/1 に対して削除を意味する DELETE メソッドを使うのが正しい形です。動詞を URL に埋め込むのは RPC 風の発想です。"
            />
          </section>

          {/* Richardson 成熟度モデル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Richardson 成熟度モデル
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              API が「どこまで REST に従っているか」を段階で示すのが Richardson
              成熟度モデルです。 Leonard Richardson が提唱し、Martin Fowler
              の解説で広く知られるようになりました。 Level 0 から Level 3
              まで、上に行くほど REST の理念に近づきます。
            </p>

            <div className="space-y-3">
              {maturityLevels.map((m) => (
                <div
                  key={m.level}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-bold text-primary text-sm shrink-0">
                      {m.level}
                    </span>
                    <h3 className="font-bold text-foreground text-base">
                      {m.name}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* HATEOAS の実例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Level 3（HATEOAS）はどう見えるか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              HATEOAS（Hypermedia As The Engine Of Application
              State）は、レスポンスに「次に取れる操作」へのリンクを含める考え方です。
              クライアントは URL
              をハードコードせず、返ってきたリンクをたどって遷移します。
              注文を取得したら、その状態に応じて「キャンセル可能」「支払い可能」といったリンクが付いてくる、というイメージです。
            </p>

            <CodeBlock
              language="json"
              title="HATEOAS を含むレスポンスの例"
              code={`{
  "id": 1001,
  "status": "pending",
  "total": 4800,
  "_links": {
    "self":   { "href": "/orders/1001" },
    "cancel": { "href": "/orders/1001/cancel", "method": "POST" },
    "pay":    { "href": "/orders/1001/payment", "method": "POST" }
  }
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              クライアントは <code>_links</code> を見て「今このリソースに対して
              何ができるか」を知ります。 もし注文が <code>paid</code> になれば{" "}
              <code>pay</code> リンクは消え、別の操作リンクが現れます。
              これにより、状態遷移のロジックをサーバ側に集約できます。
            </p>
          </section>

          {/* 仕様値 vs 実測 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              仕様としての REST と、実装される REST のギャップ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここは先に明示しておきます。 Fielding が定義した本来の REST は
              HATEOAS（Level 3）を含みますが、
              <strong>実際に HATEOAS まで実装している API はごく少数</strong>
              です。 世の中で「REST API」と呼ばれているものの多くは Level 2
              ——リソース URI と HTTP
              メソッドとステータスコードを正しく使う段階——にとどまります。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-bold text-foreground">
                      観点
                    </th>
                    <th className="py-2 pr-4 font-bold text-foreground">
                      仕様（理想）
                    </th>
                    <th className="py-2 font-bold text-foreground">
                      実測（現実）
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4">純粋な REST</td>
                    <td className="py-2 pr-4">Level 3（HATEOAS 必須）</td>
                    <td className="py-2">Level 2 が大半</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4">リンク駆動</td>
                    <td className="py-2 pr-4">URL は組み立てない</td>
                    <td className="py-2">URL をクライアントで組み立てる</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">呼び名</td>
                    <td className="py-2 pr-4">RESTful</td>
                    <td className="py-2">実態は「REST 風」が多い</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              これは「Level 2 が劣っている」という話ではありません。 HATEOAS
              はクライアント実装が複雑になりがちで、
              得られる柔軟性に対してコストが見合わないと判断されることが多いのです。
              実務では Level 2 を堅実に満たすことを目標に置くのが現実的です。
            </p>

            <InfoBox type="warning" title="HATEOAS が普及していない現実">
              HATEOAS は REST の理念上は中心的な制約ですが、 採用している公開
              API は限られます。理由は、リンクをたどる
              ハイパーメディア駆動のクライアントを書く負担が大きいこと、
              そして多くの実用 API ではクライアントが事前に URL
              構造を把握していれば十分だからです。 「REST と言えば Level
              2」が実務上の共通認識になっています。
              理想と実装が乖離している典型例として押さえておくと、 「うちの API
              は HATEOAS じゃないから REST じゃない」と
              悩む必要がないと分かります。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Richardson 成熟度モデルの Level 2 を最もよく表すのはどれ？"
              options={[
                {
                  label: "すべての操作を 1 つの URL への POST で処理する",
                },
                {
                  label:
                    "リソースを URI で表し、HTTP メソッドとステータスコードを意味通りに使う",
                  correct: true,
                },
                {
                  label:
                    "レスポンスに次の操作へのリンクを含め、クライアントがそれをたどる",
                },
                { label: "JSON ではなく XML でレスポンスを返す" },
              ]}
              explanation="Level 2 は、リソースごとに URI を分けた上で、GET / POST / PUT / DELETE といった HTTP メソッドと 200 / 201 / 404 などのステータスコードを正しく使う段階です。実務で REST API と呼ばれるものの大半がこのレベルにあたります。単一エンドポイントへの POST は Level 0、リンク駆動は Level 3（HATEOAS）です。"
            />
          </section>

          {/* まとめ InfoBox */}
          <section>
            <InfoBox type="success" title="この章で押さえること">
              REST は制約の集合からなる設計思想で、従う度合いに段階があります。
              実務の目標は Richardson 成熟度モデルの Level 2——リソース URI ・
              HTTP
              メソッド・ステータスコードを正しく使うこと——に置くのが現実的です。
              HATEOAS（Level 3）は理想ですが必須ではなく、採用は限られます。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title:
                    "Architectural Styles and the Design of Network-based Software Architectures（Fielding の博士論文）",
                  url: "https://ics.uci.edu/~fielding/pubs/dissertation/top.htm",
                  description:
                    "REST を定義した Roy Fielding 本人の博士論文。REST の一次情報",
                },
                {
                  title: "Martin Fowler - Richardson Maturity Model",
                  url: "https://martinfowler.com/articles/richardsonMaturityModel.html",
                  description:
                    "Richardson 成熟度モデルを Level 0〜3 で解説した定番の記事",
                },
                {
                  title: "MDN - HTTP リクエストメソッド",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Methods",
                  description:
                    "GET / POST / PUT / DELETE などメソッドの意味とべき等性の解説",
                },
                {
                  title: "REST API Tutorial",
                  url: "https://restfulapi.net/",
                  description:
                    "REST の制約や RESTful 設計の考え方を体系的にまとめた英語リファレンス",
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
