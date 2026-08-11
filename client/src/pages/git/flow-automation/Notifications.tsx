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

const commands = [
  {
    command: "/github signin",
    purpose: "GitHub アカウントと Slack を紐づける。最初に一度だけ実行する。",
  },
  {
    command: "/github subscribe <owner>/<repo>",
    purpose:
      "そのチャンネルで購読を開始する。既定のイベント一式がまとめて有効になる。",
  },
  {
    command: "/github unsubscribe <owner>/<repo>",
    purpose: "購読を解除する。イベント名を付けると、その種類だけを外せる。",
  },
  {
    command: "/github subscribe list",
    purpose: "このチャンネルが購読中のリポジトリを一覧する。",
  },
  {
    command: "/github subscribe list features",
    purpose:
      "購読中のリポジトリを、有効なイベントとフィルタ付きで一覧する。設定の答え合わせに使う。",
  },
  {
    command: "/github settings",
    purpose:
      "チャンネル単位で、Issue / PR 通知のスレッド化を有効・無効にする。",
  },
  {
    command: "/github help",
    purpose: "利用できるコマンドの一覧を Slack 上で表示する。",
  },
];

const features = [
  {
    name: "issues",
    detail: "Issue のオープン / クローズ",
    on: true,
  },
  {
    name: "pulls",
    detail:
      "PR の作成 / マージ、およびドラフト PR が Ready for Review になったとき",
    on: true,
  },
  {
    name: "commits",
    detail: "デフォルトブランチへの新しいコミット",
    on: true,
  },
  {
    name: "releases",
    detail: "公開されたリリース",
    on: true,
  },
  {
    name: "deployments",
    detail: "デプロイのステータス更新",
    on: true,
  },
  {
    name: "reviews",
    detail: "PR のレビュー提出",
    on: false,
  },
  {
    name: "comments",
    detail: "Issue / PR への新規コメント",
    on: false,
  },
  {
    name: "branches",
    detail: "ブランチの作成 / 削除",
    on: false,
  },
  {
    name: "workflows",
    detail: "GitHub Actions のワークフロー実行結果",
    on: false,
  },
  {
    name: "discussions",
    detail: "Discussions の作成 / 回答",
    on: false,
  },
  {
    name: "commits:*",
    detail: "すべてのブランチへのコミット（既定はデフォルトブランチのみ）",
    on: false,
  },
];

