import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const apiKinds = [
  {
    title: "Web API (HTTP API)",
    examples: "REST、GraphQL、gRPC",
    description:
      "HTTP 上でやり取りする API。このマニュアルが主に扱う対象。ブラウザ・モバイル・他サーバなど、ネットワーク越しのクライアントが利用する。",
  },
  {
    title: "ライブラリ API",
    examples: "React の useState、lodash の関数群",
    description:
      "同じプロセス内で関数やクラスとして呼び出す API。ネットワークを介さず、関数シグネチャが「インターフェース」になる。",
  },
  {
    title: "OS / プラットフォーム API",
    examples: "File System API、Web Storage API",
    description:
      "OS やブラウザが提供する機能の窓口。アプリは内部実装を知らずに、決められた呼び出し方だけで機能を使える。",
  },
];

export default function WhatIsApi() {
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
            API とは何か
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            API は「Application Programming Interface」の略で、
            ソフトウェア同士が決められた約束に従ってやり取りするための窓口です。
            このマニュアルでは主に Web API（HTTP 経由の API）を扱いますが、
            まずは API
            という言葉が指す範囲と、設計で最も大事な「契約」という考え方を押さえます。
          </p>
        </div>

        <WhyNowBox
          tags={["API", "Web API", "契約", "クライアント", "サーバー"]}
        >
          <p>
            フロントエンド開発をしていると、API は「叩いて JSON
            が返ってくるもの」に見えます。 しかし API を
            <strong>設計する</strong>側に回ると、見え方が一変します。 URL
            の付け方ひとつ、エラーの返し方ひとつが、利用者の開発体験と保守コストを左右するからです。
            設計を学ぶ第一歩は、API が単なる通信手段ではなく
            「クライアントとサーバが交わす契約」だと捉え直すことです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* API の比喩 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              API は「レストランの注文窓口」
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              API
              を理解する定番の比喩がレストランです。あなた（クライアント）はメニュー（API
              仕様）から料理を選び、ウェイター（API）に注文します。
              ウェイターは厨房（サーバの内部実装）に伝え、出来上がった料理（レスポンス）を運んできます。
              あなたは厨房がどう調理しているかを知る必要はありません。
              <strong>
                メニューという「約束」だけを知っていれば注文できる
              </strong>
              ——これが API の本質です。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">クライアント</p>
                  <p className="text-muted-foreground">
                    料理を注文する人。ブラウザ・モバイルアプリ・他サーバ
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">API（窓口）</p>
                  <p className="text-muted-foreground">
                    注文を受けて結果を返すウェイター。仕様＝メニュー
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">サーバー</p>
                  <p className="text-muted-foreground">
                    実際に処理する厨房。内部実装は隠蔽される
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="「隠蔽」こそが価値">
              API の役割は、内部実装を隠して「使い方」だけを公開することです。
              厨房のレシピが変わっても、メニュー（API
              仕様）が同じならクライアントは影響を受けません。
              この分離が、独立した開発・テスト・デプロイを可能にします。
            </InfoBox>
          </section>

          {/* API の種類 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              API という言葉が指す範囲
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「API」は Web
              に限った言葉ではありません。関数やライブラリの呼び出し口も API
              です。 このマニュアルが扱うのは主に Web API
              ですが、どれも「実装を隠して使い方を定義する」という共通点を持ちます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {apiKinds.map((kind) => (
                <div
                  key={kind.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {kind.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {kind.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {kind.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* リクエストとレスポンスの実例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Web API のやり取りを覗いてみる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              実際の Web API
              のやり取りは、リクエストとレスポンスのペアでできています。
              下はユーザー一覧を取得する例です。クライアントは「どのリソースを・どう操作したいか」を
              HTTP で伝え、サーバは結果を JSON で返します。
            </p>

            <CodeBlock
              language="bash"
              title="リクエスト（クライアント → サーバ）"
              code={`curl https://api.example.com/v1/users/42 \\
  -H "Accept: application/json"`}
            />

            <CodeBlock
              language="json"
              title="レスポンス（サーバ → クライアント）"
              code={`{
  "id": 42,
  "name": "田中 花子",
  "email": "hanako@example.com",
  "createdAt": "2026-06-20T09:00:00Z"
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              注目すべきは、クライアントが{" "}
              <code>https://api.example.com/v1/users/42</code>{" "}
              という「住所」と、暗黙の「ユーザー42
              を取得したい」という意図だけで結果を得られている点です。
              データベースの種類もサーバの言語も知る必要がありません。
              この「約束された住所と振る舞い」の集合こそが API です。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="API の最も本質的な役割はどれ？"
              options={[
                { label: "サーバの処理速度を上げること" },
                {
                  label:
                    "内部実装を隠し、決められた使い方（契約）だけを公開すること",
                  correct: true,
                },
                { label: "データベースに直接アクセスできるようにすること" },
                { label: "JSON を必ず返すようにすること" },
              ]}
              explanation="API の本質は「抽象化（隠蔽）」です。内部実装を隠して使い方だけを定義することで、提供側と利用側が独立して開発・変更できるようになります。JSON はよく使われる表現形式の一つにすぎません。"
            />
          </section>

          {/* 契約という考え方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              API は「契約」である
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              設計の観点で最も重要なのは、API を
              <strong>契約（コントラクト）</strong>として捉えることです。
              契約とは「このURLにこの形式でリクエストすれば、この形式でレスポンスが返る」という、
              提供側と利用側の合意です。一度公開した契約を勝手に破ると、
              それに依存している全クライアントが壊れます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              だからこそ、後の章で学ぶ OpenAPI
              のような「契約を機械可読な形で明文化する」仕組みが重要になります。
              契約が曖昧なまま実装を進めると、フロントとバックで認識がずれ、
              「ドキュメントには id は数値とあるのに実際は文字列で返ってくる」
              といった事故が起きます。
            </p>

            <InfoBox type="warning" title="契約のズレは静かに壊れる">
              型の不一致（数値のはずが文字列、必須のはずが欠落）は、
              コンパイル時には気づけず、本番で初めて表面化することがあります。
              契約を仕様として固定し、検証を自動化することが、
              この「静かな破壊」を防ぐ唯一の現実的な手段です。詳しくは検証の章で扱います。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="API を「契約」と捉えると、なぜ後方互換性が重要になる？"
              options={[
                { label: "サーバのコストを下げられるから" },
                {
                  label:
                    "公開済みの契約を破ると、それに依存する全クライアントが壊れるから",
                  correct: true,
                },
                { label: "JSON のサイズを小さくできるから" },
                { label: "API の応答が速くなるから" },
              ]}
              explanation="契約は提供側と利用側の合意です。一度公開した契約（URL・パラメータ・レスポンス形式）を破壊的に変更すると、その約束に従って実装された全クライアントが動かなくなります。だから変更にはバージョニングや非推奨化といった段階的な手順が必要になります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "MDN - Web API の概要",
                  url: "https://developer.mozilla.org/ja/docs/Web/API",
                  description:
                    "ブラウザが提供する Web API の一覧と概念。API という言葉の広がりを掴める",
                },
                {
                  title: "MDN - HTTP の概要",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/Overview",
                  description:
                    "Web API の土台となる HTTP の基礎。次の章につながる",
                },
                {
                  title: "REST API Tutorial",
                  url: "https://restfulapi.net/",
                  description:
                    "REST API 設計の概念を体系的にまとめた英語リファレンス",
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
