import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const checklist = [
  {
    title: "リソースは名詞・複数形",
    detail:
      "URL は動詞ではなく名詞で表す。コレクションは複数形（/users、/orders）に統一する。/getUser のような動詞 URL は避ける。",
  },
  {
    title: "HTTP メソッドとステータスコードを正しく使う",
    detail:
      "取得は GET、作成は POST、全置換は PUT、部分更新は PATCH、削除は DELETE。成功・失敗はステータスコードで表現し、本文の独自フラグで判定させない。",
  },
  {
    title: "命名と日時形式の一貫性",
    detail:
      "プロパティ名の語形（camelCase か snake_case）を全エンドポイントで統一。日時は ISO 8601（RFC 3339）で UTC 表記に揃える。",
  },
  {
    title: "エラーは Problem Details で統一",
    detail:
      "RFC 9457（旧 RFC 7807）の application/problem+json で type・title・status・detail を返す。エンドポイントごとに独自のエラー形を作らない。",
  },
  {
    title: "一覧はページネーション",
    detail:
      "コレクションは件数が増える前提で、最初からページネーション（cursor または offset）を入れる。上限のない全件返却を許さない。",
  },
  {
    title: "認証と認可をオブジェクト単位で",
    detail:
      "「ログイン済みか（認証）」と「このリソースを操作してよいか（認可）」を分ける。ID を差し替えただけで他人のデータを操作できないよう、オブジェクト単位で権限を検証する。",
  },
  {
    title: "バージョニング方針を決める",
    detail:
      "破壊的変更に備え、URL パス（/v1）かヘッダーかを最初に決めて文書化する。後方互換を壊す変更は段階的な非推奨化を経る。",
  },
  {
    title: "OpenAPI を契約の正本にする",
    detail:
      "実装ではなく OpenAPI 定義を「契約の正本（single source of truth）」とする。ドキュメント・モック・クライアント生成をここから派生させる。",
  },
  {
    title: "Spectral で Lint する",
    detail:
      "OpenAPI 定義を Spectral で静的検査し、命名規約やレスポンス定義の漏れを CI で自動検出する。レビュー前に機械で弾く。",
  },
  {
    title: "契約テストを置く",
    detail:
      "実装のレスポンスが OpenAPI 定義に一致するかを契約テストで検証する。仕様と実装のズレを「静かに壊れる」前に捕まえる。",
  },
  {
    title: "セキュリティ（OWASP API Top 10）",
    detail:
      "認可不備（BOLA）、認証の弱さ、過剰なデータ露出など、OWASP API Security Top 10 の典型的な穴を設計段階でチェックする。",
  },
];

const reviewPoints = [
  {
    label: "命名",
    question:
      "URL・プロパティ名は他のエンドポイントと同じ規則で揃っているか。新しい単語を勝手に増やしていないか。",
  },
  {
    label: "メソッド / ステータス",
    question:
      "操作の意味とメソッドが一致しているか。成功・失敗のステータスコードは妥当か。",
  },
  {
    label: "エラー",
    question:
      "エラー形式は Problem Details に統一されているか。クライアントが機械的に分岐できるか。",
  },
  {
    label: "互換性",
    question:
      "既存クライアントを壊す変更が含まれていないか。含むならバージョニングや非推奨化の段取りがあるか。",
  },
  {
    label: "契約",
    question:
      "OpenAPI 定義は更新されているか。Spectral と契約テストは通っているか。",
  },
];

