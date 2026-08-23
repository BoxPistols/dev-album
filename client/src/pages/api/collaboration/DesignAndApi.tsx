import { Link } from "wouter";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

// UI 状態と API レスポンスの対応表（デザインと API の接続点を一覧化）
const uiStates = [
  {
    state: "loading",
    api: "リクエスト送信中。まだレスポンスは無い。",
    design: "スピナー / スケルトン。レイアウトシフトを防ぐ枠だけ先に置く。",
  },
  {
    state: "success",
    api: "200 OK + データ本体（配列やオブジェクト）。",
    design: "通常のコンテンツ表示。",
  },
  {
    state: "empty",
    api: "200 OK だが件数が 0（空配列 []）。",
    design: "空状態（イラスト + 説明 + 次のアクション導線）。",
  },
  {
    state: "error",
    api: "4xx / 5xx + エラー形（detail 等）。",
    design: "エラー表示。リトライ導線、フィールド単位のメッセージ。",
  },
  {
    state: "partial",
    api: "200 OK + ページネーション情報（次ページの有無）。",
    design: "「もっと見る」ボタン / 無限スクロール / ページ送り。",
  },
];

export default function DesignAndApi() {
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
            デザイン・情報設計と API
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            デザイナーが情報を整理する作業と、バックエンドがリソースを設計する作業は
            地続きです。画面の情報構造（ナビゲーション・コンテンツ階層）は、
            そのまま API のリソースとエンドポイントの構造に対応しやすい。
            さらに、デザイナーが描くべき「空状態」「エラー状態」「ローディング」は、
            API がその状態を表現できることが前提になります。
            このページでは、情報設計と API がどう鏡像になるかを整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["情報設計", "IA", "UI 状態", "空状態", "デザイン協業"]}
        >
          <p>
            「API はバックエンドの仕事」と切り分けてしまうと、
            <strong>空状態やエラー表示のデザインが後追いになり</strong>、
            実装段階で「この状態を表すデータが API
            から返ってこない」と発覚します。
            情報設計の段階で「画面が取りうる状態」を洗い出し、 それを API
            のレスポンス形に対応づけておくと、 デザインと API
            が同じ構造を共有でき、手戻りが減ります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* IA と API は鏡像 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              情報アーキテクチャと API リソースは鏡像になる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              情報アーキテクチャ（IA）は、コンテンツをどう分類し、どう階層化し、
              どう辿らせるかの設計です。これは API
              のリソース設計と多くが重なります。
              画面のナビゲーション構造が「どんなリソースがあるか」を、
              詳細画面への遷移が「親リソースから子リソースへの関係」を、
              ほぼそのまま映し出すからです。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    画面の情報構造（IA）
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    「記事一覧 → 記事詳細 → コメント一覧」という
                    ナビゲーションとコンテンツ階層。
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    リソースとエンドポイント
                  </p>
                  <p className="text-muted-foreground leading-relaxed font-mono text-xs">
                    /articles → /articles/{"{id}"} → /articles/{"{id}"}/comments
                  </p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              デザイナーがサイトマップやワイヤーフレームで情報を整理する作業は、
              バックエンドがリソースの粒度と関係を決める作業と同じ対象を
              別の言葉で記述しているにすぎません。だからこそ、
              <strong>
                早い段階で両者を突き合わせると齟齬が見つかりやすい
              </strong>
              。 IA の考え方そのものは UX デザインマニュアルの{" "}
              <Link
                href="/ux-design/ia-wireframe/information-architecture"
                className="text-primary underline underline-offset-2"
              >
                情報アーキテクチャ
              </Link>{" "}
              で扱っています。
            </p>
          </section>

          {/* UI 状態 ↔ API レスポンス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              UI 状態と API レスポンスの対応
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ひとつの画面は、データの取得状況によって複数の状態を持ちます。
              この「画面の状態」と「API のレスポンス」は一対一に近い関係です。
              デザイナーが各状態をデザインするには、API がその状態を
              区別できる形でレスポンスを返す必要があります。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-bold text-foreground bg-muted">
                      UI 状態
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      API レスポンス
                    </th>
                    <th className="text-left py-2 px-4 font-bold text-foreground bg-muted">
                      デザインに必要なもの
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {uiStates.map((s) => (
                    <tr key={s.state} className="border-b border-border">
                      <td className="py-2 pr-4 font-mono text-primary whitespace-nowrap align-top">
                        {s.state}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {s.api}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top">
                        {s.design}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox
              type="info"
              title="空・エラー・ローディングは「API が表現できる」ことが前提"
            >
              デザイナーが空状態やエラー状態を用意しても、API が 「0
              件」と「エラー」を同じ形で返してしまうと、画面側で区別できません。
              空は <code>200 OK + 空配列</code>、エラーは
              <code>4xx/5xx + エラー形</code> のように、
              <strong>状態ごとに明確に区別できる形で返す</strong>
              ことが、デザインを成立させる条件になります。
            </InfoBox>
          </section>

          {/* empty / error の形 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              空（empty）とエラー（error）はレスポンスの形が違う
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              「検索結果が 0 件」と「検索に失敗した」は、ユーザーに見せる画面が
              まったく異なります。前者は空状態（次の行動を促す）、後者はエラー表示
              （リトライや原因の提示）です。この差は API
              のレスポンスの形に表れます。
            </p>

            <CodeBlock
              language="json"
              title="① 空（empty）: 200 OK で件数 0。エラーではない"
              code={`{
  "items": [],
  "total": 0,
  "page": 1,
  "has_next": false
}`}
            />

            <CodeBlock
              language="json"
              title="② エラー（error）: 4xx/5xx。FastAPI 既定の 422 バリデーション形"
              code={`{
  "detail": [
    {
      "type": "missing",
      "loc": ["body", "title"],
      "msg": "Field required",
      "input": {}
    }
  ]
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              この 2 つを同じ「データが無い状態」として扱うと、 検索結果が 0
              件のときに赤いエラー表示が出るような不自然な画面になります。 空は{" "}
              <code>items: []</code> で表現し、エラーは HTTP
              ステータスとエラー形（上記の <code>detail</code> 等）で表現する、
              という<strong>表現の分離</strong>をデザインと API
              の両方で守ります。
            </p>

            <InfoBox type="warning" title="認証エラーの形は 422 とは別">
              FastAPI ではバリデーション失敗の 422 は<code>detail</code>{" "}
              が配列ですが、認証失敗の 401 では
              <code>{'{"detail": "文字列"}'}</code> のように
              <code>detail</code> が文字列になります。
              デザイン側でエラーメッセージを表示するときは、
              <strong>detail が配列のときと文字列のときの両方</strong>
              を想定したエラー表示にしておくと崩れません。
            </InfoBox>
          </section>

          {/* enum → UI */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              enum・制約はそのまま UI の選択肢になる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              API のフィールドに「取りうる値の集合（enum）」や「最大長・必須」
              といった制約があるとき、それはデザインの構成要素に直結します。
              ステータスの enum はステータスバッジの色やラベルになり、
              セレクトボックスの選択肢になります。
            </p>

            <CodeBlock
              language="json"
              title="API スキーマ: status は 3 値の enum"
              code={`{
  "id": 42,
  "title": "API 設計入門",
  "status": "published"
}

// status が取りうる値: "draft" | "review" | "published"`}
            />

            <CodeBlock
              language="ts"
              title="enum → UI のステータスバッジ定義に対応づける"
              code={`// API の enum と UI 表示を 1 箇所で対応づける
const STATUS_LABEL = {
  draft: { label: "下書き", tone: "muted" },
  review: { label: "レビュー中", tone: "primary" },
  published: { label: "公開済み", tone: "success" },
} as const;

type Status = keyof typeof STATUS_LABEL;`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              enum の値が増減すると、バッジやセレクトの選択肢も変わります。
              逆に言えば、<strong>API の enum を確定させると</strong>
              デザインが用意すべきバリエーションの数も確定します。
              フォームのバリデーション制約（必須・最大長）も同様に、
              入力欄の下に出すエラーメッセージとフィールドの見た目に対応します。
            </p>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="検索 API がヒット 0 件のとき、どう返すのが UI 設計と相性が良い？"
              options={[
                {
                  label: "200 OK + 空配列（items: []）を返す",
                  correct: true,
                },
                { label: "404 Not Found を返す" },
                { label: "500 Internal Server Error を返す" },
                { label: "本文を空にして 204 No Content を返す" },
              ]}
              explanation="0 件は「正常に検索できたが結果が無い」状態です。200 OK + 空配列で返すと、画面側は「成功したが空」と判定でき、エラー表示ではなく空状態（次のアクション導線）を出せます。404 や 500 で返すと、検索成功なのにエラー画面が出る不自然な UX になります。"
            />
          </section>

          {/* ページネーション → UX */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ページネーション方式が「もっと見る / 無限スクロール」を決める
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              一覧の続きをどう読み込むかという UX は、API
              のページネーション方式に
              依存します。カーソル方式かオフセット方式かで、自然に作れる UI
              が変わります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  カーソル方式
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  「次の続き」を指す <code>next_cursor</code> を返す。
                  順番に辿る前提で、無限スクロールや「もっと見る」ボタンと相性が良い。
                  途中にデータが増減してもズレにくい。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  オフセット方式
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <code>page</code> / <code>offset</code> で位置を指定。 「1 / 2
                  / 3 …」のページ送り UI を作りやすい。
                  ただし途中で件数が変わると重複・欠落が起きうる。
                </p>
              </div>
            </div>

            <CodeBlock
              language="json"
              title="カーソル方式のレスポンス（partial 状態の表現）"
              code={`{
  "items": [ { "id": 51 }, { "id": 52 } ],
  "next_cursor": "eyJpZCI6NTJ9",
  "has_next": true
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>has_next</code> や <code>next_cursor</code> の有無が、
              「もっと見る」ボタンを出すかどうかを決めます。 この
              <strong>partial（途中）状態</strong>もひとつの UI 状態であり、
              デザインと API
              の両方で「続きがある／無い」を表現できる必要があります。
            </p>
          </section>

          {/* 協業の進め方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デザイナーと API 設計の協業の進め方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              デザインと API を地続きで設計するために、進め方として
              押さえておきたい点を挙げます。どれも「あとから合わせる」のではなく
              「最初から共有する」ための工夫です。
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  データ構造を早期に共有する:
                </span>{" "}
                ワイヤーフレームの段階で「この画面に必要なフィールド」を洗い出し、
                リソース設計と突き合わせる。後から足りないフィールドが発覚するのを防ぐ。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  空・エラー・ローディングを最初からデザインする:
                </span>{" "}
                成功状態だけでなく、空状態とエラー状態を初手で用意する。 それが
                API に「区別できる形で返す」要件を与える。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  API の enum・制約をデザインに反映する:
                </span>{" "}
                取りうる値の集合や入力制約を、バッジ・セレクト・バリデーション表示に
                落とし込む。値が増えたらデザインのバリエーションも更新する。
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <span className="font-bold text-foreground">
                  Figma の想定データと API スキーマを整合させる:
                </span>{" "}
                デザインに置くダミーデータの型・enum を API スキーマに合わせる。
                実データを流したときに崩れないかを早めに確認できる。
              </li>
            </ul>

            <InfoBox
              type="success"
              title="状態の洗い出しは IA とフォームから始める"
            >
              「この画面が取りうる状態」を列挙する作業は、情報設計の延長です。
              一覧画面なら loading / success / empty / error / partial、
              フォームなら入力中 / 送信中 / バリデーションエラー / 成功、
              というように<strong>状態のリストを先に書き出す</strong>と、 API
              に必要なレスポンスの形が自然と見えてきます。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="画面のナビゲーション構造と API のエンドポイント構造について正しいのは？"
              options={[
                {
                  label:
                    "情報アーキテクチャとリソース設計は同じ対象を別の言葉で記述したもので、鏡像になりやすい",
                  correct: true,
                },
                {
                  label:
                    "デザインの情報構造と API の構造は無関係で、独立に決めるべき",
                },
                {
                  label:
                    "エンドポイント構造を決めてからでないと IA は設計できない",
                },
                {
                  label: "IA を決めれば API は自動生成されるため設計は不要",
                },
              ]}
              explanation="画面のコンテンツ階層・ナビゲーションと、API のリソース・エンドポイント構造は、同じ情報構造を別の側面から記述したものです。だからこそ鏡像になりやすく、早期に突き合わせると齟齬が見つかります。どちらかが他方を自動生成するわけではなく、互いを参照しながら設計します。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Nielsen Norman Group - Information Architecture",
                  url: "https://www.nngroup.com/topic/information-architecture/",
                  description:
                    "情報アーキテクチャの考え方。コンテンツの分類・階層・ナビゲーション設計の一次情報",
                },
                {
                  title: "MDN - HTTP レスポンスステータスコード",
                  url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Status",
                  description:
                    "成功（2xx）・クライアントエラー（4xx）・サーバエラー（5xx）の区別。空とエラーの表現に",
                },
                {
                  title: "FastAPI - Handling Errors",
                  url: "https://fastapi.tiangolo.com/tutorial/handling-errors/",
                  description:
                    "detail を使ったエラーレスポンスの形。422 バリデーションエラーの構造",
                },
                {
                  title: "OpenAPI Specification",
                  url: "https://spec.openapis.org/oas/latest.html",
                  description:
                    "enum・必須・最大長などの制約を機械可読に定義する仕様。デザインと API の契約に",
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
