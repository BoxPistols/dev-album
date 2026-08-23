import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

// 一覧取得で扱う 3 つの操作軸。それぞれ独立したクエリパラメータとして設計する
const listControls = [
  {
    title: "ページネーション",
    param: "?limit=20&offset=40 / ?cursor=xxx",
    description:
      "結果を分割して少しずつ返す。全件を一度に返さないことでレスポンスを軽く・安全に保つ。",
  },
  {
    title: "フィルタ",
    param: "?status=active&role=admin",
    description:
      "条件で絞り込む。フィールド名＝パラメータ名にすると直感的。AND 条件は & で並べるのが慣習。",
  },
  {
    title: "ソート",
    param: "?sort=-createdAt",
    description:
      "並び順を指定する。先頭の - を降順、無印を昇順とする慣習が広く使われる。",
  },
];

// オフセット方式とカーソル方式の比較表
const comparisonRows = [
  {
    aspect: "リクエスト例",
    offset: "?limit=20&offset=40",
    cursor: "?limit=20&cursor=eyJpZCI6MTAwfQ",
  },
  {
    aspect: "任意ページへのジャンプ",
    offset: "得意（page=99 を直接指定できる）",
    cursor: "苦手（前後への連続移動が基本）",
  },
  {
    aspect: "深いページの性能",
    offset: "劣化しやすい（OFFSET が大きいほど遅い）",
    cursor: "安定（インデックスで一定）",
  },
  {
    aspect: "データ挿入時のズレ",
    offset: "起きる（重複・スキップが発生）",
    cursor: "起きにくい（位置を値で固定）",
  },
  {
    aspect: "総ページ数の提示",
    offset: "容易（総件数から計算できる）",
    cursor: "困難（総件数を持たない設計が多い）",
  },
  {
    aspect: "向いている UI",
    offset: "番号付きページャー",
    cursor: "無限スクロール・「もっと見る」",
  },
];

