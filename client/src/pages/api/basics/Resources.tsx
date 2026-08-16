import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const principles = [
  {
    title: "名詞を使う",
    bad: "/getUserList",
    good: "/users",
    description:
      "URI はリソース（もの）の住所。何をするか（動詞）は HTTP メソッドが担当する。URL に動詞を入れない。",
  },
  {
    title: "コレクションは複数形",
    bad: "/user",
    good: "/users",
    description:
      "リソースの集合（コレクション）は複数形で表す。一覧と単一を一貫した形で表現できる。",
  },
  {
    title: "単一リソースは ID 付き",
    bad: "/users?id=42",
    good: "/users/42",
    description:
      "特定の 1 件はパスで指定する。クエリは「絞り込み」であって「リソースの特定」ではない。",
  },
  {
    title: "関連はネスト",
    bad: "/orders?userId=42",
    good: "/users/42/orders",
    description:
      "「ユーザー42 の注文一覧」のような所属関係は、親リソースの下にネストして表す。",
  },
  {
    title: "複合語はケバブケース",
    bad: "/userProfiles",
    good: "/user-profiles",
    description:
      "URL では大文字小文字が区別されうるため小文字に統一する。区切りはアンダースコアより読みやすいハイフン（ケバブケース）を使う。",
  },
];