export default function Notifications() {
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
            Slack 通知連携（GitHub の状態をチームに届ける）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            自動化されたフローは、状態が人に届いて初めて回ります。GitHub 公式の
            Slack アプリを使うと、PR・レビュー・CI・リリースの状態を
            チャンネルに流せます。ここでは購読コマンドとフィルタを整理し、
            「必要な人に、必要な通知だけが届く」設定を組み立てます。
          </p>
        </div>

        <WhyNowBox
          tags={["Slack 連携", "購読フィルタ", "通知設計", "レビュー速度"]}
        >
          <p>
            テンプレート・ラベル・アサイン・Projects
            と自動化を積み上げても、「レビュー待ちの PR がある」「CI が落ちた」
            が誰にも見えなければ、フローはそこで止まります。一方で全イベントを 1
            つのチャンネルに流すと、量に埋もれて誰も読まなくなります。
            <strong>何を、どのチャンネルに流すか</strong>を決めることが、
            ここまで作った自動化を実際に動かす最後のピースです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              通知は「全部流す」と読まれなくなる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              購読の設計は、情報量ではなく<strong>反応の必要性</strong>
              で決めます。読み手が「自分が今アクションすべきか」を 1
              秒で判断できるチャンネルだけが、通知として機能します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  流すもの（反応が要る）
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span aria-hidden="true">・</span>
                    <span>レビュー待ちの PR、レビュー結果</span>
                  </li>
                  <li className="flex gap-2">
                    <span aria-hidden="true">・</span>
                    <span>CI / デプロイの失敗</span>
                  </li>
                  <li className="flex gap-2">
                    <span aria-hidden="true">・</span>
                    <span>本番リリース、障害に関わるラベル付き Issue</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  流さないもの（後から辿れる）
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span aria-hidden="true">・</span>
                    <span>作業ブランチへの逐次コミット</span>
                  </li>
                  <li className="flex gap-2">
                    <span aria-hidden="true">・</span>
                    <span>依存更新 bot の大量 PR</span>
                  </li>
                  <li className="flex gap-2">
                    <span aria-hidden="true">・</span>
                    <span>すべてのコメント（会話は GitHub 上で追う）</span>
                  </li>
                </ul>
              </div>
            </div>

            <MermaidDiagram
              title="図: イベントがチャンネルに届くまで"
              chart={`flowchart LR
    GH["GitHub リポジトリ"] --> EV["イベント<br/>PR / Issue / CI / Release"]
    EV --> APP["GitHub Slack アプリ"]
    APP --> F{"チャンネルの購読設定<br/>イベント種別 + フィルタ"}
    F -->|"一致する"| CH["チャンネルに投稿"]
    F -->|"一致しない"| DROP["投稿しない"]`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              導入と基本コマンド
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Slack ワークスペースに GitHub
              アプリを追加したら、通知を受け取りたい チャンネルで{" "}
              <code>/github signin</code> を実行してアカウントを
              紐づけます。以降の設定は、すべて
              <strong>そのチャンネルの中で</strong>
              行います。購読はチャンネル単位
              なので、同じリポジトリでもチャンネルごとに別の設定を持てます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>プライベートチャンネルで使う場合</strong>は、その前に
              チャンネルへアプリを招待します。ワークスペースへのインストールだけでは
              プライベートチャンネルにアプリが入らないため、
              <code>/invite @github</code>{" "}
              を実行してから購読を設定してください。パブリックチャンネルでは
              この手順は不要です。
            </p>

            {/* 狭い画面ではコマンド列が収まらないため横スクロールさせる。
                スクロール領域はキーボードでも到達できるよう focusable にする。 */}
            <div
              className="rounded-xl border border-border bg-card overflow-x-auto mb-6"
              tabIndex={0}
              role="region"
              aria-label="基本コマンド一覧（横スクロールできます）"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      コマンド
                    </th>
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      用途
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {commands.map((c) => (
                    <tr
                      key={c.command}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3 align-top">
                        <code className="text-foreground font-medium whitespace-nowrap">
                          {c.command}
                        </code>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground align-top">
                        {c.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="bash"
              title="最小構成：まず購読して、いま何が有効か確かめる"
              code={`# 1. アカウントを紐づける（初回のみ）
/github signin

# 2. このチャンネルでリポジトリを購読する
/github subscribe your-org/your-repo

# 3. 何が有効になったかを確認する
/github subscribe list features`}
            />

            <InfoBox type="info" title="設定は覚えるのではなく、出力で確かめる">
              購読の状態はチャンネルごとに違い、他のメンバーが変更していることも
              あります。「たしか reviews は入れたはず」で判断せず、
              <code>/github subscribe list features</code>{" "}
              の出力を正とします。設定を変えたら、必ずこのコマンドで
              結果を確認してください。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              購読できるイベントと既定値
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <code>/github subscribe</code>{" "}
              をイベント名なしで実行すると、既定で有効なイベント一式が
              まとめて購読されます。イベント名を付けると、その種類だけを
              追加・解除できます。
            </p>

            <div
              className="rounded-xl border border-border bg-card overflow-x-auto mb-6"
              tabIndex={0}
              role="region"
              aria-label="購読できるイベントと既定値の一覧（横スクロールできます）"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      イベント名
                    </th>
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      通知される内容
                    </th>
                    <th className="text-left font-bold text-foreground px-4 py-3 whitespace-nowrap">
                      既定
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((f) => (
                    <tr
                      key={f.name}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3 align-top">
                        <code className="text-foreground font-medium whitespace-nowrap">
                          {f.name}
                        </code>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground align-top">
                        {f.detail}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <span
                          className={
                            f.on
                              ? "inline-block rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground whitespace-nowrap"
                              : "inline-block rounded-full border border-dashed border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground whitespace-nowrap"
                          }
                        >
                          {f.on ? "ON" : "OFF"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="bash"
              title="イベント単位で足し引きする"
              code={`# レビューと Actions の結果を追加で受け取る
/github subscribe your-org/your-repo reviews workflows

# コミットとリリースの通知は要らないので外す
/github unsubscribe your-org/your-repo commits releases

# リポジトリごと購読をやめる
/github unsubscribe your-org/your-repo`}
            />

            <InfoBox
              type="warning"
              title="unsubscribe は、引数の有無で意味が変わる"
            >
              <code>/github unsubscribe your-org/your-repo commits</code> は
              「commits の通知だけを止める」ですが、
              <code>/github unsubscribe your-org/your-repo</code>{" "}
              はリポジトリの購読自体を解除します。イベント名の付け忘れで
              チャンネルの通知が丸ごと消えるのは、よくある事故です。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              フィルタで絞り込む
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              イベント種別だけでは粗い場合、ラベル・ブランチ・ワークフローで
              さらに絞り込めます。フィルタは購読に追加する形で指定します。
            </p>

            <CodeBlock
              language="bash"
              title="ラベルで絞る"
              code={`# "urgent" ラベルが付いたものだけを受け取る
/github subscribe your-org/your-repo +label:"urgent"

# 別のラベルを指定すると、前のフィルタは置き換えられる
# （下を実行すると "urgent" ではなく "incident" で絞られる）
/github subscribe your-org/your-repo +label:"incident"

# 追加したラベルフィルタを取り消す
/github unsubscribe your-org/your-repo +label:"incident"`}
            />

            <InfoBox
              type="warning"
              title="ラベルフィルタは 1 リポジトリにつき 1 つ"
            >
              公式アプリが保持できるラベルフィルタは、リポジトリごとに
              <strong>1 つだけ</strong>です。2 つ目を指定すると追加ではなく
              <strong>置き換え</strong>になるため、
              「bug または incident」のような OR 条件は組めません。
              複数ラベルを追いたい場合は、ラベルごとにチャンネルを分けるか、
              ラベル側を 1 つに寄せる運用にします。
            </InfoBox>

            <InfoBox type="info" title="ラベルフィルタが効く範囲">
              ラベルフィルタは <code>pulls</code> / <code>issues</code> /{" "}
              <code>comments</code> / <code>reviews</code> に適用されます。
              <code>commits</code> と <code>branches</code>{" "}
              はラベルを持たないため対象外で、フィルタを付けても絞り込まれません。
            </InfoBox>

            <CodeBlock
              language="bash"
              title="ブランチ・ワークフローで絞る"
              code={`# デフォルトブランチ以外も含め、すべてのブランチのコミットを受け取る
/github subscribe your-org/your-repo commits:*

# 特定ブランチだけ
/github subscribe your-org/your-repo commits:release

# ブランチ名のパターン指定
/github subscribe your-org/your-repo commits:users/*

# ワークフローを名前・イベント・ブランチ・実行者で絞る
/github subscribe your-org/your-repo workflows:{name:"CI" event:"pull_request" branch:"main"}`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              仕様と実物のギャップ — 出回っている「使えないコマンド」
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Slack 連携のチートシートには、公式アプリに存在しないコマンドが
              混ざっていることがあります。手元で動かないときは、自分の入力ミスを
              疑う前に、<strong>そのコマンドが実在するか</strong>を
              一次情報（公式リポジトリの README とドキュメント）で確かめます。
            </p>

            <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      よく見かける記述
                    </th>
                    <th className="text-left font-bold text-foreground px-4 py-3">
                      実際
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 align-top">
                      <code className="text-foreground font-medium">
                        -label:&quot;wip&quot;
                      </code>{" "}
                      でラベルを除外する
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      除外フィルタは公式アプリに実装されていない（要望として
                      挙がっている段階）。使えるのは <code>+label:</code>{" "}
                      による「一致したものだけ通知する」指定で、
                      <code>/github unsubscribe ... +label:</code>{" "}
                      は「追加済みのフィルタを取り消す」であって
                      「そのラベルを弾く」ではありません。
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 align-top">
                      <code className="text-foreground font-medium">
                        +label:
                      </code>{" "}
                      を並べて OR 条件にする
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      保持できるラベルフィルタはリポジトリごとに 1 つで、
                      2 つ目を指定すると<strong>置き換え</strong>になります。
                      並べて書いても「いずれかに一致」にはならず、
                      最後に指定したラベルだけが有効です。
                    </td>
                  </tr>
                  <tr className="border-b border-border last:border-0">
                    <td className="px-4 py-3 align-top">
                      <code className="text-foreground font-medium">
                        /github mute
                      </code>{" "}
                      で一時停止する
                    </td>
                    <td className="px-4 py-3 text-muted-foreground align-top">
                      そのようなコマンドは公式アプリのコマンド一覧にありません。
                      一時的に静かにしたいなら、
                      <code>/github unsubscribe</code> でイベントを外すか、
                      Slack 側のチャンネル通知設定（ミュート）を使います。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="warning" title="「設定したつもり」が一番危ない">
              存在しないコマンドを打っても、多くの場合はエラーメッセージが
              出るだけで実害はありません。問題は、
              <strong>絞り込めたつもりで 運用を続けてしまう</strong>
              ことです。フィルタを足したら
              <code>/github subscribe list features</code>{" "}
              で反映を確認し、実際に PR を 1 つ作って
              期待どおりに届く（届かない）かを見るところまでを 1
              セットにします。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              役割別のチャンネル設計例
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              1 つのチャンネルにすべてを集約せず、読み手の役割ごとに分けます。
              以下は出発点にできる 3 パターンです。まずこの形で始めて、
              「読み飛ばしている通知」を毎週 1 つずつ外していくと、
              チームに合った設定に収束します。
            </p>

            <CodeBlock
              language="bash"
              title="#dev-review — 開発チーム（レビューと CI）"
              code={`# PR・レビュー・Actions・デプロイを追う
/github subscribe your-org/your-repo pulls reviews workflows deployments

# Issue とコミットは追わない（GitHub 上で見る）
/github unsubscribe your-org/your-repo issues commits releases`}
            />

            <CodeBlock
              language="bash"
              title="#qa-bugs — QA チーム（バグ追跡）"
              code={`# "bug" ラベルの付いた Issue と PR だけに絞る
/github subscribe your-org/your-repo issues pulls +label:"bug"

# デリバリー系のイベントは不要
/github unsubscribe your-org/your-repo commits releases deployments`}
            />

            <CodeBlock
              language="bash"
              title="#product-release — PM（リリースと機能進捗）"
              code={`# リリースと、"feature" ラベルの付いた PR を追う
/github subscribe your-org/your-repo releases pulls +label:"feature"

# 実装の細部は追わない
/github unsubscribe your-org/your-repo issues commits deployments`}
            />

            <InfoBox type="info" title="プライベートリポジトリを流すときの注意">
              購読すると、PR タイトル・Issue 本文・ブランチ名などが Slack
              チャンネルに転記されます。公開チャンネルに流せば、
              ワークスペースの全員がそれを読めます。プライベートリポジトリを
              購読するチャンネルは、リポジトリと同じ範囲の人だけが
              入れる状態にしてから設定します。
            </InfoBox>
          </section>

          <section>
            <Quiz
              question="チャンネルで /github subscribe your-org/your-repo だけを実行した。この時点で、PR のレビュー提出（reviews）は通知される？"
              options={[
                {
                  label:
                    "通知されない。reviews は既定で無効なので、明示的に購読する必要がある",
                  correct: true,
                },
                { label: "通知される。subscribe は全イベントを有効にする" },
                {
                  label:
                    "通知される。pulls が有効なら reviews も自動的に含まれる",
                },
                { label: "リポジトリの設定次第で変わる" },
              ]}
              explanation="引数なしの subscribe で有効になるのは issues / pulls / commits / releases / deployments です。reviews / comments / branches / workflows / discussions は既定で無効なため、/github subscribe your-org/your-repo reviews のように明示して追加します。現在の状態は /github subscribe list features で確認できます。"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手を動かす — レビュー用チャンネルの購読を書く
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              PR に加えて<strong>レビュー提出</strong>も受け取り、さらに
              <strong>&quot;urgent&quot; ラベル</strong>が付いたものだけに絞る
              コマンドの <code>___</code> を埋めてください。
            </p>

            <CodingChallenge
              preview
              previewType="terminal"
              title="購読コマンドを完成させよう"
              description="追加するイベント名と、ラベルの絞り込み指定を補います。"
              initialCode={`# PR とレビューを購読し、"urgent" ラベルが付いたものだけ受け取る
/github subscribe your-org/your-repo pulls ___`}
              answer={`# PR とレビューを購読し、"urgent" ラベルが付いたものだけ受け取る
/github subscribe your-org/your-repo pulls reviews +label:"urgent"`}
              hints={[
                "レビュー提出のイベント名は reviews（既定では無効なので明示が要る）",
                'ラベルの絞り込みは +label:"ラベル名" の形式で書く',
              ]}
              keywords={["reviews", '+label:"urgent"']}
            />
          </section>

          <section>
            <InfoBox type="success" title="通知は、フローの出力そのもの">
              テンプレートで入口を揃え、ラベルとアサインで分類し、Projects
              で可視化し、ガバナンスでマージを守る——その状態を
              チームに届けるのが通知です。まずは PR とレビューだけを 1
              チャンネルに流すところから始め、
              <code>/github subscribe list features</code>{" "}
              で確認しながら少しずつ絞り込んでいくのが、
              読まれ続ける通知への近道です。
            </InfoBox>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "integrations/slack（GitHub 公式 Slack アプリ）",
                  url: "https://github.com/integrations/slack",
                  description:
                    "コマンド・購読できるイベント・フィルタ構文の一次情報",
                },
                {
                  title: "Using GitHub in Slack",
                  url: "https://docs.github.com/en/integrations/how-tos/slack/use-github-in-slack",
                  description: "セットアップと基本操作（サインイン・購読）",
                },
                {
                  title: "Customizing notifications for GitHub in Slack",
                  url: "https://docs.github.com/en/integrations/how-tos/slack/customize-notifications",
                  description: "イベント単位の購読とフィルタのカスタマイズ",
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
