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

export default function Labels() {
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
            ラベルと分類の自動化
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            ラベルは、Issue と PR を「探せる・振り分けられる」状態にする分類の
            土台です。変更したファイルや規模から自動でラベルを付け、
            トリアージ（仕分け）の手間を減らします。
          </p>
        </div>

        <WhyNowBox tags={["ラベル", "トリアージ", "labeler", "stale"]}>
          <p>
            ラベルが手作業だと、付け忘れ・表記ゆれ・基準のばらつきが必ず起きます。
            すると「フロントの変更だけ絞りたい」「大きい PR
            を先に見たい」といった
            フィルタが効かなくなり、分類そのものが信用できなくなります。
            変更内容から機械的に付けられるラベルは、機械に任せるのが確実です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ラベルは何のためにあるのか
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  絞り込みと検索
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <code>label:bug</code> や <code>label:frontend</code> で、
                  関係する Issue / PR だけを一覧できる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  振り分け（ルーティング）
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ラベルをきっかけに、担当チームへの通知や
                  ワークフローの起動につなげられる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  優先度と規模の可視化
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <code>size/XL</code> や <code>priority:high</code> で、
                  レビューの順番を判断しやすくなる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  リリースノート生成
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ラベルごとに変更を分類し、リリースノートを
                  自動生成する材料になる。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              変更パスからラベルを付ける — actions/labeler
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>actions/labeler</code> は、PR
              が変更したファイルのパスを見て、
              ルールに沿ってラベルを自動で付けます。ルールは{" "}
              <code>.github/labeler.yml</code> に書きます。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/labeler.yml（ラベルの定義）"
              code={`frontend:
  - changed-files:
      - any-glob-to-any-file:
          - "client/**"
          - "**/*.tsx"

docs:
  - changed-files:
      - any-glob-to-any-file:
          - "**/*.md"
          - "docs/**"

ci:
  - changed-files:
      - any-glob-to-any-file:
          - ".github/workflows/**"`}
            />

            <CodeBlock
              language="yaml"
              title=".github/workflows/labeler.yml（実行するワークフロー）"
              code={`name: Labeler

on: [pull_request_target]

jobs:
  label:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write   # ラベルを付けるため
    steps:
      - uses: actions/labeler@v5`}
            />

            <InfoBox
              type="warning"
              title="pull_request_target はフォークでも書き込めるが、注意も要る"
            >
              ラベル付けは、フォークからの PR にも付けたいため{" "}
              <code>pull_request_target</code> を使います。これは
              ベースリポジトリの権限で走るため書き込みができますが、 その代わり
              <strong>フォーク側のコードを実行しない</strong>
              構成にするのが安全です。labeler のようにチェックアウトして
              ビルドしない用途に限定して使います。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              規模でラベルを付ける
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              変更行数から <code>size/S</code> 〜 <code>size/XL</code> を
              付けるアクションもあります。大きすぎる PR は分割の合図であり、
              レビューの順番を決める材料にもなります。ラベルは
              「事実を見えるようにする」ことに価値があります。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              放置を自動で片付ける — stale
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>actions/stale</code> は、一定期間動きのない Issue / PR に{" "}
              <code>stale</code> ラベルを付け、さらに反応がなければ自動で
              クローズします。トリアージの「溜まり」を定期的に掃除できます。
            </p>

            <CodeBlock
              language="yaml"
              title=".github/workflows/stale.yml"
              code={`name: Stale

on:
  schedule:
    - cron: "0 1 * * *"   # 毎日 01:00 UTC

jobs:
  stale:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
    steps:
      - uses: actions/stale@v9
        with:
          days-before-stale: 30
          days-before-close: 7
          stale-issue-label: stale`}
            />

            <InfoBox type="info" title="ラベルは「起点」にもなる">
              ラベルは付けて終わりではなく、ワークフローの起点にもできます。
              <code>on: pull_request</code> の <code>types: [labeled]</code>{" "}
              を使うと、「特定のラベルが付いたら走る」処理を書けます。
              分類が次のアクションを呼ぶ、という連鎖を作れます。
            </InfoBox>
          </section>

          <section>
            <Quiz
              question="フォークからの PR にも変更パスに応じたラベルを自動で付けたい。labeler ワークフローのトリガーとして適切なのはどれ？"
              options={[
                { label: "push" },
                { label: "pull_request_target", correct: true },
                { label: "schedule" },
                { label: "workflow_dispatch" },
              ]}
              explanation="通常の pull_request トリガーは、フォークからの PR では書き込み権限のあるトークンが渡らず、ラベルを付けられません。pull_request_target はベースリポジトリの権限で走るためラベル付けができます。ただしフォーク側のコードを実行しない用途（labeler など）に限定して使うのが安全です。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手を動かす — labeler のルールを書く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Markdown ファイルの変更に <code>docs</code> ラベルを付ける
              ルールの <code>___</code> を埋めてください。
            </p>

            <CodingChallenge
              preview
              previewType="config"
              title="labeler.yml のルールを完成させよう"
              description="変更ファイルのグロブパターンで、Markdown なら docs ラベルを付けます。"
              initialCode={`docs:
  - ___:
      - any-glob-to-any-file:
          - "**/*.md"
          - "docs/**"`}
              answer={`docs:
  - changed-files:
      - any-glob-to-any-file:
          - "**/*.md"
          - "docs/**"`}
              hints={[
                "変更されたファイルにマッチさせるルールのキーは changed-files",
              ]}
              keywords={["changed-files"]}
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "actions/labeler",
                  url: "https://github.com/actions/labeler",
                  description: "変更パスに応じた自動ラベル付けの設定",
                },
                {
                  title: "actions/stale",
                  url: "https://github.com/actions/stale",
                  description:
                    "放置された Issue / PR の自動ラベル付けとクローズ",
                },
                {
                  title: "Managing labels",
                  url: "https://docs.github.com/issues/using-labels-and-milestones-to-track-work/managing-labels",
                  description: "ラベルの作成・運用の基本",
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