export default function Resources() {
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
            リソースと URI 設計
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            リソース指向の API では、URI（URL）は「操作の手順」ではなく
            「もの（リソース）の住所」を表します。
            ユーザー・注文・記事といったリソースに一貫した住所を割り当て、
            何をするかは HTTP メソッドに任せる—— この役割分担を押さえると、URL
            は予測可能で読みやすくなります。
          </p>
        </div>

        <WhyNowBox
          tags={["リソース", "URI 設計", "REST", "命名規則", "一貫性"]}
        >
          <p>
            URL の付け方は、一度公開すると変えにくい「契約」の一部です。
            <code>/getUserList</code> のような動詞入り URL は、
            機能が増えるたびに <code>/getUserById</code>、
            <code>/updateUser</code>{" "}
            と無秩序に膨らみ、利用者は毎回ドキュメントを引く羽目になります。
            一方、リソースを名詞で表し操作を HTTP メソッドに委ねると、
            <code>/users</code>{" "}
            という住所だけ知っていれば取得も作成も推測できます。
            <strong>設計時に名詞で考える癖</strong>
            が、後々の保守コストを大きく下げます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* リソースとは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リソースは「API が公開するもの」
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              リソースとは、API が外部に公開する「名前を付けられるもの」です。
              ユーザー、注文、記事、画像——アプリが扱う概念のうち、
              クライアントが取得・作成・更新・削除したい対象がリソースになります。
              そして URI は、そのリソース 1 つ 1 つに割り当てられた
              <strong>住所</strong>です。住所が決まれば、あとは
              「その住所に対して何をするか」を HTTP メソッドで指定するだけです。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">リソース</p>
                  <p className="text-muted-foreground">
                    API が公開する「もの」。ユーザー・注文・記事など
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">URI（住所）</p>
                  <p className="text-muted-foreground">
                    リソースを一意に指す住所。<code>/users/42</code> など
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">HTTP メソッド</p>
                  <p className="text-muted-foreground">
                    住所に対する操作。GET / POST / PUT / DELETE
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="住所と操作を分けて考える">
              「ユーザーを取得する」という 1 つの行為を、 リソース（
              <code>/users/42</code>
              ）と操作（GET）に分解するのがリソース指向です。
              この分離によって、同じ住所に対して
              GET（取得）・PUT（更新）・DELETE（削除）を
              一貫した形で表現できます。URL
              に動詞を入れてしまうと、この分離が崩れます。
            </InfoBox>
          </section>

          {/* 設計原則 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              URI 設計の基本原則
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              リソース指向の URI 設計には、広く共有された定番の原則があります。
              どれも「予測可能で一貫した住所を作る」ためのものです。
              個別のルールを覚えるより、
              <strong>URL は名詞で、操作はメソッドで</strong>
              という一文を軸にすると、各原則が自然に導けます。
            </p>

            <div className="space-y-4">
              {principles.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-3 text-base">
                    {p.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-sm">
                    <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                      <p className="text-xs font-bold text-destructive mb-1">
                        避けたい
                      </p>
                      <code className="text-muted-foreground">{p.bad}</code>
                    </div>
                    <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                      <p className="text-xs font-bold text-primary mb-1">推奨</p>
                      <code className="text-foreground">{p.good}</code>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 良い URL / 悪い URL の対比 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              悪い URL と良い URL を並べてみる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              原則を実例で確認します。左が避けたい設計、右が推奨される設計です。
              悪い例には「動詞が入っている」「単数形と複数形が混在」
              「大文字が混じる」「クエリでリソースを特定している」
              といった問題が含まれています。
            </p>

            <CodeBlock
              language="bash"
              title="避けたい URL（動詞・大小混在・不統一）"
              code={`# 動詞が URL に入っている
GET  /getUserList
POST /user/create

# 単数形と大文字が混在している
GET  /Users/42/Order

# クエリでリソースを特定している
GET  /getOrder?orderId=99`}
            />

            <CodeBlock
              language="bash"
              title="推奨される URL（名詞・複数形・小文字・ネスト）"
              code={`# 名詞のコレクション。操作はメソッドが担う
GET  /users          # 一覧を取得
POST /users          # 1 件を作成

# 単一リソースは ID 付き、関連はネスト
GET  /users/42/orders     # ユーザー42 の注文一覧
GET  /users/42/orders/99  # ユーザー42 の注文99

# 絞り込みはクエリで
GET  /users?status=active # アクティブなユーザーだけ`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              右側の URL は、<code>/users</code> という 1
              つの住所を知っているだけで、
              一覧の取得（GET）も作成（POST）も推測できます。 ID
              やネストの付き方も規則的なので、利用者はドキュメントを都度引かなくても
              次の URL を予想できます。これが「予測可能な API」の正体です。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="URL に動詞（getUserList など）を入れないのはなぜ？"
              options={[
                { label: "URL が長くなってパフォーマンスが落ちるから" },
                {
                  label:
                    "「何をするか」は HTTP メソッドが表すため、URL は名詞（リソース）に専念させて重複・不統一を防ぐから",
                  correct: true,
                },
                { label: "動詞は英語の文法的に URL に書けないから" },
                { label: "検索エンジンが動詞入り URL を嫌うから" },
              ]}
              explanation="操作の種類は GET / POST / PUT / DELETE といった HTTP メソッドで表現できます。URL に動詞を入れると、メソッドと役割が重複し、getUser / updateUser / deleteUser のように同じリソースの住所が無秩序に増えてしまいます。URL は名詞、操作はメソッドに分けることで、一貫した予測可能な設計になります。"
            />
          </section>

          {/* クエリ vs パス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              パスは「特定」、クエリは「絞り込み」
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              よく混乱するのが、パスとクエリパラメータの使い分けです。
              <strong>パスはリソースを特定する</strong>もの、
              <strong>クエリはコレクションを絞り込む</strong>
              ものと覚えると整理できます。
              <code>/users/42</code> は「ユーザー42 そのもの」を指し、
              <code>/users?status=active</code>{" "}
              は「ユーザー全体を条件で絞った結果」を指します。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-2 pr-4 font-bold text-foreground">
                      用途
                    </th>
                    <th className="pb-2 pr-4 font-bold text-foreground">
                      書き方
                    </th>
                    <th className="pb-2 font-bold text-foreground">例</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4">単一リソースの特定</td>
                    <td className="py-2 pr-4">パス</td>
                    <td className="py-2">
                      <code>/users/42</code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4">条件での絞り込み</td>
                    <td className="py-2 pr-4">クエリ</td>
                    <td className="py-2">
                      <code>/users?status=active</code>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4">並び替え</td>
                    <td className="py-2 pr-4">クエリ</td>
                    <td className="py-2">
                      <code>/users?sort=-createdAt</code>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">ページング</td>
                    <td className="py-2 pr-4">クエリ</td>
                    <td className="py-2">
                      <code>/users?page=2&amp;limit=20</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="warning" title="クエリでリソースを特定しない">
              <code>/users?id=42</code>{" "}
              のようにクエリで単一リソースを指すのは避けます。 「ID で 1
              件を特定する」のはパスの役割（<code>/users/42</code>）です。
              クエリは「コレクションをどう絞り込むか・並べるか・区切るか」に限定すると、
              パスとクエリの責務がきれいに分かれます。
            </InfoBox>
          </section>

          {/* 階層と一貫性 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ネストは浅く、一貫性が最優先
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              関連リソースはネストで表せますが、深くしすぎると扱いにくくなります。
              <code>/users/42/orders/99/items/3/reviews</code> のように
              階層が深い URL は、生成も記憶も難しく、
              中間のリソースが本当に必要かも曖昧になります。 目安として
              <strong>ネストは 2 階層程度まで</strong>に抑え、 深い関連は{" "}
              <code>/order-items/3</code> のようにトップレベルのリソースとして
              切り出すことを検討します。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              そして、個別ルールよりも重要なのが<strong>一貫性</strong>です。
              あるエンドポイントが複数形なのに別のエンドポイントが単数形だったり、
              ケバブケースとキャメルケースが混在したりすると、
              利用者は規則を推測できず、結局ドキュメント頼みになります。
              「全エンドポイントで同じルールを貫く」ことが、
              個々の命名の優劣よりも開発体験を左右します。
            </p>

            <CodeBlock
              language="bash"
              title="ネストの深さと切り出しの例"
              code={`# 深すぎるネスト（避けたい）
GET /users/42/orders/99/items/3

# 2 階層までに抑え、深い関連は切り出す
GET /users/42/orders/99   # ここまではネスト
GET /order-items/3        # items はトップレベルに昇格`}
            />

            <InfoBox type="info" title="HATEOAS は Richardson Maturity Model の最上位">
              REST の成熟度を測る Richardson Maturity Model では、最上位の Level
              3 で レスポンスに次の操作リンクを含める HATEOAS が求められます。
              このページで扱う URL とメソッドの設計は Level 2
              にあたる範囲です。 Fowler 自身は同モデルについて「REST
              そのものの段階を定義するものではない」と断っているので、 どの Level
              まで設計するかは API の性質に合わせて決めます。
            </InfoBox>
          </section>

          {/* アクション系の例外 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              CRUD で表せないアクションの扱い
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              現実のアプリには、作成・取得・更新・削除（CRUD）にきれいに収まらない操作があります。
              「ユーザーを有効化する」「注文をキャンセルする」「パスワードをリセットする」
              といった処理は、単純なリソースの更新では表しにくいことがあります。
              こうした場合、リソースの下にアクションを表す
              <strong>controller リソース</strong>を限定的に許容します。
            </p>

            <CodeBlock
              language="bash"
              title="controller リソース（限定的な例外）"
              code={`# CRUD で表しづらいアクションは動詞を末尾に許容
POST /users/42/activate    # ユーザー42 を有効化
POST /orders/99/cancel     # 注文99 をキャンセル
POST /password/reset       # パスワードリセットを開始

# ただし安易に使わない。まず状態の更新で表せないか検討する
# 例: 有効化を「status の更新」と捉えるなら
PATCH /users/42  ->  { "status": "active" }`}
            />

            <InfoBox type="warning" title="例外は最後の手段にとどめる">
              controller リソースは便利ですが、多用すると結局
              <code>/createUser</code> 時代の動詞だらけの URL に逆戻りします。
              まず「これは本当に CRUD で表せないか」を問い、 状態の更新（PATCH
              でフィールドを変える）で表現できるならそちらを優先します。
              動詞を使うのは、状態遷移に副作用がある・複数リソースをまたぐなど、
              リソースの更新では表しきれない場合に限定するのが安全です。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="次のうち、リソース指向の URI 設計として最も適切なのは？"
              options={[
                { label: "GET /getUserOrders?userId=42" },
                { label: "POST /user/42/createOrder" },
                {
                  label: "GET /users/42/orders",
                  correct: true,
                },
                { label: "GET /Users/42/OrderList" },
              ]}
              explanation="正解は GET /users/42/orders です。コレクションは複数形（users / orders）、単一リソースは ID 付き（42）、所属関係はネストで表し、小文字に統一しています。操作（取得）は GET メソッドが担うので URL に動詞は不要です。他の選択肢は、動詞が入っている・クエリでリソースを特定している・大文字が混じっているといった問題を含みます。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "REST API Tutorial - Resource Naming",
                  url: "https://restfulapi.net/resource-naming/",
                  description:
                    "リソースの命名規則（名詞・複数形・ネスト・ハイフン）を例とともに体系的に解説した英語リファレンス",
                },
                {
                  title: "Microsoft - REST API design best practices",
                  url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
                  description:
                    "リソース URI の設計・フィルタリング・バージョニングまでを含む実務寄りのガイド",
                },
                {
                  title: "MDN - URL の構造",
                  url: "https://developer.mozilla.org/ja/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL",
                  description:
                    "パス・クエリ・フラグメントなど URL の各要素の役割を基礎から確認できる",
                },
                {
                  title: "Richardson Maturity Model (martinfowler.com)",
                  url: "https://martinfowler.com/articles/richardsonMaturityModel.html",
                  description:
                    "REST の成熟度を 4 段階で示すモデル。HATEOAS が仕様上どこに位置づくかを理解できる",
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
