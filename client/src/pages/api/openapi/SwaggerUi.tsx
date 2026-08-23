import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

// Swagger UI と Redoc の役割の違いを 1 行で対比できる比較データ
const toolComparison = [
  {
    feature: "主な目的",
    swagger: "試しながら触れるインタラクティブな仕様",
    redoc: "じっくり読む 3 カラムのリファレンス",
  },
  {
    feature: "リクエスト実行",
    swagger: "あり（Try it out → Execute）",
    redoc: "なし（標準では閲覧のみ）",
  },
  {
    feature: "認証セット",
    swagger: "Authorize ボタンで Bearer 等を保持",
    redoc: "閲覧のみのため不要",
  },
  {
    feature: "レイアウト",
    swagger: "操作対象が縦に並ぶ折りたたみ式",
    redoc: "左ナビ・中央解説・右サンプルの 3 カラム",
  },
  {
    feature: "向いている場面",
    swagger: "開発中の動作確認・手元での検証",
    redoc: "公開ドキュメント・読み物としての配布",
  },
];

// /docs と /openapi.json の役割の違い
const endpointRoles = [
  {
    path: "/openapi.json",
    role: "契約の正本",
    description:
      "OpenAPI 仕様そのもの。機械可読な JSON（または YAML）で、コード生成・検証・各種ツールの入力になる。人間ではなくツールが読む。",
  },
  {
    path: "/docs",
    role: "人間向けの画面",
    description:
      "/openapi.json を Swagger UI が読み込んで描画した HTML。開発者が目で読み、Try it out で実行する。中身は正本から自動生成される。",
  },
];