export default function Summary() {
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
            設計まとめとチェックリスト
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            このマニュアルで扱ってきた API
            設計の原則を、実務で使えるチェックリストにまとめます。
            リソース設計から HTTP
            メソッド、エラー、認証認可、契約の明文化、セキュリティまで、
            設計レビューでそのまま使える観点として並べました。
            最後に伝えたいのは、
            個々のテクニックよりも「一貫していること」こそが API
            の最大の価値だということです。
          </p>
        </div>

        <WhyNowBox
          tags={["API 設計", "チェックリスト", "レビュー", "一貫性", "OpenAPI"]}
        >
          <p>
            ここまでの章で学んだ原則は、単体ではどれも当たり前に見えます。
            しかし API の品質を決めるのは、それらが
            <strong>全エンドポイントで一貫して守られているか</strong>です。
            一貫した API は、利用者が一度学べば残りを推測できます。
            逆に、エンドポイントごとに命名やエラー形式がバラバラな API
            は、たとえ各機能が正しく動いても、利用者の学習コストと事故率を押し上げます。
            設計レビューの仕事は、機能の正しさだけでなく、この一貫性を守ることです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* これまでの振り返り */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              これまでの章を振り返る
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              このマニュアルは「API
              とは何か」から始まり、HTTP・リソース設計・エラー・ページネーション・認証認可・バージョニング・OpenAPI・検証・セキュリティへと進んできました。
              貫いているテーマは一つです。
              <strong>
                API
                はクライアントとサーバが交わす契約であり、契約は一貫していなければ価値が下がる
              </strong>
              。 個々の章はこの一文を、それぞれの角度から具体化したものでした。
            </p>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">基礎</p>
                  <p className="text-muted-foreground">
                    API という契約、HTTP
                    メソッド、ステータスコード、リソース設計
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">運用設計</p>
                  <p className="text-muted-foreground">
                    エラー統一、ページネーション、認証・認可、バージョニング
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">品質保証</p>
                  <p className="text-muted-foreground">
                    OpenAPI を契約の正本に、Spectral で
                    Lint、契約テスト、セキュリティ
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* チェックリスト本体 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              API 設計チェックリスト
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              設計を始めるとき、また設計レビューに臨むときに、上から順に確認できる形でまとめました。
              すべてを一度に完璧にする必要はありません。 最初の API
              では上半分（リソース・メソッド・命名・エラー）を確実に押さえ、
              規模が育つにつれて下半分（契約の明文化・検証・セキュリティ）を足していくのが現実的です。
            </p>

            <div className="grid grid-cols-1 gap-3">
              {checklist.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-5 flex gap-4"
                >
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1 text-base">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="HATEOAS は「仕様」、Level 2 が「実測」">
              REST の理想形（Richardson 成熟度モデルの Level
              3）は、レスポンスに次に取れる操作のリンクを埋め込む HATEOAS
              を含みます。しかし実務で広く運用されている API
              の多くは、リソース指向と適切な HTTP メソッドまでを満たす Level 2
              にとどまります。仕様としての純粋な REST
              と、現場で主流の設計には差がある、と知っておくと混乱しません。
              本チェックリストも Level 2 を実用的な基準として置いています。
            </InfoBox>
          </section>

          {/* チェックリストをコードで */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              レビュー用チェックリスト（コピーして使う）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              プルリクエストのテンプレートや設計ドキュメントに貼り付けられるよう、
              YAML 形式のチェックリストにしておきます。 各項目を done / todo
              で管理すれば、設計レビューの抜け漏れを機械的に潰せます。
            </p>

            <CodeBlock
              language="yaml"
              title="api-design-checklist.yaml"
              code={`# API 設計チェックリスト（設計レビュー用）
resource:
  名詞・複数形のURL: todo          # /users, /orders
  動詞URLを使っていない: todo      # /getUser はNG
http:
  メソッドが操作と一致: todo        # GET/POST/PUT/PATCH/DELETE
  ステータスコードが妥当: todo      # 2xx/4xx/5xx を本文フラグで代用しない
consistency:
  命名規則が全体で統一: todo        # camelCase か snake_case を統一
  日時は ISO 8601(RFC 3339): todo  # 例 2026-06-20T09:00:00Z
errors:
  Problem Details で統一: todo     # RFC 9457 / application/problem+json
collections:
  ページネーションあり: todo        # cursor または offset、全件返却なし
security:
  認証と認可を分離: todo
  オブジェクト単位の認可: todo      # ID 差し替えで他人のデータを触れない
  OWASP API Top 10 を確認: todo
versioning:
  バージョニング方針を文書化: todo  # /v1 など、破壊的変更は段階的非推奨
contract:
  OpenAPI が契約の正本: todo
  Spectral で Lint 通過: todo
  契約テストで実装と一致を検証: todo`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="エンドポイントごとに命名やエラー形式が異なる API の、最大の問題はどれ？"
              options={[
                { label: "レスポンスのバイト数が増える" },
                {
                  label:
                    "各機能が正しく動いても、一貫性の欠如が利用者の学習コストと事故率を押し上げる",
                  correct: true,
                },
                { label: "サーバの CPU 使用率が上がる" },
                { label: "HTTP のバージョンが古くなる" },
              ]}
              explanation="API の価値は一貫性にあります。命名やエラー形式が揃っていれば、利用者は一度学べば残りを推測できます。逆にバラバラだと、たとえ個々の機能が正しく動いても、利用者は毎回ドキュメントを読み直す必要があり、誤用による事故も増えます。"
            />
          </section>

          {/* 設計レビューの観点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              設計レビューの観点
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              レビューでは「動くかどうか」だけでなく、「既存の API
              と揃っているか」を必ず確認します。
              新しいエンドポイントが既存の規約から外れると、 その瞬間に API
              全体の一貫性が一段下がります。
              以下を質問の形で持っておくと、レビューがぶれません。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-bold text-foreground whitespace-nowrap">
                      観点
                    </th>
                    <th className="text-left py-3 font-bold text-foreground">
                      レビューで投げる質問
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reviewPoints.map((point) => (
                    <tr key={point.label} className="border-b border-border">
                      <td className="py-3 pr-4 font-medium text-primary whitespace-nowrap align-top">
                        {point.label}
                      </td>
                      <td className="py-3 text-muted-foreground leading-relaxed">
                        {point.question}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="success" title="一貫性こそ最大の価値">
              個別のテクニックは入れ替え可能です。cursor ページネーションでも
              offset でも、運用が回るならどちらでもよい。
              本当に重要なのは、選んだ方針を
              <strong>全エンドポイントで守り切ること</strong>です。 一貫した API
              は利用者にとって学習可能で予測可能であり、それ自体が設計の最大の価値になります。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="OpenAPI 定義を「契約の正本（single source of truth）」に据える主な狙いはどれ？"
              options={[
                { label: "API のレスポンスを高速化するため" },
                {
                  label:
                    "ドキュメント・モック・クライアント生成・契約テストを同じ定義から派生させ、仕様と実装のズレを防ぐため",
                  correct: true,
                },
                { label: "サーバの言語を統一するため" },
                { label: "認証を不要にするため" },
              ]}
              explanation="OpenAPI を正本にすると、ドキュメント・モック・クライアントコード・契約テストがすべて同じ定義から生成・検証されます。実装が定義からずれれば Spectral や契約テストで検出できるため、「ドキュメントと実物が違う」という静かな破壊を防げます。"
            />
          </section>

          {/* 次のステップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              次のステップ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              一番の学びは、小さくてよいので実際に API
              を一つ設計してみることです。 おすすめは
              <strong>OpenAPI から先に書く</strong>進め方です。 リソースを 2〜3
              個に絞り、URL・メソッド・レスポンス・エラーを OpenAPI
              に書き、Spectral を通してから実装に入る。
              この順番だと、本チェックリストの項目が自然に手に馴染みます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              設計した API を実際に使う側も体験すると理解が深まります。
              本サイトの React マニュアルには<strong>「API 連携」</strong>
              の章があり、 フロントエンドから API
              を呼び出してエラーやローディングを扱う実践を学べます。 また、API
              を自分で提供する側に回るなら、Next.js の
              <strong>「Route Handlers」</strong>
              のように、フレームワーク標準の仕組みで
              エンドポイントを実装する流れを押さえておくと、設計から実装まで一気通貫でつながります。
            </p>

            <InfoBox type="warning" title="完璧を目指して止まらない">
              チェックリストの全項目を最初から満たそうとすると、最初の一歩が出ません。
              小さい API
              では、リソース・メソッド・命名・エラーの一貫性を確実に押さえれば十分です。
              ページネーションや契約テスト、セキュリティ強化は、利用者が増えてから段階的に足していけます。
              大事なのは止まらずに一度作りきり、運用しながら育てることです。
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "OpenAPI Specification（公式）",
                  url: "https://spec.openapis.org/oas/latest.html",
                  description:
                    "契約の正本に据える OpenAPI の最新仕様。設計を始める前に一読しておきたい",
                },
                {
                  title: "Microsoft REST API Guidelines",
                  url: "https://github.com/microsoft/api-guidelines",
                  description:
                    "命名・エラー・ページネーション・バージョニングを網羅した実務寄りのガイドライン",
                },
                {
                  title: "Google API Design Guide（AIP）",
                  url: "https://google.aip.dev/",
                  description:
                    "リソース指向設計を体系化した Google の設計原則集。命名と一貫性の基準として参照しやすい",
                },
                {
                  title: "OWASP API Security Top 10",
                  url: "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
                  description:
                    "認可不備（BOLA）など API 特有の脆弱性トップ 10。セキュリティ観点のチェックに使う",
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
