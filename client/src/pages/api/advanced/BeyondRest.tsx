import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

// 主要な代替スタイルの比較データ（章内で表として描画）
const styleRows = [
  {
    name: "REST",
    transport: "HTTP/1.1・HTTP/2",
    schema: "OpenAPI（任意）",
    strength: "汎用・キャッシュ容易・学習コスト低",
    fit: "公開 API・Web 全般",
  },
  {
    name: "GraphQL",
    transport: "HTTP（多くは単一 POST）",
    schema: "GraphQL スキーマ（必須）",
    strength: "必要フィールドだけ取得・複数リソース集約",
    fit: "多様なクライアント・画面ごとに要求が異なる UI",
  },
  {
    name: "gRPC",
    transport: "HTTP/2",
    schema: "Protocol Buffers（必須）",
    strength: "高速・低レイテンシ・双方向ストリーミング",
    fit: "サーバ間・マイクロサービス内部通信",
  },
];

export default function BeyondRest() {
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
            REST 以外の選択肢（GraphQL / gRPC）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            REST は Web API の標準的な選択肢ですが、常に最適とは限りません。
            画面ごとに必要なデータが大きく異なる UI、サーバ間の高速通信、
            リアルタイムなストリーミング——こうした要件では GraphQL や gRPC
            の方が素直に解けることがあります。
            それぞれの仕組みと向き不向きを整理し、要件から逆算して選べるようにします。
          </p>
        </div>

        <WhyNowBox
          tags={["GraphQL", "gRPC", "tRPC", "オーバーフェッチ", "スキーマ"]}
        >
          <p>
            REST を一通り学ぶと「API＝REST」と思い込みがちですが、実務では
            <strong>要件に合わないのに REST を選んで苦労する</strong>
            場面があります。
            たとえばモバイルとデスクトップで欲しいフィールドが違う、
            あるいはマイクロサービス間で 1 リクエストあたり数ミリ秒を削りたい——
            こうした状況は REST の不得意領域です。代替スタイルを知っておくと、
            「何を使うか」ではなく「この要件にはどれが合うか」で判断できるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* REST が万能ではない理由 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              REST が苦手なこと
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              REST はリソースを URL で表し、HTTP
              メソッドで操作する素直なスタイルです。
              キャッシュが効きやすく汎用性も高い一方で、エンドポイントの形が固定されるため、
              クライアントごとに必要なデータが違うと不便になります。代表的な 2
              つの問題が「オーバーフェッチ」と「アンダーフェッチ」です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary mb-1">オーバーフェッチ</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  必要なのは名前だけなのに、<code>/users/42</code>{" "}
                  を叩くと住所も決済履歴も全部返ってくる。
                  帯域とパース処理が無駄になる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary mb-1">アンダーフェッチ</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ユーザーと、そのユーザーの投稿一覧が欲しいのに、{" "}
                  <code>/users/42</code> と <code>/users/42/posts</code>{" "}
                  を別々に叩く必要があり、往復が増える。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="純粋な REST は実は少数派">
              REST の理想形には
              HATEOAS（レスポンス内のリンクで次の操作を辿る）まで含まれますが、
              実装されている例は稀です。リチャードソン成熟度モデルでいう Level
              2（リソース URL ＋ HTTP メソッドを正しく使う）が実務の主流で、
              「仕様としての REST」と「現場で REST
              と呼ばれているもの」にはギャップがあります。
            </InfoBox>
          </section>

          {/* GraphQL */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              GraphQL — 必要なフィールドだけを要求する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              GraphQL は単一のエンドポイント（多くは <code>POST /graphql</code>
              ）にクエリを送り、
              <strong>クライアントが欲しいフィールドを明示的に指定</strong>
              します。サーバはその形のとおりに JSON
              を返すため、オーバーフェッチとアンダーフェッチを同時に解消できます。
              スキーマで型が厳密に定義されるのも特徴です。
            </p>

            <CodeBlock
              language="graphql"
              title="クエリ（クライアント → サーバ）"
              code={`query {
  user(id: 42) {
    name
    posts(last: 3) {
      title
      publishedAt
    }
  }
}`}
            />

            <CodeBlock
              language="json"
              title="レスポンス（クエリと同じ形で返る）"
              code={`{
  "data": {
    "user": {
      "name": "田中 花子",
      "posts": [
        { "title": "API 設計の基礎", "publishedAt": "2026-06-01" },
        { "title": "GraphQL 入門", "publishedAt": "2026-06-10" }
      ]
    }
  }
}`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              ユーザーと投稿を 1 リクエストで取得でき、住所や決済履歴のような
              不要なフィールドは一切返ってきません。クライアント側の要求が画面ごとに
              異なっても、サーバのエンドポイントを増やさずに対応できます。
            </p>

            <InfoBox type="warning" title="GraphQL のトレードオフ">
              便利な反面、課題もあります。クライアントが自由にクエリを組めるため、
              <strong>深くネストした重いクエリ</strong>
              でサーバ負荷が読みにくくなります。 関連データを 1 件ずつ取りに行く
              N+1 問題が起きやすく、DataLoader
              などでバッチ化する対策が必要です。また、ほとんどのリクエストが
              POST の単一エンドポイントになるため、URL 単位で効く HTTP
              キャッシュ（CDN・ブラウザ）が素直には効きません。
            </InfoBox>
          </section>

          {/* gRPC */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              gRPC — サーバ間の高速通信
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              gRPC は Protocol Buffers（protobuf）でスキーマを定義し、HTTP/2
              上でやり取りする RPC スタイルです。データはテキストの JSON
              ではなくバイナリにシリアライズされるため軽量で、HTTP/2
              の多重化により低レイテンシです。単方向だけでなく
              <strong>双方向ストリーミング</strong>もサポートします。
              性能が重視されるマイクロサービス間の内部通信に向いています。
            </p>

            <CodeBlock
              language="ts"
              title=".proto — サービスとメッセージの定義"
              code={`syntax = "proto3";

service UserService {
  // 単一のユーザーを取得する
  rpc GetUser (GetUserRequest) returns (User);
}

message GetUserRequest {
  int32 id = 1;
}

message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
}`}
            />

            <p className="text-muted-foreground mt-6 mb-6 leading-relaxed">
              この <code>.proto</code>{" "}
              からサーバ・クライアント両方のコードを自動生成できるため、
              型のズレが起きにくいのが利点です。フィールド番号（<code>= 1</code>{" "}
              など）はバイナリ上の識別子で、後方互換のために一度割り当てたら変更しません。
            </p>

            <InfoBox type="info" title="ブラウザから直接は呼べない">
              gRPC は HTTP/2 の機能を細かく使うため、ブラウザの fetch
              からそのままは呼び出せません。ブラウザから使う場合は{" "}
              <strong>grpc-web</strong> という別仕様を介し、間にプロキシ（Envoy
              など）を置くのが一般的です。このため gRPC
              は「外部公開」より「サーバ間」で採用されることが多くなります。
            </InfoBox>
          </section>

          {/* tRPC */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              tRPC — TypeScript で型を共有する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              tRPC は厳密には上の 3
              つとは別カテゴリですが、近い文脈でよく挙がるので触れておきます。
              tRPC は <strong>フロントとバックを同じ TypeScript</strong>{" "}
              で書く構成を前提に、サーバ側の型定義をそのままクライアントへ共有します。
              スキーマファイル（OpenAPI や protobuf）やコード生成を介さず、
              型推論だけで入出力の型が両側でそろうのが特徴です。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ただし型共有は「同じ TypeScript
              モノレポであること」に強く依存します。クライアントが
              モバイルネイティブや他言語、あるいは不特定多数の外部利用者になる場合は
              恩恵が薄く、その場合は GraphQL や REST + OpenAPI
              の方が適しています。守備範囲が限定的だと理解した上で選ぶ道具です。
            </p>
          </section>

          {/* 使い分け表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              要件から逆算する使い分け
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              どれが「優れている」かではなく、要件に対してどれが素直かで選びます。
              下の表は典型的な向き不向きの整理です。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-bold text-foreground">
                      スタイル
                    </th>
                    <th className="py-2 pr-4 font-bold text-foreground">
                      通信
                    </th>
                    <th className="py-2 pr-4 font-bold text-foreground">
                      スキーマ
                    </th>
                    <th className="py-2 pr-4 font-bold text-foreground">
                      得意なこと
                    </th>
                    <th className="py-2 font-bold text-foreground">
                      向いている場面
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {styleRows.map((row) => (
                    <tr
                      key={row.name}
                      className="border-b border-border last:border-b-0 align-top"
                    >
                      <td className="py-3 pr-4 font-bold text-primary whitespace-nowrap">
                        {row.name}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {row.transport}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {row.schema}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {row.strength}
                      </td>
                      <td className="py-3 text-muted-foreground">{row.fit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              ざっくりした指針として、不特定多数に公開しキャッシュを効かせたいなら
              <strong>REST</strong>
              、クライアントごとに必要なデータが大きく異なるなら
              <strong>GraphQL</strong>、性能が要る内部のサーバ間通信なら
              <strong>gRPC</strong> が出発点になります。
              これらは排他ではなく、外向きは REST、内部は gRPC のように 1
              つのシステムで併用することもよくあります。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="GraphQL がオーバーフェッチを解消できるのはなぜ？"
              options={[
                { label: "レスポンスを常に gzip 圧縮するから" },
                {
                  label:
                    "クライアントが必要なフィールドをクエリで明示的に指定し、サーバがその形で返すから",
                  correct: true,
                },
                { label: "HTTP/2 を使ってバイナリで送るから" },
                { label: "エンドポイントをリソースごとに細かく分けるから" },
              ]}
              explanation="GraphQL ではクライアントが欲しいフィールドをクエリに書き、サーバはその形どおりに返します。固定された形のレスポンスを受け取る REST と違い、不要なフィールドが返らない（オーバーフェッチ解消）うえ、関連データも 1 リクエストにまとめられる（アンダーフェッチ解消）のが特徴です。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="gRPC が最も向いているのはどの場面？"
              options={[
                { label: "ブラウザから直接呼び出す公開 API" },
                {
                  label:
                    "性能が重視されるマイクロサービス間（サーバ間）の内部通信",
                  correct: true,
                },
                { label: "CDN で URL 単位にキャッシュしたい静的 API" },
                { label: "型のないスクリプトから手軽に叩きたい API" },
              ]}
              explanation="gRPC は protobuf によるバイナリ＋HTTP/2 で低レイテンシ・高スループットを得られ、双方向ストリーミングも扱えるため、サーバ間・マイクロサービス内部の通信に向いています。ブラウザからは grpc-web とプロキシが必要になるため、外部公開より内部通信で選ばれることが多くなります。"
            />
          </section>

          {/* 流行りで選ばない */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              「流行り」ではなく「要件」で選ぶ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              新しいスタイルは魅力的に見えますが、導入には運用コストが伴います。
              GraphQL ならクエリ複雑度の制御や N+1 対策、gRPC
              ならプロキシやデバッグツールの整備が必要です。
              チームの習熟度・クライアントの種類・キャッシュ要件を踏まえ、
              「この要件はどれで素直に解けるか」から選ぶのが現実的です。
            </p>

            <InfoBox type="success" title="REST は依然として既定の選択肢">
              代替を学ぶと REST が古く見えがちですが、公開 API・汎用的な CRUD・
              CDN キャッシュを効かせたい用途では REST
              が最も無難で運用も枯れています。 まず REST
              を既定とし、明確な理由（多様なクライアント要求・サーバ間の性能）が
              あるときに GraphQL や gRPC を足す、という順序が安全です。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "GraphQL 公式 - Learn",
                  url: "https://graphql.org/learn/",
                  description:
                    "GraphQL のクエリ・スキーマ・型システムを公式が体系的に解説",
                },
                {
                  title: "gRPC 公式 - Introduction to gRPC",
                  url: "https://grpc.io/docs/what-is-grpc/introduction/",
                  description:
                    "gRPC と Protocol Buffers の概念、HTTP/2 上での仕組みの公式入門",
                },
                {
                  title: "tRPC 公式ドキュメント",
                  url: "https://trpc.io/docs",
                  description:
                    "TypeScript で型を共有する tRPC の概念とセットアップ手順",
                },
                {
                  title: "MDN - HTTP/2 と Protocol negotiation",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/Messages",
                  description:
                    "gRPC の土台となる HTTP メッセージと HTTP/2 の基礎を確認できる",
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