export default function SwaggerUi() {
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
            Swagger UI と Redoc
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            OpenAPI
            で書いた仕様は、そのまま人間が読めるドキュメントに変換できます。
            その定番ツールが Swagger UI と Redoc です。 Swagger UI
            は仕様を「触れる」画面に、Redoc は「読む」ドキュメントに変えます。
            このページでは両者の使い分けと、ブラウザから実際にリクエストを送れる
            Try it out の便利さと危うさを整理します。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "OpenAPI",
            "Swagger UI",
            "Redoc",
            "ドキュメント生成",
            "Try it out",
          ]}
        >
          <p>
            OpenAPI ファイルは契約の正本ですが、JSON や YAML
            のままでは人間には読みにくいものです。
            そこで仕様を入力すると、ナビゲーション・サンプル・スキーマ付きの API
            ドキュメントを
            <strong>自動生成</strong>してくれるのが Swagger UI と Redoc です。
            手書きの README と違い、仕様を更新すればドキュメントも追従するため、
            「ドキュメントだけ古い」という典型的な事故を防げます。 一方で
            Swagger UI の Try it out は実在のサーバを叩くため、
            向き先を誤ると本番データに副作用が出ます。便利さと同時にこの境界を理解しておく必要があります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 2 つのツールの役割 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              同じ仕様から、性格の違う 2 つの画面
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Swagger UI と Redoc は、どちらも 1 つの OpenAPI
              ファイルを入力にして
              ドキュメントを生成します。違いは「触れるかどうか」です。 Swagger
              UI はその場でリクエストを送って動作確認できる開発者向けの画面、
              Redoc は仕様を落ち着いて読むための読み物寄りのドキュメントです。
              どちらか一方ではなく、用途に応じて両方を併用する構成もよく使われます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">Swagger UI</p>
                  <p className="text-muted-foreground leading-relaxed">
                    各エンドポイントを開いて Try it out → Execute で実際に HTTP
                    リクエストを送れる。Authorize で認証情報を保持し、 Schemas
                    でモデル定義も確認できる。動作確認に向く。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">Redoc</p>
                  <p className="text-muted-foreground leading-relaxed">
                    左にナビ、中央に解説、右にサンプルが並ぶ 3 カラム。
                    標準では実行機能を持たず、仕様をきれいに「読む」ことに特化。
                    公開ドキュメントや配布物に向く。
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="text-left font-bold p-3">観点</th>
                    <th className="text-left font-bold p-3">Swagger UI</th>
                    <th className="text-left font-bold p-3">Redoc</th>
                  </tr>
                </thead>
                <tbody>
                  {toolComparison.map((row) => (
                    <tr key={row.feature} className="border-t border-border">
                      <td className="p-3 font-medium text-foreground">
                        {row.feature}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.swagger}
                      </td>
                      <td className="p-3 text-muted-foreground">{row.redoc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="どちらも入力は同じ OpenAPI">
              Swagger UI も Redoc も、入力するのは同じ OpenAPI ファイル （
              <code>openapi.json</code> や <code>openapi.yaml</code>）です。
              仕様が契約の正本なので、見せ方を変えたいだけならツールを差し替えるだけで済みます。
              ドキュメントを手書きしないこの仕組みが、仕様とドキュメントのズレを防ぎます。
            </InfoBox>
          </section>

          {/* Swagger UI の操作フロー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Swagger UI で実際にリクエストを送る
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Swagger UI の特徴は、ドキュメントを読みながらその場で API
              を呼び出せることです。基本の流れは次の通りです。 認証が必要な API
              では、最初に Authorize で資格情報をセットしておくと、
              以降の実行リクエストに自動で付与されます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <ol className="space-y-3 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                <li>
                  <span className="text-foreground font-medium">Authorize</span>{" "}
                  ボタンを押し、Bearer トークンや API
                  キーなどの認証情報をセットする
                </li>
                <li>
                  目的のエンドポイントを開き、
                  <span className="text-foreground font-medium">
                    Try it out
                  </span>{" "}
                  を押してパラメータを編集可能にする
                </li>
                <li>
                  パスパラメータやリクエストボディを入力し、
                  <span className="text-foreground font-medium">
                    Execute
                  </span>{" "}
                  を押して実際の HTTP リクエストを送信する
                </li>
                <li>
                  返ってきたステータスコードとレスポンスボディ、 実行された curl
                  相当のコマンドを画面上で確認する
                </li>
                <li>
                  <span className="text-foreground font-medium">Schemas</span>{" "}
                  セクションで、リクエスト・レスポンスのモデル定義を確認する
                </li>
              </ol>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              ここで重要なのは、Execute が描画上のシミュレーションではなく
              <strong>実在のサーバへ本物のリクエストを送っている</strong>
              点です。 Swagger UI は OpenAPI の <code>servers</code>{" "}
              で指定された URL
              に対してリクエストを発行します。向き先が本番なら、 本番の API
              が実際に呼ばれます。
            </p>
          </section>

          {/* Execute の副作用 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Try it out は「本物のリクエスト」を送る
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              GET でデータを取得するだけなら影響は限定的ですが、
              POST・PUT・PATCH・DELETE を Execute すると、サーバ側で実際に
              作成・更新・削除が起きます。Swagger UI
              の向き先が本番サーバの場合、
              本番データに副作用が出ます。「ドキュメントを試しただけ」のつもりが、
              本番レコードを削除してしまう事故につながります。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">GET</p>
                  <p className="text-muted-foreground">
                    取得のみ。基本は副作用なし（ただし課金 API などは要注意）
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    POST / PUT / PATCH
                  </p>
                  <p className="text-muted-foreground">
                    実際にデータが作成・更新される。テストデータが本番に残る
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">DELETE</p>
                  <p className="text-muted-foreground">
                    実際にレコードが削除される。取り消しできないこともある
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="warning" title="Execute は本番 DB に効く">
              Swagger UI の Execute は、OpenAPI の <code>servers</code>{" "}
              に書かれた URL
              へ本物のリクエストを送ります。向き先が本番サーバのまま DELETE を
              Execute すれば、本番のレコードが本当に消えます。
              実行前に必ず画面上部の <code>servers</code>{" "}
              ドロップダウンで向き先を確認し、検証時はステージング環境やモックサーバへ向けてください。
              本番向けの公開ドキュメントでは、実行機能を持たない Redoc
              を選ぶか、 Try it out を無効化する設定を検討します。
            </InfoBox>
          </section>

          {/* Quiz 1: /docs vs /openapi.json */}
          <section>
            <Quiz
              question="FastAPI などが自動でホストする /docs と /openapi.json の違いとして正しいのは？"
              options={[
                {
                  label:
                    "/openapi.json が契約の正本（機械可読な仕様）で、/docs はそれを Swagger UI が描画した人間向けの画面",
                  correct: true,
                },
                {
                  label: "/docs が正本で、/openapi.json はその印刷用 PDF 変換",
                },
                {
                  label: "両方とも同じ HTML で、URL が違うだけ",
                },
                {
                  label:
                    "/openapi.json は本番専用、/docs は開発専用で内容が異なる",
                },
              ]}
              explanation="/openapi.json は OpenAPI 仕様そのもの（契約の正本）で、ツールが読む機械可読データです。/docs はその正本を Swagger UI が読み込んで描画した人間向けの HTML 画面で、内容は正本から自動生成されます。FastAPI のようなフレームワークは両方を自動でホストします。"
            />
          </section>

          {/* /docs と /openapi.json */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              /docs と /openapi.json の関係
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              FastAPI をはじめ多くのフレームワークは、起動するだけで 2 つの URL
              を自動で公開します。人間が読む <code>/docs</code>（Swagger
              UI）と、 ツールが読む <code>/openapi.json</code>（生の
              OpenAPI）です。 前者は後者から自動生成されるため、正本は常に{" "}
              <code>/openapi.json</code> 側にあります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {endpointRoles.map((item) => (
                <div
                  key={item.path}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    <code>{item.path}</code>
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {item.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              この区別を押さえておくと、ツール連携で迷いません。
              コード生成やクライアント自動生成、Redoc でのドキュメント化など、
              ツールに渡すのは常に <code>/openapi.json</code>（正本）です。
              <code>/docs</code> はあくまで人間が見るための画面なので、
              スクレイピングして使うものではありません。
            </p>
          </section>

          {/* CDN で Swagger UI を埋め込む */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              静的な HTML に Swagger UI を埋め込む
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              フレームワークが自動ホストしない場合でも、CDN から Swagger UI
              を読み込めば、1 枚の HTML だけで仕様を描画できます。
              <code>url</code> に OpenAPI ファイルの場所を指定するだけです。
              手元の仕様をすぐ可視化したいときに便利です。
            </p>

            <CodeBlock
              language="html"
              title="CDN から Swagger UI を埋め込む最小構成（index.html）"
              code={`<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>API Docs</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/swagger-ui-dist@5.32.14/swagger-ui.css"
    />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.32.14/swagger-ui-bundle.js"></script>
    <script>
      window.ui = SwaggerUIBundle({
        // 描画したい OpenAPI ファイルの場所を指す
        url: "/openapi.json",
        dom_id: "#swagger-ui",
      });
    </script>
  </body>
</html>`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              この HTML を開くと、<code>/openapi.json</code> を読み込んだ
              Swagger UI が表示されます。Try it out も使えるようになるため、
              公開する場合は向き先サーバと認証の扱いに注意してください。
            </p>
          </section>

          {/* Redoc でドキュメント生成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Redoc で静的ドキュメントを書き出す
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Redoc は CLI（<code>@redocly/cli</code>）で 1 枚の HTML
              に書き出せます。実行機能を持たないため、
              副作用を心配せず配布できる公開ドキュメントに向いています。
              出力された HTML
              はサーバ不要で、そのまま静的ホスティングに置けます。
            </p>

            <CodeBlock
              language="bash"
              title="Redocly CLI で OpenAPI から静的 HTML を生成する"
              code={`# OpenAPI ファイルから 1 枚の静的 HTML を生成
npx @redocly/cli build-docs openapi.json -o docs/index.html

# プレビュー用にローカルサーバで開く（実行機能はない）
# 現行の 2.x では preview を使う
npx @redocly/cli preview

# preview-docs は CLI 1.x のコマンド。使うならメジャーを固定する
npx @redocly/cli@1 preview-docs openapi.json`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              生成された <code>docs/index.html</code>{" "}
              は依存サーバを持たない単独の HTML なので、 GitHub Pages
              や任意の静的ホスティングにそのまま置けます。
              「読ませる」ドキュメントは Redoc、 「触らせる」検証画面は Swagger
              UI、と役割で分けるのが定石です。
            </p>

            <InfoBox type="success" title="併用が現実的な落としどころ">
              開発中の動作確認には Swagger UI、 利用者向けの公開ドキュメントには
              Redoc、という併用構成が一般的です。 どちらも入力は同じ OpenAPI
              ファイルなので、
              正本さえメンテナンスしておけば両方の画面が同時に最新化されます。
            </InfoBox>
          </section>

          {/* Quiz 2: Try it out の副作用 */}
          <section>
            <Quiz
              question="本番サーバを指している Swagger UI で、DELETE エンドポイントを Try it out → Execute するとどうなる？"
              options={[
                {
                  label:
                    "画面上のシミュレーションだけで、サーバには何も起きない",
                },
                {
                  label:
                    "実在の本番サーバへ DELETE リクエストが送られ、本番のレコードが実際に削除される",
                  correct: true,
                },
                {
                  label:
                    "Swagger UI が自動でステージング環境に切り替えて実行する",
                },
                {
                  label: "GET に変換されてから送られるので安全",
                },
              ]}
              explanation="Try it out → Execute は OpenAPI の servers に書かれた URL へ本物のリクエストを送ります。向き先が本番なら、DELETE は本番のレコードを実際に削除します。Swagger UI が安全な環境に切り替えたり、メソッドを変換したりはしません。検証時は向き先をステージングやモックに合わせるか、実行機能のない Redoc を使います。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Swagger UI 公式ドキュメント",
                  url: "https://swagger.io/open-source/swagger-ui/",
                  description:
                    "Swagger UI の概要と導入方法。Try it out や Authorize の挙動の一次情報",
                },
                {
                  title: "Redoc / Redocly CLI（GitHub）",
                  url: "https://github.com/Redocly/redoc",
                  description:
                    "Redoc の公式リポジトリ。CLI でのドキュメント生成手順とオプションを確認できる",
                },
                {
                  title: "FastAPI - 自動ドキュメント（/docs と /openapi.json）",
                  url: "https://fastapi.tiangolo.com/features/",
                  description:
                    "/docs（Swagger UI）と /openapi.json を自動ホストする実例。両者の関係が掴める",
                },
                {
                  title: "OpenAPI Specification 公式",
                  url: "https://spec.openapis.org/oas/latest.html",
                  description:
                    "契約の正本となる OpenAPI 仕様そのもの。servers などの定義の根拠",
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
