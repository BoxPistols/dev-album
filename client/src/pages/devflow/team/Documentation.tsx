import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodingChallenge from "@/components/CodingChallenge";

const adrSections = [
  {
    title: "Context（背景）",
    description:
      "なぜこの判断が必要になったのか。前提・制約・課題を記す。後から読む人が状況を再現できることが目的。",
  },
  {
    title: "Decision（決定）",
    description:
      "結局どうすると決めたのか。選んだ選択肢を明確に書く。比較した代替案にも触れると判断の重みが伝わる。",
  },
  {
    title: "Status（状態）",
    description:
      "提案中・承認済み・廃止済みなど、この決定が今どの段階かを示す。後の ADR で上書きされることもある。",
  },
  {
    title: "Consequences（結果）",
    description:
      "この決定によって何が良くなり、何を諦めたのか。トレードオフを正直に書くことで、将来の見直しがしやすくなる。",
  },
];

export default function Documentation() {
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
            ドキュメンテーションと ADR
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            ドキュメンテーションは、判断や手順をチームの共有資産として残す営みです。
            ドキュメント駆動の利点から、設計判断を記録する ADR の構造、 README
            やランブック、そして Single Source of Truth という考え方までを
            一通り整理し、ドキュメントが腐らないようにする工夫も扱います。
          </p>
        </div>

        <WhyNowBox tags={["ドキュメント", "ADR", "ランブック", "SSOT"]}>
          <p>
            「なぜこの設計にしたんだっけ？」——半年後の自分やチームは、その理由を覚えていません。
            口頭で決めたことは記憶から消え、コードには「何を」しているかは残っても「なぜ」は残りません。
            ドキュメンテーション、とりわけ ADR
            は、この「なぜ」を未来に届ける手段です。
            判断の経緯が残っていれば、見直しも引き継ぎも速くなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ドキュメント駆動の利点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ドキュメント駆動の利点
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ドキュメント駆動とは、実装やリリースの前に、
              何を作り・なぜそうするのかを文章として先に書く進め方です。
              書く過程で考えが整理され、曖昧な部分があぶり出されます。
              「書けない＝まだ理解できていない」というシグナルとしても機能します。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              利点は大きく 3 つあります。
              第一に、認識のズレを実装前に発見できること。
              第二に、後から参加した人が経緯を辿れること。
              第三に、レビューの土台ができ、議論が成果物ベースで進むことです。
              口頭の合意と違い、文書は読み返せて、更新の履歴も残ります。
            </p>

            <InfoBox type="info" title="ドキュメントは「未来の読み手」への手紙">
              書くときの読者は、今のチームではなく半年後の誰かです。
              前提を省略せず、専門用語には補足を添えると、未来の読み手が状況を再現できます。
            </InfoBox>
          </section>

          {/* ADR の構造 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ADR（Architecture Decision Record）の構造
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ADR は、アーキテクチャ上の重要な判断を 1 件 1
              ファイルで記録する形式です。 「データベースに PostgreSQL
              を採用した」「状態管理は外部ライブラリを使わない」といった、
              後から効いてくる決定を、理由とトレードオフ込みで残します。
              基本の構成は Context・Decision・Status・Consequences の 4 つです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adrSections.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>

            <MermaidDiagram
              title="図: ADR のライフサイクル（状態遷移）"
              chart={`stateDiagram-v2
    [*] --> Proposed
    Proposed --> Accepted: "レビューで合意"
    Proposed --> Rejected: "採用しないと決定"
    Accepted --> Deprecated: "もう使わない"
    Accepted --> Superseded: "新しい ADR で置き換え"
    Superseded --> [*]
    Deprecated --> [*]
    Rejected --> [*]`}
            />

            <InfoBox type="info" title="状態は消さずに「上書き」する">
              Accepted（承認済み）の決定が古くなったら、その ADR
              を削除せず Superseded（置き換え済み）に変え、
              新しい ADR から参照します。 過去の判断と現在の判断が連なって残ることで、
              「なぜ変えたのか」まで辿れます。
            </InfoBox>
          </section>

          {/* ADR テンプレート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ADR テンプレート
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ADR は短くて構いません。むしろ短いほうが書かれ、読まれます。
              下のテンプレートをコピーして埋めるだけで、判断の記録が残せます。
              番号とタイトルで一覧でき、Status
              を更新すれば過去の決定を上書きできます。
            </p>

            <CodeBlock
              language="js"
              title="adr/0001-record-architecture-decisions.md"
              code={`# ADR-0001: 状態管理に外部ライブラリを使わない

## Status

承認済み（2026-06-27）

## Context

画面間で共有する状態は限定的で、現状は React の Context で足りている。
外部ライブラリを入れると学習コストと依存が増える。

## Decision

当面、状態管理に外部ライブラリ（Redux 等）は導入しない。
React 標準の Context と hooks で対応する。

## Consequences

- 良い点: 依存が減り、新規メンバーの学習コストが下がる
- 諦めた点: 大規模化した場合は再検討が必要
- この決定は将来の ADR で見直す可能性がある`}
            />

            <InfoBox type="success" title="ADR は「変えてよい」記録">
              ADR は過去の判断を消さず、新しい ADR で上書きします。
              「なぜ前はこう決め、なぜ今変えるのか」が連なって残ることで、判断の履歴そのものが資産になります。
            </InfoBox>

            <CodingChallenge
              preview
              previewType="markdown"
              title="ADR の 4 セクションを埋めよう"
              description="状態・背景・決定・結果の見出しと、Status 欄の状態を埋めて ADR を完成させてください。___ を適切な語に置き換えます。"
              initialCode={`# ADR-0002: API クライアントを fetch に統一する

## ___1

承認済み（2026-06-27）

## ___2

複数のライブラリで HTTP 通信が混在し、エラー処理がばらついている。
標準の fetch なら追加依存なしで揃えられる。

## ___3

新規コードの HTTP 通信は標準の fetch に統一する。

## ___4

- 良い点: 依存が減り、エラー処理の書き方が揃う
- 諦めた点: 一部の便利機能は自前で補う必要がある`}
              answer={`# ADR-0002: API クライアントを fetch に統一する

## Status

承認済み（2026-06-27）

## Context

複数のライブラリで HTTP 通信が混在し、エラー処理がばらついている。
標準の fetch なら追加依存なしで揃えられる。

## Decision

新規コードの HTTP 通信は標準の fetch に統一する。

## Consequences

- 良い点: 依存が減り、エラー処理の書き方が揃う
- 諦めた点: 一部の便利機能は自前で補う必要がある`}
              hints={[
                "今この決定がどの段階か（提案中・承認済み等）を示す見出しは Status",
                "なぜこの判断が必要になったかの背景は Context",
                "結局どうすると決めたかは Decision",
                "得たもの・諦めたもの（トレードオフ）は Consequences",
              ]}
              keywords={["Status", "Context", "Decision", "Consequences"]}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="ADR の Consequences（結果）に書くべき内容として最も適切なのはどれ？"
              options={[
                { label: "実装の詳細なコードと行数" },
                {
                  label:
                    "この決定で良くなったことと、引き換えに諦めたこと（トレードオフ）",
                  correct: true,
                },
                { label: "担当者の個人的な感想だけ" },
                { label: "次のスプリントの全タスク一覧" },
              ]}
              explanation="Consequences はその決定がもたらす結果、特にトレードオフを正直に書く欄です。何を得て何を諦めたかが残っていると、将来この判断を見直すときの材料になります。コードの詳細やタスク一覧は ADR の役割ではありません。"
            />
          </section>

          {/* README・ランブック */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              README・ランブック
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              README は、プロジェクトの玄関です。
              何のためのものか・どう動かすか・どこに何があるかを簡潔にまとめ、
              初めて触る人が最初の一歩を踏み出せるようにします。
              詳細を詰め込みすぎず、より深い情報へのリンク集として機能させるのがコツです。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>ランブック</strong>は、運用時の手順書です。
              「デプロイの手順」「障害時の初動」「定期メンテの流れ」など、
              いざというときに迷わず動けるよう、手順を順番に書き出します。
              緊張する場面ほど記憶は当てにならないため、手で辿れる手順の価値が高まります。
            </p>
          </section>

          {/* SSOT */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Single Source of Truth
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Single Source of Truth（SSOT、信頼できる唯一の出所）とは、
              ある情報の「正」をひとつに定める考え方です。
              同じ手順が複数のドキュメントに散らばっていると、
              片方だけ更新されて食い違い、どちらが正しいか分からなくなります。
              情報の置き場をひとつに決め、他はそこへリンクする形にすると矛盾が起きにくくなります。
            </p>

            <InfoBox type="warning" title="コピペは矛盾の入り口">
              便利だからと同じ内容を複数箇所に貼ると、更新時に必ず片方が取り残されます。
              「正は 1
              箇所、あとは参照」を徹底すると、ドキュメント全体の信頼性が保てます。
            </InfoBox>
          </section>

          {/* ドキュメントの腐敗対策 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ドキュメントの腐敗対策（コードに近づける）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ドキュメントの最大の敵は<strong>腐敗</strong>
              、つまり実態とのズレです。
              コードは変わったのにドキュメントは古いまま、という状態が続くと、
              やがて誰も信じなくなり、書く意味が薄れていきます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              対策の基本は、ドキュメントをコードに近づけることです。 README や
              ADR
              をリポジトリ内に置き、変更を同じプルリクエストで一緒に更新する。
              そうすればレビュー時に「ドキュメントも直したか」を確認でき、ズレが溜まりにくくなります。
              ここでも仕様と実測のギャップが生じます。
              仕様（ドキュメント）では手順が 3 ステップでも、
              実測ではツールの更新で手順が増減していることがある。
              理由は、コードや環境が変わってもドキュメントが自動では追従しないためです。
              だからこそ「変更とドキュメントをセットで動かす」運用が効きます。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="ドキュメントの腐敗（実態とのズレ）を防ぐのに最も効果的なのはどれ？"
              options={[
                { label: "ドキュメントを別の専用ツールだけで管理する" },
                {
                  label:
                    "README や ADR をリポジトリに置き、コード変更と同じプルリクエストで一緒に更新する",
                  correct: true,
                },
                { label: "ドキュメントは一度書いたら更新しない" },
                { label: "同じ手順を複数の場所にコピーしておく" },
              ]}
              explanation="ドキュメントをコードに近づけ、変更と同じプルリクエストで更新すれば、レビュー時にズレを検知できます。コードと環境が変わってもドキュメントは自動追従しないため、変更とセットで動かす運用が腐敗を防ぎます。コピペは矛盾の入り口になります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Architecture Decision Records（adr.github.io）",
                  url: "https://adr.github.io/",
                  description:
                    "ADR の概念・テンプレート・ツールをまとめた公式サイト",
                },
                {
                  title: "Michael Nygard - Documenting Architecture Decisions",
                  url: "https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions",
                  description:
                    "ADR の原典となった記事。4 セクション構造の背景がわかる",
                },
                {
                  title: "Google SRE Workbook - On-Call とランブック",
                  url: "https://sre.google/workbook/on-call/",
                  description: "運用手順を文書化する意義と、ランブックの実践例",
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