export default function Pagination() {
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
            ページネーション・フィルタ・ソート
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            一覧取得（コレクションの GET）は、API
            設計で最も頻繁に出てくる操作です。
            数百万件あるデータをそのまま返すわけにはいかないので、
            「どれだけ」「どの条件で」「どの順で」を URL
            で指定できるようにします。
            ここではページネーション・フィルタ・ソートの基本的な設計と、
            オフセット方式とカーソル方式の使い分けを押さえます。
          </p>
        </div>

        <WhyNowBox tags={["pagination", "cursor", "offset", "filter", "sort"]}>
          <p>
            一覧 API
            を「全部返す」で作ると、最初は動いても、データが増えた瞬間に破綻します。
            レスポンスは肥大化し、サーバのメモリを圧迫し、クライアントの描画も詰まります。
            だからこそ <strong>最初の設計段階</strong>
            で、結果を分割して返す仕組みを入れておく必要があります。
            ページネーションの方式選択（オフセット /
            カーソル）は後から変えると破壊的変更になりやすいため、 一覧 API
            を作るなら最初に決めておきたいテーマです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* なぜ必要か */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              なぜ「全件返す」は危険なのか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>GET /users</code>{" "}
              がテーブルの全行を返す実装は、開発初期には問題なく動きます。
              しかし行数が増えると、レスポンスは数 MB
              規模に膨らみ、サーバはその全件をメモリに展開し、
              クライアントは巨大な JSON のパースと描画で固まります。
              一覧取得には、必ず「返す件数の上限」と「続きを取る手段」を設計時点で組み込みます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    ページネーション
                  </p>
                  <p className="text-muted-foreground">
                    返す件数を区切り、続きを辿れるようにする
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">フィルタ</p>
                  <p className="text-muted-foreground">
                    条件で絞り込み、必要な部分集合だけを返す
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">ソート</p>
                  <p className="text-muted-foreground">
                    並び順を指定し、ページネーションを安定させる
                  </p>
                </div>
              </div>
            </div>

            <InfoBox
              type="warning"
              title="上限の「デフォルト」と「最大」を両方決める"
            >
              <code>limit</code> を指定しなかった場合のデフォルト値（例:
              20）と、 指定できる最大値（例: 100）の両方をサーバ側で固定します。
              最大値を設けないと、クライアントが <code>?limit=1000000</code>{" "}
              を送れてしまい、 全件返すのと変わらない負荷がかかります。
            </InfoBox>
          </section>

          {/* 3 つの操作軸 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              一覧 API を構成する 3 つの軸
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ページネーション・フィルタ・ソートは、どれもクエリパラメータで表現します。
              リソースのパス（<code>/users</code>）は変えず、<code>?</code>{" "}
              以降で 「どう取り出すか」を伝えるのが基本です。この 3
              つは独立して組み合わせられます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {listControls.map((control) => (
                <div
                  key={control.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {control.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2 break-all"
                    style={{ fontSize: 13 }}
                  >
                    {control.param}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {control.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* オフセットベース */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              オフセットベース：実装は簡単、深いページで弱い
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              最も直感的な方式です。「先頭から何件スキップして、何件取るか」を指定します。
              <code>?limit=20&offset=40</code> は「41 件目から 20 件」を意味し、
              <code>?page=2&per_page=20</code> という言い換えもよく使われます
              （内部的には <code>offset = (page - 1) * per_page</code>）。
              データベースの <code>LIMIT</code> / <code>OFFSET</code>{" "}
              にそのまま対応するため実装が簡単です。
            </p>

            <CodeBlock
              language="bash"
              title="オフセット方式のリクエスト"
              code={`# 1 ページ目（先頭 20 件）
curl "https://api.example.com/v1/users?limit=20&offset=0"

# 3 ページ目（41 件目から 20 件）
curl "https://api.example.com/v1/users?limit=20&offset=40"

# page / per_page で表現する流儀も同義
curl "https://api.example.com/v1/users?page=3&per_page=20"`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              弱点は 2 つあります。1 つ目は <strong>深いページの性能</strong>
              です。 多くの DB は <code>OFFSET 100000</code> を満たすために 10
              万行を読み飛ばすため、 ページが深くなるほど遅くなります。2 つ目は{" "}
              <strong>データ挿入時のズレ</strong>です。 1
              ページ目を見ている間に新しいデータが先頭に追加されると、 2
              ページ目を取ったときに同じ項目が再び現れたり（重複）、
              逆に項目が押し出されて表示されなかったり（スキップ）します。
            </p>
          </section>

          {/* カーソルベース */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              カーソル（キーセット）ベース：安定して高速
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「何件スキップするか」ではなく「どの値より後ろか」で位置を指定する方式です。
              サーバは「次の続きを取るための目印」をカーソルとして返し、
              クライアントは次のリクエストでそれをそのまま渡します。
              カーソルの実体は、並び順に使うキー（例: <code>createdAt</code> や{" "}
              <code>id</code>）の値を Base64
              などでエンコードした不透明な文字列にするのが一般的です。
            </p>

            <CodeBlock
              language="bash"
              title="カーソル方式のリクエスト"
              code={`# 1 回目（カーソルなし。先頭から 20 件）
curl "https://api.example.com/v1/users?limit=20"

# 2 回目（レスポンスで受け取った nextCursor を渡す）
curl "https://api.example.com/v1/users?limit=20&cursor=eyJpZCI6MTAwfQ"`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              内部的には <code>WHERE id {">"} 100 ORDER BY id LIMIT 20</code>{" "}
              のような
              範囲条件に変換されます。インデックスが効くため、何ページ進んでも速度が一定で、
              間にデータが挿入されても位置がずれません。無限スクロールや「もっと見る」と相性が良いのはこのためです。
              欠点は <strong>任意ページへのジャンプ</strong>がしにくいこと
              （「99
              ページ目を直接開く」がやりにくい）と、総ページ数を提示しにくいことです。
            </p>

            <InfoBox type="info" title="カーソルは「不透明」に保つ">
              カーソル文字列の中身（どのキーをどうエンコードしたか）は、クライアントに解釈させない設計にします。
              中身を公開すると、利用側がそれに依存してしまい、サーバが並び順やキーを変えた瞬間に壊れます。
              「サーバが返したカーソルをそのまま返す」だけのルールにしておくと、内部実装を自由に変えられます。
            </InfoBox>
          </section>

          {/* 比較表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              オフセット方式 vs カーソル方式
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              どちらが優れているという話ではなく、UI 要件で選びます。
              番号付きページャーや「○件中 41-60
              件目」のような表示が必要ならオフセット、
              大量データの無限スクロールや安定した順次取得が必要ならカーソルが向きます。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="text-left font-bold text-foreground p-3">
                      観点
                    </th>
                    <th className="text-left font-bold text-foreground p-3">
                      オフセット方式
                    </th>
                    <th className="text-left font-bold text-foreground p-3">
                      カーソル方式
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr
                      key={row.aspect}
                      className="border-b border-border last:border-b-0"
                    >
                      <td className="p-3 font-medium text-foreground align-top">
                        {row.aspect}
                      </td>
                      <td className="p-3 text-muted-foreground align-top">
                        {row.offset}
                      </td>
                      <td className="p-3 text-muted-foreground align-top">
                        {row.cursor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="success" title="大規模データなら cursor を推奨">
              件数が増え続けるリソース（タイムライン・ログ・通知一覧など）では、
              カーソルベースを推奨します。オフセット方式は深いページで性能が劣化し、
              リアルタイムに増減するデータでは重複・スキップが避けられません。
              逆に件数が安定していて任意ページへのジャンプが要件なら、オフセット方式の方が
              UI を作りやすいです。
            </InfoBox>
          </section>

          {/* フィルタとソート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              フィルタとソートの表現
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              フィルタは「フィールド名＝パラメータ名」を基本にします。
              <code>?status=active&role=admin</code> なら「status が active かつ
              role が admin」を表し、 複数パラメータの間は AND
              として扱うのが一般的です。 ソートは <code>?sort=createdAt</code>{" "}
              で昇順、 先頭に <code>-</code> を付けた{" "}
              <code>?sort=-createdAt</code> で降順とする慣習が広く使われます。
            </p>

            <CodeBlock
              language="bash"
              title="フィルタ・ソート・ページネーションの組み合わせ"
              code={`# status=active かつ role=admin を、作成日の新しい順で 20 件
curl "https://api.example.com/v1/users\\
?status=active&role=admin&sort=-createdAt&limit=20"

# 複数キーでのソート（カンマ区切り。先頭優先）
curl "https://api.example.com/v1/users?sort=-createdAt,name"`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              注意点として、
              <strong>ソートキーはカーソルページネーションと一体で設計</strong>
              します。
              カーソル方式は「並び順のキーの値」を位置の目印にするため、
              ソート条件を変えるとカーソルの意味も変わります。
              また、安定したページングのためには、並び順が一意になるよう
              <code>createdAt</code> のような重複しうるキーには <code>id</code>{" "}
              を tiebreaker として足すのが定石です。
            </p>

            <InfoBox type="warning" title="許可するキーはホワイトリストで">
              <code>sort</code> や フィルタのフィールド名をそのまま DB
              のカラムに渡すと、
              インデックスのないカラムでのソートや、意図しないカラムの露出につながります。
              受け付けるソートキー・フィルタキーはサーバ側で明示的に許可リスト化し、
              範囲外の値はエラー（400 など）で弾きます。
            </InfoBox>
          </section>

          {/* レスポンスのナビゲーション情報 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              レスポンスに「続きの辿り方」を載せる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              一覧レスポンスは、データ本体だけでなく
              「次にどう取るか」というナビゲーション情報を含めるとクライアントが扱いやすくなります。
              オフセット方式なら総件数（<code>total</code>
              ）、カーソル方式なら次カーソル（<code>nextCursor</code>
              ）を返します。 下はカーソル方式のレスポンス例です。
            </p>

            <CodeBlock
              language="json"
              title="ページ情報を含むレスポンス（カーソル方式）"
              code={`{
  "data": [
    { "id": 101, "name": "田中 花子", "createdAt": "2026-06-20T09:00:00Z" },
    { "id": 102, "name": "佐藤 太郎", "createdAt": "2026-06-20T08:55:00Z" }
  ],
  "pageInfo": {
    "hasNextPage": true,
    "nextCursor": "eyJpZCI6MTAyfQ",
    "limit": 20
  }
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ナビゲーション情報を HTTP ヘッダーで返す流儀もあります。 RFC 8288
              で定義された <code>Link</code> ヘッダーは、
              <code>rel="next"</code> / <code>rel="prev"</code> といった関係を
              URL に付けて表現できます （GitHub の REST API などが採用）。本体
              JSON とヘッダーのどちらに載せるかは設計判断ですが、
              いずれにせよ「次の URL
              を組み立てる材料」をクライアントに渡すことが目的です。
            </p>

            <CodeBlock
              language="http"
              title="Link ヘッダーでのナビゲーション（RFC 8288）"
              code={`HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://api.example.com/v1/users?limit=20&cursor=eyJpZCI6MTAyfQ>; rel="next",
      <https://api.example.com/v1/users?limit=20>; rel="first"`}
            />

            <InfoBox type="info" title="総件数は「あると便利、だが重い」">
              オフセット方式で総件数を返すと「○件中 41-60
              件目」のような表示ができて便利ですが、 巨大テーブルに対する{" "}
              <code>COUNT(*)</code> は重い処理です。
              件数が多いリソースでは概算値を返したり、総件数を省いてカーソル方式に寄せる判断もあります。
              「正確な総件数」と「性能」はトレードオフだと理解しておきます。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="カーソル（キーセット）ベースのページネーションがオフセット方式より優れている主な点はどれ？"
              options={[
                {
                  label:
                    "深いページでも速度が安定し、データ挿入時の重複・スキップが起きにくい",
                  correct: true,
                },
                { label: "任意のページ番号へ直接ジャンプしやすい" },
                { label: "総ページ数を常に正確に提示できる" },
                { label: "クエリパラメータを一切使わずに済む" },
              ]}
              explanation="カーソル方式は「どの値より後ろか」を範囲条件に変換するためインデックスが効き、何ページ進んでも速度が一定です。位置を値で固定するので、間にデータが挿入されてもずれません。一方で任意ページへのジャンプや総ページ数の提示は苦手で、これらが必要な場合はオフセット方式が向きます。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="ソートの降順を表すクエリとして、広く使われている慣習はどれ？"
              options={[
                {
                  label:
                    "?sort=createdAt&order=desc のように別パラメータで指定",
                },
                {
                  label: "?sort=-createdAt のように先頭の - で降順を表す",
                  correct: true,
                },
                { label: "?sort=createdAt!! のように記号を末尾に付ける" },
                { label: "降順は表現できず、クライアント側で反転するしかない" },
              ]}
              explanation="先頭に - を付けて降順、無印で昇順とする慣習が広く使われます（例: ?sort=-createdAt）。order=desc を別パラメータで渡す流儀も存在し、どちらも有効ですが、- プレフィックスは複数キーのソート（?sort=-createdAt,name）を簡潔に書けるのが利点です。重要なのは、どの方式でもサーバ側で許可するソートキーをホワイトリスト化することです。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "GitHub REST API - Using pagination",
                  url: "https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api",
                  description:
                    "Link ヘッダー（rel=next/prev）を使ったページネーションの実例。実運用の API がどう続きを返すかの参考",
                },
                {
                  title: "RFC 8288 - Web Linking",
                  url: "https://www.rfc-editor.org/info/rfc8288/",
                  description:
                    "Link ヘッダーと rel パラメータの仕様。next/prev などの関係を URL に付与する標準",
                },
                {
                  title: "MDN - URL の検索パラメータ（URLSearchParams）",
                  url: "https://developer.mozilla.org/ja/docs/Web/API/URLSearchParams",
                  description:
                    "クエリ文字列を組み立て・解析する標準 API。limit/offset/sort などの組み立てに使える",
                },
                {
                  title: "Slack API - Cursor-based pagination",
                  url: "https://docs.slack.dev/apis/web-api/pagination/",
                  description:
                    "カーソル方式を採用した実 API のドキュメント。response_metadata.next_cursor の受け渡しと不透明カーソルの考え方が掴める",
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
