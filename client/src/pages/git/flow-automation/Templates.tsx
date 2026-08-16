import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";

export default function Templates() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            Issue / PR テンプレート
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            テンプレートは、Issue と PR の「入口」を標準化する仕組みです。起票や
            レビュー依頼の時点で必要な情報が揃うようにしておくと、後段の分類・
            アサイン・自動化がすべて安定します。自動化の前に、まず入口を整えます。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "Issue テンプレート",
            "PR テンプレート",
            "Issue Forms",
            "template",
          ]}
        >
          <p>
            入口が自由記述だと、再現手順のない不具合報告や、意図の分からない PR
            が届きます。すると受け取った側が毎回ヒアリングし直すことになり、
            分類もアサインも進みません。テンプレートは「最初から構造化された情報」
            を集める型であり、ラベル自動付与やレビュー割り当てといった自動化が
            乗る土台になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              なぜ入口を標準化するのか
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  情報の抜けを防ぐ
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  再現手順・環境・期待動作を必須項目にすると、
                  「情報が足りなくて動けない」がなくなる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  分類・自動化の起点になる
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  テンプレートが付与するラベルやタイトル接頭辞が、
                  この後のラベル自動化・アサインの入力になる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  レビューを早くする
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  PR テンプレートのチェックリストで、
                  レビュー前に作成者自身が確認を済ませられる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  書き方の迷いを消す
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  何をどこに書くかが型で決まっているため、
                  起票・レビュー依頼のハードルが下がる。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Issue テンプレート — Issue Forms（YAML）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              YAML で入力欄を定義する <strong>Issue Forms</strong>{" "}
              は、GitHub のフォームスキーマで書きます。 ファイルは{" "}
              <code>.github/ISSUE_TEMPLATE/</code> に置きます。 公式ドキュメントでは
              public preview と表示されており、仕様が変わる可能性があります。
              <code>type</code> に <code>input</code> / <code>dropdown</code> /{" "}
              <code>textarea</code> などを指定し、
              <code>validations.required</code> で必須入力にできます。
              <code>labels</code> と <code>title</code> は、起票時に
              自動で付きます。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/ISSUE_TEMPLATE/bug_report.yml（抜粋）"
              code={`name: バグ報告
description: プレビューの表示問題やページのエラーを報告する
title: "[バグ] "
labels: ["bug"]
body:
  - type: input
    id: page-url
    attributes:
      label: ページURL
      placeholder: "例: https://dev-album.vercel.app/react/storybook/structure"
    validations:
      required: true
  - type: dropdown
    id: category
    attributes:
      label: カテゴリ
      options:
        - プレビューが表示されない
        - レイアウト崩れ
        - リンク切れ
        - その他
    validations:
      required: true
  - type: textarea
    id: what-happened
    attributes:
      label: 何が起きましたか？
      description: 期待した動作と実際の動作を書いてください
    validations:
      required: true`}
            />

            <InfoBox type="info" title="Forms（.yml）とクラシック（.md）の違い">
              入力欄を構造化できる Issue Forms（YAML）に対し、
              単なる本文の雛形を置くクラシック形式（<code>.md</code>
              ）もあります。 必須入力やドロップダウンを扱えるぶん、実務では
              Forms が扱いやすい場面が多いです。<code>type: markdown</code>{" "}
              は入力欄ではなく、フォーム上部に出す説明文として使います。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              白紙起票を止める — config.yml
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>.github/ISSUE_TEMPLATE/config.yml</code> で、テンプレートを
              使わない白紙の Issue の導線を絞れます。
              <code>blank_issues_enabled: false</code> にすると、Read / Triage
              権限の投稿者にはテンプレート選択画面の <code>Blank issue</code> の選択肢が表示されなくなり、
              用意したテンプレートから起票することになります。質問など Issue
              以外へ誘導したいときは <code>contact_links</code> を使います。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/ISSUE_TEMPLATE/config.yml"
              code={`blank_issues_enabled: false
contact_links:
  - name: 質問・相談
    url: https://github.com/your-org/your-repo/discussions
    about: バグ報告ではない質問はこちら`}
            />

            <InfoBox
              type="warning"
              title="全員を完全にブロックはしない（仕様と実測のギャップ）"
            >
              <code>blank_issues_enabled: false</code>{" "}
              が白紙起票を隠すのは、Read / Triage 権限の投稿者に対してです。
              <strong>Write 以上の権限を持つメンテナー</strong>{" "}
              には、テンプレート選択画面に <strong>Blank issue</strong>{" "}
              の選択肢が残ります。この選択肢には <strong>Maintainers only</strong>
              （日本語版ドキュメントの表記は「メンテナンスのみ」）というラベルが付きます。
              外部からの雑多な起票を型に沿わせる用途では十分効きますが、
              「誰も白紙 Issue を作れなくなる」わけではない点を押さえます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              PR テンプレート — PULL_REQUEST_TEMPLATE.md
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>.github/PULL_REQUEST_TEMPLATE.md</code> を置くと、PR
              作成時に本文へ自動で差し込まれます。変更内容・種別・関連 Issue
              と、マージ前に自分で確認するチェックリストを型にしておきます。
              チェックリストは「レビュー前に作成者が済ませる確認」を並べるのが
              コツです。
            </p>

            <CodeBlock
              language="markdown"
              title=".github/PULL_REQUEST_TEMPLATE.md（抜粋）"
              code={`## 変更内容

-

## 種別

- [ ] feature（新ページ・新機能）
- [ ] fix（誤記・バグ修正）
- [ ] chore（設定・依存・CI など）

## 関連 Issue

Closes #

## チェックリスト

- [ ] ビルド・型チェック・テストが通る
- [ ] テーマトークンを使い、色をハードコードしていない`}
            />

            <InfoBox type="info" title="このサイトのリポジトリも同じ構成">
              ここで示した Issue Forms・config.yml・PR テンプレートは、
              この教材リポジトリ自身の <code>.github/</code>{" "}
              で実際に使っています。
              教材で説明した型を、リポジトリがそのまま実演している状態です。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              テンプレートは自動化の入力になる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Issue Forms の <code>labels: ["bug"]</code> は、起票の時点で
              ラベルを付けます。このラベルが、次のステップで学ぶラベル自動化や
              アサインの起点になります。入口を型にすることは、後段の自動化を
              成り立たせる前提だと考えてください。
            </p>

            <Quiz
              question="外部からの雑多な起票を減らすため、Read / Triage 権限の投稿者に Blank issue の選択肢を出さず、テンプレートから選ばせたい。どこで設定する？"
              options={[
                {
                  label:
                    ".github/ISSUE_TEMPLATE/config.yml の blank_issues_enabled: false",
                  correct: true,
                },
                { label: ".github/PULL_REQUEST_TEMPLATE.md" },
                { label: ".github/labeler.yml" },
                { label: ".github/workflows/ci.yml" },
              ]}
              explanation="config.yml の blank_issues_enabled を false にすると、Read / Triage 権限の投稿者からはテンプレート選択画面の Blank issue の選択肢が消え、用意したテンプレート（Issue Form）に沿って起票されます。ただし Write 以上のメンテナーには Maintainers only ラベル付きの Blank issue が残ります。PR テンプレート・labeler・CI はいずれも別の役割で、この設定はできません。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手を動かす — 入力を必須にする
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Issue Forms で、タイトル入力を必須にするための <code>___</code>{" "}
              を埋めてください。
            </p>

            <CodingChallenge
              preview
              previewType="terminal"
              title="Issue Form の必須入力を完成させよう"
              description="入力欄を必須にするトップキーを補います。"
              initialCode={`- type: input
  id: title
  attributes:
    label: タイトル
  ___:
    required: true`}
              answer={`- type: input
  id: title
  attributes:
    label: タイトル
  validations:
    required: true`}
              hints={[
                "入力を必須にする設定のトップキーは validations（その配下に required: true を書く）",
              ]}
              keywords={["validations"]}
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Issue テンプレートの設定",
                  url: "https://docs.github.com/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository",
                  description: "Issue Forms と config.yml の設定方法",
                },
                {
                  title: "Issue Forms の構文",
                  url: "https://docs.github.com/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms",
                  description: "type / validations などフォーム定義の仕様",
                },
                {
                  title: "PR テンプレートの追加",
                  url: "https://docs.github.com/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository",
                  description: "PULL_REQUEST_TEMPLATE.md の配置と書き方",
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
